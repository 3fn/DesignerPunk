# Issue: the shipped Jest preset maps four `@3fn/core/*` subpaths to `src/**/index.ts` files the package does not ship

> **Decision open with Peter**: fix inside U3 / separate PR before the release-3 tag / stated limitation.

**Date**: 2026-10-03
**Status**: ACTIVE
**Owner**: Lina (component-test surface: `src/testing/**`, the preset, `@3fn/core/testing`). Ada for any `package.json` `files[]` or `exports` change.
**Trigger**: **Peter's decision above.**
- If "fix inside U3": a dated amendment to U3's tasks.md.
- If "separate PR before the release-3 tag": a `fix/` PR on Peter's go, merged before the tag.
- If "stated limitation": the limitation sentence stays in the Integration Guide § "Running Component Tests" and in CI need N3's note, and this record's trigger becomes **the first post-release-3 `fix/` PR allowed to touch `src/testing/**`**.

**Source**: Lina's Spec 123 Task 19.4 owner review (2026-10-03). She reproduced the failure by packing the tarball and running Jest against it; the paragraph below is hers, verbatim. Ada's own verification is marked separately.

---

## The gap (Lina's paragraph, verbatim; VERIFIED by Lina's run)

**`@3fn/core/jest-preset` and `@3fn/core/testing` do not work in an installed package.** The shipped preset (`src/testing/jest-preset.ts:55-60`; compiled `dist/testing/jest-preset.js:84-91`) maps `@3fn/core/blend`, `/types`, `/testing` and `/config` to `src/blend/index.ts`, `src/types/index.ts`, `src/testing/index.ts` and `src/config/index.ts`, none of which `package.json` `files` (L15-58) ships (it ships `src/build/tokens/index.ts`, `src/types/PrimitiveToken.ts` and `SemanticToken.ts`, and the compiled `dist/testing/*`). Verified by packing the tarball and checking each mapped path (four MISSING, `/build` and the CSS mock present), and by running Jest against the extracted package: a test importing `@3fn/core/testing` fails with "Could not locate module @3fn/core/testing mapped as …/src/testing/index.ts", while a plain test passes. Separately, `@3fn/core/testing` resolves to `dist/testing/index.js`, which exports nine helpers and not `validateComponentName` or `validateTokenUsage` (`src/testing/index.ts` has no re-export; `src/testing/validators.ts:10` re-exports `../validators`, but `package.json` `exports` has no `./testing/validators` entry; the functions live at `src/validators/StemmaComponentNamingValidator.ts:127` and `StemmaTokenUsageValidator.ts:372`). The guide previously taught both (`tsconfig.test.json` with `commonjs`/`bundler` also disagreed with the one `init` writes, `src/cli/init.ts:291-292`; that last item was a guide-only error, now corrected, and `init`'s file is right). No test covers it: `tests/consumer-integration.test.ts` never references the preset (only string assertions at `init.test.ts:353` and `errorCatalog.test.ts:110`). Unverified: behaviour in a real `npm install` (my run used symlinked dev dependencies beside the extracted tarball), and what a consumer's own `moduleNameMapper` override would do. Fix shape (not authorized here): map to `dist/` (shipped) instead of `src/`, or ship the four `src` entries, and re-export the validators from `./testing` or add a `./testing/validators` export; add a packed-install Jest case to `test:consumer`. Owners: Lina (component-test surface), Ada for any `files[]`/`exports` change.

## Ada's verification and token-side note

- **VERIFIED by reading** at `ea348aa76`:
  - the preset's `moduleNameMapper` entries at `src/testing/jest-preset.ts:53-60`;
  - none of the four mapped `src/**/index.ts` paths matches a `package.json` `files` entry.
- **Not run by Ada.**
- **Token-side consequence (derived, not run).** `init` rewrites the consumer's copied token source to import `@3fn/core/types` (`src/cli/shared/transforms.ts:55`). So a consumer's Jest test that imports their own token source would hit the same "Could not locate module @3fn/core/types" error under the preset. That widens the impact past component tests to token tests. This bears on the files[] side of the fix, which is Ada's: shipping `src/types/index.ts` versus remapping to `dist/types/index.js` (exported at `package.json` `exports["./types"]`). I lean to remapping to `dist/`, because it adds no new shipped source. The pick is Lina's with Peter's go.

## Grant paths

**Proposed for Peter.** This list is not activated by this record; README rule 8.
- `src/testing/jest-preset.ts`, `src/testing/index.ts` (Lina)
- `package.json` `files` / `exports`, only if the fix ships source or adds an export (Ada; touches release scope)
- `tests/consumer-integration.test.ts`, or a new `test:consumer` case (Thurgood's test governance consulted)
- `src/cli/shared/errorCatalog.ts`, if its `@3fn/core/testing` string changes (Lina flagged `errorCatalog.ts:110`)

## Counter-argument and what survives

- **"State it as a limitation for release 3. Plain tests run, and the guide already says so."**
  - **What survives**: the preset is what `init` writes into every born repo (`init.test.ts:353`). A limitation means every consumer's first helper-using test fails, and the token-source case above is untested either way.

**No fix is authorized by this record.**
