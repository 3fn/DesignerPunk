# Application MCP `get_token_details` `resolvedValue` Does Not Apply Per-Mode Semantic Overrides

**Date**: 2026-06-24
**Discovered during**: Spec 117 Task 5.3 (MCP serving verification, R6 AC2)
**Reporters**: Claude (main-loop verification)
**Severity**: Low — the `themeVarying` flag is correct; only the `resolvedValue` readout is incomplete for theme-varying semantics
**Type**: Application MCP token resolution (NOT token-index generation)
**Primary owner**: Application MCP / Rosetta (Ada consulted)
**Status**: Open — **LATER (triaged 2026-06-25, Task-8 milestone)**: low severity, documented workaround exists; needs a token-index-format / MCP-resolution design decision. Parked/opportunistic. Out of scope for Spec 117 (token-index *generation* integrity, not MCP semantic resolution). See `docs/roadmap/m0a-deferred-items.md` § "Issues surfaced during the 117/118 spec cluster".
**Owner**: Ada (ASSIGN accepted 2026-10-20, rule 9; the `**Primary owner**:` header above stays as filed)
**Trigger**: `manual` — closes at the merge of the first Lina PR that edits `application-mcp-server/src/indexer/TokenIndexer.ts` after 2026-10-27 (expected: her fix for `2026-10-25-application-mcp-stale-package-token-version-warning.md`), which carries the `get_token_details` description sentence below. It becomes `merge:#<N>` at that PR's open. *(Re-ruled 2026-10-27, Ada, rule 9, on Peter's words and Lina's consult, § "Scheduled" below.)* *(was: `manual` — closes at its fixing PR's merge, which carries the grant over the Application MCP files it edits (rule 10), since `application-mcp-server/**` is outside Ada's standing write scope. *(Re-ruled 2026-10-27, Ada, rules 1, 9 and 11, after the lapse below. A `path:` on `TokenIndexer.ts` fired on two edits that did not touch this record's subject, so it named a vehicle's file, not the event that owes the close. A P3 takes `manual`, naming its own fixing PR (rule 1). If it is unfired at two consecutive walks, it is archived stale under rule 5, and rule 4 brings it back.)* *(was: `path:application-mcp-server/src/indexer/TokenIndexer.ts` — the next change to the Application MCP's token reader, which is where `resolvedValue` and the theme resolution are built. It is the same file as `2026-07-19-application-mcp-search-tokens-partial-match-signal.md` (`search`, L193), the sibling that names this record as its bundle. *(Set 2026-10-20, Ada, rules 1 and 9.)*)*)*
**Class**: P3 improvement · defect *(set 2026-10-20, Ada, rule 12. Narrowed since filing: #154 (2026-09-13) shipped option (b), query-time resolution, as `themeResolutions.dark` with `modeValue`; read live 2026-10-20 on `color.structure.canvas`, which returns `oklch(0.42 0.018 260)` there. The top-level `resolvedValue.dark` still repeats the base by design (the fix was additive), so the record stays open for that readout. The reading that would re-class it to P2 (record): an agent reading `resolvedValue.dark` without `themeResolutions`.)*

---

## Summary

`get_token_details` for a theme-varying semantic color token returns the correct `themeVarying: true` flag, but its `resolvedValue` shows the base `primitiveReferences` resolved for **both** light and dark — it does not apply the per-mode semantic override. Example (Task 5.3):

```
color.structure.canvas → themeVarying: true   ✅
  resolvedValue: { light: oklch(1 0 260), dark: oklch(1 0 260) }   ← both = white100
```

The actual dark value is `gray400` (`oklch(0.42 …)`) via `darkSemanticOverrides['color.structure.canvas'] = { value: 'gray400' }`. So a consumer reading `resolvedValue` for a theme-varying token sees identical light/dark values, which contradicts the `themeVarying: true` flag.

## Root cause (format limitation, not a generation bug)

The token-index `semantics.yaml` stores **primitive references + a `themeVarying` flag**, not resolved per-mode semantic values. The per-mode dark value lives in `darkSemanticOverrides` (applied during dist generation), which the token-index does not encode per-semantic-token. So the MCP resolves the base `primitiveReferences` for both modes and cannot show the dark override without resolving overrides itself. Spec 117 verified the `themeVarying` flag is correct (R5) — this is a separate completeness gap in how the MCP serves resolved semantic values.

## Why out of scope for Spec 117

Spec 117 is token-index *generation* integrity (does the index reproduce dist; are the color/component/theme-varying outputs correct). The `themeVarying` flag — 117's R5 deliverable — is correct. Surfacing mode-resolved semantic *values* through `get_token_details` is an MCP resolution / token-index-format enhancement, not a generation-integrity defect.

## Recommended disposition

Decide whether `get_token_details` should serve mode-resolved semantic values for theme-varying tokens. If yes, the likely options are: (a) have the token-index emit resolved per-mode semantic values (extend the `semantics.yaml` schema), or (b) have the MCP resolve overrides at query time. Either is a token-index-format / MCP enhancement with its own design surface. Until then, consumers needing a theme-varying token's dark value should read the dist output or the primitive's mode-resolved value.

## Cross-References

- Spec 117 Task 5 completion: `.kiro/specs/117-token-index-generation-integrity/completion/task-5-completion.md` (Residual observations)
- Related MCP accessor history: Spec 121 added `resolvedValue` to `get_token_details`; this is a narrower follow-on (per-mode override resolution).

**Walk 2026-10-20 (Thurgood, walk line under rule 9; ledger `archive/TRIAGE-2026-10-20.md` row 8, call ASSIGN → Ada)**: this record lacks the rule-1 Trigger token (`**Trigger**: ` followed by one of `tag:v<semver>`, `merge:#<N>`, `path:<glob>`, `release:<ver>:phase-1` or `manual`) and the rule-12 `**Class**:` header. That is a walk finding. The owner writes both (rule 9); the steward writes neither. Steward's proposal, which the owner may override: The disposition is a token-index-format decision (option (a)) and the sibling record `2026-07-19-…` (Ada's, row 14) names it as its bundling candidate. Proposed after assignment: `manual` · `P2 obligation (record) · defect` (the `themeVarying` flag is correct, so the reader is told the value varies).

## Lapse (2026-10-27)

Firing commit: `26b7f5648cf15187f5bfd64876894f22a7adc7a5` (#478, merged 2026-10-25T09:21:13-04:00). It was the first touch of `application-mcp-server/src/indexer/TokenIndexer.ts` after the Trigger was set (`./scripts/issues-owned.sh Ada` at `08b9c7a8e`: `FIRED@26b7f5648`). No ancestor of it closed or re-ruled this record. Signed: Ada, 2026-10-27.

- **What the firing commit changed in the file**: it added `CONSUMERS_SCOPE`, `TokenConsumersResult` and `getConsumersResult()` (22 lines), which is `get_token_consumers`' scope note. #479 (`852914a17`) then removed 13 of those lines when Peter picked the bare array. Neither touched `resolveThemeResolutions`, the base resolution triple, or `get_token_details`. The edits were unrelated to this record.
- **The owed act is not done**, read at `08b9c7a8e`:
  - `get_token_details` still returns `resolvedValue` as the base (light) resolution, so its `dark` slot repeats the light value for a Level 2 token. The correct dark value is only in `themeResolutions.dark` (`modeValue`).
  - The interface docstring states the trap (`TokenIndexer.ts` L50–55: "A consumer reading `resolvedValue.dark.base` for a Level 2 token gets the wrong answer"). The tool's description, which is what an agent reads (`application-mcp-server/src/index.ts` L215), does not mention `themeResolutions`.
- **Re-ruled, not closed** (Trigger line above).
  - The cheapest fix: one sentence in `get_token_details`' description pointing a theme-varying token's dark value to `themeResolutions.dark.modeValue`.
  - The fuller fix: the record's option (a) or a top-level change, which is a payload change.
  - Either needs a grant: the file is Lina's Application MCP surface, and outside my scope.
- **Class unchanged** (P3). The re-class trigger the Class line names (an agent observed reading `resolvedValue.dark` without `themeResolutions`) has not been seen.

## Scheduled (2026-10-27, Ada)

Under rule 9. Peter's words: *"Re: 533, Let's schedule in as part of one of the upcoming specs or where most optimally resolved"* (Peter, chat, relayed by the orchestrator, received before 2026-10-27T11:56:09Z).

**Consulted**: Lina — the description sentence rides her first `TokenIndexer.ts` PR, the stale-version fix, with the tool-registry hash re-based in that diff; the `search` signal is a payload change under Peter's B on #479, so it rides her item-2 PR or a small PR of its own; the shape is `matchConfidence` plus mandatory `matchedOn`, with no top-level `none`; pointer lines allowed, one per record (`batch-consults/lina-533-vehicle.md`, 2026-10-27).

- **Vehicle**: Lina's first `TokenIndexer.ts` PR, expected to be her fix for `2026-10-25-application-mcp-stale-package-token-version-warning.md` (P2 (guard), `release:next:phase-1`). It is in her standing scope, so no grant is needed. The Trigger above names it, and the old text is kept there.
- **What rides**: one sentence added to `get_token_details`' description (`application-mcp-server/src/index.ts`), my wording: `For a theme-varying token, read the dark value from themeResolutions.dark (its modeValue; null for a composite override, whose parts are in primitiveReferences); resolvedValue is the base (light) resolution.` It changes no payload. The tool-description hash in `canonical/registry/tool-registry.json` is re-based in the same diff (Lina).
- A pointer line naming this rider is appended to Lina's record, with her consent. It does not hold that record's close.
- **Not chosen**: Specs 128–131. None names the Application MCP's token tools as scope at `bad7222ef` (`ada-533-vehicle.md`). The health-check walk reads this `manual` record as the backstop.

*Signed: Ada, 2026-10-27.*
