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
import {
  STEWARD_REPO_MESSAGE,
  OFF_TTY_REPORT_ONLY_MESSAGE,
  OFF_TTY_PARTIAL_MESSAGE,
  ALL_CLEAR_MESSAGE,
  PRE_APPLY_REPORT_NOTE,
  notAllClearMessage,
  resultLines,
} from '../sync/Reporter';
import { legacyCopiesMessage } from '../sync/Migration';
import { restartLineSequencedMessage } from '../shared/errorCatalog';
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
  stubAgentLayer,
} from './syncTestKit';

// Task 16.5: the file-grain vehicle is a GENERATED agent file (the release-1 copy roots are no longer
// managed — C7, gate 4b). The package side comes through sync's agent-layer seam.
const DOC = '.claude/agents/doc.md';
const MINE = '.claude/agents/mine.md';

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
    const pkgDir = setupPackage(scratch);
    birthKeys(scratch, pkgDir, {}, { [DOC]: { hash: sha('v1\n'), grain: 'file', origin: 'generated' } });
    writeFile(scratch, DOC, 'v1\n'); // updated-safe pending
    setTools(pkgDir, { ...BASE_TOOLS, 'designerpunk-product': [{ name: 'get_screen', readOnlyHint: true }, { name: 'list_screens', readOnlyHint: true }] });
    writeFile(scratch, LEGACY_MANIFEST_PATH, JSON.stringify({ version: '12.0.3', files: {} })); // a stray legacy file too
    const before = dirHash(scratch);
    expect(before.files).toBeGreaterThanOrEqual(6);

    const out = await runSync({ projectRoot: scratch, isTTY: false, agentLayer: stubAgentLayer({ cc: [{ path: DOC, content: 'v2\n' }] }) });

    expect(out.stopped).toBe('off-tty');
    expect(con.output()).toContain(OFF_TTY_REPORT_ONLY_MESSAGE);
    expect(con.output()).toMatch(/Updated in the package, unchanged by you[\s\S]*\.claude\/agents\/doc\.md/);
    expect(dirHash(scratch)).toEqual(before);
    expect(out.applied).toHaveLength(0);
  });

  describe('apply behavior', () => {
    const agentLayer = stubAgentLayer({ cc: [{ path: DOC, content: 'v2\n' }, { path: MINE, content: 'pkg\n' }] });
    function pending() {
      const pkgDir = setupPackage(scratch);
      birthKeys(scratch, pkgDir, {}, {
        [DOC]: { hash: sha('v1\n'), grain: 'file', origin: 'generated' },
        [MINE]: { hash: sha('orig\n'), grain: 'file', origin: 'generated' },
      });
      writeFile(scratch, DOC, 'v1\n'); // updated-safe
      writeFile(scratch, MINE, 'hers\n'); // conflict
    }

    test('terminal: the report prints BEFORE the confirmation; declining applies nothing', async () => {
      pending();
      const before = dirHash(scratch);
      let reportAtConfirm = '';
      const out = await runSync({
        projectRoot: scratch,
        isTTY: true,
        agentLayer,
        confirm: async () => {
          reportAtConfirm = con.output();
          return false;
        },
      });
      expect(reportAtConfirm).toMatch(/Updated in the package, unchanged by you[\s\S]*\.claude\/agents\/doc\.md/);
      expect(out.stopped).toBe('declined');
      expect(dirHash(scratch)).toEqual(before);
    });

    test('terminal: confirming applies updated-safe, never the conflict', async () => {
      pending();
      const out = await runSync({ projectRoot: scratch, isTTY: true, agentLayer, confirm: async () => true });
      expect(out.applied).toEqual([DOC]);
      expect(readText(scratch, DOC)).toBe('v2\n');
      expect(readText(scratch, MINE)).toBe('hers\n');
    });

    test('a conflict applies only with --overwrite <path>; the manifest records the bytes written', async () => {
      pending();
      const out = await runSync({ projectRoot: scratch, apply: true, isTTY: false, agentLayer, overwrite: [MINE] });
      expect(out.applied.sort()).toEqual([DOC, MINE]);
      expect(readText(scratch, MINE)).toBe('pkg\n');
      const m = parseManifest(readText(scratch, MANIFEST_FILE));
      expect(m.entries[MINE]).toEqual({ hash: sha('pkg\n'), grain: 'file', origin: 'generated' });
    });

    test('flag parsing: --migrate-legacy and --target (both forms) (Task 16.5)', () => {
      expect(parseSyncArgs(['--migrate-legacy', '--target=kiro', '--target', 'cc'])).toEqual({
        restore: [],
        overwrite: [],
        migrateLegacy: true,
        targets: ['kiro', 'cc'],
      });
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
      const out = await runSync({ projectRoot: scratch, isTTY: false, agentLayer, ...parseSyncArgs(['--force']) });
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
      // R4: the old file is CONVERTED and KEPT (its content intact), and every message says exactly that — none says "moves".
      const legacyAfter = JSON.parse(readText(scratch, LEGACY_MANIFEST_PATH));
      expect(legacyAfter.version).toBe('12.0.3');
      expect(Object.keys(legacyAfter.files)).toEqual(['.kiro/steering/Doc.md', 'src/tokens/A.ts']);
      expect(con.output()).toContain(
        `found the pre-123 manifest ${LEGACY_MANIFEST_PATH} (last synced at 12.0.3) — when changes apply, sync converts it to ${MANIFEST_FILE} at the repo root and keeps the old file, with a note saying so`,
      );
      expect(con.output()).toContain(`${MANIFEST_FILE} written from ${LEGACY_MANIFEST_PATH}; the old file is kept, with a note saying when you can delete it`);
      expect(con.output()).not.toMatch(/\bmoves? to\b/);
      expect(LEGACY_POINTER_TEXT).not.toMatch(/\bmoved\b|no longer read\b/);
      expect(LEGACY_POINTER_TEXT).toMatch(/^converted to designerpunk\.manifest\.json/);

      const before = dirHash(scratch);
      const second = await runSync({ projectRoot: scratch, apply: true, isTTY: false });
      expect(second.manifestWritten).toBe(false);
      expect(dirHash(scratch)).toEqual(before);
    });
  });

  describe('R4 — the report before, the result after, and the all-clear only when nothing is pending (test01 F-9)', () => {
    const PIN_NPMRC = '@3fn:registry=https://npm.pkg.github.com\n';
    const OLD_TSCONFIG = { compilerOptions: { paths: { '@3fn/core/build': ['./node_modules/@3fn/core/src/build/tokens/index.ts'] } } };
    const noAgents = stubAgentLayer({});
    function bornRepo(opts: { pins?: boolean; docPending?: boolean } = {}) {
      const pkgDir = setupPackage(scratch);
      birthKeys(scratch, pkgDir, {}, opts.docPending ? { [DOC]: { hash: sha('v1\n'), grain: 'file', origin: 'generated' } } : {});
      if (opts.docPending) writeFile(scratch, DOC, 'v1\n');
      if (opts.pins) {
        writeFile(scratch, '.npmrc', PIN_NPMRC);
        writeFile(scratch, 'tsconfig.test.json', JSON.stringify(OLD_TSCONFIG, null, 2) + '\n');
      }
    }
    const REPAIRS = ['the .npmrc repair (--repair-npmrc)', 'the tsconfig.test.json repair'];

    test('a clean repo: the all-clear', async () => {
      bornRepo();
      await runSync({ projectRoot: scratch, isTTY: false, agentLayer: noAgents });
      expect(con.output()).toContain(ALL_CLEAR_MESSAGE);
    });

    test('on a terminal, a run with nothing to apply is NOT headed as a before state (Ada, review item 3); one with work is', async () => {
      bornRepo();
      await runSync({ projectRoot: scratch, isTTY: true, agentLayer: noAgents, confirm: async () => false });
      expect(con.output()).not.toContain(PRE_APPLY_REPORT_NOTE);
      expect(con.output()).toContain(ALL_CLEAR_MESSAGE);
    });

    test('on a terminal, a run with a managed update to apply IS headed as a before state', async () => {
      bornRepo({ docPending: true });
      await runSync({ projectRoot: scratch, isTTY: true, agentLayer: stubAgentLayer({ cc: [{ path: DOC, content: 'v2\n' }] }), confirm: async () => false });
      expect(con.output()).toContain(PRE_APPLY_REPORT_NOTE);
    });

    test('report only (no --apply): repairs still offered → never the all-clear; the closing line names what is pending', async () => {
      bornRepo({ pins: true });
      const out = await runSync({ projectRoot: scratch, isTTY: false, agentLayer: noAgents });
      expect(out.report[out.report.length - 1]).toBe(notAllClearMessage(REPAIRS));
      expect(con.output()).not.toContain(ALL_CLEAR_MESSAGE);
      expect(con.output()).not.toContain(PRE_APPLY_REPORT_NOTE); // nothing can apply off a terminal without a flag
    });

    test('dry-run with legacy copies pending: never the all-clear', async () => {
      setupPackage(scratch, { files: { '.kiro/steering/Doc.md': 'same\n' } });
      writeFile(scratch, '.kiro/steering/Doc.md', 'same\n');
      writeFile(scratch, LEGACY_MANIFEST_PATH, JSON.stringify({ version: '12.0.3', files: { '.kiro/steering/Doc.md': { hash: sha('same\n'), managed: true } } }));
      await runSync({ projectRoot: scratch, dryRun: true, isTTY: false });
      expect(con.output()).not.toContain(ALL_CLEAR_MESSAGE);
      expect(con.output()).toContain('1 legacy copy from an earlier init (--migrate-legacy)');
      expect(con.output()).toContain(`converting ${LEGACY_MANIFEST_PATH} to ${MANIFEST_FILE}`);
    });

    test('an apply run: the report is headed as the BEFORE state, the result follows it, and the closing reflects what is left', async () => {
      bornRepo({ pins: true });
      await runSync({ projectRoot: scratch, isTTY: false, apply: true, repairTsconfig: true, agentLayer: noAgents });
      const outText = con.output();
      const result = resultLines(['tsconfig.test.json: removed the raw-src @3fn/core paths entries'], ['the .npmrc repair (--repair-npmrc)']).join('\n');
      expect(outText).toContain(PRE_APPLY_REPORT_NOTE);
      expect(outText).toContain(result);
      expect(outText.indexOf(PRE_APPLY_REPORT_NOTE)).toBeLessThan(outText.indexOf(notAllClearMessage(REPAIRS)));
      expect(outText.indexOf(notAllClearMessage(REPAIRS))).toBeLessThan(outText.indexOf(result));
      expect(outText.trimEnd().endsWith('✅ Sync complete.')).toBe(true);
      expect(outText).not.toContain(ALL_CLEAR_MESSAGE);
    });

    test('an apply run that clears everything: the report before still says pending; the result after says up to date', async () => {
      bornRepo({ pins: true });
      await runSync({ projectRoot: scratch, isTTY: false, apply: true, repairNpmrc: true, repairTsconfig: true, agentLayer: noAgents });
      const outText = con.output();
      expect(outText).toContain(notAllClearMessage(REPAIRS));
      expect(outText).toContain(
        resultLines(['.npmrc: removed the @3fn → GitHub Packages mapping line', 'tsconfig.test.json: removed the raw-src @3fn/core paths entries'], []).join('\n'),
      );
      expect(outText.trimEnd().endsWith('✅ Sync complete. Everything DesignerPunk manages is up to date.')).toBe(true);
    });

    test('off a terminal without --apply, after a flag ran its own step: never "nothing was changed"', async () => {
      bornRepo({ pins: true, docPending: true });
      const out = await runSync({ projectRoot: scratch, isTTY: false, repairTsconfig: true, agentLayer: stubAgentLayer({ cc: [{ path: DOC, content: 'v2\n' }] }) });
      expect(out.stopped).toBe('off-tty');
      expect(con.output()).toContain(OFF_TTY_PARTIAL_MESSAGE);
      expect(con.output()).not.toContain(OFF_TTY_REPORT_ONLY_MESSAGE);
      expect(con.output()).toContain('1 managed update (--apply)');
      expect(readText(scratch, DOC)).toBe('v1\n');
    });

    test('--migrate-legacy: the report before lists the copies (no all-clear); the result after names the removal, the attach and the manifest', async () => {
      // A born repo with the real package installed (its built agent-layer lane), one release-1 copy recorded.
      writeFile(scratch, 'src/tokens/index.ts', '\nexport function getAllPrimitiveTokens() { return []; }\n');
      writeFile(scratch, 'src/tokens/semantic/index.ts', '\nexport function getAllSemanticTokens() { return []; }\n');
      writeFile(scratch, 'designerpunk.config.ts', `export default { name: 'R4Fixture', abbreviation: 'RF', tokenSource: './src/tokens' };\n`);
      fs.mkdirSync(path.join(scratch, '.git'));
      fs.mkdirSync(path.join(scratch, 'node_modules/@3fn'), { recursive: true });
      fs.symlinkSync(REPO_ROOT, path.join(scratch, 'node_modules/@3fn/core'), 'dir');
      const copy = '.kiro/steering/Old-Copy.md';
      writeFile(scratch, copy, 'copied\n');
      writeFile(scratch, MANIFEST_FILE, serializeManifest({
        version: '1',
        posture: 'born',
        installedVersion: '14.1.0',
        contractHash: '',
        attachedTargets: [],
        entries: { [copy]: { hash: sha('copied\n'), grain: 'file', origin: 'copy' } },
      }));

      const out = await runSync({ projectRoot: scratch, isTTY: false, migrateLegacy: true, targets: ['cc'] });

      expect(out.trace).toContain('attach:cc');
      const outText = con.output();
      const resultAt = outText.indexOf('📋 Result of this run:');
      expect(resultAt).toBeGreaterThan(0);
      const before = outText.slice(0, resultAt);
      const after = outText.slice(resultAt);
      expect(before).toContain(PRE_APPLY_REPORT_NOTE);
      expect(before).toContain(legacyCopiesMessage(1, ['.kiro/steering']));
      expect(before).not.toContain(ALL_CLEAR_MESSAGE);
      expect(after).toContain('✓ legacy copies: removed 1 unmodified');
      expect(after).toContain('✓ attached cc');
      expect(after).toContain(`✓ ${MANIFEST_FILE} updated`);
      expect(after.indexOf('✅ Sync complete.')).toBeLessThan(after.indexOf(restartLineSequencedMessage()));
      expect(fs.existsSync(path.join(scratch, copy))).toBe(false);
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
