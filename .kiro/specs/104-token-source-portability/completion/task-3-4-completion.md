# Task 3.4 Completion: Add Lint Boundary Test

**Date**: 2026-05-09
**Task**: 3.4 Add lint boundary test
**Type**: Implementation
**Status**: Complete

---

## Artifacts Created

- `src/tokens/__tests__/portability-boundary.test.ts` (new) — 42 tests enforcing import boundary
- `src/tokens/semantic/ColorTokens.ts` (updated) — Removed deprecated re-exports caught by boundary
- `src/tokens/semantic/__tests__/ColorTokens.test.ts` (updated) — Tests verify re-exports are gone

---

## Implementation Details

### Approach

Created a parametric test (`test.each`) that scans all `.ts` files in `src/tokens/` and `src/tokens/semantic/` (excluding `component/`) and checks each against 9 forbidden import patterns covering `import` and `require()` from `constants/`, `build/`, and `components/`.

### Discovery During Implementation

The lint boundary immediately caught deprecated backward-compatibility re-exports in `semantic/ColorTokens.ts`:
- `export { AvatarColorTokens } from '../../components/core/Avatar-Base/avatar.tokens'`
- `export { BadgeNotificationColorTokens } from '../../components/core/Badge-Count-Notification/tokens'`
- Two deprecated helper functions using `require('../../components/...')`

All were unused (no consumers found in codebase). Removed rather than exempted.

### Negative Test

Includes a test confirming the boundary WOULD catch a forbidden import if re-added — validates the test itself works.

---

## Validation (Tier 2: Standard)

- ✅ 42 tests passing (40 file checks + 1 existence check + 1 negative test)
- ✅ Req 6.1: Files in `src/tokens/*.ts` and `src/tokens/semantic/*.ts` checked
- ✅ Req 6.2: Forbidden imports from constants/, build/, components/ caught
- ✅ Req 6.3: `src/tokens/component/` excluded from boundary
- ✅ Req 6.4: Both `import` and `require()` patterns checked
