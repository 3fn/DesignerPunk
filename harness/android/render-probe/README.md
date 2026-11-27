# Android render probe

A one-off measurement for Spec 132's outline round: can a free `ubuntu-24.04` GitHub runner boot an Android emulator
(KVM), how long the system image takes to download and boot, and whether a Compose UI test runs on it and under
Robolectric. Plan: `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-05-native-plan/plan-r2.md` L172.
Grant and limits: `.kiro/issues/archive/2026-11-27-android-render-probe-workflow-grant.md`. Workflow:
`.github/workflows/android-render-probe.yml` (`workflow_dispatch` only on `main`). Result, 2026-11-27:
`.kiro/issues/2026-09-26-native-component-distribution.md` § "Android render probe result (2026-11-27, Data)".

This is a separate Gradle build. It is not part of the compile harness, and no harness context reads it. It renders no
DesignerPunk component. It compiles against `compileSdk` 37, not the harness pin, because Compose 1.12.1 (BOM
2026.09.00) requires 37 for any build that runs the AAR metadata check. Run from `harness/android/`:
`./gradlew -p render-probe testDebugUnitTest`, or `connectedDebugAndroidTest` with a device attached. Owner: Data.
