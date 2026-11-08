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
