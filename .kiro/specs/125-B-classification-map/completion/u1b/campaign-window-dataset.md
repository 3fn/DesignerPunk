# U1b Campaign — Shared W1 Window Dataset

**Status**: **OPEN** (2026-08-12T21:03:24Z — wave-1 prune merge, PR #124, squash `cbf9929c`). Nothing here is a verdict.
**Maintained by**: hand transcription per `campaign-measurement-protocol.md` §8 (manual recipes only; escalate-don't-build).
**Close condition**: closes at the close of the FINAL wave's window (event-denominated; never while any wave window is open).

---

## Header (finalized at wave 1's prune merge)

- **Campaign baseline**: **B = 2 at 5.1 (2026-08-02); RECOMPUTED AT WAVE-1 OPEN: B = 2 (unchanged)** — protocol §4 staleness recheck, mechanical, both values recorded. Wave-1-open set = 20 most recent qualifying pre-prune PRs: #97 #98 #99 #100 #101 #102 #103 #105 #106 #107 #108 #109 #110 #111 (carried from the 5.1 set with pinned outcomes) + #114 #115 #116 #117 #118 #120 (reconstructed this pass, A1 pinning). Failures (2): **#103** (`122-diff-guard` on `504c915d17`, carried) and **#118** (`122-diff-guard` on first-push `34d24f69fe2a`; corrected on its second push `c599579b09`). #93 (a 5.1-set failure) slid out of the 20-window. New-PR pins, all first-push green except #118: 114:`25d7cf1782` 115:`86ebfe67e3` 116:`1186455cc1` 117:`dab9df1933` 120:`4aeeeb3bd8`.
- **Required-check set at campaign open (19 contexts)**: the pilot's 18 + **"Section Citation Guard / section-citations"** (armed by Peter 2026-08-12 ~16:00Z, BEFORE campaign open — measurement-free, no window was open; recorded on its register row; NOT a boundary-event charge). Baseline PRs #97–#120 were evaluated against the 18-context set in force at their first pushes (the guard ran on no baseline first-push SHA). Window PRs are evaluated against the 19-context set. *(`122-setup` runs on PRs but is NOT a required context — never counted.)* Any FURTHER set change is an EXOGENOUS boundary event.
- **Segmentation ruling**: campaign-endogenous events (wave prunes/ballots/roster PRs) do NOT segment; exogenous only (protocol §2). K=3.
- **Wave-1 prune merge (campaign open)**: `cbf9929c93a6d063bf6444412c12fa64d3b3283c` — 2026-08-12T21:03:24Z (PR #124)

## Observed-PR table (all qualifying PRs opened after campaign open; reconstruction pinning per A1)

| # | PR | branch | createdAt | pinned first-push SHA | first-push result | campaign segment |
|---|----|--------|-----------|------------------------|-------------------|------------------|
| 1 | #126 | fix/buttonicon-token-family | 2026-08-13T14:54:35Z | `5fcdd432aa8c` | GREEN (19/19 concluded success) | 1 |
| 2 | #127 | fix/avatar-icon-token-family | 2026-08-13T18:44:15Z | `0339a4550a84` | GREEN (19/19 concluded success) | 1 |
| 3 | #128 | fix/gate-registration-drift-reconciliation | 2026-08-21T13:37:47Z | `e5f998f6f88e` | GREEN (19/19 concluded success) | 1 |
| 4 | #129 | chore/wire-gate-registration-into-health-check | 2026-08-21T13:39:00Z | `11f98156ee48` | GREEN (19/19 concluded success) | 1 |
| 5 | #130 | chore/close-gate-registration-ledger | 2026-08-21T13:52:05Z | `b3713374b000` | GREEN (19/19 concluded success) | 2 |
| 6 | #132 | fix/contract-name-education-drift | 2026-08-26T01:51:34Z | `e7d7940417ff` | GREEN (19/19 concluded success) | 2 |
| 7 | #134 | fix/cds-disabled-prop-example | 2026-08-26T01:58:19Z | `306f21066f32` | GREEN (19/19 concluded success) | 2 |

*(Pass 2, 2026-08-26: #132 and #134 A1-pinned (single-commit PRs); #132 is the wave-2-sequenced companion repair but ordinary domain work, not instrumentation — counts. Note `122-sweep-5-corrected-state` still runs (success) on both pinned SHAs post-removal — workflow persists, required flag gone; scoring unaffected.)*

*(Pass 1, 2026-08-25: all five pinned by A1 reconstruction — each PR is single-commit with `committedDate ≤ createdAt`; check-runs queried per SHA. #127 OPEN at this pass — qualification is at open (DD6/J-C2 precedent), first-push outcome concluded. Note: `122-sweep-5-corrected-state` still RAN (success) on `b3713374b000` post-removal — the workflow persists; only the required flag was removed. Scoring unaffected either way.)*

## Exclusion table (protocol §6 classes + open clause; reasons per PR)

| PR | Reason |
|----|--------|
| #113 | 5.1 roster/campaign PR — class 3 (125-B instrumentation; J2 precedent). Excluded from the wave-1-open baseline set |
| #119 | section-citation register-row PR — class 3 (register-only; J2 precedent). Baseline exclusion |
| #121 | gate-bite throwaway (deliberate red, closed unmerged) — class 2. Listed for completeness |
| #122 | citation-defect fixes + checker/CI-job ship — **judgment exclusion (open clause)**: nearest class 1 (arming PR — authors prune-aware; ships a brand-new failure source whose required flip followed same-day). Dual-purpose PR (18 real defect fixes rode with it); excluded conservatively from the baseline; contested → Peter (J1/J3 pattern) |
| #123 | register check_state flip — class 3 (register-only). Baseline exclusion |
| #124 | the wave-1 prune itself (campaign-endogenous instrument; also the baseline/window boundary) |
| #125 | wave-1 window-open pass (datasets + B recheck) — class 3 (dataset-transcription instrument; J2 precedent). Recorded at pass 1 |
| #131 | observation pass 1 (datasets + boundary event + ledger closure) — class 3 (dataset-transcription instrument). Recorded at pass 2 |
| #133 | the wave-2 prune unit PR (rows + evidence + prune + ballot) — campaign-endogenous instrument (the measured intervention; the wave-1 #124 class). Also the wave-2 window-open boundary |

## Segment log (EXOGENOUS events only)

| segment | opened-by (exogenous event) | boundary timestamp | n | f | W1 (as-of-pass) |
|---------|------------------------------|--------------------|---|---|------------------|
| 1 | Campaign open (wave-1 prune merge) | 2026-08-12T21:03:24Z | 4 | 0 | not evaluable (n<5); f=0 ≤ e+1 (e=0.4) informationally |
| 2 | **Required-check-set change: `122-sweep-5-corrected-state` removed from required contexts (Peter Settings action; option-(a) ruling 2026-08-21 — charges 1 of K=3)** | 2026-08-21 ~13:50Z (bracketed: after #129's merge 13:48:30Z, before #130's creation 13:52:05Z; exact Settings-action time not captured) | 3 | 0 | not evaluable (n<5); f=0 ≤ e+1 (e=0.3) informationally — pass 2: n 1→3 (#132, #134 added; wave-2 prune/ballot merges are campaign-endogenous, NO segment) |

**Boundary-event count: 1 of K=3.** Segment 1 is CLOSED at n=4 — below the ≥5 evaluability floor, permanently not-evaluable (A3: never forces INDETERMINATE). The §4 frozen scoring set is UNCHANGED by the removal (frozen means frozen — sweep-5 simply stops being a required context on the live gate; "present on the pinned SHA" handles any future absence). Ledger: `.kiro/issues/2026-08-21-gate-registration-drift-reconciliation.md` — its campaign-accounting item is closed by this entry (pass 1, 2026-08-25).

## Wall-clock record (datum, never a criterion)

- Campaign open: 2026-08-12T21:03:24Z · Segment boundaries: 2026-08-21 ~13:50Z (sweep-5 required-flag removal) · Campaign close: *(at final wave-window close)*

## Per-wave dataset index

| Wave | Dataset | Prune merge | Window state |
|------|---------|-------------|--------------|
| 1 (5.2) | `wave-1-dataset.md` | `cbf9929c` 2026-08-12T21:03:24Z | **OPEN** (7/10 at pass 2, 2026-08-26) |
| 2 (5.3) | `wave-2-dataset.md` | `1301c2de` 2026-08-26T01:57:03Z (PR #133) | **OPEN** (1/10 at pass 2 — windows overlap per P3) |
| 3 (5.4) | `wave-3-dataset.md` | — | not open |
| 4 (5.5) | *(rows-only expected — dataset only if a prune emerges)* | — | — |
