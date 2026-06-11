# Issue: CLI Should Be Bundled (Remove ./src/* Wildcard Export)

**Date**: 2026-06-10
**Severity**: Medium — security/API surface concern, not functionally broken
**Related**: v12.0.1 hotfix (added `"./src/*": "./src/*"` to exports)
**Status**: Resolved

---

## Problem

The v12.0.1 hotfix added `"./src/*": "./src/*"` to the package.json exports map to unblock Node 22's strict export enforcement. This works but exposes the entire internal source tree as a public package export. Any consumer can now import from deep internal paths — defeating the purpose of the exports field and creating implicit coupling to internal file structure.

## Root Cause

`designerpunk.config.ts` used `import { defineConfig } from './src/config/defineConfig'` (no `.ts` extension). Node 22's `await import()` uses ESM-style resolution which requires explicit extensions for relative TypeScript imports. The wildcard export was a workaround for this missing extension — not the correct fix.

Additionally, Spec 114 added a `require.main === module` guard to `designerpunk.ts` that prevented `main()` from running when loaded via `bin/designerpunk.js` (since `require.main` is the bin file, not the CLI module).

## Fix Applied

1. Added `.ts` extension to `designerpunk.config.ts` import: `'./src/config/defineConfig.ts'`
2. Exported `__main()` from `designerpunk.ts` for `bin/designerpunk.js` to call explicitly
3. Removed `"./src/*": "./src/*"` wildcard export from `package.json`

## Files Changed

- `designerpunk.config.ts` — added `.ts` extension to import
- `src/cli/designerpunk.ts` — exported `__main` for bin entry
- `bin/designerpunk.js` — calls `__main()` explicitly
- `package.json` — removed `./src/*` wildcard export

## Root Cause

The CLI (`bin/designerpunk.js`) uses `tsx` to run TypeScript source directly at runtime. This requires cross-module resolution across `src/cli/`, `src/generators/`, `src/tokens/`, `src/types/`, etc. Node 22 enforces the exports map for packages in `node_modules`, blocking these internal resolutions.

## Correct Fix

Bundle the CLI (same pattern as MCP servers):

```bash
npx esbuild src/cli/designerpunk.ts --bundle --platform=node --format=cjs --outfile=dist/cli/designerpunk.js
```

Then `bin/designerpunk.js` becomes:
```javascript
#!/usr/bin/env node
require('../dist/cli/designerpunk.js');
```

No tsx runtime. No internal imports at consumer runtime. No wildcard exports needed. The `"./src/*"` export can be removed.

## Prior Art

The MCP servers already follow this pattern:
- `dist/mcp/application-mcp.js` (bundled from `application-mcp-server/src/index.ts`)
- `dist/mcp/docs-mcp.js` (bundled from `mcp-server/src/index.ts`)
- `dist/mcp/product-mcp.js` (bundled from `product-mcp-server/src/index.ts`)

## Scope

1. Add CLI bundle step to `npm run build` (esbuild, same config as MCP bundles)
2. Update `bin/designerpunk.js` to require bundled output
3. Remove `"./src/*": "./src/*"` from exports
4. Keep `"./src/types/*"`, `"./build"`, `"./blend"` as intentional public exports (they're already there)
5. Verify `npx designerpunk generate/init/sync/validate/mcp:*` all work from consumer context

## Effort

Small — 1-2 hours. The esbuild config already exists for MCP servers. Copy the pattern.
