# Ballot Measure: U1 Pilot Closeout Verdict (program verdict + at-scale parameters + dial election)

**Date**: 2026-08-02
**Author**: Thurgood (Civitas steward) / Spec 125-B Task 3.2 (U1-c, the batched decision session)
**Status**: **RATIFIED (Peter, 2026-08-02)** — all four decisions ratified in one batched sitting (the Req 17/15/10.6 composition Peter pinned on 2026-07-13: three decisions, one session, full context), recorded and committed to the U1-c branch BEFORE its PR per the ballots README record-first protocol.
**Purpose**: Record the U1 pilot's program verdict and its two batched companion decisions, plus the one protocol-interpretation ruling that precedes the verdict. **This ballot is the U1b entry-gate artifact** (tasks-R2 pin: the gate cites the ballot, not the report). Evidence: `.kiro/specs/125-B-classification-map/completion/pilot/u1-closeout.md` (the Req 17 five-part record) and the artifacts it links.

---

## Decision 0 — Protocol-interpretation ruling (precedes the verdict): §3.2 roll-up reading

**RULED: W1 is MET.** The measurement-protocol §3.2 clause-1 reading governs: a criterion's window verdict is MET iff MET in every **evaluable** segment with ≥1 evaluable; a segment that is not evaluable (n<5, here n=0) does not force the roll-up to INDETERMINATE; clause 3's "indeterminate segment" means an evaluable-but-f=e+2 segment. The strict alternative (any unverdicted segment → INDETERMINATE) is rejected — it would make W1 un-meetable in any window with an early boundary event and no PRs yet. This reading becomes the written rule for U1b wave windows (closeout §2 gap A3).

**Effect**: the pilot window's final criteria stand as **W1 MET, W2 MET** (W3 report-only: 1 entry-replacement, 0 net-new). Flagged since pass 1; never self-adjudicated by the agent.

## Decision (a) — THE PROGRAM VERDICT

**RATIFIED: PROCEED TO U1b AS DESIGNED.** The pilot's three verification tiers all returned clean: probe NO GROSS LOSS; cloned-agent trial NO-DIFFERENCE-DETECTED (its pre-committed consequence — proceed to the prune — was honored and the prune ratified via ballot `2026-07-14-npm-test-imperative-prune.md`); observation window closed with no regression signal — zero test-suite first-push failures in 23 post-prune PRs (vs one in the 20-PR baseline), zero re-accretion, zero net-new console suppressions. Recorded limits acknowledged, not erased: gross-effects tier, prune-aware observers, one INDETERMINATE PR (#86).

**Effect**: U1b (map + prune at full-corpus scale) is UNGATED. Its waves execute the pilot's pipeline per wave (register rows → probe → trial → prune PR → window per Decision (c)'s parameters); every wave PR is a governance-law change, Peter-merged under the standing carve-out. U1b tasks are authored post-verdict as a tasks.md amendment with its own lightweight review (tasks.md U1b row). Methodology amendments required before scaling: NONE (closeout §2); the four recorded interpretations (A1–A4) are baked into the wave template as written rules.

## Decision (b) — Autonomy-dial election (Req 15)

**RATIFIED: RE-DEFER, next trigger = the U1b closeout.** The dial (a policy doc amending Task-Completion-Protocol scope, mapping armed checks → autonomy expansions — never machinery) is not elected now. The counter-argument was restated per Req 15.2 (may be premature at solo scale). Rationale for the trigger: the chafe signal the dial needs was not instrumented during the pilot ("no recorded chafe" = absence of collection, not a measured zero); U1b's wave cadence provides the first real-volume exposure. The tracker item stays live so "optional" cannot decay into "never" without a recorded decision (Req 15's purpose).

## Decision (c) — At-scale window parameters (Req 10.6)

**RATIFIED: P1 + P2 + P3 as proposed** (closeout §3, grounded in the pilot's wall-clock datum ≈18.8 days burst-shaped / 23 PRs, material-change-event frequency 1 endogenous + 0 exogenous, and the 10.6(b) analytic answer):

- **P1 — N-per-wave = 10** observed PRs (evaluability floor ≥5 retained; e = B×(n/20) arithmetic unchanged; per-wave baseline computed BEFORE the wave's prune merge, per the pilot's D2 lesson).
- **P2 — Metrics split by overlap-survivability**: W2 (re-accretion) + W3 (churn) run per-wave (rule-scoped, overlap-safe); **W1 runs as ONE SHARED campaign window** spanning U1b (global metric measured globally; segmented by staleness events; K=3 per campaign window; campaign baseline). If the shared W1 ever goes UNMET: the campaign pauses and recent waves are re-examined via their per-wave W2 evidence.
- **P3 — Waves MAY overlap**; U1b throughput is bounded by Peter's review cadence, not window serialization. Counter-arguments for all three recorded in closeout §3; serializing remains available at any time if concurrent review load chafes.

---

## Record notes

- The four decisions were presented with recommendations AND counter-arguments (AICP counter-argument requirement); Peter ratified all four recommended options as presented, in one sitting, 2026-08-02.
- Earlier same-day rulings folded into the evidence base and already recorded in the window dataset: D2 ACCEPTED, J1 INCLUDE, J2 EXCLUDE, J3 COUNT-ALL-23.
- Consumed by: U1b entry gate (Req 10.1 via Req 17.2 + the tasks-R2 ballot pin); Task-Completion-Protocol scope (untouched — dial re-deferred); 125-B Task 3 completion docs.
