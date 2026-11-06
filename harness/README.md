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
- **A parser builds every key with `formatKey`**, which throws unless the key splits back into the same path and message. `parseKey` alone cannot see a path that holds ` | `: it reads `gen:a | b.kt | m` as the path `a`. A diagnostic whose path holds ` | ` therefore goes to `unrooted` *(ruled 2026-11-06, Data's observation 2)*.

**Which lines are diagnostics** is each parser owner's call, within the design:
- **Swift** (K-2): only lines matching `^<path>:<line>:<col>: error: `. Warnings and `note:` lines are not keys.
  - **"Printed twice"** (Req 3.2) means the default `-diagnostic-style swift`, which prints a location line and then a box line. Under `-diagnostic-style llvm`, which the lanes use, no diagnostic is printed twice. The Swift parser also counts identical (path, line, column, message) diagnostics within one log once *(Kenya's rule; ruled 2026-11-06, her observation 2)*.
- **Kotlin** (D § 1.2; Task 2's criteria): a diagnostic starts at a line beginning `e: file://<path>:<line>:<col> `. It runs to the next `e: ` or `w: ` line, the next `i: ` or `v: ` line, or the next Gradle line (`> `, `FAILURE`, `* `, `BUILD`, and the `[Incubating]` of D § 1.2). `w:`, `i:` and `v:` lines are not keyed. The `file://` URI is percent-decoded to a path.
  - `i:` and `v:` *(added 2026-11-06, Data's observation 4)*: they are not printed at Gradle's default level, but if one appeared it would otherwise be joined to the diagnostic above it.
  - Blank lines inside a diagnostic are dropped, and repeated lines are kept as printed *(Data's rule; ruled 2026-11-06, his observation 6)*.
  - A task header (`> Task :<module>:compileDebugKotlin`) ends at the next Gradle line or the next task line with a suffix (` FAILED`, ` UP-TO-DATE`, …). An `e:` line after that, before another compile-task header, is `unattributed` *(Data's rule; ruled 2026-11-06, his observation 3)*. **One exception** *(Data, found in Task 4's first real run; `4e716dae2`)*: a ` FAILED` line that is the FIRST line to name its compile task does not end the output. Gradle printed that line before the task's own output, so the `e:` lines after it, up to the next Gradle line or `> Task` line, belong to that task. A task that already printed a header ends at its ` FAILED` line, as above. **Residual**: the rule keys on "first mention", not on the shape of the next line, so an unsuffixed header followed by a later `FAILED` line before the output is not covered (no recorded log shows it); and an `e:` line after a first-mention `FAILED` line that belongs to another task would be read under the failing one. The lane runs `--no-parallel`, which keeps two tasks from printing together.

**`unrooted`**: an error diagnostic the parser recognises but cannot make a valid key from. That covers a path that is not absolute, is under no root, or holds ` | `; a message that is empty or begins with whitespace; and a line with text before the path (`note: /x.swift:1:1: error: …`) *(ruled 2026-11-06, Kenya's observation 3)*.

**Location-less error lines are neither keys nor `unrooted`**, on both platforms *(ruled 2026-11-06, reconciling Kenya's observation 6 and Data's observation 1)*. That covers Swift's `<unknown>:0: error: …` and bare `error: …`, and Kotlin's `e: …` with no `file://` location. Design § 3 rule 1 names this case: "a driver error with no file path" fails as `pre-compile` when it is the compile's only error.
  - **Residual**: a location-less error that comes with keyed errors is not seen. The keyed errors still decide the context.

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
  - *(added here)* The item label matches `^[A-Za-z0-9][A-Za-z0-9._-]*$`. The comparator "finds it in that record's text" (Req 3.2) when it occurs there as a whole token, by the rule in § "The comparator", "Tags".
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
  - The three tasks are `KOTLIN_COMPILE_TASKS` in `compare.ts`: `:tokens:compileDebugKotlin`, `:probe:compileDebugKotlin` and `:dp:compileDebugKotlin`. So Task 4's modules are named exactly `tokens`, `probe` and `dp` (design § 2 names them) *(Data's observation 5)*.
  - **The Gradle invocation** runs with `--console=plain` and `--no-parallel`, and the harness's `gradle.properties` sets `org.gradle.parallel=false`. It never runs with `-q` or `--quiet`. A quiet log has no `> Task` lines, so every diagnostic would be `unattributed`. Parallel tasks could interleave their `e:` lines, and that is not measured. *(Data's recommendation, made by reasoning and not run; adopted 2026-11-06 for Task 4, his observation 8.)*

**What a `CompileResult` holds**: `compile`, `outcome` (`succeeded`, `failed` or `not-run`), `diagnostics` (key → count, count ≥ 1), and `unrooted`.

**The roots** are passed in, never found by the parser. `roots.gen` is the platform's output folder (the `gen:` path rule), `roots.pkg` the installed package root, `roots.probe` the probe source folder. Each is absolute; the lane passes them in the same form as the file paths it gave the compiler. A diagnostic's path is under the longest root it starts with (followed by `/`). Where two roots are the same length, the first of `gen`, `pkg`, `probe` wins *(Kenya's rule; ruled 2026-11-06, her observation 4)*. A path that is not absolute, is under no root, or cannot make a valid key goes to `unrooted`, never dropped.

**Exit status**:
- Swift: `outcome` is `succeeded` when `exitCode` is 0, else `failed`. The Swift parser never returns `not-run`; a stage the lane did not run (Stage P while blocked) is not passed to it.
- Kotlin: each task's `outcome` comes from its `> Task :<module>:compileDebugKotlin` lines: `failed` when one ends ` FAILED`; else `succeeded` when one has no suffix, `UP-TO-DATE` or `FROM-CACHE`; else `not-run` (no such line, or `SKIPPED` or `NO-SOURCE`).
  - `:tokens` and `:dp` report the same generated paths, so a diagnostic belongs to the task it was printed under, never to a task chosen by its path. In the 2026-11-04 logs (`run-components.log`), the task's `> Task` line comes before its `e:` lines and its ` FAILED` line after them.
  - A diagnostic the parser cannot place under exactly one of the three tasks goes to `unattributed`.
  - `logComplete` is true when the log carries Gradle's closing `BUILD SUCCESSFUL` or `BUILD FAILED` line.

**"Parsed nothing"** is an ordinary result: a compile with `outcome` set and an empty `diagnostics`. The parser never throws on log content, and never decides a verdict. It throws only on malformed input (a root that is not absolute, an unknown compile id).

**Purity**: a parser reads no file, no environment variable, no network and no PR, and starts no process. Task 2's credential grep (`GITHUB_TOKEN`, `GH_TOKEN`, `gh pr`, `pull_request`) covers both parser files.

The comparator's rules for these results are § "The comparator" below.

---

## The comparator

`scripts/harness/compare.ts` (2.4) turns one context's results into one verdict. It reads the run file the lane wrote (below), the head and the merge base from git, and the issues root at the head. It reads no PR body, no credential and no network (Req 3.9).

### What it reads, and which keys each context keeps

Each context reads two compiles (Req 2.6; design § 3 rule 5):
- `harness-ios-tokens`: every key of `ios.T` and `ios.P`.
- `harness-ios-components`: the `pkg:` keys of `ios.C`, plus each `gen:` key of `ios.C` that `ios.T5` does not report.
- `harness-android-tokens`: every key of `android.tokens` and `android.probe`.
- `harness-android-components`: the `pkg:` keys of `android.dp`, plus each `gen:` key of `android.dp` that `android.tokens` does not report.

**Cross-tier is decided per key** *(ruled here, 2.4)*. A `gen:` key the combined compile reports and the baseline compile does not report at all is kept at its full count, and counted `cross-tier`. A `gen:` key the baseline also reports, at any count, belongs to the token context and is dropped from the component context. A count that differs between the two compiles is not a cross-tier entry.

The **head** is the commit under test (`--head`, default `HEAD`), read from git, never from the working tree. The **merge base** is `--base`.

### When the context fails

Each failure prints one line, `FAIL <class>: <detail>`. The classes, in the order the comparator checks them:

| Class | When |
|---|---|
| `input` | the run file or the arguments are malformed; two results for one compile; a tier with no file count; an Android run with no `logComplete` |
| `pre-compile` | a compile the context reads is `failed` with no parsed diagnostic (design § 3 rule 1); a compile it reads is `not-run`, except a blocked probe; the Gradle log has no closing `BUILD` line |
| `parser` | a compile is `succeeded` with parsed diagnostics (rule 1); any `unrooted` or `unattributed` line |
| `baseline missing` | the cross-tier baseline (`ios.T5`, or `android.tokens` in the component context) is `not-run` (rule 5) |
| `toolchain` | a reported toolchain field differs from `<platform>.toolchain` in the pins, or either side has a field the other lacks (Req 3.11) |
| `floor` | for a tier the context counts (`gen` for token contexts; `gen` and `pkg` for component contexts): 0 files reached the compiler, the floor is 0, or fewer files than the floor reached it (Req 3.4) |
| `format` | the list, the pin file or the protected set at the head is missing or not well formed |
| `new`, `count-above`, `count-below`, `stale` | the two-sided comparison against the list at the head (Req 3.3). While the probe is blocked, listed `probe:` keys are not counted stale |
| `tag` | a tag that cannot carry an entry (below) |
| `history unreadable` | the clone is shallow, so the Trigger history the tag rules read is incomplete |
| `base unreadable` | the merge base is not a commit in the clone, or a list, the pin file or the protected set cannot be read or is not well formed there (rule 2) |
| `addition` | an addition under none of exceptions (a), (b) and (c) (Req 3.5) |
| `retag` | a retag away from a protected record without its field or its appended line (Req 3.7) |
| `protected-set` | a name removed from the protected set while its record is still at the issues root (Req 3.7) |

**The probe exception**: `ios.P` and `android.probe` may be `not-run` without failing only when `ios.T` or `android.tokens` is `failed`. The comparator then prints `probe: blocked (<compile> failed); its count is not compared`. That state is not a compile (rule 1).

**Tags** (Req 3.6, and requirements.md § "Conventions", "Can fire"). A tag fails when:
- it names `README.md`;
- its record is under `archive/`, or is not at the issues root;
- the record has no `**Trigger**:` line with a backticked token, or its token is `manual`, or the token is not one README rule 1 names;
- the record's Trigger **has fired** by the rules `scripts/issues-owned.sh` applies, computed from local history, never by a fetch:
  - `path:<glob>[,<glob>…]` fires when a first-parent commit after the record's last `**Trigger**:` change touches a glob;
  - `merge:#<N>` fires when a first-parent subject ends `(#<N>)`;
  - `tag:<t>` fires when the tag exists;
  - `release:` never fires here.

  The history is the merge base's first-parent line, or the head's when there is no merge base. A record that is new at the head, or whose Trigger line the diff changes, has not fired: a re-rule stops a lapse (README rule 11);
- its item label does not occur in the record as a whole token. The character before the label is not one of `[A-Za-z0-9._-]`. The character after it is not one of `[A-Za-z0-9_-]` and is not a `.` followed by a letter or digit. So `A5` at the end of a sentence ("… A5.") is found, and `A5` inside `A5.1` or `A5-x` is not.

**Limits of the tag rules**:
- A `merge:#<N>` whose PR was closed without merging still reads as able to fire, because no local history shows it.
- A glob the PR's own diff touches fires at the merge, not in this run. The PR carries that record's act (tasks.md § "Conventions", "A unit carries the records its diff fires").

**Additions** (Req 3.5). An addition is a key whose summed count at the head is above its summed count on the list at the merge base, a new key included. It is admitted when:
- **(b)** the context's list is absent at a readable base. Every entry is printed `added (b): <key> <count> <tag>`. This is U1's own PR.
- **(a)** the parsed pin file differs between the base and the head, with mapping key order ignored. Printed `added (a): <key> +<n> <tags>`. A pin file **absent** at a readable base counts as changed *(an adaptation, 2.4: the reading of "a pinned value changes" when there was no pin)*. Exception (a) is not scoped by platform: Req 3.5 (a) is not, so an iOS pin change admits an Android addition.
- **(c)** the same diff lowers the summed count of some key, the key removed included, on any list of the **same platform**, or edits the repository file a `pkg:` key is located in. Printed `unmasked: <key> +<n> <tags> (<why>)`. A lowered count counts as a removal *(ruled here, 2.4: a correct fix that halves a count is still a fix)*.

The checks run in that order. Without a merge base (`--no-base`), additions, retags and protected-set removals are not checked, and the summary line says so.

**Retags** (Req 3.7), per key present on the list at both the base and the head:
- A tag whose count falls is a source, and a tag whose count rises is a destination. Each (source, destination) pair is one retag, printed `retagged: <key> <from> → <to>`.
- So a split also counts. A key at `A:2` on the base and `A:1`, `B:1` at the head is one retag, `A → B` *(ruled here, 2.4)*.
- A move between two labels of one record is printed and counted, but is not "away from" that record.
- **Away from a protected record** (one named in the set at the base or at the head), each destination entry carries `retagged=<date>,<owner>,<from-record>`. The diff also adds a line naming the key to `<from-record>`: the head copy, at the root or under `archive/`, holds more lines containing the key than the base copy.
- The comparator checks the field's form and its `<from-record>`. It does not check that `<owner>` is the record's owner.

### The summary line and the verdict

The last two lines of every run:

```
harness-summary: <context> · expected=<n> · observed=<n> · new=<n> · stale=<n> · count-changed=<n> · additions=(a) <n>, (b) <n>, (c) <n> · retags=<n> · files=gen <c>/<f>[, pkg <c>/<f>] (compiled/floor) · remaining=<n> entries[ · cross-tier=<n>][ · additions not checked: no merge base (nor retags or protected-set removals)][ · a pass means the failures match the list, not that it compiles]
harness-verdict: <context> PASS
harness-verdict: <context> FAIL (<class>, <class>, …)
```

- `expected` and `observed` are summed diagnostic counts. `remaining` is the number of entry lines on the list at the head.
- `cross-tier` appears in component contexts only.
- The last clause appears whenever the list holds entries (Req 3.8).

### The comparator's command line

```
npx tsx scripts/harness/compare.ts --context <context> --run <run.json> (--base <rev> | --no-base) [--repo <dir>] [--head <rev>] [--emit-observed <file>]
```

- **Exit status**: 0 for `PASS`, 1 for `FAIL`. An argument or run-file error also exits 1, with `FAIL input: …` and the verdict line.
- **`--repo`**: the checkout (default: the current folder). **`--head`**: the commit under test (default `HEAD`).
- **`--base`**: the merge base.
  - On a pull-request run, the checkout is the PR's merge commit, and its first parent is the base it merges onto, so pass `--base HEAD^1`.
  - On a dispatched run, pass `--no-base`.
- **`--emit-observed <file>`**: writes the keys this context observed, after its selection, as `<key>\t<count>` lines in list order. Task 5.2's baselines start from it; the tags are added by hand.

**What the checkout must hold** (for Task 5's workflow):
- **Full history and the tags**: `actions/checkout` with `fetch-depth: 0`, which fetches every tag too.
  - A shallow clone fails every context as `history unreadable`, because the tag rules read the Trigger history.
  - A clone without the base commit fails as `base unreadable`.
  - Without tags, a `tag:` Trigger that has fired reads as able to fire.
- **The merge commit's parents**: the default pull-request checkout is the merge commit, so `HEAD^1` exists once the history is full.
- **No network**: the comparator never fetches. What it reads is what the checkout holds.

**The run file** (`--run`), written by the lane, one per context. Paths inside it are relative to the run file's folder:

```json
{
  "roots": { "gen": "/abs/consumer/dist/tokens", "pkg": "/abs/consumer/node_modules/@3fn/core", "probe": "/abs/probe" },
  "swift": [
    { "compile": "ios.T", "log": "T.txt", "exitCode": 1 },
    { "compile": "ios.P", "blocked": true }
  ],
  "files": { "gen": { "compiled": 4, "floor": 4 } },
  "toolchain": { "xcode.version": "26.6", "xcode.build": "17F113" }
}
```

- **iOS**: `swift` has one entry per stage the context reads: `ios.T` and `ios.P`, or `ios.C` and `ios.T5`. Each entry has `log` and `exitCode`, or `"blocked": true` for a stage the lane did not run.
- **Android**: instead of `swift`, `"gradle": { "log": "gradle.txt", "exitCode": 1 }`, the one invocation's console output. Each Android context passes the same invocation's log.
- **`files`**: per tier, the files the lane gave the compiler and the floor it computed at run time from the packed tarball's file list and the generated files (Req 3.4). Token contexts give `gen`; component contexts give `gen` and `pkg`.
- **`toolchain`**: the fields the lane read, with the names `<platform>.toolchain` pins.
- The comparator runs the parsers on the logs. The parsers are loaded from `./parse-swift` and `./parse-kotlin`.

---

## Fixtures

*(added here, so the parser suites and the probe suites do not share a folder)*
- Task 2's fixtures live under `scripts/harness/__tests__/fixtures/compare/`, `fixtures/parse-swift/` and `fixtures/parse-kotlin/`.
- `fixtures/swift/**` and `fixtures/kotlin/**` belong to Tasks 3 and 4 (the probe generators).

**Recorded-log fixtures are `.txt` files**, never `.log`: the repository's `.gitignore` ignores `*.log`, so a `.log` fixture is never committed *(ruled 2026-11-06, Kenya's observation 1 and Data's observation 7)*. The lanes' own captured logs should not be `.log` files under a tracked path either.

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
