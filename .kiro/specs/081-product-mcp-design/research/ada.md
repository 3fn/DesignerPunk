# Spec 081 Research: Ada — Token Specialist

**Date**: 2026-04-09
**Context**: Read `design-outline.md` § "Design Session 0: Data Boundary" for background. These questions explore your mental model of token ownership.

---

## Questions

4. When a product needs a new token, how do you think those tokens should be housed and expressed? Are tokens inherent to DesignerPunk fundamentally different from tokens added to support a product? Why?

5. When would you want a product developer to discover on their own vs consult with you on token needs directly? If you were helping a product developer create a new semantic token, what context would you need about the product to give good guidance?

---

## Response

### Question 4: How should product tokens be housed and expressed?

Product tokens should live in the product repo, not in `@designerpunk/core`. The `designerpunk.config.ts` already supports this — a product registers themes with semantic overrides, and the pipeline generates outputs. But themes only remap existing semantic tokens to different primitives. A product that needs a *new* token — say, `color.legislation.active` for WrKing Class — needs somewhere to define it.

I think product tokens should be expressed the same way as DesignerPunk tokens: as `SemanticOverrideMap` entries or as new semantic token definitions that reference existing primitives. The mechanism is the same. The housing is different — they live in the product repo's `themes/` or `tokens/` directory, not in `@designerpunk/core/src/tokens/`.

**Are they fundamentally different?** Honestly, yes and no.

No, in the sense that the mechanism is identical. A product semantic token references a primitive the same way a DesignerPunk semantic token does. `color.legislation.active` pointing to `cyan300` is structurally identical to `color.action.primary` pointing to `cyan300`. The pipeline doesn't care where the definition lives.

Yes, in the sense that DesignerPunk tokens are the *shared vocabulary* — they encode design intent that's reusable across any product. `color.action.primary` means "the primary interactive color" in any context. Product tokens encode *product-specific intent* — `color.legislation.active` only means something in WrKing Class. If a product token turns out to be reusable (multiple products need a "legislation" concept), that's a signal it should be promoted to the ecosystem. But it starts as product-scoped.

The practical implication: the pipeline needs to support product-defined tokens alongside ecosystem tokens. The config already handles themes (semantic overrides). It doesn't yet handle new token *creation* — a product can remap existing tokens but can't define new ones that don't exist in the ecosystem. That's a gap. The config would need a `tokens` field (or similar) where products define new semantic tokens that the pipeline includes in generation.

HOWEVER — there's a governance tension here. DesignerPunk's token governance says all token creation requires human review. If a product can define arbitrary tokens in their config, they bypass the governance layer. The counter-argument is that product tokens are product-scoped — they don't affect the ecosystem. The governance layer protects the shared vocabulary, not product-specific extensions. I think that's the right boundary, but it's worth being explicit about.

### Question 5: Self-service vs consultation, and what context I'd need

**When to discover on their own:**

- Choosing which existing semantic token to use for a given purpose — that's what the MCP layer is for. `find_components`, `get_prop_guidance`, the token governance docs. A product developer (or their AI agent) should be able to query "what token do I use for a primary action color?" and get `color.action.primary` without involving me.
- Remapping existing semantic tokens for their theme — that's the `SemanticOverrides.ts` workflow. The developer picks which primitives their theme maps to. The existing primitives are the palette; the developer chooses from it.
- Using primitive tokens directly when no semantic exists — the governance allows this with acknowledgment. A product developer who needs `space075` because no semantic spacing token fits their layout can use it.

**When to consult with me:**

- Creating a new semantic token that doesn't exist in the ecosystem. This is where product-specific intent meets the mathematical foundation. If WrKing Class needs `color.legislation.active`, someone needs to decide: does it reference an existing primitive? Does it need a new primitive? Does it fit the existing semantic category structure, or does it need a new category? These are architectural decisions that affect how the token composes with the rest of the system.
- When they're unsure whether their need is a new token or a misunderstanding of an existing one. "I need a token for the background of a highlighted card" — is that `color.feedback.select.background.rest`? Or `color.structure.surface.secondary`? Or something new? The answer depends on the semantic intent, which requires conversation.
- When they want to extend the primitive palette. New color ramps, new spacing values, new type scale entries — these affect the mathematical foundation and need to be validated against the existing relationships.

**What context I'd need about the product:**

1. **What the token represents semantically** — not "I need a blue color" but "I need a color that indicates active legislation that the user is currently reviewing." The semantic intent drives the naming, the category, and the primitive selection.
2. **How it relates to existing tokens** — is this a variant of an existing concept (like `color.feedback.select` but for a different context)? Or genuinely new? If it's a variant, it should probably reference the same primitives with a different semantic name. If it's new, it needs its own primitive mapping.
3. **Whether it needs to work across themes** — does `color.legislation.active` need to look different in the WrKing Class dark theme vs light theme? If so, it needs mode-aware values. If it's always the same color regardless of theme, it's simpler.
4. **Whether it's truly product-specific or potentially reusable** — if three products all need a "status indicator" token, that's an ecosystem token, not a product token. Knowing the product's domain helps me assess whether the need is unique or general.

The honest answer is: I'd rather be consulted too often than too little. A five-minute conversation about "is this the right token?" prevents a week of refactoring when the wrong token is baked into product screens. The MCP layer handles the common cases. The edge cases — new tokens, ambiguous semantics, mathematical foundation questions — are where I add value.

---
