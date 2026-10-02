/**
 * @category evergreen
 * @purpose Spec 123 Task 5 — `sync` end to end (re-scoped from Spec 111):
 *  - OURS NEVER FLOWS INTO THEIRS: an unedited copied token file under a newer
 *    package is byte-unchanged after `sync --apply`; a deleted token file is not
 *    re-added (Req 5.8) — asserted as a directory hash, not a managed-list diff;
 *  - NO CLASS APPLIES WITHOUT THE REPORT FIRST: off a terminal without --apply,
 *    zero files change (whole-repo directory hash);
 *  - apply behavior: terminal confirmation, --apply, --overwrite, --restore;
 *  - manifest relocation from the legacy path, and stability on re-run;
 *  - init → sync is a no-op (init's recorded hashes are what sync compares);
 *  - the steward exemption (found-not-fixed item 5);
 *  - `generate`'s token-tier load stays green after the `src/types` pruning.
 */

import * as fs from 'fs';
import * as path from 'path';
import { runSync, parseSyncArgs } from '../sync';
import { runInit } from '../init';
import { resolveTokens } from '../resolveTokens';
import { LEGACY_MANIFEST_PATH, LEGACY_POINTER_TEXT, MANIFEST_FILE, serializeManifest, parseManifest } from '../sync/Manifest';
import { STEWARD_REPO_MESSAGE, OFF_TTY_REPORT_ONLY_MESSAGE } from '../sync/Reporter';
import {
  REPO_ROOT,
  createScratch,
  setupPackage,
  setTools,
  birthKeys,
  writeFile,
  readText,
  captureConsole,
  dirHash,
  sha,
  BASE_TOOLS,
} from './syncTestKit';

const OLD_COLOR = 'export const color = "old";\n';
const NEW_COLOR = 'export const color = "new";\n';

function copyTree(fromAbs: string, toAbs: string, skipDirs: string[] = []): number {
  let n = 0;
  for (const e of fs.readdirSync(fromAbs, { withFileTypes: true })) {
    if (skipDirs.includes(e.name)) continue;
    const s = path.join(fromAbs, e.name);
    const d = path.join(toAbs, e.name);
    if (e.isDirectory()) n += copyTree(s, d, skipDirs);
    else if (e.isFile()) {
      fs.mkdirSync(path.dirname(d), { recursive: true });
      fs.copyFileSync(s, d);
      n++;
    }
  }
  return n;
}

describe('sync — end to end (Task 5)', () => {
  let scratch: string;
  let con: ReturnType<typeof captureConsole>;
  beforeEach(() => {
    scratch = createScratch('dp-sync-e2e-');
    con = captureConsole();
  });
  afterEach(() => {
    con.restore();
    fs.rmSync(scratch, { recursive: true, force: true });
  });

  describe('ours never flows into theirs (Req 5.8)', () => {
    function tokenFixture() {
      setupPackage(scratch, {
        version: '15.0.0',
        files: {
          'src/tokens/semantic/ColorTokens.ts': NEW_COLOR,
          'src/tokens/SpacingTokens.ts': 'export const spacing = 2;\n',
          'src/tokens/BrandNew.ts': 'export const brandNew = 1;\n',
        },
      });
      writeFile(scratch, 'src/tokens/semantic/ColorTokens.ts', OLD_COLOR); // unedited copy of an older package
      // SpacingTokens.ts: deleted by her. BrandNew.ts: never had it.
    }

    test('born manifest: unedited copied token file → byte-unchanged; deleted token file → not re-added', async () => {
      tokenFixture();
      const pkgDir = path.join(scratch, 'node_modules/@3fn/core');
      birthKeys(scratch, pkgDir);
      const before = dirHash(scratch, 'src/tokens');
      expect(before.files).toBe(1);

      await runSync({ projectRoot: scratch, apply: true, isTTY: false });

      expect(dirHash(scratch, 'src/tokens')).toEqual(before);
      expect(readText(scratch, 'src/tokens/semantic/ColorTokens.ts')).toBe(OLD_COLOR);
      expect(fs.existsSync(path.join(scratch, 'src/tokens/SpacingTokens.ts'))).toBe(false);
      expect(fs.existsSync(path.join(scratch, 'src/tokens/BrandNew.ts'))).toBe(false);
    });

    test('legacy manifest that recorded the token tier: still byte-unchanged, still not re-added', async () => {
      tokenFixture();
      writeFile(scratch, LEGACY_MANIFEST_PATH, JSON.stringify({
        version: '12.0.3',
        syncedAt: '2026-06-11T02:46:38.045Z',
        files: {
          'src/tokens/semantic/ColorTokens.ts': { hash: sha(OLD_COLOR), managed: false },
          'src/tokens/SpacingTokens.ts': { hash: sha('export const spacing = 1;\n'), managed: false },
        },
      }));
      const before = dirHash(scratch, 'src/tokens');

      await runSync({ projectRoot: scratch, apply: true, isTTY: false });

      expect(dirHash(scratch, 'src/tokens')).toEqual(before);
      expect(fs.existsSync(path.join(scratch, 'src/tokens/SpacingTokens.ts'))).toBe(false);
    });
  });

  test('NO CLASS APPLIES WITHOUT THE REPORT FIRST — off a terminal without --apply, zero files change', async () => {
    const pkgDir = setupPackage(scratch, { files: { '.kiro/steering/Doc.md': 'v2\n' } });
    birthKeys(scratch, pkgDir, {}, { '.kiro/steering/Doc.md': { hash: sha('v1\n'), grain: 'file', origin: 'copy' } });
    writeFile(scratch, '.kiro/steering/Doc.md', 'v1\n'); // updated-safe pending
    setTools(pkgDir, { ...BASE_TOOLS, 'designerpunk-product': [{ name: 'get_screen', readOnlyHint: true }, { name: 'list_screens', readOnlyHint: true }] });
    writeFile(scratch, LEGACY_MANIFEST_PATH, JSON.stringify({ version: '12.0.3', files: {} })); // a stray legacy file too
    const before = dirHash(scratch);
    expect(before.files).toBeGreaterThanOrEqual(6);

    const out = await runSync({ projectRoot: scratch, isTTY: false });

    expect(out.stopped).toBe('off-tty');
    expect(con.output()).toContain(OFF_TTY_REPORT_ONLY_MESSAGE);
    expect(con.output()).toMatch(/Updated in the package, unchanged by you/);
    expect(dirHash(scratch)).toEqual(before);
    expect(out.applied).toHaveLength(0);
  });

  describe('apply behavior', () => {
    function pending() {
      const pkgDir = setupPackage(scratch, { files: { '.kiro/steering/Doc.md': 'v2\n', '.kiro/steering/Mine.md': 'pkg\n' } });
      birthKeys(scratch, pkgDir, {}, {
        '.kiro/steering/Doc.md': { hash: sha('v1\n'), grain: 'file', origin: 'copy' },
        '.kiro/steering/Mine.md': { hash: sha('orig\n'), grain: 'file', origin: 'copy' },
      });
      writeFile(scratch, '.kiro/steering/Doc.md', 'v1\n'); // updated-safe
      writeFile(scratch, '.kiro/steering/Mine.md', 'hers\n'); // conflict
    }

    test('terminal: the report prints BEFORE the confirmation; declining applies nothing', async () => {
      pending();
      const before = dirHash(scratch);
      let reportAtConfirm = '';
      const out = await runSync({
        projectRoot: scratch,
        isTTY: true,
        confirm: async () => {
          reportAtConfirm = con.output();
          return false;
        },
      });
      expect(reportAtConfirm).toMatch(/Updated in the package, unchanged by you[\s\S]*\.kiro\/steering\/Doc\.md/);
      expect(out.stopped).toBe('declined');
      expect(dirHash(scratch)).toEqual(before);
    });

    test('terminal: confirming applies updated-safe, never the conflict', async () => {
      pending();
      const out = await runSync({ projectRoot: scratch, isTTY: true, confirm: async () => true });
      expect(out.applied).toEqual(['.kiro/steering/Doc.md']);
      expect(readText(scratch, '.kiro/steering/Doc.md')).toBe('v2\n');
      expect(readText(scratch, '.kiro/steering/Mine.md')).toBe('hers\n');
    });

    test('a conflict applies only with --overwrite <path>; the manifest records the bytes written', async () => {
      pending();
      const out = await runSync({ projectRoot: scratch, apply: true, isTTY: false, overwrite: ['.kiro/steering/Mine.md'] });
      expect(out.applied.sort()).toEqual(['.kiro/steering/Doc.md', '.kiro/steering/Mine.md']);
      expect(readText(scratch, '.kiro/steering/Mine.md')).toBe('pkg\n');
      const m = parseManifest(readText(scratch, MANIFEST_FILE));
      expect(m.entries['.kiro/steering/Mine.md'].hash).toBe(sha('pkg\n'));
    });

    test('flag parsing: --apply, --dry-run, --restore/--overwrite (both forms), retired --force', () => {
      expect(parseSyncArgs(['--apply', '--restore', 'a', '--overwrite=b', '--restore=c', '--force', '--dry-run'])).toEqual({
        apply: true,
        dryRun: true,
        retiredForce: true,
        restore: ['a', 'c'],
        overwrite: ['b'],
      });
    });

    test('the retired --force applies nothing on its own', async () => {
      pending();
      const before = dirHash(scratch);
      const out = await runSync({ projectRoot: scratch, isTTY: false, ...parseSyncArgs(['--force']) });
      expect(out.stopped).toBe('off-tty');
      expect(dirHash(scratch)).toEqual(before);
    });
  });

  describe('manifest relocation', () => {
    test('legacy → root manifest (one entry per line), pointer left in the old file; the next run writes nothing', async () => {
      setupPackage(scratch, { files: { '.kiro/steering/Doc.md': 'same\n' } });
      writeFile(scratch, '.kiro/steering/Doc.md', 'same\n');
      writeFile(scratch, LEGACY_MANIFEST_PATH, JSON.stringify({
        version: '12.0.3',
        files: { '.kiro/steering/Doc.md': { hash: sha('same\n'), managed: true }, 'src/tokens/A.ts': { hash: 'x', managed: false } },
      }));

      const first = await runSync({ projectRoot: scratch, apply: true, isTTY: false });
      expect(first.manifestWritten).toBe(true);
      const text = readText(scratch, MANIFEST_FILE);
      expect(serializeManifest(parseManifest(text))).toBe(text);
      expect(parseManifest(text).entries).toEqual({ '.kiro/steering/Doc.md': { hash: sha('same\n'), grain: 'file', origin: 'copy' } });
      expect(JSON.parse(readText(scratch, LEGACY_MANIFEST_PATH))['//']).toBe(LEGACY_POINTER_TEXT);

      const before = dirHash(scratch);
      const second = await runSync({ projectRoot: scratch, apply: true, isTTY: false });
      expect(second.manifestWritten).toBe(false);
      expect(dirHash(scratch)).toEqual(before);
    });
  });

  describe('init → sync', () => {
    test('a freshly born repo syncs as a no-op: zero files change (init records exactly what sync compares)', async () => {
      fs.mkdirSync(path.join(scratch, '.git'));
      fs.mkdirSync(path.join(scratch, 'node_modules/@3fn'), { recursive: true });
      fs.symlinkSync(REPO_ROOT, path.join(scratch, 'node_modules/@3fn/core'), 'dir');
      const cwd = process.cwd();
      const exit = jest.spyOn(process, 'exit').mockImplementation((() => undefined) as never);
      process.chdir(scratch);
      try {
        await runInit(['--name', 'Test', '--abbreviation', 'T']);
      } finally {
        process.chdir(cwd);
        exit.mockRestore();
      }
      const m = parseManifest(readText(scratch, MANIFEST_FILE));
      const keyEntries = Object.keys(m.entries).filter((k) => k.includes('#'));
      expect(keyEntries.some((k) => k.startsWith('.claude/settings.json#mcp__designerpunk-'))).toBe(true);
      // Task 16.3: `init` no longer COPIES agents/steering/governance (C1 rows 6/7/7b REMOVED) — its agent layer is
      // generated (`origin: 'generated'`). The no-op property below is unchanged; only the copy premise is retired.
      expect(Object.values(m.entries).filter((e) => e.origin === 'copy')).toEqual([]);
      expect(Object.values(m.entries).filter((e) => e.origin === 'generated').length).toBeGreaterThan(0);
      const before = dirHash(scratch);

      const out = await runSync({ projectRoot: scratch, apply: true, isTTY: false });

      expect(out.applied).toEqual([]);
      expect(out.manifestWritten).toBe(false);
      expect(dirHash(scratch)).toEqual(before);
    });
  });

  describe('the steward exemption (found-not-fixed item 5)', () => {
    test('in THIS repo, sync stops before reading or writing — .kiro/sync-manifest.json is left untouched', async () => {
      const legacy = path.join(REPO_ROOT, LEGACY_MANIFEST_PATH);
      const before = fs.readFileSync(legacy);
      const out = await runSync({ projectRoot: REPO_ROOT, dryRun: true, isTTY: false });
      expect(out.stopped).toBe('steward');
      expect(con.output()).toContain(STEWARD_REPO_MESSAGE);
      expect(fs.readFileSync(legacy).equals(before)).toBe(true);
      expect(fs.existsSync(path.join(REPO_ROOT, MANIFEST_FILE))).toBe(false);
    });

    test('a package root that IS the project root is never relocated, even with --apply', async () => {
      fs.writeFileSync(path.join(scratch, 'package.json'), JSON.stringify({ name: '@3fn/core', version: '15.0.0' }));
      fs.mkdirSync(path.join(scratch, 'node_modules/@3fn'), { recursive: true });
      fs.symlinkSync(scratch, path.join(scratch, 'node_modules/@3fn/core'), 'dir');
      writeFile(scratch, LEGACY_MANIFEST_PATH, JSON.stringify({ version: '12.0.2', files: { '.kiro/steering/A.md': { hash: 'h', managed: true } } }));
      const before = dirHash(scratch);
      const out = await runSync({ projectRoot: scratch, apply: true, isTTY: false });
      expect(out.stopped).toBe('steward');
      expect(dirHash(scratch)).toEqual(before);
    });
  });

  describe('generate after the src/types pruning (Ada D-T-A5)', () => {
    // The token-tier LOAD phase of generate (resolveTokens: barrel contract + the full tier
    // through its relative ../types imports), via resolveTokens' injectable loader so Jest's
    // own TS transform loads the scratch tier (tsx's scoped require does not run under Jest).
    // Scope (R26.8): the load phase only — not platform emission.
    const jestLoad = (spec: string) => {
      jest.resetModules();
      return require(spec);
    };
    function legacyTier(): number {
      setupPackage(scratch);
      const n =
        copyTree(path.join(REPO_ROOT, 'src/tokens'), path.join(scratch, 'src/tokens'), ['__tests__', 'component']) +
        copyTree(path.join(REPO_ROOT, 'src/types'), path.join(scratch, 'src/types'), ['__tests__']);
      writeFile(scratch, LEGACY_MANIFEST_PATH, JSON.stringify({
        version: '12.0.3',
        files: {
          'src/types/PrimitiveToken.ts': { hash: 'x', managed: false },
          'src/types/SemanticToken.ts': { hash: 'y', managed: false },
          'src/tokens/index.ts': { hash: 'z', managed: false },
        },
      }));
      return n;
    }

    test('after sync prunes src/types, the files are still on disk and the token tier still loads through ../types', async () => {
      expect(legacyTier()).toBeGreaterThan(20);
      const typesBefore = dirHash(scratch, 'src/types');
      await runSync({ projectRoot: scratch, apply: true, isTTY: false });
      expect(con.output()).toMatch(/no longer managing 2 files under src\/types .*relative \.\.\/types/);
      expect(dirHash(scratch, 'src/types')).toEqual(typesBefore);
      const tokens = resolveTokens({ tokenSourceRoot: path.join(scratch, 'src/tokens') } as never, jestLoad);
      expect(tokens.primitiveTokens.length).toBeGreaterThan(0);
      expect(tokens.semanticTokens.length).toBeGreaterThan(0);
    });

    test('bite, kept standing: without src/types the same tier does NOT load (the check is sensitive to it)', async () => {
      legacyTier();
      fs.rmSync(path.join(scratch, 'src/types'), { recursive: true });
      expect(() => resolveTokens({ tokenSourceRoot: path.join(scratch, 'src/tokens') } as never, jestLoad)).toThrow(/Cannot find module '\.\.\/types/);
    });
  });
});
