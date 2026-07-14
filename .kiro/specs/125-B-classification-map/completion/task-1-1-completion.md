# Task 1.1 Completion: Author the Measurement Protocol

**Date**: 2026-07-14
**Task**: 1.1 (subtask of Task 1 — U1-s: Pilot Substrate)
**Type**: Architecture | **Validation**: Tier 3 - Comprehensive
**Agent**: Thurgood (Opus) — planned agent, no divergence
**Traces**: Reqs 8.1–8.7; Design C4, DD6, DD8

---

## Artifact Created

- `.kiro/specs/125-B-classification-map/completion/pilot/measurement-protocol.md`

## What Was Done

Authored the U1 pilot's pre-committed measurement protocol — the first deliverable of U1's first subtask per Req 8.1, in place BEFORE any probe, trial, or prune:

1. **The rubric** (§1): four mechanically-checkable workflow actions for the npm-test rule (R1 validation-before-completion; R2 Jest-not-Vitest forms; R3 outcome-cited completion; R4 no-completion-on-red), with N/A discipline so inapplicable actions never score ABSENT.
2. **Pre-committed difference criteria** (§2): paired per-task comparison (CLEAR DIFFERENCE / NO DIFFERENCE / MIXED) aggregating to a three-way trial verdict with pre-committed consequences — DIFFERENCE-DETECTED blocks the prune-as-drafted; INDETERMINATE goes to Peter, never defaults. Battery-relevance gate encoded per the ratified Req 7.3 method.
3. **Window definition** (§3): N=20 pilot-only; DD6 filter + SHA pinning; Req 8.4 staleness triggers; DD8 segment-never-reset + K=3; segment evaluability floor (≥5 PRs for the rate criterion); count-based W1/W2 criteria with a pre-window baseline recipe; W3 churn as report-only data.
4. **The cross-segment roll-up** (§3.2, the design-R2 watch item): conservative — MET only if met in every evaluable segment; UNMET if unmet in any; indeterminate never converts to pass; no averaging, no weighting, no segment-dropping.
5. **Instrument-PR exclusion** (§4, tasks-R1 HIGH): U2's arming PR + all gate-bite throwaways excluded; U2 arming = Req 8.4 event → segment boundary; the prune-aware-observer limitation recorded as an honesty note.
6. **Manual query recipes** (§5): runnable gh/git recipes for observed-PR enumeration + first-push pinning, the baseline, re-accretion/staleness scanning, churn counting (parsed objects), and the Req 8.7 wall-clock datum — all hand-repeatable, no standing tooling, with the Req 9.3 stop restated.
7. **Window dataset shape** (§6) and **amendment discipline** (§7): pre-commitments lock at U1-p merge; post-open amendments mark affected segments indeterminate unless Peter rules otherwise.

## Implementation Notes

- **Two appendix slots (A1 surfaces, A2 pruned patterns) are deliberately parameterized on Task 1.4's outputs** — they are instrumentation parameters, not criteria; the protocol requires them filled before the window opens and freezes them at U1-p merge. This keeps 1.1 honest: criteria pre-committed now, parameters bound to the assessment that produces them (1.4 precedes U1-p in-unit, so Req 8.1's ordering holds).
- **W1 thresholds are count-based** (f ≤ e+1 met / f ≥ e+3 unmet / e+2 indeterminate, scaled per segment) rather than percentage-based — at N=20 each PR is 5 points, and integer counts keep hand computation and audit trivial. The +3 gross-signal threshold matches the window's designed role as backstop tier (the trial carries the gating weight).
- The required-check set is frozen into the dataset header at window open rather than hard-coded here — the set can legitimately evolve (U2 adds checks), and freezing-at-open keeps the failure definition stable within the window while segments handle mid-window arming.
- Verified before authoring: working tree on `task/125-B-u1-s` at a33b39ff; `completion/pilot/` present and empty (fresh start after the interrupted run); `governance/classification-map.md` NOT touched (1.2 runs in parallel).

## Validation (Tier 3)

- Protocol reviewed against each AC of Req 8 (8.1 ordering ✓; 8.2 N=20 pilot-scoped ✓; 8.3 data source/denominator/metrics incl. churn ✓; 8.4 ratified staleness definition ✓; 8.5 ambiguous-as-ambiguous ✓; 8.6 manual/query-only with the 9.3 stop ✓; 8.7 wall-clock datum ✓), DD6 (filter + SHA pinning ✓), DD8 (segment-never-reset, K=3, roll-up ✓), and the two tasks-R2 additions (instrument exclusion + honesty note ✓).
- Tier-appropriate check: documentation artifact — no test suite applies; the executable-by-a-future-reader bar was checked by walking each recipe against the live gh/git surfaces during authoring (candidate enumeration and check-run queries verified runnable in this environment; the protection-API variant was NOT relied on since it wasn't queryable from the sandbox — the recipe reads the required-check set from the PR merge-box/Settings instead, which any human or agent session can do).

## Next (not started, per stop-and-wait)

Task 1.4 fills Appendices A1/A2; Tasks 1.7/1.8 consume §1–§2; Task 3.1 executes §3–§6.
