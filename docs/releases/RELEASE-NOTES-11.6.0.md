# Release 11.6.0

**Date**: 2026-05-20  
**Previous**: 11.5.2  
**Bump**: minor

## 🔴 Breaking / Consumer-Facing

- **Font Family Token Updates** *(Token)*
  Updated `fontFamilyBody` (Inter → Figtree) and `fontFamilyMono` (SF Mono → Commit Mono) token values. Added @font-face CSS declarations and package subpath exports for both new fonts.
- **Design Philosophy Authoring** *(Token)*
  Authored DesignerPunk's design philosophy as structured YAML data (`design-language/design-philosophy.yaml`). First time the system's aesthetic philosophy, named design rules, and visual guidance have been captured in machine-queryable form.
- **Validation and Integration** *(Token)*
  Created a 10-test integration suite verifying the full design language context flow across Application MCP (philosophy, rules, guidance, color strategy), Product MCP (brand context), and token output (font family transition).

## 🟡 Ecosystem Changes

- **Application MCP Design Language Tools** *(MCP)*
  Implemented a `DesignPhilosophyIndexer` that loads `design-philosophy.yaml` and registered 4 new tools in the Application MCP: `get_design_philosophy`, `get_design_rules`, `get_design_guidance` (with category filter), and `get_color_strategy` (with tier filter).
- **Product MCP Brand Context Extension** *(Tool)*
  Added `get_brand_context` tool to the Product MCP that extracts brand identity (personality, voice, tone, anti-references, register) from the product's `overview.yaml`. Returns a structured "not configured" response with authoring guidance when brand fields are absent.
- **Leonardo Skill Enhancement** *(MCP)*
  Enhanced Leonardo's capabilities with the Impeccable design creation skill, adapted for DesignerPunk's ecosystem. Created adapted register references, 31 domain and procedural references, MCP-aware SKILL.md, and updated Leonardo's prompt with Design Creation operational mode including gate system, conflict resolution, and anti-slop awareness.
