/**
 * partition.golden.test.ts — Spec 123 Task 10 (10.2, 10.5): Golden Bite 1 (Req 10.G), the
 * forward-attachment bite, the snapshot ban (DD6), and the 17-file partition invariant.
 *
 * GOLDEN BITE 1 (Req 10.G; design § "Testing Strategy"): the committed, HAND-AUTHORED
 * `__fixtures__/golden-partition/expected-units.json` is the arbiter. It goes RED under each
 * recorded mutation — collapse to `##`; partition the file instead of the body; trigger the
 * fallback on "no headings"; attach heading lines backward. Deterministic; needs no 11.4
 * checker; runs in isolation from C6 (fixture inputs outside every guarded root, Req 10.8c).
 *
 * DD6: snapshot matchers are banned here — directory AND inline. The test rejects a
 * `__snapshots__/` directory and any snapshot-matcher call in its own source; the pattern it
 * scans for is assembled from pieces so this file never contains the literal it bans.
 */

import * as fs from 'fs';
import * as path from 'path';
import { load as loadYaml } from 'js-yaml';
import { splitFrontmatter } from '../frontmatter';
import { partition, slugify, PartitionTree, type PartitionUnit } from '../partition';

const REPO_ROOT = path.resolve(__dirname, '..', '..', '..');
const FIXTURE_DIR = path.resolve(__dirname, '..', '__fixtures__', 'golden-partition');

interface ExpectedUnit {
  anchor: string;
  kind: string;
  lines: [number, number];
}
interface ExpectedFile {
  degenerate: boolean;
  units: ExpectedUnit[];
}
interface ExpectedList {
  _provenance: string;
  files: Record<string, ExpectedFile>;
}

const expected = JSON.parse(fs.readFileSync(path.join(FIXTURE_DIR, 'expected-units.json'), 'utf8')) as ExpectedList;

function readFixture(name: string): string {
  return fs.readFileSync(path.join(FIXTURE_DIR, name), 'utf8');
}

function partitionFile(raw: string) {
  const { body } = splitFrontmatter(raw);
  return { body, tree: partition(body) };
}

const HEADING_LINE = /^ {0,3}#{1,6}(?:[ \t]|$)/;

/** Headings in a unit OUTSIDE fences — the fence-aware reading the splitter itself uses. */
function unfencedLines(text: string): string[] {
  const out: string[] = [];
  let fence: string | null = null;
  for (const line of text.split('\n')) {
    const m = /^\s*(`{3,}|~{3,})/.exec(line);
    if (fence) {
      if (m && m[1][0] === fence[0] && m[1].length >= fence.length && line.trim() === m[1]) fence = null;
      continue;
    }
    if (m) {
      fence = m[1];
      continue;
    }
    out.push(line);
  }
  return out;
}

// ============================================================================
// Golden Bite 1
// ============================================================================

describe('Golden Bite 1 — the hand-authored unit list (Req 10.G)', () => {
  it('the expected list declares its hand-authorship (the _provenance key — DD6: declared, not proven)', () => {
    expect(expected._provenance).toMatch(/HAND-AUTHORED/);
  });

  it('every fixture document is listed, and every listed document exists (no silently unlisted fixture)', () => {
    const onDisk = fs.readdirSync(FIXTURE_DIR).filter((f) => f.endsWith('.md')).sort();
    expect(Object.keys(expected.files).sort()).toEqual(onDisk);
    expect(onDisk).toHaveLength(4);
  });

  it.each(Object.keys(expected.files))('%s partitions to exactly the hand-authored unit list', (name) => {
    const { tree } = partitionFile(readFixture(name));
    const actual = tree.units.map((u) => ({ anchor: u.anchor, kind: u.kind, lines: u.lines }));
    expect(actual).toEqual(expected.files[name].units);
    expect(tree.degenerate).toBe(expected.files[name].degenerate);
  });
});

// ============================================================================
// Forward attachment (design § "Testing Strategy": attach heading lines backward → the
// golden list differs; disposing a leaf deletes the next heading)
// ============================================================================

describe('Attachment direction — heading lines attach FORWARD, only trailing whitespace backward', () => {
  it.each(Object.keys(expected.files))('%s: no unit ends on a heading line, and none is whitespace-only', (name) => {
    const { tree } = partitionFile(readFixture(name));
    for (const unit of tree.units) {
      if (tree.degenerate) continue;
      const nonBlank = unfencedLines(unit.text).filter((l) => l.trim().length > 0);
      expect(nonBlank.length).toBeGreaterThan(0); // not whitespace-only
      // A heading line after the unit's first content line would be a NEXT section's heading
      // glued backward — disposing this unit would delete it.
      const firstContent = nonBlank.findIndex((l) => !HEADING_LINE.test(l));
      expect(firstContent).toBeGreaterThanOrEqual(0); // not a bare heading line (or run of them)
      const laterHeadings = nonBlank.slice(firstContent).filter((l) => HEADING_LINE.test(l));
      expect({ unit: unit.anchor, laterHeadings }).toEqual({ unit: unit.anchor, laterHeadings: [] });
    }
  });

  it('a heading-line-only non-leaf heading rides forward into its first child\'s unit', () => {
    const { tree } = partitionFile(readFixture('charter.md'));
    const gamma = tree.units.find((u) => u.anchor === '#gamma-one:preamble') as PartitionUnit;
    expect(gamma.text.startsWith('## Gamma\n\n### Gamma One\n')).toBe(true);
    const alpha = tree.units.find((u) => u.anchor === '#alpha') as PartitionUnit;
    expect(alpha.text.startsWith('# Golden Charter\n\n## Alpha\n')).toBe(true);
    // …and the preceding leaf does NOT carry it.
    const notes = tree.units.find((u) => u.anchor === '#notes') as PartitionUnit;
    expect(notes.text).not.toContain('## Gamma');
  });
});

// ============================================================================
// The fixture carries every case in C13's golden-fixture bullet (+ Req 10.G Bite 1's)
// ============================================================================

describe('Fixture coverage — every C13 golden-fixture case is present (checked, not asserted by reading)', () => {
  const charterRaw = readFixture('charter.md');
  const charter = partitionFile(charterRaw).tree;
  const enumRaw = readFixture('enumeration-member.md');
  const enumeration = partitionFile(enumRaw).tree;

  it('C13: a title-only numbered document', () => {
    const body = splitFrontmatter(enumRaw).body;
    const headings = unfencedLines(body).filter((l) => HEADING_LINE.test(l));
    expect(headings).toEqual(['# Golden Enumeration']);
    expect(enumeration.units.filter((u) => u.kind === 'item').length).toBeGreaterThanOrEqual(3);
  });

  it('C13: a frontmatter block with `^# ` comments', () => {
    const raw = splitFrontmatter(charterRaw).rawFrontmatter ?? '';
    expect(raw.split('\n').filter((l) => /^# /.test(l)).length).toBeGreaterThanOrEqual(1);
  });

  it('C13: a `#doc:preamble`', () => {
    expect(charter.units.some((u) => u.anchor === '#doc:preamble')).toBe(true);
  });

  it('C13: whitespace-gap cases (a multi-blank-line gap, trailing whitespace, a whitespace-only doc preamble)', () => {
    // a two-blank-line gap between sections — trailing whitespace, so it stays with the unit before it
    const alpha = charter.units.find((u) => u.anchor === '#alpha') as PartitionUnit;
    expect(alpha.text.endsWith('gap.\n\n\n')).toBe(true);
    expect(charter.units[charter.units.length - 1].text.endsWith('\n\n\n\n')).toBe(true);
    expect(splitFrontmatter(enumRaw).body.startsWith('\n#')).toBe(true);
  });

  it('C13: a non-leaf heading with a heading-line-only preamble (forward attachment)', () => {
    expect(charter.has('#gamma')).toBe(true);
    expect(charter.has('#gamma:preamble')).toBe(false);
    expect(charter.get('#gamma')?.children).toContain('#gamma-one');
  });

  it('C13: a leading-bold versus an inner-bold enumeration item', () => {
    const anchors = enumeration.units.map((u) => u.anchor);
    expect(anchors).toContain('#item-governance-health-check'); // leading bold span
    expect(anchors).toContain('#item-check-the-current-date'); // inner bold: first-line text, NOT #item-current
    expect(anchors).not.toContain('#item-current');
  });

  it('Bite 1: nested ##/### (and deeper), an orphan preamble, a fenced ##', () => {
    expect(charter.get('#beta-one')?.level).toBe(3);
    expect(charter.get('#gamma-one-deep')?.level).toBe(4);
    expect(charter.units.some((u) => u.anchor === '#beta:preamble')).toBe(true);
    const betaOne = charter.units.find((u) => u.anchor === '#beta-one') as PartitionUnit;
    expect(betaOne.text).toContain('\n## Not A Heading (fenced)\n');
    expect(charter.has('#not-a-heading-fenced')).toBe(false);
  });

  it('Bite 1: a heading-free member (enumeration fallback) and a zero-heading member (degenerate)', () => {
    expect(enumeration.degenerate).toBe(false);
    const degenerateBody = splitFrontmatter(readFixture('degenerate-member.md')).body;
    expect(unfencedLines(degenerateBody).filter((l) => HEADING_LINE.test(l))).toEqual([]);
    expect(partition(degenerateBody).degenerate).toBe(true);
  });
});

// ============================================================================
// Snapshot ban (DD6) + its companion
// ============================================================================

describe('Snapshot ban (DD6) — the reviewed diff does the protective work', () => {
  // Assembled from pieces so this file never contains the literal it bans (the criterion's
  // grep over this file must return 0).
  const SNAPSHOT_MATCHER = new RegExp('toMatch' + '(Inline)?' + 'Snapshot');

  it('this test file calls no snapshot matcher (directory or inline)', () => {
    const own = fs.readFileSync(__filename, 'utf8');
    expect(SNAPSHOT_MATCHER.test(own)).toBe(false);
  });

  it('COMPANION: no __snapshots__/ directory exists beside this test or the golden fixture', () => {
    expect(fs.existsSync(path.join(__dirname, '__snapshots__'))).toBe(false);
    expect(fs.existsSync(path.join(FIXTURE_DIR, '__snapshots__'))).toBe(false);
  });
});

// ============================================================================
// The 17-file partition invariant (nine charters, eight identity docs)
// ============================================================================

function partitionedFileSet(): string[] {
  const charters = fs
    .readdirSync(path.join(REPO_ROOT, 'canonical', 'agents'))
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => `canonical/agents/${f}`);
  // The eight identity docs that SHIP by path (design C19): the always-set minus the
  // personal note, which ships as its template. Ids are read from each doc's own
  // frontmatter, never guessed from filenames.
  const alwaysSet = (loadYaml(fs.readFileSync(path.join(REPO_ROOT, 'canonical', 'shared', 'always-set.yaml'), 'utf8')) as {
    alwaysSet: { id: string }[];
  }).alwaysSet.map((m) => m.id);
  const shippedIds = new Set(alwaysSet.filter((id) => id !== 'personal-note'));
  const steering = fs
    .readdirSync(path.join(REPO_ROOT, '.kiro', 'steering'))
    .filter((f) => f.endsWith('.md'))
    .sort()
    .map((f) => `.kiro/steering/${f}`)
    .filter((rel) => {
      const id = splitFrontmatter(fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8')).frontmatter.id;
      return typeof id === 'string' && shippedIds.has(id);
    });
  return [...charters, ...steering];
}

describe('The partition invariant on the 17 files (Req 10.8)', () => {
  const files = partitionedFileSet();

  it('the set is 17 files — nine charters and eight identity docs (count asserted)', () => {
    expect(files.filter((f) => f.startsWith('canonical/agents/'))).toHaveLength(9);
    expect(files.filter((f) => f.startsWith('.kiro/steering/'))).toHaveLength(8);
    expect(files).toHaveLength(17);
  });

  it.each(files)('%s: the units are an exact partition — byte-identical concatenation, contiguous lines', (rel) => {
    const { body, tree } = partitionFile(fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8'));
    expect(tree.units.map((u) => u.text).join('')).toBe(body);
    let next = 1;
    for (const unit of tree.units) {
      expect(unit.lines[0]).toBe(next);
      next = unit.lines[1] + 1;
    }
    if (!tree.degenerate) {
      for (const unit of tree.units) expect(unit.text.trim().length).toBeGreaterThan(0);
    }
  });

  it('the fixture charter is the one degenerate file today (a declared state, never a clean pass)', () => {
    const degenerate = files.filter(
      (rel) => partitionFile(fs.readFileSync(path.join(REPO_ROOT, rel), 'utf8')).tree.degenerate
    );
    expect(degenerate).toEqual(['canonical/agents/_fixture.md']);
  });
});

// ============================================================================
// Splitter behaviors (unit level)
// ============================================================================

describe('partition() behaviors', () => {
  it('byte-identical on edge bodies: empty, no trailing newline, CRLF', () => {
    expect(partition('').units).toEqual([]);
    for (const body of ['# T\n\n## A\ntext', '# T\r\n\r\n## A\r\ntext\r\n', 'just prose']) {
      expect(partition(body).units.map((u) => u.text).join('')).toBe(body);
    }
  });

  it('slugify mirrors the docs MCP slug rule', () => {
    expect(slugify('Token Selection Priority (MUST follow this order)')).toBe('token-selection-priority-must-follow-this-order');
    expect(slugify('Lina — Stemma Component Specialist')).toBe('lina-stemma-component-specialist');
    expect(slugify('CRITICAL: Wait for User Authorization Before Starting New Tasks')).toBe(
      'critical-wait-for-user-authorization-before-starting-new-tasks'
    );
  });

  it('a backtick line carrying more backticks is inline code, not a fence opener', () => {
    const tree = partition('# T\n\n## A\n\n```a``` inline\n\n## B\n\nb\n');
    expect(tree.units.map((u) => u.anchor)).toEqual(['#a', '#b']);
  });

  it('containment is structural; an unknown anchor is NON-MATCHING, never a throw (C15)', () => {
    const { tree } = partitionFile(readFixture('charter.md'));
    expect(tree).toBeInstanceOf(PartitionTree);
    expect(tree.isDescendantOrSelf('#gamma-one-deep', '#gamma')).toBe(true);
    expect(tree.isDescendantOrSelf('#beta:preamble', '#beta')).toBe(true);
    expect(tree.isDescendantOrSelf('#beta', '#beta')).toBe(true);
    expect(tree.isDescendantOrSelf('#beta', '#beta-one')).toBe(false);
    expect(tree.isDescendantOrSelf('#alpha', '#doc')).toBe(true);
    expect(tree.isDescendantOrSelf('#body', '#doc')).toBe(false);
    expect(tree.isDescendantOrSelf('#alpha', '#nope')).toBe(false);
  });

  it('the start-up-tasks item anchors Task 11 names (G and G′) exist', () => {
    const { tree } = partitionFile(fs.readFileSync(path.join(REPO_ROOT, '.kiro/steering/start-up-tasks.md'), 'utf8'));
    const anchors = tree.units.map((u) => u.anchor);
    expect(anchors).toContain('#item-critical-wait-for-user-authorization-before-starting-new-tasks');
    expect(anchors).toContain('#item-civitas-governance-health-check');
  });
});

describe('The root id is reserved — a heading titled "Doc" never collides with `#doc` (Spec 123 Task 14.1 finding)', () => {
  it('heading tree: `# Doc` is allocated `#doc-2`, the root keeps no parent, and containment terminates', () => {
    const t = partition('# Doc\n\n## Alpha\n\nA.\n\n## Alpha examples\n\nB.\n');
    expect(t.get('#doc')).toMatchObject({ kind: 'doc', parent: null });
    expect(t.get('#doc-2')).toMatchObject({ kind: 'heading', parent: '#doc' });
    expect(t.isDescendantOrSelf('#alpha-examples', '#alpha')).toBe(false);
    expect(t.isDescendantOrSelf('#alpha', '#doc')).toBe(true);
  });

  it('enumeration fallback: a `# Doc` title is allocated `#doc-2`', () => {
    const t = partition('# Doc\n\n1. First item.\n2. Second item.\n');
    expect(t.get('#doc')).toMatchObject({ kind: 'doc', parent: null });
    expect(t.get('#doc-2')).toMatchObject({ kind: 'heading', parent: '#doc' });
    expect(t.isDescendantOrSelf('#item-first-item', '#doc')).toBe(true);
  });
});
