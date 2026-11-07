# Task 6.1 Completion: Add the eight entries; record the predicate output and the check's line

**Date**: 2026-11-07
**Task**: 6.1 (Spec 129, Unit 2, parent 6)
**Agent**: Thurgood (Sonnet, as planned)
**Branch**: `task/129-comparator-guard-markers`, cut from `main` @ `74d7566f5`

## 1. What changed

- `.github/in-lane-guards.json` gains eight entries, appended after the existing last one, for `scripts/harness/__tests__/{compare,parse-swift,parse-kotlin,probe-swift,probe-kotlin,consumer,stability,native-rules}.test.ts`. Each carries `config` `scripts/jest.config.js`, `context` `lane-functional-root`, and a `record` that names `.kiro/specs/129-consumer-generation-completeness/completion/task-6-completion.md` and the suite's subject. `version` is unchanged (1), no other key changed, no existing entry changed. The registry went from 42 to 50 entries; the diff is `git diff --numstat` `48 0`.
- Nothing else under `.github/` changed.

## 2. Targeted tests run

- The additivity predicate of ballot `2026-10-20-in-lane-guard-registry-additive-entries` § 2, old side the merge base `74d7566f5fd7cb700436ee0fbbf12cf3f050dc57` (`git merge-base refs/remotes/origin/main HEAD`), `jq-1.7.1-apple`: printed `true`.
- `npx tsx scripts/ci/check-in-lane-guards.ts` → `50 registered in-lane guards; 50 selected`, exit 0.
- `npx jest --config scripts/jest.config.js scripts/harness/__tests__` → 8 suites passed, 566 tests passed.

## 3. Application-time adaptations

none. The four fields of each entry follow the registry's existing shape; the `record` strings follow the precedent of the Task 23 audience-banner entry (a path, then a parenthesis naming the spec task and the guard's subject).
