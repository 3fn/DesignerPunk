# A transient plugin-resolution failure on a cold Gradle cache is classified `ordinary`, so a required context reports a code-side `check` failure for an environment fault

**Date**: 2026-11-27
**Owner**: **Thurgood**: the infra and run rules (Spec 129 design § 3, "Verdicts name their side") decide what counts as `harness-infra`, and changing them is a spec row or grant, not a lane repair (ballot `2026-11-07-native-lane-ownership` item 1: "owning the lane never authorizes changing what it decides"). **Filed by**: Data, under README rule 10. Any lane change that a ruling makes is Data's (`harness/android/lane.ts`, `probe-kotlin.test.ts` and its fixtures).
**Trigger**: `manual`: the event that owes the close is Thurgood's ruling. It is either a spec row or grant that changes the rule, with its fixing PR, or a dated ruling that the classification stands. A second observed instance is the evidence that would bring the ruling forward. Whoever sees one appends it here.
**Class**: P3 improvement · defect *(proposed by the filer, 2026-11-27, Data, rule 12. One instance has been seen, and a re-run cleared it. The lane did what its spec text says, so no claim is false. The cost is a misattributed red on a required context, and a diagnosis that looked for a code or pin cause first.)*
**Source**: run 46010655831 attempt 1, job `harness-android-components` (job id 140545606242); its `harness-out` artifact `resolve.txt` is quoted below because artifacts expire after 7 days.
**Consulted**: none needed. This files an observed failure for its owner. The decision is his and is not taken here.

---

## What happened

- The `harness-gradle-…` cache key missed, so the Gradle cache was cold. The last save had been 14 days earlier, and GitHub evicts an entry after 7 days unused. The key also hashes `harness/pins.yaml`, so every pin move starts cold too (`native-harness.yml` L333).
- The resolve step failed after 20 seconds. Gradle printed no HTTP status and no transport error at its default log level:

  ```
  * What went wrong:
  Plugin [id: 'org.jetbrains.kotlin.plugin.compose', version: '2.4.21', apply: false] was not found in any of the following sources:

  - Gradle Core Plugins (plugin is not in 'org.gradle' namespace)
  - Included Builds (No included builds contain this plugin)
  - Plugin Repositories (could not resolve plugin artifact 'org.jetbrains.kotlin.plugin.compose:org.jetbrains.kotlin.plugin.compose.gradle.plugin:2.4.21')
    Searched in the following repositories:
      Google
      MavenRepo
      Gradle Central Plugin Repository
  ```
- `classifyResolveFailure` (`harness/android/lane.ts` L493–528 at `3a3bd072b`) found no registry status and no network fault, so it returned `ordinary`. The lane wrote a failing `resolve` check, and the comparator failed the context with 93 `stale` lines and five `toolchain … reported no value` lines.
- It was transient:
  - A minute earlier, the sibling `harness-android-tokens` job resolved the same plugin from the same cold cache, as did its self-test.
  - Attempt 2 and dispatch run 46013427239 resolved it as well.

## Options the owner may weigh (not decided here)

- Run the resolve step with `--info`, so Gradle prints the status or transport error that the existing classifier already reads. This changes only what the log shows, but more runs would then be classified `infra`.
- Retry the resolve step once before classifying.
- Let the rule stand, and rely on a re-run.

Each option changes what a run reports, so each goes by a spec row or grant.
