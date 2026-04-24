# Task 2.6 Completion: Register new tools and wire handlers in index.ts

**Date**: 2026-04-23
**Task**: 2.6 Register new tools and wire handlers in index.ts
**Type**: Implementation
**Status**: Complete

---

## Artifacts Created

| Artifact | Path |
|----------|------|
| Server shell (rewritten) | `product-mcp-server/src/index.ts` |

## Implementation Notes

**5 new tools registered**: `find_screens`, `get_product_component`, `get_screen_state_model`, `find_principles`, `find_templates`.

**2 tools updated**: `list_experience_map` (now accepts 6 filter params, returns enriched entries), `get_screen_spec` (attaches `_componentGaps`).

**`get_product_health` extended**: Now includes `reverseIndexSizes`, `gapCounts`, `catalogSize`, `principles` count.

**`COMPONENT_DIR` env var**: Configurable component source directory, defaults to `src/components/core`.

**Query module wiring**: `ScreenQuery` and `ExperienceMapQuery` instantiated after indexing via `indexAndBuildQueries()`. `rebuild_product_index` rebuilds queries too.

**`resolveScreenSpec` updated**: Now takes `screenName` param to attach `_componentGaps` from `indexer.getGaps()`.

**Server version bumped**: `0.1.0` → `0.2.0`.

**Shared filter schema**: `filterSchema` object reused by `find_screens` and `list_experience_map` tool definitions — no duplication.

## Validation

- [x] TypeScript compilation clean
- [x] 82/82 tests pass across 6 suites
- [x] All 12 tools registered (7 existing + 5 new)
- [x] `COMPONENT_DIR` env var handled with default
