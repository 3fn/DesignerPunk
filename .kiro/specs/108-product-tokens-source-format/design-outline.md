# Design Outline: Product Tokens — Source Format & MCP Discoverability

**Date**: 2026-05-25
**Spec**: 108 - Product Tokens — Source Format & MCP Discoverability
**Status**: Design Outline
**Author**: Thurgood (with Peter)
**Origin**: `.kiro/issues/2026-05-25-product-level-values-pipeline.md`

---

## Problem Statement

Products built on DesignerPunk generate values that don't belong in Rosetta (system tokens) or Stemma (component tokens) but still need:
- Structured definition with descriptions and metadata
- Cross-platform visibility (web, iOS, Android)
- Agent discoverability via the Product MCP
- Governance lighter than Rosetta but heavier than ad-hoc CSS

The MCP Relationship Model (§ "Product MCP Content Types") lists "brand tokens" and "product primitives" as future content types with shape marked TBD. The portfolio audit (Spec 002) surfaced 9+ concrete values that have no home in the current architecture. Product team agents naturally refer to these as "product tokens" — distinct from brand-level theming (which flows through `SemanticOverrides.ts`) and from system tokens (which are Rosetta's domain).

**This spec addresses steps 1-2 of the broader product tokens initiative:**
1. Define a structured source format for product tokens
2. Make product tokens queryable via the Product MCP

Steps 3-4 (reference validation, platform generation) are deferred to a follow-up spec that depends on this one.

---

## Design Philosophy

The Product MCP embodies the principle that **deviation is welcome; deviation without communication is not**.

Product tokens make product-level decisions visible, structured, and queryable — enabling the organization to observe patterns across verticals and evolve the system in response to real product needs rather than theoretical abstractions. Every product token is a product team saying "I need something the system doesn't provide" in a way that is discoverable by other teams and reviewable during promotion cycles.

The Product MCP is not just a data store — it's a communication layer. Product tokens are not problems to be minimized; they are signals to be observed. When multiple verticals deviate in the same direction, that's not a governance failure — it's a system gap making itself visible through structured communication.

---

## Terminology

| Term | Meaning |
|------|---------|
| **Product token** | A named, typed value owned by a product vertical — scoped to that vertical, available to all surfaces within it. If you name it with structure, it's a product token. |
| **System token** | A Rosetta primitive or semantic token — shared across all product verticals within the organization |
| **Component token** | A Stemma-level token consumed by a specific component's platform implementation — system-level, not product-level |
| **Product vertical** | A distinct product line within the organization (e.g., Venmo's P2P, credit card, debit card). Each vertical has its own `product/` directory. |
| **Brand token** | (Deprecated term) Previously used in MCP Relationship Model; replaced by "product token" for clarity. Brand-level theming uses `SemanticOverrides.ts` instead. |

---

## Scope Model

Product tokens exist within a clear tier hierarchy:

| Tier | Scope | Promotion Trigger |
|------|-------|-------------------|
| **Component token** | One component's platform implementation | N/A — system-level by definition |
| **Product token** | One product vertical, any number of surfaces | When multiple verticals independently arrive at the same need |
| **System token** | All product verticals (organizational) | N/A — already system-level |

**Litmus test for classification:**
- **Component token**: Consumed by a specific component's implementation file (e.g., `buttonIcon.inset.large` inside Button-Icon)
- **Product token**: Consumed by screen layout, page composition, or product-level logic. If you're naming it with structure, it's a product token.
- **System token**: Generalizable across multiple product verticals — promoted via the existing Promotion Path with Ada's review

**Promotion signal**: When two or more product verticals independently define tokens for the same semantic need (e.g., Portfolio defines `contentMaxWidth: 1336` and WrKingClass defines `contentMaxWidth: 1280`), that's evidence the system has a gap. Stacy's Lessons Synthesis Reviews surface these patterns; Ada evaluates whether a system semantic should be created.

**"Multiple products" means multiple verticals within one organization** — not unrelated businesses. DesignerPunk serves a single organization's product portfolio, where each vertical (Portfolio, WrKingClass, etc.) shares the system layer but owns its product-level decisions.

---

## Proposed Solution

### Source Format

Product tokens are defined in YAML within the product directory, consistent with how all other Product MCP content is authored:

**Location**: `product/tokens/` (one file per category, or a single `product/tokens.yaml`)

**Format** (per-category file approach):

```yaml
# product/tokens/layout.yaml
category: layout
description: Structural layout constraints for the product

tokens:
  contentMaxWidth:
    value: 1336
    unitType: logical
    description: Maximum content column width
    rationale: "Optimized for 70-75 characters per line at body font size across common viewport widths"
    usage: "Applied above breakpointMd. Below breakpointMd, content fills available width."
    platforms: [web, ios, android]

  contentIndent:
    ref: space300
    description: Left indent for section content
    platforms: [web, ios, android]

  errorHighlightColor:
    ref: color.feedback.error.text
    description: Color used for layout error boundaries during development
    platforms: [web]

  proseMeasureMax:
    value: 48
    unitType: ch
    description: Maximum line length for body text
    rationale: "Typographic best practice for readability; no system token covers character-width constraints"
    platforms: [web]
```

```yaml
# product/tokens/motion.yaml
category: motion
description: Product-specific motion characteristics

tokens:
  flipDuration:
    ref: duration350
    description: Card-to-modal expansion timing
    platforms: [web, ios, android]

  flickerDuration:
    value: 800
    unitType: duration
    description: Neon easter egg animation cycle
    rationale: "Tuned to match 24fps flicker perception threshold; decorative, not functional"
    platforms: [web]
```

### Token Entry Shape

Each token entry supports:

| Field | Required | Description |
|-------|----------|-------------|
| `value` | One of `value` or `ref` | Hard value (number or string) |
| `ref` | One of `value` or `ref` | Reference to any system token (primitive, semantic, or component) by canonical name |
| `unitType` | Required when `value` is used | Logical unit type — pipeline maps to platform-specific units (see Unit Types below) |
| `description` | Yes | Human-readable purpose |
| `rationale` | Required when `value` is used | Why this hard value exists outside the system's mathematical foundation |
| `usage` | No | Consumption guidance — when/how to apply this token (e.g., breakpoint conditions, platform-specific application notes) |
| `platforms` | No | Platform applicability. Default: all platforms. |
| `promotionCandidate` | No | Optional flag indicating the author suspects this value is generalizable across verticals |

**Single-value principle**: Product tokens define single values, consistent with Rosetta system tokens. Responsive application (which token to use at which breakpoint, how to apply it per platform) is a consumer concern. "Responsive" means different things on each platform (CSS media queries, iOS size classes, Android resource qualifiers) — embedding responsive logic in the token format would leak platform-specific semantics into a cross-platform source. Use the optional `usage` field to document consumption guidance without adding format complexity.

**Ref scope**: `ref` can point to any token tier — primitive (`ref: space300`), semantic (`ref: color.feedback.error.text`), or component (`ref: buttonIcon.inset.large`). Semantic references are preferred per the concept-first principle. Ref values use canonical token names as they appear in `token-index/*.yaml` keys, not platform-specific output names.

**Governance rules**:
- Tokens using `ref` don't need `rationale` — the reference IS the rationale.
- Tokens using hard `value` MUST provide `rationale` explaining why no system token fits.
- Tokens using `unitType: color` require stricter rationale: must explain why no system color (primitive or semantic) fits AND why a `SemanticOverrides` entry isn't appropriate.

### Validation Rules

These are indexing-time errors surfaced in `get_product_health` warnings:

| Condition | Severity | Message |
|-----------|----------|---------|
| Both `value` and `ref` present | ERROR | "Token '{name}' has both value and ref. Use one." |
| Neither `value` nor `ref` present | ERROR | "Token '{name}' has neither value nor ref." |
| `value` present without `unitType` | ERROR | "Token '{name}' has value without unitType." |
| `value` present without `rationale` | ERROR | "Token '{name}' has hard value without rationale." |
| `ref` token not found in token-index | WARNING | "Token '{name}' references '{ref}' which is not in token-index." |
| Category name contains invalid characters | ERROR | "Category '{name}' must be lowercase ASCII letters and hyphens only (a-z, -)." |
| Platform-limited `unitType` with incompatible `platforms` | ERROR | "Token '{name}' uses unitType '{unitType}' which is not available on platform '{platform}'." |

Tokens with ERRORs are excluded from `get_product_tokens` responses. Tokens with WARNINGs are included but the warning is surfaced.

### Unit Types

Unit types describe *what kind of value* this is, not what CSS/Swift/Kotlin unit to emit. The generation pipeline (Spec B) maps unit types to platform-specific output.

| unitType | Web output | iOS output | Android output | Use for |
|----------|-----------|------------|----------------|---------|
| `logical` | `px` | `CGFloat` (points) | `.dp` | Spatial values that scale 1:1 across platforms |
| `duration` | `ms` | `TimeInterval` (seconds) | `Long` (ms) | Time-based values |
| `ch` | `ch` | N/A | N/A | Character-width units (web-only) |
| `ratio` | unitless | unitless | unitless | Aspect ratios, multipliers |
| `count` | unitless | `Int` | `Int` | Discrete counts (character limits, retry counts) |
| `percent` | `%` | `CGFloat` (0-1) | `Float` (0-1) | Percentage values |
| `color` | hex/rgb | `UIColor` | `Color` | Product-specific colors (stricter governance) |

This list is extensible — new unit types can be added as products need them.

**Consumption rule**: Platform output units are applied by the generation pipeline (Spec B). Product tokens follow the same consumption rule as system tokens — consumers use the generated constant, never appending units manually.

### Product MCP Integration

**New tool**: `get_product_tokens`

```
get_product_tokens()
→ Returns all product tokens grouped by category

get_product_tokens({ category: "layout" })
→ Returns tokens in the layout category only

get_product_tokens({ name: "contentMaxWidth" })
→ Returns a single token with full metadata

get_product_tokens({ platform: "ios" })
→ Returns only tokens whose platforms include ios
```

**Parameters** (all optional, conjunctive):

| Parameter | Type | Description |
|-----------|------|-------------|
| `category` | string | Filter by category name |
| `name` | string | Filter by token name |
| `platform` | string | Filter to tokens applicable to this platform (`web`, `ios`, `android`) |

**Canonical response shape**:
```json
{
  "categories": [
    {
      "name": "layout",
      "description": "Structural layout constraints for the product",
      "tokens": [
        {
          "name": "contentMaxWidth",
          "value": 1336,
          "unitType": "logical",
          "description": "Maximum content column width",
          "rationale": "Optimized for 70-75 characters per line at body font size",
          "platforms": ["web", "ios", "android"],
          "ref": null,
          "resolvedValue": null,
          "resolvedUnitType": null
        },
        {
          "name": "contentIndent",
          "value": null,
          "unitType": null,
          "description": "Left indent for section content",
          "rationale": null,
          "platforms": ["web", "ios", "android"],
          "ref": "space300",
          "resolvedValue": 24,
          "resolvedUnitType": "logical"
        }
      ]
    }
  ],
  "warnings": [
    "Token 'flickerCurve' references 'easeInOutCustom' which is not in token-index."
  ]
}
```

**Field definitions**:

| Field | Type | Present when |
|-------|------|-------------|
| `value` | number \| string \| null | Non-null for hard-value tokens |
| `unitType` | string \| null | Non-null for hard-value tokens |
| `ref` | string \| null | Non-null for reference tokens |
| `resolvedValue` | number \| string \| null | Non-null when `ref` is present AND resolution succeeds |
| `resolvedUnitType` | string \| null | Non-null when `ref` is present AND resolution succeeds |
| `rationale` | string \| null | Non-null for hard-value tokens |
| `description` | string | Always present |
| `platforms` | string[] | Always present (defaults to all platforms) |

When a reference cannot be resolved, `resolvedValue` and `resolvedUnitType` are `null` and a warning is added to the top-level `warnings` array.

### Directory Structure

```
product/
├── overview.yaml
├── experience-map/
├── domain-objects/
├── templates/
├── components/
├── principles/
└── tokens/              ← NEW
    ├── layout.yaml
    ├── motion.yaml
    └── content.yaml     (extensible to any category)
```

---

## Naming Convention

Product tokens use a `product-{category}-{tokenName}` convention when rendered to platform output (future Spec B concern), but the source format uses nested YAML structure rather than flat names:

- **Source**: `tokens/layout.yaml` → `contentMaxWidth`
- **CSS output** (future): `--product-layout-content-max-width`
- **Swift output** (future): `ProductLayout.contentMaxWidth`
- **Kotlin output** (future): `ProductLayout.contentMaxWidth`

The source format deliberately avoids encoding the output naming — that's a generation concern for the follow-up spec.

---

## What This Is NOT

- **Not color overrides** — theme-level color changes stay in `SemanticOverrides.ts`. Product tokens CAN define product-specific colors (e.g., chart accents) but with stricter governance: rationale must exhaust system colors → primitive colors → semantic overrides before reaching for a hard color value.
- **Not component tokens** — those are Stemma's domain (`*.tokens.ts` files), consumed by a specific component's platform implementation
- **Not mathematical scale values** — those are Rosetta primitives
- **Not a replacement for system tokens** — product tokens that prove generalizable across verticals get promoted to Rosetta via the existing Promotion Path
- **Not local constants** — if you're naming a value with structure, it's a product token. There is no "too small to tokenize" category. The act of naming forces intentionality.

**Boundary litmus test**: If the value is consumed by a specific component's platform implementation file, it's a component token. If it's consumed by screen layout, page composition, or product-level logic, it's a product token. If it only exists for one surface and you're unsure whether to tokenize it — the `rationale` requirement will tell you. If you can't articulate why the value exists, it probably shouldn't be a token.

---

## Forward Compatibility Constraints

These constraints ensure the follow-up spec (reference validation + platform generation) isn't blocked by decisions made here:

1. **Token references must be string-based** — `ref: "space300"` not `ref: tokens.space300`. This keeps the source format parseable without TypeScript compilation, enabling both MCP indexing and future pipeline validation. Ref values use canonical token names as they appear in `token-index/*.yaml` keys, not platform-specific output names (e.g., `space300` not `--space-300`).

2. **Category structure must map to platform namespaces** — each category file becomes a namespace (`ProductLayout`, `ProductMotion`). Category filenames allow lowercase ASCII letters and hyphens (e.g., `layout-grid.yaml`). The generation pipeline (Spec B) handles transformation to platform-appropriate identifiers (e.g., `layout-grid` → `ProductLayoutGrid` in Swift/Kotlin, `layout-grid` → `--product-layout-grid-*` in CSS). Validated at index time.

3. **Platform filtering must be per-token** — not per-category. A category like "layout" may have tokens that are web-only (`48ch`) alongside tokens that are cross-platform (`1336px` → `1336.dp`).

4. **Unit type information must be explicit** — the pipeline needs to know whether `1336` is logical pixels, duration, or a count. `unitType` declares the semantic kind of value; the pipeline maps to platform-specific units. Don't rely on inference.

5. **The format must support future extension** — fields like `deprecated`, `promotedTo`, `addedIn` may be needed later. The YAML format naturally supports this without breaking changes.

6. **Hard values require rationale** — tokens using `value` (not `ref`) must include a `rationale` field explaining why no system token fits. This supports promotion review and audit workflows.

---

## Decisions (Resolved from Open Questions)

### D1: Directory of files (was Q1)

**Decision**: Option B — `product/tokens/{category}.yaml`, one file per category.

**Rationale**: Scales better, consistent with `experience-map/` and `domain-objects/` patterns. MCP tooling provides efficient access regardless of file count.

### D2: Resolve token references at query time (was Q2)

**Decision**: Option B — `get_product_tokens` returns resolved values alongside references.

**Rationale**: Minimizing context forces agents into multi-query workflows. The Application MCP's effectiveness comes from providing complete context in a single response. Product MCP should follow the same principle.

**Implementation**: Product MCP reads the generated `token-index/` directory (same source Application MCP uses) to resolve `ref` values at query time. No cross-MCP runtime dependency — shared data source.

When a reference cannot be resolved (token not found in index), `resolvedValue` and `resolvedUnitType` are `null` and a warning is added to the top-level `warnings` array. See canonical response shape in "Product MCP Integration" section.

### D3: Platform-divergent values (was Q3)

**Decision**: Addressed by `unitType` + `platforms` fields.

- Cross-platform values use `unitType: logical` — pipeline renders per platform
- Platform-specific values use `platforms: [web]` to filter applicability
- Fundamentally different concepts per platform are separate tokens

### D4: Governance ownership (was Q4)

**Decision**: Product agents author, system agents review during promotion, Thurgood audits.

- **Product agents** (Leonardo, Sparky, Kenya, Data): Author product tokens during screen implementation
- **System agents** (Ada, Lina): Don't create product tokens; review during promotion to system tokens
- **Thurgood**: Audits naming convention compliance, rationale quality, and governance health

### D5: No sub-grouping in v1 (was Q5)

**Decision**: Flat within categories. More specific category files (`layout-grid.yaml`) if needed.

**Governance heuristic**: If you find yourself wanting sub-categories, consider whether these values should be promoted to semantic tokens. Sub-grouping pressure is a signal that the values may be system-level concerns.

---

## Relationship to Existing Architecture

| Existing Concept | How Product Tokens Relate |
|-----------------|--------------------------|
| `designerpunk.config.ts` | Future spec may add `productTokens` path reference pointing to the YAML source |
| `SemanticOverrides.ts` | Different concern — overrides change token VALUES; product tokens are NEW names |
| Component tokens (`*.tokens.ts`) | Different scope — component tokens are system-level; product tokens are product-level |
| Product MCP "brand tokens (TBD)" | THIS IS the implementation of that concept (renamed to "product tokens") |
| Rosetta pipeline | Product tokens use a lighter pipeline (no math validation, no cross-product reuse requirement) |
| Application MCP token tools | Product tokens are NOT served by Application MCP — they're Product MCP content |

---

## Scope

**In scope:**
- YAML source format definition
- Product MCP indexer extension (read and parse `product/tokens/`)
- `get_product_tokens` tool implementation
- Token reference resolution at query time (read `token-index/` to resolve `ref` values)
- Product MCP health reporting for token count
- Steering documentation updates (see below)

**Documentation updates (tracked from requirements → tasks):**
- **MCP Relationship Model** — Replace "brand tokens (TBD)" with "product tokens" in Content Types section; add Product MCP design philosophy ("deviation is welcome; deviation without communication is not"); clarify "cross-product" means cross-vertical within one organization in Promotion Path section
- **Product token governance doc** (new) — Authoring guidance, litmus test, color governance, naming conventions, promotion signals
- **Product MCP section enrichment** — Install the design philosophy as the Product MCP's north star, visible to all agents

**Out of scope (deferred to follow-up spec):**
- Reference drift detection and validation reporting (broken refs as a governance concern)
- Platform-specific code generation (CSS, Swift, Kotlin output)
- `designerpunk.config.ts` extension
- CLI integration (`npx designerpunk generate` producing product token output)
- Promotion workflow tooling (product token → system token migration)

---

## Success Criteria

1. Product teams can define tokens in `product/tokens/*.yaml` with clear structure
2. Product agents can query `get_product_tokens` and receive structured, described values with resolved references
3. The source format supports token references without requiring TypeScript
4. The format is extensible for future platform generation without breaking changes
5. Product token governance documentation exists in steering docs (authoring guide, litmus test, color governance)
6. MCP Relationship Model updated: "brand tokens (TBD)" → "product tokens"; design philosophy installed; promotion path clarified as cross-vertical
7. Validation rules surface authoring errors in `get_product_health`
