#!/usr/bin/env node
/**
 * MCP Documentation Server Entry Point
 * 
 * Provides on-demand documentation querying to reduce AI agent context load.
 * Uses mechanical parsing (not AI interpretation) to extract document structure.
 * 
 * Features:
 * - 8 MCP tools for documentation querying (find_docs supersedes get_documentation_map)
 * - File watching for automatic re-indexing
 * - Progressive disclosure (find_docs → summary → section)
 * - Token-efficient responses
 * 
 * Requirements: 1.1, 10.5, 15.1
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { DocumentIndexer } from './indexer/DocumentIndexer';
import { QueryEngine, QueryMetrics } from './query/QueryEngine';
import { FileWatcher } from './watcher/FileWatcher';
import { StalenessGate, isImmutableContext } from './staleness/StalenessGate';

// Import tool definitions and handlers
import {
  findDocsTool,
  handleFindDocs,
  formatFindDocsResponse,
  getDocumentSummaryTool,
  handleGetDocumentSummary,
  formatGetDocumentSummaryResponse,
  getDocumentFullTool,
  handleGetDocumentFull,
  formatGetDocumentFullResponse,
  getSectionTool,
  handleGetSection,
  formatGetSectionResponse,
  listCrossReferencesTool,
  handleListCrossReferences,
  formatListCrossReferencesResponse,
  validateMetadataTool,
  handleValidateMetadata,
  formatValidateMetadataResponse,
  getIndexHealthTool,
  handleGetIndexHealth,
  formatGetIndexHealthResponse,
  rebuildIndexTool,
  handleRebuildIndex,
  formatRebuildIndexResponse,
} from './tools';

// Server configuration
const SERVER_NAME = 'mcp-documentation-server';
const SERVER_VERSION = '0.1.0';
const DEFAULT_STEERING_DIR = 'governance/';
const DEFAULT_LOGS_DIR = 'mcp-server/logs';

/**
 * MCP Documentation Server
 * 
 * Manages the MCP server lifecycle including:
 * - Server initialization
 * - Tool registration
 * - Document indexing
 * - File watching
 * - Graceful shutdown
 */
const STALENESS_EXEMPT_TOOLS = new Set(['get_index_health', 'rebuild_index']);

class MCPDocumentationServer {
  private server: Server;
  private indexer: DocumentIndexer;
  private queryEngine: QueryEngine;
  private fileWatcher: FileWatcher;
  private stalenessGate: StalenessGate;
  private steeringDirectory: string;
  private isRunning: boolean = false;

  constructor(steeringDirectory: string = DEFAULT_STEERING_DIR) {
    this.steeringDirectory = steeringDirectory;

    // Initialize DocumentIndexer with logs directory
    this.indexer = new DocumentIndexer(DEFAULT_LOGS_DIR);

    // Initialize QueryEngine with metrics logging
    this.queryEngine = new QueryEngine(this.indexer, this.logMetrics.bind(this));

    // Initialize FileWatcher
    this.fileWatcher = new FileWatcher(this.indexer, this.steeringDirectory);

    // Initialize StalenessGate
    this.stalenessGate = new StalenessGate({
      dataDirs: [this.steeringDirectory],
      fileExtensions: ['.md'],
      isImmutable: isImmutableContext(this.steeringDirectory),
      onRebuild: async () => {
        await this.indexer.indexDirectory(this.steeringDirectory);
      },
    });

    // Initialize MCP Server
    this.server = new Server(
      {
        name: SERVER_NAME,
        version: SERVER_VERSION,
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    // Register request handlers
    this.registerHandlers();

    // Set up error handling
    this.server.onerror = (error) => {
      console.error('[MCP Server Error]', error);
    };
  }

  /**
   * Register all MCP tool handlers
   */
  private registerHandlers(): void {
    // Register tools list handler
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        findDocsTool,
        getDocumentSummaryTool,
        getDocumentFullTool,
        getSectionTool,
        listCrossReferencesTool,
        validateMetadataTool,
        getIndexHealthTool,
        rebuildIndexTool,
      ],
    }));

    // Register tool call handler
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      // Staleness gate — check before data-returning tools
      if (!STALENESS_EXEMPT_TOOLS.has(name)) {
        await this.stalenessGate.checkAndRebuildIfNeeded();
      }

      try {
        switch (name) {
          case 'find_docs': {
            const params = args as {
              concept?: string;
              list?: boolean;
              cursor?: string;
              limit?: number;
            };
            const result = handleFindDocs(this.queryEngine, params);
            return formatFindDocsResponse(result);
          }

          case 'get_document_summary': {
            const params = args as { path: string };
            const result = handleGetDocumentSummary(
              this.queryEngine,
              params.path
            );
            return formatGetDocumentSummaryResponse(result);
          }

          case 'get_document_full': {
            const params = args as { path: string };
            const result = handleGetDocumentFull(
              this.queryEngine,
              params.path
            );
            return formatGetDocumentFullResponse(result);
          }

          case 'get_section': {
            const params = args as {
              path: string;
              heading: string;
              parent?: string;
              sectionId?: string;
            };
            const result = handleGetSection(this.queryEngine, {
              path: params.path,
              heading: params.heading,
              parent: params.parent,
              sectionId: params.sectionId,
            });
            return formatGetSectionResponse(result);
          }

          case 'list_cross_references': {
            const params = args as { path: string };
            const result = handleListCrossReferences(
              this.queryEngine,
              params.path
            );
            return formatListCrossReferencesResponse(result);
          }

          case 'validate_metadata': {
            const params = args as { path: string };
            const result = handleValidateMetadata(
              this.queryEngine,
              params.path
            );
            return formatValidateMetadataResponse(result);
          }

          case 'get_index_health': {
            const result = handleGetIndexHealth(this.queryEngine);
            return formatGetIndexHealthResponse(result);
          }

          case 'rebuild_index': {
            const result = await handleRebuildIndex(this.queryEngine);
            this.stalenessGate.markIndexed();
            return formatRebuildIndexResponse(result);
          }

          default:
            return {
              content: [
                {
                  type: 'text' as const,
                  text: JSON.stringify({
                    error: 'UnknownTool',
                    message: `Unknown tool: ${name}`,
                    availableTools: [
                      'find_docs',
                      'get_document_summary',
                      'get_document_full',
                      'get_section',
                      'list_cross_references',
                      'validate_metadata',
                      'get_index_health',
                      'rebuild_index',
                    ],
                  }),
                },
              ],
              isError: true,
            };
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify({
                error: 'ToolExecutionError',
                message: errorMessage,
              }),
            },
          ],
          isError: true,
        };
      }
    });
  }

  /**
   * Log performance metrics
   */
  private logMetrics(metrics: QueryMetrics): void {
    const timestamp = new Date().toISOString();
    console.error(
      `[${timestamp}] [Metrics] ${metrics.operation}: ${metrics.responseTimeMs}ms`,
      metrics.tokenCounts ? `tokens=${JSON.stringify(metrics.tokenCounts)}` : ''
    );
  }

  /**
   * Start the MCP server
   */
  async start(): Promise<void> {
    if (this.isRunning) {
      console.error('[MCP Server] Already running');
      return;
    }

    console.error(`[MCP Server] Starting ${SERVER_NAME} v${SERVER_VERSION}`);

    // Index documentation directory
    console.error(`[MCP Server] Indexing ${this.steeringDirectory}...`);
    try {
      await this.indexer.indexDirectory(this.steeringDirectory);
      this.stalenessGate.markIndexed();
      console.error('[MCP Server] Indexing complete');
    } catch (error) {
      console.error('[MCP Server] Indexing failed:', error);
      // Continue anyway - server can still respond with errors
    }

    // Start file watcher
    console.error('[MCP Server] Starting file watcher...');
    try {
      this.fileWatcher.start();
      console.error('[MCP Server] File watcher started');
    } catch (error) {
      console.error('[MCP Server] File watcher failed to start:', error);
      // Continue anyway - server can still work without file watching
    }

    // Connect to stdio transport
    const transport = new StdioServerTransport();
    await this.server.connect(transport);

    this.isRunning = true;
    console.error('[MCP Server] Server started and listening');

    // Set up graceful shutdown
    this.setupShutdownHandlers();
  }

  /**
   * Stop the MCP server
   */
  async stop(): Promise<void> {
    if (!this.isRunning) {
      return;
    }

    console.error('[MCP Server] Shutting down...');

    // Stop file watcher
    this.fileWatcher.stop();
    console.error('[MCP Server] File watcher stopped');

    // Close server connection
    await this.server.close();
    console.error('[MCP Server] Server stopped');

    this.isRunning = false;
  }

  /**
   * Set up graceful shutdown handlers
   */
  private setupShutdownHandlers(): void {
    const shutdown = async () => {
      await this.stop();
      process.exit(0);
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
  }
}

/**
 * Shared data-root resolution (Spec 121 F-C2 patch).
 *
 * Single source of truth: src/cli/shared/mcpDataRoots.ts (root package). Consumed
 * via the ROOT-COMPILED dist artifact — a static TS import would cross this
 * sub-package's tsc rootDir boundary (see that file's "CONSUMPTION CONTRACT").
 * The esbuild bundle (dist/mcp/docs-mcp.js) inlines the require at build time;
 * the tsc artifact (mcp-server/dist/index.js) resolves it at runtime.
 * Types are declared locally (shape-only, no logic) so the sub-package typecheck
 * has no dependency on the root dist being built.
 */
interface ResolvedDataRoot {
  path: string;
  source: 'env' | 'cwd' | 'package';
}
interface McpDataRootsModule {
  resolvePackageRoot(fromDir: string): string;
  resolvePackageOwnedRoot(opts: {
    envValue?: string;
    packageRoot: string;
    relPath: string;
  }): ResolvedDataRoot;
  resolveConsumerOwnedRoot(opts: {
    envValue?: string;
    relPath: string;
    packageRoot?: string;
  }): ResolvedDataRoot;
}

// Main entry point
async function main(): Promise<void> {
  // Resolve the steering data root (Spec 121 F-C2): PACKAGE-OWNED — env var →
  // package-relative. The governance corpus ships with the package; a consumer's
  // coincidental cwd `governance/` dir is not it. Absolute path required by
  // FileWatcher + StalenessGate (its /node_modules/ check needs absolute paths).
  let steeringDir: string = process.env.MCP_STEERING_DIR || DEFAULT_STEERING_DIR;
  try {
    const shared = require('../../dist/cli/shared/mcpDataRoots') as McpDataRootsModule;
    const packageRoot = shared.resolvePackageRoot(__dirname);
    const steering = shared.resolvePackageOwnedRoot({
      envValue: process.env.MCP_STEERING_DIR,
      packageRoot,
      relPath: DEFAULT_STEERING_DIR,
    });
    steeringDir = steering.path;
    console.error(`[MCP Server] Data root steering: ${steering.path} (source: ${steering.source})`);
  } catch {
    // Root dist not built (dev-repo edge; in-repo cwd == package root, so the
    // legacy cwd-relative default still lands on the right corpus).
    console.error(
      '[MCP Server] WARNING: shared data-root resolution unavailable (root dist not built?) — using legacy env/cwd-relative steering dir'
    );
  }

  const server = new MCPDocumentationServer(steeringDir);
  await server.start();
}

// Run the server
main().catch((error) => {
  console.error('[MCP Server] Fatal error:', error);
  process.exit(1);
});

// Export for testing
export { MCPDocumentationServer };

// Spec 121 Req 5.5: re-export the machine-consumable workflow-rule artifact so
// the agent generator (Spec 122) can import and propagate it (esp. summary-first)
// into generated agent prompts from a single source of truth.
export {
  WORKFLOW_RULES,
  getWorkflowRule,
  workflowRulesForTool,
  type WorkflowRule,
  type WorkflowRuleSeverity,
  type WorkflowRuleAudience,
} from './rules/workflow-rules';
