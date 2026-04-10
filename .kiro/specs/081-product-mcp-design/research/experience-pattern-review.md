# Experience Pattern Review: Application MCP vs Product MCP

**Date**: 2026-04-10
**Purpose**: Review each of the 9 ecosystem experience patterns to determine where they belong
**Reviewer**: Leonardo
**Context**: Read Spec 081 design outline § "Application MCP Changes" and § "Resolved from Feedback" (experience pattern placement)

---

## Principle

- **Application MCP**: Assembly recipes — generic guidance on how ecosystem components compose together. True regardless of product. "How to build A form."
- **Product MCP**: Screen specifications — specific to a product's screens, flows, and domain. "How to build OUR onboarding form."

The question per pattern: **Is this a generic assembly recipe any product would use, or does it describe a specific screen type that belongs in a product's Experience Map?**

---

## Patterns to Review

For each pattern, Leo should assess: **Stay in Application MCP** (assembly recipe), **Move to Product MCP** (screen-type template / starter content), or **Remove** (not useful).

### 1. simple-form
**Description**: Single-step form collecting user input with a submit action, wrapped in an accessible fieldset container.
**Category**: forms

**Leo's assessment**: **Stay in Application MCP.** This is a pure assembly recipe. It says "a form is Container-Base (fieldset) → inputs → Button-CTA (submit)." That's true regardless of product. Every product that has a form uses this composition. The accessibility notes (fieldset naming, focus order, error summary) are ecosystem-level guidance about how form components compose. No product-specific content.

---

### 2. multi-section-form
**Description**: Form with multiple grouped sections (fieldsets), each containing related inputs, sharing a common submit action. Sections maintain consistent hierarchy.
**Category**: forms

**Leo's assessment**: **Stay in Application MCP.** Same reasoning as simple-form — it's a generic assembly recipe for "form with grouped sections." The pattern describes how to nest multiple fieldsets under a common submit action with consistent heading hierarchy. Any product with a multi-section form (settings, profile editing, registration) uses this composition. No product-specific content.

---

### 3. empty-state
**Description**: Placeholder screen or section shown when no data is available, with an explanation and a call-to-action to resolve the empty state.
**Category**: feedback

**Leo's assessment**: **Stay in Application MCP.** This is a UI state pattern, not a screen type. Every product has empty states — empty lists, first-use experiences, no-results searches. The pattern describes the composition: explanation text + CTA + optional illustration. That's universal. The specific *content* of the empty state ("No legislation found" vs "No orders yet") is product-specific, but the *assembly* is generic.

---

### 4. content-preview
**Description**: Limited view of a larger dataset with a 'View All' action, used in dashboards and overview screens to surface key items without overwhelming the layout.
**Category**: content

**Leo's assessment**: **Stay in Application MCP.** This is a composition pattern — "show N items from a larger set with a 'View All' action." It's a building block I'd use inside a dashboard, a home screen, or any overview page. The pattern describes the component arrangement (heading + limited list + "View All" button), not a specific screen. Any product with a dashboard or overview uses this.

---

### 5. dashboard
**Description**: Overview screen with a stat summary zone, primary content area, and optional secondary content. Organizes information by temporal relevance: current state first, upcoming second, historical third.
**Category**: content

**Leo's assessment**: **Move to Product MCP as starter template.** The temporal ordering principle ("current → upcoming → historical") is a design philosophy, not a universal truth. Some dashboards organize by priority, category, or user role. The three-zone structure (stats + primary + secondary) is also an assumption — not every dashboard has stat cards. The universal truth is narrower: "overview screens organize information into scannable zones with landmark navigation." The specific zone arrangement and temporal ordering are opinionated starting points, not assembly recipes. Ship as Product MCP starter content — "here's one way to build a dashboard."

---

### 6. settings
**Description**: Settings page with grouped sections containing navigation items, toggles, and preferences. Sections use landmark navigation for screen reader efficiency.
**Category**: settings

**Leo's assessment**: **Move to Product MCP as starter template.** The pattern prescribes "grouped sections with navigation items, toggles, and preferences" — that's an assumption about what a settings screen looks like. A simple product might have a flat list of toggles. A complex product might have nested settings with search. The accessibility guidance (landmark navigation for sections) is universal, but the screen structure is opinionated. Ship as Product MCP starter content — "here's one way to build a settings screen."

---

### 7. notification-list
**Description**: Vertical list of notification or activity items grouped by time period, with read/unread state differentiation and bulk actions.
**Category**: content

**Leo's assessment**: **Stay in Application MCP.** This is an assembly recipe for "time-grouped list with read/unread state." The composition (time-period headings → list items with read/unread styling → bulk actions) is generic. Any product with notifications or an activity feed uses this pattern. The specific notification content is product-specific, but the assembly is universal.

The pattern notes that it uses Container-Base "pending a dedicated content list item component" — that's an ecosystem-level component gap note, not product-specific content.

---

### 8. onboarding
**Description**: Multi-step account creation and onboarding flow with authentication, preference selection, and post-creation guidance.
**Category**: onboarding

**Leo's assessment**: **Move to Product MCP as starter template.** The pattern prescribes three specific steps (authentication with login/create toggle, preference selection, what's-next guidance). That's a very specific assumption about what onboarding looks like. WrKing Class onboarding would be completely different — "select your state, find your representatives, choose your topics." The universal truth is narrower: "multi-step flows need progress indication, step navigation, and focus management on step transitions." The specific three-step structure is an opinionated starting point. Ship as Product MCP starter content — "here's one way to build an onboarding flow."

---

### 9. view-edit-screen
**Description**: Screen that displays user data in read-only mode with an edit affordance that transitions to an editable form, maintaining consistent information hierarchy across both modes.
**Category**: forms

**Leo's assessment**: **Move to Product MCP as starter template, but extract the universal principle first.**

The universal truth inside this pattern is: **when transitioning from view to edit, the edit space should mirror the information hierarchy of the view space.** That principle applies regardless of screen structure — inline editing, sheet-based editing, full-page mode switch, table row editing. The user's mental model of the information shouldn't break when they switch modes.

The current pattern conflates that principle with one specific implementation (a two-mode screen with specific component arrangements for both modes). The principle is a universal truth that belongs in the Application MCP (or Docs MCP) as assembly guidance. The specific two-mode screen structure is a starter template.

**Action**: Extract "view-to-edit hierarchy consistency" as a principle in the Application MCP. Move the screen-type pattern to Product MCP starter content.

---

## Summary

After Leo's review, fill in:

| Pattern | Decision | Rationale |
|---------|----------|-----------|
| simple-form | **Stay** | Pure assembly recipe — fieldset + inputs + submit. Universal. |
| multi-section-form | **Stay** | Assembly recipe for grouped fieldsets. Universal. |
| empty-state | **Stay** | UI state pattern, not a screen type. Every product has empty states. |
| content-preview | **Stay** | Composition pattern — limited list + "View All." Building block, not a screen. |
| dashboard | **Move** | Zone structure + temporal ordering are opinionated assumptions, not universal truths. Starter template. |
| settings | **Move** | Prescribes a specific settings screen structure. The accessibility guidance (landmarks) is universal; the screen layout is opinionated. Starter template. |
| notification-list | **Stay** | Assembly recipe for time-grouped lists with read/unread state. Universal. |
| onboarding | **Move** | Three specific steps are an assumption about what onboarding looks like. Universal truth is narrower: multi-step flows need progress indication + step navigation + focus management. Starter template. |
| view-edit-screen | **Move** (extract principle first) | Universal truth: edit space should mirror view space's information hierarchy. The specific two-mode screen structure is a starter template. Principle stays in Application MCP; screen pattern moves to Product MCP. |

### Extracted Universal Principles (stay in Application MCP as assembly guidance)

From the patterns that move, these universal truths should be preserved:

1. **From onboarding**: Multi-step flows need progress indication, step navigation, and focus management on step transitions.
2. **From view-edit-screen**: When transitioning from view to edit, the edit space should mirror the information hierarchy of the view space.
3. **From dashboard**: Overview screens should organize information into scannable zones with landmark navigation.
4. **From settings**: Settings sections should use landmark navigation for screen reader efficiency.

These principles are true regardless of screen structure. They belong in the Application MCP as assembly guidance or in the Docs MCP as design principles.
