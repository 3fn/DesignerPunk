# Proposed Addition to Product-Token-Governance.md: System-First Value Selection

**Date**: 2026-06-09
**Context**: Added to our product's copy of Product-Token-Governance.md on 2026-06-01. Not yet in @3fn/core.
**Origin**: Product token audit during Spec 005 revealed that 3/5 hand-picked opacity values were within 1% of system primitives. Agents were inventing values first and tokenizing second, rather than starting from the system and deviating only with justification.
**Reviewed by**: Leonardo (feasibility), Sparky (implementation impact) — both endorsed with refinements incorporated.

## Proposed Section (insert after "Authoring Workflow", before "Naming Conventions")

---

## System-First Value Selection

**Rule**: Before authoring a product token with a `value:` field, query the relevant system token families. If a system token (semantic or primitive) exists within perceptual tolerance of your intended value, use `ref:` instead.

A `value:` product token requires demonstrating that the nearest system token doesn't serve the need. The `rationale` field must state which system token was considered and why it was rejected.

**Responsibility**: This rule applies at the *authoring* point — Leonardo during screen spec, platform agents when discovering new needs during implementation. Platform agents consuming generated CSS custom properties don't need to worry about ref vs value at consumption time. If Leonardo's spec already includes a `value:` token with rationale, platform agents trust that decision during implementation.

### The Workflow

1. **Identify the value you need** — e.g., "I need 60% opacity on a dark overlay"
2. **Query system tokens (semantic first, then primitives)** — `search_tokens({ family: "opacity" })` or `get_token_family({ family: "opacity" })`. Check semantic tokens first per Core Goals token priority.
3. **Find the nearest token** — e.g., `opacity056` (0.56) and `opacity064` (0.64)
4. **Evaluate perceptual tolerance** — Is the difference visible? See tolerance table below.
5. **Decision**:
   - **Nearest token works** → Use `ref:` (e.g., `ref: opacity064`)
   - **Nearest token doesn't work** → Use `value:` with rationale explaining why (e.g., "opacity064 produces visible text on this specific background where opacity056 does not — tested at both values")

**Prototype escape hatch**: During explicit prototype/exploratory work, values may be authored without the system-first query, marked with `# TODO: snap to system`. These MUST be resolved before the spec leaves design phase — they cannot be carried into implementation unexamined.

### Perceptual Tolerance Guidelines

| Family | Tolerance | Rationale |
|--------|-----------|-----------|
| Opacity | ±0.04 | Below JND (just-noticeable difference) for transparency |
| Spacing | ±1 logical unit | Sub-pixel at standard density; invisible |
| Color (RGB) | ±2 per channel | Below human color discrimination threshold |
| Border width | 0 (exact only) | 1px vs 2px is always visible |
| Radius | ±1 logical unit | Subtle curvature difference; usually invisible |
| Duration (≤300ms) | ±20ms | Short animations are perceptually sensitive |
| Duration (>300ms) | ±50ms | Longer animations tolerate more variance |

**Not covered by tolerance (use exact values or explicit rationale):**
- **z-index** — no perceptual analog; use system z-index tokens or document layering rationale
- **Composite values** (shadows, gradients, clip-paths) — query individual constituent primitives where possible (e.g., shadow offset, blur, opacity separately), but the composite as a whole may be product-specific
- **Percentage-based values** — context-dependent; evaluate whether a system token covers the same intent rather than matching numeric value

### What This Prevents

- Agents inventing "round" values (0.5, 0.6, 0.7) when the system's mathematically-derived values (0.56, 0.64, 0.72) are perceptually identical
- Product tokens that drift from the system without justification
- Retroactive snap-to-system audits that should have been unnecessary

### What This Does NOT Prevent

- Legitimate product-specific values that genuinely fall outside system coverage
- Creative decisions where the exact value matters (e.g., a specific brand color)
- Values in families where no system primitive exists at all

---

## Why This Matters

Evidence from our product audit: 3/5 opacity-based product tokens used values within 1% of system primitives. The developers (Leonardo + Sparky) weren't ignoring the system — they just picked values by instinct first and tokenized second. This rule reverses the order: start with the system, deviate only with justification.
