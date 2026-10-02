/**
 * @category evergreen
 * @purpose Verify `generate`'s partial-state refusals and root-anchoring
 * (Spec 123 Task 1.5 — design.md § "C2. Birth detection" consumer #4: "generate
 * refuses in tier-no-config, in unused-local-tier, and in a subdirectory of a
 * partial repo"). This test resolves the ambiguity between "refuse for exactly
 * the two named sub-cases" and "refuse for all four partial sub-cases" in favor
 * of the latter — see the Task 1.5 completion doc for the reasoning (all four
 * catalog rows are refusal-shaped).
 */
jest.mock('../../config/ConfigLoader');
jest.mock('../resolveTokens');
jest.mock('../loadComponentTokens');
jest.mock('../../generators/generateTokenFiles');
jest.mock('../../generators/generateTokenIndex');
jest.mock('../../registries/ComponentTokenRegistry', () => ({
  ComponentTokenRegistry: { getAll: () => [] },
}));

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { loadConfig } from '../../config/ConfigLoader';
import { generateTokenIndex } from '../../generators/generateTokenIndex';
import { generateTokenFiles } from '../../generators/generateTokenFiles';
import { loadComponentTokens } from '../loadComponentTokens';
import { runGenerate } from '../designerpunk';
import {
  partialCaseMessage,
  componentTokenFamilyMismatchMessage,
  componentTokenFileLoadFailedMessage,
} from '../shared/errorCatalog';

const mockLoadConfig = loadConfig as jest.Mock;
const mockGenerateTokenIndex = generateTokenIndex as jest.Mock;

function writeFile(dir: string, relPath: string, content: string): void {
  const full = path.join(dir, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
}

describe('runGenerate — partial-state refusals (Spec 123 Task 1.5)', () => {
  let tmpDir: string;
  let originalCwd: string;
  let mockExit: jest.SpyInstance;
  let consoleError: jest.SpyInstance;

  beforeEach(() => {
    originalCwd = process.cwd();
    // realpath: on macOS os.tmpdir() is under a symlink (/var → /private/var), and
    // process.cwd() after chdir() reports the RESOLVED path — normalize here so this
    // test's expected strings match what the walk actually sees.
    tmpDir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'dp-generate-refusal-')));
    fs.mkdirSync(path.join(tmpDir, '.git')); // isolate the walk from the real repo above it
    process.chdir(tmpDir);

    mockExit = jest.spyOn(process, 'exit').mockImplementation((() => undefined) as never);
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    process.chdir(originalCwd);
    fs.rmSync(tmpDir, { recursive: true, force: true });
    jest.restoreAllMocks();
  });

  test('tier-no-config: refuses with the exact catalog string; never loads config or writes the index', async () => {
    writeFile(
      tmpDir,
      'src/tokens/index.ts',
      'export function getAllPrimitiveTokens() { return []; }\n'
    );
    writeFile(
      tmpDir,
      'src/tokens/semantic/index.ts',
      'export function getAllSemanticTokens() { return []; }\n'
    );

    await runGenerate();

    expect(mockExit).toHaveBeenCalledWith(1);
    expect(mockLoadConfig).not.toHaveBeenCalled();
    expect(mockGenerateTokenIndex).not.toHaveBeenCalled();
    const root = path.resolve(tmpDir);
    expect(consoleError).toHaveBeenCalledWith(`❌ ${partialCaseMessage(root, 'tier-no-config', undefined)}`);
  });

  test('unused-local-tier: refuses with the exact catalog string', async () => {
    writeFile(
      tmpDir,
      'designerpunk.config.ts',
      "import { defineConfig } from '@3fn/core';\nexport default defineConfig({ name: 'T', abbreviation: 'T' });\n"
    );
    writeFile(tmpDir, 'src/tokens/index.ts', 'export function getAllPrimitiveTokens() { return []; }\n');
    writeFile(tmpDir, 'src/tokens/semantic/index.ts', 'export function getAllSemanticTokens() { return []; }\n');

    await runGenerate();

    expect(mockExit).toHaveBeenCalledWith(1);
    expect(mockLoadConfig).not.toHaveBeenCalled();
    const root = path.resolve(tmpDir);
    expect(consoleError).toHaveBeenCalledWith(`❌ ${partialCaseMessage(root, 'unused-local-tier', undefined)}`);
  });

  test('config-no-tier: refuses with the exact catalog string (tokenSource fills the slot)', async () => {
    writeFile(
      tmpDir,
      'designerpunk.config.ts',
      "import { defineConfig } from '@3fn/core';\nexport default defineConfig({ name: 'T', abbreviation: 'T', tokenSource: './src/tokens' });\n"
    );
    // No tier files written at src/tokens.

    await runGenerate();

    expect(mockExit).toHaveBeenCalledWith(1);
    const root = path.resolve(tmpDir);
    expect(consoleError).toHaveBeenCalledWith(
      `❌ ${partialCaseMessage(root, 'config-no-tier', path.resolve(tmpDir, 'src/tokens'))}`
    );
  });

  test('manifest-only: refuses with the exact catalog string', async () => {
    writeFile(tmpDir, 'designerpunk.manifest.json', JSON.stringify({ posture: 'born' }));

    await runGenerate();

    expect(mockExit).toHaveBeenCalledWith(1);
    const root = path.resolve(tmpDir);
    expect(consoleError).toHaveBeenCalledWith(`❌ ${partialCaseMessage(root, 'manifest-only', undefined)}`);
  });

  test('a subdirectory of a partial (tier-no-config) repo also refuses', async () => {
    writeFile(tmpDir, 'src/tokens/index.ts', 'export function getAllPrimitiveTokens() { return []; }\n');
    writeFile(tmpDir, 'src/tokens/semantic/index.ts', 'export function getAllSemanticTokens() { return []; }\n');
    const subDir = path.join(tmpDir, 'a', 'b');
    fs.mkdirSync(subDir, { recursive: true });
    process.chdir(subDir);

    await runGenerate();

    expect(mockExit).toHaveBeenCalledWith(1);
    // BITE (recorded red in the Task 1.5 completion doc): refusing only when
    // `process.cwd()` textually equals `dsRoot.root` (instead of relying on the
    // walk's ascent) would miss this subdirectory case.
  });
});

// The 15.0.0 upgrade rehearsal (.kiro/issues/2026-10-02-generate-stack-trace-on-component-token-family-mismatch.md):
// a component-token module that throws while it loads stops generate with a catalogued
// message naming the FILE — never main()'s "Unexpected error" stack trace.
describe('runGenerate — a component-token file that fails to load', () => {
  // The REAL error class (this module is automocked above).
  const { ComponentTokenFileLoadError } = jest.requireActual('../loadComponentTokens') as typeof import('../loadComponentTokens');
  const mockLoadComponentTokens = loadComponentTokens as jest.Mock;
  const mockGenerateTokenFiles = generateTokenFiles as jest.Mock;

  let tmpDir: string;
  let originalCwd: string;
  let mockExit: jest.SpyInstance;
  let consoleError: jest.SpyInstance;

  beforeEach(() => {
    originalCwd = process.cwd();
    tmpDir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'dp-generate-load-fail-')));
    fs.mkdirSync(path.join(tmpDir, '.git'));
    // A BORN repo: config with tokenSource + a tier.
    writeFile(
      tmpDir,
      'designerpunk.config.ts',
      "import { defineConfig } from '@3fn/core';\nexport default defineConfig({ name: 'T', abbreviation: 'T', tokenSource: './src/tokens' });\n"
    );
    writeFile(tmpDir, 'src/tokens/index.ts', 'export function getAllPrimitiveTokens() { return []; }\n');
    writeFile(tmpDir, 'src/tokens/semantic/index.ts', 'export function getAllSemanticTokens() { return []; }\n');
    process.chdir(tmpDir);

    mockLoadConfig.mockResolvedValue({
      name: 'T',
      abbreviation: 'T',
      themes: [],
      tokenSourceRoot: path.join(tmpDir, 'src/tokens'),
      tokenSourceMode: 'local',
      componentTokenDirs: [],
      outputDir: path.join(tmpDir, 'dist/tokens'),
      configDir: tmpDir,
    });
    mockExit = jest.spyOn(process, 'exit').mockImplementation((() => undefined) as never);
    consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    process.chdir(originalCwd);
    fs.rmSync(tmpDir, { recursive: true, force: true });
    mockLoadComponentTokens.mockReset();
    mockLoadConfig.mockReset();
    jest.restoreAllMocks();
  });

  const FAMILY_GUARD =
    "Token family mismatch in defineComponentTokens() for component 'Progress': token 'node.size.sm' is declared in a 'spacing' family call but references primitive 'size150' from the 'sizing' family.";

  test('the family-mismatch guard: the catalogued message names the file, exit 1, nothing written, no stack', async () => {
    mockLoadComponentTokens.mockImplementation(() => {
      throw new ComponentTokenFileLoadError(path.join(tmpDir, 'src/tokens/component/progress.ts'), FAMILY_GUARD);
    });

    await runGenerate();

    expect(mockExit).toHaveBeenCalledWith(1);
    expect(consoleError).toHaveBeenCalledWith(
      `❌ ${componentTokenFamilyMismatchMessage('src/tokens/component/progress.ts', FAMILY_GUARD)}`
    );
    const printed = consoleError.mock.calls.map((c) => c.join(' ')).join('\n');
    expect(printed).not.toContain('Unexpected error');
    expect(printed).not.toMatch(/\n\s+at /); // no stack frames
    expect(mockGenerateTokenFiles).not.toHaveBeenCalled();
    expect(mockGenerateTokenIndex).not.toHaveBeenCalled();
  });

  test('any other load failure: the generic catalogued row, still naming the file', async () => {
    mockLoadComponentTokens.mockImplementation(() => {
      throw new ComponentTokenFileLoadError(path.join(tmpDir, 'src/tokens/component/broken.ts'), 'Unexpected token');
    });

    await runGenerate();

    expect(mockExit).toHaveBeenCalledWith(1);
    expect(consoleError).toHaveBeenCalledWith(
      `❌ ${componentTokenFileLoadFailedMessage('src/tokens/component/broken.ts', 'Unexpected token')}`
    );
    expect(mockGenerateTokenFiles).not.toHaveBeenCalled();
  });
});
