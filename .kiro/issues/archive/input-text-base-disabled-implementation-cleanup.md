# Input-Text-Base: Remove Disabled Implementation from Web Platform

**Date**: 2026-03-01
**Source**: Spec 066, Task 3.3
**Priority**: Low — **RESOLVED**
**Component**: Input-Text-Base

## Issue

Input-Text-Base's web implementation (`InputTextBase.web.ts`) contains disabled state behavior — observes `disabled` attribute, calculates `_disabledColor` via `blend.disabledDesaturate`, applies disabled CSS class — despite the component having no `disabled` prop in types.ts. The types.ts explicitly offers `readOnly` as the "alternative to disabled."

The `state_disabled` contract was removed and replaced with a standardized exclusion in Spec 066. The web implementation's disabled handling is now undocumented legacy behavior that should be cleaned up.

## Scope

- Remove `disabled` from `observedAttributes` in `InputTextBase.web.ts`
- Remove `_disabledColor` calculation and blend utility usage for disabled state
- Remove `.disabled` CSS class handling from render method
- Remove disabled styles from `InputTextBase.web.css` (if present)
- Verify `blend.disabledDesaturate` can be removed from Input-Text-Base schema tokens
- Check if Input-Text-Email/Password/PhoneNumber inherit any disabled behavior that also needs cleanup

## Resolution

**Date**: 2026-03-01
**Resolved by**: Lina

Removed disabled implementation from web platform files across Input-Text-Base and all 3 children (Email, Password, PhoneNumber). Cleaned `.web.ts`, `.browser.ts`, and `.styles.css` files. Removed `blend.disabledDesaturate` from Base schema. Added `state_disabled` exclusion to children's contracts.yaml. Updated 2 stemma tests to validate exclusion instead of implementation.

Files changed: 8 platform files, 1 schema, 3 contracts, 2 test files.
Tests: 290/290 suites, 7435/7435 passed.

---

## Follow-up: iOS/Android Cleanup

**Date**: 2026-07-15
**Resolved by**: Lina
**Priority**: Low — **RESOLVED**

The 2026-03-01 resolution removed disabled handling from WEB platform files only. The iOS and Android implementations of Input-Text-Base and all 3 children retained live disabled-state handling (`isDisabled` prop, `disabledBlend()` calls, disabled previews), contradicting the `state_disabled` exclusion in contracts.yaml and types.ts (which offers `readOnly` as the alternative and has never had a `disabled` prop).

### Scope

- `InputTextBase.ios.swift` — removed `isDisabled` property, `disabledBlend()` label/border branches, `.disabled(readOnly || isDisabled)` → `.disabled(readOnly)`, field-style `isDisabled` (text color + focus-ring gating), disabled preview, header contract/feature mentions
- `InputTextBase.android.kt` — removed `disabledBlend` import, `isDisabled` param, `disabledBlend()` label/border branches, focus-ring `!isDisabled` gating, disabled text color, `readOnly = readOnly || isDisabled` → `readOnly`, header mentions
- Children (Email/Password/PhoneNumber, iOS + Android) — removed inherited `isDisabled` params, pass-throughs, disabled previews; Password also dropped toggle-button disabling (`.disabled(isDisabled)` / `enabled = !isDisabled`)
- `focusIndicators.test.ts` — assertions updated to the disabled-free focus-ring conditions
- `form-inputs-contracts.test.ts` — dead `disabled_state` CONTRACT_PATTERNS entry replaced with `DISABLED_EXCLUSION_GUARD_PATTERNS`; new exclusion-guard test asserts no Form Inputs platform implementation contains `isDisabled`, `disabledBlend`, `aria-disabled`, or `cursor: not-allowed` (Spec 066 / Button-CTA pattern)

Note: iOS's `.disabled(readOnly)` was retained by this cleanup on the rationale that it was "SwiftUI's mechanism for the documented `readOnly` prop, not a disabled state." **That rationale was technically incorrect and is SUPERSEDED** by the iOS readOnly adjudication (`.kiro/issues/input-text-base-ios-readonly-adjudication.md` — RULED B-prime, Peter 2026-07-15): SwiftUI has no read-only TextField, and `.disabled()` produces disabled semantics regardless of intent (unfocusable, unselectable, VoiceOver "dimmed"). Under the ruling, iOS renders `readOnly` as selectable `Text` inside the shared field chrome, `.disabled(readOnly)` is removed, and `DISABLED_EXCLUSION_GUARD_PATTERNS` gained an iOS `.disabled(` pattern so disabled semantics cannot silently return.

This completes the component-code prerequisite for Ada's staged deprecation of `blend.disabledDesaturate` and the `disabledBlend()` utility extensions (Button-CTA adjudication follow-up #1, `.kiro/issues/button-cta-disabled-state-adjudication.md`). `token-index/semantics.yaml` shows `consumers: []` for `blend.disabledDesaturate` because the index is schema-derived; these platform-code call sites were invisible to it — now they are gone on all platforms.
