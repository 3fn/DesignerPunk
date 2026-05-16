# Task 5.2 Completion: Adapt Brand and Product Register References

**Date**: 2026-05-16
**Task**: 5.2 Adapt brand and product register references
**Type**: Implementation
**Status**: Complete

---

## Artifacts Created

- `.kiro/skills/impeccable/reference/brand-dp.md` — DesignerPunk brand register (81 lines)
- `.kiro/skills/impeccable/reference/product-dp.md` — DesignerPunk product register (79 lines)
- `.kiro/skills/impeccable/reference/extract-dp.md` — Token governance-aware extraction (43 lines)

## Implementation Details

### Approach

Rewrote Impeccable's brand.md and product.md register references from scratch for DesignerPunk's values rather than patching the originals. This ensures no residual Impeccable opinions leak through. The extract.md was adapted to enforce DesignerPunk's token governance (no autonomous creation, formula validation, proposal format).

### Key Decisions

**brand-dp.md:**
- Committed/Full Palette as default color strategy (not Restrained)
- Fonts are system-defined (no font selection procedure, no reflex-reject list)
- Glow effects as brand permission (surface layering, complementary pairings)
- `//` section markers and `<!--` logo as brand visual language
- Anti-slop test reframed: "generic AI startup" is the failure mode, not "generic AI output"

**product-dp.md:**
- Restrained as default color strategy
- Figtree/Commit Mono/Rajdhani as product fonts (NOT system fonts — differs from Impeccable's product.md which allows system fonts)
- MCP-driven component selection integrated into the register
- Semantic spacing tokens referenced by category name

**extract-dp.md:**
- No autonomous token creation (all extractions are proposals)
- Formula Rule enforced (values must align with 8px grid or existing formulas)
- Governance autonomy levels applied (semantic=free, primitive=needs acknowledgment, component=needs approval)
- Structured proposal output format for human review

## Validation (Tier 2: Standard)

### Syntax Validation
✅ All three files are valid markdown
✅ No broken references or links

### Functional Validation
✅ brand-dp.md references correct color roles (cyan=action, purple=tech, pink=error, green=success, orange=warning, teal=info)
✅ product-dp.md references correct semantic spacing categories (grouped/related/separated/sectioned/inset)
✅ extract-dp.md enforces token governance autonomy levels correctly
✅ No conflicts with DesignerPunk's token system values

### Integration Validation
✅ Register references are loadable from the skill loading sequence (step 7)
✅ File naming convention (`*-dp.md`) distinguishes adapted from original Impeccable files
✅ extract-dp.md aligns with Core Goals token governance rules

### Requirements Compliance
✅ Requirement 4.2: Typography guidance respects Figtree/CommitMono
✅ Requirement 4.3: Spatial guidance respects 8px baseline grid
✅ Requirement 4.4: Motion guidance respects platform-specific motion (spring iOS, expo-out web/Android)
✅ Requirement 4.5: Color guidance respects existing palette and semantic tokens
