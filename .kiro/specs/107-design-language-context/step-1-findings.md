# Step 1 Findings: Impeccable Context Architecture Audit

**Date**: 2026-05-16
**Spec**: 107-design-language-context
**Status**: Investigation complete

---

## Executive Summary

Impeccable uses a two-file context system (PRODUCT.md + DESIGN.md) loaded via a Node script that outputs JSON. The system separates strategic context ("who/what/why") from visual context ("how it looks"). A register system (brand vs product) modifies behavior significantly. Seven domain reference files provide design knowledge that's applied universally. The system is entirely file-based with no external query mechanism.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Impeccable Context Flow                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  load-context.mjs                                           │
│       ↓ reads                                               │
│  PRODUCT.md (strategic) + DESIGN.md (visual)                │
│       ↓ outputs JSON                                        │
│  { hasProduct, product, hasDesign, design, contextDir }     │
│       ↓ consumed by                                         │
│  SKILL.md (shared design laws + register routing)           │
│       ↓ loads                                               │
│  Register reference (brand.md OR product.md)                │
│       ↓ loads                                               │
│  Command reference (craft.md, shape.md, etc.)               │
│       ↓ loads                                               │
│  Domain references (typography, color, spatial, etc.)        │
│       ↓ produces                                            │
│  Design decisions informed by all layers                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## PRODUCT.md Schema (Strategic Context)

**Purpose:** Answers "who/what/why" — the strategic foundation for all design decisions.

### Required Fields

| Field | Purpose | Example |
|-------|---------|---------|
| `## Register` | brand or product (bare value) | `brand` |
| `## Users` | Who uses this, their context, job to be done | Designers using AI tools... |
| `## Product Purpose` | What it does, why it exists, success metrics | Gives builders a shared design vocabulary... |
| `## Brand Personality` | Voice, tone, 3-word personality, emotional goals | Expert, decisive, editorial |
| `## Anti-references` | What this should NOT look like (specific patterns) | Generic AI tool marketing, SaaS clichés... |
| `## Design Principles` | 3-5 strategic principles (NOT visual rules) | Practice what you preach, show don't tell... |
| `## Accessibility & Inclusion` | WCAG level, known user needs | WCAG 2.1 AA, reduced motion, semantic HTML... |

### Key Characteristics

- **No visual information.** Colors, fonts, spacing belong in DESIGN.md, not here.
- **Register is the most important field.** It determines which reference file loads (brand.md vs product.md), which fundamentally changes typography, color, layout, and motion behavior.
- **Anti-references are as important as references.** They prevent the AI from falling into training-data defaults.
- **Principles are strategic, not tactical.** "Practice what you preach" not "use OKLCH."

---

## DESIGN.md Schema (Visual Context)

**Purpose:** Answers "how it looks" — the visual system in machine-readable + human-readable form.

### Format: Google Stitch DESIGN.md

Follows the [Google Stitch format](https://stitch.withgoogle.com/docs/design-md/format/): YAML frontmatter (machine-readable tokens) + markdown body (human-readable guidance).

### YAML Frontmatter (Machine-Readable)

```yaml
---
name: <project title>
description: <one-line creative north star>
colors:
  <slug>: "<color value>"  # OKLCH or hex
typography:
  <role>:
    fontFamily: "<stack>"
    fontSize: "<value>"
    fontWeight: <number>
    lineHeight: <number>
    letterSpacing: "<value>"  # optional
rounded:
  <size>: "<value>"
spacing:
  <size>: "<value>"
components:
  <component-state>:
    backgroundColor: "{colors.<slug>}"
    textColor: "{colors.<slug>}"
    typography: "{typography.<role>}"
    rounded: "{rounded.<size>}"
    padding: "<value>"
---
```

### Token Reference System

- Components reference primitives via `{path.to.token}` syntax
- Primitives may NOT reference each other
- Limited to 8 component props: backgroundColor, textColor, typography, rounded, padding, size, height, width
- Shadows, motion, focus rings, backdrop-filter are NOT in frontmatter (carried in prose)

### Markdown Body (Human-Readable) — 6 Sections, Fixed Order

1. **## Overview** — Creative north star, aesthetic philosophy, key characteristics
2. **## Colors** — Palette explanation, named rules, usage guidance
3. **## Typography** — Font choices, hierarchy, named rules
4. **## Elevation** — Shadow vocabulary, depth philosophy
5. **## Components** — Button, card, input, nav specifications
6. **## Do's and Don'ts** — Explicit guidance on what to do and avoid

### Key Characteristics

- **Tokens are normative; prose provides application context.** The YAML is the source of truth; the markdown explains how to use it.
- **Named Rules are powerful.** "The One Voice Rule," "The Paper-Not-White Rule," "The OKLCH-Only Rule" — these are memorable, enforceable constraints.
- **Do's and Don'ts are explicit.** Not vague guidelines but specific, actionable directives.
- **No extra sections allowed.** Layout, responsive, motion fold into the 6 spec sections.

---

## Register System

The register (brand vs product) is the single most impactful context decision. It changes:

| Aspect | Brand Register | Product Register |
|--------|---------------|-----------------|
| **Typography** | Distinctive fonts, modular scale, fluid clamp() | System fonts legitimate, fixed rem, tighter scale |
| **Color** | Committed/Full/Drenched strategies encouraged | Restrained default, semantic state vocabulary |
| **Layout** | Asymmetric, rule-breaking, single-purpose viewports | Predictable grids, familiar patterns |
| **Motion** | Ambitious first-load, scroll-triggered, choreography | 150-250ms state transitions only |
| **Imagery** | Required for image-led briefs, art direction per section | Functional, not decorative |
| **Risk tolerance** | High (typographic risk, unexpected color, strangeness) | Low (earned familiarity, tool disappears into task) |

### Brand Register Unique Features

- **Font selection procedure**: 4-step process rejecting training-data defaults
- **Reflex-reject list**: 23 banned fonts (Inter, Fraunces, Playfair, etc.)
- **Reflex-reject aesthetic lanes**: Currently saturated visual families to avoid
- **Category-reflex check**: Two-tier test preventing obvious domain→aesthetic mappings
- **Brand permissions**: Ambitious motion, single-purpose viewports, typographic risk, art direction per section

### Product Register Unique Features

- **System fonts legitimate**: Inter, SF Pro, system-ui stacks are fine
- **Consistency over surprise**: Same vocabulary screen to screen
- **Density permitted**: Tables, panels, dense information
- **Standard patterns encouraged**: Top bar, side nav, breadcrumbs, tabs
- **Component state coverage required**: default, hover, focus, active, disabled, loading, error

---

## Domain Reference Files (7)

These load on every command and provide universal design knowledge:

| Reference | Content | Size |
|-----------|---------|------|
| `typography.md` | Type systems, font pairing, modular scales, OpenType | 8.3KB |
| `color-and-contrast.md` | OKLCH, tinted neutrals, dark mode, accessibility | 5.8KB |
| `spatial-design.md` | Spacing systems, grids, visual hierarchy, container queries | 3.5KB |
| `motion-design.md` | Easing curves, staggering, reduced motion | 5.8KB |
| `interaction-design.md` | Forms, focus states, loading patterns | 7.1KB |
| `responsive-design.md` | Mobile-first, fluid design, container queries | 3.5KB |
| `ux-writing.md` | Button labels, error messages, empty states | 4.3KB |

### Additional References (not domain, but loaded contextually)

| Reference | Purpose | Size |
|-----------|---------|------|
| `brand.md` | Brand register behavior | 11.4KB |
| `product.md` | Product register behavior | 4.1KB |
| `craft.md` | Full build workflow | 11.6KB |
| `shape.md` | UX/UI planning before code | 11.3KB |
| `teach.md` | Context gathering workflow | 9.3KB |
| `document.md` | DESIGN.md generation | 28.2KB |
| `critique.md` | UX design review | 16.9KB |
| `live.md` | Browser iteration mode | 51.0KB |

---

## Shared Design Laws (from SKILL.md)

These apply universally regardless of register:

### Color Laws
- Use OKLCH
- Never pure black/white (tint toward brand hue)
- Pick a color strategy before picking colors (Restrained → Committed → Full palette → Drenched)

### Typography Laws
- Cap body line length at 65-75ch
- Hierarchy through scale + weight contrast (≥1.25 ratio)

### Layout Laws
- Vary spacing for rhythm (same padding everywhere = monotony)
- Cards are the lazy answer (use only when truly best affordance)
- Don't wrap everything in a container

### Motion Laws
- Don't animate CSS layout properties
- Ease out with exponential curves (ease-out-quart/quint/expo)
- No bounce, no elastic

### Absolute Bans
- Side-stripe borders (border-left/right > 1px as accent)
- Gradient text (background-clip: text + gradient)
- Glassmorphism as default
- Hero-metric template (big number + small label + stats)
- Identical card grids
- Modal as first thought
- Em dashes in copy

### AI Slop Test
- First-order: Can someone guess theme+palette from category alone?
- Second-order: Can someone guess aesthetic family from category+anti-references?

---

## Creation Workflow (craft command)

The `craft` command is the primary creation flow:

1. **Step 0: Project Foundation** — Detect framework, component library, icon set
2. **Step 1: Shape** — Run `/impeccable shape` to plan UX/UI (required gate)
3. **Step 2: Load References** — Load relevant domain references based on brief
4. **Step 3: Visual Direction** — Generate mocks if harness supports it (gate)
5. **Step 4: Build** — Implement to production quality (extensive checklist)
6. **Step 5: Iterate** — Visual inspection and critique against brief
7. **Step 6: Present** — Show result, explain decisions, ask for feedback

### Key Insight: Multiple User Gates

Craft has explicit gates where it MUST stop and wait for user confirmation:
- Shape brief confirmed
- Direction questions answered
- Palette confirmed
- Mock direction approved

This prevents the AI from compressing the design process into a single implementation pass.

---

## Context Consumption Mechanism

### How Context Flows to Decisions

1. `load-context.mjs` reads PRODUCT.md + DESIGN.md from project root (or fallback dirs)
2. Outputs full file contents as JSON to stdout
3. Agent consumes the JSON output into conversation context
4. SKILL.md's setup instructions tell the agent to:
   - Identify register from PRODUCT.md
   - Load matching register reference (brand.md or product.md)
   - Load command-specific reference if invoked
5. All subsequent design decisions are filtered through this layered context

### File Resolution Order
1. `IMPECCABLE_CONTEXT_DIR` env var (if set)
2. Project root (cwd)
3. `.agents/context/` subdirectory
4. `docs/` subdirectory

### Key Limitation: Static Files Only

The entire system is file-based. There is no:
- External API or MCP query
- Dynamic token resolution
- Live connection to a design system's source of truth
- Mechanism to detect drift between DESIGN.md and actual token values

---

## Observations Relevant to DesignerPunk Integration

### Alignment Points (where Impeccable and DesignerPunk agree)

1. **Mathematical spacing**: Impeccable recommends 4pt base with semantic naming. DesignerPunk uses 8px base with mathematical relationships. Compatible philosophies.
2. **Token hierarchy**: Both use primitive → semantic patterns (Impeccable's DESIGN.md frontmatter mirrors Rosetta's tier structure).
3. **Accessibility-first**: Both mandate WCAG 2.1 AA as baseline.
4. **Anti-pattern awareness**: Both have explicit "don't do this" lists.
5. **Register concept**: DesignerPunk's distinction between system-level (Rosetta/Stemma) and product-level (screen specs) maps loosely to brand/product register.

### Tension Points (where they diverge or conflict)

1. **Spacing base**: Impeccable says 4pt, DesignerPunk says 8px. Impeccable's spatial-design.md explicitly says "8pt systems are too coarse."
2. **Font bans**: Impeccable bans Inter, Space Grotesk, and 21 other fonts. DesignerPunk is font-agnostic.
3. **Color format**: Impeccable mandates OKLCH. DesignerPunk uses hex in token definitions.
4. **Motion easing**: Impeccable bans bounce/elastic. DesignerPunk's iOS implementations use spring animations (Spec 093).
5. **Static vs queryable**: Impeccable's context is static files. DesignerPunk's context is live MCP queries.
6. **Opinionated vs systematic**: Impeccable is taste-driven ("this looks bad"). DesignerPunk is contract-driven ("this violates the behavioral promise").

### Gap: What DesignerPunk Lacks That Impeccable Provides

1. **Aesthetic philosophy documentation**: DesignerPunk has no "creative north star" or "aesthetic philosophy" equivalent
2. **Color strategy vocabulary**: No "Restrained/Committed/Full/Drenched" framework
3. **Named design rules**: No memorable, enforceable constraints like "The One Voice Rule"
4. **Anti-slop mechanisms**: No category-reflex check or aesthetic lane awareness
5. **Do's and Don'ts**: No explicit positive/negative guidance for visual decisions
6. **Register-aware behavior**: No mechanism to change design approach based on surface type

### Gap: What Impeccable Lacks That DesignerPunk Provides

1. **Mathematical token relationships**: Impeccable's spacing is arbitrary values; DesignerPunk's are formula-derived
2. **Cross-platform awareness**: Impeccable is web-only; DesignerPunk generates for 3 platforms
3. **Behavioral contracts**: Impeccable has no component contract system
4. **Progressive disclosure**: Impeccable loads everything; DesignerPunk queries what's needed
5. **Governance layer**: Impeccable has no equivalent to Civitas
6. **Institutional memory**: Impeccable has no spec system or completion documentation
7. **Live token resolution**: Impeccable can't query current token values dynamically

---

## Implications for Step 2 (Product MCP Contrast)

The key question for Step 2 is: **What from PRODUCT.md and DESIGN.md could be served dynamically by DesignerPunk's MCP infrastructure instead of static files?**

Preliminary mapping:

| Impeccable Context | Potential DesignerPunk Source |
|-------------------|------------------------------|
| Colors (DESIGN.md frontmatter) | `search_tokens({ family: "color" })` via Application MCP |
| Typography (DESIGN.md frontmatter) | `search_tokens({ family: "typography" })` via Application MCP |
| Spacing (DESIGN.md frontmatter) | `search_tokens({ family: "spacing" })` via Application MCP |
| Components (DESIGN.md frontmatter) | `get_component_full()` via Application MCP |
| Register | New: Product MCP `get_product_overview()` extension |
| Brand personality | New: Product MCP or new data source |
| Anti-references | New: Product MCP or new data source |
| Design principles | Partially: `get_product_overview()` already serves principles |
| Aesthetic philosophy | New: No current equivalent |
| Named rules | New: No current equivalent |
| Do's and Don'ts | New: No current equivalent |

---

## Next Step

Step 2: Contrast these findings with the Product MCP's current capabilities. Specifically:
- What does `get_product_overview()` currently return?
- What's in the "principles" data?
- How much of PRODUCT.md's schema is already served?
- What's the gap size for DESIGN.md's visual context?
