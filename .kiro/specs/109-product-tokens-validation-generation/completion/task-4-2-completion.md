# Task 4.2 Completion: Implement validate --product-tokens CLI Command

**Date**: 2026-05-25
**Spec**: 109 - Product Tokens — Reference Validation & Platform Generation
**Task**: 4.2 — Implement validate --product-tokens CLI command
**Agent**: Lina
**Status**: Complete

---

## What Was Done

- Created `src/cli/validateProductTokens.ts` — reads config, instantiates `ProductTokenGenerator`, runs `validate()`, reports per-file results with actionable hints
- Updated `src/cli/designerpunk.ts` — routes `--product-tokens` flag to new command
- Updated `src/config/ConfigLoader.ts` — added `productTokens` to `ResolvedConfig` interface and resolution logic
- Updated help text to document the new flag

## Key Behaviors

- No `productTokens` configured → reports "No productTokens path configured", exits 0
- All refs valid → per-file success report, exits 0
- Broken refs → per-file report with `→` arrows showing broken refs, exits 1
- Actionable hint: "Run `npx designerpunk generate` to refresh token-index"
- Existing `validate` command unchanged when `--product-tokens` not passed

## Files Created/Modified

| File | Change |
|------|--------|
| `src/cli/validateProductTokens.ts` | New — validation command (55 lines) |
| `src/cli/designerpunk.ts` | Updated — import, flag routing, help text |
| `src/config/ConfigLoader.ts` | Updated — `productTokens` in ResolvedConfig + resolution |

## Verification

- Project compiles cleanly ✅
- All 64 CLI tests pass (no regressions) ✅

## Requirements Coverage

| Requirement | ACs Covered |
|-------------|-------------|
| Req 1 | 1.1–1.10 (CLI command, per-file reporting, exit codes, actionable hints, edge cases) |
