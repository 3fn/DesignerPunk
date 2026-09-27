# Issue: the published browser bundle embeds absolute build-machine paths

**Date**: 2026-09-27
**Status**: ACTIVE
**Owner**: Lina (the component browser-bundle build, `scripts/build-browser-bundles.js` + `scripts/esbuild-css-plugin.js`)
**Trigger**: **before Spec 123 release 1 publishes.** The leak ships in every tarball, and release 1 is the next publish.
**Source**: Spec 123 U1 Task 6 (Ada) noticed this; the steward confirmed it on 2026-09-27 (27 occurrences in a local `dist/browser/designerpunk.esm.js`). It predates U1. Peter ruled that it be filed.

## The defect

`scripts/esbuild-css-plugin.js`'s `css-as-string` plugin resolves each CSS import to an **absolute** path (`path.resolve(...)`) in its own namespace. esbuild's non-minified output then writes a module-path comment per inlined CSS file, `// css-as-string:/Users/<name>/…/src/components/…/X.web.css`. The ESM bundle ships, so every published tarball carries the publishing machine's home-directory path.

## Constraint: don't break the name contract

Spec 123 Task 6's `scripts/build-name-contract.ts` **parses these comments** (`/^\/\/ css-as-string:(.+)$/`, around L176) to recover the bundle's module list for its bundle ⊆ src check. A fix that makes the paths relative (e.g. relative to the package root), or drops the comments, has to update that parser in the same change and keep the ⊆ check's bite green. If the fix lands before U1 merges, coordinate with the U1 branch, because `build-name-contract.ts` exists only there until U1 merges.

## Test

A guard asserting the built ESM/UMD bundles contain no absolute path to the build machine (no `/Users/`, `/home/` or `C:\\` prefixes), with a bite.

## Filed by

Steward (main-loop), 2026-09-27, at Peter's direction.
