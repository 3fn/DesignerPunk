# Requirements Document: Generation Pipeline Data Flow Restructure

**Date**: 2026-06-05
**Spec**: 114 - Generation Pipeline Data Flow Restructure
**Status**: Requirements Phase
**Dependencies**: Spec 104 (complete), Spec 109 (complete), Spec 103 (complete)

---

## Introduction

The generation pipeline (`npx designerpunk generate`) has three defects rooted in generators importing tokens directly from package barrel files rather than receiving them as function parameters. This spec restructures the data flow so all generators receive inputs exclusively via parameters, decouples pipeline error boundaries, and adds staleness detection for product token generation.

---

## Requirements

### Requirement 1: Explicit Token Input for Token-Index Generation

**User Story**: As a product developer using `tokenSource`, I want the token-index to reflect my local token source, so that my Application MCP and product token refs resolve correctly.

#### Acceptance Criteria

1. WHEN `generateTokenIndex` is called THEN it SHALL use only the token data passed via its `input` parameter (primitives, semantics, component tokens, theme-varying set)
2. WHEN `generateTokenIndex` is called THEN it SHALL NOT import token data from package barrel files (`../tokens`, `../tokens/semantic`)
3. WHEN `generateTokenIndex` is called without the required `input` parameter THEN the TypeScript compiler SHALL produce a type error (parameter is non-optional)
4. WHEN the token-index is generated in a repo with `tokenSource: './src/tokens'` THEN the output SHALL contain platform paths for locally-defined tokens (not package defaults)

---

### Requirement 2: Component Token Registration Without Conflict

**User Story**: As a product developer with local component tokens, I want `generate` to succeed without "already registered" errors, so that I can generate platform output files.

#### Acceptance Criteria

1. WHEN `tokenSourceMode` is `'local'` AND a component token file exists in both the package and local source THEN `loadComponentTokens` SHALL register the local version using `allowOverwrite: true` without throwing a conflict error
2. WHEN `loadComponentTokens` completes THEN it SHALL return all registered component tokens as `RegisteredComponentToken[]`
3. WHEN `generateTokenIndex` is imported THEN it SHALL NOT trigger side-effect imports that register package component tokens with `ComponentTokenRegistry`

---

### Requirement 3: Pipeline Independence (System vs Product)

**User Story**: As a product developer iterating on product tokens, I want product token generation to succeed even when the system token pipeline has errors, so that my product development isn't blocked by unrelated issues.

#### Acceptance Criteria

1. WHEN system token generation throws an error THEN product token generation SHALL still execute independently
2. WHEN system token generation fails AND product token generation succeeds THEN the CLI SHALL write product token output files to disk
3. WHEN system token generation fails AND product token generation succeeds THEN the CLI SHALL exit with code 1
4. WHEN any pipeline stage fails THEN the CLI SHALL output structured status showing which stages succeeded (✅) and which failed (❌)
5. WHEN system token generation fails THEN the CLI SHALL recommend `--product-only` in the error output

---

### Requirement 4: Product Token Staleness Detection

**User Story**: As a product developer adding new token YAML files, I want the pipeline to detect that my output is stale and regenerate automatically, so that I don't debug rendering issues caused by unresolved custom properties.

#### Acceptance Criteria

1. WHEN `generate` is run AND any product token YAML source file has a modification time newer than the oldest product token output file THEN product tokens SHALL be regenerated
2. WHEN `generate` is run AND all product token output files are newer than all YAML source files THEN product token generation SHALL be skipped with a logged message (e.g., "⏭ Product tokens up-to-date")
3. WHEN `generate` is run AND no product token output file exists THEN product tokens SHALL always be generated
4. WHEN `generate --force` is run THEN product tokens SHALL always be regenerated regardless of staleness
5. WHEN staleness detection skips generation THEN it SHALL log the skip decision (never silent)

---

### Requirement 5: Product-Only Generation Mode

**User Story**: As a product developer who only needs product tokens updated, I want a `--product-only` flag that skips system token processing entirely, so that I get fast regeneration without needing the system pipeline to be healthy.

#### Acceptance Criteria

1. WHEN `generate --product-only` is run THEN the CLI SHALL NOT call `resolveTokens`, `loadComponentTokens`, `generateTokenFiles`, or `generateTokenIndex`
2. WHEN `generate --product-only` is run THEN the CLI SHALL call `generateProductTokens` using the existing `token-index/*.yaml` files on disk
3. WHEN `generate --product-only` is run AND product token generation succeeds THEN the CLI SHALL exit with code 0
4. WHEN `generate --product-only` is run AND product token YAML references a system token not in `token-index/` THEN the generator SHALL emit its existing warning (Spec 109 behavior) without failing the pipeline
5. WHEN `generate --product-only` is run THEN staleness detection SHALL still apply (skip if up-to-date unless `--force`)

---

### Requirement 6: Redundant Token-Index Regeneration Removal

**User Story**: As a product developer, I want the pipeline to generate the token-index exactly once per run, so that later generation steps don't overwrite the local-source-aware index with package defaults.

#### Acceptance Criteria

1. WHEN `generateProductTokens` is called THEN it SHALL NOT call `generateTokenIndex` internally
2. WHEN the full pipeline runs (no `--product-only`) THEN `generateTokenIndex` SHALL be called exactly once, in the system token pipeline stage, with explicitly passed token data

---

### Requirement 7: Theme-Varying Token Accuracy

**User Story**: As a product developer with custom themes, I want the token-index to correctly reflect which tokens are theme-varying, so that the Application MCP reports accurate theme metadata.

#### Acceptance Criteria

1. WHEN `generateTokenIndex` is called THEN it SHALL use the `themeVaryingTokens` set from its input parameter (not compute it internally)
2. WHEN the CLI calls `generateTokenIndex` THEN it SHALL compute `themeVaryingTokens` from the config's registered themes (including tokens that differ between base light and dark contexts, not only tokens with explicit theme overrides)
3. WHEN `generateTokenIndex` is called THEN it SHALL NOT instantiate its own `ThemeRegistry`

---

### Requirement 8: Package-Internal Script Compatibility

**User Story**: As a DesignerPunk maintainer, I want the standalone `scripts/generate-token-index.ts` to continue working after the interface change, so that package-internal tooling isn't broken.

#### Acceptance Criteria

1. WHEN `scripts/generate-token-index.ts` is run THEN it SHALL pass all required token data explicitly to `generateTokenIndex`
2. WHEN `scripts/generate-token-index.ts` is run THEN it SHALL import token data from package barrel files directly (this is the package itself, not a consumer)
3. WHEN the TypeScript project is compiled THEN `scripts/generate-token-index.ts` SHALL compile without errors

---

### Requirement 9: Backward Compatibility

**User Story**: As a product developer without `tokenSource` configured, I want `generate` to work exactly as it did before this change, so that I don't need to update my workflow.

#### Acceptance Criteria

1. WHEN `tokenSource` is NOT configured THEN `loadComponentTokens` SHALL NOT use `allowOverwrite: true` (standard registration behavior preserved)
2. WHEN `tokenSource` is NOT configured THEN the CLI SHALL still pass resolved tokens explicitly to `generateTokenIndex` (no behavioral difference in output, but internal data flow is explicit)
3. WHEN no `productTokens` is configured THEN the product token pipeline SHALL be skipped entirely (no staleness check, no output)
