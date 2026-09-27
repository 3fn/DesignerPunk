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
  LEGACY_AGENTS_RETAINED_MESSAGE,
  TOKEN_SIDE_SLOTS,
  compareVersions,
} from '../sync/Migration';
import type { PackageFetcher, MigrationAssessment } from '../sync/Migration';
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
function snapshotFetcher(scratch: string, opts: { listed?: string[] | null; available?: string[] } = {}) {
  const listed = opts.listed === undefined ? Object.keys(SNAP.versions) : opts.listed;
  const available = new Set(opts.available ?? Object.keys(SNAP.versions));
  const calls: string[] = [];
  const fetcher: PackageFetcher = {
    listVersions: () => (listed ? [...listed] : null),
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
  return { fetcher, calls };
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
    test('offline: the version list cannot be read → every component cannot-tell, with the catalog string', async () => {
      setupPackage(scratch, { version: '15.0.0' });
      lockAt(scratch, '12.0.5');
      writeCopiesAt(scratch, '12.0.5');
      const { fetcher, calls } = snapshotFetcher(scratch, { listed: null });
      const out = await runSync({ projectRoot: scratch, dryRun: true, fetcher });
      expect(out.migration!.components.map((c) => c.verdict)).toEqual(['cannot-tell', 'cannot-tell']);
      expect(calls).toHaveLength(0);
      for (const n of COMPONENTS) expect(con.output()).toContain(cannotTellMessage(`src/components/core/${n}/`, '12.0.5'));
    });

    test('the public rail (npmjs: 13.0.0/14.0.0/14.1.0 only) for an 11.2.1-era copy → cannot-tell, not modified', () => {
      writeCopiesAt(scratch, PRE_104);
      const { fetcher } = snapshotFetcher(scratch, { available: ['13.0.0', '14.0.0', '14.1.0'] });
      const a = assess(scratch, fetcher, '14.1.0');
      expect(a.failed).toEqual(['12.0.5', '11.3.0', '11.2.1']);
      const bi = a.components.find((c) => c.name === 'Button-Icon')!;
      expect(bi.files.find((f) => f.file === 'contracts.yaml')!.verdict).toBe('cannot-tell');
      expect(bi.verdict).toBe('cannot-tell');
    });

    test('installed version unknown (no manifest installedVersion, no lockfile) → cannot-tell', () => {
      writeCopiesAt(scratch, '14.1.0');
      const { fetcher, calls } = snapshotFetcher(scratch);
      const a = assess(scratch, fetcher, null);
      expect(a.components.every((c) => c.verdict === 'cannot-tell')).toBe(true);
      expect(calls).toHaveLength(0);
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
  });

  test('U1 RETAINS copied agents, steering and governance — string-equal, and no removal is offered (T-L1)', async () => {
    setupPackage(scratch, { version: '15.0.0' });
    writeFile(scratch, '.kiro/sync-manifest.json', JSON.stringify({ version: DP_LEGACY.version, syncedAt: DP_LEGACY.syncedAt, files: DP_LEGACY.files }));
    writeFile(scratch, '.kiro/steering/AI-Collaboration-Framework.md', '# copied\n');
    writeFile(scratch, '.kiro/agents/lina.json', '{}\n');
    const { fetcher } = snapshotFetcher(scratch);

    await runSync({ projectRoot: scratch, dryRun: true, fetcher });

    expect(LEGACY_AGENTS_RETAINED_MESSAGE).toBe(
      'your copied DesignerPunk agents, steering and governance files (.kiro/agents, .kiro/steering, governance) are retained until the next release — nothing to do for them now.',
    );
    expect(con.output()).toContain(LEGACY_AGENTS_RETAINED_MESSAGE);
    const migrationSection = con.output().split('Migrating from a pre-123 install:')[1] ?? '';
    expect(migrationSection).not.toMatch(/--migrate-legacy|remove them|delete/i);
  });
});
