# ARMING reads owed after #736: the U7a grant (activation and fixing), the U8 grant's activation, and the merges that checked against my trigger set

**Event**: ARMING, my charter's row as it stands at `610413017` (#746 added the P1c limb and the six harness paths to the instrument-path limb). Limbs that fired in this window: an issue-row grant over a `.github/**` path at its activating merge (#742, #749) and at its fixing merge (#747); an instrument-path PR (#740). The other limbs did not fire (below).
**Reader**: Stacy · **Read date**: 2026-11-07 · **Tree read**: worktree `chore/129-arming-reads-u7a-and-grants`, cut from `origin/main` = `beccbf134` (#749). Everything below was read from git at the merge commit it names, unless it says otherwise.
**Credentialed facts**: PR bodies, check runs, run records and annotations were read by me with `gh` and the checks API, using the credentials in the main checkout's `.env` (passed in the environment, never printed).
**Status**: a post-acceptance audit. **Never a gate**: no pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.
**Window**: the first-parent merges after #736 (`71266589e`): #737 to #749.

**Grant activation read**: .kiro/issues/2026-11-07-default-name-compile-grant.md @ bfead6798
**Grant activation read**: .kiro/issues/2026-11-07-d2-check-step-grant.md @ beccbf134

(The first path is at the issues root at its activating merge; it moved to `archive/` at #747. The line cites the path as the activating merge had it, the same way the previous batch cited an archived grant.)

---

## Summary of verdicts

| # | Read | Merge | Verdict |
|---|---|---|---|
| A1 | Grant activation: U7a's `default-name-compile-grant` | #742 `bfead6798` | **Activated, with finding F1** |
| A2 | That grant's fixing merge | #747 `38360520d` | **Within the grant**; no finding |
| A3 | Grant activation: U8's `d2-check-step-grant` | #749 `beccbf134` | **Activated, with finding F1** |
| A4 | Charter-scope ballot applied (my ARMING row changed) | #746 `610413017` | **No ARMING read owed at this merge**; the limb it adds had no PR to read in the window |
| A5 | Instrument-path PR | #740 `031d7928f` | **Within the three reads**; no finding |
| A6 | The other merges against the trigger set | #737 to #745 | **None fired** |

---

## Live measurements (mine, at `beccbf134`)

- `bash tools/agent-generator/verify-gate-registration.sh` (with the token in the environment): `PASS: all 21 required contexts present, count-asserted (N=21 recorded in this script)`. Branch protection on `main` lists 21 contexts (`gh api repos/3fn/DesignerPunk/branches/main/protection/required_status_checks`).
- `npm run audit:coverage-map`: `PASS (surfaces PASS · lanes PASS)`; 496 surfaces.
- `npm run check:completion-criteria-parity`: `parents evaluated 47, pass 47, exempt 0, fail 0; emissions 0; reds 0`. The row is live, not dormant.
- `npx tsx scripts/ci/check-in-lane-guards.ts`: `52 registered in-lane guards; 52 selected`.
- `git diff 71266589e HEAD -- tools/agent-generator/verify-gate-registration.sh` is empty: the required-check set did not change in this window.

---

## A1. Activation of `default-name-compile-grant` (#742, `bfead6798`)

Grant record at the activating merge: `.kiro/issues/2026-11-07-default-name-compile-grant.md` (owner Thurgood). Merged 2026-11-07T21:54:08Z; PR head `5a2fc2cd3`. Body read with `gh pr view 742 --json body`.

- **The list names no governance-law path**: it names one path, `.github/workflows/native-harness.yml`.
- **The list names every M1-excluded act it admits**: it admits none. Its "Excluded acts" block says so (no new job or context, no `EXPECTED_CONTEXTS` change, no edit to another job or existing step, no deleted line, no removing or weakening of a step, floor or assertion).
- **`**Deleted lines**:` block**: none, and none is owed: the record says the fixing PR's deletions for the file are 0.
- **The activating merge touched no CI path**: `git diff --name-only bfead6798^ bfead6798 -- .github` is empty.
- **The activating PR's ARMING line**: **absent**. The record says the activating PR's body "carries `**ARMING**: at this merge and at the fixing PR's merge`". The body has no such line. Its only mention is the prose sentence "Stacy's ARMING read fires at U7a's merge." A whole-line match for the rule 8 line finds 0 in the body. **F1.**
- **The body names the record and the path**: yes (the record's path; `native-harness.yml` in the same bullet).

**Result**: activated as declared, with F1.

## A2. Fixing merge of that grant (#747, `38360520d`)

Merged 2026-11-08T00:26:19Z; PR head `a16aa97fd`. The record's rule 5 outcome names head H = `d3b3c2d64`.

- **Diff against the list as it stood at `bfead6798`**: `git diff --name-only 38360520d^ 38360520d -- .github` is exactly `.github/workflows/native-harness.yml`, the one listed path.
- **`--numstat` deletions on CI paths: 0** (25 added, 0 deleted), so no `**Deleted lines**:` block was owed.
- **The admitted edits, read from `git show 38360520d:.github/workflows/native-harness.yml`**: one new step, `Default-name compile (harness/android/lane.ts --default-name)`, at lines 333 to 357 in `harness-android-tokens` (the job runs from line 229 to the line before `harness-android-components`), after "Save the Gradle cache" and directly before "Upload the lane output"; a comment above it. The step has no `if:`, `continue-on-error` or `working-directory:` key. No other job and no existing step changed (the diff is one 25-line hunk).
- **The step's floor**: it exits 1 when the script prints no `default-name:` line or exits non-zero, and writes `::error title=default-name::` on those paths and `::notice` on a pass.
- **The run at H**: run 42427309603, event `pull_request`, head `d3b3c2d64`, attempt 1, conclusion `success`. H is an ancestor of the merged head, and `git diff --stat d3b3c2d64 a16aa97fd` touches four files, none under `.github/**`, so the step is the same at both.
- **The step on the merged head**: the `harness-android-tokens` check run on `a16aa97fd` (id 128570708509) reads `success` and carries the annotation `default-name: PASS name=DesignerPunk abbreviation=HX probe-name=DesignerPunk tokens=succeeded probe=succeeded keyed=0 unrooted=0 unattributed=0 warnings=0 gen=3 provider read 5 of 5`, which is the criterion's floor (both compiles, 0 keyed, 0 `unrooted`, 0 `unattributed`, name `DesignerPunk`). All 28 check runs on the merged head read `success`.
- **Gate count**: `verify-gate-registration.sh` is untouched; the step adds no context.
- **Other paths in the PR**: `harness/android/lane.ts`, `scripts/harness/__tests__/native-harness-workflow.test.ts` and `probe-kotlin.test.ts`. None is on the instrument-path list (the six harness paths are `stability.ts`, `native-rules.ts` and their tests and fixtures).
- **The close**: the record carries the rule 5 outcome line and moved to `archive/` in this PR. Rule 11 excludes grants and calls one still open at its fixing merge a walk finding; this one is closed.
- **The PR body's ARMING line**: `**ARMING**: at the fixing PR's merge (the grant record's rule 5); …`. Rule 8 requires the line on the activating PR only; a fixing PR is not required to carry it. Not a finding.

**Result**: within the grant. No finding.

## A3. Activation of `d2-check-step-grant` (#749, `beccbf134`)

Grant record at the activating merge: `.kiro/issues/2026-11-07-d2-check-step-grant.md` (owner Thurgood; Ada's agreement line appended at `20a3474b5`). Merged 2026-11-08T00:26:38Z; PR head `cc9069288`.

- **The list names no governance-law path**: one path, `.github/workflows/native-harness.yml`.
- **The list names every M1-excluded act it admits**: it admits none, and its "Excluded acts" block lists them (no new job or context, no `EXPECTED_*` change, no edit to another job or existing step including the compile contexts' "Require harness-generate" steps, no deleted line, no removing or weakening of a step, floor or assertion).
- **`**Deleted lines**:` block**: none, none owed (the record says the fixing PR's deletions are 0).
- **Admitted edits as written**: one step in `harness-generate`, as the job's last step after "Upload the consumer root"; a comment; one added sentence in the file's header "Jobs:" paragraph with no existing line changed. All are additions.
- **The activating merge touched no CI path**: `git diff --name-only beccbf134^ beccbf134 -- .github tools scripts` is empty. It edits records and the spec only.
- **The tasks row no longer grants the file for Task 13**: the `native-harness.yml` mentions in `tasks.md` at `beccbf134` outside the amendment text sit in Task 5's and Task 19's rows and in Task 20's criteria; Task 13's row lists no `.github/**` path.
- **The activating PR's ARMING line**: **absent**. The body's sections give the authority, the grant and the review record; none carries `**ARMING**: at this merge and at the fixing PR's merge`. A whole-line match finds 0. The grant record states the PR "carries" it. **F1.**
- **The body names the record and the path**: yes.

**Result**: activated as declared, with F1. **The fixing read is not yet owed**: U8 has not merged. It will check the step's placement (last step of `harness-generate`, after "Upload the consumer root"), the header sentence as an addition only, deletions `0`, and the step's three-line and exit-code contract against `scripts/harness/d2-check.ts`.

## A4. #746 (`610413017`): the charter-scope ballot applied

My ARMING row now carries a P1c limb (a PR touching `.github/workflows/merge-hold.yml`, with its B1 to B5 query and a B6 judgment) and the instrument-path limb names six compile-harness paths. Merged 2026-11-08T00:08:52Z.

- **What the PR touches**: `canonical/agents/{stacy,thurgood}.md`, `.kiro/steering/Agent-Directory.md`, the generated prompts and attribution files, the operative sets and the profile signature and confirmation files, `.kiro/docs/ballots/{README.md,2026-09-27-ci-regime-standing-scope.md}`, three issue records and `canonical/generated.lock`. No `.github/**` path, no `tools/agent-generator/**`, no `scripts/**` path.
- **Limbs that read it**: none of mine. It is not a grant, a P1, P1b, P1c or instrument-path PR, and it does not change the required-check set (`verify-gate-registration.sh` untouched).
- **The edit-kind lines (the counting block's read, made here because the diff changed my own row)**: the body carries three `**Edit kind**:` lines, one each for `canonical/agents/thurgood.md`, `canonical/agents/stacy.md` and `.kiro/steering/Agent-Directory.md`, all `LAW` citing `.kiro/docs/ballots/2026-11-07-thurgood-charter-scope-harness-and-merge-hold.md`, whose first `**Status**:` line at `610413017` reads RATIFIED (Peter, 2026-11-07T22:30:08Z). Every changed file on a path the edit kinds cover has a line. I did not run `edit-kind-pointers.ts`; that is the claims pass's, not this record's.
- **The limb's first read**: no PR since has touched `merge-hold.yml`, so the P1c query (B1 to B5) has had no PR to run on. It is owed at the first such merge.

**Result**: no ARMING read owed at this merge. No finding.

## A5. #740 (`031d7928f`): an instrument-path PR

Paths on the instrument-path list: `scripts/completion-claims/untracked-guard.ts` (285 added, 0 deleted), `scripts/completion-claims/__tests__/untracked-guard.test.ts` (79/0), `scripts/completion-claims/__tests__/complete-task.untracked-guard.test.ts` (330/0). It also edits `.kiro/hooks/complete-task.sh` (65 added, 1 deleted), which is not an instrument path. Merged 2026-11-07T21:35:53Z; head `2de12d89f`.

- **Read 1, deletions `0` under the listed fixtures and assigned tests**: the two test files are new, so deletions are 0. No `__fixtures__/**` path changed.
- **Read 2, the body cites the test run**: "The new suites … pass 19/19 (re-run by the orchestrator)" and "`scripts/completion-claims` passes 257 (Thurgood)".
- **Read 3, `EXPECTED_CONTEXTS` unchanged**: `verify-gate-registration.sh` is not in the diff.
- **Edit kind**: the body says no governance path is touched; none is (`.kiro/hooks/complete-task.sh` is not on the covered list).
- **Not a new CI barrier**: the guard is a local refusal in `complete-task.sh`, so the coverage-map and parity reads above are the standing measurement, and neither moved.

**Result**: within the reads. No finding.

## A6. The other merges, against the trigger set

- **#737** (`534a5ff43`, tasks amendment 9): spec files only. Not a trigger.
- **#738** (`ee9996840`): `docs/consumer/INSTALL.md`, `governance/DesignerPunk-Integration-Guide.md`, `governance/platform-implementation-guidelines.md`, `canonical/agents/data.md` (derived output), issue records. No `.github/**` or instrument path. It touches governance paths, so it belongs in the claims pass's edit-kind read, not here.
- **#739** (`c71fb2452`, Task 12): component sources, two guard tests under `src/components/__tests__/`, `harness/expected/*.tsv` (60 and 9 lines removed) and issue records. No `.github/**`; the guard tests are not instrument paths and the two `.tsv` lists are harness expected-lists, not the compile-harness paths of the ballot. Not a trigger.
- **#741** (`e7f57c20b`) and **#743** (`894d87436`): spec files and issue records. Not triggers.
- **#744** (`f28a1fefd`) and **#745** (`a418cc0aa`): each adds one ballot and nothing else. A ratified ballot is not on the ARMING row's event list; its application PR is. #744's application is #746 (A4). **#745's application PR has not merged yet** (#746's body says it waits on the lock). When it merges, the grants rule changes with it, and I will read what the row then asks.

---

## Findings

None is a gate.

- **F1 (Medium): the activating PRs of both grants lack the ARMING line the rule and the records require.** *Promised*: `.kiro/issues/README.md` rule 8, "A `.github/**` grant's activating PR carries, in its own body, the line `**ARMING**: at this merge and at the fixing PR's merge`"; each grant record repeats it ("whose body carries …"). *Claimed*: #742's and #749's bodies, written by the same seat, carry no such line; #742 has one prose sentence about my read. *Shipped*: both grants were activated by Peter's merge; both reads were owed regardless, and neither is wrong for the missing line. The harm is that the line is the body-level signal that fires my read, and a read that relies on my own count of grant records is the SF-1 failure in a smaller form. Route: **Thurgood** (the author of both bodies and the grants' owner), as an explicit message. Peter is told because rule 8 is law.

The previous batch's F2 (a trailing full stop on #724's line) is the same line failing a different way. Two failure shapes in one window is a signal worth Thurgood's reading; I draw no further conclusion from it.

**Standards implications**: none. Rule 8 says what the line is; the finding is an execution miss, not a doc teaching the wrong thing.

## Method

- **Sample**: all of them. Six reads (A1 to A6), each decided from git except the per-merge CI facts and the PR bodies, which I took from the API, and the live branch-protection compare, which I ran. **Not re-verified**: the Android compile itself (I read the step's annotation, not the Gradle output; the toolchain is not in this environment) and the claim in the run record that `d3b3c2d64` was the head the record's author ran against (I read the run's `head_sha`, which agrees).
- **Not made here**: the claims pass's counting block (edit-kind lines for #738, the instrument-census read for #744 and #745's ballots, the delegate audit pointer for the signing acts in #746). Those belong to the claims pass that covers this window.

*Signed: Stacy, 2026-11-07.*
