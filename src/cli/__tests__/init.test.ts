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
 * - Emits BOTH targets' MCP configs unconditionally (Kiro + Claude Code — C8
 *   U1 emission; `--target` selection arrives at Task 16).
 * - Writes `designerpunk.manifest.json` LAST, with an `origin` per entry and
 *   ZERO `src/tokens/**` entries (Req 5.8).
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
import { runInit, ManifestBuilder } from '../init';
import { resolvePackageRoot } from '../shared/resolvePackageRoot';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function countFilesRecursive(dir: string): number {
  let count = 0;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    count += entry.isDirectory()
      ? countFilesRecursive(path.join(dir, entry.name))
      : entry.isFile()
        ? 1
        : 0;
  }
  return count;
}

// The package root `init` copies from is resolved by `resolvePackageRoot(<init's
// dir>)` = two levels up from `src/cli/`. This test file lives one level deeper
// (`src/cli/__tests__/`), so pass its parent (`src/cli/`) to resolve the SAME root.
const PKG_ROOT = resolvePackageRoot(path.join(__dirname, '..'));

// Expected governance-doc count, derived from source — NOT hard-coded.
const GOVERNANCE_DOC_COUNT = countFilesRecursive(path.join(PKG_ROOT, 'governance'));

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
    expect(fs.existsSync(path.join(scratchDir, '.kiro/steering'))).toBe(true);
    expect(fs.existsSync(path.join(scratchDir, 'designerpunk.manifest.json'))).toBe(true);

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

describe('CLI init — both targets\' MCP config (Task 2.3; C8 U1 emission)', () => {
  let scratchDir: string;

  beforeEach(() => {
    scratchDir = createScratchDir();
    markGitBoundary(scratchDir);
  });

  afterEach(() => {
    fs.rmSync(scratchDir, { recursive: true, force: true });
  });

  test('Kiro: .kiro/settings/mcp.json has both DesignerPunk entries with direct-node paths', async () => {
    await runInitIn(scratchDir);

    const config = JSON.parse(fs.readFileSync(path.join(scratchDir, '.kiro/settings/mcp.json'), 'utf-8'));
    expect(Object.keys(config.mcpServers).sort()).toEqual(['designerpunk-application', 'designerpunk-docs']);
    expect(config.mcpServers['designerpunk-docs'].autoApprove).toContain('get_document_full');
  });

  test('Claude Code: .mcp.json has both entries WITHOUT autoApprove/disabled fields', async () => {
    await runInitIn(scratchDir);

    expect(fs.existsSync(path.join(scratchDir, '.mcp.json'))).toBe(true);
    const config = JSON.parse(fs.readFileSync(path.join(scratchDir, '.mcp.json'), 'utf-8'));
    expect(Object.keys(config.mcpServers).sort()).toEqual(['designerpunk-application', 'designerpunk-docs']);
    expect(config.mcpServers['designerpunk-docs'].autoApprove).toBeUndefined();
    expect(config.mcpServers['designerpunk-docs'].disabled).toBeUndefined();
    expect(config.mcpServers['designerpunk-docs'].command).toBe('node');
  });

  test('Claude Code: .claude/settings.json permissions.allow uses the mcp__<server>__<tool> grain', async () => {
    await runInitIn(scratchDir);

    expect(fs.existsSync(path.join(scratchDir, '.claude/settings.json'))).toBe(true);
    const settings = JSON.parse(fs.readFileSync(path.join(scratchDir, '.claude/settings.json'), 'utf-8'));
    expect(settings.permissions.allow).toContain('mcp__designerpunk-docs__get_document_full');
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

  test('records origin on one copy entry and one emitted-key entry, and posture/installedVersion', async () => {
    await runInitIn(scratchDir, ['--name', 'Test', '--abbreviation', 'T']); // agents included this time

    const manifest = JSON.parse(fs.readFileSync(path.join(scratchDir, 'designerpunk.manifest.json'), 'utf-8'));
    expect(manifest.posture).toBe('born');
    expect(typeof manifest.installedVersion).toBe('string');
    expect(manifest.installedVersion).not.toBe('unknown');
    expect(manifest.attachedTargets.sort()).toEqual(['cc', 'kiro']);

    const entries = manifest.entries as Record<string, { origin: string; grain: string }>;
    const copyEntry = Object.entries(entries).find(([, v]) => v.origin === 'copy');
    expect(copyEntry).toBeDefined();
    expect(copyEntry![0].startsWith('.kiro/steering/') || copyEntry![0].startsWith('.kiro/agents/') || copyEntry![0].startsWith('governance/')).toBe(true);

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

describe('CLI init — first run with pre-seeded customization (merge, unchanged from pre-123)', () => {
  let scratchDir: string;

  beforeEach(() => {
    scratchDir = createScratchDir();
    markGitBoundary(scratchDir);
  });

  afterEach(() => {
    fs.rmSync(scratchDir, { recursive: true, force: true });
  });

  test('merges package files alongside consumer customizations (Gap 3 scenario)', async () => {
    fs.mkdirSync(path.join(scratchDir, '.kiro/steering'), { recursive: true });
    fs.writeFileSync(
      path.join(scratchDir, '.kiro/steering/designerpunk.md'),
      '# Custom product steering\n',
      'utf-8',
    );

    const { output } = await runInitIn(scratchDir);

    expect(output).toContain('✓ steering docs: 9 new files');
    expect(output).toContain(`✓ governance docs: ${GOVERNANCE_DOC_COUNT} new files`);

    expect(
      fs.readFileSync(path.join(scratchDir, '.kiro/steering/designerpunk.md'), 'utf-8'),
    ).toBe('# Custom product steering\n');

    const steeringFiles = fs.readdirSync(path.join(scratchDir, '.kiro/steering'));
    expect(steeringFiles.length).toBe(10);

    const governanceFiles = fs.readdirSync(path.join(scratchDir, 'governance'));
    expect(governanceFiles.length).toBe(GOVERNANCE_DOC_COUNT);
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

    const { output } = await runInitIn(scratchDir);

    expect(output).toContain('✓ .kiro/settings/mcp.json: added designerpunk-application');
    expect(output).toContain("⚠️  .kiro/settings/mcp.json already has 'designerpunk-docs' entry");

    const config = JSON.parse(fs.readFileSync(path.join(scratchDir, '.kiro/settings/mcp.json'), 'utf-8'));
    expect(config.mcpServers['designerpunk-docs'].args[0]).toBe('/custom/experimental/docs-mcp.js');
    expect(config.mcpServers['designerpunk-application']).toBeDefined();
    expect(config.mcpServers['designerpunk-application'].command).toBe('node');
  });
});
