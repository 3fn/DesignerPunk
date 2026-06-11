# Issues Found During v12.0.0 Upgrade: Sync + Upgrade Path Gaps

**Date**: 2026-06-10
**Version**: @3fn/core 12.0.2
**Product**: DP-Portfolio

---

## Issue 1: `sync --force` Doesn't Work in Non-TTY Environments

### Problem

`npx designerpunk sync --force` produces zero output, creates no manifest, and applies no changes when `process.stdin.isTTY` is false. This affects:
- CI/CD pipelines
- IDE agent terminals (Kiro CLI, VS Code tasks)
- Scripted automation
- Any piped/non-interactive shell

### Expected Behavior

`--force` should bypass ALL interactivity guards — it's the explicit "I know what I'm doing, apply everything" flag. The non-TTY guard should only gate the *interactive* path (prompting for conflict resolution), not the force path.

### Current Behavior

No output, no manifest, no file changes. Silent no-op.

### Impact

The `sync` command is unusable in any automated or agent-driven workflow. We had to manually `cp` files from `node_modules/` — the exact problem `sync` was built to solve.

---

## Issue 2: Upgrade Path Missing Semantic Token File Sync

### Problem

The v12.0.0 release notes document this upgrade path:
```
npm install @3fn/core@12.0.0
npx designerpunk sync
npx designerpunk generate
```

When sync doesn't work (Issue 1), `generate` fails with:
```
❌ Semantic token validation failed:
   Semantic token 'shadow.modal' has invalid offsetY reference 'shadowOffsetY.600'
   Semantic token 'shadow.modal' has invalid blur reference 'blur400'
   Semantic token 'space.sectioned.generous' references non-existent primitive 'space1200'
   Semantic token 'space.sectioned.expansive' references non-existent primitive 'space1600'
```

### Root Cause

v12 added new primitives (`shadowOffsetY.600`, `blur400`, `space1200`, `space1600`) and updated semantic tokens to reference them. The semantic token *source files* in the consumer project (`src/tokens/semantic/*.ts`) are stale — they reference primitives that only exist in the updated package.

### Resolution Required

Manually sync these files from `node_modules/@3fn/core/src/tokens/semantic/`:
- `ShadowTokens.ts`
- `SpacingTokens.ts`
- `TypographyTokens.ts`

After manual sync, `generate --force` succeeds and produces correct OKLCH output.

### Suggestion

If `sync` can't run (non-TTY), the `generate` error message should suggest: "Run `npx designerpunk sync` to update token source files, or manually copy from `node_modules/@3fn/core/src/tokens/semantic/`."

---

## Summary

Both issues share a root cause: `sync` is non-functional in non-interactive environments. Once Issue 1 is fixed, Issue 2 goes away (sync would update the semantic files automatically). In the meantime, the upgrade path needs documentation for the manual fallback.
