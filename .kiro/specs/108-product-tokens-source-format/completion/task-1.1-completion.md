# Task 1.1 Completion: Implement TokenRefResolver Class

**Date**: 2026-05-25
**Spec**: 108 - Product Tokens — Source Format & MCP Discoverability
**Task**: 1.1 — Implement TokenRefResolver class
**Agent**: Lina (with Ada consultation for token-index structure)
**Status**: Complete

---

## What Was Done

Created `product-mcp-server/src/indexer/TokenRefResolver.ts` — a lightweight class that reads the three `token-index/*.yaml` files and resolves canonical token names to their values with inferred unit types.

## Implementation Details

### Resolution Strategy (4-path)

1. **Primitive direct** — found in `primitives.yaml` → return `{ value, unitType: inferFromFamily, depth: 'full' }`
2. **Semantic chain** — found in `semantics.yaml`:
   - Single-key primitiveReferences (e.g., `{ value: 'pink400' }` or `{ spacing: 'space200' }`): chase to primitive → full depth
   - Multi-key (typography, motion, shadow): return partial with category-based unitType
   - Null primitiveReferences (layering tokens): return partial with category-based unitType
3. **Component chain** — found in `components.yaml`:
   - `primitiveReferences.value` is a primitive name: chase → full depth
   - `primitiveReferences.value` is a literal (e.g., `'11'`): parse as number, return partial
   - Null primitiveReferences: return partial
4. **Not found** → return `null`

### Key Design Decisions

- `extractPrimaryRef()` uses single-key → use it, multi-key with `value` key → use `value`, otherwise → null (partial). This handles all observed patterns in the token-index.
- `inferUnitType()` maps all 21 primitive families to their logical unit types.
- `CATEGORY_UNIT_MAP` provides fallback unitType inference for semantic tokens that can't be fully resolved.
- Literal values in component tokens are parsed as numbers when possible (`'11'` → `11`).
- Missing `token-index/` directory is handled gracefully — resolver loads nothing, all resolves return null.

### Cross-Domain Consultation (Ada)

Ada confirmed:
- Semantic primitiveReferences are always direct primitive refs or literals (no semantic-to-semantic chains)
- Component tokens always use single-key `{ value: ... }` pattern
- Null primitiveReferences exist for layering tokens (zIndex, elevation)
- All 21 primitive families are accounted for in the mapping table
- `custom:` prefixed values and string literals exist in icon semantic tokens

## Files Created

| File | Purpose |
|------|---------|
| `product-mcp-server/src/indexer/TokenRefResolver.ts` | TokenRefResolver class (125 lines of logic) |

## Verification

- TypeScript compilation: ✅ passes (`npx tsc --noEmit`)
- Smoke test against real `token-index/`: ✅ all 6 resolution paths verified
  - Primitive (`space300`) → `{ value: 24, unitType: 'logical', depth: 'full' }`
  - Semantic single-key (`color.feedback.error.text`) → full depth, color unitType
  - Semantic multi-key (`typography.bodyMd`) → partial depth
  - Component with primitive ref (`buttonicon.inset.large`) → full depth, logical unitType
  - Component with literal (`verticallistitem.paddingBlock.rest`) → `{ value: 11, depth: 'partial' }`
  - Unknown token → `null`

## Requirements Coverage

| Requirement | AC | Status |
|-------------|-----|--------|
| 3.1 | Resolve refs across all token-index files | ✅ |
| 3.2 | Primitive resolution with value + inferred unitType | ✅ |
| 3.3 | Semantic chain resolution (full for single-key, partial for multi-key) | ✅ |
| 3.4 | Failed resolution returns null + enables warning | ✅ |
| 3.5 | Missing token-index directory handled gracefully | ✅ |
| 3.6 | Reads token-index YAML directly (no Application MCP dependency) | ✅ |
| 3.7 | unitType inferred from family mapping table | ✅ |
