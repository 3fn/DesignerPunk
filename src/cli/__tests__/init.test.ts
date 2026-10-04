/**
 * Integration test for `npx designerpunk init` (Spec 123 Task 2 — the birth event).
 *
 * `init` now:
 * - REFUSES in a born, partial, or package-mode repo (design.md C1 row 0;
 *   Req 15A.3) — `--re-scaffold` overrides, listing every file it would
 *   RE-ADD before writing.
 * - Does NOT copy `src/types` or `src/components/core` (Req 19A.2/19A.3);
 *   creates the empty consumer `src/components/` dir instead (row 4′).
 * - Rewrites the copied token tree BY RESOLUTION (design.md C4), not by string.
 * - Emits the agent layer + MCP config for ONE target through `attach`'s code
 *   path (Task 16.3; C1's "(new) agent layer" row): bare `init` = the profile's
 *   declared default, `--target=<t>` = `<t>`. The release-1 copies of
 *   `.kiro/agents` / `.kiro/steering` / `governance` are REMOVED.
 * - Writes `designerpunk.manifest.json` LAST, with an `origin` per entry (the
 *   agent layer `generated`, the MCP keys `emitted-key`), `attachedTargets`
 *   naming only the targets emitted, and ZERO `src/tokens/**` entries (Req 5.8).
 *
 * This is an integration test — uses a real temp directory and runs the
 * actual `runInit` function against real filesystem operations. No mocking
 * of `fs`. This catches real-world integration bugs that unit-level mocking
 * would miss.
 *
 * @see .kiro/specs/123-consumer-distribution/design.md § "C1. The birth event"
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as crypto from 'crypto';
import { runInit, ManifestBuilder, listStarterSpecFiles, starterSpecNames, scaffoldStarterSpecs, STARTER_SPECS_SOURCE } from '../init';
import { runAttach } from '../attach';
import { resolvePackageRoot } from '../shared/resolvePackageRoot';
import { cloneHatchMessage, personalNoteNamingMessage, restartLineSequencedMessage } from '../shared/errorCatalog';
import { classifyFiles } from '../sync/Classifier';
import { loadIgnoreFilter } from '../sync/IgnoreFilter';
import { COPY_ROOTS } from '../sync/Manifest';
import {
  GITIGNORE_MARKERS,
  GITIGNORE_REGION_ID,
  gitignoreRegionContent,
  gitignoreRegionEntry,
} from '../shared/gitignoreRegion';
import {
  gitignoreBlockAddedMessage,
  gitignoreBlockConfigUnreadableMessage,
  starterSpecCollisionMessage,
  starterSpecsWrittenMessage,
  personalNoteCreatedMessage,
  personalNoteUnfilledMessage,
} from '../shared/errorCatalog';
import { PERSONAL_NOTE_REL, PERSONAL_NOTE_TEMPLATE_REL } from '../shared/personalNote';
import { extractRegion, normalizeRegionContent, wrapRegion } from '../sync/RegionGrain';
import type { ConfigModuleLoader } from '../../config/ConfigLoader';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// The package root `init` copies from is resolved by `resolvePackageRoot(<init's
// dir>)` = two levels up from `src/cli/`. This test file lives one level deeper
// (`src/cli/__tests__/`), so pass its parent (`src/cli/`) to resolve the SAME root.
const PKG_ROOT = resolvePackageRoot(path.join(__dirname, '..'));

// The declared target list and default, read through the SHIPPED bundle — never a literal list here (C12).
// eslint-disable-next-line @typescript-eslint/no-var-requires
const consumerEntry = require(path.join(PKG_ROOT, 'dist/generator/consumer-entry.js'));
const PROFILE: { targets: string[]; defaultTarget: string } = consumerEntry.loadPackagedConsumerProfile(PKG_ROOT);

const BASE_ARGS = ['--name', 'Test', '--abbreviation', 'T'];

function readManifestFile(dir: string): { attachedTargets: string[]; entries: Record<string, { hash: string; grain: string; origin: string }> } {
  return JSON.parse(fs.readFileSync(path.join(dir, 'designerpunk.manifest.json'), 'utf-8'));
}

function sha256(text: string): string {
  return crypto.createHash('sha256').update(text).digest('hex');
}

/** Create a unique scratch directory under the OS temp dir, resolved through any symlinks (macOS /var -> /private/var) so it matches what `process.cwd()` reports after chdir. */
function createScratchDir(): string {
  return fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'dp-init-test-')));
}

/** Mark `dir` as a `.git` boundary (directory form) so findDesignSystemRoot's walk stops there, isolating the scratch repo from the real repo above it. */
function markGitBoundary(dir: string): void {
  fs.mkdirSync(path.join(dir, '.git'), { recursive: true });
}

/**
 * Run `runInit` against a scratch directory by chdir'ing into it first.
 * Returns the captured console.log + console.error output as a joined string.
 * Restores the original CWD after the run. Captures a `process.exit` call
 * (refusals) without killing the test process.
 */
async function runInitIn(
  scratchDir: string,
  args: string[] = ['--name', 'Test', '--abbreviation', 'T', '--skip-agents'],
): Promise<{ output: string; exitCode: number | undefined }> {
  const originalCwd = process.cwd();
  process.chdir(scratchDir);

  const logSpy = jest.spyOn(console, 'log').mockImplementation();
  const errorSpy = jest.spyOn(console, 'error').mockImplementation();
  const exitSpy = jest.spyOn(process, 'exit').mockImplementation(((() => undefined) as unknown) as () => never);

  try {
    await runInit(args);
  } finally {
    process.chdir(originalCwd);
  }

  const output = [...logSpy.mock.calls, ...errorSpy.mock.calls].map((call) => call.join(' ')).join('\n');
  const exitCode = exitSpy.mock.calls[0]?.[0] as number | undefined;
  logSpy.mockRestore();
  errorSpy.mockRestore();
  exitSpy.mockRestore();

  return { output, exitCode };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('CLI init — birth check (Task 2.2; design.md C1 row 0; Req 15A.3)', () => {
  let scratchDir: string;

  beforeEach(() => {
    scratchDir = createScratchDir();
    markGitBoundary(scratchDir);
  });

  afterEach(() => {
    fs.rmSync(scratchDir, { recursive: true, force: true });
  });

  test('refuses in a born repo with the exact catalog string; writes nothing new', async () => {
    // First run births the repo.
    await runInitIn(scratchDir);
    const filesAfterFirstRun = fs.readdirSync(scratchDir).sort();

    // Second run against the now-born repo — refuses.
    const { output, exitCode } = await runInitIn(scratchDir);

    expect(exitCode).toBe(1);
    expect(output).toContain('this repo already has a design system');
    expect(output).toContain('init is the birth event and runs once');
    expect(output).toContain('npx designerpunk init --re-scaffold');
    // Nothing new was written.
    expect(fs.readdirSync(scratchDir).sort()).toEqual(filesAfterFirstRun);
  });

  test('refuses in a package-mode repo (config without tokenSource, no local tier) with the exact catalog string', async () => {
    fs.writeFileSync(
      path.join(scratchDir, 'designerpunk.config.ts'),
      "import { defineConfig } from '@3fn/core';\nexport default defineConfig({ name: 'T', abbreviation: 'T' });\n"
    );

    const { output, exitCode } = await runInitIn(scratchDir);

    expect(exitCode).toBe(1);
    expect(output).toContain('this repo runs in package mode');
    expect(output).toContain('npx designerpunk init --re-scaffold');
  });

  test('refuses in a partial repo (tier-no-config) with the exact catalog string', async () => {
    fs.mkdirSync(path.join(scratchDir, 'src/tokens/semantic'), { recursive: true });
    fs.writeFileSync(path.join(scratchDir, 'src/tokens/index.ts'), 'export function getAllPrimitiveTokens() { return []; }\n');
    fs.writeFileSync(path.join(scratchDir, 'src/tokens/semantic/index.ts'), 'export function getAllSemanticTokens() { return []; }\n');

    const { output, exitCode } = await runInitIn(scratchDir);

    expect(exitCode).toBe(1);
    expect(output).toContain('found a DesignerPunk token tier at');
    expect(output).toContain('but no designerpunk.config.ts');
  });

  test('--re-scaffold lists every file it would re-add, then proceeds under --yes', async () => {
    // First run births the repo.
    await runInitIn(scratchDir);

    // The founder deliberately deleted their token tree.
    fs.rmSync(path.join(scratchDir, 'src/tokens'), { recursive: true, force: true });

    const { output, exitCode } = await runInitIn(scratchDir, [
      '--name', 'Test', '--abbreviation', 'T', '--skip-agents', '--re-scaffold', '--yes',
    ]);

    expect(exitCode).toBeUndefined(); // did not refuse
    expect(output).toContain('the following files will be RE-ADDED');
    expect(output).toContain('src/tokens/index.ts');
    expect(fs.existsSync(path.join(scratchDir, 'src/tokens/index.ts'))).toBe(true);
  });
});

describe('CLI init — first run against empty scratch repo (Task 2.2)', () => {
  let scratchDir: string;

  beforeEach(() => {
    scratchDir = createScratchDir();
    markGitBoundary(scratchDir);
  });

  afterEach(() => {
    fs.rmSync(scratchDir, { recursive: true, force: true });
  });

  test('creates all expected artifacts, and does NOT copy src/types or src/components/core', async () => {
    await runInitIn(scratchDir);

    expect(fs.existsSync(path.join(scratchDir, '.npmrc'))).toBe(false);
    expect(fs.existsSync(path.join(scratchDir, 'designerpunk.config.ts'))).toBe(true);
    expect(fs.existsSync(path.join(scratchDir, 'product/overview.yaml'))).toBe(true);
    expect(fs.existsSync(path.join(scratchDir, 'src/tokens'))).toBe(true);
    expect(fs.existsSync(path.join(scratchDir, 'designerpunk.manifest.json'))).toBe(true);

    // Task 16.3 — the release-1 copy rows (6/7/7b) are REMOVED: no `.kiro/steering` copy, no `governance/` copy.
    expect(fs.existsSync(path.join(scratchDir, 'governance'))).toBe(false);
    expect(fs.existsSync(path.join(scratchDir, '.kiro/steering'))).toBe(false);

    // Req 19A.2/19A.3 — REMOVED from init.
    expect(fs.existsSync(path.join(scratchDir, 'src/types'))).toBe(false);
    expect(fs.existsSync(path.join(scratchDir, 'src/components/core'))).toBe(false);

    // Req 19A.6 — the consumer's OWN components dir, created empty.
    expect(fs.existsSync(path.join(scratchDir, 'src/components/README.md'))).toBe(true);
    const componentsEntries = fs.readdirSync(path.join(scratchDir, 'src/components'));
    expect(componentsEntries).toEqual(['README.md']);
  });

  test('the copied token tree resolves with zero unmapped specifiers (rewriteByResolution, Task 2.1)', async () => {
    const { output } = await runInitIn(scratchDir);
    expect(output).not.toContain('UnmappedSpecifierError');
    expect(output).not.toMatch(/relative specifier.*resolves outside/);
    // The three theme files still read '../types' (intra-tree — D-B4's finding).
    for (const theme of ['dark', 'dark-wcag', 'wcag']) {
      const themeFile = path.join(scratchDir, `src/tokens/themes/${theme}/SemanticOverrides.ts`);
      if (fs.existsSync(themeFile)) {
        expect(fs.readFileSync(themeFile, 'utf-8')).toContain("from '../types'");
      }
    }
  });

  test('emitted config re-points componentTokens at the consumer components dir', async () => {
    await runInitIn(scratchDir);
    const config = fs.readFileSync(path.join(scratchDir, 'designerpunk.config.ts'), 'utf-8');
    expect(config).toContain("componentTokens: ['./src/components', './src/tokens/component']");
    expect(config).not.toContain('./src/components/core');
  });

  test('--skip-components is a deprecated no-op with a note', async () => {
    const { output } = await runInitIn(scratchDir, ['--name', 'Test', '--abbreviation', 'T', '--skip-agents', '--skip-components']);
    expect(output).toContain('--skip-components is a deprecated no-op');
  });
});

describe('CLI init — THREE servers\' MCP config, approvals GENERATED from readOnlyHint (Task 4; C8/C10; Req 7.2)', () => {
  let scratchDir: string;

  // The manifest built by `npm run build:mcp` (Task 4.2) is this test's ground
  // truth for what "correct" approvals look like — never a second hand-list
  // that could drift from the one `mcpConfig/{kiro,cc}.ts` actually reads.
  const manifestPath = path.join(process.cwd(), 'dist/mcp/tool-manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  const readOnlyNames = (serverKey: string): string[] =>
    manifest.servers[serverKey].filter((t: { readOnlyHint: boolean }) => t.readOnlyHint).map((t: { name: string }) => t.name).sort();

  beforeEach(() => {
    scratchDir = createScratchDir();
    markGitBoundary(scratchDir);
  });

  afterEach(() => {
    fs.rmSync(scratchDir, { recursive: true, force: true });
  });

  test('Kiro: .kiro/settings/mcp.json has all THREE DesignerPunk entries (Req 7.2\'s deliberate three-server update)', async () => {
    await runInitIn(scratchDir, [...BASE_ARGS, '--skip-agents', '--target=kiro']);

    const config = JSON.parse(fs.readFileSync(path.join(scratchDir, '.kiro/settings/mcp.json'), 'utf-8'));
    expect(Object.keys(config.mcpServers).sort()).toEqual([
      'designerpunk-application',
      'designerpunk-docs',
      'designerpunk-product',
    ]);
    // Regression guard: the scaffolded COMPONENTS_DIR must point at the NEW
    // consumer components dir (src/components, Task 2.2's row 4′) — NOT the
    // removed src/components/core (Req 19A.2). This template value was found
    // stale during Task 2.3 and fixed alongside it.
    expect(config.mcpServers['designerpunk-application'].env.COMPONENTS_DIR).toBe('./src/components');
    // Req 7.1 — the third entry declares PRODUCT_DIR.
    expect(config.mcpServers['designerpunk-product'].env.PRODUCT_DIR).toBe('./product');
    // The docs server is pointed at the package's governance/ corpus — never the package's
    // .kiro/steering (which ships only the eight identity docs). Moved here from the retired
    // 119-A relocation-gate leg A7 (.kiro/issues/2026-10-01-relocation-integrity-gate-vs-123-install-shape.md, residual R3).
    expect(config.mcpServers['designerpunk-docs'].env.MCP_STEERING_DIR).toBe('./node_modules/@3fn/core/governance');
  });

  test('Kiro: each server\'s autoApprove is SET-EQUAL to the manifest\'s readOnlyHint:true set — rebuild_index absent, find_docs present, validate_component absent', async () => {
    await runInitIn(scratchDir, [...BASE_ARGS, '--skip-agents', '--target=kiro']);

    const config = JSON.parse(fs.readFileSync(path.join(scratchDir, '.kiro/settings/mcp.json'), 'utf-8'));
    for (const serverKey of ['designerpunk-docs', 'designerpunk-application', 'designerpunk-product']) {
      expect([...config.mcpServers[serverKey].autoApprove].sort()).toEqual(readOnlyNames(serverKey));
    }
    expect(config.mcpServers['designerpunk-docs'].autoApprove).toContain('find_docs');
    expect(config.mcpServers['designerpunk-docs'].autoApprove).not.toContain('rebuild_index');
    expect(config.mcpServers['designerpunk-application'].autoApprove).not.toContain('rebuild_index');
    expect(config.mcpServers['designerpunk-application'].autoApprove).not.toContain('validate_component');
    expect(config.mcpServers['designerpunk-product'].autoApprove).not.toContain('rebuild_product_index');
  });

  test('Claude Code: .mcp.json has all THREE entries WITHOUT autoApprove/disabled fields', async () => {
    await runInitIn(scratchDir, [...BASE_ARGS, '--skip-agents', '--target=cc']);

    expect(fs.existsSync(path.join(scratchDir, '.mcp.json'))).toBe(true);
    const config = JSON.parse(fs.readFileSync(path.join(scratchDir, '.mcp.json'), 'utf-8'));
    expect(Object.keys(config.mcpServers).sort()).toEqual([
      'designerpunk-application',
      'designerpunk-docs',
      'designerpunk-product',
    ]);
    expect(config.mcpServers['designerpunk-docs'].autoApprove).toBeUndefined();
    expect(config.mcpServers['designerpunk-docs'].disabled).toBeUndefined();
    expect(config.mcpServers['designerpunk-docs'].command).toBe('node');
    expect(config.mcpServers['designerpunk-application'].env.COMPONENTS_DIR).toBe('./src/components');
    expect(config.mcpServers['designerpunk-product'].env.PRODUCT_DIR).toBe('./product');
    // Same docs-server data root as the Kiro config (R3 — see the Kiro case above).
    expect(config.mcpServers['designerpunk-docs'].env.MCP_STEERING_DIR).toBe('./node_modules/@3fn/core/governance');
  });

  test('Claude Code: .claude/settings.json permissions.allow is SET-EQUAL (per server, mcp__<server>__<tool> grain) to the manifest\'s readOnlyHint:true set', async () => {
    await runInitIn(scratchDir, [...BASE_ARGS, '--skip-agents', '--target=cc']);

    expect(fs.existsSync(path.join(scratchDir, '.claude/settings.json'))).toBe(true);
    const settings = JSON.parse(fs.readFileSync(path.join(scratchDir, '.claude/settings.json'), 'utf-8'));
    for (const serverKey of ['designerpunk-docs', 'designerpunk-application', 'designerpunk-product']) {
      const actual = settings.permissions.allow
        .filter((e: string) => e.startsWith(`mcp__${serverKey}__`))
        .map((e: string) => e.slice(`mcp__${serverKey}__`.length))
        .sort();
      expect(actual).toEqual(readOnlyNames(serverKey));
    }
    expect(settings.permissions.allow).toContain('mcp__designerpunk-docs__find_docs');
    expect(settings.permissions.allow).not.toContain('mcp__designerpunk-docs__rebuild_index');
    expect(settings.permissions.allow).not.toContain('mcp__designerpunk-application__validate_component');
    expect(settings.permissions.allow).toContain('mcp__designerpunk-application__find_components');
  });
});

describe('CLI init — test config collision string (Task 2.3; C27 A13)', () => {
  let scratchDir: string;

  beforeEach(() => {
    scratchDir = createScratchDir();
    markGitBoundary(scratchDir);
  });

  afterEach(() => {
    fs.rmSync(scratchDir, { recursive: true, force: true });
  });

  test('pre-existing jest.config.js gets the truthful collision string, not a bare "already exists"', async () => {
    fs.writeFileSync(path.join(scratchDir, 'jest.config.js'), 'module.exports = {};\n');

    const { output } = await runInitIn(scratchDir);

    expect(output).toContain('skipped: jest.config.js (already exists) — the DesignerPunk jest preset is not applied');
    expect(output).toContain("require('@3fn/core/jest-preset')");
  });

  test('scaffolded tsconfig.test.json carries no paths overrides pinning subpaths to raw src', async () => {
    await runInitIn(scratchDir);
    const tsconfig = JSON.parse(fs.readFileSync(path.join(scratchDir, 'tsconfig.test.json'), 'utf-8'));
    expect(tsconfig.compilerOptions.paths).toBeUndefined();
    expect(JSON.stringify(tsconfig)).not.toContain('@3fn/core/src');
  });
});

describe('CLI init — manifest, written last (Task 2.4)', () => {
  let scratchDir: string;

  beforeEach(() => {
    scratchDir = createScratchDir();
    markGitBoundary(scratchDir);
  });

  afterEach(() => {
    fs.rmSync(scratchDir, { recursive: true, force: true });
  });

  test('records posture/installedVersion, the agent layer as origin "generated", the MCP keys as "emitted-key", and NO "copy" entry', async () => {
    await runInitIn(scratchDir, BASE_ARGS); // agent layer emitted (the default target)

    const manifest = readManifestFile(scratchDir);
    expect((manifest as any).posture).toBe('born');
    expect(typeof (manifest as any).installedVersion).toBe('string');
    expect((manifest as any).installedVersion).not.toBe('unknown');

    const entries = manifest.entries;
    // Release-1's three copy rows are gone — no entry is a copy.
    expect(Object.values(entries).filter((v) => v.origin === 'copy')).toEqual([]);
    expect(Object.keys(entries).filter((k) => k.startsWith('governance/'))).toEqual([]);

    // The agent layer: the default target's charters and identity members, recorded `generated` at file grain.
    const agentEntries = Object.entries(entries).filter(([k]) => k.startsWith('.claude/agents/') || k.startsWith('.claude/identity/'));
    expect(agentEntries.length).toBeGreaterThan(0);
    for (const [, v] of agentEntries) {
      expect(v.origin).toBe('generated');
      expect(v.grain).toBe('file');
    }
    // The CLAUDE.md always-layer region is recorded at region grain, `generated`.
    expect(entries['CLAUDE.md#managed']).toEqual(expect.objectContaining({ grain: 'region', origin: 'generated' }));

    const emittedKeyEntry = Object.entries(entries).find(([, v]) => v.origin === 'emitted-key');
    expect(emittedKeyEntry).toBeDefined();
    expect(emittedKeyEntry![1].grain).toBe('key');
  });

  test('zero src/tokens/** entries exist (Req 5.8)', async () => {
    await runInitIn(scratchDir);

    const manifest = JSON.parse(fs.readFileSync(path.join(scratchDir, 'designerpunk.manifest.json'), 'utf-8'));
    const tokenEntries = Object.keys(manifest.entries).filter((k) => k.startsWith('src/tokens/'));
    expect(tokenEntries).toEqual([]);
  });

  test("ManifestBuilder.recordFile ACTIVELY excludes src/tokens/** — a direct unit check, since no current init.ts call site attempts one (the integration test above would pass vacuously otherwise)", () => {
    const manifest = new ManifestBuilder();
    const tmpFile = path.join(scratchDir, 'probe.ts');
    fs.writeFileSync(tmpFile, '// probe\n', 'utf-8');

    manifest.recordFile('src/tokens/index.ts', tmpFile, 'copy');
    manifest.recordFile('src/tokens/component/progress.ts', tmpFile, 'copy');
    manifest.recordFile('designerpunk.config.ts', tmpFile, 'generated');

    const built = manifest.build('1.0.0') as { entries: Record<string, unknown> };
    expect(Object.keys(built.entries)).toEqual(['designerpunk.config.ts']);
    // BITE (recorded red in the Task 2.4 completion doc): removing the
    // `src/tokens/` prefix check in `ManifestBuilder.recordFile` turns this
    // red (both token-tier calls would then also appear in `entries`).
  });
});

describe('CLI init — next steps (Task 2.5; C27 erratum)', () => {
  let scratchDir: string;

  beforeEach(() => {
    scratchDir = createScratchDir();
    markGitBoundary(scratchDir);
  });

  afterEach(() => {
    fs.rmSync(scratchDir, { recursive: true, force: true });
  });

  test('the restart line is the LAST line printed; no "npx jest # Run component tests" step', async () => {
    const { output } = await runInitIn(scratchDir);

    expect(output).not.toContain('Run component tests');

    const trimmed = output.trimEnd();
    const restartIdx = trimmed.indexOf('restart your agent session — DesignerPunk\'s MCP servers and your personal note load');
    expect(restartIdx).toBeGreaterThan(-1);
    // Nothing meaningful after the restart line (only trailing whitespace).
    const afterRestart = trimmed.slice(restartIdx);
    expect(afterRestart.split('\n').filter((l) => l.trim().length > 0).length).toBe(1);
  });

  test('carries the clone hatch and the personal-note naming, in order, before the restart line', async () => {
    const { output } = await runInitIn(scratchDir);
    const cloneIdx = output.indexOf('want to own the engine too?');
    const noteIdx = output.indexOf('fill in .designerpunk/personal-note.local.md');
    const restartIdx = output.indexOf('restart your agent session — DesignerPunk\'s MCP servers');

    expect(cloneIdx).toBeGreaterThan(-1);
    expect(noteIdx).toBeGreaterThan(cloneIdx);
    expect(restartIdx).toBeGreaterThan(noteIdx);
  });
});

describe('CLI init — first run with pre-seeded customization (merge, Req 19.8)', () => {
  let scratchDir: string;

  beforeEach(() => {
    scratchDir = createScratchDir();
    markGitBoundary(scratchDir);
  });

  afterEach(() => {
    fs.rmSync(scratchDir, { recursive: true, force: true });
  });

  test('Kiro: generated agent layer lands beside the consumer\'s own steering doc; a path she occupies is reported, never overwritten, never recorded', async () => {
    fs.mkdirSync(path.join(scratchDir, '.kiro/steering'), { recursive: true });
    fs.writeFileSync(path.join(scratchDir, '.kiro/steering/designerpunk.md'), '# Custom product steering\n', 'utf-8');
    // A generated-agent path she already occupies with her own content.
    fs.mkdirSync(path.join(scratchDir, '.kiro/agents'), { recursive: true });
    fs.writeFileSync(path.join(scratchDir, '.kiro/agents/ada.json'), '{ "name": "my-ada" }\n', 'utf-8');

    const { output } = await runInitIn(scratchDir, [...BASE_ARGS, '--target=kiro']);

    expect(output).toMatch(/✓ Agent layer \(kiro\): \d+ files written, 1 skipped/);
    expect(output).toContain('⚠️  skipped: .kiro/agents/ada.json already exists and was not generated by DesignerPunk');

    expect(fs.readFileSync(path.join(scratchDir, '.kiro/steering/designerpunk.md'), 'utf-8')).toBe('# Custom product steering\n');
    expect(fs.readFileSync(path.join(scratchDir, '.kiro/agents/ada.json'), 'utf-8')).toBe('{ "name": "my-ada" }\n');

    // Her files were never claimed: no manifest entry for either.
    const entries = readManifestFile(scratchDir).entries;
    expect(entries['.kiro/agents/ada.json']).toBeUndefined();
    expect(entries['.kiro/steering/designerpunk.md']).toBeUndefined();
    // The generated identity members beside hers ARE recorded.
    const identity = Object.keys(entries).filter((k) => k.startsWith('.kiro/steering/designerpunk-'));
    expect(identity.length).toBeGreaterThan(0);
  });
});

describe('CLI init — mcp.json scaffold — partial merge (Gap 5 Case 3, unchanged)', () => {
  let scratchDir: string;

  beforeEach(() => {
    scratchDir = createScratchDir();
    markGitBoundary(scratchDir);
  });

  afterEach(() => {
    fs.rmSync(scratchDir, { recursive: true, force: true });
  });

  test('skips conflicting designerpunk-docs entry with warning, adds designerpunk-application', async () => {
    fs.mkdirSync(path.join(scratchDir, '.kiro/settings'), { recursive: true });
    fs.writeFileSync(
      path.join(scratchDir, '.kiro/settings/mcp.json'),
      JSON.stringify(
        { mcpServers: { 'designerpunk-docs': { command: 'node', args: ['/custom/experimental/docs-mcp.js'] } } },
        null,
        2,
      ),
      'utf-8',
    );

    const { output } = await runInitIn(scratchDir, [...BASE_ARGS, '--skip-agents', '--target=kiro']);

    expect(output).toContain('✓ .kiro/settings/mcp.json: added designerpunk-application');
    expect(output).toContain("⚠️  .kiro/settings/mcp.json already has 'designerpunk-docs' entry");

    const config = JSON.parse(fs.readFileSync(path.join(scratchDir, '.kiro/settings/mcp.json'), 'utf-8'));
    expect(config.mcpServers['designerpunk-docs'].args[0]).toBe('/custom/experimental/docs-mcp.js');
    expect(config.mcpServers['designerpunk-application']).toBeDefined();
    expect(config.mcpServers['designerpunk-application'].command).toBe('node');
  });
});

// ---------------------------------------------------------------------------
// Task 16.3 — the agent layer (the `attach` code path), attachedTargets, row 10, restart row
// ---------------------------------------------------------------------------

describe('CLI init — the agent layer through the attach code path (Task 16.3; C1 "(new) agent layer"; instruments 2.6, 2.7, 3.8)', () => {
  let scratchDir: string;

  beforeEach(() => {
    scratchDir = createScratchDir();
    markGitBoundary(scratchDir);
  });

  afterEach(() => {
    fs.rmSync(scratchDir, { recursive: true, force: true });
  });

  test.each(['cc', 'kiro'])('init --target=%s emits exactly the lane\'s file set for that target, every file recorded origin "generated" with its on-disk hash', async (target) => {
    await runInitIn(scratchDir, [...BASE_ARGS, `--target=${target}`]);

    // The expectation is the lane's own emission for the target (the guarded rendering's referent) — not a second hand-list.
    const emitted = await consumerEntry.emitConsumer({ packageRoot: PKG_ROOT, consumerRoot: scratchDir, target, mode: 'birth' });
    expect(emitted.files.length).toBeGreaterThan(0);
    const entries = readManifestFile(scratchDir).entries;

    for (const file of emitted.files as Array<{ path: string; grain: string }>) {
      expect(fs.existsSync(path.join(scratchDir, file.path))).toBe(true);
      if (file.grain === 'file') {
        const entry = entries[file.path];
        expect(entry).toEqual({ hash: sha256(fs.readFileSync(path.join(scratchDir, file.path), 'utf-8')), grain: 'file', origin: 'generated' });
      } else {
        expect(entries[`${file.path}#managed`]).toEqual(expect.objectContaining({ grain: 'region', origin: 'generated' }));
      }
    }
    // One charter file per target's convention.
    expect(fs.existsSync(path.join(scratchDir, target === 'kiro' ? '.kiro/agents/ada.json' : '.claude/agents/ada.md'))).toBe(true);
  });

  test('init --target=kiro writes the Kiro MCP config + approvals and NOT the Claude Code ones; --target=cc the reverse (one target per init)', async () => {
    await runInitIn(scratchDir, [...BASE_ARGS, '--target=kiro']);
    expect(fs.existsSync(path.join(scratchDir, '.kiro/settings/mcp.json'))).toBe(true);
    expect(fs.existsSync(path.join(scratchDir, '.mcp.json'))).toBe(false);
    expect(fs.existsSync(path.join(scratchDir, '.claude'))).toBe(false);
    expect(Object.keys(readManifestFile(scratchDir).entries).some((k) => k.startsWith('.kiro/settings/mcp.json#'))).toBe(true);
  });

  test('the release-1 copy rows are gone: no governance/ copy, no personal-note.md, no copy-origin entry — for either target', async () => {
    for (const target of ['cc', 'kiro']) {
      const dir = createScratchDir();
      markGitBoundary(dir);
      try {
        await runInitIn(dir, [...BASE_ARGS, `--target=${target}`]);
        expect(fs.existsSync(path.join(dir, 'governance'))).toBe(false);
        expect(fs.existsSync(path.join(dir, '.kiro/steering/personal-note.md'))).toBe(false);
        const entries = readManifestFile(dir).entries;
        expect(Object.values(entries).filter((v) => v.origin === 'copy')).toEqual([]);
        for (const root of COPY_ROOTS) {
          expect(Object.entries(entries).filter(([k, v]) => (k === root || k.startsWith(`${root}/`)) && v.origin !== 'generated' && v.origin !== 'emitted-key')).toEqual([]);
        }
      } finally {
        fs.rmSync(dir, { recursive: true, force: true });
      }
    }
  });

  test('--skip-agents omits the agent files and does NOT record the target as attached; the MCP config is still wired', async () => {
    await runInitIn(scratchDir, [...BASE_ARGS, '--skip-agents', '--target=cc']);
    expect(fs.existsSync(path.join(scratchDir, '.claude/agents'))).toBe(false);
    expect(fs.existsSync(path.join(scratchDir, 'CLAUDE.md'))).toBe(false);
    expect(fs.existsSync(path.join(scratchDir, '.mcp.json'))).toBe(true);
    expect(readManifestFile(scratchDir).attachedTargets).toEqual([]);
  });

  test('an undeclared --target refuses up front (exit 1, declared set named) and writes nothing', async () => {
    const { output, exitCode } = await runInitIn(scratchDir, [...BASE_ARGS, '--target=bogus']);
    expect(exitCode).toBe(1);
    expect(output).toContain('init: target "bogus" is not declared by the installed package');
    expect(output).toContain(PROFILE.targets.join(', '));
    expect(fs.readdirSync(scratchDir)).toEqual(['.git']);
  });

  test('--re-scaffold lists a missing agent-layer file in its preview and re-adds it; an edited sibling is left byte-identical', async () => {
    await runInitIn(scratchDir, [...BASE_ARGS, '--target=cc']);
    const edited = path.join(scratchDir, '.claude/agents/data.md');
    fs.writeFileSync(edited, '# my edited data agent\n', 'utf-8');
    fs.rmSync(path.join(scratchDir, '.claude/agents/ada.md'));

    const { output, exitCode } = await runInitIn(scratchDir, [...BASE_ARGS, '--target=cc', '--re-scaffold', '--yes']);

    expect(exitCode).toBeUndefined();
    expect(output).toContain('the following files will be RE-ADDED');
    expect(output).toContain('.claude/agents/ada.md');
    // The preview lists only what is MISSING: the edited sibling is present on disk, so it is not in the list.
    const previewList = /RE-ADDED[^\n]*\n((?:\s+- [^\n]*\n?)*)/.exec(output)![1];
    expect(previewList).toContain('.claude/agents/ada.md');
    expect(previewList).not.toContain('.claude/agents/data.md');
    expect(fs.existsSync(path.join(scratchDir, '.claude/agents/ada.md'))).toBe(true);
    expect(fs.readFileSync(edited, 'utf-8')).toBe('# my edited data agent\n');
    // The untouched generated files were adopted (identical bytes), so the rebuilt manifest still names them.
    expect(readManifestFile(scratchDir).entries['.claude/agents/ada.md']).toBeDefined();
    expect(readManifestFile(scratchDir).entries['.claude/agents/data.md']).toBeUndefined();
  });
});

describe('CLI init — attachedTargets names only the targets emitted (Task 16.3; C9; instruments 9.3, 9.4, 9.6)', () => {
  let scratchDir: string;

  beforeEach(() => {
    scratchDir = createScratchDir();
    markGitBoundary(scratchDir);
  });

  afterEach(() => {
    fs.rmSync(scratchDir, { recursive: true, force: true });
  });

  test('bare init records [defaultTarget], read through the packaged profile (no literal target list)', async () => {
    await runInitIn(scratchDir, BASE_ARGS);
    // BITE (recorded in the Task 16.3 completion doc): restoring `attachedTargets: ['cc', 'kiro']` in
    // `ManifestBuilder.build` turns THIS assertion red ([cc, kiro] vs [defaultTarget]).
    expect(readManifestFile(scratchDir).attachedTargets).toEqual([PROFILE.defaultTarget]);
  });

  test('init --target=kiro records [kiro] only', async () => {
    await runInitIn(scratchDir, [...BASE_ARGS, '--target=kiro']);
    expect(readManifestFile(scratchDir).attachedTargets).toEqual(['kiro']);
  });

  test('init --target=cc records [cc] only', async () => {
    await runInitIn(scratchDir, [...BASE_ARGS, '--target=cc']);
    expect(readManifestFile(scratchDir).attachedTargets).toEqual(['cc']);
  });

  test('the two-target case (moved from the old bare-init expectation): init --target=kiro, then attach --target=cc → both targets named', async () => {
    await runInitIn(scratchDir, [...BASE_ARGS, '--target=kiro']);

    const originalCwd = process.cwd();
    process.chdir(scratchDir);
    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    try {
      await runAttach(['--target=cc']);
    } finally {
      process.chdir(originalCwd);
      logSpy.mockRestore();
    }

    expect(readManifestFile(scratchDir).attachedTargets.sort()).toEqual(['cc', 'kiro']);
  });
});

describe('CLI init — row 10 .designerpunkignore comment (Task 16.3; Ada consult; instruments 3.9)', () => {
  let scratchDir: string;

  // Release-1's scaffold, verbatim (src/cli/init.ts @ d566b30f) — the bytes the cohort fixture's manifest hashes.
  const RELEASE_1_IGNORE = `# DesignerPunk Sync Ignore
# Files listed here are never touched by \`npx designerpunk sync\`.
# Uses .gitignore syntax: globs, exact paths, # comments.

# Example: keep a custom agent prompt
# .kiro/agents/custom-agent.md
`;

  beforeEach(() => {
    scratchDir = createScratchDir();
    markGitBoundary(scratchDir);
  });

  afterEach(() => {
    fs.rmSync(scratchDir, { recursive: true, force: true });
  });

  test('the example names the generated agent files a consumer may keep edits to, and says own-authored agents need no entry; the first three header lines stay', async () => {
    await runInitIn(scratchDir, [...BASE_ARGS, '--skip-agents']);
    expect(fs.readFileSync(path.join(scratchDir, '.designerpunkignore'), 'utf-8')).toBe(`# DesignerPunk Sync Ignore
# Files listed here are never touched by \`npx designerpunk sync\`.
# Uses .gitignore syntax: globs, exact paths, # comments.

# Example: keep your edits to a generated agent file (sync would otherwise offer to overwrite it)
# .claude/agents/ada.md
# .kiro/agents/ada.json
# .kiro/agents/ada-prompt.md
# Agents you write yourself are never managed and need no entry here.
`);
    expect(fs.readFileSync(path.join(scratchDir, '.designerpunkignore'), 'utf-8')).not.toContain('custom-agent.md');
  });

  test('an UNEDITED release-1 .designerpunkignore is not reclassified as a conflict by the template change (Ada)', () => {
    const fixture = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/release-1-cohort/manifest.json'), 'utf-8'));
    const baseline = fixture.entries['.designerpunkignore'];
    // The literal above IS what release-1 wrote: its hash is the fixture manifest's baseline.
    expect(sha256(RELEASE_1_IGNORE)).toBe(baseline.hash);

    // Classify the unedited file against a package side that carries the NEW template under the same path — the strongest
    // form of the question. The entry is `origin: 'generated'` and the path is under no managed copy root, so it is never judged.
    const projectRoot = createScratchDir();
    try {
      const result = classifyFiles(
        [{ relativePath: '.designerpunkignore', absolutePath: '/pkg/.designerpunkignore', hash: sha256('the new template') }],
        [{ relativePath: '.designerpunkignore', absolutePath: path.join(projectRoot, '.designerpunkignore'), hash: sha256(RELEASE_1_IGNORE) }],
        fixture.entries,
        loadIgnoreFilter(projectRoot),
        [...COPY_ROOTS],
      );
      const named = [...result.conflicts, ...result.updatedSafe, ...result.new, ...result.removed, ...result.deletedByYou].map((c) => c.relativePath);
      expect(named).not.toContain('.designerpunkignore');
    } finally {
      fs.rmSync(projectRoot, { recursive: true, force: true });
    }
  });
});

describe('CLI init — U2 output prints the sequenced restart row LAST (Task 16.3; Le-T5; instrument 4.7)', () => {
  let scratchDir: string;

  beforeEach(() => {
    scratchDir = createScratchDir();
    markGitBoundary(scratchDir);
  });

  afterEach(() => {
    fs.rmSync(scratchDir, { recursive: true, force: true });
  });

  test.each(['cc', 'kiro'])('--target=%s: the output ENDS with clone hatch, personal-note naming, then the sequenced restart row — string-equal, in that order', async (target) => {
    const { output } = await runInitIn(scratchDir, [...BASE_ARGS, `--target=${target}`]);
    const expectedTail = `${cloneHatchMessage()}\n\n${personalNoteNamingMessage()}\n\n${restartLineSequencedMessage()}`;
    expect(output.trimEnd().endsWith(expectedTail)).toBe(true);
    // The agent-layer summary is printed before the next-steps block, never after the restart row.
    expect(output.indexOf('✓ Agent layer (')).toBeLessThan(output.indexOf(expectedTail));
  });
});

describe('CLI init — the .gitignore managed block (Task 20.2; design.md C24)', () => {
  let scratchDir: string;
  const ARGS = ['--name', 'Test', '--abbreviation', 'T', '--skip-agents'];

  beforeEach(() => {
    scratchDir = createScratchDir();
    markGitBoundary(scratchDir);
  });

  afterEach(() => {
    fs.rmSync(scratchDir, { recursive: true, force: true });
  });

  /** `runInit` with an injected config loader (the production loader cannot run in-process under jest). */
  async function initWithLoader(args: string[], configLoader: ConfigModuleLoader): Promise<string> {
    const originalCwd = process.cwd();
    process.chdir(scratchDir);
    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();
    const exitSpy = jest.spyOn(process, 'exit').mockImplementation(((() => undefined) as unknown) as () => never);
    try {
      await runInit(args, { configLoader });
    } finally {
      process.chdir(originalCwd);
    }
    const output = [...logSpy.mock.calls, ...errorSpy.mock.calls].map((call) => call.join(' ')).join('\n');
    logSpy.mockRestore();
    errorSpy.mockRestore();
    exitSpy.mockRestore();
    return output;
  }

  /** Reads `output: '<path>'` out of the config text `init` wrote, so the block's path provably comes from THAT file. */
  const readOutputFromFile: ConfigModuleLoader = (configPath) => {
    const m = /output:\s*'([^']+)'/.exec(fs.readFileSync(configPath, 'utf-8'));
    if (!m) throw new Error('no output in config');
    return { default: { output: m[1] } };
  };

  const gitignore = () => fs.readFileSync(path.join(scratchDir, '.gitignore'), 'utf-8');
  const nonCommentLines = (text: string) => text.split('\n').filter((l) => l.trim() !== '' && !l.startsWith('#'));

  test('the config init writes (output ./dist/tokens) → the block ignores exactly token-index/ and .designerpunk/, the commented line names dist/tokens/', async () => {
    const output = await initWithLoader(ARGS, readOutputFromFile);
    const content = gitignoreRegionContent('dist/tokens');
    expect(gitignore()).toBe(wrapRegion(GITIGNORE_MARKERS, content));
    expect(nonCommentLines(extractRegion(gitignore(), GITIGNORE_MARKERS).found ? (extractRegion(gitignore(), GITIGNORE_MARKERS) as { region: string }).region : '')).toEqual([
      'token-index/',
      '.designerpunk/',
    ]);
    expect(gitignore()).toContain('# dist/tokens/');
    expect(output).toContain(`✓ ${gitignoreBlockAddedMessage()}`);
  });

  test('the entry is recorded: a generated region whose hash is over the normalized content', async () => {
    await initWithLoader(ARGS, readOutputFromFile);
    const entry = readManifestFile(scratchDir).entries[GITIGNORE_REGION_ID];
    expect(entry).toEqual(gitignoreRegionEntry(gitignoreRegionContent('dist/tokens')));
    expect(entry.hash).toBe(sha256(normalizeRegionContent(gitignoreRegionContent('dist/tokens'))));
  });

  test.each([
    ['./build/tokens', 'build/tokens'],
    ['out/design-tokens', 'out/design-tokens'],
  ])('TWO CONFIGS: a pre-existing config with output %s is kept, and the commented line carries %s — never dist/tokens', async (configured, rel) => {
    const configText = `module.exports = { output: '${configured}' };\n`;
    fs.writeFileSync(path.join(scratchDir, 'designerpunk.config.ts'), configText);
    // `--re-scaffold --yes`: a config with no token tier is `partial`, which bare `init` refuses.
    await initWithLoader([...ARGS, '--re-scaffold', '--yes'], (p) => import(p));
    expect(fs.readFileSync(path.join(scratchDir, 'designerpunk.config.ts'), 'utf-8')).toBe(configText); // kept (createFileIfNotExists)
    expect(gitignore()).toContain(`# ${rel}/`);
    expect(gitignore()).not.toContain('dist/tokens');
    expect(gitignore()).toBe(wrapRegion(GITIGNORE_MARKERS, gitignoreRegionContent(rel)));
  });

  test('an existing .gitignore: her lines stay in place, byte for byte, and the block follows', async () => {
    const mine = 'node_modules/\n.env\n';
    fs.writeFileSync(path.join(scratchDir, '.gitignore'), mine);
    await initWithLoader(ARGS, readOutputFromFile);
    expect(gitignore().startsWith(mine)).toBe(true);
    expect(extractRegion(gitignore(), GITIGNORE_MARKERS).found).toBe(true);
  });

  test('RED: a config that will not load → init reports, writes NO block, records no entry, guesses no path', async () => {
    const throwing: ConfigModuleLoader = () => {
      throw new Error('boom');
    };
    const output = await initWithLoader(ARGS, throwing);
    const reason = `Failed to load ${path.join(scratchDir, 'designerpunk.config.ts')}: boom`;
    expect(output).toContain(gitignoreBlockConfigUnreadableMessage(reason));
    expect(fs.existsSync(path.join(scratchDir, '.gitignore'))).toBe(false);
    expect(readManifestFile(scratchDir).entries[GITIGNORE_REGION_ID]).toBeUndefined();
  });
});

describe('CLI init — the starter specs into specs/ (Task 21.3; design.md C25, DD15)', () => {
  let scratchDir: string;
  const TEMPLATE_FILES = listStarterSpecFiles(PKG_ROOT);
  const templateBytes = (rel: string) => fs.readFileSync(path.join(PKG_ROOT, STARTER_SPECS_SOURCE, rel));

  beforeEach(() => {
    scratchDir = createScratchDir();
    markGitBoundary(scratchDir);
  });

  afterEach(() => {
    fs.rmSync(scratchDir, { recursive: true, force: true });
  });

  test('the package ships exactly two starter specs (the source the scaffold reads)', () => {
    expect(starterSpecNames(TEMPLATE_FILES)).toEqual(['ci-needs', 'regrounding']);
    expect(TEMPLATE_FILES.length).toBeGreaterThanOrEqual(2);
  });

  test('init scaffolds both into specs/<spec>/<file>, byte for byte, and prints the summary line', async () => {
    const { output } = await runInitIn(scratchDir);
    for (const rel of TEMPLATE_FILES) {
      expect(fs.readFileSync(path.join(scratchDir, 'specs', rel)).equals(templateBytes(rel))).toBe(true);
    }
    const written = fs.readdirSync(path.join(scratchDir, 'specs')).sort();
    expect(written).toEqual(['ci-needs', 'regrounding']);
    expect(output).toContain(`✓ ${starterSpecsWrittenMessage(TEMPLATE_FILES.length, ['ci-needs', 'regrounding'])}`);
  });

  test('every scaffolded file is recorded origin "generated" with the hash of the bytes written', async () => {
    await runInitIn(scratchDir);
    const entries = readManifestFile(scratchDir).entries;
    for (const rel of TEMPLATE_FILES) {
      expect(entries[`specs/${rel}`]).toEqual({ hash: sha256(templateBytes(rel).toString('utf-8')), grain: 'file', origin: 'generated' });
    }
  });

  test('--skip-agents still scaffolds them (the specs do not depend on the agent layer)', async () => {
    await runInitIn(scratchDir, [...BASE_ARGS, '--skip-agents']);
    expect(fs.existsSync(path.join(scratchDir, 'specs', TEMPLATE_FILES[0]))).toBe(true);
  });

  test('RED (collision): an existing path is kept byte-identical, reported with the catalog string, and not recorded; the rest are still written', async () => {
    const first = TEMPLATE_FILES[0];
    const mine = '# my own notes, not the starter\n';
    fs.mkdirSync(path.join(scratchDir, 'specs', path.dirname(first)), { recursive: true });
    fs.writeFileSync(path.join(scratchDir, 'specs', first), mine);
    // `specs/` alone does not make the repo `partial` (no config, no token tier), so bare init proceeds.
    const { output } = await runInitIn(scratchDir);
    expect(fs.readFileSync(path.join(scratchDir, 'specs', first), 'utf-8')).toBe(mine);
    expect(output).toContain(starterSpecCollisionMessage(`specs/${first}`));
    expect(readManifestFile(scratchDir).entries[`specs/${first}`]).toBeUndefined();
    for (const rel of TEMPLATE_FILES.slice(1)) {
      expect(fs.existsSync(path.join(scratchDir, 'specs', rel))).toBe(true);
    }
    expect(output).toContain(`✓ ${starterSpecsWrittenMessage(TEMPLATE_FILES.length - 1, starterSpecNames(TEMPLATE_FILES.slice(1)))}`);
  });

  test('--re-scaffold lists a deleted starter spec in its preview and re-adds it; an edited sibling is left byte-identical', async () => {
    await runInitIn(scratchDir);
    const [gone, edited] = [TEMPLATE_FILES[0], TEMPLATE_FILES[1]];
    fs.rmSync(path.join(scratchDir, 'specs', gone));
    fs.appendFileSync(path.join(scratchDir, 'specs', edited), '\nmy edit\n');
    const editedBefore = fs.readFileSync(path.join(scratchDir, 'specs', edited));
    const { output } = await runInitIn(scratchDir, [...BASE_ARGS, '--skip-agents', '--re-scaffold', '--yes']);
    expect(output).toContain(`- specs/${gone}`);
    expect(output).not.toContain(`- specs/${edited}`);
    expect(fs.readFileSync(path.join(scratchDir, 'specs', gone)).equals(templateBytes(gone))).toBe(true);
    expect(fs.readFileSync(path.join(scratchDir, 'specs', edited)).equals(editedBefore)).toBe(true);
    expect(output).toContain(starterSpecCollisionMessage(`specs/${edited}`));
  });

  test('a package without the starter-specs source: scaffoldStarterSpecs reports templatesFound false and writes nothing', () => {
    const emptyPkg = createScratchDir();
    try {
      const r = scaffoldStarterSpecs(emptyPkg, scratchDir, new ManifestBuilder());
      expect(r).toEqual({ written: [], collided: [], templatesFound: false });
      expect(fs.existsSync(path.join(scratchDir, 'specs'))).toBe(false);
    } finally {
      fs.rmSync(emptyPkg, { recursive: true, force: true });
    }
  });
});

describe('CLI init — the personal note (Task 22.1; mechanism B; C26)', () => {
  let scratchDir: string;
  const TEMPLATE = fs.readFileSync(path.join(PKG_ROOT, PERSONAL_NOTE_TEMPLATE_REL), 'utf8');
  const notePath = () => path.join(scratchDir, PERSONAL_NOTE_REL);

  beforeEach(() => {
    scratchDir = createScratchDir();
    markGitBoundary(scratchDir);
  });
  afterEach(() => {
    fs.rmSync(scratchDir, { recursive: true, force: true });
  });

  test('init creates the note from the template; it prints the NAMING row (in its next steps) and NO creation row or warning', async () => {
    const { output } = await runInitIn(scratchDir);
    expect(fs.readFileSync(notePath(), 'utf8')).toBe(TEMPLATE);
    expect(output).toContain(personalNoteNamingMessage());
    expect(output).not.toContain(personalNoteCreatedMessage());
    expect(output).not.toContain(personalNoteUnfilledMessage());
  });

  test('the note is local to one person: never recorded in the manifest', async () => {
    await runInitIn(scratchDir);
    const entries = readManifestFile(scratchDir).entries;
    expect(Object.keys(entries).filter((k) => k.includes('.designerpunk/') || k.includes('personal-note'))).toEqual([]);
  });

  test('--re-scaffold never overwrites an existing note: a filled one is untouched and silent; an unfilled one gets the warning', async () => {
    await runInitIn(scratchDir);
    fs.writeFileSync(notePath(), 'My own words.\n');
    let { output } = await runInitIn(scratchDir, [...BASE_ARGS, '--skip-agents', '--re-scaffold', '--yes']);
    expect(fs.readFileSync(notePath(), 'utf8')).toBe('My own words.\n');
    expect(output).not.toContain(personalNoteUnfilledMessage());
    fs.writeFileSync(notePath(), TEMPLATE);
    ({ output } = await runInitIn(scratchDir, [...BASE_ARGS, '--skip-agents', '--re-scaffold', '--yes']));
    expect(fs.readFileSync(notePath(), 'utf8')).toBe(TEMPLATE);
    expect(output).toContain(`⚠️  ${personalNoteUnfilledMessage()}`);
  });
});

