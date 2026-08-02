# Task 3.1 Completion: Observation Window Execution

**Date**: 2026-08-02
**Task**: 125-B Task 3.1 — Observation window execution (Implementation, Tier 2)
**Planned Agent**: Thurgood (Sonnet) — manual queries per the pre-committed protocol

---

## What was done

The U1 pilot observation window executed end-to-end per `completion/pilot/measurement-protocol.md` §5–§6, entirely by manual query recipes (no standing tooling — Req 8.6 honored):

- **Window**: opened 2026-07-14T20:25:29Z (U1-p prune merge `4992e592`, PR #77); **closed 2026-08-02T16:36:21Z** (N=20 close condition reached; 23 observed, all counted per Peter's J3 ruling).
- **Two observation passes**, each hand-transcribed into `completion/pilot/window-dataset.md` (the §6-designated dataset):
  - Pass 1 (2026-08-02, PR #95): baseline B=1 computed (deviation D2, RULED ACCEPTED); 15 observed PRs pinned via the D1 first-push reconstruction method; segments established (boundary: U2 arming); W1/W2 as-of-pass MET.
  - Pass 2 (2026-08-02, PR #104): 8 new qualifying PRs; window CLOSED; final tallies (n=23, f=2, W1 MET, W2 MET, W3: 1 replacement/0 net-new); §5.3 A1 scan and §5.4 churn scan rerun independently through close.
- **Judgment calls**: all surfaced with recommendations + counter-arguments and RULED by Peter (J1 INCLUDE, J2 EXCLUDE, J3 COUNT-ALL-23); deviations D1–D4 recorded, none amending a criterion; boundary events 1 of K=3; wall-clock span recorded as the Req 8.7 datum (≈18.8 days, burst-shaped).

## Deviation from the planned execution shape (recorded honestly)

- **Cadence**: the protocol's 2–3-day observation cadence was not kept (first pass ran ~day 18). Handled via the recorded D1/D4 reconstruction method; cadence is operational hygiene, not a criterion — no criterion amended.
- **PR routing**: the two observation passes merged as standalone chore PRs (#95, #104 — Peter-merged) rather than accumulating on the U1-c unit branch. Reason: the dataset had to be ON `main` mid-window because 119-B's Task 9 regen gate read it mechanically (cross-spec coordination). The unit branch carries this completion doc and the closeout artifacts; the dataset artifacts it references live on `main` via those merges.

## Delegated-tier capture (exception-based, per Task-Completion-Protocol)

Planned `Thurgood (Sonnet)`; executed by the session model (Fable) acting directly in the main loop rather than a delegated Sonnet subagent. Model-evolution note: the passes involved live judgment-call surfacing (J1–J3) and a close-condition edge case, which exceeded the "manual queries per pre-committed protocol" cognitive estimate — the stamp under-estimated the judgment content of window execution. Data point for tier recalibration, not a defense.

## Validation (Tier 2)

- All §5 recipes executed as written (gh pr list / check-runs queries, git log scans); outputs hand-transcribed and cross-checked both passes.
- The 119-B null-regen claim was independently verified (zero A1-surface commits prune→close), not inherited.
- No test surface touched; no code changed. Dataset merged green through the PR gate twice (#95, #104).

## Artifacts

- `completion/pilot/window-dataset.md` (final: WINDOW CLOSED, all rulings recorded) — merged via PRs #95 and #104
