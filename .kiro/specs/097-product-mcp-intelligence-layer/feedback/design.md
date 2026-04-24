# Spec Feedback: Product MCP Intelligence Layer — Design

**Spec**: 097-product-mcp-intelligence-layer
**Created**: 2026-04-23

---

## Design Feedback

### Context for Reviewers

- Design follows settled requirements (11 reqs, 51 ACs) → requirements.md
- Architecture: 6-module extraction from current single-file server → design.md § "Architecture"
- Key design decisions (settled, do not re-litigate):
  - Single `find_screens` tool, 6 params → requirements.md § Req 1
  - `tokens:` block with dot-notation, store as-is → requirements.md § Req 3
  - YAML frontmatter on markdown for principles → requirements.md § Req 8
  - Gap detection reads `component-meta.yaml` from disk, `not-found` only (no scaffold) → requirements.md § Req 9
  - `context` searches type, name, and tags (substring match) → requirements.md § Req 1 AC 5

**What to review**: Is the module structure sound? Are the interfaces correct? Are there implementation concerns with the single-walk approach? Does the testing strategy cover the right cases?

---

**Leonardo**: Review the tool definitions table and the `ScreenQuery` filter logic. Does the `context` substring match across type/name/tags work for your queries, or do you need something different? Confirm the `get_screen_state_model` design (returns `state-model` section as-is).

**Lina**: This is your implementation blueprint. Review the module structure, interfaces, and the single-walk approach for ReverseIndexBuilder + GapDetector. Flag anything that conflicts with the current codebase or that you'd structure differently. The `ProductIndexer` orchestration and the `index.ts` shell thinning are the biggest architectural changes.

**Ada**: No action needed unless you see token-related concerns in the ReverseIndexBuilder design (token extraction from `tokens:` blocks, stored as-is).

---

### Lina R1 — Implementation Blueprint Review (2026-04-23)

**Disposition**: Design is solid and implementable. Module structure is sound. Two interface corrections, one structural concern, two minor observations.

#### Module Structure: Approved, Matches Application MCP Pattern

The 6-module extraction mirrors the Application MCP's architecture (`indexer/`, `query/`, `models.ts`, thin `index.ts` shell). I've confirmed the Application MCP uses exactly this pattern — `ComponentIndexer` orchestrates, `QueryEngine` handles filtering, `index.ts` just wires MCP SDK to the engine. Consistency between the two servers is a real benefit for anyone maintaining both.

The `indexer/` vs `query/` split is the right seam. Indexing is write-path (build data stores and indexes), querying is read-path (filter and return). Keeping them separate means I can test the indexer with fixture data and the query modules with mock indexes independently.

No objections to the module layout.

#### Single UI Tree Walk: Approved, One Coordination Detail

The single-walk approach is correct — walking the tree three times for components, tokens, and gaps would be wasteful and fragile (risk of divergent traversal logic). The design says "the walk calls their methods, it doesn't implement their logic," which is the right separation.

**Implementation detail to specify**: Who owns the walk? The design implies `ReverseIndexBuilder.indexScreen()` does the walking and calls `GapDetector.check()` per node. But `ReverseIndexBuilder` and `GapDetector` are separate modules with separate concerns. Having the builder call the detector creates a coupling that the module separation is trying to avoid.

**Recommendation**: The walk should live in `ProductIndexer`, not in `ReverseIndexBuilder`. The orchestrator walks the tree and calls both `reverseIndexBuilder.addComponent(screenName, componentName, path)` / `reverseIndexBuilder.addToken(screenName, tokenName, path)` and `gapDetector.check(componentName, oneOffs)` per node. This keeps both modules as pure data accumulators with no knowledge of each other.

This is a small change — it moves ~15 lines of tree-walking code from `ReverseIndexBuilder.indexScreen()` to `ProductIndexer.walkUiTree()` — but it eliminates the ReverseIndexBuilder→GapDetector dependency.

**Counter-argument**: Putting the walk in `ProductIndexer` makes it a fatter orchestrator. If the walk logic is complex, it might warrant its own module (`UiTreeWalker`). But for M0a with a straightforward `children`/`component`/`tokens` structure, a private method on `ProductIndexer` is sufficient. Extract later if it grows.

#### Interface Correction 1: GapDetector.check() Return Type

The design has:
```typescript
check(componentName: string, oneOffs: Map<string, unknown>): 'ok' | 'not-found';
```

Passing the entire `oneOffs` map on every call is wasteful. The detector should receive the one-off set once (at construction or via a setter) and `check()` should take just the component name:

```typescript
class GapDetector {
  constructor(componentDir: string);
  loadCatalog(): void;
  setOneOffs(oneOffs: Set<string>): void;
  check(componentName: string): 'ok' | 'not-found';
  getCatalogSize(): number;
}
```

Or pass one-offs in the constructor alongside `componentDir`. Either way, `check()` should be a single-param lookup — it's called per node in the tree walk, so it needs to be cheap.

#### Interface Correction 2: ReverseIndexBuilder Constructor

The design has:
```typescript
class ReverseIndexBuilder {
  constructor(domainObjects: Map<string, Record<string, unknown>>);
```

If the walk moves to `ProductIndexer` (per my recommendation above), the builder doesn't need domain objects at construction — it just receives `addComponent`/`addToken`/`addDomainObject` calls. The constructor becomes parameterless:

```typescript
class ReverseIndexBuilder {
  addComponent(screen: string, component: string, path: string): void;
  addToken(screen: string, token: string, path: string): void;
  addDomainObject(screen: string, domainObject: string): void;
  getIndexes(): ReverseIndexes;
  clear(): void;
}
```

If the walk stays in `ReverseIndexBuilder.indexScreen()`, then the constructor signature is fine. This correction is contingent on the walk ownership decision.

#### Structural Concern: No package.json or Test Infrastructure

The product-mcp-server currently has no `package.json`, no `tsconfig.json`, no test runner configuration, and an empty `__tests__/` directory. The design's testing strategy references "Extend existing `ProductMCPIntegration.test.ts`" — that file doesn't exist.

This isn't a design flaw — it's a task planning concern. The task breakdown needs to account for scaffolding the test infrastructure (package.json with jest config, tsconfig, fixture directory) before any test tasks can execute. The Application MCP has all of this already, so there's a clear template to follow.

**Recommendation**: Add an explicit task (or subtask of Task 1) for test infrastructure scaffolding. Don't assume it exists.

#### Observation 1: `list_experience_map` Gets `usesToken` Filter Too?

The design's Modified Tools table says `list_experience_map` gets `usesComponent` and `usesDomainObject` filters (matching Req 6 AC 4-5). But the `ScreenFilter` interface in models.ts includes `usesToken`, and `ScreenQuery` uses the same interface. Will `list_experience_map` also accept `usesToken`?

Req 6 doesn't mention token filtering for the experience map. If `ExperienceMapQuery` reuses `ScreenFilter`, it'll implicitly support `usesToken` even though no requirement asks for it. That's fine — it's free functionality from shared infrastructure — but the design should be explicit about whether `list_experience_map` exposes all 6 filter params or only the 4 from Req 6.

My preference: expose all 6. The implementation cost is zero (same filter logic), and it'd be weird to artificially restrict it.

#### Observation 2: `ScreenRef.path` Optional — Should It Be Required?

`ScreenRef` has `path?: string` (optional). But the path is what makes gap detection useful — `_componentGaps` includes `path` so agents know *where* in the tree the gap is. If `path` is optional on `ScreenRef`, the reverse indexes could have entries without location context.

During the tree walk, the path is always known (you're walking the tree, you know where you are). I'd make `path` required on `ScreenRef` and only make it optional on the domain object index (since domain object refs come from text search, not tree position).

Alternatively, split into two types: `TreeRef { screen: string; path: string }` for component/token indexes and `ScreenRef { screen: string }` for domain object indexes. But that might be over-engineering for M0a.

#### Summary

| Aspect | Verdict | Notes |
|--------|---------|-------|
| Module structure | ✅ Approved | Matches Application MCP pattern |
| Single walk approach | ✅ Approved | Move walk to ProductIndexer |
| Data models | ✅ Sound | Two interface tweaks |
| Tool definitions | ✅ Correct | Matches requirements |
| Error handling | ✅ Complete | Covers all edge cases |
| Testing strategy | ⚠️ Needs scaffolding | No test infrastructure exists yet |
| Design decisions | ✅ Well-reasoned | Trade-offs documented |

#### Action Items for Task Planning

1. Walk ownership: Move tree walk to `ProductIndexer`, make `ReverseIndexBuilder` and `GapDetector` pure accumulators.
2. Fix `GapDetector.check()` signature — single param, one-offs provided at construction.
3. Fix `ReverseIndexBuilder` constructor if walk moves to orchestrator.
4. Add test infrastructure scaffolding task (package.json, tsconfig, jest config, fixture directory).
5. Decide whether `list_experience_map` exposes all 6 filter params or only the 4 from Req 6.
6. Consider making `ScreenRef.path` required for component/token indexes.

No blockers. Ready for task breakdown.

---

### Leonardo R1 — Design Review (2026-04-23)

**Disposition**: Design is sound and ready for task breakdown. Module structure is clean, tool definitions match my workflow needs, and the testing strategy covers the right cases. Two items to settle, one agreement with Lina's walk ownership recommendation, and one observation on the test fixtures.

---

#### Module Structure: Approved

The 6-module extraction is the right call. Mirroring the Application MCP's pattern (indexer/, query/, models.ts, thin shell) means anyone maintaining both servers sees the same architecture. I've worked with the Application MCP enough to know this pattern works.

No objections.

#### Tool Definitions: Confirmed

Reviewed the New Tools and Modified Tools tables against my workflow:

- `find_screens` with 6 params — exactly what I need for impact analysis. The conjunctive filtering means I can do `find_screens({ usesComponent: "Button-CTA", status: "blocked", platform: "ios" })` in one call. Good.
- `get_product_component` — solves the indirect one-off query problem. Platform agents can look up a product component without fetching a full screen spec.
- `get_screen_state_model` — returns `state-model` section as-is. Confirmed this matches my intent from requirements. No restructuring, just slicing.
- `find_principles` by keyword — clean. Frontmatter parsing is the right approach.
- `find_templates` with `usedBy` — useful for understanding template adoption across screens.
- `list_experience_map` enrichment — the `referencedComponents`, `referencedDomainObjects`, and `blockedReasons` additions make the experience map actually useful for triage.

No tool definition changes needed.

#### `context` Substring Match: Confirmed

Decision 3 (case-insensitive substring match across type, name, and tags) works for my queries. When I'm looking for screens related to "legislation," I want to find `legislation-list` (name match) and anything tagged `[civic, legislation]` (tag match). Substring is the right granularity for M0a — the result set is small enough that false positives are trivially filtered.

If the product grows to hundreds of screens, we might need exact-match or prefix-match options. But that's a future concern, not an M0a concern.

#### Walk Ownership: Agree with Lina — Move to ProductIndexer

Lina's recommendation to move the UI tree walk from `ReverseIndexBuilder` to `ProductIndexer` is correct. The walk is an orchestration concern, not a reverse-index concern. Having the orchestrator call both `reverseIndexBuilder.addComponent()` and `gapDetector.check()` per node keeps both modules as pure data accumulators with no knowledge of each other.

This also makes the interface corrections Lina identified (GapDetector.check() single-param, ReverseIndexBuilder parameterless constructor) fall into place naturally. The orchestrator owns the walk, the modules own their data.

Agree with Lina's counter-argument too — a private method on `ProductIndexer` is sufficient for M0a. Extract to `UiTreeWalker` later if the walk logic grows.

#### `list_experience_map` Filter Params: Expose All 6

Lina flagged that `ScreenFilter` includes `usesToken` but Req 6 only specifies 4 filters for `list_experience_map`. The design should be explicit: **expose all 6 filter params on `list_experience_map`**.

The implementation cost is zero — `ExperienceMapQuery` reuses the same `ScreenFilter` and filtering logic as `ScreenQuery`. Artificially restricting it would mean maintaining a separate filter interface for no benefit. And from my workflow perspective, it'd be strange to use `find_screens` for token impact analysis but `list_experience_map` for everything else.

#### `ScreenRef.path`: Make Required for Component/Token Indexes

Lina's observation is right — during the tree walk, the path is always known. `path` should be required on component and token index entries. It's what makes `_componentGaps` useful (knowing *where* in the tree the gap is), and it's equally useful for reverse lookups ("Button-CTA is used in legislation-list at ui-tree.shared[1].children[0]").

For domain object indexes, `path` can stay optional since those refs come from text search, not tree position.

Lina's suggestion of splitting into `TreeRef` and `ScreenRef` types is cleaner but probably over-engineering for M0a. A required `path` on the shared `ScreenRef` type with `path: 'text-search'` for domain objects would work. But I'll defer to Lina on the implementation detail — she's the one writing it.

#### Test Infrastructure: Confirm Lina's Concern

Lina's right that `product-mcp-server/src/__tests__/` is empty and there's no `package.json` or test runner config in the product-mcp-server directory. The existing integration test lives in the main project at `src/__tests__/ProductMCPIntegration.test.ts` and runs via the root Jest config.

The design references "Extend existing `ProductMCPIntegration.test.ts`" — that file does exist, but it's in the main project, not in the product-mcp-server. The task plan needs to be clear about where new tests go:
- If unit tests for the new modules (ReverseIndexBuilder, GapDetector, etc.) go in `product-mcp-server/src/__tests__/`, that directory needs a test runner.
- If they go in the main `src/__tests__/`, they can use the existing Jest config but the import paths get awkward.

**My preference**: Keep integration tests in the main project (they test the server as a whole). Put unit tests for the new modules in `product-mcp-server/src/__tests__/` with their own Jest config. This matches how the Application MCP handles its tests. But again, Lina's call on the implementation detail.

#### Test Fixture Observation: Existing Fixtures Need Extension

The existing test fixtures in `ProductMCPIntegration.test.ts` create test data programmatically (inline `yaml.dump` calls). The design says "extend existing fixtures" — this means adding to the `createTestProductData()` function, not creating separate fixture files.

The fixture additions listed in the design are the right ones. One thing I want to confirm: the existing `legislation-list.yaml` fixture has a `ui-tree` with `shared` and platform branches, but the component references (`Nav-Header-App`, `Container-Base`, `Chip-Filter`, `legislation-card`) don't have `tokens:` blocks. The design correctly identifies this as an addition needed. When those `tokens:` blocks are added, use real token names per Ada's feedback — `color.action.primary` and `space.inset.normal` (or whatever's appropriate), not invented names.

Also: the existing fixture references `legislation-card` in the UI tree as a one-off component. The gap detection test needs a *different* component reference that's genuinely not-found — not `legislation-card` (which exists as a one-off) and not `Nav-Header-App` (which should be in the mock component-meta catalog). Something like `nonexistent-widget` that's clearly absent from both catalogs.

---

#### Summary

| Aspect | Verdict |
|--------|---------|
| Module structure | ✅ Approved |
| Tool definitions | ✅ Confirmed — match workflow |
| Context filter behavior | ✅ Confirmed — substring match is right for M0a |
| Walk ownership | ✅ Agree with Lina — move to ProductIndexer |
| `list_experience_map` filters | Expose all 6 params |
| `ScreenRef.path` | Make required for component/token indexes |
| Test infrastructure | Needs scaffolding task — Lina's call on structure |
| Test fixtures | Extend existing, use real token names, add genuine not-found component |

No blockers. Ready for task breakdown.

### Thurgood

#### [THURGOOD R1] — Incorporation Notes (2026-04-23)

Both reviews aligned. No conflicts. Incorporating all items.

**From Lina R1:**
- Incorporated: Walk ownership moves to `ProductIndexer.walkUiTree()`. `ReverseIndexBuilder` and `GapDetector` become pure accumulators. → design.md § "Architecture", § "Components and Interfaces"
- Incorporated: `GapDetector.check()` takes single param. One-offs provided at construction or via setter. → design.md § "GapDetector Interface"
- Incorporated: `ReverseIndexBuilder` becomes parameterless constructor with `addComponent`/`addToken`/`addDomainObject` methods. → design.md § "ReverseIndexBuilder Interface"
- Incorporated: Test infrastructure scaffolding added as explicit task concern. → noted for tasks.md
- Incorporated: `list_experience_map` exposes all 6 filter params. → design.md § "Modified Tools"
- Incorporated: `ScreenRef.path` required for component/token indexes. → design.md § "Data Models"

**From Leonardo R1:**
- Confirmed: Tool definitions match workflow. No changes.
- Confirmed: `context` substring match is right for M0a.
- Confirmed: Walk ownership agrees with Lina — move to ProductIndexer.
- Confirmed: `list_experience_map` exposes all 6 params.
- Confirmed: `ScreenRef.path` required for component/token indexes.
- Noted: Test fixtures should use real token names and include a genuine `not-found` component (not `legislation-card` or `Nav-Header-App`). → noted for tasks.md fixture extension.
- Noted: Existing integration test is in main project (`src/__tests__/ProductMCPIntegration.test.ts`), not in `product-mcp-server/`. Unit tests for new modules go in `product-mcp-server/src/__tests__/` with own Jest config. → noted for tasks.md.

**Leonardo's UI Tree Convention doc:**
- Leo authored `feedback/ui-tree-convention.md` — a comprehensive draft convention for UI tree structure in screen specs.
- Covers: node structure (component, props, tokens, children, repeat), platform branching rules, token reference format, indexer behavior per node, worked example, deviation handling guidance.
- Status: Draft — to be included in Integration Guide per Req 11, revised after 3-5 real screen specs.
- Reassessment checkpoint with Leo to be added to tasks.md per Peter's request.
- This doc resolves Lina's requirements-phase concern about UI tree shape assumptions — the convention documents exactly what the indexer expects.
