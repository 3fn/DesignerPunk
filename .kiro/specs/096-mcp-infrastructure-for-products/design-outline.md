# Spec 096: Token Data Index for Application MCP

**Date**: 2026-04-08
**Purpose**: Add structured, queryable token data to the Application MCP via a build-time YAML index
**Organization**: spec-guide
**Scope**: 096-token-data-index
**Status**: Design outline
**M0a Phase 1**: Block C (WS7 only — WS3 and WS5 moved to Spec 081)
**Primary Owner**: Ada

---

## Problem Statement

Agents can query components (`find_components`, `get_component_full`) but can't query tokens. "What tokens exist in the spacing family?" or "Which components consume `colorActionPrimary`?" require reading source files, not MCP queries. Leo's screen→token lookup and Ada's theme creation workflow both need structured token data.

---

## Context: Why Only WS7

Block C originally included WS3 (configurable MCP paths), WS5 (Product MCP foundation), and WS7 (token data index). During planning, we identified that WS3 and WS5 depend on the Application MCP / Product MCP data boundary, which isn't settled. That boundary question is now part of Spec 081.

WS7 is unambiguously Application MCP scope — token data is design system data regardless of where the Product MCP boundary lands. It can proceed independently.

---

## Current State

The Application MCP indexes components, patterns, templates, and guidance. It does not index tokens. Token data lives in:
- TypeScript source files (`src/tokens/*.ts`) — primitive and semantic definitions
- Component token files (`*.tokens.ts`) — component-level token references
- Generated platform outputs (`dist/DesignTokens.*`) — platform-specific values

None of this is queryable via MCP.

---

## Proposed Solution

### Build-Time YAML Index

Three files by tier (Ada R3/R4), generated as part of `npx designerpunk generate`:

```
token-index/
  primitives.yaml    — all primitive tokens (families, values, math relationships)
  semantics.yaml     — all semantic tokens (primitive references, categories)
  components.yaml    — all component tokens (primitive references, consuming components)
```

**Generation approach** (Ada R2): A build-time script that:
- Walks token source files (primitives, semantics, component tokens)
- Walks component `schema.yaml` `tokens:` sections for consumer relationships
- Produces structured YAML per token: name, family, category, tier, values per platform, mathematical relationship, consuming components
- Marks theme-varying tokens (overridden in any registered theme) vs static
- Runs as part of `npx designerpunk generate`, same as platform token output

### Application MCP Query Tools

Four new tools loaded at startup alongside the component index:

| Tool | Parameters | Returns |
|------|-----------|---------|
| `search_tokens` | `family`, `tier`, `name` (all optional) | Matching tokens with name, family, tier, value |
| `get_token_details` | `name` (required) | Full token: value, family, tier, platform outputs (web/iOS/Android), mathematical relationship, theme-varying status, consuming components |
| `get_token_family` | `family` (required) | All tokens in the family with values and relationships |
| `get_token_consumers` | `token` (required) | All components that reference the token, with the context (schema tokens section) |

### Token Index Location

`token-index/` at the package root, alongside `experience-patterns/`, `layout-templates/`, `family-guidance/`. It's a generated artifact, but the Application MCP's other data lives at the root, and consistency matters for the path configuration that Spec 081 will define.

---

## Design Decisions (Settled)

| Decision | Source |
|----------|--------|
| YAML format (not JSON) | Ada R3, project convention |
| Three files by tier | Ada R4 — maps to governance hierarchy |
| Theme-varying marking included | Ada R2 — union of overridden token names |
| Consumer relationships from schema.yaml | Ada R2 — walk component tokens sections |
| Generated as part of `npx designerpunk generate` | Ada R2 — same pipeline, same build step |

---

## Open Questions

1. **Index scope — all platforms or web-only values?** The index should include values for all three platforms (web CSS property, iOS Swift constant, Android Kotlin constant). But the generated platform files use different naming conventions (`--color-action-primary` vs `colorActionPrimary` vs `color_action_primary`). Should the index include all three names, or just the canonical token name with a note about platform conventions?

2. **Mathematical relationships — how detailed?** Primitive tokens have mathematical foundations (e.g., `space100 = 8` from the 8px baseline grid, `space150 = space100 * 1.5`). Should the index capture the formula, just the value, or both?

---

## Scope Boundaries

### In Scope
- Token index generation script (three YAML files)
- Application MCP token query tools (4 tools)
- Integration with `npx designerpunk generate`
- Theme-varying token marking
- Consumer relationship mapping
- Agent resource updates for token query capabilities
- Integration Guide contribution (token query section)

### Out of Scope
- MCP path configuration (Spec 081 — WS3)
- Product MCP foundation (Spec 081 — WS5)
- Application MCP / Product MCP data boundary (Spec 081)
- Token creation or modification (Ada's domain, not an MCP concern)

---

## Dependencies

| Dependency | Direction | Notes |
|------------|-----------|-------|
| Spec 094 (Block A) | Upstream | ✅ Complete — pipeline, theme registry |
| Spec 095 (Block B) | Upstream | ✅ Complete — package published |
| Spec 081 (WS3 + WS5) | Parallel | Token index is independent of the data boundary question |
| Phase 2 | Downstream | Leo uses token queries during screen specification |

---

## Success Criteria

1. `npx designerpunk generate` produces `token-index/primitives.yaml`, `semantics.yaml`, `components.yaml`
2. `search_tokens({ family: "spacing" })` returns all spacing tokens with values
3. `get_token_details({ name: "space100" })` returns value, family, tier, platform outputs, theme-varying status
4. `get_token_consumers({ token: "colorActionPrimary" })` returns all components that reference it
5. `get_token_family({ family: "color" })` returns all color tokens organized by semantic concept
6. Theme-varying tokens are correctly marked in the index
7. All existing MCP tests pass — no regressions

---

## Feedback Requested

- **Ada**: Is the generation approach still accurate after Spec 094? Any pipeline changes that affect how tokens are walked?
- **Lina**: Do the consumer relationships from `schema.yaml` cover all token references, or do some components reference tokens outside the schema?
- **Leonardo**: Do these four query tools cover your Phase 2 needs for token selection?
