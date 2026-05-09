# Task 3.1 Completion: Update Init to Copy `src/types/` and Remove Type Transform

**Date**: 2026-05-09
**Task**: 3.1 Update init to copy `src/types/` and remove type transform
**Type**: Implementation
**Status**: Complete

---

## Artifacts Created

- `src/cli/init.ts` (updated) — Added `src/types/` copy, removed `rewriteTypeImports` function and its usage

---

## Implementation Details

### Approach

Added a `copyDir` call for `src/types/` (excluding `__tests__` and `generated`) before the token source copy. Removed the `transform: rewriteTypeImports` option from the token source copy and deleted the `rewriteTypeImports` function entirely — with `src/types/` shipped alongside tokens, relative `../types/` imports resolve naturally.

---

## Validation (Tier 2: Standard)

- ✅ Req 2.1: Init copies `src/types/` to product repo
- ✅ Req 2.2: Types directory contains all needed type files
- ✅ Req 2.3: Relative `../types/` imports resolve in both core and product repos
- ✅ Req 2.4: Directory structure preserved (src/types/ sibling to src/tokens/)
- ✅ Req 5.1: Type import rewrite transform removed
- ✅ Req 5.5: Dead `rewriteTypeImports` function removed
- ✅ Req 7.1–7.3: Init copies types with merge-mode (existing files preserved)
