# Claims Pass — MIDPOINT: Spec 129 (Tasks 1–9, 11 and 19)

**Date**: 2026-11-07 (read from 19:36Z, written by 21:00Z, UTC)
**Grain**: MIDPOINT. U6 is 129's declared midpoint carrier (`tasks.md` L98, L108 and L212). The trigger is the merge of PR #730, squash `5a6a7f32b` on `main`, merged 2026-11-07T19:33:54Z. The unit head at merge, M, is `fa0500cca`. Head H, which the completion doc cites, is `739f8e833`. `git diff --name-only 739f8e833 fa0500cca` prints only `completion/task-11-completion.md`.
**Auditor**: Stacy
**Population**: every Spec 129 parent merged by U6's merge (L108), established from `git log --first-parent 5a6a7f32b -- .kiro/specs/129-consumer-generation-completeness/` and the unit table (L90–L104):

| Unit | Parents | PR | Squash | M (unit head) |
|---|---|---|---|---|
| U1 | 1, 2, 3, 4, 5 | #707 | `74d7566f5` | `c16d4a79d` |
| U2 | 6, 7 | #708 | `55276795e` | `97067e0dc` |
| U3 | 8 | #711 | `de307e1d7` | `5c2d27d75` |
| U3a | 19 | #713 | `05beb0dfc` | `b99105b0d` |
| U4 | 9 | #719 | `30e2f727b` | `d21ed6e50` |
| U6 | 11 | #730 | `5a6a7f32b` | `fa0500cca` |

- U5 (Task 10), U10 (Task 15) and U11 (Task 16) have not merged, so they are out of this population. `tasks.md` shows 8 parents unticked.
- Plan acts that merged in the window are read only where a parent's claim rests on them: amendments 5–8 (#705, #709, #712, #715); the streak correction #714; the `harness-android-tokens` promotion #716–#718; the U4 ratification record #720.

> **Filename convention, load-bearing.** This record is `claims-pass-midpoint.md`, never `claims-pass.md`. The owed-set predicate keys on `completion/claims-pass.md`, which is 129's CLOSEOUT record at U12's merge (L215).

> **No pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.** This pass fired after #730 merged and could not have blocked it. Nothing here blocks U7.

**Standards implications: list — five items (S-1 … S-5), § "Standards implications" below.**

---

## For the reader (read this first)

- **Mechanical parity holds.** `completion-criteria-parity` passes on all 11 parents in scope (45/45 overall, 0 reds, 0 emissions), run locally at `5a6a7f32b`. All four harness contexts, `lane-functional-root` and `completion-criteria-parity` concluded `success` at each unit's M, read from the checks API.
- **Nine findings: four Medium and five Low, plus one Medium self-finding.** None voids an accepted unit. One Medium (MP-1) bears on the promotion record: the committed stability record contradicts the offer it was committed to support.
- **The orchestrator's five pointers, my verdicts:**
  - **C31 (list removals)** is an honest ⚠️, correctly classed. The brief's "eight Android" is wrong: the eight retags are **six iOS and two Android** (§ "Pointers").
  - **C19 (default name)** is `not re-verified — toolchain unavailable`. That is MP-4.
  - **The U4 ratification finding** is recorded in the right shape but addressed to the wrong pass. That is MP-2, taken here.
  - **The #711 streak correction is complete** in text. Its residual is MP-7.
  - **`law-ratified` on #730** affects no claim.
- **Nothing here should block U7.** U7 inherits two items: MP-3's two lapsed records, which are Thurgood's, and the rule that Task 12.2 counts tags, not fixes (§ "Pointers", C31).

---

## Findings

**Two routes apply to each finding.** Each goes to its owner as an explicit message, relayed by the orchestrator. Its standards implications also go to Thurgood through the EDUCATION read.

### MP-1: Medium — the stability record committed for the first promotion prints condition 2 as not met, because `stability.ts` reads an unfinished run as a break

| | |
|---|---|
| **Promised** | Decision 6, lifecycle step 1 (`tasks.md` L67): "`scripts/harness/stability.ts` is re-run at the offer's head and committed. The record lists, for that context, the streak runs (condition 2) … and the offer cites that commit." Condition 2: "a job that failed before the comparator ran … is a break" (L57) |
| **Claimed** | The grant record (`.kiro/issues/archive/2026-11-07-promote-harness-android-tokens-grant.md` L16): "**Condition 2**: 18 consecutive pull-request runs, no break", from a run of the script at `b98f7c5eb`, and "The record is committed in the change PR" |
| **Shipped** | The record committed in the change PR #717 (`6572a601e`, `evidence/harness-stability.md`, "Generated: 2026-11-07T16:01:06Z") reads, for `harness-android-tokens`, "**Condition 2** … current streak 0 of 10 — not met". All four contexts read the same. The last pull-request row is run 42388889208 at `457b2d39b`, #717's own head. Its conclusion is `-`, and its break column reads "no harness-verdict annotation (failed before the comparator)". The actions API shows that run `completed success` at 2026-11-07T16:01:41Z, 35 seconds after the record was generated. So the script counted a run still in progress as a failure before the comparator. |

- **What stands**: the promotion itself. The 18 rows before that run (42334777875 … 42387838286) are all `success · PASS` in the same table. I counted them, and they match the grant's list.
- **What does not stand**: the committed record, which the lifecycle makes the offer's evidence, states the opposite of the offer's condition 2. Demotion test (b) (L74–L77) and every later offer read this script's printed output.
- **Classification**: an instrument defect. The record is "computed, not kept" (L64), so the error is in `stability.ts`, not in a hand edit.
- **Routing**: Thurgood, the owner of `stability.ts` (Task 5; Task 19.3). The remedy is his: exclude or mark a run whose status is not `completed`, and re-commit the record. S-3.

### MP-2: Medium — U4 merged with its LAW ballot unratified and its `**Open for Peter**:` line unanswered; the record exists but names CLOSEOUT, and MIDPOINT is the first pass whose population holds it

| | |
|---|---|
| **Promised** | Task 9 C15: "a ballot record … whose Status reads RATIFIED (Peter) at U4's merge". Task-Completion-Protocol § "Branch and PR Conventions": a PR carrying `**Open for Peter**:` "is not merged until Peter's answer is on the record … dated before the merge" |
| **Claimed** | `task-9-completion.md` (as amended by #720): C15 ⚠️ partially met, "a finding for CLOSEOUT". The ballot's Status note (L7) says the same |
| **Shipped** | The #719 body carries `**Open for Peter**: Ratify the per-family Android type statements …` (body L18) and `**Edit kind**: governance/platform-implementation-guidelines.md — LAW (.kiro/docs/ballots/2026-11-07-129-u4-android-type-statements.md)`. #719 was merged by `3fn` at 16:52:22Z. Peter's "yes, ratify; and scope the check" came at 17:00:13Z, so the measure stood unratified on `main` for 7 m 51 s. |

- **Is the record where it should be?** It is in the right shape: ballot L7, Task 9's forced-negative line and C15 ⚠️ all say it, dated, and none treats the merge as an answer.
- **Where it is not**: it is addressed to "the CLOSEOUT claims pass". MIDPOINT's population contains Task 9 (L108, "the parents merged by then"), so this pass is the first that owns the finding. It is taken here, and CLOSEOUT need not re-take it.
- **Governance-edit-kind rot-mode count**: 1 LAW hunk whose ballot did not read RATIFIED at the merge (`git show 30e2f727b:<ballot>` reads DRAFT). It goes to Peter, who has since ratified it. No revert is owed.
- **Discharged**: the class fix is merged and required. `merge-hold` and `law-ratified` landed in #727, `law-ratified` was promoted in #728 and ARMED in #729, and the head-race fix #732 (`cd340c59b`, verified on `origin/main`) followed.
- **Routing**: Peter, for the record only. The merge was his act, and no remedy is owed. Thurgood holds the ballot. The pointer half of this hunk is MP-6.

### MP-3: Medium — two records whose Trigger is `task-5-completion.md` fired at U1's merge and lapsed

| | |
|---|---|
| **Promised** | Conventions, "A unit closes the records it fires" (L28): "that unit's PR, or an owner's PR merged before it, carries each such record's rule 5 outcome line or a re-ruled Trigger with a dated reason" |
| **Claimed** | Task 5's records criterion names one record only, the harness charter. It was closed by Kenya's and Data's lines, and that is true (archived in #710) |
| **Shipped** | Two root records still carry `**Trigger**: path:.kiro/specs/129-consumer-generation-completeness/completion/task-5-completion.md`, with no outcome line, no re-rule and no `## Lapse` heading: `2026-11-06-native-harness-dispatch-stub-grant.md` and `2026-11-06-complete-task-stages-untracked-paths-outside-parent.md`. Both are Thurgood's. `./scripts/issues-owned.sh Thurgood` prints both as `FIRED@74d7566f5`. Both were filed (#697, #698) after Task 5's criterion was written, so the criterion did not enumerate them, and Task 5's doc is not false. |

- **Classification**: a breach of the Convention, not of a criterion. README rule 11 calls this a lapse. A named ticked criterion was satisfied while the Convention it instances was not.
- **Routing**: Thurgood (owner): rule 11's `## Lapse` heading, then a close or re-rule for each. The stub grant's own close condition (L6, "the stub's merge commit and the probe's run URL") is already met by Task 5's doc. The other record's close depends on whether the `complete-task.sh` fix has merged.

### MP-4: Medium — Task 11 C19's Kotlin compile of the default name rests on a relayed local run with no committed trace, and no CI context exercises the default name

| | |
|---|---|
| **Promised** | C19: "This parent's completion doc records one Kotlin compile of that output at `harness/pins.yaml` § `android`'s versions, by a local build or a harness run on a default-name scratch consumer (Data's choice), and whether `DesignerPunkTheme { … }` resolves to the provider" |
| **Claimed** | ✅. "The Kotlin compile, a local run, not CI (Data, 2026-11-07 …)": `android.tokens succeeded diagnostics 0 keys 0`, `:probe` compiled `ProbeFamily.kt` without error, and 23 probe diagnostics plus two `:dp` keys elsewhere |
| **Shipped** | **`not re-verified — toolchain unavailable`.** The row was written by Ada, in `739f8e833` (`Agent: Ada`), "with Data's local compile". No commit authored by Data, no log and no evidence file carries the run. On the host this pass runs on, `/usr/libexec/java_home` finds no JDK, there is no Android SDK at the default path, and `~/.gradle` has no entry newer than 2026-11-06T22:43Z. The run may have used a scratch toolchain I did not find, so this is an absence of trace, not evidence against the run. Every harness context uses the consumer name `HarnessConsumer`, as the row itself says. |

- **Why Medium**: a consumer that sets no `name` gets `DesignerPunk`. On Android the Q12 type `data class DesignerPunkTheme` then shares its name with the provider `fun DesignerPunkTheme(…)` in one package, and C19 exists to show that this compiles. It is shown only by a self-attested run of another seat, relayed. The criterion allows a local run, so the ✅ is formally within its terms. The form is honest about being local. But "`:probe` compiled `ProbeFamily.kt` without error" inside a module that had 23 diagnostics is a per-file read, not a module compile.
- **Routing**:
  - Data: commit the run's output, or his own dated line confirming it, as his act.
  - Ada: the doc's owner.
  - Thurgood: S-1.

### MP-5: Low — #730's three token-doc edits are declared EXECUTION, citing a chat answer, which is not an EXECUTION authority

| | |
|---|---|
| **Promised** | Ballots README § "When a governance edit needs a ballot — three kinds": EXECUTION's authority is "a merged design clause or a ratified ballot [that] names the edit before it is made" |
| **Claimed** | `**Edit kind**: governance/Token-Governance.md — EXECUTION (Peter, 2026-11-07T18:46:40Z, "(a)": the _wcag members are removed …)`, and the same basis for `Token-Quick-Reference.md` and `Token-Semantic-Structure.md` |
| **Shipped** | Peter's "(a)" answered whether to delete the `_wcag` members. It is dated before the merge and committed in `task-11-completion.md`. It is neither a merged design clause nor a ratified ballot, and it does not name the doc edits. The edits are descriptive: they say what the generator now emits. They are not requirements. |

- **The right kind**, as I read it: CORRECTION, with the referent being the generator's output in the same PR. That is code that declares behaviour, which the README admits as a same-PR referent. It would carry a `**Sweep**:` line.
- **The sweep, run by me**: `git grep -nE '_wcag' -- governance .kiro/steering canonical docs src/components`, excluding `canonical/_consumer-output`. 0 hits describe a flat `_wcag` member as emitted. Five hits are the new text and one is the summary's release note. So nothing is left false.
- **Not a LAW in disguise.** `edit-kind-pointers.ts --pr 730` prints 4 `listed`, 0 `pointer-missing`.
- **Routing**: Ada (author).

### MP-6: Low — dated pointers and sweep lines missing on three governance hunks (#708 and #719)

`npx tsx scripts/completion-claims/edit-kind-pointers.ts --pr <n>`, run by this pass:
- **#708**: `governance/DesignerPunk-Integration-Guide.md L164 CORRECTION pointer-missing` and `L173 CORRECTION pointer-missing`. The #708 body also carries **no `**Sweep**:` line** for either CORRECTION. The README requires one per corrected class (§ "A CORRECTION's sweep", added 2026-10-29). Owner: Thurgood (Task 7 PRIMARY, who spliced Lina's text).
- **#719**: `governance/platform-implementation-guidelines.md LAW pointer-missing`. The replaced CRITICAL RULE carries no `amended <date> by <ballot> <item>; prior text at <SHA>`, and the old rule's `corrected 2026-11-01` pointer went with it. Owners: Lina (text) and Thurgood (holder).
- Counted apart: 0 lines missing and 0 lines without authority on the six unit PRs; 3 `pointer-missing`; 2 missing sweep lines.

### MP-7: Low — Task 19 C8 was ticked ✅ at #713's merge on a criterion text its own subtask doc called false; #714's correction is complete

| | |
|---|---|
| **Promised** | Task 19 C8, as merged at `c73f41ede`: "… with the pull-request-run streak at 0 before it" |
| **Claimed** | ✅ at #713 (`05beb0dfc`). Before the merge, the subtask doc `task-19-3-completion.md` L12 already said: "Before the break the pull-request streak on Android components was 9, after it 4; the '0 before it' in `tasks.md` is superseded by the computed record" |
| **Shipped** | `git show cba101c76:…/harness-stability.md`, `harness-android-components`: 9 pull-request runs before 42379456009 (42334777875 … 42378872101), the break at attempt 2, then 4 runs. I counted these. #714 (`e37bdce07`, CORRECTION, truth: that record) rewrote L62, L660 and the doc's verbatim cell. |

- **Is the correction complete?** Yes. `git grep -n streak` over the spec, its `docs/specs/` summaries and `.kiro/issues/` finds no other site claiming 0. `evidence/2026-11-07-peter-ruling-harness-infra-verdict.md` (L17, L29) does not rest Peter's ruling on the streak figure.
- **What survives**: the parent's ✅ was reproduced on a row that its own evidence contradicted at acceptance. The subtask doc saw it, but the parent row stayed ✅ with no ⚠️ or note until after the merge. The criterion was then edited to match the evidence. This is a legitimate CORRECTION of a premise, not criteria-dilution, because the "0" was the orchestrator's factual claim and not a requirement. But it is the shape the forced-negative line exists to surface at the time.
- **Routing**: Thurgood (Task 19 PRIMARY). The misstatement was the orchestrator's, as `tasks.md` L62 already records.

### MP-8: Low — instruments lines and blocks: grammar, counts and unresolved `MISSING` rows for the unit's own PR runs

- **Grammar** (`completion-documentation-guide.md` L246 regex): **8/11** match. Tasks 8, 9 and 11 put a parenthetical after the missing count ("(row 18 resolved at head H)", "(row 10 the ballot, row 13 the PR contexts; both pending)", "(row 10, the PR's contexts; pending)"). Owner: Ada.
- **Counts**:
  - **Task 9**'s line reads "13 listed — exists 11 · built-here 3 · missing 2". That sums to 16; its block's rows are exists 8 (rows 1–3, 7–9, 11, 12), built here 3 and MISSING 2.
  - **Task 8**'s line reads "missing 0 (row 18 resolved at head H)", but block row 18 still reads `MISSING`, with no appended resolution, and L43 says "still MISSING at this commit".
  - Owner: Ada.
- **Unresolved `MISSING` rows** for "the PR's contexts", never resolved in the row as Start Up Tasks item 8 requires: Task 2 row 21 (Thurgood), Task 8 row 18, Task 9 row 13 and Task 11 row 10 (Ada). Task 9 row 10 (the ballot) also stayed MISSING through the merge; that is MP-2's substance. Tasks 3, 4, 5, 7 and 19 resolved theirs in place.
- **Gaps by source**:
  - Self-reported `unlisted` in the 11 headers: 40.
  - Pass-found: 0 unlisted and 0 misfit in my sample.
  - Task 11's undeclared removal of emitted API (the `_wcag` members) is self-reported in its completion doc ("This unit's block did not name it"), not under `## Found later`.
  - No `missing 0 · unlisted 0` line sits on a parent with a pass-found gap.
- S-2.

### MP-9: Low — two evidence pointers name the wrong run, or an amendment that was never made; the underlying facts hold

- **Task 11**, C13, C25 and the Guide row: they cite run 42405431176 for `lane-functional-root`. That run is `native-harness.yml`; the lane's run at H is **42405431075** (job 128501987858). I read its log. `SwiftThemeTypes`, `KotlinThemeTypes`, `compositeProductRef`, `configCThemesReachNoNativeOutput`, `darkOverrideScaffold`, `install-doc` and `native-rules-emitter` all `PASS`. Owner: Ada.
- **Task 2**, C16 ⚠️: the doc says the row is "discharged by amending this row in place with that run's URL and its printed suite list before U1 merges". It was not amended. I read the U1 PR's `lane-functional-root` (run 42336915968, at M `c16d4a79d`): `PASS scripts/harness/__tests__/parse-kotlin.test.ts`, `parse-swift.test.ts` and `compare.test.ts`. So the second half is true but undocumented. Owner: Thurgood.

### SF-1: Medium — self-finding: my ARMING reads owed in this spec's window are not performed

- **#708** touched `.github/in-lane-guards.json`. My standing record `.kiro/issues/2026-10-20-in-lane-registry-arming-reads.md` prints `FIRED@55276795e`, and no read is appended.
- **#717 and #728** changed the required-check set (`EXPECTED_COUNT` 19 → 20 → 21).
- **#727 and #732** touched instrument paths (`scripts/completion-claims/**`).
- None is in this record, which is MIDPOINT's, and none is in any other committed record of mine (`git log --since=2026-11-06 | grep -i arming` returns only #701).
- **Also**: `.kiro/issues/2026-11-07-merge-hold-promotion-reads.md` printed `FIRED@cd340c59b` on #732, which was not the promotion PR its Trigger names. That is a `path:` token firing on an edit and not on its event. The record is mine (S-5).
- **Routing**: to Peter, visibly, as my own act owed. Each read is its own record when the orchestrator briefs it. The event without a record is LIVENESS's finding to make if I do not.

> **Correction, 2026-11-07 (Stacy; appended, SF-1's text above stands as written).** SF-1 under-counted what I owed. It named five PRs. Twelve PRs owe a read:
> - **Registry limb**: #708, and also **#713 and #727** (both touch `.github/in-lane-guards.json`).
> - **Instrument-path limb**: #717, #727, #728 and #732, and also **#578, #595 and #609**, the 16.2.0 carry-over whose appends I owed and never made.
> - **Grant limb**, none of it in SF-1: the activation read at #724; the fixing reads at #727 and #728; the stub grant's fixing read at #700; and the tasks-row grants at #707 and #713.
> - **Required-check set**: #717 and #728, as SF-1 said.
>
> The reads are in `arming-reads-2026-11-07.md` (this directory) and in the two standing homes. They add three findings I did not name here: the #724 grant list names a governance-law path (Medium), #732 edited `merge-hold.yml` with no grant or standing scope (Medium, to Peter), and #713's `**Deleted lines**:` block is short (Low). S-5's re-rule is done in `.kiro/issues/2026-11-07-merge-hold-promotion-reads.md`, with a `## Lapse (2026-11-07)` heading because rule 11 reads the token, not the prose.

---

## Pointers the orchestrator named (read sceptically, verdicts)

- **Task 11 C31 (list removals): an honest ⚠️, correctly classed.** At M, 8 entries carry `retagged=2026-11-07,Ada,2026-06-28-spec-094-platform-theme-emission-unwired.md` and the tag `2026-09-26-native-component-theme-hardcoding.md`.
  - The split is **6 iOS** (`cannot find 'theme' in scope`: ChipBase, ChipFilter, ChipInput, ContainerCardBase, ProgressIndicatorConnectorBase, ProgressIndicatorNodeBase) and **2 Android** (`Unresolved reference 'DesignerPunkTheme'`: ContainerBase.android.kt, TokenMapping.kt). The brief's "eight Android" is wrong.
  - The harness logs at H agree: `retags=6` on `harness-ios-components` (log L423–L428 lists them) and `retags=2` on Android.
  - **The classification is right.** After U6 the generator emits the theme, so a component that still cannot name it fails for a component-side cause. That is row 15's record, not row 2's, and row 2 archives truthfully.
  - **The ⚠️ is right too**: the criterion also asks that row 15's theme-name entries be removed, and 8 now exist.
  - The row-15 instrument record (`archive/2026-11-07-row-15-theme-name-defect-has-no-observing-instrument-at-u1.md`) asked me to read U6's head-H run. I read it. `harness-ios-components` prints 4 `unmasked:` keys under exception (c), tagged to `2026-11-07-native-component-repair-from-first-harness-run.md`: `VisualStateStyles.swift` "missing argument for parameter 'theme'" ×2, `NavHeaderBase` `systemThinMaterial`, and two `onMoveCommand`. None is a hard-coded theme-name read (the record's definition). Android components print 0 additions.
  - **What survives, for U7**: Task 12.2 counts tags, not fixes. A U7 retag of these eight away from row 15 would pass it with no repair. CLOSEOUT reads every `retagged=` field for that.
- **Task 11 C19 (default name)**: MP-4.
- **U4's ratification after merge**: MP-2.
- **The #711 streak**: MP-7. The correction is complete.
- **`law-ratified` on #730: no claim is affected.**
  - The failure at `120220e96` (check run 128501859733, 19:16:25Z–19:16:53Z) came seconds before H `739f8e833` was pushed (committed 19:16:48Z), which is consistent with the race described.
  - At M, `law-ratified` ran 19:23:01Z–19:23:42Z on `fa0500cca` (committed 19:22:53Z), and nothing was pushed before the merge at 19:33:54Z. So M's `success` judged M.
  - The PR's only governance lines are EXECUTION, and `edit-kind-pointers` reads all four as `listed`.
  - The fix, #732 (`cd340c59b`, on `origin/main`, relayed by the orchestrator and verified with `git log`), makes the checks judge `git rev-parse HEAD`.
  - **Residual**: before #732, a pass of either check on a head followed by a quick push may have judged the later head. A pass at a PR's final head is unaffected, so no merge in the window rests on a misread.

---

## Records each parent was due to close (L28, L29; the record table L172–L215)

- **Task 5 (U1)**: the harness charter is closed and archived (#710). **Two others lapsed (MP-3).**
- **Task 7 (U2)**: none named `task-7-completion.md`. My in-lane-guards standing record fired (SF-1).
- **Task 8 (U3)**: 3 archived with outcome lines (rows 7, 9 and 10). None at the root.
- **Task 9 (U4)**: 4 archived (rows 3, 5, 6 and 8). None at the root.
- **Task 11 (U6)**: 6 archived, each with a dated rule 5 line: Ada's 3, Lina's 2 (`120220e96`) and Thurgood's 1 (`3559cf103`). `grep -l task-11-completion .kiro/issues/*.md` prints nothing. The #730 body says "Still owed … before merge" for three of them; all three were met before the merge.
- **The three at-risk paths (L29, L205–L207)**: no unit diff in scope touches `src/build/tokens/defineComponentTokens.ts`, `src/cli/staleness.ts` or `Input-Text-Base/platforms/ios/**` (`git diff --name-only <c>^ <c>` for each squash).
- **Fired by any owner at a unit merge in scope** (`issues-owned.sh` for all nine seats, filtered to the six squash SHAs): exactly the two of MP-3 and the one of SF-1.

---

## Counting block

| Item | Reading |
|---|---|
| Criteria-block omissions | **0** (`completion-criteria-parity` at `5a6a7f32b`: 11/11 in-scope parents PASS; overall 45/45, reds 0, emissions 0) |
| Criteria vagueness | 0 flagged in the sample. One per-file read offered as a compile (MP-4) |
| Declared-none rate | 0/11 |
| Fixed-string exemption usage | 0 (emissions 0) |
| Bundled-claim / incomplete decomposition | 0 found. Task 11's per-platform pairs are separate rows. `(platforms: …)` fallback invocations: 0 |
| Subtask-doc presence (S-4) | **37/37** ticked subtasks have docs. 37/37 carry an "Application-time adaptations" section. The reflexive `adaptations: none` rate was not measured |
| Delegated-tier capture | Presence **11/11**; missing 0, free-prose 0. Divergence forms **1/11** (Task 2, `model-evolution`, consistent with its `Co-Authored-By: Claude Opus` commits). Spot-check of `plan held` against `Agent:`/`Co-Authored-By:` trailers: **3/10** (Tasks 8, 9 and 11), 0 contradictions for the PRIMARY. Observation outside the line's referent: Thurgood committed at Opus on Tasks 9 and 11 (the ballot record, the agent-layer regeneration), where Task 9 planned him at Sonnet |
| CI-provenance | Present 11/11; Tasks 5 and 19 carry two lines each. Task 2 reads `local`, honestly (no PR yet). For Task 11, H→M is verified as `completion/**` only. U3's attempt-2 read is disclosed in Task 8's line |
| Orchestrator consult line | Unit PRs touching a trigger surface: #708, #711, #719 and #730. Presence **4/4**; `none needed` on a trigger surface: 0. All six unit PRs carry the line. #714 carries `none needed` on a non-checkbox `tasks.md` hunk (a CORRECTION of a figure) |
| Governance-edit-kind read | Six unit PRs. Lines missing 0; lines with no authority 0; kinds read as wrong 1 (MP-5); `pointer-missing` 3, `listed` 9, `unlisted-path` 0 (MP-6); CORRECTIONs with no `**Sweep**:` line 2 (#708, MP-6); rot-mode LAW-unratified-at-merge 1 (MP-2) |
| Instruments | Bound 11/11. Grammar 8/11. Counts equal to the block 9/11. Path names its own block 11/11. Unresolved `MISSING` rows at merge: 5 across 4 parents. Self-reported `unlisted` 40; pass-found 0 (MP-8) |
| Instrument census | No ballot in the population (#720 records a ratification and drafts nothing). Not applicable |
| Re-grounding dispositions | No Spec 123 consumer render is in the population. The agent-layer regenerations of `ada.md` in #719 and #730 are not disposition events. Not read |
| Delegate audit (Stacy-signed, —) | `0 / 0`. Added `signer:` lines in `git log -p --first-parent 74d7566f5^..5a6a7f32b`: 0 for any signer. `refs/pull/<n>/head` were not walked |
| Peter sample (Stacy-signed) | `0 / 0` |
| Governance-examples read | RELEASE phase 1 only. Not applicable |
| Evidence presence (**M3**) | **258/258** criterion rows carry a non-empty Evidence cell. Quality caveats: MP-4 and MP-9 |
| Forced-negative line (**M4**) | **11/11** present. Tasks 2, 5, 9 and 11 list their ⚠️ rows |
| Failure vocabulary (**M5**) | **4/11** parents carry a ⚠️ row (4 of 258 rows; ❌ 0). Discharged since: Task 5 C11 (the row-15 record, archived at U6); Task 2 C16 (true at #707's M, row not amended, MP-9). Standing: Task 9 C15 (MP-2, ratified after merge) and Task 11 C31 (U7) |
| Out-of-list edits | Read for Task 11 only. Its § "Files outside Task 11's Primary Artifacts" names six paths and the agent-layer regeneration, each with a basis. Not re-adjudicated, and not counted for the other 10 parents |

---

## Method

- **Sample, named: 27 of 258 criterion rows re-verified (10.5%)**, against shipped source, git and CI, which I read myself through the checks, annotations, jobs and logs APIs, with a credentialed session. The other 231 rows are covered by mechanical parity only.
  - **Task 11 (19 of 52)**: no alias (C3, test assertions read); zero `Color.Unspecified` (C7) and the one import list (C8), both suites ran at H; config S and C instance sets (C11, C12, test names read); the config C `generate` test (C13, ran at H); the comparison test (C23, ran at H); the per-run instance lines (C24, both pasted lines matched to the job logs at H); the `src/`→`scripts/harness/` ban (C25, `git grep` → 0); the 25 `LocalDPTheme` imports (C27); the iOS and Android probe counts (C28, C29, logs); the list removals (C31, the lists at M and the logs); composite refusal (C32, ran at H); the fixture (C33); the token lists (C36, `grep -c` on each tag); the four contexts at H and M (C37, all four summary lines matched to the logs; conclusions at M `success`); the Guide markers (C38: 5 markers remain, none for rows 2 or 4; `install-doc` ran at H); the six records (C39, archive plus outcome lines).
  - **The other 10 parents (8 rows)**: Task 2 C16; Task 5's records row and C11's resolution; the "four contexts on the PR" rows of Tasks 7, 8, 19 and 9, by the conclusions at each M; Task 9 C15; Task 19 C8, against the record at `cba101c76`.
- **Not re-verified**:
  - Task 11 C19: `not re-verified — toolchain unavailable` (no JDK or Android SDK on this host).
  - No Swift or Kotlin compile was re-run by me. Every native "compiles" row is trust-the-reported-result except where a harness context's conclusion and summary line carry it, and those I read.
- **Local tooling**: `npx tsx scripts/check-completion-criteria-parity.ts`; `npx tsx scripts/completion-claims/edit-kind-pointers.ts --pr {707,708,711,713,719,730}`; `./scripts/issues-owned.sh <seat>` for nine seats; `git` at `5a6a7f32b` and `origin/main`.
- **Not read**: PR bodies other than the six unit PRs and #714; the `refs/pull/<n>/head` signing walk; Tasks 3, 4 and 6's rows beyond parity.
- **A note on the brief**: the orchestrator's numbering (criterion 19, criterion 31) counts sub-bullets as criteria, as the completion doc's table does (52 rows). `tasks.md`'s own instruments block counts 41. My row numbers follow the doc's table.

---

## Standards implications

- **S-1 (MP-4)**: no harness context exercises the default config name, `DesignerPunk`, which every consumer that sets no `name` gets. On Android that is the one configuration where the theme type and the provider function share a name. Whether a fifth harness configuration or a falsification case should carry it is Thurgood's, with Data.
- **S-2 (MP-8)**: M1's execution-time instruments form has no state for "the unit's own PR runs". 5 of 11 parents wrote it as `MISSING`, and 4 never resolved it in place. A `built at PR-open` state, or a rule that the head-H follow-up resolves it, would remove the class. That is Thurgood's, in the guide.
- **S-3 (MP-1)**: a computed evidence record committed while a run of its own head is still in progress misreads that run. `stability.ts` should say which runs it skipped as unfinished, and the lifecycle's step 1 could say "after the change PR's own runs complete". Thurgood's.
- **S-4 (MP-5)**: the edit-kinds table is clear that EXECUTION's authority is a merged clause or a ratified ballot. A dated Peter answer that names an act but not a document edit was read as one. Whether the table should name that case is Thurgood's. I may say only that it was misread.
- **S-5 (SF-1)**: a `path:` token fires on any edit of its path, not on the event its prose names (`merge-hold-promotion-reads` fired on #732). This is known (README rule 11 reads the token, not the prose), so it is the record's owner's (mine) to re-rule, not a standards gap. I list it for Thurgood's EDUCATION read only.

*No pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.*
