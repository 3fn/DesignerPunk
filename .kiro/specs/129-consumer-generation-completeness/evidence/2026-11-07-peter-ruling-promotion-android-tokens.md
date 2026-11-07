# Peter's ruling, 2026-11-07 15:36Z: promote `harness-android-tokens`; the promotion lifecycle

**Recorded by**: the orchestrator (primary session). This is a record of a ruling, not law.
**Received**: 2026-11-07T15:36:39Z (`date -u`, at receipt).

## Peter's words, verbatim

> a with both additions and short amendment; 714 merged; go for U4

## What each part answered

The paraphrase below is the orchestrator's. Only the quoted line above is Peter's. Peter had just read the orchestrator's decision brief, "promote `harness-android-tokens` to a required check". It was consulted with Thurgood, Data and Stacy.

- **a.** Promote `harness-android-tokens` now, alone, through the grant route the brief listed:
  1. Re-run the stability record at the offer's head, listing the 14 streak runs and 7 cold runs by run id and head SHA, as Stacy asked.
  2. Write an issue-row grant naming the act and the count change.
  3. Add the context to `EXPECTED_CONTEXTS` in `verify-gate-registration.sh`, taking `EXPECTED_COUNT` from 19 to 20.
  4. Add `native-harness.yml` to `complete-task.sh`'s `REQUIRED_WORKFLOWS`.
  5. Peter merges the PR.
  6. Peter adds the context to branch protection.

  Stacy's ARMING read fires at the change.

  Peter accepted the surviving costs as stated:
  - A registry outage blocks every repository PR until someone manually re-runs the job. An infra run must still fail; it is never neutral or skipped.
  - The infra classifier is proven only in Jest (0 of 31 production runs).
  - Every `complete-task.sh` checkpoint also dispatches the harness, including its macOS jobs.
- **both additions:**
  1. A post-promotion rule. After promotion, an infra run means "re-run the job", and a break is not a demotion trigger. This was Thurgood's gap: Decision 6 had no post-promotion rule and no demotion criterion.
  2. An Android toolchain-mismatch falsification fixture case. Condition 1 was met only through shared code, because every existing fixture is iOS.
- **short amendment.** This is the class option: one promotion lifecycle, written once in Decision 6. It covers the re-run rule, the demotion criterion and a grant per context, and applies to every context. What survives against it: it is written before any context has lived through a real outage.
- **714 merged.** GitHub records #714 merged at 2026-11-07T15:36:22Z (`e37bdce07`).
- **go for U4.** Peter's go to start U4 (Task 9).
