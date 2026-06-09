# Task 4.1 Completion: Integrate StalenessGate into Docs MCP

**Date**: 2026-06-09
**Task**: 4.1 Integrate StalenessGate into Docs MCP
**Type**: Implementation
**Status**: Complete

---

## Changes

| File | Change |
|------|--------|
| `mcp-server/src/index.ts` | Imported `StalenessGate` + `isImmutableContext`. Added `STALENESS_EXEMPT_TOOLS` set. Instantiated gate with steering dir and `.md` extension. Added gate check before tool switch. Added `markIndexed()` after indexing in `start()` and after `rebuild_index`. |

## Validation

- TypeScript compiles clean
- 435/435 tests pass (1 pre-existing flaky property-based test fails only under parallelism)
- Requirements addressed: R1 AC1-6, R5 AC3
