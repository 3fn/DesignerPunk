# Task 2.1 Completion: Add `@3fn/core/build` Subpath Export

**Date**: 2026-05-09
**Task**: 2.1 Add `@3fn/core/build` subpath export
**Type**: Setup
**Status**: Complete

---

## Artifacts Created

- `package.json` (updated) — `"./build"` subpath export added

---

## Implementation Details

Added `"./build"` entry to the package.json exports map pointing at `src/build/tokens/index.ts`. This barrel already exports `defineComponentTokens` (and other build utilities). Product repos can now `import { defineComponentTokens } from '@3fn/core/build'`.

---

## Validation (Tier 1: Minimal)

- ✅ `defineComponentTokens` resolves as a function from the barrel
- ✅ Req 4.1: Package exports `defineComponentTokens` via `@3fn/core/build`
- ✅ Req 4.2: Import resolves correctly
