# Spec 081 Research: Data — Android Platform Engineer

**Date**: 2026-04-09
**Context**: Read `design-outline.md` § "Design Session 0: Data Boundary" for background. These questions explore your implementation workflow.

---

## Questions

9. When you're receiving implementation direction from Leo, what do you need? What would be optimal for you to receive and/or find on your own?

10. How does that contrast with your experience today?

---

## Response

### Question 9: What do I need from Leo, and what would be optimal?

**What I need at minimum:**

1. **A component tree with token references.** Not pseudocode, not a description — a structured tree that says "this screen has a Nav-Header-App at the top, a scrollable Column of Container-Card-Base items, each card contains a Badge-Label-Base and body text, and a Nav-TabBar-Base at the bottom." With the semantic tokens specified for spacing, color, and typography at each level. That's the spec. Everything else is context.

2. **State model.** What states does this screen have? Loading, empty, error, populated, offline? What triggers transitions? I need to know what composables to build for each state and how they connect. If Leo says "this screen shows a list of bills," I need to know what happens when there are no bills, when the network fails, when the list is loading, and when the user pulls to refresh.

3. **Accessibility requirements.** Not generic "make it accessible" — specific: what's the content description for this card? What's the heading hierarchy? What's the navigation order? Is there a custom action (e.g., swipe to dismiss)? TalkBack behavior is something I implement, but the *intent* (what should the screen reader user experience) comes from the spec.

4. **Android-specific notes when they exist.** If Leo knows there's a platform constraint or opportunity — system bar behavior, edge-to-edge rendering, haptic feedback on a specific interaction — call it out. If he doesn't know, that's fine — I'll flag it during implementation. But if he's already thought about it, don't make me rediscover it.

**What would be optimal:**

Everything above, plus:

5. **A queryable screen spec.** Instead of reading a markdown document, I'd query the Product MCP: "give me the component tree for the Bill Detail screen," "what tokens does this screen use," "what states does this screen have." The spec becomes structured data I can traverse, not prose I have to parse. This is the Product MCP's highest-value capability for me — turning Leo's architectural decisions into queryable data that I can pull exactly what I need from, when I need it.

6. **Cross-references to component contracts.** When the spec says "Container-Card-Base," I need to know its behavioral contracts (what it promises to do) and its props (what I configure). Today I query the Application MCP for this (`get_component_full`). Optimal: the screen spec links directly to the component's contract, so I can traverse from "this screen uses Container-Card-Base" to "Container-Card-Base supports these interaction states" without a separate query.

7. **Diff from previous version.** When a screen spec changes (Leo revises the component tree, adds a state, changes a token), I want to know what changed — not re-read the entire spec. "Card padding changed from space.inset.200 to space.inset.300" is actionable. "Here's the updated screen spec" means I'm diffing it myself.

**What I should find on my own:**

- How to implement a specific Compose pattern (Modifier chains, animation APIs, layout behavior)
- Platform-specific optimizations (lazy loading, recomposition scoping, performance tuning)
- The actual Kotlin code — Leo specs the *what*, I own the *how*
- Existing component implementation patterns — I should query the knowledge base or read sibling components, not ask Leo how Button-CTA was built

### Question 10: How does that contrast with my experience today?

**Today's workflow is functional but has friction in three areas:**

**1. Spec format is prose, not structured data.** Leo's screen specs are markdown documents. They're well-written — component trees, token references, state models, accessibility notes. But I parse them manually. When I need "what color token does the card background use," I'm scanning a document, not querying a data source. For a single screen this is fine. For a product with 20 screens, it doesn't scale. The Product MCP would change this — structured specs that I query rather than read.

**2. Component discovery requires multiple queries.** When Leo's spec references a component, I need to:
- Query `get_component_full` for the component's API and contracts
- Check the Android implementation in the knowledge base or file system
- Cross-reference the token references in the spec against the actual generated `DesignTokens.android.kt`

Each step is a separate query to a different source. Optimal: one query that returns "here's the component, here's its Android implementation pattern, here are the tokens it uses, and here's how the spec wants you to configure it." The merged view model (Option C from Session 0) would enable this — the Product MCP enriches ecosystem component data with product-specific configuration.

**3. The gap between spec and implementation is manual.** Leo produces a spec. I read it. I implement it. If the spec changes, Leo tells me (or I notice during a review). There's no automated connection between "the spec says X" and "the implementation does X." This is the hardest gap to close and probably not a Phase 1 concern — but it's the honest answer to "how does today contrast with optimal." Optimal would be: the Product MCP knows both the spec and the implementation status, and can tell me "this screen's spec changed since your last implementation — here's what's different."

**What works well today:**

- Leo's specs are thorough. The component trees are accurate, the token references are correct (or close enough that I can resolve ambiguities), and the state models are complete.
- The Application MCP gives me everything I need about ecosystem components. `get_component_full`, `find_components`, `get_prop_guidance` — these work.
- The handoff protocol (Tier 1 clarifications, Tier 2 implementation reports) keeps communication structured. I know when to ask and when to report.
- Knowledge bases for Android implementations let me find patterns quickly without reading every file.

The friction isn't in the quality of what I receive — it's in the format and queryability. Leo does good work. The tooling just hasn't caught up to make that work maximally consumable.
