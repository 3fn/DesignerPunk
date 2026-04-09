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
| Token data index is Application MCP scope, indexes all tokens in repo | Spec 096 (WS7) + Ada R1 — ecosystem + product-created, one unified index |
| Ecosystem patterns stay in Application MCP as basic assembly guidance | Leo Concern 1 + Ada + Thurgood — parallel to basic layout templates |
| Product MCP enriches screen specs with Application MCP data | Leo Concern 2 + platform agent consensus |
| Screen status: `not-started / in-progress / complete / blocked` per platform | Leo R2 + Kenya + Data + Sparky consensus |
| Governance: brief principle in prompts, detailed table in Integration Guide | Stacy R1 + Thurgood + Lina alignment |
| Experience pattern sorting validated during Phase 2 | Peter + Thurgood — review 9 ecosystem patterns individually to confirm each is an assembly recipe |

---

## MCP Ownership

See `research/mcp-ownership-map.md` for the full working document.

### Docs MCP — Knowledge Layer
How to build with DesignerPunk. Steering docs, token/component family references, architectural guides, process standards.

### Application MCP — System Layer
What exists and how it works. Components, tokens, family guidance, basic assembly guidance (ecosystem experience patterns), basic layout templates, family registry, assembly validation, composition checking.

### Product MCP — Product Architecture Layer
What we're building and how it's structured. Product overview (context, config), product principles (design direction, cross-platform strategy), experience map (screen specs for verticals, flows, feature pages), product templates (page layouts, content layout patterns), domain objects.

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

### Per-Screen Spec: Platform Branching

Screen specs support `shared` + per-platform branching within any facet. The shared parts are the cross-platform spec. Platform-specific parts are where implementations diverge.

**Single-file example** (login feature page):
```yaml
name: login
type: feature-page
status:
  web: in-progress
  ios: not-started
  android: not-started

ux-direction: |
  Single screen with primary passkey/biometric authentication
  and password fallback. Platform-native security APIs.

ui-tree:
  shared:
    - Nav-Header-Page:
        title: "Sign In"
    - Container-Base:
        children:
          - brand-logo (one-off)
          - auth-action-area
          - password-fallback-link
  ios:
    - auth-action-area uses ASAuthorizationController button
  android:
    - auth-action-area uses CredentialManager prompt
  web:
    - auth-action-area uses WebAuthn button

state-model:
  shared:
    - idle
    - authenticating
    - authenticated
    - error
  ios:
    - passkey-prompt (ASAuthorizationController)
    - biometric-fallback (Face ID / Touch ID)
  android:
    - credential-manager-prompt
    - biometric-fallback (BiometricPrompt)
  web:
    - webauthn-prompt
    - password-fallback

data-sources:
  shared:
    - user-profile-api
  ios:
    - AuthenticationServices framework
  android:
    - CredentialManager API
  web:
    - navigator.credentials API

accessibility:
  shared:
    - heading: "Sign In" (h1)
    - focus order: logo → auth action → fallback link
  ios:
    - VoiceOver announces biometric type available
  android:
    - TalkBack announces credential type available
```

**Multi-file example** (same screen, split by facet):
```
pages/login/
  login.yaml              # Core: name, type, status, ux-direction, ui-tree
  login.state.yaml        # State model with shared + platform branches
  login.data.yaml         # Data sources with shared + platform branches
  login.a11y.yaml         # Accessibility with shared + platform branches
  login.analytics.yaml    # Analytics
```

Each file follows the same `shared` + per-platform structure. The Product MCP assembles all files in the directory into one response.

Leo specs the shared structure and flags where platforms diverge. Platform agents own the platform-specific implementation details. When Kenya queries `get_screen_spec({ name: "login" })`, she gets the shared parts plus the iOS-specific parts.

### UI Tree: Systems Components vs One-off Components

Each screen's UI Tree distinguishes between:
- **Systems Components**: Ecosystem components from the Application MCP (Button-CTA, Container-Card-Base, etc.). Queryable via `get_component_full`, governed by Stemma.
- **One-off Components**: Product-specific compositions that don't exist in the ecosystem. Built from systems components but arranged in product-specific ways. Not in the Application MCP — only the Product MCP knows about them. Same rigor as Stemma (schema, contracts especially for accessibility, token references) without the ceremony (no family membership, full README, readiness tracking, three-platform review, component-meta.yaml). Product MCP indexes and serves their schema + contracts inline with screen specs.

### Product Templates

Product-specific counterpart to the Application MCP's basic layout templates. Two scales:
- **Page layouts**: How the page is structured (grid, zones, responsive behavior)
- **Content layout patterns**: How content is arranged within a zone (card grids, list layouts, hero sections, comparison tables)

### Domain Objects

Product entities referenced by screens. A "Bill" object appears on multiple screens. Queryable independently ("what is a Bill?") and cross-referenced from screens ("the Legislation List screen displays Bill objects").

---

## Application MCP Changes

The Application MCP gains configurability and one clarification:

### Clarified
- Experience patterns (9 ecosystem patterns) — confirmed as basic assembly guidance. They stay in the Application MCP. They are generic recipes, not product-specific screen specs.
- Layout templates — confirmed as basic/universal page-level responsive structure. Product-specific layouts go in the Product MCP's Product Templates.

### Added
- Token data index (Spec 096, WS7) — indexes all tokens in the repo (ecosystem + product-created)
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
- Basic assembly guidance directory (ecosystem experience patterns)
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
- **Structured data** (YAML): Experience map entries (screen specs), domain objects, product templates, product config, one-off component schemas and contracts. Queryable via specific tools.
- **Documentary data** (Markdown): Product context, UX principles, design direction, cross-platform strategy. Indexed and searchable like the Docs MCP.

### Product Data Directory Structure

Nested directories mirroring the architecture. One directory per screen. Single YAML file by default, multi-file split available for complex screens. Product MCP assembles either format into one response.

```
product/
  overview.yaml
  principles/
    design-direction.md
    cross-platform-strategy.md
  experience-map/
    verticals/
      legislation/
        legislation.yaml
    flows/
      onboarding/
        onboarding.yaml
    pages/
      dashboard/
        dashboard.yaml
  templates/
    card-grid.yaml
    hero-section.yaml
  domain-objects/
    bill.yaml
    representative.yaml
  components/
    legislation-card/
      legislation-card.schema.yaml
      legislation-card.contracts.yaml
```

### Query Tools (Phase 1 — minimum)

| Tool | Purpose |
|------|---------|
| `get_product_overview` | Product context, config, principles |
| `list_experience_map` | All verticals, flows, feature pages with status per platform |
| `get_screen_spec` | Full spec for a vertical/flow/feature page — UI tree (with enriched Systems Component data from Application MCP), state model, data sources, accessibility, analytics, status |
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

## Resolved from Feedback

| Question | Resolution | Source |
|----------|-----------|--------|
| Experience pattern placement | Basic assembly guidance (the 9 ecosystem patterns) stays in Application MCP as recipes. Product MCP has the Experience Map (screen specs). They're different things — recipes vs specifications. No sorting needed. | Leo Concern 1, Ada, Thurgood, Peter |
| Status granularity | `not-started / in-progress / complete / blocked` per platform. No percentages, no blocking issues in status (those go in implementation reports). | Leo R2, Kenya, Data, Sparky consensus |
| Token data index scope | Indexes all tokens in the repo — ecosystem + product-created. One unified index. | Ada R1, Leo confirmation |
| Governance documentation | Brief principle in agent prompts, detailed table in Integration Guide. | Stacy R1, Thurgood, Lina alignment |
| Cross-MCP query resolution | Product MCP enriches screen spec UI Tree references with Application MCP component data. Agents query the Product MCP for screen specs and get enriched results. Application MCP queried directly for system-level queries (find_components, search_tokens). | Leo Concern 2, platform agent consensus |
| Product data directory structure | Nested directories mirroring the architecture. One directory per screen. Single YAML file by default, multi-file split available for complex screens. Product MCP assembles either format into one response. | Peter + Thurgood |
| One-off component metadata | Same rigor as Stemma (schema, contracts especially for accessibility, token references) without the ceremony (no family membership, full README, readiness tracking, three-platform review, component-meta.yaml). Product MCP indexes and serves schema + contracts inline with screen specs. | Peter + Thurgood |
| Experience pattern structure | Application MCP patterns are assembly recipes (generic). Product MCP Experience Map entries are screen specs (specific). Different things, different structures, complementary. No shared format needed. | Peter + Thurgood |
| Token creation "gap" | Not a gap. Token creation follows the standard governance process: Leo identifies need → Thurgood captures → Ada creates in token source → pipeline generates → Application MCP indexes. Config is for pipeline configuration, not token vocabulary. Investigate source of misunderstanding with Ada. | Peter + Thurgood |

---

## Open Questions

None remaining. Ready for requirements.

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

## Dedicated MCP & Documentation Agent

Ships with the Product MCP. A 9th agent whose primary responsibility is the cross-cutting view across all three MCPs and the documentation layer.

### Why a Dedicated Agent
- Thurgood focuses on the system. Stacy focuses on the product. The MCPs and documentation span both.
- The cross-cutting perspective — "are all three MCPs telling a coherent, accurate story together?" — is nobody's primary job today.
- As the ecosystem grows (Product MCP, multiple products, cross-MCP references), the maintenance burden exceeds what existing agents handle as secondary work.

### Proposed Scope
- MCP index health monitoring across all three servers
- Steering doc accuracy (are docs current after infrastructure changes?)
- Cross-MCP reference integrity (does a screen spec reference components that exist?)
- Documentation maintenance (Integration Guide, agent prompts, knowledge bases)
- Rebuild triggers when indexes go stale
- Drift detection and alignment recommendations

### Open Questions
1. Agent name and identity
2. Relationship to Thurgood and Stacy — complements, not replaces
3. Detailed scope definition during Spec 081 formalization

---

## Discovery Inputs

- **Research responses**: `research/` directory — Leo, Ada, Lina, Kenya, Data, Sparky, Stacy
- **MCP ownership map**: `research/mcp-ownership-map.md`
- **Architecture diagram**: `research/Product MCP Architecture Draft.png`
- **Leonardo's wish list**: `discovery-leonardo-wish-list.md`
- **AI Interaction Atlas**: `github.com/quietloudlab/ai-interaction-atlas` — relevant to intent signals in experience map
