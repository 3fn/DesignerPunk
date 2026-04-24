# Spec Feedback: Product MCP Intelligence Layer — Requirements

**Spec**: 097-product-mcp-intelligence-layer
**Created**: 2026-04-23

---

## Requirements Feedback

### Context for Reviewers

- Requirements formalized from design outline after Leo R1/R2 feedback incorporation → design-outline.md (updated 2026-04-23)
- 11 requirements, 51 acceptance criteria, all EARS pattern → requirements.md
- Key settled decisions from design outline phase (do not re-litigate):
  - Single `find_screens` tool with 6 params, no dedicated tools → design-outline.md § "Discovery & Search: Single find_screens Tool"
  - Dedicated `tokens:` block per UI tree node, dot-notation names → design-outline.md § "Token Extraction Schema"
  - YAML frontmatter on markdown for principles → design-outline.md § "Principles as Structured Data"
  - Gap detection reads `component-meta.yaml` from disk, no runtime cross-MCP calls → design-outline.md § "Spec-to-Catalog Gap Detection"
  - `_componentGaps` surfaced on screen spec responses → design-outline.md § "Spec-to-Catalog Gap Detection"
  - Test fixtures use WrKing Class domain as inspiration → design-outline.md § "Test Strategy"
  - Flow navigation graph deferred (no M0a flows) → design-outline.md § "Scope Boundaries"

**What to review**: Are the acceptance criteria testable, complete, and technically feasible? Are there edge cases missing? Do the requirements match your workflow needs?

---

**Leonardo**: You shaped the design outline. Confirm the requirements capture your intent — especially Req 1 (find_screens params and behavior), Req 5 (state model extraction), and Req 9 (gap detection surfacing). Flag any AC that doesn't match how you'd actually use these tools.

**Lina**: You'll implement this. Review for technical feasibility — especially Req 2 (reverse index construction during indexing), Req 3 (token extraction from `tokens:` blocks), and Req 9 (reading `component-meta.yaml` from disk). Flag anything that conflicts with the current `product-mcp-server/src/index.ts` architecture.

**Ada**: Outstanding question from THURGOOD R2: Leo recommended dot-notation for token references in screen specs (`color.surface.primary`). Does this align with Rosetta conventions? If you prefer a different format, flag it now — it affects Req 3 (token extraction) and the indexer implementation.

---

### Ada R1 — Token Alignment Review (2026-04-23)

**Disposition**: Requirements are sound from a Rosetta perspective. One confirmed answer, three observations.

#### Dot-Notation Confirmation (Req 3)

**Verdict: Dot-notation aligns with Rosetta conventions. No format change needed.**

Semantic token names are natively dot-notation in the Rosetta system: `color.feedback.error.text`, `color.action.primary`, `space.inset.normal`. Using the same format in screen specs means zero translation between what Leo writes and what the token system calls things.

**Caveat**: The design outline examples use token names that don't exist (`color.surface.primary`, `color.content.primary`). The actual equivalents are `color.structure.surface` and `color.contrast.onLight`. Recommend updating examples to use real token names — fake names that look real create a false sense of correctness.

#### Observation 1: Token Names Aren't Uniformly Dot-Notation

Req 2 AC 2 extracts token names from `tokens:` blocks. The indexer should not assume dot-notation format. Some token families use flat names:
- Color: `color.feedback.error.text` (dot-notation, variable depth)
- Spacing: `space.inset.normal` or `space100` (primitive, flat)
- Typography: `bodyMd`, `labelLg` (flat, no dots)
- Radius: `radiusMd` (flat)

Req 3 AC 2 ("store as-is without transformation") handles this correctly. Just flagging for awareness — the `usesToken` filter should do exact string matching, not assume a naming pattern.

#### Observation 2: Token Gap Detection Is Absent (Intentional, Document It)

Req 9 detects component gaps (`not-found`, `scaffold`). No equivalent exists for tokens — a screen spec could reference `color.doesnt.exist` and nothing would catch it until implementation.

This is the right scope boundary for this spec. But recommend documenting it explicitly in the design outline as a known gap, alongside the deferred flow navigation graph. If token validation is ever added, it'd follow the same pattern — read token registry from disk at index time, same as `component-meta.yaml`.

**Counter-argument**: Strict token validation may be premature. Screen specs might intentionally reference tokens that don't exist yet (aspirational specs). Forcing validation could create a chicken-and-egg problem. Leo should weigh in on whether this matters for his workflow.

#### Observation 3: Req 3 AC 3 Convention Worth Documenting (Req 11)

AC 3 says the indexer SHALL NOT extract token references from `props:` or other fields — only from `tokens:` blocks. This is good discipline (clean extraction target beats exhaustive parsing). Recommend Req 11 (Integration Guide) explicitly documents this convention so spec authors know: if you want a token indexed, it goes in `tokens:`, not in `props:`.

#### No Blockers

Nothing in these requirements conflicts with Rosetta token architecture. Req 3 is technically feasible and the AC are testable. Proceed to design phase when Leo and Lina have weighed in.

---

### Lina R1 — Technical Feasibility Review (2026-04-23)

**Disposition**: Requirements are technically feasible. No blockers. Three implementation concerns, two AC refinements, one architectural observation.

#### Req 2: Reverse Index Construction — Feasible, One Clarification Needed

The current `index.ts` already traverses UI trees for one-off enrichment (`enrichOneOffs` walks `node.component` and `node.children`). Extending that walk to populate reverse indexes for components, tokens, and domain objects is straightforward — same traversal, additional Map writes.

**Concern: UI tree shape isn't locked down.** The current code checks for `spec['ui-tree'] || spec['uiTree']`. The design outline examples use `children` arrays with `component` keys. But there's no schema validation on screen spec UI trees today. If a spec author uses a different nesting key or structure, the traversal silently misses references.

Not a blocker — the indexer should walk the structure it expects and log warnings for anything it can't parse. But Req 2 AC 1 says "SHALL traverse the UI tree and record every component name." That "every" is only as good as the traversal's assumptions about tree shape.

**Recommendation**: Add an AC or note acknowledging that the traversal assumes `children` arrays with `component` string fields. Specs deviating from this structure will have incomplete index coverage, surfaced as a health warning.

#### Req 3: Token Extraction — Feasible, Agree with Ada

Token extraction from `tokens:` blocks is clean — key-value object per node, iterate values, store as-is. Ada's right that `usesToken` should do exact string matching. The mix of dot-notation (`color.feedback.error.text`) and flat names (`bodyMd`, `space100`) means any normalization would be lossy.

No concerns. AC are testable, implementation is a small addition to the existing tree walk.

#### Req 9: Gap Detection — Feasible, Two Issues

**Issue 1: Component source path isn't configurable.** The server currently has one path config (`PRODUCT_DIR` env var). Gap detection needs to read from `src/components/core/*/component-meta.yaml` — a different directory tree. This should be a second env var or constructor param, not hardcoded.

**Recommendation**: Add an AC or design note specifying that the component source directory is configurable (e.g., `COMPONENT_DIR` env var), defaulting to `src/components/core`. Keeps the server portable and testable — test fixtures can point to a mock component directory.

**Issue 2: `component-meta.yaml` doesn't have a `readiness` field.** Checked `Progress-Bar-Base/component-meta.yaml` — it has `purpose`, `usage`, `contexts`, `alternatives`. No `readiness`. Readiness lives in schema YAML files (e.g., `Progress-Bar-Base.schema.yaml`), not `component-meta.yaml`.

This breaks Req 9 AC 3 ("component in catalog with `readiness: scaffold`"). The gap detector would need to read schema YAML files too, or the design needs to specify which file provides readiness. Reading both `component-meta.yaml` (name catalog) and `*.schema.yaml` (readiness) is doable but doubles file I/O during indexing.

**Recommendation**: Clarify whether gap detection reads `component-meta.yaml` only (name existence) or also `*.schema.yaml` (readiness). If readiness matters, AC should specify reading schema files. If only name existence matters, simplify AC 3.

**Counter-argument**: Reading schema files for readiness may be scope creep. The Application MCP already assembles this data. The design outline says "no runtime cross-MCP calls" but doesn't prohibit reading the same source files. Worth asking: is the `scaffold` warning valuable enough to justify additional file reads, or is `not-found` alone sufficient for Leo's workflow?

#### Req 5: State Model Extraction — Feasible, Field Names Need Specification

AC 1 says return "data, states, actions, transitions." Current screen specs don't necessarily use those exact field names — specs have `data-sources`, `state-model`, etc. depending on how Leo writes them.

**Recommendation**: Either the AC should specify exact field names the tool extracts, or the design phase should define the mapping. As written, AC is testable but ambiguous about which spec fields map to which response fields.

#### Req 10: Platform Filtering Fix — Feasible, More Nuanced Than Reordering

The current `resolveScreenSpec` already does filter → enrich → warn. The real fix is making enrichment and warning logic platform-aware. After `filterPlatform` runs, platform branches are collapsed, so the walk naturally sees only relevant components. But the one-off detection heuristic (`node.component.includes('-') && node.component[0] === node.component[0].toLowerCase()`) doesn't account for platform context.

Implementable, just flagging that the fix is about platform-aware heuristics, not just reordering.

#### Architectural Observation: Single-File Server

Current `index.ts` is ~280 lines in a single file. Adding 5 new tools, 3 reverse indexes, gap detection, principles parsing, and template cross-references will roughly triple the code. The design phase should plan for extracting the indexer, reverse indexes, and tool handlers into separate modules. Not a requirements concern, but worth noting now.

#### Summary

| Requirement | Feasibility | Notes |
|-------------|-------------|-------|
| Req 1: Screen Discovery | ✅ Feasible | No concerns |
| Req 2: Reverse Index | ✅ Feasible | Clarify UI tree shape assumptions |
| Req 3: Token Extraction | ✅ Feasible | Agree with Ada on exact matching |
| Req 4: One-off Direct Query | ✅ Feasible | No concerns |
| Req 5: State Model | ✅ Feasible | Specify field name mapping |
| Req 6: Experience Map Enrichment | ✅ Feasible | No concerns |
| Req 7: Template Cross-Refs | ✅ Feasible | No concerns |
| Req 8: Principles | ✅ Feasible | No concerns |
| Req 9: Gap Detection | ✅ Feasible | **Readiness field location is wrong** — needs design clarification |
| Req 10: Platform Filtering | ✅ Feasible | More nuanced than reordering |
| Req 11: Documentation | ✅ Feasible | No concerns |

#### Action Items for Design Phase

1. **Req 9**: Resolve where readiness status comes from (`component-meta.yaml` doesn't have it — schema YAML does). Decide if `scaffold` detection is worth the additional file reads, or if `not-found` alone is sufficient.
2. **Req 9**: Make component source directory configurable (env var), not hardcoded.
3. **Req 2**: Acknowledge UI tree shape assumptions in AC or design notes.
4. **Req 5**: Specify the field name mapping from screen spec keys to state model response fields.
5. **Architecture**: Plan for module extraction in design phase — single file won't scale.

No blockers. Ready for Leo's review, then design phase.

---

### Leonardo R1 — Requirements Review (2026-04-23)

**Disposition**: Requirements capture design outline intent well. No blockers. Two AC refinements needed, one scope question to settle, and responses to Ada and Lina's observations.

---

#### Req 1: Screen Discovery — Confirmed, One Behavioral Note

AC 1–8 match my workflow. The conjunctive multi-filter (AC 6) is exactly right — impact analysis queries are almost always compound.

**Behavioral note for design phase**: AC 5 says `context` matches "type or domain area." These are different things. Type is structural (vertical, flow, feature-page). Domain area is semantic (authentication, settings, legislation). The design should specify whether `context` searches both fields, or whether these become separate params. My preference: `context` does a loose match across type, domain tags, and screen name. But if that's too fuzzy for the indexer, splitting into `type` and `context` is acceptable.

#### Req 2: Reverse Index Construction — Agree with Lina's Clarification

Lina's right that "every component name" (AC 1) is only as good as the traversal's assumptions about tree shape. The AC should acknowledge the expected structure: `children` arrays with `component` string fields. Anything else gets a health warning, not silent omission.

Not a requirements change — a design-phase note. The AC intent is correct.

#### Req 3: Token Extraction — Confirmed, Agree with Ada

AC 1–4 are clean and match the `tokens:` block convention from the design outline.

**Ada's observation about fake token names in examples**: Agreed. The design outline examples should use real token names. I'll correct my own examples when authoring screen specs — `color.structure.surface` and `color.contrast.onLight` instead of the invented names. This is a documentation fix, not a requirements change.

**Ada's observation about non-uniform naming**: Important for Lina's implementation. The `usesToken` filter must do exact string matching. `space100` and `color.feedback.error.text` are both valid token references with completely different naming patterns. No normalization, no dot-splitting, no assumptions.

#### Req 5: State Model Extraction — Confirmed, Field Mapping Needed

AC 1 says "data, states, actions, transitions." Lina's right that screen specs won't necessarily use those exact field names. My likely spec authoring pattern:

```yaml
state-model:
  data-sources:
    - name: bills
      type: domain-object
      object: Bill
  states:
    - name: loading
    - name: loaded
    - name: error
  actions:
    - name: refresh
      trigger: pull-to-refresh
  transitions:
    - from: loading
      to: loaded
      on: data-received
```

So the mapping would be: `data-sources` → data, `states` → states, `actions` → actions, `transitions` → transitions. The tool should extract the `state-model` key (or `stateModel`) from the screen spec and return it as-is. Don't restructure — just slice.

**Recommendation**: Simplify AC 1 to "SHALL return the `state-model` section from the screen spec as-is." The field names within that section are the spec author's concern, not the tool's. This avoids a brittle mapping layer.

#### Req 9: Gap Detection — Scope Decision Needed

Lina identified the real issue: **readiness lives in schema YAML, not `component-meta.yaml`**. I verified this — `component-meta.yaml` has `purpose`, `usage`, `contexts`, `alternatives`. Readiness is in `ComponentName.schema.yaml`.

**My recommendation: drop `scaffold` detection from M0a. Keep `not-found` only.**

Rationale:
- `not-found` is the high-value signal. If a screen spec references a component that doesn't exist anywhere, that's a real gap I need to know about immediately.
- `scaffold` detection requires reading schema YAML files in addition to `component-meta.yaml`, doubling file I/O during indexing for a lower-value signal. A scaffold component at least exists — it's incomplete, not missing.
- The Application MCP already surfaces readiness status. If I need to check whether a component is scaffold, I query `get_component_summary` there. The Product MCP doesn't need to duplicate that.
- This keeps gap detection simple: read `component-meta.yaml` for name existence, flag anything not found. One file type, one check, one signal.

**Revised AC 3**: Remove. AC 1 becomes "read `component-meta.yaml` files to build a catalog of known component names." AC 2 stays as-is (flag `not-found`). No readiness check.

If scaffold detection proves necessary after real usage, it can be added in a follow-up — we'll have the architecture in place.

**Ada's observation about token gap detection**: Agree it's the right scope boundary. Screen specs may intentionally reference tokens that don't exist yet (aspirational specs ahead of token creation). Forcing token validation would create a chicken-and-egg problem. Document as a known gap, don't build it.

#### Req 9: Component Source Directory — Agree with Lina

The component source path must be configurable. `COMPONENT_DIR` env var defaulting to `src/components/core` is the right approach. Keeps the server testable with mock directories.

#### Req 10: Platform Filtering — Agree with Lina

The fix is about platform-aware heuristics, not just reordering. AC as written captures the intent correctly — the design phase needs to specify the implementation approach. No AC change needed.

#### Req 6: Experience Map Enrichment — One Addition

AC 1–5 are good. Missing one filter that `find_screens` has: `usesToken`. If `list_experience_map` supports `usesComponent` and `usesDomainObject` filters, it should also support `usesToken` for consistency. Otherwise I'd have to use `find_screens` for token impact and `list_experience_map` for everything else, which is an odd split.

**Recommendation**: Add AC 6: "WHEN `list_experience_map` is called with `usesToken` THEN the system SHALL return only screens whose UI tree `tokens:` blocks reference that token."

#### Req 11: Documentation — Agree with Ada's Addition

Ada's right that the `tokens:` block convention needs explicit documentation in the Integration Guide. AC 2 covers this. Also agree that the guide should note: tokens in `props:` are NOT indexed. If you want a token discoverable, it goes in `tokens:`.

---

#### Summary of Recommended Changes

| Item | Type | Description |
|------|------|-------------|
| Req 5 AC 1 | Simplify | "Return `state-model` section as-is" instead of specifying field names |
| Req 9 AC 3 | Remove | Drop `scaffold` detection — keep `not-found` only |
| Req 9 AC 1 | Simplify | Read `component-meta.yaml` for name catalog only, no readiness |
| Req 9 | Add note | Component source directory configurable via `COMPONENT_DIR` env var |
| Req 6 | Add AC | `usesToken` filter for experience map consistency with `find_screens` |
| Req 1 AC 5 | Clarify | Define whether `context` searches type, domain tags, or both |

No blockers. Ready for design phase after these refinements.

### Thurgood

#### [THURGOOD R1] — Incorporation Notes (2026-04-23)

All three reviews confirmed no blockers. Incorporating refinements:

**From Ada R1:**
- Dot-notation confirmed. No format change.
- Incorporated: Update design outline examples to use real token names (`color.structure.surface`, `color.contrast.onLight`). → design-outline.md § examples
- Incorporated: Document token gap detection as known gap (intentionally absent). → design-outline.md § "Scope Boundaries"
- Incorporated: Req 11 AC emphasizes `tokens:` block convention — only `tokens:` blocks are indexed. → requirements.md § Req 11

**From Lina R1:**
- Incorporated: Req 9 AC 3 removed (scaffold detection dropped — readiness not in `component-meta.yaml`). → requirements.md § Req 9
- Incorporated: Req 9 adds configurable `COMPONENT_DIR` env var. → requirements.md § Req 9
- Noted for design phase: UI tree shape assumptions, module extraction from single file. → design phase
- Incorporated: Req 5 field mapping resolved per Leo R1 (return `state-model` as-is). → requirements.md § Req 5

**From Leonardo R1:**
- Incorporated: Req 5 AC 1 simplified to "return `state-model` section as-is." → requirements.md § Req 5
- Incorporated: Req 9 AC 3 removed, AC 1 simplified to name catalog only. → requirements.md § Req 9
- Incorporated: Req 6 AC 6 added — `usesToken` filter for experience map. → requirements.md § Req 6
- Incorporated: Req 1 AC 5 clarified — `context` searches type, name, and optional `tags` array. Settled with Peter: build broad search now (negligible cost), tags field works whether populated or not. → requirements.md § Req 1

**Settled with Peter (not from agent feedback):**
- `context` param searches type, name, and optional `tags` array on screen specs. Broader than Leo's minimum (type + name) but avoids future refactor when tags are introduced in Phase 2.
