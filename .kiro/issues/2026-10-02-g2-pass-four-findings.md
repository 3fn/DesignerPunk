# Issue: G2 pass four's three findings on the derivation check (G2-F1, G2-F2, G2-F3) — Lina's machinery carries, with Thurgood's spec-text half

**Date**: 2026-10-02
**Status**: ACTIVE
**Owner**: Lina (the C15 machinery, its application to the committed profile, and Task 14's rows); **Thurgood** owns the spec-text half of G2-F1 and G2-F2 (below).
**Trigger**: **after the v15.0.0 tag, before U3's gating parent (Task 22) opens its PR** *(amended 2026-10-02 per Peter's ruling; see § "Amendment 2026-10-02 — trigger moved to after the tag")*. Sequence inside the trigger unchanged: Thurgood's spec-text ruling first, then Lina's machinery fix, then a new falsification cycle with its own record and a new G2 request, never a patch inside U2.
*(Superseded 2026-10-02, original text kept: **before the release-2 tag is cut** (Stacy's RELEASE event for release 2). Why this event: release 2 is the first release whose consumers receive the consumer profile, and the profile's mechanical check is the thing G2-F2 says is applied to nothing. After the tag, closing the gap is a patch to a shipped profile rather than a correction to one not yet shipped. The order inside the trigger: Thurgood's spec-text ruling first (the machinery fix's direction depends on it), then Lina's new falsification cycle.)*
**Source**: Stacy's verdict record `.kiro/specs/123-consumer-distribution/completion/re-grounding-pass-four.md` (authored at `3e0e0994` on U2b's unit branch; on `main` at the same path since U2b's merge, #262 `669b51b0`), § "Findings". My carry statement: `completion/task-18-completion.md` § "Carries — routed to this seat by the verdict record" and `completion/task-18-2-completion.md` § "Application-time adaptations" item 1.

---

## The findings (cited by id and path; the text is Stacy's and is not restated here)

All three are in `.kiro/specs/123-consumer-distribution/completion/re-grounding-pass-four.md` § "Findings":

- **"G2-F1 (High): clause (2) accepts any ancestor of S as the destination — attack (f), routed rather than absorbed"**. Owner per the record: Lina (C15 machinery); Thurgood (the design C15 text against Req 11.4's clause (2) text; a spec-standards question). Measured rows: A3 and F5.
- **"G2-F2 (High): the derivation check is applied to nothing on the shipped profile"**. Owner per the record: Lina (C15 application); whether Req 11.4.1's "implemented … against Requirement 10's substrate" requires application to the committed profile is a standards reading for Thurgood. Measured rows: C1 and F3. Her MIDPOINT note on this finding is hers (below).
- **"G2-F3 (Medium): clause (1) is satisfied by construction on the re-pointed lane; the pre-statement and Task 14's rows describe a test model, not the generator's emission of attack (a)"**. Owner per the record: Lina (Task 14 PRIMARY); also a MIDPOINT read item. Measured rows: A1, A2, F3, AS1, AS2.

The record's closing paragraph of § "Findings" ("Standards implications") routes the spec-text half to Thurgood through the EDUCATION route; read it there.

## The constraint that binds the remediation (my Task 18 condition 2)

No machinery is patched inside U2. A machinery fix is **a new falsification cycle, with its own record and a new G2 request after U2b's merge** — never a patch inside U2 (`re-grounding-pass-four.md` § "Findings", the line opening that section; `task-18-completion.md` criterion 5). U2b has merged, so the cycle may now start. It is not a patch to the shipped pass-four record, and it does not reopen pass four's verdict (PASSES with respect to attack (a)).

## Split of work

| Piece | Owner | Depends on |
|---|---|---|
| Spec text: design C15's clause (2) against Req 11.4's clause (2) (G2-F1, G2-F3's pre-statement wording) | Thurgood | — |
| Spec reading: whether Req 11.4.1's "implemented" includes application to the committed profile (G2-F2) | Thurgood | — |
| The check's direction and wiring: clause (2) machinery, and applying the derivation check to the committed consumer profile and rendering | Lina | Thurgood's rulings above |
| Task 14's rows and the pre-statement's "so (1) fails" wording as they describe a test model (G2-F3) | Lina (rows); Thurgood (spec-text wording) | the same rulings |
| The new falsification cycle's record and the new G2 request | Lina requests; Stacy runs | the machinery fix |

**Not part of this issue**: Stacy's MIDPOINT read of Task 14's completion evidence against G2-F2 and G2-F3 is hers (a separate event, her record).

## Counter-argument and what survives

- **Against the trigger**: a new falsification cycle plus a spec-text ruling before the release-2 tag may hold a release for a limit that the Req 24.3 table's limits column already states honestly (the pre-declared PASSES rows list it). The alternative trigger is "after the release-2 tag, before U3's gating parent (Task 22)". That fork is about sequencing, not about the fix, and the pick is Peter's. I chose the earlier event because G2-F1's variant (the one-token change to attack (a)) passes the check, and F5 reaches no human at all; shipping that into consumers and patching later changes what already-installed consumers carry.
- **Against doing the machinery side before Thurgood's ruling**: the fix's direction (span ⊆ destination, or the Req's reading) is the spec-text question; building ahead of it risks a second cycle. Hence the order inside the trigger.

---

## Amendment 2026-10-02 — trigger moved to after the tag

*Appended 2026-10-02 by Lina. Nothing above is struck; the `**Trigger**:` header carries the superseded original text.*

**Peter's ruling, 2026-10-02, verbatim**: "Go with B, after the tag; but we need to capture the follow-up effort so we don't lose sight of the issue."

- **New trigger**: after the v15.0.0 tag, before U3's gating parent (Task 22) opens its PR. This is the alternative this file's § "Counter-argument and what survives" already named ("after the release-2 tag, before U3's gating parent (Task 22)"); the pick was Peter's and is now made.
- **Sequence inside the trigger, unchanged**: (1) Thurgood's spec-text ruling (design C15 text against Req 11.4's clause (2); Req 11.4.1's "implemented"); (2) Lina's machinery fix; (3) a new falsification cycle with its own record and a new G2 request after U2b's merge, never a patch inside U2 (my Task 18 condition 2, § "The constraint that binds the remediation" above).
- **Consequence (Stacy's statement, claims side)**: 15.0.0 ships exactly the check pass four tested, with its limits stated: the 24.3 acceptance table's limit statements and the release notes disclose that the derivation check is not applied to the committed profile (G2-F2) and that a one-token variant of attack (a) passes it (G2-F1). The first correction therefore becomes a patch to a shipped profile, not a correction to one not yet shipped. That cost is accepted by the ruling.
- **Not lost**: this issue is the follow-up record. The walk reads the header trigger above; it fires at the v15.0.0 tag, and U3's Task 22 PR is the backstop (the work must be complete or re-ruled by Peter before that PR opens).
