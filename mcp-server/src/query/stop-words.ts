/**
 * Versioned stop-word list module (Spec 121, Req 6.7, Decision 3)
 *
 * OWNERSHIP: docs domain (Thurgood). The docs `find_docs` rubric is the one that
 * gates the `partial`/`none` tier line on "zero salient-token matches **after
 * stop-word + common-term normalization**" (discovery-confidence-rubric.md, Docs
 * rubric). Centralizing the list here keeps that tier boundary from drifting
 * silently across tools. The application MCP MAY consume `STOP_WORDS` as **data**
 * (not logic) so the two discovery surfaces share one normalization vocabulary.
 *
 * LEGIBLE KNOB, NOT AN OPAQUE WEIGHT (Req 6.7): this list is a tunable knob.
 * Adding/removing a term predictably moves queries between tiers — a query whose
 * only salient token becomes a stop word drops from `partial`/`strong` to `none`;
 * removing a stop word can lift a query from `none` to `partial`. Because the
 * effect is a visible set-membership change (not a hidden float), the tier shift
 * is reconstructable by inspection.
 *
 * VERSIONING: bump `STOP_WORD_LIST_VERSION` and add a CHANGELOG entry on every
 * change so the `partial`/`none` boundary has an auditable history. The version is
 * emitted/queryable as data; do not edit the set without bumping the version.
 *
 * CHANGELOG:
 *   v1 (2026-06-23, Spec 121 Task 5.1): initial extraction. Seeded from the
 *       inline `FIND_DOCS_STOP_WORDS` set that shipped in Task 3's QueryEngine
 *       (closed-class function words: articles, conjunctions, prepositions,
 *       auxiliaries, common interrogatives/quantifiers). No terms added or
 *       removed vs. the Task-3 inline set — pure relocation + versioning, so the
 *       `partial`/`none` line is unchanged by the extraction itself.
 */

/** Semantic version of the stop-word list. Bump on any change to STOP_WORDS. */
export const STOP_WORD_LIST_VERSION = 1;

/**
 * Closed-class function words that carry no match signal.
 *
 * These are filtered out of BOTH the query tokens and the coverage denominator,
 * so the docs rubric's "salient query tokens" = tokens remaining after this set
 * (and common-term normalization) is applied.
 *
 * Frozen at module load so a downstream consumer cannot silently mutate the
 * shared vocabulary (the version constant is the only sanctioned change path).
 */
export const STOP_WORDS: ReadonlySet<string> = Object.freeze(
  new Set<string>([
    'a', 'an', 'the', 'and', 'or', 'of', 'in', 'on', 'at', 'to', 'for',
    'is', 'are', 'was', 'be', 'by', 'with', 'this', 'that', 'from', 'as',
    'it', 'its', 'all', 'any', 'each', 'if', 'not', 'no', 'but', 'so',
    'do', 'how', 'when', 'which', 'who', 'will', 'can', 'has', 'have',
    'had', 'may', 'per', 'via', 'vs', 'etc',
  ]),
) as ReadonlySet<string>;

/**
 * Is a single (already-lowercased) term a stop word?
 *
 * Centralized predicate so both the docs tokenizer and any consuming surface
 * (e.g. the application MCP) gate on the identical vocabulary.
 */
export function isStopWord(term: string): boolean {
  return STOP_WORDS.has(term);
}

/**
 * Filter a token list down to its salient terms (drop stop words + empties).
 *
 * The returned array is the rubric's "salient query tokens" — and crucially its
 * length is the **coverage denominator** used to derive `matchConfidence`
 * (≥~50% salient-token coverage). Tokens passed in are expected to be already
 * lowercased / punctuation-stripped by the caller's tokenizer.
 */
export function filterSalientTokens(tokens: string[]): string[] {
  return tokens.filter((t) => t.length > 0 && !STOP_WORDS.has(t));
}
