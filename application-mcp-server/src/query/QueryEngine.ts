/**
 * Component Query Engine
 *
 * Wraps ComponentIndexer with query logic, metrics, and error handling.
 * Provides capability discovery (by category, concept, platform, purpose)
 * and progressive disclosure (catalog → summary → full).
 *
 * @see .kiro/specs/064-component-metadata-schema/design.md — Requirements 3.1–3.6
 */

import { ComponentIndexer, tokenizeForMatch } from '../indexer/ComponentIndexer';
import { checkComposition, validateRequires, RequiresValidationResult } from '../indexer/CompositionChecker';
import {
  ComponentMetadata,
  ComponentCatalogEntry,
  ComponentSummary,
  ApplicationSummary,
  CompositionResult,
  IndexHealth,
  QueryResult,
  ExperiencePattern,
  PatternCatalogEntry,
  PropGuidanceResponse,
  LayoutTemplate,
  LayoutTemplateCatalogEntry,
} from '../models';

/**
 * Evidence entry for keyword matching — records which signal class a matched term came from.
 * Feeds Task 5's tier derivation + Layer-3 rank (Task 2.2, Spec 121).
 * matchedOn is additive to ApplicationSummary — back-compat (Req 1.7).
 */
export interface MatchedOnEntry {
  /** Signal class: 'highSignal' | 'lowSignal' | 'aliases' */
  field: 'highSignal' | 'lowSignal' | 'aliases';
  /** The matched term (lowercased) */
  term: string;
}

/**
 * Layer-1 Match tier (Spec 121 Req 6 / discovery-confidence-rubric.md).
 * A graded TIER, not an opaque score — reconstructable from matchedOn + coverage.
 * Lexically distinct from token `resolutionDepth: 'partial'` (Layer 2) — never collapse a bare `partial`.
 */
export type MatchConfidence = 'strong' | 'partial' | 'none';

/**
 * The three-layer discovery-confidence signal emitted on keyword-discovery results.
 * ADDITIVE to ApplicationSummary — rides only on keyword-discovery results (Req 6.8, back-compat).
 *
 *  - Layer 1 (Match):     matchConfidence (this object) + matchedOn (on the summary)
 *  - Layer 2 (Viability): readiness — already carried on ApplicationSummary; surfaced as the distinct gate
 *  - Layer 3 (Usability): rank (ordinal) + matchedOn (auditability)
 *
 * matchConfidence ≠ readiness ≠ rank — three distinct fields, never collapsed (§Collision).
 */
export interface DiscoveryConfidenceSignal {
  /** Layer 1 — Match tier, derived by the Components rubric from visible evidence. */
  matchConfidence: MatchConfidence;
  /** Layer 3 — ordinal rank within the result set (1-based; lower = stronger/better-covered). */
  rank: number;
}

/**
 * The component identity the tier rule reads: the row's own `name` and `family`, exactly as
 * emitted on every keyword row (so the tier stays recomputable from emitted evidence, P5).
 */
export interface ComponentIdentity {
  name: string;
  family: string;
}

/**
 * Components Layer-1 rubric (discovery-confidence-rubric.md → "Components — find_components (Lina)").
 *
 * Derives the match TIER purely from the emitted evidence (matchedOn + coverage + the row's own
 * name and family), so an auditor can recompute it without trusting the label (Req 6.2 / P5).
 *
 * Tier rule — R3, "names beat purpose" (rubric amendment 2026-10-17; pre-registered and accepted
 * by the components calibration instrument, `.kiro/docs/components-calibration-findings.md`):
 *   - `strong`  = at least one high-signal-field hit, AND either
 *                 (i)  a matched query token is a token of the component's own `name` or its
 *                      `family`, or
 *                 (ii) at least two salient query tokens matched, and they are more than half of
 *                      the salient query tokens.
 *   - `partial` = any other match (a lone `purpose` / concept-suffix hit without (ii)'s support,
 *                 the single-low-signal-token case, low-signal-only coverage).
 *   - `none`    = zero tokens matched.
 *
 * Signal-class gate (unchanged): low-signal-ONLY coverage (e.g. two tokens both landing in a
 * shared `contexts` value like `onboarding-flows`) caps at `partial`, never `strong`.
 *
 * `aliases` are reactive true-synonym divergences (Req 1.9), treated as low-signal for tiering:
 * they never lift a match to `strong` on their own.
 *
 * Name / family tokens use the matcher's own normalization (`tokenizeForMatch`). Name and family
 * are always high-signal fields, so a (i) hit is itself a high-signal hit.
 *
 * @param matchedOn     signal-class-labeled evidence for the candidate (the matched terms)
 * @param matchedTokens count of distinct query tokens that matched any field
 * @param totalTokens   total salient query tokens (coverage denominator)
 * @param identity      the row's own `name` and `family` (as emitted)
 */
export function deriveMatchConfidence(
  matchedOn: MatchedOnEntry[],
  matchedTokens: number,
  totalTokens: number,
  identity: ComponentIdentity
): MatchConfidence {
  if (matchedTokens === 0) return 'none';

  // The signal-class gate: no high-signal field → `partial`, whatever the coverage.
  if (!matchedOn.some(e => e.field === 'highSignal')) return 'partial';

  // (i) the anchor: a matched term is a token of the component's own name or family.
  const anchor = new Set([...tokenizeForMatch(identity.name), ...tokenizeForMatch(identity.family)]);
  if (matchedOn.some(e => anchor.has(e.term))) return 'strong';

  // (ii) support: ≥ 2 salient tokens matched, and more than half of the query.
  if (matchedTokens >= 2 && matchedTokens / totalTokens > 0.5) return 'strong';

  // A lone `purpose` / concept-suffix hit without support → `partial` (names beat purpose).
  return 'partial';
}

/** Tier order for ranking: strong ahead of partial ahead of none. */
const TIER_ORDER: Record<MatchConfidence, number> = { strong: 0, partial: 1, none: 2 };

/** The rank-relevant evidence of one keyword-discovery row. */
export interface RankKey {
  name: string;
  matchConfidence: MatchConfidence;
  /** matchedTokens / totalTokens */
  coverage: number;
  /** Count of matched query terms that are tokens of the component's OWN name (not family). */
  nameHits: number;
}

/**
 * Layer-3 rank order for `find_components` keyword results — RANK ONLY.
 *
 * Rubric amendment 2026-10-12 (discovery-confidence-rubric.md § Layer 3; Thurgood's ruling,
 * defect record 2026-10-07 item 3). Order:
 *   1. tier          — strong before partial (the rubric already says rank is "within a tier";
 *                      the previous tier-blind sort let a `partial` outrank a `strong`)
 *   2. coverage      — matchedTokens / totalTokens, descending
 *   3. own-name hit  — matched query terms among the component's OWN name tokens, descending.
 *                      Family tokens do not count (a family-only hit ties every sibling).
 *                      Mirrors the docs TITLE_RANK_TIEBREAK precedent: it breaks only ties
 *                      that tier and coverage leave standing.
 *   4. name          — ascending. A FIXED DISPLAY ORDER for genuinely co-equal rows, not a
 *                      relevance judgment (the agent/human breaks those ties — rubric § Layer 3).
 * `deriveMatchConfidence` is untouched: no tier changes, only order.
 */
export function rankCompare(a: RankKey, b: RankKey): number {
  const tier = TIER_ORDER[a.matchConfidence] - TIER_ORDER[b.matchConfidence];
  if (tier !== 0) return tier;
  if (b.coverage !== a.coverage) return b.coverage - a.coverage;
  if (b.nameHits !== a.nameHits) return b.nameHits - a.nameHits;
  return a.name.localeCompare(b.name);
}

/** Count matched query terms that occur among the component's OWN (normalized) name tokens. */
export function countOwnNameHits(componentName: string, matchedOn: MatchedOnEntry[]): number {
  const nameTokens = new Set(tokenizeForMatch(componentName));
  const terms = new Set(matchedOn.map(e => e.term));
  let hits = 0;
  for (const t of terms) if (nameTokens.has(t)) hits++;
  return hits;
}

export class ComponentQueryEngine {
  constructor(private indexer: ComponentIndexer) {}

  getComponent(name: string): QueryResult<ComponentMetadata> {
    const start = Date.now();
    const data = this.indexer.getComponent(name);
    return {
      data,
      error: data ? null : `Component "${name}" not found`,
      // A missing env component root comes first: it can make this answer the package's
      // component, or "not found", for a name the consumer forked (2026-10-24 record, item 5).
      warnings: [...this.indexer.getRootWarnings(), ...(data?.warnings ?? [])],
      metrics: { responseTimeMs: Date.now() - start },
    };
  }

  getCatalog(): QueryResult<ComponentCatalogEntry[]> {
    const start = Date.now();
    const data = this.indexer.getCatalog();
    return {
      data,
      error: null,
      warnings: [],
      metrics: { responseTimeMs: Date.now() - start },
    };
  }

  getComponentSummary(name: string): QueryResult<ComponentSummary> {
    const start = Date.now();
    const meta = this.indexer.getComponent(name);
    if (!meta) {
      return { data: null, error: `Component "${name}" not found`, warnings: this.indexer.getRootWarnings(), metrics: { responseTimeMs: Date.now() - start } };
    }
    const summary: ComponentSummary = {
      name: meta.name,
      type: meta.type,
      family: meta.family,
      readiness: meta.readiness,
      description: meta.description,
      platforms: meta.platforms,
      contractCategories: [...new Set(Object.values(meta.contracts.active).map(c => c.category))],
      contractCount: Object.keys(meta.contracts.active).length,
      tokenCount: meta.tokens.length,
      annotations: meta.annotations,
      internalComponents: meta.composition?.internal.map(c => c.component) ?? [],
      requiredChildren: meta.composition?.children?.requires ?? [],
      inheritsFrom: meta.contracts.inheritsFrom,
    };
    return { data: summary, error: null, warnings: this.indexer.getRootWarnings(), metrics: { responseTimeMs: Date.now() - start } };
  }

  findByCategory(category: string): QueryResult<ComponentSummary[]> {
    const start = Date.now();
    const results: ComponentSummary[] = [];
    for (const meta of this.indexer.getIndex().values()) {
      const hasCategory = Object.values(meta.contracts.active).some(c => c.category === category);
      if (hasCategory) {
        results.push(this.toSummary(meta));
      }
    }
    return { data: results, error: null, warnings: [], metrics: { responseTimeMs: Date.now() - start } };
  }

  findByConcept(concept: string): QueryResult<ComponentSummary[]> {
    const start = Date.now();
    const results: ComponentSummary[] = [];
    for (const meta of this.indexer.getIndex().values()) {
      if (meta.contracts.active[concept]) {
        results.push(this.toSummary(meta));
      }
    }
    return { data: results, error: null, warnings: [], metrics: { responseTimeMs: Date.now() - start } };
  }

  findByPlatform(platform: string): QueryResult<ComponentSummary[]> {
    const start = Date.now();
    const results: ComponentSummary[] = [];
    for (const meta of this.indexer.getIndex().values()) {
      if (meta.platforms.includes(platform)) {
        results.push(this.toSummary(meta));
      }
    }
    return { data: results, error: null, warnings: [], metrics: { responseTimeMs: Date.now() - start } };
  }

  searchByPurpose(keyword: string): QueryResult<ComponentSummary[]> {
    const start = Date.now();
    const lower = keyword.toLowerCase();
    const purposeMatches: ComponentSummary[] = [];
    const descriptionMatches: ComponentSummary[] = [];
    for (const meta of this.indexer.getIndex().values()) {
      const purpose = meta.annotations?.purpose?.toLowerCase() ?? '';
      const desc = meta.description.toLowerCase();
      if (purpose.includes(lower)) {
        purposeMatches.push(this.toSummary(meta));
      } else if (desc.includes(lower)) {
        descriptionMatches.push(this.toSummary(meta));
      }
    }
    const byName = (a: ComponentSummary, b: ComponentSummary) => a.name.localeCompare(b.name);
    const results = [...purposeMatches.sort(byName), ...descriptionMatches.sort(byName)];
    return { data: results, error: null, warnings: [], metrics: { responseTimeMs: Date.now() - start } };
  }

  findComponents(filters: {
    category?: string;
    concept?: string;
    platform?: string;
    purpose?: string;
    context?: string;
    /** NEW (Task 2, Spec 121): free-text tokenized keyword discovery. Does NOT mutate
     *  existing exact-match semantics of category/concept/context (Req 1.5 / Lina R1 P0). */
    keyword?: string;
    /** NEW optional limit (Task 2.3, Spec 121) */
    limit?: number;
  }): QueryResult<(ApplicationSummary & { matchedOn?: MatchedOnEntry[] } & Partial<DiscoveryConfidenceSignal>)[]> {
    const start = Date.now();
    let candidates = Array.from(this.indexer.getIndex().values());

    // --- Existing exact-match filters (semantics UNCHANGED — back-compat) ---
    if (filters.category) {
      candidates = candidates.filter(m =>
        Object.values(m.contracts.active).some(c => c.category === filters.category));
    }
    if (filters.concept) {
      candidates = candidates.filter(m => m.contracts.active[filters.concept!]);
    }
    if (filters.platform) {
      candidates = candidates.filter(m => m.platforms.includes(filters.platform!));
    }
    if (filters.purpose) {
      const lower = filters.purpose.toLowerCase();
      candidates = candidates.filter(m => {
        const purpose = m.annotations?.purpose?.toLowerCase() ?? '';
        const desc = m.description.toLowerCase();
        return purpose.includes(lower) || desc.includes(lower);
      });
    }
    if (filters.context) {
      candidates = candidates.filter(m =>
        m.annotations?.contexts?.includes(filters.context!) ?? false);
    }

    // --- NEW: tokenized keyword filter (Task 2.2, Spec 121) ---
    // Conjunctive with existing filters: keyword + category AND-narrows.
    let keywordEvidence: Map<string, { matchedOn: MatchedOnEntry[]; matchedTokens: number; totalTokens: number }> | null = null;

    if (filters.keyword) {
      // Salient query terms: tokenized, stop words dropped, plurals folded, de-duplicated
      // (defect record 2026-10-07 items 1–2). Their count is the coverage denominator.
      const queryTerms = [...new Set(tokenizeForMatch(filters.keyword))];
      if (queryTerms.length === 0) {
        // A keyword made ONLY of stop words has zero salient terms → the `none` contract.
        // (Before normalization existed this branch was unreachable for non-empty keywords;
        //  falling through would silently drop the keyword filter and return the catalog.)
        return { data: [], error: null, warnings: [], metrics: { responseTimeMs: Date.now() - start } };
      }
      keywordEvidence = new Map();
      const kwIndex = this.indexer.getKeywordIndex();

      candidates = candidates.filter(m => {
        const entry = kwIndex.get(m.name);
        if (!entry) return false;

        const matchedOn: MatchedOnEntry[] = [];
        let matchedCount = 0;

        for (const term of queryTerms) {
          let termMatched = false;

          if (entry.highSignal.has(term)) {
            matchedOn.push({ field: 'highSignal', term });
            termMatched = true;
          } else if (entry.lowSignal.has(term)) {
            matchedOn.push({ field: 'lowSignal', term });
            termMatched = true;
          } else if (entry.aliases?.has(term)) {
            matchedOn.push({ field: 'aliases', term });
            termMatched = true;
          }

          if (termMatched) matchedCount++;
        }

        if (matchedCount === 0) return false;

        keywordEvidence!.set(m.name, {
          matchedOn,
          matchedTokens: matchedCount,
          totalTokens: queryTerms.length,
        });
        return true;
      });
    }

    // Build result — existing ApplicationSummary shape UNCHANGED; the three-layer signal is
    // ADDITIVE and rides ONLY on keyword-discovery results (Req 6.8 / §Collision).
    //
    //   Layer 1 (Match):     matchConfidence (derived below) + matchedOn (the evidence)
    //   Layer 2 (Viability): readiness + viability.internalOnly — carried on ApplicationSummary;
    //                        the DISTINCT gate signals (the caller gates on them; the tool does not
    //                        filter — an internal-only component still appears, flagged).
    //   Layer 3 (Usability): rank (assigned post-sort) + matchedOn (auditability)
    //
    // matchConfidence ≠ readiness ≠ rank. The tool emits all three and NEVER collapses them or
    // asserts rank #1 = "the answer" — match-confidence alone never drives action.
    type DiscoveryRow = ApplicationSummary & { matchedOn?: MatchedOnEntry[] } & Partial<DiscoveryConfidenceSignal>;

    let results: DiscoveryRow[] = candidates.map(m => {
      const summary = this.toApplicationSummary(m);
      if (keywordEvidence) {
        const evidence = keywordEvidence.get(m.name);
        if (evidence) {
          // Layer 1 — derive the match TIER from the visible evidence (reconstructable, P5).
          const matchConfidence = deriveMatchConfidence(
            evidence.matchedOn,
            evidence.matchedTokens,
            evidence.totalTokens,
            { name: m.name, family: m.family }
          );
          // readiness (Layer 2) already rides on `summary` via ApplicationSummary — left intact.
          // rank (Layer 3) is assigned after the sort below so it reflects final ordering.
          return { ...summary, matchedOn: evidence.matchedOn, matchConfidence };
        }
      }
      return summary;
    });

    // Sort (Layer-3 usability ORDER — it does not assert rank #1 is "the answer").
    // Keyword active → rankCompare: tier, then coverage, then own-name hit, then name
    // (rubric Layer-3 amendment 2026-10-12; Thurgood's ruling). Otherwise → name.
    if (keywordEvidence) {
      const nameHits = new Map<string, number>();
      for (const row of results) {
        const ev = keywordEvidence.get(row.name);
        nameHits.set(row.name, ev ? countOwnNameHits(row.name, ev.matchedOn) : 0);
      }
      results = results.sort((a, b) => {
        const aEv = keywordEvidence!.get(a.name);
        const bEv = keywordEvidence!.get(b.name);
        return rankCompare(
          {
            name: a.name,
            matchConfidence: a.matchConfidence ?? 'none',
            coverage: aEv ? aEv.matchedTokens / aEv.totalTokens : 0,
            nameHits: nameHits.get(a.name) ?? 0,
          },
          {
            name: b.name,
            matchConfidence: b.matchConfidence ?? 'none',
            coverage: bEv ? bEv.matchedTokens / bEv.totalTokens : 0,
            nameHits: nameHits.get(b.name) ?? 0,
          },
        );
      });
    } else {
      results = results.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Apply optional limit (before rank assignment so ranks are contiguous over the returned set)
    if (filters.limit && filters.limit > 0) {
      results = results.slice(0, filters.limit);
    }

    // Layer 3 — assign the ordinal rank (1-based) AFTER sort/limit, only on keyword-discovery rows.
    // A `partial` row is still returned here (ranked, flagged with its tier) — NOT dropped. Only a
    // zero-match query (matchConfidence: 'none') yields the empty contract { data: [], error: null }.
    if (keywordEvidence) {
      results = results.map((row, i) => ({ ...row, rank: i + 1 }));
    }

    return { data: results, error: null, warnings: [], metrics: { responseTimeMs: Date.now() - start } };
  }

  checkComposition(parent: string, child: string, parentProps?: Record<string, unknown>): QueryResult<CompositionResult> {
    const start = Date.now();
    const parentMeta = this.indexer.getComponent(parent);
    if (!parentMeta) {
      return { data: null, error: `Parent component "${parent}" not found`, warnings: [], metrics: { responseTimeMs: Date.now() - start } };
    }
    const result = checkComposition(parentMeta, child, this.indexer.getIndex(), parentProps);
    return { data: result, error: null, warnings: [], metrics: { responseTimeMs: Date.now() - start } };
  }

  checkRequires(parent: string, childNames: string[]): QueryResult<RequiresValidationResult> {
    const start = Date.now();
    const parentMeta = this.indexer.getComponent(parent);
    if (!parentMeta) {
      return { data: null, error: `Parent component "${parent}" not found`, warnings: [], metrics: { responseTimeMs: Date.now() - start } };
    }
    const result = validateRequires(parentMeta, childNames);
    return { data: result, error: null, warnings: [], metrics: { responseTimeMs: Date.now() - start } };
  }

  getPatternCatalog(): QueryResult<PatternCatalogEntry[]> {
    const start = Date.now();
    return { data: this.indexer.getPatternCatalog(), error: null, warnings: [], metrics: { responseTimeMs: Date.now() - start } };
  }

  getPattern(name: string): QueryResult<ExperiencePattern> {
    const start = Date.now();
    const data = this.indexer.getPattern(name);
    return {
      data,
      error: data ? null : `Pattern "${name}" not found`,
      warnings: [],
      metrics: { responseTimeMs: Date.now() - start },
    };
  }

  getLayoutTemplateCatalog(): QueryResult<LayoutTemplateCatalogEntry[]> {
    const start = Date.now();
    return { data: this.indexer.getLayoutTemplateCatalog(), error: null, warnings: [], metrics: { responseTimeMs: Date.now() - start } };
  }

  getLayoutTemplate(name: string): QueryResult<LayoutTemplate> {
    const start = Date.now();
    const data = this.indexer.getLayoutTemplate(name);
    return {
      data,
      error: data ? null : `Layout template "${name}" not found`,
      warnings: [],
      metrics: { responseTimeMs: Date.now() - start },
    };
  }

  getGuidance(component: string, verbose?: boolean): QueryResult<PropGuidanceResponse> {
    const start = Date.now();
    const guidance = this.indexer.getGuidance(component);
    if (!guidance) {
      return { data: null, error: `No guidance available for "${component}"`, warnings: [], metrics: { responseTimeMs: Date.now() - start } };
    }
    const response: PropGuidanceResponse = {
      family: guidance.family,
      displayName: guidance.displayName,
      whenToUse: guidance.whenToUse,
      whenNotToUse: guidance.whenNotToUse,
      selectionRules: verbose ? guidance.selectionRules : guidance.selectionRules.map(g => ({
        ...g,
        rules: g.rules.map(({ rationale, ...rest }) => ({ ...rest, rationale: '' })),
      })),
      accessibilityNotes: guidance.accessibilityNotes,
      patterns: verbose ? guidance.patterns : guidance.patterns.map(({ description, ...rest }) => ({ ...rest, description: '' })),
    };
    return { data: response, error: null, warnings: [], metrics: { responseTimeMs: Date.now() - start } };
  }

  getHealth(): IndexHealth {
    return this.indexer.getHealth();
  }

  private toSummary(meta: ComponentMetadata): ComponentSummary {
    return {
      name: meta.name,
      type: meta.type,
      family: meta.family,
      readiness: meta.readiness,
      description: meta.description,
      platforms: meta.platforms,
      contractCategories: [...new Set(Object.values(meta.contracts.active).map(c => c.category))],
      contractCount: Object.keys(meta.contracts.active).length,
      tokenCount: meta.tokens.length,
      annotations: meta.annotations,
      internalComponents: meta.composition?.internal.map(c => c.component) ?? [],
      requiredChildren: meta.composition?.children?.requires ?? [],
      inheritsFrom: meta.contracts.inheritsFrom,
    };
  }

  private toApplicationSummary(meta: ComponentMetadata): ApplicationSummary {
    return {
      ...this.toSummary(meta),
      purpose: meta.annotations?.purpose ?? null,
      whenToUse: meta.annotations?.usage.whenToUse ?? [],
      whenNotToUse: meta.annotations?.usage.whenNotToUse ?? [],
      alternatives: meta.annotations?.alternatives ?? [],
      contexts: meta.annotations?.contexts ?? [],
      // Layer 2 — declared internal-only (item 6). Emitted, never filtered on.
      viability: { internalOnly: meta.internalOnly === true },
    };
  }
}
