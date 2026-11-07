# Task 11 — Instruments block

**Written**: 2026-11-07T18:15Z (`date -u`), before subtask 11.1 · **PRIMARY**: Ada (Sonnet), on unit branch `task/129-11-native-theme-emission`, cut from `a953ac70d` (`refs/remotes/origin/main`; #722 and #723 merged) · **Seat**: Lina (11.5) on `task/129-11-native-theme-emission-lina`, cut from this branch once 11.2's emission exists

**Form**: M1's execution-time block (Start Up Tasks item 8). **Sha convention**: commit that last touched the path as of `a953ac70d`.
**Criteria**: Task 11's 41 Success Criteria in `tasks.md` order (the parity parser's count is read at the parent close). Grouped here by the instrument each rests on.

| # | Criteria it serves | Instrument | State | Fit | Dependent subtasks |
|---|---|---|---|---|---|
| 1 | the four contexts, the `theme instances:` lines, probe read counts, list removals | `.github/workflows/native-harness.yml`, `scripts/harness/compare.ts`, the four lists, `harness/pins.yaml`, `harness/ios/lane.ts`, `harness/android/lane.ts`, the two probe generators | exists (Task 1–6 files, last touched by #707/#711/#719) | the lanes already count `theme.` reads and print `theme instances: not checked` until the generator emits the holder; `harness-android-tokens` is a required check now, so every list change keeps it green at each push | 11.2, 11.3 |
| 2 | the shared module and its comparison test | `scripts/harness/native-rules.ts` (@ `74d7566f5`) and `scripts/harness/__tests__/native-rules.test.ts`; `native-rules-emitter.test.ts` | module exists; the emitter test is built here (11.2) | the module's `instanceNames`, `familyCases`, `kotlinHolderOpenLine` and friends are what the emitter must equal | 11.2 |
| 3 | exact-set emitter tests, configs S and C, default-name case, family doc comments | `src/generators/__tests__/SwiftThemeTypes.test.ts` (@ `efb878f2f`), `KotlinThemeTypes.test.ts` (@ `14f45cee7`) | exist; rewritten here (11.2, 11.4) | they assert the 094 emitter's old shapes (single-mode theme without suffix, no family) and are re-baselined | 11.2, 11.4 |
| 4 | the emitter | `src/generators/TokenFileGenerator.ts` `generateSwiftThemeTypes` / `generateKotlinThemeTypes` / `generateThemeOverrideBlocks` (@ `30e2f727b`) | exist, unwired | callable with an explicit theme list; not called by `generate` | 11.2 |
| 5 | index names, README, product-token emitters, the composite refusal | `src/generators/generateTokenIndex.ts`, `token-index/README.md`, `src/build/product/emitters/{Swift,Kotlin}Emitter.ts`, `src/cli/validateProductTokens.ts` (@ `c335d42b3`) | exist | | 11.3 |
| 6 | refuse-or-skip decision, Req 10.4 measurement | a scratch copy of test01's config and product tokens (never `generate` in test01 itself), a scratch `init` from a packed install, the repository fixtures | test01 exists per the project record; its path is not in the repository | read-only copy first; if it is not reachable the measurement is reported as not made, not guessed | 11.3 |
| 7 | the Guide sentences rows 2 and 4 make false | `scripts/derive-install-doc.ts`, `scripts/__tests__/install-doc.test.ts` | exist (@ `55276795e`) | 6 sentences for row 2, 4 for row 4 | parent close |
| 8 | the `LocalDPTheme` import in 25 Android files, rows 12/13/15 list removals, the two re-points | Lina's 11.5; the component lists | exist | | 11.5 |
| 9 | records naming `task-11-completion.md` | `2026-06-28-spec-094-platform-theme-emission-unwired.md` (row 2), `2026-10-03-native-generator-findings-for-spec-129-intake.md` (row 4), `2026-10-24-android-component-unit-type-mismatches.md` (row 12), `2026-10-26-token-index-platform-name-readers.md` (row 13), `2026-11-06-android-components-do-not-import-localdptheme.md`, `2026-11-07-row-15-theme-name-defect-has-no-observing-instrument-at-u1.md` | exist | six records name the completion doc; each owes a rule 5 outcome line or a re-rule. Owners differ (Lina owns rows 12 and the import record); I write mine and ask each other owner | parent close |
| 10 | the PR's four contexts | the unit PR | MISSING → Ada at the parent close; stops no subtask | | parent close *(resolved 2026-11-07, `completion/claims-pass-midpoint.md` MP-8, appended: #730's four contexts ran at head H `739f8e833` in https://github.com/3fn/DesignerPunk/actions/runs/42405431176 (`native-harness`, success), with the lane contexts in https://github.com/3fn/DesignerPunk/actions/runs/42405431075 (`lane-timing.yml`, success) → exists.)* |

## Files I expect to touch outside Task 11's Primary Artifacts

Named before code:
- `scripts/harness/native-rules.ts` and its test, only if the emitter's forms and the module disagree. The module is Thurgood's; I will report a mismatch, not edit.
- `src/config/**` (`defineConfig.ts`, `ConfigLoader.ts`): only if the emitter needs the theme mode type; otherwise not touched (custom themes reach native output at U9).
- `src/cli/**` (generate's "registered, not applied yet" print and its test): in my standing scope; `src/cli/__tests__/**` is listed.
- `governance/**` token docs: only if a doc states the old theme names. If any guideline the agent layer embeds changes, Thurgood regenerates on the seat branch before I join it.
- `.kiro/issues/**` archive moves for rows 2 and 4 and any other record I own (standing scope).
- `docs/consumer/INSTALL.md` is derived and listed.

## Found later

- **unlisted** (2026-11-07, 11.4): `src/build/platforms/iOSMotionTokenFormatter.ts` (`PiecewiseLinearEasing` is `Hashable`; row 4's last two iOS entries). State: exists. Token generation under Ada's charter. Not on my expected list.
- **unlisted** (2026-11-07, 11.3): `src/cli/generateProductTokens.ts` (the product step throws on a composite ref) and `scripts/harness/__tests__/consumer.test.ts` (its two fixture cases changed with the fixture). Both exist; the first is `src/cli/**`, in standing scope.
- **unlisted** (2026-11-07, 11.1): `src/tokens/themes/dark/SemanticOverrides.ts` is under the listed `src/tokens/**`.
- **Row 6 (the Req 10.4 measurement)**: test01 was reachable and read; the scratch `init` from a 15.x-born install was not made (see `task-11-3-completion.md`).
