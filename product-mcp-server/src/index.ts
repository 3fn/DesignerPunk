#!/usr/bin/env node
/**
 * Product MCP Server Entry Point
 *
 * Serves product architecture as queryable structured data:
 * product overview, experience map, domain objects, product templates.
 *
 * @see .kiro/specs/081-product-mcp-design/design.md
 */

import * as fs from 'fs';
import * as path from 'path';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

const SERVER_NAME = 'mcp-product-server';
const SERVER_VERSION = '0.1.0';
const DEFAULT_PRODUCT_DIR = 'product';

const tools = [
  {
    name: 'get_product_overview',
    description: 'Get product context, configuration, and principles.',
    inputSchema: { type: 'object' as const, properties: {} },
  },
  {
    name: 'list_experience_map',
    description: 'List all verticals, flows, and feature pages with type, name, and per-platform status.',
    inputSchema: { type: 'object' as const, properties: {} },
  },
  {
    name: 'get_screen_spec',
    description: 'Get full spec for a screen (UI tree, state model, data sources, accessibility, status). Optional platform filter.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        name: { type: 'string', description: 'Screen name' },
        platform: { type: 'string', description: 'Optional platform filter (web, ios, android)' },
      },
      required: ['name'],
    },
  },
  {
    name: 'get_domain_object',
    description: 'Get domain object definition and list of screens that reference it.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        name: { type: 'string', description: 'Domain object name' },
      },
      required: ['name'],
    },
  },
  {
    name: 'list_product_templates',
    description: 'List all product-specific layout and content patterns.',
    inputSchema: { type: 'object' as const, properties: {} },
  },
  {
    name: 'get_product_health',
    description: 'Get index status, data counts, last index time, and warnings.',
    inputSchema: { type: 'object' as const, properties: {} },
  },
  {
    name: 'rebuild_product_index',
    description: 'Re-index all product data. Returns new health status.',
    inputSchema: { type: 'object' as const, properties: {} },
  },
];

class ProductMCPServer {
  private server: Server;
  private productDir: string;
  private indexed: boolean = false;
  private lastIndexTime: string = '';
  private warnings: string[] = [];

  // Data stores — populated by indexer (Task 2.2)
  private overview: Record<string, unknown> | null = null;
  private experienceMap: Array<Record<string, unknown>> = [];
  private screenSpecs: Map<string, Record<string, unknown>> = new Map();
  private domainObjects: Map<string, Record<string, unknown>> = new Map();
  private templates: Array<Record<string, unknown>> = [];

  constructor(productDir: string = DEFAULT_PRODUCT_DIR) {
    this.productDir = productDir;
    this.server = new Server(
      { name: SERVER_NAME, version: SERVER_VERSION },
      { capabilities: { tools: {} } }
    );
    this.registerHandlers();
  }

  async start(): Promise<void> {
    if (fs.existsSync(this.productDir)) {
      await this.indexProductData();
    } else {
      console.error(`[${SERVER_NAME}] Product directory not found: ${this.productDir} — starting with empty data`);
    }

    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error(`[${SERVER_NAME}] Server running on stdio`);
  }

  async indexProductData(): Promise<void> {
    this.warnings = [];
    // Indexing logic implemented in Task 2.2
    this.indexed = true;
    this.lastIndexTime = new Date().toISOString();
    console.error(`[${SERVER_NAME}] Indexed product data from ${this.productDir}`);
  }

  private registerHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: params = {} } = request.params;

      try {
        const result = await this.handleTool(name, params);
        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return { content: [{ type: 'text' as const, text: JSON.stringify({ error: message }) }] };
      }
    });
  }

  private async handleTool(name: string, params: Record<string, unknown>): Promise<unknown> {
    switch (name) {
      case 'get_product_overview':
        return this.overview || { message: 'No product data indexed' };

      case 'list_experience_map':
        return this.experienceMap;

      case 'get_screen_spec': {
        const screenName = params.name as string;
        const spec = this.screenSpecs.get(screenName);
        if (!spec) return { error: `Screen '${screenName}' not found` };
        // Platform filtering implemented in Task 2.3
        return spec;
      }

      case 'get_domain_object': {
        const objName = params.name as string;
        const obj = this.domainObjects.get(objName);
        if (!obj) return { error: `Domain object '${objName}' not found` };
        return obj;
      }

      case 'list_product_templates':
        return this.templates;

      case 'get_product_health':
        return {
          status: this.indexed ? 'healthy' : 'empty',
          indexed: this.indexed,
          lastIndexTime: this.lastIndexTime,
          counts: {
            screens: this.screenSpecs.size,
            domainObjects: this.domainObjects.size,
            templates: this.templates.length,
          },
          warnings: this.warnings,
        };

      case 'rebuild_product_index':
        if (fs.existsSync(this.productDir)) {
          await this.indexProductData();
        }
        return this.handleTool('get_product_health', {});

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }
}

// Start server
const productDir = process.env.PRODUCT_DIR || DEFAULT_PRODUCT_DIR;
const server = new ProductMCPServer(productDir);
server.start().catch((err) => {
  console.error(`[${SERVER_NAME}] Fatal error:`, err);
  process.exit(1);
});
