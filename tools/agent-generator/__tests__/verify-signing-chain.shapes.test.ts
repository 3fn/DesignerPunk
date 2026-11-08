/**
 * verify-signing-chain.shapes.test.ts — `--ci` link 1 by list membership at the act's first parent,
 * the closed act kinds, withdrawal in bound, one sheet section per key, and the link-1 census mode
 * (ballot `.kiro/docs/ballots/2026-11-08-signing-act-shape-review.md`, RATIFIED Peter
 * 2026-11-08T17:45:34Z; § 2a, items 1–4, site 4c; application PR 1).
 *
 * Fixtures W1–W7, S1–S3, A1, X1 and K1: specified by Stacy (that ballot § 4, with her R1 § 3 and
 * R2 additions), built by Thurgood. R1 and R2 (link 7) are in verify-signing-chain.audit.test.ts.
 * D1 (F-4 (a)'s pin) is application PR 2's.
 *
 * Each fixture is the T-UR tree (`fixtures/unsigned-routed/build.ts`) committed into a throwaway
 * repository on `main`, then branch `pr`. T-UR has no consumer rendering: link 1's lists (freshness.ts
 * `listsAt`, the sweep itself over the first parent's tree) read the rendered hash from an oracle —
 * T-UR's {@link RENDERED}, or, for the S cases, a committed fixture file standing in for the
 * committed regeneration. "link" verdicts are `walkRange`'s at the act's commit (the sweep stubbed);
 * "range" verdicts are `--ci` over a range whose head is final (W7 runs the real sweep).
 */

import * as fs from 'fs';
import * as path from 'path';
import { listsAt, runFreshnessSweep, formatFreshness } from '../regrounding/freshness';
import { link1CensusLines, runCi, type CiResult, type Regrounding } from '../regrounding/verify-signing-chain';
import { cleanupTmp, commit, editRow, editSheet, g, hash, head, read, RG, tmp, write } from './fixtures/signing-chain/helpers';
import { allFiles, CHARTER, DISP, NOTE, OVERLAY, RECORD, RENDERED, SHEET, signatureFor, sheetBlock, treeFiles, STACY_TABLE, type RowState, type TreeSpec } from './fixtures/unsigned-routed/build';

afterAll(() => cleanupTmp());

const STUB_SWEEP = (): { pass: boolean; lines: string[] } => ({ pass: true, lines: ['operative-set-freshness: PASS (fixture stub)'] });
const SHARED_DISP = 'canonical/profiles/consumer/_shared.dispositions.yaml';
const SIGNED_ZETA: RowState = { disposition: 'no-consumer-counterpart', sig: 'fresh' };
const THETA = STACY_TABLE['#theta'] as RowState; // re-pointed, ROUTES, signed fresh

/** The rendered-hash oracle of a tree: T-UR's constant, unless a committed fixture map overrides a row (the S cases' "regeneration"). */
const RENDER_MAP = 'canonical/_consumer-output/fixture-rendered.json';
const oracle =
  (read: (rel: string) => string | undefined) =>
  (file: string, section: string, key: string): string => {
    const map = JSON.parse(read(RENDER_MAP) ?? '{}') as Record<string, string>;
    return map[`${section}:${key}`] ?? RENDERED(file, section, key);
  };
const RG_T: Regrounding = { ...RG, listsAt: (read, files) => listsAt(read, files, { renderedHash: oracle(read) }) };

function repoWith(spec: TreeSpec): [string, string] {
  const repo = tmp('shape-repo');
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
const ci = (repo: string, base: string, sweep: ((root: string) => { pass: boolean; lines: string[] }) | null = STUB_SWEEP): CiResult => runCi({ repo, base, head: 'HEAD', rg: RG_T, sweep });
const realSweep = (root: string): { pass: boolean; lines: string[] } => {
  const report = runFreshnessSweep(root, { tracked: allFiles(root), renderedHash: RENDERED });
  return { pass: report.findings.length === 0, lines: formatFreshness(report) };
};
const link1 = (r: CiResult, sha?: string): string[] => r.findings.filter((f) => f.link === 1 && (sha === undefined || f.sha === sha)).map((f) => f.message);
const links = (r: CiResult): number[] => [...new Set(r.findings.map((f) => f.link))].sort();

// ------------------------------------------------------------------ the acts, in the § 2a forms

/** Withdraw a signature in the ledger form: the `signature` removed, the section kept with a `withdrawn:` line. */
function withdraw(repo: string, key: string, o: { removeSection?: boolean } = {}): void {
  editRow(repo, DISP, key, (row) => {
    const { signature: _s, ...rest } = row;
    return rest;
  });
  if (o.removeSection) {
    const parts = read(repo, SHEET).split(/^(?=## )/m);
    write(repo, SHEET, parts.filter((p) => !p.startsWith(`## \`${key}\``)).join(''));
  } else editSheet(repo, SHEET, key, { append: 'withdrawn: 2026-11-08 — fixture withdrawal' });
}
/** Restore a fresh signature on `key`, writing into the kept section (§ 2a, "One section per key"). */
function signIntoKept(repo: string, key: string): void {
  const sig = signatureFor('body', key, 'fresh');
  editRow(repo, DISP, key, (row) => ({ ...row, signature: sig }));
  editSheet(repo, SHEET, key, { append: '**Signed 2026-11-08: ASSENT** (written into the kept section).' });
}
/** Rename a charter heading (authoring): the old anchor's rows and record unit become orphaned. */
function rename(repo: string, from: string, to: string): void {
  write(repo, CHARTER, read(repo, CHARTER).replace(`## ${from}\n`, `## ${to}\n`));
}
/** A record unit's `canonicalHash` removed, its note section kept with a `withdrawn:` line. */
function withdrawUnit(repo: string, anchor: string): string {
  const lines = read(repo, RECORD).split('\n');
  const i = lines.indexOf(`  ${JSON.stringify(anchor)}:`);
  if (i < 0 || !lines[i + 1].startsWith('    canonicalHash: ')) throw new Error(`unit ${anchor} not in ${RECORD}`);
  const pin = lines[i + 1];
  lines.splice(i + 1, 1);
  write(repo, RECORD, lines.join('\n'));
  editSheet(repo, NOTE, anchor, { append: 'withdrawn: 2026-11-08 — fixture withdrawal' });
  return pin;
}
function restoreUnit(repo: string, anchor: string, pinLine: string): void {
  const lines = read(repo, RECORD).split('\n');
  const i = lines.indexOf(`  ${JSON.stringify(anchor)}:`);
  lines.splice(i + 1, 0, pinLine);
  write(repo, RECORD, lines.join('\n'));
  editSheet(repo, NOTE, anchor, { append: 'Re-confirmed 2026-11-08 (written into the kept section).' });
}

const ZETA = { rows: { '#zeta': SIGNED_ZETA } } as TreeSpec;
const WITHDRAW_NONE = /^withdraw on a row on none of its kind's lists .* \(on: none; in bound: stale, orphaned, signed-unrouted\)/;

describe('shape review — withdrawal (§ 2a; items 3–4)', () => {
  test('W1 (link): `withdraw` on a fresh row → FAIL 1 (it passed before the shape review)', () => {
    const [repo, base] = repoWith({ rows: { '#theta': THETA } });
    withdraw(repo, '#theta');
    commit(repo, 'Withdraw #theta (kenya)', ['Agent: kenya']);
    const r = ci(repo, base);
    expect(links(r)).toEqual([1]);
    expect(link1(r)[0]).toMatch(WITHDRAW_NONE);
  });

  test('W1b (range): `withdraw` on a fresh row, then `sign` with the same hashes → FAIL 1 at the withdrawal only', () => {
    const [repo, base] = repoWith({ rows: { '#theta': THETA } });
    withdraw(repo, '#theta');
    const w = commit(repo, 'Withdraw #theta (kenya)', ['Agent: kenya']);
    signIntoKept(repo, '#theta');
    const s = commit(repo, 'Sign #theta again, same hashes (kenya)', ['Agent: kenya']);
    const r = ci(repo, base);
    expect(link1(r, w)).toHaveLength(1);
    expect(link1(r, s)).toEqual([]);
    expect(r.rowsChecked).toBe(2);
  });

  test('W2 (link): `withdraw` on an orphaned row (the v3 shape) → PASS; controls: rename in the same commit → FAIL 2; re-key then `sign` → PASS', () => {
    const [repo, base] = repoWith(ZETA);
    rename(repo, 'Zeta', 'Zeta Renamed');
    commit(repo, 'Rename the Zeta heading (authoring)', ['Agent: thurgood']);
    withdraw(repo, '#zeta');
    commit(repo, 'Withdraw #zeta (kenya)', ['Agent: kenya']);
    expect(ci(repo, base).findings).toEqual([]);
    // Re-key (authoring): the unsigned old row out, a row for the new anchor in; then a first signature.
    editRow(repo, DISP, '#zeta', () => undefined);
    write(repo, DISP, read(repo, DISP).replace('frontmatter:\n', `  "#zeta-renamed": ${JSON.stringify({ disposition: 'no-consumer-counterpart', cites: 'subtraction-3' })}\nfrontmatter:\n`));
    commit(repo, 'Re-key #zeta → #zeta-renamed (authoring)', ['Agent: thurgood']);
    const sig = signatureFor('body', '#zeta-renamed', 'fresh');
    editRow(repo, DISP, '#zeta-renamed', (row) => ({ ...row, signature: sig }));
    write(repo, SHEET, read(repo, SHEET) + sheetBlock('body', '#zeta-renamed', sig));
    commit(repo, 'First signature #zeta-renamed (kenya)', ['Agent: kenya']);
    const r = ci(repo, base);
    expect(r.findings).toEqual([]);
    expect(r.rowsChecked).toBe(2);
  });

  test('W2 control: the rename and the withdrawal in one commit → FAIL 2 (authoring in a signing commit)', () => {
    const [repo, base] = repoWith(ZETA);
    rename(repo, 'Zeta', 'Zeta Renamed');
    withdraw(repo, '#zeta');
    commit(repo, 'Rename and withdraw #zeta (kenya)', ['Agent: kenya']);
    expect(links(ci(repo, base))).toContain(2);
  });

  test('W3 (link): `withdraw` on a stale row → PASS', () => {
    const [repo, base] = repoWith({ rows: { '#iota': STACY_TABLE['#iota'] as RowState } });
    withdraw(repo, '#iota');
    commit(repo, 'Withdraw #iota (kenya)', ['Agent: kenya']);
    expect(ci(repo, base).findings).toEqual([]);
  });

  test('W4 (link): `withdraw` on a signed-unrouted row (re-disposed to `retained` at the first parent) → PASS; control: before the re-disposition → FAIL 1', () => {
    const [repo, base] = repoWith(ZETA);
    editRow(repo, DISP, '#zeta', (row) => ({ disposition: 'retained', signature: row.signature }));
    commit(repo, 'Re-dispose #zeta to retained (authoring)', ['Agent: thurgood']);
    withdraw(repo, '#zeta');
    commit(repo, 'Withdraw #zeta (kenya)', ['Agent: kenya']);
    expect(ci(repo, base).findings).toEqual([]);

    const [repo2, base2] = repoWith(ZETA);
    withdraw(repo2, '#zeta');
    commit(repo2, 'Withdraw #zeta before its re-disposition (kenya)', ['Agent: kenya']);
    const r2 = ci(repo2, base2);
    expect(links(r2)).toEqual([1]);
    expect(link1(r2)[0]).toMatch(WITHDRAW_NONE);
  });

  test('W5a / W5b (link): a record unit withdrawn — on an orphaned unit → PASS; on a fresh unit → FAIL 1', () => {
    const [repo, base] = repoWith({});
    rename(repo, 'Zeta', 'Zeta Renamed');
    commit(repo, 'Rename the Zeta heading (authoring)', ['Agent: thurgood']);
    withdrawUnit(repo, '#zeta');
    commit(repo, 'Withdraw the #zeta confirmation (kenya)', ['Agent: kenya']);
    expect(ci(repo, base).findings).toEqual([]);

    const [repo2, base2] = repoWith({});
    withdrawUnit(repo2, '#alpha');
    commit(repo2, 'Withdraw the #alpha confirmation (kenya)', ['Agent: kenya']);
    const r2 = ci(repo2, base2);
    expect(links(r2)).toEqual([1]);
    expect(link1(r2)[0]).toMatch(WITHDRAW_NONE);
  });

  test('W5c (range): a fresh unit withdrawn, then put back with the same hash → FAIL 1 at the withdrawal only', () => {
    const [repo, base] = repoWith({});
    const pin = withdrawUnit(repo, '#alpha');
    const w = commit(repo, 'Withdraw the #alpha confirmation (kenya)', ['Agent: kenya']);
    restoreUnit(repo, '#alpha', pin);
    const c = commit(repo, 'Confirm #alpha again, same hash (kenya)', ['Agent: kenya']);
    const r = ci(repo, base);
    expect(link1(r, w)).toHaveLength(1);
    expect(link1(r, c)).toEqual([]);
  });

  test('W6 (link): the ledger form, exactly as at 2f63d2708 and 17cf39eac, reads `withdraw`; a variant removing the section reads `withdraw` too; on a fresh row → FAIL 1', () => {
    for (const removeSection of [false, true]) {
      const [repo, base] = repoWith(ZETA);
      rename(repo, 'Zeta', 'Zeta Renamed');
      commit(repo, 'Rename the Zeta heading (authoring)', ['Agent: thurgood']);
      withdraw(repo, '#zeta', { removeSection });
      const sha = commit(repo, 'Withdraw #zeta (kenya)', ['Agent: kenya']);
      expect(ci(repo, base).findings).toEqual([]);
      expect(link1CensusLines(repo, base, 'HEAD', RG_T)).toContain(`${sha}\t${DISP}#zeta\twithdraw\torphaned\tPASS`);
    }
    const [repo2, base2] = repoWith(ZETA);
    editRow(repo2, DISP, '#zeta', (row) => ({ disposition: 'retained', signature: row.signature }));
    commit(repo2, 'Re-dispose #zeta to retained (authoring)', ['Agent: thurgood']);
    withdraw(repo2, '#zeta');
    const sha2 = commit(repo2, 'Withdraw #zeta (kenya)', ['Agent: kenya']);
    expect(ci(repo2, base2).findings).toEqual([]);
    expect(link1CensusLines(repo2, base2, 'HEAD', RG_T)).toContain(`${sha2}\t${DISP}#zeta\twithdraw\tsigned-unrouted\tPASS`);

    const [repo3, base3] = repoWith(ZETA);
    withdraw(repo3, '#zeta');
    commit(repo3, 'Withdraw a fresh #zeta (kenya)', ['Agent: kenya']);
    expect(links(ci(repo3, base3))).toEqual([1]);
  });

  test('W7 (range, real sweep): after a ledger withdrawal, a `sign` written into the kept section → PASS; a second section with the same heading → the sweep FAILs (want 1) and FAIL 2', () => {
    const build = (): [string, string] => {
      const [repo, base] = repoWith(ZETA);
      rename(repo, 'Zeta', 'Zeta Renamed');
      commit(repo, 'Rename the Zeta heading (authoring)', ['Agent: thurgood']);
      withdraw(repo, '#zeta');
      commit(repo, 'Withdraw #zeta (kenya)', ['Agent: kenya']);
      rename(repo, 'Zeta Renamed', 'Zeta');
      commit(repo, 'Restore the Zeta heading (authoring)', ['Agent: thurgood']);
      return [repo, base];
    };
    const [repo, base] = build();
    signIntoKept(repo, '#zeta');
    commit(repo, 'Sign #zeta into the kept section (kenya)', ['Agent: kenya']);
    const r = ci(repo, base, realSweep);
    expect(r.findings).toEqual([]);
    expect(r.ok).toBe(true);

    const [repo2, base2] = build();
    const sig = signatureFor('body', '#zeta', 'fresh');
    editRow(repo2, DISP, '#zeta', (row) => ({ ...row, signature: sig }));
    write(repo2, SHEET, read(repo2, SHEET) + sheetBlock('body', '#zeta', sig));
    commit(repo2, 'Sign #zeta into a second section (kenya)', ['Agent: kenya']);
    const r2 = ci(repo2, base2, realSweep);
    expect(r2.sweepOk).toBe(false);
    expect(r2.lines.some((l) => /evidence resolves to 2 note blocks .* \(want 1\)/.test(l))).toBe(true);
    expect(links(r2)).toContain(2);
  });
});

describe('shape review — re-signs and the ordering (§ 2a; items 4–5)', () => {
  const resignTheta = (repo: string, rendered: string): void => {
    editRow(repo, DISP, '#theta', (row) => ({ ...row, signature: { ...(row.signature as object), renderedHash: rendered } }));
    editSheet(repo, SHEET, '#theta', { renderedHash: rendered, append: '**Re-signed 2026-11-08: ASSENT.**' });
  };
  const overlayEdit = (repo: string): void => {
    write(repo, OVERLAY, read(repo, OVERLAY).replace('Theta rule 1 applies here.', 'Theta rule 1 applies here, re-grounded.'));
  };
  const regenerate = (repo: string, rendered: string): void => write(repo, RENDER_MAP, `${JSON.stringify({ 'body:#theta': rendered })}\n`);

  test('S1 (link): `re-sign` after an overlay-only change, the regeneration committed AFTER the re-sign → FAIL 1 (it passed before, on hash movement)', () => {
    const [repo, base] = repoWith({ rows: { '#theta': THETA } });
    overlayEdit(repo);
    commit(repo, 'Overlay edit for #theta (authoring)', ['Agent: thurgood']);
    resignTheta(repo, hash('theta-r2'));
    const s = commit(repo, 'Re-sign #theta (kenya)', ['Agent: kenya']);
    regenerate(repo, hash('theta-r2'));
    commit(repo, 'Regenerate the consumer output (authoring)', ['Agent: lina']);
    const r = ci(repo, base);
    expect(link1(r, s)).toHaveLength(1);
    expect(link1(r, s)[0]).toMatch(/^re-sign on a row on none of its kind's lists .* \(on: none; in bound: stale\)/);
  });

  test('S2 (link): the same, the regeneration committed BEFORE the re-sign → PASS (control)', () => {
    const [repo, base] = repoWith({ rows: { '#theta': THETA } });
    overlayEdit(repo);
    commit(repo, 'Overlay edit for #theta (authoring)', ['Agent: thurgood']);
    regenerate(repo, hash('theta-r2'));
    commit(repo, 'Regenerate the consumer output (authoring)', ['Agent: lina']);
    resignTheta(repo, hash('theta-r2'));
    commit(repo, 'Re-sign #theta (kenya)', ['Agent: kenya']);
    expect(ci(repo, base).findings).toEqual([]);
  });

  test('S3 (range): the 18.5 transition — re-dispose `re-pointed` → `superseded-by`, regenerate, `re-sign` → PASS', () => {
    const [repo, base] = repoWith({ rows: { '#theta': THETA } });
    editRow(repo, DISP, '#theta', (row) => ({ disposition: 'superseded-by', destination: '#epsilon', cites: 'subtraction-4', signature: row.signature }));
    commit(repo, 'Re-dispose #theta to superseded-by (authoring)', ['Agent: thurgood']);
    regenerate(repo, hash('renders-nothing'));
    commit(repo, 'Regenerate the consumer output (authoring)', ['Agent: lina']);
    resignTheta(repo, hash('renders-nothing'));
    commit(repo, 'Re-sign #theta (kenya)', ['Agent: kenya']);
    const r = ci(repo, base);
    expect(r.findings).toEqual([]);
    expect(link1CensusLines(repo, base, 'HEAD', RG_T).some((l) => /\tre-sign\tstale\tPASS$/.test(l))).toBe(true);
  });

  test('A1 (link): the profile author\'s commit deletes a signed row → FAIL 2 and 3', () => {
    const [repo, base] = repoWith({ rows: { '#theta': THETA } });
    editRow(repo, DISP, '#theta', () => undefined);
    commit(repo, 'Delete the #theta row (authoring)', ['Agent: thurgood']);
    const r = ci(repo, base);
    expect(links(r)).toEqual(expect.arrayContaining([2, 3]));
  });

  test('X1 (range): a first signature split across two commits — the `signature`, then its sheet section → FAIL 1 at the sheet commit; control: both in one commit → PASS', () => {
    const [repo, base] = repoWith({ rows: { '#zeta': { disposition: 'no-consumer-counterpart' } } });
    const sig = signatureFor('body', '#zeta', 'fresh');
    editRow(repo, DISP, '#zeta', (row) => ({ ...row, signature: sig }));
    commit(repo, 'First signature #zeta, row only (kenya)', ['Agent: kenya']);
    write(repo, SHEET, (fs.existsSync(path.join(repo, SHEET)) ? read(repo, SHEET) : '# Signatures — `kenya` (fixture)\n\n') + sheetBlock('body', '#zeta', sig));
    const sheetSha = commit(repo, 'Sheet section for #zeta (kenya)', ['Agent: kenya']);
    const r = ci(repo, base);
    expect(links(r)).toEqual([1]);
    expect(link1(r, sheetSha)).toHaveLength(1);

    const [repo2, base2] = repoWith({ rows: { '#zeta': { disposition: 'no-consumer-counterpart' } } });
    editRow(repo2, DISP, '#zeta', (row) => ({ ...row, signature: sig }));
    write(repo2, SHEET, (fs.existsSync(path.join(repo2, SHEET)) ? read(repo2, SHEET) : '# Signatures — `kenya` (fixture)\n\n') + sheetBlock('body', '#zeta', sig));
    commit(repo2, 'First signature #zeta, row and section (kenya)', ['Agent: kenya']);
    expect(ci(repo2, base2).findings).toEqual([]);
  });
});

describe('shape review — the link-1 census mode (site 4c; K1)', () => {
  test('K1: `--census-link1` prints one line per act with its kind and the lists at the first parent, and its verdicts equal `--ci`\'s', () => {
    const [repo, base] = repoWith({ rows: { '#theta': THETA, '#iota': STACY_TABLE['#iota'] as RowState, '#zeta': { disposition: 'no-consumer-counterpart' } } });
    withdraw(repo, '#theta');
    const w1 = commit(repo, 'Withdraw a fresh #theta (kenya)', ['Agent: kenya']);
    withdraw(repo, '#iota');
    const w3 = commit(repo, 'Withdraw a stale #iota (kenya)', ['Agent: kenya']);
    const sig = signatureFor('body', '#zeta', 'fresh');
    editRow(repo, DISP, '#zeta', (row) => ({ ...row, signature: sig }));
    write(repo, SHEET, read(repo, SHEET) + sheetBlock('body', '#zeta', sig));
    const s = commit(repo, 'First signature #zeta (kenya)', ['Agent: kenya']);
    const lines = link1CensusLines(repo, base, 'HEAD', RG_T);
    expect(lines).toEqual(
      [
        `${w1}\t${DISP}#theta\twithdraw\tnone\tFAIL 1`,
        `${w3}\t${DISP}#iota\twithdraw\tstale\tPASS`,
        `${s}\t${DISP}#zeta\tsign\tunsigned-routed\tPASS`,
      ]
        .sort()
        .concat(['3 act(s); 1 FAIL 1'])
    );
    const r = ci(repo, base);
    expect(r.findings.filter((f) => f.link === 1).map((f) => f.sha)).toEqual([w1]);
  });
});
