# Task 2.4 Completion: Bundle and Package Integration

**Date**: 2026-04-10
**Spec**: 081 - Product MCP Design
**Task**: 2.4 - Bundle and package integration
**Type**: Implementation
**Validation Tier**: 2 - Standard
**Agent**: Lina

---

## Summary

Bundled the Product MCP server with esbuild, added to the package, and updated the CLI to spawn the bundled version.

## Changes

- `package.json` `build:mcp` script: added `product-mcp-server/src/index.ts` → `dist/mcp/product-mcp.js`
- `src/cli/designerpunk.ts` `runMcpProduct()`: changed from TypeScript source (`product-mcp-server/src/index.ts`) to bundled JS (`dist/mcp/product-mcp.js`), set `bundled: true` so it spawns with `node` instead of `tsx`
- `dist/mcp/` already in `files` field (added during Spec 095) — no `files` change needed

## Validation

| Check | Result |
|-------|--------|
| `dist/mcp/product-mcp.js` exists | ✅ (800KB) |
| `npm pack --dry-run` includes bundle | ✅ |
| `npm test` | 319 suites, 8204 tests, all passing |

## Requirements Traced

- R1 AC 1: `npx designerpunk mcp:product` spawns bundled server ✅
- R1 AC 2: Bundle included in package ✅
