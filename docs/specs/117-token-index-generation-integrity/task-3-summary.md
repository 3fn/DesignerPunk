# Task 3 Summary: Token-Index OKLCH Color + Theme-Varying — Merged Spine Fix (R3 + R5)

**Date**: 2026-06-24
**Purpose**: Concise summary of parent task completion
**Organization**: spec-summary
**Scope**: 117-token-index-generation-integrity

## What Was Done

Fixed the token-index OKLCH color values (R3) and theme-varying flags (R5) with one **shared mode-resolution source** (ratified Option B). `generateTokenFiles` now returns a `ModeResolvedTokens` object that the token-index generator consumes, so the index reads the **same resolved truth dist writes** instead of re-deriving it — collapsing the three parallel resolutions that had silently drifted.

## Why It Matters

The root cause was duplication: "resolve a color per mode" and "decide what varies by theme" were each computed in two places, so the OKLCH migration updated the dist path and left the index path behind. Option B removes the duplication rather than patching both copies — the index now **cannot** drift from dist, because it consumes dist's own computation. This is the spine fix the guiding principle calls for (one source, two readouts), not a leaf patch.

## Key Changes

- `src/generators/ModeResolvedTokens.ts` (new) — shared mode-resolved interface with an anti-conflation doc-guard
- `src/generators/generateTokenFiles.ts` — returns the shared source (resolved light/dark, base-scoped theme-varying, per-primitive OKLCH); dist-feeding path untouched
- `src/generators/generateTokenIndex.ts` — emits mode-aware OKLCH + base-scoped `themeVarying`
- `src/cli/designerpunk.ts` — threads the shared source; `src/cli/themeVarying.ts` deleted
- Regenerated `token-index/{primitives,semantics}.yaml`

## Impact

- ✅ **R3**: color primitives carry OKLCH consistent with dist; `rgba(` 216 → 16 (the 16 = un-migrated shadow family, logged as an issue, not a divergence)
- ✅ **R5**: `themeVarying` = the 5 dist base-mode keys, not committed's stale 10
- ✅ Dist output provably unchanged; full suite **8955 tests** + `tsc` green (re-verified in main loop)
- ✅ Artifacts regenerated via the **documented CLI** (unblocked by Spec 118) — early signal for the Task 5.3 trust gate
- ↪ Surfaced & routed: shadow OKLCH migration (Spec 112 follow-on issue); package-mode `components.yaml` emptying (this spec's Task 4 / R4)
- ⚠ Carry-forward: the two distinct theme-varying sets are guarded by doc-comments only — Task 5 should add an automated guard
