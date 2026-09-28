# Issue: Spec 123 Task 11 — two deferred items from Lina's 11.2 confirmations (exemplar F coverage; stale Navigation `#purpose`)

**Date**: 2026-09-27
**Status**: ACTIVE (two items, each with its own trigger)
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

---

## Filed by

Lina, 2026-09-27, at Peter's direction (relayed by the orchestrator), recording his ruling on the two items raised in her 11.2 confirmations. `.kiro/issues/` is outside Lina's charter write scope. The file is written on the orchestrator's instruction, carrying Peter's ruling; it records a deferral and changes no governed content.
