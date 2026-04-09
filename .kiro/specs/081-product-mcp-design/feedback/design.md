# Spec 081 Feedback: Design Document

**Spec**: 081-product-mcp-design
**Phase**: Design
**Date**: 2026-04-09

---

### Context for Reviewers

- Design doc is at `design.md` — architecture, data models, per-screen spec schema, one-off component schema, MCP path config, CLI, error handling, testing, 4 design decisions
- Requirements feedback is in `feedback/requirements.md` — all issues resolved (R3 AC4 enrichment removed, R6 lightened to Stemma subset, R3 AC6 blocked reason added)
- This is a focused review of the design doc only

**Leonardo**: Does the per-screen spec YAML schema match what you'd produce? Is the `PlatformBranched<T>` model right for how you think about shared vs platform-specific content?

**Ada**: Does the MCP path configuration cover everything the Application MCP needs? Any concerns about the token index conditionality?

**Lina**: Does the one-off component schema (Stemma subset) work from the component specialist perspective? Is the composed-from with slot/role mapping the right level of detail?

**Kenya / Data / Sparky**: Does the per-screen spec give you what you need to implement? Is the platform filter on `get_screen_spec` sufficient?

**Stacy**: Does the testing strategy cover governance concerns? Does the error handling for malformed specs align with your audit expectations?

### Kenya

#### [KENYA R1]

**Scope**: Design doc review from the iOS platform engineer perspective — verifying the per-screen spec schema gives me what I need to implement, the platform filter works for my workflow, and the one-off schema is sufficient.

### Per-Screen Spec Schema — Verified Against My Workflow

I walked through the `legislation-list` example the same way Sparky did, but from the SwiftUI side:

1. **Read `ux-direction`** — "Scrollable list with filter bar." I know the view structure: `NavigationStack` → `VStack` with filter bar and `ScrollView`/`List`.
2. **Read `ui-tree.shared`** — `Nav-Header-App` → `Container-Base` → `Chip-Filter` + scrollable `Container-Base` → `legislation-card` (one-off, repeated). I know my DesignerPunk SwiftUI view imports and that I need to create a `LegislationCard` SwiftUI view.
3. **Read `ui-tree.ios`** — `navigation: NavigationStack push`. Confirms my assumption from step 1. This is the platform-specific annotation I asked for in my design outline feedback — co-located with the UI tree, not in a separate section.
4. **Read `state-model.shared`** — idle, loading, populated, empty, error. Five states.
5. **Read `state-model.ios`** — `pull-to-refresh`. Sixth state, iOS-only. I add a `.refreshable` modifier. This is exactly the kind of platform divergence that belongs in a platform branch — it's a native iOS pattern that doesn't apply to web.
6. **Read `accessibility.shared`** — heading h1, toolbar for filters, `role=feed` with `aria-busy`, `role=article` per card. I translate to SwiftUI: `.accessibilityAddTraits(.isHeader)`, `.accessibilityElement(children: .contain)` for the toolbar, etc.
7. **Read `accessibility.ios`** — VoiceOver custom rotor for filter categories. This is iOS-specific accessibility that I'd implement with `AccessibilityCustomRotor`. Exactly the kind of thing that should be in the `ios` branch.
8. **Query Application MCP** — `get_component_full('Nav-Header-App')`, `get_component_full('Chip-Filter')` for props and contracts.
9. **Read one-off schema** — `legislation-card.schema.yaml` gives me props, composed-from with roles, token references. I know the SwiftUI view's API and which `@Environment(\.dpTheme)` color tokens to use.

That's a complete implementation brief. Same conclusion as Sparky: I can start building without asking Leo a single question.

### Platform Filter — Confirmed Important

The `get_screen_spec('legislation-list', 'ios')` call returning `shared` + `ios` only is exactly what I need. I don't want to see `web: navigation: client-side route` or Android-specific state handling. The fallback (no `ios` branch → return `shared` only) is correct — most screens won't have iOS-specific annotations, and `shared` is what I'd implement against.

### One-off Schema — Composed-From with Roles Is Useful for SwiftUI

The `composed-from` with `role` annotations:

```yaml
composed-from:
  - component: Container-Card-Base
    role: card-wrapper
  - component: Badge-Label-Base
    role: status-indicator
  - component: Icon-Base
    role: relevance-icon
```

This tells me the SwiftUI view structure directly: `ContainerCardBase` wrapping a `VStack` or `HStack` containing `BadgeLabelBase` (for status) and `IconBase` (for relevance). The roles disambiguate — without them, I'd have to guess whether `Badge-Label-Base` is the status indicator or a category tag.

The token references with parenthetical annotations are equally useful:

```yaml
tokens:
  - color.action.primary (relevance icon tint)
  - space.inset.200 (card padding)
```

I know `theme.colorActionPrimary` goes on the `IconBase` foreground color, and `DesignTokens.spaceInset200` goes on the `ContainerCardBase` padding. No guessing.

### Leonardo's Spec Status — Agree

The `spec: complete | draft | in-review` status is my "is this ready?" gate. If I query a screen and it's `spec: draft`, I wait. If it's `spec: complete`, I start. This prevents the wasted work of implementing against an incomplete spec that Leo might change.

### Stacy's Missing Test — Agree

Screen spec references a one-off component that doesn't exist in `product/components/` — this should return the spec with an unresolved reference warning, same as unknown domain objects. During implementation, if I see `legislation-card` in the UI tree but there's no schema, I need to know that's a data gap so I can flag it to Leo rather than silently building something without a spec.

### Summary

| Area | Assessment | Action |
|------|-----------|--------|
| Per-screen spec schema | Verified — complete iOS implementation brief | None |
| Platform filter | Confirmed important for my workflow | None |
| One-off schema | Composed-from with roles directly useful for SwiftUI structure | None |
| Spec status | Agree with Leonardo | None |
| Missing test (Stacy) | Agree — unknown one-off component | Add to testing strategy |
| Design decisions | All four correct | None |

No blocking concerns. Ready for tasks.

[Agent feedback rounds here]

---

### Ada

#### [ADA R1]

**Overall assessment**: The design doc is clean and implementable. The MCP path configuration covers what I need, the one-off token governance is correctly calibrated, and the design decisions are all sound. Brief feedback — one verification on paths, one endorsement, and one note on the token index conditionality.

### R8: MCP Path Configuration — Covers Everything

The Application MCP path list in the design doc includes:

- `COMPONENTS_DIR` — components
- `TOKEN_INDEX_DIR` — token index (Spec 096)
- `GUIDANCE_DIR` — family guidance
- `PATTERNS_DIR` — experience patterns (assembly guidance)
- `TEMPLATES_DIR` — basic layout templates
- `REGISTRY_PATH` — family registry

This addresses my requirements feedback — experience patterns are now explicitly listed as a separate path (`PATTERNS_DIR`), not conflated with family guidance. Good.

### Token Index Conditionality — Handled Correctly

The design doc's error handling doesn't explicitly list "token index directory not found" as a case, but the testing strategy includes "Missing optional paths (token index before Spec 096) — server starts without that data." That's the right behavior. The Application MCP should start and serve components, guidance, patterns, and templates even if the token index doesn't exist yet. When Spec 096 ships, the token index becomes available — no Application MCP code change needed, just a new data directory.

One thing to verify during implementation: the Application MCP's indexer should handle a missing `TOKEN_INDEX_DIR` gracefully — skip token indexing, log an info message (not a warning or error), and serve all other data normally. This is the same pattern as "Product MCP starts with empty data" (R1 AC 3).

### One-off Component Token References — Correctly Scoped

The one-off schema example includes:

```yaml
tokens:
  - color.action.primary (relevance icon tint)
  - space.inset.200 (card padding)
  - typography.bodyMd (title)
  - typography.labelSm (status badge)
```

These are all ecosystem semantic tokens — exactly what the governance gradient prescribes. One-offs use existing semantic tokens freely. The parenthetical annotations (what the token is used for) are a nice touch — they document the semantic intent of each token usage, which helps me assess whether the token choice is correct without reading the implementation.

If a one-off needed a token that doesn't exist, the schema would reference it by the intended name (e.g., `color.legislation.active`), and that's the signal to consult me about creating it. The schema format naturally surfaces token gaps.

### Design Decision 1 (No Cross-MCP Enrichment) — Correct

The requirements feedback resolved R3 AC 4 — no enrichment, reference by name. The design doc implements this cleanly. The `UITreeNode.component` field is a string (the component name), not a resolved object. Agents query the Application MCP for details. No coupling.

### Leonardo's Spec Status Addition — Agree

Leonardo's refinement (add `spec: complete | draft | in-review` to the status model) is important from my perspective too. If a screen spec references tokens that I haven't validated yet (because the spec is still in draft), platform agents shouldn't implement against it. The `spec` status is the gate.

### Summary

| Area | Assessment | Action |
|------|-----------|--------|
| MCP path configuration | Complete, experience patterns included | None |
| Token index conditionality | Handled in testing strategy | Verify graceful skip during implementation |
| One-off token references | Correctly scoped to ecosystem semantics | None |
| No cross-MCP enrichment | Correctly implemented | None |
| Spec status addition | Agree with Leonardo | None |

No blocking concerns. Ready for tasks.

---

#### [LEONARDO R1]

**Overall assessment**: This design doc is clean and implementable. The per-screen spec YAML schema is almost exactly what I'd write. The `PlatformBranched<T>` model is the right abstraction. The four design decisions are all correct and well-reasoned. My feedback is brief — one refinement on the schema, one observation on the directory structure, and endorsements.

### Per-Screen Spec Schema — This Is What I'd Produce

The `legislation-list` example spec in the design doc is remarkably close to what I'd actually write during screen specification. Let me walk through it:

- `ux-direction` as a prose block: correct. This is the "why" — I write this as free text, not structured data.
- `ui-tree` with `shared` + platform keys: correct. Most of the tree is shared. The `ios: navigation: NavigationStack push` and `web: navigation: client-side route` annotations are exactly the kind of platform divergence I'd capture.
- `state-model` with `shared` + platform-specific states: correct. `pull-to-refresh` is iOS-only — this is the right place for it.
- `data-sources`, `analytics`, `accessibility`: all correct structure.
- `repeat: for-each bill in data.bills` on the one-off component: this is a nice touch — it captures the data binding intent without prescribing implementation.

### One Refinement: Status Should Include `spec` Status

The schema shows status per platform (`web`, `ios`, `android`). In my R2 response, I showed:

```yaml
status:
  spec: complete
  web: not-started
  ios: not-started
  android: not-started
```

The `spec` status is important. A screen can be `spec: draft` (I'm still working on it), `spec: complete` (ready for implementation), or `spec: in-review` (feedback pending). Platform agents need to know whether the spec is ready before they start. Without it, a platform agent might query a screen spec that I'm still writing and implement against an incomplete tree.

The `ExperienceMapEntry` interface has `status: Record<string, string>` which technically supports a `spec` key, but it's not called out. The schema example should include it, and the `list_experience_map` response should surface it so platform agents can filter for "specs that are ready for implementation."

### Directory Structure Observation

The design doc's directory structure differs slightly from what I proposed in my R1:

| My R1 Proposal | Design Doc |
|---|---|
| `experience-map/legislation/` (flat) | `experience-map/verticals/legislation/` |
| `experience-map/onboarding/` (flat) | `experience-map/flows/onboarding/` |
| `experience-map/dashboard.yaml` (flat) | `experience-map/pages/dashboard/` |

The design doc adds a `verticals/`, `flows/`, `pages/` grouping layer. This is fine — it makes the type explicit in the directory structure rather than relying on a `type` field inside the YAML. Either approach works. The grouping layer is slightly more navigable for humans ("show me all flows") at the cost of one extra directory level.

No strong opinion — both work. Just noting the difference.

### `PlatformBranched<T>` — Correct Abstraction

This is the right model. `shared` is the default, platform keys are the exception. It works at every facet level — UI tree, state model, accessibility, data sources. The platform filter on `get_screen_spec` (return `shared` + requested platform only) is exactly what platform agents need — Kenya doesn't want to see web navigation annotations, Sparky doesn't want to see VoiceOver rotor details.

### Design Decisions — All Correct

1. **No cross-MCP enrichment**: Correct. This was unanimous and the design doc implements it cleanly.
2. **Structured one-off schema (Stemma subset)**: Correct. The `legislation-card` example shows the right level — props with types, composed-from with roles, token references, accessibility contracts only when new behavior is introduced. This is what I'd produce and what platform agents need.
3. **Platform branching**: Correct. Single spec, shared + platform keys, multi-file split for complex screens.
4. **System agents serve the repo**: Correct. Unified ownership, governance gradient.

### One-off Component Schema — The Composed-From with Roles Is Good

The `composed-from` section in the one-off schema example includes `role` annotations:

```yaml
composed-from:
  - component: Container-Card-Base
    role: card-wrapper
  - component: Badge-Label-Base
    role: status-indicator
```

This is better than what I proposed in my R2 (just a flat list). The `role` tells platform agents what each Systems Component does in the composition — "Badge-Label-Base is the status indicator, not a category tag." That's useful context I'd naturally include in a layout description but is more structured here. Good addition.

### Summary

| Area | Assessment | Action |
|------|-----------|--------|
| Per-screen spec schema | Matches what I'd produce | Add `spec` status to the status model |
| `PlatformBranched<T>` | Correct abstraction | None |
| Directory structure | Slightly different from my R1, both work | None — grouping layer is fine |
| Design decisions | All four correct | None |
| One-off schema | Composed-from with roles is a good addition | None |
| Error handling | Comprehensive | None |
| Testing strategy | Covers the right scenarios | None |

No blocking concerns. Ready for tasks.

---

### Lina

#### [LINA R1]

**Overall assessment**: The design doc is clean and implementable. The one-off component schema (Stemma subset) is the right level of detail — structured enough for platform agents to implement, light enough that it doesn't slow down product development. The four design decisions are all correct. Brief feedback — one endorsement of the composed-from format, one observation on the one-off contracts, and agreement with Leonardo's spec status addition.

### One-off Component Schema — Composed-From with Roles Is Right

The `composed-from` section with `role` annotations is better than the flat list I proposed in my questionnaire response. The role tells me something important when assessing promotion potential: if a one-off uses `Container-Card-Base` as `card-wrapper` and `Badge-Label-Base` as `status-indicator`, I can see the composition pattern. If three products independently create one-offs that compose the same ecosystem components in the same roles, that's a strong promotion signal.

The `props` section with types and required flags is the right level. Platform agents need to know what to implement. The `tokens` list with parenthetical annotations (what each token is used for) is useful for both Ada (token governance) and me (verifying semantic correctness).

### One-off Contracts — The "SHALL when new behavior" Calibration Is Correct

Design Decision 2 says: "Accessibility contracts SHALL when new behavior introduced." The `legislation-card` example shows this well — the card introduces a custom VoiceOver announcement pattern (`"{title}, status: {status}, relevance: {relevanceScore} out of 100"`) that doesn't come from any of the composed Systems Components. That's new accessibility behavior that needs a contract.

A one-off that just arranges Systems Components in a layout (no new interaction, no new announcement pattern) wouldn't need contracts — the composed components already have their own. The "new behavior" threshold is the right line.

One thing to watch during Phase 2: if a one-off composes components in a way that changes their accessibility tree (e.g., wrapping interactive components in a container that changes focus order), that's new behavior even if no individual component changed. The contract should capture the composition-level accessibility intent, not just the individual component behaviors.

### Leonardo's Spec Status — Agree

The `spec: complete | draft | in-review` status is important from my perspective too. If a screen spec is in draft and references a one-off component that I haven't reviewed yet, platform agents shouldn't implement against it. The spec status is the gate that prevents premature implementation.

### MCP Path Configuration — Component Indexer Ready

The Application MCP path configuration in the design doc matches the current indexer architecture. `ComponentIndexer` already accepts `componentsDir`. `PatternIndexer`, `FamilyGuidanceIndexer`, and `LayoutTemplateIndexer` all accept directory paths. The wiring from CLI → env vars → indexers is straightforward.

The `PATTERNS_DIR` for experience patterns (assembly guidance) is correctly separated from `GUIDANCE_DIR` (family guidance). These are different indexers serving different data — keeping the paths separate is right.

### No Cross-MCP Enrichment — Correctly Implemented

The `UITreeNode.component` field is a string reference. No resolved object, no Application MCP data inlined. This is exactly what the design outline consensus called for. When a platform agent sees `component: "Button-CTA"` in a screen spec, they query the Application MCP for the full component metadata. Two queries, clean ownership, no sync coupling.

### Summary

| Area | Assessment | Action |
|------|-----------|--------|
| One-off schema (Stemma subset) | Right level — composed-from with roles, typed props, token refs | None |
| One-off contracts | "SHALL when new behavior" is correct threshold | Watch for composition-level a11y changes during Phase 2 |
| Spec status | Agree with Leonardo | None |
| MCP path config | Indexers already support configurable paths | None |
| No cross-MCP enrichment | Correctly implemented | None |
| Design decisions | All four correct | None |

No blocking concerns. Ready for tasks.

---

### Stacy

#### [STACY R1]

**Overall assessment**: The design doc is clean and implementable. The four design decisions are all correct and well-documented with trade-offs. The requirements feedback issues (R3 AC 4 enrichment, R6 one-off metadata scope, R3 AC 6 blocked reason) are all resolved in the design. My feedback covers the two items routed to me (testing strategy and error handling from the governance/audit perspective), Leonardo's spec status addition, and one observation about the governance gradient documentation.

### Testing Strategy — Covers Governance Concerns

The testing strategy covers the scenarios I'd audit for:

- **Empty directory startup**: Correct — a new product with no data yet shouldn't fail. This is the "day one" experience.
- **Malformed YAML handling**: Correct — skip bad files, index good ones, log errors. From my audit perspective, the logged errors are findings I'd capture. If a product's screen spec has malformed YAML, that's a data quality issue I'd flag in the completion doc.
- **Platform branching merge**: Correct — `shared` + platform keys merge correctly. This is the foundation of my cross-platform parity reviews. If the merge is wrong, my parity data is wrong.
- **Status with blocked reason**: Correct — reason string returned when present. This is the data source for my "Implementation Coverage" audit checklist item.

One scenario I'd add to the testing strategy: **screen spec references a one-off component that doesn't exist in `product/components/`**. The error handling table covers "screen spec references unknown domain object" but not unknown one-off components. The behavior should be the same — return the spec with an unresolved reference noted in warnings. This is a data integrity check that catches typos and stale references.

### Error Handling — Aligns with Audit Expectations

The error handling table is comprehensive and the responses are all correct from my perspective:

- **Malformed YAML → skip and log**: Right. Don't fail the whole index because one file is bad. The log is my audit trail.
- **Unknown domain object → return with warning**: Right. The spec is still useful even if a reference is broken. The warning is the finding.
- **Multi-file conflicting facets → last file wins with warning**: Acceptable for Phase 1. "Last file wins" is deterministic, which is better than "undefined behavior." The warning surfaces the conflict for resolution.

The "platform filter for non-existent platform → return shared only, no error" is a good UX decision. If Kenya queries for `ios` on a screen that only has `shared` content, she gets the shared content — which is what she'd implement against anyway. No error, no confusion.

### Leonardo's Spec Status Addition — Important for My Workflow

Agree with Leonardo, Ada, and Lina. The `spec: complete | draft | in-review` status is essential for my audit work.

From my perspective, the spec status creates a governance gate: platform agents should not implement against a `draft` spec. If I see implementation work happening on a screen where `spec: draft`, that's a process finding — the sequential workflow was skipped. The `in-review` status is the feedback round; `complete` is the green light.

This also affects my "Spec Quality" audit checklist item: "Does the screen/feature have a specification from Leonardo? Is the spec complete?" With structured status data, I can query this instead of manually checking completion docs.

### Governance Gradient Documentation — Not in the Design Doc, and That's Fine

The design doc doesn't include the governance gradient table. That's correct — the gradient is a governance concern documented in agent prompts (R9 AC 4) and the Integration Guide (R10 AC 5), not in the MCP server's design. The design doc implements the technical infrastructure; the governance documentation lives in the steering layer.

I'm noting this because Lina asked in the design outline feedback whether governance levels should be in agent prompts or the Integration Guide. The answer (both, at different depths) is captured in the requirements (R9 + R10) and will be implemented in the tasks. The design doc doesn't need to repeat it.

### Design Decision 2 (Structured One-off Schema) — Correctly Calibrated

The Stemma subset approach resolves the R6 scope issue from the requirements round. The `legislation-card` example shows the right level: structured enough for platform agents (typed props, composed-from with roles, token references), light enough for product speed (no inheritance, no readiness tracking, no full contract taxonomy).

The "accessibility contracts SHALL when new behavior introduced" threshold is the governance gradient in action. Ecosystem components get full 10-category contracts. One-offs get contracts only when they introduce behavior the composed parts don't cover. Lina's note about watching for composition-level accessibility changes during Phase 2 is the right audit item — I'll track this.

### Design Decision 4 (System Agents Serve the Repo) — Governance Gradient Is the Key

This decision is correctly implemented. The trade-off noted ("system agents carry broader scope; governance gradient must be documented clearly") is the right concern. The mitigation is R9 AC 4 (principle in prompts) + R10 AC 5 (details in Integration Guide). If the gradient isn't documented clearly, the risk is over-governance of product artifacts — which is exactly what the R6 requirements round caught and corrected.

### Summary

| Area | Assessment | Action |
|------|-----------|--------|
| Testing strategy | Covers governance concerns | Add test for unknown one-off component reference |
| Error handling | Aligns with audit expectations | None |
| Spec status | Agree — essential for audit workflow | None |
| Governance gradient docs | Correctly not in design doc | None — lives in R9/R10 |
| One-off schema (Decision 2) | Correctly calibrated | Watch for composition-level a11y during Phase 2 |
| Unified ownership (Decision 4) | Correct, gradient is the key | None |

No blocking concerns. Ready for tasks.

---

### Sparky

#### [SPARKY R1]

**Overall assessment**: The design doc is clean and implementable. The per-screen spec schema gives me exactly what I need to build web screens, the `PlatformBranched<T>` model is the right abstraction, and the four design decisions are all correct. The requirements feedback issues are all resolved. Brief feedback — one verification of the schema from the web implementation perspective, one endorsement, and agreement with Leonardo's spec status addition.

### Per-Screen Spec Schema — Verified Against My Workflow

I walked through the `legislation-list` example as if I were about to implement it in Web Components:

1. **Read `ux-direction`** — "Scrollable list with filter bar." I know the page structure.
2. **Read `ui-tree.shared`** — `Nav-Header-App` → `Container-Base` → `Chip-Filter` + scrollable `Container-Base` → `legislation-card` (one-off, repeated). I know my imports: `@designerpunk/core/components` for the Systems Components, plus I need to create a `<dp-legislation-card>` Web Component.
3. **Read `ui-tree.web`** — `navigation: client-side route`. I know this is a routed page, not a modal or sheet.
4. **Read `state-model.shared`** — idle, loading, populated, empty, error. Five states to handle. No web-specific states needed (no `pull-to-refresh` — that's iOS only, correctly in `state-model.ios`).
5. **Read `accessibility.shared`** — heading h1, toolbar for filters, `role=feed` with `aria-busy` for the list, `role=article` for each card. I know my ARIA attributes.
6. **Query Application MCP** — `get_component_full('Nav-Header-App')`, `get_component_full('Container-Base')`, `get_component_full('Chip-Filter')` for props and contracts.
7. **Read one-off schema** — `legislation-card.schema.yaml` gives me props (title, status, relevanceScore, onPress), composed-from with roles, token references. I know the Web Component's API and CSS structure.

That's a complete implementation brief. I can start building without asking Leo a single question. This is exactly the handoff I described in my questionnaire.

### Platform Filter — Important for My Workflow

The `get_screen_spec(name, platform?)` with optional platform filter is the right API. When I'm implementing, I'd call `get_screen_spec('legislation-list', 'web')` and get `shared` + `web` content only. No iOS VoiceOver rotor details, no Android pull-to-refresh states. Clean.

The fallback behavior (platform filter for non-existent platform → return shared only) is correct. If a screen has no web-specific annotations, I get the shared content — which is what I'd implement against.

### Leonardo's Spec Status — Agree

The `spec: complete | draft | in-review` status matters for me. If I query a screen spec and it's `spec: draft`, I shouldn't start implementing — Leo might change the component tree, the state model, or the accessibility requirements. The spec status is my "is this ready?" check before I invest implementation time.

### One-off Schema — The Token References Are Useful

The `tokens` list in the one-off schema:

```yaml
tokens:
  - color.action.primary (relevance icon tint)
  - space.inset.200 (card padding)
  - typography.bodyMd (title)
  - typography.labelSm (status badge)
```

This is directly useful for my CSS. I translate each to a CSS custom property: `var(--color-action-primary)`, `var(--space-inset-200)`, etc. The parenthetical annotations tell me which element gets which token — I don't have to guess whether `space.inset.200` is the card padding or the badge margin. Small detail, big time saver.

### Stacy's Testing Addition — Agree

Stacy flagged a missing test scenario: screen spec references a one-off component that doesn't exist in `product/components/`. Agree — this should be handled the same as unknown domain objects (return spec with unresolved reference warning). During implementation, if I see a `legislation-card` in the UI tree but there's no schema for it, I need to know that's a data gap, not silently render nothing.

### Design Decision 1 (No Cross-MCP Enrichment) — Correctly Implemented

`UITreeNode.component` is a string. I see `"Button-CTA"` and resolve it myself via `get_component_full('Button-CTA')`. No coupling, no stale data, no partial views. This is the right implementation of the unanimous consensus.

### Summary

| Area | Assessment | Action |
|------|-----------|--------|
| Per-screen spec schema | Verified — complete implementation brief | None |
| Platform filter | Correct API, correct fallback | None |
| Spec status | Agree with Leonardo | None |
| One-off token references | Directly useful for CSS | None |
| Missing test (Stacy) | Agree — unknown one-off component | Add to testing strategy |
| No cross-MCP enrichment | Correctly implemented | None |

No blocking concerns. Ready for tasks.

---

### Data

#### [DATA R1]

**Scope**: Design doc review from the Android platform engineer perspective — per-screen spec schema, platform branching, one-off component schema, and one gap.

### Per-Screen Spec Schema — Complete Implementation Brief

I walked through the `legislation-list` example as if I were about to implement it in Jetpack Compose:

1. **`ux-direction`** — "Scrollable list with filter bar." I know the composable structure: `Scaffold` with top bar, `LazyColumn` body.
2. **`ui-tree.shared`** — `Nav-Header-App` → `Container-Base` → `Chip-Filter` + scrollable `Container-Base` → `legislation-card` (one-off, repeated). I know my imports and my `@Composable` function hierarchy.
3. **`ui-tree.android`** — not present in the example, which is correct. No Android-specific UI tree divergence for a list screen. If there were (e.g., `navigation: NavHost route`), it'd be here.
4. **`state-model.shared`** — idle, loading, populated, empty, error. Five sealed interface states for my ViewModel. `state-model.ios` has `pull-to-refresh` — I'd check whether Android should also have it (Compose supports it via `pullRefresh` modifier), but that's a Leo question, not a schema problem.
5. **`data-sources`** — `/api/v1/bills` with filters. Maps directly to a Repository + ViewModel pattern.
6. **`accessibility.shared`** — heading h1, toolbar, `role=feed` with `aria-busy`, `role=article` per card. I translate these to Compose Semantics: `heading()`, `semantics { role = Role.Tab }`, etc.

That's everything I need. I can start building without asking Leo a single question. This is the queryable structured data I asked for in my questionnaire.

### Platform Branching — Correct for Android

The `PlatformBranched<T>` model with `shared` + `android` key works. The platform filter on `get_screen_spec(name, 'android')` returning `shared` + `android` only is exactly what I need — no iOS VoiceOver rotor details, no web client-side routing annotations.

### One-off Component Schema — Can Build a Composable from This

The `legislation-card` schema gives me:
- **`composed-from` with roles** — I know my imports (`Container-Card-Base`, `Badge-Label-Base`, `Icon-Base`) and what each does in the composition
- **`props` with types** — my `@Composable` function parameters: `title: String`, `status: LegislationStatus`, `relevanceScore: Int`, `onPress: () -> Unit`
- **`tokens`** — my theme references: `theme.colorActionPrimary` for the icon tint, `DesignTokens.space_inset_200` for padding, etc.
- **Accessibility contract** — the custom TalkBack announcement pattern I need to implement via `contentDescription`

This is the right level. I don't need full Stemma for a product-specific card.

### Blocked Status with Reason — Reflected

The `ExperienceMapEntry` interface includes `blockedReasons?: Record<string, string>` — platform key to reason string. This is exactly what I requested in my design outline R1. When I query `list_experience_map` and see `android: blocked` with reason `sync-pending`, I know what to do.

### Gap: Leonardo's Spec Status Not in Schema

Leonardo proposed adding `spec: complete | draft | in-review` to the status model. Ada, Lina, Stacy, and Sparky all agreed. But the design doc's example and `ExperienceMapEntry` interface don't include it.

The `status: Record<string, string>` type technically supports a `spec` key, but the YAML example only shows platform keys:

```yaml
status:
  web: in-progress
  ios: not-started
  android: not-started
```

It should be:

```yaml
status:
  spec: complete
  web: in-progress
  ios: not-started
  android: not-started
```

This matters for my workflow. If I query a screen spec and it's `spec: draft`, I shouldn't start implementing — Leo might change the component tree. Without the `spec` key in the schema, I have no way to check whether the spec is ready. Five agents agreed this should be there.

### Summary

| Area | Assessment | Action |
|------|-----------|--------|
| Per-screen spec schema | Complete implementation brief for Android | None |
| Platform branching | Correct, filter works | None |
| One-off schema | Can build a composable from it | None |
| Blocked status with reason | Reflected correctly | None |
| Spec status | Missing from schema despite consensus | Add `spec` key to status model and example |

One gap (spec status), otherwise no concerns. Ready for tasks once the spec status is added.

---