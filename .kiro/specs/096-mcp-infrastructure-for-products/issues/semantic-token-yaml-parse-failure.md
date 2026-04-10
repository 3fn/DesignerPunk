# Issue: Semantic Token YAML Parse Failure

**Date**: 2026-04-10
**Discovered by**: Lina (health check)
**Spec**: 096 - MCP Infrastructure for Products
**Severity**: Medium — 217 primitives and 27 component tokens load fine, but all semantic tokens missing from index
**Status**: ✅ Resolved (2026-04-10)
**Owner**: Ada

---

## Problem

`get_component_health` reports the index as **degraded** with 0 semantic tokens indexed:

```json
"tokensIndexed": {
  "primitives": 217,
  "semantics": 0,
  "componentTokens": 27
}
```

The YAML parser fails on `token-index/semantics.yaml` with:

```
unknown tag !<tag:yaml.org,2002:js/undefined> (1291:62)
```

The tag `!<tag:yaml.org,2002:js/undefined>` is a JS-YAML serialization artifact — it appears when a JavaScript `undefined` value is serialized to YAML instead of being omitted or converted to `null`. This means the generation pipeline is writing an `undefined` value into the semantic token index file.

## Impact

- Semantic tokens are the primary token tier (first choice per Token Governance)
- All MCP queries for semantic tokens return empty results
- `search_tokens({ tier: "semantic" })` returns nothing
- Components relying on semantic token lookups via MCP get no data

## Root Cause (Suspected)

The Rosetta generation pipeline that produces `token-index/semantics.yaml` is serializing a JavaScript `undefined` value at or near line 1291, column 62. This likely means a token property (possibly `value`, `formula`, or a platform name) is undefined at generation time and the YAML serializer doesn't strip it.

## Recommended Investigation (Ada)

1. Inspect `token-index/semantics.yaml` around line 1291 to identify which token and property contains the `!<tag:yaml.org,2002:js/undefined>` tag
2. Trace back to the generation pipeline to find where the undefined value originates
3. Fix the pipeline to either omit undefined properties or serialize them as `null`
4. Regenerate `semantics.yaml` and verify the index returns to healthy (34 components, 217 primitives, 193 semantics, 27 component tokens)

## Workaround

None currently — the parse failure causes the entire semantic token file to be skipped. A partial fix would be to manually edit line 1291 in `semantics.yaml` to remove or null-ify the bad tag, but the pipeline fix is needed to prevent recurrence.

## Files Involved

- `token-index/semantics.yaml` (line 1291) — contains invalid YAML tag
- Rosetta generation pipeline (Ada's domain) — source of the undefined value

---

## Resolution

**Root cause confirmed**: z-index and elevation tokens are semantic-only — they have direct values with no primitive references. `token.primitiveReferences` is `undefined` for these tokens. The YAML serializer (`js-yaml`) serialized `undefined` as `!<tag:yaml.org,2002:js/undefined>`, which is a valid YAML tag but not parseable by the standard loader.

**Fix**: `scripts/generate-token-index.ts` line 80 — changed `token.primitiveReferences` to `token.primitiveReferences || null`. Tokens without primitive references now serialize as `primitiveReferences: null` instead of the invalid tag.

**Verification**: Regenerated `semantics.yaml` — 0 occurrences of `js/undefined`, all 193 semantic tokens present. 320 test suites, 8216 tests passing.
