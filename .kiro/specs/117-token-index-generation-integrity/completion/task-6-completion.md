# Task 6 Completion: Documentation & Clean-Exit (R7)

**Date**: 2026-06-24
**Task**: 6. Documentation & Clean-Exit (Parent)
**Type**: Parent / Documentation
**Validation**: Tier 1 — Minimal
**Agent**: Ada (proposes + applies) → Peter (approves); Thurgood (re-architecture, clean-exit); Lina + Leonardo (consulted)
**Status**: Complete — **Spec 117 closed**

---

## Summary

Updated the steering docs to match Spec 117's behavior changes via the ballot-measure process, and completed clean-exit issue logging. The ballot went through a fuller cycle than a rubber-stamp because a density concern surfaced — which produced a better outcome and a reusable structural principle.

## Task 6.1 — Ballot-measure steering-doc proposals (R7 AC1)

**Cycle:** proposed → consulted → re-architected → approved → applied.

1. **v1 proposed** (Ada) — 5 items: P1 OKLCH-index entry (R3), P2 Stage-5 token-index generator (R3/R5), P3 Stage-6 BlendUtilities removal (N1), P4 component-loading gate (R4), P5 theme-varying split (R5). Nearly every item carried a density counter-argument.
2. **Density concern raised** (Peter) → **3 domain consultations** on "do you lose or gain":
   - **Ada** (author): content is valuable but mis-placed; the RSA ASCII diagrams conflate *orientation* ("what exists") with *reference* ("how it works") — split them (diagrams minimal; reference detail in prose below). Also improves docs-MCP `get_section` retrieval (Spec 121 finding).
   - **Lina** (P4): move loading-gate content OUT of the authoring flow diagram; one Entry Points line + opt-in "Loading behavior" addendum.
   - **Leonardo** (P5): minimal — corrected definition + pointer to RSA; strip pipeline internals from a routing doc.
3. **Re-architected to v2** (Thurgood) → [`task-6-ballot-proposals-v2.md`](task-6-ballot-proposals-v2.md). Also caught that v1's section IDs were already **stale** after re-indexing (live confirmation of the Spec 121 "address by path+heading, not ID" guidance).
4. **Approved** (Peter) — all 5 + optional add-ons **A1** (mark `BlendUtilityGenerator` dormant) and **A2** (note `generateTokenFiles` returns `ModeResolvedTokens`) + accuracy fixes + metadata.
5. **Applied** (Ada) — edits to `Rosetta-System-Architecture.md` and `Token-Quick-Reference.md` by path+heading; `Last Reviewed` → 2026-06-24; docs index rebuilt (healthy, 0 errors). Main-loop verified: `validate_metadata` clean on both; `get_section` serves the new content.

**Edits applied:** P1 one-line diagram fix + Token-index table row + shadow-rgba exception note; A2 Stage-4 return-type note; P2 Stage-5 generator block + Entry Points prose; A1 dormancy note; P3 removed 3 phantom `BlendUtilities.*` lines + note; P4 loader Entry Points line + Loading-behavior addendum (no diagram edit); P5 two-bullet theme-varying replacement + RSA pointer.

**Flagged, not fixed (out of approved scope):** a pre-existing Stage-4/Stage-5 orchestrator-naming inconsistency (`generateTokenFiles.ts` the function vs `TokenFileGenerator.ts` the class) — pre-dates Spec 117; candidate for a future doc-clarity pass.

## Task 6.2 — Issues-registry logging / clean-exit (R7 AC2)

All deferred/out-of-scope findings recorded:
- **N1 BlendUtilities** — `2026-06-13-blendutilities-not-generated.md`: doc-accuracy half handled by P3; **code disposition split out** to the holistic blend issue.
- **Shadow OKLCH family** — `2026-06-24-oklch-shadow-color-family-not-migrated.md`.
- **MCP semantic `resolvedValue` per-mode** — `2026-06-24-mcp-semantic-resolvedvalue-ignores-mode-overrides.md`.
- **Blend system architecture + OKLCH alignment** (new, holistic) — `2026-06-24-blend-system-architecture-and-oklch-alignment.md`: surfaced during the N1 investigation — `OklchBlendCalculator` is orphaned and the in-use blend path computes in RGB/HSL (the same orphaned-OKLCH-path pattern as 117's own findings). Captures three entangled questions (OKLCH color-space alignment, platform delivery generate-vs-hand-author, the generator code disposition) for a dedicated future review. Explicitly out of 117 scope.
- **Originating issue** `2026-06-13-token-index-generation-gaps.md` — marked RESOLVED.
- N2 folded into R4 (fixed); the two-theme-varying-sets risk is closed by the automated `Invariants.ts` anti-conflation guard (not an open issue).

## Documentation waiver (R7)

Honored: this spec changed generation *behavior*, not token vocabulary, so all steering edits were behavioral-accuracy/structure updates — no new token-family docs (ratified waiver, Peter, 2026-06-13).

## Requirements Satisfied

- **R7 AC1**: affected steering docs (Rosetta-System-Architecture; Token-Quick-Reference) updated via the ballot-measure process (Ada proposes/applies; Peter approves).
- **R7 AC2**: all deferred out-of-scope findings recorded in the issues registry with rationale.
