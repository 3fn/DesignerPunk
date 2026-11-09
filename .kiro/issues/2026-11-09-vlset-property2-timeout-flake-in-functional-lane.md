# Issue: `ButtonVerticalListSet.property2.test.ts` times out under CI load, a flake in a lane that is meant to be deterministic

**Date**: 2026-11-09
**Owner**: Lina (component tests)
**Filed by**: Thurgood (test-suite health steward), under README rule 10, at the orchestrator's request after the failure on #837. Rule 9 applies to every later edit.
**Class**: P2 obligation (guard) · defect *(set 2026-11-09, Thurgood, rule 12. The functional lanes claim to be timing-assertion-free and deterministic (Start Up Tasks § 4, "Lane semantics reworked 2026-07-03"). This file can go red on a PR whose diff cannot affect it, so the lane is weaker than its claim. It does not ship a falsity.)*
**Trigger**: `path:src/components/core/Button-VerticalList-Set/__tests__/ButtonVerticalListSet.property2.test.ts` — the event that owes the close is the fixing PR, the first PR that changes this test file. That PR carries the close, or a dated re-rule with its reason.
**Consulted**: none needed — filing only; the fix is Lina's

---

## What happened

The file failed twice in the required job `lane-functional-root` (`.github/workflows/lane-timing.yml`), each time on a PR whose diff could not affect it. Each time the cause was Jest's default 10000 ms per-test timeout, and each time a re-run of the failed job was green.

| Date | Run, attempt 1 | PR head | Test that timed out | File time |
|---|---|---|---|---|
| 2026-11-04 | 41751524846 (job 126317499646) | `17cb24211`, `chore/release-16.2.0-trio` | Property 11: Animation Timing Coordination › "should apply correct transition delays in select mode selection change" | 111.909 s |
| 2026-11-09 | 42550073842 (job 128943448765) | `fe54f3d32`, #837 (records only, Lina) | Property 17: Controlled Component State Derivation › select mode and multi mode, both | 123.058 s |

**How the history was read** (2026-11-09):
- **Re-run runs**: in the 300 most recent `lane-timing.yml` runs, the runs with `run_attempt > 1` number 3. Attempt 1's `lane-functional-root` log was read for each. Two are this file (above); one is `tools/agent-generator/__tests__/render.test.ts` (39049514262, 2026-10-17), which is unrelated.
- **Failed runs never re-run**: every `failure` run in those 300 (53 runs, back to 2026-07-09) has a latest-attempt log, and none shows this file as `FAIL`.
- **Passing times**: where those logs show the file passing, it took 49.2–93.1 s, with a median of 82.4 s (24 runs).

**So**: two flakes in five days, and none before that in the window. The file's passing time sits within a factor of about 1.3–2.5 of its failing time.

## Why it times out

- **17 `fc.assert` blocks, each `{ numRuns: 100 }`**. Each run creates a web component and polls its shadow DOM (`waitForShadowDOM`, up to 1000 ms).
- **No per-test timeout**, so each `it` gets Jest's default 10000 ms.
- **A heavy shared runner**: the whole lane runs 441 suites and about 10 300 tests, so a property test that spends seconds in DOM work per `it` is pushed over 10 s.
- The assertions themselves are not timing assertions. **The runtime of the property loop is what the timeout measures.**

## Fix directions to consider (the owner chooses; none is decided here)

- **(a) Bound `numRuns`** for the DOM-rendering properties, for example to 20–25, with a comment saying why. A property over a small finite input space (modes, item counts) loses little at fewer runs, and the cost is per run. Measure first, then cut: say which properties need how many runs to cover their input space.
- **(b) A per-test timeout that is justified, not raised blindly.** Measure the slowest `it` locally and in CI, set its timeout to a stated multiple of that, and name the measurement in a comment. Raising the timeout alone hides a slow loop and keeps the lane slow.
- **(c) Make each run cheaper.** Reuse one element across a property's runs where the property allows, or replace the polling `waitForShadowDOM` with the lifecycle wait the Test Development Standards teach (`customElements.whenDefined` plus one tick).
- **(a)** and **(c)** remove the cause; **(b)** alone only moves the threshold. Whatever lands, the PR body reports the file's CI time before and after.

## Not in scope

- The test's assertions and the properties they check: unchanged by any of (a)–(c).
- `lane-timing.yml` and the lane's job structure: Thurgood's standing scope covers only an added test-script step. Moving this file to another lane would be a lane-semantics change, and is not proposed.
