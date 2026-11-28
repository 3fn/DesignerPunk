# Issue: `getTypographyRecommendation('ui')` recommends `typography.label`, a token that does not exist

**Date**: 2026-11-28
**Owner**: Ada
**Trigger**: `release:16.4.0:phase-1` — this is the release by which the fix lands. The fixing PR is mine, in `src/tokens/`, and closes this record under rule 5.
**Class**: P3 improvement · defect *(set 2026-11-28, Ada, owner, rule 12.)*
- **Why P3**: an exported helper returns a name that resolves to nothing. No production code calls it (VERIFIED: `git grep getTypographyRecommendation` outside tests and spec history finds only its definition). The application MCP serves the real token list. So the only reader misled is a caller of this function, of which there is none in the repo.
- **Re-class reading**: if a served surface (the MCP, a governed doc, a generated file) is found repeating the name, this becomes P2 obligation (guard) or P0 false-claim, by what that surface claims.
**Source**: `[ADA R3]` in `.kiro/specs/132-native-components-in-app/feedback/design-outline.md` L1757 (found while listing P-13's tokens); `[THURGOOD R22]`, ibid., item (d).

---

## The defect (VERIFIED at `8f05f76b8`)

- **Where**: `src/tokens/semantic/index.ts` L569, inside `getTypographyRecommendation`'s `ui` list (L566–570). The list is `'typography.buttonMd'`, `'typography.input'`, `'typography.label'`.
- **What is wrong**: no `typography.label` exists. The label family is `labelXs`, `labelSm`, `labelMd`, `labelMdFloat` and `labelLg` (`src/tokens/semantic/TypographyTokens.ts`).
- **Since**: the line dates from `3af31fa3c` (2025-10-04, mathematical-token-system task 5.1.6), before the label family was split by size.
- **Why it matters downstream**: the file ships in the package (`files` includes `src/tokens/**`), and `init` copies it into a local-mode adopter's `src/tokens/` tree. A fix here does not reach adopters' existing copies.
- **Why no test caught it**: the existing test asserts the wrong name. `src/tokens/semantic/__tests__/SemanticTokenIntegration.test.ts` L355 expects `toContain('typography.label')`, so the test holds the defect in place. Nothing checks that a recommended name resolves.

## The fix (proposed; no new token)

1. Replace `'typography.label'` with `'typography.labelMd'`, the default label size, in the helper and in the test at L355.
2. Add a test that every name every recommendation helper returns resolves through `getSemanticToken`. A known-bad case, a fake name, must fail.

*Signed: Ada, 2026-11-28.*
