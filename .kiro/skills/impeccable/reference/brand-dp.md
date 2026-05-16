# Brand register (DesignerPunk-adapted)

When design IS the product: marketing surfaces, landing pages, portfolio site, presentation decks, campaign pages, documentation sites. The deliverable is the experience itself; a visitor's impression is the thing being made.

## The DesignerPunk brand slop test

If someone could look at this and say "generic AI startup" without hesitation, it's failed. The bar is: does this feel like Electric Precision? Does the layout have Wise-level clarity? Does the color have Edgerunners-level commitment? If either dimension is missing, it's not DesignerPunk.

**Second-order test:** If someone could say "dark mode with neon accents" and be done, it's failed. DesignerPunk is mode-neutral. The electric palette works in light AND dark. A light-mode DesignerPunk surface isn't beige-and-gray with a timid accent. It's clean surfaces with vivid accents that pop.

## Typography

### Font decisions (system-defined)

DesignerPunk's fonts are decided. Do not select new fonts.

- **Display/Headings:** Rajdhani (geometric, technical, confident)
- **Body/UI:** Figtree (clean, warm geometric sans, readable)
- **Code/Data/Tokens:** Commit Mono (precise, warm, zero-ambiguity characters)

### Hierarchy

Use weight contrast within families, not font switching between them. The three families serve distinct roles:
- Rajdhani appears in hero moments, section headings, display type
- Figtree carries all body copy, labels, buttons, navigation
- Commit Mono appears wherever precision matters: token names, code examples, data values, technical metadata

### Scale

Typography falls on a 4px sub-grid. All type sizes and line-heights land on 4px increments. Combined with layout spacing (8px grid), all elements cumulatively align to multiples of 8.

Fluid `clamp()` for display headings. Fixed `rem` for body and UI text.

## Color

DesignerPunk brand surfaces use **Committed** or **Full Palette** color strategy by default. Restrained is not the brand voice for marketing/portfolio surfaces.

- The electric palette is the brand. Don't mute it. Don't make it safe.
- Cyan is the primary action color. It carries CTAs, navigation, and interactive states.
- Purple signals tech and data. Use it for technical content, visualizations, system diagrams.
- Glow effects create depth through surface layering. Pair complementary colors (cyan glow on purple surface, purple glow on cyan element).
- Light mode: clean white/near-white surfaces with vivid accents that pop against the brightness.
- Dark mode: deep surfaces (gray400+) with accents that glow and neon effects that breathe.

### The One Voice per Surface Rule

Each major section or surface commits to one dominant accent. A hero section is cyan OR purple, not both competing. Adjacent sections can use different accents to create rhythm across the page.

## Layout

- Clarity first. Generous whitespace. Obvious information architecture.
- Asymmetric compositions welcome for brand surfaces. Break the grid intentionally for emphasis.
- The `//` section marker is a brand element. Use it for major section headings on brand surfaces.
- Vary spacing for rhythm: generous separations between sections, tight groupings within.
- Content-first: every element earns its place. Nothing decorative without function.

## Motion

- Brand surfaces can afford ambitious motion: scroll-triggered reveals, typographic choreography, glow transitions.
- Expo-out easing on web (`cubic-bezier(0.16, 1, 0.3, 1)`). No bounce. No elastic.
- Glow pulses and color transitions for ambient energy (subtle, not distracting).
- `prefers-reduced-motion` collapses all non-essential animation.

## Brand permissions

- Committed and Full Palette color strategies (not just Restrained)
- Ambitious first-load motion and scroll-triggered reveals
- Single-purpose viewports with one dominant idea per fold
- Typographic risk with Rajdhani at large display sizes
- Glow effects for atmosphere and surface layering
- The `<!--` logo and `//` markers as visual language
- Drenched color strategy for splash/celebration moments (Break-Glass Rule applies)

## Brand bans (on top of shared rules)

- Generic dark-mode-with-neon-accents aesthetic (the AI startup look)
- Muted, safe, corporate palettes
- Glassmorphism, gradient text, side-stripe borders
- Identical card grids without hierarchy variation
- Decorative elements that don't communicate
- Hedging language in any copy
