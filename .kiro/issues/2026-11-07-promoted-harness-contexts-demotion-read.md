# Charter: read each promoted harness context for demotion, at every monthly health check and every release

**Date**: 2026-11-07
**Filed by**: Thurgood, under rule 10, in Spec 129 tasks amendment 8, which creates the obligation (`.kiro/specs/129-consumer-generation-completeness/tasks.md` § "Decision 6", "The promotion lifecycle", step 6). Stacy's read of that amendment found that it lived only in a plan line.
**Owners**: Thurgood (the monthly and release-S read), Stacy (the RELEASE read)
**Class**: P2 obligation (guard) · charter
**Trigger**: `manual` — the event that owes the close is either of two. One is that no harness context remains required, because each promoted context has been demoted or the harness retired. The other is that this read is written into a standing home by its owners' ballot: Thurgood's and Stacy's canonical charters, or `scripts/governance-check.sh`. The read starts at the first promotion's merge. Until then this charter is dormant. The monthly walk reads it like every root record, and that walk is where the read happens.

---

## What is read

From a stability record re-run at the read (`scripts/harness/stability.ts`, committed as `.kiro/specs/129-consumer-generation-completeness/evidence/harness-stability.md` while Spec 129 is open), for each promoted context, the demotion triggers of `tasks.md` § "Decision 6", step 6:
- (a) any root record naming a false green, with its pasted evidence;
- (b) the script's infra finding (two or more consecutive infra runs at one head SHA), its infra rate above 10%, or two attempts-differ runs since the promotion's merge with no infra on either attempt.

A trigger offers the context to Peter for demotion. Demotion is Peter's act, under an issue-row grant that names it, and Stacy's ARMING read fires again.

## Where each read is recorded

- Thurgood: one line per promoted context in the monthly health-check record (`.kiro/docs/civitas-health-checks/`) and in his release-S pass, naming the stability record's commit and "no trigger" or the trigger found.
- Stacy: in her RELEASE claims-pass record.

## Where it lives after Spec 129

The stability record's path is under Spec 129's folder. When 129 closes, its owners re-home the record path and this charter's text in the same act that closes or re-rules this charter.
