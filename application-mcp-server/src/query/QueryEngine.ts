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
  }): QueryResult<(ApplicationSummary & { matchedOn?: MatchedOnEntry[] })[]> {
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

    // Build result — existing ApplicationSummary shape UNCHANGED; matchedOn is additive
    let results = candidates.map(m => {
      const summary = this.toApplicationSummary(m);
      if (keywordEvidence) {
        const evidence = keywordEvidence.get(m.name);
        if (evidence) {
          return { ...summary, matchedOn: evidence.matchedOn };
        }
      }
      return summary;
    });

    // Sort: when keyword is active, order by coverage (matchedTokens desc), then name
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

    // Apply optional limit
    if (filters.limit && filters.limit > 0) {
      results = results.slice(0, filters.limit);
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
