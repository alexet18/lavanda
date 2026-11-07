/**
 * Creates the GitHub repository, pushes, and turns on GitHub Pages.
 *
 *   $env:GITHUB_TOKEN = "ghp_..."; node tools/publish.mjs
 *
 * The token is used in memory only. It is never written to .git/config: the
 * push authenticates through a one-shot http.extraheader.
 *
 * Needs a token with `repo` scope (classic) or Contents+Pages write
 * (fine-grained). Nothing else.
 */
import { execFileSync } from 'node:child_process';

const TOKEN = process.env.GITHUB_TOKEN;
const OWNER = process.env.GITHUB_OWNER ?? 'alexet18';
const REPO = process.env.GITHUB_REPO ?? 'lavanda';
const PRIVATE = process.env.GITHUB_PRIVATE === '1';
const BRANCH = 'main';
const PAGES_PATH = '/docs';

if (!TOKEN) {
  console.error('Set GITHUB_TOKEN first (repo scope).');
  process.exit(1);
}

const api = async (method, url, body) => {
  const res = await fetch(`https://api.github.com${url}`, {
    method,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'lavanda-publisher',
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  const json = text ? JSON.parse(text) : null;
  return { ok: res.ok, status: res.status, json };
};

const git = (args) => execFileSync('git', args, { stdio: 'inherit' });

/* 1. who are we ---------------------------------------------------------- */

const me = await api('GET', '/user');
if (!me.ok) {
  console.error(`Token rejected (${me.status}): ${me.json?.message ?? 'unknown'}`);
  process.exit(1);
}
const owner = OWNER || me.json.login;
console.log(`authenticated as ${me.json.login} → ${owner}/${REPO}`);

/* 2. repository ---------------------------------------------------------- */

let repo = await api('GET', `/repos/${owner}/${REPO}`);
if (!repo.ok) {
  const created = await api('POST', owner === me.json.login ? '/user/repos' : `/orgs/${owner}/repos`, {
    name: REPO,
    description: 'Presentation site for Pensiunea Lavanda, Alexandru cel Bun, Neamț',
    homepage: `https://${owner}.github.io/${REPO}/`,
    private: PRIVATE,
    has_issues: false,
    has_wiki: false,
    auto_init: false,
  });
  if (!created.ok) {
    console.error(`Could not create repo (${created.status}): ${created.json?.message}`);
    process.exit(1);
  }
  repo = created;
  console.log('repository created');
} else {
  console.log('repository already exists, reusing');
}

const remote = `https://github.com/${owner}/${REPO}.git`;

/* 3. push ---------------------------------------------------------------- */

// Authenticate once, in memory, so no token lands in .git/config.
const basic = Buffer.from(`x-access-token:${TOKEN}`).toString('base64');

git(['remote', 'remove', 'origin']);
git(['remote', 'add', 'origin', remote]);

const branch = execFileSync('git', ['rev-parse', '--abbrev-ref', 'HEAD']).toString().trim();
if (branch !== BRANCH) git(['branch', '-M', BRANCH]);

git(['-c', `http.extraheader=AUTHORIZATION: basic ${basic}`, 'push', '-u', 'origin', BRANCH, '--force']);
console.log('pushed');

/* 4. pages --------------------------------------------------------------- */

const pagesConfig = { build_type: 'legacy', source: { branch: BRANCH, path: PAGES_PATH } };
let pages = await api('POST', `/repos/${owner}/${REPO}/pages`, pagesConfig);

if (!pages.ok && pages.status === 409) {
  pages = await api('PUT', `/repos/${owner}/${REPO}/pages`, pagesConfig);
}
if (!pages.ok) {
  console.error(`Could not enable Pages (${pages.status}): ${pages.json?.message}`);
  process.exit(1);
}
console.log('GitHub Pages enabled from', `${BRANCH}${PAGES_PATH}`);

/* 5. wait for the first build ------------------------------------------- */

const url = `https://${owner}.github.io/${REPO}/`;
for (let attempt = 0; attempt < 30; attempt += 1) {
  await new Promise((r) => setTimeout(r, 6000));

  const info = await api('GET', `/repos/${owner}/${REPO}/pages`);
  if (info.ok && info.json.status === 'built') {
    console.log(`\nlive at ${info.json.html_url ?? url}`);
    process.exit(0);
  }

  const last = await api('GET', `/repos/${owner}/${REPO}/pages/builds/latest`);
  const st = last.ok ? last.json.status : 'queued';
  process.stdout.write(`build: ${st}\r`);
  if (st === 'errored') {
    console.error(`\nPages build failed: ${last.json?.error?.message ?? 'see the Actions tab'}`);
    process.exit(1);
  }
}

console.log(`\nStill building. Watch the Actions tab, or open ${url} in a minute.`);
