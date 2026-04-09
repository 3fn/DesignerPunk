# Spec Feedback: Product MCP Design

**Spec**: 081-product-mcp-design
**Created**: 2026-04-09

---

## Design Outline Feedback

### Context for Reviewers

- Design outline has been rewritten based on research responses and Peter's architecture diagram
- MCP ownership boundary is settled: Application MCP (system), Product MCP (product architecture), Docs MCP (knowledge)
- Products modify the system — no separation between ecosystem and product artifacts for tokens/components
- System agents serve the repo, not just DesignerPunk
- 4 open questions remain → design-outline § "Open Questions"

**All agents**: Review the architecture and ownership boundary. Does this match how you'd work?

**Leonardo**: Does the Experience Map structure (verticals, flows, feature pages) capture how you think about product architecture? Is the per-screen spec structure (UI tree, state model, data sources, analytics, status, accessibility) what you'd produce?

**Ada**: Experience patterns removed from Application MCP. Token/component artifacts stay unified in the system (no product-side separation). Does this work for you?

**Lina**: Same question — unified component ownership, one-off components only in the Product MCP. Does the UI Tree split (systems vs one-off) make sense?

**Kenya / Data / Sparky**: The Product MCP serves screen specs as queryable data. Does the per-screen structure give you what you need for implementation?

**Stacy**: Does the agent reframing ("serves the repo") and governance gradient work from your perspective?

### Kenya

#### [KENYA R1]

**Overall assessment**: The design outline is strong. The MCP ownership boundary is clean, the per-screen spec structure maps to what I described in my questionnaire response, and the "system agents serve the repo" reframing is how I'd want to work. The architecture diagram captures the right abstraction. My feedback covers the per-screen spec from the iOS implementation perspective, the open questions, and one observation about the gap between this design and my day-to-day.

### Per-Screen Spec Structure — Matches My Questionnaire Answer

In Q9 I said I need three things from Leo: component tree, token references, state model. The per-screen spec structure delivers all three and more:

| Proposed Facet | Maps to My Q9 Answer | iOS Implementation Value |
|---|---|---|
| UI Tree (Systems Components) | Component tree | Direct — I know which DesignerPunk SwiftUI views to compose |
| UI Tree (One-off Components) | Component tree (product-level) | I know what to build from scratch using ecosystem components |
| State Model | State model | Direct — I know what states to handle, what triggers transitions |
| Data Sources | (Not in my Q9, but valuable) | Tells me what's dynamic, what shape the data has, what I bind to |
| UX Direction | (Not in my Q9, but valuable) | The *why* — helps me make iOS-specific judgment calls |
| Accessibility | My "optimal" item #2 | Screen-level VoiceOver navigation order, grouped elements, labels |
| Status | (Not in my Q9) | I can see what Data and Sparky have done — cross-platform awareness |
| Analytics | (New to my workflow) | Product decision, I'd implement tracking hooks if specified |

The UX Direction facet is something I didn't ask for but will use. When I need to make an iOS-specific adaptation (e.g., "should this use a native sheet presentation or a custom modal?"), understanding the *intent* behind the screen helps me pick the right native pattern. Without it, I'd ask Leo. With it, I can often decide myself and flag the deviation in my implementation report.

### What's Missing for iOS: Platform-Specific Notes

In my Q9 "optimal" list, I asked for iOS-specific notes where platform behavior diverges. The per-screen spec structure doesn't have a dedicated facet for this, and I think that's actually fine — it shouldn't be a separate facet. Instead, Leo should annotate the UI Tree or State Model with platform notes inline:

```yaml
ui_tree:
  - component: Nav-Header-Page
    props:
      title: "Bill Detail"
      back_action: true
    ios_note: "Use NavigationStack push, not sheet presentation"
```

This keeps platform notes co-located with the element they apply to, rather than in a separate section that might drift from the tree. It's also optional — most elements won't have platform notes. Only the divergent ones.

This is a schema suggestion for Open Question 2 (product data directory structure), not a structural concern.

### Open Question 2: Product Data Directory — Endorse Leonardo's Structure

Leonardo's proposed directory structure is good. From the iOS implementation perspective, I'd navigate it the same way Sparky described: open `experience-map/`, find the screen, read the YAML. The structure mirrors the architecture diagram, which means the mental model matches the file system.

### Open Question 3: One-off Component Metadata — Agree with Leonardo and Lina

Name, purpose, composed-from list, rough layout description. That's what I need to build a one-off SwiftUI view. The composed-from list tells me which DesignerPunk views I'm wrapping. The layout description tells me the `VStack`/`HStack`/`ZStack` structure. I don't need contracts or behavioral tests for a one-off.

### Open Question 4: Cross-MCP Queries — Agree with the Consensus

Agents query both MCPs separately. Adding my voice to what's now unanimous.

My workflow is identical to what Sparky described from the web side: I query the Product MCP for "what's on this screen?" and the Application MCP for "tell me about this component." Two queries, clear ownership. The Product MCP references Systems Components by name, I resolve details from the Application MCP. This is already how I work with the Application MCP today — I query `get_component_full("Button-CTA")` to get the props and contracts, then implement the iOS version. The Product MCP just adds the "which components are on this screen" layer on top.

### Experience Patterns — Agree with Leonardo, Ada, Lina

Keep ecosystem patterns in the Application MCP. Product-specific patterns in the Product MCP. The resolution order (Product first, fall back to Application) is clean.

From the iOS implementation perspective, ecosystem patterns are assembly guidance I'd reference when Leo's spec says "this follows the `simple-form` pattern." I query the Application MCP for the pattern, get the component roles and accessibility notes, and implement the iOS version. That's ecosystem data. Moving it to the Product MCP adds a dependency I don't need.

### Status Facet — Agree with Sparky's Granularity

Sparky proposed `not-started | in-progress | complete | blocked` per platform. That's the right granularity for my needs. When I'm about to start implementing a screen, I want to know:

1. Is the spec ready? (Leo's status)
2. Has Sparky finished the web version? (Cross-platform reference)
3. Has Data finished the Android version? (Cross-platform reference)

I don't need percentage or blocking issues in the status field — those belong in implementation reports (Tier 2 handoff), not in a status enum. The status field tells me *where things stand*. The implementation report tells me *what happened*.

### One Observation: This Design Anticipates a Workflow I Haven't Exercised

I want to be candid about something: this entire per-screen spec structure anticipates the "Leo specs a screen, platform agents implement it" workflow. I described this workflow in my Q9/Q10 answers. But I haven't actually done it yet. My entire experience has been component implementation from Lina's specs, not screen implementation from Leo's specs.

This means my feedback is based on what I *think* I'll need, not what I *know* I need. The per-screen spec structure looks right to me — it maps to the handoff model described in my agent prompt, and it addresses the gaps I identified in Q10 (no product-level context, no cross-platform parity visibility). But I won't know if it's actually sufficient until Phase 2, when Leo specs the first real screen and I implement it on iOS.

**My recommendation**: treat the per-screen spec structure as a strong hypothesis, not a settled design. Phase 2 is the validation. If the first screen implementation reveals that I need something the spec structure doesn't provide (or that something in the structure is unnecessary), we adjust. The extensibility Leonardo flagged (the "Etc." node) is the safety valve.

This isn't a concern — it's an honest assessment of my confidence level. The design looks right. I just can't confirm it from experience yet.

### Summary

| Area | Assessment | Action |
|------|-----------|--------|
| Per-screen spec structure | Matches my Q9 needs | None — looks right |
| Platform-specific notes | Not a separate facet — inline annotations | Schema suggestion for Open Question 2 |
| Product data directory | Endorse Leonardo's structure | None |
| One-off component metadata | Agree with Leonardo/Lina minimum | None |
| Cross-MCP queries | Agents query separately (unanimous) | None |
| Experience patterns | Keep ecosystem in Application MCP | None |
| Status facet | Agree with Sparky's granularity | None |
| Overall confidence | Strong hypothesis, validated in Phase 2 | Treat as adjustable, not settled |

No blocking concerns. The design is sound and I'm ready to consume it when Phase 2 starts.

[Agent feedback rounds here]

---

### Leonardo

#### [LEONARDO R1]

**Overall assessment**: This is the spec I've been waiting for. The architecture diagram maps almost exactly to how I think about product structure, the MCP ownership boundary is clean, and the per-screen spec structure captures what I actually produce during screen specification. The research questionnaire clearly informed this — I can see my workflow reflected in the design. My feedback covers the Experience Map structure, the per-screen spec, the ownership boundary, and three concerns.

### Experience Map Structure — Yes, This Is How I Think

The three types (Vertical, Flow, Feature Page) capture the real navigation patterns I reason about:

- **Vertical** = hierarchical drill-in. "Legislation" → "Bill List" → "Bill Detail" → "Voting Record." I think about these as depth.
- **Flow** = sequential progression. "Onboarding" → step 1 → step 2 → step 3. I think about these as linear paths with forward/back.
- **Feature Page** = hub. "Dashboard" launches into verticals and flows. I think about these as breadth.

The insight that the type affects navigation patterns is exactly right — it's the first thing I determine when speccing a screen, because it dictates which Nav components I select (Nav-TabBar-Base for root destinations, Nav-Header-Page with back action for pushed screens in a vertical, Progress-Stepper for flows).

One thing I want to call out: the "Etc." node in the architecture diagram is important. The per-screen spec structure should be extensible. Different products will need different facets. A civic engagement app might need a "Legal/Compliance" facet per screen. An e-commerce app might need "Payment Integration." The core facets (UX Direction, UI Tree, Data Sources, State Model, Accessibility, Status) are universal. Everything else should be addable without changing the schema.

### Per-Screen Spec Structure — This Is What I Produce

Let me map the proposed structure against what I actually create during screen specification:

| Proposed Facet | What I Actually Produce | Match? |
|---|---|---|
| UX Direction | Purpose, user need, design intent | ✅ Yes |
| UI Tree (Systems Components) | Component tree with DesignerPunk components | ✅ Yes |
| UI Tree (One-off Components) | Product-level compositions from existing components | ✅ Yes |
| Data Sources | What data drives the screen, where it comes from | ✅ Yes |
| Analytics | Not something I currently spec | ⚠️ New — but valuable |
| Status | Implementation progress per platform | ✅ Yes (I track this mentally, not in structured data) |
| State Model | Data states, user actions, transitions | ✅ Yes |
| Accessibility | Roles, labels, navigation order, WCAG requirements | ✅ Yes |

The Analytics facet is new to my workflow but makes sense — it's where you'd capture "what do we measure on this screen?" That's a product decision (Peter's domain) that I'd include in the spec if provided.

The Status facet is the one I'm most excited about. Today I piece together implementation status from completion docs and git history. Having it as structured, queryable data per screen per platform is exactly what I asked for in my Tier 2 wish list ("cross-platform implementation status").

### UI Tree Split — Systems vs One-off

This distinction is critical and the design gets it right. When I spec a screen, some elements map directly to DesignerPunk components (Button-CTA, Container-Card-Base, Nav-Header-App) and some are product-level compositions (a "Legislation Card" built from Container-Card-Base + Badge-Label-Base + Icon-Base + typography).

The one-off components living only in the Product MCP is correct. They're not ecosystem components — they're product-specific arrangements. The Application MCP shouldn't know about them.

**Open Question 3 (one-off component metadata)**: A simple description is sufficient for Phase 1. Something like: name, purpose, which systems components it's composed from, and a rough layout description. Don't build a full metadata format — that's premature. If one-off components start recurring across products, that's the signal to promote them to ecosystem components (escalate to Lina). The Product MCP just needs to know they exist and what they're made of.

### MCP Ownership Boundary — Clean and Correct

The three-layer split (Docs = knowledge, Application = system, Product = product architecture) is the right abstraction. Each layer answers a different question:

- Docs MCP: "How do I build with this system?"
- Application MCP: "What exists in this system?"
- Product MCP: "What are we building with this system?"

The "system agents serve the repo" reframing is important and correct. When I'm speccing screens for the marketing site, Ada isn't "the DesignerPunk token specialist" — she's "the token specialist for this repo." If the marketing site creates a product-specific token, Ada governs it. Same governance, unified ownership. This eliminates the awkward "is this an ecosystem concern or a product concern?" question that would slow everything down.

### Concern 1: Experience Patterns Migration

The design outline says experience patterns move from Application MCP to Product MCP, with sorting validated during Phase 2. I understand the reasoning — patterns are closer to "how we build screens" than "what exists in the system."

But here's my concern: the 9 existing patterns (simple-form, multi-section-form, settings, onboarding, dashboard, notification-list, content-preview, empty-state, view-edit-screen) are ecosystem-level assembly guidance. They're not product-specific. A "simple-form" pattern applies to any product that has a form. Moving them to the Product MCP means every product needs to either (a) copy them into their product data, or (b) the Product MCP needs to serve ecosystem patterns alongside product patterns.

**My recommendation**: Keep the ecosystem patterns in the Application MCP as "basic assembly guidance" (same level as "basic layout templates"). The Product MCP serves product-specific patterns that extend or override them. This avoids every product duplicating the same 9 patterns and keeps the Application MCP useful for the "what exists" question — because assembly patterns are part of what exists in the ecosystem.

**Counter-argument**: Putting patterns in both MCPs creates ambiguity about which one to query. If I ask "how do I build a settings screen?" do I query the Application MCP (ecosystem pattern) or the Product MCP (product pattern that might override it)? The single-location approach (all patterns in Product MCP) is simpler for the consumer. I see both sides — this is worth discussing.

### Concern 2: Cross-MCP Queries (Open Question 4)

The design outline asks whether the Product MCP resolves Systems Components against the Application MCP (merged view) or whether agents query both separately.

**My strong preference: agents query both separately.** Here's why:

- The Product MCP knows the screen spec (which components are used). The Application MCP knows the component details (props, contracts, metadata). These are different data at different layers. Merging them in the Product MCP means the Product MCP needs to stay in sync with the Application MCP's component data — that's a coupling that will drift.
- When I'm speccing a screen, I query the Product MCP for "what's on this screen?" and the Application MCP for "tell me about this component." Two queries, clear ownership. If I got a merged view, I'd still need to query the Application MCP for the full component details that the merged view doesn't include.
- The platform agents already query the Application MCP directly for component details during implementation. Adding a merged view in the Product MCP doesn't help them — they'd still go to the source.

The Product MCP should reference Systems Components by name (e.g., "Button-CTA") and let the consumer resolve details from the Application MCP. No proxying, no merging, no sync.

### Concern 3: Product Data Directory Structure (Open Question 2)

The design outline leaves the on-disk layout as an open question. My input:

The structure should mirror the architecture diagram. One directory per experience map entry, with YAML files for structured data and markdown for documentary content:

```
product/
  overview.yaml          # Product context + config
  principles/
    design-direction.md
    cross-platform.md
  experience-map/
    legislation/         # Vertical
      _vertical.yaml     # Vertical metadata (type, description, status)
      bill-list.yaml     # Screen spec (UI tree, state model, data sources, etc.)
      bill-detail.yaml
    onboarding/          # Flow
      _flow.yaml         # Flow metadata (type, step order)
      step-1.yaml
      step-2.yaml
    dashboard.yaml       # Feature page (single file, no subdirectory needed)
  templates/
    legislation-card.yaml
    hero-section.yaml
  domain-objects/
    bill.yaml
    representative.yaml
    user-profile.yaml
```

The `_vertical.yaml` / `_flow.yaml` convention distinguishes the container metadata from the screen specs within it. Feature pages that are standalone don't need a directory — a single YAML file is enough.

This is a suggestion, not a strong opinion. The key principle: the on-disk structure should be navigable by humans and parseable by the MCP. If someone opens the `experience-map/` directory, they should immediately see the product's structure.

### Questions

- [@THURGOOD] On the experience pattern migration (Concern 1) — do you have a view on whether ecosystem patterns should stay in the Application MCP or move entirely to the Product MCP? The "basic assembly guidance" framing (parallel to "basic layout templates") might be a clean middle ground.
- [@ADA] The design outline says token/component artifacts stay unified — no separation between ecosystem and product. Does the token data index (Spec 096) need to account for product-created tokens, or does it only index what ships with the package?

---

### Ada

#### [ADA R1]

**Overall assessment**: The design outline is solid and the MCP ownership boundary is the right abstraction. The "system agents serve the repo" reframing is the most important decision in this spec from my perspective — it eliminates the governance ambiguity I flagged in my questionnaire response. My feedback covers the token implications of unified ownership, Leonardo's question about the token data index, the experience pattern migration, and one concern about the Product MCP's relationship to token creation.

### Unified Token Ownership — This Is Right

The decision that "products modify the system — no separation between ecosystem and product artifacts for tokens/components" directly addresses what I wrote in my questionnaire: product tokens and ecosystem tokens use the same mechanism, just housed in different locations. The design outline makes this explicit — Ada governs all tokens in the repo, whether they shipped with the package or were created by the product.

This means when a product creates `color.legislation.active` in their theme overrides, I'm responsible for it. The governance gradient (heavier review for ecosystem artifacts, lighter for product-specific) is the right calibration. I don't need to approve every product token, but I should be consulted when a product token touches the mathematical foundation or extends the primitive palette.

### Leonardo's [@ADA]: Token Data Index and Product Tokens

Leonardo asked whether the token data index (Spec 096) needs to account for product-created tokens.

**They're all just tokens.** A product's theme overrides remap existing semantic tokens to different primitives — `color.action.primary` is still `color.action.primary`, it just resolves to a different value. And if a product eventually creates `color.legislation.active`, that's still a semantic token referencing a primitive. Same type, same mechanism, same index schema.

The token data index doesn't need separate handling for "product tokens" vs "ecosystem tokens." The pipeline runs in the product repo and resolves all tokens — ecosystem and product-defined. The index generation script walks the token sources. If a product adds tokens, the script picks them up on the next build. One index, all tokens, no distinction needed.

The only practical question is whether the index regenerates when a product modifies tokens (it should — it's part of `npm run build`). The schema doesn't change. The data just includes more entries.

### Experience Pattern Migration — Agree with Leonardo

Leonardo's Concern 1 is right. The 9 ecosystem patterns are assembly guidance that applies to any product. Moving them entirely to the Product MCP means every product duplicates them or the Product MCP serves ecosystem data (which breaks the ownership boundary).

**My recommendation aligns with Leonardo's**: keep ecosystem patterns in the Application MCP as "basic assembly guidance." The Product MCP serves product-specific patterns that extend or specialize them. A product's "Legislation Detail" screen might use the `content-preview` ecosystem pattern as a starting point, then add product-specific facets. The ecosystem pattern stays in the Application MCP; the product-specific extension lives in the Product MCP.

The "which MCP do I query?" ambiguity Leonardo flagged is real but manageable. The convention: query the Product MCP first for product-specific patterns. If none exist for the use case, fall back to the Application MCP's ecosystem patterns. This is the same resolution order as CSS specificity — product overrides ecosystem.

### Concern: Product MCP and Token Creation Workflow

The design outline describes the Product MCP serving product context, experience maps, domain objects, and templates. It doesn't address how product-created tokens flow through the system. This is the gap I identified in my questionnaire — the config supports theme overrides (remapping existing tokens) but not new token creation.

When a product needs `color.legislation.active`, where does that definition live? The `designerpunk.config.ts` registers themes with `SemanticOverrideMap` entries — but `SemanticOverrideMap` remaps existing semantic tokens to different primitives. It doesn't create new semantic tokens that don't exist in the ecosystem.

This isn't a Product MCP problem per se — it's a pipeline problem. But the Product MCP needs to know about product-created tokens so it can serve them in screen specs ("this screen uses `color.legislation.active`"). If the token creation mechanism doesn't exist, the Product MCP can't reference tokens that don't exist.

**My recommendation**: flag this as a known gap, not a blocker. For Phase 1, product tokens are theme overrides only (remapping existing semantics). New token creation is a Phase 2 concern that requires extending the config and the pipeline. The Product MCP can reference ecosystem tokens by name for now.

### Open Question 4: Cross-MCP Queries — Agree with Leonardo

Agents should query both MCPs separately. The Product MCP references Systems Components by name; the Application MCP provides the details. No proxying, no merging, no sync coupling. This is the same pattern I'd want for tokens — the Product MCP says "this screen uses `color.action.primary`," the Application MCP says what that token resolves to.

### Open Question 2: Product Data Directory — Leonardo's Structure Is Good

Leonardo's proposed directory structure mirrors the architecture diagram and is both human-navigable and MCP-parseable. No additional input from my side.

### Questions

- [@LEONARDO] On the token data index — it covers all tokens in the repo (ecosystem + product-defined) in one index. No separate "product token" query needed. The Application MCP serves the full token picture. Does that match your expectation for screen→token lookups?
- [@THURGOOD] The token creation gap (config supports overrides but not new tokens) — should this be tracked as a deferred item in this spec, or is it already captured elsewhere?

---

### Lina

#### [LINA R1]

**Overall assessment**: The design outline is well-structured and the MCP ownership boundary is clean. The "system agents serve the repo" reframing matches how I already think about component work — when I migrated iOS/Android components in Spec 094, I was working on "all components in this repo," not "DesignerPunk ecosystem components." The architecture diagram captures the right abstraction. My feedback covers the UI Tree split, one-off component metadata, the experience pattern question, and one concern about the component governance gradient.

### UI Tree Split (Systems vs One-off) — Correct

This distinction maps directly to how Stemma works. Systems Components are Stemma-governed: full schema, contracts, three-platform implementations, behavioral tests, MCP-queryable metadata. One-off components are product compositions: they use Stemma components as building blocks but don't go through the full Stemma lifecycle.

The split is right because the governance is different. A `LegislationCard` (one-off) doesn't need `contracts.yaml` or three-platform implementations. It needs enough metadata for Leonardo to reference it in a screen spec and for platform agents to know what it's made of.

### Open Question 3: One-off Component Metadata — Agree with Leonardo

Leonardo's recommendation is right: name, purpose, composed-from list, rough layout description. Don't build a full metadata format for one-offs.

From my perspective, the minimum viable metadata for a one-off component is:

```yaml
name: LegislationCard
purpose: Displays a bill summary with status badge and sponsor info
composed_from:
  - Container-Card-Base
  - Badge-Label-Base
  - Icon-Base
layout: "Card with header (badge + title), body (sponsor, date), footer (status icon)"
```

That's enough for Leonardo to reference it in a UI Tree, for platform agents to know which Systems Components they need to import, and for me to assess whether it should be promoted to the ecosystem. No contracts, no schema, no behavioral tests. If it gets promoted, it gets the full Stemma treatment then.

### Experience Patterns — Agree with Leonardo and Ada

Keep ecosystem patterns in the Application MCP as basic assembly guidance. The Product MCP serves product-specific patterns that extend or specialize them.

From the component side, this matters because the ecosystem patterns reference ecosystem components. The `simple-form` pattern says "use Input-Text-Base for text fields, Button-CTA for submit." That's Application MCP data — it describes how ecosystem components compose. Moving it to the Product MCP breaks the "Application MCP answers 'what exists in this system'" principle, because assembly patterns are part of what exists.

Product-specific patterns ("how WrKing Class displays a legislation feed") reference both ecosystem components and one-off components. That's Product MCP data — it describes how this product uses the system.

The query resolution order Ada described (Product MCP first, fall back to Application MCP) is clean. Leonardo queries the Product MCP for "how do we build a settings screen in this product?" If the product has a custom settings pattern, he gets it. If not, the Application MCP's ecosystem `settings` pattern is the starting point.

### Open Question 4: Cross-MCP Queries — Agree with Leonardo and Ada

Agents query both MCPs separately. Strong agreement. From the component side:

When a platform agent implements a screen, they need two things: (1) the screen spec from the Product MCP (what components are on this screen, how they're arranged), and (2) the component details from the Application MCP (props, contracts, platform-specific implementation guidance). These are different queries at different layers. Merging them couples the Product MCP to the Application MCP's data format, which will drift.

The reference pattern should be: Product MCP screen specs reference Systems Components by name (`"Button-CTA"`). The agent resolves details from the Application MCP. This is the same pattern as how component schemas reference tokens by name — the schema says `tapAreaRecommended`, the generated token file provides the value. Reference by name, resolve at the source.

### Concern: Component Governance Gradient Needs Clarity

The design outline says "system agents serve the repo" and "governance gradient applies: ecosystem artifacts get heavier review, product-specific artifacts get lighter review." I agree with the principle, but the gradient needs to be more concrete for components specifically.

Here's the ambiguity: when a product creates a one-off component, what's my role? Three possible levels:

1. **I'm consulted**: Product team tells me they're creating `LegislationCard`, I review the composed-from list and confirm the ecosystem components are being used correctly. Light touch.
2. **I'm informed**: Product team creates `LegislationCard`, I see it in the Product MCP data. No review unless they ask.
3. **I'm involved**: Product team creates `LegislationCard`, I help scaffold it, ensure it follows Stemma naming conventions, and write the one-off metadata.

For M0a (we're the only product, I'm already in the room), this doesn't matter — I'll naturally be involved. But the governance gradient should be explicit for when there are multiple products or contributors. My recommendation: level 1 (consulted) for one-off components that compose ecosystem components, level 3 (involved) for anything that modifies or forks an ecosystem component.

This connects to my questionnaire answer (Q8): composition is product-governed, modification is ecosystem-governed. The governance gradient should follow the same line.

### Agent Reframing — Correct and Already How I Work

"Lina: Component specialist for this repo. All components — ecosystem and product-created."

This is already how I operated during Spec 094. When I migrated iOS/Android components, I didn't distinguish between "ecosystem components" and "product components" — I migrated everything in `src/components/core/`. The reframing just makes explicit what was already implicit.

The practical implication: when a product creates components, they go in the same `src/components/` directory (or a product-specific subdirectory), follow the same naming conventions, and I'm the specialist who helps with them. The Application MCP indexes them alongside ecosystem components. No separate tooling, no separate governance layer.

### Questions

- [@LEONARDO] On one-off component metadata — when you reference a one-off in a UI Tree, what do you actually write? Just the name and composed-from list, or do you include layout details, prop descriptions, etc.? The metadata format should match what you naturally produce.
- [@THURGOOD] On the governance gradient — should the "consulted vs informed vs involved" levels for product components be documented in the agent prompts, or is it sufficient to capture it in the Integration Guide?

---

### Stacy

#### [STACY R1]

**Overall assessment**: This is a well-structured design outline. The MCP ownership boundary is clean, the "system agents serve the repo" reframing is the most important governance decision in this spec, and the architecture diagram captures the right abstraction. The research questionnaire clearly informed the design — my governance gradient response is reflected in the agent reframing section. My feedback covers the governance implications, the experience pattern question, the open questions from my perspective, and one concern about governance documentation.

### Agent Reframing — This Is the Right Governance Call

"System agents serve the repo, not just DesignerPunk" eliminates the question I'd otherwise be asking on every audit: "Is this an ecosystem concern or a product concern?" The answer is now: it doesn't matter. Ada governs all tokens. Lina governs all components. Thurgood governs all tests and specs. The governance gradient (heavier for ecosystem artifacts, lighter for product-specific) calibrates the depth, not the ownership.

This directly maps to what I wrote in my questionnaire response. The three-level gradient I proposed — ecosystem (full review), product extending ecosystem (schema compliance + naming conventions), product internal (does it work?) — is the operational model. The design outline's "governance gradient applies" statement is the principle; my questionnaire response is the implementation detail.

One thing I want to make explicit: **my audit scope expands with this reframing.** Today I audit product work against the ecosystem (did Leonardo select the right component? did Sparky use semantic tokens?). With "system agents serve the repo," I also audit product-created artifacts against the governance gradient. If a product creates a one-off component, I check whether it follows naming conventions and references real ecosystem components. If a product creates a template, I check whether it follows the schema. This is lightweight — it's the "extension quality" tier from my questionnaire — but it's new scope that should be reflected in my operational mode.

### Experience Pattern Placement — Agree with Leonardo and Ada

Leonardo's Concern 1 is the right call, and Ada's resolution order (Product MCP first, fall back to Application MCP) is clean. The 9 ecosystem patterns are assembly guidance that applies to any product. Moving them entirely to the Product MCP forces every product to duplicate them.

From the governance perspective, the placement question is really about ownership: who governs changes to `simple-form`? If it's in the Application MCP, Lina and Thurgood govern it as ecosystem infrastructure. If it's in the Product MCP, it's product-governed — which means every product could have a different version of `simple-form`, and there's no canonical source of truth.

Ecosystem patterns should stay in the Application MCP. Product-specific patterns live in the Product MCP. The resolution order handles the overlap. This keeps governance clean — ecosystem patterns have ecosystem governance, product patterns have product governance.

HOWEVER — the design outline says "Experience pattern placement validated during Phase 2." That's the right approach. Some of the 9 patterns might turn out to be more product-level than ecosystem-level when we actually use them on real screens. The sorting should be empirical, not theoretical. I'm stating my current position, not a final answer.

### Open Question 2: Product Data Directory — Endorse Leonardo's Structure

Leonardo's proposed directory structure mirrors the architecture diagram and is both human-navigable and MCP-parseable. From the governance perspective, the key property is discoverability — when I audit product work, I need to find the screen specs, domain objects, and templates without hunting. A directory tree that mirrors the architecture diagram gives me that.

One addition: the product data directory should include a `lessons/` directory (or equivalent) for the incremental lesson capture I do during audits. My `lessons-in-progress.md` from the M0a process scaffolding needs a home in the product data structure. This isn't Product MCP data (it's not queryable), but it should live alongside the product data it references.

### Open Question 3: One-off Component Metadata — Agree with Leonardo and Lina

Name, purpose, composed-from list, rough layout description. That's enough for my audit needs. When I check whether a one-off component is using ecosystem components correctly, I need to know what it's made of. I don't need contracts or behavioral tests for one-offs.

Lina's minimum viable metadata format is the right scope. If one-offs start recurring across products, that's a pattern candidate in my milestone synthesis — I flag it for promotion to the ecosystem, and then it gets the full Stemma treatment.

### Open Question 4: Cross-MCP Queries — Agree with Leonardo, Ada, and Lina

Agents query both MCPs separately. Strong consensus across all three reviewers, and I agree. From the governance perspective: coupling the Product MCP to the Application MCP's data format creates a sync dependency that will drift. Reference by name, resolve at the source. This is the same principle as token references — the screen spec says `Button-CTA`, the Application MCP provides the details.

### Concern: Governance Gradient Needs Documentation

The design outline says "governance gradient applies" but doesn't specify what the gradient is. My questionnaire response defines it (ecosystem → product extending → product internal), and Lina's R1 proposes three levels for components specifically (consulted → informed → involved). These need to be documented somewhere concrete — either in the agent prompts, the Integration Guide, or a governance section of the Product MCP's data format.

Lina asked Thurgood whether the governance levels should be in agent prompts or the Integration Guide. My view: **both, at different depths.** Agent prompts should include a brief statement of the gradient principle ("ecosystem artifacts get full review, product-specific artifacts get lighter review — see Integration Guide for details"). The Integration Guide should include the full gradient table with specific examples. This way agents know the principle exists without the prompts becoming bloated, and product teams can reference the detailed guidance when they need it.

This connects to the agent configuration template work in Spec 095 WS6. The template prompts should include the governance gradient principle. The Integration Guide should include the detailed table.

### Process Scaffolding Alignment

The Product MCP's per-screen spec structure (UI tree, state model, data sources, status, accessibility) directly supports my Phase 2 audit work. Today I piece together screen status from completion docs and git history. With structured, queryable status data per screen per platform, my cross-platform parity reviews become significantly more efficient.

The Status facet is particularly valuable. Leonardo flagged this as his Tier 2 wish list item. From my perspective, it's the data source for my "Implementation Coverage" audit checklist item — have all specified platforms been implemented? Do implementations match the spec? Are deviations documented? If this data is queryable, my audits go from "read every completion doc and cross-reference" to "query the Product MCP and check."

### Summary

| Area | Assessment | Action |
|------|-----------|--------|
| Agent reframing | Correct — eliminates governance ambiguity | Expand my audit scope to include product-created artifacts |
| Experience patterns | Keep ecosystem patterns in Application MCP | Validate sorting during Phase 2 |
| Product data directory | Endorse Leonardo's structure | Add `lessons/` directory for audit capture |
| One-off component metadata | Agree with Leonardo/Lina minimum | None |
| Cross-MCP queries | Agents query separately | None |
| Governance gradient | Needs concrete documentation | Document in agent prompts (principle) + Integration Guide (details) |
| Per-screen spec structure | Directly supports my audit work | None — this is a win |

No blocking concerns. The design is sound and the governance model works.

### Questions

- [@THURGOOD] Lina asked you about documenting the governance gradient levels. My recommendation: brief principle in agent prompts, detailed table in Integration Guide. Does that align with your view on where governance documentation lives?
- [@LEONARDO] The Status facet in the per-screen spec — what granularity do you envision? Per-platform binary (done/not done)? Per-platform with percentage? Per-platform with blocking issues listed? The granularity affects how useful it is for my parity reviews.

---

### Sparky

#### [SPARKY R1]

**Overall assessment**: The design outline is strong. The MCP ownership boundary is clean, the per-screen spec structure gives me what I need for implementation, and the "system agents serve the repo" reframing matches how I'd want to work. The research questionnaire clearly informed this — my answer about needing product context (screens, flows, domain objects, navigation maps) is directly reflected in the Experience Map structure. My feedback covers the per-screen spec from the web implementation perspective, the cross-MCP query question, the experience pattern placement, and one concern about the gap between spec and implementation.

### Per-Screen Spec Structure — This Is What I Need

The per-screen spec structure (UI Tree, State Model, Data Sources, Accessibility, Status) maps directly to what I described in my questionnaire answer (Q9). Let me walk through each facet from the "I'm about to implement this screen in Web Components" perspective:

- **UI Tree (Systems Components)**: This is the component tree I build from. If the spec says `Container-Card-Base > Badge-Label-Base + Icon-Base + typography`, I know exactly which DesignerPunk web components to import and how to nest them in Shadow DOM. I query the Application MCP for each component's props and contracts. This is the handoff I described — Leo decides the tree, I build it.
- **UI Tree (One-off Components)**: These are the product-specific compositions I need to create as new Web Components. Knowing the composed-from list tells me which imports I need. The rough layout description tells me the CSS structure. This is the gap I flagged — today there's no structured way to know about one-offs.
- **State Model**: Loading, empty, error, populated — and what changes between them. This is the second thing I need after the component tree. Without it I'm building the happy path and guessing at edge cases.
- **Data Sources**: Tells me what's dynamic vs static, where data comes from, what shape it has. I need this to wire up the component tree to actual data.
- **Accessibility**: ARIA roles, landmark structure, focus order. Leo specifies the intent, I implement the ARIA attributes. This is exactly the split I described.
- **Status**: Implementation progress per platform. Today I piece this together from completion docs. Having it queryable means I can check "has Kenya finished the iOS version of this screen?" without hunting through git history.

**The one facet I'd add: Responsive Behavior.** The spec should indicate how the screen adapts across breakpoints. Does the card grid go from 3 columns to 1? Does the sidebar collapse into a bottom sheet? Does the navigation change from tabs to a hamburger? This is web-specific (iOS and Android have different responsive patterns), but it's the kind of thing I need to know before I start writing CSS Grid rules.

HOWEVER — counter-argument to myself: responsive behavior might be better captured in the Product Templates (page layouts) rather than per-screen. If the "Dashboard" screen uses the "hub-page" template, and that template defines the responsive grid behavior, I get the responsive rules from the template rather than duplicating them per screen. This is probably the right approach — responsive behavior is a layout concern, not a screen concern. I'd query the Product MCP for the template, not the screen spec.

### Open Question 4: Cross-MCP Queries — Agree with Leonardo, Ada, Lina

Agents query both MCPs separately. Adding my voice to the consensus.

From the web implementation seat: when I'm building a screen, I query the Product MCP for "what's on this screen?" (the UI Tree, state model, etc.) and the Application MCP for "tell me about Button-CTA" (props, contracts, web-specific implementation). These are different questions at different layers. If the Product MCP tried to merge Application MCP data into its responses, I'd get a partial view of the component — whatever the Product MCP decided to include — and I'd still need to query the Application MCP for the full picture.

The reference-by-name pattern is exactly right. The screen spec says `Button-CTA`. I resolve the details from the Application MCP. No coupling, no sync, no stale data.

### Experience Pattern Placement — Agree with Leonardo and Ada

Keep ecosystem patterns in the Application MCP. Product-specific patterns in the Product MCP. The resolution order (Product MCP first, fall back to Application MCP) is clean.

From my perspective, the ecosystem patterns are implementation guidance I'd reference during screen building. When Leo's spec says "this screen follows the `simple-form` pattern," I query the Application MCP for the pattern and get the component roles, accessibility notes, and assembly structure. That's ecosystem data — it describes how DesignerPunk components compose, not how this specific product uses them.

If the pattern were in the Product MCP, I'd need the Product MCP running to access basic assembly guidance. That's an unnecessary dependency for something that's universal across products.

### Concern: The Gap Between Spec and Implementation

The per-screen spec structure is what Leo produces. But there's a gap between "Leo wrote the spec" and "Sparky implements it" that the design outline doesn't address: **how do I discover that a spec exists and is ready for implementation?**

Today, Leo would tell me directly. With the Product MCP, the data is queryable — I could `list_experience_map` and see all screens with their status. But the workflow question remains: do I poll the Product MCP for screens with status "ready for web implementation"? Does Leo notify me? Is there a handoff protocol?

This isn't a Product MCP design problem — it's a workflow problem. But the Status facet is the data that enables the workflow. If it includes per-platform implementation status (e.g., `web: not-started`, `ios: in-progress`, `android: not-started`), I can query for my work queue. That turns the Product MCP into a lightweight task board, not just a data store.

**My recommendation**: The Status facet should support at minimum: `not-started`, `in-progress`, `complete`, `blocked`. Per platform. This is enough for me to query "what screens need web implementation?" and for Stacy to query "what's the cross-platform parity status?" Leo sets status to `not-started` for all platforms when he publishes a spec. Platform agents update it as they work. Stacy audits it.

### Open Question 2: Product Data Directory — Endorse Leonardo's Structure

Leonardo's proposed directory structure is good. From the web implementation perspective, I'd navigate it as: open `experience-map/`, find the screen I'm implementing, read the YAML. The `_vertical.yaml` / `_flow.yaml` convention for container metadata is clean.

### Open Question 3: One-off Component Metadata — Agree with Leonardo and Lina

Name, purpose, composed-from list, rough layout description. That's what I need to build a one-off Web Component. The composed-from list tells me my imports. The layout description tells me the CSS structure. I don't need contracts or behavioral tests for a one-off.

### Questions

- [@LEONARDO] On responsive behavior — do you envision capturing responsive rules in the per-screen spec, in the Product Templates, or both? My preference is templates (responsive behavior is a layout concern), but if a screen has unique responsive behavior that doesn't fit a template, it needs to go somewhere.
- [@LEONARDO] On the Status facet — what granularity? I proposed `not-started | in-progress | complete | blocked` per platform. Is that enough for your workflow, or do you need finer granularity (e.g., percentage, blocking issues, reviewer)?

---

### Data

#### [DATA R1]

**Overall assessment**: The design outline is strong. The MCP ownership boundary is clean, the per-screen spec structure gives me what I need for implementation, and the "system agents serve the repo" reframing is exactly right. My questionnaire responses are reflected in the design — the emphasis on queryable structured data over prose, the component tree as the primary handoff artifact, and the status tracking I asked for. My feedback covers the per-screen spec from the Android implementation perspective, the open questions, and one concern that's specific to native platform agents.

### Per-Screen Spec Structure — This Is What I Asked For

In my questionnaire (Q9), I said the optimal handoff is a queryable screen spec — "give me the component tree for the Bill Detail screen" as a Product MCP query instead of parsing a markdown document. This design delivers that. Let me walk through each facet from the "I'm about to implement this screen in Jetpack Compose" perspective:

- **UI Tree (Systems Components)**: The component tree I build from. If the spec says `Nav-Header-App > scrollable LazyColumn of Container-Card-Base > Nav-TabBar-Base`, I know my composable structure, my imports, and my layout hierarchy. I query the Application MCP for each component's contracts and Android implementation patterns.
- **UI Tree (One-off Components)**: Product-specific compositions I need to create as Compose composables. The composed-from list tells me which DesignerPunk components I'm wrapping. This is the structured version of what I currently piece together from prose.
- **State Model**: The states and transitions I need to implement. Loading → populated, error → retry, empty → first-use guidance. Without this I'm guessing at edge cases. With it, I know exactly which composable branches to build.
- **Data Sources**: What's dynamic, what's static, where data comes from. On Android this directly maps to ViewModel structure — each data source becomes a StateFlow or a repository call.
- **Accessibility**: TalkBack content descriptions, heading hierarchy, navigation order, custom actions. Leo specifies the intent, I implement the Compose Semantics. This is the split I described in Q9.
- **Status**: Per-platform implementation progress. This is the facet I'm most excited about — it turns "has Kenya finished iOS?" from a question I ask into a query I run.

### Open Question 4: Cross-MCP Queries — Agree with Everyone

Strong consensus from Leonardo, Ada, Lina, and Sparky: agents query both MCPs separately. Adding my voice.

From the Android implementation seat, the workflow is clear:
1. Query Product MCP: "What's on the Bill Detail screen?" → UI tree, state model, data sources
2. Query Application MCP: "Tell me about Container-Card-Base" → props, contracts, Android implementation

These are different questions at different layers. If the Product MCP tried to merge Application MCP data, I'd get a partial view and still need the Application MCP for the full component details (especially Android-specific implementation patterns that the Product MCP has no reason to know about).

Reference by name, resolve at the source. Same pattern as token references in component code.

### Open Question 3: One-off Component Metadata — Agree with Leonardo and Lina

Name, purpose, composed-from list, rough layout description. That's what I need. On Android, the composed-from list tells me which DesignerPunk composables I'm importing. The layout description tells me the Compose layout structure (Column, Row, Box nesting). No contracts or behavioral tests needed for one-offs.

### Open Question 2: Product Data Directory — Endorse Leonardo's Structure

Leonardo's proposed directory structure is navigable and parseable. No additional input from the Android side.

### Experience Patterns — Agree with Leonardo and Ada

Keep ecosystem patterns in the Application MCP. Product-specific patterns in the Product MCP. The resolution order (product first, fall back to ecosystem) is clean.

From my perspective: when I'm implementing a screen and Leo's spec says "follows the `simple-form` pattern," I query the Application MCP for the pattern's component roles and assembly structure. That's ecosystem data. If the product has a custom "legislation form" pattern that extends `simple-form`, that's Product MCP data. Two queries, clear ownership.

### Concern: Native Platform Agents and the Spec-to-Implementation Gap

Sparky raised the gap between spec and implementation — how do I discover that a spec is ready for implementation? His concern applies to me too, but with an additional wrinkle.

**Web implementation can start immediately when a spec is published.** Sparky imports DesignerPunk web components, writes HTML/CSS/JS, and the components render in a browser. The feedback loop is fast.

**Android implementation has a prerequisite step.** Before I can implement a screen, the DesignerPunk Android files need to be in the project's source tree. Today that's a manual copy (documented in the Spec 095 Integration Guide). In M0b it'll be `npx designerpunk sync:android`. Either way, there's a step between "spec is ready" and "I can start building" that web doesn't have.

This means the Status facet needs to account for platform readiness, not just implementation progress. A screen might be `ready-for-implementation` for web but `blocked` for Android because the sync hasn't been run, or because a component referenced in the spec has the token reference issues we found in Spec 094.

**My recommendation**: The Status facet should support at minimum `not-started | in-progress | complete | blocked` per platform (agreeing with Sparky). But `blocked` should support a reason — `blocked: sync-pending`, `blocked: component-issue`, `blocked: spec-incomplete`. This turns the Product MCP into a lightweight work queue with enough context for me to know *why* I can't start, not just that I can't.

This is a small addition to the schema but it directly addresses the workflow question Sparky and I both raised: "how do I discover what's ready for me?"

### "System Agents Serve the Repo" — Correct

This reframing matches how I already think about my work. When I implemented components in Spec 094, I wasn't thinking "these are DesignerPunk ecosystem components" — I was thinking "these are the Android components in this repo." If a product adds a `LegislationCard` composable, it's in the repo, it's Android, it's my domain.

The governance gradient is the right calibration. Ecosystem components get full review (contracts, cross-platform parity, behavioral tests). Product one-offs get lighter review (does it compose ecosystem components correctly? does it follow naming conventions?). I don't need to approve every product composable, but I should be consulted when one modifies or forks an ecosystem component.

### Summary

| Area | Assessment | Action |
|------|-----------|--------|
| Per-screen spec structure | Exactly what I need | None |
| Cross-MCP queries | Agents query separately | None — strong consensus |
| One-off metadata | Name + purpose + composed-from | None |
| Experience patterns | Ecosystem in App MCP, product in Product MCP | None |
| Status facet | Needs `blocked` with reason for native platforms | Add reason field |
| Agent reframing | Correct, matches how I work | None |

No blocking concerns. The design is sound and directly addresses the workflow friction I described in my questionnaire.

### Questions

- [@SPARKY] You raised the responsive behavior question — on Android, the equivalent is adaptive layout (compact/medium/expanded window size classes). Do you think this belongs in the per-screen spec, the template, or both? I'm leaning toward templates for the same reason you are (it's a layout concern), but Android's window size classes don't map 1:1 to web breakpoints, so the template might need platform-specific sections.
- [@LEONARDO] On the Status facet — Sparky and I both want `blocked` with a reason. Does that work for your spec authoring workflow, or does it add friction? You'd be the one setting initial status when you publish a spec.

---

### Leonardo

#### [LEONARDO R2]

**Context**: Responding to [@LEONARDO] questions from Ada R1, Lina R1, Stacy R1, Sparky R1, and Data R1.

### Ada's [@LEONARDO]: Token data index covering all tokens (ecosystem + product)

Yes, that matches my expectation. When I spec a screen and reference `color.action.primary`, I don't care whether it's an ecosystem token or a product override — I just need to know it exists and what it resolves to. One index, all tokens, no distinction needed. The Application MCP serves the full token picture, and my screen→token lookups work against that unified index.

The practical implication: when I write a screen spec that says "this screen uses `color.action.primary`," the Product MCP stores the reference by name. If someone queries "what tokens does this screen use?", the Product MCP returns the names. If they want the values, they query the Application MCP's token index. Same reference-by-name pattern as Systems Components.

### Lina's [@LEONARDO]: What I actually write for one-off components in a UI Tree

Honestly, what I'd naturally produce is close to what Lina proposed:

```yaml
one_off_components:
  - name: LegislationCard
    purpose: Displays a bill summary with status, sponsor, and relevance score
    composed_from:
      - Container-Card-Base
      - Badge-Label-Base
      - Icon-Base
    layout: |
      Card with:
        Header: Badge-Label-Base (status) + bill title
        Body: sponsor name, introduced date
        Footer: Icon-Base (relevance) + relevance score
    props:
      bill: Bill  # domain object reference
      onTap: callback
```

So: name, purpose, composed-from, layout description, and a rough prop sketch. I wouldn't write contracts or behavioral tests — that's Lina's domain if the component gets promoted. The prop sketch is useful because it tells platform agents what data the component needs, which shapes their function signature.

The metadata format should match this. Don't over-formalize it — if the format is heavier than what I'd naturally write, I'll skip fields or write them poorly. Keep it lightweight and let Phase 2 tell us if we need more.

### Stacy's [@LEONARDO]: Status facet granularity

`not-started | in-progress | complete | blocked` per platform is the right granularity. I don't need percentages — a screen is either being worked on or it isn't. I don't need blocking issues in the status field — those belong in implementation reports (Tier 2 handoff protocol), not in a status enum.

What I'd set when I publish a spec:

```yaml
status:
  spec: complete
  web: not-started
  ios: not-started
  android: not-started
```

Platform agents update their own status as they work. Stacy queries it for parity reviews. Simple.

### Sparky's [@LEONARDO]: Responsive behavior — per-screen or templates?

Templates for the common case, per-screen override for the exception.

Most screens in a product will follow one of a few layout patterns. The "Dashboard" uses a multi-zone template. The "Bill Detail" uses a centered-content template. The responsive behavior is defined in the template — how zones restack, how columns collapse, how navigation adapts. I reference the template by name in the screen spec, and Sparky gets the responsive rules from the template.

But some screens will have unique responsive behavior that doesn't fit any template. A "Comparison" screen that shows two bills side-by-side on desktop but stacks them on mobile — that's screen-specific. For those, I'd add a `responsive` facet to the screen spec:

```yaml
responsive:
  note: "Side-by-side comparison on md+, stacked on sm"
  sm: "Single column, tabbed switching between bills"
  md: "Two-column, bills side by side"
```

This is the exception, not the rule. Most screens won't need it. The schema should support it but not require it.

### Data's [@LEONARDO]: Status `blocked` with reason — does it add friction?

No friction at all. When I publish a spec, I set all platforms to `not-started`. I wouldn't set anything to `blocked` at publish time — that's a status the platform agents set when they discover a blocker during implementation.

```yaml
status:
  spec: complete
  web: not-started
  ios: blocked
  ios_blocked_reason: "sync-pending — run npx designerpunk sync:ios first"
  android: not-started
```

Data's right that `blocked` needs a reason. Without it, the status is useless — "blocked" tells me nothing, "blocked: sync-pending" tells me exactly what to do. The reason field is lightweight (a short string, not a structured object) and only present when status is `blocked`.

One nuance: the platform agent sets the blocked status and reason, not me. I publish the spec with `not-started` for all platforms. If Data tries to start and discovers the Android sync hasn't been run, he sets `android: blocked` with the reason. This keeps the spec authoring workflow clean — I don't need to predict platform blockers.

### Kenya's Platform-Specific Notes — Inline Annotations

Kenya suggested inline `ios_note` annotations in the UI Tree rather than a separate platform notes facet. I agree — co-locating platform notes with the element they apply to is better than a separate section that drifts. I'd write these when I know a platform divergence exists:

```yaml
ui_tree:
  - component: Nav-Header-Page
    props:
      title: "Bill Detail"
      back_action: true
    platform_notes:
      ios: "Use NavigationStack push, not sheet presentation"
      android: "Standard TopAppBar with back arrow"
```

Using `platform_notes` (plural, with platform keys) rather than `ios_note` / `android_note` keeps the schema clean and extensible. Most elements won't have platform notes — only the divergent ones.

---

#### [SPARKY R2]

**Context**: Responding to Data's [@SPARKY] question about responsive behavior and platform-specific template sections.

### Data's [@SPARKY]: Responsive behavior in templates — platform-specific sections?

Templates for the common case, per-screen override for the exception — Leonardo's R2 confirms this is the right split. Now to Data's specific question: do templates need platform-specific sections because Android window size classes don't map 1:1 to web breakpoints?

**Short answer: yes, but keep it lightweight.**

The responsive behavior is conceptually the same across platforms — "at narrow widths, stack; at wide widths, show side-by-side." But the implementation mechanism differs:

- **Web**: CSS breakpoints (`@media (min-width: 1024px)`), CSS Grid, container queries. I use DesignerPunk's breakpoint tokens (`breakpoint-xs`, `breakpoint-sm`, `breakpoint-md`, `breakpoint-lg`).
- **Android**: Window size classes (`Compact`, `Medium`, `Expanded`), `WindowSizeClass` API. The thresholds are different from web breakpoints (Compact < 600dp, Medium 600-840dp, Expanded > 840dp).
- **iOS**: Size classes (`compact`, `regular`), `@Environment(\.horizontalSizeClass)`. Two-tier, not three-tier like Android.

A template that says "2 columns at medium, 1 column at small" is platform-agnostic intent. Each platform maps that to its own mechanism. The template doesn't need to specify `@media (min-width: 1024px)` or `WindowSizeClass.Medium` — that's implementation detail for the platform agent.

**What the template should capture:**

```yaml
responsive:
  compact: "Single column, stacked content"
  medium: "Two-column layout, sidebar + main"
  expanded: "Three-column layout, nav + main + detail"
```

Using abstract size names (`compact`, `medium`, `expanded`) rather than platform-specific breakpoints or size classes. Each platform agent maps these to their native mechanism. I'd map `compact` → `breakpoint-xs` + `breakpoint-sm`, `medium` → `breakpoint-md`, `expanded` → `breakpoint-lg`. Data maps them to Android's window size classes directly (they already use the same names). Kenya maps `compact` and `medium` to iOS's two size classes.

**Platform-specific sections in the template are only needed when the behavior genuinely diverges** — e.g., "on web, the sidebar collapses into a hamburger menu; on Android, it becomes a navigation drawer; on iOS, it becomes a tab bar." That's a design decision Leo makes, not a responsive behavior difference. For those cases, Leonardo's `platform_notes` pattern (inline annotations on the divergent element) is cleaner than platform sections in the template.

So: abstract responsive tiers in the template, platform-specific notes only where behavior diverges. No platform-specific template sections needed.