# Task 4 Summary: Staleness Detection and --product-only

**Date**: 2026-06-05
**Purpose**: Concise summary of Task 4 completion
**Organization**: spec-summary
**Scope**: 114-generation-pipeline-data-flow

---

## What Was Done

Implemented product token staleness detection (mtime comparison) and `--product-only` CLI flag. Staleness integrated into both full pipeline and product-only mode. Added `--force` override. Updated CLI help and Integration Guide.

## Why It Matters

Product developers adding new YAML token files were debugging rendering issues caused by stale output — the pipeline didn't know it needed to regenerate. Now it detects staleness automatically and regenerates only when needed. The `--product-only` flag gives fast iteration without requiring the full system pipeline to be healthy.

## Key Changes

- `src/cli/staleness.ts` — mtime-based staleness detection
- `--product-only` flag skips system pipeline, uses existing token-index
- `--force` flag bypasses staleness check
- Staleness logged every time (never silent): skip message or regeneration
- 16 new tests (8 staleness + 8 product-only)

## Impact

- Fixes R4 (Staleness Detection) and R5 (Product-Only Mode) — all acceptance criteria met
- Fast product iteration: `npx designerpunk generate --product-only` completes in <1s
