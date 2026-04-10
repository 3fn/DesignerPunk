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
import * as yaml from 'js-yaml';
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
  private oneOffComponents: Map<string, Record<string, unknown>> = new Map();

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
    this.overview = null;
    this.experienceMap = [];
    this.screenSpecs.clear();
    this.domainObjects.clear();
    this.templates = [];
    this.oneOffComponents.clear();

    // Overview
    const overviewPath = path.join(this.productDir, 'overview.yaml');
    if (fs.existsSync(overviewPath)) {
      this.overview = this.loadYaml(overviewPath);
    }

    // Principles (markdown, stored as text)
    const principlesDir = path.join(this.productDir, 'principles');
    if (fs.existsSync(principlesDir)) {
      const principles: Record<string, string> = {};
      for (const file of this.listFiles(principlesDir, '.md')) {
        const name = path.basename(file, '.md');
        principles[name] = fs.readFileSync(file, 'utf-8');
      }
      if (this.overview) {
        (this.overview as any).principles = principles;
      } else {
        this.overview = { principles };
      }
    }

    // Experience map — verticals, flows, pages
    const expDir = path.join(this.productDir, 'experience-map');
    if (fs.existsSync(expDir)) {
      for (const typeDir of ['verticals', 'flows', 'pages']) {
        const typePath = path.join(expDir, typeDir);
        if (!fs.existsSync(typePath)) continue;
        const type = typeDir === 'pages' ? 'feature-page' : typeDir.replace(/s$/, '') as string;

        for (const entry of fs.readdirSync(typePath, { withFileTypes: true })) {
          if (entry.isDirectory()) {
            this.indexScreenDirectory(path.join(typePath, entry.name), entry.name, type);
          } else if (entry.isFile() && entry.name.endsWith('.yaml')) {
            const name = entry.name.replace('.yaml', '');
            this.indexScreenFile(path.join(typePath, entry.name), name, type);
          }
        }
      }
    }

    // Templates
    const templatesDir = path.join(this.productDir, 'templates');
    if (fs.existsSync(templatesDir)) {
      for (const file of this.listFiles(templatesDir, '.yaml')) {
        const data = this.loadYaml(file);
        if (data) this.templates.push(data);
      }
    }

    // Domain objects
    const domainsDir = path.join(this.productDir, 'domain-objects');
    if (fs.existsSync(domainsDir)) {
      for (const file of this.listFiles(domainsDir, '.yaml')) {
        const data = this.loadYaml(file);
        if (data && (data as any).name) {
          this.domainObjects.set((data as any).name, data);
        }
      }
    }

    // Build bidirectional domain object ↔ screen cross-references
    for (const [screenName, spec] of Array.from(this.screenSpecs)) {
      const refs = this.extractDomainRefs(spec);
      for (const ref of refs) {
        const obj = this.domainObjects.get(ref);
        if (obj) {
          const referencedBy = ((obj as any).referencedBy || []) as string[];
          if (!referencedBy.includes(screenName)) referencedBy.push(screenName);
          (obj as any).referencedBy = referencedBy;
        }
      }
    }

    // One-off components
    const componentsDir = path.join(this.productDir, 'components');
    if (fs.existsSync(componentsDir)) {
      for (const entry of fs.readdirSync(componentsDir, { withFileTypes: true })) {
        if (!entry.isDirectory()) continue;
        const compDir = path.join(componentsDir, entry.name);
        const schemaFile = this.listFiles(compDir, '.schema.yaml')[0];
        if (!schemaFile) continue;
        const schema = this.loadYaml(schemaFile) || {};
        const contractFile = this.listFiles(compDir, '.contracts.yaml')[0];
        if (contractFile) {
          (schema as any).contracts = this.loadYaml(contractFile);
        }
        const name = (schema as any).name || entry.name;
        this.oneOffComponents.set(name, schema);
      }
    }

    this.indexed = true;
    this.lastIndexTime = new Date().toISOString();
    console.error(`[${SERVER_NAME}] Indexed: ${this.screenSpecs.size} screens, ${this.domainObjects.size} domain objects, ${this.templates.length} templates, ${this.oneOffComponents.size} one-off components`);
  }

  // --- Indexing helpers ---

  private indexScreenFile(filePath: string, name: string, type: string): void {
    const data = this.loadYaml(filePath);
    if (!data) return;
    (data as any).name = (data as any).name || name;
    (data as any).type = (data as any).type || type;
    this.screenSpecs.set((data as any).name, data);
    this.experienceMap.push({
      name: (data as any).name,
      type: (data as any).type,
      status: (data as any).status || {},
    });
  }

  private indexScreenDirectory(dirPath: string, name: string, type: string): void {
    const yamlFiles = this.listFiles(dirPath, '.yaml');
    if (yamlFiles.length === 0) return;

    // Primary file is the one matching the directory name, or the first file
    const primaryFile = yamlFiles.find(f => path.basename(f, '.yaml') === name) || yamlFiles[0];
    const assembled = this.loadYaml(primaryFile) || {};
    (assembled as any).name = (assembled as any).name || name;
    (assembled as any).type = (assembled as any).type || type;

    // Merge additional facet files (e.g., onboarding.state.yaml, onboarding.a11y.yaml)
    for (const file of yamlFiles) {
      if (file === primaryFile) continue;
      const facetData = this.loadYaml(file);
      if (facetData) Object.assign(assembled, facetData);
    }

    this.screenSpecs.set((assembled as any).name, assembled);
    this.experienceMap.push({
      name: (assembled as any).name,
      type: (assembled as any).type,
      status: (assembled as any).status || {},
    });
  }

  private extractDomainRefs(spec: Record<string, unknown>): string[] {
    const refs: string[] = [];
    const text = JSON.stringify(spec);
    // Look for domain-objects references in data-sources or repeat expressions
    for (const [name] of Array.from(this.domainObjects)) {
      if (text.toLowerCase().includes(name.toLowerCase())) refs.push(name);
    }
    return refs;
  }

  private loadYaml(filePath: string): Record<string, unknown> | null {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      return yaml.load(content) as Record<string, unknown>;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.warnings.push(`Failed to parse ${filePath}: ${msg}`);
      console.error(`[${SERVER_NAME}] Skipping malformed YAML: ${filePath} — ${msg}`);
      return null;
    }
  }

  private listFiles(dir: string, ext: string): string[] {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
      .filter(f => f.endsWith(ext))
      .map(f => path.join(dir, f));
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
            oneOffComponents: this.oneOffComponents.size,
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
