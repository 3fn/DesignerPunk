# Harness stability record

Computed by `scripts/harness/stability.ts`; never edited by hand (tasks.md § "Decision 6"). Re-run it before each promotion offer.

**Generated**: 2026-11-07T03:07:23Z · **Repository**: `3fn/DesignerPunk` · **Workflow**: `native-harness.yml`

**Source endpoints** (all under `repos/3fn/DesignerPunk`; a job id is its check run id):
- `actions/workflows/native-harness.yml/runs`: the runs (id, head SHA, event, attempt, conclusion);
- `actions/runs/<run id>/jobs?filter=all`: every attempt's jobs and their `created_at`, `started_at`, `completed_at`;
- `commits/<head sha>/check-runs`: the checks API, each context's check-run conclusion;
- `check-runs/<job id>/annotations`: the `harness-verdict` and `cache` annotations, which outlast the logs.

**Rules applied** (conditions of § "Decision 6"). A dispatched run counts toward neither condition 2 nor condition 3. A run counts toward condition 3 only if its context reached the comparator (it carries `harness-verdict`). Duration is `completed_at - started_at`; the ceiling is 10 minutes. For an iOS context, queue time is `started_at - max(created_at, harness-generate.completed_at)`.

## harness-android-tokens

- Runs recorded: 7 (0 pull-request, 7 dispatched).
- **Condition 2** (10 consecutive pull-request runs, no break): current streak 0 of 10 — not met.
- **Condition 3** (three cold-cache runs under 10 minutes; pull-request runs with `cache: miss` that reached the comparator): 0 counted — not met.

| run id | head SHA | event | attempt | conclusion | verdict | cache | created_at | started_at | completed_at | duration | queue | counts | break |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 42323442828 | `2563e46cf` | workflow_dispatch | 1 | failure | FAIL | miss | 2026-11-07T01:20:31Z | 2026-11-07T01:20:33Z | 2026-11-07T01:22:33Z | 120s | n/a | no (dispatched) | - |
| 42323861901 | `9754b985c` | workflow_dispatch | 1 | failure | FAIL | miss | 2026-11-07T01:25:21Z | 2026-11-07T01:25:23Z | 2026-11-07T01:27:10Z | 107s | n/a | no (dispatched) | - |
| 42324880305 | `cc2e71a51` | workflow_dispatch | 1 | failure | FAIL | miss | 2026-11-07T01:36:35Z | 2026-11-07T01:36:37Z | 2026-11-07T01:38:36Z | 119s | n/a | no (dispatched) | - |
| 42325607106 | `da3246b60` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T01:45:07Z | 2026-11-07T01:45:09Z | 2026-11-07T01:46:35Z | 86s | n/a | no (dispatched) | - |
| 42331622121 | `b00621317` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T02:57:24Z | 2026-11-07T02:57:26Z | 2026-11-07T02:59:02Z | 96s | n/a | no (dispatched) | - |
| 42332232400 | `2b8448e52` | workflow_dispatch | 1 | failure | - | - | 2026-11-07T03:04:10Z | 2026-11-07T03:04:17Z | 2026-11-07T03:04:21Z | 4s | n/a | no (dispatched) | - |
| 42332252550 | `2b8448e52` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T03:05:27Z | 2026-11-07T03:05:28Z | 2026-11-07T03:06:53Z | 85s | n/a | no (dispatched) | - |

## harness-android-components

- Runs recorded: 7 (0 pull-request, 7 dispatched).
- **Condition 2** (10 consecutive pull-request runs, no break): current streak 0 of 10 — not met.
- **Condition 3** (three cold-cache runs under 10 minutes; pull-request runs with `cache: miss` that reached the comparator): 0 counted — not met.

| run id | head SHA | event | attempt | conclusion | verdict | cache | created_at | started_at | completed_at | duration | queue | counts | break |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 42323442828 | `2563e46cf` | workflow_dispatch | 1 | failure | FAIL | miss | 2026-11-07T01:20:31Z | 2026-11-07T01:20:33Z | 2026-11-07T01:22:49Z | 136s | n/a | no (dispatched) | - |
| 42323861901 | `9754b985c` | workflow_dispatch | 1 | failure | FAIL | miss | 2026-11-07T01:25:21Z | 2026-11-07T01:25:23Z | 2026-11-07T01:27:39Z | 136s | n/a | no (dispatched) | - |
| 42324880305 | `cc2e71a51` | workflow_dispatch | 1 | failure | FAIL | miss | 2026-11-07T01:36:35Z | 2026-11-07T01:36:37Z | 2026-11-07T01:38:25Z | 108s | n/a | no (dispatched) | - |
| 42325607106 | `da3246b60` | workflow_dispatch | 1 | failure | FAIL | hit | 2026-11-07T01:45:07Z | 2026-11-07T01:45:09Z | 2026-11-07T01:46:15Z | 66s | n/a | no (dispatched) | - |
| 42331622121 | `b00621317` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T02:57:24Z | 2026-11-07T02:57:27Z | 2026-11-07T02:58:57Z | 90s | n/a | no (dispatched) | - |
| 42332232400 | `2b8448e52` | workflow_dispatch | 1 | failure | - | - | 2026-11-07T03:04:10Z | 2026-11-07T03:04:12Z | 2026-11-07T03:04:17Z | 5s | n/a | no (dispatched) | - |
| 42332252550 | `2b8448e52` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T03:05:27Z | 2026-11-07T03:05:28Z | 2026-11-07T03:06:36Z | 68s | n/a | no (dispatched) | - |

## harness-ios-tokens

- Runs recorded: 7 (0 pull-request, 7 dispatched).
- **Condition 2** (10 consecutive pull-request runs, no break): current streak 0 of 10 — not met.
- **Condition 3** (the first three pull-request runs at the current Xcode pin that reached the comparator, each under 10 minutes): 0 counted — not met.
- **Condition 5** (queue time + duration of those runs against 10 minutes): not yet measurable (fewer than three counted runs).

| run id | head SHA | event | attempt | conclusion | verdict | cache | created_at | started_at | completed_at | duration | queue | counts | break |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 42323442828 | `2563e46cf` | workflow_dispatch | 1 | failure | FAIL | - | 2026-11-07T01:20:31Z | 2026-11-07T01:20:34Z | 2026-11-07T01:21:41Z | 67s | 3s | no (dispatched) | - |
| 42323861901 | `9754b985c` | workflow_dispatch | 1 | failure | FAIL | - | 2026-11-07T01:25:21Z | 2026-11-07T01:25:24Z | 2026-11-07T01:26:33Z | 69s | 3s | no (dispatched) | - |
| 42324880305 | `cc2e71a51` | workflow_dispatch | 1 | failure | FAIL | - | 2026-11-07T01:36:35Z | 2026-11-07T01:36:37Z | 2026-11-07T01:37:49Z | 72s | 2s | no (dispatched) | - |
| 42325607106 | `da3246b60` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T01:45:07Z | 2026-11-07T01:45:10Z | 2026-11-07T01:46:32Z | 82s | 3s | no (dispatched) | - |
| 42331622121 | `b00621317` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T02:57:24Z | 2026-11-07T02:57:27Z | 2026-11-07T02:58:28Z | 61s | 3s | no (dispatched) | - |
| 42332232400 | `2b8448e52` | workflow_dispatch | 1 | failure | - | - | 2026-11-07T03:04:10Z | 2026-11-07T03:04:13Z | 2026-11-07T03:04:21Z | 8s | 3s | no (dispatched) | - |
| 42332252550 | `2b8448e52` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T03:05:27Z | 2026-11-07T03:05:29Z | 2026-11-07T03:06:21Z | 52s | 2s | no (dispatched) | - |

## harness-ios-components

- Runs recorded: 7 (0 pull-request, 7 dispatched).
- **Condition 2** (10 consecutive pull-request runs, no break): current streak 0 of 10 — not met.
- **Condition 3** (the first three pull-request runs at the current Xcode pin that reached the comparator, each under 10 minutes): 0 counted — not met.
- **Condition 5** (queue time + duration of those runs against 10 minutes): not yet measurable (fewer than three counted runs).

| run id | head SHA | event | attempt | conclusion | verdict | cache | created_at | started_at | completed_at | duration | queue | counts | break |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 42323442828 | `2563e46cf` | workflow_dispatch | 1 | failure | FAIL | - | 2026-11-07T01:20:31Z | 2026-11-07T01:20:34Z | 2026-11-07T01:22:37Z | 123s | 3s | no (dispatched) | - |
| 42323861901 | `9754b985c` | workflow_dispatch | 1 | failure | FAIL | - | 2026-11-07T01:25:21Z | 2026-11-07T01:25:23Z | 2026-11-07T01:26:39Z | 76s | 2s | no (dispatched) | - |
| 42324880305 | `cc2e71a51` | workflow_dispatch | 1 | failure | FAIL | - | 2026-11-07T01:36:35Z | 2026-11-07T01:36:37Z | 2026-11-07T01:37:47Z | 70s | 2s | no (dispatched) | - |
| 42325607106 | `da3246b60` | workflow_dispatch | 1 | failure | FAIL | - | 2026-11-07T01:45:07Z | 2026-11-07T01:45:09Z | 2026-11-07T01:46:40Z | 91s | 2s | no (dispatched) | - |
| 42331622121 | `b00621317` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T02:57:24Z | 2026-11-07T02:57:27Z | 2026-11-07T02:58:45Z | 78s | 3s | no (dispatched) | - |
| 42332232400 | `2b8448e52` | workflow_dispatch | 1 | failure | - | - | 2026-11-07T03:04:10Z | 2026-11-07T03:04:12Z | 2026-11-07T03:04:17Z | 5s | 2s | no (dispatched) | - |
| 42332252550 | `2b8448e52` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T03:05:27Z | 2026-11-07T03:05:28Z | 2026-11-07T03:06:26Z | 58s | 1s | no (dispatched) | - |

