# Issue: a dispatch-only stub of `native-harness.yml` on `main`, so U1 can dispatch its harness before it merges

**Date**: 2026-11-06
**Owner**: Thurgood
**Class**: P2 obligation (guard) · grant
**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/completion/task-5-completion.md` — the event that owes the close is Task 5's completion doc reaching `main` at U1's merge. That doc records the probe dispatch below. U1's PR closes this record with a rule 5 outcome line naming the stub's merge commit and the probe's run URL, or the fallback amendment if the probe failed.
**Source**: Peter's Decision 1, verbatim "1 A" (his full answer: "1 A, 2 yes, 3 stand, 4 (b), 5 no rewrite; let's also proceed with the class option"), `date -u` at receipt 2026-11-06T14:04:52Z (orchestrator relay; **UNVERIFIED** beyond the relay). The plan text is Spec 129 tasks amendment 2: `tasks.md` § "Conventions for every parent" (the dispatch line) and § "Unit preconditions and the records 129's paths fire".

---

## The gap

U1's plan dispatches the harness against the unit branch before U1's PR opens (`tasks.md` Conventions: `gh workflow run native-harness.yml --ref <branch>`). It also requires a dispatched forced-failure run (Req 2.11) and baselines from the first full run (Task 5). But GitHub triggers `workflow_dispatch` only for a workflow whose file is on the default branch (`.kiro/docs/ballots/2026-09-27-b-ci-unit-branch-ci-feedback.md` L197). `native-harness.yml` does not exist on `main` until U1 merges, so none of those runs can happen as planned. Task 5's tasks-row grant covers the file only on the unit branch, and Thurgood's standing CI scope covers only `lane-timing.yml` and `.github/in-lane-guards.json`. A PR to `main` that creates the file therefore needs this grant.

**Premise (UNVERIFIED until the probe runs)**: once a file carrying `workflow_dispatch` is on `main`, a dispatch with `--ref <branch>` runs the branch's copy of that file, not `main`'s. The probe below tests this before anything relies on it.

---

## Grant

**Grant paths**: `.github/workflows/native-harness.yml`

Per `.kiro/issues/README.md` rule 8 and ballot `2026-09-27-ci-regime-standing-scope` § 3:
- The grant holds on the fixing PR's branch only.
- It is activated by Peter's merge of the PR whose body names this record and this path list: Spec 129 tasks amendment 2's PR, which carries `**ARMING**: at this merge and at the fixing PR's merge`.
- It expires when the fixing PR merges.
- It confers no ratification authority and is additive to Thurgood's charter scope.

**Excluded acts** (M1; none is admitted here):
- no new required context;
- no change to `EXPECTED_CONTEXTS`'s count;
- no change to `complete-task.sh`'s `REQUIRED_WORKFLOWS`;
- no removing or weakening of a step, floor or execution assertion;
- no other `.github/**` path.

The fixing PR deletes no line on a CI path, because it creates a file, so this record carries no `**Deleted lines**:` block.

---

## The fix (the fixing PR)

1. **The diff**: one new file, `.github/workflows/native-harness.yml`, and nothing else.
2. **The file**:
   - triggers: `on: workflow_dispatch` (no inputs), and no other trigger (no `pull_request`, `push` or `schedule`);
   - `permissions: contents: read`;
   - one job, named `native-harness stub (unit-branch)`, on `runs-on: ubuntu-24.04`, whose single step prints that this is the dispatch stub and that U1's PR replaces the file;
   - a header comment naming this record and Spec 129 Task 5 as the owner of the real file.
3. **What it causes on `main`**: it runs on no PR and no push, so it adds no check to any PR.

---

## The probe, and the fallback

- **The probe**: after the fixing PR merges, and once the unit branch `task/129-compile-harness` carries its own copy of the file (Task 5.1's first commit), run `gh workflow run native-harness.yml --ref task/129-compile-harness`.
  - **Pass**: the run's jobs are the branch file's (`harness-generate (unit-branch)` and the four contexts' `(unit-branch)` names), not `native-harness stub (unit-branch)`.
  - **Record**: the run URL and the job names go in `.kiro/specs/129-consumer-generation-completeness/completion/task-5-completion.md` (a Task 5 criterion).
- **The fallback** (Peter's Decision 1 as presented: "If that test fails, we fall back to D"): if the probe fails, U1 takes option D.
  - The branch's copy adds `on: push: branches: [task/129-compile-harness]`, and the last commit before PR-open removes it.
  - D's edits (Req 2.11's "dispatched", design § 3 rule 3's "a dispatched run", and `tasks.md`'s dispatch wording) merge in a further tasks amendment **before U1's PR opens**.
  - This record is then re-ruled by its owner with a dated reason, or closed with the probe's error and the fallback amendment named.

---

## Criterion (decidable without consulting the author)

- `git diff --name-only <base>..<fixing-PR head>` is exactly `.github/workflows/native-harness.yml`.
- In that file, `on:` has the single key `workflow_dispatch`.
- `git grep -n -E 'pull_request|push:|schedule' -- .github/workflows/native-harness.yml` at the fixing PR's head returns no line.
- `tools/agent-generator/verify-gate-registration.sh` reports its count unchanged at the fixing PR's head.
