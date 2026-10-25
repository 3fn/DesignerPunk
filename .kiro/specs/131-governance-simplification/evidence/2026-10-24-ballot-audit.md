# Spec 131 evidence: ballot audit, merge and overlap pass

**Date**: 2026-10-24 · **Main**: `0972178f4` · **Author**: Thurgood (merge pass)
**Authority**: Peter, 2026-10-24: "audit and supersede, never prune."
**This changes nothing.** Ballots are the ratification record. Every family, row and fix below is a candidate for 131's rounds and for Peter.

**Method**: three readers (part 1: 21 ballots; part 2: 15; part 3: 11; staging folder `evidence/ballot-audit-staging/`); this merge, which re-grepped each disputed cell at `0972178f4`; Stacy's parallel cross-check of every unfired, unbuilt and dead call (last section). Where I changed a reader's call, the row says **changed**.

**Counts (47 ballots)**
- **Status**: 46 ratified · 0 draft · 1 carried (not ratified, not rejected) · 0 superseded whole.
- **Standing**: 40 in force · 1 outdated · 2 unfired · 1 unbuilt · 2 nowhere-in-law · 0 superseded · 1 not law.
- **Parts the main standing hides**: unbuilt 4 (#14, 26, 33, 35) · unfired 6 (#22, 23, 27, 31, 35, 37) · nowhere-in-law 2 (#32, 38) · superseded or spent 4 (#3, 7, 11, 12).

**Standing vocabulary**: *in force*: carried by current text or code, and used or usable. *outdated*: live text that no longer matches the tree. *unfired*: in force, but its event has not happened (or cannot be seen in repo files). *unbuilt*: ratified, but the mechanism does not exist yet. *nowhere-in-law*: the rule is found only in its ballot. *not law*: never ratified.

**Abbreviations**: TCP `Task-Completion-Protocol.md`; SUT `start-up-tasks.md`; AD `Agent-Directory.md`; CDG `governance/completion-documentation-guide.md`; PSP `governance/Process-Spec-Planning.md`; RF `.kiro/hooks/RELEASE-FLOW.md`; RMS `governance/release-management-system.md`; IR `.kiro/issues/README.md`; BR `.kiro/docs/ballots/README.md`; reg = row in `governance/classification-map.md`; ch:X = `canonical/agents/X.md`. Map rows are the R2 outline § 3b.

---

> *Orchestrator note (assembly, 2026-10-24): the counts and Standing calls above predate Stacy's cross-check (final section), which checked 24 rows: 16 confirmed, 6 corrected, 2 cannot determine. Where her call differs from a row above, her call governs until 131's rounds settle it.*

## 1. The 47 ballots

| # | Ballot | Status | Rules | Lives now | Standing | Notes | Map |
|---|---|---|---|---|---|---|---|
| 1 | `2026-07-05-documentation-task-type` | R 07-05 | Documentation task type; Tier-2 test; origin of record-first ratification | `Process-Task-Type-Definitions.md`; PSP; BR | in force | — | none (protocol: 16) |
| 2 | `2026-07-07-merge-on-coherent-unit` | R 07-08 | Merge unit = declared unit; units block; optional subtask commits; branch sweep | TCP § Coherent Units, § Branch Cleanup; PSP § Declared Merge Units | in force | Amended by B-CI M1 | none |
| 3 | `2026-07-07-orchestration-model-tiering` | R 07-08 | Decide vs implement tier; `**Agent**: X (Model)` | `Process-Orchestration-Model-Selection.md`; SUT 6 | in force | Item 4 superseded by #16; recalibration never consumed | none (5) |
| 4 | `2026-07-11-claude-md-retirement` | R 07-11 | `CLAUDE.md` generated and diff-guarded | banner; reg `never-hand-edit-122-generated`; `diff-guard.ts` | in force | — | none |
| 5 | `2026-07-14-npm-test-imperative-prune` | R 07-14 | Prune "run npm test" imperatives | TCP, PDW (edited); reg `npm-test-before-complete`; SUT 4–5 | in force | One-time, executed | none |
| 6 | `2026-07-15-state-readonly-concept` | R 07-15 | `readonly` concept; new concepts need a ballot | `Contract-System-Reference.md` L51, L85; ch:lina | in force | — | none |
| 7 | `2026-08-02-u1-pilot-closeout-verdict` | R 08-02 | Roll-up reading; N=10 windows; U1b ungated; dial re-deferred | reg Methodology Notes 3, 5 | in force | **Changed** from "spent": Notes 3 and 5 are live measurement law. Dial superseded by #12 D2 | none |
| 8 | `2026-08-12-q6-release-manager-retirement` | R 08-12 | Retire the release manager; recipe doc; keep the guards | RMS § "Discovering What Changed and Why"; RF | in force | **Changed** from "outdated residue": `Process-Hook-Operations.md` L84–364 is labelled historical at L30 | none |
| 9 | `2026-08-12-wave-1-workflow-gate-prune` | R 08-12 | Seven prune hunks; "never merge your own PR" kept | reg `commit-to-main-via-pr-only`, `squash-merge-only`, `typecheck-build-green-at-merge`; TCP | in force | One-time | none |
| 10 | `2026-08-25-wave-2-component-test-gov-prune` | R 08-25 | Five hunks (WCAG restatements, two contradictions) | three governance docs (edited); reg `wcag-required-refs` | in force | One-time | none |
| 11 | `2026-09-17-spec-127-outline-settle` | R 09-17 | Q2 deferral; Q5 cut; composed loop; owed-set step; charter walk | ch:thurgood, ch:stacy; RF 5a/5b; `scripts/owed-set.sh`; IR | in force | Q2 deferral spent (armed 10-03); carve-out falsification unresolved | 10, 11, 13 |
| 12 | `2026-09-18-u1b-campaign-closeout-verdict` | R 09-18 | COMPLETE; dial re-deferred with trigger; Q2 not armed; rewrite-vehicle convention | Notes 6–7 in reg. D2 trigger and D4 convention: ballot only (grep: no record, no doc) | nowhere-in-law | **Changed** from mixed. D3 superseded by the 10-03 arming | none |
| 13 | `2026-09-19-completion-audit-standards-package` | R 09-19 | S-1…S-7 | CDG L86, L345–351; PSP L587–591; TCP L38; ch:stacy | in force | S-4 present 148/151 | 9 |
| 14 | `2026-09-19-completion-claims-integrity` | R 09-19 | Exact-set criteria table; forced-negative line; criteria mode; units block | CDG § Parent Success-Criteria Fidelity; `check-completion-criteria-parity.ts` (required since 10-03); PSP L469–579 | in force | 3 reg rows unbuilt (`promised-artifact-exists`, `promised-artifact-shipped`, `parent-completion-docs-present`, all `proposed`) | none (9, 10, 12 touch) |
| 15 | `2026-09-19-counter-argument-fold-back` | R 09-19 | Fold-back, residual, forks | AICP; AI-Collaboration-Framework; 8 charters | in force | — | none |
| 16 | `2026-09-19-delegated-tier-capture` | R 09-19 | Unconditional `**Delegated-tier**:` line | CDG L153; TCP Key Rules; ch:stacy; reg `delegated-tier-capture` | in force | Present 31/31 | 5 |
| 17 | `2026-09-19-disabled-input-parity` | R 09-19 | Consumer `disabled` inert; radio `formDisabledCallback`; optional dev-warn | `Test-Behavioral-Contract-Validation.md` L311; `InputRadioBase.web.ts` L235; reg `no-disabled-states` | in force | Dev-warn adoption unevidenced | none |
| 18 | `2026-09-19-orchestrator-role-and-row` | R 09-19 | Owners author; orchestrator scope; whether-to-delegate | AD § Primary Agent; SUT 6; reg `owned-artifact-authorship` | in force | Amended by #25 | none |
| 19 | `2026-09-26-tasks-row-write-scope-grant` | R 09-26 | Merged tasks row grants its Primary Artifacts until the unit merges | TCP L102; `canonical/operative-sets/task-completion-protocol.yaml` L246; reg `tasks-row-write-scope-grant` | in force | Audit only | 7(a) |
| 20 | `2026-09-27-123-b-u1-publish-rail` | R 09-27 | Check live on the registry by HTTP before announcing | RF 6a; `verify-publish-rail.sh`; reg `publish-rail-guard` | in force | — | none |
| 21 | `2026-09-27-b-ci-unit-branch-ci-feedback` | R 09-27 | M1 branch dispatch; M2 `**CI-provenance**:` line | TCP; `complete-task.sh`; CDG L168–200 | **outdated** | **Changed** from in force. Rule 5's premise ("today's 18 contexts", CDG L195) lapsed when parity armed (19 contexts), and no re-evaluation found. Dispatch still 6 workflows/18 contexts. § 9 step 5 row decision unrecorded | none |
| 22 | `2026-09-27-ci-regime-standing-scope` | R 09-28 | M1 P1 test-lane scope; M2 issue-row grants; M3 instrument rows disposed, not fixed | ch:thurgood; AD; IR rules 7, 8; reg `issue-row-write-scope-grant`, `instrument-rows-disposed-not-fixed` | in force | Ballot amended in place (`c219488d6`, `b42874bd0`); M3 unfired | 7 |
| 23 | `2026-09-27-normative-counterexample-routing` | R 10-18 | Counterexample = finding to owner; errata appended | CDG L353–361 | in force | Routing half unfired; no reg row | none (near 11) |
| 24 | `2026-09-28-123-b-u2` | R 09-28 | Re-grounding lines in the counting block; package-name rule plus parity test | ch:stacy L426; reg `package-name-scope-drift`; `package-name-scope-parity.test.ts` | in force | Counts a decayed act (0 signatures since 15.1.0) | 1, 20 |
| 25 | `2026-09-28-orchestrator-consult-first` | R 09-28 | Consult first; class option; `**Consulted**:` line | AD § Primary Agent; reg `orchestrator-consult-line` | in force | No mechanical reader | 6 |
| 26 | `2026-09-28-parent-instrument-existence-check` | R 09-29 | Instruments block first; MISSING stops; M4 plan-time rows | SUT 8; CDG § instruments; PSP; reg `parent-instrument-existence` | in force | M4 unbuilt (parser `P` unmerged). Not lapsed: 0 `tasks.md` created since 09-29 | 12 |
| 27 | `2026-10-01-signing-act-chain` | R 10-01 | C1 needs no grant; 8-link chain; verifier; walks; Peter's sample | **the ballot as amended** (6 commits, live text); `governance/signing-seat-brief.md`; `verify-signing-chain.ts`; reg `signing-act-consistency` | in force | 8 amending ballots; Peter's sample unfired | 2, 20 |
| 28 | `2026-10-02-integration-guide-native-scoping` | R 10-02 | Four one-time Integration Guide edits | Integration Guide L164–178, L395 | in force | One-time; preserved by #29 § 5 | none (near 19) |
| 29 | `2026-10-03-123-b-u3-install-guide` | R 10-13 | Install region changes with the process, why recorded; new platform = sibling section | ballot only; region markers (Guide L21, L260) carry no rule | nowhere-in-law | **Changed** from "by custom" | none |
| 30 | `2026-10-03-hermetic-publish-path` | R 10-03 | One tarball to both registries; 6b record; two-phase RELEASE; announce last | RF 5–7; `release-publish.ts`, `pack-assert.ts`; RMS; reg `hermetic-publish-path` | in force | Exercised 15.1.0, 16.0.0 | none |
| 31 | `2026-10-13-123-b-u4-release-recipe` | R 10-13 | Audience banners plus guard; one CHANGELOG entry per release; onboarding trio | `scripts/audience-banner/predicate.ts`; RMS 4, 6; RF L106 | in force | Trio first fires next release | 1, 10 |
| 32 | `2026-10-17-no-volatile-metadata-in-signed-units` | R 10-17 | Signed units hold only law; marker = record filename | SUT 2; `governance-check.sh` L126–129; frontmatter `lastReviewed` | in force | General rule: ballot only | 3 |
| 33 | `2026-10-17-standing-write-scope-six-roots` | R 10-17 | Six-root scope map; scope moves only by charter edit; render-fidelity sweep; instrument-path ARMING | charters' `writeScope`; IR rule 9; reg `charter-write-scope-render-fidelity` (`proposed`, `checks: []`) | in force | Sweep unbuilt (nothing in `sweeps/`) | 15, 7 |
| 34 | `2026-10-18-governance-edit-kinds` | R 10-18 | LAW / EXECUTION / CORRECTION line | BR § three kinds; TCP; ch:stacy | in force | Only LAW is mechanically checkable | 4 |
| 35 | `2026-10-18-obligation-drain-and-release-falsity-floor` | R 10-18 | M1–M8: filing, grammar, walk record, lapse, class, triage, falsity floor, merge hold | IR rules 1, 5, 6, 10–12; RF 3a; `issues-owned.sh`; TCP `**Open for Peter**:` | in force | reg `issues-obligation-lapse`, `release-falsity-floor` `proposed`; M3/M7 unfired (16.1.0 is the first release) | 13 (M7, M8 none) |
| 36 | `2026-10-18-release-flow-5-3-single-run-and-both-logins` | R 10-18 | Run 5.3 once; check both logins | RF L126–128; `release-publish.ts` preflight | in force | Lock owed at a second duplicate run | none |
| 37 | `2026-10-18-sitting-2-subtask-tests-tasks-sweep-criteria-form` | R 10-18/19 | S1–S6 | SUT L79; PSP L486, L519, L567; CDG L117; signing ballot § 5.3 | in force | S2, S5 unfired | 2, 20 (rest none) |
| 38 | `2026-10-18-true-native-development-is-not-true-native-design` | R 10-18 | Native floor; design is a recorded choice; F-1 `rendering` field; F-3 | decision framework; `design-philosophy.yaml` L52; charters; `Component-Development-Guide.md` L727 | in force | F-1 field, site 10: nowhere. § 6.5 follow-up open | none (near 19) |
| 39 | `2026-10-19-instrument-census-at-draft` | R 10-19 | `**Census**:` line | BR L32; reg L107, L1194; ch:stacy L434 | in force | 27 "not in scope" lines vs 1 run | 8 |
| 40 | `2026-10-20-grant-ci-deletions-and-activating-merge-read` | R 10-20 | `**Deleted lines**:` quote; activation read; LIVENESS item 4 | ch:stacy L404; ch:thurgood LIVENESS; IR rule 8 | **unfired** | **Changed** from "in force, unexercised". 0 column-0 marker lines in `.kiro`. PR-body blocks are invisible to grep (Stacy) | 7(b) |
| 41 | `2026-10-20-in-lane-guard-registry-additive-entries` | R 10-20 | P1b additive entries | ch:thurgood; ch:stacy ARMING; AD | in force | Used (#427, 18→41) | none (near 7b) |
| 42 | `2026-10-20-manual-records-routed-readers` | R 10-20 | E1 session read; E2 pre-formalization grep; E3 deferrals reprinted | SUT 9; `issues-owned.sh`; PSP L130; RF L39; IR | in force | Revisit pending | 13 (E2 none) |
| 43 | `2026-10-20-spec-128-platform-admission-identity` | carried 10-20 | none | Spec 128 inbound | not law | — | none |
| 44 | `2026-10-21-routes-floor-re-pointed-frontmatter-members` | R 10-22 | C18 clause 5 | 123 `design.md` L658; `triviality.ts` | in force | — | 1, 2 |
| 45 | `2026-10-22-hold-act-recorded-in-pr-body` | R 10-22 | A hold is a PR-body acts-list line | signing ballot § 2 clause 6 (L45–46) | **unfired** | **Changed** from "in force". Stacy's `Holds` line not yet placed (her discretion, per the ballot). PR-body records invisible to grep | 2 |
| 46 | `2026-10-22-trigger-names-the-event-not-the-vehicle` | R 10-22 | IR rule 1 | IR rule 1; reg L1168 | in force | 19-record re-rule owed at the next walk | 13 |
| 47 | `2026-10-23-link4-candidate-first-sha-after-commit` | R 10-23 | Candidate = first SHA after the commit; canary | nowhere yet (0 hits in ballot or verifier) | **unbuilt** | Applies after 129 unit 1 (`manual`). Seat brief still says DRAFT | 2, 20 |

**Reader claims that did not verify**
- Part 2 says three ratified ballots are missing from the BR roll. In fact **15** are (fix-now 1). `six-roots` appears only in prose at L54.
- Part 3 places the TND pointer at the decision framework's L351. It is now **L360**.
- Part 3 reads `core-goals.md` L33 as a dead pointer. The target **exists**. The defect is framing, per TND § 6.5.

---

## 2. Families

| Family | Members (#) | Where current law lives | What a current-text consolidation would cover |
|---|---|---|---|
| **Signing** | 27 + 32, 33, 37 (S5), 40, 44, 45, 47; counting lines 24 | **Scattered across 9 ballots.** The signing ballot itself is amended in place (pointer at L46) and works as law text. `signing-seat-brief.md` (Thurgood) already restates most of it; verifier; reg `signing-act-consistency` | Make the seat brief the one law text and freeze the ballot as the record. **Fork**: R2 row 2 is **D**. If D lands, consolidation is moot and the family needs a retirement record instead |
| **Write-scope grants** | 19, 22 (M1, M2), 33, 40, 41; 27 M1 (C1 needs no grant) | **Scattered across 6 ballots**: TCP L102, IR rules 8–9, charters' `writeScope`, Stacy's ARMING row, 3 reg rows | One "who may write what, by what act, until when" text. This is R2 rows 7 and 15 (OWNERS). It must keep each grant's activation act and expiry (§ 6) |
| **Claims integrity / completion evidence** | 11, 13, 14, 16, 21 (M2), 23, 26, 37 (S1–S4, S6), 39 | **Mostly consolidated** in CDG, plus PSP's criteria form and Stacy's counting block | Stacy's counting block grows a line per ballot (24, 25, 45). Candidate: one counting-block spec in her charter § "The claims-pass record" (CDG rule 6 already points there), and PSP's criteria-form text moved beside CDG § Fidelity |
| **Records / triggers** | 35, 42, 46, 22 (M3, rule 7), 33 (rule 9), 12 (D2 dial) | **Consolidated in IR** (12 rules), plus SUT 9, RF 3a, 2 `proposed` reg rows | R2 row 13 (12 → ~5 rules). Gap: #12's dial trigger never entered IR |
| **Release** | 8, 20, 30, 31, 36, 11 (5a/5b), 35 (M3, M7), 42 (E3) | **Consolidated in RF**; RMS also carries recipe steps (U4 lives in its steps 4 and 6) | One recipe text (RF), with RMS as a pointer. `Process-Hook-Operations.md` L84–364 (labelled historical) is a cost candidate, not a defect |
| **Orchestrator / collaboration** | 3, 15, 16, 18, 25; 34 (Consulted line in CORRECTION) | **Consolidated**: AD § Primary Agent, SUT 6, `Process-Orchestration-Model-Selection.md`, AICP | Small. Residual: the tier-recalibration loop (3 → 16) was never closed (R2 row 5 **D**) |
| **Ratification protocol** | 1, 34, 23, 39, 32; BR L31 (law vs ledger) | **BR**, but its roll lists 31 of 47 | Roll completion (fix-now 1), plus a rule on whether a ballot may be amended in place. Signing (27) and ci-regime (22) are; L31 calls ballots neither law nor ledger |
| **Workflow gate and prunes** | 2, 4, 5, 7, 9, 10, 12, 21 (M1) | **Consolidated**: TCP plus reg Methodology Notes | None needed. The prunes are executed edits |
| **Platform / install truth** | 28, 29, 38, 43; 17, 6 (component law) | Integration Guide; decision framework; **29's rule nowhere** | Give 29's rule a home in the Guide's install-region header. TND and 128 meet at Spec 128 |

---

## 3. Mechanisms the R2 map lacks (deduplicated)

| Mechanism | Source (#) | Suggestion |
|---|---|---|
| Exact-set criteria table and the `completion-criteria-parity` gate (the one **armed** completion check) | 14; 37 S3, S4, S6 | **New row** |
| Publish path: hermetic tarball, two-registry record, rail, 5.3 single run, CHANGELOG entry | 20, 30, 36, 31 | **New row** (row 10 names pack-diff only) |
| Release walk record, falsity floor, owed-set step, LIVENESS read | 35 M3/M7; 11 | Fold into row 10 |
| `**Open for Peter**:` merge hold | 35 M8 | **New row** (metric 1 already counts it) |
| Unit-branch dispatch and the `**CI-provenance**:` line | 21 | **New row**. Grade it with fix-now 3 in hand |
| P1/P1b standing CI scope; instrument-path ARMING | 22 M1, 41, 33 | Fold into row 7 |
| Instrument rows disposed, not fixed | 22 M3 | Fold into row 8 |
| Counterexample routing, errata rule, composed-loop one-line outcome | 23; 11 | Fold into row 11 |
| Trigger grammar, lapse ladder, SUT 9 plus `issues-owned.sh`, E2 grep, the dial trigger | 35, 46, 42, 12 | Fold into row 13 |
| Tasks-round sweep | 37 S2 | Fold into row 12 |
| 12 register rows with a scope still at `proposed` | 14, 17, 33, 35, others | Fold into row 14 (the row should say how many are unbuilt) |
| No-volatile general rule | 32 | Fold into row 3 |
| `package-name-scope-drift` and its parity test | 24 M2 | Fold into row 14 |
| True Native design law | 38 | **New row** (Lina, Leonardo; adjacent 19) |
| Install-region rule; native scoping | 29, 28 | Fold into row 17 |
| Law vs ledger convention; ballots amended in place | BR L31; 22, 27 | Fold into row 16 |
| Baseline law (merge unit, prunes, generated `CLAUDE.md`, fold-back, `readonly`, disabled parity, Documentation type, tiering) | 1–10, 15, 17 | Not a cost layer. List under outline § 12, "left out on purpose", with that reason |

---

## 4. Fix-now: current text already wrong (filing by owners, not fixed here)

| # | What is wrong | Path | Owner |
|---|---|---|---|
| 1 | The BR roll has no entry for **15** ratified ballots: #2, 3, 7, 8, 9, 10, 12, 17, 28, 32, 33, 44, 45, 46, 47 (31 entries cover 47 files) | BR § "Ballots on record" | Thurgood (Peter-merged) |
| 2 | Link 4 is called "DRAFT ballot". It was ratified 2026-10-23 | `governance/signing-seat-brief.md` L74, L81 | Thurgood |
| 3 | B-CI's parity premises lapsed when parity armed (10-03), and no re-evaluation is recorded. (a) CDG L195: "today's 18 contexts". There are 19, and rule 5's own text says it is re-evaluated at the flip, before the flip lands. (b) `complete-task.sh` L69 still says "check_state: proposed — arming is Q2's"; L108 and L124 say "18 required contexts". (c) The dispatch list leaves out `completion-criteria-parity.yml`, which has no `workflow_dispatch`. That exclusion was decided while parity was "not required" (`.kiro/issues/archive/2026-09-27-unit-branch-ci-feedback.md` L42) | CDG; `.kiro/hooks/complete-task.sh` | Thurgood. (a)'s re-evaluation is probably a LAW edit; the comments are CORRECTION |
| 4 | `preserved-knowledge/` is presented as current guidance. TND § 6.5 ruled it historical | `.kiro/steering/core-goals.md` L33; `governance/Component-Development-Guide.md` L31; `governance/cross-platform-vs-platform-specific-decision-framework.md` L360 | Thurgood. Core Goals needs a ballot and an identity re-sign; Lina is consulted on her two docs |
| 5 | The autonomy-dial re-deferral (#12 D2) has a named trigger but no IR record, so no walk reads it | new `.kiro/issues/` record | Thurgood files it (the ruling is Peter's) |
| 6 | B-CI § 9 step 5 says the `ci-provenance-line` row is "decided at ratification". No decision is recorded | `.kiro/docs/ballots/2026-09-27-b-ci-unit-branch-ci-feedback.md` L252 | Thurgood |
| 7 | U3's install-region rule and #12's rewrite-vehicle convention live only in their ballots | Integration Guide region header; BR or reg Methodology Notes | Thurgood proposes the homes (EXECUTION of ratified text) |

Not fix-now: `Process-Hook-Operations.md` is labelled historical; Stacy places the `Holds` line at her discretion; link 4's application is scheduled.

---

## 5. Counter-argument

The grant family looks like five ballots doing one job. But each grant is authorized by a different act and ends at a different point. A tasks row is activated by a plan merge and ends at the unit merge. An issue row is activated by Peter's merge of a named PR. A charter grant moves only by a charter edit. P1/P1b may add but never remove. One OWNERS file that loses the "who authorized this, and until when" columns would turn audited grants into standing ones. The signing amendments are similar: each one answers a recorded failure (#284, #445), so merging them may re-open a failure that one of them closed.

---

## Cross-check (Stacy)

*Appended verbatim by the orchestrator.*


Read-only at main `0972178f4`: 7 claims passes, 9 ARMING records, `.kiro/issues/` (root and `archive/`), the register. **PR bodies were not read**: `gh auth status` reports no login, and my charter assigns `gh pr view <n> --json body` to a session holding credentials. Squash bodies (`git log --format=%B`) stand in as a proxy, marked where used.

| Ballot | Reader's call | Your call | Evidence |
|---|---|---|---|
| `2026-08-02-u1-pilot…` / `2026-09-18-u1b…` (dial) | dial trigger has no home | **Confirmed**: nowhere in law. It is also **unfired**, not dead. Neither event has happened: no arming campaign has closed, and no stop-and-wait friction incident is recorded. | grep "autonomy dial" finds only 125-B files and the ballots; `.kiro/issues/2026-09-14-color-token-enforcement-spec-candidate.md` (the named campaign) does not carry the dial; grep "friction incident" finds nothing dated after 2026-09-20 |
| `2026-08-12-q6…` | residue in Process-Hook-Operations | **Confirmed** | `grep -c release-manager governance/Process-Hook-Operations.md` → 36 |
| `2026-09-17-spec-127-outline-settle` (carve-out) | falsification unresolved | **Corrected: the drop limb's event has passed, and its outcome was never applied.** The window was "the first three passes": 127 MIDPOINT, 127 CLOSEOUT, 123 MIDPOINT (2026-10-02). 127 CLOSEOUT counts 0 encounters in passes 1–2 and says "if the third pass also encounters none, the exclusion is dropped". 123 MIDPOINT records no encounter and does not track the limb. Later passes started a new count ("neither limb fires") | `127…/claims-pass.md` L235; 123 MIDPOINT has no "falsif" hit; `claims-pass-release-15.1.0.md` L605; `-16.0.0.md` L385. The charter still carries the carve-out. Caveat: 123 MIDPOINT's zero rests on silence, not a count |
| `2026-09-19-completion-claims-integrity` | three rows unbuilt | **Confirmed**. Until they are built, the claims pass is their interim owner | register: `promised-artifact-exists`, `promised-artifact-shipped`, `parent-completion-docs-present` are all `proposed`, `checks: []` |
| `2026-09-19-disabled-input-parity` (D2) | adoption unevidenced | **Corrected: unfired.** D2 binds at scaffolding, and no component has been scaffolded since the ballot | `git log --since=2026-09-19 --diff-filter=A -- 'src/components/core/*/contracts.yaml'` → empty |
| `2026-09-27-b-ci…` (rule 5) | outdated count (18 → 19), no re-evaluation | **Corrected: its event has passed and the rule was not applied.** Rule 5 said it "is re-evaluated at that flip, before it lands". The parity flip landed 2026-10-03 with no re-evaluation, and the rule's premise is now false: `completion-criteria-parity` reads exactly the docs-only paths. Owed register row: confirmed missing | ballot L125; guide L195; `arming-2026-10-03-parity-flip*.md` and the archived flip issue have no "rule 5"/"provenance" hit; no `ci-provenance` row in the register |
| `2026-09-27-ci-regime-standing-scope` (M3) | no firing evidence | **Corrected: it fired, both halves.** At #227, 11 rows were adjudicated (10 trims, 1 routed with an expiry string). The fix PR #229 closed the assessment-gap | `.kiro/specs/122-agent-generator/completion/coverage-map-lanes-adjudication-ruling.md`; `git log -- canonical/adjudications.yaml`: `465250948` "closes the lanes assessment-gap"; 10 `audit:coverage-map:lanes` rows remain; `127…/arming-2026-09-28-pr229-ci-regime-p1.md` |
| `2026-09-27-normative-counterexample-routing` | routing half has not fired | **Cannot determine.** The route is a message, and no committed trace is required. Every claims pass predates the 2026-10-18 ratification | Settled by: a claims pass after 10-18, or a finding record that names the text's owner |
| `2026-09-28-123-b-u2` | the counted population is decaying: "0 signatures since 15.1.0" | **Corrected**: signatures have been issued since 15.1.0. The open gap line is confirmed | #397 `096e11f99` ("123 first signatures + 4 re-signs"); #445 `05513944e` ("20 first signatures by 7 seats"); #451 `76f4b95cd` (re-signs); `2026-09-28-full-survival-assent-signal-instrument.md` Status ACTIVE |
| `2026-09-28-parent-instrument-existence-check` (M4) | unbuilt | **Confirmed unbuilt, and also unfired** | `.kiro/issues/2026-09-29-instruments-parser-and-resolver.md` ACTIVE, trigger = next new `tasks.md`; `./scripts/owed-set.sh` lists 128–131 as `stub` |
| `2026-10-01-signing-act-chain` (Peter sample) | never ran | **Confirmed**: cumulative 0 / 314. Trigger (d) fired at 15.0.0. S5 then moved the `--audit` half to a delegate; J stays with Peter | `claims-pass-release-15.0.0.md` L131, L303; `-16.0.0.md` L364; `.kiro/issues/archive/2026-10-03-stacy-signed-sample-trigger-d.md` (CLOSED 2026-10-19) |
| `2026-10-03-123-b-u3-install-guide` | nowhere in law | **Confirmed** | its only charter trace is `canonical/agents/thurgood.md` L270 (writeScope path); no rule text |
| `2026-10-17-no-volatile…`; `…-six-roots` | absent from the README roll | **Confirmed** for both. The one six-roots hit is a citation inside edit-kinds | `grep -c` README: no-volatile 0; six-roots 1, at L54 |
| `2026-10-17-standing-write-scope-six-roots` | in force except guard item 2 | **Corrected**: guard item 4, the instrument-path ARMING read, **fired at least 5 times with no read**. My only ARMING read since 10-13 is the registry read, and it marks this limb "not fired" for #427 alone. Sweep unbuilt: confirmed | `05513944e`, `9359c3805`, `bd49e28d5`, `43f22d47b`, `8d62ed8c5` touch `regrounding/**`, `scripts/completion-claims/**` or the parity checker (`git show --stat`); `8033f3a3e` and `ef9c5a9d2` probably touch them too; no `arming*` file dated after 2026-10-13; `.kiro/issues/2026-10-20-in-lane-registry-arming-reads.md` L64 |
| `2026-10-18-obligation-drain…` (M3, M7) | no walk record; the release has not run | **Confirmed unfired**. Note on the register rows (`proposed`): `scripts/issues-owned.sh` partly instruments lapse detection but is not registered as a check | `git tag`: newest is v16.0.0 (2026-10-16), and the ballot was ratified 10-18 |
| `2026-10-18-governance-edit-kinds` | in force (author half) | **Confirmed**. My read half is **unfired**: no pass since ratification | "edit kind" appears 0 times in all 5 Spec 123 passes |
| `2026-10-18-release-flow-5-3…` | lock unbuilt | **Confirmed, and unfired** (trigger: a second duplicate run) | `.kiro/issues/2026-10-18-release-publish-concurrent-runs.md` |
| `2026-10-18-sitting-2…` (S2, S5) | unfired | **Confirmed** | no new `tasks.md` since 10-19; newest pass is 16.0.0 phase 2 (`f1ecee278`, 10-17); no `delegate-audit-*` file |
| `2026-10-18-true-native…` (F-1, F-3) | F-1 field nowhere; F-3 only an issue | F-1 **confirmed**. F-3 **cannot determine**: it binds existing controls "when modified", and #452 modified Button-CTA on iOS and web, the only platform change since 10-18. Its squash body has no F-3 read | 0 `component-meta.yaml` files carry `rendering:`; `git log --since=2026-10-18 -- 'src/components/core/*/platforms/**'` → `a6ed875a9` only. Settled by: #452's PR body, or Lina's read |
| `2026-10-19-instrument-census-at-draft` | in force | **Confirmed**. My census read is **unfired** | "census" appears 0 times in all passes |
| `2026-10-20-grant-ci-deletions…` | in force, never exercised | **Confirmed unfired**: no `.github/**` issue-row grant has activated since 10-20 | `git log --since=2026-10-17 -- .github` → only #427 (P1b) and `e856dc530`; 0 `Grant activation read` lines outside the charters |
| `2026-10-20-in-lane-guard…` (P1b) | used (#427) | **Confirmed**: fired and recorded | `.kiro/issues/2026-10-20-in-lane-registry-arming-reads.md` |
| `2026-10-20-manual-records…` (revisit) | not yet reached | **Confirmed unfired**: no health-check walk since the item landed | newest record is `.kiro/docs/civitas-health-checks/2026-10-17.md` |
| `2026-10-22-hold-act…` | not fired in repo files | **Confirmed** on squash bodies. PR bodies were not read | #445 body: "0 holds"; settled by `gh pr view` from a session with credentials |

### Patterns

My call on each of the 24 rows: 16 confirmed, 6 corrected, 2 cannot determine. Four rows carry an unfired refinement beside their confirmation: dial, M4, edit-kinds read, census read. **Four rows the readers called unfired, not yet due, unevidenced or unresolved had in fact had their event pass**: B-CI rule 5 at the 2026-10-03 flip, the carve-out drop limb at 123 MIDPOINT, six-roots' instrument-path ARMING (at least 5 PRs, 0 reads; this one is my seat's own miss), and ci-regime M3 (fired, not missing). Every claims-pass duty ratified after 2026-10-17 is unfired only because no pass has run since 16.0.0; the next RELEASE fires them all. Rules with prose triggers (the dial, counterexample routing, F-3) have no detector, so unfired and dead look alike.

