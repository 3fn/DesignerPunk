# Implementation Plan: 104 — Semantic Contrast Remediation

**Date**: 2026-10-12
**Spec**: 104 — Semantic Contrast Remediation
**Author**: Ada
**Criteria mode**: per-parent

## Tasks

- [x] 1. Remediate the semantic color pairs

  **Type**: Implementation
  **Agent**: Ada (main session)

  **Success Criteria:**
  - All 24 semantic color pairs pass WCAG AA contrast in both light and dark mode
  - Perceptual distance between adjacent steps stays within `ΔE₀₀ < 1`
  - No primitive token values change — remediation happens in the semantic layer only
