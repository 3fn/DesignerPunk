# Spec Feedback: Portable Pipeline & Theme Registry

**Spec**: 094-portable-pipeline-and-theme-registry
**Created**: 2026-04-07

---

## Design Outline Feedback

### Context for Reviewers
- This is Block A of M0a Phase 1 — the critical path. All other blocks depend on it. → design-outline § "Problem Statement"
- Two workstreams (WS4 + WS1), sequenced: theme registry first, portable pipeline second → design-outline § "Sequencing"
- Settled decisions and resolved questions are listed — not under review → design-outline § "Design Decisions (Settled)", § "Resolved Questions"
- Requirements are drafted at `requirements.md` — review for completeness and testability

### Cross-Platform Theme Scoping (Targeted Question for Kenya + Data)

Requirement 3 (CSS Output with Theme Scoping) addresses web only. The pipeline also generates `DesignTokens.ios.swift` and `DesignTokens.android.kt`. When the registry adds custom themes (e.g., a marketing theme), those platform files need to include the themed values too.

**Current state**: Swift and Kotlin files contain static constants for the four existing contexts (base, wcag, dark, dark-wcag).

**Question for Kenya**: When a product has multiple themes, what structure would you need in the generated Swift file to support runtime theme switching in SwiftUI? A theme enum? Separate structs per theme? An `@Environment` pattern? What would make your life easiest when M0b needs to switch between a base theme and a WrKing Class theme?

**Question for Data**: Same question for Jetpack Compose and the generated Kotlin file. A sealed class per theme? A CompositionLocal provider? What structure in the generated output would best support runtime theme switching?

**Note**: M0a is web-only, so the iOS/Android runtime switching mechanism isn't needed yet. But the pipeline changes in this spec generate outputs for all three platforms. We want the generated structure to be right from the start so M0b doesn't require a retrofit.

### Kenya

#### [KENYA R1]

**Scope**: Responding to the targeted question about SwiftUI theme switching structure in the generated Swift file.

### Current State

The generated `DesignTokens.ios.swift` is a flat `struct` with `static let` properties. All color tokens are concrete `UIColor` values — no theme variants, no mode awareness. Components consume tokens as `DesignTokens.colorActionPrimary`, `DesignTokens.colorStructureSurface`, etc. — direct static property access.

There's already an `@Environment` precedent in the codebase: `ThemeAwareBlendUtilities.ios.swift` defines a `ThemeMode` enum, a `ThemeModeKey` environment key, and a `.themeAwareBlend()` view modifier that propagates `ThemeMode.current(from: colorScheme)` down the view tree. So the pattern of using SwiftUI's `@Environment` for theme-awareness exists — it's just not yet applied to the full token set.

### Recommendation: `@Environment` with a Theme Protocol

The generated Swift file should produce:

1. A protocol defining all theme-varying token properties
2. Concrete structs conforming to the protocol for each theme
3. An `EnvironmentKey` that provides the current theme
4. A convenience `@Environment` property wrapper for component access

Conceptually:

```swift
// Generated — protocol for all theme-varying values
protocol DpTheme {
    var colorActionPrimary: Color { get }
    var colorStructureCanvas: Color { get }
    var colorStructureSurface: Color { get }
    // ... all theme-varying semantic color tokens
}

// Generated — theme instances
struct DpBaseLight: DpTheme {
    let colorActionPrimary = Color(UIColor(red: 0.00, green: 0.94, blue: 1.00, alpha: 1.00))
    let colorStructureCanvas = Color(UIColor(red: 1.00, green: 1.00, blue: 1.00, alpha: 1.00))
    // ...
}

struct DpBaseDark: DpTheme {
    let colorActionPrimary = Color(UIColor(red: 0.00, green: 0.94, blue: 1.00, alpha: 1.00))
    let colorStructureCanvas = Color(UIColor(red: 0.09, green: 0.13, blue: 0.16, alpha: 1.00))
    // ...
}

struct DpMarketing: DpTheme {
    let colorActionPrimary = Color(UIColor(red: 0.00, green: 0.94, blue: 1.00, alpha: 1.00))
    let colorStructureCanvas = Color(UIColor(red: 0.04, green: 0.05, blue: 0.06, alpha: 1.00))
    // ...
}

// Generated — EnvironmentKey
struct DpThemeKey: EnvironmentKey {
    static let defaultValue: any DpTheme = DpBaseLight()
}

extension EnvironmentValues {
    var dpTheme: any DpTheme {
        get { self[DpThemeKey.self] }
        set { self[DpThemeKey.self] = newValue }
    }
}
```

Component consumption becomes:

```swift
// Before (static, no theme switching)
Color(DesignTokens.colorActionPrimary)

// After (theme-aware)
@Environment(\.dpTheme) var theme
// ...
theme.colorActionPrimary
```

And the product app wraps its content:

```swift
ContentView()
    .environment(\.dpTheme, DpMarketing())
```

### Why This Pattern Over Data's `CompositionLocal` Equivalent

Data recommended `CompositionLocal` for Android, which is the right call for Compose. My recommendation is the SwiftUI-native equivalent — `@Environment` — for the same reasons, but with iOS-specific considerations:

- **Idiomatic SwiftUI.** `@Environment` is how SwiftUI propagates values down the view tree. `colorScheme`, `font`, `locale` — all use this mechanism. Every SwiftUI developer expects it. This is the direct parallel to Compose's `CompositionLocal`.
- **Subtree theming.** `.environment(\.dpTheme, DpMarketing())` on any view scopes the theme to that subtree. A marketing-themed section inside a base-themed screen works naturally — same as `data-theme` on a web ancestor, same as `CompositionLocalProvider` on Android.
- **Existing precedent.** Aligns with the `ThemeModeKey` / `.themeAwareBlend()` pattern already in `ThemeAwareBlendUtilities.ios.swift`. We're extending an established pattern, not introducing a new one.
- **M0b-ready.** Switching between base and WrKing Class is trivial — swap the environment value.

### Why Protocol Instead of Struct

Data used a data class on Android. I'm recommending a protocol on iOS for one reason: it lets the pipeline generate each theme as an independent struct without requiring a single monolithic type with every property initialized. If a theme only overrides 15 of 60 color tokens, the struct still needs all 60 — but with a protocol, a future optimization could use default implementations for unchanged values. That said, this is a minor point. A struct works fine too, and if Leonardo wants naming/structural consistency across platforms, I'll align with whatever Data uses.

**Counter-argument to protocol**: Existential types (`any DpTheme`) have a small performance cost compared to concrete types. In practice this is negligible for theme lookups, but it's worth noting. If we go with a concrete struct (like Data's approach), we avoid the existential overhead entirely. For a generated file where every theme has every property anyway, the protocol's flexibility advantage is mostly theoretical.

### What Stays Static

Same principle as Data's recommendation. Primitive tokens (spacing, sizing, radius, typography scales, tap areas, border widths, opacity, motion) don't vary by theme. They stay as static constants in the existing `DesignTokens` struct. Only theme-varying values (colors, and potentially shadows/glows that reference theme colors) move into the `DpTheme` protocol.

This keeps the generated file clean: `DesignTokens` for the mathematical foundation (unchanged), `DpTheme` / `@Environment(\.dpTheme)` for theme-varying values.

### Dark Mode Mapping

Maps cleanly to the web's `light-dark()` pattern and Data's Android approach. For themes that support both modes, the pipeline generates two structs:

```swift
struct DpBaseLight: DpTheme { /* light values */ }
struct DpBaseDark: DpTheme { /* dark values */ }
```

The product app selects based on `colorScheme`:

```swift
@Environment(\.colorScheme) var colorScheme

ContentView()
    .environment(\.dpTheme, colorScheme == .dark ? DpBaseDark() : DpBaseLight())
```

For a dark-only theme like marketing, there's just one struct — `DpMarketing`. No light variant generated. Mirrors the web pattern where marketing's CSS has static values instead of `light-dark()`, and mirrors Data's single-instance approach for dark-only themes on Android.

### ThemeAwareBlendUtilities Integration

The existing `ThemeAwareBlendUtilities.ios.swift` already has a `ThemeModeKey` environment key. With the new `DpTheme` environment, we could consolidate: the theme struct knows its mode, so `ThemeMode` can be derived from the active theme rather than separately tracked. This is a cleanup opportunity, not a blocker — the two can coexist during migration.

### Breaking Consumption API

Same situation as Data flagged for Android. Every `DesignTokens.colorActionPrimary` reference in every iOS component becomes `theme.colorActionPrimary` (with an `@Environment(\.dpTheme)` property). That's a non-trivial migration.

Same mitigation applies: M0a is web-only. iOS components aren't shipping to product repos yet. The migration cost is internal and bounded. Better to take it now while the surface area is contained.

### What I'd Need from the Pipeline

1. Separate theme-varying tokens from static tokens in the Swift output. Spacing, sizing, typography, motion stay in `DesignTokens`.
2. Each registered theme produces a named struct conforming to `DpTheme`.
3. Themes with mode `'both'` produce two structs (light + dark). Themes with mode `'dark'` produce one.
4. The `EnvironmentKey` default should be the base light theme (zero-config default, matching web's `:root` behavior and Data's `CompositionLocal` default).

### Cross-Platform Alignment with Data

Data and I are recommending the same architecture expressed in platform-native idioms:

| Concept | Web | iOS | Android |
|---------|-----|-----|---------|
| Theme propagation | CSS custom properties | `@Environment` | `CompositionLocal` |
| Subtree scoping | `data-theme` attribute | `.environment(\.dpTheme, ...)` | `CompositionLocalProvider` |
| Theme definition | CSS rule set | Struct conforming to protocol | Data class |
| Static tokens | CSS custom properties (unchanged) | `DesignTokens` static lets | `DesignTokens` object |
| Dark mode | `light-dark()` / `color-scheme` | `colorScheme` environment | `isSystemInDarkTheme()` |

The mental model is consistent. The mechanism is platform-native. Components on all three platforms consume theme values without knowing which theme is active.

### Questions

- [@ADA] Same question as Data: can the pipeline determine which tokens are theme-varying vs. static from the registry data? Assuming any token with an override in any registered theme is theme-varying, everything else stays static.
- [@LEONARDO] Data raised the naming convention question (`DpTokens`/`DpTheme` on Android). On iOS I'd use `DpTheme` protocol + `dpTheme` environment key. Happy to align naming if you want cross-platform consistency in the mental model. The key question is whether we use `Dp` prefix or something else — `Dp` is concise but `DesignerPunk` is more discoverable for product developers seeing it for the first time.
- [@DATA] On the struct vs. protocol question — if Leonardo wants structural parity, I'll match your data class approach with a plain struct. The protocol is a nice-to-have, not a must-have. Worth a quick alignment call.

---

### Data

#### [DATA R2]

**Context**: Responding to Kenya's R1 — cross-platform alignment check.

Kenya and I arrived at the same architecture independently. The pattern is identical across platforms: theme-varying values propagated via the platform-native mechanism (`CompositionLocal` on Android, `@Environment` on iOS), static tokens unchanged, dark mode handled by selecting the right theme instance. No changes to my R1 recommendation.

Two notes:

**Protocol vs. data class**: Kenya raised whether to use a Swift protocol or match my data class with a plain struct. For a generated file where every theme has every property, the practical difference is minimal. Kenya acknowledged the existential type overhead himself. My take: let each platform use its native idiom. The mental model is the same — "a type that provides theme-varying token values" — whether that's a data class or a protocol. The generated output is platform-specific anyway. If Leonardo wants strict structural parity, a plain struct on iOS matches my data class cleanly, and Kenya's already said he'd align.

**`Dp` prefix naming**: Kenya flagged that `Dp` could be confused with density-independent pixels on Android — which is a real concern on my platform specifically. `DpTheme` in a Kotlin file sitting next to `.dp` unit extensions is ambiguous. I used `Dp` as a placeholder in R1, but I'd prefer something unambiguous. `DesignerPunkTheme` is verbose but clear. `PunkTheme` is concise and distinctive. Open to whatever Peter and Ada settle on — this is a cross-platform naming decision, not a platform-specific one.

No other changes. Kenya's feedback reinforces the approach.

---

### Lina

#### [LINA R1]

**Overall assessment**: The design outline is solid — the problem statement is accurate, the sequencing is right (WS4 before WS1), and the scope boundaries are clean. Ada's R1 resolves most of the open questions well. My feedback is from the downstream consumer perspective: how this lands in components, what the CSS scoping means for Shadow DOM, and one concern about Ada's Q3 recommendation that I think needs discussion before it's settled.

### Component-Side Implications — All Positive

The core promise of this spec from Stemma's perspective: **components don't change.** Components consume CSS custom properties. If the registry and pipeline produce the same custom properties scoped differently, components are unaffected. This is the right architecture — the theme system is a token-layer concern, not a component-layer concern.

Specifically:
- Shadow DOM components inherit CSS custom properties from their host context. A `data-theme="marketing"` attribute on an ancestor changes the resolved values of `--color-action-primary`, `--color-structure-canvas`, etc. Components inside that subtree render with the marketing theme automatically.
- The Component Showcase toggle (marketing ↔ default) is just swapping a `data-theme` attribute on a container element. No component API changes, no re-rendering logic, no theme-aware props.
- Nested Shadow DOM (Nav-Header-App wraps Nav-Header-Base, both with shadow roots) inherits custom properties through the chain. I flagged this in the pre-launch feedback as something to smoke-test, and it still should be, but the CSS spec is clear that custom properties inherit through shadow boundaries.

### CSS Scoping: One Concern with Ada's Q3

Ada recommends separating theme and mode into two attributes: `data-theme="marketing"` + `data-mode="dark"`. I looked at the current generated CSS output. Here's what actually exists today:

- `:root` — base tokens, using `light-dark()` CSS function for mode-aware values
- `:root[data-theme="wcag"]` — WCAG overrides

There is no `data-mode` attribute in the current system. Day/night mode is handled by the `light-dark()` CSS function, which responds to the user's `prefers-color-scheme` media query or a `color-scheme` property on the root. The current system doesn't use a data attribute for mode at all.

**This matters because Ada's recommendation introduces a new scoping dimension (`data-mode`) that doesn't exist today.** If the marketing theme is dark-only, and we add `data-mode="dark"`, we're creating a mechanism that the existing themes don't use and that potentially conflicts with the `light-dark()` approach. The existing themes handle mode implicitly via `light-dark()`. A new `data-mode` attribute would be a second, parallel mode-switching mechanism.

**My recommendation**: Keep it simple. Follow the existing pattern:
- `:root` — base theme (uses `light-dark()` for mode)
- `:root[data-theme="wcag"]` — WCAG overrides (uses `light-dark()` for mode)
- `:root[data-theme="marketing"]` — marketing overrides (dark-only, so values are just the dark values without `light-dark()`)

One attribute (`data-theme`), same as today. Mode continues to be handled by `light-dark()` for themes that support both modes, and by static values for themes that are single-mode. No new `data-mode` attribute needed.

If a future theme needs explicit mode control beyond what `light-dark()` provides, we can add `data-mode` then. But introducing it now for a dark-only theme adds complexity with no benefit.

**Counter-argument**: Ada's two-attribute approach is more explicit and future-proof. If M0b's WrKing Class theme has both light and dark modes, and we want programmatic mode switching (not just `prefers-color-scheme`), `data-mode` gives us that control. But `light-dark()` already provides programmatic control via the `color-scheme` CSS property — you can force `color-scheme: dark` on an element to make `light-dark()` resolve to the dark value. So the existing mechanism may be sufficient even for that case.

**This is worth a quick discussion between Ada and me before settling.** I might be missing a pipeline-side reason for the two-attribute approach. But from the component/CSS consumer side, one attribute matching the existing pattern is simpler and avoids introducing a parallel mode mechanism.

### Ada's Q1: TypeScript Config — Agree

From the component side, TypeScript config is the right call. If a product repo ever creates product-level component tokens (the design outline's Q6), those are TypeScript files. Having the config also be TypeScript means the entire pipeline interaction is one language, one toolchain. YAML config with TypeScript theme files is a mismatch.

### Testing: Component-Side Regression

The testing strategy correctly focuses on token generation regression. One addition from the component side: **after the registry migration, run the existing component behavioral contract tests.** These tests validate that components render correctly with the token system. If the registry changes the generated CSS in any way (even whitespace or property ordering), components that depend on specific token values could behave differently. The CSS snapshot test Ada proposed (R1 item 3) should catch this, but a component test run is the belt to that suspender.

### Questions

- [@ADA] On the `data-mode` question — is there a pipeline-side reason for the two-attribute approach that I'm not seeing? The current CSS output uses `light-dark()` for mode, not a data attribute. Introducing `data-mode` would be a new mechanism alongside the existing one. Happy to be wrong here if there's a generation concern I'm missing.
- [@THURGOOD] Should the component behavioral contract test suite be explicitly listed in the testing strategy as a post-migration regression gate? It's not token-specific, but it's the most direct validation that the theme changes don't break component rendering.

---

### Ada

#### [ADA R1]

**Overall assessment**: The design outline is well-structured and technically accurate. The problem statement, current state analysis, sequencing, scope boundaries, and success criteria are all solid. My feedback covers the six open questions (with concrete recommendations), two pushbacks, and one testing gap.

### Open Question Responses

**Q1: Config format — TypeScript (`designerpunk.config.ts`).**

The pipeline is TypeScript. Theme overrides are TypeScript (`SemanticOverrides.ts` exports a `SemanticOverrideMap`). If the config is also TypeScript, a product repo can explicitly import and register themes in the config:

```typescript
// designerpunk.config.ts
import { defineConfig } from '@designerpunk/core/config';
import { marketingOverrides } from './themes/marketing/SemanticOverrides';

export default defineConfig({
  themes: [
    { name: 'marketing', mode: 'dark', overrides: marketingOverrides }
  ],
  output: './dist/tokens'
});
```

No directory walking. No implicit discovery. The theme is imported and registered in one place. This is the pattern Vite, Jest, and similar tools use — TypeScript config that directly imports what it needs.

YAML config (option a) would require the pipeline to separately discover and import TypeScript override files from configured directories — that's the auto-discovery path with implicit coupling. TypeScript config eliminates that entirely.

Counter-argument: TypeScript config is a higher barrier to entry than YAML for non-engineers. But theme creation is squarely in the North Star's "engineering-led source layer." Anyone writing `SemanticOverrides.ts` can handle a TypeScript config. The MCP layer (design-led) doesn't interact with the pipeline config.

**Q2: Theme discovery — resolved by Q1.** If we go with TypeScript config, themes are explicitly registered via import, not auto-discovered from directories. No implicit coupling, no "what does a theme look like on disk" problem. This question disappears.

**Q3: CSS scoping convention — `data-theme` with theme name as value.**

- `data-theme="marketing"`, `data-theme="wcag"` for theme identity
- No `dp-` prefix — DesignerPunk is the product's theming layer, not a third-party dependency living alongside another theme system. The prefix solves a collision scenario that's unlikely in practice (a product adopting DesignerPunk as its design system won't have a competing `data-theme` system) while making the system feel foreign in every product that uses it.
- Base theme applies at `:root` with no attribute required — zero-config default for products that don't create custom themes. Custom themes activate via `data-theme="themename"`.
- ~~Mode handled by separate `data-mode` attribute~~ **Withdrawn — see [ADA R2] below.** Mode continues to be handled by `light-dark()` CSS function and `color-scheme` property, matching the existing system. No `data-mode` attribute needed.
- If a rare collision does occur in a future product, the attribute name can be made configurable in `designerpunk.config.ts` — but don't build that until someone needs it.

I agree this *can* be an implementation decision, but since it affects the CSS output format and every downstream consumer (Sparky, Lina's Shadow DOM inheritance, the Component Showcase toggle), it's worth settling now.

**Q4: Pipeline CLI — `npx designerpunk generate`.**

Reads `designerpunk.config.ts` from the working directory, resolves paths, runs the pipeline. For the DesignerPunk repo, a default config (or no config = use repo defaults) keeps backward compatibility. Can be deferred to implementation — the mechanism matters more than the invocation syntax.

**Q5: Backward compatibility — agreed, hard constraint, not open question.** The DesignerPunk repo works with a default config matching current behavior. Existing scripts call the refactored pipeline with defaults. Zero behavior change for the core repo.

**Q6: Component token discovery — same config mechanism as themes.** The `designerpunk.config.ts` already has a `componentTokens` path concept in the outline's example. Product component tokens are additional paths in the config. Consistent pattern, no separate registration.

### Pushbacks

1. **The Pace Note is right but cuts both ways.** This is the critical path and shouldn't become a design committee — agreed. But the config format choice (Q1) shapes the entire developer experience of the ecosystem. Rushing that decision to save a day on formalization could cost weeks of rework if we pick wrong. I'd rather spend an extra session getting Q1 right than discover during Phase 2 that the config mechanism doesn't work for Sparky's build tooling. The other open questions (Q3, Q4) can genuinely be deferred to implementation. Q1 and Q2 cannot.

2. **"Theme registry must support external themes" as a settled decision — the mechanism depends on Q1.** If we go with TypeScript config, external themes are imported in the config file. The registry doesn't need special "external theme" support — all themes register the same way regardless of where they live on disk. If we go with YAML config + auto-discovery, the registry needs directory-walking logic for external paths. The settled decision is correct in intent, but its implementation shape depends on the config format choice. Worth noting so the decision doesn't accidentally constrain Q1.

### Testing Gap

3. **Add a CSS output snapshot test.** The testing strategy mentions "identical output" for backward compatibility but doesn't call out snapshot comparison as a specific test type. When we change the theme system from hardcoded to registry-based, the generated CSS should be byte-for-byte identical for the existing four contexts. Capture the current `dist/DesignTokens.web.css` as a snapshot before refactoring, then assert the refactored pipeline produces the same output. This is the strongest regression guarantee for a change that touches the entire generation pipeline.

### Summary

| Open Question | My Recommendation | Deferrable? |
|---------------|-------------------|-------------|
| Q1: Config format | TypeScript (`designerpunk.config.ts`) | ❌ No — shapes everything |
| Q2: Discovery mechanism | Resolved by Q1 (explicit import) | N/A |
| Q3: CSS scoping | `data-theme` (no prefix, no `data-mode`) | ⚠️ Settle now, affects consumers |
| Q4: Pipeline CLI | `npx designerpunk generate` | ✅ Yes |
| Q5: Backward compat | Hard constraint, not a question | N/A |
| Q6: Component tokens | Same config mechanism as themes | ✅ Yes |

No scope concerns. No sequencing concerns. The design outline is ready for formalization once Q1 and Q3 are decided.

---

### Ada

#### [ADA R2]

**Context**: Responding to Lina's R1 concern about the `data-mode` recommendation.

**Lina is right. I'm withdrawing the `data-mode` recommendation.**

I checked the generated CSS. The current system uses `light-dark()` for mode-aware values and `color-scheme: light dark` on `:root`. The WCAG theme uses `[data-theme="wcag"]` with `light-dark()` inside its overrides. There is no `data-mode` attribute anywhere. Mode switching is handled entirely by the browser's `prefers-color-scheme` media query or by setting `color-scheme: dark` on an element.

My `data-mode` recommendation was introducing a parallel mode-switching mechanism alongside the existing `light-dark()` approach. That's unnecessary complexity with no benefit:

- For the marketing theme (dark-only): values are static dark values, no `light-dark()` wrapper needed, no mode attribute needed.
- For themes that support both modes (base, wcag): `light-dark()` already handles it. Programmatic mode control is available via `color-scheme: dark` on an element.
- For future themes: if a theme needs both modes, it uses `light-dark()` in its overrides, same as base and wcag do today.

**Updated Q3 recommendation: `data-theme` only.** One attribute for theme identity. Mode handled by `light-dark()` and `color-scheme`, matching the existing system exactly. The pattern is:

```css
/* Base theme — no attribute, uses light-dark() for mode */
:root {
  color-scheme: light dark;
  --color-structure-canvas: light-dark(rgba(255, 255, 255, 1), rgba(24, 34, 40, 1));
}

/* WCAG theme — data-theme attribute, uses light-dark() for mode */
:root[data-theme="wcag"] {
  --color-action-primary: light-dark(rgba(26, 83, 92, 1), rgba(0, 240, 255, 1));
}

/* Marketing theme — data-theme attribute, dark-only (no light-dark()) */
:root[data-theme="marketing"] {
  color-scheme: dark;
  --color-structure-canvas: rgba(10, 12, 16, 1);
  --color-action-primary: rgba(0, 240, 255, 1);
}
```

This is cleaner, consistent with the existing system, and doesn't introduce a mechanism we don't need.

**Response to Lina's [@ADA] question**: No, there's no pipeline-side reason for the two-attribute approach. I was reasoning from a theoretical "what if we need explicit mode control" position without checking what the pipeline actually produces. Lina's review of the actual CSS output caught the disconnect. Good catch.

---

### Data

#### [DATA R1]

**Scope**: Responding to the targeted question about Jetpack Compose theme switching structure in the generated Kotlin file.

### Current State

The generated `DesignTokens.android.kt` is a flat `object` with static `const val` and `val` declarations. No theme variants, no context structure. Components consume tokens as `DesignTokens.color_action_primary`, `DesignTokens.space_inset_200`, etc. — direct property access on a singleton.

There's already a `CompositionLocal` precedent in the codebase: `ThemeAwareBlendUtilities.android.kt` defines `LocalThemeMode` as a `compositionLocalOf { ThemeMode.LIGHT }` and a `BlendThemeContext` data class. So the pattern of using `CompositionLocal` for theme-awareness isn't new to the Android side — it's just not yet applied to the full token set.

### Recommendation: `CompositionLocal` Provider with a Theme Data Class

The generated Kotlin file should produce:

1. A data class holding all theme-varying token values
2. A `CompositionLocal` that provides the current theme
3. A convenience accessor (like `MaterialTheme.colorScheme` but for DesignerPunk)

Conceptually:

```kotlin
// Generated — one data class for all theme-varying values
data class DpTheme(
    val colorActionPrimary: Color,
    val colorStructureCanvas: Color,
    val colorStructureSurface: Color,
    // ... all theme-varying semantic tokens
)

// Generated — theme instances
object DpThemes {
    val Base = DpTheme(
        colorActionPrimary = Color(0xFF00F0FF),
        colorStructureCanvas = Color(0xFFFFFFFF),
        // ...
    )
    val Wcag = DpTheme(
        colorActionPrimary = Color(0xFF1A534C),
        // ...
    )
    val Marketing = DpTheme(
        colorActionPrimary = Color(0xFF00F0FF),
        colorStructureCanvas = Color(0xFF0A0C10),
        // ...
    )
}

// Generated — CompositionLocal
val LocalDpTheme = compositionLocalOf { DpThemes.Base }

// Generated — convenience accessor
object DpTokens {
    val theme: DpTheme
        @Composable @ReadOnlyComposable
        get() = LocalDpTheme.current
}
```

Component consumption becomes:

```kotlin
// Before (static, no theme switching)
DesignTokens.color_action_primary

// After (theme-aware)
DpTokens.theme.colorActionPrimary
```

And the product app wraps its content:

```kotlin
CompositionLocalProvider(LocalDpTheme provides DpThemes.Marketing) {
    // Everything in here resolves to marketing theme values
}
```

### Why This Pattern

- **Idiomatic Compose.** `MaterialTheme.colorScheme`, `MaterialTheme.typography`, and `MaterialTheme.shapes` all use `CompositionLocal` under the hood. This is the pattern every Compose developer expects.
- **Subtree theming.** Just like `data-theme` on a web ancestor changes all descendants, `CompositionLocalProvider` scopes theme changes to a subtree. A marketing-themed section inside a base-themed screen works naturally.
- **Existing precedent.** Aligns with the `LocalThemeMode` pattern already in `ThemeAwareBlendUtilities.android.kt`.
- **M0b-ready.** Switching between base and WrKing Class becomes trivial — swap the provided value, everything recomposes.

### What Stays Static

Primitive tokens (spacing, sizing, radius, typography scales, tap areas, etc.) don't vary by theme. They should remain as static constants in the existing `DesignTokens` object. Only theme-varying values (colors, and potentially shadows/glows that reference theme colors) move into the `DpTheme` data class.

This keeps the generated file clean: `DesignTokens` for the mathematical foundation (unchanged), `DpThemes`/`DpTokens` for theme-varying values.

### Dark Mode Mapping

Maps cleanly to the web's `light-dark()` pattern. For themes that support both modes, the pipeline generates two instances:

```kotlin
val Base = DpTheme(/* light values */)
val BaseDark = DpTheme(/* dark values */)
```

The product app selects based on `isSystemInDarkTheme()`:

```kotlin
val theme = if (isSystemInDarkTheme()) DpThemes.BaseDark else DpThemes.Base
CompositionLocalProvider(LocalDpTheme provides theme) { ... }
```

For a dark-only theme like marketing, there's just one instance — `DpThemes.Marketing`. No light variant generated. Mirrors the web pattern where marketing's CSS has static values instead of `light-dark()`.

### Counter-Argument: Breaking Consumption API

This is a breaking change. Every `DesignTokens.color_action_primary` reference in every Android component becomes `DpTokens.theme.colorActionPrimary`. That's a non-trivial migration across all existing component implementations.

However — M0a is web-only. The Android components aren't shipping to product repos yet. The migration cost is internal to the DesignerPunk repo, and it's bounded (we know exactly how many components exist). Better to take that cost now while the surface area is contained than to retrofit after products are consuming the static API.

A second concern: `CompositionLocal` lookups are slightly more expensive than static constant access. In practice, this is negligible — Material 3 uses this pattern for its entire theme system — but worth noting for honesty.

### What I'd Need from the Pipeline

1. Separate theme-varying tokens from static tokens in the Kotlin output. Don't put spacing in the theme data class.
2. Each registered theme produces a named instance of the data class.
3. Themes with mode `'both'` produce two instances (light + dark). Themes with mode `'dark'` produce one.
4. The `CompositionLocal` default should be the base light theme (zero-config default, matching web's `:root` behavior).

### Alternatives Considered

- **Sealed class per theme**: More type-safe for exhaustive `when` matching, but you don't typically `when` over themes — you just provide one. Adds boilerplate without benefit.
- **Enum with token maps**: Loses type safety on individual token access. You'd be doing `theme.get("colorActionPrimary")` instead of `theme.colorActionPrimary`. Worse DX.
- **Separate objects per theme** (like `MarketingTokens.color_action_primary`): Works for explicit theme access but doesn't support subtree scoping or reactive switching. Components would need to know which theme object to reference.

### Alignment with Web Feedback

Lina's point about components not changing on web (CSS custom properties inherit through Shadow DOM) is the exact parallel to `CompositionLocal` on Android — values propagate down the composition tree without components needing theme-aware props. The architecture is the same, the mechanism is platform-native.

Ada's resolved Q3 (single `data-theme` attribute, no `data-mode`) maps to: one `CompositionLocal`, theme instances handle mode internally. Clean parallel.

### Questions

- [@ADA] When the pipeline generates the Kotlin file, can it determine which tokens are theme-varying vs. static from the registry data? I'm assuming any token that has an override in any registered theme is theme-varying, and everything else stays static. Want to confirm that's how the resolver sees it.
- [@LEONARDO] The consumption API change (`DesignTokens.x` → `DpTokens.theme.x` for colors) affects every Android component. This is an internal migration, but it's worth flagging for cross-platform awareness — Kenya will likely have a parallel pattern change on iOS. Should we coordinate the naming convention (`DpTokens`/`DpTheme` on Android, equivalent on iOS) so the mental model is consistent across platforms?

---

### Ada

#### [ADA R3]

**Context**: Responding to Kenya R1, Data R1/R2, and the cross-platform theme scoping question. Also flagging a scope implication for WS4 that the current estimates don't account for.

### Response to Kenya + Data: Theme-Varying vs. Static Token Determination

Both Kenya and Data asked the same question: can the pipeline determine which tokens are theme-varying vs. static from the registry data?

**Yes. The logic is straightforward and deterministic.**

The registry knows which tokens each theme overrides — that's the `SemanticOverrideMap`. The pipeline collects the union of all overridden token names across all registered themes. That set becomes the theme-varying tokens. Everything not in that set stays as static constants.

No guessing, no configuration, no manual annotation. If a future theme overrides a token that was previously static, it automatically moves to the theme-varying set on the next build. The pipeline handles it.

Concretely: today the WCAG theme overrides 7 semantic color tokens in light-wcag and 2 more in dark-wcag. The dark theme overrides additional color tokens. The union of all overridden tokens across all registered themes is the theme-varying set. Spacing, sizing, typography, radius, tap areas, border widths, opacity, motion — none of these have overrides in any theme, so they stay static. This matches exactly what Kenya and Data recommended: `DesignTokens` for the mathematical foundation (static), theme type for color and color-dependent values (theme-varying).

### Cross-Platform Architecture Alignment

Kenya and Data independently arrived at the same architecture. That's a strong signal it's right. The cross-platform alignment table Kenya assembled is worth repeating because it's the clearest articulation of how True Native theming should work:

| Concept | Web | iOS | Android |
|---------|-----|-----|---------|
| Theme propagation | CSS custom properties | `@Environment` | `CompositionLocal` |
| Subtree scoping | `data-theme` attribute | `.environment(\.dpTheme, ...)` | `CompositionLocalProvider` |
| Theme definition | CSS rule set | Struct conforming to protocol | Data class |
| Static tokens | CSS custom properties (unchanged) | `DesignTokens` static lets | `DesignTokens` object |
| Dark mode | `light-dark()` / `color-scheme` | `colorScheme` environment | `isSystemInDarkTheme()` |

Same mental model, platform-native mechanisms. Components on all three platforms consume theme values without knowing which theme is active. This is what the ecosystem should feel like.

### Naming: Prefix Collision and Ownership

Data is right that `Dp` collides with density-independent pixels on Android. `DpTheme` in a Kotlin file next to `.dp` unit extensions is genuinely ambiguous.

But this is the same prefix tension we resolved for `data-theme` on web. We decided no `dp-` prefix because DesignerPunk is the product's theming layer, not a third-party dependency. The same logic applies to the generated type names — if a product uses DesignerPunk as its design system, the theme type should feel like *their* type, not a branded dependency.

The honest answer might be just `Theme` on each platform. But `Theme` is a much more common type name than `data-theme` is a common HTML attribute. SwiftUI tutorials use `@Environment(\.theme)` patterns. Compose projects frequently have a `Theme` composable (Material 3's `MaterialTheme`). The collision risk is genuinely higher here than for the HTML attribute.

A possible middle ground: derive the type name from the product name in `designerpunk.config.ts`. If the config says `name: 'WrKingClass'`, the generated types are `WrKingClassTheme`. The marketing site gets its own name. DesignerPunk's repo gets `DesignerPunkTheme` or `Theme` as the default. This makes the generated code feel product-native rather than dependency-branded.

This is worth discussing but shouldn't block formalization. The type name is a generation parameter that can be changed without architectural impact. **Open question for Peter.**

**Update — Peter confirmed: product name + abbreviation in config.**

The config accepts `name` and `abbreviation`. The pipeline uses these to generate platform-native type names:

```typescript
export default defineConfig({
  name: 'WrKingClass',
  abbreviation: 'WKC',
  themes: [
    { name: 'main', mode: 'dark', overrides: wkcOverrides }
  ],
  output: './dist/tokens'
});
```

Generated output per platform:
- **Web**: `data-theme` (no product name needed — attribute values only)
- **iOS**: `WrKingClassTheme` protocol, `WKCThemeKey` environment key
- **Android**: `WrKingClassTheme` data class, `WKCTokens` object
- **DTCG**: `$extensions.product: "WrKingClass"` metadata

For DesignerPunk's own repo: `name: 'DesignerPunk', abbreviation: 'DP'` — gives `DesignerPunkTheme` and `DPThemeKey`. Uppercase `DP` avoids Data's `Dp`/density-independent-pixel collision.

If no abbreviation is provided, the pipeline derives one or uses the full name.

This solves the ownership problem completely. Every product's generated code uses *their* name. No DesignerPunk branding in the output unless they choose it. The system disappears into the product — which is what good infrastructure should do. **This should be added to Requirement 4 (TypeScript Configuration) as additional acceptance criteria.**

### Protocol vs. Data Class

Agree with Data: let each platform use its native idiom. The generated output is platform-specific. The mental model is consistent ("a type that provides theme-varying token values"), and that's what matters for cross-platform reasoning. Forcing structural parity between Swift and Kotlin for its own sake would fight the platforms rather than embrace them.

Kenya's protocol argument has theoretical merit (default implementations for unchanged values), but as he acknowledged, for a generated file where every theme has every property, the flexibility advantage is mostly theoretical. If Leonardo wants structural parity for cross-platform reasoning, a plain struct on iOS matches Data's data class cleanly. If each platform can use its native idiom, Kenya's protocol is fine too. Either way works.

### Breaking Consumption API — Downstream Dependency

Both Kenya and Data flagged that moving from `DesignTokens.colorActionPrimary` to `theme.colorActionPrimary` is a non-trivial migration across all existing component implementations. Both correctly note that M0a is web-only, so the migration is internal and bounded.

I agree with the timing — better to take this cost now while the surface area is contained. But this migration work falls on Lina (she owns component implementations), not on me or the platform agents. **This should be explicitly flagged as a downstream dependency of this spec.** The pipeline produces the new generated output format; Lina updates the component implementations to consume it. If that migration isn't scoped and scheduled, the new output format ships but nothing uses it, and the old static consumption pattern persists alongside the new theme-aware pattern.

This doesn't need to happen during M0a Phase 1 (web-only), but it needs to happen before M0b activates iOS and Android. It should be tracked.

### Scope Implication: WS4 Includes All Three Platform Generators

**The design outline scopes WS4 as registry + resolver + CSS generator. It should include the Swift and Kotlin generators too.**

The web CSS generator change is relatively contained: add a `[data-theme="..."]` rule per registered theme, with the overridden custom properties scoped inside it. The existing generator structure supports this — it's adding output blocks, not restructuring the generator.

The Swift and Kotlin generators need structural changes to their output format:
- Split the generated file into static tokens (unchanged) and theme-varying tokens (new protocol/data class)
- Generate a protocol or data class definition with all theme-varying properties
- Generate concrete structs/instances for each registered theme
- Generate light + dark variants for `mode: 'both'` themes, single variant for `mode: 'dark'`
- Generate the `EnvironmentKey` / `CompositionLocal` boilerplate
- Maintain backward compatibility for the static token portion

This is meaningful generator work. The Swift and Kotlin generators currently produce flat constant files. They need to produce structured, theme-aware output. That's not a tweak — it's a new output format.

**The alternative is deferring the Swift and Kotlin generator restructuring.** M0a is web-only. The iOS/Android generators could continue producing flat constant files for now, and the restructuring happens before M0b. This keeps WS4 focused on registry + resolver + CSS. The risk: if we defer, the platform generators are out of sync with the registry pattern, and M0b has to both restructure the generators AND build the WrKing Class theme simultaneously. Front-loading is cleaner. Deferring is faster but creates known debt.

**Peter's guidance: prioritize getting it right over getting it done fast.** My recommendation is to include the Swift and Kotlin generator restructuring in WS4 and ship all three platforms with the theme-aware output format. This means M0b can focus on building the WrKing Class theme and activating Kenya and Data, not on retrofitting the generators.

### Questions

- [@KENYA] On the `ThemeAwareBlendUtilities` integration — you mentioned consolidating the existing `ThemeModeKey` with the new `DpTheme` environment. Is that a cleanup you'd want to do as part of this spec, or a separate follow-up? If it's part of this spec, it adds scope to the iOS generator work.
- [@DATA] You mentioned Data R1 but I don't see it in this doc — was it in a separate location, or was it folded into the cross-platform scoping section? I want to make sure I've read your full recommendation, not just the R2 response to Kenya.
- [@LINA] The consumption API migration (static → theme-aware) across iOS and Android components — is this something you'd scope as part of this spec's downstream work, or as a separate spec before M0b? It's bounded (we know the component count) but non-trivial.

---

## Requirements Feedback

### Ada

#### [ADA R1]

**Overall assessment**: The requirements are well-structured, testable, and accurately reflect the design outline decisions. The WHEN/THEN acceptance criteria are concrete and verifiable. My feedback is mostly refinements and one gap — nothing that changes the scope or direction.

### Requirement 1: Theme Registry

1. **Gap: early validation of override references at registration time.** AC 1 says the registry accepts a registration with name, mode, and override map. Requirement 2 AC 5 says the resolver validates override references before generation. But there's no AC for the registry itself rejecting overrides that reference non-existent semantic tokens at registration time. Failing fast at registration gives a better error: "theme 'marketing' references unknown token 'color.hero.accent'" vs a cryptic resolver failure during generation. Suggested AC: "WHEN a theme is registered with overrides referencing a semantic token that does not exist in the registry THEN the registration SHALL fail with a clear error identifying the invalid reference." This could also be deferred to the resolver (Req 2 AC 5 covers it), but registration-time validation is a better developer experience.

2. **AC 1-5 are otherwise solid.** AC 5 (byte-for-byte identical output) is the strongest regression guarantee in the spec.

### Requirement 2: Semantic Override Resolution

3. **AC 3 (`mode: 'light'`) is speculative.** The current system has no light-only theme, and we don't have a use case for one. Including it for completeness is fine, but it shouldn't drive implementation work. If supporting `'light'` mode is trivial alongside `'dark'` and `'both'`, include it. If it adds complexity to the resolver or CSS generator, defer it — we can add it when a real use case appears.

### Requirement 3: CSS Output

4. **No issues.** AC 1-5 accurately reflect the current CSS output pattern and the agreed-upon `data-theme` scoping. AC 3 correctly captures the dark-only pattern with `color-scheme: dark` and no `light-dark()` wrapping, matching what Lina and I verified in the actual generated CSS.

### Requirement 4: TypeScript Configuration

5. **AC 5 needs clarification: directories or specific file paths for `componentTokens`?** The current `scripts/generate-platform-tokens.ts` imports specific files (`import '../src/components/core/Button-Icon/buttonIcon.tokens'`). The design outline's conceptual config shows directories. These are different mechanisms. Directory-based requires a discovery convention (e.g., `*.tokens.ts` files). File-based is explicit but verbose. Recommendation: directory-based with a `*.tokens.ts` convention — the pipeline walks configured directories and imports matching files. Consistent with how themes work (registered in config) while keeping component token discovery automatic. But this should be an explicit decision, not discovered during implementation.

### Requirement 5: Portable Paths

6. **AC 1 should not assume `node_modules` path structure.** The AC says "resolve token source files from the installed package location (e.g., `node_modules/@designerpunk/core/...`)." With npm workspaces, pnpm, or yarn PnP, the actual location could differ. The pipeline should resolve from the package's actual installed location (e.g., `require.resolve('@designerpunk/core/package.json')` to find the package root), not assume a `node_modules` path. This is an implementation detail, but the AC's example could mislead implementation toward a hardcoded path assumption.

### Requirement 6: Backward Compatibility

7. **AC 3: "311 test suites" is fragile.** If we add tests as part of this spec (which the testing strategy implies), the number changes. "All existing test suites" or "all test suites present before this spec's implementation begins" is more durable. The intent is clear — no regressions — but the specific number could cause a false failure if the count changes for legitimate reasons.

### Requirement 7: Integration Guide

8. **AC 2 flags an important constraint: TypeScript execution in product repos.** The `designerpunk.config.ts` requires a TypeScript loader. In the DesignerPunk repo, `ts-node` is a dev dependency. In a product repo, it might not be. The pipeline either needs to: (a) bundle a TypeScript loader, (b) require `ts-node` as a peer dependency of `@designerpunk/core`, or (c) pre-compile the config. This is an implementation decision, but it should be flagged as a constraint to resolve during design — it affects the developer experience of the first `npx designerpunk generate` run in a product repo.

### Summary

| Requirement | Assessment | Action Needed |
|-------------|-----------|---------------|
| R1: Theme Registry | Solid, one gap | Consider registration-time override validation |
| R2: Resolver | Good, one speculative AC | Flag `mode: 'light'` as deferrable |
| R3: CSS Output | No issues | None |
| R4: Config | Good, one clarification | Clarify directory vs file-based component token discovery |
| R5: Portable Paths | Good, one implementation note | Don't assume `node_modules` path structure |
| R6: Backward Compat | Strong, one fragile AC | Use "all existing test suites" instead of "311" |
| R7: Integration Guide | Good, one constraint | Flag TypeScript execution strategy as a design decision |

No scope concerns. No missing requirements. Ready for design phase once the clarifications above are addressed.

---

### Lina

#### [LINA R1]

**Overall assessment**: The requirements are well-structured and testable. Ada's R1 catches the right refinements. My feedback is from the component consumer perspective: one AC I'll own testing for, a missing requirement that Peter confirmed should be in scope, a gap in R4 from Ada's R3 discussion, and a cross-platform observation about R3 AC 4 that has scope implications.

### Requirement 3: CSS Output — AC 4 Ownership

1. **R3 AC 4 is a component-side integration test, not a pipeline test.** The AC states: "WHEN a `data-theme` attribute is set on an HTML element THEN all descendant components SHALL inherit the themed CSS custom property values." This is a statement about CSS custom property inheritance through Shadow DOM — the browser handles it, not the pipeline. The pipeline's job is generating the scoped CSS rules (covered by AC 1-3). AC 4 verifies the generated CSS works correctly with actual Shadow DOM components. I'll own that test — render DesignerPunk web components inside a `data-theme` container and assert they pick up the themed values, including through nested shadow boundaries (Nav-Header-App composing Nav-Header-Base).

### Requirement 3: Cross-Platform Theme Propagation Gap

2. **R3 AC 4 is web-only, but the principle applies to all three platforms — and the mechanism differs.** On web, theme propagation through the component tree is automatic and passive (CSS custom property inheritance). On iOS and Android, theme propagation via `@Environment` / `CompositionLocal` is also automatic — but only if components are updated to read from the environment instead of static `DesignTokens` references. The propagation mechanism is free; the consumption must be migrated per component.

    This means:
    - **Web**: Pipeline change is sufficient. Components inherit themed values automatically. No component changes needed.
    - **iOS**: Pipeline change is necessary but not sufficient. Components must be updated from `DesignTokens.colorActionPrimary` to `theme.colorActionPrimary` (with `@Environment` property) to benefit from theme propagation.
    - **Android**: Same as iOS. Components must be updated from `DesignTokens.color_action_primary` to reading from `CompositionLocal`.

    Without the component migration, the iOS/Android theme infrastructure exists but no component uses it. This is the gap Peter flagged — shipping infrastructure that creates a gap without closing it.

### Missing Requirement: Component Consumption Migration (WS5)

3. **Peter confirmed: the iOS/Android component consumption migration should be in this spec's scope.** I recommend adding it as a distinct workstream (WS5) sequenced after WS4 (it depends on the new generator output format) and parallelizable with WS1 (portable pipeline).

    **Proposed Requirement 8: Component Consumption Migration**

    **User Story**: As a platform component developer, I want DesignerPunk components to consume theme-varying tokens from the platform-native theme propagation mechanism so that components render correctly when a custom theme is applied.

    Suggested acceptance criteria:

    1. WHEN an iOS component references a theme-varying color token THEN it SHALL read from `@Environment(\.{abbreviation}Theme)` instead of a static `DesignTokens` property
    2. WHEN an Android component references a theme-varying color token THEN it SHALL read from the `CompositionLocal` theme provider instead of a static `DesignTokens` property
    3. WHEN a theme is provided via `@Environment` on an ancestor SwiftUI view THEN all descendant DesignerPunk components SHALL render using that theme's token values
    4. WHEN a theme is provided via `CompositionLocalProvider` on an ancestor composable THEN all descendant DesignerPunk composables SHALL render using that theme's token values
    5. WHEN a component references a non-theme-varying token (spacing, sizing, radius, typography) THEN it SHALL continue using static `DesignTokens` references — no migration needed for static tokens
    6. WHEN all iOS and Android components are migrated THEN the old static color token properties SHALL be removed from the generated output to prevent dual-pattern consumption

    The work is mechanical (find-and-replace color token references across platform files) but wide. It doesn't block M0a (web-only) but must be complete before M0b activates iOS and Android.

    **Counter-argument to including this**: It expands the critical-path spec's scope. If the migration hits unexpected issues (a component consuming color tokens in a non-standard way), it could delay the whole spec. Mitigation: the migration is parallelizable with WS1 and doesn't block M0a launch. It blocks M0b readiness, which is the right pressure point.

### Requirement 4: Missing Config Fields

4. **R4 is missing acceptance criteria for `name` and `abbreviation` config fields.** Ada's R3 discussion with Peter confirmed that the config accepts product name and abbreviation for generating platform-native type names (`WrKingClassTheme`, `WKCTokens`, etc.). Peter confirmed this. The current R4 ACs only cover `themes`, `output`, and `componentTokens`. Suggested additions:

    - WHEN the config specifies a `name` field THEN the pipeline SHALL use it to generate platform-native type names (e.g., `{name}Theme` for the theme protocol/data class)
    - WHEN the config specifies an `abbreviation` field THEN the pipeline SHALL use it for abbreviated identifiers (e.g., `{abbreviation}ThemeKey` for the environment key)
    - WHEN no `name` or `abbreviation` is provided THEN the pipeline SHALL use `DesignerPunk` and `DP` as defaults

### Requirement 4: TypeScript Execution Dependency

5. **Agree with Ada R1 item 8 — and it's also a component build concern.** The `designerpunk.config.ts` requires TypeScript execution in the product repo. Whether `ts-node` is a peer dependency of `@designerpunk/core` or bundled with the CLI affects Sparky's build tooling setup for M0a. This should be resolved during design, not discovered during Sparky's first `npx designerpunk generate` attempt.

### Agreements with Ada R1

6. **R1 registration-time validation** — agree. Fail fast at registration with a clear error is better DX than a cryptic resolver failure during generation.
7. **R6 AC 3 "311 test suites"** — agree. Use "all existing test suites" instead of a fragile count.
8. **R5 AC 1 `node_modules` assumption** — agree. Resolve from the package's actual installed location, not a hardcoded path.

### Summary

| Item | Action |
|------|--------|
| R3 AC 4 component integration test | I'll own this — Shadow DOM inheritance verification |
| Missing R8: Component consumption migration | Add as WS5, sequenced after WS4, parallel with WS1 |
| R4 missing `name`/`abbreviation` ACs | Add per Ada R3 / Peter confirmation |
| R4/R7 TypeScript execution dependency | Clarify whether `ts-node` is peer dep or bundled |
| R6 AC 3 fragile count | Use "all existing test suites" (agree with Ada) |

No concerns about the existing requirements' accuracy. The additions (R8, R4 config naming fields) close gaps that the design outline feedback surfaced. Ready for design phase once these are incorporated.

---

## Design Document Feedback

### Context for Reviewers

- Design doc is at `design.md` — architecture, interfaces, data models, correctness properties, error handling, testing strategy, design decisions
- Requirements are at `requirements.md` — 8 requirements, 44 acceptance criteria
- **Kenya + Data**: Verify the Swift/Kotlin generated output structure in design.md § "Platform Generators" matches your R1 recommendations. Flag anything that doesn't align with how you'd consume it.
- **Ada**: Full review — architecture, interfaces, correctness properties, error handling, testing strategy. You own implementation. Flag anything that's wrong, missing, or would be difficult to implement.
- **Lina**: Consumer validation — component-side implications of the generated output, R8 migration scope, Shadow DOM inheritance with the CSS scoping pattern. Flag anything that affects components.

### Kenya

#### [KENYA R2]

**Scope**: Design doc review from the iOS consumer perspective — verifying the Swift generator output structure, flagging one gap, and confirming alignment with my R1 recommendation.

### Swift Generator Output: Confirmed Correct

The design doc's Swift generator section (§ "Platform Generators") matches my R1 recommendation accurately:

- Protocol with theme-varying properties ✓
- Concrete struct per theme ✓
- `{Name}` and `{Abbreviation}` from config ✓
- `EnvironmentKey` with base light default ✓
- Static tokens stay in `DesignTokens` ✓

The generated output structure is exactly what I'd consume. No misalignment.

### Gap: Shadow Tokens in Theme-Varying Determination

The design doc says `getThemeVaryingTokens()` collects the union of all overridden token names across registered themes. Ada's R3 confirmed this is deterministic and straightforward. But there's a subtlety for iOS and Android that the design doc doesn't address: **shadow tokens reference color tokens**.

Looking at the current generated `DesignTokens.ios.swift`, shadow semantic tokens like `shadowContainer` reference `shadowBlack100` (a color). If a theme overrides shadow colors (e.g., a marketing theme uses warm-tinted shadows instead of pure black), the shadow tokens themselves aren't overridden — their *color dependency* is.

On web this is a non-issue: CSS custom properties resolve at render time, so `--shadow-container` referencing `--shadow-black-100` automatically picks up the themed value. On iOS and Android, the generated shadow values are baked in at build time. If `shadowBlack100` changes in a theme but `shadow.container` isn't in the override set, the shadow token stays static with the base color.

**This might not be a problem today** — I don't see any theme overriding shadow colors in the current system. But the design doc should acknowledge this as a known limitation or document the rule: if a theme overrides a primitive that a shadow token references, the shadow token must also be included in the theme-varying set (transitively). Otherwise the iOS/Android shadow values will be stale for that theme.

**Counter-argument**: This is an edge case with no current use case. The marketing theme is dark-only and doesn't override shadow colors. Documenting it as a known limitation and deferring transitive dependency tracking is reasonable — it's complexity with no immediate payoff. But it should be documented so it doesn't surprise someone later.

**Recommendation**: Add a note to the Correctness Properties or a "Known Limitations" section: "Theme-varying determination is direct (tokens explicitly overridden), not transitive (tokens that reference overridden tokens). Shadow tokens that reference theme-varying color primitives will use base values on iOS/Android. This is acceptable for M0a/M0b; transitive resolution can be added if a theme needs themed shadows."

### ThemeAwareBlendUtilities Consolidation — Defer

Ada asked in R3 whether I'd want to consolidate the existing `ThemeModeKey` with the new theme environment as part of this spec. My answer: **defer it.** The two can coexist. The existing `ThemeModeKey` tracks light/dark mode for blend utilities. The new `{Abbreviation}ThemeKey` provides the full theme. They serve different purposes today, and consolidating them adds scope to an already-large spec with no functional benefit. I flagged it as a cleanup opportunity in R1, and I see it's already in the Deferred Items table in the requirements doc. That's the right place for it.

### R8 Migration Scope — Bounded and Mechanical

The design doc's R8 testing strategy says "per-component verification" that iOS components read from `@Environment` instead of static `DesignTokens`. This is accurate. The migration is:

1. Add `@Environment(\.{abbreviation}Theme) var theme` to each component that references color tokens
2. Replace `Color(DesignTokens.colorActionPrimary)` with `theme.colorActionPrimary` (and similar for all theme-varying colors)
3. Leave all spacing, sizing, typography, motion references as-is (static `DesignTokens`)

Looking at the existing iOS components, the pattern is consistent: components define local token enums (e.g., `ChipInputTokens`, `BadgeLabelBaseTokens`) that wrap `DesignTokens` static properties. The migration touches those local token enums — they'd reference `theme.colorX` instead of `Color(DesignTokens.colorX)`. The component body code that references the local enum doesn't change.

One wrinkle: the local token enums are currently `enum` types with `static let` properties. Static properties can't access `@Environment`. The migration would need to either:
- (a) Convert the local token enums to computed properties on the view struct, or
- (b) Pass the theme into the token enum as a parameter, or
- (c) Move color token references out of the local enum and into the view body directly

Option (c) is simplest and most consistent with how `@Environment` is typically used in SwiftUI. The local enums keep their static spacing/sizing tokens; color references move to the view body where `@Environment` is available.

This is an implementation detail for when R8 happens, but worth flagging now so the design doc's "mechanical find-and-replace" characterization is accurate with this caveat. It's not quite find-and-replace — there's a small structural change per component to accommodate `@Environment` access patterns.

### Config Naming — Confirmed

The `name`/`abbreviation` config pattern from Ada's R3 and Peter's confirmation is clean. For the DesignerPunk repo: `DesignerPunkTheme` protocol, `DPThemeKey` environment key. For a product: `WrKingClassTheme` protocol, `WKCThemeKey`. The uppercase abbreviation avoids Data's `Dp`/density-pixel collision. No concerns from the iOS side.

### Questions

- [@ADA] On the shadow token transitivity point — is this something the pipeline could detect automatically (walk the reference chain from shadow tokens to their color primitives, check if any are in the theme-varying set), or is it genuinely out of scope for the current resolver architecture? I'm fine with documenting it as a known limitation, but want to understand the implementation cost of solving it.

---

### Data

#### [DATA R3]

**Scope**: Design doc review from the Android consumer perspective — verifying the Kotlin generator output structure, flagging the same shadow transitivity issue Kenya raised, and detailing the R8 migration wrinkle on Android.

### Kotlin Generator Output: Confirmed Correct

The design doc's Kotlin generator section (§ "Platform Generators") matches my R1 recommendation:

- Data class with theme-varying properties ✓
- Named instance per theme in `{Name}Themes` object ✓
- `{Name}` and `{Abbreviation}` from config ✓
- `CompositionLocal` with base light default ✓
- Static tokens stay in `DesignTokens` object ✓

One improvement the design doc gets right that's worth calling out: the theme data class uses Compose `Color` directly (`Color(0xFF00F0FF)`), not `Int` with `Color.argb()`. The current generated file stores colors as `const val: Int = Color.argb(255, ...)` and components wrap them with `Color(DesignTokens.x)`. The new pattern eliminates that wrapping — cleaner DX and one less thing to get wrong.

### Shadow Token Transitivity: Same Issue as iOS

Kenya's R2 flagged this for iOS and it applies identically to Android. Shadow semantic tokens (e.g., `shadow_container`) reference shadow color primitives (e.g., `shadow_black_100`). On web, CSS custom properties resolve at render time — no issue. On Android, the generated values are baked in. If a theme overrides a shadow color primitive but `shadow_container` isn't in the override set, the shadow stays static with the base color.

I agree with Kenya's recommendation: document as a known limitation in Correctness Properties. No current theme overrides shadow colors, and the marketing theme won't either. Transitive resolution is complexity with no immediate payoff.

### R8 Migration: Same Structural Wrinkle as iOS

Kenya flagged that iOS components use local `enum` types with `static let` properties for token references, and static properties can't access `@Environment`. Android has the exact same pattern with `private object`:

```kotlin
private object NavTabBarTokens {
    val containerBackground = Color(DesignTokens.color_structure_canvas)
    val borderColor = Color(DesignTokens.color_structure_border_subtle)
    val activeIconColor = Color(DesignTokens.color_action_navigation)
    // ...
}
```

23 Android components use this pattern, with 89 total `Color(DesignTokens.x)` references. The `private object` properties are static — they can't access `CompositionLocal`.

Migration options parallel Kenya's:
- (a) Convert the object to a class that takes the theme as a parameter
- (b) Move color token references out of the object and into the composable body
- (c) Make the token object a `@Composable` function returning a data class

Option (b) is simplest and most consistent with how `CompositionLocal` is typically consumed in Compose. The `private object` keeps its static spacing/sizing tokens; color references move to the composable body where `CompositionLocal.current` is available. This is the same conclusion Kenya reached for iOS.

The design doc's R8 testing strategy ("per-component verification") is accurate. The characterization of the migration as "mechanical" is mostly right — but it's not pure find-and-replace. There's a small structural change per component to move color refs out of the static object. Worth noting so implementation estimates account for it.

### Config Naming: No Concerns

`{Name}Theme` data class, `Local{Abbreviation}Theme` CompositionLocal. Uppercase `DP` for DesignerPunk avoids the density-pixel collision I flagged in R2. Clean.

### No Other Concerns

Architecture, interfaces, data models, correctness properties, error handling, and testing strategy are all solid from the Android consumer perspective. The design doc accurately reflects what I'd need to consume.

---

## Design Document Feedback

### Ada

#### [ADA R1]

**Overall assessment**: The design document is well-structured and technically sound. The architecture diagrams (current vs target flow) are clear, the interfaces are concrete, the correctness properties are testable, and the design decisions are well-reasoned with trade-offs documented. My feedback covers a few technical accuracy issues I found by verifying against the actual codebase, one architectural concern about the generator refactoring approach, and a gap in the integration points.

### Technical Verification

1. **The `GenerationOptions` interface is a bigger refactoring surface than the design suggests.** The current `GenerationOptions` has four explicit token array properties: `semanticTokens`, `darkSemanticTokens`, `wcagSemanticTokens`, `darkWcagSemanticTokens`, plus `wcagOverrideKeys`. The design doc's `resolveForRegistry` returns a `Map<string, SemanticToken[]>`. This means `GenerationOptions` needs to change from four named arrays to a map-based structure, and every method that destructures those four properties needs updating. This isn't just the resolver — it's `generatePlatformTokens`, `generateSemanticSection`, `maybeGenerateWcagBlock`, and anything that references the four named arrays. The design doc should acknowledge this interface change explicitly, because it's the connective tissue between the resolver and the generators.

2. **The `generatePlatformTokens` method is shared across all three platforms.** The design doc describes separate changes for CSS, Swift, and Kotlin generators. But the actual code has a single `generatePlatformTokens` method that handles all three platforms via a `platform` parameter and platform-specific config/generators. The theme-aware output restructuring (protocol on iOS, data class on Android, `data-theme` scoping on CSS) means this shared method likely needs to split — the output structures are too different to share a single code path. The CSS generator adds scoped blocks. The Swift generator produces a protocol + structs + EnvironmentKey. The Kotlin generator produces a data class + instances + CompositionLocal. These are fundamentally different output shapes, not variations of the same template.

    My recommendation: keep `generatePlatformTokens` for the static token portion (primitives + non-theme-varying semantics — this is identical across platforms in structure, just different syntax). Add platform-specific methods for the theme-aware portion: `generateWebThemeBlocks`, `generateSwiftThemeTypes`, `generateKotlinThemeTypes`. This keeps the shared code shared and the divergent code separate.

3. **The WCAG block generation has special handling that needs to survive the refactoring.** The current `maybeGenerateWcagBlock` method generates WCAG overrides with special positioning — on web, WCAG goes after the `:root` footer; on iOS/Android, it goes before the struct footer. The `wcagAfterFooter` config flag controls this. When WCAG becomes "just another registered theme," this special positioning logic needs to be generalized. Every registered theme's override block needs correct positioning per platform. The design doc doesn't address this — it's an implementation detail, but it's the kind of detail that causes subtle bugs if not planned for.

### Architectural Concern: Resolver Return Type

4. **The `resolveForRegistry` return type (`Map<string, SemanticToken[]>`) uses string keys like `'dark-marketing'`.** This reintroduces a naming convention dependency — the caller needs to know the key format to find a specific theme's tokens. Consider returning a structured type instead:

    ```typescript
    interface ResolvedThemeSet {
      theme: ThemeRegistration;
      resolvedTokens: SemanticToken[];
    }
    ```

    Then `resolveForRegistry` returns `ResolvedThemeSet[]`. The generators iterate the array and use `theme.name` and `theme.mode` to determine output structure. No string key parsing, no naming convention to maintain.

### Gap: DTCG and Figma Generators

5. **The design doc covers CSS, Swift, and Kotlin generators but doesn't mention DTCG or Figma.** The pipeline currently generates `DesignTokens.dtcg.json` and `DesignTokens.figma.json`. When custom themes are registered, these outputs need to include the themed values too. The DTCG format has a `$extensions` mechanism that could carry theme metadata. The Figma format has variable modes that map to themes. Neither is addressed in the design doc.

    This might be intentional — DTCG and Figma outputs could be deferred since they're not consumed by platform agents during M0a. But if the pipeline generates them (and it does — `DTCGFormatGenerator` and `FigmaTransformer` are part of the build), they'll either break or produce incomplete output when the resolver changes. At minimum, the design doc should state whether DTCG/Figma are in scope or explicitly deferred, and if deferred, how they avoid breaking.

### Design Decisions: All Sound

6. **Decision 5 (migrate first, extend second) is the most important decision in the doc.** Byte-for-byte identical output after migration is the strongest regression guarantee possible. Mixing refactoring with new features makes failures ambiguous. This sequential approach is slower but significantly safer, and it aligns with Peter's guidance to prioritize getting it right.

7. **Decision 3 (`data-theme` only, no `data-mode`) correctly reflects the resolution from Lina's feedback and my R2 withdrawal.** The rationale is accurate.

8. **Decision 4 (product name in generated types) correctly reflects Peter's confirmed decision.** The `{Name}` and `{Abbreviation}` placeholders in the Swift and Kotlin examples are clear.

### Error Handling

9. **The error handling table is good. One addition:** What happens when a theme's override references a primitive token that doesn't exist? The current `SemanticOverrideMap` maps semantic token names to `{ primitiveReferences: { value: 'primitiveName' } }`. If `primitiveName` doesn't exist in the primitive registry, the resolver will fail during value resolution, not during override validation. The registry validates that the *semantic* token name exists, but not that the *primitive reference* within the override is valid. This is a deeper validation that might belong in the resolver rather than the registry, but it should be documented as an error case.

### Testing Strategy

10. **The snapshot test approach is right.** Capturing all platform outputs before refactoring and asserting byte-for-byte identity after is the gold standard for this kind of infrastructure change. One practical note: the snapshots should be committed to the repo (or generated as part of a pre-refactoring step) so they're reproducible. If the snapshots are generated on-the-fly, they depend on the current build being correct — which is a reasonable assumption but worth stating.

11. **The R8 (component consumption migration) testing section is correctly scoped.** Per-component verification that the new theme-aware consumption works, plus full regression suite. This is Lina's work but the testing expectations should be agreed upon before implementation starts.

### Summary

| Area | Assessment | Action |
|------|-----------|--------|
| Architecture | Sound, well-structured | None |
| `GenerationOptions` refactoring | Under-specified | Document the interface change explicitly |
| `generatePlatformTokens` split | Not addressed | Recommend splitting shared method for theme-aware output |
| WCAG block positioning | Not addressed | Document how theme block positioning generalizes |
| Resolver return type | String keys are fragile | Consider structured `ResolvedThemeSet` type |
| DTCG/Figma generators | Not mentioned | State in-scope or explicitly deferred |
| Design decisions | All sound | None |
| Error handling | Good, one gap | Add primitive reference validation |
| Testing | Strong | Commit snapshots for reproducibility |

The design is solid. The items above are refinements, not directional changes. Ready for implementation planning once these are addressed.

---

### Lina

#### [LINA R1]

**Overall assessment**: The design doc is well-structured and the architecture is sound. The current-vs-target flow diagrams are clear, the interfaces are concrete, and the design decisions are well-reasoned. Kenya, Data, and Ada have covered the platform generator details and pipeline internals thoroughly. My feedback is focused on the component-side implications: what the generated output means for Stemma, the R8 migration reality check, the CSS scoping verification I'll own, and one gap in the correctness properties that Kenya and Data both flagged.

### CSS Scoping: Verified, I'll Own the Integration Test

The CSS generator output pattern is correct and matches what I verified in the actual `dist/DesignTokens.web.css` during the design outline review:

- `:root` — base theme, `light-dark()` for mode
- `:root[data-theme="wcag"]` — overrides with `light-dark()`
- `:root[data-theme="marketing"]` — dark-only, `color-scheme: dark`, static values

As I noted in the requirements feedback, R3 AC 4 (descendant components inherit themed values) is a component-side integration test, not a pipeline test. I'll write this test as part of R8 work. The test renders actual Shadow DOM components inside a `data-theme` container and asserts they pick up the themed custom property values. This includes the nested shadow boundary case (Nav-Header-App composing Nav-Header-Base) that I flagged in the pre-launch feedback.

### R8 Migration: Kenya and Data Are Right — It's Not Pure Find-and-Replace

Kenya (R2) and Data (R3) both identified the same structural wrinkle: iOS components use local `enum` types with `static let` properties, and Android components use `private object` with `val` properties. Static properties can't access `@Environment` or `CompositionLocal`.

Both recommend option (b): move color token references out of the static token object/enum and into the view/composable body where the theme environment is accessible. Static tokens (spacing, sizing, radius) stay in the local enum/object.

I agree this is the right approach, and I want to add specificity from having worked on these components:

**The local token pattern is consistent across components.** Every iOS and Android component follows the same structure — a local token enum/object that wraps `DesignTokens` static properties, and a view/composable body that references the local enum. This consistency is good news for the migration: the structural change is the same in every component, even if it's not pure find-and-replace.

**The migration has three steps per component, not one:**
1. Add `@Environment(\.{abbreviation}Theme) var theme` (iOS) or `val theme = Local{Abbreviation}Theme.current` (Android) to the component
2. Move color token references from the static enum/object into the view/composable body, referencing `theme.colorX` instead of `Color(DesignTokens.colorX)`
3. Verify the local enum/object still compiles with only static (non-color) tokens remaining — some may become empty and can be removed

Data counted 23 Android components with 89 `Color(DesignTokens.x)` references. I'd expect a similar count on iOS. This is a day or two of focused work per platform, not a week. But it's not a one-line sed command either.

**One thing to watch**: components that pass color tokens as constructor parameters to child components or helper functions. If a color value flows through a parameter, the migration needs to trace that flow — the parameter type might change from a static `Color` to a theme-resolved `Color`. In practice, most components resolve tokens locally and don't pass them around, but it's worth checking during implementation.

### Shadow Token Transitivity: Agree with Kenya and Data

Kenya (R2) and Data (R3) both flagged that shadow tokens reference color primitives, and on iOS/Android the values are baked in at build time. If a theme overrides a shadow color primitive but the shadow token itself isn't in the override set, the shadow stays static with the base color.

I agree with their recommendation: document as a known limitation in Correctness Properties. No current theme overrides shadow colors. The marketing theme won't either. Transitive resolution is complexity with no immediate payoff.

From the component side, this is a non-issue for web (CSS custom properties resolve at render time) and a theoretical issue for iOS/Android that has no current trigger. If a future theme needs themed shadows, we'll know — the shadow values will visually mismatch, and the fix is either adding shadow tokens to the override set or implementing transitive resolution.

### Ada's Architectural Points: Component-Side Implications

Ada flagged three things that affect components indirectly:

1. **`GenerationOptions` interface change** (Ada item 1) — This is pipeline-internal, but the output format change is what components consume. As long as the generated files have the same structure the design doc specifies (protocol + structs on iOS, data class + instances on Android, `data-theme` scoping on CSS), the internal plumbing doesn't affect me.

2. **`generatePlatformTokens` split** (Ada item 2) — Agree with Ada's recommendation to split the shared method. The output structures are fundamentally different across platforms for the theme-aware portion. This is Ada's implementation concern, not mine, but the split makes it easier to verify each platform's output independently.

3. **DTCG/Figma generators** (Ada item 5) — These don't affect components directly, but if they break silently during the refactoring, it's a regression. Ada's right that the design doc should state whether they're in scope or deferred.

### Correctness Properties: One Addition

The five correctness properties are good. I'd add one that's implicit but worth stating:

**6. Web components are unaffected by the registry migration.** Web components consume CSS custom properties. The registry migration changes how those properties are generated but not their names, values, or scoping. No web component code changes are needed for WS4 or WS1. R8 applies only to iOS and Android.

This is obvious from the architecture, but stating it explicitly prevents scope creep — nobody should be touching web component files as part of this spec.

### Design Decisions: All Sound

Decision 3 (`data-theme` only) correctly reflects the resolution from my design outline feedback and Ada's R2 withdrawal. Decision 5 (migrate first, extend second) is the right call — byte-for-byte identical output after migration is the strongest safety net for a change this deep.

### Summary

| Area | Assessment | Action |
|------|-----------|--------|
| CSS scoping | Correct, matches actual output | I'll own the integration test (R3 AC 4) |
| R8 migration | Not pure find-and-replace | Document the three-step-per-component pattern; watch for color params passed to children |
| Shadow token transitivity | Known limitation, no current trigger | Add to Correctness Properties or Known Limitations (agree with Kenya/Data) |
| Web component impact | None | Add explicit correctness property stating web components are unaffected |
| Architecture | Sound | No component-side concerns |
| Design decisions | All sound | None |

The design is solid from the component consumer perspective. Ready for implementation planning.

---

## Tasks Feedback

### Context for Reviewers

- Tasks doc is at `tasks.md` — 6 tasks (0-5), 22 subtasks
- Sequencing: Task 0 (prereqs) → Task 1 (migrate) → Task 2 (extend) → Task 3 (portable pipeline). Task 4 (component migration) parallelizable with Task 3.
- **Ada**: You own Tasks 1-3. Verify sequencing, subtask scope, and whether anything is missing or over-scoped.
- **Lina**: You own Task 0 and Task 4. Verify the family groupings in 4.1-4.8 are correct, the three-step migration pattern is captured, and the subtask scope is right.
- **Kenya + Data**: Verify the iOS (4.1-4.4) and Android (4.5-4.8) migration subtasks match the consumption patterns you recommended. Flag if the family groupings miss any components or if the migration order matters.
- **Thurgood**: I own Task 5. Self-review complete.

[Agent feedback rounds here]

---

### Ada

#### [ADA R1]

**Overall assessment**: The task structure is well-organized and the sequencing is correct. Task 1 (migrate) → Task 2 (extend) → Task 3 (portable pipeline) respects the dependency chain. The "migrate first, extend second" split across Tasks 1 and 2 directly implements Design Decision 5, which is the most important safety decision in the spec. My feedback covers sequencing refinements, scope gaps, and one subtask I think is over-scoped.

### Task 1: Theme Registry & Migration — Solid

1. **Subtask 1.1 (snapshots) is correctly first.** These snapshots are the regression baseline for the entire spec. Capturing all platform outputs including DTCG and Figma is thorough — I noted in my design feedback that DTCG/Figma were unaddressed, and I see they're included in the snapshot list here. Good.

2. **Subtask 1.2 (ThemeRegistry) correctly includes registration-time override validation.** This was the gap I flagged in my requirements feedback (R1 item 1). The subtask says "Override reference validation against semantic token registry (fail fast at registration)." That's exactly right.

3. **Subtask 1.3 (migration) is the highest-risk subtask in the spec.** It touches the resolver, the generation options interface, the generator entry point, and the WCAG block positioning — all in one subtask. The scope is correct (all of these need to change together for the migration to work), but the risk is that a failure in any one of these changes is hard to isolate. The snapshot comparison at the end is the safety net. I'd recommend committing the ThemeRegistry (1.2) before starting 1.3, so if the migration goes sideways, we can roll back to a clean state with the registry already in place.

4. **Subtask 1.3 includes `ResolvedThemeSet[]`** — this addresses my design feedback about the resolver return type. Good.

5. **Subtask 1.4 (full regression) is the right gate.** Running `npm test`, `npm run generate:platform-tokens`, and component behavioral contract tests before proceeding to Task 2 ensures we're extending from a known-good state.

### Task 2: Platform Generator Restructuring — One Scope Concern

6. **Subtask 2.1 (split `generatePlatformTokens`) is correctly scoped as Architecture/Tier 3.** This is the structural change that enables 2.2-2.5. It should land first within Task 2.

7. **Subtask 2.2 (CSS generator) should be straightforward** given the existing pattern. The current generator already produces a `[data-theme="wcag"]` block. Adding blocks for additional registered themes follows the same pattern. The `color-scheme: dark` handling for dark-only themes is the one new behavior.

8. **Subtasks 2.3 and 2.4 (Swift and Kotlin generators) are the most significant new work in the spec.** These are generating entirely new output structures — protocol + structs + EnvironmentKey on Swift, data class + instances + CompositionLocal on Kotlin. The subtask descriptions are accurate but I want to flag: these are not modifications to existing generator code. They're new generation methods producing new output formats. The existing Swift and Kotlin generators produce flat constant files. The new methods produce structured, type-safe theme containers. This is closer to "write a new generator" than "modify an existing one."

    That's not a scope problem — it's correctly in scope. Just want to set expectations that 2.3 and 2.4 are the heaviest implementation subtasks in the spec.

9. **Subtask 2.5 (DTCG and Figma) — I need to investigate the Figma generator more carefully before implementation.** The DTCG format has a clear `$extensions` mechanism for theme metadata. The Figma format's variable modes are less straightforward — the `FigmaTransformer` produces a specific structure for Figma Variables, and adding theme modes may require understanding Figma's variable collection model. I'll flag if this subtask needs to be split once I dig into the Figma transformer. For now, the scope description is reasonable.

### Task 3: Portable Pipeline — One Missing Subtask

10. **Subtask 3.1 (defineConfig + ConfigLoader) is correctly scoped.** The `require.resolve` strategy for package path resolution is the right approach — it handles npm workspaces, pnpm, and yarn PnP without assuming `node_modules` structure.

11. **Subtask 3.2 (abstract hardcoded paths) includes the `*.tokens.ts` convention for component token discovery.** This addresses my requirements feedback (R1 item 5) about clarifying directory vs file-based discovery.

12. **Subtask 3.3 (Pipeline CLI) needs to resolve the TypeScript execution strategy.** The subtask says "TypeScript execution strategy for config loading (document decision for Integration Guide)" — but the decision itself needs to happen during implementation, not just be documented afterward. The options are: (a) bundle `ts-node` as a dependency of `@designerpunk/core`, (b) require it as a peer dependency, (c) use `tsx` (lighter alternative), or (d) pre-compile the config. This should be an explicit decision point within the subtask, not a documentation afterthought.

13. **Missing subtask: default config for the DesignerPunk repo.** After Task 3, the DesignerPunk repo itself should have a `designerpunk.config.ts` (or work without one via defaults). The tasks don't explicitly state whether the DesignerPunk repo gets a config file or relies on defaults. I'd recommend creating a `designerpunk.config.ts` in the repo root with the default values explicitly stated — it serves as both the working config and a reference example. This could be part of 3.2 or a separate small subtask.

### Sequencing: Correct, One Refinement

14. **Task 1 → Task 2 → Task 3 is the right order.** Task 1 establishes the registry with identical output (safe foundation). Task 2 extends the generators to produce theme-aware output (new capability). Task 3 makes the pipeline portable (new context). Each task builds on the previous one's stable state.

15. **Task 4 parallelizable with Task 3 is correct.** The component migration depends on Task 2's output (the new generated Swift/Kotlin files with theme types), not on Task 3's portability work. Once Task 2 ships the new output format, Lina can start migrating components while I work on the portable pipeline.

16. **One refinement: Task 2 subtask ordering matters.** 2.1 (split method) must come first. Then 2.2 (CSS), 2.3 (Swift), 2.4 (Kotlin) can be done in any order — they're independent platform generators. 2.5 (DTCG/Figma) should come last since it's the least critical and most likely to surface surprises. The tasks doc doesn't specify internal ordering within Task 2, but it's worth noting.

### Summary

| Task | Assessment | Action |
|------|-----------|--------|
| Task 0 (prereqs) | Lina's scope — no comments | None from me |
| Task 1 (migrate) | Solid, highest-risk subtask is 1.3 | Recommend committing 1.2 before starting 1.3 |
| Task 2 (extend) | Correct scope, 2.3/2.4 are the heaviest work | Set expectations; may need to split 2.5 after Figma investigation |
| Task 3 (portable) | One missing subtask, one decision point | Add default config subtask; make TS execution an explicit decision in 3.3 |
| Task 4 (migration) | Lina's scope — no comments | None from me |
| Task 5 (guide) | Thurgood's scope — no comments | None from me |
| Sequencing | Correct | Note internal ordering within Task 2 |

### Lina

#### [LINA R1]

**Overall assessment**: The task structure is well-organized. The family groupings in Task 4 are correct and complete — all 34 components accounted for across the four subtask groups per platform. The three-step migration pattern is captured accurately. My feedback covers Task 0 scope, Task 4 refinements based on actual codebase analysis, and one sequencing observation.

### Task 0: Prereqs — Correct, Ready to Execute

Task 0 is straightforward and I can start immediately. The four missing components in `browser-entry.ts` (Nav-Header-Base, Nav-Header-App, Nav-Header-Page, Progress-Bar-Base) and the Nav-Header-Base metadata fix are both well-scoped. The ordering note (Nav-Header-Base registered before App and Page) is correct — both compose it.

One addition: the task says "Rebuild ESM bundle, verify all 34 components registered." I'd also verify the Application MCP index is healthy after the bundle change — run `rebuild_index` (the tool we just added) and confirm 34 components indexed with no warnings. This is a 30-second check that catches any schema/metadata drift.

### Task 4: Family Groupings — Verified Complete

I cross-referenced the subtask component lists against the actual `platforms/ios/` and `platforms/android/` directories. All 34 components are accounted for:

| Subtask | Components | Count |
|---------|-----------|-------|
| 4.1/4.5 Navigation | Nav-Header-Base, Nav-Header-App, Nav-Header-Page, Nav-SegmentedChoice-Base, Nav-TabBar-Base | 5 |
| 4.2/4.6 Button + Container | Button-CTA, Button-Icon, Button-VerticalList-Item, Button-VerticalList-Set, Container-Base, Container-Card-Base | 6 |
| 4.3/4.7 Form Input + Chip | Input-Text-Base through Input-Radio-Set, Chip-Base through Chip-Input | 11 |
| 4.4/4.8 Remaining | Avatar-Base, Badge family, Icon-Base, Progress family | 12 |

No components missing. No duplicates.

### Task 4: Migration Scope Is Smaller Than It Looks

I scanned every iOS and Android platform file for `DesignTokens.color` references. Not all 34 components need the migration:

**iOS — 8 components have zero color token references:**
Container-Base, Icon-Base, Input-Text-Email, Input-Text-Password, Input-Text-PhoneNumber, Nav-Header-App, Progress-Stepper-Base, Progress-Stepper-Detailed

**Android — 8 components have zero color token references:**
Icon-Base, Input-Text-Base, Input-Text-Email, Input-Text-Password, Input-Text-PhoneNumber, Nav-Header-App, Progress-Stepper-Base, Progress-Stepper-Detailed

These components either inherit colors from a parent component or don't use colors at all. They don't need the three-step migration — they have no color refs to move. The subtasks should still list them (for completeness and verification), but the actual work is ~26 components per platform, not 34.

The heaviest components by color ref count are Button-VerticalList-Item (22 refs on iOS), Input-Text-Base (18 refs on iOS), and Button-CTA (11 refs on iOS). These are the ones most likely to surface the "color passed as parameter" wrinkle Kenya and I flagged.

### Task 4: Three-Step Pattern — Captured Correctly

The subtasks describe the right pattern:
1. Add environment property (`@Environment` / `CompositionLocal.current`)
2. Move color refs from static enum/object to view/composable body
3. Clean up empty enums if applicable

One refinement: step 3 should also check whether the local token enum/object has any remaining properties. If all its properties were color tokens, the enum/object becomes empty and should be removed entirely rather than left as a dead declaration. If it retains static tokens (spacing, sizing), it stays. This is a per-component judgment call, not a blanket rule.

### Task 4.9: Sequencing Concern

4.9 says "Remove old static color properties from generated Swift and Kotlin output." This means Ada modifies the generators to stop producing the old static color constants. But 4.9 is listed as my subtask, and the generator changes are Ada's domain.

Two options:
- (a) I do 4.1-4.8 (component migration), then Ada updates the generators to remove old static color properties, then I run the final regression. This respects domain boundaries but adds a handoff.
- (b) 4.9 is split: Ada removes the old properties from the generators (her domain), I run the final regression (my domain). Two sub-steps, clear ownership.

Option (b) is cleaner. The generator change is small (remove the static color constants from the Swift/Kotlin output methods), but it's pipeline code, not component code. I shouldn't be modifying generators.

### Task 5: CSS Scoping Integration Test — Noted

Task 5 includes "CSS scoping integration test... owned by Lina." This is the R3 AC 4 test I committed to in the requirements feedback. I'll write it, but it should be sequenced after Task 2 (when the CSS generator produces `data-theme` scoped output for custom themes). The test needs themed CSS to exist before it can verify components inherit themed values.

### Summary

| Task | Assessment | Action |
|------|-----------|--------|
| Task 0 | Ready to execute | Add Application MCP health check after bundle rebuild |
| Task 4 groupings | Correct, all 34 accounted for | None |
| Task 4 scope | Smaller than listed — 8 components per platform have no color refs | Note in subtasks for accurate estimation |
| Task 4 pattern | Correctly captured | Add note about removing empty enums entirely |
| Task 4.9 | Domain boundary issue | Split: Ada removes old generator properties, Lina runs regression |
| Task 5 CSS test | Noted, I'll own it | Sequence after Task 2 |

Ready for implementation. I can start Task 0 now.

---

### Data

#### [DATA R4]

**Scope**: Tasks doc review — verifying Android migration subtasks (4.5-4.8) match the consumption patterns I recommended, component groupings, and migration order.

### Android Migration Subtasks: Consumption Pattern Confirmed

The three-step pattern in 4.5-4.8 is correct for Android:

1. Add `val theme = Local{Abbreviation}Theme.current` in the composable
2. Move color refs from `private object` to composable body
3. Clean up empty objects if applicable

This matches my R1/R3 recommendations. No misalignment.

### Family Groupings: Complete, No Missing Components

Cross-referenced the subtask component lists against the actual `platforms/android/` directory. All 34 components accounted for across 4.5-4.8. No duplicates, no omissions.

### Scope Is Smaller Than Listed — 11 Components Have Zero Color Refs

Lina found 8 iOS components with no color refs. On Android it's 11:

| Component | Why No Color Refs |
|-----------|-------------------|
| Icon-Base | Uses `LocalContentColor.current` (Material 3), not DesignTokens |
| Input-Text-Base | No `Color(DesignTokens.)` calls |
| Input-Text-Email | Delegates to Input-Text-Base |
| Input-Text-Password | Delegates to Input-Text-Base |
| Input-Text-PhoneNumber | Delegates to Input-Text-Base |
| Nav-Header-App | Composes Nav-Header-Base, no own color refs |
| Nav-Header-Page | Composes Nav-Header-Base, no own color refs |
| Progress-Bar-Base | No `Color(DesignTokens.)` calls |
| Progress-Pagination-Base | No `Color(DesignTokens.)` calls |
| Progress-Stepper-Base | Composes child progress components |
| Progress-Stepper-Detailed | Composes child progress components |

That's 23 components needing actual migration work, not 34. The subtasks should still list all 34 for verification, but estimates should reflect the real scope.

**Note**: Input-Text-Base has zero `Color(DesignTokens.)` refs on Android but Lina's iOS scan didn't list it as zero-ref. This is a cross-platform divergence worth noting — the Android implementation may handle colors differently than iOS for this component. Not a problem for the migration, just a parity observation.

### Three Color Token Patterns on Android

The migration isn't uniform. I found three distinct patterns for how Android components reference color tokens:

**Pattern A — `private object` with val properties (most common, ~15 components):**
```kotlin
private object NavTabBarTokens {
    val containerBackground = Color(DesignTokens.color_structure_canvas)
    // ...
}
```
Migration: move color vals to composable body, keep static tokens in object.

**Pattern B — `private fun` with local vals (~5 components, e.g., Button-CTA):**
```kotlin
private fun getButtonCTAStyleConfig(...): ButtonCTAStyleConfig {
    val colorActionPrimary = Color(DesignTokens.color_action_primary)
    // ...
}
```
Migration: either make the function `@Composable` to access `CompositionLocal`, or pass the theme as a parameter. Passing as parameter is cleaner — avoids making a utility function composable.

**Pattern C — file-level `private val` (~2 components, e.g., Container-Card-Base):**
```kotlin
private val colorSurfacePrimary: Color = Color(DesignTokens.color_structure_surface_primary)
```
Migration: move into the composable body. File-level vals are initialized once at class load — they can't access `CompositionLocal`.

The subtask descriptions say "move color refs from private object to composable body" — that covers Pattern A but not B or C. Suggest updating the subtask descriptions to acknowledge all three patterns, or at minimum note that the migration approach varies per component.

### Migration Order: Doesn't Matter Within Families, But One Dependency

Within each family group (4.5-4.8), migration order doesn't matter — the components are independent. However:

**Nav-Header-Base should be migrated before Nav-Header-App and Nav-Header-Page** (both compose it). If Nav-Header-Base is migrated to read from `CompositionLocal` but its parent composables haven't set up the provider yet, the base component still works — it falls back to the `CompositionLocal` default (base light theme). So it's not a hard dependency, but migrating bottom-up within the composition chain is cleaner.

This is already the natural order in subtask 4.5 (Nav-Header-Base is listed first), so no action needed — just confirming the ordering is correct.

### Task 4.9: Agree with Lina's Domain Split

Lina flagged that 4.9 (remove old static color properties) involves modifying generators, which is Ada's domain. I agree with her option (b): Ada removes the old properties from the Kotlin generator, Lina runs the regression. The generator change is small but it's pipeline code, not component code.

### Summary

| Item | Assessment | Action |
|------|-----------|--------|
| Consumption pattern | Correct | None |
| Family groupings | Complete, all 34 | None |
| Actual migration scope | 23 of 34 components | Note for estimation |
| Three code patterns | Subtasks only describe Pattern A | Update descriptions to cover all three |
| Migration order | Correct as listed | None |
| Task 4.9 split | Agree with Lina | Ada modifies generator, Lina runs regression |

---

### Kenya

#### [KENYA R3]

**Scope**: Tasks doc review — verifying iOS migration subtasks (4.1-4.4) match my R1 consumption pattern, component groupings, migration order, and one refinement to the three-step pattern.

### iOS Migration Subtasks: Consumption Pattern Confirmed

The three-step pattern in 4.1-4.4 is correct for iOS:

1. Add `@Environment(\.{abbreviation}Theme) var theme`
2. Move color refs from local token enum to view body
3. Clean up empty enums if applicable

This matches my R1 and R2 recommendations. No misalignment.

### Family Groupings: Complete

Cross-referenced against the `platforms/ios/` files I know. All 34 components accounted for across 4.1-4.4. No duplicates, no omissions.

### Scope Is Smaller Than Listed — Agree with Lina's Finding

Lina found 8 iOS components with zero `DesignTokens.color` references. That matches my understanding of the codebase. Components like Container-Base, Icon-Base, and the Input-Text delegates (Email, Password, PhoneNumber) either inherit colors from parents or don't use colors at all. The subtasks should still list them for verification, but the actual migration work is ~26 components.

### Two Color Token Patterns on iOS

Data found three patterns on Android. On iOS I see two:

**Pattern A — `enum` with `static let` properties (most common, ~20 components):**
```swift
enum ChipInputTokens {
    static let backgroundColor: Color = Color(DesignTokens.colorStructureSurface)
    static let borderColor: Color = Color(DesignTokens.colorStructureBorder)
    // ...
}
```
Migration: move color properties to the view body where `@Environment` is accessible. Keep static spacing/sizing tokens in the enum.

**Pattern B — Inline `Color(DesignTokens.colorX)` in static factory methods (~6 components, e.g., VisualStateStyles in Button-VerticalList-Item):**
```swift
static func errorSelectMode(checkmarkVisible: Bool) -> VisualStateStyles {
    return VisualStateStyles(
        background: Color(DesignTokens.colorFeedbackErrorBackground),
        borderColor: Color(DesignTokens.colorFeedbackErrorText),
        // ...
    )
}
```
Migration: these static factory methods can't access `@Environment`. They'd need the theme passed as a parameter, or the call site (which is in the view body and has `@Environment` access) resolves the colors and passes them in.

Pattern B is the wrinkle I flagged in my R2 design doc feedback. Button-VerticalList-Item's `VisualStateStyles` has 22 color refs across multiple static factory methods. The migration for that component isn't a simple find-and-replace — it requires restructuring how colors flow into the style computation. It's still bounded work, but it's the heaviest single component in the iOS migration.

**Recommendation**: The subtask descriptions say "move color refs from local token enum to view body." That covers Pattern A but not Pattern B. Suggest updating 4.2 specifically (which contains Button-VerticalList-Item) to note: "Button-VerticalList-Item requires passing theme colors into VisualStateStyles factory methods — not a simple enum-to-body move."

### Migration Order: Bottom-Up Within Composition Chains

Same observation as Data: within each family group, migration order doesn't matter for independent components. But for composition chains, bottom-up is cleaner:

- **4.1**: Nav-Header-Base before Nav-Header-App and Nav-Header-Page ✓ (already correct in the listing)
- **4.3**: Input-Text-Base before Email/Password/PhoneNumber ✓ (already correct)
- **4.4**: Progress-Indicator-Node-Base and Connector-Base before Progress-Stepper-Base ✓ (already correct)

The current listing order is already bottom-up within each subtask. No changes needed.

### Task 4.9: Agree with Lina's Domain Split

Lina flagged that removing old static color properties from the generators is Ada's domain, not Lina's. I agree. The Swift generator change is small (stop emitting the `static let colorX` properties that moved into the theme protocol), but it's pipeline code. Option (b) — Ada modifies the generator, Lina runs the regression — is the right split.

### Task 2.3 — One Note for Ada

Subtask 2.3 (Swift generator: theme types) says "Generate `{Name}Theme` protocol with theme-varying properties." One implementation detail: the protocol properties should use SwiftUI `Color` type, not `UIColor`. The current generated `DesignTokens.ios.swift` uses `UIColor` for color constants, but components already wrap them in `Color(DesignTokens.colorX)` at the consumption site. The new theme protocol should emit `Color` directly — it eliminates the wrapping step and is the native SwiftUI type. This means the generated theme structs do the `UIColor` → `Color` conversion at definition time, not at consumption time.

This is a small but meaningful DX improvement. Every component currently writes `Color(DesignTokens.colorActionPrimary)`. With the theme protocol emitting `Color`, they'd write `theme.colorActionPrimary`. Cleaner.

### Summary

| Item | Assessment | Action |
|------|-----------|--------|
| Consumption pattern | Correct | None |
| Family groupings | Complete, all 34 | None |
| Actual migration scope | ~26 of 34 (agree with Lina) | Note for estimation |
| Two code patterns | Subtasks only describe Pattern A | Update 4.2 to note Pattern B for Button-VerticalList-Item |
| Migration order | Correct as listed (bottom-up) | None |
| Task 4.9 split | Agree with Lina | Ada modifies generator, Lina runs regression |
| Task 2.3 Color type | Protocol should emit `Color`, not `UIColor` | Note for Ada's implementation |

---