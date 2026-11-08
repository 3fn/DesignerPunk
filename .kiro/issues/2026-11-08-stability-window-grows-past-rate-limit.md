# Issue: the stability record's window only grows, and near 800 runs one record exceeds the API's hourly limit, so every record becomes permanently unreadable

**Date**: 2026-11-08
**Owner**: Thurgood
**Filed by**: Thurgood, under rule 10, in Spec 129 tasks amendment 11. Found by Stacy (`[STACY TASKS R11]` New-1, `.kiro/specs/129-consumer-generation-completeness/feedback/tasks.md`).
**Class**: P2 obligation (guard) · defect
**Trigger**: `path:scripts/harness/stability.ts` — the event that owes the close is the next PR that touches `stability.ts`. That PR is expected to be the fixing PR of `.kiro/issues/2026-11-07-stability-unfinished-job-read-as-measured.md`, which must land before the next stability record can be read. In that PR, the window gets a lower bound that does not grow with the history, which closes this record. Otherwise the record is re-ruled with a dated reason that names the run count at that time. *(Start condition, in prose: the record is live from its filing. The runs endpoint listed 114 runs at 2026-11-08T00:14:33Z.)*

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
