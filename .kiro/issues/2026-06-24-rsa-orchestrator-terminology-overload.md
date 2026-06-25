# Rosetta-System-Architecture: "Orchestrator" Used for Two Different Pipeline Layers (Stage 4 vs Stage 5)

**Date**: 2026-06-24
**Discovered during**: Spec 117 Task 6.1 (steering-doc ballot application — Ada flagged it, out of approved scope)
**Reporters**: Ada (flag), Claude (analysis)
**Severity**: Low — terminology-clarity issue, NOT a factual error; neither stage is wrong on its own
**Type**: Steering-doc clarity (Rosetta-System-Architecture.md)
**Primary owner**: Ada (Rosetta accuracy) — via the ballot-measure process (propose → Peter approves → apply)
**Status**: Open — **scheduled to RIDE Spec 118 Task 11's steering ballot (decided 2026-06-25)**: low-severity doc-clarity polish added as a small second item on the Task-11 module-resolution-contract ballot (Peter approves there anyway). Disambiguate Stage-4 vs Stage-5 by layer — do NOT unify the two "orchestrator" labels (they are caller/callee). Deliberately NOT folded into closed Spec 117. See `docs/roadmap/m0a-deferred-items.md` § "Issues surfaced during the 117/118 spec cluster".

---

## Summary

`.kiro/steering/Rosetta-System-Architecture.md` labels **two different components** "orchestrator/orchestration":

- **Stage 4 (Mode Resolution):** `Orchestration (generateTokenFiles.ts)`
- **Stage 5 (Generation):** `TokenFileGenerator (Orchestrator)` / Entry Points: "Generation orchestration: `src/generators/TokenFileGenerator.ts`"

These are **not two names for one thing** — they are a **caller and its callee**:

- `generateTokenFiles` (function, `src/generators/generateTokenFiles.ts:53`) is the **outer pipeline orchestration** — validates, runs mode resolution, then `new TokenFileGenerator()` (`:106`) → `generator.generateAll(...)` (`:222`).
- `TokenFileGenerator` (class, `src/generators/TokenFileGenerator.ts:121`) is the **platform-generation layer** it calls, which itself orchestrates the per-platform format generators.

Each stage names the correct component. The only problem is the shared word "orchestrator," which can mislead a reader into thinking they're the same component or wondering which is "the" orchestrator.

## The trap (why this needs care, not a find-replace)

The naive correction — making the two stages "match" by unifying the name — would **introduce an error** by erasing a real caller/callee distinction. The correct fix is the *opposite*: **disambiguate by layer**, e.g.:

- Stage 4 → "Pipeline orchestration (`generateTokenFiles`)"
- Stage 5 → "Platform-generation orchestration (`TokenFileGenerator`)"

## Why not urgent / why out of Spec 117

Neither stage is factually wrong, so there is no correctness defect — this is polish. It pre-dates Spec 117 (117 only *touched* these sections via the Task 6 ballot; the overload was already present). 117 is closed and certified; this is not a 117 behavior change, so it should not reopen that branch.

## Recommended disposition

A small standalone doc-clarity ballot item (or fold into any future branch already editing pipeline docs — e.g. Spec 118 if it touches RSA). Disambiguate the two "orchestrator" labels by layer; do NOT unify them.

## Cross-References

- Surfaced in: `.kiro/specs/117-token-index-generation-integrity/completion/task-6-completion.md` (flagged-not-fixed)
- Affected doc: `.kiro/steering/Rosetta-System-Architecture.md` § Stage 4: Mode Resolution, § Stage 5: Generation
