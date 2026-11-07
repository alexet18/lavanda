/**
 * Every photograph the site can use.
 *
 * `focal` is the object-position used when a box crops the frame.
 * `tier` is `master` (studio) or `provisional` (phone capture, real room,
 * awaiting the shoot). Every frame here is a real photograph of this property
 * or a licensed photograph of the named place — no stock interiors, ever.
 */

export const media = {
  garden_3: {
    tier: 'provisional',
    focal: '50% 58%',
    alt: {
      en: 'Lavender in flower in the foreground, a cream pergola and young pines behind, clear blue sky',
      ro: 'Lavandă înflorită în prim-plan, o pergolă crem și pini tineri în fundal, cer albastru senin',
    },
  },
  hotel_main_entrance: {
    tier: 'provisional',
    focal: '50% 50%',
    alt: {
      en: 'The house from the road: white walls, red roof, the Lavanda sign above the entrance',
      ro: 'Casa văzută de pe drum: pereți albi, acoperiș roșu, semnul Lavanda deasupra intrării',
    },
  },
  hotel_entrance_winter: {
    tier: 'provisional',
    focal: '50% 55%',
    alt: {
      en: 'The house at night in winter, lit along every roof line, snow on the ground',
      ro: 'Casa noaptea, iarna, luminată de-a lungul acoperișului, zăpadă pe jos',
    },
  },
  hallway: {
    tier: 'provisional',
    focal: '50% 50%',
    alt: {
      en: 'A long corridor with woven pendant lamps casting patterned light on the walls',
      ro: 'Un coridor lung cu lămpi împletite care aruncă lumină modelată pe pereți',
    },
  },
  hallway_2: {
    tier: 'provisional',
    focal: '50% 50%',
    alt: {
      en: 'White pebbles and sprigs of lavender along a lit floor channel',
      ro: 'Pietre albe și ramuri de lavandă de-a lungul unui canal luminat din podea',
    },
  },

  // ---- rooms -------------------------------------------------------------
  family_suite: {
    tier: 'provisional',
    focal: '50% 52%',
    alt: {
      en: 'Family suite: a double bed under a roof window, dark wardrobe, doorway to the second room',
      ro: 'Apartament familial: pat matrimonial sub o fereastră de mansardă, dulap închis la culoare, ușă spre a doua cameră',
    },
  },
  double_room: {
    tier: 'provisional',
    focal: '50% 55%',
    alt: {
      en: 'Double room: a black-framed double bed, pink throw, pendant lamps and a window with white curtains',
      ro: 'Cameră dublă: pat matrimonial cu ramă neagră, cuvertură roz, lămpi suspendate și fereastră cu perdele albe',
    },
  },
  twin_room: {
    tier: 'provisional',
    focal: '50% 55%',
    alt: {
      en: 'Twin room: two single beds made up separately, wardrobe, desk and a wall-mounted screen',
      ro: 'Cameră twin: două paturi single făcute separat, dulap, birou și un ecran pe perete',
    },
  },
  twin_room_2: {
    tier: 'provisional',
    focal: '50% 52%',
    alt: {
      en: 'Two single beds set side by side against a white wall, lavender canvas above',
      ro: 'Două paturi single alăturate, lângă un perete alb, cu o pânză cu lavandă deasupra',
    },
  },
  desk_room: {
    tier: 'provisional',
    focal: '50% 50%',
    alt: {
      en: 'A writing desk and olive chair under the slope of the roof, lavender canvas on the wall',
      ro: 'Un birou și un scaun oliv sub panta acoperișului, o pânză cu lavandă pe perete',
    },
  },
  bathroom: {
    tier: 'provisional',
    focal: '50% 50%',
    alt: {
      en: 'Bathroom with a walk-in shower behind glass, floating basin unit and a small window',
      ro: 'Baie cu duș walk-in în spatele sticlei, chiuvetă suspendată și o fereastră mică',
    },
  },

  // ---- table -------------------------------------------------------------
  restaurant: {
    tier: 'provisional',
    focal: '50% 45%',
    alt: {
      en: 'The restaurant: black tables and white cross-back chairs under hanging greenery',
      ro: 'Restaurantul: mese negre și scaune albe sub verdeață suspendată',
    },
  },
  restaurant_tables: {
    tier: 'provisional',
    focal: '50% 50%',
    alt: {
      en: 'Tables laid for breakfast beside tall windows and stone columns',
      ro: 'Mese pregătite pentru micul dejun, lângă ferestre înalte și coloane de piatră',
    },
  },
  restaurant_bathroom: {
    tier: 'provisional',
    focal: '50% 50%',
    alt: {
      en: 'Washroom with rust-coloured marble walls, twin basins and pendant lights',
      ro: 'Grup sanitar cu pereți de marmură ruginie, două chiuvete și lămpi suspendate',
    },
  },

  // ---- events ------------------------------------------------------------
  event_arangement: {
    tier: 'provisional',
    focal: '50% 42%',
    alt: {
      en: 'The entrance dressed for a wedding: red carpet, flower pedestals, Lavanda sign above',
      ro: 'Intrarea pregătită pentru nuntă: covor roșu, suporturi cu flori, semnul Lavanda deasupra',
    },
  },

  // ---- garden and tub ----------------------------------------------------
  garden: {
    tier: 'provisional',
    focal: '50% 55%',
    alt: {
      en: 'The garden with parasols and set tables, forested hills rising behind the house',
      ro: 'Grădina cu umbrele și mese pregătite, dealuri împădurite în spatele casei',
    },
  },
  garden_2: {
    tier: 'provisional',
    focal: '50% 55%',
    alt: {
      en: 'A paved path between clipped shrubs and two pergolas with curtained tables',
      ro: 'O alee pavată între tufe tăiate și două pergole cu mese și draperii',
    },
  },
  firewood_jacuzzi: {
    tier: 'provisional',
    focal: '50% 52%',
    alt: {
      en: 'A wood-fired tub steaming in the snow at night, lit from inside, pines alongside',
      ro: 'Ciubăr încălzit cu lemne, aburind în zăpadă, noaptea, luminat din interior, brazi alături',
    },
  },

  // ---- licensed photographs of the places --------------------------------
  place_piatra_neamt: {
    tier: 'licensed',
    focal: '50% 50%',
    alt: {
      en: 'Piatra Neamț seen from above, the town spread along the Bistrița valley',
      ro: 'Piatra Neamț văzut de sus, orașul întins de-a lungul văii Bistriței',
    },
  },
  place_neamt_monastery: {
    tier: 'licensed',
    focal: '50% 50%',
    alt: {
      en: 'Neamț Monastery: the painted church front and its walled precinct',
      ro: 'Mănăstirea Neamț: fațada pictată a bisericii și incinta cu ziduri',
    },
  },
  place_bicaz: {
    tier: 'licensed',
    focal: '50% 50%',
    alt: {
      en: 'The road through Bicaz gorges, limestone walls rising on both sides',
      ro: 'Drumul prin Cheile Bicazului, cu pereți de calcar ridicându-se pe ambele părți',
    },
  },
  place_red_lake: {
    tier: 'licensed',
    focal: '50% 50%',
    alt: {
      en: 'Red Lake with drowned tree stumps standing in the water, forest behind',
      ro: 'Lacul Roșu cu trunchiuri înecate stând în apă, pădure în fundal',
    },
  },
  place_ceahlau: {
    tier: 'licensed',
    focal: '50% 50%',
    alt: {
      en: 'Toaca peak on Ceahlău, the ridge falling away into cloud',
      ro: 'Vârful Toaca din Ceahlău, creasta coborând în nori',
    },
  },
};

/** All ids that may appear in a gallery, in a stable order. */
export const mediaIds = Object.keys(media);
