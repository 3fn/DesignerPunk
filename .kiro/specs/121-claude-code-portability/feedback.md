# Spec 121 — Formalization Feedback (Round 1)

**Date**: 2026-06-22
**Spec**: 121 — MCP Delivery-Layer Hardening (the deep-formalized slice; 122/123 stubbed)
**Round**: R1 — domain review of `requirements.md` v1 (Thurgood) by Ada (Rosetta) + Lina (Stemma); decisions by Peter.
**Status**: incorporated into requirements v2.

---

## [ADA R1] — token-domain (Requirements 2 & 3 token side)

- **Req 2 was mis-framed (P0).** "Resolved value" isn't uniformly missing — *primitives* already carry `value`; *semantics* carry only `primitiveReferences` and **no `value`**. The real fix is **chain-resolving semantics/component tokens to their terminal value**, not "add a value field."
- **Adopt the product MCP's existing contract verbatim (P0)** — kills cross-MCP drift by construction (no new vocabulary): `resolvedValue: number|string|null`, `resolvedUnitType: string|null`, `resolutionDepth: 'full'|'partial'|null`. Reuse `product-mcp-server/src/indexer/TokenRefResolver.ts` logic. Null-contract: primitive→own value/`full`; single resolvable ref→terminal value/`full`; multi-ref/literal/unresolvable→self-name/`partial`; no-ref-no-value→`null`. **Docs must state "always read `resolutionDepth` before trusting `resolvedValue`"** (the `partial`→self-name overload).
- **Do NOT add `{platform}Accessor` (P1).** The existing `platforms{web,ios,android}` object already is the identifier set; parallel scalars duplicate/drift. "Accessor" is the wrong concept — the stored value is a reference *fragment* (theme-namespaced for theme-varying tokens).
- **G6 (code-reference/import form): defer.** Naive `var(--x)`/`DesignTokens.x` templates emit WRONG code for theme-varying tokens (resolved via theme providers). If ever shipped, scope to non-theme-varying only + a `themeAccess` hint. **→ Peter decided: DEFER.**
- **Req 3 token-side test:** tier-aware full-shape fixtures (primitive / semantic-theme-varying / component / `partial` / `null` / not-found), incl. an **exact-key-set assertion** so additive = enforced, not inferred. Pin that semantics have no `value` key.
- **Governance note (backlog, out of 121):** adopting the resolver on the app side duplicates the algorithm across both MCPs → a shared resolver module is the durable fix.

## [LINA R1] — component-domain (Requirements 1 & 3 component side)

- **Root cause traced:** `find_components` `context` filter is **exact array match**; query terms (e.g. "login") live in `when_to_use`, which isn't indexed. Missing-index, not missing-data (validates auto-index-first).
- **Substring → tokenized matching is the real requirement (P0).** `"primary action button"` is unsatisfiable under substring matching no matter how many fields are added. The spec MUST mandate **tokenized term matching**, or design.md can "satisfy" the field-coverage letter and still return `[]`.
- **Index from (Q1):** `purpose`, `description`, **`when_to_use`** (highest-value, currently ignored), tokenized `name`/`family`, `contexts`, `alternatives[].reason`, contract concept/category names. **EXCLUDE `when_not_to_use`** (negative-signal trap). Reactive `aliases:` only for true synonym divergence (predicted: select/dropdown, toast/snackbar, modal/dialog).
- **Back-compat (P0):** route keyword discovery through a **new optional param** (or free-text `purpose`) — do NOT mutate `context`/`concept`/`category` exact semantics (existing callers rely on them).
- **Result shape:** return the existing `ApplicationSummary` unchanged (consumer needs it; back-compat); add optional `matchedOn` (auditability) + `limit`/ranking. Don't thin.
- **Fixture corrections (factual errors in v1):** `simple-form` is **unreachable** via `find_components` (it's an experience pattern in a separate index) → drop it / scope decision below; there is **no "Input-Text" family** — it's `FormInput`; `"text input field"` floor = the four `Input-Text-*`. `"login"` hard floor = `Input-Text-Email` (provable), expect Password + Button-CTA once `when_to_use` is indexed.
- **Scope fork (Issue A):** components-only vs cross-index (components + patterns). Cross-index = breaking shape change. **→ Peter decided: COMPONENTS-ONLY.**
- **Tool-boundary test (Req 3):** must go through `callTool('find_components', ...)` (not `queryEngine` directly); lock full `ApplicationSummary` shape; recall-floor `must-include` per fixture; empty query → `{data:[], error:null}`; conjunctive narrowing; discovery→retrieval composition. Don't pin ordering unless ranking is implemented.
- **Index-freshness (design.md):** testing recall against live metadata couples component-authoring to MCP-test stability (a metadata edit could break an MCP test) — deliberate or pin a fixture corpus. Peter to decide in design.

---

## Resolved Decisions (Peter, 2026-06-22)

1. **`get_documentation_map`: SUPERSEDE with `find_docs`** (breaking — justified). Evidence: the only consumer, dp-portfolio (`@3fn/core@12.0.5`), references it ONLY in doc/config/prompt artifacts (mcp.json `autoApprove`, `thurgood-prompt.md`, 5 steering docs) — **no code dependency**; refreshes on upgrade + `sync`. Requires: `find_docs` covers **both concept-search AND a list/catalog mode** (so it truly subsumes the map); remove/deprecate the map + rewrite its tests; **sweep ~8 first-party references** in `@3fn/core` (steering docs, Thurgood prompt, Integration Guide, `init` mcp.json template `autoApprove`) — Thurgood's cross-surface remit. Watch: if `sync` doesn't refresh dp-portfolio's vendored prompts/docs, that's a **123 gap**.
2. **`find_components` scope: COMPONENTS-ONLY.**
3. **Token code-reference form (G6): DEFER** (ship resolved-value triple now; revisit in design.md).
4. **Spec structure: flat 121 / 122 / 123**, directory `121-claude-code-portability/` kept (cosmetic).
5. **Additive remains the default everywhere else** (esp. the token fields). The supersede is a one-time justified break (redundant-once-replaced + no code coupling); still build 121's contract-test guard so future changes are deliberate.
