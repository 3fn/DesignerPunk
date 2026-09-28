# G1: C3's falsification. Current verdict

**Spec**: 123 (Consumer Distribution) · **Unit**: U2a · **Gate**: G1 (design § "Gates and sequencing", U2 step 4; Req 11.6.7)
**Verdict author**: Stacy. This record sits outside every delegated-tier line. Thurgood, the executing agent, is recused.
**This file holds the current verdict.** Every run is kept separately at `re-grounding-c3-falsification-run-<n>.md`, and this file is updated to the latest run's outcome.

## CURRENT VERDICT: **BREAKS** (run 1, 2026-09-27)

**G1 runs: 1**. Run 1: `.kiro/specs/123-consumer-distribution/completion/re-grounding-c3-falsification-run-1.md`

- **All eleven exemplars reproduce their required verdicts**: A, B, C(c1), C(c2), D, E, F, Lina-1, Lina-2, G and G′.
- **One constructed attack breaks a clause (B-1).**
  - **What breaks**: 11.6.5b's mechanical-half soundness claim ("strict matching can only under-count retention, never over-count it") and design C18 clause 2's restated claim.
  - **Why**: both are false for a record holding two items with the same `text` in one unit. C16 permits this, and the committed `#audit-checklist` record contains it.
  - **The counterexample**: a rendering that keeps 14 of 30 items verbatim, including the shared text once, scores **15/30 under C18 as written, and CLEARS the floor mechanically**. That is the clearing direction.
- **Consequence** (Req 11.6.7):
  - G2 (pass four) is blocked;
  - C3 returns to Thurgood for rework, and then to me as run 2;
  - U2a is not submitted while this stands at BREAKS.
- **Owed an answer in the same rework, and tested at run 2 against per-unit required verdicts committed in run 1: finding B-2.** The definition does not determine whether an item survives by implication from another item's surviving rendering. Lina-1's `#ios` and `#android` units land either way.
- **The grain rule, the C(c1) replacement required verdict, the attacks and the advisories** are in run 1.

## G1 DOMAIN LINE

- **Exercised: the body domain only.**
- **Sources**: two charters (`stacy.md`, `lina.md`), one Layer-3 family doc (`Component-Family-Navigation.md`), and one always-set member (`start-up-tasks.md`).
- **Unit kinds**:
  - heading leaf units (`stacy.md` ×6, `lina.md` ×11, Navigation ×2);
  - `#<parent>:preamble` units ×2 (`lina.md`);
  - **enumeration-kind `#item-…` units ×2 on one always-set member** (G, G′).
- **Item kinds**: obligation, step, member, command, and route (one item, G′ `hc-2`).
- **Clause (a) is exercised by F `#purpose` ONLY.**
  - **C(c1)'s zero-item premise is false**: both named units carry 2 operative items (Stacy 11.2; #220 item 4).
  - **The corpus fact behind it**: every preamble on `stacy.md` carries a trigger, an instruction or a precedence rule, so no zero-item unit exists there.
  - **Fragility**: `#purpose`'s inventory sentence is stale, and a canonical fix that adds binding content would cost clause (a) its only exemplar.
- **NOT EXERCISED**:
  - frontmatter entries;
  - shared-catalog members;
  - `#doc:preamble`;
  - the degenerate `#doc`;
  - always-set members other than `start-up-tasks.md`;
  - any heading or preamble unit on an always-set member;
  - C18's hard floor;
  - dispositions, overlays and signatures (C17).

## Closed-negative disclosure

*Not independently re-verified. Confirmed by the auditing seat.*
- I confirmed the operative sets of A–E, G and G′.
- I constructed A–E, G and G′.
- In run 1 I instantiated the table's constructions as renderings, restated the section-grain verdicts per unit, and stated C(c1)'s replacement required verdict, all as the exemplars' owner.

**Standards implications:**
1. C16/C18 need a rule for items within a unit that share a text (B-1).
2. The superseded parts of Req 11.6.5's table (the C(c1) row; the per-unit restatements of Lina-1 and Lina-2) belong in § "Carried obligations" for the next requirements touch.
3. The #220 tasks-round lesson recurs (an instrument specified without the record rule it depends on).
