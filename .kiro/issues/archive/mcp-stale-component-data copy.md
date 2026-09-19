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

## Resolution

The @3fn/core team confirmed Option A. Fix applied:

```json
"COMPONENTS_DIR": "./src/components/core"
```

**Critical**: After changing `mcp.json`, a full Kiro restart is required. The MCP server does not pick up env var changes on reconnect — it needs a cold start. `rebuild_index` also does NOT re-read files if the server process is still running with old env vars. We went through 4 rebuild attempts before realizing the server was still using the cached `node_modules` path.

### Additional Fix Required: Schema Format Compatibility

After pointing `COMPONENTS_DIR` at project source, the indexer still wasn't picking up new contracts and tokens. Two format issues in the source files:

**1. `contracts.yaml` — `excluded:` vs `excludes:`**

The indexer parser reads `doc.excludes` (plural with 's'). The file had `excluded:` (past tense). Fix: rename the key.

**2. `Nav-Header-App.schema.yaml` — token format**

The indexer expects:
```yaml
tokens:
  component:
    - navButton.padding.vertical
    - navHeader.padding.inline
```

Not:
```yaml
tokens:
  navButton.padding.vertical:
    reference: space250
    description: ...
```

The key-value object format is human-readable but not what the indexer's `extractTokens()` function parses. It expects a flat array under `tokens.component`.

---

## Second Issue: TOKEN_INDEX_DIR Still Points to node_modules

After resolving the COMPONENTS_DIR issue, `get_token_consumers("navButton.padding.vertical")` returns empty. The token-consumer relationship isn't indexed because:

```json
"TOKEN_INDEX_DIR": "./node_modules/@3fn/core/token-index"
```

This directory contains the pre-built token index from the published package. It doesn't know about component tokens defined in the project's local source. The consumer relationship (Nav-Header-App → navButton.padding.vertical) isn't captured.

**Impact**: `get_token_consumers()` and `search_tokens()` for component tokens return empty results. The tokens show up in `get_component_summary` (tokenCount: 2) because that reads from the schema, but the reverse lookup (token → consumers) doesn't work.

**Suggested fix**: Either:
- Allow `TOKEN_INDEX_DIR` to also point at project source (same pattern as COMPONENTS_DIR fix)
- Or have the indexer build token-consumer relationships from schema.yaml token declarations during `rebuild_index`

**Severity**: Low — the component correctly reports its tokens, but the reverse lookup is broken. Agents can still find which tokens a component uses; they just can't find which components use a given token.

---

## Timeline of Debugging

1. Ran `rebuild_index` — healthy, no errors. Assumed success.
2. Ran `get_component_full` — stale data. Only old contract, old metadata.
3. Discovered `COMPONENTS_DIR` pointed to `node_modules` (stale package copy).
4. Applied config fix (`./src/components/core`).
5. MCP server reconnected but still returned stale data.
6. Discovered server wasn't picking up new env vars on reconnect.
7. Full Kiro restart resolved the env var issue.
8. Still only 9 contracts (expected 11). Discovered `excluded:` vs `excludes:` typo.
9. Still 0 tokens. Discovered schema token format incompatibility.
10. After format fixes + rebuild: all 11 contracts, 2 tokens, correct metadata. ✅

**Total debugging time**: ~20 minutes across multiple rebuild/restart cycles.

**Root causes**: 
- Package default config assumes consumer workflow, not developer workflow
- No error/warning when indexer can't parse a contracts.yaml or schema.yaml field (silent failure)
- Server restart required for env var changes (not documented)

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
