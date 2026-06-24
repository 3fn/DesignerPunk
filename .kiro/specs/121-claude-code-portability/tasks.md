# Implementation Plan: MCP Delivery-Layer Hardening (121)

**Date**: 2026-06-23
**Spec**: 121 — MCP Delivery-Layer Hardening
**Status**: Implementation Planning
**Dependencies**: None (no-regret spine — additive to both MCPs; ships standalone value to Kiro today)

---

## Cross-Spec Context

- **121 is the no-regret spine.** Every fix here is additive to both MCPs (one justified exception: Req 4 supersede) and improves Kiro independent of any migration. It ships value standalone.
- **122 (Agent Generator) and 123 (Consumer Distribution) follow 118**, not 121. 121 does not block on them; they consume 121's outputs (122 propagates the summary-first rule from Req 5; 123 inherits the dp-portfolio sync-refresh watch item from Req 4).
- **Req 6 consumes 119 Decision 4a** (Certainty Calibration Protocol). 121 surfaces the three-layer signal (esp. Layer-1 `partial`); 119 defines the agent-side propose-best-fit → human go/no-go protocol that acts on a `partial`. The cross-reference is one-directional: 121 emits, 119 consumes.

## Agent-Ownership Legend

- **Ada** — token-side (Req 2 resolved-value triple, the O3 `value?` type fix, token-side contract-test assertions).
- **Lina** — component-side (Req 1 keyword index/matching, `find_components` routing, `ApplicationSummary` contract, component-side contract-test assertions, calibration component fixtures).
- **Thurgood / infra** — docs MCP (`find_docs`, section addressing), the supersede sweep (ballot-measure), docs rubric + stop-word module, MCP governance docs, calibration docs fixtures, test-harness scaffolding.

## Task-Type Reconciliation Note (governance)

The official task-type taxonomy (`Process-Task-Type-Definitions.md`) is **Setup / Implementation / Architecture / Parent** — there is **no "Documentation" task type**. The brief's "Documentation-type" items (the supersede sweep, the MCP governance-doc updates) are therefore classified as **Implementation** tasks that produce documentation artifacts with testable acceptance criteria (doc-as-requirement standard, Process-Spec-Planning). Each carries a runnable/validatable acceptance check (`validate-steering-metadata.js`, resolving cross-references, `rebuild_index`, swept-reference grep returns zero). The steering-doc edits additionally route through the **ballot-measure model** (drafted → presented to Peter → approved → applied) — flagged on each such task. **This classification is accepted by Peter (see Flags / Open Items — F1).**

---

## Task List

- [x] 1. Application-MCP Additive Foundation: Type Fix + Resolved-Value Triple

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - `TokenIndexEntry.value` is optional so semantic tokens can carry no `value` key (prerequisite for the exact-key-set assertion in Task 4)
  - `get_token_details` emits the resolved-value triple (`resolvedValue`/`resolvedUnitType`/`resolutionDepth`) chain-resolved via `TokenRefResolver` logic, additively
  - `platforms{}` unchanged; semantic tokens still carry no `value` key; existing assertions still pass
  - The triple uses the product MCP's field names + null-contract verbatim (no divergent third shape)

  **Primary Artifacts:**
  - `application-mcp-server/src/indexer/TokenIndexer.ts` (type fix + `getDetails` triple)
  - app-side `TokenRefResolver` instance / reused logic

  **Completion Documentation:**
  - Detailed: `.kiro/specs/121-claude-code-portability/completion/task-1-parent-completion.md`
  - Summary: `docs/specs/121-claude-code-portability/task-1-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 1 Complete: App-MCP Additive Foundation"` (runs release analysis automatically)
  - Verify: Check GitHub for committed changes

  - [x] 1.1 Apply the `value?` type fix (O3 — RESOLVED)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Change `value: string | number;` → `value?: string | number;` at `application-mcp-server/src/indexer/TokenIndexer.ts:20` (one-line, type-only, additive; covers semantic + component tiers)
    - **O3 resolved (no runtime reconciliation needed):** semantic entries already carry no entry-level `value` at runtime (0/193; `value:` appears only nested inside `primitiveReferences`). The fix loosens the type to match the already-correct runtime shape — the Req 2.4 / P2 "no `value` key" assertion holds as written, no spec correction
    - Run existing app-MCP tests; confirm no existing assertion breaks (additive/back-compat hard constraint)
    - _Prerequisite for Task 4 exact-key-set "no `value` on semantics" assertion (P2)_
    - _Requirements: 2.4_

  - [x] 1.2 Apply the app-side resolver reuse contract (O1 — CONFIRMED, Ada)
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Ada
    - **O1 confirmed (Ada):** reuse the product MCP `TokenRefResolver` contract verbatim; the application-side resolver reads the same `token-index/*.yaml` corpus; the verbatim `ResolvedRef → { resolvedValue, resolvedUnitType, resolutionDepth }` mapping is the intended adoption
    - `themeVarying` is carried at the semantic tier; the resolved-value triple does NOT surface `themeVarying` (`get_token_details` returns it independently)
    - Note the shared-resolver-module dedup as a backlog item (Decision 7 / Carried-Forward 2) — NOT 121 scope
    - _Requirements: 2.5_

  - [x] 1.3 Implement the resolved-value triple on `get_token_details`
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Add `resolvedValue` / `resolvedUnitType` / `resolutionDepth` additively to `getDetails()` return, alongside the unchanged `platforms{}` object
    - Map the null-contract: primitive → own value / `full`; single resolvable ref → terminal value / `full`; multi-ref/literal/unresolvable → self-name / `partial`; no-ref-no-value → `null`/`null`
    - Reuse `TokenRefResolver` logic; do NOT add a `{platform}Accessor` field (Ada R1 P1 dropped)
    - _Requirements: 2.1, 2.2, 2.3, 2.5_

- [x] 2. Tokenized Keyword Discovery on `find_components` (Req 1)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - `find_components` matches via **tokenized term matching** (not substring), so multi-word NL queries (`"primary action button"`) are matchable
  - New optional `keyword` param rides alongside existing exact-match `context`/`concept`/`category` semantics — unchanged (back-compat)
  - Keyword index auto-derived from existing metadata; indexes the field set incl. `when_to_use`; excludes `when_not_to_use`; supports optional reactive `aliases:`
  - The pinned fixture queries return at least their recall-floor matches (not `data: []`); `ApplicationSummary` shape unchanged (+ optional `matchedOn`)

  **Primary Artifacts:**
  - `application-mcp-server/src/indexer/ComponentIndexer.ts` (keyword index build)
  - `application-mcp-server/src/query/QueryEngine.ts` (`findComponents` tokenized matching)
  - `application-mcp-server/src/index.ts` (new optional param routing)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/121-claude-code-portability/completion/task-2-parent-completion.md`
  - Summary: `docs/specs/121-claude-code-portability/task-2-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 2 Complete: Tokenized Keyword Discovery"` (runs release analysis automatically)
  - Verify: Check GitHub for committed changes

  - [x] 2.1 Build the auto-derived tokenized keyword index (signal-class grouped)
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Lina
    - Build per-component index at index-build time, grouped by signal class: high-signal (tokenized `name`, tokenized `family`, `purpose`, contract concept/category names); low-signal (`when_to_use`, `contexts`, `alternatives[].reason`, `description`)
    - **O2b confirmed (Lina):** the indexer reads the real key `when_to_use` (snake_case) / parsed `whenToUse` — `parsers.ts:198` maps `usage.when_to_use → whenToUse`, so the index build reads that surface, not a phantom field
    - **Exclude `when_not_to_use`** (negative-signal trap; Lina R1 Q1)
    - Tokenize: split on whitespace / camelCase / hyphen; lowercase; term-level, NOT substring (P3)
    - Auto-derive without hand-curated keyword lists; add optional reactive `aliases:` field (absence must not block auto-derived matching)
    - **O2 confirmed (Lina):** signal-class field assignments match the Lina rubric in `discovery-confidence-rubric.md`
    - _Requirements: 1.3, 1.4, 1.8, 1.9_

  - [x] 2.2 Implement tokenized matching in `findComponents`
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Match query terms against the keyword index via tokenized term matching
    - Compute per-candidate `matchedOn` (signal-class-labeled) + `matchedTokens`/`totalTokens` coverage (feeds Task 5 tier derivation + Layer-3 rank)
    - Keep filters conjunctive: `keyword` + `category` AND-narrows
    - _Requirements: 1.3, 1.6_

  - [x] 2.3 Add the new optional `keyword` param + routing (back-compat)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Add `keyword` (free-text tokenized discovery) and optional `limit` to `index.ts handleFind()` routing
    - Do NOT mutate existing exact-match semantics of `context` / `concept` / `category` (Lina R1 P0)
    - Return existing `ApplicationSummary` shape unchanged, optionally augmented with `matchedOn`; NOT a thinned shape
    - Verify discovery→retrieval composes: returned component name resolves via `get_component_summary` in one call (P6)
    - _Requirements: 1.5, 1.7, 1.10_

- [x] 3. `find_docs` Tool + Supersede `get_documentation_map` (Req 1 + Req 4)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - `find_docs` ships dual-mode: concept/keyword search + paginated list/catalog mode, fully subsuming the map
  - List/catalog mode returns within the MCP token limit across bounded calls (fixes Finding 10's ~78K-char failure)
  - `get_documentation_map` removed/deprecated; its pinned shape test rewritten (not silently mutated) to target `find_docs`
  - The supersede + the reference sweep are recorded in `MCP-Evolution-Roadmap.md` with rationale
  - All first-party `get_documentation_map` references swept to `find_docs`; sweep grep returns zero first-party references

  **Primary Artifacts:**
  - `mcp-server/src/tools/find-docs.ts` (new)
  - `mcp-server/src/query/QueryEngine.ts`
  - removal of `mcp-server/src/tools/get-documentation-map.ts` + its rewritten test
  - swept steering docs + agent prompts + `mcp.json` autoApprove lists

  **Completion Documentation:**
  - Detailed: `.kiro/specs/121-claude-code-portability/completion/task-3-parent-completion.md`
  - Summary: `docs/specs/121-claude-code-portability/task-3-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 3 Complete: find_docs + map supersede"` (runs release analysis automatically)
  - Verify: Check GitHub for committed changes

  - [x] 3.1 Implement `find_docs` concept-search mode
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Implement `find_docs({ concept })` returning entries with `path`, ~50-token `summary`, owning domain/agent, ranked by match
    - No-match returns the pinned empty contract `{ data: [], error: null, matchConfidence: 'none' }` — explicit "no matches", not an error, not a silent payload (Decision 2)
    - Verify discovery→retrieval composes: returned `path` resolves via `get_section`/`get_document_summary` in one call (P6)
    - _Requirements: 1.1, 1.2, 1.10_

  - [x] 3.2 Implement `find_docs` paginated list/catalog mode
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Implement `list` / `cursor` / `limit` enumeration of the full doc set across all domains via a bounded sequence of calls
    - Bounded default `limit`; every page returns within the MCP token limit with growth headroom (P7; fixes Finding 10)
    - List mode is unranked enumeration — no `matchConfidence` tier (deterministic catalog, not relevance ranking)
    - _Requirements: 4.1, 4.2_

  - [x] 3.3 Remove `get_documentation_map` + rewrite its pinned test
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Remove/deprecate the `get_documentation_map` tool and its internal docs-MCP refs (`index.ts`, `tools/index.ts`, README)
    - Rewrite its existing pinned shape test to target `find_docs` list mode (explicit supersede; NOT silently mutated)
    - This is the one justified break (redundant-once-replaced + zero consumer code coupling)
    - _Requirements: 4.3_

  - [x] 3.4 Sweep first-party `get_documentation_map` references (ballot-measure)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Retarget all first-party references to `find_docs`. **Verified canonical sweep set (corrected from the design's "~8 / Thurgood-prompt-only" undercount — see Flags / Open Items F4):**
      - 5 steering docs: `component-mcp-query-guide.md`, `00-Steering Documentation Directional Priorities.md`, `Component-Quick-Reference.md`, `DesignerPunk-Integration-Guide.md`, `MCP-Relationship-Model.md`
      - Thurgood prompt: `.kiro/agents/thurgood-prompt.md`, `.claude/agents/thurgood.md`, `product-template/agents/thurgood-prompt.md`
      - 2 real MCP configs (autoApprove lists): `.kiro/settings/mcp.json`, `.cursor/mcp.json` (verify the `init` template path Req 4.4 names)
    - **NOT 121 sweep targets:** the additional `get_documentation_map` hits in `.claude/agents/{ada,lina,data}.md` are **disposable ports regenerated by Spec 122's generator** — they refresh automatically when 122 regenerates the agent prompts, so they are not manual 121 sweep targets.
    - **Ballot-measure model** for steering-doc + Thurgood-prompt edits: draft → present to Peter → approved → applied. Thurgood does not write these unilaterally.
    - Acceptance: `grep -rl get_documentation_map` over the canonical sweep set returns zero (the regenerated `.claude/agents/{ada,lina,data}.md` ports are excluded from this acceptance grep)
    - _Requirements: 4.4_

  - [x] 3.5 Record the supersede in `MCP-Evolution-Roadmap.md` (doc-as-requirement; ballot-measure)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Document the supersede path + rationale (the one justified break), the index-freshness test-approach decision (Decision 4), and record the reference sweep
    - Reconcile actioned delivery-layer findings (9, 10, 11, 12, section-addressing 1/3)
    - Acceptance (testable): doc exists at `.kiro/steering/` path, passes `scripts/validate-steering-metadata.js`, cross-references resolve
    - Routes through ballot-measure model
    - _Requirements: 4.3, 4.5, Doc-Req 3_

- [x] 4. Application-MCP Tool-Boundary Contract Test (Req 3 — the H1 gap)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - The application MCP's tool-boundary layer is exercised end-to-end through `callTool(...)` (not QueryEngine/indexer directly)
  - The additive guarantee is enforced by test (exact-key-set; altering an existing field fails loud) — no longer aspirational
  - `get_token_details` and `find_components` emitted shapes are pinned via tier-aware full-shape fixtures
  - Req 6 three-layer / tier assertions pass per calibration fixture, including adversarial false-confidence guards, for both `find_docs` and `find_components`

  **Primary Artifacts:**
  - `application-mcp-server/src/__tests__/tool-boundary.contract.test.ts` (new)
  - pinned fixture corpus + calibration fixtures
  - live-smoke recall check

  **Completion Documentation:**
  - Detailed: `.kiro/specs/121-claude-code-portability/completion/task-4-parent-completion.md`
  - Summary: `docs/specs/121-claude-code-portability/task-4-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 4 Complete: Tool-Boundary Contract Test"` (runs release analysis automatically)
  - Verify: Check GitHub for committed changes

  - [x] 4.1 Scaffold the `callTool`-level contract-test harness + fixture split (pinned corpus + live smoke)
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Thurgood
    - Create `tool-boundary.contract.test.ts` exercising `callTool('get_token_details', ...)` and `callTool('find_components', ...)` end-to-end (NOT QueryEngine/indexer directly)
    - Establish the pinned fixture corpus (Decision 4(b)) for tier-classification/recall-floor tests, plus a separate lightweight **live-smoke** check asserting only that named floor components still exist (**O2a confirmed, Lina:** pinned corpus + live smoke is the index-freshness approach / Decision 4)
    - Document the fixture re-baseline refresh step
    - _Prerequisite for 4.2–4.5 assertions_
    - _Requirements: 3.1_

  - [x] 4.2 Author `get_token_details` contract assertions (token-side)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada
    - Tier-aware full-shape fixtures: primitive / semantic (theme-varying) / component / `partial` / `null` / not-found
    - Assert the Req 2 resolved-value triple; assert an **exact key-set** (additive = enforced, not inferred — P1); pin **no `value` key on semantics** (P2; depends on Task 1.1)
    - _Requirements: 3.2, 3.4, 3.5_

  - [x] 4.3 Author `find_components` contract assertions (component-side)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina
    - Lock the full `ApplicationSummary` shape; assert recall-floor `must-include` per the corrected fixture set (Req 1)
    - Assert empty query → `{ data: [], error: null }`; cover conjunctive narrowing + discovery→retrieval composition
    - Do NOT pin result ordering unless ranking is implemented
    - _Requirements: 3.3, 3.4, 3.5_

  - [x] 4.4 Author tier-classification assertions from calibration fixtures (Req 6 at the boundary)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood (docs fixtures) + Lina (component fixtures)
    - Drive from the `discovery-confidence-rubric.md` calibration fixtures: `{ query → expected matchConfidence + expected top candidate }`, for both `find_docs` and `find_components`
    - Per fixture assert: (a) expected `matchConfidence` tier; (b) three layers present as **distinct fields** (`matchConfidence` ≠ viability ≠ rank), not collapsed; (c) a `partial` (weak-match) fixture returns ranked below-threshold candidates flagged with tier (NOT empty); (d) a `none` fixture returns the empty contract — `partial` vs `none` distinguishable from response shape alone (P4)
    - Include the **adversarial false-confidence guards**: low-signal-only ≥2-token coverage caps at `partial` not `strong`; an incidental high-field token caps at `partial` not `strong`
    - _Requirements: 3.6, 6.7_

  - [x] 4.5 Assert the breaking-change guard + tighten the noted vacuous docs-MCP assertion
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Assert that altering any existing field of either tool's emitted shape fails the test (breaking = loud — P1)
    - Tighten the one noted vacuous docs-MCP integration assertion (`get_section` under `if (!isError)`)
    - _Requirements: 3.4, 3.5_

- [x] 5. Discovery Confidence Model — Three-Layer Emit (Req 6)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - Both discovery tools emit Match / Viability / Usability as three **distinct fields, never collapsed**
  - Layer-1 `matchConfidence: strong|partial|none` is a tier derived by the per-domain rubric from visible evidence (reconstructable from `matchedOn` + coverage — P5)
  - Layer-2 viability is a distinct gate signal (component readiness; doc placeholder/deprecated; token `resolutionDepth`) lexically distinct from `matchConfidence` (§Collision)
  - The governing sequence holds: match-confidence alone never drives action
  - The signal is additive to existing shapes (`ApplicationSummary` / `find_docs` shape unchanged)

  **Primary Artifacts:**
  - `find_components` + `find_docs` result builders (three-layer emit)
  - versioned stop-word list module
  - per-domain Layer-1 rubric implementations

  **Completion Documentation:**
  - Detailed: `.kiro/specs/121-claude-code-portability/completion/task-5-parent-completion.md`
  - Summary: `docs/specs/121-claude-code-portability/task-5-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 5 Complete: Discovery Confidence Model"` (runs release analysis automatically)
  - Verify: Check GitHub for committed changes

  - [x] 5.1 Implement the versioned stop-word list module (Decision 3)
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Single versioned stop-word module (a `version` constant + changelog) owned by the docs domain, consumed by the docs MCP (and by the application MCP as data, not logic) — legible knob, not opaque weight
    - Exposed so turning the knob moves a query between tiers predictably
    - **O4 resolved (see Flags / Open Items F2):** placement is the docs-domain-owned versioned module above — no longer an open docs-constant-vs-shared-infra question
    - _Requirements: 6.7_

  - [x] 5.2 Implement per-domain Layer-1 rubric tier derivation
    **Type**: Architecture
    **Validation**: Tier 3 - Comprehensive
    **Agent**: Lina (components rubric) + Thurgood (docs rubric)
    - Derive `matchConfidence` from `matchedOn` (signal-class-labeled) + `matchedTokens`/`totalTokens` coverage per the rubrics in `discovery-confidence-rubric.md` — reconstructable/auditable, not an opaque label (P5)
    - Implement the validated false-confidence guards (signal-class-gated ≥2-token coverage; incidental high-field token caps at `partial`)
    - Make `matchedOn` mandatory whenever `matchConfidence` is emitted (Decision 1)
    - Token tools EXEMPT (Req 6.6 bright line: predicate filter → no tier; relevance ranking → tier required)
    - _Requirements: 6.1, 6.2, 6.3_

  - [x] 5.3 Emit the three distinct fields additively on both discovery tools
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Lina (find_components) + Thurgood (find_docs)
    - Emit Layer 1 (`matchConfidence`), Layer 2 viability (components `readiness`; docs `{ placeholder, deprecated }`; tokens' `resolutionDepth` is the token sub-case), Layer 3 (`rank` + `matchedOn`) as distinct fields
    - Enforce the governing sequence (match → filter by viability → rank/judge usability); `strong` is necessary-not-sufficient for action
    - Additive only — `ApplicationSummary` / `find_docs` shapes not mutated or thinned (back-compat)
    - When `matchConfidence` is `partial`, results resolve via the 119 Decision 4a propose-best-fit protocol (cross-spec consumer; 121 emits the signal, 119 acts)
    - _Requirements: 6.1, 6.4, 6.5, 6.8_

- [x] 6. Section Addressing by Path+Parent / Stable IDs + Summary-First (Req 5)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - `get_section` disambiguates non-unique headings by `path + parent` or a stable section ID
  - Stable section IDs resolve the same logical section across heading-string drift (Finding 2)
  - `get_section` returns `siblingHeadings` so a stub/preamble carries a cue that substantive siblings exist (Finding 1)
  - The summary-first workflow rule is encoded in a form Spec 122 can propagate (cross-spec note; 122 propagates)

  **Primary Artifacts:**
  - `mcp-server/src/tools/get-section.ts`
  - `mcp-server/src/query/QueryEngine.ts`

  **Completion Documentation:**
  - Detailed: `.kiro/specs/121-claude-code-portability/completion/task-6-parent-completion.md`
  - Summary: `docs/specs/121-claude-code-portability/task-6-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 6 Complete: Section Addressing"` (runs release analysis automatically)
  - Verify: Check GitHub for committed changes

  - [x] 6.1 Add `parent` + `sectionId` disambiguation to `get_section`
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Add `parent` (disambiguate non-unique headings by parent context) and `sectionId` (stable ID resolving across heading-string drift) params
    - When a heading is non-unique and no disambiguator is supplied, signal ambiguity + list candidate parents rather than silently returning the first match (Finding 3)
    - _Requirements: 5.1, 5.2_

  - [x] 6.2 Add `siblingHeadings` adjacency cue + encode the summary-first rule
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - Return `siblingHeadings` so a preamble/stub carries a cue that substantive siblings exist (Finding 1 — the failure this very formalization reproduced)
    - Encode summary-first as a hard workflow rule in a form Spec 122 can propagate into generated agent prompts (this spec encodes; 122 propagates)
    - _Requirements: 5.3, 5.4, 5.5_

- [x] 7. MCP Governance Documentation Updates (Doc-as-Requirement; ballot-measure)

  **Type**: Parent
  **Validation**: Tier 3 - Comprehensive (includes success criteria)

  **Success Criteria:**
  - MCP governance docs reflect the shipped model: discovery tools, additive token contract, the supersede, the confidence model
  - Each doc exists at its `.kiro/steering/` path, passes `scripts/validate-steering-metadata.js`, has resolving cross-references, runnable examples run
  - The docs-MCP index is rebuilt so the documented model is itself discoverable via the tools it describes
  - All edits route through the ballot-measure model (drafted → presented → approved → applied)

  **Primary Artifacts:**
  - `.kiro/steering/MCP-Relationship-Model.md`
  - `.kiro/steering/MCP-Integration-Guide.md` (this is the 121 content-update target. `DesignerPunk-Integration-Guide.md` is a **distinct** doc — consumer onboarding, **Spec 123 scope, not 121** — see Flags / Open Items F5. It appears in the Task 3.4 sweep set only because it currently references `get_documentation_map`, which is a retarget, not a content update.)
  - `.kiro/steering/MCP-Evolution-Roadmap.md` (the roadmap-specific slice is owned by Task 3.5; this task covers Relationship-Model + Integration-Guide)

  **Completion Documentation:**
  - Detailed: `.kiro/specs/121-claude-code-portability/completion/task-7-parent-completion.md`
  - Summary: `docs/specs/121-claude-code-portability/task-7-summary.md`

  **Post-Completion:**
  - Mark complete: Use `taskStatus` tool to update task status
  - Commit changes: `./.kiro/hooks/commit-task.sh "Task 7 Complete: MCP Governance Docs"` (runs release analysis automatically)
  - Verify: Check GitHub for committed changes

  - [x] 7.1 Document the discovery tools + confidence model
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Thurgood
    - In `MCP-Relationship-Model.md` + `MCP-Integration-Guide.md`: document `find_docs` (concept + list/catalog) and keyworded `find_components` (new optional param, tokenized matching, indexed field set, `ApplicationSummary` unchanged + optional `matchedOn`), incl. query/result shapes and the auto-index-first hybrid model
    - Document the three-layer confidence model referencing `discovery-confidence-rubric.md` as authoritative: tiers-not-scores; governing sequence; match-confidence-alone-never-acts; `partial` returns flagged ranked candidates vs `none` returns empty contract; token exemption + trigger; cross-ref to 119 Decision 4a
    - **Document the docs `aliases:` surface (folded in from Task 5 — Peter-approved).** Two audiences: (i) consumer-facing — `find_docs` indexes an optional high-signal `aliases:` frontmatter field as a reactive semantic-synonym bridge (extends Req 1.9 to docs; see design.md find_docs §); (ii) **author-facing — add a short `aliases:` entry to the steering metadata schema in `Process-File-Organization.md`**: optional, comma-separated concept terms, added reactively when a doc is discoverable by a term absent from its title/description. (Validator needs no change — it does not enforce a closed field set.)
    - Acceptance (testable): metadata valid, cross-references resolve, examples run
    - Routes through ballot-measure model
    - _Requirements: Doc-Req 1, Doc-Req 4_

  - [x] 7.2 Document the additive `get_token_details` triple + governance rule
    **Type**: Implementation
    **Validation**: Tier 2 - Standard
    **Agent**: Ada (content) + Thurgood (governance/metadata)
    - Document the resolved-value triple, its null-contract, the **"always read `resolutionDepth` first"** rule, `platforms{}` unchanged, and the additive/back-compat governance rule explicitly
    - Accurately state the authoritative runtime value is the shipped `dist/DesignTokens.*` artifact (per G6) — docs SHALL NOT claim the MCP eliminates the need to reference shipped token files
    - Acceptance (testable): metadata valid, cross-references resolve
    - Routes through ballot-measure model
    - _Requirements: Doc-Req 2, Doc-Req 4_

  - [x] 7.3 Rebuild the docs-MCP index
    **Type**: Setup
    **Validation**: Tier 1 - Minimal
    **Agent**: Thurgood
    - After the doc edits land, call `rebuild_index` so the documented model is discoverable through the tools it describes
    - Verify index health is `healthy`
    - _Requirements: Doc-Req 5_

---

## Flags / Open Items (Resolved)

These are the items previously carried as "(see Flags)" or as open questions (O1–O4). All are resolved; they are recorded here so the build session is self-contained.

- **F1 — Task-type classification (governance).** The official taxonomy (`Process-Task-Type-Definitions.md`) is **Setup / Implementation / Architecture / Parent** — there is **no "Documentation" type**. The doc-as-requirement items (supersede sweep, MCP governance-doc updates) are therefore classified **Implementation** with testable acceptance: metadata validation (`validate-steering-metadata.js`), cross-references resolve, `rebuild_index`, and the swept-reference grep returns zero. Steering-doc edits additionally route through the ballot-measure model. **Resolution:** accepted by Peter.

- **F2 — Stop-word list placement (O4 / Decision 3).** Settled at implementation time as a **versioned module, docs-domain-owned** (a `version` constant + changelog), consumed by the docs MCP (and by the application MCP as data, not logic). It is a legible knob, not an opaque weight. **Resolution:** docs-domain-owned versioned module — no longer an open placement question.

- **F3 — `matchedOn` coupling (Decision 4 of the design).** Reconciles Req 1.7 ("optional") against Req 6's dependence on it. **Resolution (design Decision 1):** `matchedOn` is **mandatory whenever a tool emits `matchConfidence`**. Since both discovery tools emit `matchConfidence`, `matchedOn` is effectively mandatory on them; it stays optional in the general case.

- **F4 — Reference-sweep count (~8 → verified set).** The design's "~8 / Thurgood-prompt-only" wording undercounted. **Resolution:** the verified canonical sweep set is the one enumerated in **Task 3.4** — the steering docs + the Thurgood prompt + the two real MCP configs (`.kiro/settings/mcp.json`, `.cursor/mcp.json`). The additional `get_documentation_map` hits in `.claude/agents/{ada,lina,data}.md` are **disposable ports regenerated by Spec 122's generator** — they are NOT manual 121 sweep targets. Task 3.4 is the authoritative list.

- **F5 — `MCP-Integration-Guide.md` vs `DesignerPunk-Integration-Guide.md`.** These are **two distinct docs**, not a filename to reconcile. **Resolution:** 121's doc updates target the **MCP docs** — `MCP-Integration-Guide.md`, `MCP-Relationship-Model.md`, `MCP-Evolution-Roadmap.md`. `DesignerPunk-Integration-Guide.md` (consumer onboarding) is **Spec 123 scope**, not 121. (Note: `DesignerPunk-Integration-Guide.md` still appears in the Task 3.4 sweep set because it currently *references* `get_documentation_map` and that reference must be retargeted; that is a sweep target, not a 121 content-update target.)

### Open Questions O1–O4 — resolved in domain review

- **O1 (Ada) → folded into Task 1.2.** CONFIRMED: reuse the product MCP `TokenRefResolver` contract verbatim; the application-side resolver reads the same `token-index/*.yaml` corpus; `themeVarying` is carried (semantic tier). The resolved-value triple does not surface `themeVarying` (`get_token_details` returns it independently).
- **O2a (Lina) → folded into Task 4.1.** CONFIRMED: index-freshness approach = pinned fixture corpus (tier/recall) + a lightweight live smoke check (floor-component existence only).
- **O2b (Lina) → folded into Task 2.1.** CONFIRMED: keyword-index signal-class field assignments match the rubric; the indexer must read the real key `when_to_use` (snake_case) / parsed `whenToUse` (`parsers.ts:198` maps `usage.when_to_use → whenToUse`).
- **O3 (Ada) → folded into Task 1.1.** RESOLVED: semantic entries carry no entry-level `value` at runtime (0/193; `value:` only appears nested inside `primitiveReferences`). Action = change `TokenIndexEntry.value: string | number` → `value?: string | number` at `application-mcp-server/src/indexer/TokenIndexer.ts:20` (one-line, type-only, additive; covers semantic + component tiers). The Req 2.4 / P2 "no `value` key" assertion holds as written — **no spec correction needed**.
- **O4 (Thurgood/infra) → folded into Task 5.1 + F2 above.** RESOLVED: docs-domain-owned versioned stop-word module.

---

## Sequencing & Dependency Notes

- **Task 1 before Task 4**: the `value?` type fix (1.1) and the triple (1.3) must exist before the exact-key-set / "no `value` on semantics" assertions (4.2).
- **Task 4.1 (harness) before 4.2–4.5**: the `callTool` harness + fixture split is scaffolding for every contract assertion.
- **Tasks 2 + 5 before 4.3/4.4**: keyword matching (2) and the tier emit (5) must exist before the `find_components` shape and tier-classification assertions can be authored.
- **Task 5.1/5.2 before 5.3**: stop-word module + rubric derivation feed the three-field emit.
- **Task 3.1/3.2 before 3.3**: `find_docs` must fully subsume the map before the map is removed and its test rewritten.
- **Task 3.4 (sweep) after 3.3**: sweep references only once the replacement is real.
- **Task 7.3 (rebuild_index) last** within Task 7: rebuild after all doc edits land.
- **Cross-spec**: Task 5.3's `partial` handoff and Task 6.2's summary-first rule are emitted/encoded here but consumed by 119 (Decision 4a) and 122 respectively — not blockers for 121.
