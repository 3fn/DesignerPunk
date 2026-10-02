# ARMING read: U2b's merge (#262), the barriers it carries onto `main`

**Event**: ARMING. This is the trigger-table row in `canonical/agents/stacy.md`: "a new barrier arms / the required-check set changes". It was placed at U2b's merge by `tasks.md` § "Declared Merge Units" (confirmed at feedback/tasks.md [STACY R3], with condition S3-3 on the read's composition).
**Merge**: PR #262, "U2b consumer generation profile: machinery, rendering & G2 (123)". Squash `669b51b0` on `main`, merged 2026-10-02T21:16:44Z by Peter. Branch range `refs/pull/262/head` = `e6f19748`.
**Reader**: Stacy · **Date**: 2026-10-02
**Status**: a post-acceptance audit. **Never a gate**: no pass, at any grain, is a required check, a review gate, or a blocking condition on any PR.
**Companion**: the MIDPOINT record at the same merge, `completion/claims-pass-midpoint.md`. Its findings are not repeated here.

---

## VERDICT: **PASSES. No findings.**

Every barrier U2b carries onto `main` ran on the merged PR's head and is mapped by the coverage-of-coverage read. The required-context count is unchanged, and `completion-criteria-parity` is live.

## Scope

**What arms on `main` at this merge:**
1. `operative-set-freshness` inside `122-diff-guard` (Task 13.6), over the new guarded surfaces `canonical/operative-sets/**` and `canonical/profiles/consumer/**`.
2. The `verify-signing-chain --ci` step inside `122-diff-guard`. It was armed on the unit branch at its fixing PR's merge, read at `completion/arming-signing-act-consistency.md` (`8f203d53`). It is live for every PR to `main` from this merge.
3. The relocation-integrity gate at 5 legs (A4/A7 retired, #255). Residuals R1–R3 were moved into the consumer lane (`09a7aecd`).
4. The standing register-rule ↔ `SCAN_DIRS` parity test (Task 17.4) under `test:scripts`.

**The reads**, composition per S3-3 and the trigger row: `audit:coverage-map` + `verify-gate-registration.sh` + `completion-criteria-parity` dormancy.

## S3-3, item by item

| Item | Reading | Run / read |
|---|---|---|
| (i) the rows for `canonical/operative-sets/**` and `canonical/profiles/consumer/**` list `122-diff-guard` | **84 of 84** rows under the two roots list `122-diff-guard` (`canonical/coverage-map.yaml` at `669b51b0`) | read |
| (ii) my independent re-run of 13.6 (iv): the grep returns 0, and the same paths are non-blank | `grep -n "operative-sets\|profiles/consumer" canonical/adjudications.yaml` → **0**. The F3 adjudicated-blank rows are gone and the paths are guarded. `audit:coverage-map` → `PASS (surfaces PASS · lanes PASS)`: total 496, guarded 495, blank 1, adjudicated-blank 1. The one is `canonical/generated.lock`, pre-existing and adjudicated | run (worktree at `669b51b0`) |
| (iii) the registration count is unchanged | `verify-gate-registration.sh` → `PASS: all 18 required contexts present, count-asserted (N=18 recorded in this script)`. No context was added: the freshness sweep and the signing step both ride `122-diff-guard` | run (token from the main checkout's `.env`, not printed) |
| (iv) parity is not dormant | `completion-criteria-parity` ran on #262 (job 111028307216): `parents evaluated 21, pass 21, fail 0; emissions 0; reds 0`. Re-run locally at `669b51b0`, with the same result | read (CI log) + run |
| (v) which `coverage-map.ts` ran | the one at `669b51b0`, last changed by B-CI PR-2 (#227, `7fa64c6d`; the lanes section). Its lanes read: "required contexts : 18 … -> 19 job run(s) in 6 workflow(s)" | run |

## The new barriers ran on the merged head (`e6f19748`, check runs read via `gh`)

| Barrier | Evidence |
|---|---|
| Freshness sweep + signing chain (`122-diff-guard`, success, job 111028464197) | `verify-signing-chain --ci`: `operative-set-freshness: PASS — 17 record(s), 373 unit(s), …`; `signing-chain: range 823806a2..e6f19748 — 271 commit(s); 206 committed before R 2da74864 excluded`; `4 row(s) checked across 2 signing commit(s)`; `PASS — consistency, not identity` |
| Relocation gate, 5 legs (`lane-mcp-server-suite`, success) | `PASS src/relocation-integrity-gate/__tests__/relocation-integrity-gate.test.ts` |
| R2 moved into the consumer lane (`Consumer Guard`, success) | `✓ the installed .kiro/steering/ holds exactly the eight identity docs; personal-note.md is absent; nothing ships under .kiro/agents/` |
| Parity test, 17.4 (`lane-functional-root`, success) | `PASS scripts/__tests__/package-name-scope-parity.test.ts`. Also run locally: 7/7 |

**All 21 check runs on `e6f19748` concluded `success`.** That includes the 18 required contexts.

## What survives

- **(i)'s mapping is derived.** It says a check owns each surface, not that the check would fail on every defect there. The freshness sweep's own limits (authorship, prefix-truncated items) stand as written in `regrounding/freshness.ts`.
- **The derivation checker (C15) is not among the barriers that arm here.** No lane applies it to the committed profile (G2-F2, `re-grounding-pass-four.md`).
- **Coverage of the moved residuals R1 and R3** was read from the Consumer Guard log's test names, not independently bitten.

**Standards implications**: none.
