/**
 * grain-guard.two-sided.test.ts — Spec 123 Task 14.5: GOLDEN BITE 2, the two-sided grain guard
 * (Req 10.G "BITE 2"; design § "Testing Strategy": "10.G Bite 2 — collapse to ## — the honest ###
 * re-pointing is REJECTED").
 *
 * WHY TWO-SIDED (Lina R3, Req 10.G): 10.G's invariant is ONE splitter feeding three consumers, so
 * collapsing the splitter to `##` also collapses the application unit set. Attack (a) is then
 * still rejected — by an unknown unit, or because a `##` span is a super-range of S — so a guard
 * asserting only "(b) attack (a) REJECTED" stays GREEN under the mutation. Assertion (a), "an
 * honest `###`-grain re-pointing is ACCEPTED", is the one that turns RED: the honest profile's
 * disposition names a `###` unit that no longer exists.
 *
 * The honest profile is COMMITTED data, written against the finest grain (10.G) — its S is the
 * `###` unit — not recomputed from whatever the splitter currently returns. Spans come from
 * `emitSpans` (C14) under the consumer profile over the real `canonical/agents/stacy.md`; the
 * checker runs ALONE (11.4 only, Req 10.8a Constraint 2), and nothing here observes C6 (10.8c).
 */
import * as fs from 'fs';
import * as path from 'path';
import { AttributionAccumulator } from '../attribution';
import { splitFrontmatter } from '../frontmatter';
import { entryTree, partition } from '../partition';
import { emitSpans, type Dispositions } from '../spans';
import { checkDerivation } from '../regrounding/derivation';
import { g1Fixture, readG1Rendering } from '../__fixtures__/g1-renderings';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const FILE = 'canonical/agents/stacy.md';
const { frontmatter, body } = splitFrontmatter(fs.readFileSync(path.join(REPO_ROOT, FILE), 'utf8'), FILE);

/** The committed honest `###`-grain re-pointing: exemplar E on S, destination S. */
const S = '#the-owed-set-pipeline-your-command-catalogs-owed-set-entry-documented-commands-deliberately-not-a-committed-script';
const TRIGGER = '#the-trigger-set-the-114-superset-table-names-never-numbers';
const E_TEXT = readG1Rendering(g1Fixture('E', S));

type Row = NonNullable<Dispositions['body']>[string];

/** Render under the CURRENT splitter: every current unit retained, then the profile's rows applied as written. */
function render(profileRows: Record<string, Row>, overlay: Record<string, string>) {
  const tree = partition(body);
  const rows: Record<string, Row> = {};
  for (const unit of tree.units) rows[unit.anchor] = { disposition: 'retained' };
  for (const [anchor, row] of Object.entries(profileRows)) if (tree.has(anchor)) rows[anchor] = row; // a row naming no current unit cannot apply (13.5 refuses it as orphaned)
  const acc = new AttributionAccumulator();
  emitSpans(acc, { file: FILE, body, frontmatter }, 'consumer', { body: rows }, { units: overlay }, 'body');
  return { tree, spans: acc.build('stacy.md').spans };
}
const verdict = (r: ReturnType<typeof render>, s: string, destination: string) =>
  checkDerivation({ file: FILE, trees: { body: r.tree, entry: entryTree(frontmatter) }, spans: r.spans, s, destination }).verdict;

describe('Golden Bite 2 — the two-sided grain guard (Req 10.G)', () => {
  it('(a) an honest ###-grain re-pointing is ACCEPTED', () => {
    const r = render({ [S]: { disposition: 're-pointed', destination: S } }, { [S]: E_TEXT });
    expect(`honest re-pointing of ${S}: ${verdict(r, S, S)}`).toBe(`honest re-pointing of ${S}: VERIFIED`);
  });

  it('(b) attack (a) is REJECTED', () => {
    const canonical = (a: string) => partition(body).units.find((u) => u.anchor === a)?.text ?? '';
    const r = render(
      { [S]: { disposition: 'superseded-by', destination: TRIGGER }, [TRIGGER]: { disposition: 're-pointed', destination: TRIGGER } },
      { [TRIGGER]: canonical(TRIGGER) + canonical(S) }
    );
    expect(`attack (a) on ${S}: ${verdict(r, S, TRIGGER)}`).toBe(`attack (a) on ${S}: FAIL_NO_DERIVATION`);
  });
});
