---
inclusion: manual
name: Web-Authoring-Standards
description: Shared CSS authoring rules for web platform work — logical properties, token priority, accessibility media queries, focus patterns, product token authoring, and naming schema. Load when writing CSS for components or product screens.
---

# Web Authoring Standards

**Date**: 2026-06-01
**Last Reviewed**: 2026-06-01
**Purpose**: Shared CSS quality rules for all web platform work (components and product screens)
**Organization**: process-standard
**Scope**: cross-project
**Layer**: 2
**Relevant Tasks**: component-development, screen-implementation

---

## Overview

This document defines the CSS authoring standards that apply to all web platform work in DesignerPunk — both Stemma component implementations (Lina) and product screen implementations (Sparky). These are shared rules, not guidelines. Violations produce incorrect output.

**Audience**: Lina (component CSS), Sparky (screen CSS)
**Enforcement**: Both agents treat Hard Rules as non-negotiable. Quality Patterns are expected for components and encouraged for screens.

**Key principle: Hard Rules NEVER get simplified away, regardless of context, time pressure, or screen complexity.**

---

## Hard Rules

These are non-negotiable. Every CSS file — component or screen — must follow these rules.

### 1. Logical Properties

Use CSS logical property equivalents for all directional properties — spacing, sizing, positioning, borders, and overflow. Physical properties (`left`, `right`, `top`, `bottom`, `width`, `height`) are prohibited for directional concerns unless the design explicitly requires physical positioning regardless of writing direction.

```css
/* ✅ CORRECT */
padding-inline: var(--space-inset-200);
padding-block: var(--space-inset-100);
margin-inline-start: var(--space-100);
margin-block-end: var(--space-200);
border-inline-start: var(--border-default) solid var(--color-structure-border);
inset-inline-start: 0;
inline-size: 100%;
max-inline-size: var(--product-layout-content-max-width);
block-size: var(--tap-area-recommended);
overflow-inline: hidden;

/* ❌ WRONG */
padding-left: var(--space-inset-200);
padding-right: var(--space-inset-200);
margin-left: var(--space-100);
margin-bottom: var(--space-200);
border-left: var(--border-default) solid var(--color-structure-border);
left: 0;
width: 100%;
max-width: var(--product-layout-content-max-width);
height: var(--tap-area-recommended);
overflow-x: hidden;
```

**Exceptions**: `text-align: center` is acceptable (no logical equivalent in all browsers). Physical properties are acceptable for decorative transforms (`translateX`) where writing direction is irrelevant.

### 2. Token-Only Values

All spacing, color, typography, motion, radius, border, shadow, z-index, and grid values must use design tokens. If a value category has tokens, use the token.

```css
/* ✅ CORRECT */
padding-inline: var(--space-inset-200);
color: var(--color-action-primary);
font-size: var(--typography-label-md-font-size);
border-radius: var(--radius-100);
transition-duration: var(--motion-button-press-duration);
z-index: var(--z-index-dropdown);

/* ❌ WRONG */
padding-left: 16px;
color: #6200EE;
font-size: 14px;
border-radius: 8px;
transition-duration: 200ms;
z-index: 10;
```

**Exception**: Structural layout declarations with no token equivalent (e.g., `flex: 1`, `grid-template-columns: 1fr 2fr`, `display: grid`, `position: relative`) are acceptable.

**If no system token exists**: The value becomes a product token. See "Product Token Authoring" section below. There is no "hard-code and move on" path for tokenizable value categories.

### 3. Token Priority

When writing screen CSS, check in this order:

1. **Semantic system token** → Use it. (e.g., `--tap-area-recommended`, `--color-action-primary`, `--space-inset-200`)
2. **Primitive system token** → Use when no semantic exists. (e.g., `--space-300`, `--color-cyan-500`)
3. **Product token** → Product-specific value not covered by system tokens. (e.g., `--product-layout-content-max-width`)

There is no step 4. If no system token exists, create a product token.

**Classification heuristic**: If the token name describes purpose or context (`inset`, `grouped`, `action`, `feedback`, `tap-area`), it's semantic. If it describes scale position (`space-200`, `gray-300`, `radius-100`), it's primitive.

**Note**: This priority chain is Sparky's decision tree for screen CSS. Lina follows Core Goals' token selection priority which includes component tokens. Component tokens are not part of Sparky's workflow.

### 4. Focus Patterns

Use `:focus-visible` for keyboard focus indicators. Never use bare `:focus` for visual styling. This applies to both host elements and internal Shadow DOM elements.

```css
/* ✅ CORRECT */
.element:focus-visible {
  outline: var(--accessibility-focus-width) solid var(--accessibility-focus-color);
  outline-offset: var(--accessibility-focus-offset);
}

.element:focus:not(:focus-visible) {
  outline: none;
}

/* ❌ WRONG */
.element:focus {
  outline: 2px solid blue;
}
```

**Shadow DOM note**: Host-level focus (`:host(:focus-visible)`) is handled by the browser's default focus ring unless explicitly styled. Internal focusable elements follow the same `:focus-visible` pattern.

### 5. Reduced Motion

All elements with transitions or animations must respect `prefers-reduced-motion`.

```css
/* ✅ CORRECT */
.element {
  transition: background-color var(--motion-button-press-duration) var(--motion-button-press-easing);
}

@media (prefers-reduced-motion: reduce) {
  .element {
    transition: none;
  }
}

/* ❌ WRONG — no reduced motion handling */
.element {
  transition: background-color 200ms ease;
}
```

### 6. High Contrast Mode

Interactive elements must remain visible in forced-colors mode. This rule is being elevated from inconsistent practice to hard requirement — existing components may need remediation.

```css
/* ✅ CORRECT */
@media (forced-colors: active) {
  .interactive-element {
    border: 1px solid ButtonText;
  }

  .interactive-element:focus-visible {
    outline: 2px solid Highlight;
  }
}
```

**Scope**: Required for interactive elements (buttons, links, inputs, cards with actions). Not required for purely decorative elements.

**Note**: `forced-colors: active` uses system color keywords (`ButtonText`, `Highlight`, `Canvas`, `CanvasText`) — these are the correct values inside this media query, not design tokens.

---

## Quality Patterns

These are expected for component CSS (Lina) and encouraged for product screen CSS (Sparky). Sparky applies full quality by default; simplification is permitted only when Leonardo explicitly marks a screen as prototype or exploratory.

### CSS Organization

Use section headers to organize CSS by concern:

```css
/* ==========================================================================
   Base Styles
   ========================================================================== */

/* ==========================================================================
   Variants
   ========================================================================== */

/* ==========================================================================
   Interaction States
   ========================================================================== */

/* ==========================================================================
   Accessibility
   ========================================================================== */
```

### Comment Standards

Document non-obvious decisions with comments that explain *why*, not *what*:

```css
/* ✅ CORRECT — explains why */
min-height: var(--tap-area-minimum); /* 44px accessibility minimum even though visual design is 40px */

/* ❌ WRONG — restates what the code does */
min-height: var(--tap-area-minimum); /* set min height */
```

### Print Styles

For screens with printable content (reports, receipts, data displays), include print media handling:

```css
@media print {
  .interactive-element {
    background-color: transparent !important;
    color: var(--color-print-default) !important;
    box-shadow: none !important;
  }
}
```

**When to include**: Content screens, data displays, anything a user might reasonably print.
**When to skip**: Modals, navigation, transient UI.

---

## Product Token Authoring (Sparky)

When implementing screens, every value that isn't covered by a system token becomes a product token. There is no "hard-code and move on" path.

### The Rule

If you need a spacing, color, typography, motion, radius, border, shadow, z-index, or grid value and no system token (semantic or primitive) covers it — create a product token immediately.

### Naming Schema

**Mental model**: If only one thing uses it, name it after that thing. If multiple things could use it, name it after what it IS.

**Context-specific values** (tied to a specific UI purpose):

```yaml
# Pattern: {context}{Property}
contentMaxWidth:
  value: 1336
  unitType: logical
  rationale: "Optimized for 70-75 chars per line at body font size"

sidebarMinWidth:
  ref: space800
  description: "Minimum sidebar width for navigation readability"
```

**Property-generic values** (product-wide decision about a CSS property, usable across contexts):

```yaml
# Pattern: {property}{Variant}
borderWeightHeavy:
  value: 3
  unitType: logical
  rationale: "Emphasis border weight for interactive containers"

gapSectionSpacing:
  ref: space400
  description: "Vertical gap between major page sections"
```

**Decision**: Is this value specific to one UI context?
- **YES** → `{context}{Property}` (e.g., `contentMaxWidth`)
- **NO / UNSURE** → `{property}{Variant}` (e.g., `borderWeightHeavy`)

### Discovery Workflow (Before Creating)

1. Identify the value you need and its likely category
2. Query existing product tokens: `get_product_tokens({ category: "{category}" })`
3. **Token exists with same value** → Reuse it
4. **Token exists with similar name but different value** → Flag in Implementation Report (potential inconsistency)
5. **Nothing exists** → Create it following the naming schema

### Canonical Categories

Search these categories for discovery:

| Category | Contains |
|----------|----------|
| `layout` | Widths, heights, grid definitions, structural spacing |
| `spacing` | Gaps, margins, padding values not in system tokens |
| `border` | Border widths, styles specific to the product |
| `color` | Product-specific colors (two-gate justification required) |
| `motion` | Product-specific durations, easings |
| `typography` | Product-specific type scales or adjustments |
| `elevation` | Z-index values, shadow definitions |

If unsure which category, query `get_product_tokens()` with no filter to see all categories in use.

### Promotion Inflection Point

When a context-specific token gets reused in a second context, that's the signal to:
1. Rename it to property-generic (remove the context prefix)
2. Flag in Implementation Report as a promotion candidate

Example: `cardBorderWeight` created for cards, then needed for nav → rename to `borderWeightHeavy`, flag for potential system token promotion.

### Authoring Rules

- Names in **camelCase** (pipeline handles platform conversion)
- `ref` tokens preferred over `value` tokens — reference system tokens when possible
- `value` tokens require `rationale` explaining why no system token fits
- Color tokens require two-gate justification (no system color fits AND not a theme override)
- **Do not encode breakpoints in token names** — responsive application is a consumer concern (use the `usage` field for breakpoint guidance)
- Compound values (box-shadows, complex borders) follow the same schema — name by context or property as appropriate

**For full governance**: See `Product-Token-Governance.md`.

---

## Screen-Specific Guidance (Sparky)

### Default to Full Quality

Apply Quality Patterns (section headers, WHY comments, print styles where relevant) by default. Simplify only when Leonardo explicitly marks a screen as prototype or exploratory.

**Hard Rules always apply regardless.** There is no context where logical properties, token-only values, focus patterns, or reduced motion can be skipped.

### Responsive Patterns

Use system breakpoint tokens for responsive layout. Do not encode breakpoint logic in product token names — tokens define values, CSS media queries define when to apply them.

```css
@media (min-width: var(--breakpoint-md)) {
  .content-area {
    max-inline-size: var(--product-layout-content-max-width);
  }
}
```

### Shadow DOM Context

All rules in this document apply inside Shadow DOM. Specifically:
- Logical properties apply to all Shadow DOM internal styles
- Token consumption works via CSS custom property inheritance through Shadow DOM
- `:focus-visible` applies to both `:host` and internal focusable elements
- `forced-colors` media queries pierce Shadow DOM boundaries (they're global)

---

## Common Mistakes

These are the actual failure patterns that prompted this document:

```css
/* ❌ Physical property instead of logical */
padding-left: var(--space-200);
/* ✅ */ padding-inline-start: var(--space-200);

/* ❌ Hard-coded value instead of token */
max-width: 1336px;
/* ✅ */ max-inline-size: var(--product-layout-content-max-width);

/* ❌ Bare :focus instead of :focus-visible */
.button:focus { outline: 2px solid blue; }
/* ✅ */ .button:focus-visible { outline: var(--accessibility-focus-width) solid var(--accessibility-focus-color); }

/* ❌ No reduced motion handling */
.card { transition: transform 300ms ease; }
/* ✅ Add: */ @media (prefers-reduced-motion: reduce) { .card { transition: none; } }

/* ❌ Hard-coded value without creating product token */
gap: 24px; /* "I'll tokenize this later" — no you won't, session memory is lost */
/* ✅ */ gap: var(--product-spacing-gap-section-spacing);
```

---

## Related Documentation

- **Token-Quick-Reference.md** — Token name lookups and common patterns
- **Product-Token-Governance.md** — Full product token authoring governance
- **platform-implementation-guidelines.md** — Cross-platform implementation patterns
- **Component-Development-Standards.md** — Component-specific development workflow
- **Core Goals.md** — System token priority (semantic → primitive → component)

---

## MCP Query

For the full document:
```
get_document_full({ path: ".kiro/steering/Web-Authoring-Standards.md" })
```

For specific sections:
```
get_section({ path: ".kiro/steering/Web-Authoring-Standards.md", heading: "Hard Rules" })
get_section({ path: ".kiro/steering/Web-Authoring-Standards.md", heading: "Token Priority" })
get_section({ path: ".kiro/steering/Web-Authoring-Standards.md", heading: "Product Token Authoring (Sparky)" })
get_section({ path: ".kiro/steering/Web-Authoring-Standards.md", heading: "Naming Schema" })
```
