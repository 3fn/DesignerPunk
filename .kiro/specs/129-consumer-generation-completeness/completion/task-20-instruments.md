# Task 20 — Instruments block

**Written**: 2026-11-07 (UTC), before subtask 20.1 (unit branch `task/129-20-default-name-compile`, cut from `refs/remotes/origin/main` @ `f28a1fefd`, tasks amendment 10) · **PRIMARY**: Data (Sonnet) · Thurgood (Sonnet), 20.2
**Form**: Start Up Tasks item 8's execution-time block. **Sha convention**: `git log -1 --format=%h -- <path>` at `f28a1fefd`.
**Criteria order**: Task 20's 12 criteria as merged: C1 the `--default-name` option · C2 the verdict function · C3 the probe-kotlin tests and the config-copy case · C4 the workflow step and its test · C5 the paths the step does not write · C6 `HarnessConsumer` kept · C7 `.github/**` limited to the workflow, the gate count and the guard registry unchanged · C8 the step's annotation at head H · C9 the durations · C10 all four contexts on the PR · C11 records whose Trigger names `task-20-completion.md`.

| # | Criterion (short ref) | Instrument | State | Fit (one line, `exists` rows) | Dependent subtasks |
|---|---|---|---|---|---|
| 1 | C1 the option | `harness/android/lane.ts` | exists (`harness/android/lane.ts` @ `05beb0dfc`) as the file 20.1 extends | `main` takes `--consumer`, `--work`, `--selftest`; it has no `--default-name`, no config copy, no `mkdtemp` step | 20.1 |
| 2 | C1 the probe for a name | `scripts/harness/probe-kotlin.ts` (`generateProbe`, `writeProbe`, `probeConfigFromManifest`), `scripts/harness/native-rules.ts` (`providerReads`) | exists (`probe-kotlin.ts` @ `74d7566f5`; `native-rules.ts` @ `74d7566f5`) | `generateProbe` takes a `ProbeConfig` name and themes, so the resolved config can be passed in; it writes `ProbeFamily.kt` among its files | 20.1 |
| 3 | C1, C2 the log parser | `scripts/harness/parse-kotlin.ts` (`parseKotlin`) | exists (@ `74d7566f5`) | returns `compiles[0..2]` (`tokens`, `probe`, `dp`), `unattributed` and `logComplete`; `:dp` reads `not-run` in this lane | 20.1 |
| 4 | C1 the copy's `generate` and `loadConfig` | a packed consumer root (`harness-consumer.json`, `node_modules/@3fn/core`) | exists locally (the scratch `mp4/consumer-pruned`, the MP-4 consumer, pruned to `@3fn/core`); in CI, the `harness-generate` upload, which the step downloads | the same shape the CI upload has: `@3fn/core` alone in `node_modules`, so `js-yaml` is missing until the lane links it | 20.1 |
| 5 | C1 the Gradle toolchain | JDK 17, Gradle 9.8.2, Android SDK, offline Gradle cache (`harness/android/`, `harness/pins.yaml`) | exists locally (scratch toolchain; the MP-4 run used it); in CI, the job's own setup | MP-4 compiled `:tokens` and a probe holding only `ProbeFamily.kt` with it | 20.1 |
| 6 | C2, C3 the committed passing log | `evidence/2026-11-07-mp4-default-name-run/gradle-tokens-and-probefamily.txt` @ `c09b9be27` | exists (@ `c09b9be27`, unchanged on `main`) | `BUILD SUCCESSFUL`, `gen=3`, `probe: provider read 5 of 5` | 20.1 |
| 7 | C3 the config-copy case | `evidence/2026-11-07-mp4-default-name-run/consumer.designerpunk.config.spelled-out-reference.ts` | exists (@ `c09b9be27`) | the config `init` writes, with top-level `name`, `abbreviation` and two theme entries each with its own `name:` | 20.1 |
| 8 | C3 the test file and fixtures | `scripts/harness/__tests__/probe-kotlin.test.ts`, `scripts/harness/__tests__/fixtures/kotlin/**` | exists (`probe-kotlin.test.ts` @ `05beb0dfc`) as the file 20.1 extends | already holds the Task 19 classifier cases; the verdict's cases are built here | 20.1 |
| 9 | C4 the workflow and its test | `.github/workflows/native-harness.yml`, `scripts/harness/__tests__/native-harness-workflow.test.ts` | exists (both @ `05beb0dfc`) as the files 20.2 edits (Thurgood) | Task 19's assertions are in the test today | 20.2 |
| 10 | C4, C7 the grant | `.kiro/issues/2026-11-07-default-name-compile-grant.md` (`**Grant paths**`) | exists (@ `bfead6798`), activated by amendment 10's merge | admits the one step and a comment in `harness-android-tokens` | 20.2 |
| 11 | C7 the gate count and the guard registry | `tools/agent-generator/verify-gate-registration.sh` @ `4a8486389`; `.github/in-lane-guards.json` @ `16d44a500` | exists | both test files this unit changes are registered already (L281, L305) | — |
| 12 | C6 the pins | `harness/pins.yaml` | exists (@ `de307e1d7`) | `consumer.name: HarnessConsumer`, `abbreviation: HX` | — |
| 13 | C9 the durations | the GitHub Actions jobs API; `scripts/harness/stability.ts` (`completed_at − started_at`) | exists (`stability.ts` @ `3422fc026`); the API read is built at H | the definition of a duration this unit's record uses | completion doc |
| 14 | C10 all four contexts on the PR | the PR's four check runs at head H | MISSING → orchestrator: the PR opens at Task 20's completion; none exists now. Route: the follow-up commit cites them, as in U3a → resolved 2026-11-07: exists (PR #747's `native-harness` run https://github.com/3fn/DesignerPunk/actions/runs/42427309603 @ `d3b3c2d647be9d918a8255bb3cfba11de89734bd`), fit: the four contexts' check runs on the unit's PR, each with a `harness-verdict` annotation and a `harness-summary` line (pasted in `task-20-completion.md`). | — | none of 20.1, 20.2 |
| 15 | C11 records whose Trigger names `task-20-completion.md` | `grep -l "task-20-completion" .kiro/issues/*.md` | none — a command run and pasted in the completion doc (at `f28a1fefd` it names the grant record) | — | — |

**Counts**: listed **14**, plus **1** none row (row 15, not counted) = 15 rows. exists **13** (rows 1–13) · built-here **0** as whole instruments (the verdict function, fixtures and falsification cases are 20.1's product, not a prior instrument) · missing **1** (row 14) when written; row 14 is resolved to exists at head H (appended in place), so at H: exists 14, missing 0. N = E + B + M = 13 + 0 + 1 = 14.

**What the MISSING row stops**: nothing before Task 20's completion doc.

## Found later

_(none yet)_
