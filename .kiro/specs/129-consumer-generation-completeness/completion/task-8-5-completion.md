# Task 8.5 Completion: remove the colour library from the Android harness build

**Date**: 2026-11-07
**Task**: 8.5 (Spec 129, Unit 3, parent 8; added by tasks amendment 6, PR #709)
**Agent**: Data (Sonnet)
**Branch**: `task/129-8-native-colours-shadows-data`, cut from `task/129-8-native-colours-shadows` @ `d2680d9be` (Task 8.3's head, after 8.1 removed the generated Kotlin's colormath calls). Not ticked, and not merged into the unit branch: Ada joins it once #709 merges.

## 1. What changed

Commit `66bb7ee6c`: seven lines removed from the four files the amendment adds to Task 8's Primary Artifacts, and nothing else.

- `harness/android/gradle/libs.versions.toml`: the version `colormath = "3.7.1"` and the library `colormath = { module = "com.github.ajalt.colormath:colormath-ext-jetpack-compose", … }`, with the one comment line above it ("Only while the generated Kotlin calls Oklch(...).toComposeColor(); …").
- `harness/android/tokens/build.gradle.kts`: `api(libs.colormath)` and its comment ("the generated Kotlin may name colormath types in its public signatures, and :probe reads them").
- `harness/android/dp/build.gradle.kts` and `harness/android/probe/build.gradle.kts`: `implementation(libs.colormath)`.

`harness/pins.yaml` is not touched: Ada's 8.1–8.3 already removed the colour-library pin there (Req 3.5 (a)). The lists are not touched.

## 2. Targeted tests run

- `git grep -n -i colormath -- harness/android` → no output (exit 1) at `66bb7ee6c`.
- A dispatched run of `native-harness.yml` against the seat branch, https://github.com/3fn/DesignerPunk/actions/runs/42344794521 (`workflow_dispatch`, head `66bb7ee6c`, concluded success; `harness-generate` and the four contexts all success). The Android annotations at the checks endpoint, read from the check runs:
  - `harness-android-tokens` (check run 128320305025): `harness-verdict: harness-android-tokens PASS`, `cache: miss`. Summary: `expected=349 · observed=349 · new=0 · stale=0 · count-changed=0 … files=gen 3/3 (compiled/floor) · remaining=18 entries`.
  - `harness-android-components` (check run 128320305064): `harness-verdict: harness-android-components PASS`, `cache: miss`. Summary: `expected=433 · observed=433 · new=0 · stale=0 · count-changed=0 … files=gen 3/3, pkg 41/41 (compiled/floor) · remaining=211 entries · cross-tier=0`.
  - Both against the lists as Ada committed them at `d2680d9be`, unchanged. Both also logged the wrapper validation (`✓ Found known Gradle Wrapper JAR files: 3b8a2577…68e98`) and `selftest: PASS` (the planted `internal` member, one probe entry).
- The Android lanes' build files still configure and resolve without the library: both contexts ran Gradle end to end, and `:tokens` and `:dp` produced exactly the listed diagnostics, so removing the dependency changed no key.

## 3. Application-time adaptations

1. **The comment lines that belonged to the declarations went with them.** "Removing the declaration" would otherwise leave two orphan comments (the one above the catalogue entry, and the one above `api(libs.colormath)`).
2. **The run was a dispatch of the seat branch, at a cold cache** (`cache: miss`), so the removal was also exercised with the dependency cache empty. Nothing about the cold-run attribution order failed.
3. **No `.github` change** was needed: the workflow on the seat branch is the unit branch's.
4. **CI provenance**: a dispatched run on a seat branch, not a pull-request run and not the U3 branch head. Ada's U3 completion cites the run at head H, which is hers.
