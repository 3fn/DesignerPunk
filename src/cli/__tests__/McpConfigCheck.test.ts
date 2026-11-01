/**
 * @category evergreen
 * @purpose `sync`'s pre-123 MCP-config check and `--repair-mcp-config`
 * (`.kiro/issues/2026-10-24-migrated-mcp-config-keeps-pre-123-components-dir.md`, option 3):
 *  - (a) a migrated repo whose Kiro config still points `COMPONENTS_DIR` / `COMPONENT_DIR` at the deleted
 *    `src/components/core/` is reported, and the closing line is not the all-clear (the pending label);
 *  - (b) a stale `autoApprove` (a tool no server provides; `find_docs` missing) is reported and pending;
 *  - (c) the flag rewrites only those keys: every other server and key deep-equals its pre-repair value;
 *  - (d) without the flag, zero bytes change;
 *  - (e) a relative value is resolved against the project root;
 *  plus: recorded entries are KeyGrain's and are skipped; an unreadable template gives no recommendation and
 *  no repair; after the repair the manifest is unchanged (the entry stays unrecorded); the steering check and
 *  this one read the same candidate list, `.mcp.json` included.
 */
import * as fs from 'fs';
import * as path from 'path';
import { runSync, parseSyncArgs } from '../sync';
import { ALL_CLEAR_MESSAGE } from '../sync/Reporter';
import { MANIFEST_FILE, parseManifest, serializeManifest } from '../sync/Manifest';
import { MCP_CONFIG_CANDIDATES } from '../sync/mcpConfigCandidates';
import { detectStaleSteeringDir } from '../sync/SteeringDirCheck';
import {
  applyMcpConfigRepair,
  detectStaleMcpConfig,
  isRepairable,
  staleMcpConfigLines,
} from '../sync/McpConfigCheck';
import type { AutoApproveFinding, ComponentRootFinding } from '../sync/McpConfigCheck';
import {
  REPO_ROOT,
  birthKeys,
  captureConsole,
  createScratch,
  readJson,
  readText,
  setupPackage,
  sha,
  stubAgentLayer,
  writeFile,
} from './syncTestKit';

const KIRO = '.kiro/settings/mcp.json';
const APP = 'designerpunk-application';
const PRODUCT = 'designerpunk-product';

/** A pre-123 Kiro entry pair: the component roots at src/components/core, and a stale approval list. */
function pre123Kiro(): Record<string, unknown> {
  return {
    [APP]: {
      command: 'node',
      args: ['./node_modules/@3fn/core/dist/mcp/application-mcp.js'],
      env: { COMPONENTS_DIR: './src/components/core', TOKEN_INDEX_DIR: './token-index' },
      disabled: false,
      autoApprove: ['get_component_full', 'get_documentation_map'],
    },
    [PRODUCT]: {
      command: 'node',
      args: ['./node_modules/@3fn/core/dist/mcp/product-mcp.js'],
      env: { PRODUCT_DIR: './product', COMPONENT_DIR: './src/components/core' },
      disabled: false,
      autoApprove: ['get_screen'],
    },
    'my-own-server': { command: 'node', args: ['mine.js'], env: { COMPONENTS_DIR: './nowhere' } },
  };
}

describe('McpConfigCheck', () => {
  let scratch: string;
  let pkgDir: string;
  beforeEach(() => {
    scratch = createScratch('dp-mcpcfg-');
    pkgDir = setupPackage(scratch); // the real MCP template; BASE_TOOLS (docs: find_docs, get_section; application: get_component_full)
  });
  afterEach(() => fs.rmSync(scratch, { recursive: true, force: true }));

  describe('detection', () => {
    test('pre-123 component roots and a stale approval list in an unrecorded entry; template-sourced recommendations', () => {
      writeFile(scratch, KIRO, JSON.stringify({ mcpServers: pre123Kiro() }, null, 2));
      const f = detectStaleMcpConfig(scratch, pkgDir, new Set());
      const roots = f.filter((x): x is ComponentRootFinding => x.kind === 'component-root');
      expect(roots.map((r) => [r.serverKey, r.envKey, r.reason, r.recommended])).toEqual([
        [APP, 'COMPONENTS_DIR', 'pre-123', './src/components'],
        [PRODUCT, 'COMPONENT_DIR', 'pre-123', './src/components'],
      ]);
      const approve = f.filter((x): x is AutoApproveFinding => x.kind === 'auto-approve');
      expect(approve).toEqual([
        { kind: 'auto-approve', configPath: KIRO, serverKey: APP, unknown: ['get_documentation_map'], missing: [], recommended: ['get_component_full'] },
      ]);
      // A server not under our prefix is never read.
      expect(f.some((x) => x.serverKey === 'my-own-server')).toBe(false);
    });

    test('(b) a docs entry missing find_docs is stale; the repair keeps every real tool the consumer approved', () => {
      writeFile(scratch, KIRO, JSON.stringify({ mcpServers: { 'designerpunk-docs': { command: 'node', args: [], autoApprove: ['rebuild_index', 'get_section', 'get_documentation_map'] } } }));
      const [f] = detectStaleMcpConfig(scratch, pkgDir, new Set()) as AutoApproveFinding[];
      expect(f.unknown).toEqual(['get_documentation_map']);
      expect(f.missing).toEqual(['find_docs']);
      // rebuild_index is not read-only, but the server provides it and the consumer approved it: kept.
      expect(f.recommended).toEqual(['rebuild_index', 'get_section', 'find_docs']);
    });

    test('(e) a relative value resolves against the project root: an existing directory is not stale, a missing one is', () => {
      fs.mkdirSync(path.join(scratch, 'ui/components'), { recursive: true });
      writeFile(scratch, KIRO, JSON.stringify({ mcpServers: {
        [APP]: { command: 'node', args: [], env: { COMPONENTS_DIR: './ui/components' } },
        [PRODUCT]: { command: 'node', args: [], env: { COMPONENT_DIR: './gone/components' } },
      } }));
      expect(process.cwd()).not.toBe(scratch);
      const f = detectStaleMcpConfig(scratch, pkgDir, new Set()) as ComponentRootFinding[];
      expect(f.map((x) => [x.serverKey, x.reason])).toEqual([[PRODUCT, 'missing']]);
    });

    test('the template\'s own value is never reported, even when that directory does not exist yet', () => {
      writeFile(scratch, KIRO, JSON.stringify({ mcpServers: { [APP]: { command: 'node', args: [], env: { COMPONENTS_DIR: './src/components' } } } }));
      expect(fs.existsSync(path.join(scratch, 'src/components'))).toBe(false);
      expect(detectStaleMcpConfig(scratch, pkgDir, new Set())).toEqual([]);
    });

    test('a recorded entry is KeyGrain\'s and is skipped', () => {
      writeFile(scratch, KIRO, JSON.stringify({ mcpServers: pre123Kiro() }));
      const recorded = new Set([`${KIRO}#${APP}`, `${KIRO}#${PRODUCT}`]);
      expect(detectStaleMcpConfig(scratch, pkgDir, recorded)).toEqual([]);
    });

    test('an unreadable template gives no recommendation and no repair; an unreadable tool manifest skips the approval half', () => {
      const bare = setupPackage(createScratch('dp-mcpcfg-bare-'), { template: false, tools: null });
      writeFile(scratch, KIRO, JSON.stringify({ mcpServers: pre123Kiro() }, null, 2));
      const before = readText(scratch, KIRO);
      const f = detectStaleMcpConfig(scratch, bare, new Set());
      expect(f.every((x) => x.kind === 'component-root' && x.recommended === null)).toBe(true);
      expect(f.some(isRepairable)).toBe(false);
      expect(applyMcpConfigRepair(scratch, f)).toEqual({ files: [], settings: [] });
      expect(readText(scratch, KIRO)).toBe(before);
      expect(staleMcpConfigLines(f).join('\n')).toContain('Correct these settings by hand');
    });

    test('the steering check and this check read one candidate list, .mcp.json included', () => {
      expect([...MCP_CONFIG_CANDIDATES]).toEqual(['.cursor/mcp.json', '.kiro/settings/mcp.json', '.mcp.json']);
      writeFile(scratch, '.mcp.json', JSON.stringify({ mcpServers: {
        'designerpunk-docs': { command: 'node', args: [], env: { MCP_STEERING_DIR: './.kiro/steering' } },
        [APP]: { command: 'node', args: [], env: { COMPONENTS_DIR: './src/components/core' } },
      } }));
      expect(detectStaleSteeringDir(scratch)).toEqual([{ configPath: '.mcp.json', serverKey: 'designerpunk-docs', currentValue: './.kiro/steering' }]);
      expect(detectStaleMcpConfig(scratch, pkgDir, new Set()).map((x) => [x.configPath, x.serverKey])).toEqual([['.mcp.json', APP]]);
    });
  });

  describe('(c) the repair rewrites only the named keys', () => {
    test('every other server and key deep-equals its pre-repair value', () => {
      writeFile(scratch, KIRO, JSON.stringify({ other: { keep: true }, mcpServers: pre123Kiro() }, null, 2));
      const before = readJson(scratch, KIRO);
      const repair = applyMcpConfigRepair(scratch, detectStaleMcpConfig(scratch, pkgDir, new Set()));
      expect(repair.files).toEqual([KIRO]);
      expect(repair.settings).toEqual([
        `${KIRO}#${APP}.env.COMPONENTS_DIR`,
        `${KIRO}#${APP}.autoApprove`,
        `${KIRO}#${PRODUCT}.env.COMPONENT_DIR`,
      ]);
      const expected = JSON.parse(JSON.stringify(before));
      expected.mcpServers[APP].env.COMPONENTS_DIR = './src/components';
      expected.mcpServers[APP].autoApprove = ['get_component_full'];
      expected.mcpServers[PRODUCT].env.COMPONENT_DIR = './src/components';
      expect(readJson(scratch, KIRO)).toEqual(expected);
      // Nothing is left to report.
      expect(detectStaleMcpConfig(scratch, pkgDir, new Set())).toEqual([]);
    });
  });

  describe('through sync', () => {
    let con: ReturnType<typeof captureConsole>;
    beforeEach(() => {
      con = captureConsole();
    });
    afterEach(() => con.restore());

    /** A born repo whose Kiro entries are pre-123 and unrecorded (attach skipped keys already present). */
    function migratedRepo(): void {
      const manifest = birthKeys(scratch, pkgDir);
      const kiro = readJson(scratch, KIRO);
      Object.assign(kiro.mcpServers, pre123Kiro());
      writeFile(scratch, KIRO, JSON.stringify(kiro, null, 2) + '\n');
      delete manifest.entries[`${KIRO}#${APP}`];
      delete manifest.entries[`${KIRO}#${PRODUCT}`];
      writeFile(scratch, MANIFEST_FILE, JSON.stringify(manifest, null, 2) + '\n');
      expect(fs.existsSync(path.join(scratch, 'src/components/core'))).toBe(false);
    }

    test('the flag parses', () => {
      expect(parseSyncArgs(['--repair-mcp-config']).repairMcpConfig).toBe(true);
    });

    test('(a, d) report only: the settings are reported, the closing line is not the all-clear, and zero bytes change', async () => {
      migratedRepo();
      const before = readText(scratch, KIRO);
      const out = await runSync({ projectRoot: scratch, isTTY: false, agentLayer: stubAgentLayer({}) });
      const text = con.output();
      expect(text).toContain(`${KIRO} → ${APP}: COMPONENTS_DIR="./src/components/core" names the pre-123 src/components/core (recommended: "./src/components")`);
      expect(text).toContain(`${KIRO} → ${APP}: autoApprove approves 1 tool the server does not provide (get_documentation_map)`);
      expect(text).toContain('3 pre-123 MCP-config settings out of date (--repair-mcp-config)');
      expect(text).not.toContain(ALL_CLEAR_MESSAGE);
      expect(out.mcpConfig).toHaveLength(3);
      expect(readText(scratch, KIRO)).toBe(before);
    });

    test('(a, c) --repair-mcp-config: rewrites the settings, names them in the result, leaves the manifest unchanged', async () => {
      migratedRepo();
      const manifestBefore = readText(scratch, MANIFEST_FILE);
      const out = await runSync({ projectRoot: scratch, isTTY: false, repairMcpConfig: true, agentLayer: stubAgentLayer({}) });
      expect(out.trace).toContain('repair-applied:mcp-config');
      expect(out.mcpConfigRepair?.settings).toHaveLength(3);
      const kiro = readJson(scratch, KIRO);
      expect(kiro.mcpServers[APP].env.COMPONENTS_DIR).toBe('./src/components');
      expect(kiro.mcpServers[PRODUCT].env.COMPONENT_DIR).toBe('./src/components');
      expect(kiro.mcpServers['my-own-server'].env.COMPONENTS_DIR).toBe('./nowhere');
      const text = con.output();
      const resultAt = text.indexOf('📋 Result of this run:');
      expect(resultAt).toBeGreaterThan(0);
      // BEFORE: still to do. AFTER: rewritten, and nothing of it left to do.
      expect(text.slice(0, resultAt)).toContain('3 pre-123 MCP-config settings out of date (--repair-mcp-config)');
      const after = text.slice(resultAt);
      expect(after).toContain('MCP config: rewrote 3 pre-123 settings');
      expect(after).toContain('the entries stay yours, not managed by sync');
      expect(after).not.toContain('MCP-config settings out of date');
      // The entries stay unrecorded: the manifest is not written by the repair.
      expect(readText(scratch, MANIFEST_FILE)).toBe(manifestBefore);
      const m = parseManifest(readText(scratch, MANIFEST_FILE));
      expect(m.entries[`${KIRO}#${APP}`]).toBeUndefined();
    });

    test('(a) through --migrate-legacy and --migrate-components, with the real package: attach leaves the pre-123 entries, sync reports them, the closing line is not the all-clear', async () => {
      // The born-repo fixture of sync.test.ts's --migrate-legacy test, on Kiro, after --migrate-components
      // removed src/components/core/ (its own suite covers the relocation; here the folder is already gone).
      const real = createScratch('dp-mcpcfg-real-');
      try {
        writeFile(real, 'src/tokens/index.ts', '\nexport function getAllPrimitiveTokens() { return []; }\n');
        writeFile(real, 'src/tokens/semantic/index.ts', '\nexport function getAllSemanticTokens() { return []; }\n');
        writeFile(real, 'designerpunk.config.ts', `export default { name: 'McpFixture', abbreviation: 'MF', tokenSource: './src/tokens' };\n`);
        fs.mkdirSync(path.join(real, '.git'));
        fs.mkdirSync(path.join(real, 'node_modules/@3fn'), { recursive: true });
        fs.symlinkSync(REPO_ROOT, path.join(real, 'node_modules/@3fn/core'), 'dir');
        const copy = '.kiro/steering/Old-Copy.md';
        writeFile(real, copy, 'copied\n');
        writeFile(real, KIRO, JSON.stringify({ mcpServers: pre123Kiro() }, null, 2) + '\n');
        writeFile(real, MANIFEST_FILE, serializeManifest({
          version: '1',
          posture: 'born',
          installedVersion: '14.1.0',
          contractHash: '',
          attachedTargets: [],
          entries: { [copy]: { hash: sha('copied\n'), grain: 'file', origin: 'copy' } },
        }));

        const out = await runSync({ projectRoot: real, isTTY: false, migrateLegacy: true, migrateComponents: true, targets: ['kiro'] });

        expect(out.trace).toContain('attach:kiro');
        const kiro = readJson(real, KIRO);
        expect(kiro.mcpServers[APP].env.COMPONENTS_DIR).toBe('./src/components/core'); // attach skipped the present key
        const text = con.output();
        const resultAt = text.indexOf('📋 Result of this run:');
        expect(resultAt).toBeGreaterThan(0);
        const after = text.slice(resultAt);
        // The real tool manifest also finds the approval lists short of the read-only tools, so the count is not pinned.
        expect(after).toMatch(/Still to do:\n\s+\d+ pre-123 MCP-config settings? out of date \(--repair-mcp-config\)/);
        expect(out.mcpConfig?.some((f) => f.kind === 'component-root' && f.serverKey === APP && f.reason === 'pre-123')).toBe(true);
        expect(text).not.toContain(ALL_CLEAR_MESSAGE);
      } finally {
        fs.rmSync(real, { recursive: true, force: true });
      }
    });

    test('--dry-run with the flag writes nothing', async () => {
      migratedRepo();
      const before = readText(scratch, KIRO);
      await runSync({ projectRoot: scratch, dryRun: true, isTTY: false, repairMcpConfig: true, agentLayer: stubAgentLayer({}) });
      expect(readText(scratch, KIRO)).toBe(before);
    });
  });
});
