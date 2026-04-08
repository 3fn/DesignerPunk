# Task 3 Completion: CLI MCP Commands

**Date**: 2026-04-08
**Spec**: 095 - Ecosystem Package Assembly
**Task**: 3 - CLI MCP Commands
**Type**: Implementation
**Validation Tier**: 2 - Standard
**Agent**: Ada

---

## What Was Done

Extended `src/cli/designerpunk.ts` with `mcp:app` and `mcp:docs` subcommands.

### New Commands

**`npx designerpunk mcp:app`** — starts the Application MCP server:
- Resolves package root via `require.resolve('@designerpunk/core/package.json')`, falls back to cwd
- Sets `COMPONENTS_DIR` env var to `{pkgRoot}/src/components/core`
- Spawns server entry point (`application-mcp-server/src/index.ts`) via `tsx` or `ts-node`
- Prints connection details: protocol (stdio), data directory, server path

**`npx designerpunk mcp:docs`** — starts the Docs MCP server:
- Same package root resolution
- Sets `MCP_STEERING_DIR` env var to `{pkgRoot}/.kiro/steering`
- Spawns server entry point (`mcp-server/src/index.ts`)
- Prints connection details

### Implementation Details

- **`resolvePackageRoot()`** — try `require.resolve`, catch and fall back to `cwd`. Same pattern as `ConfigLoader`.
- **`resolveTsRunner()`** — try `tsx` first (product repo), fall back to `ts-node` (dev repo). Error if neither found.
- **`spawnServer()`** — spawns child process with `stdio: 'inherit'` so server output flows to the terminal. CLI stays alive while server runs. Exit code propagated.
- **Zero-config**: paths resolve from the package location automatically. No `designerpunk.config.ts` needed for MCP commands.

### Updated Help

```
DesignerPunk Pipeline CLI

Usage:
  npx designerpunk generate    Generate token files from designerpunk.config.ts
  npx designerpunk mcp:app     Start Application MCP server
  npx designerpunk mcp:docs    Start Docs MCP server
  npx designerpunk --help      Show this help
```

---

## Validation

- CLI help: all three commands listed
- Full test suite: 318 suites, 8198 tests, all passing
- MCP server startup: verified path resolution and env var passing (server spawns correctly; full end-to-end validation in Task 5.4)

---

## Artifacts Modified

1. `src/cli/designerpunk.ts` — added `mcp:app`, `mcp:docs`, `resolvePackageRoot`, `resolveTsRunner`, `spawnServer`

---

## Requirements Traced

- R5 AC 2: `npx designerpunk mcp:app` starts Application MCP with resolved paths ✅
- R5 AC 3: `npx designerpunk mcp:docs` starts Docs MCP with resolved paths ✅
- R5 AC 4: MCP server prints connection details on startup ✅
- R5 AC 5: MCP commands work without config file (zero-config defaults) ✅
