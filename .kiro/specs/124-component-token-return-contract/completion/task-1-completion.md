# Task 1 Completion: Spec Ratification & Pre-Change Baseline Snapshot

**Date**: 2026-06-26
**Task**: 1 — Spec ratification & baseline snapshot
**Type**: Setup
**Status**: **DONE** — ratified by Peter 2026-06-26; baseline captured.
**Validation Tier**: Tier 1 — Minimal
**Agent**: Peter (ratifies); Thurgood records
**Branch**: `spec-118-module-resolution-coherence`

---

## What was done

The requirements and design were ratified and the pre-change green-before state was captured so R6 (regenerated `token-index/` is value- AND order-identical to committed) has a reference to reproduce against.

- **Ratification.** Peter ratified requirements + design on 2026-06-26 after a **two-lead pre-ratification review** (Lina + Ada). Both leads returned **CONDITIONAL GO**; the three mechanical block items they raised were resolved in spec text before ratification:
  1. **Dedup the frozen brand string** — a single exported `TOKEN_CONTRACT_BRAND` source (caveat a), no duplicated literals.
  2. **Add the JSDoc-update work to Task 3.1** — so shipped docs stop describing the retired registration side effect.
  3. **Add the 5th migration file** — Ada caught `ComponentTokenRegistry.test.ts`'s `allowOverwrite: true` case; the "4-file surface" was not exhaustive (and even the 5-file count later proved low — see Task 3).
  No architectural fork was left open: the locked decisions (Option-A non-enumerable string-key brand; harvest-as-sole-writer; `allowOverwrite` retirement; preserve-scan-order pending the Task-2 spike) were encoded in the design before ratification.

- **Pre-change baseline.** Captured in the Task 2 spike run (`findings/r6-ordering-spike.md` §5):
  - `npm run build`: **green** (only pre-existing package.json export-condition-ordering warnings; no errors).
  - `npx tsc --noEmit --skipLibCheck`: **green** (exit 0, no diagnostics).
  - `npx designerpunk generate`: ran to completion but emitted **"Component tokens: 0"** and **"No component token files found"**; `git diff token-index/` was **NOT empty** (regenerated to `tokens: {}`), restored via `git checkout`.

## The important baseline caveat (recorded honestly)

The "Component tokens: 0" / non-empty `git diff` at baseline is **not** a healthy green-before state for R6 — it is **the exact defect Spec 124 fixes**. On this branch (118 paused at 9.5.3), the dual-instance module-resolution split causes `defineComponentTokens`'s side-effect registration to land in a *different* `ComponentTokenRegistry` instance than `getAll()` reads, so component tokens silently zero. `tsc` and `build` are green; only the side-effect registry seam is broken.

**Consequence:** R6's clean-diff gate is only meaningful **after** Task 3 restores single-writer behavior. The committed 33-token `components.yaml` reference (produced under Spec 117 with a single registry instance) is the order/value target Task 3's harvest must reproduce. This is consistent with the 118 PAUSE, not a regression introduced here.

## Verification

- Ratification recorded in `tasks.md` (Status line; Task 1/1.1 checked).
- Baseline commands and outputs recorded verbatim in `findings/r6-ordering-spike.md` §5.

## Artifacts

`requirements.md`, `design.md`, `tasks.md` (ratified); `findings/r6-ordering-spike.md` §5 (baseline). _Requirements: 1.1, 5.1, 6.1._
