# Task 6 Completion: Section Addressing by Path+Parent / Stable IDs + Summary-First

**Date**: 2026-06-23
**Task**: 6. Section Addressing by Path+Parent / Stable IDs + Summary-First (Req 5)
**Type**: Parent
**Status**: Complete
**Agent**: Thurgood (docs MCP, Opus) — the stable-ID design + summary-first encoding are genuine design judgment. Peter accepted the positional sectionId scheme; the source-embedded-ID alternative is captured as a roadmap gap.

---

## Artifacts Created / Modified

- `mcp-server/src/indexer/section-parser.ts` — structural heading model: `parseHeadingTree`, `makeSectionId`/`parseSectionId`, `computeSiblingHeadings`, `findHeadingOccurrences`, `resolveSection` (+ `extractSection` kept as a back-compat first-match wrapper now carrying `sectionId`/`siblingHeadings`).
- `mcp-server/src/rules/workflow-rules.ts` (new) — the machine-consumable summary-first rule artifact (`WORKFLOW_RULES`).
- `mcp-server/src/models/Section.ts` — optional `sectionId?` + `siblingHeadings?` (additive).
- `mcp-server/src/indexer/DocumentIndexer.ts` — `getSection` delegates to new `getSectionAddressed` (routes through `resolveSection`, throws typed `AmbiguousHeading` for non-unique headings).
- `mcp-server/src/query/QueryEngine.ts` — `getSection(path, heading, opts?)` with optional `{ parent?, sectionId? }`.
- `mcp-server/src/tools/get-section.ts` + `index.ts` + `tools/index.ts` — `parent`/`sectionId` input schema, `GetSectionAmbiguous` result + guard, back-compat handler overload, `WORKFLOW_RULES` re-export, summary-first cue in the tool description.
- New/updated tests across `section-parser`, `get-section`, `DocumentIndexer`, and three integration suites (narrowing-guard updates).
- `.kiro/steering/MCP-Evolution-Roadmap.md` — **Gap 7: Source-Embedded Stable Section IDs** (the durable alternative to positional IDs; Peter-approved roadmap capture, ballot-measure).

## Implementation Details

### 6.1 — `parent` + stable `sectionId` disambiguation
- **`parent`** (optional): disambiguates a non-unique heading by parent-heading context.
- **`sectionId`** (optional): **positional** — `s{index}`, the heading's 0-based document-order position among parsed H2/H3 headings. **Stable to heading-string drift** (Finding 2's exact rename case) and to body/sibling edits; **NOT stable to reorder / insert-before** (indices shift). Design rationale: no read-only scheme is stable to both rewording and reordering — a text-slug breaks on rewording (failing Finding 2), and source-embedded IDs require mutating the corpus (out of 121 scope). Positional satisfies Req 5.2's named intent; the durable source-embedded alternative is **roadmap Gap 7**. **Peter accepted the positional scheme.**
- **Ambiguity handling (Finding 3):** a non-unique heading with no `parent`/`sectionId` returns a structured `{ ambiguous: { candidates: [{ sectionId, parent, index }] } }` (NOT `isError`) — a disambiguation prompt, not a silent first-match.

### 6.2 — `siblingHeadings` cue + summary-first rule
- **`siblingHeadings: string[]`** on the `get_section` response: the headings sharing the target's parent, so a stub/preamble carries a cue that substantive siblings exist (Finding 1 — the under-retrieval that reproduced during this spec's own formalization).
- **Summary-first encoding (Req 5.3/5.5):** `WORKFLOW_RULES` — a typed, exported constant (`id: 'summary-first'`, `severity: 'hard'`, `appliesToTools`, prompt-ready `statement`, `rationale`, `requirements`), re-exported from the package entry so Spec 122's generator can `import` it and render the rule into every generated prompt from one source of truth. A one-line cue is also in the tool description for the in-context reminder. 121 encodes; 122 propagates.

## Validation (Tier 3: Comprehensive)

✅ `parent` + stable `sectionId` disambiguate a non-unique heading unambiguously (Req 5.1)
✅ `sectionId` resolves the same logical section across a heading rewording (Req 5.2 / Finding 2) — tested with a simulated rename + re-index
✅ Ambiguous heading (no disambiguator) signals candidates instead of silent first-match (Finding 3)
✅ `siblingHeadings` surfaces the adjacency cue on a stub (Finding 1) — worked example tested
✅ Summary-first rule encoded as an importable, structured artifact propagatable by Spec 122 (Req 5.5)
✅ Back-compat: unique-heading `get_section` unchanged (+ additive `sectionId`/`siblingHeadings`); handler keeps both call shapes
✅ `tsc` clean; docs-MCP suite **520 tests pass** (serial)

## Requirements Compliance

✅ Req 5.1–5.5 (path+parent / stable ID disambiguation, ID stable to heading drift, summary-first hard rule, sibling cue, 122-propagatable encoding)

## Notes / Follow-ups

- **Positional `sectionId` limitation** → captured as **roadmap Gap 7** (source-embedded durable IDs); low priority, triggers when consumers persist IDs across structural edits.
- **Intended behavior change:** non-unique-heading `get_section` now signals ambiguity (Finding 3 fix) rather than returning the first match. No existing test encoded the old footgun; the only test edits were call-shape modernization + union-narrowing guards (runtime assertions unchanged).
- **ts-jest vs tsc:** ts-jest type-checks test files (tsc excludes them), which flagged the result-union narrowing — worth knowing a `tsc`-only gate would miss it.

## Related Documentation

- [Task 6 Summary](../../../../docs/specs/121-claude-code-portability/task-6-summary.md)
