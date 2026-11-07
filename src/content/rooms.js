/**
 * The room inventory. Numbers only — every word lives in content/site.js,
 * keyed by the same slug, so the two locales cannot drift apart.
 *
 * Sum check: 1 + 1 + 2 + 3 = 7 rooms; 4 + 3 + 4 + 6 = 17 guests.
 */

export const rooms = [
  {
    slug: 'family-suite',
    units: 1,
    sleeps: 4,
    bedrooms: 2,
    bathrooms: 1,
    price: 350,
    photos: ['family_suite', 'desk_room', 'bathroom'],
    // No photograph of the second bedroom yet — flagged for the shoot.
    gap: 'The second bedroom of the suite has not been photographed.',
  },
  {
    slug: 'triple',
    units: 1,
    sleeps: 3,
    bedrooms: 1,
    bathrooms: 1,
    price: 280,
    photos: ['twin_room_2', 'bathroom', 'desk_room'],
    gap: 'No photograph yet shows the single bed of the triple room.',
  },
  {
    slug: 'double-twin',
    units: 2,
    sleeps: 2,
    bedrooms: 1,
    bathrooms: 1,
    price: 250,
    photos: ['twin_room', 'twin_room_2', 'desk_room'],
    gap: null,
  },
  {
    slug: 'double',
    units: 3,
    sleeps: 2,
    bedrooms: 1,
    bathrooms: 1,
    price: 260,
    photos: ['double_room', 'bathroom', 'desk_room'],
    gap: null,
  },
];

export const totals = {
  rooms: rooms.reduce((n, r) => n + r.units, 0),
  guests: rooms.reduce((n, r) => n + r.units * r.sleeps, 0),
  fromPrice: Math.min(...rooms.map((r) => r.price)),
};

export const maxEventCapacity = 80;
