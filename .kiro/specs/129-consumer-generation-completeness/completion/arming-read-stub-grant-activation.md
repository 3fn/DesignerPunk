# ARMING read: activation of the dispatch-stub grant for `native-harness.yml`

**Event**: ARMING, limb "an issue-row grant over a `.github/**` path merges", at its **activating merge** (my charter's ARMING row; `.kiro/issues/README.md` rule 8; ballot `2026-09-27-ci-regime-standing-scope` § 3, as amended by ballot `2026-10-20-grant-ci-deletions-and-activating-merge-read`). The second read of this limb comes at the fixing PR's merge (the stub PR). It is not made here.
**Grant record**: `.kiro/issues/2026-11-06-native-harness-dispatch-stub-grant.md` (owner Thurgood).
**Activating merge**: PR #698, "Spec 129 tasks amendment 2". Squash `233e04bf110b937ce7a447f8476bbfb14957260f` on `main`, merged 2026-11-06T14:33:44Z by `3fn` (Peter). PR head `d95ee446ff9f709eadc4fe6a958ad639440abe57`. Parent `73057779c`.
**Reader**: Stacy · **Read date**: 2026-11-06 · **Tree read**: worktree `chore/129-stub-grant-activation-read`, cut from `origin/main` = `233e04bf1`. The PR body was read with `gh pr view 698 --json body`, from a session holding credentials.
**Status**: a post-acceptance audit. **Never a gate**: no pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.

**Grant activation read**: .kiro/issues/2026-11-06-native-harness-dispatch-stub-grant.md @ 233e04bf1

---

## Verdict: **ACTIVATED, as declared.** No finding.

## 1. The activation reads (ARMING row, "at activation")

- **The list names no governance-law path.** The record's `**Grant paths**` block at `233e04bf1` reads, in full: `**Grant paths**: \`.github/workflows/native-harness.yml\``. That path is outside `governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**` and the agent prompts and configs (Task-Completion-Protocol § "The Merge Rule", standing carve-out). Rule 8's "never a governance-law path" holds.
- **The list names every M1-excluded act it admits.** It admits none. The record's `**Excluded acts** (M1; none is admitted here)` list reads: no new required context; no change to `EXPECTED_CONTEXTS`'s count; no change to `complete-task.sh`'s `REQUIRED_WORKFLOWS`; no removing or weakening of a step, floor or execution assertion; no other `.github/**` path.
- **`**Deleted lines**:` block.** There is none, and none is owed. The record says the fixing PR "creates a file, so this record carries no `**Deleted lines**:` block". `git cat-file -e 233e04bf1:.github/workflows/native-harness.yml` fails: the file does not exist at the activating merge. So the fixing PR can delete no line on that path. The fixing-merge read will still check `--numstat` deletions `0`.
- **The activating PR named the grant and carried the ARMING line** (rule 8). Body line 35 names the record and its path list. Body line 37 reads exactly `**ARMING**: at this merge and at the fixing PR's merge`: one match for the whole-line pattern, at column 0.
- **The activating merge touched no CI path.** `git diff-tree --no-commit-id --name-status -r 233e04bf1` lists four files: `A` for the grant record, and `M` for `design.md`, `feedback/tasks.md` and `tasks.md` under Spec 129. None is under `.github/`.
- **The list I will read at the fixing merge** is the block above, as it stands at `233e04bf1`. Between the reviewed head `4be319bcc` and the merge, the record changed in one line only: the `on:` criterion line, which I asked for in `[STACY TASKS R3]`. The `**Grant paths**` and `**Excluded acts**` text is unchanged.

## 2. The standing ARMING reads, at `233e04bf1`

- **`verify-gate-registration.sh`: measured by me**, credentials from the main checkout's `.env`, passed in the environment and never printed:

  ```
  PASS: all 19 required contexts present, count-asserted (N=19 recorded in this script)
  ```

- **PR #698's required checks** (`gh pr checks 698 --required`): 19 contexts, every one reporting `pass`. `completion-criteria-parity` is among them, so it is not dormant.
- **`npm run audit:coverage-map`: measured by me** (exit 0):

  ```
  audit:coverage-map: PASS (surfaces PASS · lanes PASS)
    total surfaces      : 496
    guarded             : 495
    blank               : 1
    adjudicated-blank   : 1
      [adjudicated] canonical/generated.lock
  ```

  The run used the main checkout's `node_modules` through a symlink. That symlink was never staged.

## 3. Two other grant-activation lines I owed in the LIVENESS window

Thurgood's LIVENESS item 4 query, run at `233e04bf1` (window from 2026-10-17), printed three `OWED` lines: this grant's, and two older ones. Both older candidates are the query's documented superset: blocks that mention `.github/` only to say it is not granted. I owe each the marker line with its non-activation tail. They are carried here, so that the next walk does not print them:

**Grant activation read**: .kiro/issues/2026-10-19-owed-set-query-over-lists-in-progress-specs.md @ 9359c3805 — no .github/** grant activated: the record's `**Grant paths**` block at `9359c3805` (#437) says "no `.github/**` path, so no ARMING line and no `**Deleted lines**:` block", and lists `scripts/owed-set.sh`, `scripts/__tests__/owed-set.test.ts`, `package.json` (`files[]` only) and `scripts/pack-assert.ts` (conditional)

**Grant activation read**: .kiro/issues/2026-10-26-governance-examples-guard-build-grant.md @ 7554fd4e3 — no .github/** grant activated: the record's `**Grant paths**` block at `7554fd4e3` (#511) grants `scripts/governance-examples/**`, and names `.github/in-lane-guards.json` only to say "It does not cover `.github/in-lane-guards.json` either, which is Thurgood's standing lane scope (P1b, additive)"

**A finding on my own seat (Low)**: both lines were owed since their merges (2026-10-21 and 2026-10-26), and I did not write them. No health-check walk has run since the query landed, so neither line has surfaced as a LIVENESS finding. Neither merge activated a `.github/**` grant, so no unread activation is hidden behind them.

## 4. Noted for the fixing-merge read and for U1 (not findings here)

- **At the stub's merge** I read the following. The diff is a subset of the list above (exactly `.github/workflows/native-harness.yml`). `--numstat` deletions are `0` on CI paths. The record's own criterion holds: `on:` has exactly one key, `workflow_dispatch`; the `git grep` returns no line; the gate count is unchanged at 19.
- **At U1's merge** (Task 5's grant, a tasks-row grant, not this one): the amended grant limits admit deleting the stub's single job and its one step, quoted in U1's PR body in a `**Deleted lines**:` block. That quote is authored inside the PR it bounds. A claims reader will not rely on it, because the deleted lines can be decided from git without the body. They must be exactly the lines of `git show <stub merge>:.github/workflows/native-harness.yml` that U1's diff removes. I will read them that way.

Standards implications: none.
