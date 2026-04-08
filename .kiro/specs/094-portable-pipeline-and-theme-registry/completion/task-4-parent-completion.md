# Task 4 Parent Completion: Component Consumption Migration (R8)

**Date**: 2026-04-07
**Spec**: 094 - Portable Pipeline & Theme Registry
**Task**: 4 - Component Consumption Migration (R8)
**Type**: Parent
**Validation Tier**: 3 - Comprehensive
**Agent**: Lina

---

## Summary

Migrated all 34 iOS and 34 Android component implementations from static `DesignTokens.colorX` references to theme-aware consumption via `@Environment(\.dpTheme)` (iOS) and `val theme = LocalDPTheme.current` (Android). Static tokens (spacing, sizing, radius, typography, motion) remain unchanged. Old static color properties removed from generated output by Ada (Task 4.9).

---

## Scope

| Platform | Components reviewed | Components migrated | Components skipped (0 color refs) |
|----------|-------------------|--------------------|------------------------------------|
| iOS | 34 | 26 | 8 (Container-Base, Icon-Base, Input-Text-Email, Input-Text-Password, Input-Text-PhoneNumber, Nav-Header-App, Progress-Stepper-Base, Progress-Stepper-Detailed) |
| Android | 34 | ~26 | 8 (Icon-Base, Input-Text-Base, Input-Text-Email, Input-Text-Password, Input-Text-PhoneNumber, Nav-Header-App, Progress-Stepper-Base, Progress-Stepper-Detailed) |

---

## Step 0 Fixes (Broken Token References)

Found and fixed during migration — these were pre-existing broken references that would not compile against the generated token files.

### iOS
| Component | Broken Ref | Fix |
|-----------|-----------|-----|
| Button-CTA | `colorBackground` (3 refs) | → `colorStructureCanvas` (via theme) |
| Badge-Count-Base | `colorSurface` | → `colorStructureSurface` (via theme) |
| Badge-Label-Base | `colorSurface` | → `colorStructureSurface` (via theme) |
| Badge-Count-Notification | `colorBadgeNotificationBackground/Text` (2 refs) | → `colorFeedbackNotificationBackground/Text` (via theme) |
| Input-Text-Base | ~30 dot-path refs (`DesignTokens.color.text.muted`, etc.) | → correct camelCase (via theme for colors, direct for non-colors) |
| Progress-Indicator-Label-Base | `space.inset.200` (dot-path) | → `spaceInset200` |

### Android
| Component | Broken Ref | Fix |
|-----------|-----------|-----|
| Badge-Label-Base | `color_surface` | → `color_structure_surface` (via theme) |
| Progress-Bar-Base | camelCase refs (`colorProgressPendingBackground`) | → snake_case via theme |
| Container-Base TokenMapping.kt | stale `colorBorder` in else branch | → `theme.color_structure_border` |
| Container-Base | `resolveContainerBaseColorToken` stub returning `Color.Gray` | → delegates to `resolveColorToken(tokenName, theme)` |

---

## Migration Patterns

### Pattern A: Inline refs in view/composable body (most components)
Add `@Environment`/`CompositionLocal`, replace `Color(DesignTokens.colorX)` with `theme.colorX`.

### Pattern B: Static token enum/object with color properties (Nav, Chip, Badge, Avatar, Progress-Bar)
Remove color properties from static enum/object. Replace usages in view body with direct `theme.colorX` refs.

### Pattern C: VisualStateStyles factory pattern (Button-VerticalList-Item)
Convert static `let`/`val` style properties to functions taking theme parameter. Thread theme through `computeStyles` → `getStylesForState` → `applyErrorStyles` chain. Both iOS and Android.

### Pattern D: Token mapping utility (Container-Base Android)
Add `theme: DesignerPunkTheme` parameter to public color-resolving functions. Remove file-level color constants. Remove dead stubs.

---

## Process Lessons

1. **Batch sed across families is risky.** Sed replacements for `Color(DesignTokens.colorX)` → `theme.colorX` also hit static enum/object properties, creating broken `static let = theme.X` patterns. Fixed approach: remove static color properties as a distinct first step, then replace inline usages.

2. **Step 0 fixes should be a deliberate pass, not incidental.** Mixing broken-ref fixes with theme migration made it harder to verify each change independently. Better to fix broken refs first, verify, then migrate.

3. **Container-Base TokenMapping.kt needed a rework.** Initial pragmatic approach left a stale reference and dead stubs. Rework caught and fixed these. The final state is clean: color-resolving functions take theme, non-color functions don't.

---

## Test Updates

| Test | Change |
|------|--------|
| `NavTabBarBase.ios.test.ts` | `dotColor` assertion → `theme.colorActionNavigation` |
| `NavTabBarBase.android.test.ts` | `dotColor` assertion → `theme.color_action_navigation` |
| `focusIndicators.test.ts` | `accessibility.focus.width/offset` → `accessibilityFocusWidth/Offset` |

---

## Validation

| Check | Result |
|-------|--------|
| `npm test` | 318 suites, 8193 tests, all passing |
| No `Color(DesignTokens.color` in migrated iOS files | ✅ (except intentional `colorIconNavigationInactive` in Nav-TabBar-Base) |
| No `Color(DesignTokens.color` in migrated Android files | ✅ (except intentional `color_icon_navigation_inactive` in Nav-TabBar-Base) |
| Empty token enums cleaned up | ✅ (BadgeCountBaseTokens, BadgeCountNotificationTokens removed) |
| Old static color properties removed from generated output | ✅ (Ada Task 4.9) |

---

## Requirements Traced

- R8 AC 1: iOS components read from `@Environment` ✅
- R8 AC 2: Android components read from `CompositionLocal` ✅
- R8 AC 3: Theme-provided values propagate via `@Environment` ✅
- R8 AC 4: Theme-provided values propagate via `CompositionLocalProvider` ✅
- R8 AC 5: Static token references unchanged ✅
- R8 AC 6: Old static color properties removed from generated output ✅
- R6 AC 3: All existing test suites pass ✅
- R6 AC 5: Component behavioral contract tests pass ✅
