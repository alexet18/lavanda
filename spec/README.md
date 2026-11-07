# Pensiunea Lavanda — Front-end Specification

| | |
|---|---|
| **Version** | 0.1 — draft for review |
| **Date** | 2026-11-08 |
| **Status** | Specification only. **No implementation yet.** |
| **Scope** | One presentation page, EN + RO, responsive, image-led |
| **Property** | 7-room family guesthouse, Alexandru cel Bun, Neamț County, Romania |

---

## 1. What this document set is

This folder is the contract for the page *before* any code exists. It fixes the
things that are expensive to change later — section order, type scale, photo
ratios, price presentation, translation keys, breakpoints — and leaves the cheap
things open.

Read it top to bottom once. After that, work from the file you need.

## 2. Reading order

| # | File | Answers |
|---|---|---|
| 01 | [01-product-scope.md](01-product-scope.md) | Who it is for, what it must achieve, what it deliberately does not do |
| 02 | [02-information-architecture.md](02-information-architecture.md) | The order of sections on the page, and what each one contains |
| 03 | [03-design-system.md](03-design-system.md) | Type, colour, spacing, grid, motion, components |
| 04 | [04-photography.md](04-photography.md) | **Photo system**: art direction, aspect ratios, pixel sizes, delivery, and the three room-gallery layouts |
| 05 | [05-rooms.md](05-rooms.md) | Room inventory, rates, capacity, pricing display rules, data contract |
| 06 | [06-location.md](06-location.md) | Local attractions, travel times, reference imagery, suggested itineraries |
| 07 | [07-copy-en-ro.md](07-copy-en-ro.md) | The bilingual copy deck (source text) |
| 08 | [08-i18n.md](08-i18n.md) | Routes, switch behaviour, translation keys, plurals, SEO |
| 09 | [09-responsive.md](09-responsive.md) | Breakpoints and per-section layout behaviour |
| 10 | [10-technical.md](10-technical.md) | Stack, file structure, performance budgets, accessibility |
| 11 | [11-acceptance.md](11-acceptance.md) | Testable acceptance criteria and launch checklist |

## 3. Decisions taken so far

| # | Decision | Why | Where |
|---|---|---|---|
| D1 | The page is **image-led, not text-led**. No paragraph runs longer than ~55 characters. | The property sells on atmosphere; a guesthouse has no brand equity to lean on. | 01, 02 |
| D2 | Visual reference is **Aman Tokyo** — full-bleed photography, serif display, near-zero chrome, wide margins. | Requested by the owner. | 03 |
| D3 | Palette is **paper + ink + one muted lavender accent**. No gradients, no cards with shadows, no colour blocks. | Minimalism that survives a small-business budget. | 03 |
| D4 | Room prices are shown as **"from 250 lei / night"**, grouped by type, never as a dense table on mobile. | Four types × 250–350 lei is small enough that a table reads as a spreadsheet and kills the mood. | 05 |
| D5 | **English is served at `/`, Romanian at `/ro/`**. No auto-redirect. | Simple URLs, no SEO ambiguity, no language guessing. | 08 |
| D6 | Gallery interaction is **scroll-native** (no autoplay carousel). | Carousels hide images; a presentation page must not hide its best asset. | 04 |
| D7 | Static site, **Astro 5**, zero client framework. | Content is static; JS should exist only for the language switch and the photo viewer. | 10 |
| D8 | Photography is **real property photography only**. Never stock interiors, never upscaled. | A guesthouse that misrepresents its rooms loses the booking and the review. | 04 |
| D9 | **Room gallery = Variant A "Chapter"** — full-bleed 3:2 lead, four stacked plates beside a sticky detail column; mosaic only inside the viewer. | Chosen 2026-11-08. Largest image per screen, no hover dependency, most forgiving of provisional photos. | 04 §6 |
| D10 | Three **asset tiers**: `master`, `provisional` (phone), `placeholder`. Provisional photos may ship; placeholders never do. | Some phone photos exist, no DSLR masters yet. Resolution is adequate; optics are not. | 04 §8 |
| D11 | Rates are shown in **lei only**. No EUR conversion. | A hard-coded conversion dates instantly and misleads when the rate moves. | 05 §2.2 |

## 4. Open questions `[CONFIRM]`

These block final copy, not the layout. Everything below is marked inline in the
cards where it appears.

| # | Question | Affects |
|---|---|---|
| Q1 | Breakfast — included in the rate, or extra? Price? | 05, 07 |
| Q2 | Does the restaurant serve **dinner to guests daily**, or by arrangement / weekends only? | 02, 07 |
| Q3 | Event hall — seated capacity at long tables, and what the hall is hired *for* (weddings, baptisms, conferences)? | 02, 05, 07 |
| Q4 | Real phone, e-mail, and a map pin / Google Maps link. | 02, 07 |
| Q5 | Exact founding year / "family since" line, if we want one. | 07 |
| Q6 | Are pets allowed? Parking? Is there Wi-Fi, and is it good enough to promise? | 05 |
| Q7 | ~~Do you have photos already, or do we plan a shoot?~~ **Answered 2026-11-08:** some phone photos exist, no professional masters. See 04 §8 for the provisional tier and the reshoot bar. | 04 |
| Q8 | Should a Booking.com / Airbnb link be shown next to the direct-contact CTA? | 02 |
| Q9 | Prices are per room per night in RON — assume **no tourist tax** shown, or include the local tax line? | 05 |
| Q10 | Do we mention a minimum stay in high season / holidays? | 05 |

## 5. Conventions used in this spec

- **`[CONFIRM]`** — needs an answer from the owner before the text is final.
- **`[TBD]`** — blocked by another decision, not by the owner.
- **`MUST` / `SHOULD` / `MAY`** — RFC-style. `MUST` items are acceptance criteria.
- Copy in **`07-copy-en-ro.md`** is authoritative for wording. Specs elsewhere quote it for context only; if they disagree, the copy deck wins.
- English is the source of truth for *meaning*; Romanian is an authored translation, not a word-for-word one.
- Romanian uses comma-below diacritics throughout: **ș ț ă î â** (U+0219, U+021B, U+0103, U+00EE, U+00E2).

## 6. Glossary

| Term | Meaning here |
|---|---|
| **Chapter** | A full-bleed, near-viewport-height section built around one image and one idea. |
| **Plate** | A single 3:2 gallery image displayed in a grid or stack. |
| **Frame** | Any one photograph, before derivatives. |
| **Ladder** | The set of resized derivatives generated from one frame. |
| **Lead** | The first, largest image of a room or space. |
| **Viewer** | The full-screen photo overlay. |
| **Locale** | `en` or `ro`. |
