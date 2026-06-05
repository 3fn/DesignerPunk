# Issue: Product Token Generation Silently Stale + Blocked by Component Conflict

**Date**: 2026-06-04
**Agent**: Sparky
**Package Version**: @3fn/core (installed in DP-Portfolio)
**Severity**: High — product tokens not regenerated, dev environment renders incorrectly
**Discovered During**: Spec 007 (Portfolio Audience Repositioning), bug investigation

---

## Summary

`npx designerpunk generate` does not regenerate `dist/tokens/product/ProductTokens.web.css` when new product token YAML files are added. The generated CSS remains stale (May 27 timestamp) despite new categories being added (color.yaml, border.yaml, shadow.yaml, typography.yaml in Specs 005 and 007).

This causes all `var(--product-*)` references to new tokens to silently resolve to nothing in the browser — resulting in invisible borders, missing positioning, unstyled elements, and broken layouts. No error is surfaced anywhere.

---

## Reproduction

1. Add a new product token YAML file (e.g., `product/tokens/color.yaml`)
2. Run `npx designerpunk generate`
3. Observe: `dist/tokens/product/ProductTokens.web.css` is NOT updated (timestamp unchanged)
4. CSS using `var(--product-color-viz-syntax-cyan)` resolves to nothing

**Compounding issue**: If you delete the stale output file to force regeneration, the command exits 1 due to the pre-existing component token double-registration bug (`avatar.size.xs` conflict) and no file is written. You're stuck: can't regenerate with or without the existing file.

---

## Impact

Spent ~20 minutes diagnosing why section prefixes overlapped titles, borders were invisible, and sticky elements didn't stick. Initially assumed CSS logic errors. The actual root cause was unresolved custom properties due to stale generated output.

This is insidious because:
- No build error (CSS is syntactically valid with unresolved vars)
- No runtime error (browser silently falls back to initial/inherit)
- Visual bugs manifest far from the cause (token YAML ↔ rendered page)
- `npm run build:page` passes (esbuild doesn't validate CSS custom property resolution)

---

## Workaround Applied

Manually regenerated `dist/tokens/product/ProductTokens.web.css` with all current product tokens from the YAML source files. This is fragile — next token addition will require another manual update until the pipeline is fixed.

---

## Expected Behavior

1. `npx designerpunk generate` should detect changed/added YAML source files and regenerate output
2. If output is stale relative to source, regenerate regardless of cache
3. The component token double-registration bug should not block product token output (they're independent pipelines)
4. Ideally: a `--product-only` flag to generate just product tokens without triggering component registration

---

## Related

- `bug-component-token-double-registration.md` — the underlying component conflict that blocks full pipeline
- Spec 005 added 4 new product token YAML files (color, border, shadow, typography)
- Spec 007 extended layout.yaml with `tokenEvolutionStickyOffset`

---

## Recommendation

Short-term: Decouple product token generation from the component token registration pipeline. Product tokens are a YAML→CSS transform that doesn't need the component token registry at all.

Long-term: Fix the double-registration bug so the full pipeline works again.
