# Task 6 Completion: Agent Configuration Template

**Date**: 2026-04-08
**Spec**: 095 - Ecosystem Package Assembly
**Task**: 6 - Agent Configuration Template (WS6)
**Type**: Implementation
**Validation Tier**: 2 - Standard
**Agent**: Thurgood

---

## Summary

Created `product-template/agents/` with all 8 agent prompts pre-configured for the installed package context. MCP-only approach — no `fs_read` fallbacks to package internals. Products copy the directory and customize `[CUSTOMIZE]` markers.

## Artifacts Created

- `product-template/agents/README.md` — setup instructions, customization guide, MCP-only rationale
- `product-template/agents/ada-prompt.md` — token specialist, theme registry, pipeline config
- `product-template/agents/lina-prompt.md` — component specialist, theme consumption patterns
- `product-template/agents/thurgood-prompt.md` — test governance, audit, spec standards
- `product-template/agents/leonardo-prompt.md` — product architect, component selection via MCP
- `product-template/agents/sparky-prompt.md` — web platform, `data-theme` theming
- `product-template/agents/kenya-prompt.md` — iOS platform, `@Environment` theming, manual copy setup
- `product-template/agents/data-prompt.md` — Android platform, `CompositionLocal` theming, manual copy setup
- `product-template/agents/stacy-prompt.md` — product governance, metadata accuracy auditing

## Key Decisions

- **MCP-only**: All design system knowledge accessed via MCP queries. No `fs_read` to package internals. MCP queries are stable across package versions. (Leo R1, Lina R1, Stacy R1 consensus)
- **`[CUSTOMIZE]` markers**: Product name, human lead name, domain-specific knowledge, platform targets. Clear what to change vs what's fixed.
- **Governance layer fixed**: Domain boundaries, collaboration protocols, token governance rules, MCP query patterns are not customizable — they're the ecosystem's standards.

## Validation

- All 8 prompts created (1 per agent)
- All MCP query tables reference steering doc paths served by Docs MCP
- No `fs_read`, `file://`, `skill://`, or hardcoded `node_modules` paths in any template
- README documents setup, customization, and MCP-only rationale
- _Requirements: R10 AC 1-3_
