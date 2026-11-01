# Rule 11 reads every firing of a standing record as a lapse, and a P2 `(guard)` escalates at its first

**Date**: 2026-10-26
**Owner**: Thurgood (owner of `.kiro/issues/README.md`). **Filed by**: Thurgood, under README rule 10, in the PR of ballot `.kiro/docs/ballots/2026-10-26-issues-multi-path-trigger-token.md`, whose § 5 residual 2 names this question and carries it here on Stacy's conditions (consult 2026-10-26, relayed by the orchestrator).
**Trigger**: `release:next:phase-1` — the ballot that answers the question below merges, or Peter rules it unneeded, before the next release's RELEASE phase 1; at that walk this record is closed by a dated outcome line naming the PR or the ruling, or carried with the question still open (rule 1: a P2 that would ride a later change takes this token).
**Class**: P2 obligation (record) · owed-act *(set 2026-10-26, Thurgood, owner, rule 12. The rule's form is wrong for one shape of record: it reads a standing record's every firing as a lapse. The failure runs in the safe direction, an escalation Peter can rule on and not a hidden miss, so no reader is misled into missing anything: `(record)`, not `(guard)`. Not P3: two live records have this shape, and one of them is a P2 `(guard)` that escalates at its first lapse.)*

---

## The question

Rule 11: a record **lapses** at a firing event when no commit that is an ancestor of the event's commit closed it or re-ruled it. A **standing record** is one that does not close while its surface exists: each firing owes a read, appended to the record, and the read always comes after the firing merge (Q5: the reader reads after acceptance). So, by the rule's letter, every firing of a standing record is a lapse, and a P2 `(guard)` record escalates to Peter at its first (rule 11, "Escalation").

The rule's intent for such a record is plainly different: a firing owes a read, not a close. The rule does not say so.

## The two standing records

1. `.kiro/issues/2026-10-20-in-lane-registry-arming-reads.md` (owner Stacy; Trigger `path:.github/in-lane-guards.json`; P2 obligation (guard) · owed-act). Standing since 2026-10-20; it has not fired since it was filed.
2. `.kiro/issues/2026-10-25-arming-read-class-option-fork.md` (owner Stacy), once ballot `2026-10-26-issues-multi-path-trigger-token` is applied: its § 3 site 4 makes it the instrument-path limb's standing home, Trigger `path:<19 globs>`, P2 obligation (guard) · owed-act.

## Stacy's conditions (consult 2026-10-26, relayed by the orchestrator)

1. The question is filed as a root record, owner Thurgood, Trigger `release:next:phase-1`, so it cannot sit unowned. This record.
2. If either standing record fires before this record closes, the escalation that firing causes cites this record.

## The fix

A later ballot, not in the cap of `2026-10-26-issues-multi-path-trigger-token`: one rule-11 sentence for standing records. The shape named there: "a firing owes a read, not a close; it lapses when a release's S arrives with an unread firing". Whether "standing" is read from the record's Status line or from its kind, and how an unread firing is decided from git (for example, a read whose `read through <sha>` is not an ancestor of the firing commit), are the ballot's to settle. LAW; Peter ratifies, record-first; Stacy required reviewer.

*Signed: Thurgood, 2026-10-26.*

## The working reading for 16.2.0, and two consequences (2026-11-01, Thurgood, owner)

**B2, Stacy's corrected wording, used for 16.2.0** (collective sheet r2.1; carried in Spec 131's outline § 13 by #575):

> "lapses unless a commit after the token's previous firing (or, at its first, after the commit that set it), and an ancestor of the event's commit, closed it or changed its Trigger line with a dated reason and authority; the commit that set the token is not itself a re-rule"

It is a working reading, not law. Its standing form is this record's question, routed to Spec 131, row 13. **The deadline (Lina's)**: 131's README rule 11 is ratified by 16.3.0's S, or this reading goes to its own ballot then.

**Consequence 1, the token form (Stacy's phase-1 check).** A `release:next:phase-1` token set during release N resolves to N, so a deferral to N+1 written that way lapses at N's S. Its later date would live only in prose. Re-rules made during 16.2.0 that defer to 16.3.0 therefore use `release:16.3.0:phase-1`.

**Consequence 2, spec rows (Ada's read).** A row answered "spec" follows rule 11's spec clause, not a release deadline. Once the spec's outline names it, its Trigger is the spec's `path:` (for example `path:.kiro/specs/129-consumer-generation-completeness/requirements.md`), and that token is the spec answer's own firing. It carries no 16.3.0 date. The delegation's guard "firing no later than 16.3.0's S" binds the fix-now re-rules only; the rulings record says so, in its PR on `chore/record-r10-reach-and-r7r8-rows`.

*Signed: Thurgood, 2026-11-01.*

