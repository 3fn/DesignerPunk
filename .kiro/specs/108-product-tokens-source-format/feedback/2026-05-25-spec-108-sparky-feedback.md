# Feedback: Spec 108 Design Outline — Product Tokens (Sparky)

**Date**: 2026-05-25
**Reviewer**: Sparky (Web Platform Engineer)
**Document reviewed**: `.kiro/issues/design-outline.md`
**Status**: Feedback submitted

---

## Overall Assessment

**The format is solid. My daily work is unblocked by this.**

The YAML → CSS mapping is straightforward, the naming convention earns its keep despite length, and cascade/specificity is a non-issue thanks to the `--product-` prefix.

---

## Feedback Items

### F1: Canonical name → CSS property name mapping (Gap)

**Priority: Medium (blocks interim hand-authoring)**

For `ref: space300`, I know the CSS name is `--space-300`. But for `ref: color.feedback.error.text`, is it `--color-feedback-error-text`? For `ref: duration350`, is it `--duration-350`?

The spec should document the canonical→CSS mapping rule (camelCase → kebab-case? dots → hyphens? number boundaries?) or acknowledge that during interim hand-authoring, I look up refs in the generated `DesignTokens.web.css` file directly.

### F2: Naming convention length — acceptable

`--product-layout-content-max-width` is long (32 chars) but practical:
- Typed once in `:root`, consumed 1-3 times via `var()`
- IDE autocomplete handles it
- The `--product-` prefix provides immediate disambiguation from system tokens
- Push back on overly-descriptive YAML names rather than changing the output convention

**No change needed.**

### F3: Cascade/specificity — no concerns

Product tokens are `:root` custom properties with unique `--product-*` names. No collision with system tokens possible. Load order (system → product → styles) is correct but technically irrelevant since names don't overlap.

### F4: var() referencing var() — no concerns

Standard CSS composition. Browser resolves at computed-value time. Indirection means product tokens automatically pick up system token value changes. DevTools shows the var reference (not resolved value) which is minor friction, not a problem.

### F5: Responsive/breakpoint-conditional tokens (Clarification needed)

**Priority: Low**

The format assumes one value per token. What about values that differ by viewport? (e.g., `contentMaxWidth: 1336px` on desktop but effectively `100%` on mobile.)

**My expectation**: Responsive application is a consumer concern — I apply the token differently at different breakpoints via media queries. The token itself doesn't vary. This is consistent with system tokens. A one-liner in the doc confirming this would prevent confusion.

### F6: `unitType: ch` + non-web platforms (Validation gap)

**Priority: Low**

Nothing prevents authoring `unitType: ch` with `platforms: [web, ios]`. The `ch` unit has no iOS/Android equivalent. Validation should catch this as an error.

### F7: Interim file placement (Documentation gap)

**Priority: Medium (affects my immediate work)**

During the interim (before generation ships), where does the hand-authored CSS file live? Options from earlier discussions:
- `src/styles/product-tokens.css`
- `src/tokens/product-tokens.css`

I prefer `src/styles/product-tokens.css` (co-located with other stylesheets I work in, not mixed with generated token output). A note in the spec or governance doc confirming this would help.

---

## Summary

| Item | Type | Priority | Blocking? |
|------|------|----------|-----------|
| F1: Canonical→CSS name mapping | Gap | Medium | Partially (interim only) |
| F2: Naming length | Non-issue | — | No |
| F3: Cascade | Non-issue | — | No |
| F4: var() indirection | Non-issue | — | No |
| F5: Responsive clarification | Documentation | Low | No |
| F6: ch + non-web validation | Validation rule | Low | No |
| F7: Interim file placement | Documentation | Medium | No (but want clarity) |

**Recommendation**: Proceed. F1 and F7 are the only items I'd want resolved before I start hand-authoring the interim CSS file. Both are answerable in a sentence.
