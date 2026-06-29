# Task 10 Summary (PARTIAL: 10.1 / 10.2 / 10.3): Discovery Dry-Run + Frozen Map-Oracle + FLOOR Baseline

**Date**: 2026-06-29
**Purpose**: Concise summary of partial parent-task completion (spec-level)
**Organization**: spec-summary
**Scope**: 119-A-steering-relocation-serving-contract

## What Was Done

Captured the meta-guide's "Tier 2: MCP-Only Documents" concept→doc map as a frozen, human-validated test oracle (`scripts/__fixtures__/discovery-oracle.ts`, `OracleEntry[]`) BEFORE the meta-guide is removed (Req 11 AC4 hard precondition); built the discovery dry-run harness (`mcp-server/src/discovery-dry-run/discovery-dry-run.ts` testable core + `scripts/discovery-dry-run.ts` runner + 16 unit tests); and ran the FLOOR baseline (pre-aliases) whose `weakOrMiss[]` set IS the Task 8.4 alias-seeding worklist. **10.4 (lift) / 10.5 (gated removal) / 10.6 (no-regression) are NOT done — the meta-guide remains present and untouched.**

## Why It Matters

The meta-guide is the only always-loaded navigational map; removing it before its `find_docs` discovery replacement demonstrably works is 119-A's scariest step. The frozen oracle (captured while the map still exists) + the dry-run harness are the closed-loop gate that proves discovery reaches every map-covered concept before removal is permitted (Req 13). The FLOOR run establishes the pre-aliases baseline and emits the exact worklist of concepts that need `aliases` seeds.

## Verified Outcome

- ✅ **Oracle captured**: 7 categories, 69 map-concepts + 14 agent domain queries = **83 entries**. Keyed on stable `id` (addressing plane), validated against the live 80-doc `governance/` `id` set.
- ✅ **Stale-strip pass (Req 13 AC2)**: **ZERO strips** — every meta-guide pointer resolves to a live `id`. Candor: no strips manufactured to look thorough. Two candidates evaluated + rejected with reasoning (`a-vision-of-the-future` flagged as Peter's optional-strip call). Five id-divergence-from-filename mappings recorded as resolved judgment calls (not strips).
- ✅ **Harness B5 confirmed**: `scoreConcept` translates `find_docs` `path` → `id` (via `documentMap`) before scoring; a dedicated test proves the untranslated-path MISS failure mode. Uses the live `findDocsConcept` + a real `DocumentIndexer` over `governance/`.
- ✅ **Harness unit tests**: 16/16 pass.
- ✅ **FLOOR result**: 83 concepts → **62 PASS / 18 WEAK / 3 MISS**; `clearsThreshold` = **false** (expected pre-aliases); `rank1StrongRate` = **54.2%** (SIGNAL, below the ~80% review tripwire). **21-concept weakOrMiss worklist captured** for Task 8.4.

## Honest Notes

- **clearsThreshold = false is the expected floor state**, not a failure — aliases (Task 8.4) close the gap, and the real removal gate is the 10.4 lift re-run. The floor is encouraging (only 3 truly unreachable concepts, all cross-domain agent queries).
- **rank1StrongRate 54.2%** sits below 80% exactly as the design's recorded floor-probe predicted; it is a review signal wired to the 8.4 worklist, not a block.
- **Known flake**: mcp-server `tests/property/parsing-properties.test.ts` (fast-check fuzzer) failed once in the full run, passed 12/12 on serial re-run — pre-existing, unrelated. root `npm test` 8990/8990 green; root + mcp-server `tsc` clean.
- **Two judgment calls for Peter before 8.4**: (1) accept zero oracle strips? (2) confirm the 21-concept floor worklist as the 8.4 input.
