import { html, asset, fill } from '../ui.js';

/**
 * The header. Transparent over the hero, solid after 80px of scroll.
 * The scroll state is applied by a tiny IntersectionObserver in client/app.js,
 * so nothing here depends on JavaScript to be readable.
 */
export function Header({ t }) {
  const links = [
    ['#rooms', t.nav.rooms],
    ['#table', t.nav.table],
    ['#events', t.nav.events],
    ['#garden', t.nav.garden],
    ['#explore', t.nav.explore],
    ['#stay', t.nav.stay],
  ];

  return html`
    <header class="head" data-head>
      <div class="head__inner">
        <a class="brand" href="#top" aria-label="Pensiunea Lavanda">
          <img
            class="brand__mark"
            src=${asset('brand/sprig-64.png')}
            alt=""
            width="22"
            height="22"
          />
          <span class="brand__word">Lavanda</span>
        </a>

        <nav class="head__nav" aria-label=${t.nav.rooms}>
          ${links.map(
            ([href, label]) => html`<a class="head__link" href=${href}>${label}</a>`,
          )}
        </nav>

        <div class="head__end">
          <${LangSwitch} t=${t} />
          <a class="btn btn--ghost head__book" href="#contact">${t.nav.book}</a>
          <button
            class="menu-btn"
            type="button"
            aria-expanded="false"
            aria-controls="menu-root"
            data-menu-open
          >
            <span class="menu-btn__lines" aria-hidden="true"></span>
            <span class="visually-hidden">${t.ui.menu}</span>
          </button>
        </div>
      </div>
    </header>
  `;
}

/** EN / RO. Two real links, crawlable, no JavaScript required. */
export function LangSwitch({ t }) {
  const other = t.locale === 'en' ? 'RO' : 'EN';
  const current = t.locale === 'en' ? 'EN' : 'RO';

  return html`
    <nav class="lang" aria-label=${t.ui.langLabel}>
      <a class="lang__item is-active" href=${t.path} hreflang=${t.htmlLang} aria-current="page"
        >${current}</a
      >
      <span class="lang__sep" aria-hidden="true">/</span>
      <a class="lang__item" href=${t.altPath} hreflang=${t.locale === 'en' ? 'ro' : 'en'}
        >${other}</a
      >
    </nav>
  `;
}

export function Footer({ t, credits, year }) {
  return html`
    <footer class="foot">
      <div class="container foot__inner">
        <div class="foot__brand">
          <img src=${asset('brand/lockup.png')} alt="Pensiunea Lavanda" width="140" height="59" />
          <p class="foot__addr">${t.contact.address}</p>
        </div>

        <nav class="foot__nav" aria-label=${t.nav.stay}>
          <a href="#rooms">${t.nav.rooms}</a>
          <a href="#table">${t.nav.table}</a>
          <a href="#events">${t.nav.events}</a>
          <a href="#explore">${t.nav.explore}</a>
        </nav>

        <div class="foot__meta">
          <${LangSwitch} t=${t} />
          <button class="link-btn" type="button" data-credits-open>${t.footer.credits}</button>
          <p class="foot__copy">${fill(t.footer.rights, { year })}</p>
        </div>
      </div>
    </footer>
  `;
}

/**
 * The credits dialog. Server-rendered and opened with the native dialog API,
 * so it works even if the client bundle never loads.
 */
export function Credits({ t, credits }) {
  return html`
    <dialog class="sheet" id="credits" aria-labelledby="credits-title">
      <div class="sheet__inner">
        <button class="sheet__close" type="button" data-credits-close aria-label=${t.footer.close}>
          <span aria-hidden="true">×</span>
        </button>
        <h2 class="sheet__title" id="credits-title">${t.footer.creditsTitle}</h2>
        <p class="sheet__lead">${t.footer.creditsBody}</p>
        <ul class="credits">
          ${credits.map(
            (c) => html`
              <li class="credits__item">
                <strong>${c.title}</strong>
                <span>${c.author} · ${c.licence}</span>
                <a href=${c.source} rel="noopener noreferrer" target="_blank">Wikimedia Commons</a>
              </li>
            `,
          )}
        </ul>
      </div>
    </dialog>
  `;
}
