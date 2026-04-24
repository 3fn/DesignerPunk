#!/usr/bin/env node
/**
 * Product MCP Server Entry Point
 *
 * Thin server shell: MCP SDK wiring, tool definitions, and query-time response building.
 * All indexing logic lives in ProductIndexer.
 *
 * @see .kiro/specs/081-product-mcp-design/design.md
 * @see .kiro/specs/097-product-mcp-intelligence-layer/design.md
 */

import * as fs from 'fs';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { ProductIndexer } from './indexer/ProductIndexer';

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
  private indexer: ProductIndexer;

  constructor(productDir: string = DEFAULT_PRODUCT_DIR) {
    this.productDir = productDir;
    this.indexer = new ProductIndexer(productDir);
    this.server = new Server(
      { name: SERVER_NAME, version: SERVER_VERSION },
      { capabilities: { tools: {} } }
    );
    this.registerHandlers();
  }

  async start(): Promise<void> {
    if (fs.existsSync(this.productDir)) {
      await this.indexer.index();
    } else {
      console.error(`[${SERVER_NAME}] Product directory not found: ${this.productDir} — starting with empty data`);
    }

    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error(`[${SERVER_NAME}] Server running on stdio`);
  }

  // --- Query-time response building (stays in server shell) ---

  private resolveScreenSpec(spec: Record<string, unknown>, platform?: string): Record<string, unknown> {
    const resolved = platform ? this.filterPlatform(spec, platform) : { ...spec };
    const warnings: string[] = [];
    this.enrichOneOffs(resolved, warnings);
    if (warnings.length > 0) {
      (resolved as any)._warnings = warnings;
    }
    return resolved;
  }

  private filterPlatform(spec: Record<string, unknown>, platform: string): Record<string, unknown> {
    const filtered: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(spec)) {
      if (value && typeof value === 'object' && !Array.isArray(value) && 'shared' in (value as any)) {
        const branched = value as Record<string, unknown>;
        const shared = branched.shared;
        const platformData = branched[platform];
        if (platformData && Array.isArray(shared) && Array.isArray(platformData)) {
          filtered[key] = [...shared, ...platformData];
        } else if (platformData && typeof shared === 'object' && typeof platformData === 'object') {
          filtered[key] = { ...shared as object, ...platformData as object };
        } else if (platformData !== undefined) {
          filtered[key] = { shared, [platform]: platformData };
        } else {
          filtered[key] = shared;
        }
      } else {
        filtered[key] = value;
      }
    }
    return filtered;
  }

  private enrichOneOffs(spec: Record<string, unknown>, warnings: string[]): void {
    const walk = (node: any) => {
      if (!node || typeof node !== 'object') return;
      if (Array.isArray(node)) { node.forEach(walk); return; }
      if (node.component && typeof node.component === 'string') {
        const oneOff = this.indexer.getOneOffComponent(node.component);
        if (oneOff) {
          node._oneOffSchema = oneOff;
        } else if (node.component.includes('-') && node.component[0] === node.component[0].toLowerCase()) {
          warnings.push(`One-off component '${node.component}' referenced but not found in product/components/`);
        }
      }
      if (node.children) walk(node.children);
    };
    const uiTree = spec['ui-tree'] || spec['uiTree'];
    if (uiTree) walk(uiTree);
  }

  // --- MCP handlers ---

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
        return this.indexer.getOverview() || { message: 'No product data indexed' };

      case 'list_experience_map':
        return this.indexer.getExperienceMap();

      case 'get_screen_spec': {
        const screenName = params.name as string;
        const spec = this.indexer.getScreenSpec(screenName);
        if (!spec) return { error: `Screen '${screenName}' not found` };
        const platform = params.platform as string | undefined;
        return this.resolveScreenSpec(spec, platform);
      }

      case 'get_domain_object': {
        const objName = params.name as string;
        const obj = this.indexer.getDomainObject(objName);
        if (!obj) return { error: `Domain object '${objName}' not found` };
        return obj;
      }

      case 'list_product_templates':
        return this.indexer.getTemplates();

      case 'get_product_health':
        return this.indexer.getHealth();

      case 'rebuild_product_index':
        if (fs.existsSync(this.productDir)) {
          await this.indexer.index();
        }
        return this.indexer.getHealth();

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
