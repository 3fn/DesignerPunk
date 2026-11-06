# The compile harness: file formats and the parser interface

**Spec**: 129 (Consumer-Generation Completeness), Task 2 · **Owner of this file and of the comparator**: Thurgood
**Source of the formats**: `.kiro/specs/129-consumer-generation-completeness/tasks.md` § "The list file format, the pin file and the run policy", which this file states exactly. Where it adds a rule, the rule is marked *(added here)* and exists so that a file can be judged well formed without asking anyone.
**Source of the key and the verdict rules**: `design.md` § 1 (K-2), § 2 ("Capture and key") and § 3; `requirements.md` Req 2.6 and 3.1–3.11.

The harness compiles a stranger's generated tokens, and DesignerPunk's packaged native source against them, on iOS and Android. Each of four CI contexts compares what its compile reported against a committed list of expected failures. A green context means "the failures match the list". It does not mean "compiles" while the list holds entries.

## What is where

| Path | What | Owner |
|---|---|---|
| `harness/README.md` | this file | Thurgood (Task 2) |
| `harness/protected-set.txt` | the records whose entries cannot be retagged away silently | Thurgood (Task 2) |
| `harness/expected/<context>.tsv` | the four expected-failure lists | Thurgood (Task 5.2, the baselines); after U1, every PR that changes what a context reports |
| `harness/pins.yaml` | the pins: `consumer`, `ios`, `android` sections | Ada (`consumer`, Task 1), Kenya (`ios`, Task 3), Data (`android`, Task 4) |
| `harness/ios/**`, `harness/android/**` | the lanes | Kenya (Task 3), Data (Task 4) |
| `scripts/harness/compare.ts` | the comparator, and the parser interface | Thurgood (Task 2) |
| `scripts/harness/parse-swift.ts`, `parse-kotlin.ts` | the diagnostic parsers | Kenya (2.2), Data (2.3) |

The four contexts are `harness-ios-tokens`, `harness-ios-components`, `harness-android-tokens` and `harness-android-components`. `harness-generate` runs `generate` once and hands its output to them.

---

## Keys

Every expected-failure entry, and every diagnostic a parser reports, is keyed by **one string**:

```
<root>:<path> | <message>
```

- **`<root>`** is one of:
  - `gen`: the consumer's generated output for that platform (the `gen:` path rule, below);
  - `pkg`: the installed package, `<consumer root>/node_modules/@3fn/core`. Its paths are the repository's own paths, because the package root is the repository root that `npm pack` packed (design § 3, "Paths for Req 3.5 (c)");
  - `probe`: the generated probe's source folder.
- **`<path>`** is POSIX and relative to its root: no leading `/`, and no empty, `.` or `..` segment. It holds no line or column number. *(added here)* It never holds ` | ` (space, bar, space), a tab, a CR or an LF.
- **`<message>`** is the diagnostic's text, with its quoted identifiers kept. *(added here)* It is not empty, has no leading or trailing whitespace, and holds no tab, CR or LF.
  - **Swift** (Kenya, K-2): the text after `error: ` on the `-diagnostic-style llvm` line, verbatim, except that each tab becomes one space and trailing whitespace is removed.
  - **Kotlin** (Data, D § 1.2): the text after `<line>:<col> `, with its continuation lines joined by ` ⏎ ` (space, U+23CE, space), and each run of whitespace collapsed to one space.
- **The split** is at the first ` | ` after `<root>:`. So a message may hold ` | ` and a path may not.
- The executable form of this grammar is `parseKey` in `scripts/harness/compare.ts`. Any key a parser returns, and every key on a list, satisfies it.

**Which lines are diagnostics** is each parser owner's call, within the design:
- **Swift** (K-2): only lines matching `^<path>:<line>:<col>: error: `. Warnings and `note:` lines are not keys. A diagnostic printed twice (location and caret) counts once.
- **Kotlin** (D § 1.2; Task 2's criteria): a diagnostic starts at a line beginning `e: file://<path>:<line>:<col> `. It runs to the next `e: ` or `w: ` line, or the next Gradle line (`> `, `FAILURE`, `* `, `BUILD`, and the `[Incubating]` of D § 1.2). `w:` lines are not keyed. The `file://` URI is percent-decoded to a path.

### The `gen:` path rule

A `gen:` key's path is relative to **that platform's generated output folder**, not to the consumer root. Each lane reads that folder from the consumer's config, `platforms.<platform>.output`, else `output`, resolved as the CLI resolves it (relative to the config file's folder), and never from a hard-coded path. Moving a platform's folder through `platforms:` then re-keys nothing.

Example: with `output: dist/tokens`, the generated iOS tokens file keys as `gen:DesignTokens.ios.swift`, not `gen:dist/tokens/DesignTokens.ios.swift`.

---

## The expected-failure lists

**Path**: `harness/expected/<context>.tsv`, one per context, named for it: `harness/expected/harness-ios-tokens.tsv`, `harness-ios-components.tsv`, `harness-android-tokens.tsv`, `harness-android-components.tsv`.

**Lines**. One entry per line. Fields are separated by one tab:

```
<key>	<count>	<tag>
<key>	<count>	<tag>	retagged=<YYYY-MM-DD>,<owner>,<from-record>
```

- **`<key>`**: as § "Keys".
- **`<count>`**: the number of diagnostics with that key the context expects. *(added here)* A decimal integer of 1 or more, with no sign and no leading zero.
- **`<tag>`**: a root record's file name, optionally followed by `#<item label>`, for example `2026-10-20-kotlin-output-no-import-block.md` or `2026-10-03-native-generator-findings-for-spec-129-intake.md#item-2`.
  - *(added here)* The record name is a file name only, with no folder: it matches `^[A-Za-z0-9][A-Za-z0-9._-]*\.md$`. It names a file in `.kiro/issues/`.
  - *(added here)* The item label matches `^[A-Za-z0-9][A-Za-z0-9._-]*$`. The comparator "finds it in that record's text" (Req 3.2) when the label occurs in the record with no character from `[A-Za-z0-9._-]` directly before or after it.
- **`retagged=…`** (optional, fourth field): present when the entry's tag was moved away from a protected record (Req 3.7).
  - `<YYYY-MM-DD>` is the date of the retag, a real calendar date.
  - `<owner>` is the owner of `<from-record>`, as named on that record's `**Owner**:` line, whose act the retag is (plan-r2 § 5: "the owner's dated reason"). *(added here)* It matches `^[A-Z][A-Za-z]*$` (a seat name, or `Peter`).
  - `<from-record>` is the record the entry was tagged to before, a record name with no item label.
  - The field may stay on the entry after the PR that added it.

**Order**. Entries are sorted by key, then by tag. *(added here)* The comparison is by Unicode code point, which for UTF-8 text is the order of `LC_ALL=C sort -t "$(printf '\t')" -k1,1 -k3,3`. Sorting whole lines is not the same order, because the count field sits between the key and the tag.

**Splits and duplicates**. A key may appear on more than one line, each with a different tag and its own count (Req 3.2, Data R1). The comparator sums the counts per key. *(added here)* The same key with the same tag on two lines is a format error.

**Comments**. A line beginning `#` is a comment, allowed only above the first entry.

**The rest** *(added here)*:
- UTF-8, LF line endings, and a final newline after the last line.
- No blank lines anywhere.
- A file with no entries is valid (an empty file, or comments only). That is D1's acceptance state for the token lists.
- Any other line is a format error, and a list with a format error fails its context.

One line per entry keeps two PRs from conflicting unless they edit the same key.

---

## The pin file

**Path**: `harness/pins.yaml`, one file with three top-level sections:

```yaml
consumer:    # Ada, Task 1: the scratch consumer, including its config abbreviation (not DP)
  ...
ios:         # Kenya, Task 3
  runner: macos-26
  toolchain:
    <field>: "<value>"
    ...
  ...        # SDK, Swift language modes, compile flags, deployment target, image version, the "harness pins, not minimums" statement
android:     # Data, Task 4
  runner: ubuntu-24.04
  toolchain:
    <field>: "<value>"
    ...
  ...        # compileSdk, minSdk, the libraries and their versions, the "harness pins, not minimums" statement
```

**What the comparator reads in it** *(the structure below is added here, so that the toolchain match is decidable)*:
- **The document** is a YAML mapping whose only top-level keys are `consumer`, `ios` and `android`, each a mapping. Anything else is a format error.
- **`ios.toolchain` and `android.toolchain`** are mappings from a field name to a **quoted string** (a YAML string, never a number: unquoted, `26.10` would read as `26.1`). They are what Req 3.11's toolchain match compares.
  - The field names are the lane owner's (Kenya: Xcode version, build and app path, SDK version and build, Swift version, per K-6; Data: `java.version`, the Gradle, Kotlin, AGP and Compose BOM versions, per D § 1.5).
  - Each lane reports the toolchain it found as the same field names with the values it read.
  - The match fails when the reported field names differ from the pinned ones in either direction, or when any value differs as a string.
- **`runner`**: the runner label, the same one the workflow's `runs-on` names (Req 2.8). The comparator does not read it.
- Everything else in a section is that owner's, and the comparator reads none of it, except for exception (a) below.

**Exception (a)** (Req 3.5 (a)). An addition is admitted when a pinned value changes. The comparator parses the file at the head and at the merge base and compares the **parsed documents**, with mapping key order ignored. So a comment-only or whitespace-only edit changes no pin, and any changed value, anywhere in the file, does.

---

## The protected set

**Path**: `harness/protected-set.txt`. One record file name per line, sorted.

**Contents**: the 129 intake records of `requirements.md` § "Record dispositions" (15), plus design-outline rows 1, 3, 4, 15 and 22 (5), so 20 names. Each was at the issues root, with a `path:` Trigger, at `33380114c`.

**Format** *(the rules after the first are added here)*:
- One name per line, each matching `^[A-Za-z0-9][A-Za-z0-9._-]*\.md$`, with no folder.
- Sorted by code point (`LC_ALL=C sort`), with no duplicates.
- No comments, no blank lines; UTF-8, LF line endings, a final newline.

**What it does** (Req 3.7):
- Moving an entry's tag away from a record in this set fails the context, unless the entry carries `retagged=…` and the same diff appends a line naming the key to the record the entry came from.
- Removing a name from this file while that record is still at the issues root fails the context. A name whose record has been archived may be removed.

---

## The parser interface

**The normative form is the TypeScript in `scripts/harness/compare.ts`**: the types `Roots`, `CompileId`, `CompileOutcome`, `CompileResult`, `SwiftParseInput`, `ParseSwift`, `KotlinParseInput`, `KotlinParseResult` and `ParseKotlin`, and the functions `parseKey` and `formatKey`. This section says the same in prose.

**The exports**:
- `scripts/harness/parse-swift.ts` exports `parseSwift`, of type `ParseSwift`: `(input: { compile, log, exitCode, roots }) => CompileResult`.
  - The lane calls it once per `swiftc` stage it ran. `compile` is `ios.T`, `ios.P`, `ios.C` or `ios.T5` (design § 1 K-1).
- `scripts/harness/parse-kotlin.ts` exports `parseKotlin`, of type `ParseKotlin`: `(input: { log, exitCode, roots }) => KotlinParseResult`.
  - The lane calls it once on the one Gradle invocation (design § 2). It returns three `CompileResult`s, for `android.tokens`, `android.probe` and `android.dp`, in that order, plus `unattributed`, `logComplete` and `exitCode`.

**What a `CompileResult` holds**: `compile`, `outcome` (`succeeded`, `failed` or `not-run`), `diagnostics` (key → count, count ≥ 1), and `unrooted`.

**The roots** are passed in, never found by the parser. `roots.gen` is the platform's output folder (the `gen:` path rule), `roots.pkg` the installed package root, `roots.probe` the probe source folder. Each is absolute; the lane passes them in the same form as the file paths it gave the compiler. A diagnostic's path is under the longest root it starts with (followed by `/`). A path that is not absolute, is under no root, or cannot make a valid key goes to `unrooted`, never dropped.

**Exit status**:
- Swift: `outcome` is `succeeded` when `exitCode` is 0, else `failed`. The Swift parser never returns `not-run`; a stage the lane did not run (Stage P while blocked) is not passed to it.
- Kotlin: each task's `outcome` comes from its `> Task :<module>:compileDebugKotlin` lines: `failed` when one ends ` FAILED`; else `succeeded` when one has no suffix, `UP-TO-DATE` or `FROM-CACHE`; else `not-run` (no such line, or `SKIPPED` or `NO-SOURCE`).
  - `:tokens` and `:dp` report the same generated paths, so a diagnostic belongs to the task it was printed under, never to a task chosen by its path. In the 2026-11-04 logs (`run-components.log`), the task's `> Task` line comes before its `e:` lines and its ` FAILED` line after them.
  - A diagnostic the parser cannot place under exactly one of the three tasks goes to `unattributed`.
  - `logComplete` is true when the log carries Gradle's closing `BUILD SUCCESSFUL` or `BUILD FAILED` line.

**"Parsed nothing"** is an ordinary result: a compile with `outcome` set and an empty `diagnostics`. The parser never throws on log content, and never decides a verdict. It throws only on malformed input (a root that is not absolute, an unknown compile id).

**Purity**: a parser reads no file, no environment variable, no network and no PR, and starts no process. Task 2's credential grep (`GITHUB_TOKEN`, `GH_TOKEN`, `gh pr`, `pull_request`) covers both parser files.

**What the comparator does with the results** (design § 3, implemented in 2.4; listed so the parser owners know what their output decides):
- **Which compiles each context reads, and which keys it keeps** (Req 2.6):
  - `harness-ios-tokens`: every key of `ios.T` and `ios.P`.
  - `harness-ios-components`: the `pkg:` keys of `ios.C`, plus each `gen:` key of `ios.C` that `ios.T5` does not report, counted as `cross-tier`.
  - `harness-android-tokens`: every key of `android.tokens` and `android.probe`.
  - `harness-android-components`: the `pkg:` keys of `android.dp`, plus each `gen:` key of `android.dp` that `android.tokens` does not report, counted as `cross-tier`.
- **The context fails**:
  - as `pre-compile` when a compile it reads is `failed` with no diagnostics, or a compile it needs is `not-run`, or (Kotlin) `logComplete` is false;
  - as `parser` when a compile it reads is `succeeded` with diagnostics, or any `unrooted` or `unattributed` line is present;
  - when its cross-tier baseline (`ios.T5`, or `android.tokens` in the component context) is `not-run`.
- **The probe exception**: `ios.P` and `android.probe` may be `not-run` without failing only when `ios.T` or `android.tokens` is `failed`. That is the printed "blocked" state, which is not a compile, and its count is not compared.

The comparator's command line (the files the lanes write the logs, exit statuses, toolchain fields and file counts to) is fixed in 2.4, before Tasks 3–5 wire the steps. The parsers do not depend on it.

---

## Fixtures

*(added here, so the parser suites and the probe suites do not share a folder)*
- Task 2's fixtures live under `scripts/harness/__tests__/fixtures/compare/`, `fixtures/parse-swift/` and `fixtures/parse-kotlin/`.
- `fixtures/swift/**` and `fixtures/kotlin/**` belong to Tasks 3 and 4 (the probe generators).

**A recorded-log fixture** begins with header lines, each starting `#harness-fixture `, and then the log as recorded, with its paths rewritten to the fixture's roots:

```
#harness-fixture toolchain: <what it was recorded under, e.g. "Xcode 27.2 (27B52), Apple Swift 6.4.2">
#harness-fixture source: <where the log came from, and what was rewritten>
#harness-fixture exit: <the exit status the compile returned>
#harness-fixture roots: gen=<abs> pkg=<abs> probe=<abs>
<the log>
```

- The roots in the header hold no spaces.
- The suite strips every leading `#harness-fixture ` line before passing the log to the parser.
- The toolchain line is what Task 2's criterion "fixtures whose header names the toolchain they were recorded under" reads.
