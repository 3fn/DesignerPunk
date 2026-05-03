# Task 3.2 Completion: Add UI Tree Convention to Integration Guide

**Date**: 2026-04-23
**Task**: 3.2 Add UI tree convention to Integration Guide
**Type**: Implementation
**Status**: Complete

---

## Artifacts Modified

- `.kiro/steering/DesignerPunk-Integration-Guide.md` — New "UI Tree Convention (Draft)" subsection

## Implementation Details

### Approach

Incorporated Leonardo's UI tree convention (`feedback/ui-tree-convention.md`) into the Integration Guide as a draft subsection within "Writing Screen Specs." Condensed the full convention doc into the essential reference material — node structure, field rules, indexer behavior, platform branching, token format, and known gaps. Marked as draft with revision expectations.

### Key Decisions

- Placed within "Writing Screen Specs" rather than as a top-level section — the convention is part of screen spec authoring guidance, not a standalone topic.
- Condensed from Leo's ~300-line doc to ~80 lines of essential reference. The full convention doc remains in `feedback/ui-tree-convention.md` for detailed rationale and worked examples.
- Omitted the "Development Guidance" and "Revision Expectations" sections from the Integration Guide — those are internal process notes, not product developer guidance. The draft status marker is sufficient.

## Validation (Tier 2: Standard)

### Syntax Validation
- ✅ Markdown renders correctly
- ✅ Table formatting valid
- ✅ Code blocks properly fenced

### Functional Validation
- ✅ Node structure documented (component, props, tokens, children, repeat)
- ✅ Platform branching rules documented (shared always traversed, platform branches conditional)
- ✅ Token reference format documented (dot-notation, stored as-is)
- ✅ Indexer behavior per node documented (what's indexed, what's ignored)
- ✅ Known gaps listed (accessibility, conditionals, slots, substitution)
- ✅ Draft status clearly marked with revision trigger (3-5 real screen specs)

### Requirements Compliance
- ✅ Req 11: Integration Guide documents UI tree convention for screen spec authoring
