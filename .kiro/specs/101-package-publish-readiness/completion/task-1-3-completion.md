# Task 1.3 Completion: Update Agent Prompts with Correct Package Name

**Date**: 2026-05-06
**Task**: 1.3 Update agent prompts with correct package name
**Type**: Implementation
**Status**: Complete

---

## Artifacts Created

Modified 7 agent prompt files (no new files created):

- `.kiro/agents/ada-prompt.md` — 1 reference updated (line 23, domain description)
- `.kiro/agents/lina-prompt.md` — 1 reference updated (line 25, domain description)
- `.kiro/agents/sparky-prompt.md` — 2 references updated (lines 33, 46, consumption pattern description)
- `product-template/agents/sparky-prompt.md` — 2 references updated (lines 16-17, Web consumption imports)
- `product-template/agents/kenya-prompt.md` — 1 reference updated (line 33, iOS file path)
- `product-template/agents/data-prompt.md` — 1 reference updated (line 34, Android file path)
- `product-template/agents/README.md` — 2 references updated (line 3 purpose, line 12 copy command)

Total: 11 references reconciled from `@designerpunk/core` to `@3fn/core`.

## Implementation Details

### Approach

Straight-forward mechanical renames. For each file, obtained exact line context via grep with surrounding text to ensure strReplace targets the specific line, then replaced `@designerpunk/core` with `@3fn/core` preserving all surrounding markdown formatting, backticks, and punctuation.

All 7 files used `@designerpunk/core` exclusively — no orphan-scope references (`@designerpunk/tokens`, `@designerpunk/components`) were present in this subset.

### Key Decisions

**Targeted strReplace over bulk replaceAll**: Used strReplace with specific surrounding context for each reference rather than replaceAll across all files. Rationale: ensures no unintended matches in commentary or examples that happened to contain the string. For a scope as small as 11 references across 7 files, targeted replacement is more auditable than bulk.

**Preserve prompt personality and voice**: All edits touched only the exact `@designerpunk/core` string. Surrounding prose (agent domain descriptions, consumption patterns, file path instructions) was not reworded. Agent prompts are consumed directly by AI agents — even small prose changes could affect agent behavior in subtle ways.

### Integration Points

- The `.kiro/agents/` prompts are loaded when Peter runs a corresponding agent session. Post-rename, agents reading their own prompt will see `@3fn/core` and align their communication with the correct package name.
- The `product-template/agents/` prompts are copied by consumers into their product repo via the Integration Guide's `cp -r node_modules/@3fn/core/product-template/agents/ .kiro/agents/` command (which Task 1.3 also updated). Correct references in these templates ensure downstream consumer agents have accurate package context from day one.
- No file dependencies modified; other subtasks can proceed independently.

## Validation (Tier 2: Standard)

### Syntax Validation
- ✅ All files remain valid Markdown (no structural breakage from edits)
- ✅ No broken internal links introduced (links in these files don't reference the changed string)
- ✅ All backtick-delimited code references preserved (backticks intact before and after `@3fn/core`)

### Functional Validation
- ✅ Grep verification: `grep @designerpunk/(core|tokens|components) .kiro/agents/ product-template/` returns zero matches post-edit
- ✅ Count verification: 11 references replaced, matching pre-edit grep count
- ✅ Each replaced string verified against pre-edit exact context (no partial matches, no false positives)

### Integration Validation
- ✅ Markdown rendering unaffected (backticks, punctuation, paragraph structure preserved)
- ✅ Lina-prompt and Ada-prompt domain descriptions read coherently post-edit
- ✅ Sparky-prompt consumption pattern examples render as valid import statements
- ✅ Product-template README's `cp` command points to correct node_modules path

### Requirements Compliance
- ✅ Design Outline § "Scope > In scope" item 1 (consumer-facing artifacts: product-template/agents prompts, product-template/agents/README.md): addressed
- ✅ Design Outline § "Scope > In scope" item 1 (local development agent prompts: .kiro/agents/): addressed

## Notes

No orphan-scope (`@designerpunk/tokens`, `@designerpunk/components`) references were encountered in this task's scope. All 11 references were `@designerpunk/core` and mapped directly to `@3fn/core`. This was the simplest of the three doc-track subtasks.
