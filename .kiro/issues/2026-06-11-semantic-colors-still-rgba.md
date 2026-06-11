# Issue: Semantic Color Tokens Still Output RGBA

**Date**: 2026-06-11
**Severity**: High — inconsistent output (primitives are OKLCH, semantics are RGBA)
**Version**: @3fn/core 12.0.3
**Status**: Resolved (proper fix — resolver outputs OKLCH natively)

---

## Problem

Primitive color tokens output OKLCH (`--pink-300: oklch(0.65 0.242 10)`) but semantic color tokens output RGBA (`--color-feedback-success-text: rgba(0, 255, 136, 1)`). The semantic resolution path wasn't migrated.

## Fix Applied (Proper — Resolver-Level)

Updated `SemanticValueResolver.resolveColorPrimitive()` to look up composed OKLCH colors from `composedColorMap` first, returning `oklch(L C H)` strings. Updated all three platform generators' `formatSingleReferenceToken` to handle `oklch(...)` strings alongside existing `rgba(...)`. Opacity compositions output `oklch(L C H / alpha)`.

No special-case interception needed in `TokenFileGenerator`. Normal formatting flow handles OKLCH naturally.

**Files changed:**
- `src/resolvers/SemanticValueResolver.ts` — `resolveColorPrimitive` uses composedColorMap; opacity composition outputs `oklch(... / alpha)`
- `src/providers/WebFormatGenerator.ts` — handles `oklch(` in baked-in value check
- `src/providers/iOSFormatGenerator.ts` — handles `oklch(` → `Color.oklch(L, C, H)`
- `src/providers/AndroidFormatGenerator.ts` — handles `oklch(` → `Oklch(Lf, Cf, Hf).toComposeColor()`

---

## Problem

Primitive color tokens output OKLCH (`--pink-300: oklch(0.65 0.242 10)`) but semantic color tokens output RGBA (`--color-feedback-success-text: rgba(0, 255, 136, 1)`). The semantic resolution path wasn't migrated.

## Root Cause

Task 2.3 was marked "Partial" — composed OKLCH primitives were created, but the `SemanticValueResolver` still resolves primitive references (`primitiveReferences: { value: 'green400' }`) against the old `ColorTokens.ts` which returns RGBA strings.

The OKLCH branch in `TokenFileGenerator` (line ~1669) handles ONLY the primitive section. The semantic section (generated further down via `generateSemanticSection`) resolves through `resolveSemanticTokenValue()` which returns the old RGBA format.

## Fix Required

The semantic resolution path needs to resolve color primitive references to OKLCH values instead of RGBA. Options:

**Option A**: Update `resolveSemanticTokenValue()` to look up composed OKLCH colors when the referenced primitive is a color token, returning `oklch(L C H)` string instead of `rgba(...)`.

**Option B**: Update the semantic section generator to detect color semantics and format them as OKLCH (similar to how the primitive section intercepts COLOR category).

Option A is cleaner — fixes it at the resolution layer so all downstream consumers get OKLCH.

## Affected Output

All semantic color tokens in all platform output files:
- `dist/DesignTokens.web.css` — ~40 semantic color tokens still RGBA
- `dist/DesignTokens.ios.swift` — corresponding UIColor format instead of ChromaKit
- `dist/DesignTokens.android.kt` — corresponding Color.argb instead of Oklch
