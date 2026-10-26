# Component-token custom values must "conform to the family's mathematics"; nothing checks it on any path a build or consumer runs

**Date**: 2026-10-24
**Owner**: Ada (Rosetta: `src/build/tokens/defineComponentTokens.ts`, `src/integration/ValidationCoordinator.ts`, and the docs that state the rule)
**Found by**: Ada, Spec 131 R1/R2 reads (`.kiro/specs/131-governance-simplification/feedback/design-outline.md` § "[ADA R1]" (b) item 3; § "[ADA R2]" "Thorough" (a)). Re-read at `e4e61eea2`.
**Class**: P2 obligation (guard) · defect *(set 2026-10-24, Ada, rule 12. A guard weaker than its claim: the docs say custom values MUST conform, the code path is labelled "family-conformant value", and a conformance validator exists, but it runs only under unit-test fixtures. Not P0: no served text says the value is checked, only that it must conform. The reading that would raise it: a shipped component token whose custom value is off its family's pattern; none is shown, because nothing has run the check on the real set.)*
**Trigger**: `path:.kiro/specs/129-consumer-generation-completeness/requirements.md` — the first commit that adds Spec 129's requirements, where this record is taken in or left out with a reason. *(Set 2026-10-24, Ada, rule 9. Spec 129 already took in the sibling validator record by Peter's ruling (`2026-06-24-mathematical-relationship-parser-validation-gaps.md`, "Fold it into the spec"), and item (ii) brings the component tier into the consumer's `generate`, the path this check is missing from. The first requirements commit is the intake read Process-Spec-Planning § "Before Formalizing: Records That Name the Spec" owes: an event (ballot 2026-10-22-trigger-names-the-event-not-the-vehicle § 2, question 2). Counter-argument: Spec 129 did not ask for this, and a P2 (guard) on `release:next:phase-1` would get a deadline and escalate at its first lapse. What survives: if 129 leaves it out, I re-rule it to `release:next:phase-1` in the same commit as the leave line.)*

---

## The claim

- `governance/Token-Governance.md` L593 (`value: 14,  // Must conform to family's mathematical pattern`) and L613 ("Custom values must conform to the token family's mathematical foundation").
- `.kiro/steering/core-goals.md` L73–74, "Component Token Construction Rule": component tokens "must either reference an existing primitive token OR conform to how that primitive token family's values are defined".

## What runs — VERIFIED by reading

- **The value path records any number.** `src/build/tokens/defineComponentTokens.ts` L272–282: `} else { // Token with family-conformant value` → `values[key] = definition.value;`, with no check. The family-mismatch guard (L244–258) covers the `reference` path (L226) only.
- **The validator exists and is not called.** `ValidationCoordinator.validateComponentToken` (`src/integration/ValidationCoordinator.ts` L710; its doc comment, L703, "If it has a custom value, the value conforms to the family's value definition pattern") and `validateAllComponentTokens` (L763). Its non-test callers are `src/TokenEngine.ts` (L18, L128) and `src/workflows/`. `grep -rn 'ValidationCoordinator\|TokenEngine' src/cli scripts src/generators` → none, and no non-test file constructs `TokenEngine`.
- **The generate path runs one validator.** `src/generators/generateTokenFiles.ts` L11 and L72: `SemanticTokenValidator`, which checks semantic references.
- **The tests use fixtures.** `src/integration/__tests__/ComponentTokenValidation.test.ts` exercises `validateAllComponentTokens` (L579–653) on registries it builds itself; no test imports a real `*.tokens.ts` file into it.

**The real set**: 4 value-path tokens in 3 of the 7 files (`grep -rnE "^\s+value: " src/components/core/*/*tokens.ts src/tokens/component/progress.ts`, less one hit outside a `defineComponentTokens` call): `Badge-Label-Base/tokens.ts` L46 (`SPACING_BASE_VALUE * 15`, 120), `Avatar-Base/avatar.tokens.ts` L125 and L129 (`SIZING_BASE_VALUE * 1.5` and `* 8`, 12 and 64), and `Button-VerticalList-Item.tokens.ts` L53 (`SPACING_BASE_VALUE * 1.375`, 11px, "no primitive token exists for 11px"). Each carries sound reasoning that nothing checks. `Badge-Label-Base/tokens.ts` L72–77 also hand-writes `familyConformant: true`, an attestation no code reads. **Lina ran it** (`validateFamilyConformance`, scratch script; her review below): `spacing` 120 (Badge-Label-Base `maxWidth`) is INVALID (multiplier 15 is over the ≤ 8.0 cap); `spacing` 11 (Button-VerticalList-Item `paddingBlock.rest`) is INVALID (1.375 is not a 0.25 step); `sizing` 12 and 64 (Avatar) pass only because `sizing` has no case and falls to `default:`, "valid with a warning" (`src/integration/ValidationCoordinator.ts` L286–293). The `color` case rejects every custom value (L271–280). I re-read those branches; the spacing rule is L151–159. *(Corrected 2026-10-24, Ada, rule 9, on Lina's review. Superseded text, kept: "**UNVERIFIED**: whether any of the four would fail the validator; I did not run it.")*

## Fix shape (one line; not done here)

**A ruling comes first, then the wiring.** Turning the check on as written turns Badge-Label-Base and Button-VerticalList-Item red, and both tokens carry reasoning the spacing rule (≤ 8.0, 0.25 steps) does not allow. So: (1) rule what "conforms" means for each family — change the spacing rule, or give the two tokens a recorded exemption or another home — and add the missing `sizing` case (Ada proposes, Peter rules; Lina edits the two token files if they must change); (2) then run the family check on the harvested component set at `generate` and in the default test lane, failing on error. *(Restated 2026-10-24, Ada, rule 9, on Lina's review. Superseded text, kept: "Run `validateAllComponentTokens` (or the family-conformance function) on the harvested component set at `generate` and in the default test lane, failing on error.")*

## Readers (trust, but verify)

- **Lina**: the component token files are hers; a check that starts failing lands on them.
- **Thurgood**: a test-gap reading (the validator's tests are fixture-only).

**No fix is authorized by this record.**

## Review (2026-10-24, Lina) — trust, but verify
- Checked: `defineComponentTokens.ts` L222–285 read → the `else` branch (L272–282) records `definition.value` with no check; the family-mismatch guard covers the `reference` path only. Confirmed.
- Checked: `grep -rnE "^\s+value: "` over the component token files → the four value-path tokens Ada names are exactly the set: `Badge-Label-Base/tokens.ts` L46 (`SPACING_BASE_VALUE * 15`), `Avatar-Base/avatar.tokens.ts` L125 and L129 (`SIZING_BASE_VALUE * 1.5`, `* 8`), `Button-VerticalList-Item.tokens.ts` L53 (`SPACING_BASE_VALUE * 1.375`). The other `value:` hit (`Badge-Label-Base/tokens.ts` L75, `value: 120`) is the hand-written `familyConformant: true` attestation object, outside any call, as Ada says. 4 tokens in 3 files, matching her count. The `familyConformant: true` attestation (L72–77) is read by no code (the object is exported and only documented).
- Checked (closes Ada's UNVERIFIED line): ran `validateFamilyConformance` (read-only, scratch script, no repo write) on the four values → **`spacing` 120 (Badge maxWidth): INVALID** (multiplier 15 exceeds the validator's ≤ 8.0 cap); **`spacing` 11 (VerticalList-Item `paddingBlock.rest`): INVALID** (1.375 is not a 0.25 increment); **`sizing` 12 and 64 (Avatar): valid with a warning** (`sizing` has no case in the validator, it falls to `default:` "unknown family"). So two of the four fail the validator as written, and the other two pass only because `sizing` is not validated at all. Turning the guard on as the record's fix shape says would turn Badge-Label-Base and Button-VerticalList-Item red on the first run.
- Finding: **agree**, with one addition for the owner. The check is not just un-wired; its spacing rule (≤ 8.0, 0.25 steps) disagrees with two components' own reasoning (Badge's reasoning says the value "exceeds standard spacing scale, requiring component-level definition"; VerticalList-Item's says "no primitive exists for 11px"). Wiring it in therefore forces a ruling first: either the rule changes, or the two tokens get a documented exemption or a different home. That ruling is Ada's (rule) and Peter's; the component-side edit (if those two tokens must change) is mine and would follow. The `color` branch rejects every custom value, so Token-Governance's own pattern (`color.{component}…`, see the 2026-10-23 record's Ada addition) could never be satisfied by a custom value either. Gap: I did not run the full `validateAllComponentTokens` on the real registry, only the four values through `validateFamilyConformance` (the family function, not the reasoning or primitive-reference rules).

*Signed: Lina, 2026-10-24.*

## Review (2026-10-24, Thurgood) — trust, but verify
- Checked: the header lines against README rules 1, 9, 10 and 12, and ballot 2026-10-22-trigger-names-the-event-not-the-vehicle § 4 step 6. Ran the intake grep → this file matches 129's `<dir>` and 131's.
- Finding: form only, not the merits. form: ok. Owner present. Class is `P2 obligation (guard) · defect`. Trigger is one backticked `path:` token on 129's `requirements.md`, a lawful intake event. The leave-then-`release:next:phase-1` re-rule is stated in advance, which is good practice. Filer is self. Note for the owner: 131's intake also lists it.

— Thurgood, 2026-10-24

## Owner response (2026-10-24, Ada)

- **Lina**: accepted. Her run closes my UNVERIFIED line (corrected in place, § "What runs") and changes the fix shape (restated in place): the rule needs a ruling before the guard is armed. Class stays P2 (guard): the claim is stronger than the guard, and the guard, once armed, also disagrees with two shipped values. Trigger unchanged.
- **Lina's `color` point**: the `color` case rejecting every custom value is consistent with the served-docs P0 addition (Token-Governance's `color.{component}…` pattern describes nothing the API can make). It belongs to that record's CORRECTION, not here.
- **Thurgood**: noted that 131's intake also lists this record; at 131's intake the line is "leave", since 129 holds it.

*Signed: Ada, 2026-10-24.*

## Note (2026-10-25, Ada) — the construction rule changed home; nothing else here changed

Appended under ballot `2026-10-25-token-selection-order-one-rule` § 11 step 11, F-3 (A) (RATIFIED, Peter, 2026-10-25), as § 4 "Not edited" asks for a ledger that cites Core Goals L73–74. The line above (L14, "`.kiro/steering/core-goals.md` L73–74, 'Component Token Construction Rule'") is a point-in-time citation and stays as written (README rule 3).

- **Where the rule is now.** `governance/Token-Governance.md` § "Token Creation Governance" → "### Component Token Construction Rule" (L173 in the application PR #491), moved verbatim. Core Goals L61–76 are now one pointer line (L61), so `.kiro/steering/core-goals.md` no longer holds the rule. The prior home is `.kiro/steering/core-goals.md` L73–74 at `1eced6cd5`.
- **What did not change.** The sentence is the same, so every claim, check and fix shape above stands: the value path still records any number, the validator is still unwired, and the ruling-before-wiring fix shape is untouched. Owner, class and Trigger are unchanged.
- **Two contradictions the ballot named and did not fix, filed here at my call** (ballot § 9 item 3; walk record L363). Both read against the rule above and both still stand after the application: (1) `governance/Token-Governance.md` § "Creation Decision Matrix", the row "One-off value, doesn't fit math → Component token" (L215), and (2) § "Example 6: No Token Exists" (L391), which recommends a component token for 7px that "doesn't align to 8px baseline grid". The rule says a component token must reference a primitive or conform to its family's values, so a value that does not fit the math is not a lawful component-token value under it. They belong with this record's ruling on what "conforms" means for each family (fix shape step 1): when Peter rules that, the matrix row and Example 6 are corrected in the same change. No separate record is filed.

*Signed: Ada, 2026-10-25.*
