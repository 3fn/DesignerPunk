# Task 2.2 Completion: Implement ProductTokenIndexer Class

**Date**: 2026-05-25
**Spec**: 108 - Product Tokens — Source Format & MCP Discoverability
**Task**: 2.2 — Implement ProductTokenIndexer class
**Agent**: Lina
**Status**: Complete

---

## What Was Done

Created `product-mcp-server/src/indexer/ProductTokenIndexer.ts` — the core indexer that parses `product/tokens/*.yaml` files, validates entries per all Req 1 acceptance criteria, resolves refs via `TokenRefResolver`, and exposes `query()` and `getHealth()` APIs.

## Implementation Details

### Public API

- `index(tokensDir)` — scan for *.yaml, validate filenames, parse entries, validate per-token, resolve refs
- `query(filters)` — filter by category/name/platform (conjunctive), returns `{ categories, warnings }`
- `getHealth()` — returns `ProductTokenHealth` with counts and messages

### Validation Rules Implemented

| Rule | Error Message |
|------|--------------|
| Both value and ref | "Token '{name}' has both value and ref. Use one." |
| Neither value nor ref | "Token '{name}' has neither value nor ref." |
| Value without unitType | "Token '{name}' has value without unitType." |
| Value without rationale | "Token '{name}' has hard value without rationale." |
| Invalid camelCase | "Token '{name}' must be camelCase..." |
| Invalid category filename | "Category '{name}' must be lowercase ASCII letters and hyphens only..." |
| Category field mismatch | "Category field '{x}' does not match filename '{y}'." |
| Platform-limited unitType | "Token '{name}' uses unitType '{t}' which is not available on platform '{p}'." |
| Missing description | "Token '{name}' is missing required 'description' field." |
| Unresolved ref | WARNING: "Token '{name}' references '{ref}' which is not in token-index..." |

### Key Design Decisions

- Per-token error isolation: valid siblings remain indexed when a sibling has errors
- Categories with all-errored tokens still register (empty tokens array)
- Warnings (unresolved refs) don't exclude tokens from query results
- Resolver reloads on every `index()` call (fresh resolution on rebuild)

## Files Created

| File | Purpose |
|------|---------|
| `product-mcp-server/src/indexer/ProductTokenIndexer.ts` | ProductTokenIndexer class (175 lines of logic) |

## Requirements Coverage

| Requirement | ACs Covered |
|-------------|-------------|
| Req 1: Source Format | 1.1–1.11 |
| Req 2: Indexing | 2.1–2.7 |
| Req 4: Query | 4.2–4.7 |
