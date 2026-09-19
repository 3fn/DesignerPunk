# Docs MCP: rebuild_index Tool Not Surfacing in Agent Sessions

**Date**: 2026-04-23
**Severity**: Low (workaround: restart server)
**Agent**: Thurgood
**Status**: Open

## Problem

The `rebuild_index` tool is registered by the Docs MCP server and listed in `autoApprove` in `mcp.json`, but does not appear in agent session tool lists. This means agents cannot trigger a full reindex to clear the "degraded" health status caused by stale index timestamps.

## Verified Configuration

All layers are correctly configured:

1. **Server code** (`mcp-server/src/index.ts` line ~108): `rebuildIndexTool` is in the `ListToolsRequestSchema` handler array.
2. **Server code** (`mcp-server/src/index.ts` line ~175): `rebuild_index` case exists in `CallToolRequestSchema` handler.
3. **Dist build** (`mcp-server/dist/tools/rebuild-index.js`): Compiled and present (Dec 16 2025).
4. **MCP settings** (`.kiro/settings/mcp.json`): `rebuild_index` listed in `autoApprove` for `designerpunk-docs` server.
5. **Agent config** (`.kiro/agents/thurgood.json`): `"tools": ["*"]` and `"includeMcpJson": true`.

## What Works

All other Docs MCP tools surface correctly:
- `get_documentation_map` ✅
- `get_document_summary` ✅
- `get_document_full` ✅
- `get_section` ✅
- `list_cross_references` ✅
- `validate_metadata` ✅
- `get_index_health` ✅

Only `rebuild_index` is missing.

## Impact

- Docs MCP shows "degraded" status after file modifications because the full index timestamp is stale
- The file watcher reindexes individual files correctly (content is accurate), but doesn't update the full index timestamp
- Only `rebuild_index` or a server restart resets the timestamp
- Agents cannot self-service this — requires manual server restart

## Workaround

Restart the Docs MCP server. On startup, it runs a full index which resets the timestamp.

## Investigation Notes

- First observed during Phase 1 MCP audit (2026-04-10) — documented in `docs/roadmap/phase1-mcp-audit.md`
- Reproduced again 2026-04-23 in Thurgood session
- Possible causes:
  - Kiro CLI tool discovery caches the tool list at session start before the server fully initializes
  - Tool name validation filter excludes `rebuild_index` for an unknown reason
  - The `rebuild_index` handler is `async` (uses `await`) while all other handlers are synchronous — possible MCP SDK or Kiro CLI issue with async tool handlers
- Cannot diagnose further from inside an agent session — needs Kiro CLI debugging
