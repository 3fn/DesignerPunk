# Task 10.1 — Row 1: family classification, `=` and `≈`, the `blur000` correction

**Agent**: Ada (Sonnet) · **Unit branch**: `task/129-10-validators-config-types`

## What changed

- `src/validators/MathematicalRelationshipParser.ts`: a new `validateToken(token, resolve?)`, beside the unchanged `validate`.
  - **Categorical families** (`color`, `fontFamily`, `easing`, `breakpoint`) are not evaluated. The skip is by family, never by what the string looks like.
  - **Every other family is a formula family**: its string must be an equation that evaluates and agrees with `baseValue`. A formula-family token with no equation fails.
  - **Grammar**: `+ - × ÷ * / x`, parentheses, `^n` and superscript exponents, `base` (the family base), `baseValue`, and another primitive's name through `resolve` (lineHeight names its fontSize). `=` is exact at the precision the string displays (where the right-hand side shows a factor rounded, `16 × 2.027` for 16 × 1.125⁶, the left side's groups and powers are rounded to the same decimals, then the two must be equal to float noise); `≈` is within half the family's rounding step; `→` is a rounding to the next grid value within one step (`RELATIONSHIP_STEP`: 1 for pixel families, 0.01 for shadow, glow, opacity, blend, scale and density). A trailing prose note in parentheses is ignored. The special-case form (`special case … = N`, `percentage = N`) must state a value equal to `baseValue`.
- `src/cli/validate.ts` (charter scope, outside the Primary Artifacts list; cleared by the coordinator): `validateMathematicalRelationships` calls `validateToken`, with a resolver over the primitive set. Needed so the family reaches the parser; `validate.ts` is the only caller.
- `src/tokens/BlurTokens.ts`: `blur000`'s `mathematicalRelationship` `'0'` → `'base × 0 = 16 × 0 = 0'`. A metadata string; no value changed and no token created.
- `src/validators/__tests__/MathematicalRelationshipParser.test.ts`: 12 new cases (below).
- `tests/consumer-integration.test.ts`: `validate passes` un-skipped, and asserts `✅ Mathematical relationships` and `All validation checks passed`.

## Measurement

Old `validate` on the repository's token source: **102** mathematical-relationship failures (re-measured at the cut, matching design § D-9's 102). After: `npx tsx src/cli/designerpunk.ts validate` prints four ✅ and "All validation checks passed". A scratch run of the old `validate` over the 217 primitives, with `blur000`'s string as it was, counts 102.

## Targeted tests and result

`npm test -- src/validators/__tests__/MathematicalRelationshipParser.test.ts`: 67 passed (55 before). `npm test -- src/tokens src/cli/__tests__/validate`: 38 suites, 1199 tests pass. `npx tsc --noEmit` clean. The `Consumer Guard` case is run at the parent close.

The cases: every primitive in the source passes; the **true positive** `blur000` with the pre-correction string `'0'` is reported ("states no equation"); a wrong value is reported; sides that disagree are reported; **every formula-family token in the source fails when its value is perturbed** (`value × 1.5 + 1`), which is the check against a rubber stamp; a categorical family is skipped by family; and one case per false-negative category of the 2026-06-24 record.

## Application-time adaptations

- **Only one token string was edited** (`blur000`). Design § D-9 expected about 20 `=` → `≈` edits. Reading `=` as exact at the displayed precision covers all of them with no string edit (all 217 primitives pass), so no generated comment moved. Jest: an error under 0.1% but above the displayed precision is reported.
- **OPEN (held for Peter): the special-case form is accepted by its text, not by `isStrategicFlexibility`** (design § D-9 item 3 says SF tokens). `opacity100` ("Special case: full opacity = 1.0") is not SF, and flagging it SF would be a metadata change that is not the edit the design names. The check holds: the stated value must equal `baseValue`, and the label must start `special case` or `percentage`. The alternative (set SF on `opacity100`, or rewrite the string to `base × 12.5 = 0.08 × 12.5 = 1`) changes generated output comments; it is Peter's if he prefers it.
- `validate.ts` is outside Task 10's Primary Artifacts and inside the charter's `src/cli/**`; the coordinator cleared it.
