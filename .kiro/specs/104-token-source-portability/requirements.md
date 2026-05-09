# Requirements Document: Token Source Portability

**Date**: 2026-05-09
**Spec**: 104 - Token Source Portability
**Status**: Requirements Phase
**Dependencies**: Spec 103 (Pipeline DX: Source Resolution & Validation) — complete

---

## Introduction

Token definition files in `src/tokens/` have internal dependencies on core infrastructure (`src/constants/`, `src/build/`) that prevent them from working in product repos when loaded via `tokenSource`. This spec makes token files self-contained, adds component token portability, and enforces a lint boundary to prevent regression.

**Architectural principle**: Token files are a public authoring surface. They must depend only on `@3fn/core/types` (for type definitions) and intra-token-source imports. All other dependencies are inlined, moved to the generation layer, or accessed via package subpath exports.

**All-or-nothing principle**: When `tokenSource` is set, ALL token resolution (primitive, semantic, and component) shifts to local source. No silent fallback to the package.

---

## Requirements

### Requirement 1: Self-Contained Primitive/Semantic Token Files

**User Story**: As a product developer, I want local token files to load without errors when `tokenSource` is set, so that I can iterate on token values without unresolved import failures.

#### Acceptance Criteria

1. WHEN `tokenSource` is set THEN primitive token files in the local source SHALL load without importing from `src/constants/`, `src/build/`, or any `src/` directory outside `tokens/` and `types/`.
2. WHEN `SpacingTokens.ts` is loaded from a product repo THEN it SHALL NOT import `STRATEGIC_FLEXIBILITY_TOKENS` from an external constants directory — the constant SHALL be defined within the token source.
3. WHEN `semantic/TypographyTokens.ts` is loaded from a product repo THEN it SHALL NOT import `UnitConverter` from the build system — any computed values SHALL be inlined.
4. The refactored token files SHALL produce identical token values to the pre-refactor versions (regression safety).

---

### Requirement 2: Types Directory Ships with Token Source

**User Story**: As a product developer, I want type definitions available alongside my local token source, so that token file type imports resolve without package subpath configuration.

#### Acceptance Criteria

1. WHEN `npx designerpunk init` copies token source THEN it SHALL also copy `src/types/` to the product repo's `src/types/` directory.
2. The copied `src/types/` directory SHALL contain all type files needed by token definitions (`PrimitiveToken.ts`, `SemanticToken.ts`, and their dependencies).
3. WHEN token files use relative imports to `../types/` THEN those imports SHALL resolve in both the core repo and product repos (same relative structure).
4. The init command SHALL preserve the relative directory structure between `src/tokens/` and `src/types/` such that existing relative imports resolve without modification.

---

### Requirement 3: Component Token Portability

**User Story**: As a product developer, I want component token edits to take effect when `tokenSource` is set, so that changing a primitive value propagates to all component tokens that reference it.

#### Acceptance Criteria

1. WHEN `tokenSource` is set THEN the CLI SHALL auto-discover component token files from `{tokenSource}/component/` (scanning for `*.ts` files).
2. WHEN `componentTokens` directories are explicitly configured THEN the CLI SHALL also scan those directories for `*.tokens.ts` files.
3. WHEN component token files are discovered THEN the CLI SHALL load them (triggering `defineComponentTokens()` side-effect registration) before calling the generator.
4. WHEN component tokens are loaded from local source THEN they SHALL reference local primitive token objects (not package primitives), ensuring edited primitive values propagate.
5. WHEN `tokenSource` is set AND no component token files are found in either auto-discovered or configured paths THEN the CLI SHALL emit a warning message indicating no component tokens were found.
6. WHEN `tokenSource` is set THEN the CLI SHALL NOT silently fall back to package component tokens — local resolution is all-or-nothing.
7. WHEN `tokenSource` is NOT set THEN component token loading SHALL continue using the existing package-based registry behavior (no change to default behavior).

---

### Requirement 4: `@3fn/core/build` Subpath Export

**User Story**: As a product developer, I want to import `defineComponentTokens` from the package without relative paths into internal directories, so that my component token files work in both core and product repos.

#### Acceptance Criteria

1. The package SHALL export `defineComponentTokens` via the `@3fn/core/build` subpath.
2. WHEN a component token file imports `defineComponentTokens` from `@3fn/core/build` THEN the import SHALL resolve correctly in product repos.
3. WHEN `npx designerpunk init` copies component token files THEN it SHALL transform `../../build/tokens` and `../../../build/tokens` imports to `@3fn/core/build`.

---

### Requirement 5: Init Transform Extension

**User Story**: As a product developer, I want `npx designerpunk init` to produce token files that work immediately in my product repo, so that I don't need to manually fix import paths.

#### Acceptance Criteria

1. WHEN init copies token source files THEN it SHALL rewrite relative type imports (`../types/*`, `../../types/*`) to resolve correctly (either via shipped `src/types/` or `@3fn/core/types`).
2. WHEN init copies component token files THEN it SHALL rewrite `../../build/tokens` and `../../../build/tokens` imports to `@3fn/core/build`.
3. WHEN init copies files THEN it SHALL preserve the relative directory structure between `src/tokens/`, `src/types/`, and `src/components/core/` such that intra-source relative imports resolve without modification.
4. The init-generated `designerpunk.config.ts` SHALL include `componentTokens: ['./src/components/core', './src/tokens/component']`.
5. WHEN `src/types/` is shipped alongside token source THEN the existing type import rewrite transform (`rewriteTypeImports`) SHALL be removed — relative imports resolve without transformation.

---

### Requirement 6: Lint Boundary Enforcement

**User Story**: As a pipeline maintainer, I want a CI-enforceable rule preventing token files from importing outside their boundary, so that portability regressions are caught at authoring time in core.

#### Acceptance Criteria

1. A test SHALL verify that files in `src/tokens/*.ts` and `src/tokens/semantic/*.ts` only import from: `../types/` (or `../../types/`), other files within `src/tokens/`, `@3fn/core/types`, or `node_modules` packages.
2. IF a token file imports from `../constants/`, `../../build/`, `../../components/`, or any other `src/` directory outside the boundary THEN the test SHALL fail.
3. The lint boundary SHALL NOT apply to `src/tokens/component/*.ts` — component token files have different import constraints (they legitimately import from `@3fn/core/build` and from primitive token files).
4. The lint boundary SHALL catch both `import` statements and `require()` calls.

---

### Requirement 7: Init Copies Types Directory

**User Story**: As a product developer, I want `src/types/` available in my product repo after init, so that token file type imports resolve locally.

#### Acceptance Criteria

1. WHEN `npx designerpunk init` runs THEN it SHALL copy `src/types/` from the package to the product repo (excluding `__tests__/`).
2. The copied types directory SHALL use merge-mode (existing files preserved, new files added) consistent with other init copy behavior.
3. IF `src/types/` already exists in the product repo THEN existing files SHALL NOT be overwritten.

---

## Scope Boundaries

### Explicitly In Scope
- Inline `STRATEGIC_FLEXIBILITY_TOKENS` into SpacingTokens.ts
- Inline `Math.round(16 * 0.88)` in TypographyTokens.ts (remove UnitConverter dependency)
- Add `@3fn/core/build` subpath export
- Extend init transform for build imports
- CLI auto-discovers and loads local component token files when `tokenSource` is set
- Lint boundary test for `src/tokens/*.ts` and `src/tokens/semantic/*.ts`
- Init copies `src/types/` alongside `src/tokens/`
- Update init-generated config to include both component token directories

### Explicitly Out of Scope
- Theme override portability (already works)
- `npx designerpunk migrate` command (docs only for existing repos)
- Token file API changes (no changes to interfaces or values)
- Lint boundary on component token files (different authoring surface)
- New token families or modifications

---

## Traceability

| Origin | Requirement |
|--------|-------------|
| Ada follow-up: `../constants/` dependency | Req 1 (AC 2) |
| Ada follow-up: `../../build/` dependency | Req 1 (AC 3) |
| Ada follow-up: partial source tree failure | Req 2, 3, 4, 5 |
| Lina Spec 103 feedback: component token asymmetry | Req 3 |
| Leo/Lina consensus: all-or-nothing principle | Req 3 (AC 5, 6) |
| Ada R2: lint boundary prevents regression | Req 6 |
| Ada R1: inline constants (single consumer) | Req 1 (AC 2) |
| Ada R1: inline UnitConverter (Math.round) | Req 1 (AC 3) |
| Lina R1: carve out `component/` from lint boundary | Req 6 (AC 3) |
| Lina R1: update generated config paths | Req 5 (AC 4) |
| Leo R1: AC for init preserving directory structure | Req 5 (AC 3) |
