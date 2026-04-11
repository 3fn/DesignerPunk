# Spec 097: Product MCP Intelligence Layer

**Date**: 2026-04-11
**Purpose**: Upgrade the Product MCP from documentation infrastructure to intelligence infrastructure — discovery, impact analysis, reverse lookups, and enriched queries
**Organization**: spec-guide
**Scope**: 097-product-mcp-intelligence-layer
**Status**: Design outline
**Primary Owner**: Cross-agent (Ada for query tools, Lina for indexer enhancements)

---

## Problem Statement

The Product MCP (Spec 081) successfully serves product architecture as queryable data — screen specs, domain objects, templates, product overview. But it only supports exact-name queries. Agents can't discover, search, or analyze relationships without manually parsing list results.

Specific gaps:
- No way to find screens by context, status, component usage, or domain object usage
- No reverse lookup: "which screens use Button-CTA?" requires parsing every screen spec
- No token extraction from screen specs — can't answer "which screens use colorActionPrimary?"
- One-off components only queryable inline with screen specs, not directly
- Experience map list returns minimal data — no blocked reasons, no component references
- Templates not cross-referenced with screens
- Principles stored as text blobs, not queryable by keyword

Source: Peter's feedback from testing the Product MCP (`/.kiro/issues/2026-04-11-product-mcp-feedback`).

---

## Current State

The Product MCP serves:
- `get_product_overview` — product context, config, principles (markdown blobs)
- `list_experience_map` — flat list with name, type, per-platform status
- `get_screen_spec` — full spec by exact name, with platform filtering and one-off enrichment
- `get_domain_object` — by exact name, with `referencedBy` cross-references
- `list_product_templates` — flat list
- `get_product_health` / `rebuild_product_index` — health and rebuild

What's missing: discovery queries, reverse lookups, impact analysis, enriched list responses.

---

## Proposed Solution

### 1. Discovery & Search Tools

Build reverse indexes during indexing. Add search tools that filter across the experience map.

**New tool: `find_screens`**
```
find_screens({
  context?: string,           // screen type or domain area
  status?: string,            // 'not-started' | 'in-progress' | 'complete' | 'blocked'
  platform?: string,          // filter by platform status
  usesComponent?: string,     // screens whose UI tree references this component
  usesDomainObject?: string   // screens that reference this domain object
})
```

**New tool: `find_screens_using_component`**
```
find_screens_using_component({ component: string })
→ [{ screen, role, context }]
```
Leo's #1 wish list item. When a component's contract changes, agents need to know which screens are affected.

**New tool: `find_screens_using_domain_object`**
```
find_screens_using_domain_object({ object: string })
→ [{ screen, context }]
```

**New tool: `find_screens_using_token`**
```
find_screens_using_token({ token: string })
→ [{ screen, component, context }]
```
Requires extracting token references from UI tree nodes during indexing.

**Reverse indexes built during indexing:**
- component → screens (from UI tree traversal)
- domain object → screens (from data sources / domain object references)
- token → screens (from UI tree token references)

### 2. One-off Component Direct Query

**New tool: `get_product_component`**
```
get_product_component({ name: string })
→ { name, purpose, composedFrom, props, tokens, contracts }
```

Promotes one-off components from inline `_oneOffSchema` to first-class queryable entities. Agents can look up a product component without fetching a full screen spec.

### 3. Experience Map Enrichment

Enrich `list_experience_map` responses with data currently only available in full screen specs:

```
list_experience_map({
  status?: string,            // filter by status
  platform?: string,          // filter by platform
  usesComponent?: string,     // filter by component usage
  usesDomainObject?: string   // filter by domain object usage
})
→ [{
  name, type, status,
  blockedReasons,             // NEW: { platform: reason } for blocked screens
  referencedComponents,       // NEW: component names from UI tree
  referencedDomainObjects     // NEW: domain object names
}]
```

Makes the experience map useful for triage and impact analysis without querying every screen individually.

### 4. Template Cross-References

Allow screen specs to reference templates by name. Build template → screen reverse index.

**Screen spec addition:**
```yaml
template: card-grid    # references product/templates/card-grid.yaml
```

**New tool: `find_templates`**
```
find_templates({
  category?: 'layout' | 'content',
  usedBy?: string              // screen name
})
```

**Enrichment:** Templates include `usedBy: [screen names]` in query responses.

### 5. Principles as Structured Data

Convert principles from markdown blobs to YAML with keyword tags.

**Current:**
```
principles/design-direction.md → raw markdown string
```

**Proposed:**
```yaml
# principles/design-direction.yaml
name: design-direction
keywords: [visual-identity, color, typography, brand]
content: |
  The marketing site uses a dark theme with cyan/teal electric accent...
```

**New tool: `find_principles`**
```
find_principles({ keyword: string })
→ [{ name, keywords, content }]
```

Agents can query "what's our principle on empty states?" by keyword rather than parsing unstructured text.

### 6. Platform Filtering Fix

Current: filter platform content, then enrich one-offs, then warn about missing references.

Proposed: filter first, then enrich, then warn. Warnings are platform-aware — a web agent doesn't get warned about iOS-only one-off components they'll never implement.

---

## Design Decisions

| Decision | Rationale |
|----------|-----------|
| Reverse indexes built at index time, not query time | Performance — traversing every screen spec per query doesn't scale |
| Token extraction from UI tree nodes | Tokens referenced in screen specs are the bridge between product architecture and the token system |
| One-off components as first-class entities | Agents need to query them independently for implementation and impact analysis |
| Principles as YAML with keywords | Structured data is queryable; markdown blobs aren't |
| Template cross-references via screen spec `template:` field | Explicit reference, not inferred from content similarity |

---

## Scope Boundaries

### In Scope
- 4 new discovery/search tools (find_screens, find_screens_using_component, find_screens_using_domain_object, find_screens_using_token)
- 1 new direct query tool (get_product_component)
- 1 new principles tool (find_principles)
- 1 new templates tool (find_templates)
- Experience map enrichment (blocked reasons, component refs, domain object refs, filtering)
- Reverse index building during indexing
- Token extraction from UI tree
- Principles format migration (markdown → YAML)
- Platform filtering fix
- Integration Guide updates for new tools

### Out of Scope
- Application MCP changes (token index, component queries — separate specs)
- Cross-MCP enrichment (settled decision — reference by name)
- Screen spec authoring tools (the Product MCP reads specs, doesn't help write them)
- Leo's full wish list beyond discovery/impact (state machine queries, spec template generation — M0b+)

---

## Dependencies

| Dependency | Direction | Notes |
|------------|-----------|-------|
| Spec 081 (Product MCP) | Upstream | ✅ Complete — foundation to build on |
| Spec 096 (Token Data Index) | Upstream | ✅ Complete — token names available for cross-referencing |
| Phase 2 (marketing site) | Validates | Real product usage validates which tools matter most |

---

## Success Criteria

1. `find_screens({ usesComponent: "Button-CTA" })` returns all screens referencing Button-CTA
2. `find_screens({ status: "blocked", platform: "ios" })` returns blocked iOS screens with reasons
3. `find_screens_using_token({ token: "colorActionPrimary" })` returns screens using that token
4. `get_product_component({ name: "legislation-card" })` returns the one-off's schema and contracts directly
5. `list_experience_map()` includes blocked reasons and referenced component names
6. `find_principles({ keyword: "empty-state" })` returns relevant design principles
7. `find_templates({ usedBy: "dashboard" })` returns templates the dashboard screen uses
8. Platform filtering produces platform-aware warnings (web agent doesn't see iOS-only warnings)
