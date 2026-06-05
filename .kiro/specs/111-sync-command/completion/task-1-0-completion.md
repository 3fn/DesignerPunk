# Task 1.0 Completion: Remove duplicate avatar-sizing.tokens.ts from package

**Date**: 2026-06-05
**Task**: 1.0 Remove duplicate avatar-sizing.tokens.ts from package
**Type**: Setup
**Status**: Complete

---

## Changes

| File | Change |
|------|--------|
| `src/components/core/Avatar-Base/avatar-sizing.tokens.ts` | **Deleted** |
| `src/components/core/Avatar-Base/avatar.tokens.ts` | Inlined `AvatarSizingTokens` definition (was previously imported from the deleted file). Added `sizingTokens` import from SizingTokens. |
| `src/components/core/Avatar-Base/platforms/web/Avatar.web.ts` | Updated import path: `../../avatar-sizing.tokens` → `../../avatar.tokens` |

## Rationale

`avatar-sizing.tokens.ts` was an architectural anomaly — no other component splits token definitions across multiple files. Its existence caused:
- Potential double-registration in consumer repos (separate discovery paths)
- A file that sync would reintroduce to consumers who'd already deleted it to fix the conflict

With the tokens inlined, Avatar follows the same single-file pattern as all other components.

## Validation

- TypeScript compiles clean
- Full test suite: 8527/8527 passing (346 suites)
- No remaining references to the deleted file
- `AvatarSizingTokens` export still available from `avatar.tokens.ts` (same public API)
