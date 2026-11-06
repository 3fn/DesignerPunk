# Task 2.3 Completion: Kotlin parser (D § 1.2)

**Date**: 2026-11-06
**Task**: 2.3 (Spec 129, Unit 1, parent 2)
**Agent**: Data (Sonnet), as the secondary on Task 2; Thurgood is PRIMARY
**Branch**: `task/129-compile-harness-t2-kotlin`, cut from Thurgood's `a55a49b57`

## 1. What changed

- **`scripts/harness/parse-kotlin.ts`** (new) exports `parseKotlin`, of type `ParseKotlin` from `compare.ts`. It imports only the types, `KOTLIN_COMPILE_TASKS` and `parseKey` from `./compare`. The rules are listed once in the file's header comment; in short:
  - A diagnostic starts at `e: file://<path>:<line>:<col> ` and runs to the next `e: ` or `w: ` line or the next Gradle line (`> `, `FAILURE`, `* `, `BUILD`, `[Incubating]`). `w:` lines are not keyed.
  - It belongs to the task whose `> Task` header (one with no outcome suffix) was last printed. A Gradle line of any kind, or a task line with a suffix, ends the header in force. A diagnostic under no header in force, or under a task other than the three compiles, goes to `unattributed`, as printed.
  - The `file://` URI is percent-decoded, placed under the longest root holding it, and keyed `<root>:<relative path> | <message>`. The message is the text after `<line>:<col> `, with each continuation line collapsed to single spaces, blank ones dropped, and the lines joined by ` ⏎ `.
  - A diagnostic that cannot make a valid key goes to the owning compile's `unrooted`, as printed: no `file://<path>:<line>:<col>` location, a relative path, a path under no root, a path with ` | `, a tab or a `.`, `..` or empty segment, a bad percent sequence, or an empty message.
  - Each compile's `outcome` follows the README: `failed` on a ` FAILED` line, else `succeeded` on a line with no suffix, `UP-TO-DATE` or `FROM-CACHE`, else `not-run`. `logComplete` is true on a `BUILD SUCCESSFUL` or `BUILD FAILED` line.
- **`scripts/harness/__tests__/parse-kotlin.test.ts`** (new): 77 tests.
- **`scripts/harness/__tests__/fixtures/parse-kotlin/`** (new, 92 KB). Each fixture `.txt` is a log and begins with the four `#harness-fixture` header lines (toolchain, source, exit, roots):

| Fixture | Source (all Data's 2026-11-04 K2 round; backup `.claude/scratch-backup/q5-data-work/`) | Toolchain in its header |
|---|---|---|
| `tokens-failed.txt` | `run-components.log`, whole (344 lines, 302 `e:` diagnostics). `:tokens` fails and Gradle stops; `:dp`'s compile never ran. | Temurin OpenJDK 17.0.21+9 (macOS arm64), Gradle 9.8.2, AGP 9.5.0, Kotlin 2.4.21, Compose BOM 2026.09.00, compileSdk 36, minSdk 24 |
| `dp-failed-cut.txt` | `run-android-combined-cold.log`, cut: 124 of the 743 `e:` blocks kept (the blocks for 12 files, whole and in order), every other line as recorded. Holds 13 multi-line diagnostics. | the same, minSdk 24 |
| `no-task-headers.txt` | `layout-collide2.log`, whole: an adopter-layout probe with a planted `Ours.kt` that redeclares `ProgressTokens`. Holds no `> Task` lines (the capture was filtered or run quiet; which was not recorded). | the same, minSdk 26 |
| `synthetic-interleaved.txt` | **Synthetic**, hand-built 2026-11-06. `:tokens` and `:dp` compile at the same time, each chunk under a repeated `> Task` header. For Thurgood's risk 6. | "none (SYNTHETIC …)", naming the toolchain its line shapes were copied from |
| `synthetic-unattributed.txt` | **Synthetic**, hand-built. Five ways an `e:` line sits under no single compile task, and one that does. | as above |
| `tokens-failed.keys.tsv`, `dp-failed-cut.keys.tsv` | The expected keys and counts of the two big fixtures, from an **independent** pass (a separate Python script, not this parser, kept in the session scratchpad: the same rules written again, over the fixture files). | not logs |

- **Rewrites made to the recorded logs.** The scratch path `…/q5-round/data-work/host/{tokens,components}/src/main/kotlin/` became the `gen` root for `DesignTokens.android.kt` and `ComponentTokens.android.kt`, and, for every other file in `dp-failed-cut.txt`, that file's own package path under the `pkg` root (`src/components/core/<Family>/platforms/android/<File>`, `src/blend/…`), taken from the in-place paths of `run-adopter.log` of the same round. Remaining scratch paths (the problems-report URL, the `Location:` lines) became `/work/harness`. The Gradle module was renamed to `:dp` (it was `:components`, `:combined` or `:designerpunk`) because `KOTLIN_COMPILE_TASKS` names `:dp`. Roots in the headers: `gen=/work/consumer/dist/tokens pkg=/work/consumer/node_modules/@3fn/core probe=/work/probe/src/main/kotlin`. Nothing else in a log was changed; the three headers say what was rewritten.

## 2. Targeted tests run

- `npm run test:scripts -- parse-kotlin`:

```
PASS scripts/harness/__tests__/parse-kotlin.test.ts
Test Suites: 1 passed, 1 total
Tests:       77 passed, 77 total
```

- `npx tsc -p tsconfig.scripts.json`: no error in `scripts/harness/**`. The two errors it prints are the missing `generated/TokenTypes` imports of a fresh worktree (`scripts/verify-opacity-types.ts`, `src/types/index.ts`), not this change; the generators were not run.
- `grep -nE "GITHUB_TOKEN|GH_TOKEN|gh pr|pull_request" scripts/harness/parse-kotlin.ts scripts/harness/compare.ts`: no line (exit 1). The suite also asserts it, and asserts that `parse-kotlin.ts` imports only `./compare` and uses no `process.`, `require`, `fetch` or child process.
- Falsification, run by hand (a scratch edit of `parse-kotlin.ts`, reverted each time; the file is byte-identical to the committed one): joining continuation lines with a plain space fails 16 tests; dropping `w:` as a terminator fails 1; dropping `FAILURE` as a Gradle line fails 2; keeping the header in force across a Gradle line fails 2; keeping it in force across a suffixed task line fails 2. One scratch edit, removing the `absolutePath.length > prefix.length` guard, fails nothing: with a trailing-slash prefix the guard cannot fire for an ordinary root, so it is a defence for a root of `/` only. It is kept.
- Mapping to Task 2's criteria for 2.3: multi-line join (`multi-line diagnostics`, and the 13 multi-line keys of `dp-failed-cut.txt`); a `w:` line yields no key and ends a diagnostic (`warnings and where a diagnostic ends`); the `e: `, `w: ` and each Gradle-line terminator (`it.each` over `> Task … FAILED`, `> Run with …`, `FAILURE`, `* `, `BUILD`, `[Incubating]`); the key form (`the key`, root-relative POSIX path, `gen:` relative to its output folder, no line or column, quoted identifiers); the toolchain header on every fixture (`fixtures recorded under …`); outcomes and attribution to the printing task, never by path (`outcomes`, `attribution`, and `synthetic-interleaved.txt`); purity (`purity`).

## 3. Application-time adaptations

1. **A location-less `e:` line goes to `unrooted`, not nowhere.** A general error such as `e: Compilation failed …` has no `file://` location, so it cannot make a key. The README says an unrooted row is "a path that is not absolute, is under no root, or cannot make a valid key", and that a row is never dropped. Dropping it would hide a failure when other diagnostics were keyed, so it goes to the owning compile's `unrooted` and the comparator fails the context as `parser`. The Swift parser's README line for the same case differs ("not a key and not `unrooted` either"); the Swift text is Kenya's call.
2. **A key whose path holds ` | ` is unrooted, not re-keyed.** `parseKey` alone accepts `gen:a | b.kt | msg` (it splits at the first ` | `, giving path `a`). The parser therefore also checks that the key splits back into the same path and message, as `formatKey` does. A test caught this on the first run.
3. **Blank continuation lines are dropped; repeated continuation lines are kept.** The README says "continuation lines joined by ` ⏎ `". The recorded "None of the following candidates is applicable" diagnostics hold blank lines between candidates, and print some candidates twice. A blank line would make an empty segment, so it is dropped; a repeated line is what the compiler printed, so it stays.
4. **The header in force ends at a Gradle line or a suffixed task line.** The README says a diagnostic "belongs to the task it was printed under". It does not say when a header stops being in force. Ending it at any Gradle line and at any task line with a suffix (`FAILED`, `UP-TO-DATE`, …) makes a stray `e:` after one `unattributed` (loud) instead of read under a task that has ended (silent).
5. **Fixture module names were rewritten** (`:components`, `:combined`, `:designerpunk` → `:dp`), and the K2 flat folders were mapped to package paths by basename. This is a labelled rewrite, not a recording: no 2026-11-04 log has the real three-module shape, so no recorded log has `:probe` lines, or two compile tasks in one run.
6. **The interleaved fixture rests on an unverified reading of Gradle.** It assumes Gradle's plain console repeats a task's `> Task` header before each chunk of that task's output when another task's output has come between. That is my reasoning from Gradle's grouped output, not seen in a recorded log, and the fixture's header and the parser's comment say so. Task 4 should not depend on it (see the report to the orchestrator: run the build without parallel execution).
7. **`i:` and `v:` lines are not terminators.** The README lists `e: `, `w: ` and the Gradle lines. The Kotlin compiler's `i:` (info) and `v:` (verbose) lines are not printed at Gradle's default log level, so none is in a recorded log; if one is ever printed, it would join the preceding diagnostic as a continuation. Not added, because the list is Thurgood's; observed for him.
8. **The fixtures are `.txt`, not `.log`.** The repository's `.gitignore` (line 30) ignores `*.log`, so a `.log` fixture would not have been committed. The README does not name an extension; the Swift fixtures (2.2) will meet the same rule.
9. **`compare.ts` and `harness/README.md` are untouched.** The interface held everything found.
10. **Two rulings applied after the first push (Thurgood, `harness/README.md` at `3a9f02500`).** (a) An `e:` line with no `file://` location is now neither a key nor `unrooted` nor `unattributed` (adaptation 1 is superseded); it is skipped, and it still ends the diagnostic before it. The cost, which Thurgood names and I accept as ruled: such a line goes unseen when keyed errors come with it, and shows only as `pre-compile` when the compile is `failed` with no diagnostics. I would still prefer `unrooted`, since an unseen error beside keyed ones can hide a real failure behind a list match; the rule is his, and the code builds to it. (b) `i: ` and `v: ` lines now end a diagnostic and are never keyed (adaptation 7 is superseded). Tests: the old "no location goes to unrooted" case was red against the new parser and is replaced by `an e: line with no location` (4 lines x 3 shapes, plus 2 more cases); `i:` and `v:` are cases in the terminator table and in a no-key test.
