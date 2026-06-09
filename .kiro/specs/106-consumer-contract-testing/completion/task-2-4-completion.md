# Task 2.4 Completion: Add autoApprove and designLanguagePath CLI fix

**Date**: 2026-06-09
**Task**: 2.4 Add autoApprove and designLanguagePath CLI fix
**Type**: Setup
**Status**: Complete

---

## Changes

| File | Change |
|------|--------|
| `.kiro/settings/mcp.json` | Added `rebuild_index` to Application MCP autoApprove, `rebuild_product_index` to Product MCP autoApprove |
| `src/cli/designerpunk.ts` | Added `DESIGN_LANGUAGE_PATH` env var to `runMcpApp()` (conditionally, if file exists) |

## Validation

- TypeScript compiles clean
- Requirements addressed: R5 AC2, R6 AC1-2
