# Task 3.1 Completion: Merge Priority Reference Files

**Date**: 2026-06-01
**Task**: 3.1 Merge priority reference files (craft, shape, polish, bolder)
**Type**: Implementation
**Status**: Complete

---

## Artifacts Modified

- `.kiro/skills/impeccable/reference/craft.md` — 2 PRODUCT.md refs → MCP, Step 2 file names updated
- `.kiro/skills/impeccable/reference/shape.md` — 6 PRODUCT.md/DESIGN.md refs → MCP, section 9 file names updated
- `.kiro/skills/impeccable/reference/bolder.md` — typography ref updated, motion section improved
- `.kiro/skills/impeccable/reference/codex.md` — 2 example questions updated for anti-slop awareness
- `.kiro/skills/impeccable/reference/polish.md` — No changes needed (already current)

## Implementation Details

### craft.md

| Change | Detail |
|--------|--------|
| PRODUCT.md refs (2) | Replaced with "MCP context" / "design context loaded via MCP" |
| Step 2 file names | `spatial-design.md` → `layout.md`, `typography.md` → `typeset.md`, `motion-design.md` → `animate.md`, `color-and-contrast.md` → `colorize.md`, `responsive-design.md` → `adapt.md`, `ux-writing.md` → `clarify.md` |
| Step 0 / Step 4 | Already present in our version (identical to upstream) |

### shape.md

| Change | Detail |
|--------|--------|
| PRODUCT.md/DESIGN.md refs (6) | Replaced with "MCP context (product overview, brand context)" equivalents |
| Section 9 file names | Updated to current naming (layout.md, animate.md, typeset.md, colorize.md) |

### polish.md

No changes. Our version already matches upstream (plus one DP-specific addition: tinted neutrals rule).

### bolder.md

| Change | Detail |
|--------|--------|
| Typography reference | `typography.md` → `typeset.md#reference-material` |
| Motion section | Replaced "Entrance choreography" + "Scroll effects" with "Hero moment" (one signature entrance, once) + "Bolder ≠ scroll-fade-rise on every section" anti-slop rule |

### codex.md

| Change | Detail |
|--------|--------|
| Example questions (2) | Updated to be more anti-slop aware (explicitly calls out cream/sand as saturated AI default) |

### PRODUCT.md/DESIGN.md Sweep

All merged files verified clean. `live.md` has 9 remaining references but is out of scope (not a priority merge file).

## Validation (Tier 2: Standard)

- ✅ Requirement 4.1: craft.md includes Step 0 (already present)
- ✅ Requirement 4.2: craft.md includes expanded Step 4 production bar (already present)
- ✅ Requirement 4.3: shape.md reflects v3.5.0 improvements
- ✅ Requirement 4.5: bolder.md reflects v3.5.0 improvements
- ✅ Requirement 4.7: No dangling references to codex.md or native image generation (graceful skip paths present)
- ✅ Requirement 4.8: All PRODUCT.md/DESIGN.md references replaced with MCP equivalents in merged files
