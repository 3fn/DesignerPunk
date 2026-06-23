/**
 * find_docs tool — pinned shape test (Spec 121 Task 3.3)
 *
 * SUPERSEDE NOTE: get_documentation_map was removed in Spec 121 Task 3.3.
 * This file previously tested get_documentation_map. It is rewritten to target
 * find_docs (list mode + concept mode), which fully subsumes get_documentation_map's
 * capability. This is an explicit supersede, NOT a silent mutation.
 *
 * What changed:
 *   - Old: tested getDocumentationMapTool, handleGetDocumentationMap,
 *          createGetDocumentationMapHandler from './get-documentation-map'
 *   - New: tests findDocsTool, handleFindDocs, createFindDocsHandler,
 *          formatMcpResponse from './find-docs'
 *
 * Capability parity with get_documentation_map:
 *   - get_documentation_map returned ALL docs in one (oversized, ~78K) response.
 *   - find_docs list mode returns the same corpus across bounded paginated calls.
 *   - find_docs concept mode adds keyword discovery (new capability, not in the map).
 *
 * Requirements: 4.1, 4.2, 4.3
 */

import {
  findDocsTool,
  handleFindDocs,
  createFindDocsHandler,
  formatMcpResponse,
  FindDocsHandlerResult,
  FindDocsResult,
  FIND_DOCS_DEFAULT_LIMIT,
} from '../find-docs';
import { QueryEngine, QueryResult } from '../../query/QueryEngine';

// ---------------------------------------------------------------------------
// Mock helpers
// ---------------------------------------------------------------------------

/**
 * Build a mock QueryEngine whose findDocs returns the supplied FindDocsResult.
 */
const createMockQueryEngine = (mockResult: FindDocsResult): QueryEngine => {
  return {
    findDocs: jest.fn().mockReturnValue({
      data: mockResult,
      metrics: {
        operation: 'find_docs',
        responseTimeMs: 12,
      },
    } as QueryResult<FindDocsResult>),
  } as unknown as QueryEngine;
};

// ---------------------------------------------------------------------------
// Fixture data
// ---------------------------------------------------------------------------

const listResultFixture: FindDocsResult = {
  data: [
    {
      path: '.kiro/steering/00-Steering.md',
      summary: 'Meta-guide. Sections: Overview. Layer: 0',
      owner: 'Thurgood',
      matchedOn: [],
    },
    {
      path: '.kiro/steering/Process-Spec-Planning.md',
      summary: 'Spec planning standards. Sections: Requirements Document Format, Design Document Format. Layer: 2',
      owner: 'Thurgood',
      matchedOn: [],
    },
  ],
  error: null,
  nextCursor: '2',
};

const conceptResultFixture: FindDocsResult = {
  data: [
    {
      path: '.kiro/steering/Process-Spec-Planning.md',
      summary: 'Spec planning standards. Sections: Requirements Document Format, Design Document Format. Layer: 2',
      owner: 'Thurgood',
      matchedOn: ['purpose:spec', 'purpose:planning'],
      rank: 1,
    },
  ],
  error: null,
};

const emptyConceptFixture: FindDocsResult = {
  data: [],
  error: null,
  matchConfidence: 'none',
};

// ---------------------------------------------------------------------------
// Tests: tool definition
// ---------------------------------------------------------------------------

describe('find_docs tool (supersedes get_documentation_map)', () => {
  describe('tool definition', () => {
    it('should have name find_docs', () => {
      expect(findDocsTool.name).toBe('find_docs');
    });

    it('should have a description mentioning supersede', () => {
      expect(findDocsTool.description).toBeTruthy();
      expect(typeof findDocsTool.description).toBe('string');
      expect(findDocsTool.description.toLowerCase()).toContain('supersede');
    });

    it('should have optional concept, list, cursor, limit parameters', () => {
      const schema = findDocsTool.inputSchema;
      expect(schema.type).toBe('object');
      expect(schema.properties.concept).toBeDefined();
      expect(schema.properties.list).toBeDefined();
      expect(schema.properties.cursor).toBeDefined();
      expect(schema.properties.limit).toBeDefined();
      // All params optional — required array is empty
      expect(schema.required).toEqual([]);
    });

    it('should have a bounded default limit constant', () => {
      expect(FIND_DOCS_DEFAULT_LIMIT).toBeGreaterThan(0);
      // Default must be small enough to stay well within MCP token limits
      // (Finding 10 was ~78K chars for the full corpus — one page must not replicate that)
      expect(FIND_DOCS_DEFAULT_LIMIT).toBeLessThanOrEqual(50);
    });
  });

  // ---------------------------------------------------------------------------
  // Tests: list/catalog mode (subsumes map capability)
  // ---------------------------------------------------------------------------

  describe('handleFindDocs — list/catalog mode', () => {
    it('should return entries from the paginated doc set', () => {
      const mockQE = createMockQueryEngine(listResultFixture);
      const result = handleFindDocs(mockQE, { list: true });

      expect(result.findDocs.data).toHaveLength(2);
      expect(result.findDocs.error).toBeNull();
    });

    it('should call queryEngine.findDocs with list: true', () => {
      const mockQE = createMockQueryEngine(listResultFixture);
      handleFindDocs(mockQE, { list: true });

      expect(mockQE.findDocs).toHaveBeenCalledWith({ list: true });
    });

    it('should include pagination cursor when more pages exist', () => {
      const mockQE = createMockQueryEngine(listResultFixture);
      const result = handleFindDocs(mockQE, { list: true });

      expect(result.findDocs.nextCursor).toBe('2');
    });

    it('should NOT include matchConfidence on list mode results (deterministic catalog)', () => {
      const mockQE = createMockQueryEngine(listResultFixture);
      const result = handleFindDocs(mockQE, { list: true });

      // List mode is unranked enumeration — no matchConfidence tier
      expect(result.findDocs.matchConfidence).toBeUndefined();
    });

    it('should emit empty matchedOn arrays for list mode entries (unranked)', () => {
      const mockQE = createMockQueryEngine(listResultFixture);
      const result = handleFindDocs(mockQE, { list: true });

      for (const entry of result.findDocs.data) {
        expect(entry.matchedOn).toEqual([]);
      }
    });

    it('each entry path should be resolvable via get_section/get_document_summary (P6)', () => {
      const mockQE = createMockQueryEngine(listResultFixture);
      const result = handleFindDocs(mockQE, { list: true });

      // Composition property: every path is a valid doc path string
      for (const entry of result.findDocs.data) {
        expect(typeof entry.path).toBe('string');
        expect(entry.path.length).toBeGreaterThan(0);
        // Paths should look like relative steering doc paths
        expect(entry.path).toMatch(/\.md$/);
      }
    });

    it('should include performance metrics', () => {
      const mockQE = createMockQueryEngine(listResultFixture);
      const result = handleFindDocs(mockQE, { list: true });

      expect(result.metrics.responseTimeMs).toBe(12);
      expect(result.metrics.resultCount).toBe(2);
      expect(result.metrics.mode).toBe('list');
    });

    it('should forward cursor and limit to queryEngine.findDocs', () => {
      const mockQE = createMockQueryEngine(listResultFixture);
      handleFindDocs(mockQE, { list: true, cursor: '20', limit: 10 });

      expect(mockQE.findDocs).toHaveBeenCalledWith({
        list: true,
        cursor: '20',
        limit: 10,
      });
    });

    it('entry shape should include required fields: path, summary, owner, matchedOn', () => {
      const mockQE = createMockQueryEngine(listResultFixture);
      const result = handleFindDocs(mockQE, { list: true });

      for (const entry of result.findDocs.data) {
        expect(typeof entry.path).toBe('string');
        expect(typeof entry.summary).toBe('string');
        expect(typeof entry.owner).toBe('string');
        expect(Array.isArray(entry.matchedOn)).toBe(true);
      }
    });
  });

  // ---------------------------------------------------------------------------
  // Tests: concept search mode
  // ---------------------------------------------------------------------------

  describe('handleFindDocs — concept search mode', () => {
    it('should return ranked results for a matching concept', () => {
      const mockQE = createMockQueryEngine(conceptResultFixture);
      const result = handleFindDocs(mockQE, { concept: 'spec planning' });

      expect(result.findDocs.data).toHaveLength(1);
      expect(result.findDocs.data[0].path).toBe('.kiro/steering/Process-Spec-Planning.md');
      expect(result.findDocs.error).toBeNull();
    });

    it('should include matchedOn evidence on concept results', () => {
      const mockQE = createMockQueryEngine(conceptResultFixture);
      const result = handleFindDocs(mockQE, { concept: 'spec planning' });

      expect(result.findDocs.data[0].matchedOn.length).toBeGreaterThan(0);
    });

    it('should include rank on concept results', () => {
      const mockQE = createMockQueryEngine(conceptResultFixture);
      const result = handleFindDocs(mockQE, { concept: 'spec planning' });

      expect(result.findDocs.data[0].rank).toBe(1);
    });

    it('metrics mode should be concept', () => {
      const mockQE = createMockQueryEngine(conceptResultFixture);
      const result = handleFindDocs(mockQE, { concept: 'spec planning' });

      expect(result.metrics.mode).toBe('concept');
    });

    // Pinned empty contract — Decision 2 / Req 1.2
    it('no-match should return { data: [], error: null, matchConfidence: "none" }', () => {
      const mockQE = createMockQueryEngine(emptyConceptFixture);
      const result = handleFindDocs(mockQE, { concept: 'xyzzy-nonexistent-concept' });

      expect(result.findDocs.data).toEqual([]);
      expect(result.findDocs.error).toBeNull();
      // matchConfidence: 'none' is the explicit "no matches" indicator (Req 1.2)
      expect(result.findDocs.matchConfidence).toBe('none');
    });

    it('no-match should NOT set isError (empty ≠ failure)', () => {
      const mockQE = createMockQueryEngine(emptyConceptFixture);
      const mcpResponse = formatMcpResponse(
        handleFindDocs(mockQE, { concept: 'xyzzy-nonexistent-concept' })
      );

      // MCP protocol: isError absent means success even when data is empty
      expect((mcpResponse as any).isError).toBeFalsy();
    });
  });

  // ---------------------------------------------------------------------------
  // Tests: createFindDocsHandler factory
  // ---------------------------------------------------------------------------

  describe('createFindDocsHandler', () => {
    it('should create a handler bound to the QueryEngine', () => {
      const mockQE = createMockQueryEngine(listResultFixture);
      const handler = createFindDocsHandler(mockQE);

      expect(typeof handler).toBe('function');

      const result = handler({ list: true });
      expect(result.findDocs.data).toHaveLength(2);
    });
  });

  // ---------------------------------------------------------------------------
  // Tests: formatMcpResponse
  // ---------------------------------------------------------------------------

  describe('formatMcpResponse', () => {
    it('should produce valid MCP protocol content', () => {
      const handlerResult: FindDocsHandlerResult = {
        findDocs: listResultFixture,
        metrics: { responseTimeMs: 12, resultCount: 2, mode: 'list' },
      };

      const mcpResponse = formatMcpResponse(handlerResult);

      expect(mcpResponse.content).toHaveLength(1);
      expect(mcpResponse.content[0].type).toBe('text');
      expect(typeof mcpResponse.content[0].text).toBe('string');
    });

    it('should serialize findDocs and metrics into valid JSON', () => {
      const handlerResult: FindDocsHandlerResult = {
        findDocs: listResultFixture,
        metrics: { responseTimeMs: 12, resultCount: 2, mode: 'list' },
      };

      const mcpResponse = formatMcpResponse(handlerResult);
      const parsed = JSON.parse(mcpResponse.content[0].text);

      expect(parsed.findDocs).toBeDefined();
      expect(parsed.metrics).toBeDefined();
      expect(parsed.findDocs.data).toHaveLength(2);
      expect(parsed.findDocs.error).toBeNull();
    });

    it('should serialize empty contract correctly', () => {
      const handlerResult: FindDocsHandlerResult = {
        findDocs: emptyConceptFixture,
        metrics: { responseTimeMs: 5, resultCount: 0, mode: 'concept' },
      };

      const mcpResponse = formatMcpResponse(handlerResult);
      const parsed = JSON.parse(mcpResponse.content[0].text);

      expect(parsed.findDocs.data).toEqual([]);
      expect(parsed.findDocs.error).toBeNull();
      expect(parsed.findDocs.matchConfidence).toBe('none');
    });
  });

  // ---------------------------------------------------------------------------
  // Tests: token-limit safety (structural fix for Finding 10)
  // ---------------------------------------------------------------------------

  describe('page size bounds (Finding 10 — structural fix)', () => {
    it('default limit should constrain response size well below MCP token limits', () => {
      // The original get_documentation_map returned ~78K chars. Each find_docs page
      // entry is approximately 200-400 chars. At the default limit of 20 entries:
      // ~20 * 400 = 8 000 chars — well below any MCP token ceiling.
      const approxMaxCharsPerEntry = 500;
      const approxPageSizeChars = FIND_DOCS_DEFAULT_LIMIT * approxMaxCharsPerEntry;

      // Must be < 20 000 chars (comfortable margin below typical MCP limits)
      expect(approxPageSizeChars).toBeLessThan(20_000);
    });
  });
});
