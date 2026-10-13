# U1b audience-ruling backward check — Spec 123 Task 24.1

**Date**: 2026-10-13
**Author**: Thurgood (Opus), PRIMARY on Task 24
**Unit**: U4, `task/123-u4-content`, measured at unit head `8007105fa` (governance/ and `package.json` unchanged since)
**Traces**: Req 21.1; design-outline § 6.5; Task 24 criterion 1; Ada's D-T-A6 (`feedback/tasks.md` L296)
**Instruments**: `.kiro/specs/123-consumer-distribution/completion/task-24-instruments.md` rows 1.1–1.11
**Status**: complete for 24.1. Findings are routed by the orchestrator; § 5 "Delivery" records each send.

---

## 1. Scope and yardstick

- **What is checked**: every 125-B prune of a `governance/` doc, against what a consumer needs from the served corpus. 125-B pruned for DesignerPunk's own agents, and it closed without an explicit ruling on who the education layer is for. Prunability depends on the audience: a clause that is redundant here, because a check or a setting enforces it, can be load-bearing in a consumer repo that has neither (outline § 6.5).
- **Population**: Task 24's criterion reads "every 125-B `governance/` prune". Req 21.1 and § 6.5 say "the campaign's prunes", and in 125-B's naming the campaign is U1b (waves 1–4), with the pilot as U1. This record takes the wider set and **includes the pilot prune** (`4992e5926`), which satisfies both texts (instruments block O-5).
- **Scope limit**: `governance/` only (Req 21.1). Hunks the same commits made to `.kiro/steering/Task-Completion-Protocol.md` are excluded by name in § 2.
- **The yardstick**: gate 4a (Req 20, ruled). The corpus ships whole and is MCP-served (20.1), and banners say what is worked example and what is transferable (20.8). A pruned clause is read the way a consumer's agent meets the served doc: in `node_modules/@3fn/core/governance/`, with the generated consumer always-layer, and **without** DesignerPunk's CI, branch protection, hooks or test suites, none of which ship.
- **Routing, not repair**: every finding goes to its owning agent as an explicit message (§ 5). Nothing is fixed in 123 (Req 21.1).
- **Method for "does it ship"**: `npm pack --dry-run --json --ignore-scripts`, the same listing `scripts/pack-assert.ts` asserts against (its L89). Run 2026-10-13 in the worktree: 1657 files, 406 under `src/`. The `src/` entries depend only on `files[]` and the source tree, and neither changed after `8007105fa`.

## 2. The denominator, enumerated from `git log`

**Command** (run 2026-10-13 in the worktree):

```
git log --first-parent --format='%h %cs %s' 8007105fa -- governance/ | grep '(125-B)'
```

**Output, verbatim (10 commits):**

```
4024fdbef 2026-09-18 Task 5.6 Complete: U1b campaign closeout — record, verdicts, ratified sitting (125-B) (#168)
13b0d474e 2026-09-17 Wave 4: register-maintenance rows + wave-3 record repair (rows-only, no prune) (125-B) (#167)
d0f709f9f 2026-09-14 Wave 3: artifact-integrity rows (rows-only, no prune) (125-B) (#160)
1301c2de1 2026-08-25 Wave 2: component/test-governance prune + rows (125-B) (#133)
cbf9929c9 2026-08-12 Wave 1: workflow-gate imperative prune (125-B) (#124)
5ea404e58 2026-08-02 Task 5.1 Complete: U1b campaign roster + measurement arming (125-B) (#113)
4fe6ce9f9 2026-08-02 Task 3 Complete: Pilot Window + Closeout (125-B) (#105)
6df1375ad 2026-07-14 Task 4 Complete: U2 Checks (125-B) (#78)
4992e5926 2026-07-14 Task 2 Complete: Pilot Prune (125-B) (#77)
7b7773cfa 2026-07-14 Task 1 Complete: Pilot Substrate (125-B) (#75)
```

**Content hunks per commit**, outside the register:

```
for c in 4992e5926 cbf9929c9 1301c2de1; do echo "$c:"; git show -U0 --format= $c -- governance/ ':!governance/classification-map.md' | grep -E '^(\+\+\+ |@@)'; done
```

```
4992e5926:
+++ b/governance/Process-Development-Workflow.md
@@ -11 +11 @@ description: Development workflow and task completion practices — task complet
@@ -75,7 +75 @@ description: Development workflow and task completion practices — task complet
cbf9929c9:
+++ b/governance/Process-Development-Workflow.md
@@ -11 +11 @@ description: Development workflow and task completion practices — task complet
@@ -249 +249 @@ get_section({ path: "process-hook-operations", heading: "Quick Reference: Diagno
1301c2de1:
+++ b/governance/Component-Development-Standards.md
@@ -513 +512,0 @@ Verify all schemas are valid and complete:
@@ -686 +684,0 @@ Complete these checks before starting implementation:
@@ -828 +826 @@ schema_validation:
+++ b/governance/Contract-System-Reference.md
@@ -183 +183 @@ excludes:
+++ b/governance/platform-implementation-guidelines.md
@@ -468 +467,0 @@ pre_implementation:
```

**The hunk list (the denominator: 3 prune commits, 7 content hunks):**

| # | Commit | Ballot hunk id | Site (pre-image line) | Kind |
|---|---|---|---|---|
| H1 | `4992e5926` (pilot, U1-p) | S3-1 | `Process-Development-Workflow.md:75–81` | rewrite: 7 lines → 1 pointer |
| H2 | `cbf9929c9` (wave 1) | W1-9 | `Process-Development-Workflow.md:249` | delete a tail clause |
| H3 | `1301c2de1` (wave 2) | W2-2 | `Component-Development-Standards.md:513` | delete a checklist line |
| H4 | `1301c2de1` (wave 2) | W2-1 | `Component-Development-Standards.md:686` | delete a checklist line |
| H5 | `1301c2de1` (wave 2) | W2-4 | `Component-Development-Standards.md:828` | rewrite one line |
| H6 | `1301c2de1` (wave 2) | W2-5 | `Contract-System-Reference.md:183` | rewrite one table row |
| H7 | `1301c2de1` (wave 2) | W2-3 | `platform-implementation-guidelines.md:468` | delete a checklist line |

**Excluded by name: commits that are not prunes.**
- `7b7773cfa`, `6df1375ad`, `5ea404e58`, `4024fdbef` add or update register rows in `governance/classification-map.md` only.
- `d0f709f9f` (wave 3) and `13b0d474e` (wave 4) are **rows-only waves, with no prune**. Their subjects say so, and their `governance/` diffs touch only `classification-map.md`. They are named here and not counted.
- `4fe6ce9f9` adds 2 lines to `Product-Handoff-Protocol.md` (the return-edge pointer). It is an addition, not a prune.

**Excluded by name: hunks that are not prunes, or are out of scope.**
- The `@@ -11 +11 @@` hunks in `4992e5926` and `cbf9929c9` bump `**Last Reviewed**`. They are metadata.
- `.kiro/steering/Task-Completion-Protocol.md`: the pilot's S2-1 and S2-2, and wave 1's W1-1 to W1-6, are out of scope (`governance/` only).
- Wave 4 sent its contradiction rewrites to owner fix PRs instead of the wave diff (`campaign-closeout.md` L45). They are rewrites, not prunes, and are not reviewed here.

**Reconciliation with 125-B's own counts.** The second source is the prune ballots plus the closeout, so a prune committed without a `(125-B)` subject tag could not slip through the `git log` filter unseen.
- The closeout says "Prunes: 2 (12 hunks total, waves 1–2)" (`completion/u1b/campaign-closeout.md` L75).
  - Wave 1's ballot (`.kiro/docs/ballots/2026-08-12-wave-1-workflow-gate-prune.md` L20) has 7 hunks: W1-1 to W1-6 in Task-Completion-Protocol, and W1-9 in Process-Development-Workflow.
  - Wave 2's ballot (`2026-08-25-wave-2-component-test-gov-prune.md`) has 5 hunks: W2-1 to W2-5, all in `governance/`.
  - 7 + 5 = 12. **The `governance/` share is 1 + 5 = 6**, which equals the git count for waves 1–2. The other 6 are steering hunks.
- The pilot's ballot (`2026-07-14-npm-test-imperative-prune.md`) has 3 hunks: S2-1 and S2-2 in Task-Completion-Protocol, and S3-1 in Process-Development-Workflow. Its `governance/` share is 1, and the closeout's 12 does not count it (waves only).
- **Denominator: 3 commits and 7 hunks (H1–H7).** Every hunk a ballot names in `governance/` is in the git list, and every git hunk has a ballot id. Neither side has a hunk the other lacks.

## 3. Hunk-by-hunk review

Verdicts are `no consumer loss` or `finding → <owner>`. "Survives" means the rule is still stated in served prose at `8007105fa`.

### H1 — pilot S3-1, `Process-Development-Workflow.md` step 2 (7 lines → 1 pointer)
- **Removed**: the "Validate Implementation" step listing DesignerPunk's own Jest lanes (`npm test`, `test:all`, `test:performance`, `test:performance:isolated`, timings) and the 2026-07-03 lane-semantics note. **Now**: "Local validation: the unit PR's required checks run the full functional suite at the gate; validating locally first catches failures before they block the merge. Test-command and lane selection …: Start Up Tasks §4–§5."
- **Consumer reading**:
  - The removed text named scripts a consumer's `package.json` does not have, so it was not transferable.
  - In a consumer, the pointer lands on **better** guidance. The consumer profile re-points Start Up Tasks items 4–5 (`canonical/profiles/consumer/always-set/start-up-tasks.dispositions.yaml` L11–12). The rendered consumer copy reads "Use your repo's own test runner … read them from its `package.json`", plus a subtask/parent/performance selection rule (`canonical/_consumer-output/cc/.claude/identity/designerpunk-start-up-tasks.md` L50–60).
- **Verdict**: **no consumer loss.**
- *Residual*: the replacement sentence describes DesignerPunk's PR gate. Process-Development-Workflow matches the banner predicate, so Task 23.2's banner frames it as worked example. That is not a separate finding.

### H2 — wave 1 W1-9, `Process-Development-Workflow.md:249`
- **Removed**: the tail "— never `main`" from "If push fails: Push the TASK BRANCH manually (`git push -u origin <branch>`)".
- **Consumer reading**:
  - The line is error recovery for `./.kiro/hooks/complete-task.sh`, DesignerPunk's completion tool. `.kiro/hooks/` is not in the package (0 entries in the pack listing), so a consumer reaches this recovery step only by adopting the workflow by hand.
  - The retained instruction still names the task branch as the push target.
  - Internally, the clause is redundant because branch protection rejects pushes to `main`. A consumer repo may have no protection, and that is the audience-relative case § 6.5 names.
- **Verdict**: **no consumer loss.** The step's tool does not ship, and the positive instruction names the right target.
- *Residual*: a consumer who copies this workflow into an unprotected repo loses the one explicit prohibition. It is carried by the banner's framing ("the pattern transfers, the authorities do not"). I judged it below finding grade, and a reader may weigh it higher.

### H3 — wave 2 W2-2, `Component-Development-Standards.md:513`
- **Removed**: the schema checklist line "Contracts reference valid WCAG criteria". The wave-2 ballot calls it a dual-rule restatement of `wcag-required-refs` and `wcag-format-validity`.
- **Consumer reading**:
  - What made the line redundant internally is the armed check `src/__tests__/stemma-system/behavioral-contract-validation.test.ts`: L409–417 require "number + text", for example `"2.1.1 Keyboard"`. That test **does not ship** (0 entries in the pack listing).
  - After the prune, the format is stated only in the register row (`governance/classification-map.md` § "wcag-format-validity", rule at L301).
  - The served authoring docs disagree with each other. `Contract-System-Reference.md:152`'s example uses `"2.1.1 Keyboard"`, the conforming form. `Component-Development-Standards.md`'s worked example (L332, 337, 342, 347) uses bare numbers (`"2.1.1"`, `"3.3.1, 1.4.1"`), the form the check would reject in a `contracts.yaml`.
  - A consumer authoring contracts from CDS has no cue that a format exists.
- **Verdict**: **finding → Lina (F-P2).** The prune removed the last prose cue, and the bare-number example predates the prune.

### H4 — wave 2 W2-1, `Component-Development-Standards.md:686`
- **Removed**: the pre-implementation checklist line "Contracts Reference WCAG: Accessibility contracts include WCAG criterion references".
- **Consumer reading**: the rule survives twice in served prose: `Component-Development-Standards.md:825` (H5's rewrite) and `Contract-System-Reference.md:183` (H6's rewrite). The checklist loses a restatement, not the rule.
- **Verdict**: **no consumer loss**, read with F-P1, which concerns how the surviving statements define the allowlist.

### H5 — wave 2 W2-4, `Component-Development-Standards.md:828` → now L825 (rewrite)
- **Before**: "WCAG-referenced contracts must have: wcag field". **After**: "Allowlisted contracts (exact names + accessibility_*/content_*_label prefixes) must carry a wcag value ('N/A' when genuinely not applicable)".
- **Consumer reading**:
  - The rewrite is more accurate. But "exact names" is defined only in the register (`classification-map.md` L339: `interaction_focusable`, `interaction_focus_ring`, `state_disabled`, `state_error`) and in the repo test, which does not ship.
  - `git grep -n -i allowlist -- governance/ ':!governance/classification-map.md'` → two hits, this line and H6's. Neither names the four contracts.
  - Internally the test is the definition. In a consumer, the sentence points at a list the consumer's authoring docs never give.
- **Verdict**: **finding → Lina (F-P1).**

### H6 — wave 2 W2-5, `Contract-System-Reference.md:183` (rewrite)
- **Before**: "`wcag` | WCAG criterion this contract supports (null if not applicable)". **After**: "… required for allowlisted contracts (use the 'N/A' sentinel when genuinely not applicable); null only for non-allowlisted contracts".
- **Consumer reading**: the same gap as H5. The field table says "allowlisted" without saying which contracts are on the list.
- **Verdict**: **finding → Lina (F-P1, the same finding as H5).**

### H7 — wave 2 W2-3, `platform-implementation-guidelines.md:468`
- **Removed**: "WCAG references included for accessibility contracts", from the `pre_implementation.contract_review` template.
- **Consumer reading**: the rule survives at CDS:825 and CSR:183, as in H4.
- **Verdict**: **no consumer loss**, read with F-P1.

### Summary
- **7 hunks: 4 no consumer loss (H1, H2, H4, H7); 3 lead to findings (H3 → F-P2; H5 and H6 → F-P1).**
- That is two prune findings, both Lina's.
- Neither finding questions 125-B's verdicts, which measured DesignerPunk's own agents (W1 MET, probe NO GROSS LOSS). These are the audience-relative cases that campaign did not measure.

## 4. The D-T-A6 residual: served docs naming `src/` paths that do not ship

**Ada's record** (`feedback/tasks.md` L296): "served governance docs that point at **file paths** under `src/` no longer shipped (`src/validators/**`, `src/generators/**`) now point at nothing inside `node_modules` … U4 banner and backward-check territory (Task 24) … Recorded so it is not rediscovered."

**"No longer" is confirmed.** `files[]` before U1's merge (`d566b30ff^` = `4e4546101`) listed `src/` whole. U1 narrowed it to the enumerated floor, which reached consumers in 15.0.0.

**Method**:
1. Candidates: `git grep -n -o -E 'src/[A-Za-z0-9_./*-]+' 8007105fa -- governance/` → **396 mentions, 223 unique strings, 50 docs**.
2. Shipped set: the pack listing (§ 1).
3. Repo set: `git ls-files`.
4. Each string is classified as a file or a directory prefix (trailing punctuation stripped). Globs and placeholders are evaluated as globs against both sets.

**Result:**

| Class | Mentions | Lines | Unique strings | Docs |
|---|---|---|---|---|
| Shipped (the file, or files under the prefix, are in the package) | 236 | — | 112 | — |
| **Not shipped, but in the repo: the D-T-A6 class** | **97** | **96** | **67** | **19** |
| Absent from the repo too (stale for every reader; adjacent, not D-T-A6) | 43 | 42 | 31 | 15 |
| Glob or placeholder, judged as a glob | 20 | — | 13 | — |

- **Ada's two roots**: the 32 mentions under `src/validators/` and `src/generators/` are 28 not shipped, 3 absent from the repo, and 1 glob that matches no packaged file. None ships.
- **Globs that match no packaged file**:
  - `src/generators/*FormatGenerator.ts` (`Rosetta-System-Architecture.md:100`) and `src/providers/*FormatGenerator.ts` (`:378`, `:533`) match repo files, none packaged. They are folded into D-11.
  - `src/components/.../README.md` (`Process-Spec-Planning.md:229`) matches 32 repo files, 1 packaged. It is folded into D-19.
  - `src/components/*/tokens.ts` (`Rosetta-System-Architecture.md:224`, `:233`) matches nothing. The layout is `src/components/core/*/`. It is noted in D-11's row and not counted.
  - The other nine globs match packaged files.
- **Absent-class lines that are not defects**, excluded by name:
  - `Transformer-Development-Guide.md:416`, a hypothetical new file in a how-to ("Create a new file (e.g., `src/generators/transformers/MyToolTransformer.ts`)");
  - `Token-Family-Typography.md:522`, an Android app path (`app/src/main/res/font/`), which belongs to the consumer;
  - `MCP-Relationship-Model.md:307`, a deliberate counter-example ("references `Button-CTA`, not `src/components/core/Button-CTA/schema.yaml`").
- **Findings**: one per doc, in § 5 as D-1 to D-23. These are the 19 D-T-A6 docs, plus 4 docs whose only defect is absent-class (Avatar, Platform-Resource-Map, Token-Resolution-Patterns, Token-Semantic-Structure). Where a D-T-A6 doc also has absent-class lines, they are named in the same row, so each owner gets one message per doc.

**What the banners can and cannot carry.** Ada's residual names banners as one possible remedy. Of the 23 docs with a finding, **7 match predicate v1** and will carry a banner: Component-Development-Guide, Component-Development-Standards, Contract-System-Reference, Process-Spec-Planning, Process-Task-Type-Definitions, Test-Behavioral-Contract-Validation and classification-map. **16 will not, including all 8 of Ada's.** A banner sentence cannot be this residual's general remedy.
- *Class option, not decided here, for the orchestrator to put to the owners*: one sentence where every consumer reader meets it, e.g. the generated consumer always-layer or the docs MCP's served-document preface: "paths under `src/` in DesignerPunk's governance docs name DesignerPunk's repository, not your installed package". *Cost*: one ruled text plus a test. It touches the generator (Lina) or the docs MCP.
- *Its surviving counter*: a blanket disclaimer teaches readers to discount every path, including the 112 that do resolve.

## 5. Findings routed

**Routing rule** (Req 21.1; Task 24 criterion 1): every finding goes to its owning agent as an **explicit message**. Nothing is fixed in 123.
- **Delivery is the orchestrator's** (instruments block O-6). Each "Finding" cell is written to be sent verbatim, with this record's path as its citation.
- **Owners are proposed** from `.kiro/steering/Agent-Directory.md` and confirmed by the orchestrator before sending.
- **Thurgood-owned findings** get their `.kiro/issues/` record from the orchestrator. That path is outside Task 24's Primary Artifacts and my write scope.
- **Counts: 25 findings.** 2 come from prune hunks (F-P1, F-P2, both Lina's) and 23 are path findings (D-1 to D-23). By owner: **Lina 10 · Ada 8 · Thurgood 7**.

| ID | Doc | Line(s) at `8007105fa` | Owner (proposed) | Finding (send verbatim) |
|---|---|---|---|---|
| F-P1 | `governance/Component-Development-Standards.md`; `governance/Contract-System-Reference.md` | CDS 825; CSR 183 | Lina | The two lines 125-B's wave 2 rewrote (W2-4, W2-5) say the WCAG requirement applies to "allowlisted contracts (exact names + accessibility_*/content_*_label prefixes)", but no served authoring doc names the exact contracts. They appear only in the register (`classification-map.md` L339: `interaction_focusable`, `interaction_focus_ring`, `state_disabled`, `state_error`) and in `behavioral-contract-validation.test.ts`, which does not ship. A consumer authoring contracts from CDS or CSR cannot tell which of theirs the rule covers. Disposition is yours. |
| F-P2 | `governance/Component-Development-Standards.md` | 332, 337, 342, 347 (and the pruned 513) | Lina | After 125-B pruned CDS:513 ("Contracts reference valid WCAG criteria"), no served authoring doc states the `wcag` value format (criterion number plus its name, e.g. `"2.1.1 Keyboard"`; `'N/A'` exempt). It is stated only in the register (`classification-map.md` § wcag-format-validity, L301) and enforced only by `behavioral-contract-validation.test.ts:409–417`, which does not ship. CDS's worked example uses bare numbers (`"2.1.1"`, `"3.3.1, 1.4.1"`), which that check rejects in a `contracts.yaml`, while CSR:152's example uses the conforming form. A consumer copying CDS gets the non-conforming form with no cue. Disposition is yours. |
| D-1 | `governance/Component-Development-Guide.md` | 389, 1077, 1222, 1428, 1842, 1865, 1866, 1867 | Lina | 3 lines name `src/` paths that exist in DesignerPunk's repo but are not in the published package (e.g. `src/components/core/Button-CTA/platforms/web/ButtonCTA.web.ts`, `src/components/core/Button-VerticalList-Item/platforms/web/ButtonVerticalListItem.web.ts`); a consumer's agent reading the doc from `node_modules/@3fn/core/governance/` finds nothing there. Also 5 lines name paths that do not exist in the repo either (e.g. `src/indexer/__tests__/GuidanceCompleteness.test.ts`, `src/components/core/ButtonCTA/README.md`). Disposition is yours (label as repo paths, link the repo, re-point, or drop). |
| D-2 | `governance/Component-Development-Standards.md` | 618, 805, 1060, 1110, 1115 | Lina | 5 lines name `src/` paths that exist in DesignerPunk's repo but are not in the published package (e.g. `src/components/core/Input-Text-Base/platforms/web/InputTextBase.web.ts`, `src/__tests__/stemma-system/behavioral-contract-validation.test.ts`); a consumer's agent reading the doc from `node_modules/@3fn/core/governance/` finds nothing there. L1060 is an instruction a consumer cannot follow as written ("Register web components in `src/browser-entry.ts`"). Disposition is yours (label as repo paths, link the repo, re-point, or drop). |
| D-3 | `governance/Component-Family-Avatar.md` | 285 | Lina | 1 line names paths that do not exist in the repo either (e.g. `src/components/core/Avatar/README.md`); they point at nothing for any reader. Disposition is yours (label as repo paths, link the repo, re-point, or drop). The doc gets no banner under predicate v1. |
| D-4 | `governance/Component-Family-Button.md` | 656, 657 | Lina | 2 lines name `src/` paths that exist in DesignerPunk's repo but are not in the published package (e.g. `src/components/core/Button-VerticalList-Set/README.md`, `src/components/core/Button-VerticalList-Item/README.md`); a consumer's agent reading the doc from `node_modules/@3fn/core/governance/` finds nothing there. Disposition is yours (label as repo paths, link the repo, re-point, or drop). The doc gets no banner under predicate v1. |
| D-5 | `governance/Component-Family-Container.md` | 667, 669 | Lina | 2 lines name `src/` paths that exist in DesignerPunk's repo but are not in the published package (e.g. `src/components/core/Container-Base/README.md`, `src/components/core/Container-Card-Base/README.md`); a consumer's agent reading the doc from `node_modules/@3fn/core/governance/` finds nothing there. Disposition is yours (label as repo paths, link the repo, re-point, or drop). The doc gets no banner under predicate v1. |
| D-6 | `governance/Component-Family-Navigation.md` | 262, 263 | Lina | 2 lines name `src/` paths that exist in DesignerPunk's repo but are not in the published package (e.g. `src/components/core/Nav-SegmentedChoice-Base/README.md`, `src/components/core/Nav-TabBar-Base/README.md`); a consumer's agent reading the doc from `node_modules/@3fn/core/governance/` finds nothing there. Disposition is yours (label as repo paths, link the repo, re-point, or drop). The doc gets no banner under predicate v1. |
| D-7 | `governance/Component-Family-Progress.md` | 326, 466, 476, 477, 478, 479, 480, 481 | Lina | 7 lines name `src/` paths that exist in DesignerPunk's repo but are not in the published package (e.g. `src/__tests__/platform-parity/ProgressPlatformParity.test.ts`, `src/components/core/Progress-Indicator-Node-Base/README.md`); a consumer's agent reading the doc from `node_modules/@3fn/core/governance/` finds nothing there. Also 1 line names paths that do not exist in the repo either (e.g. `src/tokens/semantic/color-progress.ts`). Disposition is yours (label as repo paths, link the repo, re-point, or drop). The doc gets no banner under predicate v1. |
| D-8 | `governance/Contract-System-Reference.md` | 51 | Lina | 1 line names `src/` paths that exist in DesignerPunk's repo but are not in the published package (e.g. `src/__tests__/stemma-system/contract-catalog-name-validation.test.ts`); a consumer's agent reading the doc from `node_modules/@3fn/core/governance/` finds nothing there. Disposition is yours (label as repo paths, link the repo, re-point, or drop). |
| D-9 | `governance/DTCG-Integration-Guide.md` | 81, 152, 572 | Ada | 3 lines name `src/` paths that exist in DesignerPunk's repo but are not in the published package (e.g. `src/generators/DTCGFormatGenerator.ts`, `src/generators/types/DTCGTypes.ts`); a consumer's agent reading the doc from `node_modules/@3fn/core/governance/` finds nothing there. Disposition is yours (label as repo paths, link the repo, re-point, or drop). The doc gets no banner under predicate v1. |
| D-10 | `governance/Figma-Workflow-Guide.md` | 168 | Ada | 1 line names `src/` paths that exist in DesignerPunk's repo but are not in the published package (e.g. `src/generators/transformers/FigmaTransformer.ts`); a consumer's agent reading the doc from `node_modules/@3fn/core/governance/` finds nothing there. Disposition is yours (label as repo paths, link the repo, re-point, or drop). The doc gets no banner under predicate v1. |
| D-11 | `governance/Rosetta-System-Architecture.md` | 156, 157, 158, 159, 248, 253, 257, 263, 264, 265, 280, 295, 301, 304, 347, 348, 351, 352, 369, 387, 391, 397, 398, 399, 400, 401, 507, 508, 516, 527, 529, 530, 531, 532 | Ada | 33 lines name `src/` paths that exist in DesignerPunk's repo but are not in the published package (e.g. `src/providers/WebFormatGenerator.ts`, `src/providers/iOSFormatGenerator.ts`), plus globs at L100, L378, L533 that match no packaged file; a consumer's agent reading the doc from `node_modules/@3fn/core/governance/` finds nothing there. Also 1 line names paths that do not exist in the repo either (e.g. `src/tokens/semantic/ColorSemanticTokens.ts`). L224 and L233's glob `src/components/*/tokens.ts` matches no file at all (the layout is `src/components/core/*/`). Disposition is yours (label as repo paths, link the repo, re-point, or drop). The doc gets no banner under predicate v1. |
| D-12 | `governance/Token-Family-Blend.md` | 497 | Ada | 1 line names `src/` paths that exist in DesignerPunk's repo but are not in the published package (e.g. `src/blend/ThemeAwareBlendUtilities.web.ts`); a consumer's agent reading the doc from `node_modules/@3fn/core/governance/` finds nothing there. Disposition is yours (label as repo paths, link the repo, re-point, or drop). The doc gets no banner under predicate v1. |
| D-13 | `governance/Token-Family-Color.md` | 267, 323, 324 | Ada | 3 lines name `src/` paths that exist in DesignerPunk's repo but are not in the published package (e.g. `src/color/OklchValidator.ts`, `src/blend/OklchBlendCalculator.ts`); a consumer's agent reading the doc from `node_modules/@3fn/core/governance/` finds nothing there. Disposition is yours (label as repo paths, link the repo, re-point, or drop). The doc gets no banner under predicate v1. |
| D-14 | `governance/Token-Quick-Reference.md` | 64, 101 | Ada | 2 lines name `src/` paths that exist in DesignerPunk's repo but are not in the published package (e.g. `src/validators/ModeParity.ts`, `src/generators/__tests__/DTCGColorOklchParity.test.ts`); a consumer's agent reading the doc from `node_modules/@3fn/core/governance/` finds nothing there. Disposition is yours (label as repo paths, link the repo, re-point, or drop). The doc gets no banner under predicate v1. |
| D-15 | `governance/Token-Resolution-Patterns.md` | 177, 208, 342, 358 | Ada | 4 lines name paths that do not exist in the repo either (e.g. `src/tokens/generated-types.ts`, `src/tokens/generated-resolvers.ts`); they point at nothing for any reader. Disposition is yours (label as repo paths, link the repo, re-point, or drop). The doc gets no banner under predicate v1. |
| D-16 | `governance/Token-Semantic-Structure.md` | 524 | Ada | 1 line names paths that do not exist in the repo either (e.g. `src/tokens/ShadowTokens.ts`); they point at nothing for any reader. Disposition is yours (label as repo paths, link the repo, re-point, or drop). The doc gets no banner under predicate v1. |
| D-17 | `governance/classification-map.md` | 272, 274, 517, 521, 570, 593 | Thurgood | 4 lines name `src/` paths that exist in DesignerPunk's repo but are not in the published package (e.g. `src/__tests__/console-fail-setup.ts`, `src/__tests__/console-allowlist.json`); a consumer's agent reading the doc from `node_modules/@3fn/core/governance/` finds nothing there. Also 2 lines name paths that do not exist in the repo either (e.g. `src/types/generated/TokenTypes.ts`, `src/types/generated/`). Disposition is yours (label as repo paths, link the repo, re-point, or drop). |
| D-18 | `governance/Platform-Resource-Map.md` | 42 | Thurgood | 1 line names paths that do not exist in the repo either (e.g. `src/tokens/primitives/`); they point at nothing for any reader. Disposition is yours (label as repo paths, link the repo, re-point, or drop). The doc gets no banner under predicate v1. |
| D-19 | `governance/Process-Spec-Planning.md` | 591, 592, 607, 608, 692, 693, 707, 708, 1499, 1500, 1501, 1515, 1516, 1517, 1655, 1656, 2047, 2048, 2049, 2050 | Thurgood | 10 lines name `src/` paths that exist in DesignerPunk's repo but are not in the published package (e.g. `src/build/BuildOrchestrator.ts`, `src/build/platforms/`), plus glob at L229 that match no packaged file; a consumer's agent reading the doc from `node_modules/@3fn/core/governance/` finds nothing there. Also 10 lines name paths that do not exist in the repo either (e.g. `src/build/TokenSelector.ts`, `src/build/interfaces/`). Disposition is yours (label as repo paths, link the repo, re-point, or drop). |
| D-20 | `governance/Process-Task-Type-Definitions.md` | 85, 86 | Thurgood | 1 line names `src/` paths that exist in DesignerPunk's repo but are not in the published package (e.g. `src/build/platforms/`); a consumer's agent reading the doc from `node_modules/@3fn/core/governance/` finds nothing there. Also 1 line names paths that do not exist in the repo either (e.g. `src/build/interfaces/`). Disposition is yours (label as repo paths, link the repo, re-point, or drop). |
| D-21 | `governance/Test-Behavioral-Contract-Validation.md` | 351 | Thurgood | 1 line names `src/` paths that exist in DesignerPunk's repo but are not in the published package (e.g. `src/components/core/Button-CTA/__tests__/ButtonCTA.test.ts`); a consumer's agent reading the doc from `node_modules/@3fn/core/governance/` finds nothing there. Disposition is yours (label as repo paths, link the repo, re-point, or drop). |
| D-22 | `governance/Test-Development-Standards.md` | 1498, 1499, 1500, 1501, 1504, 1505, 1506, 1507, 1510, 1511, 1512, 1557, 1584, 1621, 1660, 1706, 1709, 1712, 1867, 1870, 1873, 1903, 2002 | Thurgood | 14 lines name `src/` paths that exist in DesignerPunk's repo but are not in the published package (e.g. `src/validators/StemmaComponentNamingValidator.ts`, `src/validators/StemmaTokenUsageValidator.ts`); a consumer's agent reading the doc from `node_modules/@3fn/core/governance/` finds nothing there. Also 9 lines name paths that do not exist in the repo either (e.g. `src/components/core/Input-Text-Search/platforms/web/InputTextSearch.web.ts`, `src/components/core/Input-Text-Search/__tests__/InputTextSearch.test.ts`). Disposition is yours (label as repo paths, link the repo, re-point, or drop). The doc gets no banner under predicate v1. |
| D-23 | `governance/Test-Failure-Audit-Methodology.md` | 780, 781, 1157, 1160 | Thurgood | 1 line names `src/` paths that exist in DesignerPunk's repo but are not in the published package (e.g. `src/TokenEngine.ts`); a consumer's agent reading the doc from `node_modules/@3fn/core/governance/` finds nothing there. Also 3 lines name paths that do not exist in the repo either (e.g. `src/release-analysis/git-operations.ts`, `src/release-analysis/history-analyzer.ts`). Disposition is yours (label as repo paths, link the repo, re-point, or drop). The doc gets no banner under predicate v1. |


### Delivery

One line per owner, appended when sent: `<date> — <owner> — IDs <…> — sent by <who> — <message ref>`.

- 2026-10-13 — Lina — F-P1, F-P2, D-1 to D-8 (+ the sweep-5 column finding) — sent by the orchestrator — explicit message in her seat; ACKNOWLEDGED, no owner disputed. Disposition: F-P2 first (CDS's worked example is a non-conforming `wcag` form — a correctness bug), then F-P1 as a § citation from CDS:825 / CSR:183 to the register's allowlist entry (the register ships in `governance/`; only the test does not — a correction to F-P1's premise), then the D-findings in her content-debt batch after U4 merges (same files and lock as 23.2). Paths that exist nowhere (D-3; parts of D-1, D-7) are fixed regardless of convention. She asks that one path convention be settled across the three owners before any owner edits (class option, § 4).
- 2026-10-13 — Ada — D-9 to D-16, D-18 — sent by the orchestrator — explicit message in her seat; ACKNOWLEDGED, no owner disputed (D-18 content accepted; Thurgood keeps stewardship of the table). Disposition: absent-from-repo lines (D-15, D-16, D-18, D-11's `ColorSemanticTokens.ts` and `tokens.ts` glob) as one ballot batch at her next burst, riding the Token-Family claims-vs-source pass; not-shipped lines (D-9, D-10, the rest of D-11, D-12 to D-14) held until Peter rules the § 4 class option. D-11's component-layout lines flagged to Lina.
- Thurgood (D-17 to D-23; `.kiro/issues/` record by the orchestrator): DONE 2026-10-13 — `.kiro/issues/2026-10-13-u1b-backward-check-thurgood-findings-d17-d23.md` (PR #327).
- **Found later (2026-10-13, Lina's owner read of the 23.2 banners — a class this check did not scan)**: six served `governance/` docs name `.kiro/steering/Component-Family-*.md` paths that no longer exist (the family docs live at `governance/Component-Family-*.md` since Spec 119-A; `ls .kiro/steering/Component-Family-*` → none). Counts at `fd18cab72`: Component-Development-Standards ×8, component-meta-authoring-guide ×2, Component-Quick-Reference ×16, Component-Readiness-Status ×13, plus two more files. **Routed to Lina** (her content-debt batch, after U4 merges); the 23.2 banners that called these "locations" are reworded so no banner presents a dead path as a place. This check scanned `src/` paths only (§ 4); dead `.kiro/` paths are the same class one directory over — a candidate extension when the path convention (`.kiro/issues/2026-10-13-src-path-convention-for-served-governance-docs.md`) is settled.

## 6. What this check does not establish

- **It reviews prunes, not the corpus.** A consumer gap that 125-B did not cause is out of scope, except where it sits on a pruned site (F-P2's bare-number example), and it is labelled as such where it appears.
- **"No consumer loss" is the author's reading**, against the stated yardstick. No consumer-side probe was run. The U5 re-run of the reference-corpus probe (Req 26.7) is the only consumer-side evidence 123 will produce.
- **The path sweep is lexical.** It finds `src/` strings matched by one regex. A path written another way, such as a relative link (`../src/...`) caught only by its `src/` tail, or prose naming a file without its directory, is either caught incidentally or missed. Paths under other unshipped roots (for example `scripts/`, `.kiro/hooks/`) are out of D-T-A6's scope and were not swept.
- **Owner attribution is a proposal** until the orchestrator confirms it.
- **The author is a party.** Seven of the 25 findings are in docs I own, and I wrote the 125-B prune ballots this record reviews. A reader should treat H1 and H2's "no consumer loss" accordingly. Stacy's claims pass is the independent read.

## Counter-argument, and what survives

- **Folded in**:
  - A per-mention table of 97 + 43 lines would bury the owners. The findings are per doc, with every line number listed.
  - Absent-class lines are not D-T-A6, but omitting them would send owners a partial picture of the same doc, so they ride in the same row and are counted separately.
  - Three lexical false positives are excluded by name, not silently.
- **What survives**:
  - **H2 is a judgment call.** The internal redundancy was branch protection, which a consumer may lack. I rated it below finding grade because the step's tool does not ship. Someone who reads the served workflow as a template for consumers would rate it a finding → Thurgood.
  - **The wider population** (the pilot included) is my reading of the criterion against Req 21.1's narrower "campaign". Excluding H1 would change nothing in § 5, because H1 has no finding.
