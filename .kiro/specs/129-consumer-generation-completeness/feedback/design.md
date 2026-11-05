# Spec Feedback: 129 — Consumer-Generation Completeness (design)

**Spec**: 129-consumer-generation-completeness
**Created**: 2026-11-05
**Phase file**: design. The requirements round is `feedback/requirements.md`; the outline and Q5 rounds are `feedback/design-outline.md`.

---

## Design Feedback

### Context for Reviewers

- **The round is open.** Peter, received 2026-11-05T05:38:16Z (orchestrator relay), verbatim: "658 and 664 are merged; go for design" → design.md header.
- **How design.md was made.** Thurgood assembled it from the four owner inbounds (#665 Lina, #666 Data, #667 Kenya, #668 Ada), all written at `2622faf3e`, cited below as L, D, K and A as design.md's header defines them. Each section names its owner, cites the inbound section, and lists the requirements it satisfies. Thurgood decided only the comparator's interface (design.md § 3). Where inbounds differ, or a call waits on an unanswered `[@NAME]`, the item is in design.md § 16 (O-1 to O-20), with both positions.
- **Facts at round-open**: `evidence/facts-at-10ec4af5b.md`, the unedited stdout of `spec-facts.sh 129 4d10202b2 10ec4af5b`. No root record's Trigger names `design.md`, so this file fires none.

**Settled, not under review** (each with its source):
- Peter's rulings in this round, with his words and times → design.md § 0: decision 5, "Re: 5, 26" (05:54:32Z, D § 6); P-2, "Re: P-2, (1); but we need to address the surviving issue about the larger migration" (05:54:32Z, A § P-2); decisions 4 and 7 and colour-track (iv), "yes, 4 (a), 7 (a)" (13:05:54Z, K § 5, A § P-1).
- The surviving issue in P-2, the channel migration, is answered by colour-track (iv): Spec 133's folder and its records' Triggers (#669, #670, #671) → design.md § 8.
- Item (ii) does not harvest into web output (option A): the team's call, since it breaks no web adopter (L § 5; A § D-5, § P-3). If a reviewer finds that it breaks one, it goes to Peter (O-14).
- Spec 123 Req 1.5: Lina's signed decision, quoted verbatim → design.md § 9. Not for review; its pointer line is Lina's act.
- Everything settled at requirements (`feedback/requirements.md` § "Context for Reviewers"), and D1 as amended (05:14:42Z).

**Under review**:
- Each owner's sections as assembled: is your call recorded as you made it, with the right source and requirement?
- design.md § 16: answer the items addressed to you, or contest a position. Agreement in R1 is what turns "agreed" into final in the Design Decisions register.
- design.md § 3 (the comparator's interface), Thurgood's own call.
- The corrections in this PR: Req 2.6's Android sentence (Data's text), and the dated line in Spec 131's outline.

**Scope boundaries**:
- Not under review: the requirements' acceptance criteria, except where an item in § 16 says a requirement may need a change (O-5, O-15); runner classes and promotions (plan decision 6, tasks); the list's file format and `harness-generate`'s name (tasks); Spec 132's inputs (L § 7), which go through their own processes.
- Core Goals' Android line is not edited in this PR (design.md § 15); how it is made is on the PR's `**Open for Peter**:` line.

**Reviewers and why each is asked** (Spec-Feedback-Protocol § "Stakeholder Identification"):
- **Ada, required**: owner of the pipeline, generators and validators; design.md §§ 4–12 and 14; O-1 to O-8, O-10 to O-13, O-18, O-19.
- **Lina, required**: owner of the component tier; co-owner of Q12, Q13 and Q3a; design.md §§ 4, 9, 10, 13; O-1 to O-4, O-12, O-13, O-20.
- **Kenya, required**: iOS harness owner and verifier; design.md § 1; consulted on § 4; O-1, O-2, O-5, O-7, O-9, O-10, O-17.
- **Data, required**: Android harness owner and verifier; design.md § 2 and the Req 2.6 correction; consulted on §§ 4, 5; O-2, O-6 to O-8, O-10, O-11, O-15, O-16.
- **Stacy, required**: verifiability. Can each design call be checked at CLOSEOUT against its requirement's instrument without asking its author? Read design.md § 3 and O-15 in particular. Stacy is also the confirmer of Core Goals' signed unit (design.md § 15).
- **Leonardo, for the adopter-facing pieces**: the fixed binding names an adopter sees and their aliases (§ 4, O-2, O-3), the founder count's step text (§ 14), and the "built for iOS 17.0, not run on 17" wording rule (§ 0).
- **Sparky, for web items only**: O-14 (option A's web effect; the cascade-order sentence), § 10's web effects of Q3a, § 8's web shadow composite.
- **Thurgood**: assembler; incorporates.
- **Round count**: one R1, then incorporation. A second round only if an R1 entry changes a decision another owner relies on, or raises a question for Peter.
