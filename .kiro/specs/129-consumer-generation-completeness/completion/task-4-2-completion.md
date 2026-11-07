# Task 4.2 Completion: the data-driven probe generator, its fixture test, the blocked state, the planted-member fixture, pins and toolchain match

**Date**: 2026-11-07
**Task**: 4.2 (Spec 129, Unit 1, parent 4)
**Agent**: Data (Sonnet)
**Branch**: `task/129-compile-harness-t4`. Not ticked: 4.2 stays unticked until Thurgood joins this branch. No CI run has exercised the lane, and none is cited here.

## 1. What changed

- **`scripts/harness/probe-kotlin.ts`** (`cb05cb678`) writes the `:probe` module's Kotlin from the consumer's `token-index/`, the manifest's `name` and `themes`, and the product-token files. One read per name the index gives for Android, a list expanded and a `null` skipped, read inside `@Composable`. Each `theme.` name is read through `LocalDPTheme.current` and through every theme instance. It names no token, theme or product-token member itself.
  - `:probe` is a module of its own, so a member the generator left `internal` is not readable from it (Req 2.7's planted case).
  - 4.3 (`cfe449c76`, `3631bafec`) later moved the instance, family, provider and product rules to `native-rules.ts`, deleted the first version's stand-ins, and added the count groups and the per-run check. That is the 4.3 completion doc's.
- **Fixtures** `scripts/harness/__tests__/fixtures/kotlin/consumer/` (a manifest-shaped config, a token index, two product files) and `planted-internal/` (a `DesignTokens` object with one `internal` member and an index naming both members), and `scripts/harness/__tests__/probe-kotlin.test.ts`, 29 tests at `cb05cb678`.
- **The blocked state** (`lane.ts`, `593c7d4ef`): the lane prints `probe: blocked (:tokens not compiled)` after the run when `:tokens` did not succeed (by `parseKotlin`) and the log holds no `probe: read` line.
- **The pins** (`harness/pins.yaml` § `android`, `593c7d4ef`): runner `ubuntu-24.04` with its image version, the five toolchain fields (JDK 17.0.21, Gradle 9.8.2, Kotlin 2.4.21, AGP 9.5.0, Compose BOM 2026.09.00), `compileSdk` 36, `minSdk` 26, Coil 2.7.0, `material-icons-extended` 1.7.8, the colour library 3.7.1, and the statement that the pins are harness pins and not platform minimums.
- **The toolchain match**: `:tokens:compileDebugKotlin`'s `doFirst` prints `harness-toolchain: <field>=<value>` for the five fields (the Kotlin version is the compiler on the Kotlin Gradle plugin's classpath, the BOM version the resolved component), and `lane.ts` writes them into the run file, where the comparator compares them with `harness/pins.yaml`.
- **The planted-member self-test** (`lane.ts --selftest`, `593c7d4ef`, adjusted `5fd5edaca`) compiles the fixture's `DesignTokens` as `:tokens` and a probe generated from the fixture's index as `:probe`, and expects exactly one `probe:` entry naming the planted member.

## 2. Targeted tests run

- `npx jest --config scripts/jest.config.js scripts/harness/__tests__/probe-kotlin.test.ts`: 29 of 29 at `cb05cb678`; a hand mutation (`LocalDPTheme` renamed in the generator) failed 3 of them. The file is 55 tests now, after 4.3.
- **The toolchain match, on the first real run** (`5fd5edaca`): the five fields Gradle printed were `17.0.21`, `9.8.2`, `2.4.21`, `9.5.0` and `2026.09.00`, equal to the pins, and the comparator raised no `toolchain` failure.
- **The blocked state, same run**: `:tokens` failed, Gradle skipped `:probe`, and the lane printed `probe: blocked (:tokens not compiled)`. The comparator's own note, `probe: blocked (android.tokens failed); its count is not compared`, appeared in the token context.
- **The planted member**:
  - The first `--selftest` run (`5fd5edaca`) showed the compile did what Req 2.7 asks: `:tokens` compiled, `:probe` gave one error, K2's `INVISIBLE_REFERENCE`, "Cannot access 'val space_planted: Dp': it is internal in 'com.designerpunk.tokens.DesignTokens'." It still reported FAIL, because `parse-kotlin.ts` read that `e:` line as unattributed: Gradle printed the task's `FAILED` line before its output.
  - The parser fix (`4e716dae2`, on `task/129-compile-harness-t2-kotlin-fix`, now on the unit branch; 91 parser tests) was merged into this branch, and `lane.ts --selftest` then printed `selftest: PASS (one probe entry: probe:ProbeTokens.kt | Cannot access 'val space_planted: Dp': it is internal in 'com.designerpunk.tokens.DesignTokens'.)`. It passed again at `3631bafec`, with the log showing `probe: read 2 of 2 index names`.
  - A sanitised log of that first run is the fixture `scripts/harness/__tests__/fixtures/kotlin/planted-internal-run.txt` and `fixtures/parse-kotlin/planted-internal-run.txt`.
- The harness Jest suite is 440 of 440 at `3631bafec`.

## 3. Application-time adaptations

1. **`probe: blocked` is printed by the lane, not by `:probe`.** Gradle skips `:probe:compileDebugKotlin` when `:tokens` fails, so no code of `:probe` runs. Tasks amendment 3 wrote this into the criterion and design § 2.
2. **The read count of this subtask's first version is replaced.** 4.2 printed one `probe: read <n> of <m>` line and failed the Gradle task on a mismatch. Amendment 3 and 4.3 changed it to four count lines that never fail the task and reach the comparator through the run file's `checks`.
3. **The planted-member entry's wording** was UNVERIFIED when I wrote the fixture's comment and is now recorded from the run.
4. **The self-test needed a parser fix outside this subtask's artifacts** (Task 2.3's `parse-kotlin.ts`). Found by this subtask's first run, fixed on its own branch under Task 2's grant, and noted in `task-4-instruments.md` under `## Found later`.
5. **The self-test turns the family and provider reads off** (`provider: false`, added by 4.3), because its fixture declares neither and its job is to give exactly one entry.
6. **Theme logic**: `themeMemberNames` here was provisional and is deleted by 4.3; it was not changed while Peter's theme rulings were pending.
