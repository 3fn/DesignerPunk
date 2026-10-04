# Issue: Sparky's charter says `data-theme` works on any element; the generator emits `:root[data-theme="…"]`, which matches only the document root

**Date**: 2026-10-03
**Status**: ACTIVE
**Owner**:
- **Thurgood + Leonardo** for the charter text (`canonical/agents/sparky.md` and its generated renderings).
- **Ada** for the generator's intent: is root-only scoping deliberate, or a gap?
- Sparky is the reporter and the web verifier.

**Trigger**: **the first PR after Spec 123 U3 merges that is allowed to touch `canonical/**`.** At that PR, either the charter is corrected, or a recorded decision says the generator will change instead.
**Source**: Sparky's Spec 123 Task 19.4 owner review of the Integration Guide § Platforms › Web (2026-10-03). That review corrected the guide's own example from `<div data-theme="wcag">` to `<html data-theme="wcag">`, and it flagged the charter text and the generator docstring. Ada confirmed the guide text before Sparky's review and missed the scoping; recorded here for the claims pass.

---

## The gap (VERIFIED by Ada's reading at `ea348aa76`)

- **The charter.** `canonical/agents/sparky.md:307-308`: "Web theming uses `data-theme` attribute on HTML elements — all descendant DesignerPunk components inherit themed CSS custom property values automatically (including through Shadow DOM)". Also: "Custom themes activate via `data-theme="{name}"`".
- **The emitted selector (WCAG block)**: `src/generators/TokenFileGenerator.ts:977` pushes `:root[data-theme="wcag"] {`. Shipped output: `dist/DesignTokens.web.css:932`.
- **The generic theme block** (currently uncalled): `TokenFileGenerator.ts` `generateWebThemeBlock` also emits `:root[data-theme="${theme.name}"] {`, about 36 lines into the function that starts near `:1055`.
- **The docstring disagrees with the code.** `TokenFileGenerator.ts:1025` says it "produces `[data-theme="name"] { ... }` blocks", which is unscoped.
- **The CSS fact.** `:root` matches only the document root element (`<html>`). So `data-theme="wcag"` on any other element matches nothing, and components inside get base values.
- **Sparky's evidence.** Sparky reports the same, citing `WebColorResolver.ts:72,145`. Ada did not re-read those lines. Nothing was run in a browser by Ada.

## Two possible fixes (stated; neither picked)

1. **Charter text follows the generator.** Say that `data-theme` is set on `<html>`, so a theme applies page-wide, and that per-subtree theming is not supported. Cost: a charter edit plus regeneration, through the ballot process (agent prompts are governance surface). Generator unchanged.
2. **Generator follows the charter.** Emit an unscoped `[data-theme="…"]` selector (or `:root[data-theme], [data-theme]`), so any element scopes its subtree. That matches the docstring at `:1025`.

   Cost and risk, which Ada must weigh as generator intent:
   - specificity changes relative to the `:root` base block;
   - how custom properties set on a light-DOM ancestor reach Shadow DOM, which inheritance does allow, but which needs a browser check;
   - every consumer's regenerated CSS changes;
   - Spec 129 will touch the same theme-block code, so this choice should be made there, not twice.

The pick is Peter's, after Ada states the intended scoping. Ada's honest position today: **the intent is unrecorded.** The docstring says unscoped and the code says root-scoped. Nothing found in Spec 080 or 094 reads as a deliberate root-only decision, but the search was not exhaustive.

## Grant paths

**Proposed for Peter.** This list is not activated by this record; README rule 8.
- **Option 1**: none. `canonical/**` is governance surface and changes through the ballot or charter process.
- **Option 2**: `src/generators/TokenFileGenerator.ts` is in Ada's write scope. Proposed for the test half: `src/generators/__tests__/**`, which is also Ada's. Any guide text change goes through the Integration Guide's owners.

## Counter-argument and what survives

- **"Just fix the charter. Root-only is simpler, and nothing uses subtree theming yet."**
  - **What survives**: the generator's own docstring promises subtree scoping, and per-subtree theming (for example, a WCAG panel inside a page) is a plausible product need. Choosing option 1 quietly forecloses it.
  - That is a fork, so it is surfaced, not picked.

**No fix is authorized by this record.**
