# Wave 1 — Window Dataset (Task 5.2, 5.W step (d))

**Status**: **OPEN** — created at the wave-1 prune merge per campaign protocol §7/§8.
**Prune merge (wave open)**: PR #124, squash `cbf9929c93a6d063bf6444412c12fa64d3b3283c`, 2026-08-12T21:03:24Z.
**Ballot**: `.kiro/docs/ballots/2026-08-12-wave-1-workflow-gate-prune.md` (RATIFIED Peter 2026-08-12, record-first; revert path recorded there).
**Close condition**: N = 10 observed PRs (event-denominated). Observation passes are cadence-free under reconstruction-by-default (A1): wave open (this pass), opportunistically at session starts while open, and at close.
**Observed PR** (DD6, all required): opened AFTER 2026-08-12T21:03:24Z; head branch `task/*`, `fix/*`, or `chore/*`; not on the exclusion table (campaign dataset holds the shared exclusion table — one table, both datasets cite it).
**First-push definition**: FAILURE iff any required-context check on the A1-pinned first-push SHA concluded `failure`. Required set for window PRs = **19 contexts** (the pilot 18 + "Section Citation Guard / section-citations", armed pre-window measurement-free — campaign dataset header has the full record).

---

## Appendix Wave-A1 — Surfaces (FROZEN at wave open, from the ratified diff; assessment §5)

1. `.kiro/steering/Task-Completion-Protocol.md` — pruned (6 hunks)
2. `governance/Process-Development-Workflow.md` — pruned (§ Troubleshooting tail, W1-9)
3. `.kiro/steering/core-goals.md` — education-only C1 surface (scanned; re-accretion INTO it is a hit)
4. `governance/BUILD-SYSTEM-SETUP.md` — education-only C3 surface (scanned)
5. `.claude/agents/thurgood.md` + `CLAUDE.md` — generated (anomaly-scan only, NEVER W2-counted: a pruned pattern reappearing on a generated surface without a source change is an ANOMALY — generator/manual-edit investigation)

*(`.kiro/hooks/complete-task.sh` disclosed at (a) but NOT a Wave-A1 surface — tooling, outside the education corpus.)*

## Appendix Wave-A2 — Pattern literals (FROZEN at wave open; the pruned imperative forms, verbatim — rewritten/retained forms are NOT hits)

1. `Never commit to \`main\`.`
2. `never push to \`main\`` *(covers W1-2/3/4/5's cut halves; the retained "Direct pushes to \`main\` are rejected" education does not match)*
3. `NEVER push to \`main\``
4. `Squash-merge is the ONLY merge method`
5. `— never \`main\`` *(the PDW tail form)*

## Observed-PR table (to N=10)

| # | PR | branch | createdAt | pinned first-push SHA | first-push result | notes |
|---|----|--------|-----------|------------------------|-------------------|-------|
| 1 | #126 | fix/buttonicon-token-family | 2026-08-13T14:54:35Z | `5fcdd432aa8c` | GREEN (19/19) | Button-Icon token family split |
| 2 | #127 | fix/avatar-icon-token-family | 2026-08-13T18:44:15Z | `0339a4550a84` | GREEN (19/19) | OPEN at pass 1 — qualifies at open (DD6/J-C2) |
| 3 | #128 | fix/gate-registration-drift-reconciliation | 2026-08-21T13:37:47Z | `e5f998f6f88e` | GREEN (19/19) | gate-registration script fix |
| 4 | #129 | chore/wire-gate-registration-into-health-check | 2026-08-21T13:39:00Z | `11f98156ee48` | GREEN (19/19) | governance-check wiring |
| 5 | #130 | chore/close-gate-registration-ledger | 2026-08-21T13:52:05Z | `b3713374b000` | GREEN (19/19) | ledger closure; campaign segment 2 (post-boundary) |

*(**5/10 at pass 1, 2026-08-25** — A1 reconstruction: every PR single-commit with `committedDate ≤ createdAt`; check-runs queried per pinned SHA, all 19 frozen contexts concluded `success` on all five. #125 excluded — class-3 instrument, recorded on the campaign exclusion table. The 2026-08-21 sweep-5 required-flag removal segments the CAMPAIGN window only (recorded there, 1 of K=3); wave windows carry no segments.)*

## W2 re-accretion scan log (per observation pass; recipe = pilot §5.3 over Wave-A1 paths, grep added lines for Wave-A2 patterns)

| Pass | Date (UTC) | Scan range | A2 hits on added lines | Verdict contribution |
|------|-----------|------------|------------------------|----------------------|
| 0 (wave open) | 2026-08-12 | `cbf9929c..HEAD` (empty — HEAD is the prune merge) | 0 by construction; live-tree A2 greps across all A1 + generated surfaces: **ZERO hits** (application-time verification, ballot §4) | W2 clean at open |
| 1 (session-start) | 2026-08-25 | `cbf9929c..4e194680` (main head, post-#130) | **ZERO hits** — no commit in range touched ANY Wave-A1 or generated surface (empty diff); added-line grep and live-tree grep at `4e194680` both zero across all 5 A2 patterns | W2 clean at pass 1 |

## W3 churn log (report-only; console-fail allowlist entries added per PR, from `src/__tests__/console-allowlist.json`)

| PR | Entries added |
|----|---------------|

*(none at open; pass 1, 2026-08-25: `src/__tests__/console-allowlist.json` unchanged in `cbf9929c..4e194680` — zero entries added by #126–#130)*

## Staleness / segment notes (wave-grain)

- Wave windows carry NO baseline and NO segments (campaign protocol §1) — W2/W3 are per-wave; W1 lives on the shared campaign window (see `campaign-window-dataset.md`, segment 1 open at campaign open).
- A merged change to a Wave-A1 surface is logged here per pass (pilot §5.3 staleness arm) and assessed against the campaign's EXOGENOUS-only segmentation ruling (an outside-the-campaign 122 regen touching these surfaces segments the CAMPAIGN window; campaign-endogenous edits do not).
- **Pass 1 (2026-08-25)**: zero merged changes to any Wave-A1 surface in `cbf9929c..4e194680` — staleness arm clean. One campaign-grain boundary event since open (2026-08-21 sweep-5 required-flag removal — recorded in the campaign dataset's segment log, 1 of K=3); no effect on this wave's W2/W3.

## Wave verdicts (filled at wave close, 5.W(e))

- W2 (re-accretion): *(pending)*
- W3 (churn, report-only): *(pending)*
- Chafe line (mandatory, 5.W(e)): *(pending — "stop-and-wait friction incidents under armed gates observed this wave: <incidents or none-observed>")*
