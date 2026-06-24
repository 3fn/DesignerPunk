/**
 * MCP Tools Index
 *
 * Exports all MCP tool definitions and handlers for registration with the MCP server.
 *
 * NOTE: get_documentation_map was removed in Spec 121 Task 3.3.
 * It is superseded by find_docs (concept search + paginated list/catalog mode).
 */

// find_docs tool (supersedes get_documentation_map — Spec 121 Req 4)
export {
  findDocsTool,
  handleFindDocs,
  createFindDocsHandler,
  formatMcpResponse as formatFindDocsResponse,
  FindDocsHandlerResult,
  FindDocsResult,
  FindDocsEntry,
  FIND_DOCS_DEFAULT_LIMIT,
} from './find-docs';

// get_document_summary tool
export {
  getDocumentSummaryTool,
  handleGetDocumentSummary,
  createGetDocumentSummaryHandler,
  formatMcpResponse as formatGetDocumentSummaryResponse,
  isGetDocumentSummaryError,
  GetDocumentSummaryResult,
  GetDocumentSummaryError
} from './get-document-summary';

// get_document_full tool
export {
  getDocumentFullTool,
  handleGetDocumentFull,
  createGetDocumentFullHandler,
  formatMcpResponse as formatGetDocumentFullResponse,
  isGetDocumentFullError,
  GetDocumentFullResult,
  GetDocumentFullError
} from './get-document-full';

// get_section tool
export {
  getSectionTool,
  handleGetSection,
  createGetSectionHandler,
  formatMcpResponse as formatGetSectionResponse,
  isGetSectionError,
  isGetSectionAmbiguous,
  GetSectionResult,
  GetSectionError,
  GetSectionAmbiguous,
  GetSectionArgs
} from './get-section';

// list_cross_references tool
export {
  listCrossReferencesTool,
  handleListCrossReferences,
  createListCrossReferencesHandler,
  formatMcpResponse as formatListCrossReferencesResponse,
  isListCrossReferencesError,
  ListCrossReferencesResult,
  ListCrossReferencesError
} from './list-cross-references';

// validate_metadata tool
export {
  validateMetadataTool,
  handleValidateMetadata,
  createValidateMetadataHandler,
  formatMcpResponse as formatValidateMetadataResponse,
  isValidateMetadataError,
  ValidateMetadataResult,
  ValidateMetadataError
} from './validate-metadata';

// get_index_health tool
export {
  getIndexHealthTool,
  handleGetIndexHealth,
  createGetIndexHealthHandler,
  formatMcpResponse as formatGetIndexHealthResponse,
  GetIndexHealthResult
} from './get-index-health';

// rebuild_index tool
export {
  rebuildIndexTool,
  handleRebuildIndex,
  createRebuildIndexHandler,
  formatMcpResponse as formatRebuildIndexResponse,
  RebuildIndexResult
} from './rebuild-index';

// get_health_status tool
export {
  getHealthStatusTool,
  handleGetHealthStatus,
  createGetHealthStatusHandler,
  formatMcpResponse as formatGetHealthStatusResponse,
  GetHealthStatusResult,
  ServerHealthStatus
} from './get-health-status';
