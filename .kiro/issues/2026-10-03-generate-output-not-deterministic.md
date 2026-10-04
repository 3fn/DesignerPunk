# Issue: `generate` output is not deterministic. Ten output files carry a wall-clock timestamp, so the committed-output default and CI need N1 pay for it on every run

**Date**: 2026-10-03
**Status**: ACTIVE
**Owner**: Ada (generators and format providers: `src/generators/**`, `src/providers/**`, `src/build/product/emitters/**`). Thurgood owns the CI-needs text that works around this (`src/cli/templates/starter-specs/ci-needs/needs.md`, N1).
**Trigger**: **the first of these after Spec 123 U3 merges**:
- (a) a `fix/` PR opened on Peter's go;
- (b) Spec 129's design phase opening, since it rewrites the same generators;
- (c) the first reported merge conflict or noise complaint on committed platform output from a consumer.

Not blocking release 3. N1 already carries a working `git diff -I` workaround, and Thurgood verified it by run.
**Source**: Spec 123 Task 21 bite runs (Thurgood, scratch born repo from a packed tarball, `init --target=cc`, `generate`; verified by run) and Ada's source read (2026-10-03). Peter's go was to file, not to fix.

---

## The gap (VERIFIED by reading; run-verified by Thurgood for the system files)

Each `generate` run writes `new Date().toISOString()` into:

| Files | Where the stamp comes from |
|---|---|
| `DesignTokens.web.css`, `DesignTokens.ios.swift`, `DesignTokens.android.kt` | `src/providers/WebFormatGenerator.ts:63,69`; `src/providers/iOSFormatGenerator.ts:64,70`; `src/providers/AndroidFormatGenerator.ts:51,58,72` (a `Generated:` line) |
| `ComponentTokens.web.css`, `.ios.swift`, `.android.kt` | `src/generators/TokenFileGenerator.ts:301,307`, `:376,382`, `:455,461` (a `Generated:` line) |
| `DesignTokens.dtcg.json` | `src/generators/DTCGFormatGenerator.ts:238` (`"generatedAt"`) |
| `<output>/product/ProductTokens.web.css`, `.ios.swift`, `.android.kt` | `src/build/product/emitters/WebEmitter.ts:12`; `SwiftEmitter.ts:25`; `KotlinEmitter.ts:36` (a `Product tokens — generated <ISO>` line). Written only when `productTokens` is configured. |

`DesignTokens.figma.json` carries no timestamp (VERIFIED: none in `dist/DesignTokens.figma.json`).

## Consequences

- **Spec 123 DD1 (platform output committed by default; `.kiro/specs/123-consumer-distribution/design.md:1036-1043`).**
  - Every `generate` run modifies all seven system files, ten with product tokens, even when no token changed.
  - Two teammates who both run `generate` produce competing edits to the same header lines.
  - So committed output carries diff noise and avoidable merge conflicts. This is derived from the line positions, not observed.
- **CI need N1 ("committed platform output matches `generate`", `needs.md:19-28`).**
  - A plain byte comparison is red on every run.
  - N1 works around this with `git diff --exit-code -I 'Generated: |generatedAt|Product tokens — generated'`. That workaround needs git 2.30 or later.
  - It also couples the check's correctness to the exact stamp strings: change a stamp's wording and N1 silently goes red, or matches too broadly.
  - The untracked-file condition had to be rewritten for the same reason. `git status --porcelain` lists every stamped file as modified, so it was replaced by `git ls-files --others --exclude-standard`.
- **This repo.** Running `npm run build` on a clean `main` already dirties committed generated files by timestamp alone (see `2026-09-26-committed-token-index-stale.md`, item: `docs/tokens.css` "timestamp only").

## Related, not duplicated

- `2026-06-26-token-index-ordering-readdirsync-portability.md`: a different determinism axis (index ordering by `readdirSync`). If both are fixed, decide them together, because both are "same input → same bytes".
- `2026-10-01-in-repo-generate-output-contaminates-package-dist.md`: its packaging comparison found 11 files "that differ only in a `Generated:` timestamp". That is the same root cause, seen from the release side.

## Unverified

- That the output is byte-identical across runs apart from these lines. The generators sort deterministically by inspection only. Thurgood's run is the evidence for the system files.
- The product-token files' stamp, by run (source read only).

## Fix shape (not done here; the pick is Peter's)

There are three defensible options, and I don't pick between them:
1. **Drop the wall-clock stamps and stamp the real `@3fn/core` version instead.** My lean. Note that the headers' current `Version: 1.0.0` is a hard-coded constant (`src/generators/generateTokenFiles.ts:224`, VERIFIED in `dist/DesignTokens.web.css:4`), not the package version. That is a second, smaller inaccuracy this fix should correct.
2. **Honour `SOURCE_DATE_EPOCH`** (the reproducible-builds convention): a fixed time when set, wall-clock otherwise. Keeps the stamp, but consumers must know to set it.
3. **Replace the stamp with a content hash of the token source.** It changes only when tokens change, so it is meaningful and deterministic, but it is new code in every provider.

Whichever is picked:
- Add a test: run `generate` twice on the same input, then byte-compare.
- Remove N1's `-I` clause in the same release (Thurgood's text; a grant or his own PR).

## Grant paths

**Proposed for Peter.** This list is not activated by this record; README rule 8.
- `src/providers/WebFormatGenerator.ts`, `src/providers/iOSFormatGenerator.ts`, `src/providers/AndroidFormatGenerator.ts`
- `src/build/product/emitters/WebEmitter.ts`, `SwiftEmitter.ts`, `KotlinEmitter.ts`
- `src/cli/templates/starter-specs/ci-needs/needs.md`, for Thurgood: N1's `-I` clause.

`src/generators/**` is in Ada's write scope.

## Counter-argument and what survives

- **"A timestamp tells someone debugging a stale file when it was built."**
  - Fold-back: options 1 and 3 keep a provenance line (version, or source hash) that answers "is this stale?" better than a time does.
  - **What survives**: a wall-clock time answers "when", which neither replacement does. Someone who relies on it, for example to compare against a deploy log, loses it under option 1.
- **"N1's `-I` already works, so this is cosmetic."**
  - **What survives**:
    - the merge-conflict cost under DD1 is not cosmetic for a team;
    - the `-I` coupling is a standing fragility in a minimal-core check;
    - git under 2.30 cannot run N1 at all.

**No fix is authorized by this record.**
