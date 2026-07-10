/**
 * Coverage-map generator tests (C12, Spec 122 Task 8.2).
 *
 * Pure-core tests over the glob join, blank-row visibility, manifest completeness, and
 * serialization determinism — no filesystem/subprocess. Also an S-D1 spot-check: the
 * `122-diff-guard` manifest globs are asserted to derive from the LIVE `guardedRoots()`
 * function (change-detection by comparing against the imported function's current output,
 * not a frozen string literal — a change to `guardedRoots()` should move this assertion
 * automatically rather than require a hand-updated expectation).
 */

import {
  CHECK_CONTEXTS,
  buildCoverageManifest,
  buildCoverageMap,
  diffGuardSurfaceGlobs,
  matchesGlob,
  globToRegExp,
  serializeCoverageManifest,
  serializeCoverageMap,
  auditCoverageMap,
  type CoverageManifest,
  type CoverageRow,
} from '../coverage-map';
import { guardedRoots } from '../generate';

describe('coverage-map — glob join', () => {
  it('globToRegExp: `**` matches any nested path under a root', () => {
    const re = globToRegExp('canonical/agents/**');
    expect(re.test('canonical/agents/foo.md')).toBe(true);
    expect(re.test('canonical/agents/nested/foo.md')).toBe(true);
    expect(re.test('canonical/other/foo.md')).toBe(false);
  });

  it('globToRegExp: `*` matches within a single path segment', () => {
    const re = globToRegExp('canonical/agents/*.md');
    expect(re.test('canonical/agents/foo.md')).toBe(true);
    expect(re.test('canonical/agents/nested/foo.md')).toBe(false);
  });

  it('matchesGlob: a bare file path glob matches only itself', () => {
    expect(matchesGlob('canonical/coverage-map.yaml', 'canonical/coverage-map.yaml')).toBe(true);
    expect(matchesGlob('canonical/coverage-map.yaml', 'canonical/coverage-manifest.yaml')).toBe(false);
  });
});

describe('coverage-map — buildCoverageMap (blank-row visibility)', () => {
  const manifest: CoverageManifest = {
    '122-diff-guard': ['canonical/registry/**'],
    '122-canonical-vs-truth': ['canonical/agents/**'],
    '122-sweep-1-refs': [],
    '122-sweep-2-skills': [],
    '122-sweep-3-dupes': [],
    '122-sweep-4-ambient': [],
    '122-sweep-5-corrected-state': [],
    '122-sweep-6-declarations': [],
    '122-sweep-7-dispositions': [],
    '122-sweep-8-demotion': [],
  };

  it('a surface matching a check glob lists that check', () => {
    const rows = buildCoverageMap(['canonical/registry/tool-registry.json'], manifest);
    expect(rows).toEqual<CoverageRow[]>([
      { surface: 'canonical/registry/tool-registry.json', checks: ['122-diff-guard'] },
    ]);
  });

  it('a surface matching multiple check globs lists all of them', () => {
    const rows = buildCoverageMap(['canonical/agents/data.md'], {
      ...manifest,
      '122-diff-guard': ['canonical/agents/**'],
    });
    expect(rows[0].checks.sort()).toEqual(['122-canonical-vs-truth', '122-diff-guard']);
  });

  it('a surface matching NO check glob is a VISIBLE blank row (checks: []), never omitted', () => {
    const rows = buildCoverageMap(['canonical/generated.lock'], manifest);
    expect(rows).toEqual<CoverageRow[]>([{ surface: 'canonical/generated.lock', checks: [] }]);
  });

  it('preserves one row per input surface, in whatever order given (caller sorts for serialization)', () => {
    const rows = buildCoverageMap(['b/file', 'a/file'], manifest);
    expect(rows.map((r) => r.surface)).toEqual(['b/file', 'a/file']);
  });
});

describe('coverage-map — buildCoverageManifest completeness', () => {
  it('contains exactly the ten declared check contexts', () => {
    const manifest = buildCoverageManifest();
    expect(Object.keys(manifest).sort()).toEqual([...CHECK_CONTEXTS].sort());
  });

  it('every check context has at least one non-empty glob', () => {
    const manifest = buildCoverageManifest();
    for (const ctx of CHECK_CONTEXTS) {
      expect(manifest[ctx].length).toBeGreaterThan(0);
      for (const glob of manifest[ctx]) {
        expect(typeof glob).toBe('string');
        expect(glob.length).toBeGreaterThan(0);
      }
    }
  });
});

describe('coverage-map — S-D1 spot-check: 122-diff-guard derives from guardedRoots()', () => {
  it('every diffGuardSurfaceGlobs() entry traces to a CURRENT guardedRoots() entry (not a frozen literal)', () => {
    const roots = guardedRoots();
    const globs = diffGuardSurfaceGlobs();
    expect(globs).toHaveLength(roots.length);
    for (const root of roots) {
      const expectedGlob = root.includes('.') && /\.[a-z0-9]+$/i.test(root) ? root : `${root}/**`;
      expect(globs).toContain(expectedGlob);
    }
  });

  it('a file-path root (e.g. coverage-map.yaml) globs to itself, not `<file>/**`', () => {
    expect(guardedRoots()).toContain('canonical/coverage-map.yaml');
    expect(diffGuardSurfaceGlobs()).toContain('canonical/coverage-map.yaml');
    expect(diffGuardSurfaceGlobs()).not.toContain('canonical/coverage-map.yaml/**');
  });

  it('a directory root globs to `<root>/**`', () => {
    expect(guardedRoots()).toContain('canonical/registry');
    expect(diffGuardSurfaceGlobs()).toContain('canonical/registry/**');
  });
});

describe('coverage-map — serialization determinism', () => {
  const manifest: CoverageManifest = {
    '122-diff-guard': ['b/**', 'a/**'],
    '122-canonical-vs-truth': ['canonical/agents/**'],
    '122-sweep-1-refs': [],
    '122-sweep-2-skills': [],
    '122-sweep-3-dupes': [],
    '122-sweep-4-ambient': [],
    '122-sweep-5-corrected-state': [],
    '122-sweep-6-declarations': [],
    '122-sweep-7-dispositions': [],
    '122-sweep-8-demotion': [],
  };
  const rows: CoverageRow[] = [
    { surface: 'z/file', checks: ['122-diff-guard'] },
    { surface: 'a/file', checks: ['122-canonical-vs-truth', '122-diff-guard'] },
  ];

  it('serializeCoverageManifest is byte-identical across repeated calls (same input)', () => {
    expect(serializeCoverageManifest(manifest)).toBe(serializeCoverageManifest(manifest));
  });

  it('serializeCoverageMap is byte-identical across repeated calls (same input)', () => {
    expect(serializeCoverageMap(rows)).toBe(serializeCoverageMap(rows));
  });

  it('serializeCoverageMap sorts rows by surface regardless of input order', () => {
    const out = serializeCoverageMap(rows);
    const aIndex = out.indexOf('a/file');
    const zIndex = out.indexOf('z/file');
    expect(aIndex).toBeGreaterThan(-1);
    expect(zIndex).toBeGreaterThan(-1);
    expect(aIndex).toBeLessThan(zIndex);
  });

  it('serializeCoverageManifest carries a generated-file header comment', () => {
    expect(serializeCoverageManifest(manifest)).toMatch(/^# coverage-manifest\.yaml — GENERATED/);
  });

  it('serializeCoverageMap carries a generated-file header comment', () => {
    expect(serializeCoverageMap(rows)).toMatch(/^# coverage-map\.yaml — GENERATED/);
  });
});

describe('coverage-map — auditCoverageMap (blank-row / adjudication gate)', () => {
  it('passes with zero blank rows', () => {
    const audit = auditCoverageMap([{ surface: 'a', checks: ['122-diff-guard'] }], []);
    expect(audit.pass).toBe(true);
    expect(audit.blankSurfaces).toBe(0);
  });

  it('fails on an unadjudicated blank row', () => {
    const audit = auditCoverageMap([{ surface: 'canonical/generated.lock', checks: [] }], []);
    expect(audit.pass).toBe(false);
    expect(audit.unadjudicatedBlanks).toEqual(['canonical/generated.lock']);
  });

  it('a recorded audit:coverage-map adjudication covers the blank (visible, no longer failing)', () => {
    const audit = auditCoverageMap([{ surface: 'canonical/generated.lock', checks: [] }], [
      {
        sweep: 'audit:coverage-map',
        key: 'canonical/generated.lock',
        ruling: 'intentional-trim',
        owner: 'thurgood',
        record: 'task-8-2',
      },
    ]);
    expect(audit.pass).toBe(true);
    expect(audit.adjudicatedBlanks).toEqual(['canonical/generated.lock']);
    expect(audit.unadjudicatedBlanks).toEqual([]);
  });

  it('an adjudication under a DIFFERENT sweep context does not cover the blank', () => {
    const audit = auditCoverageMap([{ surface: 'canonical/generated.lock', checks: [] }], [
      {
        sweep: '122-sweep-4-ambient',
        key: 'canonical/generated.lock',
        ruling: 'intentional-trim',
        owner: 'thurgood',
        record: 'x',
      },
    ]);
    expect(audit.pass).toBe(false);
  });

  it('reports total/guarded/blank counts', () => {
    const audit = auditCoverageMap(
      [
        { surface: 'a', checks: ['122-diff-guard'] },
        { surface: 'b', checks: [] },
        { surface: 'c', checks: ['122-sweep-1-refs'] },
      ],
      []
    );
    expect(audit.totalSurfaces).toBe(3);
    expect(audit.guardedSurfaces).toBe(2);
    expect(audit.blankSurfaces).toBe(1);
  });
});
