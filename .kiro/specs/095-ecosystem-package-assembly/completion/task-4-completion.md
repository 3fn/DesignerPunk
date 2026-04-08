# Task 4 Completion: Build-Time Validation Test

**Date**: 2026-04-08
**Spec**: 095 - Ecosystem Package Assembly
**Task**: 4 - Build-Time Validation Test
**Type**: Implementation
**Validation Tier**: 2 - Standard
**Agent**: Lina

---

## Summary

Created `src/__tests__/package-drift-validation.test.ts` — catches platform token reference drift and ESM bundle registration gaps. Fixed ~25 pre-existing broken token references across iOS and Android that the test surfaced.

## Test Structure

| Test | What It Validates | R7 AC |
|------|-------------------|-------|
| iOS static token refs | `DesignTokens.*` in `.swift` files against generated `DesignTokens.ios.swift` | AC 1 |
| iOS theme refs | `theme.*` in `.swift` files against theme protocol properties (conditional — only if theme types exist in generated output) | AC 1 |
| Android static token refs | `DesignTokens.*` in `.kt` files against generated `DesignTokens.android.kt` | AC 2 |
| Android theme refs | `theme.*` in `.kt` files against theme data class properties (conditional) | AC 2 |
| ESM bundle registration | Components with `platforms/web/` dirs are imported in `browser-entry.ts` | AC 3, 5 |

Filters: skips comments, extension declarations, placeholder values (`XXX`), and false positives (`DesignTokens.ios`, `DesignTokens.android` from doc strings).

## Pre-existing Broken References Fixed

### iOS (7 refs)
- `VerticalListButtonItemTests.swift`: `borderBorderDefault` → `borderDefault`, `borderBorderEmphasis` → `borderEmphasis`, `motionSelectionTransitionDuration` → `MotionSelectionTransition.duration`, `verticalListItemPaddingBlock*` → `VerticalListItemTokens.paddingBlock*`
- `NavTabBarBase.ios.swift`: `Color(DesignTokens.colorIconNavigationInactive)` → `theme.colorIconNavigationInactive` (now theme-varying after Ada Task 4.9)

### Android (~18 refs)
- Nav-Header-Base: `borderWidth100` → `border_width_100`, `tapAreaRecommended` → `tap_area_recommended`
- Nav-Header-Page: `duration150` → `Duration.Duration150`, `spaceGroupedTight` → `space_grouped_tight`, `spaceInset100` → `space_inset_100`, `typographyLabelMd` → `typography_label_md`
- Container-Base: `radius050/100/200` → `radius_050/100/200`, `accessibilityFocusColor` → `accessibility_focus_color`
- Container-Card-Base: `radius100/200` → `radius_100/200`
- Progress-Bar-Base: `size050/100/150` → `size_050/100/150`
- NavTabBarBase: `Color(DesignTokens.color_icon_navigation_inactive)` → `theme.color_icon_navigation_inactive`

## Validation

| Check | Result |
|-------|--------|
| `npm test` | 319 suites, 8204 tests, all passing |
| Package drift validation | 6/6 tests passing, zero drift |

## Requirements Traced

- R7 AC 1: iOS token references validated ✅
- R7 AC 2: Android token references validated ✅
- R7 AC 3: ESM bundle registration validated ✅
- R7 AC 4: Failures report component, file, and reference ✅
- R7 AC 5: Missing web components reported by name ✅
