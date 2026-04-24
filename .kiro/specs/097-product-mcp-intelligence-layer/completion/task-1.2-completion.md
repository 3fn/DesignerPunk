# Task 1.2 Completion: Extract ProductIndexer from index.ts

**Date**: 2026-04-23
**Task**: 1.2 Extract ProductIndexer from index.ts
**Type**: Architecture
**Status**: Complete

---

## Artifacts Created

| Artifact | Path |
|----------|------|
| ProductIndexer module | `product-mcp-server/src/indexer/ProductIndexer.ts` |
| Thinned server shell | `product-mcp-server/src/index.ts` (rewritten) |

## Implementation Notes

Extracted all indexing logic from the monolithic `index.ts` into `ProductIndexer`:

**Moved to ProductIndexer:**
- All data stores (screenSpecs, domainObjects, templates, oneOffComponents, experienceMap, overview, warnings)
- `indexProductData()` → split into `index()` orchestrator + private methods: `indexOverview()`, `indexPrinciples()`, `indexExperienceMap()`, `indexTemplates()`, `indexDomainObjects()`, `buildDomainCrossRefs()`, `indexOneOffComponents()`
- Helpers: `indexScreenFile()`, `indexScreenDirectory()`, `extractDomainRefs()`, `loadYaml()`, `listFiles()`
- `walkUiTree()` placeholder (no-op, wired in Task 2.3)
- `getHealth()` returning same shape as original for backward compatibility

**Stayed in index.ts (query-time response building):**
- `resolveScreenSpec()`, `filterPlatform()`, `enrichOneOffs()` — per task spec
- MCP SDK wiring, tool definitions, `registerHandlers()`, `handleTool()` dispatch
- `enrichOneOffs()` updated to call `this.indexer.getOneOffComponent()` instead of local Map access

**Visibility decisions:**
- `loadYaml()` and `listFiles()` are package-visible (not private) — `PrinciplesParser` (Task 1.3) will need them

**No deviations from plan.**

## Validation

- [x] ProductIndexer created with all indexing logic
- [x] index.ts thinned to server shell
- [x] `resolveScreenSpec`/`filterPlatform`/`enrichOneOffs` remain in index.ts
- [x] `walkUiTree()` placeholder added
- [x] TypeScript compilation clean (ES2020 target, strict mode, no errors)
- [x] ProductIndexer interface matches design spec — all getters present (`getReverseIndexes`/`getGaps` deferred to Task 2)
- [x] All 12 existing integration tests pass (ProductMCPIntegration.test.ts):
  - Indexer counts: 3 screens, 1 domain object, 1 template, 1 one-off ✅
  - Screen spec structure: platform branching, blocked status, spec status, multi-file ✅
  - One-off metadata: schema with composed-from, accessibility contracts ✅
  - Empty/missing directories: 0 counts, warning message ✅
- [x] No behavioral changes to any of the 7 existing tools
