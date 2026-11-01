---
id: cross-platform-vs-platform-specific-decision-framework
inclusion: manual
name: Cross-Platform-vs-Platform-Specific-Decision-Framework
aliases: platform-specific vs shared decisions, platform specific versus shared code decisions, deciding platform specific or shared implementation
description: Strategic guidance on when to use cross-platform patterns vs platform-specific idioms — decision framework, consistency vs native UX trade-offs, and context-based recommendations. Load when making platform implementation decisions or evaluating cross-platform vs native approaches.
---

# Cross-Platform vs Platform-Specific Decision Framework

> **Audience framing**: this describes **DesignerPunk's own process and components**, not yours. **Worked example**: the amendment notes and their ballot paths, the plan artifacts named (DesignerPunk's specs, tasks and screen specs, and the merge that approves them), the `**Departures**:` PR-body line, and the components and platform examples are DesignerPunk's. **Transferable**: the four decision criteria, the rule that a departure found while planning is asked of a human and one found during development is recorded, built and named before the work is accepted, the motion and token-mapping patterns, and the README documentation requirements.

**Date**: 2025-12-19
**Last Reviewed**: 2026-10-19
**Purpose**: Strategic guidance on when to use cross-platform patterns vs platform-specific idioms
**Organization**: process-standard
**Scope**: cross-project
**Layer**: 2
**Relevant Tasks**: component-development, platform-implementation

## Overview

DesignerPunk's True Native Architecture fixes how components are built and leaves how they look and feel open: implementation and accessibility semantics are always native (the Key Principle, below), and design may follow a platform's idiom or depart from it, carried by tokens. This framework helps you make and record each design choice, and says when a departure is asked before it is built and when it is recorded and named.

**Key Principle**: True Native Development does not mean True Native Design. Three axes, two of them fixed:
- **Implementation is always native.** Build-time platform separation and the platform's own rendering and accessibility stack are not a choice.
- **Accessibility semantics are always platform-correct.** Role, state, name, activation, focus and announcements behave exactly as the platform's native control would. That is not a choice either.
- **Design is a choice.** Look, and interaction conventions within the limits of this principle, may follow the platform's native idiom or depart from it to serve the product's users and brand. Neither is always correct; the right choice depends on context, user expectations and design system goals.

A departure in design never licenses a departure in semantics.

Two more limits are not a choice: interaction the platform owns (back and history, scrolling, text selection, keyboard and IME, and the platform services a native control takes part in) is never replaced, and system surfaces and structural idioms are never replaced, though their contents may be styled. Every visual and behavioral choice is recorded with its reason.

---

## Decision Framework

### When to Use Cross-Platform Patterns

**Use cross-platform patterns when:**

- **Core functionality should work identically** across platforms
  - Example: Button tap behavior, form validation logic
  
- **Token-based styling maintains design system consistency**
  - Example: Color schemes, typography scales, spacing systems
  
- **Component APIs need platform-agnostic interfaces**
  - Example: Props like `variant`, `size`, `disabled` work the same everywhere
  
- **Behavior users expect to be consistent**
  - Example: Navigation patterns, data display, content hierarchy

**Benefits**:
- Predictable behavior across platforms
- Easier maintenance (one design decision applies everywhere)
- Consistent brand expression
- Simplified documentation

**Trade-offs**:
- May feel less "native" on some platforms
- Can miss platform-specific UX improvements
- Requires more abstraction in implementation


### When to Use Platform-Specific Idioms

**Use platform-specific idioms when:**

- **Platform-native animations provide superior UX**
  - Example: iOS spring animations, Android ripple effects
  
- **Platform-specific interaction patterns users expect**
  - Example: iOS swipe gestures, Android floating action buttons
  
- **Accessibility features leverage platform capabilities**
  - Example: iOS VoiceOver, Android TalkBack, platform-specific touch targets
  
- **Performance optimizations use platform-specific APIs**
  - Example: iOS Metal rendering, Android Jetpack Compose optimizations

**Benefits**:
- Feels native and familiar to platform users
- Leverages platform strengths and conventions
- Better accessibility through platform features
- Often better performance

**Trade-offs**:
- Requires platform-specific implementation
- More complex maintenance (different code per platform)
- Can create inconsistent experiences across platforms
- Requires more documentation

---

## Decision Criteria

**Ask these questions to guide your decision:**

### 1. Does this affect user-facing behavior or just implementation?

- **User-facing behavior**: Lean toward cross-platform consistency
  - Users expect consistent functionality across devices
  - Example: Form validation, data display, navigation
  
- **Implementation details**: Lean toward platform idioms
  - Users don't see implementation, only results
  - Example: Animation curves, rendering optimizations

### 2. Is there a platform convention that users expect?

- **Strong platform convention**: Consider platform idiom
  - Users have learned platform patterns
  - Example: iOS swipe-to-delete, Android back button behavior
  
- **No strong convention**: Use cross-platform pattern
  - No user expectations to violate
  - Example: Custom component interactions

### 3. Does the platform provide superior UX through native patterns?

- **Superior platform UX**: Consider platform idiom
  - Platform pattern is objectively better
  - Example: iOS spring animations feel more responsive
  
- **Equivalent UX**: Use cross-platform pattern
  - No meaningful UX difference
  - Example: Button border radius

Accessibility semantics stay native whatever is chosen for design.

### 4. Can we maintain design system consistency while respecting platform idioms?

- **Yes**: Use platform idiom with token-based values
  - Example: iOS spring animation with motion token duration
  
- **No**: Record the departure. When it was found decides who makes the call (the Native-Behavior Rule, `design-language/design-philosophy.yaml`): *(amended 2026-11-01 by ballot 2026-10-30-departure-timing-plan-vs-build, site 1a; prior text at `2c00cea49`)*
  - **Found while planning**, that is, while the plan the work executes is written or reviewed (a spec's outline, requirements, design or tasks, or a product screen spec; a platform agent's review of an approved screen spec before it builds counts): pause and ask a human (for product work, through the screen's architect, who takes it to the product's human lead) before the plan is approved. A plan with no recorded approval is still in planning. For work whose kind has a plan (a spec, a product screen), a missing plan is itself planning, so ask.
  - **Found during development**, that is, after that plan is approved and work has started: in DesignerPunk's own repo, after the merge of the plan artifact the work executes; for product work, after the human lead's dated go in the screen spec's review (Product-Token-Governance § "Authoring Workflow"), once the platform's `status` leaves `not-started`. Other work that executes no plan artifact (in this repo, a `fix/` or `chore/` PR) is in development from its start. Record the departure with its reason (for a component, in its README, marked as Documentation Requirements item 5 says; for product-screen work, in the Implementation Report's "Decisions Made During Implementation", with the screen spec amended to name it), proceed, and name it before the work is accepted, one line per departure, in the PR body or, where the work has no PR, under that report heading: `**Departures**: <Component-Name>, <web|ios|android> — <what departs, and why> — <path § "heading" of the record> — in-plan: <path § "heading" naming the component and the idiom | component only: path § "heading" | not in plan (<the plan artifact searched>)>`. A screen spec's section may be written as `<path> uiTree.<node>`.
  - A conflict the plan already showed is a planning-stage conflict, wherever it was first noticed. A departure the component's README already records is the component's, and a screen that uses it does not file it again.
  - A choice that also breaks a design rule (the design philosophy's Break-Glass Rule) is not a departure: it waits for explicit authorization whenever it is found.
  - A token the work needs is not a departure: it follows Token Governance § "Token Creation Governance" and, for product work, Product-Token-Governance § "Authoring Workflow", whenever it is found.
  - Example: Platform color scheme conflicts with brand colors

---

## Motion Token Usage

### Strategic Guidance

**Motion tokens define timing, easing, and duration values** that maintain consistent animation feel across the design system.

**When to use motion tokens:**
- Transitions between states (hover, focus, active)
- Content reveal/hide animations
- Loading states and progress indicators
- Cross-platform animations where consistency matters

**When platform-native animations may use hard-coded values:**
- Platform-specific interaction feedback (iOS springs, Android ripples)
- System-level animations following platform guidelines
- Accessibility-driven animations (reduced motion preferences)
- Performance-critical animations using platform APIs

**Key principle**: Document rationale when choosing platform idioms over tokens.

### Decision Tree: Should I Use Motion Tokens?

```
Is this animation cross-platform?
├─ YES → Use motion tokens for consistency
└─ NO → Is there a platform-native animation that provides superior UX?
    ├─ YES → Does the platform animation follow platform guidelines?
    │   ├─ YES → Use platform animation, document rationale
    │   └─ NO → Use motion tokens
    └─ NO → Use motion tokens
```

### When to Pause and Ask

**Pause and ask a human (for product work, through the screen's architect) when:** *(amended 2026-11-01 by ballot 2026-10-30-departure-timing-plan-vs-build, site 1b; prior text at `2c00cea49`)*
- The four Decision Criteria leave it open whether platform animation should use tokens or native values
- Motion token doesn't exist for the needed animation (a token stop whenever it is found: Token Governance § "Token Creation Governance" and, for product work, Product-Token-Governance § "Authoring Workflow")

Using an existing native value instead of the motion token the plan or the component names is a departure: Q4's "No" case, and the rule there says when to ask. Needing a value that neither a token nor the platform supplies is the token stop above.

**Example questions:**
- "iOS spring animation provides better UX but doesn't use motion tokens. Should I use the spring or token-based animation?"
- "Android ripple effect is platform convention but conflicts with our interaction design. Which should I prioritize?"

---

## Token Mapping Patterns

### Strategic Guidance

**Token mapping** is how platform implementations consume design tokens while respecting platform idioms.

**Cross-platform token equivalence**: Same token → same visual result
- `space.inset.100` = 8px on web = 8pt on iOS = 8dp on Android
- Mathematical relationships preserved across platforms

**Platform-appropriate idioms for token consumption**:
- **Web**: CSS custom properties (`var(--space-inset-200)`)
- **iOS**: Swift constants (`DesignTokens.spaceInset200`)
- **Android**: Kotlin constants (`DesignTokens.space_inset_200`)

### Platform-Specific Mapping Approaches

**Web Platform**:
```css
/* Token-based styling with CSS custom properties */
.button {
  padding: var(--space-inset-200);
  background: var(--color-action-primary);
  transition: var(--duration-250) var(--easing-standard);
}

/* Platform-specific enhancement */
.button:hover {
  /* Browser-native hover state */
  filter: brightness(1.1);
}
```

**iOS Platform**:
```swift
// Token-based styling with Swift constants
Button(action: action) {
    Text(label)
}
.padding(DesignTokens.spaceInset200)
.background(colorActionPrimary)

// Platform-specific enhancement
.animation(.spring(response: 0.3, dampingFraction: 0.7))
```

**Android Platform**:
```kotlin
// Token-based styling with Kotlin constants
Button(
    onClick = onClick,
    modifier = Modifier.padding(DesignTokens.space_inset_200)
) {
    Text(text = label)
}

// Platform-specific enhancement
.clickable(
    indication = rememberRipple(),
    interactionSource = remember { MutableInteractionSource() }
)
```

### When to Pause and Ask

**Pause and ask a human when:** *(amended 2026-11-01 by ballot 2026-10-30-departure-timing-plan-vs-build, site 1c; prior text at `2c00cea49`)*
- Token mapping pattern doesn't exist for your use case
- Platform idiom requires values that don't map to tokens
- Unclear how to maintain token equivalence across platforms

---

## Examples and Patterns

### Example 1: Button Interaction Feedback

**Scenario**: Button needs visual feedback on interaction

**Cross-Platform Approach**:
- Use motion tokens for transition timing
- Use color tokens for state changes
- Consistent behavior across platforms

**Platform-Specific Approach**:
- iOS: Spring animation on tap
- Android: Ripple effect on touch
- Web: Hover state with brightness filter

**Decision**: Use platform-specific approach
- **Rationale**: Platform conventions provide superior UX
- **Token usage**: Still use color tokens for button colors
- **Documentation**: Note in component README why platform idioms used

### Example 2: Form Validation Timing

**Scenario**: When to show validation errors

**Cross-Platform Approach**:
- Validate on blur (when user leaves field)
- Show errors after first submission attempt
- Consistent timing across platforms

**Platform-Specific Approach**:
- iOS: Validate on blur (iOS convention)
- Android: Validate on input (Material Design guideline)
- Web: Validate on blur (web convention)

**Decision**: Use cross-platform approach
- **Rationale**: Consistent validation behavior more important than platform conventions
- **Token usage**: Use motion tokens for error reveal animation
- **Documentation**: Note validation timing in component README

### Example 3: Loading Indicators

**Scenario**: Show loading state during async operations

**Cross-Platform Approach**:
- Use design system spinner component
- Use motion tokens for rotation timing
- Consistent visual across platforms

**Platform-Specific Approach**:
- iOS: UIActivityIndicatorView (system spinner)
- Android: CircularProgressIndicator (Material Design)
- Web: Custom SVG spinner

**Decision**: Depends on context
- **Brand-critical contexts**: Use cross-platform design system spinner
- **System-level operations**: Use platform-native indicators
- **Token usage**: Use motion tokens for custom spinner timing
- **Documentation**: Document when to use each approach

---

## Documentation Requirements

**Every component documents its visual and behavioral choices** — native idiom or departure — in its README:

### Required Documentation

1. **Rationale**: Why each visual and behavioral choice (native idiom or departure) was made
2. **Platform differences**: What differs between platforms and why
3. **Token usage**: Which tokens each choice uses, whether it follows the platform's idiom or departs from it
4. **Accessibility**: How each choice keeps accessibility semantics platform-correct; a departure in design never changes role, state, name, activation, focus or announcements
5. **Departure mark**: An entry that departs from its platform's idiom begins `**Departure**:` after the platform name, as in `**iOS**: **Departure**: …`; an entry that follows the idiom carries no mark. The work that adds a marked entry names it in a `**Departures**:` line when it is handed off (Decision Criteria, Q4). *(added 2026-11-01 by ballot 2026-10-30-departure-timing-plan-vs-build, site 1h)*

### Example Documentation

```markdown
## Platform-Specific Behavior

### Interaction Feedback

**iOS**: Uses spring animation for button tap feedback
- Rationale: iOS users expect spring animations for interactive elements
- Token usage: Still uses color tokens for button states
- Accessibility: Respects reduced motion preference

**Android**: Uses ripple effect for button tap feedback
- Rationale: Material Design guideline for touch feedback
- Token usage: Still uses color tokens for ripple color
- Accessibility: Ripple effect provides visual feedback for touch

**Web**: Uses hover state with brightness filter
- Rationale: Web convention for button hover states
- Token usage: Uses motion tokens for transition timing
- Accessibility: Hover state doesn't affect keyboard navigation
```

---

## Related Documentation

- [Component Development Guide](component-development-guide) - Component implementation guidance with collaboration practices
- [Token Resolution Patterns](token-resolution-patterns) - Strategic guidance on token type selection and validation
- [Platform Implementation Guidelines](platform-implementation-guidelines) - Behavioral contracts and platform-native implementation rules

---

*This framework provides strategic guidance for balancing cross-platform consistency with platform-appropriate UX. When in doubt, pause and ask a human for guidance.* *(amended 2026-11-01 by ballot 2026-10-30-departure-timing-plan-vs-build, site 1d; prior text at `2c00cea49`)*
