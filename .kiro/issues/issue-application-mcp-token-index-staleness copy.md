# Issue: Application MCP Token-Index Does Not Reflect Local Token Source

**Date**: 2026-05-25
**Package Version**: @3fn/core v11.7.3
**Severity**: BLOCKER — Application MCP cannot reference locally-created tokens
**Discovered During**: Spec 003 (Portfolio System Readiness), Task 1

---

## Summary

The Application MCP (`npx designerpunk mcp:app`) serves token data from the `token-index/` directory. When a product repo adds new tokens via `tokenSource: './src/tokens'` (Spec 104), those tokens appear in the generated `dist/` platform output but are NOT included in the generated `token-index/`. This means the Application MCP cannot reference locally-created tokens — `search_tokens`, `get_token_details`, and `get_token_family` all return incomplete results.

**This blocks any workflow that depends on MCP token discoverability for locally-added tokens** — including component development, screen spec validation, and cross-agent token queries.

---

## Observed Behavior

- `npx designerpunk generate` produces 220 tokens (including 3 new spacing tokens)
- `get_component_health` reports 217 primitives (package baseline)
- `rebuild_index` does not pick up locally-added tokens
- `search_tokens({ name: "space900" })` would return nothing

---

## Expected Behavior

After `npx designerpunk generate` succeeds with local token source, the Application MCP should reflect the full token set (package + local additions). Either:

1. The MCP reads from the generated `dist/` output (or a generated token-index), OR
2. `npx designerpunk generate` regenerates the token-index that the MCP reads from, OR
3. The MCP has a "local overlay" mode that merges package token-index with local additions

---

## Impact

- AI agents querying `search_tokens` or `get_token_details` won't find locally-added tokens
- Token consumers (components) can't be validated against local tokens via MCP
- Workaround: agents read the source files directly or check generated `dist/` output

---

## Current Workaround

Read `src/tokens/SpacingTokens.ts` directly or grep `dist/tokens/DesignTokens.web.css` for token values. The MCP is accurate for all package-shipped tokens; only local additions are invisible.

---

## Update (v11.7.3)

v11.7.3 added `token-index/` generation to `npx designerpunk generate` and the MCP config now supports `TOKEN_INDEX_DIR` pointing to the local `./token-index/` directory. However, the token-index generator (`src/generators/generateTokenIndex.ts`) still imports primitives from the package's own barrel:

```typescript
import { getAllPrimitiveTokens } from '../tokens';  // package-internal, not local source
```

This means the generated `token-index/primitives.yaml` contains 217 tokens (package baseline) rather than 220 (including locally-added tokens). The platform generators correctly produce 220 tokens because they receive resolved tokens from the CLI's `resolveTokens(config)` function, but `generateTokenIndex` bypasses that resolution.

**Fix needed**: `generateTokenIndex` should accept the resolved `TokenInput` (from `resolveTokens()`) rather than importing directly from the package barrel. The CLI already resolves the correct token set (220 tokens including local additions) and passes it to the platform generators — the token-index generator should receive the same resolved data.

---

## Blocking Impact

- Spec 003 creates new primitive and semantic tokens that must be MCP-discoverable
- Leonardo's screen spec (Layer 3) references tokens by name — MCP validation will miss local tokens
- Cross-agent workflows (Ada creates token → Leonardo references in spec → Sparky consumes) break if MCP can't confirm token existence
- `get_token_details`, `search_tokens`, `get_token_family` all return stale/incomplete data
