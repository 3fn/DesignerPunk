# Agent Resource Updates for Spec 094

**Date**: 2026-04-07
**Purpose**: Draft of prompt/resource changes per agent resulting from Spec 094 (Portable Pipeline & Theme Registry)
**Status**: Draft — apply per-agent when ready

---

## Ada — Rosetta Token Specialist

### Prompt additions (ada-prompt.md)

Add to **In Scope** section:
- Theme registry management (`src/themes/ThemeRegistry.ts`) — registration, validation, theme-varying token computation
- Pipeline configuration (`src/config/defineConfig.ts`, `src/config/ConfigLoader.ts`) — portable pipeline infrastructure
- Platform generator theme-aware output — CSS `data-theme` scoping, Swift protocol/structs, Kotlin data class/instances, DTCG/Figma theme metadata
- `designerpunk.config.ts` authoring guidance for product repos

Add to **MCP Usage Pattern** table:
```
| Theme registry | `get_section({ path: ".kiro/steering/Token-Governance.md", heading: "Theme Registry (Spec 094)" })` |
| Portable pipeline | `get_section({ path: ".kiro/steering/Rosetta-System-Architecture.md", heading: "Portable Pipeline (Spec 094)" })` |
| Theme-varying tokens | `get_section({ path: ".kiro/steering/Token-Quick-Reference.md", heading: "Context Resolution" })` |
```

### Knowledge base updates
- Update `test-infrastructure` KB if theme registry tests were added to `src/__tests__/`
- No new KB needed — theme infrastructure is in Ada's existing domain

---

## Lina — Stemma Component Specialist

### Prompt additions (lina-prompt.md)

Add to **In Scope** section:
- iOS/Android component theme consumption migration — `@Environment`/`CompositionLocal` patterns
- CSS `data-theme` scoping verification for Shadow DOM components

Add to **MCP Usage Pattern** table:
```
| Component token consumption | `get_section({ path: ".kiro/steering/Component-Development-Guide.md", heading: "Token Consumption by Platform (Spec 094)" })` |
```

Add note to existing Shadow DOM guidance:
- CSS custom properties inherit through Shadow DOM boundaries including nested shadow roots (Nav-Header-App → Nav-Header-Base). Theme scoping via `data-theme` attribute on an ancestor works automatically — no component changes needed for web theming.

### Knowledge base updates
- Update `component-tests` KB if new theme-aware component tests were added

---

## Leonardo — Product Architect

### Prompt additions (leonardo-prompt.md)

Add to **Operational Context** or equivalent section:
- Products configure DesignerPunk via `designerpunk.config.ts` — defines product name, abbreviation, themes, output directory
- Theme creation workflow: create `SemanticOverrides.ts` → register in config → run `npx designerpunk generate`
- Token data will be queryable in Application MCP (Block C, WS7 — not yet implemented)
- Product MCP foundation will ship with `@designerpunk/core` (Block C, WS5 — not yet implemented)

Add to **MCP Usage Pattern** table:
```
| Theme-aware token selection | `get_section({ path: ".kiro/steering/Token-Quick-Reference.md", heading: "Platform Theme Output" })` |
```

### Knowledge base updates
- No changes until Block C ships (token data in Application MCP)

---

## Sparky — Web Platform Engineer

### Prompt additions (sparky-prompt.md)

Add to **Platform Context** or equivalent section:
- Web theming uses `data-theme` attribute on HTML elements — all descendant DesignerPunk components inherit themed CSS custom property values automatically (including through Shadow DOM)
- Base theme applies at `:root` with no attribute. Custom themes activate via `data-theme="{name}"`
- Dark-only themes set `color-scheme: dark` and use static values (no `light-dark()`)
- Product repos install `@designerpunk/core` and run `npx designerpunk generate` to produce themed token CSS

### Knowledge base updates
- No changes — Sparky's KB covers web component source, which hasn't changed structurally

---

## Kenya — iOS Platform Engineer

### Prompt additions (kenya-prompt.md)

Add to **Platform Context** or equivalent section:
- iOS theming uses `@Environment(\.{abbreviation}Theme)` — theme-varying color tokens read from the environment, static tokens (spacing, sizing, radius, typography) remain on `DesignTokens`
- Generated Swift output includes: `{Name}Theme` protocol, concrete structs per theme, `{Abbreviation}ThemeKey: EnvironmentKey`
- Product apps wrap content with `.environment(\.{abbreviation}Theme, themeInstance)` for subtree theming
- Dark mode: select theme struct based on `colorScheme` environment value

### Knowledge base updates
- No changes — Kenya's KB covers iOS component source, consumption patterns are in the platform files

---

## Data — Android Platform Engineer

### Prompt additions (data-prompt.md)

Add to **Platform Context** or equivalent section:
- Android theming uses `CompositionLocal` — theme-varying color tokens read from `Local{Abbreviation}Theme.current`, static tokens remain on `DesignTokens` object
- Generated Kotlin output includes: `{Name}Theme` data class, named instances in `{Name}Themes` object, `Local{Abbreviation}Theme` CompositionLocal
- Product apps wrap content with `CompositionLocalProvider(Local{Abbreviation}Theme provides themeInstance)` for subtree theming
- Dark mode: select theme instance based on `isSystemInDarkTheme()`
- Note: `{Abbreviation}` uses uppercase to avoid collision with Compose `.dp` unit (e.g., `DP` not `Dp`)

### Knowledge base updates
- No changes — Data's KB covers Android component source, consumption patterns are in the platform files

---

## Stacy — Product Governance & QA

### Prompt additions (stacy-prompt.md)

No prompt changes needed. Stacy's audit checklist and process scaffolding are process-level, not infrastructure-level. The theme registry doesn't change her governance role.

### Knowledge base updates
- No changes

---

## Thurgood — Test Governance & Spec Standards

### Prompt additions (thurgood-prompt.md)

No prompt changes needed. My domain (test governance, audit, spec standards) isn't affected by the theme infrastructure. The steering doc updates I made are served by the Docs MCP — I query them, I don't need them in my prompt.

### Knowledge base updates
- Update `test-infrastructure` KB if new test patterns were added (theme registry tests, snapshot tests, integration tests)

---

## Application Order

1. **Ada first** — she owns the infrastructure that changed
2. **Lina second** — she owns the components that consume it
3. **Kenya + Data** — platform-specific consumption patterns
4. **Leonardo** — product-side workflow
5. **Sparky** — web-specific theming
6. **Stacy + Thurgood** — no changes needed
