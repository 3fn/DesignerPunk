# Design Outline: Token Source Portability

**Date**: 2026-05-09
**Spec**: 104 - Token Source Portability
**Status**: Design Outline
**Author**: Thurgood (governance framing) → Ada (implementation ownership)
**Origin**: `.kiro/issues/ada-2026-05-09-tokenSource-followup copy.md`

---

## Problem Statement

Token definition files in `src/tokens/` have deep dependencies on core's internal module structure (`src/types/`, `src/constants/`, `src/build/`). When product repos use `tokenSource` to point the pipeline at their local copy of these files, the imports fail because the supporting infrastructure doesn't exist locally.

The 11.2.1 patch addressed `../types/*` imports via a subpath export and init-time transform, but 5 additional files have non-type dependencies that remain broken:

| Import | File | Dependency |
|--------|------|-----------|
| `../constants/StrategicFlexibilityTokens` | SpacingTokens.ts | Small constant array |
| `../../build/tokens/UnitConverter` | TypographyTokens.ts | Build utility |
| `../../build/tokens` (defineComponentTokens) | component token re-exports | Build registry |
| Cross-directory component imports | semantic/ColorTokens.ts | Component token files |

### Root Cause

Token definition files were never designed to be portable. They evolved as internal modules with free access to the entire `src/` tree. The `tokenSource` feature (Spec 103) assumed token files would be self-contained, but they aren't.

### Why Patching Doesn't Scale

Each new internal import added to a token file silently breaks `tokenSource` in product repos. The failure is discovered at consumption time, not authoring time. Adding subpath exports and init transforms is reactive — it doesn't prevent the problem from recurring.

---

## Proposed Solution

**Make token definition files self-contained by design, enforced by a lint boundary.**

### Principle

Token files are a **public authoring surface**. They ship to product repos and must work with only `@3fn/core/types` as an external dependency. Any other dependency is either:
- Inlined into the token file (constants, small utilities)
- Moved to the generation layer (build-time transformations)
- Removed (unnecessary coupling)

### Concrete Changes

#### 1. Move `STRATEGIC_FLEXIBILITY_TOKENS` into token source

The constant is a small array listing which tokens are strategic flexibility exceptions. It belongs with the tokens, not in a separate `src/constants/` directory.

**From**: `src/constants/StrategicFlexibilityTokens.ts` (imported by SpacingTokens.ts)
**To**: Declared directly in `src/tokens/SpacingTokens.ts` (or a `src/tokens/shared-constants.ts` if reused across families)

#### 2. Remove `UnitConverter` dependency from token definitions

If `TypographyTokens.ts` uses `UnitConverter` at definition time, that's a design smell. Token files should declare raw values. Unit conversion is a generation-time concern.

**Action**: Move the conversion logic to the generator. Token file declares the raw value; generator applies conversion when producing platform output.

#### 3. Remove `defineComponentTokens` import from token source

Component token registration (`defineComponentTokens()`) is a build-system concern. If semantic token files import component token files for re-export, that coupling is backwards.

**Action**: Investigate and decouple. Component tokens should register themselves independently, not be pulled in by semantic token files.

#### 4. Remove cross-directory component imports from semantic tokens

If `semantic/ColorTokens.ts` imports from `../../components/core/*/tokens`, that's a layering violation (semantic tokens depending on components).

**Action**: Investigate the actual dependency. If it's for token value references, those should be expressed as primitive references, not direct imports.

#### 5. Add lint boundary enforcement

A test or lint rule in core that enforces: **files in `src/tokens/` may only import from `../types/` (or `@3fn/core/types`), from within `src/tokens/` itself, or from node_modules packages.**

Any other import pattern fails CI, catching drift at authoring time.

#### 6. Component token portability

Component tokens use `defineComponentTokens()` from `src/build/tokens/` and import primitive token objects from `src/tokens/`. When `tokenSource` is set, component tokens should resolve from the local source so that:
- Edited primitive values are reflected in component token output
- New component tokens defined locally are included in generation

**Architecture**:

Component token files live in two locations:
- `src/tokens/component/` (family-shared tokens like Progress)
- `src/components/core/*/tokens.ts` (component-specific tokens like ButtonIcon)

Both are copied to product repos by `npx designerpunk init`. Both import primitives via relative paths that resolve correctly within the copied structure. The only broken import is `defineComponentTokens` from `../../build/tokens` (or `../../../build/tokens`).

**Fix**:

1. **Add `@3fn/core/build` subpath export** — exports `defineComponentTokens` function
2. **Extend init transform** — rewrite `../build/tokens` and `../../build/tokens` imports to `@3fn/core/build`
3. **Wire component token loading into `tokenSource` resolution** — when `tokenSource` is set, the CLI loads component token files from the local source (triggering `defineComponentTokens()` side effects that populate the registry) instead of from the package

The `componentTokens` config field already exists in `defineConfig()`:
```typescript
componentTokens: ['./src/components/core', './src/tokens/component']
```

When `tokenSource` is set, the CLI should:
1. Resolve `componentTokens` paths relative to config directory
2. Find all `*.tokens.ts` files in those directories
3. `require()` each file (triggering `defineComponentTokens()` registration)
4. The generator then reads from `ComponentTokenRegistry.getAll()` as today

This means component tokens use the local primitive objects (since the component token files import primitives via relative paths within the local source tree), and the registry gets populated from local definitions.

#### 7. Remove init transform for types (cleanup)

Once token files are self-contained, the `rewriteTypeImports` transform in `init.ts` becomes unnecessary. Token files use `@3fn/core/types` directly in core (with a tsconfig path alias mapping it to `../types/` for local development), or they use relative `../types/` imports that resolve in both contexts because the types directory ships with the token source.

**Decision needed**: Do token files in core use `@3fn/core/types` (requires tsconfig paths for local dev) or `../types/` (requires the types directory to ship alongside tokens in product repos)? The simpler answer may be: ship `src/types/` as part of the token source copy (it's 5 small files, ~200 lines total).

---

## Scope Boundaries

### In Scope
- Refactor primitive/semantic token files to remove non-type internal dependencies (2 files)
- Move/inline constants used by token files
- Move build-time logic from token definitions to generators
- Add lint boundary test for `src/tokens/` import restrictions
- Clean up or simplify the init transform
- **Component token portability**: make component tokens resolve from local source when `tokenSource` is set
- Add `@3fn/core/build` subpath export (for `defineComponentTokens`)
- Wire `componentTokens` config into the `tokenSource` resolution path
- Update CLI to load local component token files before generation

### Out of Scope
- Theme override portability (already works — resolves from config)
- Token file API changes (no changes to `PrimitiveToken` interface or token values)
- New token families or token modifications
- `npx designerpunk migrate` command (documentation only for existing repos)

---

## Key Design Decisions to Resolve

### Decision 1: How do token files import types?

**Option A**: Token files use `@3fn/core/types` everywhere (core uses tsconfig `paths` to alias this to `./src/types/` locally)
- Pro: Single import style works in both core and product repos
- Con: Requires tsconfig paths configuration; IDE navigation may be affected

**Option B**: Token files use relative `../types/` imports; init copies `src/types/` alongside `src/tokens/`
- Pro: No tsconfig magic; relative imports just work
- Con: Product repos get a `src/types/` directory they shouldn't edit; slightly larger footprint

**Option C**: Keep the 11.2.1 approach (relative imports + init transform rewrites them)
- Pro: No changes to core token files
- Con: Fragile transform; doesn't solve the deeper dependencies

**Recommendation**: Option B. Ship `src/types/` with the token source. It's 5 files, ~200 lines, read-only in product repos. Simple, no magic.

### Decision 2: Where does `STRATEGIC_FLEXIBILITY_TOKENS` live?

**Option A**: Inline in `SpacingTokens.ts`
- Pro: Zero external dependencies; fully self-contained
- Con: If other token families reference it, duplication

**Option B**: `src/tokens/shared-constants.ts` (new file within token source)
- Pro: Reusable across token families; ships with token source
- Con: One more file

**Recommendation**: Check if it's used by multiple files. If only SpacingTokens, inline it. If shared, create `shared-constants.ts`.

### Decision 3: What does the lint boundary enforce?

**Allowed imports from `src/tokens/**`**:
- `../types/*` or `../../types/*` (relative to token file depth)
- `@3fn/core/types` (package import)
- Other files within `src/tokens/` (intra-token-source imports)
- `node_modules` packages

**Disallowed**:
- `../constants/*`, `../../build/*`, `../../components/*`, or any other `src/` directory outside `tokens/` and `types/`

### Decision 4: How does the CLI load local component tokens?

**Option A**: CLI scans `componentTokens` directories for `*.tokens.ts` files and `require()`s each one
- Pro: Simple, uses existing `componentTokens` config field
- Con: Glob scanning adds a dependency; must handle nested directories

**Option B**: CLI requires a barrel file (e.g., `component-tokens.ts`) that re-exports all component token files
- Pro: Explicit, no scanning needed
- Con: Product developer must maintain the barrel when adding component tokens

**Option C**: CLI loads the same files that `scripts/generate-platform-tokens.ts` currently imports (known list)
- Pro: Matches existing behavior exactly
- Con: Hardcoded list, doesn't scale to product-defined component tokens

**Recommendation**: Option A. The `componentTokens` config already accepts directory paths. Scanning for `*.tokens.ts` is a simple glob. This scales to product repos adding their own component tokens without maintaining a barrel.

---

## Risks

### Risk 1: Hidden dependencies we haven't found yet

Ada's table shows 5 files, but there may be more subtle dependencies (e.g., side effects, global registrations). The lint boundary will catch these during implementation.

**Mitigation**: Run the lint rule first, fix everything it catches.

### Risk 2: Moving logic to generators may change output

If `UnitConverter` in `TypographyTokens.ts` produces values that end up in the token definition (not just generation), moving it could change token values.

**Mitigation**: Regression test — token values before and after refactor must be identical.

### Risk 3: Breaking existing product repos

Product repos scaffolded before this fix have the old import patterns. They'll continue to fail until they re-run init or manually update imports.

**Mitigation**: Document in release notes. Provide a one-liner codemod or recommend re-running `npx designerpunk init` (which uses merge-mode and won't overwrite existing customizations... but also won't update existing files). May need a `npx designerpunk migrate` command or manual instructions.

---

## Stakeholder Review

- **Ada** (primary): Owns token files and pipeline. Will implement the refactoring and component token resolution wiring. Should validate that the lint boundary doesn't constrain legitimate token authoring patterns.
- **Lina** (primary): Component tokens are now in scope. Should validate that local component token loading doesn't break the registry-based generation path, and that the `defineComponentTokens` import rewriting works for component token files in `src/components/core/*/tokens.ts`.
- **Leonardo** (secondary): Product architect consuming the pipeline. Can validate the DX story — when `tokenSource` is set, ALL local token edits (primitive, semantic, and component) take effect.

---

## Open Questions

1. ~~Is `UnitConverter` usage in `TypographyTokens.ts` producing values stored in the token definition, or is it only used for platform output generation?~~ **Answered by Ada**: Stored value. Inline `Math.round(16 * 0.88)`.

2. ~~What exactly do the cross-directory component imports in `semantic/ColorTokens.ts` do?~~ **Answered by Ada**: JSDoc only, not runtime imports. Removed from scope.

3. Should existing product repos get a migration path (`npx designerpunk migrate`) or just documentation? Ada recommends docs only (1 product repo exists).

4. **NEW**: When `tokenSource` is set and the CLI loads local component token files, should it REPLACE the package's component tokens entirely, or MERGE (local overrides package)? Recommendation: replace entirely (consistent with primitive/semantic behavior — `tokenSource` is all-or-nothing).

5. **NEW**: Component token files in `src/components/core/*/tokens.ts` import primitives via `../../../tokens/SpacingTokens`. After init copies both `src/tokens/` and `src/components/core/`, does this relative path resolve correctly in the product repo's directory structure? (Should be yes — init preserves the relative structure.)

6. **NEW**: Should the lint boundary also apply to component token files (`src/components/core/*/tokens.ts`), or only to `src/tokens/`? Component token files legitimately import from `src/build/tokens` (for `defineComponentTokens`) — but after the subpath export, they'd import from `@3fn/core/build` instead.
