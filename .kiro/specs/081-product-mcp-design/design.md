# Design Document: Product MCP Design

**Date**: 2026-04-09
**Spec**: 081 - Product MCP Design
**Status**: Design Phase
**Dependencies**: Spec 094 (complete), Spec 095 (complete), Spec 096 (independent)

---

## Overview

This spec builds the Product MCP, configures explicit paths for all three MCP servers (WS3), and updates agent prompts to reflect unified repo ownership. The Product MCP serves product architecture as queryable structured data — screen specs, domain objects, product templates, and design direction.

---

## Architecture

### Three MCP Servers

```
Docs MCP                    Application MCP              Product MCP
(knowledge layer)           (system layer)               (product architecture layer)
─────────────               ──────────────               ──────────────
Steering docs               Components                   Product overview
Token family refs           Tokens (index)               Product principles
Component family refs       Family guidance               Experience map
Architectural guides        Assembly guidance              (verticals, flows, feature pages)
Process standards           Basic layout templates        Product templates
Integration guide           Family registry               Domain objects
                            Assembly validation            One-off components
                            Composition checking
```

No cross-MCP data proxying. Agents query each MCP directly for its domain. Screen specs reference Systems Components by name; agents resolve details from the Application MCP.

### Product MCP Data Structure

```
product/
  overview.yaml
  principles/
    design-direction.md
    cross-platform-strategy.md
  experience-map/
    verticals/
      legislation/
        legislation.yaml          # Single-file spec
    flows/
      onboarding/
        onboarding.yaml           # Single-file spec
        onboarding.state.yaml     # Multi-file: split facet
        onboarding.a11y.yaml
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
      legislation-card.schema.yaml    # Stemma subset
      legislation-card.contracts.yaml # Accessibility contracts only
```

### Per-Screen Spec Schema

Each screen (vertical, flow, or feature page) is a YAML file with platform branching:

```yaml
name: legislation-list
type: vertical
status:
  web: in-progress
  ios: not-started
  android: not-started

ux-direction: |
  Scrollable list of legislation with filter bar.
  Each item shows title, status badge, and relevance score.

ui-tree:
  shared:
    - component: Nav-Header-App          # Systems Component (ref by name)
    - component: Container-Base
      children:
        - component: Chip-Filter         # Filter bar
        - component: Container-Base      # Scrollable list
          children:
            - component: legislation-card # One-off (schema in product/components/)
              repeat: for-each bill in data.bills
  ios:
    navigation: NavigationStack push
  web:
    navigation: client-side route

state-model:
  shared:
    - idle
    - loading
    - populated
    - empty
    - error
  ios:
    - pull-to-refresh

data-sources:
  shared:
    - legislation-api: /api/v1/bills
    - filters: topic, status, relevance

analytics:
  shared:
    - screen-view: legislation-list
    - filter-applied: { topic, status }
    - bill-tapped: { bill-id }

accessibility:
  shared:
    - heading: "Legislation" (h1)
    - filter bar: role=toolbar
    - list: role=feed with aria-busy during loading
    - each card: role=article
  ios:
    - VoiceOver custom rotor for filter categories
```

### One-off Component Schema (Stemma Subset)

```yaml
# product/components/legislation-card/legislation-card.schema.yaml
name: legislation-card
purpose: Display a bill summary in the legislation list
composed-from:
  - component: Container-Card-Base
    role: card-wrapper
  - component: Badge-Label-Base
    role: status-indicator
  - component: Icon-Base
    role: relevance-icon
props:
  title:
    type: string
    required: true
  status:
    type: "'active' | 'passed' | 'failed'"
    required: true
  relevanceScore:
    type: number
    required: true
  onPress:
    type: callback
    required: true
tokens:
  - color.action.primary (relevance icon tint)
  - space.inset.200 (card padding)
  - typography.bodyMd (title)
  - typography.labelSm (status badge)
```

Accessibility contracts only when the composition introduces new behavior:

```yaml
# product/components/legislation-card/legislation-card.contracts.yaml
accessibility_card_semantics:
  category: accessibility
  description: Card announced as article with title and status
  behavior: |
    VoiceOver/TalkBack announces: "{title}, status: {status},
    relevance: {relevanceScore} out of 100"
  wcag: "4.1.2 Name, Role, Value"
  platforms: [web, ios, android]
```

---

## Components and Interfaces

### Product MCP Server

New MCP server at `product-mcp-server/`. Started via `npx designerpunk mcp:product`.

```typescript
class ProductMCPServer {
  constructor(private productDir: string) {}

  // Indexing
  async indexProductData(productDir: string): Promise<void>;

  // Query tools
  getProductOverview(): ProductOverview;
  listExperienceMap(): ExperienceMapEntry[];
  getScreenSpec(name: string, platform?: string): ScreenSpec;
  getDomainObject(name: string): DomainObject;
  listProductTemplates(): ProductTemplate[];
  getProductHealth(): HealthStatus;
  rebuildProductIndex(): HealthStatus;
}
```

### Data Models

```typescript
interface ExperienceMapEntry {
  name: string;
  type: 'vertical' | 'flow' | 'feature-page';
  status: Record<string, 'not-started' | 'in-progress' | 'complete' | 'blocked'>;
  blockedReasons?: Record<string, string>; // platform → reason
}

interface ScreenSpec {
  name: string;
  type: 'vertical' | 'flow' | 'feature-page';
  status: Record<string, string>;
  uxDirection: string;
  uiTree: PlatformBranched<UITreeNode[]>;
  stateModel: PlatformBranched<string[]>;
  dataSources: PlatformBranched<DataSource[]>;
  analytics: PlatformBranched<AnalyticsEvent[]>;
  accessibility: PlatformBranched<AccessibilitySpec>;
}

// Shared + per-platform branching
interface PlatformBranched<T> {
  shared: T;
  ios?: T;
  android?: T;
  web?: T;
}

interface UITreeNode {
  component: string;        // Systems Component name (ref) or one-off name
  props?: Record<string, any>;
  children?: UITreeNode[];
  repeat?: string;          // data binding expression
}

interface DomainObject {
  name: string;
  description: string;
  properties: Record<string, { type: string; description: string }>;
  referencedBy: string[];   // screen names
}
```

### MCP Path Configuration (WS3)

All three servers accept explicit paths via environment variables:

```typescript
// Application MCP
const componentsDir = process.env.COMPONENTS_DIR || resolveFromPackage('src/components/core');
const tokenIndexDir = process.env.TOKEN_INDEX_DIR || resolveFromPackage('token-index');
const guidanceDir = process.env.GUIDANCE_DIR || resolveFromPackage('family-guidance');
const patternsDir = process.env.PATTERNS_DIR || resolveFromPackage('experience-patterns');
const templatesDir = process.env.TEMPLATES_DIR || resolveFromPackage('layout-templates');
const registryPath = process.env.REGISTRY_PATH || resolveFromPackage('family-registry.yaml');

// Docs MCP
const steeringDir = process.env.MCP_STEERING_DIR || resolveFromPackage('.kiro/steering');

// Product MCP
const productDir = process.env.PRODUCT_DIR || path.resolve(process.cwd(), 'product');
```

The CLI resolves package paths via `require.resolve` and passes them. Products override via env vars or config.

### CLI Command

```bash
npx designerpunk mcp:product
```

Resolves product data directory from:
1. `PRODUCT_DIR` env var (if set)
2. `designerpunk.config.ts` product data path (if configured)
3. `./product/` relative to cwd (default)

Prints connection details on startup (same pattern as `mcp:app` and `mcp:docs`).

---

## Error Handling

| Error | When | Response |
|-------|------|----------|
| Product data directory not found | Startup | Start with empty data, print warning |
| Malformed screen spec YAML | Indexing | Skip file, log error with path and parse failure |
| Unknown screen type | Indexing | Log warning, index as generic entry |
| Screen spec references unknown domain object | Query time | Return spec with unresolved reference noted in warnings |
| Multi-file spec with conflicting facets | Indexing | Last file wins, log warning |
| Platform filter for non-existent platform | Query | Return shared content only, no error |

---

## Testing Strategy

### Product MCP Server
- Index empty directory — starts with no data, no errors
- Index valid product data — all entries queryable
- Index malformed YAML — skips bad files, indexes good ones
- Single-file and multi-file spec assembly — both produce same query result
- Platform branching — `shared` + platform keys merge correctly
- Platform filter — returns `shared` + requested platform only
- Status with blocked reason — reason string returned when present
- Health check and rebuild — return correct counts and timestamps

### MCP Path Configuration (WS3)
- Application MCP with explicit paths — all indexers use provided paths
- Application MCP with default paths — backward compatible, derives from package root
- Product MCP with configured path — indexes from specified directory
- Product MCP with default path — indexes from `./product/`
- Missing optional paths (token index before Spec 096) — server starts without that data

### One-off Component Metadata
- Schema parsed and served inline with screen spec
- Accessibility contracts parsed when present
- Missing contracts — no error, component served without contracts

---

## Design Decisions

### Decision 1: No Cross-MCP Enrichment

**Options Considered**: Product MCP enriches screen specs with Application MCP data, agents query both separately
**Decision**: No enrichment. Product MCP returns Systems Component names as references. Agents resolve details from Application MCP.
**Rationale**: Unanimous consensus from all 7 agents. Enrichment creates sync coupling. Reference-by-name keeps data sources clean and failure modes distinguishable.
**Trade-offs**: Agents make two queries (Product MCP for spec, Application MCP for component details) instead of one.

### Decision 2: Structured One-off Schema (Stemma Subset)

**Options Considered**: Full Stemma format, lightweight description only, structured subset
**Decision**: Structured subset — props with types/defaults, token references, composed-from with slot/role mapping, purpose. Accessibility contracts SHALL when new behavior introduced.
**Rationale**: Same rigor as Stemma without the ceremony. Platform agents need structured data to implement. Full Stemma is over-governance for product-scoped compositions.
**Trade-offs**: More work than a description, less than full Stemma. Promotion to ecosystem requires upgrading to full format.

### Decision 3: Platform Branching in Specs

**Options Considered**: Separate spec per platform, single spec with platform notes, shared + per-platform branching
**Decision**: `shared` + per-platform keys within any facet. Single spec, platform-specific content annotated inline.
**Rationale**: Most content is shared. Platform divergences are the exception. One spec keeps the cross-platform story coherent. Platform filter on queries lets agents see only their platform.
**Trade-offs**: Complex screens with heavy platform divergence produce large YAML files. Multi-file split mitigates this.

### Decision 4: System Agents Serve the Repo

**Options Considered**: Separate ecosystem vs product agent roles, unified ownership
**Decision**: Unified. Ada governs all tokens, Lina governs all components, Thurgood governs all tests/specs. Governance gradient for review depth.
**Rationale**: The package is a starting point the product molds. No separation between ecosystem and product artifacts. One Ada, not "ecosystem Ada" and "product Ada."
**Trade-offs**: System agents carry broader scope. Governance gradient must be documented clearly to prevent over-governance of product artifacts.

---

## Integration Points

### Upstream
| Provider | What |
|----------|------|
| Spec 094 | Pipeline, config system, CLI framework |
| Spec 095 | Package structure, MCP bundling, agent templates |
| Spec 096 | Token data index (Application MCP, independent) |

### Downstream
| Consumer | What |
|----------|------|
| Phase 2 (marketing site) | First product to use the Product MCP |
| M0b (WrKing Class) | Full product with domain objects, flows, platform divergence |
| Integration Guide | Documents Product MCP setup and data format |
