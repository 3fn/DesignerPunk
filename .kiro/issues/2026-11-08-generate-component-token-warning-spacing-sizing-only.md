# Issue: `generate` warns about off-grid custom values for spacing and sizing only; radius, fontSize and color custom values get the lane's check but no consumer warning

**Date**: 2026-11-08
**Owner**: Ada
**Class**: P2 obligation (guard) · defect *(set 2026-11-08, Ada, rule 12. Req 13.2 says a consumer's non-conforming custom value makes `generate` warn; the warning covers two of the families that have a custom-value rule. No component token of the other families has a custom value today, so no consumer sees a missing warning yet.)*
**Trigger**: `release:next:phase-1` — the release that carries Spec 129 U5 (Task 10); the close is this record's rule 5 outcome line, or Spec 132 taking it first, which re-rules this Trigger with its dated reason.
**Source**: Spec 129 U5, `completion/task-10-completion.md`, Findings; Req 13.2 and design § 12 (D-8).

---

## The gap, plainly

Req 13.2: "WHEN a consumer's component token has a non-conforming custom value THEN `generate` SHALL warn, naming the token, and SHALL NOT fail." Design § 12 (D-8) defines "conforms" as on the family's grid, `BASE × k × step`, and rules it for spacing and sizing.

`generate` calls `gridConformanceErrors` (`src/build/tokens/defineComponentTokens.ts`), which covers exactly those two families. The repository's lane (`ComponentTokenConformance.test.ts`) checks DesignerPunk's own tokens under the coordinator's full rule set, which also has `radius` (base 8, step 0.25, cap 4.0, `0` and `9999` allowed), `fontSize` (the 1.125 modular scale) and `color` (no custom numeric value). `generate` does not warn for those three.

## Why it was not closed in U5

- The first version called the coordinator from `generate`, and Task 14's removal case failed: the coordinator reads `RADIUS_BASE_VALUE` from `../tokens/RadiusTokens`, a module that case removes (Spacing and Sizing stay).
- Covering radius needs its base from a module the removal case keeps, or from the consumer's loaded token set (`tokens.tokenSet`), which means moving the check after `resolveTokens` in `runGenerate`. The radius rule is the old one, with a cap the design did not rule on; fontSize's modular scale is a different kind of rule from a grid; color's is a refusal. That is a design extension, not a small in-list change.
- Estimate: about half a session: the check moved onto the loaded set (`src/cli/designerpunk.ts`, charter scope), a ruling on the radius cap and the fontSize scale (Peter), and three `Consumer Guard` cases.

## Fix shape

(1) Rule what "conforms" means for radius and fontSize (the cap, the scale) and whether color's refusal warns. (2) Run `generate`'s check over the harvested set with each family's base read from the consumer's loaded token set. (3) A `Consumer Guard` case per family. No fix is authorized by this record.
