# Spec 096: MCP Infrastructure for Products

**Date**: 2026-04-08
**Purpose**: Make MCP servers fully configurable for product context, build the Product MCP foundation, and add queryable token data to the Application MCP
**Organization**: spec-guide
**Scope**: 096-mcp-infrastructure-for-products
**Status**: Design outline
**M0a Phase 1**: Block C (Blocks A and B complete)
**Primary Owners**: Ada (WS7), Lina (WS3), Cross-agent (WS5)

---

## Problem Statement

Blocks A and B shipped the portable pipeline and the published package. MCP servers run from a product repo via `npx designerpunk mcp:app` / `mcp:docs`. But three gaps remain:

1. **Application MCP path resolution is fragile** — patterns, templates, and guidance paths are derived by walking `../../..` from the components directory. This works in the current structure but is implicit coupling, not explicit configuration.

2. **No Product MCP exists** — product agents have no MCP for product-specific data (screen specs, product patterns, product config). The Application MCP serves design system data; the Product MCP bridges it to product context.

3. **No queryable token data** — agents can query components (`find_components`, `get_component_full`) but can't query tokens. "What tokens exist in the spacing family?" or "Which components consume `colorActionPrimary`?" require reading source files, not MCP queries. Leo's screen→token lookup and Ada's theme creation workflow both need structured token data.

---

## Current State

### WS3: Application MCP Path Resolution

The `ComponentIndexer.indexComponents()` method derives non-component data paths:

```typescript
const patternsDir = path.resolve(componentsDir, '..', '..', '..', 'experience-patterns');
const layoutTemplatesDir = path.resolve(componentsDir, '..', '..', '..', 'layout-templates');
const guidanceDir = path.resolve(componentsDir, '..', '..', '..', 'family-guidance');
```

This assumes a fixed directory structure relative to `src/components/core/`. It works in both the repo and the installed package (same structure), but:
- A product adding its own experience patterns or layout templates can't point the MCP at additional directories
- The path derivation is invisible — debugging "why doesn't my pattern show up?" requires reading indexer source

The Docs MCP accepts `MCP_STEERING_DIR` as an env var. The Application MCP accepts `COMPONENTS_DIR`. Neither accepts explicit paths for patterns, templates, or guidance.

### WS5: Product MCP

Nothing exists. Spec 081 has a design outline with product primitives, cross-MCP references, and Leo's wish list. Phase 1 scope is the minimal foundation:
- Connect to Application MCP and proxy design system queries
- Accept a product configuration file (name, platforms, theme)
- Extension points for product-specific data

### WS7: Token Data

The Application MCP indexes components, patterns, templates, and guidance. It does not index tokens. Token data lives in:
- TypeScript source files (`src/tokens/*.ts`) — primitive and semantic definitions
- Component token files (`*.tokens.ts`) — component-level token references
- Generated platform outputs (`dist/DesignTokens.*`) — platform-specific values

None of this is queryable via MCP. Ada R2 recommended a build-time YAML index (three files by tier: primitives, semantics, components) that the Application MCP loads at startup.

---

## Proposed Solution

### WS3: Explicit MCP Data Path Configuration

Make the Application MCP accept explicit paths for all data sources, not just components.

**Approach**: Environment variables matching the existing `COMPONENTS_DIR` pattern:

| Env Var | Default (derived from COMPONENTS_DIR) | Purpose |
|---------|---------------------------------------|---------|
| `COMPONENTS_DIR` | `src/components/core` | Component schemas, contracts, metadata |
| `PATTERNS_DIR` | `{root}/experience-patterns` | Experience patterns |
| `TEMPLATES_DIR` | `{root}/layout-templates` | Layout templates |
| `GUIDANCE_DIR` | `{root}/family-guidance` | Family guidance |
| `REGISTRY_PATH` | `{root}/family-registry.yaml` | Family registry |
| `TOKEN_INDEX_DIR` | `{root}/token-index` | Token data index (WS7) |

The CLI (`npx designerpunk mcp:app`) passes these from the resolved package root. Products can override via env vars or config to add their own data directories alongside the package's.

**What changes**: `ComponentIndexer.indexComponents()` accepts explicit paths instead of deriving them. The CLI passes all paths. Fallback to current derivation if env vars aren't set (backward compatibility).

### WS5: Product MCP Foundation

Minimal scaffold that ships with `@designerpunk/core`. Lives in the product repo, connects to the Application MCP.

**Capabilities (Phase 1 only):**
1. **Proxy design system queries** — product agents query one MCP endpoint. The Product MCP forwards component, pattern, template, and token queries to the Application MCP. Single connection point.
2. **Accept product configuration** — reads `designerpunk.config.ts` for product name, platforms, theme. Serves this as queryable product context.
3. **Extension points** — hooks for product-specific data (screen specs, product patterns). Empty in Phase 1 — features grow from real usage during Phase 2 and M0b.

**What ships**: A new MCP server at `product-mcp-server/` in the package. Started via `npx designerpunk mcp:product`. Connects to the Application MCP via the same stdio protocol.

**What does NOT ship** (deferred to M0b per Spec 081):
- Screen↔component bidirectional lookup
- Screen state model queries
- Flow navigation graphs
- Cross-platform implementation status
- Spec-to-catalog gap detection
- Any of Leo's Tier 1-3 wish list features

### WS7: Token Data Index

Build-time YAML index generated as part of `npx designerpunk generate`. Three files by tier (Ada R3/R4):

```
token-index/
  primitives.yaml    — all primitive tokens (families, values, math relationships)
  semantics.yaml     — all semantic tokens (primitive references, categories)
  components.yaml    — all component tokens (primitive references, consuming components)
```

**Application MCP loads these at startup** alongside the component index. New query tools:

| Tool | Purpose |
|------|---------|
| `search_tokens` | Find tokens by name, family, or tier |
| `get_token_details` | Full token info: value, family, tier, platform outputs, consumers |
| `get_token_family` | All tokens in a family with values and relationships |
| `get_token_consumers` | Which components reference a given token |

**Generation approach** (Ada R2): A build-time script that:
- Walks token source files (primitives, semantics, component tokens)
- Walks component `schema.yaml` `tokens:` sections for consumer relationships
- Produces structured YAML: token name → family, category, tier, values per platform, mathematical relationship, consuming components
- Runs as part of `npx designerpunk generate`

**Theme-varying tokens included**: The index marks which tokens are theme-varying (overridden in any registered theme) vs static. This enables agents to understand which tokens change per theme without reading the ThemeRegistry source.

---

## Design Decisions (Settled)

| Decision | Source |
|----------|--------|
| YAML for token index (not JSON) | Ada R3/R4, project convention |
| Three files by tier (primitives, semantics, components) | Ada R4 — maps to governance hierarchy |
| Product MCP lives in product repo, queries Application MCP | Leo R1 (North Star feedback) |
| Product MCP foundation is minimal — proxy + config + extension points | Leo R2, Peter |
| Token-varying determination from ThemeRegistry | Ada R2 — union of overridden token names |
| CLI command for Product MCP: `npx designerpunk mcp:product` | Consistent with `mcp:app` / `mcp:docs` pattern |

---

## Open Questions

1. **Product MCP → Application MCP connection**: How does the Product MCP connect to the Application MCP? Options: (a) Product MCP spawns Application MCP as a child process, (b) Product MCP imports Application MCP modules directly (in-process), (c) Product MCP connects to a separately running Application MCP via stdio. Option (b) is simplest for Phase 1 — no inter-process communication needed.

2. **Token index location in the package**: Does `token-index/` live at the package root (alongside `experience-patterns/`, `layout-templates/`) or inside `dist/` (alongside generated token files)? It's a generated artifact, so `dist/` is logical. But the Application MCP's other data (patterns, templates, guidance) lives at the root. Consistency vs convention.

3. **Product MCP data directory**: Where does product-specific data live in a product repo? A `product-mcp/` directory? A `.designerpunk/` directory? This affects the Integration Guide and agent templates.

---

## Scope Boundaries

### In Scope
- Application MCP explicit path configuration (env vars for all data sources)
- Product MCP foundation (proxy, config, extension points)
- `npx designerpunk mcp:product` CLI command
- Token data index generation (three YAML files by tier)
- Application MCP token query tools (search, details, family, consumers)
- Token index generation as part of `npx designerpunk generate`
- Integration Guide contribution (Block C section — MCP startup, Product MCP config)
- Agent resource updates for token query capabilities

### Out of Scope
- Product MCP features beyond foundation (Spec 081 — M0b)
- Screen↔component lookup, state models, gap detection (Spec 081 wish list)
- MCP server code restructuring beyond path configuration
- Native platform sync mechanism (M0b)
- Marketing theme creation (Phase 2)

---

## Dependencies

| Dependency | Direction | Notes |
|------------|-----------|-------|
| Spec 094 (Block A) | Upstream | ✅ Complete — pipeline, theme registry, generators |
| Spec 095 (Block B) | Upstream | ✅ Complete — package published, CLI working, MCP servers bundled |
| Phase 2 (marketing site) | Downstream | Marketing site uses the MCP infrastructure |
| Spec 081 (Product MCP full) | Downstream | Foundation built here, full features in M0b |

---

## Success Criteria

1. Application MCP accepts explicit paths for patterns, templates, guidance, and token index via env vars
2. `npx designerpunk mcp:product` starts the Product MCP, connects to Application MCP, and responds to proxied queries
3. Product MCP serves product configuration (name, platforms, theme) as queryable data
4. `search_tokens({ family: "spacing" })` returns all spacing tokens with values
5. `get_token_consumers({ token: "colorActionPrimary" })` returns all components that reference it
6. `get_token_details({ name: "space100" })` returns value, family, tier, platform outputs
7. Token index regenerates as part of `npx designerpunk generate`
8. All existing MCP tests pass — no regressions

---

## Feedback Requested

- **Ada**: WS7 scope — is the token index generation approach still accurate after Spec 094 implementation? Any pipeline changes that affect how tokens are walked?
- **Lina**: WS3 scope — is the env var approach sufficient, or do the indexers need deeper refactoring?
- **Leonardo**: WS5 scope — does the proxy + config foundation cover your Phase 2 needs? What's the minimum you need to start speccing marketing site screens?
- **Sparky**: Does `npx designerpunk mcp:product` fit the web dev workflow?
