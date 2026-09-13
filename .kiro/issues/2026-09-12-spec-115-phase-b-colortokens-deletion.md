# Spec 115 Phase B: Migrate Shadow Primitives and Delete Legacy ColorTokens.ts

**Date**: 2026-09-12
**Chartered by**: Peter (ruling at the dual-color-source divergence fix session — "queue both follow-ups")
**Domain**: Ada (token pipeline)
**Severity**: Medium (debt closeout — the live consumer harm is closed by the Option A fix; this ends the defect *class*)
**Status**: Queued — spec-sized, needs formalization (Thurgood) before execution
**Origin**: `.kiro/issues/2026-08-25-dual-color-source-divergence.md` § "Option B"

---

## Charter

Finish what `src/tokens/ColorTokens.ts`'s own `@deprecated` header promises: **Spec 115 Phase B removes the file.** The Option A divergence fix (2026-09-12) repointed the DTCG/Figma primitive path at the OKLCH source of record, but the legacy file survives as:

1. **Sole source for the four shadow primitives** (`shadowBlack100`, `shadowBlue100`, `shadowOrange100`, `shadowGray100`) on ALL platforms — these must migrate to the OKLCH source (`src/tokens/color/`) with Ada adjudicating the OKLCH values.
2. **Structural/iteration source for the DTCG export** and whatever else the importers below lean on.
3. **Dead-but-live-looking data**: its entire `light/dark × base/wcag` matrix is unread on every shipped path (the divergence issue documents this) — exactly the misleading surface that produced three stale governance-doc claims.

## Sized blast radius (measured 2026-08-27)

**9 non-test importers**: `src/providers/WebFormatGenerator.ts`, `src/providers/iOSFormatGenerator.ts`, `src/providers/AndroidFormatGenerator.ts`, `src/resolvers/SemanticValueResolver.ts`, `src/validators/buildValidation.ts`, `src/generators/DTCGFormatGenerator.ts`, `src/tokens/index.ts`, `src/tokens/semantic/AccessibilityTokens.ts`, `src/tokens/semantic/index.ts` — plus **17 test files**. All three platform format generators are in the set: this is a real spec with a feedback round, not an issue-driven fix.

## Design questions the spec must settle

- Shadow-primitive OKLCH values: converted-from-legacy-RGBA (visual no-op) vs. re-derived on the OKLCH ramp system (Ada adjudicates; visual no-op is the conservative default).
- What replaces ColorTokens.ts as the DTCG structural/iteration source.
- The `SemanticValueResolver` legacy fallback branch: delete or keep as a guarded error path.
- Whether `buildValidation.ts` and `AccessibilityTokens.ts` consume values that only exist legacy-side.

## Guard until then

The Option A parity test (DTCG `$value` ↔ OKLCH source, per primitive) makes any re-divergence loud. It protects the seam but NOT the misleading-surface problem — the file still reads as live data.
