# Task 9 Completion: Batched Canonical Edits + THE ONE Regen (parent)

**Date**: 2026-08-02
**Task**: 9 (parent) — Batched canonical edits + the ONE regen
**Type**: Implementation · **Validation**: Tier 3
**Unit**: U-final (`task/119-B-ufinal-catalog-regen`; final parent — unit PR opens at this completion, carrying Tasks 8 + 9)
**Status**: Complete on branch; subtasks 9.1–9.5 complete (9.5 = the PR itself)

---

## What landed (one regen event, everything through the generator)

Per the owner-confirmed `findings/catalog-routing-audit.md` (the PR's declared content-review basis): **97 (b) promotions + 8 route additions (incl. the two 118 rows and both (a) rows) + 2 fallback additions + the 4c calibration cue + the PDW 32-snippet fold-item + Ada's row re-verify** — one `generate.ts` run, 274 files, sweep-1..8 PASS, canonical-vs-truth clean, diff-guard full-run-green.

**The consequential event of this task**: implementation exposed that the (b)-route form was unbuildable under the shipped generator — a premise gap running through requirements, design, and four reviews. Escalated with options; **Peter amended R6 AC3 (2026-08-02, recorded)** scoped to the minimal enabling change (optional `section` + section-less render + doc-grain sweep leg + `replaces` on routes for demotion coverage). The amendment is cited in 9.2's completion doc, the findings' verification record, and the PR body. The class-fit renderer placement was deliberately NOT folded in — it stays a recorded accepted misfit.

Second gate-bite of note: the generator's emission gate refused the design's paraphrased 118 heading; the spec-stamped verbatim heading ("CI-Enforced Guards (Spec 118)") landed instead — the armed (b)-downgrade path was not needed.

## Requirements traceability

- **R6 AC2** — all fixes authored as canonical-source edits, delivered through generate → sweep-1 → diff-guard; nothing hand-placed. ✓
- **R6 AC3** — honored as amended (Peter 2026-08-02); amendment scope recorded; no other machinery, no new output classes (the (b) render is a branch of the existing doc-route class). ✓
- **R6 AC4 / R7 AC4** — edits batched into this single regen unit; every promoted/added route spot-verified pre-PR at its declared grain (sweep-1 + emission gate). ✓
- **R7 AC1** — both 118 rows live: Lina's verbatim (annotations in findings), Thurgood's at the corrected verbatim heading. ✓
- **R7 AC2** — Ada's module-resolution row re-verified present + resolving (formal record in findings). ✓
- **R8 AC3** — per-agent propagation = the ONE shared 4c cue member (signal-scoped, hedged, crossRef to the register's enumeration home), riding this regen. ✓
- **R10 AC1–5** — vacuously satisfied (window closed; AC6 sunset); AC2-style record kept anyway (method: dataset read; result: closed at N=20). No regen-log by law. ✓
- **R5 AC3 (fold landing)** — PDW's 32 snippets migrated here, 0 residual; trail: Task 5 completion doc → findings verification record → PR body. ✓
- **R11 AC5** — docs index rebuilt in-task post-PDW-edit (healthy-degraded per OB-1's designed warning; 83 docs, crossReferences 327). ✓

## Validation (Tier 3)

Full `npm test`: **378 suites / 9,020 tests green**. Agent-generator suite: **27 / 333 green** (incl. the two new amendment tests). Sweeps 1–8 PASS; canonical-vs-truth clean; diff-guard full-run-green. All run locally on this branch, 2026-08-02.

## Delegated-tier note

Planned: Thurgood (Sonnet) — authoring to confirmed dispositions. Actual: main-loop session (Fable 5). The session's judgment surface exceeded the plan in one place — the R6 AC3 collision — which was escalated to Peter rather than decided (correct routing for a settled-law deviation). Agent-evolution: none. Model-evolution: the "authoring to confirmed dispositions" estimate under-anticipated the premise gap; the tier margin absorbed it.
