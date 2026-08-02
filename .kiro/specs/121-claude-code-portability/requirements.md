# Requirements Document: MCP Delivery-Layer Hardening (121)

**Date**: 2026-06-22
**Spec**: 121 — MCP Delivery-Layer Hardening (formerly "121-A"; see Spec Structure note)
**Status**: Requirements Phase — **v2** (incorporates Round-1 domain feedback: Ada R1, Lina R1; Peter's Resolved Decisions 2026-06-22)
**Dependencies**: None (no-regret spine — additive to both MCPs; improves Kiro today independent of any migration)
**Downstream consumers**: Spec 119 (steering progressive disclosure) consumes the discovery + section-addressing fixes; Spec 122 (agent generator) benefits from discovery; Spec 119's Documentation-Directory decision is amended by Requirement 1 (see Decision 4 in the design outline). Spec 123 (consumer distribution) inherits the dp-portfolio sync-refresh watch item flagged under Requirement 4.

---

## Introduction

This spec hardens the MCP delivery layer that serves DesignerPunk's governance and component/token context to agents across tools (Kiro today, Claude Code and others under evaluation). A live portability dry-run (Spec 119 investigation; Findings 1–12) and a consumer-install dry-run + MCP test-coverage audit (Spec 121 investigation; F-C1–F-C6, G6, gap H1) established that **every real delivery-layer problem lives in the MCP servers, not in agent behavior**. Agent judgment, boundaries, candor, and retrieval-by-known-identifier all port intact. The single systemic weakness is **discovery by concept/keyword** — agents cannot reliably find context they cannot already name — across *both* the docs MCP and the application MCP (Findings 11 + 12).

This spec turns that evidence into buildable, testable work. It covers four delivery-layer fixes plus a test-coverage hardening requirement, all governed by a hard **additive / backward-compatible** constraint: no change here may break an existing MCP response shape that current tests, current Kiro agents, or installed consumers depend on — **with exactly one justified exception**: superseding `get_documentation_map` with `find_docs` (Requirement 4), which is breaking-but-justified because the map is redundant once `find_docs` exists and has no consumer *code* coupling (Resolved Decisions 1 and 5).

**Scope discipline (evidence before ceremony):** This spec covers only what the two dry-runs made known. The agent generator (Spec 122) and consumer distribution (Spec 123) are separate specs with their own dependencies (notably Spec 118). Live customer-facing bugs surfaced by the consumer dry-run (F-C1/F-C2/F-C6) are out of scope here — they are patch-release fixes, not gated behind this spec (F-C1 is already resolved in 12.0.5).

**Cross-domain ownership:** Requirements 2 and 3 touch contracts owned by Ada (token-detail shape) and Lina (`find_components`/`ApplicationSummary` shape, application tool-boundary test). Round-1 domain review has now set the precise contracts (Ada: the resolved-value triple + null-contract; Lina: tokenized matching, indexed field set, new-param routing, `ApplicationSummary` unchanged). Those contracts are adopted into the criteria below; remaining format-level calls stay flagged to the owning domain.

---

## Requirements

### Requirement 1: Concept/Keyword Discovery Across Both MCPs

**User Story**: As an agent serving a cross-cutting or exploratory request, I want to discover relevant docs and components by concept or natural-language keyword (not just by exact filename or taxonomy), so that I can find context I cannot already name without falling back to raw grep and diligence-dependent false-positive filtering.

**Context**: Findings 11 + 12 — the single systemic gap. `get_documentation_map` exists but is unusable at scale (Finding 10), there is no `find_docs`, and `find_components` matches structured taxonomy only, returning `data: []` for natural-language queries (`"login"`, `"text input field"`, `"primary action button"`) when matching components demonstrably exist. **Root cause (Lina R1):** the `context` filter is an **exact array match**, and the query terms agents actually use (e.g. "login") live in `when_to_use`, which is **not indexed**. This is a missing-index problem, not missing data — which validates the auto-index-first model (Resolved Decision 3). Per Resolved Decision 3, the `find_components` index is **hybrid, auto-index-first**: derived from existing metadata, with an optional `aliases:` field added reactively only where real query terms diverge.

> **Tokenized matching is the load-bearing requirement (Lina R1, P0).** A query like `"primary action button"` is **unsatisfiable under substring matching** no matter how many fields are added to the index. This requirement therefore mandates **tokenized term matching** explicitly, so design.md cannot satisfy the field-coverage letter (indexing the right fields) while still returning `[]` due to substring semantics.

#### Acceptance Criteria

1. WHEN an agent calls `find_docs({ concept })` on the docs MCP THEN the MCP SHALL return a list of matching documents, each entry containing at minimum the document path, an approximately 50-token summary, and the owning domain/agent, ranked by keyword/description match.
2. WHEN `find_docs` is called with a concept that matches no document THEN the MCP SHALL return an empty result set with an explicit "no matches" indication (not an error and not a silent empty payload that reads as a tool failure).
3. WHEN the `find_components` keyword index is built THEN it SHALL match query terms via **tokenized term matching** (term-level, not substring), such that multi-word natural-language queries (e.g. `"primary action button"`) are matchable — substring-only matching SHALL NOT satisfy this requirement.
4. WHEN the `find_components` keyword index is built THEN it SHALL index, at minimum, these fields: `purpose`, `description`, **`when_to_use`** (currently ignored, highest-value), tokenized `name`, tokenized `family`, `contexts`, `alternatives[].reason`, and contract concept/category names. It SHALL **exclude `when_not_to_use`** (negative-signal trap; Lina R1, Q1).
5. WHEN keyword discovery is exposed on `find_components` THEN it SHALL ride a **new optional parameter** (free-text keyword discovery), AND it SHALL NOT mutate the existing exact-match semantics of `context`, `concept`, or `category` (back-compat — existing callers rely on those; Lina R1, P0).
6. WHEN an agent calls `find_components` with the new keyword parameter using a natural-language value from the dry-run fixture set THEN the MCP SHALL return at least the components the dry-run identified as correct matches (see acceptance fixture set below), rather than `data: []`.
7. WHEN `find_components` returns keyword-discovery results THEN it SHALL return the existing `ApplicationSummary` shape **unchanged** (consumers depend on it; back-compat), optionally augmented with a `matchedOn` field (auditability) and supporting optional `limit`/ranking. The result SHALL NOT be a thinned shape.
8. WHEN the `find_components` keyword index is built THEN it SHALL be auto-derived from existing component metadata (the fields in criterion 4) without requiring hand-curated keyword lists (Resolved Decision 3).
9. IF a real query term diverges from auto-derived metadata (true synonym divergence, e.g. select/dropdown, toast/snackbar, modal/dialog) THEN the index SHALL support an optional `aliases:` field to capture that term reactively, AND the absence of `aliases:` SHALL NOT prevent auto-derived matching.
10. WHEN `find_docs` or keyworded `find_components` returns results THEN each result SHALL be retrievable in a single subsequent call (the returned path resolves via `get_section`/`get_document_summary`; the returned component name resolves via `get_component_summary`) — discovery and retrieval compose without an intermediate lookup step.

**Scope (Resolved Decision 2): COMPONENTS-ONLY.** `find_components` keyword discovery covers components only. Experience patterns (e.g. `simple-form`) live in a separate index and are **not reachable** via `find_components`; cross-indexing them would be a breaking shape change and is explicitly out of scope here.

**Acceptance Fixture Set (corrected per Lina R1 — pin these):**

| Query | MCP | Tool | Must return (non-empty, recall floor) |
|---|---|---|---|
| `concept: "RTL"` / `"internationalization"` | docs | `find_docs` | `Web-Authoring-Standards.md`, `Component-Family-Form-Inputs.md` |
| `concept: "spec planning"` / `"EARS"` | docs | `find_docs` | `Process-Spec-Planning.md` |
| keyword: `"login"` | application | `find_components` | hard floor `Input-Text-Email`; expect `Input-Text-Password` + `Button-CTA` once `when_to_use` is indexed |
| keyword: `"text input field"` | application | `find_components` | the four `Input-Text-*` (family **`FormInput`**), min `Input-Text-Base` |
| keyword: `"primary action button"` | application | `find_components` | `Button-CTA` |

> Fixture corrections from v1 (Lina R1): there is **no "Input-Text" family** — the family is **`FormInput`**; `simple-form` is removed (unreachable via `find_components` per components-only scope); the `"login"` floor is `Input-Text-Email` (provable now), with Password + Button-CTA expected once `when_to_use` is indexed.

> **Counter-argument (Decision 2 trade-off):** "relevant" for keyword discovery is non-trivial — tokenized keyword matching can still produce false positives that re-create the diligence problem from the other direction. The mitigation (and explicit scope boundary) is to start with tokenized keyword + metadata-field matching and **defer semantic/embedding ranking** to a later spike. The fixture criteria are a *recall floor* (the known-good matches must appear), not a precision ceiling. If early measurement shows precision is poor, that is a signal to revisit ranking — not a reason to block this requirement.

---

### Requirement 2: Token-Detail Retrieval Chain-Resolves to Terminal Value (Additive)

**User Story**: As an agent consuming a token via MCP under the "delivery via MCP" model, I want `get_token_details` to **chain-resolve semantic/component tokens to their terminal value** (primitives already carry `value`; semantics carry only `primitiveReferences` and no `value`), so that I spend fewer steps chasing semantic→primitive resolution and reading generated token files for selection — while understanding that the authoritative runtime value still lives in the shipped `dist/DesignTokens.*` artifacts.

**Context**: Finding 9, **reframed by Ada R1 (P0)**. The v1 framing ("add a resolved-value field") mis-stated the gap: resolved value isn't uniformly missing — *primitives* already carry `value`; *semantics* carry only `primitiveReferences` and **no `value` key at all**. The real fix is **chain-resolving** semantics/component tokens down to their terminal value, reusing the product MCP's existing `TokenRefResolver` logic (`product-mcp-server/src/indexer/TokenRefResolver.ts`). This adopts the product MCP's existing contract **verbatim**, which kills cross-MCP drift by construction (no new vocabulary).

> **Domain ownership (Ada R1, decisions adopted):**
> - Adopt the product MCP's existing triple verbatim: **`resolvedValue: number|string|null`**, **`resolvedUnitType: string|null`**, **`resolutionDepth: 'full'|'partial'|null`**. Reuse `TokenRefResolver`'s null-contract.
> - **Null-contract semantics:** primitive → own value / `full`; single resolvable ref → terminal value / `full`; multi-ref, literal, or unresolvable → self-name / `partial`; no-ref-no-value → `null`.
> - **Do NOT add a `{platform}Accessor` field (P1, dropped).** The existing `platforms{web,ios,android}` object already *is* the identifier set; parallel scalar accessors duplicate and drift. "Accessor" is the wrong concept — the stored value is a reference *fragment* (theme-namespaced for theme-varying tokens). Keep `platforms{}` as-is.
> - **G6 (code-reference/import form): DEFERRED** (Resolved Decision 3). Naive `var(--x)` / `DesignTokens.x` templates emit WRONG code for theme-varying tokens (resolved via theme providers). Revisit in design.md, scoped to non-theme-varying tokens only + a `themeAccess` hint — **not a requirement in this spec.**

#### Acceptance Criteria

1. WHEN an agent calls `get_token_details` for a token THEN the response SHALL include the resolved-value triple **`resolvedValue`**, **`resolvedUnitType`**, and **`resolutionDepth`** IN ADDITION TO the existing `platforms{}` identifier object, which SHALL remain unchanged.
2. WHEN the token is a primitive THEN `resolvedValue` SHALL be the token's own value and `resolutionDepth` SHALL be `full`. WHEN the token is a semantic/component token with a single resolvable reference THEN `resolvedValue` SHALL be the chain-resolved terminal value and `resolutionDepth` SHALL be `full`.
3. WHEN the token's value is a multi-reference, a literal, or otherwise unresolvable to a single terminal value THEN `resolvedValue` SHALL be the token's self-name and `resolutionDepth` SHALL be `partial`. WHEN the token has neither a resolvable reference nor a value THEN `resolvedValue` SHALL be `null` and `resolutionDepth` SHALL be `null`.
4. WHEN `get_token_details` is called by an existing consumer that does not read the new fields THEN the pre-existing response shape SHALL remain unchanged and existing assertions SHALL continue to pass (additive, backward-compatible — hard constraint). In particular, semantic tokens SHALL continue to carry **no `value` key**.
5. WHEN the resolved-value triple is exposed THEN it SHALL use the product MCP's existing field names and null-contract verbatim (single coherent cross-MCP contract; no divergent third shape).
6. WHEN the resolved value is documented THEN the docs SHALL state the rule **"always read `resolutionDepth` before trusting `resolvedValue`"** (because `partial` overloads `resolvedValue` with the self-name), AND SHALL accurately represent that the authoritative runtime value is the shipped `dist/DesignTokens.*` artifact (per G6) — the docs SHALL NOT claim the MCP eliminates the need to reference shipped token files.

---

### Requirement 3: Application-MCP Tool-Boundary Contract Test

**User Story**: As the governance steward verifying the additive guarantee, I want the application MCP's tool-boundary layer to be covered by an end-to-end contract test exercised through `callTool(...)`, so that "additive = safe / breaking = loud" for `get_token_details` and `find_components` is *enforced* rather than *inferred*.

**Context**: Test-coverage audit (gap H1). "Both MCPs already covered" is true for the docs MCP but **overstated for the application MCP**: no test imports `application-mcp-server/src/index.ts` (the response-assembly/registration layer), so the emitted shape of `get_token_details` and `find_components` is not enforced end-to-end. On the application side, the additive guarantee is currently **aspirational**. Round-1 review (Ada + Lina) set the exact shape of this test. The docs MCP audit also noted one vacuous integration assertion (`get_section` under `if (!isError)`); worth flagging but the docs side is otherwise covered.

> **Domain ownership:** The `find_components`/`ApplicationSummary` portion is Lina's; the `get_token_details` portion is Ada's. This requirement establishes that the test MUST exist, MUST run through `callTool(...)`, and what it MUST enforce; the specialists author the component-side and token-side assertions.

#### Acceptance Criteria

1. WHEN the application-MCP test suite runs THEN it SHALL exercise the tool-boundary layer through **`callTool('get_token_details', ...)`** and **`callTool('find_components', ...)`** end-to-end (not the underlying QueryEngine/indexer directly).
2. WHEN `get_token_details` is invoked through `callTool` THEN a contract test SHALL assert its full emitted response shape using **tier-aware full-shape fixtures** — primitive, semantic (theme-varying), component, `partial`, `null`, and not-found — including the Requirement 2 resolved-value triple, AND SHALL assert an **exact key-set** (so additive = enforced, not inferred), AND SHALL pin that **semantic tokens carry no `value` key**.
3. WHEN `find_components` is invoked through `callTool` THEN a contract test SHALL lock the full emitted **`ApplicationSummary`** shape, AND SHALL assert a **recall-floor `must-include`** per the corrected fixture set (Requirement 1), AND SHALL assert an empty query returns **`{ data: [], error: null }`**, AND SHALL cover **conjunctive narrowing** and **discovery→retrieval composition**. It SHALL NOT pin result ordering unless ranking is implemented.
4. IF a future change alters an existing field of either tool's emitted shape THEN the contract test SHALL fail (so a breaking change is loud, not silent).
5. WHEN this requirement is satisfied THEN the additive guarantee for the application MCP SHALL be enforced by test, such that Requirement 2's backward-compatibility claim is verifiable rather than aspirational.
6. WHEN the discovery confidence model (Requirement 6) is tested THEN the contract test SHALL be driven by the **calibration fixtures** (`discovery-confidence-rubric.md`; Requirement 6 criterion 7) and SHALL assert, per fixture: (a) the expected **`matchConfidence` tier** (`strong | partial | none`); (b) that the **three layers are present as distinct fields** — `matchConfidence` (Layer 1), the **viability** signal (Layer 2: readiness / placeholder-deprecated; tokens' `resolutionDepth`), and **rank/order** (Layer 3) — not collapsed; (c) that a **weak-match fixture** (`partial` — plausible below-threshold candidates, no `strong` match) returns **ranked below-threshold candidates flagged with their tier** (NOT an empty result); and (d) that a **genuinely-empty fixture** (`none`) returns the empty contract (`find_components` → `{ data: [], error: null }`; `find_docs` → its empty/"no matches" equivalent). The `partial` and `none` cases SHALL be distinguishable from response shape alone (Requirement 6, criterion 1 / the §Collision distinct-fields rule). This applies to **both** `find_docs` (docs MCP) and `find_components` (application MCP).

---

### Requirement 4: Supersede `get_documentation_map` with `find_docs` (Justified Break)

**User Story**: As an agent discovering what docs exist across all domains, I want a single discovery tool (`find_docs`) that covers both concept-search and a paginated list/catalog mode, so that the cross-domain index returns within token limits and I am not maintaining two divergent discovery surfaces.

**Context**: Finding 10 — `get_documentation_map()` errored at ~78K chars, exceeding the token limit, breaking the progressive-disclosure discovery story. **Resolved Decision 1: SUPERSEDE the map with `find_docs`** (breaking — justified). Evidence: the only consumer, dp-portfolio (`@3fn/core@12.0.5`), references the map **only in doc/config/prompt artifacts** (`mcp.json` `autoApprove`, `thurgood-prompt.md`, ~5 steering docs) — **no code dependency** — and those refresh on upgrade + `sync`. Per Resolved Decision 5, additive remains the default everywhere else; this is the **one** justified break (redundant-once-replaced + no code coupling), and the Requirement 3 contract-test guard is still built so future changes are deliberate.

> **Why supersede, not additive (resolved):** Keeping a known-unusable-at-scale full-map tool around is debt, and `find_docs` (Requirement 1) makes it redundant. Paying the supersede cost once is cleaner than maintaining two discovery surfaces, and the evidence shows zero consumer *code* coupling. This was the v1 "EXPLICIT DECISION POINT" — now resolved to path (b).

#### Acceptance Criteria

1. WHEN `find_docs` is delivered THEN it SHALL cover **both** (i) concept/keyword search (Requirement 1) AND (ii) a **paginated list/catalog mode** that enumerates the full set of documents across all domains through a bounded sequence of calls — such that `find_docs` fully subsumes `get_documentation_map`'s capability.
2. WHEN the documentation catalog is requested via `find_docs` list/catalog mode THEN every response SHALL return within the MCP token limit (no oversized-payload error) for the current corpus and with headroom for growth.
3. WHEN `find_docs` subsumes the map THEN `get_documentation_map` SHALL be **removed/deprecated** AND its existing pinned shape tests SHALL be **rewritten** to target `find_docs` (the supersede is explicit; the pinned tests SHALL NOT be silently mutated). The change SHALL be recorded in `MCP-Evolution-Roadmap.md` with the deprecation rationale.
4. WHEN the supersede lands THEN the first-party references to `get_documentation_map` in this repo SHALL be swept to point at `find_docs` (Thurgood's cross-surface-consistency remit) across the **verified canonical sweep set enumerated in tasks.md Task 3.4 (authoritative)**: the 5 steering docs (`00-Steering Documentation Directional Priorities.md`, `Component-Quick-Reference.md`, `MCP-Relationship-Model.md`, `DesignerPunk-Integration-Guide.md`, `component-mcp-query-guide.md`), the Thurgood agent prompt (`.kiro/agents/thurgood-prompt.md`, `.claude/agents/thurgood.md`, `product-template/agents/thurgood-prompt.md`), and the two real MCP configs' `autoApprove` lists (`.kiro/settings/mcp.json`, `.cursor/mcp.json`). The additional `get_documentation_map` hits in `.claude/agents/{ada,lina,data}.md` are disposable ports regenerated by Spec 122's generator and are NOT manual 121 sweep targets. (Note: `DesignerPunk-Integration-Guide.md` is in the sweep set only because it *references* `get_documentation_map` — a retarget, not a 121 content update; its content updates are Spec 123 scope.)
5. WHEN this requirement is delivered THEN design.md SHALL document the supersede path and its rationale, including the index-freshness test approach decision (carried forward as an open design point).

> **123 dependency/risk (not 121 scope):** If `sync` does not refresh dp-portfolio's vendored prompts/docs on upgrade, the swept references in the consumer copy go stale — that is a **Spec 123** gap/watch item, tracked there, not resolved here.

---

### Requirement 6: Discovery Confidence Model — Three Layers, Tiers Not Scores

**User Story**: As an agent serving a discovery request, I want the discovery tools to emit match, viability, and usability as three distinct, auditable signals — not a single collapsed score — so that I never mistake a top match for a usable answer, can always act on a clear best-fit, and can surface a flagged weak best-fit for human go/no-go rather than getting a bare empty that hides the candidate I needed.

**Context**: Gap raised during 121 requirements review (Peter, 2026-06-22), then consolidated and **validated against the real corpus** into a tracked decision record: **`.kiro/specs/121-claude-code-portability/discovery-confidence-rubric.md`** (the three-layer model, the tuned per-domain rubrics, the calibration fixtures, and the §Collision table). That artifact is the authoritative model; this requirement **mandates it** and references it for detail rather than duplicating the rubrics. The dry-run behind it caught a false-confidence bug in both rubrics, a phantom field, and the confidence-≠-viability insight (the placeholder `Component-Family-Modal` that is a textbook `strong` match but must not be auto-acted-on) — so this is a tested model, not a paper one.

> **The model is owned in the artifact; the rubrics are domain-authored and tunable.** The per-domain Layer-1 rubrics are authored by their owners (**Lina** = components; **Thurgood** = docs; **Ada** = token exemption). The rubric is tunable by **legible knobs** — field signal-class assignments, coverage thresholds (≥2-token / ≥50%), and a **versioned stop-word list** — not opaque weights. Format-level confirmation stays flagged to the owning domains in the design pass; this requirement pins the model, the three distinct fields, and the governing sequence.

> **Cross-reference (119 Decision 4a):** The agent-side protocol that consumes a Layer-1 `partial` — *propose best-fit + confidence + rationale → human go/no-go*, with the proposal required to carry its own uncertainty — is captured in `.kiro/specs/119-agent-experience-architecture/design-outline.md` under **Decision 4a: Certainty Calibration Protocol** (to formalize when 119 is worked). 121 surfaces the three-layer signal; 119 defines what the agent does with a `partial`.

#### Acceptance Criteria

1. WHEN a discovery tool (`find_docs` / keyworded `find_components`) returns a result THEN it SHALL emit the **three-layer model** of `discovery-confidence-rubric.md` — **Match (Layer 1)**, **Viability (Layer 2)**, **Usability (Layer 3)** — as **distinct fields that are never collapsed**, such that `matchConfidence` (Layer 1) ≠ the viability signal (Layer 2) ≠ rank/order (Layer 3).
2. WHEN Layer 1 (Match) is emitted THEN it SHALL be a **tier, not an opaque score** — **`matchConfidence: 'strong' | 'partial' | 'none'`** — **derived by the per-domain rubric (Layer 1 §Per-domain rubrics in the artifact) from visible evidence** (`matchedOn` labeled by signal class, per Requirement 1 criterion 7, plus `matchedTokens`/`totalTokens` coverage), such that the tier is **reconstructable and auditable** from the emitted primitives without trusting the tool's own label. The rubrics SHALL NOT be inlined here; the artifact governs them.
3. WHEN a discovery tool acts on a result THEN it SHALL follow the artifact's **governing sequence** — **`match → filter by viability → rank/judge usability`** — and the hard rule **match-confidence alone NEVER drives action** SHALL hold: a `strong` match MAY be non-viable (e.g. a placeholder/deprecated doc) or out-ranked on usability, and SHALL NOT be auto-acted-on on the strength of its tier alone.
4. WHEN Layer 2 (Viability) is emitted THEN it SHALL be a **distinct gate signal** separate from `matchConfidence` — component **readiness**; doc **placeholder/deprecated** status. The token **`resolutionDepth`** (Requirement 2) IS the token viability sub-case (Layer 2), and it SHALL remain **lexically distinct** from `matchConfidence` (the §Collision rule — three orthogonal axes, three distinct field names; never reuse a bare `partial` whose meaning depends on context).
5. WHEN Layer 3 (Usability) is emitted THEN the **tool SHALL provide a rank** auditable via `matchedOn`, and SHALL NOT assert rank #1 = "the answer" — the **agent makes the usability judgment** among viable candidates; AND WHEN `matchConfidence` is `partial` THEN the result SHALL resolve via the **propose-best-fit → human go/no-go** protocol of **119 Decision 4a** (cross-referenced above), not auto-action.
6. WHEN a discovery request targets **token** tools THEN the three-layer match-tier model SHALL **NOT** apply (token tools do predicate/keyed retrieval over a closed vocabulary, with no inferred-relevance ranking for a tier to govern) — EXCEPT per the artifact's trigger: IF a token tool is introduced/extended to accept **open-ended intent / natural-language input** AND return **ranked or best-fit candidates** THEN it SHALL inherit this model (bright line: predicate filter → no tier; relevance ranking → tier required).
7. WHEN the rubric is delivered THEN the **calibration fixtures SHALL be a named deliverable** — the dry-run query sets become tier-classification test fixtures (`{ query → expected matchConfidence + expected top candidate }`) asserted at the tool boundary (Requirement 3) — AND the rubric SHALL be **explicitly tunable** by its legible knobs (field signal-class assignments, coverage thresholds, the versioned stop-word list), such that turning a knob moves a query between tiers predictably.
8. WHEN the three-layer signal is exposed THEN it SHALL be **additive** to the existing result shapes (Requirement 1: `ApplicationSummary` unchanged for `find_components`; the `find_docs` result shape) and SHALL NOT mutate or thin them — back-compat (hard constraint).

> **Counter-argument (worth pinning for the design pass):** mandating three distinct fields + a per-domain rubric is more surface than a single score, and a "best-fit on weak match" (`partial`) contract can still *manufacture* false confidence if below-threshold candidates are all noise. The mitigation is exactly why the model rejects opaque scores: `matchConfidence` is reconstructable from `matchedOn` + coverage (criterion 2), so "best I found, but weak" is legible rather than asserted, and the 119-side guardrail makes the agent carry the uncertainty. If early telemetry shows `partial`s are almost always rejected on go/no-go, that is a signal to tune a knob (criterion 7) — not to drop the model, because a flagged weak best-fit still beats a bare empty that hides it. The full rationale (why tiers not scores, the Google #2-organic analogy, the validation history) lives in the artifact.

---

### Requirement 5: Section Addressing by Path+Parent / Stable IDs, with Summary-First as a Hard Rule

**User Story**: As an agent retrieving a specific section, I want unambiguous addressing (by path + parent context or stable section ID) and an enforced summary-first workflow, so that I do not silently under-retrieve a partial stub and return it as if it were complete — the confident-wrong tail failure.

**Context**: Findings 1 and 3 (and related 2). Finding 1 is the highest-severity behavioral risk observed and it reproduced *in this very formalization*: `get_section("Requirements Document Format ...")` returned only a preamble + an empty template stub, while the actual EARS rules and acceptance-criteria standards lived under a *sibling* heading (`Requirements`). A naive single-query agent would have under-retrieved with no signal. Finding 3: `get_section` by heading alone is ambiguous for non-unique headings — the Process-Spec-Planning outline alone repeats `Artifacts Created`, `Implementation Details`, `Validation (Tier 2: Standard)` many times. Finding 2: prompt-embedded exact heading strings drift from indexed headings (`"Requirements Document Format"` vs `"Requirements Document Format (Conditional Loading)"`).

#### Acceptance Criteria

1. WHEN an agent calls `get_section` for a heading that occurs more than once in a document THEN the MCP SHALL support disambiguation by `path + parent` context or a stable section ID, such that a specific occurrence is addressable unambiguously.
2. WHEN a section is requested by a stable section ID THEN the same ID SHALL resolve to the same logical section across content edits that do not remove that section (IDs are stable to heading-string drift, addressing Finding 2).
3. WHEN an agent retrieves content for a multi-section logical unit THEN the workflow SHALL require a summary-first step (`get_document_summary` or equivalent) before `get_section`, such that sibling sections comprising one logical unit are discoverable rather than silently omitted (Finding 1 — summary-first is a **hard workflow rule**, not left to agent diligence).
4. WHEN `get_section` returns content that is a template stub or preamble whose substantive siblings live under adjacent headings THEN the response SHALL provide a signal of adjacent related sections (e.g., sibling headings under the same parent) so the agent has a cue that more exists, rather than returning a stub with no indication of incompleteness.
5. WHEN the summary-first rule is encoded THEN it SHALL be expressed in a form the agent generator (Spec 122) can propagate into generated agent prompts, so the rule is enforced uniformly rather than re-stated ad hoc per agent. *(Cross-spec note, not a blocker: this spec encodes the rule; Spec 122 propagates it.)*

---

### Documentation Requirements (121 slice)

**Context**: Per the documentation-as-requirement standard (Process-Spec-Planning: any spec modifying architecture MUST include documentation requirements as testable EARS criteria). The doc updates partition naturally; the **MCP docs** belong to this spec — specifically `MCP-Integration-Guide.md`, `MCP-Relationship-Model.md`, and `MCP-Evolution-Roadmap.md`. Generator/agent/skills/portability docs and the consumer-onboarding `DesignerPunk-Integration-Guide.md` (a **distinct** doc from `MCP-Integration-Guide.md`) belong to Spec 122/123 (see tasks.md F5).

**User Story**: As a future agent or consumer reasoning about the MCP delivery layer, I want the MCP governance docs to reflect the discovery tools, the additive response-shape contracts, the `find_docs` supersede, and the actioned delivery-layer findings, so that the documented model matches the shipped model.

#### Acceptance Criteria

1. The `MCP-Relationship-Model.md` and `MCP-Integration-Guide.md` (MCP sections) **shall** document the discovery tools — `find_docs` (concept-search + list/catalog mode) and keyworded `find_components` (new optional param, tokenized matching, indexed field set, `ApplicationSummary` unchanged + optional `matchedOn`) — including their query shape, result shape, the auto-index-first hybrid model (Resolved Decision 3), AND the **discovery confidence model** (Requirement 6), referencing `discovery-confidence-rubric.md` as the authoritative source: the **three-layer model** (Match / Viability / Usability as distinct fields, never collapsed); **tiers not scores** (`matchConfidence: strong|partial|none`, derived from visible evidence); the governing sequence and the rule that match-confidence alone never drives action; that a `partial` returns ranked below-threshold candidates flagged with their tier (not a bare empty) while a `none` returns the empty contract (`{ data: [], error: null }` / `find_docs` equivalent); the token exemption + its trigger; and a cross-reference to the 119 agent-side certainty-calibration protocol (Decision 4a) that consumes a `partial`.
2. The `MCP-Integration-Guide.md` and `MCP-Relationship-Model.md` **shall** document the additive `get_token_details` resolved-value triple (`resolvedValue`/`resolvedUnitType`/`resolutionDepth`), its null-contract, the **"always read `resolutionDepth` first"** rule, that `platforms{}` is unchanged, and the additive/backward-compatible governance rule explicitly.
3. The `MCP-Evolution-Roadmap.md` **shall** reconcile the delivery-layer findings now actioned (Findings 9, 10, 11, 12, and the section-addressing items 1/3), record the Requirement 4 **supersede** decision and rationale (the one justified break), and record the reference sweep (the verified canonical set — see tasks.md Task 3.4).
4. WHEN any of the above docs is created or modified THEN it SHALL exist at its expected `.kiro/steering/` path, follow steering metadata standards (validated via `scripts/validate-steering-metadata.js`), have resolving cross-references, and (per the doc-as-requirement template) any runnable examples SHALL run.
5. WHEN the MCP docs are updated THEN the docs-MCP index SHALL be rebuilt (`rebuild_index`) so the documented model is itself discoverable through the tools it describes.

> **Governance note (ballot-measure model):** These doc updates are changes to the shared knowledge layer. They are stated here as requirements so they are tracked and tested, but the actual edits go through the ballot-measure model — drafted, presented to Peter, approved, then applied. Thurgood does not write steering docs unilaterally even within his own remit.

---

### Key Principles

**EARS Format**: WHEN/IF/THEN with SHALL for mandatory behavior; testable and verifiable; edge cases and failure scenarios included (Requirement 1 empty-result + recall floor, Requirement 2 `partial`/`null` contract, Requirement 4 oversized-payload/supersede, Requirement 5 ambiguous-heading).

**Additive / backward-compatible (hard constraint, cross-cutting)**: No change may break an existing MCP response shape relied on by current tests, current Kiro agents, or installed consumers — **with one justified exception**: the `get_documentation_map` → `find_docs` supersede (Requirement 4), justified by redundancy-once-replaced and zero consumer code coupling (Resolved Decisions 1 + 5). Requirement 3 exists to make the additive constraint *enforceable* on the application MCP so future changes stay deliberate.

**Tokenized matching, not substring** (Requirement 1): term-level matching is mandated so multi-word natural-language queries are satisfiable; field coverage alone is insufficient.

**Discovery is a recall floor, not a precision ceiling** (Requirement 1): start tokenized keyword + metadata-field matching; defer semantic ranking; measure precision before investing further.

**One coherent cross-MCP token contract** (Requirement 2): adopt the product MCP's `resolvedValue`/`resolvedUnitType`/`resolutionDepth` triple verbatim; no divergent third shape; `platforms{}` unchanged.

---

## Carried-Forward Design Decision Points (design.md — do NOT resolve here)

1. **Index-freshness test approach** (Lina R1): testing recall against *live* component metadata couples component-authoring to MCP-test stability (a metadata edit could break an MCP test). Decide in design.md: test against live metadata vs a pinned fixture corpus.
2. **Shared resolver module** (Ada R1, backlog/out-of-121): adopting `TokenRefResolver` on the application side duplicates the algorithm across both MCPs; a shared resolver module is the durable fix. Note in design.md as a backlog item, not 121 scope.
3. **G6 token code-reference/import form** (Resolved Decision 3): deferred; revisit in design.md scoped to non-theme-varying tokens only + a `themeAccess` hint. Not a requirement.

---

## Spec Structure (Resolved Decision 4)

**Flat sequential top-level numbering** (matches the established `.kiro/specs/` convention — one number per spec, related work split into separate numbered specs):
- **121** (this spec) — MCP Delivery-Layer Hardening (the former "121-A"). Directory `121-claude-code-portability/` **kept** (cosmetic; the dry-run artifacts already live there and the rename buys nothing).
- **122** — Agent Generator (the former "121-B").
- **123** — Consumer Distribution (the former "121-C"). Inherits the dp-portfolio sync-refresh watch item (Requirement 4).
