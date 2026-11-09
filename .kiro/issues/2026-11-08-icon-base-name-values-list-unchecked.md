# Icon-Base's `name` has no `values:` list, so `validate_assembly` accepts any icon name and lists it as not checked

**Date**: 2026-11-08
**Owner**: Lina
**Filed by**: Lina, under rule 10, split from `2026-10-25-validate-assembly-empty-result-overstates-coverage.md` (item V3), closed in the same PR as V2. That record's Trigger says V3 does not hold its close.
**Class**: P2 obligation (guard) · defect *(set 2026-11-08, Lina, rule 12. `PropValueChecker` skips Icon-Base's `name` (`type: IconBaseName`, no `values:`, `Icon-Base.schema.yaml` L48–50), so `name: tool-drill` passes. Since V1 the result lists it under `coverage.notChecked`, so the output no longer overstates; the check is still weaker than a reader wants.)*
**Trigger**: `release:next:phase-1` — the event that owes the close is the merge of the PR that makes Icon-Base's `name` checkable. *(Set 2026-11-08, Lina, rules 1 and 9: a P2 record that would ride a fix PR takes `release:next:phase-1`.)*

---

## Item

Icon-Base's `name` becomes checkable: a `values:` list generated from the `IconBaseName` union in Icon-Base's `types.ts`, not hand-kept, so an unknown name is an error. Until then `coverage.notChecked` lists it.

*Signed: Lina, 2026-11-08.*
