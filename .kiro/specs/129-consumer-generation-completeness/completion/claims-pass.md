# Claims Pass — CLOSEOUT: Spec 129 (all 20 parents)

**Date**: 2026-11-08 (read from 16:23Z, written by 18:10Z, UTC)
**Grain**: CLOSEOUT. The trigger is the merge of 129's final declared unit, U12 (`tasks.md` § "Declared Merge Units"; gating parent Task 18): PR #781, squash `a17cb2b34` on `main`, merged 2026-11-08T16:21:37Z. The unit head at merge, M, is `6c61a7b71`. Head H, which Task 18 cites, is `03f2e48b2`.
**Auditor**: Stacy
**Population**: every Spec 129 parent, Tasks 1–20, established from `git log --first-parent 8d8ba1425^..a17cb2b34 -- .kiro/specs/129-consumer-generation-completeness/` and the unit table. M and H are from `gh pr view <n> --json headRefOid` and each gating doc. The MIDPOINT record (`claims-pass-midpoint.md`, #733) took the first 11 parents. This pass re-reads only their docs' later edits (#738, and #747 on Task 11), and the residuals MIDPOINT handed forward.

| Unit | Parents | PR | Squash | M (unit head) | H (doc) | `git diff --name-only H M` |
|---|---|---|---|---|---|---|
| U1–U6 | 1–9, 11, 19 | #707 #708 #711 #713 #719 #730 | as MIDPOINT | as MIDPOINT | as MIDPOINT | read at MIDPOINT |
| U7 | 12 | #739 | `c71fb2452` | `f257dc09e` | `f257dc09e` (rows in #741) | empty (H = M) |
| U7a | 20 | #747 | `38360520d` | `a16aa97fd` | `d3b3c2d64` | `completion/**` and two records only |
| U8 | 13 | #757 | `1686fea35` | `bf56ed9dd` | `8ffda2c1a` | `completion/**`, `docs/specs/**`, two records |
| U9 | 14 | #763 | `c2b844152` | `b5b9f4ba2` | `ee069f45f` (records row in #765) | `completion/**`, `docs/specs/**` |
| U5 | 10 | #774 | `7c143845f` | `657a2f388` | `4ce9bfb53` | `completion/**`, `docs/specs/**` |
| U11 | 16 | #775 | `d74057506` | `bf67fbb15` | `bf67fbb15` (rows in #778) | empty (H = M) |
| U10 | 15 | #777 | `3578cc5be` | `640683faf` | `7d982b215` | `completion/**`, `docs/specs/**` |
| U12 | 17, 18 | #781 | `a17cb2b34` | `6c61a7b71` | `03f2e48b2` (C10 flipped in #788) | `completion/**`, `docs/specs/**`, one record, **and `tasks.md`** (CP-8) |

- I read promised against claimed against shipped. Promised is `requirements.md`, `design.md` and `tasks.md` with amendments 1–13. Claimed is every parent completion doc at `origin/main` `3e76b6205`. Shipped is `main` at `a17cb2b34`, with `git show <M>:<path>` used where a criterion names the merged head.
- **Plan and record acts in the window are read only where a claim rests on them.** These are amendments 9–13 (#737, #742, #749, #754, #783), the post-merge evidence PRs (#741, #765, #778, #788), and #784–#787. The last four are the theme-map P1 record, its grant, its fix, the P0 filing and the Token-Governance ratification. Also read: ARMING batches 3–6 and the ruling records under `evidence/2026-11-08-*`.

> **Filename, load-bearing.** This is `completion/claims-pass.md`, the path the owed-set predicate keys on. Writing it discharges `closeout-owed(129-consumer-generation-completeness)`. It also fires every root record whose Trigger is this path (§ "Records this file fires").

> **No pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.** This pass fired after #781 merged and could not have blocked it.

**Standards implications: list — four items (S-1 … S-4), § "Standards implications" below.**

---

## For the reader (read this first)

- **129's acceptance holds at U12's head, with one exception.** The acceptance is the charter sentence at `b841db957`, which is Requirement 1's D1, D2, D3 and web.
  - **D1**: `harness-ios-tokens` and `harness-android-tokens` show `expected=0 · observed=0`, PASS, at H and at M.
  - **D2**: `d2-check completeness: PASS count=23`, `ios: PASS count=33`, `android: PASS count=33`.
  - **D3**: `harness-ios-components` is 66/66, 49 entries remaining, and `harness-android-components` is 204/204, 94 remaining. Both PASS.
  - **Web**: `Consumer Guard` succeeds at H and M, and on the push run at `a17cb2b34`.
  - **Default name**: `default-name: PASS name=DesignerPunk … provider read 5 of 5` at M, which discharges MIDPOINT's MP-4 in CI.
  - **The exception** is one Android component entry, tagged to 129's own charter rather than the repair record (CP-2).
- **Mechanical parity holds, but it never saw Task 15.** `completion-criteria-parity` at `a17cb2b34` passes 19 of 19 evaluated 129 parents (53/53 overall, 0 reds, 0 emissions). It prints "1 parent(s) unticked — not evaluated", because Task 15's box was never ticked after #777 merged. The same unticked box made the owed-set query class 129 as `open`, which hid this pass's owe from the query (CP-1). With the box ticked in a scratch copy, parent 15 passes (54/54).
- **Fourteen findings: five Medium, nine Low, plus one Low self-finding.** None voids an accepted unit. The Medium ones:
  - **CP-1**: Task 15 is unticked.
  - **CP-2**: Task 18 C8 is ✅ with one component entry tagged to the charter.
  - **CP-3**: the dual-instance harvest record lapsed at U5.
  - **CP-4**: a Task 14 row is ✅ while its own evidence says its last clause was not done.
  - **CP-5**: the U9 `Themes:` line is false for an empty theme. The P0 is already filed.
- **The orchestrator's pointers, my verdicts:**
  - **U7, U9 and U11 merging before head H** is recorded correctly, and the post-merge rows are true. I re-read every pasted summary line from the job logs (32 of 32 match). U10, not in the brief, was held for H properly.
  - **The U5 `docs/tokens.css` change** stands as batch 6's F1, closed by Peter's "Leave it". It is not re-taken here.
  - **U12's three ⚠️ items:**
    - **C15** is an honest ⚠️. The ballot was ratified after the merge (#787, Peter 16:08:46Z). Its application is still pending and is owed before the S of the release that carries U9, so it is carried to my RELEASE read.
    - **C10** is discharged. Thurgood's #788 and my own read of the checks API both show all four contexts `success` at every unit's M, U12's included.
    - **The Android entry** is CP-2.
  - **#785** was green at its own head (28/28), but **no native-harness run has seen it together with U12** (CP-6). The **P0** is CP-5.

---

## Findings

**Two routes apply to each finding.** Each goes to its owner as an explicit message, relayed by the orchestrator. Its standards implications also go to Thurgood through the EDUCATION read.

### CP-1: Medium — Task 15 (U10) was never ticked, so the gate never evaluated it and the owed-set query hid this pass

| | |
|---|---|
| **Promised** | Task-Completion-Protocol, parent sequence step 2: "Mark parent task complete … the status change commits with the work and takes effect at merge". The owed-set predicate and `completion-criteria-parity` both read the checkbox |
| **Claimed** | `task-15-completion.md`: every row ✅, with "Unmet or partially met criteria: none". The #777 title reads "Task 15 Complete" |
| **Shipped** | `git show 3578cc5be:…/tasks.md` and `a17cb2b34` both read `- [ ] 15.` (L1270) and `- [ ] 15.1`–`15.3`. Parity at `a17cb2b34` prints "spec 129…: 1 parent(s) unticked — not evaluated (no completion claim yet)". `./scripts/owed-set.sh` at `a17cb2b34` prints `open	129-consumer-generation-completeness	1 of 20 parents unticked`, not `candidate` |

- **What stands**: the work. In a scratch copy with only the box ticked, parity reads `parent 15: PASS` and 54/54. #777's four contexts at H and M are `success`, and its summary lines match the logs.
- **Why Medium**: the gate's one mechanical check on Task 15's claims never ran. The owed-set query then read 129 as `open`, which is my charter's named failure ("a wrong exclusion hides an owe"). This pass found the owe only because the merge was briefed to me. Once this file lands, the script reads 129 as `closed`, but parent 15 stays unevaluated until the box is ticked.
- **Routing**: Ada (PRIMARY). The remedy is hers, a checkbox-only PR.

### CP-2: Medium — Task 18 C8 is ✅ while one component-tier entry is tagged to 129's own charter, not to the repair record

| | |
|---|---|
| **Promised** | Req 1.5: "The component-tier entries 129 does not close SHALL be tagged to one record that Lina files." Task 18 C8: "… and the remaining component entries are tagged to it." The acceptance sentence: "pinned errors, each tagged to an open record and none tagged to a 129 row" |
| **Claimed** | C8 ✅: "The remaining component entries are tagged to it (45 iOS, 89 Android)". C7's evidence and the forced-negative line call the 1 other entry "a note, not a finding against this criterion" |
| **Shipped** | `harness/expected/harness-android-components.tsv` L11 at `a17cb2b34`: `pkg:src/components/core/Button-Icon/platforms/android/ButtonIcon.android.kt \| Unresolved reference 'ButtonIconTokens'.	3	2026-10-02-consumer-generation-completeness-spec.md`. Tag counts: iOS 45 repair and 4 blend; Android 89 repair, 4 blend and **1 charter**. The tag has stood since U1 (`git log -S`: #707, #757) |

- **What stands**: C7 as written. Its excluded list (rows 12, 14's A5–A7, 15, 16) does not name the charter.
- **What does not stand**: C8's claim that the remaining component entries are tagged to the repair record. One component-tier entry is not, and Req 1.5 is a SHALL.
- **The charter's Trigger is this file**, so its owners close or re-rule it when this pass lands. If it closes with the tag in place, the entry is tagged to a closed record, and Req 1.4's "open root record whose Trigger can fire" fails on the next run.
- **Not decided here**: why `ButtonIconTokens` does not resolve. The index names `ButtonIconTokens.insetLarge` for Android (`token-index/components.yaml` L226). It reads as a component-side import, but that is Lina's diagnosis to make.
- **Routing**:
  - Lina, with Data verifying: move the tag to the repair record before the charter closes.
  - Thurgood (Task 18 PRIMARY): C8's status.
  - Ada and Lina (charter owners): hold the charter's close until the tag moves.

### CP-3: Medium — `2026-09-27-progress-token-harvest-may-not-cross-dual-instance-boundary.md` fired at U5's merge and lapsed

| | |
|---|---|
| **Promised** | `tasks.md` § "Unit preconditions": "The first 129 unit PR whose diff touches `src/build/tokens/defineComponentTokens.ts` (U5 by row 21 …) — the trace or a re-rule, in that PR or an owner PR merged before it" (amended 2026-11-06, `[STACY TASKS R2]` High-3) |
| **Claimed** | Task 10's records row names only the records keyed on `task-10-completion.md`, and that row is true. This record is not keyed on that file |
| **Shipped** | `git diff --stat 7c143845f^ 7c143845f -- src/build/tokens/defineComponentTokens.ts` shows 63 lines added and 2 deleted. The record is at the root with no trace, no re-rule and no `## Lapse` heading. `./scripts/issues-owned.sh Ada` prints `FIRED@7c143845f` |

- **Classification**: a breach of a named unit precondition, not of a criterion. This is the same shape as MIDPOINT's MP-3.
- **Routing**: Ada (owner): rule 11's `## Lapse` heading, then the trace or a re-rule.

### CP-4: Medium — Task 14's "Custom themes reach native output" row is ✅ while its own evidence says its last clause was not done

| | |
|---|---|
| **Promised** | Task 14 row: "… from this unit the `wcag` case's doc comment also names the bridge source where a built-in map applies (design § 4, `[LEONARDO R2]`)" |
| **Claimed** | ✅, with the Evidence cell: "The `wcag` case's doc comment naming the bridge source was not changed (see Unmet)". The Unmet line: "Row 15, last clause … was not changed" |
| **Shipped** | `git log 1686fea35..a17cb2b34 -- src/generators/native/ThemeEmitter.ts` shows no change after U9 that adds the bridge source. The clause is open at the final head |

- **This is an unmet clause rolled into a ✅.** The disclosure is honest, but the status is wrong, and an unverifiable or unmet clause never rolls into a ✅. It should read ⚠️ with its pointer. The fix to the doc is a dated note below the row, not a rewrite.
- **Routing**: Ada (author and owner of the emitter). Her follow-up line names the Req 15.6 text, which #787's ballot does not carry.

### CP-5: Medium — the `Themes:` line U9 ships is false for a registered custom theme with no colour override (P0 already filed)

| | |
|---|---|
| **Promised** | Requirement 15, "Shipped wording follows the instrument"; Task 14 row "a registered custom theme emits as `:root[data-theme="<name>"]`, and the `generate` message … changes in this diff" |
| **Claimed** | ✅: "`generateThemesLine` now reads 'registered and applied'" |
| **Shipped** | `GENERATE_THEMES_SUFFIX` (`src/cli/shared/errorCatalog.ts` L575–576) says any other theme "is written as `:root[data-theme="<name>"]` on web". `generateWebThemeBlock` writes no block for a theme with no colour override (`TokenFileGenerator.ts` L1116). Since #785, an empty map is the only such case |

- **The row is true at its letter**: the message changed. The falsity is in the sentence it changed to, in adopter-facing output.
- **The remediation route is already running.** Ada filed `.kiro/issues/2026-11-08-themes-line-web-clause-false-for-empty-theme.md` (P0 false-claim, Trigger `release:next:phase-1`, wording Leonardo's) in #786, from my ballot review. No release carries U9 yet. I take it here so the pass carries it. No new act is owed beyond that record.
- **Routing**: Ada (owner), with Leonardo (wording).

### CP-6: Low — no native-harness run has measured the tree that shipped, because U12's branch did not contain #784–#786

| | |
|---|---|
| **Promised** | Req 1.2–1.4: "WHEN 129's final unit merges THEN … SHALL conclude success at that head". Task 18's rows read "At U12's head" |
| **Claimed** | Task 18: D1, D2 and D3 at H `03f2e48b2`. #788: the same contexts at `6c61a7b71` |
| **Shipped** | `git merge-base --is-ancestor c91fb9b15 6c61a7b71` is false, and so is the check for `7689dd804` and `5ec03fe25`. U12's branch base is `7b5c60235` (#783). `a17cb2b34` = `7689dd804` + U12, a tree no PR head carried. `native-harness.yml` runs only on `pull_request` and `workflow_dispatch`. The push runs at `a17cb2b34` are Consumer Guard, parity, Section Citation, Tool-Boot and Package Name Drift, all `success`, and none of them is the harness. #785's own head `5907301a8` ran native-harness 28/28 without U12, and #787's head `9e44a2cad` without U12 either |

- **What stands**: every Task 18 row, as written. "U12's head" is the PR head, and it was read.
- **What is unmeasured**: the native harness on `a17cb2b34`. The interaction risk is low, because #785 only refuses non-colour keys, and Consumer Guard's packed-install `generate` on the `init` config passed on the push run. It is still a gap between "at that head" and the tree adopters will get.
- **`not re-verified — toolchain unavailable`**: I cannot run the pinned Xcode 26.6 or Gradle lanes on this host.
- **Routing**:
  - Peter: a question, below.
  - Thurgood: S-1.

### CP-7: Low — four subtasks ticked without their docs, and 18.4 ticked while its substance was unmet

- **Promised**: Task-Completion-Protocol, subtask step 2 (S-4): "a ticked subtask without its doc is a finding on the authoring agent."
- **Shipped**: 66 subtasks are ticked across the spec and 62 have docs. **18.1, 18.2 and 18.4** (Thurgood) and **20.2** (Thurgood) have none. Task 20's doc points to commit `6ac6f534d` for 20.2, and Task 18's rows cover 18.1, 18.2 and 18.4.
- **18.4** ("Confirm the Token-Governance ballot was ratified and applied in time") was ticked at `a50b36c71`, after H. At that point its parent row C15 read ⚠️ "Not met at H", and the ballot read DRAFT. A tick there asserts what the parent row denies.
- **Routing**: Thurgood.

### CP-8: Low — U12's head H is not the last head the Conventions define; `tasks.md` changed after it

- **Promised**: Conventions: H is "the last head whose `git diff --name-only H M` … touches only `completion/**`, `docs/specs/**` and the PR's records".
- **Shipped**: `git diff 03f2e48b2 6c61a7b71 -- tasks.md` ticks 18, 18.1, 18.2 and 18.4. Parity at H read parent 18 as unticked and did not evaluate it.
- **What stands**: M's reads. All of #781's checks at M are `success`, `completion-criteria-parity` included, and the four harness summary lines at M equal H's (read from logs, below).
- **Routing**: Thurgood (Task 18 PRIMARY).

### CP-9: Low — instruments lines and blocks

- **Grammar** (`completion-documentation-guide.md` L246 regex): **14/20**. MIDPOINT's three failures (8, 9, 11) are fixed (#738). The new failures:
  - 13, 16, 17 and 18 write `N listed — see <path>`;
  - 15 adds `none 1`;
  - 20 adds a parenthetical.
- **Counts against the block**:
  - **Task 14**: the header says 27 listed; the block has 28 rows.
  - **Task 20**: the header says 14 listed and `missing 0`; the block has 15 rows, one of them a resolved `MISSING`.
  - **Task 18**: rows 4 and 10 still read `MISSING`, with no resolution appended in the row (Start Up Tasks item 8), and row 4's state `MISSING-CHECK` is not a defined state.
- **Owners**: Ada (13, 14, 15, 17), Kenya (16), Thurgood (18), Data (20).

### CP-10: Low — `**CI-provenance**:` lines that do not parse

- **Grammar** (guide L180 regex): **12 of 22** lines parse. Failures:
  - Tasks 8, 9, 11, 13, 14, 15, 16, 17 and 18 fail outright;
  - one of Task 20's two lines fails.
- **Examples**:
  - Task 15 `PR gate #777 @ 7d982b215` has no `(merge ref) — <checks URL>`;
  - Task 17's line is free prose;
  - Task 18 names its runs in prose.
- **Why it matters**: rule 2 ("every run result … is local unless its run is listed on a CI-provenance line") reads the runs these docs cite as local. The facts themselves I re-read from the API, and they hold.
- **Self-correction**: MIDPOINT counted presence only (11/11) and did not run the grammar, so 8, 9 and 11 were failing then too.
- **Owners**: the doc authors (Ada 8, 9, 11, 13, 14, 15, 17; Kenya 16; Thurgood 18; Data 20).

### CP-11: Low — one missing dated pointer and one missing consult line

- **`edit-kind-pointers.ts --pr 781`**: `governance/DesignerPunk-Integration-Guide.md L197–202 CORRECTION pointer-missing`, the Native status passage. Owners: Kenya and Data (text), Thurgood (holder).
- **#757** touched `governance/DesignerPunk-Integration-Guide.md`, which is a trigger surface, and its body carries no `**Consulted**:` line. Owner: Ada (PR author).

### CP-12: Low — two lapsed records of Kenya's; seven closed records still at the root

- **Lapsed (rule 11)**:
  - **`2026-11-08-probe-swift-providerreads-not-mainactor.md`** prints `FIRED@a17cb2b34`. The fix shipped in U12 (#782), and its own criterion holds at `a17cb2b34`: `grep -c '@MainActor func probeReads' scripts/harness/probe-swift.ts` gives 1, `grep -c harnessConsumerTheme harness/expected/harness-ios-tokens.tsv` gives 0, and `harness-ios-tokens` reads `expected=0` at M. There is no outcome line.
  - **`2026-11-08-kenya-u11-link7-erratum.md`** has the Trigger `merge:#778`, which fired at its own carrying merge (`FIRED@5ab584d3c`), with no close.
  - Owner: Kenya.
- **Closed with an outcome line, archive move owed** (counted, not findings; the steward's walk):
  - Ada's four U5 records: `2026-06-24-mathematical-relationship-parser-validation-gaps.md`, `2026-10-03-semantic-override-map-type-not-exported.md`, `2026-10-24-component-token-custom-values-unvalidated.md` and `2026-11-08-u5-opacity100-formula-grant.md`;
  - `2026-11-07-d2-check-step-grant.md` (Thurgood);
  - `2026-11-08-theme-map-noncolour-guard-grant.md` (Ada);
  - `2026-11-08-u12-probe-swift-mainactor-grant.md` (Kenya).

### CP-13: Low — two Task 18 evidence commands cannot be re-run as written, and one description is inaccurate

- **Commands**: C4's `grep -E "d2-check (ios or completeness)"` and C17's `git grep -niE 'runtime theme or theme switch'` match nothing as written, because `|` was rewritten as " or " inside the table.
- **What I re-ran myself at `a17cb2b34`**:
  - `git grep -niE 'runtime theme|theme switch|switch(es|ing)? (the )?theme'` over the Guide, `docs/consumer`, `CHANGELOG.md`, `README.md` and both overlays gives 0 hits. Req 1.7 holds.
  - The D2 lines, from the job annotations at M.
- **C11's description**, "every hit is negative … or the Native status passage's forward-looking sentence", is inaccurate. The Guide's L197 and L200, and INSTALL's L183 and L186, affirm "the token files `generate` writes compile". That is true, because both D1 lists are empty. So the criterion ("no claim that a tier compiles while its list held entries") holds, and the description does not.
- **Owner**: Thurgood.

### CP-14: Low — the staleness record lapsed at U8 (self-reported by Ada, discharged at U9)

- **Shipped**: `2026-10-12-generate-staleness-decided-by-file-times.md` fired at U8's merge `1686fea35`. The unit-preconditions table said U8's PR would close it through R5, and it did not.
- **Discharged**: Ada closed it at U9 (#763) with a `## Lapse` section, and her Task 14 doc addresses it to this pass.
- **Routing**: Ada, for the record only. Nothing is owed.

### SF-1: Low — self-finding: two ARMING reads of mine fired in the window with their standing records not advanced

- **The registry limb fired at #781** (`.github/in-lane-guards.json`, 12 lines added, 0 deleted). `issues-owned.sh Stacy` prints `FIRED@a17cb2b34`. The read is done in this commit, with **no finding**. It is appended to `.kiro/issues/2026-10-20-in-lane-registry-arming-reads.md`:
  - `.github/**` is that file only;
  - the additivity predicate prints `true`;
  - `54 registered in-lane guards; 54 selected` is in #781's M-run `lane-functional-root` log, along with `PASS` for both new files;
  - each entry's `config`, `scripts/jest.config.js`, is run by the unconditional step "Run scripts/** test suite (npm run test:scripts)" of `lane-functional-root`;
  - the assertions are named in that record.
- **`.kiro/issues/2026-10-25-arming-read-class-option-fork.md`** prints `FIRED@031d7928f` (#740). Batch 2 read #740, and batches 4–6 read #756, #769 and #779, which are the only first-parent commits over its 20 globs in `3610718aa..a17cb2b34`. I never advanced the record's read-through line, so it lapsed under rule 11. Its `## Lapse (2026-11-08)` heading and the read-through re-rule are in this commit.

---

## Pointers the orchestrator named (read sceptically, verdicts)

- **Merged before head H: U7 (#739 → #741), U9 (#763 → #765), U11 (#775 → #778). The record is right and the rows are true.**
  - For U7 and U11, H = M. For U9, H→M touches only `completion/**` and `docs/specs/**`.
  - The post-merge PRs change only `completion/**`, `docs/specs/**` and records.
  - Runs 42414978519 (U7) and 42476736031 (U11), plus U9's 42442859485, are `pull_request` runs at the stated heads, `success`. Every pasted `expected/observed/new/stale` figure matches the job log.
  - U9's records row: #764 merged at 03:42:48Z, before #763's 03:57:47Z, so the condition held at merge.
  - U9's row 22 (link-4 anomaly) is discharged by my batch 5 re-read on the fixed tool (`anchored 1`). The doc row stays ⚠️, the same shape as MIDPOINT's MP-9 on Task 2.
  - U11's two link-7 FAIL acts stand as script-checked under Peter's "let's go (A′)" (2026-11-08T13:52:10Z, `evidence/2026-11-08-peter-ruling-u11-link7-recut.md`), with Kenya's erratum. Task 16 C5 stays ⚠️ at FAIL 2, never ✅, which is correct. The merge against ruling (g) is the orchestrator's finding, already recorded in batch 6 and in the ruling's addendum; it is not re-taken.
- **U10 (#777), not in the brief**: held for H properly. H `7d982b215` → M is docs-only, and the summary lines match.
- **U5 (#774) `docs/tokens.css`**: batch 6's F1 stands as promised, claimed and shipped, and is closed by Peter's "Leave it, and go for U12" (2026-11-08T14:25:31Z, `evidence/2026-11-08-peter-ruling-tokens-css-and-u12-go.md`) with Ada's correction lines. It is not re-taken.
- **U12's ⚠️ rows**:
  - **C15 (Token-Governance ballot)**: honest. The ballot was DRAFT at H and is RATIFIED since #787 (`8fa55bd4a`, after U12's merge). `governance/Token-Governance.md` L242 still reads "A registered theme is not applied yet" on `main`. The application PR is owed before the S of the first release that carries U9 (`tasks.md` § "Unit preconditions"). That is my RELEASE phase-1 read, not this pass's.
  - **C10 (U12's merged head)**: discharged.
    - The checks API at `6c61a7b71` shows 30 check runs, 0 non-success, including all four harness contexts, `harness-generate`, `completion-criteria-parity`, `law-ratified` and `merge-hold`.
    - The four summary lines at M, read from logs: ios-tokens `expected=0 · observed=0`, android-tokens `0 · 0`, ios-components `66 · 66 · remaining=49`, android-components `204 · 204 · remaining=94`. Each is PASS and equal to H.
    - Thurgood's #788 reads the same SHA and says so ("a reading of 'at M', not the letter of it"). I agree with the reading. It is how every unit was read.
  - **The one Android entry tagged to the charter**: CP-2.
- **Shipped outside U12's rows: #785 and the P0.**
  - #785 is Ada's, under issue-row grant #784 and Peter's "(a) with the class option" (15:12:38Z). Its head is 28/28 `success`, and #786 closed the P1 with a rule 5 line.
  - It merged while U12 was open and is not in U12's tree (CP-6).
  - The P0 `Themes:` record is CP-5.

---

## Residuals MIDPOINT handed forward, and the CLOSEOUT reads the criteria name

- **MIDPOINT findings**:
  - **Discharged**:
    - MP-1, by #735 and #753 (`stability.ts` skips unfinished runs);
    - MP-3, by #738 (both records archived; the guard record with `## Lapse`);
    - MP-4, by #734 and U7a, with Task 20's CI step `default-name: PASS` at every later M;
    - MP-5, MP-6, MP-8 and MP-9, by #738;
    - SF-1, by #736.
  - **Recorded, no remedy owed**: MP-2 and MP-7.
- **Task 11 C31 and Task 12's retag rows**: `git show <c>:harness/expected/harness-{ios,android}-components.tsv | grep -cE 'retagged=|theme-hardcoding'` gives **0** at U7's M (`f257dc09e`) and at `a17cb2b34`. The loophole MIDPOINT named is closed.
- **Task 12, the reads its criteria hand to CLOSEOUT:**
  - **Merge base**: `git diff --stat 5a6a7f32b ee9996840 -- harness/expected/harness-*-components.tsv` is **empty**, where U7's merge base is `ee9996840`. So "present at U6's merge" holds.
  - **Q** (leading `\|` literal, inner `|` alternation, `$'\t'` appended, `/usr/bin/grep` BSD grep 2.6.0-FreeBSD, `-E`):
    - 7 (iOS) and 42 (Android) at `5a6a7f32b`, as the criteria state;
    - **0 and 0** at M `f257dc09e`;
    - 0 and 0 at `a17cb2b34`.
  - **Toolchain**: `git diff --stat 5a6a7f32b f257dc09e -- harness/pins.yaml` is empty. The doc's H versions (Xcode 26.6 (17F113), Swift 6.3.3; Kotlin 2.4.21, Gradle 9.8.2, AGP 9.5.0) equal `git show 5a6a7f32b:harness/pins.yaml`. So a 0 from Q is ✅ on its own.
  - **Observation**: two colour-named keys remain on Android, outside the eight the criterion names: `VerticalListButtonItem.android.kt` `Unresolved reference 'borderColor'.` and `'iconColor'.`, tagged to the repair record. They are reads of `styles.borderColor` and `styles.iconColor` (L228, L252), members of a styles object, not theme reads. Q's proxy is doing what it says, so this is not a finding.
- **Task 13, the code read its criterion hands to CLOSEOUT** (`scripts/harness/d2-check.ts` at `a17cb2b34`):
  - **Names**: the platform halves take every expected name from the index's `platforms.<p>` fields and work none out. The one restated rule is `indexNameOf` (the component lowercased, then `.key`), in the completeness half, disclosed in the header.
  - **The walk** has one root (`node_modules/@3fn/core/src/components/core/`) and one basename pattern. It **does filter**: definition tokens whose component group the consumer declares itself are dropped (design § 9, stated in the function's comment). The index side keeps only package-tagged (`source`) entries.
  - **`declaredTokens` reads quoted keys only**. All 23 keys in the six shipped files are quoted (8 + 1 + 6 + 2 + 3 + 3 = 23 = `count=23`). An unquoted key would make the index side larger and FAIL as `extra`, so it fails loud, not silent.
  - **Floor 3** (base versus head) stays owed only on a change outside the comments. The only later change, #762, is comment-only (0 non-comment changed lines). The ⚠️ row is honest.
- **Task 17 C3**: `git merge-base --is-ancestor 5a6a7f32b a17cb2b34` and `… 1686fea35 a17cb2b34` both exit 0.
- **Rider (a), the spec-level discharge**: the criteria mode is per-parent, and there is no spec-level block (parity: 0 spec-level). The charter's acceptance sentence is discharged through Task 18's rows. My verdict on it is in "For the reader": held at U12's head, except CP-2, with CP-6's gap.
- **Report-set comparison**: not applicable. 129 is a system spec with no Implementation-Report set, and its per-platform claims are separate rows (D1/D3 × iOS/Android, Task 12's pairs).
- **Deferral walk-back**: `grep -rn 'Artifact deferred' completion/` gives 0. No deferral was declared.

---

## Records each parent was due to close, and records this file fires

**Due at each post-MIDPOINT unit merge** (`issues-owned.sh` for all nine seats, filtered to the unit squashes):

- **U5 (Task 10)**:
  - 4 closed with outcome lines and still at the root (CP-12);
  - the dual-instance record lapsed (CP-3).
- **U7 (Task 12)**: rows 15 and 16 archived with outcome lines.
- **U7a (Task 20)**: the grant archived with Thurgood's outcome line.
- **U8 (Task 13)**:
  - the D2 grant closed, at the root (CP-12);
  - R1/R5 archived;
  - the staleness record lapsed (CP-14).
- **U9 (Task 14)**: both records closed; one archived.
- **U10 (Task 15)**: the README grant archived.
- **U11 (Task 16)**: none keyed on its doc. Kenya's erratum lapsed (CP-12).
- **U12 (Tasks 17, 18)**:
  - the probe grant closed, at the root;
  - the probe defect lapsed (CP-12);
  - the oracle-floors record re-ruled to `manual` (`56aee5b85`, mine);
  - the signing-act shape review fired, with its "Fired" section added by Thurgood in #788. The review ballot is owed and must ship before 125-B U3.
- **The at-risk paths**: `Input-Text-Base/platforms/ios/**` was touched by no unit squash, so `ios-readonly-focusable-prototype.md` did not fire.

**This file fires** (Trigger `path:…/completion/claims-pass.md`). The owner's act is owed after this file merges:

| Record | Owner | What is owed |
|---|---|---|
| `2026-10-02-consumer-generation-completeness-spec.md` (the charter) | Ada, Lina | Close or re-rule. **Hold the close until CP-2's tag moves**, because one harness entry is tagged to it |
| `2026-11-07-native-component-repair-from-first-harness-run.md` | Lina (Kenya, Data verify) | Re-rule. 45 iOS and 89 Android entries remain tagged to it (Req 1.5), so it cannot close |
| `2026-06-24-oklch-shadow-color-family-not-migrated.md` (row 11) | Ada | **Req 7.4 delivered its primitive half**: the four shadow primitives are in OKLCH with the same colours (`src/tokens/color/primitives/shadow.ts`; Task 8, U3). The owed act is the re-rule of the surviving channel migration to Spec 133 (design § 8) |
| `2026-11-04-consumers-get-no-report-of-what-an-upgrade-changed-in-generated-tokens.md` | Ada | Her decision at CLOSEOUT, "with row 19 and item (ii) shipped". Both shipped (U9, U8) |
| `2026-09-26-native-component-distribution.md` | Kenya, Data | The switch to `release:next:phase-1` at 129's close (#684) |

---

## Counting block

| Item | Reading |
|---|---|
| Criteria-block omissions | **0** among the evaluated parents. `completion-criteria-parity` at `a17cb2b34`: 19/19 129 parents PASS; overall 53/53, reds 0, emissions 0. **Parent 15 not evaluated** (unticked, CP-1); 54/54 in a scratch copy with the box ticked |
| Criteria vagueness | 0 flagged. Task 12's Q is a declared proxy with its own toolchain guard, which I ran |
| Declared-none rate | 0/20 |
| Fixed-string exemption usage | 0 (emissions 0) |
| Bundled-claim / incomplete decomposition | 0 found. D1/D3 and Task 12 rows are per platform. `(platforms: …)` fallback invocations: 0 |
| Subtask-doc presence (S-4) | **62/66** ticked subtasks have docs. **4 findings**: 18.1, 18.2, 18.4 and 20.2 (CP-7). 3 unticked subtasks (15.1–15.3) have docs. 65/65 subtask docs carry an adaptations element. The reflexive `adaptations: none` rate was not measured |
| Delegated-tier capture | Presence **20/20**, grammar 20/20; missing 0, free-prose 0. Divergence forms **1/20** (Task 2, `model-evolution`). Spot-check of `plan held` against `Agent:`/`Co-Authored-By:` trailers on each PR's own commits: **4/19** (#757, #777, #781, #747) plus MIDPOINT's 3/10, so **7/19** overall, 0 contradictions. #781's two Opus commits carry no `Agent:` and are orchestrator ruling records (`ded3bfd14`, `51e17e0e9`), not a seat's |
| CI-provenance | Present 20/20. **Grammar 12/22 lines** (CP-10) |
| Orchestrator consult line | Unit and plan PRs after MIDPOINT whose diff touches a trigger surface: #757 (Guide), #763, #774, #777, #775, #781, #737, #742, #749, #754, #783. Present **10/11**; missing 1 (#757, CP-11). `none needed` on a trigger surface: #774 ("executes merged tasks.md Task 10"). #739 and #747 touch only `tasks.md` checkboxes. Spot-check of named reads: 0 traced (the consults are self-attested) |
| Governance-edit-kind read | Post-MIDPOINT unit PRs (`edit-kind-pointers.ts --pr`): 18 declared lines (#757 1, #763 4, #774 1, #777 4, #775 2, #781 6). Lines missing 0 (`law-ratified` success at every M). `ok` 2, `listed` 15, `pointer-missing` 1 (#781 L197–202, CP-11), `unlisted-path` 0. Rot-mode LAW-unratified-at-merge: 0 (no LAW line in a unit PR). Kinds read as wrong: 0 |
| Instruments | Bound 20/20. **Grammar 14/20**. Counts equal to the block, for the 9 post-MIDPOINT parents: **3 equal** (10, 12, 15), **3 differ** (14, 18, 20; CP-9) and **3 uncountable** from their `see <path>` lines (13, 16, 17). MIDPOINT's 11 were not re-counted. Path names its own block 20/20. Unresolved `MISSING` rows at merge: Task 18's two. Self-reported `unlisted` in parseable post-MIDPOINT headers: 8 (Tasks 10, 12 and 14), plus `## Found later` entries in 13 and 16. Pass-found gaps: 0 unlisted and 0 misfit in my sample |
| Instrument census | Ballots in the window are read at their own reviews: #744, #745, #748, #787 (census read by me at #787's R1–R3, "re-run with no delta"). No census line is owed by a parent. Not re-counted here |
| Re-grounding dispositions | Not a Spec 123 render population. Signing acts in unit squashes (counted from `signatures/*.md` `(Re-)Signed` lines in the squash diffs, not from `refs/pull/<n>/head`, so approximate): U11 (#775) Kenya 3, Data 2; U12 (#781) Kenya 7, Data 6. All assent, refusals 0. U9 (#763): one Sparky confirmation, no signature row. The `--audit` reads: #775 FAIL 2 (A′); #763 anchored 1 after #769. Full-survival assent signal: `not yet instrumented`. Spot-check fraction of itemized assents: 0 / 18 |
| Delegate audit (Stacy-signed, —) | `0 / 0` in the unit population (no `signer: stacy` line in any unit squash). Outside it: #746 and #758 (ballot applications in the window) add 16 `signer: stacy` lines under `canonical/profiles/consumer/signatures/`. They are owed to the next RELEASE record's delegate audit, not this one |
| Peter sample (Stacy-signed) | `0 / 0` |
| Governance-examples read | RELEASE phase 1 only. Not applicable |
| Evidence presence (**M3**) | **362/362** criterion rows carry a non-empty Evidence cell. Quality caveats: CP-4, CP-13 |
| Forced-negative line (**M4**) | **20/20** present |
| Failure vocabulary (**M5**) | **10 ⚠️ rows of 362, in 10 parents; ❌ 0.** Standing at CLOSEOUT: Task 9 C15 (ratified after merge, MP-2); Task 10 C3 (record `2026-11-08-generate-component-token-warning-spacing-sizing-only.md`, `release:next:phase-1`); Task 13 floor 3 (owed only on a non-comment change); Task 16 C5 (FAIL 2 under A′); Task 18 C15 (to RELEASE). Discharged but not re-marked in the row: Task 2 C16, Task 5 C11, Task 11 C31, Task 12 head-H, Task 14 row 22. **One ✅ that should be ⚠️**: Task 14's native-themes row (CP-4). **One ✅ I read as false**: Task 18 C8 (CP-2) |
| Out-of-list edits | Batch 6 F1 (#774 `docs/tokens.css`, ruled). Not otherwise re-adjudicated |

---

## Method

- **Sample, named: 57 of 362 criterion rows re-verified (15.7%)**, against shipped source, git and CI. I read CI myself (check-runs, run, job and annotation APIs, and job logs) in a credentialed session. The other 305 rows are covered by mechanical parity, and by MIDPOINT's 27 for its 11 parents.
  - **Task 18 (17 of 19)**:
    - C1 (`requirements.md` L23, `**` stripped, 364 bytes without the newline, `grep -cF` gives 1 in the charter at `b841db957`);
    - C2–C7, from the job logs and annotations at H and M;
    - C8 (tags counted: false, CP-2);
    - C9, Consumer Guard at H and M and the push run;
    - C10, checks API at all 14 Ms;
    - C11 (`git grep`, re-run);
    - C13 (`git tag`);
    - C14 (both phrases, 4 hits);
    - C15 (ballot Status, L242);
    - C16 (`git log` empty);
    - C17 (re-run);
    - C18 (predicate, the CI line, the step).
  - **Task 17 (3 of 5)**: C1 (the four `files[]` negations, the `pack-assert` assertion string); C3 (ancestry); C5 (`7 (a)` present).
  - **Task 12 (7 of 13)**: the two row-15 rows; the two Q rows, with the merge-base diffstat and the toolchain comparison; the head-H row, from logs; the records row (archive); the ripple row (`git grep rememberRipple` over the Android component sources at M gives 0 code lines).
  - **Task 13 (7 of 40)**: the three D2 rows, from `harness-generate`'s annotations at U8's H (run 42434397927) and again at U12's M; the code-read clause; floor 3; the head-H row, from logs; the `.github/**` numstat (37/0).
  - **Task 14 (5 of 30)**: the head-H row (logs and H→M); row 22 (batch 5's re-read); the native-themes row (CP-4); the records row (#764's `mergedAt`); the `Themes:` row (CP-5).
  - **Task 20 (4 of 25)**: the head-H row (logs); the `default-name` annotation, re-read at U12's M, not at U7a's H; `HarnessConsumer` kept (`git show a16aa97fd:harness/pins.yaml`); the `.github/**` numstat (25/0).
  - **Tasks 10, 15 and 16 (2 each, 6)**: each head-H row from logs; Task 10 C3's record; Task 15's parity in a scratch copy; Task 16 C5 against the ruling record.
  - **Tasks 1–9, 11 and 19 (8)**: Task 11 C31 (the retag count at M and at the final squash) and C19 (the default name, now in CI), and the four-contexts rows of the six gating parents (Tasks 5, 7, 8, 19, 9 and 11), re-read at each M through the checks API.
- **Not re-verified**:
  - every native "compiles" row beyond what the harness contexts' conclusions and summary lines carry (trust-the-reported-result);
  - no Swift or Kotlin compile was run by me: `not re-verified — toolchain unavailable` (Xcode 27.2 here against the 26.6 pin, and no JDK or Android SDK);
  - the harness on `a17cb2b34` itself (CP-6);
  - `test:pack-contents`, `npm test` and `test:consumer` at `a17cb2b34` (CI's push runs of Consumer Guard and parity are `success`).
- **Local tooling**:
  - `npx tsx scripts/check-completion-criteria-parity.ts` at `a17cb2b34`, and in a scratch copy with Task 15 ticked;
  - `./scripts/owed-set.sh`;
  - `npx tsx scripts/completion-claims/edit-kind-pointers.ts --pr <n>` for 16 PRs;
  - `./scripts/issues-owned.sh <seat>` for nine seats;
  - `jq` for the additivity predicate;
  - `git` at `a17cb2b34`, `6c61a7b71` and `origin/main` `3e76b6205`.
- **Not read**:
  - PR bodies beyond the unit, plan and record PRs listed;
  - the `refs/pull/<n>/head` signing walk;
  - the criterion rows of Tasks 3, 4 and 6 beyond parity;
  - the 29 Task 11 rows MIDPOINT did not sample.

---

## Standards implications

- **S-1 (CP-6)**: a closeout unit's "at that head" reads can be true while the shipped squash was never measured, because a unit PR can merge without carrying PRs that merged while it was open, and the native harness does not run on push. Whether the final unit must be current with `main` at merge, or whether a `workflow_dispatch` of the harness on the squash is owed, is Thurgood's. My part is only that the criterion was satisfiable without measuring the shipped tree.
- **S-2 (CP-1)**: an unticked parent whose unit merged is invisible to both instruments that read `tasks.md`. The parity gate prints "not evaluated" and the owed-set query prints `open`, so the gate stays green and the owe is hidden. A merged unit's gating PR is the event both could key on. That is Thurgood's, as owner of both instruments.
- **S-3 (CP-9, CP-10)**: the instruments and CI-provenance lines have published regexes, and nothing runs them. 10 of 22 provenance lines and 6 of 20 instruments lines fail, and the failures recur across seats. A missing or malformed line could be a `completion-criteria-parity` emission, the named successor my charter already records for the delegated-tier line. Thurgood's.
- **S-4 (CP-7)**: a subtask ticked after its parent row reads ⚠️ (18.4) asserts what the row denies, and no rule ties a subtask's tick to its parent row's status. I may say only that it happened. Whether a rule should, and what it says, is Thurgood's.

*No pass, at any grain, is ever a required check, a review gate, or a blocking condition on any PR.*

*Signed: Stacy, 2026-11-08.*

---

## After Peter's answers (2026-11-08, Stacy; appended, the verdicts above stand as written)

**Authority**: Peter, 2026-11-08T16:53:31Z, "Re: 1 & 2, Proceed as recommended". The record is `evidence/2026-11-08-peter-rulings-closeout-questions.md`, joined into this branch from `origin/chore/ruling-129-closeout-answers` at `d213deda9`.

- **CP-6: discharged; the class point stays.** I verified both runs myself through the runs and jobs APIs:
  - **Run 42502208361**: `workflow_dispatch`, branch `ci/129-merged-head-a17cb2b34`, head `a17cb2b34`, concluded `success`. All five jobs succeeded: `harness-generate`, `harness-ios-tokens`, `harness-android-tokens`, `harness-ios-components` and `harness-android-components`.
  - **The summary lines from its logs**: ios-tokens `expected=0 · observed=0`, android-tokens `0 · 0`, ios-components `66 · 66`, android-components `204 · 204`, all with `new=0 · stale=0`, plus `d2-check completeness: PASS count=23`. Each equals U12's H and M.
  - **Run 42502210216**: `workflow_dispatch` on `main` at `bf4cd7677`, which contains `a17cb2b34`. It concluded `success`, with all five jobs succeeding.
  - **So the shipped tree is now measured.** The dispatch reports under the `(unit-branch)` context names, so it is feedback, not the gate. That is enough for the measurement this finding asked for.
  - **What survives is S-1**: nothing in the workflow measures the squash unless someone dispatches it. That stays Thurgood's.
- **CP-1: Ada's diagnosis is records only.** With 15 and 15.1–15.3 ticked locally, parity reads `parent 15: PASS`, 54 of 54. That agrees with my scratch-copy run. The finding stays open until the checkbox-only PR merges. S-2, the instruments' blind spot, stands.
- **CP-3: Ada's diagnosis is no live defect, but a guard weaker than its claim.**
  - The harvest does cross the dual-instance boundary for the six package-tier token files.
  - The packed test asserts only a `progress.*` token, which never crosses the boundary, so a regression there would not turn it red.
  - The lapse itself (rule 11's `## Lapse`, then the trace or a re-rule) is still owed. The trace now has its content, so the remaining act is Ada's record edit. The weak guard is a new instance of the class "a guard weaker than its claim", and its remedy is Ada's.
- **CP-4: Ada's diagnosis is a real but minor generator gap.** `familyComment` in `src/generators/native/ThemeEmitter.ts` cannot name the bridge source, because `ThemeEmitterInput` has no field for it. That confirms the clause is unmet in shipped code, not only in the doc. The row should still read ⚠️, by a dated note below it. The fix is Ada's.
- **CP-2: still open.** The charter record `2026-10-02-consumer-generation-completeness-spec.md` stays open, under Peter's answer to Q2, until the retag of `ButtonIcon.android.kt | Unresolved reference 'ButtonIconTokens'.` to the repair record merges. Lina owns the move and Data verifies it.

*Signed: Stacy, 2026-11-08.*

## [THURGOOD] Composed-loop outcome (2026-11-08)

I read the whole pass, including "After Peter's answers", at `5386f93ba`, not only its `Standards implications:` lines. These outcomes are about what the docs and checks should teach; none re-decides what the audit concluded. The findings routed to me (CP-7, CP-8, CP-11's holder part, CP-13, and Task 18's rows in CP-9 and CP-10) come by the remediation route, not here.

- **S-1: adopted.** A spec's final unit is measured on the squash that ships. For a unit gated by contexts that do not run on push, the closeout owes a `workflow_dispatch` of those contexts on the squash, read before the CLOSEOUT pass. This was done once for 129 (runs 42502208361 and 42502210216), under Peter's 16:53:31Z answer. Vehicle: a sentence in Process-Spec-Planning § "Tasks Document Format", on the closeout unit's criteria (LAW), queued for the next spec-planning ballot.
- **S-2: adopted.** An unticked parent whose unit has merged must be visible. Vehicle: in `scripts/owed-set.sh`, my script, a fix with a falsification case under its own charter rule ("a wrong owed-set result noticed in ordinary use is fixed in the script"). A parent with a completion doc and a merged `Task N Complete` squash, but an unticked box, prints a reason naming it, not plain `open`. Parity's "not evaluated" line gets the same check as an emission, with its census.
- **S-3: adopted.** The instruments and CI-provenance grammars are published and run by nothing. A line that fails its published regex becomes a `completion-criteria-parity` emission, the named successor my charter records for the delegated-tier line. Vehicle: a parity instrument PR, with its census (parity is advisory until Q2, so an emission blocks nothing).
- **S-4: declined-with-reason.** There is one instance, 18.4, and it is mine. A parent row's status already decides acceptance, and a rule tying a subtask's tick to its parent row adds a rule for one case. Bound 1 trips when the verifier raises a question more than once. A second instance opens it. CP-7's own remedy (the four subtask docs) is mine by the remediation route.
