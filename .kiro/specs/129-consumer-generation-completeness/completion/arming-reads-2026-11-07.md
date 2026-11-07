# ARMING reads owed in Spec 129's window: grants, the required-check set, and an unlisted `.github/**` edit

**Event**: ARMING, four limbs of my charter's ARMING row: an issue-row (or tasks-row) grant over a `.github/**` path at its activating merge and at its fixing merge; the required-check set changing; a PR that touches `.github/in-lane-guards.json` (registry limb, read in its own home); a PR that touches an instrument path (read in its own home). This record holds the grant reads, the required-check-set reads and the one read no home covers (#732). The registry limb and the instrument-path limb each have a standing home, and the reads for this window are appended there (below, § "Where the other reads are").
**Reader**: Stacy · **Read date**: 2026-11-07 · **Tree read**: worktree `chore/129-arming-reads-batch`, cut from `origin/main` = `3610718aa` (#733). Everything below was read from git at the merge commit it names (`git show <m>:`, `git diff <m>^ <m>`), unless it says otherwise.
**Credentialed facts**: PR bodies, check runs and job logs were read by me with `gh` and the checks API, using the credentials in the main checkout's `.env` (passed in the environment, never printed). The live branch-protection compare was run by me.
**Status**: a post-acceptance audit. **Never a gate**: no pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.
**Why this record exists**: `claims-pass-midpoint.md` SF-1 listed what I owed in this window and under-counted it. The correction is appended to SF-1 (dated 2026-11-07). The reads below are the full set I found owing.

**Grant activation read**: .kiro/issues/2026-11-07-merge-hold-checks-build-grant.md @ 13a0ca730

---

## Summary of verdicts

| # | Read | Merge | Verdict |
|---|---|---|---|
| R1 | Grant activation: `merge-hold-checks-build-grant` | #724 `13a0ca730` | **Activated, with two findings** (F1 Medium, F2 Low) |
| R2 | That grant's fixing PR, the build | #727 `16d44a500` | **Within the grant**; Low finding F5 |
| R3 | That grant's fixing PR, the promotion (expiry) | #728 `4a8486389` | **Within the grant**; no finding |
| R4 | Grant fixing merge: the dispatch stub | #700 `88298fbf7` | **Within the grant**; no finding; the grant record is still at the issues root (F7) |
| R5 | Tasks-row grant over `native-harness.yml`, Task 5's | #707 `74d7566f5` | **Within the grant**; the quoted lines equal the deleted lines |
| R6 | Tasks-row grant over `native-harness.yml`, Task 19's | #713 `05beb0dfc` | **Within the grant's acts; the quoted block is short** (F4 Low) |
| R7 | Required-check set 19 → 20 | #717 `6572a601e` | **ARMED**; no finding |
| R8 | Required-check set 20 → 21 | #728 `4a8486389` | **ARMED**; no finding |
| R9 | An unlisted `.github/**` edit | #732 `cd340c59b` | **Not a weakening; no grant or standing scope covers it** (F3 Medium, routed to Peter) |

Findings, with routes, are in § "Findings". The registry reads and the instrument-path reads are in their homes.

---

## Live measurements (mine, at `3610718aa`)

- `bash tools/agent-generator/verify-gate-registration.sh`: `PASS: all 21 required contexts present, count-asserted (N=21 recorded in this script)`. Branch protection on `main` lists 21 required contexts (`gh api repos/3fn/DesignerPunk/branches/main/protection/required_status_checks`).
- `npm run audit:coverage-map`: `PASS (surfaces PASS · lanes PASS)`; 496 surfaces, 495 guarded, 1 blank (adjudicated: `canonical/generated.lock`).
- `npm run check:completion-criteria-parity`: `parents evaluated 45, pass 45, exempt 0, fail 0; emissions 0; reds 0`. The row is live, not dormant. The `completion-criteria-parity` check also reads `success` on the heads of #717 and #728.
- `npx tsx scripts/ci/check-in-lane-guards.ts`: `52 registered in-lane guards; 52 selected`.

These are at today's `main`, not at each merge. The per-merge CI facts are cited under each read from the checks API.

---

## R1. Activation of `merge-hold-checks-build-grant` (#724, `13a0ca730`)

**Grant record**: `.kiro/issues/2026-11-07-merge-hold-checks-build-grant.md` (owner Thurgood; archived since #729). **Activating merge**: #724, squash `13a0ca730664830d5da5e9dd4e48de3ac2c8cb9b`, merged 2026-11-07T18:23:44Z. PR head `6992a8195`. Body read with `gh pr view 724 --json body`.

- **The list names no governance-law path**: **it does**. `**Grant paths**` at `13a0ca730` reads `.github/workflows/merge-hold.yml`, `tools/agent-generator/verify-gate-registration.sh` and **`governance/classification-map.md`**. `governance/**` is on the standing carve-out's governance-law list (Task-Completion-Protocol § "The Merge Rule"), and README rule 8 says a grant is "never a governance-law path". **F1 below.**
- **The list names every M1-excluded act it admits**: yes. It names one, "a new required context, and `EXPECTED_COUNT` 20 → 21, for `law-ratified` only", and lists what is not admitted (`merge-hold` becoming required, any other `.github/**` path, `REQUIRED_WORKFLOWS`, any removal or weakening, any demotion).
- **`**Deleted lines**:` block**: none, and none is owed at activation. The record says the build PR creates a file and deletes no line on a CI path, and that the promotion PR quotes the lines it replaces. At the fixing merges I read the deletions from git (R2, R3).
- **The activating PR named the grant and carried the ARMING line**: the body names the record and its three paths. Its ARMING line reads `**ARMING**: at this merge and at the fixing PR's merge.` **With a trailing full stop**, so rule 8's line as written (no full stop) is not matched by a whole-line pattern. **F2 below.**
- **The activating merge touched no CI path**: `git show --numstat 13a0ca730` lists one file, the record, 44 added and 0 deleted.
- **The list I read at the fixing merges** is the block above as it stands at `13a0ca730`.

**Result**: activated as declared, with F1 and F2.

---

## R2. Fixing merge, the build (#727, `16d44a500`)

The grant holds on the build PR's branch and on the promotion PR's branch (R3). Merged 2026-11-07T18:53:44Z; head `3b8819d24`.

- **`.github/**` paths in the diff**: `.github/workflows/merge-hold.yml` (80 added, 0 deleted) and `.github/in-lane-guards.json` (6 added, 0 deleted). The workflow is on the list. The registry is **not** on the list: the record names it as outside the grant ("`.github/in-lane-guards.json` entries (P1b) … are within Thurgood's standing scope and are not granted here"). So the PR's `.github/**` set is not a subset of the list, and the record says why. The registry edit has its own read in `.kiro/issues/2026-10-20-in-lane-registry-arming-reads.md` (predicate `true`).
- **Other changed paths**: `scripts/completion-claims/**` (standing scope; instrument-path read in its home), `governance/classification-map.md` (on the list; 44 added, 0 deleted; the two rows the grant admits, `merge-hold-answer-cited` and `law-ratified-at-head`), `.kiro/issues/2026-11-07-merge-hold-promotion-reads.md` (28 added), and `canonical/generated.lock` (1/1, the derived lock the diff-guard regenerates; not on the list).
- **`--numstat` deletions on CI paths: 0.**
- **The workflow against the grant's admitted edit 1**: two jobs, `merge-hold` and `law-ratified`; `on: pull_request` to `main` with types `opened, synchronize, reopened, edited`; no `if:` and no `continue-on-error` in the file (`git show 16d44a500:.github/workflows/merge-hold.yml | grep -nE 'if:|continue-on-error'` finds only the header comment's sentence "No `if:` appears in this file"); both jobs `runs-on: ubuntu-24.04`. Neither context is in `EXPECTED_CONTEXTS` at this merge (the diff does not touch `verify-gate-registration.sh`). The admitted act, a new required context, did not happen in this PR.
- **Run**: the head's `lane-functional-root` and every other check read `success` on `3b8819d24`.
- **The throwaway PR**: #726 (closed, never merged) ran `law-ratified` red: workflow run 42400738704, jobs `law-ratified failure` and `merge-hold failure`, event `pull_request`, head `c5de2e547`. This is the grant's step 3.

**Result**: within the grant. **F5 (Low)**: the body gives the case count ("31 cases") and no test-run result line. I ran the test at today's `main`: `33 passed, 33 total`.

---

## R3. Fixing merge, the promotion; the grant's expiry (#728, `4a8486389`)

Merged 2026-11-07T19:00:43Z; head `42a96ded6`. The grant expires here.

- **Paths**: `tools/agent-generator/verify-gate-registration.sh` (on the list, 6 added, 1 deleted), `governance/classification-map.md` (on the list, 4 added, 3 deleted), `canonical/generated.lock` (1/1, not on the list; the derived lock). **No `.github/**` path changes.**
- **Deleted lines**, read from `git diff -U0`: `EXPECTED_COUNT=20`; and in the register, `check_state: proposed` and two comment lines about "Until then proposed". No step, floor or assertion is removed. The body's `**Deleted lines**:` sentence matches.
- **The admitted excluded act**: exactly the one named: `law-ratified` added to `EXPECTED_CONTEXTS`, `EXPECTED_COUNT` 20 → 21. No `merge-hold`, no demotion, no other context.
- **Run**: 28 check runs on the head, all `success`, including `law-ratified`, `merge-hold`, `harness-android-tokens` and `completion-criteria-parity`.

**Result**: within the grant. The required-check-set read for this PR is R8.

---

## R4. Fixing merge of the dispatch-stub grant (#700, `88298fbf7`)

Grant: `.kiro/issues/2026-11-06-native-harness-dispatch-stub-grant.md` (owner Thurgood). My activation read is `arming-read-stub-grant-activation.md` (activated at #698, `233e04bf1`); this is the second read it said was owed. Merged 2026-11-06T23:35:17Z.

- **Diff against the list**: `git diff --name-only 88298fbf7^ 88298fbf7 -- .github` is exactly `.github/workflows/native-harness.yml`, the list.
- **`--numstat` deletions on CI paths: 0** (26 added, 0 deleted).
- **The record's criterion**: `on:` has one key, `workflow_dispatch` (`git show 88298fbf7:.github/workflows/native-harness.yml`, lines 14 and 15); `grep -nE 'pull_request|push:|schedule'` finds no line in the file at this merge. The gate count is unchanged (the diff does not touch `verify-gate-registration.sh`; the body reports N=19).

**Result**: within the grant. **F7**: the grant record is still at the issues root, though its fixing PR merged. README rule 11 calls a grant still open at its fixing merge a walk finding. That is Thurgood's walk; I note it.

---

## R5. U1's PR, Task 5's tasks-row grant (#707, `74d7566f5`)

Task 5's "Grant limits" admit one act that README rule 8 excludes: replacing the stub's single job and step. U1's PR body quotes the deleted lines. Merged 2026-11-07T04:10:47Z.

- **Paths**: `.github/**` changes are exactly `.github/workflows/native-harness.yml` (424 added, 12 deleted). `verify-gate-registration.sh` is untouched, so `EXPECTED_CONTEXTS` is unchanged.
- **Deleted lines, read from git, not from the body**: `git diff -U0 --no-renames 74d7566f5^ 74d7566f5 -- .github` has 12 lines that begin `-`, and they are the stub's header comments, `native-harness-stub:`, its `name:`, its one step's `name:` and `run:`. The body's `**Deleted lines**:` block is 12 lines, and after trailing whitespace is removed the two are identical (`diff` prints nothing). The 12 equal the `--numstat` deletions.
- **The grant's admitted act, read**: the deleted lines are the stub's lines only. No other line is removed or weakened. The new workflow's triggers are `pull_request` and `workflow_dispatch`, so its jobs run on pull requests as non-required contexts until promotion (R7 promotes one).

**Result**: within the grant.

---

## R6. U3a's PR, Task 19's tasks-row grant (#713, `05beb0dfc`)

Task 19's "Grant limits" admit, on the two Android jobs only, changing the "Save the Gradle cache" step's `if:` and its comment, and extending the annotation step to write `harness-infra`. Merged 2026-11-07T15:25:22Z.

- **Paths**: `.github/**` changes are `.github/workflows/native-harness.yml` (20 added, 6 deleted) and `.github/in-lane-guards.json` (6 added, 0 deleted, the P1b entry; read in the registry home). The body says so and cites the grant.
- **Deleted lines, read from `git diff -U0`**: 6, three in each Android job: two comment lines and the `if:` line `always() && steps.gradle-cache.outputs.cache-hit != 'true' && hashFiles('harness-out/gradle.txt') != ''`, replaced by the same condition on `harness-out/resolved.ok`.
- **The body's `**Deleted lines**:` block quotes 3 lines**, with "(each job)". It is short by 3 against the 6 `--numstat` deletions. The README rule quotes every deleted line; the missing 3 are the second job's identical lines. **F4 (Low).** I read the 6 from git, and none is outside the grant's admitted acts.
- **Admitted acts**: the `if:` change narrows when the cache is saved (a build that never resolved its dependencies saves nothing). It removes no step, floor or assertion. The annotation step gains one `elif` branch for `infra.json`. No new job, step condition or required context; the diff does not touch `verify-gate-registration.sh`.
- **Run**: the `lane-functional-root` job on head `b99105b0d` reads `success`, and the `Named-guard selection floor` step in it reads `success`.

**Result**: within the grant's acts; F4 on the block.

---

## R7. Required-check set 19 → 20: `harness-android-tokens` (#717, `6572a601e`)

Merged 2026-11-07T16:12:33Z; head `ce1980df5`. Grant: `.kiro/issues/2026-11-07-promote-harness-android-tokens-grant.md` (#716; archived).

- **The change**: `tools/agent-generator/verify-gate-registration.sh`: `"harness-android-tokens"` added to `EXPECTED_CONTEXTS`; `EXPECTED_COUNT=19` → `20`; header comment added. Nothing else in the checker changes. The PR also edits `.kiro/hooks/complete-task.sh` (`REQUIRED_WORKFLOWS`, `native-harness.yml` added) and `scripts/harness/__tests__/compare.test.ts` (23 added, 0 deleted), which are not instrument paths.
- **The ARMED line**: the grant record carries `PASS: all 20 required contexts present, count-asserted (N=20 recorded in this script)` (`.kiro/issues/archive/2026-11-07-promote-harness-android-tokens-grant.md` line 65), pasted after Peter's branch-protection act.
- **Coverage-of-coverage and dormancy**: my live runs are above (both PASS, parity live). On #717's head, all 26 check runs read `success`, `completion-criteria-parity` and `harness-android-tokens` among them.
- **Instrument-path reads (the verify-gate-registration limb)**: no `__fixtures__/**`, generator test or other listed test file is touched; `EXPECTED_CONTEXTS` changes and the body names the change (`harness-android-tokens` added, 19 → 20).

**Result**: ARMED. No finding.

## R8. Required-check set 20 → 21: `law-ratified` (#728, `4a8486389`)

Merged 2026-11-07T19:00:43Z. Grant: R1 to R3.

- **The change**: `law-ratified` added to `EXPECTED_CONTEXTS`; `EXPECTED_COUNT=20` → `21`. Nothing else in the checker changes.
- **The ARMED line**: the grant record's Outcome section pastes `PASS: all 21 required contexts present, count-asserted (N=21 recorded in this script)`, "as relayed by the orchestrator". I re-measured it myself at `3610718aa` (above): the same line, 21 contexts on `main`.
- **Dormancy and coverage-of-coverage**: as in R7; on #728's head `completion-criteria-parity` reads `success`.
- **Instrument-path reads**: no test or fixture touched; `EXPECTED_CONTEXTS` change named in the body.

**Result**: ARMED. No finding.

---

## R9. #732 (`cd340c59b`): an edit to `.github/workflows/merge-hold.yml` after the grant expired

Not a P1, a P1b, or a grant PR, and the line I owe is a question for the read: what authorised the `.github/**` edit. Merged 2026-11-07T19:47:55Z; head `4d19b33b9`. Body read with `gh pr view 732 --json body`.

- **The diff**: `.github/workflows/merge-hold.yml`, 6 added and 1 deleted. The deleted line is a comment line, rewritten with its continuation (`# payload of its original event. `edited` fires when an author edits the body to add an answer; a commit that`). The added lines are two comment lines and, in each job, two `env:` entries (`BASE_SHA`, `BASE_REF`). **No step, `if:`, floor or assertion is removed or weakened**, and the run line is unchanged.
- **Grant and standing scope**: the grant expired at #728 (R3). Thurgood's standing CI scope is the `lane-timing.yml` test-script steps and `.github/in-lane-guards.json` entries; `merge-hold.yml` is neither. The squash message and the body name no grant.
- **Authority offered**: one line, "Peter approved the fix: "Yes, please" (2026-11-07)", with no time and no cited record. Peter merged the PR, and the merge is his act. I cannot read the time of the words, and the question they answered is not in the body.
- **Instrument-path reads** (the same merge touches `scripts/completion-claims/**`): `merge-hold.test.ts` 47 added, 0 deleted, so deletions under assigned tests are 0; the body cites the test run ("33/33, run by Thurgood and re-run by the orchestrator at `4d19b33b9`"), and I re-ran it at today's `main`: `33 passed, 33 total`; `EXPECTED_CONTEXTS` unchanged.
- **Run**: all 28 check runs on head `4d19b33b9` read `success`, `law-ratified`, `merge-hold` and `lane-functional-root` among them. `law-ratified` was already required at this merge (21 contexts from 2026-11-07T19:02:37Z).

**Result**: **F3 (Medium)**. This is an edit to the file that defines a required check, by a seat with no grant or standing scope over it, authorised by an undated line. It weakens nothing that I can read. It is not mine to rule on; it goes to Peter.

---

## Findings

Classification per the 112 taxonomy where one applies. None is a gate.

- **F1 (Medium): the grant list names a governance-law path.** *Promised*: README rule 8, "never a governance-law path". *Claimed*: the grant at `13a0ca730` lists `governance/classification-map.md`. *Shipped*: #727 and #728 edited that file (44 added; 4 added and 3 deleted) under `**Edit kind**: … EXECUTION (ballot … item 4)` lines, and Peter merged both. The authority for the edits is the ballot (item 4), not the grant, so the effect is nil today. The grant list is wrong as a list. Route: **Thurgood** (the grant's owner) as an explicit message; he may want the rule 8 sentence to say how a ballot-named register edit is granted. Peter is told because the carve-out is his.
- **F2 (Low): #724's ARMING line carries a trailing full stop.** Rule 8 and my charter name the line without one. Route: **Thurgood**, who wrote the record. The body's line is plainly the ARMING line, so I read it as present.
- **F3 (Medium): #732 edited `merge-hold.yml` with no grant, no standing scope, and an undated authority line.** Route: **Peter**, as an explicit message. What he decides is whether the file needs a standing scope or a one-line grant for fixes to the instrument Thurgood owns. I do not propose the text.
- **F4 (Low): #713's `**Deleted lines**:` block quotes 3 of 6 deleted lines.** Route: **Thurgood** (PRIMARY of U3a).
- **F5 (Low): #727's body cites a case count and no test-run result.** Route: **Thurgood**. I have the result (33/33 at today's `main`).
- **F6 (Medium, self): SF-1 under-counted what I owed.** It named five PRs; twelve PRs owe a read: the registry reads for #713 and #727; the 16.2.0 carry-over for #578, #595 and #609 (their `**Agent**:` lines were never read until now); and the grant reads for #724, #700, #707 and #713, which no list of mine named. Remedy: this record and the two homes. The cause (Gap 1 of `2026-10-29-claims-pass-record-homes-unnamed-arming-symptom-overlay.md`) stands until it is ruled.
- **F7 (Low): the stub-grant record is still at the issues root after its fixing PR merged (#700).** Route: **Thurgood** at his walk (rule 5, rule 11).

**Standards implications**: one, routed to Thurgood. The ARMING row's grant limb reads "an issue-row grant", and two of the grants in this window were **tasks-row grants** (Task 5's and Task 19's "Grant limits"). I read them by the same method, because their bodies carried the ARMING lines. Whether the row should name the tasks-row form is the row's owner's; I propose no text.

## Where the other reads are

- **Registry limb** (`#708`, `#713`, `#727`): appended to `.kiro/issues/2026-10-20-in-lane-registry-arming-reads.md`.
- **Instrument-path limb** (`#578`, `#595`, `#609`, `#717`, `#727`, `#728`, `#732`): appended to `.kiro/issues/2026-10-25-arming-read-class-option-fork.md`. R7, R8 and R9 above are the required-check-set and out-of-grant halves of #717, #728 and #732.
- **`merge-hold-promotion-reads`**: re-ruled in `.kiro/issues/2026-11-07-merge-hold-promotion-reads.md` (S-5).
- **SF-1**: corrected in `claims-pass-midpoint.md`.

## Method

- **Sample**: all of them. 9 reads (R1 to R9), each decided from git except the per-merge CI facts, which I took from the checks API, and the live branch-protection compare, which I ran. **Not re-verified**: the Android and iOS harness contexts' own results (outside these reads); the claim in #717's grant record that Peter's branch-protection act preceded the 20 line (I read the line, not the order).
- **Relayed, not mine**: the #728 ARMED line as pasted in the grant record (the orchestrator's run); I re-measured the same line today.

*Signed: Stacy, 2026-11-07.*
