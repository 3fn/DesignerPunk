# Task 4 Summary: Component-Token Loading Gated on Source Presence (R4) + dist ComponentTokens (N2)

**Date**: 2026-06-24
**Purpose**: Concise summary of parent task completion
**Organization**: spec-summary
**Scope**: 117-token-index-generation-integrity

## What Was Done

Removed the `tokenSourceMode === 'local'` gating from component-token loading (two gates on the same wrong axis — the call site and `allowOverwrite`), keying it on **source presence** instead. The shipped config is package mode, so the gates had been silently dropping the entire component tier under the documented `generate`.

## Why It Matters

Same systemic failure as R3/R5: a mode flag conflated with a separate concern (where component tokens are authored vs whether they should be indexed), producing a silent drop with no error signal. The fix not only reproduces the committed component set but **recovered 6 component tokens** (`inputcheckbox.box.*`, `inputradio.box.*`) the bug had been dropping — proving the committed "baseline" was itself a product of the bug.

## Key Changes

- `src/cli/designerpunk.ts` — removed the call-site `local` gate (load + warn now fire on source presence, all modes)
- `src/cli/loadComponentTokens.ts` — `allowOverwrite` un-gated from mode (travels with the loader)
- `token-index/components.yaml` — corrected 33-token baseline (27 preserved value-identical + 6 recovered)
- `dist/ComponentTokens.{web,ios,android}` (gitignored) — N2 populated, no longer empty

## Impact

- ✅ **R4**: component tokens load regardless of `tokenSourceMode`; gate keys on source presence
- ✅ **N2**: dist ComponentTokens populated across web/iOS/Android (0 → 33)
- ✅ **Baseline corrected** (ratified by Peter): committed 27 were stale-wrong; 6 recovered tokens are source-backed since 2026-04-03, predating the stale 2026-06-11 regen — fresh (33) is correct
- ✅ Full suite **8955 tests** + `tsc` green (re-verified in main loop); local-mode unregressed
- ↪ Task 5.2 (Thurgood) — package-mode consumer fixture + AC3 warning test (reachability verified here); Task 5.3 re-diff will see committed == fresh == 33
- 🔗 Sibling-but-unrelated: the `validate` math-relationship parser false-fails (`.kiro/issues/2026-06-24-mathematical-relationship-parser-validation-gaps.md`) — same "untrustworthy token-pipeline signal" family, opposite symptom (loud false-fail vs silent drop), different subsystem; correctly its own Ada-owned issue
