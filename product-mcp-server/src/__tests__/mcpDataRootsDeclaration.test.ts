/**
 * Type-level declaration test — product-mcp-server's hand-written
 * `McpDataRootsModule` interface vs. the REAL shared module (Spec 123 Task 1.2).
 *
 * See application-mcp-server/src/__tests__/mcpDataRootsDeclaration.test.ts for the
 * full rationale (identical pattern; this server declares `resolveProductRoot`
 * in addition, its own third consumer-owned root — C3).
 *
 * @see .kiro/specs/123-consumer-distribution/design.md § "C3. The root-policy table as code"
 */
import * as path from 'path';
import type { McpDataRootsModule, DesignSystemRootShape } from '../index';

function loadRealModule(): McpDataRootsModule {
  return require('../../../dist/cli/shared/mcpDataRoots') as McpDataRootsModule;
}

const bornDsRoot: DesignSystemRootShape = {
  state: 'born',
  root: path.resolve(__dirname, '../../..'), // repo root — real product/ + token-index/ live here
  tierDir: '/does-not-matter-for-this-test',
  signals: { config: true, tier: true, manifest: false, legacyManifest: false },
};

const unbornDsRoot: DesignSystemRootShape = {
  state: 'unborn',
  root: null,
  tierDir: null,
  signals: { config: false, tier: false, manifest: false, legacyManifest: false },
};

describe('product-mcp-server McpDataRootsModule — declaration parity with the real module', () => {
  let real: McpDataRootsModule;

  beforeAll(() => {
    real = loadRealModule();
  });

  test('resolvePackageRoot exists and returns a string', () => {
    // resolvePackageRoot expects an anchor two levels below the package root
    // (e.g. `product-mcp-server/src/`) — this test file is one level deeper.
    expect(typeof real.resolvePackageRoot).toBe('function');
    expect(typeof real.resolvePackageRoot(path.resolve(__dirname, '..'))).toBe('string');
  });

  test('resolveConsumerOwnedRoot (deprecated, kept) still returns { path, source }', () => {
    const result = real.resolveConsumerOwnedRoot({ relPath: 'product' });
    expect(typeof result.path).toBe('string');
  });

  test('resolveComponentRoots exists and returns { roots: string[], sources }', () => {
    const result = real.resolveComponentRoots({ dsRoot: bornDsRoot, packageRoot: '/pkg' });
    expect(Array.isArray(result.roots)).toBe(true);
    expect(result.roots.length).toBe(result.sources.length);
  });

  test('resolveTokenIndexRoot exists and returns the discriminated shape the local interface declares', () => {
    const unborn = real.resolveTokenIndexRoot({ dsRoot: unbornDsRoot, packageRoot: '/pkg' });
    expect(unborn.ok).toBe(true);
    if (unborn.ok) expect(unborn.tokenOrigin).toBe('designerpunk-reference');
  });

  test('resolveProductRoot exists and returns { path, source } for every posture', () => {
    expect(typeof real.resolveProductRoot).toBe('function');

    const born = real.resolveProductRoot({ dsRoot: bornDsRoot, cwd: '/cwd' });
    expect(born.path).toBe(path.join(bornDsRoot.root as string, 'product'));

    const unborn = real.resolveProductRoot({ dsRoot: unbornDsRoot, cwd: '/cwd' });
    expect(unborn.path).toBe(path.resolve('/cwd', 'product'));
  });
});
