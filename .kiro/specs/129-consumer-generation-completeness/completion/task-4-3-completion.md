# Task 4.3 Completion: the probe imports the shared module

**Date**: 2026-11-07
**Task**: 4.3 (Spec 129, Unit 1, parent 4)
**Agent**: Data (Sonnet)
**Branch**: `task/129-compile-harness-t4`, after the merge of `refs/remotes/origin/task/129-compile-harness` @ `4252ccc64` (the shared module, the `checks` route and the parser fix are on it)
**Not ticked**: 4.3, 4.1, 4.2 and Task 4 stay unticked; Thurgood joins this branch.

## 1. What changed

- **`scripts/harness/probe-kotlin.ts`** imports `scripts/harness/native-rules.ts` for every rule it used to keep: the theme instances (`instanceNames`), the family (`familyCases`, `familyTypeName`), the provider (`kotlinProviderFunction`, `providerReads`), the product members (`productCategories`, `productReads`), the binding constants (`BINDING`), and the holder's declaration form (`kotlinHolderOpenLine`, `kotlinHolderMemberLine`). The stand-ins `themeMemberNames` and `productObjectName`, and the constants `LOCAL_THEME`, `TOKENS_PACKAGE` and `PRODUCT_PACKAGE`, are deleted. The probe takes the product files as `{ path, doc }` and lets the module decide which are read, their order, and what a malformed one means.
  - It now writes five files: `ProbeTokens.kt`, `ProbeThemeLocal.kt`, `ProbeThemeInstances.kt`, `ProbeProduct.kt` and the new `ProbeFamily.kt` (the default call `<Name>Theme { }`, and per family entry one read `<Name>ThemeFamily.<Entry>` and one call `<Name>Theme(family = …) { }`). A `provider: false` option writes no family read; the planted-member self-test uses it, because its fixture declares neither.
  - **Four count groups**, each with `m` computed from the inputs and `n` counted from the emitted text: index names (a `theme.` name once, read through `LocalDPTheme.current`), instances (theme names times the module's instances), product, provider. `probe-expected.txt` carries one `m` per group.
  - **`checkThemeInstances`** is the per-run instance check: the members of the `<Name>Themes` holder the generated Kotlin declares, against `instanceNames`, in order. It fails closed: holder declared and no member parsed, or `DesignerPunkTheme` declared and no holder found. It prints `not checked` and does not fail only when neither is declared.
- **`harness/android/probe/build.gradle.kts`**: `compileDebugKotlin`'s `doFirst` prints the four count lines (`probe: read <n> of <m> index names`, `probe: instances read …`, `probe: product read …`, `probe: provider read …`) and **no longer throws** on a mismatch.
- **`harness/android/lane.ts`**:
  - `buildChecks` writes the token context's `checks`: one entry per count line (`ok` when `n` equals `m`; a missing line is a failing entry) plus `theme instances`. It writes `[]` while `:tokens` did not compile. The component context's `checks` is `[]`.
  - `assertOneCopyPerName` (exported) is the duplicate-name failure, and `prepare` calls it. `prepare` also runs the module's `checkHarnessConsumerConfig` on the manifest's themes and stops on a refusal.
  - The lane records the toolchain versions it ran and never stops on a pin mismatch; the comparator fails the context as `toolchain`.
  - The self-test passes `provider: false` and `productFiles: []`.
- **`scripts/harness/__tests__/probe-kotlin.test.ts`**: 52 tests (29 before). New: the four groups, the provider reads, a custom theme through the module, every per-run check state, `buildChecks` and `buildRunFiles`, the duplicate-name cases. The cases that encoded the old member set (`MEMBERS` with a bare `Dark`) now state the module's four.
- **Fixtures**: `fixtures/kotlin/holder/{ok,extra,missing,order,duplicate,empty,no-holder,neither}.kt` (generated-Kotlin cuts in the pinned holder form) and `fixtures/kotlin/packed-kt-files.txt` (the real packed `.kt` list of the 2026-11-06 install: 41 source files and the two root token files).
- **`harness/android/README.md`** (status) and **`task-4-instruments.md`** (`## Found later`: three `unlisted` entries, as Start Up Tasks item 8 asks).

## 2. Targeted tests run

- `npx jest --config scripts/jest.config.js scripts/harness`: 6 suites, **437 passed, 437 total** (`probe-kotlin` 52, `compare` and the others unchanged).
- `npx tsc -p tsconfig.scripts.json --noEmit`: no error.
- Falsification, by hand (scratch edits, reverted; both files byte-identical to the committed ones): treating zero parsed holder members as ok fails 1 test (the fail-closed case); making `assertOneCopyPerName` a no-op fails 2 (the planted pair, and "would throw without the exclusion").
- Leak grep on every file staged: no home-directory or scratch-path marker (run before the commit).
- **`lane.ts --selftest`**: `selftest: PASS (one probe entry: probe:ProbeTokens.kt | Cannot access 'val space_planted: Dp': it is internal in 'com.designerpunk.tokens.DesignTokens'.)`. The log shows `probe: read 2 of 2 index names`, and `0 of 0` for the other three groups.
- **The lane on the real packed install** (`consumer.ts --offline` output of 2026-11-06, `@3fn/core@16.2.0`): `prepare` gave 3 generated files at a floor of 3, 41 package files at a floor of 41, and a probe of index 439, instances 56, product 2, provider 5. Gradle exit 1: `:tokens` fails with the generator's errors, `:probe` is skipped, the lane prints `probe: blocked (:tokens not compiled)`, and the token context's `checks` is `[]`.
- **The lane on a hand-written generated tree that compiles** (the fixture index and product files, a holder in the pinned form, the family, the provider and the product objects; 41 real package files): `:tokens` and `:probe` **succeed with 0 diagnostics**, so the family reads, the provider calls (`HarnessConsumerTheme { }` and `HarnessConsumerTheme(family = …) { }`), the instance reads and the `@Composable` product getter all compile across the module boundary. The lane printed `ok probe: read index names: 8 of 8`, `instances 8 of 8`, `product 3 of 3`, `provider 5 of 5`, and `ok theme instances: 4 of 4 as the shared module gives (BaseLight, BaseDark, WcagLight, WcagDark)`. `:dp` fails on the package files (815 errors, 477 keys), as expected against a tiny tokens file. The comparator reads both run files without a `check`, `parser`, `toolchain`, `floor` or `pre-compile` failure; its only failures are `format` (no list files yet, and no `ios` pin section on this branch).

## 3. Application-time adaptations

1. **`LocalDPTheme.current` counts under index names, once.** Design § 3 says Android's `LocalDPTheme.current` read "counts under instances", and also that a `theme.` name counts once under index names. Both cannot hold for one read. I made the `LocalDPTheme.current.<prop>` read the name's index read, and the instances group the per-instance reads only (`m` = theme names times the module's instances). If Thurgood means the other reading, `m` for instances becomes theme names times (instances + 1) and the index `m` drops the `theme.` names.
2. **No `theme instances` check while `:tokens` fails.** The criterion says `checks` is empty then, so I wrote none, though the check reads files and needs no compile. Before U6 it would say `not checked` anyway. At U6, if `:tokens` still failed, the check would be absent; the failing `:tokens` already fails the context.
3. **The check lives in `probe-kotlin.ts`** (`checkThemeInstances`), called by the lane, so `probe-kotlin.test.ts` pins it as the criterion says.
4. **`ThemeEntry.pair` is not in the manifest.** The manifest's `themes` carry `name` and `mode`, so `checkHarnessConsumerConfig` and `instanceNames` read a `{ light, dark }` entry (Task 14) as covering nothing. Not a U1 case; Task 14 must extend the manifest.
5. **A missing count line fails.** If `:tokens` compiled and `:probe` printed no count line (a probe that failed before its compile), `buildChecks` writes a failing entry for each group, so a probe that printed nothing cannot read as green.
6. **The consumer for the real-install run was built before 5.4 landed.** It is the 2026-11-06 output, not rebuilt on this merge; `generate` is unchanged by the merge, so I took it as equivalent. A rebuild would take the pack's `prepack` build.

## 4. Not met, or not shown

- Nothing in 4.3's list was left unmet. Two things are shown only on a hand-written tree: that the probe's family, provider, instance and product reads **compile** (the generator emits none of them before U6), and that the per-run check reads the generator's holder form (the generator emits no holder before U6). Task 11's exact-set test and the U6 run are where they meet real output.
- Not run: a dispatched CI run (the workflow is Task 5's), and the harness Jest `lane-functional-root` registration (Task 6).
