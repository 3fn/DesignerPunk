# Design Outline: Product Tokens — Reference Validation & Platform Generation

**Date**: 2026-05-25
**Spec**: 109 - Product Tokens — Reference Validation & Platform Generation
**Status**: Design Outline (Preliminary)
**Author**: Thurgood (with Peter)
**Depends on**: Spec 108 (Product Tokens — Source Format & MCP Discoverability)

---

## Problem Statement

Spec 108 establishes the source format for product tokens and makes them queryable via the Product MCP. This spec addresses the remaining infrastructure:

1. **Reference validation** — ensuring `ref` values point to tokens that actually exist, detecting drift, and reporting broken references as a governance concern
2. **Platform generation** — producing CSS custom properties, Swift constants, and Kotlin objects from the YAML source format
3. **Pipeline integration** — extending `designerpunk.config.ts` and the CLI to include product tokens in the generation workflow

---

## What We Know (From Spec 108)

### Source Format (Settled)

- YAML files in `product/tokens/{category}.yaml`
- Token entries have `value` (with `unitType` + `rationale`) or `ref` (canonical token name)
- `platforms` field filters applicability per token
- `usage` field provides optional consumption guidance
- Category filenames allow lowercase ASCII + hyphens

### Unit Type System (Settled)

| unitType | Web | iOS | Android |
|----------|-----|-----|---------|
| `logical` | `px` | `CGFloat` | `.dp` |
| `duration` | `ms` | `TimeInterval` | `Long` (ms) |
| `ch` | `ch` | N/A | N/A |
| `ratio` | unitless | unitless | unitless |
| `count` | unitless | `Int` | `Int` |
| `percent` | `%` | `CGFloat` (0-1) | `Float` (0-1) |
| `color` | hex/rgb | `UIColor` | `Color` |

### Naming Convention (Settled)

- CSS: `--product-{category}-{token-name}` (kebab-case)
- Swift: `Product{Category}.{tokenName}` (PascalCase namespace, camelCase member)
- Kotlin: `Product{Category}.{tokenName}` (PascalCase object, camelCase val)
- Category hyphens transform: `layout-grid` → `ProductLayoutGrid`

### Reference Resolution (Settled in Spec 108)

- Product MCP already resolves refs at query time by reading `token-index/`
- Canonical token names map to `token-index/*.yaml` keys
- Unresolved refs produce warnings (not errors) in query responses

### Consumption Rule (Settled)

Platform output units are applied by the generation pipeline. Consumers use generated constants, never appending units manually. Same rule as system tokens.

---

## What This Spec Addresses

### 1. Reference Drift Detection & Validation Reporting

**What we know:**
- Spec 108's Product MCP reports unresolved refs as warnings at query time
- This spec adds proactive validation: a CLI command or build step that checks all product token refs against the current token index
- Broken refs should be surfaced as governance issues, not just query-time warnings

**Placeholders (TBD from Spec 108 implementation experience):**
- What's the right UX for reporting broken refs? CLI output? Health dashboard? Both?
- Should broken refs block generation, or generate with a warning comment?
- How frequently does staleness actually occur in practice? (Spec 108 usage will inform this)

### 2. Platform Code Generation

**What we know:**
- Output formats per platform (see naming convention above)
- `ref` tokens resolve to the referenced token's generated constant (e.g., `var(--space-300)` in CSS, `DesignTokens.space300` in Swift)
- Hard `value` tokens emit the value with platform-appropriate unit
- Platform filtering: tokens with `platforms: [web]` only appear in web output

**Placeholders (TBD):**
- Output file location: `dist/tokens/ProductValues.{platform}.{ext}`? Or co-located with system token output?
- Load order on web: system tokens → product tokens → component styles. Needs confirmation from Sparky.
- How do `ref` tokens that point to semantic tokens render? `var(--color-feedback-error-text)` in CSS — need to confirm the canonical→CSS mapping rule (Sparky F1 from Spec 108 feedback)
- Should generated files include comments with `description` and `rationale`? (DX consideration)

### 3. Pipeline Integration

**What we know:**
- `designerpunk.config.ts` needs a way to point at the product tokens source directory
- `npx designerpunk generate` should include product token output alongside system token output
- The generation should validate refs before emitting (fail-fast on broken refs)

**Placeholders (TBD):**
- Config shape: `productTokens: './product/tokens'` as a path in `defineConfig()`?
- Should product token generation be opt-in (explicit config) or automatic (detect `product/tokens/` directory)?
- Relationship to `tokenSource` config option — does local token source affect ref resolution for product tokens?

---

## Open Questions (To Be Informed by Spec 108)

### Q1: Canonical → platform name mapping rule

Sparky flagged this in Spec 108 feedback. The rule for transforming canonical token names to platform output names needs to be defined:
- `space300` → `--space-300` (number boundary insertion?)
- `color.feedback.error.text` → `--color-feedback-error-text` (dots → hyphens)
- `duration350` → `--duration-350`

This rule exists implicitly in the current generation pipeline. It needs to be extracted and documented for product token generation to use the same logic.

### Q2: Generation pipeline architecture

Should product token generation:
- **A**: Be a new generator alongside `WebBuilder`, `iOSBuilder`, `AndroidBuilder`
- **B**: Be an extension to the existing builders (they already know how to emit platform-specific code)
- **C**: Be a standalone lightweight generator (product tokens are simpler than system tokens — no math validation, no formula evaluation)

Ada's input needed on how this fits with the existing `BuildOrchestrator` architecture.

### Q3: Ref resolution at generation time vs index time

Spec 108's Product MCP resolves refs by reading `token-index/`. The generation pipeline has direct access to the token source (it's building the tokens). Should generation:
- **A**: Also read `token-index/` (consistent with Product MCP, but depends on index being current)
- **B**: Resolve refs directly from token source (more accurate, but different code path than MCP)

### Q4: Promotion workflow tooling

When a product token is promoted to a system token:
- The product token YAML entry should be replaced with a `ref` to the new system token
- The generated output changes from a hard value to a reference
- Consumers shouldn't notice (the CSS variable name changes from `--product-*` to the system token name)

What tooling (if any) supports this migration? Or is it a manual process with documentation?

---

## Scope

**In scope:**
- Reference validation CLI command (`npx designerpunk validate --product-tokens`)
- Platform code generation for product tokens (CSS, Swift, Kotlin)
- `designerpunk.config.ts` extension for product token source path
- Integration with existing `npx designerpunk generate` command
- Canonical → platform name mapping documentation

**Out of scope:**
- Source format changes (settled in Spec 108)
- Product MCP tool changes (settled in Spec 108)
- Promotion workflow automation (future spec)
- Product token authoring tooling (IDE extensions, scaffolding)

---

## Dependencies

| Dependency | What we need | Status |
|------------|-------------|--------|
| Spec 108 implementation | Stable YAML format, working Product MCP indexer, real-world usage patterns | Not started |
| Existing generation pipeline | Understanding of `BuildOrchestrator`, platform builders, `UnitConverter` | Available (Ada's domain) |
| `designerpunk.config.ts` | Current `defineConfig` interface and extension patterns | Available (Spec 094/103/104) |
| Token index format | Structure of `token-index/*.yaml` for ref resolution | Available |

---

## Next Steps

1. Complete Spec 108 implementation
2. Gather real-world usage data (how many product tokens, how often refs break, what categories emerge)
3. Formalize this outline into requirements based on implementation experience
4. Get Ada's input on generation pipeline architecture (Q2)
5. Get Sparky's input on canonical→CSS mapping rule (Q1) and load order
