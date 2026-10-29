# UI Tree Convention revision: a `token-gaps:` list in the screen spec (Leonardo proposes; Thurgood authors)

**Date**: 2026-10-27
**Owner**: Leonardo (the proposal). Rule 9 applies to every later edit.
**Author of the convention text**: the Integration Guide's reference remainder is Thurgood's file (ballot `2026-10-03-123-b-u3-install-guide` § 4), so he authors any revision this proposal leads to. This record is not a grant.
**Filed by**: Leonardo, under README rule 10, in the application PR (#535) of ballot `.kiro/docs/ballots/2026-10-26-system-token-review-and-token-planning.md` (§ 4 "Follow-ups"; § 12 step 11; § "Plans (Peter's condition)" row 9; [LEONARDO R1] item 2, [LEONARDO C1] item 4).
**Class**: P2 obligation (record) · charter *(set 2026-10-27, Leonardo, rule 12. The screen spec format gives a system gap no field. Site 3 has the spec name a gap "as a new product token or as a system gap", so a gap is named in prose, which no index reads. The form is incomplete, and no reader is misled. It is P2 and not P3 because a P3 `manual` record is archived stale after two unfired walks, before its event can happen.)*
**Trigger**: `manual` — the event that owes the close is the first product build's Lessons Synthesis Review, the same event as `.kiro/issues/2026-10-27-product-token-planning-measurement.md` (Plans row 9). This repo has no `product/`, so no git-visible token expresses it. If the convention's own revision ("Draft — to be revised after 3-5 real screen specs have been authored", `governance/DesignerPunk-Integration-Guide.md` L791 at `2f7d0a164`) starts first, the proposal goes to that revision.
**Grant paths**: none.
**Consulted**: Thurgood — named as the author of the convention text (ballot § 4; his R1 item 5); his read is owed at the proposal, not at this filing.

---

## The proposal (ballot § 4, as written there)

An **optional top-level list** in the screen spec, beside the nodes' `tokens:` blocks. Each entry is one of two kinds:
- a new product token introduced for the screen; or
- a system gap escalated to Thurgood for Ada.

Each entry has:
- a status, `agreed` or `escalated`;
- a pointer: the Tier 1 outcome in the Implementation Report, the spec's review, or the system feedback request.

The `tokens:` blocks stay the plan. The list does not repeat them. It names what the plan could not take from the system, so a reader, R3-16's check (`.kiro/issues/2026-10-25-product-mcp-screen-token-refs-unchecked.md`) and check (a) (`.kiro/issues/2026-10-27-product-implementation-time-checks.md`) can see it.

## What the Review adds

The measurement record's counts show whether real specs needed the list: how many system gaps were named, and where they ended up. At the Review I bring the proposal to Thurgood with those counts, in his file's revision, or withdraw it with the reason.

## Close

Rule 5: a dated outcome line naming Thurgood's revision PR, his decline with the reason, or my withdrawal. Then archive.
