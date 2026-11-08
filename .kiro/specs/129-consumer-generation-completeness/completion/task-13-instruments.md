# Task 13 — Instruments block

**Written**: 2026-11-08T00:38Z (`date -u`), before subtask 13.1 · **PRIMARY**: Ada (Sonnet), on unit branch `task/129-13-component-tier`, cut from `beccbf134` (`origin/main`, tasks amendment 11, #749) · **Seats**: Lina (13.4, 13.5) and Thurgood (13.6) on their own seat branches, joined when verified

**Form**: Start Up Tasks item 8, as Task 9. **Sha convention**: the commit that last touched the path, as of `beccbf134`.
**Criteria** (Task 13's success criteria, `tasks.md` order): C1 six files ship, `pack-assert` asserts each · C2 iOS third source, references by name · C3 Android third source · C4 `Consumer Guard` case: a changed primitive reaches the component token · C5 the harvest reports a file that registers no tokens · C6 consumer group replaces ours, report and `(copied at init)` · C7 package group whose directory loses the union, "not emitted" report · C8 two consumer files declaring one group fail, Jest · C9 packed-install deleted-primitive report from `generate` and `sync`, every platform's output · C10 D2 on iOS · C11 D2 on Android · C12 `d2-check.ts` keeps the invocation contract, with `d2-check.test.ts` · C13 the step in `harness-generate` (Thurgood) · C14 U8's `.github/**` changes are the one file · C15 completeness half, Jest case that drops one token from both · C16 hand-written enums removed (Lina) · C17 reserved-package warning, Jest · C18 missing-key report from `sync` (Lina) · C19 `sync` pre-123 single-family report (Lina) · C20 R5 freshness case, `staleness.ts` no longer by file times · C21 Spec 123 Req 1.5 pointer line (Lina) · C22 Integration Guide cascade sentence (Lina) · C23 token and component contexts show the diff's additions under exception (c) · C24 four harness contexts on the PR · C25 records naming `task-13-completion.md`.

| # | Criterion | Instrument | State | Fit | Dependent subtasks |
|---|---|---|---|---|---|
| 1 | C1 | `scripts/pack-assert.ts`, `scripts/__tests__/pack-assert.test.ts` | exists (@ `74d7566f5`) | `pack-assert` already asserts per-path presence for `src/components/core/Avatar-Base/index.ts` and counts schema/contracts files; a new list of the six paths is a new assertion in the same shape | 13.1 |
| 2 | C2, C3 | `src/cli/loadComponentTokens.ts` and `src/cli/__tests__/loadComponentTokens.test.ts` | exists (@ `d949ce8b7`) | the harvest is the sole registry writer; the third source extends it. Existing cases pin the two-source order and must stay green | 13.1 |
| 3 | C2, C3 | `src/generators/TokenFileGenerator.ts` `generateComponentTokens` | exists | native enums are `<Component>Tokens`, references emitted by name; web must NOT receive the package tokens (design § 9: web keeps the package CSS). Needs a web exclusion; built here | 13.1 |
| 4 | C4, C9 | `tests/consumer-integration.test.ts` (`Consumer Guard`), packed install | exists (@ `de307e1d7`) | has the packed-install fixture helpers; the new cases are written into it. Slow (npm pack); run once per check | 13.1, 13.2 |
| 5 | C5, C6, C7, C8 | Jest cases for the harvest and its reports | built here (13.1) | in `loadComponentTokens.test.ts` and a new `packageComponentSource.test.ts`; fixtures are temp directories | 13.1 |
| 6 | C9 | the check over every platform's output | built here (13.2) | the existing name contract (`src/cli/sync/NameContract.ts`) is web-surface only and excludes the component tier by P1 (DD17); this is a new check beside it, not a change to P1 | 13.2 |
| 7 | C17 | the reserved-package scan, Jest | built here (13.2) | | 13.2 |
| 8 | C20 | `src/cli/staleness.ts`, `src/cli/__tests__/staleness.test.ts` | exists (@ `17e0262e2`) | file-time based today; the tests pin that behaviour and are rewritten with it | 13.2 |
| 9 | C10, C11, C12, C15 | `scripts/harness/d2-check.ts`, `d2-check.test.ts`, fixtures | built here (13.3) | to the grant record's contract | 13.3 |
| 10 | C12 | `.kiro/issues/2026-11-07-d2-check-step-grant.md` | exists (@ `beccbf134`), **its contract change is pending** → Thurgood: a PR carrying Peter's F-4 design rule and floors (names from the index, no generator imports, append-only falsification cases, a count that is never 0), merged before 13.3 starts. Stops 13.3 only; Ada's agreement line is appended to it | the unchanged contract is already agreed (2026-11-08T00:08:11Z, `20a3474b5`) | 13.3 |
| 11 | C13, C14 | `.github/workflows/native-harness.yml`, `scripts/harness/__tests__/native-harness-workflow.test.ts` | exists (@ `38360520d`) | Thurgood's, under the issue-row grant; not mine | 13.6 |
| 12 | C10, C11, C24 | the four harness contexts and `harness/expected/*.tsv` | exists (lists last @ `c71fb2452`) | `gh workflow run native-harness.yml --ref task/129-13-component-tier` | parent close |
| 13 | C23 | the token and component contexts' exception (c) print | exists | read at the PR | parent close |
| 14 | C16, C18, C19, C21, C22 | Lina's seat | none for me — Lina's instruments, in her own block | | 13.4, 13.5 |
| 15 | C25 | records naming `task-13-completion.md`: `2026-10-02-one-hop-upgrade-rehearsal-tracked-residuals.md` (Lina), `2026-11-07-d2-check-step-grant.md` (Thurgood), `2026-09-28-full-survival-assent-signal-instrument.md` (grep hit on "Task 13": read at the close, may be a different Task 13) | exists | outcome lines are their owners'; I list, not write | parent close |

## Files I expect to touch outside Task 13's Primary Artifacts

Named before code:
- `token-index/components.yaml`, `token-index/primitives.yaml`, `token-index/semantics.yaml`: derived, regenerated by `npm run generate:platform-tokens` if the DesignerPunk index changes.
- `src/cli/shared/errorCatalog.ts` (catalogued messages for the duplicate-group failure and the new reports) and `src/cli/__tests__/errorCatalog.test.ts`: both under `src/cli/**`.
- `src/cli/__tests__/**` (new and rewritten cases): under `src/cli/**`.
- `src/generators/generateTokenIndex.ts` and its tests: under `src/generators/**`.
- `scripts/__tests__/pack-assert.test.ts`: follows `scripts/pack-assert.ts`, which I own.
- `docs/consumer/INSTALL.md`: derived; only if a served sentence of mine changes.

## Found later

(none yet)
