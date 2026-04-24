# Task 2 Completion: Reverse Indexes, Gap Detection & New Tools

**Date**: 2026-04-23
**Task**: 2. Reverse Indexes, Gap Detection & New Tools
**Type**: Parent
**Status**: Complete
**Spec**: 097-product-mcp-intelligence-layer

---

## Success Criteria Verification

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Three reverse indexes built during indexing | ✅ | component→screens, token→screens, domainObject→screens — verified in ProductIndexerWalk tests |
| Gap detection validates against component-meta.yaml catalog | ✅ | nonexistent-widget and Progress-Stepper-Base detected as not-found |
| `find_screens` returns correct results for all 6 filter params | ✅ | 18 unit tests covering all params individually and in combination |
| `get_product_component`, `get_screen_state_model`, `find_principles`, `find_templates` functional | ✅ | Wired in index.ts handleTool, compilation clean |
| `list_experience_map` enriched with referencedComponents, blockedReasons, supports all 6 filters | ✅ | ExperienceMapQuery delegates to ScreenQuery, 6 unit tests |
| `get_screen_spec` includes `_componentGaps` | ✅ | Attached in resolveScreenSpec |
| Platform filtering produces platform-aware warnings | ✅ | 3 platform filtering tests — web agent doesn't see iOS-only warnings |

## Subtask Summary

| Subtask | Status | Key Outcome |
|---------|--------|-------------|
| 2.1 ReverseIndexBuilder | ✅ | Pure accumulator, 63 lines, 14 unit tests |
| 2.2 GapDetector | ✅ | Reads component-meta.yaml, exact matching, 52 lines, 9 unit tests |
| 2.3 Wire walkUiTree | ✅ | Single walk populates indexes + gaps + enriched map + template cross-refs, 23 integration tests |
| 2.4 ScreenQuery | ✅ | Conjunctive 6-param filtering, 74 lines, 18 unit tests |
| 2.5 ExperienceMapQuery | ✅ | Delegates to ScreenQuery, 24 lines, 6 unit tests |
| 2.6 Register tools | ✅ | 5 new tools + 2 updated, COMPONENT_DIR env var, 362-line index.ts |
| 2.7 Platform filtering fix | ✅ | Fixed enrichOneOffs branched tree handling, 3 tests |

## Architecture Decisions

**1. Pure accumulators**: ReverseIndexBuilder and GapDetector have no coupling — ProductIndexer orchestrates the walk and calls both. This was validated when the walk needed to collect per-screen component sets for the enriched map — a third concern added to the same walk without touching the accumulators.

**2. ExperienceMapQuery delegates to ScreenQuery**: Zero code duplication. The filtering logic is identical since both operate on `EnrichedMapEntry[]` with `ScreenFilter`. All 6 filter params exposed on both tools.

**3. Bug found in enrichOneOffs**: The existing code didn't walk branched UI trees (shared/ios/web keys). Fixed to match the same pattern as `walkUiTree` — walk shared always, walk platform arrays.

## Artifacts Created

| Artifact | Path | Lines |
|----------|------|-------|
| ReverseIndexBuilder | `product-mcp-server/src/indexer/ReverseIndexBuilder.ts` | 63 |
| GapDetector | `product-mcp-server/src/indexer/GapDetector.ts` | 52 |
| ScreenQuery | `product-mcp-server/src/query/ScreenQuery.ts` | 74 |
| ExperienceMapQuery | `product-mcp-server/src/query/ExperienceMapQuery.ts` | 24 |
| ProductIndexer (updated) | `product-mcp-server/src/indexer/ProductIndexer.ts` | ~310 |
| Server shell (updated) | `product-mcp-server/src/index.ts` | 362 |
| Unit tests: ReverseIndexBuilder | `product-mcp-server/src/__tests__/ReverseIndexBuilder.test.ts` | 118 |
| Unit tests: GapDetector | `product-mcp-server/src/__tests__/GapDetector.test.ts` | 72 |
| Unit tests: ScreenQuery | `product-mcp-server/src/__tests__/ScreenQuery.test.ts` | 172 |
| Unit tests: ExperienceMapQuery | `product-mcp-server/src/__tests__/ExperienceMapQuery.test.ts` | 76 |
| Integration tests: Walk | `product-mcp-server/src/__tests__/ProductIndexerWalk.test.ts` | 167 |
| Platform filtering tests | `product-mcp-server/src/__tests__/PlatformFiltering.test.ts` | 134 |

## Validation

- [x] 85/85 tests pass across 7 test suites
- [x] TypeScript compilation clean
- [x] All 12 tools registered and wired
- [x] Server version bumped to 0.2.0

## Lessons Learned

1. The `enrichOneOffs` branched tree bug was latent since Spec 081 — it only manifested when testing unfiltered specs with branched UI trees. The walk pattern (detect `shared` key, walk shared + platform arrays) should be a shared utility if more code needs to traverse UI trees.
2. ExperienceMapQuery as a pure delegation wrapper felt like over-engineering at first, but it gives `list_experience_map` its own tool definition and input schema without coupling it to `find_screens` at the handler level.

## Next Steps

Task 3: Documentation & Reassessment — Thurgood documents all new tools in the Integration Guide, adds UI tree convention, and reassesses with Leonardo.
