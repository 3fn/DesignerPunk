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
   * Get specific section by heading
   * 
   * @param path - Document path
   * @param heading - Section heading to retrieve
   * @returns Section content with parent context
   * Requirements: 4.1, 4.2, 4.3, 11.4
   */
  getSection(path: string, heading: string): QueryResult<Section> {
    const startTime = Date.now();

    // Validate parameters
    this.validatePath(path);
    this.validateHeading(heading);

    const data = this.indexer.getSection(path, heading);

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

/** Stop words that carry no match signal. */
const FIND_DOCS_STOP_WORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'of', 'in', 'on', 'at', 'to', 'for',
  'is', 'are', 'was', 'be', 'by', 'with', 'this', 'that', 'from', 'as',
  'it', 'its', 'all', 'any', 'each', 'if', 'not', 'no', 'but', 'so',
  'do', 'how', 'when', 'which', 'who', 'will', 'can', 'has', 'have',
  'had', 'may', 'per', 'via', 'vs', 'etc',
]);

/**
 * Tokenize a string: split on whitespace / hyphens / underscores / slashes /
 * dots and camelCase boundaries; lowercase; drop empty strings.
 * Term-level, NOT substring (Req 1.3 / P3).
 */
function tokenizeQuery(text: string): string[] {
  if (!text) return [];
  const expanded = text.replace(/([a-z])([A-Z])/g, '$1 $2');
  return expanded
    .toLowerCase()
    .split(/[\s\-_\/\.]+/)
    .map((t) => t.replace(/[^a-z0-9]/g, ''))
    .filter((t) => t.length > 0 && !FIND_DOCS_STOP_WORDS.has(t));
}

type SignalClass = 'purpose' | 'sections' | 'relevantTasks' | 'path';

/** Build tokenized term sets for a document grouped by signal class. */
function buildDocTokenSets(doc: DocumentMetadata): Map<SignalClass, Set<string>> {
  const groups = new Map<SignalClass, Set<string>>();

  const add = (cls: SignalClass, text: string) => {
    if (!groups.has(cls)) groups.set(cls, new Set());
    const base = text.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
    for (const t of base.split(/[\s\-_\/\.]+/).map((x) => x.replace(/[^a-z0-9]/g, '')).filter(Boolean)) {
      groups.get(cls)!.add(t);
    }
  };

  add('purpose', doc.purpose || '');
  for (const s of doc.sections) add('sections', s);
  for (const t of doc.relevantTasks) add('relevantTasks', t);
  const basename = doc.path.replace(/^.*\//, '').replace(/\.md$/, '');
  add('path', basename);

  return groups;
}

/** Build a ~50-token summary string from document metadata. */
function buildDocSummary(doc: DocumentMetadata): string {
  const parts: string[] = [];
  if (doc.purpose) parts.push(doc.purpose);
  if (doc.sections.length > 0) {
    const shown = doc.sections.slice(0, 5);
    const more = doc.sections.length > 5 ? ` +${doc.sections.length - 5} more` : '';
    parts.push(`Sections: ${shown.join(', ')}${more}`);
  }
  parts.push(`Layer: ${doc.layer}`);
  return parts.join('. ');
}

/**
 * Score a document against query tokens.
 * High-signal (purpose, sections): 2 pts/hit.
 * Low-signal (relevantTasks, path): 1 pt/hit.
 * Returns null if no query tokens matched.
 */
function scoreDoc(
  doc: DocumentMetadata,
  queryTokens: string[],
): { score: number; matchedOn: string[] } | null {
  if (queryTokens.length === 0) return null;

  const groups = buildDocTokenSets(doc);
  const HIGH: SignalClass[] = ['purpose', 'sections'];
  const LOW: SignalClass[] = ['relevantTasks', 'path'];

  let score = 0;
  const matchedOn: string[] = [];

  for (const qt of queryTokens) {
    let matched = false;
    for (const cls of HIGH) {
      if (groups.get(cls)?.has(qt)) {
        score += 2;
        matchedOn.push(`${cls}:${qt}`);
        matched = true;
        break;
      }
    }
    if (!matched) {
      for (const cls of LOW) {
        if (groups.get(cls)?.has(qt)) {
          score += 1;
          matchedOn.push(`${cls}:${qt}`);
          break;
        }
      }
    }
  }

  return score > 0 ? { score, matchedOn } : null;
}

/**
 * Concept-search mode.
 * No-match → pinned empty contract { data: [], error: null, matchConfidence: 'none' }.
 */
export function findDocsConcept(allDocs: DocumentMetadata[], concept: string): FindDocsResult {
  const queryTokens = tokenizeQuery(concept);

  if (queryTokens.length === 0) {
    return { data: [], error: null, matchConfidence: 'none' };
  }

  const scored: Array<{ doc: DocumentMetadata; score: number; matchedOn: string[] }> = [];
  for (const doc of allDocs) {
    const r = scoreDoc(doc, queryTokens);
    if (r !== null) scored.push({ doc, ...r });
  }

  if (scored.length === 0) {
    return { data: [], error: null, matchConfidence: 'none' };
  }

  scored.sort((a, b) => b.score - a.score);

  const entries: FindDocsEntry[] = scored.map(({ doc, matchedOn }, idx) => ({
    path: doc.path,
    summary: buildDocSummary(doc),
    owner: doc.organization || '',
    matchedOn,
    rank: idx + 1,
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
