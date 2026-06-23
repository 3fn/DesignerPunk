# Task 1 Completion: Application-MCP Additive Foundation — Type Fix + Resolved-Value Triple

**Date**: 2026-06-23
**Task**: 1. Application-MCP Additive Foundation: Type Fix + Resolved-Value Triple
**Type**: Parent
**Status**: Complete
**Agent**: Ada (token domain)

---

## Artifacts Created / Modified

- `application-mcp-server/src/indexer/TokenRefResolver.ts` (NEW, ~196 lines) — faithful verbatim port of the product MCP's resolver (`ResolvedRef` shape, `FAMILY_UNIT_MAP`, `CATEGORY_UNIT_MAP`, the `resolve()` null-contract, `extractPrimaryRef`/`loadFile`). Header documents the port rationale and the Decision-7 dedup backlog item.
- `application-mcp-server/src/indexer/TokenIndexer.ts` — `value?` type fix, `ResolvedValueTriple` interface + `TokenDetails` type, resolver field, and the additive `getDetails()` merge.

## Implementation Details

### 1.1 — `value?` type fix (O3, resolved)
Changed `value: string | number` → `value?: string | number` at `TokenIndexer.ts:24` (type-only, additive; covers semantic + component tiers). O3 confirmed against the live corpus: **0 of 193** semantic entries carry an entry-level `value` key — `value:` appears only nested inside `primitiveReferences`. The fix loosens the type to match the already-correct runtime shape; no runtime reconciliation was needed or added.

### 1.2 — Resolver reuse contract (O1, confirmed) — PORT, not import
A direct cross-package import is blocked two ways: `product-mcp-server` has no `package.json` (not a linkable package), and the app's `tsconfig` pins `rootDir: ./src` (cannot compile/import files outside `src/`). Wiring a shared package boundary is exactly the work Decision 7 / Carried-Forward 2 defers as out-of-121-scope. So the contract was adopted by **faithful copy** (the spec's prescribed fallback) — the algorithm diff against the product original is header-only; the logic is byte-identical. The ported resolver reads the same `token-index/*.yaml` corpus, satisfying Req 2.5's single-coherent-cross-MCP-contract requirement. The resolver is instantiated inside `TokenIndexer` (loaded during `indexTokens`) so it tracks the same `tokenIndexDir` lifecycle as the tier maps with no boundary-layer plumbing changes. `platforms{}` untouched; no `{platform}Accessor` field added (Ada R1 P1 dropped).

### 1.3 — Resolved-value triple on `get_token_details`
`getDetails()` now returns `TokenDetails | null` (= `TokenIndexEntry & ResolvedValueTriple`), spreading the existing entry and additively merging `resolveTriple(name)`. Null-contract, verbatim from `TokenRefResolver`:
- primitive → own value / `resolutionDepth: 'full'`
- semantic/component, single resolvable ref → chain-resolved terminal value / `'full'`
- multi-ref / literal / unresolvable → token self-name / `'partial'`
- no-ref-no-value (resolver returns null) → `null` / `resolutionDepth: null`

### Theme-varying tokens (Peter-confirmed, Option A)
For theme-varying tokens, the terminal primitive `value` is itself a per-mode/contrast object (e.g. `teal400` → `{ light: {base, wcag}, dark: {base, wcag} }`), so `resolvedValue` returns that object even though the triple's static type reads `number | string | null`; `resolutionDepth` stays `full`. This is faithful product-MCP behavior carried verbatim — **not** an app-side divergence. Decision A (keep verbatim; do not flatten, do not relabel `partial`) is recorded in `design.md` § resolved-value triple. Two downstream consequences are carried forward: Task 7.2 docs must state the per-mode-bundle caveat, and the Task 4 theme-varying fixture must expect the bundle object.

## Validation (Tier 3: Comprehensive)

✅ `TokenIndexEntry.value` optional; semantic tokens carry no `value` key (0/193 confirmed)
✅ `get_token_details` emits `resolvedValue` / `resolvedUnitType` / `resolutionDepth` chain-resolved via `TokenRefResolver` logic, additively
✅ `platforms{}` unchanged; existing assertions pass
✅ Triple uses the product MCP's field names + null-contract verbatim (no divergent third shape)
✅ `npx tsc --noEmit` — clean (exit 0)
✅ `npx jest` (full app-MCP suite) — **21 suites / 232 tests passing** (existing `TokenIndexer.test.ts` primitive/theme-varying/not-found assertions pass unchanged — back-compat hard constraint satisfied)
✅ Real-corpus smoke across all contract branches: primitive→`full`, semantic single-ref→`full`, theme-varying semantic→`full`, component→`full`, not-found→`null`; semantics/components carry no `value` key; `platforms.web` unchanged on every tier

## Requirements Compliance

✅ Req 2.1–2.5 — resolved-value triple, null-contract, additive/back-compat, verbatim cross-MCP contract
✅ Req 2.4 / P2 — semantic tokens carry no `value` key (prerequisite for the Task 4 exact-key-set assertion)

## Open Items Carried Forward (not Task 1 scope)

- **Task 4 fixtures must exercise `partial`/`null` synthetically** — the live corpus only ever produces `resolutionDepth: 'full'`; the `partial`/`null` branches are not reachable from live data alone.
- **Shared resolver module** (Decision 7 / Carried-Forward 2) — the port duplicates the algorithm across both MCPs; the durable fix is a shared module. Backlog, not 121 scope.
- **Theme-varying bundle caveat** — Task 7.2 docs + Task 4 theme-varying fixture (see above).

## Related Documentation

- [Task 1 Summary](../../../../docs/specs/121-claude-code-portability/task-1-summary.md)
