# Task 1 Completion: MCP Path Configuration (WS3)

**Date**: 2026-04-09
**Spec**: 081 - Product MCP Design
**Task**: 1 - MCP Path Configuration (WS3)
**Type**: Implementation
**Validation Tier**: 2 - Standard
**Agent**: Ada

---

## What Was Done

Made the Application MCP accept explicit data paths instead of deriving them from the components directory via `../../..`. All paths are now configurable via env vars, with backward-compatible defaults.

### Changes

**`application-mcp-server/src/index.ts`**:
- Added `DataPaths` interface with all configurable paths
- `ComponentMCPServer` constructor accepts `DataPaths` instead of a single `componentsDir` string
- Startup reads env vars: `COMPONENTS_DIR`, `PATTERNS_DIR`, `TEMPLATES_DIR`, `GUIDANCE_DIR`, `REGISTRY_PATH`, `TOKEN_INDEX_DIR`
- `rebuild_index` handler passes explicit paths

**`application-mcp-server/src/indexer/ComponentIndexer.ts`**:
- `indexComponents` accepts optional `patternsDir`, `templatesDir`, `guidanceDir` parameters
- When provided, uses explicit paths. When not provided, falls back to `../../..` derivation (backward compatible)

**`src/cli/designerpunk.ts`**:
- `runMcpApp()` resolves all data paths from the package root and passes them as env vars to the bundled server

### Env Vars

| Env Var | Purpose | Default |
|---------|---------|---------|
| `COMPONENTS_DIR` | Component source directory | `src/components/core` |
| `PATTERNS_DIR` | Experience patterns directory | Derived from components dir |
| `TEMPLATES_DIR` | Layout templates directory | Derived from components dir |
| `GUIDANCE_DIR` | Family guidance directory | Derived from components dir |
| `REGISTRY_PATH` | Family registry YAML path | Derived from components dir |
| `TOKEN_INDEX_DIR` | Token data index (Spec 096) | Not set (conditional) |

### Docs MCP

No changes needed — `MCP_STEERING_DIR` already works as an explicit path.

### Product MCP

`PRODUCT_DIR` will be implemented in Task 2.1 (server scaffold).

---

## Validation

- Full test suite: 319 suites, 8204 tests, all passing
- Backward compatible: Application MCP starts with default paths when env vars aren't set

---

## Artifacts Modified

1. `application-mcp-server/src/index.ts` — `DataPaths` interface, constructor, startup, rebuild handler
2. `application-mcp-server/src/indexer/ComponentIndexer.ts` — optional path parameters on `indexComponents`
3. `src/cli/designerpunk.ts` — passes all resolved paths to Application MCP

---

## Requirements Traced

- R8 AC 1: Application MCP accepts explicit paths for all data sources ✅
- R8 AC 2: Default paths derived from package root (backward compatible) ✅
- R8 AC 5: CLI resolves paths and passes to server ✅
- R8 AC 6: Env var overrides take precedence ✅
