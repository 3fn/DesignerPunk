# ParallelExecutor Integration Test Flaky Under Full-Suite CPU Load

**Date**: 2026-05-06
**Severity**: Low (flaky, not broken — passes in isolation)
**Agent**: Ada (surfaced during Spec 101 Task 1.6 execution)
**Blocks**: Nothing (Spec 101 not blocked; no functional regression)
**Status**: 📝 Tracked
**Suggested Owner**: Lina (test lives under `src/build/orchestration/`, component/build-pipeline domain) — or Thurgood if treated as a test-governance concern

## Problem

`src/build/orchestration/__tests__/ParallelExecutor.integration.test.ts` intermittently fails in the full test suite run (`npm test`) but passes when run in isolation.

**Observed during Spec 101 Task 1.6** (fresh-rebuild verification) on 2026-05-06:

```
FAIL src/build/orchestration/__tests__/ParallelExecutor.integration.test.ts
  ● ParallelExecutor Integration › Performance Characteristics
      › should execute builds in parallel (faster than sequential)
```

Isolation verification on the same checkout:

```bash
$ npx jest --testPathIgnorePatterns='performance/__tests__|__tests__/performance|PerformanceValidation' \
           --testPathPatterns=ParallelExecutor
PASS src/build/orchestration/__tests__/ParallelExecutor.integration.test.ts
PASS src/build/orchestration/__tests__/ParallelExecutor.test.ts
Test Suites: 2 passed, 2 total
Tests:       23 passed, 23 total
```

## Root Cause (hypothesis, not verified)

The failing assertion compares parallel vs. sequential execution time — i.e., asserts that parallel execution completes faster than sequential by some margin. Under full-suite CPU contention (multiple Jest workers running concurrently), the parallel path doesn't gain its usual throughput advantage, and the margin narrows below the assertion threshold.

This is a timing-dependent test dressed as a correctness test. Timing-dependent assertions in a parallel test runner environment are structurally flaky.

## Suggested Resolutions (not prescriptive)

Options for whoever picks this up:

1. **Relax the assertion threshold** — accept smaller margins, or assert only that parallel ≤ sequential (same or faster, not strictly faster).
2. **Run this test serially** — use `--runInBand` for orchestration integration tests, or a separate Jest project that runs single-worker.
3. **Convert to functional assertion** — verify that parallel execution completes all tasks correctly, not that it's faster. Move speed verification to a performance-profile script that runs outside the regular test suite.
4. **Mark as flaky** — use Jest's retry mechanism (`jest.retryTimes(n)`) to tolerate one failure before marking the suite red.

Option 3 is the most principled (timing isn't a correctness property). Options 1 and 4 are the cheapest.

## Context from Spec 101

During Task 1.6 (fresh `dist/` rebuild and verification), `npm test` surfaced this failure alongside a separate Spec 094 pre-migration snapshot drift (handled separately — see commit `be653848`). Re-running `ParallelExecutor` in isolation immediately passed, which is how flakiness was confirmed. Peter accepted the flakiness as out-of-scope for Spec 101 and authorized filing this tracking issue.

## References

- Spec 101 (Package Publish Readiness) — Task 1.6 completion doc
- Commit `be653848` — Task 1.6 Complete: Fresh rebuild and verify dist/ is clean
