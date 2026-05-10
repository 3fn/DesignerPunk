# Spec Feedback: Design Outline

**Spec**: 105-component-test-preset
**Phase**: Design Outline
**Created**: 2026-05-10

---

### Context for Reviewers
- Origin: Lina's field report — 35+ unexecuted tests across Specs 000/001
- Product repos have component source but no test infrastructure
- Shipping Jest preset + shared utilities from @3fn/core
- Key decisions: devDependency strategy, utility location, init scaffolding scope
- Open questions about jsdom, component-specific utils, and tsconfig shape

---

## Lina — Primary Reviewer (Component Testing Domain)

**Date**: 2026-05-10
**Verdict**: Approve with Concerns

---

### Strengths

1. **Correctly identifies the real problem.** 35+ unexecuted tests across Specs 000/001 is a genuine confidence gap. The design outline accurately diagnoses the root cause (no test infrastructure in product repos).

2. **Preset approach is the right pattern.** Option A from my original issue report, formalized well. The one-line `jest.config.js` extending the preset is exactly the DX I'd want.

3. **Scope boundaries are sensible.** Keeping component-specific `test-utils.ts` local to each component (out of scope) is correct — those are tightly coupled to implementation details. The CLI wrapper exclusion is also right for V1.

4. **Decision 2 (Option A: `src/testing/`)** is the correct choice. `__tests__/` directories should never ship in a package. Clean separation.

5. **The `registerComponent` utility directly addresses** the most common jsdom footgun I hit — `customElements.define()` throwing "already defined" errors across test files.

---

### Concerns

**Concern 1: Missing `cleanupDOM` from shared utilities**

The design outline proposes `registerComponent` and `createComponentFixture` but omits `cleanupDOM()` — the utility from `src/__tests__/helpers/web-component-test-utils.ts` that safely removes DOM nodes without destroying jsdom's custom element registry. This is used in virtually every web component test file (`afterEach(() => cleanupDOM())`). It MUST be in `@3fn/core/testing`.

**Concern 2: Missing Stemma validators from the export surface**

My `.stemma.test.ts` files (naming validation, token usage validation, accessibility validation) import from `src/validators/`. These are static analysis tests that product repos would also want to run after modifying components. The design outline doesn't mention whether `@3fn/core/testing` (or a separate `@3fn/core/validators` export) would include:
- `StemmaComponentNamingValidator`
- `StemmaTokenUsageValidator`
- `StemmaPropertyAccessibilityValidator`

If these aren't exported, product repos can't run the `.stemma.test.ts` pattern at all. This is a significant gap — roughly 30% of my test files use these validators.

**Concern 3: `setupBlendColorProperties` is too narrow as the only CSS property utility**

The design outline lists `setupBlendColorProperties()` / `cleanupBlendColorProperties()` specifically. But looking at my actual tests, the more common pattern is setting arbitrary CSS custom properties for token-dependent rendering (see `ContainerCardBase.composition.test.ts` which sets `--color-structure-surface-primary`, `--motion-focus-transition-duration`, etc.). A more general `setupTokenProperties(props: Record<string, string>)` utility would serve better, with `setupBlendColorProperties` as a convenience wrapper on top.

**Concern 4: `testEnvironment: 'node'` default requires per-file annotation**

The preset defaults to `testEnvironment: 'node'` with per-file `@jest-environment jsdom` annotations. This is correct for `@3fn/core` (which has many node-only tests), but product repos modifying components will write almost exclusively jsdom tests. Consider whether the preset should default to `jsdom` for product repos, or at minimum document clearly that every web component test file needs the `@jest-environment jsdom` docblock.

**Concern 5: `jest-environment-jsdom` not mentioned in devDependencies**

The design outline says product repos need `jest`, `@types/jest`, `ts-jest`. But `jest-environment-jsdom` is a separate package (see core's `devDependencies`: `"jest-environment-jsdom": "^30.2.0"`). If the preset uses per-file `@jest-environment jsdom` annotations, the product repo needs this package installed too. That's 4 packages, not 3.

**Concern 6: `tsconfig.json` needs specific options for test compatibility**

The design outline's Open Question 3 asks whether a minimal tsconfig suffices. It does NOT. Core's tsconfig includes `"downlevelIteration": true` (required by validators), `"resolveJsonModule": true` (used in some test fixtures), and critically `"types": ["jest", "node"]` (without which `describe`/`it`/`expect` won't resolve). The scaffolded tsconfig needs these, not just `esModuleInterop` and `jsx`.

---

### Open Question Answers

**Q1: Should the preset include `jsdom` as a dependency, or should product repos install it separately?**

**Answer: Product repos should install it separately.** Rationale:
- It's 20MB+ and a devDependency — shipping it as a transitive dep of `@3fn/core` bloats production installs for repos that don't run tests.
- The preset should document it as a required devDependency alongside `jest`, `@types/jest`, `ts-jest`.
- This makes it 4 packages total: `jest @types/jest ts-jest jest-environment-jsdom`. Still manageable.

**Q2: Should `@3fn/core/testing` export component-specific utilities (like `registerButtonCTA()`), or only generic utilities?**

**Answer: Only generic utilities.** Rationale:
- Component-specific registration is trivial (2 lines: import + `customElements.define`). A generic `registerComponent(tag, Class)` handles this.
- Component-specific utilities create tight coupling — if Button-CTA's constructor signature changes, the testing package breaks.
- Each component already has local `test-utils.ts` or inline helpers for its specific setup patterns. That's the right place for component-specific logic.
- HOWEVER: the Stemma validators (naming, token usage, accessibility) should be exported — they're generic infrastructure that applies to ANY component, not component-specific.

**Q3: Does the product repo need a `tsconfig.json` that matches core's compiler options exactly, or can it be minimal?**

**Answer: It needs a targeted subset, not minimal and not exact.** Required options:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "downlevelIteration": true,
    "types": ["jest", "node"]
  },
  "include": ["src/**/*"]
}
```
The `outDir`, `declaration`, `declarationMap`, `sourceMap` options are for building — tests don't need them. But `downlevelIteration`, `resolveJsonModule`, and `types` are required for test compilation. Init should scaffold this exact subset.

---

### Summary

The design is sound and addresses a real gap. My primary concern is completeness of the utility surface — `cleanupDOM` is missing (critical), Stemma validators aren't addressed (significant for `.stemma.test.ts` pattern), and the devDependency list undercounts by one (`jest-environment-jsdom`). These are all addressable in the requirements phase without changing the architecture.

---

## Ada — Secondary Review (Package Export Mechanics)

**Date**: 2026-05-10
**Verdict**: APPROVE WITH CONCERNS

### Strengths

1. **Subpath export pattern is consistent with existing conventions.** The proposed `@3fn/core/jest-preset` and `@3fn/core/testing` follow the same pattern as existing exports (`@3fn/core/config`, `@3fn/core/build`, `@3fn/core/blend`). No new conventions needed.

2. **Decision 2 (Option A: `src/testing/`) is correct.** The `files` field already includes `"src/"`, so anything under `src/testing/` ships automatically. Putting consumable utilities in `__tests__/` would require `files` changes and violates the convention that `__tests__` is excluded from distribution.

3. **Decision 1 (Option A: explicit devDependencies) is the right call.** Init modifying `package.json` dependencies is invasive and fragile — version conflicts, registry differences, lockfile churn. Documenting 3 packages is fine.

4. **Scope boundaries are well-drawn.** No `npx designerpunk test` wrapper, no migration of core's own tests. Correct restraint.

### Concerns

1. **The `exports` map needs careful construction.** The preset export needs to point to a *built* JS file, not a `.ts` source file. The current `./build` and `./types` exports point to `.ts` source (unusual but works because consumers use ts-node). A Jest preset MUST be plain JS — Jest doesn't run TypeScript natively. The design outline doesn't specify whether `jest-preset` exports a pre-built `.js` file from `dist/` or a source `.ts` file. This needs to be explicit.

   **Recommendation**: Ship `dist/testing/jest-preset.js` (plain JS, no compilation needed by consumer). Add to `files`: `"dist/testing/"`. Export map:
   ```json
   "./jest-preset": "./dist/testing/jest-preset.js",
   "./testing": {
     "import": "./dist/testing/index.js",
     "types": "./dist/testing/index.d.ts"
   }
   ```

2. **The CSS style mock file needs a stable path in the export map.** The preset's `moduleNameMapper` will reference a mock file. If it uses a path like `<rootDir>/node_modules/@3fn/core/src/__tests__/__mocks__/styleMock.js`, that's fragile and leaks internal structure. The mock should be part of the `testing` export or have its own subpath export (e.g., `@3fn/core/testing/style-mock`). The design outline mentions "CSS style mock shipped as part of the package" but doesn't specify how the preset references it.

   **Recommendation**: The preset should resolve the mock path relative to itself using `require.resolve('@3fn/core/testing/style-mock')` or `path.resolve(__dirname, './style-mock.js')`. This keeps the consumer's `jest.config.js` clean.

3. **`jsdom` dependency question (Open Question 1) has a clear answer from the package perspective.** `jest-environment-jsdom` is already in core's `devDependencies`. For product repos, it should be listed as an **optional peer dependency** with a note in the preset. Rationale: not all component tests need jsdom (token tests don't), but the per-file `@jest-environment jsdom` annotation will fail silently or loudly depending on Jest version if the package isn't installed. Document it as a required devDependency alongside the other 3 packages — making it 4 total: `jest`, `@types/jest`, `ts-jest`, `jest-environment-jsdom`.

4. **Init scaffolding `tsconfig.json` (Decision 3) needs a guard.** The design outline recommends init creates `tsconfig.json` if one doesn't exist. This is fine, but the init command currently uses `createFileIfNotExists()` which already has this guard. The concern: what compiler options are required? The outline's minimal suggestion (`esModuleInterop`, `jsx: "react"`) is insufficient — `ts-jest` also needs `module`, `target`, and `moduleResolution` to match how the component source was authored. The preset should document or enforce the minimum `compilerOptions` that make component tests compile.

   **Recommendation**: Ship a `tsconfig.test.json` that the init scaffolds, separate from any existing `tsconfig.json`. This avoids conflicts with the product's build tsconfig. The Jest config can reference it via `ts-jest`'s `tsconfig` option in the preset.

5. **The `@3fn/core/testing` utilities create a runtime dependency on the package.** Product repos import from `@3fn/core/testing` in their test files. If the product later removes `@3fn/core` (unlikely but possible), tests break. More practically: version mismatches between the testing utilities and the component source (which was copied by init and may have diverged) could cause subtle failures. The design outline should acknowledge this coupling and state that testing utilities are versioned with the package — consumers should keep `@3fn/core` updated even after init.

### Open Question Responses (Package Perspective)

**Q1: Should the preset include `jsdom` as a dependency?**
No. List `jest-environment-jsdom` as a documented required devDependency for product repos (alongside jest, @types/jest, ts-jest). Don't make it a dependency or peerDependency of the package itself — it's a test-time concern, not a runtime concern. The preset can include a helpful error message if jsdom is missing when a test file uses the annotation.

**Q2: Should `@3fn/core/testing` export component-specific utilities?**
No. From the package export perspective, component-specific utilities (like `registerButtonCTA()`) create tight coupling between the testing subpath and specific component implementations. The generic utilities (`registerComponent`, `createComponentFixture`, `setupBlendColorProperties`) are stable abstractions. Component-specific utils should stay in each component's `__tests__/test-utils.ts` — they're copied by init and live in the product repo.

**Q3: Does the product repo need a `tsconfig.json` that matches core's compiler options exactly?**
Not exactly, but it needs a compatible subset. The critical options are: `"module": "ESNext"` (or `"ES2022"`), `"moduleResolution": "node"`, `"esModuleInterop": true`, `"experimentalDecorators": true` (if components use decorators), and `"strict": true` (to match how source was authored). Ship a `tsconfig.test.json` with these pinned — don't rely on the product's build tsconfig being compatible.

### Summary

The package mechanics are sound in concept. The main gap is specifying the **build artifact story** for the preset and testing exports — they need to be pre-compiled JS in `dist/`, not raw TypeScript, because Jest doesn't natively compile its own config/preset files. The `files` field and `exports` map additions are straightforward once the output paths are decided. Init scaffolding changes are minimal and follow existing patterns.

---

## Leonardo — Informational Review (Product DX Story)

**Date**: 2026-05-10
**Verdict**: APPROVE — DX story is clear and friction is acceptable

---

### Assessment: Does this give platform agents a clear path?

**Yes.** The "install 3 packages, extend preset, run tests" story is legible. A platform agent (Sparky, in practice — this is web-only infrastructure) can go from zero to running component tests in under 5 minutes. That's the right bar.

The one-line `jest.config.js` extending the preset is the correct DX target. Platform agents shouldn't need to understand Jest internals to validate component behavior after modifications.

---

### Setup Friction Assessment

**Acceptable with one caveat.** The stated friction is:

1. `npm install --save-dev jest @types/jest ts-jest` (+ `jest-environment-jsdom` per Lina/Ada)
2. One-line `jest.config.js`
3. `tsconfig.json` (scaffolded by init)
4. Run `npx jest`

That's 4 steps. Reasonable. The caveat: **the per-file `@jest-environment jsdom` annotation is invisible friction.** A platform agent writing a new web component test will get a confusing failure (DOM APIs undefined) with no obvious connection to a missing docblock comment. Both Lina and Ada flagged this — I'm reinforcing it from the consumer perspective.

**Recommendation**: Either default the preset to `jsdom` for product repos (they're exclusively writing DOM tests), or have `createComponentFixture` throw a clear error message when `document` is undefined: "This test requires @jest-environment jsdom — add the docblock annotation."

---

### Cross-Platform Scope Note

This spec is web-only infrastructure. iOS (XCTest) and Android (JUnit/Compose testing) have their own test runners and don't consume Jest. That's fine — the design outline correctly scopes to the platform that needs it. No cross-platform concerns here.

When Kenya or Data need equivalent test infrastructure for their platforms, it'll be a separate spec with platform-native tooling. This spec doesn't preclude that.

---

### One DX Gap Worth Noting

The design outline doesn't describe **what happens when a test fails due to stale component source.** Scenario: product repo has component source copied by init 3 months ago. Core has since updated the component. Product repo runs tests against stale source — tests may pass (false confidence) or fail with confusing errors (no clear path to resolution).

This isn't a blocker for this spec, but the Integration Guide documentation should include a note: "If tests fail after updating `@3fn/core`, re-run `npx designerpunk init` to refresh component source."

---

### Summary

The DX story works. Platform agents get a clear, low-friction path to running component tests. The jsdom default question is the only friction point that could trip up a platform agent mid-task. Lina and Ada's concerns about the utility surface and build artifacts are valid but don't affect the consumer-facing DX story — they're implementation details that the requirements phase will resolve.

No blockers from the product architecture perspective.