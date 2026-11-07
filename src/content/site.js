/**
 * All copy, both locales, in one place.
 *
 * `en` and `ro` must have exactly the same shape — build.mjs walks both and
 * fails on any key that exists in one and not the other.
 *
 * Placeholders that still need a real value are marked [CONFIRM] in comments
 * and listed in README.md, not rendered as brackets on the page.
 */

export const contact = {
  // Replace before launch. Deliberately non-working placeholder values.
  phone: '+40 700 000 000',
  phoneHref: '+40700000000',
  email: 'rezervari@pensiunealavanda.ro',
  whatsapp: 'https://wa.me/40700000000',
  maps: 'https://maps.google.com/?q=Pensiunea+Lavanda+Alexandru+cel+Bun',
  placeholder: true,
};

export const site = {
  en: {
    locale: 'en',
    path: '/',
    altPath: '/ro/',
    htmlLang: 'en',

    meta: {
      title: 'Pensiunea Lavanda — a family guesthouse in Neamț',
      description:
        'Seven rooms, a restaurant, a hall for eighty and a firewood tub in the garden. Alexandru cel Bun, Neamț — fifteen minutes from Piatra Neamț.',
    },

    nav: {
      rooms: 'Rooms',
      table: 'The table',
      events: 'Events',
      garden: 'The garden',
      explore: 'Around',
      stay: 'Stay',
      book: 'Book',
    },

    hero: {
      eyebrow: 'Alexandru cel Bun · Neamț · Moldova',
      title: 'Pensiunea Lavanda',
      line: 'A family house on the Bistrița valley: seven rooms, a garden, a hall for eighty, and the mountains at the end of the road.',
      cta: 'Rooms and rates',
      scroll: 'Scroll',
    },

    house: {
      eyebrow: 'The house',
      title: 'A small house that grew into a guesthouse',
      body: 'Lavanda sits in Alexandru cel Bun, a commune spread over a few villages a quarter of an hour from Piatra Neamț, where the Bistrița runs wide and the road begins to climb toward Bicaz. There are seven rooms, a restaurant that cooks what the season gives it, a hall for the long tables, and a garden that takes the whole afternoon. Nothing here is far.',
      facts: [
        { value: '7', label: 'rooms' },
        { value: '80', label: 'seats in the hall' },
        { value: '15 min', label: 'to Piatra Neamț' },
        { value: '1 h', label: 'to Bicaz gorges' },
      ],
    },

    rooms: {
      eyebrow: 'Rooms',
      title: 'Seven rooms, four kinds',
      intro:
        'Each has its own bathroom, and each looks out at the garden or the ridge.',
      from: 'from',
      perNight: '/ night',
      allPhotos: 'All {n} photographs',
      sleeps: 'sleeps {n}',
      items: {
        'family-suite': {
          name: 'Family suite',
          spec: '4 guests · 1 double + 2 single · own bathroom',
          desc: 'Two rooms with one door between them: a double bed for the parents, two single beds for the children, and a bathroom the four of you will not have to queue for.',
          count: 'one room of this type',
          alt: 'Family suite',
        },
        triple: {
          name: 'Triple room',
          spec: '3 guests · 1 double + 1 single · own bathroom',
          desc: 'One room, one double bed and one single. The shape most families actually need, without paying for a second room.',
          count: 'one room of this type',
          alt: 'Triple room',
        },
        'double-twin': {
          name: 'Double twin',
          spec: '2 guests · 2 single beds · own bathroom',
          desc: 'Two single beds made up separately — for friends travelling together, or siblings who stopped sharing a room years ago.',
          count: 'two rooms of this type',
          alt: 'Double twin',
        },
        double: {
          name: 'Double room',
          spec: '2 guests · 1 double bed · own bathroom',
          desc: 'A double bed, a window, and enough quiet to read for an hour without noticing.',
          count: 'three rooms of this type',
          alt: 'Double room',
        },
      },
    },

    rates: {
      eyebrow: 'Rates',
      title: 'What a night costs',
      note: 'Per room, per night, breakfast included — served in the restaurant from eight until ten.',
      note2: 'Rates are in lei. Longer stays and the whole house, on request.',
    },

    table: {
      eyebrow: 'The table',
      title: 'Breakfast, and then whatever the day brings',
      breakfast: {
        title: 'Breakfast',
        body: 'Eggs, bread still warm, cheese from the valley, jam made here in August, coffee that keeps coming. It is served in the restaurant and it does not close at half past.',
        items: [
          'Eggs, cooked how you ask',
          'Bread from the village bakery',
          'Cheese and smoked meats from the valley',
          'Jam made here in August',
          'Fruit, honey, coffee, tea',
        ],
        note: 'Half board and packed breakfasts for early starts, on request.',
      },
      restaurant: {
        title: 'The restaurant',
        body: 'One long room with a beam down the middle and windows on two sides. Black tables, white chairs, greenery hanging from the lights. This is where the family eats too, which is the only review that matters.',
        note: 'Open to guests and to the village. Dinner by arrangement.',
      },
    },

    events: {
      eyebrow: 'Events',
      title: 'A room of its own',
      intro:
        'Separate from the house, for baptisms, weddings, anniversaries and the kind of dinner that runs past midnight.',
      capacity: 'guests, at long tables',
      types: [
        'Weddings',
        'Baptisms and christenings',
        'Anniversaries and birthdays',
        'Company dinners and team days',
      ],
      indoorTitle: 'Inside',
      indoor:
        'The hall takes eighty at long tables, with the kitchen next door and room for a band at one end.',
      outdoorTitle: 'Outside',
      outdoor:
        'In summer the party moves out: tables under the pergolas, the lawn for the children, and the garden lit until it is time to stop.',
      cta: 'Ask about the hall',
    },

    tub: {
      eyebrow: 'After a day outside',
      title: 'The firewood tub',
      body: 'A wood-fired tub at the edge of the garden, forty degrees, steam going straight up into the cold. Best after a day on Ceahlău — in the dark, with snow on the pines and nothing else on the schedule.',
      note: 'Heated on request; tell us an hour before you want it.',
    },

    garden: {
      eyebrow: 'The garden',
      title: 'The reason for the name',
      body: 'A lawn the length of the house, young pines, and a bed of lavender that gives the place its name. Tables under the pergolas for lunch; the grass for everything after.',
    },

    explore: {
      eyebrow: 'Around',
      title: 'Five ways to spend a day',
      intro:
        'Where the Bistrița valley meets the mountains. Everything below is a day trip, and nothing is a haul.',
      places: {
        'piatra-neamt': {
          name: 'Piatra Neamț',
          distance: '~9 km · ~15 min',
          why: 'The nearest town, and a good one: a hill with a cable car, a medieval tower, coffee on the square.',
        },
        'neamt-monastery': {
          name: 'Neamț Monastery',
          distance: '~20 km · ~30 min',
          why: 'The oldest monastic settlement in Moldavia — walled, still working, quietly enormous.',
        },
        'bicaz-gorges': {
          name: 'Bicaz gorges',
          distance: '~40 km · ~55 min',
          why: 'Three hundred metres of limestone on either side of the road, and a river underneath.',
        },
        'red-lake': {
          name: 'Red Lake',
          distance: '~55 km · ~1 h 10',
          why: 'A lake that drowned a forest. The stumps are still standing in the water.',
        },
        ceahlau: {
          name: 'Ceahlău',
          distance: '~55 km · ~1 h 15',
          why: 'The mountain that holds the horizon here. Toaca is 1,904 m and takes a day.',
        },
      },
      itinerariesTitle: 'Three days, if you have them',
      itineraryIntro: 'Written for a two-night stay. Take them in any order.',
      itineraries: {
        'slow-day': {
          title: 'A slow day',
          duration: 'One day, no car needed',
          beats: [
            { time: '09:00', text: 'Breakfast on the terrace, for as long as it takes.' },
            { time: '10:30', text: 'Walk down to the Bistrița and along the meadow. No destination.' },
            { time: '12:30', text: 'Into Piatra Neamț — the old centre, the tower, coffee on the square.' },
            { time: '16:00', text: 'Back for the garden. The shade moves; follow it.' },
            { time: '19:30', text: 'Dinner at the house.' },
            { time: '21:30', text: 'Step outside. There is almost no light pollution here.' },
          ],
        },
        'mountain-day': {
          title: 'The mountain day',
          duration: 'One day, start early',
          beats: [
            { time: '07:00', text: 'Breakfast, early.' },
            { time: '08:00', text: 'Drive to Durău — about an hour and a quarter.' },
            { time: '09:30', text: 'Up to Poiana Maicilor, then Toaca if the weather holds. Five to six hours return; the Duruitoarea waterfall is the short version, two hours.' },
            { time: '14:30', text: 'A late lunch in Durău.' },
            { time: '16:30', text: 'Down, then stop at the Bicaz dam for the view over the reservoir.' },
            { time: '19:00', text: 'Back at the house. The tub is hot.' },
          ],
        },
        'monastery-road': {
          title: 'The monastery road',
          duration: 'One day, three monasteries',
          beats: [
            { time: '09:00', text: 'Breakfast.' },
            { time: '09:45', text: 'Neamț Monastery — the old church first, then the precinct. Half an hour more than you planned.' },
            { time: '11:45', text: 'Agapia. The painted interior, and the view back over the valley.' },
            { time: '13:00', text: 'Lunch in Târgu Neamț.' },
            { time: '14:30', text: 'Neamț Citadel, on the hill above the town.' },
            { time: '16:30', text: 'Văratec on the way home, or straight back for the garden.' },
          ],
        },
      },
    },

    stay: {
      eyebrow: 'Stay',
      title: 'The practical part',
      items: [
        { label: 'Check-in', value: 'from 14:00' },
        { label: 'Check-out', value: 'by 11:00' },
        { label: 'Parking', value: 'free, in the courtyard' },
        { label: 'Pets', value: 'by arrangement' },
        { label: 'Wi-Fi', value: 'throughout the house' },
        { label: 'Payment', value: 'cash or card' },
        { label: 'We speak', value: 'Romanian, English' },
      ],
      directions:
        'By car: DN15, fifteen minutes north-west of Piatra Neamț, on the road to Bicaz.',
    },

    contact: {
      title: 'To book, call or write.',
      body: 'There is no booking form. A telephone is faster, and we answer it.',
      phoneLabel: 'Telephone',
      emailLabel: 'E-mail',
      whatsappLabel: 'WhatsApp',
      mapLabel: 'Find us',
      address: 'Alexandru cel Bun, Neamț, Romania',
    },

    footer: {
      rights: '© {year} Pensiunea Lavanda',
      credits: 'Image credits',
      creditsTitle: 'Image credits',
      creditsBody:
        'Photographs of the property are our own, taken pending a professional shoot. Photographs of the surrounding places are used under the licences listed below.',
      close: 'Close',
    },

    ui: {
      skip: 'Skip to content',
      menu: 'Menu',
      closeMenu: 'Close menu',
      langLabel: 'Language',
      nextPhoto: 'Next photograph',
      prevPhoto: 'Previous photograph',
      photoOf: 'Photograph {i} of {n} — {name}',
      openGallery: 'Open the photographs',
      viewPhoto: 'View photograph',
    },
  },

  ro: {
    locale: 'ro',
    path: '/ro/',
    altPath: '/',
    htmlLang: 'ro',

    meta: {
      title: 'Pensiunea Lavanda — pensiune de familie în Neamț',
      description:
        'Șapte camere, restaurant, sală pentru optzeci de persoane și un ciubăr cu lemne în grădină. Alexandru cel Bun, Neamț — la cincisprezece minute de Piatra Neamț.',
    },

    nav: {
      rooms: 'Camere',
      table: 'Masa',
      events: 'Evenimente',
      garden: 'Grădina',
      explore: 'Împrejurimi',
      stay: 'Sejur',
      book: 'Rezervați',
    },

    hero: {
      eyebrow: 'Alexandru cel Bun · Neamț · Moldova',
      title: 'Pensiunea Lavanda',
      line: 'O casă de familie pe valea Bistriței: șapte camere, o grădină, o sală pentru optzeci de oameni și munții la capătul drumului.',
      cta: 'Camere și tarife',
      scroll: 'Derulați',
    },

    house: {
      eyebrow: 'Casa',
      title: 'O casă mică ce a crescut într-o pensiune',
      body: 'Lavanda se află în Alexandru cel Bun, o comună risipită în câteva sate, la un sfert de oră de Piatra Neamț, unde Bistrița curge largă și drumul începe să urce spre Bicaz. Sunt șapte camere, un restaurant care gătește ce dă anotimpul, o sală pentru mesele lungi și o grădină care ocupă toată după-amiaza. Nimic nu e departe de aici.',
      facts: [
        { value: '7', label: 'camere' },
        { value: '80', label: 'locuri în sală' },
        { value: '15 min', label: 'până în Piatra Neamț' },
        { value: '1 h', label: 'până la Cheile Bicazului' },
      ],
    },

    rooms: {
      eyebrow: 'Camere',
      title: 'Șapte camere, patru tipuri',
      intro:
        'Fiecare are baie proprie și privește fie grădina, fie creasta.',
      from: 'de la',
      perNight: '/ noapte',
      allPhotos: 'Toate cele {n} fotografii',
      sleeps: '{n} persoane',
      items: {
        'family-suite': {
          name: 'Apartament familial',
          spec: '4 persoane · 1 pat matrimonial + 2 single · baie proprie',
          desc: 'Două camere cu o ușă între ele: un pat matrimonial pentru părinți, două paturi single pentru copii și o baie la care nu veți sta la coadă în patru.',
          count: 'o cameră de acest tip',
          alt: 'Apartament familial',
        },
        triple: {
          name: 'Cameră triplă',
          spec: '3 persoane · 1 pat matrimonial + 1 single · baie proprie',
          desc: 'O singură cameră, un pat matrimonial și unul single. Forma de care majoritatea familiilor are nevoie, fără să plătească o a doua cameră.',
          count: 'o cameră de acest tip',
          alt: 'Cameră triplă',
        },
        'double-twin': {
          name: 'Cameră dublă twin',
          spec: '2 persoane · 2 paturi single · baie proprie',
          desc: 'Două paturi single, făcute separat — pentru prieteni care călătoresc împreună sau pentru frați care nu mai împart o cameră de ani buni.',
          count: 'două camere de acest tip',
          alt: 'Cameră dublă twin',
        },
        double: {
          name: 'Cameră dublă',
          spec: '2 persoane · 1 pat matrimonial · baie proprie',
          desc: 'Un pat matrimonial, o fereastră și liniștea de care ai nevoie ca să citești o oră fără să observi.',
          count: 'trei camere de acest tip',
          alt: 'Cameră dublă',
        },
      },
    },

    rates: {
      eyebrow: 'Tarife',
      title: 'Cât costă o noapte',
      note: 'Pe cameră, pe noapte, cu micul dejun inclus — servit în restaurant între opt și zece.',
      note2: 'Tarifele sunt în lei. Sejururile lungi și toată casa, la cerere.',
    },

    table: {
      eyebrow: 'Masa',
      title: 'Micul dejun și apoi ce aduce ziua',
      breakfast: {
        title: 'Micul dejun',
        body: 'Ouă, pâine încă caldă, brânză din vale, dulceață făcută aici în august, cafea care nu se termină. Se servește în restaurant și nu se închide la nouă și jumătate.',
        items: [
          'Ouă, făcute cum cereți',
          'Pâine de la brutăria din sat',
          'Brânză și afumături din vale',
          'Dulceață făcută aici, în august',
          'Fructe, miere, cafea, ceai',
        ],
        note: 'Demipensiune și pachete pentru plecări devreme, la cerere.',
      },
      restaurant: {
        title: 'Restaurantul',
        body: 'O sală lungă, cu o grindă pe la mijloc și ferestre pe două laturi. Mese negre, scaune albe, verdeață atârnând de lămpi. Aici mănâncă și familia, care e singura recenzie care contează.',
        note: 'Deschis pentru oaspeți și pentru sat. Cina la cerere.',
      },
    },

    events: {
      eyebrow: 'Evenimente',
      title: 'O încăpere a ei',
      intro:
        'Separată de casă, pentru botezuri, nunți, aniversări și genul de cină care trece de miezul nopții.',
      capacity: 'invitați, la mese lungi',
      types: [
        'Nunți',
        'Botezuri',
        'Aniversări și zile de naștere',
        'Cine de firmă și team building',
      ],
      indoorTitle: 'Înăuntru',
      indoor:
        'Sala primește optzeci de persoane la mese lungi, cu bucătăria alături și loc pentru o formație la un capăt.',
      outdoorTitle: 'Afară',
      outdoor:
        'Vara, petrecerea se mută afară: mese sub pergole, gazonul pentru copii și grădina luminată până când e timpul să se termine.',
      cta: 'Întrebați despre sală',
    },

    tub: {
      eyebrow: 'După o zi afară',
      title: 'Ciubărul cu lemne',
      body: 'Ciubăr încălzit cu lemne, la marginea grădinii, patruzeci de grade, aburul urcând drept în frig. Cel mai bun lucru după o zi pe Ceahlău — pe întuneric, cu zăpadă pe brazi și nimic altceva pe agendă.',
      note: 'Se încălzește la cerere; spuneți-ne cu o oră înainte.',
    },

    garden: {
      eyebrow: 'Grădina',
      title: 'Motivul numelui',
      body: 'Un gazon pe toată lungimea casei, pini tineri și un strat de lavandă care dă numele locului. Mese sub pergole pentru prânz; iarba pentru tot ce urmează.',
    },

    explore: {
      eyebrow: 'Împrejurimi',
      title: 'Cinci feluri de a-ți petrece o zi',
      intro:
        'Acolo unde valea Bistriței se întâlnește cu munții. Toate cele de mai jos sunt excursii de o zi, iar nimic nu e departe.',
      places: {
        'piatra-neamt': {
          name: 'Piatra Neamț',
          distance: '~9 km · ~15 min',
          why: 'Cel mai apropiat oraș, și unul bun: un deal cu telecabină, un turn medieval, cafea în piață.',
        },
        'neamt-monastery': {
          name: 'Mănăstirea Neamț',
          distance: '~20 km · ~30 min',
          why: 'Cea mai veche așezare monahală din Moldova — cu ziduri, încă în funcțiune și tăcut de mare.',
        },
        'bicaz-gorges': {
          name: 'Cheile Bicazului',
          distance: '~40 km · ~55 min',
          why: 'Trei sute de metri de calcar de o parte și de alta a drumului, cu un râu pe dedesubt.',
        },
        'red-lake': {
          name: 'Lacul Roșu',
          distance: '~55 km · ~1 h 10',
          why: 'Un lac care a înecat o pădure. Trunchiurile stau încă în apă.',
        },
        ceahlau: {
          name: 'Masivul Ceahlău',
          distance: '~55 km · ~1 h 15',
          why: 'Muntele care ține orizontul pe aici. Toaca are 1.904 m și cere o zi întreagă.',
        },
      },
      itinerariesTitle: 'Trei zile, dacă le aveți',
      itineraryIntro: 'Gândite pentru un sejur de două nopți. În orice ordine.',
      itineraries: {
        'slow-day': {
          title: 'O zi liniștită',
          duration: 'O zi, fără mașină',
          beats: [
            { time: '09:00', text: 'Micul dejun pe terasă, cât durează.' },
            { time: '10:30', text: 'Coborâți la Bistrița și mergeți de-a lungul luncii. Fără o țintă.' },
            { time: '12:30', text: 'Spre Piatra Neamț — centrul vechi, turnul, o cafea în piață.' },
            { time: '16:00', text: 'Înapoi în grădină. Umbra se mută; urmați-o.' },
            { time: '19:30', text: 'Cina la casă.' },
            { time: '21:30', text: 'Ieșiți afară. Aici aproape nu există poluare luminoasă.' },
          ],
        },
        'mountain-day': {
          title: 'Ziua la munte',
          duration: 'O zi, cu plecare devreme',
          beats: [
            { time: '07:00', text: 'Micul dejun, devreme.' },
            { time: '08:00', text: 'Plecare spre Durău — aproximativ o oră și un sfert.' },
            { time: '09:30', text: 'Urcați spre Poiana Maicilor, apoi spre Toaca dacă ține vremea. Cinci-șase ore dus-întors; cascada Duruitoarea e varianta scurtă, două ore.' },
            { time: '14:30', text: 'Un prânz târziu la Durău.' },
            { time: '16:30', text: 'Coborâți, apoi opriți la barajul Bicaz pentru vederea spre lac.' },
            { time: '19:00', text: 'Înapoi la pensiune. Ciubărul e cald.' },
          ],
        },
        'monastery-road': {
          title: 'Drumul mănăstirilor',
          duration: 'O zi, trei mănăstiri',
          beats: [
            { time: '09:00', text: 'Micul dejun.' },
            { time: '09:45', text: 'Mănăstirea Neamț — mai întâi biserica veche, apoi incinta. O jumătate de oră mai mult decât ați plănuit.' },
            { time: '11:45', text: 'Agapia. Interiorul pictat și vederea înapoi spre vale.' },
            { time: '13:00', text: 'Prânz la Târgu Neamț.' },
            { time: '14:30', text: 'Cetatea Neamțului, pe dealul de deasupra orașului.' },
            { time: '16:30', text: 'Văratec la întoarcere, sau direct acasă, în grădină.' },
          ],
        },
      },
    },

    stay: {
      eyebrow: 'Sejur',
      title: 'Partea practică',
      items: [
        { label: 'Sosire', value: 'de la 14:00' },
        { label: 'Plecare', value: 'până la 11:00' },
        { label: 'Parcare', value: 'gratuită, în curte' },
        { label: 'Animale', value: 'la înțelegere' },
        { label: 'Wi-Fi', value: 'în toată casa' },
        { label: 'Plată', value: 'numerar sau card' },
        { label: 'Vorbim', value: 'română, engleză' },
      ],
      directions:
        'Cu mașina: DN15, cincisprezece minute nord-vest de Piatra Neamț, pe drumul spre Bicaz.',
    },

    contact: {
      title: 'Pentru rezervare, sunați sau scrieți.',
      body: 'Nu avem formular de rezervare. Telefonul e mai rapid și răspundem.',
      phoneLabel: 'Telefon',
      emailLabel: 'E-mail',
      whatsappLabel: 'WhatsApp',
      mapLabel: 'Unde ne găsiți',
      address: 'Alexandru cel Bun, Neamț, România',
    },

    footer: {
      rights: '© {year} Pensiunea Lavanda',
      credits: 'Credite imagini',
      creditsTitle: 'Credite imagini',
      creditsBody:
        'Fotografiile pensiunii sunt ale noastre, făcute în așteptarea unei ședințe profesionale. Fotografiile locurilor din jur sunt folosite sub licențele de mai jos.',
      close: 'Închide',
    },

    ui: {
      skip: 'Sari la conținut',
      menu: 'Meniu',
      closeMenu: 'Închide meniul',
      langLabel: 'Limba',
      nextPhoto: 'Fotografia următoare',
      prevPhoto: 'Fotografia anterioară',
      photoOf: 'Fotografia {i} din {n} — {name}',
      openGallery: 'Deschide fotografiile',
      viewPhoto: 'Vezi fotografia',
    },
  },
};
