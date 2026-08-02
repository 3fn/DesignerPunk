# Task 9 Summary: Batched Canonical Edits + THE ONE Regen (119-B)

**Date**: 2026-08-02 · **Unit**: U-final (Tasks 8 + 9; the unit PR) · **Type**: Implementation

The audit's owner-confirmed dispositions landed as one batched regen: **97 generic cues promoted to doc-id routes** (`THEN consult <doc> (summary-first)`), **8 route additions** including both Spec-118 gap-fill rows and both (a)-grade section routes, **2 knowledge-fallback additions**, **the certainty-calibration pointer cue** (one shared canonical snippet rendered into all 8 prompts), and **the Process-Development-Workflow fold-item** (32 legacy snippets → id form).

- **R6 AC3 amended by Peter (2026-08-02)**: implementation exposed that the (b)-route form was unbuildable under the shipped generator — escalated, ruled, and landed as a minimal 5-file generator change (optional section, summary-first render, doc-grain sweep leg, replaces-on-routes) with tests.
- Two generator gates bit during landing (emission gate on a paraphrased heading; the earlier hand-placed-registry lesson held) — both resolved at canonical source.
- Verification: sweep-1..8 PASS, canonical-vs-truth clean, diff-guard full-run-green, full suite 378/9,020 green, every route spot-verified at its grain, zero-hit `find_docs` trigger re-probed (`matchConfidence: "none"` confirmed).
- Window: closed before this task (R10 sunset) — no regen log, by law; the audit trail lives in the completion docs + findings verification record.
