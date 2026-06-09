# Task 2.1 Completion: Add three-state health and staleness detection to Application MCP

**Date**: 2026-06-09
**Task**: 2.1 Add three-state health and staleness detection to Application MCP
**Type**: Implementation
**Status**: Complete

---

## Changes

| File | Change |
|------|--------|
| `application-mcp-server/src/models/index.ts` | Changed `IndexHealthStatus` from `'healthy' \| 'degraded' \| 'empty'` to `'healthy' \| 'degraded' \| 'failed'`. Added `staleFiles: string[]` to `IndexHealth`. |
| `application-mcp-server/src/indexer/ComponentIndexer.ts` | Added `lastIndexTimeMs` and `dataDirs` fields. Stored data dirs during `indexComponents`. Added `getStaleFiles()` method with recursive mtime scanning. Updated `getHealth()` to use `'failed'` for empty state and include `staleFiles` in `'degraded'` determination. |
| `application-mcp-server/src/indexer/__tests__/ComponentIndexer.test.ts` | Updated `'empty'` → `'failed'` assertion |
| `application-mcp-server/src/indexer/__tests__/HealthStates.test.ts` | **New** — 7 tests for health state transitions |

## Health State Logic

| Condition | Status |
|-----------|--------|
| No components indexed (count === 0) | `failed` |
| Components indexed + (staleFiles > 0 OR warnings > 0) | `degraded` |
| Components indexed + no stale files + no warnings | `healthy` |

## Validation

- 7/7 health state tests passing
- 13/13 existing ComponentIndexer tests passing
- Full Application MCP suite: 224/224
- Requirements addressed: R2 AC1, R2 AC3-5
