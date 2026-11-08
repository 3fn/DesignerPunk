# Task 10.2 — Row 21: the grid rule, `offGridReason`, warn for consumers, fail for ours

**Agent**: Ada (Sonnet), Lina (Sonnet) · **Unit branch**: `task/129-10-validators-config-types`

## What changed

- `src/integration/ValidationCoordinator.ts`: `validateFamilyConformance` reads the grid rule of design § 12 (D-8). A spacing or sizing custom value conforms when it is `BASE × k × step` (base 8, step 0.25, so a 2 px grid) with k whole and **no upper cap** (the old ≤ 8.0 cap, L157–159, is gone). `sizing` gets a case (it fell to the unknown-family warning). An off-grid value conforms only with a non-empty `offGridReason`. The grid check itself is `checkGridConformance` in `src/build/tokens/defineComponentTokens.ts`, which the coordinator's spacing and sizing case calls. A new `componentTokenConformanceErrors(token)` in the coordinator gives the strings `validateComponentToken` would, and is what the lane test calls.
- `src/build/tokens/defineComponentTokens.ts`: `TokenWithValue` gains `offGridReason?`; the registered token carries it through a `ComponentTokenWithGridReason` type kept in this file, so `src/registries/ComponentTokenRegistry.ts` is untouched (the coordinator's option 3).
- `src/cli/designerpunk.ts` and `src/cli/shared/errorCatalog.ts` (charter scope, outside the Primary Artifacts; cleared by the coordinator): `generate` warns for each non-package component token that fails the grid rule, naming it (`componentTokenOffGridMessage`), and does not fail. It calls `gridConformanceErrors` (in `defineComponentTokens.ts`), not the coordinator.
- `src/components/core/Button-VerticalList-Item/Button-VerticalList-Item.tokens.ts` and `src/components/core/Badge-Label-Base/tokens.ts` (**Lina**, joined from her seat branch `task/129-10-lina` @ `3b68c3f01` by `git merge --no-ff` at `c20a595ea`, byte-checked): `paddingBlock.rest` gets design § 12's `offGridReason` verbatim; Badge's `maxWidth` reasoning reads "sits on the spacing grid, but no semantic spacing token reaches that size". Badge needs no value change (120 = 15 × 8 is on the grid).
- `src/integration/__tests__/ComponentTokenConformance.test.ts` (new): the repository's lane over the real component token set.
- `tests/consumer-integration.test.ts`: a `Consumer Guard` case (shared describe with 10.3).

## Targeted tests and result

**Red once**, with the rule in and Lina's text not yet joined: `every DesignerPunk component token conforms` failed, the only failure `Token "verticallistitem.paddingBlock.rest" value 11 does not conform to spacing family pattern … or state how the value is derived in an offGridReason.` (Badge's 120 and Avatar's 12 and 64 already conformed.) **After Lina's join**: `ComponentTokenConformance.test.ts` 16/16. `npm test -- src/cli src/integration src/build`: 101 suites, 1638 tests pass. `npm run test:consumer -- -t "Task 10"`: the warning case passes (status 0, `✅ System tokens generated`, a warning naming `probe10.gap.odd`, none for the reasoned or the on-grid-high token).

## Application-time adaptations

- Radius and fontSize keep their old rules (the design names spacing and sizing).
- **`generate` warns for spacing and sizing custom values only**, the families D-8 rules. The first version called the whole coordinator, and Task 14's removal case failed (`Cannot find module '../tokens/RadiusTokens'`): the coordinator reads `RADIUS_BASE_VALUE` from the package, and `generate` must not depend on the package token modules that case removes (Spacing and Sizing stay). A radius, fontSize or color custom value is therefore checked by the repository's lane (real set) and not warned by `generate`; this is narrower than Req 13.2's "non-conforming custom value", and no component token of those families has a custom value today. Raised to the coordinator.
- `src/generators/__tests__/fixtures/token-read-sites.json` (charter scope, cleared): the coordinator no longer reads `SpacingTokens`, so its row loses it.
- DesignerPunk's own tokens "fail the lane" through the Jest case, not through `generate`; `generate` warns for every non-package token, in this repository too.
- The grant for the derived files this unit's string edits move (the pre-U9 golden, `token-index/primitives.yaml`) is `.kiro/issues/2026-11-08-u5-opacity100-formula-grant.md` as amended by #770.
