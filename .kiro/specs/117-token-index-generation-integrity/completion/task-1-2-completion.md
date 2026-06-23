# Task 1.2 Completion: Run Baseline Audit + Classify Divergences

**Date**: 2026-06-13
**Task**: 1.2 — Run the generation-integrity audit over the inventory and classify every divergence (four-bucket + correctTarget + shared-root-cause verdict)
**Type**: Architecture (audit + classification — high judgment)
**Status**: Complete (PROVISIONAL — Finding 2 unresolved)

---

## Execution model

Run as a **phase-shifted lead** collaboration:
- **1.2a — empirical (Thurgood):** built the worktree mechanism + `DiskFreshGenerator` + `cli/run-audit.ts`; ran generate + integrity engine + absolute scan + orphaned-helper scan. → `findings/raw-divergences.md`.
- **1.2b — classification (Ada lead):** source-verified four-bucket classification, `correctTarget`s, and the shared-root-cause verdict. → `findings/classification.md`.
- **1.2c — assembly (Thurgood):** corrected the inventory (N1), logged deferred N1, assembled the certifiable report, enforced completeness. → `findings/audit-report.md`.

---

## Artifacts

- `findings/raw-divergences.md` — empirical evidence pack (1.2a)
- `findings/classification.md` — four-bucket classification + shared-root-cause verdict (1.2b, Ada)
- `findings/audit-report.md` — **certifiable AuditReport synthesis** (1.2c)
- `src/tools/integrity/inventory.ts` — N1 correction (BlendUtilities removed, rationale preserved)
- `.kiro/issues/2026-06-13-blendutilities-not-generated.md` — deferred N1 finding
- `.kiro/issues/2026-06-13-token-index-generation-gaps.md` — originating issue updated (audit-complete status)

---

## Outcome (headline)

**Shared code root cause CONFIRMED.** F1 (R3, token-index rgba) and F3b (R5, theme-varying collapse) both read the post-OKLCH-collapsed `primitive.platforms.web.value`. Proof: `white100` shows `light.base === dark.base === white`, while the canonical dist resolves `color.structure.canvas` to `light-dark(white, near-black)`. → `sharedRootCauseConfirmed: true` → **recommend merging Task 2 (R3) + Task 4 (R5)**.

Per-finding: F1 = (a) migration-gap, correctTarget neither · F3a = (b)→(c), correctTarget committed (+ N2 dist-side folds in) · F3b = (b), correctTarget neither-exactly (true target = dist mode-set, not committed's 10).

---

## Validation

- ✅ Clean audit re-run after inventory correction — only F1/F3a/F3b; no false BlendUtilities noise.
- ✅ `inventory.ts` diagnostics clean (no syntax/type errors).
- ✅ Completeness: every inventory artifact diffed **and** classified; no gaps.
- ✅ Orphaned-helper scan: `getOklchMetadata` confirmed test-only import.
- ✅ New findings logged: N1 (deferred issue), N2 (folded into R4 scope).
- ⚠️ **PROVISIONAL**: `documentedCliRuns: false`, `configLoadEquivalentToWorkaround: unverified` — certification awaits documented-CLI reproduction (Task 5.3 Blocked-Task).

---

## Hand-off to Task 1.3 (Peter's checkpoint)

The audit-report's "Recommendations to the DecisionRecord" feed the checkpoint. The one substantive decision: **ratify merging Tasks 2 & 4** (shared root cause). Scope notes: R4 must cover `dist/ComponentTokens.*` (N2); R5's correct target is dist's mode-set (reconcile 10-vs-7), not committed's 10.

Worktree `/tmp/dp117-audit` retained for the checkpoint; teardown after 1.3.
