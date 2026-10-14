/**
 * Versioned tokenizer ATOM list (indexer fix 3, 2026-10-13)
 *
 * OWNERSHIP: docs domain (Thurgood), beside the stop-word list (stop-words.ts). Issue:
 * .kiro/issues/2026-10-13-find-docs-indexer-defects-from-stage1.md, defect 3.
 *
 * THE DEFECT: find_docs' tokenizer splits camelCase (`contentDescription` → content + description),
 * which also split brand-cased platform names: doc text "iOS" became `i` + `os`, while a query's
 * lowercase "ios" stayed one token — so "ios" could never match "iOS", and the stray `i` / `os`
 * tokens produced spurious hits (Stage 1 ST-N2).
 *
 * THE FIX: these atoms are lowercased in place BEFORE the camelCase split, on indexed text AND the
 * query alike (both go through the same tokenizer), so each stays one token: iOS → `ios`,
 * iPadOS → `ipados`, iPhone → `iphone`. Any other camelCase word still splits as before.
 *
 * LEGIBLE KNOB: adding an atom predictably changes how one brand-cased word tokenizes. Bump
 * `TOKEN_ATOM_LIST_VERSION` and add a CHANGELOG entry on every change.
 *
 * BOUND, GUARDED TWIN (Peter, 2026-10-13): `application-mcp-server/src/indexer/tokenAtoms.ts`
 * (components domain, Lina; #328) carries the same list and `protectAtoms`. Its guards (#340) load
 * THIS module and assert list equality, `TWINNED_DOCS_TOKEN_ATOM_LIST_VERSION` ===
 * `TOKEN_ATOM_LIST_VERSION`, and `protectAtoms` parity — so any change here must bump
 * `TOKEN_ATOM_LIST_VERSION` and lands only with Lina's same-PR edit to her twin and pin.
 * Charter: `.kiro/issues/2026-10-13-mcp-shared-code-class-charter.md`. Sibling: `stop-words.ts`
 * (stop words are a SEEDED FORK on the components side, not a bound twin).
 *
 * CHANGELOG:
 *   v1 (2026-10-13, indexer fix 3): iOS, iPadOS, macOS, tvOS, watchOS, iPhone, iPad.
 *   (2026-10-13, header only — NO version bump, list unchanged): twin note rewritten for the
 *       bound-twin ruling (charter § 1 and § 6).
 */

/** Version of the atom list. Bump on any change to TOKEN_ATOMS. */
export const TOKEN_ATOM_LIST_VERSION = 1;

/** Brand-cased words that must never be camelCase-split. Frozen; the version is the change path. */
export const TOKEN_ATOMS: readonly string[] = Object.freeze([
  'iOS', 'iPadOS', 'macOS', 'tvOS', 'watchOS', 'iPhone', 'iPad',
]);

// Longest first, so iPadOS wins over iPad. Case-insensitive; not inside a longer word on either side.
const ATOM_PATTERN = new RegExp(
  `(?<![A-Za-z])(${[...TOKEN_ATOMS].sort((a, b) => b.length - a.length).join('|')})(?![A-Za-z])`,
  'gi',
);

/** Lowercase every atom occurrence in place, so the camelCase split that follows cannot divide it. */
export function protectAtoms(text: string): string {
  return text.replace(ATOM_PATTERN, (m) => m.toLowerCase());
}
