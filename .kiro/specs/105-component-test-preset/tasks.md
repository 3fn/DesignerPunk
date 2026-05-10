# Implementation Plan: Component Test Preset

**Date**: 2026-05-10
**Spec**: 105 - Component Test Preset
**Status**: Implementation Planning
**Dependencies**: None

---

## Implementation Plan

Bottom-up: create the source files first (preset, utilities, validators re-export), then wire up package exports, then update init. Each parent task is independently committable.

---

## Task List

- [x] 1. Test Utilities & Preset Source

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - `src/testing/jest-preset.ts` compiles to valid JS preset consumable by Jest
  - `src/testing/index.ts` exports all shared utilities with correct signatures
  - `src/testing/validators.ts` re-exports Stemma validator functions
  - `src/testing/style-mock.ts` compiles to `module.exports = ''`
  - All utilities have JSDoc documentation
  - Unit tests pass for all utilities
  
  **Primary Artifacts:**
  - `src/testing/jest-preset.ts` (new)
  - `src/testing/index.ts` (new)
  - `src/testing/validators.ts` (new)
  - `src/testing/style-mock.ts` (new)
  - `src/testing/__tests__/utilities.test.ts` (new)
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/105-component-test-preset/completion/task-1-completion.md`
  - Summary: `docs/specs/105-component-test-preset/task-1-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 1 Complete: Test Utilities & Preset Source"`
  - Verify: Check GitHub for committed changes

  - [x] 1.1 Create shared test utilities (`src/testing/index.ts`)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Create `src/testing/index.ts` with: `registerComponent`, `cleanupDOM`, `waitForShadowDOM`, `createComponentFixture`, `setupTokenProperties`, `cleanupTokenProperties`, `setupBlendColorProperties`, `cleanupBlendColorProperties`
    - `createComponentFixture` uses property assignment, throws clear error if `document` undefined
    - `waitForShadowDOM` timeout error includes element tag name
    - All functions have JSDoc
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 5.4_

  - [x] 1.2 Create Jest preset (`src/testing/jest-preset.ts`)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Create `src/testing/jest-preset.ts` with: jsdom default, ts-jest transform pointing at `tsconfig.test.json`, CSS moduleNameMapper using `path.resolve(__dirname, 'style-mock.js')`, testMatch patterns, testTimeout, exclusions
    - Create `src/testing/style-mock.ts` (`module.exports = ''`)
    - Verify preset compiles to valid JS after `tsc`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_

  - [x] 1.3 Create Stemma validators re-export (`src/testing/validators.ts`)
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Lina
    - Create `src/testing/validators.ts` using `export * from '../validators'` (re-exports all public functions and types from the existing validators barrel)
    - Verify imports resolve after compilation
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [x] 1.4 Write unit tests for utilities
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Create `src/testing/__tests__/utilities.test.ts`
    - Test `registerComponent`: registers once, skips on second call
    - Test `cleanupDOM`: removes children, preserves custom element registry
    - Test `waitForShadowDOM`: resolves when shadow attaches, throws on timeout
    - Test `createComponentFixture`: creates element, sets props via property, appends to DOM, cleanup removes element, throws without document
    - Test `setupTokenProperties` / `cleanupTokenProperties`: sets and removes CSS custom properties
    - _Requirements: 2.2, 2.3, 2.4, 2.5, 2.7_

---

- [x] 2. Package Exports & Build

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - `npm run build` produces `dist/testing/jest-preset.js`, `dist/testing/index.js`, `dist/testing/index.d.ts`, `dist/testing/style-mock.js`, `dist/testing/validators.js`, `dist/testing/validators.d.ts`
  - `require('@3fn/core/jest-preset')` resolves correctly
  - `require('@3fn/core/testing')` resolves correctly
  - Published package includes testing artifacts (verified via `npm pack`)
  
  **Primary Artifacts:**
  - `package.json` (updated — exports + files)
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/105-component-test-preset/completion/task-2-completion.md`
  - Summary: `docs/specs/105-component-test-preset/task-2-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 2 Complete: Package Exports & Build"`
  - Verify: Check GitHub for committed changes

  - [x] 2.1 Add subpath exports and files entries to package.json
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Add `"./jest-preset"` export with `require` condition pointing at `./dist/testing/jest-preset.js`
    - Add `"./testing"` export with `import`, `require`, and `types` conditions pointing at `dist/testing/index.js` and `dist/testing/index.d.ts`
    - Add specific `files` entries: `"dist/testing/jest-preset.js"`, `"dist/testing/jest-preset.d.ts"`, `"dist/testing/index.js"`, `"dist/testing/index.d.ts"`, `"dist/testing/style-mock.js"`, `"dist/testing/validators.js"`, `"dist/testing/validators.d.ts"`
    - Do NOT use blanket `"dist/"` — maintain granular file patterns
    - Run `npm run build` and verify `dist/testing/` artifacts exist
    - Run `npm pack --dry-run` and verify testing artifacts are included
    - _Requirements: 1.1, 1.2, 2.1, 2.8, 3.1_

---

- [x] 3. Init Scaffolding & Documentation

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - `npx designerpunk init` creates `jest.config.js` and `tsconfig.test.json`
  - Console output lists 4 required devDependencies
  - Integration Guide has "Running Component Tests" section
  - A product repo can run `npx jest` after following the documented steps
  
  **Primary Artifacts:**
  - `src/cli/init.ts` (updated)
  - `.kiro/steering/DesignerPunk-Integration-Guide.md` (updated)
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/105-component-test-preset/completion/task-3-completion.md`
  - Summary: `docs/specs/105-component-test-preset/task-3-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 3 Complete: Init Scaffolding & Documentation"`
  - Verify: Check GitHub for committed changes

  - [x] 3.1 Update init to scaffold test config files
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Add `createFileIfNotExists` for `jest.config.js` (one-line spread from `@3fn/core/jest-preset`)
    - Add `createFileIfNotExists` for `tsconfig.test.json` (with required compiler options: target ES2020, module commonjs, strict, esModuleInterop, skipLibCheck, resolveJsonModule, downlevelIteration, types: jest+node)
    - Update "Next steps" console output to include `npm install --save-dev jest @types/jest ts-jest jest-environment-jsdom` and `npx jest`
    - Verify: run init in scratch directory, confirm files created
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [x] 3.2 Update Integration Guide
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Lina
    - Add "Running Component Tests" section after "Build Your Product"
    - Document: required devDependencies (4 packages), jest.config.js setup, tsconfig.test.json purpose, `npx jest` command
    - Include minimal working test example (create fixture, assert, cleanup)
    - Note that `jest-environment-jsdom` is required for web component DOM tests
    - Note stale source scenario: re-run init after updating `@3fn/core`
    - _Requirements: 5.1, 5.2, 5.3_

---
