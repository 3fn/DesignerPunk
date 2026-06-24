# Task 2 Summary: Contract-Preserving Swap inside `loadConfig`

**Date**: 2026-06-24
**Purpose**: Concise summary of parent task completion
**Organization**: spec-summary
**Scope**: 118-module-resolution-coherence

## What Was Done

Replaced the broken `await import()` in `loadConfig` with the empirically-selected loader (Approach A: `tsx/cjs/api` namespaced `register` + scoped `require` + `unregister()`), so consumer `.ts` configs and their transitive relative raw-`.ts` imports now resolve at runtime. Introduced an **injectable loader seam** so the production path carries no test-environment detection; in-process jest tests inject a jest-compatible loader explicitly.

## Why It Matters

This is the production fix for the recurring config-load failure — and the genuine prerequisite that unblocks Spec 117. The seam design avoided shipping a `JEST_WORKER_ID` fork that would have re-introduced the broken resolver path conditionally into any jest environment, including consuming products'.

## Key Changes

- `src/config/ConfigLoader.ts`: Approach A swap + exported `ConfigModuleLoader` seam (`loadConfig(cwd, loadModule = defaultConfigModuleLoader)`).
- `src/config/__tests__/ConfigLoader.test.ts`: tests inject a jest-compatible loader explicitly.
- Real-`node` verification confirms the production `loadConfig` resolves a faithful consumer config.

## Impact

- ✅ The documented config-load path works (matrix green; real `loadConfig` resolves a faithful config).
- ✅ No test-environment detection in the shipped loader; production is unconditionally Approach A.
- ✅ Contract preserved: all five callers unaffected; fail-loud behavior intact.
- ✅ Unblocks Spec 117's closeout (Task 6).

---

*For detailed implementation notes, see [task-2-completion.md](../../../.kiro/specs/118-module-resolution-coherence/completion/task-2-completion.md)*
