# Design Outline: Post-OKLCH Stabilization Cleanup

**Spec**: 115 - Post-OKLCH Stabilization Cleanup
**Date**: 2026-06-10
**Status**: Design Outline (deferred until v12 stabilizes)
**Agent**: Ada (Phase A), Leonardo + Sparky (Phase B), Thurgood (Phase C)

---

## Problem Statement

Spec 112 added the OKLCH color pipeline *alongside* the existing RGBA pipeline. The old code paths are frozen but remain in the codebase — dead code that adds confusion, maintenance burden, and test surface without delivering value. Additionally, the Impeccable design audit skill parses colors assuming RGBA format, producing false results against OKLCH output.

---

## Proposed Solution

Three-phase cleanup after v12 stabilizes in production:

**Phase A — RGBA Dead Code Removal** (Ada): Remove old color pipeline code, update ~200 test assertions from RGBA to OKLCH format, simplify generator/resolver paths.

**Phase B — Impeccable OKLCH Support** (Leonardo + Sparky): Update detector scripts to parse `oklch()` values, add OKLCH→luminance path for contrast checks, update color reference docs.

**Phase C — Documentation Stragglers** (Thurgood): Update 10 steering docs + 1 component README still containing RGBA format references.

---

## Scope

### Phase A — RGBA Pipeline Removal

- Delete/replace `src/tokens/ColorTokens.ts` (old RGBA primitive source)
- Remove RGBA parsing/formatting methods from all 3 generators
- Remove RGBA resolution path from `SemanticValueResolver`
- Simplify `resolveTokens()` — remove old color loading
- Update ~200 test assertions (RGBA strings → OKLCH values)
- Remove old `BlendCalculator` (RGB-space) — `OklchBlendCalculator` is sole path
- Remove `ColorTokenValue` interface from `PrimitiveToken.ts`

### Phase B — Impeccable OKLCH Compatibility

- Update `shared/color.mjs` to parse `oklch()` alongside `rgb()`/hex
- Add OKLCH→sRGB luminance conversion for contrast checks
- Update `reference/color-and-contrast.md` examples
- Verify detector scripts produce correct results against OKLCH CSS

### Phase C — Documentation Updates

- `.kiro/steering/Rosetta-System-Architecture.md` (remaining 16 RGBA refs)
- `.kiro/steering/Token-Family-Glow.md`
- `.kiro/steering/Token-Family-Opacity.md`
- `.kiro/steering/Token-Family-Shadow.md`
- `.kiro/steering/Token-Quick-Reference.md`
- `.kiro/steering/rosetta-system-principles.md`
- `.kiro/steering/DTCG-Integration-Guide.md`
- `.kiro/steering/MCP-Integration-Guide.md`
- `.kiro/steering/DesignerPunk-Integration-Guide.md` (remaining refs)
- `src/components/core/Progress-Pagination-Base/README.md`

### Out of Scope

- Any behavioral changes to the OKLCH pipeline itself
- New features or token additions
- Spec 113 (Onboarding CLI) work

---

## Prerequisites

- v12 shipped and published
- test01 has validated v12 for ≥3 days without OKLCH-related issues
- No rollback to RGBA needed

---

## Success Criteria

1. `grep -r "rgba(" src/tokens/ src/providers/ src/generators/ src/resolvers/` returns zero matches (excluding test fixtures)
2. Old `BlendCalculator` removed; only `OklchBlendCalculator` remains
3. Impeccable detector correctly identifies OKLCH contrast issues
4. All steering docs reference OKLCH format exclusively (no stale RGBA examples)
5. All 8500+ tests pass
6. `npx designerpunk generate` output unchanged (same OKLCH values as pre-cleanup)

---

## Stakeholder Review

- **Ada** — Phase A (pipeline cleanup)
- **Leonardo** — Phase B (Impeccable skill owner)
- **Sparky** — Phase B (JavaScript detector implementation)
- **Thurgood** — Phase C (documentation governance)
