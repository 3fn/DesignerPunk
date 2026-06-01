# Task 1.2 Completion: Update Absolute Bans and AI Slop Test

**Date**: 2026-06-01
**Task**: 1.2 Update Absolute Bans and AI slop test
**Type**: Implementation
**Status**: Complete

---

## Artifacts Modified

- `.kiro/skills/impeccable/SKILL.md` — Expanded Absolute Bans section, added AI slop test section, added color strategy vocabulary section

## Implementation Details

### Absolute Bans (§ DesignerPunk Design Laws > Absolute Bans)

Expanded from a terse bullet list to full match-and-refuse format with explanations. Changes:

| Ban | Change |
|-----|--------|
| Side-stripe borders | Expanded with rewrite guidance |
| Gradient text | Expanded with alternative |
| Glassmorphism | Expanded |
| Hero-metric template | Expanded |
| Identical card grids | Expanded |
| Modal as first thought | Expanded with alternatives |
| **Cream/beige body bg** | **NEW** — OKLCH parameters (L 0.84–0.97, C < 0.06, hue 40–100), token-name tells, three alternatives |
| **Numbered section markers** | **NEW** — 01/02/03 scaffolding ban with "numbers earn their place" exception |
| **Text overflow** | **NEW** — heading overflow at breakpoints, test requirement |
| Eyebrow | **STRENGTHENED** — added frequency-based detection: "if more than one section on the page has an eyebrow, you're scaffolding by reflex" |

### AI Slop Test (§ Design guidance > The AI slop test)

New section defining the two-altitude category-reflex check:
- **First-order**: Can someone guess theme + palette from category alone?
- **Second-order**: Can someone guess aesthetic family from category + anti-references? (The trap one tier deeper — avoiding the first reflex but landing on the predictable alternative.)

References `brand-dp.md` for reflex-reject aesthetic lanes.

### Color Strategy Vocabulary (§ Design guidance > New projects only)

New section scoped to brand register work when no prior design system exists:
- Restrained / Committed / Full palette / Drenched vocabulary
- MCP query reference (`get_color_strategy()`)

### Placement Decisions

- Absolute Bans remain in DesignerPunk Design Laws (they're system-enforced, Priority 2)
- AI slop test placed in Design guidance (it's craft methodology, Priority 4)
- Color strategy vocabulary placed in Design guidance under "New projects only" (scoped to brand register, no conflict with existing Color law)

## Validation (Tier 2: Standard)

- ✅ Requirement 2.1: Cream/beige ban present with OKLCH parameters and token-name tells
- ✅ Requirement 2.2: Numbered section markers ban present
- ✅ Requirement 2.3: Text overflow ban present
- ✅ Requirement 2.4: Eyebrow ban strengthened with frequency-based detection
- ✅ Requirement 2.5: Second-order category-reflex check present in AI slop test
- ✅ Requirement 2.6: Color strategy vocabulary present (Restrained/Committed/Full/Drenched)
- ✅ No conflict with existing DesignerPunk Design Laws
- ✅ Document structure valid (proper heading hierarchy)
