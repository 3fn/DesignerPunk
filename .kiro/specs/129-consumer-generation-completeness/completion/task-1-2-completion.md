# Task 1.2 Completion: Product-token fixture

**Date**: 2026-11-06
**Task**: 1.2 Product-token fixture (Spec 129, Task 1, Unit 1)
**Agent**: Ada (Sonnet) · **Type**: Implementation · **Status**: Complete on the branch (accepted at U1's merge)

## What changed

- `harness/fixtures/product-tokens/harness.yaml` (new): the harness's product-token input, two tokens, one `ref` each: `actionPrimaryRef` → `color.action.primary` (one of the five WCAG-only colours: `themeVarying: false` in the index, a `theme.` name on iOS and Android) and `bodyTypographyRef` → `typography.bodyMd` (a composite: the index names it with a list on web). `consumer.ts` copies this folder into the consumer root and sets `productTokens` in the consumer's config (1.1).
- Four tests in `scripts/harness/__tests__/consumer.test.ts` (the last `describe`): the fixture holds exactly two tokens, both refs; exactly one ref is a WCAG-only colour and one a composite, each decided from the shipped `token-index/semantics.yaml` (so a rename or a re-flag in the index goes red here); and a negative case showing the two predicates reject a plain colour.

## Targeted tests run

- `npm run test:scripts -- scripts/harness` → 42 passed (4 of them this subtask's).
- Through the driver (1.1's real runs): `generate` accepted both refs without error and wrote the shapes quoted in 1.1's completion doc, so the fixture produces the non-compiling output the harness is meant to see; `designerpunk validate-product-tokens` was not run, because its `refs not in index` check passes any ref the index holds.

## Application-time adaptations

1. The file carries a header comment saying not to "fix" the fixture to make a lane green: the repair is in the generator, and the list edit retiring the entry rides that PR (Req 3.3). The comment sits in the YAML, not in a README, because `harness/README.md` is Task 2's file.
2. The category is `harness` (the file name), giving the Swift enum `ProductHarness`. Names are `camelCase`, as the indexer requires.
3. Tagging is Task 5.2's, by cause (tasks.md: row 2's record for theme getters, row 13's for composite and WCAG-only references). What the fixture emits, so the tag can be chosen from the entry: `actionPrimaryRef` writes `DesignTokens.theme.colorActionPrimary` (iOS) and `DesignTokens.theme.color_action_primary` (Android), a `theme.` path; `bodyTypographyRef` writes `DesignTokens.typographyBodyMd` (iOS) and `DesignTokens.typography_body_md` (Android), a stem. I have not compiled either; whether each lands as an entry on a baseline list is the first full run's to show.
