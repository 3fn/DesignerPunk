## @unit #overview @ sha256:e27d3c131615f18f5b656491e1cd7c2beff89d5a86acadfea0132830701efdc8
## Overview

Civitas is the governance layer — in DesignerPunk, and in this repo, which inherits the pattern: named alongside Rosetta (tokens) and Stemma (components) as the third foundational system. This repo's Civitas is its own, not DesignerPunk's. Where Rosetta provides the mathematical token foundation and Stemma provides the component architecture, Civitas provides the governance infrastructure that binds them together — the steering documentation, MCP servers, agent configurations, automation hooks, knowledge bases, and processes that enable the system to operate coherently.

The name comes from the Latin concept of the social contract — the shared framework of obligations and participation that makes collective action possible. Civitas is not a place or a government; it is the connective tissue between participants and their shared standards.

Civitas is architecturally different from its siblings. Rosetta has a unified artifact format (token definitions with mathematical formulas). Stemma has a unified artifact format (component schemas with behavioral contracts). Civitas is a governance umbrella over heterogeneous artifacts — markdown files, JSON configurations, shell scripts, TypeScript validators, and indexed knowledge bases. This heterogeneity is intentional: governance infrastructure serves diverse purposes and doesn't benefit from a single format.

---

## @unit #what-civitas-contains @ sha256:6d5bb7e904c10be1b5bf04b25fd03b6f5222b3e5ea2b46c92b40aa4b6debf137
## What Civitas Contains

**Identity documentation** (always loaded):
- The generated `designerpunk-*` identity members — this repo's collaboration principles, feedback protocol, startup checklist, completion protocol, agent directory, and these overviews
- Your team's personal note (`.designerpunk/personal-note.local.md`, local to each machine)

**MCP servers** (from the installed package):
- Docs MCP: serves DesignerPunk's shipped documentation corpus, read-only
- Application MCP: serves component and token metadata for this design system
- Product MCP: serves this product's screens, product tokens and context

**Agent configurations** (8 agents):
- 3 system agents (Ada/Rosetta, Lina/Stemma, Thurgood/Civitas) that build and maintain this design system
- 5 product agents (Leonardo, Sparky, Kenya, Data, Stacy) that use the design system to build products
- Each agent is generated for your agent tool; regenerate rather than hand-edit

**Spec infrastructure**:
- Your specs (starting from the shipped starter specs) encoding decisions and implementation history
- Spec workflow: design outline → feedback → requirements → design → tasks → execution
- Feedback protocol, formalization gates, completion documentation
---

## @unit #the-three-layer-boundary @ sha256:07a57ddc3770e58fd778f308e53b46af5663158ed9c8332885ab516db02a27fa
## The Three-Layer Boundary

Governance responsibilities are distributed across three layers:

**Content correctness** — Domain agents own this. Is the technical content accurate? Ada validates token mathematics. Lina validates component architecture. Domain agents have the expertise to judge their content.

**Content consistency** — Civitas steward (Thurgood) owns this. Does content align across surfaces? When the same concept appears in multiple docs, are the descriptions consistent? The steward flags potential inconsistencies; domain agents adjudicate whether the inconsistency is real drift or intentional abstraction.

**Infrastructure health** — Civitas steward (Thurgood) owns this. Valid metadata, current cross-references, recent review dates, MCP health, agent prompt currency, governance tooling adoption. The operational maintenance layer.

**Resolution path for flagged inconsistencies:**
- Intra-domain (two docs owned by the same agent disagree): Steward flags → domain agent resolves
- Cross-domain (docs owned by different agents disagree): Steward flags → both agents review → your human lead arbitrates if they disagree
- Unowned (infrastructure-level): Steward resolves directly

---

## @unit #document-access @ sha256:6bc5c92dbd79c125b497c35a6c88f5257913263b559f610306984985adf0ba9b
## Document Access

This is a generated identity member (`designerpunk-civitas-system-overview.md`) — never MCP-served, always loaded in full into every agent's context. No query is needed to access it. If you need to point to a specific part of it, use an in-document § reference (e.g., this doc's § "The Three-Layer Boundary" or § "Relationship to Rosetta and Stemma"), not an MCP call.
## @unit #governance-processes @ sha256:48af3eb551057bd0d40cb4379bdb9f1e0a8953447545978ab8973de5e7651bd4
## Governance Processes

Civitas governance processes are documented in Thurgood's prompt as operational responsibilities. Key processes:

- **Steering doc lifecycle**: creation (metadata requirements) → review (monthly health check) → update (event-driven triggers) → deprecation (ballot measure with rationale)
- **MCP health monitoring**: index health, content drift detection, tool availability — monthly cadence + post-spec events
- **Agent prompt currency**: prompt-to-steering alignment, Agent Directory consistency — post-modification verification
- **Governance tooling adoption**: ensuring scripts and automation remain active after the spec that created them completes

For detailed process documentation, see your Thurgood agent's charter (its Civitas Steward mode).

---

