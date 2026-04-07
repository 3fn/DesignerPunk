# M0a Roadmap — Scope & Sequence

**Date**: 2026-04-06
**Status**: Tentative — sequence based on dependencies, no time commitments
**Purpose**: High-level view of what gets built and in what order

---

## Phase 1: Package the Ecosystem

Goal: Publish `@designerpunk/core` to GitHub Packages — a product repo can install it, run the pipeline, create a theme, use components, and query MCP servers.

### Prereqs (before Phase 1 specs begin)
- Lina: Fix 4 missing components in ESM bundle (Nav-Header-Base, Nav-Header-App, Nav-Header-Page, Progress-Bar-Base)
- Lina: Fix Nav-Header-Base component-meta.yaml (`whenToUse` has wrong content)
- Peter: Review Stacy's process scaffolding v3

### Sequence

**Block A — Theme Foundation** (Ada, sequential)
1. **WS4: Theme registry pattern** — Replace hardcoded ThemeContext with registry. Must support themes defined outside the core repo. This changes the resolver and type system.
2. **WS1: Portable token pipeline** — Abstract hardcoded paths in generators. Configurable root directories. Product repos can create SemanticOverrides and run the pipeline. Builds on the registry pattern from WS4.

**Block B — Package Assembly** (Lina + Thurgood, can start in parallel with Block A)
3. **WS2: Component library package** — Clean up package.json `files`/`exports`. ESM bundle with all 34 components. CSS tokens, blend utilities, responsive grid, fonts.
4. **WS6: Agent configurations for product context** — Agent configs that work when DesignerPunk is a dependency. Product agents know where to find things.

**Block C — MCP Infrastructure** (can start after Block A stabilizes)
5. **WS3: Configurable MCP servers** — Application MCP and Docs MCP accept configurable data directories. Runnable from a product repo.
6. **WS5: Product MCP foundation** — Minimal scaffold. Connects to Application MCP, proxies queries, accepts product config file. Extension points only.
7. **WS7: Token data in Application MCP** — Build-time YAML index of all tokens (three files by tier: primitives, semantics, components). Names, values, families, platforms, consumer relationships. Application MCP loads and serves it. Can overlap with WS1's tail.

**Block D — Publish & Agent Updates**
8. **WS8: Agent resource and /knowledge updates** — Update agent prompts, resources, and knowledge bases to reflect new capabilities from WS1-7. Leo updated for token data queries, Ada for theme registry, product agents for Product MCP foundation and package consumption patterns.
9. **Publish `@designerpunk/core`** to GitHub Packages. Validate install in a fresh repo.

### Dependencies
```
WS4 → WS1 (hard: registry changes resolver, pipeline builds on it)
WS1 → WS7 (soft: token index needs stable pipeline, can overlap)
WS2, WS6 can run in parallel with Block A
WS3, WS5 need Block A stable (MCP servers need to know where pipeline outputs land)
WS1-WS7 → WS8 (agent updates reflect what was built)
All → Publish
```

---

## Phase 1 → Phase 2 Transition

Before Phase 2 starts:
- Leo + Ada: Theme registry API session — "create a marketing theme in the product repo" workflow
- Leo + Ada: Token index walkthrough — what token queries are available
- Lina: Shadow DOM + CSS custom property smoke test with Nav-Header-App under themed context
- Sparky: Build tooling input — project scaffolding for the marketing site repo
- Stacy: Confirm process scaffolding covers Phase 2 product work
- Peter: Finalize design direction and content priorities

---

## Phase 2: Marketing Site

Goal: Build the DesignerPunk marketing site in a separate repo, consuming `@designerpunk/core`. Dark-only marketing theme. Public-facing artifact.

### Sequence

**Block E — Foundation**
1. **Create marketing site repo** — Install `@designerpunk/core`. Sparky sets up project scaffolding.
2. **Create marketing theme** — SemanticOverrides in the product repo. Dark, cyan/teal electric accent. Run pipeline to generate themed outputs. Verify components render correctly.

**Block F — Content Pages** (can proceed once theme is working)
3. **Site header** — Nav-Header-App with product-defined content (logo, nav links, version badge)
4. **Home/Landing** — Hero zone, systems zone, feature cards. Product-level compositions from Container-Base, Container-Card-Base, Button-CTA, Icon-Base.
5. **About/Philosophy** — Ecosystem story, two entry points, mathematical foundation. Typography + containers.
6. **Getting Started** — Installation, configuration, first steps.
7. **Contact/Community** — Newsletter signup, feedback form. Simple-form experience pattern.

**Block G — Showcase** (after content pages validate the theme)
8. **Component Showcase** — Live DesignerPunk components as both UI and demonstrated content. Theme toggle (marketing ↔ default) if the framing works.

**Block H — Ship**
9. **Footer, polish, accessibility review**
10. **Deploy**

### Dependencies
```
Theme → all content pages
Content pages → Showcase (theme validated on real content first)
Showcase → Ship
Design direction (Peter) → Home/Landing, Showcase
```

---

## What's NOT on this roadmap

- M0b (WrKing Class) — separate roadmap after M0a lessons synthesis
- Product MCP features beyond the foundation — driven by Phase 2 and M0b usage
- Tree-shaking / individual component exports — M0b concern
- Full "configure your brand" onboarding workflow — M1
- Cross-platform packaging (`@designerpunk/ios`, `@designerpunk/android`) — M0b
