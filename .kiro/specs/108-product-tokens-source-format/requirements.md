# Requirements Document: Product Tokens — Source Format & MCP Discoverability

**Date**: 2026-05-25
**Spec**: 108 - Product Tokens — Source Format & MCP Discoverability
**Status**: Requirements Phase
**Dependencies**: None (Spec 109 depends on this)

---

## Introduction

Product verticals built on DesignerPunk generate values that don't belong in Rosetta (system tokens) or Stemma (component tokens) but still need structured definition, cross-platform visibility, and agent discoverability. This spec establishes the source format for product tokens and makes them queryable via the Product MCP.

The design philosophy: deviation is welcome; deviation without communication is not. Product tokens make product-level decisions visible, structured, and queryable — enabling the organization to observe patterns across verticals and evolve the system in response to real product needs.

---

## Requirements

### Requirement 1: Source Format Definition

**User Story**: As a product agent, I want a structured YAML format for defining product tokens, so that product-level values have a consistent, parseable, and governed source of truth.

#### Acceptance Criteria

1. WHEN a product vertical creates a file in `product/tokens/{category}.yaml` THEN the system SHALL recognize it as a product token category file
2. WHEN a token entry contains a `value` field THEN the system SHALL require `unitType`, `description`, and `rationale` fields
3. WHEN a token entry contains a `ref` field THEN the system SHALL require only a `description` field
4. WHEN a token entry contains both `value` and `ref` THEN the system SHALL reject it with an error
5. WHEN a token entry contains neither `value` nor `ref` THEN the system SHALL reject it with an error
6. WHEN a category filename contains characters other than lowercase ASCII letters (a-z) and hyphens THEN the system SHALL reject it with an error
7. WHEN a token specifies a platform-limited `unitType` (e.g., `ch`) with incompatible `platforms` (e.g., `[ios]`) THEN the system SHALL reject it with an error
8. WHEN a token entry contains a `value` with `unitType: color` THEN the system SHALL require rationale explaining why no system color fits AND why a `SemanticOverrides` entry isn't appropriate
9. Token names within a category SHALL use camelCase with acronyms treated as words (e.g., `contentMaxWidth`, `maxUrlLength`, not `maxURLLength`)
10. Validation errors SHALL be per-token; valid tokens in the same category file SHALL remain indexed when a sibling token has errors
11. WHEN a token name is not valid camelCase THEN the system SHALL reject it with an error: "Token '{name}' must be camelCase (e.g., 'contentMaxWidth'). Product tokens are platform-agnostic source definitions — the generation pipeline handles platform-specific naming."

### Requirement 2: Product MCP Indexing

**User Story**: As the Product MCP server, I want to index product token YAML files during startup, so that token data is available for query responses.

#### Acceptance Criteria

1. WHEN the Product MCP indexes a product directory THEN it SHALL scan `product/tokens/` for `*.yaml` files
2. WHEN a valid token category file is found THEN the system SHALL parse all token entries and store them in memory
3. WHEN a token entry has validation errors THEN the system SHALL exclude that token from query responses and add the error to health warnings
4. WHEN a token entry has validation warnings (e.g., unresolved ref) THEN the system SHALL include the token in query responses and surface the warning
5. WHEN `product/tokens/` does not exist THEN the system SHALL report zero product tokens in health status without error
6. WHEN the product index is rebuilt THEN product tokens SHALL be re-indexed alongside other product content
7. Token indexing SHALL occur after `token-index/` is loaded, ensuring ref resolution is available during indexing

### Requirement 3: Token Reference Resolution

**User Story**: As a product agent querying product tokens, I want references to system tokens resolved with their values, so that I have complete context without making additional queries.

#### Acceptance Criteria

1. WHEN a product token has a `ref` field THEN the system SHALL attempt to resolve it by searching across all token-index files (`primitives.yaml`, `semantics.yaml`, `components.yaml`)
2. WHEN resolution of a primitive ref succeeds THEN the response SHALL include `resolvedValue` (the token's numeric/string value) and `resolvedUnitType` (inferred from token family: spacing→logical, color→color, motion→duration)
3. WHEN resolution of a semantic ref succeeds THEN the system SHALL chase the reference chain (semantic → primitive reference → primitive value) to return the final resolved value. IF chain resolution is not feasible in v1, the system MAY return the intermediate primitive token name as `resolvedValue` with `resolvedUnitType` inferred from the semantic token's category.
4. WHEN resolution fails (token not found in any index file) THEN the response SHALL include `resolvedValue: null`, `resolvedUnitType: null`, and a warning: "Token '{name}' references '{ref}' which is not in token-index — verify index is current (`npx designerpunk generate`)"
5. WHEN the `token-index/` directory does not exist THEN all ref tokens SHALL have null resolved values with a single warning indicating the index is unavailable
6. The system SHALL resolve refs by reading `token-index/` YAML files directly — no runtime dependency on the Application MCP
7. The `resolvedUnitType` SHALL be inferred from the referenced token's family/category using a mapping table (e.g., spacing→logical, color→color, motion→duration, opacity→percent)

### Requirement 4: Query Tool Interface

**User Story**: As a product agent, I want to query product tokens by category, name, or platform, so that I can discover relevant values during screen specification.

#### Acceptance Criteria

1. The Product MCP SHALL expose a `get_product_tokens` tool
2. WHEN called with no parameters THEN it SHALL return all product tokens grouped by category
3. WHEN called with `category` parameter THEN it SHALL return only tokens in that category
4. WHEN called with `name` parameter THEN it SHALL return only the token matching that name
5. WHEN called with `platform` parameter THEN it SHALL return only tokens whose `platforms` array includes that platform
6. WHEN multiple parameters are provided THEN they SHALL be applied conjunctively (AND)
7. WHEN no tokens match the filter THEN it SHALL return an empty `categories` array with no error
8. Each token in the response SHALL include: `name`, `value`, `unitType`, `ref`, `resolvedValue`, `resolvedUnitType`, `description`, `rationale`, `usage`, `platforms`, and `promotionCandidate`
9. The response SHALL include a top-level `warnings` array containing any resolution failures or validation warnings
10. Each category in the response SHALL include `name` and `description` (from the category file's top-level fields)

### Requirement 5: Health Reporting

**User Story**: As a governance agent, I want product token counts and validation status in the Product MCP health report, so that I can audit token governance compliance.

#### Acceptance Criteria

1. WHEN `get_product_health` is called THEN the response SHALL include a `productTokens` object nested within the existing health response, containing: `tokenCount`, `categoryCount`, `errorCount`, `warningCount`
2. WHEN tokens have validation errors THEN the `productTokens` object SHALL include an `errors` array with specific error messages
3. WHEN tokens have unresolved references THEN the `productTokens` object SHALL include a `warnings` array with specific warning messages (separate from the existing top-level `warnings` array which covers non-token issues)
4. WHEN `product/tokens/` does not exist THEN `productTokens` SHALL report `tokenCount: 0, categoryCount: 0` with no errors

### Requirement 6: MCP Relationship Model Update

**User Story**: As any DesignerPunk agent, I want the MCP Relationship Model to accurately describe product tokens, so that I understand the system's architecture without consulting spec documents.

#### Acceptance Criteria

1. The MCP Relationship Model SHALL replace "brand tokens (TBD)" with "product tokens" in the Product MCP Content Types section
2. The MCP Relationship Model SHALL include the Product MCP design philosophy: "deviation is welcome; deviation without communication is not"
3. The MCP Relationship Model SHALL clarify that "cross-product" in the Promotion Path means cross-vertical within one organization
4. The MCP Relationship Model SHALL define the scope model: product token (one vertical) → system token (all verticals), with component tokens described as orthogonal (system-level tokens with component-scoped consumption, not a tier below product tokens)

### Requirement 7: Product Token Governance Documentation

**User Story**: As a product agent authoring product tokens, I want clear governance documentation, so that I know what's expected when creating tokens and how to avoid common mistakes.

#### Acceptance Criteria

1. A product token governance steering document SHALL exist with authoring guidance
2. The governance doc SHALL include the litmus test for classifying component vs product vs system tokens
3. The governance doc SHALL include color governance rules (two-gate justification: no system color fits AND not a SemanticOverrides concern)
4. The governance doc SHALL include naming conventions for categories and tokens
5. The governance doc SHALL include the promotion signal definition (multiple verticals, same semantic need)
6. The governance doc SHALL include 2-3 example rationales demonstrating the expected quality bar
7. The governance doc SHALL include guidance on what NOT to tokenize (values that are truly one-off implementation details)
8. The governance doc SHALL state the single-value principle: responsive application is a consumer concern, use `usage` field for consumption guidance
9. The governance doc SHALL include authoring workflow guidance: Leonardo defines product tokens during screen specification; platform agents (Sparky, Kenya, Data) may add tokens during implementation when they discover needs not anticipated in the spec
10. The governance doc SHALL specify token naming rules: camelCase within categories, descriptive but concise, no platform-specific prefixes
11. The governance doc SHALL be referenced in the agent configurations (`.kiro/agents/*.json`) for Leonardo, Sparky, Kenya, and Data as a steering doc dependency, ensuring product agents have authoring guidance in context during implementation
