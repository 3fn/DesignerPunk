# Task 4.1 Completion: Experiment 3 — Boundary Call + Feasibility Spike

**Date**: 2026-07-14
**Task**: 4.1 (subtask of Task 4 — U2: Net-New Checks + Re-arms)
**Type**: Architecture | **Validation**: Tier 3 - Comprehensive
**Agent**: Ada (Opus) — planned agent, no divergence. Boundary call + FP/FN adjudication are token-owner judgment; Thurgood (Sonnet) audits this evidence and lands the register entry FROM the adjudication (Ada does NOT write `governance/classification-map.md`).
**Traces**: Reqs 16.1–16.5; Design C9

---

## Artifacts Created

- `.kiro/specs/125-B-classification-map/completion/u2/exp3-spike-evidence.md` — the pinned evidence artifact (boundary call + rationale, labeled ground set, marker-form rules, FP/FN counts, hygiene caveat as recorded finding, feasibility verdict).
- `.kiro/specs/125-B-classification-map/completion/u2/exp3-detect.sh` — throwaway detection prototype (bash diff-scanner, `--corpus` + single-commit modes). Confined to the spec dir; not wired, not standing tooling.

## What Was Done

### Part 1 — the boundary call (recorded)
Classified "no autonomous token creation" as **operational** — it protects the primitive→semantic→component hierarchy and namespace coherence (workflow integrity), not a functional/mathematical invariant and not an ideological position. The contested "functional (protects the math)" reading is recorded and rejected with rationale. Recorded the clean split — check verifies the sanctioned PATH (workflow hygiene), education owns mathematical fit + semantic correctness + the approval itself — and the **hygiene caveat as a RECORDED FINDING per Req 16.3**: an approval-marker check on `src/tokens/**` can detect *that a token appeared* but never *that its creation was sanctioned* (approval is out-of-band), nor its correctness. Recommended verification disposition **warn** / check_state **proposed** for Thurgood to lift into the register entry.

### Part 2 — the feasibility spike (against `src/tokens/**` SOURCE only)
- **Marker-form rules decided in-task** (my call as owner): positives = shape (b) new `*Tokens.ts` file, or shape (a) new token key — sub-forms (a1) flat bare identifier, (a2) flat quoted dotted-string, (a3) nested/inline leaf. Excluded: renames, value edits, nested structural props, grouping containers. Two strata (naive vs refined) run to expose the noise floor.
- **Labeled ground set: 13 commits**, Ada-adjudicated — 10 genuine-creation (8 clearly sanctioned, 2 murky drive-bys) + 3 non-creation (1 rename, 2 value/migration). Both classes represented.
- **FP/FN counted, honestly reported.** Commit/diff level: TP=10, FP=1 (rename), FN=0, TN=2 (recall 100%, precision ~91%). **Token level exposes the real weakness**: flat families detect ~100% precision/recall; the hierarchical family **inverts** (commit `bc752a78`: 4 structural FP grouping-containers flagged, 18 leaf tokens missed). Governance-lens: 8/10 true detections were sanctioned → historical PPV for "unsanctioned creation" ≈ 0.
- **Feasibility verdict**: structural creation-detection is *merely hard* (mechanizable with bounded noise for flat families, needs AST for nested); approval-verification is *unmechanizable* at the diff surface. Strongest honest check = a **warn** hygiene tripwire routing new-token diffs to human confirmation — complements education, never a barrier. Feeds U3's diff-gate design.

## Implementation Notes

- **Req 9.3 escalate-don't-build stop: NOT triggered.** The prototype stayed a throwaway diff-scanner; it did not trend toward standing tooling. A cleanly-separating (a3) detector WOULD need AST/type awareness — I flagged that as the point where it would cross into standing tooling, and left it as U3's deliberate decision rather than building it here.
- **A third marker shape emerged during the spike** that the frame's (a)/(b) sketch did not anticipate: inline single-line leaf tokens (`minimal: { value: 'space025' }`) in hierarchical semantic families. Recorded as (a3); it is the structural reason nested-family detection fails. This is the spike doing its job — surfacing a shape the design frame couldn't see in advance.
- The rename case (`c796eb46`, radiusFull→radiusMax) is the lone structural FP and is mechanically removable via added-key/removed-key pairing; noted as the one cheap precision win for any armed check.
- Scope honored: `src/tokens/**` source only; generated output excluded by path before counting (Req 16.2). No `governance/**` writes — the register entry is Thurgood's to land from this adjudication (per the 1.2/1.3/1.4 pattern, ADA tasks-R1 accepted).

## Validation (Tier 3)

- Evidence artifact checked against every AC of Req 16: 16.1 boundary call classified + recorded (operational, contested reading preserved) ✓; 16.2 prototyped against `src/tokens/**` source, unarmed, output excluded by path ✓; 16.3 citable note with FP/FN against historical diffs + hygiene caveat as recorded finding ✓; 16.4 Ada's logic, throwaway, 9.3 stop applied ✓; 16.5 placement early-U2, reconciled against these criteria ✓. C9 counting frame honored (positives = new token def; FP = flagged-but-sanctioned; FN = missed unsanctioned/genuine addition; ground set = Ada-adjudicated historical token-addition commits).
- Prototype reproducibility verified live: `exp3-detect.sh --corpus` and single-commit mode both run against the repo history in this environment; every table row in the evidence artifact is reproducible from the named commit.
- No source/token-index change and no doc-corpus change landed → no MCP rebuild required for this subtask.

## Next (not started, per stop-and-wait)

- 4.2 (Lina) runs in parallel — Stemma pre-arm audits. Untouched.
- Thurgood audits this evidence and lands the U2 register entry for the token-creation rule from the Part 1 adjudication (warn / proposed).
- Awaiting user authorization before any further work.

---

## Steward audit + register landing (Thurgood)

**Audit verdict: PASS.** Each Req 16.1–16.5 / Design C9 element exists in `exp3-spike-evidence.md` and is internally consistent; I re-verified existence and consistency, not Ada's token-domain judgments (owner authority — not re-adjudicated):

- **16.1 boundary call**: Part 1 classifies the rule `operational` with rationale; the contested "functional (protects the math)" reading is recorded, not suppressed. ✓
- **16.2 scope + unarmed**: Part 2 scope guard is explicitly `src/tokens/**/*.ts` excluding `__tests__`; generated output excluded by path before counting; doc states nothing is armed or wired as a check. ✓
- **16.3 citable note with FP/FN + hygiene caveat as recorded finding**: boundary-call record (Part 1) + prototype findings present; FP/FN counted at both commit level (TP=10, FP=1, FN=0, TN=2) and token level (flat families ~100%, hierarchical family inverted — 4 structural FP + 18 token-level FN in commit `bc752a78`) — the token-level inversion is reported plainly rather than smoothed over, which is the honesty standard this audit checked for. A dedicated "RECORDED FINDING — the hygiene caveat (Req 16.3)" section states the check verifies the sanctioned path, never mathematical fit. ✓
- **16.4 ownership + 9.3 stop**: doc header attributes boundary call + FP/FN adjudication to Ada, audit to Thurgood; explicitly states "Req 9.3 escalate-don't-build stop: NOT triggered" with rationale (prototype stayed a throwaway diff-scanner; AST-level work flagged as the point that would cross into standing tooling, left to U3). ✓
- **16.5 placement**: produced as an early-U2 subtask (Task 4.1), matching Design C9's placement note; no pre-approval reconciliation needed since requirements/design were already settled. ✓
- **Design C9 counting frame**: positives = new token def (shape a: new key, sub-forms a1/a2/a3; shape b: new `*Tokens.ts` file) — matches C9's (a)/(b) definition. FP applied per C9's strict definition ("flagged diff Ada adjudicates as sanctioned") — explicitly invoked by name in the evidence's Governance-lens FP paragraph. FN counted against the 13-commit Ada-adjudicated ground set, both classes represented (10 genuine-creation incl. 2 murky drive-bys, 3 non-creation). Marker-form rules (a1/a2/a3/b, exclusions for renames/value-edits/structural-props/grouping-containers) stated. ✓

No gaps found; nothing flagged back to Ada.

**Register entry landed**: `no-autonomous-token-creation` in `governance/classification-map.md` § Entries — verified unique and non-substring against the three existing ids (`record-first-ratification`, `npm-test-before-complete`, `tool-boot-smoke`). Fields landed verbatim from Ada's adjudication: `boundary_call.class: operational` (hierarchy/namespace-coherence rationale, contested reading rejected); `verification.disposition: warn`, `owner: ada`, `check_state: proposed`, `checks: []` (the U3 diff-gate candidate designed from this spike); `education.disposition: KEEP` (education retains mathematical fit / semantic-tier correctness / the approval itself — the clean split from Part 1); no `crossRef` (the evidence file is cited in `history`; no external half points at this entry yet); `history` dated 2026-07-14, attributed `by: thurgood`, citing the evidence artifact path. Nothing substantive changed from Ada's adjudication — only the register-schema shape was applied.
