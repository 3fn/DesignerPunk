#!/usr/bin/env node
/**
 * Product MCP Server Entry Point
 *
 * Thin server shell: MCP SDK wiring, tool definitions, and query-time response building.
 * All indexing logic lives in ProductIndexer. Query logic in ScreenQuery/ExperienceMapQuery.
 *
 * @see .kiro/specs/081-product-mcp-design/design.md
 * @see .kiro/specs/097-product-mcp-intelligence-layer/design.md
 */

import * as fs from 'fs';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { ProductIndexer } from './indexer/ProductIndexer';
import { ScreenQuery } from './query/ScreenQuery';
import { ExperienceMapQuery } from './query/ExperienceMapQuery';
import { StalenessGate } from './staleness/StalenessGate';
import type { ScreenFilter } from './models';

const SERVER_NAME = 'mcp-product-server';
const SERVER_VERSION = '0.2.0';
const DEFAULT_PRODUCT_DIR = 'product';
const DEFAULT_COMPONENT_DIR = 'src/components/core';
const DEFAULT_TOKEN_INDEX_DIR = 'token-index';

const filterSchema = {
  context: { type: 'string', description: 'Screen type, name, or tag substring match' },
  status: { type: 'string', description: 'Filter by status (not-started, in-progress, complete, blocked)' },
  platform: { type: 'string', description: 'Filter by platform (web, ios, android)' },
  usesComponent: { type: 'string', description: 'Screens whose UI tree references this component' },
  usesDomainObject: { type: 'string', description: 'Screens that reference this domain object' },
  usesToken: { type: 'string', description: 'Screens whose UI tree tokens: blocks reference this token' },
};

const tools = [
  {
    name: 'get_product_overview',
    description: 'Get product context, configuration, and principles.',
    inputSchema: { type: 'object' as const, properties: {} },
  },
  {
    name: 'get_brand_context',
    description: 'Get product brand identity: personality, voice, tone, anti-references, register. Returns structured "not configured" response if brand fields are absent.',
    inputSchema: { type: 'object' as const, properties: {} },
  },
  {
    name: 'find_screens',
    description: 'Find screens by component usage, token usage, domain object usage, status, platform, or context. All filters are conjunctive (AND). No params returns all screens.',
    inputSchema: { type: 'object' as const, properties: filterSchema },
  },
  {
    name: 'list_experience_map',
    description: 'List experience map entries with referenced components, domain objects, and blocked reasons. Supports same filters as find_screens.',
    inputSchema: { type: 'object' as const, properties: filterSchema },
  },
  {
    name: 'get_screen_spec',
    description: 'Get full spec for a screen (UI tree, state model, data sources, accessibility, status). Includes _componentGaps for unmatched components. Optional platform filter.',
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
    name: 'get_screen_state_model',
    description: 'Get just the state model of a screen (data, states, actions, transitions) without the full spec.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        screen: { type: 'string', description: 'Screen name' },
      },
      required: ['screen'],
    },
  },
  {
    name: 'get_product_component',
    description: 'Get a product-specific (one-off) component by name — schema, contracts, and composition details.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        name: { type: 'string', description: 'One-off component name' },
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
    name: 'find_principles',
    description: 'Find design principles by keyword.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        keyword: { type: 'string', description: 'Keyword to search in principle keywords arrays' },
      },
      required: ['keyword'],
    },
  },
  {
    name: 'find_templates',
    description: 'Find product templates by category or by which screen uses them.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        category: { type: 'string', description: 'Template category (layout, content)' },
        usedBy: { type: 'string', description: 'Screen name that uses the template' },
      },
    },
  },
  {
    name: 'list_product_templates',
    description: 'List all product-specific layout and content patterns.',
    inputSchema: { type: 'object' as const, properties: {} },
  },
  {
    name: 'get_product_health',
    description: 'Get index status, data counts, reverse index sizes, gap counts, and warnings.',
    inputSchema: { type: 'object' as const, properties: {} },
  },
  {
    name: 'get_product_tokens',
    description: 'Get product tokens by category, name, or platform. Returns structured values with resolved system token references. All filters optional and conjunctive.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        category: { type: 'string', description: 'Filter by category name' },
        name: { type: 'string', description: 'Filter by token name' },
        platform: { type: 'string', description: 'Filter to tokens applicable to this platform (web, ios, android)' },
        promotionCandidate: { type: 'boolean', description: 'Filter to tokens flagged as promotion candidates' },
      },
    },
  },
  {
    name: 'rebuild_product_index',
    description: 'Re-index all product data. Returns new health status.',
    inputSchema: { type: 'object' as const, properties: {} },
  },
];

const STALENESS_EXEMPT_TOOLS = new Set([
  'get_product_health',
  'rebuild_product_index',
]);

class ProductMCPServer {
  private server: Server;
  private productDir: string;
  private indexer: ProductIndexer;
  private screenQuery!: ScreenQuery;
  private experienceMapQuery!: ExperienceMapQuery;
  private stalenessGate: StalenessGate;
  private fileWatcher: fs.FSWatcher | null = null;

  constructor(productDir: string, componentDir: string) {
    this.productDir = productDir;
    this.indexer = new ProductIndexer(productDir, componentDir, DEFAULT_TOKEN_INDEX_DIR);
    this.server = new Server(
      { name: SERVER_NAME, version: SERVER_VERSION },
      { capabilities: { tools: {} } }
    );

    this.stalenessGate = new StalenessGate({
      dataDirs: [productDir],
      fileExtensions: ['.yaml', '.md'],
      onRebuild: async () => { await this.indexAndBuildQueries(); },
    });

    this.registerHandlers();
  }

  async start(): Promise<void> {
    if (fs.existsSync(this.productDir)) {
      await this.indexAndBuildQueries();
      this.startFileWatcher();
    } else {
      console.error(`[${SERVER_NAME}] Product directory not found: ${this.productDir} — starting with empty data`);
    }

    this.stalenessGate.markIndexed();
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error(`[${SERVER_NAME}] Server running on stdio`);
  }

  private startFileWatcher(): void {
    if (!fs.existsSync(this.productDir)) return;
    let debounceTimer: NodeJS.Timeout | null = null;

    try {
      this.fileWatcher = fs.watch(this.productDir, { recursive: true }, (_event, filename) => {
        if (!filename || (!filename.endsWith('.yaml') && !filename.endsWith('.md'))) return;
        console.error(`[${SERVER_NAME}] File change detected: ${filename}`);
        if (debounceTimer) clearTimeout(debounceTimer);
        debounceTimer = setTimeout(async () => {
          try {
            await this.indexAndBuildQueries();
            this.stalenessGate.markIndexed();
          } catch (err) {
            console.error(`[${SERVER_NAME}] Reindex failed: ${err instanceof Error ? err.message : err}`);
          }
        }, 200);
      });
      this.fileWatcher.on('error', (err) => {
        console.error(`[${SERVER_NAME}] File watcher error: ${err.message}`);
      });
    } catch (err) {
      console.error(`[${SERVER_NAME}] Could not start file watcher: ${err instanceof Error ? err.message : err}`);
    }
  }

  private async indexAndBuildQueries(): Promise<void> {
    await this.indexer.index();
    this.screenQuery = new ScreenQuery(this.indexer.getEnrichedExperienceMap(), this.indexer.getReverseIndexes());
    this.experienceMapQuery = new ExperienceMapQuery(this.indexer.getEnrichedExperienceMap(), this.indexer.getReverseIndexes());
  }

  // --- Query-time response building ---

  private resolveScreenSpec(spec: Record<string, unknown>, screenName: string, platform?: string): Record<string, unknown> {
    const resolved = platform ? this.filterPlatform(spec, platform) : { ...spec };
    const warnings: string[] = [];
    this.enrichOneOffs(resolved, warnings);

    // Attach component gaps
    const gaps = this.indexer.getGaps(screenName);
    if (gaps.length > 0) {
      (resolved as any)._componentGaps = gaps;
    }

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
    if (!uiTree || typeof uiTree !== 'object') return;

    // Handle branched (shared + platform) or flat UI trees
    if (!Array.isArray(uiTree) && 'shared' in (uiTree as any)) {
      const branched = uiTree as Record<string, unknown>;
      if (branched.shared) walk(branched.shared);
      for (const [key, val] of Object.entries(branched)) {
        if (key !== 'shared' && Array.isArray(val)) walk(val);
      }
    } else {
      walk(uiTree);
    }
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
    if (!STALENESS_EXEMPT_TOOLS.has(name)) {
      await this.stalenessGate.checkAndRebuildIfNeeded();
    }

    switch (name) {
      case 'get_product_overview':
        return this.indexer.getOverview() || { message: 'No product data indexed' };

      case 'get_brand_context':
        return this.indexer.getBrandContext();

      case 'find_screens':
        return this.screenQuery ? this.screenQuery.find(params as ScreenFilter) : [];

      case 'list_experience_map':
        return this.experienceMapQuery
          ? this.experienceMapQuery.find(params as ScreenFilter)
          : this.indexer.getExperienceMap();

      case 'get_screen_spec': {
        const screenName = params.name as string;
        const spec = this.indexer.getScreenSpec(screenName);
        if (!spec) return { error: `Screen '${screenName}' not found` };
        const platform = params.platform as string | undefined;
        return this.resolveScreenSpec(spec, screenName, platform);
      }

      case 'get_screen_state_model': {
        const screenName = params.screen as string;
        const spec = this.indexer.getScreenSpec(screenName);
        if (!spec) return { error: `Screen '${screenName}' not found` };
        const stateModel = spec['state-model'] || spec['stateModel'];
        return stateModel || {};
      }

      case 'get_product_component': {
        const compName = params.name as string;
        const comp = this.indexer.getOneOffComponent(compName);
        if (!comp) return { error: `Product component '${compName}' not found` };
        return comp;
      }

      case 'get_domain_object': {
        const objName = params.name as string;
        const obj = this.indexer.getDomainObject(objName);
        if (!obj) return { error: `Domain object '${objName}' not found` };
        return obj;
      }

      case 'find_principles': {
        const keyword = (params.keyword as string).toLowerCase();
        return this.indexer.getPrinciples().filter(p =>
          p.keywords.some(k => k.toLowerCase() === keyword)
        );
      }

      case 'find_templates': {
        let templates = this.indexer.getTemplates();
        if (params.category) {
          templates = templates.filter(t => (t as any).category === params.category);
        }
        // Attach usedBy to each template
        const result = templates.map(t => {
          const name = (t as any).name as string;
          const usedBy = this.indexer.getTemplateScreens(name);
          return { ...t, usedBy };
        });
        if (params.usedBy) {
          return result.filter(t => t.usedBy.includes(params.usedBy as string));
        }
        return result;
      }

      case 'list_product_templates':
        return this.indexer.getTemplates();

      case 'get_product_health': {
        const health = this.indexer.getHealth() as any;
        const indexes = this.indexer.getReverseIndexes();
        const allGaps = this.indexer.getAllGaps();
        let totalGaps = 0;
        for (const gaps of allGaps.values()) totalGaps += gaps.length;
        return {
          ...health,
          counts: {
            ...health.counts,
            principles: this.indexer.getPrinciples().length,
          },
          reverseIndexSizes: {
            components: indexes.componentToScreens.size,
            tokens: indexes.tokenToScreens.size,
            domainObjects: indexes.domainObjectToScreens.size,
          },
          gapCounts: {
            totalGaps,
            screensWithGaps: allGaps.size,
          },
          catalogSize: this.indexer.getCatalogSize(),
          productTokens: this.indexer.getProductTokenHealth(),
        };
      }

      case 'get_product_tokens':
        return this.indexer.getProductTokens(params as { category?: string; name?: string; platform?: string; promotionCandidate?: boolean });

      case 'rebuild_product_index':
        if (fs.existsSync(this.productDir)) {
          await this.indexAndBuildQueries();
          this.stalenessGate.markIndexed();
        }
        return this.handleTool('get_product_health', {});

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }
}

// Start server
const productDir = process.env.PRODUCT_DIR || DEFAULT_PRODUCT_DIR;
const componentDir = process.env.COMPONENT_DIR || DEFAULT_COMPONENT_DIR;
const server = new ProductMCPServer(productDir, componentDir);
server.start().catch((err) => {
  console.error(`[${SERVER_NAME}] Fatal error:`, err);
  process.exit(1);
});
