# Design Document: Design Language Context for AI-Driven Interface Creation

**Date**: 2026-05-16
**Spec**: 107 - Design Language Context
**Status**: Design Phase
**Dependencies**: None (subsumes Spec 100)

---

## Overview

This design implements three tracks of work that together enable AI agents to create aesthetically intentional interfaces using DesignerPunk's design language:

1. **Track 2 (Revisions):** Font family token updates (Figtree, CommitMono)
2. **Track 1 (Additions):** Design philosophy authoring + Leonardo skill enhancement + Impeccable adaptation
3. **Track 3 (MCP Evolution):** Application MCP and Product MCP extensions for design language serving

The architecture follows the existing MCP indexing pattern: structured YAML source files → indexer class → query tools. No new architectural patterns are introduced.

---

## Architecture

### Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    Design Language Data Flow                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Source Data (authored)                                          │
│  ├── design-philosophy.yaml (Application MCP indexed dir)       │
│  └── overview.yaml (Product MCP indexed dir, extended)          │
│       ↓ indexed by                                              │
│  DesignPhilosophyIndexer (new, Application MCP)                 │
│  ProductIndexer (existing, extended)                             │
│       ↓ serves via                                              │
│  Application MCP tools:                                         │
│  ├── get_design_philosophy                                      │
│  ├── get_design_rules                                           │
│  ├── get_design_guidance                                        │
│  └── get_color_strategy                                         │
│  Product MCP tools:                                             │
│  ├── get_product_overview (extended)                             │
│  └── get_brand_context (new)                                    │
│       ↓ consumed by                                             │
│  Leonardo (with Impeccable skill adapted for DesignerPunk)      │
│       ↓ produces                                                │
│  Screen specs with aesthetic intentionality                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### File Locations

| Artifact | Path | Indexed By |
|----------|------|-----------|
| Design philosophy source | `design-language/design-philosophy.yaml` | DesignPhilosophyIndexer (via DataPaths config) |
| Product brand context | `product-mcp-server/data/[product]/overview.yaml` (extended) | ProductIndexer |
| Adapted skill references | `.kiro/skills/impeccable/reference/` (adapted copies) | N/A (loaded by agent) |
| Leonardo prompt update | `.kiro/agents/leonardo-prompt.md` | N/A (agent config) |
| Font family tokens | `src/tokens/FontFamilyTokens.ts` | TokenIndexer (existing) |

---

## Data Models

### design-philosophy.yaml Schema

```yaml
# application-mcp-server/data/design-philosophy.yaml

philosophy:
  northStar: "Infrastructure with Attitude"
  description: |
    DesignerPunk's visual identity is the intersection of mathematical
    rigor and electric energy. Dark surfaces provide the canvas; vivid,
    saturated accents provide the voice.
  characteristics:
    - "Dark surfaces as default canvas"
    - "Saturated accents used deliberately: purple=action, cyan=info, pink=attention, green=success"
    - "8px baseline grid with mathematical multipliers"
    - "Monospace for code, data, and system-level information"
    - "Semantic spacing categories encode design intent in token names"

rules:
  - name: "The Formula Rule"
    constraint: "Every value must be derivable from a mathematical relationship"
    rationale: "Traceability creates trust. Arbitrary values erode system integrity."
  - name: "The Semantic-First Rule"
    constraint: "Use semantic tokens before primitives"
    rationale: "Semantics encode intent; primitives encode value. Intent is more stable than value."
  - name: "The Contract Rule"
    constraint: "Every component behavior is explicit and testable"
    rationale: "Implicit behavior creates platform drift. Explicit contracts prevent it."
  - name: "The Dark Canvas Rule"
    constraint: "Dark surfaces are the default. Light mode is supported but dark is the brand voice."
    rationale: "Dark surfaces create focus and make saturated accents read as electric rather than garish."
  - name: "The One Accent Rule"
    constraint: "No more than one accent color per component"
    rationale: "Multiple accents compete for attention. Restraint creates hierarchy."

guidance:
  do:
    - category: "spacing"
      directive: "Use the 8px baseline grid for all spacing decisions"
    - category: "spacing"
      directive: "Use semantic spacing tokens (space.grouped, space.separated) to encode relationships"
    - category: "spacing"
      directive: "Vary spacing for rhythm; uniform padding is monotony"
    - category: "color"
      directive: "Use dark surfaces as the primary canvas"
    - category: "color"
      directive: "Use saturated accents deliberately: purple for action, cyan for information, pink for attention, green for success"
    - category: "typography"
      directive: "Use monospace for token names, code, and data values"
    - category: "typography"
      directive: "Cap body text at 65-75ch"
    - category: "motion"
      directive: "Use expo-out easing on web/Android; spring physics on iOS"
    - category: "motion"
      directive: "Respect prefers-reduced-motion on all animations"
    - category: "elevation"
      directive: "Use surface lightness progression for depth (not shadow intensity)"
    - category: "elevation"
      directive: "Tint shadows toward blue or gray, never pure black"
  dont:
    - category: "spacing"
      directive: "Use arbitrary spacing values outside the 8px grid"
    - category: "color"
      directive: "Use pure black shadows"
    - category: "color"
      directive: "Use more than one accent color per component"
    - category: "color"
      directive: "Use decorative gradients (gradients must communicate state or depth)"
    - category: "typography"
      directive: "Use display fonts or decorative typefaces"
    - category: "motion"
      directive: "Use bounce or elastic easing on web/Android"
    - category: "general"
      directive: "Use glassmorphism, gradient text, or side-stripe borders"
    - category: "general"
      directive: "Use identical card grids (vary size, density, or layout for hierarchy)"
    - category: "general"
      directive: "Hedge in copy ('you might want to consider' → 'use')"

colorStrategy:
  - tier: "Restrained"
    definition: "Tinted neutrals + one accent at 10% or less of the surface"
    whenToUse: "Product register default. Settings, data tables, admin panels, routine CRUD."
    whenNotToUse: "Brand-heavy surfaces, marketing pages, onboarding flows."
    example: "A settings page with gray surfaces and purple only on the save button."
  - tier: "Committed"
    definition: "One saturated color carries 30-60% of the surface"
    whenToUse: "Brand register default. Landing pages, hero sections, feature highlights."
    whenNotToUse: "Dense data interfaces, long-form reading, multi-action screens."
    example: "A hero section with a deep purple background and white text."
  - tier: "Full Palette"
    definition: "3-4 named color roles, each used deliberately"
    whenToUse: "Data visualization, status dashboards, multi-category interfaces."
    whenNotToUse: "Simple forms, single-purpose screens, text-heavy content."
    example: "A dashboard with purple for actions, cyan for info, green for success, pink for alerts."
  - tier: "Drenched"
    definition: "The surface IS the color. Color is the primary visual element."
    whenToUse: "Splash screens, loading states, celebration moments, brand campaigns."
    whenNotToUse: "Any screen where the user needs to read or interact with content."
    example: "An app launch screen that's entirely electric purple with the logo in white."
```

### Product MCP overview.yaml Extension

```yaml
# Existing fields (unchanged)
name: WrKingClass
abbreviation: WKC
platforms: [web, ios, android]
theme: marketing
description: Civic engagement platform

# New fields (added by this spec)
register: brand
brand:
  personality: "civic, trustworthy, electric"
  voice: "Direct, informed, empowering"
  tone: "Confident without being aggressive. Civic without being bureaucratic."
  antiReferences:
    - "Government websites (cluttered, inaccessible, bureaucratic)"
    - "Social media platforms (attention-harvesting, manipulative)"
    - "Generic civic tech (boring, institutional, forgettable)"
  users: "US citizens who want to engage in the democratic process but find existing tools inaccessible or overwhelming"
  accessibility: "WCAG 2.1 AA. High contrast required for outdoor mobile use. Reduced motion support mandatory."
```

---

## Components and Interfaces

### DesignPhilosophyIndexer (New Class)

```typescript
// application-mcp-server/src/indexer/DesignPhilosophyIndexer.ts

interface DesignPhilosophy {
  northStar: string;
  description: string;
  characteristics: string[];
}

interface DesignRule {
  name: string;
  constraint: string;
  rationale: string;
}

interface DesignDirective {
  category: string;
  directive: string;
}

interface ColorStrategyTier {
  tier: string;
  definition: string;
  whenToUse: string;
  whenNotToUse: string;
  example: string;
}

interface DesignLanguageData {
  philosophy: DesignPhilosophy;
  rules: DesignRule[];
  guidance: { do: DesignDirective[]; dont: DesignDirective[] };
  colorStrategy: ColorStrategyTier[];
}

class DesignPhilosophyIndexer {
  private data: DesignLanguageData | null = null;
  private warnings: string[] = [];

  index(filePath: string): void;
  getPhilosophy(): DesignPhilosophy | null;
  getRules(): DesignRule[];
  getGuidance(category?: string): { do: DesignDirective[]; dont: DesignDirective[] };
  getColorStrategy(): ColorStrategyTier[];
  getWarnings(): string[];
}
```

### Product MCP Brand Context Extension

```typescript
// product-mcp-server/src/models.ts (extended)

interface BrandContext {
  personality: string;
  voice: string;
  tone: string;
  antiReferences: string[];
  users: string;
  accessibility: string;
}

interface ProductOverview {
  name: string;
  abbreviation?: string;
  platforms: string[];
  theme: string;
  description: string;
  register?: 'brand' | 'product';  // NEW
  brand?: BrandContext;              // NEW
}
```

### New Application MCP Tools

| Tool | Input | Output |
|------|-------|--------|
| `get_design_philosophy` | none | `{ northStar, description, characteristics }` |
| `get_design_rules` | none | `DesignRule[]` |
| `get_design_guidance` | `{ category?: string }` | `{ do: DesignDirective[], dont: DesignDirective[] }` |
| `get_color_strategy` | `{ tier?: string }` | `ColorStrategyTier[]` or single tier |

### New Product MCP Tool

| Tool | Input | Output |
|------|-------|--------|
| `get_brand_context` | none | `BrandContext` or `{ configured: false, guidance: "..." }` |

---

## Font Family Token Changes

### Implementation Site

The font family tokens are defined in `src/tokens/FontFamilyTokens.ts` as `PrimitiveToken` objects with platform-specific values generated via `generateFontFamilyPlatformValues()`. The change modifies the `platforms.web.value` (and equivalent iOS/Android values) within the token objects.

### Target Changes

| Token | Current Value | New Value |
|-------|--------------|-----------|
| `fontFamilyBody` | `'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'` | `'Figtree, -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'` |
| `fontFamilyMono` | `'"SF Mono", "Fira Code", "Fira Mono", Menlo, Consolas, monospace'` | `'"Commit Mono", "SF Mono", "Fira Code", Menlo, Consolas, monospace'` |
| `fontFamilyDisplay` | `'Rajdhani, ...'` | **UNCHANGED** |

### Consumer Isolation

Consumers who configure `tokenSource` in their `designerpunk.config` provide their own `FontFamilyTokens.ts`, which overrides the package defaults. This existing mechanism provides isolation without new code.

Consumers who do NOT configure `tokenSource` receive the updated defaults (Figtree/CommitMono). This is a visual change on upgrade, documented in release notes.

### Font Loading

Font loading is NOT a pipeline concern. The generator produces font-family *strings* as token values. The consumer is responsible for loading the actual font files (via Google Fonts CDN, self-hosted @font-face, etc.), same as today with Inter. The integration guide and release notes document the new font loading requirements (Figtree and Commit Mono CDN links).

---

## Leonardo Skill Integration

### Gate System Design

| Surface Novelty | Gate Depth | Confirmation Type |
|----------------|-----------|-------------------|
| Novel (first screen of type, complex multi-section) | Full | Human confirms brief + human confirms direction |
| Established (follows pattern with ≥2 prior examples) | Abbreviated | Self-confirm brief, human confirms direction |
| Trivial (minor modification to existing screen) | None | Self-confirm, proceed directly |

**Register influence:** Brand register bumps novelty up one tier (Trivial→Abbreviated, Abbreviated→Full). It does not unconditionally force Full gates.

Leonardo determines novelty by:
1. Query `find_screens({ context })` → count results matching the pattern
2. If count ≥ 2 → Established. If count < 2 → Novel.
3. Apply register bump (brand register adds one tier)
4. Result determines gate depth

### Skill Loading Sequence

```
1. Query get_design_philosophy() → creative north star + characteristics
2. Query get_design_rules() → named constraints + rationale
3. Query get_design_guidance() → do/don't directives (category-filtered based on task)
4. Query get_color_strategy() → tier vocabulary for color strategy declaration
5. Query get_product_overview() → determine register
6. Query get_brand_context() → brand identity (if configured)
7. Load register reference (adapted brand-dp.md or product-dp.md)
8. Load domain references as needed (typography, color, spatial, motion, etc.)
9. Load command reference if specific command invoked (craft.md, shape.md, etc.)
10. Proceed with gate system based on novelty assessment
```

**Command-specific references:** The 23+ command reference files (craft.md, shape.md, critique.md, audit.md, polish.md, etc.) contain procedural instructions, not design language context. They are kept as-is. Only brand.md and product.md contain context that conflicts with DesignerPunk. Exception: `teach.md` and `document.md` are excluded (replaced by MCP authoring workflow). `extract.md` is adapted (must respect token governance).

### Conflict Resolution (Explicit Hierarchy)

```
Priority 1: DesignerPunk token values (mathematical, authoritative)
Priority 2: DesignerPunk named design rules (governance, constrain SELECTION)
Priority 3: DesignerPunk behavioral contracts (component-level, constrain CAPABILITY)
Priority 4: Impeccable domain knowledge (universal design principles)
Priority 5: Impeccable taste opinions (applied only where DP is silent, noted as "ungoverned")
```

**Priority 2 vs 3 clarification:** Named rules constrain *which variant to choose* (selection). Behavioral contracts constrain *what's structurally valid* (capability). They operate at different levels: rules say "prefer the dark variant" (aesthetic preference); contracts say "this component supports dark and light variants" (structural fact). They rarely truly conflict.

**SKILL.md shared design laws:** Impeccable's SKILL.md contains "shared design laws" (OKLCH, no #000/#fff, color strategy tiers, 65-75ch cap, no bounce easing, absolute bans). These overlap with design-philosophy.yaml guidance. The conflict resolution hierarchy applies: where DesignerPunk's philosophy differs from SKILL.md's laws (e.g., SKILL.md says OKLCH, DesignerPunk tokens use rgba), Priority 1 wins. Where they agree (65-75ch cap, no bounce on web), they reinforce each other.

When a conflict is detected, the skill notes it in output:
```
[CONFLICT] Impeccable recommends 4pt base grid. DesignerPunk uses 8px base.
→ Applying DesignerPunk (Priority 1: token values).
```

---

## Impeccable Reference Adaptation Plan

### Complete Reference Inventory

| Reference | Disposition | Rationale |
|-----------|------------|-----------|
| brand.md | **Adapt** → `brand-dp.md` | Rewrite for DesignerPunk brand values |
| product.md | **Adapt** → `product-dp.md` | Rewrite for DesignerPunk product register |
| extract.md | **Adapt** | Must respect token governance (no autonomous token creation) |
| teach.md | **Exclude** | Replaced by MCP authoring workflow |
| document.md | **Exclude** | Replaced by MCP-served design philosophy |
| typography.md | **Keep** | Universal domain knowledge |
| color-and-contrast.md | **Keep** | Universal domain knowledge |
| spatial-design.md | **Keep** | Universal domain knowledge |
| motion-design.md | **Keep** | Universal domain knowledge |
| interaction-design.md | **Keep** | Universal domain knowledge |
| responsive-design.md | **Keep** | Universal domain knowledge |
| ux-writing.md | **Keep** | Universal domain knowledge |
| cognitive-load.md | **Keep** | Universal domain knowledge |
| personas.md | **Keep** | Universal domain knowledge |
| heuristics-scoring.md | **Keep** | Critique methodology |
| craft.md | **Keep** | Procedural (gate structure), not design language |
| shape.md | **Keep** | Procedural (interview structure), not design language |
| critique.md | **Keep** | Procedural |
| audit.md | **Keep** | Procedural |
| polish.md | **Keep** | Procedural |
| bolder.md | **Keep** | Procedural |
| quieter.md | **Keep** | Procedural |
| distill.md | **Keep** | Procedural |
| harden.md | **Keep** | Procedural |
| onboard.md | **Keep** | Procedural |
| animate.md | **Keep** | Procedural |
| colorize.md | **Keep** | Procedural |
| typeset.md | **Keep** | Procedural |
| layout.md | **Keep** | Procedural |
| delight.md | **Keep** | Procedural |
| overdrive.md | **Keep** | Procedural |
| clarify.md | **Keep** | Procedural |
| adapt.md | **Keep** | Procedural |
| optimize.md | **Keep** | Procedural |
| live.md | **Keep** | Procedural (browser iteration) |
| codex.md | **Keep** | Harness-specific (image generation) |

### References to Adapt (3 files)

**brand.md** → `brand-dp.md`:
- Replace font selection procedure with "use Figtree (body), CommitMono (mono), Rajdhani (display)"
- Replace reflex-reject font list with "N/A — fonts are system-defined"
- Keep: color strategy vocabulary, layout philosophy, motion permissions, brand permissions
- Add: DesignerPunk-specific brand characteristics (electric palette, mathematical precision, punk ethos)

**product.md** → `product-dp.md`:
- Keep: system fonts legitimate, consistency over surprise, density permitted, standard patterns
- Modify: reference DesignerPunk's semantic spacing tokens instead of generic spacing advice
- Add: DesignerPunk component selection via Application MCP queries

### References to Keep As-Is

All 7 domain references (typography.md, color-and-contrast.md, spatial-design.md, motion-design.md, interaction-design.md, responsive-design.md, ux-writing.md) are kept unchanged. They contain universal design knowledge that applies regardless of system. DesignerPunk's token system provides the override layer.

### SKILL.md Setup Replacement

The original setup flow (load-context.mjs → read files → output JSON) is replaced with:

```
1. Query Application MCP: get_design_philosophy()
2. Query Application MCP: get_design_rules()
3. Query Application MCP: get_color_strategy()
4. Query Product MCP: get_product_overview() (includes register)
5. Query Product MCP: get_brand_context() (if configured)
6. Determine register from overview → load brand-dp.md or product-dp.md
7. Proceed with command execution
```

### Commands Preserved

All 23 Impeccable commands remain available through Leonardo's skill. The adaptation is at the context-loading layer, not the command layer. `craft`, `shape`, `critique`, `audit`, `polish`, `bolder`, `quieter`, `distill`, etc. all function as designed, with DesignerPunk context replacing static file context.

---

## Error Handling

| Scenario | Behavior |
|----------|----------|
| Application MCP unavailable | Skill proceeds with token-only guidance. Warns: "Design philosophy unavailable. Aesthetic intentionality limited to system defaults." |
| Design philosophy not authored | Tools return `{ authored: false, guidance: "Run Step 4.5 to author design philosophy." }`. Skill proceeds with degraded capability. |
| Brand context not configured | `get_brand_context` returns `{ configured: false, guidance: "Add brand fields to overview.yaml." }`. Skill uses register defaults. |
| Malformed YAML | DesignPhilosophyIndexer adds warning to health check. Tools return partial data (whatever parsed successfully). |
| Conflict detected | Skill logs conflict with resolution rationale. Does not block execution. |

---

## Testing Strategy

### Unit Tests

- `DesignPhilosophyIndexer.test.ts`: YAML parsing, field extraction, malformed data handling, warnings
- `get_design_philosophy.test.ts`: Tool response shape, empty state, partial data
- `get_design_rules.test.ts`: Full list, empty list, malformed entries
- `get_design_guidance.test.ts`: Category filtering, full list, empty categories
- `get_color_strategy.test.ts`: All tiers, single tier query, missing tier
- `get_brand_context.test.ts`: Configured state, unconfigured state, partial config
- `FontFamilyTokens.test.ts`: Updated assertions for Figtree/CommitMono

### Integration Tests

- Application MCP serves design philosophy after index rebuild
- Product MCP serves brand context from extended overview.yaml
- Conflict resolution produces expected output when Impeccable and DesignerPunk disagree

### Validation

- Design philosophy YAML validates against schema (all required fields present)
- Font family change generates correct platform output (CSS, Swift, Kotlin)
- Consumer isolation verified: tokenSource config overrides package font defaults

---

## Design Decisions

### Decision 1: Pure YAML Over Markdown Hybrid

**Options Considered**: (A) Pure structured YAML, (B) YAML frontmatter + markdown body, (C) Markdown with structured headings
**Decision**: Pure structured YAML
**Rationale**: Consistent with every other Application MCP data source. No markdown parsing needed. Deterministic field extraction. Prose lives as string values within YAML.
**Trade-offs**: Slightly less pleasant to author long-form prose. Mitigated by: content is relatively short (~500 words of prose total).

### Decision 2: Single File Over Multiple Files

**Options Considered**: (A) Single `design-philosophy.yaml`, (B) Split into `rules.yaml`, `guidance.yaml`, `philosophy.yaml`, `color-strategy.yaml`
**Decision**: Single file
**Rationale**: Simpler indexing (one file watch, one parse). Content is cohesive and cross-referential. Total size is small (~200 lines YAML). Split adds complexity without proportional benefit.
**Trade-offs**: Larger diffs when any section changes. Acceptable given file size.

### Decision 3: Adapt References Over Fork Impeccable

**Options Considered**: (A) Fork Impeccable and modify source, (B) Adapt reference files only, (C) Build from scratch inspired by Impeccable
**Decision**: Adapt reference files only (B)
**Rationale**: Preserves ability to pull upstream Impeccable updates for domain references. Minimizes maintenance surface. The adaptation is at the context layer (2 files rewritten, 1 mechanism replaced), not the knowledge layer (7 domain references unchanged).
**Trade-offs**: Dependent on Impeccable's reference structure remaining stable. Mitigated by: Apache 2.0 license allows vendoring if needed.
