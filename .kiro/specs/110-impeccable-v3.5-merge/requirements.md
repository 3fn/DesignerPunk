# Requirements Document: Impeccable v3.5.0 Merge

**Date**: 2026-06-01
**Spec**: 110 - Impeccable v3.5.0 Merge
**Status**: Requirements Phase
**Dependencies**: None

---

## Introduction

Impeccable v3.5.0 shipped with significant craft improvements that our adapted `impeccable-dp` skill (v1.0.0) does not include. This spec merges upstream improvements into our DesignerPunk adaptation without regressing our MCP-based architecture, Design Laws, or Conflict Resolution hierarchy.

---

## Requirements

### Requirement 1: Merge General Rules into Design Laws

**User Story**: As Leonardo, I want updated craft rules (contrast, typography, copy, motion) available in the skill so that my design output quality improves.

#### Acceptance Criteria

1. WHEN the skill is loaded THEN the Design guidance section SHALL include contrast verification rules (4.5:1 body, 3:1 large text, placeholder text 4.5:1)
2. WHEN the skill is loaded THEN the Design guidance section SHALL include typography constraints (heading ceiling ≤6rem, letter-spacing floor ≥-0.04em, text-wrap: balance on h1-h3, text-wrap: pretty on prose, font count cap ≤3)
3. WHEN the skill is loaded THEN the Design guidance section SHALL include copy rules (em-dash ban, marketing buzzword ban, aphoristic-cadence ban, button verb+object, link standalone meaning)
4. WHEN the skill is loaded THEN the Design guidance section SHALL include motion improvements (premium motion materials vocabulary, reveal animation guidance)
5. WHEN the skill is loaded THEN the Design guidance section SHALL include layout rules (z-index semantic scale, dropdown overflow-hidden warning)
6. WHEN a merged rule conflicts with a DesignerPunk Design Law THEN the DesignerPunk Design Law SHALL take precedence per the Conflict Resolution hierarchy

---

### Requirement 2: Update Anti-Slop Detection

**User Story**: As Leonardo, I want strengthened anti-slop rules so that my output avoids saturated AI patterns.

#### Acceptance Criteria

1. WHEN the skill is loaded THEN the Absolute Bans section SHALL include the cream/beige body background ban with OKLCH detection parameters (L 0.84-0.97, C < 0.06, hue 40-100) and token-name tells
2. WHEN the skill is loaded THEN the Absolute Bans section SHALL include the numbered section markers ban (01/02/03 scaffolding)
3. WHEN the skill is loaded THEN the Absolute Bans section SHALL include the text overflow ban
4. WHEN the skill is loaded THEN the Absolute Bans section SHALL include the strengthened eyebrow ban (frequency-based detection)
5. WHEN the skill is loaded THEN the AI slop test section SHALL include the second-order category-reflex check
6. WHEN the skill is loaded THEN the "New projects only" color strategy vocabulary (Restrained/Committed/Full/Drenched) SHALL be present for brand register work

---

### Requirement 3: Adopt Detector Scripts

**User Story**: As Leonardo, I want objective anti-pattern detection during audits so that quality checks are evidence-based rather than purely subjective.

#### Acceptance Criteria

1. WHEN the detector scripts are installed THEN they SHALL be located at `.kiro/skills/impeccable/scripts/detector/`
2. WHEN the `audit` command is invoked THEN the detector SHALL be available for static HTML/CSS analysis
3. WHEN the detector runs THEN it SHALL NOT depend on PRODUCT.md or context.mjs
4. WHEN a new upstream detector rule conflicts with an intentional DesignerPunk pattern THEN the rule SHALL be excludable via a DesignerPunk exclusion list
5. WHEN the detector is updated from upstream THEN the `scripts/detector/` directory SHALL be treated as a wholesale replacement (not selective merge)

---

### Requirement 4: Update Command Reference Files

**User Story**: As Leonardo, I want improved command workflows so that craft, shape, polish, and audit produce better results.

#### Acceptance Criteria

1. WHEN `craft` is invoked THEN the reference SHALL include Step 0 (Project Foundation) adapted for MCP context
2. WHEN `craft` is invoked THEN the reference SHALL include the expanded Step 4 production bar checklist
3. WHEN `shape` is invoked THEN the reference SHALL reflect v3.5.0 improvements
4. WHEN `polish` is invoked THEN the reference SHALL reflect v3.5.0 improvements
5. WHEN `bolder` is invoked THEN the reference SHALL reflect v3.5.0 improvements
6. WHEN `critique` is invoked THEN the reference SHALL use the two-assessment orchestration model (Assessment A: design review, Assessment B: detector evidence) with detector as optional enhancement, not required
7. WHEN any merged reference file references `codex.md` or native image generation THEN it SHALL include a graceful skip path for harnesses without that capability
8. WHEN any merged reference file references `PRODUCT.md` or `DESIGN.md` THEN those references SHALL be replaced with equivalent MCP queries

---

### Requirement 5: Merge Routing Logic

**User Story**: As Leonardo, I want context-aware command recommendations when I invoke `/impeccable` with no argument so that I get pointed to the highest-value next action.

#### Acceptance Criteria

1. WHEN `/impeccable` is invoked with no argument THEN the skill SHALL recommend 2-3 highest-value commands with rationale instead of showing a static menu
2. WHEN making recommendations THEN the skill SHALL use MCP queries (product overview, screen status) and git status as data sources
3. WHEN making recommendations THEN the skill SHALL NOT depend on `context-signals.mjs` or file-based context
4. WHEN recommendations are made THEN the skill SHALL ask before running any command (never auto-execute)
5. WHEN no clear signal exists THEN the skill SHALL fall back to the full command table

---

### Requirement 6: Update Brand Register Reference

**User Story**: As Leonardo, I want the reflex-reject font list and aesthetic lanes available for brand register work so that portfolio/marketing surfaces avoid saturated AI aesthetics.

#### Acceptance Criteria

1. WHEN working in brand register THEN `brand-dp.md` SHALL include the reflex-reject font list (23 fonts)
2. WHEN working in brand register THEN `brand-dp.md` SHALL include the reflex-reject aesthetic lanes section
3. WHEN working in product register THEN the font selection procedure and reflex-reject list SHALL NOT apply (fonts are system-defined)
4. WHEN the reflex-reject list is present THEN it SHALL include a scope note: "Applies only to brand register surfaces where DesignerPunk's type system is not the constraint"
5. WHEN the existing brand has committed fonts THEN identity-preservation SHALL win over the reflex-reject list

---

### Requirement 7: Evaluate and Selectively Merge Remaining References

**User Story**: As Leonardo, I want individually evaluated reference files so that valuable improvements are adopted without introducing conflicts.

#### Acceptance Criteria

1. WHEN `colorize.md` is evaluated THEN OKLCH guidance SHALL be scoped to ungoverned color decisions only (not token-governed colors)
2. WHEN `typeset.md` is evaluated THEN font selection procedure SHALL be excluded for product register but web font loading strategies SHALL be preserved
3. WHEN `animate.md` is evaluated THEN premium motion materials vocabulary SHALL be merged if it doesn't conflict with DesignerPunk motion rules
4. WHEN any evaluated reference conflicts with DesignerPunk Design Laws THEN the DesignerPunk law SHALL take precedence and the conflict SHALL be noted in the reference

---

### Requirement 8: Preserve DesignerPunk Architecture

**User Story**: As a system maintainer, I want the merge to preserve all DesignerPunk-specific adaptations so that no regression occurs.

#### Acceptance Criteria

1. WHEN the merge is complete THEN MCP-based context loading SHALL remain the primary context source (no file-based fallback required)
2. WHEN the merge is complete THEN the DesignerPunk Design Laws section SHALL remain intact and unmodified except for additions from Requirement 1
3. WHEN the merge is complete THEN the Conflict Resolution hierarchy SHALL remain intact (DP tokens > DP rules > DP contracts > Impeccable domain > Impeccable taste)
4. WHEN the merge is complete THEN `brand-dp.md` and `product-dp.md` SHALL remain the register references (not replaced by upstream `brand.md`/`product.md`)
5. WHEN the merge is complete THEN `init` and `document` commands SHALL remain excluded
6. WHEN the merge is complete THEN the skill SHALL continue to function without PRODUCT.md, DESIGN.md, or any file-based context
