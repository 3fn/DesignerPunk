# Spec Feedback: Product MCP Intelligence Layer — Tasks

**Spec**: 097-product-mcp-intelligence-layer
**Created**: 2026-04-23

---

## Tasks Feedback

### Context for Reviewers

- 3 parent tasks, 13 subtasks across three phases: foundation (module extraction + test infra), intelligence (reverse indexes + tools), documentation (Integration Guide + reassessment)
- Agent assignments: Lina implements all code (Tasks 1-2), Thurgood handles documentation (Task 3), Leo reviews Task 3.3 reassessment
- Settled decisions from design phase (do not re-litigate):
  - Walk in ProductIndexer, ReverseIndexBuilder/GapDetector as pure accumulators → design.md § Decision 2
  - ScreenRef.path required for component/token indexes → design.md § "Data Models"
  - list_experience_map exposes all 6 filter params → design.md § "Modified Tools"
  - Test infrastructure scaffolding needed → Lina R1 design feedback

**What to review**: Is the sequencing correct? Are task types and validation tiers appropriate? Are any subtasks missing or over-scoped? Does the agent assignment make sense?

---

**Leonardo**: Review Task 3.3 (reassessment checkpoint). Is the scope right? Anything else you'd want to assess at that point?

**Lina**: This is your implementation sequence. Review Tasks 1-2 for ordering, scope, and whether any subtask should be split or merged. Flag if the test infrastructure approach (Task 1.4) needs adjustment.

---

### Lina R1 — Implementation Sequence Review (2026-04-23)

**Disposition**: Sequencing is correct. Three adjustments needed — one task scope fix, one fixture location clarification, one missing subtask.

#### Phase Sequencing: Approved

Foundation → Intelligence → Documentation is the right order. You can't build reverse indexes without the module extraction, and you can't document tools that don't exist yet. The subtask ordering within each phase is also correct — models first, then indexer extraction, then principles parser, then test infra. Each subtask's inputs are available from prior subtasks.

No reordering needed.

#### Issue 1: Task 1.4 References Wrong Test Location

Task 1.4 says "Extend existing `createTestProductData()` in `src/__tests__/ProductMCPIntegration.test.ts`." That file exists at the project root (`src/__tests__/`), not inside `product-mcp-server/`. It runs the server via `execSync` and validates stderr output — it's a smoke test, not a unit test.

The design calls for unit tests per module (ReverseIndexBuilder, GapDetector, PrinciplesParser, ScreenQuery, ExperienceMapQuery). Those need to live inside `product-mcp-server/src/__tests__/` with direct imports, not in the root project's integration test.

**What Task 1.4 actually needs to do:**

1. Set up test infrastructure *inside* `product-mcp-server/` — confirm the root jest config covers it (it likely does since the root `src/__tests__/` already runs), or add a jest config.
2. Create fixture data as YAML files in `product-mcp-server/src/__tests__/fixtures/` (not programmatically generated in a test helper). The Application MCP uses this pattern — static fixture files that tests load. This is better than `createTestProductData()` because fixtures are inspectable and don't need to be regenerated.
3. *Also* extend `createTestProductData()` in the root integration test with the new fields (`tokens:` blocks, tags, frontmatter, gap detection component). This keeps the smoke test covering the new functionality.

**Recommendation**: Split Task 1.4 into two concerns:
- 1.4a: Create static test fixtures in `product-mcp-server/src/__tests__/fixtures/` (YAML files for unit tests)
- 1.4b: Extend root `createTestProductData()` with new fields (for integration smoke test)

Or just clarify in the task description that both locations need fixture data. The current wording implies only the root integration test gets updated.

#### Issue 2: Missing Subtask — Unit Tests for Task 2 Modules

Tasks 2.1 and 2.2 each say "Write unit tests" as a bullet point. Tasks 2.4 and 2.5 also say "Write unit tests." But there's no explicit test task for Task 2.3 (the wiring task that connects walkUiTree to the builder and detector) or Task 2.6 (tool registration and handler wiring).

Task 2.3 is the most integration-heavy subtask — it's where the single walk actually populates indexes and detects gaps. If the walk has a bug (e.g., doesn't recurse into platform branches correctly, misses nested `tokens:` blocks), the unit tests for ReverseIndexBuilder and GapDetector won't catch it because those test the accumulators in isolation.

**Recommendation**: Task 2.3 should explicitly include integration-level tests that verify end-to-end: given a fixture screen spec with known components, tokens, and gaps → after `ProductIndexer.index()` → reverse indexes contain expected entries AND gaps are detected. This is the test that validates the walk logic, not just the accumulator logic.

Task 2.6 is fine without dedicated tests — the root integration test (`ProductMCPIntegration.test.ts`) covers tool dispatch. But 2.3 needs its own test coverage called out.

#### Issue 3: Task 2.7 Scope May Be Underestimated

Task 2.7 (platform filtering fix) says "Update `resolveScreenSpec`" but the current `resolveScreenSpec` calls `filterPlatform` then `enrichOneOffs`. After the module extraction in Task 1.2, `resolveScreenSpec` will live in... where? It's currently a method on `ProductMCPServer`. After extraction, does it move to `ProductIndexer`? Stay in `index.ts`? Move to a new module?

The design doesn't specify where resolution logic lives post-extraction. It's not indexing (it happens at query time) and it's not pure querying (it mutates the response with one-off enrichment and warnings). It's a response-building concern.

**Recommendation**: Task 1.2 should specify where `resolveScreenSpec`, `filterPlatform`, and `enrichOneOffs` land after extraction. My suggestion: keep them in `index.ts` for now (they're query-time response building, not indexing), and Task 2.7 updates them in place. If they grow complex enough to warrant a module, extract then. But the task description should be explicit about the location.

#### Observation: Validation Tiers Look Right

- Setup tasks (1.1, 1.4) at Tier 1 — correct, these are scaffolding.
- Implementation tasks (1.3, 2.1-2.7) at Tier 2 — correct, standard implementation with tests.
- Parent tasks and architecture tasks at Tier 3 — correct, these need comprehensive validation.
- Task 1.2 at Tier 3 — correct, this is the riskiest subtask (extraction must preserve all 7 existing tools).

#### Observation: Agent Assignments Are Correct

All code tasks (1.x, 2.x) assigned to me. Documentation tasks (3.x) assigned to Thurgood. Task 3.3 reassessment involves Leo. This matches domain boundaries — I implement, Thurgood documents, Leo reviews product architecture decisions.

#### Summary

| Aspect | Verdict | Notes |
|--------|---------|-------|
| Phase sequencing | ✅ Correct | Foundation → Intelligence → Documentation |
| Subtask ordering | ✅ Correct | Dependencies flow forward |
| Task 1.4 fixture location | ⚠️ Needs clarification | Two locations need fixtures (product-mcp-server unit tests + root integration test) |
| Task 2.3 test coverage | ⚠️ Missing | Needs integration-level tests for walk logic |
| Task 2.7 code location | ⚠️ Ambiguous | Where does resolveScreenSpec live after extraction? |
| Validation tiers | ✅ Appropriate | Risk-proportional |
| Agent assignments | ✅ Correct | Matches domain boundaries |

#### Action Items

1. Clarify Task 1.4: fixtures needed in both `product-mcp-server/src/__tests__/fixtures/` (static YAML for unit tests) and root `createTestProductData()` (extended for integration smoke test).
2. Add explicit integration test requirement to Task 2.3: verify end-to-end walk populates indexes and detects gaps correctly.
3. Specify in Task 1.2 where `resolveScreenSpec`/`filterPlatform`/`enrichOneOffs` land after module extraction.

No blockers. Ready for implementation after these clarifications.

---

### Leonardo R1 — Tasks Review (2026-04-23)

**Disposition**: Sequencing is correct, agent assignments are right, validation tiers are appropriate. Agree with Lina's three issues. Two additional observations and one scope note on Task 3.3.

---

#### Phase Sequencing: Confirmed

Foundation → Intelligence → Documentation is the only order that works. No reordering needed. Subtask dependencies within each phase flow forward correctly — models before indexer extraction, indexer extraction before walk wiring, walk wiring before query modules, query modules before tool registration.

#### Agree with Lina's Three Issues

**Task 1.4 fixture locations**: Lina's right that two locations need fixtures. Static YAML files in `product-mcp-server/src/__tests__/fixtures/` for unit tests, and extended `createTestProductData()` in the root integration test for smoke coverage. The current task description only mentions the root integration test. Both need to be explicit.

**Task 2.3 integration tests**: This is the most important testing gap. The unit tests for ReverseIndexBuilder and GapDetector test the accumulators in isolation — they verify "given these method calls, the data is stored correctly." But the walk logic in `ProductIndexer.walkUiTree()` is what determines *which* method calls happen. If the walk doesn't recurse into platform branches, or skips `tokens:` blocks at certain nesting depths, the accumulator unit tests won't catch it. Task 2.3 needs explicit integration-level tests: fixture screen spec in → verify indexes and gaps out.

**Task 2.7 code location**: `resolveScreenSpec`, `filterPlatform`, and `enrichOneOffs` need a defined home after Task 1.2's extraction. Lina's suggestion to keep them in `index.ts` for now is pragmatic — they're query-time response building, not indexing or querying. If Task 1.2 specifies this, Task 2.7 knows where to make changes.

#### Observation 1: Task 2.6 Is the Largest Subtask

Task 2.6 (register tools and wire handlers) touches 5 new tools, 2 modified tools, health response changes, env var handling, and state model extraction. That's a lot of surface area for one subtask. It's not unmanageable — each tool handler is a thin dispatch to a query module or indexer getter — but it's the task most likely to have a subtle wiring bug (wrong param name, missing error case, forgetting to pass a filter through).

Not recommending a split — the wiring is inherently one task because it all lives in `index.ts`. But Lina should be aware this is the subtask where careful validation matters most. The integration test in the root project is the safety net here.

#### Observation 2: Task 1.2 Extraction Risk

Task 1.2 is correctly at Tier 3 validation. This is the riskiest subtask — extracting the indexer from a working single-file server into modules while preserving all 7 existing tools. The "verify all 7 existing tools work identically" criterion is the right gate. I'd suggest running the existing `ProductMCPIntegration.test.ts` before and after extraction as the concrete verification step. If the smoke test passes before and after, the extraction preserved behavior.

#### Task 3.3 Reassessment Scope: Confirmed, One Addition

The scope as written is right — review indexer behavior against convention, identify gaps, assess formalization needs. One thing I'd add: **the reassessment should also capture any UI tree patterns I needed during real spec authoring that the convention doesn't cover.** The convention doc lists expected revision areas (accessibility annotations, conditional rendering, slot composition). Task 3.3 is where we check which of those actually came up and which were speculative.

Timing note: Task 3.3 is most valuable *after* I've authored at least one real screen spec. If it runs before any real specs exist, it's just comparing the indexer to the convention in a vacuum. If the task plan allows, I'd prefer Task 3.3 to be deferred until after M0a has at least one real screen spec authored — even if that means it happens after the rest of Spec 097 is complete. But if that creates scheduling issues, running it against the test fixtures is still useful, just less so.

---

#### Summary

| Aspect | Verdict | Notes |
|--------|---------|-------|
| Phase sequencing | ✅ Correct | No reordering needed |
| Subtask ordering | ✅ Correct | Dependencies flow forward |
| Agent assignments | ✅ Correct | Lina implements, Thurgood documents, Leo reviews |
| Validation tiers | ✅ Appropriate | Task 1.2 at Tier 3 is right |
| Task 1.4 fixtures | ⚠️ Agree with Lina | Two locations need explicit mention |
| Task 2.3 tests | ⚠️ Agree with Lina | Integration tests for walk logic needed |
| Task 2.7 location | ⚠️ Agree with Lina | Specify where resolveScreenSpec lives post-extraction |
| Task 2.6 scope | ℹ️ Observation | Largest subtask — careful validation needed |
| Task 3.3 timing | ℹ️ Preference | Most valuable after real screen spec authoring |

No blockers. Ready for implementation.

### Thurgood

#### [THURGOOD R1] — Incorporation Notes (2026-04-23)

Both reviews aligned on the same three issues. No conflicts. Incorporating all items.

**Issue 1 — Task 1.4 fixture locations**: Incorporated. Task 1.4 updated to specify both locations: static YAML fixtures in `product-mcp-server/src/__tests__/fixtures/` for unit tests, and extended `createTestProductData()` in root integration test. → tasks.md § Task 1.4

**Issue 2 — Task 2.3 integration tests**: Incorporated. Task 2.3 updated to include explicit integration-level tests: fixture screen spec → `ProductIndexer.index()` → verify reverse indexes and gaps populated correctly. → tasks.md § Task 2.3

**Issue 3 — Task 2.7 code location**: Incorporated. Task 1.2 updated to specify that `resolveScreenSpec`, `filterPlatform`, and `enrichOneOffs` stay in `index.ts` (query-time response building, not indexing). Task 2.7 updates them in place. → tasks.md § Task 1.2, Task 2.7

**Leo's Task 3.3 timing preference**: Incorporated. Task 3.3 updated to note it's most valuable after real screen spec authoring. Can be deferred until after Phase 2 produces at least one real spec if scheduling allows. → tasks.md § Task 3.3

**Leo's Task 2.6 observation**: Noted. No structural change — Lina is aware this is the largest subtask. Integration test in root project is the safety net.

**Leo's Task 1.2 verification**: Noted. Task 1.2 already includes "verify all 7 existing tools work identically." Running `ProductMCPIntegration.test.ts` before and after extraction is the concrete verification step.

---

### Leonardo R1 — Task 3.3 Reassessment Review (2026-04-23)

**Disposition**: Thurgood's assessment is accurate. Convention and implementation are aligned. Agree with all three observations and both recommendations. One additional observation from my review.

---

#### Verification: I Checked the Implementation

I read `ProductIndexer.ts` (specifically `walkUiTree`), `ProductIndexerWalk.test.ts`, and all fixture YAML files. Thurgood's alignment claims are correct:

- **Node structure**: `walkUiTree` checks `node.component` (string → addComponent + gap check), `node.tokens` (object, not array → iterate values → addToken), `node.children` (recurse). Matches convention exactly.
- **Token extraction**: `Object.values(node.tokens)` with `typeof val === 'string'` guard. Stores as-is. Correct.
- **Platform branching**: Checks `'shared' in uiTree`, walks shared, then walks other keys only if `Array.isArray(val)`. Correct.
- **Gap detection**: `gapDetector.check(node.component)` per node, one-offs provided at construction. Correct.
- **Path tracking**: Every `addComponent` and `addToken` call includes a path string (`ui-tree.shared[0].component`, etc.). Required, as I requested in design review.

#### Agree: Observation 1 — Platform Branch Traversal Permissiveness

Thurgood's right that the implementation traverses any array under a platform key, not just arrays containing nodes with `component` fields. The convention is stricter than the implementation. This is the safe direction — the walk processes what it can and ignores the rest. No false positives possible because the walk checks `node.component` before doing anything meaningful.

No code change needed. Convention accurately describes intent.

#### Agree: Observation 2 — No Warning for Component-less Nodes with Tokens

A node with `tokens:` but no `component:` would have its tokens silently ignored. The walk only enters the token extraction block after checking `node.component` — wait, actually, looking at the code more carefully:

```typescript
if (node.component && typeof node.component === 'string') {
  // ... addComponent, gap check
}
if (node.tokens && typeof node.tokens === 'object' && !Array.isArray(node.tokens)) {
  // ... addToken for each value
}
if (node.children) walk(node.children, ...);
```

These are independent `if` blocks, not nested. A node with `tokens:` but no `component:` **would** have its tokens extracted and indexed. The component check and token check are separate.

**This is actually a discrepancy with Thurgood's assessment.** He said tokens would be "silently ignored" for component-less nodes. They wouldn't — they'd be indexed. Whether that's correct behavior is debatable:
- **Argument for indexing**: If someone puts tokens on a wrapper node without a component name, those tokens are still used by the screen. Indexing them means `find_screens({ usesToken: "X" })` catches them.
- **Argument against**: A `tokens:` block without a `component:` is likely a spec authoring error. Indexing it gives correct reverse-lookup results but masks the structural issue.

For M0a, indexing them is fine. The reverse lookup is more useful than the authoring warning. But this is worth noting in the convention — `tokens:` blocks are indexed regardless of whether the node has a `component:` field.

#### Agree: Observation 3 — Fixtures Match Convention

The fixtures are well-constructed. They exercise:
- Platform branching: `legislation-list` has `shared` + `ios` (metadata) + `web` (metadata) ✅
- `tokens:` blocks at multiple nesting levels ✅
- `children` recursion ✅
- `repeat` expression ✅
- One-off component (`legislation-card`) ✅
- Genuine not-found (`nonexistent-widget`) ✅
- Absent-from-catalog (`Progress-Stepper-Base` in onboarding) ✅
- YAML frontmatter on principles ✅
- Template cross-refs (`card-grid` on both `legislation-list` and `dashboard`) ✅
- Blocked screen with reason ✅
- Second domain object (`representative`) ✅

The test coverage in `ProductIndexerWalk.test.ts` is thorough — 6 describe blocks covering component indexes, token indexes, domain object indexes, gap detection, enriched experience map, and template cross-refs. Each test asserts specific fixture data, not just "something exists."

#### Agree: Recommendations

1. **No changes needed now.** Correct. The convention and implementation are aligned (with the minor token-extraction nuance above, which is acceptable behavior).
2. **Phase 2 follow-up reassessment after real screen specs.** Correct. This is exactly what I said in my tasks review — Task 3.3 is most valuable after real authoring. The convention-vs-implementation alignment is confirmed; convention-vs-real-authoring can only be assessed later.
3. **Convention stays draft.** Correct. Promote to stable after Phase 2 reassessment.

#### One Addition to Deferred Items

The convention's "What This Convention Does NOT Cover" lists five areas. Based on what I've seen in the fixtures and what I expect from real spec authoring, here's my priority ordering for which will come up first:

1. **Accessibility annotation placement** — almost certainly needed for the first real spec. Where do ARIA roles, heading levels, and focus order go? Currently in a separate `accessibility:` section, but that's disconnected from the UI tree nodes they apply to.
2. **Conditional rendering** — likely needed soon. "Show error state when data fetch fails" needs an `if` or `when` expression.
3. **Component substitution across platforms** — likely needed when iOS and web use different components for the same role (e.g., iOS uses a native picker, web uses a custom dropdown).
4. **Slot composition** — probably later. Relevant when product components have named insertion points.
5. **Token keys vocabulary** — probably never needs formalization. Freeform keys work fine.

This ordering should inform which convention extensions get priority when the Phase 2 reassessment happens.

---

#### Summary

Thurgood's assessment is thorough and accurate, with one minor correction (tokens are indexed independently of component presence, not silently ignored). Convention and implementation are aligned. No changes needed now. Phase 2 reassessment deferred until real screen spec authoring.

**Task 3.3 status from my perspective: complete.** The convention-vs-implementation review is done. The convention-vs-real-authoring review is correctly deferred.