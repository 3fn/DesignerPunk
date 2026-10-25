/**
 * @category evergreen
 * @purpose Spec 123 Task 5.5 — component-copy migration (design.md § "C7"
 * Migration; Testing Strategy rows "migration" and "migration fetch order").
 *
 * Fixtures:
 *  - `fixtures/sync/package-snapshots.json` — per-file-faithful package content
 *    for 11.2.1 (the last pre-Spec-104 release: identity transform), 11.3.0 (the
 *    unknown-transform window), 12.0.5 (dp-portfolio), 13.0.0, 14.0.0, 14.1.0.
 *    Provenance inside the file.
 *  - `fixtures/sync/dp-portfolio.legacy-manifest.json` — a trimmed, verbatim
 *    subset of dp-portfolio's real legacy manifest (version 12.0.3, lagging the
 *    installed 12.0.5).
 *
 * The consumer copies are built INDEPENDENTLY of the code under test: `.ts`
 * files get the literal Spec 104 regex for versions ≥ 11.3.0, raw below it.
 */

import * as fs from 'fs';
import * as path from 'path';
import { runSync } from '../sync';
import {
  assessComponentCopies,
  loadTransform,
  modifiedCopiesMessage,
  cannotTellMessage,
  unmodifiedCopiesMessage,
  yoursUnderCoreMessage,
  legacyCopiesMessage,
  migrateLegacyUnavailableMessage,
  TOKEN_SIDE_SLOTS,
  compareVersions,
  cannotTellRemedyMessage,
  stripComments,
  REGISTRY_PIN_MESSAGE,
  REGISTRY_PIN_ORDER_CAUTION,
  tsconfigPinMessage,
  TSCONFIG_UNPARSEABLE_MESSAGE,
  cannotTellReason,
  condenseVersions,
  classifyNpmAuthError,
  npmRailFetcher,
  registryPinRefusedTokenMessage,
} from '../sync/Migration';
import type { PackageFetcher, MigrationAssessment, RegistryAuthFailure } from '../sync/Migration';
import { registryAuthFailedMessage, cannotTellGroupMessage } from '../shared/errorCatalog';
import { createScratch, setupPackage, writeFile, captureConsole, sha, readText } from './syncTestKit';

const SNAP = require('./fixtures/sync/package-snapshots.json') as {
  blobs: Record<string, string>;
  versions: Record<string, Record<string, string>>;
};
const DP_LEGACY = require('./fixtures/sync/dp-portfolio.legacy-manifest.json');

/** The enumerated range the criterion names (S-T-A4) + the pre-Spec-104 boundary. */
const RANGE = ['11.2.1', '12.0.5', '13.0.0', '14.0.0', '14.1.0'] as const;
const PRE_104 = '11.2.1';
const COMPONENTS = ['Badge-Label-Base', 'Button-Icon'];

/** Independent re-statement of Spec 104's copy transform (the literal regex), NOT the code under test. */
function spec104Rewrite(s: string): string {
  return s.replace(/from\s+['"]\.\.\/(?:\.\.\/)*build\/tokens(?:\/[^'"]*)?['"]/g, `from '@3fn/core/build'`);
}

function shipped(version: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [rel, h] of Object.entries(SNAP.versions[version])) out[rel] = SNAP.blobs[h];
  return out;
}

/** Write the consumer's copies exactly as `init`/`sync` at `version` would have. */
function writeCopiesAt(root: string, version: string): void {
  for (const [rel, content] of Object.entries(shipped(version))) {
    if (!rel.startsWith('src/components/core/')) continue;
    const post104 = compareVersions(version, '11.3.0') >= 0;
    writeFile(root, rel, rel.endsWith('.ts') && post104 ? spec104Rewrite(content) : content);
  }
}

/** A fixture fetcher over the snapshots — `available` models the rail (which versions it can serve). */
function snapshotFetcher(scratch: string, opts: { listed?: string[] | null; available?: string[]; auth?: RegistryAuthFailure } = {}) {
  const listed = opts.listed === undefined ? Object.keys(SNAP.versions) : opts.listed;
  const available = new Set(opts.available ?? Object.keys(SNAP.versions));
  const calls: string[] = [];
  const lists: number[] = [];
  const fetcher: PackageFetcher = {
    listVersions: () => {
      lists.push(calls.length);
      return listed ? [...listed] : null;
    },
    ...(opts.auth ? { authFailure: () => opts.auth! } : {}),
    fetch: (v) => {
      calls.push(v);
      if (!available.has(v) || !SNAP.versions[v]) return null;
      const root = path.join(scratch, '.fixture-tarballs', v, 'package');
      if (!fs.existsSync(root)) {
        writeFile(root, 'package.json', JSON.stringify({ name: '@3fn/core', version: v }));
        for (const [rel, content] of Object.entries(shipped(v))) writeFile(root, rel, content);
      }
      return root;
    },
  };
  return { fetcher, calls, lists };
}

/** The 38 versions test01's GitHub Packages rail listed (R6's "all 38 versions"), newest first: the snapshot six plus 32 synthesized. */
const THIRTY_EIGHT = [
  ...Object.keys(SNAP.versions),
  ...Array.from({ length: 32 }, (_, i) => `10.${Math.floor(i / 8)}.${i % 8}`),
].sort((a, b) => compareVersions(b, a));

function migrationLines(a: MigrationAssessment): string[] {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return (require('../sync/Migration') as typeof import('../sync/Migration')).migrationReportLines(a);
}

function lockAt(root: string, version: string): void {
  writeFile(root, 'package-lock.json', JSON.stringify({ lockfileVersion: 3, packages: { 'node_modules/@3fn/core': { version } } }));
}

function assess(root: string, fetcher: PackageFetcher, upper: string | null): MigrationAssessment {
  return assessComponentCopies(root, {
    fetcher,
    upperBound: { version: upper, source: upper ? 'lockfile' : 'unknown' },
    trigger: 'legacy-copies',
  });
}

describe('sync — component-copy migration (Task 5.5)', () => {
  let scratch: string;
  let con: ReturnType<typeof captureConsole>;
  beforeEach(() => {
    scratch = createScratch('dp-sync-migration-');
    con = captureConsole();
  });
  afterEach(() => {
    con.restore();
    fs.rmSync(scratch, { recursive: true, force: true });
  });

  test('fixture integrity: six versions, the enumerated range present, per-file provenance recorded', () => {
    expect(Object.keys(SNAP.versions)).toEqual(['11.2.1', '11.3.0', '12.0.5', '13.0.0', '14.0.0', '14.1.0']);
    for (const v of RANGE) expect(SNAP.versions[v]).toBeDefined();
    for (const v of Object.keys(SNAP.versions)) {
      expect(Object.keys(SNAP.versions[v]).filter((f) => f.startsWith('src/components/core/'))).toHaveLength(6);
      for (const h of Object.values(SNAP.versions[v])) expect(sha(SNAP.blobs[h])).toBe(h);
    }
  });

  describe('the transform, loaded from each version itself', () => {
    test.each([
      ['11.2.1', 'identity'],
      ['11.3.0', 'unknown'],
      ['12.0.5', 'fn'],
      ['13.0.0', 'fn'],
      ['14.0.0', 'fn'],
      ['14.1.0', 'fn'],
    ])('%s → %s', (version, kind) => {
      const { fetcher } = snapshotFetcher(scratch);
      const root = fetcher.fetch(version)!;
      const t = loadTransform(root);
      expect(t.kind).toBe(kind);
      if (t.kind === 'fn') expect(t.fn("import { x } from '../../../build/tokens';")).toBe("import { x } from '@3fn/core/build';");
    });
  });

  describe('(b) unmodified copies across the version range → unmodified', () => {
    test.each(RANGE.map((v) => [v]))('copies made at %s', (version) => {
      writeCopiesAt(scratch, version);
      const { fetcher } = snapshotFetcher(scratch);
      const a = assess(scratch, fetcher, '14.1.0');
      expect(a.components.map((c) => [c.name, c.verdict])).toEqual(COMPONENTS.map((n) => [n, 'unmodified']));
      expect(a.components.flatMap((c) => c.files)).toHaveLength(6);
    });

    test('each distinguishable version is actually consulted (the matched version is the copy version)', () => {
      const distinguishing: Record<string, [string, string]> = {
        '11.2.1': ['Badge-Label-Base', 'tokens.ts'], // the raw (pre-104) import — only the identity explains it
        '14.0.0': ['Button-Icon', 'buttonIcon.tokens.ts'], // 14.1.0 changed it; 14.0.0 is the newest that explains it
        '14.1.0': ['Button-Icon', 'buttonIcon.tokens.ts'],
      };
      for (const [version, [name, file]] of Object.entries(distinguishing)) {
        fs.rmSync(path.join(scratch, 'src'), { recursive: true, force: true });
        writeCopiesAt(scratch, version);
        const { fetcher } = snapshotFetcher(scratch);
        const c = assess(scratch, fetcher, '14.1.0').components.find((x) => x.name === name)!;
        expect(c.files.find((f) => f.file === file)!.matchedVersion).toBe(version);
      }
      expect(Object.keys(distinguishing)).toHaveLength(3);
    });

    test('the pre-Spec-104 boundary: an 11.2.1 copy carries the RAW import and matches only under the identity', () => {
      writeCopiesAt(scratch, PRE_104);
      const raw = readText(scratch, 'src/components/core/Badge-Label-Base/tokens.ts');
      expect(raw).toMatch(/from '\.\.\/\.\.\/\.\.\/build\/tokens'/);
      const { fetcher } = snapshotFetcher(scratch);
      const badge = assess(scratch, fetcher, '14.1.0').components.find((c) => c.name === 'Badge-Label-Base')!;
      expect(badge.files.find((f) => f.file === 'tokens.ts')!.matchedVersion).toBe(PRE_104);
    });

    test('the 11.3.0–11.8.x window (transform private to init): a .ts file only that window could explain → cannot-tell', () => {
      writeCopiesAt(scratch, '12.0.5');
      // Reached only if no newer version matches: serve the window alone.
      const { fetcher } = snapshotFetcher(scratch, { listed: ['11.3.0'] });
      const a = assess(scratch, fetcher, '14.1.0');
      const badge = a.components.find((c) => c.name === 'Badge-Label-Base')!;
      expect(badge.files.find((f) => f.file === 'tokens.ts')!.verdict).toBe('cannot-tell');
      expect(badge.files.find((f) => f.file === 'index.ts')!.verdict).toBe('cannot-tell');
      expect(a.unknownTransform['11.3.0']).toMatch(/does not export/);
      // Cause selection (erratum 2026-09-26): the content WAS retrieved; the transform is the unknown part.
      expect(badge.files.find((f) => f.file === 'tokens.ts')!.cause).toEqual({ kind: 'transform-unrecoverable', version: '11.3.0' });
    });
  });

  describe('the two manifest branches (5.1) and the lag', () => {
    test('manifest PRESENT (dp-portfolio: legacy 12.0.3, installed 12.0.5): the lag does not bound the range; copies → unmodified', async () => {
      setupPackage(scratch, { version: '15.0.0' });
      writeFile(scratch, '.kiro/sync-manifest.json', JSON.stringify({ version: DP_LEGACY.version, syncedAt: DP_LEGACY.syncedAt, files: DP_LEGACY.files }));
      lockAt(scratch, '12.0.5');
      writeCopiesAt(scratch, '12.0.5');
      const { fetcher, calls } = snapshotFetcher(scratch);

      const out = await runSync({ projectRoot: scratch, dryRun: true, fetcher });

      expect(DP_LEGACY.version).toBe('12.0.3');
      expect(out.migration!.trigger).toBe('legacy-manifest');
      expect(out.migration!.upperBound).toEqual({ version: '12.0.5', source: 'lockfile' });
      expect(out.migration!.range).toEqual(['12.0.5', '11.3.0', '11.2.1']);
      expect(calls[0]).toBe('12.0.5');
      expect(out.migration!.components.map((c) => c.verdict)).toEqual(['unmodified', 'unmodified']);
      expect(con.output()).toContain(unmodifiedCopiesMessage(2, COMPONENTS));
    });

    test('manifest ABSENT: the legacy-copies trigger fires; the lockfile bounds the range', async () => {
      setupPackage(scratch, { version: '15.0.0' });
      lockAt(scratch, '14.1.0');
      writeCopiesAt(scratch, '14.0.0');
      const { fetcher } = snapshotFetcher(scratch);
      const out = await runSync({ projectRoot: scratch, dryRun: true, fetcher });
      expect(out.migration!.trigger).toBe('legacy-copies');
      expect(out.migration!.components.map((c) => c.verdict)).toEqual(['unmodified', 'unmodified']);
    });
  });

  test('(a) a copy edited BEFORE the first sync → modified (judged against shipped content, not the baseline)', async () => {
    setupPackage(scratch, { version: '15.0.0' });
    lockAt(scratch, '12.0.5');
    writeCopiesAt(scratch, '12.0.5');
    // A non-.ts file: see the next test for why a .ts edit reads cannot-tell while 11.3.0–11.8.x are in range.
    const edited = 'src/components/core/Button-Icon/contracts.yaml';
    writeFile(scratch, edited, `${readText(scratch, edited)}\n# her edit, made before any sync\n`);
    // The first-sync baseline recorded the EDITED bytes — Spec 111 would call this unmodified.
    writeFile(scratch, '.kiro/sync-manifest.json', JSON.stringify({ version: '12.0.5', files: { [edited]: { hash: sha(readText(scratch, edited)), managed: false } } }));
    const { fetcher } = snapshotFetcher(scratch);

    const out = await runSync({ projectRoot: scratch, dryRun: true, fetcher });

    const bi = out.migration!.components.find((c) => c.name === 'Button-Icon')!;
    expect(bi.verdict).toBe('modified');
    expect(bi.files.find((f) => f.file === 'contracts.yaml')!.verdict).toBe('modified');
    expect(con.output()).toContain(modifiedCopiesMessage(1, ['Button-Icon']));
  });

  test('a .ts edit: cannot-tell while the unknown-transform window (11.3.0–11.8.x) is in range; modified once it is not', () => {
    writeCopiesAt(scratch, '12.0.5');
    const edited = 'src/components/core/Button-Icon/types.ts';
    writeFile(scratch, edited, `${readText(scratch, edited)}\n// hers\n`);
    const withWindow = assess(scratch, snapshotFetcher(scratch).fetcher, '14.1.0');
    expect(withWindow.components.find((c) => c.name === 'Button-Icon')!.verdict).toBe('cannot-tell');
    const withoutWindow = assess(scratch, snapshotFetcher(scratch, { listed: ['11.2.1', '12.0.5', '13.0.0', '14.0.0', '14.1.0'] }).fetcher, '14.1.0');
    expect(withoutWindow.components.find((c) => c.name === 'Button-Icon')!.verdict).toBe('modified');
  });

  test('a file DELETED from a copy makes the component a fork', () => {
    writeCopiesAt(scratch, '14.1.0');
    fs.rmSync(path.join(scratch, 'src/components/core/Badge-Label-Base/index.ts'));
    const { fetcher } = snapshotFetcher(scratch);
    const badge = assess(scratch, fetcher, '14.1.0').components.find((c) => c.name === 'Badge-Label-Base')!;
    expect(badge.deletedFiles).toEqual(['index.ts']);
    expect(badge.verdict).toBe('modified');
  });

  describe('(c) cannot-tell — never "unmodified"', () => {
    test('offline: the version list cannot be read → every component cannot-tell, ONE grouped line (R6)', async () => {
      setupPackage(scratch, { version: '15.0.0' });
      lockAt(scratch, '12.0.5');
      writeCopiesAt(scratch, '12.0.5');
      const { fetcher, calls } = snapshotFetcher(scratch, { listed: null });
      const out = await runSync({ projectRoot: scratch, dryRun: true, fetcher });
      expect(out.migration!.components.map((c) => c.verdict)).toEqual(['cannot-tell', 'cannot-tell']);
      expect(calls).toHaveLength(0);
      // Two copies, one reason → one line naming both (R6); the per-path catalog row is not repeated per copy.
      expect(con.output()).toContain(cannotTellGroupMessage(COMPONENTS, cannotTellReason({ kind: 'fetch-failed', version: '12.0.5' })));
      for (const n of COMPONENTS) expect(con.output()).not.toContain(cannotTellMessage(`src/components/core/${n}/`, { kind: 'fetch-failed', version: '12.0.5' }));
      // Peter's ruling (2026-09-26), condition 1: the cannot-tell outcome is ACTIONABLE.
      expect(con.output()).toContain(cannotTellRemedyMessage(COMPONENTS));
    });

    test('the cannot-tell remedy names both manual paths and the legacy warning (ruled condition 1)', () => {
      const m = cannotTellRemedyMessage(['Button-Icon']);
      expect(m).toMatch(/if you edited it, move it to src\/components\/<Name>\//);
      expect(m).toMatch(/if you didn't, delete it and you'll get the package's version/);
      expect(m).toMatch(/core\/ level keeps logging its legacy warning/);
      expect(m).toMatch(/leaves it in src\/components\/core\//);
    });

    test('the public rail (npmjs: 13.0.0/14.0.0/14.1.0 only) for an 11.2.1-era copy → cannot-tell, not modified', () => {
      writeCopiesAt(scratch, PRE_104);
      const { fetcher } = snapshotFetcher(scratch, { available: ['13.0.0', '14.0.0', '14.1.0'] });
      const a = assess(scratch, fetcher, '14.1.0');
      expect(a.failed).toEqual(['12.0.5', '11.3.0', '11.2.1']);
      const bi = a.components.find((c) => c.name === 'Button-Icon')!;
      expect(bi.files.find((f) => f.file === 'contracts.yaml')!.verdict).toBe('cannot-tell');
      expect(bi.files.find((f) => f.file === 'contracts.yaml')!.cause).toEqual({ kind: 'fetch-failed', version: '12.0.5, 11.3.0, 11.2.1' });
      expect(bi.verdict).toBe('cannot-tell');
    });

    test('installed version unknown (no manifest installedVersion, no lockfile) → cannot-tell', () => {
      writeCopiesAt(scratch, '14.1.0');
      const { fetcher, calls } = snapshotFetcher(scratch);
      const a = assess(scratch, fetcher, null);
      expect(a.components.every((c) => c.verdict === 'cannot-tell')).toBe(true);
      expect(a.components.flatMap((c) => c.files).every((f) => f.cause?.kind === 'version-unknown')).toBe(true);
      expect(calls).toHaveLength(0);
    });
  });

  describe('R2 (a) — the installed version, judged from node_modules/@3fn/core before anything is fetched', () => {
    test('copies of the installed 14.1.0: settled from disk — no version list, no fetch, and the trace says so', async () => {
      setupPackage(scratch, { version: '14.1.0', files: shipped('14.1.0') });
      lockAt(scratch, '14.1.0');
      writeCopiesAt(scratch, '14.1.0');
      const { fetcher, calls, lists } = snapshotFetcher(scratch);

      const out = await runSync({ projectRoot: scratch, dryRun: true, fetcher });

      expect(out.migration!.judgedInstalled).toBe('14.1.0');
      expect(out.migration!.components.map((c) => c.verdict)).toEqual(['unmodified', 'unmodified']);
      expect(calls).toEqual([]);
      expect(lists).toEqual([]);
      expect(out.trace.filter((t) => t.startsWith('fetch:'))).toEqual([]);
      expect(out.trace).toContain('judged-installed:14.1.0');
    });

    test('a dead registry cannot hide the installed version: every fetch refused, the installed 14.1.0 still settles its copies', async () => {
      setupPackage(scratch, { version: '14.1.0', files: shipped('14.1.0') });
      lockAt(scratch, '14.1.0');
      writeCopiesAt(scratch, '14.1.0');
      const { fetcher, calls } = snapshotFetcher(scratch, { available: [], auth: { code: 'E401', registry: 'https://npm.pkg.github.com' } });
      const out = await runSync({ projectRoot: scratch, dryRun: true, fetcher });
      expect(out.migration!.components.map((c) => c.verdict)).toEqual(['unmodified', 'unmodified']);
      expect(calls).toEqual([]);
      expect(con.output()).not.toContain('could not be retrieved');
    });

    test('older copies: the installed version is judged FIRST (trace order), then the range is fetched for what it left', async () => {
      setupPackage(scratch, { version: '14.1.0', files: shipped('14.1.0') });
      lockAt(scratch, '14.1.0');
      writeCopiesAt(scratch, PRE_104);
      const { fetcher, calls } = snapshotFetcher(scratch);
      const out = await runSync({ projectRoot: scratch, dryRun: true, fetcher });
      const judged = out.trace.indexOf('judged-installed:14.1.0');
      const firstFetch = out.trace.findIndex((t) => t.startsWith('fetch:'));
      expect(judged).toBeGreaterThanOrEqual(0);
      expect(firstFetch).toBeGreaterThan(judged);
      expect(calls).not.toContain('14.1.0'); // never fetched: it is on disk
      expect(out.migration!.components.map((c) => c.verdict)).toEqual(['unmodified', 'unmodified']);
    });

    test('a package that ships no src/components/core/ adds nothing and is not reported as judged', () => {
      const pkg = setupPackage(scratch, { version: '15.0.0' });
      writeCopiesAt(scratch, '14.1.0');
      const a = assessComponentCopies(scratch, {
        fetcher: snapshotFetcher(scratch).fetcher,
        upperBound: { version: '14.1.0', source: 'lockfile' },
        trigger: 'legacy-copies',
        installed: { version: '15.0.0', root: pkg },
      });
      expect(a.judgedInstalled).toBeUndefined();
      expect(a.components.map((c) => c.verdict)).toEqual(['unmodified', 'unmodified']);
    });
  });

  describe('R2 (b) — a registry login refusal is reported ONCE, as a login problem', () => {
    const AUTH: RegistryAuthFailure = { code: 'E401', registry: 'https://npm.pkg.github.com' };

    test('38 versions refused for 2 copies → one login line and the remedy; no per-copy or per-version "could not be retrieved"', async () => {
      setupPackage(scratch, { version: '15.0.0' });
      lockAt(scratch, '14.1.0');
      writeCopiesAt(scratch, '12.0.5');
      const { fetcher, calls } = snapshotFetcher(scratch, { listed: THIRTY_EIGHT, available: [], auth: AUTH });

      const out = await runSync({ projectRoot: scratch, dryRun: true, fetcher });

      expect(THIRTY_EIGHT).toHaveLength(38);
      expect(out.migration!.authFailure).toEqual(AUTH);
      expect(out.migration!.components.map((c) => c.verdict)).toEqual(['cannot-tell', 'cannot-tell']);
      expect(calls.length).toBeGreaterThan(30); // the cache may still serve some, so every version is tried
      const loginLine = registryAuthFailedMessage('E401', 'https://npm.pkg.github.com', 2);
      expect(con.output().split(loginLine)).toHaveLength(2); // exactly once
      expect(con.output()).not.toContain('could not be retrieved');
      expect(con.output().split('\n').filter((l) => l.trim().startsWith('cannot tell whether'))).toEqual([]);
      expect(con.output()).toContain(cannotTellRemedyMessage(COMPONENTS));
    });

    test('the login line covers only copies a retrieval failure left undecided: with every version retrieved, an unrecoverable transform keeps its catalog row and no login line prints', () => {
      writeCopiesAt(scratch, '12.0.5');
      const a = assess(scratch, snapshotFetcher(scratch, { listed: ['11.3.0'], auth: AUTH }).fetcher, '14.1.0');
      expect(a.failed).toEqual([]);
      const lines = migrationLines(a);
      expect(lines.some((l) => l.startsWith('your npm registry refused'))).toBe(false);
      expect(lines).toContain(
        cannotTellMessage('src/components/core/Badge-Label-Base/tokens.ts', { kind: 'transform-unrecoverable', version: '11.3.0' }),
      );
    });

    test('classifyNpmAuthError: npm\'s E401 output → the code and the registry ORIGIN only; other failures → null', () => {
      const e401 = {
        stdout: '',
        stderr:
          'npm error code E401\nnpm error 401 Unauthorized - GET https://npm.pkg.github.com/@3fn%2fcore - unauthenticated: User cannot be authenticated with the token provided.\n',
        message: 'Command failed: npm pack @3fn/core@14.1.0',
      };
      expect(classifyNpmAuthError(e401)).toEqual({ code: 'E401', registry: 'https://npm.pkg.github.com' });
      expect(classifyNpmAuthError({ stdout: '{"error":{"code":"E403","summary":"403 Forbidden - GET https://r.example/@3fn%2fcore"}}' })).toEqual({
        code: 'E403',
        registry: 'https://r.example',
      });
      expect(classifyNpmAuthError({ stderr: 'npm error code ENEEDAUTH\nnpm error need auth This command requires you to be logged in.' })).toEqual({
        code: 'ENEEDAUTH',
        registry: null,
      });
      expect(classifyNpmAuthError({ stderr: 'npm error code ETARGET\nnpm error notarget No matching version found for @3fn/core@9.9.9.' })).toBeNull();
      expect(classifyNpmAuthError({ stderr: 'npm error code ENOTFOUND\nnpm error network request to https://registry.npmjs.org failed' })).toBeNull();
      expect(classifyNpmAuthError(undefined)).toBeNull();
    });

    test('classifyNpmAuthError keeps the bare ORIGIN only: never a login part or a query-string token (Ada, review 2026-10-24)', () => {
      const refused = (url: string) => ({ stderr: `npm error code E401\nnpm error 401 Unauthorized - GET ${url} - unauthenticated\n` });
      const bare = { code: 'E401', registry: 'https://npm.example.com' };
      expect(classifyNpmAuthError(refused('https://bob:s3cr3tTOKEN@npm.example.com/@3fn%2fcore'))).toEqual(bare);
      expect(classifyNpmAuthError(refused('https://***@npm.example.com/@3fn%2fcore'))).toEqual(bare);
      expect(classifyNpmAuthError(refused('https://npm.example.com/@3fn%2fcore?token=abc'))).toEqual(bare);
      for (const url of ['https://bob:s3cr3tTOKEN@npm.example.com/x', 'https://npm.example.com/x?token=abc']) {
        const r = classifyNpmAuthError(refused(url))!;
        expect(registryAuthFailedMessage(r.code, r.registry, 2)).not.toMatch(/s3cr3tTOKEN|bob|token=abc/);
      }
    });

    (process.platform === 'win32' ? test.skip : test)('npmRailFetcher records the first refusal from a real npm invocation (a stub npm answering E401; no network)', () => {
      const bin = path.join(scratch, '.bin');
      writeFile(
        bin,
        'npm',
        "#!/bin/sh\necho 'npm error code E401' >&2\necho 'npm error 401 Unauthorized - GET https://npm.pkg.github.com/@3fn%2fcore - unauthenticated' >&2\nexit 1\n",
      );
      fs.chmodSync(path.join(bin, 'npm'), 0o755);
      const f = npmRailFetcher(scratch, { npm: path.join(bin, 'npm') });
      try {
        expect(f.authFailure!()).toBeNull();
        expect(f.listVersions()).toBeNull();
        expect(f.fetch('14.1.0')).toBeNull();
        expect(f.authFailure!()).toEqual({ code: 'E401', registry: 'https://npm.pkg.github.com' });
      } finally {
        f.dispose?.();
      }
    });
  });

  describe('R2 (c) — the npmrc ordering advice, for a consumer whose token is refused', () => {
    const PIN_NPMRC = '@3fn:registry=https://npm.pkg.github.com\n//npm.pkg.github.com/:_authToken=FIXTURE_DEAD_TOKEN\n';

    test('refused: the "do this after --migrate-components" caution is replaced by the renew-or-remove advice', async () => {
      setupPackage(scratch, { version: '15.0.0' });
      lockAt(scratch, '12.0.5');
      writeCopiesAt(scratch, '12.0.5');
      writeFile(scratch, '.npmrc', PIN_NPMRC);
      const { fetcher } = snapshotFetcher(scratch, { available: [], auth: { code: 'E401', registry: 'https://npm.pkg.github.com' } });
      await runSync({ projectRoot: scratch, dryRun: true, fetcher });
      expect(con.output()).toContain(REGISTRY_PIN_MESSAGE);
      expect(con.output()).toContain(registryPinRefusedTokenMessage('E401'));
      expect(con.output()).not.toContain(REGISTRY_PIN_ORDER_CAUTION);
      expect(con.output()).not.toContain('FIXTURE_DEAD_TOKEN');
    });

    test('the advice names both ways out, says renewing is the safe route, and states the guard\'s limit (no promise beyond it)', () => {
      const m = registryPinRefusedTokenMessage('E401');
      expect(m).toMatch(/already blocks every fetch/);
      expect(m).toMatch(/The safe route for copies made before 13\.0\.0 is to renew the token/);
      expect(m).toMatch(/those versions exist only on GitHub Packages/);
      expect(m).toMatch(/If you remove the mapping instead/);
      expect(m).toMatch(/left in place only if your old \.kiro\/sync-manifest\.json records a last sync before 13\.0\.0/);
      expect(m).toMatch(/otherwise it can read as your fork/);
      expect(m).not.toMatch(/stays where it is/);
    });

    test('the guard\'s covered case: a registry listing nothing as old as the last sync → cannot-tell, never modified', () => {
      writeCopiesAt(scratch, PRE_104); // 11.2.1 copies: the raw import matches nothing from 13.0.0 on
      const publicRail = snapshotFetcher(scratch, { listed: ['13.0.0', '14.0.0', '14.1.0'] }).fetcher;
      const a = assessComponentCopies(scratch, {
        fetcher: publicRail,
        upperBound: { version: '14.1.0', source: 'lockfile' },
        trigger: 'legacy-manifest',
        lastSyncVersion: '12.0.3',
      });
      expect(a.unlistedBefore).toBe('13.0.0');
      const badge = a.components.find((c) => c.name === 'Badge-Label-Base')!;
      expect(badge.verdict).toBe('cannot-tell');
      expect(badge.files.find((f) => f.file === 'tokens.ts')!.cause).toEqual({
        kind: 'fetch-failed',
        version: '12.0.3 (your registry lists no version before 13.0.0)',
      });
      // Bite: without the last-sync floor, the same copies read as forks (the defect this guards).
      const unguarded = assess(scratch, snapshotFetcher(scratch, { listed: ['13.0.0', '14.0.0', '14.1.0'] }).fetcher, '14.1.0');
      expect(unguarded.components.find((c) => c.name === 'Badge-Label-Base')!.verdict).toBe('modified');
    });

    test('the guard\'s RESIDUAL, pinned so it stays visible: last sync 13.2.0, copies from 11.2.1, public listing → still modified (a heuristic floor, not a proven bound)', () => {
      // design.md C7: the last sync is not the copy version, and a skipped update leaves older copies. The guard
      // reads the last sync as a floor, so it misses this. The sound fix is a fork:
      // .kiro/issues/2026-10-24-sync-migration-unlisted-copy-floor.md. If that lands, this expectation flips.
      writeCopiesAt(scratch, PRE_104);
      const a = assessComponentCopies(scratch, {
        fetcher: snapshotFetcher(scratch, { listed: ['13.0.0', '14.0.0', '14.1.0'] }).fetcher,
        upperBound: { version: '14.1.0', source: 'lockfile' },
        trigger: 'legacy-manifest',
        lastSyncVersion: '13.2.0',
      });
      expect(a.unlistedBefore).toBeUndefined();
      expect(a.components.find((c) => c.name === 'Badge-Label-Base')!.verdict).toBe('modified');
    });
  });

  describe('R6 — the cannot-tell lines, condensed', () => {
    test('condenseVersions: up to three listed; more → newest, a count and the oldest', () => {
      expect(condenseVersions(['12.0.5'])).toBe('12.0.5');
      expect(condenseVersions(['12.0.5', '11.3.0', '11.2.1'])).toBe('12.0.5, 11.3.0, 11.2.1');
      expect(condenseVersions(THIRTY_EIGHT)).toBe(`14.1.0 and 37 older versions back to ${THIRTY_EIGHT[37]}`);
    });

    test('38 failed versions (no login refusal): ONE line for both copies, and no line lists more than three versions', async () => {
      setupPackage(scratch, { version: '15.0.0' });
      lockAt(scratch, '14.1.0');
      writeCopiesAt(scratch, '12.0.5');
      const { fetcher } = snapshotFetcher(scratch, { listed: THIRTY_EIGHT, available: [] });
      const out = await runSync({ projectRoot: scratch, dryRun: true, fetcher });
      expect(out.migration!.failed).toHaveLength(38);
      const cannot = con.output().split('\n').filter((l) => l.includes('cannot tell whether'));
      expect(cannot).toHaveLength(1);
      expect(cannot[0]).toContain(cannotTellGroupMessage(COMPONENTS, cannotTellReason({ kind: 'fetch-failed', version: condenseVersions(THIRTY_EIGHT) })));
      for (const l of con.output().split('\n')) expect((l.match(/\b\d+\.\d+\.\d+\b/g) ?? []).length).toBeLessThanOrEqual(3);
    });

    test('a single copy keeps the catalog\'s per-path row (string-equal), with the condensed version slot', () => {
      writeCopiesAt(scratch, '12.0.5');
      fs.rmSync(path.join(scratch, 'src/components/core/Badge-Label-Base'), { recursive: true });
      const a = assess(scratch, snapshotFetcher(scratch, { listed: THIRTY_EIGHT, available: [] }).fetcher, '14.1.0');
      expect(migrationLines(a)).toContain(
        cannotTellMessage('src/components/core/Button-Icon/', { kind: 'fetch-failed', version: condenseVersions(THIRTY_EIGHT) }),
      );
    });
  });

  test('(e) --migrate-components: forks relocated to src/components/<Name>/, unmodified removed, cannot-tell left, yours moved', async () => {
    setupPackage(scratch, { version: '15.0.0' });
    lockAt(scratch, '14.1.0');
    writeCopiesAt(scratch, '14.1.0');
    writeFile(scratch, 'src/components/core/Button-Icon/contracts.yaml', '# hers\n');
    writeFile(scratch, 'src/components/core/Nav-Header-App/tokens.ts', 'export const mine = 1;\n');
    const { fetcher } = snapshotFetcher(scratch);

    const out = await runSync({ projectRoot: scratch, isTTY: false, fetcher, migrateComponents: true });

    expect(out.relocation).toEqual({
      removed: ['Badge-Label-Base'],
      relocated: ['Button-Icon', 'Nav-Header-App'],
      skipped: [],
      leftInPlace: [],
    });
    expect(fs.existsSync(path.join(scratch, 'src/components/core'))).toBe(false);
    expect(readText(scratch, 'src/components/Button-Icon/contracts.yaml')).toBe('# hers\n');
    expect(readText(scratch, 'src/components/Nav-Header-App/tokens.ts')).toBe('export const mine = 1;\n');
  });

  test('nothing is removed without --migrate-components (dry-run and plain runs leave every copy)', async () => {
    setupPackage(scratch, { version: '15.0.0' });
    lockAt(scratch, '14.1.0');
    writeCopiesAt(scratch, '14.1.0');
    const { fetcher } = snapshotFetcher(scratch);
    await runSync({ projectRoot: scratch, apply: true, isTTY: false, fetcher });
    for (const n of COMPONENTS) expect(fs.existsSync(path.join(scratch, 'src/components/core', n))).toBe(true);
  });

  test('(f) the forks string, the yours line, and the Lina A5 notes name their files', async () => {
    setupPackage(scratch, { version: '15.0.0' });
    lockAt(scratch, '14.1.0');
    writeCopiesAt(scratch, '14.1.0');
    writeFile(scratch, 'src/components/core/Button-Icon/contracts.yaml', '# hers\n');
    writeFile(scratch, 'src/components/core/Nav-Header-App/tokens.ts', 'export const refs = { a: "color.primary" };\n');
    const { fetcher } = snapshotFetcher(scratch);

    const out = await runSync({ projectRoot: scratch, dryRun: true, fetcher });

    expect(con.output()).toContain(modifiedCopiesMessage(1, ['Button-Icon']));
    expect(con.output()).toContain(yoursUnderCoreMessage(1, ['Nav-Header-App']));
    expect(out.migration!.oldNameReferenceMaps).toEqual(['src/components/core/Nav-Header-App/tokens.ts']);
    expect(out.migration!.brandedTokenFiles).toEqual([
      'src/components/core/Badge-Label-Base/tokens.ts',
      'src/components/core/Button-Icon/buttonIcon.tokens.ts',
    ]);
    expect(con.output()).toContain(TOKEN_SIDE_SLOTS.oldNameReferenceMaps(out.migration!.oldNameReferenceMaps));
    expect(con.output()).toContain(TOKEN_SIDE_SLOTS.brandedTokenFiles(out.migration!.brandedTokenFiles));
    // Owner-neutral: Nav-Header-App is `kind: 'yours'`, not a DesignerPunk copy, yet its
    // tokens.ts is the sole entry in oldNameReferenceMaps here — the string must not call
    // the file "copied" (Lina's finding). brandedTokenFiles IS copy-scoped, so "copied" stays correct there.
    expect(TOKEN_SIDE_SLOTS.oldNameReferenceMaps(out.migration!.oldNameReferenceMaps)).not.toContain('copied reference map');
    expect(TOKEN_SIDE_SLOTS.brandedTokenFiles(out.migration!.brandedTokenFiles)).toContain('copied component token file');
  });

  describe('token-file detection (Lina A5; Ada\'s detection-rule finding)', () => {
    test('a defineComponentTokens mention ONLY in a comment does not read as branded (comments stripped first)', () => {
      writeCopiesAt(scratch, '14.1.0');
      writeFile(scratch, 'src/components/core/Badge-Label-Base/tokens.ts',
        '/* was: defineComponentTokens({...}) */\n// defineComponentTokens moved away\nexport const refs = { url: "https://x" };\n');
      const a = assess(scratch, snapshotFetcher(scratch).fetcher, '14.1.0');
      expect(a.oldNameReferenceMaps).toEqual(['src/components/core/Badge-Label-Base/tokens.ts']);
      expect(a.brandedTokenFiles).toEqual(['src/components/core/Button-Icon/buttonIcon.tokens.ts']);
    });

    test('stripComments blanks block and line comments but keeps "https://" inside strings', () => {
      expect(stripComments('a /* x */ b // y\nc = "https://z"')).toBe('a         b     \nc = "https://z"');
    });

    test('brandedTokenFiles is scoped to COPIES — a consumer-authored component\'s branded file is not listed', () => {
      writeCopiesAt(scratch, '14.1.0');
      writeFile(scratch, 'src/components/core/Nav-Header-App/nav.tokens.ts',
        "import { defineComponentTokens } from '@3fn/core/build';\nexport const t = defineComponentTokens({});\n");
      const a = assess(scratch, snapshotFetcher(scratch).fetcher, '14.1.0');
      expect(a.components.find((c) => c.name === 'Nav-Header-App')!.kind).toBe('yours');
      expect(a.brandedTokenFiles).toEqual([
        'src/components/core/Badge-Label-Base/tokens.ts',
        'src/components/core/Button-Icon/buttonIcon.tokens.ts',
      ]);
    });
  });

  describe('5.6 — repairs, offered only AFTER the migration fetch', () => {
    const PIN_NPMRC = '@3fn:registry=https://npm.pkg.github.com\n//npm.pkg.github.com/:_authToken=FIXTURE_NOT_A_TOKEN\nsave-exact=true\n';
    const OLD_TSCONFIG = {
      compilerOptions: {
        strict: true,
        baseUrl: '.',
        paths: {
          '@3fn/core/blend': ['./node_modules/@3fn/core/src/blend/index.ts'],
          '@3fn/core/build': ['./node_modules/@3fn/core/src/build/tokens/index.ts'],
          '@my/alias': ['./src/alias.ts'],
        },
      },
      include: ['src/**/*'],
    };
    function pinnedRepo() {
      setupPackage(scratch, { version: '15.0.0' });
      lockAt(scratch, '12.0.5');
      writeCopiesAt(scratch, '12.0.5');
      writeFile(scratch, '.npmrc', PIN_NPMRC);
      writeFile(scratch, 'tsconfig.test.json', JSON.stringify(OLD_TSCONFIG, null, 2) + '\n');
    }

    test('(d) the registry-pin repair is not offered before the fetch (trace order), with its named explanation', async () => {
      pinnedRepo();
      const { fetcher } = snapshotFetcher(scratch);
      const out = await runSync({ projectRoot: scratch, dryRun: true, fetcher });
      const firstFetch = out.trace.findIndex((e) => e.startsWith('fetch:'));
      const offered = out.trace.indexOf('repair-offered:npmrc');
      expect(firstFetch).toBeGreaterThanOrEqual(0);
      expect(offered).toBeGreaterThan(firstFetch);
      expect(out.trace.filter((e) => e.startsWith('fetch:')).every((_, i) => i < offered)).toBe(true);
      expect(con.output()).toContain(REGISTRY_PIN_MESSAGE);
      expect(con.output()).toContain(REGISTRY_PIN_ORDER_CAUTION);
      expect(con.output()).toContain(tsconfigPinMessage(['@3fn/core/blend', '@3fn/core/build']));
      expect(con.output()).not.toContain('FIXTURE_NOT_A_TOKEN');
      expect(readText(scratch, '.npmrc')).toBe(PIN_NPMRC);
    });

    test('nothing repairs without its flag — --apply alone leaves .npmrc and tsconfig.test.json', async () => {
      pinnedRepo();
      await runSync({ projectRoot: scratch, apply: true, isTTY: false, fetcher: snapshotFetcher(scratch).fetcher });
      expect(readText(scratch, '.npmrc')).toBe(PIN_NPMRC);
      expect(JSON.parse(readText(scratch, 'tsconfig.test.json'))).toEqual(OLD_TSCONFIG);
    });

    test('--repair-npmrc removes ONLY the mapping line; --repair-tsconfig removes ONLY the raw-src re-pins', async () => {
      pinnedRepo();
      const out = await runSync({ projectRoot: scratch, isTTY: false, fetcher: snapshotFetcher(scratch).fetcher, repairNpmrc: true, repairTsconfig: true });
      expect(out.trace.indexOf('repair-applied:npmrc')).toBeGreaterThan(out.trace.findIndex((e) => e.startsWith('fetch:')));
      expect(readText(scratch, '.npmrc')).toBe('//npm.pkg.github.com/:_authToken=FIXTURE_NOT_A_TOKEN\nsave-exact=true\n');
      const ts = JSON.parse(readText(scratch, 'tsconfig.test.json'));
      expect(ts.compilerOptions.paths).toEqual({ '@my/alias': ['./src/alias.ts'] });
      expect(ts.compilerOptions.baseUrl).toBe('.');
      expect(ts.compilerOptions.strict).toBe(true);
    });

    test('no copies left → no ordering caution; a JSONC tsconfig is reported, never rewritten', async () => {
      setupPackage(scratch, { version: '15.0.0' });
      writeFile(scratch, '.npmrc', PIN_NPMRC);
      const jsonc = '{\n  // mine\n  "compilerOptions": { "paths": { "@3fn/core/types": ["./node_modules/@3fn/core/src/types/index.ts"] } }\n}\n';
      writeFile(scratch, 'tsconfig.test.json', jsonc);
      const out = await runSync({ projectRoot: scratch, isTTY: false, repairTsconfig: true });
      expect(con.output()).toContain(REGISTRY_PIN_MESSAGE);
      expect(con.output()).not.toContain(REGISTRY_PIN_ORDER_CAUTION);
      expect(con.output()).toContain(TSCONFIG_UNPARSEABLE_MESSAGE);
      expect(readText(scratch, 'tsconfig.test.json')).toBe(jsonc);
      expect(out.trace).toEqual(['repair-offered:npmrc', 'repair-offered:tsconfig']);
    });
  });

  test('U2 (Task 16.5): the legacy manifest\'s copied agents/steering are REPORTED as legacy copies; with no attach step available, --migrate-legacy is NOT offered and nothing is removed (T-L1)', async () => {
    // Was U1's "retained until the next release" (LEGACY_AGENTS_RETAINED_MESSAGE, retired at 16.5): the next
    // release is here, and the offer is gated on attach. This fake package ships no agent-layer bundle.
    setupPackage(scratch, { version: '15.0.0' });
    writeFile(scratch, '.kiro/sync-manifest.json', JSON.stringify({ version: DP_LEGACY.version, syncedAt: DP_LEGACY.syncedAt, files: DP_LEGACY.files }));
    writeFile(scratch, '.kiro/steering/AI-Collaboration-Framework.md', '# copied\n');
    writeFile(scratch, '.kiro/agents/lina.json', '{}\n');
    const { fetcher } = snapshotFetcher(scratch);

    const out = await runSync({ projectRoot: scratch, dryRun: true, fetcher });

    const legacyCount = Object.keys(DP_LEGACY.files).filter((k: string) => k.startsWith('.kiro/agents/') || k.startsWith('.kiro/steering/')).length;
    expect(con.output()).toContain(legacyCopiesMessage(legacyCount, ['.kiro/agents', '.kiro/steering']));
    expect(out.attach?.available).toBe(false);
    expect(con.output()).toContain(migrateLegacyUnavailableMessage((out.attach as { reason: string }).reason));
    expect(con.output()).not.toContain('sync --migrate-legacy');
    const migrationSection = con.output().split('Migrating from a pre-123 install:')[1]?.split('\n\n')[0] ?? '';
    expect(migrationSection).not.toMatch(/--migrate-legacy|remove them|delete/i);
  });
});
