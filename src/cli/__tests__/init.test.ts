/**
 * Integration test for `npx designerpunk init`.
 *
 * Validates the re-runnability contract established by Spec 102 Gaps 3 and 5:
 * - First run against a fresh scratch repo produces all expected artifacts
 *   (including `.kiro/settings/mcp.json` from Gap 5)
 * - Second run against the same repo adds new files alongside consumer
 *   customizations without overwriting existing files
 * - Summary output format matches the contract documented in `init.ts`
 *   (CopyResult JSDoc + scaffoldMcpConfig JSDoc). The format is asserted
 *   verbatim here; intentional format changes should update the code AND
 *   these assertions together.
 *
 * This is an integration test — uses a real temp directory and runs the
 * actual `runInit` function against real filesystem operations. No mocking
 * of `fs`. This catches real-world integration bugs that unit-level mocking
 * would miss.
 *
 * @see .kiro/specs/102-consumer-onboarding-completion/design.md § "Workflow Integration Points"
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { runInit } from '../init';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Create a unique scratch directory under the OS temp dir.
 * Returns the absolute path. Caller is responsible for cleanup.
 */
function createScratchDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'dp-init-test-'));
}

/**
 * Run `runInit` against a scratch directory by chdir'ing into it first.
 * Returns the captured console.log output as a joined string.
 * Restores the original CWD after the run.
 */
async function runInitIn(
  scratchDir: string,
  args: string[] = ['--name', 'Test', '--abbreviation', 'T', '--skip-components', '--skip-agents'],
): Promise<string> {
  const originalCwd = process.cwd();
  process.chdir(scratchDir);

  const logSpy = jest.spyOn(console, 'log').mockImplementation();
  const errorSpy = jest.spyOn(console, 'error').mockImplementation();

  try {
    await runInit(args);
  } finally {
    process.chdir(originalCwd);
  }

  const output = logSpy.mock.calls.map((call) => call.join(' ')).join('\n');
  logSpy.mockRestore();
  errorSpy.mockRestore();

  return output;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('CLI init — integration', () => {
  let scratchDir: string;

  beforeEach(() => {
    scratchDir = createScratchDir();
  });

  afterEach(() => {
    fs.rmSync(scratchDir, { recursive: true, force: true });
  });

  describe('first run against empty scratch repo', () => {
    test('creates all expected artifacts', async () => {
      await runInitIn(scratchDir);

      // File-based scaffolds (createFileIfNotExists)
      expect(fs.existsSync(path.join(scratchDir, '.npmrc'))).toBe(true);
      expect(fs.existsSync(path.join(scratchDir, 'designerpunk.config.ts'))).toBe(true);
      expect(fs.existsSync(path.join(scratchDir, 'product/overview.yaml'))).toBe(true);

      // Directory copies (copyDir)
      expect(fs.existsSync(path.join(scratchDir, 'src/tokens'))).toBe(true);
      expect(fs.existsSync(path.join(scratchDir, '.kiro/steering'))).toBe(true);

      // MCP config scaffold (Gap 5)
      expect(fs.existsSync(path.join(scratchDir, '.kiro/settings/mcp.json'))).toBe(true);
    });

    test('scaffolded .kiro/settings/mcp.json has both DesignerPunk entries with direct-node paths', async () => {
      await runInitIn(scratchDir);

      const mcpConfigPath = path.join(scratchDir, '.kiro/settings/mcp.json');
      const config = JSON.parse(fs.readFileSync(mcpConfigPath, 'utf-8'));

      expect(Object.keys(config.mcpServers).sort()).toEqual([
        'designerpunk-application',
        'designerpunk-docs',
      ]);

      // Docs entry — direct-node invocation + MCP_STEERING_DIR env
      const docs = config.mcpServers['designerpunk-docs'];
      expect(docs.command).toBe('node');
      expect(docs.args[0]).toContain('node_modules/@3fn/core/dist/mcp/docs-mcp.js');
      expect(docs.env.MCP_STEERING_DIR).toContain('node_modules/@3fn/core/governance');
      expect(docs.autoApprove).toContain('get_document_full');

      // Application entry — includes TOKEN_INDEX_DIR (Gap 2 fix at template level)
      const app = config.mcpServers['designerpunk-application'];
      expect(app.command).toBe('node');
      expect(app.args[0]).toContain('node_modules/@3fn/core/dist/mcp/application-mcp.js');
      expect(app.env.COMPONENTS_DIR).toBe('./src/components/core');
      expect(app.env.TOKEN_INDEX_DIR).toBe('./token-index');
      expect(app.autoApprove).toContain('find_components');
    });
  });

  describe('re-runnability — second run against populated repo', () => {
    test('emits "N existing files preserved" summary format verbatim', async () => {
      // First run — populate the scratch dir
      await runInitIn(scratchDir);

      // Second run — everything is now pre-existing
      const secondOutput = await runInitIn(scratchDir);

      // Exact format assertions from Task 1.4 CopyResult JSDoc contract:
      // "✓ {label}: {N} existing file[s] preserved"
      // Token source is now split: types + primitives/semantics + component tokens
      expect(secondOutput).toContain('✓ type definitions:');
      expect(secondOutput).toContain('✓ token source:');
      expect(secondOutput).toContain('existing files preserved');
      // Spec 119-A two-root split: 9 identity docs ship in .kiro/steering/
      // (8 identity + the NEW Task-Completion-Protocol added in Task 8; the
      // meta-guide was removed in 119-A Task 10.5 → back to 9),
      // and the 80 relocated non-identity docs ship in governance/.
      expect(secondOutput).toContain('✓ steering docs: 9 existing files preserved');
      expect(secondOutput).toContain('✓ governance docs: 80 existing files preserved');
    });

    test('preserves existing files — no overwrites after second run', async () => {
      await runInitIn(scratchDir);

      // Mutate a file the consumer "edited" after first init
      const customPath = path.join(scratchDir, 'src/tokens/CustomMarker.ts');
      fs.writeFileSync(customPath, '// consumer edit', 'utf-8');

      // Find one of the token files to mutate and verify it's preserved
      const tokenFiles = fs.readdirSync(path.join(scratchDir, 'src/tokens')).filter((f) => f.endsWith('.ts'));
      const victimPath = path.join(scratchDir, 'src/tokens', tokenFiles[0]);
      const victimOriginal = fs.readFileSync(victimPath, 'utf-8');
      fs.writeFileSync(victimPath, '// consumer-edited version', 'utf-8');

      // Second run
      await runInitIn(scratchDir);

      // Custom marker still exists and unchanged
      expect(fs.existsSync(customPath)).toBe(true);
      expect(fs.readFileSync(customPath, 'utf-8')).toBe('// consumer edit');

      // Victim file is still the consumer-edited version, NOT the package version
      expect(fs.readFileSync(victimPath, 'utf-8')).toBe('// consumer-edited version');
      expect(fs.readFileSync(victimPath, 'utf-8')).not.toBe(victimOriginal);
    });
  });

  describe('first run with pre-seeded customization', () => {
    test('merges package files alongside consumer customizations (Gap 3 scenario)', async () => {
      // Pre-seed a custom file in .kiro/steering/ BEFORE running init.
      // This mirrors Peter's DP-PortfolioSite scenario that exposed the original
      // directory-skip bug.
      fs.mkdirSync(path.join(scratchDir, '.kiro/steering'), { recursive: true });
      fs.writeFileSync(
        path.join(scratchDir, '.kiro/steering/designerpunk.md'),
        '# Custom product steering\n',
        'utf-8',
      );

      const output = await runInitIn(scratchDir);

      // Spec 119-A two-root split: the package contributes 9 identity steering
      // files (8 identity + the NEW Task-Completion-Protocol from Task 8; the
      // meta-guide was removed in Task 10.5; no conflict with designerpunk.md
      // because the package doesn't have a file by that name) and 80 relocated
      // docs into the separate governance/ dir.
      expect(output).toContain('✓ steering docs: 9 new files');
      expect(output).toContain('✓ governance docs: 80 new files');

      // Custom file preserved
      expect(
        fs.readFileSync(path.join(scratchDir, '.kiro/steering/designerpunk.md'), 'utf-8'),
      ).toBe('# Custom product steering\n');

      // Plus 9 package identity files merged alongside it (total 10)
      const steeringFiles = fs.readdirSync(path.join(scratchDir, '.kiro/steering'));
      expect(steeringFiles.length).toBe(10);

      // The 80 relocated docs land in governance/
      const governanceFiles = fs.readdirSync(path.join(scratchDir, 'governance'));
      expect(governanceFiles.length).toBe(80);
    });
  });

  describe('mcp.json scaffold — partial merge (Gap 5 Case 3)', () => {
    test('skips conflicting designerpunk-docs entry with warning, adds designerpunk-application', async () => {
      // Pre-seed a consumer-customized designerpunk-docs entry
      fs.mkdirSync(path.join(scratchDir, '.kiro/settings'), { recursive: true });
      fs.writeFileSync(
        path.join(scratchDir, '.kiro/settings/mcp.json'),
        JSON.stringify(
          {
            mcpServers: {
              'designerpunk-docs': {
                command: 'node',
                args: ['/custom/experimental/docs-mcp.js'],
              },
            },
          },
          null,
          2,
        ),
        'utf-8',
      );

      const output = await runInitIn(scratchDir);

      // Exact format: "✓ .kiro/settings/mcp.json: added designerpunk-application"
      // (not both entries — docs is skipped due to conflict)
      expect(output).toContain('✓ .kiro/settings/mcp.json: added designerpunk-application');

      // Warning about the conflict — exact prefix/suffix (with ⚠️ emoji)
      expect(output).toContain("⚠️  .kiro/settings/mcp.json already has 'designerpunk-docs' entry");

      // Verify consumer's custom designerpunk-docs path is NOT overwritten
      const config = JSON.parse(
        fs.readFileSync(path.join(scratchDir, '.kiro/settings/mcp.json'), 'utf-8'),
      );
      expect(config.mcpServers['designerpunk-docs'].args[0]).toBe(
        '/custom/experimental/docs-mcp.js',
      );

      // But designerpunk-application WAS added (partial merge delivers value
      // rather than blocking on unrelated conflict)
      expect(config.mcpServers['designerpunk-application']).toBeDefined();
      expect(config.mcpServers['designerpunk-application'].command).toBe('node');
    });
  });
});
