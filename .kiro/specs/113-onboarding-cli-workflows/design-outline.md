# Design Outline: Onboarding CLI Workflows

**Spec**: 113 - Onboarding CLI Workflows
**Date**: 2026-06-01
**Updated**: 2026-06-02
**Status**: Design Outline (Refining)
**Agent**: TBD

---

## Problem Statement

DesignerPunk's adoption is limited to users intimately familiar with the system. Designers — the most interested audience — see DesignerPunk as a path to building things themselves (AI agents as their development team). But the current entry points are developer-oriented and don't teach users how to operate the system.

The barrier isn't technical capability — the agents handle that. The barrier is **learning how to direct the system** in language a designer understands.

---

## Design Philosophy

### CLI-first, GUI-later

The CLI defines the correct abstractions (discrete operations, clear inputs/outputs, testable workflows). A GUI layers over it as an access layer — skin, not rewrite.

Prior art: Git → GitHub, Docker CLI → Docker Desktop, Terraform → Terraform Cloud.

### Teach by playing, not by setup

The analogy is video game onboarding, not software installation. Users learn the system by *using* it for their first real task — not by reading documentation or configuring settings. The onboarding wizard captures their intent and routes them into the spec process, teaching them how DesignerPunk works by guiding them through their first change.

### Healthy friction

Every customization goes through the spec process. The wizard never produces token output directly. It captures intent and produces a design outline. This teaches users:
- How to articulate design intent
- How agents operate
- How changes propagate through the system
- How to validate results

The spec process is not busywork — it's the user learning to operate the system. If the wizard solves problems *for* them, they never learn how the system solves problems.

---

## The Wizard: `npx designerpunk configure`

### What it is

An intake form + process introduction. Walks through primitive token categories, communicates DesignerPunk's default approach for each, and captures customization intent. Routes to agent-guided spec execution for any changes.

### What it is NOT

- Not a token generator
- Not an inline editor
- Not a shortcut around the spec process

### Decision Tree Per Category

```
Category: [e.g., Color]

"Here's DesignerPunk's default approach to color:
 [Brief description of the mathematical color system, what it produces]"

→ Do you want to Default or Customize?

  [Default] → "Great. Moving on to the next category."

  [Customize] → "Would you like to:
    A. Align to the approach and update specific values? (Simpler)
       e.g., Keep the mathematical relationships, use your brand color as the seed.

    B. Change the approach as well? (More involved)
       e.g., Use a completely different color theory or scale structure.

    Note: Changing the approach means teaching the system your new rules.
    We'll guide you through it — it just takes a bit more conversation
    so everything stays aligned."

    [A: Values only] → Capture intent → Produce design outline → Route to Ada
    [B: Approach change] → Capture intent → Produce design outline → Route to Ada
```

Both custom paths produce the same artifact type (design outline) and go through the same process (spec → agent execution). The difference is scope and complexity of the resulting spec.

### Categories Walked Through

| Category | What's communicated | Default approach (brief) |
|----------|-------------------|--------------------------|
| Color | Palette structure, primitive scale, semantic mapping | Mathematical derivation from primary, 100-500 lightness scale |
| Typography | Font families, type scale, grid alignment | Rajdhani/Figtree/Commit Mono, modular scale, 4px sub-grid |
| Spacing | Spatial system, grid, inset/grouped/related patterns | 8px baseline grid, mathematical progression |
| Radius | Corner rounding scale | Progressive scale tied to spacing |
| Motion | Timing, easing, platform conventions | Expo-out web/Android, spring iOS, semantic durations |
| Elevation | Shadow/depth system | Surface lightness progression, tinted shadows |

### Output Per Customization

Each "Customize" choice produces:
```
.kiro/specs/custom-[category]/design-outline.md
```

Pre-populated with:
- Stated intent (what the user wants to change)
- Current default (what they're changing from)
- Scope (values only vs approach change)
- Identified agent (typically Ada for token work)
- Next steps ("Begin this spec with Ada to implement your changes")

### Re-runnability

"You can re-run `npx designerpunk configure` anytime. Categories you've already customized will show their current state. Categories at default can be customized later. There's no penalty for choosing defaults now and changing your mind."

---

## Relationship to `init`

```
npx designerpunk init
  → Name, abbreviation (existing)
  → Scaffold files (existing)
  → Generate defaults (existing)
  → "Let's set up your visual language..."
  → Wizard runs (configure)

npx designerpunk configure
  → Same wizard, re-runnable independently
  → Shows current state per category
  → "Which would you like to change?"
```

`init` includes the wizard on first run. `configure` is the standalone re-entry point.

---

## What About Semantics?

The wizard focuses on **primitives** — the foundational values. Semantic tokens (how primitives are mapped to purposes) are a downstream conversation that happens during spec execution.

Example: User picks a new primary brand color (primitive). During spec execution, Ada explains: "This color is mapped to action states, feedback states, and contrast pairs. Want to review those semantic mappings or trust the mathematical defaults?"

The wizard doesn't try to handle semantic complexity. It captures the seed; the spec process handles the growth.

---

## Future: Status and Screen Commands

These remain conceptual but fit the same philosophy:

| Command | Purpose | How it teaches |
|---------|---------|---------------|
| `status` | "What's the state of my project?" | Shows system relationships, pending specs, built screens |
| `screen` | "Build me this" | Captures intent → produces spec → routes to Leonardo |

Both produce specs, not direct output. Both teach the process by using it.

---

## Dependencies

- **Spec 111 (Sync Command)** — foundational CLI pattern
- **Spec 112 (OKLCH)** — may change color category if shipping first
- **Product MCP** — configure output may feed product context

---

## Open Threads

1. **How much do we communicate about the mathematical relationships in each category?** Enough to understand the trade-off of changing them, or just "here's what it does"?

2. **What does "capture intent" look like practically?** Free-text description? Structured prompts? Upload a mood board?

3. **How do we handle the "I just want to try it" user who defaults everything?** They're done in 60 seconds — is there a "what's next?" that points them toward building something?

4. **How does `configure` know current state?** Reads config files? Checks for existing customization specs? Both?

5. **The GUI version of this wizard.** When we layer GUI, this becomes a visual setup flow — color pickers, font previews, spacing visualizers. The CLI is the logic; the GUI adds the sensory experience designers expect.
