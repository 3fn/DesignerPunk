# U1b Campaign — Measurement Protocol

**Date**: 2026-08-02
**Task**: 125-B Task 5.1 (campaign roster + measurement protocol + shared-window arming)
**Authority chain**: verdict ballot `.kiro/docs/ballots/2026-08-02-u1-pilot-closeout-verdict.md` (P1–P3 + Decision 0) → tasks.md § "5. U1b" campaign law (settled at PR #112's merge, R1 round incorporated, endogenous-segmentation ruling folded) → THIS document (the Req 8.1 pre-commitment discipline at campaign grain; transcribed before wave 1's prune, per the pilot's D2 lesson applied forward).
**Pilot protocol**: `../pilot/measurement-protocol.md` — its §1 rubric, §2 difference criteria, §3 arithmetic, and §5 recipes are INHERITED by citation; this document records only what the campaign changes or adds. Nothing here amends a pilot pre-commitment.

---

## 1. Ratified campaign parameters (from the ballot; changing any of these requires a Peter ruling)

- **N = 10 observed PRs per wave window.** W2 (re-accretion) + W3 (churn, report-only) run per-wave. Per-wave windows carry NO baseline and NO segments (they need neither).
- **W1 (first-push failure rate) runs on ONE shared campaign window** spanning all of U1b: single campaign baseline **B = 2** (§4 below), DD8 segmenting, K=3, `e = B×(n/20)` per segment, evaluability floor ≥5 **on campaign segments** (never a wave's 10-PR bucket). MET/UNMET/INDETERMINATE thresholds identical to pilot §3.1.
- **Campaign-window close condition (event-denominated)**: the campaign window closes at the close of the FINAL wave's window; it can never close while any wave window remains open.
- **Waves MAY overlap** (windows overlap; trials serialize — §5). Wave prune PRs merge at the START of a Peter work burst.

## 2. Segmentation (Peter's ruling, 2026-08-02 — encoded in the settled campaign law)

**Campaign-endogenous events do NOT segment the shared window**: wave prune merges, wave ballots, and register/roster PRs are the measured intervention. **Exogenous boundary events** (each segments; K=3 per campaign window): a new required check arming (U3's included), a 122 regeneration from OUTSIDE the campaign touching any pruned rule's surfaces, a required-check-set change. The generated-surface anomaly rule (pilot Appendix A1 item 4) applies to every wave: a pruned pattern reappearing on a generated surface with no source change is an ANOMALY, never a W2 hit.

## 3. Written measurement rules (closeout §2 A1–A4 — law for every pass)

1. **A1 — First-push pinning by RECONSTRUCTION (default method)**: first-push SHA = last commit with `committedDate ≤ createdAt + 120s`; check-runs queried against that SHA; no concluded required checks → INDETERMINATE, never converted either way. Observation passes are EVENT-anchored (wave open / session-start-while-open / wave close) — no calendar cadence exists.
2. **A2 — Overshoot (J3 ruling)**: a batch observation that crosses a close condition counts the ENTIRE closing batch.
3. **A3 — Roll-up reading (Decision 0)**: pilot §3.2 clause 1 governs — MET ⇔ MET in every EVALUABLE segment with ≥1 evaluable; empty/not-evaluable segments never force INDETERMINATE.
4. **A4 — Applicability scoring**: the pilot §1 N/A discipline (an action that never becomes applicable scores N/A, not ABSENT).

*(These four + §1's parameters are also recorded in the register's methodology notes — `governance/classification-map.md` — the durable MCP-served home.)*

## 4. Campaign baseline (computed at 5.1, BEFORE wave 1's prune — never late)

**B = 2**, over the 20 most recent qualifying PRs preceding the campaign (filter `task/*|fix/*|chore/*`; §6 exclusions applied), pinned 2026-08-02 (repo head `5382a430`, post-#112):

**Set**: #90 #91 #92 #93 #94 #96 #97 #98 #99 #100 #101 #102 #103 #105 #106 #107 #108 #109 #110 #111
**Failures (2)**: **#93** (`122-diff-guard` on `efca4f7c55`) and **#103** (`122-diff-guard` on `504c915d17`) — both carried from the pilot dataset's pinned outcomes. #90–#103 outcomes inherited from the merged pilot dataset (same recipe, same SHAs); #105–#111 reconstructed and queried this pass — all first-push green (19/19 concluded checks each): 105:`86f3da9691` 106:`702c823287` 107:`c4cf007db3` 108:`a0255f8c5d` 109:`e1af3959cb` 110:`992917e6a7` 111:`9d16f03160`.
**Excluded from the set**: #95, #104 (dataset-transcription instruments — J2 ruled + precedent), #112 (the U1b amendment — class-3 instrument).
**Recorded judgments (open for Peter's ratification at this PR's merge; tallies robust either way):**
- **J-C1 — #105 (the U1-c closeout PR) INCLUDED**: its purpose is spec work product (closeout record + ballot + return-edge refs), not measurement instrumentation — the class-3 test is "purpose is instrumentation," not "any 125-B work." Excluding it changes the set's tail (#89 slides in — first-push PASS per the pilot dataset) and leaves **B = 2 unchanged**.
- **J-C2 — #111 (OPEN at computation) INCLUDED**: qualification is at open (DD6); its first-push outcome is concluded and green. Excluding it slides #89 in; **B = 2 unchanged**.
- **Staleness of B**: if qualifying PRs merge between this computation and wave 1's prune, the wave-1 open pass RECOMPUTES B over the then-20-most-recent (same deterministic recipe) and records both values; the recomputation is mechanical, not a judgment.

**Required-check set (frozen for the campaign, read from branch protection 2026-08-02 — identical to the pilot's 18)**: Consumer Guard · Check package name drift · lane-typecheck · lane-build-validate · lane-functional-root · lane-mcp-server-suite · lane-application-mcp-server-suite · 122-diff-guard · 122-canonical-vs-truth · 122-sweep-1-refs … 122-sweep-8-demotion (8) · 125B-tool-boot-smoke. *(`122-setup` runs on PRs but is NOT a required context; it is not counted either way.)* First-push FAILURE iff any check from this set present on the pinned SHA concluded `failure`. A change to this set is an EXOGENOUS boundary event (§2).

## 5. Trial isolation (campaign law, restated for the executor)

At most ONE cloned-agent trial in flight repo-wide at any time; each trial in its own isolated clone; substitution integrity verified at run START and run END (the pilot's Run-1 stash-leak voided both arms and was detectable only post-hoc). DD5 void-ceiling accounting per wave.

## 6. Instrument-PR exclusion (pilot §4's three classes + open clause, campaign-named)

1. **Arming PRs** (U3's arming included); 2. **ALL gate-bite throwaway PRs** (U3's bites included); 3. **Any PR whose purpose is 125-B instrumentation** — campaign-plan, dataset-transcription, register-only/roster PRs (J2 precedent). **Plus the open judgment clause**: judgment exclusions recorded per-PR with reasoning in the relevant exclusion table; contested → Peter (J1/J3 pattern).

## 7. Per-wave A1/A2-equivalent freeze mechanics (the pilot Appendix-fill pattern, per wave)

Each wave's dataset is created at its prune merge (wave-open) with two frozen appendices, filled from the wave's RATIFIED candidate prune diff (5.W(a)'s artifact):
- **Wave-A1 (surfaces)**: every file the wave's rules live on — pruned surfaces AND education-only surfaces of the same rules (scanned; re-accretion INTO them is a hit) AND generated surfaces (scanned; anomaly rule §2 applies, never W2-counted).
- **Wave-A2 (patterns)**: the pruned imperative literals, verbatim from the ratified diff — never the retained teaching forms.
Frozen at wave-open; a mid-wave change to either is a §7-class amendment (recorded, segment flagged INDETERMINATE unless Peter rules otherwise — pilot §7 inherited).

## 8. Datasets (hand-maintained; manual recipes only — escalate-don't-build)

- **`campaign-window-dataset.md`** (shared W1): header (baseline §4, check set, ruling §2), observed-PR table (all qualifying PRs opened after wave 1's prune, campaign-wide), exclusion table, segment log (exogenous events only), wall-clock record (datum).
- **`wave-N-dataset.md`** (per wave): header (prune merge SHA/time, frozen Wave-A1/A2), observed-PR table to N=10, W2 scan log per pass, W3 churn log, wave verdicts.
- One observation pass updates BOTH the wave dataset(s) and the campaign dataset. If any recipe seems to need a script outside the spec dir or a CI job: STOP, escalate (Reqs 8.6/9.3).
