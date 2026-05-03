---
inclusion: always
---

# Civitas System Overview

**Date**: 2026-05-03
**Last Reviewed**: 2026-05-03
**Purpose**: Define Civitas — the governance layer of DesignerPunk
**Organization**: process-standard
**Scope**: cross-project
**Layer**: 1
**Relevant Tasks**: all-tasks

---

## Overview

Civitas is the governance layer of DesignerPunk, named alongside Rosetta (tokens) and Stemma (components) as the third foundational system. Where Rosetta provides the mathematical token foundation and Stemma provides the component architecture, Civitas provides the governance infrastructure that binds them together — the steering documentation, MCP servers, agent configurations, automation hooks, knowledge bases, and processes that enable the system to operate coherently.

The name comes from the Latin concept of the social contract — the shared framework of obligations and participation that makes collective action possible. Civitas is not a place or a government; it is the connective tissue between participants and their shared standards.

Civitas is architecturally different from its siblings. Rosetta has a unified artifact format (token definitions with mathematical formulas). Stemma has a unified artifact format (component schemas with behavioral contracts). Civitas is a governance umbrella over heterogeneous artifacts — markdown files, JSON configurations, shell scripts, TypeScript validators, and indexed knowledge bases. This heterogeneity is intentional: governance infrastructure serves diverse purposes and doesn't benefit from a single format.

---

## What Civitas Contains

**Steering documentation** (86 docs across 4 layers):
- Layer 0: Meta-guide for the steering system itself
- Layer 1: Foundation docs loaded by all agents (Core Goals, Agent Directory, this document)
- Layer 2: Frameworks and patterns queryable via MCP (governance, architecture, process standards)
- Layer 3: Specific implementations (token family docs, component family docs, platform guides)

**MCP servers** (3):
- Docs MCP: serves steering documentation with progressive disclosure (86 docs, 2,753 sections, 332 cross-references)
- Application MCP: serves component metadata and token metadata (34 components, 437 tokens, 9 experience patterns)
- Product MCP: serves product-specific context (conceptual — specs 081, 096, 097)

**Agent configurations** (8 agents):
- 3 system agents (Ada/Rosetta, Lina/Stemma, Thurgood/Civitas) that build and maintain the design system
- 5 product agents (Leonardo, Sparky, Kenya, Data, Stacy) that consume the design system to build products
- Each agent has a JSON config (MCP access, steering doc references, skills) and a prompt file (domain boundaries, operational modes)

**Automation** (13 hooks + 5 shell scripts):
- Agent hooks for domain-specific compliance checks (token health, component scaffolding, test coverage)
- Shell scripts for task completion, release management, and file organization

**Knowledge bases** (24 definitions):
- Per-agent indexed content for domain-scoped semantic search
- Covers component source, token source, test infrastructure, spec history

**Spec infrastructure**:
- 97+ specs encoding institutional decisions and implementation history
- Spec workflow: design outline → feedback → requirements → design → tasks → execution
- Feedback protocol, formalization gates, completion documentation system

---

## What Civitas Does Not Contain

- **Token definitions and pipeline**: Primitive/semantic token source files, mathematical validators, generation pipeline, platform output — these are Rosetta. Civitas serves the *documentation about* tokens, not the tokens themselves.
- **Component implementations**: Platform-specific code (web/iOS/Android), behavioral contract tests, component schemas — these are Stemma. Civitas serves the *documentation about* components, not the components themselves.
- **Product screens and specifications**: Screen implementations, product-level quality audits — these are product agent work.

---

## Relationship to Rosetta and Stemma

Civitas relates to the other two systems through a content-vs-infrastructure distinction:

- **Rosetta content, Civitas infrastructure**: Ada owns whether Token-Family-Color.md is technically correct (content correctness). Civitas owns whether it has valid metadata, current cross-references, and a recent review date (infrastructure health). Civitas also monitors whether Token-Governance.md's description of semantic token usage aligns with Core Goals' description (content consistency).

- **Stemma content, Civitas infrastructure**: Lina owns whether Component-Family-Button.md correctly describes the inheritance structure (content correctness). Civitas owns the infrastructure health and cross-surface consistency for Stemma docs, same as for Rosetta.

- **Civitas content and infrastructure**: Thurgood owns both for governance-layer docs (Process-Spec-Planning, Agent-Directory, MCP-Relationship-Model, etc.). These are Civitas's own artifacts.

---

## The Three-Layer Boundary

Governance responsibilities are distributed across three layers:

**Content correctness** — Domain agents own this. Is the technical content accurate? Ada validates token mathematics. Lina validates component architecture. Domain agents have the expertise to judge their content.

**Content consistency** — Civitas steward (Thurgood) owns this. Does content align across surfaces? When the same concept appears in multiple docs, are the descriptions consistent? The steward flags potential inconsistencies; domain agents adjudicate whether the inconsistency is real drift or intentional abstraction.

**Infrastructure health** — Civitas steward (Thurgood) owns this. Valid metadata, current cross-references, recent review dates, MCP health, agent prompt currency, governance tooling adoption. The operational maintenance layer.

**Resolution path for flagged inconsistencies:**
- Intra-domain (two docs owned by the same agent disagree): Steward flags → domain agent resolves
- Cross-domain (docs owned by different agents disagree): Steward flags → both agents review → Peter arbitrates if they disagree
- Unowned (infrastructure-level): Steward resolves directly

---

## Governance Processes

Civitas governance processes are documented in Thurgood's prompt as operational responsibilities. Key processes:

- **Steering doc lifecycle**: creation (metadata requirements) → review (monthly health check) → update (event-driven triggers) → deprecation (ballot measure with rationale)
- **MCP health monitoring**: index health, content drift detection, tool availability — monthly cadence + post-spec events
- **Agent prompt currency**: prompt-to-steering alignment, Agent Directory consistency — post-modification verification
- **Governance tooling adoption**: ensuring scripts and automation remain active after the spec that created them completes

For detailed process documentation, query Thurgood's prompt via the agent system or see Process-File-Organization for cross-references.

---

## External Representation

In external-facing materials (portfolio site, ecosystem diagrams, presentations), Civitas should be represented as the governance layer that binds Rosetta and Stemma together:

- **Rosetta**: Mathematical foundation — tokens, formulas, cross-platform values
- **Stemma**: Relational foundation — components, schemas, behavioral contracts
- **Civitas**: Governance foundation — standards, processes, agent coordination, institutional knowledge

The three systems form a complete design system ecosystem: Rosetta defines the values, Stemma defines the structures, and Civitas defines how they're governed, documented, and maintained.

---

## MCP Query

For the full document:
```
get_document_full({ path: ".kiro/steering/Civitas-System-Overview.md" })
```

For specific sections:
```
get_section({ path: ".kiro/steering/Civitas-System-Overview.md", heading: "The Three-Layer Boundary" })
get_section({ path: ".kiro/steering/Civitas-System-Overview.md", heading: "Relationship to Rosetta and Stemma" })
```
