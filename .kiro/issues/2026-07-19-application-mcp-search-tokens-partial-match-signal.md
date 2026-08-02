# Application MCP `search_tokens` Returns Partial-Name Matches With No Match-Quality Signal

**Date**: 2026-07-19
**Discovered during**: Spec 119-B requirements feedback round (main-loop verification probe, 2026-07-18)
**Reporters**: Claude (main-loop verification); scenario first hypothesized by Ada ([ADA R2], 119-B feedback)
**Severity**: Low — double-mitigated: token *selection* is independently gated by token-governance checkpoints, and the certainty-calibration rule's step 3 ("when still unsure, surface it") is tool-agnostic
**Type**: Application MCP token search (match-quality signaling, NOT search correctness)
**Primary owner**: Ada (ownership accepted on the record — [ADA R3], 119-B feedback/requirements.md)
**Status**: Open — **LATER**: take up after 119-B's design phase settles the calibration-propagation prose (so the new signal lands against settled prose, not a moving target). No hard trigger; a natural slot is any Ada Application-MCP session touching the search/index surface.

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
