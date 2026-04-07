# Android Component Token Reference Quality Gap

**Date**: 2026-04-07
**Severity**: High
**Agent**: Data
**Found during**: Spec 094 feedback — Task 4 (R8 component migration) review
**Blocks**: Task 4.5-4.8 (Android component consumption migration) — must be resolved as part of or before R8

## Problem

10 of 34 Android component implementations (~29%) reference token property names that don't exist in the generated `DesignTokens.android.kt`. These files would not compile against the actual generated output.

Three distinct failure modes:

### 1. Uninitialized stub declarations (1 component)

**Input-Text-Base** has 34 token declarations (8 color, 26 typography/spacing/motion) that are stubs — declared with types and comments but no assigned values:

```kotlin
private val colorTextMuted: Color // Generated from color.text.muted
private val colorTextDefault: Color // Generated from color.text.default
private val colorActionPrimary: Color // Generated from color.action.primary
```

The composable body references these properties (e.g., `cursorBrush = SolidColor(colorActionPrimary)`), but they're never initialized. This is an incomplete implementation.

### 2. CamelCase names referencing snake_case tokens (3 components)

Nav-Header-Base, Nav-Header-Page, and Progress-Bar-Base use camelCase property names:

```kotlin
val trackColor = DesignTokens.colorProgressPendingBackground  // doesn't exist
```

The generated file uses `color_progress_pending_background` (snake_case). These references would fail to resolve.

**Affected components:**
- Nav-Header-Base: `colorStructureCanvas`, `colorStructureBorderSubtle`
- Nav-Header-Page: `colorActionNavigation`
- Progress-Bar-Base: `colorProgressPendingBackground`, `colorProgressCompletedBackground`, `colorProgressCurrentBackground`

### 3. Shortened/incorrect token names (6 components)

Six components reference abbreviated token names that don't match the generated output:

| Component | References | Actual token name |
|-----------|-----------|-------------------|
| Chip-Base | `DesignTokens.color_border` | `color_structure_border` |
| Chip-Base | `DesignTokens.color_surface` | `color_structure_surface` |
| Chip-Filter | `DesignTokens.color_border` | `color_structure_border` |
| Chip-Filter | `DesignTokens.color_surface` | `color_structure_surface` |
| Chip-Input | `DesignTokens.color_border` | `color_structure_border` |
| Chip-Input | `DesignTokens.color_surface` | `color_structure_surface` |
| Badge-Label-Base | `DesignTokens.color_surface` | `color_structure_surface` |
| Container-Card-Base | `DesignTokens.color_border` | `color_structure_border` |
| Container-Base | `DesignTokens.accessibilityFocusColor` | `accessibility_focus_color` |

## Root Cause

Android implementations were written against an assumed token API rather than validated against the actual generated `DesignTokens.android.kt`. The readiness sweep did not include a check that verifies platform file token references resolve against the generated output.

## Impact

- No production impact — M0a is web-only, Android components aren't shipping yet
- Blocks R8 (Task 4.5-4.8) — can't migrate to `CompositionLocal` theme pattern if the existing references are broken
- Suggests iOS may have similar issues (not yet audited with the same rigor)

## Recommendation

### Immediate (absorb into R8)
Fix the broken references as the first step of each Task 4.5-4.8 subtask. Since R8 is touching every Android file anyway, fixing the refs before migrating to the theme-aware pattern is natural. No separate spec needed.

### Preventive
Add a build-time validation that cross-references all `DesignTokens.*` usages in platform files against the actual generated token file. Same pattern as the ESM bundle reconciliation test (2026-04-06 issue) — automated, can't be forgotten.

### Cross-platform audit
Run the same analysis on iOS platform files before Kenya starts the iOS side of R8 (Task 4.1-4.4). If iOS has the same issue, fix it in the same pass.

## Affected Files

| Component | File | Issue |
|-----------|------|-------|
| Input-Text-Base | `platforms/android/InputTextBase.android.kt` | Uninitialized stubs |
| Nav-Header-Base | `platforms/android/NavHeaderBase.android.kt` | CamelCase names |
| Nav-Header-Page | `platforms/android/NavHeaderPage.android.kt` | CamelCase names |
| Progress-Bar-Base | `platforms/android/ProgressBarBase.android.kt` | CamelCase names |
| Chip-Base | `platforms/android/ChipBase.android.kt` | Shortened names |
| Chip-Filter | `platforms/android/ChipFilter.android.kt` | Shortened names |
| Chip-Input | `platforms/android/ChipInput.android.kt` | Shortened names |
| Badge-Label-Base | `platforms/android/BadgeLabelBase.android.kt` | Shortened names |
| Container-Card-Base | `platforms/android/ContainerCardBase.android.kt` | Shortened names |
| Container-Base | `platforms/android/ContainerBase.android.kt` | Shortened names |
