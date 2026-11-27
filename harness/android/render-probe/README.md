# Android render probe

A one-off measurement for Spec 132's outline round: can a free `ubuntu-24.04` GitHub runner boot an Android emulator
(KVM), how long the system image takes to download and boot, and whether a Compose UI test runs on it and under
Robolectric. Plan: `.kiro/specs/129-consumer-generation-completeness/evidence/2026-11-05-native-plan/plan-r2.md` L172.
Grant and limits: `.kiro/issues/2026-11-27-android-render-probe-workflow-grant.md`. Workflow:
`.github/workflows/android-render-probe.yml`. Result: `.kiro/issues/2026-11-27-android-render-probe-workflow-grant.md`'s
fixing PR records it in `.kiro/issues/2026-09-26-native-component-distribution.md`.

This is a separate Gradle build. It is not part of the compile harness, and no harness context reads it. It renders no
DesignerPunk component. Run from `harness/android/`: `./gradlew -p render-probe testDebugUnitTest`, or
`connectedDebugAndroidTest` with a device attached. Owner: Data.
