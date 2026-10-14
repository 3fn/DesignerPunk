# Issue: `generate` output is not deterministic. Ten output files carry a wall-clock timestamp, so the committed-output default and CI need N1 pay for it on every run

**Date**: 2026-10-03
**Status**: CLOSED 2026-10-13 (see § "Fixed (2026-10-13)" at the end of this file)
**Owner**: Ada (generators and format providers: `src/generators/**`, `src/providers/**`, `src/build/product/emitters/**`). Thurgood owns the CI-needs text that works around this (`src/cli/templates/starter-specs/ci-needs/needs.md`, N1).
**Trigger**: **the first of these after Spec 123 U3 merges**:
- (a) a `fix/` PR opened on Peter's go;
- (b) Spec 129's design phase opening, since it rewrites the same generators;
- (c) the first reported merge conflict or noise complaint on committed platform output from a consumer.

Not blocking release 3. N1 already carries a working `git diff -I` workaround, and Thurgood verified it by run. *(2026-10-13: no longer true. Thurgood replaced that clause with a plain `git diff --exit-code` in #337, which merges after this fix in #339. Release-3 rulings item 3 then made the fix itself a pre-tag item.)*
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

---

## Fixed (2026-10-13)

**Authority**: Peter's release-3 rulings of 2026-10-13 ("All as recommended"; `.kiro/specs/123-consumer-distribution/completion/release-3-rulings-2026-10-13.md`, merged in #324), item 3: fix before the release-3 tag; Ada picks the option. That ruling activates this record's grant paths for the providers and emitters. The N1 grant path is not used here: Thurgood applies N1's text.

**Pick: option 1.** The wall-clock stamps are dropped, and each header names the installed package instead: `Generated by: @3fn/core <version>`.
- Option 2 (`SOURCE_DATE_EPOCH`) was not picked. It keeps the stamp but only fixes the noise for people who know to set it. The default `generate` would stay noisy, and the default is what DD1 commits.
- Option 3 (a content hash) was not picked. It is new code in every provider, and the bytes it stamps already change exactly when the tokens do, so the hash adds no signal over the content itself.
- Counter-argument, folded in: "a time tells someone debugging when the file was built". The version line answers "what produced this", and `git log` answers "when" for committed output.
- **What survives**: someone who compared a header time against a deploy log loses that. Each `@3fn/core` upgrade also changes every header once (a version line), which is real but one-time per upgrade.

**What changed**:
- `src/generators/coreVersion.ts` (new): `getCoreVersion()` walks up from the module to the nearest `package.json` named `@3fn/core`. That works from `src/` and `dist/`, in this repository and in `node_modules`. It falls back to `'unknown'`, which is still deterministic. `generatedByLine()` renders the header line.
- The three providers (`src/providers/{Web,iOS,Android}FormatGenerator.ts`): the `Generated: <ISO>` and `Version:` lines become one `Generated by:` line. The default version is the core version, not `'1.0.0'`.
- `src/generators/TokenFileGenerator.ts`:
  - the three component-token headers get the same change;
  - both `version = '1.0.0'` defaults become the core version;
  - the `generatedAt: new Date()` metadata is removed.
- `src/generators/generateTokenFiles.ts` and `scripts/generate-platform-tokens.ts`: the hard-coded `version: '1.0.0'` arguments are removed (two and one), so the default applies.
- `src/generators/DTCGFormatGenerator.ts`:
  - `generatedAt` is no longer written;
  - `rosettaVersion` uses the same lookup.

  `src/generators/types/DTCGTypes.ts` makes `generatedAt` optional. The DTCG extension's own `version: '1.0.0'` is unchanged: it is deterministic, and what it versions is a separate question.
- The three product emitters (`src/build/product/emitters/{Web,Swift,Kotlin}Emitter.ts`): the header reads `Product tokens — generated by @3fn/core <version>` (the existing `Product tokens — generated` prefix is kept).

**Verified by run**:
- `src/generators/__tests__/GenerateDeterminism.test.ts` runs the real `runGenerate` twice, 1.1 s apart, on the repo's real token source, its 33 component-token modules and the product fixtures.
  - It byte-compares every file under the output directory and `token-index/`. The set includes all ten files this record names, plus Figma and the index.
  - It also asserts that no file contains an ISO timestamp and that headers name the real version.
  - Against the pre-fix sources it fails, listing exactly the ten files; after the fix it passes.
- The CLI twice from a scratch consumer outside the repo (system + product + DTCG): 15 files, byte-identical.
- `npm run generate:platform-tokens` twice in this repository: every `dist/` file and `token-index/` byte-identical.
- `npm run build` twice: the second build changes nothing tracked. `docs/tokens.css` takes a one-time header change, from the old two lines to `Generated by: @3fn/core 15.0.0`, which this PR commits. After that, a build on a clean `main` leaves it unchanged.

**Not changed, and still open**:
- N1's `-I` clause (`src/cli/templates/starter-specs/ci-needs/needs.md:24-25`): Thurgood's text, replaced by a plain `git diff --exit-code` in #337. That PR merges after this one; until it does, the clause does no harm, because it no longer matches the new header lines.
- `scripts/generate-token-types.ts:146` stamps a time into `src/types/generated/TokenTypes.ts`. That file is untracked and not consumer output, so it is out of this record's scope.
- The index-ordering determinism axis (`2026-06-26-token-index-ordering-readdirsync-portability.md`) is not addressed. Both runs here were on one filesystem.
