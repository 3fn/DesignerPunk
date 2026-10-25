---
id: token-governance
inclusion: manual
name: Token-Governance
aliases: how do i pick the right token, picking the right token selection, choose which token to use
description: Token governance framework — selection matrix, usage autonomy levels, creation governance, prior acknowledgment, and decision examples. Load when making token selection decisions, evaluating token usage governance, or creating new tokens.
---

# Token Governance Guide

**Date**: 2026-01-05
**Purpose**: Comprehensive governance for token selection, usage, and creation decisions
**Organization**: process-standard
**Scope**: cross-project
**Layer**: 2
**Relevant Tasks**: component-development, token-development, spec-planning
**Last Reviewed**: 2026-05-06

---

## Overview

This document defines the governance framework for token selection, usage, and creation in the DesignerPunk design system. It establishes clear autonomy levels, friction requirements, and human checkpoint triggers to ensure architectural integrity while enabling efficient development.

**Core Principle**: High friction is intentional. Every token in the system should exist for a deliberate reason, not because an AI agent took a shortcut.

**Document Structure**:
- [Token Selection Matrix](#token-selection-matrix) — Which token type to use
- [Token Usage Governance](#token-usage-governance) — Autonomy levels for using existing tokens
- [Token Creation Governance](#token-creation-governance) — Human review requirements for creating tokens
- [Prior Acknowledgment](#prior-acknowledgment) — How specs can pre-authorize decisions
- [Decision Examples](#decision-examples) — Real-world scenarios and correct decisions
- [Token Creation Guides](#token-creation-guides) — How to create each token type (after human approval)

---

## Token Selection Matrix

When you need a token value, take the first step that applies. This is the one token-selection order: Core Goals points here and does not restate it. *(Amended 2026-10-25 by ballot 2026-10-25-token-selection-order-one-rule, item 1; prior text at `1eced6cd5`.)*

1. **The component you are building has its own component token for this property** → use it **with no checkpoint** (§ "Component Token Usage"). A component token is named for its component (`buttonicon.inset.medium` belongs to Button-Icon), so this step applies only inside that component. A token that belongs to another component is not a selection step: using one goes to step 4.
2. **A semantic token exists for the use** → use it. Verify it is semantically correct (§ "Semantic Concept Token Usage").
3. **A primitive token exists** → use it, with prior context or the human's acknowledgment (§ "Primitive Token Usage").
4. **Nothing above fits** → **STOP. Human checkpoint.** Present the value needed, what you checked, and your recommendation (§ "Creation Checkpoint Format"). The human decides one of:
   - a new component token, built by the Component Token Construction Rule (§ "Token Creation Governance");
   - a new primitive token;
   - a new semantic token;
   - as the last resort, a hard-coded value. If the human chooses it, tell the user where the value is and why no token fits.

**Key Insight**: Steps 1–3 USE existing tokens. Step 4 CREATES a token, or uses a hard-coded value as the last resort, and only the human decides it. These have different governance requirements.

### Concept-First Selection Guidance

The DesignerPunk token system follows the **Nathan Curtis concept-first naming model**. When selecting tokens:

1. **Think concept first**: What semantic meaning does this color represent?
   - Feedback states → `color.feedback.*` (success, error, warning, info, select)
   - Entity identity → `color.identity.*` (human, agent)
   - Interactive emphasis → `color.action.*` (primary, secondary)
   - Content contrast → `color.contrast.*` (onLight, onDark)
   - Visual structure → `color.structure.*` (canvas, surface, border)

2. **Then consider property**: Does the concept need property disambiguation?
   - Feedback tokens include property: `color.feedback.error.text`, `color.feedback.error.background`
   - Identity tokens ARE the color: `color.identity.human` (no property needed)
   - Action tokens ARE the color: `color.action.primary` (no property needed)

3. **Component colors reference semantic tokens**: A component's color choices should reference semantic tokens, not primitives directly.
   - Avatar's human background → references `color.identity.human`
   - Avatar's human icon → references `color.contrast.onDark`
   - These live as `AvatarColorTokens` constants in `avatar.tokens.ts`, outside the token index; they are not component-token keys.

---

## Token Usage Governance

A use-time checkpoint applies only where that use was not reviewed when the token was made. *(Amended 2026-10-25 by ballot 2026-10-25-token-selection-order-one-rule, item 1; prior text at `1eced6cd5`.)*

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

**Autonomy Level**: Full autonomy inside the owning component
**Friction**: Low
**Requirement**: The token belongs to the component being built and is for this property

Inside the component a token belongs to, AI agents use that component token for the property it was made for without a checkpoint, as step 1 of § "Token Selection Matrix". A token that belongs to another component, or the owner's token for another property, is not a selection step: using one needs the step-4 checkpoint, in this format:

**Why?** A component token exists because a human decided, when it was created, that the semantic tokens did not meet this component's need (§ "Token Creation Governance"). Using it inside its own component carries out that decision; a checkpoint would ask the same question again.

**Checkpoint format (another component's token, or the owner's token for another property):**
```
AI: "This component needs [value]. I've checked:
- Semantic concept tokens: [what was checked, why insufficient]
- Primitive tokens: [what was checked, why insufficient]
- Another component's token, or the owner's token for another property: [token name] belongs to [component]

Recommendation: [use it / create a token for this component / new primitive / new semantic]
Awaiting your decision before proceeding."
```

**Component Token Pattern**: `<component>.<property>…`, with no family segment (component names are lowercased in the index)
- Component tokens are declared with `defineComponentTokens`, which takes numeric families only (spacing, sizing, borderWidth); there is no color family
- Component tokens should reference primitives or the family's pattern, e.g. `buttonicon.inset.medium` references `space125`
- Example: `avatar.size.md` references `size500`
- A component's colors reference semantic tokens directly (Avatar's human background uses `color.identity.human`, its icon `color.contrast.onDark`) and are not component tokens in the index

---

## Token Creation Governance

### Universal Rule: Human Review Required

**Creating ANY token (semantic, primitive, or component) requires human review.**

This is non-negotiable. Token creation is an architectural decision that affects the entire design system. AI agents should never autonomously create tokens.

### Component Token Construction Rule

Component tokens must either reference an existing primitive token OR conform to how that primitive token family's values are defined. Never introduce arbitrary values at the component level that don't align with the underlying token family's value system. *(Moved verbatim from Core Goals § "Development Practices" by ballot 2026-10-25-token-selection-order-one-rule, item 1; prior home `.kiro/steering/core-goals.md` L73–74 at `1eced6cd5`.)*

### Creation Checkpoint Format

When an AI agent determines a new token is needed:

```
AI: "No existing token meets this requirement.

NEEDED: [specific value and context]

CHECKED:
- This component's own component tokens: [what was checked]
- Semantic tokens: [what was checked]
- Primitive tokens: [what was checked]

ANALYSIS:
- Is this a one-off need? [yes/no and reasoning]
- Does this fit mathematical principles? [yes/no and reasoning]
- Could this become a reusable pattern? [yes/no and reasoning]

RECOMMENDATION: [component token / new primitive / new semantic]
REASONING: [why this recommendation]

Awaiting your decision before proceeding."
```

### Human Decision Points

The human should consider:

1. **Scope**: Is this need isolated to one component, or will it appear elsewhere?
2. **Mathematical fit**: Does the value align with the token family's mathematical foundation?
3. **Semantic meaning**: Is there a clear, reusable semantic concept here?
4. **System impact**: What's the maintenance cost of adding this token?

### Creation Decision Matrix

| Scenario | Likely Decision | Reasoning |
|----------|-----------------|-----------|
| One-off value, doesn't fit math | Component token | Scoped, doesn't pollute system |
| One-off value, fits math | Component token (maybe primitive later) | Start scoped, promote if pattern emerges |
| Reusable pattern, fits math | Primitive + semantic | System-level addition justified |
| Reusable pattern, doesn't fit math | Needs design discussion | May require rethinking the requirement |

---

### Dimension Governance

The Rosetta token system resolves across three dimensions: platform (build-time), theme (base/WCAG/custom), and mode (light/dark). Adding new dimensions — or new values within existing dimensions (e.g., a "high contrast" mode, a "compact" density dimension) — has cascading impact across the resolver pipeline, generator output, theme files, and governance documentation.

**Rule**: Adding a new mode or resolution dimension requires:
1. A formal spec (design outline → requirements → design → tasks)
2. Peter's explicit approval before implementation begins

This applies to new dimensions (e.g., density) and new values within existing dimensions (e.g., a third mode beyond light/dark).

**Rationale**: Dimensions are multiplicative. Each new dimension multiplies the resolution matrix, theme file surface, and testing burden. This is an architectural decision, not a token decision.

*Added by Spec 080 (Rosetta Mode Architecture), Decision #12.*

### Theme Registry (Spec 094)

As of Spec 094, themes are managed via a **ThemeRegistry** pattern. Products register themes in `designerpunk.config.ts` using `defineConfig()`.

**A registered theme is not applied yet.** `npx designerpunk generate` reads the config's themes and lists them as "registered, not applied yet": a theme registered in `designerpunk.config.ts` changes no generated output on any platform, and nothing checks its overrides against the token set. Whether and how registered themes are applied is Spec 129's to decide (charter scope items (i) and (vi)). Today the generator applies DesignerPunk's built-in overrides only; the last rule below says what each platform emits. *(Corrected 2026-10-23 to what the generator emits; DesignerPunk record `2026-10-03-data-theme-scope-charter-vs-generator`.)*

**Adding a new theme does NOT require a formal spec.** Themes are product-level configuration, not architectural decisions. A product developer creates a `SemanticOverrides.ts` and registers it in their config:

```typescript
import { defineConfig } from '@3fn/core/config';
import { myOverrides } from './themes/my-theme/SemanticOverrides';

export default defineConfig({
  name: 'MyProduct',
  abbreviation: 'MP',
  themes: [{ name: 'my-theme', mode: 'dark', overrides: myOverrides }],
  output: './dist/tokens'
});
```

**Theme governance rules:**
- Theme overrides reference existing semantic tokens only — `ThemeRegistry.register()` rejects an override that names an unknown semantic token. The build registers DesignerPunk's built-in themes this way; a theme in `designerpunk.config.ts` is not registered with it yet, so its overrides are not checked today
- Overrides swap primitive references, not token structure — the `SemanticOverrideMap` format is unchanged
- Theme-varying tokens are determined automatically: the registry computes the union of all overridden token names across the themes registered with it, and the iOS/Android generators add every token whose base light and dark values differ. The build registers DesignerPunk's built-in `dark` and `wcag` themes only, so today the union is over the built-in overrides
- Non-theme-varying tokens (spacing, sizing, radius, typography, motion) stay as static constants
- Each platform is designed to carry theme-varying tokens in its native idiom: CSS custom properties under a `data-theme` selector, Swift `@Environment`, Kotlin `CompositionLocal`. What the generator emits today:
  - **Web**: dark mode through `light-dark()` values and `color-scheme: light dark` on `:root`, with no dark `data-theme` block; and one theme block, `:root[data-theme="wcag"]`. That selector matches only the `<html>` element, so a theme applies page-wide, and `data-theme` on any other element matches nothing. Whether a subtree can be themed is not decided yet (Spec 129)
  - **iOS and Android**: the WCAG overrides as `_wcag` constants on `DesignTokens` (on Android, `_wcag_light` and `_wcag_dark` where the modes differ). No theme types are emitted yet — no `{Name}Theme` protocol or data class, no environment key, no `CompositionLocal` — and the theme-varying semantic colors are left out of `DesignTokens`. Emitting them is planned in Spec 129

**Known limitation**: Theme-varying determination is direct, not transitive. Shadow tokens referencing overridden color primitives will use base values on iOS/Android. See Spec 094 design.md § "Known Limitations".

---

## Prior Acknowledgment

### Concept

"Prior acknowledgment" allows humans to pre-authorize token decisions in spec documents, reducing checkpoint friction during implementation while maintaining governance.

### How It Works

If a spec document (design-outline, requirements, design, or tasks) explicitly specifies:
- A specific token to use
- A specific value that will require a new token
- Permission to use primitive tokens for certain purposes

Then the AI agent can proceed without additional checkpoint for that specific decision.

### Examples

**Spec pre-authorizes primitive usage:**
```markdown
## Design Notes
- Icon optical balance requires space075 (6px) - use primitive directly
```
→ AI can use `space075` without checkpoint

**Spec pre-authorizes component token creation:**
```markdown
## Implementation Notes
- ButtonIcon needs custom inset values (8px, 10px, 12px)
- Create component tokens referencing space100, space125, space150
```
→ AI can create component tokens without additional checkpoint

**Spec is silent:**
```markdown
## Requirements
- Button should have appropriate padding
```
→ AI must checkpoint: "What does 'appropriate' mean? Which token?"

### Spec Authors' Responsibility

When writing specs, be explicit about token decisions:
- Name specific tokens when known
- Call out when primitive usage is intentional
- Indicate when new tokens will be needed
- Flag areas where token selection needs discussion

---

## Decision Examples

### Example 1: Standard Component Development

**Situation**: Building a card component, need internal padding.

**Correct approach**:
1. Check semantic tokens → `space.inset.150` (12px) exists
2. Verify semantic correctness → Yes, a 12px inset matches card padding intent
3. Use `space.inset.150` → No checkpoint needed

---

### Example 2: Feedback Color Selection

**Situation**: Building a form validation message, need error text color.

**Correct approach**:
1. Think concept first → This is feedback (error state)
2. Check semantic concept tokens → `color.feedback.error.text` exists
3. Verify semantic correctness → Yes, error text for validation message
4. Use `color.feedback.error.text` → No checkpoint needed

---

### Example 3: Button Background Color

**Situation**: Building a primary CTA button, need background color.

**Correct approach**:
1. Think concept first → This is an action (primary emphasis)
2. Check semantic concept tokens → `color.action.primary` exists
3. Verify semantic correctness → Yes, this is a hero CTA (single, focused instance)
4. Use `color.action.primary` → No checkpoint needed

**Alternative scenario**: Building a list of action buttons
1. Think concept first → These are actions, but repetitive (list context)
2. Check semantic concept tokens → `color.action.secondary` exists
3. Verify semantic correctness → Yes, secondary emphasis avoids UI over-saturation
4. Use `color.action.secondary` → No checkpoint needed

---

### Example 4: Content on Colored Background

**Situation**: Need text color for content on a purple button.

**Correct approach**:
1. Think concept first → This is contrast (content on colored background)
2. Check semantic concept tokens → `color.contrast.onDark` exists
3. Verify semantic correctness → Yes, purple is a dark/colored background
4. Use `color.contrast.onDark` → No checkpoint needed

---

### Example 5: Primitive Needed, Spec Silent

**Situation**: Building a tooltip, need 10px padding. Spec says "small padding."

**Correct approach**:
1. Check semantic tokens → `space.inset.100` (8px) too small, `space.inset.150` (12px) too large
2. Check primitives → `space125` (10px) exists
3. Spec is silent on specific token → Checkpoint required

```
AI: "Tooltip needs 10px padding. Semantic tokens don't have this value.
space125 (10px) primitive exists. Spec says 'small padding' but doesn't specify.
Should I use space125 directly, or should we create a semantic token like 
space.inset.125 for this pattern?"
```

---

### Example 6: No Token Exists

**Situation**: Component needs 7px spacing for optical alignment.

**Correct approach**:
1. Check semantic tokens → Nothing at 7px
2. Check primitives → Nothing at 7px (doesn't fit 8px grid)
3. No token exists → STOP, checkpoint required

```
AI: "Component needs 7px for optical alignment. No existing token works.

CHECKED: All semantic spacing, all primitive spacing
ANALYSIS:
- One-off need: Yes, specific to this component's visual balance
- Mathematical fit: No, 7px doesn't align to 8px baseline grid
- Reusable pattern: Unlikely, this is an optical adjustment

RECOMMENDATION: Component token
REASONING: Scoped to this component, doesn't pollute mathematical foundation

Awaiting your decision."
```

---

### Example 7: A Component's Own Token

**Situation**: Building Button-Icon's small size, need its inset (8px).

**Correct approach**:
1. The component has its own token for this property → `buttonicon.inset.small` (references `space100`). Use it, even though the semantic `space.inset.100` is also 8px: inside its own component, the component's own token comes first
2. Use `buttonicon.inset.small` → no checkpoint needed.

---

### Example 8: Pattern Emerging

**Situation**: Third component needs the same 14px spacing value.

**Correct approach**:
1. Recognize pattern → Same value needed in multiple places
2. Checkpoint with human → This might warrant promotion

```
AI: "I notice 14px spacing is now needed in three components:
- ComponentA (existing component token)
- ComponentB (existing component token)  
- ComponentC (current work)

This pattern suggests 14px might warrant a primitive token (space175 = 8 × 1.75).
Should I:
A. Create another component token (keep scoped)
B. Propose creating space175 primitive and refactoring existing component tokens
C. Something else?"
```

---

## Token Creation Guides

**Important**: These guides are for AFTER human approval. Do not use these guides to autonomously create tokens.

### Creating Primitive Tokens

**Location**: `src/tokens/[TokenFamily]Tokens.ts`

**Required fields**:
```typescript
{
  name: 'tokenName',
  category: TokenCategory.FAMILY,
  baseValue: number,
  familyBaseValue: number,
  description: 'Human-readable description',
  mathematicalRelationship: 'base × multiplier = value',
  baselineGridAlignment: boolean,
  isStrategicFlexibility: boolean,
  isPrecisionTargeted: boolean,
  platforms: {
    web: { value: number, unit: 'px' },
    ios: { value: number, unit: 'pt' },
    android: { value: number, unit: 'dp' }
  }
}
```

**`baselineGridAlignment` predicate**: `true` iff the token's `baseValue` is an exact multiple of 8 **and** the token's family participates in the baseline grid (dimensional families: spacing, radius, sizing, blur, shadow offset, tap area, font size). Families that do not participate (border width, breakpoint, density, and all non-dimensional families) always carry `false`, meaning "not applicable." Values on the 4-unit subgrid (4, 12, 20) are `false` — they are valid values, not grid-aligned ones. Enforced by `src/tokens/__tests__/BaselineGridAlignmentFlag.test.ts`.

**Detailed guide**: See `.kiro/specs/token-system/token-category-pattern-guide.md`

---

### Creating Semantic Tokens

**Location**: `src/tokens/semantic/[TokenFamily]Tokens.ts`

**Concept-First Naming Pattern**: `color.{concept}.{role}.{property?}.{state?}.{intensity?}`

| Segment | Required | Description | Examples |
|---------|----------|-------------|----------|
| `color` | ✅ | Token family (this pattern is for color tokens; other families name their own, e.g. `space.inset.*`, `typography.*`, `shadow.*`) | `color` |
| `concept` | ✅ | Semantic category | `feedback`, `identity`, `action`, `contrast`, `structure` |
| `role` | ✅ | Specific meaning | `success`, `error`, `human`, `primary`, `onDark`, `canvas` |
| `property` | ❌ | Visual styling property (when disambiguation needed) | `background`, `text`, `border`, `icon` |
| `state` | ❌ | Interaction state (when needed) | `rest`, `hover`, `pressed`, `disabled` |
| `intensity` | ❌ | Prominence level (when needed) | `fill`, `surface` |

**When to include property**:
- **Include**: When the concept/role applies to multiple properties (feedback.error needs both background AND text)
- **Omit**: When the token represents a single color value (identity.human IS the color, action.primary IS the color)

**Format**:
```typescript
export const semanticTokenName = {
  value: 'primitiveTokenName'  // Reference by name, not value
};
```

**For multi-primitive compositions** (like typography):
```typescript
{
  name: 'tokenName',
  primitiveReferences: {
    property1: 'primitive1',
    property2: 'primitive2'
  },
  category: SemanticCategory.CATEGORY,
  context: 'Usage context description',
  description: 'Human-readable description'
}
```

**Detailed guide**: See `.kiro/specs/token-system/token-category-pattern-guide.md`

**Theme sync (Spec 094)**: When creating a new semantic color token, ensure it has appropriate values in all registered themes. Base themes (`dark`, `wcag`, `dark-wcag`) are defined in the DesignerPunk repo. Product themes are registered via `designerpunk.config.ts` and are the product team's responsibility.

New semantic tokens should have a base primitive reference. The theme drift audit (`npm run audit:theme-drift`) can surface missing or orphaned theme entries — but **you must run it by hand**. It is in no CI workflow and no PR check, so nothing catches a missed theme entry for you.

> **Corrected 2026-09-14 (Ada, wave-3 finding O-10).** This line previously claimed the audit "catches missing entries in CI." It does not run in CI — it appears in no `.github/workflows/**` file. Until that line was corrected the audit also could not fail even when run manually: its `package.json` definition ended in `|| echo`, which swallowed the diff's exit code. The exit code now propagates. Two caveats before you trust the result: the comparison is **comment-sensitive**, so hand-written rationale comments in a theme file always register as differences, and the remedy it suggests (`npm run generate:theme-skeleton`) preserves override values but **deletes those comments**. Read the diff; do not regenerate reflexively. Whether this audit should become a real gate is an open enforcement question, not settled here.

```typescript
// In a theme's SemanticOverrides:
// color.<concept>.<role>: { value: 'primitiveRef' }
```

---

### Creating Component Tokens

*(Corrected 2026-10-25 (Ada): the component-token name shape, location, import and examples in this document were corrected to the token index (`token-index/`) and the source tree, including the names in the Component Token Usage, Decision Examples and Creating Semantic Tokens passages; DesignerPunk record `2026-10-23-served-docs-teach-non-key-token-names`.)*

**Location**: `src/components/core/<Name>/tokens.ts` or `<name>.tokens.ts`; the Progress tokens live in `src/tokens/component/progress.ts`

**Component Token Pattern**: `<component>.<property>…` (component lowercased in the index, no family segment), for example `avatar.size.md` and `buttonicon.inset.medium`

| Segment | Required | Description | Examples |
|---------|----------|-------------|----------|
| `component` | ✅ | UI component, passed as `component: 'Name'` and lowercased in the index | `avatar`, `buttonicon`, `progress` |
| `property…` | ✅ | The token name given in `tokens`, one or more dotted segments | `size.md`, `inset.medium`, `node.gap.sm` |

**Note**: The `family` is given once per `defineComponentTokens` call and applies to every token in it: `spacing`, `sizing` or `borderWidth`. Tokens of different families go in separate calls. There is no color family, so a component's colors are not component tokens.

**Format**:
```typescript
import { defineComponentTokens } from '../../../build/tokens';
import { spacingTokens } from '../../../tokens/SpacingTokens';

export const ComponentNameTokens = defineComponentTokens({
  component: 'ComponentName',
  family: 'spacing',
  tokens: {
    'tokenName': {
      reference: spacingTokens.space100,  // Preferred: reference primitive
      reasoning: 'Required explanation of why this token exists',
    },
    // OR for custom values:
    'customToken': {
      value: 14,  // Must conform to family's mathematical pattern
      reasoning: 'Required explanation of why this value is needed',
    },
  },
});
```

**Best Practice**: A component's colors reference semantic tokens directly. Avatar does this with constants outside `defineComponentTokens`, in `avatar.tokens.ts`:
```typescript
export const AvatarColorTokens = {
  'human.background': 'color.identity.human',
  'human.icon': 'color.contrast.onDark',
  'agent.background': 'color.identity.agent',
  'agent.icon': 'color.contrast.onDark',
  'default.border': 'color.structure.border',
} as const;
```

**Key requirements**:
- `reasoning` field is mandatory — explains why existing tokens are insufficient
- `reference` takes a primitive token (it needs a `baseValue`), not a semantic token
- Prefer `reference` to primitives over custom `value`
- Custom values must conform to the token family's mathematical foundation

**Detailed guide**: See Rosetta System Architecture, "Component Token Integration" section

---

## Modifier Type Governance

The `TokenModifier` system (introduced in Spec 073) currently supports `type: 'opacity'` only. Adding new modifier types requires:

1. **Justification**: Multiple components need the transformation, AND no existing pattern covers the use case
2. **Mathematical composability**: The transformation must be mathematically composable (applying modifier A then B produces a deterministic, order-independent result where possible)
3. **Human approval**: Peter must approve before a new modifier type is added to the `TokenModifier` type union
4. **Documentation**: New modifier types must be documented in the relevant Token-Family doc and this governance section

This gate exists to prevent ungoverned growth of the modifier pattern. The opacity modifier was justified by the scrim use case (Spec 073); future modifiers should meet the same bar.

---

## MCP Query Examples

```
# Get this document
get_document_full({ path: "token-governance" })

# Get specific sections
get_section({ path: "token-governance", heading: "Token Selection Matrix" })
get_section({ path: "token-governance", heading: "Token Usage Governance" })
get_section({ path: "token-governance", heading: "Token Creation Governance" })
get_section({ path: "token-governance", heading: "Prior Acknowledgment" })
get_section({ path: "token-governance", heading: "Decision Examples" })
get_section({ path: "token-governance", heading: "Token Creation Guides" })
```

---

## Related Documentation

- [Token-Family-Color](token-family-color) — Complete color token reference with concept-first organization
- [Rosetta System Architecture](rosetta-system-architecture) — Token pipeline architecture
- [Rosetta System Principles](rosetta-system-principles) — Mathematical foundations
- [Token Quick Reference](token-quick-reference) — Token documentation routing
- [Token Category Pattern Guide](../.kiro/specs/token-system/token-category-pattern-guide.md) — Detailed primitive/semantic creation patterns
- [Core Goals](../.kiro/steering/core-goals.md) — Project principles including token-first approach
- [Design Authority](../.kiro/specs/051-semantic-token-naming-restructure/design-outline.md) — Semantic token naming restructure design

### DTCG Integration
- [DTCG Integration Guide](dtcg-integration-guide) — Integrating DesignerPunk tokens with external design tools via DTCG format
- [Figma Workflow Guide](figma-workflow-guide) — Bidirectional Figma integration: token push and design extraction
- [Transformer Development Guide](transformer-development-guide) — Building custom token transformers for tool-specific formats

---

*This governance framework ensures token decisions are deliberate, architecturally sound, and maintain the integrity of the design system.*
