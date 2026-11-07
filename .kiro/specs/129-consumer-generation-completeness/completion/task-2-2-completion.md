# Task 2.2 Completion: Swift parser (`<root>:<path> | <message>`, K-2, O-17)

**Date**: 2026-11-06
**Task**: 2.2 (Spec 129, Unit 1, parent 2)
**Agent**: Kenya (Sonnet)
**Branch**: `task/129-compile-harness-t2-swift`, cut from `task/129-compile-harness-t2` at `a55a49b57`

## 1. What changed

- **`scripts/harness/parse-swift.ts`** (new) exports `parseSwift: ParseSwift`, built against Thurgood's interface in `scripts/harness/compare.ts` without changing it. It imports only `./compare` (types, `ROOT_NAMES`, `formatKey`).
  - Only `^<path>:<line>:<col>: error: ` lines are keys. The message is the text after `error: `, each tab becomes one space, trailing whitespace is removed.
  - The key path is the diagnostic path made relative to the longest root it lies under (a root holds P when P begins with the root and `/`). No line or column.
  - A diagnostic repeated at the same path, line, column and message within one log counts once. Distinct locations that share a key count separately.
  - `outcome` is `succeeded` for exit status 0 and `failed` otherwise; never `not-run`.
  - `unrooted` holds, as printed, an error line whose path is not absolute, is under no root, or cannot make a valid key (` | `, tab, or an empty, `.` or `..` segment). It also holds an error line whose message is empty or begins with whitespace (see § 3, item 2).
  - It throws only on malformed input: a root that is not absolute (or is `/`), an unknown compile id, a non-string log, a non-integer exit status.
- **`scripts/harness/__tests__/parse-swift.test.ts`** (new): 35 cases.
- **`scripts/harness/__tests__/fixtures/parse-swift/*.txt`** (new, 10 recorded logs; list in § 2).
- The 2.2 checkbox in `tasks.md`.

## 2. Targeted tests and result

`npm run test:scripts -- parse-swift`:

```
Test Suites: 1 passed, 1 total
Tests:       35 passed, 35 total
Snapshots:   0 total
```

`npx tsc -p tsconfig.scripts.json --noEmit`: exit 0 (after `npm run generate:types && npm run generate:platform-tokens` in the fresh worktree).

Task 2's criteria rows this subtask carries (C11, C13's Swift half, C14's Swift file):

| Criterion | Evidence |
|---|---|
| An `llvm`-style single diagnostic line yields one key | `an llvm-style single diagnostic line yields one key`, on `single-error.txt`: one key, `gen:Single.swift \| cannot find 'undefinedThing' in scope`, count 1 |
| A Swift diagnostic printed twice (location and caret) is counted once | `a diagnostic printed twice (location line and caret box) is counted once`, on `swift-style-double-print.txt`: the test first asserts the message occurs twice in the log, then that the parser yields one key with count 1. A synthetic case covers a verbatim-repeated location line. |
| A missing-return fixture yields one `missing return` key | `a missing-return fixture yields one \`missing return\` key`, on `missing-return.txt`: `gen:Missing.swift \| missing return in global function expected to return 'Int'`, count 1 |
| Keys hold a root-relative POSIX path, no line or column, quoted identifiers; `gen:` relative to the platform output folder | `multi-quoted.txt` (quoted identifiers kept; no `:<digit>` in any path; the repeat at a second line counts 2), `mixed-roots.txt` (`gen:`, `pkg:`, `probe:`), and `a gen path is relative to the platform output folder` (root `/work/consumer/dist/tokens` keys `gen:DesignTokens.ios.swift`) |
| Each fixture's header names the toolchain it was recorded under | `has fixtures, each with a header naming the toolchain it was recorded under` reads every `.txt` in the folder and matches `Xcode <n>.<n> (<build>), Apple Swift <n>`; `records the local fixtures under Xcode 27.2` |
| The parser is pure: grep returns nothing | `grep -n 'GITHUB_TOKEN\|GH_TOKEN\|gh pr\|pull_request' scripts/harness/parse-swift.ts` returns no line (exit 1). The suite also asserts it, that the only import is `./compare`, and that the source holds no `process.`, `require(`, `child_process`, `fetch(` or `readFileSync`. |

### Fixtures

All were recorded on 2026-11-06 with `xcrun swiftc` under **Xcode 27.2 (27B52), Apple Swift 6.4.2 (swiftlang-6.4.2.1.9 clang-2100.4.1.1), iphonesimulator27.2 SDK**, from small scratch files in the session scratchpad (`.../scratchpad/sw/`), target `arm64-apple-ios17.0-simulator`, `-swift-version 6 -parse-as-library -c -wmo`, `-diagnostic-style llvm` except where noted. Scratch absolute paths were rewritten with `sed` to `/harness/gen`, `/harness/consumer/node_modules/@3fn/core`, `/harness/probe` and `/elsewhere/other`. Each header says so.

| Fixture | Toolchain | What it holds |
|---|---|---|
| `single-error.txt` | Xcode 27.2 | one error, quoted identifier |
| `missing-return.txt` | Xcode 27.2 | the K-4 self-test shape; one `missing return` error |
| `swift-style-double-print.txt` | Xcode 27.2 | `-diagnostic-style swift`: the location line, then the box's `` `- error: `` line (the one real double print I could produce) |
| `multi-quoted.txt` | Xcode 27.2 | `-emit-module`; three errors, one message at two lines, plus a warning with a `[#NoUsage]` suffix |
| `mixed-roots.txt` | Xcode 27.2 | one error each under `pkg`, `gen`, `probe` |
| `notes-and-warnings.txt` | Xcode 27.2 | an error followed by a `note:` |
| `warning-only.txt` | Xcode 27.2 | warning only, exit 0 |
| `no-location.txt` | Xcode 27.2 | `<unknown>:0: error: error opening input file …` |
| `relative-path.txt` | Xcode 27.2 | error printed with a relative path |
| `outside-roots.txt` | Xcode 27.2 | error under none of the roots |

**Owed, not delivered**: the one fixture cut from U1's first CI log under the pinned Xcode 26.6 (`tasks.md` 2.2's bullet; `[STACY TASKS R2]` Medium-2). That run does not exist yet. It is due after Task 5's first run and before U1 merges; the orchestrator will bring Kenya back for it. 2.2's checkbox is ticked for the local fixtures; this one fixture remains an open obligation on 2.2.

## 3. Application-time adaptations

1. **The dedupe key is the whole normalised line.** K-2 and the README say a diagnostic printed twice counts once, without saying what "twice" is. In real `-diagnostic-style llvm` output, from every shape I recorded, I did not see a diagnostic printed twice; the one real double print is the `swift` style's `` `- error: `` box line, which the `^<path>:<line>:<col>: error: ` pattern already excludes. So the identical-line dedupe is defensive (it covers a log that repeats a location line, as a non-WMO multi-job build can), and is covered by a labelled synthetic test. Cost: two real diagnostics at one path, line, column and message count once. I judge that harmless.
2. **A message that is empty or begins with whitespace goes to `unrooted`.** The interface names path problems only, but `parseKey` rejects such a message and `formatKey` would throw, and the parser must not throw on log content or drop a diagnostic. Real `swiftc` output never produced one.
3. **The path pattern is lazy and unanchored by a character class**, per K-2's `^<path>:`. So a line with text before the path (`note: /x.swift:1:1: error: …`, or a leading space) matches, its path is not absolute, and it lands in `unrooted` rather than being skipped. Conservative: a failure cannot hide there.
4. **Equal roots tie-break** in `gen`, `pkg`, `probe` order. The interface says the longest wins and says nothing about equal roots.
5. **Fixture header `source` lines** carry the exact `swiftc` flags, and the double-print fixture says it is `swift` style, not the lane's `llvm`.
6. **Fixtures carry the extension `.txt`, not `.log`.** The repository's `.gitignore` (line 30, `*.log`) ignores every `.log` file, so a `.log` fixture is silently left out of `git add`. The README's fixture format names no extension. Data's Kotlin fixtures will meet the same rule.
