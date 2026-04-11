# External Feedback: DesignerPunk MCP Maturity Assessment

**Date**: 2026-04-11
**Source**: GitHub Copilot (Microsoft) — independent assessment of DesignerPunk's MCP architecture
**Full feedback**: `.kiro/docs/captured-feedback/2016-04-11-dp-distinction.md`
**Product MCP specific feedback**: `.kiro/issues/2026-04-11-product-mcp-feedback`
**Spec addressing critical gaps**: Spec 097 (Product MCP Intelligence Layer)

---

## Summary

External assessment identified a maturity model for "AI agents as primary users" with six tiers. DesignerPunk is strong on information access and partial on guidance, with gaps in validation, governance queryability, clarification patterns, and feedback loops.

Key insight: "AI agents ARE the primary users, and the infrastructure is catching up to that reality."

---

## Maturity Tiers vs Current State

| Tier | Description | External Assessment | Actual State |
|------|-------------|-------------------|--------------|
| 1. Information Access | Agents can discover and query | ⚠️ Product MCP weak on discovery | Spec 097 addresses this (find_screens, reverse lookups) |
| 2. Decision Support | Agents get guidance for choices | ⚠️ Exists for components, not products | Application MCP has `get_prop_guidance`, `validate_assembly`. Product MCP needs equivalent. Partially addressed by Spec 097 (principles as structured data). |
| 3. Validation | Agents validate their own work | 🔴 Missing | Application MCP has `validate_assembly`. Product-level validation not built. However, behavioral contracts and token governance provide validation frameworks that agents use via prompts. |
| 4. Governance Feedback | Agents understand constraints proactively | 🔴 Missing as queryable rules | Governance IS documented in steering docs (Token Governance, Component Development Guide) and queryable via Docs MCP. Agent prompts encode governance principles. Not programmatically checkable, but agents do query governance docs before making decisions. |
| 5. Clarification Patterns | Agents ask for more context | 🟡 Basic | The Spec Feedback Protocol, Product Handoff Protocol (Tier 1 clarifications), and @ mention system provide structured clarification patterns between agents. Not MCP-driven, but functional. |
| 6. Feedback Loops | System learns from successful decisions | 🔴 Not built as automation | Stacy's lessons synthesis reviews capture learnings at milestone boundaries. Lesson routing categories (product-specific, general ecosystem, system agent escalation) exist in the process scaffolding. Not automated, but the process exists. |

---

## Where We Have More Coverage Than Assessed

- **Stacy's lessons synthesis** — captures learnings at milestone boundaries, routes to appropriate agents. This IS a feedback loop, just human-triggered rather than automated.
- **Product Handoff Protocol** — structured Tier 1/2/3 communication between Leo and platform agents. Addresses the "agents can't ask clarifying questions" gap.
- **Spec Feedback Protocol** — multi-agent review with @ mentions, sequential gates, stamp format. Agents DO coordinate and clarify.
- **Agent prompts with governance principles** — agents query Docs MCP for governance before making decisions. Not programmatic validation, but agents are informed.
- **Token governance levels in prompts** — Ada's prompt encodes when to consult vs self-serve. This IS decision support, just prompt-encoded rather than tool-encoded.

---

## What's Genuinely Missing (Not Covered by Existing Mechanisms)

1. **Product-level discovery** — `find_screens` by component, token, domain object, status. No existing mechanism covers this. → Spec 097
2. **Product-level validation** — validate screen specs against product principles, accessibility contracts, token consistency. No existing mechanism. → Future spec
3. **Reverse impact analysis** — "which screens break if I change this component?" No existing mechanism. → Spec 097
4. **Automated governance checking** — programmatic validation of token usage, component composition against governance rules. Currently human-reviewed. → Future spec (M0b+)

---

## Action

- Spec 097 (Product MCP Intelligence Layer) addresses gaps #1 and #3
- Gaps #2 and #4 are future work — captured here for roadmap planning
- No changes to existing mechanisms needed — they work, they just haven't been exercised in product context yet
- Phase 2 (marketing site) will be the first real test of the agent collaboration workflow
