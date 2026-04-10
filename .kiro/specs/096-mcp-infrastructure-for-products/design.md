# Design Document: Token Data Index

**Date**: 2026-04-10
**Spec**: 096 - Token Data Index
**Status**: Design Phase
**Dependencies**: Spec 094 (complete), Spec 095 (complete)

---

## Overview

Add a build-time YAML index of all tokens to the Application MCP. Three files by tier (primitives, semantics, components), generated as part of `npx designerpunk generate`. Four new query tools for token search, details, family browsing, and consumer lookup.

---

## Architecture

### Generation Flow

```
Token Sources                    Component Schemas
(src/tokens/*.ts)                (src/components/core/*/*.schema.yaml)
        ↓                                ↓
   Token Index Generator Script
        ↓
token-index/
  primitives.yaml
  semantics.yaml
  components.yaml
        ↓
Application MCP (loads at startup)
        ↓
search_tokens / get_token_details / get_token_family / get_token_consumers
```

### Index Schema

**primitives.yaml**:
```yaml
tokens:
  space100:
    family: spacing
    value: 8
    formula: "baselineGrid * 1"
    platforms:
      web: "--space-100"
      ios: "spaceInset100"  # DesignTokens static let name
      android: "space_100"  # DesignTokens const val name
  space150:
    family: spacing
    value: 12
    formula: "space100 * 1.5"
    platforms:
      web: "--space-150"
      ios: "space150"
      android: "space_150"
  cyan300:
    family: color
    value: "rgba(0, 240, 255, 1)"
    formula: null
    platforms:
      web: "--cyan-300"
      ios: "cyan300"
      android: "cyan_300"
```

**semantics.yaml**:
```yaml
tokens:
  color.action.primary:
    category: color
    primitiveReferences:
      value: cyan300
    themeVarying: true
    platforms:
      web: "--color-action-primary"
      ios: "colorActionPrimary"  # Theme protocol property
      android: "colorActionPrimary"  # Theme data class property
    consumers:
      - Button-CTA
      - Button-Icon
      - Nav-Header-Page
  space.inset.200:
    category: spacing
    primitiveReferences:
      value: space200
    themeVarying: false
    platforms:
      web: "--space-inset-200"
      ios: "spaceInset200"  # DesignTokens static let
      android: "space_inset_200"  # DesignTokens const val
    consumers:
      - Container-Base
      - Container-Card-Base
```

**components.yaml**:
```yaml
tokens:
  buttonIcon.inset.large:
    component: Button-Icon
    primitiveReferences:
      value: space150
    platforms:
      web: "--button-icon-inset-large"
      ios: "buttonIconInsetLarge"
      android: "button_icon_inset_large"
  buttonIcon.size.medium:
    component: Button-Icon
    primitiveReferences:
      value: size500
    platforms:
      web: "--button-icon-size-medium"
      ios: "buttonIconSizeMedium"
      android: "button_icon_size_medium"
```

### Token Index Generator

New script: `scripts/generate-token-index.ts` (or integrated into existing `generate-platform-tokens.ts`).

```typescript
interface TokenIndexEntry {
  name: string;
  family?: string;        // primitives
  category?: string;      // semantics
  component?: string;     // component tokens
  value: string | number;
  formula?: string;       // mathematical relationship
  primitiveReferences?: Record<string, string>;  // semantics + component tokens
  themeVarying?: boolean; // semantics only
  platforms: {
    web: string;
    ios: string;
    android: string;
  };
  consumers?: string[];   // which components reference this token
}
```

**Generation steps**:
1. Import all primitive token modules — walk `src/tokens/*.ts`, extract name, value, family, formula
2. Import all semantic token modules — walk `src/tokens/semantic/*.ts`, extract name, category, primitive references
3. Query ThemeRegistry for theme-varying set — mark semantics that are overridden in any theme
4. Import component token files — walk `src/components/core/*/*.tokens.ts`, extract name, component, references
5. Walk component `schema.yaml` files — extract `tokens:` sections for consumer relationships
6. Generate platform-specific names using the same naming rules as the platform generators
7. Write three YAML files to `token-index/`

### Application MCP Token Indexer

New module: `application-mcp-server/src/indexer/TokenIndexer.ts`

```typescript
class TokenIndexer {
  private primitives = new Map<string, TokenIndexEntry>();
  private semantics = new Map<string, TokenIndexEntry>();
  private componentTokens = new Map<string, TokenIndexEntry>();

  async indexTokens(tokenIndexDir: string): Promise<void>;
  search(params: { family?: string; tier?: string; name?: string }): TokenIndexEntry[];
  getDetails(name: string): TokenIndexEntry | null;
  getFamily(family: string): TokenIndexEntry[];
  getConsumers(token: string): { component: string; context: string }[];
}
```

Loaded at startup by the Application MCP server alongside the component indexer. Uses the configurable `TOKEN_INDEX_DIR` path from Spec 081 WS3.

---

## Error Handling

| Error | When | Response |
|-------|------|----------|
| Token index directory not found | MCP startup | Start without token data, log warning. Token queries return empty results with warning. |
| Malformed YAML in index file | MCP startup | Log error with file path, skip that tier. Other tiers still load. |
| Token not found | `get_token_details` query | Return null with "token not found" message |
| Family not found | `get_token_family` query | Return empty array with "family not found" message |
| Token source file can't be imported | Index generation | Log error, skip that file, continue generation |

---

## Testing Strategy

### Index Generation
- Generate index from current token sources — verify all primitive families present
- Verify semantic tokens include primitive references and theme-varying status
- Verify component tokens include component name and references
- Verify consumer relationships match component schema tokens sections
- Verify platform-specific names match generated platform output naming conventions
- Verify mathematical formulas are captured for primitive tokens

### Application MCP Query Tools
- `search_tokens({ family: "spacing" })` — returns all spacing primitives
- `search_tokens({ tier: "semantic" })` — returns all semantic tokens
- `search_tokens({ name: "space100" })` — returns exact match
- `get_token_details("space100")` — returns full entry with platforms and formula
- `get_token_details("color.action.primary")` — returns semantic with consumers and theme-varying status
- `get_token_family("color")` — returns all color tokens across tiers
- `get_token_consumers("colorActionPrimary")` — returns consuming components
- Missing token index directory — MCP starts, queries return empty with warning
- Malformed YAML — partial load, unaffected tiers still queryable

---

## Design Decisions

### Decision 1: Three Files by Tier

**Options Considered**: Single monolithic file, per-family files, per-tier files
**Decision**: Three files by tier (primitives, semantics, components)
**Rationale**: Maps to the governance hierarchy (primitive → semantic → component). Each file is a coherent unit. Per-family would create 15+ files for marginal readability gain. Monolithic would be too large to scan.
**Trade-offs**: Consumer relationships span tiers (a semantic token references a primitive, a component references a semantic). Cross-tier lookups require loading multiple files. The MCP loads all three at startup, so this is a startup cost, not a query cost.

### Decision 2: Generated as Part of Pipeline

**Options Considered**: Separate build step, part of `npx designerpunk generate`, on-demand at MCP startup
**Decision**: Part of `npx designerpunk generate`
**Rationale**: Same pipeline, same build step. Token index is always in sync with generated platform outputs. No separate command to remember.
**Trade-offs**: Adds time to the generate step. For 320+ tokens this should be negligible.

---

## Integration Points

### Upstream
| Provider | What |
|----------|------|
| Spec 094 | Token sources, ThemeRegistry, platform generators (naming conventions) |
| Spec 095 | Package structure, `files` field |
| Spec 081 | `TOKEN_INDEX_DIR` configurable path |

### Downstream
| Consumer | What |
|----------|------|
| Phase 2 | Leo uses token queries during screen specification |
| Integration Guide | Token query documentation |
| Agent prompts | Token query capabilities |
