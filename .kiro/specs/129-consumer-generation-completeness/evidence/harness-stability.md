# Harness stability record

Computed by `scripts/harness/stability.ts`; never edited by hand (tasks.md § "Decision 6"). Re-run it before each promotion offer.

**Generated**: 2026-11-07T15:04:37Z · **Repository**: `3fn/DesignerPunk` · **Workflow**: `native-harness.yml`

**Source endpoints** (all under `repos/3fn/DesignerPunk`; a job id is its check run id):
- `actions/workflows/native-harness.yml/runs`: the runs (id, head SHA, event, attempt, conclusion);
- `actions/runs/<run id>/jobs?filter=all`: every attempt's jobs and their `created_at`, `started_at`, `completed_at`;
- `commits/<head sha>/check-runs`: the checks API, each context's check-run conclusion;
- `check-runs/<job id>/annotations`: the `harness-verdict` and `cache` annotations, which outlast the logs.

**Rules applied** (conditions of § "Decision 6"). A dispatched run counts toward neither condition 2 nor condition 3. A run counts toward condition 3 only if its context reached the comparator (it carries `harness-verdict`). A run carrying `harness-infra` (an environment fault found before any comparison) is neither a break nor counted for condition 2 and is never a cold run; two or more consecutive infra runs at one head are printed as a finding. Duration is `completed_at - started_at`; the ceiling is 10 minutes. For an iOS context, queue time is `started_at - max(created_at, harness-generate.completed_at)`.

## harness-android-tokens

- Runs recorded: 31 (14 pull-request, 17 dispatched).
- Infra runs (`harness-infra`): 0 of 31 recorded, infra rate 0.0%.
- **Condition 2** (10 consecutive pull-request runs, no break): current streak 14 of 10 — met.
- **Condition 3** (three cold-cache runs under 10 minutes; pull-request runs with `cache: miss` that reached the comparator): 7 counted — met.

| run id | head SHA | event | attempt | conclusion | verdict | cache | created_at | started_at | completed_at | duration | queue | counts | break |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 42323442828 | `2563e46cf` | workflow_dispatch | 1 | failure | FAIL | miss | 2026-11-07T01:20:31Z | 2026-11-07T01:20:33Z | 2026-11-07T01:22:33Z | 120s | n/a | no (dispatched) | - |
| 42323861901 | `9754b985c` | workflow_dispatch | 1 | failure | FAIL | miss | 2026-11-07T01:25:21Z | 2026-11-07T01:25:23Z | 2026-11-07T01:27:10Z | 107s | n/a | no (dispatched) | - |
| 42324880305 | `cc2e71a51` | workflow_dispatch | 1 | failure | FAIL | miss | 2026-11-07T01:36:35Z | 2026-11-07T01:36:37Z | 2026-11-07T01:38:36Z | 119s | n/a | no (dispatched) | - |
| 42325607106 | `da3246b60` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T01:45:07Z | 2026-11-07T01:45:09Z | 2026-11-07T01:46:35Z | 86s | n/a | no (dispatched) | - |
| 42331622121 | `b00621317` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T02:57:24Z | 2026-11-07T02:57:26Z | 2026-11-07T02:59:02Z | 96s | n/a | no (dispatched) | - |
| 42332232400 | `2b8448e52` | workflow_dispatch | 1 | failure | - | - | 2026-11-07T03:04:10Z | 2026-11-07T03:04:17Z | 2026-11-07T03:04:21Z | 4s | n/a | no (dispatched) | - |
| 42332252550 | `2b8448e52` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T03:05:27Z | 2026-11-07T03:05:28Z | 2026-11-07T03:06:53Z | 85s | n/a | no (dispatched) | - |
| 42333520571 | `44e2f7f54` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T03:21:28Z | 2026-11-07T03:21:30Z | 2026-11-07T03:22:44Z | 74s | n/a | no (dispatched) | - |
| 42334777875 | `7f913164a` | pull_request | 1 | success | PASS | miss | 2026-11-07T03:37:47Z | 2026-11-07T03:37:49Z | 2026-11-07T03:40:25Z | 156s | n/a | cond 2, cond 3 | - |
| 42335435837 | `901d72002` | pull_request | 1 | success | PASS | hit | 2026-11-07T03:46:41Z | 2026-11-07T03:46:42Z | 2026-11-07T03:47:53Z | 71s | n/a | cond 2 | - |
| 42335480697 | `901d72002` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T03:47:29Z | 2026-11-07T03:47:31Z | 2026-11-07T03:49:01Z | 90s | n/a | no (dispatched) | - |
| 42336147392 | `c0d7281e9` | pull_request | 1 | success | PASS | hit | 2026-11-07T03:56:42Z | 2026-11-07T03:56:43Z | 2026-11-07T03:58:09Z | 86s | n/a | cond 2 | - |
| 42336916041 | `c16d4a79d` | pull_request | 1 | success | PASS | hit | 2026-11-07T04:07:15Z | 2026-11-07T04:07:17Z | 2026-11-07T04:08:48Z | 91s | n/a | cond 2 | - |
| 42339305095 | `96be4806e` | pull_request | 1 | success | PASS | miss | 2026-11-07T04:39:28Z | 2026-11-07T04:39:30Z | 2026-11-07T04:41:46Z | 136s | n/a | cond 2, cond 3 | - |
| 42339822561 | `97067e0dc` | pull_request | 1 | success | PASS | hit | 2026-11-07T04:46:40Z | 2026-11-07T04:46:42Z | 2026-11-07T04:48:03Z | 81s | n/a | cond 2 | - |
| 42341951949 | `4bb7b43dd` | pull_request | 1 | success | PASS | miss | 2026-11-07T05:16:43Z | 2026-11-07T05:16:45Z | 2026-11-07T05:19:05Z | 140s | n/a | cond 2, cond 3 | - |
| 42342764170 | `0124d1e11` | workflow_dispatch | 1 | failure | FAIL | miss | 2026-11-07T05:28:12Z | 2026-11-07T05:28:14Z | 2026-11-07T05:30:35Z | 141s | n/a | no (dispatched) | - |
| 42343602697 | `8a5ec800b` | workflow_dispatch | 1 | failure | FAIL | hit | 2026-11-07T05:40:07Z | 2026-11-07T05:40:09Z | 2026-11-07T05:41:27Z | 78s | n/a | no (dispatched) | - |
| 42344030960 | `361241d14` | workflow_dispatch | 1 | failure | FAIL | hit | 2026-11-07T05:45:56Z | 2026-11-07T05:45:58Z | 2026-11-07T05:47:12Z | 74s | n/a | no (dispatched) | - |
| 42344237867 | `d2680d9be` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T05:49:30Z | 2026-11-07T05:49:32Z | 2026-11-07T05:51:00Z | 88s | n/a | no (dispatched) | - |
| 42344710377 | `cd52a9bd2` | pull_request | 1 | success | PASS | hit | 2026-11-07T05:56:08Z | 2026-11-07T05:56:10Z | 2026-11-07T05:57:42Z | 92s | n/a | cond 2 | - |
| 42344794521 | `66bb7ee6c` | workflow_dispatch | 1 | success | PASS | miss | 2026-11-07T05:57:17Z | 2026-11-07T05:57:19Z | 2026-11-07T05:59:37Z | 138s | n/a | no (dispatched) | - |
| 42378844589 | `e1e5c3886` | workflow_dispatch | 1 | success | PASS | miss | 2026-11-07T13:52:18Z | 2026-11-07T13:52:20Z | 2026-11-07T13:54:43Z | 143s | n/a | no (dispatched) | - |
| 42378872101 | `78dcd0f39` | pull_request | 1 | success | PASS | miss | 2026-11-07T13:52:42Z | 2026-11-07T13:52:44Z | 2026-11-07T13:54:44Z | 120s | n/a | cond 2, cond 3 | - |
| 42379456009 | `df293bda6` | pull_request | 1 | success | PASS | miss | 2026-11-07T14:00:34Z | 2026-11-07T14:00:35Z | 2026-11-07T14:02:36Z | 121s | n/a | cond 2, cond 3 | - |
| 42380304363 | `5c2d27d75` | pull_request | 1 | success | PASS | hit | 2026-11-07T14:11:33Z | 2026-11-07T14:11:35Z | 2026-11-07T14:13:53Z | 138s | n/a | cond 2 | - |
| 42381118398 | `fd3f8648d` | pull_request | 1 | success | PASS | miss | 2026-11-07T14:21:14Z | 2026-11-07T14:21:16Z | 2026-11-07T14:23:36Z | 140s | n/a | cond 2, cond 3 | - |
| 42382373507 | `1ab44ee75` | workflow_dispatch | 1 | success | PASS | miss | 2026-11-07T14:37:07Z | 2026-11-07T14:37:10Z | 2026-11-07T14:39:21Z | 131s | n/a | no (dispatched) | - |
| 42382785811 | `58e1a9770` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T14:43:04Z | 2026-11-07T14:43:05Z | 2026-11-07T14:44:20Z | 75s | n/a | no (dispatched) | - |
| 42383642198 | `1e1dd5360` | pull_request | 1 | success | PASS | miss | 2026-11-07T14:54:01Z | 2026-11-07T14:54:03Z | 2026-11-07T14:56:19Z | 136s | n/a | cond 2, cond 3 | - |
| 42383947129 | `17bb37828` | pull_request | 1 | success | PASS | hit | 2026-11-07T14:58:02Z | 2026-11-07T14:58:04Z | 2026-11-07T14:59:08Z | 64s | n/a | cond 2 | - |

## harness-android-components

- Runs recorded: 31 (14 pull-request, 17 dispatched).
- Infra runs (`harness-infra`): 0 of 31 recorded, infra rate 0.0%.
- **Condition 2** (10 consecutive pull-request runs, no break): current streak 4 of 10 — not met.
- **Condition 3** (three cold-cache runs under 10 minutes; pull-request runs with `cache: miss` that reached the comparator): 6 counted — met.

| run id | head SHA | event | attempt | conclusion | verdict | cache | created_at | started_at | completed_at | duration | queue | counts | break |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 42323442828 | `2563e46cf` | workflow_dispatch | 1 | failure | FAIL | miss | 2026-11-07T01:20:31Z | 2026-11-07T01:20:33Z | 2026-11-07T01:22:49Z | 136s | n/a | no (dispatched) | - |
| 42323861901 | `9754b985c` | workflow_dispatch | 1 | failure | FAIL | miss | 2026-11-07T01:25:21Z | 2026-11-07T01:25:23Z | 2026-11-07T01:27:39Z | 136s | n/a | no (dispatched) | - |
| 42324880305 | `cc2e71a51` | workflow_dispatch | 1 | failure | FAIL | miss | 2026-11-07T01:36:35Z | 2026-11-07T01:36:37Z | 2026-11-07T01:38:25Z | 108s | n/a | no (dispatched) | - |
| 42325607106 | `da3246b60` | workflow_dispatch | 1 | failure | FAIL | hit | 2026-11-07T01:45:07Z | 2026-11-07T01:45:09Z | 2026-11-07T01:46:15Z | 66s | n/a | no (dispatched) | - |
| 42331622121 | `b00621317` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T02:57:24Z | 2026-11-07T02:57:27Z | 2026-11-07T02:58:57Z | 90s | n/a | no (dispatched) | - |
| 42332232400 | `2b8448e52` | workflow_dispatch | 1 | failure | - | - | 2026-11-07T03:04:10Z | 2026-11-07T03:04:12Z | 2026-11-07T03:04:17Z | 5s | n/a | no (dispatched) | - |
| 42332252550 | `2b8448e52` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T03:05:27Z | 2026-11-07T03:05:28Z | 2026-11-07T03:06:36Z | 68s | n/a | no (dispatched) | - |
| 42333520571 | `44e2f7f54` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T03:21:28Z | 2026-11-07T03:21:30Z | 2026-11-07T03:22:44Z | 74s | n/a | no (dispatched) | - |
| 42334777875 | `7f913164a` | pull_request | 1 | success | PASS | miss | 2026-11-07T03:37:47Z | 2026-11-07T03:37:49Z | 2026-11-07T03:39:44Z | 115s | n/a | cond 2, cond 3 | - |
| 42335435837 | `901d72002` | pull_request | 1 | success | PASS | hit | 2026-11-07T03:46:41Z | 2026-11-07T03:46:42Z | 2026-11-07T03:48:09Z | 87s | n/a | cond 2 | - |
| 42335480697 | `901d72002` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T03:47:29Z | 2026-11-07T03:47:31Z | 2026-11-07T03:48:44Z | 73s | n/a | no (dispatched) | - |
| 42336147392 | `c0d7281e9` | pull_request | 1 | success | PASS | hit | 2026-11-07T03:56:42Z | 2026-11-07T03:56:44Z | 2026-11-07T03:58:20Z | 96s | n/a | cond 2 | - |
| 42336916041 | `c16d4a79d` | pull_request | 1 | success | PASS | hit | 2026-11-07T04:07:15Z | 2026-11-07T04:07:17Z | 2026-11-07T04:08:24Z | 67s | n/a | cond 2 | - |
| 42339305095 | `96be4806e` | pull_request | 1 | success | PASS | miss | 2026-11-07T04:39:28Z | 2026-11-07T04:39:30Z | 2026-11-07T04:41:52Z | 142s | n/a | cond 2, cond 3 | - |
| 42339822561 | `97067e0dc` | pull_request | 1 | success | PASS | hit | 2026-11-07T04:46:40Z | 2026-11-07T04:46:42Z | 2026-11-07T04:47:54Z | 72s | n/a | cond 2 | - |
| 42341951949 | `4bb7b43dd` | pull_request | 1 | success | PASS | miss | 2026-11-07T05:16:43Z | 2026-11-07T05:16:46Z | 2026-11-07T05:19:07Z | 141s | n/a | cond 2, cond 3 | - |
| 42342764170 | `0124d1e11` | workflow_dispatch | 1 | success | PASS | miss | 2026-11-07T05:28:12Z | 2026-11-07T05:28:14Z | 2026-11-07T05:30:25Z | 131s | n/a | no (dispatched) | - |
| 42343602697 | `8a5ec800b` | workflow_dispatch | 1 | failure | FAIL | hit | 2026-11-07T05:40:07Z | 2026-11-07T05:40:09Z | 2026-11-07T05:41:39Z | 90s | n/a | no (dispatched) | - |
| 42344030960 | `361241d14` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T05:45:56Z | 2026-11-07T05:45:57Z | 2026-11-07T05:47:24Z | 87s | n/a | no (dispatched) | - |
| 42344237867 | `d2680d9be` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T05:49:30Z | 2026-11-07T05:49:32Z | 2026-11-07T05:51:15Z | 103s | n/a | no (dispatched) | - |
| 42344710377 | `cd52a9bd2` | pull_request | 1 | success | PASS | hit | 2026-11-07T05:56:08Z | 2026-11-07T05:56:11Z | 2026-11-07T05:58:01Z | 110s | n/a | cond 2 | - |
| 42344794521 | `66bb7ee6c` | workflow_dispatch | 1 | success | PASS | miss | 2026-11-07T05:57:17Z | 2026-11-07T05:57:19Z | 2026-11-07T05:59:47Z | 148s | n/a | no (dispatched) | - |
| 42378844589 | `e1e5c3886` | workflow_dispatch | 1 | success | PASS | miss | 2026-11-07T13:52:18Z | 2026-11-07T13:52:20Z | 2026-11-07T13:53:51Z | 91s | n/a | no (dispatched) | - |
| 42378872101 | `78dcd0f39` | pull_request | 1 | success | PASS | miss | 2026-11-07T13:52:42Z | 2026-11-07T13:53:04Z | 2026-11-07T13:55:37Z | 153s | n/a | cond 2, cond 3 | - |
| 42379456009 | `df293bda6` | pull_request | 2 | success | PASS | hit | 2026-11-07T14:06:02Z | 2026-11-07T14:06:04Z | 2026-11-07T14:08:44Z | 160s | n/a | cond 2 | attempts ended with different conclusions |
| 42380304363 | `5c2d27d75` | pull_request | 1 | success | PASS | hit | 2026-11-07T14:11:33Z | 2026-11-07T14:11:35Z | 2026-11-07T14:13:48Z | 133s | n/a | cond 2 | - |
| 42381118398 | `fd3f8648d` | pull_request | 1 | success | PASS | miss | 2026-11-07T14:21:14Z | 2026-11-07T14:21:16Z | 2026-11-07T14:23:04Z | 108s | n/a | cond 2, cond 3 | - |
| 42382373507 | `1ab44ee75` | workflow_dispatch | 1 | success | PASS | miss | 2026-11-07T14:37:07Z | 2026-11-07T14:37:09Z | 2026-11-07T14:39:32Z | 143s | n/a | no (dispatched) | - |
| 42382785811 | `58e1a9770` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T14:43:04Z | 2026-11-07T14:43:06Z | 2026-11-07T14:44:48Z | 102s | n/a | no (dispatched) | - |
| 42383642198 | `1e1dd5360` | pull_request | 1 | success | PASS | miss | 2026-11-07T14:54:01Z | 2026-11-07T14:54:03Z | 2026-11-07T14:56:00Z | 117s | n/a | cond 2, cond 3 | - |
| 42383947129 | `17bb37828` | pull_request | 1 | success | PASS | hit | 2026-11-07T14:58:02Z | 2026-11-07T14:58:04Z | 2026-11-07T14:59:29Z | 85s | n/a | cond 2 | - |

## harness-ios-tokens

- Runs recorded: 31 (14 pull-request, 17 dispatched).
- Infra runs (`harness-infra`): 0 of 31 recorded, infra rate 0.0%.
- **Condition 2** (10 consecutive pull-request runs, no break): current streak 14 of 10 — met.
- **Condition 3** (the first three pull-request runs at the current Xcode pin that reached the comparator, each under 10 minutes): 3 counted — met.
- **Condition 5** (queue time + duration of those runs against 10 minutes): within the ceiling.

| run id | head SHA | event | attempt | conclusion | verdict | cache | created_at | started_at | completed_at | duration | queue | counts | break |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 42323442828 | `2563e46cf` | workflow_dispatch | 1 | failure | FAIL | - | 2026-11-07T01:20:31Z | 2026-11-07T01:20:34Z | 2026-11-07T01:21:41Z | 67s | 3s | no (dispatched) | - |
| 42323861901 | `9754b985c` | workflow_dispatch | 1 | failure | FAIL | - | 2026-11-07T01:25:21Z | 2026-11-07T01:25:24Z | 2026-11-07T01:26:33Z | 69s | 3s | no (dispatched) | - |
| 42324880305 | `cc2e71a51` | workflow_dispatch | 1 | failure | FAIL | - | 2026-11-07T01:36:35Z | 2026-11-07T01:36:37Z | 2026-11-07T01:37:49Z | 72s | 2s | no (dispatched) | - |
| 42325607106 | `da3246b60` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T01:45:07Z | 2026-11-07T01:45:10Z | 2026-11-07T01:46:32Z | 82s | 3s | no (dispatched) | - |
| 42331622121 | `b00621317` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T02:57:24Z | 2026-11-07T02:57:27Z | 2026-11-07T02:58:28Z | 61s | 3s | no (dispatched) | - |
| 42332232400 | `2b8448e52` | workflow_dispatch | 1 | failure | - | - | 2026-11-07T03:04:10Z | 2026-11-07T03:04:13Z | 2026-11-07T03:04:21Z | 8s | 3s | no (dispatched) | - |
| 42332252550 | `2b8448e52` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T03:05:27Z | 2026-11-07T03:05:29Z | 2026-11-07T03:06:21Z | 52s | 2s | no (dispatched) | - |
| 42333520571 | `44e2f7f54` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T03:21:28Z | 2026-11-07T03:21:31Z | 2026-11-07T03:22:20Z | 49s | 3s | no (dispatched) | - |
| 42334777875 | `7f913164a` | pull_request | 1 | success | PASS | - | 2026-11-07T03:37:47Z | 2026-11-07T03:37:49Z | 2026-11-07T03:39:00Z | 71s | 2s | cond 2, cond 3 | - |
| 42335435837 | `901d72002` | pull_request | 1 | success | PASS | - | 2026-11-07T03:46:41Z | 2026-11-07T03:46:43Z | 2026-11-07T03:47:42Z | 59s | 2s | cond 2, cond 3 | - |
| 42335480697 | `901d72002` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T03:47:29Z | 2026-11-07T03:47:32Z | 2026-11-07T03:48:17Z | 45s | 3s | no (dispatched) | - |
| 42336147392 | `c0d7281e9` | pull_request | 1 | success | PASS | - | 2026-11-07T03:56:42Z | 2026-11-07T03:56:44Z | 2026-11-07T03:57:33Z | 49s | 2s | cond 2, cond 3 | - |
| 42336916041 | `c16d4a79d` | pull_request | 1 | success | PASS | - | 2026-11-07T04:07:15Z | 2026-11-07T04:07:18Z | 2026-11-07T04:08:27Z | 69s | 3s | cond 2 | - |
| 42339305095 | `96be4806e` | pull_request | 1 | success | PASS | - | 2026-11-07T04:39:28Z | 2026-11-07T04:39:30Z | 2026-11-07T04:40:55Z | 85s | 2s | cond 2 | - |
| 42339822561 | `97067e0dc` | pull_request | 1 | success | PASS | - | 2026-11-07T04:46:40Z | 2026-11-07T04:46:42Z | 2026-11-07T04:47:25Z | 43s | 2s | cond 2 | - |
| 42341951949 | `4bb7b43dd` | pull_request | 1 | success | PASS | - | 2026-11-07T05:16:43Z | 2026-11-07T05:16:46Z | 2026-11-07T05:18:20Z | 94s | 3s | cond 2 | - |
| 42342764170 | `0124d1e11` | workflow_dispatch | 1 | failure | FAIL | - | 2026-11-07T05:28:12Z | 2026-11-07T05:28:14Z | 2026-11-07T05:29:17Z | 63s | 2s | no (dispatched) | - |
| 42343602697 | `8a5ec800b` | workflow_dispatch | 1 | failure | FAIL | - | 2026-11-07T05:40:07Z | 2026-11-07T05:40:09Z | 2026-11-07T05:40:52Z | 43s | 2s | no (dispatched) | - |
| 42344030960 | `361241d14` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T05:45:56Z | 2026-11-07T05:45:58Z | 2026-11-07T05:46:52Z | 54s | 2s | no (dispatched) | - |
| 42344237867 | `d2680d9be` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T05:49:30Z | 2026-11-07T05:49:32Z | 2026-11-07T05:50:15Z | 43s | 2s | no (dispatched) | - |
| 42344710377 | `cd52a9bd2` | pull_request | 1 | success | PASS | - | 2026-11-07T05:56:08Z | 2026-11-07T05:56:11Z | 2026-11-07T05:57:12Z | 61s | 3s | cond 2 | - |
| 42344794521 | `66bb7ee6c` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T05:57:17Z | 2026-11-07T05:57:20Z | 2026-11-07T05:59:01Z | 101s | 3s | no (dispatched) | - |
| 42378844589 | `e1e5c3886` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T13:52:18Z | 2026-11-07T13:52:20Z | 2026-11-07T13:53:29Z | 69s | 2s | no (dispatched) | - |
| 42378872101 | `78dcd0f39` | pull_request | 1 | success | PASS | - | 2026-11-07T13:52:42Z | 2026-11-07T13:52:45Z | 2026-11-07T13:54:07Z | 82s | 3s | cond 2 | - |
| 42379456009 | `df293bda6` | pull_request | 1 | success | PASS | - | 2026-11-07T14:00:34Z | 2026-11-07T14:00:35Z | 2026-11-07T14:01:51Z | 76s | 1s | cond 2 | - |
| 42380304363 | `5c2d27d75` | pull_request | 1 | success | PASS | - | 2026-11-07T14:11:33Z | 2026-11-07T14:11:35Z | 2026-11-07T14:12:31Z | 56s | 2s | cond 2 | - |
| 42381118398 | `fd3f8648d` | pull_request | 1 | success | PASS | - | 2026-11-07T14:21:14Z | 2026-11-07T14:21:17Z | 2026-11-07T14:22:22Z | 65s | 3s | cond 2 | - |
| 42382373507 | `1ab44ee75` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T14:37:07Z | 2026-11-07T14:37:10Z | 2026-11-07T14:38:28Z | 78s | 3s | no (dispatched) | - |
| 42382785811 | `58e1a9770` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T14:43:04Z | 2026-11-07T14:43:06Z | 2026-11-07T14:44:12Z | 66s | 2s | no (dispatched) | - |
| 42383642198 | `1e1dd5360` | pull_request | 1 | success | PASS | - | 2026-11-07T14:54:01Z | 2026-11-07T14:54:03Z | 2026-11-07T14:55:21Z | 78s | 2s | cond 2 | - |
| 42383947129 | `17bb37828` | pull_request | 1 | success | PASS | - | 2026-11-07T14:58:02Z | 2026-11-07T14:58:05Z | 2026-11-07T14:59:05Z | 60s | 3s | cond 2 | - |

## harness-ios-components

- Runs recorded: 31 (14 pull-request, 17 dispatched).
- Infra runs (`harness-infra`): 0 of 31 recorded, infra rate 0.0%.
- **Condition 2** (10 consecutive pull-request runs, no break): current streak 14 of 10 — met.
- **Condition 3** (the first three pull-request runs at the current Xcode pin that reached the comparator, each under 10 minutes): 3 counted — met.
- **Condition 5** (queue time + duration of those runs against 10 minutes): within the ceiling.

| run id | head SHA | event | attempt | conclusion | verdict | cache | created_at | started_at | completed_at | duration | queue | counts | break |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 42323442828 | `2563e46cf` | workflow_dispatch | 1 | failure | FAIL | - | 2026-11-07T01:20:31Z | 2026-11-07T01:20:34Z | 2026-11-07T01:22:37Z | 123s | 3s | no (dispatched) | - |
| 42323861901 | `9754b985c` | workflow_dispatch | 1 | failure | FAIL | - | 2026-11-07T01:25:21Z | 2026-11-07T01:25:23Z | 2026-11-07T01:26:39Z | 76s | 2s | no (dispatched) | - |
| 42324880305 | `cc2e71a51` | workflow_dispatch | 1 | failure | FAIL | - | 2026-11-07T01:36:35Z | 2026-11-07T01:36:37Z | 2026-11-07T01:37:47Z | 70s | 2s | no (dispatched) | - |
| 42325607106 | `da3246b60` | workflow_dispatch | 1 | failure | FAIL | - | 2026-11-07T01:45:07Z | 2026-11-07T01:45:09Z | 2026-11-07T01:46:40Z | 91s | 2s | no (dispatched) | - |
| 42331622121 | `b00621317` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T02:57:24Z | 2026-11-07T02:57:27Z | 2026-11-07T02:58:45Z | 78s | 3s | no (dispatched) | - |
| 42332232400 | `2b8448e52` | workflow_dispatch | 1 | failure | - | - | 2026-11-07T03:04:10Z | 2026-11-07T03:04:12Z | 2026-11-07T03:04:17Z | 5s | 2s | no (dispatched) | - |
| 42332252550 | `2b8448e52` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T03:05:27Z | 2026-11-07T03:05:28Z | 2026-11-07T03:06:26Z | 58s | 1s | no (dispatched) | - |
| 42333520571 | `44e2f7f54` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T03:21:28Z | 2026-11-07T03:21:30Z | 2026-11-07T03:22:34Z | 64s | 2s | no (dispatched) | - |
| 42334777875 | `7f913164a` | pull_request | 1 | success | PASS | - | 2026-11-07T03:37:47Z | 2026-11-07T03:37:50Z | 2026-11-07T03:39:39Z | 109s | 3s | cond 2, cond 3 | - |
| 42335435837 | `901d72002` | pull_request | 1 | success | PASS | - | 2026-11-07T03:46:41Z | 2026-11-07T03:46:44Z | 2026-11-07T03:47:55Z | 71s | 3s | cond 2, cond 3 | - |
| 42335480697 | `901d72002` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T03:47:29Z | 2026-11-07T03:47:31Z | 2026-11-07T03:48:32Z | 61s | 2s | no (dispatched) | - |
| 42336147392 | `c0d7281e9` | pull_request | 1 | success | PASS | - | 2026-11-07T03:56:42Z | 2026-11-07T03:56:44Z | 2026-11-07T03:57:54Z | 70s | 2s | cond 2, cond 3 | - |
| 42336916041 | `c16d4a79d` | pull_request | 1 | success | PASS | - | 2026-11-07T04:07:15Z | 2026-11-07T04:07:17Z | 2026-11-07T04:08:36Z | 79s | 2s | cond 2 | - |
| 42339305095 | `96be4806e` | pull_request | 1 | success | PASS | - | 2026-11-07T04:39:28Z | 2026-11-07T04:39:30Z | 2026-11-07T04:41:07Z | 97s | 2s | cond 2 | - |
| 42339822561 | `97067e0dc` | pull_request | 1 | success | PASS | - | 2026-11-07T04:46:40Z | 2026-11-07T04:46:43Z | 2026-11-07T04:47:36Z | 53s | 3s | cond 2 | - |
| 42341951949 | `4bb7b43dd` | pull_request | 1 | success | PASS | - | 2026-11-07T05:16:43Z | 2026-11-07T05:16:46Z | 2026-11-07T05:18:41Z | 115s | 3s | cond 2 | - |
| 42342764170 | `0124d1e11` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T05:28:12Z | 2026-11-07T05:28:14Z | 2026-11-07T05:29:31Z | 77s | 2s | no (dispatched) | - |
| 42343602697 | `8a5ec800b` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T05:40:07Z | 2026-11-07T05:40:09Z | 2026-11-07T05:41:12Z | 63s | 2s | no (dispatched) | - |
| 42344030960 | `361241d14` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T05:45:56Z | 2026-11-07T05:45:58Z | 2026-11-07T05:47:35Z | 97s | 2s | no (dispatched) | - |
| 42344237867 | `d2680d9be` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T05:49:30Z | 2026-11-07T05:49:32Z | 2026-11-07T05:50:44Z | 72s | 2s | no (dispatched) | - |
| 42344710377 | `cd52a9bd2` | pull_request | 1 | success | PASS | - | 2026-11-07T05:56:08Z | 2026-11-07T05:56:11Z | 2026-11-07T05:57:26Z | 75s | 3s | cond 2 | - |
| 42344794521 | `66bb7ee6c` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T05:57:17Z | 2026-11-07T05:57:19Z | 2026-11-07T05:58:58Z | 99s | 2s | no (dispatched) | - |
| 42378844589 | `e1e5c3886` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T13:52:18Z | 2026-11-07T13:52:20Z | 2026-11-07T13:53:54Z | 94s | 2s | no (dispatched) | - |
| 42378872101 | `78dcd0f39` | pull_request | 1 | success | PASS | - | 2026-11-07T13:52:42Z | 2026-11-07T13:52:45Z | 2026-11-07T13:54:07Z | 82s | 3s | cond 2 | - |
| 42379456009 | `df293bda6` | pull_request | 1 | success | PASS | - | 2026-11-07T14:00:34Z | 2026-11-07T14:00:36Z | 2026-11-07T14:01:57Z | 81s | 2s | cond 2 | - |
| 42380304363 | `5c2d27d75` | pull_request | 1 | success | PASS | - | 2026-11-07T14:11:33Z | 2026-11-07T14:11:35Z | 2026-11-07T14:12:40Z | 65s | 2s | cond 2 | - |
| 42381118398 | `fd3f8648d` | pull_request | 1 | success | PASS | - | 2026-11-07T14:21:14Z | 2026-11-07T14:21:16Z | 2026-11-07T14:23:00Z | 104s | 2s | cond 2 | - |
| 42382373507 | `1ab44ee75` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T14:37:07Z | 2026-11-07T14:37:10Z | 2026-11-07T14:39:07Z | 117s | 3s | no (dispatched) | - |
| 42382785811 | `58e1a9770` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T14:43:04Z | 2026-11-07T14:43:07Z | 2026-11-07T14:44:31Z | 84s | 3s | no (dispatched) | - |
| 42383642198 | `1e1dd5360` | pull_request | 1 | success | PASS | - | 2026-11-07T14:54:01Z | 2026-11-07T14:54:04Z | 2026-11-07T14:55:38Z | 94s | 3s | cond 2 | - |
| 42383947129 | `17bb37828` | pull_request | 1 | success | PASS | - | 2026-11-07T14:58:02Z | 2026-11-07T14:58:04Z | 2026-11-07T14:59:57Z | 113s | 2s | cond 2 | - |

