# Inbound from Spec 121 (MCP Delivery-Layer Hardening) — for Spec 119

**Date**: 2026-06-23
**Status**: Spec 121 shipped (all 7 tasks). This note records what 121 hands to 119.

119 has the tightest coupling to 121. Three things to fold in when 119 is worked:

## 1. The Layer-1 `partial` signal now exists — formalize Decision 4a against it
121 Req 6 / Task 5 shipped the three-layer discovery confidence model. Both discovery tools (`find_docs`, keyworded `find_components`) now **emit `matchConfidence: 'strong' | 'partial' | 'none'`** as a distinct field (with `viability` and `rank` kept separate — never collapsed; see `discovery-confidence-rubric.md`).

**119 Decision 4a (Certainty Calibration Protocol) is the agent-side half** — *propose best-fit + confidence + rationale → human go/no-go* — that consumes a Layer-1 `partial`. The contract is one-directional: **121 emits the signal; 119 defines what the agent does with it.** 119 can now formalize 4a against a real, shipped signal rather than a hypothetical. (`partial` returns ranked below-threshold candidates flagged with their tier — NOT a bare empty; `none` returns the empty contract.)

## 2. New building blocks shipped — build on them, don't re-spec
- **`find_docs`** — dual-mode (concept/keyword search + paginated list/catalog). Supersedes the removed `get_documentation_map` (which broke at ~78K chars).
- **Section addressing** — `get_section` now takes optional `parent` + stable `sectionId`, returns `siblingHeadings` (the Finding-1 stub-under-retrieval cue), and a non-unique heading with no disambiguator returns a structured ambiguity prompt instead of a silent first-match.
- **The summary-first rule** is encoded as an importable `WORKFLOW_RULES` constant (`mcp-server/src/rules/workflow-rules.ts`) — 119/122 propagate it; it's a hard rule, not agent diligence.

## 3. Amendment to reconcile: the Documentation-Directory decision
121 Req 1 **amended** 119's Documentation-Directory decision. `find_docs` (concept search + paginated catalog) subsumes what `get_documentation_map` did, so a *separate* documentation-directory mechanism may now be unnecessary or redundant. 119 should revisit that decision in light of `find_docs`.

## Caveats / open items 121 leaves
- Positional `sectionId` is stable to heading rewording but NOT to reorder/insert-before (roadmap Gap 7 — source-embedded IDs the durable fix).
- The summary-first cross-spec note: 121 *encodes* the rule; 122 *propagates* it into generated prompts.
