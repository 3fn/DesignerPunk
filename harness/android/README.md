# harness/android — the Android compile lane

**Spec**: 129 (Consumer-Generation Completeness), Task 4 · **Owner**: Data · design.md § 2, harness/README.md

One Gradle build, three `com.android.library` modules with the Compose compiler plugin, compiled by one invocation:

```
cd harness/android && HARNESS_LANE_DIR=<dir> ./gradlew --continue :tokens:compileDebugKotlin :probe:compileDebugKotlin :dp:compileDebugKotlin
```

| Module | Compiles | Feeds |
|---|---|---|
| `:tokens` | the consumer's generated Kotlin | `harness-android-tokens`, and the cross-tier baseline of `harness-android-components` |
| `:probe` | the probe `scripts/harness/probe-kotlin.ts` writes from the token index (every read in a `@Composable`); depends on `:tokens` | `harness-android-tokens` |
| `:dp` | the generated Kotlin and every non-test packaged `.kt` (not `dist/ComponentTokens.*`), with Icon-Base `res/` | `harness-android-components` |

`lane.ts` is the runner: it computes the explicit file lists and floors, generates the probe, runs the invocation once and
writes `run-<context>.json` for `scripts/harness/compare.ts`. The modules name no source file; they read the lists under
`HARNESS_LANE_DIR`. `gradle.properties` sets the plain console and no parallelism, because `parse-kotlin.ts` attributes
diagnostics by the `> Task` header.

Pins: `harness/pins.yaml` § `android` and `gradle/libs.versions.toml` carry the same values; the lane prints what Gradle
resolved (`harness-toolchain:` lines) and the comparator fails on a difference. They are harness pins, not minimums.

## Status (2026-11-06)

First local runs (Temurin 17.0.21+9, Gradle 9.8.2 from the committed wrapper, Android SDK platform 36, macOS arm64):
- The build configures and the one invocation runs. `:tokens` compiles the 3 generated files and fails with the generator's
  errors; `:probe` is skipped by Gradle while `:tokens` fails (the lane prints `probe: blocked (:tokens not compiled)`); `:dp`
  compiles 41 package files and the 3 generated files and fails. The five toolchain fields Gradle printed equal the pins.
- `lane.ts --selftest`: `:probe` gives the one planted-`internal` error, but the self-test reports FAIL because
  `parse-kotlin.ts` reads that `e:` line as unattributed. Gradle printed the task's `FAILED` line before its output.
  The recorded log is `scripts/harness/__tests__/fixtures/kotlin/planted-internal-run.txt`.

Build-script lines that were resting on training data and are now confirmed by that run: `setSource(files(...))` on
`KotlinCompile`, `res.srcDir(...)` in AGP 9, `androidComponents.pluginVersion`, and the `kotlinCompilerClasspath` and
`debugCompileClasspath` configuration names.

The wrapper (`gradlew`, `gradlew.bat`, `gradle/wrapper/gradle-wrapper.jar`) was generated with
`gradle wrapper --gradle-version 9.8.2 --gradle-distribution-sha256-sum 21bd5da2de49b642904077f38c0efdc7778e92b3ed0889392dca61b97e389607`.
The jar's sha256 is `3b8a25775a69158b5ad2b1d17a80a88dc7b40a352a73eb27d06c612a7ce68e98`, equal to the one Gradle publishes for 9.8.2.
