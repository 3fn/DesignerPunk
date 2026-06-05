# OKLCH Color Composition — Pipeline Enhancement Request

**Date**: 2026-06-01
**Context**: Product token audit during Spec 005 cleanup

## Problem

Product code frequently needs "system color at system opacity" — e.g., white at 56% for muted text, white at 64% for secondary content. Currently this requires product tokens because CSS custom properties can't be decomposed into `rgba(var(--color), var(--opacity))`.

## Why OKLCH Solves This

With OKLCH-based token output, product CSS can compose system primitives directly:

```css
.viz-arrow {
  color: oklch(from var(--color-contrast-on-dark) l c h / var(--opacity-056));
}
```

No product token needed. Two system primitives compose at the CSS level. The semantic intent is readable in the code.

## Current Workaround

Product tokens that bake color + opacity into a single value:
```yaml
vizArrowMuted:
  value: "rgba(255, 255, 255, 0.56)"
  rationale: "..."
```

This creates product tokens whose only purpose is composing two system values — tokens that wouldn't need to exist if the pipeline output supported composition.

## Affected Tokens (this product)

- `vizArrowMuted` — white + opacity056
- `vizCommentMuted` — white + opacity072
- `tooltipBackground` — white + opacity096
- `footerTextMuted` — white + opacity064

## Request

When the pipeline moves to OKLCH output (or adds OKLCH variants), these product tokens can be eliminated in favor of direct CSS composition. This is additional justification for the OKLCH migration.

## Browser Support Note

OKLCH relative color syntax: Safari 16.4+, Chrome 119+, Firefox 128+. Well within DesignerPunk's web target.
