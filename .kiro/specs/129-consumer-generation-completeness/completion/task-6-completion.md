# Task 6 Completion: Register the harness falsification suites as named in-lane guards (U2)

**Date**: 2026-11-07
**Spec**: 129 - Consumer-Generation Completeness
**Task**: 6. Register the harness falsification suites as named in-lane guards (U2) · subtask 6.1
**Type**: Parent · **Validation**: Tier 3 - Comprehensive
**Agent**: Thurgood (Sonnet), PRIMARY · **Status**: Complete on the unit branch `task/129-comparator-guard-markers`; accepted at U2's merge, not before. One row below is ⚠️: criterion 2's last clause, which needs the U2 PR's run.
**Delegated-tier**: plan held
**CI-provenance**: local
**Instruments**: 9 listed — exists 8 · built-here 1 · missing 0 · unlisted 0 — .kiro/specs/129-consumer-generation-completeness/completion/task-6-instruments.md

---

## Success criteria

| Criterion (verbatim) | Status | Evidence |
|---|---|---|
| `.github/in-lane-guards.json` gains one entry each for `scripts/harness/__tests__/compare.test.ts`, `parse-swift.test.ts`, `parse-kotlin.test.ts`, `probe-swift.test.ts`, `probe-kotlin.test.ts`, `consumer.test.ts`, `stability.test.ts` and `native-rules.test.ts` (added by amendment 3), with `config` `scripts/jest.config.js`, `context` `lane-functional-root`, and `record` naming this task's completion doc. | ✅ | `.github/in-lane-guards.json` @ `086d50f61`: the eight entries are the last eight of `guards` (L255 on), each `config` `scripts/jest.config.js`, `context` `lane-functional-root`, `record` naming `.kiro/specs/129-consumer-generation-completeness/completion/task-6-completion.md`. Command: `jq '[.guards[]\|select(.config=="scripts/jest.config.js" and .context=="lane-functional-root" and (.file\|startswith("scripts/harness/__tests__/")) and (.record\|contains("task-6-completion.md")))]\|length' .github/in-lane-guards.json` → `8`. Decision record: `.kiro/specs/129-consumer-generation-completeness/completion/task-6-1-completion.md` |
| The additivity predicate of ballot `2026-10-20-in-lane-guard-registry-additive-entries` § 2 prints `true` against the PR's merge base, and the check prints `N registered in-lane guards; N selected` with N the entry count, green on the U2 PR. | ⚠️ | Status: pending PR run. Done locally: the predicate, old side the merge base `74d7566f5fd7cb700436ee0fbbf12cf3f050dc57` (`git merge-base refs/remotes/origin/main HEAD`), printed `true`; `npx tsx scripts/ci/check-in-lane-guards.ts` → `50 registered in-lane guards; 50 selected`, exit 0 (50 = `jq '.guards\|length'`). Not done: "green on the U2 PR", because the U2 PR opens at Task 7's completion and its `lane-functional-root` run is the evidence. Follow-up: `.kiro/specs/129-consumer-generation-completeness/tasks.md` Task 7, whose completion doc reads that run |
| The U2 PR's `.github/**` changes are exactly `.github/in-lane-guards.json`. | ✅ | `git diff --name-only refs/remotes/origin/main...HEAD -- .github` → `.github/in-lane-guards.json` (one path); `git diff --numstat refs/remotes/origin/main...HEAD -- .github` → `48 0 .github/in-lane-guards.json`. Read on the branch at `086d50f61`; Task 7's completion doc re-reads it at the PR |

Unmet or partially met criteria: Criterion 2's clause "green on the U2 PR" — pending the U2 PR's run; follow-up `.kiro/specs/129-consumer-generation-completeness/tasks.md` Task 7 (the PR opens there)

## The predicate and the check, as run

```
$ git merge-base refs/remotes/origin/main HEAD
74d7566f5fd7cb700436ee0fbbf12cf3f050dc57
$ jq -n --slurpfile a <(git show 74d7566f5fd7cb700436ee0fbbf12cf3f050dc57:.github/in-lane-guards.json) --slurpfile b .github/in-lane-guards.json '$a[0].version == $b[0].version and (($a[0]|keys) == ($b[0]|keys)) and ($a[0].guards - $b[0].guards) == [] and ($b[0].guards|length) > ($a[0].guards|length) and all($b[0].guards[]; keys == ["config","context","file","record"])'
true
$ npx tsx scripts/ci/check-in-lane-guards.ts
50 registered in-lane guards; 50 selected
```

## Per added entry: what its record rests on (ballot `2026-10-20-in-lane-guard-registry-additive-entries` § 2)

Every entry's `config` `scripts/jest.config.js` is run by `lane-functional-root`'s unconditional step "Run scripts/** test suite (npm run test:scripts)" (`.github/workflows/lane-timing.yml`; `package.json` `test:scripts` = `jest --config scripts/jest.config.js`), and `lane-functional-root` is in `EXPECTED_CONTEXTS` (`tools/agent-generator/verify-gate-registration.sh` L69). Each `record` is this doc. The assertion each rests on (the suite's `describe › it`):

| File | Assertion |
|---|---|
| `compare.test.ts` | `two-sided (Req 3.3) › fails on an observed key not on the list` |
| `parse-swift.test.ts` | `parse-swift fixtures › every key any fixture yields satisfies parseKey` |
| `parse-kotlin.test.ts` | `parseKotlin: the interface of compare.ts › never throws on log content` |
| `probe-swift.test.ts` | `probe-swift: the reads come from the index, the themes and the product source › reads each index name under its root: DesignTokens for primitives and semantics, top-level for components` |
| `probe-kotlin.test.ts` | `probe-kotlin: the fixture index and config (manifest themes dark and wcag) › counts the names the index gives for Android: lists expanded, null skipped, a theme name once` |
| `consumer.test.ts` | `runDriver — a failing step is named, and the exit status is non-zero › stops at the failing step: a later command never runs` |
| `stability.test.ts` | `reading the API shapes › maps a job name, with or without the dispatch suffix, to its context` |
| `native-rules.test.ts` | `the fixed binding names (design § 4, Q12) › are DesignerPunk's, whatever the consumer names itself` |

## Additional verification

Primary Artifacts: all shipped as declared

(`.github/in-lane-guards.json`, the one Primary Artifact, changed by the eight entries of 6.1 and nothing else.)

## Validation

- `npm test` (the parent tier, full functional suite) → 417 suites passed, 9881 tests passed, exit 0. Local; `npm run build` and `mcp-server` `npm ci && npm run build` ran first in the fresh worktree.
- `npm run test:scripts` → 32 suites passed, 1337 tests passed. Run because `npm test` does not run the `scripts/**` suites, and these are the suites the entries register (tasks.md § Conventions "Sub-suites").
- `npx jest --config scripts/jest.config.js scripts/__tests__/in-lane-guards.test.ts` → 19 passed (the registry check's own suite).
- Every run result above is local (see the `**CI-provenance**:` line).
- Not run: `test:consumer`, `mcp-server` and `application-mcp-server` suites; no artifact of this parent is read by them.

## Records this parent's diff fires

Matched against `git diff --name-only refs/remotes/origin/main...HEAD` (the registry, and files under `.kiro/specs/129-consumer-generation-completeness/completion/`), the root records' `path:` Triggers name one: `.kiro/issues/2026-10-20-in-lane-registry-arming-reads.md` (Trigger `path:.github/in-lane-guards.json`, owner Stacy). Its owed act is her ARMING read at U2's merge, which ballot § 2 already names; it is not Thurgood's act and needs no outcome line from this unit. No other record's Trigger glob matches this parent's paths. The unit's full list is made once, at U2's PR-open (Task 7).
