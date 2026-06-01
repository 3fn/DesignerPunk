# Task 4 Completion: Update Brand Register Reference

**Date**: 2026-06-01
**Task**: 4. Update Brand Register Reference (parent) / 4.1 Add reflex-reject content (subtask)
**Type**: Parent + Implementation (single subtask)
**Status**: Complete

---

## Artifacts Modified

- `.kiro/skills/impeccable/reference/brand-dp.md` — Added § Reflex-Reject Lists (font list, aesthetic lanes, identity-preservation clause)

## Implementation Details

Added a new "## Reflex-Reject Lists" section between Typography and Color, containing:

1. **Scope note** — Explicitly states this applies only to brand register surfaces where DesignerPunk's type system is not the constraint (portfolio, marketing, presentations). Product register exclusion is double-stated: in the scope note AND in the existing Typography section ("Do not select new fonts").

2. **Reflex-reject font list** (23 fonts) — Training-data defaults to avoid: Fraunces, Newsreader, Lora, Crimson (3 variants), Playfair Display, Cormorant (2 variants), Syne, IBM Plex (3 variants), Space Mono/Grotesk, Inter, DM Sans/Serif (3 variants), Outfit, Plus Jakarta Sans, Instrument Sans/Serif.

3. **Reflex-reject aesthetic lanes** — Currently saturated: editorial-typographic (display serif + mono labels + ruled separators + monochromatic restraint). Note about future additions (brutalist-utility, acid-maximalism when they saturate).

4. **Identity-preservation clause** — Existing committed fonts/lanes win over the reflex-reject list. Lists are for greenfield decisions and departure-mode variants only.

## Success Criteria Verification

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Reflex-reject font list present with scope note | ✅ | § Reflex-Reject Lists > font list (23 fonts) with scope blockquote |
| Reflex-reject aesthetic lanes present | ✅ | § Reflex-Reject Lists > aesthetic lanes (editorial-typographic) |
| Product register explicitly excluded | ✅ | Scope note + Typography section "Do not select new fonts" |
| Existing DesignerPunk brand content preserved | ✅ | All existing sections unchanged |

## Validation (Tier 2: Standard)

- ✅ Requirement 6.1: Reflex-reject font list present (23 fonts)
- ✅ Requirement 6.2: Reflex-reject aesthetic lanes present
- ✅ Requirement 6.3: Product register excluded from font selection
- ✅ Requirement 6.4: Scope note present
- ✅ Requirement 6.5: Identity-preservation clause present (existing committed fonts win)
