# ARMING read: the corrected derivation check on the shipped profile, newly applied at U3g's merge

**Event**: ARMING. The trigger row in `canonical/agents/stacy.md`: "a new barrier arms / the required-check set changes". Placed at U3g's merge by `tasks.md` § "Declared Merge Units" ("a check newly applied on every PR touching its inputs, criterion 29 C6"). Instruments rows: Task 29 row 6.7 (`completion/task-29-instruments.md`) and Task 30 row 9.1 (`completion/task-30-instruments.md`), both `MISSING → Stacy: post-merge, by design`. This record resolves both.
**Merge**: PR #313, "U3g G2 cycle 2: the corrected derivation check on the shipped profile (123)". Squash **`31a8c9194759d9ab63f992e0483e2e678ad9cd05`** on `main`, merged 2026-10-13T03:46:25Z. PR head `bf556cf386648879237e2fa35d18ceefcfc68325`.
**The check**: `checkShippedProfile` (`tools/agent-generator/regrounding/derivation.ts`, "THE STANDING APPLICATION") and its standing test `tools/agent-generator/__tests__/derivation.shipped-profile.test.ts` (Task 29.4, `task-29-4-completion.md`).
**Reader**: Stacy · **Read date**: 2026-10-12 (local; the merge is stamped in UTC) · **Tree read**: a worktree at `31a8c9194` (`git status -sb` clean before the read).
**Status**: a post-acceptance audit. **Never a gate**: no pass, at any grain, is a required check, a review gate, or a blocking condition on any PR.

---

## VERDICT: **ARMED**, with one Low finding (the lane floor), routed to Thurgood.

The check is live on `main`. It runs in a required context on every PR, it ran green on #313's head with the standing test in the resolved selection, and the cycle-2 record's input set did not move between H′ and the squash. The Low finding is a weakness of the lane the check rides in, not a defect in the check.

## 1. The check, and where it is registered

| Item | Reading |
|---|---|
| What it checks | The 11.4 derivation check (corrected by Task 29.1–29.3) applied to every `re-pointed` row of the committed consumer profile, against `_canonical` and every declared target rendering (Kiro: prompt and JSON pooled). A row is `VERIFIED` only if `VERIFIED` on every surface that carries its source file. |
| Non-vacuity | The test throws unless the evaluated row count equals the `re-pointed` count read independently from the committed dispositions, and that count is non-zero (`derivation.shipped-profile.test.ts` L48, the `standing()` throw). Read at `31a8c9194`. |
| Reading at H′ | 169 rows evaluated, 169 `VERIFIED` (`task-29-4-completion.md`). The count was not recomputed here; see § 5. |
| Registration | **No new context and no workflow edit.** It rides the existing `npm run test:agent-generator` step in `lane-functional-root` (`.github/workflows/lane-timing.yml`, the "Selection floor" step and the "Run tools/agent-generator/** test suite" step). `lane-functional-root` is in `EXPECTED_CONTEXTS` (`tools/agent-generator/verify-gate-registration.sh` L69), and `EXPECTED_COUNT=19`. |
| Register row | None. `governance/classification-map.md` carries no row for this check (`grep -n "derivation\|shipped-profile\|g2"` → 0). The check is mapped by `audit:coverage-map`'s lanes section, not by a register row. Named, not a finding: `tasks.md` does not call for a row. |

## 2. The required context it bites in

`Lane Timing / lane-functional-root`. Read from the files at `31a8c9194`:

- **Every PR**: `lane-timing.yml` L39–40 is `on: pull_request:` with no `paths:` filter. The check therefore runs on every PR, a strict superset of "every PR that touches its inputs".
- **The test is in the resolved selection**: `tools/agent-generator/jest.config.js` has `testMatch: ['**/__tests__/**/*.test.ts']`. Counting by `find` over `tools/agent-generator` (excluding `node_modules` and `dist`) gives **59** files, and the file is one of them. `audit:coverage-map` (run in this worktree, exit 0) independently reports `compared, no gap: … tools/agent-generator/jest.config.js (59)` and `[jest-listing] npx jest --config tools/agent-generator/jest.config.js --listTests <- lane-functional-root`.
- **The context is required**: `gh api repos/3fn/DesignerPunk/branches/main/protection/required_status_checks` → 19 contexts, `lane-functional-root` among them.
- **The step is not skippable inside the job**: the "Selection floor" step runs before it and the suite step has no `if:`. A failing suite fails the job, and a failing job blocks the merge at the platform.

## 3. Gate-bite evidence

**On #313's head (green, with the file in the selection).** Run `38342614888` (Lane Timing, `pull_request`, head `bf556cf386648879237e2fa35d18ceefcfc68325`), job `lane-functional-root` → `SUCCESS`: https://github.com/3fn/DesignerPunk/actions/runs/38342614888/job/115116771637. From the job log (read with a read-only `gh api`):

- `jest resolved 59 tools/agent-generator/** test files (floor: 1; derived from 30 on 2026-09-27)`, and the printed selection lists `…/tools/agent-generator/__tests__/derivation.shipped-profile.test.ts`.
- `PASS tools/agent-generator/__tests__/derivation.shipped-profile.test.ts`.
- `Test Suites: 59 passed, 59 total` · `Tests: 1686 passed, 1686 total`. This also shows that the stale `operative-set-freshness` red that 29.4 recorded (1685/1686) cleared with 29.6.

**The red side (the check refuses a planted bad row).** Committed bite records, both read at `31a8c9194`: `tools/agent-generator/__fixtures__/semantics-guard/__bites__/task-29-4-bite-shipped-{red,green}.txt`. The RED record plants one rejected row (C1 on `stacy.dispositions.yaml`) in a scratch copy; "every re-pointed row is VERIFIED …" fails, and the standing app reports 169 rows evaluated. The in-suite bites (E3 plant → exactly that row, `FAIL_DISHONEST_NAMING`; E2 dispositions removed → refuses on zero) run on every CI pass of the file. **I did not re-run the planted bite myself**; it is read from the committed record and from the CI run in which the in-suite bites passed.

**Coverage-of-coverage** (the trigger row's standing reads), run in this worktree at `31a8c9194`:

- `npm run audit:coverage-map` → `PASS (surfaces PASS · lanes PASS)`; surfaces 496, guarded 495, blank 1, adjudicated-blank 1 (`canonical/generated.lock`, an existing adjudication, not new); required contexts 19.
- `verify-gate-registration.sh` was **not run** (no credentials for the script's own query beyond read). Its input was cross-read instead: the 19-context list from `gh api` above equals `EXPECTED_COUNT=19`, and `lane-functional-root` is in both.
- `completion-criteria-parity` dormancy: the check is required (in the 19) and ran `SUCCESS` on #313's head (`completion-criteria-parity`, run `38342614919`). Not dormant.

## 4. The post-squash input-set check (cycle-2 record § 8; condition RF6 / refusal condition (d))

The cycle-2 record (`re-grounding-g2-cycle-2.md` § 8) requires `git diff --name-only 8d27e02b3 <squash> -- <declared input set>` to print nothing; a printed path voids the record for the change. The declared input set is the 16 pathspecs of `task-29-4-completion.md` § "The declared input (trigger) set": `canonical/profiles/consumer/**`, `canonical/agents/**`, `canonical/shared/**`, the eight always-set steering docs, `canonical/consumer-profile.yaml`, `tools/agent-generator/**`, `canonical/_consumer-output/**`, `package.json`, `.github/workflows/lane-timing.yml`.

```
$ git diff --name-only 8d27e02b398810e5e577ba297ef10f5aa33cc337 31a8c9194759d9ab63f992e0483e2e678ad9cd05 -- \
    canonical/profiles/consumer/ canonical/agents/ canonical/shared/ \
    .kiro/steering/AI-Collaboration-Principles.md .kiro/steering/Agent-Directory.md \
    .kiro/steering/Civitas-System-Overview.md .kiro/steering/DesignerPunk-Systems-Overview.md \
    .kiro/steering/Spec-Feedback-Protocol.md .kiro/steering/Task-Completion-Protocol.md \
    .kiro/steering/core-goals.md .kiro/steering/start-up-tasks.md \
    canonical/consumer-profile.yaml tools/agent-generator/ canonical/_consumer-output/ \
    package.json .github/workflows/lane-timing.yml
$ echo "exit=$?"
exit=0
```

**Nothing printed.** For contrast, the same two commits differ in 13 paths outside the input set (the three `.kiro/issues/` charters and one friction issue, the cycle-2 record, `task-30-*` docs, `design.md`, `g2-spec-text-ruling.md`, `tasks.md`, `docs/specs/…/task-30-summary.md`); none is under a declared path. The cycle-2 record therefore **stands**.

Two notes on the command, both bounded:

- H′ (`8d27e02b3`) is on the task branch and the squash is a different commit, so `git merge-base --is-ancestor` between them is false. That is expected for a squash. The check is a tree-to-tree diff, which is what the record prescribes.
- The pathspecs are directory prefixes (`dir/`) rather than the `**` globs in the doc. For `git diff` pathspecs they select the same paths. `main` had not advanced past `31a8c9194` when this was run (`git log -1 origin/main` → `31a8c9194`).

The PR-open half of the condition (`git diff --name-only 8d27e02b3 <PR head>`) is Task 30's own instrument (`task-30-instruments.md` row 3.2) and is not re-read here; this record owns the post-squash half.

## 5. Findings

| # | Severity | Finding | Routed to |
|---|---|---|---|
| 1 | **Low** | **The lane floor cannot see the deletion of the standing test.** The "Selection floor" step is `[ "$COUNT" -ge 1 ]` (`lane-timing.yml` L279; floor 1, derived from 30 files on 2026-09-27). The directory resolves 59 files today. A PR that deletes `derivation.shipped-profile.test.ts` (or moves it out of `__tests__/`) drops the count to 58 and the lane stays green, with the check gone. The same holds for any individual suite in the lane. This is the floor's design ("non-vacuity", not "this file runs"), and the check's own non-vacuity assertion protects the row count inside the file, not the file's existence. The deletion would show in the diff of a PR touching `tools/agent-generator/**`, which is a reviewer's catch, not a mechanical one. **Promised / claimed / shipped:** the criterion promises "runs on every PR that touches its inputs" (met, as the file is present); it makes no promise that removal is caught, so this is a limit on the barrier's reach, not a broken claim. I did not run a deletion bite (a post-acceptance audit does not produce a red PR); the weakness is read from the floor expression and the resolved count. | **Thurgood** (the CI regime's standing test-lane scope, and the maintainer of the coverage-of-coverage reads): whether a named-file assertion, or a floor nearer the real count, is wanted. His call, not mine to word (the mirror clause). |

**Not a finding, named so a reader does not infer a guard:** the count in `checkShippedProfile` is "equal to the committed dispositions' count", derived from the same committed files the check reads. A change that moves a row out of `re-pointed` in the dispositions shrinks both sides equally and the test stays green. That is the dispositions' signing chain's territory (`verify-signing-chain`, `operative-set-freshness`), not this check's. I note it as the check's honest reach.

**Stale header comment, Low, for the file's owner:** `lane-timing.yml` L2–5 still says the jobs are "deliberately NON-REQUIRED — omitted from the branch-protection required-checks list". The `gh api` read above shows `lane-functional-root` is required. A reader trusting the header would believe this check bites nowhere. Thurgood owns the file's standing scope; routed with finding 1.

## 6. Method: the sample, named, and how many of the total

- **Population**: one merge (#313, `31a8c9194`), one newly applied check, one declared input set of 16 pathspecs.
- **Re-verified by me (read or run in this seat)**: the post-squash input-set diff (16 of 16 pathspecs, run); `audit:coverage-map` (run, exit 0); `lane-timing.yml` triggers, floor and step order (read); `jest.config.js` `testMatch` and the 59-file `find` count (run); the test file's non-vacuity assertion (read); the `EXPECTED_CONTEXTS` list and count (read); the 19-context required list and `completion-criteria-parity` / `lane-functional-root` run conclusions (`gh api`, read-only); the CI job log lines quoted in § 3 (`gh api`, read-only).
- **Not re-verified — toolchain unavailable / out of scope for a read-only post-acceptance seat**: the planted-row RED bite (read from the committed record, not re-run: I did not run the jest suite or any unit-branch dispatch); `verify-gate-registration.sh` itself (not run; cross-read instead); the 169-row count and per-row `VERIFIED` status (taken from `task-29-4-completion.md` and the green CI job, not recomputed); the PR-open `git diff` (Task 30's instrument).
- **Limits of the ARMING claim**: a green `lane-functional-root` shows the standing test passed at #313's head. It does not show the check is correct; the cycle-2 record's attacks and rows (`g2-cycle-2-attacks.md`, `re-grounding-g2-cycle-2.md`) are where that was tried. This record reads that the check is mapped, required, selected and green, and that its inputs held through the squash.

## Counting block

Not a claims pass; the full counting block is carried by the closeout/midpoint records of the spec. Counted here for this event only: findings 1 Low (routed) + 1 Low (stale header comment, same route); post-squash input-set paths printed **0 of 16 pathspecs**; instruments rows resolved 2 (Task 29 row 6.7, Task 30 row 9.1).

## Ledger line

```
2026-10-12 ARMING derivation check on the shipped profile — #313 squash 31a8c9194 (PR head bf556cf3) — lane-functional-root green run 38342614888 job 115116771637 (59 files in selection, 59/59 suites, 1686/1686 tests, derivation.shipped-profile PASS); audit:coverage-map PASS (surfaces+lanes); required contexts 19; post-squash input-set diff vs H′ 8d27e02b3: nothing printed (0/16 pathspecs); Low: floor COUNT>=1 does not see deletion of the test (-> Thurgood) — Stacy
```

## Standards implications

1. **The lane floor's reach** (finding 1): the "did it really run" floor proves the lane is non-empty, not that a named standing test is in it. Whether standing tests that carry a hold or an ARMING (this one is the hold's "standing test file at S") should be asserted by name is **Thurgood's** to decide as the owner of the standing scope; the dating of the floor's derivation (30 files on 2026-09-27, 59 now) is part of the same question. Not a finding against #313.
2. The stale NON-REQUIRED header in `lane-timing.yml` may be teaching the wrong thing about which lanes bite. Same owner.
3. No other standards implication.

---

**Provenance**: git evidence read from a worktree at `31a8c9194`; CI conclusions and log lines read with a read-only `gh api` (token from the main repo's `.env`, never printed). This seat holds no write credentials on GitHub.
