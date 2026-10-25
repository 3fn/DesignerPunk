# Product MCP: a screen spec's token references are indexed without being checked, so a token that does not exist passes silently

**Date**: 2026-10-25
**Owner**: Thurgood (Civitas steward: MCP accuracy). **`product-mcp-server/src/**` is in no seat's standing write scope**, so the fix needs a `**Grant paths**:` line, added to this record and activated by Peter's merge of a PR whose body names it (README rule 8). **Consulted before the fix**: Leonardo (the screen-spec author the warning is for), Ada (the token names and `token-index/`'s shape).
**Filed by**: Thurgood, under README rule 10, from the 16.1.0 trio row R3-16 (`tests/onboarding-trio/records/16.1.0/trio-3-pm.md`, `subject: leonardo`; Stacy has the claims side), routed by the orchestrator on `chore/release-16.1.0-trio`. Rule 9 applies to every later edit.
**Class**: P3 improvement · defect *(set 2026-10-25, Thurgood, rule 12. No served text says screen token references are checked. The Integration Guide's ui-tree convention says the indexer "reads `tokens` → adds each value to token reverse index" (`governance/DesignerPunk-Integration-Guide.md` L820), which is exactly what it does. So nothing is false, and it is not P0. The tool's `warnings: []` and `gapCounts.totalGaps: 0` next to a token count do invite a reader to take a clean result as checked: consumer-Leonardo did. If a served sentence, or the tool description, is ever read as promising the check, it becomes P2 `(guard)`.)*
**Trigger**: `manual` — closes at its fixing PR's merge. *(Set 2026-10-25, Thurgood, rule 9. A P3 that would ride another change takes `manual`; here the fixing PR is its own.)*
**Grant paths**: none yet (see Owner).

---

## What happened (verified 2026-10-25)

- In the `trio-3-pm` born repo, `product/experience-map/pages/browse-tools.yaml` L55 reads `paddingBlockEnd: space.layout.separated.normal`. No `token-index/` file defines that name. The system's token is `space.separated.normal` (`token-index/semantics.yaml` L2418).
- `rebuild_product_index` counted the screen's token references (`reverseIndexSizes.tokens: 4`) and returned `warnings: []` (the stored result, per the record).
- **Why**: in `product-mcp-server/src/indexer/ProductIndexer.ts` (L340–362 at `c543bc29f`), a node's `component` goes to the reverse index **and** to the gap detector. Its `tokens` values go to the reverse index only. The product-token indexer already resolves refs against `token-index/` and warns on a miss (`ProductTokenIndexer.ts` L174–188, through `TokenRefResolver`), so the check exists for product tokens and not for screens.

## Fix shape

When the indexer reads a screen's `tokens` block, it looks each value up in `token-index/` (primitives, semantics and components), and in the product's own tokens. On a miss it pushes one warning naming the token, the screen and the YAML path. It also suggests the nearest name when one differs only by a segment (here `space.separated.normal`). The warning is a warning, not a refusal, because the reference may name a token the founder has not generated yet. A falsification test: a fixture screen with `space.layout.separated.normal` gives exactly that one warning, and the same screen with `space.separated.normal` gives none. **Surviving counter-argument**: before `generate` has run, `token-index/` is empty, so every reference would warn. The warning then says to run `generate`, as the product-token warning already does, rather than repeating one line per token.

*Signed: Thurgood, 2026-10-25.*
