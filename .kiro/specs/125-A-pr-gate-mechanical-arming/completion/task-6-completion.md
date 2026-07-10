# Task 6 Completion — Record the lane timing measurements

**Spec**: 125-A — PR Gate + Mechanical Arming
**Type**: Setup · **Validation**: Tier 1
**Date**: 2026-07-10
**Branch**: `task/125-A-6-record-timing`

---

## Context

The five lanes shipped EARLY as non-required jobs (PR #38, 2026-07-10) with three PR-runs' findings fixed in-flight (non-self-contained lanes; the app-mcp jest `roots` defect; the CICDIntegration env-leak test bug → PR #39). Task 6 was re-scoped to its residual by the ratified round (Tasks 6–9 v2, PR #42): dispatch the cold run, record BOTH timing forms per lane, assert the ~10-min ceiling. **Cold-cache recording was a completion blocker (STACY R1)** — satisfied below.

## The measurements (Req 6.3)

**Cold-cache** (workflow_dispatch `cold: true`, run [29098126351](https://github.com/3fn/DesignerPunk/actions/runs/29098126351), dispatched by Peter 2026-07-10 — npm cache restore skipped via the dual-setup-node guard):

| Lane | Cold wall-clock | Steady-state (PR run [29097737589](https://github.com/3fn/DesignerPunk/actions/runs/29097737589), #42's checks) |
|---|---|---|
| lane-typecheck | 40 s | 33 s |
| lane-build-validate | 25 s | 32 s |
| lane-functional-root | **234 s** (~3m54s, incl. full `npm run build` + mcp-server sub-package build) | 208 s |
| lane-mcp-server-suite | 25 s | 27 s |
| lane-application-mcp-server-suite | 22 s | 32 s |

**Felt latency** (head-push → all-green, the Req 6.3 form — max across parallel workflows, NOT sum-of-lanes):
- Steady-state PR event: **211 s (~3.5 min)** — Lane Timing 211 s ∥ Consumer Guard 103 s ∥ Package Name Drift 17 s; the functional lane is the critical path.
- Cold dispatch: **239 s (~4 min)** run total.

## Ceiling assertion (Req 6.3)

**CLEARED.** Worst cold lane = 234 s = **39% of the ~10-minute (600 s) ceiling**. No pause-for-Peter required. **Recorded headroom budget for 122's future registrants: ~6 minutes of cold-cache wall-clock** before the ceiling binds (122's own design further protects this with the C6 no-op lock — unrelated PRs early-exit in seconds).

## Findings worth the record

1. **Cold ≈ steady within noise** (deltas of −7 s to +10 s per lane). The lanes are **compute-dominated, not install-dominated** — the npm cache buys little because `npm run build` and the test suites dwarf `npm ci`. Consequence: the cold-cache ceiling is effectively the steady ceiling; there is no nasty cold-start cliff waiting.
2. **The functional lane IS the felt latency** (208–234 s); every other lane finishes in under 41 s. Future latency work targets exactly one lane, and the remedy is caching/parallelism — never path-filtering (decided law, Req 2.3).
3. The three PR-runs' findings that made the lanes self-contained are durably recorded as inline comments in `lane-timing.yml` and in the round context (feedback.md § "Tasks 6–9 Feedback").

## Evidence
- Cold run URL + steady-state run URL above (per-job durations from the GitHub API, `gh run view --json jobs`).
- Steady-state history: every PR since #38 accumulates further samples automatically.

*Task 6 complete per the ratified v2 residual scope. Tier 1: measurement + record; no product behavior changed.*
