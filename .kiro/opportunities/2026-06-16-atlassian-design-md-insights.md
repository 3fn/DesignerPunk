# Roadmap Opportunities: Atlassian DESIGN.md Insights

**Date**: 2026-06-16
**Source**: Atlassian blog post "Atlassian's DESIGN.md is here: what we learned testing portable design context in practice"
**Discovered During**: Governance review conversation with Peter
**Category**: Product Consumption, Measurement, Developer Experience

---

## Context

Atlassian published benchmarks comparing their ADS MCP server, AI skills, DESIGN.md (Google's portable format), and no-context approaches for generating production UI. Key findings:
- MCP: 3.75M tokens avg, 5m 1s, 35.1 turns
- DESIGN.md: 7.21M tokens avg, 6m 46s, 45.3 turns (92% more tokens than MCP)
- DESIGN.md led agents to re-implement components instead of importing them
- Lint rules provide zero-token-cost guardrails complementing MCP

These findings validate DesignerPunk's MCP architecture while exposing gaps in our validation story and consumption model.

---

## Opportunity 1: Empirical Measurement Framework

**Value**: High
**Effort**: Medium
**Category**: Product Consumption

**Description**: Build measurement into the product agent workflow to quantify MCP efficiency. Track tokens consumed, query patterns, time to completion, and outcome quality when Leonardo specs screens and platform agents implement them.

**What This Enables**:
- Evidence-based claims about DesignerPunk's efficiency vs alternatives
- Identifying which MCP tools are underutilized or over-queried
- Data-driven refinement of progressive disclosure hierarchy
- Credible story for external adoption ("here are the receipts")

**Potential Approach**: Lightweight logging in MCP tool handlers during product builds. Periodic analysis, not real-time infrastructure.

**Trigger**: First real product build cycle at meaningful scale (multiple screens, multiple platform agents).

---

## Opportunity 2: ESLint Plugin for Zero-Token Guardrails

**Value**: High
**Effort**: Medium
**Category**: Developer Experience

**Description**: Ship `@3fn/eslint-plugin-designerpunk` that enforces token usage, component import patterns, and naming conventions at lint time — zero token cost. Agents get immediate feedback during generation without consuming MCP context.

**What This Enables**:
- Catches token bypass (hard-coded values) without MCP queries
- Enforces component imports over re-implementation
- Validates CSS logical property usage (Web Authoring Standards)
- Provides positive feedback loop — agents correct themselves on next turn

**Potential Rules**:
- `no-hardcoded-spacing`: Flag literal px/pt/dp values where tokens exist
- `no-hardcoded-color`: Flag hex/rgb values where tokens exist
- `prefer-component-import`: Flag patterns that look like component re-implementation
- `logical-properties-only`: Flag physical CSS properties (left, right, top, bottom)
- `token-consumption-only`: Flag `.dp` suffix on token consumption (Android)

**Trigger**: Product agents begin implementing screens and token/component drift becomes observable.

---

## Opportunity 3: Usage-First MCP Response Mode

**Value**: High
**Effort**: Low-Medium
**Category**: Product Consumption

**Description**: Audit whether `get_component_full` serves product agents well or inadvertently encourages re-implementation by providing too much internal detail upfront. Consider a usage-first response hierarchy where import patterns and basic usage come before contracts and internals.

**What This Enables**:
- Product agents get `import` + `<button-cta label="..." variant="primary">` first
- Detailed contracts/tokens available via deeper progressive disclosure
- Reduces risk of agents rebuilding components from spec descriptions
- Distinguishes system agent needs (internals) from product agent needs (usage)

**Potential Approach**:
- `get_component_summary` already exists — verify it leads with usage, not architecture
- Consider whether `find_components` responses should include a `quickUsage` field
- Evaluate whether the Integration Guide's import patterns are discoverable via MCP

**Trigger**: Testable now — audit current MCP responses against Atlassian's "import vs rebuild" finding.

---

## Opportunity 4: Proactive Context Preamble

**Value**: Medium
**Effort**: Low
**Category**: Developer Experience

**Description**: A brief, high-signal preamble that ships with the package — not a full DESIGN.md, but a concise "working with DesignerPunk" context block that product agents receive without querying. Answers "what do I need to know before generating UI in this system?"

**What This Enables**:
- Agents that don't know what to query get baseline context
- Reduces the "unknown unknowns" problem with progressive disclosure
- Complements MCP (not replaces) — the preamble points to MCP for details
- Could be the agent prompt preamble in `.kiro/agents/` or a README-level context

**Potential Content** (~500 tokens):
- "This project uses DesignerPunk. Import components from @3fn/core, not re-implement."
- "All spacing/color/typography uses CSS custom properties from tokens.css"
- "Query the Application MCP for component selection guidance"
- "Never hard-code values that tokens provide"

**Trigger**: Low effort — could be added to integration guide or agent prompt templates now.

---

## Opportunity 5: Portable Context Fallback (DESIGN.md equivalent)

**Value**: Low (currently)
**Effort**: Medium
**Category**: Portability

**Description**: A generated portable artifact for environments that can't run MCP — playgrounds, unfamiliar tools, quick prototypes. Not a full DESIGN.md (which they proved is wasteful in production), but a focused "use DesignerPunk components and tokens in this environment" guide.

**What This Enables**:
- Developers can try DesignerPunk without MCP infrastructure
- Prototype environments produce on-brand output
- Reduces adoption barrier for evaluation

**Why Deferred**:
- Our primary consumption model (npm package + MCP) works for our target environments
- DESIGN.md's limitations (all-at-once, encourages re-implementation) apply here too
- Only worth building if actual adoption friction surfaces from real users

**Trigger**: A product developer reports they can't use DesignerPunk because their environment doesn't support MCP, AND the package's generated CSS/Swift/Kotlin files aren't sufficient.

---

## Opportunity 6: Consumer vs Builder MCP Audience Separation

**Value**: Medium
**Effort**: Medium
**Category**: Architecture

**Description**: Evaluate whether the Application MCP should distinguish between "system builder" queries (Ada, Lina need internals) and "product consumer" queries (Leonardo, Sparky need usage patterns). Currently both audiences hit the same tools with the same response depth.

**What This Enables**:
- Product agents get leaner, usage-focused responses by default
- System agents can request full internals when needed
- Reduces risk of product agents consuming governance context they don't need
- Aligns with Atlassian's insight that level of abstraction matters

**Potential Approach**:
- Add optional `audience` parameter to tools: `get_component_full({ name: "...", audience: "consumer" })`
- Or: ship a separate "consumer mode" tool set that wraps the full tools with filtered output
- Or: rely on the existing progressive disclosure (catalog → summary → full) and ensure summary is consumer-focused

**Trigger**: Product agent consumption reveals that current MCP responses produce re-implementation behavior or unnecessary token spend on governance details.

---

## Priority Assessment

| # | Opportunity | Value | Effort | Trigger Status |
|---|------------|-------|--------|---------------|
| 3 | Usage-First MCP Response Mode | High | Low-Med | **Testable now** |
| 4 | Proactive Context Preamble | Medium | Low | **Doable now** |
| 1 | Empirical Measurement Framework | High | Medium | Awaiting product build |
| 2 | ESLint Plugin | High | Medium | Awaiting product implementation |
| 6 | Consumer vs Builder Separation | Medium | Medium | Awaiting product consumption data |
| 5 | Portable Context Fallback | Low | Medium | Awaiting adoption friction signal |

---

## Related

- [MCP-Evolution-Roadmap.md](.kiro/steering/MCP-Evolution-Roadmap.md) — existing known gaps
- [DesignerPunk-Integration-Guide.md](.kiro/steering/DesignerPunk-Integration-Guide.md) — current consumer model
- [MCP-Relationship-Model.md](.kiro/steering/MCP-Relationship-Model.md) — three-MCP boundaries
