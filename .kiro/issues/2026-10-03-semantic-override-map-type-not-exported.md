# Issue: `SemanticOverrideMap`, the type a theme's overrides are written in, is not exported from `@3fn/core/config`

**Date**: 2026-10-03
**Status**: ACTIVE
**Owner**: Ada (theme registry and `defineConfig` authoring guidance).
**Trigger**: **Spec 129's requirements round.** That is when registering a custom theme starts to change output (Spec 129 scope item (i)), so it is the first time a consumer has a reason to write an override map. Until then, a registered theme does nothing (Integration Guide § Reference › Themes). The missing export has no live consumer impact, and fixing it alone would invite authoring for a feature that does not run yet.
**Source**: Ada's Integration Guide review for Spec 123 Task 19.4 (2026-10-03). The old "Creating a Theme" example imported this type from `@3fn/core/config`; 19.4 removed that example. Peter's go was to file, not to fix.

---

## The gap (VERIFIED by reading)

- **The type is defined here and not exported from the package.** It is defined at `src/tokens/themes/types.ts:20` (`export type SemanticOverrideMap = Record<string, SemanticOverride>`). `@3fn/core/config` exports only `defineConfig`, `DesignerPunkConfig`, `ConfigTheme`, `loadConfig` and `ResolvedConfig` (`src/config/index.ts:4-7`).
- **`ConfigTheme.overrides` is typed as `SemanticOverrideMap`** (`src/config/defineConfig.ts:26,30-34`). So the type is reachable only indirectly, as `ConfigTheme['overrides']`.
- **The workaround in a born repo.** `init` copies the full token tree, including `src/tokens/themes/types.ts` (`src/cli/init.ts:193-202`). A consumer can therefore import the type from their own `./src/tokens/themes/types`, which is what the built-in theme files do (e.g. `src/tokens/themes/wcag/SemanticOverrides.ts:11`).

## Related surface (doc accuracy; ballot-gated, so not fixed by any code PR)

`governance/Token-Governance.md:249` says "The pipeline discovers and generates output for all registered themes." Today that is false. `config.themes` is read only to print the `Themes:` line (`src/cli/designerpunk.ts:241-242`), and generation registers only the built-in `dark` and `wcag` (`src/generators/generateTokenFiles.ts:136-145`).

Line 546 of the same doc ("Product themes are registered via `designerpunk.config.ts`") reads as if registration works. The same text reaches agents through the generated Ada prompt's token-governance embed.

This is the doc half of the existing `2026-06-28-spec-094-platform-theme-emission-unwired.md`. It is recorded here so it is not lost. The correction is Ada's to draft as a ballot proposal, which Peter ratifies, at the same trigger.

## Fix shape (not done here)

1. **Export the types.** Add `SemanticOverrideMap` (and `SemanticOverride`) to `src/config/index.ts`, so `import type { SemanticOverrideMap } from '@3fn/core/config'` resolves.
2. **Add a test.** A type-level test or a consumer-guard case that imports it from the package subpath.
3. **Draft the doc correction.** A Token-Governance § "Theme Registry" ballot proposal that says what runs today.

## Grant paths

**Proposed for Peter.** This list is not activated by this record; README rule 8.
- `src/config/index.ts` (outside Ada's write scope).
- The test file, named when the PR opens.

The governance doc change goes through the ballot process, not a grant.

## Counter-argument and what survives

- **"Leave it unexported. Consumers should type overrides as `ConfigTheme['overrides']`, which keeps the public surface smaller."**
  - Fold-back: that is a real option, and it costs nothing.
  - **What survives**: every built-in theme file and every doc example writes `SemanticOverrideMap`. A consumer copying them hits a missing-export error.
  - The choice between exporting the type and documenting the indexed type is a fork. It is Peter's pick at the trigger.

**Unverified**: whether `dist/config/index.d.ts` in a packed tarball matches `src/config/index.ts`. I did not inspect a tarball.

**No fix is authorized by this record.**
