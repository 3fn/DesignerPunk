// The Android render probe. Grant: .kiro/issues/2026-11-27-android-render-probe-workflow-grant.md; plan-r2 L172.
// A separate Gradle build, run as `../gradlew -p render-probe ...` from harness/android/. It is not part of the compile
// harness (harness/android/settings.gradle.kts includes only :tokens, :probe and :dp). It measures the runner, not our
// components: one Compose Text, asserted displayed, on an emulator and under Robolectric.

pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
    versionCatalogs {
        // The harness's own pins (AGP, Kotlin, Compose BOM, compileSdk, minSdk), so the probe builds with the same toolchain.
        create("libs") {
            from(files("../gradle/libs.versions.toml"))
        }
        // Test libraries the harness does not use. Versions UNVERIFIED as current; the first run shows whether they resolve.
        create("probe") {
            library("androidx-test-runner", "androidx.test:runner:1.6.2")
            library("androidx-test-ext-junit", "androidx.test.ext:junit:1.2.1")
            library("robolectric", "org.robolectric:robolectric:4.14.1")
            library("junit", "junit:junit:4.13.2")
        }
    }
}

rootProject.name = "dp-render-probe-android"
