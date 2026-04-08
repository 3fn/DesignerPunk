# MCP CLI Commands Resolve Paths from cwd Instead of Package Root

**Date**: 2026-04-08
**Severity**: Medium (blocks Task 5.4 MCP validation, not generate)
**Agent**: Lina (found during fresh-repo validation)
**Blocks**: Spec 095 Task 5.4 (MCP portion only — generate works)
**Status**: ✅ Resolved (2026-04-08)
**Resolved by**: Ada

## Problem

`npx designerpunk mcp:app` resolves the Application MCP server path from `cwd` instead of the installed package location. In a product repo, the server is at `node_modules/@3fn/core/application-mcp-server/src/index.ts`, not `./application-mcp-server/src/index.ts`.

```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module
'/private/tmp/designerpunk-test-install/application-mcp-server/src/index.ts'
```

## Root Cause

`resolvePackageRoot()` used `require.resolve('@designerpunk/core/package.json')` — a hardcoded package name that didn't match the actual published name (`@3fn/core`). When the resolve failed, it fell back to `cwd`, which is the product repo root, not the package location.

Same issue existed in `ConfigLoader.ts` — it also used the hardcoded `@designerpunk/core` package name.

## Resolution

Replaced `require.resolve` with `__dirname`-relative resolution in both files:

```typescript
// src/cli/designerpunk.ts
function resolvePackageRoot(): string {
  const fromCli = path.resolve(__dirname, '../..');
  if (require('fs').existsSync(path.join(fromCli, 'package.json'))) {
    return fromCli;
  }
  return process.cwd();
}
```

This works in both contexts:
- **Product repo**: CLI runs from `node_modules/@3fn/core/src/cli/` → two levels up is `node_modules/@3fn/core/` → `package.json` exists ✅
- **DesignerPunk repo**: CLI runs from `src/cli/` → two levels up is repo root → `package.json` exists ✅

No hardcoded package name. No dependency on the package being named any particular thing.

### Files Changed

- `src/cli/designerpunk.ts` — `resolvePackageRoot()` uses `__dirname` instead of `require.resolve`
- `src/config/ConfigLoader.ts` — `tokenSourceRoot` resolution uses `__dirname` instead of `require.resolve`
- `src/config/__tests__/ConfigLoader.test.ts` — updated test to reflect `__dirname`-based resolution

## Lesson

Don't hardcode package names in resolution logic. The package name can change (it already did — from `designer-punk-v2` to `@3fn/core`, with `@designerpunk/core` as the target). `__dirname`-relative resolution is name-independent and works in any installation context.
