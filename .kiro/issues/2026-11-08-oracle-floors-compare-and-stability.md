# Owed: the F-4 floors, applied (or ruled out) for the other two oracles, `compare.ts` and `stability.ts`

**Date**: 2026-11-08
**Owner**: Stacy (the floors' author, `[STACY TASKS R12]`; she specifies the falsification fixtures, Q5). Thurgood holds `compare.ts` and `stability.ts` and is the reader at the trigger.
**Filed by**: Stacy, under rule 10, in the ARMING read of the merges since #750. This is the class option Peter's F-4 ruling did not adopt.
**Class**: P3 improvement · owed-act (set 2026-11-08, Stacy, rule 12: no reader is misled today; the cost is an oracle that could weaken quietly)
**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/completion/task-18-completion.md` — the event that owes the decision is U12's merge, which brings that doc to `main`. It is when Thurgood's standing scope over `compare.ts` activates (native-lane ownership ballot, "Activation"), and so the first moment a file the floors would cover has a standing holder. It fires once, not on each edit to either file.
**Source**: `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-rulings-f4-and-u8-go.md` ("Not adopted"): Stacy's class option was not tested with Thurgood and the orchestrator suggested recording it.

---

## The act owed

At the trigger, Thurgood and Stacy settle one question and put it to Peter in a ballot or a ruling record: do F-4's "only gets stricter" floors apply to `scripts/harness/compare.ts` and `scripts/harness/stability.ts`?

The floors as ruled for `d2-check.ts`:
1. **Falsification cases are append-only.** They are added to, never removed or weakened.
2. **A count on each verdict line that is never 0** and never shrinks without a spec row.
3. **Base against head on the same input**, so a head that reads less than the base is caught.

## What this record does not decide

- Whether the floors fit. `stability.ts` already shows the pressure: #753 deleted 43 lines of `stability.test.ts` including a whole case ("a record with no status field is read as finished") because the rule changed. An append-only floor would have needed a spec row for that, which is the point, and also a cost. The fit is the question the trigger owes.
- Any fixture. Stacy specifies them only after the ruling.

## What survives against it

An append-only floor does not stop an oracle being wrong in a way no case covers, and a count floor can be met by padding. Both held for F-4 and hold here.

## Grant paths

None.
