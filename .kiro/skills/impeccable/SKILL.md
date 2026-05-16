---
name: impeccable-dp
description: Design creation and critique skill adapted for DesignerPunk. Uses MCP queries for context instead of static files. Covers interface design, visual direction, critique, audit, polish, and all Impeccable commands filtered through DesignerPunk's token system and design philosophy.
version: 1.0.0
license: Apache 2.0. Adapted from Impeccable by Paul Bakaus (Apache 2.0). See NOTICE.md for attribution.
---

Designs and iterates production-grade frontend interfaces using DesignerPunk's design language. Real working code, committed design choices, exceptional craft — filtered through DesignerPunk's mathematical token system and behavioral contracts.

## Setup

Before any design work:
1. Load design philosophy context via MCP queries (see Context Loading below).
2. Identify the register (brand or product) from Product MCP.
3. Load the matching register reference (`brand-dp.md` or `product-dp.md`).
4. If a specific command is invoked (e.g., `craft`, `shape`, `audit`), load its reference file.

### Context Loading (replaces load-context.mjs)

Query DesignerPunk's MCP infrastructure for design context:

```
1. Application MCP: get_design_philosophy()    → north star, description, characteristics
2. Application MCP: get_design_rules()         → named constraints with rationale
3. Application MCP: get_design_guidance()      → categorized do's and don'ts
4. Application MCP: get_color_strategy()       → four-tier color vocabulary
5. Product MCP: get_product_overview()         → register, platforms, description
6. Product MCP: get_brand_context()            → personality, voice, anti-references (if configured)
```

If Application MCP is unavailable: proceed with token-only guidance. Note limitation.
If design philosophy is not authored: proceed with DesignerPunk token semantics and component contracts. Note limitation.
If brand context is not configured: use register defaults from the register reference file.

### Register

Every design task is **brand** (marketing, landing, portfolio, presentation: design IS the product) or **product** (app UI, dashboard, settings, tool: design SERVES the product).

Determine from Product MCP's `get_product_overview()` register field. If not set, infer from the surface being designed:
- Brand signals: `/`, `/about`, hero sections, marketing content, presentations
- Product signals: `/app/*`, `/dashboard`, `/settings`, forms, data tables, authenticated surfaces

Load the matching reference: `reference/brand-dp.md` or `reference/product-dp.md`.

## DesignerPunk Design Laws

These override Impeccable's shared design laws where they conflict:

### Spacing
- **8px baseline grid** for layout (NOT 4pt). Typography on 4px sub-grid. All elements cumulatively align to multiples of 8.
- Use semantic spacing tokens: `space.grouped.*`, `space.related.*`, `space.separated.*`, `space.sectioned.*`, `space.inset.*`
- `space075` (6) and `space125` (10) are valid for typographic alignment.

### Color
- Use DesignerPunk's semantic color tokens (`color.action.primary`, `color.feedback.error.*`, etc.)
- Semantic roles: cyan=action, purple=tech/data, pink=error, yellow=attention, green=success, orange=warning, teal=info
- Glow effects for surface layering with complementary color pairings
- Mode-neutral: both light and dark must feel intentionally DesignerPunk

### Typography
- **Rajdhani** (display/headings), **Figtree** (body/UI), **Commit Mono** (code/data/tokens)
- Do NOT apply Impeccable's font selection procedure or reflex-reject list. Fonts are system-defined.
- Weight contrast for hierarchy within families, not font switching.
- Cap body at 65-75ch.

### Motion
- Expo-out on web/Android. Spring physics on iOS.
- No bounce. No elastic on web/Android. (iOS spring is the exception.)
- `prefers-reduced-motion` on everything.

### Elevation
- Surface lightness progression for depth (not shadow intensity)
- Shadows tinted toward blue or gray (warm-light-cool-shadow principle)
- Glow effects for accent emphasis (same-hue glow, complementary pairings)

### Absolute Bans (kept from Impeccable)
- Side-stripe borders (border-left/right > 1px as accent)
- Gradient text (background-clip: text + gradient)
- Glassmorphism as default
- Hero-metric template
- Identical card grids
- Modal as first thought

### Conflict Resolution

When Impeccable's domain references conflict with DesignerPunk:
```
Priority 1: DesignerPunk token values
Priority 2: DesignerPunk named design rules
Priority 3: DesignerPunk behavioral contracts
Priority 4: Impeccable domain knowledge (universal principles)
Priority 5: Impeccable taste opinions (where DP is silent)
```

Note conflicts in output: `[CONFLICT] Impeccable recommends X. DesignerPunk uses Y. → Applying DesignerPunk (Priority N).`

## Commands

All commands from Impeccable are available, adapted for DesignerPunk context:

| Command | Category | Description | Reference |
|---------|----------|-------------|-----------|
| `craft` | Build | Shape, then build end-to-end | reference/craft.md |
| `shape` | Build | Plan UX/UI before code | reference/shape.md |
| `extract` | Build | Pull reusable tokens/components (governance-aware) | reference/extract-dp.md |
| `critique` | Evaluate | UX design review | reference/critique.md |
| `audit` | Evaluate | Technical quality checks | reference/audit.md |
| `polish` | Refine | Final quality pass | reference/polish.md |
| `bolder` | Refine | Amplify safe designs | reference/bolder.md |
| `quieter` | Refine | Tone down aggressive designs | reference/quieter.md |
| `distill` | Refine | Strip to essence | reference/distill.md |
| `harden` | Refine | Production-ready: errors, i18n, edge cases | reference/harden.md |
| `onboard` | Refine | First-run flows, empty states | reference/onboard.md |
| `animate` | Enhance | Add purposeful motion | reference/animate.md |
| `colorize` | Enhance | Add strategic color | reference/colorize.md |
| `typeset` | Enhance | Improve typography | reference/typeset.md |
| `layout` | Enhance | Fix spacing and hierarchy | reference/layout.md |
| `delight` | Enhance | Add personality | reference/delight.md |
| `overdrive` | Enhance | Push past conventional limits | reference/overdrive.md |
| `clarify` | Fix | Improve UX copy | reference/clarify.md |
| `adapt` | Fix | Adapt for different devices | reference/adapt.md |
| `optimize` | Fix | Performance improvements | reference/optimize.md |
| `live` | Iterate | Visual variant mode in browser | reference/live.md |

**Excluded commands:** `teach` and `document` (replaced by MCP authoring workflow).

### Routing Rules
1. **No argument**: Show command table. Ask what to do.
2. **First word matches a command**: Load its reference file and follow instructions.
3. **First word doesn't match**: General design invocation. Apply setup, DesignerPunk design laws, and register reference.

## DesignerPunk-Specific Additions

Beyond Impeccable's standard flow, always:
- Validate component composition via `validate_assembly()` and `check_composition()`
- Select components via `find_components()` and `get_prop_guidance()`
- Reference behavioral contracts for state coverage (not just a checklist)
- Declare color strategy tier for every surface
- Check named design rules as constraints during implementation
- Run anti-slop checks (first-order and second-order category-reflex)
