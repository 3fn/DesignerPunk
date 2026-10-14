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

## Fixed (2026-10-13)

**Authority**: Peter's release-3 ruling, item 2, "Fix before the tag" (`.kiro/specs/123-consumer-distribution/completion/release-3-rulings-2026-10-13.md`, merged #324). Fixed by Lina on `fix/jest-preset-shipped-paths`. The pick was to remap to the shipped `dist/` files (Ada's lean). No source is newly shipped and `package.json` is unchanged, so Ada's `files[]`/`exports` path was not needed.

- **The fix.** The preset's `@3fn/core/{blend,build,types,testing,config}` mappings are now derived from `package.json` `exports` (each subpath's `require` target) by the new `src/testing/presetMappings.ts`, which `src/testing/jest-preset.ts` spreads into `moduleNameMapper`. They are never hand-written paths. A subpath with no `require` target throws at preset load and names the subpath.
- **Wider than recorded.** `@3fn/core/build` was broken too: it was mapped to the shipped but uncompiled `src/build/tokens/index.ts`, which Jest does not transform under `node_modules` ("Must use import to load ES Module"; reproduced 2026-10-13 in a packed install). The Integration Guide's "`@3fn/core/build` is not affected" was false. The fix covers all five.
- **Verified in a packed install.** `npm pack` with scripts, `npm install` of the tarball into a fresh project, `init`, then the guide's devDependencies from the registry. A test of `@3fn/core/testing`'s helpers and a test of a copied token file (rewritten to `@3fn/core/types`) both pass, as do `/build`, `/config` and `/blend` (2 suites, 3 tests). The pre-fix mappings over the same install fail with "Could not locate module @3fn/core/testing" and "… @3fn/core/types".
- **Guards.**
  - In-repo: `src/testing/__tests__/presetMappings.test.ts`. Bite recorded: 2 of 5 cases go red against the pre-fix preset.
  - Packed install: `tests/consumer-integration.test.ts`, the "Release-3 item 2" describe, run by `npm run test:consumer`. Its Jest toolchain is symlinked from the repo's lockfile versions, not installed from the registry.
- **The `init` collision message** (`jestConfigCollisionMessage`) drops its "(in this version @3fn/core/testing does not load under the preset …)" clause. The design.md C27 A13 row takes the same amendment (Thurgood).
- **Not fixed here (still open).**
  - `validateComponentName` / `validateTokenUsage` are still not reachable from `@3fn/core/testing`. `dist/testing/validators.js` ships, but `exports` has no `./testing/validators` entry and `index.ts` does not re-export them. Fixing that is an `exports` change (Ada). The guide no longer teaches them.
  - The Integration Guide § "Running Component Tests" (L475) and the "Available Imports" row for `@3fn/core/testing` (L502) still state the limitation. That is a `governance/` edit, routed by the orchestrator.
- **Status**: RESOLVED on the fix branch, pending its merge.

### Consumer case — Thurgood's four conditions (2026-10-13, orchestrator run in a side worktree of `fix/jest-preset-shipped-paths`)
- (a) `@3fn/core` is installed from the packed tarball, never symlinked — satisfied (Lina, `tests/consumer-integration.test.ts` symlink loop skips it).
- (b) every mapped subpath resolves under the fixture's `node_modules/@3fn/core/dist/`, never the repo tree — satisfied by the mapping assertion (case 2).
- (c) the output names the symlinked toolchain — applied: the case title reads `(symlinked toolchain: jest 30.2.0, ts-jest 29.4.4, jest-environment-jsdom 30.2.0)`.
- (d) recorded bite of the case itself: with `src/testing/jest-preset.ts` restored from `fc6d122d4` (the pre-fix preset) and the package rebuilt, `npm run test:consumer -- -t "Release-3 item 2"` → `Tests: 2 failed, 54 skipped, 1 passed` — case 2 red (a mapped path is `src/…`, not `dist/`), case 3 red with `Could not locate module @3fn/core/testing mapped as:` and `Could not locate module @3fn/core/types mapped as:`; exit 1. With the fixed preset: `3 passed`, exit 0.
