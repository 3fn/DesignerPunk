/**
 * QueryEngine - Request routing and response formatting for MCP Documentation Server
 * 
 * Responsibilities:
 * - Route incoming MCP tool calls to appropriate handlers
 * - Validate parameters (file paths, headings, task types)
 * - Format responses according to MCP protocol
 * - Handle errors and return clear messages
 * - Log performance metrics for all operations
 * 
 * Requirements: 1.1, 11.1, 11.2, 11.3, 11.4
 */

import { DocumentIndexer } from '../indexer/DocumentIndexer';
import { filterSalientTokens } from './stop-words';
import {
  DocumentationMap,
  DocumentMetadata,
  DocumentSummary,
  DocumentFull,
  Section,
  CrossReference,
  MetadataValidation,
  IndexHealth
} from '../models';

// ---------------------------------------------------------------------------
// find_docs types (defined here to avoid circular QueryEngine ↔ tools imports)
// ---------------------------------------------------------------------------

/**
 * A single document entry returned by find_docs.
 * Task-5 fields are optional — populated by the Task-5 rubric, not in Task 3.
 */
export interface FindDocsEntry {
  path: string;
  summary: string;
  owner: string;
  matchedOn: string[];
  matchConfidence?: 'strong' | 'partial' | 'none';
  viability?: { placeholder: boolean; deprecated: boolean };
  rank?: number;
}

/**
 * Result envelope for find_docs.
 * Empty concept-mode: { data: [], error: null, matchConfidence: 'none' }
 * Populated concept-mode: { data: FindDocsEntry[], error: null }
 * List-mode: { data: FindDocsEntry[], error: null, nextCursor? }
 */
export interface FindDocsResult {
  data: FindDocsEntry[];
  error: string | null;
  matchConfidence?: 'none';
  nextCursor?: string;
}

/**
 * Performance metrics for query operations
 */
export interface QueryMetrics {
  /** Operation type */
  operation: string;
  /** Response time in milliseconds */
  responseTimeMs: number;
  /** Additional timing data */
  timings?: Record<string, number>;
  /** Token counts if applicable */
  tokenCounts?: {
    summary?: number;
    section?: number;
    fullDocument?: number;
  };
}

/**
 * Query result wrapper with metrics
 */
export interface QueryResult<T> {
  /** Query result data */
  data: T;
  /** Performance metrics */
  metrics: QueryMetrics;
}

/**
 * Error response structure
 */
export interface QueryError {
  /** Error type */
  error: string;
  /** Error message */
  message: string;
  /** Suggestions for resolution */
  suggestions?: string[];
  /** Available options (e.g., available sections) */
  availableOptions?: string[];
}

/**
 * QueryEngine class - Routes requests and formats responses
 */
export class QueryEngine {
  private indexer: DocumentIndexer;
  private metricsLogger?: (metrics: QueryMetrics) => void;

  /**
   * Create a new QueryEngine
   * 
   * @param indexer - DocumentIndexer instance for data access
   * @param metricsLogger - Optional callback for logging metrics
   */
  constructor(indexer: DocumentIndexer, metricsLogger?: (metrics: QueryMetrics) => void) {
    this.indexer = indexer;
    this.metricsLogger = metricsLogger;
  }

  /**
   * Get complete documentation structure with metadata
   * 
   * @returns Documentation map with all layers and documents
   * Requirements: 1.1, 1.2, 11.1
   */
  getDocumentationMap(): QueryResult<DocumentationMap> {
    const startTime = Date.now();

    const data = this.indexer.getDocumentationMap();

    const metrics = this.createMetrics('get_documentation_map', startTime, {
      documentCount: this.countDocuments(data)
    });

    this.logMetrics(metrics);

    return { data, metrics };
  }

  /**
   * Get document summary with outline
   * 
   * @param path - Document path
   * @returns Document summary with metadata and outline
   * Requirements: 2.1, 2.2, 2.3, 2.4, 11.2
   */
  getDocumentSummary(path: string): QueryResult<DocumentSummary> {
    const startTime = Date.now();

    // Validate path parameter
    this.validatePath(path);

    const data = this.indexer.getDocumentSummary(path);

    const metrics = this.createMetrics('get_document_summary', startTime, {
      tokenCounts: {
        summary: this.estimateSummaryTokens(data),
        fullDocument: data.tokenCount
      }
    });

    this.logMetrics(metrics);

    return { data, metrics };
  }

  /**
   * Get complete document content
   * 
   * @param path - Document path
   * @returns Full document content with metadata
   * Requirements: 3.1, 3.2, 3.3, 11.3
   */
  getDocumentFull(path: string): QueryResult<DocumentFull> {
    const startTime = Date.now();

    // Validate path parameter
    this.validatePath(path);

    const data = this.indexer.getDocumentFull(path);

    const metrics = this.createMetrics('get_document_full', startTime, {
      tokenCounts: {
        fullDocument: data.tokenCount
      }
    });

    this.logMetrics(metrics);

    return { data, metrics };
  }

  /**
   * Get specific section by heading, with optional disambiguation (Spec 121 Req 5).
   *
   * @param path - Document path
   * @param heading - Section heading to retrieve
   * @param opts - Optional disambiguation: { parent?, sectionId? }
   * @returns Section content with parent context, `sectionId`, and `siblingHeadings`
   * Requirements: 4.1, 4.2, 4.3, 11.4, 5.1, 5.2, 5.4
   *
   * Back-compat: `getSection(path, heading)` with a UNIQUE heading behaves
   * exactly as before (now additionally carrying `sectionId` + `siblingHeadings`).
   * A non-unique heading with no disambiguator throws an AmbiguousHeading error
   * (Finding 3 fix) rather than silently returning the first match.
   */
  getSection(
    path: string,
    heading: string,
    opts?: { parent?: string; sectionId?: string },
  ): QueryResult<Section> {
    const startTime = Date.now();

    // Validate parameters.
    this.validatePath(path);
    // A sectionId alone is sufficient addressing; only require a heading when no
    // sectionId is supplied (back-compat: the heading-only path still validates).
    if (!opts?.sectionId) {
      this.validateHeading(heading);
    }

    const data = this.indexer.getSectionAddressed(path, {
      heading,
      parent: opts?.parent,
      sectionId: opts?.sectionId,
    });

    const metrics = this.createMetrics('get_section', startTime, {
      tokenCounts: {
        section: data.tokenCount
      }
    });

    this.logMetrics(metrics);

    return { data, metrics };
  }

  /**
   * List cross-references in a document
   * 
   * @param path - Document path
   * @returns Array of cross-references
   * Requirements: 5.1, 5.2, 5.3
   */
  listCrossReferences(path: string): QueryResult<CrossReference[]> {
    const startTime = Date.now();

    // Validate path parameter
    this.validatePath(path);

    const data = this.indexer.listCrossReferences(path);

    const metrics = this.createMetrics('list_cross_references', startTime, {
      referenceCount: data.length
    });

    this.logMetrics(metrics);

    return { data, metrics };
  }

  /**
   * Validate document metadata
   * 
   * @param path - Document path
   * @returns Metadata validation result
   * Requirements: 6.1, 6.2, 6.3
   */
  validateMetadata(path: string): QueryResult<MetadataValidation> {
    const startTime = Date.now();

    // Validate path parameter
    this.validatePath(path);

    const data = this.indexer.validateMetadata(path);

    const metrics = this.createMetrics('validate_metadata', startTime, {
      issueCount: data.issues.length,
      valid: data.valid
    });

    this.logMetrics(metrics);

    return { data, metrics };
  }

  /**
   * Get index health status
   * 
   * @returns Index health with status, errors, warnings, and metrics
   * Requirements: 9.1, 9.2, 9.5
   */
  getIndexHealth(): QueryResult<IndexHealth> {
    const startTime = Date.now();

    const data = this.indexer.getIndexHealth();

    const metrics = this.createMetrics('get_index_health', startTime, {
      status: data.status,
      documentsIndexed: data.documentsIndexed
    });

    this.logMetrics(metrics);

    return { data, metrics };
  }

  /**
   * Find documents by concept/keyword search (concept mode) or enumerate all docs
   * (list/catalog mode).
   *
   * Concept mode: tokenized keyword match against per-document metadata fields.
   * List mode: unranked, paginated enumeration of the full doc set.
   *
   * Requirements: 1.1, 1.2, 4.1, 4.2
   */
  findDocs(params: {
    concept?: string;
    list?: boolean;
    cursor?: string;
    limit?: number;
  }): QueryResult<FindDocsResult> {
    const startTime = Date.now();
    const { concept, list, cursor, limit } = params;

    const allDocs = this.indexer.getAllDocuments();

    let result: FindDocsResult;

    if (list) {
      // List/catalog mode: bounded, unranked enumeration
      result = findDocsList(allDocs, { cursor, limit });
    } else if (concept && concept.trim() !== '') {
      // Concept search mode: ranked, tokenized keyword match
      result = findDocsConcept(allDocs, concept.trim());
    } else {
      // Neither mode supplied — return empty no-match contract
      result = {
        data: [],
        error: null,
        matchConfidence: 'none' as const,
      };
    }

    const metrics = this.createMetrics('find_docs', startTime, {
      resultCount: result.data.length
    });

    this.logMetrics(metrics);

    return { data: result, metrics };
  }

  /**
   * Rebuild the index from scratch
   *
   * @returns Index health after rebuild
   * Requirements: 9.1, 9.2, 9.5
   */
  async rebuildIndex(): Promise<QueryResult<IndexHealth>> {
    const startTime = Date.now();

    const data = await this.indexer.rebuildIndex();

    const metrics = this.createMetrics('rebuild_index', startTime, {
      status: data.status,
      documentsIndexed: data.documentsIndexed
    });

    this.logMetrics(metrics);

    return { data, metrics };
  }

  // ============================================
  // Parameter Validation Methods
  // ============================================

  /**
   * Validate file path parameter
   * 
   * @param path - Path to validate
   * @throws Error if path is invalid
   */
  private validatePath(path: string): void {
    if (!path || typeof path !== 'string') {
      throw this.createValidationError(
        'InvalidParameter',
        'Path parameter is required and must be a string',
        ['Provide a valid file path like ".kiro/steering/Component Development Guide.md"']
      );
    }

    if (path.trim() === '') {
      throw this.createValidationError(
        'InvalidParameter',
        'Path parameter cannot be empty',
        ['Provide a valid file path like ".kiro/steering/Component Development Guide.md"']
      );
    }

    // Check for path traversal attempts
    if (path.includes('..')) {
      throw this.createValidationError(
        'InvalidParameter',
        'Path parameter cannot contain ".." (path traversal)',
        ['Use absolute paths from project root']
      );
    }
  }

  /**
   * Validate heading parameter
   * 
   * @param heading - Heading to validate
   * @throws Error if heading is invalid
   */
  private validateHeading(heading: string): void {
    if (!heading || typeof heading !== 'string') {
      throw this.createValidationError(
        'InvalidParameter',
        'Heading parameter is required and must be a string',
        ['Provide a section heading like "Token Selection Decision Framework"']
      );
    }

    if (heading.trim() === '') {
      throw this.createValidationError(
        'InvalidParameter',
        'Heading parameter cannot be empty',
        ['Provide a section heading like "Token Selection Decision Framework"']
      );
    }
  }

  // ============================================
  // Error Handling Methods
  // ============================================

  /**
   * Create a validation error with suggestions
   * 
   * @param errorType - Error type identifier
   * @param message - Error message
   * @param suggestions - Suggestions for resolution
   * @returns Error object
   */
  private createValidationError(
    errorType: string,
    message: string,
    suggestions?: string[]
  ): Error {
    const error = new Error(message);
    (error as any).errorType = errorType;
    (error as any).suggestions = suggestions;
    return error;
  }

  /**
   * Format an error for response
   * 
   * @param error - Error to format
   * @returns Formatted error response
   */
  formatError(error: Error): QueryError {
    const errorType = (error as any).errorType || 'UnknownError';
    const suggestions = (error as any).suggestions || [];

    return {
      error: errorType,
      message: error.message,
      suggestions: suggestions.length > 0 ? suggestions : undefined
    };
  }

  // ============================================
  // Metrics and Logging Methods
  // ============================================

  /**
   * Create performance metrics object
   * 
   * @param operation - Operation name
   * @param startTime - Start timestamp
   * @param additionalData - Additional metrics data
   * @returns QueryMetrics object
   */
  private createMetrics(
    operation: string,
    startTime: number,
    additionalData?: Record<string, any>
  ): QueryMetrics {
    const responseTimeMs = Date.now() - startTime;

    const metrics: QueryMetrics = {
      operation,
      responseTimeMs
    };

    if (additionalData?.tokenCounts) {
      metrics.tokenCounts = additionalData.tokenCounts;
    }

    if (additionalData?.timings) {
      metrics.timings = additionalData.timings;
    }

    return metrics;
  }

  /**
   * Log metrics using the configured logger
   * 
   * @param metrics - Metrics to log
   */
  private logMetrics(metrics: QueryMetrics): void {
    if (this.metricsLogger) {
      this.metricsLogger(metrics);
    }
  }

  /**
   * Count total documents in documentation map
   * 
   * @param map - Documentation map
   * @returns Total document count
   */
  private countDocuments(map: DocumentationMap): number {
    let count = 0;
    for (const layer of Object.values(map.layers)) {
      count += layer.documents.length;
    }
    return count;
  }

  /**
   * Estimate token count for a summary
   * 
   * @param summary - Document summary
   * @returns Estimated token count
   */
  private estimateSummaryTokens(summary: DocumentSummary): number {
    // Rough estimation: metadata + outline + cross-references
    // Each field contributes approximately:
    // - metadata: ~50 tokens
    // - outline: ~10 tokens per section
    // - cross-references: ~15 tokens per reference
    const metadataTokens = 50;
    const outlineTokens = summary.outline.length * 10;
    const crossRefTokens = summary.crossReferences.length * 15;

    return metadataTokens + outlineTokens + crossRefTokens;
  }
}

// =============================================================================
// find_docs helpers (module-level, called by QueryEngine.findDocs)
// =============================================================================

/** Default page limit for list mode — bounded for MCP token-limit safety. */
export const FIND_DOCS_DEFAULT_LIMIT = 20;

/**
 * `strong`-tier coverage threshold: ≥~50% of salient query tokens must hit a
 * high-signal field (discovery-confidence-rubric.md, Docs rubric). A legible
 * knob — raising it makes `strong` stricter, predictably demoting queries to
 * `partial`.
 */
const STRONG_COVERAGE_THRESHOLD = 0.5;

/**
 * Tokenize a string: split on whitespace / hyphens / underscores / slashes /
 * dots and camelCase boundaries; lowercase; drop empty strings.
 * Term-level, NOT substring (Req 1.3 / P3).
 *
 * NOTE: this does NOT apply the stop-word filter — callers that need the
 * rubric's "salient query tokens" (the coverage denominator) pass the result
 * through `filterSalientTokens` from the versioned stop-word module. Keeping the
 * raw tokenizer separate lets the field-side indexing keep low-signal terms
 * while the query side gates `partial`/`none` on salient tokens only.
 */
function tokenizeRaw(text: string): string[] {
  if (!text) return [];
  const expanded = text.replace(/([a-z])([A-Z])/g, '$1 $2');
  return expanded
    .toLowerCase()
    .split(/[\s\-_\/\.]+/)
    .map((t) => t.replace(/[^a-z0-9]/g, ''))
    .filter((t) => t.length > 0);
}

/**
 * Signal classes, reconciled to the docs rubric (discovery-confidence-rubric.md):
 *   - high:   title (frontmatter `name`/H1), sections (headings), description
 *   - medium: relevantTasks (+ layer/category metadata)
 *   - low:    path basename (a body/identifier proxy)
 *
 * (Task 3 used `purpose`/`sections` as "high" and `relevantTasks`/`path` as
 *  "low". `purpose` is the `**Purpose**:` metadata line — kept as high-signal
 *  alongside `description`, since both are curated keyword surfaces. `title` and
 *  `description` are NEW high-signal surfaces now that frontmatter is indexed.)
 */
type SignalClass = 'title' | 'sections' | 'description' | 'purpose' | 'aliases' | 'relevantTasks' | 'path';

// `aliases` is high-signal: a curated author declaration (Spec 121 Req 1.9, extended
// to docs) that the doc is about these concepts even when the literal term is absent
// from title/description — the bridge for semantic-synonym queries (e.g. "RTL" → a doc
// that only says "logical properties").
const HIGH_SIGNAL: SignalClass[] = ['title', 'sections', 'description', 'purpose', 'aliases'];
const MEDIUM_SIGNAL: SignalClass[] = ['relevantTasks'];
const LOW_SIGNAL: SignalClass[] = ['path'];

/** Tier a signal class belongs to (for coverage/guard reasoning). */
function signalTier(cls: SignalClass): 'high' | 'medium' | 'low' {
  if (HIGH_SIGNAL.includes(cls)) return 'high';
  if (MEDIUM_SIGNAL.includes(cls)) return 'medium';
  return 'low';
}

/** Build tokenized term sets for a document grouped by signal class. */
function buildDocTokenSets(doc: DocumentMetadata): Map<SignalClass, Set<string>> {
  const groups = new Map<SignalClass, Set<string>>();

  const add = (cls: SignalClass, text: string) => {
    if (!text) return;
    if (!groups.has(cls)) groups.set(cls, new Set());
    for (const t of tokenizeRaw(text)) groups.get(cls)!.add(t);
  };

  add('title', doc.title || '');
  for (const s of doc.sections) add('sections', s);
  add('description', doc.description || '');
  add('purpose', doc.purpose || '');
  for (const a of doc.aliases || []) add('aliases', a);
  for (const t of doc.relevantTasks) add('relevantTasks', t);
  const basename = doc.path.replace(/^.*\//, '').replace(/\.md$/, '');
  add('path', basename);

  return groups;
}

/** Build a ~50-token summary string from document metadata. */
function buildDocSummary(doc: DocumentMetadata): string {
  const parts: string[] = [];
  if (doc.purpose) parts.push(doc.purpose);
  else if (doc.description) parts.push(doc.description);
  if (doc.sections.length > 0) {
    const shown = doc.sections.slice(0, 5);
    const more = doc.sections.length > 5 ? ` +${doc.sections.length - 5} more` : '';
    parts.push(`Sections: ${shown.join(', ')}${more}`);
  }
  parts.push(`Layer: ${doc.layer}`);
  return parts.join('. ');
}

/** Doc-level viability gate (Layer 2). Defaults to all-false when unmarked. */
function docViability(doc: DocumentMetadata): { placeholder: boolean; deprecated: boolean } {
  return doc.viability ?? { placeholder: false, deprecated: false };
}

interface ScoredDoc {
  score: number;
  matchedOn: string[];
  /** Distinct salient query tokens that matched ANY field (coverage numerator). */
  matchedTokens: number;
  /** Total salient query tokens (coverage denominator). */
  totalTokens: number;
  /** Distinct salient query tokens that matched a HIGH-signal field. */
  highTokens: number;
  /** Did any matched HIGH-signal hit come from an exact multi-token title/heading match? */
  exactMultiTokenHighHit: boolean;
}

/**
 * Score a document against the salient query tokens.
 *
 * Per token, the highest-signal field that contains it wins (a token in both
 * `title` and `path` is credited to `title`). Score weights: high 3 / medium 2 /
 * low 1 — used for Layer-3 rank only; the Layer-1 tier is derived separately from
 * coverage + signal class (so the tier is reconstructable, not score-thresholded).
 *
 * Returns null if no salient query token matched any field.
 */
function scoreDoc(doc: DocumentMetadata, salientTokens: string[]): ScoredDoc | null {
  if (salientTokens.length === 0) return null;

  const groups = buildDocTokenSets(doc);
  const ORDER: SignalClass[] = [...HIGH_SIGNAL, ...MEDIUM_SIGNAL, ...LOW_SIGNAL];
  const WEIGHT: Record<'high' | 'medium' | 'low', number> = { high: 3, medium: 2, low: 1 };
  // Spec 119-A Layer-3 rank tie-breaker: a fractional bonus (< the 1-point gap
  // between tiers) so it only orders EXACT ties, never promotes a lower-tier or
  // lower-coverage match above a higher one. Title-in-query edges out an
  // equal-coverage section/description match. Confidence tier is unaffected.
  const TITLE_RANK_TIEBREAK = 0.5;

  let score = 0;
  const matchedOn: string[] = [];
  let matchedTokens = 0;
  let highTokens = 0;

  for (const qt of salientTokens) {
    for (const cls of ORDER) {
      if (groups.get(cls)?.has(qt)) {
        const tier = signalTier(cls);
        // Spec 119-A: Layer-3 RANK-only title tie-breaker. A title hit (the doc IS
        // about the token) edges out an equal-coverage section/description hit (the
        // doc merely MENTIONS it), breaking exact ties toward the on-topic doc.
        // RANK ONLY — does NOT change the confidence tier (deriveMatchConfidence is
        // untouched), so Spec 121's matchConfidence contract is unaffected.
        // See 121 discovery-confidence-rubric.md § "Layer 3 — Usability".
        score += WEIGHT[tier] + (cls === 'title' ? TITLE_RANK_TIEBREAK : 0);
        matchedOn.push(`${cls}:${qt}`);
        matchedTokens += 1;
        if (tier === 'high') highTokens += 1;
        break; // highest-signal class wins for this token
      }
    }
  }

  if (matchedTokens === 0) return null;

  // Exact multi-token high-signal hit: ALL salient query tokens (≥2) land within a
  // single high-signal field (title or a section heading) — i.e. the query is an
  // exact multi-token title/heading match, not a scatter of incidental tokens.
  let exactMultiTokenHighHit = false;
  if (salientTokens.length >= 2) {
    for (const cls of HIGH_SIGNAL) {
      const set = groups.get(cls);
      if (set && salientTokens.every((t) => set.has(t))) {
        exactMultiTokenHighHit = true;
        break;
      }
    }
  }

  return {
    score,
    matchedOn,
    matchedTokens,
    totalTokens: salientTokens.length,
    highTokens,
    exactMultiTokenHighHit,
  };
}

/**
 * Derive the Layer-1 `matchConfidence` tier from visible evidence (the docs
 * rubric in discovery-confidence-rubric.md). Reconstructable (P5): the inputs are
 * the same `matchedOn` (signal-class-labeled) + coverage emitted on the entry.
 *
 *   strong  = a NON-INCIDENTAL high-signal hit:
 *               (a) an exact multi-token title/heading match, OR
 *               (b) ≥~50% salient-token coverage WITH ≥1 high-signal hit.
 *             The incidental-token guard: a LONE high-field token whose coverage
 *             is below the threshold (e.g. "avatar" once in Token-Family-Sizing's
 *             description out of a multi-token query) does NOT reach strong.
 *   partial = matched only medium/low-signal, OR an incidental/low-coverage
 *             high-signal token. Body-only / incidental → partial, never none.
 *   none    = handled by the caller (zero salient-token matches in any field).
 */
function deriveMatchConfidence(s: ScoredDoc): 'strong' | 'partial' {
  // (a) exact multi-token title/heading match → strong.
  if (s.exactMultiTokenHighHit) return 'strong';

  // (b) ≥~50% salient-token coverage with at least one high-signal hit → strong.
  const coverage = s.matchedTokens / s.totalTokens;
  if (s.highTokens > 0 && coverage >= STRONG_COVERAGE_THRESHOLD) return 'strong';

  // Otherwise: medium/low-only, OR an incidental/low-coverage high-field token.
  // The incidental-token guard caps a lone high-field token at partial because
  // its coverage is below STRONG_COVERAGE_THRESHOLD (it did not reach branch b).
  return 'partial';
}

/**
 * Concept-search mode.
 * No-match → pinned empty contract { data: [], error: null, matchConfidence: 'none' }.
 *
 * Emits the three distinct Layer fields per entry (Spec 121 Req 6, §Collision):
 *   - Layer 1 (Match):     `matchConfidence: 'strong' | 'partial'`
 *   - Layer 2 (Viability): `viability: { placeholder, deprecated }` (distinct gate)
 *   - Layer 3 (Usability): `rank` (+ `matchedOn` for auditability)
 *
 * `none` is NOT emitted per-entry — a genuine `none` is the empty contract
 * (P4: partial ⇒ non-empty data with tier; none ⇒ empty contract). A weak
 * best-fit (`partial`) surfaces as a ranked entry, never a hidden empty.
 */
export function findDocsConcept(allDocs: DocumentMetadata[], concept: string): FindDocsResult {
  // Salient query tokens = raw tokens after stop-word + common-term normalization
  // (versioned stop-word module). This is also the coverage denominator.
  const salientTokens = filterSalientTokens(tokenizeRaw(concept));

  if (salientTokens.length === 0) {
    // Stop-word-only / empty query → no salient signal → none.
    return { data: [], error: null, matchConfidence: 'none' };
  }

  const scored: Array<{ doc: DocumentMetadata; s: ScoredDoc }> = [];
  for (const doc of allDocs) {
    const r = scoreDoc(doc, salientTokens);
    if (r !== null) scored.push({ doc, s: r });
  }

  if (scored.length === 0) {
    // Zero salient-token matches in any field → none (the empty contract).
    return { data: [], error: null, matchConfidence: 'none' };
  }

  // Layer-3 rank: by match score, then by coverage as a tiebreak.
  scored.sort((a, b) => {
    if (b.s.score !== a.s.score) return b.s.score - a.s.score;
    return b.s.matchedTokens - a.s.matchedTokens;
  });

  const entries: FindDocsEntry[] = scored.map(({ doc, s }, idx) => ({
    path: doc.path,
    summary: buildDocSummary(doc),
    owner: doc.organization || '',
    matchedOn: s.matchedOn,
    matchConfidence: deriveMatchConfidence(s), // Layer 1
    viability: docViability(doc),              // Layer 2 (distinct gate)
    rank: idx + 1,                             // Layer 3
  }));

  return { data: entries, error: null };
}

/**
 * List/catalog mode — unranked, bounded pagination.
 * Cursor is the opaque string index of the next page start.
 */
export function findDocsList(
  allDocs: DocumentMetadata[],
  params: { cursor?: string; limit?: number },
): FindDocsResult {
  const rawLimit = params.limit && params.limit > 0 ? params.limit : FIND_DOCS_DEFAULT_LIMIT;
  // Hard upper cap: 5× default (100 entries) to preserve growth headroom
  const limit = Math.min(rawLimit, FIND_DOCS_DEFAULT_LIMIT * 5);

  let startIndex = 0;
  if (params.cursor) {
    const parsed = parseInt(params.cursor, 10);
    if (!isNaN(parsed) && parsed >= 0) startIndex = parsed;
  }

  const page = allDocs.slice(startIndex, startIndex + limit);

  const entries: FindDocsEntry[] = page.map((doc) => ({
    path: doc.path,
    summary: buildDocSummary(doc),
    owner: doc.organization || '',
    matchedOn: [],
  }));

  const nextIndex = startIndex + page.length;
  const hasMore = nextIndex < allDocs.length;

  const result: FindDocsResult = { data: entries, error: null };
  if (hasMore) result.nextCursor = String(nextIndex);
  return result;
}
