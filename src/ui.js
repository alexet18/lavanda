/**
 * The whole UI toolkit: a binding to htm, a few helpers, and the one component
 * that matters — Picture, which owns the responsive image contract.
 *
 * htm gives JSX-like syntax without a compiler, so the same component code runs
 * in the build (Node) and in the browser (as a plain ES module).
 */
import { h } from 'preact';
import htm from 'htm';
import manifest from '../public/media/manifest.json' with { type: 'json' };
import { media } from './content/media.js';

export const html = htm.bind(h);

/**
 * Path prefix for the page being rendered.
 *
 * The site is served from a subpath on GitHub Pages (/lavanda/), so every
 * asset URL has to be relative: '' at the root, '../' inside /ro/.
 * Root-absolute paths like /media/x.jpg would resolve to github.io/media/…
 */
let BASE = '';

export function setBase(base) {
  BASE = base ?? '';
}

/** Asset URL for the current page. */
export const asset = (p) => `${BASE}${p}`;

/** Fills {placeholders} in a translated string. */
export const fill = (str, vars = {}) =>
  String(str).replace(/\{(\w+)\}/g, (_, k) => (k in vars ? vars[k] : `{${k}}`));

/** Relative URL for one derivative. */
export const src = (id, width, ext) => `${BASE}media/${id}/${id}-${width}.${ext}`;

const srcset = (id, ext, widths) =>
  widths.map((w) => `${src(id, w, ext)} ${w}w`).join(', ');

/**
 * A photograph.
 *
 * The wrapper owns the aspect ratio so the box is reserved before the file
 * arrives; the <img> only fills it. That keeps CLS at zero without needing
 * width/height tricks per breakpoint.
 */
export function Picture({
  id,
  sizes = '100vw',
  className = '',
  ratio,
  priority = false,
  alt,
  imgClass = '',
}) {
  const meta = media[id];
  const dims = manifest[id];

  if (!meta || !dims) {
    // Loud in the build log, invisible-but-harmless in the page.
    console.warn(`[picture] unknown image id: ${id}`);
    return html`<div class="ph ${className}"></div>`;
  }

  const { widths, fallback, w, h } = dims;
  const altText = alt ?? meta.alt?.en ?? '';

  return html`
    <div
      class="pic ${className}"
      style=${ratio ? `--ratio:${ratio}` : null}
      data-focal=${meta.focal ?? '50% 50%'}
    >
      <picture>
        <source type="image/avif" sizes=${sizes} srcset=${srcset(id, 'avif', widths)} />
        <source type="image/webp" sizes=${sizes} srcset=${srcset(id, 'webp', widths)} />
        <img
          class=${imgClass}
          src=${src(id, fallback, 'jpg')}
          alt=${altText}
          width=${w}
          height=${h}
          loading=${priority ? 'eager' : 'lazy'}
          decoding=${priority ? 'sync' : 'async'}
          fetchpriority=${priority ? 'high' : 'auto'}
          style=${`object-position:${meta.focal ?? '50% 50%'}`}
        />
      </picture>
    </div>
  `;
}

/** Small uppercase label with the leading hairline rule. */
export const Eyebrow = ({ children }) => html`<p class="eyebrow">${children}</p>`;

/** A price, formatted consistently: 350 lei / night. */
export const Price = ({ value, perNight, from }) => html`
  <p class="price">
    ${from ? html`<span class="price__from">${from}</span>` : null}
    <span class="price__num">${new Intl.NumberFormat('ro-RO').format(value)}</span>
    <span class="price__cur">lei</span>
    ${perNight ? html`<span class="price__per">${perNight}</span>` : null}
  </p>
`;

/** Formats the current year once, at build time. */
export const YEAR = new Date().getFullYear();
