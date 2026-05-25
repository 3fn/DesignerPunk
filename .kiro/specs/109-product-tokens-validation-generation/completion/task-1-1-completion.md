# Task 1.1 Completion: Implement qualified path generation for nested primitives

**Date**: 2026-05-25
**Task**: 1.1 Implement qualified path generation for nested primitives
**Type**: Implementation
**Status**: Complete

---

## Artifacts Created

- `scripts/generate-token-index.ts` (modified) — Added `NESTED_PRIMITIVE_FAMILIES` set and qualified path logic for iOS/Android
- `token-index/primitives.yaml` (regenerated) — Now contains qualified paths for duration, easing, and scale tokens

---

## Implementation Details

### Approach

Added a `NESTED_PRIMITIVE_FAMILIES` set (duration, easing, scale) to `generate-token-index.ts`, derived from `TokenFileGenerator.DEDICATED_PRIMITIVE_CATEGORIES`. For tokens in these families, the generator now emits fully qualified platform paths that match the actual generated code structure:

- **iOS**: `{Namespace}.{camelCaseProperty}` (e.g., `Duration.duration150`)
- **Android**: `{Namespace}.{PascalCaseProperty}` (e.g., `Duration.Duration150`)
- **Web**: Unchanged — CSS custom properties remain flat (e.g., `--duration-150`)

### Key Decisions

1. **Namespace derivation**: The namespace name is the PascalCase of the family name (e.g., `duration` → `Duration`). This matches the `public enum Duration` (iOS) and `object Duration` (Android) in generated output.

2. **Android property name**: The Android property name inside the namespace uses PascalCase (via `toKotlinTypeName` logic: split on `.`/`-`, capitalize first letter of each part). This differs from the flat `getTokenName()` output which uses snake_case. The fix computes PascalCase inline rather than calling the Android generator's `getTokenName()`.

3. **iOS property name**: The iOS property name inside the namespace uses camelCase, which is the same as what `getTokenName()` already returns. Only the namespace prefix needed to be added.

4. **Drift prevention**: The `NESTED_PRIMITIVE_FAMILIES` set uses `TokenCategory` enum values and includes a comment linking to `TokenFileGenerator.DEDICATED_PRIMITIVE_CATEGORIES` as the source of truth.

### Integration Points

- **Product MCP `TokenRefResolver`**: Reads `platforms` field from token-index as strings — longer strings with dots are transparent (134 tests pass).
- **Application MCP `TokenIndexer`**: Spreads entries without parsing platform values — transparent change (26 tests pass).
- **Product Token Generator (Task 2+)**: Will read these qualified paths directly for ref resolution, avoiding consumer-side namespace guessing.

---

## Validation

### Tests Run

| Suite | Result |
|-------|--------|
| Full test suite | 334 passed, 1 failed (pre-existing init.test.ts — steering doc count) |
| Token-index tests | 26/26 passed |
| Product MCP tests | 134/134 passed |
| Integration tests | 656/656 passed (30 suites) |

### Format Verification

| Family | iOS (before → after) | Android (before → after) | Web |
|--------|---------------------|--------------------------|-----|
| Duration | `duration150` → `Duration.duration150` | `duration_150` → `Duration.Duration150` | `--duration-150` (unchanged) |
| Easing | `easingStandard` → `Easing.easingStandard` | `easing_standard` → `Easing.EasingStandard` | `--easing-standard` (unchanged) |
| Scale | `scale088` → `Scale.scale088` | `scale_088` → `Scale.Scale088` | `--scale-088` (unchanged) |
| Spacing | `space100` (unchanged) | `space_100` (unchanged) | `--space-100` (unchanged) |

---

## Requirements Addressed

- **Req 7.1**: Token-index stores full qualified platform paths for nested primitives ✅
- **Req 7.2**: Tokens in flat namespaces are unaffected ✅
- **Req 7.6(a)**: Primitive tokens use flat property name under DesignTokens (for non-nested) or qualified namespace path (for nested) ✅
