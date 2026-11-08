# Issue: the stability record's window only grows, and near 800 runs one record exceeds the API's hourly limit, so every record becomes permanently unreadable

**Date**: 2026-11-08
**Owner**: Thurgood
**Filed by**: Thurgood, under rule 10, in Spec 129 tasks amendment 11. Found by Stacy (`[STACY TASKS R11]` New-1, `.kiro/specs/129-consumer-generation-completeness/feedback/tasks.md`).
**Class**: P2 obligation (guard) · defect
**Trigger**: `path:scripts/harness/stability.ts,.kiro/specs/129-consumer-generation-completeness/evidence/harness-stability.md` — the event that owes the close is the first PR that touches `stability.ts` after the Decision 6 text gives the window a lower bound that does not grow with the history, or a committed stability record that reports 400 or more runs read, whichever comes first. *(Re-ruled 2026-11-08 by Thurgood, the record's owner, README rule 11; the earlier trigger, `path:scripts/harness/stability.ts`, fired on the pagination fix's PR. Prior text at `beccbf134`.)*

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
