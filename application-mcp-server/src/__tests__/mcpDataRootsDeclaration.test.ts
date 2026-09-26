/**
 * Type-level declaration test — application-mcp-server's hand-written
 * `McpDataRootsModule` interface vs. the REAL shared module (Spec 123 Task 1.2).
 *
 * WHY THIS EXISTS: `index.ts` cannot statically import `src/cli/shared/mcpDataRoots.ts`
 * (crosses this sub-package's tsc `rootDir` boundary — see that file's "CONSUMPTION
 * CONTRACT"). It instead hand-declares a local `McpDataRootsModule` interface and casts
 * the dist-required object against it (`as McpDataRootsModule`). A return-shape change on
 * the real module that misses this local declaration site compiles clean and fails only
 * at RUNTIME (C3, Lina R2 A8) — this test is the mechanical guard against that drift: it
 * loads the REAL compiled module and checks, at runtime, that every function the local
 * interface declares actually exists with a call that satisfies the interface's declared
 * return shape.
 *
 * @see .kiro/specs/123-consumer-distribution/design.md § "C3. The root-policy table as code"
 */
import * as path from 'path';
import type { McpDataRootsModule, DesignSystemRootShape, BornRepoModule } from '../index';

function loadRealModule(): McpDataRootsModule {
  // Same CONSUMPTION CONTRACT require the production bootstrap uses.
  return require('../../../dist/cli/shared/mcpDataRoots') as McpDataRootsModule;
}

const bornDsRoot: DesignSystemRootShape = {
  state: 'born',
  root: path.resolve(__dirname, '../../..'), // repo root — real token-index/ + src/tokens/ live here
  tierDir: '/does-not-matter-for-this-test',
  signals: { config: true, tier: true, manifest: false, legacyManifest: false },
};

const unbornDsRoot: DesignSystemRootShape = {
  state: 'unborn',
  root: null,
  tierDir: null,
  signals: { config: false, tier: false, manifest: false, legacyManifest: false },
};

describe('application-mcp-server McpDataRootsModule — declaration parity with the real module', () => {
  let real: McpDataRootsModule;

  beforeAll(() => {
    real = loadRealModule();
  });

  test('resolvePackageRoot exists and returns a string', () => {
    // resolvePackageRoot expects an anchor two levels below the package root
    // (e.g. `application-mcp-server/src/`) — this test file is one level deeper.
    expect(typeof real.resolvePackageRoot).toBe('function');
    expect(typeof real.resolvePackageRoot(path.resolve(__dirname, '..'))).toBe('string');
  });

  test('resolvePackageOwnedRoot exists and returns { path, source }', () => {
    const result = real.resolvePackageOwnedRoot({ packageRoot: '/pkg', relPath: 'governance' });
    expect(typeof result.path).toBe('string');
    expect(result.source).toBe('package');
  });

  test('resolveConsumerOwnedRoot (deprecated, kept) still returns { path, source }', () => {
    const result = real.resolveConsumerOwnedRoot({ relPath: 'token-index', packageRoot: '/pkg' });
    expect(typeof result.path).toBe('string');
  });

  test('resolveComponentRoots exists and returns { roots: string[], sources }', () => {
    const result = real.resolveComponentRoots({ dsRoot: bornDsRoot, packageRoot: '/pkg' });
    expect(Array.isArray(result.roots)).toBe(true);
    expect(Array.isArray(result.sources)).toBe(true);
    expect(result.roots.length).toBe(result.sources.length);
  });

  test('resolveTokenIndexRoot exists and returns the discriminated shape the local interface declares', () => {
    const born = real.resolveTokenIndexRoot({ dsRoot: bornDsRoot, packageRoot: '/pkg' });
    expect(typeof born.ok).toBe('boolean');
    if (born.ok) {
      expect(typeof born.path).toBe('string');
      expect(typeof born.source).toBe('string');
    }

    const unborn = real.resolveTokenIndexRoot({ dsRoot: unbornDsRoot, packageRoot: '/pkg' });
    expect(unborn.ok).toBe(true);
    if (unborn.ok) expect(unborn.tokenOrigin).toBe('designerpunk-reference');
  });
});

describe('application-mcp-server BornRepoModule — declaration parity with the real module (Spec 123 Task 1.4)', () => {
  test('findDesignSystemRoot exists and returns the DesignSystemRootShape the local interface declares', () => {
    // Same CONSUMPTION CONTRACT require the production bootstrap uses.
    const real = require('../../../dist/cli/shared/bornRepo') as BornRepoModule;
    expect(typeof real.findDesignSystemRoot).toBe('function');
    const result = real.findDesignSystemRoot(path.resolve(__dirname, '../../..'));
    expect(['born', 'package-mode', 'partial', 'unborn']).toContain(result.state);
    expect(result.root === null || typeof result.root === 'string').toBe(true);
    expect(result.tierDir === null || typeof result.tierDir === 'string').toBe(true);
    expect(Object.keys(result.signals).sort()).toEqual(['config', 'legacyManifest', 'manifest', 'tier']);
  });
});
