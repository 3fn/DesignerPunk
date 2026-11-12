# Issue: `generate` warns about off-grid custom values for spacing and sizing only; radius, fontSize and color custom values get the lane's check but no consumer warning

**Date**: 2026-11-08
**Owner**: Ada
**Class**: P2 obligation (guard) · defect *(set 2026-11-08, Ada, rule 12. Req 13.2 says a consumer's non-conforming custom value makes `generate` warn; the warning covers two of the families that have a custom-value rule. No component token of the other families has a custom value today, so no consumer sees a missing warning yet.)*
**Trigger**: `release:16.4.0:phase-1` — fires at the Spec 129 Req 13.2 amendment's merge (below); re-tokened to `merge:#<N>` once that amendment's PR exists. *(Re-ruled 2026-11-12, Ada, owner, rules 1, 9 and 11, with a dated reason: Peter's answer "As recommended", received 2026-11-12T13:29:02Z, row 7 of the 16.3.0 lapse batch, recorded in `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-12-peter-ruling-16-3-0-lapse-batch.md`.)* *(was, verbatim: `release:next:phase-1` — the release that carries Spec 129 U5 (Task 10); the close is this record's rule 5 outcome line, or Spec 132 taking it first, which re-rules this Trigger with its dated reason.)*
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

## Lapse (2026-11-12)

Firing commit `6f507c039` (#852, the squash of Release 16.3.0: release 16.3.0's S). No ancestor of S closed or re-ruled this record; its Trigger read `release:next:phase-1`, which fires at S. Appended by Ada, owner (rule 11: whoever observes a lapse appends). It records the lapse and decides nothing else. Signed Ada, 2026-11-12.

## Disposition (2026-11-12, Ada, owner; Peter's answer)

Peter's answer: **drop**, after a Spec 129 requirements amendment that narrows Req 13.2 to "spacing and sizing, and borderWidth if it has a grid rule" (Peter, 2026-11-12T13:29:02Z, "As recommended"; row 7 of `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-12-peter-ruling-16-3-0-lapse-batch.md`). Thurgood authors the amendment, Ada is consulted, Peter ratifies. The record drops when the amendment is ratified and merged, and closes under rule 5 with its outcome line then. The reason: `defineComponentTokens` takes numeric families only (spacing, sizing, borderWidth) and has no radius, fontSize or colour family, so a consumer cannot declare the cases this record's gap names; they cannot be reached.

**Trigger**: the line above names the amendment's merge. No PR exists yet, so it is `release:16.4.0:phase-1` until one does, then `merge:#<N>`.

**borderWidth finding (2026-11-12, Ada; read from source at `6f507c039`)**: borderWidth has no grid rule in `generate`'s check. `gridConformanceErrors` (`src/build/tokens/defineComponentTokens.ts` L363) returns null for any family other than `spacing` and `sizing`. The primitives define borderWidth as `base × k` (`src/tokens/BorderWidthTokens.ts`: base 1, k = 0, 1, 2, 4), but Design § 12 (D-8) rules conformance for spacing and sizing only, and no rule for borderWidth is written anywhere I found. So the amendment should read "spacing and sizing" flat; the "and borderWidth if it has a grid rule" clause adds nothing today. If borderWidth later gets a grid rule, this warning is re-opened then. I am consulted on the wording and not its author.

Signed Ada, 2026-11-12.
