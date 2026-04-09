# Spec 081 Research: Stacy — Product Governance

**Date**: 2026-04-09
**Context**: Read `design-outline.md` § "Design Session 0: Data Boundary" for background. This question explores governance models for product-level artifacts.

---

## Question

11. When a product creates its own patterns, components, or tokens, should they be governed the same way as ecosystem artifacts? What would "product-level governance" look like vs "ecosystem-level governance"?

---

## Response

### Short Answer

No — product artifacts should not be governed the same way as ecosystem artifacts. The stakes, audiences, and change velocities are fundamentally different. Product-level governance should be lighter, faster, and focused on consumption correctness. Ecosystem-level governance should remain rigorous, slower, and focused on systemic integrity.

### Why They're Different

Ecosystem artifacts (DesignerPunk's tokens, components, patterns, templates) are infrastructure. They're consumed by every product. A bad token name, a broken behavioral contract, or a misleading `whenToUse` field propagates to every consumer. The governance cost is justified because the blast radius is large.

Product artifacts (a product's custom patterns, product-specific tokens, product-created components) are consumed by one product. A bad product token name affects one codebase. A misleading product pattern description confuses one team. The blast radius is small. Applying ecosystem-level governance to product artifacts creates overhead that doesn't match the risk.

The velocity difference matters too. Ecosystem artifacts change slowly and deliberately — token creation requires human review, component changes go through behavioral contract validation, metadata changes go through the Spec Feedback Protocol. Product artifacts need to move at product speed. A product team building a screen shouldn't need to go through the same review gates as Ada creating a new token family.

### What Ecosystem-Level Governance Looks Like (Today)

For reference, here's what we currently enforce at the ecosystem level:

- **Token creation**: Always requires human review. Semantic tokens used freely; primitive tokens require prior context or acknowledgment; component tokens require explicit approval. (Token Governance steering doc)
- **Component changes**: Behavioral contracts, schema validation, platform implementation review, metadata accuracy. (Component Development Guide)
- **Metadata changes**: `whenToUse`, `whenNotToUse`, `alternatives`, `purpose` fields reviewed for accuracy. Escape hatches documented with migration triggers. (Spec Planning Standards)
- **Process**: Spec Feedback Protocol with sequential formalization gates. Review triad for vision-level docs. Lessons synthesis at milestone boundaries.

This is appropriate for infrastructure that 8 agents and every future product depend on.

### What Product-Level Governance Should Look Like

Product governance should focus on three things:

**1. Consumption correctness — are you using the ecosystem right?**

This is my primary audit concern during product work. Did Leonardo select the right component? Did Sparky use semantic tokens where they exist? Did the implementation match the spec? The M0a process scaffolding already captures this — the product completion doc template tracks component selections, token usage, and metadata accuracy. This is lightweight and per-screen, not per-artifact.

**2. Extension quality — if you're adding to the ecosystem's surface area, does it meet minimum standards?**

When a product creates a new experience pattern, it should follow the same YAML schema as ecosystem patterns. When a product creates a new semantic token, it should follow the naming conventions and reference existing primitives. When a product creates a component, it should have a schema and behavioral contracts.

But the review depth should be lighter. A product pattern doesn't need the full Spec Feedback Protocol with multi-agent review. It needs: does it follow the schema? Does it reference real ecosystem artifacts? Is it documented enough for the product team to use it? That's it.

**3. Promotion readiness — if a product artifact should become an ecosystem artifact, is it ready?**

This is the bridge between the two governance levels. The design outline's principle #4 ("Promotion is explicit — product content doesn't auto-become system content") is exactly right. When a product pattern proves useful across multiple screens or when a product component solves a problem other products would face, it's a candidate for promotion. At that point, it goes through ecosystem-level governance — full review, behavioral contracts, metadata, the works.

My lesson routing categories already support this. "Pattern candidate" is one of the four categories in the M0a process scaffolding. When I identify a recurring product pattern during milestone synthesis, I flag it for system agents. Peter decides whether to prioritize promotion. If promoted, it enters the ecosystem governance pipeline.

### What Product-Level Governance Should NOT Look Like

- **Not per-artifact human review for product tokens.** If a product needs a `color.brand.primary` semantic token that maps to an existing primitive, the product team should be able to create it and move on. Ada reviews token usage patterns at synthesis points, not per-token.
- **Not sequential formalization gates for product patterns.** A product experience pattern doesn't need requirements → design → tasks. It needs a YAML file that follows the schema and a brief description of when to use it.
- **Not behavioral contract validation for product components at creation time.** If a product creates a simple wrapper component, it doesn't need 10-category behavioral contracts on day one. It needs a schema and basic metadata. If it gets promoted to the ecosystem, contracts come then.
- **Not my full audit checklist for every product artifact.** My audit checklist is designed for milestone-level synthesis, not per-artifact review. Applying it to every product token or pattern would create a bottleneck that kills product velocity.

### The Governance Gradient

Think of it as a gradient, not a binary:

| Level | Artifacts | Review Depth | Change Velocity | Who Governs |
|-------|-----------|-------------|-----------------|-------------|
| **Ecosystem** | Shipped tokens, components, patterns, templates | Full — contracts, metadata, multi-agent review | Slow — spec-driven | Ada, Lina, Thurgood |
| **Product (extending ecosystem)** | Product tokens, patterns, templates, components | Schema compliance, naming conventions, reference validity | Medium — per-screen or per-flow | Stacy (audit), Leonardo (architecture) |
| **Product (internal)** | Screen compositions, product-specific layouts, one-off styling | Minimal — does it work? does it use the ecosystem correctly? | Fast — implementation speed | Sparky/Kenya/Data (self-governed), Stacy (spot-check) |

The middle tier is where the Product MCP governance question lives. Product-created patterns, tokens, and components that extend the ecosystem's surface area need enough governance to be discoverable and correct, but not so much that creating them feels like filing a permit.

### Implications for the Product MCP

If the Product MCP indexes product-created artifacts (patterns, templates, tokens, components), it should enforce schema compliance at index time. If a product pattern YAML doesn't follow the ecosystem schema, the Product MCP should reject it with a clear error — not silently index malformed data. This is the lightest possible governance gate: structural validity, enforced automatically.

Semantic governance (is this pattern well-named? does it overlap with an ecosystem pattern? should it be promoted?) happens at synthesis points — my milestone reviews, not at creation time.

### Honest Caveat

This is all theoretical. We haven't built a product that creates its own patterns, tokens, or components yet. M0a Phase 2 (marketing site) might create a product pattern or two. M0b (WrKing Class) will almost certainly create product tokens (branded theme) and possibly product components. The governance model I'm describing should be treated as a hypothesis — validated and adjusted based on what actually happens when products start extending the ecosystem.

If M0b reveals that product teams need more governance (artifacts are inconsistent, hard to discover, or breaking ecosystem assumptions), we tighten. If it reveals that even this level is too heavy, we loosen. The process scaffolding's self-evaluating "Process Assessment" section at milestone reviews is where we make that call.
