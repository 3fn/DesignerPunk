# Task 7 Completion (Parent): The eight sweeps (C8) + gate registration (C9)

**Date**: 2026-07-10
**Task**: 7 — The eight sweeps (C8) + gate registration (C9) (Parent, Unit U1, Tier 3)
**Spec**: 122-agent-generator
**Branch**: task/122-substrate (U1 — Substrate; NO PR at this parent — U1's PR opens at Task 8)

---

## Success criteria — all four met

1. **All eight sweeps implemented as mechanical algorithms, each with a recorded
   prove-it-bites before cutover trust (Req 19 AC2)** ✅ — `tools/agent-generator/sweeps/`
   (common.ts + sweep-1…8), pure/injectable per the C7 idiom, `npx tsx` CLIs. Bites table:
   per-sweep in the 7.1/7.2 completion docs. Flagged deltas emit `ADJUDICATE:` blocks naming
   the owner; never auto-resolved (a recorded ruling in the NEW `canonical/adjudications.yaml`
   covers a persisting delta while keeping it visible — interpretation call flagged in 7.1).
2. **Sweep 5 is a PRE-CUTOVER GATE ONLY (Req 19 AC1 named exception); its extractor excludes
   historical-context lines (L3)** ✅ — live run: single concept-count **136**, exactly the
   two Lina-flagged lines (49, 113) excluded; `.web.tsx` count-assert 0. Post-last-cutover
   removal is a recorded protection-list change (noted in the workflow + the verify script).
3. **Sweep 8's namespace includes artifact-path members (D-A1); `fires: unconditional` trims
   emit negatives for orphaned artifacts (K-D1)** ✅ — both proven by dedicated tests; emits
   `demotion-delta.json`. NOTE for Task 8: no adapter renders trim negatives yet — sweep 8
   will rightly FAIL at the fixture's first emission until that lane lands (fail-loud by
   design; expected red recorded in 7.2).
4. **All ten contexts registered via one workflow, unfiltered trigger + shared setup +
   no-op lock (C9/Req 20); `verify-gate-registration.sh` count-asserts the protection set**
   ✅ — `.github/workflows/agent-generator.yml` (ten named matrix jobs + `122-setup`);
   branch protection PATCHed and platform-verified: **17 required contexts, count-asserted
   (N=17), strict:false preserved**; script exits 0.

## Primary artifacts

- `tools/agent-generator/sweeps/{common,noop-probe,sweep-1-refs,sweep-2-skills,sweep-3-dupes,sweep-4-ambient,sweep-5-corrected,sweep-6-declarations,sweep-7-dispositions,sweep-8-demotion}.ts`
- `.github/workflows/agent-generator.yml` (ten named jobs/contexts)
- `tools/agent-generator/verify-gate-registration.sh` (executable, N=17)
- `canonical/adjudications.yaml` (new — machine-readable ruling record)
- `canonical/generated.lock` refreshed (green full guard run; noop-probe verifies `noop=true`)

## Folded-in scope (Peter, 2026-07-10)

- shared-catalog `record-first-ratification.crossRef`: sweep-blinding TODO → **interim
  target** (ballots README ratification-protocol section) + `crossRefStatus: interim` +
  `crossRefResolveWhen`; sweep 1 enumerates interim crossRefs in EVERY report.
- `inbound-to-125-B-from-122.md` written into the 125 umbrella directory (no 125-B dir
  exists yet) — the re-point obligation at 125-B's formalization decision point.

## Findings surfaced to Peter (also in the subtask docs)

1. **Registration-before-merge window**: ten required contexts live on `main` while the
   workflow exists only on this branch → any unrelated PR opened before U1 merges blocks on
   "Expected" contexts. Window = now → U1 merge (Task 8 next). Lever if needed: temporarily
   uncheck the 122 contexts in Settings (recorded change), never path-filter.
2. **Sweep 3's live bite exceeded the design**: FOUR configs (data, kenya, leonardo, sparky)
   double-load `Product-Token-Governance.md`, not the predicted two. Hand configs untouched
   (input-of-record); each resolves at its agent's cutover under the now-standing sweep.
3. **Repo-slug drift**: live slug is `3fn/DesignerPunk`; `3fn/DesignerPunkv2` in
   core-goals.md + 125-A-era docs now 301s. Script pins the live slug; doc cleanup routed to
   Thurgood (Civitas content-consistency).

## Validation (Tier 3)

- Full suite: `npm test` → **8987/8987** (377 suites), zero regressions.
- Agent-generator lane: `npm run test:agent-generator` → **276/276** (24 suites; +54 over Task 6).
- Typecheck: root `npx tsc --noEmit` clean; `tools/agent-generator` project tsc clean.
- Platform: protection GET/PATCH verified; `verify-gate-registration.sh` PASS (exit 0).
- All ten check CLIs run live: standing exits 0 (with recorded vacuous-scope INFO where
  pre-cutover-empty); sweep-3 `--all-configs` bite exits 1 with the four findings.

## Delegated-tier capture

Subtasks planned `Agent: Thurgood`; all three executed in the **main loop (Fable 5)** —
single-session continuity across the C8 table, the shared sweep idiom, and live gate
surgery. Agent-evolution signal (routing estimate), not model-evolution; recorded per the
exception-based capture rule.
