# Charters carry short provenance tags (a date, a name, no SHA) that ship into consumers' copies; the dated-pointer rule does not reach them

**Date**: 2026-10-29
**Owners**: Thurgood (the consumer overlay author, and the filer); and, each for its own charter line's consumer disposition, Ada, Data, Kenya, Leonardo, Lina, Sparky, Stacy. Rule 9 *(Owner line before 2026-11-05, rewritten for the owners sweep: **Owner**: Thurgood (the consumer overlay author, and the filer). Each line's consumer disposition is its charter owner's call: Ada, Data, Kenya, Leonardo, Lina, Sparky, Stacy, Thurgood. Rule 9)* applies to every later edit.
**Filed by**: Thurgood, under README rule 10, in the DRAFT of ballot `.kiro/docs/ballots/2026-10-29-dated-pointer-paths-and-edit-kind-check.md` (§ 2.4), which leaves these tags outside its rule.
**Class**: P3 improvement · defect *(set 2026-10-29, Thurgood, rule 12. No reader is misled into a wrong act. A consumer reads DesignerPunk-internal dates and names that mean nothing in their repo.)*
**Trigger**: `path:.kiro/specs/131-governance-simplification/requirements.md` — the event that owes the close is Spec 131's requirements: the first commit that adds them takes this record in, or leaves it out with a reason (`governance/Process-Spec-Planning.md` § "Before Formalizing: Records That Name the Spec"). If they leave it out without a reason, it lapses and returns to Peter (rule 11).
*Trigger re-ruled 2026-11-01 (Thurgood, owner, rules 9 and 11). Spec 131's outline names this record in § 13 ("2026-11-01 (scope intake, second batch, record only: it names records and settles no design)", added at `81077eeba`, #617), so the spec answer is carried out (rule 11), and this re-rule descends from that naming commit. The disposition is Peter's fork D, quoted: "Route them. We'll evaluate them as part of that effort — perhaps they can better inform the spec, be combined or inform other proposals, etc.", in fork B's form, route in place. Authority: `R11@25bd478ddb4aca1c77da9eada750f601374fc62a line 16` (fork D) and line 14 (fork B); `DLG@d34fc77868f649d3c67bd1b1da47bc6f2a805920`; `R10@ee5ea2b80e58c26a6dea7e6dfd538d006193f755`. This takes the record from state 2a to state 2. Superseded Trigger, kept verbatim: "`manual` — the event is the ballot's ratification. The record is then re-read against the ballot's application, which moves L400 and L432 below. It is also re-read at the next edit to any unit holding a tag."*

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

- *2026-10-29 (Thurgood, from Ada's R1 on the ballot, § 8): **ada.md L320 is not a date tag.** It is a ballot's name, `(ballot 2026-10-17-standing-write-scope-six-roots)`, which the heuristic's `\(ballot 20` arm catches. It is in `.claude/agents/ada.md` and not in the consumer cc copy. **ada.md L414 is a tag that ships** ("ratified 2026-09-19", consumer cc L160). Ada's call as its owner: (a) leave.*

## Options (named, not picked)

- (a) **Leave.** No churn, and the dates keep shipping.
- (b) **Each owner subtracts the tags in their consumer dispositions.** A `retained` unit becomes `re-pointed`, and is signed for good.
- (c) **Remove them from canonical**, where the tag adds nothing the ledger lacks. Each signed unit then costs a re-confirm and a re-sign.

## Close

Close with rule 5's outcome line, naming each owner's call or one ruling for all of them.

**Routed**: Spec 131 § "2026-11-01 (scope intake, second batch, record only: it names records and settles no design)", the outline row added in the same PR as this line *(2026-11-01, Thurgood, steward, rule 9; under Peter's fork D, R11 line 16, "Route them", `DLG@d34fc77868f649d3c67bd1b1da47bc6f2a805920` and R10, batch routing)*. The Trigger is unchanged. Under fork B (R11 line 14, route in place) its owner re-rules it to `path:.kiro/specs/131-governance-simplification/requirements.md` after this batch merges. This record is not due at 16.2.0's S.
