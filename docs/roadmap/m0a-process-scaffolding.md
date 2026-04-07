# M0a Process Scaffolding

**Date**: 2026-04-05
**Revised**: 2026-04-06 (v3)
**Author**: Stacy
**Status**: Draft v3 — added validation tiers, @ mention protocol, and doc layer clarification. Review by triad before Phase 1 specs are finalized.
**Purpose**: Lightweight process infrastructure for M0a product development

---

## What This Covers

M0a is two phases with different structures:

- **Phase 1** (~4-6 weeks): Package DesignerPunk as `@designerpunk/core` — seven infrastructure workstreams across system agents
- **Phase 2** (~2-3 weeks): Marketing site in a separate repo consuming the package — product screens built by product agents

This document defines:

1. **Phase 1 workstream completion template** — how we document finished infrastructure work
2. **Phase 2 product completion template** — how we document finished product screens
3. **Phase 1→2 transition checkpoint** — go/no-go assessment before product work starts
4. **Milestone review templates** — formal lessons synthesis after each phase
5. **Lesson routing categories** — how we classify and route what we learn
6. **Token usage review protocol** — how Ada reviews token selection quality
7. **Feedback protocol for roadmap docs** — @ mention scanning and stamp format (adopted from Spec Feedback Protocol)
8. **Documentation layer clarification** — how product-level docs relate to spec-level docs

Everything else (spec-level completion docs, implementation reports, handoff protocol) already exists and works. This scaffolding fills the gap between spec-level documentation and milestone-level learning.

---

## 1. Phase 1: Workstream Completion Template

### When to Use

After each Phase 1 workstream is complete. Phase 1 has seven workstreams (portable token pipeline, component library package, configurable MCP servers, theme registry, Product MCP foundation, agent configurations, token data in Application MCP). Each gets a completion doc when finished.

### Where It Lives

`docs/roadmap/m0a/phase-1/[workstream-name]-completion.md`

### Template

```markdown
# [Workstream Name] Completion

**Date**: [date]
**Workstream**: [name from Phase 1 scope]
**Type**: [Setup | Implementation | Architecture]
**Owner**: [agent name]
**Reviewed by**: [agent(s) who reviewed]

---

## What Was Built

[Brief description — what was created, what it enables]

## Artifacts

- `path/to/artifact` — [what it is]

## Integration Points

[How this workstream connects to other workstreams or Phase 2]

## Deviations from Plan

[Any places where implementation differs from the North Star's workstream description, with rationale. "None" is a valid answer.]

## Discoveries

[Anything learned — architectural surprises, scope adjustments, dependencies not anticipated]

## Validation

- [ ] Workstream deliverables verified by: [owner]
- [ ] Integration with dependent workstreams confirmed by: [dependent agent(s)]

## Open Items

[Anything unresolved or deferred to Phase 2. "None" is a valid answer.]
```

### Notes

- **Type classification** follows the same system as spec tasks (from Process-Spec-Planning): Setup (structural/packaging work → lighter documentation), Implementation (functional code → standard documentation), Architecture (design decisions with system-wide impact → comprehensive documentation with counter-arguments and trade-offs). Workstream classification:
  - Component library package → Setup
  - Agent configurations → Setup
  - Configurable MCP servers → Implementation
  - Token data in Application MCP → Implementation
  - Portable token pipeline → Architecture
  - Theme registry → Architecture
  - Product MCP foundation → Architecture
- Phase 1 workstreams are infrastructure, not product screens. The template reflects that — no component selections or metadata accuracy tracking. Those are Phase 2 concerns.
- The "Integration Points" section matters because workstreams have dependencies (e.g., theme registry must work before marketing theme can be created in Phase 2). Capturing these explicitly prevents Phase 2 surprises.
- Discoveries here feed into the Phase 1 milestone review. Classify them as you go.

---

## 2. Phase 2: Product Completion Template

### When to Use

After each Phase 2 screen is implemented and reviewed. This captures what happened during product work — component selections, token usage, metadata accuracy.

### Where It Lives

`docs/roadmap/m0a/phase-2/[screen-name]-completion.md`

### Template

```markdown
# [Screen Name] Completion

**Date**: [date]
**Screen**: [screen name from Phase 2 scope]
**Platform**: Web (M0a is web-only)
**Spec by**: Leonardo
**Built by**: Sparky
**Reviewed by**: Stacy

---

## What Was Built

[Brief description — what the screen does, which components it uses]

## Component Selections

| Component | Purpose | Metadata Guided Correctly? |
|-----------|---------|---------------------------|
| [name] | [what it does on this screen] | ✅ Yes / ❌ No — [what was wrong] |

## Token Usage

| Token Used | Purpose | Semantic Correct? |
|-----------|---------|-------------------|
| [token name] | [what it's used for] | ✅ Yes / ⚠️ Primitive used — [reason] / ❌ Hard-coded — [reason] |

[Note any cases where semantic tokens weren't available and primitives or hard-coded values were used]

## Deviations from Spec

[Any places where implementation differs from Leonardo's specification, with rationale. "None" is a valid answer.]

## Discoveries

[Anything learned — component gaps, metadata issues, token gaps, pattern mismatches, process friction]

## Validation

- [ ] Component and token usage reviewed by: [Stacy / Leonardo]
- [ ] Deviations from spec acknowledged by Leonardo
- [ ] Token semantic correctness reviewed by Ada (first screen only — see Token Usage Review Protocol)

## Open Items

[Anything unresolved. "None" is a valid answer.]
```

### Notes

- The "Metadata Guided Correctly?" column feeds my recurring metadata accuracy audit. Every component selection is a data point.
- The "Token Usage" table is new in v2. It captures token selections with enough detail for Ada's review and for the milestone synthesis.
- Discoveries feed into the Phase 2 milestone review. Classify them as you go — don't batch for the end.
- This template is deliberately lighter than spec-level Tier 2/3 completion docs. Product screens are the consumer of the design system, not the system itself.

---

## 3. Phase 1→2 Transition Checkpoint

### When to Use

After Phase 1 is complete and before Phase 2 begins. This is a formal go/no-go assessment.

### Where It Lives

`docs/roadmap/m0a/phase-1-to-2-transition.md`

### Template

```markdown
# M0a Phase 1→2 Transition

**Date**: [date]
**Led by**: Stacy
**Decision**: [Go / No-Go / Go with conditions]

---

## Phase 1 Completion Status

| Workstream | Status | Completion Doc |
|-----------|--------|---------------|
| Portable token pipeline | [Complete / Partial — what's missing] | [link] |
| Component library package | [status] | [link] |
| Configurable MCP servers | [status] | [link] |
| Theme registry | [status] | [link] |
| Product MCP foundation | [status] | [link] |
| Agent configurations | [status] | [link] |
| Token data in Application MCP | [status] | [link] |

## Transition Dependencies

| Dependency | Status | Notes |
|-----------|--------|-------|
| Leo + Ada theme registry session | [Done / Pending] | Leo understands "create a theme in product repo" workflow |
| Lina Shadow DOM smoke test | [Done / Pending] | Nested shadow boundaries inherit themed custom properties |
| Sparky build tooling input | [Done / Pending] | Project scaffolding preferences for marketing site repo |

## Package Published?

- [ ] `@designerpunk/core` published to GitHub Packages
- [ ] Version: [version]
- [ ] Sparky has confirmed install works in a fresh project

## Go/No-Go Assessment

[Are all workstreams complete? Are transition dependencies resolved? Any blocking issues?]

## Conditions (if Go with conditions)

[What's incomplete but not blocking, with plan to resolve during Phase 2]
```

### Notes

- This checkpoint exists because Phase 2 can't start cleanly if Phase 1 deliverables have issues. The transition dependencies (Leo+Ada session, Lina smoke test, Sparky build tooling) are the riskiest moment — if any surface problems, Phase 2 scope or approach may need adjustment.
- "Go with conditions" is a valid outcome. Not everything has to be perfect — but the conditions should be explicit and tracked.

---

## 4. Milestone Review Templates

### Phase 1 Review

After Phase 1 is complete (all workstreams finished, package published). Focuses on infrastructure lessons.

**Where it lives**: `docs/roadmap/m0a/phase-1-milestone-review.md`

```markdown
# M0a Phase 1 Milestone Review

**Date**: [date]
**Led by**: Stacy
**Participants**: Ada, Lina, Thurgood, Leonardo (at boundary), Stacy
**Scope**: All Phase 1 workstreams

---

## Workstreams Completed

| Workstream | Completion Doc | Key Findings |
|-----------|---------------|--------------|
| [name] | [link] | [one-line summary, or "Clean"] |

## Lessons — Categorized

### M0a-Specific
[Lessons specific to packaging DesignerPunk that won't recur]
- [lesson] → [impact or action]

### General Ecosystem
[Lessons that apply to the ecosystem broadly — route to system agents]
- [lesson] → [route to: Ada / Lina / Thurgood] — [Tier 3 request if needed]

### Process
[Lessons about how the team worked during infrastructure development]
- [lesson] → [proposed adjustment or "working as designed"]

## Package Quality Assessment

[Is the published package sound? Any known issues? Anything Sparky should watch for?]

## Process Assessment

- Workstream completion template: [worked / needs adjustment — what]
- Cross-workstream coordination: [worked / needs adjustment — what]
- Lesson routing: [worked / needs adjustment — what]

## Recommendations for Phase 2

[Specific changes or watch items before product work starts]
```

### Phase 2 Review

After Phase 2 is complete (all screens built, reviewed, documented). Focuses on product consumption lessons.

**Where it lives**: `docs/roadmap/m0a/phase-2-milestone-review.md`

```markdown
# M0a Phase 2 Milestone Review

**Date**: [date]
**Led by**: Stacy
**Participants**: Leonardo, Sparky, Ada (token review), Stacy, Thurgood (at boundary)
**Scope**: All Phase 2 screens and process

---

## Screens Completed

| Screen | Completion Doc | Key Findings |
|--------|---------------|--------------|
| [name] | [link] | [one-line summary, or "Clean"] |

## Lessons — Categorized

### M0a-Specific
[Lessons specific to the marketing site that won't recur]
- [lesson] → [impact or action]

### General Ecosystem
[Lessons that apply to any product consuming DesignerPunk]
- [lesson] → [route to: Ada / Lina / Thurgood] — [Tier 3 request if needed]

### Process
[Lessons about how the product team worked]
- [lesson] → [proposed adjustment or "working as designed"]

### Pattern Candidates
[Recurring patterns worth systematizing]
- [pattern] → [candidate for: component / token / experience pattern]

## Metadata Accuracy Summary

| Total Selections | Guided Correctly | Guided Incorrectly | Accuracy |
|-----------------|-----------------|--------------------|---------| 
| [n] | [n] | [n] | [%] |

[List any incorrect guidance with details and routing]

## Token Usage Summary

| Total Token Refs | Semantic | Primitive | Hard-coded | Semantic Rate |
|-----------------|----------|-----------|------------|---------------|
| [n] | [n] | [n] | [n] | [%] |

[Ada's assessment of semantic correctness across all screens]

## Package Consumption Findings

[How did `@designerpunk/core` work in practice? Friction points, missing exports, import issues, theme workflow experience]

## Process Assessment

- Product completion template: [worked / needs adjustment — what]
- Token usage review protocol: [worked / needs adjustment — what]
- Review cadence: [worked / needs adjustment — what]
- Agent coordination: [worked / needs adjustment — what]

## Recommendations for M0b

[Specific changes to make before M0b starts, informed by M0a experience]
```

---

## 5. Lesson Routing Categories

Every lesson captured during M0a gets one of these classifications:

| Category | Definition | Routes To | Example |
|----------|-----------|-----------|---------|
| **M0a-specific** | Applies only to M0a (packaging or marketing site) | Stays in M0a docs | "The hero section needed a custom CSS grid that doesn't map to any layout template" |
| **General ecosystem** | Applies to any product consuming DesignerPunk | System agent via Tier 3 request | "Container-Base's `whenToUse` doesn't mention content-heavy marketing layouts" |
| **Process** | About how the team works | Stacy proposes adjustment, Peter decides | "Workstream completion docs took longer than the work — template is too heavy" |
| **Pattern candidate** | Recurring pattern worth systematizing | Flagged for system agents, Peter decides priority | "Every screen needed a section-with-heading-and-content pattern — candidate for experience pattern" |

### Routing Rules

- **M0a-specific**: No action needed beyond documentation. These inform M0a but don't propagate.
- **General ecosystem**: Stacy drafts a Tier 3 System Escalation Request per the Product Handoff Protocol. Peter approves routing. Thurgood triages to the appropriate system agent.
- **Process**: Stacy recommends the adjustment in the milestone review. Peter decides whether to adopt it. If adopted, the relevant process doc gets updated.
- **Pattern candidate**: Captured in the milestone review. Peter decides whether to prioritize. If prioritized, becomes a spec for the appropriate system agent.

### When to Classify

Classify as you go, not at the end. Each completion doc (workstream or screen) should tag its discoveries with a category. The milestone reviews consolidate and validate the classifications.

---

## 6. Token Usage Review Protocol

### Why This Exists

The Application MCP's token data (Phase 1 workstream 7) enables Leonardo to query and select tokens independently. But data lookup doesn't guarantee semantic correctness — choosing `space600` when `tapAreaRecommended` is the right semantic token, or reaching for primitives when semantic tokens exist. Ada's expertise catches these patterns.

### Approach: First Screen Deep, Then Synthesis

| When | What | Who | Depth |
|------|------|-----|-------|
| **First screen spec** | Ada reviews Leo's token selections | Ada | Deep — every token choice assessed for semantic correctness |
| **Subsequent screens** | Leo selects tokens using Application MCP + patterns established on first screen | Leo + Stacy tracking | Light — Stacy notes token usage in completion docs |
| **Phase 2 milestone review** | Ada reviews accumulated token usage across all screens | Ada | Synthesis — patterns, not individual choices |

### First Screen Review

When Leonardo specs the first Phase 2 screen (likely Home/Landing), Ada reviews the token selections before implementation begins. This establishes the pattern:

- Are semantic tokens used where they exist?
- Are primitives used only where no semantic token covers the use case?
- Are any hard-coded values present, and are they justified?
- Are tokens used for their intended purpose, not just their value?

Ada's review produces a brief assessment: "Token selections are semantically correct" or "These selections should change: [list with rationale]." Leonardo adjusts the spec if needed. This sets the precedent for subsequent screens.

### Why Not Every Screen?

Per-screen Ada review creates a bottleneck — Leo can't finalize specs until Ada reviews. For a ~5-screen marketing site, the overhead is manageable but the precedent is bad. M0b will have more screens across three platforms. The first-screen-deep approach establishes correct patterns early, then trusts Leo (with Application MCP data) to follow them. The synthesis review catches any drift.

### What Stacy Tracks

In each product completion doc, the "Token Usage" table captures:
- Which tokens were used and for what purpose
- Whether each was semantic, primitive, or hard-coded
- Rationale for any non-semantic choices

This data feeds Ada's synthesis review at the Phase 2 milestone. If the synthesis reveals a high rate of incorrect semantic choices, we tighten to per-screen Ada review for M0b.

---

## Directory Structure for M0a

```
docs/roadmap/m0a/
├── phase-1/
│   ├── portable-pipeline-completion.md
│   ├── component-package-completion.md
│   ├── configurable-mcp-completion.md
│   ├── theme-registry-completion.md
│   ├── product-mcp-foundation-completion.md
│   ├── agent-configs-completion.md
│   └── token-data-mcp-completion.md
├── phase-2/
│   ├── home-landing-completion.md
│   ├── about-philosophy-completion.md
│   ├── component-showcase-completion.md
│   ├── getting-started-completion.md
│   └── contact-community-completion.md
├── phase-1-milestone-review.md
├── phase-1-to-2-transition.md
└── phase-2-milestone-review.md
```

This sits alongside the existing roadmap docs, not inside `.kiro/specs/`. M0a is product work, not a design system spec. Phase 1 workstream completion docs live in `phase-1/`, Phase 2 screen completion docs live in `phase-2/`.

---

## 7. Feedback Protocol for Roadmap Docs

### Adopted From

The Spec Feedback Protocol (`.kiro/steering/Spec-Feedback-Protocol.md`) governs multi-agent feedback during spec formalization. Two elements transfer directly to M0a roadmap-level documents (North Star feedback, pre-launch feedback, milestone reviews):

### Stamp Format

Every feedback entry uses the stamp format from the Spec Feedback Protocol:

```
[AGENT_NAME R#]
```

Examples: `[STACY R1]`, `[LEONARDO R2]`, `[ADA R1]`. Round numbers are per-document section. We're already using this — this formalizes it.

### Mandatory @ Mention Scanning

**Before writing your own feedback, scan and respond to all `[@YOUR_NAME]` mentions directed at you that you haven't yet addressed.**

This is a pre-step, not optional. Unanswered @ mentions block shared understanding. The Spec Feedback Protocol makes this mandatory for spec docs; we adopt the same rule for roadmap docs.

This addresses a real friction point: Leonardo's R1 in the North Star feedback had questions for Thurgood that took time to get addressed. Explicit scanning expectations prevent dropped questions.

### What Doesn't Transfer

The sequential formalization gate (requirements → feedback → design → feedback → tasks → feedback) is too heavy for M0a. Product screens don't need three rounds of gated feedback. Roadmap docs use a lighter model: write → request review → incorporate → proceed.

---

## 8. Documentation Layer Clarification

### Two Layers, Different Purposes

Phase 1 workstreams produce documentation at two layers:

| Layer | Location | Purpose | Audience |
|-------|----------|---------|----------|
| **Spec-level** | `.kiro/specs/[spec-name]/completion/` + `docs/specs/[spec-name]/` | Standard completion docs and summary docs per the Completion Documentation Guide | Internal knowledge preservation + release detection |
| **Product-level** | `docs/roadmap/m0a/phase-1/` | Cross-workstream view — integration points, discoveries, lessons | M0a process governance, milestone reviews |

Both layers exist. They serve different purposes and don't duplicate each other.

### How They Relate

- **Spec-level docs** capture what was built within a single workstream's spec. They follow the existing three-tier validation and documentation system (Setup → Tier 1, Implementation → Tier 2, Architecture → Tier 3). They trigger release detection via summary docs.
- **Product-level docs** capture how the workstream fits into M0a as a whole — integration with other workstreams, discoveries that affect Phase 2, lessons that route to other agents. They feed the milestone review.

### Example

The "Theme Registry" workstream (Architecture type) would produce:
- `.kiro/specs/[theme-registry-spec]/completion/task-1-completion.md` — detailed spec completion doc (Tier 3)
- `docs/specs/[theme-registry-spec]/task-1-summary.md` — summary doc for release detection
- `docs/roadmap/m0a/phase-1/theme-registry-completion.md` — product-level doc capturing how the registry integrates with the portable pipeline, what Ada learned that affects Phase 2 theme creation, and any discoveries for the milestone review

The first two follow existing process. The third is what this scaffolding adds.

### Phase 2 Is Simpler

Phase 2 screens don't have specs in `.kiro/specs/` — they're product work, not design system specs. The product-level completion docs in `docs/roadmap/m0a/phase-2/` are the primary documentation layer. Leonardo's screen specs and Sparky's implementation reports (per the Product Handoff Protocol) provide the working detail.

---

## What This Doesn't Cover

- **Spec-level completion docs** — existing Completion Documentation Guide handles this (Phase 1 workstreams will have their own specs with standard completion docs in `.kiro/specs/`)
- **Implementation reports** — existing Product Handoff Protocol handles this
- **Cross-platform parity reviews** — dormant until M0b activates multiple platforms
- **M0b process scaffolding** — will be drafted after M0a, informed by M0a experience

---

## Open Questions

- [@THURGOOD] Does the directory structure (`docs/roadmap/m0a/phase-1/`, `phase-2/`) align with your file organization standards? Phase 1 workstreams will also have spec-level completion docs in `.kiro/specs/` — is the two-layer relationship (section 8) clear enough, or does it create confusion?
- [@THURGOOD] The workstream type classifications (section 1 notes) — do you agree with the Setup/Implementation/Architecture assignments? Particularly: is "Configurable MCP servers" Implementation or Architecture? It involves design decisions about configuration interfaces but the scope is bounded.
- [@LEONARDO] Is the product completion doc template the right depth for your needs? The token usage table is new — too heavy?
- [@ADA] Does the token usage review protocol (first screen deep, then synthesis) give you enough data to assess semantic correctness? Or do you need a different structure?
- [@THURGOOD] The Phase 1→2 transition checkpoint is new. Does this overlap with any existing process, or is it filling a genuine gap?
- [@THURGOOD] The @ mention scanning rule (section 7) — should this be added to the Spec Feedback Protocol as a general principle, or kept scoped to roadmap docs?
