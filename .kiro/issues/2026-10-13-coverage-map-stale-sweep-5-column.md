# Defect: the retired `122-sweep-5-corrected-state` context is still a coverage-map column (13 rows)

**Date**: 2026-10-13 · **Found by**: Lina (U4 consult, 2026-10-13), confirmed by Stacy (`grep -c "122-sweep-5-corrected-state" canonical/coverage-map.yaml` → 13) · **Owner**: **Lina** (generator owner) — a recommendation; Peter's pick at this PR's merge, the alternative being Thurgood with Lina's review · **Trigger**: a `chore/` PR independent of Spec 123 U4, at Lina's next generator touch.

**Grant paths**: `tools/agent-generator/coverage-map.ts`, `tools/agent-generator/__tests__/coverage-map.test.ts`, `canonical/coverage-manifest.yaml`, `canonical/coverage-map.yaml`, `canonical/generated.lock` (README rule 8: write scope over exactly these, on the fixing PR).

## The defect
`122-sweep-5-corrected-state` was retired as a required context (Spec 122 Task 18, 2026-07-11; `verify-gate-registration.sh` L28/L72) but remains in `CHECK_CONTEXTS` (`coverage-map.ts` L71) and the manifest (L121), so 13 map rows list a check that no longer gates as guarding them — a small false-green in Stacy's instrument. Fix: drop the context and its manifest entry, regenerate both maps, refresh the lock; a test that the column set contains no retired context. **Stacy's position on the open question** (should a still-running non-required check keep a labeled column?): drop it — the map lists checks that gate.
