# Task 1 Completion: Module Extraction & Test Infrastructure

**Date**: 2026-04-23
**Task**: 1. Module Extraction & Test Infrastructure
**Type**: Parent
**Status**: Complete
**Spec**: 097-product-mcp-intelligence-layer

---

## Success Criteria Verification

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Single-file server extracted into modular architecture | ✅ | `indexer/ProductIndexer.ts`, `indexer/PrinciplesParser.ts`, `models.ts` |
| All existing 7 tools work identically after extraction | ✅ | 12/12 integration tests pass |
| Test infrastructure established with unit test capability | ✅ | Jest config updated, `product-mcp-server/src/__tests__/` discoverable |
| Test fixtures extended with tokens blocks, tags, frontmatter, gap detection data | ✅ | Static fixtures + integration test fixtures both extended |

## Subtask Summary

| Subtask | Status | Key Outcome |
|---------|--------|-------------|
| 1.1 Create models.ts | ✅ | 8 shared interfaces (ScreenRef, ReverseIndexes, ComponentGap, Principle, EnrichedMapEntry, ScreenFilter, HealthStatus, DomainScreenRef) |
| 1.2 Extract ProductIndexer | ✅ | Indexing logic in `ProductIndexer.ts` (260 lines), `index.ts` thinned to server shell (218 lines) |
| 1.3 Create PrinciplesParser | ✅ | Standalone function parsing YAML frontmatter, integrated into ProductIndexer with backward compat |
| 1.4 Test infrastructure & fixtures | ✅ | Jest config updated, 16 static fixture files, integration test extended, mock component catalog |

## Architecture Decisions

**1. ProductIndexer owns the walk**: The `walkUiTree()` placeholder lives in `ProductIndexer`, not in `ReverseIndexBuilder`. This keeps the builder and gap detector as pure accumulators with no coupling to each other (per Lina R1 design feedback).

**2. PrinciplesParser as function, not class**: No state needed — reads files, parses, returns results. A class would add ceremony without benefit.

**3. Query-time methods stay in index.ts**: `resolveScreenSpec`, `filterPlatform`, `enrichOneOffs` are response-building concerns, not indexing. They stay in the server shell where they have access to the indexer's getters.

**4. loadYaml/listFiles are package-visible**: Not private on ProductIndexer — PrinciplesParser and future modules may need them. Could be extracted to a utils module later if more consumers appear.

## Artifacts Created

| Artifact | Path | Lines |
|----------|------|-------|
| Shared types | `product-mcp-server/src/models.ts` | 83 |
| Product indexer | `product-mcp-server/src/indexer/ProductIndexer.ts` | 260 |
| Principles parser | `product-mcp-server/src/indexer/PrinciplesParser.ts` | 75 |
| Server shell (rewritten) | `product-mcp-server/src/index.ts` | 218 |
| Jest config (updated) | `jest.config.js` | +1 line |
| Integration test (updated) | `src/__tests__/ProductMCPIntegration.test.ts` | ~15 lines changed |
| Static fixtures | `product-mcp-server/src/__tests__/fixtures/` | 16 files |

## Validation

- [x] TypeScript compilation clean (ES2020, strict mode) for all new modules
- [x] All 12 integration tests pass after extraction
- [x] All 12 integration tests pass after fixture extension
- [x] ProductIndexer interface matches design spec
- [x] PrinciplesParser handles all edge cases (valid frontmatter, no frontmatter, malformed YAML)
- [x] Static fixtures load through ProductIndexer: 3 screens, 2 domain objects, 1 template, 1 one-off, 1 principle with keywords
- [x] Mock component catalog has deliberate gaps for Task 2 testing (Progress-Stepper-Base, nonexistent-widget absent)

## Lessons Learned

1. The root jest config's `roots` array only included `src/` — MCP server directories need explicit addition. Worth checking this early for any new server directory.
2. The existing integration test uses `execSync` to run the server and checks stderr output — it's a smoke test, not a unit test. The static fixtures in `product-mcp-server/src/__tests__/fixtures/` enable proper unit testing with direct imports in Task 2.

## Next Steps

Task 2: Reverse Indexes, Gap Detection & New Tools — implements `ReverseIndexBuilder`, `GapDetector`, `ScreenQuery`, `ExperienceMapQuery`, wires `walkUiTree`, registers 5 new tools, and fixes platform filtering.
