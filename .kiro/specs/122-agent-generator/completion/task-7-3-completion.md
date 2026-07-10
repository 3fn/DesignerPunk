# Task 7.3 Completion: All ten check contexts registered on the 125-A Phase 0 gate

**Date**: 2026-07-10
**Task**: 7.3 Register all ten check contexts on the 125-A Phase 0 gate (Implementation, Tier 2)
**Agent (planned)**: Thurgood — **executed by the main loop (Fable 5)**; same delta rationale as 7.1/7.2
**Spec**: 122-agent-generator
**Branch**: task/122-substrate

---

## What was built

1. **`.github/workflows/agent-generator.yml`** — one workflow, `on: pull_request`, **NO path
   filter** (decided law: 125-A Req 2.3 / Req 20 AC1). One job per check → one named status
   context via a matrix (`name: ${{ matrix.context }}` — check-run names are exactly the ten
   context strings). Shared setup job (`122-setup`, NOT registered): checkout + node 22 +
   npm cache + `npm ci`, runs the no-op probe, and on a full run builds `dist/mcp` ONCE and
   uploads it as an artifact consumed by the four MCP-booting jobs (diff-guard,
   canonical-vs-truth, sweep-1, sweep-6).
2. **The C6 no-op lock wiring** (Req 20 AC2): `tools/agent-generator/sweeps/noop-probe.ts`
   compares the DD7 input-closure hash + guarded-surface output hash against
   `canonical/generated.lock`, printing BOTH hash pairs to the job log (did-it-really-run
   evidence — the early-exit decision is auditable, not asserted) and `noop=` to
   `$GITHUB_OUTPUT`. Check jobs use **step-level** `if:` so a no-op PR still REPORTS a
   genuine success context (never a skipped job) in seconds.
3. **Branch-protection registration** (open-set contract): the ten contexts PATCHed onto
   `main`'s required-status-checks via the API (`strict: false` preserved — the 125-A
   livability call). Platform-verified result: **17 required contexts**.
4. **`tools/agent-generator/verify-gate-registration.sh`** (executable): queries the
   protection API and asserts the expected context set BOTH directions (expected-missing
   AND unexpected-present both FAIL) + **count-asserted (N=17 recorded in the script)**.
   Run at each cutover + the monthly governance health check. macOS-bash-3.2-safe (no
   mapfile). Sweep 5's row carries the pre-cutover-window note: its removal after the last
   cutover updates the script's expected set + count IN the same recorded protection change.

## Verification (platform-level)

- PATCH response + follow-up GET: 17 contexts, exact expected set, `strict: false`.
- `./tools/agent-generator/verify-gate-registration.sh` → **PASS: all 17 required contexts
  present, count-asserted** (exit 0).
- `canonical/generated.lock` refreshed via a green full diff-guard run
  (`full-run-green (input-closure-changed)` — this task's canonical edits legitimately moved
  the closure); noop-probe then reports `noop=true` with matching hash pairs — the committed
  lock keeps unrelated PRs' 122 jobs in the seconds-fast early-exit path.

## Two findings flagged for Peter

1. **Registration-before-merge window**: the ten contexts are REQUIRED on `main` now, but
   the workflow file exists only on `task/122-substrate` until U1 merges. U1's own PR runs
   all ten (pull_request workflows come from the PR's merge ref) — that is the designed
   proof. But any UNRELATED PR opened before U1 merges will show the ten contexts
   "Expected — waiting" and be **blocked**. Window = now → U1's merge (Task 8 is next; the
   window is short and Peter controls merge order). If an urgent unrelated PR must land
   first, the lever is temporarily unchecking the 122 contexts in Settings → Branches (a
   recorded protection change), not path-filtering.
2. **Repo-slug drift**: the live repo is `3fn/DesignerPunk`; several 125-A-era docs (and
   core-goals.md) say `3fn/DesignerPunkv2`, which the API now answers with 301 Moved
   Permanently. The script pins the live slug + follows redirects. The doc-side cleanup is
   out of this task's scope — flagged as a Civitas content-consistency item (Thurgood).

## CI-run URL note (C13 feed)

The ten contexts' first live CI runs (and the gate-bite evidence with `mergeStateStatus`)
become observable when U1's PR opens at Task 8 — C13 item 3 collects those URLs into the
closure bundle, per the Task 6 open item.

## Delegated-tier capture

Planned `Agent: Thurgood`; executed in the **main loop (Fable 5)** — live branch-protection
surgery on the armed gate warranted main-loop care (the `.env` token, the window call, the
slug discovery). Agent-evolution signal, not model-evolution.
