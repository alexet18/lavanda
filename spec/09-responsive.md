# 09 — Responsive behaviour

The page must be correct from **320 px to 2560 px**, portrait and landscape, with
no horizontal scroll at any size.

---

## 1. Breakpoints

| Token | Min width | Represents |
|---|---|---|
| *(base)* | 320 px | Small phones (iPhone SE 1st gen, 5") |
| `xs` | 390 px | Modern phones |
| `sm` | 480 px | Large phones, landscape phones |
| `md` | 768 px | Tablets portrait |
| `lg` | 1024 px | Tablets landscape, small laptops |
| `xl` | 1280 px | Laptops |
| `2xl` | 1600 px | Desktops |
| `3xl` | 1920 px | Large desktops |

Mobile-first. Media queries only ever `min-width`, except the two **intentional**
`max-width` exceptions: the hero portrait crop (`max-width: 767px`) and
reduced-motion / hover-capability queries.

## 2. Units and layout primitives

- **`svh`, never `vh`**, for viewport-height sections. `100vh` on mobile Safari
  is taller than the visible area and clips the hero copy.
- `dvh` `MUST NOT` be used for anything that changes height on scroll — it causes
  the layout to jump as the browser chrome hides.
- `clamp()` for every type size (see 03 §3.2). No fixed `px` font sizes.
- `min()` / `max()` for containers, never `calc()` with magic numbers.
- Safe areas: `padding-inline: max(var(--gutter), env(safe-area-inset-left))` on
  the header and any full-bleed overlay.
- `overflow-x: clip` (not `hidden`) on `body` — `hidden` breaks `position: sticky`.

## 3. Section-by-section behaviour

### 3.1 Header

| Range | Layout |
|---|---|
| `< 768` | Wordmark left · `EN/RO` + menu button right. Height 56 px. |
| `768–1023` | + horizontal nav (5 items, `label` size). Height 64 px. |
| `≥ 1024` | + `Book a room` ghost button. Height 72 px. |

- Transparent over hero; paper after 80 px of scroll.
- The menu overlay is `position: fixed; inset: 0; height: 100svh;` with
  `overflow-y: auto` so it survives landscape phones.
- Header height is exposed as `--header-h` and used by `scroll-margin-top`.

### 3.2 Hero

| Range | Behaviour |
|---|---|
| `< 768` | `min-height: 72svh`. `hero-portrait` (3:4). Copy block bottom-left, full width minus gutters. Wordmark `clamp(2.75rem, 9vw, 4rem)`. |
| `768–1023` | `min-height: 86svh`. `hero-wide` (16:9). Copy block max-width 460 px. |
| `≥ 1024` | `100svh`, `min-height: 640px`, `max-height: 1000px`. Copy block max-width 520 px. |

Rationale for not being full-height on phones: a 390 × 844 full-bleed hero with
a 3:2 image crops more than half the frame, and the text sits on the crop. The
72 svh band keeps the photograph legible.

### 3.3 The house

| Range | Layout |
|---|---|
| `< 768` | 1 column: text, then facts (stacked `<dl>`), then image. |
| `768–1023` | 1 column, text max 62ch centred-left; facts in a row; image full-bleed below. |
| `≥ 1024` | 2 columns **5 / 6 with a 1-column gap**. Facts in a row, separated by 1 px vertical rules. |

### 3.4 Rooms

| Range | Lead image | Body |
|---|---|---|
| `< 768` | `chapter-portrait`, 100 vw, 4:5 | 1 column. Name, spec, desc, price, link. Plates stack full-width. |
| `768–1023` | `chapter` 3:2, 100 vw, `max-height: 70svh` | 2 columns: 5 / 7. Plates stack in the right column. |
| `≥ 1024` | `chapter` 3:2, 100 vw, `max-height: 86svh` | 2 columns: 4 / 7 with 1 gap. Left column `sticky; top: calc(var(--header-h) + 24px)`. |

- The sticky column `MUST NOT` be sticky when the column is taller than the
  viewport — it then scrolls normally. Guard with a container query or a
  `min-height` check.
- `See all photos` is a 44 px-tall target on touch.

### 3.5 Rates

| Range | Layout |
|---|---|
| `< 480` | Name on line 1, qualifier on line 2 (`--muted-strong`, `small`), price right-aligned spanning both lines (`grid-template-columns: 1fr auto`). |
| `480–767` | Name + qualifier inline, price right. |
| `≥ 768` | Name left, qualifier centre-left, price right. Leader rule between name and price. |

`MUST NOT` become a horizontally scrolling table.

### 3.6 Spaces

Alternating alignment on `≥ 768` (image-left / image-right / image-left). Below
768 every space is identical: lead image, then text. Do not alternate on mobile —
it produces a rhythm nobody can perceive on a single column.

### 3.7 Explore

| Range | Cards | Itineraries |
|---|---|---|
| `< 480` | 1 column | 1 column |
| `480–767` | 2 columns | 1 column |
| `768–1023` | 2 columns | 2 columns, third wraps |
| `≥ 1024` | 3 columns | 3 columns |

- Card images are `plate` (3:2) at all sizes — never `chapter`. At 3 columns a
  card is ~400 px wide, so a `chapter` file would be a wasteful download.
- Itinerary cards use `<details>` on `< 768` (collapsed to title + duration) and
  open by default on `≥ 768`. `[CONFIRM]` — a collapsed default reduces scroll
  length on mobile; the counter-argument is that content hidden by default does
  not sell the second night. **Recommendation: keep them open everywhere.**

### 3.8 Contact and footer

Single column below 768; contact actions inline at `≥ 768` with 32 px gaps.
The mobile contact block sits above the footer, never in a sticky bar over the
content — a sticky bar would cover the room galleries.

## 4. Touch and pointer

- Every interactive element: min **44 × 44 px** hit area on touch, even if the
  visual is smaller. Verify with a DOM measurement, not by eye.
- `@media (hover: hover) and (pointer: fine)` guards all hover effects. No hover
  state may be the *only* way to reveal content.
- Hover-only effects on room leads are disabled on touch.
- The viewer supports horizontal swipe with a 40 px threshold and no vertical
  hijack — a vertical swipe must scroll the page, not the image.
- No `:active` scale below 0.98 (reads as a glitch), no tap highlight removal
  without a replacement.

## 5. Typography reflow

- Body text `MUST` remain ≥ 16 px at all sizes (iOS zoom-on-focus threshold).
- Line length: 45–62 ch on phones, ≤ 62 ch everywhere.
- `word-break: normal`, `hyphens: none` — Romanian hyphenation dictionaries in
  browsers are unreliable; a mis-hyphenated `în-tre-ba-re` looks worse than a
  ragged edge.
- Long words (`împrejurimi`, `Apartament`) `MUST` not overflow: test at 320 px.

## 6. Landscape

- Phones in landscape (`height < 500px`): the hero falls back to
  `min-height: 420px` and the copy block loses the eyebrow.
- The mobile menu overlay must scroll.
- The viewer uses `max-height: 88svh` so controls stay reachable.

## 7. Print

`MAY` be skipped, but if implemented: hide the header, viewer, and all images
except the hero; force black on white; expand all `<details>`. One page.

## 8. Test matrix

| Width × Height | Device class | Must check |
|---|---|---|
| 320 × 568 | iPhone SE 1 | No h-scroll, `Împrejurimi` fits, rates price alignment |
| 360 × 640 | Small Android | Tap targets, hero height |
| 390 × 844 | iPhone 13/14 | Primary mobile reference |
| 430 × 932 | iPhone Pro Max | Text measure |
| 768 × 1024 | iPad portrait | Two-column rooms, nav visible |
| 1024 × 768 | iPad landscape | Sticky column, header state |
| 1280 × 800 | Laptop | Primary desktop reference |
| 1440 × 900 | MacBook | Hero crop, chapter height |
| 1920 × 1080 | Desktop | Max container, hero `max-height` |
| 2560 × 1440 | Large display | Image cap at 2560, no over-stretch |
| 844 × 390 | Phone landscape | Menu scroll, hero min-height |
| 200% browser zoom @ 1280 | Accessibility | No clipping, no overlap |

## 9. Rules that have caused regressions before

- `100vh` anywhere → use `svh`.
- `overflow-x: hidden` on `body` → breaks sticky; use `clip`.
- Fixed header height in `px` used in `calc()` without a custom property → drift
  at breakpoints.
- Sticky columns taller than the viewport → the bottom of the column is never
  reachable.
- `object-fit: cover` without `object-position` → heads and headboards cropped.
- Full-bleed `100vw` inside a padded container → 1 px horizontal scrollbar on
  Windows, because `100vw` includes the scrollbar width. Use
  `margin-inline: calc(50% - 50vw)` **with** `overflow-x: clip` on the parent,
  or `width: 100%` on a grid that already spans.
