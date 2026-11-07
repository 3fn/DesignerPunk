# Task 19.3 Completion: `stability.ts` reads `harness-infra`

**Date**: 2026-11-07
**Task**: 19.3 (Spec 129, U3a, parent 19)
**Agent**: Thurgood (Sonnet)

## What changed

- `scripts/harness/stability.ts` parses the `harness-infra` annotation (`<host> <status> <step>`). An infra run (that annotation, no `harness-verdict`) is skipped for condition 2 (neither a break nor counted), is never a cold run for condition 3, and is listed per context with host, status, step and the context's infra rate. Two or more consecutive infra runs at one head print a `FINDING` line. Attempts that end infra then PASS are still a break. `ca4181f82`.
- `stability.test.ts` gains 7 cases over five API-shaped fixtures (`infra-between-passes`, `infra-cold-miss`, `infra-two-at-one-head`, `infra-then-pass-attempts`, `ordinary-resolve-fail`).
- `stability.ts` also reads each job from the attempt whose job ran: a partial re-run lists the jobs it did not re-run again under the new attempt as copies (new ids, no annotations, the original timestamps), and `carriedOver` drops them (`17bb37828`). Found by the orchestrator in the first re-run of the record, which mis-read three PASS jobs of run 42379456009 as "no harness-verdict annotation".
- `evidence/harness-stability.md` is re-run at H: 31 runs per context, 0 infra runs, and run 42379456009 (#711) reported as a condition 2 break by its differing attempts on `harness-android-components` (the other three contexts show attempt 1's PASS, no break). Before the break the pull-request streak on Android components was 9, after it 4; the "0 before it" in `tasks.md` is superseded by the computed record.

## Targeted tests run

- `npx jest -c scripts/jest.config.js scripts/harness/__tests__/stability` → `Tests: 38 passed, 38 total` (26 before).
- `npx tsx scripts/harness/stability.ts --repo 3fn/DesignerPunk --workflow native-harness.yml --xcode-pin 26.6 --out …/harness-stability.md` → exit 0.

## Application-time adaptations

1. **Infra rate** is infra runs over all runs recorded for the context (any event), stated in the record's rules paragraph.
2. **No infra run exists in the record yet**: the lane cannot produce one until a registry fault happens, and one is not faked in CI; the cases run over fixtures.
3. **Carried-over jobs** (above) were mis-read in the first version of the record; the fix keeps the attempts-differ rule as it was, and a recorded fixture of run 42379456009 with three cases (`stability.test.ts`) shows it.
