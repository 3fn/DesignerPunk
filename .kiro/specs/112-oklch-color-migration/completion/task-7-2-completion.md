# Task 7.2 Completion: Update governance and integration docs

**Date**: 2026-06-10
**Task**: 7.2 Update governance and integration docs
**Type**: Implementation
**Status**: Complete

---

## Artifacts Modified

| File | Change |
|------|--------|
| `.kiro/steering/Product-Token-Governance.md` | Color tolerance: `RGB ±2/channel` → `OKLCH ΔE₀₀ ≤ 1.0` |
| `.kiro/steering/DesignerPunk-Integration-Guide.md` | Added "Platform Dependencies for OKLCH" table + "OKLCH Color Migration (v12+)" upgrade guide |
| `.kiro/steering/Rosetta-System-Architecture.md` | Replaced "RGBA Color Pipeline" section + "Platform Output Formats" table with OKLCH equivalents |

## Changes

### Product-Token-Governance.md
- Perceptual Tolerance Guidelines table: Color row updated from RGB channel comparison to CIEDE2000 ΔE₀₀ metric
- Rationale updated to reference gamut shape awareness

### DesignerPunk-Integration-Guide.md
- New table: ChromaKit (iOS), colormath (Android), none (Web) with install methods
- Note that `init` scaffolds dependencies, `sync` flags requirements on upgrade
- OKLCH Migration section: 5-step upgrade guide (sync → generate → add deps → convert product tokens → verify)
- Visual changes callout pointing to release notes

### Rosetta-System-Architecture.md
- Pipeline diagram: RGBA → OKLCH (channel primitives → composition → semantic → generation)
- Platform output table: examples updated to oklch()/ChromaKit/colormath/hex
- Mermaid-style ASCII art preserved for consistency with document style

## Remaining RGBA References

10 steering docs + 1 component README still contain RGBA references (Conversion Rules examples, Token-Quick-Reference values, etc.). These are documented in `.kiro/issues/2026-06-10-oklch-pipeline-integration-incomplete.md` as post-pipeline-fix documentation work — they describe *output format* and should only be updated once the pipeline actually produces OKLCH.

## Requirements Addressed

- R10 AC2 (Product-Token-Governance color tolerance → ΔE₀₀)
- R10 AC3 (Integration Guide ChromaKit/colormath documentation)
- R10 AC4 (Rosetta Architecture OKLCH pipeline)
- R11 AC5 (Product token migration guidance in Integration Guide)
