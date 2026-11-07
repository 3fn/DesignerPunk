# Task 5.3 Completion: The forced-failure dispatch; the stability script and its first record

**Date**: 2026-11-07
**Task**: 5.3 (Spec 129, Unit 1, parent 5)
**Agent**: Thurgood (Sonnet)

## What changed

- `scripts/harness/stability.ts` computes the stability record from the runs, jobs, checks and check-run annotations endpoints: condition 2's four break rules, condition 3's cold runs (Android `cache: miss`; iOS the first three pull-request runs at the current pin), condition 5's queue time `started_at − max(created_at, harness-generate.completed_at)`. A dispatched run counts toward neither condition.
- `scripts/harness/__tests__/stability.test.ts` (26 tests) reads `fixtures/stability/`: one recorded API response (run 42331622121) and nine API-shaped files, one per rule.
- `native-harness.yml` gains the dispatch input `force_generate_failure` and one `harness-generate` step reading it. F is `2b8448e52`.
- `evidence/harness-stability.md` is the first output (`76838cdfc`).

## Targeted tests run

- `npx jest -c scripts/jest.config.js scripts/harness/__tests__/stability` → 26 passed.
- Forced-failure run 42332232400 at F, command `gh workflow run native-harness.yml --ref task/129-compile-harness -f force_generate_failure=true`: `harness-generate` failed; all four contexts failed on "Require harness-generate", none skipped, none carries `harness-verdict`.
- `git diff --name-only 2b8448e52 HEAD -- .github/workflows/native-harness.yml scripts/harness/ ':!scripts/harness/__tests__/' harness/ios/ harness/android/` → empty.

## Application-time adaptations

1. **The record's `Generated` time makes it differ on every run**; the content that matters is the table.
2. **The checks API is read for each context's conclusion**, the jobs API for timestamps; a job id equals its check-run id, so the two are joined by id.
3. **An iOS run's Xcode pin** is read from `harness/pins.yaml` at the run's head SHA when the clone holds that commit; otherwise the run is not excluded by pin.
