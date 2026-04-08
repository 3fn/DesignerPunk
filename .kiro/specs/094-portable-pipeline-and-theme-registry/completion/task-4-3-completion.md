# Task 4.3 Completion: iOS Migration — Form Input + Chip Families

**Date**: 2026-04-07
**Spec**: 094 - Portable Pipeline & Theme Registry
**Task**: 4.3 - iOS migration: Form Input + Chip families
**Type**: Implementation
**Validation Tier**: 2 - Standard
**Agent**: Lina

---

## Summary

Migrated 8 of 11 Form Input + Chip family iOS components from static `Color(DesignTokens.colorX)` to theme-aware `theme.colorX` via `@Environment(\.dpTheme)`. Input-Text-Email, Input-Text-Password, Input-Text-PhoneNumber had 0 color refs — no migration needed.

---

## Step 0: Token Reference Fixes

**Input-Text-Base**: Extensive dot-path notation fixes (~30 broken refs). All `DesignTokens.color.X.Y` → correct camelCase, all `DesignTokens.space.X.Y` → correct camelCase, all `DesignTokens.typography.X.Y` → correct camelCase, `DesignTokens.accessibility.X.Y` → correct camelCase, `DesignTokens.motion.X.Y` → correct camelCase, `DesignTokens.border.default` → `DesignTokens.borderDefault`, `DesignTokens.icon.size100` → `DesignTokens.iconSize100`. Color refs simultaneously migrated to theme.

---

## Changes Per Component

| Component | Color refs | Pattern | Notes |
|-----------|-----------|---------|-------|
| Input-Text-Base | 18 (+ ~12 non-color Step 0 fixes) | View + TextFieldStyle both get `@Environment` | Heaviest Step 0 fix in the spec |
| Input-Checkbox-Base | 8 | Inline refs in view body | |
| Input-Checkbox-Legal | 1 | Inline ref | |
| Input-Radio-Base | 7 | Inline refs in view body | |
| Input-Radio-Set | 1 | Inline ref | |
| Chip-Base | 4 | Static enum → removed, view uses theme | |
| Chip-Filter | 7 | Static enum → removed, view uses theme | |
| Chip-Input | 4 | Static enum → removed, view uses theme | |
| Input-Text-Email | 0 | No changes | |
| Input-Text-Password | 0 | No changes | |
| Input-Text-PhoneNumber | 0 | No changes | |

### Test Updates
- `focusIndicators.test.ts`: Updated iOS assertions from dot-path `accessibility.focus.width` / `accessibility.focus.offset` to corrected `accessibilityFocusWidth` / `accessibilityFocusOffset`

---

## Validation

| Check | Result |
|-------|--------|
| `npm test` | 318 suites, 8193 tests, all passing |
| No remaining `Color(DesignTokens.color` in migrated files | ✅ |
| Step 0 fixes applied (Input-Text-Base dot-paths) | ✅ |

---

## Requirements Traced

- R8 AC 1: iOS components read from `@Environment` ✅
- R8 AC 3: Theme-provided values propagate to descendants ✅
- R8 AC 5: Static token references unchanged ✅
