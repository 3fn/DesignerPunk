/**
 * Tests for `docs/consumer/COMMIT-POLICY.md` (Spec 123 Task 20.1; success criterion C1:
 * "`COMMIT-POLICY.md` reproduces C24's table").
 *
 * The doc's table is compared to C24's table in `.kiro/specs/123-consumer-distribution/design.md`,
 * item by item and in order. The comparison normalizes only two design-internal tags that a consumer
 * page does not carry: the amendment tag `(A5)` and the derivation tag `— DD1, derived`. Everything
 * else (every path, every parenthetical a reader sees) must match exactly.
 *
 * The check is exercised for its BITE: a doc missing an item, an item moved across the columns, and a
 * doc with an extra item each fail with the named difference. The fixtures are in-memory strings, so
 * the bite needs no build.
 */

import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(__dirname, '..', '..');
const DESIGN = path.join(ROOT, '.kiro/specs/123-consumer-distribution/design.md');
const DOC = path.join(ROOT, 'docs/consumer/COMMIT-POLICY.md');

export interface PolicyTable {
  header: [string, string];
  repoState: string[];
  regeneratedOrLocal: string[];
}

/** Strip bold markers and the two design-internal tags; collapse whitespace. */
export function normalizeItem(item: string): string {
  return item
    .replace(/\*\*/g, '')
    .replace(/ \(A5\)/g, '')
    .replace(/ — DD1, derived/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function splitCells(row: string): string[] {
  // `| a | b |` -> ['a', 'b'] (the cells hold no unescaped pipes).
  return row.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());
}

function toItems(cell: string): string[] {
  return cell.split(' · ').map(normalizeItem).filter((s) => s.length > 0);
}

/** The first table in `text`: header row, separator row, one body row. */
export function parseFirstPolicyTable(text: string): PolicyTable {
  const lines = text.split('\n');
  const headerIdx = lines.findIndex((l) => /^\|\s*REPO STATE/.test(l));
  if (headerIdx < 0) throw new Error('no policy table: no row starting "| REPO STATE"');
  const header = splitCells(lines[headerIdx]);
  const body = lines[headerIdx + 2];
  if (!body || !body.startsWith('|')) throw new Error('policy table has no body row after the separator');
  const cells = splitCells(body);
  if (header.length !== 2 || cells.length !== 2) throw new Error(`policy table is not two columns (header ${header.length}, body ${cells.length})`);
  return {
    header: [normalizeItem(header[0]), normalizeItem(header[1])],
    repoState: toItems(cells[0]),
    regeneratedOrLocal: toItems(cells[1]),
  };
}

/** C24's section of design.md: from its heading to the next `####`. */
export function c24Section(design: string): string {
  const start = design.indexOf('#### C24.');
  if (start < 0) throw new Error('design.md has no "#### C24." heading');
  const rest = design.slice(start + 1);
  const next = rest.search(/\n#### /);
  return next < 0 ? design.slice(start) : design.slice(start, start + 1 + next);
}

/** Differences between the design's table and the doc's; empty when the doc reproduces it. */
export function tableDifferences(expected: PolicyTable, actual: PolicyTable): string[] {
  const out: string[] = [];
  if (expected.header.join(' | ') !== actual.header.join(' | ')) {
    out.push(`header differs: expected "${expected.header.join(' | ')}", got "${actual.header.join(' | ')}"`);
  }
  const cmp = (label: string, e: string[], a: string[]) => {
    for (const item of e) if (!a.includes(item)) out.push(`${label}: missing "${item}"`);
    for (const item of a) if (!e.includes(item)) out.push(`${label}: extra "${item}"`);
    if (out.length === 0 && e.join('\u0000') !== a.join('\u0000')) out.push(`${label}: same items, different order`);
  };
  cmp('commit column', expected.repoState, actual.repoState);
  cmp('do-not-commit column', expected.regeneratedOrLocal, actual.regeneratedOrLocal);
  return out;
}

const design = fs.readFileSync(DESIGN, 'utf8');
const expected = parseFirstPolicyTable(c24Section(design));

describe('COMMIT-POLICY.md reproduces C24\'s table (Task 20.1, C1)', () => {
  it('C24\'s table parses to the shape the criterion names (14 repo-state items, 2 regenerated/local)', () => {
    expect(expected.repoState).toHaveLength(14);
    expect(expected.regeneratedOrLocal).toEqual(['`token-index/`', '`.designerpunk/` (local only: your personal note)']);
  });

  it('the doc exists and its table equals C24\'s, item for item and in order', () => {
    expect(fs.existsSync(DOC)).toBe(true);
    const actual = parseFirstPolicyTable(fs.readFileSync(DOC, 'utf8'));
    expect(tableDifferences(expected, actual)).toEqual([]);
  });

  it('the doc carries no design-internal tag a reader cannot resolve (A5, DD1)', () => {
    const doc = fs.readFileSync(DOC, 'utf8');
    expect(doc).not.toMatch(/\(A\d+\)/);
    expect(doc).not.toMatch(/\bDD\d+\b/);
  });

  it('BITE: an item dropped from the doc is reported by name', () => {
    const actual = parseFirstPolicyTable(fs.readFileSync(DOC, 'utf8'));
    const dropped = { ...actual, repoState: actual.repoState.filter((i) => i !== '`designerpunk.manifest.json`') };
    expect(tableDifferences(expected, dropped)).toEqual(['commit column: missing "`designerpunk.manifest.json`"']);
  });

  it('BITE: an item moved across the columns is reported on both sides', () => {
    const actual = parseFirstPolicyTable(fs.readFileSync(DOC, 'utf8'));
    const moved = {
      ...actual,
      repoState: [...actual.repoState, '`token-index/`'],
      regeneratedOrLocal: actual.regeneratedOrLocal.filter((i) => i !== '`token-index/`'),
    };
    const diffs = tableDifferences(expected, moved);
    expect(diffs).toContain('commit column: extra "`token-index/`"');
    expect(diffs).toContain('do-not-commit column: missing "`token-index/`"');
  });

  it('BITE: the same items in a different order are reported', () => {
    const actual = parseFirstPolicyTable(fs.readFileSync(DOC, 'utf8'));
    const reversed = { ...actual, repoState: [...actual.repoState].reverse() };
    expect(tableDifferences(expected, reversed)).toEqual(['commit column: same items, different order']);
  });
});
