# Task 4 Summary: The Android lanes

**Date**: 2026-11-07
**Purpose**: Concise summary of parent Task 4 (Spec 129, Unit 1)
**Organization**: spec-summary
**Scope**: 129-consumer-generation-completeness

## What Was Done

`harness/android/` is one Gradle build with three modules, `:tokens` (the consumer's generated Kotlin), `:probe` (a probe generated from the token index, in a module of its own so a member the generator left `internal` cannot be read) and `:dp` (the generated Kotlin plus every non-test packaged `.kt`, with Icon-Base's resources). `lane.ts` computes the explicit file lists and floors at run time, generates the probe, runs the one `./gradlew --continue …` invocation through the committed, checksum-validated wrapper, and writes the run files that the comparator reads. The probe takes every theme-instance, family, provider and product-token rule from the shared module `scripts/harness/native-rules.ts` and keeps no copy, prints four count lines, and the lane writes them and a per-run instance check into the run file's `checks`.

## Why It Matters

The Android half of every native "compiles" in Spec 129 is accepted by this lane. On dispatched CI runs of the unit branch both Android contexts pass, which means their failures match the committed lists (25 token entries, 213 component entries); it does not mean the generator's Kotlin compiles, and the probe is blocked until `:tokens` compiles at U6. A planted `internal` member shows the probe can see what a plain compile cannot.

## Key Changes

- `harness/android/**` (Gradle build, wrapper, `lane.ts`) and `harness/pins.yaml` § `android` (JDK 17.0.21, Gradle 9.8.2, Kotlin 2.4.21, AGP 9.5.0, Compose BOM 2026.09.00, `compileSdk` 36, `minSdk` 26).
- `scripts/harness/probe-kotlin.ts` with 55 tests, and fixtures for the index, the product files, the planted member, the holder form and the packed file list.
- The package's `dist/DesignTokens.android.kt` is left out of `:dp` as well as `dist/ComponentTokens.*`; found by the first real run.
- Two fixes to `parse-kotlin.ts` (Task 2.3's file) came out of this task's runs, for the two orders Gradle prints a failing task's output in.

## Impact

- ✅ Tasks 5 and the later units get an Android lane that runs on CI (dispatched run 42333520571 at `44e2f7f54`) and whose `checks` go through the comparator.
- ⚠️ No pull-request run exists yet; U1's PR opens at Task 5's completion, and the four contexts' summary lines at head H are Task 5's to record.
- ⚠️ The probe's reads of the family, provider, instances and product members were compiled only on a hand-written generated tree; the generator's own output meets them at U6.

---

*For detailed implementation notes, see [task-4-completion.md](../../../.kiro/specs/129-consumer-generation-completeness/completion/task-4-completion.md)*
