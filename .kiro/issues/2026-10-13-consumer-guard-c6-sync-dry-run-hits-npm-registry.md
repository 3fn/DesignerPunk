# Issue: Consumer Guard C6 "packed name contract" times out because its `sync --dry-run` reaches the public npm registry

**Date**: 2026-10-13
**Status**: DRAFT (not filed; no fix authorized)
**Owner**: Lina. The test is in `tests/consumer-integration.test.ts`, Spec 123 Task 9.3's C6 case, added in U1 #215 `d566b30ff`; `sync`'s migration lane is Lina's too.
**Trigger**: the next Consumer Guard failure at `tests/consumer-integration.test.ts:1693` or `:1707`, or the next unit PR that touches `tests/consumer-integration.test.ts` or `src/cli/sync/**`, whichever comes first. Until then the failure mode is "re-run the job".

## What happened (verified from the run logs)
- **Two failures tonight**, both `spawnSync /bin/sh ETIMEDOUT` at `tests/consumer-integration.test.ts:1693`: `execSync('npx designerpunk sync --dry-run', { cwd: tempDir, timeout: 30_000 })`.
  - Run 38342614879, attempt 1 (PR #313, `bf556cf38`). Attempt 2 on the same code passed.
  - Run 38343655816, attempt 1 (PR #316, `2e8b2c675`). Attempt 2 passed.
- **They are the only two re-runs in the last 200 Consumer Guard runs** (since 2026-10-01). The two other failures in that window (2026-10-02, `task/123-u2b-profile`) are a different test (`init produces a working project`).
- **The C6 case's time when it passes**, from seven passing logs: 8.9 s, 9.0 s, 9.3 s, 8.9 s, 13.4 s, 9.8 s and 6.3 s. That is two `sync --dry-run` calls, so about 3–7 s each against a 30 s budget.
- **The failing attempts were not slow runners**:
  - Every other test in the failing attempts ran at the same speed as in the passing attempt of the same run.
  - The per-test time sums differ by 21.1 s, all of it the C6 case (30 019 ms against 8 916 ms).
  - GitHub-hosted runners are one VM per job, so Peter's concurrent branches do not share CPU with this job.

## Why `sync --dry-run` takes seconds here (verified by code and a local run)
- **The fixture makes the consumer look like a pre-123 install.** `tests/consumer-integration.test.ts:750` writes `tempDir/src/components/core/Pricing-Card/` (Spec 118 Task 9.5.2's consumer-added component). That makes `hasLegacyCopies(tempDir)` true (`src/cli/sync/Migration.ts:236-239`, `LEGACY_COMPONENT_ROOT = 'src/components/core'` at L38).
- **So `sync` runs the migration lane** (`src/cli/sync/index.ts:385-395`). That lane calls `npmRailFetcher` (`src/cli/sync/Migration.ts:62-90`): `npm view @3fn/core versions --json --prefer-offline`, then `npm pack @3fn/core@<v>` for the versions in range. These are network calls to the public registry, each with a 180 s timeout, on a runner whose npm cache starts empty.
- **Local measurement** (a packed `31a8c9194` consumer, `init` + `generate`):

  | Consumer | Cache | `sync --dry-run` |
  |---|---|---|
  | as `init` leaves it (no `src/components/core/`) | — | 0.46 s, 0.41 s, 0.42 s; no migration section |
  | with `src/components/core/Pricing-Card/` added | cold `npm_config_cache` | 5.71 s, 4.88 s; prints "🧬 Migrating from a pre-123 install" |
  | same | warm | 3.63 s |

  - One cold run filled **30 MB** of npm cache.
  - So the C6 case's time is registry latency, and a slow registry response stalls one call past 30 s.
- **U3c and U3g did not change this path.**
  - `git diff c25470eac^…31a8c9194 -- src/ package*.json` is empty: neither unit touched `src/`.
  - Measured locally, the same consumer gives 0.41/0.39/0.42 s at pre-U3c `cca1dfdec` and 0.46/0.41/0.42 s at `31a8c9194`.
  - That the failures came after U3g merged is a coincidence of timing (inference).

## The fix proposed (owner Lina; not authorized)
**Make C6 hermetic.** Run its two `sync --dry-run` calls in a **dedicated fixture**: a fresh `init` + `generate` in a subdirectory with `gitBoundary`. This is the pattern C6 brand-survival already uses at `tests/consumer-integration.test.ts:1666-1680`. Then remove the CSS line in that fixture's own `dist/tokens/DesignTokens.web.css`.
- Without `src/components/core/`, `sync` makes no network call (0.4 s locally). The case then tests what it names, the packed name contract, and no longer depends on registry latency or on the Pricing-Card fixture's leftovers in `tempDir`.
- **Cost**: one more `init` + `generate` (about 1–2 s on CI).

**Not chosen**:
- **Widening the timeout** (to 120 s, say): this keeps a public-registry dependency inside a required gate, and a registry outage still turns it red.
- **`npm_config_offline=true` on the call**: it hides the coupling instead of removing it, and it makes the migration lane report "cannot tell" for a reason unrelated to the case.

**Surviving counter-argument**:
- The dedicated fixture removes the only gate run where `sync` executes the migration lane against the real registry. Nothing else in the guard would then exercise `npmRailFetcher` for real; it is unit-tested with a fake fetcher.
- If that end-to-end coverage matters, it belongs in its own case with its own, larger, stated network budget. It does not belong hidden inside the name-contract case.

## Adjacent (product, not this test; route separately)
- A real consumer who adds their own component under `src/components/core/` triggers the pre-123 migration lane, and so `npm view` + `npm pack` downloads, on **every** `sync`. Locally that is about 5 s and 30 MB per cold run.
- The migration correctly reports Pricing-Card as "yours". But "has a directory under `src/components/core/`" is a broad trigger for "pre-123 install".
- This is a candidate for Spec 129 or a `sync` fix: gate the fetch on a pre-123 manifest or on a name that matches a shipped component.
