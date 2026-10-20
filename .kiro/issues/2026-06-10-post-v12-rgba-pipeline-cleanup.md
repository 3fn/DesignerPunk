# Post-v12 Cleanup: Remove Legacy RGBA Color Pipeline

**Date**: 2026-06-10
**Blocked by**: v12 release (OKLCH pipeline must ship and stabilize first)
**Agent**: Ada
**Severity**: Low — tech debt, no user impact
**Status**: Open (deferred)
**Owner**: Ada (the `**Agent**:` header above; added at the 2026-10-20 walk, rule 9)
**Trigger**: `manual` — the cleanup opens: Peter ranks Spec 115 Phase B (`2026-09-12-spec-115-phase-b-colortokens-deletion.md`, which the walk's question 3 proposes to fold this record into), or gives a standalone go. The header's "Blocked by: v12 release" condition has been met. *(Set 2026-10-20, Ada, rules 1 and 9.)*
**Class**: P3 improvement · defect *(set 2026-10-20, Ada, rule 12. A frozen legacy RGBA path with no consumer-visible effect (the header's own Severity: Low). The reading that would re-class it: the RGBA path found to diverge from the OKLCH output a consumer receives.)*

---

## Context

Spec 112 added the OKLCH color pipeline alongside the existing RGBA pipeline. The old RGBA path is frozen (no new development) but remains in the codebase. Once v12 ships and the OKLCH pipeline is validated in production, this cleanup removes the dead code.

---

## Scope

### Files to Delete

- `src/tokens/ColorTokens.ts` — replace with barrel re-exporting from `src/tokens/color/`
- Remove RGBA `ColorTokenValue` interface from `src/types/PrimitiveToken.ts` (or deprecate)
- Remove `shadowColorTokens` RGBA definitions (migrate to OKLCH shadow colors)

### Methods to Remove from Generators

| Generator | Methods |
|-----------|---------|
| `WebFormatGenerator` | `parseRgbaString()`, `formatColorValue()`, RGBA branch in `formatCSSValue()` |
| `iOSFormatGenerator` | `rgbaStringToUIColor()`, `formatUIColor()`, RGBA branch in `formatSwiftValue()` |
| `AndroidFormatGenerator` | `rgbaStringToColorArgb()`, `parseRgbaString()`, RGBA branch in `formatKotlinValue()` |

### Pipeline Simplification

- `resolveTokens()` — remove color token loading from old `ColorTokens.ts` barrel
- `SemanticValueResolver.resolveSemanticTokenValue()` — remove RGBA resolution path (replace with OKLCH passthrough)
- `generateTokenFiles.ts` — remove `resolveColorPrimitive()` RGBA lookup, remove `parseRgba()` utility
- Mode resolution — simplify once OKLCH theme overrides replace the rgba-based ContextOverrideSet

### Test Updates

- ~50-100 tests reference RGBA values in assertions (snapshot-style)
- Color generation integration tests assert `rgba(` format
- SemanticValueResolver tests assert RGBA resolution
- Blend utility tests (old `BlendCalculator`) can be removed once `OklchBlendCalculator` is sole path

### Documentation Updates (Thurgood)

See issue file `2026-06-10-oklch-pipeline-integration-incomplete.md` for the list of 10+ steering docs with remaining RGBA references.

---

## Effort Estimate

- 1-2 parent tasks (Spec TBD)
- ~200 test assertion updates
- ~15 source file modifications
- Low risk if done after OKLCH pipeline is stable (no behavioral change, just dead code removal)

---

## Success Criteria

- `grep -r "rgba(" src/tokens/ src/providers/ src/generators/ src/resolvers/` returns zero matches (excluding test fixtures)
- `ColorTokenValue` interface removed from `PrimitiveToken.ts`
- Old `BlendCalculator` (RGB-space) removed; only `OklchBlendCalculator` remains
- All 8500+ tests still pass
- `npx designerpunk generate` output unchanged (same OKLCH values)

**Walk 2026-10-20 (Thurgood, walk line under rule 9; ledger `archive/TRIAGE-2026-10-20.md` row 3, call BACK-FILL)**: this record lacks the rule-1 Trigger token (`**Trigger**: ` followed by one of `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual`) and the rule-12 `**Class**:` header. That is a walk finding. The owner writes both (rule 9); the steward writes neither. Steward's proposal, which the owner may override: Live: `rgba(` in 10 non-test files under `src/{tokens,providers,generators,resolvers}`; `ColorTokenValue` at `src/types/PrimitiveToken.ts:47`. Proposed `manual` · `P3 improvement · defect`. Add an `**Owner**:` line. Overlaps row 18 (Spec 115 Phase B); the owner may fold it there.

**Walk 2026-10-20 (Thurgood, rule 9 walk line; Peter's rulings of that day)**: Peter ranked the color-track spec, folding this record in as intake, after Spec 130 (`.kiro/issues/2026-10-18-spec-priorities-by-outcome.md` § 3, rank 4). This record's `manual` Trigger is its owner's to re-rule; the priorities record owes that re-rule, to a `path:` token on the new spec directory, in the PR that creates it.
