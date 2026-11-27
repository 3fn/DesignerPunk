# Issue: the stability record's window only grows, and near 800 runs one record exceeds the API's hourly limit, so every record becomes permanently unreadable

**Date**: 2026-11-08
**Owner**: Thurgood
**Filed by**: Thurgood, under rule 10, in Spec 129 tasks amendment 11. Found by Stacy (`[STACY TASKS R11]` New-1, `.kiro/specs/129-consumer-generation-completeness/feedback/tasks.md`).
**Class**: P2 obligation (guard) · defect
**Trigger**: `release:next:phase-1` — the event that owes the close is the next release's S. By then the window's lower bound is written into the Decision 6 text, or into the record that re-homes that text now that Spec 129 has closed (its CLOSEOUT claims pass merged at `693b39b54`). `stability.ts` follows the bound, with the falsification case and the pre-fetch call check below, and this record's rule 5 outcome line names the fixing PR. Start condition (prose): no stability record that reads 400 or more runs is committed before this record closes. *(Re-ruled 2026-11-27 by Thurgood, the record's owner, README rules 1, 9 and 11, at the monthly walk. The `path:` token fired at #812 (`bee5f5345`) and touched again at #819 (`5aa5a3fae`), two changes to `stability.ts` that did not carry the bound. Its glob is wider than the event its prose names, so it fires on every touch of the script, and this owner did not re-rule it at either. A P2 record whose fix rides another change takes `release:next:phase-1` (rule 1). Prior text at `3a3bd072b`.)*

---

## The defect

`tasks.md` § "Decision 6", "The window" (tasks amendment 11), sets the window's lower bound at the workflow's first run, so the window grows with every run.
- **The cost.** `fetchRaw` makes about six API calls per run: a jobs list, a check-runs list per new SHA, and one annotations call per context job, more with re-runs.
- **The limit.** The token's core limit is 5,000 calls an hour (`gh api rate_limit`, 2026-11-08).
- **When it fails.** At about 800 runs, one record can no longer read the per-run lists in full. Under the window rule, every record then reads not yet measurable on every condition, for good. No offer can be made, and the promoted context's demotion read is `not read` permanently.
- **When that could happen.** At Spec 129's pace (114 runs in about 25 hours), it could happen within about a week of runs.

It never produces a false pass, because a short read is not yet measurable. The failure is a read that is blocked for good.

---

## What closes it

The window's lower bound does not grow with the history, and it still covers what each read needs (Stacy's referent):
- for each iOS context, its first run at the current Xcode pin;
- for each promoted context, its promotion's merge, which bounds the demotion inputs;
- for condition 2, the start of its streak.

The bound is a Decision 6 text change made first (charter-scope ballot item 1, "text first"), followed by the code. The fix also carries a falsification case showing that a record over a history larger than the bound reads the same as one over the bound alone, plus a check, before fetching, that the calls needed fit within the hourly limit, which names the shortfall when they do not.

## Why a record and not only a Decision 6 line

A Decision 6 line naming the ceiling, with no record behind it, would be an obligation stated only in a plan line, which rule 10 makes a finding. A record gives the obligation an owner and a firing event, and the next touch of `stability.ts` comes before the ceiling.

---

## Re-ruling (2026-11-08, Thurgood)

The pagination and unfinished-job fix (`fix/129-stability-unfinished-and-pagination`) touches `stability.ts`, so this record's trigger fired there. It is **not closed** by that PR, and it is re-ruled with this dated reason and Thurgood's authority as owner (rule 11). The close needs a lower bound, and "text first" (charter-scope ballot item 1) means the Decision 6 line comes before the code. That is a tasks amendment, which the fixing PR does not carry. **Run count at this re-ruling**: the runs endpoint listed 124 runs, and the regenerated record read 124 of 124 (about 700 calls; the ceiling near 800 runs is unchanged, so about 675 runs of room at the recent pace of roughly 114 runs a day, which is days, not weeks). The trigger now also fires on any committed stability record, and a record that reads 400 or more runs owes this close before the next one is written. The fix is unchanged: a lower bound per read (the first run at the current Xcode pin; the promotion merge; the start of the streak), plus a pre-fetch check that the calls needed fit the hourly limit.

## Lapse (2026-11-27)

Two lapses, by two distinct SHAs. The first is at `bee5f5345` (#812, 2026-11-08), the first commit after this record's last Trigger change (`400f55272`, #753) to touch `scripts/harness/stability.ts`: no ancestor of it closed or re-ruled this record. The second is at `6f507c039`, release 16.3.0's S, at which this record was still open (rule 11: a record still open after a lapse lapses again at each later release's S). A P2 `(guard)` record goes to Peter at its first lapse with three options, spec, drop or fix-now; this walk sends it in its escalation batch (`.kiro/docs/civitas-health-checks/2026-11-27.md` § "Escalations to Peter") with the owner's recommendation, fix-now, which the Trigger above already carries.

**Run count at this walk**: the runs endpoint lists 350 runs of `native-harness.yml`, and the stability record regenerated at this walk read 350 of 350 (about 2,100 API calls against the 5,000 an hour limit). That leaves 50 runs to the 400 line and about 450 to the ceiling. The pace is bursty, not steady: 322 of the 350 runs fell on 2026-11-07 to 2026-11-09, and 28 since. One burst day like 2026-11-08 (147 runs) crosses the 400 line, and two bursts the size of 2026-11-07 to 2026-11-09 reach the ceiling.

*Signed: Thurgood, 2026-11-27.*
