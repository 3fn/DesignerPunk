---
inclusion: manual
name: MCP-Evolution-Roadmap
description: Known gaps in the MCP knowledge layer and trigger conditions for when to address them. Query when working on MCP-related specs or after product agent consumption reveals friction.
---

# MCP Evolution Roadmap

**Date**: 2026-03-11
**Last Reviewed**: 2026-06-23
**Purpose**: Capture known MCP knowledge gaps, their assessed priority, and the conditions that trigger action
**Organization**: process-standard
**Scope**: cross-project
**Layer**: 2
**Relevant Tasks**: mcp-development, spec-planning, agent-architecture

---

## Why This Document Exists

Strategic gaps are easy to identify in conversation and easy to forget between specs. This document prevents that amnesia. It captures gaps that are known but intentionally deferred, with explicit trigger conditions for when they become worth addressing.

**When to query this doc:**
- Starting a spec that touches the Application MCP, Docs MCP, or product agent layer
- After a product agent build cycle (e.g., WrKing Class) reveals friction
- During spec sequencing discussions

---

## Current State (Post-071)

- Docs MCP: Steering docs, token governance, component standards — queryable via progressive disclosure
- Application MCP: 10 tools, 9 family guidance YAMLs, 9 experience patterns, 34 components indexed
- Product MCP: Not yet built (Spec 070 design outline exists)

---

## Known Gaps

### Gap 1: Escalation and Degradation Paths

**What's missing**: Components have flat `alternatives` in component-meta.yaml, but no directional distinction between "escalate to a more complex component" and "degrade to a simpler fallback." An agent hitting a component gap (e.g., Chip-Choice doesn't exist) has no explicit fallback chain.

**Where it lives**: Application MCP — family guidance YAMLs, alongside `selectionRules`

**Priority**: Medium. Component gaps are real (Chip-Choice, Textarea, Search). Fallback guidance is currently implicit in `whenNotToUse` but not structured for agent consumption.

**Trigger**: A product agent build reveals repeated friction around component gaps — the agent doesn't know what to use instead and makes poor substitutions.

**Possible approach**: Add `escalatesTo` and `degradesTo` fields to family guidance YAML schema. Lightweight, optional, same pattern as `composesWithFamilies`.

---

### Gap 2: Context Signals (Density, Modality, Brand)

**What's missing**: No structured way to express that the same component should use different tokens or configurations based on context — density (compact/default/comfortable), modality (desktop/mobile/car), or brand. Currently, platform divergence is handled architecturally (True Native build-time separation) and density is handled via size props (standard/condensed), but neither is formalized as queryable metadata.

**Where it lives**: Layered. Data at Docs MCP (component metadata), resolution at Application MCP (context-aware queries), decision at Product MCP (product agent knows its context).

**Priority**: Low. DesignerPunk serves one brand, one product. Density is handled by size variants. Platform is handled by architecture. These signals become valuable when serving multiple products with different density/brand needs.

**Trigger**: A second product consumes DesignerPunk with different density or brand requirements, OR WrKing Class needs the same component to behave differently across form factors in ways that size props don't cover.

**Possible approach**: Context signal metadata on components, with Application MCP resolving the right token set for a given context. Significant architectural work — don't start without a real consumer need.

---

### Gap 3: Component Sentiment / Intent Valence

**What's missing**: No formal tag for the emotional or action weight of a component variant (e.g., destructive, warning, positive). This is currently encoded implicitly in variant names and selection rule rationale.

**Where it lives**: Docs MCP — component-meta.yaml or schema

**Priority**: Low. Variant logic and selection rules already convey intent. A separate sentiment field adds maintenance surface for marginal signal.

**Trigger**: A product agent consistently picks the wrong emotional weight for actions — e.g., uses a primary button for a destructive action because nothing in the metadata signals "this is destructive."

**Possible approach**: Optional `sentiment` or `intent` tag on variant-level selection rules. Minimal schema addition.

---

### Gap 4: Observability and Consumption Feedback

**What's missing**: No feedback loop from product agent consumption back to the design system. When an agent overrides a discouraged pattern, selects a component, or hits a gap, that information is lost. There's no way to know adoption rates, override frequency, or where guidance fails.

**Where it lives**: Product MCP — requires a consumer that reports telemetry back to the system layer.

**Priority**: Low now, high long-term. This is the difference between a design system that guesses what's useful and one that knows. But it requires a product agent consuming the system at scale before there's anything to observe.

**Trigger**: A product agent is actively building with the MCP and the team wants to understand which guidance is effective vs. ignored. Specifically: if discouraged pattern overrides exceed ~30%, that's a signal the guidance is wrong or the component has a gap.

**Possible approach**: Product agent logs consumption events (component selected, pattern used, override triggered). Periodic analysis — not real-time infrastructure. Start manual (review agent logs), automate only if the manual process proves valuable.

---

### Gap 5: Agent Review Cycle Friction

**What's missing**: No structured mechanism for multi-agent review of shared artifacts. The current workflow requires Peter to act as a message bus: agent A produces a document → Peter tells agent B to review → agent B writes a findings file → Peter tells agent A findings exist → agent A incorporates. For Spec 077 formalization, this produced 3 review cycles × 2 reviewers = 6 handoffs across requirements, design, and tasks documents.

**Pain points observed:**
- Human acts as router between agents who can't communicate directly
- Each agent swap requires rebuilding context from conversation summaries and findings files
- Findings files are full-document reviews when targeted section feedback would suffice
- Review cycles are the dominant time cost of spec formalization (the writing is fast; the feedback loop is slow)

**What works well:**
- Domain boundaries prevent agents from overstepping (Ada doesn't write component tests, Lina doesn't create tokens)
- Findings files create a durable audit trail of review decisions
- Resolution tables in spec documents capture what changed and why
- The async model allows deep, focused review rather than shallow real-time responses

**Where it lives**: Process layer — may be steering doc conventions, workflow changes, tooling, or some combination. Not yet determined.

**Priority**: Medium. Friction is recurring and predictable (every spec formalization hits it), but the current process works and produces quality output. The cost is human time, not quality.

**Trigger**: Spec formalization consistently takes 3+ review cycles, OR Peter identifies the routing overhead as a bottleneck to spec throughput.

**Possible approaches (not yet evaluated):**
- Process: Standardized review protocol with predictable file locations and section-level targeting
- Process: Agents proactively check for review requests at known paths
- Tooling: Multi-agent session for decision-making conversations (Party Mode concept from BMAD Method)
- Tooling: Lightweight orchestration for review routing
- Steering: Conventions that reduce the need for cross-agent review (e.g., clearer domain boundaries in spec templates)
- Steering: Agent-Agent Collaboration Framework — analogous to the AI-Human Collaboration Framework (AI-Collaboration-Framework.md), but governing inter-agent interactions. The human framework codifies candor, counter-arguments, and disagreement protocols for agent↔human. An agent↔agent framework would codify review conventions, findings file format, domain handoff protocols, and escalation paths. Currently these patterns exist as organic practice (findings files, `[ADA]` markers, resolution tables) but aren't formalized.

---

### Gap 6: Behavioral Discovery via Contracts

**What's missing**: The Application MCP supports component discovery by purpose (family guidance, selection rules) and structure (schema, inheritance), but not by behavior. With contracts reframed as core Stemma (Spec 078), the Concept Catalog (112 concepts, 10 categories) provides a structured behavioral vocabulary — but it's not queryable through the MCP.

**What it would unlock:**
- Behavioral search: "which components guarantee keyboard navigation?" → all components with `accessibility_keyboard_navigation` contracts
- Behavioral gap analysis: "I need a component with drag support" → no component has `interaction_drag`, surfacing a discoverable gap
- Composition validation: "do all 4 components in my form guarantee focus management?" → behavioral compatibility check at the composition level
- Accessibility auditing: "which components lack screen reader contracts?" → systematic coverage visibility

**Where it lives**: Application MCP — contracts indexed alongside schema and component-meta, queryable by concept category or specific concept name.

**Priority**: Low. Requires Spec 078 completion (contracts as core Stemma, catalog validation, auto-discovery). Current consumers of contract data are implementing agents and test infrastructure, not product agents. Value increases when product agents are actively composing UIs and need behavioral guarantees.

**Trigger**: A product agent build cycle where component selection requires behavioral guarantees (e.g., accessibility compliance verification), and the agent can't discover which components meet the requirement without manually reading contracts.yaml files.

**Possible approach**: Extend the Application MCP's component indexing to read contracts.yaml alongside schema.yaml and component-meta.yaml. Add a `queryByContract()` or `queryByBehavior()` tool that accepts concept names or categories and returns matching components. The Concept Catalog provides the vocabulary; the contracts.yaml files provide the per-component data.

---

## Deferred from Spec 071

These were identified in the 071 design outline and explicitly deferred:

| Gap | Status | Reference |
|-----|--------|-----------|
| Token query capability | Deferred — needs Ada's design input | 071 design-outline Gap 2 |
| Negative guidance system | Partially addressed via `discouragedPatterns` | 071 design-outline Gap 3 |
| Cross-layer synthesis | Deferred — respect system/product boundary | 071 design-outline Gap 4 |

---

## Delivery-Layer Hardening (Spec 121) — Actioned

Spec 121 ("MCP Delivery-Layer Hardening") actioned a set of delivery-layer findings surfaced by the portability + consumer-install dry-runs. Recorded here so the roadmap reflects what shipped (distinct from the future-gap and deferred sections above).

### Findings actioned

| Finding | Gap | Resolution | Status |
|---------|-----|------------|--------|
| F9 | `get_token_details` did not chain-resolve semantic/component tokens to a terminal value (primitives carry `value`; semantics carry only `primitiveReferences`) | Added the resolved-value triple (`resolvedValue` / `resolvedUnitType` / `resolutionDepth`), reusing the product MCP's `TokenRefResolver` contract verbatim — additive, `platforms{}` unchanged | ✅ Task 1 |
| F11 + F12 | Discovery by concept/keyword absent across both MCPs — `find_components` matched structured taxonomy only; no `find_docs` | Tokenized keyword discovery on `find_components` (new optional `keyword` param; `when_to_use` now indexed) + new `find_docs` concept-search tool — both additive | ✅ Tasks 2 + 3 |
| F10 | `get_documentation_map()` errored at ~78K chars (over the MCP token limit), breaking progressive-disclosure discovery | Superseded by `find_docs` paginated list/catalog mode (bounded pages, ~6K chars vs ~78K) | ✅ Task 3 (see Supersede below) |
| F1 + F3 | `get_section` under-retrieves stub/sibling sections; ambiguous for non-unique headings | Section addressing by path+parent / stable IDs + summary-first rule | ⏳ Task 6 — planned, not yet shipped |

### Supersede: `get_documentation_map` → `find_docs` (the one justified break)

121's single intentional breaking change. The map was known-unusable-at-scale (F10) and redundant once `find_docs` exists (which provides both concept-search and a paginated catalog mode). Evidence showed **zero consumer code coupling** — the only references lived in doc/config/prompt artifacts, which refresh on upgrade + `sync`. Maintaining two discovery surfaces is debt; paying the supersede cost once is cleaner.

- **Removed:** the `get_documentation_map` MCP tool; its pinned shape test was **rewritten** (explicit supersede, not a silent mutation) to target `find_docs` list mode.
- **Reference sweep (first-party):** retargeted to `find_docs` across the verified set — 5 steering docs (`00-Steering Documentation Directional Priorities`, `Component-Quick-Reference`, `DesignerPunk-Integration-Guide`, `MCP-Relationship-Model`, `component-mcp-query-guide`), the Thurgood prompt (`.kiro/agents/thurgood-prompt.md`, `.claude/agents/thurgood.md`, `product-template/agents/thurgood-prompt.md`), the two MCP `autoApprove` configs (`.kiro/settings/mcp.json`, `.claude/settings.local.json`), the Cursor rules (`.cursor/rules/designerpunk-core.mdc`), and the `.claude/agents/{ada,lina,data}.md` tool grants. The ada/lina/data grants were swept **now** rather than deferred to Spec 122's generator, because they would otherwise dangle against a removed tool. Historical spec/completion docs were left as-is (record of their era).
- **Watch (Spec 123, not 121):** if `sync` does not refresh dp-portfolio's vendored prompts/docs on upgrade, the swept consumer copies go stale — tracked in Spec 123.

### Index-freshness test approach (Decision 4)

The discovery tier-classification / recall-floor contract tests run against a **pinned fixture corpus**, plus a separate lightweight **live-smoke** check that asserts only that the named floor components/docs still exist. Rationale: testing tier classification against live metadata would couple component/doc authoring to MCP-test stability (a routine wording edit could flip a tier and break an unrelated MCP test). The pinned corpus decouples them; the live-smoke check still catches the "floor item was deleted/renamed" regression.

---

## Source

Gaps 1–4 identified during analysis of [Romina Kavcic's machine-readable components framework](https://www.linkedin.com/posts/rominakavcic_designsystem-productdesign-ai-activity-7437135540996644865-Odfd/) (2026-03-11), mapped against DesignerPunk's current MCP architecture. Content was rephrased for compliance with licensing restrictions.
