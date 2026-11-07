# 10 — Technical

## 1. Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Astro 5**, `output: 'static'` | Ships HTML by default; per-locale routes; the built-in `astro:assets` pipeline solves the 04 §2 image ladder without a second tool |
| Language | TypeScript, `strict: true` | The room data and i18n dictionaries are the two places a typo costs real money |
| Styling | Plain CSS with custom properties, 3 files | No utility framework: the design is ~14 components and a token file; Tailwind would add more surface than it removes |
| Client JS | **None**, except three small inline scripts | See §4 |
| Runtime | Node 22 LTS, pnpm 9 | |
| Host | Cloudflare Pages / Netlify / Vercel — any static host | |

**Rejected:** Next.js (server runtime for a static page), a React room gallery
(120 KB of runtime to open a `<dialog>`), a CMS (someone will still edit the
price by e-mailing it), CSS-in-JS (runtime cost, zero benefit here).

## 2. File structure

```
lavanda/
├─ astro.config.mjs
├─ package.json
├─ tsconfig.json
├─ spec/                          ← this specification
├─ public/
│  ├─ fonts/{cormorant-300,400,inter-400,500}.woff2
│  ├─ favicon.svg
│  └─ og/{en,ro}.jpg              ← 1200 × 630
└─ src/
   ├─ i18n/{en.json, ro.json, index.ts}
   ├─ data/{rooms.ts, places.ts, itineraries.ts, media.ts}
   ├─ assets/                     ← master photographs, processed at build
   │  ├─ rooms/family-suite/family-suite-01.jpg …
   │  └─ spaces/garden/garden-01.jpg …
   ├─ styles/{tokens.css, base.css, components.css}
   ├─ layouts/Page.astro
   ├─ components/
   │  ├─ Header.astro        Hero.astro         HouseIntro.astro
   │  ├─ RoomChapter.astro   Rates.astro        SpaceChapter.astro
   │  ├─ Explore.astro       ItineraryCard.astro
   │  ├─ Practicalities.astro Contact.astro     Footer.astro
   │  ├─ Picture.astro       Viewer.astro       LangSwitch.astro
   └─ pages/
      ├─ index.astro           → /
      └─ ro/index.astro        → /ro/
```

Masters live in `src/assets/` (not `public/`) so Astro processes them. Nothing
larger than a derivative is ever copied to `dist/`.

## 3. CSS architecture

```
tokens.css      :root custom properties only — colour, type, space, motion
base.css        reset, elements, typography, focus, reduced-motion
components.css  the 14 components, one block each, in page order
```

- No `@layer` gymnastics, no nesting deeper than 2 levels, no `!important`
  except inside `@media (prefers-reduced-motion)`.
- One BEM-ish naming: `.room`, `.room__media`, `.room--family`.
- Classes are the only styling hook. No inline styles except `--focal` and
  `--index` set from data.
- Critical CSS is not extracted — the whole sheet is under 28 KB gzip.
- Cascade order is the file order; do not rely on specificity battles.

## 4. JavaScript

Total budget: **6 KB gzip**. Four small pieces.

| Script | Size | What it does |
|---|---|---|
| Header state | ~0.4 KB | `IntersectionObserver` on a 1 px sentinel at `top: 80px`; toggles `[data-scrolled]` on the header. No scroll listener. |
| Mobile menu | ~0.7 KB | Opens a `<dialog>`; `Esc` and backdrop click close it; body scroll locked via `overflow: hidden` on `<html>` and restored on close. |
| Viewer | ~3.5 KB | `<dialog>` open/close, `←`/`→`, swipe threshold 40 px, counter update, focus restore. |
| Locale memory | ~0.2 KB | Writes `localStorage["lavanda.lang"]` on switch click. |

- All are `type="module"`, `defer`red by default, loaded once, shared by both locales.
- Progressive enhancement is mandatory: with JS off, the page renders, all links
  work, and the viewer degrades to opening the full-size image in a new tab
  (`<a href>` around each `<img>`).
- No polyfills. Baseline target: Safari 16.4+, Chrome 111+, Firefox 121+ —
  which is what `<dialog>`, `:has()`, `text-wrap: balance` and `svh` need.

## 5. Image pipeline

`astro:assets` + `sharp`:

```js
// astro.config.mjs
image: { service: { entrypoint: 'astro/assets/services/sharp' } }
```

Per frame, in `src/data/media.ts`:

```ts
{ id: 'family-suite-01', src: '…/family-suite-01.jpg',
  cls: 'chapter', focal: '50% 42%',
  alt: { en: '…', ro: '…' } }
```

A `<Picture>` component reads `cls`, emits the width ladder and ratios from
04 §2, sets `width`/`height` from the master, and applies `object-position` from
`focal`. Component props: `id`, `cls`, `sizes`, `priority?`, `alt?`.

- `priority` (hero only) → `loading="eager"`, `fetchpriority="high"`, plus a
  `<link rel="preload" as="image" imagesrcset>` in the page head.
- Everything else → `loading="lazy"`, `decoding="async"`.
- Formats: `avif` + `webp` + `jpg` fallback, quality 52 / 80 / 82.
- `sharp` is pinned; the same master must produce byte-identical output across
  builds so the cache headers stay honest.

## 6. Fonts

```html
<link rel="preload" as="font" type="font/woff2" crossorigin
      href="/fonts/cormorant-400.woff2">
```

- Self-hosted, `font-display: swap`, subset to `latin` + `latin-ext`.
- 4 files: Cormorant 300/400, Inter 400/500. Total ≤ 120 KB.
- `unicode-range` set so a Cyrillic or Greek glyph never pulls an extra file.
- `size-adjust` on the fallback (`Georgia` for display, `system-ui` for text) to
  keep CLS at zero during the swap.
- No Google Fonts CDN: one fewer origin, no consent question, no latency.

## 7. SEO

- Per-locale `<title>`, description, canonical, `hreflang` (08 §3).
- One `<h1>` per page — the hero wordmark. Section titles are `<h2>`, room names
  `<h3>`. No skipped levels.
- JSON-LD on both locales:

```json
{
  "@context": "https://schema.org",
  "@type": "Hotel",
  "name": "Pensiunea Lavanda",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Alexandru cel Bun",
    "addressRegion": "Neamț",
    "addressCountry": "RO"
  },
  "priceRange": "250–350 RON",
  "numberOfRooms": 7,
  "petsAllowed": false,
  "image": "https://…/og/en.jpg"
}
```

- `[CONFIRM Q4]` for `telephone`, `geo`, and `hasMap` — do not invent coordinates.
- `sitemap.xml` with both URLs, `robots.txt` allowing everything.
- OG image 1200 × 630, one per locale, with the wordmark over a hero crop.

## 8. Privacy and analytics

- **Default: no analytics, no cookies, no consent banner.** A static page with
  self-hosted fonts and no third-party requests needs none, and the absence of a
  banner is itself a design feature.
- If analytics are added `[CONFIRM]`: cookieless only (Plausible / Fathom /
  Cloudflare Web Analytics), no consent banner required, no fingerprinting, no
  advertising pixels. Add a one-paragraph privacy note in the footer.
- **Do not** embed Google Maps as an iframe — it sets cookies and costs ~600 KB.
  A plain link to Maps is correct.

## 9. Build-time guards

`pnpm build` **fails** when:

1. A key exists in `en.json` and not in `ro.json`, or vice versa.
2. The string `ş` (U+015F) or `ţ` (U+0163) appears anywhere in `src/`.
3. `sum(room.units) !== 7` or `sum(room.units × room.sleeps) !== 17`.
4. Any `photos` id in `rooms.ts` has no matching record in `media.ts`.
5. Any content image record lacks `alt.en` or `alt.ro`.
6. `PUBLIC_ENV=production` and any `data-placeholder` would render.
7. An emitted image exceeds its 04 §3 budget (warn locally, fail in CI).

## 10. Performance budgets

Measured on Lighthouse mobile, Moto G Power profile, simulated 4G:

| Metric | Budget |
|---|---|
| LCP | < 2.0 s |
| CLS | < 0.02 |
| INP | < 200 ms |
| TBT | < 150 ms |
| Performance score | ≥ 92 |
| Accessibility | 100 |
| Best practices | ≥ 95 |
| SEO | 100 |
| First-view transfer (mobile, above the fold) | < 420 KB |
| HTML per locale | < 40 KB |
| CSS | < 28 KB gzip |
| JS | < 6 KB gzip |
| Fonts | < 120 KB |

The hero is the only image above the fold and the only preload. If LCP misses,
lower hero AVIF quality before touching anything else.

## 11. Deployment

- `pnpm build` → `dist/`. Static, no server.
- Headers:
  - `/fonts/*`, `/_astro/*` → `Cache-Control: public, max-age=31536000, immutable`
  - `/*.html` → `Cache-Control: public, max-age=0, must-revalidate`
  - `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`,
    `Referrer-Policy: strict-origin-when-cross-origin`
- Custom domain over HTTPS, apex → `www` (or the reverse) chosen once.
- Preview deploys per branch; `PUBLIC_ENV=preview` allows placeholders.
- No environment secrets. The `[CONFIRM]` values are literals in the repo, which
  is correct for a site this size.

## 12. Browser support

| Browser | Minimum |
|---|---|
| Chrome / Edge | 111 |
| Safari (iOS + macOS) | 16.4 |
| Firefox | 121 |
| Samsung Internet | 23 |

Below these the page still renders and reads; only `text-wrap: balance`, `:has()`
styling and the `svh` refine degrade gracefully. **No polyfills, no
`@supports`-gated fallbacks beyond one `@supports (height: 100svh)` block.**
