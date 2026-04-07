# iOS Component Token Reference Quality Gap

**Date**: 2026-04-07
**Severity**: High
**Agent**: Kenya
**Found during**: Spec 094 feedback — cross-platform audit prompted by Data's Android findings
**Blocks**: Task 4.1-4.4 (iOS component consumption migration) — must be resolved as part of or before R8

## Problem

8 of 34 iOS component implementations (~24%) reference token property names that don't exist in the generated `DesignTokens.ios.swift`. These files would not compile against the actual generated output.

Three distinct failure modes, mirroring Data's Android findings:

### 1. Semantic dot-path notation on a flat struct (1 component)

**Input-Text-Base** uses semantic dot-path notation (`DesignTokens.color.text.muted`, `DesignTokens.space.inset.100`, etc.) throughout. The generated `DesignTokens` struct uses flat camelCase names (`colorTextMuted`, `spaceInset100`). This component has **30+ broken references** spanning colors, spacing, typography, accessibility, and motion tokens.

Examples:
```swift
Color(DesignTokens.color.text.muted)          // should be: Color(DesignTokens.colorTextMuted)
Color(DesignTokens.color.border)              // should be: Color(DesignTokens.colorStructureBorder)
DesignTokens.space.inset.100                  // should be: DesignTokens.spaceInset100
DesignTokens.icon.size100                     // should be: DesignTokens.iconSize100
DesignTokens.typography.labelMd.fontSize      // should be: DesignTokens.typographyLabelMd.fontSize (partial — typography composites ARE nested)
DesignTokens.accessibility.tapArea.recommended // should be: DesignTokens.tapAreaRecommended
DesignTokens.motion.floatLabel.duration        // should be: DesignTokens.MotionFloatLabel.duration
DesignTokens.border.default                   // should be: DesignTokens.borderDefault
```

**Note**: Some dot-path references are partially correct — `DesignTokens.typographyLabelMd.fontSize` IS valid (typography tokens are nested structs). But `DesignTokens.typography.labelMd.fontSize` adds an extra nesting level that doesn't exist.

### 2. Shortened/incorrect token names (4 components)

Four components reference abbreviated or non-existent token names:

| Component | References | Actual token name |
|-----------|-----------|-------------------|
| Badge-Label-Base | `DesignTokens.colorSurface` | `colorStructureSurface` |
| Badge-Count-Base | `DesignTokens.colorSurface` | `colorStructureSurface` |
| Badge-Count-Notification | `DesignTokens.colorBadgeNotificationBackground` | `colorFeedbackNotificationBackground` |
| Badge-Count-Notification | `DesignTokens.colorBadgeNotificationText` | `colorFeedbackNotificationText` |
| Button-CTA | `DesignTokens.colorBackground` | `colorStructureCanvas` |

`colorSurface` drops the `Structure` segment. `colorBadgeNotification*` uses a component-level name instead of the semantic `colorFeedbackNotification*`. `colorBackground` doesn't exist — the white background token is `colorStructureCanvas`.

### 3. Wrong token names in tests (1 component, test file only)

**Button-VerticalList-Item** test file (`VerticalListButtonItemTests.swift`) references 5 non-existent tokens:

| References | Actual token name | Notes |
|-----------|-------------------|-------|
| `DesignTokens.borderBorderDefault` | `DesignTokens.borderDefault` | Doubled "border" prefix (8 occurrences) |
| `DesignTokens.borderBorderEmphasis` | `DesignTokens.borderEmphasis` | Doubled "border" prefix (8 occurrences) |
| `DesignTokens.verticalListItemPaddingBlockRest` | Component token, not on `DesignTokens` | Should reference `VerticalListItemTokens.paddingBlockRest` (2 occurrences) |
| `DesignTokens.verticalListItemPaddingBlockSelected` | Component token, not on `DesignTokens` | Should reference `VerticalListItemTokens.paddingBlockSelected` (2 occurrences) |
| `DesignTokens.motionSelectionTransitionDuration` | `DesignTokens.MotionSelectionTransition.duration` | Flat name instead of nested struct access (2 occurrences) |

**Note**: The implementation file (`VisualStateStyles.swift`) uses correct token names. Only the test file has broken references.

### 4. Dot-path notation in one other component (1 component)

**Progress-Indicator-Label-Base** has one dot-path reference:
```swift
DesignTokens.space.inset.200  // should be: DesignTokens.spaceInset200
```

## Summary by Component

| Component | File | Issue Type | Broken Refs |
|-----------|------|-----------|-------------|
| Input-Text-Base | `InputTextBase.ios.swift` | Dot-path notation | ~30 |
| Badge-Label-Base | `BadgeLabelBase.ios.swift` | Shortened name | 1 |
| Badge-Count-Base | `BadgeCountBase.ios.swift` | Shortened name | 1 |
| Badge-Count-Notification | `BadgeCountNotification.ios.swift` | Wrong name | 2 |
| Button-CTA | `ButtonCTA.ios.swift` | Non-existent token | 3 |
| Progress-Indicator-Label-Base | `ProgressIndicatorLabelBase.ios.swift` | Dot-path notation | 1 |
| Button-VerticalList-Item | `VerticalListButtonItemTests.swift` | Wrong names (test only) | 22 |

**Total**: ~60 broken references across 7 files (6 implementation + 1 test).

## Root Cause

Same as Android: iOS implementations were written against an assumed token API rather than validated against the actual generated `DesignTokens.ios.swift`. Input-Text-Base appears to have been written against a conceptual semantic token naming scheme (dot-path) rather than the actual flat struct the generator produces.

## Impact

- No production impact — M0a is web-only, iOS components aren't shipping yet
- Blocks R8 (Task 4.1-4.4) — can't migrate to `@Environment` theme pattern if the existing references are broken
- Confirms Data's suspicion that the Android issue was cross-platform

## Recommendation

### Immediate (absorb into R8)
Fix the broken references as the first step of each Task 4.1-4.4 subtask. Since R8 is touching every iOS file anyway, fixing the refs before migrating to the theme-aware pattern is natural. No separate spec needed.

### Preventive
Same as Data's recommendation: add a build-time validation that cross-references all `DesignTokens.*` usages in platform files against the actual generated token file. This should cover both iOS and Android in one pass.

## Comparison with Android

| Metric | Android (Data) | iOS (Kenya) |
|--------|---------------|-------------|
| Affected components | 10 of 34 (29%) | 7 of 34 (21%) |
| Broken references | ~40 | ~60 |
| Worst component | Input-Text-Base (34 stubs) | Input-Text-Base (~30 dot-paths) |
| Failure modes | 3 (stubs, casing, shortened) | 3 (dot-paths, shortened, wrong names) |

Input-Text-Base is the worst offender on both platforms, with different failure modes (uninitialized stubs on Android, dot-path notation on iOS). This component likely needs the most attention during R8.
