# Task 19.1 Completion: the resolve step, the marker and the infra classifier

**Date**: 2026-11-07
**Task**: 19.1 (Spec 129, Unit 3a, parent 19)
**Agent**: Data (Sonnet)
**Branch**: `task/129-19-harness-infra-data`, cut from `main` @ `c73f41ede` (amendment 7 merged). Not ticked and not merged into `task/129-19-harness-infra`: Thurgood joins it.

## 1. What changed

- **`harness/android/build.gradle.kts`**: a root task `resolveAll`. It resolves, with their artifacts, the `debugCompileClasspath` of `:tokens`, `:probe` and `:dp` and the Kotlin compiler's two classpaths (`kotlinCompilerClasspath`, `kotlinBuildToolsApiClasspath`), for external modules only (the project dependency `:tokens` needs AGP's own artifact selection and is built, not downloaded). Configuring the build resolves the plugins, so a plugin-portal fault fails the same call.
- **`harness/android/lane.ts`**:
  - `runGradle(…, ['resolveAll'])` runs once before any compile, from `resolveAndReport`. `resolveStep` writes `harness-out/resolved.ok` only when it exits 0, keeps `resolve.txt`, and removes stale copies of the marker and `infra.json` first.
  - `classifyResolveFailure(log)` (exported, pure). Infra: a 403, a 429 or a 5xx status, or a transport failure (connection refused or reset, timeout, handshake failure, unknown host), from `repo.maven.apache.org`, `repo1.maven.org`, `plugins.gradle.org`, `services.gradle.org`, `dl.google.com` or `maven.google.com`. It reads `Could not GET '<url>'`, `Received status code N`, the wrapper's `Downloading <url>` and `Server returned HTTP response code`. Ordinary: a 404/401/400/410, "Could not find", "No matching variant/configuration/capability", "Cannot find a version/variant", a status from a host that is not a registry, or a log with no fault. **Any ordinary signal wins over an infra one**, so a real defect cannot hide behind a registry fault in the same log.
  - An infra failure writes `harness-out/infra.json` (`{ host, status, step }`, `step` is `wrapper`, `plugins` or `dependencies`), writes **no run file**, prints `harness-infra: <host> <status> <step>` and exits 1. An ordinary failure writes both run files with `checks: [{ name: "resolve", ok: false, detail }]`, no compile, exit 0, so the comparator fails the context as `check`.
  - `--selftest` runs the same resolve step first; an infra fault there writes `infra.json` to `--infra-out <dir>` (default: the self-test's work folder) and fails the self-test.
- **`scripts/harness/__tests__/probe-kotlin.test.ts`**: 71 tests (55 before). **Fixtures** `fixtures/kotlin/resolve/`: `resolve-403-cut.txt` (RECORDED: cut from run 42379456009, job 128424053186; its header names both), `resolve-unknown-host.txt` (RECORDED with the fault induced, a bogus proxy on an empty `GRADLE_USER_HOME`), and `resolve-429.txt`, `resolve-503.txt`, `resolve-404.txt`, `resolve-could-not-find.txt` (SYNTHETIC, in the shape of the recorded 403; each header says so). Each fixture's header states the classification it expects.

## 2. Targeted tests run

- `npx jest --config scripts/jest.config.js scripts/harness`: 8 suites, **582 passed, 582 total** (`probe-kotlin` 71). `npx tsc -p tsconfig.scripts.json --noEmit`: no error beyond the two missing generated-types imports of a fresh worktree.
- The cases the criterion names: the recorded 403 cut classified `infra repo.maven.apache.org 403 plugins`; 429, 503 and unknown-host each infra; 404 and "Could not find" each ordinary; the marker written after a successful fake resolve and absent after a failed one; an infra failure with `infra.json`, no run file and exit 1; an ordinary failure with the failing `resolve` check in both run files and no compile. Also: a mixed log (a 403 plus "Could not find", or "No matching variant") is ordinary; a 403 from a non-registry host is ordinary; a connection refused or timeout is infra from a registry and ordinary from anything else.
- Falsification, by hand (scratch edit, reverted): disabling "ordinary wins" fails the mixed-log case; not writing the marker fails 2.
- **Local lane, session toolchain** (Temurin 17.0.21, wrapper 9.8.2): `./gradlew resolveAll` exit 0; `lane.ts --selftest` PASS; `lane.ts` on a compiling hand-written tree wrote `resolved.ok`, printed `resolve step ok`, then all five checks `ok`; on the real packed install it wrote `resolved.ok` and the blocked checks as before. With an empty `GRADLE_USER_HOME` and a bogus proxy the lane printed `harness-infra: services.gradle.org unknown-host wrapper`, wrote `infra.json` and no run file. No CI run is cited: none has exercised this change.

## 3. Application-time adaptations

1. **The unknown-host fixture is recorded but induced.** A real DNS outage names the registry host in the exception; the proxy trick names the proxy. The classifier attributes a transport fault to the host of the nearest preceding `Could not GET` or `Downloading` URL, so both give the registry host.
2. **`resolveAll` resolves external modules only.** A first version resolved `:probe`'s classpath with its project dependency and failed with a variant ambiguity; an artifact view filtered to external modules fixes it, and every downloaded artifact is still fetched.
3. **The self-test needed the same step** (the tokens job runs it before the lane, cold), so it classifies too; the workflow must pass `--infra-out "${GITHUB_WORKSPACE}/harness-out"` for its `infra.json` to be where the annotation step reads. That workflow line is 19.2's (Thurgood).
4. **A 429 or 5xx is infra whatever the artifact**; a 404 is ordinary even from a registry. A registry that 404s a coordinate Gradle then finds elsewhere prints nothing, so only a real miss reaches the log.
5. **The classifier is text matching** on Gradle 9.8.2's messages, validated against one recorded 403 log and one recorded wrapper failure; the 429, 503, 404 and "Could not find" shapes are hand-built from it. A different Gradle version may word them differently; the safe failure is `ordinary`, which fails the context loudly.
