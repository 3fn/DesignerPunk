# Charters carry short provenance tags (a date, a name, no SHA) that ship into consumers' copies; the dated-pointer rule does not reach them

**Date**: 2026-10-29
**Owner**: Thurgood (the consumer overlay author, and the filer). Each line's consumer disposition is its charter owner's call: Ada, Data, Kenya, Leonardo, Lina, Sparky, Stacy, Thurgood. Rule 9 applies to every later edit.
**Filed by**: Thurgood, under README rule 10, in the DRAFT of ballot `.kiro/docs/ballots/2026-10-29-dated-pointer-paths-and-edit-kind-check.md` (§ 2.4), which leaves these tags outside its rule.
**Class**: P3 improvement · defect *(set 2026-10-29, Thurgood, rule 12. No reader is misled into a wrong act. A consumer reads DesignerPunk-internal dates and names that mean nothing in their repo.)*
**Trigger**: `manual` — the event is the ballot's ratification. The record is then re-read against the ballot's application, which moves L400 and L432 below. It is also re-read at the next edit to any unit holding a tag.

---

## Finding

- **Source**: Data's RS-54 read, 2026-10-29: "Charters carry a looser third form: inline provenance tags with a date and no SHA … Both of mine render into the consumer cc copy, so DesignerPunk-internal dates already ship to consumers." It is carried on RS-54's R2 line, `.kiro/issues/2026-10-26-release-16-1-standards-implications.md`.
- **Count**: `git grep -n -E '\(ballot 20|ratified 20|Ada 20|Peter, 20' -- canonical/agents` at `0bee92a3e` gives 26 lines:
  - ada.md 320, 414;
  - data.md 85, 500;
  - kenya.md 481;
  - leonardo.md 569;
  - lina.md 387, 588;
  - sparky.md 504;
  - stacy.md 205, 264, 399, 400, 404, 426, 431, 432, 433, 434, 582;
  - thurgood.md 361, 362, 409, 525, 527, 666.
- **The pattern is a heuristic.** It also matches lines that carry a real pointer or a ballot name for another reason: stacy.md L400 and L432 hold #541's pointers, which the ballot's application removes. The count is not a census.
- **Not yet read**: which of the 26 reach a consumer rendering. Data read his two (L85, a frontmatter route; L500, in a signed unit). The others are unread. Many sit in units that are already `re-pointed` with removals covering them.

## Options (named, not picked)

- (a) **Leave.** No churn, and the dates keep shipping.
- (b) **Each owner subtracts the tags in their consumer dispositions.** A `retained` unit becomes `re-pointed`, and is signed for good.
- (c) **Remove them from canonical**, where the tag adds nothing the ledger lacks. Each signed unit then costs a re-confirm and a re-sign.

## Close

Close with rule 5's outcome line, naming each owner's call or one ruling for all of them.
