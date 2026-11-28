# ARMING read of #878's activation: the Android render probe workflow grant (Spec 132's outline round)

**Event**: ARMING, the grant limb of my charter's row: an issue-row grant over a `.github/**` path, at its activating merge. No other limb fired at this merge (§ A2). The fixing PR's read falls due at its merge and is not made here.
**Reader**: Stacy · **Read date**: 2026-11-27 · **Tree read**: worktree `chore/stacy-arming-read-878`, cut from `origin/main` = `822919318`. Everything below was read from git at the commit it names, unless it says otherwise.
**Credentialed facts**: I read the PR body and metadata with `gh pr view 878`, using the credentials in the main checkout's `.env`. They were passed in the environment and never printed.
**Status**: a post-acceptance audit. **Never a gate**: no pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.

**Grant activation read**: .kiro/issues/2026-11-27-android-render-probe-workflow-grant.md @ 822919318

---

## Summary of verdicts

| # | Read | Merge | Verdict |
|---|---|---|---|
| A1 | Grant activation: `android-render-probe-workflow-grant` | #878 `822919318` | **Activated as declared**, no finding |
| A2 | The other limbs, at this merge | #878 | **None fired** |

---

## A1. Activation of the render-probe grant (#878, `822919318`)

- **The grant record at the activating merge**: `.kiro/issues/2026-11-27-android-render-probe-workflow-grant.md`.
  - Owner: Data.
  - Class: `P2 obligation (guard) · grant`.
  - Trigger: `path:.github/workflows/android-render-probe.yml`.
- **The PR**: opened 2026-11-27T16:49:59Z, head `0ea9eda16`, merged 2026-11-27T16:57:03Z. The merge's diff is that one file, added (98 insertions; `git diff --stat 822919318^ 822919318`).
- **The body**, read with `gh pr view 878 --json body`, carries:
  - `**ARMING**: at this merge and at the fixing PR's merge`;
  - `**Grant paths**: .github/workflows/android-render-probe.yml`, so the activating PR names the grant and its path list (README rule 8).

**The checks:**
- **The list names no governance-law path.** `**Grant paths**:` names one path, `.github/workflows/android-render-probe.yml`. It names no `governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**` or `canonical/agents/**` path.
- **The list names every M1-excluded act it admits.** M1's excluded acts on a `.github/**` grant (ballot `2026-09-27-ci-regime-standing-scope` § 3, clause 5) are:
  - no new required context;
  - no change to `EXPECTED_CONTEXTS`'s count;
  - no removing or weakening of a step, floor or execution assertion.

  The record admits none of them and lists each as excluded. It also excludes:
  - any change to `complete-task.sh`'s `REQUIRED_WORKFLOWS`;
  - any other `.github/**` path;
  - any edit to `native-harness.yml` or any other workflow.

  It names and admits two acts that are not M1-excluded:
  - a `pull_request` trigger whose `paths:` filter lists exactly the workflow and `harness/android/render-probe/**`;
  - a `sudo` udev rule on the ephemeral runner VM.
- **`**Deleted lines**:` block**: none, as is right for a grant whose one path is a new file. No deleted line is admitted, so the fixing PR's deletions on CI paths must read `0`.

**Owed at the fixing PR's merge** (this limb's second read, not made here):
- its paths are a subset of the list as it stood at `822919318` (`git show 822919318:.kiro/issues/2026-11-27-android-render-probe-workflow-grant.md`);
- `git diff --numstat` deletions are `0` on CI paths;
- the workflow's triggers, permissions, runner, timeout and steps are those the record admits;
- the probe's result is recorded in that PR with rule 5's outcome line, as the record's Trigger says.

---

## A2. The other limbs, at #878's merge

The merge's diff is one file under `.kiro/issues/`. So none of the other limbs fired:
- no barrier armed, and the required-check set is unchanged (no `.github/**` file and no gate-registration file in the diff);
- no CI-regime standing-scope (P1) or P1c path;
- no `.github/in-lane-guards.json`;
- no instrument path;
- no `scripts/governance-examples/pending.json`.

---

**Standards implications**: none.

*Signed: Stacy, 2026-11-27.*
