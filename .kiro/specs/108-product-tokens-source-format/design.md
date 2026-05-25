# Design Document: Product Tokens — Source Format & MCP Discoverability

**Date**: 2026-05-25
**Spec**: 108 - Product Tokens — Source Format & MCP Discoverability
**Status**: Design Phase
**Dependencies**: None (Spec 109 depends on this)

---

## Overview

This design implements product token support in the Product MCP: a YAML source format, an indexer that parses and validates token files, a reference resolver that reads the system token index, a query tool (`get_product_tokens`), health reporting integration, and governance documentation.

The implementation follows the existing Product MCP architecture — a new `ProductTokenIndexer` class joins the `ProductIndexer` orchestration, consistent with how `PrinciplesParser`, `ReverseIndexBuilder`, and `GapDetector` are structured.

---

## Architecture

```
product/tokens/*.yaml
        │
        ▼
┌─────────────────────┐      ┌──────────────────┐
│ ProductTokenIndexer  │─────▶│  TokenRefResolver │
│  - parse YAML        │      │  - reads token-index/
│  - validate entries  │      │  - resolves refs
│  - store in memory   │      │  - infers unitType
└─────────────────────┘      └──────────────────┘
        │
        ▼
┌─────────────────────┐
│   ProductIndexer     │  (existing orchestrator)
│  - indexTokens()     │
│  - getProductTokens()│
└─────────────────────┘
        │
        ▼
┌─────────────────────┐
│  Product MCP Server  │
│  - get_product_tokens│
│  - get_product_health│
└─────────────────────┘
```

---

## Components and Interfaces

### ProductTokenIndexer

New class at `product-mcp-server/src/indexer/ProductTokenIndexer.ts`.

```typescript
interface ProductTokenEntry {
  name: string;
  value: number | string | null;
  unitType: string | null;
  ref: string | null;
  resolvedValue: number | string | null;
  resolvedUnitType: string | null;
  resolutionDepth: 'full' | 'partial' | null;  // null for hard-value tokens, 'full' or 'partial' for refs
  description: string;
  rationale: string | null;
  usage: string | null;
  platforms: string[];
  promotionCandidate: boolean;
}

interface ProductTokenCategory {
  name: string;           // from filename (e.g., "layout" from layout.yaml)
  description: string;    // from category-level `description` field
  tokens: ProductTokenEntry[];
}

interface ProductTokenHealth {
  tokenCount: number;
  categoryCount: number;
  errorCount: number;
  warningCount: number;
  errors: string[];
  warnings: string[];
}

class ProductTokenIndexer {
  private categories: ProductTokenCategory[] = [];
  private health: ProductTokenHealth;
  private resolver: TokenRefResolver;

  constructor(tokenIndexDir: string | undefined);

  /** Parse all YAML files in tokensDir, validate, resolve refs */
  index(tokensDir: string): void;

  /** Query tokens with optional filters */
  query(filters: { category?: string; name?: string; platform?: string }): {
    categories: ProductTokenCategory[];
    warnings: string[];
  };

  /** Health data for get_product_health */
  getHealth(): ProductTokenHealth;
}
```

### TokenRefResolver

Lightweight class at `product-mcp-server/src/indexer/TokenRefResolver.ts`. ~60 lines.

```typescript
interface ResolvedRef {
  value: number | string;
  unitType: string;
  depth: 'full' | 'partial';  // partial = multi-value semantic or literal component ref
}

class TokenRefResolver {
  private primitives: Map<string, { value: any; family: string }>;
  private semantics: Map<string, { category: string; primitiveReferences: Record<string, string> }>;
  private components: Map<string, { component: string; primitiveReferences: Record<string, string> }>;

  constructor(tokenIndexDir: string | undefined);

  /** Load all three index files into maps */
  load(): void;

  /** Resolve a canonical token name to its value and unitType */
  resolve(name: string): ResolvedRef | null;

  /**
   * Resolution strategy:
   * 1. Check primitives — direct value + family → unitType. Return full.
   * 2. Check semantics — extract primary primitive ref from primitiveReferences:
   *    - Single-key entries: use that key's value (e.g., { value: 'green400' } or { spacing: 'space200' })
   *    - Multi-key entries (typography): return depth 'partial', unitType from category
   *    Then chase the primitive ref through step 1 for full resolution.
   * 3. Check components — extract from primitiveReferences:
   *    - If value is a primitive name that resolves: chase through step 1
   *    - If value is a literal (e.g., '11'): return as-is with unitType 'unknown', depth 'partial'
   * 4. Not found in any file: return null
   */

  /** Infer unitType from primitive family (primary path) */
  private inferUnitType(family: string): string;

  /**
   * Extract the primary primitive reference from a primitiveReferences object.
   * Heuristic: if single key, use it. If 'value' key exists, prefer it.
   * If multiple keys (typography), return null (triggers partial resolution).
   */
  private extractPrimaryRef(primitiveRefs: Record<string, string>): string | null;
}
```

**Resolution flow:**

```
ref: "space300"
  → found in primitives → value: 24, family: "spacing" → unitType: "logical" → depth: "full"

ref: "color.feedback.error.text"
  → found in semantics → primitiveReferences: { value: "pink400" }
  → extractPrimaryRef → "pink400"
  → chase: found in primitives → value: "#E91E63", family: "color" → unitType: "color" → depth: "full"

ref: "typography.heading.large"
  → found in semantics → primitiveReferences: { fontSize: "fontSize400", lineHeight: "lineHeight400", ... }
  → extractPrimaryRef → null (multi-key)
  → return depth: "partial", unitType inferred from category "typography"

ref: "buttonIcon.inset.large"
  → found in components → primitiveReferences: { value: "space200" }
  → extractPrimaryRef → "space200"
  → chase: found in primitives → value: 16, family: "spacing" → unitType: "logical" → depth: "full"

ref: "verticallistitem.paddingBlock.rest"
  → found in components → primitiveReferences: { value: "11" }
  → extractPrimaryRef → "11"
  → chase: "11" not found in primitives → literal value
  → return value: 11, unitType: "unknown", depth: "partial"
```

### Family → UnitType Mapping Table

```typescript
const FAMILY_UNIT_MAP: Record<string, string> = {
  spacing: 'logical',
  sizing: 'logical',
  tapArea: 'logical',
  radius: 'logical',
  borderWidth: 'logical',
  fontSize: 'logical',
  letterSpacing: 'logical',
  blur: 'logical',
  breakpoint: 'logical',
  color: 'color',
  opacity: 'percent',
  duration: 'duration',
  easing: 'easing',
  scale: 'ratio',
  lineHeight: 'ratio',
  density: 'ratio',
  fontWeight: 'count',
  fontFamily: 'string',
  shadow: 'composite',
  glow: 'composite',
  blend: 'composite',
};

// Fallback for unknown families
const DEFAULT_UNIT_TYPE = 'unknown';
```

### Validation Logic

Validation runs at two levels: category-level (filename) and token-level (per entry).

**Category-level validation** (in `ProductTokenIndexer.index()`):

```typescript
function validateCategoryFile(filename: string, data: any): string[] {
  const errors: string[] = [];
  const name = filename.replace('.yaml', '');

  // Filename must be lowercase ASCII + hyphens
  if (!/^[a-z][a-z\-]*[a-z]$/.test(name) && !/^[a-z]$/.test(name))
    errors.push(`Category '${name}' must be lowercase ASCII letters and hyphens only (a-z, -).`);

  // Category field must match filename (if present)
  if (data.category && data.category !== name)
    errors.push(`Category field '${data.category}' does not match filename '${name}'.`);

  return errors;
}
```

**Token-level validation** (per entry within a valid category):

```typescript
function validateToken(name: string, entry: any, categoryName: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Structural validation
  if (entry.value != null && entry.ref != null)
    errors.push(`Token '${name}' has both value and ref. Use one.`);
  if (entry.value == null && entry.ref == null)
    errors.push(`Token '${name}' has neither value nor ref.`);

  // Hard value requirements
  if (entry.value != null) {
    if (!entry.unitType)
      errors.push(`Token '${name}' has value without unitType.`);
    if (!entry.rationale)
      errors.push(`Token '${name}' has hard value without rationale.`);
  }

  // camelCase validation
  if (!isCamelCase(name))
    errors.push(`Token '${name}' must be camelCase (e.g., 'contentMaxWidth'). Product tokens are platform-agnostic source definitions — the generation pipeline handles platform-specific naming.`);

  // Platform-limited unitType check
  if (entry.unitType && entry.platforms) {
    const webOnly = ['ch'];
    if (webOnly.includes(entry.unitType)) {
      const nonWeb = entry.platforms.filter((p: string) => p !== 'web');
      if (nonWeb.length > 0)
        errors.push(`Token '${name}' uses unitType '${entry.unitType}' which is not available on platform '${nonWeb[0]}'.`);
    }
  }

  // Ref resolution (warning, not error)
  if (entry.ref && !resolver.resolve(entry.ref))
    warnings.push(`Token '${name}' references '${entry.ref}' which is not in token-index — verify index is current (\`npx designerpunk generate\`).`);

  // Description required
  if (!entry.description)
    errors.push(`Token '${name}' is missing required 'description' field.`);

  return { errors, warnings };
}

function isCamelCase(name: string): boolean {
  return /^[a-z][a-zA-Z0-9]*$/.test(name);
}
```

### Integration with ProductIndexer

`ProductTokenIndexer` is a field on `ProductIndexer`, instantiated in the constructor. The `TokenRefResolver` is instantiated inside `ProductTokenIndexer` and reloads on every `index()` call (ensuring fresh resolution on rebuild).

```typescript
// In ProductIndexer constructor:
this.productTokenIndexer = new ProductTokenIndexer(this.paths?.tokenIndexDir);

// In ProductIndexer.index():
async index(): Promise<void> {
  // ... existing indexing steps ...
  this.indexTokens();  // NEW — after other content
}

private indexTokens(): void {
  const tokensDir = path.join(this.productDir, 'tokens');
  if (!fs.existsSync(tokensDir)) return;
  this.productTokenIndexer.index(tokensDir);  // reloads resolver + re-parses all YAML
}

// Getter for server shell:
getProductTokens(filters: { category?: string; name?: string; platform?: string }) {
  return this.productTokenIndexer.query(filters);
}
getProductTokenHealth() { return this.productTokenIndexer.getHealth(); }
```

### Tool Registration

In `product-mcp-server/src/index.ts`, add to the tools array:

```typescript
{
  name: 'get_product_tokens',
  description: 'Get product tokens by category, name, or platform. Returns structured values with resolved system token references. All filters optional and conjunctive.',
  inputSchema: {
    type: 'object' as const,
    properties: {
      category: { type: 'string', description: 'Filter by category name' },
      name: { type: 'string', description: 'Filter by token name' },
      platform: { type: 'string', description: 'Filter to tokens applicable to this platform (web, ios, android)' },
    },
  },
}
```

### Health Reporting Extension

In the `get_product_health` handler, add:

```typescript
const health = this.indexer.getHealth();
// Add product tokens section
health.productTokens = this.indexer.getProductTokenHealth();
```

Response shape addition:
```json
{
  "status": "healthy",
  "counts": { ... },
  "productTokens": {
    "tokenCount": 12,
    "categoryCount": 3,
    "errorCount": 1,
    "warningCount": 2,
    "errors": ["Token 'bad-name' must be camelCase..."],
    "warnings": ["Token 'flickerCurve' references 'easeInOutCustom' which is not in token-index..."]
  }
}
```

---

## Data Models

### YAML Source Schema

```yaml
# Required top-level fields
category: string        # matches filename without extension
description: string     # human-readable category purpose

# Token entries
tokens:
  tokenName:            # camelCase, acronyms as words
    # One of value or ref (required)
    value: number | string
    ref: string         # canonical system token name

    # Required for value tokens
    unitType: string    # logical | duration | ch | ratio | count | percent | color
    rationale: string   # why no system token fits

    # Always required
    description: string

    # Optional
    usage: string       # consumption guidance
    platforms: string[] # default: [web, ios, android]
    promotionCandidate: boolean  # default: false
```

### Token Index Files (Read-Only)

The resolver reads these existing generated files:

- `token-index/primitives.yaml` — keys are canonical names (e.g., `space300`), values include `family` (e.g., `"spacing"`) and `value` (e.g., `24`)
- `token-index/semantics.yaml` — keys are dotted names (e.g., `color.feedback.error.text`), values include `category` (e.g., `"color"`) and `primitiveReferences` (object with varying keys: `{ value: "pink400" }` or `{ spacing: "space200" }` or multi-key for typography)
- `token-index/components.yaml` — keys are dotted names (e.g., `buttonIcon.inset.large`), values include `component` (e.g., `"Button-Icon"`) and `primitiveReferences` (object, same varying-key pattern; may contain literal values like `"11"` instead of primitive names)

**Format contract**: The token-index YAML schema is a shared contract between the Rosetta generation pipeline (producer) and both the Application MCP TokenIndexer and this Product MCP TokenRefResolver (consumers). Schema changes require updating both consumers.

---

## Error Handling

| Scenario | Behavior |
|----------|----------|
| `product/tokens/` doesn't exist | Silent — zero tokens, no error |
| YAML parse failure on a category file | Skip entire file, add warning to health |
| Individual token validation error | Exclude token, include valid siblings, add error to health |
| Individual token validation warning | Include token, add warning to response |
| `token-index/` doesn't exist | All refs unresolved, single warning in health |
| Semantic ref chain breaks mid-resolution | Return partial resolution with `depth: 'partial'` signal |

---

## Testing Strategy

### Unit Tests

- `ProductTokenIndexer.test.ts` — parsing, validation rules (all 11 ACs from Req 1), per-token isolation, filename validation (invalid chars, digits, uppercase), category field vs filename mismatch, re-index clears stale data
- `TokenRefResolver.test.ts` — primitive resolution, semantic chain resolution (single-key and multi-key), component resolution (primitive ref and literal value), missing refs, missing index directory, resolver reload on re-index
- `ProductTokenQuery.test.ts` — filter combinations, empty results, warning surfacing

### Integration Tests

- `Spec108-ProductTokens.test.ts` — end-to-end: YAML files → indexer → query tool → response shape validation
- Health reporting integration with existing `get_product_health`

### Fixtures

- `product/tokens/layout.yaml` — valid tokens with refs and hard values
- `product/tokens/motion.yaml` — valid tokens with duration refs
- `product/tokens/invalid.yaml` — tokens with various validation errors (both/neither value/ref, bad names, missing fields)

---

## Design Decisions

### Decision 1: Dedicated ProductTokenIndexer vs inline in ProductIndexer

**Options Considered**:
1. Inline parsing in `ProductIndexer.indexTokens()` method
2. Dedicated `ProductTokenIndexer` class

**Decision**: Dedicated class.

**Rationale**: Reference resolution adds complexity (loading token-index, mapping families, chaining semantic refs). Keeping this in a dedicated class maintains ProductIndexer's role as orchestrator and keeps the token logic testable in isolation. Consistent with `PatternIndexer` in Application MCP.

### Decision 2: TokenRefResolver as separate class vs method on ProductTokenIndexer

**Options Considered**:
1. Resolution logic inside ProductTokenIndexer
2. Separate TokenRefResolver class

**Decision**: Separate class.

**Rationale**: The resolver has its own lifecycle (load index files once, resolve many times) and its own test surface (mapping table, chain resolution, error handling). Separation enables reuse if Spec 109 needs the same resolution logic for validation.

### Decision 3: Partial resolution signaling

**Options Considered**:
1. Return primitive name as `resolvedValue` with no signal
2. Return primitive name with `resolutionDepth: 'partial'` field
3. Return null with a warning

**Decision**: Option 2 — return the intermediate value with a depth signal.

**Rationale**: Returning null (option 3) loses useful information. Returning without signal (option 1) could mislead agents into treating a token name as a literal value. The `depth` field is cheap and honest.

**Implementation note**: The `resolutionDepth` field is internal to the resolver. In the query response, partial resolution is signaled by `resolvedValue` being a string that matches a known primitive name, with a warning in the `warnings` array noting partial resolution.

---

## File Manifest

| File | Purpose |
|------|---------|
| `product-mcp-server/src/indexer/ProductTokenIndexer.ts` | Token parsing, validation, storage |
| `product-mcp-server/src/indexer/TokenRefResolver.ts` | Lightweight ref resolution from token-index |
| `product-mcp-server/src/models.ts` | Updated — add ProductTokenEntry, ProductTokenCategory, ProductTokenHealth interfaces |
| `product-mcp-server/src/indexer/__tests__/ProductTokenIndexer.test.ts` | Unit tests |
| `product-mcp-server/src/indexer/__tests__/TokenRefResolver.test.ts` | Unit tests |
| `product-mcp-server/src/__tests__/Spec108-ProductTokens.test.ts` | Integration test |
| `product-mcp-server/src/__tests__/fixtures/tokens/layout.yaml` | Test fixture |
| `product-mcp-server/src/__tests__/fixtures/tokens/motion.yaml` | Test fixture |
| `product-mcp-server/src/__tests__/fixtures/tokens/invalid.yaml` | Test fixture |
| `.kiro/steering/Product-Token-Governance.md` | Governance documentation |
| `.kiro/steering/MCP-Relationship-Model.md` | Updated (not new) |
| `.kiro/agents/leonardo.json` | Updated — add governance doc reference |
| `.kiro/agents/sparky.json` | Updated — add governance doc reference |
| `.kiro/agents/kenya.json` | Updated — add governance doc reference |
| `.kiro/agents/data.json` | Updated — add governance doc reference |
