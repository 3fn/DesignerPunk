# Task 7 Summary: Increment 2 — Evidence Harness, Inventories, Divergence Test

**Date**: 2026-06-25
**Purpose**: Concise summary of parent task completion
**Organization**: spec-summary
**Scope**: 118-module-resolution-coherence

## What Was Done

Increment 2's **investigation-only** evidence pass (no swaps). Built a parity harness that generates two fresh token trees by running the same generator under **ts-node** vs **tsx** and compares them semantically by reusing Spec 117's normalization engine (no second engine; `GenerationIntegrityCheckImpl` bypassed). Enumerated and unit-tested the volatile-field set, produced the four inventories (entry-point, export-condition, ESM-cost + jest-preset parking form), refuted the divergence hypothesis, and assembled the green/red evidence table Task 8 reads.

## Why It Matters

The April→June→117 cycle was caused by *assuming* the module-direction answer. Task 8 commits CJS-vs-ESM **on evidence** — and this is that evidence. The result: the two runtime mechanisms produce **semantically identical** token output, so the loader is not a source of generation divergence; the generation gaps are decoupled and routed out; and the ESM cost (jest-preset blast radius) and exports incoherences are inventoried for the decision. The table **informs but does not pre-decide** the direction (R4 AC8).

## Key Changes

- Parity harness: `src/tools/integrity/ParityOrchestrator.ts` + `__parity__/run-parity.js` + `npm run test:parity` (reuses 117's `Normalizer`/`SemanticComparator`/`INVENTORY` directly; two-roots seam, no `FreshGenerator`).
- Volatile rules: `ParityNormalizationRules.ts` (`PARITY_NORMALIZATION_RULES` = 117 defaults + 118 defensive additions for `rosettaVersion`/`version`/`extensions.themes`) + 17 unit tests.
- Findings: `evidence-table.md`, `divergence-hypothesis.md`, `entry-point-inventory.md`, `export-condition-inventory.md`, `esm-cost-inventory.md`, `parity-harness-notes.md`.

## Impact

- ✅ **All-green parity** across 11 non-optional artifacts — only divergence class is volatile timestamps (neutralized by 117's existing rules).
- ✅ **Divergence hypothesis REFUTED → clean exit** — gaps routed to the blend review / already-closed-by-117; not absorbed into 118.
- ✅ **OQ-3 parking form EXISTS** → the ESM escape-hatch defer branch is available.
- ✅ Inventories surface the design-table staleness (`./config` now import+require; 13 ts-node scripts not 11).
- ✅ Full suite green (build exit 0; tsc clean; 376/8989 tests; token-index clean) — zero regression; no production code touched.
- ➡️ **Unblocks Task 8** (direction decision) with a fully assembled evidence table.

---

*For detailed implementation notes, see [task-7-completion.md](../../../.kiro/specs/118-module-resolution-coherence/completion/task-7-completion.md)*
