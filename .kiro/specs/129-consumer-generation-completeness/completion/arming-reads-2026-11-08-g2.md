# ARMING reads of G-2, the `pr-records.yml` grant: its activating merge (#798) and its fixing merge (#803)

**Event**: ARMING, under my charter's row as it stands at `90b3a11cb`. The limb that fired is an issue-row grant over a `.github/**` path. It fired twice: at the grant's activating merge (#798) and at its fixing merge (#803). No other limb fired on these two merges (§ A3).
**Reader**: Stacy · **Read date**: 2026-11-08 · **Tree read**: worktree `chore/stacy-g2-arming-reads`, cut from `origin/main` = `90b3a11cb` (#806). Everything below was read from git at the merge commit it names, unless it says otherwise.
**Credentialed facts**: I read the PR bodies, PR metadata, run records and job logs with `gh`, using the credentials in the main checkout's `.env`. They were passed in the environment and never printed.
**Status**: a post-acceptance audit. **Never a gate**: no pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.
**Why now**: both reads were owed from the two merges, and neither had been written. On 2026-11-08, `git grep '^\*\*Grant activation read\*\*' origin/main` found no line for this grant. The grant record's own instructions (L118 of the archived file) were the only mention. I named the reads as owed in `[STACY R3]` on ballot `2026-11-08-closeout-cracks`, and the orchestrator asked me to do them.

**Grant activation read**: .kiro/issues/2026-11-08-fired-records-warn-workflow-grant.md @ 77958cbb6

(The path is the one the activating merge had, at the issues root. The record moved to `archive/` at #803, the way earlier batches cite an archived grant.)

---

## Summary of verdicts

| # | Read | Merge | Verdict |
|---|---|---|---|
| A1 | Grant activation: `fired-records-warn-workflow-grant` (G-2) | #798 `77958cbb6` | **Activated as declared**, with Low finding F1 |
| A2 | That grant's fixing merge | #803 `4704b4949` | **Within the grant**, with Low finding F2 |
| A3 | The other limbs, on these two merges | #798, #803 | **None fired** |

---

## Live measurements (mine, at `90b3a11cb`, a descendant of both merges)

- **Gate registration.** `bash tools/agent-generator/verify-gate-registration.sh`, with the token in the environment, prints: `PASS: all 21 required contexts present, count-asserted (N=21 recorded in this script)`.
- **Coverage map.** `npm run audit:coverage-map` prints `PASS (surfaces PASS · lanes PASS)` over 496 surfaces.
- **Required-check set.** `git diff --name-only 77958cbb6 4704b4949 -- tools/agent-generator/verify-gate-registration.sh .kiro/hooks/complete-task.sh` is empty, so neither the required-check set nor `REQUIRED_WORKFLOWS` changed across the two merges.

---

## A1. Activation of G-2 (#798, `77958cbb6`)

- **The grant record at the activating merge**: `.kiro/issues/2026-11-08-fired-records-warn-workflow-grant.md`, owner Thurgood, class `P2 obligation (guard) · grant`, Trigger `path:.github/workflows/pr-records.yml`.
- **The merge**: 2026-11-08T19:05:30Z, PR head `e44b3f53a`, branch `chore/fired-records-warn-grant`. I read the body with `gh pr view 798 --json body`.

**The checks:**
- **The list names no governance-law path.** `**Grant paths**:` names one path, `.github/workflows/pr-records.yml`. That path is not under `governance/**`, `.kiro/steering/**`, `.kiro/docs/ballots/**` or the agent prompts and configs.
- **The list names every M1-excluded act it admits.** It admits none.
  - Its "What it must never do" section carries Peter's words verbatim: no new required context, no `EXPECTED_CONTEXTS` change, no branch protection or repo setting.
  - It also carries the author's addition: no step, floor or assertion is removed or weakened.
  - It adds the job's own limits: it never fails a PR, never writes, has no other trigger, no `if:` and no `continue-on-error`.
- **The `**Deleted lines**:` block**: there is none, and none is owed. The record says the fixing PR adds one file and has 0 deletions on CI paths, so I had no block lines to read as M1-excluded acts or not.
- **The record pins the file's exact text.** It carries the workflow as a `yaml` block and says that a fixing PR that differs from it is out of list, unless a dated line added before that PR's merge names the change. I read the fixing merge against that block (A2).
- **The activating merge touched no CI path.** `git show --numstat 77958cbb6` lists one file, the record: 132 lines added, 0 deleted.
- **The body names the grant.** The record's path appears once in the body.
- **The activating PR's ARMING line is present, with a trailing full stop.** The body's L23 reads `**ARMING**: at this merge and at the fixing PR's merge.`. Rule 8, which I read at `77958cbb6`, names the line without a full stop, so a whole-line match fails. I read the line as present. See **F1**.

**Result**: activated as declared, with F1.

## A2. Fixing merge of G-2 (#803, `4704b4949`)

- **The merge**: 2026-11-08T19:40:26Z, PR head `0d62b341f`, branch `chore/fired-records-warn-check`.
- **The squash matches the head.** `git diff --stat 0d62b341f 4704b4949` over the five paths the PR touches is empty.

**The checks:**
- **The `.github/**` paths are a subset of the list as it stood at `77958cbb6`.** `git show --name-status 4704b4949` shows one `.github/**` path, `A .github/workflows/pr-records.yml`, which is exactly the one listed path.
- **Deletions on CI paths are 0.** `git show --numstat --no-renames 4704b4949` prints `39 0 .github/workflows/pr-records.yml`. No deleted lines were quoted, and none were owed.
- **The file is byte-identical to the grant's block.** I extracted the `yaml` block from `git show 77958cbb6:<the record>` and compared it with `git show 4704b4949:.github/workflows/pr-records.yml`:
  - `cmp` finds no difference;
  - both files have sha1 `b4968ed4856a051f052ec04cfb1c11db33a16e77`;
  - both are 39 lines.

  Between the two merges, no dated line in the record names a change. The record's only diff between them is the outcome section.
- **The admitted shape, read from the file**: `on: pull_request` only, `permissions: contents: read`, one job `fired-records` on `ubuntu-24.04`, and two steps (a checkout with `fetch-depth: 0`, then the `--pr` read). The read's only exit-code handling is `|| true`. There is no `if:` and no `continue-on-error`.
- **The PR body cites its path list.** Its `**Grants**:` line names the record, #798 and `77958cbb6`, and says the list is exactly `.github/workflows/pr-records.yml`. Its `.github/**` diff line gives the numstat.
- **The ARMING line**: present, with a trailing full stop and an added parenthesis. Rule 8 does not require the line on a fixing PR, so this is not a finding.
- **The close**: the record carries a rule 5 `## Outcome (2026-11-08)` section and moved to `archive/` in this PR (`R090`). Rule 11 excludes grants. Rule 5's "a grant archives at its fixing PR's merge" is met.
- **The job's own run at the merged head**: run 42514241136, event `pull_request`, head `0d62b341f`, conclusion `success`. Its log prints:
  ```
  closed-here	.kiro/issues/2026-11-08-fired-records-warn-workflow-grant.md	Thurgood	path:.github/workflows/pr-records.yml
  fired-records: 0 fire(s) here, 0 re-ruled here, 1 closed here, 0 already fired; PR #803, merge base 77958cbb6, head 0d62b341f
  ```
  This is what the outcome section predicted ("should list this record as `closed-here`"). The check run reports 0 annotations, which is consistent with no `fires-here` line.
- **Other paths in the PR**: `scripts/issues-owned.sh` (149 added, 0 deleted) and `scripts/__tests__/issues-owned.test.ts` (126 added, 0 deleted). Neither is on my instrument-path list. The ballot's header and `[STACY R1]` A-6 make the same point, so those changes are read by my cases and at RELEASE, not here.
- **The record's Trigger said the outcome line would carry the run URL and the count line. It does not.** The Trigger line, read at `77958cbb6`, says: "The outcome line gives the fixing PR's `.github/**` diff, its `--numstat` (one file added, 0 deletions), and its own `fired-records` run URL with the `fired-records:` count line". The outcome section gives the diff and the numstat. For the run, it says "Its run URL and `fired-records:` count line are in that PR's checks, because the run comes after this line is written". I supply both above. See **F2**.

**Result**: within the grant, with F2.

## A3. The other limbs, on these two merges

- **A new barrier arms, or the required-check set changes**: neither happened. `pr-records` is non-required and warn-only. It is in neither `EXPECTED_CONTEXTS` (the count stays 21) nor `REQUIRED_WORKFLOWS`.
- **P1, P1b, P1c**: no PR touched `lane-timing.yml`, `.github/in-lane-guards.json` or `merge-hold.yml`.
- **Instrument-path limb**: neither merge touched a listed path (A2).
- **`pending.json`**: not touched.
- **Census line**: neither PR ships a change that a ballot census line ruled on. Item 3's census line is `exempt (1)`, and the ballot is DRAFT.

---

## Findings

None of these is a gate.

- **F1 (Low): #798's ARMING line has a trailing full stop.**
  - *Promised*: rule 8's line, `**ARMING**: at this merge and at the fixing PR's merge`.
  - *Claimed*: the body carries the line with a full stop.
  - *Shipped*: the grant activated, and the read was owed whatever the line said.
  - **This is the third time the shape has appeared in this seat's activating bodies.** My batch of 2026-11-07 recorded #724 (F2 there, the same trailing full stop) and #742/#749 (F1 there, with no line at all). The line is the body-level signal that fires my read, and a whole-line matcher misses it in every one of these forms.
  - Route: **Thurgood**, who authored the body and owns the grant, as an explicit message. Whether a check should read the line is his to weigh. I do not propose its text.
- **F2 (Low): the outcome section does not carry the run URL and count line that the record's Trigger said it would.**
  - The outcome section defers them to the PR's checks.
  - The facts it would have carried are true (run 42514241136; `0 fire(s) here, … 1 closed here`), and I record them here. So the gap is in the record, not in the work.
  - Route: **Thurgood**, as an explicit message. No re-close is owed: the grant is archived, and rule 5 is met.

**Standards implications**: none. Rule 8 and rule 5 say what each line is. Both findings are execution misses, not docs teaching the wrong thing. F1's recurrence is the signal I would put in front of Thurgood's reading.

## Method

- **Sample**: all of it, which is two merges and every read the grant limb names at each.
  - I decided each check from git at the merge commit.
  - I took the PR bodies, metadata, run conclusion and job log from the API.
  - I ran the gate-registration and coverage-map measurements myself.
- **Not re-verified**: none. Every claim in the record and the PR bodies that these reads depend on was checked against git or a run log.
- **Not made here**: the claims pass's counting block for these PRs (edit-kind lines and the orchestrator consult line). That belongs to the claims pass that covers this window.

*Signed: Stacy, 2026-11-08.*
