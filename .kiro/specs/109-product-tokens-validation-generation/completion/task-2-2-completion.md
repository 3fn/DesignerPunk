# Task 2.2 Completion: Implement ProductTokenGenerator

**Date**: 2026-05-25
**Spec**: 109 - Product Tokens — Reference Validation & Platform Generation
**Task**: 2.2 — Implement ProductTokenGenerator
**Agent**: Lina
**Status**: Complete

---

## What Was Done

Created `src/build/product/ProductTokenGenerator.ts` — the core generator that parses `product/tokens/*.yaml`, resolves refs via `TokenIndexReader` (getting platform paths + themeVarying), collects broken refs with source context, and produces `ResolvedCategory[]` for platform emitters.

## Implementation Details

### Public API

- `generate()` → `GenerationResult` (categories, tokenCount, categoryCount, brokenRefs)
- `validate()` → `ValidationResult` (per-file results, brokenRefs)

### Key Behaviors

- Broken refs are collected but tokens are still included in output (with `resolvedPlatformPath: null`)
- Theme-varying status propagated from token-index to `ResolvedToken.themeVarying`
- Platform filtering preserved per-token (emitters apply it later)
- Missing directory handled gracefully (empty result)
- YAML parse errors silently skip the file (returns null)

## Files Created

| File | Purpose |
|------|---------|
| `src/build/product/ProductTokenGenerator.ts` | Generator class (130 lines of logic) |
| `src/build/product/__tests__/ProductTokenGenerator.test.ts` | Unit tests (12 tests) |
| `src/build/product/__tests__/fixtures/tokens/layout.yaml` | Fixture: hard values + refs |
| `src/build/product/__tests__/fixtures/tokens/motion.yaml` | Fixture: ref + broken ref |
| `src/build/product/__tests__/fixtures/tokens/visualization.yaml` | Fixture: theme-varying ref |

## Verification

- All 12 ProductTokenGenerator tests pass ✅
- All 19 src/build/product/ tests pass ✅

## Requirements Coverage

| Requirement | ACs Covered |
|-------------|-------------|
| Req 1 | 1.2, 1.3 (ref validation, broken ref reporting) |
| Req 2 | 2.2, 2.3 (platform filtering, ref resolution) |
| Req 3 | 3.2, 3.3 (platform filtering, ref resolution) |
| Req 4 | 4.2, 4.3 (platform filtering, ref resolution) |
| Req 5 | 5.5, 5.6 (validation during generation, broken ref collection) |
