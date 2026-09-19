# Findings: Bound Variable Resolution Fails for Plain COMPONENT Nodes

**Date**: 2026-05-08
**Package**: @3fn/core@11.1.3
**Domain**: Figma Pipeline / DesignExtractor
**Severity**: High
**Related Issue**: `.kiro/issues/2026-05-08-figma-extractor-ignores-variable-bindings.md`

---

## Summary

`extractComponentAnalysis()` produces 100% unidentified classifications for plain COMPONENT nodes because the raw component data used for `buildNodeTree` and `collectBoundVariableIds` lacks `boundVariables` data. The COMPONENT_SET path works correctly; the plain COMPONENT path does not.

---

## Root Cause

The `extractComponentAnalysis` orchestration (DesignExtractor.ts ~line 3472) calls `consoleMcp.getComponent(fileKey, nodeId)` at step 3 to get raw data for node tree building. For plain COMPONENT nodes, `ConsoleMCPClientImpl.getComponent()` calls `figma_get_component` with `format: 'reconstruction'`.

The **reconstruction format** from the Desktop Bridge does NOT include `boundVariables` on nodes.

### Why COMPONENT_SET works but COMPONENT doesn't

| Node Type | Data Source | Includes boundVariables? |
|-----------|-------------|--------------------------|
| COMPONENT_SET | `figma_execute` (Plugin API) via `getComponentSetWithReconstruction()` | ✅ Yes |
| COMPONENT | `figma_get_component` with `format: 'reconstruction'` | ❌ No |

The Plugin API (`figma.getNodeByIdAsync()`) is the **only** source that returns `boundVariables`. The COMPONENT_SET path explicitly uses it (ConsoleMCPClientImpl.ts ~line 557). The plain COMPONENT path never calls it.

### Cascade Effect

1. `getComponent()` returns data without `boundVariables` fields
2. `buildNodeTree()` → `classifyNodeTokens()` → `getBoundVariableName()` returns `undefined` for every property
3. All properties get `figmaVarName: undefined` → `translate()` skips binding-first path → falls through to value-match
4. `collectBoundVariableIds()` finds no bound variable entries → returns `[]`
5. `batchResolveBoundVariables()` receives empty array → resolves nothing
6. `reclassifyWithResolvedBindings()` has nothing to reclassify
7. Result: 0 semantic, 0 primitive, 411 unidentified (all `reason: "value-match"`)

---

## Evidence

From `analysis/analysis-desktop-110/desktop-110-analysis.json`:
- `componentType: "COMPONENT"` (not COMPONENT_SET)
- `classificationSummary: { semanticIdentified: 0, primitiveIdentified: 0, unidentified: 411 }`
- `unresolvedBindings: []` (no IDs were even collected)
- Every unidentified entry has `reason: "value-match"` — no `boundVariableId` field present
- Zero references to variable/binding data anywhere in the output

---

## Recommended Fix

### Primary: Add Plugin API call for plain COMPONENT nodes

In `ConsoleMCPClientImpl.getComponent()`, after getting the reconstruction data for a plain COMPONENT, also call `figma_execute` with Plugin API code to get `boundVariables`, then merge into the response before returning.

The Plugin API code already exists in `getComponentSetWithReconstruction()` (~line 557) — the `extractNode` function that walks the tree and extracts `boundVariables`. This same code should be called for plain COMPONENT nodes.

### Implementation sketch

```typescript
// In ConsoleMCPClientImpl.getComponent(), after extractComponentFields():
async getComponent(fileKey: string, nodeId: string): Promise<FigmaComponentData> {
  // ... existing reconstruction fetch ...
  const componentObj = /* existing logic */;
  const fields = this.extractComponentFields(componentObj);

  // NEW: Fetch boundVariables via Plugin API (only source for these)
  try {
    const pluginData = await this.fetchBoundVariablesViaPluginApi(fileKey, nodeId);
    if (pluginData) {
      return this.mergeBoundVariables(fields, pluginData);
    }
  } catch {
    // Plugin API unavailable — return without boundVariables (graceful degradation)
  }

  return fields;
}
```

### Graceful degradation

The Plugin API requires the Figma Desktop Bridge with plugin access. If unavailable (CI, headless):
- The fix should catch the failure and continue without boundVariables
- The analysis output should include a warning field (e.g., `"warnings": ["boundVariables unavailable — Plugin API not reachable"]`)
- Classification falls back to current value-match behavior (degraded but not broken)

---

## Secondary Issue: Text Style Resolution

The issue doc also mentions `textStyleId` / `styles.text` not being read. This is a separate gap:
- `readStyles()` fetches file-level styles
- `reconstructCompositeTokens()` maps them to typography tokens
- But `buildNodeTree` doesn't check per-node `styles.text` references for classification

This should be addressed separately — the bound variable fix is higher priority and more impactful.

---

## Files to Modify (in @3fn/core)

| File | Change |
|------|--------|
| `src/figma/ConsoleMCPClientImpl.ts` | Add Plugin API call in `getComponent()` for plain COMPONENT nodes |
| `src/figma/DesignExtractor.ts` | Add warnings field to ComponentAnalysis when boundVariables unavailable |
| `src/figma/ComponentAnalysis.ts` | Add optional `warnings?: string[]` to ComponentAnalysis type |
| `src/figma/__tests__/DesignExtractor.boundVariableResolution.test.ts` | Add test for plain COMPONENT path |

---

## Test Verification

After fix, re-running extraction on the Desktop-110 mock should produce:
- `semanticIdentified > 0` (for nodes bound to semantic variables)
- `primitiveIdentified > 0` (for nodes bound to primitive variables)
- `unidentified` count significantly reduced
- Any remaining unidentified entries should have `reason: "no-token-match"` (genuinely unbound) rather than `reason: "value-match"`

---

*Findings by Ada. Route to @3fn/core project for implementation.*

---

## Addendum: Validation from Plugin API Extraction (2026-05-08)

After writing the initial findings, we validated the hypothesis by running `figma_execute` directly against the Desktop-110 mock via Console MCP. Results confirm the diagnosis:

| Metric | Extractor Output | Plugin API Direct |
|--------|-----------------|-------------------|
| Nodes with bindings | 0 (0%) | 11,998 (95.7%) |
| Unique variables | 0 | 49 |
| Classification | 411 unidentified | Would be 411 identified |

**The data is there. The extractor just can't see it.**

### Additional Context for the Fix

1. **The `figma_execute` Plugin API code that works** is already in `ConsoleMCPClientImpl.getComponentSetWithReconstruction()` (~line 557). The `extractNode` function walks the tree and extracts `boundVariables`. This exact code should be reused for plain COMPONENT nodes — it's proven.

2. **Timing matters.** The Desktop Bridge plugin connects to the MCP server's WebSocket. If the MCP server is freshly spawned, the Bridge needs a few seconds to discover and connect. The fix should include a connection check before attempting `figma_execute`, with a brief retry window (the existing `getStatus()` check pattern).

3. **The REST API (`figma_get_file_data`, `figma_get_component`) will NEVER return `boundVariables`.** This is a Figma platform limitation, not a bug in our code. The Plugin API is the only path. The fix must use `figma_execute`, not a different REST endpoint.

4. **Scale consideration.** The Desktop-110 mock has 12,542 nodes. The Plugin API handled this in a single call without issue. The `extractNode` function with depth limit 4 (current COMPONENT_SET code) may need to be raised to 6 for page-level extractions, or made configurable.

5. **The original issue also mentions `textStyleId`/`styles.text`.** These are NOT in `boundVariables` — they're a separate Figma concept (applied styles vs bound variables). Typography audit needs `figma_get_styles` or checking `node.textStyleId` in the Plugin API code. This is a separate enhancement, not part of the boundVariables fix.
