#!/usr/bin/env tsx
/**
 * build-tool-manifest.ts — computes `dist/mcp/tool-manifest.json` from the
 * three MCP servers' REGISTRATION MODULES (Spec 123 Task 4; design.md § "C8.
 * Per-harness MCP configuration + approvals"; requirements.md Reqs 5.3, 5.4,
 * 7.1–7.4, 15A.1).
 *
 * The manifest is built by STATICALLY IMPORTING each server's exported `tools`
 * array — never by starting a server or introspecting it live over stdio
 * (`registry.ts`'s live-introspection approach cannot run in a consumer's
 * install). Each tool's `annotations.readOnlyHint` is REQUIRED, reviewed typed
 * data authored beside the tool at registration (design C8's "ANNOTATIONS, not
 * a hand list" decision) — this script FAILS LOUDLY if any registered tool
 * lacks one, rather than silently treating it as not-read-only.
 *
 * The read-only set this manifest records IS the approval list: `src/cli/shared/
 * mcpConfig/{kiro,cc}.ts` filter this manifest for `readOnlyHint: true` to
 * compute each target's approvals, replacing the pre-123 static template's
 * hand-authored `autoApprove` arrays (Req 5.3/5.4 — measured drift: the docs
 * entry omitted `find_docs`, the application entry approved the never-registered
 * `validate_component` while omitting 15 of 21 real tools).
 *
 * Usage:
 *   npx tsx scripts/build-tool-manifest.ts   # writes dist/mcp/tool-manifest.json
 */

import * as fs from 'fs';
import * as path from 'path';

// Static imports of each server's REGISTRATION MODULE — the same `tools` array
// each server passes to its own `ListToolsRequestSchema` handler. No server is
// constructed or started: every one of these modules gates its bootstrap code
// behind `if (require.main === module)`, so importing it here is side-effect
// free (Req 15A.1 / C8 — "no server started").
import { tools as docsTools } from '../mcp-server/src/index';
import { tools as applicationTools } from '../application-mcp-server/src/index';
import { tools as productTools } from '../product-mcp-server/src/index';

const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUTPUT_PATH = path.join(PROJECT_ROOT, 'dist', 'mcp', 'tool-manifest.json');

/** A registered tool's manifest-relevant shape (Spec 123 C8). */
interface RegisteredToolLike {
  name: string;
  annotations?: { readOnlyHint?: boolean; [k: string]: unknown };
}

export interface ToolManifestEntry {
  name: string;
  readOnlyHint: boolean;
}

export const MCP_SERVER_KEYS = ['designerpunk-docs', 'designerpunk-application', 'designerpunk-product'] as const;
export type McpServerKey = (typeof MCP_SERVER_KEYS)[number];

export interface ToolManifest {
  generatedAt: string;
  note: string;
  servers: Record<McpServerKey, ToolManifestEntry[]>;
}

/**
 * Reduce a server's registration array to `{ name, readOnlyHint }` entries.
 * THROWS if any tool lacks `annotations.readOnlyHint` (design C8: "A test fails
 * if any registered tool lacks one" — this is the build-time twin of that test,
 * so a broken build can never ship an incomplete manifest even if `npm test`
 * was skipped).
 */
export function toManifestEntries(serverKey: McpServerKey, registeredTools: readonly RegisteredToolLike[]): ToolManifestEntry[] {
  return registeredTools.map((tool) => {
    const readOnlyHint = tool.annotations?.readOnlyHint;
    if (typeof readOnlyHint !== 'boolean') {
      throw new Error(
        `build-tool-manifest: '${serverKey}' tool '${tool.name}' has no annotations.readOnlyHint (true/false required — Spec 123 C8).`,
      );
    }
    return { name: tool.name, readOnlyHint };
  });
}

export function buildManifest(): ToolManifest {
  return {
    generatedAt: new Date().toISOString(),
    note:
      'Built from static registration-module imports (Spec 123 C8) — never live stdio introspection. ' +
      'The approval list for each target is the readOnlyHint: true subset (src/cli/shared/mcpConfig/{kiro,cc}.ts).',
    servers: {
      'designerpunk-docs': toManifestEntries('designerpunk-docs', docsTools),
      'designerpunk-application': toManifestEntries('designerpunk-application', applicationTools),
      'designerpunk-product': toManifestEntries('designerpunk-product', productTools),
    },
  };
}

function main(): void {
  const manifest = buildManifest();
  fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

  const counts = MCP_SERVER_KEYS.map((key) => {
    const entries = manifest.servers[key];
    const readOnlyCount = entries.filter((e) => e.readOnlyHint).length;
    return `${key}: ${entries.length} tools (${readOnlyCount} read-only)`;
  });
  console.log(`Wrote ${path.relative(PROJECT_ROOT, OUTPUT_PATH)}`);
  for (const line of counts) console.log(`  ${line}`);
}

if (require.main === module) {
  main();
}
