# Issue: Input-Text family emitted CSS custom properties that do not exist

**Date**: 2026-09-26
**Status**: RESOLVED (2026-09-26) — born closed, three of four sites in PR `fix/input-text-phantom-vars` (merged as `3401e030`, #202); the fourth (`--color-background-hover`) resolved for `.web.ts` in follow-up PR `fix/input-text-password-hover-blend` per Peter's ruling below. `InputTextPassword.browser.ts` remains open — see § "Follow-up: hover-blend ruling and its limit" below.
**Owner**: Lina
**Source**: Follow-ups (1) and (3) from `.kiro/issues/archive/2026-09-26-container-base-phantom-css-vars.md` § "Left open, deliberately" — the same defect class, found while resolving Container-Base's closed token maps against generated CSS, deferred to its own fix.

## The defect

`Input-Text-{Base,Email,Password,PhoneNumber}` build error/success/hover styling from literal `var(--…)` strings embedded directly in CSS-in-JS templates (not from a token-name map, unlike Container-Base — but the failure mode is the same). Four literals did not exist in `DesignTokens.web.css` / `ComponentTokens.web.css`:

| Emitted (absent) | Sites | Real custom property |
|---|---|---|
| `--color-error` | border-color (error state), label text, `.error-message` text, and an icon-color literal (`InputTextBase.web.ts`, passed through `createIconBase`'s `color` prop, which does `var(--${color})`) — across all four components | Two DIFFERENT real tokens depending on role: `--color-feedback-error-border` for border-color; `--color-feedback-error-text` for label/message/icon text color |
| `--color-error-background` | `background` on the error-state container — across all four components | `--color-feedback-error-background` |
| `--color-success-strong` | border-color on the success-state container — Email, Password, PhoneNumber (Input-Text-Base already correctly used `--color-feedback-success-text` here, a separate stylistic choice, unchanged) | `--color-feedback-success-border` |
| `--color-background-hover` | `.toggle-button:hover` background — Input-Text-Password only (`.browser.ts` and `.web.ts`) | **No existing semantic match — left unfixed, see below** |

Effect: error/success border and background styling, error label/message color, and the error trailing-icon color rendered nothing on web across the whole family.

**No existing test pinned the broken strings** — unlike the Container-Base case, the family's `__tests__` directories (`focusIndicators`, `keyboardNavigation`, `labelAssociation`, `screenReaderSupport`, `stateManagement`, `touchTargetSizing`, `validation`) don't assert on the CSS-in-JS template text, so nothing needed correcting there.

## The fix

Mapped each literal to the correct existing registered semantic token (`token-index/semantics.yaml`), keeping the border/text role distinction that Input-Text-Base's pre-existing success rule already modeled:

- `var(--color-error)` (border-color) → `var(--color-feedback-error-border)`
- `var(--color-error)` (text: label, `.error-message`) → `var(--color-feedback-error-text)`
- `var(--color-error-background)` → `var(--color-feedback-error-background)`
- `'color-error'` (icon-color literal, `InputTextBase.web.ts:263`) → `'color-feedback-error-text'` (matches the pattern already used for the success icon: `'color-feedback-success-text'`)
- `var(--color-success-strong)` (border-color) → `var(--color-feedback-success-border)`

Files touched: `Input-Text-Base/platforms/web/{InputTextBase.browser.ts,InputTextBase.web.ts}`, `Input-Text-Email/platforms/web/InputTextEmail.browser.ts`, `Input-Text-Password/platforms/web/InputTextPassword.browser.ts`, `Input-Text-PhoneNumber/platforms/web/InputTextPhoneNumber.browser.ts`.

## Left open, deliberately — `--color-background-hover`

`Input-Text-Password`'s toggle-button `:hover` background (`InputTextPassword.browser.ts` and the wrapping `InputTextPassword.web.ts`) is **not fixed**. Investigation:

- No registered semantic token resolves to a literal `--color-background-hover` (or any single static color meant for a generic hover background).
- The system's actual hover-background pattern is **blend-based**, not a static color token: `blend.hoverDarker` / `blend.hoverLighter` (category `interaction`, both reference `blend200`) are opacity/blend multipliers, not colors. Other components (`Button-Icon`, `Container-Base`, `Chip-Base`, `Input-Checkbox-Base`, `Input-Radio-Base`) apply them via a JS blend-calculation utility at render time into a private custom property (e.g. `Button-Icon`'s `--_bi-hover-bg`, computed by `blendUtils`), not a static `var(--color-…)` reference.
- Wiring that pattern into Input-Text-Password would mean adopting the blend-utility infrastructure for this component for the first time — a real, non-mechanical design decision (which blend token, computed against which base color, on which element), not a token substitution. Per the governing instruction, token/design decisions of this shape are never made autonomously.
- This is also the same infrastructure the Container-Base issue's own § "Left open" item 4 names as chartered-but-not-built at the repo-wide-guard level (composite/blend expansion isn't index-resolvable), reinforcing that this isn't a quick local fix.

**Fork for Peter**: (a) wire the toggle-button hover to `blendUtils`-computed `darkerBlend(color.text.muted-or-similar-base, blend.hoverDarker)` the way `Button-Icon` does — a small but real design decision on the base color; (b) pick a plain existing semantic background token as an approximation (e.g. `color.structure.surface` variants) even though it wouldn't be a true "hover-darkened" effect; (c) leave it broken (silently render nothing) until the blend spec lands. Not resolved in this PR.

## Follow-up: hover-blend ruling and its limit

**Ruled by Peter, 2026-09-26: option (a).** Wire the toggle-button hover to the existing blend pattern the way `Button-Icon`/`Chip-Base` do it. Fixed in PR `fix/input-text-password-hover-blend`.

**Base colour + blend token chosen**: `darkerBlend(color.structure.canvas, blend.hoverDarker)`. Reasoning: the toggle button's resting background is `transparent` — it has no background of its own to darken. It sits directly on the input container's own background, `--color-structure-canvas` (`.input-container { background: var(--color-structure-canvas); }`). This mirrors Chip-Base's exact precedent — `darkerBlend(color.structure.surface, blend.hoverDarker)`, where the *chip's own resting background* is the base — except here the "surface the element visually sits on" is the parent container's canvas rather than the element's own background, since the toggle button is a transparent overlay. `blend.hoverDarker` (not `hoverLighter`) matches every other hover site in the codebase — no component uses `hoverLighter` for hover.

**Implementation** — `InputTextPassword.web.ts` only (bundler build):
- Imports `getBlendUtilities`/`BlendUtilitiesResult` from `@3fn/core/blend` (same import as Button-Icon/Chip-Base).
- `connectedCallback` defers blend calculation with the same DOMContentLoaded/`requestAnimationFrame`-retry pattern as those siblings, then renders.
- `_calculateBlendColors()` reads `--color-structure-canvas` via `getComputedStyle(document.documentElement)`, throws if missing (fail-loud, matching sibling convention), and stores `getBlendUtilities().hoverColor(canvasColor)`.
- The computed value is written directly into the regenerated `<style>` block's `:host { --_itp-hover-bg: ${value}; }` (no incremental `element.style.setProperty` step needed — unlike Button-Icon/Chip-Base, this component always fully rebuilds its shadow DOM on every `render()`, so embedding the value in the freshly-generated `<style>` text is equivalent and simpler).
- `.toggle-button:hover { background-color: var(--_itp-hover-bg); }` replaces the phantom `var(--color-background-hover)`.

**`InputTextPassword.browser.ts` is NOT fixed — a genuine stop-and-report, not an oversight.** That file is a standalone, zero-import bundle by design (see its own header: "bundles all dependencies inline for direct browser usage" — confirmed zero `import` statements anywhere in the file, unlike every other component in the repo). The blend utility this fix depends on is not a small constant: `getBlendUtilities()` sits on top of `src/blend/ThemeAwareBlendUtilities.web.ts` (323 lines) and `src/blend/ColorSpaceUtils.ts` (325 lines) of real OKLCH/RGB color-space math (`hexToRgb`, `rgbToHex`, `calculateDarkerBlend`, etc.). No `.browser.ts` file anywhere in the repo inlines blend math today (`grep -rl "blend" src/components/core/*/platforms/web/*.browser.ts` returns nothing), and no other `.browser.ts` variant exists for Button-Icon or Chip-Base to check against. Two real options, neither exercised: (i) duplicate ~650 lines of color-math into the standalone bundle — a first-of-its-kind pattern with real drift/correctness risk (this file's existing self-contained sections are small, mechanical inlines like regex password-validation patterns, not a math library); (ii) break the file's zero-import convention with a single import — the opposite kind of first-of-its-kind change. Left as-is (`--color-background-hover`, still phantom, still renders nothing on hover in the standalone build) pending Peter's call on which precedent to set. Recorded in the resolve-guard's `KNOWN_DEFERRED` list (see below).

**Guard update**: `--color-background-hover` removed from `KNOWN_DEFERRED` for `InputTextPassword.web.ts` only (still listed for `.browser.ts`). Added `KNOWN_JS_COMPUTED`, a narrowly-scoped allow-list (exact file+name pairs, not a blanket `--_`-prefix exemption — the resolve-guard's regex was widened to actually scan underscore-containing custom properties, `[a-z0-9-]` → `[a-z0-9_-]`, so it could see `--_itp-hover-bg` and correctly flag it if unrecognized) for custom properties whose value is JS-computed and therefore can never appear in `token-index/`; each entry names the behavioral test file that verifies its actual correctness, and a new test asserts that file exists.

**New behavioral test**: `Input-Text-Password/__tests__/toggleButtonHoverBlend.test.ts` — instantiates the real custom element in jsdom, sets `--color-structure-canvas`, and asserts the rendered `--_itp-hover-bg` value (a) is non-empty, (b) equals `getBlendUtilities().hoverColor(canvasColor)` computed independently in the test (exact match, not just presence), and (c) differs from the raw canvas color (catches a pass-through no-op). Button-Icon/Chip-Base have no equivalent value-level test today (their hover tests only check that `--_bi-hover-bg`/`--_chip-hover-bg` strings appear in source/CSS) — this is a stronger check than existing precedent, not a weaker mirror of it.

**Bite recorded red**: reverted `var(--_itp-hover-bg)` → `var(--color-background-hover)` in `InputTextPassword.web.ts` → both the "resolves" and "exactly this known set" guard assertions failed, correctly naming `--color-background-hover`; restored, `git diff --stat` clean.

**Validation**: `npm test` 369/369 suites, 9069 tests (was 368/9064 immediately before this follow-up branch). `npx tsc --noEmit` clean.

## The guard

`src/components/core/Input-Text-Base/__tests__/InputTextFamily.token-resolution.test.ts` (spans the whole family, modeled on Container-Base's `ContainerBase.token-resolution.test.ts`):

1. oracle non-empty (token index has >100 semantic tokens, >300 generated web names);
2. every literal `var(--…)` in the family's web files resolves to a generated custom property, with composite-expansion categories (`--typography-*`, `--motion-*`) excluded — a recorded, repo-wide limitation (Container-Base issue item 4), not specific to this fix;
3. the deferred allow-list (`--color-background-hover`, both Input-Text-Password sites) is asserted to be **exactly** that — so a new unresolved literal anywhere else in the family still fails loudly, it can't silently join the allow-list;
4. every literal icon-color string passed through `createIconBase` resolves.

**Bites, recorded red** (each reverted, guard failed naming the exact phantom, then restored — file diffs confirmed clean via `git diff --stat` before/after):
- revert `--color-feedback-error-border` → `--color-error` in `InputTextBase.browser.ts` → fails naming `--color-error`;
- revert the icon-color literal `'color-feedback-error-text'` → `'color-error'` in `InputTextBase.web.ts` → the icon-color check fails;
- revert `--color-feedback-success-border` → `--color-success-strong` in `InputTextEmail.browser.ts` → fails naming `--color-success-strong`.

## Validation

`npm test`: 368/368 suites, 9064 tests (368 was 367 pre-fix; +1 suite for the new guard, +5 tests). `npx tsc --noEmit` clean. `application-mcp-server`: 24/24 suites, 343 tests.

## Also in this PR: Container-Base schema colour truth pass (metadata only)

Container-Base issue follow-up item 3. `Container-Base.schema.yaml`'s `tokens.color` list named `color.background`, `color.surface`, `color.border.emphasis`, `color.canvas` — none registered under those exact dotted names. Corrected to the real registered equivalents actually backing the component's open `background`/`borderColor` `ColorTokenName` props: `color.structure.surface`, `color.structure.border`, `color.structure.border.subtle`, `color.structure.canvas`. `color.border.emphasis` was dropped rather than mapped — no registered token backs it anywhere in `token-index/` (native `TokenMapping.kt`/`.swift` hand-roll a `Color` value for that string, disconnected from the generated token pipeline; that alias question is out of scope here, same as the Container-Base issue's item 2). No runtime effect — `tokens:` is declared-use metadata.

## Other hits found outside the Input-Text family (not fixed — out of scope)

A repo-wide grep for the four literals turned up two more files, both **text-only matches in test strings**, not actual CSS emission — no runtime effect, not touched:
- `src/components/core/Input-Checkbox-Base/__tests__/InputCheckboxBase.stemma.test.ts`
- `src/components/core/Button-VerticalList-Set/__tests__/ButtonVerticalListSet.property2.test.ts`
