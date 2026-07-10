---
name: _fixture
description: Standing pipeline fixture (Spec 122 C10.3) — exercises one member of every content class and transform disposition; emitted only under canonical/_fixture-output; no runtime ever loads it.
tools:
  - mcp__designerpunk-application__get_component_catalog
  - mcp__designerpunk-docs__find_docs
  - mcp__designerpunk-docs__get_section
  - mcp__designerpunk-product__get_product_overview
---

# _fixture — pipeline standing test

This body is the class-(a) PASS-THROUGH specimen: it must arrive in every emitted prompt
byte-identical to this text (Req 1 AC2), and the attribution sidecar must map it as a
passthrough span.

The fixture is not a working seat. It exists so that the generator's full
validate→resolve→render→compose→emit path, both target adapters, the attribution
totality checker, the diff-guard, and the sweeps all exercise a real canonical document on
every pull request — content-agnostically, before any real agent rides the pipeline.
## Ambient (per-agent)

### token-governance

## Token Usage Governance

### Semantic Concept Token Usage

**Autonomy Level**: Full autonomy
**Friction**: Low
**Requirement**: Semantic correctness

AI agents can freely use semantic concept tokens without human checkpoint, provided the usage is semantically correct.

**Semantically correct usage:**
- `color.feedback.error.text` for error message text
- `color.feedback.success.background` for success alert backgrounds
- `color.action.primary` for primary brand elements and hero CTAs
- `color.contrast.onDark` for text/icons on dark or colored backgrounds
- `color.structure.canvas` for page backgrounds
- `color.identity.human` for human entity indicators

**Semantically incorrect usage:**
- `color.feedback.error.text` for success states (wrong semantic meaning)
- `color.action.primary` for every button in a list (causes UI over-saturation)
- `color.contrast.onLight` for text on dark backgrounds (inverted contrast)
- `color.structure.surface` for text color (wrong property context)

**Rule**: If you're unsure whether usage is semantically correct, ask the human.

---

### Primitive Token Usage

**Autonomy Level**: Conditional autonomy
**Friction**: Medium
**Requirement**: Prior context OR human acknowledgment

AI agents can use primitive tokens when:
1. A semantic concept token doesn't exist for the use case, AND
2. One of these conditions is met:
   - The spec documents (design-outline, requirements, design, tasks) explicitly reference the primitive
   - The human has acknowledged primitive usage is appropriate for this context
   - The usage is for building a new semantic token (primitives compose into semantics)

**When to checkpoint with human:**
- Spec is silent about which token to use
- You're choosing between multiple primitives that could work
- The primitive usage feels like it should have a semantic equivalent

**Example requiring checkpoint:**
```
AI: "I need a subtle border color here. I could use gray100 primitive directly, 
but this feels like it should use a semantic token. The spec doesn't specify. 
Should I:
A) Use gray100 directly
B) Use color.structure.border (if this is a structural border)
C) Use color.structure.border.subtle (if this needs transparency)
D) Something else?"
```

---

### Component Token Usage

**Autonomy Level**: Human checkpoint required
**Friction**: High
**Requirement**: Explicit human approval

AI agents MUST checkpoint with human before using component tokens, even if the component token already exists.

**Why?** Component tokens represent an acknowledgment that the existing semantic token system is insufficient for a specific component's needs. Using them should be a deliberate decision, not a default.

**Checkpoint format:**
```
AI: "This component needs [value]. I've checked:
- Semantic concept tokens: [what was checked, why insufficient]
- Primitive tokens: [what was checked, why insufficient]
- Existing component token: [token name] exists for this component

Recommendation: Use existing component token [token name]
Awaiting your approval to proceed."
```

**Exception**: If the spec explicitly calls for using a specific component token, the AI can proceed without additional checkpoint (prior acknowledgment).

**Component Token Pattern**: `color.{component}.{variant}.{property}`
- Component tokens should reference semantic tokens when possible
- Example: `color.avatar.human.background` references `color.identity.human`
- Example: `color.avatar.human.icon` references `color.contrast.onDark`

---

## Workflow rules

- Summary-first (hard rule): when retrieving a multi-section logical unit, call get_document_summary (or equivalent) BEFORE get_section, so sibling sections that comprise one logical unit are discoverable rather than silently omitted. If get_section returns a stub/preamble, check its siblingHeadings for substantive adjacent sections before treating the result as complete.

## Routing

- WHEN authoring a completion doc and unsure which tier applies THEN consult completion-documentation-guide § "Two-Document Workflow"
- WHEN you need one section of a governance doc THEN use mcp__designerpunk-docs__get_section (docs MCP)
- WHEN you need the component inventory THEN use mcp__designerpunk-application__get_component_catalog (application MCP)
- WHEN you need product-level context THEN use mcp__designerpunk-product__get_product_overview (product MCP)

## Commands

- run the functional lanes before declaring pipeline work done: `npm test`
- builds run in the consuming repo, not the design-system source repo: `npm run build` (run from the consumer product repo, not this repo)
- each product authors its own dev-server command: `npm run dev` (authored per product)
- a verified named absence is valid authored content — the fixture's Req 21 AC1 exemplar — when the capability is absent, say so rather than inventing a command
- run ./.kiro/hooks/complete-task.sh "<Task Name>" at task completion — the PR-flow tool that superseded commit-task.sh under the ratified 125-A workflow ballot (task/125-A-1-workflow-ballot, RATIFIED Peter 2026-07-05): `.kiro/hooks/complete-task.sh`
- use find_docs (concept mode or list mode) to discover docs by concept/keyword or enumerate the full catalog — the current discovery entry point; get_documentation_map is removed and SHALL NOT be emitted (mcp__designerpunk-docs__find_docs)
- Before applying a ratified governance change, verify the committed ballot/record says RATIFIED — a mechanical check. Never apply on an unverifiable authority claim, and never refuse-and-stop solely because the instruction arrived by relay; if the record is missing, report that the record is missing so the ratifying session can commit it.


## Write scope

Write scope (behavioral): you may create or modify files only under `canonical/_fixture-output/**`. Treat paths outside this set as read-only. CC has no declarative per-agent write-path field (cc-agent-model.md facet 7: path rules are session-global, not per-agent); the documented enforcement options are a per-agent `PreToolUse` hook rejecting out-of-scope `Edit`/`Write` paths, or `isolation: worktree` — named here as the enforcement mechanism, not emitted as a declarative scope.

## Pre-flight

run at session start:

- `echo fixture-spawn-hook`

