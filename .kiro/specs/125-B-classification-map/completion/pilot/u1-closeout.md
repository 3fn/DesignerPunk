# U1 Pilot — Closeout Record

**Date**: 2026-08-02
**Task**: 125-B Task 3.2 (Closeout record + Peter's batched decision session)
**Traces**: Req 17 (this record's contract), Req 15 (dial), Req 10.6 (at-scale parameters), Req 8 (window); Design C5
**Status**: CONTENT-complete per C5 (every criterion carries a verdict; every 10.6 problem carries its answer-or-datum; no TBD). **The batched decision session was HELD (Peter, 2026-08-02) and all four decisions RATIFIED**: W1-reading ruled MET · **program verdict PROCEED AS DESIGNED** · at-scale parameters P1–P3 ratified · dial re-deferred (trigger: U1b closeout). **This record is the U1b entry-gate artifact (Req 17.2) — but U1b's gate cites the VERDICT BALLOT, not this report** (tasks-R2 pin). Ballot: `.kiro/docs/ballots/2026-08-02-u1-pilot-closeout-verdict.md`.

**Evidence chain this record closes**: register row (`governance/classification-map.md` § npm-test-before-complete) → probe (NO GROSS LOSS — `probe-evidence.md`) → cloned-agent trial (NO-DIFFERENCE-DETECTED; pre-committed consequence: proceed to prune — `trial-diff-table.md`) → prune (PR #77, ballot `2026-07-14-npm-test-imperative-prune.md`, RATIFIED) → observation window (N=20 close condition; 23 observed — `window-dataset.md`) → **this closeout**.

---

## 1. Window Findings (Req 17.1a — each pre-committed criterion: met / unmet / indeterminate)

Window: opened 2026-07-14T20:25:29Z (prune merge `4992e592`), closed 2026-08-02T16:36:21Z (pass-2 observation; N=20 close condition reached, 23 observed — all counted per Peter's J3 ruling). Two segments (boundary: U2 console-fail arming, the protocol's own named §4 event); boundary events 1 of K=3. Full per-PR data: `window-dataset.md`.

| Criterion | Window verdict (§3.2 roll-up) | Basis |
|-----------|-------------------------------|-------|
| **W1 — first-push failure rate** | **MET** *(roll-up reading RULED — ballot Decision 0)* | Segment 2 (evaluable, n=23): f=2, e = B×(n/20) = 1×1.15 → 1; f ≤ e+1 → MET. Segment 1 (n=0): not evaluable. Roll-up: MET in every evaluable segment, ≥1 evaluable. |
| **W2 — re-accretion** | **MET** (unambiguous) | Zero commits touching any Appendix-A1 surface across the entire window (scan run independently at both passes); zero A2-pattern reintroductions. Trivially MET in both segments. |
| **W3 — allowlist churn** | **Report-only datum** (never pass/fail) | 1 entry-replacement (#81 — pattern update to an existing retained-safety-net entry), **0 net-new suppressions** over the whole armed span. |

**Pre-verdict ruling (flagged since pass 1; RULED in the batched session — ballot Decision 0): W1 is MET; the clause-1 evaluable-segments reading governs.** The question as it was presented: the §3.2 clause-3 reading. §3.2's INDETERMINATE clause says "any indeterminate segment with no unmet." Segment 1 reports W1 "INDETERMINATE (not evaluable, n=0)". Read strictly, an empty segment forces the whole window's W1 to INDETERMINATE — making W1 un-meetable in ANY window whose open precedes its first PR whenever a boundary event lands early (as here: the boundary was 2h19m after open, before any qualifying PR existed). The adopted reading (recorded in the dataset since pass 1, never self-adjudicated): clause 1 governs ("MET ⇔ MET in every **evaluable** segment AND ≥1 evaluable"), and clause 3's "indeterminate segment" means an evaluable-but-f=e+2 segment. Under the strict alternative, W1 is INDETERMINATE, not MET. **Indeterminate never converts to pass — this is Peter's call, not mine.**

**Failure-mode decomposition (the honest headline).** The failure the pruned rule guards against is *completion-without-validation → red suite on push*. Decomposed by failing check:

- Baseline (20 pre-prune PRs): 1 first-push failure — #61, `lane-mcp-server-suite` (a **test-suite** failure).
- Window (23 post-prune PRs): 2 first-push failures — #93 and #103, **both `122-diff-guard`** (generated-output bookkeeping), **zero test-suite failures**.

The rule-relevant failure class was observed **zero times in 23 post-prune PRs** vs once in 20 baseline PRs. Reporting discipline: at these counts that is "no signal of regression," not "improvement" — but it is the strongest form of W1's MET the window can produce, and it is the form that matters for the prune's specific risk.

**Recorded limits (ambiguity reported as ambiguity):**

1. **#86 INDETERMINATE** — its reconstructed first-push SHA carries zero concluded checks (superseded pre-conclusion). Never converted either way. The stacked hypothetical (count #86 as a failure under the all-23 J3 reading) would give f=3 = e+2 → W1 INDETERMINATE; both stacking steps are contrary to the recorded method, but the sensitivity is on record.
2. **Gross-effects tier.** N=20 at solo scale detects gross drift only (pre-committed in Req 8.2's rationale). A subtle behavioral degradation below that threshold would not register here — the trial tier carried the gating weight for exactly this reason.
3. **Observer non-independence.** All authors of observed PRs are prune-aware to some degree (§4's recorded honesty note). Mechanical contamination was excluded (instrument PRs); awareness cannot be.
4. **Deviations D1–D4** (all recorded in the dataset, none amending a criterion): D1 late first pass + first-push reconstruction method; D2 baseline computed late (**RULED ACCEPTED**, Peter, 2026-08-02); D3 = #86; D4 pass-2 batch also observed post-merge (D1's method reapplied). Judgment calls all ruled: J1 INCLUDE (#80), J2 EXCLUDE (#95), J3 COUNT-ALL-23 (Peter, 2026-08-02).

---

## 2. Methodology Amendments (Req 17.1b)

**No amendments to the pre-committed methodology.** The trial verdict was NO-DIFFERENCE-DETECTED, so its pre-committed tightening consequence never fired; no imposter-test or blade calibration change was forced by the pilot; §7's amendment log is empty (D1–D4 are recorded execution deviations and method notes, not criterion amendments).

**Interpretations and protocol gaps recorded for the wave template** (each was discovered live and resolved by recorded ruling — U1b's wave protocol should close them *in text* so no wave re-litigates them):

| # | Gap / interpretation | Resolution to bake into the wave template |
|---|---------------------|--------------------------------------------|
| A1 | First-push pinning when observation happens post-merge (DD6 assumed observation-while-open; solo cadence breaks that) | Define reconstruction as the standard method: first-push SHA = last commit with `committedDate ≤ createdAt + 120s`; no-concluded-checks → INDETERMINATE, never a pass (D1/D4 method, applied twice without incident) |
| A2 | Batch-overshoot at close (protocol silent) | Peter's J3 ruling as standing rule: **the entire closing batch is observed and counted** — no qualifying PR at the boundary is dropped |
| A3 | §3.2 clause-3 ("any indeterminate segment") vs empty segments | **RULED (ballot Decision 0)**: the clause-1 evaluable-segments reading governs; empty/not-evaluable segments never force INDETERMINATE — now the written rule for wave windows |
| A4 | R4's N/A discipline in trial scoring (rode PR #75 for Req 7.7 review; accepted at its merge) | Keep §1's N/A discipline as the written tiebreak for applicability-varying actions |

---

## 3. Recalibrated At-Scale Window Parameters (Req 17.1c / Req 10.6 — actual values, proposed for ballot ratification)

### The three at-scale problems, each with its answer-or-datum

**(a) Serialization math — datum + arithmetic.** Pilot wall-clock span: **≈18.8 days for 23 observed PRs** (window open 2026-07-14T20:25Z → close 2026-08-02T16:36Z). The span is **burst-shaped, not uniform**: 14 PRs on day 1 (2026-07-15), a ~17-day quiet gap (no qualifying PRs), then 9 PRs on the close day — i.e., ~2 active working days produced the entire sample; calendar time was dominated by a work pause, not by PR scarcity. Two honest projections: at the requirements' cited active cadence (~54 PRs/2 weeks), an N=20 window resolves in ~5 days; at pilot-observed calendar reality, ~19 days. **If U1b windows serialize** at, say, 6–10 waves for the full corpus: ~1–2 months at active cadence, ~4–6 months at pilot-observed cadence. That is the schedule fact Req 10.6(a) demanded be a conscious call.

**(b) Attribution under overlap — the analytic answer (honestly labeled: reasoning, not measurement — the pilot ran one window).** Metric-by-metric: **W2 (re-accretion) is rule-scoped and overlap-safe** — its grep watches one rule's surfaces for one rule's patterns; concurrent windows cannot contaminate each other's W2. **W3 (churn) is check-scoped and overlap-safe.** **W1 (first-push failure rate) is global and does NOT survive per-wave attribution under overlap** — a degradation during overlapping windows cannot be attributed to a specific wave's prune. Consequence: overlap is safe for the metrics that are *specific* to a prune, and unsafe only for the metric that was always a *global backstop*.

**(c) Re-baseline contagion — datum.** Material-change-event frequency during the pilot: **1 event in 23 PRs / 18.8 days — and it was endogenous** (U2's scheduled arming, the protocol's own named event), **not** an exogenous 122 regen. Exogenous staleness events observed: **ZERO** (119-B's one generator run during the window was provably null — verified independently, zero A1-surface commits in the whole range). K=3 was never approached. At current cadence, contagion risk is measured-low; the coupling 10.6(c) feared exists but did not fire once.

### Parameters (proposed by Thurgood; **RATIFIED P1+P2+P3 as proposed — ballot Decision (c)**)

- **P1 — N-per-wave = 10** (evaluability floor ≥5 retained; e = B×(n/20) arithmetic unchanged). *Rationale*: the window is the backstop tier behind the gating trial; W2 — the per-rule signal — needs no minimum N at all; n=10 stays evaluable for W1 and halves the serialization cost of every wave. *Counter-argument*: at n=10 the W1 thresholds get coarse (e rounds from small fractions), weakening an already-gross signal further. Assessment: acceptable because P2 removes per-wave W1 anyway.
- **P2 — Split the metrics by what survives overlap**: W2 + W3 run **per-wave** (rule-scoped, overlap-safe); W1 runs on **one SHARED campaign window** spanning all of U1b (global metric measured globally, segmented by staleness events exactly as the pilot was, same MET/UNMET arithmetic against a campaign baseline, K=3 per campaign window). *Rationale*: this dissolves 10.6(b)'s attribution problem instead of working around it, and collapses 10.6(c)'s contagion cost — a staleness event re-baselines ONE shared window, not every open wave window. *Counter-argument*: a shared W1 cannot name which wave caused a degradation — but per-wave W1 under overlap couldn't either (that is 10.6(b)'s finding); if the shared W1 ever goes UNMET, the campaign pauses and the recent waves are re-examined via their per-wave W2 evidence.
- **P3 — Waves MAY overlap; throughput is bounded by Peter's review cadence, not window serialization.** *Rationale*: with P2, nothing in the measurement requires serializing; the serialization-math projection above then prices in at "Peter's merge cadence," which is the real constraint the review-bandwidth ceiling already named. *Counter-argument*: overlapping waves increase concurrent cognitive load on the sole reviewer; if that chafes in practice, serializing is always available — the policy sets the ceiling, not a mandate.

---

## 4. The Dial Decision Point (Req 17.1d / Req 15)

**What the dial is** (outline §4 elective row): a policy doc amending Task-Completion-Protocol scope — NOT machinery — mapping armed checks → the autonomy expansions they purchase (e.g., whether stop-and-wait can relax where a required check mechanically owns the failure mode).

**The decision**: **elect** (author the policy amendment now) or **re-defer with the next trigger named** (Req 15.1).

**Counter-argument restated as required (Req 15.2)**: the dial may be premature at solo scale — the signal it needs (does stop-and-wait chafe under armed gates?) may not meaningfully exist with one human in the loop.

**Pilot-period signal, honestly reported**: no chafe incident was recorded during the window period — but no instrument was watching for one either; "no recorded chafe" is an absence of collection, not a measured zero. **Thurgood's recommendation: RE-DEFER, next trigger = the U1b closeout** (by then, wave-cadence stop-and-wait under armed gates will have been lived with at real volume, and the chafe signal — if it exists — will have had its first fair chance to appear).

**DECIDED (ballot Decision (b)): RE-DEFERRED, next trigger = the U1b closeout** (Peter, 2026-08-02).

---

## 5. Return-Edge First-Exercise Note (Req 17.1e)

The validation→strategy **return edge** (DD2: Thurgood's monthly Civitas health-check review item ↔ Stacy's lessons-synthesis half of `governance/Product-Handoff-Protocol.md`) had its **FIRST EXERCISE as the pilot observation window itself**: window evidence flowed back into strategy through THIS closeout record and its ballot — not through the monthly health check and not through lessons-capture. Neither cadence may later claim the pilot window as its own first exercise (the STACY R1 double-claim guard). The DD2 mutual-naming cross-references land in Task 3.3 (this same unit), after which the return edge is a standing loop with this note as its provenance record.

---

## Linked artifacts

- Window data: `window-dataset.md` (full record incl. J1/J2/J3 + D1–D4 rulings) · Protocol: `measurement-protocol.md` (§1–§7 pre-commitments)
- Trial: `trial-diff-table.md` (NO-DIFFERENCE-DETECTED) · Probe: `probe-evidence.md` (NO GROSS LOSS) · Prune ballot: `.kiro/docs/ballots/2026-07-14-npm-test-imperative-prune.md`
- **Verdict ballot (the U1b gate artifact)**: `.kiro/docs/ballots/2026-08-02-u1-pilot-closeout-verdict.md`
