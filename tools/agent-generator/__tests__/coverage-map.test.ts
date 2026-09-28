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

// ============================================================================
// Lanes section — required-check steps vs local lane roots (Ballot B-CI § 5, PR-2; issue (d))
// ============================================================================

import {
  LANES_SWEEP_CONTEXT,
  analyzeLanes,
  auditLanes,
  deriveJobContext,
  formatLaneAudit,
  parseExpectedContexts,
  readLaneInputs,
  splitSimpleCommands,
  type LaneInputs,
} from '../coverage-map';
import type { RecordedAdjudication } from '../sweeps/common';
import * as path from 'path';

const REPO = '/repo';

/** A small but complete fixture: two required workflows, one non-required, three configs. */
function fixture(): LaneInputs {
  return {
    repoRoot: REPO,
    expectedContexts: ['Guard', 'lane-functional', 'lane-sub', 'check-a', 'check-b'],
    workflows: {
      '.github/workflows/guard.yml': `
name: Guard
on: [pull_request, workflow_dispatch]
jobs:
  guard:
    name: \${{ github.event_name == 'workflow_dispatch' && 'Guard (unit-branch)' || 'Guard' }}
    steps:
      - run: npm ci
      - run: npm run lint
      - run: npm run test:smoke
`,
      '.github/workflows/lanes.yml': `
name: Lanes
jobs:
  functional:
    name: \${{ github.event_name == 'workflow_dispatch' && 'lane-functional (unit-branch)' || 'lane-functional' }}
    steps:
      - name: Selection floor
        run: |
          npx jest --listTests --config jest.functional.config.js > out.txt
          COUNT=$(wc -l < out.txt | tr -d ' ')
          [ "$COUNT" -ge 1 ]
      - run: npm test
      - run: npm run test:scripts
  sub:
    name: lane-sub
    defaults:
      run:
        working-directory: sub
    steps:
      - run: npm ci
      - run: npm test
`,
      '.github/workflows/matrix.yml': `
jobs:
  setup:
    name: setup
    steps:
      - run: npm run check:noop
  check:
    needs: setup
    name: \${{ github.event_name == 'workflow_dispatch' && format('{0} (unit-branch)', matrix.context) || matrix.context }}
    strategy:
      matrix:
        include:
          - context: check-a
            cmd: npm run check:a
          - context: check-b
            cmd: npm run check:b
          - context: check-retired
            cmd: npm run test:agent-generator
    steps:
      - run: \${{ matrix.cmd }}
`,
    },
    packages: {
      '.': {
        test: 'jest --config jest.functional.config.js',
        'test:all': 'jest',
        'test:scripts': 'jest --config scripts/jest.config.js',
        'test:agent-generator': 'jest --config tools/jest.config.js',
        'test:smoke': "jest --roots='<rootDir>/tests' --testMatch='**/smoke.test.ts'",
        'test:matrix': 'node src/matrix/run.js',
        lint: 'eslint src',
        'check:noop': 'tsx tools/noop.ts',
        'check:a': 'tsx tools/a.ts',
        'check:b': 'tsx tools/b.ts',
      },
      sub: { test: "jest --testPathIgnorePatterns='tests/performance'" },
    },
    jestConfigs: {
      'jest.config.js': { roots: ['<rootDir>/src'], testMatch: ['**/__tests__/**/*.test.ts'] },
      'jest.functional.config.js': {
        roots: ['<rootDir>/src'],
        testMatch: ['**/__tests__/**/*.test.ts'],
        testPathIgnorePatterns: ['/node_modules/', '__tests__/performance'],
      },
      'scripts/jest.config.js': { rootDir: '.', roots: ['<rootDir>'], testMatch: ['**/__tests__/**/*.test.ts'] },
      'tools/jest.config.js': { rootDir: '.', roots: ['<rootDir>'], testMatch: ['**/__tests__/**/*.test.ts'] },
      'sub/jest.config.js': { roots: ['<rootDir>/src', '<rootDir>/tests'], testMatch: ['**/__tests__/**/*.test.ts', '**/tests/**/*.test.ts'] },
    },
    files: [
      'jest.config.js',
      'jest.functional.config.js',
      'scripts/jest.config.js',
      'tools/jest.config.js',
      'sub/jest.config.js',
      'src/a/__tests__/a.test.ts',
      'src/b/__tests__/b.test.ts',
      'src/__tests__/performance/perf.test.ts',
      'scripts/__tests__/s.test.ts',
      'tools/__tests__/t.test.ts',
      'tests/smoke.test.ts',
      'sub/src/__tests__/x.test.ts',
      'sub/tests/performance/p.test.ts',
      'src/a/index.ts',
    ],
  };
}

const keys = (inputs: LaneInputs) => analyzeLanes(inputs).rows.map((r) => r.key).sort();

describe('coverage-map lanes — derivation primitives', () => {
  it('parseExpectedContexts reads the quoted entries of the EXPECTED_CONTEXTS array (comments ignored)', () => {
    const sh = ['X=1', 'EXPECTED_CONTEXTS=(', '  # a comment', '  "Consumer Guard"', '  "122-diff-guard"   # trailing', ')', '"not-this"'].join('\n');
    expect(parseExpectedContexts(sh)).toEqual(['Consumer Guard', '122-diff-guard']);
  });

  it('deriveJobContext takes the pull_request branch of the unit-branch rename (literal and matrix forms)', () => {
    expect(deriveJobContext('j', "${{ github.event_name == 'workflow_dispatch' && 'Guard (unit-branch)' || 'Guard' }}", {})).toBe('Guard');
    expect(
      deriveJobContext('j', "${{ github.event_name == 'workflow_dispatch' && format('{0} (unit-branch)', matrix.context) || matrix.context }}", { context: '122-x' })
    ).toBe('122-x');
    expect(deriveJobContext('job-id', undefined, {})).toBe('job-id');
    expect(deriveJobContext('j', 'Plain name', {})).toBe('Plain name');
  });

  it('splitSimpleCommands respects quotes (a `|` inside a jest regex is not a pipe) and scopes `cd` to its subshell', () => {
    const cmds = splitSimpleCommands("jest --testPathPatterns='a|b'\n(cd sub && npm run build)\nnpm run x 2>&1 | tee out", '.');
    expect(cmds.map((c) => [c.words.join(' '), c.cwd])).toEqual([
      ['jest --testPathPatterns=a|b', '.'],
      ['npm run build', 'sub'],
      ['npm run x', '.'],
      ['tee out', '.'],
    ]);
  });
});

describe('coverage-map lanes — analyzeLanes on the fixture', () => {
  it('surfaces exactly the expected rows (required-only, local-only, non-jest local script)', () => {
    expect(keys(fixture())).toEqual([
      'local-config:jest.config.js@src/__tests__/performance/',
      'local-config:sub/jest.config.js@sub/tests/performance/',
      'local-config:tools/jest.config.js',
      'local-script:test:matrix',
      'required-script:test:smoke',
    ]);
  });

  it('a retired (non-expected) matrix context does not make its step required; `needs:` upstream jobs do', () => {
    const a = analyzeLanes(fixture());
    // check-retired runs test:agent-generator — not required, so tools/jest.config.js stays a row.
    expect(a.rows.map((r) => r.key)).toContain('local-config:tools/jest.config.js');
    expect(a.inventory.find((e) => e.command === 'npm run check:noop')?.contexts).toEqual(['setup (needs of a required job)']);
    expect(a.inventory.find((e) => e.command === 'npm run check:a')?.contexts).toEqual(['check-a']);
  });

  it('non-test required scripts and jest listings are inventory (visible, not rows)', () => {
    const inv = analyzeLanes(fixture()).inventory.map((e) => `${e.kind} ${e.command}`);
    expect(inv).toEqual(
      expect.arrayContaining([
        'non-test-script npm run lint',
        'jest-listing npx jest --listTests --config jest.functional.config.js',
      ])
    );
  });

  it('compared-with-no-gap evidence names the clean lanes on both sides', () => {
    const a = analyzeLanes(fixture());
    expect(a.requiredCompared).toEqual(['npm run test', 'npm run test [sub]', 'npm run test:scripts']);
    expect(a.localCompared).toEqual(['jest.functional.config.js (2)', 'scripts/jest.config.js (1)']);
  });
});

describe('coverage-map lanes — bites', () => {
  it('BITE 1: removing a lane script from a required workflow makes its config a (ii) row', () => {
    const f = fixture();
    expect(keys(f)).not.toContain('local-config:scripts/jest.config.js');
    f.workflows['.github/workflows/lanes.yml'] = f.workflows['.github/workflows/lanes.yml'].replace('      - run: npm run test:scripts\n', '');
    expect(keys(f)).toContain('local-config:scripts/jest.config.js');
  });

  it('BITE 1b: removing a context from the required set has the same effect (required-ness is derived)', () => {
    const f = fixture();
    f.expectedContexts = f.expectedContexts.filter((c) => c !== 'lane-functional');
    expect(keys(f)).toEqual(expect.arrayContaining(['local-config:scripts/jest.config.js', 'local-config:jest.functional.config.js']));
  });

  it('BITE 2: adding a lane config nobody runs makes a (ii) row — even when its files are exercised elsewhere', () => {
    const f = fixture();
    f.jestConfigs['jest.extra.config.js'] = { roots: ['<rootDir>/src'], testMatch: ['**/__tests__/**/*.test.ts'] };
    f.files = [...f.files, 'jest.extra.config.js'];
    const row = analyzeLanes(f).rows.find((r) => r.key === 'local-config:jest.extra.config.js');
    expect(row).toBeDefined();
    expect(row?.detail).toMatch(/no required step invokes this jest config; 1 of 3/);
  });

  it('BITE 3: a required script whose tests sit outside every local lane root makes an (i) row', () => {
    const f = fixture();
    f.packages['.']['test:smoke2'] = "jest --roots='<rootDir>/e2e' --testMatch='**/*.e2e.ts'";
    f.files = [...f.files, 'e2e/flow.e2e.ts'];
    f.workflows['.github/workflows/guard.yml'] += '      - run: npm run test:smoke2\n';
    const row = analyzeLanes(f).rows.find((r) => r.key === 'required-script:test:smoke2');
    expect(row?.kind).toBe('required-only');
    expect(row?.evidence).toEqual(['e2e/ (1): flow.e2e.ts']);
  });

  it('BITE 4: a new unexercised test directory under an invoked config gets its own row', () => {
    const f = fixture();
    f.files = [...f.files, 'src/c/__tests__/performance/slow.test.ts'];
    expect(keys(f)).toContain('local-config:jest.config.js@src/c/__tests__/performance/');
  });

  it('a non-jest local test script stops being a row once a required step runs it', () => {
    const f = fixture();
    f.workflows['.github/workflows/guard.yml'] += '      - run: npm run test:matrix\n';
    expect(keys(f)).not.toContain('local-script:test:matrix');
  });
});

describe('coverage-map lanes — derivation errors are never adjudicable', () => {
  it('an expected context no job produces is an ERROR row', () => {
    const f = fixture();
    f.expectedContexts = [...f.expectedContexts, 'Ghost Check'];
    const audit = auditLanes(analyzeLanes(f), [
      { sweep: LANES_SWEEP_CONTEXT, key: 'unresolved-context:Ghost Check', ruling: 'intentional-trim', owner: 'stacy', record: 'x' },
    ]);
    expect(audit.errors.map((r) => r.key)).toEqual(['unresolved-context:Ghost Check']);
    expect(audit.pass).toBe(false);
  });

  it('a required step naming a script that does not exist is an ERROR row', () => {
    const f = fixture();
    f.workflows['.github/workflows/guard.yml'] += '      - run: npm run test:gone\n';
    const a = analyzeLanes(f);
    expect(a.rows.find((r) => r.key === 'unresolved-step:npm run test:gone')?.kind).toBe('error');
  });

  it('an unloadable jest config is an ERROR row', () => {
    const f = fixture();
    f.jestConfigs['jest.ts.config.ts'] = undefined;
    expect(analyzeLanes(f).rows.find((r) => r.key === 'unloadable-config:jest.ts.config.ts')?.kind).toBe('error');
  });
});

describe('coverage-map lanes — auditLanes (adjudication join)', () => {
  const all = (f: LaneInputs): RecordedAdjudication[] =>
    analyzeLanes(f).rows.map((r) => ({ sweep: LANES_SWEEP_CONTEXT, key: r.key, ruling: 'intentional-trim' as const, owner: 'stacy', record: 'r' }));

  it('fails with unadjudicated rows; passes once every row is adjudicated under the lanes sweep', () => {
    const f = fixture();
    expect(auditLanes(analyzeLanes(f), []).pass).toBe(false);
    const audit = auditLanes(analyzeLanes(f), all(f));
    expect(audit.pass).toBe(true);
    expect(audit.adjudicated).toHaveLength(5);
  });

  it('an adjudication under the SURFACES sweep (audit:coverage-map) does not cover a lanes row', () => {
    const f = fixture();
    const wrongSweep = all(f).map((a) => ({ ...a, sweep: 'audit:coverage-map' }));
    expect(auditLanes(analyzeLanes(f), wrongSweep).pass).toBe(false);
  });

  it('formatLaneAudit keeps adjudicated rows visible, tagged', () => {
    const f = fixture();
    const lines = formatLaneAudit(auditLanes(analyzeLanes(f), all(f))).join('\n');
    expect(lines).toMatch(/\[adjudicated\] required-script:test:smoke/);
    expect(lines).toMatch(/lanes \(required-check steps vs local lane roots; sweep: audit:coverage-map:lanes\): PASS/);
  });
});

describe('coverage-map lanes — the real repo (derivation smoke)', () => {
  it('every required context resolves to a job and no derivation error is raised', () => {
    const repoRoot = path.resolve(__dirname, '..', '..', '..');
    const a = analyzeLanes(readLaneInputs(repoRoot));
    expect(a.rows.filter((r) => r.kind === 'error')).toEqual([]);
    expect(a.requiredContexts).toBeGreaterThan(0);
    expect(a.requiredCompared).toContain('npm run test');
  });
});
