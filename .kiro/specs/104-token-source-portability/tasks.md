# Implementation Plan: Token Source Portability

**Date**: 2026-05-09
**Spec**: 104 - Token Source Portability
**Status**: Implementation Planning
**Dependencies**: Spec 103 (Pipeline DX: Source Resolution & Validation) — complete

---

## Implementation Plan

Bottom-up: refactor token files first (removes broken dependencies), then add infrastructure (subpath export, component loader), then update init, then add the lint boundary. Each parent task is independently committable.

---

## Task List

- [x] 1. Self-Contained Token Files

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - SpacingTokens.ts has no imports from `src/constants/`
  - TypographyTokens.ts has no imports from `src/build/`
  - Token values are identical before and after refactoring
  - All existing tests pass
  
  **Primary Artifacts:**
  - `src/tokens/SpacingTokens.ts` (refactored)
  - `src/tokens/semantic/TypographyTokens.ts` (refactored)
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/104-token-source-portability/completion/task-1-completion.md`
  - Summary: `docs/specs/104-token-source-portability/task-1-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 1 Complete: Self-Contained Token Files"`
  - Verify: Check GitHub for committed changes

  - [x] 1.1 Inline `STRATEGIC_FLEXIBILITY_TOKENS` into SpacingTokens.ts
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Check which fields SpacingTokens.ts reads from the constant (confirmed: `value`, `derivation`)
    - Inline the full object with `value` and `derivation` fields for each strategic flexibility token
    - Remove the `import` from `'../constants/StrategicFlexibilityTokens'`
    - Keep original file at `src/constants/StrategicFlexibilityTokens.ts` for validator consumers
    - Verify token values unchanged via existing tests
    - _Requirements: 1.1, 1.2, 1.4_

  - [x] 1.2 Inline `UnitConverter` usage in TypographyTokens.ts
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Replace `unitConverter.applyScaleWithRounding(16, 0.88)` with `Math.round(16 * 0.88)` (= 14)
    - Remove the `import` from `'../../build/tokens/UnitConverter'`
    - Remove `const unitConverter = new UnitConverter()` instantiation
    - Verify token values unchanged via existing tests
    - _Requirements: 1.1, 1.3, 1.4_

---

- [x] 2. Component Token Loading & Subpath Export

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - `@3fn/core/build` subpath export resolves `defineComponentTokens`
  - CLI loads local component tokens when `tokenSource` is set
  - Edited primitive values propagate to component token output
  - Warning emitted when no component tokens found (not error, not silent fallback)
  - Default behavior unchanged when `tokenSource` is not set
  
  **Primary Artifacts:**
  - `src/cli/loadComponentTokens.ts` (new)
  - `src/cli/designerpunk.ts` (updated)
  - `package.json` (updated — `./build` export)
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/104-token-source-portability/completion/task-2-completion.md`
  - Summary: `docs/specs/104-token-source-portability/task-2-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 2 Complete: Component Token Loading & Subpath Export"`
  - Verify: Check GitHub for committed changes

  - [x] 2.1 Add `@3fn/core/build` subpath export
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Ada
    - Add `"./build"` entry to package.json exports map pointing at `src/build/tokens/index.ts`
    - Verify `defineComponentTokens` is exported from that barrel
    - _Requirements: 4.1, 4.2_

  - [x] 2.2 Implement `loadComponentTokens()`
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Create `src/cli/loadComponentTokens.ts` with dual-pattern discovery
    - Source 1: scan `{tokenSourceRoot}/component/` for `*.ts` files (exclude `.test.ts`, `.d.ts`)
    - Source 2: recursively scan `componentTokenDirs` for `*.tokens.ts` files (exclude `__tests__/`, `node_modules/`)
    - Use synchronous `require()` for each discovered file
    - Return count of loaded files
    - Write unit tests mocking filesystem
    - _Requirements: 3.1, 3.2, 3.3_

  - [x] 2.3 Wire component token loading into CLI
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - In `runGenerate()`: when `config.tokenSourceMode === 'local'`, call `loadComponentTokens(config)` after `resolveTokens()`
    - Emit warning if count is 0 (with searched paths and actionable guidance)
    - When `tokenSourceMode === 'package'`, skip (existing behavior unchanged)
    - Add one-line note to loading sequence: `import()` and `require()` share cache under tsx CJS registration
    - Verify: edit a primitive value locally, confirm component token output reflects the change
    - _Requirements: 3.3, 3.4, 3.5, 3.6, 3.7_

---

- [x] 3. Init Updates & Lint Boundary

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - Init copies `src/types/` alongside `src/tokens/`
  - Init applies `rewriteBuildImports` to component token files
  - `rewriteTypeImports` transform removed (dead code)
  - Generated config includes `tokenSource` and both `componentTokens` directories
  - Lint boundary test passes for all token source files
  - Lint boundary test catches forbidden imports
  
  **Primary Artifacts:**
  - `src/cli/init.ts` (updated)
  - `src/tokens/__tests__/portability-boundary.test.ts` (new)
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/104-token-source-portability/completion/task-3-completion.md`
  - Summary: `docs/specs/104-token-source-portability/task-3-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 3 Complete: Init Updates & Lint Boundary"`
  - Verify: Check GitHub for committed changes

  - [x] 3.1 Update init to copy `src/types/` and remove type transform
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Add `copyDir(src/types, dest/src/types, { exclude: ['__tests__', 'generated'] })` to init
    - Remove `transform: rewriteTypeImports` from the token source copy
    - Remove the `rewriteTypeImports` function (dead code)
    - Verify: run init in a scratch directory, confirm `src/types/` exists and token files' `../types/` imports resolve
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 5.1, 5.5, 7.1, 7.2, 7.3_

  - [x] 3.2 Split token source copy and add build import transform
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Split token source copy: `src/tokens/` (exclude `component/`, no transform) + `src/tokens/component/` (with `rewriteBuildImports` transform)
    - Add `rewriteBuildImports` transform: rewrites `../build/tokens` patterns to `@3fn/core/build`
    - Apply same transform to component source copy (`src/components/core/`)
    - Verify: run init, confirm component token files have `@3fn/core/build` imports
    - _Requirements: 4.3, 5.2, 5.3_

  - [x] 3.3 Update generated config
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Ada
    - Update `generateConfig()` to include `tokenSource: './src/tokens'`
    - Update `componentTokens` to `['./src/components/core', './src/tokens/component']`
    - _Requirements: 5.4_

  - [x] 3.4 Add lint boundary test
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Create `src/tokens/__tests__/portability-boundary.test.ts`
    - Scan `src/tokens/*.ts` and `src/tokens/semantic/*.ts` (exclude `component/`)
    - Check each file against forbidden import patterns (constants, build, components)
    - Check both `import` and `require()` patterns
    - Verify test passes after Task 1 refactoring
    - Verify test would FAIL if a forbidden import is re-added (negative test)
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [x] 3.5 Update Integration Guide
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Ada
    - Update "what init produces" to reflect `src/types/` is now scaffolded alongside `src/tokens/`
    - Note that generated config includes `tokenSource` and `componentTokens` by default
    - Restart Docs MCP or note re-index needed after file modification
    - _Requirements: 5.4_

---
