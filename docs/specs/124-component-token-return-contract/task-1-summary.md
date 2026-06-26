# Task 1 Summary: Spec Ratification & Pre-Change Baseline

**Date**: 2026-06-26
**Purpose**: Concise summary of parent task completion
**Organization**: spec-summary
**Scope**: 124-component-token-return-contract

## What Was Done

Ratified requirements + design and captured the pre-change baseline. Peter ratified on 2026-06-26 after a two-lead pre-ratification review (Lina + Ada, both CONDITIONAL GO); three mechanical block items were resolved in spec text first (dedup the frozen brand string; add JSDoc-update work to Task 3.1; add the 5th migration file). Baseline captured in the Task 2 spike: `tsc` + `build` green; `generate` emitted "Component tokens: 0".

## Why It Matters

The baseline "0 component tokens" / non-empty `git diff` is not a healthy green-before state — it is the exact 118 dual-instance defect Spec 124 fixes (side-effect registration lands in a different registry instance than `getAll()` reads). The committed 33-token `components.yaml` (produced under Spec 117 with a single registry) is the order/value target the Task 3 harvest must reproduce, so R6's clean-diff gate only becomes meaningful after Task 3.

## Key Changes

- `requirements.md`, `design.md`, `tasks.md` — ratified; locked decisions encoded, no architectural fork left open.
- Baseline recorded in `findings/r6-ordering-spike.md` §5.

## Impact

- ✅ Spec ratified; 3 pre-ratification block items resolved in spec text.
- ✅ Baseline captured: `tsc` green, `build` green (pre-existing export-condition warnings only).
- ⚠ Baseline `generate` = 0 component tokens (the 118 dual-instance defect 124 fixes), so R6 is not yet reproducible — expected, consistent with the 118 PAUSE.
