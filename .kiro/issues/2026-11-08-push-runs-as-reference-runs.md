# Issue: may a push run on `main` serve as the reference run `R` (P1, C1, C3, item 5)? — F-1's deferred question

**Date**: 2026-11-08
**Owners**: Data, Ada, Kenya
**Filed by**: Thurgood, under rule 10, for the ratification of ballot `2026-11-08-closeout-cracks` items 1 and 3
**Class**: P3 improvement · charter
**Trigger**: `manual` — the event that owes the close is the three owners' dated decision on whether a push run may serve as `R`, read once at least one repair case has push-run evidence after ballot site 1.1 merges.
**Trigger author**: Data (rule 9), relayed by the orchestrator on 2026-11-08 and copied verbatim. His reason: this is a P3 with no fixing PR yet, so rule 1 gives it `manual`. `release:next:phase-1` is for P0–P2, and `manual` keeps the record off a `path:` token on `native-harness.yml` (`[STACY R3]` § 3). The rest of the record was written by Thurgood as filer, and Data had no corrections to it.
**Source**: ballot `.kiro/docs/ballots/2026-11-08-closeout-cracks.md` F-1, ruled (a) (Peter, 2026-11-08T20:36:57Z, "Ratified"; record `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-ratifies-cracks-ballot-items-1-3.md`). Data's lean was (b).

---

## The question

- **The rule today.** Ballot `2026-11-07-native-lane-ownership`'s P1, C1 and C3, and Ada's item 5 (`canonical/agents/ada.md` L326), take their reference run `R` from a `workflow_dispatch` run on `main`. Nothing dispatches `main`. So in a repair case, C3's fallback usually finds no run, and the change goes by an issue-row grant: a slower path, but nothing is missed.
- **What changes after site 1.1.** Every merge then has a push run at its squash, and its `harness-consumer` artifact survives 7 days. So a run at, or near, `B` would almost always exist.
- **To decide**: should a push run at `B`, or at a first-parent ancestor of `B` with no change to `harness scripts/harness .github/workflows/native-harness.yml`, serve as `R`?
  - **If yes**, that is a LAW change to the three seats' write-scope conditions. It needs its own ballot: ledger lines on the lane-ownership ballot and an edit to `ada.md`, each seat consulted, Peter ruling.
  - **If no**, this record closes with the reason.

## Evidence to read when it fires

- The number of repair cases since site 1.1 that went by a grant because no `R` was found.
- Whether a push run at `B` existed in each of them.
