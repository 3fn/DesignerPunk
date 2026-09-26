/**
 * @category evergreen
 * @purpose Verify birth detection classification (Spec 123 Task 1.1) — nine named
 * cases, the walk's four boundary behaviors, and the three accepted barrel export
 * forms. See .kiro/specs/123-consumer-distribution/design.md § "C2. Birth detection"
 * and § "C3. The root-policy table as code".
 */
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { findDesignSystemRoot } from '../shared/bornRepo';
import { resolvePackageRoot } from '../shared/resolvePackageRoot';

const PRIMITIVE_BARREL_FUNCTION = `
export function getAllPrimitiveTokens() { return []; }
`;
const SEMANTIC_BARREL_FUNCTION = `
export function getAllSemanticTokens() { return []; }
`;

function mkTmpDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'dp-bornrepo-'));
}

function writeFile(dir: string, relPath: string, content: string): void {
  const full = path.join(dir, relPath);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content, 'utf8');
}

/** Writes a DesignerPunk-shaped tier at `dir/relTierPath` using the FUNCTION export form. */
function writeTier(dir: string, relTierPath: string): void {
  writeFile(dir, path.join(relTierPath, 'index.ts'), PRIMITIVE_BARREL_FUNCTION);
  writeFile(dir, path.join(relTierPath, 'semantic', 'index.ts'), SEMANTIC_BARREL_FUNCTION);
}

function writeConfig(dir: string, tokenSource?: string): void {
  const body = tokenSource
    ? `import { defineConfig } from '@3fn/core';\nexport default defineConfig({ name: 'T', abbreviation: 'T', tokenSource: '${tokenSource}' });\n`
    : `import { defineConfig } from '@3fn/core';\nexport default defineConfig({ name: 'T', abbreviation: 'T' });\n`;
  writeFile(dir, 'designerpunk.config.ts', body);
}

function writeManifest(dir: string, posture?: string): void {
  writeFile(dir, 'designerpunk.manifest.json', JSON.stringify({ posture }));
}

/** Marks `dir` as a `.git` boundary — as a FILE, the worktree/submodule shape. */
function markGitBoundaryAsFile(dir: string): void {
  writeFile(dir, '.git', 'gitdir: ../.git/worktrees/fixture\n');
}

/** Marks `dir` as a `.git` boundary — as a DIRECTORY, the normal-repo shape. */
function markGitBoundaryAsDir(dir: string): void {
  fs.mkdirSync(path.join(dir, '.git'), { recursive: true });
}

describe('findDesignSystemRoot — nine named cases', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = mkTmpDir();
    markGitBoundaryAsDir(tmpDir); // isolate the walk from ascending into the real repo
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test('case 1: born — config with tokenSource + a DesignerPunk tier at it', () => {
    writeConfig(tmpDir, './src/tokens');
    writeTier(tmpDir, 'src/tokens');

    const result = findDesignSystemRoot(tmpDir);

    expect(result.state).toBe('born');
    expect(result.root).toBe(tmpDir);
    expect(result.tierDir).toBe(path.resolve(tmpDir, 'src/tokens'));
    expect(result.partialCase).toBeUndefined();
    expect(result.signals).toEqual({ config: true, tier: true, manifest: false, legacyManifest: false });
  });

  test('case 2: package-mode — config without tokenSource, no local barrel', () => {
    writeConfig(tmpDir);

    const result = findDesignSystemRoot(tmpDir);

    expect(result.state).toBe('package-mode');
    expect(result.root).toBe(tmpDir);
    expect(result.tierDir).toBe(path.resolve(resolvePackageRoot(path.dirname(__dirname)), 'src/tokens'));
  });

  test('case 3: partial config-no-tier — tokenSource is set but no tier is at it', () => {
    writeConfig(tmpDir, './src/tokens');
    // No tier files written at src/tokens.

    const result = findDesignSystemRoot(tmpDir);

    expect(result.state).toBe('partial');
    expect(result.partialCase).toBe('config-no-tier');
    expect(result.tierDir).toBeNull();
  });

  test('case 4: partial unused-local-tier — config without tokenSource PLUS a local barrel', () => {
    writeConfig(tmpDir);
    writeTier(tmpDir, 'src/tokens');

    const result = findDesignSystemRoot(tmpDir);

    expect(result.state).toBe('partial');
    expect(result.partialCase).toBe('unused-local-tier');
  });

  test('case 5: partial tier-no-config — a local barrel with no config at all', () => {
    writeTier(tmpDir, 'src/tokens');

    const result = findDesignSystemRoot(tmpDir);

    expect(result.state).toBe('partial');
    expect(result.partialCase).toBe('tier-no-config');
  });

  test('case 6: partial manifest-only — a born-posture manifest with no config and no tier', () => {
    writeManifest(tmpDir, 'born');

    const result = findDesignSystemRoot(tmpDir);

    expect(result.state).toBe('partial');
    expect(result.partialCase).toBe('manifest-only');
    expect(result.signals.manifest).toBe(true);
  });

  test('case 7: unborn — no signal at all', () => {
    writeFile(tmpDir, 'README.md', '# nothing here\n');

    const result = findDesignSystemRoot(tmpDir);

    expect(result.state).toBe('unborn');
    expect(result.root).toBeNull();
    expect(result.tierDir).toBeNull();
  });

  test('case 8: the steward exemption — this repo classifies package-mode, never unused-local-tier', () => {
    // `resolvePackageRoot`'s traversal expects an anchor two levels below the
    // package root (e.g. `src/cli/`); this test file lives one level deeper.
    const packageRoot = resolvePackageRoot(path.dirname(__dirname));

    const result = findDesignSystemRoot(packageRoot);

    // The package's own root has a config without tokenSource AND a local
    // DesignerPunk-shaped src/tokens tier — ordinarily "unused-local-tier", but
    // here "the package's tree" IS the local tier (C2 Steward exemption).
    expect(result.state).toBe('package-mode');
    expect(result.partialCase).toBeUndefined();
    expect(result.root).toBe(packageRoot);
  });

  test('case 9: a consume-posture manifest alone → unborn', () => {
    writeManifest(tmpDir, 'consume');

    const result = findDesignSystemRoot(tmpDir);

    expect(result.state).toBe('unborn');
    expect(result.signals.manifest).toBe(false);
  });
});

describe('findDesignSystemRoot — the walk\'s four boundary behaviors', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = mkTmpDir();
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test('boundary 1: the walk starts AT startDir itself (inclusive), not its parent', () => {
    // startDir itself carries the born signals — nothing above it does. A walk
    // that begins evaluation one level too high (e.g. `path.dirname(startDir)`)
    // would miss this and read unborn.
    markGitBoundaryAsDir(tmpDir);
    writeConfig(tmpDir, './src/tokens');
    writeTier(tmpDir, 'src/tokens');

    const result = findDesignSystemRoot(tmpDir);

    expect(result.state).toBe('born');
    expect(result.root).toBe(tmpDir);
    // BITE (recorded red in the Task 1.1 completion doc): starting the walk from
    // `path.dirname(startDir)` instead of `startDir` turns this red — the parent
    // of a bare tmp fixture carries no signal, so `state` reads 'unborn'.
  });

  test('boundary 2: test-then-stop at `.git` (as a FILE — the worktree/submodule shape)', () => {
    // A born ancestor sits ABOVE a `.git` boundary. The walk tests the `.git`
    // level's own signals first (none here), then STOPS — it must never ascend
    // past `.git` to find the ancestor's signals.
    const ancestor = tmpDir;
    markGitBoundaryAsDir(ancestor); // isolate the fixture from the real repo above it
    writeConfig(ancestor, './src/tokens');
    writeTier(ancestor, 'src/tokens');

    const worktreeSub = path.join(ancestor, 'worktree-child');
    fs.mkdirSync(worktreeSub, { recursive: true });
    markGitBoundaryAsFile(worktreeSub); // `.git` as a FILE at this level

    const result = findDesignSystemRoot(worktreeSub);

    expect(result.state).toBe('unborn');
    // BITE (recorded red): if the stop check ran only for `.git`-as-directory and
    // ignored `.git`-as-file, this test's walk would not stop at `worktreeSub`
    // and would ascend into `ancestor`, reading 'born' instead of 'unborn'.
  });

  test('boundary 3: the node_modules skip — an installed package copy is never classified as root', () => {
    const consumerRoot = tmpDir;
    markGitBoundaryAsDir(consumerRoot);
    writeConfig(consumerRoot, './src/tokens');
    writeTier(consumerRoot, 'src/tokens');

    // A born-SHAPED directory living inside node_modules must be skipped, and the
    // walk must ascend past it to find the real consumer root above.
    const installedPkgSrc = path.join(consumerRoot, 'node_modules', '@3fn', 'core', 'src');
    fs.mkdirSync(installedPkgSrc, { recursive: true });
    writeConfig(path.join(consumerRoot, 'node_modules', '@3fn', 'core'), './src/tokens');
    writeTier(path.join(consumerRoot, 'node_modules', '@3fn', 'core'), 'src/tokens');

    const result = findDesignSystemRoot(installedPkgSrc);

    expect(result.state).toBe('born');
    expect(result.root).toBe(consumerRoot);
    // BITE (recorded red): dropping the `node_modules` skip classifies
    // `node_modules/@3fn/core` itself as the (wrong) root — `result.root` would
    // equal the installed-package directory, not `consumerRoot`.
  });

  test('boundary 4: consume-posture manifests are ignored by the manifest signal', () => {
    markGitBoundaryAsDir(tmpDir);
    writeManifest(tmpDir, 'consume');

    const result = findDesignSystemRoot(tmpDir);

    expect(result.state).toBe('unborn');
    expect(result.signals.manifest).toBe(false);
    // BITE (recorded red): counting a `posture:'consume'` manifest as the manifest
    // signal turns this 'partial' / 'manifest-only' instead of 'unborn'.
  });
});

describe('findDesignSystemRoot — the three accepted barrel export forms', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = mkTmpDir();
    markGitBoundaryAsDir(tmpDir);
    writeConfig(tmpDir, './src/tokens');
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test('form 1: export function', () => {
    writeFile(tmpDir, 'src/tokens/index.ts', 'export function getAllPrimitiveTokens() { return []; }\n');
    writeFile(tmpDir, 'src/tokens/semantic/index.ts', 'export function getAllSemanticTokens() { return []; }\n');

    expect(findDesignSystemRoot(tmpDir).state).toBe('born');
  });

  test('form 2: export const / let', () => {
    writeFile(tmpDir, 'src/tokens/index.ts', 'export const getAllPrimitiveTokens = () => [];\n');
    writeFile(tmpDir, 'src/tokens/semantic/index.ts', 'export let getAllSemanticTokens = () => [];\n');

    expect(findDesignSystemRoot(tmpDir).state).toBe('born');
  });

  test('form 3: re-export barrel', () => {
    writeFile(tmpDir, 'src/tokens/primitives.ts', 'export function getAllPrimitiveTokens() { return []; }\n');
    writeFile(tmpDir, 'src/tokens/index.ts', "export { getAllPrimitiveTokens } from './primitives';\n");
    writeFile(tmpDir, 'src/tokens/semantics.ts', 'export function getAllSemanticTokens() { return []; }\n');
    writeFile(tmpDir, 'src/tokens/semantic/index.ts', "export { getAllSemanticTokens } from '../semantics';\n");

    expect(findDesignSystemRoot(tmpDir).state).toBe('born');
  });
});
