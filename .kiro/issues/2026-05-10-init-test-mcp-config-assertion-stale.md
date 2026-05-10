# Issue: init.test.ts MCP Config Assertion Stale

**Date**: 2026-05-10
**Severity**: Low (test-only, no runtime impact)
**Domain**: CLI / Init
**Discovered by**: Ada (during Spec 105 Task 1.2 regression check)

---

## Summary

`src/cli/__tests__/init.test.ts` line 121 asserts that the scaffolded MCP config's `COMPONENTS_DIR` env var contains `node_modules/@3fn/core/src/components/core`. The actual template now produces `./src/components/core` (local path, since init copies components to the product repo).

## Error

```
Expected substring: "node_modules/@3fn/core/src/components/core"
Received string:    "./src/components/core"
```

## Root Cause

The MCP config template (`src/cli/templates/mcp-config.json.template`) was updated to use local paths (reflecting that init copies components locally), but the test assertion wasn't updated to match.

## Suggested Fix

Update line 121 of `src/cli/__tests__/init.test.ts`:
```typescript
// Before:
expect(app.env.COMPONENTS_DIR).toContain('node_modules/@3fn/core/src/components/core');
// After:
expect(app.env.COMPONENTS_DIR).toContain('./src/components/core');
```

Also check line 122 (`TOKEN_INDEX_DIR`) — may have the same issue.

## Impact

Test-only. The init command works correctly at runtime. The scaffolded MCP config uses the correct local paths.

---

*Route to: Thurgood (test governance) or Ada (CLI owner)*
