# Task 3.3 Completion: Reassess UI Tree Convention with Leonardo

**Date**: 2026-04-23
**Task**: 3.3 Reassess UI tree convention with Leonardo
**Type**: Architecture
**Status**: Complete (Phase 1 — convention-vs-implementation review)

---

## Artifacts Reviewed

- `product-mcp-server/src/indexer/ProductIndexer.ts` — `walkUiTree()` implementation
- `product-mcp-server/src/__tests__/ProductIndexerWalk.test.ts` — integration tests
- `product-mcp-server/src/__tests__/fixtures/` — static YAML test fixtures
- `.kiro/specs/097-product-mcp-intelligence-layer/feedback/ui-tree-convention.md` — Leo's convention doc
- `.kiro/steering/DesignerPunk-Integration-Guide.md` — published convention (Task 3.2)

## Assessment: Convention vs Implementation Alignment

### ✅ Aligned — Node Structure

Convention says: nodes have `component` (required), `props` (optional, not indexed), `tokens` (optional, indexed), `children` (optional, recursed), `repeat` (optional, not indexed).

Implementation does: `walkUiTree` checks `node.component` (string → addComponent + gap check), `node.tokens` (object → iterate values → addToken), `node.children` (recurse). Ignores everything else.

**Verdict**: Fully aligned. The implementation does exactly what the convention documents.

### ✅ Aligned — Token Extraction

Convention says: `tokens:` block is an object with string keys and string values. Indexer stores values as-is. Keys are descriptive labels, not indexed.

Implementation does: `if (node.tokens && typeof node.tokens === 'object' && !Array.isArray(node.tokens))` → iterates `Object.values`, stores each string value via `addToken`.

**Verdict**: Fully aligned. Exact string matching, no normalization, handles mixed naming (dot-notation and flat).

### ✅ Aligned — Platform Branching

Convention says: `shared` always traversed. Platform branches traversed only when they contain node arrays with `component` fields. Metadata objects stored but not walked.

Implementation does: checks `'shared' in uiTree`, walks `shared`, then iterates other keys and walks them only if `Array.isArray(val)`.

**Verdict**: Aligned with one nuance — see observation below.

### ✅ Aligned — Gap Detection

Convention says: each component name checked against `component-meta.yaml` catalog + one-off components. Unrecognized names flagged as `not-found`.

Implementation does: `gapDetector.check(node.component)` per node. GapDetector constructed with `oneOffNames: Set<string>` and catalog from `component-meta.yaml`. Returns `'ok' | 'not-found'`.

**Verdict**: Fully aligned.

### ✅ Aligned — Deviation Handling

Convention says: log warnings for unparseable nodes, index what you can, never reject specs, surface warnings in health.

Implementation does: `walkUiTree` silently skips non-object/non-array nodes. `loadYaml` catches parse errors and adds to warnings. Health endpoint surfaces warnings.

**Verdict**: Aligned. The walk doesn't explicitly warn on malformed nodes (it just skips them), but the YAML parse layer catches structural issues. Acceptable for M0a.

---

## Observations

### Observation 1: Platform Branch Traversal Is Broader Than Convention States

The convention says platform branches are traversed "only when they contain node arrays (at least one object with a `component` field)." The implementation traverses any array under a platform key — it doesn't check for `component` fields first.

In practice this is fine: an array of non-node objects (e.g., `ios: ["some string"]`) would be walked but produce no index entries because the walk checks `node.component` before doing anything. No false positives, just unnecessary iteration.

**Risk**: Low. The walk is tolerant — it processes what it can and ignores the rest. The convention is slightly stricter than the implementation, which is the safe direction (convention promises less than implementation delivers).

**Recommendation**: No code change needed. The convention accurately describes the *intent*. The implementation is slightly more permissive, which is fine.

### Observation 2: Token Extraction on Component-less Nodes

~~Originally assessed as: nodes with `tokens:` but no `component:` have tokens silently ignored.~~

**Corrected per Leonardo R1 review**: The `if (node.component)` and `if (node.tokens)` checks in `walkUiTree` are independent `if` blocks, not nested. Tokens ARE extracted and indexed regardless of whether the node has a `component:` field. This means `find_screens({ usesToken: "X" })` catches tokens on wrapper nodes without component names.

**Risk**: Low. This is arguably correct behavior — tokens on a wrapper node are still used by the screen. Indexing them gives accurate reverse-lookup results. A `tokens:` block without a `component:` is an edge case that's more useful indexed than warned about.

**Recommendation**: No code change. Note in the convention that `tokens:` blocks are indexed independently of `component:` presence.

### Observation 3: Test Fixtures Match Convention Well

The static YAML fixtures use the exact patterns the convention documents:
- `legislation-list.yaml`: platform branching (shared + ios metadata + web metadata), `tokens:` blocks, `children` nesting, `repeat`, `tags`, `template`, `blockedReasons`
- `onboarding.yaml`: simple shared tree with `tokens:` blocks
- `design-direction.md`: YAML frontmatter with keywords

The fixtures exercise all convention-documented patterns. The gap detection test uses `nonexistent-widget` (genuine not-found) and `Progress-Stepper-Base` (absent from mock catalog). Both are correctly detected.

---

## Gaps Between Convention and Implementation

None found that would affect correctness. Two minor discrepancies (observations 1 and 2) are both in the "implementation is more permissive than convention" direction, which is safe.

---

## Patterns Leo Needed That Convention Doesn't Cover

**Not assessable yet.** Leo hasn't authored real screen specs. The convention's "What This Convention Does NOT Cover" section lists five areas (accessibility annotations, conditional rendering, slot composition, component substitution, state model structure). None of these have been tested against real authoring.

**This is why a Phase 2 follow-up reassessment is needed.** The convention-vs-implementation alignment is confirmed. The convention-vs-real-authoring alignment can only be assessed after Leo writes real specs.

---

## Recommendation

1. **No changes needed now.** Convention and implementation are aligned. The two minor discrepancies are safe.
2. **Add follow-up reassessment to M0a deferred items tracker.** Trigger: after Leo has authored 3+ real screen specs in Phase 2. Scope: capture patterns the convention doesn't cover, assess whether formalization (schema) is needed.
3. **Convention stays as draft.** Promote to stable only after the Phase 2 reassessment.
