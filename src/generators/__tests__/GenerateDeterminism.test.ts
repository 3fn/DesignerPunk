/**
 * @category evergreen
 * @purpose `generate` is deterministic: the same token source and the same @3fn/core produce
 * the same bytes in every output file on every run — system platform files, component token
 * files, DTCG, Figma, product token files and the token index
 * (.kiro/issues/2026-10-03-generate-output-not-deterministic.md). Before the fix, ten files
 * carried a wall-clock timestamp, so committed output changed on every run.
 *
 * Runs the real `runGenerate` twice, in-process, on the repo's real token source (including
 * its component tokens) and the product-token fixtures. Only the config load is stubbed, and
 * the two runtime-TS loads take the jest loader (the scoped tsx seam cannot run in jest).
 */
jest.mock('../../config/ConfigLoader');
jest.mock('../../cli/resolveTokens', () => {
  const actual = jest.requireActual('../../cli/resolveTokens');
  const { jestTsModuleLoader } = jest.requireActual('../../__tests__/helpers/tsModuleLoader');
  return { ...actual, resolveTokens: (config: unknown) => actual.resolveTokens(config, jestTsModuleLoader) };
});
jest.mock('../../cli/loadComponentTokens', () => {
  const actual = jest.requireActual('../../cli/loadComponentTokens');
  const { jestTsModuleLoader } = jest.requireActual('../../__tests__/helpers/tsModuleLoader');
  return { ...actual, loadComponentTokens: (config: unknown) => actual.loadComponentTokens(config, jestTsModuleLoader) };
});

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { loadConfig } from '../../config/ConfigLoader';
import { runGenerate } from '../../cli/designerpunk';
import { ComponentTokenRegistry } from '../../registries/ComponentTokenRegistry';
import { generatedByLine, getCoreVersion } from '../coreVersion';

const REPO_ROOT = path.resolve(__dirname, '../../..');
const PRODUCT_FIXTURES = path.join(REPO_ROOT, 'src/build/product/__tests__/fixtures/tokens');
const ISO_TIMESTAMP = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z/;

function write(dir: string, rel: string, content: string): void {
  const full = path.join(dir, rel);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
}

/** Every file under `root`, keyed by path relative to `base`. */
function snapshot(base: string, root: string, into: Map<string, Buffer> = new Map()): Map<string, Buffer> {
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) snapshot(base, full, into);
    else into.set(path.relative(base, full), fs.readFileSync(full));
  }
  return into;
}

describe('generate output is deterministic', () => {
  let tmpDir: string;
  let originalCwd: string;
  let mockExit: jest.SpyInstance;
  let errors: string[];

  /** One `generate` run, as a fresh process would see it (the component registry is process-global). */
  async function generateOnce(): Promise<void> {
    ComponentTokenRegistry.clear();
    await runGenerate(true);
    expect(ComponentTokenRegistry.getAll().length).toBeGreaterThan(0); // component files are not empty
    expect(errors).toEqual([]);
    expect(mockExit).not.toHaveBeenCalled();
  }

  beforeEach(() => {
    originalCwd = process.cwd();
    tmpDir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'dp-generate-determinism-')));
    fs.mkdirSync(path.join(tmpDir, '.git')); // isolate the root walk from the real repo
    write(tmpDir, 'designerpunk.config.ts',
      "export default { name: 'T', abbreviation: 'T', tokenSource: './src/tokens', productTokens: './product/tokens' };\n");
    write(tmpDir, 'src/tokens/index.ts', 'export function getAllPrimitiveTokens() { return []; }\n');
    write(tmpDir, 'src/tokens/semantic/index.ts', 'export function getAllSemanticTokens() { return []; }\n');
    for (const f of fs.readdirSync(PRODUCT_FIXTURES)) {
      write(tmpDir, path.join('product/tokens', f), fs.readFileSync(path.join(PRODUCT_FIXTURES, f), 'utf8'));
    }
    process.chdir(tmpDir);

    (loadConfig as jest.Mock).mockResolvedValue({
      name: 'T',
      abbreviation: 'T',
      themes: [],
      // The REAL token source (primitives, semantics, and its component/ directory).
      tokenSourceRoot: path.join(REPO_ROOT, 'src/tokens'),
      tokenSourceMode: 'local',
      componentTokenDirs: [],
      outputDir: path.join(tmpDir, 'dist/tokens'),
      configDir: tmpDir,
      productTokens: path.join(tmpDir, 'product/tokens'),
    });
    mockExit = jest.spyOn(process, 'exit').mockImplementation((() => undefined) as never);
    jest.spyOn(console, 'log').mockImplementation(() => undefined);
    jest.spyOn(console, 'warn').mockImplementation(() => undefined);
    errors = [];
    jest.spyOn(console, 'error').mockImplementation((...a: unknown[]) => { errors.push(a.join(' ')); });
  });

  afterEach(() => {
    process.chdir(originalCwd);
    fs.rmSync(tmpDir, { recursive: true, force: true });
    (loadConfig as jest.Mock).mockReset();
    ComponentTokenRegistry.clear();
    jest.restoreAllMocks();
  });

  test('two runs on the same input write byte-identical files, with no timestamp in any', async () => {
    const outputs = () => {
      const files = snapshot(tmpDir, path.join(tmpDir, 'dist'));
      return snapshot(tmpDir, path.join(tmpDir, 'token-index'), files);
    };

    await generateOnce();
    const first = outputs();

    // Cross a clock tick that any time-derived stamp would show (ms or s resolution).
    await new Promise((resolve) => setTimeout(resolve, 1100));

    await generateOnce();
    const second = outputs();

    // Every surface the record names is present, so the comparison is not vacuous.
    const names = [...first.keys()].map((k) => k.split(path.sep).join('/'));
    for (const expected of [
      'dist/tokens/DesignTokens.web.css', 'dist/tokens/DesignTokens.ios.swift', 'dist/tokens/DesignTokens.android.kt',
      'dist/tokens/ComponentTokens.web.css', 'dist/tokens/ComponentTokens.ios.swift', 'dist/tokens/ComponentTokens.android.kt',
      'dist/tokens/DesignTokens.dtcg.json', 'dist/tokens/DesignTokens.figma.json',
      'dist/tokens/product/ProductTokens.web.css', 'dist/tokens/product/ProductTokens.ios.swift', 'dist/tokens/product/ProductTokens.android.kt',
      'token-index/semantics.yaml',
    ]) {
      expect(names).toContain(expected);
    }

    expect([...second.keys()].sort()).toEqual([...first.keys()].sort());
    const differing = [...first.keys()].filter((k) => !first.get(k)!.equals(second.get(k)!));
    expect(differing).toEqual([]);

    const stamped = [...first.entries()].filter(([, b]) => ISO_TIMESTAMP.test(b.toString('utf8'))).map(([k]) => k);
    expect(stamped).toEqual([]);
  }, 120000);

  test('headers name the installed @3fn/core version, not a hard-coded 1.0.0', async () => {
    const pkgVersion = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'package.json'), 'utf8')).version;
    expect(getCoreVersion()).toBe(pkgVersion);

    await generateOnce();
    const out = path.join(tmpDir, 'dist/tokens');
    for (const f of ['DesignTokens.web.css', 'DesignTokens.ios.swift', 'DesignTokens.android.kt',
      'ComponentTokens.web.css', 'ComponentTokens.ios.swift', 'ComponentTokens.android.kt',
      'product/ProductTokens.web.css', 'product/ProductTokens.ios.swift', 'product/ProductTokens.android.kt']) {
      const head = fs.readFileSync(path.join(out, f), 'utf8').split('\n').slice(0, 12).join('\n');
      expect(head).toContain(f.startsWith('product/') ? `Product tokens — generated by @3fn/core ${pkgVersion}` : generatedByLine(pkgVersion));
      expect(head).not.toMatch(/Version: 1\.0\.0/);
    }
    const dtcg = JSON.parse(fs.readFileSync(path.join(out, 'DesignTokens.dtcg.json'), 'utf8'));
    expect(dtcg.$extensions.designerpunk.rosettaVersion).toBe(pkgVersion);
    expect(dtcg.$extensions.designerpunk).not.toHaveProperty('generatedAt');
  }, 120000);
});
