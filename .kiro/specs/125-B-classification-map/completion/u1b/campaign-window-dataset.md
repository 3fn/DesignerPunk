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

## Exclusion table (protocol §6 classes + open clause; reasons per PR)

| PR | Reason |
|----|--------|
| #113 | 5.1 roster/campaign PR — class 3 (125-B instrumentation; J2 precedent). Excluded from the wave-1-open baseline set |
| #119 | section-citation register-row PR — class 3 (register-only; J2 precedent). Baseline exclusion |
| #121 | gate-bite throwaway (deliberate red, closed unmerged) — class 2. Listed for completeness |
| #122 | citation-defect fixes + checker/CI-job ship — **judgment exclusion (open clause)**: nearest class 1 (arming PR — authors prune-aware; ships a brand-new failure source whose required flip followed same-day). Dual-purpose PR (18 real defect fixes rode with it); excluded conservatively from the baseline; contested → Peter (J1/J3 pattern) |
| #123 | register check_state flip — class 3 (register-only). Baseline exclusion |
| #124 | the wave-1 prune itself (campaign-endogenous instrument; also the baseline/window boundary) |

## Segment log (EXOGENOUS events only)

| segment | opened-by (exogenous event) | boundary timestamp | n | f | W1 (as-of-pass) |
|---------|------------------------------|--------------------|---|---|------------------|
| 1 | Campaign open (wave-1 prune merge) | 2026-08-12T21:03:24Z | 0 | 0 | not evaluable (n<5) |

## Wall-clock record (datum, never a criterion)

- Campaign open: 2026-08-12T21:03:24Z · Segment boundaries: none yet · Campaign close: *(at final wave-window close)*

## Per-wave dataset index

| Wave | Dataset | Prune merge | Window state |
|------|---------|-------------|--------------|
| 1 (5.2) | `wave-1-dataset.md` | `cbf9929c` 2026-08-12T21:03:24Z | **OPEN** (0/10) |
| 2 (5.3) | `wave-2-dataset.md` | — | not open |
| 3 (5.4) | `wave-3-dataset.md` | — | not open |
| 4 (5.5) | *(rows-only expected — dataset only if a prune emerges)* | — | — |
