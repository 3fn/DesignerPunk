# ARMING reads owed after #759: ten merges against my trigger set, and the link-4 re-reads

**Event**: ARMING, my charter's row as it stands on `main` since #758 (`261cd1a3c`). That row carries the native-lane producer paths, `scripts/harness/d2-check.ts` (live since U8), and the native-lane read.
- **Limbs that fired**: an instrument-path PR, at #762, #763 and #769.
  - At #762 and #763, the native-lane read fired too. At #762 that includes its F-4 (b) part for `d2-check.ts`.
- **No `.github/**` grant was activated or closed.** #760, #761 and #768 are issue-row grants over paths outside `.github/**`, so the grant limb does not reach them.
- **No barrier armed.**
- **Also here**: the 2026-10-23 link-4 ballot's § 5 step 9 re-read, and the fix-2 re-reads of #758 and #763, all on the fixed tool (§ 4).

**Reader**: Stacy · **Read date**: 2026-11-08 · **Tree**: worktree `chore/129-arming-reads-batch-5`, cut from `origin/main` = `2d9944ba9`. Facts are from git at the merge commit named. PR bodies, check runs and head refs were read with `gh` and the REST API, using the main checkout's `.env` credentials (never printed).
**Status**: a post-acceptance audit. **Never a gate**: no pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.
**Window**: first-parent merges after #759 (`6a56443f8`): #760, #761, #762, #764, #763, #765, #766, #767, #769, #768.

| # | Merge | Limb | Verdict |
|---|---|---|---|
| 1 | #760 `4f582ceca` | none (an issue-row grant over `scripts/harness/d2-check.ts`, not `.github/**`) | Activates the grant #762 uses |
| 2 | #761 `b400c3c7c` | none (a grant over `README.md` and `install-doc.test.ts`) | Its fixing PR is #763 |
| 3 | #762 `1a83a50be` | instrument path (`d2-check.ts`); native-lane read with F-4 (b) | Within. **Batch 4's F1 is remedied** |
| 4 | #764 `ac4f44687` | none (#761's outcome line) | — |
| 5 | #763 `c2b844152` | instrument path (`scripts/harness/consumer.ts`, `consumer.test.ts`); native-lane read | Reads 1 and 3 within; read 2 not in the body. **F1** |
| 6 | #765 `88678548a` | none (docs) | — |
| 7 | #766 `95b0730a6` | none (an inbound and an issue line) | — |
| 8 | #767 `e6c74e3d6` | none (a 131 inbound) | — |
| 9 | #769 `e7d82c377` | instrument path (`verify-signing-chain.ts` and its audit test) | Three reads within; census reproduced. **F2** |
| 10 | #768 `2d9944ba9` | none (a grant over `token-index/primitives.yaml`, `docs/tokens.css` and a test fixture) | Its fixing PR (U5) touches no instrument path, so it owes no read then either |

## Live measurements (mine, at `2d9944ba9`)

- `verify-gate-registration.sh`: `PASS: all 21 required contexts present, count-asserted (N=21 recorded in this script)`. `git diff --stat 6a56443f8 HEAD -- .github tools/agent-generator/verify-gate-registration.sh` is empty: no CI path and no required context changed in the window.
- `npm run check:completion-criteria-parity`: `parents evaluated 49, pass 49, exempt 0, fail 0; emissions 0; reds 0`. That is one more parent than batch 4's 48: Task 14, from #763.
- `npx tsx scripts/ci/check-in-lane-guards.ts`: `52 registered in-lane guards; 52 selected`.
- `npm run audit:coverage-map`: `PASS (surfaces PASS · lanes PASS)`, 496 surfaces, 495 guarded, 1 adjudicated blank (`canonical/generated.lock`).
- **The native-lane ballot's item 7 commands**: both print nothing (no Task 18 tick, no iOS `EXPECTED_CONTEXTS` entry). **No scope of that ballot is active**, so every edit to its paths in this window needed a spec row or a grant, and each had one (below).

## 1. #762 (the `d2-check.ts` header; the fixing PR of #760's grant)

One code file: `scripts/harness/d2-check.ts`, 8 added and 0 deleted (plus the grant record's archive move). Merged 2026-11-08T03:08:49Z, head `6ba779a21`. Both commits carry `Agent: Thurgood`.
- **Instrument-path reads**:
  - **(1)** No listed test or fixture is touched: `d2-check.test.ts` is unchanged.
  - **(2)** The body cites the run: `d2-check.test.ts` 27/27, grep case included. **Re-verified**: I ran `npx jest --config scripts/jest.config.js --roots '<rootDir>/harness' -- d2-check` at `2d9944ba9` and got 27/27. `d2-check.ts` and its test are byte-identical from `1a83a50be` to `2d9944ba9`.
  - **(3)** `EXPECTED_CONTEXTS` is unchanged.
- **Native-lane read**:
  - **Activation**: none yet. The edit rests on #760's grant, activated before the merge and cited in the body, which selects the read and widens nothing.
  - **F-4 (b), for an edit after U8's merge**:
    - the cited grant is present at the head;
    - the writer, Thurgood, is not the `src/generators/**` holder of any unit here;
    - R-1's case is present and passing (27/27, re-run);
    - R-2's deletions in `d2-check.test.ts` are 0;
    - R-3 is not owed, because the change is comment-only by item 4's definition. Checked: `git diff -U0` over the file gives 0 added or removed lines that are neither blank nor start with `//`, `/*`, `*` or `*/`.
  - **The departure** (the literal `src/generators/**` replaced by "the generator sources … (the ballot names the glob)", because R-1's grep bans the string) is disclosed in the body and the outcome line. I read it as keeping the meaning.
- **Batch 4's F1 is remedied.** The header now names "ballot 2026-11-07-native-lane-ownership § 8, "F-4 as ruled" (the law home …)", lists R-1 to R-4, and says the file has no standing holder. That matches § 8's (iv).

## 2. #763 (U9, Task 14)

The instrument paths touched are `scripts/harness/consumer.ts` (53 added, 8 deleted; source, not under the deletions read) and `scripts/harness/__tests__/consumer.test.ts` (55 added, **0 deleted**). Merged 2026-11-08T03:57:47Z, head `b5b9f4ba2`. The harness commits carry `Agent: Ada`.
- **Read 1**: within. The test deletes nothing, and no listed fixture directory or self-test is touched.
- **Read 2, the body cites the fixture test run: not in the body.** Its Validation line names `npm test`, `tsc`, diff-guard, signing-chain `--ci`, `test:agent-generator`, application-mcp-server, `test:consumer`, `install-doc.test.ts` and completion-criteria-parity. None of those runs `scripts/harness/__tests__/consumer.test.ts`: the root `npm test` selects no `scripts/harness` suite, as #762's body says, and `test:scripts` is not named.
  - The completion doc does name the case: `consumer.test.ts` › 'carries an entry in the { light, dark } form as mode "both" with pair: true' passes.
  - At the head all 28 check runs concluded `success`, `lane-functional-root` among them, which runs `test:scripts`.
  - **The evidence exists, but not where the read looks. F1.**
- **Read 3**: `EXPECTED_CONTEXTS` is unchanged.
- **Native-lane read**:
  - **Activation**: none. The edit rests on Task 14's row, merged at `B`, whose Primary Artifacts list both files (`tasks.md` at `1a83a50be`, Task 14's **Primary Artifacts**), and the body names Task 14.
  - That selects the spec-row read, so **C1–C6 are not owed**. This is the row's "unless a `tasks.md` row merged at `B` … lists the path and the PR body cites it". I read naming the task, with its completion docs, as citing the row.
  - No `harness/android/**` path, `swift.version` or `harness/pins.yaml` change is in the diff.
- **Not read here** (the claims pass's):
  - the four `**Edit kind**:` EXECUTION lines, including `canonical/agents/sparky.md` ("Sparky's draft, committed by Ada, F12′");
  - the three "Added outside the list" paths;
  - the head-H hold: rows 6, 22 and 28 landed after the merge, in #765. #764's grant outcome line landed before it, at 03:42:48Z.

## 3. #769 (the link-4 ballot applied, with the dedupe fix)

The instrument paths touched are `tools/agent-generator/regrounding/verify-signing-chain.ts` (224 added, 26 deleted) and `tools/agent-generator/__tests__/verify-signing-chain.audit.test.ts` (427 added, **3 deleted**). Merged 2026-11-08T04:46:43Z, head `fbb5f7cdc`, base `e6c74e3d6`.
- **Read 1**: `git diff --numstat` shows 0 under `__fixtures__/**` and `tools/agent-generator/__tests__/fixtures/**`.
  - The audit test is assigned to the checker by the stem rule, and it deletes 3 lines: `    subagents: {`, `    },` and `  return buildStore({ session: SG, main: [...main, ...mainExtra], subagents });`. They are the two store builders rewritten to call `withMetaSibling`, which is option (c), the fixture specifier's change. No test case is removed.
  - The body's "ARMING disclosure" names the file and the change, and its spec amendment is the ratified 2026-10-23 ballot plus Peter's (A). **Within.**
- **Read 2**: the body cites the run, `test:agent-generator` 64 suites and 1848 tests. It also cites the red-at-base sets:
  - 16 ballot fixtures red at `origin/main`;
  - 8 of my 13 dedupe fixtures red one commit before the dedupe, and all 13 green at `eaf49d8c4`.
  I did not re-run the suite.
- **Read 3**: `EXPECTED_CONTEXTS` is unchanged, and no `.github/**` path is touched.
- **Census, the ballot's § 5 step 8.** I ran `verify-signing-chain.ts --census-routed --at <sha>` with the merged tool at the base `e6c74e3d6` and at `e7d82c377`. Both outputs digest to sha256 prefix `4b98ee49811c3955`, with `1122 rows; 424 routed; 0 unsigned-routed; errors 0`. That equals the body's value. The ballot's census lines are `not in scope`, so no path-list digest read is owed.
- **The register.** `signing-act-consistency`'s `--audit` scope stays `check_state: none` and `checks: []`. The `--ci` scope stays `armed`. The diff adds a history line and rewrites the LOOKUP RULE comment, and no `check_state` line changes. No bite re-opens: the instrument the bite tested is `--ci`, which this PR does not change (my and Thurgood's reads, in the ruling record).
- **Thurgood's readings where the ballot is silent**, as disclosed:
  - the canary reads each store on its own;
  - candidates from an unrecognized store are left out;
  - a store holding only main-session transcripts reads as before;
  - the brief's heredoc `-q` form is unchanged.
  These are readings, not findings.
  - The per-store reading is the one I leaned to. In my consult I also named its fork: a stale sibling store prints a Peter line on every run, against masking. The body says "settled by the coordinator", and Peter's ruling record does not mention it. All 17 stores have a meta for every subagent transcript today, so the reading changes no verdict now. **For Peter's awareness, not a finding.**
- **F2**: see Findings.

## 4. The step 9 re-read and the fix-2 re-reads, on the fixed tool

- **The command**: `npx tsx tools/agent-generator/regrounding/verify-signing-chain.ts --audit --pr <N> --exclude-signer stacy`. It ran at `2d9944ba9`, whose `tools/agent-generator/` equals `e7d82c377`'s (`git diff` empty), with the default 17 stores. These are acts I did not sign. My own acts are withheld by the filter, as § 5.3 requires.
- **#445** (step 9; appended to `.kiro/issues/2026-10-23-audit-link4-rejects-sha-alone-commit-line.md` beside its § 3, because no RELEASE record carries `record absent 20`): `15 of 20 act(s) selected; 5 withheld`, then `15 act(s) — anchored 15 · unanchored 0 · record absent 0 · FAIL 0 · anomaly 0`. The acts are Ada `1ddac1d2` ×2, Data `ea0bfe29` ×4, Kenya `314e6a01` ×4, Leonardo `fc6ae901` ×2, Lina `bd19189e` ×1 and Sparky `81e4f9c7` ×2, all anchored. Under the old § 4.3 the same acts read `record absent 20`.
- **#758**: `25 of 40 selected; 15 withheld`, then `anchored 5 · record absent 19 · FAIL 1 · anomaly 0`.
  - **anchored**: Ada `1847d953`, Ada `76a38f3a` (`#in-scope`), Data `82907ca2` (`#in-scope`), Kenya `ff1541c9`, Kenya `c4333e48`.
  - **`record absent 7`, "the row renders nothing"**: the 19 `frontmatter:writeScope[...]` rows, 3 Ada, 8 Data and 8 Kenya.
  - **`FAIL 7`**: Data `d85aaa85` `canonical/operative-sets/data.yaml#in-scope`, "no tool result contains the row's rendered line "- Android screen implementation using Jetpack Compose"", widening under § 5.4. This is the false-verdicts record's cause 3, the `- ` list marker the operative-set `text:` lacks. That is fix 3, still open in Spec 131's intake. So it is an instrument artifact, not a seat finding. Under the rule the widening still sends Data's 10 acts in #758 into J.
- **#763**: `1 of 1 selected`, anchored 1 (Sparky `164c6d43`, `os/sparky.yaml#web-theming`). It was `anomaly 4` before the fix.
- **Checked against #769's before/after tables**: every non-Stacy verdict in my runs equals the table's "after" column, 25 of 25 rows for #758 and 1 of 1 for #763. #769 has no #445 table. **Agreement, independently re-run.**
- **The withheld Stacy-signed acts** are the § 5.3 delegate's, never mine:
  - 5 in #445, all rows of `4c0f6977b`;
  - 15 in #758, 6 at `8560f299e` and 9 at `e3abde8f8`;
  - none in #763.
  - **The delegate seat is Leonardo**: the rotation is Ada → Lina → Leonardo, and the last walk's delegate was Lina, in `delegate-audit-release-16.2.0-lina.md`. The commands are `--audit --pr 445 --signer stacy` for step 9, and the same for #758. The file is `delegate-audit-link4-reread-leonardo.md`, beside the link-4 record.
- **Step 10**: the link-4 record closes at the re-read, and that is both lines, mine and the delegate's. It does not close in this PR. The owner's rule-5 outcome line, naming both re-read commits, and the archive move follow the delegate's file.
- **Fix 2's outcome line** in `2026-10-26-signing-chain-audit-false-verdicts.md` is the owner's. My dated re-read line is appended there.

## Findings

- **F1 (Low): #763's body does not cite the run of `scripts/harness/__tests__/consumer.test.ts`.**
  - *Promised*: my ARMING row's instrument-path read 2, "the PR body cites the fixture test run", for a PR touching `scripts/harness/consumer.ts` (on the list since #758).
  - *Claimed*: a Validation line naming nine runs, none of which runs that suite.
  - *Shipped*: the suite ran green in CI (`lane-functional-root`, via `test:scripts`), and the completion doc names the passing case. The body is where the read looks.
  - Route: **Ada** (the PR's author), by message. It is the first PR to touch an item-5 path since #758 gave the read its reach, so the limb is new to the author.
- **F2 (Low): #769 carries no `**Straggler sweep**:` line, and it leaves a section false without a record.**
  - *Promised*: `.kiro/docs/ballots/README.md`, "Straggler sweep on an instrument PR" (RS-38). It applies because the PR changes `verify-signing-chain.ts`, which a register `checks` line names. It owes one line, `**Straggler sweep**: <command> — <n> hits`, where the command is `git grep -n -F verify-signing-chain.ts -- .kiro/hooks/RELEASE-FLOW.md governance canonical/agents canonical/profiles/consumer .kiro/steering`. Each section holding a hit is read whole, and "a section left false is filed under `.kiro/issues/README.md` rule 10".
  - *Claimed*: the body's "Straggler sweep (ballot step 11)" bullet. That is the ballot's own grep, a different sweep. The body also says the register row's `rationale` sentence "A format change reads loudly as record absent on every act" is now stale, "Flagged for the next register pass".
  - *Shipped*: the command gives 9 hits at `2d9944ba9`, among them `governance/classification-map.md` L1093–L1094 in the `signing-act-consistency` section. That is the same section whose rationale the body says is false. No `.kiro/issues/` record files it (`grep -rl 'format change reads loudly' .kiro/issues`: none).
  - Route: **Thurgood** (author and register steward), by message. RS-38's named reader is the RELEASE phase-1 pass, which will count this. I route it now as a single instance.

**Standards implications**:
- RS-38 and a ballot's own § 5 straggler step can now both apply to one PR and look alike in a body. Whether the ballot template should point to RS-38 is Thurgood's to read.
- Read 2's home, the PR body, is missed when a unit's Validation line lists lanes that do not run the instrument's suite. #762's body names that very fact for `scripts/harness`.

## Method

- **Sample**: all ten merges, each decided from git at its merge commit, plus API reads of #762, #763 and #769 (bodies, heads, checks). Counted: 10 of 10 read; 3 instrument-path PRs; 0 grant activations or closures under my grant limb; 3 `--audit` re-reads.
- **Not re-verified**:
  - `test:agent-generator`'s 1848 for #769;
  - the red-at-base fixture sets;
  - `consumer.test.ts` locally (CI's `success` and the completion doc are the evidence I read);
  - the Stacy-signed acts' verdicts, which are the delegate's.
- **Not made here**: the claims pass's counting block (edit-kind lines for #763 and #769, the LAW lines' ballots), and J for Data's widened acts in #758.

*Signed: Stacy, 2026-11-08.*
