# Task 18.5 — The retired `dist/` names in the shipped consumer layer and three component comments

**Date**: 2026-11-08 · **Agent**: Thurgood (profile author), with Kenya, Data, Lina · **Authority**: tasks amendment 13 (#783) under Peter's ruling `evidence/2026-11-08-peter-ruling-u12-retired-names.md`.

## What changed
- `3d479bd4b` (Thurgood, profile author): overlay prose and disposition text from Kenya's and Data's drafts, verbatim, with credit (iOS text Kenya, Android text Data). Each seat's `trims[dist/ComponentTokens.*]` row and its `ambient.groundTruthManifest.verdict` row became `superseded-by` the how-to-use unit; both trim overlay entries were deleted. No hash moved in it.
- Lina: regeneration `7cfe548e7` (12 consumer-output files); the three comment rewordings `31212107719`.
- Kenya (`task/129-18-kenya-sign`, joined at `0e1d06410`) and Data (`task/129-18-data-sign`, joined at `72815fe7b`): the re-signs, 13 acts (Kenya 7, Data 6).

## Decider (zero hits)
`git grep -E '(dist/|@3fn/core/dist/)(Design|Component)Tokens\.(ios\.swift|android\.kt)'` over `canonical/_consumer-output`, `src/components`, `governance`, `docs/consumer` and the two consumer overlays at U12's tip: 0 hits. Neither regenerated `kenya.md` nor `data.md` carries a `## Ground truth` heading, so no heading is left without a bullet.

## Checks
- `diff-guard`: `stale: 0 row(s)`, `unsigned-routed: 0 row(s)`, `full-run-green (input-closure-changed)`. The lock moved as expected; restored, and Lina refreshes it at the unit's end.
- `verify-signing-chain --ci --base origin/main --head HEAD`: `signing-chain: 13 row(s) checked across 13 signing commit(s)`, `PASS — consistency, not identity`.
- `--audit --branch task/129-closeout`: 13 acts, anchored 9, record absent 4, FAIL 0, anomaly 0. The four are the `superseded-by` verdict and trim rows, which render nothing (ruling 9's reading).
- No `canonicalHash` moved; `canonical/operative-sets/**` untouched.

## Adaptations
none. Excluded as ruled: `dist/product/ProductTokens.*`.
