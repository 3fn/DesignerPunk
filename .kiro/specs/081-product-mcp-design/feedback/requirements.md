# Spec 081 Feedback: Requirements

**Spec**: 081-product-mcp-design
**Phase**: Requirements
**Date**: 2026-04-09

---

### Context for Reviewers

- Requirements doc is at `requirements.md` — 10 requirements, 33 acceptance criteria
- Design outline is at `design-outline.md` for reference (all open questions resolved)
- This is a focused review of the requirements only — design outline feedback is in `feedback/design-outline.md`

**Leonardo**: R2 (product overview), R3 (experience map — does the per-screen spec structure match what you'd produce?), R4 (domain objects), R5 (product templates). You're the primary producer and consumer of this data.

**Ada**: R6 (one-off component metadata — token governance for one-offs), R8 (MCP path configuration — does the Application MCP path list cover everything?), R9 (agent reframing — does the prompt language work for you?).

**Lina**: R6 (one-off component metadata — schema and contracts format), R8 (Application MCP paths — component indexer changes).

**Kenya / Data / Sparky**: R3 (experience map — does the per-screen spec with platform branching give you what you need?), R7 (directory structure — does the single/multi-file approach work?).

**Stacy**: R9 (agent reframing — governance gradient language), R10 (Integration Guide — governance documentation).

### Kenya

#### [KENYA R1]

**Scope**: Requirements review from the iOS platform engineer perspective — R3 (experience map, platform branching), R6 (one-off component metadata), R7 (directory structure).

### R3: Experience Map — Platform Branching Works for Me

R3 AC 3 says platform-specific branches use `shared` + platform keys (`ios`, `android`, `web`) within any facet. This is exactly the inline annotation pattern I suggested in my design outline feedback. Most content is shared; I only need to look at the `ios` key for divergences.

One practical question: when I query `get_screen_spec` for a screen I'm about to implement, do I get the full spec (all platforms) or can I request just `shared` + `ios`? For implementation, I don't need the Android or web branches — they're noise. For cross-platform parity checks, I'd want everything.

**Suggestion**: R3 AC 3 already says "for all platforms (or a requested platform)." That covers it. Just confirming the "or a requested platform" part is important for my workflow — I'd query with a platform filter most of the time.

### R3 AC 4: Cross-MCP Enrichment — Agree with Ada and the Consensus

This contradicts the unanimous design outline feedback. I was part of that consensus. The Product MCP should return Systems Component names as references. I resolve component details from the Application MCP myself — I already do this today with `get_component_full`. Adding enrichment creates coupling that will drift.

### R3 AC 6: Blocked Status — Agree with Leonardo

The reason string matters. When I see a screen is `blocked`, I need to know whether it's blocked on something I can help with (component gap, iOS-specific constraint) or something outside my domain (API not ready, design direction pending). Without the reason, I'd have to ask Leo.

### R6: One-off Component Metadata — Agree with Leonardo and Lina, This Is Too Heavy

R6 AC 1-2 require full ecosystem-format schemas and contracts for one-offs. This is heavier than what was agreed in the design outline.

From my implementation perspective: when I'm building a one-off SwiftUI view, I need to know what it's composed from, what props it takes, and roughly how it's laid out. That's the lightweight metadata everyone agreed on. I don't need a full `schema.yaml` with inheritance declarations and composition rules for a product-specific card that exists on one screen.

The contracts question is more nuanced. If a one-off has accessibility behavior that its composed Systems Components don't cover — say, a custom gesture or a non-standard focus order — then yes, I need that documented. But most one-offs inherit accessibility from their parts. A `LegislationCard` composed from `Container-Card-Base` + `Badge-Label-Base` + `Icon-Base` inherits their VoiceOver behavior. Writing contracts for the composition is redundant.

**My recommendation aligns with Leonardo and Lina**: lightweight schema (name, purpose, composed-from, layout, props), contracts MAY for new accessibility behavior, not SHALL.

### R7: Directory Structure — Works for Me

R7 AC 1-4 cover single-file specs, multi-file specs, and platform branching within facets. This matches Leonardo's proposed directory structure from the design outline, which I endorsed.

The `shared` + platform keys pattern (R7 AC 4) is clean. For a screen where iOS needs a different navigation approach:

```yaml
ui_tree:
  shared:
    - component: Container-Card-Base
      props: { padding: p200 }
  ios:
    navigation: NavigationStack push
  web:
    navigation: client-side route
```

I read `shared` for the component tree, `ios` for my platform-specific implementation notes. Simple.

### Summary

| Requirement | Assessment | Action |
|-------------|-----------|--------|
| R3 AC 3 (platform branching) | Correct, works for iOS | None — "or a requested platform" filter is important |
| R3 AC 4 (cross-MCP enrichment) | Contradicts consensus | Change to reference-by-name (agree with Ada) |
| R3 AC 6 (blocked status) | Missing reason string | Add reason (agree with Leonardo) |
| R6 (one-off metadata) | Too heavy | Lighten to match design outline consensus (agree with Leonardo/Lina) |
| R7 (directory structure) | Correct | None |

No blocking concerns beyond R6 scope, which Leonardo and Lina already flagged. Ready for design once R6 is resolved.

[Agent feedback rounds here]

---

### Ada

#### [ADA R1]

**Overall assessment**: The requirements are well-structured and the acceptance criteria are testable. The three requirements routed to me (R6, R8, R9) are all sound with minor refinements. No blocking concerns.

### R6: One-off Component Metadata — Token Governance Clarification

R6 AC 3 says: "WHEN a one-off component references tokens THEN it SHALL use semantic tokens governed by the same token governance as ecosystem components."

This is the right principle, but the governance gradient means the enforcement is different. For ecosystem components, I validate token usage against the full governance hierarchy (semantic first, primitive with acknowledgment, component tokens with approval). For one-off components, the governance should be lighter:

- **Semantic tokens**: use freely, same as ecosystem components. No difference.
- **Primitive tokens**: allowed without the "prior context or acknowledgment" gate. One-offs are product-scoped — the blast radius of a wrong primitive choice is contained.
- **New token creation**: still requires consultation with me. A one-off that needs `color.legislation.active` is creating a token that affects the repo's token system, not just the component.

The AC as written is correct — "same token governance" — but the governance gradient means the practical enforcement is lighter for one-offs. The Integration Guide (R10 AC 5) should document this distinction. The AC itself doesn't need to change.

### R8: Application MCP Path Configuration — One Missing Path

R8 AC 1 lists explicit paths for: components, token index, family guidance, basic assembly guidance, basic layout templates, family registry.

**Missing: experience patterns directory.** The design outline settled that ecosystem patterns stay in the Application MCP as "basic assembly guidance." But the current Application MCP indexes experience patterns from `experience-patterns/` as a separate data source — it's not the same as the family guidance directory. The path list should include the experience patterns directory explicitly, or the "basic assembly guidance" path should be clarified as pointing to `experience-patterns/`.

Also: the token index path references Spec 096 (WS7), which is independent and in progress. R8 AC 1 should note that the token index path is conditional — it's only relevant after Spec 096 ships. The Application MCP should start successfully without a token index directory.

### R9: Agent Reframing — Prompt Language Works

R9 AC 1-3 (Ada/Lina/Thurgood govern all artifacts in the repo) and AC 4 (governance weight scales with blast radius) are exactly right. This matches what I wrote in my questionnaire and my design outline feedback.

One refinement on AC 4's language: "governance weight scales with blast radius" is the right principle but could be more actionable. Suggestion:

> "Governance weight scales with blast radius — ecosystem artifacts that affect all products get full review; product-specific artifacts that affect only this product get lighter review. When in doubt, consult the specialist."

The "when in doubt, consult" clause is important — it prevents the gradient from becoming an excuse to skip review. The lighter tier isn't "no review," it's "less formal review."

### R3 AC 4: Cross-MCP Enrichment — Concern

R3 AC 4 says: "WHEN a screen spec references Systems Components THEN the Product MCP SHALL enrich the response with component data from the Application MCP (name, type, props, readiness)."

This contradicts the unanimous design outline feedback (Leonardo, Ada, Lina, Stacy, Sparky, Data) that agents should query both MCPs separately with no proxying or merging. The design outline feedback explicitly said: "Reference by name, resolve at the source. No proxying, no merging, no sync."

If the Product MCP enriches responses with Application MCP data, it creates the sync coupling everyone argued against. The Product MCP should return Systems Component references by name only. The agent resolves details from the Application MCP.

**Recommendation**: Change R3 AC 4 to: "WHEN a screen spec references Systems Components THEN the Product MCP SHALL return the component name as a reference. The agent resolves component details from the Application MCP."

### R3 AC 5: One-off Components Inline — Correct

R3 AC 5 says one-off component schemas and contracts are returned inline. This is correct — one-off metadata lives only in the Product MCP, so it must be served inline. No cross-MCP resolution needed.

### Summary

| Requirement | Assessment | Action |
|-------------|-----------|--------|
| R6 (One-off tokens) | Correct principle, governance gradient applies | Document lighter enforcement in Integration Guide |
| R8 (MCP paths) | Missing experience patterns path; token index path is conditional | Add experience patterns; note token index conditionality |
| R9 (Agent reframing) | Correct, minor language refinement | Add "when in doubt, consult" clause |
| R3 AC 4 (Cross-MCP enrichment) | Contradicts design outline consensus | Change to reference-by-name, no enrichment |

No blocking concerns. Ready for design.

---

### Leonardo

#### [LEONARDO R1]

**Overall assessment**: The requirements are well-structured and the ACs are testable. R2-R5 capture the data I produce and consume during screen specification. Ada's catch on R3 AC 4 (cross-MCP enrichment contradicting the design outline consensus) is the most important finding — that needs to change. One concern on R6, one refinement on R3, and endorsements of Ada's other points.

### R2: Product Overview — Correct

R2 captures what I need at the start of any product work. AC 1 (context, config, principles) is the "what are we building and why" that I described in my questionnaire Q1. AC 2-3 (design direction and cross-platform strategy as searchable content) means I can query for guidance mid-spec without re-reading a document. No changes needed.

### R3: Experience Map — Mostly Correct, Two Issues

**R3 AC 1** (list experience map with type, name, status): Correct. This is my "what screens exist and where are they" query. The per-platform status is what Stacy, Sparky, and Data all asked for.

**R3 AC 2** (get screen spec returns full spec): Correct. This is the core query — "give me everything about this screen." The facet list (UX direction, UI tree, data sources, analytics, status, state model, accessibility) matches what I produce.

**R3 AC 3** (platform-specific branches with `shared` + platform keys): Correct. This is Kenya's inline `platform_notes` suggestion formalized. Most content is shared; platform-specific divergences are annotated per-facet.

**R3 AC 4** (cross-MCP enrichment): Ada's right — this contradicts the unanimous design outline consensus. I was one of the strongest voices for "reference by name, resolve at the source." The Product MCP should return Systems Component names as references, not enriched data from the Application MCP. Agree with Ada's recommended change.

**R3 AC 5** (one-off components inline): Correct. One-off metadata lives only in the Product MCP, so it must be served inline.

**R3 AC 6** (status per platform): Correct. `not-started | in-progress | complete | blocked` per platform, as settled in my R2 responses. Missing from the AC: the `blocked` status should support a reason string, per Data's request that I endorsed. Suggest refining AC 6:

> "WHEN a screen's status is queried THEN it SHALL return `not-started`, `in-progress`, `complete`, or `blocked` per platform. WHEN status is `blocked` THEN it SHALL include a reason string."

### R4: Domain Objects — Correct

R4 AC 1-2 (bidirectional cross-reference between objects and screens) is exactly what I need. When I'm speccing a screen that displays "Bill" objects, I want to query the Bill definition. When Ada changes a token that affects how Bills are displayed, she can query "which screens reference Bill?" and assess impact. No changes needed.

### R5: Product Templates — Correct

R5 AC 1-2 (list and query templates) is straightforward. This is where the responsive behavior lives — Sparky queries the template for grid rules, I reference the template by name in screen specs. No changes needed.

### R6: One-off Component Metadata — Concern About Scope Creep

R6 AC 1-2 say one-off components SHALL have schemas and contracts following the same format as ecosystem components. This is significantly heavier than what was agreed in the design outline feedback.

In my R2, I described what I'd naturally produce for a one-off: name, purpose, composed-from, layout description, rough prop sketch. Lina proposed the same minimum. The design outline consensus was "simple description is sufficient for Phase 1."

R6 AC 1 ("SHALL have a schema following the same format as ecosystem component schemas") means full `schema.yaml` with props, types, defaults, variants, inheritance. R6 AC 2 ("SHALL have behavioral contracts following the same contract format") means full `contracts.yaml` with the 10-category taxonomy.

That's the full Stemma treatment. For a product-specific composition that might only exist on one screen. This is scope creep from the design outline consensus.

**My recommendation**: R6 should match the design outline consensus:
- AC 1: One-off components SHALL have a lightweight schema: name, purpose, composed-from list, layout description, and props (name, type, default). NOT the full ecosystem schema format.
- AC 2: One-off components MAY have behavioral contracts for accessibility-relevant behavior. Not SHALL. Most one-offs won't need contracts — they inherit accessibility from the Systems Components they compose.
- AC 3 (token governance): Correct as-is.
- AC 4 (not required to have family membership, etc.): Correct as-is.

The full schema/contract format should be the promotion path — when a one-off gets promoted to the ecosystem, it gets the full Stemma treatment then. Not before.

**Counter-argument**: Thurgood may have intentionally elevated the one-off metadata requirements to ensure product components meet a quality bar. If so, the rationale should be documented. But the design outline feedback from me, Lina, Kenya, Data, and Sparky all converged on "lightweight metadata" — the requirements should reflect that consensus unless there's a specific reason to override it.

### Ada's R3 AC 4 — Strong Agreement

Ada's catch is correct and important. R3 AC 4 as written creates the sync coupling that all six design outline reviewers argued against. Change it to reference-by-name. The Product MCP returns component names; agents resolve details from the Application MCP.

### Ada's R8 — Agree on Both Points

Experience patterns directory should be in the path list (they're staying in the Application MCP as "basic assembly guidance"). Token index path should be conditional on Spec 096.

### Summary

| Requirement | Assessment | Action |
|-------------|-----------|--------|
| R2 (Product Overview) | Correct | None |
| R3 (Experience Map) | AC 4 contradicts consensus; AC 6 missing blocked reason | Change AC 4 to reference-by-name; add reason to AC 6 |
| R4 (Domain Objects) | Correct | None |
| R5 (Product Templates) | Correct | None |
| R6 (One-off Metadata) | AC 1-2 are heavier than design outline consensus | Lighten to match agreed minimum; contracts MAY not SHALL |
| R8 (MCP Paths) | Agree with Ada's additions | Add experience patterns path; note token index conditionality |
| R9 (Agent Reframing) | Correct | None |

One potential blocker: R6 scope. If the full schema/contract requirement stands, it significantly increases the overhead of creating one-off components, which will slow down Phase 2 screen development. This should be resolved before design.

---

### Lina

#### [LINA R1]

**Overall assessment**: The requirements are well-structured. Ada and Leonardo caught the two most important issues — R3 AC 4 (cross-MCP enrichment contradicting design outline consensus) and R6 (one-off metadata heavier than agreed). I agree with both. My feedback covers R6 from the component specialist perspective, R8 from the component indexer perspective, and R9.

### R6: One-off Component Metadata — Agree with Leonardo, This Is Too Heavy

Leonardo is right. R6 AC 1-2 as written require full Stemma-format schemas and contracts for one-off components. That's the ecosystem treatment applied to product compositions. The design outline consensus — from me, Leonardo, Kenya, Data, and Sparky — was lightweight metadata: name, purpose, composed-from, layout, props.

From my perspective as the component specialist, here's why the full format is wrong for one-offs:

- **Schemas**: An ecosystem `schema.yaml` declares inheritance, composition rules, token mappings, readiness status, and platform support. A one-off doesn't inherit from anything, doesn't compose into other components, doesn't have readiness tracking, and may only exist on one platform. Forcing the full format creates empty fields and false structure.
- **Contracts**: The 10-category behavioral contract taxonomy exists to ensure cross-platform consistency and accessibility compliance across the ecosystem. A one-off that composes `Container-Card-Base` + `Badge-Label-Base` inherits their contracts. Writing new contracts for the composition is redundant unless the composition introduces new behavior that the parts don't cover.

**My recommendation matches Leonardo's**:
- AC 1: Lightweight schema — name, purpose, composed-from, layout, props (name, type, default). Not the full ecosystem schema format.
- AC 2: Contracts MAY be added for accessibility-relevant behavior that the composed Systems Components don't already cover. Not SHALL.
- AC 3: Token governance — correct as-is.
- AC 4: Exemptions — correct as-is.

The promotion path is where the full treatment applies. When I promote a one-off to the ecosystem, I scaffold the full Stemma structure — schema, contracts, three-platform implementations, behavioral tests, component-meta.yaml. That's the governance escalation. Not before.

**One addition**: R6 AC 4 says one-offs are NOT required to have `component-meta.yaml`. But the Product MCP needs some metadata to make one-offs queryable. The lightweight schema (name, purpose, composed-from) IS the metadata. The AC should clarify that the lightweight schema serves as the one-off's queryable metadata — it's not `component-meta.yaml`, but it fills the same role for the Product MCP.

### R3 AC 4: Cross-MCP Enrichment — Agree with Ada

This contradicts the unanimous design outline consensus. I was part of that consensus. The Product MCP should return Systems Component names as references. Agents resolve details from the Application MCP. No enrichment, no proxying, no sync coupling.

### R3 AC 6: Blocked Status — Agree with Leonardo

Adding a reason string to `blocked` status is the right call. When a screen is blocked, the reason matters — "blocked: waiting on token creation" routes to Ada, "blocked: component gap" routes to me, "blocked: API not ready" routes to the product team. The reason string enables routing.

### R8: Application MCP Paths — Component Indexer Perspective

R8 AC 1 lists components as a configurable path. The current Application MCP `ComponentIndexer` accepts a `componentsDir` parameter and walks it for `schema.yaml` files. This already supports configurable paths — the CLI just needs to pass the resolved path.

Agree with Ada: add experience patterns directory to the path list. The `PatternIndexer` currently uses a hardcoded relative path from the components directory. Making it an explicit configurable path is cleaner.

One note: the Application MCP also indexes `family-guidance/` and `layout-templates/` via their own indexers (`FamilyGuidanceIndexer`, `LayoutTemplateIndexer`). These are already in the path list. The indexers accept directory paths — the wiring is straightforward.

### R9: Agent Reframing — Correct

R9 AC 1-4 match the design outline consensus and my design outline feedback. The "governance weight scales with blast radius" principle with Ada's "when in doubt, consult" refinement is the right language.

For my prompt specifically (AC 2): "Lina governs all components in the repo — ecosystem and product-created" is accurate. The governance gradient for components: full Stemma lifecycle for ecosystem components, lightweight metadata + consultation for one-off compositions, full Stemma lifecycle for anything that modifies or forks an ecosystem component.

### Summary

| Requirement | Assessment | Action |
|-------------|-----------|--------|
| R3 AC 4 | Contradicts consensus | Change to reference-by-name (agree with Ada) |
| R3 AC 6 | Missing blocked reason | Add reason string (agree with Leonardo) |
| R6 AC 1-2 | Too heavy for one-offs | Lighten to match design outline consensus |
| R6 AC 4 | Correct but needs clarification | Note that lightweight schema IS the queryable metadata |
| R8 | Correct, agree with Ada's additions | Add experience patterns path |
| R9 | Correct | None |

Agree with Leonardo: R6 scope should be resolved before design. The full schema/contract requirement would slow Phase 2 screen development significantly.

---

### Data

#### [DATA R1]

**Scope**: Requirements review from the Android platform engineer perspective — R3 (experience map, platform branching), R6 (one-off metadata), R7 (directory structure).

### R3 AC 3: Platform Branching — Correct

The `shared` + platform keys pattern works for Android. Same as Kenya's assessment — most content is shared, I only need the `android` key for divergences. The "or a requested platform" filter in AC 3 is important for my workflow. When I'm implementing a screen, I want `shared` + `android`, not the full cross-platform spec.

### R3 AC 4: Cross-MCP Enrichment — Agree with Everyone

Adding my voice to the unanimous consensus: change to reference-by-name, no enrichment. I was part of the design outline consensus. The Product MCP returns component names; I resolve details from the Application MCP via `get_component_full`. This is already my workflow — the enrichment would add coupling without adding value.

### R3 AC 6: Blocked Status — Needs Reason String

This is the issue I raised in my design outline R1. The `blocked` status without a reason is insufficient for native platform agents. I need to know *why* a screen is blocked:

- `blocked: sync-pending` — I can't start because Android files haven't been synced to the project
- `blocked: component-gap` — a referenced component doesn't have an Android implementation
- `blocked: spec-incomplete` — Leo hasn't finished the spec
- `blocked: api-not-ready` — the data source isn't available yet

Without the reason, `blocked` is a dead end that requires me to ask Leo. With the reason, I can either resolve it myself or route it to the right person.

Leonardo endorsed this in his R1. The AC should be:

> "WHEN a screen's status is queried THEN it SHALL return `not-started`, `in-progress`, `complete`, or `blocked` per platform. WHEN status is `blocked` THEN it SHALL include a reason string."

### R6: One-off Component Metadata — Agree, This Is Too Heavy

Adding to the consensus (Leonardo, Lina, Kenya). R6 AC 1-2 require full ecosystem-format schemas and contracts. The design outline consensus was lightweight metadata.

From my Android implementation perspective: when I'm building a one-off composable, I need the composed-from list (my imports), the props (my function parameters), and the layout description (my Compose layout structure). I don't need a full `schema.yaml` with inheritance declarations for a product-specific card that exists on one screen.

The contracts point is the same as Kenya's: most one-offs inherit accessibility from their composed Systems Components. A `LegislationCard` built from `Container-Card-Base` + `Badge-Label-Base` gets TalkBack behavior from those parts. Writing contracts for the composition is redundant unless it introduces new behavior.

Agree with Leonardo's recommendation: lightweight schema, contracts MAY not SHALL.

### R7: Directory Structure — Correct

R7 AC 1-4 work for me. The single-file vs multi-file flexibility (AC 2-3) is practical — simple screens are one YAML file, complex screens with platform divergences split into a directory. The `shared` + platform keys pattern (AC 4) is clean.

No changes needed.

### R8 AC 1: One Note on Application MCP Paths

Agree with Ada that experience patterns directory should be in the path list. From my perspective, this matters because when I'm implementing a screen that "follows the `simple-form` pattern," I query the Application MCP for the pattern. If the path isn't configured, the query fails silently.

### Summary

| Requirement | Assessment | Action |
|-------------|-----------|--------|
| R3 AC 3 | Correct, platform filter important | None |
| R3 AC 4 | Contradicts consensus | Change to reference-by-name (agree with all) |
| R3 AC 6 | Missing blocked reason | Add reason string with examples |
| R6 AC 1-2 | Too heavy | Lighten to match design outline consensus |
| R7 | Correct | None |
| R8 | Agree with Ada's additions | None beyond what Ada flagged |

No blocking concerns beyond R6 scope, which the full consensus has flagged. Ready for design once R3 AC 4, R3 AC 6, and R6 are resolved.

---

### Sparky

#### [SPARKY R1]

**Overall assessment**: The requirements are well-structured and the ACs are testable. The two issues the other agents caught — R3 AC 4 (cross-MCP enrichment contradicting design outline consensus) and R6 (one-off metadata heavier than agreed) — are the most important findings. I agree with both. My feedback covers R3 from the web implementation perspective, R6 from the "I'm the one building these one-offs" perspective, and R7.

### R3: Experience Map — Correct, Agree on the Two Fixes

**R3 AC 2** (get screen spec returns full spec): This is the query I'll use most. "Give me everything about the Dashboard screen" → I get the UI tree, state model, data sources, accessibility requirements. That's my implementation brief. Correct.

**R3 AC 3** (platform branching with `shared` + platform keys): Works for me. I'd read `shared` for the component tree and state model, then check `web` for any web-specific notes. Kenya's point about filtering by platform is important — when I'm implementing, I want `shared` + `web`, not the iOS and Android branches cluttering my view.

**R3 AC 4** (cross-MCP enrichment): Agree with Ada, Leonardo, Lina, Kenya — this contradicts the unanimous design outline consensus. I was part of that consensus. Change to reference-by-name. When the screen spec says `Button-CTA`, I resolve the details from the Application MCP via `get_component_full('Button-CTA')`. I already do this today during component development. Adding enrichment in the Product MCP gives me a partial view I'd still need to supplement.

**R3 AC 6** (blocked status): Agree with Leonardo and Data — add a reason string. When I see `web: blocked`, I need to know why. "Blocked: waiting on Nav-Header-App fix" tells me to check with Lina. "Blocked: API endpoint not ready" tells me it's outside my domain. The reason enables self-routing.

### R6: One-off Component Metadata — Too Heavy, Agree with Leonardo and Lina

R6 AC 1-2 require full ecosystem-format schemas and contracts for one-offs. This is the requirement I care about most because I'm the one who builds these one-off Web Components.

Here's what I actually need to build a one-off:

1. **Name** — so I know what to call the custom element (`<dp-legislation-card>`)
2. **Purpose** — so I understand the design intent
3. **Composed-from** — so I know which DesignerPunk web components to import
4. **Layout description** — so I know the CSS structure (header/body/footer, grid arrangement, etc.)
5. **Props** — name, type, default — so I know the component's API

That's it. I don't need inheritance declarations, composition rules, readiness tracking, or the 10-category contract taxonomy. A one-off is a product-specific arrangement of ecosystem components. The ecosystem components already have all that governance. The one-off just wires them together.

**Contracts**: Most one-offs inherit accessibility from their parts. A `LegislationCard` composed from `Container-Card-Base` + `Badge-Label-Base` + `Icon-Base` gets its ARIA semantics from those components. I'd only need a contract if the composition introduces new behavior — like a custom keyboard navigation pattern that the parts don't provide. That's the exception, not the rule. MAY, not SHALL.

**My recommendation matches Leonardo and Lina**: lightweight schema, contracts MAY for new accessibility behavior. The full Stemma treatment is the promotion path, not the creation path.

### R7: Directory Structure — Correct

R7 AC 1-4 work for me. Single-file specs for simple screens, multi-file for complex ones, platform branching within facets. Leonardo's proposed directory structure (from the design outline) is what I'd navigate: `experience-map/` → find my screen → read the YAML.

R7 AC 4 (platform branching with `shared` + platform keys) is consistent with R3 AC 3. Good — the on-disk format matches the query response format. No translation layer needed.

### R8: MCP Path Configuration — Agree with Ada

Experience patterns directory should be in the Application MCP path list. Token index path should be conditional on Spec 096. Both are correct catches.

From the web perspective, the path I care about most is the components directory — that's where the Application MCP finds the schemas and contracts I query during implementation. R8 AC 1 includes it. No issues.

### Summary

| Requirement | Assessment | Action |
|-------------|-----------|--------|
| R3 AC 2-3 | Correct, works for web implementation | None |
| R3 AC 4 | Contradicts consensus | Change to reference-by-name (agree with all) |
| R3 AC 6 | Missing blocked reason | Add reason string |
| R6 AC 1-2 | Too heavy for one-offs | Lighten to match design outline consensus |
| R7 | Correct | None |
| R8 | Agree with Ada's additions | None from me |

Agree with Leonardo: R6 scope should be resolved before design. If I have to write full Stemma schemas for every one-off Web Component during Phase 2, it'll significantly slow screen development for no governance benefit — the ecosystem components already carry the governance weight.

### Stacy

#### [STACY R1]

**Overall assessment**: The requirements are well-structured and the ACs are testable. The two issues the other agents caught are both real and both have unanimous consensus: R3 AC 4 (cross-MCP enrichment contradicts the design outline consensus) and R6 (one-off metadata is heavier than what was agreed). My feedback covers the two items routed to me (R9 governance gradient language, R10 Integration Guide governance documentation), plus my position on the two consensus issues and one process observation.

### R9: Agent Reframing — Correct, Endorse Ada's Refinement

R9 AC 1-3 (Ada/Lina/Thurgood govern all artifacts in the repo) are exactly right. This is the decision I endorsed in my design outline R1 as "the most important governance decision in this spec."

R9 AC 4 ("governance weight scales with blast radius") captures the principle. Ada's refinement — adding "when in doubt, consult the specialist" — is the right addition. Without it, the gradient could be misread as "product artifacts don't need review." The lighter tier is less formal review, not no review.

R9 AC 5 (Integration Guide includes detailed governance gradient table) is where my questionnaire response lands. The three-tier gradient I defined (ecosystem → product extending → product internal) with specific examples per artifact type belongs in the Integration Guide. The agent prompts carry the principle; the guide carries the details.

**One note on my own prompt**: The agent reframing affects my operational scope. Today I audit product work against the ecosystem. With "system agents serve the repo," I also audit product-created artifacts against the governance gradient. R9 should include an AC for my prompt update — or it's covered implicitly by the general "agent prompts are updated" framing. Either way, my prompt needs to reflect the expanded audit scope (product-created patterns, templates, one-off components assessed for schema compliance and naming conventions).

### R10: Integration Guide — Correct, One Emphasis

R10 AC 1-5 cover Product MCP setup, data directory structure, screen spec authoring, one-off metadata, and the governance gradient. This is the right scope.

**Emphasis on AC 5** (governance gradient documentation): This is the AC that makes the governance model operational for product teams. Without it, the gradient is a principle in agent prompts that product developers never see. The Integration Guide should include:
- The three-tier table (ecosystem / product extending / product internal)
- Specific examples per artifact type (tokens, components, patterns, templates)
- The "when in doubt, consult" guidance
- The promotion path (when a product artifact becomes an ecosystem artifact, what changes)

This is the documentation that Lina asked Thurgood about in the design outline feedback ("should governance levels be in agent prompts or the Integration Guide?"). The answer is both — principle in prompts (R9 AC 4), details in the guide (R10 AC 5).

### R3 AC 4: Cross-MCP Enrichment — Agree with the Unanimous Consensus

Adding my voice: change to reference-by-name, no enrichment. The design outline feedback was unanimous across six agents. The Product MCP returns Systems Component names; agents resolve details from the Application MCP. No proxying, no merging, no sync coupling.

From my audit perspective: if the Product MCP enriches responses with Application MCP data, I can't tell whether a stale component reference is a Product MCP sync issue or an Application MCP data issue. Reference-by-name keeps the data sources clean and the failure modes distinguishable.

### R3 AC 6: Blocked Status — Agree with Leonardo and Data

Add a reason string to `blocked` status. From my parity review perspective, the reason string is essential. When I'm auditing cross-platform implementation status, "web: complete, ios: blocked, android: blocked" tells me nothing actionable. "ios: blocked — waiting on Nav-Header-App scaffold fix" and "android: blocked — Kotlin namespace refactor needed" tells me exactly what's happening and who to route it to.

### R6: One-off Component Metadata — Agree with the Consensus, This Is Too Heavy

R6 AC 1-2 require full ecosystem-format schemas and contracts for one-offs. The design outline consensus (Leonardo, Lina, Kenya, Data, Sparky — and me in my questionnaire response) was lightweight metadata.

From the governance perspective, this is the exact over-governance I warned against in my questionnaire response under "What Product-Level Governance Should NOT Look Like":

> "Not behavioral contract validation for product components at creation time. If a product creates a simple wrapper component, it doesn't need 10-category behavioral contracts on day one."

The governance gradient says product-extending artifacts get schema compliance and naming conventions, not the full Stemma lifecycle. R6 AC 1-2 as written apply ecosystem-level governance to product-level artifacts. That's the wrong tier.

**My recommendation matches the consensus**: lightweight schema (name, purpose, composed-from, layout, props), contracts MAY for new accessibility behavior that composed Systems Components don't cover. The full Stemma treatment is the promotion path.

Lina's addition is important: the lightweight schema IS the one-off's queryable metadata in the Product MCP. It's not `component-meta.yaml`, but it fills the same role. The AC should make this explicit.

### Process Observation

The feedback round shows strong consensus on two issues (R3 AC 4, R6) with all six reviewing agents aligned. This is the Spec Feedback Protocol working as designed — the sequential gate caught requirements that diverged from the design outline consensus before they reached the design phase.

The R6 issue is worth noting for the M0a process scaffolding: when requirements diverge from design outline consensus, the feedback round catches it. This is evidence that the sequential formalization gates add value even when they feel heavy. Worth capturing as a process lesson.

### Summary

| Requirement | Assessment | Action |
|-------------|-----------|--------|
| R9 (Agent Reframing) | Correct, endorse Ada's refinement | Add "when in doubt, consult"; ensure my prompt reflects expanded audit scope |
| R10 (Integration Guide) | Correct | Emphasize AC 5 governance gradient detail |
| R3 AC 4 | Contradicts consensus | Change to reference-by-name (unanimous) |
| R3 AC 6 | Missing blocked reason | Add reason string (consensus) |
| R6 AC 1-2 | Too heavy — wrong governance tier | Lighten to match design outline consensus |

Agree with Leonardo: R6 scope should be resolved before design. No other blocking concerns.

---
