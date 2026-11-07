# Peter's ruling, 2026-11-07 21:56Z: every `.github/**` grant is an issue-row grant (class option)

**Recorded by**: the orchestrator (primary session). This is a record of a ruling, not law.
**Received**: 2026-11-07T21:56:42Z (`date -u`, at receipt).

## Peter's words, verbatim

> Re: 1, both merged
> Re: 2, Class
> Re: 4, I think you might have to help me understand the issue and ask here, please

## What each part answered

The paraphrase below is the orchestrator's. Only the quoted lines above are Peter's.

- **"Re: 1, both merged."** #742 (tasks amendment 10, U7a) and #743 (the two follow-up records) are merged. This is not a ruling.
- **"Re: 2, Class."**
  - **The question:** Stacy's fork, from her amendment 10 LENS (`[STACY TASKS R7]`), on how U8's (Task 13's) `native-harness.yml` edit is authorized.
  - **The facts behind it:** U7a's workflow edit goes through an issue-row grant, so Stacy's ARMING read fires at its merge. Task 13's equivalent edit (a step in `harness-generate` that can fail required jobs) was planned under a tasks-row grant, which ARMING does not watch.
  - **The options offered:**
    - (a) leave it, so that CLOSEOUT and RELEASE catch it;
    - (b) route Task 13's edit through an issue-row grant (Thurgood's and Stacy's lean);
    - the class option: every `.github/**` grant is an issue-row grant, so ARMING always fires.
  - **Peter picked the class option.** It is Stacy's proposal, offered as cheaper than widening her ARMING trigger set. Thurgood vetted it: "it holds and fits the rules. Rule 8 already describes the `.github/**` grant, and the tasks-row ballot has no CI exclusion. Its cost is one LAW ballot that amends that ballot's clause 5 and its register row."
  - **The counter-argument that survives, as presented to Peter:** each unit that edits any workflow, required or not, then needs its own grant record merged first. That is one more merge for Peter, plus an ARMING read even for workflows that are not required.
  - **The work it starts:** a LAW ballot amending `.kiro/docs/ballots/2026-09-26-tasks-row-write-scope-grant.md` clause 5 and its register row, consulted and then ratified by Peter. Under it, Task 13's workflow edit goes through an issue-row grant. Thurgood authors.
- **"Re: 4, …help me understand the issue and ask here, please."** This concerns the ripple-detector fork in `.kiro/issues/2026-11-07-android-ripple-workaround-detectors-blind.md`. Peter asked for an explanation before ruling, so there is no ruling yet.
- **Not answered in this message:** the go for U7a (Task 20). The orchestrator does not start U7a without it.
