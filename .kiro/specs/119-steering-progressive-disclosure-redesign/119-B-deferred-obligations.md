# 119-B Deferred Obligations (execution-discovered)

**Date started**: 2026-06-29
**Spec**: 119 (Agent Experience Architecture) — ledger of concrete obligations **handed from 119-A to 119-B during execution**
**Owner**: Thurgood / Docs-MCP infra (unless noted)

> **Scope of this ledger.** This is for **specific, trackable obligations that surfaced while *implementing* 119-A** — not the design-phase deferrals, which are already enumerated in `119-A-steering-relocation-serving-contract/requirements.md` § "Deferred to 119-B (explicitly out of scope here)" and the design-outline pillar mapping. Each entry names what, why deferred, the bounded interim cost, and the owner, so nothing relies on memory.

---

## OB-1 — Cross-ref parser `id`-awareness (so `list_cross_references` enumerates bare-`id` cross-refs)

**Status**: OPEN · **Owner**: Thurgood / Docs-MCP infra · **Surfaced**: 119-A Task 8.5 (2026-06-29)

**What.** Teach the Docs-MCP cross-reference parser (`mcp-server/src/indexer/cross-ref-parser.ts`) to recognize **bare-`id`** markdown link targets (e.g. `[Token Governance](token-governance)`) as cross-references, validated against the doc-`id` set (`idIndex`), so `list_cross_references` and the `crossReferences` array in `get_document_summary` again enumerate them.

**Why this exists.** 119-A Task 8.5 migrated **226 intra-doc cross-references across 43 active `governance/` docs** to the bare-`id` form (Req 10 + the Req 2 AC7 addressing grammar). The **resolver handles bare-`id` fine** (they *resolve* via strategy-1), but the cross-ref *parser* only extracts targets ending in `.md`, so those 226 refs are currently **invisible to cross-ref enumeration**. Refs still resolve when fetched — only the "what links to what" map under-counts for those 43 docs.

**Why deferred (not done in 119-A).** Making the parser `id`-aware is **net-new indexer architecture**, not a tweak: without the `.md` suffix the parser must disambiguate doc-`id` targets from anchors / non-doc links by validating against `idIndex`, but cross-ref extraction runs *during* `indexFile` while `idIndex` is still being built — forcing a **two-pass index** or **query-time resolution**, plus false-positive guards, on a load-bearing property-tested parser. That is 119-B-sized work the design sequenced for later; pulling it forward expands 119-A scope right before the exit gate (Peter-confirmed 2026-06-29).

**Bounded interim cost.** `list_cross_references` / `get_document_summary.crossReferences` under-count for the 43 migrated docs until this lands. **Non-breaking**: no build fails, no doc 404s, refs resolve when fetched; only the cross-link *report* is incomplete. Affects governance/health cross-link tooling and graph-browsing, not normal doc fetch, agent work, or the Task 11 relocation-integrity gate (which resolves via the resolver, not enumeration).

**Done when.** `list_cross_references` returns the bare-`id` cross-refs for the migrated docs (validated against `idIndex`), with disambiguation rules that don't mis-extract non-doc links, and tests covering both.

---

## OB-2 — Sweep the 176 governance-corpus MCP-query `path:` snippets to `id`

**Status**: OPEN · **Owner**: Thurgood / Docs-MCP infra · **Surfaced**: 119-A Task 8.5 (2026-06-29)

**What.** Migrate the ~**176 example `path:` snippets inside `governance/` doc bodies** (e.g. `get_section({ path: ".kiro/steering/Token-Governance.md" })` shown as MCP-query examples) from legacy `.kiro/steering/…` strings to the new `id` form.

**Why deferred.** These are **fallback-covered example snippets** in doc prose (they resolve via the Req 2 AC3 legacy-path fallback), the same class as the 8 prompts' legacy refs that 119-B's prompt-sweep already addresses. 119-A Task 8.5 migrated only the **11** such snippets in the always-loaded **identity** docs; the **176 in `governance/`** were left for the 119-B sweep. **Not a relocation-integrity break** either way.

**Done when.** Folded into the 119-B prompt/snippet sweep to logical `id`s (alongside the 8-prompt 60-ref sweep).

---

*Append execution-discovered 119-A→119-B obligations here as they surface. Design-phase deferrals live in `119-A-.../requirements.md` § "Deferred to 119-B".*
