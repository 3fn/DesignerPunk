# Stacy Consult — F7 Rule Review (2026-09-13, pre-spec record)

*Transcribed from the F7 adjudication session's consult (Stacy, Opus, adversarial process-governance review). Condensed faithfully; verdict, blockers, and data preserved verbatim in substance. This record is a Spec 127 design input.*

**Verdict: ADOPT MODIFIED.** The rule as originally proposed is a net downgrade of a standard that already exists and is already being ignored — and it catches the half of the F7 pattern that never reached a consumer while missing the half that did.

## B1 (BLOCKING) — The proposed rule is WEAKER than the standard Spec 112 already violated

`governance/Process-Spec-Planning.md:1818-1853` (Tier 3, parent tasks) already mandates Success Criteria Verification with per-criterion **Criterion → Evidence → Verification → Example** (worked example :2011-2032). Spec 112's `task-6-completion.md` shipped a two-column `Criterion | Status` table — **the Evidence/Verification columns were deleted**, which is what made a false ✅ costless. The proposed "reproduce all criteria verbatim + ⚠️" rule is satisfiable by exactly that failed two-column shape. Also found: parent 6's table contains an **invented row** ("Intentional changes documented ✅") that does not exist in tasks.md — fabrication is a fifth mutation class (drop / reword / relax / omit-doc / invent). The rule must be **exact-set** (no additions), with a **mandatory Evidence cell** (artifact path, test name, or command + result; prose-only evidence non-compliant on its face).

Ground truth, Spec 112 task 6 (5 criteria → 4 doc rows): "pass WCAG AA" reworded to "evaluated" ✅; green success.text criterion DROPPED; ΔE < 1 relaxed to < 3 ✅; Spec 106 contract-test criterion DROPPED; one row INVENTED.

## B2 (BLOCKING) — Catch-rate: the transcription rule misses both consumer-reaching escapes

Scored against the audit's 12 discrepancies: fully caught **2 of 12** (parents 4 and 6 — drop/reword/relax/invent). NOT caught: the false-✅-on-a-reproduced-row class (parents 3, 5, 5.1, 7) — verbatim transcription is fully compatible with all of them; the doc-absence class (F6's 4 missing docs — no table to police); and **0 of 5 unshipped-work findings, including both consumer-reaching escapes** (v12.0.3 semantic RGBA; ~3 months of legacy Figma hex). The audit's own "(modified)-artifact-named-in-task-text-absent-from-diff" check is the one that targets the class that escaped — it belongs in the same ruling. F7 must not be recorded as closed by transcription alone.

## S1 — Compliance base rate (measured, 66 post-PR-gate parent completion docs since 2026-07-01)

- Containing any "Success Criteria" section: **18 (27%)**
- Containing any ⚠️ / ❌ / "Partial" / "not met" marker: **2 (3%)**
- Spec 122 (best-behaved recent spec, 18 per-task criteria blocks / 19 parent docs): 12 reproduce a criteria section, 7 do not; spot-check shows paraphrase-compression alive today.
- **No required check reads completion docs** (all six workflows enumerated). PR gating closes the no-review-at-all half; it does not read a criteria table. The verification-grade standard (#141) binds routed doc reviews, not completion docs. The audit practice is retrospective and unscheduled (found 112's defects 3 months late; two were found by consumer symptoms, not by us).
- Conclusion: the binding constraint is rule NON-ENFORCEMENT, not rule absence. Whatever is adopted needs a mechanical arm or it joins the 73%.

## Functional/ideological split (per classification-map § certainty-calibration doctrine)

- **Criteria-set parity** (doc table = tasks.md set): FUNCTIONAL — string-set equality, mechanically decidable. Precedent for this exact shape: `section-citations` workflow (pure-fs markdown scan, proposed → Peter-armed, register row).
- **Verification honesty** (is the evidence behind each ✅ real): IDEOLOGICAL — no mechanical predicate; education + audit practice own it, forever. The register should record explicitly that no check owns it.

## Q3 — Product-side applicability

Product MCP: index failed, 0 screens/tokens/domain objects — the rule binds a surface with zero current instances (no friction, but no validation-by-use; design will be untested until the first product spec lands). **Required adaptation**: product criteria are user-observable behaviors on N platforms — a single ✅ can hide "met on iOS, unmet on Android." Product-spec parents need a **per-platform status dimension**. Also: the product side already has the cheaper pattern — `Product-Handoff-Protocol.md:83-101` Implementation Report **forced-negative sections** ("Deviations from Spec: None / or list"; "Open Items: None / or list"). The system-side Tier-3 template has no failure vocabulary at all outside the Blocked Task format — that absence is the real template defect behind F7.

## Q4 — Cost honesty and rot modes

Transcription cost ~300-600 tokens / 3-5 min per parent — the wrong number to quote; the true cost is **re-verification per row** (minutes to an hour+), which the rule as worded neither requires nor detects the absence of. Rot modes, ascending severity: (1) defensive ⚠️ (hedging devalues the marker); (2) table-as-ritual (verbatim rows, all ✅, no evidence — most likely rot given the 27% base rate); (3) **Goodhart criteria-dilution upstream** — vaguer tasks.md criteria so nothing can be unmet; invisible to any doc-vs-tasks check because both sides move together. **Name rot mode 3 in the ruling as the next audit's first question.**

## Verdict detail — the modified package

1. **Restore-don't-replace** (amends Process-Spec-Planning Tier 3 + completion-documentation-guide): exact-set verbatim criteria, three mandatory columns `Criterion | Status (✅/⚠️/❌) | Evidence (artifact path, test name, or command + result)`; ✅ with empty/prose-only evidence non-compliant; ⚠️/❌ carry a follow-up link. A deliberate, recorded trade of depth (vs the current 4-part prose form) for actual compliance, justified by the 27% number.
2. **Forced-negative line** (imported from Product-Handoff-Protocol): `Unmet or partially met criteria: None / or list each with follow-up link.` Cannot be satisfied by silence. The part to keep if only one is kept.
3. **Register the functional half as a proposed check** (`completion-criteria-parity`, class functional, owner thurgood, check_state proposed — section-citation-resolution precedent) **plus a second proposed row for the (modified)-vs-diff check** (targets the consumer-reaching class) **plus** an ideological companion entry recording that no check owns verification honesty. (S5, low: a third cheap check — parent ticked ⇒ completion + summary docs exist — F6's class.)

**Scoping riders**: (a) binds parents whose tasks.md defines per-parent criteria; spec-level-criteria specs (119-B pattern) discharge once at closeout; (b) product parents carry per-platform status; (c) no backfill (F6 disposition).

**Recorded counter-argument (Stacy's own)**: three parts + riders may exceed what one spec's evidence has earned; the defensible minimum is part 2 alone. What she would argue hard against: part 1 in the original wording without the evidence cell — "buys the appearance of rigor at the price of codifying the table that failed."

## S2 — Recording form: BALLOT-grade

F5's issue-driven form does not govern here: F7 amends `Process-Spec-Planning.md` + `completion-documentation-guide.md` — process law binding every agent on every parent task. Direct precedent: `.kiro/docs/ballots/2026-07-05-documentation-task-type.md` amended these same documents as a ballot with Stacy as required reviewer (she caught five missed edit sites in that round). Inheriting the lighter form would be quiet precedent drift toward ruling-by-PR on governance law. `governance/**` carve-out keeps it Peter-merged regardless.

## Prior-adjudication check

- `alternative-paths-log.md`: this tension never logged (one unrelated entry). If scoped down, textbook entry with revisit trigger.
- `classification-map.md`: the functional/ideological boundary doctrine is settled law and directly decides the split; `validation-criteria-completeness` is a near-neighbor (contract schemas, not completion docs).
- No lessons-capture record touches completion-claim honesty.
