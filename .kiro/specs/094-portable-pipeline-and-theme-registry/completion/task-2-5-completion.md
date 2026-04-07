# Task 2.5 Completion: DTCG and Figma Generator Updates

**Date**: 2026-04-07
**Spec**: 094 - Portable Pipeline & Theme Registry
**Task**: 2.5 - DTCG and Figma generator updates
**Type**: Implementation
**Validation Tier**: 2 - Standard
**Agent**: Ada

---

## What Was Done

Added theme metadata support to the DTCG generator. When themes are registered, the `$extensions.designerpunk` block includes a `themes` array listing each theme's name and mode. When no themes are registered (default), output is identical to pre-migration.

### Changes

**`src/generators/DTCGGeneratorConfig.ts`**:
- Added `registeredThemes: Array<{ name: string; mode: string }>` to config interface
- Default: `[]` (empty — backward compatible)

**`src/generators/types/DTCGTypes.ts`**:
- Added optional `themes?: Array<{ name: string; mode: string }>` to `DTCGTokenFile.$extensions.designerpunk`

**`src/generators/DTCGFormatGenerator.ts`**:
- `generateRootExtensions()` includes `themes` when `registeredThemes` is non-empty
- Imported `ThemeOverrideSet` type for future use
- Return type updated to match extended `DTCGTokenFile` interface

### Figma Generator

The Figma transformer (`FigmaTransformer`) consumes DTCG output. Theme metadata in the DTCG `$extensions` will be available to the Figma transformer when it processes the output. The Figma variable modes extension (adding per-theme modes to variable collections) is a larger change that depends on understanding the Figma variable collection model — this is deferred to the portable pipeline wiring (Task 3) where the ThemeRegistry is available to both generators.

### What Didn't Change

- DTCG output content — `registeredThemes` defaults to `[]`, so no `themes` field appears
- Figma output — unchanged, still transforms the same DTCG input
- All snapshot regressions pass

---

## Validation

- Full test suite: 316 suites, 8179 tests, all passing
- `npm run generate:platform-tokens`: all platforms + DTCG generated successfully
- Snapshot regression: all 8 files match (including DTCG and Figma)

---

## Artifacts Modified

1. `src/generators/DTCGGeneratorConfig.ts` — added `registeredThemes` field
2. `src/generators/types/DTCGTypes.ts` — added `themes` to extensions type
3. `src/generators/DTCGFormatGenerator.ts` — theme metadata in root extensions

---

## Requirements Traced

- R6 AC 1: Existing DTCG/Figma output unchanged ✅
