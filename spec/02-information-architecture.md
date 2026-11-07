# 02 — Information architecture

One page. Nine sections. Anchors only, no routing beyond `/` and `/ro/`.

## 1. Order and weight

| # | Section | Anchor | Weight | Frame class used | Scroll budget (mobile) |
|---|---|---|---|---|---|
| 1 | Header | — | fixed | — | — |
| 2 | Hero | `#top` | 100svh (desktop) / 72svh (phone) | `hero` 16:9 / 3:4 | 1.0 screens |
| 3 | The house | `#house` | ~1.2 screens | `plate` ×1 | 1.2 |
| 4 | Rooms | `#rooms` | 4 chapters | `chapter` + `plate` | 7.6 |
| 5 | Rates | `#rates` | ~0.6 screens | — | 0.6 |
| 6 | Spaces — garden / table / hall | `#spaces` | 3 chapters | `chapter` + `plate` | 3.0 |
| 7 | Explore | `#explore` | ~3 screens | `plate` ×5 + `detail` | 3.0 |
| 8 | Practicalities | `#stay` | ~0.8 screens | — | 0.8 |
| 9 | Contact | `#contact` | ~0.8 screens | `hero` (short) | 0.8 |
| 10 | Footer | — | ~0.3 screens | — | 0.3 |

Total ≈ 18 mobile screens. That is the ceiling; if a section exceeds its budget,
cut content rather than compress type. The rooms block is the largest single
consumer (7.6 screens) and that is intentional — see 04 §6 for the compact
alternative if it proves too long with real photography.

## 2. Section specifications

### 2.1 Header

**Purpose:** orientation and a permanent way to book.

- Left: wordmark `Lavanda` (display serif, 19px, `0.06em` tracking). Links to `#top`.
- Centre (`lg` and up): `Rooms · The house · Spaces · Explore · Stay`.
- Right: language switch `EN / RO`, then a text button `Book a room`.
- Behaviour: transparent over the hero (paper text). After 80px of scroll, it
  becomes paper with a 1px bottom rule and ink text. Transition 300 ms.
  `backdrop-filter: blur(8px)` on the solid state only, with an opaque fallback.
- Mobile: wordmark + language switch + a 24px menu button. Menu opens a
  full-screen paper overlay with the five links set in display serif at
  `clamp(1.75rem, 8vw, 2.5rem)`, and the contact block repeated at the bottom.
- `MUST NOT` collapse the language switch into the overlay menu — it is required
  to be visible at the top on every breakpoint.

**i18n keys:** `nav.rooms`, `nav.house`, `nav.spaces`, `nav.explore`, `nav.stay`, `nav.book`.

### 2.2 Hero

**Purpose:** state what this is, in one image and one line.

- Full-bleed image: `100svh` from 768 px up, `72svh` on phones (see 09 §3.2 for
  why the phone height is reduced). `object-fit: cover`, focal point from data.
- Overlay: a single bottom-left block, maximum 520px wide.
  - Eyebrow: `Neamț County · Moldova`
  - Wordmark: `Pensiunea Lavanda` — display serif, `clamp(2.75rem, 9vw, 7rem)`
  - Line: one sentence, max 2 lines, `--paper` at 88% opacity.
- A thin 1px scroll indicator at bottom-centre: a 40px vertical rule that fades in
  after 600 ms. No bouncing chevron.
- Gradient: single `linear-gradient(to top, rgba(0,0,0,.55), transparent 55%)` for
  legibility. No vignette, no grain overlay.
- `MUST` render usable text without the image (dark fallback block `#14120E`).

**i18n keys:** `hero.eyebrow`, `hero.wordmark`, `hero.line`, `hero.scroll`.

### 2.3 The house

**Purpose:** place the property geographically and emotionally.

- Two-column editorial band on `md`+ (5/12 text, 1/12 gap, 6/12 image), single
  column on mobile with the image *after* the text.
- Content: one 3-sentence paragraph + a 3-item fact row:
  `7 rooms` · `15 min → Piatra Neamț` · `1 h → Bicaz gorges`.
- Facts are set as a horizontal list separated by 1px vertical rules; on mobile
  they stack to a definition list, not a table.
- Image: one `plate` (3:2) of the house from the garden, warm light.

**i18n keys:** `house.title`, `house.body`, `house.facts.rooms`, `house.facts.city`, `house.facts.bicaz`.

### 2.4 Rooms

**Purpose:** the commercial core. Four room types, four chapters.

Each type is one **room chapter** (see 04-photography §6, Variant A — the default):

```
[ full-bleed chapter image  3:2 desktop / 4:5 mobile, ~86svh ]
   eyebrow: 01 / 05        bottom-left, over image
   name:  Family suite     display serif, over image
--------------------------------------- (image ends)
[ left column, sticky on lg ]   [ right column ]
  name (h3)                        plate 1  3:2
  sleeps · beds · bathroom         plate 2  3:2
  one-sentence description         plate 3  3:2
  price  from 350 lei / night
  link   See all photos (5)
```

- Room types in order: **Family suite → Triple → Double twin → Double**.
  Rationale: largest and most distinctive first, cheapest last, so the price
  ladder reads downward.
- Between chapter 2 and 3, insert the **rates strip** (see 2.5) so the price is
  never more than one chapter away.
- `MUST` show the unit count (`1 available`, `2 available`) as a small label, not
  as availability logic. This is static stock, not inventory.
- `MAY` show a `details` disclosure per room for the amenity list. Default closed.

**i18n keys:** `rooms.eyebrow`, `rooms.intro`, `room.<slug>.name`, `.beds`, `.bath`,
`.desc`, `.price`, `.count`, `.amenities`, `rooms.allPhotos`.

### 2.5 Rates

**Purpose:** answer "what does it cost" without a spreadsheet.

- A 4-row list, not a grid of cards. Each row: name (serif, 20–24px) — small
  qualifier — price right-aligned in tabular numerals.
- Sub-line under the block: `Per room, per night. Breakfast [CONFIRM].`
- Mobile: the same rows, name on one line, qualifier under it in `--muted-strong`, price
  pinned right at every breakpoint. No horizontal scroll, ever.
- `MUST NOT` render as `<table>` on mobile with a header row; use a `<dl>`.

**i18n keys:** `rates.title`, `rates.note`, `rates.from`, `rates.perNight`.

### 2.6 Spaces — garden, table, hall

**Purpose:** the three non-bedroom reasons to book.

Three chapters, alternating image alignment (left / right / left) to avoid a
monotonous stack, each:
- `chapter` image + eyebrow (`The garden`, `The table`, `The hall`)
- one heading, one 2-sentence paragraph
- for the hall only: capacity line `[CONFIRM] seats` and a `Enquire about the hall`
  text link that jumps to `#contact`.

Order: **Garden → Table → Hall.** The garden is the most photographed and most
differentiating; the hall is the most niche, so it sits last and reads as a
bonus rather than the pitch.

### 2.7 Explore

**Purpose:** prove the location is worth the trip; give a reason to stay 2 nights.

- Intro: one sentence, `Where the Bistrița valley meets the mountains.`
- **Five attraction plates** in a 2-col (`sm`) / 3-col (`lg`) mosaic, each:
  image (3:2, `plate`), name, `~distance · ~drive time`, one line of why.
  - Piatra Neamț — 10 km · 15 min
  - Neamț Monastery — 18 km · 25 min
  - Bicaz gorges — 45 km · 1 h
  - Red Lake — 60 km · 1 h 15
  - Ceahlău / Durău — 55 km · 1 h 15
- **Three itineraries** below, as horizontal cards or a 3-col row:
  `A slow day` · `The mountain day` · `The monastery road`. Each: title, `1 day`,
  three time-stamped beats (e.g. `09:00 — …`). Two sentences maximum per beat.
- All distances are **approximate driving distances from the property** and
  `MUST` be marked `~` and verified once against Google Maps before launch.
- `MUST` carry image credit for any non-commissioned photo (see 06 §5).

**i18n keys:** `explore.title`, `explore.intro`, `place.<slug>.name`, `.distance`,
`.drive`, `.why`, `itinerary.<slug>.title`, `.duration`, `.beat.<n>`.

### 2.8 Practicalities

**Purpose:** remove the small frictions that stop a booking.

Two columns of short label/value pairs, no prose:
`Check-in` 14:00 · `Check-out` 11:00 · `Parking` [CONFIRM] · `Pets` [CONFIRM] ·
`Wi-Fi` [CONFIRM] · `Payment` cash / card [CONFIRM] · `Languages` RO / EN.
Plus one line: `By car: DN15, 15 minutes west of Piatra Neamț.`

### 2.9 Contact

**Purpose:** the conversion.

- Short `hero`-class image (or a dark paper-free band if no good image exists).
- Heading: `To book, call or write.` — display serif.
- Three actions, stacked on mobile, inline on `md`+:
  `+40 ___ ___ ___` (tel:), `hello@___` (mailto:), `WhatsApp` `[CONFIRM]`.
- A "Find us" link to Google Maps `[CONFIRM]`.
- No form. A form on a 7-room guesthouse adds a spam vector and a maintenance
  burden for zero bookings that a telephone would not have produced.

### 2.10 Footer

- Wordmark, language switch repeated, © year, `Photography: …` credit line,
  `Image credits` link (see 06 §5), and an implicit-privacy note `[CONFIRM]`.

## 3. Anchor behaviour

- Smooth scroll is allowed on desktop; on mobile `MUST` honour
  `prefers-reduced-motion` and fall back to instant jumps.
- All in-page anchors compensate for the fixed header with `scroll-margin-top: 72px`.
- The current section `MAY` be reflected in the header nav with a 1px underline.
  Do not use a background pill.

## 4. What is deliberately absent

No loading screen. No hero video (weight, and it would compete with the stills).
No parallax hero. No "gallery strip" marquee. No testimonials. No newsletter. No
chat widget. No cookie banner unless analytics are added.
