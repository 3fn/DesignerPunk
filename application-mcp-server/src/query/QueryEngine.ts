/**
 * Component Query Engine
 *
 * Wraps ComponentIndexer with query logic, metrics, and error handling.
 * Provides capability discovery (by category, concept, platform, purpose)
 * and progressive disclosure (catalog → summary → full).
 *
 * @see .kiro/specs/064-component-metadata-schema/design.md — Requirements 3.1–3.6
 */

import { ComponentIndexer, tokenizeString } from '../indexer/ComponentIndexer';
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
 * Components Layer-1 rubric (discovery-confidence-rubric.md → "Components — find_components (Lina)").
 *
 * Derives the match TIER purely from the emitted evidence (matchedOn + coverage), so an
 * auditor can recompute it without trusting the label (Req 6.2 / P5 reconstructability).
 *
 * Tier rule (with the validated false-confidence fix):
 *   - `strong`  = a high-signal-field hit
 *                 OR ≥2-token full coverage where at least one matched field is high-signal.
 *   - `partial` = at least one token matched but only in low-signal fields AND not the
 *                 qualified-coverage case above (includes the single-low-signal-token case).
 *   - `none`    = zero tokens matched.
 *
 * THE SIGNAL-CLASS-GATED ≥2-TOKEN GUARD (the dry-run fix): the ≥2-token coverage clause
 * only reaches `strong` when at least one matched field is high-signal. Low-signal-ONLY
 * coverage (e.g. two tokens both landing in a shared `contexts` value like `onboarding-flows`)
 * caps at `partial`, NOT `strong`. Without this guard, low-cardinality shared fields would
 * mass-produce false `strong`s.
 *
 * `aliases` are reactive true-synonym divergences (Req 1.9) — they stand in for the term an
 * author chose NOT to put in a high-signal field, so they are treated as low-signal for tiering
 * (they do not, on their own, lift a match to `strong`). High-signal must be earned by an
 * actual high-signal-field hit.
 *
 * @param matchedOn signal-class-labeled evidence for the candidate (the matched terms)
 * @param matchedTokens count of distinct query tokens that matched any field
 * @param totalTokens   total query tokens (coverage denominator)
 */
export function deriveMatchConfidence(
  matchedOn: MatchedOnEntry[],
  matchedTokens: number,
  totalTokens: number
): MatchConfidence {
  if (matchedTokens === 0) return 'none';

  const hasHighSignal = matchedOn.some(e => e.field === 'highSignal');

  // `strong` via a direct high-signal-field hit.
  if (hasHighSignal && matchedTokens >= 1 && totalTokens >= 1) {
    // Note: a single high-signal hit already qualifies as `strong` (the first clause of the
    // rubric: "a high-signal-field hit"). The ≥2-token clause below is the SECOND path to
    // `strong`; both are gated on at least one high-signal field.
    return 'strong';
  }

  // `strong` via ≥2-token FULL coverage where at least one matched field is high-signal.
  // (Unreachable in practice once the high-signal hit above returns, but kept explicit so the
  //  rubric reads as written and the guard is legible: full coverage WITHOUT any high-signal
  //  field falls through to `partial`.)
  const fullCoverage = matchedTokens === totalTokens;
  if (matchedTokens >= 2 && fullCoverage && hasHighSignal) {
    return 'strong';
  }

  // Everything else with ≥1 matched token but NO high-signal field → `partial`.
  // This is the guard's effect: low-signal-only coverage (including ≥2-token full coverage
  // that is entirely low-signal/aliases) caps at `partial`, never `strong`.
  return 'partial';
}

export class ComponentQueryEngine {
  constructor(private indexer: ComponentIndexer) {}

  getComponent(name: string): QueryResult<ComponentMetadata> {
    const start = Date.now();
    const data = this.indexer.getComponent(name);
    return {
      data,
      error: data ? null : `Component "${name}" not found`,
      warnings: data?.warnings ?? [],
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
      return { data: null, error: `Component "${name}" not found`, warnings: [], metrics: { responseTimeMs: Date.now() - start } };
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
    return { data: summary, error: null, warnings: [], metrics: { responseTimeMs: Date.now() - start } };
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
      const queryTerms = tokenizeString(filters.keyword);
      if (queryTerms.length > 0) {
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
    }

    // Build result — existing ApplicationSummary shape UNCHANGED; the three-layer signal is
    // ADDITIVE and rides ONLY on keyword-discovery results (Req 6.8 / §Collision).
    //
    //   Layer 1 (Match):     matchConfidence (derived below) + matchedOn (the evidence)
    //   Layer 2 (Viability): readiness — already carried on ApplicationSummary; surfaced here as
    //                        the DISTINCT gate signal (the caller gates on it; the tool does not).
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
            evidence.totalTokens
          );
          // readiness (Layer 2) already rides on `summary` via ApplicationSummary — left intact.
          // rank (Layer 3) is assigned after the sort below so it reflects final ordering.
          return { ...summary, matchedOn: evidence.matchedOn, matchConfidence };
        }
      }
      return summary;
    });

    // Sort: when keyword is active, order by coverage (matchedTokens desc), then name.
    // This is the Layer-3 usability ORDER — it does not assert rank #1 is "the answer".
    if (keywordEvidence) {
      results = results.sort((a, b) => {
        const aEv = keywordEvidence!.get(a.name);
        const bEv = keywordEvidence!.get(b.name);
        const aCov = aEv ? aEv.matchedTokens / aEv.totalTokens : 0;
        const bCov = bEv ? bEv.matchedTokens / bEv.totalTokens : 0;
        if (bCov !== aCov) return bCov - aCov;
        return a.name.localeCompare(b.name);
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
    };
  }
}
