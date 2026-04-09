# DesignerPunk North Star: Design System Ecosystem

**Date**: 2026-04-04
**Status**: Vision document — hypothesis, not commitment
**Author**: Peter Michaels Allen + Thurgood

---

## Mission

DesignerPunk is a design system ecosystem — a complete, installable toolkit that provides the mathematical foundation, token pipeline, component architecture, AI-agent infrastructure, and governance framework to build and maintain a cross-platform design system. It ships with production-ready base tokens and components that work out of the box and can be extended, themed, or replaced. It's designed for teams ranging from AI-assisted designers to principal engineers, with the MCP layer as the primary interface for design-led work and the source layer for engineering-led work.

---

## What Makes This Different

Most design systems ship **outputs** — tokens and components you consume. DesignerPunk ships the **capability** to produce, maintain, and scale those outputs.

| What others ship | What DesignerPunk ships |
|------------------|------------------------|
| Token values | Token values + the pipeline that generates them |
| Components | Components + the architecture that governs them |
| Documentation | Documentation + the MCP servers that make it queryable |
| A library | An ecosystem |

---

## The Two Entry Points

### Design-Led (MCP Layer)
A designer (or AI-assisted team) works primarily through the MCP interface:
- Query components by context and purpose
- Get assembly guidance from experience patterns
- Validate UI trees before implementation
- Access token governance and selection guidance
- Spec screens using structured queries, not source code

### Engineering-Led (Source Layer)
A principal engineer works directly in the source:
- Extend the token pipeline with new token families
- Build components using the Stemma framework
- Customize the generation pipeline for new platforms
- Write behavioral contracts and governance tests
- Configure and extend MCP servers

Same system, different entry points. Both are first-class.

---

## What Ships in the Box

### Foundation (the infrastructure)
- Mathematical token system (8px baseline grid, modular scale)
- Cross-platform generation pipeline (TypeScript → CSS/Swift/Kotlin/DTCG/Figma)
- Stemma component architecture (behavioral contracts, inheritance, composition)
- MCP servers (Documentation + Application + Product)
- Governance framework (test infrastructure, compliance validation, audit methodology)
- Agent system (configurable AI agents with domain-scoped knowledge)

### Starter Kit (the working defaults)
- 320+ base tokens (spacing, sizing, color, typography, radius, shadow, glow, motion, opacity, blend, blur)
- 34 production-ready components across 11 families (Web, iOS, Android)
- 136 behavioral contract concepts
- 9 experience patterns, 4 layout templates
- 9 family guidance files
- Dual themes (Original + WCAG 2.2) with day/night modes

### The key principle: the Starter Kit demonstrates the Foundation. Every token, component, and pattern is both *useful* and *educational* — it shows how the system works by example.

---

## Unsolved Problems (Honest Assessment)

These are real gaps between today's state and the North Star. Not blockers — but the North Star should acknowledge them.

1. **Multi-person collaboration is untested.** The system works for 1 person + AI agents. How do two people work on tokens simultaneously? How does a designer's change flow through review to generated output? How do multiple agent environments stay in sync? **Trigger**: If a second human contributor joins during M0, pause and sketch the collaboration model before they start.

2. **Installation and configuration don't exist yet.** There's no `npx create-designerpunk` or equivalent. Today you clone the repo. The North Star requires a real onboarding experience.

3. **Theming/branding customization path is undefined.** A new project needs to bring its own brand. How do they override the base color palette? Swap typography? The token system supports themes, but the "configure your brand" workflow doesn't exist. **Update**: Theming infrastructure (medium depth) moves to M0a prerequisite. The marketing site ships with a custom theme (dark, cyan/teal electric accent) created in the token source. This proves the pipeline handles multiple themes. The full "configure your brand" workflow (lightweight/self-service) is M3/M4. M0b (WrKing Class) validates that a second custom theme can be created using the same mechanism.

4. **The MCP layer assumes a specific directory structure.** MCP servers resolve files from hardcoded paths (`src/components/core/`, `experience-patterns/`, etc.). Making this portable requires configuration.

5. **Platform separation at the package level.** A web project doesn't need Swift files. An iOS project doesn't need CSS. The packaging needs platform-aware distribution.

6. **Product MCP doesn't exist yet (Spec 081).** The bridge between the design system ecosystem and product development is unbuilt. **Architectural decision** (from Leonardo R1): Product MCP should live in the product project and query the Application MCP for design system data. Two servers, clear ownership boundary.

7. **MCP server startup and configuration is undefined.** The artifact inventory covers what ships but not how you start using it. How does a product project get MCP servers running and pointed at the right data? This is the highest-priority packaging question (per Leonardo R1).

---

## Reverse-Engineering: Milestones to Get There

### Milestone 0a: Ecosystem Packaging + Marketing Site (First Product)

M0a is two phases: first, package DesignerPunk as a consumable ecosystem (`@designerpunk/core`); then build the marketing site in a separate repo consuming that package. This front-loads the infrastructure that M0b and all future products need.

#### Phase 1: Package the Ecosystem (~4-6 weeks)

Eight workstreams, partially parallelizable:

**1. Portable token pipeline**
Make the token generation pipeline runnable from a product repo. Abstract hardcoded paths, accept configurable root directories, support product-defined themes via registry pattern. Product repos can create their own `SemanticOverrides.ts` and run the pipeline to generate themed outputs.

**2. Component library package**
Clean up `files` and `exports` in package.json. ESM bundle (fix 4 missing components per Lina R1), CSS tokens, blend utilities, responsive grid, fonts. Full bundle for M0a, tree-shaking deferred.

**3. Configurable MCP servers**
Application MCP and Docs MCP accept configurable data directories instead of hardcoded paths. Runnable from a product repo context pointing at the package's data.

**4. Theme infrastructure — registry pattern**
Replace hardcoded `ThemeContext` union with theme registry. Products register themes, resolver iterates over whatever's registered. Must support themes defined outside the core repo (configurable theme discovery). Ada builds this. Ada's sequencing: WS4 first, then WS1 builds on it.

**5. Product MCP foundation**
Minimal starter scaffold that ships with the package. Connects to Application MCP and proxies design system queries (single endpoint for product agents). Accepts a product configuration file declaring product name, active platforms, and theme. Provides extension points for product-specific data. Products extend it — features grow from real usage, not speculation. This is Spec 081 scoped to the foundation.

**6. Agent configurations for product context**
Agent configurations that work when DesignerPunk is a dependency, not the working directory. Product agents know where to find pipeline, components, MCP servers in the package structure.

**7. Token data in Application MCP**
Add structured, queryable token data to the Application MCP — token names, values, families, platform outputs (web/iOS/Android), and consumer relationships (which components reference which tokens). Purpose-built index generated at build time (walks token sources + component schemas). Application MCP loads at startup alongside component index. Enables product agents to query tokens the same way they query components. Ada's sequencing: WS7 after WS1, can overlap with WS1's tail.

**8. Agent resource and /knowledge updates**
Update agent prompts, resources, and knowledge bases to reflect new capabilities from workstreams 1-7. Examples: Leo updated for token data queries in Application MCP, Ada updated for theme registry, product agents updated for Product MCP foundation and package consumption patterns. Must happen before publish — agents need to know what they can query before Phase 2 starts.

**Publish**: `@designerpunk/core` to GitHub Packages. Includes pipeline, components, MCP servers, Product MCP foundation, agent configs, starter kit.

#### Phase 1 Spec Breakdown

Three specs, organized by block. Each block is one spec with clear task ownership per workstream.

| Spec | Block | Workstreams | Primary Owner | Scope |
|------|-------|-------------|---------------|-------|
| Spec 094: Portable Pipeline & Theme Registry | A | WS4 + WS1 | Ada | Token system portability and extensibility. ✅ Complete. |
| Spec 095: Ecosystem Package Assembly | B | WS2 + WS6 | Lina (WS2) + Thurgood (WS6) | What ships in the package and how it's consumed. ✅ Complete. |
| Spec 096: Token Data Index | C | WS7 | Ada | Queryable token data in Application MCP. |
| Spec 081: Product MCP Design | — | WS3 + WS5 | Cross-agent | Application/Product MCP data boundary, path configuration, Product MCP foundation. Activated — not waiting for M0b. |

Block D (Publish & Agent Updates) is not a spec — publishing is the final task of Phase 1, and agent resource updates (WS8) are distributed as tasks within each spec above. The Integration Guide (`docs/roadmap/integration-guide-draft.md`) is formalized during Block D — each spec contributes its section, then the guide moves to `.kiro/steering/` for Docs MCP serving.

#### Phase 1 → Phase 2 Transition

Before Phase 2 starts:
- Leo + Ada session on theme registry API — Leo needs to understand the "create a marketing theme in the product repo" workflow before speccing screens
- Leo + Ada token index walkthrough — 30 min, so Leo knows what token queries are available in the Application MCP
- Lina: Shadow DOM + CSS custom property smoke test with Nav-Header-App under the marketing theme — verify nested shadow boundaries inherit themed custom properties correctly
- Sparky: Build tooling input — project scaffolding preferences for the marketing site repo
- Stacy: Confirm process scaffolding covers Phase 2 product work
- Thurgood: Full MCP audit — verify both Docs MCP and Application MCP serve accurate, current information after Phase 1 infrastructure changes. Check for stale steering docs, outdated file path references, and metadata drift.
- Peter: Finalize design direction and content priorities

#### Phase 2: Marketing Site (~2-3 weeks)

Separate repo. Installs `@designerpunk/core`. Builds the marketing theme using the packaged pipeline. Product-specific code (hero layout, `//` heading prefixes, hexagonal diagram, footer) lives in the product repo.

**Theming**: Marketing theme created in the product repo as a `SemanticOverrides.ts` using the registry pattern. Dark background, cyan/teal electric accent. Proves the "install DesignerPunk, configure it for your brand" workflow.

**Token output structure**: Option B — all themes in one CSS file, scoped by `data-theme` attribute. Supports Component Showcase toggle. (Ada R1 recommendation, endorsed by Leo and Lina.)

**Rough screen inventory** (per Leonardo R2, pending Peter refinement):
- Home/Landing — hero, value proposition, feature highlights, CTA
- About/Philosophy — ecosystem story, two entry points, mathematical foundation
- Component Showcase — live DesignerPunk components as both UI and demonstrated content
- Getting Started — installation, configuration, first steps
- Contact/Community — newsletter signup, feedback form

#### Pre-M0a Prep

1. ✅ **Metadata health check** — complete, no blockers (`docs/roadmap/m0a-metadata-health-check.md`)
2. ✅ **Review triad agreement** — confirmed (Leonardo + Stacy + Thurgood)
3. ⬜ **Process scaffolding draft** — Stacy drafting
4. ⬜ **M0a scope definition** — Leonardo drafting formal proposal
5. ⬜ **Token coverage analysis** — Ada auditing token families against M0a screens (hero typography, spacing)
6. ⬜ **Sparky input on build tooling** — project scaffolding preferences for the marketing site repo

**Process dry run**: M0a activates a subset of the agent team (Leonardo, Sparky, Ada, Lina, Stacy, Thurgood). Phase 1 exercises system agents heavily. Phase 2 exercises product agents.

**Lessons synthesis**: Formal lightweight review after Phase 1 (packaging) and after Phase 2 (marketing site). Categorize lessons as M0a-specific or general ecosystem.

### Milestone 0b: WrKing Class (Real Product Test)
Build a single flow of WrKing Class (civic engagement platform) across web, iOS, and Android. Scoped ruthlessly to one flow (e.g., "browse legislation and see how it affects me"). This is the real stress test — custom branding, cross-platform, real data models, accessibility under genuine civic obligation.

**Validates**: Cross-platform workflow, custom theming/branding, Product MCP extension, experience pattern sufficiency, component gap discovery. Exercises Kenya (iOS), Data (Android), and the full agent team.

**Note**: M0b creates its own branded theme using the same registry pattern and pipeline from M0a Phase 1. Validates that a second product can install `@designerpunk/core` and configure it independently.

**Lessons synthesis**: Formal lightweight reviews after M0b single-platform completion and after M0b cross-platform completion. Each synthesis categorizes lessons as M0b-specific or general ecosystem.

### Milestone 1: Onboarding Experience
Build the `create-designerpunk` (or equivalent) experience — guided setup, brand configuration, starter component selection, MCP server configuration.

**Validates**: Can someone who didn't build this system set it up and use it productively?

---

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-04 | North Star: ecosystem, not library | The infrastructure (pipeline, MCP, governance) is the differentiator, not just the outputs |
| 2026-04-04 | Two entry points: MCP layer + source layer | Serves the full skill range from designer to principal engineer. Validated by Leonardo R1. |
| 2026-04-04 | Starter Kit ships with Foundation | Working defaults are both useful and educational — they demonstrate the system by example |
| 2026-04-04 | Hold North Star loosely | Product development will reveal what the ecosystem actually needs — adjust based on learning |
| 2026-04-04 | First product: DesignerPunk marketing site | Quick win that surfaces basic packaging questions without product complexity. Produces public artifact. WrKing Class follows as M0b for the real stress test. |
| 2026-04-04 | Product MCP lives in product project | Clean ownership boundary — Product MCP queries Application MCP for design system data. Two servers, clear separation. (Leonardo R1 recommendation) |
| 2026-04-04 | Milestone ordering is flexible | M1/M2 sequence may shift based on M0 friction. If monorepo coupling hurts, packaging pulls forward. (Leonardo R1 feedback) |
| 2026-04-05 | Marketing site gets custom theme, not default | Showcase demonstrates what DesignerPunk *can produce* when themed, keeping defaults neutral. Validates theming infrastructure at medium depth. |
| 2026-04-05 | Theming infrastructure moves to M0a | Medium depth: new theme in token source, pipeline generates outputs, components verified. Full "configure your brand" workflow deferred to M3/M4. |
| 2026-04-05 | Lessons synthesis at milestone checkpoints | Formal lightweight reviews after M0a, M0b single-platform, M0b cross-platform. Lessons categorized as product-specific or general ecosystem. (Stacy R1) |
| 2026-04-05 | Review triad: Leonardo + Stacy + Thurgood | Default reviewers for vision-level and milestone-level documents. (Stacy R1) |
| 2026-04-05 | Pre-M0a prep: 4 items | Process scaffolding, metadata health check, scope definition, triad agreement. Lightweight — if it takes more than a session or two, we're over-engineering. (Stacy R1) |
| 2026-04-05 | Package as `@designerpunk/core` | Scoped package leaves room for `@designerpunk/ios`, `@designerpunk/android`. M0b may start on iOS. |
| 2026-04-05 | Full bundle for M0a, tree-shaking for M0b | Individual component exports add complexity that distracts from M0a learning goals. Multi-platform packaging in M0b changes the structure anyway. |
| 2026-04-06 | Option 5 packaging: full ecosystem as npm package | Minimal CSS export insufficient — product needs the pipeline, theme infrastructure, MCP servers. Front-loading this work serves M0b and all future products. Git subtree (Option 4) defers the problem; Option 5 solves it. |
| 2026-04-06 | M0a becomes two phases: packaging then product | Phase 1 (~4-6 weeks): package pipeline, components, MCP servers, theme registry, Product MCP foundation, agent configs. Phase 2 (~2-3 weeks): marketing site in separate repo consuming the package. |
| 2026-04-06 | Product MCP foundation ships with package | Starter scaffold that connects to Application MCP and provides hooks for product-specific data. Products extend it. Spec 081 scoped to foundation. |
| 2026-04-06 | Theme registry pattern, not hardcoded | Products register themes, resolver iterates. Avoids refactoring for M0b. Marketing theme created in product repo, not in DesignerPunk core. |
| 2026-04-06 | Milestones M1-M3 collapsed into M0a Phase 1 | Packaging, Product MCP, and portable infrastructure are prerequisites for the first product, not separate milestones. Onboarding experience (create-designerpunk) remains as M1. |
| 2026-04-06 | System and product are bidirectional | Products add their own tokens, themes, and potentially components. The package provides infrastructure to participate in the ecosystem, not just consume outputs. |
| 2026-04-06 | Product MCP foundation ships in Phase 1 | Minimal scaffold: connect to Application MCP, proxy design system queries, accept product config (name, platforms, theme). Extension points for product-specific data. Features grow from real usage during Phase 2 and M0b. (Leonardo R2 recommendation) |
| 2026-04-06 | Token data added to Application MCP | Structured, queryable token index (names, values, families, platform outputs, consumer relationships) across all three platforms. Required for Product MCP screen→token lookup and theme creation workflows. |
| 2026-04-06 | Token index: purpose-built YAML at build time | DTCG JSON lacks component tokens and consumer relationships. Build-time script walks token sources + component schemas, produces structured index. Three files by tier: primitives.yaml, semantics.yaml, components.yaml. Application MCP loads at startup. YAML for consistency with metadata layer convention. (Ada R2, R3, R4) |
| 2026-04-06 | Blend utilities: same version, ship together | Coupling is inherent — same base values, same color space math. Single version for `@designerpunk/core`. (Ada R2) |
| 2026-04-06 | Ada's workstream sequencing: WS4 → WS1 → WS7 | Theme registry first (changes resolver), portable pipeline second (builds on registry), token index third (needs stable pipeline). WS4→WS1 hard dependency. (Ada R2) |
| 2026-04-06 | Token namespace collision noted for future | Products adding their own tokens could create collisions. Not a Phase 1 problem (isolated repos). Note for when Product MCP aggregates across products. (Ada R2) |
| 2026-04-06 | Theme registry must support external themes | Marketing theme lives in product repo, not core. Pipeline needs configurable theme discovery beyond `src/tokens/themes/`. (Ada R2) |
| 2026-04-06 | Add token index walkthrough to Phase 1→2 transition | Leo + Ada, 30 min. Leo needs to know available token queries before speccing screens. (Ada R2) |
