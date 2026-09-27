# Task 9 — CI gatefix: `lane-mcp-server-suite` red on U1 PR #215 (Thurgood, 2026-09-27)

**Scope**: change request on the open U1 PR (#215), authorized by Peter 2026-09-27. Fixed in worktree `/Users/3fn/Documents/Work Projects/Kiro/DP-wt-gatefix` on branch `task/123-u1-gatefix`, cut from U1 head `10061e6a`. Not merged; Peter merges into `task/123-u1-substrate` once Ada's parallel CI fixes land.

## What changed

The 119-A relocation-integrity gate (`mcp-server/src/relocation-integrity-gate/relocation-integrity-gate.ts`, coupling check A7) asserted a fixed `MANAGED_DIRS` shape (`path: 'governance'` / `path: '.kiro/steering'`) in `src/cli/sync/FileScanner.ts`. Spec 123 Task 5.4 deliberately retired that fixed list — `FileScanner.ts` no longer hard-codes managed roots; callers derive roots from the manifest's C7 namespace rule (`managedCopyRoots` in `Classifier.ts`, built from `COPY_ROOTS` in `src/cli/sync/Manifest.ts`). The gate was checking a shape that Spec 123 correctly deleted, so it always failed post-Task-5.4.

**Fix**: re-pointed the A7 check's third leg from `FileScanner.ts`'s dead `MANAGED_DIRS` pattern to `Manifest.ts`'s `COPY_ROOTS` array, asserting the same invariant (governance/ ADDED, .kiro/steering/ KEPT among what `sync` manages) at its new, correct location. Renamed the surface label and detail string accordingly (`FileScanner MANAGED_DIRS` → `Manifest COPY_ROOTS`). Added a dated note in the source citing Spec 123 Task 5.4 and pointing to the companion proof (`src/cli/__tests__/FileScanner.test.ts` asserts `MANAGED_DIRS` is `undefined`). No weakening of the check — the invariant is still asserted, just against the surface that actually carries it now.

Did not retire the axis: the underlying invariant (governance/ + .kiro/steering/ are both managed roots) is still true and still checkable; it moved, it didn't die. Confirmed by grep that no other test/gate references `FileScanner`'s old `MANAGED_DIRS` shape.

**Investigated, not changed — the routed A1 item**: at Task 5, Peter routed a related finding: this repo's own stale `.kiro/sync-manifest.json` (the pre-123 legacy manifest format) is asserted by the gate's A1 check (governance-key / identity-key counts). Investigated: A1 currently PASSES (82 governance keys ≥ 80 floor, 9 identity keys = 9, meta-guide dropped = true) and was NOT the cause of today's CI failure — A7 was. The steward guard (`sync` refuses to run in this repo at all — see `src/cli/sync/index.ts` line ~176) means nothing will ever rewrite `.kiro/sync-manifest.json` here again; it is frozen at its 2026-06-29 state. That makes A1 a fossil check on an inert file, but not a live risk: nothing can corrupt what the steward guard prevents from being touched. Judgment call: left A1 unchanged. It currently passes, it protects a real historical fact (the frozen legacy manifest's relocation-era counts didn't regress), and there is no live replacement to re-point it to — this repo has no `designerpunk.manifest.json` (the steward guard means `sync` never creates one here). Retiring or rewriting a passing check that isn't blocking anything, without a design or ballot backing the retirement, would be scope creep beyond the CI-gatefix mandate. Flagging as a residual for a future call, not fixing it now.

## Targeted tests + result

- `mcp-server/src/relocation-integrity-gate/__tests__/relocation-integrity-gate.test.ts` — red before (2 failing: the full-gate PASS assertion, and the "remediates all 7 must-fix couplings" count), green after (23/23).
- Full `lane-mcp-server-suite` reproduction from a clean worktree (`npm ci` root + `npm ci --prefix mcp-server`, selection-floor step, `npm test` in `mcp-server/`): 37/37 suites, 612/612 tests passing.
- `npm run check:completion-criteria-parity` (root): 12/12 parents pass, unchanged from before the fix — the gatefix touches no completion-doc claims.
- Trial merge (`git merge-tree --write-tree origin/task/123-u1-substrate HEAD`): clean, no conflicts.

## Application-time adaptations

None — the fix is a direct, minimal re-point of one check's data source; no scope or design change beyond what's described above.
