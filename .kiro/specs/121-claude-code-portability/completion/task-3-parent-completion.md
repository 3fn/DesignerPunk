# Task 3 Completion: `find_docs` Tool + Supersede `get_documentation_map`

**Date**: 2026-06-23
**Task**: 3. `find_docs` Tool + Supersede `get_documentation_map` (Req 1 + Req 4)
**Type**: Parent
**Status**: Complete
**Agents**: Thurgood (docs-MCP code + ballot-measure, on Sonnet 4.6); orchestrator (owner-field fix); Peter (ballot-measure approval)

---

## Artifacts Created / Modified / Removed

**Created:** `mcp-server/src/tools/find-docs.ts`
**Modified (code):** `mcp-server/src/query/QueryEngine.ts`, `mcp-server/src/indexer/DocumentIndexer.ts`, `mcp-server/src/models/DocumentationMap.ts`, `mcp-server/src/tools/index.ts`, `mcp-server/src/index.ts`, `mcp-server/README.md`, the docs-MCP integration tests, and the rewritten pinned test (`get-documentation-map.test.ts`).
**Removed:** `mcp-server/src/tools/get-documentation-map.ts` (the one justified break).
**Modified (ballot-measure — Peter-approved):** 5 steering docs, 3 Thurgood prompt copies, 4 `.claude/agents` tool grants, 2 MCP `autoApprove` configs, 1 Cursor rules file, and `MCP-Evolution-Roadmap.md`.

## Implementation Details

### 3.1 — `find_docs` concept-search mode
`find_docs({ concept })` returns ranked entries `{ path, summary (~50-token), owner, matchedOn, rank }`. Ranking is term-level (high-signal: `purpose` + section headings, 2 pts; low-signal: `relevantTasks` + path basename, 1 pt). No-match returns the pinned empty contract `{ data: [], error: null, matchConfidence: 'none' }` (Decision 2). Discovery→retrieval composes (returned `path` resolves via `get_section`/`get_document_summary`). **Scope held:** strong/partial tier derivation for populated results is deferred to Task 5 — concept mode returns `matchedOn` evidence only; the sole emitted `matchConfidence` is the top-level `'none'` on empty.

### 3.2 — `find_docs` paginated list/catalog mode
`find_docs({ list: true, cursor?, limit? })` enumerates the full corpus in bounded pages. Default `limit` 20 (hard cap 100); ~6K chars/page vs the map's ~78K single payload — the structural fix for Finding 10. Unranked (no `matchConfidence` tier). `nextCursor` walks the full corpus. Together 3.1+3.2 fully subsume `get_documentation_map`.

### 3.3 — remove `get_documentation_map` + rewrite its pinned test
The tool and its internal docs-MCP references removed; its pinned shape test **rewritten** (explicit supersede, not silent mutation) to target `find_docs` list mode, including a regression-guard assertion (`FIND_DOCS_DEFAULT_LIMIT * 500 < 20_000`) that would have caught the original 78K payload.

### Owner-field fix (Req 1.1 gap, closed by orchestrator)
`find_docs` `owner` was always empty: `organization` was parsed (`metadata-parser.ts`) and used by the heavier `DocumentSummary`/`DocumentFull` models, but never carried onto the lightweight `DocumentMetadata` that `find_docs` reads. Fix: added `organization` to the `DocumentMetadata` interface, populated it in `DocumentIndexer.indexFile()`, and tightened the two `(doc as any).organization` casts to typed access. Verified the real corpus carries `**Organization**:` metadata, so `owner` now populates — satisfying Req 1.1's "owning domain/agent" requirement.

### 3.4 — first-party reference sweep (ballot-measure, Peter-approved)
Retargeted `get_documentation_map` → `find_docs` across the verified canonical set, with three reconciliation calls approved by Peter (the tasks.md canonical set was slightly off from reality):
- **`.cursor/rules/designerpunk-core.mdc`** swept (tasks.md named `.cursor/mcp.json`, which has no reference; the rules file is where it lives).
- **`.claude/settings.local.json`** `autoApprove` entry swept (not in tasks.md's list).
- **`.claude/agents/{ada,lina,data}.md`** tool grants swept **now** rather than deferred to Spec 122 — they would otherwise dangle against a removed tool, dropping doc-discovery for those agents until 122 (not yet built).

Historical spec/completion docs, the issue log, and the living 119/121 spec files were left as-is (record / meta-references). Acceptance grep over the swept set returns **zero**.

### 3.5 — `MCP-Evolution-Roadmap.md` record (ballot-measure, Peter-approved)
New "Delivery-Layer Hardening (Spec 121) — Actioned" section: findings reconciliation (F9 ✅, F10 ✅, F11/F12 ✅; **F1/F3 marked ⏳ pending Task 6** — section addressing not yet shipped), the supersede + rationale, the full reference sweep, and Decision 4 (index-freshness: pinned corpus + live smoke). `Last Reviewed` bumped to 2026-06-23.

## Validation (Tier 3: Comprehensive)

✅ `find_docs` dual-mode (concept + paginated list); fully subsumes the map
✅ List mode bounded within the MCP token limit (~6K vs ~78K — Finding 10 structurally fixed; regression-guarded by test)
✅ `get_documentation_map` removed; pinned test rewritten (explicit supersede)
✅ `owner` populated from real `organization` metadata (Req 1.1)
✅ Reference sweep complete; acceptance grep over swept set returns zero
✅ Supersede + sweep recorded in `MCP-Evolution-Roadmap.md`
✅ `npx tsc --noEmit` clean; docs-MCP suite **26 suites / 452 tests pass** (serial — parallel run has pre-existing fixture-race + fast-check flakiness, unrelated)
✅ All 6 edited steering docs pass `scripts/validate-steering-metadata.js`
✅ Ballot-measure: steering/prompt/roadmap edits drafted → presented → approved by Peter → applied

## Requirements Compliance

✅ Req 1.1, 1.2, 1.10 (concept search, empty contract, composition)
✅ Req 4.1–4.4 (dual-mode subsumes map, bounded pages, removal + test rewrite, first-party sweep)
✅ Doc-Req 3 (roadmap reconciliation + supersede record)

## Open Items / Notes

- **`QueryEngine.getDocumentationMap()` internal method retained** — only the registered MCP *tool* was removed (the method is still unit-tested and possibly internally useful). Mild dead-code; flagged for optional later cleanup.
- **Pre-existing validator errors** in `Web-Authoring-Standards.md` (`screen-implementation` task type) — unrelated, untouched.
- **Section addressing (F1/F3)** remains Task 6.
- **Spec 123 watch:** if `sync` doesn't refresh dp-portfolio's vendored prompts/docs, swept consumer copies go stale.

## Related Documentation

- [Task 3 Summary](../../../../docs/specs/121-claude-code-portability/task-3-summary.md)
