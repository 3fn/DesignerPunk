# Issue: `complete-task.sh --no-ci` says "known-red" for every use, including docs-only follow-ups

**Date**: 2026-09-28
**Status**: ACTIVE
**Owner**: Thurgood (CI regime and completion tooling; ballot B-CI M3)
**Trigger**: `manual` — the fixing PR for the `--no-ci` warning wording (this record's own fix, a wording-only edit to `complete-task.sh` L682 and the usage text at L47–48, L341–342, L379–381) merges. *(Re-ruled 2026-10-25, Thurgood, owner, rules 9 and 11, after the lapse below: the `path:` token named a file, not the event, and #459 fired it by editing other comments and messages in the script. A P3 that would ride takes `manual`, naming its own fixing PR as the event (ballot 2026-10-22-trigger-names-the-event-not-the-vehicle). Was: `path:.kiro/hooks/complete-task.sh` — the next change to the script (the event is unchanged). Unfired at this walk: the script's last change is `90fb0e71e` (2026-09-27). *(Back-filled 2026-10-20, Thurgood, rules 1 and 9, at the pulled-forward walk (Peter's go, 2026-10-20); ledger `archive/TRIAGE-2026-10-20.md`.)*)*
**Superseded trigger (back-filled 2026-10-20; verbatim)**: the next change to `.kiro/hooks/complete-task.sh`.
**Class**: P3 improvement · defect *(set 2026-10-20, Thurgood, rule 12. Wording only: the warning over-reads a docs-only checkpoint as known-red, but it blocks nothing and no package reader meets it.)*
**Source**: Spec 123 U2b, Tasks 13.1–13.8. Docs-only follow-up commits, which add CI-provenance lines and ballot rounds, were pushed with `--no-ci` and drew the warning *"this checkpoint is known-red. Its use is on the honour system"*.

**The defect**: `--no-ci` has two legitimate uses:
- a knowingly red checkpoint;
- a docs-only commit that dispatch would only re-test (B-CI rule 5 lets a doc cite runs on an earlier commit).

The warning names only the first, so the second reads as a red claim. **The fix is the wording only**, for example *"no CI dispatched for this checkpoint (known red, or docs-only per guide § 'CI provenance' rule 5)"*. No behaviour change.

## Lapse (2026-10-25)

Firing commit `6cf38d7b5` (#459, "Ballot audit fix-now: corrections and records (131)"). Signed Thurgood (owner, rule 11; observed at session start, Start Up Tasks item 9).

The `path:` trigger fired because #459 edited `.kiro/hooks/complete-task.sh`. **The edit did not address this record.** It corrected comments and printed messages about the parity check (`check_state: armed`, advisory locally) and the `REQUIRED_WORKFLOWS` count (18 of 19 contexts). The `--no-ci` skip warning is untouched: L682 still reads "this checkpoint is known-red. Its use is on the honour system", and the usage text at L47–48, L341–342 and L379–381 still names only the known-red use. No commit that is an ancestor of `6cf38d7b5` closed or re-ruled the record, so it lapses (rule 11).

Why the close was missed: #459 was merged from the other session, which was fixing the parity-wording class and did not read this record's Trigger against its diff, and the owner was not in seat to see the fire.

Disposition: the ask stands (the two legitimate `--no-ci` uses are still conflated; wording only, no behaviour change). A P3 first lapse does not escalate (rule 11 escalates P0, P1 and P2 only). The Trigger above is re-ruled to `manual` on its own fixing PR. Owed: Thurgood's wording PR (the script and its usage text are in his write scope; the change is not governance law).
