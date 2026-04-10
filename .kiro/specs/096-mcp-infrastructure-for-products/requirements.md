# Requirements Document: Token Data Index

**Date**: 2026-04-10
**Spec**: 096 - Token Data Index
**Status**: Requirements Phase
**Dependencies**: Spec 094 (complete), Spec 095 (complete)

---

## Introduction

The Application MCP serves component data but not token data. Agents can't query "what tokens exist in the spacing family?" or "which components consume colorActionPrimary?" without reading source files. This spec adds a build-time YAML index of all tokens and four query tools to the Application MCP.

---

## Requirements

### Requirement 1: Token Index Generation

**User Story**: As a token specialist, I want the pipeline to generate a structured token index so that token data is queryable via the Application MCP.

#### Acceptance Criteria

1. WHEN `npx designerpunk generate` is run THEN it SHALL produce three YAML files in `token-index/`: `primitives.yaml`, `semantics.yaml`, `components.yaml`
2. WHEN the index is generated THEN each primitive token entry SHALL include: name, family, value, mathematical relationship (formula + result), and platform-specific names (CSS, Swift, Kotlin)
3. WHEN the index is generated THEN each semantic token entry SHALL include: name, category, primitive references, platform-specific names, and theme-varying status (whether overridden in any registered theme)
4. WHEN the index is generated THEN each component token entry SHALL include: name, component, primitive references, and the component that defines it
5. WHEN the index is generated THEN consumer relationships SHALL be included — which components reference each token, derived from component `schema.yaml` `tokens:` sections
6. WHEN the token source changes and `npx designerpunk generate` is re-run THEN the index SHALL reflect the current state of all tokens

---

### Requirement 2: Application MCP Token Query Tools

**User Story**: As a product architect, I want to query tokens the same way I query components so that I can make informed token selection decisions during screen specification.

#### Acceptance Criteria

1. WHEN `search_tokens` is queried with optional `family`, `tier`, or `name` parameters THEN it SHALL return matching tokens with name, family, tier, and value
2. WHEN `get_token_details` is queried with a token name THEN it SHALL return: value, family, tier, platform outputs (web/iOS/Android names), mathematical relationship, theme-varying status, and list of consuming components
3. WHEN `get_token_family` is queried with a family name THEN it SHALL return all tokens in that family with values and relationships
4. WHEN `get_token_consumers` is queried with a token name THEN it SHALL return all components that reference it, with the context from the schema tokens section
5. WHEN the Application MCP starts THEN it SHALL load the token index from `token-index/` at startup alongside the component index
6. WHEN the token index directory doesn't exist THEN the Application MCP SHALL start without token data (no error) and token queries SHALL return empty results with a warning

---

### Requirement 3: Token Index Location and Packaging

**User Story**: As a package maintainer, I want the token index in a consistent location so that the Application MCP can find it and `npm pack` includes it.

#### Acceptance Criteria

1. WHEN the token index is generated THEN it SHALL be placed at `token-index/` at the package root
2. WHEN `npm pack` is run THEN the `token-index/` directory SHALL be included in the tarball
3. WHEN the Application MCP resolves the token index path THEN it SHALL use the configurable `TOKEN_INDEX_DIR` env var (from Spec 081 WS3) or derive from the package root

---

### Requirement 4: Integration Guide Contribution

**User Story**: As a product developer, I want the Integration Guide to document token queries so that I know what's available.

#### Acceptance Criteria

1. WHEN the Integration Guide is updated THEN it SHALL document the four token query tools with parameters and example responses
2. WHEN the Integration Guide is updated THEN it SHALL document that the token index is generated as part of `npx designerpunk generate`

---

## Documentation Requirements

1. Integration Guide contribution (Requirement 4)
2. Token query tools documented in the Application MCP query reference
3. Agent resource updates for token query capabilities (Leo, Ada, platform agents)

**Waiver**: No component or token family documentation changes — this spec adds MCP query infrastructure, not tokens or components.

---

## Deferred Items

| Item | Rationale | Activation Trigger |
|------|-----------|-------------------|
| Token index includes product-created tokens | The index walks all tokens in the repo (ecosystem + product-created). No separate handling needed — unified by design. | Already handled — not actually deferred |
