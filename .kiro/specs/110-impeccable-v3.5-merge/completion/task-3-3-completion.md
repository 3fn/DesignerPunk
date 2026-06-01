# Task 3.3 Completion: Evaluate and Merge colorize.md, typeset.md, animate.md

**Date**: 2026-06-01
**Task**: 3.3 Evaluate and selectively merge colorize, typeset, animate
**Type**: Implementation
**Status**: Complete

---

## Artifacts Modified

- `.kiro/skills/impeccable/reference/colorize.md` — Scope note, anti-slop updates, removed anti-patterns
- `.kiro/skills/impeccable/reference/typeset.md` — Scope note, brand reference update
- `.kiro/skills/impeccable/reference/animate.md` — Anti-slop, list rhythm, motion materials, perceived performance

## Implementation Details

### colorize.md

| Change | Rationale |
|--------|-----------|
| Added DesignerPunk scope note | OKLCH guidance applies to ungoverned decisions only (Req 7.1) |
| Updated "Tinted backgrounds" | Warns against AI cream/sand giveaway (upstream improvement) |
| Updated "Cards & surfaces" | "Toward the brand, not for warmth by reflex" (upstream improvement) |
| Removed "pure gray for neutrals" line | Was an anti-pattern per our Design Laws (tinted neutrals required) |
| Removed "pure black/white for large areas" line | Was an anti-pattern per our Design Laws |

### typeset.md

| Change | Rationale |
|--------|-----------|
| Added DesignerPunk scope note | Fonts system-defined in product register (Req 7.2) |
| Updated brand reference | `brand.md` → `brand-dp.md` (our register reference) |
| Updated product register description | "DesignerPunk's type system is the constraint" |
| Kept external `typography.md` reference | Web font loading strategies preserved there (Req 7.2) |

### animate.md

| Change | Rationale |
|--------|-----------|
| Updated brand register guidance | Fade-and-rise as AI tell (anti-slop awareness) |
| Replaced "page load choreography" | List rhythm rules with stagger caps (upstream improvement) |
| Removed "content reveals" | Replaced by list rhythm guidance above |
| Replaced bullet durations | Table format with "100/300/500 rule" naming (upstream improvement) |
| Expanded motion materials | Detailed vocabulary: blur, clip-path, masks, shadow/glow, grid-template-rows (Req 7.3) |
| Added will-change guidance | "Never preemptively across the whole page" |
| Added scroll triggers | "Use Intersection Observer; unobserve after animation fires once" |
| Added § Perceived Performance | 80ms threshold, preemptive start, optimistic UI, easing perception |

### Conflict Verification

No conflicts with DesignerPunk motion rules:
- Expo-out / spring physics: not contradicted (materials vocabulary is orthogonal to curve choice)
- No bounce / no elastic: not contradicted
- prefers-reduced-motion: not contradicted (animate.md already has this)

## Validation (Tier 2: Standard)

- ✅ Requirement 7.1: colorize.md OKLCH guidance scoped to ungoverned decisions only
- ✅ Requirement 7.2: typeset.md font selection excluded for product register; web font loading preserved
- ✅ Requirement 7.3: animate.md premium motion materials merged without conflict
- ✅ Requirement 7.4: Conflict notes present where DesignerPunk Design Laws take precedence (scope notes)
