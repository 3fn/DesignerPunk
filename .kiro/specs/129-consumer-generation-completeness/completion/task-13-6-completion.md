# Task 13.6 Completion: The `harness-generate` step and the workflow test

**Date**: 2026-11-08
**Task**: 13.6 (Spec 129, Unit 8, parent 13)
**Agent**: Thurgood (Sonnet, as planned)
**Branch**: `task/129-13-workflow` (cut from Ada's unit head `9ec69be2e`)
**Grant**: `.kiro/issues/2026-11-07-d2-check-step-grant.md`

## 1. What changed

- `.github/workflows/native-harness.yml`: one step, "D2 check (scripts/harness/d2-check.ts)", the last step of `harness-generate`, directly after "Upload the consumer root". It runs `npx tsx scripts/harness/d2-check.ts --consumer "${RUNNER_TEMP}/harness-consumer"` from the repository root, with no `working-directory:`, `if:` or `continue-on-error`. It writes a notice per PASS line, an error per FAIL line and for the setup line, `no d2-check line` when none printed, and one `exit=<code> lines=<n>/3` annotation on every run (error when the step fails). It fails on non-zero exit or any missing or FAIL verdict line. Also a comment above the step, and one added sentence in the header's "Jobs:" paragraph.
- `scripts/harness/__tests__/native-harness-workflow.test.ts`: 14 cases appended (step identity, position, no forbidden keys, exact command, annotation text, and the step's shell run for real against a stub `npx` for six outcomes).

## 2. Targeted tests

`npx jest --config scripts/jest.config.js scripts/harness/__tests__/native-harness-workflow.test.ts`: red at base (12 failed of 40, the new cases), green at head (40 of 40).

## 3. Grant limits

- `git diff --numstat` for the workflow file against the base: 37 added, 0 deleted. No `**Deleted lines**:` block owed.
- No other job, existing step, `env:`, cache key, runner, permission or trigger touched. The four compile contexts' "Require harness-generate" steps already fail them when `harness-generate` is not `success` (Req 2.11) and are unchanged: that is the wiring, and a case pins it. No new context; `EXPECTED_CONTEXTS` and `EXPECTED_COUNT` untouched.

## 4. Application-time adaptations

- The step's shell is not `-e` for the script call (`set +e` around it), so the annotations are written before the step fails, as the default-name step does.
- The grant's outcome line (rule 5) needs the run URL of the step at head H, which exists only after U8's PR runs. It is not written here; it is owed at the unit's close.
- The step has not run on GitHub yet; the stub-run cases show the shell, not the runner.
