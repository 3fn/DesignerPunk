# Generate the hand-written readiness tables, or guard them against the generated readiness file

**Date**: 2026-11-12
**Owner**: Lina (the content of the component docs). **Consulted**: Thurgood (the cross-surface check).
**Filed by**: Lina, under rule 10 and rule 9, from the class question moved out of `2026-11-05-hand-written-readiness-claims-disagree-with-generated-readiness.md`, which lapsed at `6f507c039` (#852, release 16.3.0's S). Authority: Peter, received 2026-11-12T13:29:02Z, "As recommended"; ruling `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-12-peter-ruling-16-3-0-lapse-batch.md` (row 4: the ~80-line fix is fix-now in the parent; the class question goes to a new rule-10 record with a Spec 132 requirements trigger).
**Class**: P2 obligation (guard) · defect *(set 2026-11-12, Lina, rule 12. Same subject as the parent: `governance/Component-Readiness-Status.md` § "Consistency Requirements" promises integration tests across surfaces, and none exists.)*
**Trigger**: `path:.kiro/specs/132-native-components-in-app/requirements.md` — fires when Spec 132's requirements document is added or touched; the question is then decided there.

---

## What is owed

Peter's question, as the parent carried it: generate the readiness tables in the served docs from `application-mcp-server/src/indexer/packageReadiness.generated.ts` (option A), or add a test that fails when a doc's claim disagrees with it (option B). Spec 132 makes native components work in an adopter's app, so readiness per platform is its subject. At the trigger:

- Read Thurgood's view on B (he owns the cross-surface check; his read was never recorded on the parent) and quote it first.
- Pick A or B, or neither, with the per-platform roll-up rule for families ruled once.
- Whichever lands is registered where the cross-surface check lives, and `Component-Readiness-Status.md` § "Consistency Requirements" names it so the sentence about automated validation is true.

The ~80-line correction is **not** held here; it is the parent's fix-now (Trigger `release:16.4.0:phase-1`). If the guard or generator lands first, the parent's corrected lines are what it is built against.

## Done

The question is decided in Spec 132's requirements and the chosen mechanism (or a ruled "neither") is merged. This record closes under rule 5 with a dated outcome line.

*Signed: Lina, 2026-11-12.*
