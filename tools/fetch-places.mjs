/**
 * Fetches the five attraction photographs from Wikimedia Commons, checks each
 * licence, and records the attribution that the footer credit line needs.
 *
 * Files whose licence cannot be read are skipped rather than guessed.
 *
 * Run once: node tools/fetch-places.mjs
 */
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const FILES = {
  place_piatra_neamt: 'File:P. Neamt 2013 071 (9141211314).jpg',
  place_neamt_monastery: 'File:Manastirea Neamt - Manastirea Manastirilor.JPG',
  place_bicaz: 'File:Cheile Bicazului, (gorges de bicaz) (2).jpg',
  place_red_lake: 'File:Lacu Roșu, Harghita.02.jpg',
  place_ceahlau:
    'File:Vârful Toaca (Toaca peak), Ceahlău mountains, Romania (52290098053).jpg',
};

const UA =
  'LavandaSiteBuilder/1.0 (https://github.com/alexet18; build-time asset fetch)';

const OUT = path.resolve('assets/src');
await mkdir(OUT, { recursive: true });

const titles = Object.values(FILES).join('|');
const api =
  'https://commons.wikimedia.org/w/api.php?action=query&format=json' +
  '&formatversion=2&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1920' +
  '&titles=' + encodeURIComponent(titles);

const res = await fetch(api, { headers: { 'User-Agent': UA } });
if (!res.ok) throw new Error(`Commons API ${res.status}`);

// Decode explicitly: the generic JSON path can fall back to latin-1 and turn
// "Pierre André" into "Pierre AndrÃ©".
const data = JSON.parse(new TextDecoder('utf-8').decode(await res.arrayBuffer()));

const byTitle = new Map();
for (const page of data.query?.pages ?? []) {
  byTitle.set(page.title, page);
}

const credits = [];
const strip = (s) => (s ?? '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

/**
 * Commons sometimes hands back text that is already utf-8 printed as latin-1
 * ("Pierre AndrÃ©"). Re-interpreting the bytes as utf-8 restores it. Only
 * applied when the tell-tale sequences are present.
 */
const repair = (s) =>
  /Ã|Â|È[\u0080-\u00BF]|Ä[\u0080-\u00BF]/.test(s)
    ? Buffer.from(s, 'latin1').toString('utf8')
    : s;

for (const [id, title] of Object.entries(FILES)) {
  const page = byTitle.get(title);
  const info = page?.imageinfo?.[0];
  if (!info) {
    console.warn(`SKIP ${id}: no imageinfo for "${title}"`);
    continue;
  }

  const meta = info.extmetadata ?? {};
  const licence = strip(meta.LicenseShortName?.value);
  const author = strip(meta.Artist?.value) || 'Unknown';

  if (!/^(CC0|Public domain|CC BY|CC BY-SA)/i.test(licence)) {
    console.warn(`SKIP ${id}: licence "${licence}" is not plainly reusable`);
    continue;
  }

  const url = info.thumburl || info.url;
  const bytes = new Uint8Array(await (await fetch(url, {
    headers: { 'User-Agent': UA },
  })).arrayBuffer());

  await writeFile(path.join(OUT, `${id}.jpg`), bytes);

  credits.push({
    id,
    title: repair(title.replace(/^File:/, '')),
    author: repair(author),
    licence: repair(licence),
    licenceUrl: strip(meta.LicenseUrl?.value),
    source: info.descriptionurl,
    w: info.thumbwidth ?? null,
    h: info.thumbheight ?? null,
  });

  console.log(`${id.padEnd(24)} ${repair(licence).padEnd(14)} ${repair(author).slice(0, 32).padEnd(34)} ${(bytes.length / 1024).toFixed(0)} KB`);
}

await writeFile(
  path.resolve('src/content/credits.json'),
  JSON.stringify(credits, null, 2) + '\n',
);
console.log(`\n${credits.length} images, credits written to src/content/credits.json`);
