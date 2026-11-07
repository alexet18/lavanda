/**
 * The client bundle — the only JavaScript the page ships.
 *
 * Four small things: the header turning solid, the mobile menu, the photo
 * viewer, and remembering the language choice. Nothing here is required to
 * read the page; every one of them is an enhancement.
 */
import { h, render } from 'preact';
import { useState, useEffect, useRef } from 'preact/hooks';
import htm from 'htm';

const html = htm.bind(h);
const data = JSON.parse(document.getElementById('site-data').textContent);
const B = data.base ?? '';
const S = data.strings;

const file = (id, w, ext) => `${B}media/${id}/${id}-${w}.${ext}`;
const set = (id, ext) =>
  data.images[id].widths.map((w) => `${file(id, w, ext)} ${w}w`).join(', ');

const fill = (s, vars) =>
  String(s).replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : `{${k}}`));

/* ---------------------------------------------------------------- header -- */

function initHeader() {
  const head = document.querySelector('[data-head]');
  const hero = document.querySelector('.hero');
  if (!head || !hero) return;

  // Collapse the observer root to a zero-height band at the very top, so this
  // answers "is the hero still behind the header?" rather than "is it visible?".
  const io = new IntersectionObserver(
    ([entry]) => head.classList.toggle('is-solid', !entry.isIntersecting),
    { rootMargin: '0px 0px -100% 0px' },
  );
  io.observe(hero);
}

/* ------------------------------------------------------------------ menu -- */

function Menu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onOpen = (e) => {
      if (!e.target.closest('[data-menu-open]')) return;
      ref.current?.showModal();
      setOpen(true);
    };
    document.addEventListener('click', onOpen);
    return () => document.removeEventListener('click', onOpen);
  }, []);

  const close = () => {
    ref.current?.close();
    setOpen(false);
  };

  if (!open) return html`<dialog class="menu" ref=${ref}></dialog>`;

  return html`
    <dialog class="menu" ref=${ref} aria-label=${S.openLabel} onClose=${() => setOpen(false)}>
      <div class="menu__inner">
        <button class="menu__close" type="button" onClick=${close} aria-label=${S.closeMenu}>
          <span aria-hidden="true">×</span>
        </button>

        <nav class="menu__nav">
          ${data.nav.map(
            (n) => html`<a class="menu__link" href=${n.href} onClick=${close}>${n.label}</a>`,
          )}
        </nav>

        <div class="menu__foot">
          <a class="menu__contact" href=${`tel:${data.contact.phoneHref}`}>${data.contact.phone}</a>
          <a class="menu__contact" href=${`mailto:${data.contact.email}`}>${data.contact.email}</a>
        </div>
      </div>
    </dialog>
  `;
}

/* ---------------------------------------------------------------- viewer -- */

function Viewer() {
  const [gallery, setGallery] = useState(null);
  const [index, setIndex] = useState(0);
  const ref = useRef(null);
  const swipe = useRef({ x: 0, y: 0 });

  const photos = gallery ? data.galleries[gallery] : [];
  const id = photos[index];
  const image = id ? data.images[id] : null;

  useEffect(() => {
    const onOpen = (e) => {
      const btn = e.target.closest('[data-gallery]');
      if (!btn) return;
      setGallery(btn.dataset.gallery);
      setIndex(0);
      ref.current?.showModal();
    };
    document.addEventListener('click', onOpen);
    return () => document.removeEventListener('click', onOpen);
  }, []);

  const go = (delta) => {
    const n = photos.length;
    if (!n) return;
    setIndex((i) => (i + delta + n) % n);
  };

  const onKey = (e) => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  };

  const onPointerDown = (e) => {
    swipe.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e) => {
    const dx = e.clientX - swipe.current.x;
    const dy = e.clientY - swipe.current.y;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
  };

  return html`
    <dialog
      class="viewer"
      ref=${ref}
      onKeyDown=${onKey}
      aria-label=${gallery ? data.galleryNames[gallery] : 'Photos'}
    >
      ${image
        ? html`
            <div class="viewer__stage" onPointerDown=${onPointerDown} onPointerUp=${onPointerUp}>
              <picture>
                <source type="image/avif" srcset=${set(id, 'avif')} sizes="92vw" />
                <source type="image/webp" srcset=${set(id, 'webp')} sizes="92vw" />
                <img
                  class="viewer__img"
                  src=${file(id, image.fallback, 'jpg')}
                  alt=${image.alt}
                  width=${image.w}
                  height=${image.h}
                  style=${`object-position:${image.focal}`}
                />
              </picture>
            </div>

            <p class="viewer__count" aria-hidden="true">${index + 1} / ${photos.length}</p>

            <button class="viewer__close" type="button" onClick=${() => ref.current?.close()}>
              <span aria-hidden="true">×</span>
              <span class="visually-hidden">${S.close}</span>
            </button>

            <button class="viewer__nav viewer__nav--prev" type="button" onClick=${() => go(-1)}>
              <span aria-hidden="true">←</span>
              <span class="visually-hidden">${S.prev}</span>
            </button>
            <button class="viewer__nav viewer__nav--next" type="button" onClick=${() => go(1)}>
              <span aria-hidden="true">→</span>
              <span class="visually-hidden">${S.next}</span>
            </button>

            <p class="viewer__caption" aria-live="polite">
              ${fill(S.photoOf, {
                i: index + 1,
                n: photos.length,
                name: data.galleryNames[gallery],
              })}
            </p>
          `
        : null}
    </dialog>
  `;
}

/* --------------------------------------------------------------- credits -- */

function initCredits() {
  const dialog = document.getElementById('credits');
  if (!dialog) return;

  document.querySelectorAll('[data-credits-open]').forEach((b) =>
    b.addEventListener('click', () => dialog.showModal()),
  );
  dialog.querySelector('[data-credits-close]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
}

/* ---------------------------------------------------------------- locale -- */

function initLang() {
  document.querySelectorAll('.lang__item').forEach((a) => {
    const base = a.getAttribute('href');
    a.addEventListener('click', () => {
      // Keep the reader where they were when they switch language.
      if (location.hash) a.setAttribute('href', base.split('#')[0] + location.hash);
      try {
        localStorage.setItem('lavanda.lang', a.getAttribute('hreflang'));
      } catch {
        /* private mode: not worth a message */
      }
    });
  });
}

/* ------------------------------------------------------------------ boot -- */

initHeader();
initCredits();
initLang();

const menuRoot = document.getElementById('menu-root');
if (menuRoot) render(html`<${Menu} />`, menuRoot);

const viewerRoot = document.getElementById('viewer-root');
if (viewerRoot) render(html`<${Viewer} />`, viewerRoot);
