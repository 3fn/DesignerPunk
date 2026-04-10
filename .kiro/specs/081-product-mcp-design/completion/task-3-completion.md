# Task 3 Completion: Agent Reframing and Integration Guide

**Date**: 2026-04-10
**Spec**: 081 - Product MCP Design
**Task**: 3 - Agent Reframing and Integration Guide
**Type**: Implementation
**Validation Tier**: 2 - Standard
**Agent**: Thurgood

---

## Summary

Updated system agent prompts with unified repo ownership model, governance gradient principle, and Product MCP awareness. Updated Integration Guide with Product MCP setup, screen spec authoring, one-off component metadata, governance gradient table, and promotion path. Updated product agent templates with Product MCP queries and unified ownership.

## Artifacts Modified

### Agent Prompts (repo)
- `ada-prompt.md` — added Ownership section: governs all tokens in repo, governance gradient, config clarification
- `lina-prompt.md` — added Ownership section: governs all components in repo, governance gradient, one-off review, promotion path

### Product Agent Templates
- `product-template/agents/ada-prompt.md` — unified repo ownership, governance gradient
- `product-template/agents/lina-prompt.md` — unified repo ownership, governance gradient, one-off review
- `product-template/agents/thurgood-prompt.md` — unified repo ownership, governance gradient
- `product-template/agents/leonardo-prompt.md` — Product MCP queries added, organized by MCP server

### Integration Guide
- `.kiro/steering/DesignerPunk-Integration-Guide.md` — added:
  - Product MCP Setup section (startup, data directory, resolution chain)
  - Screen spec authoring guide (single-file, multi-file, platform branching with example)
  - One-off component metadata requirements (Stemma subset)
  - Governance Gradient table (ecosystem / product-extending / product-internal)
  - Promotion path documentation
  - Product MCP in CLI commands table
  - Product MCP query reference table

## Validation

- All agent prompts include "governs all [domain] in the repo" (R9 AC 1-3)
- Governance gradient principle with "when in doubt, consult" in prompts (R9 AC 4)
- Integration Guide has governance gradient table (R9 AC 5)
- Integration Guide documents `npx designerpunk mcp:product` (R10 AC 1)
- Integration Guide documents product data directory with examples (R10 AC 2)
- Integration Guide documents screen spec authoring (R10 AC 3)
- Integration Guide documents one-off component metadata (R10 AC 4)
- Integration Guide documents governance gradient (R10 AC 5)
- _Requirements: R9 AC 1-5, R10 AC 1-5_
