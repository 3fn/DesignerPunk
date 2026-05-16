# Design Critique Integration (Impeccable)

> **DEPRECATED (2026-05-16):** This spec is subsumed by Spec 107 (Design Language Context for AI-Driven Interface Creation). All critique capabilities originally scoped here are delivered through the Impeccable skill adaptation in Spec 107. See `.kiro/specs/107-design-language-context/` for the active spec.

**Date**: 2026-05-04
**Purpose**: Integrate design critique capabilities into the DesignerPunk ecosystem, leveraging Impeccable's anti-pattern detection and design reference system with system-aware filtering
**Organization**: spec-guide
**Scope**: 100-design-critique-integration
**Status**: Design outline — pending review

---

## Problem Statement

DesignerPunk provides excellent *systematic consistency* — tokens ensure correct values, components ensure correct structure, contracts ensure correct behavior. But the ecosystem has no *aesthetic feedback loop*. No part of the system currently says "this layout feels cramped," "this color combination lacks contrast hierarchy," or "this animation timing feels dated."

Teams that adopt DesignerPunk get:
- ✅ Token system (Rosetta) — correct values
- ✅ Component library (Stemma) — correct structure
- ✅ Governance (Civitas) — correct process
- ✅ Figma MCP — design extraction
- ✅ Console MCP — design push
- ❌ Design validation — "is this implementation *good*?"

The missing piece is the feedback loop: extract → implement → **validate** → iterate. Without it, teams can use DesignerPunk's tokens and components correctly while still producing aesthetically poor results (cramped spacing, weak hierarchy, monotonous rhythm, inaccessible contrast).

[Impeccable](https://github.com/pbakaus/impeccable) (25k stars, Apache 2.0) provides 27 deterministic anti-pattern rules, 7 domain reference files, and a CLI for design quality detection. It solves the "AI slop" problem at the output layer. Integrating it into DesignerPunk — filtered through our token system — would give teams system-aware design critique as part of the developer experience.

---

## Objectives

1. **Evaluate Impeccable's rules against DesignerPunk's token system**: Determine which of the 27 rules are universally valid, which are already prevented by correct token usage, and which conflict with DesignerPunk's design philosophy.

2. **Design a system-aware critique capability**: Define how design critique works when it knows about the consuming team's token system — rules that are irrelevant (already handled by tokens) get suppressed, rules that are relevant get enhanced with token-specific guidance.

3. **Determine the integration surface**: Where does this live? Application MCP tool? CLI command? Agent skill? Some combination?

4. **Define the developer experience**: What does "get design feedback" look like for a team using DesignerPunk? How does it fit into the extract → implement → validate → iterate workflow?

---

## Scope

### In Scope

- Evaluation of Impeccable's 27 deterministic rules against DesignerPunk's token families
- Design of a system-aware critique layer (Impeccable rules + token system awareness)
- Integration surface design (Application MCP, CLI, agent skills, or combination)
- Developer experience design for the feedback loop
- Relationship to existing MCPs (Figma Console, Application, Product)
- How this ships as part of `@designerpunk/core`

### Out of Scope

- Implementing the full integration (this is a design outline, not implementation)
- Modifying Impeccable's source code (we consume it, not fork it)
- Creating a new AI agent (capability added to existing agents, not a new agent)
- iOS/Android critique (Impeccable is web-focused; cross-platform critique is a future concern)

---

## Key Questions

### Q1: Rule Compatibility

Impeccable's 27 rules include opinions that may conflict with DesignerPunk:

| Rule Category | Example | Potential Conflict |
|---------------|---------|-------------------|
| Font bans | "Don't use Inter, Arial, system defaults" | DesignerPunk is font-agnostic — a team's typography tokens might legitimately specify Inter |
| Color opinions | "Always tint neutrals, never pure black/gray" | DesignerPunk's color tokens may include pure neutrals by design |
| Motion opinions | "Don't use bounce/elastic easing" | DesignerPunk's motion tokens include spring easing for specific use cases |
| Spacing opinions | "Don't cram padding" | DesignerPunk's spacing tokens define the valid values — if used correctly, spacing is by definition correct |

**Question**: How do we reconcile Impeccable's taste with DesignerPunk's system? Options:
- A) Override: DesignerPunk token system always wins. If your tokens define Inter, the "don't use Inter" rule is suppressed.
- B) Warn: Flag the conflict but let the team decide. "Your typography tokens use Inter — Impeccable recommends against this. Consider whether this is a deliberate brand choice."
- C) Layer: Separate "universal rules" (accessibility, readability) from "taste rules" (font choice, easing preference). Apply universal rules always; apply taste rules only when no token system overrides them.

### Q2: Integration Surface

| Option | Pros | Cons |
|--------|------|------|
| **Application MCP tool** (`validate_aesthetics`) | Programmatic, available to all agents, fits existing MCP pattern | Needs rendered HTML/CSS to analyze; components are source code |
| **CLI command** (`npx designerpunk critique`) | Runs in CI, deterministic, no LLM needed | Only works on web output; needs build step first |
| **Agent skill** (loaded by Leonardo/platform agents) | Immediate feedback during implementation, no build step | Non-deterministic (LLM-interpreted), not CI-friendly |
| **Combination** | Best of all worlds | More integration surface to maintain |

### Q3: What Gets Critiqued?

- Component demos (the HTML pages in `demos/`)? 
- Generated platform output (CSS custom properties)?
- Product screens (implemented by platform agents)?
- Figma designs (via Figma MCP extraction)?
- All of the above at different stages?

### Q4: Shipping Model

How does this ship with `@designerpunk/core`?
- Impeccable as a dependency (`"impeccable": "^3.0"` in package.json)?
- Impeccable's rules vendored/adapted into DesignerPunk's own critique system?
- Impeccable as an optional peer dependency?
- Just the skill files, not the CLI?

---

## Proposed Architecture

### The System-Aware Critique Layer

```
┌─────────────────────────────────────────────────┐
│           DesignerPunk Critique Layer            │
├─────────────────────────────────────────────────┤
│                                                 │
│  Impeccable Rules (27)                          │
│       ↓ filtered by                             │
│  Token System Awareness                         │
│  (suppress rules that tokens already handle)    │
│       ↓ enhanced by                             │
│  DesignerPunk-Specific Rules                    │
│  (token misuse, semantic-first violations,      │
│   component composition anti-patterns)          │
│       ↓ produces                                │
│  System-Aware Critique Report                   │
│                                                 │
└─────────────────────────────────────────────────┘
```

The critique layer has three sources:
1. **Impeccable's universal rules** — accessibility, readability, visual quality (always apply)
2. **Impeccable's taste rules** — font choice, easing preference, color warmth (apply unless token system overrides)
3. **DesignerPunk-specific rules** — token misuse detection, semantic-first violations, component composition anti-patterns (always apply, unique to DesignerPunk)

### Integration Points

```
Developer Workflow:

  Figma Design ──→ Figma MCP (extract) ──→ Screen Spec
       │                                        │
       ↓                                        ↓
  [critique design]                    [critique spec]
       │                                        │
       ↓                                        ↓
  Implementation ──→ Platform Agents ──→ Rendered Output
                                                │
                                                ↓
                                       [critique output]
                                                │
                                                ↓
                                       Iterate / Ship
```

Three critique points in the workflow:
1. **Critique design** (Figma extraction) — early feedback before implementation
2. **Critique spec** (Leonardo's screen spec) — feedback on the plan
3. **Critique output** (rendered web page) — feedback on the result

---

## Relationship to Existing Systems

| System | Relationship |
|--------|-------------|
| **Application MCP** | Natural home for a `critique` or `validate_aesthetics` tool. Already serves component guidance and assembly validation. |
| **Figma Console MCP** | Critique could run on extracted Figma designs before implementation begins. |
| **Product MCP** | Product-specific brand rules could extend the critique layer (e.g., "our brand uses bounce easing deliberately"). |
| **Rosetta (tokens)** | Token system provides the override layer — if tokens define a value, the corresponding Impeccable rule is suppressed or softened. |
| **Stemma (components)** | Component composition rules could be added as DesignerPunk-specific critique rules. |
| **Civitas (governance)** | Critique results could feed into governance health checks — "are our demos following our own design principles?" |

---

## Risks and Counter-Arguments

### Risk: Opinionated conflicts alienate teams

**Concern:** A team installs DesignerPunk and immediately gets told their font choice is wrong. That's a bad first experience.

**Mitigation:** Option C (layered rules). Universal rules (accessibility, readability) always apply. Taste rules only apply when no token system override exists. First-run experience is helpful, not judgmental.

### Risk: Web-only limitation

**Concern:** Impeccable only analyzes HTML/CSS. DesignerPunk is True Native (web + iOS + Android). The critique only covers one-third of the platform story.

**Counter:** Web is the most common development target and the easiest to analyze statically. iOS/Android critique is a future extension, not a blocker for web-first value. And many of the rules (spacing, hierarchy, contrast) are platform-agnostic principles even if the detection is web-specific.

### Risk: Maintenance burden of a vendored dependency

**Concern:** If we vendor Impeccable's rules, we take on maintenance. If we depend on it, we're coupled to their release cycle.

**Mitigation:** Use as a dependency with version pinning. Impeccable is Apache 2.0 and actively maintained (25k stars, regular releases). If it goes unmaintained, we can fork the rules at that point.

### Risk: Over-engineering a simple problem

**Concern:** Maybe the right answer is just "drop the skill files into product agents" (Option A from earlier discussion) and call it done. The full MCP integration might be solving a problem that doesn't exist yet.

**Counter:** This is a real risk. The design outline should produce a phased approach: start with skill integration (immediate value, zero infrastructure), then evolve to MCP/CLI integration if the skill proves valuable in practice. Don't build the full system before validating the premise.

---

## Proposed Phasing

**Phase 1: Skill Integration (immediate)**
- Add Impeccable's `.kiro/skills/impeccable` to the DesignerPunk ecosystem
- Leonardo and platform agents get design critique vocabulary
- Zero infrastructure cost, immediate value
- Validate: does the critique actually improve output quality?

**Phase 2: System-Aware Filtering (if Phase 1 proves valuable)**
- Build the token-system-aware filter layer
- Suppress rules that tokens already handle
- Add DesignerPunk-specific rules (token misuse, semantic-first violations)
- Ship as part of Application MCP or CLI

**Phase 3: Full Workflow Integration (if Phase 2 proves valuable)**
- `npx designerpunk critique` CLI command
- Application MCP `validate_aesthetics` tool
- Integration with Figma MCP for pre-implementation critique
- CI-friendly deterministic checks

---

## Open Questions for Review

1. Should this be a numbered spec (100) or an exploratory investigation first?
2. Which agents should get the skill in Phase 1? Leonardo only? All product agents? Platform agents?
3. Is the "token system overrides Impeccable" model the right reconciliation approach?
4. Does this affect the `@designerpunk/core` package.json (new dependency)?
5. Who owns this capability? Leonardo (product architecture)? Lina (component quality)? A shared concern?
