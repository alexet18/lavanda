# 05 — Rooms, rates and capacity

## 1. Inventory

Seven rooms, four types, **17 guests** at full occupancy.

| # | Type | Slug | Units | Sleeps | Beds | Bath | Rate / night |
|---|---|---|---|---|---|---|---|
| 1 | Family suite | `family-suite` | 1 | 4 | 1 double + 2 single, in **two separate rooms** | 1 private | **350 lei** |
| 2 | Triple room | `triple` | 1 | 3 | 1 double + 1 single | 1 private | **280 lei** |
| 3 | Double twin | `double-twin` | 2 | 2 | 2 single | 1 private | **250 lei** |
| 4 | Double room | `double` | 3 | 2 | 1 double | 1 private | **260 lei** |
| | **Total** | | **7** | **17** | | **7** | from **250 lei** |

### Two things to confirm

- **`[CONFIRM]` Twin (250) is cheaper than Double (260).** Unusual — a twin is
  normally the same or pricier. If the twin rooms are smaller, say so in the
  copy ("the two smaller rooms at the back"); if the prices are the wrong way
  round, fix them now, because the whole "from 250 lei" headline depends on it.
- **`[CONFIRM]` Room sizes in m².** If they exist, add them to the room chapter
  as a quiet fact (`18 m²`). If they don't, omit — do not estimate.

## 2. Presentation rules

### 2.1 Order on the page

**Family suite → Triple → Double twin → Double.**

Largest and most distinctive first; it sets the ceiling of what the property
is. Cheapest last, so the price ladder reads downward into the rates block.

### 2.2 Price display

- Always **`from 350 lei / night`**, never `350 RON` and never `€`.
- `lei` is lowercase, `0.25em` gap after the numeral, set in `small`.
- Numerals use `font-variant-numeric: tabular-nums`.
- **`MUST NOT`** show a struck-through price, a "was/now", a discount badge, or
  a "best price" marker. There is no dynamic pricing.
- **`MUST NOT`** auto-convert to EUR. **Decided 2026-11-08: lei only.** A static
  `≈ €70` line dates instantly and is wrong the week the rate moves. If a foreign
  guest needs a conversion, they will do it themselves in one search.
- Unit count is a static label (`1 room of this type`, `3 rooms of this type`),
  not availability.

### 2.3 The rates block

A `<dl>`, four rows, not a table:

```
Family suite        sleeps 4 · two rooms        350 lei   / night
Triple room         sleeps 3                    280 lei   / night
Double twin         sleeps 2                    250 lei   / night
Double room         sleeps 2                    260 lei   / night
─────────────────────────────────────────────────────────────────
Per room, per night. Breakfast [CONFIRM]. Tourist tax [CONFIRM].
```

On mobile the qualifier (`sleeps 4 · two rooms`) wraps under the name; the price
stays right-aligned and baseline-matched to the name. **No horizontal scroll.**

### 2.4 Room chapter content

Each room chapter carries, in this order:

1. Eyebrow `01 — 04` (type index)
2. Name — `display-3`
3. One-line spec — `4 guests · 1 double + 2 single · own bathroom`
4. One-sentence description (max 2 lines at `lg`)
5. Price
6. `See all 5 photos`
7. Optional `details` disclosure: WiFi, heating, towels, hairdryer, balcony,
   view, accessible? `[CONFIRM]` the actual amenity list — do not invent one.

The amenity list is **closed by default**. Visible amenities are the four in the
one-line spec; everything else is one tap away.

## 3. Copy for each type

Authoritative text lives in `07-copy-en-ro.md`. The intent of each:

| Type | What the sentence must do |
|---|---|
| Family suite | Explain that it is two rooms with one door between them, and that the bathroom is shared by the family only — the practical anxiety is "will we queue". |
| Triple | Say plainly it is one room with a double and a single — no hidden second room. |
| Double twin | Name who it is for (friends, siblings, colleagues) so a couple does not book it by mistake. |
| Double | The shortest and quietest. It is the base case; it should not oversell. |

## 4. Data contract

`src/data/rooms.ts` — the single source of truth for inventory. Copy is keyed to
i18n, not inlined.

```ts
export type RoomSlug = 'family-suite' | 'triple' | 'double-twin' | 'double';

export interface Room {
  slug: RoomSlug;
  order: 1 | 2 | 3 | 4;
  units: number;
  sleeps: number;
  bedrooms: number;      // 2 for the family suite, 1 for the rest
  bathrooms: 1;
  price: number;         // RON, per room per night
  photos: string[];      // media ids, first = lead
  amenities: string[];   // i18n keys
}

export const rooms: Room[] = [
  { slug: 'family-suite', order: 1, units: 1, sleeps: 4, bedrooms: 2, bathrooms: 1,
    price: 350, photos: ['family-suite-01','-02','-03','-04','-05'], amenities: [] },
  { slug: 'triple',       order: 2, units: 1, sleeps: 3, bedrooms: 1, bathrooms: 1,
    price: 280, photos: ['triple-01','-02','-03','-04','-05'],        amenities: [] },
  { slug: 'double-twin',  order: 3, units: 2, sleeps: 2, bedrooms: 1, bathrooms: 1,
    price: 250, photos: ['double-twin-01','-02','-03','-04','-05'],   amenities: [] },
  { slug: 'double',       order: 4, units: 3, sleeps: 2, bedrooms: 1, bathrooms: 1,
    price: 260, photos: ['double-01','-02','-03','-04','-05'],        amenities: [] },
];
```

**Validation at build time:**

- `sum(units) === 7`
- `sum(units × sleeps) === 17`
- `min(price) === 250` — the "from" headline is derived, never hard-coded
- every `photos` array has ≥ 4 entries and every id resolves to a media record
- every `photos[0]` exists as both `chapter` and `chapter-portrait`

## 5. Edge cases and open questions

| Case | Decision |
|---|---|
| Single occupancy | Not offered as a separate rate. Do not imply it. |
| Extra bed / cot | `[CONFIRM]` — if yes, add one line under the triple and the double. |
| Minimum stay | `[CONFIRM Q10]` — if it exists, it must appear in the rates note, not in small print elsewhere. |
| Whole-house booking | `[CONFIRM]` — 17 guests, one rate. This is a genuinely attractive offer for a Romanian family reunion and is worth a single line under the rates block if it is available. |
| Closed season | `[CONFIRM]` — if the property closes in winter, the hero must not promise otherwise. |
| Currency | RON only. |

## 6. Accessibility

- The rates block is a `<dl>` with `<dt>` = room name and `<dd>` = spec, price,
  and note. Screen readers announce name → value in order.
- The `·` separator is `aria-hidden` and rendered with `::before` content, so it
  is never read as "middle dot".
- Prices must be readable without the `lei` suffix being split onto its own line:
  wrap `350 lei` in `white-space: nowrap`.
