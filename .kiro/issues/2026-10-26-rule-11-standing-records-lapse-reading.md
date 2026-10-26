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
