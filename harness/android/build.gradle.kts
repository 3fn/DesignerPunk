// The plugins are declared once here and applied in each module (versions come from gradle/libs.versions.toml).
// AGP 9 compiles Kotlin without the org.jetbrains.kotlin.android plugin (Data's design inbound § 1.5, VERIFIED
// 2026-11-04 for 9.5.0 with the Compose compiler plugin alone).
plugins {
    alias(libs.plugins.android.library) apply false
    alias(libs.plugins.kotlin.compose) apply false
}

// The resolve step (Spec 129 Task 19.1; design § 3): `./gradlew resolveAll`, run by lane.ts before any compile. Configuring
// the build resolves the plugins; this task resolves, with their artifacts, the compile classpath of each module and the
// Kotlin compiler's own classpaths, so the Gradle cache is complete when lane.ts writes its resolved.ok marker.
tasks.register("resolveAll") {
    group = "harness"
    description = "Resolves every dependency the three compile tasks need, so a registry fault shows before any compile."
    doLast {
        for (path in listOf(":tokens", ":probe", ":dp")) {
            val module = project(path)
            for (name in listOf("debugCompileClasspath", "kotlinCompilerClasspath", "kotlinBuildToolsApiClasspath")) {
                val configuration = module.configurations.findByName(name) ?: continue
                if (!configuration.isCanBeResolved) continue
                // External modules only: the project dependency (:tokens) needs AGP's own artifact selection, and its outputs are
                // built, not downloaded. Every external artifact is fetched, which is what the cache must hold.
                configuration.incoming.artifactView {
                    componentFilter { id -> id is org.gradle.api.artifacts.component.ModuleComponentIdentifier }
                }.files.files
            }
        }
    }
}
