# Spec 081 Research: Lina — Component Specialist

**Date**: 2026-04-09
**Context**: Read `design-outline.md` § "Design Session 0: Data Boundary" for background. These questions explore your mental model of component ownership and extension.

---

## Questions

6. When a product needs a new component, how do you think those components should be housed and expressed? Are components inherent to DesignerPunk fundamentally different from those added to support a product? Why?

7. If a product needed a component that doesn't exist in the ecosystem, how would you think about whether it belongs in the DesignerPunk ecosystem or stays product-specific?

8. When a product extends or customizes an ecosystem component, how should the system handle that change? What areas around the component's code need to be updated?

---

## Response

### Question 6: How should product components be housed and expressed? Are they fundamentally different from ecosystem components?

**Housing**: Product components should live in the product repo, following the same Stemma directory structure as ecosystem components — `types.ts`, `contracts.yaml`, `schema.yaml`, `component-meta.yaml`, `platforms/`. The structure is the same because the tooling that consumes it is the same. The Application MCP indexes components by walking a directory and parsing schemas. If product components follow the same structure, the Product MCP (or a merged view) can index them with the same code.

**Expression**: Product components should be expressed the same way — same schema format, same contract system, same behavioral contract testing patterns. A `ProductCard` component in WrKing Class should have a `ProductCard.schema.yaml` that looks structurally identical to `Badge-Count-Base.schema.yaml`. The schema format isn't DesignerPunk-specific — it's the language the MCP layer speaks.

**Are they fundamentally different?** Yes, in one important way: **governance scope**.

An ecosystem component (`Button-CTA`, `Container-Base`) is a commitment to every product that installs the package. Changing its API, contracts, or behavior is a breaking change that affects all consumers. It goes through the full Stemma lifecycle — spec, design, behavioral contracts, three-platform implementation, readiness review.

A product component (`LegislationCard`, `RepresentativeAvatar`) is a commitment to one product. It can evolve faster, break its own API without affecting anyone else, and skip governance steps that exist to protect cross-product stability. It doesn't need three-platform implementations if the product is web-only. It doesn't need the full readiness review if the product team is the only consumer.

The *structure* is the same. The *governance weight* is different. The system should support both without forcing product components through ecosystem-level ceremony.

**One thing I'd push back on**: product components should still have `contracts.yaml` and `component-meta.yaml`. Not because governance demands it, but because the MCP layer needs it. If Leonardo queries `find_components({ context: 'legislation-feed' })` and a product component matches but has no metadata, the query returns a useless result. The metadata is the component's interface to the agent layer — without it, the component exists but is invisible to the workflow.

### Question 7: How would you decide if a component belongs in the ecosystem or stays product-specific?

The decision comes down to one question: **would a second product need this?**

Not "could" — "would." Speculative reuse is how ecosystems bloat. A `LegislationCard` is clearly product-specific. A `DataTable` might feel reusable, but until a second product actually needs it, it's speculation.

Concrete criteria I'd use:

**Stays product-specific if:**
- It encodes domain knowledge (legislation, representatives, voting records)
- It composes ecosystem components in a product-specific arrangement (a card layout that's specific to how WrKing Class displays bills)
- It has product-specific props that don't generalize (a `partyAffiliation` prop on a representative card)
- Only one product uses it

**Belongs in the ecosystem if:**
- It's a general UI primitive that multiple products would compose differently (a `DataTable`, a `Tooltip`, a `Modal`)
- It fills a gap in the component taxonomy that the Stemma architecture anticipates (the Component-Family docs list planned components that don't exist yet — those are ecosystem candidates)
- It has no domain knowledge — it's purely structural or interactive
- A second product has actually requested it (not hypothetically)

**The promotion path**: A product component that proves useful gets promoted to the ecosystem through the normal spec process. The product version becomes the reference implementation. Ada creates any needed tokens, I scaffold the ecosystem version with full Stemma structure, Thurgood reviews the spec. The product then migrates from its local version to the ecosystem version.

This is the "promotion is explicit" principle from the MCP Relationship Model. Product content doesn't auto-become system content. Someone makes a deliberate decision, and the full governance process applies.

### Question 8: When a product extends or customizes an ecosystem component, how should the system handle that change?

This depends on what "extends or customizes" means. Three scenarios:

**Scenario A: Product uses ecosystem component with product-specific props via slots.**

Example: Nav-Header-App with product-defined content in its `leading`, `center`, `trailing` slots. This is the intended consumption pattern — the ecosystem component provides structure, the product fills in content. Nothing needs updating. The component's contracts, schema, and metadata are unchanged. The product's screen spec documents what goes in the slots.

**Scenario B: Product creates a wrapper component that composes an ecosystem component.**

Example: `WKCHeader` wraps `Nav-Header-App` with WrKing Class branding, navigation links, and user profile. The wrapper is a product component — it lives in the product repo with its own `schema.yaml` and `component-meta.yaml`. The ecosystem component is unchanged.

What needs updating:
- Product component's `schema.yaml` should declare `composition.internal` referencing the ecosystem component it wraps
- Product component's `component-meta.yaml` should list the ecosystem component in `alternatives` (so agents know the relationship)
- The Product MCP should index the wrapper so `find_components` returns it for relevant contexts

**Scenario C: Product needs to modify an ecosystem component's behavior.**

This is the hard case. If a product needs a `Button-CTA` that behaves differently (different animation, different state management, different accessibility pattern), they have two options:

1. **Fork**: Copy the ecosystem component into the product repo, modify it, maintain it independently. The product version diverges. This is simple but creates drift — when the ecosystem version gets a bug fix, the product fork doesn't get it automatically.

2. **Propose an extension point**: If the modification is generalizable (e.g., "I need a configurable animation duration"), propose it as an ecosystem change. The component gets a new prop, all products benefit. This is slower but sustainable.

What needs updating for a fork:
- Product component's `component-meta.yaml` should note it's a fork of the ecosystem version and why
- The Product MCP should index the fork so agents use it instead of the ecosystem version for this product
- The product's `designerpunk.config.ts` could declare overrides (if we build that mechanism) so the Application MCP knows not to recommend the ecosystem version when the product has a fork

What needs updating for an extension point:
- The ecosystem component goes through the normal spec process (requirements, design, implementation across platforms)
- All existing consumers get the new capability
- The product removes its workaround and uses the new prop

**My strong preference is Scenario B over Scenario C.** Composition over modification. If a product can achieve what it needs by wrapping an ecosystem component, that's always better than forking or modifying it. The wrapper is product-governed, the ecosystem component stays stable, and the boundary is clean.
