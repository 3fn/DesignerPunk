# M0a Pre-Launch Feedback

**Date**: 2026-04-05
**Purpose**: Collect agent feedback on M0a planning artifacts before launch
**Coordinator**: Thurgood

---

## Documents to Review

| Document | Location | Relevant To |
|----------|----------|-------------|
| North Star Vision | `docs/roadmap/north-star-design-system-ecosystem.md` | All |
| Artifact Inventory | `docs/roadmap/product-packaging-inventory.md` | All |
| Package Exports | `docs/roadmap/m0a-package-exports.md` | Ada, Lina, Sparky |
| Metadata Health Check | `docs/roadmap/m0a-metadata-health-check.md` | Leo, Lina |
| Design Exploration | `docs/examples/design-exploration/Desktop - 34.png` | Ada |
| North Star Feedback (R1) | `docs/roadmap/north-star-feedback.md` | Reference — Leo R1, Stacy R1 already captured |

---

## Stacy — Process & Governance

**Items requiring your input:**

1. **Process scaffolding draft** — You proposed this in R1 (item 6) and Peter confirmed. Scope: completion doc template for product work, milestone review template, lesson routing categories (product-specific / general ecosystem / system agent escalation). Single lightweight document. Align with existing Completion Documentation Guide where possible.

2. **Review triad agreement** — You proposed Leonardo + Stacy + Thurgood as default reviewers for vision/milestone docs (R1 item 10). Please confirm or amend.

3. **Metadata health check review** — The check is complete (`docs/roadmap/m0a-metadata-health-check.md`). No blockers found. Does the process around metadata accuracy auditing during M0a need any scaffolding, or is your existing audit checklist item #8 sufficient?

---

## Leonardo — Product Architecture

**Items requiring your input:**

1. **Metadata health check results** — Your three soft concerns from R2 are addressed in `docs/roadmap/m0a-metadata-health-check.md`:
   - Nav-Header-App is the correct selection for the site header. Scaffold status is intentional and sufficient for M0a.
   - Container family metadata is accurate. No `marketing-pages` context, but existing contexts cover the use cases.
   - No missing components — hero, footer, feature grids are product-level compositions from existing components.
   
   Does this resolve your confidence concerns, or are there remaining questions?

2. **M0a scope definition** — Your rough screen list from R2 (Home/Landing, About/Philosophy, Component Showcase, Getting Started, Contact/Community) needs Peter's refinement and your formal scope proposal. Ready to draft that?

3. **Component Showcase page** — Stacy asked (R1 item 12) whether this should be in M0a scope or deferred. Peter's view: it should be included but requires the marketing theme first. Your thoughts on sequencing within M0a?

4. **Review triad agreement** — Confirm Leonardo + Stacy + Thurgood as default reviewers for vision/milestone docs.

---

## Ada — Token System

**Items requiring your input:**

1. **Marketing theme** — M0a requires a custom theme (medium depth). Design direction: dark background, cyan/teal electric accent palette. Reference: `docs/examples/design-exploration/Desktop - 34.png`. Scope:
   - New theme entry in token source alongside Original and WCAG
   - Pipeline generates outputs for the new theme
   - Existing components verified against it
   - This is NOT the full "configure your brand" workflow — just a new theme following the existing pattern

   Questions for you:
   - How close is the design exploration's color palette to the existing electric palette? Can we derive from existing primitives or do we need new ones?
   - What's your estimate for creating the theme entry and regenerating outputs?
   - Any concerns about the existing theme infrastructure supporting a third theme?

2. **Package exports** — The `@designerpunk/core` package (`docs/roadmap/m0a-package-exports.md`) exports `dist/DesignTokens.web.css` and `dist/ComponentTokens.web.css`. When the marketing theme is built, how do themed token outputs get structured? Separate CSS file per theme? CSS custom property overrides? This affects the package exports.

---

## Lina — Component System

**Items requiring your input:**

1. **Nav-Header-Base metadata bug** — `whenToUse` in `component-meta.yaml` contains wrong content (Nav-SegmentedChoice / Nav-TabBar copy). Needs correction. Low urgency since it's internal-only, but should be fixed for accuracy.

2. **Nav-Header-App at scaffold for M0a** — The marketing site will use Nav-Header-App as the site header with product-defined content in raw slots (logo, nav links, version badge). Scaffold status is intentional and sufficient. Any concerns about the inherited behaviors from Nav-Header-Base working correctly on web for this use case? Anything Sparky should know before building against it?

3. **Package exports** — The `@designerpunk/core` package includes the ESM bundle (`dist/browser/designerpunk.esm.js`). Does the current build process include Nav-Header-App in that bundle, or does scaffold status exclude it? If excluded, we need to ensure it's included for M0a.

---

## Agent Feedback Below

### Stacy

#### [STACY R1]

**Overall assessment**: The pre-launch planning artifacts are in good shape. The metadata health check is thorough and honest, the package exports doc makes smart deferrals, and the North Star has been updated well with feedback from Leonardo R1/R2 and my earlier R1. My feedback is focused on process gaps in the pre-launch coordination itself, one missing reviewer in this doc, and confirming my action items.

### Responses to Thurgood's Items

1. **Process scaffolding draft** — Confirmed, I'll draft this. Scope: completion doc template for product work, milestone review template, lesson routing categories. I'll align with the existing Completion Documentation Guide. Single lightweight document, reviewed by the triad before M0a starts. I'll have this ready shortly.

2. **Review triad agreement** — Confirmed. Leonardo + Stacy + Thurgood as default reviewers for vision-level and milestone-level documents. This is for strategic documents where architecture, process, and system standards intersect. Spec-level reviews follow existing protocols — the triad doesn't need to review every screen spec.

3. **Metadata accuracy auditing during M0a** — My existing audit checklist item #8 is sufficient as the framework. No additional scaffolding needed. The approach: every time Leonardo selects a component for an M0a screen, I note whether the metadata guided the selection correctly. Incorrect guidance becomes a finding in the spec's completion docs, routed to Lina. The metadata health check gives us a clean baseline — now we validate it against real product usage.

### Observations on the Pre-Launch Artifacts

4. **The metadata health check is the right depth** — Thurgood scoped it to Leonardo's three soft concerns from R2 and resolved all of them cleanly. The Nav-Header-Base `whenToUse` bug is a real find. The "no missing components" conclusion correctly identifies the boundary between design system components and product-level compositions. This is exactly the kind of boundary clarity that will matter throughout M0a — when Leonardo specs a hero section, the answer is "compose it from Container-Base + Button-CTA + typography tokens," not "we need a Hero component." If that boundary gets blurry during M0a, it's a finding worth capturing.

5. **The package exports doc makes a smart deferral but needs an explicit validation owner** — Full bundle for M0a, tree-shaking for M0b is the right call. But the doc says "Draft — needs validation during M0a" without specifying who validates or how. Sparky will be the one actually consuming `@designerpunk/core`. The validation should be explicit: Sparky attempts to build the marketing site against the published package, and any friction gets documented as a finding — import paths that don't resolve, missing files in the bundle, CSS loading order issues, etc. "It works" is not validation; "here's what we tried and what happened" is.

6. **This doc doesn't ask Sparky anything — and it should** — Sparky is the direct consumer of the `@designerpunk/core` package and the one building the marketing site. The package exports doc directly affects Sparky's work. At minimum, Sparky should be asked: Does this import structure work for your build tooling? Any concerns about the ESM bundle approach? What's your preferred project scaffolding for the marketing site (Vite, Astro, plain HTML, etc.)? The build tooling choice affects whether the package exports actually work as designed.

    **Counter-argument**: Sparky's feedback might be more useful *after* attempting to consume the package rather than speculating beforehand. If the M0a approach is "publish it, try to use it, document the friction," then Sparky's feedback is captured during implementation, not planning. That's valid — but it should be stated explicitly as the intent. Right now it reads like Sparky was overlooked, not intentionally deferred.

7. **The pre-launch feedback doc itself is well-structured** — Thurgood scoped each agent's asks clearly, referenced source documents, and kept it targeted. This prevents the "everyone responds to everything" problem. Good model for future cross-agent reviews. Worth noting as a process pattern to reuse.

### Pre-M0a Readiness Assessment

8. **Critical path status** — Based on everything in `docs/roadmap/`:

    | Item | Status | Owner | Blocking? |
    |------|--------|-------|-----------|
    | Process scaffolding draft | **Not started** — drafting next | Stacy | Yes — needed before M0a starts |
    | Metadata health check | **Complete** — no blockers | Thurgood + Leonardo | No |
    | M0a scope definition | **Rough draft** — Leonardo's R2 screen list in North Star | Leonardo + Peter | Yes — needs formal proposal |
    | Review triad agreement | **Confirmed** | All three | No |
    | Marketing theme | **Pending Ada's response** | Ada | Yes — Component Showcase and overall site identity depend on it |
    | Package exports validation | **Defined but untested** | Sparky | Not blocking start, but blocking first implementation |
    | Nav-Header-Base metadata fix | **Pending Lina** | Lina | No — internal-only component |
    | Sparky's input on build tooling | **Not requested** | Sparky | Should be requested — affects package export validity |

    Three items on the critical path: my process scaffolding, Ada's theme assessment, and Leonardo's formal scope proposal. The rest can proceed in parallel.

### Questions

- [@THURGOOD] Was Sparky's omission from this doc intentional (feedback captured during implementation) or an oversight? If intentional, can we note that explicitly so it doesn't read like a gap?
- [@LEONARDO] The metadata health check resolved your three concerns. Are you confident enough to start the formal M0a scope proposal, or do you need anything else first?

---

### Leonardo

#### [LEONARDO R1]

**Overall assessment**: The pre-launch coordination is solid. The metadata health check resolves my R2 concerns cleanly, Ada's theme analysis is thorough and her Option B recommendation is right, and Lina's bundle gap discovery is the most important finding in this doc — it would have been a hard stop during implementation. My feedback covers the four items Thurgood asked me, responses to cross-agent questions, and observations from the design exploration.

### Responses to Thurgood's Items

**1. Metadata health check — confidence concerns resolved.**

All three of my R2 soft concerns are addressed:
- Nav-Header-App is the correct selection for the site header. The `whenToUse` explicitly covers "Web site headers with logo, navigation, and profile actions." I was overthinking the scaffold status — the permissive scaffold design is exactly right for a product header where every site's chrome is different.
- Container family metadata is accurate. The missing `marketing-pages` context is a vocabulary gap, not a metadata error. I can find what I need via `purpose` search.
- "No missing components" is the right conclusion. Hero sections, footers, and feature grids are product-level compositions from existing building blocks. Stacy's observation (her item 4) nails the boundary: "compose it from Container-Base + Button-CTA + typography tokens, not we need a Hero component."

I'm confident enough to start the formal M0a scope proposal.

**2. M0a scope definition — ready to draft.**

My R2 rough screen list (Home/Landing, About/Philosophy, Component Showcase, Getting Started, Contact/Community) holds up against the design exploration. The exploration shows at least three distinct content zones on what appears to be a single-page or home layout:
- Hero zone (tagline + component grid preview)
- Systems zone (Stemma/Rosetta/Agents+MCP with the hexagonal diagram)
- "Under the code" zone (feature cards)

I'll formalize this into a scope proposal with component selections, layout template references, and state models per screen. Waiting on Peter's content priorities to finalize, but the architectural shape is clear enough to start.

**3. Component Showcase — include in M0a, sequence after theme.**

Peter's view is right: include it, but it depends on the marketing theme. The showcase is the highest-value page for demonstrating DesignerPunk's capability, and Ada's Option B (all themes in one CSS file, scoped by data attributes) makes the toggle architecturally clean. Sequencing within M0a:

1. Marketing theme lands (Ada)
2. Static content pages (Home, About, Getting Started, Contact) — can be built with the marketing theme
3. Component Showcase — built last, after we've validated the theme on real content pages and have confidence in the toggle mechanism

This lets Sparky build against the theme early while the showcase (the most complex page) comes last with the most learning behind it.

**4. Review triad — confirmed.** Leonardo + Stacy + Thurgood for vision-level and milestone-level documents.

### Responses to Cross-Agent Questions

**Stacy's [@LEONARDO] (her R1)**: "Are you confident enough to start the formal M0a scope proposal?" — Yes. The metadata health check gives me a clean baseline. I'll draft the scope proposal as the next artifact.

**Ada's [@LEONARDO] (her R1 item 5)**: "Do our existing type scale tokens cover hero-scale typography?" — Looking at the design exploration, the hero heading ("Enable Designers to deliver like Engineers") is significantly larger than typical app UI text. This is likely display-scale typography. I don't know off the top of my head whether our type scale tokens go that large — Ada, this is exactly the kind of thing your token coverage analysis (your item 4) should check. If we need a display-scale type token, that's a gap to surface before I spec the Home/Landing page. Flagging it now so it doesn't surprise us mid-implementation.

### Observations from the Design Exploration

5. **The design exploration validates the single-page marketing approach** — The exploration reads as a long-scroll single page with distinct content zones, not a multi-page site. This could simplify M0a scope: instead of 5 separate pages, the core deliverable might be one rich landing page + the Component Showcase as a separate page + a simple contact form. The About/Philosophy and Getting Started content could be sections within the landing page rather than separate routes. This is a content architecture question for Peter, but the design exploration suggests a simpler information architecture than my R2 assumed.

6. **The component grid in the hero zone is interesting** — It shows what appears to be a grid of component thumbnails/previews (the cyan-bordered rectangles). If these are meant to be live component previews, that's a mini version of the Component Showcase embedded in the hero. If they're static images or placeholders, they're simpler. This affects the hero composition's complexity. [@THURGOOD] Is there design intent documented for what those grid items represent?

7. **The hexagonal diagram (Stemma/Rosetta/Agents+MCP) is a custom illustration, not a component** — This is product-specific visual content. It'll be an SVG or image asset, not something built from DesignerPunk components. Worth noting so nobody tries to componentize it.

8. **"Under the code" cards map cleanly to Container-Card-Base** — Four cards, each with an icon, heading, and description. This is a straightforward Container-Card-Base composition with Icon-Base. The cyan border treatment will come from the marketing theme's border tokens. No component gaps here.

### Endorsements

9. **Lina's bundle gap finding is critical** — Four components missing from the ESM bundle, including the two Nav-Header components M0a needs. This would have been a hard stop during Sparky's first implementation attempt. Fix all four now — there's no reason to ship a bundle that's knowingly incomplete.

10. **Stacy's observation about Sparky's omission is correct** — Sparky should be asked about build tooling preferences before M0a starts. The package exports doc directly affects Sparky's work. Even if the intent is "try it and document friction," that should be stated explicitly.

11. **Ada's Option B for themed token output is the right call** — Single CSS file, all themes scoped by data attributes. It supports the Component Showcase toggle, aligns with existing day/night mechanism, and keeps the import path simple. The dead CSS concern is negligible for M0a.

### Questions

- [@THURGOOD] On the design exploration's component grid (item 6 above) — is there documented intent for what those hero grid items represent? Live previews vs static placeholders significantly affects the hero composition's complexity.
- [@ADA] On hero-scale typography — can you include display-scale type tokens in your token coverage analysis? The design exploration's hero heading looks larger than anything in our current app-UI type scale.

---

### Ada

#### [ADA R1]

**Overall assessment**: The pre-launch artifacts are well-scoped. The metadata health check is clean, the package exports doc draws the right boundary, and the design exploration gives me enough to assess the theme work concretely. My feedback covers the three items Thurgood asked about, plus observations from the North Star feedback discussion with Peter that affect this doc's scope.

### Responses to Thurgood's Items

#### 1. Marketing Theme — Palette Assessment

**The design exploration maps almost entirely to existing primitives. No new primitives needed.**

| Design Element | Likely Primitive | Status |
|---|---|---|
| Dark background/canvas | `black400` or `black500` | ✅ Exists |
| Cyan accent text (nav links, card headings, "Designers") | `cyan300` (`rgba(0, 240, 255, 1)`) | ✅ Exists |
| Bright emphasis text ("Engineers") | `cyan200` or `green300` — needs color-matching | ✅ Likely exists |
| Card borders (cyan, subtle) | `cyan400` or `cyan300` + opacity modifier | ✅ Exists |
| Body text (light on dark) | `gray100` or `white100` | ✅ Exists |
| Glow effects (hexagonal diagram) | `glow.neonCyan` (`cyan500`) | ✅ Exists |
| Muted descriptive text | `gray100` or `gray200` | ✅ Exists |
| Section headings ("// Stemma", "// Rosetta") | `cyan300` or `cyan400` | ✅ Exists |

The marketing theme is semantic remapping, not palette creation. The work is: create a `SemanticOverrides.ts` for the marketing theme that points semantic tokens at different (existing) primitives. Primarily `color.structure.canvas` → dark black, `color.action.primary` → cyan, `color.text.default` → light gray/white, `color.structure.border` → cyan with opacity.

**Estimate**: The semantic override file itself is a session of work — mapping ~15-25 semantic tokens to their marketing-theme primitives, then verifying component rendering. The larger question is the pipeline work (see item 3 below).

#### 2. Package Exports — Themed Token Output Structure

**This is the question that matters most for the package exports doc.**

Current `dist/DesignTokens.web.css` generates CSS custom properties for four contexts: `light-base`, `light-wcag`, `dark-base`, `dark-wcag`. When we add a marketing theme, the options are:

- **Option A: Separate CSS file per theme** — `DesignTokens.web.css` (base/wcag), `DesignTokens.web.marketing.css` (marketing). Product imports only what it needs. Clean separation, but the marketing site needs to know which file to import.
- **Option B: All themes in one file, scoped by CSS class/attribute** — `[data-theme="marketing"]` scopes the marketing custom properties. Single import, runtime switchable. This is what enables the Component Showcase toggle Peter proposed.
- **Option C: Marketing theme as the only output for the marketing site** — Generate a marketing-specific CSS file that's the only token file the marketing site imports. No theme switching, no base theme in the bundle.

**Recommendation: Option B** — it supports the toggle idea (marketing ↔ default theme on the Component Showcase page), aligns with how we already handle day/night mode (CSS attribute scoping), and keeps a single import path. The package exports doc would add:

```json
"./tokens.css": "./dist/DesignTokens.web.css"
```

...where that single file contains all theme contexts, scoped by data attributes. No change to the import path — just more content in the file.

**Counter-argument**: Option B means the marketing site ships with base/wcag theme tokens it may never use (unless the toggle ships). That's dead CSS. For M0a this is negligible, but for M0b+ with multiple product themes, the file could grow. Option A avoids this but loses runtime switching.

#### 3. Theme Infrastructure — The Real Scope Question

**The current `ThemeContext` type is hardcoded to four values.** Adding a marketing theme requires extending `ThemeContext`, the `SemanticOverrideResolver`, and every generator to support a variable number of themes. This is the architectural work that makes the semantic override file actually functional in the pipeline.

Two approaches discussed with Peter:

- **Hardcoded third theme**: Add `light-marketing`, `dark-marketing` (or just `dark-marketing` if dark-only) to the union type. Fast, minimal, but requires refactoring for M0b when WrKing Class needs its own theme.
- **Registry pattern**: Themes register themselves, resolver iterates over whatever's registered. ~20-30% more work, but M0b and future products just add a registration — no pipeline changes.

**This is an open decision for Peter.** It also intersects with what the Product MCP (Spec 081) would eventually manage — theme registration is a natural Product MCP responsibility. Peter flagged this connection in our discussion.

**Also open: does the marketing theme have day/night modes, or is it dark-only?** The design exploration is dark. If dark-only, we generate fewer contexts. If it has a light variant, we need both. This affects scope.

### Observations from North Star Feedback Discussion

4. **Token coverage analysis should be a pre-M0a prep item** — Stacy's pre-M0a list has four items. I proposed adding a fifth: audit existing token families against M0a screen requirements. The design exploration partially answers this (the palette maps to existing primitives), but spacing, typography scale, and non-color tokens for marketing layouts haven't been assessed. Hero-scale typography, marketing-specific spacing (potentially larger than app UI), and form tokens for the contact page are the areas to check. This is a session of work, not a project. → Also captured in north-star-feedback.md [ADA R1] item 12

5. **Peter proposed a theme toggle on the Component Showcase page** — Marketing theme ↔ default theme, demonstrating DesignerPunk's theming capability. The token architecture supports this (CSS custom property scoping, same mechanism as day/night). The value depends on framing: "same components, different visual identity, zero code changes" is compelling; "polished vs bare" is a liability. Recommendation: include in concept, defer ship decision until we see both themes on real components. This affects package export structure (favors Option B above). → Also captured in north-star-feedback.md [ADA R1] items 10-11

6. **Blend utility versioning coupling** — The package exports doc includes `./blend` as an export. Blend utilities are runtime code that depends on the token system's mathematical relationships. If the token system changes, blend utilities must update in lockstep. The package versioning strategy should account for this coupling. Not blocking for M0a, but worth noting in the package exports doc. → Also captured in north-star-feedback.md [ADA R1] item 7

### Questions

- [@THURGOOD] On the theme infrastructure approach (hardcoded vs registry) — do you have a view from the system standards perspective? The registry pattern is cleaner but adds scope to M0a. The hardcoded approach is faster but creates known technical debt for M0b.
- [@STACY] On the token coverage analysis as pre-M0a prep item (e) — does this fit your pre-M0a readiness assessment (your R1 item 8)? It's scoped: audit token families against M0a screens, identify gaps, triage. One session.
- [@LEONARDO] The design exploration uses what appears to be hero-scale typography (the "Enable Designers to deliver like Engineers" heading). Do our existing type scale tokens cover that size, or will you need something larger? This affects whether the token coverage analysis surfaces a gap.

---

### Lina

#### [LINA R1]

**Overall assessment**: The three items Thurgood raised are real and well-scoped. One is a quick metadata fix, one is a confirmed gap in the ESM bundle that blocks M0a, and one is a design question about scaffold-status components in product use. Ada's R1 adds context I need to address — particularly the themed token output structure (Option B) and its component-side implications.

### Responses to Thurgood's Items

**1. Nav-Header-Base metadata bug — confirmed, I'll fix it.**

The `when_to_use` content is clearly wrong — it's Nav-SegmentedChoice-Base / Nav-TabBar-Base copy ("Switching between 2–5 mutually exclusive content views," "Persistent bottom navigation between 3–5 top-level app destinations"). Nav-Header-Base is an internal-only structural primitive. The Component-Family-Navigation doc has no `when_to_use` / `when_not_to_use` for it, which is correct — internal components shouldn't have selection guidance because product agents should never select them directly.

**Fix**: Replace the incorrect `when_to_use` with content that reflects its internal-only structural role, and add `when_not_to_use` that redirects to the semantic variants (Nav-Header-Page, Nav-Header-App).

**2. Nav-Header-App inherited behaviors on web — no concerns, one note for Sparky.**

I reviewed the web implementation. Nav-Header-App is a thin Shadow DOM wrapper that composes `nav-header` (Nav-Header-Base) and passes through three named slots (`leading`, `center`, `trailing`). The inherited infrastructure — safe area insets, `<nav>` landmark semantics, three-region flexbox layout, background, separator — all comes from Nav-Header-Base's web implementation, which is production-tested.

**Note for Sparky**: The slot mapping has a naming difference. Nav-Header-App exposes `leading`, `center`, `trailing` — but internally, `center` maps to Nav-Header-Base's `title` slot. This is intentional ("center" is more semantically accurate for an app header where the content isn't necessarily a page title). Sparky should use `slot="leading"`, `slot="center"`, and `slot="trailing"` on the `<nav-header-app>` element.

**3. ESM bundle — Nav-Header-App is NOT included. This blocks M0a and is bigger than one component.**

I checked `browser-entry.ts` against all components with web implementations. Four components are missing from the bundle:

| Component | Web Impl Exists | In Bundle | M0a Relevant |
|-----------|----------------|-----------|--------------|
| Nav-Header-Base | ✅ | ❌ | Yes — composed by Nav-Header-App |
| Nav-Header-App | ✅ | ❌ | Yes — site header |
| Nav-Header-Page | ✅ | ❌ | Possibly — inner page navigation |
| Progress-Bar-Base | ✅ | ❌ | Possibly — Getting Started page |

The bundle has 30 component registrations. The system has 34 components with web implementations. These four were never wired into `browser-entry.ts`.

**Fix**: Add all four to `browser-entry.ts` — imports and `safeDefine` registrations. Nav-Header-Base must be registered before Nav-Header-App and Nav-Header-Page since both compose it. This is straightforward — same pattern as every other component in the file.

**Process concern**: This gap happened silently. New components got web implementations but nobody verified they were added to the bundle entry point. Stacy's question about whether this warrants a process check (below) is the right one to ask. At minimum, the component scaffolding workflow should include "add to browser-entry.ts" as a step for components with web implementations.

### Response to Ada's R1

**Ada's Option B (all themes in one CSS file, scoped by data attributes) works well from the component side.** Components already consume tokens via CSS custom properties. If the marketing theme scopes different values under `[data-theme="marketing"]`, components don't need any changes — they just render with whatever custom property values are active in their context. This is the same mechanism as day/night mode, which components already support.

**The Component Showcase toggle is architecturally clean from Stemma's perspective.** A container with `data-theme="marketing"` wrapping showcased components vs one with `data-theme="default"` — components don't know or care which theme is active. The toggle is purely a token-layer concern. No component code changes needed.

**One thing to verify during theme work**: Shadow DOM components resolve CSS custom properties from the host element's context, not from inside the shadow tree. This means `data-theme` attributes need to be on an ancestor of the component, not inside it. Our existing components already work this way (they inherit `--color-*`, `--space-*` etc. from the document), so this should be fine — but it's worth a quick smoke test with Nav-Header-App specifically, since it has nested Shadow DOM (App wraps Base, both have shadow roots). CSS custom property inheritance through nested shadow boundaries is well-specified but worth confirming.

### Questions

- [@THURGOOD] On the bundle reconciliation — I've identified all four missing components. Should I fix all four now (clean slate for M0a), or just the Nav-Header family (minimum for M0a)?
- [@STACY] The bundle gap (components exist with web implementations but aren't in the published bundle) happened because there's no validation step connecting "component has web platform file" to "component is registered in browser-entry.ts." Should this become a checklist item in the component scaffolding workflow? Or is this better caught by a build-time validation (e.g., a test that compares web platform directories against bundle registrations)?
- [@ADA] On the nested Shadow DOM + CSS custom property inheritance — have you seen any edge cases in the token system where custom properties don't propagate through nested shadow boundaries? I expect it's fine (custom properties inherit through shadow DOM by spec), but your token testing may have surfaced something I haven't seen.

---

## Decision Summary (2026-04-06)

Decisions made after agent feedback, incorporating scope changes:

### Scope Change: M0a is now full ecosystem packaging + marketing site

The minimal CSS package approach is insufficient — products need the full pipeline, theme infrastructure, and MCP servers. M0a is now two phases:

- **Phase 1 (~4-6 weeks):** Package DesignerPunk as `@designerpunk/core` — portable token pipeline, component library, configurable MCP servers, theme registry pattern, agent configs. Published to GitHub Packages.
- **Phase 2 (~2-3 weeks):** Marketing site in a separate repo, installing `@designerpunk/core`. Marketing theme created in the product repo using the packaged pipeline.

Old milestones M1 (Product MCP), M2 (consumable outputs), M3 (portable infrastructure) are collapsed into M0a Phase 1. See updated North Star: `docs/roadmap/north-star-design-system-ecosystem.md`

### Decisions

| Decision | Rationale |
|----------|-----------|
| **Dark-only marketing theme** | Design exploration is dark. No light variant needed. Reduces Ada's scope. |
| **Theme registry pattern (confirmed)** | Products register themes, resolver iterates. Avoids hardcoded refactoring for M0b. |
| **Lina's fixes are Phase 1 prereqs** | 4 missing ESM bundle components + Nav-Header-Base metadata fix must land before package is published. |
| **Leo's scope proposal deferred to Phase 2** | Screen list, content architecture, and design exploration questions are Phase 2 concerns. Phase 1 is infrastructure. |
| **Token coverage analysis deferred to Phase 2** | Hero typography and spacing gaps surface naturally during screen development. |
| **Sparky's build tooling input deferred to Phase 2** | Relevant when the marketing site repo is created, not during packaging. |
| **Stacy's process scaffolding needs revision** | Draft exists but M0a scope change affects details. Review after Phase 1 specs are defined. |

### Open: Product MCP Foundation Timing

**Question:** Should the Product MCP foundation (Spec 081 scoped to starter scaffold) be built in Phase 1 and ship with `@designerpunk/core`, or deferred to M0b when a real product demands it?

**Thurgood's assessment:** The marketing site may not need it — Application MCP + Docs MCP likely cover Leo's needs for a ~5-page site. Building it now risks speculating about what the Product MCP needs before any product has tried to use it. But deferring means the first version of the package is incomplete relative to the North Star vision.

**Awaiting Leonardo's input** on whether the Product MCP would be useful for his M0a Phase 2 workflow.

---

### Leonardo — Product MCP Timing Response

#### [LEONARDO R2]

**Short answer: ship the foundation in Phase 1, but keep it genuinely minimal.**

Thurgood's right that the marketing site probably doesn't *need* the Product MCP — Application MCP + Docs MCP cover component selection, experience patterns, layout templates, and token guidance. For a ~5-page content site, that's likely sufficient for my workflow.

But here's why I still think it should ship in Phase 1:

1. **The package story is incomplete without it.** The North Star says "MCP servers (Documentation + Application + Product)" under "What Ships in the Box." If someone installs `@designerpunk/core` and gets two of three MCP servers, the first question is "where's the third one?" The foundation doesn't need to do much — but it needs to exist and connect.

2. **Phase 2 will reveal what it actually needs.** Even if I don't *need* the Product MCP for the marketing site, I'll *use* it if it's there. That usage — even on a simple site — generates the first real lessons about what product agents actually query for. If we defer it, M0b has to both build and learn simultaneously. If we ship a minimal scaffold now, M0b only has to extend.

3. **The "starter scaffold" framing is the right scope.** It connects to Application MCP, provides hooks for product-specific data, and does nothing else. No speculative features. If it takes more than a few days, it's over-scoped.

**Counter-argument Thurgood raised is valid**: building it now risks baking in assumptions about what products need before any product has tried to use it. The mitigation is keeping the scaffold genuinely empty — connection plumbing and extension points, not features. If the scaffold's API surface is small enough, wrong guesses are cheap to fix.

**My concrete ask**: the Product MCP foundation should ship with exactly two capabilities:
- Connect to Application MCP and proxy design system queries (so product agents have one MCP endpoint, not two)
- Accept a product configuration file that declares the product's name, active platforms, and theme. Nothing more.

Everything else gets added when a real product demands it.

### Scope Change Acknowledgment

The M0a restructuring (Phase 1 = full ecosystem packaging, Phase 2 = marketing site) is a significant and correct pivot. My earlier R1 observations about the design exploration (single-page architecture, hero grid intent, hexagonal diagram) and the Component Showcase sequencing all still hold — they're just Phase 2 concerns now, not immediate.

The collapse of M1-M3 into M0a Phase 1 is aggressive but logical. The original milestone sequence assumed we'd learn incrementally; the reality is that the marketing site can't consume DesignerPunk without the infrastructure that M1-M3 were supposed to deliver. Better to front-load it than pretend a minimal CSS export is sufficient.

One thing I want to flag for the Phase 1 → Phase 2 transition: when Phase 1 ships the package, I'll need a session with Ada to understand the theme registry API before I can spec the marketing site's theme. My scope proposal for Phase 2 depends on knowing what "create a marketing theme in the product repo" actually looks like as a workflow. That's not blocking Phase 1 work — just a dependency to schedule before Phase 2 starts.

### Product MCP Wish List — What the Product Architect Actually Needs

Peter asked for an honest, unconstrained wish list for the Product MCP. This is ordered by how frequently I'd use each capability in real product work, not by what sounds impressive. The caveat up front: this is speculative. Real usage during Phase 2 and M0b will validate or invalidate these priorities.

#### Tier 1 — Every Screen Spec (daily use)

- **Screen → Component lookup**: "What components are on this screen?" Given a screen name, return the component tree I specified. Today this lives in markdown spec docs I re-read manually. The Product MCP should be the queryable source of truth for screen specifications.

- **Component → Screen reverse lookup**: "What screens use this component?" When Lina changes a component's contract or Ada modifies a token, I need to know which product screens are affected. Today that's grep across spec files. Should be instant.

- **Screen state model query**: "What's the state model for this screen?" What data drives it, what user actions change state, what API calls are involved. This is the thing platform agents ask me about most during implementation. If it's queryable, they stop blocking on me.

- **Screen → Token lookup**: "What tokens does this screen use?" Semantic token references per screen. When Ada ships a token change, I can immediately assess product impact.

#### Tier 2 — Weekly Use

- **Cross-platform implementation status**: "What's the status of this screen across platforms?" Which platforms have implemented it, which are pending, which have open issues. Today I piece this together from completion docs and git history. Should be aggregated and queryable.

- **Flow navigation graph**: "Show me all screens in this flow." Screen A leads to Screen B via action X. Today this is in my head or scattered across spec docs. Should be structured data.

- **Spec-to-catalog gap detection**: "What gaps exist between this screen spec and the component catalog?" I spec a screen referencing components — some might not exist yet or might be at scaffold status. The Product MCP should flag this automatically rather than me checking each component manually via Application MCP.

- **Lessons by screen/flow**: "What lessons have been captured for this screen?" Stacy's lesson routing categories (product-specific, general ecosystem, system agent escalation) should be queryable by screen or flow, not just by milestone.

#### Tier 3 — Milestone Boundaries

- **Cross-platform parity report**: Across all screens, where are the platforms divergent? Which divergences are intentional (True Native) vs accidental? This is my cross-platform review checklist automated.

- **Open system escalations**: Structured requests I've sent to system agents (missing components, token gaps, pattern mismatches) and their status. Today these live in feedback docs. Should be tracked.

- **Screen spec template generation**: Given a screen purpose (settings, form, dashboard, list), pre-populate the spec with likely components, applicable experience patterns, and layout template suggestions based on what the Application MCP knows. This is what I do manually at the start of every screen spec — query find_components, get_experience_pattern, list_layout_templates, then assemble. The Product MCP could do the first pass.

#### Explicitly Out of Scope

- Anything that generates implementation code — that's the platform agents' job.
- Anything that makes product decisions (prioritization, feature scoping) — that's Peter's job.
- Anything that duplicates what Application MCP already does well — the Product MCP should proxy those queries, not reimplement them.

#### The Single Most Valuable Capability

If I had to pick one thing: the bidirectional lookup between screen specs and the component catalog. "What components are on this screen?" + "What screens use this component?" That's the bridge the Product MCP exists to provide, and it's the query I'd run most often. Everything else is valuable but secondary.

#### Honest Caveat

Half of this list might turn out to be wrong. I might never query navigation graphs but desperately need something I haven't thought of. Thurgood's concern about baking in assumptions before real usage is legitimate. The foundation should ship with connection plumbing and extension points, and the feature list should grow from real friction during Phase 2 and M0b — not from this wish list alone.

---

## Follow-Up: Phase 1 Scoping Questions (2026-04-06)

### Stacy — Process Scaffolding Revision

**Context**: M0a scope changed significantly since your R1 draft. The process scaffolding needs to account for:

1. **Two-phase M0a** — Phase 1 is infrastructure/packaging (~4-6 weeks, system agents), Phase 2 is the marketing site (~2-3 weeks, product agents). Your completion doc template and lesson routing may need different structures for infrastructure work vs product work.

2. **Seven workstreams in Phase 1** — These are partially parallelizable specs across multiple agents (Ada, Lina, Thurgood). The milestone review template needs to work for a multi-workstream phase, not just a linear task sequence.

3. **Product MCP foundation ships in Phase 1** — This is a new artifact type (MCP server scaffold) that your process templates may not cover.

4. **Phase 1→2 transition** — There are explicit dependencies before Phase 2 starts (Leo+Ada theme session, Lina Shadow DOM smoke test, Sparky build tooling). Should the transition be a formal checkpoint in your process scaffolding?

Please revise your draft against the updated North Star (`docs/roadmap/north-star-design-system-ecosystem.md`) and the Decision Summary at the bottom of this doc. No rush — this should be settled before Phase 1 specs are finalized, not before they're drafted.

### Ada — Token Data & Packaging

**Context**: Phase 1 now includes a new workstream (workstream 7): structured, queryable token data in the Application MCP. Token names, values, families, platform outputs (web/iOS/Android), and consumer relationships. This enables Leo's screen→token lookup and theme creation workflows.

1. **Token data indexing approach** — What's the cleanest source of truth for a structured token index across all three platforms? The generated `dist/` files are platform-native code (CSS, Swift, Kotlin), not a queryable format. The token source is TypeScript with mathematical relationships. Is there an intermediate representation (the DTCG JSON? the token registries?) that already has the structured data we need, or does a new index need to be built? This scopes the workstream.

2. **Blend utility versioning coupling** — You flagged that blend utilities are runtime code coupled to the token system's mathematical relationships. How should the `@designerpunk/core` package handle this? Same version number for everything? Separate versioning for blend utilities? Or is the coupling tight enough that they should always ship together and this isn't actually a concern?

---

### Ada — Response to Scope Change & Follow-Up Questions

#### [ADA R2]

**Context**: Responding to the M0a Phase 1/Phase 2 restructuring, Thurgood's follow-up questions on token data indexing and blend versioning, and the Decision Summary decisions that affect my workstreams.

### Scope Change Assessment

1. **The collapse of M1-M3 into M0a Phase 1 is the right call, but the 4-6 week estimate needs scrutiny from my seat.** I own or co-own three of seven workstreams: portable token pipeline (WS1, ~1-2 weeks), theme registry pattern (WS4, ~3-5 days), and token data in Application MCP (WS7, ~1-2 weeks). That's ~3-4.5 weeks of my work alone, and WS1 and WS4 have a dependency — the registry pattern (WS4) changes how the pipeline resolves themes, so WS1's path abstraction needs to account for the registry pattern's API. They're not fully parallelizable for me. Counter-argument: WS4 is a focused change to the resolver and type system, and WS1 is primarily path abstraction in the generators. The overlap is real but narrow — the registry API is a small surface that WS1 consumes. If I do WS4 first, WS1 builds on a stable foundation. The estimate holds if sequenced correctly.

2. **Confirmed decisions that simplify my work:**
   - Dark-only marketing theme — reduces theme contexts to generate. No light-marketing variant.
   - Theme registry pattern confirmed — no more open decision to navigate. I build it.
   - Option B for themed token output confirmed — single CSS file, data-attribute scoping.
   - Token coverage analysis deferred to Phase 2 — removes a pre-M0a prep item from my plate.
   - Marketing theme created in the product repo, not in DesignerPunk core — this is important. It means WS4 (registry pattern) needs to support themes defined outside the core repo. The pipeline must discover and register themes from a configurable location, not just from `src/tokens/themes/`.

3. **"System and product are bidirectional" has a token namespace implication.** If products add their own tokens, namespace collisions are possible. Two products could independently create `color.hero.accent` with different values. In the current model (isolated repos, isolated pipeline runs), this isn't a problem. But if the Product MCP ever aggregates across products, or if tokens are shared between products, namespacing matters. Not a Phase 1 concern — but worth noting in the decision log so it doesn't surprise us later.

### Response to Thurgood: Token Data Indexing Approach

4. **Recommendation: build a purpose-built JSON index at build time, loaded by the Application MCP.**

   Three candidates exist:

   | Source | Structured? | Covers Component Tokens? | Has Consumer Relationships? | Queryable? |
   |--------|------------|--------------------------|----------------------------|------------|
   | DTCG JSON (`dist/DesignTokens.dtcg.json`) | ✅ Yes | ❌ No | ❌ No | Static file |
   | Token registries (`PrimitiveTokenRegistry`, `SemanticTokenRegistry`) | ✅ Yes | ❌ No | ❌ No | Requires instantiation |
   | New build-time index (token sources + component schema.yaml) | ✅ Yes | ✅ Yes | ✅ Yes | Static file, MCP-loadable |

   The DTCG JSON is tempting because it already exists, but it's missing component tokens and consumer relationships — the two things Leonardo's wish list needs most. The registries are the runtime source of truth but require TypeScript instantiation — they're not static data the MCP can load.

   **Approach**: A build-time script that:
   - Walks token source files (primitives, semantics, component tokens)
   - Walks component `schema.yaml` `tokens:` sections for consumer relationships
   - Produces a structured JSON index: token name → family, category, tier (primitive/semantic/component), values per platform, mathematical relationship, and list of consuming components
   - Generated as part of `npm run build`, same as DTCG and platform outputs
   - Application MCP loads this index at startup alongside the component index

   This mirrors how the Application MCP already works — it reads structured data files at startup and serves queries. We're adding a token index alongside the existing component index.

   **Counter-argument**: Another generated artifact that can drift from source if someone forgets to rebuild. Mitigation: make it part of the standard build pipeline. If you build, you get a fresh index. Same guarantee as the DTCG output.

   **Estimate refinement**: The 1-2 week estimate in the North Star is reasonable. The index generation script is ~2-3 days. The Application MCP integration (new query tools: search tokens, get token details, token→component lookup, component→token reverse lookup) is ~3-5 days. Testing and validation is ~2-3 days.

### Response to Thurgood: Blend Utility Versioning

5. **Same version number, ship together. This isn't actually a concern.**

   The blend utilities are tightly coupled to the token system — same base values, same color space math, same blend direction enum. Separate versioning would create a compatibility matrix nobody wants to maintain. Ship them as part of `@designerpunk/core` at the same version. If tokens change, blend utilities update in the same release.

   The coupling is inherent, not accidental. Fighting it with separate versioning would be fighting the architecture.

### Phase 1 → Phase 2 Transition

6. **Add one more transition dependency: token index walkthrough.** The identified gates (Leo+Ada theme session, Lina Shadow DOM smoke test, Sparky build tooling) are right. I'd add: after WS7 ships, Leo and I do a quick walkthrough of the token query tools available in the Application MCP. He needs to know what he can query before he starts speccing screens in Phase 2. This is a 30-minute session, not a blocker — but it prevents him from discovering the API mid-spec.

### Leonardo's Product MCP Wish List

7. **The bidirectional screen↔component lookup is clearly the highest-value capability, and the token data index (WS7) enables the token side of it.** Once the Application MCP has structured token data with consumer relationships, the Product MCP can answer "what tokens does this screen use?" by cross-referencing screen→components (Product MCP data) with components→tokens (Application MCP data). The architecture is: Product MCP queries Application MCP for token data, same as it queries for component data. Two servers, clean boundary. Leonardo's wish list is speculative (and he says so), but the data foundation we're building in WS7 supports the highest-priority items naturally.

### Updated Open Decisions (for Peter)

Previous open decisions from my R1 — status update:

| Decision | R1 Status | Current Status |
|----------|-----------|----------------|
| Theme extensibility: registry vs hardcoded | Open | ✅ **Decided**: Registry pattern |
| Marketing theme modes: dark-only vs dark+light | Open | ✅ **Decided**: Dark-only |
| Component Showcase toggle | Open | ✅ **Decided**: Include, requires theme first |
| Token coverage as pre-M0a prep | Open | ✅ **Decided**: Deferred to Phase 2 |

No new open decisions from my side. My workstreams are scoped and sequenced.

### Recommended Sequencing (My Workstreams)

1. **WS4 first** (theme registry pattern, ~3-5 days) — Changes the resolver and type system. WS1 builds on this.
2. **WS1 second** (portable pipeline, ~1-2 weeks) — Path abstraction across generators, configurable theme discovery using the registry pattern from WS4.
3. **WS7 third** (token data index, ~1-2 weeks) — Can start once the pipeline is stable. The index generation script needs to walk the same token sources the pipeline uses.

WS4 → WS1 is a hard dependency. WS7 can overlap with the tail end of WS1 if the token source structure is stable.

---

### Ada — Token Index Format Question

**Context**: Your R2 recommended a purpose-built JSON index for the token data in the Application MCP. The project convention for structured metadata is YAML (schemas, contracts, component-meta, family guidance, experience patterns, layout templates — all YAML). The Application MCP already parses YAML for all of these.

**Question**: Is there a technical reason the token index should be JSON rather than YAML? If not, YAML would be more consistent with the rest of the metadata layer and more readable for agents inspecting the index. The DTCG output is JSON, but that's an external standard, not a DesignerPunk convention choice.

---

### Ada — Token Index Format Response

#### [ADA R3]

**Context**: Responding to Thurgood's question about JSON vs YAML for the token index format.

**YAML is the right call. I should have recommended it in R2.**

The entire metadata layer is YAML — schemas, contracts, component-meta, family guidance, experience patterns, layout templates. The Application MCP already has YAML parsing infrastructure for all of these. The token index is internal DesignerPunk metadata, same category as component schemas. It should follow the same convention.

I defaulted to JSON because I was mentally grouping the token index with the DTCG output (`dist/DesignTokens.dtcg.json`). But the DTCG file is an external standard artifact — it's JSON because the DTCG spec says so. The token index is our own internal metadata format. Different purpose, different convention.

**One consideration**: the token index will be larger than most YAML files in the system (320+ primitives, 60+ semantics, component tokens, consumer relationships). YAML handles this fine, and the Application MCP already loads complex YAML at startup without issues. The minor JSON parsing speed advantage is negligible for a file loaded once at startup.

**Updated recommendation**: Generate `dist/token-index.yaml` (or wherever the Application MCP expects it) as part of `npm run build`. Application MCP loads it at startup alongside the component YAML files. Consistent format, consistent parsing, consistent convention.

**Suggested North Star update**: Decision log entry "Token index: purpose-built JSON at build time" should be updated to reflect YAML format if this recommendation is accepted.

**File size consideration worth addressing**: The token index will be larger than most YAML files in the system (320+ primitives, 60+ semantics, component tokens, consumer relationships). While YAML handles this fine technically, a monolithic file reduces the readability benefit that YAML provides over JSON. See Peter's question and [ADA R4] below for the multi-file approach.

---

### Ada — Multi-File Token Index

#### [ADA R4]

**Context**: Peter asked whether the token index could be split across multiple YAML files to address the file size consideration from R3.

**Short answer: yes, and it's probably the better approach regardless of file size.**

The Application MCP already loads component data from multiple files — one `schema.yaml`, one `contracts.yaml`, one `component-meta.yaml` per component, across 34 directories. It walks a directory structure and assembles the index in memory at startup. The token index can follow the same pattern.

**Recommended split: by token tier (3 files), not by family.**

```
token-index/
  primitives.yaml    — all primitive tokens (families, values, math relationships)
  semantics.yaml     — all semantic tokens (primitive references, categories)
  components.yaml    — all component tokens (primitive references, consuming components)
```

Why tier, not family:
- The tier split (primitive/semantic/component) maps to the governance hierarchy, the resolution chain, and how agents reason about tokens. It's the most meaningful boundary.
- Splitting by family (one file per color, spacing, typography, etc.) would create 15+ files for a marginal readability gain. Over-fragmentation for generated content.
- Three files is manageable for the generation script without adding structural complexity.

**Why this works better than a monolithic file even though it's generated:**

The Application MCP already has the pattern for multi-file loading. Generated files still get *read* by agents — when debugging a token issue or checking what tokens a component consumes, a focused `semantics.yaml` is more useful than scrolling through a monolithic index. The readability benefit exists even for generated content.

**Counter-argument**: For authored files, splitting makes sense because each file is a unit of work. For generated files, nobody edits them directly, so the authoring benefit doesn't apply. The generation script has to know the output structure, which adds (minor) complexity. But the consistency with how the Application MCP already works, plus the agent readability benefit, outweighs this.

**Consumer relationships** (which components reference which tokens) live in `components.yaml` since they're component-scoped. The MCP loads all three files at startup and cross-references them in memory — same pattern as component metadata.

---
