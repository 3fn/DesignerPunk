/**
 * Region grain — extraction and splicing of a DesignerPunk-managed marker
 * region inside a consumer-owned text file (Spec 123 Task 16.4; design.md
 * § "C7. `sync` — managed set, grains, classification, pruning, migration",
 * row `CLAUDE.md` / `.gitignore` — "marker region"; § "THE NAMESPACE RULE,
 * uniform across all three grains" — "prefix for keys and files, markers
 * for text").
 *
 * Pure functions over strings — no filesystem access. A caller (`attach`,
 * `sync`) reads the file, calls `spliceRegion`, and only writes when the
 * result is `ok: true`. This module never throws and never performs I/O:
 * a missing or unmatched marker pair is a normal (non-exceptional) result
 * carrying the loud-failure catalog string (`errorCatalog.ts`,
 * `managedRegionMarkersMissingMessage`).
 *
 * **Grain, defined**:
 *  - The region is the text strictly between the END of the begin-marker's
 *    own line and the START of the end-marker's own line. The region's
 *    surrounding marker lines are themselves part of "outside" bytes that
 *    round-trip unchanged on a successful splice (only the inner content
 *    is replaced).
 *  - **First pair wins** (defined nested/duplicate-marker behavior, per
 *    Task 16.4's brief): extraction matches the FIRST `begin` marker and
 *    the FIRST `end` marker that follows it. A second `begin`/`end` pair
 *    appearing later in the file is left untouched, inside the returned
 *    `after` bytes — it is never read as a second region. A `begin`
 *    appearing again INSIDE the matched region (before the matched `end`)
 *    is treated as ordinary region content, not as a nested marker.
 *  - An absent `begin`, an absent `end`, or an `end` with no preceding
 *    `begin` are all the same outcome: "missing markers".
 *  - **CRLF/LF**: the end-of-line style used for the two newlines the
 *    splice introduces (after `begin`, before `end`) is detected from the
 *    file's OUTSIDE bytes (the text before the matched `begin` plus the
 *    text from the matched `end` onward) — never from the region being
 *    replaced — so re-splicing is idempotent and never flips a CRLF file
 *    to LF (or vice versa) by way of its own prior contents.
 */

import { managedRegionMarkersMissingMessage } from '../shared/errorCatalog';

/** A begin/end marker PAIR, as literal line text (no trailing newline). */
export interface RegionMarkers {
  /** The exact text of the region's opening marker line, e.g. `<!-- designerpunk:managed:begin -->`. */
  begin: string;
  /** The exact text of the region's closing marker line, e.g. `<!-- designerpunk:managed:end -->`. */
  end: string;
}

/** A comment syntax a target file's language uses for a single marker line. */
export interface CommentSyntax {
  /** Opens the comment (and the whole marker line), e.g. `<!--` or `#`. */
  open: string;
  /** Closes the comment, when the syntax wraps (e.g. `-->`). Omit for line comments (e.g. `#`). */
  close?: string;
}

/** `CLAUDE.md`'s comment syntax (HTML-style wrapping comment). */
export const CLAUDE_MD_COMMENT: CommentSyntax = { open: '<!--', close: '-->' };

/** `.gitignore`'s comment syntax (line comment, no closer). */
export const GITIGNORE_COMMENT: CommentSyntax = { open: '#' };

/**
 * Build the begin/end marker pair for a given comment syntax and region
 * label (default `managed`, the one DesignerPunk region today — C7 names
 * `CLAUDE.md` and `.gitignore` as the two text-grain managed surfaces; a
 * second label is available for a future second region in the same file).
 */
export function regionMarkers(syntax: CommentSyntax, label = 'managed'): RegionMarkers {
  const begin = `designerpunk:${label}:begin`;
  const end = `designerpunk:${label}:end`;
  return syntax.close
    ? { begin: `${syntax.open} ${begin} ${syntax.close}`, end: `${syntax.open} ${end} ${syntax.close}` }
    : { begin: `${syntax.open} ${begin}`, end: `${syntax.open} ${end}` };
}

export type RegionExtraction =
  | { found: true; before: string; region: string; after: string }
  | { found: false };

export type SpliceResult = { ok: true; text: string } | { ok: false; message: string };

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Non-greedy: the FIRST `begin`, then the FIRST `(eol)end` that follows it. */
function buildRegionRegex(markers: RegionMarkers): RegExp {
  return new RegExp(`${escapeRegExp(markers.begin)}(\\r\\n|\\n)([\\s\\S]*?)(\\r\\n|\\n)${escapeRegExp(markers.end)}`);
}

/** CRLF if the sample contains any `\r\n`, else LF. Scope the sample to OUTSIDE bytes for idempotency. */
function detectEol(sample: string): '\r\n' | '\n' {
  return sample.includes('\r\n') ? '\r\n' : '\n';
}

/** Strip a single trailing EOL (of either style) from `value`, if present. */
function stripTrailingEol(value: string): string {
  return value.replace(/\r\n$|\n$/, '');
}

/** Normalize every line ending in `value` to `eol` (the new region content is ours to control). */
function normalizeEol(value: string, eol: '\r\n' | '\n'): string {
  return value.replace(/\r\n|\n/g, eol);
}

/**
 * Extract the managed region from `text`. Returns `{ found: false }` on a
 * missing or unmatched marker pair — never throws.
 *
 * **Invariant**: on a match, `before + region + after === text` exactly —
 * `region` carries the content between the begin-marker's line and the
 * end-marker's line, INCLUDING the eol that terminates it (so the split
 * reassembles byte-for-byte with no extra bookkeeping by the caller).
 */
export function extractRegion(text: string, markers: RegionMarkers): RegionExtraction {
  const match = buildRegionRegex(markers).exec(text);
  if (!match) {
    return { found: false };
  }
  const innerStart = match.index + markers.begin.length + match[1].length;
  const endMarkerStart = match.index + match[0].length - markers.end.length;
  return {
    found: true,
    before: text.slice(0, innerStart),
    region: text.slice(innerStart, endMarkerStart),
    after: text.slice(endMarkerStart),
  };
}

/**
 * Replace the managed region's contents with `newContents`. Bytes outside
 * the matched marker pair are byte-identical to `text` on success.
 *
 * On a missing or unmatched marker pair, returns `{ ok: false, message }`
 * carrying the exact loud-failure catalog string for `file` — the caller
 * must not write in that case (this function never does I/O itself).
 */
export function spliceRegion(text: string, markers: RegionMarkers, newContents: string, file: string): SpliceResult {
  const match = buildRegionRegex(markers).exec(text);
  if (!match) {
    return { ok: false, message: managedRegionMarkersMissingMessage(file) };
  }

  const beginMarkerEnd = match.index + markers.begin.length;
  const endMarkerStart = match.index + match[0].length - markers.end.length;
  const before = text.slice(0, beginMarkerEnd); // … up to and including `begin`
  const after = text.slice(endMarkerStart); // `end` through EOF

  const eol = detectEol(before + after);
  const body = stripTrailingEol(normalizeEol(newContents, eol));
  const inner = body.length > 0 ? `${eol}${body}${eol}` : `${eol}${eol}`;

  return { ok: true, text: `${before}${inner}${after}` };
}
