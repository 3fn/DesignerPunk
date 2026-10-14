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

---

## Addendum (2026-10-12): exit code and index state verified by run; a false comment in the same function

### Verified by run (Ada, 2026-10-03)

**Setup**: a scratch directory outside the repository:
- a copy of `src/tokens/` and `src/types/`, with `src/tokens/component/` removed;
- `color.action.navigation` renamed in the copied `semantic/ColorTokens.ts`. That is a key DesignerPunk's built-in dark override map names (`src/tokens/themes/dark/SemanticOverrides.ts:183`);
- a minimal `designerpunk.config.ts` (`tokenSource: './src/tokens'`, `output: './dist/tokens'`).

**Command**: `tsx <repo>/src/cli/designerpunk.ts generate`, run from that directory against the repo's source at the time (`task/123-u3-onboarding`, local HEAD `0e1ca0553`). The repo tree was unchanged after the run, and the scratch directory was then deleted.

**Observed, in order**:
1. `✅ Semantic token validation passed`
2. `❌ Semantic override validation failed:`
3. `Orphaned override key "color.action.navigation": no matching semantic token in registry`
4. `⚠️  Token generation aborted due to override validation errors.`
5. `✅ Token index generated at …/token-index`
6. `✅ System tokens generated`
7. **Exit code 0.**

**Files after the run**:
- **No token files written.** `dist/tokens/` was created and left empty.
- **`token-index/` was written** (`components.yaml`, `meta.json`, `primitives.yaml`, `semantics.yaml`), with **0** semantic tokens marked `themeVarying: true`. The repository's own committed `token-index/semantics.yaml` has 9 at the same time. An aborted run therefore replaces a good index with one that has lost every theme-varying flag. The application MCP serves that index, and product-token generation reads it.

This resolves both items under "Unverified" above: the exit code, and what `generateTokenIndex` writes from the empty result.

### The second caller (verified by reading on `main`)

`scripts/generate-platform-tokens.ts:83` calls `generateTokenFiles(tokenInput, config)` and continues to component-token generation on the same non-throwing return. This is this repository's own `generate:platform-tokens`, which `prebuild` runs, so it has the same blindness. Not run.

### A false comment in the same function (verified by reading on `main`)

`src/generators/generateTokenFiles.ts:17-18` reads: "Theme overrides remain as static imports — they resolve from the config's themes array, independent of tokenSource." That is false:
- the three override maps are static imports from the package (`:19-21`);
- the function never reads `config.themes`; the only read in `generate` is the banner line in `src/cli/designerpunk.ts`.

The comment matters because a reader of this function would conclude that a registered theme is applied. The fix PR for this record touches the same lines, so it should correct the comment. Suggested text: `// Theme overrides are static imports of DesignerPunk's built-in maps; config.themes is not read here (Spec 129 item (i)).`

### Still unverified

- The script caller's behaviour, by run.
- Whether an abort through the semantic-reference path (`generateTokenFiles.ts:80-95`), rather than the override path, behaves the same. By reading, it returns the same `EMPTY_MODE_RESOLVED`; not run.
- What the application MCP reports from the degraded index. Not queried.

**No fix is authorized by this addendum.**

---

## Fixed (2026-10-13)

**Authority**: Peter's release-3 rulings of 2026-10-13 ("All as recommended"; record `.kiro/specs/123-consumer-distribution/completion/release-3-rulings-2026-10-13.md`, merged in #324), item 1: fix before the release-3 tag, in Ada's own `fix/` PR. That ruling activates this record's grant paths for the fix; only one of them was used (the new test file below).

**What changed** (`src/generators/generateTokenFiles.ts`):
- The three abort paths now **throw** `TokenGenerationAbortedError` (exported, `:38`) instead of returning an empty result: semantic references (`:103`), the dark override map (`:141`), the context override maps (`:170`). The per-token details are still logged first; the error's message carries the first one and a count of the rest. `EMPTY_MODE_RESOLVED` is deleted, so the function can no longer hand a caller an empty result.
- The output directory is now created only after validation passes (`:231`), so an abort leaves no trace on disk, not even an empty `dist/tokens/`.
- The false comment at the old `:17-18` now reads: "Theme overrides are static imports of DesignerPunk's built-in maps; config.themes is not read here (Spec 129 item (i)). They are not taken from tokenSource either."

**Throw, not a returned status.** Both callers already route a throw to failure: `runGenerate`'s `catch` (`src/cli/designerpunk.ts:294-298`) sets `systemFailed`, and the run exits 1 at `:325`; the build script's `catch` (`scripts/generate-platform-tokens.ts:163-165`) exits 1. Both call `generateTokenIndex` after `generateTokenFiles` in the same `try`, so neither can build the index from an aborted run. Neither caller file changed. A returned status would have needed an edit in both, and a third caller added later could forget to read it.

**Verified by run** (scratch copy of `src/tokens/` + `src/types/` outside the repo, `color.action.navigation` renamed, the repo's committed `token-index/` (9 `themeVarying: true`) copied in first):
- `designerpunk generate`, before: `⚠️ Token generation aborted…`, `✅ Token index generated`, `✅ System tokens generated`, **exit 0**, `dist/tokens/` empty, `token-index/` rewritten with **0** `themeVarying: true`.
- After: `❌ System token generation failed: Token generation aborted: semantic override validation failed: Orphaned override key "color.action.navigation": …`, **exit 1**, no `dist/`, `token-index/` byte-identical (9).
- `scripts/generate-platform-tokens.ts` (this record's "still unverified" item), before: wrote component tokens, DTCG and a 0-flag index, `✨ All platform files generated successfully!`, **exit 0**. After: `❌ Error generating platform files: TokenGenerationAbortedError: …`, **exit 1**, index untouched.

**Test**: `src/cli/__tests__/generateAbort.test.ts`, the real `generateTokenFiles` and `generateTokenIndex` on the repo's real token source through `runGenerate`. Three cases: a clean-source control (files and index written, ✅), the override path, and the semantic-reference path (this record's other unverified item). Each abort case expects exit 1, no ✅, no `dist/`, and the previous index byte-identical. Against the pre-fix code, both abort cases fail and the control passes.

**Behaviour change for this repository**: `npm run build` runs `generate:platform-tokens` in `prebuild`, so a token-source validation error now stops the build. That is intended. Thurgood is told through the fix PR.

**Not changed, and still open**:
- `governance/DesignerPunk-Integration-Guide.md:303` still describes the old behaviour ("still prints ✅ … exits 0 … (a known defect)"). Ada does not edit governance; the correction goes to Peter as a ballot proposal.
- After the failure, `runGenerate` prints `💡 Tip: Use --product-only to skip system token generation` even when no product tokens are configured (`src/cli/designerpunk.ts:321-323`). That predates this fix and is on the CLI side (Lina).
