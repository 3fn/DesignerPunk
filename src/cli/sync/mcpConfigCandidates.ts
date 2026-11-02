/**
 * The MCP-config files `sync` reads for its MCP checks, relative to the project root. One list,
 * shared by the stale-`MCP_STEERING_DIR` check (`SteeringDirCheck.ts`) and the pre-123 entry
 * check (`McpConfigCheck.ts`), so the two never scan different files.
 *
 * - `.kiro/settings/mcp.json`: Kiro's, which `init` / `attach --target=kiro` writes.
 * - `.mcp.json`: Claude Code's, which `attach --target=cc` writes (`shared/mcpConfig/cc.ts`).
 * - `.cursor/mcp.json`: Cursor's, which no current target writes; a pre-123 install may hold one.
 */
export const MCP_CONFIG_CANDIDATES: readonly string[] = [
  '.cursor/mcp.json',
  '.kiro/settings/mcp.json',
  '.mcp.json',
];
