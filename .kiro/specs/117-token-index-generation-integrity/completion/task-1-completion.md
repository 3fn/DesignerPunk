# Task 1 Completion: Investigation & Baseline Audit

**Date**: 2026-06-13
**Task**: 1. Investigation & Baseline Audit (Parent)
**Type**: Parent / Architecture
**Status**: Complete

---

## Artifacts Created

- `src/tools/integrity/` — the `GenerationIntegrityCheck` engine and supporting modules:
  - `types/index.ts`, `inventory.ts` (BlendUtilities removed per N1; rationale note added), `Normalizer.ts`, `SemanticComparator.ts`, `manifest.ts`, `GenerationIntegrityCheck.ts`, `DiskFreshGenerator.ts`, `cli/run-audit.ts`
- `findings/raw-divergences.md` — empirical evidence pack (committed-vs-fresh, primitive light/dark values, dist `light-dark()` survey)
- `findings/classification.md` — four-bucket provenance classification + shared-root-cause verdict
- `findings/audit-report.md` — the certifiable `AuditReport` (inventory, triaged findings, buckets, (b)→(c) links)
- `findings/decision-record.md` — the dated post-investigation `DecisionRecord` (R1 AC9)
- `.kiro/issues/2026-06-13-blendutilities-not-generated.md` — N1 deferred-issue log
- Updated `.kiro/issues/2026-06-13-token-index-generation-gaps.md` — status/routing + confirmed Finding-2 diagnosis

## Architecture Decisions (ratified at the checkpoint — `decision-record.md`)

1. **Merge R3 + R5** (`sharedRootCauseConfirmed: true`). Both the token-index color value and the theme-varying computation read the post-OKLCH-collapsed `platforms.web.value`, while dist reads the correct mode-resolved OKLCH source. One spine fix, two verified readouts. **Counter-argument considered (Ada D4):** a shared *historical* cause (the migration) is always true and must not trigger a merge — the merge fires only because a shared *code* root cause (the collapsed upstream field both consumers read) was confirmed.
2. **Fold in Finding 2** as Task 2 (the CLI directory-import one-liner) — it is the documented-CLI trust gate; folding it in lifts the audit's `provisional` ceiling.
3. **Defer N1** (BlendUtilities never generated) — logged, removed from inventory; out of scope.
4. **Fold N2 into R4** (`dist/ComponentTokens.*` empty in both committed + fresh) — same root cause as the component-token loading gate; one fix populates both `components.yaml` and `dist/ComponentTokens.*`.

## Implementation Details

The engine performs a **semantic-equality** comparison (volatile fields — ISO timestamps, `lastIndexTime` — normalized; ordering/formatting canonicalized) rather than byte comparison (Design D1). The baseline audit ran committed-vs-fresh across the full inventory via the `ts-node` workaround (documented CLI blocked by Finding 2 → conclusions labeled **provisional** until Task 2 lifts it). Every divergence was classified into the four buckets with `correctTarget` and rationale; (b)→(c) causal links recorded. An orphaned-helper scan ("never imported by a non-test/non-generation module") confirmed `getOklchMetadata` is imported only by its test — orphaned from generation.

## Validation (Tier 3: Comprehensive)

- ✅ `getDiagnostics` clean across `src/tools/integrity/` (incl. `inventory.ts` after the N1 correction).
- ✅ Engine unit tests pass (22, strict-clean) — normalization verified (a changed timestamp is ignored; a changed value is not).
- ✅ Audit re-ran clean after the inventory correction (no false BlendUtilities divergence).
- ✅ Shared-root-cause empirically proven: `white100` shows `light.base === dark.base === rgba(255,255,255,1)` in the index, while dist resolves `--color-structure-canvas: light-dark(oklch(1 0 260), oklch(0.42 0.018 260))`.
- ✅ Finding 2 reproduced via the documented CLI (`node bin/designerpunk.js validate` → directory-import error at `designerpunk.config.ts:16`).

## Success Criteria Verification

| Criterion | Evidence |
|---|---|
| Complete `AuditReport` (all artifacts diffed + classified, (b)→(c) links) | `findings/audit-report.md` |
| Orphaned-helper scan run (test-only excluded) | `getOklchMetadata` test-only import confirmed |
| Finding 2 characterized; baseline `provisional` | Reproduced; config-load equivalence pending Task 2 |
| New findings logged + triaged | N1 deferred (issue logged); N2 folded into R4 |
| Checkpoint → dated `DecisionRecord` w/ kept/revised/rescoped + `sharedRootCauseConfirmed` | `findings/decision-record.md` |
| No fix applied before completion | Confirmed — only the integrity engine + findings exist |

## Requirements Compliance

- ✅ R1 AC1–AC9 (inventory diff, four-bucket classification, completeness, orphaned-helper scan, clean-exit logging, provisional labeling, no-fix-before-audit, checkpoint, dated DecisionRecord).
- ✅ R2 AC1–AC3 foundation — the engine *is* the reusable verification harness (finalized in Task 5).

## Lessons Learned

- **Semantic equality is mandatory**, not optional — volatile fields (timestamps) make byte-equality structurally impossible; the normalization pass is the load-bearing design choice.
- **Orphaned-helper-as-a-class** paid off — a migration that left one connection unmade (`getOklchMetadata`) is a signal to scan siblings.
- **Investigation-first preserved attribution** — establishing the full baseline before any fix kept single-variable attribution intact and let the merge decision rest on evidence, not inference.
- **Honest gap (carried forward):** the registry-pre-population / double-registration characterization (Lina consideration iii) was operationalized into 1.2 but **not traced during the audit**. Rather than claim closure, it was moved into Task 4 — and Lina's R2 light pass reframed it from a blind trace into "the same wrong-axis gate; un-gate both; benign-by-precedent with the semantic-reproduction check as the masking safety net." The gap surfaced a *better* fix framing than the original plan held.

## Integration Points

- The `GenerationIntegrityCheck` engine is the foundation reused by Task 5 (R2 verification + the repeatable drift guard).
- The `DecisionRecord` gates Tasks 2–4 (the informed placeholders were rewritten from it; both light passes confirmed clean).

---

*Investigation phase complete. Build phase begins at Task 2 (CLI one-liner, Ada). Spec files held local per Peter — not committed.*
