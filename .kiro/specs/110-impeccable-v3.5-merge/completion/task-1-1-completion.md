# Task 1.1 Completion: Merge Contrast, Typography, Copy, Layout, and Motion Rules

**Date**: 2026-06-01
**Task**: 1.1 Merge contrast, typography, copy, layout, and motion rules
**Type**: Implementation
**Status**: Complete

---

## Artifacts Modified

- `.kiro/skills/impeccable/SKILL.md` — Added "Design guidance" section (§ General rules, § Copy), bumped version to 1.1.0, added upstream-merge annotation

## Implementation Details

### Approach

Added a new "## Design guidance" section between "## DesignerPunk Design Laws" (which contains system-specific overrides) and "## Commands" (which lists available commands). This placement ensures the Conflict Resolution hierarchy is clear: Design Laws (Priority 2) appear first and override Design guidance (Priority 4 — Impeccable domain knowledge) where they conflict.

### Rules Merged

**Color (§ General rules > Color):**
- Contrast verification: 4.5:1 body text, 3:1 large text (≥18px or bold ≥14px), 4.5:1 placeholder text
- Gray-on-colored-background guidance

**Typography (§ General rules > Typography):**
- Hero/display heading ceiling: clamp() max ≤ 6rem
- Display heading letter-spacing floor: ≥ -0.04em
- `text-wrap: balance` on h1–h3, `text-wrap: pretty` on prose
- Font-family count cap at 3
- Font pairing guidance (contrast axis, not similarity)
- No all-caps body copy
- Hierarchy through scale + weight contrast (≥1.25 ratio)

**Layout (§ General rules > Layout):**
- Vary spacing for rhythm
- Cards guidance (lazy answer, nested cards always wrong)
- Semantic z-index scale (dropdown → sticky → modal-backdrop → modal → toast → tooltip)

**Motion (§ General rules > Motion):**
- Stagger guidance (uniform reflex is the tell, not motion itself)
- Reveal animations must enhance already-visible default
- Premium motion materials vocabulary (blur, backdrop-filter, clip-path, mask, shadow/glow)

**Interaction (§ General rules > Interaction):**
- Dropdown overflow-hidden warning (position: absolute inside overflow: hidden/auto)

**Copy (§ Copy):**
- Every word earns its place
- Em-dash ban
- Aphoristic-cadence ban
- Marketing buzzword ban
- Button labels: verb + object
- Link text: standalone meaning

### Rules Deliberately Excluded

| Upstream Rule | Reason for Exclusion |
|---------------|---------------------|
| Body line length 65-75ch | Already in DesignerPunk Design Laws § Typography |
| Expo-out curves | Already in DesignerPunk Design Laws § Motion |
| Reduced motion | Already in DesignerPunk Design Laws § Motion |
| Flexbox for 1D / Grid for 2D | Too web-specific for cross-platform context |
| `repeat(auto-fit, minmax(280px, 1fr))` | Too web-specific for cross-platform context |
| "Don't animate CSS layout properties" | Too web-specific for cross-platform context |
| "Use libraries for advanced motion" | Too implementation-specific; platform agents decide tooling |

### Version Annotation

- Bumped `version` from `1.0.0` to `1.1.0`
- Added `upstream-merge: Impeccable v3.5.0 (2026-06-01)` field to YAML frontmatter

## Conflict Verification

Systematically verified all 20 merged rules against existing DesignerPunk Design Laws. No conflicts found. All new rules are complementary:

- Contrast verification complements Color law (which governs token selection, not ratio verification)
- Typography constraints complement Typography law (which governs font families, not size/spacing limits)
- Layout rules complement Spacing law (which governs grid system, not z-index or card patterns)
- Motion rules complement Motion law (which governs curves/physics, not materials vocabulary)
- Copy rules have no overlap with any existing law

The Conflict Resolution hierarchy remains intact. If a future scenario arises where a Design guidance rule contradicts a Design Law, the Design Law wins (Priority 2 > Priority 4).

## Validation (Tier 2: Standard)

- ✅ All merged rules present in SKILL.md § Design guidance
- ✅ No duplication with existing DesignerPunk Design Laws
- ✅ Version annotation present in frontmatter
- ✅ Conflict Resolution hierarchy unchanged
- ✅ MCP-based context loading unchanged
- ✅ Document structure valid (proper heading hierarchy, no orphaned sections)
- ✅ Requirements coverage: 1.1 (contrast), 1.2 (typography), 1.3 (copy), 1.4 (motion), 1.5 (layout), 1.6 (conflict precedence)
