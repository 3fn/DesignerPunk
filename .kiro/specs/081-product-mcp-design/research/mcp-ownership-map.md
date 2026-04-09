# MCP Ownership Map

**Date**: 2026-04-09
**Purpose**: Define what each MCP is responsible for serving
**Status**: Working document — input to Spec 081 data boundary decision

---

## Docs MCP

Serves the knowledge layer — how to build with DesignerPunk.

- Steering documentation (token governance, component development guide, process standards)
- Token family reference docs (spacing, color, typography, etc.)
- Component family reference docs (buttons, containers, navigation, etc.)
- Architectural guides (Rosetta system, Stemma system, cross-platform guidelines)
- Integration guide (setup, configuration, MCP startup)
- Test standards and audit methodology
- Process docs (spec planning, completion documentation, feedback protocol)
- Release management documentation

---

## Application MCP

Serves the system — what exists and how it works.

- Components (schemas, behavioral contracts, metadata, readiness, composition rules)
- Tokens (index of all tokens — primitives, semantics, component tokens — with values, families, platform outputs, consumer relationships)
- Family guidance (selection rules, prop recommendations, when-to-use/when-not-to-use)
- Basic layout templates (universal page-level responsive structure)
- Family registry (canonical family names)
- Assembly validation (component tree correctness checking)
- Composition checking (parent-child compatibility)

---

## Product MCP

Serves the product — what we're building and how it's structured.

- Product context (what it is, why we're building it)
- Product configuration (name, platforms, theme, abbreviation)
- UX principles and guidelines
- UI and Visual design direction
- Defines product verticals, flows, key pages
- Product layout templates
- Screen specifications (component trees, token references, state models, accessibility requirements)
- User flows (screen-to-screen navigation, intent signals)
- Experience patterns (assembly guides for common screen types)
- Domain objects (product entities — what the product's data looks like)
- Implementation status (which screens are built, which platforms, what's pending)
- Cross-platform parity (what's consistent, what diverges intentionally)

---

## Clarification: System Agents Serve the Repo, Not Just DesignerPunk

When a product installs `@designerpunk/core` and starts building, the system agents serve the entire repo — not just the ecosystem artifacts that shipped with the package.

- **Ada** is the token specialist for this repo. Every token — ecosystem or product-created — is her domain. She governs the Rosetta system as it exists in this codebase, including any tokens the product adds.
- **Lina** is the component specialist for this repo. Every component — ecosystem or product-created — is her domain. She governs the Stemma system as it exists in this codebase, including any components the product adds.
- **Thurgood** is the test governance and spec standards specialist for this repo. Every test, every spec, every audit — ecosystem or product — is his domain.

The governance gradient still applies: modifying an ecosystem token that affects every product gets heavier review than creating a new product-specific token. But the ownership is unified. There's no "ecosystem Ada" and "product Ada" — there's one Ada who governs all tokens in the repo.

---

## What's NOT in Any MCP

These are execution artifacts, not queryable data:

- Spec history (`.kiro/specs/`) — development process, not product or system data
- Completion docs — process output
- Issues — bug tracking
- Roadmap docs — planning artifacts

The product modifies the system. The Application MCP serves the system as it is — including product modifications. The Product MCP serves product architecture — screens, flows, domain objects, design direction. The Docs MCP serves the knowledge layer — how to build with the system.
