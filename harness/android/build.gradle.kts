// The plugins are declared once here and applied in each module (versions come from gradle/libs.versions.toml).
// AGP 9 compiles Kotlin without the org.jetbrains.kotlin.android plugin (Data's design inbound § 1.5, VERIFIED
// 2026-11-04 for 9.5.0 with the Compose compiler plugin alone).
plugins {
    alias(libs.plugins.android.library) apply false
    alias(libs.plugins.kotlin.compose) apply false
}
