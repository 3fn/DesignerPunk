#!/usr/bin/env node
// Task 28.2 (row 2.4 + 2.6): assert a release-4 pack against tarball-target.json and attribute
// every added/removed path (and the largest size movers) to the PR that moved it.
//
// Usage: node attribute.mjs <repo> <base-listing> <head-listing> [--label <name>]
//   <listing> = an `npm pack --dry-run --json` output file, OR a .tgz (read with `tar -tvzf`).
//   <repo>    = the worktree (git history + tarball-target.json are read from it).
// Attribution ranges (row 2.6; O-13):
//   - main side:  git log --first-parent d566b30ff..origin/main -- <src>   (squash PR titles, #NNN)
//   - unit side:  git log origin/main..HEAD --no-merges -- <src>          (U5 unit commits, pre-merge)
//   - otherwise:  "inside U1 after the target was written (b32ce8ace..d566b30ff, PR #215)"
import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const [repo, baseArg, headArg, ...rest] = process.argv.slice(2);
if (!repo || !baseArg || !headArg) { console.error('usage: node attribute.mjs <repo> <base> <head>'); process.exit(2); }
const label = rest.includes('--label') ? rest[rest.indexOf('--label') + 1] : path.basename(headArg);
const U1_SQUASH = 'd566b30ff';
const sh = (args) => execFileSync('git', ['-C', repo, ...args], { encoding: 'utf8', maxBuffer: 1 << 26 }).trim();

function readListing(f) {
  if (f.endsWith('.tgz')) {
    const out = execFileSync('tar', ['-tvzf', f], { encoding: 'utf8', maxBuffer: 1 << 28 });
    const files = [];
    for (const line of out.split('\n')) {
      const m = line.match(/^(\S+)\s+\S+\s+\S+\s+\S+\s+(\d+)\s+\S+\s+\S+\s+\S+\s+(.*)$/);
      if (!m || m[1].startsWith('d')) continue;
      files.push({ path: m[3].replace(/^package\//, ''), size: Number(m[2]) });
    }
    const stat = fs.statSync(f);
    return { files, entryCount: files.length, size: stat.size, unpackedSize: files.reduce((a, b) => a + b.size, 0) };
  }
  const j = JSON.parse(fs.readFileSync(f, 'utf8'))[0];
  return { files: j.files.map((x) => ({ path: x.path, size: x.size })), entryCount: j.entryCount, size: j.size, unpackedSize: j.unpackedSize };
}

// dist/** is attributed by its source root (row 2.6): dist/<rest>.{js,d.ts,json,css} -> src/<rest>.ts and friends.
function sourceCandidates(p) {
  if (!p.startsWith('dist/')) return [p];
  const rest = p.slice(5).replace(/\.d\.ts$/, '').replace(/\.(js|json|css|swift|kt)$/, '');
  const c = [`src/${rest}.ts`, `src/${rest}`, `src/${path.dirname(rest)}`];
  if (rest.startsWith('mcp/')) c.push('mcp-server/src', 'application-mcp-server/src', 'product-mcp-server/src');
  if (rest.startsWith('consumer-canonical/')) c.push('canonical');
  if (rest.startsWith('browser')) c.push('src/browser-entry.ts', 'src/components');
  return c;
}
// An ADDED path is attributed to the commit that created its source (--diff-filter=A), or, for a path that
// shipped because files[] widened, to the first-parent commit whose package.json diff added that pattern.
const FILES_PATTERN_ROOTS = { 'dist/consumer-canonical/': 'dist/consumer-canonical/**', 'dist/testing/': 'dist/testing' };
function attribute(p, mode = 'changed') {
  if (mode === 'added') for (const [root, pat] of Object.entries(FILES_PATTERN_ROOTS)) if (p.startsWith(root)) {
    let l = ''; try { l = sh(['log', '--first-parent', '--format=%h %s', '-S', pat, `${U1_SQUASH}..origin/main`, '--', 'package.json']); } catch {}
    if (l) return { src: `package.json files[] "${pat}"`, lines: l.split('\n').slice(-1).map((x) => x.slice(0, 140)) };
  }
  if (mode === 'removed') {
    // A REMOVED path: the commit that deleted it (--diff-filter=D on the path itself), else the package.json
    // commit whose diff dropped a files[] pattern covering it (pickaxe on its two-segment prefix).
    for (const [rng, extra] of [[`${U1_SQUASH}..origin/main`, ['--first-parent']], ['origin/main..HEAD', ['--no-merges']]]) {
      let l = ''; try { l = sh(['log', ...extra, '--diff-filter=D', '--format=%h %s', rng, '--', p]); } catch {}
      if (l) return { src: p, lines: l.split('\n').map((x) => x.slice(0, 140)) };
    }
    const prefix = p.split('/').slice(0, 2).join('/');
    let l = ''; try { l = sh(['log', '--first-parent', '--format=%h %s', '-S', prefix, `${U1_SQUASH}..origin/main`, '--', 'package.json']); } catch {}
    if (l) return { src: `package.json files[] (${prefix})`, lines: l.split('\n').map((x) => x.slice(0, 140)) };
  }
  const filt = mode === 'added' ? ['--diff-filter=A'] : [];
  for (const src of sourceCandidates(p)) {
    let mainSide = '', unitSide = '';
    try { mainSide = sh(['log', '--first-parent', ...filt, '--format=%h %s', `${U1_SQUASH}..origin/main`, '--', src]); } catch {}
    try { unitSide = sh(['log', '--no-merges', ...filt, '--format=%h %s', 'origin/main..HEAD', '--', src]); } catch {}
    const lines = [...mainSide.split('\n'), ...unitSide.split('\n')].filter(Boolean).map((l) => l.slice(0, 140));
    if (lines.length) return { src, lines };
  }
  return { src: sourceCandidates(p)[0], lines: [`(no commit after ${U1_SQUASH}) inside U1 after the target was written: b32ce8ace..${U1_SQUASH}, PR #215`] };
}

const target = JSON.parse(fs.readFileSync(path.join(repo, 'tarball-target.json'), 'utf8')).target;
const base = readListing(baseArg), head = readListing(headArg);
console.log(`# Tarball assertion — ${label}`);
console.log(`\n| Lever | target (tarball-target.json) | baseline listing (${path.basename(baseArg)}) | ${label} | delta vs target | direction |`);
console.log('|---|---|---|---|---|---|');
for (const k of ['entryCount', 'size', 'unpackedSize']) {
  const d = head[k] - target[k];
  console.log(`| ${k} | ${target[k]} | ${base[k]} | ${head[k]} | ${d >= 0 ? '+' : ''}${d} (${((100 * d) / target[k]).toFixed(2)}%) | ${d > 0 ? 'above target' : d < 0 ? 'below target' : 'at target'} |`);
}
if (base.entryCount !== target.entryCount) console.log(`\n**Baseline reproduction**: the baseline listing has ${base.entryCount} entries; the target declares ${target.entryCount}. The per-path attribution below is against the baseline listing, and that gap is stated, not absorbed.`);
else console.log(`\n**Baseline reproduction**: entryCount reproduces the target (${base.entryCount}).`);

const bmap = new Map(base.files.map((f) => [f.path, f.size])), hmap = new Map(head.files.map((f) => [f.path, f.size]));
const added = [...hmap.keys()].filter((p) => !bmap.has(p)).sort();
const removed = [...bmap.keys()].filter((p) => !hmap.has(p)).sort();
function group(paths, sizes, title) {
  const g = new Map();
  for (const p of paths) {
    const a = attribute(p, title.startsWith('Added') ? 'added' : 'removed'); const key = a.lines.join(' ; ');
    if (!g.has(key)) g.set(key, { src: new Set(), paths: [], bytes: 0 });
    const e = g.get(key); e.src.add(a.src); e.paths.push(p); e.bytes += sizes.get(p) || 0;
  }
  return [...g.entries()].sort((a, b) => b[1].paths.length - a[1].paths.length);
}
for (const [title, paths, sizes] of [['Added paths', added, hmap], ['Removed paths', removed, bmap]]) {
  console.log(`\n## ${title}: ${paths.length}\n`);
  for (const [who, e] of group(paths, sizes, title)) {
    console.log(`- **${e.paths.length} path(s), ${e.bytes} bytes** ← ${who}`);
    for (const p of e.paths.slice(0, 12)) console.log(`  - \`${p}\``);
    if (e.paths.length > 12) console.log(`  - … ${e.paths.length - 12} more`);
  }
}
const movers = [...hmap.keys()].filter((p) => bmap.has(p) && hmap.get(p) !== bmap.get(p))
  .map((p) => ({ p, d: hmap.get(p) - bmap.get(p) })).sort((a, b) => Math.abs(b.d) - Math.abs(a.d));
const net = movers.reduce((a, b) => a + b.d, 0);
console.log(`\n## Changed size, same path: ${movers.length} paths, net ${net >= 0 ? '+' : ''}${net} bytes (top 15 attributed)\n`);
for (const m of movers.slice(0, 15)) { const a = attribute(m.p); console.log(`- \`${m.p}\` ${m.d >= 0 ? '+' : ''}${m.d} ← ${a.lines.slice(0, 3).join(' ; ')}${a.lines.length > 3 ? ` ; … ${a.lines.length - 3} more` : ''}`); }
const addBytes = added.reduce((a, p) => a + hmap.get(p), 0), remBytes = removed.reduce((a, p) => a + bmap.get(p), 0);
console.log(`\n**Reconciliation (unpackedSize)**: added ${addBytes} − removed ${remBytes} + changed ${net} = ${addBytes - remBytes + net}; listing delta ${head.unpackedSize - base.unpackedSize}.`);
