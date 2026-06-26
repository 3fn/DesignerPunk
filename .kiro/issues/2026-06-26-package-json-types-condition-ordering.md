# Issue: `package.json` Export-Condition Ordering — `"types"` Listed After `"import"`/`"require"` (Unreachable for TS Consumers)

**Date**: 2026-06-26
**Severity**: Medium — TS consumers may not resolve bundled types via the conditional-export subpaths; emits esbuild/build warnings
**Discovered during**: Spec 124 (Component-Token Return Contract) baseline + build runs — the warning is pre-existing and surfaced consistently across every `npm run build` in the spec
**Type**: Packaging / export-map condition ordering
**Status**: Open (seeded)
**Primary owner**: likely the Spec 118 export work (module-resolution coherence) — `package.json` was untouched by 124

---

## Problem

In `package.json`, the conditional-export subpaths list `"types"` **after** `"import"`/`"require"`. Node/TypeScript condition resolution is first-match-wins in declaration order, so a `"types"` condition placed after `"import"`/`"require"` is **unreachable** — a TS consumer resolves `import`/`require` first and never reaches the type declarations through that subpath. This is the source of the recurring esbuild "package.json export-condition-ordering" warnings seen throughout the 124 build runs (build still exits 0).

## Why It Matters

- TS consumers importing through the affected subpaths may not pick up the bundled `.d.ts` types via the conditions, degrading type resolution / editor support.
- The warning is benign for the build but indicates an export map that does not behave as intended for typed consumers.

## Correct Fix (sketch)

Reorder each conditional-export subpath so `"types"` is listed **first** (before `"import"`/`"require"`/`"default"`), per the Node/TypeScript convention. This is a `package.json`-only change but touches consumer type-resolution behavior, so it should be verified against a real TS consumer.

## Scope / Notes

- `package.json` was **untouched by Spec 124** — this is strictly pre-existing.
- Belongs naturally with the Spec 118 export work (module-resolution coherence), where the export map is already in scope.
- Acceptance: each conditional-export subpath lists `"types"` first; the esbuild export-condition-ordering warnings disappear from `npm run build`; a TS consumer resolves bundled types through the subpaths.
