# ARMING read of G-1's activation (#814): the push trigger on `native-harness.yml` (cracks ballot item 1, site 1.1)

**Event**: ARMING, the grant limb of my charter's row: an issue-row grant over a `.github/**` path, at its activating merge. No other limb fired at this merge (§ A2). The fixing PR's read falls due at its merge and is not made here.
**Reader**: Stacy · **Read date**: 2026-11-08 · **Tree read**: worktree `chore/stacy-arming-read-814`, cut from `origin/main` = `c4d926ae2`. Everything below was read from git at the commit it names, unless it says otherwise.
**Credentialed facts**: I read the PR body and metadata with `gh`, and ran `verify-gate-registration.sh`, using the credentials in the main checkout's `.env`. They were passed in the environment and never printed.
**Status**: a post-acceptance audit. **Never a gate**: no pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.

**Grant activation read**: .kiro/issues/2026-11-08-native-harness-push-trigger-grant.md @ e4ad34615

---

## Summary of verdicts

| # | Read | Merge | Verdict |
|---|---|---|---|
| A1 | Grant activation: `native-harness-push-trigger-grant` (G-1) | #814 `e4ad34615` | **Activated as declared**, with Low finding F1 |
| A2 | The other limbs, at this merge | #814 | **None fired** |

---

## A1. Activation of G-1 (#814, `e4ad34615`)

- **The grant record at the activating merge**: `.kiro/issues/2026-11-08-native-harness-push-trigger-grant.md`.
  - Owner: Thurgood.
  - Class: `P2 obligation (guard) · grant`.
  - Trigger: `path:.github/workflows/native-harness.yml`.
- **The merge**: 2026-11-08T21:15:10Z. PR head `b02c01449`, opened 2026-11-08T21:07:27Z.
- **The body**: I read it with `gh pr view 814 --json body`.

**The checks:**
- **The list names no governance-law path.** `**Grant paths**:` names one path, `.github/workflows/native-harness.yml`.
- **The grant pins its diff.** It carries the whole diff in a `diff` block and says the fixing PR applies "exactly the diff below … with `git apply` at its own base". The diff applies cleanly at `c4d926ae2`: `git apply --check` exits 0.
  - The file's blob is `3265ab24a` at `3987b4b06`, at `e4ad34615` and at `c4d926ae2`, which matches the diff's `index` line.
  - The diff has 11 deleted lines and 23 added lines.
- **The list names every M1-excluded act it admits.** It admits none, and it names each one it carries:
  - no new required context;
  - no `EXPECTED_CONTEXTS` change, no branch protection change, no repository setting;
  - no step, floor or assertion removed or weakened.

  It also excludes any `if:`, any `continue-on-error`, any cache key, step, runner or environment, and any job edit other than the `name:` lines.
- **The `**Deleted lines**:` block, each line read.** The block has 11 lines. I compared them, trailing whitespace removed, against the `-` lines of the pinned diff, and `diff` finds no difference. Each one, read as an M1-excluded act or not:
  - **Lines 1 and 2**, the old "Triggers" comment: a comment, and not an act. It is replaced by four comment lines that add `push` and the `(main)` measuring sentence.
  - **Line 3**, the job-name comment: a comment, and not an act. It is replaced by two lines that add the `(main)` suffix and the concurrency group.
  - **Lines 4 and 5**, "Not a required context …": a comment, and not an act. It was false at `bf4cd7677` (`[STACY R1]`; the ballot's site 1.1). The replacement says `harness-android-tokens` is in `EXPECTED_CONTEXTS`, and that this workflow is in `REQUIRED_WORKFLOWS`. I checked both at `c4d926ae2`:
    - `verify-gate-registration.sh` L95 lists `harness-android-tokens`, and lists no other harness context;
    - `.kiro/hooks/complete-task.sh` L132–140 lists `native-harness.yml`.
  - **Line 6**, the shadowing comment in `harness-generate`: a comment, and not an act.
  - **Lines 7 to 11**, the five job `name:` expressions: **not an act.** Each is re-added with one more arm, `github.event_name == 'push' && '<context> (main)'`, before the same last fallback.
    - On a `pull_request` run, both earlier arms are false, so the job reports under the same unsuffixed name it does today. That includes the required `harness-android-tokens`.
    - **Measured with the diff applied** in my worktree (then reverted):
      - `deriveJobContext` (`tools/agent-generator/coverage-map.ts` L727) returns `harness-generate`, `harness-ios-tokens`, `harness-ios-components`, `harness-android-tokens` and `harness-android-components` for the five new expressions, the same five contexts as before;
      - `npm run audit:coverage-map` prints `PASS (surfaces PASS · lanes PASS)` over 496 surfaces both before and after the diff.
- **What I do not decide here.** I do not read what the added lines do: the `on: push` arm, the concurrency group, and the comment text. That stays with clause 5's naming and Peter's merge, the row's known gap. One observation for the fixing-PR read and the push-run reader is in § A3.
- **The activating merge touched no CI path.** `git show --numstat e4ad34615` lists one file, the record: 161 lines added, 0 deleted. Under `.github`, nothing changed.
- **The body names the grant.** Its L8 names the record's path and says its merge activates the grant.
- **The activating PR's ARMING line is present, with a trailing full stop.** The body's L27 is `**ARMING**: at this merge and at the fixing PR's merge.`. I checked it byte by byte: it ends `.` then a newline. Rule 8 names the line without the stop. I read the line as present. See **F1**.
- **Gate count, live at `c4d926ae2`**: `verify-gate-registration.sh` prints `PASS: all 21 required contexts present, count-asserted (N=21 recorded in this script)`.

**Result**: activated as declared, with F1.

**What the fixing-PR read will check, at its merge:**
- its `.github/**` paths are a subset of `.github/workflows/native-harness.yml`;
- its CI diff is the pinned diff, that is `git apply` of the block at its base;
- its 11 deleted lines each match one block line as it stood at `e4ad34615`, and their count equals `--numstat`'s deletions;
- the five derived contexts are unchanged, `N=21` holds, and coverage-map passes;
- the record carries its rule 5 outcome and archive move.

## A2. The other limbs, at this merge

- **A new barrier arms, or the required-check set changes**: neither. The merge adds a record only.
- **P1, P1b, P1c, the instrument paths, the native-lane paths and `pending.json`**: none of them is touched.

## A3. One observation, unverified, for the fixing-PR read and the push-run reader

In a burst, the concurrency group replaces the pending push run with the newest one, and GitHub cancels the run it replaces.
- `stability.ts` (#812) lists a push run as red only when its job is finished with a FAIL verdict or a non-`success` conclusion.
- Whether a superseded run lists any job is unverified. If it does, its job concludes `cancelled`.
- If such a job is listed, every burst would put a false red in the `Push runs on main: … red:` line and in the reader's `gh run list --event push` query.

**What can settle it**: the first burst after the fixing PR's merge. A cancelled push run, `gh run view <id> --json jobs`, shows whether it lists jobs. This is not a finding. Thurgood owns `stability.ts` and the reader. I note it so the first burst is read for it.

---

## Findings

None of these is a gate.

- **F1 (Low): #814's ARMING line carries a trailing full stop. This is the fourth instance of the shape.**
  - *Promised*: rule 8's line, without a stop.
  - *Claimed*: the body carries it with a stop.
  - *Shipped*: the grant activated, and the read was owed regardless.
  - **#814 was opened at 21:07:27Z, after my record of the third instance merged** (#807, F1, merged 2026-11-08T20:42:52Z).
  - Route: **Thurgood**, as an explicit message. Whether a check should read the line is his to weigh, and I do not propose its text.

**Standards implications**: none. Rule 8 says what the line is, and the recurrence is an execution signal.

## Method

- **Sample**: everything, which is one merge and every read the grant limb names at activation.
  - The deleted-line comparison and the context derivation are mechanical. I ran them on the pinned diff and the tree, not on the record's prose.
  - I took the body and the PR metadata from the API.
- **Not re-verified**: none of the claims these reads rest on.
- **Not made here**: the fixing PR's read (owed at its merge), and the claims pass's counting block.

*Signed: Stacy, 2026-11-08.*
