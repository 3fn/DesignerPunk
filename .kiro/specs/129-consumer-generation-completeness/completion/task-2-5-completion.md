# Task 2.5 Completion: Falsification suite

**Date**: 2026-11-06
**Task**: 2.5 (Spec 129, Unit 1, parent 2)
**Agent**: Thurgood (Opus)
**Branch**: `task/129-compile-harness-t2`

## 1. What changed

**`scripts/harness/__tests__/compare.test.ts`** (new) is the comparator's falsification suite: 96 tests.
- **How each case is built**: every case starts from one passing world, a throwaway git repository with a merge-base commit and a head commit, and changes one thing.
- **What a red case asserts**: the comparator's **whole** failure list, as exact strings. So each case is red for the reason it names and no other.
- **What a green case asserts**: `PASS`, and the line it prints (`added (a):`, `added (b):`, `unmasked:`, `retagged:`, `probe: blocked`, the summary line).
- **The parsers**: the suite builds `CompileResult`s directly, so it does not depend on them. The command-line cases inject stub parsers.
- **Coverage**:
  - every case Task 2's criteria C3–C10 name;
  - design § 3's extra cases: an empty list with a pre-compile failure, `parser`, an unreadable base, no merge base, a protected-set removal, cross-tier with a missing baseline;
  - the rules 2.4 added: exception (b) on U1's own PR; both arms of (c) and its platform bound; the split retag; label-to-label moves; the FIRED rules and the re-rule exemption; the shallow clone; the Kotlin run-level fields; the list format; the key grammar; the command line.

**Fixtures**: none on disk. Each record, list and pin file is written by the test into its throwaway repository, so `scripts/harness/__tests__/fixtures/compare/` is not created. The README's fixture layout still reserves it.

## 2. Targeted tests run

- `npx jest --config scripts/jest.config.js scripts/harness`: 1 suite, **96 passed**.
- **Red once (the bite)**:
  - **What was run**: the same suite against a scratch copy of `compare.ts` in which `evaluate` clears its failure list before deciding, a comparator that never fails. The copy and its Jest config were under the session scratchpad, never committed.
  - **Result**: **45 failed, 51 passed**. The 45 are every case that asserts a failure.
  - **The 51 that stayed green**: the green cases, the format and key-grammar unit tests, and the usage-error case; none of these goes through `evaluate`.
- **Then green**: the real comparator, 96 passed (above).
- `npm run test:scripts`: 25 suites, 856 tests, all pass.

**The exact red strings** of the 45, from the mutant run's expected values. Two of them carry a commit hash that each throwaway repository mints anew (`FIRED@<sha>`); the case computes it from the repository.

- **two-sided (Req 3.3) > fails on an observed key not on the list**
  - `FAIL new: gen:DesignTokens.ios.swift | cannot find 'Y' in scope (observed 1; not on the list)`
- **two-sided (Req 3.3) > fails on an observed count above its pin**
  - `FAIL count-above: gen:DesignTokens.ios.swift | cannot find 'X' in scope (observed 3, listed 2)`
- **two-sided (Req 3.3) > fails on an observed count below its pin**
  - `FAIL count-below: gen:DesignTokens.ios.swift | cannot find 'X' in scope (observed 1, listed 2)`
- **two-sided (Req 3.3) > fails on a listed key that does not occur**
  - `FAIL stale: gen:DesignTokens.ios.swift | cannot find 'X' in scope (listed 2; not observed)`
- **the floor (Req 3.4) > fails when fewer files reach the compiler than the floor**
  - `FAIL floor: gen: 2 files reached the compiler, below the floor of 3`
- **the floor (Req 3.4) > fails when zero files reach the compiler, whatever the floor**
  - `FAIL floor: gen: 0 files reached the compiler`
- **the floor (Req 3.4) > fails when the floor computed at run time is zero**
  - `FAIL floor: gen: the floor computed at run time is 0`
- **the floor (Req 3.4) > fails a component context missing a tier count**
  - `FAIL input: no file count for the pkg tier`
- **additions against a readable merge base (Req 3.5) > fails on an addition under none of exceptions (a), (b) or (c)**
  - `FAIL addition: gen:DesignTokens.ios.swift | cannot find 'Y' in scope (+1 over the merge base; none of exceptions (a), (b) or (c) holds)`
- **additions against a readable merge base (Req 3.5) > fails on a raised count under no exception**
  - `FAIL addition: gen:DesignTokens.ios.swift | cannot find 'X' in scope (+1 over the merge base; none of exceptions (a), (b) or (c) holds)`
- **exception (a): a changed pinned value (Req 3.5 (a)) > a comment-only pin edit admits no addition**
  - `FAIL addition: gen:DesignTokens.ios.swift | cannot find 'Y' in scope (+1 over the merge base; none of exceptions (a), (b) or (c) holds)`
- **exception (a): a changed pinned value (Req 3.5 (a)) > a whitespace-only pin edit admits no addition**
  - `FAIL addition: gen:DesignTokens.ios.swift | cannot find 'Y' in scope (+1 over the merge base; none of exceptions (a), (b) or (c) holds)`
- **exception (c): uncovered by a fix > does not cross platforms: a removal from an Android list admits no iOS addition**
  - `FAIL addition: gen:DesignTokens.ios.swift | cannot find 'Y' in scope (+1 over the merge base; none of exceptions (a), (b) or (c) holds)`
- **tags (Req 3.6) > fails on a tag naming a record under archive/**
  - `FAIL tag: 2026-01-04-closed-record.md names a record under archive/ (first on gen:DesignTokens.ios.swift | cannot find 'X' in scope)`
- **tags (Req 3.6) > fails on a tag naming a missing record**
  - `FAIL tag: 2026-01-09-no-such-record.md names no record at the issues root (first on gen:DesignTokens.ios.swift | cannot find 'X' in scope)`
- **tags (Req 3.6) > fails on a tag naming a record whose Trigger token is manual**
  - `FAIL tag: 2026-01-03-manual-record.md names a record whose Trigger token is manual (first on gen:DesignTokens.ios.swift | cannot find 'X' in scope)`
- **tags (Req 3.6) > fails on a tag naming the issues README**
  - `FAIL tag: README.md names the issues README, which is not a record (first on gen:DesignTokens.ios.swift | cannot find 'X' in scope)`
- **tags (Req 3.6) > fails on a record whose Trigger token README rule 1 does not name**
  - `FAIL tag: 2026-01-07-untokened-record.md names a record whose Trigger token `when-it-feels-right` is not one README rule 1 names (first on gen:DesignTokens.ios.swift | cannot find 'X' in scope)`
- **tags (Req 3.6) > fails on a record with no Trigger line**
  - `FAIL tag: 2026-01-07-no-trigger.md names a record with no **Trigger**: token (first on gen:DesignTokens.ios.swift | cannot find 'X' in scope)`
- **tags (Req 3.6) > fails on a record whose path: Trigger fired and that is still open (issues-owned.sh FIRED@)**
  - `FAIL tag: 2026-01-05-fired-record.md names a record whose Trigger has fired (FIRED@cf4de9b) and that is still open (first on gen:DesignTokens.ios.swift | cannot find 'X' in scope)`
- **tags (Req 3.6) > fails on a record whose merge:#<N> Trigger fired**
  - `FAIL tag: 2026-01-05-merge-record.md names a record whose Trigger has fired (FIRED@7c98895) and that is still open (first on gen:DesignTokens.ios.swift | cannot find 'X' in scope)`
- **tags (Req 3.6) > fails on an item label the record does not contain, and passes one it does**
  - `FAIL tag: 2026-01-01-open-record.md#item-c names an item label "item-c" the record does not contain (first on gen:DesignTokens.ios.swift | cannot find 'X' in scope)`
- **tags (Req 3.6) > finds a label that ends a sentence, and not one inside a longer label**
  - `FAIL tag: 2026-01-08-labelled-record.md#A5 names an item label "A5" the record does not contain (first on gen:DesignTokens.ios.swift | cannot find 'X' in scope)`
- **retags and the protected set (Req 3.7) > fails a retag away from a protected record with neither the retagged= field nor an appended line**
  - `FAIL retag: gen:DesignTokens.ios.swift | cannot find 'X' in scope moved from protected 2026-01-02-protected-record.md to 2026-01-01-open-record.md without retagged=<date>,<owner>,2026-01-02-protected-record.md on the entry`
  - `FAIL retag: gen:DesignTokens.ios.swift | cannot find 'X' in scope moved from protected 2026-01-02-protected-record.md and this diff appends no line naming the key to 2026-01-02-protected-record.md`
- **retags and the protected set (Req 3.7) > fails with the field but no appended line**
  - `FAIL retag: gen:DesignTokens.ios.swift | cannot find 'X' in scope moved from protected 2026-01-02-protected-record.md and this diff appends no line naming the key to 2026-01-02-protected-record.md`
- **retags and the protected set (Req 3.7) > fails with the appended line but no field**
  - `FAIL retag: gen:DesignTokens.ios.swift | cannot find 'X' in scope moved from protected 2026-01-02-protected-record.md to 2026-01-01-open-record.md without retagged=<date>,<owner>,2026-01-02-protected-record.md on the entry`
- **retags and the protected set (Req 3.7) > fails when a record is removed from the protected set while still at the issues root**
  - `FAIL protected-set: 2026-01-02-protected-record.md removed from harness/protected-set.txt while still at the issues root`
- **the toolchain match (Req 3.11) > fails on a toolchain version that differs from the pin**
  - `FAIL toolchain: ios.toolchain.xcode.version observed "26.5", pinned "26.6"`
- **the toolchain match (Req 3.11) > fails on a pinned field the lane did not report, and on a reported field not pinned**
  - `FAIL toolchain: ios.toolchain.swift.version is pinned "6.2" and the lane reported no value`
  - `FAIL toolchain: the lane reported sdk.build "23A1", which harness/pins.yaml does not pin`
- **the toolchain match (Req 3.11) > fails on an unquoted toolchain value**
  - `FAIL format: harness/pins.yaml: "ios.toolchain.swift.version" is not a quoted string`
- **exit status against the parsed set (design § 3 rule 1) > fails as pre-compile when a compile exits non-zero with no parsed error, on an empty list**
  - `FAIL pre-compile: ios.T exited non-zero with no parsed error`
- **exit status against the parsed set (design § 3 rule 1) > fails as parser when a compile exits zero with parsed errors**
  - `FAIL parser: ios.T exited zero with 2 parsed error(s)`
- **exit status against the parsed set (design § 3 rule 1) > fails as parser on a diagnostic under no root**
  - `FAIL parser: ios.T: a diagnostic under no root: /elsewhere/X.swift:1:1: error: boom`
- **exit status against the parsed set (design § 3 rule 1) > fails as pre-compile when the probe did not run although the token compile did not fail**
  - `FAIL pre-compile: ios.P has no outcome in this run, and ios.T did not fail`
- **exit status against the parsed set (design § 3 rule 1) > fails as pre-compile when the token compile has no outcome**
  - `FAIL pre-compile: ios.T has no outcome in this run`
- **the merge base (design § 3 rules 2 and 3) > fails as base unreadable when the merge base is not in the clone**
  - `FAIL base unreadable: the merge base 0123456789abcdef0123456789abcdef01234567 is not a commit in this clone`
- **the merge base (design § 3 rules 2 and 3) > fails as base unreadable when the list at the base is not well formed**
  - `FAIL base unreadable: harness/expected/harness-ios-tokens.tsv at the merge base is not well formed: line 1: the count "0" is not an integer of 1 or more`
- **the merge base (design § 3 rules 2 and 3) > fails as history unreadable in a shallow clone**
  - `FAIL history unreadable: the clone is shallow, so the Trigger history the tag rules read is incomplete; check out with full history (fetch-depth: 0)`
- **a run with no merge base (design § 3 rule 3) > still fails a two-sided mismatch**
  - `FAIL count-above: gen:DesignTokens.ios.swift | cannot find 'X' in scope (observed 3, listed 2)`
- **cross-tier keys (Req 2.6) > fails when the baseline result is missing**
  - `FAIL baseline missing: ios.T5 has no result in this run, so cross-tier keys cannot be decided`
- **cross-tier keys (Req 2.6) > fails the Android component context when :tokens has no task outcome**
  - `FAIL baseline missing: android.tokens has no result in this run, so cross-tier keys cannot be decided`
- **the Kotlin run-level fields > fails as parser on an unattributed diagnostic**
  - `FAIL parser: a diagnostic not attributed to exactly one compile task: e: file:///x/DesignTokens.android.kt:1:1 boom`
- **the Kotlin run-level fields > fails as pre-compile on a log with no closing BUILD line**
  - `FAIL pre-compile: the Gradle log has no closing BUILD SUCCESSFUL or BUILD FAILED line`
- **the list format (harness/README.md) > fails the context on a malformed list at the head**
  - `FAIL format: harness/expected/harness-ios-tokens.tsv: no newline after the last line`
- **the command line > exits 1 on FAIL**
  - the exit status `1` (the mutant returned 0)

## 3. Application-time adaptations

1. **The bite is a never-fails mutant, not one red run per case against a missing rule.** One mutant run shows that each case's assertion fails when the comparator does not fail, which is what "red once" asks. It does not show that each case tests the rule it names rather than another. The exact-failure-list assertions do that, because any other failure would change the list.
2. **No on-disk fixtures for the comparator.** The worlds are built in code, so each case's one change is visible beside its assertion.
3. **The label-boundary case found a defect in 2.1's rule** (a label ending a sentence was not found). The rule was fixed in 2.4 and the case kept (2.4 doc, adaptation 9).
4. **The suite is not yet registered** in `.github/in-lane-guards.json`. That is Task 6 (U2), after U1 merges (tasks.md § "Unit preconditions").
