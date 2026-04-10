# Issue: Token Index Not Loading in Application MCP

**Date**: 2026-04-10
**Discovered by**: Lina (health check)
**Spec**: 096 - MCP Infrastructure for Products
**Severity**: Medium — tokens indexed at 0/0/0 despite generation pipeline producing all three YAML files
**Status**: ✅ Resolved (2026-04-10) — Ada applied Option A

---

## Problem

`get_component_health` reports zero tokens across all tiers:

```json
"tokensIndexed": {
  "primitives": 0,
  "semantics": 0,
  "componentTokens": 0
}
```

The token index files exist and are populated:

| File | Expected Count |
|------|---------------|
| `token-index/primitives.yaml` | 217 |
| `token-index/semantics.yaml` | 193 |
| `token-index/components.yaml` | 27 |

## Root Cause

`tokenIndexDir` is set from `process.env.TOKEN_INDEX_DIR` in `application-mcp-server/src/index.ts` (line 342), but:

1. The env var is **not configured** in `.kiro/settings/mcp.json` under the `designerpunk-components` server entry
2. Unlike `componentsDir`, there is **no default fallback** in the code — when the env var is undefined, the token indexer is skipped entirely

The graceful degradation works as designed (no crash, just empty results), but the result is that token query tools return nothing.

## Resolution Plan

### Option A: Code default (Ada)
Add `DEFAULT_TOKEN_INDEX_DIR` constant in `application-mcp-server/src/index.ts`:
```typescript
const DEFAULT_TOKEN_INDEX_DIR = 'token-index';
// ...
tokenIndexDir: process.env.TOKEN_INDEX_DIR || DEFAULT_TOKEN_INDEX_DIR,
```
Token index works out of the box without extra env config.

### Option B: mcp.json update (Thurgood)
Add `TOKEN_INDEX_DIR` to `.kiro/settings/mcp.json` for the current running server. Immediate fix while Option A is applied.

### Startup integration test (follow-up)
Add a test that validates the Application MCP starts with default paths and loads all expected data (components, tokens, patterns, templates, guidance). Catches config gaps before they reach production.

**Status**: Ada handles Option A, Thurgood handles Option B.

## Resolution

Option A applied: added `DEFAULT_TOKEN_INDEX_DIR = 'token-index'` constant and used it as fallback when `TOKEN_INDEX_DIR` env var is not set. Token index now loads out of the box without extra env config.

Changes:
- `application-mcp-server/src/index.ts` line 24: added `DEFAULT_TOKEN_INDEX_DIR`
- `application-mcp-server/src/index.ts` line 342: `tokenIndexDir: process.env.TOKEN_INDEX_DIR || DEFAULT_TOKEN_INDEX_DIR`

Option B (mcp.json update) still recommended for Thurgood as belt-and-suspenders — explicit config is good documentation even when the default works.

## Questions for Ada

- The generation pipeline (Task 1) produces the index files. Should the default path assumption (`token-index/` relative to working directory) be hardened, or is there a reason to keep it env-only?
- Any concerns about the token index loading implicitly vs. explicitly?

## Questions for Thurgood

- The Task 2 completion doc reports "Missing token index — Graceful — empty results with warning." The graceful degradation works, but the test coverage didn't catch that the *production config* would hit this path. Should there be an integration-level check that validates the MCP config includes all expected env vars?
- The Task 3 completion doc (Integration and Documentation) lists updating the Integration Guide and agent prompts, but doesn't mention updating `mcp.json`. Was this a gap in the task scope?

## Files Involved

- `application-mcp-server/src/index.ts` (line 342) — missing default
- `.kiro/settings/mcp.json` — missing `TOKEN_INDEX_DIR` env var
- `token-index/` — files exist, just not being read
