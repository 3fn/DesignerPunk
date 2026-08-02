# Task 2 Completion: OB-4 Discovery-Gate Threshold Decision

**Date**: 2026-08-02
**Task**: 2 — Record the OB-4 discovery-gate threshold decision
**Type**: Architecture · **Validation**: Tier 2 (declared deviation from the Architecture→Tier 3 letter — Stacy tR1, named-not-silent: paper decision; this decision record IS the success-criteria verification surface)
**Unit**: U1 — window-free paper decisions (`task/119-B-u1-paper-decisions`)
**Status**: Complete on branch — decision recorded; gate UNCHANGED, so the R2 AC3 conditional did not fire

---

## The decision

**KEEP the gate at rank ≤ 2 with matchConfidence ≥ partial** (the Decision-4 hard bar as shipped: `PASS_RANK_BOUND = 2`, `mcp-server/src/discovery-dry-run/discovery-dry-run.ts:44`; PASS = rank ≤ 2 AND confidence ∈ {strong, partial}; `clearsThreshold` = no WEAK/MISS). **Do not move to reachability-at-strong.**

## Rationale (framed by Decision 4's reachability emphasis and the 10.4 evidence)

1. **The gate guards a behavior, not a presence.** Decision 4's own framing ties the hard gate to "no concept is unreachable" — but *reachable* must mean reachable **in the consuming flow**, and the consumer of `find_docs` results is an agent acting on top-ranked hits. A correct doc at `strong` rank 4, sitting behind three higher-ranked competitors, is reachable in the data-structure sense and unreachable in the behavioral sense: the certainty-calibration rule tells the agent to act on strong matches, and the strong match it sees first is the wrong doc. Rank ≤ 2 is the proxy for top-of-list visibility, which is the property discovery actually needs. Reachability-at-strong would re-anchor the gate on the data-structure sense and stop measuring the failure mode that matters.

2. **The 10.4 evidence cuts FOR the strict gate, not against it.** The four strong-but-rank-3–4 concepts (`color token work`, `shadow token work`, `opacity token work`, `cross-platform implementation patterns`) were exactly the behavioral failure in (1): the intended doc's *title* match was tied by competitors' incidental *mention* matches, with ties falling to directory order. Under reachability-at-strong the gate would have cleared and that ranking defect would have shipped undetected. Under rank ≤ 2 the gate held, forced root-cause analysis, and produced the Layer-3 title rank tie-breaker — a genuine, Peter-approved engine improvement (83/0/0 post-fix, 94% rank-1-strong). The episode OB-4 asks us to learn from is a case study of the strict gate *working*.

3. **Decision 4's anti-arbitrary-rank warning is already discharged by the two-tier structure.** The warning ("an arbitrary rank-quality number blocking a corpus that already resolves everything") targeted the ~80% rank-1-strong figure — which is why Decision 4 made that a review-tripwire SIGNAL, not a gate. That concern does not transfer to the rank ≤ 2 floor: the floor is not a corpus-wide quality percentage but a per-concept visibility bound, and it is the thing that made the gate bite in 10.4. Reachability emphasis is honored where Decision 4 put it — MISS (absent from results) remains the unambiguous catastrophic class — while rank ≤ 2 keeps WEAK meaning "present but not findable in practice."

4. **U3's prune gate is about to consume this threshold, and loosening it now would hollow that gate out.** R4 AC2's question is "does the discovery gate still clear on the title tie-breaker alone, with candidate aliases removed?" The tie-breaker's entire contribution is *rank* movement (it is rank-only by design; `matchConfidence` untouched). A reachability-at-strong gate would be structurally blind to everything the tie-breaker does — aliases whose removal drops docs to rank 5-at-strong would prune "measurement-cleared" while degrading the behavior the prune is required not to degrade. Deciding the threshold before U2/U3 (Decision 5's sequencing rationale) only pays off if the threshold retained is the one with discriminating power for those gates.

## Counter-argument (AICP requirement — the strongest case for reachability-at-strong)

Rank ≤ 2 is still a proxy with a magic number in it. As the corpus grows, near-topic docs can legitimately crowd rank 1–2 (two docs genuinely about adjacent aspects of X), pushing a correct doc to rank 3 *without* any engine defect — and the gate would then force tie-breaker-style rank engineering, or alias churn, to satisfy a bound that no longer tracks a real failure. Reachability-at-strong plus the rank-1-strong signal would never block on rank inflation while still catching true unreachability, and the signal's ~80% tripwire would still surface rank-quality erosion for review. **Assessment**: this is a real long-run risk, but it is exactly the scenario the designed revisit path exists for — it is a *future measured state*, not the current one (current: 94% rank-1-strong, 0 WEAK/MISS, zero evidence of legitimate rank-3 crowding). Trading present discriminating power for protection against a hypothetical future distribution would anchor the weaker gate now on the same kind of unmeasured guess OB-4 exists to prevent.

## R2 AC3 conditional — NOT triggered

The decision keeps the gate, so no change to the dry-run harness's gate assertion is required and none was made: `PASS_RANK_BOUND = 2` and `classify()` (`mcp-server/src/discovery-dry-run/discovery-dry-run.ts:43–45, 140–145`) stand as-is, verified by inspection this task (2026-08-02). No harness run was needed — there is no assertion change to confirm green, and U2 owns the next measured run (running it here would pre-empt U2's D1-dated measurement for no verification gain).

## The designed revisit path (Decision 5 — the anchor is revisitable, visibly)

U2's case study carries an **OB-4 input section** (design § Component 5, item 5): the measured rank distribution — specifically how many concepts sit strong-but-rank>2. IF that distribution contradicts this decision (e.g., a material strong-but-rank-3+ tail with no engine defect behind it — the counter-argument's scenario made real), THEN the revisit is a **recorded amendment** in the U2 findings plus an update to this decision's record, and the harness gate assertion changes in that same task per R2 AC3 — mechanically actionable, never a silent survival of this anchor. Decision 5's accepted status-quo-weight risk is restated here so the U2 executor reads it: the amendment must overcome this record, and that is deliberate; overcoming it requires only the measured distribution, not re-litigation.

## OB-4 disposition

OB-4's done-when ("119-B records a deliberate threshold decision — keep rank ≤ 2, or move to reachability-at-strong — with rationale") is satisfied by this record: **KEEP rank ≤ 2**, rationale above. The ledger entry (`119-B-deferred-obligations.md` § OB-4) can be marked CLOSED citing this doc at the U1 merge — the ledger lives outside this unit's file set; closing line lands with U-close if not sooner.

## Requirements traceability

- **R2 AC1** — chosen gate stated (keep rank ≤ 2) with rationale framed by Decision 4's reachability emphasis (§ Rationale 1, 3) and the 10.4 four-concepts evidence (§ Rationale 2). ✓
- **R2 AC2** — window-free paper decision, zero corpus edits, sequenced in U1. ✓ (this task touches only spec-local files)
- **R2 AC3** — conditional not triggered; harness assertion verified unchanged and correct by inspection. ✓

## Delegated-tier note (TCP exception-based capture)

Planned stamp: Thurgood (Opus) — decide-class. Actual: executed directly in the main-loop session (Fable 5, above the Opus tier) under Peter's explicit U1 execution grant. Reason: decide-class call taken at or above the planned tier with full evidence context loaded (119-A Decision 4, 10.4 gate-resolution record, harness source). Agent-evolution signal: none. Model-evolution signal: none (tier met or exceeded).
