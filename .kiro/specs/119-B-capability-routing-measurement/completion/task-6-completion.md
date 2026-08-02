# Task 6 Completion: AICP Certainty-Calibration Prose Refinement

**Date**: 2026-08-02
**Task**: 6 — Refine the AI-Collaboration-Principles calibration prose
**Type**: Documentation · **Validation**: Tier 1
**Unit**: U4 — AICP prose refinement (`task/119-B-u4-aicp-refinement`, single-parent micro-unit; branched from `main` after U3's merge)
**Status**: Complete on branch

---

## What was done (design § 4b, applied exactly)

Three surgical changes to `.kiro/steering/AI-Collaboration-Principles.md` § "Certainty Calibration: Finding Guidance Before You Guess":

1. **Forward-compat note discharged by fulfillment** (R8 AC1): the 119-A→119-B note is replaced with the one-line settled reference — rule formalized per `governance/classification-map.md § "certainty-calibration"` (entry-id grammar, R1 AC4); signal contract stated: `matchConfidence: strong | partial | none`, with `viability`/`rank` separate and never collapsed.
2. **Signal named precisely with the hedge** (R8 AC3 boundary): the old paraphrase ("mirrors Spec 121's shipped matchConfidence") lived INSIDE the discharged note — **changes 1 and 2 share ONE removal** (Ada dR1 overlap note; counted once in the blade record). Change 2's residual scope: step 2's unnamed "match strength" now names the emitted `matchConfidence` signal in-line. The settled reference carries the emitting-tools enumeration (`find_docs` incl. zero-hit top-level `"none"`; keyworded `find_components`) with the illustrative hedge and cites the register entry as the canonical enumeration home — this surface never independently asserts the list (the 4a fork guard).
3. **Frozen anchors preserved verbatim-in-substance** (R8 AC1/AC5), verified against the diff:
   - 3-step structure (Search before guessing → Weight by match strength → When still unsure, surface it): intact, step count and order unchanged.
   - Trigger phrase "**unsure where guidance lives**": byte-identical, untouched.
   - strong/partial/none tier semantics (act / candidate-confirm / never-fabricate): the three bullets are byte-identical.
   - Go/no-go contract (propose best-fit + confidence → human go/no-go on partial; empty-contract handling on none): byte-identical (lives in the untouched bullets + step 3).
   - Trigger scope NOT expanded (discovery-time where-does-guidance-live only — no generalization into an epistemic protocol).

Also: header `Last Reviewed` → 2026-08-02.

## Blade-verdict record (R8 AC2, per `pilot-row-assessment.md` format — ONE removal)

| Clause | Blade 1 (teach vs. restate) | Blade 2 (churn fit) | Sub-rules | Call |
|--------|------------------------------|---------------------|-----------|------|
| Forward-compat note (AICP § Certainty Calibration, former :90 blockquote) | Teaching content (rule-mirrors-signal + "119-B will formalize") is **superseded by the settled reference** — the note completing its own design; discharge-by-fulfillment, not loss | **Volatile by construction**: names spec numbers (119-A→119-B, 121, 122) and a pre-formalization state — stale the moment U4 merges | Changes 1/2 overlap = ONE removal (the paraphrase lived inside the note); change 2's residual is an ADDITION (step-2 signal naming), not a removal | **PRUNE→REPLACE with settled reference** |
| 3-step structure, trigger phrase, tier bullets, go/no-go contract | Frozen anchors (R8 AC1/AC5) | — | — | **KEEP verbatim-in-substance — verified untouched in the diff** |

Education-vs-verification disposition consistent with the R1 register row (R8 AC2): education KEEPs the canonical prose here; verification stays `none` — nothing in this edit adds imperative gate-restatement.

## Sequencing + window discipline

- **Measurement-gated, satisfied**: U2 merged (PR #99) before this unit branched (R8 AC4) — branch cut from post-U3 `main`.
- **Not a window trigger surface** (R10 AC4): AICP is not in Appendix A1; ordinary PR. No Task-Completion-Protocol or start-up-tasks edits were needed (the conditional trigger-surface clause did not fire). No regen: the 4c per-agent propagation cue is U-final's, NOT this task's — this unit deliberately merges before the generated cue goes live (the U4-before-U-final soft ordering, avoiding the undischarged-note + live-cue transient).
- **Index rebuild run in-task** (R11 AC5, per the task line): healthy, 83 docs, 0 errors/warnings. Honest nuance for the record: AICP is one of the 9 identity docs delivered by Kiro always-load + CLAUDE.md `@`-import; it is not among the 83 MCP-indexed governance docs, so the rebuild confirms zero index impact rather than reindexing the edited file. The register citation the new prose points at was resolution-verified at Task 1 (sectionId s15) and the index is unchanged since.

## Requirements traceability

- **R8 AC1** — refine-not-rewrite: one blockquote replaced, one line annotated, anchors verbatim-in-substance (diff is 3 lines + header date). ✓
- **R8 AC2** — blade verdicts recorded above, per the settled prune methodology; consistent with the register row. ✓
- **R8 AC4** — merged-after-U2 sequencing honored; no trigger-surface edits. ✓
- **R8 AC5** — agent-side contract + trigger scope preserved (anchor checklist above). ✓
- **R11 AC5** — rebuild run in-task (with the identity-doc nuance recorded). ✓

## Delegated-tier note (TCP exception-based capture)

Planned stamp: Thurgood (Sonnet) — three fully-designed changes. Actual: main-loop session (Fable 5), Peter's explicit go. Agent-evolution: none. Model-evolution: over-tier for a settled-design edit; accepted for continuity.
