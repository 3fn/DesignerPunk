# Task 3.2 Completion: Split Token Source Copy and Add Build Import Transform

**Date**: 2026-05-09
**Task**: 3.2 Split token source copy and add build import transform
**Type**: Implementation
**Status**: Complete

---

## Artifacts Created

- `src/cli/init.ts` (updated) — Split copy, `rewriteBuildImports` function, applied to component copies

---

## Implementation Details

### Approach

Split the single token source copy into two operations:
1. `src/tokens/` (excluding `component/`) — no transform needed
2. `src/tokens/component/` — with `rewriteBuildImports` transform

Also applied `rewriteBuildImports` to the `src/components/core/` copy (component token files there also import from `../../build/tokens`).

### `rewriteBuildImports` Regex

```typescript
/from\s+['"]\.\.\/(?:\.\.\/)*build\/tokens(?:\/[^'"]*)?['"]/g
```

Handles: `../build/tokens`, `../../build/tokens`, `../../../build/tokens`, and specific-file imports like `../../build/tokens/defineComponentTokens`.

---

## Validation (Tier 2: Standard)

- ✅ Req 4.3: Init transforms build imports to `@3fn/core/build`
- ✅ Req 5.2: Build import transform applied to component token files
- ✅ Req 5.3: Directory structure preserved between tokens/ and components/
