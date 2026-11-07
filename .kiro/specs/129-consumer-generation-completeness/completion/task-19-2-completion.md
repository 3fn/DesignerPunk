# Task 19.2 Completion: The workflow's save condition, the `harness-infra` annotation and the workflow test

**Date**: 2026-11-07
**Task**: 19.2 (Spec 129, U3a, parent 19)
**Agent**: Thurgood (Sonnet)

## What changed

- `.github/workflows/native-harness.yml`, on the two Android jobs only: the "Save the Gradle cache" step saves when `hashFiles('harness-out/resolved.ok') != ''` (in place of `harness-out/gradle.txt`), and the "Verdict annotation" step has an `elif` branch that writes `::notice title=harness-infra::<host> <status> <step>` from `harness-out/infra.json` when `harness-out/compare.txt` does not exist. `28524c36d`, with a follow-up `1ab44ee75`.
- `scripts/harness/__tests__/native-harness-workflow.test.ts` (20 tests) parses the workflow and runs the annotation step's shell in temporary folders.
- `.github/in-lane-guards.json` gains an entry for that test.

## Targeted tests run

- Red once against the workflow at this unit's base (`c73f41ede`): `npx jest -c scripts/jest.config.js scripts/harness/__tests__/native-harness-workflow` with that workflow → `Tests: 6 failed, 12 passed, 18 total` (both Android jobs: the save condition, the infra annotation text, the infra notice written). Green against the edited workflow → `Tests: 20 passed, 20 total`.
- `jq -n --slurpfile a <(git show origin/main:.github/in-lane-guards.json) --slurpfile b .github/in-lane-guards.json '…'` (the ballot's additivity predicate) → `true`; `npx tsx scripts/ci/check-in-lane-guards.ts` → `51 registered in-lane guards; 51 selected`.

## Application-time adaptations

1. **The "reads only `compare.txt`" assertion reads the verdict branch** (the text before the `elif`), because the Android annotation step now holds both branches in one step. The infra branch is an `elif`, so the two notices cannot both be written; the test runs the shell with each file combination to show it.
2. **The self-test's `--infra-out` argument is not added to the workflow** (Data's note, 19.1): changing the self-test step is outside the grant limits (the grant admits the save `if:` and the annotation step only). The annotation step instead also reads `harness-out/selftest/infra.json`, where `--selftest` writes by default (`1ab44ee75`); the test covers it.
3. **`jest` selected the new file through `scripts/jest.config.js`**, so the in-lane guard entry uses that config and `lane-functional-root`.
