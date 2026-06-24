# Task 1 Summary: Empirical Loader Selection

**Date**: 2026-06-24
**Purpose**: Concise summary of parent task completion
**Organization**: spec-summary
**Scope**: 118-module-resolution-coherence

## What Was Done

Built a resolver-faithful test harness and empirically selected the TS-aware loader for `loadConfig` by exercising three candidate approaches against the failing resolution matrix, in both ESM- and CJS-authored config directions. **Approach A** (`tsx/cjs/api` namespaced `register` + scoped `require` + `unregister()`) was selected; **approach B (`tsImport`) failed** all rows from the CommonJS host; jiti was not needed.

## Why It Matters

The recurring `.ts`-config-resolution bug had been "fixed" twice by assumption and regressed both times. This task decided the loader on **evidence, not assumption** — and the evidence overturned the design's initial lean, catching a non-working approach *before* it shipped.

## Key Changes

- New resolution-matrix harness (`src/config/__resolution-matrix__/`, real `node` subprocesses, not jest) + `npm run test:resolution-matrix`.
- Decision record `findings/loader-selection.md`: approach A selected, with accept-criteria evidence and the OQ-1 (CJS-host/ESM-loader boundary) result.
- No production code changed yet — the permanent swap into `loadConfig` is Task 2.

## Impact

- ✅ Loader choice settled empirically (A); OQ-1 resolved.
- ✅ A non-working approach (B from a CJS host) was caught before implementation.
- ✅ A's known cost (global mutation + mandatory `unregister()`) is documented and will be guarded by the Task-3 subprocess guard.

---

*For detailed implementation notes, see [task-1-completion.md](../../../.kiro/specs/118-module-resolution-coherence/completion/task-1-completion.md)*
