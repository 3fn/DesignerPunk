# Product MCP Design: Schema, Primitives, and Cross-MCP References

**Date**: 2026-03-20
**Purpose**: Define the Product MCP's schema, product primitives shape, and cross-MCP reference patterns — completing the three-MCP architecture established in Spec 070
**Organization**: spec-guide
**Scope**: 081-product-mcp-design
**Status**: Design outline — capturing scope and open questions for future design sessions

---

## Problem Statement

Spec 070 (Agent Architecture) established a three-node knowledge network with three corresponding MCPs: Docs MCP (system core), Application MCP (system application), and Product MCP (product ecosystem). The MCP Relationship Model (drafted in Spec 070) defines the boundaries, information flow, and access model between them.

Two design conversations remain unresolved:

1. **Product primitives shape** — The Product MCP's most architecturally significant content type. Objects, surfaces, and intent signals need a schema that connects product domain knowledge to DesignerPunk's component and pattern vocabulary. Without this, Leonardo has no structured way to translate product context into screen specifications.

2. **Cross-MCP reference patterns** — How Product MCP entries reference Application MCP components and patterns, and how those references stay stable as both systems evolve. The relationship model established four governing principles but deferred the detailed patterns.

These are parent-child: the relationship model (parent) must be stable before product primitives (child) can take shape. The relationship model is drafted. This spec picks up from there.

---

## Dependencies

| Spec | Relationship | Status |
|------|-------------|--------|
| 070 (Agent Architecture) | Established three-node model, MCP relationship model, product agent definitions | Design outline + drafts complete |
| 067 (Application MCP) | The Application MCP that Product MCP references | Complete |
| 068 (Family Guidance Indexer) | Prop guidance that Product MCP entries may reference | Complete |
| 069 (Layout Templates) | Layout guidance that Product MCP entries may reference | Design outline |

---

## Activation Trigger

**Updated 2026-04-07**: The packaging trigger is being resolved by M0a Phase 1. The Product MCP foundation (minimal scaffold) ships with `@designerpunk/core` as part of the Block C spec. The full spec (081) activates for M0b when a real product demands the complete Product MCP vision.

Remaining triggers for full spec activation:
- M0a Phase 2 (marketing site) generates real usage data about what product agents actually query
- M0b (WrKing Class) requires product primitives, cross-MCP references, and wish list capabilities
- The MCP Relationship Model (Spec 070) has been validated through M0a product application

---

## North Star Context (2026-04-07, updated 2026-04-08)

This spec exists within the DesignerPunk ecosystem vision defined in `docs/roadmap/north-star-design-system-ecosystem.md`. Key context:

- **DesignerPunk is an ecosystem, not a library.** Products install `@designerpunk/core` and get the pipeline, components, MCP servers, and governance framework. Products participate in the ecosystem (adding tokens, themes, potentially components) — they don't just consume outputs.
- **System and product are bidirectional.** Products create their own tokens and themes using the packaged pipeline. The Product MCP bridges product-specific data with design system data served by the Application MCP.
- **Leonardo's discovery wish list** is captured in `discovery-leonardo-wish-list.md` alongside this outline. Bidirectional screen↔component lookup is the highest-value capability. The wish list informs extension points but is explicitly speculative — real usage during M0a Phase 2 and M0b validates priorities.

### Scope Expansion (2026-04-08): WS3 + WS5 Absorbed into This Spec

During Spec 096 (Block C) planning, we identified that the Application MCP / Product MCP data boundary is unsettled, and two workstreams depend on it:

- **WS3 (Configurable MCP paths)** — configuring which data directories each MCP server reads from. This depends on knowing which data lives in the Application MCP vs the Product MCP. Example: experience patterns might move to the Product MCP. Templates might exist in both.
- **WS5 (Product MCP foundation)** — building the Product MCP. Can't be built without knowing what it hosts.

**These are the same architectural question.** WS3 and WS5 are now part of this spec (081), not Block C. Spec 096 retains only WS7 (token data index), which is unambiguously Application MCP scope.

### What This Spec Must Now Define

Before any implementation, this design outline must answer:

1. **Data boundary**: What data lives in the Application MCP vs the Product MCP?
   - Components, schemas, contracts, metadata — Application MCP (clear)
   - Token data index — Application MCP (clear, WS7)
   - Family guidance — Application MCP? Product MCP? Both?
   - Experience patterns — Application MCP? Product MCP? Both? Products may have their own patterns.
   - Layout templates — Application MCP? Product MCP? Both?
   - Screen specs, product flows — Product MCP (clear)
   - Product config (name, platforms, theme) — Product MCP (clear)

2. **Merging vs separation**: If both MCPs serve patterns/templates, how does an agent query across both? Does the Product MCP merge its data with the Application MCP's, or do agents query both separately?

3. **Path configuration (WS3)**: Once the boundary is defined, how does each MCP discover its data? Env vars? Config file? Package root resolution?

4. **Product MCP identity**: What IS the Product MCP? A proxy that enriches Application MCP queries with product context? A standalone server with its own data? A merged view of system + product data?

### What Changed from the Original Design Outline

The original design outline (pre-ecosystem) focused on:
- Product primitives (objects, surfaces, intent signals)
- Cross-MCP reference patterns
- Dedicated MCP agent

These are still relevant but now sit within a larger question: the data boundary between Application and Product MCPs in an ecosystem where products participate, not just consume. The product primitives design depends on knowing where they live and how they're queried.

### Activation

This spec is now active — not waiting for M0b. The data boundary question blocks:
- WS3 (MCP path configuration) — can't configure paths without knowing what goes where
- WS5 (Product MCP foundation) — can't build it without knowing what it hosts
- Phase 2 (marketing site) — Leo needs to know which MCP to query for what

The token data index (WS7, Spec 096) can proceed independently.

---

## Design Session 0: Application MCP / Product MCP Data Boundary

**Added**: 2026-04-08 (WS3 + WS5 absorption)
**Status**: Open — needs resolution before WS3 or WS5 implementation

### The Core Question

What data lives in the Application MCP vs the Product MCP? The answer determines path configuration (WS3), Product MCP identity (WS5), and how agents query across both.

### Preliminary Assessment (Thurgood — instincts, not decisions)

| Data | Likely Home | Reasoning |
|------|-------------|-----------|
| Components, schemas, contracts, metadata | Application MCP | Design system artifacts — same for every product |
| Token data index | Application MCP | Rosetta system artifacts (confirmed — WS7/Spec 096) |
| Family guidance | Application MCP | Describes how DesignerPunk families work — system knowledge |
| Ecosystem experience patterns | Application MCP | Describe how DesignerPunk components compose — system knowledge |
| Ecosystem layout templates | Application MCP | Describe page-level layout with DesignerPunk tokens — system knowledge |
| Product-specific experience patterns | Product MCP | A "legislation feed" pattern is WrKing Class knowledge, not system knowledge |
| Product-specific layout templates | Product MCP | A product's custom page layouts |
| Screen specs, product flows | Product MCP | Product architecture — Leo's domain |
| Product config (name, platforms, theme) | Product MCP | Product identity |
| Product-created tokens | ? | Products create tokens via the pipeline. Are they system data (Application MCP indexes them) or product data (Product MCP indexes them)? |
| Product-created components | ? | Same question. If a product extends Stemma with its own components, which MCP serves them? |

### Preliminary Assessment: Product MCP Identity

Three models considered:

1. **Proxy**: Product MCP forwards all queries to Application MCP, adds nothing. Agents query one endpoint. — Too thin. Adds a hop without adding value.

2. **Standalone**: Product MCP has its own data, agents query both MCPs separately. — Fragmented. Leo doesn't want to query two endpoints for "what components can I use?"

3. **Merged view**: Product MCP queries Application MCP for system data, adds product data to the results. Agents see one unified response. — Best of both. Single endpoint, enriched with product context. When Leo queries "find components for a login form," the Product MCP returns Application MCP results plus product-specific annotations.

**Preliminary recommendation**: Merged view. But this has implications — the Product MCP needs to understand the Application MCP's query interface well enough to merge results coherently. That's a tighter coupling than a simple proxy.

### Questions for Agent Feedback

These should be explored during the design outline formalization, potentially via a questionnaire to product agents:

1. **Leo**: When you spec a screen, do you want one MCP endpoint or two? If one, do you want product patterns mixed into the same `list_experience_patterns` results as ecosystem patterns, or separated?

2. **Leo**: If a product creates its own component (extending Stemma), should `find_components` return it alongside the 34 ecosystem components? Or should product components be a separate query?

3. **Ada**: If a product creates tokens via the pipeline, should the token data index (Spec 096) include them? Or are product tokens a separate index served by the Product MCP?

4. **Kenya/Data**: When you implement a screen, do you query the MCP for component APIs? If the Product MCP merges system + product data, does that help or confuse your workflow?

5. **Sparky**: Same question from the web side — merged results helpful or confusing?

6. **Stacy**: From a governance perspective, should product-created patterns/components be held to the same standards as ecosystem patterns/components? If so, the Product MCP needs to validate them the same way the Application MCP validates ecosystem data.

---

## Design Session 1: Product Primitives Shape

### Context

Product primitives were identified in Spec 070 as "the objects users create, the surfaces those objects can appear in, and the intent signals that determine which surface to show." They sit above DesignerPunk components — providing the *what* and *where* that components render.

### Three Elements

- **Objects**: Domain entities users interact with (e.g., in a civic engagement app: Bill, Representative, UserProfile, ImpactScore)
- **Surfaces**: Contexts where objects appear (e.g., Dashboard, Detail Sheet, Search Results, Onboarding Flow)
- **Intent Signals**: Routing logic connecting objects to surfaces (e.g., user tapped bill → Bill Detail surface)

### Open Questions

1. **Schema format**: YAML (consistent with Application MCP's component-meta and family guidance)? JSON? Something else?
2. **Granularity**: How detailed should object definitions be? Just names and relationships, or full property schemas?
3. **Surface → Pattern mapping**: How does a surface definition reference Application MCP experience patterns? Direct reference by pattern name? Contextual query parameters?
4. **Object → Component mapping**: How does an object definition specify which DesignerPunk components render its properties? Per-property mapping? Per-surface mapping?
5. **Intent signal representation**: Are these routing rules, state machine transitions, or something simpler?
6. **Template vs convention**: Does DesignerPunk provide a product primitives template (scaffolding), or just the convention (documentation)?
7. **Queryability**: What MCP tools would agents use to query product primitives? `find_objects`, `get_surface`, `resolve_intent`?

### Relationship to Application MCP

Product primitives determine *which* Application MCP pattern to use for *which* object on *which* surface. This is the primary cross-MCP reference point:

```
Product MCP                          Application MCP
───────────                          ───────────────
Surface: "Bill Detail"        →      Experience Pattern: "detail-view"
Object: "Bill"                →      Components: Container-Card-Base, Badge-Label-Base
Intent: "user tapped bill"   →      Navigation: push to detail surface
```

---

## Design Session 2: Cross-MCP Reference Patterns

### Context

The MCP Relationship Model (Spec 070) established four governing principles:

1. Reference by stable identifier, not by path or internal structure
2. One direction of dependency (Product → Application → Docs, never reverse)
3. Graceful degradation (clear "not found" on broken references)
4. Promotion is explicit (product content doesn't auto-become system content)

This session defines the detailed patterns that implement these principles.

### Open Questions

1. **Reference syntax**: How does a Product MCP entry reference an Application MCP component? By name string (`"Button-CTA"`)? By a structured reference object (`{ mcp: "application", type: "component", name: "Button-CTA" }`)?
2. **Version stability**: When Application MCP renames a component or pattern, how do Product MCP references update? Manual migration? Alias support? Breaking change protocol?
3. **Validation**: Can the Product MCP validate its references against the Application MCP at build time? At query time? Both?
4. **Bidirectional awareness**: The relationship model says system MCPs have no knowledge of product content. But should the Application MCP be *aware* that products reference its identifiers, even if it doesn't know which products? This affects how breaking changes are communicated.
5. **Reference resolution**: When Leonardo queries the Product MCP for a surface definition that references Application MCP patterns, does the Product MCP resolve those references (returning enriched data), or does Leonardo make separate queries to each MCP?
6. **Cross-MCP query patterns**: Does Leonardo ever need to query across MCPs in a single operation ("give me the surface definition AND the referenced pattern details"), or are sequential queries sufficient?

---

## Scope Boundaries

### In Scope
- Product primitives schema definition
- Cross-MCP reference pattern specification
- Product MCP tool design (query interface)
- Template or convention for product teams adopting DesignerPunk
- Dedicated MCP agent definition and creation (see below)

### Out of Scope
- Product MCP server implementation (separate engineering spec)
- DesignerPunk packaging vehicle (Kiro Power, plugin, etc.)
- Specific product content (Working Class or any other product)
- Docs MCP or Application MCP changes (unless cross-MCP references require them)

---

## Relationship to Spec 070

This spec is a direct child of Spec 070's MCP Relationship Model. It does not revisit the boundary definitions, information flow, or access model — those are settled in Spec 070. It extends the relationship model with the detailed design that was explicitly deferred.

| Defined in Spec 070 | Extended in Spec 081 |
|---------------------|---------------------|
| Three-MCP boundaries | Product MCP content schema |
| Information flow direction | Cross-MCP reference patterns |
| Access model (who queries what) | Product MCP query tools |
| Interface contract principles | Detailed reference syntax and validation |
| Product primitives concept | Product primitives schema |
| — | Dedicated MCP agent (new) |

---

## Dedicated MCP Agent

**Added**: 2026-03-29 (from Spec 086 Task 5.1 scope boundary discussion)

With three MCPs in production, no single existing agent owns the cross-cutting infrastructure concerns. A dedicated MCP agent should be defined and created as part of this spec so it's born alongside the Product MCP with all three MCPs in scope from day one.

### Proposed Scope
- Index health monitoring across all three MCPs
- Metadata validation (correct headers, required fields)
- Cross-MCP reference integrity (stability contract enforcement)
- Rebuild triggers when indexes are stale or corrupted
- Recommending alignment specs or tasks when drift is detected between MCPs

### Operating Model
- **Audits and recommends** — does not modify domain content
- Domain agents (Ada, Lina) still own their content; the MCP agent owns infrastructure and integrity
- Same audit-vs-write distinction as Thurgood's test governance role

### Open Questions
1. Agent name and identity
2. Which tools does it need access to? (All three MCPs' health/index tools at minimum)
3. Does it need write access to any MCP configuration, or is it purely advisory?
4. Relationship to Thurgood — Thurgood currently uses Documentation MCP tools for spec work. Does the MCP agent subsume that, or do they coexist?

---

## Reevaluation Triggers

- **Packaging vehicle decision**: The technical integration pattern may constrain schema and reference design choices
- **First product application attempt**: Real usage will validate or invalidate assumptions about what product primitives need to contain
- **Application MCP evolution**: New tools or content types (layout templates from Spec 069) may affect cross-MCP reference patterns
- **Agent tooling maturity**: Direct agent-to-agent communication (if it becomes available) may change how cross-MCP queries work

---

## Reference Bookmarks

### AI Interaction Atlas

**Source**: https://github.com/quietloudlab/ai-interaction-atlas (Apache 2.0)
**NPM**: `@quietloudlab/ai-interaction-atlas`
**Relevance**: Design Session 1 (Product Primitives Shape)

An open-source taxonomy for AI interaction design with six dimensions: AI tasks, human tasks, system tasks, data artifacts, constraints, and touchpoints. Each task has typed inputs/outputs, relations to other tasks (enables, commonly_followed_by, incompatible_with), and UX notes (risk, tip, anti_patterns). Available as a queryable npm package.

**Why it's worth reviewing when this spec activates:**

The atlas's data model offers one approach to the "intent signals" question in product primitives. Its `WorkflowTemplate` concept — a graph of connected tasks with typed data flowing between them — is structurally close to what the Product MCP needs for describing how user actions connect to system and AI behavior. The task-relation model (with strength ratings and constraint attachments) is a concrete schema example for encoding product interaction flows.

The atlas's constraint categories (accuracy, bias, privacy, transparency, latency) are also relevant for AI-powered products like WrKing Class, where ethical constraints shape screen-level design decisions.

**Limitations to keep in mind:** The atlas is AI-interaction-specific. The Product MCP needs to serve any product, not just AI-powered ones. The atlas should inform the product primitives shape, not constrain it. Non-AI screens (settings, profile editors, simple forms) still need product primitives without AI task vocabulary.

---

**Organization**: spec-guide
**Scope**: 081-product-mcp-design
