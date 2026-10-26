/**
 * @category evergreen
 * @purpose The governance-examples guard (ballot 2026-10-26-governance-examples-guard, RATIFIED, #495):
 * the token-name half (Ada's predicate v1), the file-shape half (Lina's rule v1: declared paths and
 * token-file shape) and the import surface (F-2 (c)), over the served governance docs. This test is
 * the registered guard (`.github/in-lane-guards.json`; `npm run test:scripts` in lane-functional-root).
 *
 * What it asserts, in order:
 *   1. The module header carries the ballot's § 8.1–8.5 texts byte-exact, with the version constants.
 *   2. The name set: FAMILIES and STEMS derived from KEYS; RETIRED_FAMILIES shares no member (A-5).
 *   3. Ada's R-5 cases, red and green, through the guard's own reading of a doc.
 *   4. Stacy's C-e and C-f fixtures: stale entry, unlisted hit, unknown marker, missing inputs throw,
 *      zero candidates throw, generic counted in K, marker scope per fence and per span.
 *   5. Lina's rules: L-3 resolution, L-1 shape, `consumer` skips only path resolution, the import
 *      surface (listed subpath, unlisted subpath, missing member, quoted import lines not extracted).
 *   6. Lina's twin-agreement test (L-2): the syntax predicate agrees with the loader's harvest over
 *      the seven real token files and the plain-map fixture; the naming rule agrees with the loader's.
 *   7. The real corpus against pending.json: no unlisted hit, no stale entry, no unknown marker; the
 *      baseline header holds; every entry's home is an open record that names the doc.
 *
 * The import surface needs the built types (`npm run build`); the lane builds before test:scripts.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { loadComponentTokens } from '../../../src/cli/loadComponentTokens';
import type { ResolvedConfig } from '../../../src/config/ConfigLoader';
import {
  EXCLUDED_DOCS,
  FILE_SHAPE_RULE_VERSION,
  GuardInputError,
  GuardInputs,
  HALVES,
  PENDING_PATH,
  PREDICATE_VERSION,
  RETIRED_FAMILIES,
  candidatePattern,
  candidatesIn,
  deriveFamilies,
  deriveStems,
  formatCensus,
  formatReport,
  hasExportedDefineCall,
  isTokenFileName,
  judge,
  loadExportsMap,
  loadNameSet,
  loadPending,
  parseHeader,
  readInputs,
  resolveCandidate,
  resolveDeclaredPath,
  runGuard,
  scopeDocs,
  trackedFiles,
  type PendingFile,
} from '../check';

const REPO = path.resolve(__dirname, '..', '..', '..');
const BALLOT = path.join(REPO, '.kiro/docs/ballots/2026-10-26-governance-examples-guard.md');
const MODULE = path.join(REPO, 'scripts/governance-examples/check.ts');
const FIXTURES = path.join(__dirname, '__fixtures__');

const nameSet = loadNameSet(path.join(REPO, 'token-index'));
const exportsMap = loadExportsMap(REPO);
const tracked = trackedFiles(REPO);

/** A token candidate that resolves, so a synthetic doc never trips the zero-candidate floor. */
const KEY_LINE = 'A real key: `color.feedback.success.text`.';

const tmpDirs: string[] = [];
afterAll(() => {
  for (const d of tmpDirs) fs.rmSync(d, { recursive: true, force: true });
});

/** A synthetic repo: governance docs, the real exports map and built types, the real name set. */
function synth(docs: Record<string, string>, over: Partial<GuardInputs> = {}): GuardInputs {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ge-synth-'));
  tmpDirs.push(root);
  fs.mkdirSync(path.join(root, 'governance'));
  for (const [name, text] of Object.entries(docs)) fs.writeFileSync(path.join(root, 'governance', name), text);
  fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify({ name: '@3fn/core', files: [], exports: exportsMap }));
  fs.symlinkSync(path.join(REPO, 'dist'), path.join(root, 'dist'), 'dir');
  return {
    repoRoot: root,
    docs: Object.keys(docs).map((d) => `governance/${d}`),
    tracked,
    nameSet,
    exportsMap,
    ...over,
  };
}

function emptyPending(): PendingFile {
  return { header: 'adopted: 0000000 2026-10-26; entries: 0 (token-name 0, declared-path 0, shape 0, import 0)', entries: [] };
}

function fence(lang: string, body: string, marker?: string): string {
  return `${marker ? `<!-- example: ${marker} -->\n` : ''}\`\`\`${lang}\n${body}\n\`\`\`\n`;
}

// ============================================================================
// 1. The texts
// ============================================================================

describe('the module header carries the ballot § 8.1–8.5 texts byte-exact', () => {
  const ballot = fs.readFileSync(BALLOT, 'utf8').split('\n');
  const source = fs.readFileSync(MODULE, 'utf8');
  const block = (sec: string): string => {
    const i = ballot.findIndex((l) => l.startsWith(`### ${sec} `));
    expect(i).toBeGreaterThan(0);
    const open = ballot.indexOf('````', i);
    const close = ballot.indexOf('````', open + 1);
    return ballot.slice(open + 1, close).join('\n');
  };
  it.each(['8.1', '8.2', '8.3', '8.4', '8.5'])('§ %s', (sec) => {
    const text = block(sec);
    expect(text.length).toBeGreaterThan(100);
    expect(source.includes(text)).toBe(true);
  });
  it('carries the version constants and the one stated exclusion', () => {
    expect(PREDICATE_VERSION).toBe(1);
    expect(FILE_SHAPE_RULE_VERSION).toBe(1);
    expect(EXCLUDED_DOCS).toEqual(['governance/classification-map.md']);
  });
});

// ============================================================================
// 2. The name set
// ============================================================================

describe('the name set, read from the committed token-index/', () => {
  it('derives FAMILIES and STEMS from KEYS, never a hand-kept list', () => {
    expect(nameSet.keys.size).toBeGreaterThan(0);
    expect(nameSet.families).toEqual(deriveFamilies(nameSet.keys));
    expect(nameSet.stems).toEqual(deriveStems(nameSet.keys));
    expect(nameSet.families.length).toBeGreaterThan(0);
    expect(nameSet.stems.length).toBeGreaterThan(0);
    expect(nameSet.channels.size).toBeGreaterThan(0);
  });
  it('A-5: RETIRED_FAMILIES shares no member with FAMILIES', () => {
    for (const r of RETIRED_FAMILIES) expect(nameSet.families).not.toContain(r);
  });
});

// ============================================================================
// 3. Ada's R-5 cases
// ============================================================================

describe("Ada's R-5 cases", () => {
  const pattern = candidatePattern(nameSet);
  const resolveAll = (text: string) =>
    candidatesIn(text, 1, pattern).map((c) => ({ s: c.string, r: resolveCandidate(c.string, c.glob, nameSet) }));

  it('red: `color.primary` in a span', () => {
    const r = runGuard(synth({ 'a.md': `${KEY_LINE}\nUse \`color.primary\` here.\n` }));
    expect(r.hits.map((h) => [h.half, h.string])).toEqual([['token-name', 'color.primary']]);
  });
  it("red: 'space.inset.comfortable' in a ts string", () => {
    const r = runGuard(synth({ 'a.md': `${KEY_LINE}\n${fence('ts', "const p = 'space.inset.comfortable';")}` }));
    expect(r.hits.map((h) => h.string)).toEqual(['space.inset.comfortable']);
  });
  it('red: `color.select.*` (no key starts with color.select.)', () => {
    expect(resolveAll('color.select.*')).toEqual([{ s: 'color.select', r: 'fail' }]);
    const r = runGuard(synth({ 'a.md': `${KEY_LINE}\nThe \`color.select.*\` family.\n` }));
    expect(r.hits.map((h) => h.string)).toEqual(['color.select']);
  });
  it('red: `spacing.grouped.normal` (rule 0, a retired family)', () => {
    expect(resolveAll('spacing.grouped.normal')).toEqual([{ s: 'spacing.grouped.normal', r: 'fail' }]);
  });
  it('red: a glob that no key starts with', () => {
    expect(resolveAll('color.nothing*')).toEqual([{ s: 'color.nothing', r: 'fail' }]);
  });
  it('green: `--color-primary` and `DesignTokens.size700` are not candidates', () => {
    expect(resolveAll('--color-primary')).toEqual([]);
    expect(resolveAll('DesignTokens.size700')).toEqual([]);
  });
  it('green: `space.inset.*` and `space.inset` resolve (namespace); a true glob resolves (glob)', () => {
    expect(resolveAll('space.inset.*')).toEqual([{ s: 'space.inset', r: 'namespace' }]);
    expect(resolveAll('space.inset')).toEqual([{ s: 'space.inset', r: 'namespace' }]);
    expect(resolveAll('space.inset*')).toEqual([{ s: 'space.inset', r: 'glob' }]);
  });
  it('green: `pinkLightness300` (channel)', () => {
    expect(resolveAll('pinkLightness300')).toEqual([{ s: 'pinkLightness300', r: 'channel' }]);
  });
  it('green: `{color.green500}` (dtcg-path)', () => {
    expect(resolveAll('{color.green500}')).toEqual([{ s: 'color.green500', r: 'dtcg-path' }]);
  });
  it('rule 6: a file name is counted, not failed', () => {
    expect(resolveAll('avatar.tokens.ts')).toEqual([{ s: 'avatar.tokens.ts', r: 'file-name' }]);
  });
  it('regions: unquoted identifiers in a program block are not read; other fences read whole lines', () => {
    const r = runGuard(
      synth({ 'a.md': `${KEY_LINE}\n${fence('swift', 'let x = color.primary')}${fence('yaml', 'value: color.primary')}` }),
    );
    expect(r.hits.map((h) => [h.string, h.line])).toEqual([['color.primary', 6]]);
  });
});

// ============================================================================
// 4. Stacy's C-e and C-f fixtures
// ============================================================================

describe("Stacy's fixtures (C-e, C-f)", () => {
  const doc = `${KEY_LINE}\nUse \`color.primary\`.\n`;

  it('a stale pending entry goes red', () => {
    const r = runGuard(synth({ 'a.md': KEY_LINE + '\n' }));
    const p = emptyPending();
    p.entries.push({ doc: 'governance/a.md', half: 'token-name', string: 'color.primary', occurrence: 0, home: 'x' });
    const v = judge(r, p);
    expect(v.pass).toBe(false);
    expect(v.stale.map((e) => e.string)).toEqual(['color.primary']);
  });
  it('a new hit not on the list goes red; listed, it is green', () => {
    const r = runGuard(synth({ 'a.md': doc }));
    const v = judge(r, emptyPending());
    expect(v.pass).toBe(false);
    expect(v.unlisted.map((h) => h.string)).toEqual(['color.primary']);
    const p = emptyPending();
    p.entries.push({ doc: 'governance/a.md', half: 'token-name', string: 'color.primary', occurrence: 0, home: 'x' });
    expect(judge(r, p).pass).toBe(true);
  });
  it('an unknown marker value goes red', () => {
    const r = runGuard(synth({ 'a.md': `${KEY_LINE}\n<!-- example: other -->\n${fence('ts', "'color.feedback.success.text'")}` }));
    expect(r.badMarkers.map((b) => b.value)).toEqual(['other']);
    expect(judge(r, emptyPending()).pass).toBe(false);
  });
  it('a missing dist/ throws', () => {
    const inp = synth({ 'a.md': doc });
    fs.unlinkSync(path.join(inp.repoRoot, 'dist'));
    expect(() => readInputs(inp.repoRoot)).toThrow(GuardInputError);
    expect(() => runGuard({ ...inp, docs: ['governance/a.md'] })).not.toThrow(); // no import line: no types needed
    const withImport = synth({ 'b.md': `${KEY_LINE}\n${fence('ts', "import { getBlendUtilities } from '@3fn/core/blend';")}` });
    fs.unlinkSync(path.join(withImport.repoRoot, 'dist'));
    expect(() => runGuard(withImport)).toThrow(GuardInputError);
  });
  it('a missing exports map throws', () => {
    const inp = synth({ 'a.md': doc });
    fs.writeFileSync(path.join(inp.repoRoot, 'package.json'), JSON.stringify({ name: '@3fn/core', files: [] }));
    expect(() => loadExportsMap(inp.repoRoot)).toThrow(GuardInputError);
    expect(() => readInputs(inp.repoRoot)).toThrow(GuardInputError);
  });
  it('a missing token-index/ throws', () => {
    const inp = synth({ 'a.md': doc });
    expect(() => loadNameSet(path.join(inp.repoRoot, 'token-index'))).toThrow(GuardInputError);
  });
  it('a zero-candidate run throws', () => {
    expect(() => runGuard(synth({ 'a.md': 'No code here.\n' }))).toThrow(/zero candidates/);
    expect(() => runGuard(synth({}))).toThrow(GuardInputError);
  });
  it('a candidate under generic is not read, and is counted in K', () => {
    const r = runGuard(synth({ 'a.md': `${KEY_LINE}\n${fence('yaml', 'value: color.primary', 'generic')}` }));
    expect(r.hits).toEqual([]);
    expect(r.optedOut).toBe(1);
    expect(r.optedOutGeneric).toBe(1);
    expect(r.wouldFail).toBe(1);
    expect(formatReport(r, 0)).toMatch(/1 opted out \(1 generic, 0 consumer; 1 would fail if read\)/);
  });
  it('a marker before a fence covers that fence only, not the next one', () => {
    const r = runGuard(
      synth({ 'a.md': `${KEY_LINE}\n${fence('yaml', 'a: color.primary', 'generic')}\n${fence('yaml', 'b: color.error')}` }),
    );
    expect(r.hits.map((h) => h.string)).toEqual(['color.error']);
  });
  it('an inline marker covers only its own span: a real non-key on the same line is still read', () => {
    const r = runGuard(
      synth({ 'a.md': `${KEY_LINE}\nSay \`color.primary\`<!-- example: generic --> but not \`color.error\`.\n` }),
    );
    expect(r.hits.map((h) => h.string)).toEqual(['color.error']);
    expect(r.optedOut).toBe(1);
    expect(r.wouldFail).toBe(1);
  });
  it('fences pair as CommonMark defines them: a tagged opener inside a markdown fence is content', () => {
    const text = `${KEY_LINE}\n\`\`\`markdown\nExample:\n\`\`\`typescript\nconst x = color.primary;\n\`\`\`\n`;
    const r = runGuard(synth({ 'a.md': text }));
    // The inner lines are whole-line content of the markdown fence (region (c)), so the unquoted name is read.
    expect(r.hits.map((h) => h.string)).toEqual(['color.primary']);
  });
  it('content keys: the occurrence index counts a doc’s failing hits of one string', () => {
    const r = runGuard(synth({ 'a.md': `${KEY_LINE}\n\`color.primary\` and\n\n\`color.primary\` again.\n` }));
    expect(r.hits.map((h) => [h.string, h.occurrence])).toEqual([
      ['color.primary', 0],
      ['color.primary', 1],
    ]);
  });
});

// ============================================================================
// 5. Lina's rules
// ============================================================================

describe("Lina's file-shape rule and the import surface", () => {
  it('L-3: root path, unique suffix resolve; missing and ambiguous suffixes fail', () => {
    expect(resolveDeclaredPath('src/components/core/Button-Icon/buttonIcon.tokens.ts', tracked)).toBe(true);
    expect(resolveDeclaredPath('Button-CTA/platforms/web/ButtonCTA.web.ts', tracked)).toBe(true);
    expect(resolveDeclaredPath('ButtonCTA/tokens.ts', tracked)).toBe(false);
    expect(resolveDeclaredPath('tokens.ts', tracked)).toBe(false); // two tracked tokens.ts files
    expect(tracked.filter((t) => t.endsWith('/tokens.ts') && t.startsWith('src/components/')).length).toBeGreaterThan(1);
  });
  it('L-1: a declared token file must hold an exported defineComponentTokens(...) binding', () => {
    expect(hasExportedDefineCall("export const T = defineComponentTokens({ component: 'X' });")).toBe(true);
    expect(hasExportedDefineCall("const T = defineComponentTokens({}); export { T };")).toBe(true);
    expect(hasExportedDefineCall("const T = defineComponentTokens({});")).toBe(false);
    expect(hasExportedDefineCall("export const T = { paddingX: 'space.inset.100' };")).toBe(false);
    // Syntax only: a partial teaching block still parses (L-2).
    expect(hasExportedDefineCall("export const T = defineComponentTokens({\n  // 'inset.large' → space150\n});")).toBe(true);
  });
  it('a plain-map token file fails by shape even when its path resolves', () => {
    const body = "// src/components/core/Button-Icon/buttonIcon.tokens.ts\nexport const m = { paddingX: 'space.inset.100' };";
    const r = runGuard(synth({ 'a.md': `${KEY_LINE}\n${fence('typescript', body)}` }));
    expect(r.hits.map((h) => [h.half, h.string])).toEqual([['shape', 'src/components/core/Button-Icon/buttonIcon.tokens.ts']]);
  });
  it('consumer skips only path resolution: shape, import surface and token names still run (L-5, A-3, R-7)', () => {
    const body = [
      '// src/components/MyCard/MyCard.tokens.ts',
      "import { nothingHere } from '@3fn/core/build';",
      "export const m = { paddingX: 'color.primary' };",
    ].join('\n');
    const r = runGuard(synth({ 'a.md': `${KEY_LINE}\n${fence('typescript', body, 'consumer')}` }));
    expect(r.hits.map((h) => h.half).sort()).toEqual(['import', 'shape', 'token-name']);
    expect(r.optedOutConsumer).toBe(1);
    expect(r.wouldFail).toBe(1); // the consumer path, not read
  });
  it('generic skips every half', () => {
    const body = "// nowhere/tokens.ts\nimport { x } from '@3fn/core/nope';\nexport const m = { p: 'color.primary' };";
    const r = runGuard(synth({ 'a.md': `${KEY_LINE}\n${fence('typescript', body, 'generic')}` }));
    expect(r.hits).toEqual([]);
    expect(r.wouldFail).toBe(4);
  });
  it('import surface: a listed subpath type-checks; an unlisted subpath and a missing member fail', () => {
    const body = [
      "import { getBlendUtilities } from '@3fn/core/blend';",
      "import { getBlendUtilities as g2 } from '@3fn/core/ThemeAwareBlendUtilities';",
      "import { zIndexTokens } from '@3fn/core';",
      "export { defineComponentTokens } from '@3fn/core/build';",
    ].join('\n');
    const r = runGuard(synth({ 'a.md': `${KEY_LINE}\n${fence('ts', body)}` }));
    expect(r.importLines).toBe(4);
    expect(r.importLinesPass).toBe(2);
    expect(r.hits.map((h) => h.string)).toEqual(['@3fn/core/ThemeAwareBlendUtilities', '@3fn/core']);
  });
  it('import surface: prose and trees that quote an import line are not extracted; other tags are not read', () => {
    const tree = "├── import { x } from '@3fn/core/nope';\n// import { y } from '@3fn/core/nope';";
    const r = runGuard(
      synth({ 'a.md': `${KEY_LINE}\nProse: import { x } from '@3fn/core/nope';\n${fence('', tree)}${fence('bash', "import { z } from '@3fn/core/nope'")}` }),
    );
    expect(r.importLines).toBe(0);
    expect(r.hits).toEqual([]);
  });
});

// ============================================================================
// 6. The twin-agreement test (L-2)
// ============================================================================

describe("Lina's twin-agreement test: the syntax predicate agrees with the loader's harvest", () => {
  const realTokenFiles = tracked
    .filter((t) => t.startsWith('src/components/') && isTokenFileName(path.posix.basename(t)))
    .sort();
  const plainMap = path.join(FIXTURES, 'plain-map');

  it('runs over the seven real token files', () => {
    expect(realTokenFiles).toHaveLength(7);
  });

  it('agrees on every real file and on the plain-map fixture; the naming rule agrees with the loader’s', () => {
    const dirs = [...new Set(realTokenFiles.map((f) => path.join(REPO, path.dirname(f))))];
    const warned = new Set<string>();
    const spy = jest.spyOn(console, 'warn').mockImplementation((msg: unknown) => {
      const m = /^⚠️ {2}(.+): this scanned file harvested zero component tokens/.exec(String(msg));
      if (m) warned.add(path.resolve(m[1]));
    });
    try {
      const config = {
        name: 'Twin',
        abbreviation: 'TW',
        themes: [],
        tokenSourceRoot: path.join(os.tmpdir(), 'ge-no-token-source-root'),
        tokenSourceMode: 'local',
        componentTokenDirs: [...dirs, plainMap],
        outputDir: os.tmpdir(),
        configDir: REPO,
      } as ResolvedConfig;
      loadComponentTokens(config, (file: string) => require(file));
    } finally {
      spy.mockRestore();
    }
    const files = [...realTokenFiles.map((f) => path.join(REPO, f)), path.join(plainMap, 'plain-map.tokens.ts')];
    const rows = files.map((f) => ({
      file: path.relative(REPO, f),
      loaderBranded: !warned.has(path.resolve(f)),
      syntax: hasExportedDefineCall(fs.readFileSync(f, 'utf8'), f),
    }));
    for (const row of rows) expect({ file: row.file, agree: row.syntax === row.loaderBranded }).toEqual({ file: row.file, agree: true });
    // Non-vacuity: both outcomes occur.
    expect(rows.some((r) => r.syntax)).toBe(true);
    expect(rows.some((r) => !r.syntax)).toBe(true);
    // The naming copy: the loader scans (and here warns on) exactly the plain maps isTokenFileName accepts.
    for (const name of fs.readdirSync(plainMap)) {
      expect({ name, scanned: warned.has(path.resolve(plainMap, name)) }).toEqual({ name, scanned: isTokenFileName(name) });
    }
  });
});

// ============================================================================
// 7. The real corpus against pending.json
// ============================================================================

describe('the served corpus', () => {
  const inputs = readInputs(REPO);
  const result = runGuard(inputs);
  const pending = loadPending(path.join(REPO, PENDING_PATH));
  const verdict = judge(result, pending);

  it('reads the scope: governance/*.md less the exclusion, and the files[] steering docs', () => {
    expect(inputs.docs).toEqual(scopeDocs(REPO));
    expect(inputs.docs).not.toContain('governance/classification-map.md');
    expect(inputs.docs.filter((d) => d.startsWith('.kiro/steering/'))).toHaveLength(8);
    expect(result.candidates).toBeGreaterThan(0);
  });

  it('prints the report line and the census', () => {
    const line = formatReport(result, pending.entries.length);
    // eslint-disable-next-line no-console
    console.log(line);
    expect(line).toMatch(/^\d+ candidates; \d+ resolve \(/);
    const census = formatCensus(result);
    expect(census).toHaveLength(inputs.docs.length + 1);
    expect(census[census.length - 1]).toMatch(/^selected: \d+ /);
  });

  it('has no unlisted hit, no stale or duplicate pending entry, and no unknown marker value', () => {
    const show = (xs: { doc: string; half: string; string: string; occurrence: number; line?: number }[]) =>
      xs.map((h) => `${h.doc}:${h.line ?? '?'} ${h.half} ${h.string} #${h.occurrence}`);
    expect({
      unlisted: show(verdict.unlisted),
      stale: show(verdict.stale),
      duplicate: show(verdict.duplicate),
      badMarkers: verdict.badMarkers,
    }).toEqual({ unlisted: [], stale: [], duplicate: [], badMarkers: [] });
  });

  it('the pending list holds its baseline: the entry count is at most the adopted count, per half and in total', () => {
    const base = parseHeader(pending.header);
    expect(pending.entries.length).toBeLessThanOrEqual(base.entries);
    for (const h of HALVES) {
      expect({ half: h, n: pending.entries.filter((e) => e.half === h).length <= base.perHalf[h] }).toEqual({ half: h, n: true });
    }
    expect(Object.values(base.perHalf).reduce((a, b) => a + b, 0)).toBe(base.entries);
  });

  it("every pending entry's home is an open record (at the issues root) that names the entry's doc", () => {
    for (const e of pending.entries) {
      expect(e.home).toMatch(/^\.kiro\/issues\/[^/]+\.md$/);
      const home = path.join(REPO, e.home);
      expect({ home: e.home, open: fs.existsSync(home) }).toEqual({ home: e.home, open: true });
      const text = fs.readFileSync(home, 'utf8');
      expect({ home: e.home, doc: e.doc, named: text.includes(path.posix.basename(e.doc)) }).toEqual({
        home: e.home,
        doc: e.doc,
        named: true,
      });
    }
  });
});
