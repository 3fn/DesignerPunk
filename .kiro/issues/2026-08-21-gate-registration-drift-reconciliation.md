# Issue: verify-gate-registration.sh Drift Reconciliation + Sweep-5 Pending-Handback Ledger

**Date**: 2026-08-21
**Authority**: Peter's ruling 2026-08-21 (in-session, coordinator-relayed and executed same session): option (a) of the Civitas steward advisory — the sweep-5 Settings removal proceeds mid-window and **charges 1 of K=3** on the open 125-B U1b campaign window (campaign-measurement-protocol.md §2: a required-check-set change is an exogenous boundary event)
**Owner**: Thurgood (Civitas steward); script/governance edits Peter-merged (governance carve-out); the Settings action is Peter-only
**Status**: IN EXECUTION — script reconciliation in PR; **Peter Settings action PENDING** (this issue is the pending-handback ledger that the 2026-07-11 sweep-5 retirement lacked)

---

## The finding (verified live 2026-08-21)

`tools/agent-generator/verify-gate-registration.sh` — the count-assert guard over `main`'s required-status-check contexts (Spec 122 Task 7.3, C9 / Req 20 AC3) — FAILED: expected 16 contexts, live protection had 19. Three discrepancies:

1. **`Section Citation Guard`** — armed by Peter 2026-08-12 (register § "section-citation-resolution"); never added to `EXPECTED_CONTEXTS`.
2. **`125B-tool-boot-smoke`** — armed 2026-07-14 (125-B Task 1.6; register § "tool-boot-smoke"); never added to `EXPECTED_CONTEXTS`.
3. **`122-sweep-5-corrected-state`** — retired on record (Spec 122 U11 closeout, `task-18-parent-completion.md` § "Sweep-5 retirement", 2026-07-11) with the script side landed via PR #68 (commit `f652c3d3`) — but the **paired Peter Settings removal never landed**. Live config still carries the context.

Context strings verified against the live protection API 2026-08-21 (the script's own printed `ACTUAL_CONTEXTS`): the literal strings are `Section Citation Guard` and `125B-tool-boot-smoke`.

## Root causes (three distinct — full analysis in the steward advisory, this session)

1. **Structural**: the script was never wired into `scripts/governance-check.sh --full` — its "run at the monthly health check" cadence lived only in a header comment, so the 2026-08-02 health check never ran it. (Fix: separate PR, `chore/wire-gate-registration-into-health-check`.)
2. **Process**: arming a required check carried no paired obligation to update `EXPECTED_CONTEXTS` in the same recorded change (the script's failure message states the rule, but only fires when run — see 1). Both armings missed it.
3. **Half-executed two-actor change**: sweep-5's retirement needed agent-side (script, landed PR #68) + Peter-side (Settings, never landed); no pending-handback ledger tracked the Peter half. This issue IS that ledger, retroactively.

## Checklist

### Reconciliation (agent side)
- [x] Script updated: `EXPECTED_CONTEXTS` + `125B-tool-boot-smoke` + `Section Citation Guard`; `EXPECTED_COUNT` 16 → 18; header rewritten to record the reconciliation (this issue's PR, `fix/gate-registration-drift-reconciliation`)
- [x] Register history appends: `tool-boot-smoke` row + `section-citation-resolution` row (same PR)
- [x] Post-edit verify-run: script fails on EXACTLY one thing — the extra sweep-5 context (the precise pending-action signal; output in the PR body)

### PENDING — Peter Settings action (Step 2 of the advisory)
- [ ] **Peter**: Settings → Branches → `main` protection → required status checks → **remove `122-sweep-5-corrected-state`**. This is the C9-recorded protection-list change deferred since 2026-07-11.

### Step 3 — verify-run after the removal (same burst)
- [ ] **Thurgood** (or Peter): run `./tools/agent-generator/verify-gate-registration.sh` → expect `PASS: all 18 required contexts present`. Record the PASS here (date + output line) to close this ledger's sweep-5 item.

### 125-B campaign-window accounting
- [ ] **Thurgood**: at the NEXT observation pass after the removal lands, record the boundary event in `.kiro/specs/125-B-classification-map/completion/u1b/campaign-window-dataset.md` — exogenous required-check-set change, charges **1 of K=3**, segments the shared campaign window (Peter's option-(a) ruling, 2026-08-21). NOT recorded pre-emptively; the dataset entry is made at the observation pass, per campaign law's event-anchored cadence.
- Note: the §4 FROZEN scoring set (18, incl. sweep-5) is unaffected — frozen means frozen; post-removal, sweep-5 simply stops appearing on new pinned SHAs ("present on the pinned SHA" handles absence). The charge is the segmentation, not a scoring change.

### Follow-up (separate PR, independent files)
- [ ] Wire `verify-gate-registration.sh` into `scripts/governance-check.sh --full` (`chore/wire-gate-registration-into-health-check`) so the monthly cadence is mechanical, not a comment.

## Rule restated (for future armings/retirements)

Arming OR retiring a required check updates `verify-gate-registration.sh`'s `EXPECTED_CONTEXTS` **in the same recorded change** (C9). For two-actor changes (agent script edit + Peter Settings action), open a pending-handback ledger entry (this pattern) so the second half cannot evaporate. 125-B U3's arming procedure should bake this step in (flagged to the U3 plan).
