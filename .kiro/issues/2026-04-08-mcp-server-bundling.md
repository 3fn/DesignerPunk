# MCP Servers Need Pre-Bundled for Package Distribution

**Date**: 2026-04-08
**Severity**: High (blocks Task 5.4 — MCP validation)
**Agent**: Lina (found during fresh-repo validation)
**Blocks**: Spec 095 Task 5.4 (MCP portion)

## Problem

MCP servers ship as TypeScript source with their own `package.json` and dependencies (`js-yaml`, `@modelcontextprotocol/sdk`, `glob`, etc.). When a product installs `@3fn/core`, only the main package's dependencies are installed — the MCP servers' dependencies are not.

```
Error: Cannot find module 'js-yaml'
Require stack:
- node_modules/@3fn/core/application-mcp-server/src/indexer/parsers.ts
```

## What Works

- Path resolution ✅ — CLI correctly finds MCP server at package root
- Connection details print ✅ — protocol, data dir, server path shown
- Server entry point loads ✅ — `tsx` resolves the TypeScript

## What Fails

Server imports `js-yaml` (and other dependencies) which aren't installed in the product repo's `node_modules`.

## Recommended Fix: Pre-Bundle MCP Servers

Use esbuild (already a devDependency) to compile each MCP server into a standalone JS file with all dependencies bundled:

```bash
# Application MCP
esbuild application-mcp-server/src/index.ts --bundle --platform=node --outfile=dist/mcp/application-mcp.js

# Docs MCP  
esbuild mcp-server/src/index.ts --bundle --platform=node --outfile=dist/mcp/docs-mcp.js
```

The CLI's `mcp:app` and `mcp:docs` commands then spawn `node dist/mcp/application-mcp.js` instead of `tsx application-mcp-server/src/index.ts`.

Benefits:
- No dependency resolution issues — everything is bundled
- No `tsx` needed for MCP servers — they're plain JS
- Smaller footprint — one file per server instead of entire source tree
- `files` field can ship `dist/mcp/` instead of `mcp-server/src/` and `application-mcp-server/src/`

The MCP server source still ships in `src/` for reference/modification, but the bundled versions are what the CLI runs.

## Build Step

Add to `npm run build` pipeline:
```json
"build:mcp": "esbuild application-mcp-server/src/index.ts --bundle --platform=node --outfile=dist/mcp/application-mcp.js && esbuild mcp-server/src/index.ts --bundle --platform=node --outfile=dist/mcp/docs-mcp.js"
```

## Owner

Ada — MCP server infrastructure + build pipeline.
