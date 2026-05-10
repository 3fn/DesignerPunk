# Spec Feedback: Requirements

**Spec**: 105-component-test-preset
**Phase**: Requirements
**Created**: 2026-05-10

---

### Context for Reviewers
- [To be populated before requirements review]

---

## Ada — Secondary Review (Package Exports, Build Artifacts, Init Scaffolding)

**Date**: 2026-05-10
**Verdict**: ✅ APPROVE with minor concerns

---

### Strengths

1. **Pre-compiled JS requirement is explicit and correct.** Req 1 AC 2 and Req 2 AC 7 both mandate pre-compiled JavaScript in `dist/`. This directly addresses my design-outline concern — Jest cannot natively load TypeScript config files, and the current `tsc` build already produces `dist/` output for all `src/` files. The new exports fit the existing build pipeline without requiring a separate compilation step.

2. **CSS mock path resolution is well-specified.** Req 1 AC 5 mandates the mock resolves via `require.resolve` or `path.resolve` relative to the preset file itself, not a consumer-relative path. This is the correct approach — the current `styleMock.js` at `src/__tests__/__mocks__/styleMock.js` is a one-liner (`module.exports = ''`), and shipping it at a stable path within the package (e.g., `dist/testing/styleMock.js`) makes the `moduleNameMapper` deterministic regardless of where the consumer's project lives.

3. **tsconfig is scoped as `tsconfig.test.json`.** The design outline asked whether init should scaffold `tsconfig.json`. The requirements correctly chose `tsconfig.test.json` — this avoids colliding with a product repo's existing `tsconfig.json` (which may have different `outDir`, `rootDir`, `declaration` settings). The specified compiler options match core's `tsconfig.json` exactly (target ES2020, module commonjs, strict, esModuleInterop, skipLibCheck, resolveJsonModule, downlevelIteration, types: jest+node).

4. **Init doesn't modify package.json.** Req 4 AC 4 is explicit. Good — the current `init.ts` already follows this pattern (it scaffolds files but never touches `package.json`).

5. **Traceability table maps my concerns.** Each of my design-outline concerns has a traceable requirement and AC. This is clean governance.

---

### Concerns

**Concern 1: `files` field in package.json needs updating (medium)**

The current `package.json` `files` array does not include `dist/testing/` or `dist/jest-preset*`. The requirements specify pre-compiled output in `dist/`, but don't explicitly require updating the `files` field. Without this, `npm publish` won't include the new artifacts.

Recommendation: Add an AC to Req 1 or Req 2 stating: "The package's `files` field SHALL include the preset and testing dist paths, ensuring they ship with `npm publish`." Alternatively, handle this in the design phase as an implementation detail — but it's easy to forget.

**Concern 2: `exports` field mapping not specified (medium)**

The requirements say "SHALL export via the `@3fn/core/jest-preset` subpath" and "SHALL export via the `@3fn/core/testing` subpath" but don't specify the `exports` field entries in `package.json`. The current `exports` map uses the pattern:

```json
"./config": { "import": "./dist/config/index.js", "types": "./dist/config/index.d.ts" }
```

The jest-preset is unusual because it's consumed via `require()` (CommonJS) in `jest.config.js`, not `import`. The `exports` entry needs a `require` condition, not just `import`:

```json
"./jest-preset": { "require": "./dist/jest-preset.js" },
"./testing": { "import": "./dist/testing/index.js", "require": "./dist/testing/index.js", "types": "./dist/testing/index.d.ts" }
```

Recommendation: Add an AC specifying that the `exports` field SHALL include both `require` and `import` conditions for the preset (since Jest configs use `require()`), and standard `import`/`types` for the testing utilities.

**Concern 3: Stemma validators subpath decision is ambiguous (low)**

Req 3 AC 1 says validators ship via `@3fn/core/testing` OR a dedicated `@3fn/core/validators` subpath — the decision is deferred. This is fine for requirements phase (design will resolve it), but I note that the Stemma validators already exist as compiled JS in `dist/validators/` (I can see `StemmaComponentNamingValidator.js`, `StemmaTokenUsageValidator.js`, `StemmaPropertyAccessibilityValidator.js` in the dist listing). If they're bundled into `@3fn/core/testing`, the testing export becomes heavier than necessary for consumers who only need DOM fixtures. If they get their own subpath, that's a third export to maintain.

No action needed now — flag for design phase.

**Concern 4: `tsconfig.test.json` doesn't specify `rootDir` (low)**

Req 4 AC 3 lists the compiler options but omits `rootDir`. The core `tsconfig.json` uses `"rootDir": "./src"`. Without `rootDir` in the product's `tsconfig.test.json`, `ts-jest` will infer it from the `include` pattern, which should work (`"include": ["src/**/*"]`), but it's worth noting that if a product repo has tests outside `src/` (unlikely but possible), this could cause issues.

No action needed — the `include` pattern is sufficient.

---

### Summary

The requirements correctly address all three of my design-outline concerns (pre-compiled JS, CSS mock paths, tsconfig). The package export mechanics are sound in principle. The two medium concerns (missing `files` field requirement and missing `exports` field CJS/ESM conditions) are implementation details that could be caught in design phase, but specifying them now would prevent a "works in dev, fails after publish" scenario. Overall, this is ready to proceed to design.

---

## Lina — Primary Review (Component Testing Domain Owner)

**Date**: 2026-05-10
**Verdict**: ✅ Approve with minor concerns

---

### Strengths

1. **Design-outline concerns addressed comprehensively.** The traceability table maps every concern I raised (cleanupDOM, generic setupTokenProperties, Stemma validators, tsconfig options) to specific acceptance criteria. Nothing fell through the cracks.

2. **testEnvironment decision resolved correctly.** The design outline proposed `node` with per-file `@jest-environment jsdom` annotations (matching core's pattern). The requirements chose `jsdom` as the default for the product preset. This is the right call — product repos write predominantly DOM-based component tests, and requiring annotations on every test file is friction that doesn't serve them. Core keeps its own config with `node` default because it has many non-DOM tests (token math, build validation).

3. **CSS mock path resolution (Req 1, AC 5) is well-specified.** The design outline flagged this as a risk (consumer-relative paths break). The requirement explicitly mandates `require.resolve` or `path.resolve` relative to the preset file. This is the correct solution.

4. **Scope boundaries are crisp.** The "Explicitly Out of Scope" section prevents scope creep (no `npx designerpunk test`, no CI integration, no iOS/Android). These are all correct exclusions for V1.

5. **Init doesn't touch package.json (Req 4, AC 4).** This was Ada's concern and it's correctly addressed. Console output listing devDependencies is the right DX balance.

---

### Concerns

#### Concern 1: Validator export naming is ambiguous (Req 3, AC 2-4) — Low

The requirements say "export `StemmaComponentNamingValidator`" — but these are **module names containing function exports**, not classes. The actual exports are `validateComponentName()`, `validateTokenUsage()`, `validatePropertyAndAccessibility()`, plus many supporting functions and types (see `src/validators/index.ts` — it re-exports ~60 symbols from these three modules).

An implementer reading AC 2-4 might think they need to export a single named entity. In reality, they need to re-export the public API from each validator module (functions + types).

**Suggestion**: Clarify that the requirement is to re-export the public API from each validator module, or specify: "The export SHALL include all public functions and types from `src/validators/StemmaComponentNamingValidator.ts`" etc.

#### Concern 2: `createComponentFixture` prop-setting semantics unspecified (Req 2, AC 3) — Low-Medium

This utility doesn't exist today. The existing patterns are component-specific factories (`createButtonCTA()` in `Button-CTA/__tests__/test-utils.ts`) and `ensureRegistered()` in `src/__tests__/helpers/web-component-test-utils.ts`.

The AC specifies it "creates element, sets props, appends to DOM, returns element and cleanup function" — but doesn't specify how props are set. Web Components have two prop-setting patterns:
- **Attribute-based**: `element.setAttribute('label', 'Click me')` — works for string/boolean only
- **Property-based**: `element.label = 'Click me'` — works for all types including objects/functions

The existing `createButtonCTA()` uses property-based assignment. The AC should clarify that `createComponentFixture` uses **property assignment** (not attributes), since component props include functions and objects that can't be serialized to attributes.

#### Concern 3: Missing `waitForShadowDOM` utility (Req 2) — Medium

The existing `Button-CTA/test-utils.ts` includes `waitForShadowDOM(element, timeout)` — a critical utility for async Shadow DOM initialization. The requirements don't include this in the shared utilities export. Product repos will need this for any component that renders asynchronously (which is all of them — Shadow DOM attachment is async in jsdom).

**Suggestion**: Add `waitForShadowDOM(element: HTMLElement, timeout?: number): Promise<void>` to the Req 2 utility list, or specify that `createComponentFixture` handles the wait internally and returns only after Shadow DOM is ready.

#### Concern 4: ts-jest ↔ tsconfig.test.json linkage missing (Req 1 + Req 4) — Medium

The requirements scaffold a `tsconfig.test.json` (Req 4, AC 2-3) separate from the project's main `tsconfig.json`. This is correct. However, the preset (Req 1) doesn't mention configuring ts-jest to USE this file.

Without explicit configuration like `transform: { '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }] }`, ts-jest will look for `tsconfig.json` in the project root — which may not exist or may have incompatible settings (e.g., `module: "ESNext"` which breaks CommonJS test execution).

**Suggestion**: Add an AC to Req 1 specifying that the preset SHALL configure ts-jest to use `tsconfig.test.json` as its TypeScript config source.

#### Concern 5: `cleanupDOM` already exists but isn't referenced (Req 2, AC 4) — Informational

The requirements specify `cleanupDOM()` as a new utility. It already exists at `src/__tests__/helpers/web-component-test-utils.ts` with the exact semantics described (removes child nodes without destroying custom element registry). The implementation can simply re-export it. No requirements change needed — just noting for the implementer that this isn't greenfield.

---

### Design Outline Open Questions — Resolution Check

| Open Question | Resolved? | How |
|---------------|-----------|-----|
| Should preset include jsdom as dependency or separate install? | ✅ Yes | Req 4 AC 5: listed as required devDependency (`jest-environment-jsdom`) |
| Should testing export component-specific utilities? | ✅ Yes | Scope Boundaries: "Component-specific test utilities (stay local to each component)" — explicitly out of scope |
| Does product repo need exact tsconfig match? | ✅ Yes | Req 4 AC 3: specific options listed, matches core's tsconfig exactly |

---

### Testability Assessment

All acceptance criteria are testable:
- **Req 1**: Verify preset file exists in dist, verify spreading it produces valid Jest config, verify tests run in a fresh project
- **Req 2**: Import each utility, call it, verify behavior (DOM manipulation, error throwing, cleanup)
- **Req 3**: Import validators, run against sample component source, verify results
- **Req 4**: Run init, verify files created with correct content, verify console output lists devDependencies
- **Req 5**: Verify Integration Guide sections exist, verify JSDoc present on all exported utilities

---

### Summary

Solid requirements document that addresses all design-outline concerns with clear traceability. The scope is appropriately constrained for V1. My concerns are mostly precision issues (validator naming, prop-setting semantics) and two functional gaps: missing `waitForShadowDOM` utility (Concern 3) and the ts-jest ↔ tsconfig.test.json linkage (Concern 4). Concern 4 is the most important — without it, the preset and scaffolded config are disconnected, and tests will fail with confusing TypeScript compilation errors in product repos. Recommend addressing Concerns 3 and 4 before proceeding to design.

---

## Leonardo — Informational Review (Platform Agent DX)

**Date**: 2026-05-10
**Verdict**: ✅ APPROVE — clear DX path for platform agents

---

### DX Assessment: Can Sparky (Web) Ship Tests From This?

**Yes.** The requirements produce a 3-step onboarding path:

1. `npx designerpunk init` → scaffolds `jest.config.js` + `tsconfig.test.json`
2. Install 4 devDependencies (listed in console output)
3. `npx jest` → tests run

This is the right level of ceremony. No config archaeology required.

---

### Strengths (Platform Agent Perspective)

1. **Single-spread config (Req 1, AC 6)** — Sparky doesn't need to understand Jest internals. One line, done. Overrides via spread are intuitive.

2. **Fixture utility returns cleanup function (Req 2, AC 3)** — This matches the pattern platform agents already use in React/SwiftUI testing (setup → assert → teardown). No global state leakage between tests.

3. **Init doesn't touch package.json (Req 4, AC 4)** — Correct. Platform agents manage their own dependency trees. Automated modification creates merge conflicts and trust issues.

4. **Stale source warning in docs (Req 5, AC 3)** — This will save debugging time. When a product repo updates `@3fn/core` but doesn't re-init, tests break with cryptic errors. Documenting this upfront is good DX.

---

### Concerns

#### Concern 1: No "hello world" test example in docs (Req 5) — Low

The Integration Guide documents setup but doesn't require a minimal working test example. Platform agents learn by copying. A 10-line example showing `import { createComponentFixture } from '@3fn/core/testing'` → create → assert → cleanup would eliminate the "now what?" moment after setup.

**Suggestion**: Add an AC to Req 5: "The Integration Guide SHALL include a minimal working test example demonstrating fixture creation, assertion, and cleanup."

#### Concern 2: Error message quality unspecified (Req 2, AC 3) — Low

AC 3 says "SHALL throw a clear error if `document` is undefined" — good. But platform agents will also hit errors when: tag name isn't registered, Shadow DOM doesn't attach, or props don't exist on the element. The requirements don't specify error quality for these cases.

This is a design/implementation concern, not requirements-level. Noting it so the implementer considers DX-quality error messages throughout, not just for the `document` undefined case.

#### Concern 3: Agree with Lina's Concern 4 (ts-jest ↔ tsconfig.test.json) — Medium

From a platform agent perspective, this is the most likely "it doesn't work" moment. Sparky runs `npx jest`, ts-jest can't find `tsconfig.json` (because the product repo only has `tsconfig.test.json`), and gets a wall of TypeScript errors. The fix is non-obvious without reading ts-jest docs.

The preset MUST wire ts-jest to `tsconfig.test.json`. Otherwise the scaffolded file is decorative.

---

### Cross-Platform Note

This spec is correctly scoped to web only (Scope Boundaries: "iOS/Android test infrastructure — platform-native, separate concern"). Kenya and Data don't consume this. When we eventually need iOS/Android test presets, they'll be separate specs with platform-native tooling (XCTest, JUnit/Robolectric). No action needed now — just confirming the boundary is correct.

---

### Summary

The requirements produce a clear, low-friction DX path for Sparky. The "init → install → run" flow is exactly what a platform agent needs. My only substantive agreement is with Lina's Concern 4 (ts-jest linkage) — without it, the happy path breaks on first run. The missing test example (Concern 1) is nice-to-have but not blocking.

---
