# Task 8.4 Completion: `Consumer Guard`: the `var()` check with its pinned allowlist, and the blue-tinted composite

**Date**: 2026-11-07
**Task**: 8.4 (Spec 129, Unit 3, parent 8)
**Agent**: Sparky (Sonnet, as planned)
**Branch**: `task/129-8-native-colours-shadows-sparky`, on `d2680d9be` (8.3 and its lists)

## 1. What changed

One file: `tests/consumer-integration.test.ts` gains a `describe` (five cases) on the packed install's output, after the outer `generate`. No generator, token or spec file changed.

- **The `var()` check** (Req 1.6, design § 9): every custom property a `var()` references must be defined, or be on the pinned allowlist. Generated `DesignTokens.web.css` and `ComponentTokens.web.css` resolve against both generated files; the package's `component-tokens.css` (located through the installed `package.json` `exports["./component-tokens.css"]`) resolves against the generated `DesignTokens.web.css` alone, so "binds late to the adopter's primitives" is what is proven. Comments are stripped first; a `var()` fallback does not excuse an undefined name.
- **The allowlist** is a constant at the head of the case, `VAR_ALLOWLIST`, with `VAR_ALLOWLIST_COUNT` asserted against its length and uniqueness. It is empty (count 0): at this head every `var()` in both files resolves, so nothing is pinned. A later name needs a reason and a count change.
- **The blue-tinted composite** (Req 7.1): `--shadow-fab` (colour primitive `shadowBlue100`) must contain `var(--shadow-blue-100)`, no `rgba(`, and not the black custom property; `--shadow-blue-100` must be defined. A general loop then checks that every composite contains the `var()` its own `-color` property names.
- **Ada's `color-mix(in oklab, var(--shadow-blue-100) calc(var(--shadow-fab-opacity) * 100%), transparent)` meets the criterion.** Design § 5 says "the web composite uses the colour's custom property", and the colour primitive's custom property is what the composite names; `--shadow-fab-color` is `var(--shadow-blue-100)` too, so the two agree. Text-level only: no browser, so `color-mix` is not rendered.

## 2. Targeted tests run

- **Green**: `npm run test:consumer`, 61 passed, 1 skipped (the pre-existing `it.skip('validate passes')`), 62 total; of those, 5 are new, plus the outer `init` and `generate` they depend on.
- **Red, blue-tinted case**: with `src/providers/WebFormatGenerator.ts` restored to its pre-8.2 text (`a1de2a453^`) and repacked, that case alone fails: `Expected substring: "var(--shadow-blue-100)"`, `Received string: "var(--shadow-fab-offset-x) var(--shadow-fab-offset-y) var(--shadow-fab-blur) rgba(0, 0, 0, var(--shadow-fab-opacity))"`. The other four cases passed, 6 of 7. The generator was restored afterward.
- **Red, `var()` check**: the pre-fix web output had no unresolved `var()` (the web half already emitted `--shadow-blue-100`), so the check cannot fail on it. Its bite is a case inside the suite: a planted `var(--no-such-primitive-999)` appended to the package CSS is reported, and a name in a comment is not.

## 3. Application-time adaptations

none to the design. Two notes: (1) the pre-fix red run changes `docs/tokens.css` as a build side effect; both runs were followed by `git checkout -- docs/tokens.css`, so it is not in this diff. (2) The `var()` check's first run found nothing unresolved; the empty allowlist is a measured result, not an omission.
