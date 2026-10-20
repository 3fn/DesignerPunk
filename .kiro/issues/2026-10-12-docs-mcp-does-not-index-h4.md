# Docs MCP: H4 headings are not indexed; SectionNotFound suggestions list only H2

**Date**: 2026-10-12
**Status**: ACTIVE
**Owner**: Thurgood (Civitas steward; docs MCP indexer) — facts surfaced by Leonardo (19.5 review) and verified by Thurgood on a local rebuild; filed by the orchestrator (`.kiro/issues/` is outside Thurgood's write scope)
**Trigger**: `path:mcp-server/src/indexer/**` — the next docs-MCP indexer change, or the first reader who needs an H4 in a summary outline (the event is unchanged). *(Back-filled 2026-10-20, Thurgood, rules 1 and 9, at the pulled-forward walk (Peter's go, 2026-10-20); ledger `archive/TRIAGE-2026-10-20.md`.)*
**Superseded trigger (back-filled 2026-10-20; verbatim)**: the next docs-MCP indexer change, or the first served doc whose reference content cannot be flattened to H3 (the Integration Guide was flattened instead — Task 19.5, `0e1ca0553`)
**Class**: P3 improvement · defect *(set 2026-10-20, Thurgood, rule 12. Items (1) (the summary outline and the health count exclude H4) and (3) (fold the two records) remain. H4s are addressable by `get_section`, so no served answer is false.)*

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

**2026-10-18 — fixed in the minimal form, PR `fix/docs-mcp-item-14-and-logs-dir` (Thurgood; release-4 rulings item 14, Peter's go 2026-10-18).** Branch commits `eb578a6c3` (C-2) and `9e06b5005` (P-4). What changed: `section-parser.ts` is fence-aware (a `##`/`###` inside a fence no longer ends, sibling or parent a real section; it keeps its place in the `s{index}` count, so no id moved); a real `####` is a node with id `s{c}.{k}` (the k-th H4 under the H2/H3 `s{c}`), reachable by heading (after real H2/H3 and fenced H2/H3, so no prior lookup changed), by parent and by id; SectionNotFound suggestions keep the H2 list and append up to 10 H3/H4 headings sharing a word with the request. Corpus check: all 2,850 H2/H3 payloads unchanged by the H4 step; 608 H4s addressable. **Not done, still open here**: (1) the summary outline and the health tool's section count (2518) still exclude H4 — indexing them there would add ~608 to the count and grow every summary; (2) the `s{c}.{k}` form is not yet named in `governance/Steering-Addressing-Conventions.md` Convention 2 (a governance edit — ballot model, not this PR); (3) row 13's "fold the two records" is not done. **New trigger**: the next docs-MCP indexer change, or the first reader who needs an H4 in a summary outline. — Thurgood

**2026-10-18 — item (2) closed, PR `fix/c3-c4-h4-served-text` (Thurgood).** `governance/Steering-Addressing-Conventions.md` Convention 2 now names the served positional ids (`s{index}` for H2/H3; `s{c}.{k}` for H4, outside the `s{index}` count) and the heading-lookup order (real H2/H3, then fenced, then H4). Kind: CONTENT CORRECTION (ballot 2026-10-18-governance-edit-kinds § 2); truth: `mcp-server/src/indexer/section-parser.ts` as merged in #405. The convention's "Current state" line now says the positional ids are not durable, where it had said only the `docid` half was implemented; same referent. No id semantics changed. **Still open**: item (1), the summary outline and the health count excluding H4, and item (3), folding the two records. Trigger unchanged (the next docs-MCP indexer change, or the first reader who needs an H4 in a summary outline). — Thurgood
