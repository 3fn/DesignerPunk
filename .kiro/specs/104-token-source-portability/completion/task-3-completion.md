# Task 3 Completion: Init Updates & Lint Boundary

**Date**: 2026-05-09
**Task**: 3. Init Updates & Lint Boundary
**Type**: Parent
**Status**: Complete

---

## Summary

Updated init to copy `src/types/` alongside tokens, split the token source copy (primitives/semantics without transform, component/ with `rewriteBuildImports`), removed the dead `rewriteTypeImports` transform, updated the generated config, and added a lint boundary test that enforces portability. Also removed deprecated backward-compatibility re-exports from `semantic/ColorTokens.ts` that violated the boundary.

---

## Subtasks Completed

| Subtask | Description | Status |
|---------|-------------|--------|
| 3.1 | Update init to copy `src/types/` and remove type transform | ✅ Complete |
| 3.2 | Split token source copy and add build import transform | ✅ Complete |
| 3.3 | Update generated config | ✅ Complete |
| 3.4 | Add lint boundary test | ✅ Complete |

---

## Artifacts Created

- `src/cli/init.ts` (updated) — Types copy, split token copy, `rewriteBuildImports`, updated config
- `src/tokens/__tests__/portability-boundary.test.ts` (new) — 42 tests enforcing boundary
- `src/tokens/semantic/ColorTokens.ts` (updated) — Removed deprecated re-exports and helper functions
- `src/tokens/semantic/__tests__/ColorTokens.test.ts` (updated) — Tests verify re-exports are gone
- `src/cli/__tests__/init.test.ts` (updated) — Matches new split copy output format

---

## Key Decisions

1. **Removed deprecated re-exports discovered by lint boundary**: `ColorTokens.ts` had `export { AvatarColorTokens } from '../../components/core/...'` and deprecated helper functions with `require('../../components/...')`. These were unused (no consumers found) and violated the portability boundary. Removed rather than exempted.

2. **`rewriteBuildImports` regex handles any depth + specific files**: Pattern `/from\s+['"]\.\.\/(?:\.\.\/)*build\/tokens(?:\/[^'"]*)?['"]/g` catches `../build/tokens`, `../../build/tokens`, and `../../build/tokens/defineComponentTokens`.

3. **Init test updated to flexible assertions**: Rather than asserting exact file counts (which change as token files are added/removed), the test now checks for the presence of the expected labels and "existing files preserved" text.

---

## Validation

- ✅ Portability boundary test: 42/42 passing
- ✅ Init test: passing with updated assertions
- ✅ ColorTokens test: passing with updated assertions
- ✅ Full test suite: 330 suites, 8345 tests passing

### Success Criteria Verification

| Criterion | Status |
|-----------|--------|
| Init copies `src/types/` alongside `src/tokens/` | ✅ |
| Init applies `rewriteBuildImports` to component token files | ✅ |
| `rewriteTypeImports` transform removed (dead code) | ✅ |
| Generated config includes `tokenSource` and both `componentTokens` directories | ✅ |
| Lint boundary test passes for all token source files | ✅ |
| Lint boundary test catches forbidden imports (negative test) | ✅ |
