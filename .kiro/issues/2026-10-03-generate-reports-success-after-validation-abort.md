# Issue: `generate` prints "✅ System tokens generated" and exits 0 after its own validation aborted token output

**Date**: 2026-10-03
**Status**: ACTIVE
**Owner**: Ada (`src/generators/generateTokenFiles.ts`, the abort paths). Lina is consulted for the CLI side (`src/cli/designerpunk.ts` `runGenerate`), because she owns the CLI surface (see `2026-10-03-generate-product-only-resolves-from-cwd.md`).
**Trigger**: whichever fires first:
- **a `fix/` PR opened on Peter's go after Spec 123 U3 merges**, or
- **Spec 129's design phase opening on scope item (i), theme emission**. That work rewrites the same function's theme-registration block (`generateTokenFiles.ts:108-165`), so a fix that changes how the function signals failure should land with it or before it, not after.

Not blocking release 3. It needs a token-source error to fire, and a fresh `init` source passes `generate`'s own two checks.
**Source**: Ada's reviews of the Integration Guide for Spec 123 Task 19.4 (2026-10-03), relayed through the orchestrator. Peter's go was to file, not to fix.

---

## The gap (VERIFIED by reading; not run)

`generateTokenFiles` returns early on three validation failures, and on each it logs a ❌ and then **returns** `EMPTY_MODE_RESOLVED` instead of throwing:
- semantic references fail: `src/generators/generateTokenFiles.ts:80-95`;
- the dark override map names a token your source lacks: `:126-133`;
- the context override maps fail: `:156-162`.

`EMPTY_MODE_RESOLVED` is defined at `:33-38`. All three returns come before any file is written (the writes are at `:239-256`).

`runGenerate` treats a return as success:
- `src/cli/designerpunk.ts:253` takes the result;
- `:268-278` builds the token index from the empty result;
- `:279` prints `✅ System tokens generated`.

`systemFailed` is set only in the `catch` at `:280-284`. So the process exits 0 unless product tokens fail (`:306-312`).

## Concrete failure (derived from the code; not run)

1. In a born repo, rename or delete one of the semantic colour tokens that DesignerPunk's built-in dark or WCAG override maps name. For example, `color.action.primary` is named at `src/tokens/themes/wcag/SemanticOverrides.ts:20`. Then run `npx designerpunk generate`.
2. The console shows `Orphaned override key …`, `Token generation aborted`, and then `✅ System tokens generated`. The exit code is 0.
3. The output directory keeps the previous run's files.

**CI consequence.** The install guide's CI need N1 ("committed platform output matches `generate`", `src/cli/templates/starter-specs/ci-needs/needs.md:19-28`) would pass in this state, because:
- `generate` exited 0;
- the committed files are unchanged;
- yet they no longer match the token source.

N1's bite recipe (a changed value) does not exercise this path.

## Unverified

- What `generateTokenIndex` writes from the empty result: an index with no theme-varying flags or OKLCH readouts, or an unchanged one. Its comment (`generateTokenFiles.ts:28-31`) says callers "skip index population", but `generateTokenIndex` (`src/generators/generateTokenIndex.ts:140-152`) has no visible guard for an empty result. Not run.
- The exact exit code. It is derived from `designerpunk.ts:306-312`; not run.

## Fix shape (not done here)

1. **Signal failure from the abort paths.** Either throw, or return a status the caller must read. Throwing is the smaller change: `runGenerate`'s existing `catch` already sets `systemFailed`.
2. **Do not build the token index from an aborted run.**
3. **Add a test**: a token source missing one override-map key, run through `runGenerate` un-mocked at the generator seam, expecting exit 1 and no `✅`.

## Grant paths

**Proposed for Peter.** This list is not activated by this record; README rule 8.
- `src/cli/designerpunk.ts`, which is outside Ada's write scope. It is needed only if the fix reads a returned status rather than relying on the existing `catch`.
- `scripts/generate-platform-tokens.ts`. It is needed only if the fix reads a returned status.
- `src/cli/__tests__/generateRefusals.test.ts`, or a new sibling test file named when the PR opens.

`src/generators/**` is already in Ada's write scope.

## Counter-argument and what survives

- **"A token-source error is the user's to see in the log."**
  - Fold-back: the log does show it, which is why this is a moderate defect, not a silent one.
  - **What survives**: the last line says ✅, the exit code is 0, and CI reads exit codes, not logs.
- **"Throwing changes behaviour that callers may rely on."**
  - There are two callers (VERIFIED, `git grep`):
    - `src/cli/designerpunk.ts:253`;
    - `scripts/generate-platform-tokens.ts:83`, this repo's own `generate:platform-tokens`, which `prebuild` runs.
  - The script has the same blindness: it carries on to component-token generation and reports success.
  - Fold-back: the fix must cover both callers. A throw does that by construction.
  - **What survives**: a throw also stops this repo's `npm run build` on a token-source error. That is the intended outcome, but it changes this repo's build behaviour, and Thurgood should know before the PR.

**No fix is authorized by this record.**
