# Spec 096 Feedback: Requirements, Design, and Tasks

**Spec**: 096-token-data-index
**Date**: 2026-04-10

---

### Context for Reviewers

- Requirements (4 reqs, 14 ACs), design doc, and tasks (3 tasks, 5 subtasks) all ready for review
- Design outline had all questions resolved previously — this is formalization of settled decisions
- Straightforward spec: build-time YAML index + 4 Application MCP query tools

**Ada**: You own Tasks 1 and 2.2. Is the generation approach accurate? Do the query tool interfaces match what you'd build?

**Lina**: You own Tasks 2.1 and 2.3. Does the TokenIndexer pattern match the existing indexer architecture? Does the health/rebuild integration make sense?

**Leonardo**: Do the four query tools cover your Phase 2 token selection needs?

**Kenya / Data / Sparky**: Do the platform-specific names in the index schema match what you'd look up?

### Kenya

#### [KENYA R1]

**Scope**: Verifying platform-specific names in the index schema match what I'd look up, and confirming the query tools cover my implementation workflow.

### Platform-Specific Names — Mostly Correct, One Distinction Needed

The index schema shows iOS names like `spaceInset100` and `colorActionPrimary`. These match the generated `DesignTokens.ios.swift` property names. Good.

Ada flagged the theme-aware distinction, and I want to reinforce it from the consumer side. After the Spec 094 R8 migration, I access tokens two different ways:

- **Static tokens**: `DesignTokens.spaceInset100` — direct struct property access
- **Theme-varying tokens**: `theme.colorActionPrimary` — `@Environment` property access

When I look up a token in the index and see `ios: "colorActionPrimary"`, I need to know which access pattern to use. If the index just says `colorActionPrimary` for both static and theme-varying tokens, I have to cross-reference the `themeVarying` field to figure out the access pattern. That works, but it's an extra mental step on every lookup.

Ada's suggestion of `ios: "theme.colorActionPrimary"` for theme-varying tokens vs `ios: "DesignTokens.space100"` for static tokens is the right call. The platform name in the index should reflect the actual code I'd write, not just the property name. This is a small thing but it eliminates a class of errors — I won't accidentally write `DesignTokens.colorActionPrimary` (which no longer exists after R8) because the index told me the name without the access context.

### Query Tools — Cover My Workflow

My primary use cases during screen implementation:

1. **Verifying a token Leo referenced in a screen spec**: `get_token_details("space.inset.200")` → I see the iOS name (`DesignTokens.spaceInset200`), the value (16px), and that it's not theme-varying. I write `DesignTokens.spaceInset200` in my SwiftUI code. Fast, no ambiguity.

2. **Finding the right token when Leo's spec says "8px padding" instead of a token name**: `search_tokens({ family: "spacing", tier: "semantic" })` → I browse the results, find `space.inset.100` (8px), and use that. This is the self-service token selection Leonardo described — I don't need to ask Ada.

3. **Checking if a token is theme-varying before using it**: `get_token_details("color.action.primary")` → `themeVarying: true`, iOS name: `theme.colorActionPrimary`. I know to use `@Environment(\.dpTheme)` access, not `DesignTokens` static access.

4. **Impact analysis when a component I'm implementing uses a token I'm unfamiliar with**: `get_token_consumers("colorFeedbackSelectBackgroundRest")` → I see which other components use it, giving me context for how it's typically applied.

These four scenarios cover my day-to-day. No missing tools.

### Tasks — No iOS-Specific Concerns

Task 1 (index generation) uses the same platform naming rules as the generators. As long as Ada uses `iOSFormatGenerator`'s `getTokenName()` method (which she confirmed), the iOS names will match the generated output. No manual name construction, no drift risk.

Task 3 (documentation) updates agent prompts with token query capabilities. For my prompt, this means I'll know to use `get_token_details` and `search_tokens` during implementation. Straightforward.

### Summary

| Area | Assessment | Action |
|------|-----------|--------|
| iOS platform names | Correct property names, need access pattern context | Use `theme.` prefix for theme-varying, `DesignTokens.` for static (agree with Ada) |
| Query tools | Cover my implementation workflow | None |
| Tasks | No iOS-specific concerns | None |

No blocking concerns. Ready to implement.

[Agent feedback rounds here]

---

### Leonardo

#### [LEONARDO R1]

**Overall assessment**: This is a clean, well-scoped spec. The four query tools cover my Phase 2 token selection needs. The three-file-by-tier split is the right structure. Ada and Lina's feedback catches the important technical details (theme-aware platform names, reverse consumer index). My feedback is brief — the tools match my workflow, one observation on how I'd actually use them, and one endorsement.

### The Four Query Tools Cover My Needs

Let me map each tool to my actual workflow during screen specification:

| Tool | When I'd Use It | Example |
|---|---|---|
| `search_tokens` | Discovering which tokens exist for a use case | "What spacing tokens are available?" → `search_tokens({ family: "spacing" })` |
| `get_token_details` | Confirming a specific token is right for a screen element | "Is `color.action.primary` theme-varying?" → `get_token_details("color.action.primary")` |
| `get_token_family` | Browsing a family to pick the right size/scale | "Show me all typography tokens" → `get_token_family("typography")` |
| `get_token_consumers` | Impact analysis when considering a token change | "What components use `space.inset.200`?" → `get_token_consumers("space.inset.200")` |

`search_tokens` and `get_token_details` are my daily drivers. `get_token_family` is for browsing when I'm not sure which specific token I need. `get_token_consumers` is for impact analysis — less frequent but critical when it matters.

### How I'd Actually Use These During Screen Specification

Today, when I spec a screen, I reference tokens by name based on my knowledge of the token system and the token governance rules (semantic first, primitive with acknowledgment). I don't currently have a way to query "what tokens exist" — I rely on memory, the Docs MCP for token family reference docs, or asking Ada.

With these four tools, my workflow changes:

1. I'm speccing a screen and need spacing for card padding → `search_tokens({ family: "spacing", tier: "semantic" })` → I see `space.inset.200`, `space.inset.300`, etc. → I pick the right one.
2. I want to confirm the token is appropriate → `get_token_details("space.inset.200")` → I see it resolves to `space200` (16px), it's not theme-varying, and it's already used by `Container-Base` and `Container-Card-Base`. Good — consistent with existing usage.
3. I reference it in the screen spec → the Product MCP stores the reference by name.

This is a meaningful improvement over "ask Ada" or "read the token family docs." It's self-service token selection with the governance context (tier, theme-varying status, existing consumers) built into the response.

### Ada's Theme-Aware Platform Names — Important for My Specs

Ada's note about distinguishing `theme.colorActionPrimary` (theme protocol) from `DesignTokens.space100` (static struct) in the iOS platform names is important from my seat too. When I write platform notes in a screen spec, I sometimes reference the token access pattern:

```yaml
platform_notes:
  ios: "Use theme.colorActionPrimary for the accent — it's theme-varying"
```

If the index distinguishes these, I can verify my platform notes are accurate by querying `get_token_details` and checking the iOS platform name. Small thing, but it prevents me from writing incorrect platform guidance.

### Summary

| Area | Assessment | Action |
|------|-----------|--------|
| Query tools | Cover my Phase 2 needs | None |
| Index schema | Correct structure | None |
| Requirements | Testable, well-scoped | None |
| Design | Clean, matches existing MCP patterns | None |
| Tasks | Correctly assigned | None |

No blocking concerns. Ready to implement.

---

### Ada

#### [ADA R1]

**Overall assessment**: Clean, straightforward spec. The requirements are testable, the design matches what I proposed in the M0a feedback discussions, and the tasks are correctly scoped. I own Task 1 (index generation) and Task 2.2 (query tools). Both are well-defined. A few technical notes and one schema refinement.

### Requirements — No Issues

R1-R4 are all sound. The ACs are testable and match the design. R1 AC 6 (index reflects current state on regeneration) is important — the index is a build artifact, not a cache. Every `npx designerpunk generate` produces a fresh index.

The deferred items table is honest — "Already handled — not actually deferred" for product-created tokens is correct. The pipeline walks all token sources in the repo. No distinction needed.

### Design — Generation Approach Is Accurate, One Schema Note

The generation steps are correct. I'll be importing the same token modules the pipeline already uses (`getAllPrimitiveTokens`, `getAllSemanticTokens`, component token registry), querying the ThemeRegistry for theme-varying status, and walking component schemas for consumer relationships. This is data I already have access to in the pipeline — the index generation is essentially serializing it to YAML.

**Schema note on platform names**: The design shows iOS names like `spaceInset100` and Android names like `space_100`. These need to match exactly what the platform generators produce in the generated output files. The naming rules live in `src/naming/PlatformNamingRules.ts` and the platform-specific format generators (`iOSFormatGenerator`, `AndroidFormatGenerator`). I'll use the same `getTokenName()` methods to ensure the index names match the generated output — no manual name construction.

For theme-varying semantic tokens, the iOS platform name should reflect the Spec 094 migration: theme-varying tokens are now properties on the theme protocol (e.g., `colorActionPrimary` on `{Name}Theme`), not static `DesignTokens` properties. The index should note this distinction — `ios: "theme.colorActionPrimary"` vs `ios: "DesignTokens.space100"`. This helps platform agents know whether to access a token from the theme environment or from the static struct.

### Design — Query Tool Interfaces Match What I'd Build

The four tools (`search_tokens`, `get_token_details`, `get_token_family`, `get_token_consumers`) cover the query patterns I'd expect. `search_tokens` with combinable filters is the discovery tool. `get_token_details` is the deep dive. `get_token_family` is for browsing. `get_token_consumers` is for impact analysis.

The `get_token_consumers` tool is particularly valuable — when I modify a token, Leonardo needs to know which screens are affected. The consumer list (from component schemas) is the first link in that chain: token → components → screens (via Product MCP).

### Tasks — Correctly Scoped

Task 1 (index generation) is my primary work. The generation script walks the same sources the pipeline uses, so the data access patterns are familiar. The main implementation work is the YAML serialization and the consumer relationship cross-referencing.

Task 2.2 (query tools) is registering four new tools in the Application MCP server and implementing the search/filter/lookup logic against the indexed data. Straightforward — the TokenIndexer (Lina's Task 2.1) provides the data access layer, I build the query logic on top.

### One Concern: Index Generation Timing

The design says the index generates as part of `npx designerpunk generate`. Currently, `generate` runs `generateTokenFiles` which produces platform outputs. The index generation needs to run after the platform outputs are generated (so it can verify platform names match) but before the pipeline exits.

The cleanest integration point: add the index generation call at the end of `scripts/generate-platform-tokens.ts`, after the DTCG generation. This keeps it in the existing pipeline rather than creating a separate script. The index generation is fast (reading already-loaded token data and writing YAML) — it won't meaningfully affect pipeline time.

### Summary

| Area | Assessment | Action |
|------|-----------|--------|
| Requirements | No issues | None |
| Design schema | Platform names need theme-aware distinction | Note `theme.` prefix for theme-varying iOS/Android tokens |
| Query tools | Match expected patterns | None |
| Tasks | Correctly scoped | None |
| Integration point | End of generate-platform-tokens.ts | Cleaner than separate script |

No blocking concerns. Ready to implement.

---

### Lina

#### [LINA R1]

**Overall assessment**: Clean spec, well-scoped. The requirements are testable, the design matches the existing Application MCP indexer architecture, and my tasks (2.1 and 2.3) are straightforward. Ada's schema note about theme-aware platform names is the most important technical detail. One observation on the indexer pattern and one on consumer relationships.

### Requirements — No Issues

R1-R4 are sound. R2 AC 6 (missing index directory → empty results with warning) matches the pattern I just implemented for the Product MCP indexer — same graceful degradation approach.

### Design — TokenIndexer Matches Existing Architecture

The `TokenIndexer` class follows the same pattern as `PatternIndexer`, `LayoutTemplateIndexer`, and `FamilyGuidanceIndexer` — load YAML from a configurable directory, parse into maps, expose query methods. I've worked with all three of these during the Application MCP work. The implementation is straightforward.

One detail: the existing indexers are loaded in `ComponentIndexer.indexComponents()` as part of the startup chain. The `TokenIndexer` should follow the same pattern — loaded in the same method, using the `TOKEN_INDEX_DIR` path that's already wired through from Spec 081 WS3. The `ComponentIndexer` already accepts `tokenIndexDir` as an optional parameter (I verified this during Task 1 of this spec). The wiring is ready.

### Ada's Schema Note — Important for Consumer Relationships

Ada's point about theme-aware platform names is important from the component side. After the Spec 094 R8 migration, iOS components reference theme-varying tokens as `theme.colorActionPrimary` and static tokens as `DesignTokens.space100`. The index should reflect this distinction so that when a platform agent looks up a token, they know the correct access pattern.

The consumer relationships (R1 AC 5) derive from component `schema.yaml` `tokens:` sections. These list token names as they appear in the schema (e.g., `colorActionPrimary`, `spaceInset200`). The index maps these to platform-specific names. This is the right approach — the schema is the source of truth for which tokens a component uses, and the index provides the platform-specific resolution.

### Task 2.1 — Ready to Implement

The `TokenIndexer` is a YAML loader + search layer. Three maps (primitives, semantics, components), loaded from three files. Search by name (exact or substring), filter by family or tier. The `getConsumers` method reverses the consumer relationship — given a token name, return all components that list it.

I'll follow the same error handling pattern as the Product MCP indexer: `try/catch` around YAML parsing, skip bad files with logged warning, continue loading other tiers.

### Task 2.3 — Minimal Integration

Update `getHealth()` to include token counts and `rebuild_index` to reload the token index. Both are small additions to existing methods. The health response already has a structure that supports additional counts — I'll add `tokensIndexed: { primitives: N, semantics: N, components: N }`.

### One Observation: Consumer Relationships Are One-Directional

The design shows consumers on semantic tokens (e.g., `color.action.primary` consumed by `Button-CTA`, `Button-Icon`). This is derived from component schemas. But the reverse lookup (`get_token_consumers`) is the more common query pattern — "which components use this token?" That's what Ada needs for impact analysis and what Leonardo needs for screen specification.

The `TokenIndexer` should build a reverse index at load time: `Map<tokenName, componentName[]>`. This avoids scanning all entries on every `get_token_consumers` query. The data is already in the YAML (consumers listed per token) — the reverse index just makes the lookup O(1) instead of O(n).

### Summary

| Area | Assessment | Action |
|------|-----------|--------|
| Requirements | No issues | None |
| Design | Matches existing indexer architecture | None |
| TokenIndexer (2.1) | Straightforward YAML loader + search | Build reverse consumer index at load time |
| Health/rebuild (2.3) | Minimal additions | None |
| Theme-aware names | Important — agree with Ada | Ensure index distinguishes `theme.` vs `DesignTokens.` access |

No blocking concerns. Ready to implement.

---

### Data

#### [DATA R1]

**Scope**: Verifying Android platform-specific names in the index schema and confirming query tools cover my implementation workflow.

### Platform-Specific Names — Same Issue as Kenya, Android-Specific Detail

Kenya's feedback applies identically to Android. After Spec 094 R8, I access tokens two ways:

- **Static**: `DesignTokens.space_inset_200` — object property access
- **Theme-varying**: `theme.colorActionPrimary` — `CompositionLocal` access

The schema shows `android: "colorActionPrimary"` for theme-varying and `android: "space_inset_200"` for static. The property names are correct, but without the access prefix I'd have to cross-reference `themeVarying` on every lookup to know which pattern to use.

Agree with Ada and Kenya: the index should use `theme.colorActionPrimary` for theme-varying and `DesignTokens.space_inset_200` for static. The platform name should reflect the actual code I'd write.

One Android-specific note: the naming convention difference between static and theme-varying tokens is more pronounced on Android than iOS. Static tokens use snake_case (`space_inset_200`), theme-varying tokens use camelCase (`colorActionPrimary`) because the theme data class uses Kotlin property naming conventions. On iOS, both are camelCase. So on Android, the naming convention itself is a hint — but relying on that is fragile. The explicit `theme.` prefix is cleaner.

### Query Tools — Cover My Workflow

Same four scenarios Kenya described, translated to Android:

1. **Verify a token from Leo's spec**: `get_token_details("space.inset.200")` → Android name: `DesignTokens.space_inset_200`, value: 16, not theme-varying. I write `DesignTokens.space_inset_200` in my composable.

2. **Find the right token when spec says a pixel value**: `search_tokens({ family: "spacing", tier: "semantic" })` → browse results, pick the right one. Self-service, no need to ask Ada.

3. **Check theme-varying status**: `get_token_details("color.action.primary")` → `themeVarying: true`, Android name: `theme.colorActionPrimary`. I know to read from `CompositionLocal`, not `DesignTokens`.

4. **Consumer lookup**: `get_token_consumers("colorActionPrimary")` → see which components use it, understand typical usage context.

No missing tools.

### Tasks — No Android-Specific Concerns

Ada confirmed she'll use `AndroidFormatGenerator`'s `getTokenName()` for Android names. That's the same method that produces the generated `DesignTokens.android.kt`. No manual name construction, no drift.

### Summary

| Area | Assessment | Action |
|------|-----------|--------|
| Android platform names | Correct property names, need access pattern prefix | Use `theme.` for theme-varying, `DesignTokens.` for static (agree with Ada/Kenya) |
| Query tools | Cover my workflow | None |
| Tasks | No Android concerns | None |

No blocking concerns. Ready to implement.

---

### Sparky

#### [SPARKY R1]

**Overall assessment**: Clean, well-scoped spec. The requirements are testable, the design matches the existing MCP patterns, and the four query tools cover my implementation workflow. Kenya and Data's feedback about theme-aware platform names applies to web too, though the web case is simpler. No blocking concerns across requirements, design, or tasks.

### Platform-Specific Names — Web Is Simpler, But Same Principle

Kenya and Data flagged the theme-aware distinction for iOS (`theme.colorActionPrimary` vs `DesignTokens.space100`) and Android (same pattern with different naming conventions). On web, the distinction is less pronounced because all tokens are CSS custom properties regardless of theme-varying status:

- **Static**: `var(--space-inset-200)` — same custom property, same access
- **Theme-varying**: `var(--color-action-primary)` — same custom property, same access. The value changes via `data-theme` attribute, but the property name doesn't.

So for web, the platform name in the index (`--color-action-primary`, `--space-inset-200`) is the same regardless of theme-varying status. I don't need a `theme.` prefix — I always use `var(--token-name)`. The `themeVarying` field is still useful to me (I need to know if a token changes with theme so I test both themes), but it doesn't affect the CSS property name.

**The index schema as designed works for web.** The web platform names are just CSS custom property names. No access pattern distinction needed. Ada's `theme.` prefix suggestion is correct for iOS and Android but doesn't apply to web — and the schema already handles this correctly by having per-platform names.

### Query Tools — Cover My Workflow

My primary use cases during web screen implementation:

1. **Verify a token from Leo's spec**: `get_token_details("space.inset.200")` → web name: `--space-inset-200`, value: 16px. I write `var(--space-inset-200)` in my CSS. Done.

2. **Find the right token when the spec says a pixel value**: `search_tokens({ family: "spacing", tier: "semantic" })` → browse results, find the right semantic token. Self-service, no need to ask Ada.

3. **Check if a token is theme-varying**: `get_token_details("color.action.primary")` → `themeVarying: true`. I know to test this screen with both light and dark themes (or whatever themes are registered). The CSS property name doesn't change, but the rendered value does.

4. **Consumer lookup for consistency**: `get_token_consumers("spaceInset200")` → see which components use it. If I'm building a one-off that needs card padding, and I see `Container-Card-Base` uses `space.inset.200`, I use the same token for consistency.

No missing tools.

### Requirements — No Issues

R1-R4 are sound. R3 AC 2 (include `token-index/` in `npm pack`) is important — the index needs to ship with the package so the Application MCP can load it in a product repo. This should be added to the `files` field in `package.json` (Spec 095 territory, but the dependency is noted).

### Design — One Minor Observation

The index schema shows web platform names as `--space-100`, `--cyan-300`, etc. These match the CSS custom property names in the generated `DesignTokens.web.css`. Good — same naming source, no drift.

One thing to verify: the semantic token web names use the full semantic path (`--color-action-primary`, `--space-inset-200`), not the primitive name. The current `DesignTokens.web.css` uses these exact names. As long as Ada uses the same `WebFormatGenerator.getTokenName()` method for the index as for the CSS generation, the names will match. Same principle Kenya and Data confirmed for their platforms.

### Tasks — No Web-Specific Concerns

Task 1 (index generation) uses platform generators for naming. Task 2 (MCP integration) is Application MCP work. Task 3 (documentation) updates agent prompts. None of these have web-specific dependencies or concerns.

### Summary

| Area | Assessment | Action |
|------|-----------|--------|
| Web platform names | Correct — CSS custom properties, no theme prefix needed | None |
| Query tools | Cover my implementation workflow | None |
| Requirements | No issues | None |
| Design | Matches existing patterns, web names verified | None |
| Tasks | No web concerns | None |

No blocking concerns. Ready to implement.