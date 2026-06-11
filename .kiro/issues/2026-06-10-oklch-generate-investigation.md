# Investigation: OKLCH Generate Still RGBA in Consumer (DP-Portfolio)

**Date**: 2026-06-10
**Related**: `.kiro/issues/2026-06-10-oklch-generate-still-rgba.md`
**Investigator**: Thurgood

---

## Findings

The generator code in `@3fn/core@12.0.0` IS correct. The OKLCH branch fires when `category === TokenCategory.COLOR` (line 1669 of `src/generators/TokenFileGenerator.ts`). Channel imports are package-internal (relative paths within the package). The bin entry uses `tsx` to run TypeScript source directly — no compiled `dist/` for CLI.

**The generator code is published correctly and the OKLCH path is functional.**

## Most Likely Cause: Sync TTY Bug

The consumer reports that `npx designerpunk sync --force` produced **no output** in their non-TTY environment. The sync guard logic:

```typescript
if (!process.stdin.isTTY && !force && !dryRun) {
  // auto dry-run
}
```

The check uses `!force` — so `--force` SHOULD bypass the TTY guard. But the consumer reports zero output even with `--force`. Possible issues:

1. **Flag parsing**: Is `--force` being parsed correctly? Check if `process.argv` includes it after `sync`.
2. **The consumer's `src/tokens/ColorTokens.ts` is the old RGBA version**: If sync didn't run, the consumer's local barrel (`src/tokens/index.ts`) still exports old `getAllPrimitiveTokens()` which returns RGBA-format tokens. The generator calls `resolveTokens(config)` which loads from the consumer's stale local source.
3. **Generator branching**: Even though the OKLCH branch fires, it imports `allComposedColors` from the *package's* `src/tokens/color/`. But the RGBA tokens from `resolveTokens()` (local source) are ALSO passed to the generator and may be emitted by the legacy path for non-COLOR categories... wait, the COLOR category `continue` should skip them entirely.

## Root Cause (High Confidence)

**The consumer's `resolveTokens()` loads old RGBA ColorTokens.ts from their local `src/tokens/`.** The generator's OKLCH path imports composed colors from the package (`allComposedColors`), but the `primitiveTokens` array passed to `generatePlatformTokens()` ALSO contains the old RGBA color tokens from the consumer's local source. 

Looking at line 1666-1670:
```typescript
const tokens = this.getGenerationPrimitives(options.primitiveTokens || getAllPrimitiveTokens());
// ...
if (category === TokenCategory.COLOR) {
  // OKLCH output from package's allComposedColors
  continue;
}
```

The COLOR tokens from `options.primitiveTokens` are skipped (via `continue`), and OKLCH output comes from the package's `allComposedColors`. **This should work regardless of what the consumer's token source provides.**

## Alternative Theory: Import Resolution Failure

If `tsx` can't resolve `'../tokens/color/channels/hues'` from within `node_modules/@3fn/core/src/generators/TokenFileGenerator.ts`, the import would throw at module load time — the generator wouldn't run at all. But the consumer says `generate` "runs without error." This rules out import failures.

## Recommended Debug Steps (For Ada)

1. Have the consumer run: `node -e "require('tsx/cjs/api').register(); const t = require('@3fn/core/src/generators/TokenFileGenerator'); console.log(typeof t.TokenFileGenerator.prototype.generateOklchWebColors)"`
   - If `'function'` → OKLCH code is loaded
   - If `undefined` → package published without the changes

2. Have the consumer check: `grep "generateOklchWebColors" node_modules/@3fn/core/src/generators/TokenFileGenerator.ts`
   - If found → code is in the package
   - If not → publish didn't include the changes

3. Check generated output for channel properties: `grep "pink-hue\|pink-l300" dist/DesignTokens.web.css`
   - If present → OKLCH IS working but RGBA tokens are also being emitted (dual output)
   - If absent → OKLCH branch isn't executing

## Action Required

**Most likely root cause: Stale node_modules cache.**

The consumer may have `node_modules/@3fn/core` at an old version despite `package.json` showing 12.0.0. npm sometimes serves from cache without redownloading.

**Tell test01 to run:**
```bash
rm -rf node_modules/@3fn/core
npm install @3fn/core@12.0.0
npx designerpunk generate --force
grep "pink-300" dist/DesignTokens.web.css
```

If that still shows RGBA, have them check:
```bash
grep "generateOklchWebColors" node_modules/@3fn/core/src/generators/TokenFileGenerator.ts
# AND
grep "if (category === TokenCategory.COLOR)" node_modules/@3fn/core/src/generators/TokenFileGenerator.ts
```

If the OKLCH branch exists but still produces RGBA, the issue is that `getUniqueCategories(tokens)` doesn't include `'color'` — meaning their local `resolveTokens()` returns tokens without any color category (their `src/tokens/index.ts` barrel might not export `colorTokens`).
