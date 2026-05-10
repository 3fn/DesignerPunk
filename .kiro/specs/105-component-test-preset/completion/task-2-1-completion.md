# Task 2.1 Completion: Add Subpath Exports and Files Entries

**Date**: 2026-05-10
**Task**: 2.1 Add subpath exports and files entries to package.json
**Type**: Implementation
**Status**: Complete

---

## Artifacts Created

- `package.json` (updated) — 2 subpath exports + 7 files entries

---

## Implementation Details

### Subpath Exports Added

| Export | Condition | Target |
|--------|-----------|--------|
| `./jest-preset` | `require` | `./dist/testing/jest-preset.js` |
| `./testing` | `import`, `require`, `types` | `./dist/testing/index.js`, `./dist/testing/index.d.ts` |

`jest-preset` uses `require` only — Jest configs use `require()`, not `import`.

### Files Entries Added

```
dist/testing/jest-preset.js
dist/testing/jest-preset.d.ts
dist/testing/index.js
dist/testing/index.d.ts
dist/testing/style-mock.js
dist/testing/validators.js
dist/testing/validators.d.ts
```

### Build Verification

All 7 artifacts produced by `tsc --skipLibCheck`. Exports resolve correctly:
- `jest-preset`: `testEnvironment: 'jsdom'` ✅
- `testing`: exports `registerComponent`, `cleanupDOM`, `waitForShadowDOM`, etc. ✅
- `validators`: exports Stemma validator classes ✅

---

## Validation (Tier 2: Standard)

- ✅ Build produces all 7 dist/testing/ artifacts
- ✅ Subpath exports resolve correctly from compiled JS
- ✅ No regressions (330/331 suites pass; 1 failure is pre-existing)
- ✅ Req 1.1: Preset exported via `@3fn/core/jest-preset`
- ✅ Req 1.2: Pre-compiled JS in `dist/`
- ✅ Req 2.1: Utilities exported via `@3fn/core/testing`
- ✅ Req 2.8: Pre-compiled JS with TypeScript declarations
- ✅ Req 3.1: Validators accessible via `@3fn/core/testing`
