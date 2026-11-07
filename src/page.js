import { html, setBase } from './ui.js';
import { Header, Footer, Credits } from './components/chrome.js';
import {
  Hero, House, Rooms, Rates, Table, Events, Tub, Garden, Explore, Stay, Contact,
} from './components/sections.js';
import { rooms, totals } from './content/rooms.js';
import { media } from './content/media.js';
import manifest from '../public/media/manifest.json' with { type: 'json' };
import { contact } from './content/site.js';

/**
 * Paths are relative, never root-absolute: the site has to survive being served
 * from a subpath such as /lavanda/ as well as from a custom domain.
 */
function routes(locale) {
  return locale === 'en'
    ? { self: './', other: 'ro/', en: './', ro: 'ro/' }
    : { self: './', other: '../', en: '../', ro: './' };
}

/** The payload the browser needs to open a gallery. */
const clientData = (base, t) => ({
  base,
  locale: t.locale,
  strings: {
    next: t.ui.nextPhoto,
    prev: t.ui.prevPhoto,
    photoOf: t.ui.photoOf,
    close: t.footer.close,
    closeMenu: t.ui.closeMenu,
    openLabel: t.ui.menu,
  },
  nav: [
    { href: '#rooms', label: t.nav.rooms },
    { href: '#table', label: t.nav.table },
    { href: '#events', label: t.nav.events },
    { href: '#garden', label: t.nav.garden },
    { href: '#explore', label: t.nav.explore },
    { href: '#stay', label: t.nav.stay },
    { href: '#contact', label: t.nav.book },
  ],
  contact: {
    phone: contact.phone,
    phoneHref: contact.phoneHref,
    email: contact.email,
  },
  galleryNames: Object.fromEntries(rooms.map((r) => [r.slug, t.rooms.items[r.slug].name])),
  images: Object.fromEntries(
    Object.entries(media).map(([id, m]) => [
      id,
      {
        widths: manifest[id]?.widths ?? [],
        fallback: manifest[id]?.fallback ?? 960,
        w: manifest[id]?.w ?? 1,
        h: manifest[id]?.h ?? 1,
        focal: m.focal ?? '50% 50%',
        alt: m.alt?.[t.locale] ?? m.alt?.en ?? '',
      },
    ]),
  ),
  galleries: Object.fromEntries(rooms.map((r) => [r.slug, r.photos])),
});

const safeJson = (v) => JSON.stringify(v).replace(/</g, '\\u003c');

export function Page({ t, credits, base = '' }) {
  // Every asset URL below is relative to the page being rendered.
  setBase(base);
  const rel = base || './';
  const r = routes(t.locale);
  // Routing is injected at render time so the copy stays purely textual.
  const tt = { ...t, path: r.self, altPath: r.other, base };

  return html`
    <html lang=${t.htmlLang}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <title>${t.meta.title}</title>
        <meta name="description" content=${t.meta.description} />
        <meta name="theme-color" content="#FAF8F4" />
        <meta name="color-scheme" content="light" />

        <link rel="canonical" href=${r.self === './' ? './' : './'} />
        <link rel="alternate" hreflang="en" href=${r.en} />
        <link rel="alternate" hreflang="ro" href=${r.ro} />
        <link rel="alternate" hreflang="x-default" href=${r.en} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content=${t.meta.title} />
        <meta property="og:description" content=${t.meta.description} />
        <meta property="og:locale" content=${t.locale === 'en' ? 'en_GB' : 'ro_RO'} />
        <meta property="og:image" content=${`${base}og.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />

        <link rel="icon" href=${`${base}brand/sprig-64.png`} type="image/png" />
        <link rel="apple-touch-icon" href=${`${base}brand/apple-touch-icon.png`} />

        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href=${`${base}fonts/cormorant-garamond-300-latin.woff2`}
          crossorigin
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href=${`${base}fonts/cormorant-garamond-300-latin-ext.woff2`}
          crossorigin
        />
        <link rel="stylesheet" href=${`${base}styles/main.css`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML=${{
            __html: safeJson({
              '@context': 'https://schema.org',
              '@type': 'Hotel',
              name: 'Pensiunea Lavanda',
              description: t.meta.description,
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Alexandru cel Bun',
                addressLocality: 'Alexandru cel Bun',
                addressRegion: 'Neamț',
                addressCountry: 'RO',
              },
              telephone: contact.phone,
              email: contact.email,
              numberOfRooms: totals.rooms,
              priceRange: `${totals.fromPrice}–350 RON`,
            }),
          }}
        ></script>
      </head>

      <body>
        <a class="skip" href="#main">${t.ui.skip}</a>

        <${Header} t=${tt} />

        <main id="main">
          <${Hero} t=${tt} />
          <${House} t=${tt} />
          <${Rooms} t=${tt} />
          <${Rates} t=${tt} />
          <${Table} t=${tt} />
          <${Events} t=${tt} />
          <${Tub} t=${tt} />
          <${Garden} t=${tt} />
          <${Explore} t=${tt} />
          <${Stay} t=${tt} />
          <${Contact} t=${tt} />
        </main>

        <${Footer} t=${tt} credits=${credits} year=${new Date().getFullYear()} />
        <${Credits} t=${tt} credits=${credits} />

        <div id="viewer-root"></div>
        <div id="menu-root"></div>

        <script
          type="application/json"
          id="site-data"
          dangerouslySetInnerHTML=${{ __html: safeJson(clientData(base, t)) }}
        ></script>

        <!-- Import map values must be paths: a bare "js/preact.mjs" is ignored. -->
        <script
          type="importmap"
          dangerouslySetInnerHTML=${{
            __html: safeJson({
              imports: {
                preact: `${rel}js/preact.mjs`,
                'preact/hooks': `${rel}js/hooks.mjs`,
                htm: `${rel}js/htm.mjs`,
              },
            }),
          }}
        ></script>
        <script type="module" src=${`${base}js/app.mjs`}></script>
      </body>
    </html>
  `;
}
