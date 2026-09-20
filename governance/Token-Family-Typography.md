---
id: token-family-typography
inclusion: manual
name: Token-Family-Typography
description: Typography token family — compositional typography tokens combining fontSize, lineHeight, fontFamily, fontWeight, and letterSpacing. Load when working with text styles, font selection, or typographic hierarchy.
---

# Typography Tokens Guide

**Date**: 2025-12-09
**Last Reviewed**: 2026-07-08
**Purpose**: Complete reference for typography tokens with font family usage and weight mapping guidance
**Organization**: token-documentation
**Scope**: cross-project
**Layer**: 3
**Relevant Tasks**: component-development, token-selection

---

## Overview

The DesignerPunk typography token system provides semantically meaningful typography styles that combine fontSize, lineHeight, fontFamily, fontWeight, and letterSpacing primitives. Typography tokens follow a compositional architecture where each token explicitly defines all five typography properties.

**Key Principles**:
- **Compositional Architecture**: Typography tokens compose multiple primitive tokens (fontSize, lineHeight, fontFamily, fontWeight, letterSpacing)
- **Semantic Naming**: Token names express design intent (body, heading, button, label, etc.)
- **Font Family Separation**: Display typography uses Rajdhani, body typography uses Figtree, code uses Commit Mono
- **Multi-Primitive Structure**: Each token explicitly defines all five typography properties
- **Cross-Platform Consistency**: Typography tokens generate platform-specific values for web, iOS, and Android

---

## Font Families

### Display Font: Rajdhani

**Purpose**: Display typography for headings, labels, buttons, and UI elements that require visual prominence and hierarchy.

**Font Stack**: `'Rajdhani, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'`

**Characteristics**:
- Modern, geometric sans-serif with strong visual presence
- Excellent for headings and UI elements
- Clear hierarchy and readability at display sizes
- Cyberpunk aesthetic alignment

**Semantic Tokens Using Rajdhani** (via `fontFamilyDisplay`):
- `typography.h1` - Primary heading level for page titles
- `typography.h2` - Secondary heading level for major subsections
- `typography.h3` - Tertiary heading level for subsections
- `typography.h4` - Quaternary heading level
- `typography.h5` - Quinary heading level
- `typography.h6` - Senary heading level
- `typography.display` - Large display text for hero sections

**Total**: 7 semantic tokens use the display stack

### Body Font: Figtree

**Purpose**: Body typography for paragraphs, descriptions, form inputs, labels, buttons, and general text content.

**Font Stack**: `'Figtree, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'`

**Characteristics**:
- Highly readable at small sizes
- Excellent for body text and UI elements
- Optimized for screen rendering
- Variable-weight font, so the full 100–900 weight range is available

**Semantic Tokens Using Figtree** (via `fontFamilyBody`):
- `typography.bodySm` - Small body text for secondary content
- `typography.bodyMd` - Standard body text for paragraphs
- `typography.bodyLg` - Large body text for emphasis
- `typography.caption` - Caption text for images and tables
- `typography.legal` - Legal text and disclaimers
- `typography.buttonSm` - Small button text
- `typography.buttonMd` - Standard button text
- `typography.buttonLg` - Large button text
- `typography.input` - Input field text
- `typography.labelXs` - Extra small labels for floating patterns
- `typography.labelSm` - Small labels for compact fields
- `typography.labelMd` - Standard labels for form fields
- `typography.labelMdFloat` - Floated label state for text inputs
- `typography.labelLg` - Large labels for prominent sections

**Total**: 14 semantic tokens use the body stack

### Monospace Font: Commit Mono

**Purpose**: Code typography for inline code, code blocks, and technical content.

**Font Stack**: `'"Commit Mono", "SF Mono", Monaco, Inconsolata, "Roboto Mono", Consolas, "Courier New", monospace'`

**Semantic Tokens Using Monospace** (via `fontFamilyMono`):
- `typography.codeSm` - Small code text for inline code
- `typography.codeMd` - Standard code text for code blocks
- `typography.codeLg` - Large code text for prominent examples

**Total**: 3 semantic tokens use monospace fonts for code typography

---

## Font Weight Mapping

Typography tokens use font weight primitives that map to specific weight values across platforms. Understanding this mapping is essential for implementing typography correctly.

### Weight Values

| Weight Name | Numeric Value | CSS Value | iOS UIFont.Weight | Android FontWeight | Use Case |
|-------------|---------------|-----------|-------------------|-------------------|----------|
| `fontWeight100` | 100 | `100` | `.ultraLight` | `FontWeight.Thin` | Thin — decorative use only |
| `fontWeight200` | 200 | `200` | `.thin` | `FontWeight.ExtraLight` | Extra light — decorative use only |
| `fontWeight300` | 300 | `300` | `.light` | `FontWeight.Light` | Light text, captions |
| `fontWeight400` | 400 | `400` or `normal` | `.regular` | `FontWeight.Normal` | Body text, standard content |
| `fontWeight500` | 500 | `500` | `.medium` | `FontWeight.Medium` | Labels, buttons, emphasis |
| `fontWeight600` | 600 | `600` | `.semibold` | `FontWeight.SemiBold` | Subheadings, strong emphasis |
| `fontWeight700` | 700 | `700` or `bold` | `.bold` | `FontWeight.Bold` | Headings, high emphasis |
| `fontWeight800` | 800 | `800` | `.heavy` | `FontWeight.ExtraBold` | Extra bold — rare, maximum emphasis |
| `fontWeight900` | 900 | `900` | `.black` | `FontWeight.Black` | Black — rare, display impact |

### Platform-Specific Implementation

**Web (CSS)**:
```css
/* Using numeric values */
font-weight: 400; /* Normal */
font-weight: 500; /* Medium */
font-weight: 600; /* Semi-bold */
font-weight: 700; /* Bold */

/* Using keyword values */
font-weight: normal; /* 400 */
font-weight: bold;   /* 700 */
```

**iOS (Swift)**:
```swift
// Using UIFont.Weight
.font(.system(size: 16, weight: .regular))  // 400
.font(.system(size: 16, weight: .medium))   // 500
.font(.system(size: 16, weight: .semibold)) // 600
.font(.system(size: 16, weight: .bold))     // 700

// Using custom fonts
.font(.custom("Rajdhani", size: 24))
.fontWeight(.bold)
```

**Android (Kotlin)**:
```kotlin
// Using FontWeight
Text(
    text = "Heading",
    fontWeight = FontWeight.Normal   // 400
    fontWeight = FontWeight.Medium   // 500
    fontWeight = FontWeight.SemiBold // 600
    fontWeight = FontWeight.Bold     // 700
)

// Using custom fonts
Text(
    text = "Heading",
    fontFamily = rajdhaniFamily,
    fontWeight = FontWeight.Bold
)
```

### Weight Usage by Token Type

**Light (300)**:
- `typography.caption` - Caption text for supplementary information

**Normal (400)**:
- `typography.bodySm` - Small body text
- `typography.bodyMd` - Standard body text
- `typography.bodyLg` - Large body text
- `typography.legal` - Legal text and disclaimers
- `typography.input` - Input field text
- `typography.codeSm` - Small code text
- `typography.codeMd` - Standard code text
- `typography.codeLg` - Large code text

**Medium (500)**:
- `typography.buttonSm` - Small button text
- `typography.buttonMd` - Standard button text
- `typography.buttonLg` - Large button text
- `typography.labelXs` - Extra small labels
- `typography.labelSm` - Small labels
- `typography.labelMd` - Standard labels
- `typography.labelMdFloat` - Floated label state
- `typography.labelLg` - Large labels

**Semi-Bold (600)**:
- `typography.h3` - Tertiary heading level
- `typography.h4` - Quaternary heading level
- `typography.h5` - Quinary heading level

**Bold (700)**:
- `typography.h1` - Primary heading level
- `typography.h2` - Secondary heading level
- `typography.h6` - Senary heading level
- `typography.display` - Large display text

---

## Typography Token Categories

### Body Text Variants

Body text tokens use the **body font stack** (Figtree, with system fallbacks) at normal weight (400) for optimal readability.

| Token Name | Font Size | Line Height | Font Family | Font Weight | Use Case |
|------------|-----------|-------------|-------------|-------------|----------|
| `typography.bodySm` | 14px | 1.429 | Figtree | 400 | Small body text, secondary content |
| `typography.bodyMd` | 16px | 1.5 | Figtree | 400 | Standard body text, paragraphs |
| `typography.bodyLg` | 18px | 1.556 | Figtree | 400 | Large body text, emphasis |

**Example Usage**:
```html
<!-- Web -->
<p class="body-md">Standard paragraph text uses Figtree at 16px.</p>

<!-- iOS -->
Text("Standard paragraph text uses Figtree at 16px.")
    .font(.custom("Figtree", size: 16))
    .fontWeight(.regular)

<!-- Android -->
Text(
    text = "Standard paragraph text uses Figtree at 16px.",
    fontFamily = figtreeFamily,
    fontSize = 16.sp,
    fontWeight = FontWeight.Normal
)
```

### Heading Hierarchy (H1-H6)

Heading tokens follow HTML semantic hierarchy. All of H1–H6 use the **display font stack** (Rajdhani, with system fallbacks); hierarchy comes from size and weight, not a family switch.

| Token Name | Font Size | Line Height | Font Family | Font Weight | Use Case |
|------------|-----------|-------------|-------------|-------------|----------|
| `typography.h1` | 37px | 1.19 | Rajdhani | 700 | Primary page titles |
| `typography.h2` | 33px | 1.212 | Rajdhani | 700 | Major subsections |
| `typography.h3` | 29px | 1.241 | Rajdhani | 600 | Subsections |
| `typography.h4` | 26px | 1.231 | Rajdhani | 600 | Smaller sections |
| `typography.h5` | 23px | 1.391 | Rajdhani | 600 | Minor sections |
| `typography.h6` | 20px | 1.4 | Rajdhani | 700 | Smallest sections |

**Family consistency**: every heading token references `fontFamilyDisplay`. Weight drops from 700 (h1, h2) to 600 (h3–h5) and back to 700 at h6, which is the smallest heading and needs the extra weight to read as a heading at 20px.

**Example Usage**:
```html
<!-- Web -->
<h1 class="h1">Primary Heading in Rajdhani</h1>
<h4 class="h4">Smaller Heading in Rajdhani</h4>

<!-- iOS -->
Text("Primary Heading in Rajdhani")
    .font(.custom("Rajdhani", size: 37))
    .fontWeight(.bold)

Text("Smaller Heading in Rajdhani")
    .font(.custom("Rajdhani", size: 26))
    .fontWeight(.semibold)

<!-- Android -->
Text(
    text = "Primary Heading in Rajdhani",
    fontFamily = rajdhaniFamily,
    fontSize = 37.sp,
    fontWeight = FontWeight.Bold
)

Text(
    text = "Smaller Heading in Rajdhani",
    fontFamily = rajdhaniFamily,
    fontSize = 26.sp,
    fontWeight = FontWeight.SemiBold
)
```

### Button Text Variants

Button tokens use the **Figtree** body font family with medium weight (500) for clear, readable button labels.

| Token Name | Font Size | Line Height | Font Family | Font Weight | Use Case |
|------------|-----------|-------------|-------------|-------------|----------|
| `typography.buttonSm` | 14px | 1.429 | Figtree | 500 | Small buttons, tertiary actions |
| `typography.buttonMd` | 16px | 1.5 | Figtree | 500 | Standard buttons, primary actions |
| `typography.buttonLg` | 18px | 1.556 | Figtree | 500 | Large buttons, prominent CTAs |

**Example Usage**:
```html
<!-- Web -->
<button class="button-md">Click Me</button>

<!-- iOS -->
Button("Click Me") {
    // action
}
.font(.custom("Figtree", size: 16))
.fontWeight(.medium)

<!-- Android -->
Button(onClick = { /* action */ }) {
    Text(
        text = "Click Me",
        fontFamily = figtreeFamily,
        fontSize = 16.sp,
        fontWeight = FontWeight.Medium
    )
}
```

### Label Text Variants

Label tokens use the **Figtree** body font family with medium weight (500) for clear form field labels and UI element labels.

| Token Name | Font Size | Line Height | Font Family | Font Weight | Use Case |
|------------|-----------|-------------|-------------|-------------|----------|
| `typography.labelXs` | 13px | 1.538 | Figtree | 500 | Floating label patterns |
| `typography.labelSm` | 14px | 1.429 | Figtree | 500 | Compact form fields |
| `typography.labelMd` | 16px | 1.5 | Figtree | 500 | Standard form labels |
| `typography.labelMdFloat` | 14px | 1.429 | Figtree | 500 | Floated label state |
| `typography.labelLg` | 18px | 1.556 | Figtree | 500 | Prominent form sections |

**Special Note on labelMdFloat**: This token uses a calculated font size (16px × 0.88 = 14px) to create smooth floating label animations while maintaining consistent line height, font family, and weight with `labelMd`.

**Example Usage**:
```html
<!-- Web -->
<label class="label-md">Email Address</label>
<input type="email" class="input" />

<!-- iOS -->
Text("Email Address")
    .font(.custom("Figtree", size: 16))
    .fontWeight(.medium)

TextField("", text: $email)
    .font(.custom("Figtree", size: 16))

<!-- Android -->
Text(
    text = "Email Address",
    fontFamily = figtreeFamily,
    fontSize = 16.sp,
    fontWeight = FontWeight.Medium
)

TextField(
    value = email,
    onValueChange = { email = it },
    textStyle = TextStyle(
        fontFamily = figtreeFamily,
        fontSize = 16.sp
    )
)
```

### Input Field Text

Input tokens use the **Figtree** body font family with normal weight (400) for optimal readability in form fields.

| Token Name | Font Size | Line Height | Font Family | Font Weight | Use Case |
|------------|-----------|-------------|-------------|-------------|----------|
| `typography.input` | 16px | 1.5 | Figtree | 400 | Input field text |

**Example Usage**:
```html
<!-- Web -->
<input type="text" class="input" placeholder="Enter text..." />

<!-- iOS -->
TextField("Enter text...", text: $inputText)
    .font(.custom("Figtree", size: 16))

<!-- Android -->
TextField(
    value = inputText,
    onValueChange = { inputText = it },
    placeholder = { Text("Enter text...") },
    textStyle = TextStyle(
        fontFamily = figtreeFamily,
        fontSize = 16.sp,
        fontWeight = FontWeight.Normal
    )
)
```

### Specialized Text

Specialized tokens use the **Figtree** body font family for caption and legal, and **Rajdhani** for display text.

| Token Name | Font Size | Line Height | Font Family | Font Weight | Use Case |
|------------|-----------|-------------|-------------|-------------|----------|
| `typography.caption` | 13px | 1.538 | Figtree | 300 | Image captions, supplementary info |
| `typography.legal` | 13px | 1.538 | Figtree | 400 | Legal text, disclaimers |
| `typography.display` | 42px | 1.143 | Rajdhani | 700 | Hero sections, major headings |

**Example Usage**:
```html
<!-- Web -->
<p class="caption">Image caption text</p>
<p class="legal">Terms and conditions apply</p>
<h1 class="display">Hero Heading</h1>

<!-- iOS -->
Text("Image caption text")
    .font(.custom("Figtree", size: 13))
    .fontWeight(.light)

Text("Terms and conditions apply")
    .font(.custom("Figtree", size: 13))

Text("Hero Heading")
    .font(.custom("Rajdhani", size: 42))
    .fontWeight(.bold)

<!-- Android -->
Text(
    text = "Image caption text",
    fontFamily = figtreeFamily,
    fontSize = 13.sp,
    fontWeight = FontWeight.Light
)

Text(
    text = "Terms and conditions apply",
    fontFamily = figtreeFamily,
    fontSize = 13.sp
)

Text(
    text = "Hero Heading",
    fontFamily = rajdhaniFamily,
    fontSize = 42.sp,
    fontWeight = FontWeight.Bold
)
```

### Code Text Variants

Code tokens use **monospace** font family with normal weight (400) for technical content.

| Token Name | Font Size | Line Height | Font Family | Font Weight | Use Case |
|------------|-----------|-------------|-------------|-------------|----------|
| `typography.codeSm` | 14px | 1.429 | Commit Mono | 400 | Inline code, compact layouts |
| `typography.codeMd` | 16px | 1.5 | Commit Mono | 400 | Code blocks, standard code |
| `typography.codeLg` | 18px | 1.556 | Commit Mono | 400 | Prominent code examples |

**Example Usage**:
```html
<!-- Web -->
<code class="code-md">const value = 42;</code>

<!-- iOS -->
Text("const value = 42;")
    .font(.custom("CommitMono-Regular", size: 16))

<!-- Android -->
Text(
    text = "const value = 42;",
    fontFamily = FontFamily.Monospace,
    fontSize = 16.sp
)
```

---

## Font Loading and Fallbacks

### Web Font Loading

Typography tokens reference custom fonts (Rajdhani, Figtree, Commit Mono) that must be loaded via `@font-face` declarations. The system includes fallback fonts to ensure text remains visible during font loading.

**Font Loading Strategy**:
- Use `font-display: swap` to prevent invisible text (FOIT)
- Prioritize WOFF2 format for better compression
- Include fallback fonts in font stack for graceful degradation

**Example @font-face**:
```css
@font-face {
  font-family: 'Rajdhani';
  src: url('/assets/fonts/rajdhani/Rajdhani-Bold.woff2') format('woff2'),
       url('/assets/fonts/rajdhani/Rajdhani-Bold.woff') format('woff');
  font-weight: 700;
  font-display: swap;
}

@font-face {
  font-family: 'Figtree';
  src: url('/assets/fonts/figtree/Figtree-VariableFont_wght.ttf') format('truetype');
  font-weight: 300 900;
  font-display: swap;
}
```

### iOS Font Configuration

Custom fonts must be bundled in the iOS app and listed in `Info.plist`:

```xml
<key>UIAppFonts</key>
<array>
    <string>Rajdhani-Regular.ttf</string>
    <string>Rajdhani-Medium.ttf</string>
    <string>Rajdhani-SemiBold.ttf</string>
    <string>Rajdhani-Bold.ttf</string>
    <string>Figtree-VariableFont_wght.ttf</string>
    <string>CommitMono-400-Regular.otf</string>
    <string>CommitMono-700-Regular.otf</string>
</array>
```

**Fallback Behavior**: If custom fonts fail to load, iOS falls back to SF Pro Display (display text) and SF Pro Text (body text).

### Android Font Configuration

Font files must be placed in `app/src/main/res/font/` with lowercase, underscore-separated names:

```
res/font/
  rajdhani_regular.ttf
  rajdhani_medium.ttf
  rajdhani_semibold.ttf
  rajdhani_bold.ttf
  figtree_regular.ttf
  figtree_medium.ttf
  figtree_semibold.ttf
  figtree_bold.ttf
```

**FontFamily Configuration**:
```kotlin
val rajdhaniFamily = FontFamily(
    Font(R.font.rajdhani_regular, FontWeight.Normal),
    Font(R.font.rajdhani_medium, FontWeight.Medium),
    Font(R.font.rajdhani_semibold, FontWeight.SemiBold),
    Font(R.font.rajdhani_bold, FontWeight.Bold)
)

val figtreeFamily = FontFamily(
    Font(R.font.figtree_regular, FontWeight.Normal),
    Font(R.font.figtree_medium, FontWeight.Medium),
    Font(R.font.figtree_semibold, FontWeight.SemiBold),
    Font(R.font.figtree_bold, FontWeight.Bold)
)
```

**Fallback Behavior**: If custom fonts fail to load, Android falls back to Roboto for both display and body text.

---

## Typography Token Summary

### By Font Family

**Rajdhani (Display)**: 7 tokens
- `typography.h1`–`typography.h6`, `typography.display`

**Figtree (Body)**: 14 tokens
- Body: `bodySm`, `bodyMd`, `bodyLg`
- Specialized: `caption`, `legal`
- Buttons: `buttonSm`, `buttonMd`, `buttonLg`
- Labels: `labelXs`, `labelSm`, `labelMd`, `labelMdFloat`, `labelLg`
- Input: `input`

**Commit Mono (Code)**: 3 tokens
- `codeSm`, `codeMd`, `codeLg`

**Total**: 24 semantic typography tokens

### By Font Weight

- **Light (300)**: 1 token (`caption`)
- **Normal (400)**: 8 tokens (body variants, legal, input, code variants)
- **Medium (500)**: 8 tokens (button variants, label variants)
- **Semi-Bold (600)**: 3 tokens (`h3`, `h4`, `h5`)
- **Bold (700)**: 4 tokens (`h1`, `h2`, `h6`, `display`)

---

## Related Documentation

- [Color Tokens Guide](token-family-color) - Color token system and semantic meanings
- [Spacing Tokens Guide](token-family-spacing) - Spacing token system and layout patterns
- [iOS Font Setup](../../docs/platform-integration/ios-font-setup.md) - iOS font configuration and implementation
- [Android Font Setup](../../docs/platform-integration/android-font-setup.md) - Android font configuration and implementation
- [Token System Overview](../../docs/token-system-overview.md) - Complete token system architecture
- [Component Development Guide](component-development-guide) - Token usage in component development
- [Token Resolution Patterns](token-resolution-patterns) - Strategic guidance on token type selection and validation

---

*This guide provides comprehensive reference for typography tokens, font family usage, and weight mapping across all platforms.*
