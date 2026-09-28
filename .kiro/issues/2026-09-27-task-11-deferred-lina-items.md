# Issue: Spec 123 Task 11 — two deferred items from Lina's 11.2 confirmations (exemplar F coverage; stale Navigation `#purpose`)

**Date**: 2026-09-27
**Status**: ACTIVE — Item 2 EXECUTED 2026-09-27; Item 1 EXECUTED 2026-09-28 (Task 13.0; its steps 4–5 ride G2 and 13.4)
**Owner**: Lina
**Trigger**: Item 1 fires at **the U2b branch cut** (before Task 13.4). Item 2 fires **immediately after U2a merges**. Each item below states its latest acceptable point.
**Source**: Lina's 11.2 subtask doc, `.kiro/specs/123-consumer-distribution/completion/task-11-2-lina-completion.md` (§ "What changed": the F decision, its surviving residual, and the fragility flag), and the confirmation note `canonical/profiles/consumer/confirmations/component-family-navigation.md` (both on `task/123-u2a-g1`). **Ruling**: Peter, 2026-09-27. Both items are DEFERRED, with the triggers below.

---

## Item 1 — Exemplar F does not cover one classifier error class

**The gap.** F pairs `governance/Component-Family-Navigation.md` `#purpose` (0 items → clause (a), inapplicable) with `#key-characteristics` (5 label-shaped items, all binding → operative).
- **It catches** a classifier that reads `- **Label**: value` bullets as non-binding definitions. That error shrinks the denominator, which is the dangerous (clearing) direction and the one 5d guards.
- **It does not catch** a classifier that treats label **shape** itself as operative. A rule of *"label-shaped bullets are operative, prose is not"* passes F, because in F's pair form and normativity vary together.
- The failure costs spurious routing (reviewer time), not a false clear. It is still a hole in 5c's claim that the classifier *"keys on normativity, not form."*

**Fix.**
1. Add a third F unit that is **label-shaped but descriptive**. The candidate is Navigation's `#family-overview:preamble` (`**Family**: Navigation`, `**Shared Need**: …`, `**Readiness**: …`), 0 items, required verdict **inapplicable**. It holds form constant against `#key-characteristics`. Re-check the candidate at execution time: if Item 2's fix has edited this unit or its neighbours, re-verify that it still carries zero operative items.
2. File a **tasks amendment on `main`**. It changes the "clause (a) is exercised by F's `#purpose` only" wording (#220, Task 11 and Task 12 criteria) and adds the unit to the exemplar set. *(Addendum 2026-09-27, at the U2b-cut amendment: the Task 11 and Task 12 criteria are **not** edited. Both parents are merged (#222), their completion docs reproduce those rows verbatim, and the wording was true of G1's eleven exemplars. The third unit is added at Task 13.0 and joins G2's domain.)*
3. **Lina confirms** the new unit: a record entry in `canonical/operative-sets/component-family-navigation.yaml`, a note block, and the precursor test green.
4. **Stacy includes the unit** in the domain of the relevant gate.
5. **13.4's bite tests** (`triviality.ts`, clause (a) as read from the record, and the floor) are written against **all three** F units. *(Wording corrected 2026-09-27, Lina's carried item: `triviality.ts` applies no classifier; it reads clause (a) from the committed record.)*

**Trigger: the U2b branch cut**, before Task 13.4 implements the floor (clause (a) read from the record) in `triviality.ts`, as a tasks amendment on `main`.
**Latest acceptable: before G2 (Task 18)**, so that pass four's domain line covers it.

**Why the earlier point was declined.** It would have been a fifth mid-parent amendment on Task 11, and G1 runs on the eleven exemplars as ruled. The G1 record cannot claim a unit added after it.

**Item 1 — EXECUTED 2026-09-28** (Lina, Spec 123 Task 13.0, on branch `task/123-u2b-lina-13-0`, cut from the U2b unit branch `task/123-u2b-profile` @ `ba015900` = `main`).
- **Precondition met.** Fix step 2's tasks amendment on `main` landed as **#225** (`00078f11`, the U2b-cut amendment). It added 13.0 and the criterion row, and left the Task 11 and Task 12 wording unedited, per the addendum above. #223 (`14aa8c23`) is in the branch's ancestry. No `triviality.ts` exists yet: `git log --all -- tools/agent-generator/regrounding/triviality.ts` is empty.
- **What changed.**
  - `canonical/operative-sets/component-family-navigation.yaml` gains `#family-overview:preamble` (0 items).
  - `canonical/profiles/consumer/confirmations/component-family-navigation.md` gains its C1 note block. The 11.2 decline is marked superseded in part (the `#purpose` / `#key-characteristics` pair stands).
- **Re-verified, not carried over.** #223 edited this unit (`**Readiness**`: 2 → 5 components). Its hash moved from `sha256:995a525f…` (at `14aa8c23^`) to **`sha256:0b09be78566cb1466b5d4ea062b5c3344499cbf60ef4f4e4f4f0bb9e28c81f0c`** (at `14aa8c23`; the branch's copy of the doc is byte-identical to it). The edited line is still a status and inventory statement, so the unit still has **0 operative items** and the required verdict is **inapplicable**.
- **Verification.** Precursor test **22/22** (the per-record tests iterate units, so the count does not rise). Three bites on the new unit, each restored: a corrupted note hash, a stale record hash, and `items: none` → one id. Each turned the test red naming `#family-overview:preamble`.
- **Residual, surfaced not picked.** Form is held constant at `**Label**: value` but not at the list marker (these lines carry no `- `). See the note block.
- **Remaining fix steps** are not Lina's here: step 4 (Stacy's gate domain) and step 5 (13.4's bite tests over all three F units, which is Lina's at 13.4).

**Cross-reference.** The requirements 11.6.5 F and C(c1) rows are carried to the next requirements touch (`tasks.md` § "Carried obligations", #220). When that touch edits the F row, it should name the pair as instantiated (`#purpose` / `#key-characteristics`, plus the third unit if added). F's R2 wording (`## Overview` / `### Inheritance`) names sections that no family doc has.

---

## Item 2 — Stale inventory sentence in `governance/Component-Family-Navigation.md` `#purpose`

**The gap.** `#purpose` says *"Implemented components include a segmented control … and a primary bottom tab bar …"*, and the `**Readiness**` line in `#family-overview:preamble` says *"2 components implemented"*. **Five exist** under `src/components/core/`: `Nav-SegmentedChoice-Base`, `Nav-TabBar-Base`, `Nav-Header-Base`, `Nav-Header-Page`, `Nav-Header-App`. The doc is MCP-served, so agents read the wrong count.

**Constraints on the fix.**
- **The fix changes `#purpose`'s hash**, so Lina must re-confirm the unit (C16).
- **`#purpose` is the only exemplar exercising clause (a)** (#220, item 4). The rewrite **must stay descriptive**: an inventory statement and an orienting purpose, with no sentence a consumer implementation could violate. If it gains a binding item, clause (a) loses its exemplar. That would be a finding against the gate domain, not just a doc edit.
- If the `**Readiness**` line is corrected in the same change, `#family-overview:preamble`'s hash changes too. That unit has no record today; if Item 1 has added it by then, it needs re-confirmation as well.
- **Ballot**: `governance/` content changes go through the ballot measure model (Peter approves the wording). The shared doc is not edited unilaterally.

**Fix.** A chore PR on `main` that, **in one commit**:
1. corrects the component count or inventory in `#purpose`, keeping it descriptive;
2. re-confirms the unit in `canonical/profiles/consumer/confirmations/component-family-navigation.md`, with the new `canonicalHash`, `items: none` and the date;
3. updates the `#purpose` `canonicalHash` in `canonical/operative-sets/component-family-navigation.yaml`.

**Verification**: `npx jest --config jest.functional.config.js src/__tests__/operative-set-records.test.ts` → 22/22, output cited.

**Trigger: immediately after U2a merges.**
**Latest acceptable: before 13.6 arms the freshness sweep.** After that, a canonical edit without re-confirmation fails CI on its own. That is correct behaviour, but it turns this chore into a red build.

**Why the earlier point was declined.** G1 is testing this exact unit. Changing its hash mid-gate would reopen its confirmation while the gate is in flight.

**Cost of deferral.** The served doc carries a wrong component count for about one unit's duration.

**Item 2 — EXECUTED 2026-09-27** (Lina, branch `chore/123-post-u2a-lina-nav`, from `main` @ `24c7f060` after U2a merged as #222).
- **What changed.** `#purpose` now reads *"Five components are implemented: …"* and names the three headers. The `**Readiness**` line in `#family-overview:preamble` changed from `2 components implemented` to `5 components implemented`. That unit has no record, so it needed no re-confirmation.
- **Re-confirmation.** `#purpose` was re-confirmed at 0 items in the same commit: record hash `6e5be410…` → `d53f8e98…`, and the note carries the re-confirmation.
- **Verification.** Precursor test 22/22.
- **Not a ballot.** Per the orchestrator's relay: a factual fix to the owner's own family doc is content correctness, merged by Peter under the governance carve-out. This supersedes the "Ballot" line above for this fix.
- **Residual, out of this item's scope.** Other units of the same doc are still stale:
  - `#component-hierarchy` and `#components` list Nav-Header-Base as PLANNED and omit Nav-Header-Page and Nav-Header-App;
  - `#stemma-system-integration` lists only two implemented primitives and counts Header as a planned variant.
  - None of these units has an operative-set record. The fix is a Lina docs pass at the next Navigation-family touch.
- **Item 1 stays open.**

---

## Filed by

Lina, 2026-09-27, at Peter's direction (relayed by the orchestrator), recording his ruling on the two items raised in her 11.2 confirmations. `.kiro/issues/` is outside Lina's charter write scope. The file is written on the orchestrator's instruction, carrying Peter's ruling; it records a deferral and changes no governed content.
