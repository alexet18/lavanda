import { html, Picture, Eyebrow, Price, fill } from '../ui.js';
import { rooms, totals, maxEventCapacity } from '../content/rooms.js';
import { contact } from '../content/site.js';

const num = (n) => new Intl.NumberFormat('ro-RO').format(n);

/* ------------------------------------------------------------------ hero -- */

export function Hero({ t }) {
  return html`
    <section class="hero" id="top">
      <div class="hero__copy">
        <p class="eyebrow">${t.hero.eyebrow}</p>
        <h1 class="hero__title">${t.hero.title}</h1>
        <p class="hero__line">${t.hero.line}</p>
        <div class="hero__actions">
          <a class="btn btn--solid" href="#rooms">${t.hero.cta}</a>
          <span class="hero__scroll" aria-hidden="true">${t.hero.scroll}</span>
        </div>
      </div>
      <div class="hero__media">
        <${Picture}
          id="garden_3"
          sizes="(min-width: 900px) 52vw, 100vw"
          priority
          alt=${t.locale === 'ro'
            ? 'Lavandă înflorită în prim-plan, o pergolă crem și pini tineri în fundal'
            : 'Lavender in flower in the foreground, a cream pergola and young pines behind'}
        />
      </div>
    </section>
  `;
}

/* ----------------------------------------------------------------- house -- */

export function House({ t }) {
  return html`
    <section class="house" id="house">
      <div class="container house__grid">
        <div class="house__copy">
          <${Eyebrow}>${t.house.eyebrow}<//>
          <h2 class="h2">${t.house.title}</h2>
          <p class="lede">${t.house.body}</p>
        </div>
        <div class="house__media">
          <${Picture} id="hotel_main_entrance" sizes="(min-width: 900px) 46vw, 100vw" ratio="3 / 2" />
        </div>
      </div>

      <div class="container house__strip">
        <${Picture} id="hallway" sizes="(min-width: 700px) 30vw, 46vw" ratio="3 / 4" />
        <${Picture} id="hallway_2" sizes="(min-width: 700px) 30vw, 46vw" ratio="3 / 4" />
        <dl class="facts">
          ${t.house.facts.map(
            (f) => html`
              <div class="facts__row">
                <dt class="facts__value">${f.value}</dt>
                <dd class="facts__label">${f.label}</dd>
              </div>
            `,
          )}
        </dl>
      </div>
    </section>
  `;
}

/* ----------------------------------------------------------------- rooms -- */

export function Rooms({ t }) {
  return html`
    <section class="rooms" id="rooms">
      <div class="container section-head">
        <${Eyebrow}>${t.rooms.eyebrow}<//>
        <h2 class="h2">${t.rooms.title}</h2>
        <p class="lede">${t.rooms.intro}</p>
      </div>

      ${rooms.map((room, i) => html`<${RoomChapter} room=${room} t=${t} index=${i} />`)}
    </section>
  `;
}

function RoomChapter({ room, t, index }) {
  const copy = t.rooms.items[room.slug];
  const [lead, ...plates] = room.photos;

  return html`
    <article class="room ${index % 2 ? 'room--flip' : ''}" id=${`room-${room.slug}`}>
      <div class="room__lead">
        <${Picture}
          id=${lead}
          sizes="(min-width: 900px) 50vw, 100vw"
          ratio="3 / 4"
          alt=${`${copy.name} — ${copy.spec}`}
        />
      </div>

      <div class="room__copy">
        <p class="room__index">${String(index + 1).padStart(2, '0')} — 04</p>
        <h3 class="h3">${copy.name}</h3>
        <p class="room__spec">${copy.spec}</p>
        <p class="room__desc">${copy.desc}</p>

        <${Price} value=${room.price} perNight=${t.rooms.perNight} from=${t.rooms.from} />
        <p class="room__count">${copy.count}</p>

        <button class="link-btn" type="button" data-gallery=${room.slug}>
          ${fill(t.rooms.allPhotos, { n: room.photos.length })}
        </button>
      </div>

      <div class="room__plates">
        ${plates.map(
          (id) => html`
            <button class="plate" type="button" data-gallery=${room.slug}>
              <${Picture} id=${id} sizes="(min-width: 900px) 24vw, 46vw" ratio="4 / 3" />
              <span class="visually-hidden">${t.ui.viewPhoto}</span>
            </button>
          `,
        )}
      </div>
    </article>
  `;
}

/* ----------------------------------------------------------------- rates -- */

export function Rates({ t }) {
  return html`
    <section class="rates" id="rates">
      <div class="container rates__inner">
        <div class="rates__head">
          <${Eyebrow}>${t.rates.eyebrow}<//>
          <h2 class="h2">${t.rates.title}</h2>
        </div>

        <dl class="rates__list">
          ${rooms.map(
            (room) => html`
              <div class="rates__row">
                <dt class="rates__term">
                  <span class="rates__name">${t.rooms.items[room.slug].name}</span>
                  <span class="rates__meta">${fill(t.rooms.sleeps, { n: room.sleeps })}</span>
                </dt>
                <dd class="rates__value">
                  <span class="rates__price">${num(room.price)} lei</span>
                  <span class="rates__per">${t.rooms.perNight}</span>
                </dd>
              </div>
            `,
          )}
        </dl>

        <div class="rates__foot">
          <p>${t.rates.note}</p>
          <p class="muted">${t.rates.note2}</p>
        </div>
      </div>
    </section>
  `;
}

/* ----------------------------------------------------------------- table -- */

export function Table({ t }) {
  return html`
    <section class="table" id="table">
      <div class="container section-head">
        <${Eyebrow}>${t.table.eyebrow}<//>
        <h2 class="h2">${t.table.title}</h2>
      </div>

      <div class="split">
        <div class="split__media">
          <${Picture} id="restaurant_tables" sizes="(min-width: 900px) 50vw, 100vw" ratio="4 / 3" />
        </div>
        <div class="split__copy">
          <h3 class="h3">${t.table.breakfast.title}</h3>
          <p class="lede">${t.table.breakfast.body}</p>
          <ul class="ticks">
            ${t.table.breakfast.items.map((item) => html`<li>${item}</li>`)}
          </ul>
          <p class="note">${t.table.breakfast.note}</p>
        </div>
      </div>

      <div class="split split--flip">
        <div class="split__media">
          <${Picture} id="restaurant" sizes="(min-width: 900px) 50vw, 100vw" ratio="3 / 4" />
        </div>
        <div class="split__copy">
          <h3 class="h3">${t.table.restaurant.title}</h3>
          <p class="lede">${t.table.restaurant.body}</p>
          <p class="note">${t.table.restaurant.note}</p>
          <div class="split__thumb">
            <${Picture} id="restaurant_bathroom" sizes="(min-width: 900px) 18vw, 40vw" ratio="3 / 4" />
          </div>
        </div>
      </div>
    </section>
  `;
}

/* ---------------------------------------------------------------- events -- */

export function Events({ t }) {
  return html`
    <section class="events" id="events">
      <div class="events__lead">
        <div class="events__media">
          <${Picture} id="event_arangement" sizes="(min-width: 900px) 48vw, 100vw" ratio="3 / 4" />
        </div>
        <div class="events__copy">
          <${Eyebrow}>${t.events.eyebrow}<//>
          <h2 class="h2">${t.events.title}</h2>
          <p class="lede">${t.events.intro}</p>

          <p class="events__cap">
            <span class="events__num">${maxEventCapacity}</span>
            <span class="events__unit">${t.events.capacity}</span>
          </p>

          <ul class="ticks">
            ${t.events.types.map((type) => html`<li>${type}</li>`)}
          </ul>

          <a class="btn btn--solid" href="#contact">${t.events.cta}</a>
        </div>
      </div>

      <div class="container events__split">
        <div class="events__block">
          <h3 class="h3">${t.events.indoorTitle}</h3>
          <p class="lede">${t.events.indoor}</p>
        </div>
        <div class="events__block">
          <h3 class="h3">${t.events.outdoorTitle}</h3>
          <p class="lede">${t.events.outdoor}</p>
        </div>
      </div>

      <div class="events__band">
        <${Picture} id="garden_2" sizes="100vw" ratio="2 / 1" />
      </div>
    </section>
  `;
}

/* ------------------------------------------------------------------- tub -- */

export function Tub({ t }) {
  return html`
    <section class="tub" id="tub">
      <div class="tub__inner">
        <div class="tub__copy">
          <${Eyebrow}>${t.tub.eyebrow}<//>
          <h2 class="h2">${t.tub.title}</h2>
          <p class="lede">${t.tub.body}</p>
          <p class="note">${t.tub.note}</p>
        </div>
        <div class="tub__media">
          <${Picture} id="firewood_jacuzzi" sizes="(min-width: 900px) 46vw, 100vw" ratio="3 / 4" />
        </div>
      </div>
    </section>
  `;
}

/* ---------------------------------------------------------------- garden -- */

export function Garden({ t }) {
  return html`
    <section class="garden" id="garden">
      <div class="container section-head">
        <${Eyebrow}>${t.garden.eyebrow}<//>
        <h2 class="h2">${t.garden.title}</h2>
        <p class="lede">${t.garden.body}</p>
      </div>
      <div class="garden__band">
        <${Picture} id="garden" sizes="100vw" ratio="21 / 9" />
      </div>
    </section>
  `;
}

/* --------------------------------------------------------------- explore -- */

const PLACE_ORDER = ['piatra-neamt', 'neamt-monastery', 'bicaz-gorges', 'red-lake', 'ceahlau'];
const PLACE_MEDIA = {
  'piatra-neamt': 'place_piatra_neamt',
  'neamt-monastery': 'place_neamt_monastery',
  'bicaz-gorges': 'place_bicaz',
  'red-lake': 'place_red_lake',
  ceahlau: 'place_ceahlau',
};

export function Explore({ t }) {
  return html`
    <section class="explore" id="explore">
      <div class="container section-head">
        <${Eyebrow}>${t.explore.eyebrow}<//>
        <h2 class="h2">${t.explore.title}</h2>
        <p class="lede">${t.explore.intro}</p>
      </div>

      <ul class="places">
        ${PLACE_ORDER.map((slug) => {
          const p = t.explore.places[slug];
          return html`
            <li class="place">
              <${Picture} id=${PLACE_MEDIA[slug]} sizes="(min-width: 900px) 31vw, 100vw" ratio="3 / 2" />
              <div class="place__body">
                <h3 class="place__name">${p.name}</h3>
                <p class="place__dist">${p.distance}</p>
                <p class="place__why">${p.why}</p>
              </div>
            </li>
          `;
        })}
      </ul>

      <div class="container itin">
        <h3 class="h3">${t.explore.itinerariesTitle}</h3>
        <p class="note">${t.explore.itineraryIntro}</p>

        <div class="itin__grid">
          ${Object.entries(t.explore.itineraries).map(
            ([slug, it]) => html`
              <article class="itin__card">
                <p class="itin__dur">${it.duration}</p>
                <h4 class="itin__title">${it.title}</h4>
                <dl class="itin__beats">
                  ${it.beats.map(
                    (b) => html`
                      <div class="itin__beat">
                        <dt>${b.time}</dt>
                        <dd>${b.text}</dd>
                      </div>
                    `,
                  )}
                </dl>
              </article>
            `,
          )}
        </div>
      </div>
    </section>
  `;
}

/* ------------------------------------------------------------------ stay -- */

export function Stay({ t }) {
  return html`
    <section class="stay" id="stay">
      <div class="container stay__grid">
        <div class="stay__copy">
          <${Eyebrow}>${t.stay.eyebrow}<//>
          <h2 class="h2">${t.stay.title}</h2>
          <p class="lede">${t.stay.directions}</p>
        </div>
        <dl class="stay__list">
          ${t.stay.items.map(
            (i) => html`
              <div class="stay__row">
                <dt>${i.label}</dt>
                <dd>${i.value}</dd>
              </div>
            `,
          )}
        </dl>
      </div>
    </section>
  `;
}

/* --------------------------------------------------------------- contact -- */

export function Contact({ t }) {
  return html`
    <section class="contact" id="contact">
      <div class="contact__media">
        <${Picture} id="hotel_entrance_winter" sizes="100vw" ratio="21 / 9" priority=${false} />
      </div>

      <div class="container contact__inner">
        <h2 class="h2 contact__title">${t.contact.title}</h2>
        <p class="lede">${t.contact.body}</p>

        <ul class="contact__actions">
          <li>
            <span class="contact__label">${t.contact.phoneLabel}</span>
            <a class="contact__value" href=${`tel:${contact.phoneHref}`}>${contact.phone}</a>
          </li>
          <li>
            <span class="contact__label">${t.contact.emailLabel}</span>
            <a class="contact__value" href=${`mailto:${contact.email}`}>${contact.email}</a>
          </li>
          <li>
            <span class="contact__label">${t.contact.whatsappLabel}</span>
            <a class="contact__value" href=${contact.whatsapp} rel="noopener noreferrer" target="_blank"
              >${t.contact.whatsappLabel}</a
            >
          </li>
          <li>
            <span class="contact__label">${t.contact.mapLabel}</span>
            <a class="contact__value" href=${contact.maps} rel="noopener noreferrer" target="_blank"
              >${t.contact.address}</a
            >
          </li>
        </ul>
      </div>
    </section>
  `;
}

export { totals };
