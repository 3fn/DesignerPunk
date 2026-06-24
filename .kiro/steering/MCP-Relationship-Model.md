---
inclusion: manual
name: MCP-Relationship-Model
description: Defines boundaries, information flow, access model, and interface contracts between DesignerPunk's three MCP servers
---

# MCP Relationship Model

**Date**: 2026-03-20
**Last Reviewed**: 2026-06-23
**Purpose**: Defines boundaries, information flow, access model, and interface contracts between DesignerPunk's three MCP servers
**Organization**: process-standard
**Scope**: cross-project
**Layer**: 2
**Relevant Tasks**: architecture, product-development

---

## Purpose

DesignerPunk operates three MCP servers (two existing, one future) that form a knowledge pipeline from system infrastructure through application guidance to product execution. This document defines the boundaries, information flow, access model, and interface contracts between them.

---

## The Three MCPs

### Docs MCP — "How the system works"

**Status**: Production (existing)
**Scope**: DesignerPunk system knowledge — tokens, architecture, governance, process
**Repository**: Lives in DesignerPunk

**Owns**:
- Token documentation (all families, governance, resolution patterns)
- Steering documentation (process, standards, principles)
- Architecture guides (Rosetta, Stemma, Civitas, platform guidelines)
- Governance rules (ballot measures, token creation, component creation)
- System process standards (development workflow, file organization, spec planning)

**Does not own**:
- How to apply the system to build products (Application MCP)
- Product-specific context (Product MCP)

**Tools**: `find_docs`, `get_document_summary`, `get_document_full`, `get_section`, `list_cross_references`, `validate_metadata`, `get_index_health`, `rebuild_index`

**Query pattern**: Progressive disclosure — discover (`find_docs`) → summary → section → full doc

**Discovery tools:**
- `find_docs({ concept })` — concept/keyword search returning ranked entries (`{ path, summary, owner, matchedOn, rank }`) with `matchConfidence` tiers. No-match returns `{ data: [], error: null, matchConfidence: 'none' }` — explicit, not a silent empty.
- `find_docs({ list: true, cursor?, limit? })` — paginated list/catalog mode enumerating the full corpus in bounded pages (~6K chars/page; default `limit` 20, hard cap 100). Supersedes the former `get_documentation_map`, which was removed after hitting the MCP token limit at ~78K chars (Spec 121 Req 4).

**Docs `aliases:` field:** `find_docs` indexes an optional high-signal `aliases:` frontmatter field as a reactive semantic-synonym bridge — for concepts whose literal term is absent from a doc's title and description (e.g., "RTL" → `Web-Authoring-Standards.md`, which says "logical properties"). Authors add `aliases:` only when a real query term diverges from auto-derived metadata; absence does not block auto-derived matching. See `Process-File-Organization.md` for the author-facing schema entry.

### Application MCP — "How to use the system"

**Status**: Production (existing)
**Scope**: DesignerPunk application knowledge — component selection, assembly, patterns, guidance
**Repository**: Lives in DesignerPunk

**Owns**:
- Component catalog (names, types, families, readiness)
- Component metadata (contracts, composition rules, token relationships)
- Experience patterns (assembly guidance for common UI scenarios)
- Prop guidance (family-level selection rules, when-to-use, alternatives)
- Assembly validation (component tree correctness, accessibility checks)
- Layout templates (future — Spec 069)

**Does not own**:
- Why tokens or components are designed the way they are (Docs MCP)
- What product is being built or for whom (Product MCP)

**Tools**: `get_component_catalog`, `get_component_summary`, `get_component_full`, `find_components`, `get_prop_guidance`, `get_experience_pattern`, `list_experience_patterns`, `validate_assembly`, `check_composition`, `get_component_health`

**Query pattern**: Context-driven — find by purpose/keyword/context → get details → validate assembly

**Discovery tools (`find_components`):**
- `find_components({ keyword })` — new optional free-text parameter (Spec 121 Req 1). Uses **tokenized term matching** (split on whitespace / camelCase / hyphen; lowercase; term-level, not substring), so multi-word natural-language queries (e.g. `"primary action button"`) are matchable.
- Indexed fields: tokenized `name`, tokenized `family`, `purpose`, contract concept/category names (high-signal); `whenToUse`, `contexts`, `alternatives[].reason`, `description` (low-signal). `whenNotToUse` is **excluded** (negative-signal trap).
- `ApplicationSummary` shape **unchanged** — the existing exact-match semantics of `context`/`concept`/`category` are unchanged (back-compat); `keyword` is conjunctive with them. Results are optionally augmented with `matchedOn` (which fields matched, labeled by signal class) when `keyword` is supplied.
- Auto-derived from existing metadata without hand-curated keyword lists. Optional `aliases:` on component metadata supports reactive synonym bridging (e.g. "select" → Dropdown-family components).

**`get_token_details` additive triple (Spec 121 Req 2):**

`get_token_details` returns three additive fields alongside the unchanged `platforms{}` object:

| Field | Type | Meaning |
|---|---|---|
| `resolvedValue` | `number \| string \| object \| null` | Chain-resolved terminal value (or `null`) |
| `resolvedUnitType` | `string \| null` | Unit type of the resolved value |
| `resolutionDepth` | `'full' \| 'partial' \| null` | Depth of resolution achieved |

**Null-contract:**
- Primitive token → own value / `resolutionDepth: 'full'`
- Semantic/component, single resolvable ref → chain-resolved terminal value / `'full'`
- Multi-ref, literal, or unresolvable → token self-name / `'partial'`
- No-ref-no-value → `null` / `resolutionDepth: null`

**Hard rule: always read `resolutionDepth` before trusting `resolvedValue`.** When `resolutionDepth` is `'partial'`, `resolvedValue` is the token's self-name (not a resolved value) — do not use it as a concrete value without checking depth first.

**Theme-varying caveat:** for theme-varying tokens, `resolvedValue` is a per-mode bundle object (e.g. `{ light: { base, wcag }, dark: { base, wcag } }`), still `resolutionDepth: 'full'`. It is not a scalar in that case.

**Authoritative runtime values live in `dist/DesignTokens.*`.** The MCP triple is a convenience for selection and guidance; it does not eliminate the need to reference the shipped token files for code-generation or runtime use (per G6 — deferring the code-reference form to design.md, scoped to non-theme-varying tokens only).

**Governance rule:** the triple is strictly additive — no existing field changes, semantic tokens still carry no `value` key. The Req-3 contract test enforces this: any change to an existing field breaks the test loud. `platforms{}` is unchanged.

### Product MCP — "What we're building"

**Status**: Production (Specs 081, 097, 108)
**Scope**: Product-specific knowledge — product tokens, users, business rules, domain model, screen inventory
**Repository**: Lives in the product's own repository, not in DesignerPunk

**Design Philosophy**: Deviation is welcome; deviation without communication is not. The Product MCP is a communication layer — it makes product-level decisions visible, structured, and queryable, enabling the organization to observe patterns across verticals and evolve the system in response to real product needs.

**Owns**:
- Product tokens (product-specific values — layout constraints, motion characteristics, visualization constants; see Product-Token-Governance.md)
- Brand context (personality, voice, tone, anti-references)
- User personas and research
- Business rules and domain logic
- Product primitives (objects, surfaces, intent signals — Spec 081)
- Content standards (voice, tone, terminology)
- Screen inventory (what's been built, what's planned)
- Product-specific patterns (recurring product UI that isn't generalizable to DesignerPunk)

**Does not own**:
- DesignerPunk system knowledge (Docs MCP)
- DesignerPunk component catalog or patterns (Application MCP)
- Anything generalizable across product verticals (belongs in Application MCP or Docs MCP via promotion)

**Tools**: `get_product_overview`, `get_brand_context`, `find_screens`, `get_screen_spec`, `list_experience_map`, `get_product_tokens`, `get_product_health`, `rebuild_product_index`

**Query pattern**: Context-driven — overview → screens/tokens by filter → specific details

---

## Information Flow

```
Docs MCP ──────────> Application MCP ──────────> Product MCP
(system core)        (system application)         (product ecosystem)

Encodes system       Encodes application          Encodes product
knowledge into       knowledge into               knowledge into
queryable docs       queryable components         queryable context
                     and patterns
```

### Flow Direction

**Outward (system → product)**: System knowledge informs application guidance, which informs product execution. A token's existence (Docs MCP) enables a component's token usage (Application MCP), which enables a screen's implementation (Product MCP context).

**Inward (product → system)**: Product work discovers gaps. A missing component for a product screen (Product MCP context) becomes a Tier 3 System Escalation Request routed through Thurgood, who triages to the appropriate system agent. If the gap is generalizable, it gets promoted into the Application MCP (new pattern) or Docs MCP (new token, new component).

### Promotion Path

When product work reveals something generalizable across verticals:

**"Cross-product" means cross-vertical within one organization** — not unrelated businesses. DesignerPunk serves a single organization's product portfolio, where each vertical shares the system layer but owns its product-level decisions.

**Scope model**: Product token (one vertical) → System token (all verticals). Component tokens are orthogonal — system-level tokens with component-scoped consumption, not a tier below product tokens.

**Promotion signal**: When two or more product verticals independently define tokens for the same semantic need (e.g., Portfolio defines `contentMaxWidth: 1336` and WrKingClass defines `contentMaxWidth: 1280`), that's evidence the system has a gap.

```
Product-specific discovery (product token authored)
    ↓
Lessons Synthesis Review (Stacy leads — observes cross-vertical patterns)
    ↓
Classified as "pattern candidate" or "systemic"
    ↓
Tier 3 System Escalation Request → Thurgood
    ↓
Thurgood triages:
    → Ada (new token) → Docs MCP
    → Lina (new component/pattern) → Application MCP
    → Thurgood (process/governance) → Docs MCP
```

Nothing gets promoted without human review (Peter approves routing).

---

## Access Model

### Who Queries What

| Agent | Docs MCP | Application MCP | Product MCP |
|-------|----------|-----------------|-------------|
| **Peter** | ✅ Direct | ✅ Direct | ✅ Direct |
| **Leonardo** | ✅ Reference | ✅ Primary | ✅ Primary (future) |
| **Kenya/Data/Sparky** | ✅ Reference | ✅ Reference | ❌ Via Leonardo's specs |
| **Stacy** | ✅ Primary | ✅ Reference | ✅ Audit (future) |
| **Thurgood** | ✅ Primary | ✅ Audit | ❌ Not product-scoped |
| **Ada** | ✅ Primary | ❌ Not component-scoped | ❌ Not product-scoped |
| **Lina** | ✅ Reference | ✅ Primary | ❌ Not product-scoped |

### Access Principles

- **Platform agents don't query Product MCP directly.** Product context flows through Leonardo's screen specifications. This keeps platform agents focused on implementation, not product decisions.
- **System agents don't query Product MCP.** They receive product context through Tier 3 requests, which contain enough context to act without needing the full product picture.
- **Leonardo is the bridge.** He's the only agent that queries both Application MCP (component selection) and Product MCP (product context), synthesizing them into screen specifications.
- **Stacy audits across boundaries.** She queries Docs MCP for standards, Application MCP for component verification, and Product MCP for product process quality.

---

## Interface Contracts

### How MCPs Reference Each Other

**Application MCP → Docs MCP**: Components reference tokens by name. Experience patterns reference token families. The Application MCP assumes Docs MCP token names are stable identifiers.

**Product MCP → Application MCP**: Product primitives (future) will reference Application MCP components and experience patterns by name. A product surface definition might specify "use the `simple-form` experience pattern for user registration." The Product MCP assumes Application MCP component names and pattern names are stable identifiers.

**Product MCP → Docs MCP**: Product tokens reference system tokens by canonical name (e.g., `ref: space300`, `ref: color.feedback.error.text`). The Product MCP reads the generated `token-index/` directory to resolve these references at query time. The Product MCP assumes Docs MCP token names (as they appear in `token-index/*.yaml` keys) are stable identifiers.

### Stability Contract

For cross-MCP references to work, each MCP must maintain stable identifiers:

| MCP | Stable Identifiers |
|-----|-------------------|
| Docs MCP | Token names (e.g., `space150`, `color.primary`) |
| Application MCP | Component names (e.g., `Button-CTA`), pattern names (e.g., `simple-form`), context values (e.g., `login-forms`) |
| Product MCP | Product token names (e.g., `contentMaxWidth` in `layout` category), screen names, domain object names |

Breaking changes to stable identifiers require coordination across MCPs.

---

## Discovery Confidence Model

Both discovery tools (`find_docs` and keyworded `find_components`) emit a three-layer confidence signal. The authoritative model is in `.kiro/specs/121-claude-code-portability/discovery-confidence-rubric.md`; this section summarizes the contract.

### Three Distinct Layers (never collapsed)

| Layer | Field | Question | Owner |
|---|---|---|---|
| **1 — Match** | `matchConfidence: 'strong' \| 'partial' \| 'none'` | Did we find it, and how strongly? | tool (matcher) |
| **2 — Viability** | `readiness` (components); `{ placeholder, deprecated }` (docs); `resolutionDepth` (tokens) | Can this result actually be used? | tool emits; caller gates |
| **3 — Usability** | `rank` + `matchedOn` | Of the viable ones, which is best? | tool ranks; agent judges |

The three fields are **lexically distinct** and never merged. `matchConfidence: 'partial'` (Layer 1 — weak match) must not be confused with `resolutionDepth: 'partial'` (Layer 2 token viability — resolved to self-name, not terminal value). These are orthogonal axes.

### Tiers, Not Scores

`matchConfidence` is a tier (`strong | partial | none`) derived by the per-domain rubric from **visible evidence** (`matchedOn` labeled by signal class + `matchedTokens`/`totalTokens` coverage). The tier is reconstructable from the emitted primitives — it is not an opaque float. Per-domain rubrics are in the rubric artifact; they are tunable by legible knobs (signal-class assignments, coverage thresholds, the versioned stop-word list).

### Governing Sequence and Hard Rule

`match → filter by viability → rank/judge usability`

**Match-confidence alone never drives action.** A `strong` match may be non-viable (a placeholder doc, a deprecated component) or not the most usable candidate. The tool surfaces evidence; the agent judges; the human decides uncertain calls.

### `partial` vs `none` Contracts

- **`partial`** — at least one token matched but below the `strong` threshold (low-signal only, or incidental high-field hit). Returns ranked below-threshold candidates **flagged with their tier**. This is a flagged weak best-fit, not an empty result — a surfaced weak candidate beats a bare empty that hides it.
- **`none`** — zero salient matches after stop-word normalization. Returns the empty contract:
  - `find_components` → `{ data: [], error: null }`
  - `find_docs` → `{ data: [], error: null, matchConfidence: 'none' }`

`partial` and `none` are distinguishable from response shape alone.

### When `matchConfidence` is `partial`

The agent follows the **119 Decision 4a Certainty Calibration Protocol** — propose the best-fit candidate with confidence level and rationale for human go/no-go — rather than acting autonomously. (121 emits the signal; 119 defines the agent-side protocol that consumes a `partial`.)

### Token Exemption

Token tools (`search_tokens`, `get_token_details`, `get_token_family`, `get_token_consumers`) are **exempt** from the three-layer confidence model. They perform structured/predicate retrieval over a closed vocabulary with no relevance ranking — there is nothing for a tier to govern. **The trigger:** if a token tool is extended to accept open-ended natural-language input and return ranked/best-fit candidates, it inherits this model. Bright line: predicate filter → no tier; relevance ranking → tier required.

---

## Content Types Per MCP

### Docs MCP Content Types (Established)
- Token definitions (primitive, semantic, component)
- Steering documents (process, governance, architecture)
- System principles (Rosetta, Stemma, Civitas)
- Platform guidelines
- Test standards

### Application MCP Content Types (Established)
- Component metadata (schemas, contracts, annotations)
- Experience patterns (assembly step sequences)
- Family guidance (prop selection, when-to-use)
- Composition rules (parent-child constraints)

### Product MCP Content Types (Established — Specs 081, 097, 108)
- **Product tokens** — product-specific values (layout constraints, motion characteristics, visualization constants) scoped to one vertical. Governed by Product-Token-Governance.md. Queryable via `get_product_tokens`.
- **Brand context** — personality, voice, tone, anti-references, register
- **User personas** — who the product serves, their needs and contexts
- **Business rules** — domain logic that affects UI decisions
- **Product primitives** — objects, surfaces, intent signals (Spec 081)
- **Content standards** — voice, tone, terminology conventions
- **Screen inventory** — what's been built, current state, planned work
- **Product-specific patterns** — recurring UI that isn't generalizable

Product tokens are the most recently established content type (Spec 108). They reference system tokens via canonical names and are resolved at query time against the shared `token-index/` directory.

---

## Cross-MCP Reference Principles

Detailed patterns for cross-MCP references are deferred to Spec 081. The governing principles are:

1. **Reference by stable identifier, not by path or internal structure.** A Product MCP entry references `Button-CTA`, not `src/components/core/Button-CTA/schema.yaml`.
2. **One direction of dependency.** Product MCP depends on Application MCP depends on Docs MCP. Never the reverse. System MCPs have no knowledge of product-specific content.
3. **Graceful degradation.** If a referenced identifier doesn't resolve (component removed, pattern renamed), the query should return a clear "not found" rather than failing silently.
4. **Promotion is explicit.** Product-specific content doesn't automatically become system content. Promotion requires human review, Tier 3 request, and system agent action.

---

## Relationship to DesignerPunk Packaging

The Product MCP becomes practical when DesignerPunk is consumable as a package — when a product repository can attach DesignerPunk's Docs MCP and Application MCP as dependencies. The Product MCP is the product-side complement that provides the context those system MCPs need to be useful in a specific product.

The packaging vehicle (Kiro Power, plugin, or other mechanism) will determine the technical integration pattern. The relationship model defined here is vehicle-agnostic — it describes the logical boundaries and information flow regardless of how the MCPs are technically connected.

---

## Health Management Model

All three MCP servers share a common health management architecture (Spec 106):

### Three-State Health

| Status | Meaning |
|--------|---------|
| `healthy` | Content indexed, all files current, no warnings |
| `degraded` | Content indexed but stale files detected or warnings present |
| `failed` | No content indexed, or initialization error |

### Automatic Staleness Recovery

**Threshold Gate** (automatic, in server code): Every 30 seconds, data-returning tool calls trigger a lightweight mtime scan. If any source file is newer than `lastIndexTime`, the server rebuilds before responding. Agents receive fresh data without manual intervention.

**File Watcher** (automatic, backup): Watches source directories and triggers incremental reindex on filesystem events. Primary mechanism for Product MCP (consumer's mutable files); backup mechanism for Docs/Application MCPs.

**Write-Side Protocol** (agent convention): After modifying MCP-relevant content, agents call `rebuild_index` or `rebuild_product_index` for immediate freshness. Documented in agent system prompts.

### Consumer Context Awareness

When MCP data paths are inside `/node_modules/` (installed package), staleness checks and file watchers are skipped — the content is immutable. Product MCP always watches actively (consumer's `product/` directory is mutable).

### Recovery Tools

| Tool | Server | autoApprove |
|------|--------|:-----------:|
| `rebuild_index` | Docs MCP | ✅ |
| `rebuild_index` | Application MCP | ✅ |
| `rebuild_product_index` | Product MCP | ✅ |

---

## Deferred Items

- ~~Product primitives shape → Spec 081~~ ✅ Resolved
- ~~Product MCP tooling and query patterns → Spec 081~~ ✅ Resolved
- Cross-MCP reference detailed patterns → Spec 081, Design Session 2
- Technical integration pattern (depends on packaging vehicle)
- Product token platform generation (CSS, Swift, Kotlin output) → Spec 109
- Product token reference drift detection and validation reporting → Spec 109
