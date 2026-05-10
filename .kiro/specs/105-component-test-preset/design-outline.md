# Design Outline: Component Test Preset

**Date**: 2026-05-10
**Spec**: 105 - Component Test Preset
**Status**: Design Outline
**Author**: Thurgood (governance framing) → Lina (implementation ownership)
**Origin**: `.kiro/issues/lina-2026-05-10-test-infrastructure.md`

---

## Problem Statement

Product repos consuming `@3fn/core` can edit component source (copied by `npx designerpunk init`) but cannot run component tests. The test infrastructure (Jest config, TypeScript transforms, CSS module mocking, shared test utilities) lives inside `@3fn/core` and isn't exposed as a consumable package export.

This creates a growing confidence gap: Lina has written 35+ test cases across Specs 000 and 001 that have never been executed. Every future spec that modifies components adds to the pile.

---

## Proposed Solution

Ship a **Jest preset** and **shared test utilities** from `@3fn/core` that product repos can consume with minimal configuration.

### 1. `@3fn/core/jest-preset` — Shareable Jest Configuration

A product repo's `jest.config.js` becomes:

```javascript
module.exports = {
  ...require('@3fn/core/jest-preset'),
  roots: ['<rootDir>/src'],
};
```

The preset provides:
- `preset: 'ts-jest'` (TypeScript compilation)
- `testEnvironment: 'node'` (default; component tests use `@jest-environment jsdom` annotation)
- `testMatch` patterns for `__tests__/**/*.test.ts`
- `moduleNameMapper` for CSS module mocking (`.css` → empty string)
- `testTimeout: 10000`
- Standard exclusions (`node_modules/`, `dist/`, `.d.ts`)

### 2. `@3fn/core/testing` — Shared Test Utilities

```typescript
import { setupBlendColorProperties, cleanupBlendColorProperties } from '@3fn/core/testing';
import { registerComponent, createComponentFixture } from '@3fn/core/testing';
```

Exports:
- `setupBlendColorProperties()` / `cleanupBlendColorProperties()` — CSS custom property setup for blend utility tests
- `registerComponent(tagName, ComponentClass)` — Safe custom element registration (no "already defined" errors)
- `createComponentFixture(tagName, props?)` — Create element, set props, append to DOM, return cleanup function
- The CSS style mock file (for `moduleNameMapper` resolution)

### 3. Product Repo Setup

After `npm install @3fn/core`, a product repo needs:

```bash
npm install --save-dev jest @types/jest ts-jest
```

Plus a minimal `jest.config.js` (one line extending the preset) and a `tsconfig.json` (for ts-jest).

`npx designerpunk init` could scaffold these automatically (add `jest.config.js` and `tsconfig.json` to the init output).

---

## Scope Boundaries

### In Scope
- `@3fn/core/jest-preset` subpath export (shareable Jest config)
- `@3fn/core/testing` subpath export (shared test utilities)
- CSS style mock shipped as part of the package
- Init scaffolds `jest.config.js` and `tsconfig.json` for product repos
- Documentation in Integration Guide

### Out of Scope
- `npx designerpunk test` CLI command (over-engineering for V1 — Jest CLI is sufficient)
- Migrating existing `@3fn/core` tests to use the preset (core keeps its own config)
- Test coverage reporting or CI integration
- Component-specific test utilities (each component's `test-utils.ts` stays local to that component)

---

## Key Design Decisions to Resolve

### Decision 1: What devDependencies does the product repo need?

**Option A**: Product repo installs `jest`, `@types/jest`, `ts-jest` as devDependencies
- Pro: Explicit, product controls versions
- Con: 3 packages to install manually

**Option B**: `@3fn/core` lists these as `peerDependencies` (optional)
- Pro: `npm install` warns if missing
- Con: Peer dep warnings are noisy and often ignored

**Option C**: `npx designerpunk init` adds them to `package.json` automatically
- Pro: Zero manual steps
- Con: Init modifying `package.json` dependencies is invasive

**Recommendation**: Option A with init scaffolding the `jest.config.js`. Document the 3 devDependencies in the Integration Guide. Init doesn't touch `package.json` dependencies (too invasive).

### Decision 2: Where do shared test utilities live in the package?

**Option A**: `src/testing/index.ts` (new directory)
- Pro: Clean separation from component source
- Con: New directory to maintain

**Option B**: `src/__tests__/shared/index.ts` (extend existing test utilities)
- Pro: Near existing test infrastructure
- Con: `__tests__` directories are typically excluded from package distribution

**Recommendation**: Option A. `src/testing/` is a clear, dedicated location for consumable test utilities. It ships with the package (already in `files: ["src/"]`).

### Decision 3: Should init scaffold `tsconfig.json`?

Product repos need a `tsconfig.json` for `ts-jest` to work. Options:
- Init creates a minimal `tsconfig.json` if one doesn't exist
- Init skips it (document in guide, developer creates manually)

**Recommendation**: Init creates it. A product repo without `tsconfig.json` can't compile TypeScript at all — it's a reasonable default to scaffold.

---

## Stakeholder Review

- **Lina** (primary): Owns component testing. Will validate the preset covers her test patterns and the utilities match what she needs.
- **Ada** (secondary): Owns the package exports and init command. Will implement the subpath exports and init scaffolding.
- **Leonardo** (informational): Product architect. Can validate the DX story — "install 3 packages, extend preset, run tests."

---

## Open Questions

1. Should the preset include `jsdom` as a dependency, or should product repos install it separately? (Component tests need it, but it's heavy — 20MB+.)

2. Should `@3fn/core/testing` export component-specific utilities (like `registerButtonCTA()`), or only generic utilities? Component-specific utils create coupling between the testing package and specific components.

3. Does the product repo need a `tsconfig.json` that matches core's compiler options exactly, or can it be minimal (`{ "compilerOptions": { "esModuleInterop": true, "jsx": "react" } }`)?
