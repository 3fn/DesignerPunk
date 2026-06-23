/**
 * find_docs MCP Tool
 *
 * Dual-mode tool superseding get_documentation_map (Spec 121, Req 1 + Req 4).
 *
 * - Concept mode  ({ concept }): tokenized keyword search ranked by match.
 *   No-match returns the pinned empty contract:
 *     { data: [], error: null, matchConfidence: 'none' }
 *   — explicit "no matches", NOT an error, NOT a silent empty payload (Decision 2).
 *
 * - List/catalog mode ({ list: true, cursor?, limit? }): bounded, paginated
 *   enumeration of the full document set. Structural fix for Finding 10
 *   (~78 K char oversized-payload failure of get_documentation_map).
 *
 * Discovery-to-retrieval composition (Req 1.10):
 *   Every returned `path` resolves via get_section / get_document_summary in
 *   one subsequent call (P6).
 *
 * Task-5 tier fields (per-entry matchConfidence: 'strong'|'partial') are
 * intentionally NOT derived here — that is Task 5 (per-domain rubric). The
 * ONLY matchConfidence emitted in this task is the top-level 'none' on the
 * empty/no-match case (Req 1.2 / Decision 2). FindDocsEntry carries the Task-5
 * fields as optional so they can be populated without a shape break.
 *
 * Requirements: 1.1, 1.2, 1.10, 4.1, 4.2, 4.3
 */

import {
  QueryEngine,
  QueryResult,
  FindDocsResult,
  FIND_DOCS_DEFAULT_LIMIT,
} from '../query/QueryEngine';

// Re-export types so consumers can import them from the tool module.
export type { FindDocsResult, FindDocsEntry } from '../query/QueryEngine';
export { FIND_DOCS_DEFAULT_LIMIT } from '../query/QueryEngine';

// ---------------------------------------------------------------------------
// Tool definition (MCP SDK registration)
// ---------------------------------------------------------------------------

export const findDocsTool = {
  name: 'find_docs',
  description:
    'Discover docs by concept/keyword (concept mode, ranked), or enumerate the full ' +
    'catalog (list mode, paginated). Supersedes get_documentation_map.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      concept: {
        type: 'string',
        description: 'Concept/keyword to search (concept mode). Returns ranked matches.',
      },
      list: {
        type: 'boolean',
        description:
          'List/catalog mode: enumerate all docs paginated. Pass true with optional cursor + limit.',
      },
      cursor: {
        type: 'string',
        description:
          'Pagination cursor for list mode (opaque string from previous nextCursor).',
      },
      limit: {
        type: 'number',
        description:
          `Max results per page (default ${FIND_DOCS_DEFAULT_LIMIT}). Bounded for token-limit safety.`,
      },
    },
    required: [] as string[],
  },
};

// ---------------------------------------------------------------------------
// Handler result type
// ---------------------------------------------------------------------------

export interface FindDocsHandlerResult {
  findDocs: FindDocsResult;
  metrics: {
    responseTimeMs: number;
    resultCount: number;
    mode: 'concept' | 'list' | 'empty';
  };
}

// ---------------------------------------------------------------------------
// Handler function
// ---------------------------------------------------------------------------

/**
 * Handler function for find_docs tool.
 *
 * @param queryEngine - QueryEngine instance for data access
 * @param params - Tool parameters
 * @returns FindDocs result with metrics
 */
export function handleFindDocs(
  queryEngine: QueryEngine,
  params: {
    concept?: string;
    list?: boolean;
    cursor?: string;
    limit?: number;
  },
): FindDocsHandlerResult {
  const result: QueryResult<FindDocsResult> = queryEngine.findDocs(params);

  const mode: 'concept' | 'list' | 'empty' = params.list
    ? 'list'
    : params.concept && params.concept.trim() !== ''
    ? 'concept'
    : 'empty';

  return {
    findDocs: result.data,
    metrics: {
      responseTimeMs: result.metrics.responseTimeMs,
      resultCount: result.data.data.length,
      mode,
    },
  };
}

/**
 * Create a tool handler bound to a specific QueryEngine instance.
 */
export function createFindDocsHandler(
  queryEngine: QueryEngine,
): (args: {
  concept?: string;
  list?: boolean;
  cursor?: string;
  limit?: number;
}) => FindDocsHandlerResult {
  return (args) => handleFindDocs(queryEngine, args);
}

/**
 * Format the result for MCP protocol response.
 */
export function formatMcpResponse(result: FindDocsHandlerResult): {
  content: Array<{ type: 'text'; text: string }>;
} {
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
}
