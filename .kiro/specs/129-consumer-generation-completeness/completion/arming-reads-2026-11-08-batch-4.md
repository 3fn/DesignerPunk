# ARMING reads owed after #755: three merges against my trigger set

**Event**: ARMING. I read each merge against my charter's row as it stood at that merge. For #756 and #757 that is the row at `5f8a2c600`, which carries P1c and the six harness paths from #746. #758 changed the row itself. #757 merged at 02:01:24Z and #758 at 02:01:44Z, so the new row was not in force for #757. Two limbs fired. #756 is an instrument-path PR (`scripts/completion-claims/**`). #757 is the fixing PR of an active `.github/**` issue-row grant. #758 fired no limb. I read what my row now asks, as merged (§ 3).
**Reader**: Stacy · **Read date**: 2026-11-08 · **Tree**: worktree `chore/129-arming-reads-batch-4`, cut from `origin/main` = `261cd1a3c`. Facts come from git at the merge commit named. I read PR bodies, check runs and annotations with `gh` and the REST API, using the credentials in the main checkout's `.env` (never printed).
**Status**: a post-acceptance audit. **Never a gate**: no pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.
**Window**: first-parent merges after #755 (`5f8a2c600`): #756, #757 and #758.

| # | Merge | Limb | Verdict |
|---|---|---|---|
| 1 | #756 `0c20afa0c` | instrument path (`scripts/completion-claims/__tests__/complete-task.untracked-guard.test.ts`) | All three reads within. One note on the row's reach |
| 2 | #757 `1686fea35` | `.github/**` issue-row grant, at the fixing PR's merge (`.kiro/issues/2026-11-07-d2-check-step-grant.md`; activating merge #749 `beccbf134`) | Within: the paths are a subset of the list as it stood at #749, and 0 lines are deleted. The admitted edits were checked as well. **F1** |
| 3 | #758 `261cd1a3c` | none fired (it changes my row; `harness/README.md` is outside the path list by the ballot's F-5 note) | Row as merged equals the ballot's site 10. No scope active yet |

## Live measurements (mine, at `261cd1a3c`)

- `verify-gate-registration.sh`: `PASS: all 21 required contexts present, count-asserted (N=21 recorded in this script)`. `git diff 5f8a2c600 261cd1a3c -- tools/agent-generator/verify-gate-registration.sh .github/in-lane-guards.json .github/workflows/merge-hold.yml .github/workflows/lane-timing.yml` is empty. The only CI path the window changed is `.github/workflows/native-harness.yml` (#757). No required context was added, so no barrier armed and the required-check set is unchanged.
- `npm run check:completion-criteria-parity`: `parents evaluated 48, pass 48, exempt 0, fail 0; emissions 0; reds 0`. That is one more parent than batch 3's 47: Task 13, from #757.
- `npx tsx scripts/ci/check-in-lane-guards.ts`: `52 registered in-lane guards; 52 selected` (unchanged; #757 registered no guard).
- `npm run audit:coverage-map`: `PASS (surfaces PASS · lanes PASS)`, 496 surfaces, 495 guarded, 1 adjudicated blank (`canonical/generated.lock`), no stale adjudications. The same run at `5f8a2c600` reads the same counts. The new D2 step's shell is listed under `harness-generate (needs of a required job)`. This time I read the summary, not only the last line.
- **The activation commands** of the ballot's item 7, run at `261cd1a3c`:
  - `git log --reverse --format=%H -G'^- \[x\] 18\. ' origin/main -- .kiro/specs/129-consumer-generation-completeness/tasks.md | head -1`: prints nothing, so U12 has not merged.
  - The iOS command (`-G'^  "harness-ios-(tokens|components)"'` on `verify-gate-registration.sh`): prints nothing.
  - **Controls**, the same patterns on known events: `- \[x\] 12\. ` finds `c71fb2452` (#739), `- \[x\] 13\. ` finds `1686fea35` (#757), and the Android `EXPECTED_CONTEXTS` pattern finds `6572a601e` (#717).
  - **So no scope of the ballot is active.** An edit to an item's paths still needs the task-row or issue-row grant it needed before.

## 1. #756 (`complete-task.sh` trailers; a missing `--agent` is refused)

Three files: `.kiro/hooks/complete-task.sh` (10/7), its issue record (10/0), and `scripts/completion-claims/__tests__/complete-task.untracked-guard.test.ts` (55/1). The test file is under `scripts/completion-claims/**`, so the instrument-path limb fires **by path**, whatever the file tests. `.kiro/hooks/` is not on the list. Merged 2026-11-08T01:29:39Z, head `0ae3d1833`.
- **Read 1, deletions `0` in the listed tests and fixtures.** No file the deletions-zero read lists is in the diff, so the read holds. Its one deleted line is in a test the read does not list, and I read that line. `toMatch(/^Added-outside-list: /)` on the final paragraph becomes `toMatch(/^Agent: .*\nAdded-outside-list: /)`. The new assertion still requires the `Added-outside-list:` trailer and adds `Agent:` before it. It is narrower, not weaker. The body names the change ("`--add admits exactly` now expects `Agent:` first").
- **Read 2, the body cites the fixture test run.** It does: `complete-task.untracked-guard.test.ts: 20/20 pass. Against base 5f8a2c600, 7 fail`, with the orchestrator's re-run of 20/20 at `0ae3d1833`. I did not run it.
- **Read 3, `EXPECTED_CONTEXTS` unchanged.** Yes: `verify-gate-registration.sh` is not in the diff.
- **Edit kind**: the body says no governance path is touched. That holds: `.kiro/hooks/complete-task.sh` is not `.kiro/hooks/RELEASE-FLOW.md`. No grant was activated.
- **Note on the row's reach (no finding).** `scripts/completion-claims/**` is an instrument path, but its own `__tests__/` are not in the deletions-zero read. That read lists `__fixtures__/**`, the generator's checker tests, the steward-verb tests, `scripts/governance-examples/__tests__/*.test.ts` and the harness tests. So a deleted assertion in a completion-claims test passes read 1 without the spec-amendment line. Here the one deletion was a narrowing, so nothing was missed. The gap is in my row's text, which is law, so it goes under "Standards implications".

## 2. #757 (U8, Task 13; the fixing PR of the D2 step grant)

Grant record `.kiro/issues/2026-11-07-d2-check-step-grant.md`. Activating merge: #749, `beccbf134`, read in batch 2. Fixing merge: `1686fea35`, at 2026-11-08T02:01:24Z, head `bf56ed9dd`, base `5f8a2c600`.
- **Paths: a subset of the list as it stood at the activating merge.** `git show beccbf134:.kiro/issues/2026-11-07-d2-check-step-grant.md`, `## Grant`, lists one path: `.github/workflows/native-harness.yml`. `git diff --name-only 1686fea35^ 1686fea35 -- .github` gives the same single file. #754 changed the record's contract, not its list (batch 3 § 5).
- **Deletions.** `git diff --numstat 1686fea35^ 1686fea35 -- .github`: `37 0 .github/workflows/native-harness.yml`. The deleted lines of `git diff -U0 --no-renames 1686fea35^..1686fea35 -- .github`, headers excluded, number 0. That equals the numstat sum, so no `**Deleted lines**:` block is owed, and the record had none. **Within.**
- **The admitted edits** (beyond what the row decides; checked against the record's three admitted edits and its excluded acts):
  - **One new step**, the last in `harness-generate`, directly after "Upload the consumer root". The diff adds it after `retention-days: 7` of that upload step and before the iOS section. It has no `if:`, `continue-on-error` or `working-directory:` key; the words appear only in its comment. It runs `npx tsx scripts/harness/d2-check.ts --consumer "${RUNNER_TEMP}/harness-consumer"`, the record's command line verbatim.
  - **The annotations**, as the contract asks: a notice per `PASS` line, and an error per `FAIL` line and for the setup line. It writes `no d2-check line` when no stdout line begins `d2-check`, and on every run one exit annotation that is a notice on pass and an error on fail. It fails on a non-zero exit, a missing verdict line, or a `FAIL`. One reading difference, with no effect here: "none of these lines" is implemented as "no line beginning `d2-check`", which is a little looser than the contract's four line forms. Contract-conforming stdout carries nothing else, so the two agree.
  - **A comment above the step**: yes.
  - **One added header sentence** in the "Jobs:" paragraph ("The last step of harness-generate runs the D2 check …"), with no header line changed.
  - **Excluded acts**: no new job, no context, no change to `EXPECTED_CONTEXTS` (gate check above), no other job or step touched, nothing deleted.
- **Rule 5 outcome line**: present in the record at the merge, in Thurgood's commit `de41687ff` (01:36:50Z), before the merge. It names head H `8ffda2c1a`, 37 added and 0 deleted, and run `42434397927`. **Checked against the run.** The run (`pull_request`, `head_sha` `8ffda2c1aea9…`, success) has `harness-generate` and the four compile contexts all `success`. The `harness-generate` check run's annotations read `d2-check completeness: PASS count=23 the definition files and the index agree`, `d2-check ios: PASS count=33 …`, `d2-check android: PASS count=33 …` and `exit=0 lines=3/3`, all notices. That matches the outcome line.
  - The seven commits from H to the PR head `bf56ed9dd` change only docs: `task-13-completion.md`, `task-13-instruments.md`, the summary and two issue records. They touch no `.github/**` path and no script, so H's run covers the code that merged.
  - At `bf56ed9dd` all 28 check runs concluded `success`, the four harness contexts and `law-ratified` among them.
- **The body's ARMING line**: "`**ARMING**: at this merge and at the fixing PR's merge` is the record's own line; Stacy's read fires at this merge". It quotes the fixed text, so batch 3's F1 shape does not recur.
- **What batch 3 said I would read here**: the step is one added step in `harness-generate`, with 0 deletions (above). The grep test exists: `d2-check.test.ts` § "the design rule, as a grep (Peter's F-4 ruling)", case "the script has none of them". The ruled falsification cases are all present: a token missing on iOS, an extra one on Android, one dropped from both, an empty consumer in both states, the Swift backtick cases and the rename pair. Whether they are honest is a CLOSEOUT code read.
- **Which reads do not apply.** `scripts/harness/d2-check.ts` was not on my path list at this merge, and #758 adds it "once U8 adds it". This PR is U8, written under Task 13's grant to Ada, and the ballot's F-4 (b) read is for edits **after** U8's merge. So none of R-1 to R-4 is read here. From `261cd1a3c`, the next PR that touches `d2-check.ts` or its test fires both the instrument-path limb and the F-4 (b) read.
- **F1, the script header's pointer, not shipped.** See Findings.
- **Not read here** (the claims pass's): the `**Edit kind**:` EXECUTION line for `governance/DesignerPunk-Integration-Guide.md`; the deleted rows in `harness/expected/*.tsv` (16 lines across four lists, under the Task 13 row); and the body's "Validation: (not recorded — see completion doc)".

## 3. #758 (the native-lane ownership application: my row, as merged)

The diff touches four charters and Agent-Directory, the charter-scope ballot's ledger lines, the ballots README, operative sets, the consumer profile, generated outputs, the lock, and `harness/README.md` (9/9). Merged 2026-11-08T02:01:44Z, head `d77187e25`.
- **No limb fired.**
  - `harness/README.md` is not on the path list: the ballot's F-5 says it "stays out of Stacy's instrument-path list under either answer".
  - No `.github/**` path changed, no barrier armed, and the required-check set is unchanged.
  - The generated `.kiro/agents/{data,kenya,ada,thurgood}.json` now admit the producer paths in `allowedPaths`. They do so from this merge, before any activation commit exists. That is F-1's stated residual (frontmatter cannot carry an event). It is detected, not prevented, by the activation read below.
- **My row as merged** (`canonical/agents/stacy.md` L404, and its generated copies `.claude/agents/stacy.md` and `.kiro/agents/stacy-prompt.md`):
  - Site 10's parts 1 and 2 each occur once.
  - Part 3 occurs once on each side of the struck F-4 (a) bracket, with the F-4 (b) clause between.
  - There is no dated pointer.
  - The confirmation and signature sections I wrote on the r2 seat branch equal `main`'s byte for byte (`git diff` empty). They reached `main` through the squash, so `e3abde8f8` is not an ancestor of `main`, and that is expected.
- **What the row now asks of me.**
  - **The path list grows.** It adds `harness/android/**`, `harness/ios/**`, `scripts/harness/{probe-kotlin,parse-kotlin,probe-swift,parse-swift,compare,consumer}.ts`, `harness/pins.yaml`, and `scripts/harness/d2-check.ts`, which is now present since U8 merged.
  - **The deletions-zero read grows.** It adds those items' tests and `d2-check.test.ts`, the four fixture directories, and `harness/ios/selftest/**`.
  - **Every PR touching a path of that ballot gets a read.** It is read at the PR head with `B` its merge base. The read covers:
    - activation, by item 7's commands and `--is-ancestor`;
    - item 1's toml query for `harness/android/**`;
    - P7 for any `swift.version` change;
    - unless a merged row or an activated grant selects otherwise: P1–P6 for a pin move, C1–C6 for an item-5 path, the platform review split for `compare.ts`, and the F-4 (b) five-part read for `d2-check.ts` after U8;
    - for a defect fix, its named falsification case run against the file at `B`.
  - **Until U12 merges, no activation commit exists** (live measurement above). An edit to these paths that rests on the new scope is out of scope, and the read reports it as such.
- **One reach note (no finding).** `d2-check.ts` "once U8 adds it" is now live, because U8 merged first. The F-4 (b) read is keyed on "after U8's merge". So the first PR in my window that can fire it is a successor of `1686fea35`. Thurgood's outcome line names that same PR as the one that owes floor 3's base-versus-head comparison.

## Findings

- **F1 (Low): `scripts/harness/d2-check.ts`'s header does not name the ballot's F-4 block as the rules for later edits.**
  - *Promised*: ballot `2026-11-07-native-lane-ownership` § 8, "F-4 as ruled", "Where the application PR carries these rules", (iv). The text is in the ratified record at #748 (`dc5a8ad45`): "The script's own header, which Ada writes at U8 under Task 13, names this block as the rules for later edits … it puts the pointer where the next writer reads first."
  - *Claimed*: nothing specific. The PR body and completion doc do not state the header pointer.
  - *Shipped*: the header (L1–L28 at `1686fea35`) cites "Peter's F-4 ruling, 2026-11-08" for the design rule. It does not name `ballot 2026-11-07-native-lane-ownership § 8, F-4 as ruled` as the law for later edits, and it does not say that R-1 to R-4 bind them. A later writer who reads the header first finds the design rule, but not the floors (R-2 append-only, R-3 counts), the record-of-intent (R-4), or the `src/generators/**` bar.
  - Route: **Ada**, the writer of U8's header, by message. The fix is a comment-only edit to `d2-check.ts`. Now that U8 has merged, that edit itself needs a spec row or a per-fix grant that does not go to the `src/generators/**` holder, so it cannot be Ada's own grant. Whoever holds the fix's grant writes it; that choice is not mine.
  - This is a promised-versus-shipped item of the claims pass's kind. I found it at this read and route it now, a single instance under the remediation rule.

**Standards implications**:
- My row's instrument-path limb lists `scripts/completion-claims/**`, but its deletions-zero read does not reach `scripts/completion-claims/__tests__/**` (§ 1). If that is unintended, closing it is a LAW edit to my row. The words would be mine, by ballot, and whether to raise one is Peter's.
- "Fixing PR" reads at a grant's head H, while the merge is a later head. Here the commits after H were docs only, which I checked by hand. Nothing in the grant rule says what happens when code changes after H.

## Method

- **Sample**: all three merges. Each was decided from git at its merge commit, except PR bodies, check runs, annotations and merge times, which came from the API. Counted: 3 of 3 merges read; 1 instrument-path PR (#756); 1 grant fixing-PR (#757); 1 row change read as merged (#758).
- **Not re-verified**:
  - the `complete-task.untracked-guard.test.ts` 20/20 claim in #756's body (I did not run it);
  - the honesty of `d2-check.test.ts`'s falsification cases (present, not judged);
  - the Android and iOS compiles beyond the check conclusions and annotations above;
  - the 16 deleted `harness/expected` rows.
- **Not made here**: the claims pass's counting block, covering the edit-kind lines of #757 and #758, the census read, and the delegate-audit pointer for #758's signing acts, which include my own (`8560f299e`, `e3abde8f8`).

*Signed: Stacy, 2026-11-08.*
