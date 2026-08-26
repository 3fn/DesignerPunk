---
id: token-quick-reference
inclusion: manual
name: Token-Quick-Reference
description: Token documentation routing table — maps token types to their MCP document paths and common usage patterns. Load when selecting tokens, finding token documentation, or routing to the right token family guide.
---

# Token Quick Reference

**Date**: 2025-12-01
**Purpose**: Routing table for token documentation - helps AI agents find the right MCP document for each token type
**Organization**: process-standard
**Scope**: cross-project
**Layer**: 2
**Relevant Tasks**: component-development, token-selection, styling
**Last Reviewed**: 2026-08-25

---

## Token System Overview

For comprehensive understanding of the token system architecture, mathematical foundations, and cross-platform strategy, see:
- **Token System Overview**: `docs/token-system-overview.md`

## Purpose

This document serves as a routing table for token documentation—it helps AI agents quickly find the right MCP document for each token type without loading full reference docs. This is not a reference itself; it routes to where values are documented.

## Token Documentation Map

| Token Type | Purpose | MCP Document Path |
|------------|---------|-------------------|
| Color | Semantic color tokens organized by concept (feedback, identity, action, contrast, structure) | `.kiro/steering/Token-Family-Color.md` |
| Spacing | Layout spacing values based on 8px baseline grid (stack, inline, inset patterns) | `.kiro/steering/Token-Family-Spacing.md` |
| Sizing | Component dimensions (width, height, box size) based on 8px grid — separate from spacing | `.kiro/steering/Token-Family-Sizing.md` |
| Typography | Font styles and sizes combining fontSize, lineHeight, fontFamily, fontWeight, letterSpacing | `.kiro/steering/Token-Family-Typography.md` |
| Shadow | Elevation shadows for depth and hierarchy (sm, md, lg, xl levels) | `.kiro/steering/Token-Family-Shadow.md` |
| Glow | Glow effects for emphasis and interactive states | `.kiro/steering/Token-Family-Glow.md` |
| Blend | Color blending and overlay effects | `.kiro/steering/Token-Family-Blend.md` |
| Layering | Z-index layers for stacking context (base, dropdown, modal, toast, tooltip) | `.kiro/steering/Token-Family-Layering.md` |
| Motion | Animation timing and easing (duration, easing curves, transitions) | `.kiro/steering/Token-Family-Motion.md` |
| Radius | Corner rounding values (none, sm, md, lg, xl, full) | `.kiro/steering/Token-Family-Radius.md` |
| Border | Border width values (none, thin, medium, thick) for form elements, cards, dividers | `.kiro/steering/Token-Family-Border.md` |
| Opacity | Transparency values for overlays, disabled states, hover effects | `.kiro/steering/Token-Family-Opacity.md` |
| Accessibility | Focus indicators, tap area sizing (WCAG compliance), icon tokens | `.kiro/steering/Token-Family-Accessibility.md` |
| Responsive | Breakpoints (xs-xxl) and density scaling (compact, normal, comfortable) | `.kiro/steering/Token-Family-Responsive.md` |
| Semantic Structure | Token architecture patterns and primitive→semantic hierarchy | `.kiro/steering/Token-Semantic-Structure.md` |

---

## Mode-Aware Token Lookup (Spec 080)

Semantic color tokens support light/dark mode through a two-level resolution system. Use this guide to determine how a token behaves across modes.

**Prerequisite fact (Spec 112).** Color primitives have **no mode dimension**. A primitive is a single OKLCH triple (`{ l, c, h }`) composed from channel references in `src/tokens/color/` — the same value in light and dark. Mode differentiation therefore happens **only** at the semantic tier, via a theme override. Zero primitives in the system carry differing light/dark values.

### Does My Token Need a Dark Override?

| Question | Answer | Resolution Level |
|----------|--------|-----------------|
| Is the token mode-invariant *by design* (print, glow, scrim, contrast.onLight/onDark)? | Yes → same value in both modes, declared as intentional | Mode-invariant — listed in `MODE_INVARIANT_TOKENS` (`src/validators/ModeParity.ts`); no theme-file entry needed |
| Is the same value correct in both modes? | Yes → no override | **Level 1** — leave the token **commented out** in the dark theme file; it falls back to the base (light) reference |
| Does the token need a *different primitive* in dark mode (role remapping)? | Yes → override needed | **Level 2** — add an active entry to the appropriate theme's SemanticOverrides |

> **Level 1 does not mean "the primitive handles it."** No primitive varies by mode. Level 1 means *the token deliberately resolves to the same value in both modes*, and the commented-out theme-file line is the record of that decision. A token that must actually change in dark mode needs a Level 2 override — there is no other mechanism.

### Level 1 Example (Falls Back to Base — Same Value in Both Modes)

`color.feedback.error.text` references `pink400`. It has no active dark override; the entry sits commented out in the dark theme file (`src/tokens/themes/dark/SemanticOverrides.ts:27`):
```typescript
// color.feedback.error.text: { value: 'pink400' }
```
`pink400` resolves to one OKLCH value used in both modes — `l` 0.55 (`channels/lightness/chromatic.ts`), `c` 0.203 (`channels/chroma/chromatic.ts`), `h` 10 (`channels/hues.ts`). The emitted CSS carries a single value with no `light-dark()` wrapper (`dist/DesignTokens.web.css:527`):
```css
--color-feedback-error-text: oklch(0.55 0.203 10);
```

### Level 2 Example (Semantic Override)

`color.structure.canvas` references `white100` in light mode, but dark mode needs `gray400` (a different primitive). The dark theme overrides the reference (`src/tokens/themes/dark/SemanticOverrides.ts:163`):
```typescript
// Dark theme SemanticOverrides
export const darkSemanticOverrides: SemanticOverrideMap = {
  'color.structure.canvas': { primitiveReferences: { value: 'gray400' } },
};
```
Because the modes now resolve to different values, the generator emits a mode-aware value (`dist/DesignTokens.web.css:559`):
```css
--color-structure-canvas: light-dark(oklch(1 0 260), oklch(0.42 0.018 260));
```

### Which File Actually Changes a Color?

| Goal | Edit | Note |
|------|------|------|
| Make a semantic token differ by mode | The theme's `SemanticOverrides.ts` (Level 2) | The only mechanism that produces mode variance |
| Change a primitive's color value | `src/tokens/color/channels/**` (lightness / chroma / hue) | Changes the primitive in **both** modes and every theme; composed into named primitives in `src/tokens/color/primitives/**` |
| — | ~~`src/tokens/ColorTokens.ts`~~ | **Deprecated (Spec 115).** `SemanticValueResolver.resolveColorPrimitive()` consults `composedColorMap` first, so for all 50 OKLCH primitives the legacy `light`/`dark`/`wcag` slots are never read on the CSS/Swift/Kotlin path. Only the four shadow primitives (`shadowBlack100`, `shadowBlue100`, `shadowOrange100`, `shadowGray100`) still fall through to it. It *is* still the sole source for DTCG/Figma primitive export — see `.kiro/issues/2026-08-25-dual-color-source-divergence.md`. |

### Context Resolution

Mode (light/dark) and theme (base/wcag/custom) are independent dimensions. The base system produces 4 contexts:

| Context | Mode | Theme | Override Source |
|---------|------|-------|----------------|
| light-base | light | base | No overrides (base tokens) |
| light-wcag | light | wcag | WCAG theme SemanticOverrides |
| dark-base | dark | base | Dark theme SemanticOverrides |
| dark-wcag | dark | wcag | Composed: dark + wcag + dark-wcag SemanticOverrides |

**Custom themes (Spec 094)**: Products register additional themes via `designerpunk.config.ts`. Each registered theme adds contexts to the resolution matrix. A dark-only theme adds one context; a theme with mode `'both'` adds two (light + dark).

The **ThemeRegistry** manages all themes. `SemanticOverrideResolver.resolveForRegistry()` produces `ResolvedThemeSet[]` — one entry per theme context.

**Base vs product themes**: The paths in this section (`src/tokens/themes/dark/`, `wcag/`, `dark-wcag/`) are the base system's built-in theme files, shipped with `@3fn/core`. Product teams creating custom themes do NOT edit these files — they create their own `SemanticOverrides.ts` and register it in `designerpunk.config.ts`. See Token-Governance § "Theme Registry (Spec 094)" for product theme governance.

**Theme-varying vs static tokens** — two distinct computations; do not conflate them:

- **Platform generators (iOS/Android/Web dist output)**: a token is theme-varying if its name appears in the registry-wide union of overridden tokens across *all* registered themes (generated as protocol/data-class properties on iOS/Android, `data-theme`-scoped on web). Everything else stays static.
- **Token-index / MCP `themeVarying` field**: `true` iff the token's resolved value differs between base light and base dark — independent of `config.themes`, and excluding WCAG-only overrides that produce no base-mode light/dark variance.

See Rosetta-System-Architecture § Stage 5: Generation for why these two definitions exist.

### Platform Theme Output

| Platform | Theme mechanism | Static tokens | Theme-varying tokens |
|----------|----------------|---------------|---------------------|
| Web | CSS `data-theme` attribute scoping | CSS custom properties on `:root` | Scoped under `:root[data-theme="{name}"]` |
| iOS | `@Environment` with `{Name}Theme` protocol | `DesignTokens` static lets | Struct per theme conforming to protocol |
| Android | `CompositionLocal` with `{Name}Theme` data class | `DesignTokens` object constants | Instance per theme in `{Name}Themes` object |

### Governance Tools

| Tool | Command | Purpose |
|------|---------|---------|
| Mode parity audit | `npm run audit:mode-parity` | Reports Level 1/Level 2/mode-invariant/missing for all color tokens |
| Theme drift audit | `npm run audit:theme-drift` | Diffs generated skeleton against existing theme file |
| Theme skeleton | `npm run generate:theme-skeleton` | Regenerates complete theme file from registry |

### MCP Queries for Mode Architecture

```
get_section({ path: "rosetta-system-architecture", heading: "Stage 4: Mode Resolution (Spec 080)" })
get_section({ path: "token-quick-reference", heading: "Mode-Aware Token Lookup (Spec 080)" })
```

---

## Color Token Concept Lookup

Color tokens follow the **Nathan Curtis concept-first naming model**. Use this table to find the right concept for your use case:

| Concept | Purpose | Token Pattern | Use Cases |
|---------|---------|---------------|-----------|
| **Feedback** | Communicate system status | `color.feedback.{role}.{property}` | Form validation, alerts, notifications, selection states |
| **Identity** | Distinguish entity types | `color.identity.{role}` | Avatars, attribution, human vs agent distinction |
| **Action** | Visual emphasis for interactions | `color.action.{emphasis}` | Buttons, links, CTAs (primary = emphasized, secondary = de-emphasized) |
| **Contrast** | Readable content on backgrounds | `color.contrast.{surface}` | Text/icons on colored surfaces (onLight, onDark) |
| **Structure** | Visual organization and layering | `color.structure.{role}` | Canvas, surface, border colors |
| **Progress** | Communicate position in multi-step flows | `color.progress.{state}.{property}` | Pagination dots, steppers, multi-step forms |

### Feedback Concept Tokens

| Role | Properties | Use Case |
|------|------------|----------|
| `success` | `.text`, `.background`, `.border` | Form validation success, confirmation messages |
| `error` | `.text`, `.background`, `.border` | Form validation errors, error messages |
| `warning` | `.text`, `.background`, `.border` | Caution messages, attention-required indicators |
| `info` | `.text`, `.background`, `.border` | Help text, informational messages |
| `select` | `.text.{state}`, `.background.{state}`, `.border.{state}` | Selection states (rest, default) |

### Identity Concept Tokens

| Token | Use Case |
|-------|----------|
| `color.identity.human` | Human entity visual identity (warm, approachable) |
| `color.identity.agent` | AI agent visual identity (distinct, technical) |

### Action Concept Tokens

| Token | Use Case |
|-------|----------|
| `color.action.primary` | Emphasized actions - hero CTAs, main buttons |
| `color.action.secondary` | De-emphasized actions - list items, repetitive actions |
| `color.action.navigation` | Navigation actions - inline links, breadcrumbs |

**Note**: `primary`/`secondary` represent visual emphasis, not action type. Use `primary` for single, focused instances; `secondary` for repetitive instances to avoid UI over-saturation.

### Contrast Concept Tokens

| Token | Use Case |
|-------|----------|
| `color.contrast.onLight` | Dark content on light backgrounds |
| `color.contrast.onDark` | Light content on dark/colored backgrounds |
| `color.contrast.onAction` | Content on action-colored backgrounds (theme-conditional) |

### Structure Concept Tokens

| Token | Use Case |
|-------|----------|
| `color.structure.canvas` | Base canvas - page backgrounds |
| `color.structure.surface` | Elevated surface - cards, containers |
| `color.structure.border` | Standard borders - UI element borders, dividers |
| `color.structure.border.subtle` | Semi-transparent borders (baked-in alpha) |

### Progress Concept Tokens

| State | Properties | Use Case |
|-------|------------|----------|
| `current` | `.background`, `.text` | Active position indicator ("you are here") |
| `pending` | `.background`, `.text`, `.connector` | Upcoming/incomplete steps |
| `completed` | `.background`, `.text`, `.connector` | Finished steps (typically with checkmark) |
| `error` | `.background`, `.text` | Steps with problems requiring attention |

### Component Tokens

Component tokens follow the pattern `color.{component}.{variant}.{property}`:

| Component | Tokens | References |
|-----------|--------|------------|
| Avatar | `color.avatar.{human\|agent}.{background\|icon}` | Identity, Contrast concepts |
| Badge | `color.badge.notification.{background\|text}` | Direct primitive references |

---

## Common Patterns

These are frequently used token combinations for common UI scenarios:

### Button Component
- **Typography**: `Token-Family-Typography.md` → label sizes (labelSm, labelMd, labelLg)
- **Spacing**: `Token-Family-Spacing.md` → inset patterns for padding
- **Color**: `Token-Family-Color.md` → `color.action.primary`, `color.action.secondary`, `color.contrast.onAction`
- **Radius**: `Token-Family-Radius.md` → button radius (typically md)
- **Border**: `Token-Family-Border.md` → button borders (thin for outlined variants)

### Card Component
- **Shadow**: `Token-Family-Shadow.md` → elevation (sm, md for cards)
- **Radius**: `Token-Family-Radius.md` → card radius (lg)
- **Spacing**: `Token-Family-Spacing.md` → inset and stack patterns
- **Border**: `Token-Family-Border.md` → card borders (thin)
- **Color**: `Token-Family-Color.md` → `color.structure.surface`, `color.structure.border`

### Form Input
- **Typography**: `Token-Family-Typography.md` → body sizes for input text
- **Border**: `Token-Family-Border.md` → input borders (thin, medium for focus)
- **Radius**: `Token-Family-Radius.md` → input radius (sm, md)
- **Spacing**: `Token-Family-Spacing.md` → inset for padding
- **Color**: `Token-Family-Color.md` → `color.feedback.error.text`, `color.feedback.success.text` for validation
- **Accessibility**: `Token-Family-Accessibility.md` → focus indicators, tap areas

### Alert/Notification
- **Color**: `Token-Family-Color.md` → Feedback concept tokens:
  - Success: `color.feedback.success.{text|background|border}`
  - Error: `color.feedback.error.{text|background|border}`
  - Warning: `color.feedback.warning.{text|background|border}`
  - Info: `color.feedback.info.{text|background|border}`
- **Radius**: `Token-Family-Radius.md` → alert radius (md)
- **Spacing**: `Token-Family-Spacing.md` → inset patterns

### Avatar Component
- **Color**: `Token-Family-Color.md` → Identity and Contrast concepts:
  - Human: `color.avatar.human.background`, `color.avatar.human.icon`
  - Agent: `color.avatar.agent.background`, `color.avatar.agent.icon`
  - Border: `color.avatar.default.border`
- **Radius**: `Token-Family-Radius.md` → full (circular)

### Progress Indicator (Pagination/Stepper)
- **Color**: `Token-Family-Color.md` → Progress concept tokens:
  - Current: `color.progress.current.{background|text}`
  - Pending: `color.progress.pending.{background|text|connector}`
  - Completed: `color.progress.completed.{background|text|connector}`
  - Error: `color.progress.error.{background|text}`
- **Spacing**: `Token-Family-Spacing.md` → Progress component tokens:
  - Node sizes: `progress.node.size.{sm|md|lg}` (base), `progress.node.size.{sm|md|lg}.current` (emphasized)
  - Gaps: `progress.node.gap.{sm|md|lg}`
  - Connector: `progress.connector.thickness`
- **Accessibility**: `Token-Family-Accessibility.md` → tap areas for interactive nodes

### Modal/Dialog
- **Shadow**: `Token-Family-Shadow.md` → elevation (xl for modals)
- **Layering**: `Token-Family-Layering.md` → modal z-index layer
- **Opacity**: `Token-Family-Opacity.md` → backdrop overlay
- **Radius**: `Token-Family-Radius.md` → modal radius (lg, xl)
- **Motion**: `Token-Family-Motion.md` → enter/exit animations
- **Color**: `Token-Family-Color.md` → `color.structure.surface` for modal background

### Interactive States
- **Opacity**: `Token-Family-Opacity.md` → disabled states, hover effects
- **Color**: `Token-Family-Color.md` → `color.feedback.select.*` for selection states
- **Motion**: `Token-Family-Motion.md` → transition timing
- **Accessibility**: `Token-Family-Accessibility.md` → focus ring tokens

### Responsive Layout
- **Responsive**: `Token-Family-Responsive.md` → breakpoints for layout changes
- **Spacing**: `Token-Family-Spacing.md` → responsive spacing adjustments
- **Typography**: `Token-Family-Typography.md` → responsive font scaling

## MCP Query Examples

Use these MCP queries to access token documentation progressively:

### Get Document Summary
Returns metadata and outline (~200 tokens) to understand document structure:

```
get_document_summary({ path: "token-family-color" })
get_document_summary({ path: "token-family-spacing" })
get_document_summary({ path: "token-family-typography" })
```

### Get Specific Section
Returns targeted content (~2,000 tokens) for specific information:

```
// Get color concept tokens by category
get_section({ path: "token-family-color", heading: "Feedback Concept" })
get_section({ path: "token-family-color", heading: "Identity, Action, Contrast, Structure, Progress" })

// Get primitive color families
get_section({ path: "token-family-color", heading: "Neutral Partition" })
get_section({ path: "token-family-color", heading: "Chromatic Families" })

// Get spacing scale values
get_section({ path: "token-family-spacing", heading: "Primitive Spacing Tokens" })

// Get typography composition patterns
get_section({ path: "token-family-typography", heading: "Typography Token Categories" })

// Get shadow elevation levels
get_section({ path: "token-family-shadow", heading: "Shadow Semantic Tokens" })

// Get radius values
get_section({ path: "token-family-radius", heading: "Primitive Radius Tokens" })

// Get border width values
get_section({ path: "token-family-border", heading: "Primitive Border Width Tokens" })

// Get opacity values
get_section({ path: "token-family-opacity", heading: "Primitive Opacity Tokens" })

// Get breakpoint values
get_section({ path: "token-family-responsive", heading: "Breakpoint Tokens" })

// Get tap area requirements
get_section({ path: "token-family-accessibility", heading: "Tap Area Tokens" })
```

### Get Full Document
Returns complete content (2,000-15,000 tokens) when comprehensive reference needed:

```
get_document_full({ path: "token-family-color" })
```

### Recommended Workflow

1. **Start with this Quick Reference** to identify which token docs you need
2. **Use the Color Token Concept Lookup** to find the right concept for your use case
3. **Query document summary** to understand structure
4. **Query specific sections** for targeted information
5. **Query full document** only when comprehensive reference is required

### Color Token Selection Decision Tree

```
What are you building?
├─ Status/Feedback UI (alerts, validation, notifications)
│   └─ Use: color.feedback.{success|error|warning|info}.{text|background|border}
├─ Selection/Toggle UI (checkboxes, radio, tabs)
│   └─ Use: color.feedback.select.{text|background|border}.{rest|default}
├─ Entity Distinction (avatars, attribution)
│   └─ Use: color.identity.{human|agent}
├─ Interactive Elements (buttons, links)
│   └─ Use: color.action.{primary|secondary}
├─ Content on Colored Backgrounds
│   └─ Use: color.contrast.{onLight|onDark}
└─ Page Structure (backgrounds, surfaces, borders)
    └─ Use: color.structure.{canvas|surface|border}
```

---

## Related Documentation

### Token System
- [Token System Overview](../../docs/token-system-overview.md) - Complete token system architecture
- [Rosetta System Architecture](rosetta-system-architecture) - Token pipeline architecture
- [Token Governance](token-governance) - Token selection and creation governance

### DTCG Integration
- [DTCG Integration Guide](dtcg-integration-guide) - Integrating DesignerPunk tokens with external design tools
- [Figma Workflow Guide](figma-workflow-guide) - Bidirectional Figma integration: token push and design extraction
- [Transformer Development Guide](transformer-development-guide) - Building custom token transformers
- [MCP Integration Guide](mcp-integration-guide) - Programmatic token loading and querying
