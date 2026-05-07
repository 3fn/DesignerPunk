# Task 2.5 Completion: Draft Follow-up Issue for Release Tool Regressions and Gaps

**Date**: 2026-05-07
**Task**: 2.5 Draft follow-up issue for release tool regressions and gaps
**Type**: Documentation
**Status**: Complete

---

## Artifacts Created

- `.kiro/issues/2026-05-06-release-tool-regressions-and-gaps.md` (172 lines) — Consolidated issue file covering all 4 release-tool items surfaced during Spec 101 execution

## Implementation Details

### Approach

Issue file structured to match the convention Ada established in `.kiro/issues/2026-05-07-consumer-onboarding-gaps.md` (the companion file for Spec 101 consumer-handoff findings):

- Header metadata (Date, Severity, Agent, Blocks, Status, Suggested Owner)
- Context section explaining why this file exists
- Per-issue section with Location, Current behavior, Problem, Workaround applied, Suggested Fix(es)
- Cross-cutting Recommendation summarizing follow-up spec scope
- References section linking to related artifacts

Four issues covered (in order flagged):

1. **Filename regression** (`ReleasePipeline.ts:76`) — tool emits `release-X.Y.Z.md` instead of canonical `RELEASE-NOTES-X.Y.Z.md`
2. **Sidecar artifact regression** (`ReleasePipeline.ts:77-78`) — tool emits unwanted `.internal.md` and `.json` sidecars
3. **Timezone UTC bug** (`NotesRenderer.ts:20`) — tool uses `new Date().toISOString()` which returns UTC, emitting wrong dates for late-local-evening runs
4. **SummaryScanner chicken-and-egg** (`SummaryScanner.ts:26-32`) — `git log --diff-filter=A` scan of committed history can't find in-flight summary docs within a single-spec publish cycle

### Key Decisions

**Single consolidated file, not four separate files.** Per [THURGOOD R4]'s scope-expansion decision in feedback.md. Grouping keeps the "release-tool needs work" story cohesive. Fragmenting would create more surface area for future maintainers to miss.

**Kept separate from consumer-onboarding gaps.** Per [THURGOOD R5]'s Item 4 decision. The two issue files trace to different root causes (release-tool behavior vs. consumer-handoff surface area). Merging would obscure the domain boundary when scoping follow-up specs.

**Included source location references for each issue.** Each issue section includes the specific file path and line numbers where the problem originates. This converts "there's a bug" into "there's a bug at X:Y, here's the exact code, here's what it should be." Reduces future investigator effort from ~hours to ~minutes per issue.

**Preferred fixes stated where applicable.** Rather than listing all possible fixes neutrally, I identified my preferred approach for each issue with rationale. This gives the follow-up spec a starting point; it doesn't preclude the spec from choosing differently if investigation reveals better options.

**Cross-cutting root-cause analysis** at the bottom. All 4 issues share a common pattern: the tool hadn't been exercised end-to-end against real conditions until Spec 101. Prior test coverage used mocks and fake timers that structurally couldn't catch these bugs. Capturing this shared context helps the follow-up spec author an integration test that would have caught all 4 issues.

### Integration Points

- **Pairs with `.kiro/issues/2026-05-07-consumer-onboarding-gaps.md`**: both are Spec 101 follow-up captures, but for different domains. Cross-referenced in both files' References sections.
- **Supplies the future follow-up spec with ready-to-scope content**: each issue has location, workaround, and suggested fix. A Rosetta-focused follow-up spec can use this file directly as its design-outline source material.
- **Feeds Task 2.6's Civitas observations**: the "tool never exercised end-to-end until Spec 101" pattern echoes Ada's earlier observation about cross-surface knowledge propagation — another instance of "first real usage reveals what synthetic testing missed."

## Validation (Tier 1: Minimal)

### Syntax Validation
- ✅ Markdown file parses cleanly
- ✅ Code blocks use correct language hints (`typescript`)
- ✅ File path and line number references match actual source locations (verified via grep during drafting)

### Artifact Verification
- ✅ Issue file created at `.kiro/issues/2026-05-06-release-tool-regressions-and-gaps.md`
- ✅ All 4 issues documented with consistent structure
- ✅ Location references verified against source code:
  - `src/tools/release/cli/ReleasePipeline.ts:76` — filename emission line ✓
  - `src/tools/release/cli/ReleasePipeline.ts:77-78` — sidecar emission lines ✓
  - `src/tools/release/pipeline/NotesRenderer.ts:20` — UTC date construction ✓
  - `src/tools/release/pipeline/SummaryScanner.ts:26-32` — git log query ✓

### Basic Structure Validation
- ✅ Convention matches existing Spec 101 sibling issue file (`2026-05-07-consumer-onboarding-gaps.md`)
- ✅ Cross-references to related artifacts (Spec 101 completion docs, companion issue file) included
- ✅ File located correctly in `.kiro/issues/` per file organization standards

## Requirements Compliance

- ✅ Design Outline § "Scope > Out of scope" item 7 (release-tool regression flagged for follow-up): addressed with issue file capturing all 4 items
- ✅ [THURGOOD R4] Task 2.5 scope expansion (from 2 items to 4): all 4 items captured in single file
