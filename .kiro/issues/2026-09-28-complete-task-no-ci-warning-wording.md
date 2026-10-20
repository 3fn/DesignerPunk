# Issue: `complete-task.sh --no-ci` says "known-red" for every use, including docs-only follow-ups

**Date**: 2026-09-28
**Status**: ACTIVE
**Owner**: Thurgood (CI regime and completion tooling; ballot B-CI M3)
**Trigger**: `path:.kiro/hooks/complete-task.sh` — the next change to the script (the event is unchanged). Unfired at this walk: the script's last change is `90fb0e71e` (2026-09-27). *(Back-filled 2026-10-20, Thurgood, rules 1 and 9, at the pulled-forward walk (Peter's go, 2026-10-20); ledger `archive/TRIAGE-2026-10-20.md`.)*
**Superseded trigger (back-filled 2026-10-20; verbatim)**: the next change to `.kiro/hooks/complete-task.sh`.
**Class**: P3 improvement · defect *(set 2026-10-20, Thurgood, rule 12. Wording only: the warning over-reads a docs-only checkpoint as known-red, but it blocks nothing and no package reader meets it.)*
**Source**: Spec 123 U2b, Tasks 13.1–13.8. Docs-only follow-up commits, which add CI-provenance lines and ballot rounds, were pushed with `--no-ci` and drew the warning *"this checkpoint is known-red. Its use is on the honour system"*.

**The defect**: `--no-ci` has two legitimate uses:
- a knowingly red checkpoint;
- a docs-only commit that dispatch would only re-test (B-CI rule 5 lets a doc cite runs on an earlier commit).

The warning names only the first, so the second reads as a red claim. **The fix is the wording only**, for example *"no CI dispatched for this checkpoint (known red, or docs-only per guide § 'CI provenance' rule 5)"*. No behaviour change.
