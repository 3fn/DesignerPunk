# Observation: the `issues-obligation-lapse` register row's rule line restates B2's carrying guards without the requirements guard

**Date**: 2026-11-27
**Owner**: Thurgood (register steward; owner of `.kiro/issues/README.md`)
**Trigger**: `merge:#887` — the CORRECTION in #887 fixes it, and #887's merge is the event that owes the close.
**Class**: P3 improvement · defect *(set 2026-11-27, Thurgood, owner, rule 12: the register's rule line is a summary that a reader can check against the README; it misleads no reader into a wrong act while the README states the guard.)*
**Source**: found at #887's site-4 step (application of ballot `.kiro/docs/ballots/2026-11-27-inbound-handoff-notes-definition.md`), as the straggler its application report named; the orchestrator agreed it is a CORRECTION (2026-11-27).

---

## The observation

Ballot `2026-11-27-inbound-handoff-notes-definition` site 4 (RATIFIED, Peter, 2026-11-27T18:18:45Z, at `91d10e035`; on `main` at `157bdd191`) adds to rule 11 item 2's carrying guard: "`requirements.md` does not exist in that directory at the first parent of the commit on `main` that adds it". The register row `issues-obligation-lapse` (`governance/classification-map.md` L1208) restates the guards as "(with a design-outline.md at its merge base and an **Author**: line)", which omits it. The ballot's site 3 names only a history line, so no site of the ballot carries the rule-line clause.

**Referent**: the ballot's site 4 After, which held before #887 (ratified at `91d10e035`, merged as `157bdd191`). It is not governance text changed in #887, and not enforcement code.

## Outcome (2026-11-27, Thurgood, owner, rule 5)

Fixed in #887 as a CORRECTION: the rule line now reads "(with a design-outline.md at its merge base, no requirements.md at the first parent of the commit that adds it, and an **Author**: line)". Filed and archived in the same PR (rule 5: a record whose fix is in its own PR archives there).

*Signed: Thurgood, 2026-11-27.*
