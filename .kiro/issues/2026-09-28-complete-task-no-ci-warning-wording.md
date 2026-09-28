# Issue: `complete-task.sh --no-ci` says "known-red" for every use, including docs-only follow-ups

**Date**: 2026-09-28
**Status**: ACTIVE
**Owner**: Thurgood (CI regime and completion tooling; ballot B-CI M3)
**Trigger**: the next change to `.kiro/hooks/complete-task.sh`.
**Source**: Spec 123 U2b, Tasks 13.1–13.8. Docs-only follow-up commits, which add CI-provenance lines and ballot rounds, were pushed with `--no-ci` and drew the warning *"this checkpoint is known-red. Its use is on the honour system"*.

**The defect**: `--no-ci` has two legitimate uses:
- a knowingly red checkpoint;
- a docs-only commit that dispatch would only re-test (B-CI rule 5 lets a doc cite runs on an earlier commit).

The warning names only the first, so the second reads as a red claim. **The fix is the wording only**, for example *"no CI dispatched for this checkpoint (known red, or docs-only per guide § 'CI provenance' rule 5)"*. No behaviour change.
