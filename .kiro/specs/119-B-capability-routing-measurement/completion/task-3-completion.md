# Task 3 Completion: Before/After Measurement Case Study

**Date**: 2026-08-02
**Task**: 3 — Run the before/after measurement case study
**Type**: Implementation · **Validation**: Tier 2
**Unit**: U2 — measurement case study (`task/119-B-u2-measurement`, single-parent unit)
**Status**: Complete on branch — findings artifact produced; READ-ONLY unit (zero corpus writes, zero fixture edits)

---

## What was done

Ran the discovery dry-run harness (`scripts/discovery-dry-run.ts` core via `runDiscoveryDryRun`, point label `no-regression`) against the frozen oracle `scripts/__fixtures__/discovery-oracle.ts` on the current corpus, and produced **`findings/measurement-case-study.md`** complete per the Component 5 schema (method + provenance + coverage-boundary statement; before/after tables per axis; IN-1 attribution ladder; register-row shadowing check; OB-4 input section).

**Headline**: 83/83 PASS, 0 WEAK, 0 MISS, `clearsThreshold: true`, rank-1-strong 78/83 (93.98%) — **identical aggregates to the 10.4/10.6 anchor (94.0%)**. Delta vs the 94% anchor: zero; the 119-A-attributable state persists across five weeks of corpus growth (80 → 83 docs). The clean baseline R3 AC4 sequenced this study to capture is captured.

## Acceptance line — register-row keyword-shadowing check (Decision 4 mitigation): PERFORMED and RECORDED

Findings § 4: (i) token enumeration — 33/83 concepts share only corpus-generic tokens with the row text; (ii) threshold check — `classification-map` appears at rank ≤ 2 in **zero** oracle result sets (best appearance rank 6; 10 appearances total, ranks 6–61); (iii) strengthening counterfactual — full dry-run against a scratch pre-row corpus copy (git `086bc72a`): **zero per-entry differences**. **Result NULL — VERIFIED** (expected null confirmed, not assumed), recorded alongside the R11 AC2 pre-measurement note in the findings.

## R2 AC3 / OB-4 interaction

The measured rank distribution (78 × rank-1, 5 × rank-2, **zero strong-but-rank>2**, all strong) **agrees with Task 2's KEEP-rank≤2 decision** — no recorded amendment triggered; the harness gate assertion (`PASS_RANK_BOUND = 2`) stays untouched.

## Verification (Tier 2)

- Oracle integrity: `scripts/__fixtures__/discovery-oracle.ts` untouched on this branch (R3 AC3) — `git status`/diff clean for the fixture; the oracle was consumed via import only.
- Measurement scripts ran in the session scratchpad (outside the repo); no repo code changed. The unit's only repo writes are the findings artifact, this completion doc, and the tasks.md checkbox.
- Full functional suite green locally before unit PR: see PR validation note.
- No docs-index rebuild required: no MCP-indexed governance content was modified (R11 AC5 not triggered; `findings/` is spec-local, not indexed).
- Window discipline: read-only unit — no A1 trigger surface, no canonical agent source, no regen (no regen-log line).

## D1 ledger (R11 AC3)

Re-measured values (prior 2026-06-29 → current 2026-08-02): PASS/WEAK/MISS 83/0/0 → 83/0/0; rank-1-strong 78/83 (94.0%) → 78/83 (93.98%, same fraction); corpus docs 80 → 83; oracle concepts 83 → 83 (frozen). All counts in the findings carry measurement dates.

## Requirements traceability

- **R3 AC1** — anchored on the frozen oracle + `scripts/discovery-dry-run.ts` harness paths. ✓
- **R3 AC2** — IN-1 ladder reported with per-step evidence: floor 54.2% → aliases (79/4/0, 69.9%) → tie-breaker 94% (the 94% includes the tie-breaker; never attributed to aliases alone) → current. ✓ (findings § 3)
- **R3 AC3** — oracle read-only, never re-wired; frozen-fixture warning restated in findings § 1. ✓
- **R3 AC4** — study completes before any R4/R5/R8 corpus edit merges (U2 precedes U3/U4/U-final; this unit itself is read-only). ✓
- **R3 AC5** — findings recorded as a spec-local findings document with D1-dated counts. ✓
- **R11 AC2** — pre-measurement note + shadowing check result recorded together (findings § 4). ✓
- **R11 AC3** — prior → current values with dates, here and in the findings. ✓

## Delegated-tier note (TCP exception-based capture)

Planned stamp: Thurgood (Sonnet) — method fully designed. Actual: executed directly in the main-loop session (Fable 5) on Peter's grant to proceed to Task 3. Agent-evolution signal: none. Model-evolution signal: over-tier for an implement-class task; accepted for context continuity (same session carried U1's decision context, which § 5 of the findings consumes directly).
