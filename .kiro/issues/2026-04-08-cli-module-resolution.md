# CLI Cannot Resolve Pipeline Modules in Product Repo

**Date**: 2026-04-08
**Severity**: High (blocks Task 5.4 — CLI validation)
**Agent**: Lina (found during fresh-repo validation)
**Blocks**: Spec 095 Task 5.4
**Status**: ✅ Resolved (2026-04-08)
**Resolved by**: Ada

## Problem

`dist/cli/designerpunk.js` uses `require('../generators/generateTokenFiles')` which expects compiled JS at `dist/generators/`. The generators ship as TypeScript source in `src/`, not compiled JS in `dist/`. When a product repo runs `npx designerpunk generate`, it fails:

```
Error: Cannot find module '../generators/generateTokenFiles'
Require stack:
- /node_modules/@3fn/core/dist/cli/designerpunk.js
```

Same issue affects `mcp:app` and `mcp:docs` commands if they import from `src/` paths.

## Root Cause

The CLI was compiled by `tsc` which resolved relative imports to `dist/` siblings. But only the CLI itself was compiled to `dist/cli/` — the generators, resolvers, config loader, and other pipeline modules remain as TypeScript source in `src/`. The compiled CLI can't import TypeScript source via `require()`.

## Resolution

Created `bin/designerpunk.js` — a thin JS wrapper that registers `tsx` as a require hook, then loads `src/cli/designerpunk.ts` directly. The entire pipeline runs as TypeScript through `tsx`. No compiled CLI needed.

```javascript
// bin/designerpunk.js
require('tsx/cjs/api').register();
require('../src/cli/designerpunk.ts');
```

Changes:
- New `bin/designerpunk.js` — actual `bin` entry point (plain JS, bootstraps tsx)
- `src/cli/designerpunk.ts` — unchanged (stays as TypeScript source)
- `designerpunk.config.ts` — fixed import to use `.ts` extension (tsx ESM resolution requires it)
- `tsx` installed as a dependency
- `package.json` `bin` field should point to `./bin/designerpunk.js` (Lina's Task 2.3)

## Lesson

Compiling a CLI entry point to JS while its import chain remains TypeScript creates a resolution gap. When the pipeline is TypeScript-native (executed via `tsx`), the CLI should be too. The bin wrapper pattern — plain JS bootstraps `tsx`, then loads TypeScript — bridges the gap cleanly.

## Spec Doc Updates Needed (Post CLI Resolution Fix)

The `bin` entry point changed from `./dist/cli/designerpunk.js` to `./bin/designerpunk.js`. The following spec docs reference the old path and should be updated to reflect the resolution:

| Document | Location | Old Value | New Value |
|----------|----------|-----------|-----------|
| `tasks.md` | Task 2.3 | `"designerpunk": "./dist/cli/designerpunk.js"` | `"designerpunk": "./bin/designerpunk.js"` |
| `design.md` | package.json `bin` field | `"./dist/cli/designerpunk.js"` | `"./bin/designerpunk.js"` |
| `design.md` | Package Structure diagram | `dist/cli/ — Compiled CLI` | `bin/designerpunk.js — CLI entry point (tsx bootstrap)` |
| `requirements.md` | R5 AC 6 | `"./dist/cli/designerpunk.js"` | `"./bin/designerpunk.js"` |

Feedback docs and completion docs reference the old path as historical context — those don't need updating (they document what was decided at the time, and the issue doc captures the resolution).

The `files` field in `design.md` should also add `"bin/"` and can remove `"dist/cli/"` since the CLI no longer needs to be compiled.
