# Task 14.6 — The theme-instance rule at U9: native instances and family cases, the WCAG dark composition, the refusals, the web single-mode form

**Agent**: Ada (Sonnet)

## What changed

- Config C through `generate` emits the eight instances and the five family cases on iOS and Android (`configCThemesReachNativeOutput.test.ts`, replacing the U6 "reaches no output" test; a `Consumer Guard` case does the same through a packed install).
- `WcagDarkComposition.test.ts`: `wcagDark` = dark, then `wcag` light, then `wcag` dark; a member all three override, and one only `dark` and `wcag` light override; with `wcag` light only the top layer is the built-in `dark-wcag` map and the warning names it.
- Refusals (a)-(h): `src/themes/themeRefusals.ts`, called by `generate`; `themeRefusals.test.ts` has a test per refusal and a `generate` failure case. **Measured** (Req 10.4): test01's config copy (`wcag` light), a scratch `init` from a packed 15.1.0 install (`dark`, `wcag` light), the repository's `designerpunk.config.ts` and fixtures (`born-cc`, `born-kiro`: `dark`, `wcag` light; the resolution-matrix fixtures and the 15.0.0-16.2.0 `init` templates: no entries or the same two), and the 129 evidence config: none trips any of (a)-(h). Decided from the code at H: all eight ship as `generate` failures naming the entry. (c) and the pair half of (g) need the `{ light, dark }` form, which no config before U9 could hold.
- Web single-mode form: `generateWebThemeBlock` writes `light-dark(<own>, <base>)` for a theme of one mode, a plain value when equal, no `color-scheme` line; `CSSThemeScoping.test.ts` rewritten (modes light, dark and both, each fixture built with only its covered mode's tokens); a `Consumer Guard` case runs config C and finds `brand` and `default` in that form.

## Targeted tests and result

`npm test -- src/themes src/generators src/cli`: green. `test:consumer -t "Spec 129 Task 14"`: green. Sparky's review of the web form: his record, `sparky-review.md`.

## Application-time adaptations

- The fallbacks design § 4 lists for a warn form were not built: no refusal ships as a warning.
- Case (c)'s opt-out leaves no `wcag` block at all (empty maps have no override keys), so "each value equal to the base" holds with no value to compare; the test asserts the block's absence of any differing value and that the built-in teal is not applied.
