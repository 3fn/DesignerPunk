# MCP Servers Need Pre-Bundled for Package Distribution

**Date**: 2026-04-08
**Severity**: High (blocks Task 5.4 — MCP validation)
**Agent**: Lina (found during fresh-repo validation)
**Blocks**: Spec 095 Task 5.4 (MCP portion)
**Status**: ✅ Resolved (2026-04-08)
**Resolved by**: Ada

## Problem

MCP servers ship as TypeScript source with their own `package.json` and dependencies (`js-yaml`, `@modelcontextprotocol/sdk`, `glob`, etc.). When a product installs `@3fn/core`, only the main package's dependencies are installed — the MCP servers' dependencies are not.

```
Error: Cannot find module 'js-yaml'
Require stack:
- node_modules/@3fn/core/application-mcp-server/src/indexer/parsers.ts
```

## Resolution

Pre-bundled both MCP servers with esbuild into standalone JS files:

```
dist/mcp/application-mcp.js  (315KB — all dependencies bundled)
dist/mcp/docs-mcp.js         (218KB — all dependencies bundled)
```

### Changes

- `src/cli/designerpunk.ts` — MCP commands now spawn `node dist/mcp/application-mcp.js` instead of `tsx application-mcp-server/src/index.ts`. No `tsx` needed for MCP servers.
- `package.json` — added `build:mcp` script using esbuild, included in `npm run build` pipeline.
- `spawnServer()` — accepts `bundled` flag: `true` uses `node` (bundled JS), `false` uses `tsx`/`ts-node` (TypeScript).

### Benefits

- No dependency resolution issues — everything bundled into one file per server
- No `tsx` needed for MCP servers — plain `node` execution
- Smaller footprint — one file per server instead of entire source tree + dependencies
- `files` field ships `dist/mcp/` instead of needing MCP server dependencies declared

### Build Step

```json
"build:mcp": "npx esbuild application-mcp-server/src/index.ts --bundle --platform=node --format=cjs --outfile=dist/mcp/application-mcp.js && npx esbuild mcp-server/src/index.ts --bundle --platform=node --format=cjs --outfile=dist/mcp/docs-mcp.js"
```

## Lesson

Packages with sub-projects that have their own dependency trees need those dependencies either declared in the main `package.json` or pre-bundled. Pre-bundling is cleaner — it avoids polluting the main dependency list with internal implementation details and produces self-contained artifacts.
