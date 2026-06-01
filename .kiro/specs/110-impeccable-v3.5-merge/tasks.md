# Implementation Plan: Impeccable v3.5.0 Merge

**Date**: 2026-06-01
**Spec**: 110 - Impeccable v3.5.0 Merge
**Status**: Implementation Planning
**Dependencies**: None

---

## Implementation Plan

Merge upstream Impeccable v3.5.0 improvements into our DesignerPunk-adapted skill. Work is ordered by priority (highest-value, lowest-risk first) and grouped by artifact.

---

## Task List

- [x] 1. Merge SKILL.md General Rules and Anti-Slop Updates

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - All v3.5.0 general rules merged into Design guidance section
  - All anti-slop improvements merged into Absolute bans and AI slop test sections
  - No-argument routing logic rewritten for MCP context
  - DesignerPunk Design Laws intact and unmodified
  - Conflict Resolution hierarchy intact
  - MCP-based context loading unchanged
  
  **Primary Artifacts:**
  - `.kiro/skills/impeccable/SKILL.md`
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/110-impeccable-v3.5-merge/completion/task-1-completion.md`
  - Summary: `docs/specs/110-impeccable-v3.5-merge/task-1-summary.md`

  - [x] 1.1 Merge contrast, typography, copy, layout, and motion rules
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Leonardo
    - Add contrast verification rule to Color section (4.5:1 body, 3:1 large, placeholder 4.5:1)
    - Add typography constraints (heading ceiling, letter-spacing floor, text-wrap, font count cap)
    - Add copy rules (em-dash ban, buzzword ban, aphoristic-cadence ban, button/link guidance)
    - Add layout rules (z-index semantic scale, dropdown overflow-hidden warning)
    - Add motion improvements (premium motion materials, reveal animation guidance)
    - Add version annotation to SKILL.md header: "Upstream merge: Impeccable v3.5.0 (2026-06-XX)"
    - Verify no conflict with existing DesignerPunk Design Laws
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

  - [x] 1.2 Update Absolute Bans and AI slop test
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Leonardo
    - Add cream/beige body background ban with OKLCH parameters and token-name tells
    - Add numbered section markers ban
    - Add text overflow ban
    - Strengthen eyebrow ban with frequency-based detection language
    - Add second-order category-reflex check to AI slop test section
    - Add "New projects only" color strategy vocabulary for brand register
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

  - [x] 1.3 Rewrite no-argument routing logic
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Leonardo
    - Replace "show command table, ask what to do" with context-aware recommendation logic
    - Use MCP queries (product overview, screen status) as data sources
    - Use git status for dirty-file awareness
    - Recommend 2-3 highest-value commands with rationale
    - Always ask before running (never auto-execute)
    - Fall back to full command table when no clear signal
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 2. Adopt Detector Scripts

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - Detector scripts installed and functional
  - Detector runs without PRODUCT.md dependency
  - Exclusion list mechanism documented
  - Audit command can invoke detector
  
  **Primary Artifacts:**
  - `.kiro/skills/impeccable/scripts/detector/`
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/110-impeccable-v3.5-merge/completion/task-2-completion.md`
  - Summary: `docs/specs/110-impeccable-v3.5-merge/task-2-summary.md`

  - [x] 2.1 Copy detector scripts from upstream
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Leonardo
    - Copy `scripts/detector/` directory wholesale from v3.5.0
    - Copy supporting scripts needed by detector (if any)
    - Verify directory structure matches upstream
    - _Requirements: 3.1, 3.5_

  - [x] 2.2 Verify detector independence and create exclusion mechanism
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Leonardo
    - Run detector against an existing HTML file without PRODUCT.md present
    - Verify it produces results without errors
    - Document how to exclude rules (create `.kiro/skills/impeccable/detector-exclusions.md` if needed)
    - Update `audit.md` reference to include detector invocation
    - _Requirements: 3.2, 3.3, 3.4_

- [x] 3. Update Command Reference Files

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - Priority reference files (craft, shape, polish, bolder) updated
  - Evaluated references (critique, colorize, typeset, animate) selectively merged
  - No dangling references to codex.md, PRODUCT.md, or DESIGN.md
  - All file-based context references replaced with MCP equivalents
  
  **Primary Artifacts:**
  - `.kiro/skills/impeccable/reference/craft.md`
  - `.kiro/skills/impeccable/reference/critique.md`
  - `.kiro/skills/impeccable/reference/shape.md`
  - `.kiro/skills/impeccable/reference/polish.md`
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/110-impeccable-v3.5-merge/completion/task-3-completion.md`
  - Summary: `docs/specs/110-impeccable-v3.5-merge/task-3-summary.md`

  - [x] 3.1 Merge priority reference files (craft, shape, polish, bolder)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Leonardo
    - Diff upstream craft.md against our version; merge Step 0, Step 4 production bar, skip codex.md references
    - Diff upstream shape.md; merge improvements
    - Diff upstream polish.md; merge improvements
    - Diff upstream bolder.md; merge improvements
    - Diff upstream codex.md; update our version to match v3.5.0
    - Replace any PRODUCT.md/DESIGN.md references with MCP query equivalents
    - Verify no dangling references to unavailable features
    - _Requirements: 4.1, 4.2, 4.3, 4.5, 4.7, 4.8_

  - [x] 3.2 Evaluate and selectively merge critique.md
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Leonardo
    - Adopt two-assessment orchestration model (Assessment A: design, Assessment B: evidence)
    - Make detector (Assessment B) optional enhancement, not required
    - Soften "skipped detector = failed critique" language
    - Replace file-based context references with MCP equivalents
    - _Requirements: 4.6, 4.7, 4.8, 7.4_

  - [x] 3.3 Evaluate and selectively merge colorize, typeset, animate
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Leonardo
    - colorize.md: Scope OKLCH guidance to ungoverned color decisions only
    - typeset.md: Exclude font selection procedure for product register; preserve web font loading strategies
    - animate.md: Merge premium motion materials vocabulary if no conflict with DesignerPunk motion rules
    - Add conflict notes where DesignerPunk Design Laws take precedence
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

- [ ] 4. Update Brand Register Reference

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - Reflex-reject font list present in brand-dp.md with scope note
  - Reflex-reject aesthetic lanes present
  - Product register explicitly excluded from font selection
  - Existing DesignerPunk brand content preserved
  
  **Primary Artifacts:**
  - `.kiro/skills/impeccable/reference/brand-dp.md`
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/110-impeccable-v3.5-merge/completion/task-4-completion.md`
  - Summary: `docs/specs/110-impeccable-v3.5-merge/task-4-summary.md`

  - [ ] 4.1 Add reflex-reject content to brand-dp.md
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Leonardo
    - Add reflex-reject font list (23 fonts) with scope note
    - Add reflex-reject aesthetic lanes section
    - Add identity-preservation clause (existing committed fonts win)
    - Verify product register exclusion is explicit in Design Laws
    - Preserve all existing DesignerPunk brand content
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 5. Regression Verification

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)
  
  **Success Criteria:**
  - MCP context loading works without file-based fallback
  - Conflict Resolution correctly blocks upstream guidance in product register
  - Detector runs independently
  - No-argument routing produces context-aware recommendations
  - All commands load without errors
  
  **Primary Artifacts:**
  - Verification results (documented in completion)
  
  **Completion Documentation:**
  - Detailed: `.kiro/specs/110-impeccable-v3.5-merge/completion/task-5-completion.md`
  - Summary: `docs/specs/110-impeccable-v3.5-merge/task-5-summary.md`

  - [ ] 5.1 Verify architecture preservation
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Leonardo + Thurgood
    - Verify MCP context loading still works (run setup steps)
    - Verify Conflict Resolution blocks font selection in product register
    - Verify detector runs without PRODUCT.md
    - Verify no-argument routing recommends commands based on MCP context
    - Test `/impeccable critique` on an existing surface
    - Test `/impeccable audit` with detector
    - Document any issues found and fixes applied
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_
