#!/usr/bin/env node
/**
 * Registry generator (C5) — Spec 122 Task 4.1.
 *
 * design.md § "C5 — Registry generator": spawn each MCP server from its COMPILED entry
 * over stdio, `initialize` + `tools/list`, and emit `canonical/registry/tool-registry.json`
 * — servers and tools sorted by name, no timestamps (byte-identical for byte-identical
 * introspection, via {@link canonicalStringify}, the P1 determinism backbone this file
 * reuses rather than re-implements).
 *
 * This keys on DECLARATIONS — a tool is in the registry because the server declared it
 * in `tools/list`, available whenever the process boots, regardless of index state. The
 * Product-MCP `indexed:false` case (this repo's product index is currently empty)
 * generates IDENTICALLY to an indexed one: `tools/list` does not consult the index.
 * Hand-curation and query-result sourcing are structurally ABSENT from this component —
 * there is no authored input, only the live `tools/list` response.
 *
 * `entry` (repo-relative, mirroring `.mcp.json`'s server table but machine-independent —
 * `.mcp.json` itself uses machine-absolute paths) makes the registry directly consumable
 * as the Spec 125 tool-boot smoke manifest: boot each `entry`, assert `tools/list`
 * responds and matches — declared-and-responds, never returns-data. 122 enumerates here;
 * 125 arms the boot-smoke check against this file.
 *
 * ERROR HANDLING (design § Error Handling): a boot/listTools failure THROWS, naming the
 * server + entry. There is NO fallback to any cached/committed registry — the registry is
 * only ever written from a live `tools/list` response, never carried forward stale.
 *
 * Traces to: Req 7 AC1/AC2/AC3, Req 20 AC4.
 */

import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { canonicalStringify, type JsonValue } from './canonical-json';

// ============================================================================
// The fixed server table — mirrors `.mcp.json`'s three servers, repo-relative
// ============================================================================

/** One server's introspection input: repo-relative entry + the env it needs to boot. */
export interface RegistryServerSpec {
  name: string;
  /** Repo-relative path to the compiled entry (`node <repoRoot>/<entry>`). */
  entry: string;
  /** Env vars this server needs, as repo-relative-derived ABSOLUTE paths at spawn time. */
  env: Record<string, string>;
}

/**
 * The fixed server table, computed from `repoRoot`. Mirrors `.mcp.json`, which pins
 * machine-absolute paths for a single developer's checkout; this table is
 * machine-independent — `entry` stays repo-relative in the EMITTED registry, and `env`
 * is computed fresh from whatever `repoRoot` the caller passes (dev checkout or CI clone).
 */
export function serverTable(repoRoot: string): RegistryServerSpec[] {
  return [
    {
      name: 'designerpunk-docs',
      entry: 'mcp-server/dist/index.js',
      env: { WORKSPACE_ROOT: repoRoot },
    },
    {
      name: 'designerpunk-application',
      entry: 'application-mcp-server/dist/index.js',
      env: {
        COMPONENTS_DIR: path.join(repoRoot, 'src', 'components', 'core'),
        TOKEN_INDEX_DIR: path.join(repoRoot, 'token-index'),
      },
    },
    {
      name: 'designerpunk-product',
      entry: 'dist/mcp/product-mcp.js',
      env: {
        PRODUCT_DIR: path.join(repoRoot, 'product'),
        COMPONENT_DIR: path.join(repoRoot, 'src', 'components', 'core'),
        TOKEN_INDEX_DIR: path.join(repoRoot, 'token-index'),
      },
    },
  ];
}

// ============================================================================
// Emitted registry shape (design's schema exactly)
// ============================================================================

export interface RegistryTool {
  name: string;
  description: string;
  /** `sha256:` + hex sha256 of `canonicalStringify(inputSchema ?? null)`. */
  inputSchemaHash: string;
}

export interface RegistryServer {
  name: string;
  /** Repo-relative — the 125 tool-boot smoke manifest reads this to spawn each server. */
  entry: string;
  tools: RegistryTool[];
}

export interface ToolRegistry {
  servers: RegistryServer[];
}

// ============================================================================
// Introspection — the only I/O in this module
// ============================================================================

/** One server's raw introspection result: its declared tools, pre-sort. */
export interface ServerIntrospection {
  name: string;
  entry: string;
  tools: Array<{ name: string; description?: string; inputSchema?: unknown }>;
}

/**
 * Spawn one server over stdio (MCP `initialize` + `listTools()`), then close the
 * session. THROWS loud on any boot/listTools failure, naming the server + entry — no
 * fallback path exists (design § Error Handling): the registry is only ever written
 * from a live `tools/list` response.
 */
export async function introspectServer(
  spec: RegistryServerSpec,
  repoRoot: string
): Promise<ServerIntrospection> {
  const absoluteEntry = path.join(repoRoot, spec.entry);

  // String-only env (the StdioCorpusClient precedent: pass process.env through plus the
  // server-specific overrides, since a spawned `node` needs PATH etc. to resolve).
  const env: Record<string, string> = {};
  for (const [key, value] of Object.entries(process.env)) {
    if (typeof value === 'string') env[key] = value;
  }
  for (const [key, value] of Object.entries(spec.env)) {
    env[key] = value;
  }

  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [absoluteEntry],
    env,
    stderr: 'inherit',
  });
  const client = new Client({ name: 'agent-generator-registry', version: '0.0.0' }, { capabilities: {} });

  try {
    await client.connect(transport);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Registry introspection: server "${spec.name}" (entry: ${spec.entry}) failed to boot — ${message}`
    );
  }

  try {
    const { tools } = await client.listTools();
    return {
      name: spec.name,
      entry: spec.entry,
      tools: tools.map((tool) => ({
        name: tool.name,
        description: tool.description,
        inputSchema: (tool as { inputSchema?: unknown }).inputSchema,
      })),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Registry introspection: server "${spec.name}" (entry: ${spec.entry}) failed tools/list — ${message}`
    );
  } finally {
    await client.close();
  }
}

/** `sha256:` + hex sha256 over `canonicalStringify(inputSchema ?? null)`. */
export function hashInputSchema(inputSchema: unknown): string {
  const canonical = canonicalStringify((inputSchema ?? null) as JsonValue);
  const digest = crypto.createHash('sha256').update(canonical).digest('hex');
  return `sha256:${digest}`;
}

// ============================================================================
// Assembly — pure, testable without spawning anything
// ============================================================================

/**
 * Assemble the emitted registry from raw per-server introspection results. PURE —
 * no I/O — so determinism (sort order) and hash stability are unit-testable without
 * spawning a real server. Servers and tools are sorted by name (design's exact schema);
 * no timestamps anywhere.
 */
export function assembleRegistry(results: readonly ServerIntrospection[]): ToolRegistry {
  const servers: RegistryServer[] = results
    .map((result) => ({
      name: result.name,
      entry: result.entry,
      tools: result.tools
        .map((tool) => ({
          name: tool.name,
          description: tool.description ?? '',
          inputSchemaHash: hashInputSchema(tool.inputSchema),
        }))
        .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0)),
    }))
    .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

  return { servers };
}

/** Serialize a {@link ToolRegistry} to canonical (deterministic) JSON for committing. */
export function serializeRegistry(registry: ToolRegistry): string {
  return canonicalStringify(registry as unknown as JsonValue);
}

// ============================================================================
// Top-level generate / write
// ============================================================================

/**
 * Introspect all three servers in the fixed table and assemble the registry. Any
 * introspection failure propagates (throws) — never falls back to a stale registry.
 */
export async function generateRegistry(repoRoot: string): Promise<ToolRegistry> {
  const specs = serverTable(repoRoot);
  const results: ServerIntrospection[] = [];
  for (const spec of specs) {
    results.push(await introspectServer(spec, repoRoot));
  }
  return assembleRegistry(results);
}

/** Path (repo-relative) the registry is committed to. */
export const REGISTRY_OUTPUT_PATH = path.join('canonical', 'registry', 'tool-registry.json');

/** Generate the registry and write it to `canonical/registry/tool-registry.json`. */
export async function writeRegistry(repoRoot: string): Promise<ToolRegistry> {
  const registry = await generateRegistry(repoRoot);
  const outPath = path.join(repoRoot, REGISTRY_OUTPUT_PATH);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, serializeRegistry(registry), 'utf8');
  return registry;
}

// ============================================================================
// Main entry point — generate+write when run directly; NEVER on import
// ============================================================================

async function main(): Promise<void> {
  const repoRoot = path.resolve(__dirname, '..', '..');
  const registry = await writeRegistry(repoRoot);
  console.error(`[registry] wrote ${REGISTRY_OUTPUT_PATH}`);
  for (const server of registry.servers) {
    console.error(`[registry]   ${server.name}: ${server.tools.length} tools`);
  }
}

// Run ONLY when this module is the process entry point (`npx tsx
// tools/agent-generator/registry.ts`), matching the repo's established
// `require.main === module` pattern (see mcp-server/src/index.ts). Importing this
// module as a library (e.g. from a test, or from another generator stage) must NOT
// introspect anything as a side effect.
if (require.main === module) {
  main().catch((error) => {
    console.error('[registry] Fatal error:', error);
    process.exit(1);
  });
}
