# M0a Process Scaffolding

**Date**: 2026-04-05
**Author**: Stacy
**Status**: Draft — review by triad (Leonardo + Stacy + Thurgood) before M0a starts
**Purpose**: Lightweight process infrastructure for M0a product development

---

## What This Covers

This document defines three things that don't exist yet but are needed before M0a starts:

1. **Product completion doc template** — how we document finished product work (distinct from spec-level completion docs)
2. **Milestone review template** — how we run the formal lessons synthesis at M0a completion
3. **Lesson routing categories** — how we classify and route what we learn

Everything else (spec-level completion docs, implementation reports, handoff protocol) already exists and works. This scaffolding fills the gap between spec-level documentation and milestone-level learning.

---

## 1. Product Completion Doc Template

### When to Use

After each M0a screen or flow is implemented and reviewed. This is the product-level equivalent of a spec completion doc — it captures what happened during product work, not just what was built.

### Where It Lives

`docs/roadmap/m0a/completion/[screen-name]-completion.md`

### Template

```markdown
# [Screen Name] Completion

**Date**: [date]
**Screen**: [screen name from M0a scope]
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

[Notable token selections — especially any cases where semantic tokens weren't available and primitives or hard-coded values were used]

## Deviations from Spec

[Any places where implementation differs from Leonardo's specification, with rationale. "None" is a valid answer.]

## Discoveries

[Anything learned — component gaps, metadata issues, token gaps, pattern mismatches, process friction]

## Validation

- [ ] Component and token usage reviewed by: [Stacy / Leonardo]
- [ ] Deviations from spec acknowledged by Leonardo

## Open Items

[Anything unresolved. "None" is a valid answer.]
```

### Notes

- The "Metadata Guided Correctly?" column feeds my recurring metadata accuracy audit (R1 item 9). Every component selection is a data point.
- Discoveries here feed into the milestone synthesis. Capture them as they happen — don't batch for the end.
- This template is deliberately lighter than the spec-level Tier 2/3 completion docs. Product screens are the consumer of the design system, not the system itself — the documentation depth should reflect that.

---

## 2. Milestone Review Template

### When to Use

After M0a is complete (all screens built, reviewed, and documented). This is the formal lessons synthesis that Peter confirmed he wants.

### Where It Lives

`docs/roadmap/m0a/m0a-milestone-review.md`

### Template

```markdown
# M0a Milestone Review

**Date**: [date]
**Led by**: Stacy
**Participants**: Leonardo, Stacy, Thurgood (at boundary)
**Scope**: All M0a screens and process

---

## Screens Completed

| Screen | Completion Doc | Key Findings |
|--------|---------------|--------------|
| [name] | [link] | [one-line summary of notable findings, or "Clean"] |

## Lessons — Categorized

### M0a-Specific
[Lessons that apply only to the marketing site and won't recur]
- [lesson] → [impact or action]

### General Ecosystem
[Lessons that apply to any product consuming DesignerPunk — these route to system agents]
- [lesson] → [route to: Ada / Lina / Thurgood] — [Tier 3 request if needed]

### Process
[Lessons about how the team worked — coordination, documentation, review cadence]
- [lesson] → [proposed adjustment or "working as designed"]

### Pattern Candidates
[Recurring patterns worth systematizing — new components, tokens, experience patterns]
- [pattern] → [candidate for: component / token / experience pattern]

## Metadata Accuracy Summary

| Total Selections | Guided Correctly | Guided Incorrectly | Accuracy |
|-----------------|-----------------|--------------------|---------| 
| [n] | [n] | [n] | [%] |

[List any incorrect guidance with details and routing]

## Package Consumption Findings

[How did the `@designerpunk/core` package work in practice? Friction points, missing exports, import issues]

## Process Assessment

[Did the process scaffolding work? What needs to change for M0b?]
- Completion doc template: [worked / needs adjustment — what]
- Review cadence: [worked / needs adjustment — what]
- Lesson routing: [worked / needs adjustment — what]
- Agent coordination: [worked / needs adjustment — what]

## Recommendations for M0b

[Specific changes to make before M0b starts, informed by M0a experience]
```

### Notes

- This template is the forcing function that turns screen-level discoveries into routed actions. Without it, lessons stay in individual completion docs and never get synthesized.
- The metadata accuracy summary is a first — we've never had real product usage data on whether the Application MCP guides correct selections. This is valuable regardless of the numbers.
- The "Process Assessment" section is where this scaffolding evaluates itself. If the template was too heavy or too light, we adjust for M0b.

---

## 3. Lesson Routing Categories

Every lesson captured during M0a gets one of these classifications:

| Category | Definition | Routes To | Example |
|----------|-----------|-----------|---------|
| **M0a-specific** | Applies only to the marketing site | Stays in M0a docs | "The hero section needed a custom CSS grid that doesn't map to any layout template" |
| **General ecosystem** | Applies to any product consuming DesignerPunk | System agent via Tier 3 request | "Container-Base's `whenToUse` doesn't mention content-heavy marketing layouts" |
| **Process** | About how the team works | Stacy proposes adjustment, Peter decides | "Completion docs took longer than the implementation — template is too heavy" |
| **Pattern candidate** | Recurring pattern worth systematizing | Flagged for system agents, Peter decides priority | "Every screen needed a section-with-heading-and-content pattern — candidate for experience pattern" |

### Routing Rules

- **M0a-specific**: No action needed beyond documentation. These inform M0a but don't propagate.
- **General ecosystem**: Stacy drafts a Tier 3 System Escalation Request per the Product Handoff Protocol. Peter approves routing. Thurgood triages to the appropriate system agent.
- **Process**: Stacy recommends the adjustment in the milestone review. Peter decides whether to adopt it. If adopted, the relevant process doc gets updated.
- **Pattern candidate**: Captured in the milestone review. Peter decides whether to prioritize. If prioritized, becomes a spec for the appropriate system agent.

### When to Classify

Classify as you go, not at the end. Each screen completion doc should tag its discoveries with a category. The milestone review consolidates and validates the classifications — it shouldn't be the first time anyone thinks about routing.

---

## Directory Structure for M0a

```
docs/roadmap/m0a/
├── completion/
│   ├── home-landing-completion.md
│   ├── about-philosophy-completion.md
│   ├── component-showcase-completion.md
│   ├── getting-started-completion.md
│   └── contact-community-completion.md
└── m0a-milestone-review.md
```

This sits alongside the existing roadmap docs, not inside `.kiro/specs/`. M0a is product work, not a design system spec. The separation is intentional — product completion docs live in `docs/roadmap/`, system spec completion docs live in `.kiro/specs/`.

---

## What This Doesn't Cover

- **Spec-level completion docs** — existing Completion Documentation Guide handles this
- **Implementation reports** — existing Product Handoff Protocol handles this
- **Cross-platform parity reviews** — dormant until M0b activates multiple platforms
- **M0b process scaffolding** — will be drafted after M0a, informed by M0a experience

---

## Open Questions

- [@THURGOOD] Does the directory structure (`docs/roadmap/m0a/`) align with your file organization standards, or should product completion docs live elsewhere?
- [@LEONARDO] Is the product completion doc template the right depth for your needs? Too heavy? Too light?
- [@THURGOOD] The milestone review template includes a "Process Assessment" section where this scaffolding evaluates itself. Any concerns about self-referential process docs?
