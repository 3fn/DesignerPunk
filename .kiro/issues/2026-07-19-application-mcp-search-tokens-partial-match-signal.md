# Application MCP `search_tokens` Returns Partial-Name Matches With No Match-Quality Signal

**Date**: 2026-07-19
**Discovered during**: Spec 119-B requirements feedback round (main-loop verification probe, 2026-07-18)
**Reporters**: Claude (main-loop verification); scenario first hypothesized by Ada ([ADA R2], 119-B feedback)
**Severity**: Low — double-mitigated: token *selection* is independently gated by token-governance checkpoints, and the certainty-calibration rule's step 3 ("when still unsure, surface it") is tool-agnostic
**Type**: Application MCP token search (match-quality signaling, NOT search correctness)
**Primary owner**: Ada (ownership accepted on the record — [ADA R3], 119-B feedback/requirements.md)
**Status**: Open — **LATER**: take up after 119-B's design phase settles the calibration-propagation prose (so the new signal lands against settled prose, not a moving target). No hard trigger; a natural slot is any Ada Application-MCP session touching the search/index surface.
**Owner**: Ada *(added 2026-10-20, Ada, site 9 of ballot 2026-10-20-manual-records-routed-readers)*
**Trigger**: `manual` — closes at its fixing PR's merge, which carries the grant over the Application MCP files it edits (rule 10), since `application-mcp-server/**` is outside Ada's standing write scope. It bundles with `2026-06-24-mcp-semantic-resolvedvalue-ignores-mode-overrides.md`: one fixing PR for both. *(Re-ruled 2026-10-27, Ada, rules 1, 9 and 11, after the lapse below. Same reason as the sibling: the `path:` on `TokenIndexer.ts` fired on two edits that did not touch `search`.)* *(was: `path:application-mcp-server/src/indexer/TokenIndexer.ts` — the next change to the token reader whose `search` (L193) returns the partial match with no signal; the Status line's "natural slot" made an event. It bundles with `2026-06-24-mcp-semantic-resolvedvalue-ignores-mode-overrides.md`, the sibling this record names. *(Set 2026-10-20, Ada, rules 1 and 9. It replaces the Status line's "No hard trigger"; that line stays as written.)*)*
**Class**: P3 improvement · defect *(set 2026-10-20, Ada, rule 12. The record's own double-mitigation stands: token selection is gated independently by the token-governance checkpoints, and the certainty-calibration rule's step 3 is tool-agnostic.)*

---

## Summary

`search_tokens` performs partial-name matching but emits no signal distinguishing an exact hit from a partial one. Demonstrated live (2026-07-18):

```
search_tokens({ name: "space10" })   ← token "space10" does not exist
→ [ { name: "space100", ... } ]      ← silently returns the adjacent token, no partial-match marking
```

An agent querying for a token that doesn't exist receives a plausible-but-wrong neighbor with nothing marking it as inexact. Contrast the docs MCP and keyworded `find_components`, which both emit the full three-layer discovery signal (`matchConfidence: strong|partial|none` + `matchedOn` + `rank`, Spec 121).

## Why this is deferred (not fixed in 119-B)

Spec 119-B formalized the certainty-calibration rule **signal-scoped**: it binds "surfaces that emit `matchConfidence`" (119-B requirements.md § Requirement 8 AC3). `search_tokens` is deliberately out of that scope per Ada's adjudication ([ADA R2] counter-argument, confirmed [ADA R3]): the Application-MCP calibration analog should **arrive as its own emitted signal, formalized then — not as unanchored prose now**. Teaching agents to imagine a confidence tier the tool doesn't emit would manufacture epistemics; the fix is engineering, then formalization.

## Recommended disposition

Add a match-quality indicator to `search_tokens` partial-name results. Options, roughly in ascending ambition:
(a) a minimal `matchType: exact | partial` field on each result;
(b) the full Spec-121 three-layer signal (`matchConfidence`/`matchedOn`/`rank`), consistent with `find_docs` and keyworded `find_components`.

Option (b) has a built-in payoff: 119-B's signal-scoped calibration boundary **extends to the tool automatically** the moment it emits `matchConfidence` — zero prose edits required (the enumeration in R8 AC3 is explicitly illustrative; signal emission is the operative test). Option (a) is cheaper but leaves the tool outside the calibration contract. Design call is Ada's, with Peter's review per token-governance norms.

## Cross-References

- 119-B out-of-scope record: `.kiro/specs/119-B-capability-routing-measurement/requirements.md` § "Introduction" (Out of scope)
- Adjudication + ownership record: `.kiro/specs/119-B-capability-routing-measurement/feedback/requirements.md` [ADA R2], [ADA R3], [MAIN-LOOP R1]
- The shipped three-layer signal this would join: Spec 121 (`discovery-confidence-rubric.md`); live on `find_docs` and keyworded `find_components` (probes 2026-07-16/18)
- Sibling Ada-owned Application-MCP item (candidate to bundle in one issue-driven session): `.kiro/issues/2026-06-24-mcp-semantic-resolvedvalue-ignores-mode-overrides.md`

**Walk 2026-10-20 (Thurgood, walk line under rule 9; ledger `archive/TRIAGE-2026-10-20.md` row 14, call BACK-FILL)**: this record lacks the rule-1 Trigger token (`**Trigger**: ` followed by one of `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual`) and the rule-12 `**Class**:` header. That is a walk finding. The owner writes both (rule 9); the steward writes neither. Steward's proposal, which the owner may override: Proposed `manual` · `P3 improvement · defect`.

## Lapse (2026-10-27)

Firing commit: `26b7f5648cf15187f5bfd64876894f22a7adc7a5` (#478, merged 2026-10-25T09:21:13-04:00). It was the first touch of `application-mcp-server/src/indexer/TokenIndexer.ts` after the Trigger was set (`./scripts/issues-owned.sh Ada` at `08b9c7a8e`: `FIRED@26b7f5648`). No ancestor of it closed or re-ruled this record. Signed: Ada, 2026-10-27.

- **What the firing commit changed in the file**: `get_token_consumers`' scope constant, result type and wrapper (22 lines added), later trimmed by #479 (`852914a17`). Neither touched `search()`. The edits were unrelated to this record.
- **The owed act is not done**, read at `08b9c7a8e`:
  - `search()` (`TokenIndexer.ts` L203–222) still filters by `e.name.toLowerCase().includes(n)` and returns each result with no `matchType` or `matchConfidence`. So `search_tokens({ name: "space10" })` still returns `space100` unmarked.
  - The one signal an agent gets is the input schema's `name: "Token name (partial match)"` (`application-mcp-server/src/index.ts` L207). It describes the mode of matching, not the quality of each result.
- **Re-ruled, not closed** (Trigger line above). It needs one fixing PR with the sibling, under a grant over the Application MCP files (Lina's surface, outside my scope). The design call, option (a) or (b), stays mine.
