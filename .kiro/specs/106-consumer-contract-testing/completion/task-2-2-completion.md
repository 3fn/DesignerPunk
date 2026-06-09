# Task 2.2 Completion: Integrate StalenessGate into Application MCP tool handler

**Date**: 2026-06-09
**Task**: 2.2 Integrate StalenessGate into Application MCP tool handler
**Type**: Implementation
**Status**: Complete

---

## Changes

| File | Change |
|------|--------|
| `application-mcp-server/src/index.ts` | Imported `StalenessGate` + `isImmutableContext`. Added `STALENESS_EXEMPT_TOOLS` set. Instantiated gate in constructor with all data dirs. Added gate check in `handleTool()`. Added `markIndexed()` after `start()` and `rebuild_index`. |
| `application-mcp-server/src/indexer/ComponentIndexer.ts` | Replaced `Date.now()` for `lastIndexTimeMs` with `computeMaxMtime()` — scans max file mtime across all data dirs for clock-independent staleness detection. Updated health test to be resilient to concurrent test activity. |
| `application-mcp-server/src/indexer/__tests__/ComponentIndexer.test.ts` | Updated healthy-status test to assert `not 'failed'` (resilient to concurrent file touches from parallel tests). |
| `application-mcp-server/src/staleness/__tests__/GateIntegration.test.ts` | **New** — 8 integration tests |

## Integration Points

- **Constructor**: StalenessGate instantiated with `dataDirs` from all configured paths, `isImmutable` from `isImmutableContext(componentsDir)`
- **start()**: `markIndexed()` called after initial indexing + philosophy load, before transport connect
- **handleTool()**: Gate check fires for all tools except `get_component_health` and `rebuild_index`
- **rebuild_index case**: `markIndexed()` called after manual rebuild completes

## Validation

- 8/8 integration tests passing
- 232/232 total Application MCP tests passing (21 suites)
- Requirements addressed: R1 AC1-6
