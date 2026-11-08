# Task 20.1 Completion: the default-name option, its verdict function and their tests

**Date**: 2026-11-07
**Task**: 20.1 (Spec 129, Unit 7a, parent 20)
**Agent**: Data (Sonnet)
**Branch**: `task/129-20-default-name-compile`, cut from `main` @ `f28a1fefd`; Thurgood's seat (`6ac6f534d`) is joined into it (byte-identical on both of his files).

## 1. What changed

- **`harness/android/lane.ts`**: the option `--default-name --consumer <root> --work <dir>`. `runDefaultName` copies the consumer with `fs.cpSync` into a `mkdtemp` directory under `RUNNER_TEMP` (else `os.tmpdir()`, refused if inside the workspace), symlinks each entry of the workspace's `node_modules` except `@3fn` into the copy (an entry the copy already has is kept), removes the one top-level `name` property from `designerpunk.config.ts` (`removeTopLevelName`, a small scanner over the `defineConfig({ … })` object, so the theme entries' `name:` keys are untouched), resolves the config with the copy's installed `loadConfig` (the call `consumer.ts` makes), empties the config's Android output folder, runs the copy's `generate`, emits `ProbeFamily.kt` with `probe-kotlin.ts` for the resolved name, and runs `./gradlew --offline --continue :tokens:compileDebugKotlin :probe:compileDebugKotlin` once, with empty `:dp` lists. It prints the invocation and the file order.
- **`defaultNameVerdict`** (exported, pure) and its one `default-name:` line. It checks every condition in Task 20's second criterion; all findings are listed on a fail. `DEFAULT_PRODUCT_NAME = 'DesignerPunk'` carries a comment citing `ConfigLoader.ts` `DEFAULTS.name`.
- **Under `--work`** (`harness-out/default-name/` in CI): `gradle.txt`, `generate.txt`, `verdict.txt`, `resolved-config.json`, `ProbeFamily.kt`, and `lane/` (the lists and the emitted source). The copy is removed on exit.
- **Exactly one `default-name:` line on every exit**: a setup failure prints `default-name: FAIL setup (<step>: <detail>)`, and so does a usage error under the option. Every other line the option prints begins `harness-android:`.
- **`scripts/harness/__tests__/probe-kotlin.test.ts`**: 27 new tests (96 in the file). No new fixture files: the cases read Data's committed evidence at `c09b9be27` and edit its text.

## 2. Targeted tests run

- `npm run test:scripts -- scripts/harness/__tests__/probe-kotlin.test.ts`: 96 passed. `npm run test:scripts -- scripts/harness`: 10 suites, 669 passed. `tsc` over `lane.ts`: clean.
- The verdict passes on the committed log (`gradle-tokens-and-probefamily.txt`, exit 0, 3 `.kt` written, probe list `[ProbeFamily.kt]`, `DesignerPunk`/`HX`). It fails, once each, on the 17 cases the criterion lists, each asserting the reason string; a planted `w:` line alone passes with `warnings=1`. On `consumer.designerpunk.config.spelled-out-reference.ts` the copy loses only the `  name: 'DesignerPunk',` line (every other line equal) and equals the evidence run's own `consumer.designerpunk.config.ts` byte for byte.
- **Local end-to-end run** (scratch toolchain, Temurin 17.0.21, Gradle 9.8.2; self-attested, no CI context): `lane.ts --default-name` on a packed consumer (scratch `consumer-dn`, pruned to `@3fn/core`) printed `default-name: PASS name=DesignerPunk abbreviation=HX probe-name=DesignerPunk tokens=succeeded probe=succeeded keyed=0 unrooted=0 unattributed=0 warnings=0 gen=3 provider read 5 of 5`; the copy was removed. The same consumer's unmodified copy needed the symlinks: the 557 workspace entries linked supplied `js-yaml`.

## 3. Application-time adaptations

1. **The verdict takes three inputs the criterion's list does not name**: the name the probe was given, the text of the compiled `ProbeFamily.kt`, and the copy's config text. The conditions on them (probe name, provider-read identifiers, no top-level `name`) cannot be read from the others.
2. **The probe is generated from an empty index**, so `ProbeFamily.kt` is the only file and the other count lines read `0 of 0` rather than the MP-4 run's `0 of 443` (that run gave the full index and only one file). The provider group's `m` is the same.
3. **Dependency versions come from the repository's lockfile, not the consumer's own install.** A runtime dependency missing from `@3fn/core`'s published `dependencies` is supplied here and masked; only `harness-generate`'s consumer install exposes it.
4. **`--offline` relies on the cache the job saved earlier** (the step sits after "Save the Gradle cache"); the local run used the scratch `GRADLE_USER_HOME`.
