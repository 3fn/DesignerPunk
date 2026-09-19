# @3fn/core Feedback: Application MCP Serves Stale Component Data After Implementation

**Date**: 2026-05-09
**Reporter**: Thurgood (Spec 000 — Nav-Header-App Hardening, Task 5.3)
**Severity**: Medium — MCP health check passes but data is incorrect
**Package Version**: @3fn/core ^11.3.3

---

## Problem

After completing component hardening work (new contracts, tokens, updated metadata), the Application MCP continues to serve pre-hardening data despite `rebuild_index` reporting success with no errors or warnings.

## Root Cause

The Application MCP is configured to read component source from:
```
COMPONENTS_DIR: ./node_modules/@3fn/core/src/components/core
```

But implementation work writes to the project's source directory:
```
./src/components/core/Nav-Header-App/
```

These are two different locations. The `node_modules` copy is the installed package snapshot — it doesn't reflect local development changes. The `rebuild_index` command re-indexes the stale `node_modules` copy and correctly reports "healthy" because the files it reads are valid (just outdated).

## What We Expected

After running `rebuild_index`, `get_component_full("Nav-Header-App")` should return:
- 3 App-level contracts: `accessibility_no_heading`, `visual_background_override`, `visual_glow`
- 2 component tokens: `navButton.padding.vertical`, `navHeader.padding.inline`
- Updated contexts including "navigation"
- Production-ready purpose text

## What We Got

- Only 1 App-level contract: `accessibility_no_heading` (the pre-existing one)
- 0 component tokens
- Old contexts: `["app-bars", "dashboards", "content-feeds"]`
- Old purpose: "scaffold — architectural foundation, not production-ready"

## Evidence

**Source files (correct, in project src/):**
```
src/components/core/Nav-Header-App/contracts.yaml     → has 3 contracts
src/components/core/Nav-Header-App/component-meta.yaml → has "navigation", production-ready purpose
src/components/core/Nav-Header-App/tokens.ts          → defines both component tokens
```

**MCP source files (stale, in node_modules/):**
```
node_modules/@3fn/core/src/components/core/Nav-Header-App/contracts.yaml → only accessibility_no_heading
node_modules/@3fn/core/src/components/core/Nav-Header-App/component-meta.yaml → old scaffold metadata
```

## MCP Configuration (from `.kiro/settings/mcp.json`)

```json
"designerpunk-application": {
  "command": "node",
  "args": ["./node_modules/@3fn/core/dist/mcp/application-mcp.js"],
  "env": {
    "COMPONENTS_DIR": "./node_modules/@3fn/core/src/components/core",
    ...
  }
}
```

## Suggested Fix Options

### Option A: Allow COMPONENTS_DIR override to point at project source

Let consumers override `COMPONENTS_DIR` in their `.kiro/settings/mcp.json` to point at their local source:

```json
"env": {
  "COMPONENTS_DIR": "./src/components/core"
}
```

This is the simplest fix — consumers who develop components locally point at their source; consumers who only consume the package keep the default.

### Option B: Multi-source indexing

Support multiple component directories with priority (local source overrides package):

```json
"env": {
  "COMPONENTS_DIR": "./src/components/core",
  "COMPONENTS_FALLBACK_DIR": "./node_modules/@3fn/core/src/components/core"
}
```

Local files take precedence; package files fill gaps for components not being actively developed.

### Option C: Sync mechanism

Provide a build script that copies project source into the node_modules location before MCP indexing. Less clean but requires no MCP server changes.

## Workaround (Current)

Manually copy updated files from `src/components/core/Nav-Header-App/` to `node_modules/@3fn/core/src/components/core/Nav-Header-App/` and rebuild. This works until the next `npm install`.

## Impact

- Agents querying `get_component_full` during development get outdated contract/token/metadata information
- `rebuild_index` gives false confidence (reports healthy when data is stale)
- Task 5.3 (MCP health check) cannot fully pass without the workaround
- Any spec that modifies components will hit this same issue

---

## Additional Context

The MCP server also failed to restart during debugging:

```
Error: Cannot find module '/node_modules/@3fn/core/dist/mcp/application-mcp.js'
```

The path in the error is missing the project root prefix. The file exists at the full path (`./node_modules/@3fn/core/dist/mcp/application-mcp.js`). This may be a working directory issue during server spawn — the `node` process might not be starting in the project root.
