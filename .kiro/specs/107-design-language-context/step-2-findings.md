# Step 2 Findings: MCP Contrast & Practice Enhancement Opportunities

**Date**: 2026-05-16
**Spec**: 107-design-language-context
**Status**: Investigation complete

---

## Executive Summary

The Application MCP already serves the *data* that DESIGN.md's frontmatter provides (token values, formulas, platform names, component specs). The Product MCP serves a thin slice of what PRODUCT.md provides (product name, platforms, theme, description, principles). The significant gaps are in the *aesthetic philosophy layer*: color strategy, named design rules, do's/don'ts, anti-references, brand personality, and register-aware behavior. Additionally, Impeccable introduces design practices (OKLCH, color strategy vocabulary, anti-slop mechanisms) that DesignerPunk could adopt independently of any integration.

---

## Application MCP: What It Already Provides

### Token Data (maps to DESIGN.md frontmatter)

| DESIGN.md Field | Application MCP Equivalent | Coverage |
|-----------------|---------------------------|----------|
| `colors:` | `search_tokens({ family: "color" })` | ✅ Full — 45+ color tokens with formulas |
| `typography:` | `search_tokens({ family: "typography" })` | ✅ Full — fontSize, lineHeight, fontWeight, letterSpacing |
| `spacing:` | `search_tokens({ family: "spacing" })` | ✅ Full — 15 primitives + 30+ semantics with formulas |
| `rounded:` | `search_tokens({ family: "radius" })` | ✅ Full — radius tokens with mathematical relationships |
| `components:` | `get_component_full()` | ✅ Richer — behavioral contracts, schemas, platform implementations |

### What Application MCP Provides That DESIGN.md Doesn't

- **Mathematical formulas**: Every token has a derivation (`base × 1.5 = 12`), not just a value
- **Semantic hierarchy**: `space.grouped.normal` → references `space100`. Intent encoded in the name.
- **Cross-platform names**: web (`--space-100`), iOS (`space100`), Android (`space_100`)
- **Consumer tracking**: Which components use which tokens
- **Behavioral contracts**: 10 categories, 136 concepts per component
- **Composition rules**: `check_composition()`, `validate_assembly()`
- **Experience patterns**: `get_experience_pattern("simple-form")` — assembly guidance
- **Family guidance**: `get_prop_guidance("Buttons")` — selection rules

### What Application MCP Lacks That DESIGN.md Provides

- **Creative north star / description**: No "one-line aesthetic philosophy" equivalent
- **Named design rules**: No "The One Voice Rule" or "The Paper-Not-White Rule" equivalent
- **Do's and Don'ts**: No explicit positive/negative visual guidance
- **Elevation/shadow vocabulary**: No shadow token family (shadows exist in component implementations but not as queryable tokens)
- **Component visual specs**: Application MCP has behavioral contracts but not visual styling details (backgroundColor, textColor, padding as a composed unit)

---

## Product MCP: What It Already Provides

### Current Data Shape (from overview.yaml)

```yaml
name: WrKingClass
abbreviation: WKC
platforms: [web, ios, android]
theme: marketing
description: Civic engagement platform
```

### Current Principles Data (from principles/*.md)

```yaml
---
name: design-direction
keywords: [civic, dark-theme, engagement]
---
# Design Direction
The marketing site uses a dark theme with cyan/teal electric accent colors.
Civic engagement focus — content-first, accessible, trustworthy.
```

### Mapping to PRODUCT.md Schema

| PRODUCT.md Field | Product MCP Equivalent | Coverage |
|-----------------|----------------------|----------|
| `## Register` | `theme: marketing` (partial) | 🟡 Partial — "marketing" implies brand register but not explicit |
| `## Users` | Not served | ❌ Missing |
| `## Product Purpose` | `description` (one line) | 🟡 Minimal — one line vs full paragraph |
| `## Brand Personality` | Not served | ❌ Missing |
| `## Anti-references` | Not served | ❌ Missing |
| `## Design Principles` | `principles/*.md` with keywords | 🟡 Partial — exists but thin (2 sentences + keywords) |
| `## Accessibility & Inclusion` | Not served | ❌ Missing |

### What Product MCP Provides That PRODUCT.md Doesn't

- **Screen specifications**: Full UI trees with component references
- **Domain objects**: Structured data models
- **Experience map**: Screen relationships and flow
- **Reverse indexes**: Component→screen, token→screen mappings
- **Gap detection**: Missing components flagged automatically
- **Platform filtering**: Per-platform screen specs

---

## Gap Analysis: What's Missing Across Both MCPs

### Category 1: Aesthetic Philosophy (neither MCP serves this)

| Need | Description | Priority |
|------|-------------|----------|
| Creative north star | One-line aesthetic direction ("warm-paper editorial sanctuary") | High |
| Color strategy | Restrained/Committed/Full/Drenched classification | High |
| Named design rules | Memorable, enforceable constraints | Medium |
| Do's and Don'ts | Explicit positive/negative visual guidance | Medium |
| Anti-slop mechanisms | Category-reflex checks, aesthetic lane awareness | Low (novel) |

### Category 2: Brand Identity (Product MCP partially serves)

| Need | Description | Priority |
|------|-------------|----------|
| Register (brand/product) | Surface type classification that changes behavior | High |
| Brand personality | Voice, tone, 3-word personality | High |
| Anti-references | What this should NOT look like | High |
| Users & context | Who uses this, their job to be done | Medium |
| Accessibility requirements | WCAG level, specific needs | Medium (partially in steering docs) |

### Category 3: Visual System Application (Application MCP has data, lacks guidance)

| Need | Description | Priority |
|------|-------------|----------|
| Shadow/elevation vocabulary | Semantic shadow scale with usage guidance | Medium |
| Motion philosophy | When to animate, what curves, what durations | Medium (partially in motion tokens) |
| Typography application | Not just values but hierarchy rules, pairing logic | Medium |
| Layout philosophy | Grid approach, spacing rhythm, density guidance | Low (partially in semantic spacing) |

---

## Practice Enhancement Opportunities

These are design practices from Impeccable that DesignerPunk could adopt independently of any integration:

### 1. OKLCH Color Space (High Value)

**What Impeccable does:** Mandates OKLCH for all color definitions. Perceptually uniform, wide-gamut, better contrast prediction.

**What DesignerPunk currently does:** Hex values in token definitions, converted to platform formats.

**Opportunity:** Adopt OKLCH as the canonical color definition format in token source files. Benefits:
- Perceptually uniform lightness (L channel) makes contrast calculations trivial
- Chroma (C) and hue (H) separation enables systematic palette generation
- Wide-gamut support future-proofs for Display P3 screens
- Mathematical relationships between colors become expressible as formulas (same as spacing)

**Consideration:** This would be a Rosetta architecture decision (Ada's domain). The generated output (CSS, Swift, Kotlin) can still be hex/platform-native. The source format is what changes.

### 2. Color Strategy Vocabulary (High Value)

**What Impeccable does:** Four-tier commitment axis: Restrained → Committed → Full palette → Drenched. Each tier has clear rules about accent usage percentage and palette breadth.

**What DesignerPunk currently does:** No equivalent framework. Color tokens exist but there's no vocabulary for *how much* color to use or *what strategy* to follow.

**Opportunity:** Adopt as a product-level design decision framework. When Leonardo specs a screen, the color strategy is declared ("this screen uses Committed strategy with the primary action color"). This informs both human designers and AI agents about appropriate color density.

### 3. Named Design Rules (Medium Value)

**What Impeccable does:** "The One Voice Rule," "The Paper-Not-White Rule," "The OKLCH-Only Rule" — memorable, enforceable, specific.

**What DesignerPunk currently does:** Governance rules exist in steering docs but aren't named memorably. "Token Selection Priority" is functional but not sticky.

**Opportunity:** Name the key rules. "The Semantic-First Rule" (always use semantic tokens before primitives). "The Formula Rule" (every value must be derivable). "The Contract Rule" (every component behavior is explicit). Named rules are easier for both humans and AI to remember and enforce.

### 4. Register System (Medium Value)

**What Impeccable does:** Brand vs Product register fundamentally changes typography, color, layout, and motion defaults.

**What DesignerPunk currently does:** No equivalent. All surfaces treated the same way.

**Opportunity:** Introduce surface-type awareness. A marketing landing page for a DesignerPunk consumer has different needs than their app dashboard. The token system is the same; the *application guidance* differs. This maps to Leonardo's screen specs: each screen could declare its register, and the design language context adjusts accordingly.

### 5. Anti-Slop Mechanisms (Novel, Exploratory)

**What Impeccable does:** Category-reflex checks (two-tier test preventing obvious domain→aesthetic mappings), reflex-reject font list, reflex-reject aesthetic lanes.

**What DesignerPunk currently does:** Nothing equivalent. The system prevents *incorrect* usage (wrong token, wrong component) but not *generic* usage (technically correct but aesthetically undifferentiated).

**Opportunity:** This is genuinely novel territory. Could DesignerPunk's governance layer detect when an AI agent is producing "AI slop" — technically correct implementations that look like every other AI-generated interface? This would be a Civitas-level capability: not just "is this correct?" but "is this distinctive?"

**Consideration:** This is the most speculative enhancement. It requires taste judgments that are inherently subjective. Worth exploring but not a near-term priority.

---

## Synthesis: Where Things Should Live

Based on the evidence (not prescriptive — this is a finding for the evaluation phase):

| Context Type | Natural Home | Rationale |
|-------------|-------------|-----------|
| Token values, formulas, platforms | Application MCP (already there) | System-level, product-agnostic |
| Component specs, contracts | Application MCP (already there) | System-level, product-agnostic |
| Color strategy vocabulary | Application MCP (new) | System-level framework, not product-specific |
| Named design rules | Application MCP (new) or Docs MCP | System-level governance |
| Shadow/elevation vocabulary | Application MCP (new token family) | System-level, mathematical |
| Register classification | Product MCP (extend overview) | Product-specific decision |
| Brand personality | Product MCP (new field) | Product-specific identity |
| Anti-references | Product MCP (new field) | Product-specific constraints |
| Users & context | Product MCP (new field) | Product-specific audience |
| Creative north star | Product MCP (new field) | Product-specific aesthetic direction |
| Do's and Don'ts | Product MCP (new) or hybrid | Product-specific application of system rules |
| Anti-slop mechanisms | Neither (new capability) | Cross-cutting, novel |

---

## Key Insight

The gap isn't "DesignerPunk can't serve what Impeccable needs." The gap is that DesignerPunk has the *data* (tokens, components, contracts) but lacks the *philosophy layer* that tells an AI agent how to *apply* that data aesthetically. The tokens say "space150 = 12." The philosophy layer would say "use varied spacing for rhythm; same padding everywhere is monotony" and "this product uses Committed color strategy with the primary accent on no more than 30% of the surface."

This philosophy layer is what makes the difference between "technically correct" and "aesthetically intentional."

---

## Next Step

Step 3: Assess how Impeccable's reasoning model uses context to make decisions. Specifically: how does the `craft` → `shape` → `build` flow work, and where would MCP queries replace file reads in that flow?

Or: pause here for the decision gate. Steps 1-2 provide enough findings to:
- Write a manual PRODUCT.md + DESIGN.md for the presentation project (immediate need)
- Inform the evaluation phase about what MCP extensions would look like (future spec work)
