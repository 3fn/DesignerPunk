/**
 * derivation.test.ts — Spec 123 Task 14.1: the 11.4 derivation checker (design C15).
 *
 * Criterion (tasks.md Task 14): "Containment through both trees only. Unknown anchors are
 * non-matching, never a throw: attack (a) → FAIL_NO_DERIVATION; E → VERIFIED; #body →
 * non-matching."
 *
 * The renderings are built with `emitSpans` (C14 — the shared span function the adapters call)
 * under the CONSUMER profile over the real `canonical/agents/stacy.md`, so the spans are
 * generator-emitted, as 11.4 requires. E's re-grounded text is the committed G1 rendering of E
 * (`__fixtures__/g1-renderings/run1.E.*`), zero-verbatim against S (G1 run 1: 0/14). The
 * per-target proof that the ADAPTERS route through `emitSpans` is not here: it is
 * semantics-guard.test.ts (14.3/14.4).
 */
import * as fs from 'fs';
import * as path from 'path';
import { AttributionAccumulator } from '../attribution';
import { splitFrontmatter } from '../frontmatter';
import { entryTree, partition } from '../partition';
import { emitSpans, type Dispositions } from '../spans';
import { checkDerivation, containedIn, DERIVATION_VERDICTS, parseRef, spanRef } from '../regrounding/derivation';
import { g1Fixture, readG1Rendering } from '../__fixtures__/g1-renderings';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const FILE = 'canonical/agents/stacy.md';
const { frontmatter, body } = splitFrontmatter(fs.readFileSync(path.join(REPO_ROOT, FILE), 'utf8'), FILE);
const bodyTree = partition(body);
const trees = { body: bodyTree, entry: entryTree(frontmatter) };

const PARENT = '#operational-mode-claims-audit-execution-claims-verification-the-q5-cut';
const S = '#the-owed-set-pipeline-your-command-catalogs-owed-set-entry-documented-commands-deliberately-not-a-committed-script';
const TRIGGER = '#the-trigger-set-the-114-superset-table-names-never-numbers';
const E_TEXT = readG1Rendering(g1Fixture('E', S));

/** Render stacy's body under the consumer profile: every unit retained unless overridden. */
type Row = NonNullable<Dispositions['body']>[string];
function render(overrides: Record<string, { disposition: Row['disposition']; overlay?: string }>) {
  const rows: Record<string, Row> = {};
  const overlayUnits: Record<string, string> = {};
  for (const unit of bodyTree.units) rows[unit.anchor] = { disposition: 'retained' };
  for (const [anchor, o] of Object.entries(overrides)) {
    rows[anchor] = { disposition: o.disposition };
    if (o.overlay !== undefined) overlayUnits[anchor] = o.overlay;
  }
  const acc = new AttributionAccumulator();
  const out = emitSpans(acc, { file: FILE, body, frontmatter }, 'consumer', { body: rows }, { units: overlayUnits }, 'body');
  return { text: out.text, spans: acc.build('stacy.md').spans };
}
const check = (spans: { source: string }[], s: string, destination: string) => checkDerivation({ file: FILE, trees, spans, s, destination });

describe('the rendering fixtures are what they claim', () => {
  it('S and the trigger set are SIBLINGS under one ## parent (attack (a)’s shape, measured)', () => {
    expect(bodyTree.get(S)?.parent).toBe(PARENT);
    expect(bodyTree.get(TRIGGER)?.parent).toBe(PARENT);
  });

  it('E is zero-verbatim inside its destination (10.S Constraint 3) and renders as a render span sourcing S', () => {
    const r = render({ [S]: { disposition: 're-pointed', overlay: E_TEXT } });
    expect(r.text).toContain(E_TEXT);
    expect(r.spans.filter((sp) => sp.source === `${FILE}${S}`).map((sp) => sp.op)).toEqual(['render']);
  });
});

describe('11.4 over generator-emitted spans (the criterion row)', () => {
  it('E → VERIFIED (the honest re-pointing: S re-grounded in place, destination S)', () => {
    const r = render({ [S]: { disposition: 're-pointed', overlay: E_TEXT } });
    expect(check(r.spans, S, S)).toEqual({ verdict: 'VERIFIED', derived: [`${FILE}${S}`] });
  });

  it('attack (a) → FAIL_NO_DERIVATION (S’s content moved into its SIBLING; the disposition names the sibling)', () => {
    // The attack's rendering: S is not rendered; the trigger set carries S's content.
    const canonicalS = bodyTree.units.find((u) => u.anchor === S)?.text as string;
    const canonicalTrigger = bodyTree.units.find((u) => u.anchor === TRIGGER)?.text as string;
    const r = render({ [S]: { disposition: 'superseded-by' }, [TRIGGER]: { disposition: 're-pointed', overlay: canonicalTrigger + canonicalS } });
    expect(r.text).toContain(canonicalS);
    expect(check(r.spans, S, TRIGGER)).toEqual({ verdict: 'FAIL_NO_DERIVATION', derived: [] });
  });

  it('attack (a) at ## grain → FAIL_NO_DERIVATION (a span sourcing the ANCESTOR is a super-range, excluded)', () => {
    expect(check([{ source: `${FILE}${PARENT}` }], S, TRIGGER).verdict).toBe('FAIL_NO_DERIVATION');
  });

  it('#body → non-matching, never a throw (the pre-123 bypass span)', () => {
    expect(() => check([{ source: `${FILE}#body` }], S, S)).not.toThrow();
    expect(check([{ source: `${FILE}#body` }], S, S)).toEqual({ verdict: 'FAIL_NO_DERIVATION', derived: [] });
  });
});

describe('containment is structural, within one tree (the R4 pin)', () => {
  it('a sibling that shares an anchor PREFIX is not contained (never prefix matching)', () => {
    const t = partition('# Title\n\n## The trigger set\n\nA.\n\n## The trigger set examples\n\nB.\n');
    const names = t.units.map((u) => u.anchor);
    expect(names).toEqual(expect.arrayContaining(['#the-trigger-set', '#the-trigger-set-examples']));
    expect(containedIn(parseRef('#the-trigger-set-examples'), parseRef('#the-trigger-set'), { body: t })).toBe(false);
    expect(containedIn(parseRef('#the-trigger-set'), parseRef('#the-trigger-set'), { body: t })).toBe(true);
  });

  it('a :preamble unit is contained in its parent; the parent is NOT contained in its :preamble', () => {
    expect(containedIn(parseRef(`${PARENT}:preamble`), parseRef(PARENT), trees)).toBe(true);
    expect(containedIn(parseRef(PARENT), parseRef(`${PARENT}:preamble`), trees)).toBe(false);
    expect(check([{ source: `${FILE}${PARENT}:preamble` }], PARENT, PARENT).verdict).toBe('VERIFIED');
  });

  it('entry tree: a member is contained in its container; the container is NOT contained in a member', () => {
    const glob = [...trees.entry.nodes.keys()].find((k) => k.startsWith('writeScope['));
    expect(glob).toBeDefined();
    expect(check([{ source: `${FILE}#frontmatter:${glob}` }], 'frontmatter:writeScope', 'frontmatter:writeScope').verdict).toBe('VERIFIED');
    // The container span (today's write-scope rendering) does not derive a per-glob S — Task 10's E-fm carry.
    expect(check([{ source: `${FILE}#frontmatter:writeScope` }], `frontmatter:${glob}`, `frontmatter:${glob}`).verdict).toBe('FAIL_NO_DERIVATION');
  });

  it('cross-tree never matches: a body span cannot derive a frontmatter S, nor the reverse', () => {
    expect(check([{ source: `${FILE}${S}` }], 'frontmatter:writeScope', 'frontmatter:writeScope').verdict).toBe('FAIL_NO_DERIVATION');
    expect(check([{ source: `${FILE}#frontmatter:writeScope` }], S, S).verdict).toBe('FAIL_NO_DERIVATION');
  });

  it('with no entry tree supplied, every frontmatter reference is non-matching (not a throw)', () => {
    expect(checkDerivation({ file: FILE, trees: { body: bodyTree }, spans: [{ source: `${FILE}#frontmatter:writeScope` }], s: 'frontmatter:writeScope', destination: 'frontmatter:writeScope' }).verdict).toBe('FAIL_NO_DERIVATION');
  });
});

describe('what is not in D', () => {
  it('spans from another file, generator glue, and profile-originated sources (10.S) never derive S', () => {
    const spans = [{ source: `canonical/agents/lina.md${S}` }, { source: 'WORKFLOW_RULES' }, { source: 'C1:frontmatter' }, { source: `consumer:${S}` }];
    expect(check(spans, S, S)).toEqual({ verdict: 'FAIL_NO_DERIVATION', derived: [] });
    expect(spans.map((sp) => spanRef(sp.source, FILE))).toEqual([undefined, undefined, undefined, undefined]);
  });

  it('an S that names no current unit (a rename orphaned it) is FAIL_NO_DERIVATION, not a throw', () => {
    const r = render({});
    expect(check(r.spans, '#the-owed-set-pipeline', '#the-owed-set-pipeline').verdict).toBe('FAIL_NO_DERIVATION');
  });
});

describe('HONEST NAMING', () => {
  it('S derived, but the destination names a sibling → FAIL_DISHONEST_NAMING', () => {
    const r = render({ [S]: { disposition: 're-pointed', overlay: E_TEXT } });
    expect(check(r.spans, S, TRIGGER)).toEqual({ verdict: 'FAIL_DISHONEST_NAMING', derived: [`${FILE}${S}`] });
  });

  it('the destination may contain the derived span (the ## parent contains S) → VERIFIED', () => {
    const r = render({ [S]: { disposition: 're-pointed', overlay: E_TEXT } });
    expect(check(r.spans, S, PARENT).verdict).toBe('VERIFIED');
  });

  it('the verdict set is the design’s three, closed', () => {
    expect([...DERIVATION_VERDICTS]).toEqual(['VERIFIED', 'FAIL_NO_DERIVATION', 'FAIL_DISHONEST_NAMING']);
  });
});
