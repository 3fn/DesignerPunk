# Implementation Plan: Generation Pipeline Data Flow Restructure

**Date**: 2026-06-05
**Spec**: 114 - Generation Pipeline Data Flow Restructure
**Status**: Implementation Planning
**Dependencies**: Spec 104 (complete), Spec 109 (complete), Spec 103 (complete)

---

## Implementation Plan

Implementation follows a bottom-up dependency order: first restructure the data flow interfaces (eliminate barrel imports, make input required), then add the new capabilities (staleness detection, pipeline independence, `--product-only`), then update callers and verify backward compatibility.

---

## Task List

- [x] 1. Restructure generateTokenIndex Data Flow

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - `generateTokenIndex` accepts required `TokenIndexInput` with all four fields
  - No static barrel imports of token data remain in `generateTokenIndex.ts`
  - No `ThemeRegistry` instantiation inside `generateTokenIndex.ts`
  - All existing tests pass with updated interface
  - `scripts/generate-token-index.ts` compiles and produces correct output

  **Primary Artifacts:**
  - `src/generators/generateTokenIndex.ts` (modified)
  - `src/cli/themeVarying.ts` (new)
  - `scripts/generate-token-index.ts` (modified)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/114-generation-pipeline-data-flow/completion/task-1-completion.md`
  - Summary: `docs/specs/114-generation-pipeline-data-flow/task-1-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 1 Complete: Restructure generateTokenIndex Data Flow"`
  - Verify: Check GitHub for committed changes

  - [x] 1.1 Remove barrel imports and make TokenIndexInput required
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Remove `import { getAllPrimitiveTokens } from '../tokens'`
    - Remove `import { getAllSemanticTokens } from '../tokens/semantic'`
    - Remove `import { ComponentTokenRegistry } from '../registries/ComponentTokenRegistry'`
    - Remove `import { ThemeRegistry }` and theme override imports
    - Add `componentTokens: RegisteredComponentToken[]` to `TokenIndexInput`
    - Add `themeVaryingTokens: Set<string>` to `TokenIndexInput`
    - Make `input` parameter non-optional (remove `?`)
    - Replace internal `getAllPrimitiveTokens()` fallback with `input.primitiveTokens`
    - Replace internal `getAllSemanticTokens()` fallback with `input.semanticTokens`
    - Replace `ComponentTokenRegistry.getAll()` with `input.componentTokens`
    - Replace `themeRegistry.getThemeVaryingTokens()` with `input.themeVaryingTokens`
    - _Requirements: R1 AC1-3, R7 AC1+3_

  - [x] 1.2 Create computeThemeVaryingTokens utility
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Create `src/cli/themeVarying.ts`
    - Implement `computeThemeVaryingTokens(config, semanticTokens, primitiveTokens)` that:
      - Registers themes from config and collects explicit override keys
      - Computes base light/dark differences by comparing primitive-referenced values (from `primitiveTokens`) for color semantic tokens
      - Returns union of override keys + base-different tokens as `Set<string>`
    - Migrate override-key logic from generateTokenIndex's ThemeRegistry usage
    - Migrate base light/dark diff logic from `generateTokenFiles.ts` (lines 159-168) using primitive-reference-level comparison (no full rgba resolution needed)
    - Write unit tests in `src/cli/__tests__/themeVarying.test.ts`:
      - Tokens with explicit overrides are included
      - Color tokens with different light/dark primitive values are included even without explicit overrides
      - Non-color tokens without overrides are NOT included
    - _Requirements: R7 AC1-2_

  - [x] 1.3 Update scripts/generate-token-index.ts
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Retain existing side-effect imports for component token files (they populate the registry)
    - Add `import { ComponentTokenRegistry } from '../src/registries/ComponentTokenRegistry'`
    - Import `getAllPrimitiveTokens`, `getAllSemanticTokens` from package barrels (allowed — this IS the package)
    - Compute `themeVaryingTokens` using same logic as CLI
    - Pass all four fields to `generateTokenIndex`: primitives, semantics, `ComponentTokenRegistry.getAll()`, themeVaryingTokens
    - Verify script compiles and produces correct YAML output
    - _Requirements: R8 AC1-3_

  - [x] 1.4 Update existing generateTokenIndex tests
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Update test calls to pass required `TokenIndexInput`
    - Add assertions verifying output uses provided data (not defaults)
    - Add test for `themeVaryingTokens` being reflected in output
    - Add test for `componentTokens` being reflected in output
    - _Requirements: R1 AC4_

---

- [x] 2. Fix Component Token Registration

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - `loadComponentTokens` returns `RegisteredComponentToken[]`
  - No double-registration error in repos with `tokenSource` and local component tokens
  - `allowOverwrite: true` used only when `tokenSourceMode === 'local'`
  - Side-effect imports from `generateTokenIndex` no longer trigger registration conflicts

  **Primary Artifacts:**
  - `src/cli/loadComponentTokens.ts` (modified)
  - `src/cli/__tests__/loadComponentTokens.test.ts` (updated)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/114-generation-pipeline-data-flow/completion/task-2-completion.md`
  - Summary: `docs/specs/114-generation-pipeline-data-flow/task-2-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 2 Complete: Fix Component Token Registration"`
  - Verify: Check GitHub for committed changes

  - [x] 2.1 Modify loadComponentTokens to return RegisteredComponentToken[] with allowOverwrite
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Change return type from `number` to `RegisteredComponentToken[]`
    - Add `allowOverwrite: true` to registration options when `config.tokenSourceMode === 'local'`
    - Call `ComponentTokenRegistry.getAll()` at end and return result
    - Update CLI caller in `designerpunk.ts` to use new return type (store result for Task 3)
    - Update `console.warn` to use `.length` of returned array instead of count variable
    - _Requirements: R2 AC1-2, R9 AC1_

  - [x] 2.2 Update loadComponentTokens tests
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Test returns `RegisteredComponentToken[]` (not number)
    - Test uses `allowOverwrite: true` when tokenSourceMode is 'local'
    - Test does NOT use allowOverwrite when tokenSourceMode is 'package'
    - Test no double-registration error when same token loaded from package + local
    - _Requirements: R2 AC1-3_

---

- [x] 3. Implement Pipeline Independence and CLI Restructure

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - System and product token generation in independent try/catch blocks
  - Product output written to disk even when system fails
  - CLI exits 1 on any failure with structured ✅/❌ output
  - `--product-only` recommendation shown on system failure
  - `generateTokenIndex` called with full TokenIndexInput from CLI
  - Redundant `generateTokenIndex` call removed from `generateProductTokens`

  **Primary Artifacts:**
  - `src/cli/designerpunk.ts` (modified — `runGenerate` function)
  - `src/cli/generateProductTokens.ts` (modified — remove generateTokenIndex call)
  - `src/cli/__tests__/pipeline-independence.test.ts` (new)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/114-generation-pipeline-data-flow/completion/task-3-completion.md`
  - Summary: `docs/specs/114-generation-pipeline-data-flow/task-3-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 3 Complete: Pipeline Independence and CLI Restructure"`
  - Verify: Check GitHub for committed changes

  - [x] 3.1 Remove redundant generateTokenIndex from generateProductTokens
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Remove `generateTokenIndex` call (~line 29) from `src/cli/generateProductTokens.ts`
    - Remove the `generateTokenIndex` import if no longer used
    - Verify `generateProductTokens` still works correctly (reads existing token-index from disk)
    - _Requirements: R6 AC1-2_

  - [x] 3.2 Restructure runGenerate with independent error boundaries
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Ada
    - Wrap system pipeline (generateTokenFiles + generateTokenIndex) in try/catch
    - Wrap product pipeline (staleness + generateProductTokens) in separate try/catch
    - Pass full `TokenIndexInput` to `generateTokenIndex` (primitives, semantics, componentTokens, themeVaryingTokens)
    - Track `systemFailed` / `productFailed` booleans
    - Output structured status (✅/❌) per stage
    - Recommend `--product-only` when system fails but product could succeed
    - Exit 1 if either failed, exit 0 only if all succeeded
    - _Requirements: R3 AC1-5, R6 AC2, R9 AC2_

  - [x] 3.3 Write pipeline-independence integration tests
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Test: system failure does not prevent product generation
    - Test: product output files written when system fails
    - Test: exit code 1 when system fails
    - Test: exit code 1 when product fails
    - Test: exit code 0 when all succeed
    - Test: structured output includes ✅/❌ per stage
    - Test: `--product-only` recommendation shown on system failure
    - _Requirements: R3 AC1-5_

---

- [x] 4. Implement Staleness Detection and --product-only

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Adding a new YAML file and running `generate` produces updated output
  - Up-to-date products are skipped with logged message
  - `--force` always regenerates
  - `--product-only` skips all system processing
  - Staleness detection never silently skips

  **Primary Artifacts:**
  - `src/cli/staleness.ts` (new)
  - `src/cli/__tests__/staleness.test.ts` (new)
  - `src/cli/__tests__/product-only.test.ts` (new)
  - `src/cli/designerpunk.ts` (modified — add --product-only branch and staleness)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/114-generation-pipeline-data-flow/completion/task-4-completion.md`
  - Summary: `docs/specs/114-generation-pipeline-data-flow/task-4-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 4 Complete: Staleness Detection and --product-only"`
  - Verify: Check GitHub for committed changes

  - [x] 4.1 Implement isProductTokenStale
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Create `src/cli/staleness.ts`
    - Implement `isProductTokenStale(config)`:
      - Return true if `--force` flag present
      - Return true if any output file missing
      - Get oldest output mtime across all platform files
      - Glob `**/*.yaml` in productTokensDir
      - Return true if any YAML mtime > oldest output mtime
      - Return false otherwise
    - Implement `getProductTokenOutputPaths(config)` helper
    - Write unit tests in `src/cli/__tests__/staleness.test.ts`
    - _Requirements: R4 AC1-5_

  - [x] 4.2 Implement --product-only CLI flag
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Add `--product-only` detection in `runGenerate`
    - When present: skip resolveTokens, loadComponentTokens, generateTokenFiles, generateTokenIndex
    - Call staleness check → generateProductTokens directly
    - Exit code based only on product generation result
    - Write integration tests in `src/cli/__tests__/product-only.test.ts`:
      - `--product-only` skips system token resolution
      - `--product-only` uses existing token-index on disk
      - `--product-only` applies staleness detection
      - `--product-only` respects `--force` flag
      - `--product-only` when `token-index/` missing → clear error directing user to run full `generate` first
    - _Requirements: R5 AC1-5_

  - [x] 4.3 Integrate staleness into main pipeline
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - In the product pipeline try/catch, call `isProductTokenStale` before `generateProductTokens`
    - If stale: regenerate, log generation output
    - If up-to-date: log `⏭ Product tokens up-to-date (source unchanged since <timestamp>)`
    - If `--force`: log `🔄 Product tokens regenerated (--force)`
    - Ensure staleness detection applies in both full-pipeline and `--product-only` modes
    - _Requirements: R4 AC1-5, R5 AC5_

  - [x] 4.4 Update CLI help and Integration Guide
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Ada
    - Add `--product-only` and `--force` to `printHelp()` in `src/cli/designerpunk.ts`
    - Update `.kiro/steering/DesignerPunk-Integration-Guide.md` CLI reference table to include new flags
    - Update "Generate Tokens" section to mention `--product-only` and `--force` options
    - _Requirements: R4 AC4, R5 AC1_

---

- [ ] 5. Backward Compatibility Verification

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Repos without `tokenSource` work identically to before
  - Repos without `productTokens` skip product pipeline entirely
  - Full test suite passes
  - No regressions in existing pipeline behavior

  **Primary Artifacts:**
  - `src/cli/__tests__/backward-compat.test.ts` (new)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/114-generation-pipeline-data-flow/completion/task-5-completion.md`
  - Summary: `docs/specs/114-generation-pipeline-data-flow/task-5-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 5 Complete: Backward Compatibility Verification"`
  - Verify: Check GitHub for committed changes

  - [ ] 5.1 Write backward compatibility regression tests
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Test: no `tokenSource` config → standard registration behavior (no allowOverwrite)
    - Test: no `tokenSource` config → generateTokenIndex still receives explicit data
    - Test: no `productTokens` config → product pipeline skipped entirely
    - Test: full pipeline produces identical output to pre-restructure for default configs
    - _Requirements: R9 AC1-3_

  - [ ] 5.2 Run full test suite and fix any regressions
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Run `npm test` — all existing tests must pass
    - Fix any test failures caused by the interface changes
    - Verify `scripts/generate-token-index.ts` produces expected YAML
    - Verify no TypeScript compilation errors across the project
    - _Requirements: R8 AC3, R9 AC2_
