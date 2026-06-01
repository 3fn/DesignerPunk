# Task 1 Parent Completion: Merge SKILL.md General Rules and Anti-Slop Updates

**Date**: 2026-06-01
**Task**: 1. Merge SKILL.md General Rules and Anti-Slop Updates
**Type**: Parent
**Status**: Complete

---

## Summary

Merged Impeccable v3.5.0's craft improvements into our DesignerPunk-adapted SKILL.md. Added a "Design guidance" section with general rules (contrast, typography, layout, motion, interaction, copy), expanded Absolute Bans from 6 to 11 items with full match-and-refuse format, added an AI slop test section with two-altitude category-reflex checks, added color strategy vocabulary for brand register, and rewrote the no-argument routing logic to use MCP queries instead of file-based scripts.

## Subtask Summary

| Subtask | What | Requirements Covered |
|---------|------|---------------------|
| 1.1 | Merged 20 general rules into new Design guidance section | 1.1–1.6 |
| 1.2 | Expanded Absolute Bans, added AI slop test + color strategy | 2.1–2.6 |
| 1.3 | Rewrote routing logic for MCP-based context-aware recommendations | 5.1–5.5 |

## Success Criteria Verification

| Criterion | Status | Evidence |
|-----------|--------|----------|
| All v3.5.0 general rules merged into Design guidance section | ✅ | § Design guidance contains Color, Typography, Layout, Motion, Interaction, Copy subsections |
| All anti-slop improvements merged into Absolute bans and AI slop test | ✅ | § Absolute Bans has 11 items; § AI slop test has first-order + second-order checks |
| No-argument routing logic rewritten for MCP context | ✅ | § Routing Rules rule 1 uses get_product_overview(), find_screens(), git status |
| DesignerPunk Design Laws intact and unmodified | ✅ | Spacing, Color, Typography, Motion, Elevation sections unchanged |
| Conflict Resolution hierarchy intact | ✅ | Priority 1–5 unchanged |
| MCP-based context loading unchanged | ✅ | § Setup > Context Loading unchanged |

## Architecture Impact

- **Version**: 1.0.0 → 1.1.0
- **New sections**: Design guidance (with 6 subsections), AI slop test, New projects only
- **Expanded sections**: Absolute Bans (6 → 11 items, terse → full format)
- **Rewritten sections**: Routing Rules (static → context-aware)
- **Unchanged sections**: Setup, Context Loading, Register, all Design Laws (Spacing/Color/Typography/Motion/Elevation), Conflict Resolution, Commands table, DesignerPunk-Specific Additions

## Files Modified

- `.kiro/skills/impeccable/SKILL.md` — primary artifact (all changes)
