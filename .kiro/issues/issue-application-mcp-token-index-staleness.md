# Issue: Application MCP Token-Index Does Not Reflect Local Token Source

**Date**: 2026-05-25
**Package Version**: @3fn/core v11.7.2
**Severity**: Low — informational gap, not a blocker
**Discovered During**: Spec 003 (Portfolio System Readiness), Task 1

---

## Summary

The Application MCP (`npx designerpunk mcp:app`) serves token data from the package's static `token-index/` directory. When a product repo adds new tokens via `tokenSource: './src/tokens'` (Spec 104), those tokens appear in the generated `dist/` output but are NOT reflected in the Application MCP's `search_tokens`, `get_token_details`, or `get_token_family` responses.

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
