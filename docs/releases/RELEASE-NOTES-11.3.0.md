# Release 11.3.0

**Date**: 2026-05-09
**Previous**: 11.2.1
**Bump**: minor
**Spec**: 104 — Token Source Portability

---

## Summary

Makes token definition files fully portable. When `tokenSource` is set, ALL token tiers (primitive, semantic, and component) now resolve from local source with no silent fallback to the package. A lint boundary prevents portability regressions at CI time.

---

## Features

### Component Token Portability

When `tokenSource` is configured, the CLI now auto-discovers and loads component token files from local source. Edited primitive values propagate to component tokens that reference them.

- Auto-discovers `{tokenSource}/component/*.ts` files
- Scans configured `componentTokens` directories for `*.tokens.ts` files
- Emits warning (not error) if no component tokens found
- No silent fallback to package — all-or-nothing when `tokenSource` is set

### `@3fn/core/build` Subpath Export

Component token files can now import `defineComponentTokens` from `@3fn/core/build` instead of relative paths into internal directories. Init transforms existing relative imports automatically.

### Lint Boundary Enforcement

A CI test enforces that files in `src/tokens/` and `src/tokens/semantic/` only import from `../types/` or within the token source. Prevents future portability regressions at authoring time.

### Init Improvements

- Copies `src/types/` alongside token source (relative type imports resolve naturally)
- Splits token source copy: primitives/semantics (no transform) + component tokens (with `rewriteBuildImports`)
- Generated config now includes `tokenSource: './src/tokens'` and `componentTokens: ['./src/components/core', './src/tokens/component']`

---

## Breaking Changes (Internal Only)

### Removed Deprecated Re-exports from `semantic/ColorTokens.ts`

`AvatarColorTokens` and `BadgeNotificationColorTokens` are no longer re-exported from `semantic/ColorTokens.ts`. These were deprecated in Spec 058 and had zero consumers. Use canonical imports:

```typescript
import { AvatarColorTokens } from 'src/components/core/Avatar-Base/avatar.tokens';
import { BadgeNotificationColorTokens } from 'src/components/core/Badge-Count-Notification/tokens';
```

### Removed `rewriteTypeImports` Init Transform

The type import rewrite transform is removed. With `src/types/` now shipped alongside tokens, relative imports resolve naturally. Existing product repos with `@3fn/core/types` imports continue to work (subpath export still exists).

---

## Migration

For existing product repos using `tokenSource`:
- Re-run `npx designerpunk init` to get `src/types/` and updated component token files
- Or manually copy `src/types/` from the package to your `src/types/`

---

## Files Changed

- `src/tokens/SpacingTokens.ts` — Inlined `STRATEGIC_FLEXIBILITY_TOKENS` constant
- `src/tokens/semantic/TypographyTokens.ts` — Inlined `Math.round(16 * 0.88)` (removed UnitConverter)
- `src/tokens/semantic/ColorTokens.ts` — Removed deprecated re-exports
- `src/cli/loadComponentTokens.ts` — New: component token discovery and loading
- `src/cli/designerpunk.ts` — Wires component token loading when `tokenSource` is set
- `src/cli/init.ts` — Types copy, split token copy, `rewriteBuildImports`, updated config
- `src/tokens/__tests__/portability-boundary.test.ts` — New: lint boundary (42 tests)
- `package.json` — Added `./build` subpath export, version bump
