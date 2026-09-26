/**
 * @category evergreen
 * @purpose Task 2.5's over-rewrite arbiter — `init`'s copied token tree passes
 * a REAL consumer `tsc --noEmit`, and the three theme files still read
 * `'../types'` (the intra-tree specifier `rewriteByResolution` must never
 * touch — D-B4's finding). This is the IN-REPO unit check (design.md's own
 * scope line); the packed-install certification is Task 9's job.
 *
 * Heavier than the rest of the CLI suite (spawns real `tsc` processes) — kept
 * as its own file so it's easy to identify/skip in isolation if ever needed.
 *
 * @see .kiro/specs/123-consumer-distribution/design.md § "C6. Consumer-guard extensions" (over-rewrite arbiter row)
 */
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { execFileSync } from 'child_process';
import { runInit } from '../init';
import { resolvePackageRoot } from '../shared/resolvePackageRoot';

const PKG_ROOT = resolvePackageRoot(path.join(__dirname, '..'));
const TSC_BIN = path.join(PKG_ROOT, 'node_modules/.bin/tsc');

function createScratchDir(): string {
  return fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'dp-overrewrite-')));
}

async function runInitIn(scratchDir: string): Promise<void> {
  const originalCwd = process.cwd();
  process.chdir(scratchDir);
  const logSpy = jest.spyOn(console, 'log').mockImplementation();
  const errorSpy = jest.spyOn(console, 'error').mockImplementation();
  try {
    await runInit(['--name', 'Test', '--abbreviation', 'T', '--skip-agents']);
  } finally {
    process.chdir(originalCwd);
    logSpy.mockRestore();
    errorSpy.mockRestore();
  }
}

/**
 * Populate `scratchDir/node_modules`: every top-level package this repo already
 * has installed (so `@types/jest`, `@types/node` resolve for the scaffolded
 * `tsconfig.test.json`), plus `@3fn/core` pointed at the REAL package root, so
 * `@3fn/core/*` subpaths resolve exactly as they would for a packed consumer's
 * `tsc` (via the real `package.json` `exports` map → `dist/**`).
 */
function linkPackage(scratchDir: string): void {
  const destNM = path.join(scratchDir, 'node_modules');
  fs.mkdirSync(destNM, { recursive: true });
  const srcNM = path.join(PKG_ROOT, 'node_modules');
  for (const entry of fs.readdirSync(srcNM)) {
    if (entry === '@3fn') continue; // this monorepo doesn't depend on itself
    fs.symlinkSync(path.join(srcNM, entry), path.join(destNM, entry), 'dir');
  }
  const scope = path.join(destNM, '@3fn');
  fs.mkdirSync(scope, { recursive: true });
  fs.symlinkSync(PKG_ROOT, path.join(scope, 'core'), 'dir');
}

function runTsc(scratchDir: string): { status: number; output: string } {
  try {
    const output = execFileSync(TSC_BIN, ['--noEmit', '-p', 'tsconfig.test.json'], {
      cwd: scratchDir,
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    return { status: 0, output };
  } catch (err: any) {
    return { status: err.status ?? 1, output: `${err.stdout ?? ''}${err.stderr ?? ''}` };
  }
}

describe('init — the over-rewrite arbiter (Task 2.5)', () => {
  jest.setTimeout(60_000);
  let scratchDir: string;

  beforeEach(() => {
    scratchDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-overrewrite-'));
    scratchDir = fs.realpathSync(scratchDir);
    fs.mkdirSync(path.join(scratchDir, '.git'));
  });

  afterEach(() => {
    fs.rmSync(scratchDir, { recursive: true, force: true });
  });

  test('a real consumer `tsc --noEmit` over the copied+scaffolded tree passes, and the three theme files still read \'../types\'', async () => {
    await runInitIn(scratchDir);
    linkPackage(scratchDir);

    const result = runTsc(scratchDir);
    expect(result.output).toBe('');
    expect(result.status).toBe(0);

    for (const theme of ['dark', 'dark-wcag', 'wcag']) {
      const themeFile = path.join(scratchDir, `src/tokens/themes/${theme}/SemanticOverrides.ts`);
      expect(fs.existsSync(themeFile)).toBe(true);
      expect(fs.readFileSync(themeFile, 'utf-8')).toContain("from '../types'");
    }
  });

  test('BITE: restoring the old string-regex rewrite (which over-matches the intra-tree \'../types\' import) turns the arbiter RED', async () => {
    await runInitIn(scratchDir);
    linkPackage(scratchDir);

    // Reproduce D-B4's exact defect: a naive string-regex rewrite of every
    // '../types' occurrence, INCLUDING the intra-tree one in the theme files
    // (which rewriteByResolution correctly leaves alone).
    for (const theme of ['dark', 'dark-wcag', 'wcag']) {
      const themeFile = path.join(scratchDir, `src/tokens/themes/${theme}/SemanticOverrides.ts`);
      const content = fs.readFileSync(themeFile, 'utf-8');
      fs.writeFileSync(themeFile, content.replace(/from\s+['"]\.\.\/types['"]/, `from '@3fn/core/types'`), 'utf-8');
    }

    const result = runTsc(scratchDir);
    // '@3fn/core/types' does not export `SemanticOverrideMap` (DD17 de-scoped
    // the subpath that would) — this is exactly the consumer tsc failure
    // design.md names as the pre-implementation defect.
    expect(result.status).not.toBe(0);
    expect(result.output).toMatch(/SemanticOverrideMap/);
  });
});
