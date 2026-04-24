# Task 2.3 Completion: Wire walkUiTree with ReverseIndexBuilder and GapDetector

**Date**: 2026-04-23
**Task**: 2.3 Wire walkUiTree with ReverseIndexBuilder and GapDetector
**Type**: Implementation
**Status**: Complete

---

## Artifacts Created

| Artifact | Path |
|----------|------|
| ProductIndexer (updated) | `product-mcp-server/src/indexer/ProductIndexer.ts` |
| Integration tests | `product-mcp-server/src/__tests__/ProductIndexerWalk.test.ts` |

## Implementation Notes

**Walk ownership**: `walkUiTree` lives in `ProductIndexer` (per design feedback). It calls `reverseIndexBuilder.addComponent()`/`addToken()` and `gapDetector.check()` per node. Builder and detector have no knowledge of each other.

**Platform branching**: Walk handles `shared` + platform arrays. If `ui-tree` has a `shared` key, walks `shared` always and walks any other key whose value is an array. Non-array platform values (e.g., `{ navigation: 'NavigationStack push' }`) are skipped — they're metadata, not UI tree nodes.

**Enriched experience map**: Built after the walk. Each entry gets `referencedComponents` (from walk), `referencedDomainObjects` (from domain object reverse index), `blockedReasons` (from spec), and `tags` (from spec).

**Template cross-refs**: Built during the walk loop from `spec.template` field. `templateToScreens` Map exposed via `getTemplateScreens()`.

**Constructor change**: Now takes optional `componentDir` (default `'src/components/core'`). Existing callers in `index.ts` pass only `productDir` and get the default.

## Validation

- [x] 23/23 integration tests pass (ProductIndexerWalk.test.ts)
- [x] Component reverse index: 5 tests (multi-screen, one-offs, gap components)
- [x] Token reverse index: 3 tests (dot-notation, multi-screen)
- [x] Domain object reverse index: 1 test
- [x] Gap detection: 6 tests (not-found, one-off exclusion, path, empty)
- [x] Enriched experience map: 5 tests (components, domain objects, blockedReasons, tags)
- [x] Template cross-refs: 2 tests
- [x] 58/58 tests pass across all 4 test suites
