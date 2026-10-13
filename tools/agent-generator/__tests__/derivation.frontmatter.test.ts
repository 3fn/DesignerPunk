/**
 * derivation.frontmatter.test.ts — Spec 123 Task 14.5 (criterion: "`commands[<name>]` emptied
 * with a sibling destination → FAIL_NO_DERIVATION"; design C15's WIDER DOMAIN — the entry tree).
 *
 * The frontmatter half of 11.4 over the real `canonical/agents/lina.md`: its `commands` list is
 * keyed per member by `name` (C13). The spans come from `emitSpans` (C14) under the consumer
 * profile, one `member` piece per command, exactly as the adapters' frontmatter loops name them.
 * "Emptied" is exercised both ways the rendering can empty an entry: the row omits it
 * (`no-consumer-counterpart`), or it is kept with no text (an empty piece emits no span).
 */
import * as fs from 'fs';
import * as path from 'path';
import { AttributionAccumulator } from '../attribution';
import { splitFrontmatter } from '../frontmatter';
import { entryTree, partition } from '../partition';
import { emitSpans, type SpanPiece } from '../spans';
import { derive, pruneFrontmatter } from '../derive';
import { hashEntry, hexOf } from '../regrounding/hash';
import { parseOverlay } from '../regrounding/overlay';
import { checkDerivation, derivedEntryValues, renderedSpans, type RenderedSpan } from '../regrounding/derivation';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const FILE = 'canonical/agents/lina.md';
const { frontmatter, body } = splitFrontmatter(fs.readFileSync(path.join(REPO_ROOT, FILE), 'utf8'), FILE);
const tree = entryTree(frontmatter);
const trees = { body: partition(body), entry: tree };
const commands = tree.get('commands')?.children ?? [];
const [X, Y] = commands;

type Disposition = 'retained' | 'no-consumer-counterpart';
/** Render the commands section under the consumer profile. `texts` overrides a member's rendered text. */
function renderCommands(rows: Record<string, Disposition>, texts: Record<string, string> = {}) {
  const frontmatterRows: Record<string, { disposition: Disposition }> = {};
  for (const leaf of tree.units) frontmatterRows[leaf.path] = { disposition: 'retained' };
  for (const [p, d] of Object.entries(rows)) frontmatterRows[p] = { disposition: d };
  // Task 15.3: under the consumer profile the adapters render derive()'s frontmatter — an omitted
  // member is pruned before rendering, so its piece is never emitted (never a silent skip).
  const derived = pruneFrontmatter(frontmatter, tree, (p) => frontmatterRows[p]?.disposition === 'no-consumer-counterpart');
  const derivedCommands = entryTree(derived).get('commands')?.children ?? [];
  const pieces: SpanPiece[] = derivedCommands.map((p, index) => ({ kind: 'member', list: 'commands', index, text: texts[p] ?? `- ${p}\n` }));
  const acc = new AttributionAccumulator();
  const out = emitSpans(acc, { file: FILE, body, frontmatter: derived }, 'consumer', { frontmatter: frontmatterRows }, undefined, pieces);
  return renderedSpans(acc.build('lina.md').spans, out.text);
}
/** Every row here keeps lina's canonical values (omitted members are pruned before rendering). */
const values = derivedEntryValues(frontmatter);
const check = (spans: RenderedSpan[], s: string, destination: string) =>
  checkDerivation({ file: FILE, trees, spans, s: `frontmatter:${s}`, destination: `frontmatter:${destination}`, derivedValue: values });

describe('11.4 on the entry tree — commands[<name>]', () => {
  it('the fixture is what it claims: lina.md’s commands are sibling members keyed by name', () => {
    expect(commands.length).toBeGreaterThanOrEqual(2);
    expect([X, Y].every((p) => /^commands\[[^\]]+\]$/.test(p))).toBe(true);
    expect(tree.get(X)?.parent).toBe('commands');
    expect(tree.get(Y)?.parent).toBe('commands');
  });

  it('commands[<name>] emptied (omitted) with a sibling destination → FAIL_NO_DERIVATION', () => {
    const spans = renderCommands({ [X]: 'no-consumer-counterpart' });
    expect(spans.map((s) => s.source)).toContain(`${FILE}#frontmatter:${Y}`);
    expect(check(spans, X, Y)).toEqual({ verdict: 'FAIL_NO_DERIVATION', derived: [] });
  });

  it('commands[<name>] emptied (kept, no text) with a sibling destination → FAIL_NO_DERIVATION', () => {
    const spans = renderCommands({}, { [X]: '' });
    expect(spans.map((s) => s.source)).not.toContain(`${FILE}#frontmatter:${X}`);
    expect(check(spans, X, Y)).toEqual({ verdict: 'FAIL_NO_DERIVATION', derived: [] });
  });

  it('control — the member rendered, destination itself → VERIFIED', () => {
    expect(check(renderCommands({}), X, X)).toEqual({ verdict: 'VERIFIED', derived: [`${FILE}#frontmatter:${X}`] });
  });

  it('control — the member rendered, but the destination names its sibling → FAIL_DISHONEST_NAMING', () => {
    expect(check(renderCommands({}), X, Y).verdict).toBe('FAIL_DISHONEST_NAMING');
  });

  it('a span on the commands CONTAINER does not derive a member (ancestor = super-range)', () => {
    expect(check([{ source: `${FILE}#frontmatter:commands`, text: '## Commands\n' }], X, X).verdict).toBe('FAIL_NO_DERIVATION');
  });
});

describe('29.1 — HONEST NAMING is identity on the entry tree (ruling R1; G2-F1, F5’s shape)', () => {
  it('a rendered member with its parent entry as destination (F5c) → FAIL_DISHONEST_NAMING', () => {
    const spans = renderCommands({});
    expect(`F5c: ${check(spans, X, 'commands').verdict}`).toBe('F5c: FAIL_DISHONEST_NAMING');
  });

  it('the same member with itself as destination → VERIFIED', () => {
    expect(check(renderCommands({}), X, X).verdict).toBe('VERIFIED');
  });
});

// ---------------------------------------------------------------------------------------------
// Task 29.2 — R2 on the entry tree: the test is on derive()'s VALUE, never the rendered text. The
// overlays go through the real `derive()` (pins, the class-level congruence refusal) and the
// rendering through `emitSpans` over the DERIVED frontmatter, as the adapters render it.
// ---------------------------------------------------------------------------------------------
describe('29.2 — an empty derived value derives nothing (ruling R2; F3, FS1)', () => {
  const bodyRows = Object.fromEntries(trees.body.units.map((u) => [u.anchor, { disposition: 'retained' }]));
  const leafValue = (p: string) => tree.units.find((l) => l.path === p)?.value;

  /** Re-point one entry in place through derive(); render it and its sibling as the adapters do. */
  function deriveAndRender(entry: string, yamlValue: string, pieceText: (value: unknown) => string) {
    const rows: Record<string, { disposition: string; destination?: string }> = {};
    for (const leaf of tree.units) rows[leaf.path] = { disposition: 'retained' };
    rows[entry] = { disposition: 're-pointed', destination: `frontmatter:${entry}` };
    const overlay = parseOverlay(`## @entry ${entry} @ sha256:${hexOf(hashEntry(leafValue(entry)))}\n${yamlValue}`, 'lina.overlay.md');
    const derived = derive({ source: FILE, frontmatter, body, dispositions: { source: FILE, body: bodyRows, frontmatter: rows } as never, overlay });
    const value = derivedEntryValues(derived.frontmatter as typeof frontmatter, derived.entryOrigin);
    const acc = new AttributionAccumulator();
    const out = emitSpans(acc, { file: FILE, body, frontmatter: derived.frontmatter as typeof frontmatter, entryOrigin: derived.entryOrigin }, 'consumer', { frontmatter: rows as never }, undefined, [
      { kind: 'entry', path: entry, text: pieceText(value(entry)) },
    ]);
    return { spans: renderedSpans(acc.build('lina.md').spans, out.text), value };
  }
  const v = (r: ReturnType<typeof deriveAndRender>, s: string, destination: string) =>
    checkDerivation({ file: FILE, trees, spans: r.spans, s: `frontmatter:${s}`, destination: `frontmatter:${destination}`, derivedValue: r.value }).verdict;

  it('FS1: `description` re-pointed to a string of spaces → derive() accepts it (a string) and the check returns FAIL_NO_DERIVATION', () => {
    const r = deriveAndRender('description', '"     "\n', (val) => `description: ${JSON.stringify(val)}\n`);
    expect(r.spans.map((s) => s.text.trim())).toEqual(['description: "     "']); // the RENDERED text is not blank …
    expect(`FS1: ${v(r, 'description', 'description')}`).toBe('FS1: FAIL_NO_DERIVATION'); // … the derived value is
  });

  it('F3 (frontmatter attack (a), verbatim shape: key set kept, string fields emptied) → the value keeps members, so D is non-empty; sibling destination → FAIL_DISHONEST_NAMING', () => {
    const canonical = leafValue(X) as Record<string, unknown>;
    const emptied = Object.fromEntries(Object.entries(canonical).map(([k, val]) => [k, k === 'name' ? val : typeof val === 'string' ? '' : val]));
    const r = deriveAndRender(X, `${JSON.stringify(emptied)}\n`, () => '- \n');
    expect(`F3: ${v(r, X, Y)}`).toBe('F3: FAIL_DISHONEST_NAMING');
    expect(`F3 in place (named limit L2's shape): ${v(r, X, X)}`).toBe('F3 in place (named limit L2\'s shape): VERIFIED');
  });

  it('with no derived-value lookup supplied, no frontmatter span is in D (fail-closed)', () => {
    const spans = renderCommands({});
    expect(checkDerivation({ file: FILE, trees, spans, s: `frontmatter:${X}`, destination: `frontmatter:${X}` }).verdict).toBe('FAIL_NO_DERIVATION');
  });
});
