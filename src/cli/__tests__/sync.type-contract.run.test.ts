/**
 * @category evergreen
 * @purpose Spec 123 Task 6 — the type contract THROUGH `sync` (design.md DD11; Peter's
 * fork-1 ruling (B), 2026-09-27). The build-side half (the `.d.ts` hash) is
 * `scripts/__tests__/sync.type-contract.test.ts`.
 *
 * When the manifest's `contractHash` differs from the installed package's, `sync`
 * fetches the PREVIOUS version's `dist/name-contract.json` (Task 5's fetcher, her
 * rail) and diffs the members:
 *  - previous A,B → current A,C → "removed: B; added: C" (string-equal to the row);
 *  - a comment-only change (hash moved, members equal) → "no member changes detected";
 *  - offline / fetch failed → `cannot tell`, never silently clean;
 *  - no recorded hash, or a previous version that predates the contract → `no baseline`;
 *  - `contractHash` is re-recorded only when sync WRITES the manifest (report-first,
 *    `--apply` off a terminal).
 */

import * as fs from 'fs';
import * as path from 'path';
import { runSync } from '../sync';
import { MANIFEST_FILE, parseManifest, serializeManifest } from '../sync/Manifest';
import {
  typeContractChangedMessage,
  typeContractNoBaselineMessage,
  typeContractCannotTellMessage,
  NO_MEMBER_CHANGES,
} from '../sync/NameContract';
import type { PackageFetcher } from '../sync/Migration';
import { createScratch, setupPackage, writeFile, readText, dirHash } from './syncTestKit';

/** design.md § "Error Handling" row "type contract changed", transcribed verbatim. */
const DESIGN_ROW = (x: string, y: string) =>
  `the token type contract changed (removed: ${x}; added: ${y}). Run 'npx tsc --noEmit' — fix each file it names; removed members are listed above.`;

const PREV = { hash: 'sha256:prev', members: ['A', 'B'] };
const CUR = { hash: 'sha256:cur', members: ['A', 'C'] };

function contractJson(tc: { hash: string; members: string[] }): string {
  return JSON.stringify({ schemaVersion: 1, referencedNames: [], notChecked: [], typeContract: tc }, null, 2);
}

/** A born consumer at 15.0.0 (manifest records `recordedHash`), upgraded to a 15.1.0 package carrying `current`. */
function consumer(recordedHash: string, current = CUR, installedVersion = '15.0.0') {
  const scratch = createScratch('dp-typecontract-');
  setupPackage(scratch, { version: '15.1.0', tools: null, files: { 'dist/name-contract.json': contractJson(current) } });
  writeFile(
    scratch,
    MANIFEST_FILE,
    serializeManifest({ version: '1', posture: 'born', installedVersion, contractHash: recordedHash, attachedTargets: [], entries: {} }),
  );
  return scratch;
}

/** A fixture fetcher: `previous` is the 15.0.0 package's contract (null = that version predates it; 'offline' = fetch fails). */
function fetcher(_consumer: string, previous: { hash: string; members: string[] } | null | 'offline') {
  const calls: string[] = [];
  const cache = createScratch('dp-typecontract-fetch-'); // outside the consumer repo, like npm's pack dir
  const f: PackageFetcher = {
    listVersions: () => ['15.0.0', '15.1.0'],
    fetch: (v) => {
      calls.push(v);
      if (previous === 'offline') return null;
      const root = path.join(cache, v, 'package');
      fs.mkdirSync(root, { recursive: true });
      fs.writeFileSync(path.join(root, 'package.json'), JSON.stringify({ name: '@3fn/core', version: v }));
      if (previous) writeFile(root, 'dist/name-contract.json', contractJson(previous));
      return root;
    },
  };
  return { f, calls };
}

describe('sync — the type contract (DD11; fork-1 ruling B)', () => {
  let logSpy: jest.SpyInstance;
  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });
  afterEach(() => logSpy.mockRestore());

  it('previous A,B → current A,C → "removed: B; added: C" (string-equal), fetched from the PREVIOUS version', async () => {
    const scratch = consumer(PREV.hash);
    const { f, calls } = fetcher(scratch, PREV);
    const out = await runSync({ projectRoot: scratch, dryRun: true, isTTY: false, fetcher: f });
    expect(calls).toEqual(['15.0.0']);
    expect(out.typeContract).toMatchObject({ kind: 'changed', removed: ['B'], added: ['C'] });
    expect(out.typeContract!.lines).toEqual([DESIGN_ROW('B', 'C')]);
    expect(out.report).toContain(`   ${DESIGN_ROW('B', 'C')}`);
  });

  it('a comment-only change (hash moved, members equal) → "no member changes detected"', async () => {
    const scratch = consumer(PREV.hash, { hash: 'sha256:reworded', members: ['A', 'B'] });
    const out = await runSync({ projectRoot: scratch, dryRun: true, isTTY: false, fetcher: fetcher(scratch, PREV).f });
    expect(out.typeContract!.kind).toBe('changed');
    expect(out.typeContract!.lines).toEqual([typeContractChangedMessage([], [])]);
    expect(out.typeContract!.lines[0]).toContain(`(${NO_MEMBER_CHANGES})`);
  });

  it('offline (the fetch fails) → cannot tell, NEVER silently clean', async () => {
    const scratch = consumer(PREV.hash);
    const out = await runSync({ projectRoot: scratch, dryRun: true, isTTY: false, fetcher: fetcher(scratch, 'offline').f });
    expect(out.typeContract!.kind).toBe('cannot-tell');
    expect(out.typeContract!.lines).toEqual([typeContractCannotTellMessage({ kind: 'fetch-failed', version: '15.0.0' })]);
    expect(out.typeContract!.lines[0]).toBe(
      "cannot tell what changed in the token type contract — the package content for version 15.0.0 could not be retrieved. It did change: run 'npx tsc --noEmit' — fix each file it names. (This is not a clean report.)",
    );
  });

  it('the fetched previous contract does not match the recorded hash → cannot tell (never a wrong diff)', async () => {
    const scratch = consumer(PREV.hash);
    const out = await runSync({ projectRoot: scratch, dryRun: true, isTTY: false, fetcher: fetcher(scratch, { hash: 'sha256:other', members: ['Z'] }).f });
    expect(out.typeContract!.lines).toEqual([typeContractCannotTellMessage({ kind: 'baseline-mismatch', version: '15.0.0' })]);
  });

  it('a legacy / pre-contract manifest (contractHash "") → no baseline, and nothing is fetched', async () => {
    const scratch = consumer('');
    const { f, calls } = fetcher(scratch, PREV);
    const out = await runSync({ projectRoot: scratch, dryRun: true, isTTY: false, fetcher: f });
    expect(calls).toEqual([]);
    expect(out.typeContract!.lines).toEqual([
      'no baseline to compare the token type contract against — your manifest records no contractHash. sync records the installed contract as the baseline the next time it writes the manifest.',
    ]);
  });

  it('a previous version that predates name-contract.json → no baseline', async () => {
    const scratch = consumer(PREV.hash);
    const out = await runSync({ projectRoot: scratch, dryRun: true, isTTY: false, fetcher: fetcher(scratch, null).f });
    expect(out.typeContract!.lines).toEqual([typeContractNoBaselineMessage({ kind: 'predates-contract', version: '15.0.0' })]);
  });

  it('unchanged hash → no type-contract line and no fetch', async () => {
    const scratch = consumer(CUR.hash);
    const { f, calls } = fetcher(scratch, PREV);
    const out = await runSync({ projectRoot: scratch, dryRun: true, isTTY: false, fetcher: f });
    expect(calls).toEqual([]);
    expect(out.typeContract!.kind).toBe('unchanged');
    expect(out.report.join('\n')).not.toContain('type contract');
  });

  it('RE-RECORD: contractHash moves to the installed hash only when sync WRITES the manifest', async () => {
    // Off a terminal without --apply: reported, nothing written (Task 5's report-first rule).
    const scratch = consumer(PREV.hash);
    const before = dirHash(scratch);
    const dry = await runSync({ projectRoot: scratch, isTTY: false, fetcher: fetcher(scratch, PREV).f });
    expect(dry.stopped).toBe('off-tty');
    expect(parseManifest(readText(scratch, MANIFEST_FILE)).contractHash).toBe(PREV.hash);
    expect(dirHash(scratch)).toEqual(before);

    // With --apply: written after the report, with the new baseline.
    const applied = await runSync({ projectRoot: scratch, apply: true, isTTY: false, fetcher: fetcher(scratch, PREV).f });
    expect(applied.manifestWritten).toBe(true);
    expect(parseManifest(readText(scratch, MANIFEST_FILE)).contractHash).toBe(CUR.hash);

    // The next run starts from the right baseline: unchanged, nothing fetched.
    const { f, calls } = fetcher(scratch, PREV);
    const next = await runSync({ projectRoot: scratch, dryRun: true, isTTY: false, fetcher: f });
    expect(next.typeContract!.kind).toBe('unchanged');
    expect(calls).toEqual([]);
  });

  it('RE-RECORD alone triggers the write: same version, no baseline yet → --apply records the installed hash', async () => {
    const scratch = consumer('', CUR, '15.1.0');
    const out = await runSync({ projectRoot: scratch, apply: true, isTTY: false, fetcher: fetcher(scratch, PREV).f });
    expect(out.typeContract!.kind).toBe('no-baseline');
    expect(out.manifestWritten).toBe(true);
    expect(parseManifest(readText(scratch, MANIFEST_FILE)).contractHash).toBe(CUR.hash);
  });

  it('a repo with no manifest gets no type-contract report (nothing was recorded, nothing is written)', async () => {
    const scratch = consumer(PREV.hash);
    fs.rmSync(path.join(scratch, MANIFEST_FILE));
    const out = await runSync({ projectRoot: scratch, dryRun: true, isTTY: false, fetcher: fetcher(scratch, PREV).f });
    expect(out.typeContract).toBeUndefined();
  });
});
