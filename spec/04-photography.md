# 04 — Photography and room galleries

This is the most important file in the spec. The page is a frame for
photographs; everything here is a hard constraint, not a suggestion.

---

## 1. The rule that decides everything else

> A visitor must never have to choose between seeing the room and reading about
> it, and must never see a photograph smaller than it deserves.

Two consequences:

1. **One hero image per screenful.** Never a 3-up grid of thumbnails as the
   *primary* presentation of a room.
2. **No image is displayed below 320 CSS px on its short edge**, except the
   thumbnail strip inside the viewer.

## 2. Frame classes

Every photograph is shot and exported as one of six classes. A frame belongs to
exactly one class; a portrait crop is a *derivative*, not a second frame.

| Class | Ratio | Master (px) | Emitted widths | Max displayed | Where |
|---|---|---|---|---|---|
| `hero-wide` | 16:9 | 3840 × 2160 | 640, 960, 1280, 1600, 1920, 2560, 3200 | 2560 | Home hero, contact band |
| `hero-portrait` | 3:4 | 1500 × 2000 | 390, 480, 640, 768, 960 | 640 | Home hero, mobile only |
| `chapter` | 3:2 | 3600 × 2400 | 640, 960, 1280, 1600, 1920, 2560, 3200 | 2560 | Room leads, space leads |
| `chapter-portrait` | 4:5 | 1600 × 2000 | 390, 480, 640, 768, 960 | 640 | Room/space leads, mobile only |
| `plate` | 3:2 | 2400 × 1600 | 320, 480, 640, 800, 1200, 1600 | 800 | Supporting gallery frames, attraction cards |
| `detail` | 1:1 | 1600 × 1600 | 200, 320, 480, 640, 800 | 480 | Small accents, itinerary thumbnails |
| `thumb` | 3:2 | 480 × 320 | 160, 320, 480 | 160 | Viewer filmstrip only |

### Why these numbers

**The 2× rule.** A 1440 CSS-px full-bleed element on a 2× display needs 2880
device pixels. So the useful ceiling for any full-bleed image is **~2900 px
wide**, and the practical ceiling is **2560 px**: a 27" monitor at 2560 px is
~109 ppi, i.e. a 0.23 mm pixel pitch that the eye stops resolving at about 80 cm
of viewing distance. Past 2560 you are paying for bytes nobody can see — and the
hero is the LCP element, so those bytes are expensive.

**Master sizes are larger than emitted sizes on purpose.** A 3600 × 2400 master
gives you room to crop to 4:5 for mobile (1600 × 2000), to re-crop in future,
and to survive a redesign at a larger size. Masters are archived, never shipped.

**Why 3:2 and not 16:9 for rooms.** 16:9 at full width on a 1440 × 900 screen
gives a 1440 × 810 band — it slices the top of the room and the floor. 3:2
holds a ceiling and a floor line at the same time and is the native ratio of
almost every 24 MP+ camera, so nothing is thrown away. **Do not use 16:9 for
interiors.** 16:9 is for the hero only, where the subject is a landscape.

**Why 4:5 for mobile and not "just crop 3:2".** A 390 × 844 phone in a 3:2
container shows a 390 × 260 band — the room becomes a letterbox slot. A 4:5 crop
at full width gives 390 × 488 and still reads as a room.

## 3. Weight budget

Per emitted file, AVIF at quality 52:

| Emitted width | `hero-wide` / `chapter` | `plate` | `thumb` |
|---|---|---|---|
| 3200 | ≤ 320 KB | — | — |
| 2560 | ≤ 260 KB | — | — |
| 1920 | ≤ 170 KB | — | — |
| 1600 | ≤ 130 KB | ≤ 130 KB | — |
| 1200 | — | ≤ 85 KB | — |
| 800 | — | ≤ 45 KB | — |
| 480 | — | — | ≤ 18 KB |

If a file exceeds budget, **lower quality before lowering resolution.** Target
AVIF q48 on any frame that overshoots.

Formats: `avif` primary → `webp` fallback → `jpg` last resort. JPEG quality 82.
Every frame is emitted in all three so `<picture>` never has a gap.

## 4. Shooting brief

### 4.1 Technical

| Item | Requirement |
|---|---|
| Body | 24 MP minimum (APS-C or larger) for a `master`. A phone cannot produce a master — but it can produce an acceptable `provisional` frame. See §8. |
| Lens | 16–35 mm equivalent for interiors; 24 mm for establishing, 35 mm for details. Never wider than 16 mm (barrel distortion kills verticals). |
| Height | Tripod at **1.25–1.45 m**. Eye level flatters ceilings; waist level flatters beds. |
| Aperture | f/7.1–f/9 for interiors. f/4 for detail. |
| Light | Natural light. Shoot **09:00–11:00** or **16:00–18:30**. Lights on *or* off — never both warm and cool mixed. |
| White balance | Fixed per room, not auto. Grey-card reference once per shoot. |
| Bracketing | 3-stop bracket allowed; HDR only if the result has no halo. No "HDR look". |
| Format | RAW. Deliver 16-bit TIFF or full-quality JPEG at master size. |

### 4.2 Composition rules

- **Verticals vertical.** Correct keystoning in post. A leaning doorframe is the
  single most common tell of amateur interior photography.
- **Two walls, one corner.** Every room shot shows depth. Never a flat wall-on.
- **Bed is the hero.** In every bedroom frame, the bed occupies 40–60% of the
  frame and the headboard is not cropped.
- **Nothing personal.** No clothes, towels on the floor, bins, chargers, cables,
  toiletries, remote controls, or the photographer's bag.
- **Bed dressed, curtains open.** Daylight visible in every frame. One frame per
  room may be shot at dusk with lamps on.
- **Do not move the furniture.** The photographs must match what the guest gets.

### 4.3 Shot list — minimum 31 frames

**Per room type (5 frames each = 20).** Types: `family-suite`, `triple`,
`double-twin`, `double`.

| # | Frame | Class | Notes |
|---|---|---|---|
| 01 | Establishing | `chapter` | From the doorway; bed + window + depth |
| 02 | Bed, 3/4 angle | `chapter` | Headboard visible, no crop |
| 03 | Second sleeping area | `plate` | Family suite: the two singles. Twin: both singles. Triple: the single. Double: the seating corner |
| 04 | Bathroom | `plate` | From the door, 20 mm, towels folded, mirror clean |
| 05 | Window / view / detail | `plate` | What the guest wakes up to. This frame sells the room. |

Portrait crops (`chapter-portrait`) are produced in post from 01 and 05 — do not
shoot a second set.

**Spaces (11).**

| Space | Frames |
|---|---|
| Garden | wide from the terrace · table under the trees · path at dusk |
| Restaurant | room wide · one set table · breakfast spread from above (`detail`) |
| Event hall | empty, wide and symmetric · set for a long table · ceiling/light detail |
| House / exterior | approach from the road · facade at golden hour |

**Attractions (5).** Licensed, not commissioned — see 06. Same `plate` class.

## 5. Post-production and grade

One consistent look, applied to every frame:

- Exposure normalised; highlights **never** clipped to white.
- Blacks lifted slightly (`+3` to `+6` on a 0–255 scale) — this is what makes the
  page feel warm rather than commercial.
- Saturation of greens reduced ~10%. Wood tones untouched.
- Slight warm tint in shadows. **No split-toning, no film LUT, no grain.**
- Vertical correction on every interior.
- Sharpening for screen only: moderate radius, no halos.
- **Crop to the exact ratio of the frame class.** Do not deliver 3:2 files with
  the subject placed for 16:9.

## 6. The room gallery — layout options and decision

Each room type gets a lead plus four supporting frames. The question is how to
present frames 02–05. Four were considered; **A is chosen** (see the decision
below), and the rest are kept here as a record of why not.

### Variant A — "Chapter" ✅ chosen

```
┌───────────────────────────────────────────┐
│                                           │
│          full-bleed chapter image         │  ~86svh, 3:2
│                                           │
│  01 / 05                     Family suite │  over gradient
└───────────────────────────────────────────┘
┌─────────────────────┬─────────────────────┐
│ Family suite        │ ┌─────────────────┐ │
│ 1 double + 2 single │ │     plate 02    │ │  3:2
│ own bathroom        │ └─────────────────┘ │
│                     │ ┌─────────────────┐ │
│ from 350 lei/night  │ │     plate 03    │ │
│                     │ └─────────────────┘ │
│ See all 5 photos →  │ ┌─────────────────┐ │
│                     │ │  plate 04 … 05  │ │
└─────────────────────┴─────────────────────┘
```

- **Desktop:** the left column is `position: sticky; top: 96px` within the band,
  so the name and price stay while the four plates scroll past.
- **Mobile:** lead becomes `chapter-portrait` at 100vw; the four plates stack
  full-width below; the sticky column becomes a plain block.
- **Interaction:** the lead image and each plate open the viewer. `See all 5
  photos` opens the viewer at frame 01.
- **Motion:** each plate reveals with `translateY(24px)` + opacity at 15%
  intersection, once.
- **Cost:** ~1.9 screens per room, 7.6 screens for all four.
- **Why it wins:** maximum size per photograph, zero UI chrome, no hover
  dependency, one clear idea per screen — exactly the Aman behaviour. It is also
  the cheapest to build and the most forgiving of mediocre photography, because
  only one frame is ever on screen at a time.

### Variant A2 — "Chapter, compact"

Identical to A, except the four plates become a **horizontal scroll-snap
strip** under the lead instead of a vertical stack:

```
┌─────────────────────┬──────────────────────────────────────┐
│ Family suite        │ ┌────────┐┌────────┐┌────────┐       │
│ 1 double + 2 single │ │ 02 3:2 ││ 03 3:2 ││ 04 3:2 │  →    │
│ from 350 lei/night  │ └────────┘└────────┘└────────┘       │
└─────────────────────┴──────────────────────────────────────┘
```

- Saves ~0.8 screens per room (~4.6 screens total instead of ~7.6).
- Partial "next" card visible at the right edge as an affordance.
- Risk: a horizontal strip invites fast swiping, which reduces dwell per image.
  That is the opposite of the brief.

### Variant B — "Sticky split"

A rooms index on the left (four rows: name / sleeps / price). Hovering or
focusing a row swaps a large pinned image on the right. Clicking opens a detail
sheet with a 2 × 2 mosaic.

- **Pro:** the most "designed" and the most compact; room comparison is instant.
- **Con:** on touch there is no hover, so it degrades to select-then-open — two
  taps before you see a photograph. And the page opens with a list, not an
  image. That contradicts "illustration focused".
- **Verdict:** excellent for a 20-room boutique hotel with a desktop audience.
  Wrong here.

### Variant C — "Mosaic"

Each room is an asymmetric 4-up mosaic (one large 2×2 cell, three 1×1 cells),
with the name and price in a bar beneath. Any cell opens the viewer.

```
┌───────────────┬─────────┐
│               │   02    │
│      01       ├─────────┤
│               │   03    │
├───────────────┴─────────┤
│ 04     │ Family suite   │
└────────┴────────────────┘
```

- **Pro:** four photographs visible at once — the strongest "gallery" reading,
  and the fastest way to convey a room's whole character.
- **Con:** every image is small (a 1440-wide mosaic gives ~700 px and ~350 px
  cells), so detail is lost; the asymmetry needs careful ratio discipline or it
  looks like a template; and it flattens the difference between a 350 lei suite
  and a 250 lei twin, because all four look similarly "busy".
- **Verdict:** strong as a *detail page* layout, or as the viewer's index view.
  Too busy for the scroll spine of a minimalist page.

### Decision — Variant A

**Decided 2026-11-08: Variant A.** The lead is a full-bleed `chapter`, followed by
four `plate` frames beside a sticky detail column. Variant C is kept **inside the
viewer only**, as the "all photos" index view.

Why this and not the alternatives, recorded so it is not relitigated:

- A gives the largest possible image per screen, which is the entire brief.
- A needs no hover, so desktop and phone behave identically.
- A is the most forgiving of provisional photography (see §8), because only one
  frame is judged at a time. A mosaic exposes every weakness at once.
- A2 was rejected because a horizontal strip invites swiping rather than looking.
- B was rejected because it opens on a list, contradicting "illustration focused".
- C was rejected as the spine because at 1440 px it caps images at ~700 px and
  makes a 350 lei suite and a 250 lei twin look equally busy.

If the page later proves too long on mobile, A2 is the documented fallback — it
is a CSS change to `.room__plates`, not a rebuild.

### Behaviour shared by all variants

- Images are `loading="lazy"` except the hero; `decoding="async"` everywhere.
- Explicit `width`/`height` attributes derived from the class ratio — no CLS.
- `object-position` comes from a per-frame `focal` value (e.g. `50% 42%`).
- The viewer is a `<dialog>`; `Esc` closes; `←`/`→` navigate; focus is trapped
  and restored. It announces `"Photo 2 of 5 — Family suite"` via `aria-live`.
- No autoplay, no auto-advance, no looping, no Ken Burns.

## 7. Markup contract

```html
<picture>
  <!-- portrait crop, phones only -->
  <source
    media="(max-width: 767px)"
    type="image/avif"
    sizes="100vw"
    srcset="/media/rooms/family-suite/family-suite-01-p-390.avif 390w,
            /media/rooms/family-suite/family-suite-01-p-480.avif 480w,
            /media/rooms/family-suite/family-suite-01-p-640.avif 640w,
            /media/rooms/family-suite/family-suite-01-p-960.avif 960w">
  <!-- landscape -->
  <source type="image/avif" sizes="100vw"
    srcset="…-640.avif 640w, …-960.avif 960w, …-1280.avif 1280w,
            …-1600.avif 1600w, …-1920.avif 1920w,
            …-2560.avif 2560w, …-3200.avif 3200w">
  <source type="image/webp" sizes="100vw" srcset="…">
  <img
    src="/media/rooms/family-suite/family-suite-01-1600.jpg"
    alt="Family suite: a double bed and a doorway to the second room, morning light on the left wall"
    width="3600" height="2400"
    loading="lazy" decoding="async"
    style="--focal: 50% 42%">
</picture>
```

`width`/`height` are always the **master ratio**, so the browser reserves the
correct box before the file arrives.

### Naming

```
public/media/{space}/{slug}-{nn}[-p].{ext}
public/media/rooms/family-suite/family-suite-01.avif
public/media/rooms/family-suite/family-suite-01-p.avif   ← portrait variant
public/media/rooms/family-suite/family-suite-01-1600.avif
```

`{nn}` is the shot-list index, zero-padded. Slugs are lowercase kebab-case and
match the room data keys in 05-rooms.md.

### Alt text

Authored in **both** languages, per frame, in the media data file. Rules:

- Describe the room *and* the specific thing in this frame.
- Never `"Room"`, `"Interior"`, `"Photo 2"`, and never the room name alone.
- 8–16 words. Decorative duplicates get `alt=""` and `aria-hidden="true"`.
- RO alt text is written, not machine-translated (see 07).

## 8. Asset tiers — phone photos exist, masters do not

**Answered 2026-11-08:** some photographs exist, shot on a phone. No DSLR masters
yet. That does not block the build, but it changes what ships and what must be
fixed later.

Every frame carries one of three tiers in `src/data/media.ts`:

| Tier | Flag | Meaning | Ships to production |
|---|---|---|---|
| `master` | — | Meets §2 master sizes and §4.1 camera requirements | Yes |
| `provisional` | `provisional: true` | Real photograph of the real room, phone-captured, meets the bar below | Yes, with the ladder capped |
| `placeholder` | `data-placeholder` | No photograph at all | **Never** |

### 8.1 The good news, precisely

Resolution is **not** the blocker. A 12 MP phone writes 4032 × 3024 (4:3).
Cropped to 3:2 that is **4032 × 2688**, which clears the `chapter` master floor
of 3600 × 2400. A 4:5 crop of the same file is 2419 × 3024, which clears
1600 × 2000 with room to spare. The whole ladder can be emitted from a phone.

What is missing is optical quality: a small sensor, a wide lens with soft
corners, aggressive computational sharpening, and HDR halos.

### 8.2 Provisional acceptance bar

A phone frame may ship as `provisional` only if **all** of these hold:

- [ ] Shot at the **maximum** resolution, **4:3** aspect (never 16:9 — it throws
      away a quarter of the sensor).
- [ ] Main lens only. **No** ultrawide (0.5×), **no** digital zoom, **no**
      portrait-mode bokeh.
- [ ] HDR off, or the output has no white halo along window frames and lamps.
- [ ] Daylight, no flash, ceiling lights off. One colour temperature in the frame.
- [ ] Phone braced — tripod, or resting on a stable surface. Not one-handed.
- [ ] Verticals are vertical after correction. A leaning doorframe is a reshoot,
      not a fix.
- [ ] Window highlights retain detail; the room is not a dark silhouette against
      a blown-out window.
- [ ] No people, no clutter, no towels, no chargers, no bin.
- [ ] At 100% there is no visible smearing in the shadows.
- [ ] The room still looks like this today.

### 8.3 Consequences in code

- **Cap the ladder at the master's real width.** Do not emit a 3200 rung from a
  file that only supports 2400 — upscaling makes a phone photo look worse than
  the original. `Picture` reads `media.nativeWidth` and drops rungs above it.
- `data-provisional="true"` is emitted on the `<picture>` and counted by the
  build. **Do not** show a "provisional photo" badge to visitors; that is
  self-sabotage. The flag exists for the team, not the guest.
- `[CONFIRM]` launch policy: ship on provisional photographs, or hold the rooms
  section until the shoot? **Recommendation:** ship. A real phone photograph of
  the real room converts better than a grey block, and the shot list (§4.3) is
  the next planned action.
- CI prints `provisional: N of M frames` on every build so the debt is visible.

### 8.4 Never

- **No stock interiors.** A guest who arrives expecting a stock room and gets a
  different room leaves a one-star review. This is the most expensive shortcut
  available on this project.
- **No upscaling.**
- **No image that no longer matches the room.** Replacing a bed, curtains or
  furniture invalidates the frame; retire it.
- Attraction plates **are** licensed photographs of the actual places — those are
  truthful and ship with credit (06 §4).

### 8.5 Build guard

`pnpm build` `MUST` fail if `data-placeholder` would render when
`PUBLIC_ENV=production`, so a grey block cannot reach a guest by accident.

## 9. QA checklist

- [ ] Every room type has ≥ 4 photographs of **that** room type.
- [ ] Every frame is tiered: `master` or `provisional`; `placeholder` count is zero in production.
- [ ] No frame emits a ladder rung above its native width (no upscaling).
- [ ] Provisional frames pass the §8.2 bar — checked at 100%, not on a thumbnail.
- [ ] No image displayed below 320 px on its short edge.
- [ ] Verticals are vertical in every interior.
- [ ] No 16:9 room images anywhere.
- [ ] Hero has `fetchpriority="high"` and is preloaded; nothing else is.
- [ ] Every file within budget (§3).
- [ ] All three formats exist for every frame.
- [ ] `alt` present in both locales, no empty alt on content images.
- [ ] Portrait crops exist for every `chapter` frame.
- [ ] `focal` set on any frame whose subject is off-centre.
- [ ] Checked at 360, 390, 768, 1024, 1440, 1920, 2560 px.
- [ ] Checked on a real phone at 3× DPR — not only in DevTools.
- [ ] Reduced-motion: reveals are instant, no zoom on hover.
