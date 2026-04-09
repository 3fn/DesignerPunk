# Spec 081: Product MCP Design

**Date**: 2026-03-20
**Rewritten**: 2026-04-09 (consolidated from multiple rounds of additions)
**Purpose**: Define the Product MCP — what it is, what data it serves, where the boundary sits with the Application MCP, and how products configure it
**Organization**: spec-guide
**Scope**: 081-product-mcp-design
**Status**: Design outline — active, not waiting for M0b

---

## Problem Statement

DesignerPunk ships three MCP servers as ecosystem infrastructure: Docs MCP (steering documentation), Application MCP (components, patterns, templates, tokens), and Product MCP (product-specific data). The first two are built and working. The third doesn't exist yet.

Without the Product MCP:
- Product agents have no structured way to query screen specs, product flows, or product-specific patterns
- The boundary between "design system data" and "product data" is undefined — experience patterns, layout templates, and product-created tokens/components have no clear home
- MCP path configuration (WS3) can't be finalized because we don't know which data goes where
- Leo has no single endpoint for queries that span system and product data

This spec defines what the Product MCP is, settles the data boundary with the Application MCP, and builds it as ecosystem infrastructure that ships with `@designerpunk/core`.

---

## Key Decisions (Settled)

| Decision | Source |
|----------|--------|
| Product MCP ships with `@designerpunk/core` | Peter (2026-04-09) — ecosystem infrastructure, not product-built |
| Three MCP servers are ecosystem infrastructure | North Star — products configure them, they don't build them |
| System and product are bidirectional | North Star — products add tokens, themes, potentially components and patterns |
| WS3 (path configuration) and WS5 (Product MCP) are part of this spec | Spec 096 restructuring (2026-04-08) |
| Token data index is Application MCP scope | Spec 096 (WS7) — unambiguous, proceeds independently |

---

## Dependencies

| Spec | Relationship | Status |
|------|-------------|--------|
| 070 (Agent Architecture) | Established three-MCP model, relationship principles | Complete |
| 067 (Application MCP) | The Application MCP that Product MCP interacts with | Complete |
| 094 (Portable Pipeline) | Pipeline, theme registry, config system | ✅ Complete |
| 095 (Package Assembly) | Package published, CLI working, MCP servers bundled | ✅ Complete |
| 096 (Token Data Index) | Token queries in Application MCP | In progress (independent) |

---

## Design Session 0: Data Boundary

### The Core Question

What data lives in the Application MCP vs the Product MCP? The answer determines path configuration, Product MCP identity, and how agents query across both.

### Boundary Principle

**Application MCP serves ecosystem data** — artifacts that come from `@designerpunk/core` and are the same for every product. Components, tokens, family guidance, ecosystem patterns, ecosystem templates.

**Product MCP serves product data** — artifacts that are specific to a product and don't exist in the ecosystem package. Screen specs, product flows, product-created patterns, product-created templates, product config.

**The gray area**: products can create tokens, components, patterns, and templates that extend the ecosystem. Where do those live?

### Preliminary Data Boundary

| Data | MCP | Reasoning |
|------|-----|-----------|
| Ecosystem components (34 shipped) | Application | Same for every product |
| Ecosystem token data index | Application | Rosetta system artifacts (Spec 096) |
| Ecosystem family guidance | Application | Describes how DesignerPunk families work |
| Ecosystem experience patterns (9 shipped) | Application | Describe how ecosystem components compose |
| Ecosystem layout templates (4 shipped) | Application | Describe page-level layout with ecosystem tokens |
| Family registry | Application | Canonical family names |
| Product-created experience patterns | Product | A "legislation feed" pattern is product knowledge |
| Product-created layout templates | Product | A product's custom page layouts |
| Screen specs, product flows | Product | Product architecture |
| Product config (name, platforms, theme) | Product | Product identity |
| Product-created tokens | ? | Open — see below |
| Product-created components | ? | Open — see below |

### Open: Product-Created Tokens and Components

Products create tokens via the pipeline (theme overrides, product-specific semantic tokens). Products may create components extending Stemma. Where does this data get indexed?

**Option A: Application MCP indexes everything.** The Application MCP reads from both the package AND the product repo. `find_components` returns ecosystem + product components. `search_tokens` returns ecosystem + product tokens. Simple for agents — one query, complete results. But the Application MCP needs to know about the product repo's file structure.

**Option B: Product MCP indexes product-created artifacts.** The Application MCP only knows about ecosystem data. The Product MCP indexes product tokens and components separately. Agents query both, or the Product MCP merges results. Clean separation, but agents need to know which MCP to query (or the Product MCP handles merging).

**Option C: Product MCP merges at query time.** The Product MCP queries the Application MCP for ecosystem data, adds product data, returns a unified response. Agents always query the Product MCP. The Application MCP stays pure (ecosystem only). The Product MCP is the "enriched view."

### Product MCP Identity

Three models:

1. **Proxy** — forwards queries to Application MCP, adds nothing. Too thin.
2. **Standalone** — has its own data, agents query both MCPs separately. Fragmented.
3. **Merged view** — queries Application MCP for ecosystem data, adds product data, returns unified response. Single endpoint for agents.

**Preliminary recommendation: Merged view (Option C).** Leo gets one endpoint. The Application MCP stays clean. Product data enriches ecosystem data at query time.

Implications:
- Product MCP must understand the Application MCP's query interface
- Product MCP must handle the case where product data overlaps with ecosystem data (e.g., a product pattern with the same name as an ecosystem pattern)
- Product MCP startup depends on Application MCP being available

### Research Questions for Agent Feedback

These questions explore how agents actually work, not how they'd use a specific MCP design. The data boundary should emerge from understanding workflows.

**Leonardo (Product Architect):**
1. When you're beginning to develop a new product on DesignerPunk, what open questions do you have? What context would be helpful to have before you start?
2. When developing a spec for a new screen or experience within a product, what context and data do you need at a minimum to begin formulating a plan? What would be ideal?
3. Walk me through your mental process when you're selecting components for a screen. What do you look for, and what do you hope to find? How does that contrast with your experience today? What do you wish you could look up but can't today?

**Ada (Token Specialist):**
4. When a product needs its a new token, how do you think those tokens should be housed and expressed? Are tokens inherent to DesignerPunk fundamentally different from tokens added to support a product? Why?
5. When would you want a product developer to discover on their own vs consult with you on token needs directly? If you were helping a product developer create a new semantic token, what context would you need about the product to give good guidance?

**Lina (Component Specialist):**
6. When a product needs its a new component, how do you think those components should be housed and expressed? Are components inherent to DesignerPunk fundamentally different from those added to support a product? Why?
7. If a product needed a component that doesn't exist in the ecosystem, how would you think about whether it belongs in the DesignerPunk ecosystem or stays product-specific?
8. When a product extends or customizes an ecosystem component, how should the system handle that change? What areas around the component's code need to be updated?

**Kenya / Data / Sparky (Platform Engineers):**
9. When you're receiving implementation direction from Leo, what do you need? What would be optimal for you to receive and/or find on your own?
10. How does that contrast with your experience today?

**Stacy (Governance):**
11. When a product creates its own patterns, components, or tokens, should they be governed the same way as ecosystem artifacts? What would "product-level governance" look like vs "ecosystem-level governance"?

---

## Design Session 1: Product Primitives Shape

### Context

Product primitives were identified in Spec 070 as "the objects users create, the surfaces those objects can appear in, and the intent signals that determine which surface to show." They sit above DesignerPunk components — providing the *what* and *where* that components render.

### Three Elements

- **Objects**: Domain entities users interact with (e.g., Bill, Representative, UserProfile, ImpactScore)
- **Surfaces**: Contexts where objects appear (e.g., Dashboard, Detail Sheet, Search Results, Onboarding Flow)
- **Intent Signals**: Routing logic connecting objects to surfaces (e.g., user tapped bill → Bill Detail surface)

### Open Questions

1. **Schema format**: YAML (consistent with Application MCP's component-meta and family guidance)?
2. **Granularity**: Just names and relationships, or full property schemas?
3. **Surface → Pattern mapping**: How does a surface reference an experience pattern?
4. **Object → Component mapping**: How does an object specify which components render its properties?
5. **Intent signal representation**: Routing rules, state machine transitions, or something simpler?
6. **Template vs convention**: Does DesignerPunk provide a product primitives template, or just documentation?
7. **Queryability**: What MCP tools query product primitives? `find_objects`, `get_surface`, `resolve_intent`?

### Relationship to Application MCP

Product primitives determine *which* Application MCP pattern to use for *which* object on *which* surface:

```
Product MCP                          Application MCP
───────────                          ───────────────
Surface: "Bill Detail"        →      Experience Pattern: "detail-view"
Object: "Bill"                →      Components: Container-Card-Base, Badge-Label-Base
Intent: "user tapped bill"   →      Navigation: push to detail surface
```

**Note**: This session needs Leo's input — he's the primary consumer of product primitives.

---

## Design Session 2: Cross-MCP Reference Patterns

### Context

The MCP Relationship Model (Spec 070) established four governing principles:

1. Reference by stable identifier, not by path or internal structure
2. One direction of dependency (Product → Application → Docs, never reverse)
3. Graceful degradation (clear "not found" on broken references)
4. Promotion is explicit (product content doesn't auto-become system content)

### Open Questions

1. **Reference syntax**: Name string (`"Button-CTA"`) or structured reference (`{ mcp: "application", type: "component", name: "Button-CTA" }`)?
2. **Version stability**: How do Product MCP references update when Application MCP renames something?
3. **Validation**: Build-time, query-time, or both?
4. **Reference resolution**: Does the Product MCP resolve references (returning enriched data), or does the agent make separate queries?
5. **Cross-MCP queries**: Does Leo ever need a single operation spanning both MCPs?

**Note**: If the Product MCP is a merged view (Session 0 recommendation), questions 4-5 are answered — the Product MCP resolves references internally and returns enriched data. The agent always queries one endpoint.

---

## WS3: MCP Path Configuration

Once the data boundary is settled, each MCP needs explicit path configuration.

### Current State

- Application MCP: accepts `COMPONENTS_DIR` env var, derives patterns/templates/guidance by walking `../../..` from components
- Docs MCP: accepts `MCP_STEERING_DIR` env var
- Product MCP: doesn't exist yet

### Target State

All three MCPs accept explicit paths for their data sources. The CLI (`npx designerpunk mcp:app`, `mcp:docs`, `mcp:product`) resolves paths from the package root and passes them. Products can override via env vars or config.

Specific path configuration depends on the data boundary decision from Session 0.

---

## WS5: Product MCP Foundation

Build the Product MCP as ecosystem infrastructure that ships with `@designerpunk/core`.

### Minimum Capabilities

1. **Serve product configuration** — product name, platforms, theme (from `designerpunk.config.ts`)
2. **Serve product-specific data** — screen specs, product patterns, product templates (from a configured product data directory)
3. **Merge with Application MCP data** — if merged view model is confirmed, proxy ecosystem queries and enrich with product data
4. **Extension points** — hooks for product primitives (Session 1) and cross-MCP references (Session 2) when those designs are finalized
5. **CLI command** — `npx designerpunk mcp:product`

### What Does NOT Ship in Phase 1

- Leo's wish list features (screen↔component lookup, state models, gap detection)
- Product primitives schema (Session 1 — needs Leo's design input)
- Cross-MCP reference validation (Session 2 — needs design input)
- Dedicated MCP agent (see below — may be deferred)

---

## Dedicated MCP Agent

With three MCPs in production, cross-cutting infrastructure concerns (index health, metadata validation, cross-MCP reference integrity) need an owner.

### Proposed Scope
- Index health monitoring across all three MCPs
- Metadata validation
- Cross-MCP reference integrity
- Rebuild triggers when indexes are stale
- Recommending alignment when drift is detected

### Open Questions
1. Agent name and identity
2. Relationship to Thurgood — coexist or subsume MCP-related governance?
3. Timing — ship with the Product MCP, or defer until cross-MCP references are implemented?

---

## Discovery Inputs

- **Leonardo's wish list**: `discovery-leonardo-wish-list.md` — bidirectional screen↔component lookup is the highest-value capability. Speculative — real usage validates priorities.
- **AI Interaction Atlas**: `github.com/quietloudlab/ai-interaction-atlas` — taxonomy for AI interaction design. Relevant to intent signals in product primitives. Limitation: AI-specific, not general-purpose.

---

## Scope Boundaries

### In Scope
- Application MCP / Product MCP data boundary definition
- Product MCP design and implementation (ships with `@designerpunk/core`)
- MCP path configuration for all three servers (WS3)
- Product primitives schema (with Leo's input)
- Cross-MCP reference patterns
- `npx designerpunk mcp:product` CLI command
- Integration Guide contribution (Product MCP section)

### Out of Scope
- Token data index (Spec 096 — independent)
- Docs MCP changes (beyond path configuration)
- Application MCP query tool changes (beyond path configuration)
- Specific product content (marketing site screens, WrKing Class data)
- Leo's full wish list features (M0b — after real usage validates priorities)

---

## Success Criteria

1. Data boundary between Application MCP and Product MCP is defined and documented
2. All three MCP servers accept explicit path configuration
3. `npx designerpunk mcp:product` starts the Product MCP
4. Product MCP serves product configuration as queryable data
5. Product MCP serves product-specific patterns and templates from a configured directory
6. If merged view: Product MCP proxies Application MCP queries and enriches with product data
7. Product primitives schema is defined (even if minimal for Phase 1)
8. Integration Guide documents Product MCP setup and configuration

---

## Feedback Requested

**Session 0 (data boundary)**: All agents — answer the 11 questionnaire questions above.

**Session 1 (product primitives)**: Leo primarily — he's the consumer. Ada for token boundary. Lina for component boundary.

**Session 2 (cross-MCP references)**: Leo + Ada + Lina — they own the data being referenced.
