# Task 2.7 Completion: Fix platform filtering order

**Date**: 2026-04-23
**Task**: 2.7 Fix platform filtering order
**Type**: Implementation
**Status**: Complete

---

## Artifacts Created

| Artifact | Path |
|----------|------|
| Server shell (updated) | `product-mcp-server/src/index.ts` |
| Platform filtering tests | `product-mcp-server/src/__tests__/PlatformFiltering.test.ts` |

## Implementation Notes

**Bug found**: `enrichOneOffs` didn't handle branched UI trees (with `shared`/`ios`/`web` keys). It walked the branched object directly, only recursing into `node.children` — missing nodes inside `shared` and platform arrays. This meant unfiltered specs (no platform param) would silently skip one-off enrichment and warnings for all UI tree nodes.

**Fix**: Updated `enrichOneOffs` to detect branched UI trees (has `shared` key) and walk `shared` + platform arrays separately — same pattern as `walkUiTree` in ProductIndexer.

**Platform-aware behavior**: After `filterPlatform` merges shared + requested platform into a flat array, `enrichOneOffs` only sees relevant nodes. A web agent won't see iOS-only one-off warnings because iOS nodes are already gone.

## Validation

- [x] Web agent sees shared missing widget but not iOS-only missing widget ✅
- [x] iOS agent sees both shared and iOS missing widgets ✅
- [x] No platform filter sees all missing widgets ✅
- [x] 85/85 tests pass across 7 suites
