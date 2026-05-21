# Issue: Application MCP Token Queries Return Empty Results

**Date**: 2026-05-18
**Severity**: Medium (token tools non-functional, workaround exists via source)
**Domain**: Application MCP Server / Token Indexer
**Discovered by**: Ada (during token count investigation)
**Status**: ✅ Resolved (2026-05-18)
**Resolved by**: Thurgood
**Fix**: Option B — eliminated duplicate TokenIndexer, exposed ComponentIndexer's internal instance via getter

---

## Summary

All token query tools (`search_tokens`, `get_token_details`, `get_token_family`, `get_token_consumers`) return empty results despite `get_component_health` correctly reporting 217 primitives, 193 semantics, and 27 component tokens indexed.

## Reproduction

```
search_tokens({ family: "spacing" })        → []
get_token_details({ name: "space200" })      → { error: "Token 'space200' not found" }
get_token_family({ family: "color" })        → []
```

## Root Cause

`application-mcp-server/src/index.ts` has **two separate `TokenIndexer` instances**:

1. **`ComponentIndexer.tokenIndexer`** (internal, line 41 of ComponentIndexer.ts) — loaded during `indexComponents()` via `await this.tokenIndexer.indexTokens(tokenIndexDir)`. This is what `getHealth()` reports from.

2. **`ComponentMCPServer.tokenIndexer`** (server-level, line 247 of index.ts) — this is what the tool handlers query against. **Never loaded during `start()`.**

In `start()` (line ~253):
```typescript
await this.indexer.indexComponents(..., this.paths.tokenIndexDir);
// ↑ loads ComponentIndexer's INTERNAL tokenIndexer

// MISSING: await this.tokenIndexer.indexTokens(this.paths.tokenIndexDir);
// ↑ server-level tokenIndexer used by tool handlers is never loaded
```

The `rebuild_index` handler (line ~338) does load it:
```typescript
await this.tokenIndexer.indexTokens(this.paths.tokenIndexDir);
```

So calling `rebuild_index` would temporarily fix the issue until next server restart.

## Fix

**Option A (one-liner):** Add to `start()` after `indexComponents`:
```typescript
if (this.paths.tokenIndexDir) {
  await this.tokenIndexer.indexTokens(this.paths.tokenIndexDir);
}
```

**Option B (architectural, preferred):** Eliminate the duplicate. Expose `ComponentIndexer`'s internal `TokenIndexer` via a getter and have tool handlers use it:
```typescript
// In ComponentIndexer:
getTokenIndexer(): TokenIndexer { return this.tokenIndexer; }

// In tool handlers:
case 'search_tokens':
  return this.indexer.getTokenIndexer().search({...});
```

Option B removes the duplication that caused this bug and prevents future drift.

## Workaround

Agents can call `rebuild_index` after server start, or fall back to reading token source files directly (as Ada did during the investigation).

## Assigned To

Thurgood (Civitas steward — MCP infrastructure health)

---

## Resolution

**Applied**: Option B — single source of truth

**Changes:**
- `application-mcp-server/src/indexer/ComponentIndexer.ts`: Added `getTokenIndexer()` getter
- `application-mcp-server/src/index.ts`: Removed duplicate `TokenIndexer` field, import, and constructor instantiation. Updated tool handlers and health log to use `this.indexer.getTokenIndexer()`. Removed redundant `indexTokens()` from `rebuild_index`.

**Verification:**
- 332 test suites / 8368 tests pass
- `get_token_details({ name: "space300" })` returns correct data after rebuild
- Cold-start fix confirmed by code path analysis (tool handlers now use the instance loaded by `indexComponents()`)

**Root cause prevention:** The structural defect (two instances of the same indexer) is eliminated. Future token indexer changes only need to happen in one place.
