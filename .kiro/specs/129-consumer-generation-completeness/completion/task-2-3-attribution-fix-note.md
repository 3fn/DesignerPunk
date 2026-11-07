# Task 2.3 follow-up: a FAILED line printed before its task's output

**Date**: 2026-11-06
**Task**: 2.3 (Spec 129, Unit 1, parent 2), a fix to `parse-kotlin.ts` found by Task 4's first real Gradle run
**Agent**: Data (Sonnet), as the secondary on Task 2; Thurgood is PRIMARY
**Branch**: `task/129-compile-harness-t2-kotlin-fix`, cut from `refs/remotes/origin/task/129-compile-harness` at `38d1d8ac0`
**Not edited**: Task 2's instruments file (Thurgood's; he appends the `## Found later` misfit entry when he joins this branch) and `harness/README.md` (see § 3).

## 1. How it was found

`lane.ts --selftest` (Task 4) compiles a planted-`internal` fixture and expects the probe module to give exactly one error. On its first real run, under Gradle 9.8.2 and Kotlin 2.4.21, the compile did that: `probe: read 2 of 2` printed and `:probe` gave K2's `INVISIBLE_REFERENCE`. The self-test still reported FAIL, with zero probe entries, because the parser had put the `e:` line in `unattributed`.

The cause is the order of the log. The parser (and the README, "Data's rule; ruled 2026-11-06, his observation 3") reads a `> Task` line with an outcome suffix as the END of a task's output. In the 2026-11-04 logs that held: the header came first, then the output, then `FAILED`. In this log Gradle printed the failing task's `FAILED` line first, and the task's own output after it:

```
> Task :probe:compileDebugKotlin FAILED
probe: read 2 of 2 index names (2 reads in total)
e: file:///…/ProbeTokens.kt:21:24 Cannot access 'val space_planted: Dp': it is internal in 'com.designerpunk.tokens.DesignTokens'.
```

The recorded 2026-11-04 runs (`tokens-failed.txt`) print a header when the first chunk of output arrives and the `FAILED` line at the end. The difference in this run is that the task had printed no header before it failed. I did not find Gradle's reason; this is read from two recorded orders, not from Gradle's source.

## 2. What changed

- **`scripts/harness/parse-kotlin.ts`**: one rule added to rule 2. A `FAILED` line that is the FIRST line to name its compile task stays in force, so the output after it (until the next Gradle line or `> Task` line) belongs to that task. A task that has already printed a header ends at its `FAILED` line, as before. Every other suffix still ends the header. The code is a `mentioned` set and one condition on `current`.
- **`scripts/harness/__tests__/parse-kotlin.test.ts`**: 91 tests (85 on the unit head). New: the recorded fixture case (planted error attributed to `:probe`, `unattributed` empty, outcomes `succeeded`, `failed`, `not-run`), and four inline cases (stays in force until a Gradle line; ends at `FAILED` after a header; does not move a diagnostic across a later header; does not open output for a non-compile task or for `UP-TO-DATE`). The fixture-list case now names the new fixture.
- **`fixtures/parse-kotlin/planted-internal-run.txt`** (new): the self-test log, with its two paths rewritten to `/work/probe/src` and `/work/harness/android/build/reports/…`, and no other change. It is a recorded log, not synthetic. Grepped for the home-directory and scratch-path markers (the L-9 check): none (the package name `@3fn/core` appears in the roots, as in the other fixtures).
- **`fixtures/parse-kotlin/synthetic-unattributed.txt`**: case 5 ("after a task line that reports an outcome") had `:tokens … FAILED` as the first mention of `:tokens`, which the new rule reads as that task's output. I added an unsuffixed `:tokens` header before it, so the case still shows what it was written to show. The header line of the fixture says so.

## 3. Targeted tests run

- `npx jest --config scripts/jest.config.js scripts/harness/__tests__/parse-kotlin.test.ts`: 91 passed, 91 total.
- With `compare.test.ts` (the comparator tests that use the parser): 2 suites, 187 tests, all pass.
- Falsification, by hand (a scratch edit, reverted; the file is byte-identical to the one committed): removing the new condition fails 3 tests (the recorded fixture, the first inline case, the later-header case). The two cases on the old order and the non-compile case pass either way, as they should.
- Before the fix and the fixture-5 edit, the unit-head suite passed 85 of 85; with only the parser change, two `synthetic-unattributed` cases failed, which is how the fixture-5 premise was found.

## 4. Application-time adaptations

1. **The README line needs Thurgood's amendment.** `harness/README.md` § "The parser interface" says an `e:` line after a suffix line, before another compile-task header, is `unattributed`. That stays true after a task's own header; it is no longer true for a `FAILED` line that is the first mention. I did not edit the README (outside this fix's three files).
2. **The rule keys on "first mention", not on the shape of the next line.** The `FAILED`-first log and my old hand-built case 5 look the same line by line (`FAILED`, then `e:`). Only whether the task had a header before separates them. If Gradle can also print an unsuffixed header first and the `FAILED` line before the output on a later chunk, that order is not covered; no recorded log shows it.
3. **Residual**: a `FAILED` line that is the first mention but is followed by an `e:` line that really belongs to another task would be read under the failing one. The lane runs without parallel execution, which is what prevents two tasks printing together.

## 5. A second order, from the first CI run (2026-11-07): the first-mention rule was too narrow

**How it was found.** The first CI shakedown (`native-harness.yml` run 42323861901, `harness-android-components`) failed `parser`, `pre-compile` and `format`: 291 `e:` lines unattributed, and `android.tokens exited non-zero with no parsed error`. Thurgood read it as a second attribution case. I read the artifact myself (`gradle.txt`, 1216 lines, a cold run: the wrapper downloaded Gradle, and no self-test had warmed the daemon) before changing anything. The order at lines 39–55:

```
> Task :tokens:compileDebugKotlin          <- header; harness-sources / harness-toolchain lines
> Task :dp:compileDebugKotlin              <- header; its harness-sources line
> Task :tokens:compileDebugKotlin FAILED   <- :tokens was already mentioned
e: …/ComponentTokens.android.kt:15:30 …    <- 291 lines, all :tokens'
> Task :dp:compileDebugKotlin              <- a second :dp header, then :dp's own e: lines, and `> Task :dp:compileDebugKotlin FAILED` at line 1169
```

The reading is right. Section 2's rule (a `FAILED` line keeps its task in force only when it is the first line to name that task) does not cover it, because `:tokens` had printed a header at line 39. The same output order is not a property of "first mention": Gradle prints a failing compile task's `FAILED` line before some of that task's output, whether or not an earlier chunk of its output had a header.

**What changed** (`task/129-compile-harness-t2-kotlin-fix-2`, cut from the unit head `d5ed8f08f`):
- **`scripts/harness/parse-kotlin.ts`**: the `mentioned` set is gone. A `FAILED` line of a compile task keeps that task in force until the next `> Task` line or Gradle line, always. Every other suffix still ends the output. This reads all three recorded orders alike: header, output, `FAILED` and nothing after (2026-11-04); `FAILED` with no header before it (the planted-internal run, 2026-11-06); and `FAILED` after another task's header, with the task's output after it (the cold CI run, 2026-11-07).
- **`fixtures/parse-kotlin/ci-cold-run-cut.txt`** (new, recorded): a cut of that log (lines 1–60, 335–352, 636–642 and 1166–1216; the runner's folders rewritten to `/work/consumer` and `/work/repo`; nothing else changed; no home-directory or scratch-path marker). Its expected counts come from an independent pass (a separate state machine): 17 `e:` lines under `:tokens`, 14 under `:dp`, none unattributed.
- **`fixtures/parse-kotlin/synthetic-unattributed.txt`**: case 5 ("after a task line that reports an outcome") had a compile task's `FAILED` line followed by an `e:`, the shape the CI run showed is real. It now follows a compile `FAILED` line with an unrelated `UP-TO-DATE` task line before the `e:`, which still leaves it under no header in force.
- **`scripts/harness/__tests__/parse-kotlin.test.ts`**: 95 tests (91 before). New or changed: the cold CI order (`FAILED` after a header, with later output and a second `:dp` header), the 2026-11-04 order, the end at a Gradle line or another suffix, and the two CI-fixture cases; the case that expected an `e:` after a header-then-`FAILED` to be unattributed is replaced, because that is the shape the CI run showed.

**Tests run.**
- `npx jest --config scripts/jest.config.js scripts/harness`: 7 suites, **535 passed, 535 total**.
- With the new condition reverted to the old behaviour (a scratch edit, reverted), 6 parser tests fail: the CI fixture's two cases and four of the earlier ones.
- The full CI `gradle.txt`, parsed with the run file's roots: `android.tokens` failed, 291 diagnostics in 25 keys; `android.dp` failed, 727 diagnostics in 238 keys; 0 unrooted, 0 unattributed, log complete. These are the numbers of my local run of the same install on 2026-11-06.

**Should the lane do anything differently on a cold run?** No. The two orders come from Gradle's output timing: with the daemon warmed by the self-test, the planted-internal log had `FAILED` first with no header; the cold run printed the `FAILED` line after another task's header. A lane that tried to control this (running the self-test first, or serialising output) would only choose which order appears. The parser reads every order seen so far. A different order may still turn up; the cost of a wrong attribution is a loud `parser` or `pre-compile` failure, not a silent pass.

**Residual.** A `FAILED` line followed by an `e:` that really belongs to another task would be read under the failing one. The lane runs without parallel execution, and Gradle repeats a header when it switches tasks, which is what prevents that. Section 4's note on harness/README.md stands: its line on suffixed task lines needs Thurgood's amendment, now for every `FAILED` line, not only a first mention.

**Incidental, for Task 5.** The CI log shows one warning at `harness/android/dp/build.gradle.kts:45`: `srcDir(Any)` is deprecated in AGP 9 ("Use `directories` mutable set instead"). It is a `w:` line, not keyed, and the build passes; the replacement is a one-line change to Data's Gradle file, owed in Task 4 if Thurgood wants it.
