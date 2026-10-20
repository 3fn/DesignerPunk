# Spec 115 Phase B: Migrate Shadow Primitives and Delete Legacy ColorTokens.ts

**Date**: 2026-09-12
**Chartered by**: Peter (ruling at the dual-color-source divergence fix session — "queue both follow-ups")
**Domain**: Ada (token pipeline)
**Severity**: Medium (debt closeout — the live consumer harm is closed by the Option A fix; this ends the defect *class*)
**Status**: Queued — spec-sized, needs formalization (Thurgood) before execution
**Class**: P2 obligation (record) · charter *(set 2026-10-20, Ada, rule 12. `src/tokens/ColorTokens.ts` carries a `@deprecated` header promising Phase B removes it, and its unread light/dark matrix still reads as live data, so the record of the migration is wrong while the Option A parity test keeps every consumer correct; no reader of a shipped surface is misled, so not P1. Overrides the steward's proposed P3: an unkept promise in the file's own header is an obligation, not an improvement. Kind charter: it is the standing charter for the color-track spec.)*
**Trigger**: `manual` — the color-track spec's formalization opens (this record folds into it with the blend/OKLCH alignment record and color-token enforcement; ranked after Spec 130). *(Set 2026-10-20, Ada, rule 9. `manual` for the same reason as the blend record: the spec has no directory or name yet, so a `path:` glob would be a guess; re-rule to `path:` in the PR that creates the directory. Was: no Trigger line; Status "Queued — spec-sized, needs formalization (Thurgood) before execution".)*
**Ruling (Peter, 2026-10-20, relayed)**: "agreed" — folded into the color-track spec, ranked after Spec 130.
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

**Walk 2026-10-20 (Thurgood, walk line under rule 9; ledger `archive/TRIAGE-2026-10-20.md` row 18, call PETER)**: this record lacks the rule-1 Trigger token (`**Trigger**: ` followed by one of `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual`) and the rule-12 `**Class**:` header. That is a walk finding. The owner writes both (rule 9); the steward writes neither. Steward's proposal, which the owner may override: Proposed `manual` (Peter ranks it) · `P3 improvement · charter`. Peter's question: rank this spec-sized item, and fold the rgba-cleanup and shadow-OKLCH records into it?
