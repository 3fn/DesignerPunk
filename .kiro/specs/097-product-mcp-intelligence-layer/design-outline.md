# Spec 097: Product MCP Intelligence Layer

**Date**: 2026-04-11
**Updated**: 2026-04-23
**Purpose**: Upgrade the Product MCP from documentation infrastructure to intelligence infrastructure — discovery, impact analysis, reverse lookups, and enriched queries
**Organization**: spec-guide
**Scope**: 097-product-mcp-intelligence-layer
**Status**: Design outline (feedback incorporated)
**Primary Owner**: Lina (implements), Leonardo (reviews)

---

## Problem Statement

The Product MCP (Spec 081) successfully serves product architecture as queryable data — screen specs, domain objects, templates, product overview. But it only supports exact-name queries. Agents can't discover, search, or analyze relationships without manually parsing list results.

Specific gaps:
- No way to find screens by context, status, component usage, or domain object usage
- No reverse lookup: "which screens use Button-CTA?" requires parsing every screen spec
- No token extraction from screen specs — can't answer "which screens use color.surface.primary?"
- One-off components only queryable inline with screen specs, not directly
- Experience map list returns minimal data — no blocked reasons, no component references
- Templates not cross-referenced with screens
- Principles stored as text blobs, not queryable by keyword
- No state model extraction — platform agents must parse full specs for data/state questions
- No gap detection — screen specs can reference nonexistent or scaffold-status components silently

Source: Peter's feedback from testing the Product MCP (`.kiro/issues/2026-04-11-product-mcp-feedback`), external maturity assessment (`.kiro/docs/captured-feedback/2016-04-11-dp-distinction.md`), Leonardo's wish list (`.kiro/specs/081-product-mcp-design/discovery-leonardo-wish-list.md`).

---

## Current State

The Product MCP serves:
- `get_product_overview` — product context, config, principles (markdown blobs)
- `list_experience_map` — flat list with name, type, per-platform status
- `get_screen_spec` — full spec by exact name, with platform filtering and one-off enrichment
- `get_domain_object` — by exact name, with `referencedBy` cross-references
- `list_product_templates` — flat list
- `get_product_health` / `rebuild_product_index` — health and rebuild

What's missing: discovery queries, reverse lookups, impact analysis, enriched list responses, state model extraction, gap detection.

---

## Proposed Solution

### 1. Discovery & Search: Single `find_screens` Tool

Build reverse indexes during indexing. One consolidated tool with typed filter params.

**New tool: `find_screens`**
```
find_screens({
  context?: string,           // screen type or domain area
  status?: string,            // 'not-started' | 'in-progress' | 'complete' | 'blocked'
  platform?: string,          // filter by platform status
  usesComponent?: string,     // screens whose UI tree references this component
  usesDomainObject?: string,  // screens that reference this domain object
  usesToken?: string          // screens whose UI tree tokens: blocks reference this token
})
```

Six params. No dedicated `find_screens_using_*` tools — the parameter names carry intent. New filter params require a use case from actual product work (no speculative additions).

**Reverse indexes built during indexing:**
- component → screens (from UI tree traversal)
- domain object → screens (from data sources / domain object references)
- token → screens (from UI tree `tokens:` block extraction)

### 2. Token Extraction Schema

Tokens referenced in screen spec UI trees use a dedicated `tokens:` block per node, separate from `props:`. Dot-notation semantic token names.

```yaml
- component: Container-Card-Base
  props:
    variant: elevated
  tokens:
    background: color.structure.surface
    padding: space.inset.normal
  children:
    - component: Text-Heading-Base
      props:
        level: h2
        content: "Section Title"
      tokens:
        color: color.contrast.onLight
```

Props describe what a component does. Tokens describe how it looks. Separation gives the indexer a clean extraction target.

### 3. One-off Component Direct Query

**New tool: `get_product_component`**
```
get_product_component({ name: string })
→ { name, purpose, composedFrom, props, tokens, contracts }
```

Promotes one-off components from inline `_oneOffSchema` to first-class queryable entities.

### 4. State Model Extraction

**New tool: `get_screen_state_model`**
```
get_screen_state_model({ screen: string })
→ { data, states, actions, transitions }
```

Returns the state/data/actions slice of a screen spec without the full UI tree, accessibility notes, or UX direction. Platform agents' most-asked question during implementation.

### 5. Experience Map Enrichment

Enrich `list_experience_map` responses and add filtering:

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

### 6. Template Cross-References

Screen specs reference templates by name. Reverse index built at index time.

**Screen spec addition:**
```yaml
template: card-grid
```

**New tool: `find_templates`**
```
find_templates({
  category?: 'layout' | 'content',
  usedBy?: string              // screen name
})
```

Templates include `usedBy: [screen names]` in query responses.

### 7. Principles as Structured Data

Keep markdown files with YAML frontmatter for keywords. Indexer parses frontmatter for queries, serves markdown body as content.

```yaml
---
name: design-direction
keywords: [visual-identity, color, typography, brand]
---

The marketing site uses a dark theme with cyan/teal electric accent...
```

**New tool: `find_principles`**
```
find_principles({ keyword: string })
→ [{ name, keywords, content }]
```

### 8. Spec-to-Catalog Gap Detection

At index time, the Product MCP reads `component-meta.yaml` files from disk to build a catalog of known component names and their readiness status. During UI tree traversal, each component reference is validated against this catalog.

**Gap detection surfaces in two places:**

1. **On screen spec responses** — `_componentGaps` field listing unmatched or scaffold-status components:
```json
{
  "name": "legislation-list",
  "_componentGaps": [
    { "component": "BillCard", "issue": "not-found", "path": "ui-tree.children[0]" },
    { "component": "Progress-Bar-Base", "issue": "scaffold", "path": "ui-tree.children[1]" }
  ]
}
```

2. **In index health** — aggregate gap counts across all screens.

**Validation rules:**
- Exact string matching against `component-meta.yaml` names (no fuzzy matching)
- Components not in catalog AND not in Product MCP one-off components → `not-found`
- Components in catalog with `readiness: scaffold` → `scaffold` warning
- Cross-MCP boundary respected: reads files from disk, no runtime server calls

### 9. Platform Filtering Fix

Current: filter platform content, then enrich one-offs, then warn about missing references.

Proposed: filter first, then enrich, then warn. Warnings are platform-aware — a web agent doesn't get warned about iOS-only one-off components.

---

## Design Decisions

| Decision | Rationale |
|----------|-----------|
| Single `find_screens` tool, no dedicated tools | Multi-dimension queries are the norm for impact analysis. Fewer tools = less prompt token cost. Parameter names carry intent. (Leo R1) |
| Dedicated `tokens:` block per UI tree node | Clean separation from props. Unambiguous extraction target for indexer. Consistent structure benefits every agent reading specs. (Leo R1) |
| Dot-notation token names (`color.surface.primary`) | Matches Rosetta documentation conventions. Visually distinct from arbitrary strings. (Leo R1, pending Ada confirmation) |
| YAML frontmatter on markdown for principles | Prose is natural in markdown. Frontmatter gives structured keywords for queries without forcing YAML authoring. (Leo R1, Thurgood R1) |
| Reverse indexes built at index time, not query time | Performance — traversing every screen spec per query doesn't scale |
| One-off components as first-class entities | Agents need to query them independently for implementation and impact analysis |
| Template cross-references via screen spec `template:` field | Explicit reference, not inferred from content similarity |
| Gap detection reads `component-meta.yaml` from disk | Respects cross-MCP boundary. No runtime server calls to Application MCP. (Leo R2) |
| `_componentGaps` on screen spec responses | Agents need immediate visibility into gaps when querying a screen, not a separate health check. (Leo R2) |
| 6-param ceiling on `find_screens` for M0a | New params require use case from actual product work. Prevents speculative bloat. (Leo R1) |

---

## Test Strategy

Minimal test fixtures using WrKing Class domain as realistic inspiration. Fixtures are test data, not M0b deliverables.

**Fixture set:**
- 3-4 screen specs (e.g., legislation-list, bill-detail, representative-list, onboarding-welcome)
- 2 domain objects (e.g., Bill, Representative)
- 1 template
- 1 principle with YAML frontmatter

**Required coverage (Leo R2 checklist):**
- Multi-platform branching (shared + platform-specific content)
- One-off component references (at least one enrichable, one missing)
- Token references in UI tree `tokens:` blocks
- Domain object references
- At least one blocked screen with a `blockedReason`
- At least one principle with frontmatter keywords

**Component references use real DesignerPunk component names** (Button-CTA, Container-Card-Base, Nav-Header-App, Icon-Base) to exercise gap detection against actual `component-meta.yaml` files.

Leonardo reviews fixture shapes before implementation begins.

---

## Scope Boundaries

### In Scope
- 1 consolidated discovery tool (`find_screens` with 6 filter params)
- 1 direct query tool (`get_product_component`)
- 1 state model extraction tool (`get_screen_state_model`)
- 1 principles tool (`find_principles`)
- 1 templates tool (`find_templates`)
- Experience map enrichment (blocked reasons, component refs, domain object refs, filtering)
- Reverse index building during indexing (component→screens, domain object→screens, token→screens)
- Token extraction from UI tree `tokens:` blocks
- Spec-to-catalog gap detection (reads `component-meta.yaml` from disk)
- `_componentGaps` on screen spec responses
- Principles format: YAML frontmatter on markdown
- Platform filtering fix (filter-first ordering, platform-aware warnings)
- Test fixtures using WrKing Class domain
- Integration Guide updates for new tools

### Out of Scope
- Application MCP changes (token index, component queries — separate specs)
- Cross-MCP enrichment (settled decision — reference by name, not by server)
- Screen spec authoring tools (the Product MCP reads specs, doesn't help write them)
- Flow navigation graph (deferred — no M0a flows)
- Product-level validation (`validate_screen_spec` — future spec)
- Automated governance checking — future spec (M0b+)
- Leo's full wish list beyond discovery/impact (state machine queries, spec template generation — M0b+)
- Scaffold-status detection (readiness lives in schema YAML, not `component-meta.yaml` — Application MCP already surfaces readiness via `get_component_summary`)

### Known Gaps (Intentionally Absent)
- **Token gap detection**: Screen specs can reference tokens that don't exist. Intentionally not validated — specs may reference aspirational tokens ahead of token creation. Same architecture (read token registry from disk at index time) could be added later if needed.
- **Scaffold-status detection**: Dropped from Req 9 per Lina R1 / Leo R1. `component-meta.yaml` provides name existence only. Readiness status available via Application MCP's `get_component_summary`.

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
3. `find_screens({ usesToken: "color.structure.surface" })` returns screens using that token
4. `get_product_component({ name: "legislation-card" })` returns the one-off's schema and contracts directly
5. `get_screen_state_model({ screen: "legislation-list" })` returns state/data/actions without full spec
6. `list_experience_map()` includes blocked reasons and referenced component names
7. `find_principles({ keyword: "empty-state" })` returns relevant design principles
8. `find_templates({ usedBy: "dashboard" })` returns templates the dashboard screen uses
9. `get_screen_spec("legislation-list")` includes `_componentGaps` for any unmatched components (not-found)
10. Platform filtering produces platform-aware warnings (web agent doesn't see iOS-only warnings)
