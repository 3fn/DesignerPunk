---
inclusion: manual
name: component-mcp-query-guide
description: MCP tool reference — all tools across Application, Product, and Docs MCPs with parameters, response shapes, and usage patterns. Load when querying any MCP server or building MCP integrations.
---

# MCP Query Guide

**Date**: 2026-02-28
**Last Reviewed**: 2026-05-06
**Updated**: 2026-04-23
**Purpose**: Documents all MCP tools, parameters, and usage patterns across Application, Product, and Docs MCP servers
**Organization**: process-standard
**Scope**: cross-project
**Layer**: 3
**Relevant Tasks**: mcp-documentation, component-development, product-development
**Spec**: 064 (Component Metadata Schema), 096 (Token Data Index), 097 (Product MCP Intelligence Layer)

---

# Application MCP

## Server Info

- **Name**: `mcp-component-server`
- **Transport**: stdio
- **Start**: `npx designerpunk mcp:app` (from any project with `@3fn/core` installed, or from the DesignerPunk repo)
- **Components directory**: `src/components/core` (default)

---

## Tools

### get_component_catalog

Browse all indexed components. ~50 tokens per component.

**Parameters**: none

**Returns**: `QueryResult<ComponentCatalogEntry[]>`

**Example response** (truncated):
```json
{
  "data": [
    {
      "name": "Badge-Count-Base",
      "type": "type-primitive",
      "family": "Badge",
      "purpose": "Display a numeric count indicator...",
      "readiness": "production-ready",
      "platforms": ["web", "ios", "android"],
      "contractCount": 7
    }
  ],
  "error": null,
  "warnings": [],
  "metrics": { "responseTimeMs": 1 }
}
```

---

### get_component_summary

Get a component summary with contract categories, token count, and annotations. ~200 tokens.

**Parameters**:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | yes | Component name (e.g., `"Badge-Count-Base"`) |

**Returns**: `QueryResult<ComponentSummary>`

**Example response**:
```json
{
  "data": {
    "name": "Badge-Count-Base",
    "type": "type-primitive",
    "family": "Badge",
    "readiness": "production-ready",
    "description": "Type primitive count badge component...",
    "platforms": ["web", "ios", "android"],
    "contractCategories": ["content", "visual", "accessibility"],
    "contractCount": 7,
    "tokenCount": 0,
    "annotations": {
      "purpose": "Display a numeric count indicator...",
      "usage": {
        "whenToUse": ["Showing unread message or notification counts"],
        "whenNotToUse": ["Displaying text labels — use Badge-Label-Base"]
      },
      "contexts": ["navigation-tabs", "list-items"],
      "alternatives": [
        { "component": "Badge-Label-Base", "reason": "When the indicator shows text labels instead of numbers" }
      ]
    },
    "composesComponents": [],
    "inheritsFrom": null
  },
  "error": null,
  "warnings": [],
  "metrics": { "responseTimeMs": 0 }
}
```

---

### get_component_full

Get complete assembled metadata including all contracts, properties, composition rules, and token relationships.

**Parameters**:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | yes | Component name |

**Returns**: `QueryResult<ComponentMetadata>`

See `.kiro/steering/component-metadata-schema-reference.md` for the full field reference.

---

### find_components

Find components by one or more filters. All parameters are optional and combinable — multiple filters intersect (AND logic).

**Parameters**:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `category` | string | no | Contract category (e.g., `"accessibility"`, `"interaction"`) |
| `concept` | string | no | Specific contract concept (e.g., `"keyboard_navigation"`, `"hover"`) |
| `platform` | string | no | Platform filter (e.g., `"ios"`, `"web"`) |
| `purpose` | string | no | Keyword search across purpose and description fields |

**Returns**: `QueryResult<ComponentCatalogEntry[]>`

**Behavior**:
- `category`: Returns components with any active contract in that category (including inherited)
- `concept`: Returns components with that specific contract name
- `platform`: Returns components whose schema declares that platform
- `purpose`: Searches purpose field first (higher rank), then description; alphabetical within each tier
- Multiple filters: Results must match ALL filters (intersection)

---

### check_composition

Check whether a parent component can contain a child component.

**Parameters**:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `parent` | string | yes | Parent component name |
| `child` | string | yes | Child component name |
| `parentProps` | object | no | Parent prop values for evaluating conditional rules |

**Returns**: `QueryResult<CompositionResult>`

**Example response**:
```json
{
  "data": {
    "allowed": true,
    "reason": "No composition constraints prohibit this combination",
    "rule": "static"
  },
  "error": null,
  "warnings": [],
  "metrics": { "responseTimeMs": 0 }
}
```

---

### get_component_health

Get index health status, component count, and any warnings or errors.

**Parameters**: none

**Returns**: `QueryResult<IndexHealth>`

**Example response**:
```json
{
  "data": {
    "status": "healthy",
    "componentsIndexed": 20,
    "lastIndexTime": "2026-02-28T21:37:17.628Z",
    "errors": [],
    "warnings": ["Component directory has no schema.yaml: Avatar-Base"]
  },
  "error": null,
  "warnings": [],
  "metrics": { "responseTimeMs": 0 }
}
```

---

## Usage Patterns

### "I need a component for email input"

1. Search by purpose:
   ```
   find_components({ purpose: "email" })
   ```
2. Review results — `Input-Text-Email` will rank highest (purpose match)
3. Get summary to confirm:
   ```
   get_component_summary({ name: "Input-Text-Email" })
   ```

### "What components support keyboard navigation?"

```
find_components({ concept: "focusable" })
```

### "Can Badge-Count-Base go inside Container-Card-Base?"

```
check_composition({ parent: "Container-Card-Base", child: "Badge-Count-Base" })
```

### "What components are in the Badge family?"

1. Get catalog:
   ```
   get_component_catalog()
   ```
2. Filter results client-side by `family === "Badge"`

### "Show me everything about a component before I use it"

Progressive disclosure workflow:
1. `get_component_catalog()` — browse all components (~50 tokens each)
2. `get_component_summary({ name: "..." })` — check if it fits (~200 tokens)
3. `get_component_full({ name: "..." })` — full detail for implementation

### "Which iOS components handle accessibility?"

Combine filters:
```
find_components({ platform: "ios", category: "accessibility" })
```

---

## Response Wrapper

All tools return a `QueryResult<T>`:

```json
{
  "data": "...",
  "error": "string or null",
  "warnings": ["array of warning strings"],
  "metrics": { "responseTimeMs": 0 }
}
```

- `data` is null when `error` is set
- `warnings` are non-fatal issues (e.g., missing parent contracts)
- `metrics.responseTimeMs` measures query execution time

---

## Related Documentation

- `.kiro/steering/component-metadata-schema-reference.md` — Full field reference for all response types
- `.kiro/steering/component-meta-authoring-guide.md` — How to write component-meta.yaml files
- `.kiro/steering/DesignerPunk-Integration-Guide.md` — Complete MCP query reference table and Product MCP setup

---

## Token Query Tools (Application MCP)

Added by Spec 096. These tools query the token data index built during `npx designerpunk generate`.

### search_tokens

Find tokens by family, tier, or name. All parameters optional and combinable.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `family` | string | no | Token family (e.g., `"spacing"`, `"color"`) |
| `tier` | string | no | Token tier: `"primitive"`, `"semantic"`, or `"component"` |
| `name` | string | no | Partial name match |

### get_token_details

Full details for a single token.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | yes | Token name (e.g., `"space100"`, `"color.action.primary"`) |

**Returns**: Value, family, tier, platform names, formula, theme-varying status, consumers.

### get_token_family

All tokens in a family across all tiers.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `family` | string | yes | Family name (e.g., `"spacing"`, `"color"`) |

### get_token_consumers

Components that reference a token.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | yes | Token name |

---

# Product MCP

## Server Info

- **Name**: `mcp-product-server`
- **Transport**: stdio
- **Start**: `npx designerpunk mcp:product`
- **Product directory**: `product/` (default), configurable via `PRODUCT_DIR` env var
- **Component catalog**: `src/components/core` (default), configurable via `COMPONENT_DIR` env var

## Tools

### get_product_overview

Product context, configuration, and principles.

**Parameters**: none

### list_experience_map

All verticals, flows, and feature pages — enriched with component references, domain object references, and blocked reasons. Supports filtering.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `status` | string | no | Filter by status (`not-started`, `in-progress`, `complete`, `blocked`) |
| `platform` | string | no | Filter by platform status |
| `usesComponent` | string | no | Filter by component usage in UI tree |
| `usesDomainObject` | string | no | Filter by domain object reference |
| `usesToken` | string | no | Filter by token usage in UI tree `tokens:` blocks |

### find_screens

Discovery and impact analysis. All filters are conjunctive (AND). Returns enriched screen summaries.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `context` | string | no | Substring match against screen type, name, and tags |
| `status` | string | no | Filter by status |
| `platform` | string | no | Filter by platform status |
| `usesComponent` | string | no | Screens whose UI tree references this component |
| `usesDomainObject` | string | no | Screens that reference this domain object |
| `usesToken` | string | no | Screens whose `tokens:` blocks reference this token |

**No params** → returns all screens. **No matches** → returns empty array.

### get_screen_spec

Full screen spec with optional platform filter. Includes `_componentGaps` for any components not found in the ecosystem catalog or product one-offs.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | yes | Screen name |
| `platform` | string | no | Platform filter (`web`, `ios`, `android`) |

### get_screen_state_model

Returns the `state-model` section from a screen spec as-is, without UI tree, accessibility, or UX direction.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `screen` | string | yes | Screen name |

### get_product_component

Direct query for a product one-off component's schema and contracts.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | yes | One-off component name |

### get_domain_object

Domain object definition and list of screens that reference it.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | string | yes | Domain object name |

### find_principles

Find design principles by keyword. Principles use YAML frontmatter with `keywords` array on markdown files.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `keyword` | string | yes | Keyword to search |

### find_templates

Find product templates by category or by which screen uses them.

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `category` | string | no | Template category (`layout`, `content`) |
| `usedBy` | string | no | Screen name |

### list_product_templates

All product-specific layout and content patterns.

**Parameters**: none

### get_product_health

Index status, data counts, reverse index sizes, gap counts, and warnings.

**Parameters**: none

### rebuild_product_index

Re-index all product data and rebuild reverse indexes. Returns new health status.

**Parameters**: none

## Usage Patterns

### "Which screens use Button-CTA?"

```
find_screens({ usesComponent: "Button-CTA" })
```

### "Which screens are blocked on iOS and why?"

```
find_screens({ status: "blocked", platform: "ios" })
```
→ Returns enriched entries with `blockedReasons`.

### "If I change this token, what screens are affected?"

```
find_screens({ usesToken: "color.action.primary" })
```

### "What data drives this screen?"

```
get_screen_state_model({ screen: "legislation-list" })
```

### "What's the schema for this product component?"

```
get_product_component({ name: "legislation-card" })
```

### "What are our design principles about theming?"

```
find_principles({ keyword: "dark-theme" })
```

---

# Docs MCP

## Server Info

- **Name**: `mcp-docs-server`
- **Transport**: stdio
- **Start**: `npx designerpunk mcp:docs`

## Tools

| Tool | Parameters | Purpose |
|------|-----------|---------|
| `get_documentation_map()` | none | All indexed documents |
| `get_document_summary({ path })` | `path` (required) | Document outline (~200 tokens) |
| `get_document_full({ path })` | `path` (required) | Complete document content |
| `get_section({ path, heading })` | `path`, `heading` (both required) | Specific section by heading |
| `list_cross_references({ path })` | `path` (required) | Cross-references in a document |
| `get_index_health()` | none | Index health status |
