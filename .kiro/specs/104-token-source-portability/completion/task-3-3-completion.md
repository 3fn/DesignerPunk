# Task 3.3 Completion: Update Generated Config

**Date**: 2026-05-09
**Task**: 3.3 Update generated config
**Type**: Setup
**Status**: Complete

---

## Artifacts Created

- `src/cli/init.ts` (updated) — `generateConfig()` now includes `tokenSource` and both `componentTokens` dirs

---

## Implementation Details

Updated `generateConfig()` to produce:
```typescript
tokenSource: './src/tokens',
componentTokens: ['./src/components/core', './src/tokens/component'],
```

This ensures new product repos get the full `tokenSource` experience out of the box.

---

## Validation (Tier 1: Minimal)

- ✅ Req 5.4: Generated config includes `tokenSource` and both component token directories
