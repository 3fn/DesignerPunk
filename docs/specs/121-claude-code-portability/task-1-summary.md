# Task 1 Summary: Application-MCP Additive Foundation

**Date**: 2026-06-23
**Purpose**: Concise summary of Spec 121 Task 1 completion
**Organization**: spec-summary
**Scope**: 121-claude-code-portability

## What Was Done

Hardened the application MCP's `get_token_details` so it chain-resolves a token to its terminal value, additively:
- Loosened `TokenIndexEntry.value` to optional (`value?`) so semantic tokens can be asserted to carry no `value` key (O3 — confirmed 0/193 at runtime).
- Ported the product MCP's `TokenRefResolver` verbatim into the application MCP (a cross-package import is blocked by the missing `package.json` + the `rootDir` pin; the durable shared-module fix is deferred as Decision 7).
- Added the resolved-value triple — `resolvedValue` / `resolvedUnitType` / `resolutionDepth` — to `getDetails()`, using the product MCP's field names and null-contract verbatim.

## Why It Matters

Agents consuming a token via MCP previously had to chase semantic→primitive references by hand and read generated token files to learn a token's actual value. The triple chain-resolves that in one call. Adopting the product MCP's contract verbatim means there is **one** cross-MCP token-resolution vocabulary, not two that drift. Every change is additive — no existing response shape breaks — which is the no-regret spine 121 is built on.

## Key Changes

- New `application-mcp-server/src/indexer/TokenRefResolver.ts` (faithful port; algorithm byte-identical to the product original).
- `application-mcp-server/src/indexer/TokenIndexer.ts` — `value?` type fix, `ResolvedValueTriple` + `TokenDetails`, additive `getDetails()` merge.
- `design.md` — recorded the Peter-confirmed Option A decision for theme-varying tokens (`resolvedValue` is a per-mode bundle, kept verbatim).

## Impact

- ✅ `get_token_details` resolves tokens to terminal value in one call (theme-varying tokens return a per-mode bundle, by design)
- ✅ Single coherent cross-MCP token contract (no divergent third shape)
- ✅ Fully additive — `tsc` clean, 232/232 app-MCP tests pass, `platforms{}` untouched
- ✅ Unblocks the Task 4 tool-boundary contract test (the "no `value` on semantics" exact-key-set assertion)

---

*For detailed implementation notes, see [task-1-parent-completion.md](../../../.kiro/specs/121-claude-code-portability/completion/task-1-parent-completion.md)*
