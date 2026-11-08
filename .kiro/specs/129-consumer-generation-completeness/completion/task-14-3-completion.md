# Task 14.3 — Row (g)'s freshness test; the 133 outline correction; the one-copy rule

**Agent**: Ada (Sonnet)

## What changed

- `src/generators/__tests__/RootTokenFreshness.test.ts` (new): runs `scripts/generate-platform-tokens.ts --out <temp>` (new flag) and compares the committed `token-index/` files, and the eight `dist/` root token files when the build has run, byte for byte; a bite shows an altered file reads as "differs".
- `.kiro/specs/133-color-track/design-outline.md` § 4 corrected: the five generation files no longer import `src/tokens/ColorTokens.ts`, but still read it through the token set (three format generators, DTCG at three sites, the resolver's legacy branch); the barrel is the one static importer left.
- One copy per native file name: `consumer.ts` `overlayConsumerNativeCopies` writes the consumer's copy of `src/tokens/platforms/{ios,android}/` over the installed package's file of the same path, so the `pkg` tier compiles the consumer's copy, keyed under the package's path. No lane, key or list changes. Kenya's and Data's confirmations: see the parent completion doc.

## Targeted tests and result

`npm test -- src/generators/__tests__/RootTokenFreshness.test.ts`: 15 pass. `scripts/harness` suites: pass, including two new overlay cases.

## Application-time adaptations

- Row (g) is read as `dist/` plus the committed `token-index/`; the `dist/` arm skips when the build has not run (CI builds first).
- Nothing in `generate` reads `src/tokens/platforms/**`; the rule governs only what the harness compiles.

## Kenya's and Data's confirmations of the one-copy rule (verbatim)

**Kenya (iOS)**: confirmed — `overlayConsumerNativeCopies` (consumer.ts:342-358) overwrites the installed package's `src/tokens/platforms/ios/MotionTokens.swift` (the only .swift there) with the consumer's copy, before `generated` is listed (consumer.ts:484-487); `selectFiles` (harness/ios/lane.ts:243-262) then compiles that path once as the `pkg` tier and fails on any shared basename (`duplicates`), so a second copy cannot compile silently. No iOS lane change is needed. Read against `task/129-14-consumer-source` @ ec23a5a18. Edges, none a defect: the overlay is exact-case and non-recursive, so a differently-cased consumer file on a case-sensitive filesystem is skipped (package copy stays, still one copy), and a consumer file with no packaged counterpart is not compiled (consumer.test.ts:307-321 covers the skip).


**Data (Android)**: confirmed — the overlay (`scripts/harness/consumer.ts:342`, call at :484) overwrites the installed package's `src/tokens/platforms/android/MotionTokens.kt` in place, so the `pkg` tier (`harness/android/lane.ts:285`, `walkKotlin(pkgRoot)`) compiles the consumer's copy under the package path, and `assertOneCopyPerName([...pkgAbsolute, ...genAbsolute])` (lane.ts:~293) fails on any duplicate base name; `dist/DesignTokens.*`/`ComponentTokens.*` are already excluded (lane.ts:103); the `.kt` suffix check is case-sensitive on both sides, no lane change needed.


**Kenya's edge, recorded as her note, not a defect**: the overlay is exact-case, so on a case-sensitive filesystem a consumer file cased differently from the package's is not overlaid and the package's copy stays (still one copy). The row's text does not require a test for it, so none was added.
