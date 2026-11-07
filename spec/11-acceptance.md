# 11 — Acceptance criteria

Definition of done. Every box is testable by someone who did not write the code.
A section is not "done" until its boxes are ticked **on a real device**, not only
in a desktop emulator.

---

## A. Content

- [ ] All `[CONFIRM]` items in §4 of README are resolved or deliberately deferred with visible placeholder text.
- [ ] Four room types match 05 §1 exactly: units, sleeps, beds, bathrooms, price.
- [ ] Total is 7 rooms / 17 guests, and this is asserted at build time.
- [ ] Rates block states whether breakfast is included.
- [ ] Headline price reads `from 250 lei` and is derived from data, not typed.
- [ ] No sentence contains "breathtaking", "hidden gem", "experience", "curated", "sanctuary", "journey".
- [ ] Every distance and drive time is preceded by `~`.
- [ ] Every attraction card has exactly one sentence of "why".
- [ ] Contact details are real and clickable (`tel:`, `mailto:`).

## B. Internationalisation

- [ ] `/` is English, `/ro/` is Romanian; both are static HTML.
- [ ] The language switch is visible at the top on 320, 390, 768, 1280 and 1920 px.
- [ ] Switching from `/#rooms` lands on `/ro/#rooms`.
- [ ] The Romanian page contains no English prose except proper nouns.
- [ ] `hreflang` `en`, `ro`, `x-default` present and correct on both pages.
- [ ] `<html lang>` is correct; the inactive switch link carries `hreflang` and `lang`.
- [ ] No `ş` or `ţ` (cedilla) anywhere — build guard passes.
- [ ] Romanian plural forms render correctly for 1, 2, 3 and 20.
- [ ] No text overflow at 320 px in either locale.
- [ ] Alt text exists in both locales for every content image.

## C. Photography

- [ ] Every room type shows ≥ 4 photographs of that actual room type.
- [ ] No 16:9 room image.
- [ ] Verticals are vertical in every interior.
- [ ] No image is displayed below 320 px on its short edge (except the viewer strip).
- [ ] Hero uses `fetchpriority="high"` and is the only preloaded image.
- [ ] Every other image is `loading="lazy"`.
- [ ] `width`/`height` on every `<img>`; CLS < 0.02.
- [ ] AVIF, WebP and JPEG sources all resolve — test by forcing each format.
- [ ] Every `chapter` frame has a `chapter-portrait` variant served below 768 px.
- [ ] Attraction images carry a credit; the footer credit link works.
- [ ] No stock interior appears anywhere in production.
- [ ] `data-placeholder` count is zero in the production build.
- [ ] Every frame is tiered `master` or `provisional`; no frame is upscaled past its native width.
- [ ] Provisional frames pass the 04 §8.2 bar, judged at 100% on a colour-corrected display.

## D. Layout and responsive

- [ ] No horizontal scrollbar at 320, 360, 390, 430, 768, 1024, 1280, 1440, 1920, 2560.
- [ ] No horizontal scrollbar at 200% browser zoom at 1280 px.
- [ ] Header transitions from transparent to solid at ~80 px without a jump.
- [ ] Sticky room column does not trap content when taller than the viewport.
- [ ] Mobile menu scrolls in landscape (844 × 390).
- [ ] Rates rows never wrap the price to a second line.
- [ ] Hero copy is fully visible on iPhone Safari with the address bar shown.
- [ ] Touch targets ≥ 44 × 44 px — measured, not eyeballed.

## E. Accessibility (WCAG 2.2 AA)

- [ ] Keyboard reaches every link, button, switch and the viewer; order matches visual order.
- [ ] Skip link is the first focusable element and works.
- [ ] Focus ring visible on every interactive element, never `outline: none` alone.
- [ ] Contrast: all body text ≥ 4.5:1; `--muted` only used at ≥ 18 px.
- [ ] Viewer traps focus, restores it on close, and `Esc` closes it.
- [ ] Viewer announces "Photo 2 of 5 — Family suite" via a live region.
- [ ] One `<h1>` per page; no skipped heading levels.
- [ ] Every image has meaningful alt, or `alt=""` + `aria-hidden` if decorative.
- [ ] `prefers-reduced-motion` removes all transforms and zoom.
- [ ] Language switch is announced as a navigation landmark with a bilingual label.
- [ ] Romanian page is not read with an English voice (`lang` correct throughout).
- [ ] Axe / Lighthouse a11y = 100 on both locales.

## F. Performance

- [ ] Lighthouse mobile: Performance ≥ 92, LCP < 2.0 s, CLS < 0.02, TBT < 150 ms.
- [ ] JS payload < 6 KB gzip.
- [ ] CSS < 28 KB gzip.
- [ ] Fonts < 120 KB total, all `woff2`, no third-party font request.
- [ ] Zero third-party requests in the network panel.
- [ ] First-view transfer < 420 KB on mobile.
- [ ] Images are `immutable`-cached; HTML is `must-revalidate`.
- [ ] Same score on both `/` and `/ro/`.

## G. Resilience

- [ ] With JavaScript disabled: the page renders, all links work, room images open.
- [ ] With images blocked: the page still reads and the layout does not collapse.
- [ ] Slow 3G throttle: hero appears < 3 s, no layout shift when it lands.
- [ ] Font fails to load: fallback metrics keep CLS at zero.
- [ ] Prints sanely if print styles are implemented, otherwise print is untouched.

## H. Browser matrix

- [ ] Chrome (latest, desktop + Android).
- [ ] Safari (latest, macOS + iOS — the real device, not the simulator only).
- [ ] Firefox (latest).
- [ ] Samsung Internet (latest, if available).
- [ ] Chromium 111 (the floor): no broken layout, no missing content.

## I. Launch checklist

- [ ] `[CONFIRM]` values replaced with real copy.
- [ ] Domain and HTTPS configured; apex/www decided.
- [ ] `sitemap.xml` and `robots.txt` reachable.
- [ ] OG images render correctly in a real WhatsApp / Facebook / iMessage preview.
- [ ] Google Search Console: both locales submitted.
- [ ] Favicon and apple-touch-icon present.
- [ ] 404 page exists (even on a static host — check the host default is not raw).
- [ ] A test booking call to the published number reaches a human.
- [ ] The owner has read the Romanian page and signed off on the wording.
- [ ] A backup of the master photographs exists in two places.

---

## Definition of done

The page ships when **all** hold:

1. A stranger on a phone understands the property, the price and the location
   within two scrolls.
2. Every room type has real photographs.
3. The Romanian page reads as though it was written in Romanian.
4. Lighthouse mobile ≥ 92 with a11y at 100, on both locales.
5. Nothing in section A–I is unticked.
