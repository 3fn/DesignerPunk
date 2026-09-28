/**
 * triviality.g1.test.ts — Spec 123 Task 13.4, the floor over the copied G1 renderings
 * (`__fixtures__/g1-renderings/`, provenance asserted by g1-renderings.provenance.test.ts).
 *
 * Criteria served (tasks.md Task 13):
 *   - (iv) THE AX-1 BITE: over the frozen AX-1 fixture, `#audit-checklist` scores 14/30 and ROUTES;
 *     with the assignment replaced by per-item `includes` the test turns RED at 15/30 CLEARS. The
 *     red string is recorded in task-13-4-completion.md; the in-test CONTRAST below pins that the
 *     fixture still discriminates (includes really does give 15/30 on it).
 *   - "The floor matches complete item text, per unit": each of Lina-2's seven step units scores
 *     0/k and ROUTES.
 *   - "The floor never condemns, per unit": over the committed G1 renderings Lina-1 `#ios` and
 *     `#android` score 0/3 and ROUTE.
 *
 * THE RECORD PIN: every fixture names the record unit's canonicalHash it is scored against. If a
 * record unit is re-confirmed (e.g. 13.8's counting-block edit), the pin test goes red NAMING the
 * unit, and the expected scores are re-derived explicitly — they never move silently.
 *
 * The expected table is G1 run 2's `assigned` column (re-grounding-c3-falsification-run-2.md
 * § "Its output at this commit"), per rendering.
 */
import { classifyUnit, FLOOR_VERDICTS, type UnitResult } from '../regrounding/triviality';
import { g1Fixture, loadG1Manifest, readG1Rendering, type G1Fixture } from '../__fixtures__/g1-renderings';
import { canonicalUnits, includesCount, readRecord } from './triviality.helpers';

const score = (f: G1Fixture): UnitResult => {
  const record = readRecord(f.record);
  return classifyUnit({
    anchor: f.anchor,
    canonical: canonicalUnits(record.source).get(f.anchor) as string,
    rendering: readG1Rendering(f),
    items: record.units[f.anchor].items,
  });
};

/** The one-line form the bites record: `<exemplar> <anchor>: <retained>/<total> <VERDICT> [reasons]`. */
const line = (f: G1Fixture, r: UnitResult): string =>
  !r.entered
    ? `${f.exemplar} ${f.anchor}: outside the entry set`
    : r.verdict === 'INAPPLICABLE'
      ? `${f.exemplar} ${f.anchor}: 0/0 INAPPLICABLE`
      : `${f.exemplar} ${f.anchor}: ${r.retained}/${r.total} ${r.verdict}${r.routedBy.length ? ` [${r.routedBy.join(',')}]` : ''}`;

const manifest = loadG1Manifest();
const AX1 = g1Fixture('AX-1', '#audit-checklist');

describe('the record pin — every fixture is scored against the record state it names', () => {
  it.each(manifest.map((f) => [`${f.exemplar} ${f.anchor}`, f] as const))('%s', (_l, f) => {
    const current = readRecord(f.record).units[f.anchor]?.canonicalHash;
    expect(`${f.record} ${f.anchor} @ ${current}`).toBe(`${f.record} ${f.anchor} @ ${f.canonicalHash}`);
  });
});

describe('(iv) the AX-1 bite', () => {
  const r = score(AX1);

  it('AX-1 #audit-checklist scores 14/30 and ROUTES', () => {
    expect(line(AX1, r)).toBe('AX-1 #audit-checklist: 14/30 ROUTES [below-half]');
  });

  it('its witness is the assignment it counted — ids with offsets; the shared text credits documentation-3 once, never lessons-learned-capture-2', () => {
    const witness = r.entered && r.verdict !== 'INAPPLICABLE' ? r.assignment.map((c) => `${c.itemId}@${c.offset}`) : [];
    expect(witness).toEqual([
      'spec-quality-1@22',
      'spec-quality-2@84',
      'spec-quality-3@161',
      'implementation-coverage-1@214',
      'implementation-coverage-2@263',
      'implementation-coverage-3@317',
      'test-coverage-1@361',
      'test-coverage-2@403',
      'test-coverage-3@479',
      'process-adherence-2@557',
      'metadata-accuracy-1@691',
      'metadata-accuracy-2@790',
      'metadata-accuracy-3@871',
      'documentation-3@1025',
    ]);
  });

  it('CONTRAST: per-item includes gives 15/30 on the same fixture — the fixture discriminates', () => {
    const record = readRecord(AX1.record);
    expect(includesCount(readG1Rendering(AX1), record.units[AX1.anchor].items)).toBe(15);
  });
});

describe('G1 run 2 `assigned` column, reproduced per rendering', () => {
  const expected: Record<string, string> = {
    'A #audit-checklist': '0/30 ROUTES',
    'B #the-owed-set-pipeline-your-command-catalogs-owed-set-entry-documented-commands-deliberately-not-a-committed-script': '0/14 ROUTES',
    'C(c2) #what-parity-means': '0/7 ROUTES',
    'D #the-trigger-set-the-114-superset-table-names-never-numbers': '1/13 ROUTES',
    'E #the-owed-set-pipeline-your-command-catalogs-owed-set-entry-documented-commands-deliberately-not-a-committed-script': '0/14 ROUTES',
    'Lina-1 #platform-implementation-true-native-architecture:preamble': '0/2 ROUTES',
    'Lina-1 #web': '0/4 ROUTES',
    'Lina-1 #ios': '0/3 ROUTES',
    'Lina-1 #android': '0/3 ROUTES',
    'Lina-2 #step-1-verify-component-family-doc': '0/2 ROUTES',
    'Lina-2 #step-2-create-typests': '0/1 ROUTES',
    'Lina-2 #step-3-author-contractsyaml': '0/5 ROUTES',
    'Lina-2 #step-4-create-platform-implementations': '0/5 ROUTES',
    'Lina-2 #step-5-create-tests': '0/1 ROUTES',
    'Lina-2 #step-6-create-or-review-component-metayaml': '0/9 ROUTES',
    'Lina-2 #step-7-create-readme': '0/1 ROUTES',
    'AX-1 #audit-checklist': '14/30 ROUTES',
    'G-sketch #item-critical-wait-for-user-authorization-before-starting-new-tasks': '0/7 ROUTES',
    'G-blanket #item-critical-wait-for-user-authorization-before-starting-new-tasks': '0/7 ROUTES',
    'A-blanket #audit-checklist': '0/30 ROUTES',
    'G #item-critical-wait-for-user-authorization-before-starting-new-tasks': '0/7 ROUTES',
    'G′ #item-civitas-governance-health-check': '0/4 ROUTES',
  };

  it('covers exactly the 22 fixtures', () => {
    expect(manifest.map((f) => `${f.exemplar} ${f.anchor}`).sort()).toEqual(Object.keys(expected).sort());
  });

  it.each(manifest.map((f) => [`${f.exemplar} ${f.anchor}`, f] as const))('%s', (key, f) => {
    const r = score(f);
    expect(r.entered).toBe(true);
    if (r.entered) expect(FLOOR_VERDICTS).toContain(r.verdict);
    expect(line(f, r).replace(/ \[.*\]$/, '')).toBe(`${key}: ${expected[key]}`);
  });
});

describe('the criteria rows, named', () => {
  it("each of Lina-2's seven step units scores 0/k and ROUTES", () => {
    const steps = manifest.filter((f) => f.exemplar === 'Lina-2');
    expect(steps.length).toBe(7);
    expect(steps.map((f) => line(f, score(f))).filter((l) => !/: 0\/\d+ ROUTES \[below-half\]$/.test(l))).toEqual([]);
  });

  it('Lina-1 #ios and #android score 0/3 and ROUTE — the floor does not condemn them (G1: NOT TRIVIAL, 2/3 by 5e)', () => {
    expect(['#ios', '#android'].map((a) => line(g1Fixture('Lina-1', a), score(g1Fixture('Lina-1', a))))).toEqual([
      'Lina-1 #ios: 0/3 ROUTES [below-half]',
      'Lina-1 #android: 0/3 ROUTES [below-half]',
    ]);
  });
});
