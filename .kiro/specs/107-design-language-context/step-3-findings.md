# Step 3 Findings: Impeccable Reasoning Model Assessment

**Date**: 2026-05-16
**Spec**: 107-design-language-context
**Status**: Investigation complete

---

## Executive Summary

Impeccable's reasoning model is a layered context system with explicit gates. Context flows from static files (PRODUCT.md + DESIGN.md) through a register filter (brand/product) into domain references, then through a discovery interview into a design brief, and finally into implementation with iterative visual inspection. The key insight for DesignerPunk integration: MCP queries could replace the static file reads at the context-loading step without changing the downstream reasoning flow. The gates, interviews, and brief structure remain valuable as-is.

---

## The Reasoning Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    Impeccable Reasoning Flow                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. CONTEXT LOAD (load-context.mjs)                             │
│     Read PRODUCT.md → strategic identity                        │
│     Read DESIGN.md → visual system                              │
│     ↓                                                           │
│  2. REGISTER ROUTING                                            │
│     Identify brand vs product → load register reference         │
│     ↓                                                           │
│  3. DISCOVERY INTERVIEW (shape)                                 │
│     Purpose, users, content, direction, scope, constraints      │
│     ↓ [USER GATE: confirm brief]                                │
│  4. VISUAL DIRECTION (if harness supports image gen)            │
│     Generate 2-4 direction probes                               │
│     ↓ [USER GATE: approve direction]                            │
│  5. DOMAIN REFERENCE LOADING                                    │
│     Load relevant references based on brief needs               │
│     ↓                                                           │
│  6. IMPLEMENTATION (craft)                                      │
│     Build to production quality checklist                       │
│     ↓                                                           │
│  7. VISUAL INSPECTION + ITERATION                               │
│     Critique against brief + anti-patterns                      │
│     ↓ [USER GATE: confirm or iterate]                           │
│  8. PRESENT                                                     │
│     Show result, explain decisions, ask for feedback             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Where MCP Queries Replace File Reads

### Step 1: Context Load (Primary Integration Point)

**Current:** `load-context.mjs` reads PRODUCT.md and DESIGN.md from disk, outputs JSON.

**With DesignerPunk MCP:**

| Current File Read | MCP Query Replacement |
|-------------------|----------------------|
| PRODUCT.md → register | Product MCP: `get_product_overview()` → extract register/theme |
| PRODUCT.md → users | Product MCP: new `get_brand_context()` tool |
| PRODUCT.md → brand personality | Product MCP: new `get_brand_context()` tool |
| PRODUCT.md → anti-references | Product MCP: new `get_brand_context()` tool |
| PRODUCT.md → design principles | Product MCP: `get_product_overview()` → principles |
| DESIGN.md → colors | Application MCP: `search_tokens({ family: "color" })` |
| DESIGN.md → typography | Application MCP: `search_tokens({ family: "typography" })` |
| DESIGN.md → spacing | Application MCP: `search_tokens({ family: "spacing" })` |
| DESIGN.md → rounded | Application MCP: `search_tokens({ family: "radius" })` |
| DESIGN.md → components | Application MCP: `get_component_full()` |
| DESIGN.md → overview/philosophy | New: `get_design_philosophy()` (neither MCP has this) |
| DESIGN.md → named rules | New: `get_design_rules()` (neither MCP has this) |
| DESIGN.md → do's and don'ts | New: `get_design_guidance()` (neither MCP has this) |

**Key insight:** The token data is already queryable and richer than what DESIGN.md provides. The gap is the philosophy/guidance layer that sits above the data.

### Step 2: Register Routing (Minor Adaptation)

**Current:** Read `## Register` field from PRODUCT.md, load brand.md or product.md reference.

**With DesignerPunk MCP:** The register concept maps to surface-type awareness. A Product MCP field (`register: brand | product`) or inference from the screen spec's context would determine which behavioral defaults apply.

**Adaptation needed:** Minimal. The register references (brand.md, product.md) contain Impeccable's opinions about typography, color, layout, and motion per register. These could be:
- (A) Kept as-is (Impeccable's opinions, filtered by DesignerPunk's token system)
- (B) Replaced with DesignerPunk-specific register guidance (new reference files)
- (C) Merged (Impeccable's structure + DesignerPunk's values)

### Step 3: Discovery Interview (No Change Needed)

**Current:** Interactive interview asking about purpose, users, content, direction, scope.

**With DesignerPunk MCP:** The interview remains valuable. It's task-specific context that no MCP can pre-serve. The only enhancement: the agent could pre-fill answers from Product MCP data (screen specs, domain objects, experience map) to reduce interview length.

**Example:** Instead of asking "What content does this feature display?", the agent queries `get_screen_spec("dashboard")` and says "Based on the screen spec, this displays [X, Y, Z]. Confirm or override?"

### Step 5: Domain Reference Loading (Partial Replacement)

**Current:** Load typography.md, spatial-design.md, color-and-contrast.md, etc. based on brief needs.

**With DesignerPunk MCP:** Some domain knowledge is already encoded in the token system:
- Spatial design → semantic spacing tokens encode the philosophy (grouped/related/separated/sectioned)
- Color → token formulas encode the mathematical relationships
- Typography → token hierarchy encodes the scale

But Impeccable's domain references contain *application guidance* beyond what tokens encode:
- "Vary spacing for rhythm" (spatial-design.md)
- "Reduce chroma as lightness approaches extremes" (color-and-contrast.md)
- "Use expo-out easing, never bounce" (motion-design.md)

**This guidance layer is the gap.** Tokens say "what values exist." Domain references say "how to apply them well."

### Step 6: Implementation (No Change to Flow)

**Current:** Build to production quality checklist (real content, semantic HTML, deliberate spacing, intentional typography, state coverage, interaction quality, motion, maintainability).

**With DesignerPunk MCP:** The implementation step would additionally:
- Use `validate_assembly()` to check component composition
- Use `check_composition()` for parent-child rules
- Use `get_prop_guidance()` for component selection decisions
- Reference behavioral contracts for state coverage requirements

This is additive, not replacement. Impeccable's production bar checklist remains valid.

---

## The Gate System (Critical for Integration)

Impeccable's explicit user gates are a design pattern worth preserving:

| Gate | Purpose | DesignerPunk Equivalent |
|------|---------|------------------------|
| Shape brief confirmed | Prevent premature implementation | Leonardo's screen spec approval |
| Direction questions answered | Force visual decisions before code | New (no current equivalent) |
| Palette confirmed | Lock color before building | New (no current equivalent) |
| Mock direction approved | Visual contract before code | New (no current equivalent) |

**Insight:** DesignerPunk's current workflow (spec → feedback → implement) has gates at the spec level but not at the visual direction level. Impeccable's gate system could inform how the designer agent (or skill) operates within the DesignerPunk ecosystem.

---

## The Anti-Slop Reasoning (Novel Mechanism)

Impeccable's anti-slop reasoning is a two-pass check:

**First-order reflex check:** "Can someone guess the theme + palette from the category alone?"
- Healthcare → white + teal? Reject.
- Finance → navy + gold? Reject.
- AI tool → dark + purple? Reject.

**Second-order reflex check:** "Can someone guess the aesthetic family from category + anti-references?"
- AI tool that's NOT dark-purple → editorial-typographic? Reject.
- Fintech that's NOT navy-gold → terminal-native dark? Reject.

**How this maps to DesignerPunk:** The system currently prevents *incorrect* usage (wrong token, wrong component). It does NOT prevent *generic* usage (technically correct but aesthetically undifferentiated). An anti-slop mechanism would be a Civitas-level capability: governance that ensures distinctiveness, not just correctness.

**Implementation path:** This could be a validation rule in the critique layer (Spec 100) rather than the creation layer (this spec). During creation, the designer agent would internalize the anti-slop principles. During validation, the critique tool would flag generic output.

---

## Context Consumption Patterns

### Pattern 1: Assert-Then-Confirm

Impeccable's interview style: when context makes one answer obvious, assert it and ask for confirmation rather than presenting a menu.

**Current:** "This reads as Restrained. Confirm?"
**With MCP:** "Based on your token system (437 tokens, 9 hue families, dual themes), this reads as Full Palette strategy. Confirm?"

The MCP data makes assertions more informed and specific.

### Pattern 2: Progressive Depth

Impeccable loads context in layers:
1. PRODUCT.md (always, lightweight)
2. DESIGN.md (always, medium weight)
3. Register reference (always, based on register)
4. Domain references (selectively, based on brief needs)
5. Command reference (selectively, based on command)

**With MCP:** This maps naturally to progressive disclosure:
1. `get_product_overview()` (lightweight)
2. `search_tokens({ family: "spacing" })` + `search_tokens({ family: "color" })` (selective)
3. `get_design_philosophy()` (new, medium weight)
4. `get_component_full("Button-CTA")` (on-demand, when needed)

### Pattern 3: Named Rules as Constraints

Impeccable's named rules ("The One Voice Rule", "The Flat-By-Default Rule") function as memorable constraints that the agent checks against during implementation.

**With MCP:** Named rules could be served as a queryable list:
```
get_design_rules()
→ [
    { name: "The Formula Rule", constraint: "Every value derives from a mathematical relationship" },
    { name: "The Semantic-First Rule", constraint: "Use semantic tokens before primitives" },
    { name: "The Contract Rule", constraint: "Every component behavior is explicit and testable" }
  ]
```

The agent loads these once and checks against them during implementation, same as Impeccable checks its rules.

---

## Adaptation Strategy Summary

### What stays from Impeccable (the reasoning structure):
- Discovery interview flow (shape)
- User gates (confirm before implementing)
- Design brief format (structured artifact guiding implementation)
- Production quality checklist (craft Step 4)
- Visual inspection and iteration (craft Step 5)
- Anti-slop awareness (category-reflex checks)
- Domain reference knowledge (typography, color, spatial, motion, interaction, responsive, UX writing)

### What changes (the context source):
- Static file reads → MCP queries for token data
- PRODUCT.md → Product MCP for brand/strategic context
- DESIGN.md frontmatter → Application MCP for token values
- DESIGN.md prose → New "design philosophy" layer (to be designed)

### What's added (DesignerPunk-specific):
- Component selection via `find_components()` and `get_prop_guidance()`
- Assembly validation via `validate_assembly()`
- Behavioral contract awareness (state coverage from contracts, not just a checklist)
- Mathematical relationship validation (formulas, not just values)
- Cross-platform awareness (web + iOS + Android, not web-only)

### What's genuinely new (neither system has today):
- Design philosophy as a queryable MCP tool
- Named design rules as structured data
- Color strategy classification as a product-level decision
- Register-aware behavior modulation via MCP
- Anti-slop detection as a governance capability

---

## Decision Gate Assessment

**Steps 1-3 are complete.** Findings:

1. The gap is real and well-defined: DesignerPunk has the data but lacks the philosophy/guidance layer
2. The adaptation path is clear: MCP queries replace file reads at the context-loading step; the reasoning flow stays intact
3. The value proposition is concrete: an agent using DesignerPunk's MCP + Impeccable's reasoning would produce system-aware, aesthetically intentional interfaces on first attempt
4. Practice enhancements (OKLCH, color strategy, named rules, register system) are valuable independently of integration

**Recommendation:** Proceed to Steps 4-5 (Product MCP extension design + designer agent/skill definition) as a formal spec. The investigation has produced enough clarity to design the solution with confidence.

However, this is a significant implementation effort (new MCP tools, new data models, new agent or skill adaptation). It should be sequenced after the immediate presentation need is met using the manual PRODUCT.md/DESIGN.md samples.
