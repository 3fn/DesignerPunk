# Task 19 — Instruments block

**Written**: 2026-11-07 (UTC), before subtask 19.2 (unit branch `task/129-19-harness-infra`, cut from `refs/remotes/origin/main` @ `c73f41ede`, tasks amendment 7) · **PRIMARY**: Thurgood (Sonnet) · Data (Sonnet), 19.1
**Form**: Start Up Tasks item 8's execution-time block. **Sha convention**: `git log -1 --format=%h -- <path>` at `c73f41ede`; `74d7566f5` is U1's merge, the last touch of every harness file below.
**Criteria order**: Task 19's 12 criteria as merged, under "Success Criteria" of parent 19: C1 the Android resolve step and its marker · C2 the infra classifier and its five fixtures · C3 `infra.json` and the ordinary `resolve` check · C4 the workflow's save condition and the `harness-infra` annotation · C5 the workflow test's verdict-source and no-`if:` assertions · C6 the iOS class rule · C7 `stability.ts` and its five cases · C8 `harness-stability.md` re-run · C9 the in-lane guard entry and gate count · C10 `compare.ts` needs no new class · C11 all four contexts on the PR · C12 records whose Trigger names `task-19-completion.md`.

| # | Criterion (short ref) | Instrument | State | Fit (one line, `exists` rows) | Dependent subtasks |
|---|---|---|---|---|---|
| 1 | C1, C2, C3 the Android lane | `harness/android/lane.ts`, `scripts/harness/__tests__/probe-kotlin.test.ts` | exists (`harness/android/lane.ts` @ `74d7566f5`) as the file Data extends | runs one Gradle invocation today; has no resolve step, marker or classifier | 19.1 |
| 2 | C1 the resolve step | the Gradle resolve task (`resolveAll`-style over `:tokens`, `:probe`, `:dp` `debugCompileClasspath` and the build's plugins) | built here (19.1: Data) | — | 19.1, 19.2 |
| 3 | C2 the infra fixture | the log of job 128424053186 (run 42379456009, #711), cut into `scripts/harness/__tests__/fixtures/kotlin/` | built here (19.1: Data cuts it; the job log is retrievable with the `.env` token if the run's logs have not expired) | — | 19.1 |
| 4 | C2 the 429, 503, unknown-host, 404 and "Could not find" fixtures | fixtures under `scripts/harness/__tests__/fixtures/kotlin/` | built here (19.1: Data) | — | 19.1 |
| 5 | C3 `infra.json`, the ordinary `resolve` check | `lane.ts` and `probe-kotlin.test.ts` | built here (19.1: Data) | — | 19.1 |
| 6 | C3 the comparator failing an ordinary resolve as `check` | `scripts/harness/compare.ts`, `compare.test.ts › the run file's checks (class check) › fails the context for an ok:false check…` | exists (`scripts/harness/compare.ts` @ `74d7566f5`) | an `ok: false` entry fails class `check`, named in the verdict line | — |
| 7 | C4 the save condition and the annotation | `.github/workflows/native-harness.yml` | exists (@ `74d7566f5`) as the file 19.2 edits | the "Save the Gradle cache" step tests `harness-out/gradle.txt`; the annotation step writes `harness-verdict` only | 19.2 |
| 8 | C4, C5 the workflow test | `scripts/harness/__tests__/native-harness-workflow.test.ts`; `js-yaml` (a dependency) | built here (19.2) for the test; the red run is against the workflow at `c73f41ede` | — | 19.2 |
| 9 | C5 the grant limits | `.kiro/issues/` record carrying `**Grant paths**` for `.github/workflows/native-harness.yml` | exists (Task 19's "Grant limits" in `tasks.md`; activated by this unit's merge, `**ARMING**` line in the PR) | the limits name the two admitted edits | 19.2 |
| 10 | C6 the iOS class rule | `scripts/harness/__tests__/probe-swift.test.ts` @ `d19eb3958` ("fails as \"toolchain missing\" … with no run file"; L1036) | exists (`scripts/harness/__tests__/probe-swift.test.ts` @ `74d7566f5`; the cases exist at `d19eb3958` and are unchanged) | a missing toolchain writes no run file, so no `harness-verdict` | — |
| 11 | C7 the stability script and its five cases | `scripts/harness/stability.ts`, `scripts/harness/__tests__/stability.test.ts`, fixtures under `fixtures/stability/` | exists (@ `74d7566f5`) as the files 19.3 extends; the infra fixtures are built here (19.3) | reads `harness-verdict` and `cache` annotations today; has no infra concept | 19.3 |
| 12 | C8 the committed record | `evidence/harness-stability.md`, the GitHub runs/jobs/annotations APIs (the `.env` token) | built here (19.3, re-run at head H) | — | 19.3 |
| 13 | C9 the guard registry | `.github/in-lane-guards.json`, `scripts/__tests__/in-lane-guards.test.ts` | exists (`.github/in-lane-guards.json` @ `55276795e`; `in-lane-guards.test.ts` @ `e856dc530`) | the registry is additive-only under P1b; the test checks the entry count against the selected files | 19.2 |
| 14 | C9 the gate count | `tools/agent-generator/verify-gate-registration.sh` | exists (@ `8bd4bb505`) | counts `EXPECTED_CONTEXTS` (N=19) | — |
| 15 | C10 the existing comparator case | `compare.test.ts` at `d19eb3958` | exists (see row 6) | — | — |
| 16 | C11 all four contexts on the PR | the PR's four check runs at head H | MISSING → orchestrator: the PR opens at Task 19's completion; no PR exists when this block is written. Route: the follow-up commit cites them, as in U1 | none of 19.1 to 19.3 → resolved 2026-11-07: exists (PR #713's `native-harness` run https://github.com/3fn/DesignerPunk/actions/runs/42384684480 @ `cba101c76d8d18426a1a1322d8e9b6616875d659`), fit: the four contexts' check runs on the unit's PR, each with a `harness-verdict` annotation and a `harness-summary` line (pasted in `task-19-completion.md`, criterion 11). |
| 17 | C12 records whose Trigger names `task-19-completion.md` | `grep -l "task-19-completion" .kiro/issues/*.md` | none — a command run and pasted in the completion doc (no record names it at `c73f41ede`) | — | — |

**Counts**: listed **16**, plus **1** none row (row 17, not counted) = 17 rows. exists **10** (rows 1, 6, 7, 9, 10, 11, 13, 14, 15, 16 after its resolution) · built-here **6** (rows 2, 3, 4, 5, 8, 12) · missing **0**. N = E + B + M = 10 + 6 + 0 = 16.

**What the MISSING row stops**: nothing before Task 19's completion doc.

## Found later

_(none yet)_
