/**
 * Heading Structure Parser
 * 
 * Extracts H2 and H3 heading structure from markdown content using mechanical parsing.
 * Does NOT interpret content or follow instructions - purely structural extraction.
 *
 * FENCE-AWARE (2026-10-13, indexer fix 1 — .kiro/issues/2026-10-13-find-docs-indexer-defects-from-stage1.md):
 * `##` / `###` lines inside fenced code blocks (``` or ~~~) are example content, not headings,
 * and are no longer extracted. Before this fix they were indexed as phantom sections (completion
 * docs' templates listed "Found later", "Artifacts Created", … as sections of the guide). At the
 * time of the fix, 15 served docs carried headings inside fences.
 *
 * SCOPE: this parser feeds find_docs' match surface (`sections`), document summaries' outline,
 * and SectionNotFound's suggestion list. It does NOT feed get_section addressing:
 * `section-parser.ts` (parseHeadingTree) is deliberately left fence-UNaware here, because its
 * `s{index}` section ids count every heading line in order — making it fence-aware would
 * renumber section ids in those 15 docs and break stored `docid#sN` references. That change
 * needs its own addressing-conventions pass (steering-addressing-conventions) and is out of
 * this fix's scope.
 */

import { SectionOutline } from '../models/DocumentSummary.js';

/**
 * Extract heading structure from markdown content
 * 
 * Uses regex to identify H2 (##) and H3 (###) headings and build an outline.
 * H2 headings become top-level sections, H3 headings become subsections.
 * 
 * @param content - Markdown content to parse
 * @returns Array of section outlines with H2 headings and H3 subsections
 * 
 * @example
 * ```typescript
 * const content = `
 * ## Overview
 * Some content
 * ### Details
 * More content
 * ## Architecture
 * ### Components
 * ### Interfaces
 * `;
 * 
 * const outline = extractHeadingStructure(content);
 * // Returns:
 * // [
 * //   { heading: 'Overview', level: 2, subsections: ['Details'] },
 * //   { heading: 'Architecture', level: 2, subsections: ['Components', 'Interfaces'] }
 * // ]
 * ```
 */
export function extractHeadingStructure(content: string): SectionOutline[] {
  const lines = content.split('\n');
  const outline: SectionOutline[] = [];
  let currentH2: SectionOutline | null = null;
  // Open fence, if any: its character and length (CommonMark: ``` or ~~~, ≥ 3, up to 3 spaces
  // of indentation; closed by the same character, at least as long, with nothing after it).
  let fence: { char: string; len: number } | null = null;
  
  for (const line of lines) {
    const fenceMatch = /^ {0,3}(`{3,}|~{3,})(.*)$/.exec(line);
    if (fenceMatch) {
      const marker = fenceMatch[1];
      if (fence === null) {
        // A backtick fence's info string may not contain backticks (CommonMark); otherwise it opens.
        if (!(marker[0] === '`' && fenceMatch[2].includes('`'))) {
          fence = { char: marker[0], len: marker.length };
        }
        continue;
      }
      if (marker[0] === fence.char && marker.length >= fence.len && fenceMatch[2].trim() === '') {
        fence = null;
      }
      continue;
    }
    if (fence !== null) continue;

    // Match H2 headings (## Heading)
    const h2Match = /^##\s+(.+)$/.exec(line);
    if (h2Match) {
      currentH2 = {
        heading: h2Match[1].trim(),
        level: 2,
        subsections: []
      };
      outline.push(currentH2);
      continue;
    }
    
    // Match H3 headings (### Heading)
    const h3Match = /^###\s+(.+)$/.exec(line);
    if (h3Match && currentH2) {
      currentH2.subsections.push(h3Match[1].trim());
    }
  }
  
  return outline;
}
