# Task 6 Summary: Section Addressing + Summary-First

**Date**: 2026-06-23
**Purpose**: Concise summary of Spec 121 Task 6 completion
**Organization**: spec-summary
**Scope**: 121-claude-code-portability

## What Was Done

Fixed the highest-severity behavioral risk the dry-run found — `get_section` silently under-retrieving a stub when the substance lives under a sibling heading:
- `get_section` gains optional `parent` and a stable `sectionId` so a non-unique heading is addressable to a specific occurrence; a non-unique heading with no disambiguator now returns a disambiguation prompt (candidate parents + IDs) instead of silently picking the first match.
- `sectionId` is positional (`s{index}`) — stable to heading *rewording* (the named Finding 2 case); the durable source-embedded alternative is captured as a roadmap gap.
- `get_section` now returns `siblingHeadings` so a stub carries a cue that more exists.
- The summary-first workflow rule is encoded as an importable typed constant (`WORKFLOW_RULES`) that Spec 122's generator can propagate into every agent prompt from one source of truth.

## Why It Matters

Finding 1 — a single-query agent retrieving a preamble stub and returning it as if complete, with no signal that the real content is one heading over — is the confident-wrong failure that reproduced *during this very spec's formalization*. The `siblingHeadings` cue + the hard summary-first rule close it. Findings 2 (heading-string drift) and 3 (ambiguous non-unique headings) are closed by the stable `sectionId` and the ambiguity signal. All additive: unique-heading retrieval is unchanged.

## Key Changes

- `mcp-server/src/indexer/section-parser.ts` — structural heading tree, positional `sectionId`, sibling computation, `resolveSection`.
- `mcp-server/src/rules/workflow-rules.ts` (new) — `WORKFLOW_RULES` summary-first artifact.
- `get_section` gains `parent`/`sectionId` params + `siblingHeadings` + structured ambiguity result.
- Roadmap Gap 7 records the source-embedded-ID future enhancement.

## Impact

- ✅ Finding 1 (stub under-retrieval) — sibling cue + hard summary-first rule
- ✅ Finding 2 (heading drift) — positional `sectionId` stable to rewording
- ✅ Finding 3 (ambiguous heading) — disambiguation prompt, not silent first-match
- ✅ Summary-first encoded for Spec 122 to propagate
- ✅ Additive; tsc clean; 520 docs-MCP tests pass
- Note: positional IDs drift on reorder/insert-before → roadmap Gap 7 (source-embedded IDs) for the durable fix

---

*For detailed implementation notes, see [task-6-parent-completion.md](../../../.kiro/specs/121-claude-code-portability/completion/task-6-parent-completion.md)*
