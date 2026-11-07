/**
 * Downloads the display typeface, subset to latin + latin-ext only.
 * latin-ext is required for Romanian: ș ț ă î â.
 *
 * Body text uses the system UI font — no download, no FOUT, 0 KB.
 * Only one weight (300) ships; hierarchy comes from size, not weight.
 *
 * Run once: node tools/fetch-fonts.mjs
 */
import { writeFile, mkdir, readdir, unlink } from 'node:fs/promises';
import path from 'node:path';

const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const API =
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300&display=swap';

const OUT = path.resolve('public/fonts');

const slug = (family) => family.toLowerCase().replace(/\s+/g, '-');

const css = await (await fetch(API, { headers: { 'User-Agent': UA } })).text();
const faces = css.match(/@font-face\s*{[^}]+}/g) ?? [];

await mkdir(OUT, { recursive: true });

// Start clean so a changed subset list cannot leave stale files behind.
for (const f of await readdir(OUT).catch(() => [])) {
  if (f.endsWith('.woff2')) await unlink(path.join(OUT, f));
}

const rules = [];

for (const face of faces) {
  const family = face.match(/font-family:\s*'([^']+)'/)?.[1];
  const weight = face.match(/font-weight:\s*(\d+)/)?.[1];
  const url = face.match(/url\((https:[^)]+\.woff2)\)/)?.[1];
  const range = face.match(/unicode-range:\s*([^;]+);/)?.[1] ?? '';

  if (!family || !weight || !url) continue;

  // Google serves many subsets; we only want the two that matter.
  // latin      -> U+0000-00FF ...
  // latin-ext  -> U+0100-02BA ...  (holds ă U+0103, ș U+0219, ț U+021B)
  let subset = null;
  if (/U\+0000-00FF/i.test(range)) subset = 'latin';
  else if (/U\+0100-02BA/i.test(range)) subset = 'latin-ext';
  if (!subset) continue;

  const file = `${slug(family)}-${weight}-${subset}.woff2`;
  const bytes = new Uint8Array(await (await fetch(url)).arrayBuffer());
  await writeFile(path.join(OUT, file), bytes);

  rules.push({ family, weight, subset, range, file, size: bytes.length });
  console.log(`${file.padEnd(40)} ${(bytes.length / 1024).toFixed(1)} KB`);
}

const total = rules.reduce((n, r) => n + r.size, 0);
console.log(`\n${rules.length} files, ${(total / 1024).toFixed(1)} KB total`);

// Emit the @font-face block that main.css imports.
const face = (r) => `@font-face {
  font-family: '${r.family}';
  font-style: normal;
  font-weight: ${r.weight};
  font-display: swap;
  src: url('../fonts/${r.file}') format('woff2');
  unicode-range: ${r.range};
}`;

await writeFile(
  path.resolve('public/styles/fonts.css'),
  rules.map(face).join('\n\n') + '\n',
);
console.log('wrote public/styles/fonts.css');
