// :dp — the generated Kotlin plus every non-test packaged .kt, with Icon-Base's res/ as its resources (design § 2).
// It feeds harness-android-components, which counts only diagnostics located in package files, plus the cross-tier
// generated-file keys that :tokens does not report (design § 3 rule 5). NOT YET RUN: written without a Gradle toolchain.

import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    alias(libs.plugins.android.library)
    alias(libs.plugins.kotlin.compose)
}

val laneDir: File = providers.environmentVariable("HARNESS_LANE_DIR").orNull?.let(::File)
    ?: throw GradleException("HARNESS_LANE_DIR is not set; run harness/android/lane.ts, which writes the source lists")

fun laneFiles(name: String): List<File> {
    val list = File(laneDir, name)
    if (!list.isFile) throw GradleException("harness lane: $list does not exist")
    val files = list.readLines().filter { it.isNotBlank() }.map(::File)
    val missing = files.filterNot { it.isFile }
    if (missing.isNotEmpty()) throw GradleException("harness lane: ${missing.size} source file(s) listed in $name do not exist; first: ${missing.first()}")
    return files
}

// Package files first, then generated files, each sorted by path (O-15). lane.ts wrote each list sorted.
val pkgFiles = laneFiles("dp.pkg.sources")
val genFiles = laneFiles("dp.gen.sources")
val iconResList = File(laneDir, "dp.res")
if (!iconResList.isFile) throw GradleException("harness lane: $iconResList does not exist")
val iconRes = iconResList.readLines().first { it.isNotBlank() }.let(::File)
if (!iconRes.isDirectory) throw GradleException("harness lane: Icon-Base res/ is not a directory: $iconRes")

android {
    // The package's own namespace: IconBase.android.kt refers to R.drawable.* unqualified, in this package.
    namespace = "com.designerpunk.components.core"
    compileSdk = libs.versions.compile.sdk.get().toInt()
    defaultConfig {
        minSdk = libs.versions.min.sdk.get().toInt()
    }
    buildFeatures {
        compose = true
    }
    sourceSets {
        // UNVERIFIED: AndroidSourceDirectorySet.srcDir in AGP 9's DSL.
        getByName("main") {
            res.srcDir(iconRes)
        }
    }
}

dependencies {
    implementation(platform(libs.compose.bom))
    implementation(libs.bundles.compose)
    implementation(libs.material.icons.extended)
    implementation(libs.coil.compose)
    implementation(libs.colormath)
}

tasks.withType<KotlinCompile>().matching { it.name == "compileDebugKotlin" }.configureEach {
    setSource(files(pkgFiles + genFiles))
    doFirst {
        println("harness-sources: :dp gen=${genFiles.size} pkg=${pkgFiles.size}")
    }
}
