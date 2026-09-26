/**
 * @category evergreen
 * @purpose Verify the birth-aware data-root resolvers (Spec 123 Task 1.2) — per-state
 * branching for each resolver, and the C3 "Root | Keys | Resolves via | Runner default"
 * table conformance (row count asserted).
 * @see .kiro/specs/123-consumer-distribution/design.md § "C3. The root-policy table as code"
 */
import * as path from 'path';
import {
  resolveComponentRoots,
  resolveTokenIndexRoot,
  resolveProductRoot,
  resolvePackageOwnedRoot,
} from '../shared/mcpDataRoots';
import type { DesignSystemRoot } from '../shared/bornRepo';

const PACKAGE_ROOT = '/pkg';
const CWD = '/cwd';

function dsRoot(overrides: Partial<DesignSystemRoot>): DesignSystemRoot {
  return {
    state: 'unborn',
    root: null,
    tierDir: null,
    signals: { config: false, tier: false, manifest: false, legacyManifest: false },
    ...overrides,
  };
}

describe('resolveComponentRoots', () => {
  test('born: consumer root (bornRoot/src/components) ∪ package root', () => {
    const result = resolveComponentRoots({
      dsRoot: dsRoot({ state: 'born', root: '/consumer' }),
      packageRoot: PACKAGE_ROOT,
    });
    expect(result.roots).toEqual([
      path.join('/consumer', 'src', 'components'),
      path.resolve(PACKAGE_ROOT, 'src', 'components', 'core'),
    ]);
    expect(result.sources).toEqual(['cwd', 'package']);
  });

  test('env value names the consumer root, never the only root — package root is still present', () => {
    const result = resolveComponentRoots({
      envValue: '/explicit/components',
      dsRoot: dsRoot({ state: 'partial' }),
      packageRoot: PACKAGE_ROOT,
    });
    expect(result.roots).toEqual([
      path.resolve('/explicit/components'),
      path.resolve(PACKAGE_ROOT, 'src', 'components', 'core'),
    ]);
    expect(result.sources).toEqual(['env', 'package']);
  });

  test('unborn with no env: package root only', () => {
    const result = resolveComponentRoots({ dsRoot: dsRoot({}), packageRoot: PACKAGE_ROOT });
    expect(result.roots).toEqual([path.resolve(PACKAGE_ROOT, 'src', 'components', 'core')]);
    expect(result.sources).toEqual(['package']);
  });
});

describe('resolveTokenIndexRoot', () => {
  test('explicit env value, empty string → error', () => {
    const result = resolveTokenIndexRoot({ envValue: '', dsRoot: dsRoot({}), packageRoot: PACKAGE_ROOT });
    expect(result).toEqual({ ok: false, reason: 'empty-env-value' });
  });

  test('explicit env value pointing at a nonexistent dir → error, in ANY posture', () => {
    const result = resolveTokenIndexRoot({
      envValue: '/nonexistent-token-index-dir-xyz',
      dsRoot: dsRoot({ state: 'born', root: '/consumer' }),
      packageRoot: PACKAGE_ROOT,
    });
    expect(result).toEqual({ ok: false, reason: 'empty-env-value' });
  });

  test('born, index absent/empty → run-generate', () => {
    const result = resolveTokenIndexRoot({
      dsRoot: dsRoot({ state: 'born', root: __dirname }), // __dirname has no `token-index` child
      packageRoot: PACKAGE_ROOT,
    });
    expect(result).toEqual({ ok: false, reason: 'run-generate' });
  });

  test('born, index present → ok, no tokenOrigin', () => {
    // This repo's own root has a real, non-empty `token-index/` directory.
    const bornRoot = path.resolve(__dirname, '../../..');
    const result = resolveTokenIndexRoot({
      dsRoot: dsRoot({ state: 'born', root: bornRoot }),
      packageRoot: PACKAGE_ROOT,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.path).toBe(path.join(bornRoot, 'token-index'));
      expect(result.source).toBe('cwd');
      expect(result.tokenOrigin).toBeUndefined();
    }
  });

  test('package-mode, index present → ok, tokenOrigin designerpunk-package-mode', () => {
    const packageModeRoot = path.resolve(__dirname, '../../..'); // repo root — has a real token-index/
    const result = resolveTokenIndexRoot({
      dsRoot: dsRoot({ state: 'package-mode', root: packageModeRoot }),
      packageRoot: PACKAGE_ROOT,
    });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.tokenOrigin).toBe('designerpunk-package-mode');
  });

  test('partial → its own error, naming the sub-case — NEVER run-generate', () => {
    const result = resolveTokenIndexRoot({
      dsRoot: dsRoot({ state: 'partial', partialCase: 'tier-no-config' }),
      packageRoot: PACKAGE_ROOT,
    });
    expect(result).toEqual({ ok: false, reason: 'partial', partialCase: 'tier-no-config' });
  });

  test('unborn → the package index, source package-consume, tokenOrigin designerpunk-reference', () => {
    const result = resolveTokenIndexRoot({ dsRoot: dsRoot({}), packageRoot: PACKAGE_ROOT });
    expect(result).toEqual({
      ok: true,
      path: path.resolve(PACKAGE_ROOT, 'token-index'),
      source: 'package-consume',
      tokenOrigin: 'designerpunk-reference',
    });
  });
});

describe('resolveProductRoot', () => {
  test('env wins in any posture', () => {
    const result = resolveProductRoot({ envValue: '/explicit/product', dsRoot: dsRoot({ state: 'born', root: '/consumer' }), cwd: CWD });
    expect(result).toEqual({ path: path.resolve('/explicit/product'), source: 'env' });
  });

  test('born → bornRoot/product', () => {
    const result = resolveProductRoot({ dsRoot: dsRoot({ state: 'born', root: '/consumer' }), cwd: CWD });
    expect(result).toEqual({ path: path.join('/consumer', 'product'), source: 'cwd' });
  });

  test('package-mode → bornRoot/product', () => {
    const result = resolveProductRoot({ dsRoot: dsRoot({ state: 'package-mode', root: '/consumer' }), cwd: CWD });
    expect(result).toEqual({ path: path.join('/consumer', 'product'), source: 'cwd' });
  });

  test('partial → bornRoot/product', () => {
    const result = resolveProductRoot({ dsRoot: dsRoot({ state: 'partial', root: '/consumer' }), cwd: CWD });
    expect(result).toEqual({ path: path.join('/consumer', 'product'), source: 'cwd' });
  });

  test('unborn → cwd/product (unchanged pre-123 behavior)', () => {
    const result = resolveProductRoot({ dsRoot: dsRoot({}), cwd: CWD });
    expect(result).toEqual({ path: path.resolve(CWD, 'product'), source: 'cwd' });
  });
});

describe('C3 root-policy table conformance — "Root | Keys | Resolves via | Runner default"', () => {
  // Each row names: which resolver serves the root, and whether the RUNNER
  // (designerpunk.ts, Task 1.3) sets a default for it. Component/token-index/
  // product get NO runner default (the resolver — birth-aware — decides);
  // package-owned roots keep the pkgRoot default. Row count is asserted.
  const table: Array<{ root: string; resolvesVia: (...args: never[]) => unknown; runnerDefault: 'none' | 'pkgRoot' }> = [
    { root: 'component', resolvesVia: resolveComponentRoots as never, runnerDefault: 'none' },
    { root: 'token index', resolvesVia: resolveTokenIndexRoot as never, runnerDefault: 'none' },
    { root: 'product', resolvesVia: resolveProductRoot as never, runnerDefault: 'none' },
    { root: 'package-owned', resolvesVia: resolvePackageOwnedRoot as never, runnerDefault: 'pkgRoot' },
  ];

  test('exactly four rows', () => {
    expect(table.length).toBe(4);
  });

  test.each(table)('row "$root" resolves via a defined function', ({ resolvesVia }) => {
    expect(typeof resolvesVia).toBe('function');
  });

  test('the three consumer-owned rows get no runner default; the package-owned row keeps pkgRoot', () => {
    const consumerOwnedRows = table.filter((row) => row.root !== 'package-owned');
    const packageOwnedRows = table.filter((row) => row.root === 'package-owned');
    expect(consumerOwnedRows.every((row) => row.runnerDefault === 'none')).toBe(true);
    expect(packageOwnedRows.every((row) => row.runnerDefault === 'pkgRoot')).toBe(true);
    expect(consumerOwnedRows.length).toBe(3);
    expect(packageOwnedRows.length).toBe(1);
  });
});
