# @3fn/core Feedback — Lina (Stemma Component Specialist)

**Date**: 2026-05-10
**Context**: First use of `@3fn/core@11.4.0` jest preset in product repo (DP-Portfolio)
**Agent**: Lina — component testing, behavioral contract verification

---

## Summary

The jest preset works. All 35 Spec 000 tests pass after setup. The gap identified in my earlier feedback (2026-05-10) is closed. Three enhancement suggestions and one fix.

---

## 1. Fix: `jest-environment-jsdom` Not Included as Dependency

**Issue**: The preset specifies `testEnvironment: 'jsdom'` but `jest-environment-jsdom` isn't a dependency of `@3fn/core`. The product repo has to discover and install it separately after hitting the error:

```
Test environment jest-environment-jsdom cannot be found.
As of Jest 28 "jest-environment-jsdom" is no longer shipped by default.
```

**Suggestion**: Either:
- Add `jest-environment-jsdom` as a dependency of `@3fn/core` (so it's available when the preset is used)
- Or document it as a required peer dependency in the preset's JSDoc/README
- Or add it to a `peerDependencies` field so npm warns on install

**Impact**: 30-second fix once you know the error, but confusing for first-time setup.

---

## 2. Fix: `@types/node` Not Mentioned

**Issue**: Tests that use `fs.readFileSync` to read CSS source files (necessary because the style-mock returns `''`) need `@types/node`. The `tsconfig.test.json` needs `"types": ["jest", "node"]`. Neither is documented.

**Context**: The style-mock is correct behavior (CSS imports should return empty strings in tests). But this means tests that verify CSS content (contract tests checking for specific custom property declarations) must read the `.css` file directly via `fs`. That requires Node types.

**Suggestion**: Either:
- Add `@types/node` as a peer dependency note
- Or provide a `readStyleSource(componentPath)` utility in `@3fn/core/testing` that handles the filesystem read pattern

---

## 3. Enhancement: Provide a `readComponentCSS()` Test Utility

**Issue**: The style-mock means `element.shadowRoot.querySelector('style').textContent` is always `''` in tests. Every contract test that verifies CSS content needs this boilerplate:

```typescript
import * as fs from 'fs';
import * as path from 'path';

const cssSource = fs.readFileSync(
  path.resolve(__dirname, '../platforms/web/Component.styles.css'),
  'utf-8'
);
```

**Suggestion**: Add a utility to `@3fn/core/testing`:

```typescript
import { readComponentCSS } from '@3fn/core/testing';

const cssSource = readComponentCSS(__dirname, '../platforms/web/Component.styles.css');
```

This encapsulates the pattern and makes the "why" obvious (style-mock returns empty, so read from disk).

---

## 4. Enhancement: Document the `tsconfig.test.json` Requirement

**Issue**: The preset references `tsconfig: 'tsconfig.test.json'` in its ts-jest config, but there's no documentation or template for what this file should contain. I had to create one from scratch:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowJs": true,
    "strict": true,
    "noEmit": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "types": ["jest", "node"]
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"]
}
```

**Suggestion**: Either:
- Ship a `tsconfig.test.json` template in `@3fn/core` that product repos can extend (`"extends": "@3fn/core/tsconfig.test.json"`)
- Or include the required tsconfig in the preset's JSDoc as a setup instruction

---

## 5. Enhancement: Quick-Start Documentation

**Issue**: The preset's JSDoc shows the `jest.config.js` usage but doesn't mention the full setup steps. A product developer needs to:

1. `npm install --save-dev jest @types/jest ts-jest jest-environment-jsdom @types/node`
2. Create `jest.config.js` with the preset
3. Create `tsconfig.test.json`
4. Add `"test": "jest"` to package.json scripts (optional but helpful)

**Suggestion**: A `TESTING.md` in `@3fn/core` or a section in the main README covering the complete product-repo setup in one place.

---

## What Worked Well

- The preset itself is correct and complete (transform, testMatch, moduleNameMapper, timeout)
- The `style-mock.ts` correctly returns `''` — this is the right behavior for runtime tests
- The shared utilities (`createComponentFixture`, `setupBlendColorProperties`, `cleanupDOM`, `registerComponent`) are exactly what's needed
- The `@3fn/core/testing` subpath export is clean and discoverable

---

## Test Results (Validation)

| Test Suite | Tests | Status |
|-----------|-------|--------|
| Nav-Header-App contracts | 11 | ✅ All pass |
| NavAboutPopover contracts | 18 | ✅ All pass |
| Integration tests | 6 | ✅ All pass |
| **Total** | **35** | **✅ All pass** |

Setup time from `npm update @3fn/core` to all tests green: ~5 minutes (including debugging the missing dependencies).
