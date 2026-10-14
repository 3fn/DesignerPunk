/**
 * Versioned tokenizer ATOM list for `find_components` keyword discovery (components twin).
 *
 * OWNERSHIP: components domain (Lina), beside `termNormalization.ts`. Record:
 * `.kiro/issues/2026-10-13-discovery-study-stage1-followups.md`, row 11.
 *
 * BOUND TWIN OF: `mcp-server/src/query/token-atoms.ts` (docs domain, Thurgood; #325).
 * Ruling: Peter, 2026-10-13 (tokenizer-twin extraction consult, Option A with the split): the
 * atom list stays a local twin, NOT a shared import, and it is BOUND to the docs list. Atoms are
 * a tokenizer-correctness fact (how brand-cased words split), not a rubric-tuned knob, so the
 * two surfaces must agree exactly. The binding is mechanical, in `__tests__/tokenAtoms.test.ts`,
 * which `require`s the REAL docs module (TS source via ts-jest) and asserts:
 *   - `TOKEN_ATOMS` exactly equals the docs `TOKEN_ATOMS`;
 *   - `TWINNED_DOCS_TOKEN_ATOM_LIST_VERSION` (below) equals the docs `TOKEN_ATOM_LIST_VERSION`;
 *   - `protectAtoms` here and there produce identical output on a shared fixture.
 * PIN RULE: when the docs list changes, this suite fails (lane-application-mcp-server-suite runs on
 * every PR) until this file is brought into step: copy the change, bump
 * `COMPONENT_TOKEN_ATOM_LIST_VERSION`, and set the pin to the new docs version.
 * Why a twin and not an import: the sub-package tsc rootDir boundary. Where shared MCP code
 * should live is the class question taken up by the MCP shared-code class charter
 * (Thurgood, `.kiro/issues/`, 2026-10-13) — not decided here.
 *
 * HOW THIS TWIN DIFFERS FROM THE DOCS FILE:
 *   - The atom LIST and the protect-before-split mechanism are identical (v1, same seven atoms).
 *   - The components tokenizer also FOLDS PLURALS (`termNormalization.ts`); an atom ending in `s`
 *     (ipados, macos, tvos, watchos) would otherwise fold to `ipado` / `maco` / `tvo` / `watcho`.
 *     `ATOM_TERMS` (the lowercased atoms) is exempted from the fold so the emitted
 *     `matchedOn.term` stays legible. The docs side has no plural folding, so it needs no exemption.
 *
 * THE DEFECT: `tokenizeString` splits camelCase (`contentDescription` → content + description),
 * which also split brand-cased platform names: metadata "iOS" became `i` + `os` (`i` is a
 * components stop word, so `os` alone leaked into the index), while a query's lowercase "ios"
 * stayed one token — so "ios" could never match "iOS".
 *
 * THE FIX: these atoms are lowercased in place BEFORE the camelCase split, on indexed text AND the
 * query alike (both go through `tokenizeString`), so each stays one token. Any other camelCase
 * word still splits as before.
 *
 * LEGIBLE KNOB: adding an atom predictably changes how one brand-cased word tokenizes. Bump
 * `COMPONENT_TOKEN_ATOM_LIST_VERSION` and add a CHANGELOG entry on every change.
 *
 * CHANGELOG:
 *   v1 (2026-10-13, follow-ups row 11): iOS, iPadOS, macOS, tvOS, watchOS, iPhone, iPad
 *       (verbatim docs v1 list).
 *   v1, no list change (2026-10-13, Peter's ruling): bound-twin guard + TWINNED_DOCS pin added.
 */

/** Version of the components atom list. Bump on any change to TOKEN_ATOMS. */
export const COMPONENT_TOKEN_ATOM_LIST_VERSION = 1;

/**
 * The docs `TOKEN_ATOM_LIST_VERSION` this twin is bound to (pin rule in the header). Asserted
 * equal to the docs version by the bound-twin guard; set it only when the list matches that version.
 */
export const TWINNED_DOCS_TOKEN_ATOM_LIST_VERSION = 1;

/** Brand-cased words that must never be camelCase-split. Frozen; the version is the change path. */
export const TOKEN_ATOMS: readonly string[] = Object.freeze([
  'iOS', 'iPadOS', 'macOS', 'tvOS', 'watchOS', 'iPhone', 'iPad',
]);

/** The atoms as they appear after tokenization (lowercased) — exempt from plural folding. */
export const ATOM_TERMS: ReadonlySet<string> = Object.freeze(
  new Set<string>(TOKEN_ATOMS.map(a => a.toLowerCase())),
) as ReadonlySet<string>;

// Longest first, so iPadOS wins over iPad. Case-insensitive; not inside a longer word on either side.
const ATOM_PATTERN = new RegExp(
  `(?<![A-Za-z])(${[...TOKEN_ATOMS].sort((a, b) => b.length - a.length).join('|')})(?![A-Za-z])`,
  'gi',
);

/** Lowercase every atom occurrence in place, so the camelCase split that follows cannot divide it. */
export function protectAtoms(text: string): string {
  return text.replace(ATOM_PATTERN, (m) => m.toLowerCase());
}
