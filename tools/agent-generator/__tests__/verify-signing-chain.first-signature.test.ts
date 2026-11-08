/**
 * verify-signing-chain.first-signature.test.ts — `--ci` link 1 for a FIRST signature (signing ballot
 * 2026-10-01 § 2 clause 3, erratum ratified by Peter 2026-10-21: a signing act is valid only for a
 * row on the stale list OR the unsigned-routed list).
 *
 * Fixtures FU10–FU26b: specified by Stacy (`fixtures.md`, burst 1, 2026-10-21), built by Thurgood.
 * Every test name starts with its fixture id. T-CI = the T-UR tree (`fixtures/unsigned-routed/build.ts`)
 * committed into a throwaway repository on `main`; each fixture cuts `pr` from it. The sweep is
 * stubbed (as in verify-signing-chain.test.ts) except FU22/FU23, which run the real sweep.
 *
 * A first signature = the row's dispositions `signature` absent at the commit's first parent and
 * present at the commit. Its link 1 reads the unsigned-routed list of the FIRST-PARENT TREE — never
 * the head's (always empty after signing) nor the range base's.
 */

import { listsAt, runFreshnessSweep, formatFreshness } from '../regrounding/freshness';
import { load as loadYaml } from 'js-yaml';
import { hashText } from '../regrounding/hash';
import { runCi, type CiResult } from '../regrounding/verify-signing-chain';
import { cleanupTmp, commit, editRow, editSheet, g, hash, head, read, RG, tmp, write } from './fixtures/signing-chain/helpers';
import {
  allFiles,
  DISP,
  FULL_TABLE,
  RENDERED,
  SHEET,
  SHEET_PREAMBLE,
  sectionOf,
  sheetBlock,
  signatureFor,
  treeFiles,
  type SigState,
  type TreeSpec,
} from './fixtures/unsigned-routed/build';

const STUB_SWEEP = (): { pass: boolean; lines: string[] } => ({ pass: true, lines: ['operative-set-freshness: PASS (fixture stub)'] });
const SHARED_DISP = 'canonical/profiles/consumer/_shared.dispositions.yaml';
const SHARED_SHEET = 'canonical/profiles/consumer/signatures/_shared.md';

afterAll(() => cleanupTmp());

/** A repo on `main` holding T-UR (+ a shared catalog with one routed member), then branch `pr`. */
function repoWith(spec: TreeSpec = FULL_TABLE): [string, string] {
  const repo = tmp('ur-repo');
  g(repo, ['init', '-q', '-b', 'main']);
  g(repo, ['config', 'commit.gpgsign', 'false']);
  for (const [rel, text] of Object.entries(treeFiles(spec))) write(repo, rel, text);
  write(repo, 'canonical/shared/shared-catalog.yaml', 'members:\n  - id: m-one\n    owner: kenya\n');
  write(repo, SHARED_DISP, `source: canonical/shared/shared-catalog.yaml\nmembers:\n  "m-one": ${JSON.stringify({ disposition: 'no-consumer-counterpart', cites: 'subtraction-3' })}\n`);
  commit(repo, 'base: T-UR fixture tree', []);
  const base = head(repo);
  g(repo, ['switch', '-q', '-c', 'pr']);
  return [repo, base];
}

interface SignOpts {
  state?: SigState;
  signer?: string;
  /** Write the sheet section (default true) / the dispositions signature (default true). */
  sheet?: boolean;
  row?: boolean;
}
/** A first signature on row `k` (`#anchor`, `fm:<path>`, or `m:<member>`), in the working tree. */
function sign(repo: string, k: string, o: SignOpts = {}): void {
  const member = k.startsWith('m:');
  const [section, key] = member ? (['body', k.slice(2)] as const) : sectionOf(k);
  const sig = signatureFor(section, key, o.state ?? 'fresh', o.signer ?? 'kenya');
  const file = member ? SHARED_DISP : DISP;
  const sheet = member ? SHARED_SHEET : SHEET;
  if (member) sig.evidence = `${SHARED_SHEET}#${key}`;
  if (o.row !== false) editRow(repo, file, key, (row) => ({ ...row, signature: sig }));
  if (o.sheet !== false) {
    let existing: string;
    try {
      existing = read(repo, sheet);
    } catch {
      existing = SHEET_PREAMBLE;
    }
    const block = member ? sheetBlock('body', key, sig).replace(`## \`${key}\``, `## \`#${key}\``) : sheetBlock(section, key, sig);
    write(repo, sheet, existing + block);
  }
}
/**
 * T-CI has no consumer rendering (T-UR pins {@link RENDERED}), so link 1's lists at a first parent
 * (freshness.ts listsAt — the sweep over that tree; shape-review ballot item 4) read the rendered
 * hash from the same option the T-UR sweep uses.
 */
const RG_UR = { ...RG, listsAt: (read: (rel: string) => string | undefined, files: readonly string[]) => listsAt(read, files, { renderedHash: RENDERED }) };
const ci = (repo: string, base: string, sweep: ((root: string) => { pass: boolean; lines: string[] }) | null = STUB_SWEEP, rg = RG_UR): CiResult =>
  runCi({ repo, base, head: 'HEAD', rg, sweep });
/**
 * A rendering oracle that moves when a row's `removals` move, as the real renderer re-renders a
 * re-disposed row; rows without removals keep {@link RENDERED}. Read at the tree link 1 reads.
 */
const renderedByRemovals =
  (read: (rel: string) => string | undefined) =>
  (file: string, section: string, key: string): string => {
    const doc = loadYaml(read(file) ?? '') as Record<string, Record<string, { removals?: unknown }>> | undefined;
    const removals = doc?.[section]?.[key]?.removals;
    return removals === undefined ? RENDERED(file, section, key) : hashText(`rendered:${section}:${key}:${JSON.stringify(removals)}`);
  };
const RG_RERENDER = { ...RG, listsAt: (read: (rel: string) => string | undefined, files: readonly string[]) => listsAt(read, files, { renderedHash: renderedByRemovals(read) }) };
const links = (r: CiResult): number[] => [...new Set(r.findings.map((f) => f.link))].sort();
const realSweep = (root: string): { pass: boolean; lines: string[] } => {
  const report = runFreshnessSweep(root, { tracked: allFiles(root), renderedHash: RENDERED });
  return { pass: report.findings.length === 0, lines: formatFreshness(report) };
};
const NEITHER = /first signature on a row on neither the stale list nor the unsigned-routed list at the commit's first parent/;

describe('verify-signing-chain --ci — link 1 for a first signature (T-CI)', () => {
  // ------------------------------------------------------------------ in bound
  test('FU10: a first signature on a re-pointed ROUTES row (r1), by its C1 seat → pass', () => {
    const [repo, base] = repoWith();
    sign(repo, '#alpha');
    commit(repo, 'First signature #alpha (kenya)', ['Agent: kenya']);
    const r = ci(repo, base);
    expect(r.findings).toEqual([]);
    expect(r.ok).toBe(true);
    expect(r.rowsChecked).toBe(1);
  });

  test.each([
    ['r6, body no-consumer-counterpart', '#zeta'],
    ['r8, frontmatter no-consumer-counterpart', 'fm:writeScope[a]'],
    ['r7, body superseded-by', '#eta'],
    ['r2, body ROUTES repo-specific-removal', '#beta'],
    ['members no-consumer-counterpart', 'm:m-one'],
    ['r10, frontmatter re-pointed — C18 clause 5, re-pointed-entry', 'fm:tools[x]'],
  ])('FU11 (%s): a first signature on a listed row → pass', (_n, k) => {
    const [repo, base] = repoWith();
    sign(repo, k);
    commit(repo, `First signature ${k} (kenya)`, ['Agent: kenya']);
    const r = ci(repo, base);
    expect(r.findings).toEqual([]);
    expect(r.ok).toBe(true);
    expect(r.rowsChecked).toBe(1);
  });

  // ------------------------------------------------------------------ out of bound
  test('FU12: a first signature on a `retained` row (r5) → fail, link 1 only, naming the row', () => {
    const [repo, base] = repoWith();
    sign(repo, '#epsilon');
    commit(repo, 'First signature #epsilon (kenya)', ['Agent: kenya']);
    const r = ci(repo, base);
    expect(r.ok).toBe(false);
    expect(links(r)).toEqual([1]);
    expect(r.findings[0].message).toMatch(NEITHER);
    expect(r.findings[0].row).toBe(`${DISP}#epsilon`);
  });

  test.each([
    ['r3, CLEARS', '#gamma'],
    ['r4, INAPPLICABLE', '#delta'],
    ['r11, retained frontmatter', 'fm:model'],
  ])('FU13 (%s): a first signature on an unrouted row → fail, link 1', (_n, k) => {
    const [repo, base] = repoWith();
    sign(repo, k);
    commit(repo, `First signature ${k} (kenya)`, ['Agent: kenya']);
    const r = ci(repo, base);
    expect(r.ok).toBe(false);
    expect(links(r)).toEqual([1]);
    expect(r.findings[0].message).toMatch(NEITHER);
  });

  test('FU14: one commit adds a row and signs it (row absent at the parent) → links [1, 2]', () => {
    const [repo, base] = repoWith(); // FULL_TABLE: #mu has no row
    const sig = signatureFor('body', '#mu', 'fresh');
    const lines = read(repo, DISP).split('\n');
    lines.splice(lines.indexOf('frontmatter:'), 0, `  "#mu": ${JSON.stringify({ disposition: 'no-consumer-counterpart', cites: 'subtraction-3', signature: sig })}`);
    write(repo, DISP, lines.join('\n'));
    write(repo, SHEET, read(repo, SHEET) + sheetBlock('body', '#mu', sig));
    commit(repo, 'Add and sign #mu', ['Agent: kenya']);
    const r = ci(repo, base);
    expect(r.ok).toBe(false);
    expect(links(r)).toEqual([1, 2]);
    expect(r.findings.find((f) => f.link === 1)!.message).toMatch(NEITHER);
  });

  test('FU15: a first signature on an orphan key (r17) → fail, link 1', () => {
    const [repo, base] = repoWith();
    sign(repo, '#gone');
    commit(repo, 'First signature #gone (kenya)', ['Agent: kenya']);
    const r = ci(repo, base);
    expect(r.ok).toBe(false);
    expect(links(r)).toEqual([1]);
    expect(r.findings[0].message).toMatch(NEITHER);
  });

  // ------------------------------------------------------------------ composition with the stale clause
  test('FU16: A first-signs a listed row; B re-signs it with hashes unchanged → only B fails, the F5 message unchanged', () => {
    const [repo, base] = repoWith();
    sign(repo, '#alpha');
    const a = commit(repo, 'First signature #alpha (kenya)', ['Agent: kenya']);
    editRow(repo, DISP, '#alpha', (row) => ({ ...row, signature: { ...(row.signature as object), assent: { surviving: ['alpha-1'] } } }));
    editSheet(repo, SHEET, '#alpha', { append: '**Re-sign: ASSENT, 1 surviving.**' });
    const b = commit(repo, 'Re-sign #alpha, hashes unchanged', ['Agent: kenya']);
    const r = ci(repo, base);
    expect(r.rowsChecked).toBe(2);
    expect(r.findings.every((f) => f.sha === b)).toBe(true);
    expect(r.findings.some((f) => f.sha === a)).toBe(false);
    expect(links(r)).toEqual([1]);
    expect(r.findings[0].message).toMatch(/not on the stale list \(F5\)/);
  });

  test('FU17: first signature; an authoring commit moves the unit; a re-sign with moved hashes → all pass', () => {
    const [repo, base] = repoWith();
    sign(repo, '#alpha');
    commit(repo, 'First signature #alpha (kenya)', ['Agent: kenya']);
    write(repo, 'canonical/agents/kenya.md', read(repo, 'canonical/agents/kenya.md').replace('Alpha rule 4 applies here.', 'Alpha rule 4 applies here, amended.'));
    commit(repo, 'Canonical edit to #alpha (authoring)', ['Agent: thurgood']);
    editRow(repo, DISP, '#alpha', (row) => ({ ...row, signature: { ...(row.signature as object), canonicalHash: hash('alpha-moved') } }));
    editSheet(repo, SHEET, '#alpha', { canonicalHash: hash('alpha-moved') });
    commit(repo, 'Re-sign #alpha (kenya)', ['Agent: kenya']);
    const r = ci(repo, base);
    expect(r.findings).toEqual([]);
    expect(r.rowsChecked).toBe(2);
  });

  test('FU18: a first signature that is a refusal; then a re-disposition and a re-sign → both acts pass', () => {
    const [repo, base] = repoWith();
    sign(repo, '#alpha', { state: 'refuse' });
    commit(repo, 'Refuse #alpha (kenya)', ['Agent: kenya']);
    editRow(repo, DISP, '#alpha', (row) => ({ ...row, removals: [{ text: 'Alpha rule 2 applies here.', cites: 'subtraction-1' }] }));
    commit(repo, 'Re-dispose #alpha after the refusal (authoring)', ['Agent: thurgood']);
    editRow(repo, DISP, '#alpha', (row) => {
      const { refuse: _r, ...rest } = row.signature as Record<string, unknown>;
      return { ...row, signature: { ...rest, renderedHash: hash('alpha-r2'), assent: { surviving: [] } } };
    });
    editSheet(repo, SHEET, '#alpha', { renderedHash: hash('alpha-r2'), append: '**Re-sign: ASSENT.**' });
    commit(repo, 'Re-sign #alpha (kenya)', ['Agent: kenya']);
    // The re-disposition re-renders #alpha, so the re-sign's row is stale at its first parent
    // (link 1 by list membership, shape-review ballot item 4); T-UR's constant oracle cannot show that.
    const r = ci(repo, base, STUB_SWEEP, RG_RERENDER);
    expect(r.findings).toEqual([]);
    expect(r.rowsChecked).toBe(2);
  });

  test.each([
    ['trailer ≠ c1Seat', { signer: 'kenya' }, 'data'],
    ['signer field ≠ c1Seat', { signer: 'data' }, 'kenya'],
  ])('FU19 (%s): a first signature on a listed row by the wrong seat → fail on links 2/3, never link 1', (_n, o, trailer) => {
    const [repo, base] = repoWith();
    sign(repo, '#alpha', o);
    commit(repo, 'First signature #alpha (wrong seat)', [`Agent: ${trailer}`]);
    const r = ci(repo, base);
    expect(r.ok).toBe(false);
    expect(links(r).length).toBeGreaterThan(0);
    expect(links(r).every((l) => l === 2 || l === 3)).toBe(true);
  });

  test('FU20: a seat branch cut from base first-signs a listed row; merged --no-ff into pr → pass', () => {
    const [repo, base] = repoWith();
    g(repo, ['switch', '-q', '-c', 'seat']);
    sign(repo, '#zeta');
    commit(repo, 'First signature #zeta (kenya)', ['Agent: kenya']);
    g(repo, ['switch', '-q', 'pr']);
    g(repo, ['merge', '-q', '--no-ff', 'seat', '-m', 'Merge seat']);
    const r = ci(repo, base);
    expect(r.findings).toEqual([]);
    expect(r.rowsChecked).toBe(1);
  });

  test('FU21: main gains the routed row after pr was cut; pr merges main, then the seat first-signs → pass', () => {
    const [repo, base] = repoWith();
    g(repo, ['switch', '-q', 'main']);
    editRow(repo, DISP, '#epsilon', () => ({ disposition: 'no-consumer-counterpart', cites: 'subtraction-3' }));
    commit(repo, 'Route #epsilon (authoring, on main)', ['Agent: thurgood']);
    g(repo, ['switch', '-q', 'pr']);
    g(repo, ['merge', '-q', '--no-ff', 'main', '-m', 'Merge main']);
    sign(repo, '#epsilon');
    commit(repo, 'First signature #epsilon (kenya)', ['Agent: kenya']);
    const r = ci(repo, base);
    expect(r.findings).toEqual([]);
    expect(r.rowsChecked).toBe(1);
  });

  // ------------------------------------------------------------------ the real sweep in --ci
  test('FU22: real sweep, list-consistent tree: after the first signature the head\'s block reads 0 while --ci passes', () => {
    const [repo] = repoWith({ rows: { '#alpha': { disposition: 're-pointed', keep: 1 } } });
    g(repo, ['rm', '-q', SHARED_DISP, 'canonical/shared/shared-catalog.yaml']);
    commit(repo, 'drop the shared fixture (this tree carries kenya only)', []);
    const cut = head(repo);
    sign(repo, '#alpha');
    commit(repo, 'First signature #alpha (kenya)', ['Agent: kenya']);
    const r = ci(repo, cut, realSweep);
    expect(r.lines).toContain('unsigned-routed: 0 row(s)');
    expect(r.findings).toEqual([]);
    expect(r.sweepOk).toBe(true);
    expect(r.ok).toBe(true);
    expect(r.rowsChecked).toBe(1);
  });

  test('FU23: a routed row still unsigned at head is information, never a --ci failure', () => {
    const [repo] = repoWith({ rows: { '#alpha': { disposition: 're-pointed', keep: 1 }, '#zeta': { disposition: 'no-consumer-counterpart' } } });
    g(repo, ['rm', '-q', SHARED_DISP, 'canonical/shared/shared-catalog.yaml']);
    commit(repo, 'drop the shared fixture', []);
    const cut = head(repo);
    sign(repo, '#alpha');
    commit(repo, 'First signature #alpha (kenya)', ['Agent: kenya']);
    const r = ci(repo, cut, realSweep);
    expect(r.ok).toBe(true);
    expect(r.lines).toContain('unsigned-routed: 1 row(s)');
    expect(r.lines).toContain(`  ${DISP}#zeta — no-consumer-counterpart`);
    expect(r.findings).toEqual([]);
  });

  // ------------------------------------------------------------------ fail-closed (FU33, FU34; Stacy's review)
  const UNDECIDABLE = /^first signature: the unsigned-routed list at the commit's first parent \S+ is undecidable — .+; a missing link is never green$/;
  /** Break a file on `pr` in its own commit (the parent of the signing commit), then first-sign #zeta. */
  function brokenParent(mutate: (repo: string) => void): CiResult {
    const [repo, base] = repoWith();
    mutate(repo);
    commit(repo, 'break an input (authoring)', ['Agent: thurgood']);
    sign(repo, '#zeta');
    commit(repo, 'First signature #zeta (kenya)', ['Agent: kenya']);
    return ci(repo, base);
  }

  test.each([
    ['the shared catalog unparseable', (repo: string) => write(repo, 'canonical/shared/shared-catalog.yaml', 'members: [unclosed\n')],
    ['an operative-set record unparseable', (repo: string) => write(repo, 'canonical/operative-sets/broken.yaml', 'units: [unclosed\n')],
    ["the row's canonical source absent", (repo: string) => g(repo, ['rm', '-q', 'canonical/agents/kenya.md'])],
  ])('FU33 (%s at the first-parent tree): a first signature on a listed row → link 1 FAILS undecidable, never a silent pass', (_n, mutate) => {
    const r = brokenParent(mutate);
    expect(r.ok).toBe(false);
    const l1 = r.findings.filter((f) => f.link === 1);
    expect(l1).toHaveLength(1);
    expect(l1[0].row).toBe(`${DISP}#zeta`);
    expect(l1[0].message).toMatch(UNDECIDABLE);
  });

  test("FU33 (the row's own dispositions file unparseable at the first parent): no act can be confined → fails (link 2), never a silent pass", () => {
    const [repo, base] = repoWith();
    const good = read(repo, DISP);
    write(repo, DISP, `${good}\n  "#broken": {unclosed\n`);
    commit(repo, 'break the dispositions file (authoring)', ['Agent: thurgood']);
    write(repo, DISP, good);
    sign(repo, '#zeta');
    commit(repo, 'First signature #zeta (kenya)', ['Agent: kenya']);
    const r = ci(repo, base);
    expect(r.ok).toBe(false);
    expect(r.findings.some((f) => f.link === 2 && /YAML does not parse/.test(f.message))).toBe(true);
  });

  test('FU34: an error in a DIFFERENT dispositions file at the first parent does not fail this row', () => {
    const r = brokenParent((repo) => write(repo, 'canonical/profiles/consumer/other.dispositions.yaml', 'source: canonical/agents/other.md\nbody: {unclosed\n'));
    expect(r.findings).toEqual([]);
    expect(r.ok).toBe(true);
    expect(r.rowsChecked).toBe(1);
  });

  test('FU33 (root commit, no first parent): a first signature in a root commit → link 1 fails (nothing is listed before the tree exists)', () => {
    const [repo, base] = repoWith();
    g(repo, ['switch', '-q', '--orphan', 'rooted']); // an empty tree: the root commit writes T-UR and the signature at once
    for (const [rel, text] of Object.entries(treeFiles(FULL_TABLE))) write(repo, rel, text);
    sign(repo, '#zeta');
    commit(repo, 'Root: tree + first signature #zeta', ['Agent: kenya']);
    const r = ci(repo, base);
    expect(r.ok).toBe(false);
    const l1 = r.findings.filter((f) => f.link === 1 && f.row === `${DISP}#zeta`);
    expect(l1).toHaveLength(1);
    expect(l1[0].message).toMatch(/neither the stale list nor the unsigned-routed list at the commit's first parent \(none — root commit\)/);
  });

  // ------------------------------------------------------------------ pinned current behavior (forks 3, 4)
  // FU24 was "both pass, as today", pinned until fork 3 was ruled. Ruled by ballot
  // 2026-11-08-signing-act-shape-review § 2a (Peter, 2026-11-08T17:45:34Z): a first act carries its
  // pinned object and its sheet section in one commit; a section committed alone is a re-act on a
  // fresh row and fails link 1 (fixture X1; the 7eb517fca shape).
  test('FU24 (fork 3, ruled — X1): A signs the dispositions row; B adds its sheet section alone → the sheet commit fails link 1', () => {
    const [repo, base] = repoWith();
    sign(repo, '#alpha', { sheet: false });
    commit(repo, 'First signature #alpha, row only (kenya)', ['Agent: kenya']);
    sign(repo, '#alpha', { row: false });
    const sheetSha = commit(repo, 'Sheet section for #alpha (kenya)', ['Agent: kenya']);
    const r = ci(repo, base);
    expect(links(r)).toEqual([1]);
    expect(r.findings).toHaveLength(1);
    expect(r.findings[0].sha).toBe(sheetSha);
    expect(r.findings[0].message).toMatch(/^re-sign on a row on none of its kind's lists at the commit's first parent/);
    expect(r.rowsChecked).toBe(2);
  });

  // FU25 was "passes link 1 today; pinned until ruled" (fork 4). Ruled by ballot
  // 2026-11-08-signing-act-shape-review items 3–4: a withdrawal on a fresh row is on none of its
  // kind's lists and fails link 1 (fixture W1).
  test('FU25 (fork 4, ruled — W1): deleting a fresh signature with no re-disposition fails link 1', () => {
    const [repo, base] = repoWith();
    editRow(repo, DISP, '#theta', (row) => {
      const { signature: _s, ...rest } = row;
      return rest;
    });
    commit(repo, 'Delete #theta signature', ['Agent: kenya']);
    const r = ci(repo, base);
    expect(links(r)).toContain(1);
    expect(r.findings.find((f) => f.link === 1)?.message).toMatch(/^withdraw on a row on none of its kind's lists .* \(on: none; in bound: stale, orphaned, signed-unrouted\)/);
  });

  test('FU26b (fixture form): one commit, two first signatures — one listed, one retained → only the retained row fails link 1', () => {
    const [repo, base] = repoWith();
    sign(repo, '#zeta');
    sign(repo, '#epsilon');
    commit(repo, 'First signatures #zeta + #epsilon (kenya)', ['Agent: kenya']);
    const r = ci(repo, base);
    expect(r.rowsChecked).toBe(2);
    expect(r.findings.map((f) => [f.link, f.row])).toEqual([[1, `${DISP}#epsilon`]]);
  });
});

