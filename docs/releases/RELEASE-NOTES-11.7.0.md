# Release 11.7.0

**Date**: 2026-05-25  
**Previous**: 11.6.0  
**Bump**: minor

## 🟡 Ecosystem Changes

- **Product Token Source Format & MCP Discoverability** *(Spec 108)*
  Established a structured YAML source format for product-level tokens (`product/tokens/*.yaml`) and made them queryable via the Product MCP's new `get_product_tokens` tool. Product tokens are values owned by a product vertical that don't belong in Rosetta (system tokens) or Stemma (component tokens) — layout constraints, motion characteristics, product-specific colors. The format supports hard values (with `unitType` + `rationale`) and references to system tokens (with automatic resolution). Validation rules enforce camelCase naming, value-or-ref exclusivity, platform-limited unit types, and per-token error isolation.

- **Product Token Platform Generation** *(Spec 109)*
  Implemented the generation pipeline that transforms `product/tokens/*.yaml` into platform-native output: CSS custom properties (`dist/product/ProductTokens.web.css`), Swift constants (`dist/product/ProductTokens.ios.swift`), and Kotlin objects (`dist/product/ProductTokens.android.kt`). Ref tokens emit platform references (`var(--space-300)`, `DesignTokens.space300`, `DesignTokens.space_300`) rather than resolved values. Theme-varying refs emit correct patterns per platform (CSS unchanged, Swift protocol extension, Kotlin composable getter).

- **Product Token Validation CLI** *(Spec 109)*
  Added `npx designerpunk validate --product-tokens` command that checks all product token refs against the token-index and reports broken refs with actionable messages. Exit code 0 for valid, 1 for broken. Integrates into CI workflows.

- **Pipeline Integration** *(Spec 109)*
  `npx designerpunk generate` now produces product token output when `productTokens` is configured in `designerpunk.config.ts`. Generation runs after system tokens (guaranteed fresh token-index). Broken refs warn but never block system token output.

- **Token-Index Format Extension** *(Spec 109)*
  Token-index now stores fully qualified platform access paths for nested primitives (`Duration.duration150`) and component tokens (`ButtonIconTokens.insetLarge`). Enables the product token generator to emit correct platform references without namespace guessing. Change is transparent to existing consumers.

- **Product MCP Enhancements** *(Spec 109)*
  Added `promotionCandidate` boolean filter to `get_product_tokens` for governance queryability during Lessons Synthesis Reviews. Added `themeVarying` field to resolved ref responses, enabling platform agents to determine correct output patterns.

## 📦 New Configuration

```typescript
// designerpunk.config.ts
export default defineConfig({
  name: 'MyProduct',
  abbreviation: 'MP',
  productTokens: './product/tokens',  // NEW — enables product token generation
});
```

## 📊 Stats

- 8,483 tests passing (340 suites)
- Product MCP: 135 tests (9 suites)
- Product generator: 53 tests (5 suites)
- New files: ~20 implementation files across product-mcp-server/ and src/build/product/
