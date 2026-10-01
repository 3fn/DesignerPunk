/**
 * The partitioner (C13) — Spec 123 Task 10.1 (body) and 10.3 (frontmatter entry tree).
 *
 * design.md § "C13. The splitter family" and Req 10.G / 10.8. ONE splitter feeds three
 * consumers — charter-body spans (C14), always-set spans, and clause (ii)'s application unit
 * (C16/C18) — so the span grain and the application grain are THE SAME PARTITION: the finest
 * stable structural unit the document actually has.
 *
 * `partition(body)` — THREE behaviors plus the degenerate case:
 *   1. a FENCE-AWARE tokenizer (``` and ~~~ fences; a `## ` line inside a fence is content —
 *      `Spec-Feedback-Protocol.md` carries four);
 *   2. a HEADING TREE → leaf units, with PREAMBLES AS UNITS:
 *        prose between a heading and its first child → `#<parent>:preamble`;
 *        prose before the first heading              → `#doc:preamble`;
 *   3. the NUMBERED TOP-LEVEL ENUMERATION fallback, triggered by "no headings BELOW the
 *      document's root title" (so `# Start Up Tasks` does not suppress it). Item anchors slug
 *      from the item's LEADING bold span; with none, from the first line's text; by position
 *      only when that is empty;
 *   D. DEGENERATE: no headings below the title and no enumeration → ONE unit, `#doc`,
 *      `degenerate: true` — a declared state, never a clean pass.
 *
 * ATTACHMENT DIRECTION (Lina L2-D3):
 *   - a heading's OWN LINE plus the whitespace after it attaches FORWARD to the next unit
 *     whenever nothing but whitespace follows it before the next heading (the 32-of-69
 *     heading-line-only non-leaf headings; a bare LEAF heading follows the same rule — see
 *     the note on `HEADING_ONLY` below);
 *   - only trailing whitespace attaches backward, to the preceding unit;
 *   - a whitespace-only `#doc:preamble` attaches forward to the first unit;
 *   - so no unit is whitespace-only and no unit is a bare heading line (outside the declared
 *     degenerate state).
 *
 * INVARIANT (Req 10.8): the units are an EXACT PARTITION — their concatenation is
 * byte-identical to the body. Asserted inside `partition()` with a throw.
 *
 * DUPLICATE SLUGS get a `-2`, `-3`… suffix in document order (order-dependent; zero exist in
 * the 17 partitioned files today — latent, recorded).
 *
 * DECLARED LIMITS: ATX headings only (a setext `Title\n---` underline is not read as a
 * heading); headings may be indented 0–3 spaces; enumeration items must start at column 0.
 *
 * The {@link PartitionTree} is shared with the frontmatter ENTRY TREE (`entryTree`, below):
 * containment is STRUCTURAL in one `nodes` map, never by string prefix, so C15's
 * `isDescendantOrSelf` works identically on both trees — and an anchor absent from the tree is
 * NON-MATCHING (false), never an exception (Lina R2).
 *
 * Traces to: Req 10.G, 10.8, 10.9; design C13, C15 (containment contract).
 */

import type { YamlDoc } from './frontmatter';

// ============================================================================
// The shared tree
// ============================================================================

export type PartitionNodeKind =
  // body tree
  | 'doc'
  | 'heading'
  | 'preamble'
  | 'item'
  // entry tree
  | 'root'
  | 'map'
  | 'list'
  | 'leaf';

export interface PartitionNode {
  /** Anchor (`#identity`, `#beta:preamble`, `#item-…`, `#doc`) or entry path (`routes.docs[x]`). */
  id: string;
  parent: string | null;
  /** Child ids in document / YAML order. */
  children: string[];
  kind: PartitionNodeKind;
  /** Heading text, item label, or map/list key — a human label, never matched. */
  label?: string;
  /** Heading level (1–6) for heading nodes. */
  level?: number;
}

export class PartitionTree<U> {
  constructor(
    readonly root: string,
    readonly nodes: ReadonlyMap<string, PartitionNode>,
    /** The leaf units, in order. For a body tree their texts concatenate to the body. */
    readonly units: readonly U[],
    readonly degenerate: boolean
  ) {}

  has(id: string): boolean {
    return this.nodes.has(id);
  }

  get(id: string): PartitionNode | undefined {
    return this.nodes.get(id);
  }

  /**
   * True iff `x` is `s` or lies structurally beneath it. An id absent from the tree (either
   * side) is NON-MATCHING — returns false, never throws (C15; Lina R2).
   */
  isDescendantOrSelf(x: string, s: string): boolean {
    if (!this.nodes.has(x) || !this.nodes.has(s)) return false;
    let cursor: string | null = x;
    while (cursor !== null) {
      if (cursor === s) return true;
      cursor = this.nodes.get(cursor)?.parent ?? null;
    }
    return false;
  }
}

// ============================================================================
// Body partition
// ============================================================================

export type PartitionUnitKind = 'doc-preamble' | 'preamble' | 'heading' | 'item' | 'degenerate';

export interface PartitionUnit {
  /** `#doc:preamble` | `#<slug>:preamble` | `#<slug>` | `#item-<slug>` | `#doc` (degenerate). */
  anchor: string;
  kind: PartitionUnitKind;
  /** The unit's exact bytes. Concatenated in order, the units are the body. */
  text: string;
  /** Inclusive 1-based BODY line range. */
  lines: [number, number];
}

export type BodyPartition = PartitionTree<PartitionUnit>;

/** Thrown when the exact-partition invariant does not hold (a splitter bug, never a doc defect). */
export class PartitionInvariantError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PartitionInvariantError';
  }
}

/**
 * The slug rule — mirrors the docs MCP's `slugifyTitle` (mcp-server/src/indexer/
 * frontmatter-parser.ts) so a body anchor and a docs-MCP id slug the same text the same way:
 * lowercase; whitespace/underscores → `-`; strip everything outside `[a-z0-9-]`; collapse and
 * trim `-`. Markdown emphasis/code markers are stripped by the same rule.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** An ATX heading: 0–3 spaces, 1–6 `#`, then a space/tab or end of line. */
const ATX_HEADING = /^ {0,3}(#{1,6})(?:[ \t]+(.*?))?[ \t]*$/;
/** A top-level enumeration item: column 0, digits, `.` or `)`, then a space/tab or end of line. */
const ENUM_ITEM = /^(\d{1,9})[.)](?:[ \t]+(.*?))?[ \t]*$/;
/** A fence opener (any indentation — list-item fences are indented): 3+ backticks or tildes. */
const FENCE_OPEN = /^\s*(`{3,}|~{3,})/;

interface Line {
  /** The line INCLUDING its terminator (the last line may lack one). */
  raw: string;
  /** The line without its `\n` (and without a trailing `\r`). */
  content: string;
}

function splitLines(body: string): Line[] {
  if (body.length === 0) return [];
  const out: Line[] = [];
  let start = 0;
  while (start < body.length) {
    const nl = body.indexOf('\n', start);
    const end = nl === -1 ? body.length : nl + 1;
    const raw = body.slice(start, end);
    out.push({ raw, content: raw.replace(/\r?\n$/, '') });
    start = end;
  }
  return out;
}

interface Marker {
  line: number; // 0-based line index
  type: 'heading' | 'item';
  level: number; // heading level; items: 0
  text: string; // heading text / item first-line text
}

/** Tokenize: heading and top-level item markers OUTSIDE fences (the fence-aware pass). */
function tokenize(lines: readonly Line[]): Marker[] {
  const markers: Marker[] = [];
  let fence: { char: string; len: number } | null = null;
  lines.forEach((line, i) => {
    const text = line.content;
    if (fence) {
      const close = /^\s*(`{3,}|~{3,})\s*$/.exec(text);
      if (close && close[1][0] === fence.char && close[1].length >= fence.len) fence = null;
      return;
    }
    const open = FENCE_OPEN.exec(text);
    // CommonMark: a backtick fence's info string may not contain a backtick (so a line like
    // "```a``` b" is inline code, not a fence opener).
    if (open && !(open[1][0] === '`' && text.slice(text.indexOf(open[1]) + open[1].length).includes('`'))) {
      fence = { char: open[1][0], len: open[1].length };
      return;
    }
    const h = ATX_HEADING.exec(text);
    if (h) {
      const headingText = (h[2] ?? '').replace(/[ \t]+#+$/, '').replace(/^#+$/, '');
      markers.push({ line: i, type: 'heading', level: h[1].length, text: headingText });
      return;
    }
    const item = ENUM_ITEM.exec(text);
    if (item) {
      markers.push({ line: i, type: 'item', level: 0, text: item[2] ?? '' });
    }
  });
  return markers;
}

function isBlank(lines: readonly Line[], from: number, to: number): boolean {
  for (let i = from; i < to; i += 1) {
    if (lines[i].content.trim().length > 0) return false;
  }
  return true;
}

/**
 * Unique-anchor allocator: the first use of a base keeps it, repeats get `-2`, `-3`, …
 * `reserved` ids count as already used. The body tree reserves its ROOT id `#doc`: without it, a
 * heading titled "Doc" slugs to `#doc`, overwrites the root node and becomes its own parent — a
 * cycle on which `isDescendantOrSelf` never terminates (found at Spec 123 Task 14.1).
 */
function makeAllocator(reserved: readonly string[] = []): (base: string) => string {
  const seen = new Map<string, number>(reserved.map((id) => [id, 1]));
  return (base: string) => {
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    return n === 1 ? base : `${base}-${n}`;
  };
}

/** The item's label source: its LEADING bold span; else the first line's text; else ''. */
export function itemLabel(firstLineText: string): string {
  const bold = /^(\*\*|__)(.+?)\1/.exec(firstLineText.trim());
  if (bold) return bold[2];
  return firstLineText;
}

/**
 * A segment before unit assembly: a line range, the node it belongs to, and whether it is a
 * heading line with nothing but whitespace after it (it then attaches FORWARD).
 */
interface Segment {
  start: number; // 0-based inclusive line
  end: number; // 0-based exclusive line
  anchor: string;
  kind: PartitionUnitKind;
  /** HEADING_ONLY: a heading line + whitespace only. Attaches forward (backward only at EOF). */
  headingOnly: boolean;
  /** A whitespace-only doc preamble — attaches forward like a heading-only segment. */
  whitespaceOnly: boolean;
}

/**
 * Partition a document BODY (never the file — see frontmatter.ts) into its leaf units.
 * Throws {@link PartitionInvariantError} if the units do not concatenate to the body.
 */
export function partition(body: string): BodyPartition {
  const lines = splitLines(body);
  const markers = tokenize(lines);
  const headings = markers.filter((m) => m.type === 'heading');

  const nodes = new Map<string, PartitionNode>();
  nodes.set('#doc', { id: '#doc', parent: null, children: [], kind: 'doc' });
  const addNode = (node: PartitionNode) => {
    nodes.set(node.id, node);
    if (node.parent !== null) nodes.get(node.parent)?.children.push(node.id);
  };

  const noHeadingsBelowTitle = headings.length === 0 || (headings.length === 1 && headings[0].level === 1);
  const segments: Segment[] = [];

  if (noHeadingsBelowTitle) {
    const title = headings[0];
    const titleLine = title?.line ?? -1;
    const items = markers.filter((m) => m.type === 'item' && m.line > titleLine);
    if (items.length === 0) {
      // D. The degenerate case — one unit, declared.
      const unit: PartitionUnit = {
        anchor: '#doc',
        kind: 'degenerate',
        text: body,
        lines: [1, Math.max(lines.length, 1)],
      };
      return finish(body, new PartitionTree('#doc', nodes, lines.length === 0 ? [] : [unit], true));
    }
    // 3. The numbered top-level enumeration fallback.
    const allocate = makeAllocator(['#doc']);
    let itemParent = '#doc';
    const firstItemLine = items[0].line;
    if (title) {
      if (titleLine > 0) segments.push(docPreamble(lines, 0, titleLine));
      const titleId = allocate(`#${slugify(title.text) || 'heading-1'}`);
      addNode({ id: titleId, parent: '#doc', children: [], kind: 'heading', label: title.text, level: title.level });
      itemParent = titleId;
      const headingOnly = isBlank(lines, titleLine + 1, firstItemLine);
      segments.push({
        start: titleLine,
        end: firstItemLine,
        anchor: `${titleId}:preamble`,
        kind: 'preamble',
        headingOnly,
        whitespaceOnly: false,
      });
      if (!headingOnly) addNode({ id: `${titleId}:preamble`, parent: titleId, children: [], kind: 'preamble' });
    } else if (firstItemLine > 0) {
      segments.push(docPreamble(lines, 0, firstItemLine));
    }
    items.forEach((item, idx) => {
      const label = itemLabel(item.text);
      const slug = slugify(label);
      const id = allocate(`#item-${slug || String(idx + 1)}`);
      addNode({ id, parent: itemParent, children: [], kind: 'item', label });
      segments.push({
        start: item.line,
        end: idx + 1 < items.length ? items[idx + 1].line : lines.length,
        anchor: id,
        kind: 'item',
        headingOnly: false,
        whitespaceOnly: false,
      });
    });
  } else {
    // 2. The heading tree.
    const allocate = makeAllocator(['#doc']);
    if (headings[0].line > 0) segments.push(docPreamble(lines, 0, headings[0].line));
    const stack: { id: string; level: number }[] = [];
    headings.forEach((h, idx) => {
      while (stack.length > 0 && stack[stack.length - 1].level >= h.level) stack.pop();
      const parent = stack.length > 0 ? stack[stack.length - 1].id : '#doc';
      const id = allocate(`#${slugify(h.text) || `heading-${idx + 1}`}`);
      addNode({ id, parent, children: [], kind: 'heading', label: h.text, level: h.level });
      stack.push({ id, level: h.level });

      const next = headings[idx + 1];
      const end = next ? next.line : lines.length;
      const nonLeaf = next !== undefined && next.level > h.level;
      const headingOnly = isBlank(lines, h.line + 1, end);
      if (nonLeaf && !headingOnly) {
        addNode({ id: `${id}:preamble`, parent: id, children: [], kind: 'preamble' });
      }
      segments.push({
        start: h.line,
        end,
        anchor: nonLeaf ? `${id}:preamble` : id,
        kind: nonLeaf ? 'preamble' : 'heading',
        headingOnly,
        whitespaceOnly: false,
      });
    });
    // (A preamble node is added straight after its heading node, before any sub-heading, so
    // it is already its heading's FIRST child — document order holds in `children`.)
  }

  return finish(body, new PartitionTree('#doc', nodes, assemble(lines, segments), false));
}

function docPreamble(lines: readonly Line[], start: number, end: number): Segment {
  return {
    start,
    end,
    anchor: '#doc:preamble',
    kind: 'doc-preamble',
    headingOnly: false,
    whitespaceOnly: isBlank(lines, start, end),
  };
}

/**
 * Assemble units from segments, applying the attachment rules: a heading-only or
 * whitespace-only segment carries FORWARD into the next unit-bearing segment; if none follows,
 * it attaches BACKWARD to the last unit; if there is no unit at all, the carried text becomes
 * one unit under the last segment's anchor (a lone heading — unreachable from the fallback
 * paths above, kept total rather than throwing).
 */
function assemble(lines: readonly Line[], segments: readonly Segment[]): PartitionUnit[] {
  const units: PartitionUnit[] = [];
  let carryStart: number | null = null;
  const textOf = (from: number, to: number) => lines.slice(from, to).map((l) => l.raw).join('');

  for (const seg of segments) {
    if (seg.headingOnly || seg.whitespaceOnly) {
      if (carryStart === null) carryStart = seg.start;
      continue;
    }
    const start = carryStart ?? seg.start;
    carryStart = null;
    units.push({ anchor: seg.anchor, kind: seg.kind, text: textOf(start, seg.end), lines: [start + 1, seg.end] });
  }
  if (carryStart !== null) {
    const last = units[units.length - 1];
    if (last) {
      last.text = textOf(last.lines[0] - 1, lines.length);
      last.lines = [last.lines[0], lines.length];
    } else {
      const seg = segments[segments.length - 1];
      units.push({ anchor: seg.anchor, kind: seg.kind, text: textOf(carryStart, lines.length), lines: [carryStart + 1, lines.length] });
    }
  }
  return units;
}

/** The exact-partition invariant (Req 10.8): byte-identical concatenation, asserted with a throw. */
function finish(body: string, tree: BodyPartition): BodyPartition {
  const joined = tree.units.map((u) => u.text).join('');
  if (joined !== body) {
    throw new PartitionInvariantError(
      `partition(): the ${tree.units.length} units do not concatenate to the body ` +
        `(${joined.length} vs ${body.length} bytes) — the exact-partition invariant (Req 10.8) is broken.`
    );
  }
  return tree;
}

// ============================================================================
// Frontmatter entry tree (Task 10.3)
// ============================================================================

export interface EntryLeaf {
  /** The entry's field path (`agent`, `routes.docs[concept-catalog]`, `writeScope[src/**]`). */
  path: string;
  /** The YAML value at that entry — one atomic operative item. */
  value: unknown;
}

export type EntryTree = PartitionTree<EntryLeaf>;

/** The root node id of every entry tree. */
export const ENTRY_ROOT = '<frontmatter>';

/**
 * The stable identity field of a list member, per list path (design C13: `id`; `name` for
 * commands, NEVER `cmd`; doc-id + section for ambient — handled separately). A named-gap
 * command has no `name`; its identity is `class`. Lists absent here fall back to `id`, then
 * `name`, then the member's INDEX (only when it has no identity).
 */
const LIST_IDENTITY: Readonly<Record<string, readonly string[]>> = Object.freeze({
  'routes.docs': ['id'],
  'routes.agents': ['target'],
  commands: ['name', 'class'],
  knowledgeBases: ['name'],
  preflight: ['command'],
  'ambient.groundTruthManifest.trims': ['artifact'],
});

/**
 * `entryTree(frontmatter)` — a PartitionTree whose nodes are FIELD PATHS (design C13, L-D4):
 *   - maps decompose into their keys (`routes` → `routes.docs`; `kiro.keyboardShortcut`);
 *   - LIST- AND MAP-VALUED FIELDS ARE KEYED PER MEMBER (Stacy S-D-B2-(a)): a list's members
 *     are leaves `path[<identity>]` — `writeScope[<glob>]`, `skills[<id>]`,
 *     `toolSubset.<server>[<tool>]`, `knowledgeBases[<name>]`, `commands[<name>]`;
 *   - only scalar leaves and list MEMBERS are atomic (a route, a command, a glob: one item);
 *   - `ambient.governanceAsLaw` is keyed by doc-id + section: `ambient[<docid>]` →
 *     `ambient[<docid>#<section-slug>]` (one leaf per distinct asserted section — the same
 *     de-duplication `buildEmbeds` applies);
 *   - `kiro.agentSpawn` is the `preflight` field (its rendered concept): `preflight[<command>]`.
 * Duplicate member identities take the `-2` suffix, like duplicate slugs.
 */
export function entryTree(frontmatter: YamlDoc): EntryTree {
  const nodes = new Map<string, PartitionNode>();
  const leaves: EntryLeaf[] = [];
  nodes.set(ENTRY_ROOT, { id: ENTRY_ROOT, parent: null, children: [], kind: 'root' });

  const add = (id: string, parent: string, kind: PartitionNodeKind, label: string): void => {
    if (nodes.has(id)) {
      throw new PartitionInvariantError(`entryTree(): duplicate entry path "${id}".`);
    }
    nodes.set(id, { id, parent, children: [], kind, label });
    nodes.get(parent)?.children.push(id);
  };

  const walk = (value: unknown, path: string, parent: string, label: string, listKey: string): void => {
    if (Array.isArray(value)) {
      add(path, parent, 'list', label);
      const allocate = makeAllocator();
      value.forEach((member, index) => {
        const key = allocate(memberIdentity(member, listKey, index));
        const memberPath = `${path}[${key}]`;
        add(memberPath, path, 'leaf', key);
        leaves.push({ path: memberPath, value: member });
      });
      return;
    }
    if (isMap(value)) {
      add(path, parent, 'map', label);
      for (const [key, child] of Object.entries(value)) {
        walk(child, `${path}.${key}`, path, key, `${listKey}.${key}`);
      }
      return;
    }
    add(path, parent, 'leaf', label);
    leaves.push({ path, value });
  };

  for (const [key, value] of Object.entries(frontmatter)) {
    if (key === 'ambient' && isMap(value)) {
      walkAmbient(value, add, leaves, walk);
    } else if (key === 'kiro' && isMap(value)) {
      add('kiro', ENTRY_ROOT, 'map', 'kiro');
      for (const [k, v] of Object.entries(value)) {
        if (k === 'agentSpawn') walk(v, 'preflight', ENTRY_ROOT, 'preflight', 'preflight');
        else walk(v, `kiro.${k}`, 'kiro', k, `kiro.${k}`);
      }
    } else {
      walk(value, key, ENTRY_ROOT, key, key);
    }
  }

  return new PartitionTree(ENTRY_ROOT, nodes, leaves, false);
}

function walkAmbient(
  ambient: Record<string, unknown>,
  add: (id: string, parent: string, kind: PartitionNodeKind, label: string) => void,
  leaves: EntryLeaf[],
  walk: (value: unknown, path: string, parent: string, label: string, listKey: string) => void
): void {
  add('ambient', ENTRY_ROOT, 'map', 'ambient');
  for (const [key, value] of Object.entries(ambient)) {
    if (key !== 'governanceAsLaw' || !Array.isArray(value)) {
      walk(value, `ambient.${key}`, 'ambient', key, `ambient.${key}`);
      continue;
    }
    for (const entry of value) {
      const docId = isMap(entry) && typeof entry.id === 'string' ? entry.id : undefined;
      if (docId === undefined) {
        throw new PartitionInvariantError('entryTree(): an ambient.governanceAsLaw entry carries no `id`.');
      }
      const docPath = `ambient[${docId}]`;
      add(docPath, 'ambient', 'map', docId);
      const seen = new Set<string>();
      const asserts = isMap(entry) && Array.isArray(entry.assert) ? entry.assert : [];
      for (const claim of asserts) {
        const section = isMap(claim) && typeof claim.section === 'string' ? claim.section : '';
        if (seen.has(section)) continue; // two claims on one section: one embedded entry
        seen.add(section);
        const sectionPath = `ambient[${docId}#${slugify(section)}]`;
        add(sectionPath, docPath, 'leaf', section);
        leaves.push({ path: sectionPath, value: { ...entry, assert: asserts.filter((c) => isMap(c) && c.section === section) } });
      }
    }
  }
}

function memberIdentity(member: unknown, listKey: string, index: number): string {
  if (!isMap(member)) {
    if (typeof member === 'string' || typeof member === 'number' || typeof member === 'boolean') return String(member);
    return String(index);
  }
  const fields = LIST_IDENTITY[listKey] ?? ['id', 'name'];
  for (const field of fields) {
    const v = member[field];
    if (typeof v === 'string' && v.length > 0) return v;
  }
  return String(index);
}

function isMap(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
