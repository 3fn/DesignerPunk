# Wave 1 — Window Dataset (Task 5.2, 5.W step (d))

**Status**: **CLOSED at pass 3 (2026-08-27) — N = 20 observed** (close condition N=10 crossed inside the pass-3 batch; A2 overshoot rule counts the ENTIRE closing batch, J3 precedent). Wave verdicts filled below (5.W(e)).
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
| 6 | #132 | fix/contract-name-education-drift | 2026-08-26T01:51:34Z | `e7d7940417ff` | GREEN (19/19) | contract-name education-drift repair (Lina); sequenced companion of the wave-2 prune, but ordinary domain work — counts |
| 7 | #134 | fix/cds-disabled-prop-example | 2026-08-26T01:58:19Z | `306f21066f32` | GREEN (19/19) | CDS disabled-prop fix + content-debt ledger; also wave-2 row 1 (opened post-wave-2-open) |
| 8 | #136 | fix/token-quick-reference-mode-resolution | 2026-08-26T02:28:40Z | `09fa9dd863fd` | GREEN (19/19) | TQR mode-resolution fix (Ada); touched wave-2 A1 surface (CDG) — see wave-2 staleness log |
| 9 | #137 | chore/dtcg-consumer-answer | 2026-08-26T02:44:51Z | `70689573a695` | GREEN (19/19) | divergence-issue ledger record |
| 10 | #138 | chore/custom-validation-ruling | 2026-08-26T03:02:22Z | `12f107273aec` | GREEN (19/19) | content-debt ledger ruling record |
| 11 | #139 | chore/health-check-2026-08-25 | 2026-08-26T03:17:08Z | `7754c51541ba` | GREEN (19/19) | monthly Civitas health check — judgment INCLUDE J-C3 (campaign dataset) |
| 12 | #140 | chore/gitignore-collab-vault | 2026-08-26T03:43:04Z | `5285db33d1e5` | GREEN (19/19) | .gitignore guard — judgment INCLUDE J-C4 |
| 13 | #141 | chore/verification-grade-reviews | 2026-08-26T13:26:19Z | `3baacfec26ca` | GREEN (19/19) | review-standard addendum — judgment INCLUDE J-C5 |
| 14 | #142 | chore/release-14.1.0 | 2026-08-26T13:35:40Z | `68362b18d136` | GREEN (19/19) | v14.1.0 version bump + notes |
| 15 | #143 | chore/androidbuilder-dead-path | 2026-08-26T14:11:39Z | `5562393d0fab` | GREEN (19/19) | dead-code sweep |
| 16 | #144 | chore/readme-version-badge | 2026-08-26T14:12:11Z | `9b3a9536c1a8` | GREEN (19/19) | README badge fix |
| 17 | #145 | chore/androidbuildvalidator-orphan | 2026-08-26T14:28:08Z | `e6ebb2dbeac0` | GREEN (19/19) | dead-code sweep |
| 18 | #146 | chore/ios-web-dead-build-paths | 2026-08-26T14:41:16Z | `7fcd06134d43` | GREEN (19/19) | dead-code sweep |
| 19 | #147 | chore/shadowgenerator-sweep | 2026-08-26T14:48:10Z | `3dac2ef9d93a` | GREEN (19/19) | dead-code sweep |
| 20 | #148 | chore/motion-formatter-rename | 2026-08-26T15:04:38Z | `15ea30eacbdd` | **INDETERMINATE** (A1: zero concluded checks on the pinned SHA) | 2026-08-26 GitHub Actions outage (database-primary failover) wedged the first push's suites in queued/startup_failure; second push `fda98bbf` was an EMPTY retrigger commit (20/20 success); never converted either way per A1 |

*(**CLOSED at pass 3, 2026-08-27 — N=20** (7 + the 13-PR pass-3 batch; close condition N=10 crossed in-batch, A2 overshoot counts the whole batch). Pass-3 additions #136–#148 A1-pinned by reconstruction: #137–#147 single-commit `committedDate ≤ createdAt`; #136 two pre-open commits, pinned to the last (`09fa9dd8`); #148 pinned to `15ea30ea` (its second commit is a post-open retrigger push). Excluded at pass 3: #135 (observation-pass-2 instrument, class 3) — campaign exclusion table. Judgment inclusions J-C3/J-C4/J-C5 recorded in the campaign dataset, open for Peter's ratification at this pass PR's merge. Pass-2 record: 7/10 at pass 2, 2026-08-26 — pass-2 additions #132/#134 A1-pinned (single-commit PRs, `committedDate ≤ createdAt`), both first-push GREEN 19/19. Excluded at pass 2: #131 (observation-pass-1 instrument) and #133 (the wave-2 prune, campaign-endogenous) — rows on the campaign exclusion table. Pass-1 record: 5/10 (#126–#130, all GREEN); #125 excluded. The 2026-08-21 sweep-5 removal segments the CAMPAIGN window only; wave windows carry no segments.)*

## W2 re-accretion scan log (per observation pass; recipe = pilot §5.3 over Wave-A1 paths, grep added lines for Wave-A2 patterns)

| Pass | Date (UTC) | Scan range | A2 hits on added lines | Verdict contribution |
|------|-----------|------------|------------------------|----------------------|
| 0 (wave open) | 2026-08-12 | `cbf9929c..HEAD` (empty — HEAD is the prune merge) | 0 by construction; live-tree A2 greps across all A1 + generated surfaces: **ZERO hits** (application-time verification, ballot §4) | W2 clean at open |
| 1 (session-start) | 2026-08-25 | `cbf9929c..4e194680` (main head, post-#130) | **ZERO hits** — no commit in range touched ANY Wave-A1 or generated surface (empty diff); added-line grep and live-tree grep at `4e194680` both zero across all 5 A2 patterns | W2 clean at pass 1 |
| 2 (session-start) | 2026-08-26 | `f6f05c06..7ce889bc` (post-#131 through #134) | **ZERO hits** — no commit in range touched ANY Wave-A1 or generated surface (empty scoped diff — #131–#134's edits all land on wave-2/campaign surfaces); added-line A2 grep over the full range: zero | W2 clean at pass 2 |
| 3 (session-start = wave close) | 2026-08-27 | `7ce889bc..2a6fdfc4` (#135 through #148) | **ZERO hits** — no commit in range touched ANY Wave-A1 or generated surface (empty scoped diff); added-line A2 grep over the full range: zero; live-tree A2 grep at `2a6fdfc4` across all A1 + generated surfaces: **ZERO** (application-time verification at close) | W2 clean at close |

## W3 churn log (report-only; console-fail allowlist entries added per PR, from `src/__tests__/console-allowlist.json`)

| PR | Entries added |
|----|---------------|

*(none at open; pass 1, 2026-08-25: `src/__tests__/console-allowlist.json` unchanged in `cbf9929c..4e194680` — zero entries added by #126–#130. Pass 2, 2026-08-26: unchanged in `f6f05c06..7ce889bc` — zero entries added by #131–#134. Pass 3, 2026-08-27: unchanged in `7ce889bc..2a6fdfc4` — zero entries added by #135–#148. **Window total: ZERO entries.**)*

## Staleness / segment notes (wave-grain)

- Wave windows carry NO baseline and NO segments (campaign protocol §1) — W2/W3 are per-wave; W1 lives on the shared campaign window (see `campaign-window-dataset.md`, segment 1 open at campaign open).
- A merged change to a Wave-A1 surface is logged here per pass (pilot §5.3 staleness arm) and assessed against the campaign's EXOGENOUS-only segmentation ruling (an outside-the-campaign 122 regen touching these surfaces segments the CAMPAIGN window; campaign-endogenous edits do not).
- **Pass 1 (2026-08-25)**: zero merged changes to any Wave-A1 surface in `cbf9929c..4e194680` — staleness arm clean. One campaign-grain boundary event since open (2026-08-21 sweep-5 required-flag removal — recorded in the campaign dataset's segment log, 1 of K=3); no effect on this wave's W2/W3.
- **Pass 2 (2026-08-26)**: zero merged changes to any Wave-A1 surface in `f6f05c06..7ce889bc` — staleness arm clean. The wave-2 prune merge (#133) is campaign-endogenous (no segment); the wave-2 WINDOW is now open in parallel (waves may overlap per P3) — see `wave-2-dataset.md`.
- **Pass 3 (2026-08-27, wave close)**: zero merged changes to any Wave-A1 surface in `7ce889bc..2a6fdfc4` — staleness arm clean through close. No exogenous boundary event since pass 2 (live required set verified 18 contexts, unchanged; boundary count stays 1 of K=3 campaign-grain).

## Wave verdicts (5.W(e) wave record — filled at close, pass 3, 2026-08-27)

- **W2 (re-accretion): MET** — zero Wave-A2 hits on added lines across every pass (0/1/2/3) on every Wave-A1 surface; live-tree grep at close (`2a6fdfc4`) zero across A1 + generated surfaces; generated-surface anomaly scan clean all passes (no pruned pattern reappeared anywhere). The prune held for the full window: nobody re-taught the pruned imperatives.
- **W3 (churn, report-only): ZERO** — no console-allowlist entries added by any of the 20 observed PRs.
- **W1 context (campaign-grain, cited per 5.W(e))**: campaign dataset at this wave's close — segment 2 n=16 f=0 (e=1.6, f ≤ e+1), segment now evaluable (n≥5), **W1 MET as-of-pass informationally**; roll-up per A3 remains a campaign-close reading. Boundary events 1 of K=3. One INDETERMINATE (#148, Actions-outage; never converted).
- **Interpretive notes (ambiguity discipline)**: (1) N=20 is a 2× overshoot of the N=10 close condition — mechanical consequence of A2 (count the whole closing batch) applied to a 13-PR burst batch; wall-clock span 2026-08-12→08-26 (datum). (2) 9 of 20 observed PRs are chores from a single 2026-08-26 burst (release + dead-code sweeps) — exposure diversity is burst-weighted; W2's zero is still corroborated by the two multi-day fix-PR stretches (#126–#130).
- **Chafe line (mandatory)**: stop-and-wait friction incidents under armed gates observed this wave: **two** — (1) **gate-registration bookkeeping drift** (2026-08-21): verify script expected 16 vs live 19 required contexts; reconciliation cost an advisory, three PRs (#128–#130), and a Peter Settings action — armed-gate maintenance friction, not merge-wait friction; (2) **#148 Actions-outage wedge** (2026-08-26): required checks stuck unconcludable (cancel reported completed, rerun reported broken workflow), needed an empty retrigger commit; merge delayed ~33h — infrastructure-caused stop-and-wait, not gate-design-caused. No incidents of the armed-gate design itself blocking a green-and-ready agent beyond normal Peter-merge cadence.
