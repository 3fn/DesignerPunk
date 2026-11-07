# Task 2.1 Completion: Formats — lists, pins, protected set, the `gen:` path rule; `harness/README.md`

**Date**: 2026-11-06
**Task**: 2.1 (Spec 129, Unit 1, parent 2)
**Agent**: Thurgood (Opus; the plan names Sonnet for 2.1. The orchestrator ran it inside the parent's Opus session, so the parser interface below could be fixed by the parent's PRIMARY)
**Branch**: `task/129-compile-harness-t2`, cut from `task/129-compile-harness` at `33380114c`

## 1. What changed

- **`harness/README.md`** (new) states the list file, pin file, protected-set and `gen:` path formats of `tasks.md` § "The list file format, the pin file and the run policy", and the key grammar of design § 1 K-2 and § 2. Each rule `tasks.md` does not state is marked *(added here)*, so that whether a file is well formed can be decided without asking. It also states the parser interface in prose, and what the comparator does with the parsers' results (design § 3, implemented in 2.4).
- **`harness/protected-set.txt`** (new) is **filled**: 20 record names, sorted. They are the 15 intake records of `requirements.md` § "Record dispositions" and design-outline rows 1, 3, 4, 15 and 22. Each was at the issues root with a `path:` Trigger at `33380114c` (checked by a loop over the 20 names, reading each file's `**Trigger**:` line). They are the same 20 records as `tasks.md` § "Merge preconditions" item 3 (19 in its table, plus the oklch record that stays on `claims-pass.md`).
- **`scripts/harness/compare.ts`** (new, partial) fixes the parser interface as TypeScript, so that Kenya (2.2) and Data (2.3) can build without asking: `Roots`, `CompileId`, `CompileOutcome`, `CompileResult`, `SwiftParseInput` and `ParseSwift`, `KotlinParseInput`, `KotlinParseResult` and `ParseKotlin`, `KOTLIN_COMPILE_TASKS`, and the key grammar as `parseKey` and `formatKey`. The verdict rules, the readers, the CLI and the summary line are 2.4's.

## 2. Targeted tests run

- `npx tsc -p tsconfig.scripts.json`: exit 0 (after `npm run generate:types && npm run generate:platform-tokens && npm run build`, exit 0; before generation, the only errors were the two missing `generated/TokenTypes` imports of a fresh worktree, unrelated to this change).
- An ad-hoc `tsx` check of `parseKey` and `formatKey` (a scratch script, not committed): 13 keys, each accepted or rejected as expected (`gen:`, `pkg:` and `probe:` keys; a message holding ` | `; an unknown root; an absolute path; `..` and empty segments; leading, trailing and empty messages; a missing separator; a tab), and `formatKey` throws on a path holding ` | `. Output: `all 13 cases as expected`. The committed cases for `parseKey` are 2.5's.
- `harness/protected-set.txt`: `LC_ALL=C sort -u` gives the same 20 lines; the file ends with a newline.
- No Jest suite exists yet under `scripts/harness/`; the three suites are 2.2, 2.3 and 2.5.

## 3. Application-time adaptations

1. **The protected set is filled at 2.1, not at 5.2.** `tasks.md` 5.2's title includes "the protected set filled". The set's members are fixed by `tasks.md` § "Protected set" and do not depend on the first run, and the file is a Task 2 Primary Artifact, not a Task 5 one. So it is filled here, and 5.2 has only to check it is current.
2. **The parser interface lives in `compare.ts`, committed at 2.1 in a partial state.** The orchestrator's brief asked 2.1 to fix the interface the comparator reads from the two parsers. A separate types module is not in Task 2's Primary Artifacts, so the types are in `compare.ts`.
3. **Rules added beyond `tasks.md`'s format text**, each marked *(added here)* in the README: the code-point sort and its `sort` command (sorting whole lines gives a different order, because the count field sits between key and tag); the count's form; the record-name and item-label patterns and what "finds it in that record's text" means; that `<owner>` in `retagged=` is the from-record's owner; no blank lines, LF and a final newline; a duplicate key-and-tag line is a format error.
4. **The pin file's structure, fixed for the toolchain match.** `ios.toolchain` and `android.toolchain` are maps of field name to a quoted string, which the comparator compares in both directions with what the lane reports. Values must be strings, because unquoted `26.10` reads as `26.1`. This shapes Kenya's and Data's sections (Tasks 3 and 4). Ada's `consumer` section is left to her; the comparator reads none of it except under exception (a).
5. **The `gen:` rule supersedes Data's design inbound § 1.2**, which keyed `gen:` paths relative to the consumer root. `tasks.md` § "The `gen:` path rule" governs, and the README states it.
6. **The fixtures are split by folder**: Task 2's go under `fixtures/compare/`, `fixtures/parse-swift/` and `fixtures/parse-kotlin/`, so that `fixtures/swift/**` and `fixtures/kotlin/**` stay with Tasks 3 and 4, whose rows grant them. A fixture header form (`#harness-fixture toolchain|source|exit|roots:`) is fixed so that the criterion "fixtures whose header names the toolchain" reads one line.
7. **Kotlin task attribution.** The interface returns each of the three Gradle compile tasks separately, because `:tokens` and `:dp` report the same generated paths, so a diagnostic cannot be placed by its path. A diagnostic the parser cannot place goes to `unattributed`, and a log without Gradle's closing `BUILD` line sets `logComplete: false`; the comparator fails on either. Both are added here and are my calls as the comparator's owner (design § 3). No 2026-11-04 log holds three compile tasks in one run, so whether Gradle's plain console keeps each task's `e:` lines together with three tasks is not yet shown (Instruments row 7).
