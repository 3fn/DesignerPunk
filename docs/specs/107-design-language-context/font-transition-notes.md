# Release Notes: Font Family Transition (Spec 107)

**Date**: 2026-05-16
**Affects**: `fontFamilyBody` and `fontFamilyMono` token values

---

## Visual Change

DesignerPunk brand surfaces now use **Figtree** (body/UI) and **Commit Mono** (code/monospace) instead of Inter and SF Mono.

| Token | Before | After |
|-------|--------|-------|
| `fontFamilyBody` | Inter | Figtree |
| `fontFamilyMono` | SF Mono | Commit Mono |
| `fontFamilyDisplay` | Rajdhani | Unchanged |

## Who Is Affected

- **Consumers using default font tokens**: Your generated output will reference Figtree and Commit Mono. You need to load these fonts (see below).
- **Consumers with `tokenSource` and custom font families**: Unaffected. Your local token values take precedence.
- **Consumers who only use spacing/color/sizing tokens**: Unaffected. Font tokens are independent.

## Font Loading

Add to your HTML or CSS entry point:

```css
@import '@3fn/core/fonts/figtree.css';
@import '@3fn/core/fonts/commit-mono.css';
@import '@3fn/core/fonts/rajdhani.css';
```

Or via CDN (Google Fonts for Figtree):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Commit Mono is self-hosted via the package (not on Google Fonts). Use the `@3fn/core/fonts/commit-mono.css` import.

## Rationale

- **Figtree**: More personality than Inter (rounder terminals, open apertures) while maintaining readability. Avoids "default AI output" perception.
- **Commit Mono**: Designed for code readability with smart kerning and zero-ambiguity character differentiation. Warmer than SF Mono.
