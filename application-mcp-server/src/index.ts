#!/usr/bin/env node
/**
 * Component MCP Server Entry Point
 *
 * Provides component metadata querying via MCP tools.
 * Indexes schema.yaml, contracts.yaml, and component-meta.yaml on startup.
 *
 * @see .kiro/specs/064-component-metadata-schema/design.md
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

import { ComponentIndexer, mutableComponentRoots } from './indexer/ComponentIndexer';
import { ComponentQueryEngine } from './query/QueryEngine';
import { AssemblyValidator } from './validation/AssemblyValidator';
import { FileWatcher } from './watcher/FileWatcher';
import { DesignPhilosophyIndexer } from './indexer/DesignPhilosophyIndexer';
import { StalenessGate, isImmutableContext } from './staleness/StalenessGate';

const SERVER_NAME = 'mcp-component-server';
const SERVER_VERSION = '0.1.0';
const DEFAULT_COMPONENTS_DIR = 'src/components/core';
const DEFAULT_TOKEN_INDEX_DIR = 'token-index';

/** Explicit data paths for the Application MCP. All optional — defaults derive from package root. */
interface DataPaths {
  /**
   * The component ROOT SET, precedence order — consumer root first, package root last (Spec 123
   * C3, from `resolveComponentRoots`). A single string is the legacy single-root form.
   */
  componentsDir: string | string[];
  /**
   * C3 `projectRoot = bornRoot` (unborn → the package root). Omitted → the indexer's legacy
   * derivation from the package root (single-root callers).
   */
  projectRoot?: string;
  patternsDir?: string;
  templatesDir?: string;
  guidanceDir?: string;
  registryPath?: string;
  tokenIndexDir?: string;
  designLanguagePath?: string;
}

// Tool definitions
const tools = [
  {
    name: 'get_component_catalog',
    description: 'Get lightweight catalog of all components with name, type, family, purpose, and readiness. ~50 tokens per component.',
    inputSchema: { type: 'object' as const, properties: {} },
  },
  {
    name: 'get_component_summary',
    description: 'Get component summary: identity, contract categories, token count, annotations. ~200 tokens.',
    inputSchema: {
      type: 'object' as const,
      properties: { name: { type: 'string', description: 'Component name (e.g., "Badge-Count-Base")' } },
      required: ['name'],
    },
  },
  {
    name: 'get_component_full',
    description: 'Get complete assembled metadata including all contracts, composition rules, and token relationships.',
    inputSchema: {
      type: 'object' as const,
      properties: { name: { type: 'string', description: 'Component name' } },
      required: ['name'],
    },
  },
  {
    name: 'find_components',
    description: 'Find components by category, concept, platform, purpose keyword, or usage context. Returns ApplicationSummary with promoted selection guidance (purpose, whenToUse, whenNotToUse, alternatives, contexts). All parameters optional and combinable (conjunctive). Use `keyword` for natural-language tokenized discovery (e.g. "primary action button", "login", "text input field").',
    inputSchema: {
      type: 'object' as const,
      properties: {
        category: { type: 'string', description: 'Contract category (e.g., "accessibility")' },
        concept: { type: 'string', description: 'Specific contract concept (e.g., "keyboard_navigation")' },
        platform: { type: 'string', description: 'Platform (e.g., "ios")' },
        purpose: { type: 'string', description: 'Purpose keyword search' },
        context: { type: 'string', description: 'Usage context — exact match (e.g., "form-footers", "onboarding-flows", "settings-screens")' },
        keyword: { type: 'string', description: 'Free-text tokenized keyword discovery. Multi-word queries supported (e.g. "primary action button"). Term-level matching across name, family, purpose, contracts, whenToUse, contexts, alternatives, and description. Does NOT change exact-match semantics of category/concept/context.' },
        limit: { type: 'number', description: 'Maximum number of results to return (optional).' },
      },
    },
  },
  {
    name: 'check_composition',
    description: 'Check if a parent component can contain a child component, with optional prop context.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        parent: { type: 'string', description: 'Parent component name' },
        child: { type: 'string', description: 'Child component name' },
        parentProps: { type: 'object', description: 'Parent prop values for conditional rules' },
      },
      required: ['parent', 'child'],
    },
  },
  {
    name: 'get_component_health',
    description: 'Get index health: status, component count, pattern count, warnings, gaps.',
    inputSchema: { type: 'object' as const, properties: {} },
  },
  {
    name: 'rebuild_index',
    description: 'Rebuild the component index from scratch. Use when index is stale or out of sync. Returns new health status after reindex.',
    inputSchema: { type: 'object' as const, properties: {} },
  },
  {
    name: 'list_experience_patterns',
    description: 'List all experience patterns with name, description, category, tags, step count, and component count.',
    inputSchema: { type: 'object' as const, properties: {} },
  },
  {
    name: 'get_experience_pattern',
    description: 'Get full experience pattern by name: steps, components with roles and hints, accessibility notes, and alternatives.',
    inputSchema: {
      type: 'object' as const,
      properties: { name: { type: 'string', description: 'Pattern name (e.g., "simple-form")' } },
      required: ['name'],
    },
  },
  {
    name: 'list_layout_templates',
    description: 'List all layout templates with name, description, category, tags, and region count.',
    inputSchema: { type: 'object' as const, properties: {} },
  },
  {
    name: 'get_layout_template',
    description: 'Get full layout template by name: regions with grid behavior per breakpoint, stacking rules, and token references.',
    inputSchema: {
      type: 'object' as const,
      properties: { name: { type: 'string', description: 'Template name (e.g., "centered-content-page")' } },
      required: ['name'],
    },
  },
  {
    name: 'validate_assembly',
    description: 'Validate a component tree. Checks component existence, parent-child composition rules, requires/count constraints, and assembly-level accessibility (form labels, submit actions, page headings). Returns errors, warnings, and accessibility issues with paths.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        assembly: {
          type: 'object',
          description: 'Component tree. Each node: { component: string, props?: object, children?: node[] }',
        },
      },
      required: ['assembly'],
    },
  },
  {
    name: 'get_prop_guidance',
    description: 'Get prop selection and family member guidance for a component or family. Returns whenToUse, whenNotToUse, selectionRules (scenario→recommendation with optional props), accessibilityNotes, and family-scoped patterns. Query by component name (returns its family guidance) or family name.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        component: { type: 'string', description: 'Component name (e.g., "Button-CTA") or family name (e.g., "Buttons")' },
        verbose: { type: 'boolean', description: 'Include rationale and descriptions (default: false)' },
      },
      required: ['component'],
    },
  },
  // Token query tools (Spec 096)
  {
    name: 'search_tokens',
    description: 'Search tokens by family, tier (primitive/semantic/component), or name. All parameters optional and combinable.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        family: { type: 'string', description: 'Token family (e.g., "spacing", "color")' },
        tier: { type: 'string', description: 'Token tier: "primitive", "semantic", or "component"' },
        name: { type: 'string', description: 'Token name (partial match)' },
      },
    },
  },
  {
    name: 'get_token_details',
    description: 'Get full details for a token: value, family, tier, platform names, formula, theme-varying status, consumers.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        name: { type: 'string', description: 'Token name (e.g., "space100", "color.action.primary")' },
      },
      required: ['name'],
    },
  },
  {
    name: 'get_token_family',
    description: 'Get all tokens in a family across all tiers.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        family: { type: 'string', description: 'Family name (e.g., "spacing", "color")' },
      },
      required: ['family'],
    },
  },
  {
    name: 'get_token_consumers',
    description: 'Get all components that reference a token.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        name: { type: 'string', description: 'Token name' },
      },
      required: ['name'],
    },
  },
  {
    name: 'get_design_philosophy',
    description: 'Get the design system\'s creative north star, aesthetic philosophy, and key characteristics.',
    inputSchema: { type: 'object' as const, properties: {} },
  },
  {
    name: 'get_design_rules',
    description: 'Get named design rules as structured data (name, constraint, rationale).',
    inputSchema: { type: 'object' as const, properties: {} },
  },
  {
    name: 'get_design_guidance',
    description: 'Get design do\'s and don\'ts as categorized directives. Optionally filter by category.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        category: { type: 'string', description: 'Filter by category (e.g., "spacing", "color", "typography", "motion")' },
      },
    },
  },
  {
    name: 'get_color_strategy',
    description: 'Get color strategy vocabulary (Restrained/Committed/Full/Drenched) with usage guidance. Optionally filter by tier.',
    inputSchema: {
      type: 'object' as const,
      properties: {
        tier: { type: 'string', description: 'Filter by tier (e.g., "Restrained", "Committed", "Full", "Drenched")' },
      },
    },
  },
];

const STALENESS_EXEMPT_TOOLS = new Set([
  'get_component_health',
  'rebuild_index',
]);

/**
 * Testable tool-dispatch boundary (Spec 121 Task 4 — additive export for the H1 contract test).
 *
 * The MCP protocol wraps handleTool's return in { content: [{type:'text', text: JSON.stringify(...)}] }.
 * For contract tests we want to assert the *assembled data object* (not the transport envelope), so
 * this interface surfaces handleTool directly as `callTool`.
 *
 * ADDITIVE ONLY — no behavior change; server.start() / MCP transport untouched.
 */
export interface TestableServer {
  /** Call a tool by name end-to-end through the same dispatch path as the live MCP handler. */
  callTool(name: string, args: Record<string, unknown>): Promise<unknown>;
  /** Index components + tokens so the test server is ready to serve requests. */
  initialize(): Promise<void>;
  /** Start the server's file watcher (the live server starts it in `start()`). Spec 123 Task 1.4. */
  startWatching(): void;
  /** Stop the server's file watcher. */
  stopWatching(): void;
  /** The directories the staleness gate scans / the component roots the watcher watches. Spec 123 Task 1.4. */
  getWatchedDirs(): { stalenessDataDirs: string[]; watchedComponentRoots: string[] };
}

/** Test-only server options (Spec 123 Task 1.4). */
export interface TestableServerOptions {
  /** Staleness-gate threshold; the live server uses the gate's default (30s). */
  stalenessThresholdMs?: number;
}

/**
 * Create a `TestableServer` bound to the given data directories.
 * Does NOT start the MCP stdio transport — safe to call in Jest.
 * Call `initialize()` before `callTool(...)`.
 *
 * @param paths - same DataPaths contract as ComponentMCPServer; defaults match real-corpus layout
 */
export function createTestableServer(paths: DataPaths, options: TestableServerOptions = {}): TestableServer {
  const server = new ComponentMCPServer(paths, options);
  return {
    initialize: async () => {
      await server.fullIndex();
      server.markIndexed();
    },
    callTool: (name: string, args: Record<string, unknown>) =>
      server.handleTool(name, args),
    startWatching: () => server.startWatching(),
    stopWatching: () => server.stopWatching(),
    getWatchedDirs: () => server.getWatchedDirs(),
  };
}

class ComponentMCPServer {
  private server: Server;
  indexer: ComponentIndexer;
  private queryEngine: ComponentQueryEngine;
  private assemblyValidator: AssemblyValidator;
  private fileWatcher: FileWatcher;
  private philosophyIndexer: DesignPhilosophyIndexer;
  private stalenessGate: StalenessGate;
  private readonly stalenessDataDirs: string[];
  private readonly watchedComponentRoots: string[];

  constructor(private paths: DataPaths, options: TestableServerOptions = {}) {
    this.server = new Server({ name: SERVER_NAME, version: SERVER_VERSION }, { capabilities: { tools: {} } });
    this.indexer = new ComponentIndexer();
    this.queryEngine = new ComponentQueryEngine(this.indexer);
    this.assemblyValidator = new AssemblyValidator(this.indexer);

    // Spec 123 C3: the watcher and the staleness gate watch the CONSUMER root; the package root
    // is exempt as immutable (it lives under node_modules in every consumer install).
    const componentRoots = Array.isArray(this.paths.componentsDir) ? this.paths.componentsDir : [this.paths.componentsDir];
    this.watchedComponentRoots = mutableComponentRoots(componentRoots);

    this.fileWatcher = new FileWatcher(
      this.indexer,
      this.watchedComponentRoots,
      this.paths.patternsDir,
      this.paths.templatesDir,
      this.paths.guidanceDir,
      this.paths.tokenIndexDir,
    );
    this.philosophyIndexer = new DesignPhilosophyIndexer();

    // Every non-component data dir keeps the pre-123 rule: immutable (node_modules) data is not scanned.
    const otherDirs = [
      this.paths.patternsDir,
      this.paths.templatesDir,
      this.paths.guidanceDir,
      this.paths.tokenIndexDir,
    ].filter((d): d is string => Boolean(d) && !isImmutableContext(d as string));
    this.stalenessDataDirs = [...this.watchedComponentRoots, ...otherDirs];

    this.stalenessGate = new StalenessGate({
      dataDirs: this.stalenessDataDirs,
      fileExtensions: ['.yaml', '.ts', '.md'],
      thresholdMs: options.stalenessThresholdMs,
      // Nothing mutable to scan (e.g. an unborn consumer: everything is package data) → skip all checks.
      isImmutable: this.stalenessDataDirs.length === 0,
      onRebuild: async () => {
        await this.fullIndex();
        if (this.paths.designLanguagePath) {
          await this.philosophyIndexer.index(this.paths.designLanguagePath);
        }
      },
    });

    this.registerHandlers();
  }

  /** Full index over the component root set, anchored on `projectRoot` (C3 `projectRoot = bornRoot`). */
  async fullIndex(): Promise<void> {
    await this.indexer.indexComponents(
      this.paths.componentsDir,
      this.paths.patternsDir,
      this.paths.templatesDir,
      this.paths.guidanceDir,
      this.paths.tokenIndexDir,
      { projectRoot: this.paths.projectRoot },
    );
  }

  /** @internal Test seam (Spec 123 Task 1.4). */
  markIndexed(): void {
    this.stalenessGate.markIndexed();
  }

  /** @internal Test seam (Spec 123 Task 1.4). */
  startWatching(): void {
    this.fileWatcher.start();
  }

  /** @internal Test seam (Spec 123 Task 1.4). */
  stopWatching(): void {
    this.fileWatcher.stop();
  }

  /** @internal Test seam (Spec 123 Task 1.4). */
  getWatchedDirs(): { stalenessDataDirs: string[]; watchedComponentRoots: string[] } {
    return {
      stalenessDataDirs: [...this.stalenessDataDirs],
      watchedComponentRoots: this.fileWatcher.getWatchedComponentRoots(),
    };
  }

  async start(): Promise<void> {
    await this.fullIndex();
    this.fileWatcher.start();

    // Token index status (loaded inside indexComponents if tokenIndexDir provided)
    if (this.paths.tokenIndexDir) {
      const th = this.indexer.getTokenIndexer().getHealth();
      console.error(`[${SERVER_NAME}] Token index: ${th.primitives} primitives, ${th.semantics} semantics, ${th.componentTokens} component tokens`);
    }

    const health = this.indexer.getHealth();
    console.error(`[${SERVER_NAME}] Indexed ${health.componentsIndexed} components (${health.warnings.length} warnings)`);
    // Spec 123 Task 1.6: this line USED TO print a stale, wrong "(Spec 096 pending)"
    // excuse whenever `tokenIndexDir` was undefined. It fires now for real
    // birth-detection reasons (a partial refusal, an absent/empty index, an
    // unreadable explicit TOKEN_INDEX_DIR) — the SPECIFIC catalog-string message for
    // that reason is already printed earlier, in the `require.main` bootstrap block
    // (before this server is even constructed). Printing a second, vaguer, wrong-spec
    // message here would just contradict the accurate one — removed rather than
    // reworded.

    // Design philosophy
    if (this.paths.designLanguagePath) {
      await this.philosophyIndexer.index(this.paths.designLanguagePath);
      const pw = this.philosophyIndexer.getWarnings();
      if (pw.length > 0) {
        console.error(`[${SERVER_NAME}] Design philosophy: ${pw.length} warning(s)`);
      }
    }

    const transport = new StdioServerTransport();
    this.stalenessGate.markIndexed();
    await this.server.connect(transport);
    console.error(`[${SERVER_NAME}] Server running on stdio`);
    this.setupShutdownHandlers();
  }

  /**
   * Self-exit on stdin EOF and fatal signals. A stdio MCP server whose parent client
   * died (or gracefully closed the pipe) has no one to serve, but the file watcher
   * keeps the event loop alive forever — found live at Spec 122 U3 (~230 orphaned
   * servers accumulated across harness runs). Exiting on EOF also makes graceful
   * client closes immediate: the MCP SDK's StdioClientTransport.close() ends stdin
   * and waits up to 2s for exactly this exit before escalating to SIGTERM.
   */
  private setupShutdownHandlers(): void {
    let shuttingDown = false;
    const shutdown = async (): Promise<void> => {
      if (shuttingDown) return;
      shuttingDown = true;
      console.error(`[${SERVER_NAME}] Shutting down...`);
      this.fileWatcher.stop();
      await this.server.close();
      process.exit(0);
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
    process.stdin.on('end', shutdown);
    process.stdin.on('close', shutdown);
  }

  private registerHandlers(): void {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      const params = (args ?? {}) as Record<string, unknown>;

      try {
        const result = await this.handleTool(name, params);
        return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return { content: [{ type: 'text', text: JSON.stringify({ error: message }) }], isError: true };
      }
    });
  }

  /** @internal Exposed via `createTestableServer` for the tool-boundary contract test (Spec 121 Task 4). */
  async handleTool(name: string, params: Record<string, unknown>): Promise<unknown> {
    if (!STALENESS_EXEMPT_TOOLS.has(name)) {
      await this.stalenessGate.checkAndRebuildIfNeeded();
    }

    switch (name) {
      case 'get_component_catalog':
        return this.queryEngine.getCatalog();
      case 'get_component_summary':
        return this.queryEngine.getComponentSummary(params.name as string);
      case 'get_component_full':
        return this.queryEngine.getComponent(params.name as string);
      case 'find_components':
        return this.handleFind(params);
      case 'check_composition':
        return this.queryEngine.checkComposition(
          params.parent as string,
          params.child as string,
          params.parentProps as Record<string, unknown> | undefined,
        );
      case 'get_component_health':
        return this.queryEngine.getHealth();
      case 'rebuild_index':
        await this.fullIndex();
        if (this.paths.designLanguagePath) {
          await this.philosophyIndexer.index(this.paths.designLanguagePath);
        }
        this.stalenessGate.markIndexed();
        return this.queryEngine.getHealth();
      case 'list_experience_patterns':
        return this.queryEngine.getPatternCatalog();
      case 'get_experience_pattern':
        return this.queryEngine.getPattern(params.name as string);
      case 'list_layout_templates':
        return this.queryEngine.getLayoutTemplateCatalog();
      case 'get_layout_template':
        return this.queryEngine.getLayoutTemplate(params.name as string);
      case 'validate_assembly':
        return this.assemblyValidator.validate(params.assembly as any);
      case 'get_prop_guidance':
        return this.queryEngine.getGuidance(params.component as string, params.verbose as boolean | undefined);
      // Token query tools (Spec 096)
      case 'search_tokens':
        return this.indexer.getTokenIndexer().search({
          family: params.family as string | undefined,
          tier: params.tier as string | undefined,
          name: params.name as string | undefined,
        });
      case 'get_token_details': {
        const entry = this.indexer.getTokenIndexer().getDetails(params.name as string);
        return entry || { error: `Token '${params.name}' not found` };
      }
      case 'get_token_family':
        return this.indexer.getTokenIndexer().getFamily(params.family as string);
      case 'get_token_consumers':
        return this.indexer.getTokenIndexer().getConsumers(params.name as string);
      case 'get_design_philosophy':
        return this.philosophyIndexer.getPhilosophy() || { status: 'not_authored', message: 'Design philosophy has not been authored yet.' };
      case 'get_design_rules':
        return this.philosophyIndexer.getRules();
      case 'get_design_guidance':
        return this.philosophyIndexer.getGuidance(params.category as string | undefined);
      case 'get_color_strategy':
        return this.philosophyIndexer.getColorStrategy(params.tier as string | undefined);
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }

  private handleFind(params: Record<string, unknown>): unknown {
    return this.queryEngine.findComponents({
      category: params.category as string | undefined,
      concept: params.concept as string | undefined,
      platform: params.platform as string | undefined,
      purpose: params.purpose as string | undefined,
      context: params.context as string | undefined,
      // Task 2.3 (Spec 121): new optional params — keyword and limit
      keyword: params.keyword as string | undefined,
      limit: params.limit as number | undefined,
    });
  }
}

/**
 * Shared data-root resolution (Spec 121 F-C2 patch).
 *
 * Single source of truth: src/cli/shared/mcpDataRoots.ts (root package). Consumed
 * via the ROOT-COMPILED dist artifact — a static TS import would cross this
 * sub-package's tsc rootDir boundary (see that file's "CONSUMPTION CONTRACT").
 * The esbuild bundle (dist/mcp/application-mcp.js) inlines the require at build
 * time; the tsc artifact (application-mcp-server/dist/index.js) resolves it at
 * runtime. Types are declared locally (shape-only, no logic) so the sub-package
 * typecheck has no dependency on the root dist being built.
 */
/** Shape-only mirror of `bornRepo.ts`'s `DesignSystemRoot` (Spec 123 Task 1.2) — no logic, avoids a cross-sub-package import. */
export interface DesignSystemRootShape {
  state: 'born' | 'package-mode' | 'partial' | 'unborn';
  root: string | null;
  tierDir: string | null;
  partialCase?: 'config-no-tier' | 'unused-local-tier' | 'tier-no-config' | 'manifest-only';
  /** `config-no-tier` only; `undefined` for a non-literal `tokenSource` (Peter, 2026-09-26). */
  attemptedTokenSource?: string;
  signals: { config: boolean; tier: boolean; manifest: boolean; legacyManifest: boolean };
}
export interface ResolvedDataRoot {
  path: string;
  source: 'env' | 'cwd' | 'package' | 'package-consume';
}
export interface ComponentRootsResult {
  roots: string[];
  sources: ResolvedDataRoot['source'][];
}
export type TokenIndexResolution =
  | { ok: true; path: string; source: ResolvedDataRoot['source']; tokenOrigin?: 'designerpunk-package-mode' | 'designerpunk-reference' }
  | { ok: false; reason: 'empty-env-value' }
  | { ok: false; reason: 'run-generate' }
  | { ok: false; reason: 'partial'; partialCase?: DesignSystemRootShape['partialCase'] };
export interface McpDataRootsModule {
  resolvePackageRoot(fromDir: string): string;
  resolvePackageOwnedRoot(opts: {
    envValue?: string;
    packageRoot: string;
    relPath: string;
  }): ResolvedDataRoot;
  /** @deprecated Spec 123 Task 1.2 — superseded by the birth-aware resolvers below. Kept so this bootstrap block keeps compiling until Tasks 1.4–1.6 rewire it. */
  resolveConsumerOwnedRoot(opts: {
    envValue?: string;
    relPath: string;
    packageRoot?: string;
  }): ResolvedDataRoot;
  resolveComponentRoots(opts: {
    envValue?: string;
    dsRoot: DesignSystemRootShape;
    packageRoot: string;
  }): ComponentRootsResult;
  resolveTokenIndexRoot(opts: {
    envValue?: string;
    dsRoot: DesignSystemRootShape;
    packageRoot: string;
  }): TokenIndexResolution;
}

/**
 * Shape-only declaration of the root-compiled `bornRepo` module (Spec 123 Task 1.4) — the same
 * CONSUMPTION CONTRACT as `McpDataRootsModule`; `mcpDataRootsDeclaration.test.ts` guards parity.
 */
export interface BornRepoModule {
  findDesignSystemRoot(startDir: string): DesignSystemRootShape;
}

/**
 * Shape-only declaration of the root-compiled `errorCatalog` module (Spec 123 Task 1.6) —
 * the same CONSUMPTION CONTRACT as `McpDataRootsModule`/`BornRepoModule`.
 */
export interface ErrorCatalogModule {
  partialCaseMessage(
    root: string,
    partialCase: NonNullable<DesignSystemRootShape['partialCase']>,
    attemptedTokenSource: string | undefined
  ): string;
  packageModeIndexAbsentMessage(): string;
  bornIndexAbsentMessage(root: string): string;
  explicitTokenIndexMissingMessage(explicitPath: string): string;
}

/**
 * Pick the design.md catalog string for a refused token-index resolution (Spec 123
 * Task 1.6). Extracted as a pure, exported function (rather than inlined in the
 * `require.main` bootstrap guard below) so it is unit-testable without the
 * dist-require machinery — see `errorCatalogWiring.test.ts`.
 *
 * `run-generate` picks born vs package-mode by `dsRoot.state`, because the
 * resolver's `reason` alone doesn't carry which posture produced it.
 */
export function resolveTokenIndexUnavailableMessage(
  reason: 'empty-env-value' | 'run-generate' | 'partial',
  dsRoot: DesignSystemRootShape,
  packageRoot: string,
  errorCatalog: ErrorCatalogModule,
  explicitTokenIndexDirEnv: string | undefined
): string {
  switch (reason) {
    case 'empty-env-value':
      return errorCatalog.explicitTokenIndexMissingMessage(explicitTokenIndexDirEnv ?? '');
    case 'run-generate':
      return dsRoot.state === 'package-mode'
        ? errorCatalog.packageModeIndexAbsentMessage()
        : errorCatalog.bornIndexAbsentMessage(dsRoot.root ?? packageRoot);
    case 'partial':
      return dsRoot.partialCase
        ? errorCatalog.partialCaseMessage(dsRoot.root ?? packageRoot, dsRoot.partialCase, dsRoot.attemptedTokenSource)
        : `token index unavailable: partial state with no named sub-case`;
  }
}

// Start server — resolve data roots (Spec 121 F-C2), then boot.
// Guard: skip auto-start when this module is imported (e.g. by the tool-boundary contract test).
// The `require.main === module` check is the standard Node.js "am I the entry point?" idiom.
// ts-jest sets require.main to a different module, so this guard is safe in Jest.
// Root resolution stays INSIDE this guard so importing this module never executes it.
if (require.main === module) {
  const logRoot = (label: string, root: ResolvedDataRoot, note = ''): void => {
    console.error(`[${SERVER_NAME}] Data root ${label}: ${root.path} (source: ${root.source})${note}`);
  };

  let dataPaths: DataPaths;
  try {
    const shared = require('../../dist/cli/shared/mcpDataRoots') as McpDataRootsModule;
    const bornRepo = require('../../dist/cli/shared/bornRepo') as BornRepoModule;
    const errorCatalog = require('../../dist/cli/shared/errorCatalog') as ErrorCatalogModule;
    const packageRoot = shared.resolvePackageRoot(__dirname);

    // Spec 123 C2/C3: birth detection from the INVOKING process's cwd (D-B3 — never
    // __dirname/pkgRoot; the runner spawns this server with no `cwd` option, so it inherits).
    const dsRoot = bornRepo.findDesignSystemRoot(process.cwd());

    // COMPONENT ROOT SET (C3): consumer root (env, else bornRoot/src/components when born)
    // UNION the package root — the env value names the consumer root, never the only root.
    const componentRoots = shared.resolveComponentRoots({
      envValue: process.env.COMPONENTS_DIR || process.env.COMPONENT_DIR,
      dsRoot,
      packageRoot,
    });

    // C3: projectRoot = bornRoot (any state with a resolved root); unborn → the package root, labelled.
    const projectRoot = dsRoot.root ?? packageRoot;

    // TOKEN INDEX (C3): birth-aware. A structural reason is logged when no index can be served;
    // the catalog message strings for those reasons are Task 1.6's.
    const tokenIndex = shared.resolveTokenIndexRoot({
      envValue: process.env.TOKEN_INDEX_DIR,
      dsRoot,
      packageRoot,
    });

    // PACKAGE-OWNED roots: env → package-relative (no cwd preference — these ship
    // with the package; a consumer's coincidental dir is not this data).
    const patterns = shared.resolvePackageOwnedRoot({
      envValue: process.env.PATTERNS_DIR,
      packageRoot,
      relPath: 'experience-patterns',
    });
    const templates = shared.resolvePackageOwnedRoot({
      envValue: process.env.TEMPLATES_DIR,
      packageRoot,
      relPath: 'layout-templates',
    });
    const guidance = shared.resolvePackageOwnedRoot({
      envValue: process.env.GUIDANCE_DIR,
      packageRoot,
      relPath: 'family-guidance',
    });
    const registry = shared.resolvePackageOwnedRoot({
      envValue: process.env.REGISTRY_PATH,
      packageRoot,
      relPath: 'family-registry.yaml',
    });
    const designLanguage = shared.resolvePackageOwnedRoot({
      envValue: process.env.DESIGN_LANGUAGE_PATH,
      packageRoot,
      relPath: 'design-language/design-philosophy.yaml',
    });

    // Boot log: one stderr line per data root, BEFORE the startup sentinel.
    // NEVER stdout — stdout is the JSON-RPC channel.
    console.error(`[${SERVER_NAME}] Design-system root: ${dsRoot.state}${dsRoot.partialCase ? ` (${dsRoot.partialCase})` : ''}`);
    console.error(
      `[${SERVER_NAME}] Project root: ${projectRoot} (source: ${dsRoot.root ? dsRoot.state : 'unborn → package'})`
    );
    componentRoots.roots.forEach((root, i) => {
      logRoot(`components[${i}]`, { path: root, source: componentRoots.sources[i] });
    });
    if (tokenIndex.ok) {
      logRoot(
        'token-index',
        { path: tokenIndex.path, source: tokenIndex.source },
        tokenIndex.tokenOrigin ? ` (tokenOrigin: ${tokenIndex.tokenOrigin})` : ''
      );
    } else {
      // Spec 123 Task 1.6: the design.md catalog string for this reason — never a
      // paraphrase. Extracted to `resolveTokenIndexUnavailableMessage` (above) so
      // it's unit-testable outside this bootstrap guard.
      const tokenIndexMessage = resolveTokenIndexUnavailableMessage(
        tokenIndex.reason,
        dsRoot,
        packageRoot,
        errorCatalog,
        process.env.TOKEN_INDEX_DIR
      );
      console.error(`[${SERVER_NAME}] ${tokenIndexMessage}`);
    }
    logRoot('experience-patterns', patterns);
    logRoot('layout-templates', templates);
    logRoot('family-guidance', guidance);
    logRoot('family-registry', registry);
    logRoot('design-language', designLanguage);

    dataPaths = {
      componentsDir: componentRoots.roots,
      projectRoot,
      patternsDir: patterns.path,
      templatesDir: templates.path,
      guidanceDir: guidance.path,
      registryPath: registry.path,
      tokenIndexDir: tokenIndex.ok ? tokenIndex.path : undefined,
      designLanguagePath: designLanguage.path,
    };
  } catch {
    // Root dist not built (dev-repo edge; in-repo cwd == package root, so the
    // legacy env/cwd-relative defaults still land on the right data).
    console.error(
      `[${SERVER_NAME}] WARNING: shared data-root resolution unavailable (root dist not built?) — using legacy env/cwd-relative defaults`
    );
    dataPaths = {
      componentsDir: process.env.COMPONENTS_DIR || DEFAULT_COMPONENTS_DIR,
      patternsDir: process.env.PATTERNS_DIR,
      templatesDir: process.env.TEMPLATES_DIR,
      guidanceDir: process.env.GUIDANCE_DIR,
      registryPath: process.env.REGISTRY_PATH,
      tokenIndexDir: process.env.TOKEN_INDEX_DIR || DEFAULT_TOKEN_INDEX_DIR,
      designLanguagePath: process.env.DESIGN_LANGUAGE_PATH || 'design-language/design-philosophy.yaml',
    };
  }

  const mainServer = new ComponentMCPServer(dataPaths);
  mainServer.start().catch((err) => {
    console.error(`[${SERVER_NAME}] Fatal error:`, err);
    process.exit(1);
  });
}
