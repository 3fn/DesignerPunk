# Defect: `generate` passes, and exits 0, when a semantic token references a colour primitive the output does not define

**Date**: 2026-10-25
**Filed by**: Ada, under rule 10, verifying the 16.1.0 trio's R1-16 (`tests/onboarding-trio/records/16.1.0/trio-1-backend.md`), which the operator left unverified: "whether a *new* primitive, as opposed to a retuned one (release 4's experiment), reaches the output".
**Owner**: **Ada** (`src/generators/**`, `src/validators/**`). **Consulted**: none needed for the fix, which is inside the generator and its validator; Thurgood for any INSTALL or CHANGELOG sentence that changes with it.
**Trigger**: `release:next:phase-1` — the event that owes the close is the fixing PR's merge. *(Set 2026-10-25, Ada, rule 1: a P2 that would ride a later change takes this token; the owner re-rules it to `merge:#<N>` when the fixing PR opens. Spec 129's PR 1, which makes the copy's palette read, does not close this record by itself: see "What closes it".)*
**Class**: P2 obligation (guard) · defect *(set 2026-10-25, Ada, rule 12. `generate`'s semantic-reference validation and its closing "All platforms are mathematically consistent!" are weaker than their claim: they pass a reference whose target the output does not define. No shipped text says `generate` refuses such a reference, so nothing is false, which keeps it out of P0. The reading Stacy or Peter may press: **P1 consumer-blocking**, because on web the primary action colour silently stops applying, with exit 0, on the path both consumer agents in this trio pointed their founders to. I keep P2 (guard) because the colour change itself is a disclosed limitation (`2026-10-15-123-palette-read-from-package.md`); what this record adds is that the attempt is not refused. A P2 (guard) goes to Peter at its first lapse.)*
**Grant paths**: none.

---

## What happens (verified 2026-10-25)

In a scratch copy of the 16.1.0 trio's run-1 born repo (`/tmp/dp-trio/16.1.0/trio-1-backend/repo`, `@3fn/core` 16.0.0 from the candidate tarball), I made consumer-Ada's planned edit for `#0F766E` and ran `npx designerpunk generate`:

1. **A new primitive in the copy's `src/tokens/ColorTokens.ts`** (`brand300`, `rgba(15, 118, 110, 1)`, shaped like `teal300`), with the same name added as a one-step family in `src/tokens/color/primitives/chromatic.ts`, and `color.action.primary` pointed at it in `src/tokens/semantic/ColorTokens.ts`. **`generate` exits 0**, prints "✅ Semantic token validation passed" and "✅ All platforms are mathematically consistent!", and writes:
   - web: `--color-action-primary: var(--brand-300);` and `--accessibility-focus-color: var(--brand-300);`, with no `--brand-300` defined anywhere in `DesignTokens.web.css`. Every property that reads `var(--color-action-primary)` is invalid at computed-value time and falls back to its unset value (for a background, transparent).
   - iOS: `public static let accessibilityFocusColor = brand300`, with no `brand300` in `DesignTokens.ios.swift`: an unresolved identifier.
   - Android: `val accessibility_focus_color = brand_300`, with no `brand_300` in `DesignTokens.android.kt`: an unresolved reference.
   - DTCG and Figma: byte-identical to before (they come from the package).
2. **The same, with the primitive only in `chromatic.ts`** (the copy's `ColorTokens.ts` left as born). `generate` exits 1: "Semantic token 'color.action.primary' references non-existent primitive 'brand300'". Loud, but the message tells a founder her primitive does not exist when she has just defined it.

**So R1-16's open question has an answer: a new primitive does not reach the output.** The primitive is never emitted, on any platform, because colour primitives are written from the package's palette (`TokenFileGenerator.ts` L1676–1688, `allComposedColors` imported at L21). The semantic edit *is* read from the copy, as INSTALL § 4 says, so the semantic re-point reaches the output as a reference to a name that is not there.

## Why the guard passes it

`generateTokenFiles.ts` validates semantic references against the copy's `getAllPrimitiveTokens()` (L87), whose colour entries come from the copy's legacy `ColorTokens.ts`. It then emits colour primitives from the package's `composedColorMap`, and `resolveSemanticTokenValue` (`src/resolvers/SemanticValueResolver.ts` L23–40) returns the token unresolved when the name is in neither the package palette nor the package's `ColorTokens.ts`. The validator and the emitter read two different lists, and nothing checks that a resolved semantic colour came out resolved.

## The fix

Validate each semantic colour reference against the set the generator **emits**, not the set the copy declares: after resolution, any colour semantic whose value is still a bare primitive name aborts generation with `TokenGenerationAbortedError`, naming the token, the primitive, and the reason ("`brand300` is in your token source, but the colour palette is read from the installed package (INSTALL § 4)"). That closes the class for every reference to a name the output does not define, not only this palette case.

## What closes it

The fixing PR merges with a test, run against a consumer-shaped fixture, in which a semantic pointed at a primitive the output does not define makes `generate` exit non-zero with that message; and the outcome line goes here. Spec 129's PR 1 (the copy's palette read) makes case 1's primitive emitted, but not every reference resolvable (a name in `ColorTokens.ts` and in no palette family would still pass the validator and dangle), so it closes this record only if it carries the check above.

## Walk

Has the fixing PR opened or merged? If neither by the next release's phase 1, the record lapses; a P2 (guard) lapse goes to Peter (rule 11).

*Signed: Ada, 2026-10-25.*
