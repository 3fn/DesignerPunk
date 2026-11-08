# Task 13.3 Completion: The D2 check and its completeness half, with `d2-check.test.ts`

**Date**: 2026-11-08
**Task**: 13.3 (Spec 129, Unit 8, parent 13)
**Agent**: Ada (Sonnet, as planned)
**Branch**: `task/129-13-component-tier`, with `origin/main` @ `c07951b38` (tasks amendment 12, #754) merged in before this subtask

## 1. What changed

- `scripts/harness/d2-check.ts`, to the grant record as amended by amendment 12: `--consumer <root>` only; stdout carries the three verdict lines `d2-check <completeness|ios|android>: <PASS|FAIL> count=<n> <rest>` and nothing else; a setup or usage error (or an uncaught one) prints the one `d2-check: FAIL setup (...)` line and exits 2; `count=0` is a FAIL.
  - **Names come from the index**: `token-index/components.yaml` `platforms.<p>` (backticks removed on both sides). The generated files are found through the consumer's own `harness-consumer.json`; their members are read as text (Swift `static let|var` in an `enum|struct|extension`, Kotlin `val` in an `object`).
  - **Completeness**: a text read (nothing is run) of the definition files found by the one walk root `node_modules/@3fn/core/src/components/core/` and the one match `^([^.]+\.)?tokens\.ts$`, compared with the index entries that carry the package tag. The `component.key` rule is one line (`indexNameOf`). A group the consumer declares is theirs alone and not expected.
  - Imports only `fs`, `path`, `js-yaml`.
- `scripts/harness/__tests__/d2-check.test.ts` (27 cases) and the partial fixture `fixtures/d2-check/good/` (index, manifest, the two generated files from a real packed consumer; `node_modules/` is written by the test from `HARVESTABLE_COMPONENT_TOKEN_FILES`).

## 2. Targeted tests run

- `npx jest --config scripts/jest.config.js scripts/harness`: 11 suites, 715 passed. `tsc -p tsconfig.scripts.json` clean.
- Run by hand against a consumer built from this branch (`consumer.ts --out`): `d2-check completeness: PASS count=23`, `ios: PASS count=33`, `android: PASS count=33`, exit 0.
- Cases, all by the record's command line from the repository root: exit 0 with three PASS; completeness FAIL with the token dropped from index and output (the two still match); iOS and Android each missing and extra, other lines still printed; exit 2 for a missing root, an unknown argument, no `--consumer`, an uncaught error (malformed manifest); Swift backtick matched, missing, extra; token missing on iOS, extra on Android; dropped from index and definition files only (output still carries it: FAIL); empty consumer both ways (index absent exit 2; `tokens: {}` count=0 FAIL exit 1); the rename pair; the walk equals the six shipped files; the grep passes the script and fails on seven doctored sources.

## 3. Application-time adaptations

- **Floor 3 (base against head)**: the merge base has no `d2-check.ts`, so there is no base run; the comparison is owed from U8's successors.
- **Owed at the parent close, not here**: the pasted `d2-check` annotations at head H and the probe-coverage confirmation need the step (13.6, Thurgood) and the four contexts to have run on the PR.
- The fixture's output folder is `out/tokens`, not `dist/tokens`, because `dist/` is git-ignored; the manifest names it, as the script reads it.
- The completeness text read assumes definition files declare `component: '<X>'` then a `tokens: { ... }` object with quoted keys; a file computing keys would read as missing tokens and FAIL loudly, not pass.
- Files outside the Primary Artifacts list: none.
