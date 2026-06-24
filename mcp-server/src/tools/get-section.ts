/**
 * get_section MCP Tool
 *
 * Returns specific document section by heading with parent context.
 * Use this for granular access to specific sections without loading entire documents.
 *
 * Spec 121, Req 5 (Section Addressing) — additive:
 *   - optional `parent` disambiguates a non-unique heading by parent context (Req 5.1)
 *   - optional `sectionId` resolves a specific occurrence, stable across
 *     heading-string drift (Req 5.2 / Finding 2)
 *   - the response Section carries `siblingHeadings`, an adjacency cue so a
 *     preamble/stub signals that substantive siblings exist (Req 5.4 / Finding 1)
 *   - a non-unique heading with NO disambiguator returns an AMBIGUOUS response
 *     listing candidate occurrences instead of silently returning the first
 *     match (Req 5.1 / Finding 3)
 *
 * Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 5.1, 5.2, 5.4
 */

import { QueryEngine, QueryResult } from '../query/QueryEngine';
import { Section } from '../models';
import { ErrorHandler, MCPError } from '../utils/error-handler';

/**
 * Tool definition for MCP SDK registration
 */
export const getSectionTool = {
  name: 'get_section',
  description:
    'Get specific document section by heading. Returns section content with parent ' +
    'context, a stable sectionId, and siblingHeadings (adjacent sections under the ' +
    'same parent — a cue that more may exist). For a heading that occurs more than ' +
    'once, pass "parent" or "sectionId" to disambiguate; otherwise the response ' +
    'lists the candidate occurrences. RULE: when retrieving a multi-section logical ' +
    'unit, call get_document_summary first (summary-first) so sibling sections are ' +
    'discoverable rather than silently omitted.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      path: {
        type: 'string',
        description: 'Document path (e.g., ".kiro/steering/Component Development Guide.md")'
      },
      heading: {
        type: 'string',
        description: 'Section heading to retrieve (e.g., "Token Selection Decision Framework")'
      },
      parent: {
        type: 'string',
        description:
          'Optional. Parent heading context to disambiguate a non-unique heading ' +
          '(the occurrence whose parent heading matches this value).'
      },
      sectionId: {
        type: 'string',
        description:
          'Optional. Stable section ID (e.g., "s7") to address a specific occurrence. ' +
          'Stable across heading-string rewording; takes precedence over heading/parent.'
      }
    },
    // Back-compat: heading remains "required" in the documented contract, but a
    // sectionId-only call is honored by the handler (heading is ignored when a
    // sectionId resolves). Keeping `required` unchanged avoids a schema break.
    required: ['path', 'heading'] as string[]
  }
};

/**
 * Tool handler result type
 */
export interface GetSectionResult {
  /** The section data */
  section: Section;
  /** Performance metrics */
  metrics: {
    responseTimeMs: number;
    tokenCount: number;
  };
}

/**
 * Error result type for SectionNotFound and FileNotFound errors
 */
export interface GetSectionError {
  error: MCPError;
}

/**
 * Ambiguous-heading result (Spec 121 Req 5.1 / Finding 3).
 *
 * Returned when a heading occurs more than once and no `parent`/`sectionId`
 * disambiguator resolves it to a single occurrence. This is NOT an error — it
 * is a "needs disambiguation" signal that lists the candidate occurrences so
 * the agent can re-call with `parent` or `sectionId`, rather than silently
 * receiving the first match.
 */
export interface GetSectionAmbiguous {
  ambiguous: {
    path: string;
    heading: string;
    message: string;
    candidates: Array<{ sectionId: string; parent: string | null; index: number }>;
  };
}

/**
 * Args accepted by the handler (Req 5 additive params optional).
 */
export interface GetSectionArgs {
  path: string;
  heading: string;
  parent?: string;
  sectionId?: string;
}

/**
 * Handler function for get_section tool
 *
 * @param queryEngine - QueryEngine instance for data access
 * @param args - { path, heading, parent?, sectionId? }
 * @param errorHandler - Optional error handler for logging
 * @returns Section with metrics, an ambiguity signal, or an error
 *
 * Requirements:
 * - 4.1: Return only the requested section's content
 * - 4.2: Include parent heading context to show document location
 * - 4.3: Include token count for the section
 * - 4.4: Use mechanical parsing to identify section boundaries by heading structure
 * - 4.5: Log performance metrics (response time, section extraction time, token count)
 * - 4.6: Return error with clear message and suggest similar headings for non-existent sections
 * - 5.1: Disambiguate non-unique headings by parent / sectionId; signal ambiguity otherwise
 * - 5.2: Stable sectionId resolves across heading-string drift
 * - 5.4: Return siblingHeadings adjacency cue
 */
export function handleGetSection(
  queryEngine: QueryEngine,
  args: GetSectionArgs,
  errorHandler?: ErrorHandler
): GetSectionResult | GetSectionError | GetSectionAmbiguous;
/**
 * Back-compat positional overload: handleGetSection(qe, path, heading, errorHandler?).
 * Preserved so existing callers (integration tests, external consumers) keep
 * working unchanged. New code should pass a GetSectionArgs object to use the
 * Req 5 `parent`/`sectionId` params.
 */
export function handleGetSection(
  queryEngine: QueryEngine,
  path: string,
  heading: string,
  errorHandler?: ErrorHandler
): GetSectionResult | GetSectionError | GetSectionAmbiguous;
export function handleGetSection(
  queryEngine: QueryEngine,
  argsOrPath: GetSectionArgs | string,
  headingOrErrorHandler?: string | ErrorHandler,
  maybeErrorHandler?: ErrorHandler
): GetSectionResult | GetSectionError | GetSectionAmbiguous {
  // Normalize the two call shapes.
  let args: GetSectionArgs;
  let errorHandler: ErrorHandler | undefined;
  if (typeof argsOrPath === 'string') {
    args = { path: argsOrPath, heading: headingOrErrorHandler as string };
    errorHandler = maybeErrorHandler;
  } else {
    args = argsOrPath;
    errorHandler = headingOrErrorHandler as ErrorHandler | undefined;
  }

  const { path, heading, parent, sectionId } = args;
  try {
    const result: QueryResult<Section> = queryEngine.getSection(path, heading, {
      parent,
      sectionId,
    });

    return {
      section: result.data,
      metrics: {
        responseTimeMs: result.metrics.responseTimeMs,
        tokenCount: result.data.tokenCount
      }
    };
  } catch (error) {
    if (error instanceof Error) {
      const errorType = (error as any).errorType;

      // Handle AmbiguousHeading (Finding 3) — NOT an error response; a
      // structured "needs disambiguation" signal listing candidate occurrences.
      if (errorType === 'AmbiguousHeading') {
        return {
          ambiguous: {
            path,
            heading,
            message: error.message,
            candidates: (error as any).candidates || [],
          },
        };
      }

      const handler = errorHandler || new ErrorHandler();

      // Handle SectionNotFound errors
      if (errorType === 'SectionNotFound' || error.message.includes('section') || error.message.includes('heading')) {
        const mcpError = handler.handleSectionNotFound(
          path,
          heading,
          (error as any).availableHeadings || (error as any).suggestions || []
        );
        return { error: mcpError };
      }

      // Handle InvalidParameter errors - treat as SectionNotFound for user-facing response
      if (errorType === 'InvalidParameter') {
        const mcpError = handler.handleSectionNotFound(
          path,
          heading,
          (error as any).suggestions || []
        );
        // Override message with the original validation error message
        mcpError.message = error.message;
        return { error: mcpError };
      }

      // Handle FileNotFound errors
      if (errorType === 'FileNotFound' || error.message.includes('not found')) {
        const mcpError = handler.handleFileNotFound(path, (error as any).suggestions || []);
        return { error: mcpError };
      }
    }

    // Re-throw unexpected errors
    throw error;
  }
}

/**
 * Type guard to check if result is an error
 */
export function isGetSectionError(
  result: GetSectionResult | GetSectionError | GetSectionAmbiguous
): result is GetSectionError {
  return 'error' in result;
}

/**
 * Type guard to check if result is an ambiguity signal (Req 5.1 / Finding 3)
 */
export function isGetSectionAmbiguous(
  result: GetSectionResult | GetSectionError | GetSectionAmbiguous
): result is GetSectionAmbiguous {
  return 'ambiguous' in result;
}

/**
 * Create a tool handler bound to a specific QueryEngine instance
 *
 * This factory function creates a handler that can be registered with the MCP SDK.
 * The handler captures the QueryEngine instance in its closure.
 *
 * @param queryEngine - QueryEngine instance for data access
 * @param errorHandler - Optional error handler for logging
 * @returns Handler function for MCP SDK registration
 */
export function createGetSectionHandler(
  queryEngine: QueryEngine,
  errorHandler?: ErrorHandler
): (args: GetSectionArgs) => GetSectionResult | GetSectionError | GetSectionAmbiguous {
  return (args: GetSectionArgs) =>
    handleGetSection(queryEngine, args, errorHandler);
}

/**
 * Format the result for MCP protocol response
 *
 * Converts the internal result format to the MCP protocol response format.
 *
 * @param result - Internal result from handler
 * @returns MCP protocol formatted response
 */
export function formatMcpResponse(
  result: GetSectionResult | GetSectionError | GetSectionAmbiguous
): {
  content: Array<{ type: 'text'; text: string }>;
  isError?: boolean;
} {
  if (isGetSectionError(result)) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result.error, null, 2)
        }
      ],
      isError: true
    };
  }

  // Ambiguity signal is NOT an error — it is a structured disambiguation prompt.
  // Returned without isError so the agent re-calls with parent/sectionId.
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(result, null, 2)
      }
    ]
  };
}
