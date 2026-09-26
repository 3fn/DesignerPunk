# Issue: Input-Text family emitted CSS custom properties that do not exist

**Date**: 2026-09-26
**Status**: RESOLVED (2026-09-26) — born closed, three of four sites; one deliberately left open. Fixed in PR `fix/input-text-phantom-vars`.
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
