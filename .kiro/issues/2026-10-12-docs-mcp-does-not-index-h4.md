# Docs MCP: H4 headings are not indexed; SectionNotFound suggestions list only H2

**Date**: 2026-10-12
**Status**: ACTIVE
**Owner**: Thurgood (Civitas steward; docs MCP indexer) — facts surfaced by Leonardo (19.5 review) and verified by Thurgood on a local rebuild; filed by the orchestrator (`.kiro/issues/` is outside Thurgood's write scope)
**Trigger**: the next docs-MCP indexer change, or the first served doc whose reference content cannot be flattened to H3 (the Integration Guide was flattened instead — Task 19.5, `0e1ca0553`)

## What

- `mcp-server/src/indexer/section-parser.ts:86,96` indexes `##` and `###` headings only. Any `####` section is unreachable by `get_section`; it is returned only inline inside its H3 parent.
- The `SectionNotFound` error's `suggestions` field lists only H2 headings, so a reader who misses an H3 is pointed one level too coarse.
- Found when Task 19.4 demoted the Integration Guide's reference sections under one `## Reference` heading: ~20 previously reachable sections became H4 and `get_section("Themes")`, `get_section("Product MCP Setup")` returned SectionNotFound on a local rebuild (Leonardo, 2026-10-03; Thurgood confirmed). Fixed in that doc by promoting headings to H3 (option (b) of Thurgood's 19.5 disposition) and guarded by a test that every `see "<heading>"` pointer in the guide targets H2/H3.

## Why it matters

Every served doc is one restructure away from the same silent loss: nothing warns an author that a heading dropped below the indexed depth.

## Options (none picked)

1. Index H4 (and state the depth limit in the indexer's doc). Changes the whole corpus's section count and the `122-diff-guard` lock.
2. Keep the H3 limit, but make `validate_metadata` / the section-citations check flag any `####` heading in a served doc, and widen `SectionNotFound` suggestions to H3.
3. Document the limit in the Process-Cross-Reference-Standards doc and leave the tooling as is.

**No fix is authorized by this record.**
