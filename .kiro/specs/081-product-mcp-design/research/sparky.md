# Spec 081 Research: Sparky — Web Platform Engineer

**Date**: 2026-04-09
**Context**: Read `design-outline.md` § "Design Session 0: Data Boundary" for background. These questions explore your implementation workflow.

---

## Questions

9. When you're receiving implementation direction from Leo, what do you need? What would be optimal for you to receive and/or find on your own?

10. How does that contrast with your experience today?

---

## Response

### Q9: What do I need from Leo, and what would be optimal?

**What I need at minimum:**

- **Component tree** — which DesignerPunk components make up the screen, nested in their actual parent-child structure. This is the skeleton I build from. Without it I'm guessing at composition.
- **Token references for spacing, color, and typography** — not pixel values, not "make it look like the design." Semantic token names (`space.inset.200`, `color.structure.surface`, `typography.body.md`) that I can translate directly to CSS custom properties. If Leo specifies tokens, I don't have to interpret design intent — I implement it.
- **State model** — what states does the screen have (loading, empty, error, populated, etc.) and what changes between them. I need to know what to build, not just what the happy path looks like.
- **Accessibility requirements** — ARIA roles, landmark structure, focus order, live regions. Leo's spec should tell me the accessibility tree shape. I can fill in the ARIA implementation details, but I need to know the intent (e.g., "this list is navigable by arrow keys" vs "this is a static display").

**What would be optimal:**

- **All of the above, plus web-specific notes** when Leo knows the web platform has a constraint or opportunity. He doesn't need to be a web expert, but if he's aware that a particular pattern has a native web equivalent (e.g., `<dialog>` for modals, `<details>` for disclosure), flagging it saves me from implementing a custom solution when a native one exists.
- **Behavioral contract references** — "this component follows the `interaction_press` contract" tells me exactly what interaction behavior to implement. I can look up the contract and know the expected states, transitions, and feedback without Leo spelling it out.
- **Experience pattern reference** — if the screen follows a known pattern (e.g., `simple-form`, `detail-view`), naming it gives me the assembly structure, component roles, and accessibility notes from the pattern definition. I can query the Application MCP for the full pattern and use it as a scaffold.
- **What I should be able to find on my own** (via MCP): component APIs, prop options, composition rules, token values, family guidance. I shouldn't need Leo to tell me that `Button-CTA` has a `variant` prop with `primary`/`secondary`/`ghost` options — I should be able to query `get_component_full('Button-CTA')` and get that. Leo's job is to tell me *which* variant to use in *this* context, not to repeat the component's API documentation.

**The ideal handoff is a screen spec that's dense with decisions and sparse with implementation details.** Leo decides what the screen does, which components it uses, and how they're arranged. I decide how to build it in Web Components with Shadow DOM, CSS logical properties, and ARIA. The spec is the contract between us — specific enough that I don't have to guess at intent, abstract enough that I can use platform-native patterns where they're better.

### Q10: How does that contrast with my experience today?

Today, I haven't implemented a product screen from a Leo spec yet — we're still building the ecosystem infrastructure (Specs 094, 095, 096). So my "experience" is really about what I've observed during component development and spec feedback rounds, not actual screen implementation.

**What works well today:**

- The Application MCP gives me solid component data. When I need to understand a component's API, contracts, or composition rules, `get_component_full` and `get_prop_guidance` return useful, structured information. I don't have to read source files to understand what a component does.
- Token references are well-established. The semantic token system means I can look up `space.inset.200` and know exactly what CSS custom property to use (`--space-inset-200`). The token-first principle in the steering docs is clear.
- Behavioral contracts are well-defined. When a component has a `contracts.yaml`, I know exactly what interaction behavior it promises. This is the kind of thing that would be painful to reverse-engineer from source code.

**What I anticipate being friction:**

- **No product-level context today.** When Leo specs a screen for the marketing site (Phase 2), I'll need to understand the product's domain — what a "feature showcase" means, what the user flow is, what content is dynamic vs static. Today there's no structured place for that knowledge. I'd be relying on Leo explaining it in the spec or in conversation, which is fine for one screen but doesn't scale.
- **No screen-to-screen navigation context.** If I'm building Screen B and it links to Screen C, I need to know Screen C exists and what its entry point looks like. Today there's no product-level map of screens and flows. Leo would need to include that context in every spec, or I'd need to ask.
- **The MCP-only approach (from Spec 095 agent template) means I'm dependent on MCP data quality.** If the Application MCP doesn't have what I need — say, a component's web-specific implementation notes or a pattern's responsive behavior — I can't fall back to reading files. I flag the gap, which is the right governance behavior, but it slows me down in the moment. The Product MCP could help here if it serves product-specific implementation notes alongside the screen specs.
- **Cross-platform consistency is invisible to me.** Leo sees all three platforms. I only see web. If Leo's spec makes a decision that's optimal for iOS but awkward for web (e.g., a gesture-based interaction that has no web equivalent), I won't know until I'm implementing. Today I'd flag it in my Implementation Report, but ideally the spec would surface platform-specific notes upfront. Whether that's Leo's job or a Product MCP capability that surfaces "web considerations" alongside the spec — that's a design question for this spec.

**The gap the Product MCP could fill:**

The biggest gap isn't about component data or token data — the Application MCP handles those well. The gap is **product context**: what is this product, what are its screens, how do they connect, what are the domain objects, what are the user flows. That's the data I'd want to query when I'm implementing a screen and need to understand how it fits into the larger product. Today that context lives in Leo's head (or in scattered spec documents). A Product MCP that serves structured product context — screens, flows, domain objects, navigation maps — would let me self-serve the context I need without blocking on Leo for every question.
