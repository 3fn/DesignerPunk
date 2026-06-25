# `MathematicalRelationshipParser` False-Fails ~99 Tokens (validate "Mathematical relationships" check)

**Date**: 2026-06-24
**Discovered during**: Spec 118 Task 3 (consumer-guard lane) — unmasked when a pre-existing TS compile error in `tests/consumer-integration.test.ts` was fixed, surfacing the `validate passes` failure
**Reporters**: Ada (Rosetta diagnosis), Thurgood (routing)
**Severity**: Medium — the validator produces false failures against *correct* tokens; `npx designerpunk validate` exits 1 in any consumer/CI run, so the check provides no usable signal
**Type**: Token validator / token-governance defect (NOT module resolution, NOT generation)
**Primary owner**: Ada (Rosetta — token governance + validators)
**Status**: Open — **SOON (triaged 2026-06-25, Task-8 milestone)**: highest-priority open issue — `validate` is consumer-facing-broken AND holds the skipped `validate passes` test in the new consumer-guard lane. Scheduled as its own focused effort / small spec **after Spec 118 closes** (needs per-token-family governance calls + parser work — not a slot-in). Out of scope for Spec 118 (module-resolution coherence). See `docs/roadmap/m0a-deferred-items.md` § "Issues surfaced during the 117/118 spec cluster".

---

## Summary

`npx designerpunk validate` runs four checks (`src/cli/validate.ts:39`). The **"Mathematical relationships"** check (`validateMathematicalRelationships`, `validate.ts:102-114`) runs `MathematicalRelationshipParser.validate()` (`src/validators/MathematicalRelationshipParser.ts`) over every primitive token's `mathematicalRelationship` field and fails on **~99 tokens**. The **tokens are correct**; the **parser is too limited** to evaluate the full range of relationship expressions the token source actually uses. Result: the check is a permanent false-negative — exit code 1 on a healthy token set.

## Failure categories (verified against the parser + token source)

1. **Operator false-positives (the hard one).** The parser treats any `[×*x÷/+-]` character as a math operator (`parseExpression`, `MathematicalRelationshipParser.ts:176-206`). So incidental hyphens/slashes in descriptive values — `cubic-bezier(…)` (easing), hyphenated font-family values, categorical color strings — are misread as subtraction/division and fail with `Invalid operand: …`. Fixing this requires reliably distinguishing a real ` - ` operator from an incidental hyphen.
2. **Float tolerance too tight.** `0.3 × 1.33 = 0.399` vs stored `0.4` fails the `Math.abs(...) < 0.001` check (`:325`) — shadow/glow opacity, `scale088`/`scale09x` multipliers. Relaxing tolerance is easy but risks false-passes if done bluntly.
3. **No exponent support.** Expressions like `1.125²` (fontSize modular scale) cannot be evaluated by the operator-based parser.
4. **Special-case literals.** `"special case"`, `"percentage"`, `"full opacity"` (e.g. `radiusMax`, `opacity100`, `radiusHalf`) on *numeric non-base* tokens fall through the descriptive-relationship guard (`:278-308`) and error with "No valid operator found."
5. **Categorical descriptions generally** (`lightest`, `bright`, easing/font-family categorical values) need a "this is not math — don't evaluate it" classification.

## Why this is non-trivial (not a tolerance tweak)

The fix must NOT simply make the parser more lenient — that converts a real validator into a rubber-stamp (false-passing genuine errors), the exact anti-pattern to avoid. Doing it right requires a **token-governance decision per token family**: which relationships are *mathematical* (validate them) vs *categorical/descriptive* (skip math evaluation). That classification + careful parser work (operator disambiguation, exponent handling, special-case handling, calibrated tolerance) + test coverage is a focused but real effort — Ada's domain.

## Why out of scope for Spec 118

Spec 118 is **module-resolution coherence** (config-load path, runtime TS execution, package-export coherence). This is a **token-validator** defect with no module-resolution dimension — it was failing on these tokens before 118 and is unrelated to the loader/exports work. It surfaced only because Spec 118 Task 3 created the consumer-guard CI lane and fixed a TS compile error that had been masking the `validate` test. Pulling a token-governance parser fix into a module-resolution spec would be cross-domain scope creep.

## Interim handling (Spec 118 Task 3)

`tests/consumer-integration.test.ts` → `validate passes` is **skipped with a comment referencing this issue**, so the consumer-guard lane can be a meaningful green check on the config-load workflow without masking this defect or asserting a false "validate passes." Re-enable the test once the parser is fixed.

## Recommended disposition

Ada to scope a focused fix (may graduate to a small spec if the "mathematical vs categorical" governance calls prove substantive). Acceptance: `npx designerpunk validate` passes on the current token source with the validator still catching genuinely-incorrect relationships (regression tests for both true-positive and the five false-negative categories above); then re-enable `validate passes` in `tests/consumer-integration.test.ts`.
