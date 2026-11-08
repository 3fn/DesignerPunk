# ARMING read of #812: `stability.ts` reads push runs on `main` (cracks ballot item 1, site 1.2)

**Event**: ARMING, the instrument-path limb of my charter's row. `scripts/harness/stability.ts` and `scripts/harness/__tests__/stability.test.ts` are two of the compile-harness paths of ballot `2026-11-07-thurgood-charter-scope-harness-and-merge-hold` item 1. #812 changed both. No other limb fired at this merge (§ A2).
**Reader**: Stacy · **Read date**: 2026-11-08 · **Tree read**: worktree `chore/stacy-arming-read-812`, cut from `origin/main` = `3987b4b06` (#813). `scripts/harness/**` there is identical to `bee5f5345`. Everything below was read from git at the commit it names, unless it says otherwise.
**Credentialed facts**: I read the PR body and the head's check runs with `gh`, using the credentials in the main checkout's `.env`. They were passed in the environment and never printed.
**Status**: a post-acceptance audit. **Never a gate**: no pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.
**Why now**: the read fell due at the merge (2026-11-08T21:01:15Z). I named it as owed in my site 1.4 review of the same day, and the orchestrator asked for it.

---

## Summary of verdicts

| # | Read | Merge | Verdict |
|---|---|---|---|
| A1 | Instrument-path PR: `stability.ts` and its test | #812 `bee5f5345` | **Within the three reads; no finding** |
| A2 | The other limbs, at this merge | #812 | **None fired** |

---

## A1. #812 (`bee5f5345`)

- **The merge**: 2026-11-08T21:01:15Z. PR head `100f9b137`, branch `chore/cracks-item1-stability-push-runs`, author Thurgood.
- **The squash matches the head.** `git diff --stat 100f9b137 bee5f5345 -- scripts/harness` is empty.
- **The body**: I read it with `gh pr view 812 --json body`.
- **The diff**: `git show --numstat --no-renames bee5f5345` changes two files:
  - `scripts/harness/__tests__/stability.test.ts`: 57 added, 0 deleted;
  - `scripts/harness/stability.ts`: 20 added, 6 deleted.

**The three reads:**
- **Read 1: deletions `0` in the harness tests and `fixtures/stability/**`.**
  - `stability.test.ts` deletes 0 lines.
  - No file under `scripts/harness/__tests__/fixtures/stability/**` changed.
  - The PR's other file is source, `stability.ts`, which the deletions read does not cover. Its 6 deleted lines are one doc-comment line and five code lines, each replaced:
    - the `contextOf` doc comment;
    - the `contextOf` suffix regex, widened from ` (unit-branch)` to ` (unit-branch)` or ` (main)`;
    - `dispatchedRuns`, which now counts `workflow_dispatch` runs only, where before it was every non-PR run;
    - the "Rules applied" sentence, which gains one clause;
    - the "Runs recorded" line;
    - the runs table's `no (dispatched)` cell, which now prints the run's event.
  - **None of those lines touches what condition 2 or condition 3 reads.** Both still read `pull_request` runs (`pr`), and the run exclusion (`excluded`) is unchanged. I checked this against the hunk: neither identifier is in a changed line of `analyze`.
- **Read 2: the body cites the fixture test run.**
  - The body says: "`npx jest -c scripts/jest.config.js scripts/harness/__tests__/stability.test.ts`, 66/66".
  - **Re-run by me** on the tree above: `Tests: 66 passed, 66 total`.
  - **The falsification is red at the base, re-run by me.** I swapped in `git show bee5f5345^:scripts/harness/stability.ts` and ran the same suite. It fails to compile with `TS2339: Property 'pushRuns' does not exist on type 'ContextAnalysis'` at `stability.test.ts:637`, and the result is `Test Suites: 1 failed`. The body says the same. I restored the file afterwards.
  - The head's check runs: 29 concluded `success`, 0 otherwise (`commits/100f9b137…/check-runs`).
- **Read 3: `EXPECTED_CONTEXTS` is unchanged.** `tools/agent-generator/verify-gate-registration.sh` is not in the diff, and the PR adds no job or context.
- **The census line.** The ballot's item 1 census reads `not in scope — stability.ts and compare.ts — named in no register row's checks (git grep -n -F stability.ts governance/classification-map.md @ bf4cd7677 → 0 hits)`. I re-ran that command at `bf4cd7677`, `bee5f5345^` and `bee5f5345`, and each gives 0 hits. Because the line is `not in scope`, it carries no digests, so the census-digest read does not apply here.
- **The body's correction to the ballot.** Site 1.2 said that at the base a `(main)` job "would be dropped silently". The body says the job is not dropped. At the base, `contextOf` returns `null` for the job name, and the run is counted under `dispatchedRuns`.
  - I read both halves as true, each in its own case. A job named `<context> (main)` maps to no context at the base (`contextOf` returns `null`), so it is dropped from the per-context record, as the ballot said. A push run whose jobs carry the plain context name is counted under `dispatchedRuns`, because the base counts every non-PR run (`runs.length - pr.length`), as the body says.
  - Both cases lead to the same fix. I raise no finding: no criterion rests on that sentence.
- **Edit kind and straggler sweep**: the body says neither is owed. The PR touches no governance path, so that is right. Its straggler claim (0 hits for `stability.ts` in RELEASE-FLOW and the register) agrees with my census re-run.
- **ARMING line**: the body carries `**ARMING**: at this merge`. Rule 8 does not require it here, because this is not a grant.

**Result**: within the three reads. No finding.

## A2. The other limbs, at this merge

- **Grant**: none. The change is in Thurgood's standing scope (charter-scope ballot item 1), and no `.github/**` path is touched.
- **A new barrier arms, or the required-check set changes**: neither happened.
- **P1, P1b, P1c, the native-lane paths and `pending.json`**: none of them is touched.

---

## Findings

None.

**Standards implications**: none.

## Method

- **Sample**: everything, which is one merge and every read the instrument-path limb names for it.
  - I decided the diff, the deletions and the census count from git.
  - I took the body and the check runs from the API.
  - I re-ran the suite myself at the merged tree, and the falsification against the base's file.
- **Not re-verified**: none.
- **Not made here**: the claims pass's counting block for this PR, which is the orchestrator consult line on a non-trigger surface. That belongs to the claims pass covering this window.
- **Owed later, not here**: G-1's activation read at #814's merge, and its fixing PR's read (site 1.1) at that merge.

*Signed: Stacy, 2026-11-08.*
