# Issue: the Consumer Guard case for the theme-map non-colour refusal is outside Ada's scope; the grant

**Date**: 2026-11-08
**Owner**: Ada
**Class**: P2 obligation (guard) · grant
**Trigger**: `path:tests/consumer-integration.test.ts` — the event that owes the close is the merge of the fixing PR (branch `fix/theme-map-noncolour-refuse`). The close is this record's rule 5 outcome line, giving the fixing PR's number and the granted-file diff.
**Source**: Peter's ruling of 2026-11-08T15:12:38Z, `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-08-peter-ruling-theme-map-noncolour-refuse.md` ("(a) with the class option"); P1 record `.kiro/issues/2026-11-08-non-colour-theme-override-accepted-not-applied.md`.

---

## What is needed

The ruling makes `generate` refuse a non-colour key in any theme override map. A Consumer Guard case in `tests/consumer-integration.test.ts` pins that on a real consumer config. The file is outside Ada's standing scope.

**Consulted**: Thurgood, on placement and the grant (per the ruling record).

---

**Grant paths**: `tests/consumer-integration.test.ts`, limited to one new case: a theme with a spacing key in `dark` makes `generate` exit non-zero and name the key. No existing case changes.

---

## The fixing PR

Branch `fix/theme-map-noncolour-refuse` (Ada). Its Consumer Guard case lands only after this grant merges.

## Acceptance

1. The `tests/consumer-integration.test.ts` diff is one added case and nothing else.
2. The case fails against `main` (generate exits 0) and passes on the fix.
3. `npm run test:consumer` passes.

Counter-argument and what survives: a unit test at config load already covers the check, so the integration case is redundant. It survives as the only test that runs the real CLI exit code a consumer sees; the cost is one more slow case in the consumer lane.

---

## Outcome

Open.
