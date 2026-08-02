# Task 7.3 Completion: Indexer Validation Sweep

**Date**: 2026-08-02 · **Unit**: OB-1 · **Type**: Implementation subtask

## What was done

`mcp-server/src/indexer/DocumentIndexer.ts` — extract-then-validate on the existing post-index hook (Decision 1):

- New index structures: `crossRefsByKey` (validated refs per indexed key — the single source ALL read surfaces now consume; no consumer re-extracts) and `droppedIdCandidates` (the surfacing record). Both cleared in the full-rescan clear block (index-maintenance invariant) and pruned on the reindex delete branch.
- `indexFile` stores the RAW parser output (candidates tagged); the validation pass joins the SAME post-index hook as the Task-3.2 legacy re-seed (`indexDirectory` tail, after `seedLegacyPaths()` — idIndex complete): candidates with `idIndex` hits are kept with the tag STRIPPED (never escapes the indexer); misses are dropped and recorded.
- `reindexFile` validates inline against the STANDING idIndex via the same `validateCrossReferencesForKey` function — no special casing.
- `listCrossReferences` and `getDocumentSummary` now serve the validated stored set; index-health's `totalCrossReferences` counts it (a stable index property, not a per-query re-extraction).

## Tests

- Validation drops non-ids + records them (`getDroppedIdCandidates`); hits enumerated tag-free.
- **Migrated-doc enumeration**: token-governance-pattern fixture (bare-id links to sibling docs) enumerates all three refs with context/section/line intact.
- **ACCEPTED-EDGE test (pinned)**: `reindexFile` of doc A referencing NEW doc B not yet in the standing idIndex drops the ref (recorded); the next full rebuild restores it — correct under the design, covered operationally by the write-side rebuild protocol, now a test so it stays an accepted edge, not a surprise.
- Inline-validation positive case (target already in standing idIndex → kept on reindex).
- `getDocumentSummary` consistency (dropped candidates never appear).
- Adjacent suites unchanged and green: `DocumentIndexer.test.ts`, `DocumentIndexer.resolver.test.ts`, `index-health.test.ts`.
