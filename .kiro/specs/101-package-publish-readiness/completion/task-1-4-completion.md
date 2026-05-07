# Task 1.4 Completion: Update Authoritative Steering Docs with Correct Package Name

**Date**: 2026-05-06
**Task**: 1.4 Update authoritative steering docs with correct package name
**Type**: Implementation
**Status**: Complete

---

## Artifacts Created

Modified 9 steering docs (no new files created). Scope expanded from the 5 files originally listed in the task:

**Originally scoped (5 files, 41 references):**
- `.kiro/steering/DesignerPunk-Integration-Guide.md` — 35 references (the authoritative consumer guide)
- `.kiro/steering/Rosetta-System-Architecture.md` — 3 references
- `.kiro/steering/component-mcp-query-guide.md` — 1 reference
- `.kiro/steering/Token-Quick-Reference.md` — 1 reference
- `.kiro/steering/Token-Governance.md` — 1 reference

**Discovered during execution (4 additional files, 4 references — all orphan scope):**
- `.kiro/steering/Component-Development-Guide.md` — 1 reference (`@designerpunk/tokens/ThemeAwareBlendUtilities`)
- `.kiro/steering/A Vision of the Future.md` — 1 reference (`@designerpunk/tokens`)
- `.kiro/steering/Token-Family-Layering.md` — 1 reference (`@designerpunk/tokens`)
- `.kiro/steering/Token-Family-Blend.md` — 1 reference (`@designerpunk/tokens/ThemeAwareBlendUtilities`)

**Total**: 9 files, 45 references reconciled to `@3fn/core`.

**Last Reviewed metadata updates** (8 of 9 files — see note below):
- DesignerPunk-Integration-Guide.md: 2026-04-08 → 2026-05-06
- Rosetta-System-Architecture.md: 2026-01-25 → 2026-05-06
- Component-Development-Guide.md: 2026-01-13 → 2026-05-06
- A Vision of the Future.md: 2025-12-15 → 2026-05-06
- Token-Family-Layering.md: 2025-12-30 → 2026-05-06
- Token-Quick-Reference.md: 2026-04-23 → 2026-05-06
- Token-Family-Blend.md: 2025-12-30 → 2026-05-06
- Token-Governance.md: 2026-01-25 → 2026-05-06

## Implementation Details

### Approach

Executed in two passes:

**Pass 1 (Originally scoped files, simple rename):** For the 5 files that used `@designerpunk/core` exclusively, used strReplace with `replaceAll: true` on the exact string `@designerpunk/core` → `@3fn/core`. This handled 41 of the 45 references in a deterministic bulk operation.

**Pass 2 (Discovered orphan-scope files, targeted rename):** For the 4 files that used `@designerpunk/tokens` (orphan scope from the multi-package architecture that never shipped), used targeted strReplace with exact import-statement context to replace `@designerpunk/tokens` / `@designerpunk/tokens/X` with `@3fn/core` / `@3fn/core/X`. This preserved the subpath structure while reconciling the scope.

**Pass 3 (Metadata):** Updated `Last Reviewed` dates on all 8 files that had the field, to `2026-05-06`. One file (`component-mcp-query-guide.md`) lacked the field entirely — flagged as a separate Civitas metadata compliance issue rather than adding it in this task.

### Key Decisions

**Scope expansion accepted mid-execution rather than deferred.** The 4 additional files had drift in the orphan `@designerpunk/tokens` scope. These files are in `.kiro/steering/` — the drift detection scan scope. Leaving them unresolved would have caused Parent 1's success criterion ("drift detection passes against live reconciled state") to fail. Expanding the task scope mid-execution was the least-disruptive path; the alternative (fixing them in a separate task or declaring them out-of-scope) would have either created an artificial boundary or blocked Parent 1 completion.

**Scope-level fix only; subpath correctness deferred to Ada.** The 4 orphan-scope files use import statements with subpaths that may not exist in the current `@3fn/core` exports map. Example: `@3fn/core/ThemeAwareBlendUtilities` assumes a subpath that the current exports map doesn't define — the actual blend module exports from `@3fn/core/blend`. Resolving subpath correctness requires architecture knowledge (current exports map structure, which named exports come from which subpaths) that falls in Ada's domain. Chose to fix scope only and flag subpath concerns for Ada's verification rather than guess and potentially introduce syntactically-valid-but-functionally-broken imports.

**Metadata field absence flagged, not patched.** `component-mcp-query-guide.md` lacks the `Last Reviewed` field. Adding the field in this task would be scope creep — it's a metadata completeness issue, not a name reconciliation issue. Flagged for separate Civitas follow-up so the pattern can be reviewed across all steering docs.

### Integration Points

- The Integration Guide (35 refs) is the most consumer-facing of these changes. Post-rename, any product developer following the guide will see correct `@3fn/core` references consistently throughout the install, configure, and consume workflow.
- Steering docs with code examples (Component-Development-Guide, A Vision of the Future, Token-Family-Layering, Token-Family-Blend) now show `@3fn/core` imports, though subpath correctness still needs Ada's verification.
- Token-Quick-Reference's `@3fn/core` context reference to where base theme files ship is now consistent with package reality.
- Rosetta-System-Architecture's pipeline description now correctly identifies `@3fn/core/config` as the configuration export path.

## Validation (Tier 2: Standard)

### Syntax Validation
- ✅ All 9 files remain valid Markdown
- ✅ No broken internal section links introduced
- ✅ Code block syntax preserved (backticks, language hints, import statement structure)
- ✅ YAML frontmatter metadata (where present) intact

### Functional Validation
- ✅ Grep verification against `.kiro/steering/`: zero matches for `@designerpunk/(core|tokens|components)` post-edit
- ✅ Replacement count verification: 35+3+1+1+1+1+1+1+1 = 45 references, matching pre-edit grep count
- ✅ `Last Reviewed` date format preserved (YYYY-MM-DD throughout the 8 updates)

### Integration Validation
- ✅ Integration Guide reads coherently as a complete install-to-consume walkthrough with consistent package naming
- ✅ Code examples in the 4 orphan-scope files show scope-correct imports (subpath correctness is a separate concern, documented below)
- ✅ Cross-references within the Integration Guide between sections (e.g., "Available Imports" table vs. install commands) are now internally consistent at `@3fn/core`
- ✅ No references to unmodified historical files were broken (spec history docs, completion docs, release notes remain linkable and accurate)

### Requirements Compliance
- ✅ Design Outline § "Scope > In scope" item 1 (active authoritative steering docs): addressed, scope expanded to 9 files
- ✅ Design Outline § "Scope > In scope" item 1 orphan-scope reconciliation: scope-level addressed; subpath correctness deferred to Ada
- ✅ Design Outline § "Open questions" item 5 (Last Reviewed date updates): addressed on 8 of 9 files

## Findings for Completion Documentation

Two observations worth capturing in Task 2.6's parent completion doc:

1. **Metadata compliance gap**: `component-mcp-query-guide.md` lacks the `Last Reviewed` field required for steering docs per Civitas process. Adding the field is outside spec 101's scope (name reconciliation) but warrants a separate Civitas metadata audit pass — other steering docs may also be non-compliant.

2. **Subpath correctness questions for Ada verification**: Four active steering docs contain code-example imports with `@3fn/core` subpaths that may not resolve correctly against the current `exports` map:
   - `Component-Development-Guide.md:1083` — `import { getBlendUtilities } from '@3fn/core/ThemeAwareBlendUtilities';` (possibly should be `from '@3fn/core/blend'` with named import)
   - `A Vision of the Future.md:341` — `import { space, colors } from '@3fn/core';` (unclear if tokens-as-values are a supported import pattern; may need CSS custom property pattern instead)
   - `Token-Family-Layering.md:77` — `import { zIndexTokens } from '@3fn/core';` (same as above)
   - `Token-Family-Blend.md:89` — `} from '@3fn/core/ThemeAwareBlendUtilities';` (same subpath concern as Component-Development-Guide)
   
   These were pre-existing bugs (the `@designerpunk/tokens` packages they referenced never existed either). Spec 101 fixed the scope; Ada should verify and fix the subpaths/import patterns in a follow-up pass.
