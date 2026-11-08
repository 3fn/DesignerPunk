# ARMING reads owed after #771: ten merges against my trigger set

**Event**: ARMING, my charter's row as it stands on `main` (the row batch 5 read under).
- **Limbs that fired**: an instrument-path PR, at #777 (`scripts/harness/consumer.ts`, `consumer.test.ts`, `harness/pins.yaml`, with the native-lane read) and at #779 (`verify-signing-chain.ts`, six-roots § 3 item 4).
- **No `.github/**` grant was activated or closed.** #770 and #776 are issue-row grants over paths outside `.github/**`, so the grant limb does not reach them.
- **No barrier armed**, and no `.github/**` path or `.github/in-lane-guards.json` changed.
- **Also here**: the grant-fixing read of #774 against #770's amended list, which is outside my limb and is read here as an observation (F1).

**Reader**: Stacy · **Read date**: 2026-11-08 · **Tree**: worktree `chore/129-arming-reads-batch-6`, cut from `origin/main` = `3f739b07f`. Facts are from git at the merge commit named. PR bodies were read with `gh` using the main checkout's `.env` credentials (never printed).
**Status**: a post-acceptance audit. **Never a gate**: no pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.
**Window**: first-parent merges after #771 (`0200fadb6`, batch 5 itself), plus #770 (merged `b389f9664`, 05:03:26Z, before #771): #770, #772, #773, #774, #776, #775, #777, #778, #779. (#771 is batch 5 and is not read.)

| # | Merge | Limb | Verdict |
|---|---|---|---|
| 1 | #770 `b389f9664` | none (an amendment to the U5 issue-row grant; paths `token-index/primitives.yaml` and a test golden, not `.github/**`) | Its fixing PR is #774. **F1** |
| 2 | #772 `939931b15` | none (a delegate-audit record) | Not in scope |
| 3 | #773 `24d2ad891` | none (issue records; a close and an archive move) | Not in scope |
| 4 | #774 `7c143845f` | none by path (U5, Task 10; no instrument path, no `.github/**`) | Read as the fixing PR of #770. **F1** |
| 5 | #776 `3e0e00774` | none (an issue-row grant over `README.md`, not `.github/**`) | Its fixing PR is #777 |
| 6 | #775 `d74057506` | none (charters, overlays, lock; no instrument path) | Not in scope. Merge-before-head-H recorded below |
| 7 | #777 `3578cc5be` | instrument path (`consumer.ts`, `consumer.test.ts`, `harness/pins.yaml`); native-lane read | Reads 1 and 3 within; read 2 not in the body. **F2** |
| 8 | #778 `5ab584d3c` | none (records) | Not in scope |
| 9 | #779 `3f739b07f` | instrument path (`verify-signing-chain.ts` and its new test) | Three reads within |

## Live measurements (mine, at `3f739b07f`)

- `verify-gate-registration.sh`: `PASS: all 21 required contexts present, count-asserted (N=21 recorded in this script)`. `git diff --stat 0200fadb6^ origin/main -- .github tools/agent-generator/verify-gate-registration.sh` is empty: no CI path and no required context changed in the window.
- `npm run check:completion-criteria-parity`: `parents evaluated 51, pass 51, exempt 0, fail 0; emissions 0; reds 0`. That is two more than batch 5's 49. Tasks 10, 15 and 16 each merged a parent doc in the window, so I did not reconcile which two the tally adds.
- `npx tsx scripts/ci/check-in-lane-guards.ts`: `52 registered in-lane guards; 52 selected`.
- `npm run audit:coverage-map`: `PASS (surfaces PASS · lanes PASS)`, 496 surfaces.
- **The native-lane ballot's item 7 commands**: both print nothing (no Task 18 tick, no iOS `EXPECTED_CONTEXTS` entry). **No scope of that ballot is active**, so every edit to its paths in this window needed a spec row or a grant.

## 1. Grants: #776 (the README grant) and #770 (the U5 amendment)

Neither is over a `.github/**` path, so the ARMING grant limb (activation read, `**Grant activation read**:` line, fixing-PR subset and deleted-lines checks) does not fire. I read each against its fixing PR as an observation, in the shape batch 5 used for #760, #761 and #768.

- **#776 (`3e0e00774`) and its fixing PR #777.** The grant lists `README.md`, two regions only. #777's README diff (`git diff -U0 3578cc5be^1 3578cc5be -- README.md`) changes lines 133–137 (the numbered list under "**Use it in your project:**": 5 steps replaced by 4) and line 139 (the `[Install guide]` line replaced by the trust/enable sentence). Nothing else in README moves. **Within the grant.** #779 closed and archived the record under rule 5 (its outcome line names #777 and `3578cc5be`).
- **#770 (`b389f9664`) and its fixing PR #774.** The amended list is `token-index/primitives.yaml` (two `formula:` lines) and the golden `tests/fixtures/pre-u9-theme-css/DesignTokens.web.css`; `docs/tokens.css` is removed from it. #774's diff over those:
  - `token-index/primitives.yaml`: 2 added, 2 deleted. Within.
  - the golden: header rewritten, plus exactly two comment lines (`blur000`, `opacity100`). Within, as the outcome line says.
  - **`docs/tokens.css`: 22 added, 18 deleted. Not on the list.** See F1.

## 2. #777 (U10, Task 15)

Instrument paths touched: `scripts/harness/consumer.ts` (39 added, 3 deleted), `scripts/harness/__tests__/consumer.test.ts` (32 added, 1 deleted), `harness/pins.yaml` (7 added, 0 deleted; `consumer:` section only). Merged 2026-11-08T13:59:23Z, head `640683faf`. Also in the diff, outside my list: `scripts/pack-assert.ts` and its test (standing scope per the body), `scripts/__tests__/install-doc.test.ts`, `canonical/generated.lock` (Lina's refresh).

- **Read 1, deletions.** `consumer.test.ts` is on the listed tests, and it deletes one line: the `expect(config).toContain("output: './dist/tokens',\n  productTokens: …")` assertion, rewritten in place to expect the added `platforms: { ios: …, android: … }` block before `productTokens`. It is the same assertion on a longer string, so I read it as not weakened. The body does not name the file or the line, only "goes by this spec row". The escape asks the PR body to name the file and its spec amendment. **Not named at the line: F2.** No `fixtures/**` or self-test path is touched.
- **Read 2, the body cites the fixture test run: not in the body.** The Validation line names `npm test`, `test:consumer`, "scripts suite green incl. install-doc 81/81", `application-mcp-server`, `mcp-server`, `tsc`, parity and `pack-assert --pack`. "Scripts suite" is the lane that runs `consumer.test.ts`, but the body does not name it or its count. CI's `lane-functional-root` runs `test:scripts` and concluded success at the head. This is the same shape as batch 5's F1 on #763. **F2.**
- **Read 3.** `EXPECTED_CONTEXTS` is unchanged, and no `.github/**` path is touched.
- **Native-lane read.**
  - **Activation**: none (item 7's commands print nothing).
  - The edit rests on Task 15's row, merged at `B`: its Primary Artifacts list `scripts/harness/consumer.ts`, `scripts/harness/__tests__/consumer.test.ts` and `harness/pins.yaml` (the `consumer` section). The body names Task 15 and says these go "by this spec row (U12 not merged)". That selects the spec-row read, so **P1–P6 and C1–C6 are not owed**.
  - `harness/pins.yaml`: the diff adds `consumer.platforms` only. No `ios:` or `android:` key moves, so no `swift.version` change and no P7 line is owed. The body says "no lane file, `harness/expected/**` or other pins section changed", and the diff agrees.
  - No `harness/android/**` path is in the diff.
- **Not read here** (the claims pass's): the four Guide EXECUTION lines, the head-H hold (the body held the merge for the four harness contexts at head H; I did not trace its rows), and the `pack-assert` change.

## 3. #779 (`verify-signing-chain --print`)

Instrument paths: `tools/agent-generator/regrounding/verify-signing-chain.ts` (213 added, 2 deleted) and the new `tools/agent-generator/__tests__/verify-signing-chain.print.test.ts` (261 added, 0 deleted). Merged 2026-11-08T14:20:05Z, head `8be4aab38`. The body carries its own "ARMING disclosure (six-roots § 3 item 4)".

- **Read 1.** `git diff --numstat` shows 0 deletions under any `__fixtures__/**` and `tools/agent-generator/__tests__/fixtures/**` (neither is touched). The module's 2 deleted lines are the header's `TWO MODES` line and the usage string, each rewritten to name `--print`. The new test deletes nothing. No existing test is touched. **Within.**
- **Read 2.** The body cites the run: `test:agent-generator` 65 suites, 1857 tests, and the 9 new cases red at base, green at head. I did not re-run the suite.
- **Read 3.** `EXPECTED_CONTEXTS` is unchanged, and no `.github/**` path is touched.
- **Fixtures I specified.** PF1 (a, b) and PF2 (a, b) are the cases I worded, and PF2c and PF2d are the two I asked for at review. All five are in the body's list, with the no-print controls. I did not re-run them here.
- `--print` gives no verdict and has no `check_state`. `--ci` and `--audit` are unchanged by the diff (the diff adds `printUnit` and `printMode` and edits the usage text).
- **Census.** The body's Edit-kind paragraph names no governance path, and no ballot is applied by this PR, so no census digest is owed.
- Also in the PR: item 1's Trigger re-rule and outcome line in the four-fixes record, the template steps, and the #776 grant close. Those are the claims pass's.

## Findings

- **F1 (Medium): #774 changed `docs/tokens.css` (22 added, 18 deleted), which #770 removed from the grant, and the PR says it did not.**
  - *Promised*: #770's amended grant lists `token-index/primitives.yaml` and the golden only; `docs/tokens.css` "is removed from the list" and rides the next release's rebuild. Task 10's `tasks.md` row does not list it either (no match in `tasks.md`).
  - *Claimed*: the grant's outcome line ("`docs/tokens.css` was not changed"), #774's body ("`docs/tokens.css` is not changed and lags the generator from U8 until the next release rebuild") and `task-10-completion.md` L51.
  - *Shipped*: `git diff --numstat 7c143845f^1 7c143845f -- docs/tokens.css` is `22 18`. The changes are the `blur000` and `opacity100` comment lines, the four `--shadow-*-100` variables, and the `color-mix` shadow composites. That is the "U8 rebuild noise" #770 chose to keep out of a validators unit. `task-10-completion.md` L61 records that a `git add -A` after a pack-time build swept the file in at 10.1/10.2; the squash carries it, so the revert the amendment describes did not hold to the merge. The only commit touching it in the range is the squash, so I could not see which PR commit reinstated it.
  - Route: **Ada** (author and grant owner), by message. The file is generated and a release rebuild rewrites it, so the harm was a false statement in three places and an out-of-list edit.
  - **Resolved after this record's first cut.** Peter, 2026-11-08T14:25:31Z: "Leave it, and go for U12" (`.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-ruling-tokens-css-and-u12-go.md`). The change stands.
  - Ada's dated correction lines (`c658b6980`) are in the U5 grant record (`.kiro/issues/2026-11-08-u5-opacity100-formula-grant.md`, at the issues root, not archived) and in `completion/task-10-completion.md`; I byte-checked both files at this branch's head against her commit. Her confirmation that `docs/tokens.css` on `main` equals a fresh build is hers; I did not re-run the build.
  - The finding stands as promised/claimed/shipped; it is closed by the ruling and the corrections, not retracted. The grant's rule-5 close and archive are owed to the steward's walk.
- **F2 (Low): #777's body does not cite the run of `scripts/harness/__tests__/consumer.test.ts`, and does not name the one deleted assertion line.**
  - *Promised*: my ARMING row's instrument-path reads 1 and 2: the PR body names the deleted line's file and its spec amendment, and cites the fixture test run, for a PR touching `consumer.ts` and its test.
  - *Claimed*: a Validation line naming the "scripts suite", with no count and no file; "goes by this spec row" for the harness change.
  - *Shipped*: the suite ran green in CI (`lane-functional-root`). The one deleted line is a rewrite of an assertion to its longer form, not a removal. The body is where the read looks.
  - Route: **Ada** (author), by message. It is the second PR in a row to touch an item-5 path without the citation (batch 5's F1, #763), so the recurrence is the signal: the rate is 2 of 2 harness-path PRs in the two batches. Counted, not escalated.
  - **Cited after this record's first cut.** Ada's addendum (`c658b6980`, `completion/task-15-completion.md`, byte-checked at this head) names `npm test -- scripts/harness/__tests__/consumer.test.ts`, 50 pass, in #777's `lane-functional-root` (`test:scripts`) at head `640683faf`. I read that job's log: `PASS scripts/harness/__tests__/consumer.test.ts` is there; the count of 50 is not printed in the log lines I read, so it is Ada's and I did not confirm it. The body still lacks the citation; the finding stands.

## #775: merged before head H

- **What I record, as I judged it earlier**: #775 (U11's first cut) merged at 2026-11-08T13:33:30Z (`d74057506`) after Peter's ruling at 12:20:05Z, "(g) and yes to item 1", had superseded it. The body carried `**Hold for head H**` and the completion doc's CI-provenance row was still `⚠️ owed at head H` at the merge (`git show d74057506:…/task-16-completion.md`, L9).
- **The finding is the orchestrator's**: #775 stayed open and green after the ruling, with no "superseded" line and no hold marker. The ruling record's addendum says the same and sets the class fix (a PR a ruling supersedes is closed, or made a draft with a do-not-merge line, in the ruling's turn).
- **Peter's merge is an observation, not a finding.** Peter's own words, about 13:34Z: "My mistake, sorry: 775 merged." A merge never answers a ruling.
- **Peter re-ruled at 2026-11-08T13:52:10Z, "let's go (A′)"**: #775's 11 acts stand on `main`, Kenya's `c08bf6751` and `300855cdf` stand as script-checked under the #606 precedent, and #778 carries the erratum, the head-H rows (with `--audit --pr 775` kept at FAIL 2, never ✅) and the addendum. (A′) is the ratified disposition, so nothing here is open.
- **Not read here**: the head-H rows in #778 against the checks API, which the claims pass reads at U11's CLOSEOUT.

## Standards implications

none from the reads above. One for Thurgood's reading: read 2's home is the PR body, and two harness-path PRs in a row listed lanes without naming the instrument's suite; whether the ARMING row should name the lane (`test:scripts`) as acceptable citation is his to weigh.

## Method

- **Sample**: all nine merges decided from git at their merge commits, plus API reads of #770, #775, #776, #777 and #779 (bodies). Counted: 9 of 9 read; 2 instrument-path PRs; 0 `.github/**` grant activations or closures; 2 issue-row grants observed against their fixing PRs.
- **Not re-verified**: `test:agent-generator`'s 1857 for #779; `consumer.test.ts` locally (CI's `success` is what I read); PF1 and PF2 at head; the head-H rows of #775 and #777.
- **Not made here**: the claims pass's counting block (edit-kind lines for #775 and #777, delegated-tier lines, the instruments read), and J.

*Signed: Stacy, 2026-11-08.*
