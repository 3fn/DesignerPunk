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

## Status (2026-11-07)

Run locally with Temurin 17.0.21+9, Gradle 9.8.2 from the committed wrapper, Android SDK platform 36, macOS arm64.

- **The lane** configures and runs the one invocation. On a real packed install the generator's output does not compile yet:
  `:tokens` fails with the generator's errors, Gradle skips `:probe`, the lane prints `probe: blocked (:tokens not compiled)`
  and writes the count checks from the generated probe source with detail `blocked`, plus the instance check; `:dp` compiles 41 package files and the generated files and fails.
- **On a hand-written generated tree that does compile** (`:tokens` and `:probe` succeed), the probe prints its four count
  lines and the lane writes them, and the per-run instance check, into the token context's `checks`.
- **`lane.ts --selftest`** passes: `:probe` gives the one planted-`internal` error.
- The probe takes every theme-instance, family, provider and product-token rule from `scripts/harness/native-rules.ts` (it keeps no copy).
- The count lines are printed by `:probe`'s `compileDebugKotlin` `doFirst`, which never throws: the lane reads them into `checks`
  and the comparator fails the context when `n` differs from `m`.

The wrapper (`gradlew`, `gradlew.bat`, `gradle/wrapper/gradle-wrapper.jar`) was generated with
`gradle wrapper --gradle-version 9.8.2 --gradle-distribution-sha256-sum 21bd5da2de49b642904077f38c0efdc7778e92b3ed0889392dca61b97e389607`.
The jar's sha256 is `3b8a25775a69158b5ad2b1d17a80a88dc7b40a352a73eb27d06c612a7ce68e98`, equal to the one Gradle publishes for 9.8.2.
