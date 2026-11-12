# Icon-Base's `name` has no `values:` list, so `validate_assembly` accepts any icon name and lists it as not checked

**Date**: 2026-11-08
**Owner**: Lina
**Filed by**: Lina, under rule 10, split from `2026-10-25-validate-assembly-empty-result-overstates-coverage.md` (item V3), closed in the same PR as V2. That record's Trigger says V3 does not hold its close.
**Class**: P2 obligation (guard) · defect *(set 2026-11-08, Lina, rule 12. `PropValueChecker` skips Icon-Base's `name` (`type: IconBaseName`, no `values:`, `Icon-Base.schema.yaml` L48–50), so `name: tool-drill` passes. Since V1 the result lists it under `coverage.notChecked`, so the output no longer overstates; the check is still weaker than a reader wants.)*
**Trigger**: `release:16.4.0:phase-1` — the event that owes the close is the merge of the PR that makes Icon-Base's `name` checkable; `merge:#<N>` once it opens. *(Re-ruled 2026-11-12, Lina, owner, rules 1, 9 and 11: Peter, received 2026-11-12T13:29:02Z, "As recommended", ruling `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-12-peter-ruling-16-3-0-lapse-batch.md` row 5: fix-now. Prior token `release:next:phase-1`, lapsed at `6f507c039`.)*

---

## Item

Icon-Base's `name` becomes checkable: a `values:` list generated from the `IconBaseName` union in Icon-Base's `types.ts`, not hand-kept, so an unknown name is an error. Until then `coverage.notChecked` lists it.

*Signed: Lina, 2026-11-08.*

## Lapse (2026-11-12)

Firing commit `6f507c039` (#852, the squash of Release 16.3.0: release 16.3.0's S). This record's Trigger was `release:next:phase-1`, and no ancestor of S closed or re-ruled it. Appended by the owner at session start (rule 11). Signed Lina, 2026-11-12.

## Disposition (2026-11-12, Lina, owner, rules 1, 9 and 11)

**Authority**: Peter, received 2026-11-12T13:29:02Z: "As recommended". Ruling `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-12-peter-ruling-16-3-0-lapse-batch.md`, row 5.

**Fix-now**: add a `values:` list to `Icon-Base.schema.yaml` from the `IconBaseName` union, with a test that fails if the two differ. **Re-ruled**: Trigger changed to `release:16.4.0:phase-1` in this commit; it becomes `merge:#<N>` once the fixing PR opens, and that PR closes the record under rule 5.

*Signed: Lina, 2026-11-12.*
