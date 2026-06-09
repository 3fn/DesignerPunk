# Task 2.3 Completion: Expand Application MCP file watcher

**Date**: 2026-06-09
**Task**: 2.3 Expand Application MCP file watcher
**Type**: Implementation
**Status**: Complete

---

## Changes

| File | Change |
|------|--------|
| `application-mcp-server/src/watcher/FileWatcher.ts` | Rewritten to support multiple data source directories. Watches components, patterns, templates, guidance, and token-index. Each triggers its respective reindex method. Missing directories skipped gracefully. |
| `application-mcp-server/src/indexer/ComponentIndexer.ts` | Added `reindexPatterns`, `reindexTemplates`, `reindexGuidance`, `reindexTokens` methods. |
| `application-mcp-server/src/index.ts` | Updated FileWatcher constructor call to pass all data dirs. |
| `application-mcp-server/src/watcher/__tests__/FileWatcher.test.ts` | Updated for new constructor signature and graceful missing-dir behavior. |

## Validation

- 232/232 tests passing (21 suites)
- TypeScript compiles clean
- Missing directories skipped without error (R4 AC3)
- Requirements addressed: R4 AC1-3
