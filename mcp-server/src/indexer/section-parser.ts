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
 */

import { Section } from '../models/Section';

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
  /** Markdown heading level (2 = H2, 3 = H3). */
  level: number;
  /** Line index (0-based) where the heading line occurs. */
  lineIndex: number;
  /** 0-based document-order position among all parsed headings. */
  index: number;
  /** Parent heading (nearest preceding heading of a lower level), or null. */
  parent: string | null;
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
 * Only H2/H3 are parsed (consistent with the rest of the indexer).
 */
export function parseHeadingTree(content: string): HeadingNode[] {
  const lines = content.split('\n');
  const nodes: HeadingNode[] = [];
  // Stack of the most recent heading at each level for parent resolution.
  const lastByLevel: Record<number, string | null> = { 2: null, 3: null };

  let order = 0;
  for (let i = 0; i < lines.length; i++) {
    const headingMatch = /^(#{2,3})\s+(.+)$/.exec(lines[i]);
    if (!headingMatch) continue;

    const level = headingMatch[1].length;
    const heading = headingMatch[2].trim();

    let parent: string | null = null;
    if (level === 3) {
      parent = lastByLevel[2];
    }

    nodes.push({ heading, level, lineIndex: i, index: order, parent });
    order += 1;

    lastByLevel[level] = heading;
    // Entering a new H2 invalidates the "current H3" so a later H3 doesn't
    // inherit a stale sibling context.
    if (level === 2) {
      lastByLevel[3] = null;
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
    if (n.index === target.index) continue;
    if (n.level !== target.level) continue;
    if (n.parent === target.parent) {
      siblings.push(n.heading);
    }
  }
  return siblings;
}

/**
 * Find all occurrences of a heading (by exact text match), in document order.
 */
export function findHeadingOccurrences(nodes: HeadingNode[], heading: string): HeadingNode[] {
  return nodes.filter((n) => n.heading === heading);
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
  const sectionContent: string[] = [];

  for (let i = node.lineIndex; i < lines.length; i++) {
    if (i !== node.lineIndex) {
      const headingMatch = /^(#{2,3})\s+(.+)$/.exec(lines[i]);
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
    sectionId: makeSectionId(node.index),
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
    const idx = parseSectionId(opts.sectionId);
    if (idx === null) return { kind: 'not_found' };
    const node = nodes.find((n) => n.index === idx);
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
    occurrences = occurrences.filter((n) => n.parent === opts.parent);
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
      sectionId: makeSectionId(n.index),
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
