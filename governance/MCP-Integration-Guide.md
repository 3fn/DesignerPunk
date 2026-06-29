---
id: mcp-integration-guide
inclusion: manual
name: MCP-Integration-Guide
aliases: programmatic dtcg token consumption, consuming dtcg tokens programmatically, programmatic token consumption from dtcg output
description: MCP integration guide — file loading, token traversal, path-based querying, transformer invocation. Load when building tooling, scripts, or MCP server resources that consume DTCG output.
---

# MCP Integration Guide

**Date**: 2026-02-17
**Last Reviewed**: 2026-06-23
**Purpose**: Guide for loading, parsing, and querying DTCG tokens programmatically
**Organization**: process-standard
**Scope**: cross-project
**Layer**: 2
**Relevant Tasks**: mcp-integration, dtcg-integration, tooling-development

---

## Overview

This guide covers how to work with DesignerPunk's DTCG token output programmatically — loading the file, querying specific tokens by path, and using the transformer architecture for tool-specific formats.

**File location**: `dist/DesignTokens.dtcg.json`

**When to use this guide**: When building tooling, scripts, or MCP server resources that need to read, traverse, or transform the DTCG token file at runtime.

---

## MCP Tool Contracts (Spec 121 additions)

This section documents the Spec 121 delivery-layer additions: the discovery tools, the `get_token_details` resolved-value triple, and the discovery confidence model. For the broader MCP architecture and access model, see `MCP-Relationship-Model.md`.

---

### Discovery Tools

#### `find_docs` — Docs MCP (Req 1 + Req 4)

Dual-mode tool. **Supersedes `get_documentation_map`** (removed — it errored at ~78K chars; `find_docs` pages at ~6K, Req 4).

**Concept-search mode:**
```
find_docs({ concept: "spec planning" })
find_docs({ concept: "RTL" })
```
Returns ranked entries:
```typescript
{
  data: Array<{
    path: string;          // e.g. ".kiro/steering/Process-Spec-Planning.md"
    summary: string;       // ~50-token description
    owner: string;         // owning domain/agent (from Organization metadata)
    matchedOn: string[];   // which fields matched (labeled by signal class)
    rank: number;
    matchConfidence: 'strong' | 'partial' | 'none';
    viability: { placeholder: boolean; deprecated: boolean };
  }>;
  error: null | string;
  matchConfidence?: 'none';  // top-level 'none' set on empty result
}
```
No-match returns `{ data: [], error: null, matchConfidence: 'none' }` — explicit, not a silent empty payload or an error.

**Paginated list/catalog mode:**
```
find_docs({ list: true })
find_docs({ list: true, cursor: "20", limit: 20 })
```
Returns a bounded page of the full corpus (default `limit` 20, hard cap 100). `nextCursor` is included when more pages exist. List mode is unranked enumeration — no `matchConfidence` tier.

**Docs `aliases:` field:** `find_docs` indexes an optional high-signal `aliases:` frontmatter field on steering docs. This is a reactive semantic-synonym bridge for concepts whose literal term is absent from a doc's title and description. Example: `Web-Authoring-Standards.md` says "logical properties" but is reachable via `concept: "RTL"` through its `aliases: RTL, bidirectional` tag. Authors add `aliases:` only when a real query term diverges from auto-derived content — absence does not block matching. See `Process-File-Organization.md` for the author-facing schema entry.

Discovery and retrieval compose without an intermediate step: a path returned by `find_docs` resolves via `get_section` or `get_document_summary` in one call.

---

#### `find_components` — Application MCP (Req 1)

**New optional `keyword` parameter** (free-text, tokenized discovery):
```
find_components({ keyword: "primary action button" })
find_components({ keyword: "login", category: "input" })
```

**Tokenized matching:** term-level, not substring. The query is split on whitespace / camelCase / hyphen, lowercased, and matched against the index term-by-term. Multi-word natural-language queries (e.g. `"primary action button"`) are matchable — a substring-only implementation would fail these.

**Indexed fields:**
- High-signal: tokenized `name`, tokenized `family`, `purpose`, contract concept/category names
- Low-signal: `whenToUse`, `contexts`, `alternatives[].reason`, `description`
- Excluded: `whenNotToUse` (negative-signal trap — excluded by design)

**Back-compat:** the existing exact-match semantics of `context`, `concept`, `category`, and `platform` are **unchanged**. `keyword` is a new optional param that ANDs with them. Existing callers that do not supply `keyword` see no behavior change.

**Result shape:** `ApplicationSummary` is **unchanged** — consumers that depend on it see the same shape. Results are optionally augmented with `matchedOn` (labeled by signal class) when `keyword` is supplied.

**Auto-index-first hybrid model:** the keyword index is auto-derived from existing component metadata; no hand-curated keyword lists are required. Components may optionally carry an `aliases:` field to capture real query terms that diverge from auto-derived metadata (e.g., "select" → Dropdown-family). Absence of `aliases:` does not block auto-derived matching.

**Scope:** covers components only. Experience patterns are in a separate index and are not reachable via `find_components`.

Discovery and retrieval compose: a component name returned by `find_components` resolves via `get_component_summary` in one call.

---

### `get_token_details` Resolved-Value Triple (Req 2)

Three fields added **additively** to the existing `get_token_details` response alongside the unchanged `platforms{}` object (Spec 121 Req 2):

| Field | Type | Meaning |
|---|---|---|
| `resolvedValue` | `number \| string \| object \| null` | Chain-resolved terminal value (see null-contract below) |
| `resolvedUnitType` | `string \| null` | Unit type of the resolved value |
| `resolutionDepth` | `'full' \| 'partial' \| null` | Depth of resolution achieved |

**Null-contract:**
- Primitive token → own value / `resolutionDepth: 'full'`
- Semantic/component, single resolvable ref → chain-resolved terminal value / `'full'`
- Multi-ref, literal, or unresolvable → token self-name / `'partial'`
- No-ref-no-value → `null` / `resolutionDepth: null`

**Hard rule: always read `resolutionDepth` before trusting `resolvedValue`.** When `resolutionDepth` is `'partial'`, `resolvedValue` carries the token's self-name — not a resolved concrete value. Using it without checking depth first will produce incorrect results.

**Theme-varying caveat:** for a theme-varying token, `resolvedValue` is a per-mode bundle object (e.g. `{ light: { base: "rgba(21, 66, 74, 1)", wcag: "rgba(21, 66, 74, 1)" }, dark: { base: "rgba(120, 196, 204, 1)", wcag: "rgba(150, 210, 218, 1)" } }`), still `resolutionDepth: 'full'`. It is not a scalar in that case. Each mode carries a `base` color and a `wcag` (higher-contrast, accessibility-compliant) color variant — both are color values, not contrast ratios. The bundle is faithful to the product MCP's `TokenRefResolver` contract.

**`platforms{}` is unchanged.** The pre-existing `platforms` object (web/iOS/Android identifier fragments) remains on the response with no modification. Semantic tokens continue to carry no `value` key.

**Additive / backward-compatible governance rule:** the triple is strictly additive. No existing field changes shape, no existing field is removed. The Req-3 contract test enforces this: altering any existing field breaks the test loud (breaking = intentional and detected, not silent). Consumers that do not read the new fields see no change.

**Authoritative runtime value:** the resolved triple is a convenience for token selection and agent guidance. The **authoritative runtime value is the shipped `dist/DesignTokens.*` artifact**. The MCP does not eliminate the need to reference shipped token files for code-generation or runtime use (G6 deferred — code-reference form limited to non-theme-varying tokens only, tracked in design.md).

---

### Discovery Confidence Model

Both `find_docs` and keyworded `find_components` emit a three-layer confidence signal. The authoritative model and per-domain rubrics are in `.kiro/specs/121-claude-code-portability/discovery-confidence-rubric.md`.

**Three distinct fields (never collapsed):**
- **Layer 1 — Match:** `matchConfidence: 'strong' | 'partial' | 'none'` — a tier derived by the per-domain rubric from visible evidence (`matchedOn` + `matchedTokens`/`totalTokens` coverage). Reconstructable from emitted primitives; not an opaque score.
- **Layer 2 — Viability:** `readiness` (components); `{ placeholder, deprecated }` (docs); `resolutionDepth` (tokens, Req 2). A gate signal — separate from `matchConfidence`.
- **Layer 3 — Usability:** `rank` + `matchedOn` — the tool ranks; the agent judges; the human decides uncertain calls.

**`matchConfidence` tiers:**
- `strong` — high-signal, non-incidental match → act (subject to Layer-2 viability + Layer-3 usability)
- `partial` — weak / low-signal / below-threshold best-fit → **propose best-fit + confidence + rationale for human go/no-go** (119 Decision 4a agent-side certainty-calibration protocol)
- `none` → empty contract (`find_components: { data: [], error: null }`; `find_docs: { data: [], error: null, matchConfidence: 'none' }`)

**Governing sequence and hard rule:** `match → filter by viability → rank/judge usability`. **Match-confidence alone never drives action.** A `strong` match can be non-viable (placeholder doc, deprecated component) or out-ranked on usability. The tool surfaces evidence; the agent judges.

**`partial` vs `none` are distinguishable from response shape alone.** A `partial` returns ranked below-threshold candidates flagged with their tier — it does not return an empty result. Only genuine `none` yields the empty contract.

**Token exemption:** token tools perform structured predicate retrieval with no relevance ranking — the three-layer model does not apply. Trigger: if a token tool is introduced with open-ended intent input and ranked output, it inherits this model. Bright line: predicate filter → no tier; relevance ranking → tier required.

**119 Decision 4a cross-reference:** the agent-side certainty-calibration protocol that consumes a `partial` (propose best-fit + confidence + rationale → human go/no-go, with the proposal required to carry its own uncertainty) is captured in `.kiro/specs/119-steering-progressive-disclosure-redesign/design-outline.md` under Decision 4a. 121 emits the signal; 119 defines what the agent does with a `partial`.

---

## Loading and Parsing DTCG Tokens

The DTCG output is a standard JSON file. Load it with Node.js built-ins:

```typescript
import * as fs from 'fs';
import * as path from 'path';
import type { DTCGTokenFile } from '../generators/types/DTCGTypes';

const dtcgPath = path.resolve(__dirname, '../../dist/DesignTokens.dtcg.json');
const dtcgTokens: DTCGTokenFile = JSON.parse(fs.readFileSync(dtcgPath, 'utf-8'));
```

### Verifying the Load

After parsing, confirm the file has the expected structure:

```typescript
// Check schema presence
console.log(dtcgTokens.$schema);
// → "https://tr.designtokens.org/format/"

// Check root extensions (if generated with includeExtensions: true)
console.log(dtcgTokens.$extensions?.designerpunk?.version);
// → "1.0.0"

// List top-level token groups
const groups = Object.keys(dtcgTokens).filter(k => !k.startsWith('$'));
console.log('Token groups:', groups);
// → ["space", "color", "fontSize", "fontWeight", ..., "typography", "motion"]
```

---

## Querying Tokens by Path

DTCG tokens are organized in a nested object structure. To access a specific token, split the path and traverse:

```typescript
import type { DTCGToken, DTCGTokenFile } from '../generators/types/DTCGTypes';

/**
 * Query a specific token by dot-separated path.
 *
 * @param dtcgTokens - The parsed DTCG token file
 * @param tokenPath - Dot-separated path (e.g., "space.space200", "shadow.container")
 * @returns The token object, or undefined if not found
 */
function getToken(dtcgTokens: DTCGTokenFile, tokenPath: string): DTCGToken | undefined {
  const segments = tokenPath.split('.');
  let current: unknown = dtcgTokens;

  for (const segment of segments) {
    if (current && typeof current === 'object') {
      current = (current as Record<string, unknown>)[segment];
    } else {
      return undefined;
    }
  }

  // Verify it's a token (has $value)
  if (current && typeof current === 'object' && '$value' in (current as object)) {
    return current as DTCGToken;
  }

  return undefined;
}
```

### Usage Examples

```typescript
// Primitive spacing token
const space200 = getToken(dtcgTokens, 'space.space200');
console.log(space200?.$value);       // → "16px"
console.log(space200?.$type);        // → "dimension"

// Semantic color token (alias)
const successText = getToken(dtcgTokens, 'semanticColor.color.feedback.success.text');
console.log(successText?.$value);    // → "{color.green400}"

// Shadow composite token
const containerShadow = getToken(dtcgTokens, 'shadow.container');
console.log(containerShadow?.$value);
// → { offsetX: "0px", offsetY: "4px", blur: "12px", spread: "0px", color: "#0000004d" }

// Typography composite token
const bodyMd = getToken(dtcgTokens, 'typography.bodyMd');
console.log(bodyMd?.$value);
// → { fontFamily: "{fontFamily.fontFamilyBody}", fontSize: "{fontSize.fontSize100}", ... }
```

### Querying a Group

To get all tokens in a group, access the group directly and filter out `$`-prefixed metadata:

```typescript
import type { DTCGGroup, DTCGToken } from '../generators/types/DTCGTypes';

/**
 * Get all tokens in a group (non-recursive, one level deep).
 */
function getGroupTokens(
  dtcgTokens: DTCGTokenFile,
  groupPath: string
): Record<string, DTCGToken> {
  const segments = groupPath.split('.');
  let current: unknown = dtcgTokens;

  for (const segment of segments) {
    if (current && typeof current === 'object') {
      current = (current as Record<string, unknown>)[segment];
    } else {
      return {};
    }
  }

  const group = current as Record<string, unknown>;
  const tokens: Record<string, DTCGToken> = {};

  for (const [key, value] of Object.entries(group)) {
    if (key.startsWith('$')) continue;
    if (value && typeof value === 'object' && '$value' in (value as object)) {
      tokens[key] = value as DTCGToken;
    }
  }

  return tokens;
}
```

```typescript
// Get all spacing tokens
const spacingTokens = getGroupTokens(dtcgTokens, 'space');
console.log(Object.keys(spacingTokens));
// → ["space025", "space050", "space075", "space100", "space125", ...]
```

---

## Walking All Tokens

To iterate over every token in the file (useful for indexing, searching, or bulk operations):

```typescript
import type { DTCGToken, DTCGTokenFile } from '../generators/types/DTCGTypes';

/**
 * Walk all tokens in a DTCG file, invoking a callback for each.
 *
 * @param obj - The DTCG object to traverse
 * @param callback - Called with (dotPath, token) for each token found
 * @param prefix - Internal: current path prefix for recursion
 */
function walkTokens(
  obj: Record<string, unknown>,
  callback: (path: string, token: DTCGToken) => void,
  prefix = ''
): void {
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith('$')) continue;
    const path = prefix ? `${prefix}.${key}` : key;
    const entry = value as Record<string, unknown>;

    if (entry && typeof entry === 'object' && '$value' in entry) {
      callback(path, entry as unknown as DTCGToken);
    } else if (entry && typeof entry === 'object') {
      walkTokens(entry, callback, path);
    }
  }
}
```

### Example: Count Tokens by Type

```typescript
const typeCounts: Record<string, number> = {};

walkTokens(dtcgTokens, (_path, token) => {
  const type = token.$type || 'unknown';
  typeCounts[type] = (typeCounts[type] || 0) + 1;
});

console.log(typeCounts);
// → { dimension: 85, color: 120, number: 45, fontWeight: 5, ... }
```

### Example: Find Tokens by Extension Property

```typescript
// Find all tokens with a mathematical formula
const formulaTokens: Array<{ path: string; formula: string }> = [];

walkTokens(dtcgTokens, (path, token) => {
  const formula = token.$extensions?.designerpunk?.formula;
  if (formula) {
    formulaTokens.push({ path, formula });
  }
});

console.log(`Found ${formulaTokens.length} tokens with formulas`);
```

---

## Using Transformers for Tool-Specific Formats

The transformer architecture lets you convert DTCG tokens into formats tailored to specific tools. The `TransformerRegistry` manages registered transformers and orchestrates invocation.

### Importing

```typescript
import { transformerRegistry } from '../generators/transformers';
import type { DTCGTokenFile } from '../generators/types/DTCGTypes';
```

### Running a Specific Transformer

```typescript
import * as fs from 'fs';

// Load DTCG tokens
const dtcgTokens: DTCGTokenFile = JSON.parse(
  fs.readFileSync('dist/DesignTokens.dtcg.json', 'utf-8')
);

// Transform using a registered transformer (e.g., 'figma')
try {
  const result = transformerRegistry.transform('figma', dtcgTokens);
  fs.writeFileSync(`dist/${result.filename}`, result.content);
  console.log(`Wrote ${result.filename}`);

  if (result.warnings.length > 0) {
    console.warn('Warnings:', result.warnings.join(', '));
  }
} catch (error) {
  console.error('Transform failed:', (error as Error).message);
}
```

### Running All Registered Transformers

```typescript
const results = transformerRegistry.transformAll(dtcgTokens);

for (const result of results) {
  fs.writeFileSync(`dist/${result.filename}`, result.content);
  console.log(`Wrote ${result.filename}`);

  if (result.warnings.length > 0) {
    console.warn(`${result.filename} warnings:`, result.warnings.join(', '));
  }
}

console.log(`Generated ${results.length} tool-specific outputs`);
```

### Listing Available Transformers

```typescript
const transformers = transformerRegistry.getAll();

for (const t of transformers) {
  console.log(`${t.config.id}: ${t.config.name} (${t.config.outputExtension})`);
}
// Example output:
// figma: Figma Variables (.figma.json)
// flat: Flat Key-Value Map (.flat.json)
```

---

## Resolving Aliases

Semantic tokens use alias syntax (`{group.tokenName}`) to reference primitives. If you need resolved values at runtime:

```typescript
/**
 * Resolve a DTCG alias value to its final value.
 *
 * @param value - The token value (may be an alias string like "{color.purple300}")
 * @param dtcgTokens - The full DTCG token file for lookups
 * @returns The resolved value, or the original value if not an alias
 */
function resolveAlias(value: unknown, dtcgTokens: DTCGTokenFile): unknown {
  if (typeof value !== 'string') return value;

  const match = value.match(/^\{(.+)\}$/);
  if (!match) return value;

  const segments = match[1].split('.');
  let current: unknown = dtcgTokens;

  for (const segment of segments) {
    if (current && typeof current === 'object') {
      current = (current as Record<string, unknown>)[segment];
    } else {
      return value; // Unresolvable — return original alias
    }
  }

  const resolved = (current as Record<string, unknown>)?.$value;
  if (resolved === undefined) return value;

  // Recursively resolve chained aliases
  return resolveAlias(resolved, dtcgTokens);
}
```

```typescript
// Resolve a semantic color alias
const token = getToken(dtcgTokens, 'semanticColor.color.feedback.success.text');
const resolved = resolveAlias(token?.$value, dtcgTokens);
console.log(resolved); // → "#00c853" (the actual color value, sRGB hex converted from OKLCH source)
```

### Resolving Composite Token Aliases

Composite tokens (typography, transition) contain alias references in their properties. Resolve each property individually:

```typescript
function resolveCompositeAliases(
  compositeValue: Record<string, unknown>,
  dtcgTokens: DTCGTokenFile
): Record<string, unknown> {
  const resolved: Record<string, unknown> = {};
  for (const [prop, val] of Object.entries(compositeValue)) {
    resolved[prop] = resolveAlias(val, dtcgTokens);
  }
  return resolved;
}
```

```typescript
const motionToken = getToken(dtcgTokens, 'motion.floatLabel');
if (motionToken && typeof motionToken.$value === 'object') {
  const resolved = resolveCompositeAliases(
    motionToken.$value as Record<string, unknown>,
    dtcgTokens
  );
  console.log(resolved);
  // → { duration: "250ms", timingFunction: [0.2, 0, 0, 1], delay: "0ms" }
}
```

---

## Related Documentation

- [DTCG Integration Guide](dtcg-integration-guide) — DTCG format overview, token groups, extensions schema, tool integrations
- [Transformer Development Guide](transformer-development-guide) — Building custom transformers for tool-specific output
- [DTCG Format Module 2025.10 Specification](https://tr.designtokens.org/format/)
