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
