# @3fn/core Feedback — Lina (Stemma Component Specialist)

**Date**: 2026-05-10
**Context**: Spec 000 + 001 implementation on a product repo consuming `@3fn/core@11.3.3`
**Agent**: Lina — component development, behavioral contract testing

---

## Product Repos Cannot Run Component Tests

**Issue**: Product repos consuming `@3fn/core` have no way to run component tests. The test infrastructure (Jest, jsdom, test utilities) lives inside `@3fn/core` but isn't exposed or consumable by product repos.

**Impact**: Across Specs 000 and 001, I've written 35+ test cases for components that live in `src/components/core/` (the product's working copy of component source). None of these tests have been executed. I'm writing tests I can't run, and validating behavioral contracts through code path analysis rather than actual test execution.

This creates a growing confidence gap:
- Spec 000: 35 test cases (Nav-Header-App + NavAboutPopover) — unverified
- Spec 001: ~8 more test cases (Button-CTA href) — will also be unverified
- Every future spec that modifies or creates components adds to the pile

**Root cause**: The product repo has:
- No `jest.config.js`
- No test runner in `devDependencies`
- No `tsconfig.json`
- `package.json` has only 2 dependencies (`@3fn/core`, `figma-console-mcp`)

The component source files exist in `src/components/core/` (mirroring `@3fn/core`'s structure), but there's no way to compile or test them locally.

---

## What Would Help

### Option A: `@3fn/core` ships a test preset

A shareable Jest configuration that product repos can extend:

```javascript
// jest.config.js in product repo
module.exports = {
  ...require('@3fn/core/jest-preset'),
  roots: ['<rootDir>/src'],
};
```

The preset would include:
- jsdom environment
- CSS module mocking (for `.css` imports)
- TypeScript transform (ts-jest or esbuild-jest)
- Custom element registration handling
- Any test utilities (`createButton()`, `setupBlendColorProperties()`, etc.)

**Effort**: Medium. Requires packaging the test config and utilities as an export from `@3fn/core`.

### Option B: `@3fn/core` ships a `test` CLI command

Similar to how `designerpunk generate` runs the token pipeline:

```bash
npx designerpunk test              # Run all component tests
npx designerpunk test Button-CTA   # Run tests for one component
```

This would handle the Jest setup internally — product repos don't need to configure anything.

**Effort**: Higher. Requires a test runner wrapper in the CLI.

### Option C: Product repo sets up its own Jest (minimal)

The product repo adds:
```json
{
  "devDependencies": {
    "jest": "^29.0.0",
    "@types/jest": "^29.0.0",
    "esbuild-jest": "^0.5.0"
  }
}
```

Plus a `jest.config.js` and `tsconfig.json`. This is the quickest path but means every product repo reinvents the same config.

**Effort**: Low per-repo, but duplicated across products.

---

## My Recommendation

**Option A (test preset) is the right long-term answer.** It's the same pattern as `eslint-config-*` or `jest-preset-*` packages — centralize the config, let consumers extend it.

**Option C (local setup) is the right short-term answer.** For DP-Portfolio specifically, we could set up Jest in 10 minutes and immediately start running the 35+ tests we've already written. This unblocks validation now while Option A is developed.

---

## Specific Test Utilities That Should Be Shared

From reading `@3fn/core`'s existing test files, these patterns are repeated across components:

1. **`setupBlendColorProperties()`** — Sets CSS custom properties needed for blend utilities
2. **`createComponent(ComponentClass, props)`** — Creates element, sets props, appends to DOM, calls `connectedCallback()`
3. **CSS module mock** — The `import styles from './Component.styles.css'` pattern needs a Jest transform
4. **Custom element registration handling** — Tests need to handle `customElements.define()` being called multiple times

If these were exported from `@3fn/core/testing`, product repos could import them directly rather than reimplementing.

---

## Affected Specs

| Spec | Tests Written | Tests Executed | Gap |
|------|--------------|----------------|-----|
| 000 (Nav-Header-App) | 35 | 0 | 35 |
| 001 (Button-CTA href) | ~8 (planned) | 0 | ~8 |
| Future specs | Growing | 0 | Growing |

---

## Summary

The `@3fn/core` consumption model works well for tokens (pipeline generates, product consumes output) but has a gap for components (source is editable, but untestable). Closing this gap — via a test preset, CLI command, or at minimum documenting the local setup — would significantly improve confidence in component modifications made at the product level.
