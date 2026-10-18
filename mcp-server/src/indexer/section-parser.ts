/**
 * Section Boundary Parser
 *
 * Mechanically extracts sections from markdown documents by identifying
 * heading boundaries. Does NOT interpret content or follow instructions.
 *
 * Spec 121, Req 5 (Section Addressing): in addition to the original
 * heading-only extraction, this module now exposes a structural heading model
 * that supports:
 *   - disambiguation of non-unique headings by parent context (`parent`)
 *   - a stable, drift-resistant section ID (`sectionId`)
 *   - sibling-heading adjacency cues (`siblingHeadings`) so a stub/preamble
 *     signals that substantive siblings exist (Finding 1).
 *
 * FENCE-AWARE ADDRESSING (C-2, 2026-10-18 — `.kiro/issues/2026-10-13-discovery-study-stage1-followups.md`
 * row 13): a `##`/`###` line inside a fenced code block is template content, not a section of the
 * doc. For every REAL (unfenced) heading: a fenced heading no longer ends its section (get_section
 * used to return only the heading and the opening of a template), is never its sibling, and is
 * never its parent. Fenced headings are kept, unchanged, as a FALLBACK: they keep their place in
 * the `s{index}` count (so no section id moves — the renumbering that held this back at #325
 * does not happen), their own sectionId still resolves, and a heading that matches only inside a
 * fence still resolves — each to exactly its pre-fix payload, because a template heading can
 * answer "what goes in X" (row 12). A real heading always wins over a fenced one of the same text.
 *
 * H4 ADDRESSING (P-4, 2026-10-18 — `.kiro/issues/2026-10-12-docs-mcp-does-not-index-h4.md`): a
 * real `####` heading is a node too, so get_section can fetch it and SectionNotFound can suggest
 * it. It does NOT enter the `s{index}` count (that would renumber every later id in any doc with
 * an H4); its id is `s{c}.{k}` — the k-th H4 (1-based) under the H2/H3 whose id is `s{c}`.
 * Lookup precedence keeps every pre-fix resolution: real H2/H3, then fenced H2/H3, then H4 — an
 * H4 is reached only where the lookup was SectionNotFound before. A fenced `####` is not a node,
 * nor is an H4 before the first H2/H3 (none exists in the served corpus). The outline, the
 * health tool's section count and find_docs are unchanged (minimal form; the rest is recorded in
 * the home record).
 */

import { Section } from '../models/Section';
import { fenceMask } from './heading-parser';

/**
 * One heading occurrence in document order, with its structural address.
 *
 * `index` is the 0-based document-order position of this heading among ALL
 * parsed headings (H2 + H3) in the document. It is the backbone of the stable
 * `sectionId` (see `makeSectionId`).
 */
export interface HeadingNode {
  /** Heading text (without leading # and trimmed). */
  heading: string;
  /** Markdown heading level (2 = H2, 3 = H3, 4 = H4). */
  level: number;
  /** Line index (0-based) where the heading line occurs. */
  lineIndex: number;
  /** 0-based document-order position among all parsed H2/H3 headings. For an H4 (P-4) it is
   *  the index of its containing H2/H3 — H4s are addressed relative to it (see `sectionId`). */
  index: number;
  /** The node's stable section id: `s{index}` for an H2/H3, `s{index}.{k}` for an H4. */
  sectionId: string;
  /** Parent heading (nearest preceding heading of a lower level), or null.
   *  For a real heading, fenced headings are skipped (C-2); for a fenced heading it is
   *  {@link rawParent}, its pre-fix value. */
  parent: string | null;
  /** True when the heading line lies inside a fenced code block (template content, C-2). */
  inFence: boolean;
  /** The pre-C-2 parent: nearest preceding heading of a lower level, fenced or not. */
  rawParent: string | null;
}

/**
 * Stable section ID format: `s{index}` where `index` is the 0-based
 * document-order position of the heading among all parsed headings.
 *
 * WHY this is stable to heading-STRING drift (Req 5.2 / Finding 2):
 *   The ID is a STRUCTURAL/POSITIONAL address, not a slug of the heading text.
 *   Rewording a heading ("Requirements Document Format" →
 *   "Requirements Document Format (Conditional Loading)") does NOT move the
 *   heading's position in the document, so the same `sectionId` keeps resolving
 *   to the same logical section across that edit. A text-slug ID would have
 *   changed under exactly this rename — which is the Finding-2 footgun.
 *
 * What it is NOT stable to (documented tradeoff):
 *   - REORDERING headings (swapping two sections changes their positions).
 *   - INSERTING/DELETING a heading BEFORE the target (shifts all later indices).
 *   It IS stable to: rewording the target heading, editing body content,
 *   adding/removing non-heading lines, and renaming sibling headings.
 *
 * Alternatives rejected:
 *   - Heading-text slug (e.g. `requirements-document-format`): drifts on every
 *     rewording — defeats Req 5.2 / Finding 2 outright.
 *   - Ancestor-path slug (`requirements > requirements-document-format`): still
 *     a text slug, so still drifts on rewording of any node on the path.
 *   - Content hash: drifts on ANY body edit — far less stable than positional.
 *   - Stable random UUID injected into source: would require mutating the
 *     markdown files (out of scope; the indexer is read-only/mechanical) and a
 *     migration for every existing doc.
 * Positional addressing is the most drift-resistant scheme available WITHOUT
 * mutating source files, and its failure mode (reorder/insert-before) is the
 * least common edit for a stable logical unit.
 */
export function makeSectionId(index: number): string {
  return `s${index}`;
}

/** The H4 section id (P-4): the k-th (1-based) H4 under the H2/H3 whose id is `s{containerIndex}`. */
export function makeH4SectionId(containerIndex: number, k: number): string {
  return `s${containerIndex}.${k}`;
}

/** Parse a `s{index}` section ID back to its numeric index, or null if malformed. */
export function parseSectionId(sectionId: string): number | null {
  const m = /^s(\d+)$/.exec(sectionId.trim());
  if (!m) return null;
  const n = parseInt(m[1], 10);
  return isNaN(n) ? null : n;
}

/**
 * Build the ordered structural heading model for a document.
 *
 * Each node's `parent` is the nearest preceding heading of a strictly lower
 * level (an H3's parent is the nearest preceding H2; an H2 has no parent).
 * H2/H3 headings form the `s{index}` sequence; real H4s are addressed relative to their
 * containing H2/H3 (P-4 — see the module header).
 */
export function parseHeadingTree(content: string): HeadingNode[] {
  const lines = content.split('\n');
  const mask = fenceMask(lines);
  const nodes: HeadingNode[] = [];
  // Most recent heading at each level, for parent resolution: `real` skips fenced
  // headings (C-2), `raw` is the pre-fix track that fenced fallback nodes keep.
  const real: Record<number, string | null> = { 2: null, 3: null };
  const raw: Record<number, string | null> = { 2: null, 3: null };

  let order = 0;
  // P-4: the most recent REAL H2/H3 node (an H4's container) and its H4 count.
  let container: HeadingNode | null = null;
  let h4Count = 0;
  for (let i = 0; i < lines.length; i++) {
    const headingMatch = /^(#{2,4})\s+(.+)$/.exec(lines[i]);
    if (!headingMatch) continue;

    const level = headingMatch[1].length;
    const heading = headingMatch[2].trim();
    const inFence = mask[i];

    if (level === 4) {
      if (inFence || container === null) continue;
      h4Count += 1;
      nodes.push({
        heading,
        level,
        lineIndex: i,
        index: container.index,
        sectionId: makeH4SectionId(container.index, h4Count),
        parent: container.heading,
        inFence: false,
        rawParent: container.heading,
      });
      continue;
    }

    const rawParent = level === 3 ? raw[2] : null;
    const parent = inFence ? rawParent : level === 3 ? real[2] : null;

    // Every heading line, fenced or not, takes its position: ids never move (C-2).
    const node: HeadingNode = {
      heading, level, lineIndex: i, index: order, sectionId: makeSectionId(order), parent, inFence, rawParent,
    };
    nodes.push(node);
    order += 1;
    if (!inFence) {
      container = node;
      h4Count = 0;
    }

    // Entering a new H2 invalidates the "current H3" so a later H3 doesn't
    // inherit a stale sibling context.
    for (const track of inFence ? [raw] : [raw, real]) {
      track[level] = heading;
      if (level === 2) track[3] = null;
    }
  }

  return nodes;
}

/**
 * Compute sibling headings for a given heading node: the headings that share
 * the same parent (or, for an H2, the other top-level H2 headings). The target
 * heading itself is excluded.
 *
 * This is the Finding-1 adjacency cue — a preamble/stub whose substance lives
 * under an ADJACENT heading carries a list of those adjacent headings so a
 * naive single-query agent has a signal that "more exists here."
 */
export function computeSiblingHeadings(nodes: HeadingNode[], target: HeadingNode): string[] {
  const siblings: string[] = [];
  for (const n of nodes) {
    if (n === target) continue;
    if (n.level !== target.level) continue;
    if (target.level === 4) {
      // H4 siblings: the other H4s under the same container (P-4).
      if (n.index === target.index) siblings.push(n.heading);
      continue;
    }
    if (target.inFence) {
      // Fenced fallback node: its pre-fix sibling set (C-2 leaves it unchanged).
      if (n.rawParent === target.rawParent) siblings.push(n.heading);
      continue;
    }
    if (n.inFence) continue;
    if (n.parent === target.parent) {
      siblings.push(n.heading);
    }
  }
  return siblings;
}

/**
 * Find all occurrences of a heading (by exact text match), in document order.
 * Real headings only when any exist; otherwise the fenced fallback (C-2).
 */
export function findHeadingOccurrences(nodes: HeadingNode[], heading: string): HeadingNode[] {
  for (const tier of headingTiers(nodes, heading)) {
    if (tier.length > 0) return tier;
  }
  return [];
}

/**
 * The lookup precedence tiers for a heading text: real H2/H3, then fenced H2/H3 (C-2 fallback),
 * then H4 (P-4). A later tier is consulted only when every earlier one is empty, so no lookup that
 * resolved before these fixes resolves differently.
 */
function headingTiers(nodes: HeadingNode[], heading: string): HeadingNode[][] {
  const all = nodes.filter((n) => n.heading === heading);
  return [
    all.filter((n) => n.level <= 3 && !n.inFence),
    all.filter((n) => n.level <= 3 && n.inFence),
    all.filter((n) => n.level === 4),
  ];
}

/**
 * Extract the section body for a heading node by line address.
 *
 * Section starts at the heading line and ends at the next heading of the same
 * or higher level (mechanical boundary identification — unchanged semantics
 * from the original `extractSection`). Addressing by line index makes this
 * occurrence-precise: a non-unique heading no longer silently resolves to the
 * first match — the caller picks WHICH node.
 */
function extractSectionByNode(
  content: string,
  node: HeadingNode,
  filePath: string,
  nodes: HeadingNode[],
): Section {
  const lines = content.split('\n');
  // C-2: a real section runs through any fenced template it contains. A fenced
  // fallback node keeps its pre-fix boundary.
  const mask = node.inFence ? null : fenceMask(lines);
  const sectionContent: string[] = [];

  for (let i = node.lineIndex; i < lines.length; i++) {
    if (i !== node.lineIndex && !(mask && mask[i])) {
      const headingMatch = /^(#{2,4})\s+(.+)$/.exec(lines[i]);
      if (headingMatch) {
        const level = headingMatch[1].length;
        if (level <= node.level) break;
      }
    }
    sectionContent.push(lines[i]);
  }

  const tokenCount = Math.ceil(sectionContent.join('\n').length / 4);
  const parentHeadings = node.parent ? [node.parent] : [];

  return {
    path: filePath,
    heading: node.heading,
    content: sectionContent.join('\n'),
    parentHeadings,
    tokenCount,
    sectionId: node.sectionId,
    siblingHeadings: computeSiblingHeadings(nodes, node),
  };
}

/**
 * Result of a disambiguated section lookup.
 *
 * - `kind: 'section'`  → a unique resolution (the Section).
 * - `kind: 'ambiguous'` → a non-unique heading with no disambiguator: the
 *   caller is handed the candidate occurrences (with parent context + sectionId)
 *   so the response can SIGNAL ambiguity instead of silently returning the first
 *   match (Finding 3 / Req 5.1).
 * - `kind: 'not_found'`  → no matching heading / sectionId.
 */
export type SectionLookup =
  | { kind: 'section'; section: Section }
  | {
      kind: 'ambiguous';
      heading: string;
      candidates: Array<{ sectionId: string; parent: string | null; index: number }>;
    }
  | { kind: 'not_found' };

/**
 * Resolve a section with optional disambiguation.
 *
 * Resolution order:
 *   1. `sectionId` (stable positional ID) — wins if supplied & valid.
 *   2. `heading` (+ optional `parent`):
 *        - 0 matches → not_found
 *        - exactly 1 match → that section
 *        - >1 match:
 *            · if `parent` supplied → filter by parent; 1 → that section,
 *              0 → not_found, still >1 → ambiguous among the parent-filtered set
 *            · if no `parent` → AMBIGUOUS (signal + candidate list), NOT a
 *              silent first-match (the Finding-3 fix).
 *
 * Back-compat: a UNIQUE heading with no `parent`/`sectionId` resolves exactly as
 * before (now additionally carrying `sectionId` + `siblingHeadings`).
 */
export function resolveSection(
  content: string,
  filePath: string,
  opts: { heading?: string; parent?: string; sectionId?: string },
): SectionLookup {
  const nodes = parseHeadingTree(content);

  // 1. sectionId wins.
  if (opts.sectionId !== undefined && opts.sectionId !== '') {
    let node: HeadingNode | undefined;
    const idx = parseSectionId(opts.sectionId);
    if (idx !== null) {
      node = nodes.find((n) => n.level <= 3 && n.index === idx);
    } else {
      // P-4: `s{c}.{k}` addresses an H4.
      const m = /^s(\d+)\.(\d+)$/.exec(opts.sectionId.trim());
      if (m) node = nodes.find((n) => n.level === 4 && n.sectionId === makeH4SectionId(+m[1], +m[2]));
    }
    if (!node) return { kind: 'not_found' };
    return { kind: 'section', section: extractSectionByNode(content, node, filePath, nodes) };
  }

  // 2. heading (+ optional parent).
  if (opts.heading === undefined || opts.heading === '') {
    return { kind: 'not_found' };
  }

  let occurrences = findHeadingOccurrences(nodes, opts.heading);
  if (occurrences.length === 0) return { kind: 'not_found' };

  if (opts.parent !== undefined && opts.parent !== '') {
    // The first precedence tier with an occurrence under that parent (C-2 fallback, P-4 H4s).
    const parent = opts.parent;
    occurrences = [];
    for (const tier of headingTiers(nodes, opts.heading)) {
      occurrences = tier.filter((n) => n.parent === parent);
      if (occurrences.length > 0) break;
    }
    if (occurrences.length === 0) return { kind: 'not_found' };
  }

  if (occurrences.length === 1) {
    return { kind: 'section', section: extractSectionByNode(content, occurrences[0], filePath, nodes) };
  }

  // >1 and no (sufficient) disambiguator → signal ambiguity, list candidates.
  return {
    kind: 'ambiguous',
    heading: opts.heading,
    candidates: occurrences.map((n) => ({
      sectionId: n.sectionId,
      parent: n.parent,
      index: n.index,
    })),
  };
}

/**
 * Extract a specific section from markdown content by heading.
 *
 * BACK-COMPAT WRAPPER. Preserves the original signature/behavior: returns the
 * Section for the FIRST occurrence of `targetHeading`, or null if not found.
 * Now additionally populates `sectionId` + `siblingHeadings` on the returned
 * Section (additive). Existing callers that only read the original fields are
 * unaffected.
 *
 * Prefer `resolveSection` for new code — it surfaces ambiguity and supports
 * disambiguation. This wrapper still silently picks the first match (the legacy
 * shape callers depend on); the Finding-3 ambiguity signal is delivered by the
 * QueryEngine/DocumentIndexer path that uses `resolveSection`.
 */
export function extractSection(
  content: string,
  targetHeading: string,
  filePath: string
): Section | null {
  const nodes = parseHeadingTree(content);
  const occurrences = findHeadingOccurrences(nodes, targetHeading);
  if (occurrences.length === 0) return null;
  return extractSectionByNode(content, occurrences[0], filePath, nodes);
}

/** Words too common to make a deep heading a suggestion on their own (P-4). */
const SUGGESTION_STOP_WORDS = new Set(['the', 'and', 'for', 'with', 'from', 'into', 'that', 'this', 'are', 'not']);

function suggestionWords(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter((w) => w.length >= 3 && !SUGGESTION_STOP_WORDS.has(w)),
  );
}

/**
 * Deep-heading suggestions for a SectionNotFound (P-4): the real H3 and H4 headings that share at
 * least one word (≥ 3 letters, not a stop word) with the requested heading, most shared words
 * first, then document order, at most `limit`. Appended AFTER the existing H2 list by the
 * indexer, so a request that resembles no deep heading gets exactly the pre-fix suggestions.
 */
export function deepHeadingSuggestions(content: string, requested: string, limit = 10): string[] {
  const want = suggestionWords(requested);
  if (want.size === 0) return [];
  const scored: Array<{ heading: string; score: number; order: number }> = [];
  const seen = new Set<string>();
  parseHeadingTree(content).forEach((n, order) => {
    if (n.level < 3 || n.inFence || seen.has(n.heading)) return;
    let score = 0;
    for (const w of suggestionWords(n.heading)) if (want.has(w)) score += 1;
    if (score > 0) {
      seen.add(n.heading);
      scored.push({ heading: n.heading, score, order });
    }
  });
  scored.sort((a, b) => b.score - a.score || a.order - b.order);
  return scored.slice(0, limit).map((x) => x.heading);
}
