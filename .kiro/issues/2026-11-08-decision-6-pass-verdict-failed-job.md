# Issue: Decision 6 does not say whether a PASS verdict on a job that concluded failure is a streak break; `stability.ts` reads it as not yet measurable

**Date**: 2026-11-08
**Owner**: Thurgood
**Filed by**: Thurgood, under rule 10, on the consult of `fix/129-stability-unfinished-and-pagination`. **Found by** Data: the default-name step (#747) runs after the comparator, so a red there fails the Android job while `harness-verdict` already reads PASS.
**Class**: P2 obligation (guard) · owed-act
**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/tasks.md,.kiro/specs/129-consumer-generation-completeness/evidence/harness-stability.md` — the event that owes the close is the next change to `tasks.md` (the Decision 6 amendment itself, or any other, which then states or re-rules this) or the next committed stability record, which is what a promotion offer or a demotion read cites. The second path is chosen because an offer cannot read a record before it is committed, so the question is answered or re-ruled first.

---

## The gap

Decision 6 condition 2 lists the breaks (cancelled or timed out, no `harness-verdict`, differing attempts, verdict change at one head) and condition 3 counts a run that reached the comparator. A job with a PASS verdict that concluded `failure` is none of those breaks and did reach the comparator, so a literal reading counts it as clean and as a cold run.

## What the code does meanwhile (fail-safe)

`stability.ts` (the PR above): a finished pull-request run with verdict PASS whose conclusion is not `success` is neither clean nor cold. Conditions 2 and 3 of that context read "not yet measurable" and name the run. No offer or demotion read is made on that state.

## What closes it

A Decision 6 text amendment (text first, charter-scope ballot item 1) that says whether this is a break, then the code reads the answer. Peter or the text's owner rules the question; this record owes the amendment, not the answer.
