# Release 11.8.0

**Date**: 2026-06-01  
**Previous**: 11.7.4  
**Bump**: minor

## 🟡 Ecosystem Changes

- **Impeccable v3.5.0 Merge** *(Spec 110)*
  Merged upstream Impeccable v3.5.0 improvements into the DesignerPunk-adapted skill. Leonardo's design output now benefits from: contrast verification rules (4.5:1 body, 3:1 large text), anti-slop detection (cream/beige ban, numbered section markers, text overflow, second-order category-reflex check), copy discipline (em-dash ban, marketing buzzword ban, aphoristic-cadence ban), typography constraints (heading ceiling ≤6rem, letter-spacing floor ≥-0.04em, text-wrap: balance), and premium motion materials vocabulary. The detector engine (14 static analysis rules, no jsdom) is now available for objective anti-pattern detection during audits. No-argument routing is context-aware via MCP queries. Brand register gains reflex-reject font list and aesthetic lanes for portfolio/marketing work.

- **Web Authoring Standards** *(Adhoc — soft launch learning)*
  New shared steering doc (`.kiro/steering/Web-Authoring-Standards.md`) establishing CSS quality rules for both Lina (components) and Sparky (screens). Codifies: logical properties for all directional CSS, token-only values, token priority chain (semantic → primitive → product), focus-visible patterns, reduced motion handling, forced-colors mode. Includes product token authoring guidance with naming schema (context-specific vs property-generic), discovery workflow, and promotion inflection points. Eliminates the quality gap observed when Sparky operates without Lina's orchestration.

- **Android Skills for Data** *(Adhoc — 3rd party update)*
  Installed 4 official Google Android skills targeting LLM failure modes: edge-to-edge (inset handling, IME padding), adaptive layouts (flexbox, grid, media queries), Navigation 3 (new API with recipes), and Compose theming/styles. Priority hierarchy ensures DesignerPunk components and tokens always take precedence, with Android Skills patterns for platform-specific concerns the design system doesn't cover.

## 🔵 Internal Changes

- **Agent Config Updates**
  - Sparky: prompt reduced, Web Authoring Standards added as skill
  - Lina: prompt reduced, Web Authoring Standards added as skill
  - Data: Android Skills added, priority hierarchy documented in prompt
  - Platform-implementation-guidelines: cross-reference to Web Authoring Standards

- **Impeccable Detector Adoption**
  Static HTML/CSS anti-pattern detector installed at `.kiro/skills/impeccable/scripts/detector/`. Runs without PRODUCT.md dependency. Exclusion mechanism documented for DesignerPunk-specific patterns. Treated as upstream-owned subtree for future updates.

- **Brand Register Enhancement**
  `brand-dp.md` updated with reflex-reject font list (23 fonts) and aesthetic lanes, scoped to brand register only. Product register explicitly excluded — fonts remain system-defined (Rajdhani/Figtree/Commit Mono).

## 📊 Stats

- Spec 110: 5 parent tasks, 9 subtasks, all complete with verification
- New steering doc: Web-Authoring-Standards.md (401 lines)
- New skills: 4 Android skills (edge-to-edge, adaptive, navigation-3, theming)
- Impeccable detector: 14 static analysis rules across 17 script files
