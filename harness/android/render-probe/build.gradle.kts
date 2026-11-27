// One Android library module: an instrumented smoke test (connectedDebugAndroidTest) and a Robolectric test
// (testDebugUnitTest). AGP 9 compiles Kotlin with the Compose compiler plugin alone, as the harness modules do.
plugins {
    alias(libs.plugins.android.library)
    alias(libs.plugins.kotlin.compose)
}

android {
    namespace = "dpprobe"
    compileSdk = libs.versions.compile.sdk.get().toInt()
    defaultConfig {
        minSdk = libs.versions.min.sdk.get().toInt()
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }
    buildFeatures {
        compose = true
    }
    testOptions {
        unitTests {
            isIncludeAndroidResources = true
        }
    }
}

dependencies {
    implementation(platform(libs.compose.bom))
    implementation(libs.compose.runtime)
    implementation(libs.compose.ui)
    implementation(libs.compose.foundation)
    implementation(libs.compose.material3)
    // createComposeRule needs an activity in the test manifest.
    debugImplementation("androidx.compose.ui:ui-test-manifest")

    androidTestImplementation(platform(libs.compose.bom))
    androidTestImplementation("androidx.compose.ui:ui-test-junit4")
    androidTestImplementation(probe.androidx.test.runner)
    androidTestImplementation(probe.androidx.test.ext.junit)

    testImplementation(platform(libs.compose.bom))
    testImplementation("androidx.compose.ui:ui-test-junit4")
    testImplementation(probe.androidx.test.ext.junit)
    testImplementation(probe.robolectric)
    testImplementation(probe.junit)
}
