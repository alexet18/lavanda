# 07 — Copy deck (EN / RO)

Authoritative wording. If any other spec quotes a line differently, this file
wins. `[CONFIRM]` marks text that cannot be finalised yet.

**Voice:** quiet, specific, hospitable. Plain sentences. No superlatives, no
"breathtaking", no "hidden gem", no "experience". Prefer a concrete noun to an
adjective.

**Romanian is not a translation.** It is written to read as if Romanian were the
original. Where a literal rendering is stiff, the Romanian is rewritten — the
meaning is the contract, not the syntax.

---

## 1. Metadata

**`meta.title`**
EN · Pensiunea Lavanda — a family guesthouse in Neamț
RO · Pensiunea Lavanda — pensiune de familie în Neamț

**`meta.description`**
EN · Seven rooms, a garden, a long table and the Ceahlău mountains at the end of the road. Alexandru cel Bun, Neamț County.
RO · Șapte camere, o grădină, o masă lungă și munții Ceahlău la capătul drumului. Alexandru cel Bun, județul Neamț.

**`meta.ogAlt`**
EN · The garden at Pensiunea Lavanda, with the Bistrița valley behind it
RO · Grădina pensiunii Lavanda, cu valea Bistriței în spate

---

## 2. Navigation

| Key | EN | RO |
|---|---|---|
| `nav.rooms` | Rooms | Camere |
| `nav.house` | The house | Casa |
| `nav.spaces` | Spaces | Spații |
| `nav.explore` | Around | Împrejurimi |
| `nav.stay` | Stay | Sejur |
| `nav.book` | Book a room | Rezervați |
| `nav.langLabel` | Language | Limba |
| `nav.openMenu` | Menu | Meniu |
| `nav.closeMenu` | Close | Închide |
| `a11y.skip` | Skip to content | Sari la conținut |

---

## 3. Hero

**`hero.eyebrow`**
EN · Neamț County · Moldova
RO · Județul Neamț · Moldova

**`hero.wordmark`**
EN · Pensiunea Lavanda
RO · Pensiunea Lavanda

**`hero.line`**
EN · A family house on the Bistrița valley, with seven rooms, a garden that takes the afternoon, and the mountains at the end of the road.
RO · O casă de familie pe valea Bistriței — șapte camere, o grădină care ocupă toată după-amiaza și munții la capătul drumului.

**`hero.scroll`** *(visually hidden on screen, present for screen readers)*
EN · Scroll down
RO · Derulați în jos

---

## 4. The house

**`house.title`**
EN · The house
RO · Casa

**`house.body`**
EN · Lavanda is a small house that grew into a guesthouse. It sits in Alexandru cel Bun, a commune spread over a few villages a quarter of an hour from Piatra Neamț, where the Bistrița runs wide and the road begins to climb toward Bicaz. There are seven rooms, a hall for the long tables, and a kitchen that cooks what the season gives it. Nothing here is far.
RO · Lavanda este o casă mică ce a crescut într-o pensiune. Se află în Alexandru cel Bun, o comună risipită în câteva sate, la un sfert de oră de Piatra Neamț, unde Bistrița curge largă și drumul începe să urce spre Bicaz. Sunt șapte camere, o sală pentru mesele lungi și o bucătărie care gătește ce dă anotimpul. Nimic nu e departe de aici.

| Key | EN | RO |
|---|---|---|
| `house.facts.rooms` | 7 rooms | 7 camere |
| `house.facts.city` | 15 min to Piatra Neamț | 15 min până în Piatra Neamț |
| `house.facts.bicaz` | 1 h to Bicaz gorges | 1 h până la Cheile Bicazului |

---

## 5. Rooms

**`rooms.eyebrow`** — EN · Rooms — RO · Camere

**`rooms.intro`**
EN · Seven rooms, four kinds. Each has its own bathroom, and each looks out either at the garden or at the ridge.
RO · Șapte camere, patru tipuri. Fiecare are baie proprie și privește fie grădina, fie creasta.

### 5.1 Family suite — `family-suite`

| Key | EN | RO |
|---|---|---|
| `.name` | Family suite | Apartament familial |
| `.spec` | 4 guests · 1 double + 2 single · own bathroom | 4 persoane · 1 pat matrimonial + 2 single · baie proprie |
| `.count` | 1 room of this type | 1 cameră de acest tip |

**`.desc`**
EN · Two rooms with one door between them: a double bed for the parents, two single beds for the children, and a bathroom the four of you will not have to queue for.
RO · Două camere cu o ușă între ele: un pat matrimonial pentru părinți, două paturi single pentru copii și o baie la care nu veți sta la coadă în patru.

### 5.2 Triple room — `triple`

| Key | EN | RO |
|---|---|---|
| `.name` | Triple room | Cameră triplă |
| `.spec` | 3 guests · 1 double + 1 single · own bathroom | 3 persoane · 1 pat matrimonial + 1 single · baie proprie |
| `.count` | 1 room of this type | 1 cameră de acest tip |

**`.desc`**
EN · One room, one double bed and one single. The shape most families actually need, without paying for a second room.
RO · O singură cameră, un pat matrimonial și unul single. Forma de care majoritatea familiilor are nevoie, fără să plătească o a doua cameră.

### 5.3 Double twin — `double-twin`

| Key | EN | RO |
|---|---|---|
| `.name` | Double twin | Cameră dublă twin |
| `.spec` | 2 guests · 2 single beds · own bathroom | 2 persoane · 2 paturi single · baie proprie |
| `.count` | 2 rooms of this type | 2 camere de acest tip |

**`.desc`**
EN · Two single beds made up separately — for friends travelling together, or siblings who stopped sharing a room years ago.
RO · Două paturi single, făcute separat — pentru prieteni care călătoresc împreună sau pentru frați care nu mai împart o cameră de ani buni.

### 5.4 Double room — `double`

| Key | EN | RO |
|---|---|---|
| `.name` | Double room | Cameră dublă |
| `.spec` | 2 guests · 1 double bed · own bathroom | 2 persoane · 1 pat matrimonial · baie proprie |
| `.count` | 3 rooms of this type | 3 camere de acest tip |

**`.desc`**
EN · A double bed, a window, and enough quiet to read for an hour without noticing.
RO · Un pat matrimonial, o fereastră și liniștea de care ai nevoie ca să citești o oră fără să observi.

### 5.5 Shared labels

| Key | EN | RO |
|---|---|---|
| `rooms.allPhotos` | See all {n} photos | Vezi toate cele {n} fotografii |
| `rooms.from` | from | de la |
| `rooms.perNight` | / night | / noapte |
| `rooms.details` | What's in the room | Ce găsiți în cameră |
| `rooms.photoCounter` | Photo {i} of {n} — {room} | Fotografia {i} din {n} — {room} |

---

## 6. Rates

**`rates.title`** — EN · Rates — RO · Tarife

**`rates.note`**
EN · Per room, per night. Breakfast `[CONFIRM Q1]`. Tourist tax `[CONFIRM Q9]`.
RO · Pe cameră, pe noapte. Micul dejun `[CONFIRM Q1]`. Taxa turistică `[CONFIRM Q9]`.

**`rates.sleeps`** — EN · sleeps {n} — RO · {n} persoane
**`rates.wholeHouse`** *`[CONFIRM]`* — EN · The whole house sleeps 17. — RO · Toată casa are loc pentru 17 persoane.

---

## 7. Spaces

### 7.1 The garden

| Key | EN | RO |
|---|---|---|
| `spaces.garden.eyebrow` | The garden | Grădina |
| `spaces.garden.title` | A garden that takes the afternoon | O grădină care ocupă toată după-amiaza |

**`.body`**
EN · The lawn runs the length of the house, past the walnut tree, down to the fence and the meadow beyond it. There are tables, but nobody uses them at four in the afternoon — that is what the grass is for.
RO · Gazonul se întinde pe toată lungimea casei, trece de nuc și coboară până la gard, unde începe lunca. Sunt mese, dar la ora patru nimeni nu le folosește — pentru asta e iarba.

### 7.2 The table

| Key | EN | RO |
|---|---|---|
| `spaces.table.eyebrow` | The table | Masa |
| `spaces.table.title` | Breakfast, and then whatever the day brings | Micul dejun și apoi ce aduce ziua |

**`.body`**
EN · Eggs, bread still warm, cheese from the valley, jam made in August. Dinner `[CONFIRM Q2]`. The kitchen cooks Romanian, plainly, with what is in season.
RO · Ouă, pâine încă caldă, brânză din vale, dulceață făcută în august. Cina `[CONFIRM Q2]`. Bucătăria gătește românește, simplu, cu ce este la îndemână în anotimp.

### 7.3 The hall

| Key | EN | RO |
|---|---|---|
| `spaces.hall.eyebrow` | The hall | Sala |
| `spaces.hall.title` | For the long tables | Pentru mesele lungi |
| `spaces.hall.cta` | Ask about the hall | Întrebați despre sală |

**`.body`**
EN · A room of its own, apart from the house, for baptisms, anniversaries and the kind of dinner that runs past midnight. It seats `[CONFIRM Q3]` at long tables.
RO · O încăpere separată de casă, pentru botezuri, aniversări și genul de cină care trece de miezul nopții. Are loc pentru `[CONFIRM Q3]` persoane la mese lungi.

---

## 8. Explore

| Key | EN | RO |
|---|---|---|
| `explore.eyebrow` | Around | Împrejurimi |
| `explore.title` | Five ways to spend a day | Cinci feluri de a-ți petrece o zi |
| `explore.intro` | Where the Bistrița valley meets the mountains. Everything below is a day trip, and nothing is a haul. | Acolo unde valea Bistriței se întâlnește cu munții. Toate cele de mai jos sunt excursii de o zi, iar nimic nu e departe. |
| `explore.itinerariesTitle` | Three days, if you have them | Trei zile, dacă le aveți |

### 8.1 Places

| Slug | Name EN | Name RO | Distance | Why EN | Why RO |
|---|---|---|---|---|---|
| `piatra-neamt` | Piatra Neamț | Piatra Neamț | ~9 km · ~15 min | The nearest town, and a good one: a hill with a cable car, a medieval tower, coffee on the square. | Cel mai apropiat oraș, și unul bun: un deal cu telecabină, un turn medieval, cafea în piață. |
| `neamt-monastery` | Neamț Monastery | Mănăstirea Neamț | ~20 km · ~30 min | The oldest monastic settlement in Moldavia — walled, still working, quietly enormous. | Cea mai veche așezare monahală din Moldova — cu ziduri, încă în funcțiune și tăcut de mare. |
| `bicaz-gorges` | Bicaz gorges | Cheile Bicazului | ~40 km · ~55 min | Three hundred metres of limestone on either side of the road, and a river underneath. | Trei sute de metri de calcar de o parte și de alta a drumului, cu un râu pe dedesubt. |
| `red-lake` | Red Lake | Lacul Roșu | ~55 km · ~1 h 10 | A lake that drowned a forest. The stumps are still standing in the water. | Un lac care a înecat o pădure. Trunchiurile stau încă în apă. |
| `ceahlau` | Ceahlău | Masivul Ceahlău | ~55 km · ~1 h 15 | The mountain that holds the horizon here. Toaca is 1,904 m and takes a day. | Muntele care ține orizontul pe aici. Toaca are 1.904 m și cere o zi întreagă. |

### 8.2 Itinerary — A slow day (`slow-day`)

| Key | EN | RO |
|---|---|---|
| `.title` | A slow day | O zi liniștită |
| `.duration` | One day, no car needed | O zi, fără mașină |
| `.intro` | For the first morning, or the day after a long drive. | Pentru prima dimineață sau pentru ziua de după un drum lung. |

| Time | EN | RO |
|---|---|---|
| 09:00 | Breakfast on the terrace, for as long as it takes. | Micul dejun pe terasă, cât durează. |
| 10:30 | Walk down to the Bistrița and along the meadow. No destination. | Coborâți la Bistrița și mergeți de-a lungul luncii. Fără o țintă. |
| 12:30 | Into Piatra Neamț — the old centre, the tower, coffee on the square. | Spre Piatra Neamț — centrul vechi, turnul, o cafea în piață. |
| 16:00 | Back for the garden. The shade moves; follow it. | Înapoi în grădină. Umbra se mută; urmați-o. |
| 19:30 | Dinner at the house. | Cina la casă. |
| 21:30 | Step outside. There is almost no light pollution here. | Ieșiți afară. Aici aproape nu există poluare luminoasă. |

### 8.3 Itinerary — The mountain day (`mountain-day`)

| Key | EN | RO |
|---|---|---|
| `.title` | The mountain day | Ziua la munte |
| `.duration` | One day, start early | O zi, cu plecare devreme |
| `.intro` | Ceahlău is a full day and should be treated as one. | Ceahlăul cere o zi întreagă și așa trebuie tratat. |

| Time | EN | RO |
|---|---|---|
| 07:00 | Breakfast, early. | Micul dejun, devreme. |
| 08:00 | Drive to Durău — about an hour and a quarter. | Plecare spre Durău — aproximativ o oră și un sfert. |
| 09:30 | Up to Poiana Maicilor, then Toaca if the weather holds — five to six hours return. The waterfall at Duruitoarea is the short version, two hours. | Urcați spre Poiana Maicilor, apoi spre Toaca dacă vremea ține — cinci-șase ore dus-întors. Varianta scurtă este cascada Duruitoarea, două ore. |
| 14:30 | A late lunch in Durău. | Un prânz târziu la Durău. |
| 16:30 | Down, then stop at the Bicaz dam for the view over the reservoir. | Coborâți, apoi opriți la barajul Bicaz pentru vederea spre lac. |
| 19:00 | Back at the house. | Înapoi la pensiune. |

**`.fallback`**
EN · If the weather turns, swap the mountain for the gorges — the road through Cheile Bicazului is worth the drive even in rain, and Red Lake is twenty minutes past it.
RO · Dacă vremea se strică, schimbați muntele cu cheile — drumul prin Cheile Bicazului merită parcurs chiar și pe ploaie, iar Lacul Roșu este la douăzeci de minute după ele.

### 8.4 Itinerary — The monastery road (`monastery-road`)

| Key | EN | RO |
|---|---|---|
| `.title` | The monastery road | Drumul mănăstirilor |
| `.duration` | One day, three monasteries | O zi, trei mănăstiri |
| `.intro` | Three monasteries and a fortress in one loop, none of it rushed. | Trei mănăstiri și o cetate într-o singură buclă, fără grabă. |

| Time | EN | RO |
|---|---|---|
| 09:00 | Breakfast. | Micul dejun. |
| 09:45 | Neamț Monastery — the old church first, then the precinct. Half an hour more than you planned. | Mănăstirea Neamț — mai întâi biserica veche, apoi incinta. O jumătate de oră mai mult decât ați plănuit. |
| 11:45 | Agapia. The painted interior, and the view back over the valley. | Agapia. Interiorul pictat și vederea înapoi spre vale. |
| 13:00 | Lunch in Târgu Neamț. | Prânz la Târgu Neamț. |
| 14:30 | Neamț Citadel, on the hill above the town. | Cetatea Neamțului, pe dealul de deasupra orașului. |
| 16:30 | Văratec on the way home, or straight back for the garden. | Văratec la întoarcere, sau direct acasă, în grădină. |
| 19:30 | Dinner. | Cina. |

---

## 9. Practicalities

| Key | EN | RO |
|---|---|---|
| `stay.title` | Practicalities | Detalii practice |
| `stay.checkin` | Check-in | Sosire |
| `stay.checkinValue` | from 14:00 | de la 14:00 |
| `stay.checkout` | Check-out | Plecare |
| `stay.checkoutValue` | by 11:00 | până la 11:00 |
| `stay.parking` | Parking | Parcare |
| `stay.parkingValue` | `[CONFIRM Q6]` | `[CONFIRM Q6]` |
| `stay.pets` | Pets | Animale de companie |
| `stay.petsValue` | `[CONFIRM Q6]` | `[CONFIRM Q6]` |
| `stay.wifi` | Wi-Fi | Wi-Fi |
| `stay.wifiValue` | `[CONFIRM Q6]` | `[CONFIRM Q6]` |
| `stay.payment` | Payment | Plată |
| `stay.paymentValue` | `[CONFIRM Q6]` | `[CONFIRM Q6]` |
| `stay.languages` | We speak | Vorbim |
| `stay.languagesValue` | Romanian, English | română, engleză |
| `stay.directions` | By car: DN15, fifteen minutes north-west of Piatra Neamț. | Cu mașina: DN15, cincisprezece minute nord-vest de Piatra Neamț. |

---

## 10. Contact

**`contact.title`**
EN · To book, call or write.
RO · Pentru rezervare, sunați sau scrieți.

**`contact.body`**
EN · There is no booking form. A telephone is faster, and we answer it.
RO · Nu avem formular de rezervare. Telefonul e mai rapid și răspundem.

| Key | EN | RO |
|---|---|---|
| `contact.phoneLabel` | Telephone | Telefon |
| `contact.emailLabel` | E-mail | E-mail |
| `contact.whatsapp` | WhatsApp | WhatsApp |
| `contact.map` | Find us | Unde ne găsiți |
| `contact.bookingLink` *`[CONFIRM Q8]`* | Also on Booking.com | Și pe Booking.com |

`[CONFIRM Q4]` — actual phone number, e-mail address, and maps link.

---

## 11. Footer

| Key | EN | RO |
|---|---|---|
| `footer.rights` | © {year} Pensiunea Lavanda | © {year} Pensiunea Lavanda |
| `footer.credits` | Image credits | Credite imagini |
| `footer.privacy` | Privacy | Confidențialitate |
| `footer.builtNote` | Alexandru cel Bun, Neamț, Romania | Alexandru cel Bun, Neamț, România |

---

## 12. Alt text (both languages)

Every content image needs authored alt text. Examples of the required style —
specific, 8–16 words, no "image of":

| Media id | EN | RO |
|---|---|---|
| `family-suite-01` | Family suite: a double bed facing the window, doorway to the children's room on the right | Apartament familial: pat matrimonial spre fereastră, ușa spre camera copiilor în dreapta |
| `family-suite-04` | Family suite bathroom, with a walk-in shower and a window above the basin | Baia apartamentului familial, cu duș walk-in și fereastră deasupra chiuvetei |
| `garden-01` | The garden seen from the terrace, walnut tree in leaf, chairs in the shade | Grădina văzută de pe terasă, nucul înfrunzit, scaune la umbră |
| `hall-01` | The event hall empty, long tables stacked against one wall | Sala de evenimente goală, mesele lungi sprijinite de un perete |
| `ceahlau` | Toaca peak above a ridge of cloud, Ceahlău mountains | Vârful Toaca deasupra unui val de nori, masivul Ceahlău |

`MUST` — no alt text is machine translation. If a Romanian alt is not written,
the image is not ready to ship.
