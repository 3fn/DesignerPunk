# Task 14 Summary: Derivation checker, grain guard, and per-target bites

**Date**: 2026-09-29
**Purpose**: Concise summary of Task 14 completion
**Organization**: spec-summary
**Scope**: 123-consumer-distribution

---

## What Was Done

Step 6 of U2b built Requirement 11.4's derivation checker and proved, per target, that the adapters route every re-grounded span through the shared span function.

- **The derivation checker** (`tools/agent-generator/regrounding/derivation.ts`). A `re-pointed` disposition verifies iff some span sources S or a descendant of S (**DERIVATION**), and one of those spans lies within the named destination (**HONEST NAMING**).
  - Containment is structural, against the body or entry partition tree. It is never decided by an anchor prefix.
  - Unknown anchors are non-matching and never throw.
  - Exemplar E → `VERIFIED`; attack (a) → `FAIL_NO_DERIVATION`; the old `#body` span → non-matching.
- **Golden Bite 2** (`grain-guard.two-sided.test.ts`): an honest `###`-grain re-pointing is accepted and attack (a) is rejected. Collapsing the splitter to `##` turns only the honest assertion red, which is why the guard has two sides.
- **The per-target guard** (`semantics-guard.test.ts`). One file, with one block per target declared in `canonical/consumer-profile.yaml`, built through the adapter registry.
  - It renders a fixture charter carrying E (body) and E-fm (a `writeScope` glob) through each adapter under the consumer profile.
  - **Body and frontmatter bites are two-sided.** A bypass in one adapter turns that target red with `FAIL_NO_DERIVATION` and leaves the other green. The logs are committed.
  - A fake third target adds a third block with no edit to the guard.
- **A defect fixed on the way**: a heading titled "Doc" could collide with the partition tree's root id and hang any containment query. The root id is now reserved; no real document changes.

## Why It Matters

This is the substrate pass four (G2) runs on. Task 10 claimed the adapters were consolidated onto one span function; this is the arbiter of that claim, and it is now bitten for both targets on both the body and frontmatter call sites.

## Key Changes

- New: `tools/agent-generator/regrounding/derivation.ts`; the guard and fixture tests; `tools/agent-generator/__fixtures__/semantics-guard/` (the E/E-fm fixture and the committed bite logs).
- Fixed: `tools/agent-generator/partition.ts` (root-id reservation), with a regression test.

## Impact

- Task 18's pass four runs the fixed checker. A hang there would have read as a schedulable NOT-RUNNABLE.
- Kiro's JSON config remains outside the frontmatter guard (it is steward-shaped); the prose artifact is covered for both targets.

## Cross-References

- Completion doc: `.kiro/specs/123-consumer-distribution/completion/task-14-completion.md`
