# 01 — Product scope

## 1. One sentence

A single, quiet, photograph-led page that makes a stranger want to sleep at
Pensiunea Lavanda and tells them exactly how to book it.

## 2. Who arrives

| Visitor | Share (est.) | What they need in 10 seconds |
|---|---|---|
| **Romanian couple / family, weekend** — from Iași, Bacău, Suceava | ~55% | "Is it nice, is it near what we want, what does it cost, can I call?" |
| **Romanian group** — baptism, anniversary, team offsite, looking for the hall | ~15% | "How many seats, what's included, is there a kitchen" |
| **Foreign traveller** — overland through Moldova's monasteries, hiking Ceahlău | ~20% | "Where is this, is it reachable without a car, is English spoken" |
| **Repeat / referral** — sent a link by a friend | ~10% | "Confirm what I was told" |

Design consequence: the page must answer **where**, **what it looks like**, and
**what it costs** without scrolling past three screens of prose.

## 3. Goals

| # | Goal | How we know |
|---|---|---|
| G1 | A visitor understands the property within one screen | Hero + a single line of orientation copy |
| G2 | Rooms and prices are findable in ≤ 2 scrolls | Rates block sits before the "Explore" block |
| G3 | The booking action is always one tap away | Persistent contact CTA in header from `md` up; sticky bar on mobile |
| G4 | The page feels like the place: unhurried, warm, uncluttered | No more than 3 type sizes visible at once; no decorative UI |
| G5 | Works on a 3-year-old Android on 4G | Performance budgets in 10-technical |

## 4. Non-goals

Explicitly **out of scope** for v1. Adding any of these is a new spec.

- Online booking engine, availability calendar, payment.
- CMS. Content lives in the repo; changing it is a commit.
- Blog / journal / news.
- Restaurant menu page with prices.
- Guest reviews section, TripAdvisor widget, star ratings.
- More than two languages.
- A second page. This is one page; anchors only.
- Dark mode. (The design is already dark-on-paper; a dark theme is not a
  one-line change and is not worth the risk.)
- Cookie banner. Only if analytics are added — see 10-technical §8.

## 5. Brand character

**Is:** a family house that happens to take guests. Warm, plain-spoken, a little
understated. Romanian countryside without folkloric decoration — no painted
plates, no embroidered borders, no "traditional" clip art.

**Is not:** a boutique-hotel fantasy, a spa resort, an Airbnb listing with emoji.

**Reference tone** — Aman Tokyo for restraint and photographic confidence; not
for price, scale, or the hushed luxury vocabulary ("sanctuary", "journey",
"curated"). Lavanda should sound like a person, not a brochure.

**Three adjectives to test copy against:** *quiet, specific, hospitable.*
If a sentence is none of the three, cut it.

## 6. The one thing to get right

Photography. Every other decision on this page is in service of letting four
good photographs do their work. If the images are mediocre the page fails,
regardless of the typography.

Consequence, stated as a rule: **no section may be added that pushes the rooms
gallery below the fourth scroll on a 390 × 844 phone.**

## 7. Success criteria for v1

- [ ] A first-time visitor can state the price range and the nearest town after 30 seconds.
- [ ] The Romanian page reads as though it was written in Romanian, not translated.
- [ ] Largest Contentful Paint < 2.0 s on a simulated 4G / mid-range Android.
- [ ] Zero layout shift from images (CLS < 0.02).
- [ ] Every room type has at least 4 photographs of that actual room type.
- [ ] Keyboard-only and screen-reader paths reach every room and the contact action.
