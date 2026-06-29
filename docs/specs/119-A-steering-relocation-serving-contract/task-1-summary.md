# Task 1 Summary: Doc Inventory + Comprehensive Steering-Path Coupling Sweep

**Date**: 2026-06-29
**Purpose**: Concise summary of parent task completion
**Organization**: spec-summary
**Scope**: 119-A-steering-relocation-serving-contract

## What Was Done

Produced the two foundation artifacts for 119-A: a complete 89-doc inventory with post-migration roles (`doc-inventory.md`), and a comprehensive, classified sweep of every surface coupling to a `.kiro/steering/…` path (`coupling-sweep.md`). No code introduced, no document content modified. These artifacts are the authoritative count-source the Task 11 / Req 8 relocation-integrity gate asserts against.

## Why It Matters

Relocation breaks every surface that addresses docs by physical path. This inventory is what lets the move proceed safely: it names each must-fix coupling (so nothing silently 404s) and separates it from surfaces the legacy-path fallback rescues. It is the per-surface input to the Severable Seam Partition — the MUST-FIX bucket *is* the gate's must-fix axis.

## Verified Outcome

- ✅ **89 docs**, no drift; index healthy. Roles: 8 identity (on disk) + 80 relocated + 1 removed.
- ✅ MUST-FIX coupling surfaces enumerated live with `file:line`; family-guidance 22 (9 top-level gate-visible + 13 nested gate-blind), README:32, 3 reverse-links — no drift.
- ✅ Consequential findings independently re-verified in the main loop.

## Honest Notes (drifts from spec figures)

- **`skill://` scope correction:** agent `resources` carry steering paths in BOTH `file://` and `skill://` (118 skill / 52 file; 170 total / 120 relocating). A `file://`-only repoint would miss the majority — Task 7.3 targets all 120 across both schemes.
- **Prompt refs ~57, not 60:** Task 3 manifest + Task 11 gate should key off the live grep set at freeze time, not the hardcoded number.
- **14 docs lack `name:`** (6 identity) → Task 4.3 `id` backfill hits the H1-fallback path more than expected.
- **Two relocated docs still `always`** (`Process-Development-Workflow`, `Process-File-Organization`) — Req 6 AC3 demotion targets.

## Deferred / Logged

- R3 triage: `Stemma*.ts` stale guidance constants (incl. 3 already-nonexistent doc paths at `StemmaErrorGuidanceSystem.ts:190-192`); `.claude/settings.local.json` allowlist. Flagged, not fixed.
