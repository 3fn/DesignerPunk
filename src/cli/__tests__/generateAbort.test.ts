/**
 * @category evergreen
 * @purpose Verify that `generate` FAILS when the token source fails `generateTokenFiles`'s own
 * validation — exit 1, no "✅ System tokens generated", no token files, and the token index left
 * untouched (.kiro/issues/2026-10-03-generate-reports-success-after-validation-abort.md).
 *
 * Un-mocked at the generator seam: the REAL `generateTokenFiles` and `generateTokenIndex` run on
 * the repo's REAL token source, with one change per case. Only the config load, the token barrel
 * load (which needs the scoped tsx seam jest cannot run) and component-token discovery are
 * stubbed. The clean-source control proves the same harness does write files and the index, so
 * the abort assertions are not passing vacuously.
 */
jest.mock('../../config/ConfigLoader');
jest.mock('../resolveTokens');
jest.mock('../loadComponentTokens');

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { loadConfig } from '../../config/ConfigLoader';
import { resolveTokens } from '../resolveTokens';
import { loadComponentTokens } from '../loadComponentTokens';
import { runGenerate } from '../designerpunk';
import { getAllPrimitiveTokens } from '../../tokens';
import { getAllSemanticTokens } from '../../tokens/semantic';
import { darkSemanticOverrides } from '../../tokens/themes/dark/SemanticOverrides';

const mockLoadConfig = loadConfig as jest.Mock;
const mockResolveTokens = resolveTokens as jest.Mock;
const mockLoadComponentTokens = loadComponentTokens as jest.Mock;

const SUCCESS_LINE = '✅ System tokens generated';
const SENTINEL = '# sentinel: a previous good index — an aborted run must not touch this\n';

function write(dir: string, rel: string, content: string): void {
  const full = path.join(dir, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
}

describe('runGenerate — a token source that fails generation validation', () => {
  let tmpDir: string;
  let originalCwd: string;
  let mockExit: jest.SpyInstance;
  let logLines: string[];
  let errorLines: string[];

  beforeEach(() => {
    originalCwd = process.cwd();
    tmpDir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'dp-generate-abort-')));
    fs.mkdirSync(path.join(tmpDir, '.git')); // isolate the root walk from the real repo
    // A BORN repo: config with tokenSource + a tier (the tier files only satisfy root detection;
    // the token data comes from the stubbed resolveTokens below).
    write(
      tmpDir,
      'designerpunk.config.ts',
      "export default { name: 'T', abbreviation: 'T', tokenSource: './src/tokens' };\n"
    );
    write(tmpDir, 'src/tokens/index.ts', 'export function getAllPrimitiveTokens() { return []; }\n');
    write(tmpDir, 'src/tokens/semantic/index.ts', 'export function getAllSemanticTokens() { return []; }\n');
    // A previous run's index, which an aborted run must leave exactly as it is.
    write(tmpDir, 'token-index/semantics.yaml', SENTINEL);
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
    mockLoadComponentTokens.mockReturnValue([]);

    logLines = [];
    errorLines = [];
    mockExit = jest.spyOn(process, 'exit').mockImplementation((() => undefined) as never);
    jest.spyOn(console, 'log').mockImplementation((...a: unknown[]) => { logLines.push(a.join(' ')); });
    jest.spyOn(console, 'error').mockImplementation((...a: unknown[]) => { errorLines.push(a.join(' ')); });
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
  });

  afterEach(() => {
    process.chdir(originalCwd);
    fs.rmSync(tmpDir, { recursive: true, force: true });
    mockLoadConfig.mockReset();
    mockResolveTokens.mockReset();
    mockLoadComponentTokens.mockReset();
    jest.restoreAllMocks();
  });

  function expectAborted(stageText: string, detail: string): void {
    expect(mockExit).toHaveBeenCalledWith(1);
    expect(logLines).not.toContain(SUCCESS_LINE);
    const failure = errorLines.find((l) => l.startsWith('❌ System token generation failed: Token generation aborted'));
    expect(failure).toBeDefined();
    expect(failure).toContain(stageText);
    expect(failure).toContain(detail);
    // No token files — not even the output directory.
    expect(fs.existsSync(path.join(tmpDir, 'dist'))).toBe(false);
    // The previous index is untouched: same single file, same bytes.
    expect(fs.readdirSync(path.join(tmpDir, 'token-index'))).toEqual(['semantics.yaml']);
    expect(fs.readFileSync(path.join(tmpDir, 'token-index/semantics.yaml'), 'utf8')).toBe(SENTINEL);
  }

  test('control: the clean source writes token files and the index, and prints ✅', async () => {
    mockResolveTokens.mockReturnValue({
      primitiveTokens: getAllPrimitiveTokens(),
      semanticTokens: getAllSemanticTokens(),
    });

    await runGenerate();

    expect(mockExit).not.toHaveBeenCalled();
    expect(logLines).toContain(SUCCESS_LINE);
    expect(fs.existsSync(path.join(tmpDir, 'dist/tokens/DesignTokens.web.css'))).toBe(true);
    const index = fs.readFileSync(path.join(tmpDir, 'token-index/semantics.yaml'), 'utf8');
    expect(index).not.toBe(SENTINEL);
    expect(index).toMatch(/themeVarying: true/);
  }, 60000);

  test('override path: a semantic token the built-in dark map names is missing → exit 1, nothing written', async () => {
    const missing = 'color.action.navigation';
    expect(Object.keys(darkSemanticOverrides)).toContain(missing); // the premise of this case
    mockResolveTokens.mockReturnValue({
      primitiveTokens: getAllPrimitiveTokens(),
      semanticTokens: getAllSemanticTokens().filter((t) => t.name !== missing),
    });

    await runGenerate();

    expectAborted('semantic override validation failed', `"${missing}"`);
  }, 60000);

  test('semantic-reference path: a primitive a semantic token references is missing → exit 1, nothing written', async () => {
    const semantics = getAllSemanticTokens();
    const referring = semantics.find((t) => typeof t.primitiveReferences?.value === 'string');
    expect(referring).toBeDefined();
    const missingPrimitive = referring!.primitiveReferences!.value as string;
    mockResolveTokens.mockReturnValue({
      primitiveTokens: getAllPrimitiveTokens().filter((p) => p.name !== missingPrimitive),
      semanticTokens: semantics,
    });

    await runGenerate();

    expectAborted('semantic token validation failed', `'${missingPrimitive}'`);
  }, 60000);
});
