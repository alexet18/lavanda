# 03 — Design system

The system is deliberately small: **2 typefaces, 6 colours, 1 rule weight, 0
shadows, 0 rounded cards.** Anything not listed here is not part of the design.

---

## 1. Principles

1. **Photography carries colour.** The interface stays neutral so the images are
   the only saturated thing on screen.
2. **Space is the decoration.** When a layout feels empty, add margin, not ornament.
3. **One idea per screen.** No section competes with an adjacent one.
4. **Type is hierarchy.** Weight and size, never colour, distinguish levels —
   with the single exception of the lavender accent on links.
5. **Slow but not sluggish.** Motion is 400–900 ms and always responds to input
   within 100 ms.

## 2. Colour

```css
:root {
  /* surfaces */
  --paper:        #FAF8F4;  /* page background, warm off-white */
  --paper-2:      #F2EEE6;  /* alternating band */
  --ink-900:      #14120E;  /* dark chapter background */

  /* text */
  --ink:          #16140F;  /* headings, 17.4:1 on --paper */
  --ink-soft:     #423D34;  /* body, 10.2:1 */
  --muted:        #7A7365;  /* large text only (≥24px), 4.4:1 */
  --muted-strong: #6B6355;  /* all small text, 5.6:1 */

  /* lines */
  --line:         #E3DCCE;  /* 1px rules, table separators */
  --line-strong:  #CFC6B4;  /* hover / focus-adjacent borders */

  /* accent — lavender, used sparingly */
  --accent:       #6F6A8C;  /* links, focus ring, active lang, 4.8:1 */
  --accent-soft:  #EDEAF2;  /* selection, focus halo */
}
```

### Rules

- `MUST` use `--muted-strong` (5.6:1) for all body and small text. `--muted` is
  **large text only** — 24 px or above, where 3:1 is the AA threshold. At 4.4:1 it
  fails AA for normal text, so it is a heading and caption colour, never a body one.
- `MUST NOT` place `--accent` text on `--paper-2`: 4.4:1, which fails AA for
  normal text. Accent links sit on `--paper` (4.8:1) or on `--ink-900` only.
- On `--ink-900`, text is `--paper` at 92% and rules are `rgba(250,248,244,.14)`.
- No pure white (`#FFF`) and no pure black (`#000`) anywhere.
- Selection: `background: var(--accent-soft); color: var(--ink);`

## 3. Typography

### 3.1 Families

| Role | Family | Weights | Fallback stack |
|---|---|---|---|
| Display | **Cormorant Garamond** | 300, 400 | `Georgia, 'Times New Roman', serif` |
| Text | **Inter** | 400, 500 | `system-ui, -apple-system, 'Segoe UI', sans-serif` |

Both are self-hosted `woff2`, subset to `latin` + `latin-ext` — `latin-ext` is
**required** for `ș ț ă î â`. Subsetting failure is an acceptance failure.

### 3.2 Scale

All sizes fluid; no fixed `px` type anywhere except the label.

| Token | Size | Line-height | Tracking | Use |
|---|---|---|---|---|
| `display-1` | `clamp(2.75rem, 9vw, 6.5rem)` | 0.92 | `-0.02em` | Hero wordmark only |
| `display-2` | `clamp(2rem, 5vw, 3.75rem)` | 0.98 | `-0.015em` | Section titles |
| `display-3` | `clamp(1.5rem, 3vw, 2.25rem)` | 1.08 | `-0.01em` | Room names, chapter titles |
| `lede` | `clamp(1.125rem, 1.6vw, 1.375rem)` | 1.55 | `0` | Intro paragraphs |
| `body` | `1.0625rem` (17px) | 1.65 | `0` | All body copy |
| `small` | `0.9375rem` (15px) | 1.55 | `0` | Captions, notes |
| `label` | `0.6875rem` (11px) | 1.2 | `0.16em`, uppercase | Eyebrows, nav, buttons |
| `price` | `1.25rem` | 1.2 | `0.01em` | `font-variant-numeric: tabular-nums` |

**Measure:** body copy is capped at `62ch`; ledes at `48ch`. On the largest
screens this is the main defence against a wall of text.

**Romanian length:** RO strings run **+10–18%** against EN. Never size a
container to an English string's width. Buttons and labels `MUST` be `min-width`
free and use padding only.

### 3.3 Rules

- Display serif is set **only** at weights 300/400. Never bold. Never italic
  except for a single word of emphasis in a section intro (max 1 per section).
- Paragraphs are never centred, except the hero line and the contact heading.
- `text-wrap: balance` on `display-2` and `display-3` headings; `pretty` on body.

## 4. Spacing

4px base. Use tokens, never raw values.

```css
--s-1: 4px;   --s-2: 8px;   --s-3: 12px;  --s-4: 16px;
--s-5: 24px;  --s-6: 32px;  --s-7: 48px;  --s-8: 64px;
--s-9: 96px;  --s-10: 128px; --s-11: 160px; --s-12: 200px;
```

| Context | Mobile | `md` | `lg` |
|---|---|---|---|
| Section padding block | `--s-9` | `--s-10` | `--s-11` |
| Container inline padding | `--s-4` (16) | `--s-6` (32) | `--s-7` (48) |
| Stack: heading → body | `--s-4` | `--s-5` | `--s-5` |
| Stack: body → action | `--s-6` | `--s-6` | `--s-7` |
| Between chapters | `--s-10` | `--s-11` | `--s-12` |

## 5. Grid and container

```css
.container      { width: min(100% - 2 * var(--gutter), 1280px); margin-inline: auto; }
.container--wide{ width: min(100% - 2 * var(--gutter), 1600px); }
.container--text{ width: min(100% - 2 * var(--gutter), 720px);  }
```

- 12 columns, `gap: var(--s-5)` mobile / `--s-6` desktop.
- `--gutter`: 16px → 32px (`≥768`) → 48px (`≥1280`).
- Media is **full-bleed** by default (`width: 100vw; margin-inline: calc(50% - 50vw)`),
  and only respects the container when paired with text in a 2-col band.

## 6. Line, border, radius, shadow

- **One** border weight: `1px`. Colour `--line`.
- Radius: `0`. The only exception is the language switch hit area (invisible) and
  the viewer's close button, which is a circle.
- Shadows: **none**. Depth is conveyed by image scale and spacing. The mobile
  sticky booking bar is the single exception and uses
  `0 -1px 0 var(--line)` — a rule, not a shadow.

## 7. Motion

```css
--ease-out: cubic-bezier(.16, 1, .3, 1);
--dur-1: 200ms;  /* hover, focus */
--dur-2: 400ms;  /* state change */
--dur-3: 700ms;  /* reveal */
--dur-4: 1200ms; /* image scale-in */
```

| Interaction | Spec |
|---|---|
| Link / button hover | Underline offset animates 2px → 0 via `text-decoration-thickness`; `--dur-1` |
| Section reveal | `opacity 0→1`, `translateY 12px→0`, `--dur-3`, triggered at 15% intersection, once only |
| Image reveal | `scale(1.03)→1` + opacity, `--dur-4` |
| Header state | background/colour, `--dur-1` |
| Viewer open | Backdrop `opacity`, image `scale(.985)→1`, `--dur-2` |
| Image hover (room lead) | `scale(1)→1.02`, `--dur-3`, on `hover: hover` devices only |

**Reduced motion:** `@media (prefers-reduced-motion: reduce)` removes all
transforms and reduces every duration to `1ms`. Reveals become instant opacity.
`MUST` be verified with the OS setting, not just DevTools emulation.

## 8. Components

### 8.1 Eyebrow

`label` size, `0.16em` tracking, `--muted-strong` (or `rgba(250,248,244,.74)` on
dark). Preceded by a 24px 1px rule inline-start, `gap: --s-3`. This rule is the
only repeated graphic device in the system — use it consistently or not at all.

### 8.2 Button

Two variants only.

| Variant | Rest | Hover | Active |
|---|---|---|---|
| `solid` | `--ink` bg, `--paper` text, 1px `--ink` border | bg `--ink-soft` | translateY(1px) |
| `ghost` | transparent, 1px `--line-strong` border, `--ink` text | border `--ink`, bg `--paper-2` | translateY(1px) |

- Height 48px, padding-inline `--s-6`, `label` typography, radius 0.
- Min touch target 44×44 including padding — `MUST` verify, not assume.
- Focus: `outline: 2px solid var(--accent); outline-offset: 3px;` never removed.

### 8.3 Text link

`--accent`, `text-decoration: underline`, `text-underline-offset: 0.25em`,
`text-decoration-thickness: 1px`. Underline colour at 40% opacity; on hover,
100%, offset reduced to `0.2em`.

### 8.4 Language switch

Two adjacent `<a>`s: `EN` `RO`, `label` typography, separated by a 1px `/` in
`--line-strong`. Inactive: `--muted-strong`. Active: `--ink` with a 1px underline
2px below baseline. `aria-current="true"` on the active one, inside a
`<nav aria-label="Language">`. Never a `<select>`.

### 8.5 Price

Name left, price right, baseline-aligned, separated by a flexible leader that is
**a 1px rule with `--line`**, not dots. Price uses `tabular-nums`. Currency
suffix `lei` in `small` size, `--muted-strong`, `0.25em` gap.

### 8.6 Chapter image

```css
.chapter__media { position: relative; aspect-ratio: 3 / 2; overflow: clip; }
@media (max-width: 767px) { .chapter__media { aspect-ratio: 4 / 5; } }
.chapter__media img { width: 100%; height: 100%; object-fit: cover; object-position: var(--focal, 50% 50%); }
```

Overlaid text sits on a single bottom gradient (see 02 §2.2). No other overlays.

### 8.7 Viewer

Native `<dialog>` with `::backdrop { background: rgba(20,18,14,.94); }`.
Image centred, `max-height: 92svh`, `max-width: 92vw`, `object-fit: contain`.
Caption bottom-left (`small`, paper 74%). Counter top-right (`label`).
Close button top-right, 44×44, circular 1px border. Arrows appear on `hover:
hover`; on touch, horizontal swipe only. `Esc` closes; `←/→` navigate; focus is
trapped for the dialog's lifetime and restored to the triggering element.

## 9. Iconography

Effectively none. Permitted marks, all drawn as inline SVG stroke `1.5px`:
arrow-right (12×12), arrow-left, close (×), menu (2 lines), chevron-down (12×12,
for the room `details` disclosure). No icon fonts, no 24px icon set, no icons in
buttons next to text.

## 10. Logo / wordmark

Text only. `Pensiunea` in `label` size, `0.18em` tracking, `--muted-strong`,
directly above `Lavanda` in display serif 300. In the header this collapses to
`Lavanda` alone at 19px. No monogram, no laurel, no lavender sprig illustration —
`MAY` be revisited post-launch with a commissioned mark.
