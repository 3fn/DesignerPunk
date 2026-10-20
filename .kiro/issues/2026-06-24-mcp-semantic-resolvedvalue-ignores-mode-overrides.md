# Application MCP `get_token_details` `resolvedValue` Does Not Apply Per-Mode Semantic Overrides

**Date**: 2026-06-24
**Discovered during**: Spec 117 Task 5.3 (MCP serving verification, R6 AC2)
**Reporters**: Claude (main-loop verification)
**Severity**: Low — the `themeVarying` flag is correct; only the `resolvedValue` readout is incomplete for theme-varying semantics
**Type**: Application MCP token resolution (NOT token-index generation)
**Primary owner**: Application MCP / Rosetta (Ada consulted)
**Status**: Open — **LATER (triaged 2026-06-25, Task-8 milestone)**: low severity, documented workaround exists; needs a token-index-format / MCP-resolution design decision. Parked/opportunistic. Out of scope for Spec 117 (token-index *generation* integrity, not MCP semantic resolution). See `docs/roadmap/m0a-deferred-items.md` § "Issues surfaced during the 117/118 spec cluster".

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
