# Steering Doc Metadata Errors (49 of 87 docs)

**Date**: 2026-05-03
**Source**: Spec 099 Task 4.2 — `validate-steering-metadata.js` output
**Severity**: Low — not blocking, addressable incrementally
**Owner**: Thurgood (Civitas steward)
**Status**: Open — tracked for incremental resolution during monthly health checks

## Description

After updating `validate-steering-metadata.js` with expanded vocabulary (spec 099), the script still reports 49 of 87 steering docs with 63 metadata errors. These are genuine metadata issues — docs with organization values, task types, or other fields not matching the recognized vocabulary.

## Common Error Patterns

- Organization values not in vocabulary (many docs use domain-specific values like `token-family-reference`, `component-family-reference`)
- Task types not in expanded vocabulary (some docs use very specific types like `testing`, `badge-implementation`)
- Missing `Last Reviewed` field (12 docs, identified in spec 098)
- Non-ISO date formats (2 docs: Component-Family-Badge, Component-Family-Chip)

## Resolution Path

Address incrementally during normal Civitas steward work:
- During monthly health checks, fix 5-10 docs per cycle
- When a doc is modified for other reasons, fix its metadata in the same commit
- Consider whether the vocabulary should be further expanded vs. docs should be corrected

## Related

- Spec 098 staleness assessment: `findings/staleness-assessment.md`
- Spec 099 Task 4.2: `completion/task-4-2-completion.md`

**Outcome (2026-10-20)**: archived by the steward at the 2026-10-20 walk, Peter's go; ground: resolved — `node scripts/validate-steering-metadata.js` at `c219488d6`: 0 errors, 19 warnings (was 63 errors in 49 of 87 docs); 2026-10-17 health-check record § 2, "Metadata: 0 errors". Rule 4: not a ruling on the merits. Ledger: `archive/TRIAGE-2026-10-20.md`. — Thurgood
