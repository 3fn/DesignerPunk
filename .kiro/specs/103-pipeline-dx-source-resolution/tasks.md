# Implementation Plan: Pipeline DX — Source Resolution & Validation

**Date**: 2026-05-09
**Spec**: 103 - Pipeline DX: Source Resolution & Validation
**Status**: Implementation Planning
**Dependencies**: Spec 094 (Portable Pipeline and Theme Registry) — complete

---

## Implementation Plan

The implementation follows a bottom-up approach: config layer first, then token resolution, then generator refactor, then CLI commands. Each task builds on the previous, with the `ProductRepoSimulation` tests serving as the regression gate.

---

## Task List

- [x] 1. Config & Token Resolution Foundation

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - `tokenSource` config option accepted and resolved by ConfigLoader
  - `resolveTokens()` loads tokens from either package or local path
  - Barrel contract verification produces actionable errors for misconfiguration
  - Existing pipeline behavior unchanged when `tokenSource` is omitted
  
  **Primary Artifacts:**
  - `src/config/defineConfig.ts` (updated)
  - `src/config/ConfigLoader.ts` (updated)
  - `src/cli/resolveTokens.ts` (new)
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/103-pipeline-dx-source-resolution/completion/task-1-completion.md`
  - Summary: `docs/specs/103-pipeline-dx-source-resolution/task-1-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 1 Complete: Config & Token Resolution Foundation"`
  - Verify: Check GitHub for committed changes

  - [x] 1.1 Add `tokenSource` to config interface and ConfigLoader
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Add `tokenSource?: string` field to `DesignerPunkConfig` interface with TSDoc
    - Update `ConfigLoader.loadConfig()` to resolve `tokenSource` relative to config dir
    - Add `tokenSourceMode: 'local' | 'package'` to `ResolvedConfig`
    - Replace current `tokenSourceRoot = cwd` with proper resolution (configured path or `path.resolve(__dirname, '../../tokens')`)
    - Update existing ConfigLoader tests to cover new field
    - _Requirements: 1.1, 1.2, 1.3, 7.1, 7.3_

  - [x] 1.2 Create `resolveTokens()` with barrel contract verification
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Create `src/cli/resolveTokens.ts` with `TokenInput` interface and `resolveTokens()` function
    - Implement `verifyBarrelContract()` with specific error messages for: missing path, missing `getAllPrimitiveTokens`, missing semantic subdirectory, missing `getAllSemanticTokens`
    - Use dynamic `import()` for token loading (tsx handles TypeScript resolution)
    - Smoke test that `import(directoryPath)` resolves to `index.ts` under tsx
    - Write unit tests mocking dynamic imports to verify contract checking and error messages
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

---

- [x] 2. Generator DI Refactor & CLI Update

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - `generateTokenFiles()` accepts `TokenInput` and `ResolvedConfig` as parameters
  - Legacy signature removed (no overload)
  - All 4 call sites updated
  - Pipeline output shows accurate token source path with `(local)` / `(package)` annotation
  - `ProductRepoSimulation` tests pass with identical output
  
  **Primary Artifacts:**
  - `src/generators/generateTokenFiles.ts` (refactored)
  - `src/cli/designerpunk.ts` (updated)
  - `scripts/generate-platform-tokens.ts` (updated)
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/103-pipeline-dx-source-resolution/completion/task-2-completion.md`
  - Summary: `docs/specs/103-pipeline-dx-source-resolution/task-2-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 2 Complete: Generator DI Refactor & CLI Update"`
  - Verify: Check GitHub for committed changes

  - [x] 2.1 Refactor `generateTokenFiles()` signature
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Change signature from `generateTokenFiles(outputDir: string, config?: ResolvedConfig)` to `generateTokenFiles(tokens: TokenInput, config: ResolvedConfig)`
    - Remove static imports of `getAllPrimitiveTokens` from `'../tokens'` and `getAllSemanticTokens` from `'../tokens/semantic'`
    - Replace usages with `tokens.primitiveTokens` and `tokens.semanticTokens`
    - Remove `if (require.main === module)` self-invocation block at end of file
    - Add code comment on remaining theme override static imports explaining they're intentionally not affected by `tokenSource`
    - _Requirements: 3.1, 3.2, 3.4, 3.5_

  - [x] 2.2 Update all call sites
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Update `src/cli/designerpunk.ts`: use `resolveTokens(config)` then pass result to `generateTokenFiles(tokens, config)`
    - Update `src/generators/__tests__/ProductRepoSimulation.test.ts` (4 calls): import `getAllPrimitiveTokens` and `getAllSemanticTokens` explicitly, construct `TokenInput`, pass to new signature
    - Update `scripts/generate-platform-tokens.ts`: call `loadConfig(process.cwd())` then `resolveTokens(config)` then `generateTokenFiles(tokens, config)` — make it a thin wrapper matching CLI behavior
    - Verify all tests pass with `npm test`
    - _Requirements: 3.3, 3.4_

  - [x] 2.3 Update CLI output for transparent source display
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Replace "Source:" line in `runGenerate()` with "Tokens:" line showing `path.relative(cwd, config.tokenSourceRoot)` and `(${config.tokenSourceMode})` annotation
    - Ensure relative path display (not absolute) for readability
    - Verify output matches design spec format
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

---

- [x] 3. Validate Command

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - `npx designerpunk validate` runs all 4 checks against active token source
  - Exit code 0 on success, non-zero on failure
  - Output shows per-check results with specific token names on failure
  - Command registered in CLI router and help text
  - Reuses existing validators (no duplicated validation logic)
  
  **Primary Artifacts:**
  - `src/cli/validate.ts` (new)
  - `src/cli/designerpunk.ts` (updated — command registration)
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/103-pipeline-dx-source-resolution/completion/task-3-completion.md`
  - Summary: `docs/specs/103-pipeline-dx-source-resolution/task-3-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 3 Complete: Validate Command"`
  - Verify: Check GitHub for committed changes

  - [x] 3.1 Implement `runValidate()` with 4 validation checks
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Create `src/cli/validate.ts` with `runValidate()` function
    - Implement `validateRequiredFields()`: iterate primitives, check all `PrimitiveToken` required fields are non-null/non-empty (new helper, trivial)
    - Implement `validateFamilyMembership()`: build `PrimitiveTokenRegistry` and `SemanticTokenRegistry` from token arrays — registration validates uniqueness and category (reuses registry logic)
    - Implement `validateSemanticReferences()`: call `SemanticTokenValidator.validateSemanticReferences(semanticTokens, primitiveTokens)` (pure reuse)
    - Implement `validateMathematicalRelationships()`: call `MathematicalRelationshipParser.parse()` on each primitive's `mathematicalRelationship`, check `isValid` (pure reuse)
    - Implement `reportResults()`: human-readable output with emoji indicators matching pipeline style
    - Set `process.exit(0)` on all pass, `process.exit(1)` on any failure
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9_

  - [x] 3.2 Register `validate` command in CLI and update help
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Ada
    - Add `case 'validate': await runValidate(); break;` to CLI switch in `designerpunk.ts`
    - Add `validate` to `printHelp()` output with description: "Validate token definitions against active source"
    - Verify `npx designerpunk --help` lists the new command
    - _Requirements: 6.1, 6.2, 6.3, 5.10, 7.2_

---
