# 06 — Location, attractions and itineraries

The property is in **Alexandru cel Bun, Neamț County**, on the Bistrița valley
about 9 km north-west of Piatra Neamț, on DN15. It sits between the town and the
mountains, which is the whole point of the location: everything below is within
a day trip and nothing is a haul.

> **All distances and drive times in this file are approximate and unverified.**
> They must be checked once against Google Maps from the actual gate before
> launch. They are written with `~` everywhere they appear in the UI.

---

## 1. The five places on the page

Chosen for: reachable in under 90 minutes, visually strong, and collectively
covering mountain / water / town / faith — four different reasons to stay a
second night.

| # | Place | Slug | ~Distance | ~Drive | Why it earns a card |
|---|---|---|---|---|---|
| 1 | Piatra Neamț | `piatra-neamt` | 9 km | 15 min | The nearest town: Cozla hill, the old centre, Ștefan cel Mare's tower, a good coffee |
| 2 | Neamț Monastery | `neamt-monastery` | 20 km | 30 min | The oldest and largest monastic settlement in Moldavia; a working library, a walled precinct |
| 3 | Bicaz gorges | `bicaz-gorges` | 40 km | 55 min | Limestone walls 300 m high, the road cut through them, a river at the bottom |
| 4 | Red Lake | `red-lake` | 55 km | 1 h 10 | A lake that swallowed a forest; the stumps still stand in the water |
| 5 | Ceahlău / Durău | `ceahlau` | 55 km | 1 h 15 | The massif that holds the horizon: Toaca peak at 1,904 m, the Panaghia rock, the Duruitoarea waterfall |

### Optional extras (not on the page in v1)

Mănăstirea Agapia (~33 km), Mănăstirea Văratec (~43 km), Cetatea Neamțului
(~35 km), Barajul Bicaz / Izvorul Muntelui (~30 km), Hanul lui Creangă at
Humulești (~38 km). Mentioned inside itinerary beats rather than as cards.

## 2. Card content

Each attraction card carries exactly four things:

1. `plate` image (3:2)
2. Name — `display-3`
3. `~40 km · ~55 min` in `label` size, `--muted-strong`
4. One sentence of *why*, max 18 words

No opening hours, no ticket prices, no phone numbers. They rot. If a guest wants
them they will search, and a stale "open 09:00–17:00" is worse than none.

## 3. Itineraries

Three plans, each a single day, each with three or four time-stamped beats. They
exist to convert a one-night stay into two. Written in the second person, present
tense, plain.

### A. A slow day (`slow-day`)

> For the first morning, or the day after a long drive.

| Time | Beat |
|---|---|
| 09:00 | Breakfast on the terrace, as long as it takes. |
| 10:30 | Walk down to the Bistrița and along the meadow. No destination. |
| 12:30 | Drive into Piatra Neamț — the old centre, the tower, coffee on the square. |
| 16:00 | Back for the garden. The shade moves; follow it. |
| 19:30 | Dinner at the house. |
| 21:30 | Step outside. There is almost no light pollution here. |

### B. The mountain day (`mountain-day`)

> Ceahlău is a full day and should be treated as one. Start early.

| Time | Beat |
|---|---|
| 07:00 | Breakfast, early. |
| 08:00 | Drive to Durău — about an hour and a quarter. |
| 09:30 | Walk to Poiana Maicilor, then up to Toaca if the weather holds (5–6 h return). The waterfall at Duruitoarea is the short version, 2 h. |
| 14:30 | A late lunch in Durău. |
| 16:30 | Descend; stop at the Bicaz dam on the way back for the view over the reservoir. |
| 19:00 | Back at the house. |

*If the weather turns, swap the mountain for the gorges: the road through Cheile
Bicazului is worth the drive even in rain, and Red Lake is twenty minutes past
it.*

### C. The monastery road (`monastery-road`)

> Three monasteries and a fortress in one loop, none of it rushed.

| Time | Beat |
|---|---|
| 09:00 | Breakfast. |
| 09:45 | Neamț Monastery — the old church first, then the precinct. Half an hour more than you planned. |
| 11:45 | Agapia. The painted interior, and the view back over the valley. |
| 13:00 | Lunch in Târgu Neamț. |
| 14:30 | Neamț Citadel, on the hill above the town. |
| 16:30 | Văratec on the way home, or straight back for the garden. |
| 19:30 | Dinner. |

Each itinerary is rendered as a card with a title, a `1 day` label, and the
beats as a definition list (`<dt>` time / `<dd>` text). Three cards in a row at
`lg`, stacked at `sm`.

## 4. Reference imagery

Use these to brief the design and to populate the cards at launch. They are
**reference and fallback**, not final art. Each is a real photograph of the real
place, which is the only thing that makes them acceptable (see 04 §8).

**Recommended order of preference:** commission 5 photos on a scouting trip >
use these Commons files with credit > use nothing and show a pending block.

### 4.1 Verified Commons candidates

| Place | File | Master size | Ratio | Preview |
|---|---|---|---|---|
| Ceahlău | *Vârful Toaca, Ceahlău mountains* | 6000 × 4000 | 3:2 | [1920px preview](https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/V%C3%A2rful_Toaca_%28Toaca_peak%29%2C_Ceahl%C4%83u_mountains%2C_Romania_%2852290098053%29.jpg/1920px-V%C3%A2rful_Toaca_%28Toaca_peak%29%2C_Ceahl%C4%83u_mountains%2C_Romania_%2852290098053%29.jpg) |
| Ceahlău (portrait) | *Ceahlau 3* | 2322 × 4128 | 9:16 | [preview](https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Ceahlau_3.jpg/1920px-Ceahlau_3.jpg) |
| Bicaz gorges | *Cheile Bicazului (2)* | 2484 × 1668 | 3:2 | [1920px preview](https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Cheile_Bicazului%2C_%28gorges_de_bicaz%29_%282%29.jpg/1920px-Cheile_Bicazului%2C_%28gorges_de_bicaz%29_%282%29.jpg) |
| Bicaz gorges (portrait) | *Cheile Bicazului (1)* | 1329 × 2048 | 2:3 | [preview](https://upload.wikimedia.org/wikipedia/commons/5/54/Cheile_Bicazului%2C_%28gorges_de_bicaz%29_%281%29.jpg) |
| Red Lake | *View of Lacul Roșu from the south end* | 5696 × 2992 | 1.9:1 | [1920px preview](https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/View_of_Lacul_Ro%C8%99u_from_the_south_end_on_a_rainy_day%2C_Gheorgheni%2C_2017.jpg/1920px-View_of_Lacul_Ro%C8%99u_from_the_south_end_on_a_rainy_day%2C_Gheorgheni%2C_2017.jpg) |
| Red Lake (alt) | *Lacu Roșu, Harghita.02* | 3648 × 2736 | 4:3 | [1920px preview](https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Lacu_Ro%C8%99u%2C_Harghita.02.jpg/1920px-Lacu_Ro%C8%99u%2C_Harghita.02.jpg) |
| Piatra Neamț | *P. Neamt 2013 071* | 3088 × 2056 | 3:2 | [1920px preview](https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/P._Neamt_2013_071_%289141211314%29.jpg/1920px-P._Neamt_2013_071_%289141211314%29.jpg) |
| Piatra Neamț (pano) | *Piatra Neamt – panoramio (4)* | 5340 × 1819 | 2.9:1 | [1920px preview](https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Piatra_Neamt_-_panoramio_%284%29.jpg/1920px-Piatra_Neamt_-_panoramio_%284%29.jpg) |
| Neamț Monastery | *Neamt Monastery* | 12061 × 6900 | 1.75:1 | [1920px preview](https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Neamt_Monastery.jpg/1920px-Neamt_Monastery.jpg) |
| Neamț Monastery (alt) | *Mănăstirea Neamț – Mănăstirea Mănăstirilor* | 5184 × 3456 | 3:2 | [1920px preview](https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Manastirea_Neamt_-_Manastirea_Manastirilor.JPG/1920px-Manastirea_Neamt_-_Manastirea_Manastirilor.JPG) |

Each file's own page (linked from the filename on Wikimedia Commons) carries the
author and licence. **Check the licence on the file page before use — do not
assume from this table.** Only the Toaca image is confirmed here: CC BY-SA 2.0,
author `xulescu_g`.

### 4.2 How the ratios map to our classes

- 3:2 files (Toaca, Bicaz, Piatra Neamț, Neamț alt) drop straight into `plate`
  with no cropping. These are the ones to use.
- 4:3 and 1.75:1 files need a crop to 3:2. Crop from the centre and check the
  subject survives.
- Panorama files (2.9:1) are **hero-class only**, never `plate` — a 3:2 crop of a
  5340 × 1819 panorama throws away most of the frame.

### 4.3 Licence notes

- **CC0 / public domain** — no obligation. Prefer these if available.
- **CC BY** — credit required: photographer, licence name, link to the licence.
- **CC BY-SA** — credit required *and* the cropped/edited image must itself be
  published under the same licence. This does not make the website CC BY-SA; the
  site is a collection, not an adaptation of the photo. Still: state the licence
  on the credits page so nobody has to guess.
- **Never** use a photo from a booking site, a tourism board, or a Google Image
  result. Those are almost always all-rights-reserved.

### 4.4 Credit line

A single `Image credits` link in the footer, opening a plain page (or a
`<dialog>`) listing: thumbnail, place, photographer, licence, and a link to the
licence text. This is required, not optional, when any CC BY / BY-SA image ships.

## 5. Copy rules for this section

- Distances are `~`, always, and use `km` (not `mi`).
- Drive times are `~`, always. Write `1 h`, `1 h 15`, `55 min` — never `1.25 h`.
- Do not promise "the best view", "breathtaking", "hidden gem". Say what is there.
- A place name in Romanian stays Romanian in the English page for proper nouns
  (Ceahlău, Bicaz, Neamț), with the English gloss only on first mention:
  `Neamț Monastery`, `Bicaz gorges`, `Red Lake`, `Ceahlău`.
- The Romanian page uses `Mănăstirea Neamț`, `Cheile Bicazului`, `Lacul Roșu`,
  `Masivul Ceahlău`, `Piatra Neamț`.
