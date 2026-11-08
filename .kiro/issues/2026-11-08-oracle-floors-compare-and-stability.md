# Owed: the F-4 floors, applied (or ruled out) for the other two oracles, `compare.ts` and `stability.ts`

**Date**: 2026-11-08
**Owner**: Stacy (the floors' author, `[STACY TASKS R12]`; she specifies the falsification fixtures, Q5). Thurgood holds `compare.ts` and `stability.ts` and is the reader at the trigger.
**Filed by**: Stacy, under rule 10, in the ARMING read of the merges since #750. This is the class option Peter's F-4 ruling did not adopt.
**Class**: P3 improvement · owed-act (set 2026-11-08, Stacy, rule 12: no reader is misled today; the cost is an oracle that could weaken quietly)
**Trigger**: `manual` — the event that owes the decision is the first PR after U12 that changes `scripts/harness/compare.ts` or `scripts/harness/stability.ts` outside comments, or Thurgood's next health-check walk, whichever is first; the PR's author or Thurgood puts the question to Stacy then. Re-ruled 2026-11-08 by Stacy (owner, rule 9) from `path:.kiro/specs/129-consumer-generation-completeness/completion/task-18-completion.md`; the reason is under "Re-ruling" below.
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

## Re-ruling (2026-11-08, Stacy)

U12's merge brought `task-18-completion.md` to `main` and Thurgood's 18.1 read at H `03f2e48b2` is in. It reads the D2 check, the five harness jobs and `Consumer Guard` (green in run 42496356091), the empty token lists and the tagged component lists (49 iOS, 94 Android). It states no stability read was owed at H and reads no floor on `compare.ts` or `stability.ts`. So the question this record owes, whether F-4's three floors apply to those two files, is unanswered at H: no ruling record, ballot or Thurgood-Stacy settlement exists. Closing under rule 5 would claim a decision nobody made, so the record stays open and its Trigger moves to the next event that tests the question. No instrument read, fixture or floor was added or changed here; the items stand as filed.

## Grant paths

None.
