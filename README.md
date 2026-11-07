# Pensiunea Lavanda

The presentation site for a seven-room family guesthouse in Alexandru cel Bun,
Neamț — English at `/`, Romanian at `/ro/`.

Two static pages, no server, no build pipeline to trust: `docs/` is the site.

---

## Contents

```
assets/src/           master photographs (as supplied)
public/
  brand/              logo mark, lockup, icons
  fonts/              Cormorant Garamond 300, latin + latin-ext (40 KB)
  media/              the generated image ladder + manifest.json
  styles/             main.css, fonts.css
src/
  content/            site copy (en + ro), rooms, media registry, credits
  components/         chrome.js, sections.js
  client/app.js       the four small client behaviours
  ui.js               htm binding, Picture, Price
  page.js             the document
tools/                one-off asset scripts + a dev server
spec/                 the specification this was built against
docs/                 build output — this is what gets served
```

## Develop

```bash
node build.mjs        # render docs/
node tools/serve.mjs  # http://127.0.0.1:8080
```

Regenerating images (only needed when `assets/src/` changes):

```bash
python tools/build-images.py     # AVIF + WebP + JPEG ladder, capped at native width
python tools/make-logo.py        # transparent mark, lockup, icons
```

Fonts and the five licensed attraction photographs are fetched once by
`tools/fetch-fonts.mjs` and `tools/fetch-places.mjs`; both record what they got.

## How it is put together

- **Preact 11 + htm**, no JSX and no bundler. The same component files render in
  Node at build time and run in the browser, loaded through an import map.
- **Client JS is four behaviours**: header state, mobile menu, photo viewer,
  language memory. About 7 KB. Everything else is static HTML.
- **Images** are one format ladder per file, AVIF with WebP and JPEG fallbacks,
  never upscaled. `Picture` reserves the aspect ratio so nothing shifts.
- **i18n** is a build-time parity check: a key that exists in `en` and not `ro`
  fails the build rather than silently falling back.

## Before this goes live

`src/content/site.js` still contains **placeholder contact details** —
`+40 700 000 000` and `rezervari@pensiunealavanda.ro` are not real. Replace them,
the Maps link, and the distances in the Explore section. See
`spec/12-as-built.md` §4.

## Deploy

`docs/` is committed, so GitHub Pages can serve the repository's `docs/` folder
directly with no Actions workflow:

Settings → Pages → Source: *Deploy from a branch* → `main` / `/docs`.

## Credits

Photographs of the property are the owner's. Photographs of Piatra Neamț, Neamț
Monastery, Bicaz gorges, Red Lake and Ceahlău are from Wikimedia Commons under
CC BY and CC BY-SA; the footer's *Image credits* dialog lists each author and
licence, and `src/content/credits.json` is the machine-readable copy.

Typeface: Cormorant Garamond, SIL Open Font License.
