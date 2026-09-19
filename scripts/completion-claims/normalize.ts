/**
 * normalize.ts — THE shared normalization core (Spec 127, design C1; Reqs 2.5.1, 2.3.2).
 *
 * One module, two pure functions, no configuration, no options object — the
 * parameter-free property is the design. The materiality comparison is
 * `normalizeCell(maskCheckboxes(surface))` equality; the parity predicate is
 * `normalizeCell` equality over cell/bullet pairs. One concept, two call sites,
 * enforced by imports (design C1: "never by convention").
 *
 * The rule list is CLOSED-but-extendable by recorded amendment only (Req 2.5.3).
 * A false red from an exotic rendering artifact is a loud, author-fixable
 * failure; a silently growing list is how (c′) would rot into fuzzy matching.
 */

/**
 * Zero-width characters stripped under rule (iii)'s bounded scope (design C1,
 * Ada R1): zero-width space / non-joiner / joiner, and BOM — invisible
 * copy-paste artifacts from Figma/spreadsheets, the same non-authorial class
 * as line-wrap. Nothing else: bold, backticks, and visible glyphs (arrows, Δ,
 * subscripts) pass through untouched.
 */
const ZERO_WIDTH = /[​‌‍﻿]/g;

/**
 * The four rules, in order (Req 2.5.1):
 *  (i)   unescape table-pipe escapes: `\|` → `|`
 *  (ii)  `<br>`/`<br/>` tags → single space
 *  (iii) collapse runs of Unicode whitespace (the `White_Space` property —
 *        includes line breaks, NBSP, thin space U+2009, narrow NBSP U+202F)
 *        to a single space; zero-width characters and BOM stripped; trim ends
 *  (iv)  NOTHING ELSE — no case folding, no punctuation or markdown
 *        normalization; bold, backticks, and platform phrasing reproduce exactly
 *
 * (JavaScript's `\s` class matches exactly the Unicode White_Space set plus
 * ZWNBSP/BOM — the rule-(iii) collapse set; the zero-width set is stripped
 * first so it never becomes a space.)
 */
export function normalizeCell(s: string): string {
  return s
    .replace(/\\\|/g, '|')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(ZERO_WIDTH, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * The one named mask beyond the four rules (Req 2.3.2): checkbox state at
 * checkbox position (`- [x]` / `- [X]` / `- [ ]` after a list marker, any
 * leading indentation) → the literal token `[·]`. Ticks are thereby immaterial
 * to the promise surface automatically.
 */
export function maskCheckboxes(s: string): string {
  return s.replace(/^(\s*[-*]\s*)\[(?: |x|X)\]/gm, '$1[·]');
}
