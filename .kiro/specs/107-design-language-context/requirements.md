# Requirements Document: Design Language Context for AI-Driven Interface Creation

**Date**: 2026-05-16
**Spec**: 107 - Design Language Context
**Status**: Requirements Phase
**Dependencies**: None (subsumes Spec 100)

---

## Introduction

This spec enables AI agents to create interfaces that are system-aware and aesthetically intentional from the first pixel. It addresses the gap between DesignerPunk's precise token data (already queryable) and the aesthetic philosophy layer that tells an agent *how* to apply that data well. The work spans three tracks: token-level revisions (font transitions), governance additions (design philosophy, named rules, skill integration), and MCP evolution (new query tools for design language context).

This spec subsumes Spec 100 (Design Critique Integration). All critique capabilities originally scoped in Spec 100 are delivered through the Impeccable skill adaptation in this spec.

---

## Requirements

### Requirement 1: Design Philosophy as Structured Content

**User Story**: As an AI agent creating interfaces with DesignerPunk, I want queryable access to the system's aesthetic philosophy, so that I can produce visually intentional output without requiring a human to explain the design direction every session.

#### Acceptance Criteria

1. WHEN an agent queries design philosophy THEN the system SHALL return a creative north star, aesthetic philosophy description, and key characteristics in structured form
2. WHEN an agent queries named design rules THEN the system SHALL return a list of named rules with name, constraint text, and rationale
3. WHEN an agent queries design guidance THEN the system SHALL return explicit do's and don'ts as actionable directives
4. WHEN an agent queries color strategy THEN the system SHALL return the color strategy vocabulary (Restrained/Committed/Full/Drenched) with usage guidance for each tier
5. IF design philosophy content does not exist THEN the system SHALL surface a clear "not yet authored" response rather than returning empty or fabricated content

---

### Requirement 2: Brand Context Extension

**User Story**: As an AI agent working on a product built with DesignerPunk, I want access to the product's brand identity (personality, anti-references, register), so that I can produce output that matches the product's voice without re-interviewing the human.

#### Acceptance Criteria

1. WHEN an agent queries brand context THEN the system SHALL return brand personality (3-word personality, voice, tone), anti-references, and users/context
2. WHEN an agent queries product overview THEN the system SHALL include a register field (brand or product) that indicates the surface type
3. WHEN register is "brand" THEN design guidance SHALL favor distinctive typography, committed color strategies, and ambitious motion
4. WHEN register is "product" THEN design guidance SHALL favor system fonts, restrained color, consistency over surprise, and state-focused motion
5. IF brand context has not been configured for a product THEN the system SHALL return a clear indication that brand context needs authoring

---

### Requirement 3: Leonardo Skill Enhancement

**User Story**: As Leonardo (product architect), I want design creation capabilities integrated into my workflow, so that I can produce screen specs with aesthetic intentionality without requiring a separate designer agent.

#### Acceptance Criteria

1. WHEN Leonardo begins a screen spec THEN the skill SHALL load design philosophy context from the MCP before making visual decisions
2. WHEN the skill is invoked for creation work THEN it SHALL follow the gate system with depth proportional to surface novelty: full human confirmation for novel/brand/complex surfaces, self-confirmation for routine screens following established patterns
3. WHEN Leonardo produces a screen spec THEN it SHALL declare a color strategy (Restrained/Committed/Full/Drenched) for the surface
4. WHEN the product has a configured register THEN the skill SHALL modulate color strategy defaults and typography ambition accordingly (brand register → Committed+ default, product register → Restrained default)
5. WHEN Impeccable's opinions conflict with DesignerPunk's token system THEN DesignerPunk's tokens SHALL take precedence
6. WHEN the skill produces output THEN it SHALL validate component composition using existing Application MCP tools (validate_assembly, check_composition)
7. WHEN the skill selects components THEN it SHALL consider brand personality and register when choosing between component variants of equivalent function
8. WHEN design philosophy context is unavailable THEN the skill SHALL proceed using token semantics and component contracts as guidance, noting that aesthetic intentionality is limited to system defaults
9. WHEN the skill encounters ambiguity in design philosophy or named rules during execution THEN it SHALL flag the ambiguity for lessons-learned capture

---

### Requirement 4: Impeccable Skill Adaptation

**User Story**: As a DesignerPunk ecosystem participant, I want Impeccable's design creation and critique capabilities adapted for DesignerPunk consumption, so that the system benefits from Impeccable's anti-slop mechanisms and domain knowledge while respecting DesignerPunk's architectural decisions.

#### Acceptance Criteria

1. WHEN the skill loads context THEN it SHALL query DesignerPunk MCPs rather than reading static PRODUCT.md/DESIGN.md files
2. WHEN the skill applies typography guidance THEN it SHALL respect DesignerPunk's font decisions (Figtree for body, CommitMono for mono)
3. WHEN the skill applies spatial guidance THEN it SHALL respect DesignerPunk's 8px baseline grid (not Impeccable's 4pt recommendation)
4. WHEN the skill applies motion guidance THEN it SHALL respect DesignerPunk's platform-specific motion (spring on iOS, expo-out on web/Android)
5. WHEN the skill applies color guidance THEN it SHALL respect DesignerPunk's existing palette and semantic color tokens
6. WHEN the skill detects potential "AI slop" THEN it SHALL flag the output using category-reflex checks (first-order and second-order)
7. WHEN the skill runs critique/audit/polish commands THEN it SHALL suppress rules that DesignerPunk's token system already handles AND report which rules were suppressed and why for auditability
8. WHEN Impeccable provides guidance on a dimension DesignerPunk has not opinionated on THEN the skill SHALL apply Impeccable's guidance as default, noting it as "ungoverned by system" in output

---

### Requirement 5: Application MCP Design Language Tools

**User Story**: As an AI agent, I want to query DesignerPunk's design language through the Application MCP, so that I receive system-level aesthetic guidance alongside the token and component data I already access.

#### Acceptance Criteria

1. WHEN `get_design_philosophy` is called THEN the Application MCP SHALL return creative north star, aesthetic philosophy, and key characteristics
2. WHEN `get_design_rules` is called THEN the Application MCP SHALL return all named rules as structured objects (name, constraint, rationale)
3. WHEN `get_design_guidance` is called THEN the Application MCP SHALL return do's and don'ts as categorized directives
4. WHEN `get_color_strategy` is called THEN the Application MCP SHALL return the four-tier vocabulary with usage guidance and examples
5. WHEN design philosophy source data is updated THEN the MCP SHALL reflect changes on next index rebuild without code changes
6. The design philosophy source data SHALL be stored as pure structured YAML (not markdown) at a defined path within the Application MCP's indexed directory
7. WHEN design philosophy source data is malformed or missing required fields THEN the MCP SHALL report a health warning through the existing warnings mechanism

---

### Requirement 6: Product MCP Brand Context Tools

**User Story**: As an AI agent working on a specific product, I want to query that product's brand context through the Product MCP, so that I receive product-specific identity guidance alongside the screen specs and domain objects I already access.

#### Acceptance Criteria

1. WHEN `get_product_overview` is called THEN the Product MCP SHALL include register, brand personality, and anti-references fields (if configured)
2. WHEN `get_brand_context` is called THEN the Product MCP SHALL return the full brand identity (personality, voice, tone, anti-references, users, accessibility requirements)
3. WHEN brand context is not configured THEN the tool SHALL return a structured "not configured" response with guidance on how to author it
4. WHEN the product's overview.yaml is updated with brand fields THEN the MCP SHALL reflect changes on next index rebuild

---

### Requirement 7: Font Family Token Updates

**User Story**: As a DesignerPunk brand surface consumer, I want the typography tokens to reference Figtree (body) and CommitMono (mono), so that DesignerPunk's own surfaces use distinctive, deliberately chosen fonts.

#### Acceptance Criteria

1. WHEN body typography tokens are generated for DesignerPunk brand surfaces THEN the fontFamily SHALL reference Figtree with appropriate fallbacks
2. WHEN mono typography tokens are generated for DesignerPunk brand surfaces THEN the fontFamily SHALL reference CommitMono with appropriate fallbacks
3. WHEN consumer products use DesignerPunk tokens THEN their fontFamily tokens SHALL remain independent (consumers who configure their own font families via the existing config mechanism are unaffected; consumers using defaults receive the updated Figtree/CommitMono defaults)
4. WHEN the font transition is complete THEN all DesignerPunk documentation, demos, and brand surfaces SHALL render with the new fonts
5. WHEN font family token values change THEN the integration guide and release notes SHALL document the new font loading requirements (CDN links for Figtree and Commit Mono)
6. The fontFamilyDisplay token (Rajdhani) is explicitly OUT OF SCOPE for this requirement
7. WHEN font family token values change THEN existing test expectations (FontFamilyTokens.test.ts) SHALL be updated to reflect the new values

---

### Requirement 8: Design Philosophy Authoring

**User Story**: As Peter (human lead), I want a structured format for articulating DesignerPunk's aesthetic philosophy, so that it can be served by the MCP and consumed by agents without ambiguity.

#### Acceptance Criteria

1. WHEN design philosophy is authored THEN it SHALL include: creative north star, aesthetic philosophy (2-3 paragraphs), key characteristics (bullet list)
2. WHEN named rules are authored THEN each rule SHALL have: a memorable name, a constraint statement, and a rationale
3. WHEN do's and don'ts are authored THEN each item SHALL be specific and actionable (not vague aspirations)
4. WHEN color strategy guidance is authored THEN each tier (Restrained/Committed/Full/Drenched) SHALL have: definition, when to use, when not to use, and an example
5. WHEN the philosophy is complete THEN it SHALL be stored in a format indexable by the Application MCP (YAML frontmatter + markdown body, or structured YAML)
6. WHEN the philosophy references token values THEN it SHALL use token names (not raw values) to stay current as tokens evolve
