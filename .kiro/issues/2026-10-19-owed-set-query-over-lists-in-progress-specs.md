# Issue: the owed-set query still over-lists specs whose final unit has not merged; the consumer text now says so, the query does not

**Date**: 2026-10-19
**Status**: ACTIVE
**Owner**: Stacy (the query is in my command catalog on both tiers). Thurgood for the copies in his LIVENESS item and `.kiro/hooks/RELEASE-FLOW.md` step 5a, which are kept to the same text.
**Trigger**: `manual` — Peter's answer to the 2026-10-17 health-check question (does the repeat count as "the second wrong owed-set result" that promotes the pipeline to a committed script?). Not computable from git; the walk prints it as `manual`.
**Class**: P3 improvement · defect
**Source**: the residual of `.kiro/issues/2026-10-18-owed-set-query-lists-specs-before-final-unit-merge.md` (fixed 2026-10-19 by disclosure, shape 1); filed under rule 10 in the PR that carries that fix.
**Filed by**: Stacy.
**Grant paths**: none.

---

## What is left

The consumer text now tells its reader that `OWED:` rows are candidates, so the false claim is gone. The query still lists every spec touched since adoption that has no `claims-pass.md`, on both tiers. The two remaining shapes, numbered as in the fixed record:

2. **(shape 2) A counted `open` exclusion (both tiers' copies)**: skip a spec whose `tasks.md` has an unticked parent (`- [ ]` at column 0) and print it under a new excluded class, `open`, so the count stays falsifiable. Counters: a checkbox is an assertion, not a merge fact; a spec with no `tasks.md` (a stub charter) needs its own rule; and every copy of the query changes in step.
3. **(shape 3) A committed script under a scoped grant**: if Peter answers the health-check question "yes", the pipeline becomes a script and shape 2 is built and tested there, with the consumer text pointing at the same rule. Spec-sized, and a Peter ruling.

Neither is authorized by this record. Shape 2 is built inside shape 3 if 3 is chosen, so they are one record. If Peter answers the health-check question "no", this record is closed with that answer and shape 2 is judged on its own.
