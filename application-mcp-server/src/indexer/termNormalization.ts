/**
 * Term normalization for `find_components` keyword discovery — stop words + plural folding.
 *
 * Fixes items 1 and 2 of `.kiro/issues/2026-10-07-find-components-lexical-and-metadata-defects.md`
 * (Stage 0, fork F1 authorized by Peter 2026-10-12). Applied SYMMETRICALLY: the indexer
 * normalizes every field it tokenizes, and the query engine normalizes the query, so a
 * fold or a dropped word can never make the two sides disagree.
 *
 * ---------------------------------------------------------------------------
 * STOP WORDS — a SEEDED FORK of the docs list (owned here in full)
 * ---------------------------------------------------------------------------
 * ORIGIN: `mcp-server/src/query/stop-words.ts` (docs domain, Thurgood), `STOP_WORD_LIST_VERSION = 1`.
 * Ruling: Peter, 2026-10-13 (tokenizer-twin extraction consult, Option A with the split): this
 * list is NOT a twin of the docs list. It was seeded from docs v1 (the `SEEDED_FROM_DOCS_V1` block
 * below, verbatim at seeding time) and the components domain owns the WHOLE list from here on,
 * because a stop list is a rubric-tuned knob and the two rubrics differ (see COMPONENTS
 * EXTENSION). Consequences, by design:
 *   - A docs-side REMOVAL or addition is NOT drift. Nothing asserts that the two lists match.
 *   - REVIEW PIN: `REVIEWED_DOCS_STOP_WORD_LIST_VERSION` records the last docs version reviewed
 *     here. `__tests__/termNormalization.test.ts` `require`s the REAL docs module and asserts the
 *     pin equals the docs `STOP_WORD_LIST_VERSION`, so a docs bump fails
 *     lane-application-mcp-server-suite (every PR) until this side reviews the change and moves
 *     the pin, WHETHER OR NOT the change is taken. Taking it = edit the list, bump
 *     `COMPONENT_STOP_WORD_LIST_VERSION`, add a CHANGELOG line. Declining it = move the pin only and
 *     record the decision in the CHANGELOG. Either way the review is visible in the diff.
 *   - Why a local list and not an import: the sub-package tsc rootDir boundary (same constraint
 *     as `mcpDataRoots` in `src/index.ts`). Where shared MCP code should live is the class
 *     question taken up by the MCP shared-code class charter (Thurgood, `.kiro/issues/`,
 *     2026-10-13) — not decided here.
 *
 * COMPONENTS EXTENSION — why a components-specific addition is justified:
 * the components rubric makes a SINGLE high-signal hit `strong` (rubric clause 1), while the
 * docs rubric needs ≥~50% salient coverage. A function word that lands in a high-signal field
 * (`purpose`) therefore manufactures a false `strong` here in a way it cannot on the docs side,
 * so the components surface needs the closed class covered more completely. The extension is
 * limited to CLOSED-CLASS function words (non-spatial prepositions, subordinating
 * conjunctions, pronouns/determiners). Spatial prepositions (above, below, over, under,
 * inside, behind, near, …) are deliberately NOT stop words: in a UI vocabulary they carry
 * layout meaning ("label above field", "badge over avatar").
 * Evidence in the defect record: `between` (row 7 — Avatar-Base `strong` at rank 2), `off`
 * (row 2 — paired with `on`, already a docs stop word), `while` (row 5), `through` (row 6).
 *
 * LEGIBLE KNOB (rubric "Tunability"): adding/removing a term predictably moves queries between
 * tiers. Bump `COMPONENT_STOP_WORD_LIST_VERSION` and add a CHANGELOG line on every change.
 *
 * CHANGELOG:
 *   v1 (2026-10-12, defect record 2026-10-07 item 1): docs v1 list copied verbatim + the
 *       closed-class components extension below.
 *   v1, no list change (2026-10-13, Peter's ruling): re-declared a seeded fork; docs v1 reviewed
 *       (REVIEWED_DOCS_STOP_WORD_LIST_VERSION = 1); the superset drift guard is replaced by the pin.
 *
 * ---------------------------------------------------------------------------
 * PLURAL FOLDING — a suffix rule with an exceptions list, NOT a stemmer
 * ---------------------------------------------------------------------------
 * A stemmer (Porter et al.) conflates far more than number — `navigation`/`navigate`,
 * `selection`/`select`, `validation`/`validate`, `container`/`contain` — and those
 * distinctions are load-bearing in a component vocabulary (`Nav-SegmentedChoice` vs
 * "selection" contracts). Folding ONLY regular English plurals is the smallest change that
 * fixes `tabs` ≠ `tab` (defect row 3). Rules, in order:
 *   1. length ≤ 3, or listed in NON_PLURAL_S          → unchanged (`bus`, `status`, `canvas`)
 *   2. ends in `ss`, `is`                             → unchanged (`class`, `progress`, `axis`)
 *   3. ends in `ies` (length > 4)                     → `y`      (`entries` → `entry`)
 *   4. ends in `ches|shes|xes|sses`                   → drop `es` (`switches` → `switch`, `boxes` → `box`)
 *   5. ends in `s`                                    → drop `s`  (`tabs` → `tab`, `errors` → `error`)
 * Because normalization is symmetric, an imperfect fold (`cookies` → `cooky`) costs nothing it
 * did not already cost; the exceptions list exists only to stop CONFLATION of distinct words
 * (`news` ≠ `new`) and to keep the emitted `matchedOn.term` legible (`status`, not `statu`).
 * `matchedOn.term` carries the NORMALIZED (folded) term — that is the term that matched.
 */

import { ATOM_TERMS } from './tokenAtoms';

/** Semantic version of the components stop-word list. Bump on any change to the set. */
export const COMPONENT_STOP_WORD_LIST_VERSION = 1;

/**
 * The last docs `STOP_WORD_LIST_VERSION` reviewed on this side (review pin — see header). Moving it
 * records a review, not agreement: the docs change may have been declined.
 */
export const REVIEWED_DOCS_STOP_WORD_LIST_VERSION = 1;

/**
 * SEEDED ORIGIN: the docs list v1 (`mcp-server/src/query/stop-words.ts`), copied verbatim at seeding
 * time. Owned here from then on — it is not kept in step with the docs list (see header).
 */
const SEEDED_FROM_DOCS_V1: readonly string[] = [
  'a', 'an', 'the', 'and', 'or', 'of', 'in', 'on', 'at', 'to', 'for',
  'is', 'are', 'was', 'be', 'by', 'with', 'this', 'that', 'from', 'as',
  'it', 'its', 'all', 'any', 'each', 'if', 'not', 'no', 'but', 'so',
  'do', 'how', 'when', 'which', 'who', 'will', 'can', 'has', 'have',
  'had', 'may', 'per', 'via', 'vs', 'etc',
];

/** Components extension — closed-class, non-spatial function words (see header). */
const COMPONENT_STOP_WORDS_EXTENSION: readonly string[] = [
  // non-spatial prepositions / particles
  'about', 'after', 'before', 'between', 'during', 'into', 'off', 'onto', 'than',
  'through', 'throughout', 'until', 'upon', 'within', 'without',
  // conjunctions / subordinators
  'although', 'because', 'though', 'unless', 'whether', 'while', 'nor', 'yet', 'then',
  // pronouns / determiners / auxiliaries
  'i', 'me', 'my', 'we', 'our', 'you', 'your', 'they', 'them', 'their', 'these', 'those',
  'what', 'where', 'why', 'were', 'been', 'being', 'does', 'did', 'should', 'would', 'could', 'must',
];

export const COMPONENT_STOP_WORDS: ReadonlySet<string> = Object.freeze(
  new Set<string>([...SEEDED_FROM_DOCS_V1, ...COMPONENT_STOP_WORDS_EXTENSION]),
) as ReadonlySet<string>;

/** Words ending in `s` that are not regular plurals (or whose fold would conflate/obscure). */
export const NON_PLURAL_S: ReadonlySet<string> = Object.freeze(
  new Set<string>([
    'status', 'focus', 'radius', 'bonus', 'plus', 'minus', 'corpus', 'canvas', 'alias',
    'atlas', 'news', 'series', 'species', 'analytics', 'always', 'perhaps', 'whereas', 'thus',
    'lens', 'ios',
  ]),
) as ReadonlySet<string>;

export function isComponentStopWord(term: string): boolean {
  return COMPONENT_STOP_WORDS.has(term);
}

/** Fold a regular English plural to its singular (conservative suffix rule — see header). */
export function foldPlural(term: string): string {
  // Tokenizer atoms (ipados, macos, tvos, watchos) are never plurals — `tokenAtoms.ts`.
  if (term.length <= 3 || NON_PLURAL_S.has(term) || ATOM_TERMS.has(term)) return term;
  if (term.endsWith('ss') || term.endsWith('is')) return term;
  if (term.endsWith('ies') && term.length > 4) return term.slice(0, -3) + 'y';
  if (/(ch|sh|x|ss)es$/.test(term)) return term.slice(0, -2);
  if (term.endsWith('s')) return term.slice(0, -1);
  return term;
}

/**
 * Normalize already-tokenized (lowercased) terms: drop stop words, fold plurals, drop empties.
 * Stop words are checked BEFORE folding (so `its`/`this` never reach the fold) and the fold's
 * output is checked again (a fold can never produce a stop word that then matches).
 */
export function normalizeTerms(tokens: string[]): string[] {
  const out: string[] = [];
  for (const t of tokens) {
    if (!t || COMPONENT_STOP_WORDS.has(t)) continue;
    const folded = foldPlural(t);
    if (!folded || COMPONENT_STOP_WORDS.has(folded)) continue;
    out.push(folded);
  }
  return out;
}
