/**
 * The consumer lane's registry from the shipped tool manifest — Spec 123 Task 16.1 (design C8, C20).
 *
 * Split out of `registry.ts` (agent-generator residuals, issue
 * `.kiro/issues/2026-10-01-agent-generator-out-of-grant-residuals.md` item 2c) so
 * `consumer-entry.ts` can import it without reaching `registry.ts`'s top-level MCP SDK imports.
 * PURE: no I/O, no SDK, no dependency on the rest of `registry.ts`. `registry.ts` re-exports
 * everything here as a compatibility seam.
 */

/** One tool as the shipped tool manifest declares it: its name and its read-only annotation. */
export interface DeclaredTool {
  name: string;
  readOnlyHint: boolean;
}

/** A server's declared tools, from the shipped manifest (never from `tools/list`). */
export interface DeclaredServer {
  name: string;
  tools: DeclaredTool[];
}

/**
 * The consumer lane's registry: DECLARATION-keyed like `ToolRegistry` (in `./registry`), but built from the
 * shipped `dist/mcp/tool-manifest.json`, which carries names and `readOnlyHint` only. It has no
 * `entry`, description or schema hash, and none is invented here: a consumer's install cannot
 * boot the servers to learn them (C8, C20 — "never live introspection").
 */
export interface ManifestRegistry {
  servers: DeclaredServer[];
}

/** The shape of `dist/mcp/tool-manifest.json` that {@link fromManifest} reads (`scripts/build-tool-manifest.ts`). */
export interface ToolManifestLike {
  servers: Record<string, ReadonlyArray<{ name: string; readOnlyHint: boolean }>>;
}

/**
 * Build the registry from the shipped tool manifest — PURE, no I/O, no server (design C20's
 * "tool registry | `dist/mcp/tool-manifest.json` (`registry.fromManifest`)"). Servers and tools
 * are sorted by name, as {@link assembleRegistry} sorts them. Throws on a malformed manifest,
 * naming the defect: a consumer emission never guesses which tools exist.
 */
export function fromManifest(manifest: ToolManifestLike, file = 'dist/mcp/tool-manifest.json'): ManifestRegistry {
  const servers = manifest?.servers;
  if (typeof servers !== 'object' || servers === null || Array.isArray(servers)) {
    throw new Error(`fromManifest: ${file} has no "servers" map — rebuild it (npm run build:tool-manifest)`);
  }
  const byName = (a: { name: string }, b: { name: string }): number => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
  return {
    servers: Object.entries(servers)
      .map(([name, tools]) => {
        if (!Array.isArray(tools)) throw new Error(`fromManifest: ${file} server "${name}" has no tool list`);
        return {
          name,
          tools: tools
            .map((t) => {
              if (typeof t?.name !== 'string' || typeof t?.readOnlyHint !== 'boolean') {
                throw new Error(`fromManifest: ${file} server "${name}" has a tool without { name, readOnlyHint }`);
              }
              return { name: t.name, readOnlyHint: t.readOnlyHint };
            })
            .sort(byName),
        };
      })
      .sort(byName),
  };
}

/** The tool names a manifest registry declares for `server` (empty when the server is absent). */
export function declaredToolNames(registry: ManifestRegistry, server: string): Set<string> {
  return new Set(registry.servers.find((s) => s.name === server)?.tools.map((t) => t.name) ?? []);
}
