# Spec 081: Product MCP Design

**Date**: 2026-03-20
**Rewritten**: 2026-04-09
**Purpose**: Define the Product MCP — what it is, what data it serves, where the boundary sits with the Application MCP, and how products configure it
**Organization**: spec-guide
**Scope**: 081-product-mcp-design
**Status**: Design outline — active

---

## Problem Statement

DesignerPunk ships three MCP servers as ecosystem infrastructure. The Docs MCP and Application MCP are built and working. The Product MCP doesn't exist yet.

Without it, product agents have no structured way to query screen specs, product flows, domain objects, or product-level design direction. Product architecture lives in documents, not queryable data.

This spec defines the Product MCP, settles the data boundary with the Application MCP, configures MCP paths (WS3), and builds the Product MCP (WS5) as ecosystem infrastructure that ships with `@designerpunk/core`.

---

## Key Decisions (Settled)

| Decision | Source |
|----------|--------|
| Product MCP ships with `@designerpunk/core` | Peter — ecosystem infrastructure, not product-built |
| Three MCP servers are ecosystem infrastructure | North Star — products configure them, they don't build them |
| System agents serve the repo, not just DesignerPunk | Peter — Ada governs all tokens, Lina governs all components, Thurgood governs all tests/specs |
| Products modify the system — no separation between "ecosystem" and "product" artifacts for tokens/components | Peter — the package is a starting point that the product molds |
| Token data index is Application MCP scope | Spec 096 (WS7) — proceeds independently |
| Experience pattern placement validated during Phase 2 | Peter + Thurgood — sorting happens against real screens |

---

## MCP Ownership

See `research/mcp-ownership-map.md` for the full working document.

### Docs MCP — Knowledge Layer
How to build with DesignerPunk. Steering docs, token/component family references, architectural guides, process standards.

### Application MCP — System Layer
What exists and how it works. Components, tokens, family guidance, basic layout templates, family registry, assembly validation, composition checking.

### Product MCP — Product Architecture Layer
What we're building and how it's structured. Product context, configuration, principles, experience map, product templates, domain objects.

---

## Product MCP Architecture

```
Product MCP
├── Product Overview
│   ├── Product Context (what it is, why we're building it)
│   └── Product Configuration (name, platforms, theme, abbreviation)
│
├── Product Principles
│   ├── Design Direction
│   └── Cross-Platform Strategy
│
├── Experience Map
│   ├── Vertical / Flow / Feature Page
│   │   ├── UX Direction
│   │   ├── UI Tree
│   │   │   ├── Systems Components (from Application MCP)
│   │   │   └── One-off Components (product-specific compositions)
│   │   ├── Data Sources
│   │   ├── Analytics
│   │   ├── Status (implementation progress per platform)
│   │   ├── State Model
│   │   ├── Accessibility
│   │   └── [extensible]
│   ├── Vertical / Flow / Feature Page
│   └── Vertical / Flow / Feature Page
│
├── Product Templates (page layouts + content layout patterns)
│
└── Domain Objects (product entities, referenced by screens)
```

### Experience Map Structure Types

Three types at the same level, each containing the same child specification structure:

- **Vertical**: A feature suite containing one or more feature pages, pages, and/or flows. Example: "Legislation" vertical contains the legislation list, bill detail, voting record flow.
- **Flow**: A sequential collection of pages facilitating an experience. Example: "Onboarding" flow — step 1 → step 2 → step 3.
- **Feature Page**: A standalone page that facilitates or launches deeper experience levels. Example: "Dashboard" — a hub that leads to verticals and flows.

The type affects navigation patterns: flows have sequential navigation (next/back), verticals have hierarchical navigation (drill in/out), feature pages have hub navigation (launch into).

### UI Tree: Systems Components vs One-off Components

Each screen's UI Tree distinguishes between:
- **Systems Components**: Ecosystem components from the Application MCP (Button-CTA, Container-Card-Base, etc.). Queryable via `get_component_full`, governed by Stemma.
- **One-off Components**: Product-specific compositions that don't exist in the ecosystem. Built from systems components but arranged in product-specific ways. Not in the Application MCP — only the Product MCP knows about them.

### Product Templates

Product-specific counterpart to the Application MCP's basic layout templates. Two scales:
- **Page layouts**: How the page is structured (grid, zones, responsive behavior)
- **Content layout patterns**: How content is arranged within a zone (card grids, list layouts, hero sections, comparison tables)

### Domain Objects

Product entities referenced by screens. A "Bill" object appears on multiple screens. Queryable independently ("what is a Bill?") and cross-referenced from screens ("the Legislation List screen displays Bill objects").

---

## Application MCP Changes

The Application MCP's scope narrows slightly and gains configurability:

### Removed
- Experience patterns — moved to Product MCP (experience map + product templates)

### Changed
- Layout templates → "Basic layout templates" (universal page-level responsive structure only)

### Added
- Token data index (Spec 096, WS7)
- Configurable paths for all data sources (WS3)

### Unchanged
- Components, family guidance, family registry, assembly validation, composition checking

---

## WS3: MCP Path Configuration

All three MCPs need explicit path configuration.

### Current State
- Application MCP: `COMPONENTS_DIR` env var, derives other paths via `../../..`
- Docs MCP: `MCP_STEERING_DIR` env var
- Product MCP: doesn't exist

### Target State
Each MCP accepts explicit paths for its data sources. The CLI resolves paths from the package root and passes them. Products can override via env vars or config.

Application MCP paths:
- Components directory
- Token index directory (Spec 096)
- Family guidance directory
- Basic layout templates directory
- Family registry path

Product MCP paths:
- Product data directory (contains overview, principles, experience map, templates, domain objects)

Docs MCP paths:
- Steering docs directory (unchanged)

---

## WS5: Product MCP Foundation

### Data Format

The Product MCP is a hybrid:
- **Structured data** (YAML): Experience map entries, domain objects, product templates, product config. Queryable via specific tools.
- **Documentary data** (Markdown): Product context, UX principles, design direction. Indexed and searchable like the Docs MCP.

### Query Tools (Phase 1 — minimum)

| Tool | Purpose |
|------|---------|
| `get_product_overview` | Product context, config, principles |
| `list_experience_map` | All verticals, flows, feature pages with status |
| `get_screen_spec` | Full spec for a vertical/flow/feature page (UI tree, state model, data sources, accessibility) |
| `get_domain_object` | Domain object definition and which screens reference it |
| `list_product_templates` | Product-specific layout and content patterns |

### CLI Command
`npx designerpunk mcp:product` — starts the Product MCP, resolves product data directory from config or cwd.

---

## Agent Reframing

When a product installs `@designerpunk/core`, system agents serve the entire repo:

- **Ada**: Token specialist for this repo. All tokens — ecosystem and product-created.
- **Lina**: Component specialist for this repo. All components — ecosystem and product-created.
- **Thurgood**: Test governance and spec standards for this repo.

Governance gradient applies: ecosystem artifacts that affect all products get heavier review. Product-specific artifacts get lighter review. But ownership is unified — no "ecosystem agent" vs "product agent" split.

---

## Open Questions

1. **Experience pattern placement**: The 9 ecosystem patterns need sorting — some become Product Templates, some become Experience Map entries, some stay as Docs MCP guidance. Validated during Phase 2 against real screens.

2. **Product data directory structure**: What does the on-disk layout look like for the Product MCP's data? YAML files per screen? A single large file? A directory tree mirroring the architecture?

3. **One-off component metadata**: One-off components in the UI Tree aren't in the Application MCP. Does the Product MCP need its own component metadata format for these, or is a simple description sufficient?

4. **Cross-MCP queries**: When a screen spec references a Systems Component, does the Product MCP resolve it against the Application MCP (merged view), or does the agent query both MCPs separately?

---

## Dependencies

| Spec | Relationship | Status |
|------|-------------|--------|
| 094 (Portable Pipeline) | Pipeline, theme registry, config | ✅ Complete |
| 095 (Package Assembly) | Package published, CLI, MCP bundling | ✅ Complete |
| 096 (Token Data Index) | Token queries in Application MCP | Independent, in progress |

---

## Success Criteria

1. MCP ownership boundary is defined and documented
2. All three MCP servers accept explicit path configuration (WS3)
3. `npx designerpunk mcp:product` starts the Product MCP
4. Product MCP serves product overview, principles, and config as queryable data
5. Product MCP serves experience map entries (verticals, flows, feature pages) with full spec structure
6. Product MCP serves domain objects with cross-references to screens
7. Product MCP serves product templates
8. Integration Guide documents Product MCP setup and data format
9. Agent prompts updated to reflect "serves the repo" model

---

## Discovery Inputs

- **Research responses**: `research/` directory — Leo, Ada, Lina, Kenya, Data, Sparky, Stacy
- **MCP ownership map**: `research/mcp-ownership-map.md`
- **Architecture diagram**: `research/Product MCP Architecture Draft.png`
- **Leonardo's wish list**: `discovery-leonardo-wish-list.md`
- **AI Interaction Atlas**: `github.com/quietloudlab/ai-interaction-atlas` — relevant to intent signals in experience map
