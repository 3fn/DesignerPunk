---
inclusion: manual
name: Product-Token-Governance
description: Product token authoring governance — scope model, naming conventions, litmus test, color governance, promotion signals, and authoring workflow. Load when authoring product tokens, reviewing product token quality, or evaluating promotion candidates.
---

# Product Token Governance

**Date**: 2026-05-25
**Purpose**: Governance framework for authoring, naming, and promoting product tokens
**Organization**: process-standard
**Scope**: cross-project
**Layer**: 2
**Relevant Tasks**: product-development, screen-specification
**Last Reviewed**: 2026-05-25

---

## Overview

Product tokens are named, typed values owned by a product vertical — scoped to that vertical, available to all surfaces within it. They make product-level decisions visible, structured, and queryable via the Product MCP.

**Design Philosophy**: Deviation is welcome; deviation without communication is not. Product tokens are not problems to be minimized — they are signals to be observed. Every product token communicates "I need something the system doesn't provide" in a way that is discoverable by other teams and reviewable during promotion cycles.

**Core Principle**: If you're naming a value with structure, it's a product token. There is no "too small to tokenize" category. The act of naming forces intentionality.

---

## Scope Model

Product tokens exist within a clear tier hierarchy:

| Tier | Scope | Governance |
|------|-------|-----------|
| **Product token** | One product vertical, any number of surfaces | Product team authors freely |
| **System token** | All product verticals (organizational) | Promotion requires Ada review |

Component tokens are orthogonal — they are system-level tokens with component-scoped consumption, governed by Ada + Lina. They are not a tier below product tokens; they are a different axis entirely.

**"Multiple products" means multiple verticals within one organization** — not unrelated businesses. DesignerPunk serves a single organization's product portfolio, where each vertical shares the system layer but owns its product-level decisions.

---

## Litmus Test

Use this to classify where a value belongs:

- **Component token**: Consumed by a specific component's platform implementation file (e.g., `buttonIcon.inset.large` inside Button-Icon's Swift/Kotlin/TS). If only a component's internals use it, it's a component token.
- **Product token**: Consumed by screen layout, page composition, or product-level logic. If you're naming it with structure, it's a product token.
- **System token**: Generalizable across multiple product verticals — promoted via the Promotion Path with Ada's review.
- **Not a token at all**: If you can't articulate a rationale for why the value exists, it probably shouldn't be a token. The `rationale` requirement is your test.

---

## Authoring Workflow

**Leonardo** defines product tokens during screen specification. He identifies product-level values, names them, and documents their purpose. This is the primary authoring path.

**Platform agents** (Sparky, Kenya, Data) may add product tokens during implementation when they discover needs not anticipated in the screen spec. They follow the same naming conventions and governance rules.

**Naming authority**: The indexer validates naming mechanically (camelCase enforcement). Leonardo sets naming patterns for the vertical (e.g., "layout tokens use `content*` prefix for content-area constraints"), but enforcement is the indexer's job, not a human routing step.

---

## System-First Value Selection

**Rule**: Before authoring a product token with a `value:` field, query the relevant system token families. If a system token (semantic or primitive) exists within perceptual tolerance of your intended value, use `ref:` instead.

A `value:` product token requires demonstrating that the nearest system token doesn't serve the need. The `rationale` field must state which system token was considered and why it was rejected.

**Responsibility**: This rule applies at the *authoring* point — Leonardo during screen spec, platform agents when discovering new needs during implementation. Platform agents consuming generated CSS custom properties don't need to worry about ref vs value at consumption time. If Leonardo's spec already includes a `value:` token with rationale, platform agents trust that decision during implementation.

### The Workflow

1. **Identify the value you need** — e.g., "I need 60% opacity on a dark overlay"
2. **Query system tokens (semantic first, then primitives)** — `search_tokens({ family: "opacity" })` or `get_token_family({ family: "opacity" })`. Check semantic tokens first per Core Goals token priority.
3. **Find the nearest token** — e.g., `opacity056` (0.56) and `opacity064` (0.64)
4. **Evaluate perceptual tolerance** — Is the difference visible? See tolerance table below.
5. **Decision**:
   - **Nearest token works** → Use `ref:` (e.g., `ref: opacity064`)
   - **Nearest token doesn't work** → Use `value:` with rationale explaining why (e.g., "opacity064 produces visible text on this specific background where opacity056 does not — tested at both values")

**Prototype escape hatch**: During explicit prototype/exploratory work, values may be authored without the system-first query, marked with `# TODO: snap to system`. These MUST be resolved before the spec leaves design phase — they cannot be carried into implementation unexamined.

### Perceptual Tolerance Guidelines

| Family | Tolerance | Rationale |
|--------|-----------|-----------|
| Opacity | ±0.04 | Below JND (just-noticeable difference) for transparency |
| Spacing | ±1 logical unit | Sub-pixel at standard density; invisible |
| Color (OKLCH) | ΔE₀₀ ≤ 1.0 | Below CIEDE2000 perceptual threshold; accounts for gamut shape |
| Border width | 0 (exact only) | 1px vs 2px is always visible |
| Radius | ±1 logical unit | Subtle curvature difference; usually invisible |
| Duration (≤300ms) | ±20ms | Short animations are perceptually sensitive |
| Duration (>300ms) | ±50ms | Longer animations tolerate more variance |

**Not covered by tolerance (use exact values or explicit rationale):**
- **z-index** — no perceptual analog; use system z-index tokens or document layering rationale
- **Composite values** (shadows, gradients, clip-paths) — query individual constituent primitives where possible (e.g., shadow offset, blur, opacity separately), but the composite as a whole may be product-specific
- **Percentage-based values** — context-dependent; evaluate whether a system token covers the same intent rather than matching numeric value

### What This Prevents

- Agents inventing "round" values (0.5, 0.6, 0.7) when the system's mathematically-derived values (0.56, 0.64, 0.72) are perceptually identical
- Product tokens that drift from the system without justification
- Retroactive snap-to-system audits that should have been unnecessary

### What This Does NOT Prevent

- Legitimate product-specific values that genuinely fall outside system coverage
- Creative decisions where the exact value matters (e.g., a specific brand color)
- Values in families where no system primitive exists at all

---

## Naming Conventions

### Category Names

- Lowercase ASCII letters and hyphens only: `layout`, `motion`, `content`, `layout-grid`
- Must map to valid platform namespace identifiers (generation pipeline transforms: `layout-grid` → `ProductLayoutGrid`)
- Validated at index time

### Token Names

- **camelCase** with acronyms treated as words: `contentMaxWidth`, `maxUrlLength` (not `maxURLLength`)
- Descriptive but concise — the category provides context, so don't repeat it
- No platform-specific prefixes or suffixes
- Validated at index time with error: "Token '{name}' must be camelCase. Product tokens are platform-agnostic source definitions — the generation pipeline handles platform-specific naming."

**Why camelCase?** Product tokens are platform-agnostic source definitions. The generation pipeline (Spec 109) transforms them to platform conventions (`--product-layout-content-max-width` for CSS, `ProductLayout.contentMaxWidth` for Swift/Kotlin). Writing in your platform's native convention (kebab-case, snake_case) conflates source with output.

### Examples

| ✅ Good | ❌ Bad | Why |
|---------|--------|-----|
| `contentMaxWidth` | `content-max-width` | kebab-case is CSS output, not source |
| `maxUrlLength` | `maxURLLength` | Acronyms as words |
| `flipDuration` | `flip_duration` | snake_case is not source convention |
| `chartAccentBlue` | `--chart-accent-blue` | CSS custom property syntax in source |

---

## Value Governance

### Reference Tokens (`ref`)

Tokens using `ref` point to an existing system token. No `rationale` required — the reference IS the rationale.

```yaml
contentIndent:
  ref: space300
  description: Left indent for section content
```

**Preference**: Use semantic refs over primitive refs when a semantic token exists for the concept (concept-first principle). `ref: space.inset.comfortable` is better than `ref: space300` if the semantic captures your intent.

### Hard Value Tokens (`value`)

Tokens using `value` introduce a number outside the system's mathematical foundation. `rationale` is **required** — you must explain why no system token fits.

```yaml
contentMaxWidth:
  value: 1336
  unitType: logical
  description: Maximum content column width
  rationale: "Optimized for 70-75 characters per line at body font size across common viewport widths"
```

**Quality bar for rationale:**

| ✅ Good rationale | ❌ Bad rationale |
|-------------------|-----------------|
| "Optimized for 70-75 characters per line at body font size across common viewport widths" | "Looks good" |
| "Tuned to match 24fps flicker perception threshold; decorative, not functional" | "We needed a number" |
| "Typographic best practice for readability; no system token covers character-width constraints" | "Designer said so" |

A good rationale explains the *why* — the design reasoning, the constraint it satisfies, or the standard it follows. A bad rationale restates the *what* or provides no reasoning.

---

## Color Governance

Product tokens CAN define colors, but with stricter governance than other value types. Colors have a two-gate justification:

**Gate 1**: No system color (primitive or semantic) fits the need.
**Gate 2**: A `SemanticOverrides` entry isn't appropriate (this isn't a theme-level brand color).

Both gates must be addressed in the `rationale` field.

### Worked Examples

**✅ Valid product color token:**
```yaml
chartAccentBlue:
  value: "#2196F3"
  unitType: color
  description: Primary accent for data visualization elements
  rationale: "No system blue exists (only cyan primitives). Not a theme override because this is visualization-specific, not a surface-wide brand color."
```

**❌ Should be a SemanticOverrides entry:**
```yaml
brandPink:
  value: "#FF4081"
  unitType: color
  description: Brand accent color for the product
  rationale: "We want a different pink than the system provides"
  # WRONG — this IS a brand color. Use SemanticOverrides to override the system's accent color.
```

**❌ Should use a system token:**
```yaml
errorRed:
  value: "#F44336"
  unitType: color
  description: Error state color
  rationale: "Need red for errors"
  # WRONG — the system has color.feedback.error.text. Use ref: color.feedback.error.text
```

### Decision Tree for Colors

1. Does a system semantic color exist for this purpose? → Use `ref`
2. Does a system primitive color exist? → Use `ref`
3. Is this a brand-level color that should apply across the product's surfaces? → Use `SemanticOverrides`
4. Is this a product-specific color for a specific use case (visualization, one-off UI)? → Product token with two-gate rationale

**Audit note**: The indexer validates that `rationale` exists for color tokens mechanically. The *quality* of the rationale (whether it genuinely addresses both gates) is a governance audit responsibility — Thurgood and Stacy review this during quality audits, not the indexer at index time.

---

## Single-Value Principle

Product tokens define single values. Responsive application (which token to use at which breakpoint, how to apply it per platform) is a consumer concern.

"Responsive" means different things on each platform:
- **Web**: CSS media queries keyed to viewport width
- **iOS**: Size classes (compact/regular)
- **Android**: Resource qualifiers (sw320dp, sw600dp)

Embedding responsive logic in the token format would leak platform-specific semantics into a cross-platform source.

**Use the `usage` field** for consumption guidance:

```yaml
contentMaxWidth:
  value: 1336
  unitType: logical
  description: Maximum content column width
  rationale: "Optimized for 70-75 characters per line..."
  usage: "Applied above breakpointMd. Below breakpointMd, content fills available width."
```

---

## Promotion Signals

**Trigger**: When two or more product verticals independently define tokens for the same semantic need, that's evidence the system has a gap.

**Example**: Portfolio defines `contentMaxWidth: 1336` and WrKingClass defines `contentMaxWidth: 1280`. Same concept, similar values, independent decisions. This signals that Rosetta may need a `layout.content.maxWidth` semantic token.

**Process**: Stacy's Lessons Synthesis Reviews surface these patterns. Ada evaluates whether a system semantic should be created. Peter approves the promotion.

**Optional signal**: Authors can flag tokens they suspect are generalizable using `promotionCandidate: true`. This creates a breadcrumb trail for governance reviews without triggering any automated process.

---

## What NOT to Tokenize

Not every value needs to be a product token. Skip tokenization for:

- **Canvas coordinates** — pixel positions for SVG/canvas rendering that have no semantic meaning
- **Animation physics constants** — spring damping, mass values that are tuning parameters
- **SVG filter parameters** — blur radii, color matrix values specific to one visual effect
- **One-off magic numbers with no rationale** — if you can't explain why the value is what it is, it's not ready to be a token

**The test**: Can you write a meaningful `rationale`? If not, the value is an implementation detail, not a product decision.

---

## Sub-Grouping Heuristic

Product tokens are flat within categories. If you find yourself wanting sub-categories (e.g., `layout.grid`, `layout.prose`, `layout.modal`), consider:

1. Are these values generalizable? → Maybe they should be system semantic tokens
2. Is the category too broad? → Create more specific category files (`layout-grid.yaml`, `layout-prose.yaml`)
3. Is this a component concern? → Maybe these belong in component tokens

Sub-grouping pressure is a signal that the values may be system-level concerns. Use it as a prompt to evaluate promotion, not as a reason to add hierarchy to the format.

---

## MCP Query

For product token data:
```
get_product_tokens()
get_product_tokens({ category: "layout" })
get_product_tokens({ platform: "ios" })
```

For governance health:
```
get_product_health()  → includes productTokens section with error/warning counts
```
