/**
 * verify-signing-chain.census-routed.test.ts — the census mode `--census-routed [--at <sha>]`
 * (ballot 2026-10-19-instrument-census-at-draft; register `signing-act-consistency`, field `census`).
 *
 * The mode prints `freshness.ts` `routedCensus`: one sorted line per dispositions row
 * (`<rowId>\t<routed: label | not-routed>\t<signed|unsigned>\t<signer | ->`), then a count line.
 * The pinned digest is the census at `main`'s `b42874bd0` (the corpus Stacy reproduced at R1 of
 * ballot 2026-10-21-routes-floor-re-pointed-frontmatter-members). Since that ballot's application
 * (C18 clause 5, `routesEntry`) the pin is the ballot's PROPOSED digest `0f5c5144…` (388 routed,
 * 19 unsigned-routed): the shipped code reproduces the ratified scratch diff's output on that tree,
 * and the pre-clause digest `b423eae8…` (360 routed) is the history. The pin reads a committed tree,
 * so it never moves with the live profile. Where that commit is absent (a shallow checkout), it is
 * skipped by name, never silently.
 */

import { execFileSync } from 'child_process';
import * as crypto from 'crypto';
import * as path from 'path';
import { main } from '../regrounding/verify-signing-chain';
import { cleanupTmp, commit, g, tmp, write } from './fixtures/signing-chain/helpers';
import { FULL_TABLE, treeFiles } from './fixtures/unsigned-routed/build';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const MAIN_SHA = 'b42874bd0';
const MAIN_DIGEST = '0f5c514495cb293accd3ac79a65196cf6c66f83be85a18d1b1cbd8e940573204';

afterAll(() => cleanupTmp());

function run(argv: string[], cwd: string): { code: number; out: string[]; err: string[] } {
  const out: string[] = [];
  const err: string[] = [];
  const log = jest.spyOn(console, 'log').mockImplementation((...a: unknown[]) => void out.push(a.join(' ')));
  const error = jest.spyOn(console, 'error').mockImplementation((...a: unknown[]) => void err.push(a.join(' ')));
  try {
    return { code: main(argv, cwd), out, err };
  } finally {
    log.mockRestore();
    error.mockRestore();
  }
}
const digest = (lines: string[]): string => crypto.createHash('sha256').update(`${lines.join('\n')}\n`).digest('hex');
const hasCommit = (sha: string): boolean => {
  try {
    execFileSync('git', ['cat-file', '-e', `${sha}^{commit}`], { cwd: REPO_ROOT, stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
};

describe('verify-signing-chain --census-routed', () => {
  test('over T-UR: one sorted line per row with routedPopulation\'s verdict, then the count line; exit 0', () => {
    const repo = tmp('census');
    g(repo, ['init', '-q', '-b', 'main']);
    g(repo, ['config', 'commit.gpgsign', 'false']);
    for (const [rel, text] of Object.entries(treeFiles(FULL_TABLE))) write(repo, rel, text);
    commit(repo, 'base: T-UR', []);
    const r = run(['--census-routed'], repo);
    expect(r.code).toBe(0);
    const rows = r.out.slice(0, -1);
    expect(rows).toEqual([...rows].sort());
    const D = 'canonical/profiles/consumer/kenya.dispositions.yaml';
    expect(rows).toContain(`${D}#alpha\trouted: re-pointed: below-half\tunsigned\tkenya`);
    expect(rows).toContain(`${D}#gamma\tnot-routed\tunsigned\t-`);
    expect(rows).toContain(`${D}#iota\trouted: no-consumer-counterpart\tsigned\tkenya`);
    expect(rows).toContain(`${D}#gone\tnot-routed\tunsigned\t-`); // an orphan: listed, never routed
    expect(rows).toContain(`${D}#frontmatter:tools[x]\trouted: re-pointed: re-pointed-entry\tunsigned\tkenya`); // C18 clause 5
    expect(rows).toContain(`${D}#frontmatter:model\tnot-routed\tunsigned\t-`); // a retained entry is not routed
    expect(r.out[r.out.length - 1]).toBe(`${rows.length} rows; 10 routed; 7 unsigned-routed; errors 0`);
    // --at reads the committed tree: the same bytes for a clean checkout.
    expect(run(['--census-routed', '--at', 'HEAD'], repo).out).toEqual(r.out);
  });

  (hasCommit(MAIN_SHA) ? test : test.skip)(`pinned: the census at main ${MAIN_SHA} digests to ${MAIN_DIGEST.slice(0, 12)}… (1089 rows; 388 routed; 19 unsigned-routed) — skipped by name when the commit is absent (shallow checkout)`, () => {
    const r = run(['--census-routed', '--at', MAIN_SHA], REPO_ROOT);
    expect(r.code).toBe(0);
    expect(r.out[r.out.length - 1]).toBe('1089 rows; 388 routed; 19 unsigned-routed; errors 0');
    expect(digest(r.out)).toBe(MAIN_DIGEST);
  }, 60_000);

  test('--at naming no commit → exit 2, nothing printed', () => {
    const r = run(['--census-routed', '--at', 'no-such-ref-xyz'], REPO_ROOT);
    expect(r.code).toBe(2);
    expect(r.out).toEqual([]);
    expect(r.err.join('\n')).toMatch(/--at no-such-ref-xyz does not resolve to a commit/);
  });
});
