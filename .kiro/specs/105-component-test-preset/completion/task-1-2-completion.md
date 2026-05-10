# Task 1.2 Completion: Create Jest Preset

**Date**: 2026-05-10
**Task**: 1.2 Create Jest preset (`src/testing/jest-preset.ts`)
**Type**: Implementation
**Status**: Complete

---

## Artifacts Created

- `src/testing/jest-preset.ts` (new) — Shareable Jest configuration for product repos
- `src/testing/style-mock.ts` (new) — CSS module mock (`module.exports = ''`)

---

## Implementation Details

### Approach

Created a Jest preset that product repos consume via `...require('@3fn/core/jest-preset')`. The preset configures jsdom environment, ts-jest transform, CSS module mocking, and standard test patterns.

### Key Decisions

1. **`testEnvironment: 'jsdom'`** — Product repos write predominantly DOM-based component tests (differs from core's `node` default).
2. **CSS mock path via `path.resolve(__dirname, 'style-mock.js')`** — Resolves from the preset file's location in `dist/testing/`, not from the consumer's project root. Stable regardless of where the product repo lives.
3. **`tsconfig: 'tsconfig.test.json'`** — Points ts-jest at the test-specific config that init scaffolds (Task 3.1).

### Issue Discovered

Pre-existing test failure in `src/cli/__tests__/init.test.ts` (MCP config assertion expects package-relative paths, template now uses local paths). Logged as `.kiro/issues/2026-05-10-init-test-mcp-config-assertion-stale.md`. Unrelated to Spec 105.

---

## Validation (Tier 2: Standard)

- ✅ TypeScript compilation: 0 errors
- ✅ Preset loads via `require()` — all fields resolve correctly
- ✅ Style mock is sibling to preset (path resolution verified)
- ✅ No regressions (329/330 suites pass; 1 failure is pre-existing)
- ✅ Req 1.1: Preset exported via subpath (wiring in Task 2.1)
- ✅ Req 1.2: Will compile to valid JS in `dist/testing/`
- ✅ Req 1.3: Configures ts-jest, testMatch, CSS mock, testTimeout, exclusions
- ✅ Req 1.4: Defaults to jsdom
- ✅ Req 1.5: CSS mock path resolved relative to preset file
- ✅ Req 1.6: One-line spread works (`...require('@3fn/core/jest-preset')`)
- ✅ Req 1.7: ts-jest configured with `tsconfig: 'tsconfig.test.json'`
