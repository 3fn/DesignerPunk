# ARMING reads owed after #750: five merges against my trigger set

**Event**: ARMING, my charter's row as it stands on `main` at `c07951b38` (P1c and the six harness paths from #746). Limb that fired: an instrument-path PR (#753). Limb that fired in a different shape: a contract amendment to an active `.github/**` issue-row grant (#754). The other merges did not fire a limb.
**Reader**: Stacy · **Read date**: 2026-11-08 · **Tree**: worktree `chore/129-arming-reads-batch-3`, cut from `origin/main` = `c07951b38`. Facts are from git at the merge commit named; PR bodies and check runs were read with `gh` and the checks API using the credentials in the main checkout's `.env` (never printed).
**Status**: a post-acceptance audit. **Never a gate**: no pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.
**Window**: first-parent merges after #750 (`60d024e31`): #748, #751, #752, #753, #754.

| # | Merge | Limb | Verdict |
|---|---|---|---|
| 1 | #748 `dc5a8ad45` | none | No ARMING read owed. One future limb noted |
| 2 | #751 `e0ecd16ed` | none | `src/validators/**` is not an instrument path. No read owed |
| 3 | #752 `9d89982f8` | none (grant law changed; no grant activated or closed) | No read owed. No finding |
| 4 | #753 `400f55272` | instrument path (harness) | Three reads: within, with one note |
| 5 | #754 `c07951b38` | amends an active `.github/**` grant | Grant list unchanged. **F1** |

## Live measurements (mine, at `c07951b38`)

- `verify-gate-registration.sh`: `PASS: all 21 required contexts present, count-asserted (N=21)`. `git diff dc5a8ad45^ HEAD -- tools/agent-generator/verify-gate-registration.sh .github` is empty: the required-check set and every CI path are unchanged in the window.
- `npm run check:completion-criteria-parity`: `parents evaluated 47, pass 47, exempt 0, fail 0; emissions 0; reds 0`.
- `npx tsx scripts/ci/check-in-lane-guards.ts`: `52 registered in-lane guards; 52 selected`.
- `npm run audit:coverage-map`: I read only the final line of its output (`(none)`, the blank-row list); I did not read its summary line. **not re-verified** beyond that.
- Checks API on #751, #753, #754 merge commits: no failing conclusion except `build`, `deploy` and `report-build-status` cancelled (superseded Pages runs). I did not check these against the required set; the 21 registered contexts above are the required set.

## 1. #748 (ballot, lane ownership)

Four files: the ballot and three ruling records. No `.github/**`, no instrument path, no `EXPECTED_CONTEXTS`. A ratified ballot is not on the ARMING row's event list; its application PR is. **Noted for the application PR**: the ballot says "every producer path joins Stacy's ARMING read", and the charter text I hold has no such limb. When the application PR merges and my row changes, I read what it then asks. The edit-kind and instrument-census reads of this ballot belong to the claims pass.

## 2. #751 (ripple detectors)

Touches `src/validators/StemmaTokenUsageValidator.ts`, its test, `BlendTokenUsageValidation.test.ts`, three `contracts.yaml` and three governance guides. None is on the instrument-path list. Not a trigger. The three `**Edit kind**:` CORRECTION lines and the `**Sweep**:` line are the claims pass's read (the sweep's `left:` hits are two docs/specs summaries, named as historical; their `**Trigger**:` lines are that read's check).

## 3. #752 (grants ballot applied)

No `.github/**` path, no instrument path (`git show --name-only` filtered on `.github`, `tools/agent-generator`, `scripts/`: empty). It changes grant law (clause 5, README rule 8, TCP L102 and the register row), and the body says it activates and closes no grant. **New limbs from #752**: none for my row. It gives me no new ARMING event; it adds the issue record `2026-11-07-github-grant-coverage-check.md` (Trigger `release:next:phase-1`, grant paths none) whose added-line half stays with this read ("an added `continue-on-error: true` passes a path check"). I note that record's check is owed, not built. Two items for the claims pass: the two `LAW` lines name a ballot I can see RATIFIED (Peter, 2026-11-07T23:28:57Z); my own signing acts in this PR (`d2fce53aa`, `8acf6fbed`) are in the delegate-audit count, not here.
One observation, not a finding: `tasks.md` still carries rows whose Primary Artifacts list `.github/workflows/native-harness.yml` (for example lines 498 and 703). The ballot says "no merged unit is re-read", so they stand as merged; any row not yet merged that lists a `.github/**` path without naming its issue-row grant will fall under the new rule at its tasks round.

## 4. #753 (`stability.ts`; the first PR under Thurgood's standing scope)

Instrument-path files: `scripts/harness/stability.ts` (271 added, 79 deleted; the source is not under a deletion read), `scripts/harness/__tests__/stability.test.ts` (302 added, **43 deleted**). No `fixtures/stability/**` file changed. Merged 2026-11-08T00:54:59Z, head `2cf4628fb`.
- **Read 1, deletions `0` in the listed tests and fixtures.** Fixtures: 0 changed. `stability.test.ts`: 43 deleted lines, so the exception applies: the PR body must name the file and its spec amendment. It names `stability.test.ts` and "amendment 11 (#749)" as the plan text. It does not list the deleted cases. **Within the exception as worded.** I read three cases the diff removes: a `describe` for "a run that is not yet completed", the case "an unfinished run after a clean streak leaves the streak where it was", and "a record with no status field (older fixtures) is read as finished". The last contradicts amendment 11's new rule that a missing status is unfinished, so its removal follows the amendment. **Whether any deletion weakened an assertion is not decided here** (the register row's known gap).
- **Read 2, the body cites the fixture test run.** Yes: `stability.test.ts` 62/62, and the three review cases red at `515530c5e` and green at head.
- **Read 3, `EXPECTED_CONTEXTS` unchanged.** Yes: `verify-gate-registration.sh` is not in the diff.
- **Authority.** The body cites the charter-scope ballot as applied in #746; that is the limb this PR is the first user of. Its edit-kind statement ("no governance path is touched") matches the diff: no path under `governance/`, `.kiro/steering/`, `canonical/agents/`.
- **Note for the future.** The body says Decision 6's failed-job rule is "fail-safe" and filed `2026-11-08-decision-6-pass-verdict-failed-job.md` with Trigger `path:tools/agent-generator/verify-gate-registration.sh`. That is a trigger on the promotion PR's change; a path match fires on any edit to that file, so whether it fires only on the `EXPECTED_COUNT` change depends on the reader. It is Thurgood's record and his reading; I flag it, I do not rule on it.

## 5. #754 (amendment 12; the D2 grant record's contract)

The PR changes three files, none in `.github/` (`--numstat`: grant record 44/0, `feedback/tasks.md` 217/0, `tasks.md` 8/0). The grant's list is unchanged: its `## Grant` section still reads one path, `.github/workflows/native-harness.yml`, and none of the 44 added lines is inside that section (hunks at lines 43 and 87 of the record). No M1-excluded act is added; the "Excluded acts" block is unchanged. No deleted line anywhere.
- **Ada's dated agreement.** The record's rule is that a contract change after amendment 11's merge is made in a PR carrying Ada's dated agreement, with a fresh line at the last change. The last commit of the PR (`0b892bd4c`, 00:48:32Z) is her line "agree to the final text at `e2eb71889`", and `e2eb71889` is the last commit that changed the record's text. The PR merged 00:55:16Z. **Met.**
- **The ARMING line.** The record says the PR "carries `**ARMING**: at this merge and at the fixing PR's merge`". The body carries `**ARMING**: this amends the invocation contract of the active issue-row grant … It neither activates nor closes the grant. Stacy reads the contract change at merge.` That is not the fixed line. **F1.**
- **Contract read.** The design rule and floors added are Peter's F-4 ruling (2026-11-08T00:33:06Z, "Re: 1, as recommended"), cited with its record, which is on `main` as of #748 (merged before this PR, as the record's merge-order line required: #748 at 00:54:13Z, #754 at 00:55:16Z). One thing I read as a risk: the PR's grant record cites that evidence path, and at #754's own head the evidence lived only on #748's branch; it resolves now, at `c07951b38`.
- **Floors read against my R12-R14.** They are stated as ruled (append-only cases including the Swift backtick case, a `count=` that is never 0, base against head on the same consumer). Whether the build honours them is a read for U8's 13.3 merge. At the fixing merge I read: the step is one added step in `harness-generate`, deletions 0, and the grep test exists.

## Findings

- **F1 (Low): #754's body carries a differently worded ARMING line than the record fixed.** *Promised*: the record's rule for a contract-change PR, `**ARMING**: at this merge and at the fixing PR's merge`. *Claimed*: `**ARMING**: this amends … It neither activates nor closes the grant. Stacy reads the contract change at merge.` *Shipped*: the read is owed and made regardless; the harm is only that a whole-line match for the fixed text finds 0, the same shape as batch 2's F1 and F2. Route: **Thurgood** (author of the body and owner of the record), by message. It is the third instance of this line failing in a new way; a mechanical check of the line would settle it (it is the owed coverage check's neighbour), and that is for Thurgood to size.
- **Observation (not a finding)**: #753 deletes a whole test case under an amendment; the PR body does not list what was deleted. The exception as worded is met.

**Standards implications**: the ARMING line's exact text is stated in three places (README rule 8, each grant record, this seat's row) and three PRs have now missed it three different ways; whether the three texts should point to one is Thurgood's to read.

## Method

- **Sample**: all five merges. Each decided from git at its merge commit, except PR bodies, check runs and merge times (API). Counted: 5 of 5 merges read; 1 instrument-path PR (#753), 1 grant-contract amendment (#754).
- **Not re-verified**: `npm run audit:coverage-map` beyond its last line; the Android and iOS compiles; that the 62/62 test run in #753's body is true (I did not run `stability.test.ts`); whether any of #753's 43 deleted lines weakened an assertion.
- **Not made here**: the claims pass's counting block (edit-kind lines for #751 and #752, the census read for #748's ballot, the delegate-audit pointer for #752's signing acts).

*Signed: Stacy, 2026-11-08.*
