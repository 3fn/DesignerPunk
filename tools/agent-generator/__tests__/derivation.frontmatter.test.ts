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
import { pruneFrontmatter } from '../derive';
import { checkDerivation } from '../regrounding/derivation';

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
  emitSpans(acc, { file: FILE, body, frontmatter: derived }, 'consumer', { frontmatter: frontmatterRows }, undefined, pieces);
  return acc.build('lina.md').spans;
}
const check = (spans: { source: string }[], s: string, destination: string) =>
  checkDerivation({ file: FILE, trees, spans, s: `frontmatter:${s}`, destination: `frontmatter:${destination}` });

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
    expect(check([{ source: `${FILE}#frontmatter:commands` }], X, X).verdict).toBe('FAIL_NO_DERIVATION');
  });
});
