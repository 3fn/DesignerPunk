# Task 10 Summary (COMPLETE): Discovery Dry-Run + Frozen Map-Oracle, then Gated Meta-Guide Removal

**Date**: 2026-06-29
**Purpose**: Concise summary of parent-task completion (spec-level)
**Organization**: spec-summary
**Scope**: 119-A-steering-relocation-serving-contract

## What Was Done

Captured the meta-guide's "Tier 2: MCP-Only Documents" concept→doc map as a frozen, human-validated test oracle (`scripts/__fixtures__/discovery-oracle.ts`, `OracleEntry[]`) BEFORE removal (Req 11 AC4); built the discovery dry-run harness (`mcp-server/src/discovery-dry-run/discovery-dry-run.ts` + `scripts/discovery-dry-run.ts` + 16 unit tests); ran the three-point baseline (FLOOR pre-aliases → LIFT post-aliases → NO-REGRESSION post-removal) against the same oracle. The LIFT gate cleared at **83 / 0 / 0** after a main-loop title-rank tie-breaker resolved 4 structurally-unliftable concepts. With the gate cleared, **10.5 removed the meta-guide** (`git rm`, gated) and **10.6 confirmed no discovery regression** post-removal.

## Why It Matters

The meta-guide was the only always-loaded navigational map; removing it before its `find_docs` discovery replacement demonstrably works was 119-A's scariest step. The frozen oracle (captured while the map still existed) + the dry-run gate proved discovery reaches every map-covered concept BEFORE removal was permitted (Req 13). Removal is now done with that proof in hand, and the post-removal re-run confirms the leak-source artifact is gone with zero discovery cost.

## Verified Outcome

- ✅ **Oracle captured + stale-stripped (ZERO strips)**: 7 categories, 69 map-concepts + 14 agent queries = 83 entries, keyed on stable `id`.
- ✅ **Harness**: 16/16 unit tests; real `findDocsConcept` over `governance/`; B5 path→id translation confirmed.
- ✅ **FLOOR (pre-aliases)**: 62 PASS / 18 WEAK / 3 MISS; `clearsThreshold: false` (expected); rank1Strong 54.2%. Emitted the 21-concept Task 8.4 worklist.
- ✅ **LIFT (post-aliases) = hard gate**: reached 79 / 4 / 0 via aliases, then **CLEARED at 83 / 0 / 0** via the Peter-approved title-rank tie-breaker (rank-only; Layer-1 `matchConfidence` untouched). rank1Strong 69.9% → 94.0%.
- ✅ **10.5 removal (gated, gate cleared)**: `git rm` the meta-guide. Corpus now **89 (9 steering / 80 governance)**; MCP index stays **80** (governance-only). Reference sweep: **zero functional refs** (not in any agent `resources[]`); historical/by-design refs left as-is; the **frozen legacy-path manifest self-disables** (its target `id` was already absent from `idIndex` because the meta-guide lived in the non-served identity root) — left untouched. Documentation Directory formally dropped (never built; do-not-create). Oracle stays a test fixture, not a living fallback.
- ✅ **Knock-ons**: `init.test.ts` 10→9 / 11→10 (re-derived from the actual tree, passes); `sync-manifest.json` meta-guide entry removed; `check:id-uniqueness` reports **89** (dynamic count — no code change), PASS.
- ✅ **10.6 NO-REGRESSION (post-removal)**: **83 PASS / 0 WEAK / 0 MISS, `clearsThreshold: true`**, rank1Strong 94.0% — identical to the LIFT gate. No regression (the meta-guide was never in the served index). Exit-gate precondition confirmed: no referenced `id` depends on the removed meta-guide.

## Honest Notes

- **Removing the meta-guide had zero discovery impact** — exactly as predicted, since it was never in the governance-only `find_docs` index. The no-regression run is identical to the lift gate, which is the correct (not suspicious) result.
- **The 4 residual-WEAK concepts were resolved upstream** (main-loop title-rank tie-breaker in `QueryEngine`), not by loosening the gate or touching the oracle in 10.5/10.6. I did not re-litigate that resolution.
- **The frozen manifest was deliberately NOT edited.** Its meta-guide entry self-disables (target `id` not indexed) and the old path now 404s — which is the intended "removed" behavior. Editing the frozen artifact would break its freeze contract (Task 3).
- **Tests**: root `npm test` 8990/8990 green; mcp-server jest 601/601 green (flake did not surface); root + mcp-server `tsc` + `typecheck:scripts` all exit 0. The `init.test` count change (the most likely break point) passes.
