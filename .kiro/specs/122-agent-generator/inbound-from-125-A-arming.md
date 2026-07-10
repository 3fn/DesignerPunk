# Inbound: 125-A COMPLETE — the gate is ARMED and OPEN for your registrants

**Date**: 2026-07-10
**Source**: 125-A Task 9 closeout (the formal handback named in 125-A tasks.md)
**Status**: The Phase 1a arming is DONE — this note carries the facts 122's check-registration work (Task 7 / C9) consumes.

---

## 1. The gate you register onto (current state, all platform-verified)

- **Seven required contexts on `main`**: `Consumer Guard` · `Check package name drift` · `lane-typecheck` · `lane-build-validate` · `lane-functional-root` · `lane-mcp-server-suite` · `lane-application-mcp-server-suite`. `strict: false` (accepted livability call, bake-in finding 4).
- The open-set contract held exactly as designed: registering the five lanes required only named contexts + protection-list entries — **no gate redesign**. Your ten contexts (`122-diff-guard`, `122-canonical-vs-truth`, `122-sweep-1…8`) register the same way.
- Every lane carries a **did-it-really-run guard** (selection floors with printed resolved-selection evidence; execution assertion on build-validate) — the pattern is in `.github/workflows/lane-timing.yml` and is prior art for your C9 workflow's no-op-lock jobs.
- **Gate-bites proven per lane at the platform level**: PRs #46–#50, each target lane FAILURE + `mergeStateStatus: BLOCKED` (record: 125-A `completion/task-8-completion.md`).

## 2. Latency headroom budget (Req 6.3 measurements, 2026-07-10)

- Worst cold-cache lane: `lane-functional-root` **234 s** (incl. full build) — **39% of the ~10-min ceiling**; every other lane ≤ 40 s cold. Felt latency (head-push → all-green): ~3.5 min steady / ~4 min cold.
- **Your headroom: ~6 minutes of cold wall-clock** before the ceiling binds. Your C6 no-op lock (input+output hash early-exit) should keep your ten contexts to seconds on unrelated PRs — the budget exists for the full-run case.
- Cold ≈ steady within noise (compute-dominated lanes) — no cold-start cliff to design around.

## 3. ACTION for 122: fold the five lane names into `verify-gate-registration.sh`

Per the ratified 125-A Tasks 6–9 round (STACY R1 item 5): Task 8's set-assertion was a one-time `gh api` read; **standing coverage is yours**. When Task 7.3 builds `verify-gate-registration.sh`, its count-asserted expected set SHALL include the five lane contexts (plus `Consumer Guard` + `Check package name drift`) alongside your ten — so the monthly health check catches ANY required context silently falling off the list, not only 122's.

## 4. Tool-boot smoke: your manifest exists; 125 arms it later

`canonical/registry/tool-registry.json` (your Task 4) is the boot manifest — declared-and-responds, never returns-data. It reaches `main` at U1's merge; the smoke check itself is a 125-B candidate (seeded in `../125-mechanical-enforcement-strategy/inbound-to-125-B-from-125-A.md`).

## 5. What this changes for U1

Your substrate mega-PR (Tasks 1–8, `task/122-substrate`) now merges through the armed gate: full typecheck, build-validate, root suite, both sub-package suites — all required. **Rebase note**: the branch predates the lane workflow + guards; rebase/merge `main` in before U1's PR opens so its checks run the current lanes.
