# Product register (DesignerPunk-adapted)

When design SERVES the product: app UIs, dashboards, settings panels, authenticated surfaces, task-focused screens. The user is in a workflow; the interface should disappear into the task.

## The DesignerPunk product slop test

Would a user fluent in the best tools (Linear, Figma, Notion, Raycast) sit down and trust this interface? Product UI's failure mode isn't flatness; it's strangeness without purpose. The tool should disappear into the task while still feeling unmistakably DesignerPunk through its color precision and spacing rhythm.

## Typography

- **System fonts are NOT the default.** DesignerPunk products use Figtree (body), Commit Mono (code/data), Rajdhani (display). These are the system's fonts.
- One family (Figtree) carries headings, buttons, labels, body, data in product UI. Rajdhani reserved for page-level titles only.
- Fixed rem scale, not fluid. Product UI users view at consistent DPI.
- Tighter scale ratio (1.125-1.2 between steps) than brand surfaces.
- Line length still applies for prose (65-75ch). Data and compact UI can run denser.

## Color

Product surfaces default to **Restrained** color strategy. One accent (cyan for actions) at 10% or less.

- Semantic color vocabulary for states: use `color.feedback.*` tokens (success=green, error=pink, warning=orange, info=teal, select=cyan)
- Accent color (cyan) for primary actions, current selection, and state indicators only
- Purple for tech/data elements (code blocks, token displays, system information)
- Blend utilities for hover/pressed/disabled states (don't hardcode state colors)
- Both light and dark modes must work. Product surfaces are mode-neutral.

### Component selection via MCP

When selecting components for product screens, query the Application MCP:
- `find_components({ context })` for contextual component discovery
- `get_prop_guidance()` for variant selection rules
- `validate_assembly()` to verify composition correctness
- `check_composition()` for parent-child rules

## Layout

- Predictable grids. Consistency IS an affordance.
- Familiar patterns: top bar, side nav, breadcrumbs, tabs. Don't reinvent for flavor.
- Use semantic spacing tokens to encode relationships:
  - `space.grouped.*` for tightly related elements (form field + label)
  - `space.related.*` for moderately related elements (cards in a section)
  - `space.separated.*` for distinct elements (sections)
  - `space.sectioned.*` for major divisions (page regions)
  - `space.inset.*` for internal padding
- Responsive behavior is structural (collapse sidebar, responsive table), not fluid typography.

## Components

Every interactive component has behavioral contracts defining: default, hover, focus, active, disabled, loading, error states. Reference contracts via Application MCP `get_component_full()`.

- Skeleton states for loading, not spinners in the middle of content
- Empty states that teach the interface
- Consistent affordances across the surface (same button shape, same form vocabulary, same icon style)

## Motion

- 150-250ms on most transitions. Users are in flow; don't make them wait.
- Motion conveys state, not decoration. State change, feedback, loading, reveal: nothing else.
- No orchestrated page-load sequences. Product loads into a task.
- Expo-out easing on web/Android. Spring physics on iOS.
- `prefers-reduced-motion` respected on everything.

## Product permissions

- Figtree as the consistent UI font (not system fonts)
- Standard navigation patterns (top bar, side nav, breadcrumbs, tabs, command palettes)
- Density when users need it (tables, panels, dense information)
- Consistency over surprise (same visual vocabulary screen to screen)
- Restrained color strategy as default (cyan accent only)
- Full Palette strategy for dashboards and status overviews

## Product bans (on top of shared rules)

- Decorative motion that doesn't convey state
- Inconsistent component vocabulary across screens
- Display fonts (Rajdhani) in UI labels, buttons, or data
- Reinventing standard affordances for flavor
- Heavy color or full-saturation accents on inactive states
- Glow effects in dense product UI (reserved for brand surfaces and deliberate moments)
