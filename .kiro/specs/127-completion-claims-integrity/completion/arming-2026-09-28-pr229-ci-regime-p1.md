# ARMING read: #229, the first M1 P1 application of the CI-regime standing scope

**Event**: ARMING (the trigger-table row in `canonical/agents/stacy.md`, as amended by edit site 4 of ballot `2026-09-27-ci-regime-standing-scope`, RATIFIED Peter 2026-09-28, `R` = `d455fe34`). "A CI-regime standing-scope (P1) PR merges": a test-script step plus its floor, added to a required job, is a new barrier arming.
**PR**: #229, "CI: run tools/agent-generator suites in lane-functional-root". Head `c9bca721`; squash-merged as **`46525094`** on `main`, parent `d455fe34`.
**Executing agent**: Thurgood, under standing scope M1 P1. **PR opener**: the orchestrator.
**Reader**: Stacy · **Date**: 2026-09-28
**Status**: a post-acceptance audit. **Never a gate**: no pass, at any grain, is a required check, a review gate, or a blocking condition on any PR.

---

## VERDICT: **PASSES**. One Low evidence-form finding (F-1); one standards advisory.

The CI change is exactly what P1 admits. The two other files are exactly what M3 admits. The new barrier is armed, non-empty, and green on the PR's own required run. The lanes audit is clean.

## Scope

- **Population**: one PR, #229. 1 of 1 read.
- **The checks**, per ARMING's P1 scope (ballot § 2) and M3 (ballot § 4):
  - extent;
  - additivity;
  - the step (an existing test script, inside an existing required job);
  - the floor (fails on zero, and selects with the step's own config);
  - the lanes row cleared, the audit passing, and no stale or inert adjudication;
  - M3's two admitted files.

## Findings

**F-1 — Low, evidence form. Routed to Thurgood (the executing agent) and the orchestrator (the PR opener).**
- **Promised**: ballot § 2, "Evidence owed in each PR's body": "the added step's script name and its floor, **with the floor's selection output from the PR's own CI run**."
- **Claimed**: #229's body cites the floor's **local** result only ("local: 30 resolved, exit 0; zero case exit 1").
- **Shipped**: the PR's own required run, `lane-functional-root` (Lane Timing, pull_request, run `36379245048`, job `108791364941`, at head `c9bca721`), printed `jest resolved 30 tools/agent-generator/** test files (floor: 1; derived from 30 on 2026-09-27)`.
- **So the substance holds; only the evidence form is short.**
- **Remedy**: none needed on #229. Later P1 PRs quote the CI-run floor line in the PR body.
- **Standards implications of F-1**: none. The requirement is clear; it was not followed.

**No other finding.**

## Method: the sample, named, and how many of the total

| Check | How verified | Result |
|---|---|---|
| **Extent** (P1 + M3 only) | `git show --numstat 46525094` → `22 0 .github/workflows/lane-timing.yml` · `0 5 canonical/adjudications.yaml` · `1 1 canonical/generated.lock`, and nothing else. `verify-gate-registration.sh` and `agent-generator.yml` are unchanged (`git diff --quiet d455fe34 46525094 -- …`), so `EXPECTED_CONTEXTS` is untouched, and so are the required-context set and settings | pass |
| **Additivity** | `--numstat` deletions on `lane-timing.yml` = **0**. The hunk (`@@ -231,6 +231,28 @@`) is pure addition: a comment block, the floor step, and the run step. No env, cache, runner, `if:` or `continue-on-error` change | pass |
| **The step** | `npm run test:agent-generator` (an existing script: `jest --config tools/agent-generator/jest.config.js`), placed inside the existing **required** job `lane-functional-root`, after `test:scripts`. No new job, and no new context | pass |
| **The floor: real** | `npx jest --config tools/agent-generator/jest.config.js --listTests` is **the same config as the step's script**. It counts lines and ends with `[ "$COUNT" -ge 1 ]`, the step's last command, so it **fails on zero**. **On the PR's own CI run**: `jest resolved 30 …` | pass |
| **The barrier is green** | The same job's run step: `Test Suites: 30 passed, 30 total` · `Tests: 431 passed, 431 total`. `lane-functional-root` → **SUCCESS** at head `c9bca721`. **The head's tree equals the squash tree** (`git diff --quiet c9bca721 46525094` → equal), so the CI result is the merged content's | pass |
| **M3: adjudications** | The diff removes exactly the five lines of the one `audit:coverage-map:lanes` row keyed `local-config:tools/agent-generator/jest.config.js`, and adds nothing. `git show 46525094:canonical/adjudications.yaml \| grep -c "expires when the test:agent-generator lane step lands"` → **0** | pass |
| **M3: lock** | Only `inputClosure` changed. On an exported snapshot of `46525094`, `tools/agent-generator/sweeps/noop-probe.ts` → **`noop=true`**: the input closure and outputs both match the lock, so it is a genuine refresh | pass |
| **Lanes cleared, audit clean** | `tools/agent-generator/coverage-map.ts` on the same snapshot → `audit:coverage-map: PASS (surfaces PASS · lanes PASS)`. `tools/agent-generator/jest.config.js (30)` is under "compared, no gap", and `npm run test:agent-generator` is among the required steps compared with no gap. **10** lane rows are adjudicated. Stale and inert adjudications: **(none)** | pass |

**Provenance**:
- **CI excerpts**: fetched by the orchestrator with `gh pr view 229 --json headRefOid,statusCheckRollup` and the job log for run `36379245048` / job `108791364941`, then pasted to this seat verbatim. This seat reads no credentials.
- **The snapshot**: `git archive 46525094` into a scratch directory, with `node_modules` symlinked and a throwaway `git init` so `coverage-map.ts` can enumerate. **No worktree was touched.**

**Standards implications:**
1. **The P1 floor convention (advisory, for Thurgood as the CI-regime standard's author).**
   - #229's floor is **1 of 30**. It catches an empty suite but not shrinkage (30 → 1 passes). The same holds for the `scripts/**` floor (1 of 11).
   - Ratified P1 says only "fails on zero", so this is **compliant**.
   - But the same job's functional-lane floor uses a plausible count (**300 of 377**, the 125-A convention).
   - The question is whether P1 floors should follow the plausible-count convention. Only the standard's author can decide it.
2. **F-1**: none (see above).
