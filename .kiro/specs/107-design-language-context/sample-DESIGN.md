---
name: DesignerPunk
description: Electric mathematical precision. Dark surfaces, vivid accents, systematic rhythm. Infrastructure with attitude.

colors:
  purple-primary: "rgba(176, 38, 255, 1)"
  purple-deep: "rgba(141, 30, 204, 1)"
  purple-light: "rgba(217, 138, 255, 1)"
  cyan-electric: "rgba(0, 240, 255, 1)"
  cyan-deep: "rgba(0, 192, 204, 1)"
  pink-hot: "rgba(255, 42, 109, 1)"
  pink-deep: "rgba(204, 34, 87, 1)"
  green-neon: "rgba(0, 255, 136, 1)"
  green-deep: "rgba(0, 204, 110, 1)"
  yellow-electric: "rgba(249, 240, 2, 1)"
  orange-bright: "rgba(255, 107, 53, 1)"
  surface-darkest: "rgba(6, 6, 10, 1)"
  surface-dark: "rgba(16, 22, 26, 1)"
  surface-mid: "rgba(24, 34, 40, 1)"
  surface-elevated: "rgba(38, 50, 58, 1)"
  text-primary: "rgba(255, 255, 255, 1)"
  text-secondary: "rgba(245, 245, 250, 1)"
  text-tertiary: "rgba(178, 188, 196, 1)"
  text-muted: "rgba(94, 112, 124, 1)"

typography:
  display:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.1
  headline:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.2
  title:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  supporting:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    letterSpacing: "0.02em"
  mono:
    fontFamily: "SF Mono, Fira Code, monospace"
    fontSize: "0.875rem"
    fontWeight: 400

rounded:
  none: "0"
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"

spacing:
  025: "2px"
  050: "4px"
  075: "6px"
  100: "8px"
  125: "10px"
  150: "12px"
  200: "16px"
  250: "20px"
  300: "24px"
  400: "32px"
  500: "40px"
  600: "48px"
  700: "56px"
  800: "64px"

components:
  button-primary:
    backgroundColor: "{colors.purple-primary}"
    textColor: "{colors.text-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.purple-deep}"
    textColor: "{colors.text-primary}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.purple-light}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  card:
    backgroundColor: "{colors.surface-mid}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "24px"
  card-elevated:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "32px"
---

# Design System: DesignerPunk

## 1. Overview: Electric Mathematical Precision

**Creative North Star: "Infrastructure with Attitude"**

DesignerPunk's visual identity is the intersection of mathematical rigor and electric energy. Dark surfaces provide the canvas; vivid, saturated accents provide the voice. The system feels **precise, energetic, and confident**. It reads as engineered, not designed-by-committee. Every value is traceable to a formula. Every color earns its place through contrast and intent.

The aesthetic philosophy is **systematic boldness**. The 8px baseline grid creates rhythm. The 45-color palette across 9 hue families creates range. The dark-first surfaces create focus. The mathematical relationships create trust. This is not a safe system. It's a precise one.

**Key Characteristics:**
- Dark surfaces (black400/gray400/gray300) as the default canvas. Light mode exists but dark is the primary voice.
- Saturated accents used deliberately: purple as primary action, cyan as information/tech, pink as energy/attention, green as success/confirmation.
- 8px baseline grid with mathematical multipliers (space100=8, space200=16, space300=24). No arbitrary values.
- Monospace for code, data, and system-level information. System sans for everything else.
- Semantic spacing categories: grouped (tight relationships), related (moderate), separated (distinct), sectioned (major divisions).

## 2. Colors: The Electric Palette

A 45-color system across 9 hue families (yellow, orange, pink, purple, cyan, teal, green, plus neutrals), each with 5 systematic progressions (100-500). Dual themes: Original (maximum impact) and WCAG 2.2 (accessible). Both support day/night modes.

### Primary Accent
- **Purple 300** (rgba(176, 38, 255, 1)): Primary action color. Buttons, links, active states, brand moments. The signature hue.

### Secondary Accents (contextual, not decorative)
- **Cyan 300** (rgba(0, 240, 255, 1)): Information, technology, system states. The "electric" in the brand.
- **Pink 300** (rgba(255, 42, 109, 1)): Energy, attention, destructive actions, error states.
- **Green 400** (rgba(0, 255, 136, 1)): Success, confirmation, positive states.
- **Yellow 300** (rgba(249, 240, 2, 1)): Warning, caution.
- **Orange 300** (rgba(255, 107, 53, 1)): Warmth, secondary attention.

### Surfaces (dark-first)
- **Black 400** (rgba(6, 6, 10, 1)): Deepest background. Page-level.
- **Gray 500** (rgba(16, 22, 26, 1)): Primary surface. Cards, panels.
- **Gray 400** (rgba(24, 34, 40, 1)): Elevated surface. Active cards, hover states.
- **Gray 300** (rgba(38, 50, 58, 1)): Highest elevation. Modals, popovers.

### Text
- **White 100** (rgba(255, 255, 255, 1)): Primary text on dark surfaces.
- **White 200** (rgba(245, 245, 250, 1)): Secondary text.
- **Gray 100** (rgba(178, 188, 196, 1)): Tertiary text, labels.
- **Gray 200** (rgba(94, 112, 124, 1)): Muted text, placeholders.

### Named Rules

**The Formula Rule.** Every color value exists in a systematic 5-step progression per hue. No one-off colors. If you need a color, it comes from the palette.

**The Semantic-First Rule.** Use semantic color tokens (color.action.primary, color.feedback.error) before reaching for primitives (purple300, pink300). Semantics encode intent; primitives encode value.

**The Warm-Light-Cool-Shadow Rule.** Warm light creates cool shadows. Shadow colors are blue-tinted (shadowBlue100) or gray-tinted (shadowGray100), never pure black, to create natural depth.

## 3. Typography: System Sans + Mono

**Primary Font:** System UI stack (-apple-system, BlinkMacSystemFont, system-ui, sans-serif)
**Code/Data Font:** SF Mono, Fira Code, monospace

**Character:** The system uses native platform fonts deliberately. This is a product register choice: the interface should disappear into the task. Typography hierarchy is achieved through weight and scale contrast, not font variety. Monospace is reserved for code, token names, data, and system-level information where precision matters.

### Hierarchy

- **Display** (weight 700, clamp(2.5rem, 6vw, 4rem), line-height 1.1): Hero moments. Rare.
- **Headline** (weight 600, clamp(1.5rem, 3vw, 2.25rem), line-height 1.2): Section headings.
- **Title** (weight 600, 1.25rem, line-height 1.3): Card titles, subsection headings.
- **Body** (weight 400, 1rem, line-height 1.6): Paragraph copy. Capped at 65-75ch.
- **Supporting** (weight 400, 0.875rem, line-height 1.5): Captions, metadata.
- **Label** (weight 500, 0.875rem, letter-spacing 0.02em): Buttons, form labels.
- **Mono** (weight 400, 0.875rem): Token names, code, data values.

### Named Rules

**The 1.6 Leading Rule.** Body line-height is 1.6. This is the readability foundation.

**The Weight-Not-Font Rule.** Hierarchy through weight contrast (400 vs 600 vs 700), not font switching. One family carries everything except code.

**The 65ch Rule.** Body text capped at 65-75ch. No exceptions.

## 4. Elevation

Dark surfaces create depth through lightness progression, not shadow. Each elevation step is a lighter surface color (black400 → gray500 → gray400 → gray300). Shadows are used sparingly and always with colored tints (warm-light-cool-shadow principle).

### Shadow Vocabulary

- **Ambient** (0 4px 16px shadowGray100 at 0.3 opacity): Subtle depth for elevated cards.
- **Focused** (0 8px 32px shadowBlue100 at 0.4 opacity): Active/focused elements.
- **Glow** (0 0 24px [accent color] at 0.3 opacity): Accent-colored ambient glow for primary actions on hover.

### Named Rules

**The Surface-Is-Elevation Rule.** On dark themes, elevation is communicated through surface lightness, not shadow intensity. Shadows are supplementary, not primary.

**The Colored-Glow Rule.** When an accent element needs emphasis, use a same-hue glow (purple glow for purple buttons, cyan glow for info elements). Never white or neutral glows.

## 5. Components

### Buttons

- **Shape:** Rounded (border-radius: 8px). Not sharp, not pill. The 8px radius matches the baseline grid.
- **Primary:** Purple 300 background, white text. Weight 500, letter-spacing 0.02em. Padding 12px/24px (space150/space300).
- **Hover:** Purple 400 background. Subtle purple glow (0 0 24px purple300 at 0.3).
- **Focus:** Visible focus ring in purple-light with 2px offset.
- **Secondary:** Transparent background, purple-light text, 1px purple-light border. Hover fills with purple at 0.1 opacity.

### Cards & Containers

- **Corner radius:** 12px (space150) for standard cards. 8px for compact elements. 16px for large feature cards.
- **Background:** Gray 400 (surface-mid) for standard. Gray 300 (surface-elevated) for featured.
- **Border:** 1px gray200 at 0.2 opacity for subtle articulation. No heavy borders.
- **Internal padding:** 24px (space300) standard. 32px (space400) for feature cards.

### Code/Token Display

- **Background:** Black 400 (deepest surface) for code blocks.
- **Font:** Mono family, 0.875rem.
- **Syntax highlighting:** Purple for keywords, cyan for strings, green for values, pink for errors.
- **Border:** 1px gray300 at 0.3 opacity.

### Navigation

- **Background:** Surface-dark (gray500) or transparent on hero sections.
- **Text:** White 100 for active, gray100 for inactive.
- **Active indicator:** Purple 300 underline or background tint.
- **Hover:** Text shifts to white, subtle purple background tint.

## 6. Do's and Don'ts

### Do:

- **Do** use the 8px baseline grid for all spacing decisions. Every value is a multiple: 8, 12, 16, 24, 32, 40, 48, 56, 64.
- **Do** use semantic spacing tokens (space.grouped.normal, space.separated.tight) over primitives when encoding layout relationships.
- **Do** use dark surfaces as the primary canvas. Light mode is supported but dark is the brand voice.
- **Do** use saturated accents deliberately. Purple for action, cyan for information, pink for attention, green for success.
- **Do** use monospace for token names, code, and data. It signals "this is precise, machine-readable information."
- **Do** use the warm-light-cool-shadow principle. Shadows are blue-tinted or gray-tinted, never pure black.
- **Do** use surface lightness progression for elevation (black400 → gray500 → gray400 → gray300).
- **Do** respect the mathematical relationships. space150 = 12 because base(8) × 1.5 = 12. Not because 12 "looks right."
- **Do** use `prefers-reduced-motion` on all animations. iOS uses spring physics; web uses expo-out curves.
- **Do** cap body text at 65-75ch.

### Don't:

- **Don't** use arbitrary spacing values outside the 8px grid. If you need 14px, you're doing it wrong.
- **Don't** use pure black shadows. Always tinted (blue, gray, or warm depending on context).
- **Don't** use more than one accent color per component. Purple button doesn't also have cyan text.
- **Don't** use light backgrounds as the default. Dark-first is the brand.
- **Don't** use decorative gradients. If a gradient exists, it communicates state or depth, not decoration.
- **Don't** use bounce or elastic easing on web/Android. Expo-out only. (iOS spring animations are the exception.)
- **Don't** use display fonts or decorative typefaces. System sans + mono is the vocabulary.
- **Don't** hedge in copy. "Use space150" not "you might want to consider using space150."
- **Don't** use identical card grids. Vary card sizes, content density, or layout to create hierarchy.
- **Don't** use glassmorphism, gradient text, or side-stripe borders. These are AI-slop tells.
