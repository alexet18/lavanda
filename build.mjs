/**
 * Renders the site to static HTML in docs/.
 *
 *   node build.mjs
 *
 * No bundler: the components are plain ES modules using htm, so the same code
 * renders on the server here and runs in the browser as-is.
 */
import { renderToString } from 'preact-render-to-string';
import { rm, mkdir, writeFile, cp, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { Page } from './src/page.js';
import { site } from './src/content/site.js';
import { rooms, totals, maxEventCapacity } from './src/content/rooms.js';
import { media } from './src/content/media.js';
import credits from './src/content/credits.json' with { type: 'json' };
import manifest from './public/media/manifest.json' with { type: 'json' };

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(ROOT, 'docs');

const problems = [];
const warnings = [];

/* ---------------------------------------------------------------- checks -- */

/** Every key in `a` must exist in `b` and vice-versa. */
function diffKeys(a, b, trail = '') {
  const out = [];
  for (const k of Object.keys(a)) {
    const p = trail ? `${trail}.${k}` : k;
    if (!(k in b)) out.push(`missing in ro: ${p}`);
    else if (a[k] && typeof a[k] === 'object' && !Array.isArray(a[k])) {
      out.push(...diffKeys(a[k], b[k], p));
    }
  }
  for (const k of Object.keys(b)) {
    if (!(k in a)) out.push(`missing in en: ${trail ? `${trail}.` : ''}${k}`);
  }
  return out;
}

problems.push(...diffKeys(site.en, site.ro));

if (totals.rooms !== 7) problems.push(`room count is ${totals.rooms}, expected 7`);
if (totals.guests !== 17) problems.push(`guest count is ${totals.guests}, expected 17`);

for (const room of rooms) {
  for (const id of room.photos) {
    if (!media[id]) problems.push(`${room.slug}: unknown photo "${id}"`);
    if (!manifest[id]) problems.push(`${room.slug}: no generated files for "${id}"`);
  }
  if (!site.en.rooms.items[room.slug]) problems.push(`no en copy for room ${room.slug}`);
  if (!site.ro.rooms.items[room.slug]) problems.push(`no ro copy for room ${room.slug}`);
}

for (const id of Object.keys(media)) {
  if (!manifest[id]) problems.push(`media "${id}" has no generated files`);
  for (const lang of ['en', 'ro']) {
    if (!media[id].alt?.[lang]) problems.push(`media "${id}" is missing ${lang} alt text`);
  }
}

// Romanian must not use cedilla characters - they render as the wrong letter.
const cedilla = /[\u015F\u0163]/;
for (const [lang, dict] of Object.entries(site)) {
  if (cedilla.test(JSON.stringify(dict))) {
    problems.push(`${lang} copy contains a cedilla ş/ţ instead of ș/ț`);
  }
}

if (credits.length === 0) warnings.push('no licensed attraction photos were recorded');

/* ---------------------------------------------------------------- render -- */

const PAGES = [
  { locale: 'en', dir: 'index.html', base: '' },
  { locale: 'ro', dir: path.join('ro', 'index.html'), base: '../' },
];

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

for (const { locale, dir, base } of PAGES) {
  const markup = '<!doctype html>\n' + renderToString(
    Page({ t: site[locale], credits, base }),
  );
  const file = path.join(OUT, dir);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, markup, 'utf8');
  console.log(`  ${dir.padEnd(16)} ${(Buffer.byteLength(markup) / 1024).toFixed(1)} KB`);
}

/* ----------------------------------------------------------------- assets -- */

await cp(path.join(ROOT, 'public'), OUT, { recursive: true });

// Preact and htm are served straight from node_modules, mapped by an import map.
await mkdir(path.join(OUT, 'js'), { recursive: true });
await cp(
  path.join(ROOT, 'node_modules/preact/dist/preact.mjs'),
  path.join(OUT, 'js/preact.mjs'),
);
await cp(
  path.join(ROOT, 'node_modules/preact/hooks/dist/hooks.mjs'),
  path.join(OUT, 'js/hooks.mjs'),
);
await cp(
  path.join(ROOT, 'node_modules/htm/dist/htm.module.js'),
  path.join(OUT, 'js/htm.mjs'),
);
await cp(path.join(ROOT, 'src/client/app.js'), path.join(OUT, 'js/app.mjs'));

/* ------------------------------------------------------------------ sizes -- */

async function dirSize(dir) {
  let total = 0;
  const walk = async (d) => {
    for (const entry of await (await import('node:fs/promises')).readdir(d, { withFileTypes: true })) {
      const p = path.join(d, entry.name);
      if (entry.isDirectory()) await walk(p);
      else total += (await stat(p)).size;
    }
  };
  await walk(dir);
  return total;
}

/* ----------------------------------------------------------------- report -- */

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;

console.log('');
console.log(`rooms        ${totals.rooms} / guests ${totals.guests} / from ${totals.fromPrice} lei`);
console.log(`hall         ${maxEventCapacity} seats`);
console.log(`images       ${Object.keys(manifest).length} sources`);
console.log(`docs/js      ${kb(await dirSize(path.join(OUT, 'js')))}`);
console.log(`docs total   ${(await dirSize(OUT) / 1024 / 1024).toFixed(1)} MB`);

if (warnings.length) {
  console.log('');
  for (const w of warnings) console.log(`warning: ${w}`);
}

if (problems.length) {
  console.log('');
  for (const p of problems) console.log(`ERROR: ${p}`);
  process.exitCode = 1;
} else {
  console.log('\nbuild ok');
}
