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
