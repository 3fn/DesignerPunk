# Meridian Design System

Meridian is a small, in-house, **web-only** design system maintained by a single product team. It is intentionally minimal — flat color tokens, a simple pixel-based spacing scale, and a handful of hand-written CSS components. There is no build pipeline, no cross-platform output, and no mathematical relationship between token values (they were picked by eye and refined through use).

## What exists

- `tokens.json` — flat token definitions:
  - `colors`: hex values (`brand-blue`, `brand-blue-dark`, `brand-red`, `text-primary`, `text-secondary`, `background`, `border`)
  - `spacing`: a fixed pixel list `[4, 8, 12, 16, 24, 40]` — no scale formula, just the values the team has needed so far
  - `radius`: three named pixel values
  - `fontSizes`: four named pixel values
- `components/button.css` — a single button component with a default and secondary visual style, and a `:hover` state. No focus style, no active/pressed style, and **no disabled state at all**.
- This README.

## Known gap

Meridian has **no disabled-state guidance anywhere** in the system:
- No `disabled` token (color, opacity, or otherwise) in `tokens.json`
- No `.meridian-button:disabled` or `[disabled]` styling in `components/button.css`
- No documentation describing how a disabled control should look, behave, or be marked up for accessibility

This gap has come up in product reviews more than once but has never been resolved. The team would like guidance on how to add disabled-state support that fits Meridian's existing style (flat hex tokens, px spacing, plain CSS) — not a wholesale redesign.
