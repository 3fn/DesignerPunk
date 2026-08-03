# U1b Campaign — Shared W1 Window Dataset

**Status**: SCAFFOLD — the campaign window OPENS at wave 1's prune merge (not yet merged). Nothing here is a verdict.
**Maintained by**: hand transcription per `campaign-measurement-protocol.md` §8 (manual recipes only; escalate-don't-build).
**Close condition**: closes at the close of the FINAL wave's window (event-denominated; never while any wave window is open).

---

## Header (finalized at wave 1's prune merge)

- **Campaign baseline**: **B = 2** — computed at 5.1 (2026-08-02, pre-wave-1 per protocol §4; set + judgments J-C1/J-C2 recorded there). *At wave-1 open: recompute mechanically iff qualifying PRs merged since; record both values.*
- **Required-check set (frozen, 18)**: per protocol §4 — a set change is an EXOGENOUS boundary event.
- **Segmentation ruling**: campaign-endogenous events (wave prunes/ballots/roster PRs) do NOT segment; exogenous only (protocol §2). K=3.
- **Wave-1 prune merge (campaign open)**: `<SHA>` — `<timestamp>` *(filled at open)*

## Observed-PR table (all qualifying PRs opened after campaign open; reconstruction pinning per A1)

| # | PR | branch | createdAt | pinned first-push SHA | first-push result | campaign segment |
|---|----|--------|-----------|------------------------|-------------------|------------------|

## Exclusion table (protocol §6 classes + open clause; reasons per PR)

| PR | Reason |
|----|--------|

## Segment log (EXOGENOUS events only)

| segment | opened-by (exogenous event) | boundary timestamp | n | f | W1 (as-of-pass) |
|---------|------------------------------|--------------------|---|---|------------------|
| 1 | Campaign open (wave-1 prune merge) | *(at open)* | 0 | 0 | not evaluable (n<5) |

## Wall-clock record (datum, never a criterion)

- Campaign open: *(at open)* · Segment boundaries: *(as logged)* · Campaign close: *(at final wave-window close)*

## Per-wave dataset index

| Wave | Dataset | Prune merge | Window state |
|------|---------|-------------|--------------|
| 1 (5.2) | `wave-1-dataset.md` *(created at its prune)* | — | not open |
| 2 (5.3) | `wave-2-dataset.md` | — | not open |
| 3 (5.4) | `wave-3-dataset.md` | — | not open |
| 4 (5.5) | *(rows-only expected — dataset only if a prune emerges)* | — | — |
