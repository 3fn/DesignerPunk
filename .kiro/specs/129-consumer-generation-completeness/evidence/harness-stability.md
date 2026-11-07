# Harness stability record

Computed by `scripts/harness/stability.ts`; never edited by hand (tasks.md § "Decision 6"). Re-run it before each promotion offer.

**Generated**: 2026-11-07T20:27:03Z · **Repository**: `3fn/DesignerPunk` · **Workflow**: `native-harness.yml` · Correction (MP-1): the record committed in #717 (generated 2026-11-07T16:01:06Z) read run 42388889208, not yet completed, as a condition-2 break and said streak 0 of 10; a run whose status is not completed is now skipped and listed under Skipped runs (Peter, README rule 10, 2026-11-07T20:21:05Z)

**Source endpoints** (all under `repos/3fn/DesignerPunk`; a job id is its check run id):
- `actions/workflows/native-harness.yml/runs`: the runs (id, head SHA, event, attempt, conclusion);
- `actions/runs/<run id>/jobs?filter=all`: every attempt's jobs and their `created_at`, `started_at`, `completed_at`;
- `commits/<head sha>/check-runs`: the checks API, each context's check-run conclusion;
- `check-runs/<job id>/annotations`: the `harness-verdict` and `cache` annotations, which outlast the logs.

**Rules applied** (conditions of § "Decision 6"). A dispatched run counts toward neither condition 2 nor condition 3. A run counts toward condition 3 only if its context reached the comparator (it carries `harness-verdict`). A run carrying `harness-infra` (an environment fault found before any comparison) is neither a break nor counted for condition 2 and is never a cold run; two or more consecutive infra runs at one head are printed as a finding. A run whose status is not `completed` is skipped: neither a break nor counted, and listed in a skipped-runs table per context. Duration is `completed_at - started_at`; the ceiling is 10 minutes. For an iOS context, queue time is `started_at - max(created_at, harness-generate.completed_at)`.

## harness-android-tokens

- Runs recorded: 86 (54 pull-request, 32 dispatched).
- Infra runs (`harness-infra`): 0 of 86 recorded, infra rate 0.0%.
- **Condition 2** (10 consecutive pull-request runs, no break): current streak 54 of 10 — met.
- **Condition 3** (three cold-cache runs under 10 minutes; pull-request runs with `cache: miss` that reached the comparator): 29 counted — met.

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
| 42384684480 | `cba101c76` | pull_request | 1 | success | PASS | hit | 2026-11-07T15:07:05Z | 2026-11-07T15:07:31Z | 2026-11-07T15:08:49Z | 78s | n/a | cond 2 | - |
| 42384737593 | `cba101c76` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T15:07:28Z | 2026-11-07T15:07:43Z | 2026-11-07T15:09:19Z | 96s | n/a | no (dispatched) | - |
| 42385313762 | `b99105b0d` | pull_request | 1 | success | PASS | hit | 2026-11-07T15:14:40Z | 2026-11-07T15:14:42Z | 2026-11-07T15:16:09Z | 87s | n/a | cond 2 | - |
| 42386475858 | `00d7e5fb2` | pull_request | 1 | success | PASS | miss | 2026-11-07T15:28:59Z | 2026-11-07T15:29:01Z | 2026-11-07T15:31:09Z | 128s | n/a | cond 2, cond 3 | - |
| 42387838286 | `8352ba070` | pull_request | 1 | success | PASS | miss | 2026-11-07T15:45:29Z | 2026-11-07T15:45:31Z | 2026-11-07T15:47:46Z | 135s | n/a | cond 2, cond 3 | - |
| 42387862023 | `a8967663e` | workflow_dispatch | 1 | failure | FAIL | miss | 2026-11-07T15:46:12Z | 2026-11-07T15:46:14Z | 2026-11-07T15:49:03Z | 169s | n/a | no (dispatched) | - |
| 42388323035 | `25fb4b7ac` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T15:51:33Z | 2026-11-07T15:51:35Z | 2026-11-07T15:53:03Z | 88s | n/a | no (dispatched) | - |
| 42388889208 | `457b2d39b` | pull_request | 1 | success | PASS | miss | 2026-11-07T15:59:16Z | 2026-11-07T15:59:18Z | 2026-11-07T16:01:40Z | 142s | n/a | cond 2, cond 3 | - |
| 42389019355 | `d9bb5404b` | workflow_dispatch | 1 | success | PASS | miss | 2026-11-07T16:00:53Z | 2026-11-07T16:00:55Z | 2026-11-07T16:03:19Z | 144s | n/a | no (dispatched) | - |
| 42389454168 | `73bb2ef10` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T16:06:02Z | 2026-11-07T16:06:04Z | 2026-11-07T16:07:34Z | 90s | n/a | no (dispatched) | - |
| 42389599671 | `ce1980df5` | pull_request | 1 | success | PASS | miss | 2026-11-07T16:07:52Z | 2026-11-07T16:07:54Z | 2026-11-07T16:10:35Z | 161s | n/a | cond 2, cond 3 | - |
| 42389735450 | `cfab56c39` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T16:09:12Z | 2026-11-07T16:09:15Z | 2026-11-07T16:10:55Z | 100s | n/a | no (dispatched) | - |
| 42390328278 | `adc1c3a29` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T16:16:08Z | 2026-11-07T16:16:10Z | 2026-11-07T16:17:45Z | 95s | n/a | no (dispatched) | - |
| 42390455743 | `6f197eba2` | pull_request | 1 | success | PASS | miss | 2026-11-07T16:17:42Z | 2026-11-07T16:17:44Z | 2026-11-07T16:20:11Z | 147s | n/a | cond 2, cond 3 | - |
| 42391328951 | `1d9adda10` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T16:28:20Z | 2026-11-07T16:28:22Z | 2026-11-07T16:29:38Z | 76s | n/a | no (dispatched) | - |
| 42391754214 | `40eab6d86` | pull_request | 1 | success | PASS | miss | 2026-11-07T16:33:28Z | 2026-11-07T16:33:30Z | 2026-11-07T16:35:35Z | 125s | n/a | cond 2, cond 3 | - |
| 42392166707 | `bc837533f` | pull_request | 1 | success | PASS | hit | 2026-11-07T16:38:01Z | 2026-11-07T16:38:04Z | 2026-11-07T16:39:39Z | 95s | n/a | cond 2 | - |
| 42392201744 | `2351e4b48` | pull_request | 1 | success | PASS | hit | 2026-11-07T16:38:32Z | 2026-11-07T16:38:34Z | 2026-11-07T16:40:13Z | 99s | n/a | cond 2 | - |
| 42392857681 | `d21ed6e50` | pull_request | 1 | success | PASS | hit | 2026-11-07T16:46:09Z | 2026-11-07T16:46:11Z | 2026-11-07T16:47:14Z | 63s | n/a | cond 2 | - |
| 42394329704 | `324bd5ce4` | pull_request | 1 | success | PASS | miss | 2026-11-07T17:04:00Z | 2026-11-07T17:04:02Z | 2026-11-07T17:06:35Z | 153s | n/a | cond 2, cond 3 | - |
| 42397500848 | `700673328` | pull_request | 1 | success | PASS | miss | 2026-11-07T17:42:14Z | 2026-11-07T17:42:16Z | 2026-11-07T17:44:19Z | 123s | n/a | cond 2, cond 3 | - |
| 42397732103 | `bf0e8c844` | pull_request | 1 | success | PASS | hit | 2026-11-07T17:45:13Z | 2026-11-07T17:45:14Z | 2026-11-07T17:46:19Z | 65s | n/a | cond 2 | - |
| 42398276941 | `1af76c2dd` | pull_request | 1 | success | PASS | hit | 2026-11-07T17:51:49Z | 2026-11-07T17:51:51Z | 2026-11-07T17:53:32Z | 101s | n/a | cond 2 | - |
| 42398418712 | `b016a237d` | pull_request | 1 | success | PASS | miss | 2026-11-07T17:53:40Z | 2026-11-07T17:54:08Z | 2026-11-07T17:56:41Z | 153s | n/a | cond 2, cond 3 | - |
| 42398497602 | `d013eeb35` | pull_request | 1 | success | PASS | miss | 2026-11-07T17:54:35Z | 2026-11-07T17:54:59Z | 2026-11-07T17:57:10Z | 131s | n/a | cond 2, cond 3 | - |
| 42398575771 | `bac739b33` | pull_request | 1 | success | PASS | miss | 2026-11-07T17:55:44Z | 2026-11-07T17:56:13Z | 2026-11-07T17:58:11Z | 118s | n/a | cond 2, cond 3 | - |
| 42398691473 | `5adccca8f` | pull_request | 1 | success | PASS | hit | 2026-11-07T17:57:03Z | 2026-11-07T17:57:19Z | 2026-11-07T17:58:22Z | 63s | n/a | cond 2 | - |
| 42399019149 | `6222822db` | pull_request | 1 | success | PASS | hit | 2026-11-07T18:01:07Z | 2026-11-07T18:01:41Z | 2026-11-07T18:03:06Z | 85s | n/a | cond 2 | - |
| 42399106899 | `5a21d429b` | pull_request | 1 | success | PASS | hit | 2026-11-07T18:02:11Z | 2026-11-07T18:03:10Z | 2026-11-07T18:04:16Z | 66s | n/a | cond 2 | - |
| 42399228729 | `5acbf1d79` | pull_request | 1 | success | PASS | hit | 2026-11-07T18:04:06Z | 2026-11-07T18:04:33Z | 2026-11-07T18:05:39Z | 66s | n/a | cond 2 | - |
| 42399329594 | `f3123d87f` | pull_request | 1 | success | PASS | hit | 2026-11-07T18:04:32Z | 2026-11-07T18:05:16Z | 2026-11-07T18:06:51Z | 95s | n/a | cond 2 | - |
| 42400147257 | `6992a8195` | pull_request | 1 | success | PASS | miss | 2026-11-07T18:13:54Z | 2026-11-07T18:13:56Z | 2026-11-07T18:15:58Z | 122s | n/a | cond 2, cond 3 | - |
| 42400542508 | `f53d6057d` | pull_request | 1 | success | PASS | miss | 2026-11-07T18:18:49Z | 2026-11-07T18:18:51Z | 2026-11-07T18:21:33Z | 162s | n/a | cond 2, cond 3 | - |
| 42400709719 | `37db5e158` | pull_request | 1 | success | PASS | hit | 2026-11-07T18:20:46Z | 2026-11-07T18:20:51Z | 2026-11-07T18:22:09Z | 78s | n/a | cond 2 | - |
| 42400738557 | `c5de2e547` | pull_request | 1 | success | PASS | miss | 2026-11-07T18:21:16Z | 2026-11-07T18:21:40Z | 2026-11-07T18:23:55Z | 135s | n/a | cond 2, cond 3 | - |
| 42400789833 | `b2f329e99` | workflow_dispatch | 1 | success | PASS | miss | 2026-11-07T18:22:00Z | 2026-11-07T18:22:44Z | 2026-11-07T18:25:05Z | 141s | n/a | no (dispatched) | - |
| 42400890476 | `98fcc7693` | pull_request | 1 | success | PASS | miss | 2026-11-07T18:23:12Z | 2026-11-07T18:23:49Z | 2026-11-07T18:26:21Z | 152s | n/a | cond 2, cond 3 | - |
| 42401470664 | `ded1dc74a` | workflow_dispatch | 1 | failure | FAIL | hit | 2026-11-07T18:29:47Z | 2026-11-07T18:29:48Z | 2026-11-07T18:31:27Z | 99s | n/a | no (dispatched) | - |
| 42401617739 | `d20131c7c` | pull_request | 1 | success | PASS | hit | 2026-11-07T18:31:44Z | 2026-11-07T18:31:56Z | 2026-11-07T18:33:28Z | 92s | n/a | cond 2 | - |
| 42401718131 | `fbf726980` | pull_request | 1 | success | PASS | hit | 2026-11-07T18:33:12Z | 2026-11-07T18:33:14Z | 2026-11-07T18:34:23Z | 69s | n/a | cond 2 | - |
| 42401770233 | `2cdd30104` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T18:33:08Z | 2026-11-07T18:33:10Z | 2026-11-07T18:34:54Z | 104s | n/a | no (dispatched) | - |
| 42402006748 | `2db956698` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T18:36:26Z | 2026-11-07T18:36:28Z | 2026-11-07T18:37:55Z | 87s | n/a | no (dispatched) | - |
| 42402345774 | `82e4dc588` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T18:40:25Z | 2026-11-07T18:40:27Z | 2026-11-07T18:41:33Z | 66s | n/a | no (dispatched) | - |
| 42402481018 | `629e51d0f` | pull_request | 1 | success | PASS | hit | 2026-11-07T18:41:51Z | 2026-11-07T18:41:53Z | 2026-11-07T18:43:18Z | 85s | n/a | cond 2 | - |
| 42402979941 | `3b8819d24` | pull_request | 1 | success | PASS | hit | 2026-11-07T18:48:25Z | 2026-11-07T18:48:27Z | 2026-11-07T18:49:51Z | 84s | n/a | cond 2 | - |
| 42403058832 | `24f66dbaa` | workflow_dispatch | 1 | success | PASS | miss | 2026-11-07T18:49:06Z | 2026-11-07T18:49:08Z | 2026-11-07T18:51:19Z | 131s | n/a | no (dispatched) | - |
| 42403410288 | `e61c0ee2a` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T18:53:39Z | 2026-11-07T18:53:41Z | 2026-11-07T18:55:09Z | 88s | n/a | no (dispatched) | - |
| 42403640009 | `42a96ded6` | pull_request | 1 | success | PASS | miss | 2026-11-07T18:56:29Z | 2026-11-07T18:56:31Z | 2026-11-07T18:58:53Z | 142s | n/a | cond 2, cond 3 | - |
| 42404320488 | `618397a27` | pull_request | 1 | success | PASS | miss | 2026-11-07T19:04:39Z | 2026-11-07T19:04:41Z | 2026-11-07T19:07:20Z | 159s | n/a | cond 2, cond 3 | - |
| 42404859181 | `25510dbfe` | pull_request | 1 | success | PASS | miss | 2026-11-07T19:10:48Z | 2026-11-07T19:10:50Z | 2026-11-07T19:13:08Z | 138s | n/a | cond 2, cond 3 | - |
| 42405389508 | `120220e96` | pull_request | 1 | success | PASS | miss | 2026-11-07T19:17:33Z | 2026-11-07T19:17:35Z | 2026-11-07T19:19:39Z | 124s | n/a | cond 2, cond 3 | - |
| 42405431176 | `739f8e833` | pull_request | 1 | success | PASS | miss | 2026-11-07T19:17:56Z | 2026-11-07T19:17:58Z | 2026-11-07T19:20:24Z | 146s | n/a | cond 2, cond 3 | - |
| 42405937743 | `fa0500cca` | pull_request | 1 | success | PASS | hit | 2026-11-07T19:23:55Z | 2026-11-07T19:23:57Z | 2026-11-07T19:25:25Z | 88s | n/a | cond 2 | - |
| 42407092478 | `4d19b33b9` | pull_request | 1 | success | PASS | miss | 2026-11-07T19:38:37Z | 2026-11-07T19:38:39Z | 2026-11-07T19:41:14Z | 155s | n/a | cond 2, cond 3 | - |
| 42408574036 | `d56c45d4b` | pull_request | 1 | success | PASS | miss | 2026-11-07T19:57:23Z | 2026-11-07T19:57:25Z | 2026-11-07T19:59:52Z | 147s | n/a | cond 2, cond 3 | - |

## harness-android-components

- Runs recorded: 86 (54 pull-request, 32 dispatched).
- Infra runs (`harness-infra`): 0 of 86 recorded, infra rate 0.0%.
- **Condition 2** (10 consecutive pull-request runs, no break): current streak 44 of 10 — met.
- **Condition 3** (three cold-cache runs under 10 minutes; pull-request runs with `cache: miss` that reached the comparator): 27 counted — met.

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
| 42384684480 | `cba101c76` | pull_request | 1 | success | PASS | hit | 2026-11-07T15:07:05Z | 2026-11-07T15:07:37Z | 2026-11-07T15:08:58Z | 81s | n/a | cond 2 | - |
| 42384737593 | `cba101c76` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T15:07:28Z | 2026-11-07T15:07:37Z | 2026-11-07T15:09:01Z | 84s | n/a | no (dispatched) | - |
| 42385313762 | `b99105b0d` | pull_request | 1 | success | PASS | hit | 2026-11-07T15:14:40Z | 2026-11-07T15:14:42Z | 2026-11-07T15:16:00Z | 78s | n/a | cond 2 | - |
| 42386475858 | `00d7e5fb2` | pull_request | 1 | success | PASS | miss | 2026-11-07T15:28:59Z | 2026-11-07T15:29:00Z | 2026-11-07T15:30:44Z | 104s | n/a | cond 2, cond 3 | - |
| 42387838286 | `8352ba070` | pull_request | 1 | success | PASS | miss | 2026-11-07T15:45:29Z | 2026-11-07T15:45:31Z | 2026-11-07T15:47:45Z | 134s | n/a | cond 2, cond 3 | - |
| 42387862023 | `a8967663e` | workflow_dispatch | 1 | failure | FAIL | miss | 2026-11-07T15:46:12Z | 2026-11-07T15:46:14Z | 2026-11-07T15:48:06Z | 112s | n/a | no (dispatched) | - |
| 42388323035 | `25fb4b7ac` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T15:51:33Z | 2026-11-07T15:51:35Z | 2026-11-07T15:52:58Z | 83s | n/a | no (dispatched) | - |
| 42388889208 | `457b2d39b` | pull_request | 1 | success | PASS | miss | 2026-11-07T15:59:16Z | 2026-11-07T15:59:18Z | 2026-11-07T16:01:10Z | 112s | n/a | cond 2, cond 3 | - |
| 42389019355 | `d9bb5404b` | workflow_dispatch | 1 | failure | FAIL | miss | 2026-11-07T16:00:53Z | 2026-11-07T16:00:55Z | 2026-11-07T16:02:45Z | 110s | n/a | no (dispatched) | - |
| 42389454168 | `73bb2ef10` | workflow_dispatch | 1 | failure | FAIL | hit | 2026-11-07T16:06:02Z | 2026-11-07T16:06:03Z | 2026-11-07T16:07:30Z | 87s | n/a | no (dispatched) | - |
| 42389599671 | `ce1980df5` | pull_request | 1 | success | PASS | miss | 2026-11-07T16:07:52Z | 2026-11-07T16:07:54Z | 2026-11-07T16:10:01Z | 127s | n/a | cond 2, cond 3 | - |
| 42389735450 | `cfab56c39` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T16:09:12Z | 2026-11-07T16:09:14Z | 2026-11-07T16:10:45Z | 91s | n/a | no (dispatched) | - |
| 42390328278 | `adc1c3a29` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T16:16:08Z | 2026-11-07T16:16:10Z | 2026-11-07T16:17:20Z | 70s | n/a | no (dispatched) | - |
| 42390455743 | `6f197eba2` | pull_request | 1 | success | PASS | miss | 2026-11-07T16:17:42Z | 2026-11-07T16:17:44Z | 2026-11-07T16:20:11Z | 147s | n/a | cond 2, cond 3 | - |
| 42391328951 | `1d9adda10` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T16:28:20Z | 2026-11-07T16:28:22Z | 2026-11-07T16:29:26Z | 64s | n/a | no (dispatched) | - |
| 42391754214 | `40eab6d86` | pull_request | 1 | success | PASS | miss | 2026-11-07T16:33:28Z | 2026-11-07T16:33:31Z | 2026-11-07T16:35:56Z | 145s | n/a | cond 2, cond 3 | - |
| 42392166707 | `bc837533f` | pull_request | 1 | success | PASS | hit | 2026-11-07T16:38:01Z | 2026-11-07T16:38:02Z | 2026-11-07T16:39:17Z | 75s | n/a | cond 2 | - |
| 42392201744 | `2351e4b48` | pull_request | 1 | success | PASS | hit | 2026-11-07T16:38:32Z | 2026-11-07T16:38:58Z | 2026-11-07T16:40:32Z | 94s | n/a | cond 2 | - |
| 42392857681 | `d21ed6e50` | pull_request | 1 | success | PASS | hit | 2026-11-07T16:46:09Z | 2026-11-07T16:46:11Z | 2026-11-07T16:47:30Z | 79s | n/a | cond 2 | - |
| 42394329704 | `324bd5ce4` | pull_request | 1 | success | PASS | miss | 2026-11-07T17:04:00Z | 2026-11-07T17:04:02Z | 2026-11-07T17:06:17Z | 135s | n/a | cond 2, cond 3 | - |
| 42397500848 | `700673328` | pull_request | 1 | success | PASS | miss | 2026-11-07T17:42:14Z | 2026-11-07T17:42:16Z | 2026-11-07T17:43:55Z | 99s | n/a | cond 2, cond 3 | - |
| 42397732103 | `bf0e8c844` | pull_request | 1 | success | PASS | hit | 2026-11-07T17:45:13Z | 2026-11-07T17:45:14Z | 2026-11-07T17:46:17Z | 63s | n/a | cond 2 | - |
| 42398276941 | `1af76c2dd` | pull_request | 1 | success | PASS | hit | 2026-11-07T17:51:49Z | 2026-11-07T17:51:51Z | 2026-11-07T17:53:15Z | 84s | n/a | cond 2 | - |
| 42398418712 | `b016a237d` | pull_request | 1 | success | PASS | miss | 2026-11-07T17:53:40Z | 2026-11-07T17:53:45Z | 2026-11-07T17:56:07Z | 142s | n/a | cond 2, cond 3 | - |
| 42398497602 | `d013eeb35` | pull_request | 1 | success | PASS | miss | 2026-11-07T17:54:35Z | 2026-11-07T17:55:13Z | 2026-11-07T17:57:15Z | 122s | n/a | cond 2, cond 3 | - |
| 42398575771 | `bac739b33` | pull_request | 1 | success | PASS | hit | 2026-11-07T17:55:44Z | 2026-11-07T17:56:42Z | 2026-11-07T17:58:02Z | 80s | n/a | cond 2 | - |
| 42398691473 | `5adccca8f` | pull_request | 1 | success | PASS | hit | 2026-11-07T17:57:03Z | 2026-11-07T17:57:21Z | 2026-11-07T17:58:25Z | 64s | n/a | cond 2 | - |
| 42399019149 | `6222822db` | pull_request | 1 | success | PASS | hit | 2026-11-07T18:01:07Z | 2026-11-07T18:01:25Z | 2026-11-07T18:02:33Z | 68s | n/a | cond 2 | - |
| 42399106899 | `5a21d429b` | pull_request | 1 | success | PASS | hit | 2026-11-07T18:02:11Z | 2026-11-07T18:02:48Z | 2026-11-07T18:04:16Z | 88s | n/a | cond 2 | - |
| 42399228729 | `5acbf1d79` | pull_request | 1 | success | PASS | hit | 2026-11-07T18:04:06Z | 2026-11-07T18:04:36Z | 2026-11-07T18:05:59Z | 83s | n/a | cond 2 | - |
| 42399329594 | `f3123d87f` | pull_request | 1 | success | PASS | hit | 2026-11-07T18:04:32Z | 2026-11-07T18:04:47Z | 2026-11-07T18:05:51Z | 64s | n/a | cond 2 | - |
| 42400147257 | `6992a8195` | pull_request | 1 | success | PASS | miss | 2026-11-07T18:13:54Z | 2026-11-07T18:13:56Z | 2026-11-07T18:15:51Z | 115s | n/a | cond 2, cond 3 | - |
| 42400542508 | `f53d6057d` | pull_request | 1 | success | PASS | miss | 2026-11-07T18:18:49Z | 2026-11-07T18:18:51Z | 2026-11-07T18:21:30Z | 159s | n/a | cond 2, cond 3 | - |
| 42400709719 | `37db5e158` | pull_request | 1 | success | PASS | hit | 2026-11-07T18:20:46Z | 2026-11-07T18:20:49Z | 2026-11-07T18:22:20Z | 91s | n/a | cond 2 | - |
| 42400738557 | `c5de2e547` | pull_request | 1 | success | PASS | miss | 2026-11-07T18:21:16Z | 2026-11-07T18:21:39Z | 2026-11-07T18:24:12Z | 153s | n/a | cond 2, cond 3 | - |
| 42400789833 | `b2f329e99` | workflow_dispatch | 1 | failure | FAIL | miss | 2026-11-07T18:22:00Z | 2026-11-07T18:22:44Z | 2026-11-07T18:25:12Z | 148s | n/a | no (dispatched) | - |
| 42400890476 | `98fcc7693` | pull_request | 1 | success | PASS | miss | 2026-11-07T18:23:12Z | 2026-11-07T18:23:49Z | 2026-11-07T18:26:19Z | 150s | n/a | cond 2, cond 3 | - |
| 42401470664 | `ded1dc74a` | workflow_dispatch | 1 | failure | FAIL | hit | 2026-11-07T18:29:47Z | 2026-11-07T18:29:48Z | 2026-11-07T18:31:13Z | 85s | n/a | no (dispatched) | - |
| 42401617739 | `d20131c7c` | pull_request | 1 | success | PASS | hit | 2026-11-07T18:31:44Z | 2026-11-07T18:31:56Z | 2026-11-07T18:33:19Z | 83s | n/a | cond 2 | - |
| 42401718131 | `fbf726980` | pull_request | 1 | success | PASS | hit | 2026-11-07T18:33:12Z | 2026-11-07T18:33:14Z | 2026-11-07T18:34:36Z | 82s | n/a | cond 2 | - |
| 42401770233 | `2cdd30104` | workflow_dispatch | 1 | failure | FAIL | hit | 2026-11-07T18:33:08Z | 2026-11-07T18:33:09Z | 2026-11-07T18:34:33Z | 84s | n/a | no (dispatched) | - |
| 42402006748 | `2db956698` | workflow_dispatch | 1 | failure | FAIL | hit | 2026-11-07T18:36:26Z | 2026-11-07T18:36:28Z | 2026-11-07T18:38:02Z | 94s | n/a | no (dispatched) | - |
| 42402345774 | `82e4dc588` | workflow_dispatch | 1 | failure | FAIL | hit | 2026-11-07T18:40:25Z | 2026-11-07T18:40:27Z | 2026-11-07T18:42:07Z | 100s | n/a | no (dispatched) | - |
| 42402481018 | `629e51d0f` | pull_request | 1 | success | PASS | hit | 2026-11-07T18:41:51Z | 2026-11-07T18:41:53Z | 2026-11-07T18:42:55Z | 62s | n/a | cond 2 | - |
| 42402979941 | `3b8819d24` | pull_request | 1 | success | PASS | hit | 2026-11-07T18:48:25Z | 2026-11-07T18:48:28Z | 2026-11-07T18:50:00Z | 92s | n/a | cond 2 | - |
| 42403058832 | `24f66dbaa` | workflow_dispatch | 1 | failure | FAIL | miss | 2026-11-07T18:49:06Z | 2026-11-07T18:49:08Z | 2026-11-07T18:51:17Z | 129s | n/a | no (dispatched) | - |
| 42403410288 | `e61c0ee2a` | workflow_dispatch | 1 | success | PASS | hit | 2026-11-07T18:53:39Z | 2026-11-07T18:53:41Z | 2026-11-07T18:55:04Z | 83s | n/a | no (dispatched) | - |
| 42403640009 | `42a96ded6` | pull_request | 1 | success | PASS | miss | 2026-11-07T18:56:29Z | 2026-11-07T18:56:31Z | 2026-11-07T18:58:20Z | 109s | n/a | cond 2, cond 3 | - |
| 42404320488 | `618397a27` | pull_request | 1 | success | PASS | miss | 2026-11-07T19:04:39Z | 2026-11-07T19:04:41Z | 2026-11-07T19:06:52Z | 131s | n/a | cond 2, cond 3 | - |
| 42404859181 | `25510dbfe` | pull_request | 1 | success | PASS | miss | 2026-11-07T19:10:48Z | 2026-11-07T19:10:50Z | 2026-11-07T19:13:08Z | 138s | n/a | cond 2, cond 3 | - |
| 42405389508 | `120220e96` | pull_request | 1 | success | PASS | miss | 2026-11-07T19:17:33Z | 2026-11-07T19:17:36Z | 2026-11-07T19:20:05Z | 149s | n/a | cond 2, cond 3 | - |
| 42405431176 | `739f8e833` | pull_request | 1 | success | PASS | miss | 2026-11-07T19:17:56Z | 2026-11-07T19:17:58Z | 2026-11-07T19:19:40Z | 102s | n/a | cond 2, cond 3 | - |
| 42405937743 | `fa0500cca` | pull_request | 1 | success | PASS | hit | 2026-11-07T19:23:55Z | 2026-11-07T19:23:57Z | 2026-11-07T19:25:19Z | 82s | n/a | cond 2 | - |
| 42407092478 | `4d19b33b9` | pull_request | 1 | success | PASS | miss | 2026-11-07T19:38:37Z | 2026-11-07T19:38:39Z | 2026-11-07T19:40:56Z | 137s | n/a | cond 2, cond 3 | - |
| 42408574036 | `d56c45d4b` | pull_request | 1 | success | PASS | miss | 2026-11-07T19:57:23Z | 2026-11-07T19:57:25Z | 2026-11-07T19:59:49Z | 144s | n/a | cond 2, cond 3 | - |

## harness-ios-tokens

- Runs recorded: 86 (54 pull-request, 32 dispatched).
- Infra runs (`harness-infra`): 0 of 86 recorded, infra rate 0.0%.
- **Condition 2** (10 consecutive pull-request runs, no break): current streak 54 of 10 — met.
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
| 42384684480 | `cba101c76` | pull_request | 1 | success | PASS | - | 2026-11-07T15:07:05Z | 2026-11-07T15:07:29Z | 2026-11-07T15:08:15Z | 46s | 24s | cond 2 | - |
| 42384737593 | `cba101c76` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T15:07:28Z | 2026-11-07T15:07:39Z | 2026-11-07T15:08:29Z | 50s | 11s | no (dispatched) | - |
| 42385313762 | `b99105b0d` | pull_request | 1 | success | PASS | - | 2026-11-07T15:14:40Z | 2026-11-07T15:14:43Z | 2026-11-07T15:15:37Z | 54s | 3s | cond 2 | - |
| 42386475858 | `00d7e5fb2` | pull_request | 1 | success | PASS | - | 2026-11-07T15:28:59Z | 2026-11-07T15:29:01Z | 2026-11-07T15:30:17Z | 76s | 2s | cond 2 | - |
| 42387838286 | `8352ba070` | pull_request | 1 | success | PASS | - | 2026-11-07T15:45:29Z | 2026-11-07T15:45:31Z | 2026-11-07T15:46:58Z | 87s | 2s | cond 2 | - |
| 42387862023 | `a8967663e` | workflow_dispatch | 1 | failure | FAIL | - | 2026-11-07T15:46:12Z | 2026-11-07T15:46:14Z | 2026-11-07T15:47:45Z | 91s | 2s | no (dispatched) | - |
| 42388323035 | `25fb4b7ac` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T15:51:33Z | 2026-11-07T15:51:36Z | 2026-11-07T15:52:57Z | 81s | 3s | no (dispatched) | - |
| 42388889208 | `457b2d39b` | pull_request | 1 | success | PASS | - | 2026-11-07T15:59:16Z | 2026-11-07T15:59:19Z | 2026-11-07T16:00:41Z | 82s | 3s | cond 2 | - |
| 42389019355 | `d9bb5404b` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T16:00:53Z | 2026-11-07T16:00:56Z | 2026-11-07T16:02:26Z | 90s | 3s | no (dispatched) | - |
| 42389454168 | `73bb2ef10` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T16:06:02Z | 2026-11-07T16:06:04Z | 2026-11-07T16:06:52Z | 48s | 2s | no (dispatched) | - |
| 42389599671 | `ce1980df5` | pull_request | 1 | success | PASS | - | 2026-11-07T16:07:52Z | 2026-11-07T16:07:54Z | 2026-11-07T16:09:18Z | 84s | 2s | cond 2 | - |
| 42389735450 | `cfab56c39` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T16:09:12Z | 2026-11-07T16:09:15Z | 2026-11-07T16:10:06Z | 51s | 3s | no (dispatched) | - |
| 42390328278 | `adc1c3a29` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T16:16:08Z | 2026-11-07T16:16:10Z | 2026-11-07T16:17:21Z | 71s | 2s | no (dispatched) | - |
| 42390455743 | `6f197eba2` | pull_request | 1 | success | PASS | - | 2026-11-07T16:17:42Z | 2026-11-07T16:17:44Z | 2026-11-07T16:19:17Z | 93s | 2s | cond 2 | - |
| 42391328951 | `1d9adda10` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T16:28:20Z | 2026-11-07T16:28:23Z | 2026-11-07T16:29:24Z | 61s | 3s | no (dispatched) | - |
| 42391754214 | `40eab6d86` | pull_request | 1 | success | PASS | - | 2026-11-07T16:33:28Z | 2026-11-07T16:33:31Z | 2026-11-07T16:34:41Z | 70s | 3s | cond 2 | - |
| 42392166707 | `bc837533f` | pull_request | 1 | success | PASS | - | 2026-11-07T16:38:01Z | 2026-11-07T16:38:10Z | 2026-11-07T16:39:16Z | 66s | 9s | cond 2 | - |
| 42392201744 | `2351e4b48` | pull_request | 1 | success | PASS | - | 2026-11-07T16:38:32Z | 2026-11-07T16:38:50Z | 2026-11-07T16:39:50Z | 60s | 18s | cond 2 | - |
| 42392857681 | `d21ed6e50` | pull_request | 1 | success | PASS | - | 2026-11-07T16:46:09Z | 2026-11-07T16:46:11Z | 2026-11-07T16:47:14Z | 63s | 2s | cond 2 | - |
| 42394329704 | `324bd5ce4` | pull_request | 1 | success | PASS | - | 2026-11-07T17:04:00Z | 2026-11-07T17:04:03Z | 2026-11-07T17:05:24Z | 81s | 3s | cond 2 | - |
| 42397500848 | `700673328` | pull_request | 1 | success | PASS | - | 2026-11-07T17:42:14Z | 2026-11-07T17:42:16Z | 2026-11-07T17:43:27Z | 71s | 2s | cond 2 | - |
| 42397732103 | `bf0e8c844` | pull_request | 1 | success | PASS | - | 2026-11-07T17:45:13Z | 2026-11-07T17:45:15Z | 2026-11-07T17:46:26Z | 71s | 2s | cond 2 | - |
| 42398276941 | `1af76c2dd` | pull_request | 1 | success | PASS | - | 2026-11-07T17:51:49Z | 2026-11-07T17:51:51Z | 2026-11-07T17:52:29Z | 38s | 2s | cond 2 | - |
| 42398418712 | `b016a237d` | pull_request | 1 | success | PASS | - | 2026-11-07T17:53:40Z | 2026-11-07T17:54:09Z | 2026-11-07T17:55:51Z | 102s | 29s | cond 2 | - |
| 42398497602 | `d013eeb35` | pull_request | 1 | success | PASS | - | 2026-11-07T17:54:35Z | 2026-11-07T17:54:48Z | 2026-11-07T17:55:45Z | 57s | 13s | cond 2 | - |
| 42398575771 | `bac739b33` | pull_request | 1 | success | PASS | - | 2026-11-07T17:55:44Z | 2026-11-07T17:56:44Z | 2026-11-07T17:58:00Z | 76s | 60s | cond 2 | - |
| 42398691473 | `5adccca8f` | pull_request | 1 | success | PASS | - | 2026-11-07T17:57:04Z | 2026-11-07T17:57:17Z | 2026-11-07T17:58:11Z | 54s | 13s | cond 2 | - |
| 42399019149 | `6222822db` | pull_request | 1 | success | PASS | - | 2026-11-07T18:01:07Z | 2026-11-07T18:01:27Z | 2026-11-07T18:02:27Z | 60s | 20s | cond 2 | - |
| 42399106899 | `5a21d429b` | pull_request | 1 | success | PASS | - | 2026-11-07T18:02:11Z | 2026-11-07T18:02:30Z | 2026-11-07T18:03:17Z | 47s | 19s | cond 2 | - |
| 42399228729 | `5acbf1d79` | pull_request | 1 | success | PASS | - | 2026-11-07T18:04:06Z | 2026-11-07T18:04:34Z | 2026-11-07T18:05:51Z | 77s | 28s | cond 2 | - |
| 42399329594 | `f3123d87f` | pull_request | 1 | success | PASS | - | 2026-11-07T18:04:32Z | 2026-11-07T18:05:29Z | 2026-11-07T18:06:12Z | 43s | 57s | cond 2 | - |
| 42400147257 | `6992a8195` | pull_request | 1 | success | PASS | - | 2026-11-07T18:13:54Z | 2026-11-07T18:13:57Z | 2026-11-07T18:15:06Z | 69s | 3s | cond 2 | - |
| 42400542508 | `f53d6057d` | pull_request | 1 | success | PASS | - | 2026-11-07T18:18:49Z | 2026-11-07T18:18:51Z | 2026-11-07T18:19:46Z | 55s | 2s | cond 2 | - |
| 42400709719 | `37db5e158` | pull_request | 1 | success | PASS | - | 2026-11-07T18:20:46Z | 2026-11-07T18:21:04Z | 2026-11-07T18:22:05Z | 61s | 18s | cond 2 | - |
| 42400738557 | `c5de2e547` | pull_request | 1 | success | PASS | - | 2026-11-07T18:21:16Z | 2026-11-07T18:21:34Z | 2026-11-07T18:22:42Z | 68s | 18s | cond 2 | - |
| 42400789833 | `b2f329e99` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T18:22:00Z | 2026-11-07T18:22:36Z | 2026-11-07T18:24:15Z | 99s | 36s | no (dispatched) | - |
| 42400890476 | `98fcc7693` | pull_request | 1 | success | PASS | - | 2026-11-07T18:23:12Z | 2026-11-07T18:23:46Z | 2026-11-07T18:25:02Z | 76s | 34s | cond 2 | - |
| 42401470664 | `ded1dc74a` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T18:29:47Z | 2026-11-07T18:29:49Z | 2026-11-07T18:31:00Z | 71s | 2s | no (dispatched) | - |
| 42401617739 | `d20131c7c` | pull_request | 1 | success | PASS | - | 2026-11-07T18:31:44Z | 2026-11-07T18:31:47Z | 2026-11-07T18:32:59Z | 72s | 3s | cond 2 | - |
| 42401718131 | `fbf726980` | pull_request | 1 | success | PASS | - | 2026-11-07T18:33:12Z | 2026-11-07T18:33:14Z | 2026-11-07T18:34:16Z | 62s | 2s | cond 2 | - |
| 42401770233 | `2cdd30104` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T18:33:08Z | 2026-11-07T18:33:10Z | 2026-11-07T18:34:11Z | 61s | 2s | no (dispatched) | - |
| 42402006748 | `2db956698` | workflow_dispatch | 1 | failure | FAIL | - | 2026-11-07T18:36:27Z | 2026-11-07T18:36:29Z | 2026-11-07T18:37:41Z | 72s | 2s | no (dispatched) | - |
| 42402345774 | `82e4dc588` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T18:40:25Z | 2026-11-07T18:40:27Z | 2026-11-07T18:41:24Z | 57s | 2s | no (dispatched) | - |
| 42402481018 | `629e51d0f` | pull_request | 1 | success | PASS | - | 2026-11-07T18:41:51Z | 2026-11-07T18:41:54Z | 2026-11-07T18:42:55Z | 61s | 3s | cond 2 | - |
| 42402979941 | `3b8819d24` | pull_request | 1 | success | PASS | - | 2026-11-07T18:48:25Z | 2026-11-07T18:48:28Z | 2026-11-07T18:49:31Z | 63s | 3s | cond 2 | - |
| 42403058832 | `24f66dbaa` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T18:49:06Z | 2026-11-07T18:49:13Z | 2026-11-07T18:50:52Z | 99s | 7s | no (dispatched) | - |
| 42403410288 | `e61c0ee2a` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T18:53:39Z | 2026-11-07T18:53:42Z | 2026-11-07T18:54:46Z | 64s | 3s | no (dispatched) | - |
| 42403640009 | `42a96ded6` | pull_request | 1 | success | PASS | - | 2026-11-07T18:56:29Z | 2026-11-07T18:56:32Z | 2026-11-07T18:57:41Z | 69s | 3s | cond 2 | - |
| 42404320488 | `618397a27` | pull_request | 1 | success | PASS | - | 2026-11-07T19:04:39Z | 2026-11-07T19:04:42Z | 2026-11-07T19:06:00Z | 78s | 3s | cond 2 | - |
| 42404859181 | `25510dbfe` | pull_request | 1 | success | PASS | - | 2026-11-07T19:10:48Z | 2026-11-07T19:10:52Z | 2026-11-07T19:12:36Z | 104s | 4s | cond 2 | - |
| 42405389508 | `120220e96` | pull_request | 1 | success | PASS | - | 2026-11-07T19:17:33Z | 2026-11-07T19:17:36Z | 2026-11-07T19:19:09Z | 93s | 3s | cond 2 | - |
| 42405431176 | `739f8e833` | pull_request | 1 | success | PASS | - | 2026-11-07T19:17:56Z | 2026-11-07T19:17:59Z | 2026-11-07T19:19:09Z | 70s | 3s | cond 2 | - |
| 42405937743 | `fa0500cca` | pull_request | 1 | success | PASS | - | 2026-11-07T19:23:55Z | 2026-11-07T19:23:58Z | 2026-11-07T19:25:45Z | 107s | 3s | cond 2 | - |
| 42407092478 | `4d19b33b9` | pull_request | 1 | success | PASS | - | 2026-11-07T19:38:37Z | 2026-11-07T19:38:39Z | 2026-11-07T19:39:57Z | 78s | 2s | cond 2 | - |
| 42408574036 | `d56c45d4b` | pull_request | 1 | success | PASS | - | 2026-11-07T19:57:23Z | 2026-11-07T19:57:26Z | 2026-11-07T19:58:45Z | 79s | 3s | cond 2 | - |

## harness-ios-components

- Runs recorded: 86 (54 pull-request, 32 dispatched).
- Infra runs (`harness-infra`): 0 of 86 recorded, infra rate 0.0%.
- **Condition 2** (10 consecutive pull-request runs, no break): current streak 54 of 10 — met.
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
| 42384684480 | `cba101c76` | pull_request | 1 | success | PASS | - | 2026-11-07T15:07:05Z | 2026-11-07T15:07:29Z | 2026-11-07T15:08:35Z | 66s | 24s | cond 2 | - |
| 42384737593 | `cba101c76` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T15:07:28Z | 2026-11-07T15:07:42Z | 2026-11-07T15:08:35Z | 53s | 14s | no (dispatched) | - |
| 42385313762 | `b99105b0d` | pull_request | 1 | success | PASS | - | 2026-11-07T15:14:40Z | 2026-11-07T15:14:43Z | 2026-11-07T15:15:50Z | 67s | 3s | cond 2 | - |
| 42386475858 | `00d7e5fb2` | pull_request | 1 | success | PASS | - | 2026-11-07T15:28:59Z | 2026-11-07T15:29:01Z | 2026-11-07T15:30:34Z | 93s | 2s | cond 2 | - |
| 42387838286 | `8352ba070` | pull_request | 1 | success | PASS | - | 2026-11-07T15:45:29Z | 2026-11-07T15:45:32Z | 2026-11-07T15:46:54Z | 82s | 3s | cond 2 | - |
| 42387862023 | `a8967663e` | workflow_dispatch | 1 | failure | FAIL | - | 2026-11-07T15:46:12Z | 2026-11-07T15:46:15Z | 2026-11-07T15:48:50Z | 155s | 3s | no (dispatched) | - |
| 42388323035 | `25fb4b7ac` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T15:51:33Z | 2026-11-07T15:51:36Z | 2026-11-07T15:53:31Z | 115s | 3s | no (dispatched) | - |
| 42388889208 | `457b2d39b` | pull_request | 1 | success | PASS | - | 2026-11-07T15:59:16Z | 2026-11-07T15:59:19Z | 2026-11-07T16:01:19Z | 120s | 3s | cond 2 | - |
| 42389019355 | `d9bb5404b` | workflow_dispatch | 1 | failure | FAIL | - | 2026-11-07T16:00:54Z | 2026-11-07T16:00:56Z | 2026-11-07T16:02:34Z | 98s | 2s | no (dispatched) | - |
| 42389454168 | `73bb2ef10` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T16:06:02Z | 2026-11-07T16:06:05Z | 2026-11-07T16:07:22Z | 77s | 3s | no (dispatched) | - |
| 42389599671 | `ce1980df5` | pull_request | 1 | success | PASS | - | 2026-11-07T16:07:52Z | 2026-11-07T16:07:54Z | 2026-11-07T16:09:15Z | 81s | 2s | cond 2 | - |
| 42389735450 | `cfab56c39` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T16:09:12Z | 2026-11-07T16:09:14Z | 2026-11-07T16:10:34Z | 80s | 2s | no (dispatched) | - |
| 42390328278 | `adc1c3a29` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T16:16:08Z | 2026-11-07T16:16:10Z | 2026-11-07T16:17:27Z | 77s | 2s | no (dispatched) | - |
| 42390455743 | `6f197eba2` | pull_request | 1 | success | PASS | - | 2026-11-07T16:17:42Z | 2026-11-07T16:17:45Z | 2026-11-07T16:19:50Z | 125s | 3s | cond 2 | - |
| 42391328951 | `1d9adda10` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T16:28:20Z | 2026-11-07T16:28:22Z | 2026-11-07T16:29:19Z | 57s | 2s | no (dispatched) | - |
| 42391754214 | `40eab6d86` | pull_request | 1 | success | PASS | - | 2026-11-07T16:33:28Z | 2026-11-07T16:33:31Z | 2026-11-07T16:34:54Z | 83s | 3s | cond 2 | - |
| 42392166707 | `bc837533f` | pull_request | 1 | success | PASS | - | 2026-11-07T16:38:01Z | 2026-11-07T16:38:12Z | 2026-11-07T16:39:10Z | 58s | 11s | cond 2 | - |
| 42392201744 | `2351e4b48` | pull_request | 1 | success | PASS | - | 2026-11-07T16:38:32Z | 2026-11-07T16:38:34Z | 2026-11-07T16:39:45Z | 71s | 2s | cond 2 | - |
| 42392857681 | `d21ed6e50` | pull_request | 1 | success | PASS | - | 2026-11-07T16:46:09Z | 2026-11-07T16:46:12Z | 2026-11-07T16:47:51Z | 99s | 3s | cond 2 | - |
| 42394329704 | `324bd5ce4` | pull_request | 1 | success | PASS | - | 2026-11-07T17:04:00Z | 2026-11-07T17:04:03Z | 2026-11-07T17:05:35Z | 92s | 3s | cond 2 | - |
| 42397500848 | `700673328` | pull_request | 1 | success | PASS | - | 2026-11-07T17:42:14Z | 2026-11-07T17:42:17Z | 2026-11-07T17:43:35Z | 78s | 3s | cond 2 | - |
| 42397732103 | `bf0e8c844` | pull_request | 1 | success | PASS | - | 2026-11-07T17:45:13Z | 2026-11-07T17:45:14Z | 2026-11-07T17:46:47Z | 93s | 1s | cond 2 | - |
| 42398276941 | `1af76c2dd` | pull_request | 1 | success | PASS | - | 2026-11-07T17:51:49Z | 2026-11-07T17:51:51Z | 2026-11-07T17:53:15Z | 84s | 2s | cond 2 | - |
| 42398418712 | `b016a237d` | pull_request | 1 | success | PASS | - | 2026-11-07T17:53:40Z | 2026-11-07T17:53:48Z | 2026-11-07T17:54:58Z | 70s | 8s | cond 2 | - |
| 42398497602 | `d013eeb35` | pull_request | 1 | success | PASS | - | 2026-11-07T17:54:35Z | 2026-11-07T17:55:50Z | 2026-11-07T17:57:19Z | 89s | 75s | cond 2 | - |
| 42398575771 | `bac739b33` | pull_request | 1 | success | PASS | - | 2026-11-07T17:55:44Z | 2026-11-07T17:56:26Z | 2026-11-07T17:57:19Z | 53s | 42s | cond 2 | - |
| 42398691473 | `5adccca8f` | pull_request | 1 | success | PASS | - | 2026-11-07T17:57:03Z | 2026-11-07T17:57:13Z | 2026-11-07T17:58:43Z | 90s | 10s | cond 2 | - |
| 42399019149 | `6222822db` | pull_request | 1 | success | PASS | - | 2026-11-07T18:01:07Z | 2026-11-07T18:01:17Z | 2026-11-07T18:02:32Z | 75s | 10s | cond 2 | - |
| 42399106899 | `5a21d429b` | pull_request | 1 | success | PASS | - | 2026-11-07T18:02:11Z | 2026-11-07T18:02:16Z | 2026-11-07T18:03:33Z | 77s | 5s | cond 2 | - |
| 42399228729 | `5acbf1d79` | pull_request | 1 | success | PASS | - | 2026-11-07T18:04:06Z | 2026-11-07T18:04:30Z | 2026-11-07T18:05:28Z | 58s | 24s | cond 2 | - |
| 42399329594 | `f3123d87f` | pull_request | 1 | success | PASS | - | 2026-11-07T18:04:32Z | 2026-11-07T18:04:51Z | 2026-11-07T18:06:07Z | 76s | 19s | cond 2 | - |
| 42400147257 | `6992a8195` | pull_request | 1 | success | PASS | - | 2026-11-07T18:13:54Z | 2026-11-07T18:13:57Z | 2026-11-07T18:15:53Z | 116s | 3s | cond 2 | - |
| 42400542508 | `f53d6057d` | pull_request | 1 | success | PASS | - | 2026-11-07T18:18:49Z | 2026-11-07T18:18:52Z | 2026-11-07T18:20:49Z | 117s | 3s | cond 2 | - |
| 42400709719 | `37db5e158` | pull_request | 1 | success | PASS | - | 2026-11-07T18:20:46Z | 2026-11-07T18:21:28Z | 2026-11-07T18:22:47Z | 79s | 42s | cond 2 | - |
| 42400738557 | `c5de2e547` | pull_request | 1 | success | PASS | - | 2026-11-07T18:21:16Z | 2026-11-07T18:21:20Z | 2026-11-07T18:22:39Z | 79s | 4s | cond 2 | - |
| 42400789833 | `b2f329e99` | workflow_dispatch | 1 | failure | FAIL | - | 2026-11-07T18:22:00Z | 2026-11-07T18:22:50Z | 2026-11-07T18:24:19Z | 89s | 50s | no (dispatched) | - |
| 42400890476 | `98fcc7693` | pull_request | 1 | success | PASS | - | 2026-11-07T18:23:12Z | 2026-11-07T18:23:40Z | 2026-11-07T18:25:36Z | 116s | 28s | cond 2 | - |
| 42401470664 | `ded1dc74a` | workflow_dispatch | 1 | failure | FAIL | - | 2026-11-07T18:29:47Z | 2026-11-07T18:29:49Z | 2026-11-07T18:30:54Z | 65s | 2s | no (dispatched) | - |
| 42401617739 | `d20131c7c` | pull_request | 1 | success | PASS | - | 2026-11-07T18:31:44Z | 2026-11-07T18:32:01Z | 2026-11-07T18:34:08Z | 127s | 17s | cond 2 | - |
| 42401718131 | `fbf726980` | pull_request | 1 | success | PASS | - | 2026-11-07T18:33:12Z | 2026-11-07T18:33:14Z | 2026-11-07T18:34:43Z | 89s | 2s | cond 2 | - |
| 42401770233 | `2cdd30104` | workflow_dispatch | 1 | failure | FAIL | - | 2026-11-07T18:33:08Z | 2026-11-07T18:33:09Z | 2026-11-07T18:33:53Z | 44s | 1s | no (dispatched) | - |
| 42402006748 | `2db956698` | workflow_dispatch | 1 | failure | FAIL | - | 2026-11-07T18:36:26Z | 2026-11-07T18:36:29Z | 2026-11-07T18:37:33Z | 64s | 3s | no (dispatched) | - |
| 42402345774 | `82e4dc588` | workflow_dispatch | 1 | failure | FAIL | - | 2026-11-07T18:40:25Z | 2026-11-07T18:40:27Z | 2026-11-07T18:41:39Z | 72s | 2s | no (dispatched) | - |
| 42402481018 | `629e51d0f` | pull_request | 1 | success | PASS | - | 2026-11-07T18:41:51Z | 2026-11-07T18:41:53Z | 2026-11-07T18:42:46Z | 53s | 2s | cond 2 | - |
| 42402979941 | `3b8819d24` | pull_request | 1 | success | PASS | - | 2026-11-07T18:48:25Z | 2026-11-07T18:48:27Z | 2026-11-07T18:49:53Z | 86s | 2s | cond 2 | - |
| 42403058832 | `24f66dbaa` | workflow_dispatch | 1 | failure | FAIL | - | 2026-11-07T18:49:06Z | 2026-11-07T18:49:08Z | 2026-11-07T18:50:20Z | 72s | 2s | no (dispatched) | - |
| 42403410288 | `e61c0ee2a` | workflow_dispatch | 1 | success | PASS | - | 2026-11-07T18:53:39Z | 2026-11-07T18:53:42Z | 2026-11-07T18:54:30Z | 48s | 3s | no (dispatched) | - |
| 42403640009 | `42a96ded6` | pull_request | 1 | success | PASS | - | 2026-11-07T18:56:29Z | 2026-11-07T18:56:31Z | 2026-11-07T18:58:00Z | 89s | 2s | cond 2 | - |
| 42404320488 | `618397a27` | pull_request | 1 | success | PASS | - | 2026-11-07T19:04:39Z | 2026-11-07T19:04:42Z | 2026-11-07T19:06:01Z | 79s | 3s | cond 2 | - |
| 42404859181 | `25510dbfe` | pull_request | 1 | success | PASS | - | 2026-11-07T19:10:49Z | 2026-11-07T19:10:51Z | 2026-11-07T19:13:21Z | 150s | 2s | cond 2 | - |
| 42405389508 | `120220e96` | pull_request | 1 | success | PASS | - | 2026-11-07T19:17:33Z | 2026-11-07T19:17:36Z | 2026-11-07T19:19:08Z | 92s | 3s | cond 2 | - |
| 42405431176 | `739f8e833` | pull_request | 1 | success | PASS | - | 2026-11-07T19:17:56Z | 2026-11-07T19:17:59Z | 2026-11-07T19:19:07Z | 68s | 3s | cond 2 | - |
| 42405937743 | `fa0500cca` | pull_request | 1 | success | PASS | - | 2026-11-07T19:23:55Z | 2026-11-07T19:23:57Z | 2026-11-07T19:25:15Z | 78s | 2s | cond 2 | - |
| 42407092478 | `4d19b33b9` | pull_request | 1 | success | PASS | - | 2026-11-07T19:38:37Z | 2026-11-07T19:38:40Z | 2026-11-07T19:40:25Z | 105s | 3s | cond 2 | - |
| 42408574036 | `d56c45d4b` | pull_request | 1 | success | PASS | - | 2026-11-07T19:57:23Z | 2026-11-07T19:57:25Z | 2026-11-07T19:58:38Z | 73s | 2s | cond 2 | - |

