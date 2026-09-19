# Issue: `npx designerpunk generate` still produces RGBA after v12.0.0 upgrade

**Date**: 2026-06-10
**Version**: @3fn/core 12.0.0
**Product**: DP-Portfolio

## Problem

After upgrading to v12.0.0 and following the documented upgrade path, `npx designerpunk generate --force` still outputs RGBA format (`--pink-300: rgba(255, 42, 109, 1)`) instead of OKLCH (`--pink-300: oklch(0.65 0.242 10)`).

## Steps Taken

1. ✅ `npm install @3fn/core@12.0.0`
2. ⚠️ `npx designerpunk sync --force` — produces no output (non-TTY environment issue — see below)
3. Manually copied `src/tokens/color/` channel directory from package
4. Manually synced updated token source files (ColorTokens.ts deprecated, semantic/ColorTokens.ts, etc.)
5. ✅ `npx designerpunk generate --force` — runs without error but output remains RGBA

## Suspected Causes

1. **Sync didn't fully complete** — the `sync` command produces no output in non-TTY environments (CI, IDE terminals, piped shells). It may not be applying changes correctly when `!process.stdin.isTTY` even with `--force`.

2. **Missing config flag?** — `designerpunk.config.ts` has no `colorFormat` or OKLCH-related option. Is there a config migration step not in the release notes?

3. **Generator detection failing** — the generator may look for a manifest or marker that sync should have created (`.kiro/sync-manifest.json` was never generated in our environment).

## Environment

- Node: 22.20.0
- OS: macOS
- Terminal: Non-interactive (Kiro CLI agent shell — `process.stdin.isTTY` is false)
- `designerpunk.config.ts`: standard config with `tokenSource: './src/tokens'`

## Sync TTY Issue (Related)

The sync command's non-TTY guard may be too aggressive:
```typescript
if (!process.stdin.isTTY && !force && !dryRun) {
  console.log('Non-interactive environment detected — running in dry-run mode.\n');
  return runSync({ ...options, dryRun: true });
}
```

Even with `--force`, the command produces zero output and creates no manifest. It's unclear whether force mode is actually executing in non-TTY.

## Question

Is there a migration step missing from the release notes' upgrade path, or does the generator require something that only a successful `sync` (with manifest creation) provides?
