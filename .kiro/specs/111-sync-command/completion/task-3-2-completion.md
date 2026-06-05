# Task 3.2 Completion: Implement Prompter

**Date**: 2026-06-05
**Task**: 3.2 Implement Prompter with interactive conflict resolution
**Type**: Implementation
**Status**: Complete

---

## Changes

| File | Change |
|------|--------|
| `src/cli/sync/Prompter.ts` | **Created** — `resolveConflicts()` with s/o/d prompts, unified diff display with ANSI colors, `confirmSourceUpdates()` with Y/n/list |
| `src/cli/__tests__/Prompter.test.ts` | **Created** — 10 unit tests covering skip, overwrite, diff re-prompt, invalid input, full words, batch confirm, list, decline |

## Design Decisions

**Accepting rl as parameter**: Enables testing by injecting a mock readline interface. When not provided, creates its own (production path).

**diff library via require()**: Uses `require('diff')` at runtime for the unified diff display. Falls back to line-count comparison if the library is unavailable. This avoids TypeScript import issues since `diff` doesn't ship types.

**Binary detection**: Simple null-byte check. Binary files get "diff not available" message — only skip/overwrite offered (per spec).

**Re-prompt after diff**: The while loop in `promptConflict` handles the diff→re-prompt flow naturally.

## Validation

- Prompter tests: 10/10 passing
- Requirements covered: R5 AC1 (s/o/d prompt), R5 AC2 (unified diff with ANSI), R5 AC3 (re-prompt after diff), R5 AC4 (skip preserves), R5 AC5 (overwrite records), R6 AC3 (non-TTY guard handled at orchestration layer)
