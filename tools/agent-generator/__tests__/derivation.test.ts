/**
 * derivation.test.ts — Spec 123 Task 14.1: the 11.4 derivation checker (design C15); clause (2)
 * re-ruled at Task 29.1 (G2 spec-text ruling R1: HONEST NAMING is IDENTITY, not containment).
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
import { checkDerivation, containedIn, DERIVATION_VERDICTS, derivedEntryValues, parseRef, renderedSpans, sameNode, SHARED_CATALOG_FILE, spanRef } from '../regrounding/derivation';
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
  // Each span with the lines it covers in the rendering (R2's evidence, Task 29.2).
  const built = acc.build('stacy.md').spans;
  return { text: out.text, attribution: built, spans: renderedSpans(built, out.text) };
}
/**
 * The check over stacy's canonical frontmatter (every entry retained, so the derived value is the
 * canonical one). A hand-built span with no `text` stands for a NON-EMPTY rendering (a stub line);
 * R2's emptiness cases always pass the generator's own rendered text.
 */
const values = derivedEntryValues(frontmatter);
const check = (spans: { source: string; text?: string }[], s: string, destination: string) =>
  checkDerivation({ file: FILE, trees, spans: spans.map((sp) => ({ source: sp.source, text: sp.text ?? '(rendered line)\n' })), s, destination, derivedValue: values });

describe('the rendering fixtures are what they claim', () => {
  it('S and the trigger set are SIBLINGS under one ## parent (attack (a)’s shape, measured)', () => {
    expect(bodyTree.get(S)?.parent).toBe(PARENT);
    expect(bodyTree.get(TRIGGER)?.parent).toBe(PARENT);
  });

  it('E is zero-verbatim inside its destination (10.S Constraint 3) and renders as a render span sourcing S', () => {
    const r = render({ [S]: { disposition: 're-pointed', overlay: E_TEXT } });
    expect(r.text).toContain(E_TEXT);
    expect(r.attribution.filter((sp) => sp.source === `${FILE}${S}`).map((sp) => sp.op)).toEqual(['render']);
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
    // DERIVATION still accepts the contained span (clause 1); HONEST NAMING is identity (Task 29.1,
    // ruling R1), so naming the parent is not naming a span source in D.
    expect(check([{ source: `${FILE}${PARENT}:preamble` }], PARENT, PARENT)).toEqual({ verdict: 'FAIL_DISHONEST_NAMING', derived: [`${FILE}${PARENT}:preamble`] });
    expect(check([{ source: `${FILE}${PARENT}:preamble` }], PARENT, `${PARENT}:preamble`).verdict).toBe('VERIFIED');
  });

  it('entry tree: a member is contained in its container; the container is NOT contained in a member', () => {
    const glob = [...trees.entry.nodes.keys()].find((k) => k.startsWith('writeScope['));
    expect(glob).toBeDefined();
    // Clause 1 accepts the member span under the container S; clause 2 (identity, Task 29.1) needs the member itself.
    expect(check([{ source: `${FILE}#frontmatter:${glob}` }], 'frontmatter:writeScope', 'frontmatter:writeScope').verdict).toBe('FAIL_DISHONEST_NAMING');
    expect(check([{ source: `${FILE}#frontmatter:${glob}` }], 'frontmatter:writeScope', `frontmatter:${glob}`).verdict).toBe('VERIFIED');
    // The container span (today's write-scope rendering) does not derive a per-glob S — Task 10's E-fm carry.
    expect(check([{ source: `${FILE}#frontmatter:writeScope` }], `frontmatter:${glob}`, `frontmatter:${glob}`).verdict).toBe('FAIL_NO_DERIVATION');
  });

  it('cross-tree never matches: a body span cannot derive a frontmatter S, nor the reverse', () => {
    expect(check([{ source: `${FILE}${S}` }], 'frontmatter:writeScope', 'frontmatter:writeScope').verdict).toBe('FAIL_NO_DERIVATION');
    expect(check([{ source: `${FILE}#frontmatter:writeScope` }], S, S).verdict).toBe('FAIL_NO_DERIVATION');
  });

  it('with no entry tree supplied, every frontmatter reference is non-matching (not a throw)', () => {
    expect(checkDerivation({ file: FILE, trees: { body: bodyTree }, spans: [{ source: `${FILE}#frontmatter:writeScope`, text: 'x\n' }], s: 'frontmatter:writeScope', destination: 'frontmatter:writeScope', derivedValue: values }).verdict).toBe('FAIL_NO_DERIVATION');
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

  it('naming the ## parent that contains S is not naming S (Task 29.1; was VERIFIED under containment) → FAIL_DISHONEST_NAMING', () => {
    const r = render({ [S]: { disposition: 're-pointed', overlay: E_TEXT } });
    expect(check(r.spans, S, PARENT).verdict).toBe('FAIL_DISHONEST_NAMING');
  });

  it('the verdict set is the design’s three, closed', () => {
    expect([...DERIVATION_VERDICTS]).toEqual(['VERIFIED', 'FAIL_NO_DERIVATION', 'FAIL_DISHONEST_NAMING']);
  });
});

// ---------------------------------------------------------------------------------------------
// Task 29.1 — clause (2) per the G2 spec-text ruling R1 (identity), G2-F1. Each fixture renders
// through `emitSpans` under the consumer profile over the real stacy.md. The two-sided bites
// (`__fixtures__/semantics-guard/__bites__/task-29-1-*`) record these tests RED with clause (2)
// restored to containment, and GREEN as written.
// ---------------------------------------------------------------------------------------------
describe('29.1 — HONEST NAMING is identity (ruling R1; G2-F1)', () => {
  const ONE_TOKEN = 'Owed.\n';

  it('attack (f): S re-grounded in place, destination S’s ## parent → FAIL_DISHONEST_NAMING', () => {
    const r = render({ [S]: { disposition: 're-pointed', overlay: E_TEXT } });
    expect(`attack (f): ${check(r.spans, S, PARENT).verdict}`).toBe('attack (f): FAIL_DISHONEST_NAMING');
  });

  it('attack (f) at every ancestor: no ancestor of S names S', () => {
    const r = render({ [S]: { disposition: 're-pointed', overlay: E_TEXT } });
    const ancestors: string[] = [];
    for (let a = bodyTree.get(S)?.parent ?? null; a !== null; a = bodyTree.get(a)?.parent ?? null) ancestors.push(a);
    expect(ancestors.length).toBeGreaterThanOrEqual(2); // the ## parent and the document root at least
    expect(ancestors.map((a) => `${a}: ${check(r.spans, S, a).verdict}`)).toEqual(ancestors.map((a) => `${a}: FAIL_DISHONEST_NAMING`));
  });

  it('the one-token variant of attack (a) that passed under containment (S reduced to one token, destination its ## parent) → FAIL_DISHONEST_NAMING', () => {
    const r = render({ [S]: { disposition: 're-pointed', overlay: ONE_TOKEN } });
    expect(r.text).toContain(ONE_TOKEN);
    expect(`one-token variant, ancestor destination: ${check(r.spans, S, PARENT).verdict}`).toBe('one-token variant, ancestor destination: FAIL_DISHONEST_NAMING');
  });

  it('the one-token variant with a sibling destination (V1) → FAIL_DISHONEST_NAMING (rejected in both directions; not a two-sided case)', () => {
    const r = render({ [S]: { disposition: 're-pointed', overlay: ONE_TOKEN } });
    expect(check(r.spans, S, TRIGGER)).toEqual({ verdict: 'FAIL_DISHONEST_NAMING', derived: [`${FILE}${S}`] });
  });

  it('the honest in-place re-pointing stays VERIFIED (destination = S)', () => {
    const r = render({ [S]: { disposition: 're-pointed', overlay: E_TEXT } });
    expect(check(r.spans, S, S).verdict).toBe('VERIFIED');
  });

  it('an unknown destination (U1) is non-matching, never a throw → FAIL_DISHONEST_NAMING', () => {
    const r = render({ [S]: { disposition: 're-pointed', overlay: E_TEXT } });
    expect(() => check(r.spans, S, '#no-such-unit')).not.toThrow();
    expect(check(r.spans, S, '#no-such-unit').verdict).toBe('FAIL_DISHONEST_NAMING');
  });

  it('a destination in the other tree (U2) never matches → FAIL_DISHONEST_NAMING', () => {
    const r = render({ [S]: { disposition: 're-pointed', overlay: E_TEXT } });
    expect(check(r.spans, S, 'frontmatter:description').verdict).toBe('FAIL_DISHONEST_NAMING');
  });

  it('sameNode is mutual containment: same node only; prefix siblings, parent/:preamble, unknown ids and cross-tree are not the same', () => {
    const t = partition('# Title\n\n## The trigger set\n\nA.\n\n## The trigger set examples\n\nB.\n');
    expect(sameNode(parseRef('#the-trigger-set'), parseRef('#the-trigger-set'), { body: t })).toBe(true);
    expect(sameNode(parseRef('#the-trigger-set-examples'), parseRef('#the-trigger-set'), { body: t })).toBe(false);
    expect(sameNode(parseRef(`${PARENT}:preamble`), parseRef(PARENT), trees)).toBe(false);
    expect(sameNode(parseRef(PARENT), parseRef(`${PARENT}:preamble`), trees)).toBe(false);
    expect(sameNode(parseRef('#nope'), parseRef('#nope'), trees)).toBe(false);
    expect(sameNode(parseRef(S), parseRef('frontmatter:description'), trees)).toBe(false);
  });
});

describe('29.1 — the shared-catalog member space (ruling R1: id equality)', () => {
  const ID = 'record-first-ratification';
  const SIB = 'find-docs-discovery';
  const mcheck = (spans: { source: string; text?: string }[], s: string, destination: string) =>
    checkDerivation({ file: SHARED_CATALOG_FILE, trees: { body: partition('') }, spans: spans.map((sp) => ({ source: sp.source, text: sp.text ?? '- a rendered member\n' })), s, destination });

  it('a span sourcing the member, destination the member (M0) → VERIFIED', () => {
    expect(mcheck([{ source: `${SHARED_CATALOG_FILE}#${ID}` }], ID, ID)).toEqual({ verdict: 'VERIFIED', derived: [`${SHARED_CATALOG_FILE}#${ID}`] });
  });

  it('destination a sibling member id (M1) → FAIL_DISHONEST_NAMING', () => {
    expect(mcheck([{ source: `${SHARED_CATALOG_FILE}#${ID}` }, { source: `${SHARED_CATALOG_FILE}#${SIB}` }], ID, SIB).verdict).toBe('FAIL_DISHONEST_NAMING');
  });

  it('only a sibling member, another file or glue is rendered → FAIL_NO_DERIVATION', () => {
    expect(mcheck([{ source: `${SHARED_CATALOG_FILE}#${SIB}` }, { source: `${FILE}#${ID}` }, { source: 'WORKFLOW_RULES' }], ID, ID)).toEqual({ verdict: 'FAIL_NO_DERIVATION', derived: [] });
  });
});

// ---------------------------------------------------------------------------------------------
// Task 29.2 — clause (1) per the G2 spec-text ruling R2 (G2-F3; MIDPOINT MP-1). Attack (a) AS THE
// GENERATOR EMITS IT: S stays `re-pointed`, its overlay emptied, so `emitSpans` renders one blank
// line attributed to S (`ensureTrailingNewline('')`). Task 14's rows modelled the attack instead
// (S `superseded-by`, its text moved into the sibling); those rows stay as written (Task 14 is not
// edited) and these are the rebuilt ones. Two-sided bites: `__bites__/task-29-2-*`.
// ---------------------------------------------------------------------------------------------
describe('29.2 — an empty span derives nothing (ruling R2; G2-F3, MP-1)', () => {
  const sSpans = (r: ReturnType<typeof render>) => r.spans.filter((sp) => sp.source === `${FILE}${S}`);
  const headingOfS = `${(bodyTree.units.find((u) => u.anchor === S)?.text as string).split('\n')[0]}\n`;

  it('the generator’s emission of attack (a): an emptied re-pointed overlay renders ONE blank line attributed to S', () => {
    const r = render({ [S]: { disposition: 're-pointed', overlay: '' } });
    expect(sSpans(r)).toEqual([{ source: `${FILE}${S}`, text: '\n' }]);
  });

  it.each([
    ['A1 (attack (a) verbatim: emptied, sibling destination)', '', TRIGGER],
    ['A3 (emptied, destination S’s ## parent)', '', PARENT],
    ['A4 (emptied in place, destination S)', '', S],
    ['WS1 (spaces, tabs and blank lines only)', ' \t \n\n   \n', TRIGGER],
    ['WS2 (U+00A0 only — trim() removes it)', '   \n', TRIGGER],
  ])('%s → FAIL_NO_DERIVATION', (label, overlay, destination) => {
    const r = render({ [S]: { disposition: 're-pointed', overlay } });
    expect(sSpans(r)).toHaveLength(1); // the span IS emitted — R2, not the emission, excludes it
    expect(`${label}: ${check(r.spans, S, destination).verdict}`).toBe(`${label}: FAIL_NO_DERIVATION`);
  });

  it.each([
    ['A2 (emptied to its heading line: the heading is text)', headingOfS],
    ['WS3 (U+200B only — not removed by trim(), so text)', '​\n'],
    ['WS4 (an HTML comment only — text)', '<!-- -->\n'],
    ['WS5 (a single "." — text)', '.\n'],
    ['V1 (one token)', 'Owed.\n'],
  ])('%s, sibling destination → FAIL_DISHONEST_NAMING (D non-empty; clause 2 decides)', (label, overlay) => {
    const r = render({ [S]: { disposition: 're-pointed', overlay } });
    expect(`${label}: ${check(r.spans, S, TRIGGER).verdict}`).toBe(`${label}: FAIL_DISHONEST_NAMING`);
  });

  it('a whitespace-only span does not hide a non-empty one: D keeps the span that renders text', () => {
    expect(check([{ source: `${FILE}${S}`, text: '\n' }, { source: `${FILE}${S}`, text: 'Owed.\n' }], S, S)).toEqual({ verdict: 'VERIFIED', derived: [`${FILE}${S}`] });
    expect(check([{ source: `${FILE}${S}`, text: '  \n\t\n' }], S, S)).toEqual({ verdict: 'FAIL_NO_DERIVATION', derived: [] });
  });

  it('the shared-catalog member lane (provisional, flagged: R2 is silent on members) is held to the rendered-text rule', () => {
    const v = (text: string) =>
      checkDerivation({ file: SHARED_CATALOG_FILE, trees: { body: partition('') }, spans: [{ source: `${SHARED_CATALOG_FILE}#record-first-ratification`, text }], s: 'record-first-ratification', destination: 'record-first-ratification' }).verdict;
    expect([v('\n'), v('- record-first ratification\n')]).toEqual(['FAIL_NO_DERIVATION', 'VERIFIED']);
  });
});

describe('29.2 — the always-set lane, through the same span function (AS1, AS2)', () => {
  const AS_FILE = '.kiro/steering/Task-Completion-Protocol.md';
  const asDoc = splitFrontmatter(fs.readFileSync(path.join(REPO_ROOT, AS_FILE), 'utf8'), AS_FILE);
  const asTree = partition(asDoc.body);
  const S_AS = '#for-subtasks';
  const T_AS = '#for-parent-tasks-implementation-or-architecture-type';
  function renderAs(overlay: string) {
    const rows: Record<string, Row> = {};
    for (const unit of asTree.units) rows[unit.anchor] = { disposition: 'retained' };
    rows[S_AS] = { disposition: 're-pointed' };
    const acc = new AttributionAccumulator();
    const out = emitSpans(acc, { file: AS_FILE, body: asDoc.body, frontmatter: {} }, 'consumer', { body: rows }, { units: { [S_AS]: overlay } }, 'body');
    return renderedSpans(acc.build('tcp.md').spans, out.text);
  }
  const asCheck = (spans: ReturnType<typeof renderAs>, destination: string) => checkDerivation({ file: AS_FILE, trees: { body: asTree }, spans, s: S_AS, destination }).verdict;

  it('the fixture is what it claims: S_AS and T_AS are siblings in the always-set member’s tree', () => {
    expect(asTree.get(S_AS)?.parent).toBe(asTree.get(T_AS)?.parent);
  });

  it('AS1 (emptied, sibling destination) → FAIL_NO_DERIVATION', () => {
    expect(`AS1: ${asCheck(renderAs(''), T_AS)}`).toBe('AS1: FAIL_NO_DERIVATION');
  });

  it('AS2 (emptied to its heading line, sibling destination) → FAIL_DISHONEST_NAMING', () => {
    const heading = `${(asTree.units.find((u) => u.anchor === S_AS)?.text as string).split('\n')[0]}\n`;
    expect(`AS2: ${asCheck(renderAs(heading), T_AS)}`).toBe('AS2: FAIL_DISHONEST_NAMING');
  });
});
