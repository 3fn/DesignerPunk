# Task 19.3 Completion: `stability.ts` reads `harness-infra`

**Date**: 2026-11-07
**Task**: 19.3 (Spec 129, U3a, parent 19)
**Agent**: Thurgood (Sonnet)

## What changed

- `scripts/harness/stability.ts` parses the `harness-infra` annotation (`<host> <status> <step>`). An infra run (that annotation, no `harness-verdict`) is skipped for condition 2 (neither a break nor counted), is never a cold run for condition 3, and is listed per context with host, status, step and the context's infra rate. Two or more consecutive infra runs at one head print a `FINDING` line. Attempts that end infra then PASS are still a break. `ca4181f82`.
- `stability.test.ts` gains 7 cases over five API-shaped fixtures (`infra-between-passes`, `infra-cold-miss`, `infra-two-at-one-head`, `infra-then-pass-attempts`, `ordinary-resolve-fail`).
- `evidence/harness-stability.md` is re-run (`58e1a9770`): 28 runs recorded per context, 0 infra runs, and run 42379456009 (#711) reported as a condition 2 break (Android components: "attempts ended with different conclusions"); the other three contexts show the same run as "no harness-verdict annotation", because the jobs API returns their carried-over attempt-1 jobs under attempt 2 without annotations. The pull-request streak is 2 of 10 after it.

## Targeted tests run

- `npx jest -c scripts/jest.config.js scripts/harness/__tests__/stability` → `Tests: 33 passed, 33 total` (26 before).
- `npx tsx scripts/harness/stability.ts --repo 3fn/DesignerPunk --workflow native-harness.yml --xcode-pin 26.6 --out …/harness-stability.md` → exit 0.

## Application-time adaptations

1. **Infra rate** is infra runs over all runs recorded for the context (any event), stated in the record's rules paragraph.
2. **No infra run exists in the record yet**: the lane cannot produce one until a registry fault happens, and one is not faked in CI; the cases run over fixtures.
3. **The #711 break shows differently per context** (above): the carried-over jobs of a re-run carry no annotations. That is an artifact of the jobs API for jobs that were not re-run, and the record states it as read, not reclassified.
