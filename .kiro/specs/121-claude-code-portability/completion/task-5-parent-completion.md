# Task 5 Completion: Discovery Confidence Model — Three-Layer Emit

**Date**: 2026-06-23
**Task**: 5. Discovery Confidence Model — Three-Layer Emit (Req 6)
**Type**: Parent
**Status**: Complete
**Agents**: Lina (components side, Opus) + Thurgood (docs side + stop-word module, Opus), run in parallel; orchestrator (docs-aliases RTL resolution); Peter (approvals)

---

## Artifacts Created / Modified

**Application MCP (Lina — `find_components`):**
- `application-mcp-server/src/query/QueryEngine.ts` — `deriveMatchConfidence` (Layer-1 rubric), three-field emit, `MatchConfidence`/`DiscoveryConfidenceSignal` types.
- `application-mcp-server/src/query/__tests__/deriveMatchConfidence.test.ts` (new, 12 tests) + 7 integration assertions in `QueryEngine.test.ts`.

**Docs MCP (Thurgood — `find_docs` + stop-word module):**
- `mcp-server/src/query/stop-words.ts` (new) — versioned stop-word module.
- `mcp-server/src/indexer/frontmatter-parser.ts` (new) — frontmatter (`name`/`description`/`aliases`) + viability derivation.
- `mcp-server/src/query/QueryEngine.ts` — docs rubric tier derivation, three-field emit, signal-class reconciliation.
- `mcp-server/src/indexer/DocumentIndexer.ts` + `models/DocumentationMap.ts` — `title`/`description`/`aliases`/`viability` on `DocumentMetadata`.
- New tests: `find-docs-rubric.test.ts` (9), `stop-words.test.ts` (5), `frontmatter-parser.test.ts` (6).

**Docs-aliases RTL resolution (orchestrator + Peter-approved):**
- Alias wiring in the docs MCP (frontmatter parser → model → indexer → QueryEngine high-signal class).
- Steering tags (ballot-measure, approved): `aliases:` on `Web-Authoring-Standards.md` + `Component-Family-Form-Inputs.md`.
- `design.md` note recording the docs-aliases extension; Task 7.1 tracks the author-facing doc.

## Implementation Details

### The emit contract (identical across both tools — §Collision)
Three distinct fields, never collapsed: **Layer 1 `matchConfidence: 'strong'|'partial'|'none'`** (tier, not score) ≠ **Layer 2 viability** (components `readiness`; docs `{ placeholder, deprecated }`) ≠ **Layer 3 `rank`** (+ `matchedOn` for auditability). Both tools use the exact field name `matchConfidence` and the same tier values. `matchedOn` is mandatory whenever `matchConfidence` is emitted (Decision 1), so the tier is reconstructable from emitted evidence (P5).

### 5.1 — versioned stop-word module
`mcp-server/src/query/stop-words.ts`: `STOP_WORD_LIST_VERSION` constant + changelog, frozen `ReadonlySet` (consumable by the app MCP as data), `filterSalientTokens`. Wired into the docs `none` gate AND the coverage denominator — a legible knob (making a term a stop word predictably drops it from the denominator).

### 5.2 — per-domain Layer-1 rubric tier derivation (the design-judgment core)
- **Components (Lina):** `strong` = a high-signal hit OR ≥2-token full coverage where ≥1 matched field is high-signal; `partial` = matched only low-signal (incl. single-token); `none` = zero matched. **The validated false-confidence guard:** both paths to `strong` require a high-signal hit, so low-signal-only ≥2-token coverage (e.g. both tokens in a shared `contexts` value) caps at `partial`.
- **Docs (Thurgood):** `strong` = exact multi-token title/heading match OR ≥~50% salient-token coverage with ≥1 high-signal hit; `partial` = medium/low-only or incidental/low-coverage high-signal (body-only/incidental → `partial`, never `none`); `none` = zero salient matches after stop-word normalization. **The incidental-token guard:** a lone high-field token (e.g. "avatar" once in `Token-Family-Sizing`'s description) has sub-threshold coverage → caps at `partial`. Required adding frontmatter parsing — Task 3 never indexed the rubric's high-signal surfaces (`title`/`description`).
- Token tools EXEMPT (Req 6.6 bright line) — neither side applies tiers to predicate/keyed retrieval.

### 5.3 — three distinct fields, additive
Both tools emit the three fields on relevance-ranked discovery results only (keyword/concept), preserving back-compat: `ApplicationSummary` unchanged; `find_docs` empty contract unchanged; list/catalog mode stays unranked (no tier). A `partial` returns ranked below-threshold candidates flagged with their tier (not empty); only genuine `none` yields the empty contract — `partial` vs `none` distinguishable from response shape alone (P4).

### Docs-aliases RTL resolution (Req 1 recall-floor closure)
The `concept: "RTL" / "internationalization"` fixture floor was **unsatisfiable by tokenized matching** — `Web-Authoring-Standards.md` contains the literal term zero times (body included; it says "logical properties"). Resolution (Peter-approved): generalize Req 1.9's reactive `aliases` mechanism to docs — an optional high-signal `aliases:` frontmatter field. Tagged the two fixture docs; **verified end-to-end against the real corpus**: both queries now return exactly the two docs at `strong`. Rather than ship deferred semantic ranking, a curated author declaration bridges the gap.

## Validation (Tier 3: Comprehensive)

✅ Both tools emit Match/Viability/Usability as three distinct, never-collapsed fields
✅ `matchConfidence` derived by per-domain rubric from visible evidence (reconstructable — P5); `matchedOn` mandatory when tiered
✅ Validated false-confidence guards implemented (components: signal-class-gated ≥2-token; docs: incidental high-field token)
✅ Layer-2 viability is a distinct gate (components `readiness`; docs `{ placeholder, deprecated }` — correctly flags placeholder `Component-Family-Modal` as `strong`-but-non-viable)
✅ Governing sequence holds: match-confidence alone never drives action
✅ Additive — `ApplicationSummary` / `find_docs` shapes unchanged; `partial` vs `none` distinguishable from shape (P4)
✅ Stop-word module versioned + legible-knob (Decision 3)
✅ RTL fixture floor satisfied via docs aliases (real-corpus verified: both docs → `strong`)
✅ `tsc` clean both MCPs; **application MCP 249 tests pass; docs MCP 471 tests pass (serial)**

## Requirements Compliance

✅ Req 6.1–6.8 (three distinct fields, tiers-not-scores, governing sequence, viability gate, usability rank, token exemption, calibration-knob tunability, additive)
✅ Req 1 (RTL recall floor now satisfiable via the docs-aliases extension)

## Open Items / Notes

- **Docs `aliases:` author-facing documentation** → folded into **Task 7.1** (`Process-File-Organization.md` metadata-schema entry + `find_docs` mention). Validator needs no change (no closed field set).
- **Pre-existing validator error** in `Web-Authoring-Standards.md` (`screen-implementation` task type) — orthogonal to this work; flagged as a separate background task.
- **Task 4** will pin these tiers at the `callTool` boundary via the calibration fixtures (incl. the now-satisfiable RTL floor).
- Components redundancy: the rubric's two `strong` paths — the second is subsumed by the first (any high-signal hit → `strong`); kept explicit for rubric-fidelity/tunability.

## Related Documentation

- [Task 5 Summary](../../../../docs/specs/121-claude-code-portability/task-5-summary.md)
