# Task 10 Completion: The relationship validator, component-token custom values and the override types (U5)

**Date**: 2026-11-08
**Spec**: 129 - Consumer-Generation Completeness
**Task**: 10. The relationship validator, component-token custom values and the override types (U5) · subtasks 10.1 to 10.3
**Type**: Parent · **Validation**: Tier 3 - Comprehensive
**Agent**: Ada (Sonnet), PRIMARY, with Lina (Sonnet, the two component tokens files) · **Status**: Complete on the unit branch `task/129-10-validators-config-types`; accepted at U5's merge, not before.
**Delegated-tier**: plan held
**CI-provenance**: local
**Instruments**: 16 listed — exists 12 · built-here 4 · missing 0 · unlisted 2 — .kiro/specs/129-consumer-generation-completeness/completion/task-10-instruments.md

---

## Success criteria

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| The `Consumer Guard` case `validate passes` (skipped at `tests/consumer-integration.test.ts` L354 at `c22c17a78`) is re-enabled and passes. | ✅ | `tests/consumer-integration.test.ts` › `validate passes` (un-skipped; asserts `✅ Mathematical relationships` and `All validation checks passed`); `npm run test:consumer → Tests: 89 passed, 89 total` (local, at 925e4278b). `npx tsx src/cli/designerpunk.ts validate → four ✅, All validation checks passed` (was 102 failures). |
| A Jest case with a token that breaks its declared relationship is still reported, and the pre-correction `blur000` string is its true-positive case. | ✅ | `MathematicalRelationshipParser.test.ts › validateToken … TRUE POSITIVE: blur000 with its pre-correction string "0" is reported`; also `TRUE POSITIVE: a wrong value …`, `… an equation whose sides disagree …`, `… every formula-family token in the source fails when its value is perturbed`, and `\`=\` is exact at the precision the string displays …`; `npm test -- src/validators/__tests__/MathematicalRelationshipParser.test.ts → 68 passed`. |
| A consumer component token with an off-grid custom value and no `offGridReason` makes `generate` warn, naming the token, and not fail, accepted by a `Consumer Guard` case. | ✅ | `tests/consumer-integration.test.ts` › Spec 129 Task 10 › `an off-grid custom value with no offGridReason: generate warns, naming the token, and does not fail` (status 0, `✅ System tokens generated`, a warning naming `probe10.gap.odd`, none for the reasoned or the on-grid-high token); `npm run test:consumer → 89 passed`. |
| A DesignerPunk component token that does not conform fails the repository's lane, shown by a Jest case red once. | ✅ | `src/integration/__tests__/ComponentTokenConformance.test.ts › every DesignerPunk component token conforms …`, red once on `verticallistitem.paddingBlock.rest` before Lina's text (pasted in `completion/task-10-2-completion.md`); `the rule, red on a token that does not conform` (4 cases). |
| Badge-Label-Base and Button-VerticalList-Item conform at this head, and Button-VerticalList-Item's `offGridReason` is Lina's text in design § 12. | ✅ | `ComponentTokenConformance.test.ts` 16/16; `src/components/core/Button-VerticalList-Item/Button-VerticalList-Item.tokens.ts` `offGridReason` equals design § 12 byte for byte (Lina's seat branch `task/129-10-lina` @ `3b68c3f01`, joined at `c20a595ea`, `git diff` against the branch empty for both files); Badge-Label-Base 120 on the grid (no value change). |
| A consumer `.ts` file importing `SemanticOverrideMap` and `SemanticOverride` from `@3fn/core/config` type-checks under `tsc --noEmit` in `Consumer Guard`. | ✅ | `tests/consumer-integration.test.ts` › Spec 129 Task 10 › `a consumer .ts file importing SemanticOverrideMap and SemanticOverride from @3fn/core/config type-checks`: red before `src/config/index.ts` exported them (`TS2305 … has no exported member 'SemanticOverrideMap'`), passes after (`completion/task-10-3-completion.md`). |
| All four harness contexts ran on this unit's PR, and this parent's completion doc carries each one's run URL and pasted summary line at head H, the last head whose `git diff --name-only H M` to the merged head M touches only `completion/**`, `docs/specs/**` and the PR's records (Conventions). | ⚠️ | Owed at head H. The four `native-harness` contexts run on this unit's PR; their run URLs and summary lines are written into this row in a docs-only commit after the PR opens (`git diff --name-only H M` then touches only `completion/**`, `docs/specs/**` and the PR's records). Tracking: `.kiro/specs/129-consumer-generation-completeness/tasks.md` Task 10 criterion 7; none run yet. |
| **The limitation sentences this unit's archives make false** *(added 2026-11-07, tasks amendment 6, under Peter's "708 is merged; do the amendment, then go for U3", received 2026-11-07T05:10:45Z (`evidence/2026-11-07-peter-ruling-marker-rewrite-criteria.md`))*. For each record whose limitation marker sits in `governance/DesignerPunk-Integration-Guide.md`'s install region and which this unit's PR archives (row 1, `2026-06-24-mathematical-relationship-parser-validation-gaps.md`: L94; lines at `55276795e`, as `completion/task-7-completion.md` lists them), the PR rewrites or deletes that sentence and its marker, in the sentence owner's words (Ada for generator and token sentences; Kenya for iOS and Data for Android where the sentence is theirs, as Task 7's consults set). It re-derives `docs/consumer/INSTALL.md` with `scripts/derive-install-doc.ts`, and `scripts/__tests__/install-doc.test.ts` passes at head H. A record this unit re-rules instead of archiving keeps its sentence and marker. The PR is Peter-merged (`governance/**`) and carries one `**Edit kind**:` line per file, EXECUTION (Req 15.2's marker rule). | ✅ | `governance/DesignerPunk-Integration-Guide.md` L94 rewritten in Ada's words and its marker removed; `docs/consumer/INSTALL.md` re-derived by `npx tsx scripts/derive-install-doc.ts`; `npx jest --config scripts/jest.config.js scripts/__tests__/install-doc.test.ts → 81 passed`. Made false by U5 and owed to the release batching PR (tasks.md Conventions L37), not edited here: Guide L407 (`npx designerpunk validate` "exits with an error from its mathematical-relationships check", unmarked) and L584 ("currently fails even on unmodified token source", unmarked). |
| Every root record whose Trigger names `task-10-completion.md` carries, at U5's merge, its owner's rule 5 outcome line or a re-ruled Trigger with a dated reason, made in U5's PR or in a PR merged before it. | ✅ | Outcome lines (rule 5, 2026-11-08, Ada) appended to `.kiro/issues/2026-06-24-mathematical-relationship-parser-validation-gaps.md`, `.kiro/issues/2026-10-24-component-token-custom-values-unvalidated.md`, `.kiro/issues/2026-10-03-semantic-override-map-type-not-exported.md` (the three records whose Trigger names this doc), and `.kiro/issues/2026-11-08-u5-opacity100-formula-grant.md` (the grant record). |

Unmet or partially met criteria: criterion 7 (the four harness contexts at head H) — owed after the PR opens, tracked in `tasks.md` Task 10 criterion 7 and written into this doc in a docs-only commit.

## Additional verification

Local, at `925e4278b` plus this doc (CI-provenance: local): `npx tsc --noEmit` clean; `npm test` 437 suites / 10286 tests pass; `npm run test:consumer` 89/89; `application-mcp-server` 582 pass; `mcp-server` 751 pass, with one suite (`tests/property/parsing-properties.test.ts`) failing to compile (`fc.stringOf` does not exist on the installed `fast-check`), a dependency fault that predates this unit and touches nothing it changed; `npm run check:completion-criteria-parity` and `check:122:diff-guard` are run at the final head (below); `install-doc.test.ts` 81/81 under the scripts config.

**The 122 diff-guard**: `input-closure-changed` on `canonical/registry/tool-registry.json`, from the Integration Guide edit (as at U9). The lock refresh is Lina's, on the final head, and U5 carries it.

**Derived files and the golden** (grant `.kiro/issues/2026-11-08-u5-opacity100-formula-grant.md`, as amended by #770):
- `token-index/primitives.yaml`: two `formula:` lines (`blur000`, `opacity100`).
- `tests/fixtures/pre-u9-theme-css/DesignTokens.web.css`: re-captured by the Command in its new header (`261cd1a3c` with `src/tokens/BlurTokens.ts` and `src/tokens/OpacityTokens.ts` from `4e2a22681`). The old golden reproduces byte for byte by the same Command without the checkout step. The old-to-new diff is exactly two lines, which is the proof that dark and WCAG-dark are unchanged:

```
34c34
<   /* 0 */
---
>   /* base × 0 = 16 × 0 = 0 */
377c377
<   /* Special case: full opacity = 1.0 */
---
>   /* base × 12.5 = 0.08 × 12.5 = 1 */
```

- **`docs/tokens.css` lags the generator from U8** (shadow `color-mix` composites and the four `--shadow-*-100` variables) until the next release's rebuild; it is not changed here, and U5's three comment changes (`blur000`, `opacity100`, Badge `maxWidth` reasoning) ride that rebuild.

**Charter-scope edits** (outside Task 10's Primary Artifacts, inside Ada's charter write scope; the coordinator cleared each): `src/cli/validate.ts` (passes the family to the parser; test `validate.test.ts` and the `Consumer Guard` case `validate passes`); `src/cli/designerpunk.ts` and `src/cli/shared/errorCatalog.ts` (the `generate` warning; the `Consumer Guard` off-grid case); `src/generators/__tests__/fixtures/token-read-sites.json` (the coordinator's row loses `SpacingTokens`; `TokenReadSiteInventory.test.ts`).

Primary Artifacts: all shipped as declared

(Declared and shipped: `src/validators/**`, `src/build/tokens/defineComponentTokens.ts`, `src/integration/ValidationCoordinator.ts`, `src/config/index.ts`, `src/tokens/**`, the two component tokens files, `tests/consumer-integration.test.ts`, the Guide and INSTALL for the marked sentence.) `src/registries/ComponentTokenRegistry.ts` is untouched.

## Findings

- **My slips**: (1) a bare `git stash -q` and pop in one session, nothing lost. (2) `git add -A` after a pack-time build swept `docs/tokens.css` (36 lines) and `token-index/primitives.yaml` into the 10.1/10.2 commit; the grant measured the branch head and understated its set. Reverted at `4e2a22681`, the grant amended (#770).
- **The first `generate` warning loaded the whole coordinator**, and Task 14's removal case failed (`Cannot find module '../tokens/RadiusTokens'`). The warning now calls `gridConformanceErrors` in `defineComponentTokens.ts`, so `generate` warns for spacing and sizing custom values (the D-8 families) only; a radius, fontSize or color custom value is checked by the lane, not warned by `generate`. Narrower than Req 13.2's "non-conforming custom value"; no component token of those families has a custom value today.
- **Design departures, none taken**: `=` is exact at the precision the string displays (the coordinator's ruling), and the special-case form is read on strategic-flexibility tokens only, with `opacity100` given a formula (Peter's route, the grant).
- **Owed to the release batching PR**: Guide L407 and L584 (above).

## Subtask docs

`task-10-1-completion.md`, `task-10-2-completion.md`, `task-10-3-completion.md`.
