# Task 4.5 Completion: Fix CLI Module Resolution

**Date**: 2026-04-08
**Spec**: 095 - Ecosystem Package Assembly
**Task**: 4.5 - Fix CLI Module Resolution (Blocker)
**Type**: Implementation
**Validation Tier**: 2 - Standard
**Agent**: Ada

---

## What Was Done

Resolved three related issues that blocked CLI operation in product repos:

### 1. CLI Module Resolution (`.kiro/issues/2026-04-08-cli-module-resolution.md`)

**Problem**: `dist/cli/designerpunk.js` couldn't resolve pipeline modules (`../generators/generateTokenFiles`) because generators ship as TypeScript source in `src/`, not compiled JS in `dist/`.

**Fix**: Created `bin/designerpunk.js` — a thin JS wrapper that registers `tsx` via `require('tsx/cjs/api').register()`, then loads `src/cli/designerpunk.ts` directly. The entire pipeline runs as TypeScript through `tsx`.

### 2. MCP Path Resolution (`.kiro/issues/2026-04-08-mcp-cli-path-resolution.md`)

**Problem**: `resolvePackageRoot()` used hardcoded `@designerpunk/core` package name in `require.resolve`, which didn't match the actual published name (`@3fn/core`).

**Fix**: Replaced with `__dirname`-relative resolution. Works regardless of package name, in both product repo and DesignerPunk repo contexts.

### 3. MCP Server Bundling (`.kiro/issues/2026-04-08-mcp-server-bundling.md`)

**Problem**: MCP servers' dependencies (`js-yaml`, `@modelcontextprotocol/sdk`, etc.) weren't installed in product repos.

**Fix**: Pre-bundled both MCP servers with esbuild into `dist/mcp/application-mcp.js` (315KB) and `dist/mcp/docs-mcp.js` (218KB). CLI spawns `node` for bundled servers instead of `tsx`.

---

## Validation

- `node bin/designerpunk.js generate` — works, full pipeline executes
- `node bin/designerpunk.js --help` — all three commands listed
- Full test suite: 319 suites, 8204 tests, all passing
- All three issue docs updated with resolution details
- Steering doc (`component-mcp-query-guide.md`) updated with CLI startup command

---

## Artifacts Created/Modified

1. `bin/designerpunk.js` — new, thin JS wrapper bootstrapping tsx
2. `src/cli/designerpunk.ts` — `resolvePackageRoot()` uses `__dirname`, MCP commands use bundled servers
3. `src/config/ConfigLoader.ts` — `tokenSourceRoot` uses `__dirname` resolution
4. `src/config/__tests__/ConfigLoader.test.ts` — updated for `__dirname` behavior
5. `designerpunk.config.ts` — fixed import to use `.ts` extension
6. `package.json` — added `build:mcp` script, `tsx` dependency
7. `dist/mcp/application-mcp.js` — bundled Application MCP server
8. `dist/mcp/docs-mcp.js` — bundled Docs MCP server
9. `.kiro/steering/component-mcp-query-guide.md` — updated startup command

---

## Requirements Traced

- R5 AC 1: `npx designerpunk generate` works from product repo ✅
- R5 AC 2: `npx designerpunk mcp:app` starts with resolved paths ✅
- R5 AC 3: `npx designerpunk mcp:docs` starts with resolved paths ✅
