# Issue: Consumer Guard C6 "packed name contract" times out because its `sync --dry-run` reaches the public npm registry

**Date**: 2026-10-13
**Status**: ACTIVE (filed 2026-10-19; no fix authorized: the record stays an obligation. Was DRAFT, "not filed; no fix authorized", from 2026-10-13 to 2026-10-19.)
**Owner**: Lina. The test is in `tests/consumer-integration.test.ts`, Spec 123 Task 9.3's C6 case, added in U1 #215 `d566b30ff`; `sync`'s migration lane is Lina's too.
**Class**: P3 improvement · defect *(set 2026-10-19, Lina, rule 12. The C6 case flakes on registry latency: 2 of ~200 Consumer Guard runs since 2026-10-01, each passing on re-run of the same code. A flake red-lights the required check but never greens a wrong build, and the case still asserts what it names whenever it runs; no reader is misled and the guard claims nothing it does not hold. Not P2 (guard) on that ground. The reading that would re-class: the flake rate rising, or someone merging past a red C6 and so training "re-run" as the response.)*
**Trigger**: `path:tests/consumer-integration.test.ts` — the next commit that edits the Consumer Guard test file, the file the hermetic-fixture fix lands in; at that PR the fix is made or the record is re-ruled by its owner. Until then the failure mode is "re-run the job". *(Set 2026-10-19, Lina, filing the record under rule 10 and its drain by obligation-drain ballot M2. The prior prose trigger, verbatim, is the next line. It named two surfaces; the token takes the test file because the fix is a test change, whereas `src/cli/sync/**` is the surface of the adjacent product question, which is routed separately below and would fire this record on work that does not close it. Authority: the owner's Trigger-line right, rule 9; Peter's go of 2026-10-19 ("file it or archive it — your call as owner"), relayed in the orchestrator's brief.)*
> Prior line (2026-10-13): the next Consumer Guard failure at `tests/consumer-integration.test.ts:1693` or `:1707`, or the next unit PR that touches `tests/consumer-integration.test.ts` or `src/cli/sync/**`, whichever comes first. Until then the failure mode is "re-run the job".

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

## History (append-only)
- **2026-10-13** — drafted (Lina) from the two re-runs on PR #313 and #316; not filed.
- **2026-10-17** — Thurgood's health check, W-4: "a DRAFT sitting at the root. File it or archive it."
- **2026-10-19** — Lina, owner: **filed, not archived.** Re-checked against `main` at `58ec2aea5`: (1) the case is unchanged, now at `tests/consumer-integration.test.ts:1806` and `:1820` (the `:1693`/`:1707` in the prior trigger were the 2026-10-13 line numbers; the only commit since to touch the file, `1ca8b6e4d` #336, edits the Jest-preset test and not this case); (2) `src/cli/sync/**` has no commit since 2026-10-13 (`git log --since=2026-10-13 -- src/cli/sync` is empty); (3) the cause still holds in the code: `hasLegacyCopies` (`src/cli/sync/Migration.ts:236-239`) is true for the Pricing-Card fixture, so `sync/index.ts:541-542` builds `npmRailFetcher`. Neither fixed nor worsened, so it is not superseded or unreproducible and the archive grounds are absent. **Not verified**: whether the Consumer Guard has failed on C6 since 2026-10-13 (`gh` is unauthenticated in this worktree; the 2026-10-17 health check records Consumer Guard at 1 failed `pull_request` run since 2026-09-19, which is the `init produces a working project` case the record already separates out, and says nothing of C6; a re-run that passes does not count as a failed run there, so the health check cannot see this flake). The C6 flake rate after 2026-10-13 is therefore unmeasured.
- **2026-10-23** — Thurgood (steward; an appended line, rule 9 — the trigger and the fix stay Lina's): **a second item now waits on this file's next edit.** Branch `fix/schema-token-name-drift-and-consumer-index` (R1-7) checked by hand, on a packed install, that a born repo's `get_token_consumers` counts DesignerPunk's components. The Consumer Guard has no case for it. The case belongs in `tests/consumer-integration.test.ts`, and no seat's standing write scope covers `tests/**`, so it needs an issue-row grant naming the path (README rule 8). The PR that adds it also fires this record's trigger, so that PR either makes the hermetic-fixture fix or carries Lina's re-rule.
