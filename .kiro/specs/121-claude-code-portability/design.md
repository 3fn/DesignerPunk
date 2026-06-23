# Design Document: MCP Delivery-Layer Hardening (121)

**Date**: 2026-06-23
**Spec**: 121 — MCP Delivery-Layer Hardening
**Status**: Design Phase
**Dependencies**: None (no-regret spine — additive to both MCPs). Downstream: 119 (consumes discovery + section-addressing), 122 (agent generator propagates summary-first rule), 123 (inherits sync-refresh watch item).

---

## Overview

This design turns the six requirements of 121 into buildable, testable work across three real code surfaces:

- **Docs MCP** (`mcp-server/src/`) — adds `find_docs` (concept-search + paginated list/catalog mode), supersedes `get_documentation_map`, and adds section-addressing disambiguation (Req 5, partially — see scope note).
- **Application MCP** (`application-mcp-server/src/`) — adds tokenized keyword discovery to `find_components` (Req 1), chain-resolved value triple to `get_token_details` (Req 2), the discovery-confidence three-layer emit (Req 6), and a tool-boundary contract test through `callTool(...)` (Req 3).
- **Shared knowledge layer** (`.kiro/steering/`) — MCP governance docs document the new contracts; the reference sweep retargets `get_documentation_map` → `find_docs` across the verified canonical set (see tasks.md Task 3.4 — authoritative; Req 4); ballot-measure governance applies.

**The single governing invariant** is the **additive / backward-compatible constraint**: no change may break an existing MCP response shape relied on by current tests, current Kiro agents, or installed consumers — with **exactly one justified exception** (the `get_documentation_map` → `find_docs` supersede, Req 4). Req 3's tool-boundary contract test is the mechanism that makes "additive = safe / breaking = loud" *enforced* on the application side, where it is currently only aspirational.

**Discovery is a recall floor, not a precision ceiling.** The keyword matcher starts at tokenized term + metadata-field matching; semantic/embedding ranking is explicitly deferred to a later spike. The fixture criteria are recall floors (known-good matches must appear), not precision ceilings.

The authoritative model for Requirement 6 lives in `discovery-confidence-rubric.md` (validated against the real corpus). This design **references** that artifact rather than duplicating its rubrics; the per-domain Layer-1 rubrics remain domain-authored and tunable.

---

## Architecture

### Surface map

| Requirement | Surface | File(s) | Change class |
|---|---|---|---|
| 1 — keyword discovery | application MCP | `query/QueryEngine.ts` (`findComponents`), `indexer/ComponentIndexer.ts` (keyword index build), `index.ts` (new param routing) | additive |
| 1 — `find_docs` concept search | docs MCP | new `tools/find-docs.ts`, `query/QueryEngine.ts` | additive (new tool) |
| 2 — resolved-value triple | application MCP | `indexer/TokenIndexer.ts` (`getDetails`), reuse `TokenRefResolver` logic | additive |
| 3 — tool-boundary contract test | application MCP | new `src/__tests__/tool-boundary.contract.test.ts` exercising `callTool` | test-only |
| 4 — supersede map | docs MCP + steering + template | `tools/find-docs.ts` (list/catalog mode), remove `get-documentation-map.ts`, rewrite its test, sweep refs | **breaking (justified)** |
| 5 — section addressing | docs MCP | `tools/get-section.ts`, `query/QueryEngine.ts` | additive |
| 6 — discovery confidence emit | both discovery tools | `find_docs` + `find_components` result builders | additive |

### Data-flow: keyword discovery (Req 1 + 6, application MCP)

```
callTool('find_components', { keyword: "primary action button" })
  → index.ts handleFind() routes new optional `keyword` param
  → QueryEngine.findComponents(): structured filters (exact) AND keyword (tokenized)
  → tokenize(query) → match against per-component keyword index (auto-derived fields)
  → for each candidate: compute matchedOn (signal-class-labeled) + matchedTokens/totalTokens
  → derive matchConfidence tier (Lina rubric) from that visible evidence
  → emit ApplicationSummary (unchanged) + matchConfidence + matchedOn + viability(readiness) + rank
  → { data: ApplicationSummary[]+signals, error: null }
```

### Data-flow: token resolution (Req 2, application MCP)

```
callTool('get_token_details', { name: "color.action.primary" })
  → TokenIndexer.getDetails() returns existing entry (platforms{} unchanged)
  → resolver.resolve(name) [TokenRefResolver logic, app-side instance]
  → map ResolvedRef → { resolvedValue, resolvedUnitType, resolutionDepth }
  → merge additively onto existing entry; semantic tokens still carry NO `value` key
```

### Reuse boundary (Ada R1)

Req 2 reuses the product MCP's `TokenRefResolver` **logic and contract verbatim** (`resolvedValue`/`resolvedUnitType`/`resolutionDepth`, the null-contract). The application MCP loads the same `token-index/*.yaml` corpus, so the resolver runs against the same data on the app side. Adopting the contract verbatim kills cross-MCP drift by construction.

> **Backlog (NOT 121 scope — Ada's flag):** running the resolver on both the product and application sides duplicates the algorithm across two MCPs. The durable fix is a **shared resolver module** consumed by both. Noted here per Carried-Forward point 2; explicitly out of 121 scope. This design adopts the contract verbatim now and treats deduplication as a separate future spec.

---

## Components and Interfaces

### 1. `find_docs` tool (docs MCP — new)

Dual-mode tool subsuming `get_documentation_map` (Req 1 + Req 4).

```typescript
// mcp-server/src/tools/find-docs.ts
export const findDocsTool = {
  name: 'find_docs',
  description: 'Discover docs by concept/keyword, or enumerate the full catalog (paginated). Supersedes get_documentation_map.',
  inputSchema: {
    type: 'object',
    properties: {
      concept: { type: 'string', description: 'Concept/keyword to search (concept mode)' },
      list:    { type: 'boolean', description: 'List/catalog mode: enumerate all docs (paginated)' },
      cursor:  { type: 'string', description: 'Pagination cursor for list mode' },
      limit:   { type: 'number', description: 'Max results (default bounded for token-limit safety)' },
    },
  },
};

interface FindDocsEntry {
  path: string;            // resolves via get_section / get_document_summary (Req 1.10)
  summary: string;        // ~50-token summary
  owner: string;          // owning domain/agent
  matchConfidence: 'strong' | 'partial' | 'none';  // Layer 1 (concept mode only)
  matchedOn: string[];     // signal-class-labeled evidence (Layer 1 reconstruction)
  viability: { placeholder: boolean; deprecated: boolean }; // Layer 2
  rank: number;            // Layer 3
}

interface FindDocsResult {
  data: FindDocsEntry[];   // empty array when no matches (Req 1.2 — NOT an error)
  error: string | null;    // null on empty; set only on genuine failure
  matchConfidence?: 'none'; // top-level "no matches" indication on empty concept result
  nextCursor?: string;     // list mode pagination
}
```

**Concept mode** = Layer-1 tiered (Thurgood docs rubric). **List/catalog mode** = unranked enumeration, bounded per page (Req 4.2) — no tier (it is a deterministic catalog, not relevance ranking; consistent with the §Collision exemption logic). Pagination is the fix for Finding 10 (the ~78K-char oversized payload).

### 2. `find_components` keyword param (application MCP — additive)

```typescript
// index.ts handleFind() — additive routing
findComponents({
  category?, concept?, platform?, context?,  // EXISTING exact-match — semantics unchanged (Req 1.5)
  purpose?,                                   // EXISTING substring
  keyword?,                                   // NEW — tokenized free-text discovery
  limit?,                                     // NEW optional
});
```

`keyword` is a **new optional parameter**. It does **not** mutate the existing exact-match semantics of `context`/`concept`/`category` (back-compat, Lina R1 P0). Filters remain conjunctive: a `keyword` + `category` query AND-narrows.

### 3. Tokenized keyword index (application MCP — `ComponentIndexer`)

Auto-derived (hybrid auto-index-first, Resolved Decision 3) at index-build time from existing metadata:

```typescript
interface ComponentKeywordIndex {
  // per component name → tokenized terms grouped by signal class
  highSignal: Set<string>;  // tokenized name, tokenized family, purpose, contract concept/category names
  lowSignal: Set<string>;   // when_to_use, contexts, alternatives[].reason, description
  aliases?: Set<string>;    // optional, reactive — true synonym divergence only (Req 1.9)
}
// tokenize: split on whitespace / camelCase / hyphen; lowercase. Term-level, NOT substring (Req 1.3).
// EXCLUDES when_not_to_use (negative-signal trap, Req 1.4 / Lina R1 Q1).
```

### 4. Resolved-value triple on `get_token_details` (application MCP — additive)

```typescript
// TokenIndexer.getDetails() return — ADDITIVE to existing TokenIndexEntry
interface ResolvedValueTriple {
  resolvedValue: number | string | null;
  resolvedUnitType: string | null;
  resolutionDepth: 'full' | 'partial' | null;
}
// existing platforms{web,ios,android} UNCHANGED (Req 2 — no {platform}Accessor, Ada R1 P1 dropped)
// semantic tokens continue to carry NO `value` key (Req 2.4)
```

### 5. Section addressing (docs MCP — `get_section`)

```typescript
getSection({
  path,
  heading,
  parent?,      // NEW — disambiguates non-unique headings by parent context (Req 5.1)
  sectionId?,   // NEW — stable ID, resolves across heading-string drift (Req 5.2)
});
// response gains: siblingHeadings: string[]  — adjacency cue (Req 5.4)
```

---

## Data Models

### The three distinct emit fields (never collapsed — Req 6.1, §Collision)

Every keyword/concept discovery result carries three orthogonal signals as **distinct fields**:

| Layer | Field | Type | Source |
|---|---|---|---|
| **1 — Match** | `matchConfidence` | `'strong' \| 'partial' \| 'none'` | derived by per-domain rubric from `matchedOn` + `matchedTokens`/`totalTokens` |
| **2 — Viability** | components: `readiness`; docs: `{ placeholder, deprecated }`; tokens: `resolutionDepth` | gate signal | already-carried metadata / resolver |
| **3 — Usability** | `rank` (+ `matchedOn` for auditability) | ordinal | match-strength + coverage |

`matchConfidence` ≠ viability ≠ `rank`. The `partial` of `matchConfidence` (Layer 1) is **lexically distinct** from the `partial` of `resolutionDepth` (Layer 2) — never collapse a context-dependent bare `partial`.

**Reconstructability (Req 6.2):** `matchConfidence` is derivable from emitted primitives (`matchedOn` labeled by signal class + coverage), so an auditor recomputes the tier without trusting the tool's own label. Rubrics are not inlined in the doc/code as opaque weights — they read from the legible knobs (signal-class assignment, ≥2-token / ≥50% thresholds, the versioned stop-word list).

### `get_token_details` resolved-value triple (reuse TokenRefResolver contract)

| Token shape | `resolvedValue` | `resolvedUnitType` | `resolutionDepth` |
|---|---|---|---|
| primitive | own value | family→unitType | `full` |
| semantic/component, single resolvable ref | chain-resolved terminal value | inferred | `full` |
| multi-ref / literal / unresolvable | **self-name** | category fallback | `partial` |
| no-ref-no-value | `null` | `null` | `null` |

**Hard documentation rule (Req 2.6):** *"always read `resolutionDepth` before trusting `resolvedValue`"* — because `partial` overloads `resolvedValue` with the self-name. Docs must also state the authoritative runtime value is the shipped `dist/DesignTokens.*` artifact (per G6); the MCP does not eliminate the need to reference shipped files.

**Theme-varying tokens — `resolvedValue` is a per-mode bundle, not a scalar (Task 1 implementation finding; Peter-confirmed, Option A).** When a token chain-resolves to a theme-varying primitive, the terminal `value` is itself a per-mode/contrast object (e.g. `teal400` → `{ light: {base, wcag}, dark: {base, wcag} }`), so `resolvedValue` comes back as that object even though the triple's static type reads `number | string | null`. This is **faithful product-MCP behavior carried verbatim** (Req 2.5 — no divergent third shape), not an app-side divergence; `resolutionDepth` is still `full`. **Decision (A):** keep verbatim; do NOT flatten and do NOT relabel as `partial`. Consequences: (1) the Req 2 docs (Task 7.2) MUST carry a sentence stating that for theme-varying tokens `resolvedValue` is a per-mode bundle, not a single value; (2) the Task 4 theme-varying contract fixture MUST expect the bundle object, and the type annotation is knowingly narrower than runtime reality.

### `find_components` empty/`none` shape (pinned literal)

```jsonc
// empty query OR matchConfidence: 'none' → existing analog
{ "data": [], "error": null }
```

### `find_docs` empty/`none` shape (pinned literal — resolves DDP 2)

```jsonc
// concept-mode, no matches → explicit "no matches", NOT an error, NOT a silent payload
{ "data": [], "error": null, "matchConfidence": "none" }
```

The `matchConfidence: "none"` top-level field is the explicit "no matches" indication required by Req 1.2 — it distinguishes a genuine empty from a tool failure (`error` would be non-null) and from a `partial` (which returns ranked below-threshold candidates in `data`, never empty).

---

## Correctness Properties

These are the invariants the Testing Strategy enforces:

- **P1 (Additive):** for `get_token_details` and `find_components`, the pre-existing emitted key-set is a subset of the new key-set — never a different or thinned set. Enforced by exact-key-set assertion (Req 3.2).
- **P2 (No semantic `value` key):** semantic tokens emit no `value` key, before and after the triple is added (Req 2.4). *(Implementation note: O3 resolved — semantics already carry no entry-level `value` at runtime (0/193); the fix is a one-line type loosening `value: string | number` → `value?: string | number` at `TokenIndexer.ts:20`. The assertion holds as written; no spec correction. See tasks.md Task 1.1.)*
- **P3 (Tokenized matchability):** any fixture query whose terms appear (term-level) in an indexed field returns a non-empty recall floor; `"primary action button"` is matchable (would be unsatisfiable under substring — Req 1.3).
- **P4 (Three distinct fields):** `partial`/`none` cases are distinguishable from response shape alone — `partial` ⇒ non-empty ranked below-threshold candidates flagged with tier; `none` ⇒ the empty contract (Req 3.6, §Collision).
- **P5 (Tier reconstructable):** `matchConfidence` recomputes from `matchedOn` + coverage (Req 6.2).
- **P6 (Compose):** every discovery result resolves in one subsequent call — path via `get_section`/`get_document_summary`, name via `get_component_summary` (Req 1.10).
- **P7 (Map subsumed):** `find_docs` list/catalog mode enumerates the full corpus within token limits across bounded calls (Req 4.1/4.2).

---

## Error Handling

- **Oversized payload (Finding 10):** `find_docs` list mode is paginated with a bounded default `limit`; each page returns within the MCP token limit with growth headroom (Req 4.2). This is the structural fix for the `get_documentation_map` ~78K-char failure.
- **No matches vs failure:** empty discovery results return `{ data: [], error: null }` (+ `matchConfidence: 'none'` for `find_docs`). A genuine tool failure sets `error` (and `isError` at the `callTool` envelope). The two are never conflated (Req 1.2).
- **Unresolvable token:** resolver returns `resolutionDepth: 'partial'` with `resolvedValue` = self-name, or `null`/`null` for no-ref-no-value — never throws (Req 2.3).
- **Ambiguous heading (Finding 3):** when `get_section` heading is non-unique and no `parent`/`sectionId` disambiguator is supplied, the response signals ambiguity and lists candidate parents rather than silently returning the first match.
- **Stub under-retrieval (Finding 1):** `get_section` returns `siblingHeadings` so a preamble/stub carries a cue that substantive siblings exist (Req 5.4). Summary-first is enforced as a workflow rule (Req 5.3).

---

## Testing Strategy

### Calibration fixtures as tier-classification tests (Req 6.7)

The dry-run query sets in `discovery-confidence-rubric.md` become the named fixture deliverable: `{ query → expected matchConfidence + expected top candidate }`, asserted at the tool boundary. Per the acceptance fixture set:

| Query | Tool | Recall floor | Expected tier |
|---|---|---|---|
| `concept: "RTL"` / `"internationalization"` | `find_docs` | `Web-Authoring-Standards.md`, `Component-Family-Form-Inputs.md` | strong |
| `concept: "spec planning"` / `"EARS"` | `find_docs` | `Process-Spec-Planning.md` | strong |
| keyword: `"login"` | `find_components` | floor `Input-Text-Email`; +Password +Button-CTA once `when_to_use` indexed | strong/partial per coverage |
| keyword: `"text input field"` | `find_components` | four `Input-Text-*` (family `FormInput`), min `Input-Text-Base` | strong |
| keyword: `"primary action button"` | `find_components` | `Button-CTA` | strong |

Plus adversarial/calibration fixtures asserting the **false-confidence guards**: a low-signal-only ≥2-token query (e.g. both tokens landing in a shared `contexts` value) caps at `partial`, not `strong`; an incidental high-field doc token (e.g. "avatar" in `Token-Family-Sizing` description) caps at `partial`, not `strong`.

### Application-MCP tool-boundary contract test (Req 3 — the H1 gap)

New test exercising `callTool(...)` end-to-end (NOT QueryEngine/indexer directly):

- `callTool('get_token_details', ...)` — tier-aware full-shape fixtures: primitive / semantic (theme-varying) / component / `partial` / `null` / not-found. Assert the resolved-value triple, an **exact key-set**, and pin **no `value` key on semantics** (Ada authors token-side assertions).
- `callTool('find_components', ...)` — lock full `ApplicationSummary` shape; recall-floor `must-include` per fixture; empty query → `{ data: [], error: null }`; conjunctive narrowing; discovery→retrieval composition. Do NOT pin ordering unless ranking is implemented (Lina authors component-side assertions).
- Req 6 per-fixture assertions: (a) expected `matchConfidence` tier; (b) three layers present as distinct fields, not collapsed; (c) a weak-match (`partial`) fixture returns ranked below-threshold candidates flagged with tier (NOT empty); (d) a genuinely-empty (`none`) fixture returns the empty contract. Applies to both `find_docs` and `find_components`.
- Breaking-change guard: altering any existing field fails the test (Req 3.4).

### Backward-compat assertions

- **Exact-key-set** assertion on both tools (additive = enforced, not inferred — Req 3.2).
- Existing `get_documentation_map` pinned tests are **rewritten** to target `find_docs` (explicit supersede; not silently mutated — Req 4.3).
- One vacuous docs-MCP integration assertion noted (`get_section` under `if (!isError)`) — flagged for tightening; docs side otherwise covered.

### Domain ownership of test authorship

Thurgood establishes that the test MUST exist, MUST run through `callTool`, and what it MUST enforce. **Ada** authors the token-side assertions; **Lina** authors the component-side assertions. The calibration-fixture corpus is co-owned (docs fixtures = Thurgood; component fixtures = Lina).

---

## Design Decisions

### Decision 1: `matchedOn` is mandatory whenever a tool emits `matchConfidence` (resolves DDP — `matchedOn` mandatory-when-tiered)

**Options Considered:** (a) keep `matchedOn` optional per Req 1.7; (b) make it mandatory for any tool emitting `matchConfidence`.
**Decision:** (b). Req 1.7 calls `matchedOn` "optional" for `find_components`, but Req 6.2 requires the tier to be **reconstructable from visible evidence** — which is impossible without `matchedOn`. Reconciliation: `matchedOn` is **optional in general but mandatory whenever the result carries `matchConfidence`**. Since both discovery tools emit `matchConfidence`, `matchedOn` is effectively mandatory on them.
**Rationale:** P5 (tier reconstructable) is load-bearing for the whole "tiers not scores" payoff; a tier with no emitted evidence is just an opaque label.
**Trade-offs:** slightly larger result payload. Acceptable — `matchedOn` is small and drives Layer-3 rank anyway.

### Decision 2: `find_docs` empty shape literal (resolves DDP — `find_docs` empty/`none` shape)

**Decision:** `{ data: [], error: null, matchConfidence: 'none' }` for concept-mode no-match; mirrors the `find_components` analog `{ data: [], error: null }` with an explicit top-level `matchConfidence: 'none'` as the "no matches" indication.
**Rationale:** satisfies Req 1.2 (explicit, not silent, not an error) and keeps `partial` (non-empty, ranked) shape-distinguishable from `none` (empty) — P4.
**Trade-offs:** `find_docs` carries one field `find_components` does not; justified because `find_docs` has no `data[].readiness` viability field to lean on, so the top-level tier is the cleanest empty-indicator.

### Decision 3: Stop-word list ownership + versioning (resolves DDP — stop-word ownership)

**Options Considered:** (a) inline per-tool; (b) shared versioned module owned by docs domain; (c) per-domain lists.
**Decision:** (b) — a **single versioned stop-word list module**, owned by **Thurgood (docs domain)** as the docs rubric is the one that gates `partial`/`none` on it (rubric: "zero salient-token matches after stop-word + common-term normalization"). Versioned (a `version` constant + changelog entry) so the `partial`/`none` line does not drift silently. Exposed as a legible knob per Req 6.7.
**Rationale:** the rubric explicitly calls the stop-word list out as owned-and-versioned; centralizing avoids two divergent lists drifting the tier boundary across tools.
**Trade-offs:** application MCP takes a dependency on a docs-domain-owned constant. Acceptable; it is data, not logic. **Resolved (O4 / tasks.md F2 + Task 5.1):** placement is the docs-domain-owned versioned module above — no longer an open docs-constant-vs-shared-infra question.

### Decision 4: Index-freshness test approach (resolves DDP 1 — Lina R1)

**Options Considered:** (a) test recall against **live** component metadata; (b) test against a **pinned fixture corpus**.
**Decision:** **(b) pinned fixture corpus** for the tier-classification / recall-floor contract tests, with a **separate, lightweight "live smoke" recall check** that asserts only that the named floor components still exist (not full tier classification).
**Rationale:** testing tier classification against live metadata couples component-authoring to MCP-test stability — a routine metadata edit (rewording a `purpose`) could flip a tier and break an unrelated MCP test. A pinned corpus decouples them; the live smoke check still catches the "floor component was deleted/renamed" regression without coupling to wording.
**Trade-offs:** the pinned corpus can drift from live metadata (a fixture asserts behavior the real index no longer exhibits). Mitigation: the live smoke check + a documented refresh step when fixtures are intentionally re-baselined. **Resolved (O2a confirmed, Lina / tasks.md Task 4.1):** pinned corpus + live smoke is the confirmed index-freshness coupling tradeoff.

### Decision 5: `get_documentation_map` supersede mechanics (resolves DDP 5 — Resolved Decision 1)

**Decision:** `find_docs` ships **dual-mode** (concept + list/catalog) so it fully subsumes the map's capability; then `get_documentation_map` is **removed**, its pinned shape test **rewritten** to target `find_docs` list mode, the supersede recorded in `MCP-Evolution-Roadmap.md` with rationale, and the **verified canonical set of first-party references swept** (enumerated in tasks.md Task 3.4 — authoritative).
**Reference sweep (verified canonical set — see tasks.md Task 3.4 for the authoritative list):** 5 steering docs (`component-mcp-query-guide.md`, `00-Steering Documentation Directional Priorities.md`, `Component-Quick-Reference.md`, `DesignerPunk-Integration-Guide.md`, `MCP-Relationship-Model.md`), the Thurgood agent prompt (`.kiro/agents/thurgood-prompt.md`, `.claude/agents/thurgood.md`, `product-template/agents/thurgood-prompt.md`), and the two real MCP configs' `autoApprove` lists (`.kiro/settings/mcp.json`, `.cursor/mcp.json`; verify the `init` template path Req 4.4 names). **NOT sweep targets:** the additional `get_documentation_map` hits in `.claude/agents/{ada,lina,data}.md` are disposable ports regenerated by Spec 122's generator — they refresh automatically and are not manual 121 sweep targets. The docs-MCP internal refs (`mcp-server/src/index.ts`, `tools/index.ts`, README, tests) are part of the implementation change, not the steering sweep.
**Rationale:** the map is known-unusable-at-scale (Finding 10) and redundant once `find_docs` exists; zero consumer *code* coupling makes this the one justified break (Resolved Decisions 1 + 5). Keeping two discovery surfaces is debt.
**Trade-offs:** a breaking change for any out-of-repo consumer referencing the map by name in config. Evidence shows only doc/config/prompt coupling, which refreshes on upgrade + `sync`. **Watch (123, not 121):** if `sync` does not refresh dp-portfolio's vendored prompts/docs, the swept consumer copies go stale — tracked in Spec 123.
**Governance:** the steering-doc edits and the Thurgood-prompt edit go through the **ballot-measure model** (drafted → presented to Peter → approved → applied). Thurgood does not write these unilaterally even within his own remit.

### Decision 6: G6 code-reference/import form — DEFERRED (resolves DDP 3 / Resolved Decision 3)

**Decision:** **DEFER** (confirmed). Not a requirement in this spec. Naive `var(--x)` / `DesignTokens.x` templates emit WRONG code for theme-varying tokens (resolved at runtime via theme providers). When revisited, scope to **non-theme-varying tokens only + a `themeAccess` hint**. 121 ships the resolved-value triple; the import-form is a later, scoped addition.
**Rationale:** Ada R1 P0 — shipping a naive code-reference form would emit incorrect code for the theme-varying case, which is exactly the case agents most need help with. Better to ship nothing than ship a footgun.
**Trade-offs:** agents still reference `dist/DesignTokens.*` for the importable symbol; the MCP improves selection/discovery, not "no file read ever." Req 2.6 mandates the docs state this accurately.

### Decision 7 (noted, NOT resolved here): shared resolver module — BACKLOG

Adopting `TokenRefResolver` on the application side duplicates the algorithm across both MCPs. The durable fix is a shared resolver module. **Out of 121 scope** (Carried-Forward point 2 / Ada R1 backlog). Noted for a future spec; 121 adopts the contract verbatim now.

---

## Open Questions for Domain Review — RESOLVED

All four domain-review questions are resolved in domain review; the authoritative resolutions live in tasks.md (Flags / Open Items + the folded tasks). Recorded here as confirmed so the design reads consistently with tasks.md.

- **O1 (Ada) — CONFIRMED (tasks.md Task 1.2):** the application-side resolver reads the same `token-index/*.yaml` corpus and adopts the verbatim `ResolvedRef → {resolvedValue, resolvedUnitType, resolutionDepth}` mapping. `themeVarying` is carried at the semantic tier; the triple does not surface it (`get_token_details` returns it independently).
- **O2 (Lina) — CONFIRMED (tasks.md Task 4.1 + Task 2.1):** Decision 4 (pinned fixture corpus + live smoke) is the confirmed coupling tradeoff (O2a); the keyword-index signal-class field assignments match the rubric, and the indexer reads the real key `when_to_use` / parsed `whenToUse` (O2b).
- **O3 (Ada) — RESOLVED (tasks.md Task 1.1):** semantic entries already carry no entry-level `value` at runtime (0/193; `value:` only appears nested in `primitiveReferences`). The fix is a one-line type loosening `value: string | number` → `value?: string | number` at `TokenIndexer.ts:20`. The P2/Req 2.4 "no `value` key" assertion holds as written — no spec correction needed.
- **O4 (Thurgood/infra) — RESOLVED (tasks.md Task 5.1 + F2):** the stop-word list is the docs-domain-owned versioned module (a `version` constant + changelog), consumed by the docs MCP and by the application MCP as data, not logic — no longer an open docs-constant-vs-shared-infra question.
