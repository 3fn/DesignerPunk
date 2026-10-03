# DesignerPunk

[![Version](https://img.shields.io/badge/Version-15.0.0-purple)](docs/releases/release-15.0.0.md)
[![Repository](https://img.shields.io/badge/GitHub-DesignerPunk-blue)](https://github.com/3fn/DesignerPunk)
[![License](https://img.shields.io/badge/License-Apache--2.0-green.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/Tests-9377%2B-brightgreen)](.)

---

Design systems are no longer simply tools for brand consistency. They're a shared context and working agreement between humans and AI agents for building software together. This is not the future; this is today. This is essential infrastructure for teams of any size, where machines query and validate with precision while humans contribute intent and meaning. DesignerPunk is built from the ground up to deliver this collaborative reality.

---

## The Challenge

For AI agents to be genuine collaborators in design system work, three things need to be true:

1. Every design decision must be queryable, not buried in docs humans forgot to update
2. Every component contract must be machine-validatable, not implicit tribal knowledge
3. Institutional context must persist across sessions, not reset every conversation

No publicly available design system solves for these. They're built for human consumption and retrofitted for machines as an afterthought — if retrofitted at all.

---

## The Ecosystem

DesignerPunk is an ecosystem, not just a design system. Not "ecosystem" in the tech-industry sense of selling you more shit for your living room. Ecosystem in the biological sense: a shared environment where interdependent systems sustain each other and evolve together. This is punk.

Its three foundational systems (Rosetta, Stemma, Civitas) are interdependent: tokens feed components, components depend on governance, governance maintains the health of both. Humans and AI agents co-exist within this ecosystem as partners with distinct, complementary roles. The system is designed to evolve, not just to ship.

---

### Rosetta: The Mathematical Foundation

**What it is:** A token system and build pipeline that translates design intent into platform-native code.

**What it solves:** Every value is mathematical, not arbitrary. Machines validate relationships; humans define intent.

**Deliverables:** 443 tokens (217 primitive, 193 semantic, 33 component) across spacing, sizing, color, typography, radius, shadow, glow, motion, opacity, blend, and blur. Cross-platform generation to CSS, Swift, Kotlin, and DTCG JSON. Three-tier architecture: Primitive → Semantic → Component.

**How AI agents access it:**
```
get_token_details({ name: "space150" })
→ { value: 12, formula: "base × 1.5", tier: "primitive", platforms: { web: "0.75rem", ios: "12pt", android: "12dp" } }
```

---

### Stemma: The Component Architecture

**What it is:** A framework for building components that behave identically across platforms while staying native.

**What it solves:** Every component makes explicit behavioral promises. Machines validate contracts; humans define interaction intent.

**Deliverables:** 34 production components with behavioral contracts. 10 contract categories, 137 concepts. Platform implementations: Web Components for the web; the SwiftUI and Jetpack Compose components ship as reference source, not a build input (Native onboarding is not supported yet). Formal inheritance with intentional exclusions.

**How AI agents access it:**
```
find_components({ context: "login-forms" })
→ [Input-Text-Email, Input-Text-Password, Button-CTA] with selection guidance, accessibility notes, and composition rules
```

---

### Civitas: The Governance Layer

**What it is:** The steering documentation, agent configurations, automation, and processes that bind the ecosystem together.

**What it solves:** Institutional knowledge persists across sessions. Machines query what they need progressively; humans maintain the source of truth.

**Deliverables:** 83 governance documents served by MCP with progressive disclosure, plus 8 always-loaded identity documents. 3 MCP servers (docs, application, product). 8 specialized AI agents with domain boundaries. 13 validation hooks. A PR-gated workflow with required checks and a completion documentation system. 130+ specs encoding institutional decisions.

**The agent system:**

| Agent | Domain | Named After | Why |
|-------|--------|-------------|-----|
| Ada | Token system (Rosetta) | [Ada Lovelace](https://en.wikipedia.org/wiki/Ada_Lovelace) | Saw computing as more than calculation |
| Lina | Component system (Stemma) | [Lina Bo Bardi](https://en.wikipedia.org/wiki/Lina_Bo_Bardi) | Architecture that serves people, not ego |
| Thurgood | Governance & testing (Civitas) | [Thurgood Marshall](https://en.wikipedia.org/wiki/Thurgood_Marshall) | Held systems accountable to their own promises |
| Leonardo | Product architecture | [Leonardo da Vinci](https://en.wikipedia.org/wiki/Leonardo_da_Vinci) | Unified art and engineering |
| Sparky | Web platform | [Sarah Parks](https://www.linkedin.com/in/sarahparks/) | Collaborative power between design and engineering |
| Kenya | iOS platform | [Kenya Hara](https://en.wikipedia.org/wiki/Kenya_Hara) | Simplicity as sophistication |
| Data | Android platform | [Commander Data](https://en.wikipedia.org/wiki/Data_(Star_Trek)) | Precision with aspiration toward human understanding |
| Stacy | Product QA | [Stacey Abrams](https://en.wikipedia.org/wiki/Stacey_Abrams) | Ensured systems deliver on their promises |

Each agent knows what it owns, what it doesn't, and who to defer to. No agent operates without constraints.

**How AI agents access it:**
```
get_section({ path: "token-governance", heading: "Token Selection Matrix" })
→ Exactly the governance context needed for this decision, not the entire 2,000-line document
```

---

## Result

The architecture is the argument. The numbers are the evidence.

**By the numbers:**
- 9,377 tests passing across 390 test suites
- 34 production components with full cross-platform implementations
- 443 design tokens with mathematical relationships
- 3 MCP servers enabling progressive, context-efficient AI access
- 8 AI agents with domain-scoped expertise operating within defined boundaries
- 130+ specs documenting every architectural decision and its rationale
- Published as `@3fn/core` on npm with a working CLI (`npx designerpunk`)

**What this enables:**
- An AI agent can select the right component for a login form, validate the assembly, and generate platform-native code without a human explaining the system from scratch every session
- Products own their token tier: `init` copies DesignerPunk's token source into the product's repo, and `generate` builds the product's own platform output and token index from it
- The system self-documents its own evolution: every completed task produces completion documentation, and every change reaches `main` through a pull request with required checks
- A new agent (or a new human) can onboard by querying the MCP servers rather than reading thousands of lines of documentation linearly
- Token changes propagate to all three platforms through a single generation pipeline with mathematical validation at every step
- Design tokens export to DTCG JSON and Figma Variables, enabling canvas tools to sync with live code

**Where it stands today:**

The ecosystem creates, maintains, and evolves itself as intended. AI agents and humans collaborate on token creation, component development, governance, and cross-platform generation daily.

Guiding agents to apply tokens and components to product design specs is the current top priority. The foundational infrastructure to support this is operating, but requires further maturation and refinement.

---

## Getting Started

This release is ready for building web products, with the agent layer for Claude Code and Kiro. Native onboarding is not supported yet: the iOS (SwiftUI) and Android (Jetpack Compose) components ship as reference source, not a build input, so don't start a native product on this release. On web, a custom theme you register in `designerpunk.config.ts` does not change your generated output yet; light and dark mode work.

**Use it in your project:**

1. `npm install @3fn/core`
2. `npx designerpunk init --target=<cc|kiro>` — `init` is the birth event — runs once per design system, ever
3. `npx designerpunk generate` — `generate` is the pipeline — run on every token change
4. Fill in your personal note — or, after the restart, ask your agent to walk you through it.
5. Restart your agent session (approve DesignerPunk's MCP servers if asked).

[Install guide](docs/consumer/INSTALL.md)

**Study the architecture:**
- [DesignerPunk Systems Overview](.kiro/steering/DesignerPunk-Systems-Overview.md)
- [Governance documentation](governance/) (83 docs, the governance layer in practice)
- [AI Collaboration Framework](governance/AI-Collaboration-Framework.md)

---

## Why Punk

Punk isn't an aesthetic. It's a stance: the tools to create should not be gatekept by those who can afford enterprise licenses, dedicated teams, or years of specialized training.

DesignerPunk exists so that a solo founder, a small team, or a community organizer can have the same systematic infrastructure that Fortune 500 companies build behind closed doors and never share. AI eliminates the barrier to entry. This system levels the competitive field.

---

## Engineering Approach

The new coding language isn't React, Swift, or Kotlin. It's English.

I provide architectural direction, design decisions, and quality standards. AI agents execute implementation within those constraints. This is the producer/musician model: I shape the sound; I don't play every instrument. We make music together.

The system is tool-agnostic by design. The architecture is the constant; which AI, IDE, CLI, or design tool you use is interchangeable. This isn't a workaround. It's the methodology the system was built to prove.

Note: primarily developed on Kiro IDE and CLI. As of 15.0.0, the generated agent layer supports both Kiro and Claude Code.

9,377 tests. 34 components across three platforms. A published package with a working CLI. All architected through this model.

---

## About

**Peter Michaels Allen** — Design Systems Architect & Design Engineer

18 years of design experience. 10+ years creating and managing design systems at scale at Reddit, Venmo, and PayPal, and across enterprise, healthcare, fintech, government, and gaming. DesignerPunk is the synthesis: a working system that demonstrates how design systems, cross-platform architecture, and AI collaboration converge.

[![Punk Your Design w/ Peter Michaels Allen | Wireframe Live](https://img.youtube.com/vi/sFjNMasG_mU/maxresdefault.jpg)](https://www.youtube.com/live/sFjNMasG_mU)
*Punk Your Design — a conversation about the philosophy and architecture behind DesignerPunk on Design Systems House*

[LinkedIn](https://www.linkedin.com/in/petermichaelsallen/) · [GitHub](https://github.com/3fn)

---

## License

Apache-2.0 — See [LICENSE](LICENSE) for details.
