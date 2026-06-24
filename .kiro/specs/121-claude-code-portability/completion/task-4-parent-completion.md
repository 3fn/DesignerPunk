# Task 4 Completion: Application-MCP Tool-Boundary Contract Test (the H1 gap)

**Date**: 2026-06-23
**Task**: 4. Application-MCP Tool-Boundary Contract Test (Req 3)
**Type**: Parent
**Status**: Complete
**Agents**: Thurgood (test governance — two parallel slices on Sonnet 4.6: application-MCP contract test; docs-MCP calibration fixtures). Token-side / component-side assertions implemented against the contracts Ada/Lina established + verified in Tasks 1/2/5.

---

## Artifacts Created / Modified

**Application MCP (the H1-gap contract test):**
- `application-mcp-server/src/__tests__/tool-boundary.contract.test.ts` (new, +71 tests) — `callTool` harness + token/component/tier/breaking-change assertions.
- `application-mcp-server/src/index.ts` — **additive only**: `createTestableServer` + `TestableServer` export (`callTool` delegates to the real `handleTool`); `handleTool`/`indexer` visibility loosened to package-internal; production auto-start wrapped in a `require.main === module` entry-point guard.
- `application-mcp-server/jest.config.js` + `src/__tests__/__mocks__/mcp-sdk-*.js` — CJS stubs for the ESM-only `@modelcontextprotocol/sdk` (so `index.ts` is importable under ts-jest).

**Docs MCP (calibration fixtures + vacuous-assertion fix):**
- `mcp-server/src/query/__tests__/find-docs-calibration.test.ts` (new, +25 tests) — `find_docs` calibration fixtures driven through `handleFindDocs` against the real corpus.
- `mcp-server/tests/integration/mcp-tools.test.ts` — tightened **two** vacuous `get_section` assertions (audit flagged one; there were two).

## Implementation Details

### 4.1 — `callTool` harness + fixture split (Decision 4(b))
The contract test exercises the tools through `createTestableServer(...).callTool(name, args)`, which delegates to the **same `handleTool`** the live MCP request handler calls — not `QueryEngine`/indexer directly (the H1 gap). The transport envelope (`content[0].text`) is intentionally out of scope (it's transport, not the response-assembly contract). Fixture split: a **pinned fixture corpus** (hand-authored token-index + component metadata) for the full-shape / `partial` / tier branches, plus a lightweight **live-smoke** check asserting only that the named recall-floor components still exist in the real index.

### 4.2 — `get_token_details` assertions (token-side, Task-1 contract)
Tier-aware full-shape fixtures: primitive / semantic (theme-varying) / component / `partial` / not-found. Asserts the resolved-value triple per the null-contract, an **exact key-set**, **no `value` key on semantics** (P2), `platforms{}` unchanged, and the **theme-varying `resolvedValue` bundle** (`{light:{base,wcag},dark:{base,wcag}}`, still `full`) per the Peter-approved Option A. The `partial` branch uses synthetic fixtures (live data is uniformly `full`).

### 4.3 — `find_components` assertions (component-side, Task-2/5 contract)
Locks the full `ApplicationSummary` shape; asserts the corrected recall floors (`"login"`→`Input-Text-Email`; `"text input field"`→four `Input-Text-*`/`FormInput`; `"primary action button"`→`Button-CTA`); empty query → `{ data: [], error: null }`; conjunctive narrowing; discovery→retrieval composition via `callTool`. Ordering not pinned.

### 4.4 — tier-classification at the boundary (both tools)
Component fixtures (in the app-MCP test) + docs fixtures (in the docs-MCP calibration test, the named Req-6.7 deliverable). Per fixture: expected `matchConfidence` tier; three distinct fields (not collapsed); `partial` returns ranked flagged candidates (not empty); `none` returns the empty contract — `partial` vs `none` distinguishable from shape (P4); adversarial guard (low-signal-only / incidental token caps at `partial`). **RTL/internationalization → both docs `strong` via the Task-5 docs aliases, verified at the boundary on the real corpus.**

### 4.5 — breaking-change guard + vacuous-assertion fix
Exact-key-set assertions (add/remove/rename any field → fails loud, P1/Req 3.4). Tightened the two `get_section` integration assertions that sat under `if (!isError)` (a tool error now fails the test unconditionally instead of silently passing).

## Validation (Tier 3: Comprehensive)

✅ Tools exercised end-to-end through `callTool` (`handleTool` / `handleFindDocs`), not QueryEngine/indexer directly (Req 3.1)
✅ Exact key-set on both tools — additive enforced, breaking = loud (Req 3.2/3.4, P1)
✅ Semantic tokens carry no `value` key (P2); theme-varying bundle pinned; `platforms{}` unchanged
✅ `ApplicationSummary` locked; recall floors asserted; empty `{ data: [], error: null }` (Req 3.3)
✅ Tier fixtures for both tools; three distinct fields; `partial` vs `none` shape-distinguishable (Req 3.6, P4)
✅ RTL/internationalization recall floor satisfied at the boundary (`strong` via aliases)
✅ Additive guarantee now **enforced, not aspirational** (Req 3.5)
✅ `tsc` clean both MCPs; **application MCP 320 tests; docs MCP 496 tests** — all pass

## Requirements Compliance

✅ Req 3.1–3.6 (callTool boundary, exact key-set + triple, ApplicationSummary + recall floor + empty, breaking guard, enforced additivity, tier fixtures for both tools)

## Findings / Notes (all sound, none blocking)

- **Latent bug fixed:** `index.ts` auto-started the production server on import (never caught — nothing imported it). The `require.main === module` guard fixes it; production startup behavior unchanged.
- **`null` resolutionDepth unreachable via `callTool`** — indexer + resolver share `tokenIndexDir`, so any indexed token resolves at least `partial`. The null-contract is correct but only exercisable at the `TokenRefResolver`/`TokenIndexer` unit level (covered there), not end-to-end.
- **"spec planning" ranks `Process-Spec-Planning.md` #2** (behind `Process-Development-Workflow.md`); both `strong`. Fixtures assert must-include + tier, not exact rank (ranking within a tier is Layer-3, per "do not pin ordering"). A tunable-knob observation if #1 is later desired.
- **MCP SDK is ESM-only** → CJS stubs via `moduleNameMapper`. Needs maintenance only if `index.ts` uses more SDK surface than `Server`/`StdioServerTransport`/the two schema constants.

## Related Documentation

- [Task 4 Summary](../../../../docs/specs/121-claude-code-portability/task-4-summary.md)
