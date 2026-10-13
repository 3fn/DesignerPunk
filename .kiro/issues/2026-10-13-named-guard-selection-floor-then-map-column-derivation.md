# Charter: named-guard selection floor, then coverage-map column derivation

**Date**: 2026-10-13 · **Ruled**: Peter, 2026-10-13 ("All as recommended with class options"; record `.kiro/specs/123-consumer-distribution/completion/u4-rulings-2026-10-13.md` item 1-class, on Spec 123's U4 branch) · **Owners**: **Stacy** (step 1), then **Lina** with Stacy (step 2) · **Trigger**: step 1 at Stacy's next burst with CI capacity (a P1 `lane-timing.yml`-only PR under ballot 2026-09-27-ci-regime-standing-scope § 2); step 2 only after step 1's registry exists, as its own spec.

## The class of problem
A guard that runs INSIDE an existing required lane (a Jest test selected by a lane's config) has no liveness signal of its own: the lane's selection floor asserts only "≥ 1 resolved test file", so one guard file falling out of `testMatch` goes undetected while the suite stays green. The coverage map cannot show such guards either: its columns are the required CI contexts (`tools/agent-generator/coverage-map.ts` `CHECK_CONTEXTS`), and its surfaces exclude shipped hand-authored content (`governance/` has 0 rows). First instance: Spec 123 Task 23's audience-banner guard (`scripts/audience-banner/__tests__/audience-banner.test.ts`, lane `lane-functional-root` via `npm run test:scripts`); same shape: the completion-claims suites. Consult record: Lina + Stacy, cross-read, 2026-10-13 (U4 session; both converged on this order).

## Step 1 — named-guard selection floor (Stacy)
A registry of in-lane guards, each by file and lane; the lane's floor step asserts each registered file appears in `npx jest --config <lane config> --listTests` on every run. Cost: one registry + one P1 PR whose diff is exactly `lane-timing.yml`. **Residual**: the registry is a hand-kept list; an unregistered guard is invisible to it (smaller and more visible than no registry; the LENS question 6 and claims passes are the backstop).

## Step 2 — map-column derivation (Lina + Stacy)
Derive `CHECK_CONTEXTS` from `EXPECTED_CONTEXTS` (as the lanes section already does, `coverage-map.ts` `parseExpectedContexts`), one sub-column per registered in-lane guard under its lane, surfaces = generated ∪ canonical ∪ shipped. Spec-sized. **Why after step 1**: sub-columns without the floor add self-declared green to the map before anything proves those guards run. Known drift it also closes: four later-armed required contexts have no column (Consumer Guard, 125B-tool-boot-smoke, Section Citation Guard, completion-criteria-parity).

## Not in scope
Spec 123 U4 ships none of this; U4's Task 23 evidences registration by the ruled four-item set (record item 1). The retired sweep-5 column is a separate chore (`2026-10-13-coverage-map-stale-sweep-5-column.md`).
