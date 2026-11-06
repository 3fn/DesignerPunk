// :tokens — the consumer's generated Kotlin only (design § 2). It feeds harness-android-tokens, and is the
// cross-tier baseline of harness-android-components (design § 3 rule 5), so it runs in the same invocation.
// NOT YET RUN: written without a Gradle toolchain. Lines marked UNVERIFIED rest on training data.

import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    alias(libs.plugins.android.library)
    alias(libs.plugins.kotlin.compose)
}

// lane.ts writes the lists under HARNESS_LANE_DIR (the environment, not a -P flag, so the invocation stays exactly
// `./gradlew --continue :tokens:compileDebugKotlin :probe:compileDebugKotlin :dp:compileDebugKotlin`).
val laneDir: File = providers.environmentVariable("HARNESS_LANE_DIR").orNull?.let(::File)
    ?: throw GradleException("HARNESS_LANE_DIR is not set; run harness/android/lane.ts, which writes the source lists")

// Explicit files, never directories: a source directory that does not exist is skipped silently, so a moved
// path would compile zero files (D § 1.4). A listed file that does not exist stops the build here instead.
fun laneFiles(name: String): List<File> {
    val list = File(laneDir, name)
    if (!list.isFile) throw GradleException("harness lane: $list does not exist")
    val files = list.readLines().filter { it.isNotBlank() }.map(::File)
    val missing = files.filterNot { it.isFile }
    if (missing.isNotEmpty()) throw GradleException("harness lane: ${missing.size} source file(s) listed in $name do not exist; first: ${missing.first()}")
    return files
}

android {
    namespace = "dpharness.tokens"
    compileSdk = libs.versions.compile.sdk.get().toInt()
    defaultConfig {
        minSdk = libs.versions.min.sdk.get().toInt()
    }
    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation(platform(libs.compose.bom))
    implementation(libs.bundles.compose)
    // api: the generated Kotlin may name colormath types in its public signatures, and :probe reads them.
    api(libs.colormath)
}

val genFiles = laneFiles("tokens.sources")

tasks.withType<KotlinCompile>().matching { it.name == "compileDebugKotlin" }.configureEach {
    // UNVERIFIED: setSource(FileCollection) on KotlinCompile replaces the variant's source directories.
    setSource(files(genFiles))
    val agpVersion = androidComponents.pluginVersion.let { "${it.major}.${it.minor}.${it.micro}" }
    doFirst {
        println("harness-sources: :tokens gen=${genFiles.size}")
        // The toolchain match (Req 3.11): the versions Gradle RESOLVED, printed once, read by lane.ts.
        // The Kotlin version is the compiler on the Kotlin Gradle plugin's own classpath, not the runner image's kotlinc.
        fun resolved(configurationName: String, group: String, name: String): String =
            project.configurations.findByName(configurationName)?.incoming?.resolutionResult?.allComponents
                ?.mapNotNull { it.moduleVersion }
                ?.firstOrNull { it.group == group && it.name == name }?.version ?: "unresolved"
        println("harness-toolchain: java.version=${System.getProperty("java.version")}")
        println("harness-toolchain: gradle.version=${project.gradle.gradleVersion}")
        println("harness-toolchain: kotlin.version=${resolved("kotlinCompilerClasspath", "org.jetbrains.kotlin", "kotlin-compiler-embeddable")}")
        println("harness-toolchain: agp.version=$agpVersion")
        println("harness-toolchain: compose.bom.version=${resolved("debugCompileClasspath", "androidx.compose", "compose-bom")}")
    }
}
