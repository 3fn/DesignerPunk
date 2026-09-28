# G1: C3's falsification. Current verdict

**Spec**: 123 (Consumer Distribution) · **Unit**: U2a · **Gate**: G1 (design § "Gates and sequencing", U2 step 4; Req 11.6.7)
**Verdict author**: Stacy. This record sits outside every delegated-tier line. Thurgood, the executing agent, is recused.
**This file holds the current verdict.** Every run is kept separately at `re-grounding-c3-falsification-run-<n>.md`, and this file is updated to the latest run's outcome.

## CURRENT VERDICT: **HOLDS** (run 2, 2026-09-27)

**G1 runs: 2**
- Run 1: **BREAKS** — `.kiro/specs/123-consumer-distribution/completion/re-grounding-c3-falsification-run-1.md`
- Run 2: **HOLDS** — `.kiro/specs/123-consumer-distribution/completion/re-grounding-c3-falsification-run-2.md` (the current verdict)

- **All eleven exemplars reproduce their required verdicts under the reworked text** (`requirements.md` blob `deeb810b`, § 11.6 and 11.7.2; `design.md` blob `bf8d57b7`, § C18).
  - The exemplars are A, B, C(c1), C(c2), D, E, F, Lina-1, Lina-2, G and G′.
  - This includes every per-unit restatement committed in run 1, among them Lina-1 `#ios` and `#android`, NOT TRIVIAL at 2/3.
- **No attack I constructed breaks a clause.**
  - **Run 1's B-1 is closed**: AX-1 scores 14/30 under the occurrence assignment and routes.
  - **Run 1's B-2 is determined** by 5e, which, applied literally, gives G's tasks-round sketch 2/7, TRIVIAL.
- **Consequence** (Req 11.6.7): U2a proceeds to submission, G2 is schedulable, and Task 13 proceeds in U2b.
  - `G1 runs: 2` fires M-1: I do a scoped post-acceptance read after U2a is accepted.
- **Carried, not verdict-bearing: R2-F1 (HIGH).** 5e does not itself scope "the rendering" to the unit. Under a charter-wide reading, a unit emptied in place whose function is stated elsewhere would take no disposition, which is attack (a) arriving through the bar.
  - The governing clause (b) ("**its** rendering") fixes unit scope, which is why this HOLDS.
  - The property must be stated in the definition before the first routed signature (Task 15). I re-check it at the U2b MIDPOINT.
  - Also carried: DR-1, the C18 required bite, which has no Task 13 criterion row; advisories R2-A1 to R2-A3; and notes DR-2 to DR-4. All are in run 2.

## G1 DOMAIN LINE

- **Exercised: the body domain only.**
- **Sources**: two charters (`stacy.md`, `lina.md`), one Layer-3 family doc (`Component-Family-Navigation.md`), and one always-set member (`start-up-tasks.md`).
- **Unit kinds**:
  - heading leaf units (`stacy.md` ×6, `lina.md` ×11, Navigation ×2);
  - `#<parent>:preamble` units ×2 (`lina.md`);
  - **enumeration-kind `#item-…` units ×2 on one always-set member** (G, G′).
- **Item kinds**: obligation, step, member, command, and route (G′ `hc-2`).
- **Clause (a) is exercised by F `#purpose` ONLY.**
  - **C(c1)'s zero-item premise is false**: both named units carry 2 operative items (Stacy 11.2; #220 item 4).
  - **The corpus fact**: every preamble on `stacy.md` carries a trigger, an instruction or a precedence rule, so no zero-item unit exists there.
  - **Fragility**: `#purpose`'s inventory sentence is stale, and a canonical fix that adds binding content would cost clause (a) its only exemplar.
- **NOT EXERCISED**:
  - frontmatter entries;
  - shared-catalog members;
  - `#doc:preamble`;
  - the degenerate `#doc`;
  - always-set members other than `start-up-tasks.md`;
  - any heading or preamble unit on an always-set member;
  - C18's hard floor;
  - dispositions, overlays and signatures (C17);
  - cross-unit entailment against a real rendering (R2-AX-6 is a construction).

## Closed-negative disclosure

*Not independently re-verified. Confirmed by the auditing seat.*
- I confirmed the operative sets of A–E, G and G′.
- I constructed A–E, G and G′.
- In run 1 I instantiated the table's constructions as renderings, restated the verdicts per unit, and stated C(c1)'s replacement required verdict. Run 2 tested those same commitments, unchanged.

**Standards implications:**
1. R2-F1: state the unit scope of entailment in C3 (before Task 15).
2. DR-1: carry C18's required occurrence bite into Task 13's criteria (before 13.4).
3. R2-A2: 13.4 decides whether the assignment must be maximal.
4. Fold the superseded 11.6.5 rows, DR-4 and the stale "Against the exemplars" counts into the table at the next requirements touch.
