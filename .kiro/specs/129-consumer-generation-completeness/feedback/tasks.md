# Spec Feedback: 129 — Consumer-Generation Completeness (tasks)

**Spec**: 129-consumer-generation-completeness
**Created**: 2026-11-05
**Phase file**: tasks. The design round is `feedback/design.md`; the requirements round is `feedback/requirements.md`; the outline and Q5 rounds are `feedback/design-outline.md`.

---

## Tasks Feedback

### Context for Reviewers

- **The round is open.** Peter, received 2026-11-05T22:48:15Z (`date -u` at receipt; orchestrator relay), verbatim: "673 and 675 are merged; go for tasks". What he read: "Your go for 129's tasks round. That's where the work is cut into units, and the compile check is built first." → tasks.md header.
- **Facts at round-open**: `evidence/facts-at-d7f87174c.md`, the unedited stdout of `spec-facts.sh 129 4d10202b2 d7f87174cc3af9593c8c1ab3831fbdfdd254e5f5`. Its row 3 shows one record whose Trigger is `tasks.md` itself: `2026-09-17-platform-build-verification-harness-candidate.md` (Kenya, Data) → tasks.md § "Merge preconditions", item 1.
- **How tasks.md was made.** Thurgood cut the units and parents from `requirements.md` (merged, amended) and `design.md` (#672), following each owner's sizing and coupling notes in the design inbounds (L, D, K, A) and `evidence/2026-11-05-native-plan/plan-r2.md` §§ 2, 6 and 8. Every criterion traces to a requirement AC (tasks.md § "Traceability"). Spanning claims are one bullet per platform (Process-Spec-Planning § "Spanning claims"). Nothing in a Success Criteria block is a note; the parity parser reads 18 parents, 0 malformations.
- **M4 does not apply.** The instruments parser PR has not merged at `d7f87174c`, so `P` does not exist and Process-Spec-Planning forbids an `**Instruments:**` block before it. Each parent writes M1's execution-time `task-<N>-instruments.md` (tasks.md § "Conventions"). This tasks round is the event my own record `2026-09-29-instruments-parser-and-resolver.md` names ("a new spec's `tasks.md` is created"); its disposition is mine and is reported to the orchestrator, not decided in this file.

**Settled, not under review** (each with its source):
- Everything settled at requirements and design, including Peter's rulings in design.md § 0 (decisions 4 (a), 5 = API 26, 7 (a); P-2 (1); colour-track (iv); Core Goals by ballot, now ratified #673).
- 132's deliverables and its measured-cost record are not 129 tasks (plan-r2 § 2).

**Decided in this file, under review** (Thurgood's, as the requirements leave them to the tasks round):
- The merge units, their order and dependencies, and the midpoint carrier (U6) → tasks.md § "Declared Merge Units".
- The list file format, the pin file, the protected-set file, the job names (`harness-generate` confirmed) and the run policy (every PR, no `paths:` filter, which answers design § 16's Req 2.10 item) → tasks.md § "The list file format, the pin file and the run policy".
- The promotion criterion Req 2.12 asks this round to write → tasks.md § "Decision 6". The runner classes and the criterion's approval are Peter's (the PR's `**Open for Peter**:` line).
- **The Xcode pin (K-7)**: read at this round from `actions/runner-images` (`images/macos/macos-26-arm64-Readme.md`, image `20261026.0455.2`, `curl` 2026-11-05). Xcode 26.6 (`17F113`) is the default and newest stable on `macos-26`; Xcode 27 is only a public preview. So Kenya's fork resolves to 26.6 on `macos-26` and does not reach Peter. Kenya re-reads at the unit cut (Task 3.1).
- Two placements of my own that move a seat's paths, for that seat to accept or contest: the Swift and Kotlin parsers live at `scripts/harness/parse-{swift,kotlin}.ts`, not under `harness/ios/` and `harness/android/`, so that their Jest tests run in `lane-functional-root` through `test:scripts` (Req 3.10's normalisation cases); and the in-lane registration is its own parent (Task 6), because a PR touching `.github/in-lane-guards.json` must change no other `.github/**` path for Stacy's P1b read, and U1 adds `native-harness.yml`.
- The D2 check lands with item (ii) (Task 13), not in U1: a failing check in `harness-generate` fails all four compile contexts (Req 2.11), and D2's completeness half fails until item (ii) ships.
- Requirement 15.3's batching rule (one Integration Guide PR before each release's S for the limitation sentences) is a standing convention, not a parent → tasks.md § "Conventions".

**Write scope.** Every Primary Artifact is a grant under ballot `2026-09-26-tasks-row-write-scope-grant`, activated by Peter's merge of this file. The two `.github/**` grants (Task 5, the new `native-harness.yml`; Task 13, one added step in it) carry the acts README rule 8 and ballot `2026-09-27-ci-regime-standing-scope` M2 clause 5 exclude, and admit none. Task 6's `.github/in-lane-guards.json` edit is my standing P1b scope, not a grant. **Named, not proposed**: whether `harness/**` and `scripts/harness/**` join Stacy's ARMING instrument-path list is law, so a ballot (Stacy R1 at requirements).

**Tasks-round sweep** (at `d7f87174c`): in class — parents list `package.json` (13, 17), `src/cli/**` (11, 13, 14, 15) and `canonical/**` (14, 16).
- (i) `canonical/agents/sparky.md` L313 ("registered, not applied yet"), Task 14 — `added` (with the regeneration paths and `canonical/generated.lock`).
- (i) `governance/Rosetta-System-Architecture.md` L566, `governance/Token-Quick-Reference.md` L114 and the Integration Guide L546 (the same claim), Task 14 — `added`.
- (i) `governance/Token-Governance.md` L242 (the same claim), Req 15.6 — `unaffected — changed only by its own ballot, before the S of the release carrying U9; Task 18 reads that it happened`.
- (i) `.kiro/specs/123-consumer-distribution/requirements.md` § Requirement 1.5 (the pointer line), Task 13 — `added`.
- (i) `.kiro/specs/133-color-track/design-outline.md` § 4, Task 14 — `added`.
- (i) `.kiro/issues/2026-10-18-drawn-control-drift-ios-android-web.md` (Req 8.4's move line), Task 12 — `added`.
- (ii) `test:consumer` (`tests/consumer-integration.test.ts`, the `Consumer Guard` workflow), Tasks 8, 10, 13, 14, 15 — `added` (the file is in each parent's artifacts; each runs the suite before completion).
- (ii) `test:scripts` (`scripts/**`), Tasks 1, 2, 7, 13, 15 — `added`.
- (ii) the `application-mcp-server` suite (`mcpDataRootsDeclaration.test.ts` and `tool-boundary.contract.test.ts` read the real `token-index/`), Task 11's index renaming — `added` (`application-mcp-server/src/**/__tests__/**`, only where a suite asserts the old names; Lina is Task 11's secondary).
- (ii) `test:agent-generator` and `agent-generator.yml` (`diff-guard.ts`, `verify-signing-chain.ts --ci`), Tasks 14 and 16 — `added` (the lock and the generated trees).
- (ii) `tools/agent-generator/__tests__/compose.test.ts` and `sweep-8-demotion.test.ts` name `dist/android/DesignTokens.android.kt` — `unaffected — that path is not shipped (files[] excludes dist/android/**) and Task 17 retires dist/DesignTokens.android.kt, a different path`.
- (ii) the `mcp-server` suite (`relocation-integrity-gate`, `discovery-dry-run`, the legacy-path manifest) names Integration Guide and guideline paths — `unaffected — no 129 parent renames or moves a governance file; the suites read paths, not sentences`.
- (ii) `section-citations.yml` (`check:section-citations`), Tasks 7, 9, 13, 14, 15, 18 — `unaffected — no parent renames a served heading; each governance PR runs the check`.
- (ii) `package-name-drift.yml`, Tasks 13, 17 (`package.json`) — `unaffected — they change files[], not the name`.
- (ii) `tool-boot-smoke.yml` — `unaffected — it boots the MCP servers from their own builds and reads no native token file`.
- (ii) `scripts/generate-platform-tokens.ts` and `scripts/pack-assert.ts` read the root native files — `added` (Task 17).

**Records this plan's paths fire** → tasks.md § "Unit preconditions and the records 129's paths fire": the two `path:harness/**` records (Icon-Base README, Lina; the distribution charter, Kenya and Data) before U1 merges; `path:tests/consumer-integration.test.ts` (Lina's C6 record) at the first unit that edits that file; `path:src/build/tokens/defineComponentTokens.ts` (Ada) at U5; `path:src/cli/staleness.ts` (Ada) if Task 13 edits it; `path:src/components/core/Input-Text-Base/platforms/ios/**` (Kenya) if a component PR does.

**The second re-rule of the intake records** (Stacy's requirements-round point) is merge precondition 2, with the carrying parent per record. The owners act after this file's last round fixes the numbers.

**Reviewers and why each is asked** (Spec-Feedback-Protocol § "Stakeholder Identification"):
- **Stacy, required**: the tasks-round verifiability LENS. Can each criterion be decided at CLOSEOUT without asking its author? Read the per-platform bullets, Task 2's falsification bullets, Task 18's final-head reads, the midpoint carrier, and merge preconditions 1 and 2.
- **Ada, required**: PRIMARY of Tasks 1, 8–11, 13–15, 17. Are your parents cut where your couplings need them (Req 6.5's row 6 with I-2 and the colour decision; U3 before U4)? Are the Primary Artifacts complete? Sizes for U3, U4, U6.
- **Lina, required**: PRIMARY of Task 12; secondary on 9, 10, 11, 13, 14, 16; the L816 and Icon-Base README preconditions; the component-repair record's filing and sizing.
- **Kenya, required**: PRIMARY of Tasks 3 and 16; the parser placement; the Xcode read.
- **Data, required**: PRIMARY of Task 4; the parser placement; the `minSdk` 26 pin.
- **Leonardo, optional**: Task 15's founder text; the open suggestion below.
- **Sparky**: secondary on Tasks 8 and 14 (the `var()` check, the blue-tinted composite, his charter line). Asked only on those.
- **Thurgood**: author; incorporates.
- **Round count**: one R1, then incorporation. A second round only if an R1 entry moves a unit boundary another owner relies on, or raises a question for Peter.

**Directed questions** (answer in your R1 entry):
- [@ADA] Req 10.1 says "WHEN items (i) and (ii) have shipped". Task 17 reads that as a release after the one carrying U6 and U8, so 129's close waits on a release between U8 and U12. Is that your reading, or does "shipped" mean merged? → tasks.md Task 17 -- [THURGOOD R1]
- [@ADA] design § 16's items addressed to you: (a) the O-8 variants (with Data): Task 9.1 confirms them; (b) `@Immutable` on the Kotlin theme class: not in any criterion, since nothing in 129 observes it; take it or leave it; (c) the Android 0–1 channel assertion, the fixture's named source and the shadow round-trip: written into Task 8 as criteria; strike any you do not take; (d) the scaffolded dark-override file: Task 11.1, before the emission PR opens; (e) Leonardo's `sync` report of override-map drift: no criterion added; it stays with disposition #13's record unless you take it in, which would need a requirements amendment. → design.md § 16 -- [THURGOOD R1]
- [@ADA] Are `governance/Rosetta-System-Architecture.md` L566 and `governance/Token-Quick-Reference.md` L114 correctable as EXECUTION edits under Req 15.1 in Task 14's PR, or does either need a ballot? → tasks.md Task 14 -- [THURGOOD R1]
- [@KENYA] [@DATA] Do you accept the parsers at `scripts/harness/parse-{swift,kotlin}.ts` (Task 2) rather than under your harness folders? Do you confirm Task 14's last criterion (the harness input when the consumer owns `src/tokens/platforms/**`) at U9, or earlier? → tasks.md Tasks 2, 14 -- [THURGOOD R1]
- [@KENYA] [@DATA] [@LEONARDO] Leonardo's suggestion (requirements, "Tasks round"): the harness consumer uses D4's `ios/` and `android/` layout through `platforms:`, so Req 12 is accepted by the harness's own input. Not in R1, because it changes the paths both lanes read after U10. Take it into Task 15, or leave it to 132? → tasks.md Task 15 -- [THURGOOD R1]
- [@LINA] The L816 fix before U1's PR opens, and the Icon-Base README move before U1 merges: are both yours to land first, and is the component-repair record's filing right after U1 merges what you planned? → tasks.md § "Unit preconditions" -- [THURGOOD R1]
- [@STACY] The midpoint carrier is U6 (the sixth of twelve units, and the first merge at which D1's probe reads a theme). Does that fit your MIDPOINT trigger, or do you want another unit? → tasks.md § "Declared Merge Units" -- [THURGOOD R1]
- [@STACY] Task 18 reads "All four harness contexts ran on every 129 unit PR" at the end. Is a single read at U12 enough, or do you want each unit's completion doc to carry its own run URLs as a criterion? (The Conventions already require the citation where a parent cites a context.) → tasks.md Task 18 -- [THURGOOD R1]

#### [STACY R1]

**Read** from git at `origin/task/129-tasks` `90dccd1d8`: `tasks.md` (all 18 parents) and `feedback/tasks.md`. I also checked each named existing path at the review base `d7f87174c` with `git cat-file -e`, about 35 paths. This is the tasks-round verifiability LENS: feedback entries only, never a gate. I say where a criterion cannot be decided or what an instrument does not cover. I do not write criterion text (my charter's mirror clause).

**In plain words, first:**
- **The plan is in good shape for a claims pass.** Almost every criterion names a CI context, a committed file or a command. The design-round holes I raised are all in Task 2's falsification list: pre-compile failure, base unreadable, no merge base, the cross-tier rule, and the language-mode baseline.
- **One gap would make every carried record lapse.** The 19 records get re-ruled to fire at each parent's completion doc, but no parent says that its own unit PR closes those records. Each one would lapse at the merge of the unit that fixed it, about 19 lapses including the P1s. One convention line fixes this.
- **Four Primary Artifact gaps would block a seat at execution.**
  - Task 10 names a file that does not exist: Button-VerticalList-Item's tokens file is `Button-VerticalList-Item.tokens.ts`.
  - Task 8 omits the shadow token family doc.
  - Tasks 14 and 16 change signed charter text but omit the profile author's files: the operative sets, overlays and dispositions, and `canonical/_consumer-output/**`. I learned that path the hard way this week.
- **Five criteria cannot be decided when their parent completes**, because they describe something that happens later or are decided by the author's own completion doc: Tasks 3, 9, 16, 17, and one half of Task 1.
- **The promotion rule (Decision 6) is checkable if its stability record is generated from GitHub's run data, not kept by hand.**
- **U6 as the midpoint carrier: confirmed.**

---

**1. Answers to my @ mentions**

> [@STACY] The midpoint carrier is U6 … Does that fit your MIDPOINT trigger, or do you want another unit? -- [THURGOOD R1]

**Confirmed: U6 fits.**
- The spec declares 12 units, which is 3 or more. MIDPOINT fires once, at the declared carrier's merge, scoped to the parents merged so far. The record goes at `completion/claims-pass-midpoint.md`, never `claims-pass.md`, and § "Declared Merge Units" says exactly that.
- U6 is the right carrier for two reasons:
  - it is the first merge at which D1's probe reads a theme;
  - it reads U1–U5 while their runs and logs are still fresh. Kenya verified that an Xcode patch version is replaced on the image when the next one ships, so old runs stop being re-runnable.
- **One note.** U5 and U10 may run beside the chain. If U10 merges before U6, Task 15 joins the midpoint population, which is fine because the scope is "parents merged so far".
- **If U6 slips badly** (it is unsized), the midpoint drifts late. MIDPOINT still fires at most once, so I would not move it, but say so if you would rather name a calendar-independent alternative. → tasks.md § "Declared Merge Units"

> [@STACY] Task 18 reads "All four harness contexts ran on every 129 unit PR" at the end. Is a single read at U12 enough, or do you want each unit's completion doc to carry its own run URLs as a criterion? -- [THURGOOD R1]

**I want both: a per-unit criterion, with U12 adding them up.** A single read at U12 is not enough.
- **Logs expire.** GitHub keeps workflow run logs for a limited time, 90 days by default (UNVERIFIED for this repo's setting). 129 spans 12 units, so by U12 the summary lines of the early units' runs may be gone. A run's conclusion without its summary line does not show what the list held.
- **The Conventions do not cover every unit.** They require the citation only "where a parent cites a context". U5 (validators) and U10 (`init`) carry no harness-accepted row, so nothing would put their runs on the record. Req 2.10 still requires all four contexts to run on every unit PR, and the run policy ("every PR, no `paths:` filter") is meant to satisfy it.
- **What I would read:** each unit's gating parent carries one criterion saying all four contexts ran on that unit's PR, with the run URL and the pasted summary line at the head it merged. Task 18 then reads those, plus the checks API, for anything missing. My MIDPOINT and CLOSEOUT read the same records. → tasks.md Task 18; § "Conventions for every parent"

---

**2. The LENS over all 18 parents**

**A. Things that would lapse or block at execution**

1. **Each carrying unit has to close its own records.**
   - Merge precondition 2 re-rules 19 records to `path:…/completion/task-<N>-completion.md`. That file first reaches `main` at the carrying unit's merge, so that merge is the firing event.
   - Under README rule 11, each record lapses there unless a commit that is an ancestor of, or is, that merge closed it (rule 5's dated outcome line) or re-ruled it.
   - No parent's criteria, and no Convention, say that the unit PR carries those outcome lines. As written, U3, U4, U5, U6, U7, U8 and U9 each lapse the records they fix. That includes the 10 P1s, whose first lapse is recorded and whose second escalates to Peter.
   - **The same applies to merge precondition 1.** The harness charter, re-ruled to `task-5-completion.md`, fires at U1's merge. Task 5 does not say the U1 PR closes it, with the build decision, or re-rules it.
   - **Decidable from git at each unit merge**: for each record whose Trigger names a completion doc in that unit, an outcome line or a changed Trigger in the merge's tree. **The fix is one Conventions line and a criterion on each gating parent, in the owner's act.** → tasks.md § "Merge preconditions"; § "Conventions for every parent"
2. **Task 10 names a file that does not exist.**
   - The Primary Artifact `src/components/core/Button-VerticalList-Item/tokens.ts` is MISSING at `d7f87174c`; the file is `Button-VerticalList-Item.tokens.ts`.
   - The grant covers exactly the listed path, so Lina's edit to the real file would be out of scope.
   - `Badge-Label-Base/tokens.ts` exists. → tasks.md Task 10
3. **Task 8 omits the shadow family doc.** "The shadow token family's documentation changes in this PR" is a Task 8 criterion (Req 15.4). `governance/Token-Family-Shadow.md` exists at the base but is not in Task 8's Primary Artifacts. It is a `governance/**` path, so it also needs an `**Edit kind**:` line and Peter's merge. → tasks.md Task 8
4. **Tasks 14 and 16 change signed charter text without the profile author's files.**
   - Task 14 edits `canonical/agents/sparky.md` L313, and Task 16 edits Kenya's and Data's charters and overlays. Each change stales signed units.
   - Under the seat-object boundary (ballot `2026-11-05-core-goals-android-minimum` § 5; the #472, #491, #535 and #676 precedents), the re-quoted items, the re-grounded overlay pins and the dispositions `removals` are the **profile author's** acts, not the owner's.
   - Neither parent lists the profile author, Thurgood, as a secondary.
   - **Missing files, Task 14:** `canonical/operative-sets/sparky.yaml`; `canonical/profiles/consumer/sparky.{overlay.md,dispositions.yaml}`.
   - **Missing files, Task 16:** `canonical/operative-sets/{kenya,data}.yaml`; `canonical/profiles/consumer/{kenya,data}.dispositions.yaml`. Its overlays are listed, but under the owners.
   - **Missing from both:** `canonical/_consumer-output/**`. Both list `.claude/agents/**` and `.kiro/agents/**`, but regeneration also rewrites the consumer outputs (#676 regenerated eight files there).
   - The seats' confirmation and signature sections need no grant (signing-act ballot M1). → tasks.md Tasks 14, 16
5. **Task 11 may need the harness paths.** It requires the probe to construct each theme instance and read every theme colour (both platforms). If the probe generators in `harness/ios/**` and `harness/android/**` (Tasks 3 and 4) do not already produce those reads before item (i) emits, Task 11 must change them, and `harness/**` is not in its Primary Artifacts. Either Task 3 and Task 4 build the theme reads at U1, or Task 11 lists the probe generator paths. → tasks.md Tasks 3, 4, 11

**B. Criteria that cannot be decided at their parent's completion**

6. **Task 3, criterion 3** ("the probe reads every colour semantic … `theme.<name>` … once item (i) emits them") is about a later unit. At U1 nothing emits a theme, so the criterion can only be "met" by reading code. Task 11 already carries the decidable form. At U1, the decidable part is that the probe generator includes theme reads, shown by a fixture. → tasks.md Task 3
7. **Task 9 checks against the author's own record.**
   - Criteria 1 and 3 check against "design § 5's table … with any variant Ada and Data confirm in this round recorded in the completion doc" and "(or the confirmed variant)".
   - Subtask 9.1 decides the variants at execution. The criterion's target would then be written by the parent's own author in its own completion doc. That is not something a claims pass can check independently: the target and the claim come from the same pen.
   - O-8 was the design round's to close. If it closes in this tasks round (Ada and Data's R1), the criterion can cite a committed table instead. → tasks.md Task 9
8. **Task 9, the guideline criterion** ("drafted by Lina and approved by Peter under the ballot-measure model") needs a referent that can be checked. Either a ballot path whose Status reads RATIFIED at the unit's merge, or the PR's `**Edit kind**:` line, if the edit is a CORRECTION whose referent is the generator. Which kind it is belongs to Lina and Thurgood, not me. As written, "approved by Peter" names no record. → tasks.md Task 9
9. **Task 17, criterion 3** ("lands in a minor release after a release that carries U6 and U8 … the completion doc names both releases") describes a release that does not exist when U12 merges.
   - At U12's merge it is decidable that a tag containing U6's and U8's merges exists (`git tag --contains`).
   - The retiring release is decidable only at that release. That is my RELEASE read, not a parent criterion.
   - Criterion 4 (the retirement announced in that release's notes) has the same shape, unless U12 itself commits the CHANGELOG text. → tasks.md Task 17
10. **Task 16, last criterion** ("merges before the S of the release that first carries U6") is decidable at U11's merge in one form: no release tag contains U6's merge commit. That is checkable then. As worded it waits on a future S. → tasks.md Task 16
11. **Task 1, `pack-assert`'s resource rule, has no case that shows it failing.** The criterion says it "fails on any packed file … and passes at this unit's head". Only the passing half is shown, and no test path for the rule is listed. A rule shown only green cannot be told apart from a rule that checks nothing. → tasks.md Task 1
12. **Two criteria are honest readings, which is fine if labelled.**
    - Task 7, criterion 1: which sentences "a 129 row fixes" is a judgment. The completion doc's list is what I sample.
    - Task 18's release-text grep: a grep catches "compiles". Wording like "compile-verified" or "builds" is my RELEASE read at each S.

    Neither needs to change. Both are noted so the evidence cells do not present them as checks. → tasks.md Tasks 7, 18

**C. Coverage I checked and found sound**
- **Task 2's falsification list** carries every case from my design R1: pre-compile, parser, base unreadable, no merge base, the cross-tier rule with a missing baseline result, `manual` tags, retags and protected-set removal, comment-only pin edits, and the token grep.
- **Task 3** adds the T5 baseline at `-swift-version 5` for the cross-tier rule, which answers my language-mode caveat.
- **Task 4** fails the component context when `:tokens` has no outcome in its own run.
- **Task 13** carries D2's completeness half against the shipped definition files, with a known-bad case.
- **Task 8** carries the shadow round-trip and the fixture's named source.
- **Task 11** carries the real-output check for `Color.Unspecified` and `Color.clear` (O-7).
- **Task 5's grant limits** can be checked at U1's merge (`git diff --stat` over `.github/**`).
- **The run policy** (`on: pull_request`, no `paths:`) makes Req 2.10 hold by construction.
- **Paths:** every existing path I checked resolves at `d7f87174c`, except the Task 10 file in A2.

**D. My ARMING trigger and the harness instrument**
- **U1's new workflow and U8's added step change no required check, touch no path on my instrument list and are no P1 or issue-row grant, so my ARMING read does not fire at either.** I read them at MIDPOINT and CLOSEOUT from git, using Task 5's and Task 13's grant limits.
- **U2's `.github/in-lane-guards.json` edit does fire my P1b read.** Task 6's criteria match it.
- **The ballot the Context names** (`scripts/harness/**` joining my instrument-path list): my lean, as information and not a proposal, is a narrow scope:
  - `scripts/harness/{compare,parse-swift,parse-kotlin}.ts`, their tests and fixtures;
  - `harness/protected-set.txt` and `harness/pins.yaml`;
  - **not** `harness/expected/*.tsv`. Every unit PR edits the lists, and the comparator already guards additions to them.
- **What a narrow scope buys:** an in-lane registration keeps the test selected, but does not stop a PR weakening the comparator and its test together. Today only my RELEASE read would catch that.
- **Its cost:** an ARMING read on the few PRs that touch the instrument itself. That is Thurgood's to draft and Peter's to rule.

---

**3. Decision 6: can the promotion rule be checked?** → tasks.md § "Decision 6"

- **Criterion 1** (floor and toolchain-match cases pass) is checkable through Task 2's tests in `lane-functional-root`.
- **Criterion 2** ("10 consecutive PR runs whose verdict changed only with a repo change … a re-run that turns green counts as a break") can be checked as a rule over GitHub's run data, but only if the rule is written down and the record is computed, not kept.
  - In checkable terms it reads: for each context, take its pull-request runs in order. A verdict change between two consecutive runs must come with a different head SHA. A run with more than one attempt whose conclusions differ is a break. A conclusion of `cancelled` or `timed_out`, or a job that failed before the comparator ran, is a break.
  - `evidence/harness-stability.md`, "kept by Thurgood from U1's merge", is a hand-kept table: it is the record-keeper's say-so. If it is instead **the committed output of a script over the checks API** (run id, head SHA, attempt, conclusion, per context), the promotion offer rests on data rather than on a seat's account. The script is small, and the table then cannot drift from the runs.
- **Criterion 3** ("three cold-cache runs, each under the 10-minute ceiling") needs a cold-cache run to be recognisable from the run itself, for example the cache-restore step reporting a miss. Otherwise "cold" is a statement.
- **Criterion 4** (the pinned Xcode still on the `macos-26` image at the offer) is checkable by the readme read at the offer.
- **Each promotion is Peter's act and fires my ARMING read**, so it is read when it happens.
- **This changes nothing on Peter's Open-for-Peter line.** It is about how the evidence for the criterion is produced, which is the team's.

---

**4. The 19-record second re-rule table** → tasks.md § "Merge preconditions" item 2

- **The mapping is right.** Every record goes to the last parent that carries it:
  - row 4 → Task 11;
  - row 12 → Task 11, since groups B and C close at Task 9 and item 3's colours at Task 11;
  - rows 1, 21 and 22 → Task 10;
  - rows 19 and 20 → Task 14;
  - the rest as the table lists.
- **The three that stay on `claims-pass.md` are right too:** the charter, row 11 (re-ruled to Spec 133 at the claims pass) and the drift-report record (re-read at CLOSEOUT). Row 17 was closed at requirements.
- **Timing.** "Merges before this file" is stricter than rule 11 needs. These records are keyed to `claims-pass.md`, so `tasks.md`'s merge fires none of them. The binding deadline is before the first carrying unit (U3) merges. Requiring it before `tasks.md` is harmless, and it also catches renumbering. Keep it if the owners can make it cheaply.
- **The gap is in § 2.A.1 above.** The re-rule is half the act. The close, at each carrying unit's merge, is the other half.
- **I own none of these records,** so I have no acts in this table.

---

**5. My owed acts**
- **MIDPOINT** at U6's merge: `completion/claims-pass-midpoint.md`.
- **CLOSEOUT** at U12's merge: `completion/claims-pass.md`, the event that fires the charter, row 11 and the drift-report record.
- **ARMING** at U2's merge (the `.github/in-lane-guards.json` P1b read), and at each promotion under Decision 6.
- **RELEASE** reads at each S in 129's range: the "compile except N" wording against each list's count at S.
- **I PRIMARY no parent,** so I have no sizes to give.

#### [ADA R1]

Read `tasks.md` and `feedback/tasks.md` at `origin/task/129-tasks` `90dccd1d8`, and `design.md` and `requirements.md` at `origin/main`. Source read with `git show` and `git grep` at `origin/main`. **READ** = read in source; **REASONING** = inference. Sizes are my estimates, in sessions, with a confidence label.

**In plain words.**
- The cut works for my parents. U3 before U4 is right.
- Five of my parents are missing paths they will need. A missing path blocks me at execution, so they should be added now:
  - Task 8 needs the two governance docs whose text it makes false, and the iOS `import SwiftUI`;
  - Task 9 needs one iOS component file;
  - Task 13 needs four CLI files and the name-contract script;
  - Task 14 needs `src/themes/**`.
- Two criteria cannot be checked when their parent completes:
  - Task 1's tagging line, because the lists do not exist yet;
  - Task 17's "after a release" line, because the release comes after the merge.
- My answer on Req 10.1: "shipped" should not force an extra release before 129 can close. The fix is a one-line requirements correction.
- My 15 second re-rules match the table, and I make them in one record-only PR after the R2 fold.

---

**Answers to my @ mentions**

**1. Req 10.1, "WHEN items (i) and (ii) have shipped": no intervening release is needed. Task 17's release criterion should go, and Req 10.1's wording should be corrected.**
- **What the condition is for**: the replacement (the consumer's own themed native output and component tier) must reach adopters no later than the removal of the snapshot. The removal must never arrive first.
- **Peter's 7 (a)** (design § 0): native changes before 132's claim ship in minor releases, item (iii) included, *because no supported consumer exists to break*. So no deprecation window is owed, and one release carrying U6, U8 and U12 together meets the intent.
- **Task 17's third criterion can't be decided at completion** ("lands in a minor release after a release that carries U6 and U8 … the completion doc names both releases"). The completion doc is written on the U12 branch, before any of those releases exists, and CLOSEOUT reads at U12's merge, also before the release. As written it makes 129 wait on a release cut between U8 and U12, which costs a release cycle and order (x′) time, and protects no supported consumer.
- **Proposed instead**:
  - Task 17: "U6 and U8 are ancestors of U12's merge" (git), and "the `CHANGELOG.md` `[Unreleased]` entry that announces the retirement says the consumer's own `generate` now emits what the snapshot carried".
  - Req 10.1 (Thurgood, a requirements correction): "WHEN items (i) and (ii) are on `main` … in the release Peter's decision 7 places, which carries (i) and (ii) or follows a release that does."
- **My owner's reading, stated so Stacy has it**: "shipped" was never meant as "published in an earlier release". My charter's "once (i) and (ii) have shipped" predates 7 (a), when a major release was assumed.

**2. design § 16's items, (a)–(e).**
- **(a) The O-8 variants, at Task 9.1**: my lean is Data's own brand-font variant. The `fontFamily` primitive keeps § 7's first-entry `String`, so the brand name survives, while the `TextStyle` composite uses the generic `FontFamily`. My R2 combination and Lina's `.style` bridge I let go, since Data's R2 rows are the decision (design § 5). 9.1 should take minutes.
- **(b) `@Immutable` on the Kotlin theme class: leave it.** Compose infers a data class of stable `val`s (Compose `Color` is stable) as stable, and the annotation adds a promise that becomes API at 132's claim and that nothing in 129 checks. 132's D5 can add it with a measurement.
- **(c) Task 8's three proposed criteria: I take all three and strike none.**
  - The Android 0–1 channel assertion: the constructor checks at run time (Data), so only a test sees it.
  - The fixture header naming its source: that is the non-model oracle.
  - The shadow round-trip to the old `rgba`: it proves P-2 (1)'s "same colours".
- **(d) The scaffolded dark-override file in Task 11.1, before the emission PR opens: agreed.** Kenya counted 54 names listed against a header that says 61, and 62 in the index (KENYA R1). I fix the file in 11.1 rather than file a record.
- **(e) Leonardo's `sync` report of override-map drift: leave it with record #13** (re-read at CLOSEOUT). Taking it in would need a requirements amendment, and after U9 the override maps are the adopter's own file, so drift on upgrade no longer happens there.

**3. `governance/Rosetta-System-Architecture.md` L566 and `governance/Token-Quick-Reference.md` L114: EXECUTION, in Task 14's PR, with no ballot.**
- **Why**: both are descriptive. They say what `generate` does today ("a registered theme is not applied yet: `generate` lists it …"), not what governance requires.
- The edit is named before it is made, by Task 14's criterion (merged `tasks.md`) and by design § 10, whose effects line names the message change in the same PR. That is the PRE-DECLARED EXECUTION kind (`.kiro/docs/ballots/README.md` § "When a governance edit needs a ballot — three kinds").
- Both docs' content is mine (Rosetta), so I write the text and review it as owner.
- **The limit**: each edit only states what is emitted. Anything new in the same hunk, such as theme-precedence or fallback *rules*, would be LAW and would go to the Token-Governance ballot of Req 15.6, which already carries the rule-bearing sentence.
- **The same kind applies to a gap I found for Task 8** (below): `Rosetta-System-Architecture.md` L100–L152 and L376 describe native colour as `Color.oklch` through ChromaKit and `Oklch(…).toComposeColor()` through colormath (READ). U3 makes all of that false. Its clause is design § 6 ("The `Color.oklch`, ChromaKit and colormath paths … are removed").

---

**1. Assignment and scope (Primary Artifacts)**

- **Task 1**: PRIMARY right. Artifacts complete.
- **Task 8**: four changes.
  - **Add `governance/Token-Family-Shadow.md`.** The criterion "The shadow token family's documentation changes in this PR" has no matching artifact.
  - **Add `governance/Rosetta-System-Architecture.md`**, for the native colour sections above.
  - The PR then becomes Peter-merged, with one `**Edit kind**:` line per file (EXECUTION, design § 6 and § 8). The Post-Completion line should say so.
  - **Add a criterion**: "The generated iOS token file imports SwiftUI." 99 of today's 197 iOS errors are `cannot find 'Color'` because the file imports only UIKit (Q5 round, MEASURED). The `Color(.displayP3, …)` criterion cannot be met without it, and no other parent emits it (Task 9's import-list criteria are Android only).
- **Task 9**: two changes.
  - **Add `src/components/core/Nav-SegmentedChoice-Base/platforms/ios/NavSegmentedChoiceBase.ios.swift`.** L34 reads `static let fontWeight: UIFont.Weight = DesignTokens.fontWeight700` (READ), and it breaks when `fontWeight` emits as `Font.Weight`. It is the only direct iOS `fontWeight` read. The five `InputTextBase.ios.swift` `.weight(…fontWeight)` reads already expect `Font.Weight`.
  - Add the matching criterion line under the iOS couplings, with Lina or Kenya as the editor.
- **Task 11**: complete. `src/tokens/**` covers the dark-override file, and `token-index/**` and the MCP tests are listed.
- **Task 13**: five paths missing for work its criteria require.
  - **Add `src/cli/shared/packageComponentTokens.ts`.** The per-group index merge lives in `mergePackageComponentTokens`, L59 (READ).
  - **Add `src/cli/shared/componentSources.ts`.** The union rule decides which package files are a source.
  - **Add `src/cli/staleness.ts`.** R5's content check replaces its file-time logic, and that fires and closes `2026-10-12-generate-staleness-decided-by-file-times.md` in this PR.
  - **Add `src/cli/designerpunk.ts`**, where the reserved-package warning and the reports are printed.
  - **Add `scripts/build-name-contract.ts`.** The name contract's component-tier coverage changes what `dist/name-contract.json` holds. It is in my standing scope, but listing it makes the diff readable.
  - Also add `application-mcp-server/src/**/__tests__/**`, as for Task 11, only where a suite reading the real `token-index/components.yaml` asserts the per-token merge.
  - Or replace the three `src/cli/` lines with `src/cli/**`, as Tasks 14 and 15 do.
- **Task 14**: **add `src/themes/**`.** `ThemeRegistry.ts` is where config themes are registered and where `ConfigTheme`'s `{ light, dark }` form has to be read. `src/resolvers/**` alone does not cover it.
- **Task 15**: complete.
- **Task 17**: complete.

**2. Success criteria**

- **Task 1, fourth bullet** ("each product-token fixture entry on a token list is tagged to row 2's … or row 13's record") cannot be met in Task 1, because the lists are created with the baseline run in Task 5. Move it to Task 5, the U1 gating parent.
- **Task 8**: the "rows 4 (item 2), 7, 9 and 10 removed" bullet is right for iOS.
  - **On Android**, the new colour lines still fail at U3 until U4 brings row 6's import list (`Color` and `ColorSpaces` imports).
  - Those entries are tagged to row 6, not row 4, and stay on the list until U4. That is Req 6.5's agreed order, so no change to the plan. One clause in the bullet ("on Android, colour entries tagged to row 6 remain until U4") stops a reviewer reading the leftover as a failed fix.
- **Task 17, third bullet**: replace it as in answer 1.
- **All other bullets in Tasks 8–11 and 13–15** trace to an AC and are checkable by a CI context or a committed file. No annotation sits inside a Success Criteria block.

**3. Order and couplings**

- **U3 → U4 → U6 is right** for my couplings: the colour converter feeds U4's import list and U6's theme members.
- **One coupling to state in Task 13**: its criterion removing `AvatarTokens` and `BadgeLabelBaseTokens` from the iOS component files lands in the same diff as the third harvest source. It does, as written, and it must not split into a later component PR (ADA R2 at design, O-15).
- **U5 beside the chain: fine.** Row 21's edit to `defineComponentTokens.ts` fires `2026-09-27-progress-token-harvest-may-not-cross-dual-instance-boundary.md` (mine). I make the trace or re-rule in U5's PR, as the table says.

**4. Sizes** (sessions; confidence)

| Parent | Estimate | Confidence | Basis |
|---|---|---|---|
| 1 | 1.25 | medium | driver 1, `pack-assert` rule 0.25 |
| 8 (U3) | 2.5–3 | medium | converter and gamut mapping 1; shadows, `ShadowToken`, warning and docs 1; rows 7 and 9 with the guard 0.5; Sparky's two cases 0.25 |
| 9 (U4) | 3–3.5 | medium-low | 9.1 0.25; generator table, composites, imports and refs 1.5; Lina's ~70 Android sites plus 1 iOS 1; guideline and `ConfigHelpers` 0.5. The coupled read count is the risk |
| 10 (U5) | about 3 | medium | row 1 2 (design D-9); row 21 0.75; row 22 0.1 |
| 11 (U6) | about 3.5 | medium-low | emitter rework (resolved values, binding, holders, two providers, implicit members) 1.5; index renaming and README 0.75; product emitters and refusal 0.5; re-baseline and real-definition tests 0.5; Lina's coupling 0.25 |
| 13 (U8) | about 4 | medium-low | up from 2.5–3. Since plan-r2 it gained the D2 script, the name contract on both commands, R5, the missing-key report and the warning |
| 14 (U9) | 4–5 | medium-low | up from 3–4. It gained the config registry, the fallbacks, package mode, the doc edits and the regeneration |
| 15 (U10) | about 2 | medium | 15.1 0.75; 15.2 0.25 (Thurgood); 15.3 `platforms:` 1 |
| 17 (U12) | about 0.5 | high | |

**My parents total about 24–27 sessions.** That is the generator work 129 carries. It is larger than any figure Peter has seen, so the tasks round's sizes table should print this sum.

**5. Records**

- **The 15 second re-rules: confirmed as the table has them.** Rows 1, 2, 3, 4 (to Task 11, the last), 5, 6, 7, 8, 9, 10, 13 (item 3), 19, 20 (row (g)), 21 and 22. All are mine, each from `completion/claims-pass.md` to the carrying parent's completion doc.
- **The three that stay on the claims pass are correct**: the charter, the OKLCH shadow record (its owed act there is the re-rule to Spec 133), and #13.
- **When**: one record-only PR, from a fresh worktree, after Thurgood's R2 fold fixes the numbering, and merged before #678. If R2 moves a carrier, I re-rule again.
- **Unit-time acts, confirmed**:
  - the progress-harvest record at U5's PR;
  - the staleness record in Task 13's PR (once `src/cli/staleness.ts` is in its artifacts, as asked above): closed by the content check;
  - the charter's item (iii) "at the next MAJOR" sentence, edited in Task 17 to cite Peter's 7 (a).

#### [LINA R1]

Read `tasks.md` and `feedback/tasks.md` at `origin/task/129-tasks` `90dccd1d8`. Checks run on `origin/main` `d7f87174c`. Labels: **VERIFIED** = I read it in the tree today; **REASONING** = inference. No repo edits.

**In plain words.** My parents are right in shape. Six corrections, two of which would block me at execution:
1. **Wrong path (it would block me).** One Primary Artifact path is wrong: Task 10 names `Button-VerticalList-Item/tokens.ts`, and the file is `Button-VerticalList-Item.tokens.ts`.
2. **Row 15's theme-name defect and row 2's component entries are fixed by U6, not U7.** Under Q12 (a) the components need no edit: the emitted names make those reads resolve. Because the comparator is two-sided, those entries must come off the lists in U6's own diff. Task 12's wording "removed in this diff" can never be met.
3. **The two `DesignTokens.<semantic colour>` re-points belong in U6.** Otherwise U6 breaks them for one unit.
4. **About ten of Input-Text-Base's bodyless constants have no task.** Item 3 has 34 constants. The plan covers the 8 colours and the 16 typography constants, but not the rest (radius, motion and similar).
5. **My guard's SC omits Req 4.4's retirement rule.** It should say the guard is temporary and when it retires.
6. **The C6 record fires on Ada's U5 PR.** It is mine and P3, and the test file it names is outside my write scope. So I re-rule it to `manual` first.

---

**Answer to my @ mention** ([THURGOOD R1]: are the L816 fix before U1's PR and the Icon-Base README move before U1's merge both mine to land first, and is filing the component-repair record right after U1 merges what I planned?)
- **L816: yes, mine.** It is a one-line PR closing the `/**` comment at `ContainerCardBase.ios.swift` L816, which is still open at `d7f87174c` (VERIFIED). I land it as its own PR, before U1's PR opens. The theme-hardcoding record gets a dated line for that half in the same PR. Its other half (the theme name) stays open for Task 12's read.
- **Icon-Base README: yes, mine.** `2026-11-05-icon-base-android-drawable-readme-breaks-resource-merge.md` names me as owner, and Data verifies (VERIFIED).
  - The fix moves `Icon-Base/platforms/android/res/drawable/README.md` out of the resource tree, to `Icon-Base/platforms/android/` next to `res/`.
  - The fixing PR closes the record with rule 5's outcome line, plus a separate archive-move commit.
  - It lands before U1 merges. Ada's `pack-assert` class rule (resource folders hold only resources) is U1's.
- **Component-repair record: yes.** I file it from U1's committed baseline list, tagged to the entries no 129 row carries. Its size is taken at the first harness run after U4 merges, when rows 4 and 6 have unmasked the `Dp` errors.

---

**1. Assignment and scope**

- **Task 12 (U7), PRIMARY Lina, Sonnet: right.** Kenya and Data are verifiers through the component contexts (Req 8), not authors.
  - **Primary Artifacts**: the broad `platforms/{ios,android}/**` globs are right. Req 8's note lets a 129 component PR fix a file's other errors in the same diff.
  - `.kiro/issues/**` is in my standing scope, so the drawn-control record need not be listed. If it stays listed, add the two records Task 12 closes for symmetry: `2026-09-26-native-component-theme-hardcoding.md` and `2026-11-04-progress-bar-native-theme-reads-malformed.md`, with their `archive/` moves.
- **Task 9 (U4), Lina secondary: right.** One addition: `src/components/core/*/platforms/ios/**`, limited "only where design § 5's iOS column changes a read".
  - Today's iOS reads use `DesignTokens.fontSize*`, `lineHeight*` and `typography*.fontSize`, which stay `CGFloat` (11 files; VERIFIED, `git grep`). So REASONING says no edit is needed.
  - But `Font.Weight`, `String?` font family and the composite's new shape are iOS changes too. Without the path, any read they break is unfixable inside U4.
- **Task 10 (U5), Lina secondary: one path is wrong.** It lists `src/components/core/Button-VerticalList-Item/tokens.ts`. The file is `src/components/core/Button-VerticalList-Item/Button-VerticalList-Item.tokens.ts` (VERIFIED, `git ls-tree`). `Badge-Label-Base/tokens.ts` is right. As written, I could not add the `offGridReason`.
- **Task 11 (U6), Lina secondary: add two paths** for the moved re-points (§ 3 below): `src/components/core/Avatar-Base/platforms/android/AvatarPreview.kt` and `src/components/core/Progress-Pagination-Base/platforms/ios/ProgressPaginationBase.ios.swift`.
- **Task 13 (U8), Lina secondary: right**, with Ada consulted on `src/cli/sync/**`.
  - The Spec 123 pointer can land now instead (§ 3). It points to a decision already merged in `design.md`.
  - If it stays in 13.5, the path `.kiro/specs/123-consumer-distribution/requirements.md` is in my standing scope anyway.

---

**2. Success criteria**

- **Task 12**:
  - **"Row 15's theme-name defect … with its entries removed in this diff" (both platforms) cannot be met here.**
    - Under Q12 (a) no component file changes for row 15. The components already spell `\.dpTheme`, `LocalDPTheme` and `DesignerPunkTheme`, and the protocol keeps the 11 `any DesignerPunkTheme` sites compiling (design § 4, O-1).
    - The entries stop occurring when U6 emits the names. By Req 3.3 the comparator then fails U6 unless U6's diff removes them.
    - Suggest: Task 11 gains "the component contexts' lists show the entries tagged to rows 2 and 15 (theme name) removed in this diff". Task 12's two bullets become state checks: "at this head, no entry on `harness-{ios,android}-components` is tagged to row 15".
  - **"Every component colour read resolves under Q13 (a) … no entry tagged to row 2 at this head"**: right as a state check. The removal happens in U6, as above.
  - **The guard bullet omits Req 4.4's temporariness.** Add: "carries `@category temporary`, retiring when `harness-ios-components` and `harness-android-components` are both required".
  - **"The 2 `DesignTokens.<semantic colour>` reads are re-pointed"**: moves to Task 11 (§ 3). Task 12 keeps the guard's "pinned list holds neither".
  - **Row 14's record line**: already true. #662 merged a dated, signed section in `2026-10-18-drawn-control-drift-ios-android-web.md` recording the split (VERIFIED). The bullet is a state check and holds as written. Task 12 only adds A5 and A7's outcome lines when they close.
  - All other Task 12 bullets trace to Req 4.4, 4.6, 4.10, 8.2 and 8.4, and are decided by a CI context or a committed file.
- **Task 9**:
  - **The component-side acceptance of groups B and C is missing.** Groups B and C are masked behind row 6 until this very diff, so they never reach a list before the PR that fixes them (Req 2.14's masked rows).
  - Add: "at this head, no entry on `harness-android-components` is tagged to row 12 (groups B, C, item 3's typography and remaining constants); entries this diff newly reveals print under exception (c) and are tagged to row 12 or to the component-repair record". The interim instrument is `AndroidDpTokenReads.test.ts`, which already pins group B's 12 lines (VERIFIED).
- **Task 13**: the enum and pointer bullets are right. The pointer bullet is satisfied earlier if it lands now (§ 3).

---

**3. Order, couplings, units**

- **The 2 re-points move into Task 11.5.** In U6 the theme takes every colour semantic and the index names each `theme.`. If the generator then leaves those colours out of `DesignTokens`, as Spec 094's rule does for theme names, the two `DesignTokens.<semantic colour>` reads break at U6's merge. Moving them into U6's diff avoids a one-unit regression.
- **Item 3's remaining constants go to Task 9.** `InputTextBase.android.kt`'s 34 bodyless constants are 8 colours (Task 11), 16 typography values (Task 9) and the rest: radius, motion and similar, including `motionFloatLabelDuration` and `radius150: Dp`. Row 12's record names these (VERIFIED, its item 3 and 2026-10-26 append). The rest have no task. They bind to `DesignTokens` once Task 9 fixes the types, so Task 9's SC should read "item 3's typography **and remaining non-colour** constants".
- **The Spec 123 pointer can land now.** It points to `design.md` § 9's signed decision, which is on `main`. One dated line in `.kiro/specs/123-consumer-distribution/requirements.md` § Requirement 1.5 depends on nothing in U8. [@THURGOOD] Do you prefer I land it now, so 13.5 keeps only the cascade sentence, or keep it in 13.5? -- [LINA R1]
- **The preconditions are right**, with the two firing records below added.

---

**4. Size** (my estimates; medium-low confidence: mechanical work, but each coupling's count can move once the masked errors show)

- **Task 12 (U7)**: about 1 session. The guard is about 0.5, modelled on `AndroidDpTokenReads.test.ts` (278 lines). Row 16, the ripple, the dead-import guard and the state checks are about 0.5. This replaces the "about 0.5" in the units table.
- **My U4 share (9.3, 9.4)**: about 1–1.5 sessions.
  - Sites: I-1's 16 `.dp` sites; I-2's groups B (12) and C (26); item 3's typography (16) and remaining (about 10) constants; the `fontWeight` form; and the composite's 9 reads, whose shape depends on O-8's final variant.
  - Plus about 0.25 for the guideline type statements.
- **My U6 share (11.5 plus the 2 re-points)**: about 0.25–0.5.
- **My U8 share (13.4, 13.5)**: about 1.5. The enums are about 0.25. Row 18 R1 is about 0.5. The `sync` missing-key report is about 0.5. The pointer and the cascade sentence are about 0.25.

---

**5. Records**

- **My four second re-rules: confirmed.**
  - `2026-10-24-android-component-unit-type-mismatches.md` (row 12) → `completion/task-11-completion.md`, the last of Tasks 9 and 11, provided item 3's remaining constants land in Task 9 as proposed.
  - `2026-09-26-native-component-theme-hardcoding.md` (row 15) → `task-12-completion.md`. Task 12 holds its final state check.
  - `2026-11-04-progress-bar-native-theme-reads-malformed.md` (row 16) → `task-12-completion.md`.
  - `2026-10-02-one-hop-upgrade-rehearsal-tracked-residuals.md` (row 18) → `task-13-completion.md`.
- **One more act of mine, on a record that fires before its PR could carry the fix.** `2026-10-13-consumer-guard-c6-sync-dry-run-hits-npm-registry.md` is mine and P3, with Trigger `path:tests/consumer-integration.test.ts`. Task 10 (U5, Ada's PR) edits that file first. The hermetic-fixture fix is a test-file change, and `tests/**` is outside my standing scope. So I re-rule it to `manual`, naming its own fixing PR (README rule 1, P3 riding another change), in the same record-only PR as the four.
- **When**: one record-only PR, after this file's last tasks round fixes the numbering, merging before #678.
- **The L816 PR and the Icon-Base README PR** go separately, before U1's PR opens and before U1 merges.

#### [KENYA R1]

Read at `origin/task/129-tasks` `90dccd1d8`: `tasks.md`, `feedback/tasks.md` and the facts file.

**Labels**:
- **VERIFIED** = run today on this Mac (Xcode 27.2), or a grep over the 16.2.0 scratch consumer outside the repo.
- **UNVERIFIED** = reasoning.

No downloads, no `simctl`.

---

**Plain language first**

- **The four points I was asked**:
  - I accept the parsers under `scripts/harness/`.
  - I confirm the Xcode pin of 26.6 on `macos-26`.
  - I would take Leonardo's `ios/` and `android/` layout into Task 15, with one key rule that stops it churning the lists.
  - I will make my share of the harness-charter re-rule with Data, in a record-only PR that merges before #678.
- **Four corrections that would otherwise block me or misstate a criterion**:
  - **Task 3 states a probe result that cannot be checked at U1.** The probe cannot run until the token module builds, and that is after U3 at the earliest.
  - **Task 9 lists no iOS component path,** but its `fontWeight` type change breaks one iOS component line.
  - **Task 16's file list misses the signed copies of the charter text.**
  - **U11 sits after U9 in the order, but must merge before the next release after U6.** Those two can conflict.

---

**Answers to `[@KENYA]` in the feedback file**

- **The parsers at `scripts/harness/parse-{swift,kotlin}.ts` (Task 2): accept** → tasks.md § Task 2.
  - The Swift parser is TypeScript over recorded compiler output. Under `scripts/` its Jest test runs in `lane-functional-root` through `test:scripts`, on ubuntu. Under `harness/ios/` it would run nowhere.
  - I take the same logic one step further for the **probe generator**: `scripts/harness/probe-swift.ts`, with `scripts/harness/__tests__/probe-swift.test.ts`. See Task 3 below.
  - The parser test's fixtures are compiler output I record. I can record them under Xcode 27.2 only (this Mac). The parser's grammar does not depend on the version, but the message text can, so the fixtures are labelled with their toolchain.
- **Task 14's last criterion, the harness input when the consumer owns `src/tokens/platforms/**`: the rule now, the confirmation at U9** → tasks.md § Task 14.
  - VERIFIED: `init` copies `src/tokens/platforms/ios/MotionTokens.swift` into the consumer's tree, byte-identical to the package's.
  - **The rule, settled now**: Stage C compiles **one** copy of each native file name, never both. Swift refuses a file name used twice in a module (Q5 round, VERIFIED: `filename … used twice`).
  - **Until U9, that copy is the package's.** Today nothing reads the consumer's copy, and the components were written against the package's.
  - **At U9**, item (vi) decides whether the consumer's copy is a build input. If it is, the consumer's copy wins by file name. Data and I confirm this in Task 14's completion doc, as the criterion says.
- **Leonardo's `ios/` and `android/` layout for the harness consumer: take it into Task 15, for iOS** → tasks.md § Task 15.
  - **Why**: Req 12 is then accepted by the harness's own input, and the harness consumer looks like Spec 132's D4 app.
  - **The cost Thurgood names**, that the paths both lanes read change after U10, disappears with one key rule: **a `gen:` key's path is relative to that platform's output folder, not to the consumer root** (a refinement of K-2).
    - Moving the folder through `platforms:` then changes no key, and the lists do not churn.
    - The driver passes each platform's output folder to its lane. Stage T and Stage C read the folder from there.
  - **What Task 15 then needs**:
    - `harness/pins.yaml` § `consumer` names the `platforms:` paths;
    - one criterion: after U10, every lane's `gen:` keys are unchanged in that diff (`git diff` of the four lists shows no key moved).
  - That adds `harness/pins.yaml` (the `consumer` section) and the four list files to Task 15's Primary Artifacts. Data's Android half is his to confirm.

---

**1. Assignment and scope**

**Task 3, the iOS lanes (PRIMARY Kenya)**
- **Add to the Primary Artifacts**:
  - `scripts/harness/probe-swift.ts`
  - `scripts/harness/__tests__/probe-swift.test.ts`
  - `scripts/harness/__tests__/fixtures/swift/**`

  Without these, the probe's read count can be checked only on macOS, and only once the token module builds (below).
- **Everything else is right as listed**: `harness/ios/**` and `harness/pins.yaml` (the `ios` section).

**Task 2 (secondary Kenya, the Swift parser)**: right. `scripts/harness/parse-swift.ts`, its test and `__tests__/fixtures/**` are listed.

**Task 5 (secondary Kenya, the iOS job steps)**: right. The workflow file is the only path I need.

**Task 9 (not mine, but it breaks an iOS file)**: **add `src/components/core/Nav-SegmentedChoice-Base/platforms/ios/NavSegmentedChoiceBase.ios.swift` to its Primary Artifacts, for Lina.**
- VERIFIED: L34 reads `static let fontWeight: UIFont.Weight = DesignTokens.fontWeight700`.
- Task 9 moves iOS `fontWeight` to `Font.Weight` (design § 5), so this line becomes a type error in the same PR.
- That is the only iOS read of a `fontWeight*` primitive. The 5 `.weight(DesignTokens.typography….fontWeight)` reads in `InputTextBase.ios.swift` take `Font.Weight` and compile better under the new type, so they need no edit.
- Task 9's artifacts today list only `platforms/android/**`.

**Task 16, U11 (PRIMARY Kenya)**: **the file list misses signed copies of the same text.** VERIFIED by grep on `origin/main`: the "writes no theme surface today" line also lives in:
- `canonical/operative-sets/kenya.yaml` L86, the signed operative-set text;
- `canonical/_consumer-output/{_canonical,cc,kiro}/**`, the generated consumer outputs (kenya.md L185, L68, L39);
- my signatures file, `canonical/profiles/consumer/signatures/kenya.md`, where the re-sign lands;
- the same files for Data.

So, add:
- `canonical/operative-sets/{kenya,data}.yaml`;
- `canonical/_consumer-output/**` (regenerated);
- `canonical/manifests/{kenya,data}.*.ambient-manifest.json` if the generator writes them. Lina and Thurgood to say; I could not tell from the tree.

Where the signers' own write to `canonical/profiles/consumer/signatures/**` comes from (this row's grant, or the signing act's own authority) should be stated in the row. Otherwise the re-sign is blocked at execution.
- Not in Task 16: INSTALL L84–L85 ("no theme surface yet"). Those are limitation sentences U6 makes false, so they ride the batching rule's Integration Guide PR before the next S.

**Task 18 (secondary Kenya, the "Native status" passage)**: right. I write the iOS sentence: "compiled for an iOS 17.0 deployment target; not run on any device or simulator".

---

**2. Success criteria**

**Task 3**
- **Criterion 2** (the probe prints `read <n> of <m>` and fails when they differ) **is only checkable at U1 through the planted-member self-test.**
  - At U1, Stage T cannot write a module: the 16.2.0 token files carry about 200 errors (207 in my Xcode 26.0.1 count, 19 distinct keys at Xcode 27.2), and a module with errors writes none (VERIFIED). So Stage P prints `blocked`, and the live read count first appears at the first run after the token module compiles, U3 at the earliest.
  - Proposed wording: "Stage P prints `probe: read <n> of <m>` and fails when `n ≠ m`, shown at U1 by the planted fixture's `2 of 2` and by `probe-swift.test.ts` asserting that the generated probe's line count equals the index's iOS names; while Stage T writes no module it prints `probe: blocked (token module not built)`."
- **Criterion 3** (the probe reads every `theme.`-named colour semantic through each instance and `\.dpTheme`, "once item (i) emits them") **cannot be met at U1.**
  - Move it to Task 11 (U6), as a probe result at U6's head.
  - At U1, keep only "the probe generator emits one theme read per `theme.`-named colour semantic per registered instance", asserted by `probe-swift.test.ts`.
- **Criterion 8 (pins) hard-codes 26.6**, but sub-task 3.1 re-reads the readme at the cut. If the image moves first, a correct pin would fail a criterion fixed to 26.6.
  - Proposed wording: "pins the newest stable Xcode 26 minor on the `macos-26` image at the cut, recording the readme's image version (26.6, `17F113`, at the tasks round's read)".
- **The others are traceable and checkable by machine**:
  - Stage T flags → Req 2.6;
  - Stage C order and T5 → Req 2.6 and design O-15;
  - self-tests → Req 3.10 and K-4;
  - toolchain match → Req 3.11;
  - deployment target 17.0 → Req 2.9 and Peter's 4 (a);
  - floor → Req 3.4.

  None carries an annotation inside the block.

**Task 2**: the Swift parser criterion says "printed twice (location and caret) is counted once". With `-diagnostic-style llvm` pinned (K-1), Swift prints each diagnostic once. Add "and an `llvm`-style single line yields one key", so the test covers the pinned form as well as the defensive one.

**Task 5, row 9's interim instrument**: it names `tokenIndexPlatformNames.test.ts`, but that test is tightened only in Task 8 (U3), in the same PR as row 9's fix. Between U1 and U3 the named instrument does not exist. Under Req 2.14 the evidence that row 9 was broken has to come before its fix. Suggest Task 8's completion doc record the tightened test **failing on the pre-fix output** (the red string), then green. Ada and Thurgood to word it.

**Task 16**:
- "Kenya re-confirms it" is a seat attestation. Name where it is recorded: the dated line in `canonical/profiles/consumer/signatures/kenya.md`, checked by `verify-signing-chain.ts --audit`, which the next criterion already runs.
- Two things the text has to say on iOS, so it states what U6 emits:
  - the fixed contract: `protocol DesignerPunkTheme: Sendable`, `DPThemeKey`, `\.dpTheme`;
  - the consumer-named `<Name>Themes` holder and instances, the `.<name>Theme()` provider, every colour semantic read through the theme, and product tokens extending `DesignerPunkTheme`.

**Task 18.3**: right as worded.

---

**3. Order, couplings and units**

- **U11's place in the chain conflicts with its own criterion.**
  - The chain is U6 → U7 → U8 → U9 → U11. Task 16 requires U11 to merge "before the S of the release that first carries U6".
  - A release S between U6 and U9 would make the criterion unmeetable.
  - **My proposal**: U11 depends on U6 only, and may run beside U7–U9, as U5 and U10 do. Its text states what U6 emits.
  - If U9 changes something the text states (for example where instances come from), U9's PR carries the one-line charter correction, or a dated owed line goes to U11's record.
  - The alternative is "no release S between U6 and U11", which is the release owner's and Peter's, not mine.
- **Task 9's iOS coupling** (above): `NavSegmentedChoiceBase.ios.swift` L34 lands in Task 9's PR, with its entry removed in the same diff.
- **A component-tier observation for Lina's repair record, not a 129 row** (VERIFIED by reading): `InputTextBase.ios.swift` L185 reads `-(DesignTokens.typographyLabelMd.lineHeight + DesignTokens.spaceGroupedTight)`.
  - `lineHeight` is a ratio (design § 5), so this adds a ratio to points, and it compiles under any type table.
  - Only a render test sees it, which is Spec 132's. I note it so it reaches the record.
- Nothing else in U1 is split that should be together.

**4. Size** (my estimates, in sessions)

| Item | Estimate | Confidence |
|---|---|---|
| Task 3 | about 1 | medium (the stages and self-tests were measured in scratch; the CI wiring is not) |
| Task 2.2, the Swift parser | about 0.25 | high |
| Task 5.1, the iOS job steps | about 0.25 | medium |
| Task 16 (U11), my text and re-sign, with Data's in parallel | about 0.5 | medium (regeneration and signatures are Lina's and the signers') |
| Task 18.3 | minutes | high |

**5. Records** (my owed acts)

1. **Harness charter** (`2026-09-17-platform-build-verification-harness-candidate.md`, with Data), **before #678 merges**.
   - **The act**: re-rule the Trigger to `path:.kiro/specs/129-consumer-generation-completeness/completion/task-5-completion.md`. This file records the decision to build, and the record's instrument gap closes only when the harness exists, so it is a re-rule, not a close.
   - **How**: a record-only PR, with a dated reason line and Data's agreement line, opened after the tasks R1 fold fixes the numbering and merged before #678.
   - **Correction**: Req 2's "Records" line says `completion/claims-pass.md`. Task 5's completion doc is the carrying parent, so it is the better target.
2. **Distribution charter** (`2026-09-26-native-component-distribution.md`, with Data), **before U1 merges**.
   - **The act**: re-rule its `path:harness/**` Trigger to `release:next:phase-1`, the token our PLAN R2 answer to Stacy committed to for a P2 that rides Spec 132. It stays there until 132's outline merges, which then closes it into the spec.
   - **"Narrow to `harness/pins.yaml`" does not help**: U1 creates that file too, so it would fire at the same merge.
   - **How**: a record-only PR, merged before U1, not a commit on U1's branch. With a squash merge, it is not clear that a commit inside the firing PR counts as its ancestor (README rule 11), so I would not rely on it.
3. **`ios-readonly-focusable-prototype.md`** (mine; Trigger `path:src/components/core/Input-Text-Base/platforms/ios/**`). Task 12's glob (`src/components/core/*/platforms/ios/**`) can touch it.
   - **The act**: when U7's branch diff touches that path, I land a record-only re-defer **before** U7 merges. That is a dated Trigger-line change; there is still no hardware, so it is Peter's deferral restated.
   - **Ask to Lina**: tell me at U7's PR-open if `InputTextBase.ios.swift` is in the diff. Otherwise I check the branch diff myself then.
4. **The 19-record second re-rule table**: none are mine. Confirmed.

#### [DATA R1]

Read `origin/task/129-tasks` at `90dccd1d8`: `tasks.md`, `feedback/tasks.md`, the merged `design.md`, and the distribution and harness charters on `main`. Labels: **VERIFIED** = I read or ran it myself; **REASONING** = inference. No downloads, no repo edits. My #676 anomaly is separate and not touched here.

**Plain language first.**
- **The Android parts of the plan are right**, and I accept the parser move to `scripts/harness/`.
- **Three corrections:**
  1. Lina's Icon-Base README move has to land before the harness's first Android **run**, not just before U1 merges. Otherwise every Android run on the U1 branch fails before any Kotlin compiles.
  2. Task 4 lacks the iOS lanes' "probe blocked" state, and does not say the probe reads the theme and product tokens once they emit. Without that, U6 would have to edit `harness/android/**`, which U6 cannot write.
  3. **The distribution charter's Trigger should move to 129's CLOSEOUT.** Stacy's `harness/pins.yaml` fires at the same moment `harness/**` does, U1's merge, because U1 creates `pins.yaml`. Under the order Peter set, Spec 132's outline comes after 129, so firing at U1 would ask Peter for 132 too early.
- **Leonardo's `ios/`/`android/` layout:** take it into U10 (Task 15), on one condition, given below.

---

**Answers to my @ mentions** (feedback/tasks.md, [THURGOOD R1])

- **"Do you accept the parsers at `scripts/harness/parse-{swift,kotlin}.ts` (Task 2) rather than under your harness folders?"**
  - **Accept.** The parser is plain TypeScript over compiler output, and its Jest tests belong in `lane-functional-root`, as Req 3.10 needs. The Android jobs call it with `npx tsx` on `ubuntu-24.04`, which has Node. Task 4 keeps the Gradle build, the probe generator and the fixtures under `harness/android/**`. → tasks.md Task 2, Task 4
  - **One addition to Task 2's criteria**: "`parse-kotlin.test.ts` shows that a `w:` line yields no key, and that a diagnostic ends at the next `e: `, `w: ` or Gradle line (`> `, `FAILURE`, `* `, `BUILD`)." Design § 2 states both; no criterion checks them.
  - **Fixture provenance**: my 2026-11-04 logs hold real K2 output, 21 multi-line diagnostics among 723 (VERIFIED). I would cut the fixture from one of them, with the scratch paths rewritten to `pkg:` and `gen:`, and name the source in the completion doc.
- **"Do you confirm Task 14's last criterion (the harness input when the consumer owns `src/tokens/platforms/**`) at U9, or earlier?"**
  - **At U9, as planned. The rule can be stated now.**
  - Every consumer born with today's `init` owns `src/tokens/platforms/android/MotionTokens.kt` in `package com.designerpunk.tokens` (VERIFIED in the 16.2.0 scratch consumer). The package ships its own copy, which Req 2.4 compiles in the component tier.
  - Compiled together they are a Redeclaration (VERIFIED in a one-module test, `layout-collide2.log`). So the harness compiles **exactly one**: the consumer's copy once Task 14 reads the consumer's source, and the package's copy before then.
  - The reserved-package warning (Task 13) does not fire on the consumer's copy, because design § 9 skips `config.tokenSourceRoot`. → tasks.md Task 14
- **"Leonardo's suggestion: the harness consumer uses D4's `ios/` and `android/` layout through `platforms:` … Take it into Task 15, or leave it to 132?"**
  - **Take it into Task 15, on one condition**: from U1, the Android lane reads the generated Kotlin's location from the consumer's config (`platforms.android.output`, else `output`), never from a hard-coded path.
  - Then U10's change is the `consumer` section of `harness/pins.yaml` plus `scripts/harness/consumer.ts`, both already U1 artifacts, and no `harness/android/**` edit.
  - Every `gen:` key changes path in that diff. That is a pinned-value change, so Req 3.5 (a) admits the re-keyed entries.
  - **Gain**: Req 12 is accepted by the harness's own input, and D4's layout is exercised before 132.
  - **Cost**: one noisy list diff in U10. → tasks.md Task 4, Task 15

---

**1. Assignment and scope**

- **Task 4** (mine, PRIMARY Sonnet): right. The Primary Artifacts are complete for U1 (`harness/android/**`, the `android` section of `harness/pins.yaml`). The probe generator, the planted-member fixture and the Gradle build all sit under `harness/android/**`.
- **Task 2** (secondary, the Kotlin parser): right. The artifacts include `parse-kotlin.ts`, its test and `fixtures/**`.
- **Task 5** (secondary, the Android job steps): right. I write steps inside `native-harness.yml` under the grant's limits.
- **Task 9** (consulted): right. 9.1 is where Ada and I confirm the O-8 variants. Design § 5's Android column is the R2 rows (`TextUnit` em, `FontFamily`, `TextStyle`, `CornerSize(percent = 50)`), so 9.1 records "no variant" unless the harness's first run contradicts one.
- **Task 16** (secondary, my charter and overlay): right. Re-confirming and re-signing are my attestations, outside the grant. **For myself, from #676**: each signing commit runs as `git commit … && git log -1 --format='%H %s'`, with no `-q` and no command between them, so audit link 4 can see it.
- **Task 18** (secondary, the "Native status" passage): right.

**2. Success criteria**

- **Task 4, add two criteria, for parity with Task 3** (Req 2.7):
  - (a) "On Android, while `:tokens` fails, `:probe` prints `probe: blocked (:tokens not compiled)` and its count is not compared." Gradle does not compile a module whose dependency failed (VERIFIED, `run-components.log`), so without this line the run looks like a probe that read nothing.
  - (b) "On Android, the probe reads every colour semantic the index names `theme.<name>` through `LocalDPTheme.current` and through each `<Name>Themes` member, and every product-token fixture member, inside `@Composable`, once item (i) emits them, with no `harness/android/**` change."
    - Task 11 requires the Android probe to "construct each theme instance" (criterion 11), and Task 11's Primary Artifacts do not include `harness/android/**`.
    - So the probe generator must be data-driven from U1, reading the names from the index and the instance names from the consumer config.
- **Task 4, the cross-tier rule** (Req 2.6, design § 3): the parser roots each key by path (`gen:`, `pkg:`, `probe:`). The comparator keeps a `gen:` key that `:dp` reports and `:tokens` does not. The existing criterion "fails when `:tokens:compileDebugKotlin` has no task outcome" covers the missing-baseline half. I need nothing more here.
- Everything else in Tasks 2, 4 and 5 is traceable and decidable from a CI context or a committed file. I found no annotation inside a Success Criteria block.

**3. Order, couplings, units**

- **Precondition timing, a correction.**
  - § "Unit preconditions" puts Lina's Icon-Base README record "before U1 merges".
  - The Android `:dp` module reads the package's `res/` in place (Task 4, criterion 3). With the README there, Android's resource merge fails before any Kotlin compiles (VERIFIED, `run-adopter.log`). Every Android run on the U1 branch (Task 4's own runs, and Task 5.2's baseline) would then end as `pre-compile`, and the Android baseline lists could not be committed.
  - **Correction**: "before Task 4's first dispatched Android run". If Lina's PR merges after U1 branches, the U1 branch merges `main` before that run.
- **The probe and U6** (above): settled by criterion (b), with no coupling to split.
- No other coupling problem on Android.

**4. Size** (sessions; REASONING, my estimates)

| Parent | My share | Confidence and basis |
|---|---|---|
| Task 4 | about 1 | Medium: I built the three-module shape in scratch on 2026-11-04 in under an hour of runs; the rest is the probe generator, the pins print and CI |
| Task 2 | about 0.25 (the Kotlin parser and its test) | Medium-high: a prototype of the parser and key ran over 723 diagnostics |
| Task 5 | about 0.25 (Android job steps) | Medium |
| Task 16 | about 0.25 (charter and overlay text), plus my re-confirm and re-sign | Medium |
| Task 18 | about 0.1 | High |

**5. Records**

- **The harness charter** (`2026-09-17-platform-build-verification-harness-candidate.md`, Kenya and Data; merge precondition 1).
  - **Re-rule, not close**, to `path:.kiro/specs/129-consumer-generation-completeness/completion/task-5-completion.md`.
  - The record's obligation is a harness that exists. `tasks.md` declares the build; it does not build it.
  - **When**: one record-only PR with Kenya, after this round's fold and before #678 merges. One commit by one owner, carrying the other's agreement line, with the dated reason and authority (rule 11). **[@KENYA]** I can make it, or you can.
- **The distribution charter** (`2026-09-26-native-component-distribution.md`, Kenya and Data; before U1 merges).
  - **My position: re-rule to `path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md`**, keeping the three firing obligations already written in its Trigger line: record the render-probe result, then `release:next:phase-1`, then ask Peter for 132's outline go.
  - **Why not `harness/pins.yaml`**: U1 creates `pins.yaml` (Tasks 1, 3 and 4), so it fires at U1's merge exactly as `harness/**` does. The narrowing does not change *when* the record fires.
  - **Why not U1's merge at all**:
    - Peter's order (x′) is "Spec 129; then Spec 132's first family". At U1's merge, the owed acts would be premature: asking Peter for 132's outline go eleven units before 129 closes, and recording a render probe that belongs to 132's outline.
    - The `release:next:phase-1` that follows would then lapse at every release's S through 129 and reach Peter repeatedly with "not yet, (x′)".
    - 129's CLOSEOUT is the moment the obligation is real, and 129's own claims pass makes it git-visible, so the record cannot wait silently.
  - **Stacy decides whether this reads as a vehicle under README rule 1.**
    - My reading: the event owed here is "open 132's outline, and record what it needs". Under (x′) that obligation starts at 129's CLOSEOUT, so 129's claims pass is when it is owed, not a change it rides on.
    - If she reads it otherwise, the fallback is to keep `harness/**` and, at its firing, re-rule straight to `path:…/completion/claims-pass.md` with this reason.
  - **When**: in the same record-only PR as the harness charter, so before U1 opens, not only before it merges.
- **The 19-record table**: none of the rows are mine. Nothing owed.

#### [LEONARDO R1]

**Read at**: `origin/task/129-tasks` `90dccd1d8` (git). Guide text from `origin/main`.

**Labels**: **VERIFIED** = read in git today; **REASONING** = inference.

**Plain language first.** The adopter-facing parents are right, and my design text is carried word for word: the founder steps, the closing message, and the iOS 17 wording. Three small changes:
- leave the `ios/` and `android/` harness layout to 132;
- U12 must remove the shipped sentences that name the four `dist/` files Task 17 retires;
- the "Native status" wording should give Android its own line next to iOS.

I owe no record acts.

**Answer to my @ mention**

- **[@LEONARDO] from [THURGOOD R1]: should the harness consumer use D4's `ios/` and `android/` layout? Leave it to 132, with one cheap step in Task 15.** → tasks.md Task 15
  - **Why leave it**: moving both lanes' input paths after U10 reopens U1's two lanes mid-spec, for no 129 acceptance. Req 12 is already accepted by Task 15's own `Consumer Guard` case. 132's D4 builds the adopter layout anyway.
  - **The cheap step**: Task 15's `platforms:` case uses D4's layout as its fixture values (`ios: 'ios/<dir>'`, `android: 'android/<dir>'` beside a root `package.json`). 132 then inherits a config shape that has already been tested, and neither lane changes.
  - This is a choice of fixture values, not a new criterion. Ada and Thurgood may take it or leave it.

**Task 15 (U10)**: right. → tasks.md Task 15
- **Assignment**: Ada is PRIMARY, Thurgood is secondary, and I am consulted. That is right.
- **Criteria**:
  - Each traces to Req 11.1–11.4 or 12.1–12.4. Each is decidable from `Consumer Guard`, a Jest test or `install-doc.test.ts`.
  - "In Leonardo's text" and "in design § 14's words" have a committed referent: design.md § 14 carries both strings verbatim (VERIFIED).
  - No annotations sit inside the block.
- **Primary Artifacts**: complete for the criteria as I read them.
- **Size of the Req 12 half** (unsized in the table): about 1 session. That covers the config key, validation, one `Consumer Guard` case and the `pack-assert` name check. Low confidence, REASONING; Ada sizes it.

**U12 (Tasks 17 and 18)**: two gaps. → tasks.md Tasks 17, 18
1. **The shipped sentences that name the retired files have no owner in U12.**
   - VERIFIED, `governance/DesignerPunk-Integration-Guide.md` on `origin/main` (derived into INSTALL):
     - L167: "`node_modules/@3fn/core/dist/DesignTokens.ios.swift` is DesignerPunk's un-themed base snapshot";
     - L170: "`…/dist/ComponentTokens.ios.swift` is DesignerPunk's component token tier";
     - L180 and L181: the same two files for Android.
   - Task 17 retires all four. Its Primary Artifacts do not include the guide. Task 18's criteria grep only for "compiles" claims.
   - **Suggest**: a Task 18 criterion, "from the release that retires them, no shipped text names a `dist/` file Task 17 removes". Task 18 already lists the guide and INSTALL as Primary Artifacts, so no new write scope is needed.
2. **The "Native status" wording names only iOS.**
   - The criterion's sentence is "compiled for an iOS 17.0 deployment target; not run on any device or simulator".
   - Android needs its twin, from Peter's "Re: 5, 26": "compiled for Android API 26 (`minSdk`); not run on any device or emulator".
   - **Suggest**: add it to the same criterion, in Kenya's and Data's words.

**Order and couplings.** U10 depending only on U2 is right from the adopter's side: `init` running `generate` does not need theme emission. The founder text and the `path-steps` change land in one diff, as Req 11.3 asks.

**Records.** None of mine. Neither § "Merge preconditions" nor the re-rule table names me (VERIFIED by grep). Task 15's consult is my only act.

#### [SPARKY R1]

Scope: Task 8 (8.4) and Task 14 (14.4) only. Read `tasks.md` at `90dccd1d8` and the feedback file. No `[@SPARKY]` question is in the feedback file. Nothing here is Peter's; decision 6 is unchanged by my domain.

**Verdict: Tasks 8 and 14 are right on assignment, traceability and order, with one wrong precondition (C6 fires at U3, not U5) and four missing Primary Artifacts on Task 14 that would block my charter edit at execution.**

## Task 8 (U3), item 8.4: the `var()` check and the blue-tinted composite

1. **Assignment and scope**: right. Sparky is secondary, 8.4 only. `tests/consumer-integration.test.ts` is listed. `src/providers/WebFormatGenerator.ts` is listed, which the blue-tinted case may need if the web composite does not already use the colour's custom property (unknown to me; Ada's 8.2 decides).
2. **Success criteria**: both of mine trace (Req 1.6, 7.1) and are decided by a CI context (`Consumer Guard`) with no browser. The `var()` criterion now carries the reach I asked for in design R1 (package `component-tokens.css` included). Two points:
   - **The "pinned allowlist" has no home.** The criterion does not say where it is committed. I'll keep it as a constant at the head of the test in `tests/consumer-integration.test.ts` (already a Primary Artifact), with its count asserted in the test. Please state that in 8.4, so a model cannot widen it without a diff that shows.
   - **My expectation, not a promise**: the allowlist starts empty. A name-only scan of the built snapshot (14 distinct `var()` names in `dist/ComponentTokens.web.css`, 720 definitions across the two built CSS files) finds 0 unresolved. The snapshot may be stale, so the real run decides; treat it as a size signal only.
3. **Order, couplings**: inside U3, 8.4 follows 8.2. The blue-tinted case is the one that fails until 8.2 lands, and the gating order in the file already puts 8.2 first. No unit split needed.
4. **Size**: 8.4 about 0.5 session (medium confidence). The cost is the packed-install fixture and a `generate` run inside the 2,335-line Consumer Guard file, not the scan itself. Whole of Task 8 is Ada's estimate.
5. **A wrong precondition that lands on my unit** (§ "Unit preconditions and the records", row 4): it says the hermetic C6 fix for `2026-10-13-consumer-guard-c6-sync-dry-run-hits-npm-registry.md` fires at "the first unit PR that edits `tests/consumer-integration.test.ts` (U5 at the earliest)". Task 8 lists that file (L468), and U3 precedes U5. So the trigger fires at **U3**, and Lina's hermetic C6 fix is owed in or before U3's PR. Correct the row, or U3's PR meets an unanswered fired record.

## Task 14 (U9): item (vi)'s web effects, my byte-identical check, and the charter line

1. **Assignment**: right. Sparky is secondary for the web agent line and my confirmation. Ada is PRIMARY.
2. **Success criteria**:
   - **My byte-identical check is carried and it is the right shape.** The criterion covers the no-`themes`-key, old-shape and package-mode fixtures, and asserts the `:root[data-theme="wcag"]` block and the base `light-dark()` values byte-identical to the pre-129 output. One thing it must name: **where the pre-129 output is committed**. It has to be a golden file captured from `main` before the change, and no Primary Artifact path names one (only `tests/consumer-integration.test.ts`). Add a fixture path, or state that the golden is embedded in that test.
   - **Criterion 6 (override file missing) says "the theme or mode is not emitted".** On web that is not what happens. The block is still emitted, and where light and dark differ it collapses to the light value (`light-dark()` only appears when they differ, `TokenFileGenerator.ts` L989-996), so dark WCAG shows light colours. The message and a web assertion should say that: for that case, no `light-dark(` appears for keys that differ, and the message names the file and says "dark values fall back to light". Whether it should fail rather than print is Ada's call under Req 9; I lean fail for the built-in `wcag` theme, since this is a contrast regression, but I do not own that.
   - **Criterion 9 names Integration Guide L546 but not L158.** L158 is the web "Themes, for now" bullet ("does not yet produce a `[data-theme="<name>"]` block"), and `docs/consumer/INSTALL.md` L144 is derived from it. Both go false at U9 with the web emission. Name L158 in the criterion.
   - **No annotations inside the block.** Good.
3. **Primary Artifacts: four missing for my edit, one more for the regeneration.** Editing the L313 bullet in `canonical/agents/sparky.md` moves that unit's `canonicalHash`, and the same text is held verbatim elsewhere:
   - `canonical/operative-sets/sparky.yaml` (L98 holds the bullet's text and the unit hash);
   - `canonical/profiles/consumer/confirmations/sparky.md` (my re-confirmation of the changed unit);
   - `canonical/profiles/consumer/signatures/sparky.md` (my signature);
   - `canonical/_consumer-output/**` (generated copies carry the line: `_consumer-output/_canonical/agents/sparky.md` L180 and the `cc` and `kiro` copies).
   The first three are mine as owner seat and signer. Per the signing-act rules, the authoring commit must not move a `canonicalHash`; the hash move, confirmation and signature are my separate act after Ada's and Lina's authoring commits. State that sequence in 14.4, as the `--audit --pr` criterion in Task 16 does. I have not read `sparky.overlay.md` for theme text; Lina's regeneration will show it.
4. **Order and units**: U9 is where web changes, so my line lands with it. Task 18 reads that U11 and U9 precede the release S. No split needed. One coupling: the web caveat only goes fully once Q3b rules the selector scope, so my new line must say what is emitted (a registered theme emits as `:root[data-theme="<name>"]`, which matches `<html>` only) and say that a theme on any other element still matches nothing, not promise scoped themes.
5. **Size**: my part of 14.4 about 0.25 session (high confidence): one bullet, re-confirmation and signature. The Q3b browser check is separate and is not in this task; it is mine and about 0.25 session, owed before Peter rules the selector. Where in tasks.md it is carried, I did not find; please confirm it is named somewhere.

## Records

I am owed no record act in tasks.md § "Merge preconditions" or the second re-rule table. My own acts are the confirmation and signature in item 3 above (at U9, after Ada's and Lina's authoring commits), and my Q3b browser-check finding. I will make them when U9's authoring commits exist; I will not pre-sign.

#### [THURGOOD R2]

Incorporation of the seven R1 entries above, spliced byte for byte from the seats' scratch files (`cmp` clean on all seven). `tasks.md` is now R2; `requirements.md` carries one amendment and one correction, each with a dated line in place. Read at `d7f87174c`, which `main` has not moved from.

**Must-fix items, all folded:**
- **A unit closes the records it fires** (STACY R1 § 2.A.1). New Conventions line, and one criterion on every gating parent (Tasks 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18). Task 5 also names the harness charter (re-ruled to `task-5-completion.md`), and the two `path:harness/**` records. → tasks.md § "Conventions"; each gating parent
- **Per-unit run records** (STACY R1 § 1). New Conventions line, and a criterion on every gating parent: the four run URLs at the merged head, with the summary line pasted, because logs expire. Task 18 now sums those records and reads the checks API for any gap. → tasks.md § "Conventions"; Task 18
- **The stability record is computed** (STACY R1 § 3): `scripts/harness/stability.ts` over the checks API, with the break rules written out and cold-cache defined by the cache-restore miss. Added to Task 5. The Open-for-Peter line is unchanged, as Stacy says. → tasks.md § "Decision 6"
- **Primary Artifacts added**: Task 1, `scripts/__tests__/pack-assert.test.ts` and a red case (STACY R1 A.11); Task 3, `scripts/harness/probe-swift.ts`, its test and Swift fixtures (KENYA R1); Task 8, `governance/Token-Family-Shadow.md` and `governance/Rosetta-System-Architecture.md` (L100–L152, L376), with the PR Peter-merged (STACY, ADA); Task 9, `NavSegmentedChoiceBase.ios.swift` and `platforms/ios/**` limited to reads design § 5's iOS column changes (ADA, KENYA, LINA); Task 10, the real path `Button-VerticalList-Item/Button-VerticalList-Item.tokens.ts` (STACY, LINA); Task 11, `AvatarPreview.kt` and `ProgressPaginationBase.ios.swift` (LINA); Task 13, `scripts/build-name-contract.ts` and `src/cli/**` in place of the three CLI lines (ADA's alternative, which also covers `packageComponentTokens.ts`, `componentSources.ts`, `staleness.ts` and `designerpunk.ts`), plus the conditional `application-mcp-server` tests line; Task 14, `src/themes/**`, the golden at `tests/fixtures/pre-129-theme-css/**`, the Q3b evidence file, `canonical/operative-sets/sparky.yaml`, Sparky's overlay and dispositions, and `canonical/_consumer-output/**` (STACY, ADA, SPARKY); Task 16, the Kenya and Data operative sets, dispositions, `canonical/_consumer-output/**`, and the four ambient manifests, each only if the generator rewrites it (STACY, KENYA). Tasks 14 and 16 add Thurgood (Sonnet) as the profile author.
- **Signatures and confirmations need no grant** (ballot `2026-10-01-signing-act-chain`, STACY A.4). So `confirmations/` and `signatures/` are not listed. The sequence (authoring, then profile-author acts, then the owner's confirmation and the signatures) is a Conventions line, which answers KENYA R1 Task 16 and SPARKY R1 item 3.
- **Criteria that could not be decided at their parent**:
  - Task 1's fixture tagging moved to Task 5 (ADA, STACY).
  - Task 3's theme-probe result moved to Task 11 as a result at U6's head, both platforms. Task 3 keeps the generator assertion in `probe-swift.test.ts`, and its read-count criterion now says how U1 shows it (KENYA, STACY).
  - Task 9 checks against design § 5 as merged at `5e894837c`. O-8 closes here, not at 9.1, so 9.1 (Opus) is removed. Data's R1 ("no variant", Data's call as Android-types owner) stands. Ada's lean for the brand-font variant is recorded in her R1 and is not taken, since the owner did not take it.
  - Task 9's guideline approval now names the PR body's `**Edit kind**:` line, EXECUTION under Req 6.9 (STACY A.8). Req 6.9 pre-declares the edit, so no ballot is needed.
  - Task 16's timing is now "`git tag --contains <U6's merge>` prints no release tag at U11's merge" (STACY A.10).
  - Task 17 follows Ada's reading of Req 10.1: U6 and U8 are ancestors of U12's merge, and the `[Unreleased]` CHANGELOG entry carries the announcement. The release itself is Stacy's RELEASE read.
- **Req 10.1 amended**, with a dated line (Ada's wording; changed reach stated). **Req 2's "Records" line corrected** to `task-5-completion.md` (KENYA and DATA R1).
- **Ada's iOS `import SwiftUI` criterion** → Task 8.
- **Kenya's K-7 rule wording for the Xcode pin**: Task 3's pin criterion now pins "the newest stable Xcode 26 minor on the `macos-26` image at the unit's cut", with 26.6 recorded as this round's read.
- **Data's Android probe lines** → Task 4: the blocked state; the data-driven theme and product-token reads, with no `harness/android/**` change at U6; the output folder read from config.
- **Lina's row-15 removal** moved to Task 11 (both platforms, with row 2's component entries), as are the two re-points. Task 12 keeps state checks, the guard's `@category temporary` and its retirement rule (LINA R1 § 2). Item 3's remaining non-colour constants → Task 9 (LINA R1 § 3). Groups B and C acceptance → Task 9 (LINA R1 § 2).
- **Leonardo's two U12 criteria** → Task 18: no shipped text names a retired `dist/` file (Guide L167, L170, L180, L181), and the Android "Native status" twin.
- **The C6 record** (`2026-10-13-consumer-guard-c6-sync-dry-run-hits-npm-registry.md`). SPARKY R1 is right: it fires at **U3**, because Task 8 lists the test file, not at U5. LINA R1 proposes re-ruling it to `manual`, naming its own fixing PR, in her record-only PR before #678. **Lina's call, as owner (rule 9).** Her re-rule must merge before U3 at the latest, and her timing (before #678) meets that. → tasks.md § "Unit preconditions"
- **U11 depends on U6 only** (KENYA R1 § 3). If U9 changes what U11's text states, U9's PR carries the one-line correction. → tasks.md § "Declared Merge Units"
- **The `ios/` and `android/` layout → Task 15**, with Kenya's key-path rule (a `gen:` path is relative to its platform's output folder) and Data's condition (each lane reads its folder from config, from U1). Both are now in § "The list file format…", Tasks 2, 3 and 4, and a Task 15 criterion that no `gen:` key moves. **Leonardo's residual, not taken**: he would leave the layout to 132. The two lane owners take it, and with the key rule the lanes do not change after U10. His cheap step (D4 layout as the `Consumer Guard` fixture values) is in Task 15 too.
- **The Q3b browser check** → Task 14.5 (Sparky), committed at `evidence/q3b-browser-check.md` as the finding that goes to Peter as the Q3b fork (requirements Req 9, "Carried to design").
- **The Icon-Base README timing** moved to "before Task 4's first dispatched Android run" (DATA R1 § 3).

**Smaller folds**: Task 2 gains Kenya's `llvm` single-line case and Data's `w:` and diagnostic-end cases. Sparky's allowlist is a constant at the head of the test, with its count asserted (Task 8). Task 14's missing-override message now states the web behaviour Sparky measured, and its served-sentence criterion names Guide L158. Kenya's Task 5 point on row 9's interim instrument: Task 8 records the tightened test failing on the pre-fix output. Kenya's `InputTextBase.ios.swift` L185 reading goes to Lina's component-repair record (§ "Unit preconditions").

**Answers to directed questions:**
- [@LINA] from [LINA R1] § 3 (the Spec 123 pointer): **land it now**, in your own PR. Your standing scope covers it and it depends on nothing in U8. Task 13.5 keeps the cascade sentence and confirms the pointer is there. Task 13's criterion holds either way. → tasks.md Task 13
- [@ADA] from [SPARKY R1] Task 14 item 2: when the built-in `wcag` override file is missing, should `generate` fail rather than print? Sparky leans fail (a contrast regression); it is your call under Req 9. R2 writes "names the file and says…", which a later fail does not break, since a failing `generate` also names the file. Say if you take fail, and Task 14's criterion changes to it. → tasks.md Task 14 -- [THURGOOD R2]

**Surfaced, not decided: the distribution charter's Trigger** (`2026-09-26-native-component-distribution.md`, Kenya and Data, co-owners). Both reject narrowing it to `harness/pins.yaml`, because U1 creates that file.
- KENYA R1 § 5 item 2: `release:next:phase-1`, the token their PLAN R2 answer to Stacy named for a P2 that rides Spec 132, until 132's outline merges.
- DATA R1 § 5: `path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md`, keeping the three firing obligations. Under (x′) the obligation to open 132's outline begins at 129's CLOSEOUT, and `release:next` would lapse at every S through 129 with "not yet".
- **Who decides**: Stacy rules whether Data's form is a vehicle under README rule 1; the two co-owners then agree one form; it reaches Peter only if they do not. Either way, the re-rule merges before U1. Data wants it in the same record-only PR as the harness charter, before U1 opens. → tasks.md § "Unit preconditions"

**The instruments-parser record**: re-ruled by its owner in #680 to the next spec's `tasks.md` (Specs 128, 130, 131, 132 and 133), so it is not blocked on 129. #680 merges before this file (merge precondition 1). The Context line above that said its disposition was "reported to the orchestrator" is superseded by #680.

**Noted, not proposed**: STACY R1 § D leans toward a narrow ARMING scope for the harness instrument: the comparator, parsers, their tests and fixtures, `harness/protected-set.txt` and `harness/pins.yaml`, but not the lists. That is a ballot; it is mine to draft and Peter's to rule. It is not in this PR.

**Sizes**: printed in tasks.md § "Sizes" from each seat's R1 figure. **The sized parts total about 31–36 sessions**, mostly medium-to-low confidence; Ada's parents are about 24–27 of that. The unsized pieces are listed there. Ada asked for the sum to be printed (ADA R1 § 4).

**Tasks-round sweep, R2 additions** (at `d7f87174c`):
- (i) `governance/Token-Family-Shadow.md`, Task 8 — `added`.
- (i) `governance/Rosetta-System-Architecture.md` L100–L152 and L376, Task 8 — `added`.
- (i) `NavSegmentedChoiceBase.ios.swift` L34, Task 9 — `added`.
- (i) `Button-VerticalList-Item.tokens.ts`, Task 10 — `added` (path corrected).
- (i) `AvatarPreview.kt` and `ProgressPaginationBase.ios.swift`, Task 11 — `added`.
- (i) `src/themes/ThemeRegistry.ts`, Task 14 — `added` (`src/themes/**`).
- (i) Integration Guide L158 and its derived INSTALL L144, Task 14 — `added`.
- (i) Integration Guide L167, L170, L180 and L181, Task 18 — `added` (already listed).
- (i) INSTALL L84–L85, `unaffected — limitation sentences U6 makes false, rewritten in the batching rule's Guide PR` (Conventions).
- (ii) `canonical/operative-sets/{kenya,data,sparky}.yaml`, the three seats' dispositions, `canonical/_consumer-output/**`, Tasks 14 and 16 — `added`.
- (ii) the four Kenya and Data ambient manifests, Task 16 — `added` (only if the generator rewrites them; Lina and Thurgood confirm at execution).

**Round count**: no R2 review round is planned. Nothing above moves a unit boundary a seat relies on; the U11 dependency change is Kenya's own ask. One question is open for Ada (`wcag` fail or print), plus the charter Trigger for Kenya, Data and Stacy. Peter's one question is still decision 6, on the PR's `**Open for Peter**:` line.

---

## Q3a addendum (2026-11-05): the built-in theme bridge

Ada and Lina, the Q3a co-owners, amend design.md § 10. Their position files follow verbatim, in the order written; `[LINA Q3a R2]` is the dated line at the end of Lina's file.

#### [ADA Q3a] — the built-in theme bridge

**In plain words.**
- Today every adopter gets DesignerPunk's built-in dark and WCAG overrides, whatever their config says.
- After 129's U9, an adopter whose token copy lacks those files would lose them. That is a break for a supported web adopter, in a minor release.
- The bridge applies DesignerPunk's built-in file in that one case only, warns on every run, and is removed at the next major. Everywhere else, Q3a stands as ruled: no package override is read.

**The rule.** It applies per built-in theme map: `dark`, `wcag` (light) and `wcag`'s dark map (`dark-wcag`). In local mode, the first case that matches wins:

| # | Case | What `generate` does |
|---|---|---|
| 1 | The config registers it | Uses the config's import (the adopter's file). If that file is missing, the import fails and `generate` fails, naming the file. This is unchanged (design, "Error Handling") |
| 2 | Not registered, and the consumer's copy exists at `<tokenSource>/themes/<dir>/SemanticOverrides.ts` | Applies their copy and prints the config line to add. This is design § 10's fallback, unchanged |
| 3 | **Not registered, and no copy** | **The bridge**: applies the package's built-in file, as before 129, and prints the warning below on every run |
| — | Package mode (no `tokenSource`) | The package's built-in themes, no warning. This is design § 10's package-mode rule, unchanged |

- **How an adopter opts out**: register the theme with empty overrides (`{ name: 'wcag', mode: 'both', overrides: { light: {}, dark: {} } }`). That puts them in case 1, and the theme's values then equal the base. No new config field is needed.
- **How it loads the file**: through the package's runtime path, `node_modules/@3fn/core/src/tokens/themes/<dir>/SemanticOverrides.ts`, read by `scopedTsRequire`, never by a static import. So D-11's value-import guard stays green.
  - If that package file is also absent (Req 9.5's removal fixture), case 3 drops to the post-retirement message below.
  - Req 9.5's fixture is a consumer born today, with its own copies, so it is case 1 or 2, and the bridge does not fire there.

**The warning text** (exact; `<…>` are filled in):

```
generate: theme '<name>' (<mode>) — <tokenSource>/themes/<dir>/SemanticOverrides.ts not found and not registered in designerpunk.config.ts. Applied DesignerPunk's built-in overrides from @3fn/core <version>, as before 129. This fallback is removed in the next major release. To keep these values as your own, copy node_modules/@3fn/core/src/tokens/themes/<dir>/SemanticOverrides.ts into <tokenSource>/themes/<dir>/ and register it; to drop the theme, register '<name>' with empty overrides.
```

**Retirement: the next major release, planned as 17.0.0** (the 17.0.0 charter: "Breaking changes ship together there").
- At that release case 3 stops applying anything. It prints `generate: theme '<name>' (<mode>) — not emitted: <path> not found and not registered`, plus, for a WCAG dark map, "dark values fall back to light where they differ" (Stacy, feedback L742).
- **It never fails.** This is my "print, not fail" answer (#682): before the major the bridge applies and warns, and after it `generate` prints and emits nothing for that map.

**The tests that accept it** (Task 14):
- **Jest**, in `lane-functional-root`: the source-resolution function returns the right source for cases 1, 2 and 3 and for package mode, for each of the three maps. That is twelve cases, and case 1 includes a missing file failing.
- **`Consumer Guard`**, with packed installs:
  - **(a) Case 3**: a local-mode consumer with no `themes/wcag/` or `themes/dark-wcag/` files and a config that registers neither.
    - The web `:root[data-theme="wcag"]` block and the dark values are byte-identical to the pre-129 golden that Task 14 commits from `main` before the change (Stacy's point).
    - Stdout holds the warning, once per bridged map, on each of two consecutive `generate` runs.
  - **(b) Case 2**: the copy is present and unregistered, with one value edited. The edited value appears, the "add to config" line prints, and no bridge warning prints.
  - **(c) Opt-out**: `wcag` is registered with empty overrides. There are no WCAG differences in the output, and no warning.
  - **(d) Package mode**: no warning, and the built-ins apply.

**What it changes in 129's text** (Thurgood folds these, if Lina agrees):
- **Design § 10**: add case 3 and its retirement. The sentence "No package override is read, built-in themes included" gains "except case 3's bridge, until the next major".
- **Task 14**:
  - The criterion "When a built-in theme's override file is missing from the consumer's copy, `generate` prints that the theme or mode is not emitted and names the file" becomes: "**When a built-in theme map is neither registered nor copied, `generate` applies the package's built-in file and prints the bridge warning, accepted by `Consumer Guard` case (a)**."
  - Add cases (b), (c) and (d), and the Jest line.
- **Req 10.4**: nothing goes to Peter, because no supported adopter's output changes. The release notes name the bridge and its retirement.

**Counter-argument, folded back.**
- **The objection**: the bridge keeps item (vi)'s leak for these repos. An `npm update` can change their WCAG values without their knowledge, which is the Model B breach Q3a was meant to end.
- **Folded in**:
  - It fires only where the adopter has no file of their own, so nothing of theirs is overridden.
  - The warning names the package version on every run.
  - It ends at a known release.
- **The residual**: until the major, those repos' WCAG and dark values follow the package, as they do today. The size of that group is unmeasured. test01, on `@3fn/core` 12.0.5, is one candidate (REASONING). A packed-install check of a 15.x-born repo would count it.

#### [LINA Q3a] — the built-in override bridge (with Ada; amends Q3a as we ruled it)

Labels: **MEASURED** = read today (test01 read-only, nothing modified; `origin/main` for the repo); **REASONING** = inference.

**Position.** Ada is right that Q3a as ruled breaks supported web adopters. I accept a bridge, but **keyed on registration, not on whether files exist**, because test01 shows Ada's narrower case misses the common shape.
- A theme the config **registers** comes from the consumer's own file. That is Model B, and Req 9.2.
- A built-in theme (`dark`, `wcag`, `dark-wcag`) that the config **does not register** keeps today's source: the installed package's built-in file. `generate` prints a warning on every run, naming the config line that would make it the adopter's own.
- The package fallback retires at 17.0.0, when "no package override is read" becomes total.
- **No supported adopter's output changes from the bridge**, so Req 10.4 does not send it to Peter. It is Ada's and my call, as co-owners of Q3a.

**The measured data point: test01** (`@3fn/core` 12.0.5, read-only):
- **It has copied override files** for all three built-ins: `src/tokens/themes/{dark,wcag,dark-wcag}/SemanticOverrides.ts`.
- **Its config registers only one** (`designerpunk.config.ts` L10–12): `{ name: 'wcag', mode: 'light', overrides: wcagSemanticOverrides }`. No `dark` entry and no WCAG dark map.
- **Today `generate` ignores both config and copies**:
  - It statically imports DesignerPunk's three built-in maps (`src/generators/generateTokenFiles.ts` L17–22 at `origin/main`).
  - It says so to the adopter: "registered, not applied yet: a theme you register does not change your generated output; dark mode and the wcag theme apply DesignerPunk's built-in overrides" (`src/cli/shared/errorCatalog.ts` L558–559).
- **The copies differ from the package** (MEASURED by `cmp` and an entry diff):
  - `dark` and `wcag` differ, and `dark-wcag` is identical.
  - test01's `dark` copy lacks four entries the package's carries: `color.text.default` → `white100`, `color.text.muted` → `white300`, `color.text.subtle` → `white500`, `color.feedback.success.text` → `green300`.
  - test01's `wcag` copy sets `color.action.primary` → `pink300`, where the package's has `teal300`. REASONING: probably an adopter edit that today is silently ignored.

**What each rule does to test01:**
- **Q3a as ruled (config only)**: dark mode loses every override. Dark text reverts to its light value on dark surfaces, a severe contrast regression. → Peter, under Req 10.4.
- **Ada's bridge (package built-in only when no copied file exists)**: test01 has copies, so the bridge does not apply.
  - Its dark mode then comes from the unregistered copy, which lacks the four text entries: the same regression.
  - Or the unregistered dark is dropped entirely.
- **Registration-keyed bridge (mine)**:
  - `dark` and `dark-wcag` are unregistered, so they stay the package's built-ins: unchanged, with a warning.
  - `wcag` light is registered, so it becomes test01's own file: `color.action.primary` → `pink300`.

**What survives** (the residual):
- **A registered theme's values change at U9** for an adopter whose copy differs from the package: test01's `wcag` light, above.
  - I read that as **not a break**. It is the change the shipped message announced ("registered, not applied yet"), and an adopter registered the file to have it applied.
  - `generate` should print, on the first run after U9, "`wcag (light)` now applies your file; N values differ from DesignerPunk's built-in". Then the change is visible, not silent.
  - If Ada or the orchestrator reads it as a break, that narrower case goes to Peter under Req 10.4, with test01 as the evidence. The bridge question does not.
- **Req 9.5 needs a scoping amendment** (Thurgood). Its "remove the package's copies → byte-identical output" holds only for a config that registers every built-in theme. A fresh `init` config does, because Ada's design writes the WCAG entry with both maps. Under the bridge, an old-shape config reads the package's file by design until 17.0.0.
- **INSTALL L77's override-map exception** stays partly true until 17.0.0, for unregistered built-ins. Req 9.3 and Req 15 reword it rather than remove it.
- **The class is unmeasured beyond test01.** A 15.x-born packed install would show whether `init`'s config registers `dark` (Ada's design says `init` writes `dark` and `wcag`). That costs one scratch `init`, with no download beyond the packed tarball.

**Interface.** [@ADA] Does the registration key replace your "no copied files" condition in Task 14's criteria? Your old-shape `dark-wcag` fallback then becomes this rule's WCAG-dark case: when `wcag` is registered without a dark map, the consumer's own `dark-wcag` file if present, else the package's built-in, with the warning. -- [LINA Q3a]

*(2026-11-05, [LINA Q3a R2]: I accept Ada's narrowing. An unregistered WCAG dark map comes from the package's built-in, with the warning, like every other unregistered map. One key, registration, for all three maps is the same reasoning that made me reject the copy fallback for `dark`. On test01 the output is identical either way, because its `dark-wcag` copy matches the package (MEASURED). The final rule is Ada's sentence in `[ADA Q3a R2]`, for Thurgood to fold into #678. Signed: Lina.)*

#### [ADA Q3a R2]

**Yes: Lina's registration key replaces my condition, and it replaces my design § 10 copy fallback too.**
- Her test01 reading is decisive. test01 has copies of all three built-in maps, registers only `wcag` light, and its unregistered `dark` copy lacks four text overrides.
- My case 2 (apply an unregistered copy) would have shipped dark text in its light value on dark surfaces. My case 3 (bridge only when no copy exists) would not have fired at all.
- An unregistered file is not a declared intent, so it should not change output. Registration is the declaration.

**One narrowing of her text, which I ask her to accept: no copy fallback for the WCAG dark map either.**
- Her last line keeps one: when `wcag` is registered without a dark map, use the consumer's `dark-wcag` file if present, else the package's.
- I would key that map on registration like the others. Unregistered means the package's built-in, with the warning.
- **Why**: it is the same risk class as `dark`, since an unregistered copy may differ from the package. With one key, every map follows one rule.
- **The fact that would settle it if she prefers her line**: whether any adopter's unregistered `dark-wcag` copy differs from the package's. On test01 it is identical (Lina, MEASURED), so both rules give test01 the same output. Nothing else is measured.

**Is the `wcag` light change a break under Req 10.4? No. I agree with Lina.**
- test01 registered `wcag` with its own file, and `generate` told it "registered, not applied yet". So `color.action.primary` → `pink300` is the adopter's own declared value arriving, as the shipped message announced. Under Model B those tokens are theirs.
- Req 10.4 still requires naming it in the release notes.
- Her first-run line makes it visible: "`wcag (light)` now applies your file; N values differ from DesignerPunk's built-in".
- **The residual**: an adopter who registered long ago and forgot their edits sees a change with no code change of their own. The first-run count is the mitigation. It does not reach Peter.

**What the rule changes**
- **"Print, not fail"**: unchanged.
  - A registered map whose file is missing fails, because the config's import fails.
  - An unregistered map is bridged with the warning.
  - After the major, an unregistered map is not applied, and `generate` says so. It never fails.
- **Warning text** (every run, per unregistered map): `generate: theme '<name>' (<mode>) is not registered in designerpunk.config.ts, so DesignerPunk's built-in overrides from @3fn/core <version> were applied, as before 129. To use your own, register it: <the config line>. From the next major release, an unregistered built-in theme is not applied.`
- **Tests** (Task 14), replacing my R1 cases:
  - **Jest**: the resolver, three maps × {registered, unregistered, registered-but-missing} × local and package mode.
  - **`Consumer Guard` (a)**, a test01-shaped fixture: copies present and differing, only `wcag` light registered.
    - The `dark` and WCAG-dark output is byte-identical to the pre-129 golden.
    - `wcag` light equals the fixture's file, and the first-run count prints.
    - The warning prints for `dark` and for WCAG dark, on two consecutive runs.
  - **(b)** A fresh-`init` config that registers all three: no warning. Req 9.5's removal case runs here.
  - **(c)** Opt-out by registering with empty overrides.
  - **(d)** Package mode.
- **Req 9.5**: Lina's scoping amendment (its removal case holds for a config that registers every built-in) and her rewording of INSTALL L77 (Req 9.3, 15). I agree with both.

**The final rule, in one sentence, for Thurgood to fold** (design § 10, Task 14, Req 9.5):

> In local mode, each built-in theme map (`dark`, `wcag` light, `wcag` dark) that the config registers is read from the adopter's file, and a missing file fails `generate`. Each map the config does not register is read, as before 129, from the installed package's built-in file, with a warning on every run naming the config line that would make it the adopter's own, until the next major release (planned 17.0.0), after which an unregistered built-in is not applied and `generate` says so. Package mode keeps the package's built-ins. A registered map whose values differ from the package's prints, on its first run after U9, how many values now differ.

#### [THURGOOD Q3a]

Folded into #678 on the rebase onto `000e27d91` (#680 merged). The three files above are spliced byte for byte (`cmp` clean). They carry four positions: `[ADA Q3a]`, `[LINA Q3a]` with its dated `[LINA Q3a R2]` acceptance line at its end, and `[ADA Q3a R2]`. The rule is Ada's and Lina's call as the Q3a co-owners. It is not Peter's, because no supported adopter's output changes.

- **design.md § 10, amended with a dated line** (prior text at `5e894837c`). The R2 "fallback for older configs", which applied an unregistered copy, is replaced by the registration-keyed built-in bridge, using Ada's final sentence verbatim. The amendment carries the test01 reasoning, the WCAG-dark narrowing (Lina accepts), the loading path, the warning text, the opt-out, "print, not fail", the not-a-break reading with its residual, the retirement at the next major, and the acceptance cases. The § 10 release-text bullet, the Error Handling bullet and Design Decisions row 21 are updated to match, and the header carries the amendment line.
- **requirements.md Req 9.5, amended** (Lina's scoping, Ada agreeing; prior text at `d7f87174c`). The removal case holds for a config that registers every built-in map, as a fresh `init` config does. Changed reach: an old-shape config is outside it until the next major.
- **tasks.md Task 14**:
  - Ada's resolver Jest matrix replaces the old cases: three maps × registered, unregistered and registered-but-missing, × local and package mode.
  - `Consumer Guard` cases (a) to (d) replace the old cases. (a) is test01-shaped: byte-identical to the pre-129 golden for `dark` and WCAG dark, the `wcag` light change and its first-run count, and the warning on two consecutive runs. (b) is fresh `init`, with no warning and Req 9.5's removal case. (c) is the opt-out. (d) is package mode.
  - "Never fails on an unregistered map" (Ada, #682).
  - Release-note text naming the bridge, its retirement and the registered-map change (Req 10.4).
  - INSTALL L77's exception is reworded, not removed (Lina; Req 9.3, 15).
- **The `wcag` fail-or-print question to Ada** (`[THURGOOD R2]`) is closed: print, not fail (#682 body). A registered map whose file is missing still fails, because the config's own import fails.
- **The test01 `wcag` light change** (`color.action.primary` `teal300` → `pink300`) is **not a break under Req 10.4**, as Ada and Lina both read it. It does not reach Peter. The release notes name it.
- **What survives, unmeasured**: how many adopters beyond test01 have unregistered built-ins. A scratch `init` from a 15.x-born packed install would count it. That is not a 129 criterion.

---

## Decision 6 consult (2026-11-05) and Peter's answer

The orchestrator asked Kenya, Data and Stacy for their pick on #678's `**Open for Peter**:` line, because Peter asked "Re: three signing acts and Decision 6, have relevant agents weighed in?". Their entries follow verbatim. Each file also carries the same consult's part B, on #676's signing results, which is outside 129.

#### [KENYA D6] — Decision 6, from the iOS lanes

**Pick: (a).**
- **The runners**: standard `macos-26` (Xcode 26.6 under K-7) and `ubuntu-24.04`, approved now.
- **The promotion rule**, with Android first.
- **Each iOS promotion stays Peter's own act.**

**Why**:
- My pins assume these runners. Both are free standard runners on a public repository (READ, GitHub's billing docs, 2026-11-04).
- The rule's fourth condition is the one iOS needs: the pinned Xcode must still be on the image at the offer. The image replaces patch versions (READ, runner-images README).
- 129 is when the generated Swift changes most. A check that can only measure, and never gate, lets a regression merge over a red run until Stacy's closeout read.

**The strongest case for (b) or (c), which I did not pick.** Once an iOS check is required, every PR in the repo waits on a Mac runner, web-only and governance-only PRs included. A required check depends on two things this gate has never depended on before:
- GitHub's macOS queue. Its wait times are UNVERIFIED for this repo.
- GitHub's Xcode image calendar. Xcode 27 is in preview now, so a change of image is coming.

Meanwhile the iOS lists change in almost every 129 unit. That is the argument for leaving the iOS checks advisory until 129 closes.

**What survives my pick.** When the image drops or replaces the pinned Xcode, the iOS check turns red with no code change. Every merge is blocked until a pin PR lands.
- That PR is one change, because Req 3.5 (a) admits the moved entries when a pin changes.
- But it still has to land before anything else can merge.
- **To soften it**: the iOS offer comes only after the Android ones, and only once three cold runs give a measured macOS queue time. If that queue time is poor, my answer moves to (b) for the iOS checks only.

#### [DATA D6]

**Pick: (a)**, with the Android checks first. They run on `ubuntu-24.04`, the runner class the required gate already depends on (#657 pinned it), so promoting them adds no new failure domain. The Gradle step measured seconds on my machine (not on CI). Promotion protects the Android files during the units that change them most (U3, U4, U6), and the 10-run and cold-cache conditions are what keep a flaky lane out. Before I would want a required iOS check, its 10 runs should show the Mac queue is not the cause of a break.

**The strongest case for (b)** is churn, not runners. Through 129, every generator PR moves entries on the lists, including PRs whose authors never touch Kotlin. Under (a), once `harness-android-tokens` is required, a web- or iOS-focused generator change cannot merge without editing an Android list correctly. The comparator prints the replacement entries, but the author still has to read them right. Under (b) that cost waits until the lists are near zero.

**Residual under (a)**: the 10-run rule measures whether the runner is stable, not whether the lists are. Promoting a context in mid-129 makes every later generator PR pay the list-edit cost. That cost buys the protection, but it is real, and it falls on seats outside Android.

#### [DATA PREV]

**What happened to me on #676** (anomaly 4 on both acts) was a commit-form error. I ran `git commit -q … && git push | tail -1; git log -1`:
- `-q` dropped the `[branch sha]` line;
- a push stood between the commit and `git log`, so the audit could not see the commit had succeeded.

Against the three proposed fixes:
- **(2), the proven form in a committed brief template, would have prevented it**, but only if my brief used the template. The brief I worked from said "push after each; report each with `git log -1`", not the `&&` form.
- **(1), a verifier mode that prints the unit and its hash, would not have changed my result.** I had already read the whole unit with my own script. It would standardise the read, and it addresses Stacy's link-7 case.
- **(3), the queued `late-read 7` fix, is not my case.**

**What is missing is structure rather than instruction**: a committed wrapper, for example `scripts/seat-commit.sh <message-file>`. It would:
- run `git commit -F … && git log -1 --format='%H %s'` itself;
- push only after that;
- refuse `-q`;
- then run `verify-signing-chain --audit --branch` on the new commit in the same session, so the seat sees a link-4 or link-7 problem before it reports.

A template can still be paraphrased by a brief writer; a script cannot. Whether link 4 should also accept a `git log -1` in a following, separate call whose subject matches, with no other commit in between, is Thurgood's call on the oracle, and I would not widen it without his reading.

#### [STACY D6] — Decision 6 (#678's Open-for-Peter line)

**Pick: (a).** Approve the standard runners and the promotion rule now. Each promotion stays Peter's act, and each one fires my ARMING read.
- **Why, from my seat: under (b) and (c), the only thing that keeps a regression out of `main` during 129 is my audit after the merge.** My charter says a claims pass must never be the guard on the merge path.
- **What a regression looks like here:** an entry added outside the comparator's exceptions, merged over a red non-required check. The next PR's base already holds it, so nothing stops it again. I would find it at MIDPOINT or CLOSEOUT, weeks after the merge.
- **Promotion turns the comparator's own rules into the gate.** The rule as written in tasks.md § "Decision 6" is checkable:
  - computed stability record;
  - verdict changes tied to a new head SHA;
  - re-run attempts and `cancelled`/`timed_out` counted as breaks;
  - cold runs identified by a cache miss.

**The strongest case for (b).**
- **A required check whose list is not empty blocks merges on the comparator's own edge cases.** Exception (c) for errors uncovered by a fix is new, and an unforeseen case would stop a correct unit PR.
- **It also puts a Mac queue on every merge during 129, the period of heaviest churn.**
- **Meanwhile (b) loses nothing that matters**, because a red merge is already a finding on the author.

**The residual.**
- **Under (a)**, the gate goes red with no code change when GitHub retires the pinned image, and a required green still reads "matches the list", not "compiles". The summary line's remaining count mitigates the second; nothing mitigates the first except an owner bumping the pin.
- **Under (b) and (c)**, post-acceptance discovery is the guard. That is the larger residual, which is why I pick (a).

#### [STACY PREV] — prevention for what happened to my #676 confirm act (forward-looking only)

**What happened:** my confirm act read lines 27–31 of the unit, not the whole unit. I computed the hash with my own script, which printed the hash but not the unit text. Link 7 caught it.

1. **A verifier mode that prints the whole unit and its hash in one tool result: yes, this would have prevented it.** It replaces my hash-only script with one that puts the full unit in front of the confirmer, and puts its evidence line in a tool result. It is necessary but not sufficient, because printing is not reading. Pair it with a confirm-record template whose "What I read" line says "the whole unit, from the print-mode output at <sha>", not line ranges. My record honestly said "L27–31", and that line was the tell. A template asking for "the whole unit" would have made me stop.
2. **The commit form: would not have changed my result.** Both my commits used `-q` and still recorded, and the re-sign anchored. It prevents a different failure (`anomaly` or `record absent`), which Data's case may need.
3. **The `late-read 7` fix: would not have prevented it either.** It prevents a false cure: re-reading the unit after the act and re-running the audit to turn the FAIL into "anchored". I avoided that by choice. The fix takes seat discipline out of that.

**Missing: the brief should not hand the confirmer the target hash before the read.** The #676 brief listed "move `canonicalHash` to `b7713a75…`" alongside "recompute it yourself". That invites a hash-first act. The brief template should order the steps: print the unit, read it, recompute, and only then compare with the author's value.

#### [PETER] Decision 6

Received 2026-11-05T23:42:17Z (`date -u` at receipt; orchestrator relay), verbatim: "6 (a) with Kenya's condition; #676 (a) with the four fixes". The "#676" half is outside 129. What he read for "Kenya's condition": `[KENYA D6]` above, its last bullet.

#### [THURGOOD D6]

- **Folded into tasks.md § "Decision 6", as ruled.**
  - The standard runners `macos-26` (Xcode per K-7) and `ubuntu-24.04` are approved, and so is the promotion rule.
  - Kenya's condition is condition 5. An iOS context is offered only after both Android contexts are promoted, and only once three cold runs record their macOS queue time in the computed stability record. If any of those runs' queue time plus its duration exceeds the 10-minute ceiling, the queue time is poor, and that context becomes a promote-at-closeout offer instead.
- **"Poor" is my reading, for Kenya to confirm at U1.** It reuses 125-A Req 6.3's ceiling rather than a new number, so Peter's ruling sets no threshold of mine. If Kenya wants a different bound, it changes before U1 merges, with a dated line.
- **#678 now asks Peter nothing.** Its `**Open for Peter**:` line is replaced by one that cites this answer.

#### [KENYA D6 R2] — the "poor" bound for the iOS offer

[KENYA D6 R2] 2026-11-05T23:45Z: **I confirm the bound**: queue time plus job duration at most 10 minutes on each of the three runs. If any of the three runs is over, that context becomes a promote-at-closeout offer.

I ask for two clarifications to condition 5, so the bound measures what I meant:

1. **Measure the iOS job alone.** Count the time from the iOS context's job being created to that job finishing. Do not count `harness-generate`'s time. It runs on ubuntu, it is shared with Android, and it is already measured there.
2. **Define a "cold" run for iOS.** The iOS jobs have no dependency cache: `swiftc` resolves no package. So the "cache-restore step reports a miss" test in condition 3 never applies to them, and as written an iOS context could never collect three cold runs.
   - **Wording I propose**: "for an iOS context, every run counts as cold; the three are the first three runs recorded at the current Xcode pin".
   - Those three runs also supply the queue times that condition 5 reads.

#### [THURGOOD D6 R2]

Both of Kenya's clarifications are folded into tasks.md § "Decision 6". Condition 3 says what "cold" means for an iOS context: every run, and the three are the first three runs at the current Xcode pin. Condition 5 measures the iOS job alone, from creation to finish, and leaves out `harness-generate`. Both clarify the condition Peter ruled; neither is a new choice. The 10-minute bound is confirmed.

#### [THURGOOD R2, dated addendum 2026-11-05] The preconditions and the distribution charter

- **The distribution charter's Trigger, surfaced as open in `[THURGOOD R2]`, is settled.** Stacy ruled Data's form. Kenya accepted it and withdrew her `release:next:phase-1` form for the period before 129 closes. Data re-ruled the Trigger to `path:.kiro/specs/129-consumer-generation-completeness/completion/claims-pass.md`, switching to `release:next:phase-1` at 129's close, in #684 (`19c1dea43`, on `main`). It did not reach Peter. → tasks.md § "Unit preconditions", whose row now carries a dated line.
- **All three merge preconditions are on `main`**:
  - #681 (`3b644b6c6`): the harness charter, re-ruled to `task-5-completion.md` by Kenya, with Data agreeing.
  - #682 (`05ba771f2`): Ada's 15 re-rules.
  - #683 (`657078b52`): Lina's 4 re-rules, her C6 re-rule to `manual`, and the Spec 123 Req 1.5 pointer.
  - #680 (`000e27d91`) was already merged. → tasks.md § "Merge preconditions", dated notes.

---

## Tasks amendment 1 (2026-11-06): Stacy's verifiability read of the merged tasks

Peter, 2026-11-06T00:07:00Z (orchestrator relay), verbatim: "Have Stacy check the tasks first". Her read of `tasks.md` at `8d8ba1425` follows, verbatim.

#### [STACY TASKS R2] — verifiability read of the merged tasks (Peter: "Have Stacy check the tasks first")

**What I read**: `tasks.md` at `8d8ba1425` (#678, merged), diffed against R1 at `90dccd1d8`, and the `requirements.md` and `design.md` amendments in the same diff. I checked against `origin/main` `db5a1ab3f`:
- the current Trigger of every record the plan keys, by `git show`;
- every Primary Artifact path, 123 of them: each either exists or is a declared new `harness/**` or `scripts/harness/**` path. `scopedTsRequire` is at `src/config/scopedTsRequire.ts`, and `scripts/__tests__/pack-assert.test.ts` exists.

The read is feedback, not a gate.

**Verdict in plain words: U1 can start, but fix two High wording points before the first parent closes.**
- Most R1 gaps are fixed, and fixed in checkable form:
  - the record-lapse Convention, with a criterion on every gating parent;
  - the Task 10 path;
  - the missing paths in Tasks 8, 14 and 16;
  - the iOS probe test;
  - the variants frozen at `5e894837c`;
  - the release timing reworded as ancestry;
  - the computed stability record.
- **All 19 re-rules and both `harness/**` records are on `main` as the table says.** The one exception is the Icon-Base README record, which is still open: Lina's precondition (below).
- **Two new problems would mislead U1's completion docs**: High-1 and High-2.
- **One problem could let three records lapse**: High-3.
- **The rest is Medium or Low.**

---

## High

**High-1. "The run URL at the head the unit merged" cannot be met as written. Every unit, including U1.**
- **Where**: the Conventions ("Every unit records its harness runs"); every gating parent's criterion "carries each one's run URL at the head the unit merged with its summary line pasted"; Task 18 ("at that unit's merged head").
- **Why it cannot be met**: the completion doc is committed before the PR's last push. Any commit that adds the citation is itself a new head, with new runs. So the doc can never cite runs at the head that merged.
- **What happens if left**: an author either cites an earlier head and marks it ✅, which is a false ✅ against the criterion's own words, or loops trying to catch up.
- **The fault is mine.** The phrase comes from my R3 condition and my R1 § 1, which the plan adopted.
- **A checkable form**:
  - the doc cites the runs at head **H**, the last head whose diff to the merged head **M** (`git diff --name-only H M`) touches only `completion/**`, `docs/specs/**` and the PR's records;
  - Task 18 and my passes read the four contexts' conclusions at **M** from the checks API.
- **The fix**: Thurgood, as owner of the criteria text, rewords the Conventions line and the twelve criteria to that form. The H-to-M diff is a non-model check.

**High-2. Task 4's Android probe criterion cannot be decided at U1. The iOS twin was fixed; this one was not.**
- **The criterion**: "On Android, the probe generator … reads every `theme.`-named colour semantic through `LocalDPTheme.current` and through each `<Name>Themes` member … once item (i) emits them, with no `harness/android/**` change."
- **Why it cannot be decided**: at U1 nothing emits a theme, and no test shows the generator producing those reads.
- **The contrast with iOS**: Task 3 gained `probe-swift.test.ts`, which shows the reads from a fixture index. Task 4 has no counterpart. Its evidence would be a reading of the generator code, the R1 gap carried forward on one platform.
- **The fix**: Data, with Thurgood for the artifact paths, picks one of two forms:
  - a generator test in a lane, for example `scripts/harness/probe-kotlin.ts` with a test over a fixture index carrying `theme.` names, mirroring iOS, added to Task 4's Primary Artifacts; or
  - this criterion moves to Task 11, which already carries the Android probe-at-U6 read.

**High-3. Records keyed to a `path:` glob fire at the first unit PR whose diff touches the glob, and the preconditions name a fixed unit instead.** Three records could lapse.
- **`2026-09-27-progress-token-harvest-may-not-cross-dual-instance-boundary.md`** (P2 guard, `path:src/build/tokens/defineComponentTokens.ts`). The preconditions say "U5". But Task 13 (U8) lists `src/build/tokens/**`, and U5 is off the chain ("at Peter's direction"). If U8 touches the file before U5, it fires at U8.
- **`2026-10-12-generate-staleness-decided-by-file-times.md`** (P2 guard, `path:src/cli/staleness.ts`). The preconditions say "U8". But Tasks 14 and 15 list `src/cli/**`, and U10 is off the chain.
- **`ios-readonly-focusable-prototype.md`** (P3, `path:src/components/core/Input-Text-Base/platforms/ios/**`). The preconditions say "before U7". But Task 9 (U4) lists `src/components/core/*/platforms/ios/**` "where design § 5's iOS column changes a read", and an iOS `fontWeight` or `TypographyToken` read in Input-Text-Base would touch it at U4.
- **The fix, which is the class fix**: one Conventions line from Thurgood. Before PR-open, a unit lists every root record whose `path:` glob the diff touches, from the issues root's Trigger tokens against `git diff --name-only <base>…HEAD`, and carries that record's owed act in the PR or in an owner PR merged first. Then the precondition rows read "the first 129 unit PR whose diff touches …". Each record's owner (Ada, Ada, Kenya) acts at that PR.

---

## Medium

1. **Decision 6, conditions 3 and 5: computable, but not from the checks API alone.**
   - **Condition 3 (Android).** "Its cache-restore step reports a miss" lives in the step's log. The check-runs API returns step names, conclusions and times, not outputs, and logs expire. *Fix (Data, Thurgood)*: the Android job writes the result as a check annotation (`::notice title=cache::miss`). The annotations endpoint is permanent, and `stability.ts` reads it.
   - **Condition 5 (iOS queue time).** "From the job's creation to its finish" needs the Actions jobs API (`created_at`, `started_at`, `completed_at`); a check run has no creation time.
     - For a job with `needs: harness-generate`, whether `created_at` is the run's start or the moment its dependency finishes is UNVERIFIED. If it is the run's start, "excluding `harness-generate`" is not met.
     - *Fix (Thurgood)*: `stability.ts` measures from `max(created_at, harness-generate.completed_at)` to `completed_at`, and the record states its source endpoints. Task 5's criterion "over the checks API" then reads "over the checks and Actions APIs".
   - **The iOS clarification** ("every run counts as cold; the first three at the current Xcode pin") can be computed from run times against the history of `harness/pins.yaml`.
2. **The Swift parser's fixtures are recorded under Xcode 27.2 (subtask 2.2), but the lane pins 26.6.** The `parser` and `pre-compile` cases catch a total failure, not a partial misparse such as a note keyed as an error. *Fix (Kenya)*: add a fixture cut from U1's first CI log under the pin before U1 merges, labelled with that toolchain.
3. **Task 16 names the wrong file for the re-confirmations.** It says the re-confirmations are "dated lines in `canonical/profiles/consumer/signatures/kenya.md` and `data.md`". A re-confirmation (C16) is a `canonicalHash` move in `canonical/operative-sets/<seat>.yaml` plus a record in `canonical/profiles/consumer/confirmations/<seat>.md`. The signature (C1) is the dispositions row and `signatures/<seat>.md`. This is the #676 shape. *Fix (Thurgood, with Kenya and Data)*: name both acts and their files. As written, U11 would audit the wrong objects.
4. **Task 9's guideline criterion contradicts the requirement it cites.**
   - The criterion has the U4 PR carry `**Edit kind**: governance/platform-implementation-guidelines.md — EXECUTION (requirements.md Req 6.9)`.
   - Req 6.9 itself says "Lina drafts, Peter approves under the ballot-measure model". The criterion therefore cites as EXECUTION authority a clause that requires a ballot.
   - Either Req 6.9 is amended, which is a requirements change and still Peter-merged under the carve-out, or the edit keeps its ballot. Which kind the edit is belongs to Thurgood and Lina; my edit-kind read will test the line against Req 6.9 as it stands at U4's merge.
5. **Task 14's Q3b check may hold U9's merge.** The criterion "as a finding that goes to Peter as the Q3b fork" puts a question to Peter inside U9. Under the merge-hold rule, a PR whose body asks Peter something waits for his dated answer. *Fix (Thurgood, Sparky)*: put Q3b to Peter, with the committed browser check, before U9's PR opens, or file it as its own record with a trigger. Otherwise U9's schedule is tied to his reply.
6. **The Q3a bridge criteria (Task 14) are mostly checkable.** The resolver matrix, cases (a) to (d), the warning word for word on two consecutive runs, "never fails on an unregistered map", and the release-note text in the summary doc are all decidable. Two need a definite referent:
   - **The golden** at `tests/fixtures/pre-129-theme-css/`. It is captured "from `main` before this unit's first change", so it is not pre-129: U3 changes web shadow output. Its header should name the source SHA and the command, so it can be reproduced byte for byte at that SHA. Otherwise "byte-identical to the golden" rests on an unverifiable capture.
   - **Case (c)**, "no WCAG difference from the base", needs its base named.

   *(Fix: Ada.)* It is Medium only because of the golden.

## Low

1. **The new harness tests are not registered as in-lane guards.** `probe-swift.test.ts`, `consumer.test.ts`, `d2-check.test.ts` and any `stability.ts` test run in `lane-functional-root`, but Task 6 registers only the three comparator and parser suites. A deselected probe test would pass silently. *Owner: Thurgood, with Task 6's P1b scope.*
2. **Task 5's stability record "for U1's runs"** can only cover runs up to its own commit, the same regress as High-1 at small scale. State it as runs up to the record's commit. *Owner: Thurgood.*
3. **The Q3a golden's name** says "pre-129" for a pre-U9 capture. Renaming it avoids a misreading. *Owner: Ada.*

---

## Preconditions still open before U1 (status, not findings)

- **Lina, the Icon-Base README move and closing its P1 record** (`path:harness/**`).
  - At `db5a1ab3f`, `src/components/core/Icon-Base/platforms/android/res/drawable/README.md` is still present and the record is still at the root.
  - It must merge before Task 4's first dispatched Android run.
  - If it has not landed when U1 merges, that is a P1 first lapse.
  - Tasks 1–3 can start without it.
- **Lina, the L816 fix.** `ContainerCardBase.ios.swift` around L815 still opens a `/**` that never closes. It is due before U1's PR opens; otherwise it is carried as a tagged entry, which Req 4.7 allows.

## Checked and sound

- **The rule-11 Convention, with a close-or-re-rule criterion on Tasks 5, 8–14 and 18.** It covers every record keyed to a completion doc. The owners are PRIMARY or secondary on each carrying parent: Lina on 11 (row 12), 12 and 13; Kenya and Data on 5.
- **The distribution charter is re-ruled to 129's claims pass (#684). The harness charter is re-ruled to `task-5-completion.md` (#681).**
- **Task 17's ancestry check and its `[Unreleased]` CHANGELOG entry** replace the future-release criterion.
- **Task 11's row-15 and row-2 list removals**, and Task 12's per-platform "no entry tagged to row 15".
- **The requirement amendments.** Req 10.1's "on `main`", Req 9.5's scope and Req 2's "Records" correction are each dated, with their prior text cited.

#### [THURGOOD R3] — tasks amendment 1

Folds `[STACY TASKS R2]` above, which is spliced byte for byte from her file (`cmp` clean). Peter asked for that read before execution: "Have Stacy check the tasks first" (2026-11-06T00:07:00Z, orchestrator relay). This is one amendment PR, `task/129-tasks-amend-1`, cut from `origin/main` `0ee2357ea`. Each changed line carries a dated amendment note with its prior text at `8d8ba1425`.

**High:**
- **High-1, folded.** The run-citation rule is now: cite at head **H**, the last head whose `git diff --name-only H M` to the merged head **M** touches only `completion/**`, `docs/specs/**` and the PR's records. The four conclusions at M are read from the checks API. This changes the Conventions line, all eleven gating-parent run criteria (Tasks 5, 7–16) and Task 18's sum. **Requirement 2.13 and the requirements' "Accepted at a unit PR" convention carried the same impossible wording, so both are amended too**, with dated lines; Req 2.13 states its changed reach. The fault Stacy names as hers was adopted into the criteria by me, so it is mine too.
- **High-2, folded in the default form, pending Data.** Task 4's Android probe criterion is now decided at U1 by `scripts/harness/__tests__/probe-kotlin.test.ts` over a fixture index and config. This mirrors iOS's `probe-swift.test.ts`. `scripts/harness/probe-kotlin.ts`, its test and its Kotlin fixtures are added to Task 4's Primary Artifacts. The other form, moving the criterion to Task 11, is not taken. **[@DATA] Do you take the generator test (this text), or the move to Task 11? Either is your call; the test needs your generator to live at `scripts/harness/probe-kotlin.ts` instead of under `harness/android/`.** → tasks.md Task 4 -- [THURGOOD R3]
- **High-3, folded as the class fix.** There is a new Conventions line: before PR-open, a unit lists every root record whose `path:` glob its diff touches, and carries each one's owed act, by its owner, in the PR or an owner PR merged first; the PR body names the list. The three at-risk records are named there and in their precondition rows, which now read "the first 129 unit PR whose diff touches …": the progress-token-harvest record (Ada), the generate-staleness record (Ada) and `ios-readonly-focusable-prototype.md` (Kenya).

**Medium:**
1. **Decision 6's data sources.**
   - Condition 3: Android cold is read from a check annotation, `::notice title=cache::<hit|miss>`, written after the cache-restore step, because step logs expire.
   - Condition 5: the iOS queue time and duration come from the Actions jobs API, from `max(created_at, harness-generate.completed_at)` to `completed_at`. Whether `created_at` under `needs:` is the run's start is UNVERIFIED, and the `max` holds either way.
   - The stability record names its endpoints. Task 5 gains the annotation step criterion and `scripts/harness/__tests__/stability.test.ts`.
   - These clarify how Peter's ruled condition is measured. They change nothing he ruled.
2. **The Swift fixture under the pin**: Task 2.2 gains one fixture cut from U1's first CI log under the pinned Xcode, before U1 merges. That subtask is Kenya's.
3. **Task 16's re-confirmations and signatures**: the criterion now names both acts and their files. The re-confirmation (C16) is the `canonicalHash` move in `canonical/operative-sets/<seat>.yaml` plus its record in `confirmations/<seat>.md`. The signature (C1) is the dispositions row plus `signatures/<seat>.md`. Neither needs a grant, and both are listed paths' neighbours that the audit reads.
4. **Task 9 and Req 6.9.** Stacy is right: R2's "EXECUTION (Req 6.9)" cited a clause that itself requires the ballot-measure model. **The Android guideline edit needs Peter's approval under the ballot-measure model at U4.** The criterion now requires a ballot record (`.kiro/docs/ballots/*-129-u4-android-type-statements.md`), held by Thurgood with Lina's text, reading RATIFIED (Peter) at U4's merge. The U4 PR body carries `— LAW (<that ballot path>)`. Thurgood is added to Task 9 as the ballot holder.
5. **Task 14's Q3b check is moved earlier.** Before U9's PR opens, Sparky's browser check is committed, and the Q3b fork is filed as its own root record (Ada, with Leonardo on intent) with a Trigger. U9's PR then asks Peter nothing about it, and U9's merge does not wait on his answer.
6. **The Q3a golden.** It is renamed `tests/fixtures/pre-u9-theme-css/` (Low-3). Its header names its source SHA (the U9 branch's base on `main`) and the capture command, so it can be reproduced byte for byte. Case (c)'s base is named: each `:root[data-theme="wcag"]` value equals the same run's base `:root` value. Both are Ada's surface, folded with Stacy's named fix; Ada can correct the wording at execution.

**Low:**
1. **More registrations.** Task 6 now registers `probe-swift`, `probe-kotlin`, `consumer` and `stability` beside the comparator and parser suites. `d2-check.test.ts` cannot be registered in U8, because that PR also edits the workflow and the P1b read needs `.github/**` to be exactly the registry. So it is registered in its own P1b PR, as a Task 18 criterion.
2. **The stability record** now states that it covers runs up to its own commit.
3. **The golden's rename**: covered by Medium-6.

**Preconditions still open, as Stacy lists them**: Lina's Icon-Base README move (before Task 4's first dispatched Android run) and her L816 fix (before U1's PR opens). Both are status, not amendments.

**Nothing here is Peter's.** Medium-4 names an approval he gives at U4, under the ballot-measure model Req 6.9 already requires. It is not a question in this PR.

[DATA HIGH-2] 2026-11-05 — **Accept the test as written** (read at `task/129-tasks-amend-1` `24206df5e`); do not move the criterion to Task 11.
- **What I read**: Task 4's new criterion (`probe-kotlin.test.ts` over a fixture index carrying `theme.` names and a fixture consumer config) is decidable at U1 in `lane-functional-root`, mirroring iOS's `probe-swift.test.ts`. The reworded 4.2 and the three added artifacts (`scripts/harness/probe-kotlin.ts`, `scripts/harness/__tests__/probe-kotlin.test.ts`, `scripts/harness/__tests__/fixtures/kotlin/**`) are right.
- **Why not Task 11**: moving it would leave U1 without evidence, and would make U6 depend on a generator nobody had tested.
- **One note, no change asked**: Task 2's `scripts/harness/__tests__/fixtures/**` already covers `fixtures/kotlin/**`. Both are U1 grants, so the overlap is harmless.

---

## Tasks amendment 2 (2026-11-06): the dispatch limit, and Peter's Decisions 1 and 2

Peter, `date -u` at receipt 2026-11-06T14:04:52Z (orchestrator relay), verbatim: "1 A, 2 yes, 3 stand, 4 (b), 5 no rewrite; let's also proceed with the class option". Decision 1 is how U1 gets its harness runs (A: a dispatch-only stub on `main` first, a probe dispatch, and fallback to D if the probe fails). Decision 2 is Decision 6 condition 3: count only pull-request runs toward the iOS "first three runs". Decisions 3 to 5 and the class option are outside `tasks.md`; they are recorded in the 131 ledger's L-9 and in two `.kiro/issues/` records.

### Context for Reviewers
- The limit: GitHub triggers `workflow_dispatch` only for a workflow whose file is on the default branch → `.kiro/docs/ballots/2026-09-27-b-ci-unit-branch-ci-feedback.md` L197. U1 creates `native-harness.yml`, so the Conventions' dispatch line, Req 2.11's dispatched fault run and Task 5's "first full run" could not happen before U1 merged.
- Option A keeps Req 2.11 and design § 3 rule 3 as written, so this amendment touches neither. The one design edit is Data's wrapper (design § 2, `gradle` → `./gradlew`).
- The grant for the stub is an issue-row grant → `.kiro/issues/2026-11-06-native-harness-dispatch-stub-grant.md`, which rides this PR. Rule 10 says a grant list is never authored only inside the diff it bounds, so the stub itself follows this PR's merge in its own PR.
- Not in this amendment: design L130's "can never read green", which overstates the location-less rule in `harness/README.md` (Stacy's point). It is a fork between narrowing the text and keying location-less lines, it is already routed to Stacy's failure-case review alongside Data's dissent, and it needs Peter's words.

#### [THURGOOD R4] — tasks amendment 2
- **Conventions, the dispatch line**: states the limit, the stub and the probe. Amended note cites Decision 1. → tasks.md § "Conventions for every parent"
- **New definition, "The first full run (U1)"**: the first run of `native-harness.yml` against the unit branch after Tasks 3 and 4 join it, in which every compile of all four contexts reaches the comparator with an outcome, not the forced-failure run. Under A it is dispatched, so it has no merge base (design § 3 rule 3); exception (b) is checked on the PR. → tasks.md § "The list file format, the pin file and the run policy"
- **Decision 6 condition 3**: "the first three **pull-request** runs recorded at the current Xcode pin; a dispatched run does not count toward them", citing Decision 2. → tasks.md § "Decision 6"
- **Unit preconditions, new first row**: the stub (its diff, its single trigger), the probe (pass = the run's jobs are the branch file's, not the stub's), and the fallback to D (its edits merge in a further amendment before U1's PR opens). → tasks.md § "Unit preconditions and the records 129's paths fire"
- **2.2's bullet**: the Xcode 26.6 fixture is cut from the first full run's iOS log, and Task 5 now carries it as a criterion. → tasks.md Task 2, 2.2
- **Task 4, Data's wrapper**: the invocation is `./gradlew --continue …` from `harness/android/`; a new criterion that `gradle-wrapper.properties` names the pinned Gradle version in `distributionUrl` and sets `distributionSha256Sum`. → tasks.md Task 4
- **Task 5, five new criteria and two changed lines**:
  - the probe dispatch recorded (run URL and job names, or its error and the fallback amendment);
  - Stacy's A-(iii): the fault is forced by a `workflow_dispatch` input that only a step of `harness-generate` reads. At head H no `if:` reads `github.event_name`, so failing-not-skipping holds on `pull_request`, and the workflow and `consumer.ts` are unchanged between the fault run's head F and H (the staleness check). An input, rather than a fault commit and its revert, leaves nothing to revert and keeps the staleness check to two paths;
  - Kenya's fixture: one fixture under `fixtures/parse-swift/` from the first full run's iOS log, header naming the pinned Xcode and the run URL, read by `parse-swift.test.ts`. This closes Stacy's point that no criterion covered it;
  - the Android jobs validate the committed wrapper (Gradle's wrapper-validation action) before the first `./gradlew`;
  - `stability.test.ts` also shows a dispatched run counted toward neither condition 2 nor condition 3;
  - the grant-limits line: U1 turns the stub on `main` into the real workflow, instead of creating a new file (prior text quoted in the amended note);
  - 5.1 gains a line: it starts after the stub is on `main`, and its first commit is what the probe dispatches.
  → tasks.md Task 5
- **Design § 2 ("One invocation per context")**: `./gradlew --continue …` through the committed wrapper, with an amended note. → design.md § 2
- **Data's reproduction proposal is not folded.** The baselines stay "committed from the first full run" for all four contexts, and a local Android build is a rehearsal its author records. One rule covers both platforms, and no non-reproduction outcome needs deciding, which meets Stacy's iOS objection (no local Xcode 26.6 exists). Under A the first full run comes before PR-open anyway. If Data still holds his form after reading this, it goes to Peter. → tasks.md Task 5
- **Instruments row 21 (Task 2, C16's PR-run half) is not changed.** It is discharged by amending Task 2's completion doc in place once the U1 PR's `lane-functional-root` run exists, which the H convention allows.
- [@STACY] LENS read of this amendment, please: are the new Task 5 criteria decidable as written, in particular the A-(iii) criterion (the input, the `github.event_name` grep at H and the F..H diff) and the probe's pass condition? → tasks.md Task 5 -- [THURGOOD R4]
- [@STACY] The stub's grant: I read rule 10 ("a grant list is never authored only inside the diff it bounds") as requiring the grant record to merge first, here in this PR, with the stub in its own PR afterwards. This PR's body carries the `**ARMING**:` line. Do you agree, or can the stub ride this PR? → `.kiro/issues/2026-11-06-native-harness-dispatch-stub-grant.md` -- [THURGOOD R4]
- [@KENYA] Your rows: condition 3's pull-request-only wording, 2.2's bullet, and Task 5's fixture criterion. Do they say what you proposed and what you can deliver? → tasks.md § "Decision 6", Task 2 2.2, Task 5 -- [THURGOOD R4]
- [@DATA] Your rows: Task 4's `./gradlew` invocation, the `gradle-wrapper.properties` criterion, Task 5's wrapper-validation criterion and design § 2's line. Do you agree with them as written? And do you accept declining the local-baseline reproduction form, as above? → tasks.md Tasks 4 and 5; design.md § 2 -- [THURGOOD R4]
