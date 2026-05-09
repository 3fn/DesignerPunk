# Requirements Document: Pipeline DX — Source Resolution & Validation

**Date**: 2026-05-09
**Spec**: 103 - Pipeline DX: Source Resolution & Validation
**Status**: Requirements Phase
**Dependencies**: Spec 094 (Portable Pipeline and Theme Registry) — complete

---

## Introduction

Product repos consuming `@3fn/core` via the pipeline (`npx designerpunk generate`) encounter invisible source resolution, no configurable token source path, and no standalone token validation. This spec adds a `tokenSource` config option, transparent source display, and a `validate` command to address these DX failures.

**Architectural principle**: The generation function becomes source-agnostic via dependency injection. The CLI layer resolves tokens from the configured source and passes raw token arrays to the generator. The generator builds registries internally from injected data.

**V1 scope**: Primitive and semantic tokens only. Component tokens continue to resolve from the package via registry-based side-effect imports. Theme overrides resolve from the config's `themes` array, independent of `tokenSource`. These are documented known limitations.

---

## Requirements

### Requirement 1: Token Source Configuration

**User Story**: As a product developer, I want to configure where the pipeline reads token definitions from, so that I can iterate on local token source without editing `node_modules/`.

#### Acceptance Criteria

1. WHEN a `designerpunk.config.ts` includes a `tokenSource` field THEN the pipeline SHALL resolve primitive and semantic tokens from that path instead of the installed package.
2. WHEN `tokenSource` is omitted from config THEN the pipeline SHALL resolve tokens from the installed package's `src/tokens/` directory (current default behavior, no breaking change).
3. WHEN `tokenSource` is set THEN the path SHALL be resolved relative to the config file's directory.
4. WHEN `tokenSource` is set THEN the pipeline SHALL treat it as a complete token source — no fallback to the package for missing token families.
5. WHEN `tokenSource` is set THEN theme overrides SHALL continue to resolve from the config's `themes` array, independent of the token source path.
6. WHEN `tokenSource` is set THEN component token generation SHALL continue to use the existing registry-based resolution from the package (known V1 limitation).

---

### Requirement 2: Token Source Barrel Contract

**User Story**: As a product developer, I want clear errors when my local token source is misconfigured, so that I can fix structural issues before generation fails cryptically.

#### Acceptance Criteria

1. WHEN `tokenSource` is set THEN the pipeline SHALL verify the path contains a barrel export providing `getAllPrimitiveTokens`.
2. WHEN `tokenSource` is set THEN the pipeline SHALL verify the path contains a `semantic/` subdirectory with a barrel export providing `getAllSemanticTokens`.
3. IF the barrel verification fails THEN the pipeline SHALL emit an error message specifying which export is missing and the expected structure.
4. IF the barrel verification passes THEN the pipeline SHALL proceed with token resolution from that source.
5. The barrel contract SHALL NOT require theme override exports, component token exports, or any directory structure beyond the two barrel files.

---

### Requirement 3: Dependency Injection Refactor

**User Story**: As a pipeline maintainer, I want the generation function to accept token data as parameters, so that the generator is source-agnostic and testable independent of file system layout.

#### Acceptance Criteria

1. WHEN `generateTokenFiles()` is called THEN it SHALL accept primitive and semantic token arrays as parameters rather than importing them via static paths.
2. WHEN token arrays are injected THEN the generator SHALL build registries (`PrimitiveTokenRegistry`, `SemanticTokenRegistry`) internally from the injected data.
3. WHEN the DI refactor is complete THEN all existing call sites of `generateTokenFiles()` SHALL be updated to pass resolved token data.
4. The refactored function SHALL produce identical output to the current implementation for the same token input.
5. Component token generation SHALL remain registry-based (populated via side-effect imports) and is NOT refactored in this spec.

---

### Requirement 4: Transparent Source Display

**User Story**: As a developer or AI agent running the pipeline, I want to see exactly where tokens are being read from, so that I know which files to edit and can diagnose stale output.

#### Acceptance Criteria

1. WHEN the pipeline starts generation THEN it SHALL display the resolved token source path in its startup output.
2. WHEN tokens are resolved from the installed package THEN the display SHALL include a `(package)` annotation.
3. WHEN tokens are resolved from a configured `tokenSource` path THEN the display SHALL include a `(local)` annotation.
4. The startup output SHALL replace the current misleading "Source:" line (which shows `cwd`) with an accurate "Tokens:" line showing the actual resolution path.
5. WHEN `tokenSource` is set THEN the displayed path SHALL be relative to the project root for readability (not an absolute path).

---

### Requirement 5: Standalone Validation Command

**User Story**: As a product developer, I want to validate token definitions without generating files, so that I can catch mathematical, naming, and reference errors before committing changes.

#### Acceptance Criteria

1. WHEN `npx designerpunk validate` is run THEN the pipeline SHALL execute token validation checks against the active token source (configured `tokenSource` or package default).
2. WHEN validation runs THEN it SHALL check: semantic reference integrity (all semantic tokens reference valid primitives).
3. WHEN validation runs THEN it SHALL check: required field presence (all `PrimitiveToken` interface fields populated).
4. WHEN validation runs THEN it SHALL check: mathematical relationship validation (modular scale ratios, baseline grid alignment where applicable).
5. WHEN validation runs THEN it SHALL check: token family membership validation (tokens register successfully into their declared families).
6. IF all checks pass THEN the command SHALL exit with code 0 and display a success summary.
7. IF any check fails THEN the command SHALL exit with non-zero code and display specific errors with token names and failure reasons.
8. The `validate` command SHALL reuse existing validators (`SemanticTokenValidator`, `ThreeTierValidator`, `MathematicalRelationshipParser`) — it SHALL NOT duplicate validation logic.
9. The `validate` command SHALL be source-aware: it validates whichever source the pipeline would use for generation.
10. The `generate` command SHALL continue its existing generation-time validation (semantic reference checks) unchanged. No `--strict` flag is added.

---

### Requirement 6: CLI Command Registration

**User Story**: As a developer, I want `validate` to be a first-class CLI command alongside `generate`, so that it's discoverable and documented.

#### Acceptance Criteria

1. WHEN `npx designerpunk validate` is run THEN the CLI SHALL route to the validation handler.
2. WHEN `npx designerpunk --help` is run THEN the help output SHALL list `validate` with a brief description.
3. WHEN an unknown command is run THEN the existing error handling SHALL continue to show available commands including `validate`.

---

### Requirement 7: Documentation

**User Story**: As a product developer, I want documentation explaining the `tokenSource` config option and `validate` command, so that I can adopt them without reading source code.

#### Acceptance Criteria

1. The `defineConfig()` JSDoc SHALL document the `tokenSource` field including its purpose, default behavior, and the complete-source requirement.
2. The CLI help output SHALL describe the `validate` command's purpose and relationship to `generate`.
3. The `DesignerPunkConfig` interface SHALL include a TSDoc comment on the `tokenSource` field explaining resolution behavior.

---

## Scope Boundaries

### Explicitly In Scope
- `tokenSource` config option for primitive/semantic token resolution
- DI refactor of `generateTokenFiles()` to accept token arrays
- Transparent source display with `(package)` / `(local)` annotation
- `npx designerpunk validate` command orchestrating existing validators
- CLI registration and help text updates
- JSDoc/TSDoc documentation for new config field

### Explicitly Out of Scope (V1 Known Limitations)
- **Component token resolution**: Component tokens continue resolving from the package via registry-based side-effect imports. A product repo using `tokenSource` for primitives/semantics will still have component tokens referencing package primitives. This is a known asymmetry.
- **Theme override resolution from `tokenSource`**: Theme overrides always resolve from the config's `themes` array. `tokenSource` does not affect theme override paths.
- **Partial overlay / fallback**: `tokenSource` is all-or-nothing. No merge behavior between local and package sources.
- **Watch mode / hot reload**: No file watching when local source changes.
- **Staleness detection**: No modification-date comparison between local and package sources.
- **Machine-readable validation output**: Human-readable only for V1. JSON output deferred to V2.
- **Categorical token type** (Issue 3): Logged as future consideration, not addressed here.
- **Token contribution workflow**: How local edits flow back to core is not addressed.

---

## Traceability to Origin

| Issue | Origin | Requirement |
|-------|--------|-------------|
| Invisible source resolution | `.kiro/issues/ada-2026-05-09.md` § Issue 1 | Req 4 |
| No configurable token source | `.kiro/issues/ada-2026-05-09.md` § Issue 2 | Req 1, 2, 3 |
| No token validation from product repos | `.kiro/issues/ada-2026-05-09.md` § Issue 4 | Req 5, 6 |

## Traceability to Feedback Resolutions

| Resolution | Feedback Source | Requirement |
|-----------|----------------|-------------|
| A: Map to existing `tokenSourceRoot` | Ada #1 | Req 1 (AC 3) |
| B: V1 primitive/semantic only | Lina #1, Leo #6 | Req 1 (AC 6), Scope |
| C: Theme overrides independent | Lina #2, Leo #7 | Req 1 (AC 5) |
| D: Two commands, no `--strict` | Leo #4 | Req 5 (AC 10) |
| E: Complete source, no fallback | Leo #5 | Req 1 (AC 4) |
| F: Reuse existing validators | Ada #3 | Req 5 (AC 8) |
| G: Barrel contract formalized | Ada #4, Lina #2 | Req 2 |
| H: Inject raw arrays, not registries | Ada #2 | Req 3 (AC 2) |
| I: Component tokens remain registry-based | Lina #3 | Req 3 (AC 5), Scope |
| J: Machine-readable deferred to V2 | Leo #8 | Scope |
| K: Drop staleness detection | Ada #5, Lina #5 | Scope |
