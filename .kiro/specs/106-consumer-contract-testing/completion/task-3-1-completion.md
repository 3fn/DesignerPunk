# Task 3.1 Completion: Add three-state health, staleness detection, and file watcher to Product MCP

**Date**: 2026-06-09
**Task**: 3.1 Add three-state health, staleness detection, and file watcher to Product MCP
**Type**: Implementation
**Status**: Complete

---

## Changes

| File | Change |
|------|--------|
| `product-mcp-server/src/indexer/ProductIndexer.ts` | Added `lastIndexTimeMs`, `computeMaxMtime`, `getStaleFiles`, `scanStale`, `walkMaxMtime`. Updated `getHealth()` to three-state with staleFiles. Changed `'empty'` → `'failed'`. |
| `product-mcp-server/src/index.ts` | Added `ProductFileWatcher` (inline fs.watch with 200ms debounce), `startFileWatcher()` method, watcher triggers full reindex on `.yaml`/`.md` changes |

## Validation

- 151/151 product-mcp-server tests passing
- Requirements addressed: R2 AC2-5, R3 AC1-4
