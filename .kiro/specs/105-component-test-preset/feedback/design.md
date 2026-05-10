# Spec Feedback: Design

**Spec**: 105-component-test-preset
**Phase**: Design
**Created**: 2026-05-10

---

### Context for Reviewers
- [To be populated before design review]

---

## Round 1 — Ada (Secondary Reviewer: Package Export Mechanics)

**Date**: 2026-05-10
**Verdict**: Approve with Required Changes

---

### Strengths

1. **Build integration is zero-config.** The `src/testing/` directory sits inside `src/**/*` which the existing `tsconfig.json` already compiles. No new build step, no new tsconfig. `tsc` will produce `dist/testing/*.js` + `dist/testing/*.d.ts` automatically. This is the simplest possible approach.

2. **`require` condition on `jest-preset` is correct.** Jest configs use `require()` (CommonJS). The tsconfig outputs CommonJS (`"module": "commonjs"`). The `require` condition matches the runtime reality. Good catch.

3. **`path.resolve(__dirname)` for style-mock path is the right pattern.** When the preset runs from `node_modules/@3fn/core/dist/testing/jest-preset.js`, `__dirname` resolves to the installed package's `dist/testing/` directory. The style mock lives adjacent. This is stable across monorepos, hoisted node_modules, and pnpm.

4. **Validators re-export is clean.** The barrel file in `src/testing/validators.ts` re-exports from `../validators/` — tsc will resolve this to the correct relative path in `dist/testing/validators.js` → `../validators/StemmaComponentNamingValidator.js`. No path gymnastics needed.

---

### Concerns

#### C1: `files` field proposal is a breaking change (BLOCKING)

The design proposes:
```json
"files": ["dist/", "dist/testing/", "src/"]
```

The current `package.json` uses **granular file patterns** — it does NOT ship all of `dist/`. The current `files` field is 40+ entries of specific globs (`dist/config/*.js`, `dist/blend/*.js`, `dist/mcp/`, etc.). This is intentional: it keeps the published package size controlled by only including what consumers need.

Changing to `"dist/"` would ship the ENTIRE dist directory — including `dist/**/__tests__/**` (1169+ compiled test files I confirmed exist in dist), `dist/tools/`, `dist/workflows/`, `dist/security/`, `dist/integration/`, etc. This would massively bloat the published package.

**Fix**: Add specific entries for the testing subpath to the existing `files` array:
```json
"dist/testing/*.js",
"dist/testing/*.d.ts"
```

`"dist/testing/"` as a directory glob would also work but would include `.js.map` and `.d.ts.map` files (acceptable, but slightly larger).

#### C2: `__tests__` directory will compile to `dist/testing/__tests__/` (MINOR)

The design proposes `src/testing/__tests__/utilities.test.ts` for unit tests. Since tsconfig compiles ALL of `src/**/*`, this test file will compile to `dist/testing/__tests__/utilities.test.js`. This is the same pattern as the rest of the codebase (confirmed: `dist/tools/release/__tests__/` exists), so it's not a new problem — but the `files` field entry should NOT use `"dist/testing/"` as a directory glob if you want to avoid shipping test files. Use:
```json
"dist/testing/jest-preset.js",
"dist/testing/jest-preset.d.ts",
"dist/testing/index.js",
"dist/testing/index.d.ts",
"dist/testing/style-mock.js",
"dist/testing/validators.js",
"dist/testing/validators.d.ts"
```

Or add a `.npmignore` pattern for `dist/**/__tests__/` (but this project doesn't currently use `.npmignore`).

#### C3: Exports map inconsistency — existing exports use `import` not `require` (MINOR)

The existing exports map uses `import` conditions exclusively (no `require` anywhere in the current `package.json` exports). The design introduces `require` for the first time. This is technically correct for the jest-preset use case, but creates an inconsistency.

The `./testing` export should also have a `require` condition since product repos using CommonJS configs (which is what `ts-jest` with `"module": "commonjs"` produces) will `require()` the testing utilities in their test files at runtime. Jest runs tests in a CommonJS context by default.

Actually — looking again, since the tsconfig outputs CommonJS and the `import` condition in Node.js resolves for both ESM `import` statements AND dynamic `import()`, while `require` resolves for `require()` calls... and Jest runs in CommonJS... the `./testing` export needs `require` too. The design already has both `import` and `require` pointing to the same file for `./testing`, which is correct. No change needed here — I retract this concern.

#### C4: Missing `types` condition on `./jest-preset` export (MINOR)

The design has:
```json
"./jest-preset": {
  "require": "./dist/testing/jest-preset.js"
}
```

No `types` condition. This means TypeScript won't resolve types for `require('@3fn/core/jest-preset')`. This is probably fine since jest configs are plain JS files and nobody would import the preset in TypeScript code — but for completeness and consistency with the `./testing` export, consider adding:
```json
"./jest-preset": {
  "require": "./dist/testing/jest-preset.js",
  "types": "./dist/testing/jest-preset.d.ts"
}
```

This is low priority since the preset is consumed in `jest.config.js` (plain JS), not TypeScript.

#### C5: `module.exports` in TypeScript source requires `esModuleInterop` (NON-ISSUE, confirmed)

The `jest-preset.ts` uses `module.exports = { ... }` which is a CommonJS pattern in TypeScript. The tsconfig has `"esModuleInterop": true` so this compiles fine. No issue — just documenting that I checked.

---

### Summary

The build integration approach is sound — `tsc` will compile `src/testing/` to `dist/testing/` with declarations, no additional tooling needed. The subpath exports are correctly structured for Jest's CommonJS consumption model.

The one blocking issue is the `files` field: the design must NOT propose replacing the current granular `files` array with a blanket `"dist/"`. This would ship 1000+ compiled test files and internal tooling to consumers. Add specific `dist/testing/` entries to the existing array instead.

Everything else is minor polish. The pre-compiled JS approach works cleanly with the existing `tsc` build.

---

## Round 2 — Lina (Primary Reviewer: Component Testing Domain)

**Date**: 2026-05-10
**Verdict**: ✅ Approve with minor revisions

---

### Strengths

1. **Utilities match actual test patterns.** `cleanupDOM()` is a direct lift of the existing `src/__tests__/helpers/web-component-test-utils.ts` implementation. `waitForShadowDOM()` matches the pattern duplicated across 8+ component-specific `test-utils.ts` files (Button-CTA, Badge-Label-Base, Badge-Count-Base, Button-Icon, Button-VerticalList-Item, Badge-Count-Notification, etc.). `registerComponent()` mirrors the idempotent `if (!customElements.get(tag))` guard used in every component test suite. These are real consolidations of duplicated code, not invented abstractions.

2. **Preset config is correct for product repos.** `testEnvironment: 'jsdom'` is the right default — every component test in core uses `@jest-environment jsdom` annotations because core defaults to `node`. Product repos don't have token math or build validation tests, so jsdom-by-default eliminates per-file boilerplate. The `ts-jest` transform, CSS mock path, `testMatch` patterns, and `testPathIgnorePatterns` all mirror core's `jest.config.js` correctly.

3. **`path.resolve(__dirname)` for style mock.** Correct approach. Consumer-relative paths (`<rootDir>/...`) would break because the mock lives inside `node_modules/@3fn/core/`. The existing core config uses `<rootDir>/src/__tests__/__mocks__/styleMock.js` which only works because it's self-referential — product repos can't use that pattern.

4. **Property assignment over attributes in `createComponentFixture`.** Correct — our components use property setters for functions (`onPress`, `onSelectionChange`, `onChange`), objects, and arrays. Attribute-based setting would silently fail for these types. This matches how all our component test-utils set props (e.g., `button.label = props.label`, `button.size = props.size` in Button-CTA test-utils).

5. **Build integration is zero-config.** The existing `tsconfig.json` compiles `src/**/*` to `dist/` with declarations. `src/testing/` will compile automatically with no build changes.

6. **`createComponentFixture` fills a real gap.** Currently each component has its own `createButtonCTA()`, `createBadgeLabelBase()`, etc. that all follow the same pattern: createElement → set props → appendChild → waitForShadowDOM. The generic version correctly captures this pattern while the component-specific versions remain for typed convenience.

---

### Concerns

#### C1: Validator re-export uses wrong export names (MEDIUM — must fix before implementation)

The design's `validators.ts` re-exports `StemmaComponentNamingValidator`, `StemmaTokenUsageValidator`, and `StemmaPropertyAccessibilityValidator` as if they're classes. They're not — they're modules exporting individual functions. The actual exports are:

- From `StemmaComponentNamingValidator.ts`: `validateComponentName`, `validateComponentNames`, `isPrimitiveComponent`, `isSemanticComponent`, `suggestCorrectedName`, `formatValidationErrors`, etc.
- From `StemmaTokenUsageValidator.ts`: `validateTokenUsage`, `validateAgainstSchema`, `validateTokenUsageInFiles`, `formatTokenUsageErrors`, etc.
- From `StemmaPropertyAccessibilityValidator.ts`: `validatePropertyAndAccessibility`, `validateProperties`, `validateAccessibility`, `validateMultipleComponents`, etc.

The existing `.stemma.test.ts` files import individual functions:
```typescript
import { validateComponentName, isPrimitiveComponent } from '../../../../validators/StemmaComponentNamingValidator';
```

**Fix**: The re-export should barrel-export the functions directly:
```typescript
export { validateComponentName, validateComponentNames, isPrimitiveComponent, isSemanticComponent, ... } from '../validators/StemmaComponentNamingValidator';
export { validateTokenUsage, validateAgainstSchema, ... } from '../validators/StemmaTokenUsageValidator';
export { validatePropertyAndAccessibility, validateProperties, ... } from '../validators/StemmaPropertyAccessibilityValidator';
```

Or use the existing `src/validators/index.ts` barrel which already exports everything:
```typescript
export * from '../validators';
```

#### C2: Missing `ensureRegistered` — the other registration pattern (LOW)

The existing `web-component-test-utils.ts` exports two utilities: `cleanupDOM()` (included) and `ensureRegistered({ tag, path })` (not included). `ensureRegistered` uses `require(path)` to trigger side-effect registration when you don't have a direct class reference. The design's `registerComponent(tagName, ComponentClass)` covers the more common pattern (used in per-component test-utils), but `ensureRegistered` exists for cases where components self-register on import. Likely not critical for product repos — they'll have direct class references — but worth noting.

#### C3: No mention of `customElements.whenDefined()` pattern (LOW)

16 test files in core use `await customElements.whenDefined('tag-name')` in `beforeEach` blocks as a safety gate before testing. This is a native API so it doesn't need a wrapper, but the testing utilities documentation (or a README) should mention this pattern since product developers copying our test structure will encounter it.

#### C4: `setupBlendColorProperties` hardcodes Standard theme values (LOW)

The blend color properties use hardcoded Standard theme values (`rgba(0, 240, 255, 1)`, `rgba(0, 0, 0, 1)`, `#FFFFFF`). This matches the existing `Button-CTA/__tests__/test-utils.ts` exactly, so it's correct for now. But if product repos use WCAG theme (where `--color-contrast-on-action` is white, not black), these test values won't match their runtime. Consider documenting that these are arbitrary valid colors for exercising blend math, not theme-accurate values — the existing test-utils already has this comment.

#### C5: `createComponentFixture` doesn't call `waitForShadowDOM` (NON-ISSUE, by design)

The existing per-component `createButtonCTA()` calls `waitForShadowDOM` internally. The generic `createComponentFixture` does not — it's synchronous and returns immediately. This is the correct design choice: not all components need async shadow DOM waiting, and callers can compose `createComponentFixture` + `waitForShadowDOM` when needed. Just noting I verified this is intentional.

---

### Summary

The design correctly extracts patterns that are genuinely duplicated across 25+ component test files. The preset config mirrors our real `jest.config.js` with the appropriate `jsdom` default for product repos. The utility signatures match how our tests actually work.

The validator re-export naming (C1) must be corrected before implementation — it references non-existent class exports. Everything else is minor documentation or polish that can be addressed during implementation without design revision. Combined with Ada's blocking `files` field concern (which I agree with), two items need revision before tasks begin.

---

## Round 3 — Leonardo (Informational: Product DX Story)

**Date**: 2026-05-10
**Verdict**: ℹ️ Informational — No blocking concerns

---

### DX Assessment: Init Output & Console Messages

#### Init Console Output — Mostly Clear, One Gap

The "Next steps" output after `init` is actionable and sequenced correctly. A developer can follow steps 1–5 linearly. Two observations:

1. **Step 3 is heavy.** Four dev dependencies in one `npm install` command is fine for copy-paste, but a developer unfamiliar with the ecosystem won't know *why* they need `jest-environment-jsdom` separately from Jest itself. A one-line comment in the output (e.g., `# Test runner + web component DOM environment`) would reduce "why am I installing this?" friction without cluttering the output.

2. **Missing: "where do I put my first test?"** Steps 1–4 set up infrastructure. Step 5 says "run tests" — but there are no tests yet. A new product developer hitting `npx jest` on a fresh init will get "No tests found" which is technically correct but feels like failure. Consider either:
   - Adding a step between 4 and 5: `Create a test at src/components/core/MyComponent/__tests__/MyComponent.test.ts`
   - Or scaffolding a minimal example test file during init (even a placeholder that passes)

   The "No tests found" message from Jest is not an error, but it's a momentum-killer for someone who just ran 4 setup steps expecting a payoff.

#### `createComponentFixture` Error Message — Good

The `typeof document === 'undefined'` guard with the actionable message ("Add this to the top of your test file: `/** @jest-environment jsdom */`") is excellent DX. It tells the developer exactly what went wrong and exactly how to fix it. Since the preset defaults to jsdom this should rarely fire, but when it does (e.g., a file accidentally excluded from the preset), the developer won't be stuck.

#### `waitForShadowDOM` Timeout Error — Adequate

The timeout error (`Timeout waiting for shadow DOM on <my-component>`) identifies the element but doesn't suggest causes. In practice, the most common cause is forgetting to call `registerComponent()` first. Consider appending: `Ensure the component is registered via registerComponent() before creating the element.` — but this is polish, not blocking.

#### Overall Consumer Journey Clarity

The one-line `jest.config.js` (`...require('@3fn/core/jest-preset')`) is the right level of magic. It's discoverable (developers can inspect the preset), overridable (spread then override), and doesn't hide configuration behind CLI commands. The `tsconfig.test.json` scaffolding is similarly transparent.

The import path `@3fn/core/testing` for utilities is clean and memorable. No deep paths, no version-specific imports.

---

### Summary

The DX story is solid. The init output is actionable, error messages guide developers to fixes, and the consumer API surface is minimal. The one meaningful gap is the "step 5 leads to nothing" problem on fresh repos — a scaffolded example test or adjusted messaging would complete the first-run experience.
