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
  // Fixup (Ada 2026-09-26 addendum, per orchestrator review): the prior version of
  // this table only asserted "resolvesVia is a function" and a SELF-DECLARED
  // `runnerDefault` field — tautological, since nothing called the resolver or
  // checked its output against C3. Each row now carries REAL inputs and the
  // EXACT expected output straight from design.md § "C3", and actually calls the
  // resolver. Row count is still asserted (four rows: component / token index /
  // product / package-owned), tied to the array `test.each` reads from.
  interface C3Row {
    root: string;
    runnerDefault: 'none' | 'pkgRoot';
    call: () => unknown;
    expected: unknown;
  }

  const bornConsumer = dsRoot({ state: 'born', root: '/consumer' });
  const unborn = dsRoot({});

  const C3_TABLE: C3Row[] = [
    {
      root: 'component',
      runnerDefault: 'none',
      // C3: consumerRoot = bornRoot/src/components when born ∪ packageRoot, always both.
      call: () => resolveComponentRoots({ dsRoot: bornConsumer, packageRoot: PACKAGE_ROOT }),
      expected: {
        roots: [path.join('/consumer', 'src', 'components'), path.resolve(PACKAGE_ROOT, 'src', 'components', 'core')],
        sources: ['cwd', 'package'],
      },
    },
    {
      root: 'token index',
      runnerDefault: 'none',
      // C3: unborn → the package index, source 'package-consume', tokenOrigin 'designerpunk-reference'.
      call: () => resolveTokenIndexRoot({ dsRoot: unborn, packageRoot: PACKAGE_ROOT }),
      expected: {
        ok: true,
        path: path.resolve(PACKAGE_ROOT, 'token-index'),
        source: 'package-consume',
        tokenOrigin: 'designerpunk-reference',
      },
    },
    {
      root: 'product',
      runnerDefault: 'none',
      // C3: env, else bornRoot/product (born/package-mode/partial), else cwd/product (unborn).
      call: () => resolveProductRoot({ dsRoot: bornConsumer, cwd: CWD }),
      expected: { path: path.join('/consumer', 'product'), source: 'cwd' },
    },
    {
      root: 'package-owned',
      runnerDefault: 'pkgRoot',
      // C3 header: package-owned roots resolve env → package-relative, no cwd preference.
      call: () => resolvePackageOwnedRoot({ packageRoot: PACKAGE_ROOT, relPath: 'governance' }),
      expected: { path: path.resolve(PACKAGE_ROOT, 'governance'), source: 'package' },
    },
  ];

  test('exactly four rows', () => {
    // BITE (recorded red in the Task 1.2 completion doc's 2026-09-26 addendum):
    // deleting any entry from C3_TABLE turns this red.
    expect(C3_TABLE.length).toBe(4);
  });

  test.each(C3_TABLE)('row "$root" resolves to the value C3 specifies', ({ call, expected }) => {
    // BITE: changing the row's resolver call, or the resolver's own behavior, to
    // return anything other than the C3-specified value turns this red.
    expect(call()).toEqual(expected);
  });

  test('the three consumer-owned rows get no runner default; the package-owned row keeps pkgRoot', () => {
    const consumerOwnedRows = C3_TABLE.filter((row) => row.root !== 'package-owned');
    const packageOwnedRows = C3_TABLE.filter((row) => row.root === 'package-owned');
    expect(consumerOwnedRows.every((row) => row.runnerDefault === 'none')).toBe(true);
    expect(packageOwnedRows.every((row) => row.runnerDefault === 'pkgRoot')).toBe(true);
    expect(consumerOwnedRows.length).toBe(3);
    expect(packageOwnedRows.length).toBe(1);
  });
});
