# Leonardo's Gate System lets a Trivial modification introduce a `value:` product token or a system gap with no human gate

**Date**: 2026-10-27
**Owner**: Leonardo (the Gate System is his charter's text). Rule 9 applies to every later edit.
**Filed by**: Leonardo, under README rule 10, in the application PR (#535) of ballot `.kiro/docs/ballots/2026-10-26-system-token-review-and-token-planning.md` (§ 4 "Follow-ups"; § 12 step 11; § "Plans (Peter's condition)" row 8; [LEONARDO R1] item 4, [LEONARDO C1] item 4).
**Class**: P2 obligation (guard) · owed-act *(set 2026-10-27, Leonardo, rule 12. Under the ratified F-B (c), Product-Token-Governance § "Authoring Workflow" has me discuss a screen's token needs with the product's human lead in the screen spec's review. My charter's Gate System says "**Trivial** (minor modification) → None: self-confirm, proceed". So on a Trivial surface, the gate I load always is weaker than the duty it sits beside, which makes the sub-tag `(guard)`. It is not P0: no text is false, and a colour value or system gap found during the build still goes to the lead under `⟦F-B2⟧`.)*
**Trigger**: `merge:#535` — the event that owes the close is the application PR's merge. From that merge the discussion duty is law, and the Trivial gate still lets me skip a human. The close is my outcome at that merge: a charter ballot DRAFT opened (its PR number appended here), or "leave" with the reason.
**Grant paths**: none.
**Consulted**: none needed for a filing. The outcome is mine to bring (ballot § 4). A charter ballot would consult Thurgood (he applies charter lines) and Stacy.

---

## The gap

`canonical/agents/leonardo.md` § "Gate System" (L466–472 at `2f7d0a164`) sets gate depth by surface novelty. Novel and Established surfaces get a human confirmation of direction; Trivial gets none. A minor modification can still introduce a `value:` product token, a new design value with only my rationale behind it, or name a system gap. Under F-B (c), the spec-time human read is where that token is discussed. On a Trivial surface my charter tells me that read does not happen.

## The outcome options (decided at the trigger, not here)

- **Draft (my current lean).** One sentence added to the Gate System, worded like this: a modification that introduces a `value:` product token or a system gap is not Trivial; it takes at least the Abbreviated gate, and the token is discussed in that read.
  - `canonical/agents/**` prose is a governance path: a ballot, Thurgood applying it byte for byte, and a regeneration.
  - `#gate-system` is a retained consumer unit with a confirmation section, so it owes my re-confirm and no re-sign.
- **Leave, with the reason.** Product-Token-Governance § "Authoring Workflow" already requires the discussion whatever my gate says, so a charter line would be a second copy of the rule.
  - *Surviving counter to leaving*: the charter is always loaded, but that section reaches me only through my route "WHEN defining a product token during screen specification". A Trivial modification is exactly where I am least likely to treat the work as specification.

## Close

Rule 5: a dated outcome line here at the trigger, naming the draft ballot's PR or the leave reason. Then archive.

## Lapse (2026-10-29)

Firing commit `0577bb24c` (#535, merged 2026-10-29T02:20:37Z by its commit time): the record's own Trigger, `merge:#535`. No ancestor of `0577bb24c` closed or re-ruled this record. It was filed inside #535 itself, and its Trigger put the close *at* that merge. So under rule 11's letter the firing is a lapse: this record's first, one distinct SHA.
- **The cause is my miss, not the rule.** A `merge:#<N>` trigger that names the PR filing the record, with the outcome owed only after that merge, lapses by construction. The right shape was one of two: write the outcome inside the PR, or name a later event.
- **Escalation (rule 11: a P2 `(guard)` escalates at its first lapse)**: the record goes to Peter with exactly three options: **spec**, **drop** or **fix-now**. I do not pick among them. This commit discharges the obligation, and the outcome is below.
- This is not the standing-record form named in `.kiro/issues/2026-10-26-rule-11-standing-records-lapse-reading.md`. This record is a one-shot owed-act, and its close came late.

*Signed: Leonardo, 2026-10-29.*

## Outcome (2026-10-29, Leonardo, owner)

**Leave. No charter ballot.** Read at `origin/main` `6f51055ba`:
- `canonical/agents/leonardo.md` § "Gate System" L466–472.
- `governance/Product-Token-Governance.md` § "Authoring Workflow" L56–62, as applied by #535.
- My route at L56 of the charter's frontmatter.
- Core Goals L59.
- Product-Handoff-Protocol § "Leo → Platform (Screen Spec Handoff)".

**Why leave:**
- **My filing over-read the Gate System.** The Gate System is in Design Creation mode. It sets which human confirmations a surface's *brief and visual direction* need, and it says nothing about tokens. It grants no exemption from Product-Token-Governance, and Product-Token-Governance's duty does not depend on how novel the surface is. "Leonardo discusses them with the product's human lead … in the screen spec's review, before implementation starts" applies to every screen spec, a minor modification included. "Trivial → None" removes the brief and direction confirmations. It does not remove the token discussion, so the two texts do not conflict. The class `(guard)` I set at filing rested on that over-reading.
- **The duty reaches me where the act happens.**
  - A `value:` product token on any surface is "defining a product token", the act my route names. The route sends me to § "Authoring Workflow", which requires the discussion.
  - A system gap meets human review through Core Goals L59, which is always loaded ("Creating ANY system token … Always requires human review"). It also goes through Thurgood to Ada.
- **A Gate System line would be a second copy of the discussion rule.** It would be the drift class of the ballot's § 10 residual 6, and it would cost a charter ballot, a regeneration and my re-confirm of `#gate-system`. And the Abbreviated gate it would require ("human confirms direction") is itself no token discussion, so the line would point at the wrong gate.

**What survives, plainly:**
- My route's trigger reads "defining a product token *during screen specification*". On a minor modification I am least likely to frame the work as specification, so the route may not fire. That is reasoning, not data: no product screen has been built.
- It is not fixed here. A dated line in my measurement record adds it as a count at the first product build's Review: any `value:` product token introduced on a Trivial modification without the discussion. A non-zero count re-opens this question with evidence, and the remedy is then the route's trigger, not the Gate System.
- In a product repo with no PR gate, "the screen spec's review" may not happen at all. That is already the measurement record's second count, and no gate line would fix it.

Closed under rule 5 and archived in the same commit.
