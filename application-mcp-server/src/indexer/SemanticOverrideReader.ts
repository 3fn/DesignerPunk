/**
 * Semantic Override Reader
 *
 * Reads a theme's `SemanticOverrides.ts` AS TEXT and extracts both the Level 2 override
 * KEYS and the override VALUES (each entry's `primitiveReferences` map).
 *
 * WHY TEXT PARSING (design constraint, inherited from ModeClassifier)
 * -------------------------------------------------------------------
 * The Application MCP must not couple to the token pipeline: it cannot import
 * `src/tokens/themes/**` (TS source outside its rootDir, compiled by a different tsconfig,
 * and absent from some consumer installs). ModeClassifier established the text-parse
 * approach for override KEYS; this module generalises it so the SAME parse also yields the
 * referenced primitive names — which is what `get_token_details` needs to report a token's
 * DARK resolution instead of silently reporting the light one.
 *
 * KEY EXTRACTION PARITY
 * ---------------------
 * `KEY_PATTERN` below is byte-identical to the regex ModeClassifier used before this module
 * existed. ModeClassifier now consumes this reader, so its classification key set is
 * unchanged by construction. The VALUE extraction is a separate, brace-balanced scan — a
 * fragile `[^{}]*` inner match would silently drop any entry whose refs object ever nests.
 *
 * PARSE COVERAGE (documented limitation)
 * --------------------------------------
 * Only string-literal refs are captured (`value: 'gray400'`, `color: 'gray500'`). A ref
 * expressed as anything other than a single-quoted literal (a computed expression, a
 * template literal, a nested object) is not captured; the entry's key is still returned, and
 * its refs map will be missing that pair. Today every entry in every theme file is a flat
 * map of single-quoted literals.
 *
 * @see .kiro/issues/2026-09-12-mcp-token-details-dark-value-stale.md
 * @see application-mcp-server/src/indexer/ModeClassifier.ts (key-extraction consumer)
 */

import * as fs from 'fs';

/** A parsed override entry: token name → its theme-specific `primitiveReferences` map. */
export type OverrideRefs = Record<string, string>;

export interface SemanticOverrideParseResult {
  /** Token name → primitiveReferences for that token in this theme. Insertion-ordered. */
  overrides: Map<string, OverrideRefs>;
  /** True when the file was found and read. False → `overrides` is empty for that reason. */
  fileFound: boolean;
}

/**
 * Matches an override entry key in the exported map: `'token.name': { primitiveReferences:`
 * Byte-identical to ModeClassifier's original key regex (line-anchored, multiline) so that
 * routing key extraction through this module cannot change the classified key set.
 */
const KEY_PATTERN = /^\s*'([^']+)':\s*\{\s*primitiveReferences:/gm;

/** Matches `key: 'value'` / `'key': 'value'` pairs inside an extracted refs block. */
const REF_PAIR_PATTERN = /(?:'([^']+)'|([A-Za-z_$][\w$]*))\s*:\s*'([^']*)'/g;

/**
 * Extract the brace-balanced text of the object that starts at `openIndex` (which must be the
 * index of its `{`). Returns the INNER text, or null when braces are unbalanced.
 */
function extractBalancedBlock(content: string, openIndex: number): string | null {
  if (content[openIndex] !== '{') return null;
  let depth = 0;
  for (let i = openIndex; i < content.length; i++) {
    const ch = content[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return content.slice(openIndex + 1, i);
    }
  }
  return null;
}

/** Parse a refs block (`value: 'gray400'` / `color: 'gray500', opacity: 'opacity048'`). */
function parseRefs(block: string): OverrideRefs {
  const refs: OverrideRefs = {};
  REF_PAIR_PATTERN.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = REF_PAIR_PATTERN.exec(block)) !== null) {
    const key = match[1] ?? match[2];
    refs[key] = match[3];
  }
  return refs;
}

/**
 * Parse a theme's SemanticOverrides.ts. Never throws — a missing or unreadable file yields an
 * empty map with `fileFound: false` so callers can distinguish "no overrides" from "no file".
 */
export function parseSemanticOverrides(overridesPath: string): SemanticOverrideParseResult {
  const overrides = new Map<string, OverrideRefs>();
  if (!fs.existsSync(overridesPath)) return { overrides, fileFound: false };

  let content: string;
  try {
    content = fs.readFileSync(overridesPath, 'utf-8');
  } catch {
    return { overrides, fileFound: false };
  }

  KEY_PATTERN.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = KEY_PATTERN.exec(content)) !== null) {
    const name = match[1];
    // The refs object opens at the first '{' after the matched `primitiveReferences:` label.
    const braceIndex = content.indexOf('{', match.index + match[0].length - 1);
    const block = braceIndex === -1 ? null : extractBalancedBlock(content, braceIndex);
    overrides.set(name, block === null ? {} : parseRefs(block));
  }

  return { overrides, fileFound: true };
}
