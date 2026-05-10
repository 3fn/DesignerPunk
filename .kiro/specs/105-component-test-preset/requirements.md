# Requirements Document: Component Test Preset

**Date**: 2026-05-10
**Spec**: 105 - Component Test Preset
**Status**: Requirements Phase
**Dependencies**: None (uses existing package infrastructure)

---

## Introduction

Product repos consuming `@3fn/core` can edit component source but cannot run component tests. This spec ships a Jest preset, shared test utilities, and Stemma validators as package exports so product repos can validate component behavior with minimal setup.

**Architectural principle**: Centralize test configuration in the package. Product repos extend the preset with one line and install 4 devDependencies. No test infrastructure reinvention per repo.

---

## Requirements

### Requirement 1: Jest Preset Export

**User Story**: As a product developer, I want a shareable Jest configuration from `@3fn/core`, so that I can run component tests without configuring Jest from scratch.

#### Acceptance Criteria

1. The package SHALL export a Jest preset via the `@3fn/core/jest-preset` subpath.
2. The preset SHALL be a pre-compiled JavaScript file in `dist/` (Jest does not natively load TypeScript config files).
3. The preset SHALL configure: `ts-jest` transform, `testMatch` patterns for `__tests__/**/*.test.ts`, CSS module mocking via `moduleNameMapper`, `testTimeout: 10000`, and standard exclusions (`node_modules/`, `dist/`, `.d.ts`).
4. The preset SHALL default `testEnvironment` to `jsdom` (product repos write predominantly DOM-based component tests).
5. The preset's `moduleNameMapper` for `.css` files SHALL resolve the mock via a stable path within the package (using `require.resolve` or `path.resolve` relative to the preset file), not a consumer-relative path.
6. A product repo's `jest.config.js` SHALL work with a single spread: `module.exports = { ...require('@3fn/core/jest-preset'), roots: ['<rootDir>/src'] };`
7. The preset SHALL configure ts-jest to use `tsconfig.test.json` as its TypeScript config source (e.g., `transform: { '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }] }`).

---

### Requirement 2: Shared Test Utilities Export

**User Story**: As a component developer, I want shared test utilities from `@3fn/core`, so that I can set up DOM fixtures, register custom elements, and clean up tests without reimplementing common patterns.

#### Acceptance Criteria

1. The package SHALL export test utilities via the `@3fn/core/testing` subpath.
2. The export SHALL include `registerComponent(tagName: string, ComponentClass: CustomElementConstructor)` — safe custom element registration that skips if already defined.
3. The export SHALL include `createComponentFixture(tagName: string, props?: Record<string, any>)` — creates element, sets props, appends to DOM, returns element and cleanup function. SHALL throw a clear error if `document` is undefined (missing jsdom environment).
4. The export SHALL include `cleanupDOM()` — safely removes test DOM nodes without destroying the custom element registry.
5. The export SHALL include `setupTokenProperties(props: Record<string, string>)` / `cleanupTokenProperties(props: Record<string, string>)` — sets/removes arbitrary CSS custom properties on `document.documentElement`.
6. The export SHALL include `setupBlendColorProperties()` / `cleanupBlendColorProperties()` as convenience wrappers over `setupTokenProperties` for the common blend utility case.
7. The export SHALL include `waitForShadowDOM(element: HTMLElement, timeout?: number): Promise<void>` — waits for Shadow DOM attachment to complete (required for async component initialization in jsdom).
8. The `@3fn/core/testing` export SHALL be pre-compiled JavaScript with TypeScript declarations in `dist/testing/`.

---

### Requirement 3: Stemma Validators Export

**User Story**: As a component developer, I want access to Stemma validation utilities, so that I can run `.stemma.test.ts` pattern tests (naming, token usage, accessibility) against locally modified components.

#### Acceptance Criteria

1. The package SHALL export Stemma validators via `@3fn/core/testing` (bundled with test utilities) or a dedicated `@3fn/core/validators` subpath.
2. The export SHALL include `StemmaComponentNamingValidator`.
3. The export SHALL include `StemmaTokenUsageValidator`.
4. The export SHALL include `StemmaPropertyAccessibilityValidator`.
5. Product repos SHALL be able to import these validators and run them against local component source without additional configuration.

---

### Requirement 4: Init Scaffolding

**User Story**: As a product developer running `npx designerpunk init`, I want test configuration scaffolded automatically, so that I can run tests immediately after init without manual setup.

#### Acceptance Criteria

1. WHEN `npx designerpunk init` runs THEN it SHALL create a `jest.config.js` extending `@3fn/core/jest-preset` (if one doesn't already exist).
2. WHEN `npx designerpunk init` runs THEN it SHALL create a `tsconfig.test.json` with the required compiler options (if one doesn't already exist).
3. The scaffolded `tsconfig.test.json` SHALL include: `target: "ES2020"`, `module: "commonjs"`, `strict: true`, `esModuleInterop: true`, `skipLibCheck: true`, `resolveJsonModule: true`, `downlevelIteration: true`, `types: ["jest", "node"]`, `include: ["src/**/*"]`.
4. Init SHALL NOT modify `package.json` to add devDependencies (too invasive). Required devDependencies SHALL be documented in console output and Integration Guide.
5. WHEN init completes THEN it SHALL print a message listing the required devDependencies: `jest`, `@types/jest`, `ts-jest`, `jest-environment-jsdom`.

---

### Requirement 5: Documentation

**User Story**: As a product developer, I want clear documentation on setting up and running component tests, so that I can adopt the test preset without reading source code.

#### Acceptance Criteria

1. The Integration Guide SHALL include a "Running Component Tests" section documenting: required devDependencies, `jest.config.js` setup, `tsconfig.test.json` purpose, and how to run tests.
2. The Integration Guide SHALL note that `jest-environment-jsdom` is required for web component tests.
3. The Integration Guide SHALL note that stale component source (from an older init) may cause test failures, and recommend re-running `npx designerpunk init` after updating `@3fn/core`.
4. The `@3fn/core/testing` export SHALL include JSDoc on all exported utilities.

---

## Scope Boundaries

### Explicitly In Scope
- `@3fn/core/jest-preset` subpath export (pre-compiled JS)
- `@3fn/core/testing` subpath export (utilities + Stemma validators)
- CSS style mock shipped at a stable path within the package
- Init scaffolds `jest.config.js` and `tsconfig.test.json`
- Integration Guide documentation
- Console output listing required devDependencies after init

### Explicitly Out of Scope
- `npx designerpunk test` CLI command (Jest CLI is sufficient)
- Migrating `@3fn/core`'s own tests to use the preset
- Test coverage reporting or CI integration
- Component-specific test utilities (stay local to each component)
- iOS/Android test infrastructure (platform-native, separate concern)
- Automatic devDependency installation by init

---

## Traceability

| Origin | Requirement |
|--------|-------------|
| Lina issue: no test infrastructure in product repos | Req 1, 4 |
| Lina issue: shared utilities needed | Req 2 |
| Lina concern: `cleanupDOM` missing | Req 2 (AC 4) |
| Lina concern: Stemma validators not exported | Req 3 |
| Lina concern: generic `setupTokenProperties` | Req 2 (AC 5) |
| Ada concern: preset must be pre-compiled JS | Req 1 (AC 2), Req 2 (AC 7) |
| Ada concern: CSS mock path resolution | Req 1 (AC 5) |
| Lina/Leo concern: jsdom default for product repos | Req 1 (AC 4) |
| Lina concern: tsconfig needs specific options | Req 4 (AC 3) |
| Leo concern: stale source documentation | Req 5 (AC 3) |
| Ada concern: init shouldn't modify package.json | Req 4 (AC 4) |
