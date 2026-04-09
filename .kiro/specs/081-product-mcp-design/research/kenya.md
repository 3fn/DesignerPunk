# Spec 081 Research: Kenya — iOS Platform Engineer

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

A screen spec with three things: the component tree, the token references, and the state model.

The component tree tells me *what* to build — which DesignerPunk components compose the screen, how they nest, and what props they receive. If Leo says "Container-Card-Base with padding p200, containing a Badge-Label-Base with label from the data model," I can implement that directly. The tree is my blueprint.

Token references tell me *how it looks* — which semantic tokens drive spacing, color, typography. When the spec says `spaceInset200` for card padding and `colorActionPrimary` for the CTA, I don't need to make visual decisions. I translate tokens to SwiftUI modifiers. If the spec says "8px padding" instead of `spaceInset100`, I have to go figure out which token that maps to, and I might pick the wrong one.

The state model tells me *how it behaves* — what states the screen has (loading, empty, error, populated), what triggers transitions, and what the user sees in each state. Without this, I implement the happy path and then discover during review that I missed the empty state, the error state, and the loading skeleton.

**What would be optimal:**

On top of the minimum, three more things would make my life significantly easier:

1. **iOS-specific notes where platform behavior diverges.** Leo sees all three platforms. If there's a spot where iOS should behave differently — safe area handling, a native navigation pattern that's better than the specified approach, a SwiftUI limitation he's already aware of — calling it out in the spec saves me a Tier 1 clarification round-trip. He doesn't always know these, and that's fine — I flag them. But when he does know, embedding it in the spec is faster.

2. **Accessibility tree specification.** VoiceOver navigation order, accessibility labels for non-obvious elements, which elements are grouped, which are hidden from assistive technology. Today I infer this from the component contracts (which specify per-component accessibility), but the *screen-level* accessibility story — how a VoiceOver user navigates the full screen, what they hear in what order — is something Leo should specify because it's a cross-platform UX decision, not an iOS implementation detail.

3. **The ability to look up component APIs myself without asking.** This is the MCP question. When Leo's spec references `Button-CTA` with `style: .primary` and `size: .large`, I need to verify what props that component actually accepts, what its behavioral contracts are, and how the iOS implementation maps those props. Today I can query `get_component_full` and `get_prop_guidance` through the Application MCP, and that works well for ecosystem components. What I *can't* do today is look up a product-specific component or pattern that Leo might reference in a spec. If the product has a custom "LegislationCard" pattern that composes three ecosystem components, and Leo's spec says "use the LegislationCard pattern here," I need to find that pattern's definition somewhere queryable — not chase down a doc or ask Leo to re-explain it.

**What I should be able to find on my own (not need from Leo):**

- Component APIs, props, contracts, behavioral expectations — the Application MCP handles this today
- Token values and relationships — the Application MCP + knowledge bases handle this
- Platform-specific implementation patterns — my own knowledge + the iOS component implementations in the codebase
- How a specific DesignerPunk component is implemented on iOS — I can read the `platforms/ios/` files directly

The gap is product-level knowledge: product patterns, product flows, product-specific components. That's what the Product MCP would fill.

---

### Question 10: How does that contrast with my experience today?

Today the contrast is stark, but for a specific reason: **we haven't built product screens yet.**

My entire experience so far has been building DesignerPunk's own component implementations — translating Lina's component specs into SwiftUI. In that workflow, Leo isn't involved. I receive component specs (behavioral contracts, token mappings, prop definitions) from Lina, and I implement the iOS platform version. The "screen spec from Leo" workflow hasn't been exercised.

What I *can* speak to is the tooling experience:

**What works well today:**
- The Application MCP gives me component metadata, contracts, and family guidance. When I need to understand how a component should behave, `get_component_full` gives me the answer.
- The knowledge bases (`ios-components`, `ios-platform-tokens`, `semantic-tokens`) let me search for implementation patterns, token values, and cross-component relationships without manually reading files.
- The generated token files (`DesignTokens.ios.swift`, `ComponentTokens.ios.swift`) are the source of truth for iOS token consumption. Having them as concrete Swift constants is the right model.

**What's friction today:**
- When I need to understand *why* a token was chosen or *how* a component decision was made, I end up reading spec docs and design outlines. The MCP layer doesn't serve design rationale — it serves the *what*, not the *why*. For component implementation this is usually fine. For product screen implementation, I suspect the *why* matters more, because I'll need to make judgment calls about iOS-specific adaptations.
- Cross-referencing between component contracts and token definitions requires multiple MCP queries. If I'm implementing a component that uses `colorFeedbackSelectBackgroundRest` and I want to understand what that color actually looks like and why it was chosen for selection states, I need to query the component, then query the token, then maybe read the semantic token definition. A "give me everything about this component's visual treatment" query that spans components and tokens would be more efficient.
- The token reference quality gap we found during Spec 094 (iOS components referencing non-existent token names) tells me there's no automated feedback loop between "what the generated output provides" and "what the implementation consumes." The build-time validation test in Spec 095 fixes this going forward, but the fact that ~60 broken references existed across 7 iOS files without anyone noticing means the tooling wasn't catching drift. That's a gap in the development workflow, not just a testing gap.

**What I expect to change with product screens:**
- I'll need Leo's screen specs, and the quality of those specs will directly determine my implementation speed. Ambiguous specs mean Tier 1 clarification round-trips. Complete specs mean I can implement without interruption.
- I'll need product-level context that doesn't exist in the Application MCP — what the product's domain objects are, what the user flows look like, what the product's visual identity is beyond the base theme. This is the Product MCP's territory.
- I'll need to verify that my iOS implementation matches what Sparky built on web and what Data built on Android. Today there's no cross-platform parity check tool. Leo reviews this manually. If the Product MCP could serve "here's what the web implementation looks like for this screen" alongside "here's the spec," I could self-verify parity without waiting for Leo's review.
