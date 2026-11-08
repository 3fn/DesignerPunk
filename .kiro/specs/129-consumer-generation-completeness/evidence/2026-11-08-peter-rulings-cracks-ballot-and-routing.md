# Peter's rulings: draft the "CLOSEOUT cracks" ballot; route the instance fixes

**Recorded by**: the orchestrator, timestamped from the clock at receipt (`date -u`).

## The exchange

1. **Put to Peter** (orchestrator, 2026-11-08, after consulting Thurgood and Stacy). The question was how to close the class patterns that Spec 129's CLOSEOUT (#791) exposed.
   - **1 (a)**: run `native-harness` on every push to `main`, with a named reader. This needs a small ballot, a grant for the workflow, and a `stability.ts` change, with Data and Kenya consulted.
   - **1 (b)**: require PR branches to be up to date before merge. This is a branch-protection setting, and Peter's.
   - **2**: parity goes red when a parent's completion doc exists but its box is unticked. The owed-set uses the same key. This is a ballot, and Thurgood's.
   - **3**: a PR-time check that lists the records the diff fires, warn-only for one cycle.
   - **4**: Thurgood's header-format check, S-3.

   The recommendation was one ballot drafted by Thurgood, carrying 1 (a), 2, 3 and 4, with (b) on top only if Peter would rather prevent than detect.
   - **Q1** asked: should Thurgood draft that ballot, and does Peter also want (b) now?
   - **Q2** asked: route the instance fixes to their owners?
2. **2026-11-08T17:02:40Z**, Peter: **"Re: 1, Yes, please / Re: 2, Yes, please"**

## What was ruled

- **Q1, yes.** Thurgood drafts the "CLOSEOUT cracks" ballot with items 1 (a), 2, 3 (warn-only first) and 4.
  - Stacy reviews it.
  - Data and Kenya are consulted on the harness trigger.
  - Ada is consulted where the owed-set and records touch her.
  - **On (b)**, Peter's "Yes, please" answers a question that also asked whether he wants (b) now. (b) is a branch-protection setting that Peter changes himself. The orchestrator does not change repository settings. The ballot records (b) as Peter's to apply, and Peter's toggle is the act.
- **Q2, yes.** The instance fixes go to their owners as ordinary PRs:
  - Ada: CP-1, CP-3 and CP-4.
  - Lina: CP-2's retag. `harness/expected/**` has no standing owner, so it needs an issue-row grant. The charter record closes after the retag.
  - Kenya: CP-12.
  - Thurgood: CP-7, CP-8, CP-11 and CP-13.
