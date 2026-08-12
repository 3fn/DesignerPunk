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

*(0/10 at open — no qualifying PR opened after the prune merge yet.)*

## W2 re-accretion scan log (per observation pass; recipe = pilot §5.3 over Wave-A1 paths, grep added lines for Wave-A2 patterns)

| Pass | Date (UTC) | Scan range | A2 hits on added lines | Verdict contribution |
|------|-----------|------------|------------------------|----------------------|
| 0 (wave open) | 2026-08-12 | `cbf9929c..HEAD` (empty — HEAD is the prune merge) | 0 by construction; live-tree A2 greps across all A1 + generated surfaces: **ZERO hits** (application-time verification, ballot §4) | W2 clean at open |

## W3 churn log (report-only; console-fail allowlist entries added per PR, from `src/__tests__/console-allowlist.json`)

| PR | Entries added |
|----|---------------|

*(none at open)*

## Staleness / segment notes (wave-grain)

- Wave windows carry NO baseline and NO segments (campaign protocol §1) — W2/W3 are per-wave; W1 lives on the shared campaign window (see `campaign-window-dataset.md`, segment 1 open at campaign open).
- A merged change to a Wave-A1 surface is logged here per pass (pilot §5.3 staleness arm) and assessed against the campaign's EXOGENOUS-only segmentation ruling (an outside-the-campaign 122 regen touching these surfaces segments the CAMPAIGN window; campaign-endogenous edits do not).

## Wave verdicts (filled at wave close, 5.W(e))

- W2 (re-accretion): *(pending)*
- W3 (churn, report-only): *(pending)*
- Chafe line (mandatory, 5.W(e)): *(pending — "stop-and-wait friction incidents under armed gates observed this wave: <incidents or none-observed>")*
