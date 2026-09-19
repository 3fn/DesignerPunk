# @3fn/core Feedback — Lina (Stemma Component Specialist)

**Date**: 2026-05-10
**Context**: Running Button-CTA tests from product repo after modifying the component
**Agent**: Lina — component testing
**Severity**: Blocking — cannot test any component that imports blend utilities

---

## Component Source Files Have Unresolvable Relative Imports

**Issue**: `ButtonCTA.web.ts` (in `src/components/core/Button-CTA/platforms/web/`) imports:

```typescript
import { getBlendUtilities, BlendUtilitiesResult } from '../../../../../blend/ThemeAwareBlendUtilities.web';
```

This path resolves within `@3fn/core`'s source tree (`node_modules/@3fn/core/src/blend/...`) but NOT from the product repo's `src/components/core/` copy. When Jest/ts-jest tries to compile the component for testing, it fails:

```
TS2307: Cannot find module '../../../../../blend/ThemeAwareBlendUtilities.web'
```

**Root cause**: The product repo mirrors `@3fn/core`'s component source files in `src/components/core/` but doesn't mirror the entire `src/` tree (no `src/blend/`, no `src/tokens/`, etc.). Relative imports that reach outside the component directory break.

---

## What I Tried (All Failed)

| Approach | Result |
|----------|--------|
| `moduleNameMapper` in jest.config.js | Handles runtime resolution but NOT TypeScript compilation — ts-jest still fails with TS2307 |
| `paths` in tsconfig.test.json | TypeScript `paths` doesn't support relative path patterns as keys |
| Change import to `@3fn/core/src/blend/...` | Subpath not exported — TS2307 "Cannot find module" |
| Change import to `@3fn/core/blend` | No such export exists in package.json exports |
| `@ts-ignore` on the import | Suppresses the type error but ts-jest still can't resolve the module at runtime |

**The fundamental problem**: ts-jest needs BOTH TypeScript type resolution AND runtime module resolution to work. `moduleNameMapper` only fixes runtime; TypeScript's compiler still can't find the types.

---

## Impact

Any component that imports from outside its own directory tree cannot be tested from the product repo:

- **Button-CTA** — imports blend utilities ❌ BLOCKED
- **Button-Icon** — likely same import ❌ BLOCKED  
- **Chip-Base / Chip-Filter / Chip-Input** — likely same ❌ BLOCKED
- **Any component using `getBlendUtilities()`** — ❌ BLOCKED

Components that DON'T import cross-directory (Nav-Header-App, NavAboutPopover) work fine — our 35 Spec 000 tests all pass.

---

## Recommended Fix (for @3fn/core team)

**Export blend utilities as a package subpath:**

```json
// package.json exports
"./blend": {
  "import": "./dist/blend/index.js",
  "require": "./dist/blend/index.js",
  "types": "./dist/blend/index.d.ts"
}
```

Then update all component source files:
```typescript
// Before (breaks in product repos)
import { getBlendUtilities } from '../../../../../blend/ThemeAwareBlendUtilities.web';

// After (works everywhere)
import { getBlendUtilities } from '@3fn/core/blend';
```

This is the same pattern already used for `@3fn/core/testing` and `@3fn/core/jest-preset`.

**Alternative** (if subpath export isn't feasible): Add the blend path mapping to the jest preset's `moduleNameMapper` AND provide a `pathsToModuleNameMapper` utility that generates the correct tsconfig paths for ts-jest. But this is a band-aid — the real fix is package-level imports.

---

## Current State

- `@3fn/core@11.5.1` installed
- Local component imports updated to `@3fn/core/blend` ✅
- TypeScript resolves correctly ✅
- **Jest runtime fails**: `dist/blend/BlendCalculator.js` requires `'../tokens/BlendTokens'` but `dist/tokens/BlendTokens.js` does not exist in the package

```
Cannot find module '../tokens/BlendTokens' from 'node_modules/@3fn/core/dist/blend/BlendCalculator.js'
```

**Fix needed**: Either include `dist/tokens/BlendTokens.js` in the package build, or bundle the BlendTokens dependency into BlendCalculator so it doesn't require an external file.

- Spec 000 tests (35): ✅ All pass (no blend dependency)
- Spec 001 Button-CTA tests: ❌ BLOCKED (missing `dist/tokens/BlendTokens.js`)

Awaiting fix from `@3fn/core` team.
