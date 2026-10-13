/**
 * Term normalization for `find_components` keyword discovery — stop words + plural folding.
 *
 * Fixes items 1 and 2 of `.kiro/issues/2026-10-07-find-components-lexical-and-metadata-defects.md`
 * (Stage 0, fork F1 authorized by Peter 2026-10-12). Applied SYMMETRICALLY: the indexer
 * normalizes every field it tokenizes, and the query engine normalizes the query, so a
 * fold or a dropped word can never make the two sides disagree.
 *
 * ---------------------------------------------------------------------------
 * STOP WORDS — copied, not imported
 * ---------------------------------------------------------------------------
 * SOURCE: `mcp-server/src/query/stop-words.ts` (docs domain, Thurgood), `STOP_WORD_LIST_VERSION = 1`.
 * That module invites the application MCP to consume its list "as data"; it is copied here
 * rather than imported because a static TS import would cross this sub-package's tsc rootDir
 * boundary (the same constraint documented for `mcpDataRoots` in `src/index.ts`). The
 * docs-v1 block below is a VERBATIM copy and must be kept in step with the source by hand —
 * if the docs list bumps its version, re-copy and bump `COMPONENT_STOP_WORD_LIST_VERSION`.
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

/** VERBATIM copy of `mcp-server/src/query/stop-words.ts` STOP_WORDS (docs list v1). */
const DOCS_STOP_WORDS_V1: readonly string[] = [
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
  new Set<string>([...DOCS_STOP_WORDS_V1, ...COMPONENT_STOP_WORDS_EXTENSION]),
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
