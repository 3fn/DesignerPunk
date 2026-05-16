# Design Language Context for AI-Driven Interface Creation

**Date**: 2026-05-16
**Purpose**: Enable AI agents to create interfaces that are system-aware from the first pixel by serving DesignerPunk's design language as queryable context
**Organization**: spec-guide
**Scope**: 107-design-language-context
**Status**: Design outline — pending review

---

## Problem Statement

DesignerPunk's ecosystem enables AI agents to *maintain* and *evolve* the design system (tokens, components, governance). It also enables agents to *select* components and *validate* assemblies for product screens. But when an AI agent needs to *create* a new interface (a webpage, a presentation, a product screen), it has no structured access to DesignerPunk's design language: the color philosophy, typography decisions, spacing rhythm, brand voice, and aesthetic principles that make something look and feel like DesignerPunk.

Today, tools like Impeccable (Kiro skill for production-grade frontend design) expect design context via static files (PRODUCT.md, DESIGN.md). This means:
- Design language lives in files that drift from the source of truth
- Every new project requires manually writing context docs
- No connection between the token system's mathematical precision and the design tool's aesthetic decisions
- The "shared precision" thesis breaks down at the creation layer

**The gap:** DesignerPunk can tell an agent "use space150" (Rosetta) and "use Button-CTA" (Stemma), but it cannot tell an agent "this brand uses committed color strategy with OKLCH warm tints, varied spacing rhythm over uniform padding, and typography hierarchy through scale contrast at 1.25 ratio." That aesthetic layer is undocumented in machine-queryable form.

---

## Objectives

1. **Audit what design creation tools need**: Understand what PRODUCT.md and DESIGN.md provide to Impeccable, and what equivalent context DesignerPunk should serve.

2. **Assess the Product MCP's current capabilities**: Determine what the Product MCP already provides and what gaps exist for serving design language context.

3. **Design the context delivery mechanism**: Define how DesignerPunk's design language gets served to creation tools (Product MCP evolution, new tools, or alternative approach).

4. **Create a designer agent**: Define a new agent whose domain is interface creation informed by DesignerPunk's design language, consuming the Product MCP and Impeccable's skill system.

5. **Adapt Impeccable's skill for DesignerPunk consumption**: Modify or extend Impeccable's reference system to query DesignerPunk's MCP infrastructure rather than relying solely on static files.

---

## Scope

### In Scope

- Audit of Impeccable's PRODUCT.md and DESIGN.md schemas (what they expect, what they provide)
- Audit of Impeccable's reasoning and execution model (how it uses context to make design decisions)
- Gap analysis between Product MCP's current capabilities and design language context needs
- Design of Product MCP extensions (new tools, new data models) for design language serving
- Designer agent definition (prompt, domain boundaries, MCP access, relationship to existing agents)
- Adaptation of Impeccable's skill to leverage Product MCP queries

### Out of Scope

- Implementing the full Product MCP extensions (design outline + gap analysis first)
- Modifying Impeccable's core source code (we adapt the skill layer, not the tool)
- Critique/validation integration (that's Spec 100's domain)
- iOS/Android interface creation (web-first, cross-platform later)
- Replacing Impeccable entirely (we leverage it, not compete with it)

---

## Relationship to Spec 100

**Spec 100** (Design Critique Integration): "Is this implementation *good*?" — evaluates output quality after creation.

**This spec** (107): "Create something that's *correct from the start*" — provides design language context during creation.

These are complementary:
- Spec 107 enables creation → Spec 100 enables validation → together they form the full create-validate-iterate loop
- Spec 107's Product MCP extensions may also serve Spec 100's system-aware filtering needs
- A designer agent (107) would naturally consume critique capabilities (100) as part of its workflow

---

## Investigation Plan

### Step 1: Audit PRODUCT.md and DESIGN.md

**Goal:** Understand what Impeccable expects as design context input.

**Questions:**
- What fields does PRODUCT.md require? (users, brand, tone, anti-references, strategic principles)
- What fields does DESIGN.md require? (colors, typography, elevation, components)
- How does Impeccable use these during design decisions?
- What's the "register" concept (brand vs product) and how does it affect output?
- What are the reference files (brand.md, product.md, craft.md) and what do they contain?

**Artifacts:** Documented schema of what Impeccable consumes.

### Step 2: Contrast with Product MCP

**Goal:** Determine what the Product MCP currently provides and where the gaps are.

**Current Product MCP capabilities:**
- `get_product_overview` — product context, configuration, principles
- `find_screens` — screen lookup by component/token/domain object usage
- `list_experience_map` — experience map with referenced components
- `get_screen_spec` — full screen spec (UI tree, state model, accessibility)
- `get_screen_state_model` — state model only
- `get_product_component` — one-off component details
- `get_domain_object` — domain object definition
- `get_product_health` — health status

**Questions:**
- Does `get_product_overview` already serve any design language context?
- What's in the "principles" data? Is it aesthetic or purely functional?
- What would need to be added to serve color strategy, typography decisions, spacing philosophy?
- Should design language be a new tool or an extension of existing tools?

**Artifacts:** Gap analysis document mapping Impeccable's needs to Product MCP's current state.

### Step 3: Assess Impeccable's Reasoning Model

**Goal:** Understand how Impeccable uses context to make design decisions, so we know what to serve and in what format.

**Questions:**
- How does the `craft` command flow work? (shape → confirm → build)
- How do the "shared design laws" interact with project-specific context?
- How does the register system (brand vs product) change the output?
- What's the "AI slop test" and how does it use context to avoid generic output?
- How do the reference files (brand.md, product.md) modify behavior?
- What's the "category-reflex check" and how does it prevent training-data defaults?

**Artifacts:** Documented reasoning model showing where DesignerPunk context would plug in.

### Step 4: Define MCP Extensions + Design Philosophy Data Model

> **Updated 2026-05-16**: Revised based on Steps 1-3 investigation findings. Original scope was "Define Product MCP Extensions" focused on Product MCP only. Investigation revealed the split should be across both MCPs, and that a design philosophy authoring step is needed before MCPs can serve the content.

**Goal:** Design the new tools/data models needed to serve design language context across both Application MCP and Product MCP.

**Application MCP extensions (system-level design language):**
- `get_design_philosophy` — creative north star, aesthetic philosophy, key characteristics
- `get_design_rules` — named rules as structured data (name, constraint, rationale)
- `get_design_guidance` — do's and don'ts as queryable positive/negative directives
- `get_color_strategy` — color strategy vocabulary (Restrained/Committed/Full/Drenched) with usage guidance

**Product MCP extensions (product-level brand application):**
- Extend `get_product_overview` with: register field, brand personality, anti-references, users/context
- New `get_brand_context` — voice, tone, 3-word personality, emotional goals, anti-references

**Source data format:**
- Design philosophy content must be *authored* before it can be served (see Step 4.5)
- Named rules: new YAML file (`design-rules.yaml`) in a location both MCPs can index
- Color strategy: extension of existing color token family documentation
- Brand context: extension of Product MCP's `overview.yaml` schema

**Conflict resolution hierarchy (DesignerPunk wins):**
- DesignerPunk token values override Impeccable's taste opinions
- DesignerPunk behavioral contracts override Impeccable's component suggestions
- Impeccable's domain knowledge applies where DesignerPunk is silent (general design principles)
- Impeccable's anti-slop mechanisms apply universally (they prevent generic output, not DesignerPunk-specific output)

**Artifacts:** Tool specifications with input/output schemas, source data format definitions, conflict resolution rules.

### Step 4.5: Author Design Philosophy

> **Added 2026-05-16**: Investigation revealed that the "design philosophy" content doesn't exist yet in any structured form. This is a creative/governance task that must precede MCP implementation.

**Goal:** Articulate DesignerPunk's aesthetic philosophy, named rules, and do's/don'ts in structured, queryable form.

**What needs to be authored:**
- Creative north star (one-line aesthetic direction)
- Aesthetic philosophy (2-3 paragraphs: personality, density, what the system rejects)
- Named design rules (5-10 memorable, enforceable constraints with rationale)
- Color strategy guidance (when to use Restrained vs Committed vs Full vs Drenched)
- Do's and Don'ts (explicit positive/negative visual guidance, 10-15 items each)
- Register-aware behavior notes (how guidance changes for brand vs product surfaces)

**Who authors this:**
- Peter (primary): taste, intent, aesthetic direction
- Thurgood (structure): governance format, consistency with existing steering patterns
- Ada (input): token philosophy, mathematical relationship principles
- Leonardo (input): application philosophy, how this informs screen specs

**Starting point:** The `sample-DESIGN.md` produced during investigation is a first draft. Its prose sections (Overview, Named Rules, Do's and Don'ts) contain the initial articulation.

**Artifacts:** Structured design philosophy document (likely a new steering doc or YAML + markdown hybrid).

### Step 5: Leonardo Enhancement + Skill Adaptation

> **Updated 2026-05-16**: Revised based on investigation findings and Decision 1 (enhance Leonardo, not a new agent). Original scope was "Designer Agent + Skill Adaptation" assuming a new 9th agent.

**Goal:** Enhance Leonardo's capabilities with design creation vocabulary and adapt Impeccable's skill for DesignerPunk consumption.

**Leonardo prompt enhancements:**
- Design philosophy awareness (query `get_design_philosophy` during screen spec work)
- Gate system for visual direction (shape → confirm → direction → confirm → build)
- Color strategy vocabulary (declare strategy per screen/surface)
- Register-aware behavior (brand vs product surfaces produce different guidance)
- Anti-slop awareness (category-reflex checks internalized)

**Impeccable reference adaptation:**

| Reference | Action | Rationale |
|-----------|--------|-----------|
| brand.md | Adapt | Rewrite for DesignerPunk's brand values (electric, mathematical, punk) |
| product.md | Adapt | Rewrite for DesignerPunk's product register (system fonts OK, consistency over surprise) |
| typography.md | Keep | Universal domain knowledge, filtered by DesignerPunk's font decisions (Figtree, CommitMono) |
| color-and-contrast.md | Keep | Universal domain knowledge, OKLCH adoption aligns with this reference |
| spatial-design.md | Keep | Universal domain knowledge, filtered by 8px grid (override 4pt recommendation) |
| motion-design.md | Keep | Universal domain knowledge, filtered by DesignerPunk's motion tokens (spring on iOS) |
| interaction-design.md | Keep | Universal domain knowledge |
| responsive-design.md | Keep | Universal domain knowledge |
| ux-writing.md | Keep | Universal domain knowledge |
| craft.md | Merge | Keep gate structure, add DesignerPunk-specific steps (assembly validation, contract awareness) |
| shape.md | Merge | Keep interview structure, add MCP-informed pre-filling of answers |
| SKILL.md setup | Replace | MCP queries instead of load-context.mjs |

**Integration with Leonardo's existing MCP access:**
- Leonardo already has Application MCP (components, tokens) and Product MCP (screens, domain objects)
- The skill adds: design philosophy queries, named rules checks, color strategy declaration
- No new MCP access needed; existing access is sufficient

**How Track 2 revisions feed in:**
- Figtree/CommitMono: adapted brand.md and product.md references reflect the new font choices
- OKLCH: color-and-contrast.md reference aligns naturally (it already recommends OKLCH)
- Black/white revision: adapted references and named rules reflect the updated palette philosophy

**Artifacts:** Updated Leonardo prompt, adapted reference files, skill integration plan.

---

## Risks and Counter-Arguments

### Risk: Over-engineering for a simple problem

**Concern:** Maybe PRODUCT.md and DESIGN.md are fine as static files. Not everything needs to be an MCP query.

**Counter:** Static files drift. The moment your token system evolves (new color, new spacing tier), the static files are stale. MCP queries are always current because they read from the source of truth. But this is a real tension — the investigation should determine whether the drift problem is actually painful or theoretical.

> **Investigation finding (2026-05-16):** The drift problem is real but the immediate solution is hybrid: manual files for the presentation project, MCP evolution for the long-term. The MCP work is justified by the philosophy layer gap, not just the drift problem.

### Risk: Impeccable's model may not be the right abstraction

**Concern:** We're designing around Impeccable's PRODUCT.md/DESIGN.md pattern. What if a better creation tool emerges with a different context model?

**Counter:** The MCP extensions are tool-agnostic. They serve DesignerPunk's design language in a structured format. Impeccable is the first consumer, not the only one. If the MCP serves good data, any tool can consume it.

> **Investigation finding (2026-05-16):** Confirmed. The MCP tools (`get_design_philosophy`, `get_design_rules`, etc.) are generic enough for any consumer. The Impeccable-specific adaptation is in the skill layer, not the MCP layer.

### Risk: New agent adds complexity without clear value

**Concern:** We already have 8 agents. A 9th adds coordination overhead. Could Leonardo or Sparky absorb this capability?

> **Resolved (2026-05-16):** Decision made to enhance Leonardo rather than create a new agent. See decisions.md Decision 1.

### Risk: Scope creep from investigation to implementation

**Concern:** Steps 1-3 are research. Steps 4-5 are design. The temptation is to start building during investigation.

**Mitigation:** Explicit gate between step 3 and step 4. Steps 1-3 produce findings. Peter reviews findings. Then decides whether to proceed to steps 4-5 or pause.

> **Gate passed (2026-05-16):** Investigation complete. Findings support proceeding. Steps 4-5 deferred until after Super.com presentation.

### Risk: Impeccable opinions conflict with DesignerPunk decisions (NEW)

> **Added 2026-05-16**: Identified during investigation.

**Concern:** Impeccable recommends 4pt base (DesignerPunk uses 8px), bans Inter (DesignerPunk is transitioning away anyway), says "never pure black" (DesignerPunk has black500 = rgba(0,0,0,1)), bans bounce/elastic easing (DesignerPunk iOS uses spring animations).

**Mitigation:** Conflict resolution hierarchy defined: DesignerPunk token system wins when there's a conflict. Impeccable's guidance applies only where DesignerPunk is silent. Track 2 revisions (font change, black/white revision) will reduce conflicts naturally.

---

## Decision Gate

> **Updated 2026-05-16**: Gate passed. Proceeding to Steps 4-5 post-presentation.

~~After completing Steps 1-3 (audit + gap analysis + reasoning model assessment):~~

~~**Proceed to Steps 4-5 if:**~~
~~- The gap between what creation tools need and what Product MCP provides is significant and well-defined~~
~~- The adaptation path is clear (not a rewrite of Impeccable)~~
~~- The value proposition is concrete (not theoretical)~~

**Gate result: PROCEED.** All three criteria met. See step-1/2/3-findings.md for evidence. Steps 4-5 scheduled post-presentation.

---

## Open Questions ~~for Review~~

> **Updated 2026-05-16**: Several questions resolved during investigation.

1. ~~Should the designer agent be a system agent (builds the ecosystem) or a product agent (consumes the ecosystem)? Or a hybrid?~~ **Resolved:** No new agent. Leonardo enhanced instead. (Decision 1)
2. Does this spec subsume Spec 100, or do they remain independent with shared infrastructure? **Still open.** Likely independent with shared MCP infrastructure.
3. ~~What's the naming convention for the new agent? (Continuing the namesake tradition)~~ **Resolved:** No new agent needed.
4. Should the design language source data be new YAML files, or derived from existing steering docs and token definitions? **Partially resolved:** New YAML for named rules; authored markdown for philosophy; existing token data served via Application MCP.
5. ~~Is the Product MCP the right home for design language context, or should it live in Application MCP alongside tokens and components?~~ **Resolved:** Split. System-level (philosophy, rules, color strategy) → Application MCP. Product-level (brand, personality, register) → Product MCP. (Step 2 findings)
