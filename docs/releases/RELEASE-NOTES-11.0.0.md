# Release 11.0.0

**Date**: 2026-05-06  
**Previous**: 10.2.0  
**Bump**: major

## 🔴 Breaking / Consumer-Facing

- **Reverse Indexes, Gap Detection & New Tools** *(Token)*
  Built the intelligence layer for the Product MCP: three reverse indexes (component→screens, token→screens, domainObject→screens), gap detection against the component catalog, 5 new query tools, enriched experience map, and platform-aware filtering. Fixed a latent bug in one-off enrichment for branched UI trees.
- **Application MCP Token Query Tools** *(Token)*
- **Component Consumption Migration (R8)** *(Component)*

## 🟡 Ecosystem Changes

- **Dormant Tooling Assessment and Trigger Implementation** *(Tool)*
  Assessed 4 dormant governance scripts, updated 3, deprecated 1, built 3 new trigger scripts, and created a governance-check.sh wrapper that orchestrates all triggers with a fast no-op path when no governance-relevant changes are detected.
- **Systems Overview Restructure and Terminology Rollout** *(Agent)*
  Renamed Rosetta-Stemma-Systems-Overview to DesignerPunk-Systems-Overview and restructured from two-system to three-system framing with Civitas diagrams. Rolled out Civitas terminology across 5 steering docs and 8 agent prompts. Updated all cross-references to the renamed file.
- **Surface Area Inventory and Prior Audit Consumption** *(MCP)*
  Produced a complete categorized inventory of DesignerPunk's intelligence layer (86 steering docs, 2 MCP servers, 8 agents, 13 hooks, 24 knowledge bases) with dual-axis tagging by content domain and infrastructure role. Consumed and assessed governance tooling from 4 prior audit specs (020, 032, 033, 036).
- **Terminology Audit and Staleness Assessment** *(Agent)*
  Scanned 86 steering docs and 16 agent files for intelligence layer terminology to estimate the Civitas naming rollout blast radius. Ran the existing staleness detection script and cross-referenced results against the spec log to distinguish stale-and-inaccurate docs from stale-but-stable ones.
- **Governance Gap Analysis** *(MCP)*
  Produced a consolidated governance gap analysis covering enforcement mechanisms (88 expectations inventoried), cross-reference fragility (332 cross-references assessed), and process gaps (5 governance processes evaluated). Consulted Ada and Lina for domain-specific enforcement mechanism inventories.
- **Module Extraction & Test Infrastructure** *(MCP)*
  Extracted the Product MCP server from a single 280-line file into a modular architecture: `ProductIndexer` (indexing orchestrator), `PrinciplesParser` (YAML frontmatter parsing), and shared `models.ts` (8 TypeScript interfaces). Established test infrastructure and created comprehensive fixtures for Phase 2 development.
