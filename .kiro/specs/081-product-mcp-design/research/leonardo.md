# Spec 081 Research: Leonardo — Product Architect

**Date**: 2026-04-09
**Context**: Read `design-outline.md` § "Design Session 0: Data Boundary" for background. These questions explore your workflow, not a specific design.

---

## Questions

1. When you're beginning to develop a new product on DesignerPunk, what open questions do you have? What context would be helpful to have before you start?

2. When developing a spec for a new screen or experience within a product, what context and data do you need at a minimum to begin formulating a plan? What would be ideal?

3. Walk me through your mental process when you're selecting components for a screen. What do you look for, and what do you hope to find? How does that contrast with your experience today? What do you wish you could look up but can't today?

---

## Response

### 1. Starting a new product — open questions and helpful context

When I'm beginning a new product on DesignerPunk, my first questions are about the product, not the system. The system I know. The product I don't.

**What I need to know about the product:**
- What is this product for? Who uses it, what problem does it solve, what's the core value proposition?
- Which platforms are we building for, and in what order? Web-first? iOS-first? All three simultaneously? This determines which platform agents activate and whether I'm thinking cross-platform from day one or designing for one platform with future portability in mind.
- What's the visual identity? Does this product use DesignerPunk's base theme, or does it need its own brand? If custom, is there a design exploration, mood board, or brand guidelines? This determines whether theming work is a prerequisite or not.
- What's the scope of the first deliverable? A single screen? A flow? An MVP? I need to know the boundary so I don't over-architect.
- What data does the product work with? User-generated content, external APIs, static content, real-time data? The data model shapes the screen architecture more than anything else.

**What I need to know about the system's readiness for this product:**
- Are there component gaps? Given the product's domain (e.g., civic engagement, e-commerce, content management), which screens will need components that don't exist yet? I can do a rough gap analysis by querying the component catalog against the product's likely screen types, but I need to know the product's screens first.
- Are there token gaps? If the product has a custom theme, does the token system cover the visual language the product needs? Hero-scale typography, domain-specific color semantics, spacing patterns that differ from app UI?
- Which experience patterns apply? The 9 existing patterns (simple-form, settings, dashboard, etc.) cover common screen types. But a new product might need patterns that don't exist — and I'd rather know that upfront than discover it mid-spec.

**What would be ideal to have before I start:**
A product brief — even a rough one — that answers the product questions above. Plus a "readiness assessment" that maps the product's likely needs against the current component catalog, token families, and experience patterns. The metadata health check we did for M0a is a good model: targeted, scoped to the product's needs, not a blanket audit.

---

### 2. Developing a spec for a new screen — minimum context and ideal context

**Minimum to begin formulating a plan:**
- What the screen is for — its purpose in the product and in the user's flow. "This is the screen where users browse legislation and see how it affects them" gives me enough to start thinking about information architecture, component selection, and state model.
- What data the screen displays — even at a high level. "A list of bills, each with a title, status, sponsor, and a relevance score" tells me I need list items, badges, maybe cards, and a data-driven layout.
- What actions the user can take — "filter by topic, express support/opposition, navigate to bill detail." This tells me I need filter chips, action buttons, and navigation.
- Where this screen sits in the navigation — what leads here, what leads away. Is it a root destination (tab bar) or a pushed screen (back button)?

With those four things, I can start querying the Application MCP for components, checking experience patterns, and sketching a component tree.

**What would be ideal:**
- All of the above, plus:
- A design exploration or wireframe — even rough. Visual intent communicates things that words don't. The M0a design exploration (Desktop - 34.png) told me more about the marketing site's architecture in one image than a page of description would have.
- The state model — what data drives the screen, what changes, what's loading vs loaded vs error vs empty. This shapes which components I select (do I need a progress indicator? an empty state? error handling?).
- Accessibility requirements beyond the baseline — are there specific WCAG success criteria that matter more for this screen? A form screen has different accessibility priorities than a data visualization screen.
- Platform-specific constraints — does iOS have a navigation pattern that differs from web for this screen? Does Android have a system bar interaction that affects layout? I can usually infer these, but explicit constraints save iteration.

**The gap today:**
Once I've specced a screen, that spec lives in a markdown file. If I want to reference it later — "what components did I select for the legislation list screen?" — I re-read the file. If Lina changes a component's contract and I need to know which screens are affected, I grep across spec files. There's no structured, queryable representation of screen specifications. The spec is a document, not data. That's the gap the Product MCP should eventually fill.

---

### 3. Mental process for component selection

Here's what actually happens in my head, step by step:

**Step 1: Decompose the screen into UI elements.**
I look at the screen's purpose and data and mentally break it into elements: "this needs a header, a filter bar, a scrollable list of items, each item has a title and status badge, and there's a floating action button." This is design thinking, not system thinking — I'm not thinking about DesignerPunk components yet, I'm thinking about what the user sees and does.

**Step 2: Map elements to component families.**
Now I shift to system thinking. "Header" → Navigation family. "Filter bar" → Chip family (Chip-Filter). "List items" → probably Container-Card-Base or a custom composition. "Status badge" → Badge family. "Action button" → Button family. This mapping is where my knowledge of the component catalog matters — I need to know what families exist and roughly what they cover.

**Step 3: Query the Application MCP for specifics.**
This is where I go from "Badge family" to "Badge-Label-Base with variant='status'" or whatever the right specific component is. I use `find_components` with context or purpose keywords, `get_prop_guidance` for family-level selection rules, and `get_component_full` when I need to understand a specific component's props, variants, and behavioral contracts.

**What I hope to find:** A component that fits the use case without forcing it. The metadata should tell me "this component is designed for exactly this scenario" or "this component can work but here's the trade-off" or "no component exists for this — you'll need a product-level composition." The `whenToUse`, `whenNotToUse`, and `alternatives` fields are the most valuable metadata for this step.

**Step 4: Check experience patterns.**
If the screen matches a known pattern (form, settings, dashboard, etc.), I query `get_experience_pattern` to see if there's an assembly guide. The pattern gives me a component tree skeleton — which components compose together, in what order, with what roles. This saves me from reinventing compositions that have already been thought through.

**Step 5: Validate the assembly.**
Once I have a component tree, I run `validate_assembly` to check composition constraints. Can this component be a child of that component? Are required children present? Are there accessibility issues (missing labels, no submit action, no heading)?

**Step 6: Identify gaps.**
Whatever the screen needs that the catalog doesn't have becomes a gap. Gaps are either product-level compositions (I build them from existing components — not a system gap) or missing components (I escalate to Lina via Thurgood). The metadata health check taught me to distinguish between these clearly.

**How this contrasts with my experience today:**
Steps 1-2 happen in my head and are fast. Steps 3-5 work well — the Application MCP is genuinely useful and the metadata is mostly accurate (the M0a health check confirmed this). Step 6 is where things get manual. When I identify a gap, I document it in a feedback doc or spec. But there's no structured way to track gaps across screens, see which gaps recur, or know whether a gap I flagged three specs ago has been resolved. It's all in documents, not in queryable data.

**What I wish I could look up but can't today:**
- "What components have I already selected for other screens in this product?" — so I can reuse compositions and maintain consistency across screens.
- "Has this component been used in a similar context in another product?" — pattern recognition across products, not just within one.
- "What gaps have been identified across all screens in this product?" — aggregated gap tracking, not per-spec.
- "Given this screen's purpose, what components and patterns would you suggest as a starting point?" — a first-pass recommendation based on the screen type, before I do the manual decomposition. I described this as "screen spec template generation" in my Product MCP wish list. It's the step 1-2 automation — not replacing my judgment, but giving me a starting point to react to.
