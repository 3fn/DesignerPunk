# Design Outline: Claude Code Portability & MCP Delivery-Layer Hardening

**Date**: 2026-06-22
**Spec**: 121 — Claude Code Portability & MCP Delivery-Layer Hardening
**Author**: Peter + Claude Code (drafted for Thurgood formalization)
**Status**: Design Outline — ready for formalization
**Feedback panel (reduced, scope-appropriate)**: Thurgood (MCP/governance steward) + Leonardo (heaviest MCP consumer). Rationale: this effort is about MCP-delivery infrastructure and agent-config generation, not token (Ada) or component (Lina) domains. Data may be consulted for the consumer-with-skills angle if a gap surfaces.
**Evidence base**: `.kiro/specs/119-agent-experience-architecture/portability-dry-run-findings.md` (4 seams + 2 probes, all passed; Findings 1–12)

---

## Problem Statement

DesignerPunk's governance, context delivery, and agent system are currently coupled to Kiro-proprietary mechanisms (`#[[file:]]`/`skill://` injection, `resources:`, `toolsSettings`, `auto`/`fileMatch`, `/knowledge`). Portability across development environments — notably a possible/parallel move to Claude Code — is an active strategic goal (see Spec 119). A live dry-run (Spec 119 investigation) ported the MCP servers and three agents (Thurgood, Data, Leonardo) plus the Android + impeccable skills to Claude Code and tested four context seams and two mechanism probes.

**The dry-run validated the portability thesis.** Both halves of the target model — activation in agent prompts, delivery via MCP — work in Claude Code; skills port natively (and are a migration freebie); subagents reach skills and run bundled scripts; agent judgment, boundaries, and candor port intact. **Every real problem found lives in the MCP delivery layer, not in agent behavior**, and hand-porting agents one-by-one is a drift surface.

This spec turns that evidence into buildable work, in two parts.

---

## Design Principles

1. **Portability first** (inherited from Spec 119): minimize tool-proprietary surface; lean on MCP + agent prompts, both of which travel to any tool.
2. **Single source of truth** (the project's own token-pipeline philosophy, applied to agents): define each agent once; *generate* per-tool configs. Never hand-edit generated outputs — the same rule Rosetta enforces for tokens.
3. **Additive / no-regret**: Kiro remains the primary environment until Peter decides otherwise. Nothing here degrades the Kiro stack; the delivery-layer fixes improve Kiro *today* regardless of any migration.
4. **Evidence before ceremony**: this spec covers only what the dry-run made known. Still-exploratory questions stay as spikes.

---

## Goals

**Hard requirements:**
1. **Concept/keyword discovery across both MCPs** — agents can find context they cannot already name (the single systemic gap, Findings 11 + 12).
2. **Token consumption via MCP requires no file reads** — `get_token_details` returns resolved value + per-platform accessor (Finding 9).
3. **Single-source agent generation** — all agent configs generated from one canonical source per agent; zero hand-maintained per-tool duplicates (Finding 4).
4. **Skills handled by the generator** — lift + internal-path repoint automated (`.kiro/skills/…` → `.claude/skills/…`), including bundled scripts (Probes / Finding 6).
5. **No regression to the Kiro environment** — additive; Kiro and Claude Code stay in lockstep via regeneration.

**Benchmarks (track, don't gate):**
6. All 8 agents emitted from canonical source for Kiro + Claude Code (Cursor optional).
7. `find_components` / docs discovery return results for natural-language queries.
8. Reduced agent-prompt maintenance cost (one edit → all tools updated).

---

## Proposed Architecture

The dry-run produced two distinct, separable workstreams. **Recommendation: two formal specs** (see Decision 1).

### Spec 121-A — MCP Delivery-Layer Hardening (the no-regret spine)

The delivery layer is where every real problem lives. Spine = **a discovery story**, plus four point-fixes. Ordered by leverage:

| # | Fix | Finding | Why |
|---|-----|---------|-----|
| A1 | **Concept/keyword discovery** — `find_docs({concept})` on docs MCP (≈50-tok summaries); keyword-index `find_components` (currently taxonomy-only, returns empty on NL) | 11, 12 | The systemic gap. Retrieval works; *discovery* fails on both MCPs. |
| A2 | **`get_documentation_map` pagination/summarization** — currently errors at ~78K chars | 10 | The one cross-domain index that exists is unusable at scale. |
| A3 | **`get_token_details` → add `resolvedValue` + `{platform}Accessor`** | 9 | Removes the forced file-read; completes "delivery via MCP" for token consumption. |
| A4 | **Section addressing** — `get_section` by path+parent or stable IDs (ambiguous on duplicate headings); enforce/encode **summary-first** to prevent silent under-retrieval | 1, 3 | Kills the confident-wrong tail failure. |

All four are portable (help Kiro today) and independent of any migration decision.

### Spec 121-B — Agent Generator (single source → multi-tool)

> **Now Spec 122** — split out and stubbed: `.kiro/specs/122-agent-generator/design-outline.md` (formalization gated on Spec 118's module-resolution direction decision).

A build step modeled on the token pipeline: **one canonical agent definition → per-tool configs.**

```
canonical agent (one source)              transforms                 generated outputs (never hand-edited)
─────────────────────────────            ───────────                 ────────────────────────────────────
identity, domain boundaries,    ──►   tool-specific binding   ──►    Kiro:        .json + prompt.md (resources/skill:///toolsSettings)
routing intent, tools, skills,        + MCP tool namespacing         Claude Code: .md (frontmatter tools + Skill tool)
resource needs                        + skill path repoint           Cursor:      .mdc (optional)
```

- **Canonical schema** separates the *agnostic core* (identity, boundaries, routing intent, which docs/skills it needs) from *per-tool bindings* (how each tool wires resources/tools/skills) — exactly as a token separates value from per-platform output.
- **Transforms** encode the deltas the dry-run catalogued: MCP query syntax → namespaced tool names; `resources:`/`skill://` injection → MCP routing + native skills; `/knowledge` → grep/MCP fallback note; hotkeys removed; write-scope as behavioral note (Claude Code can't path-scope writes); skill internal paths repointed.
- **Skills** are lifted and path-repointed by the generator; bundled scripts travel as-is (proven runnable from a subagent).

### Spec 121-B — Consumer / package scope (`@3fn/core`)

> **Now Spec 123** — split out and stubbed: `.kiro/specs/123-consumer-distribution/design-outline.md` (formalization gated on Spec 118's module-resolution direction decision; F-C1/F-C2/F-C6 feed 118).

The generator is **consumer-facing**, not just an internal build tool. DesignerPunk installs into other projects; those projects choose their own tool. This materially expands 121-B (and is the strongest validation of building it — multi-tool support for *every* consumer, on-brand with the tool-agnostic thesis).

- **`npx designerpunk init` runs the generator for the consumer's chosen tool** (Kiro / Claude Code / Cursor), emitting agent configs + MCP config + skills that point at the **installed package paths** (`node_modules/@3fn/core/...`). Today `init` scaffolds Kiro only.
- **Dual path-context is a hard requirement.** The same canonical agent generates with different base paths: repo-relative in this repo, `node_modules/@3fn/core`-relative in a consumer. The generator owns both. (Generalizes the Q5 relativization.)
- **`package.json` `files[]` additions** — ship the canonical agent sources, the neutral `skills/` root, and the generator. **`npx designerpunk sync`** must detect/repair the new config locations (`.mcp.json`, `.cursor/mcp.json`), not just Kiro's `MCP_STEERING_DIR`.
- **121-A propagates to consumers for free** on `npm update` (MCP servers are bundled in `dist/mcp`) — **provided response-shape changes are additive/backward-compatible** (hard constraint: no breaking changes to `get_token_details` etc.; older consumer expectations must keep working).

---

## Key Design Decisions

### Decision 1 — Two specs, not one
**Selected: split into 121-A (MCP hardening) + 121-B (generator).**
- **Rationale**: different work-types (engineering with concrete interfaces vs. design-led architecture), different risk, different value timing (A is no-regret/now; B is migration/dual-running-contingent). Bolting them together repeats the bounded-scope violation flagged in the module-resolution issue.
- **Counter-argument**: two specs add coordination overhead and a dependency edge. *Mitigation*: they're genuinely independent — A ships value to Kiro alone; B can proceed in parallel. Sequence A slightly ahead since B's generated agents benefit from A's discovery fixes.

### Decision 2 — Discovery is the spine of 121-A
**Selected: build concept/keyword discovery first (`find_docs` + keyword-indexed `find_components`).**
- **Rationale**: Findings 11 + 12 are one systemic gap; it caused the only behavioral fragility observed (slow, diligence-dependent correctness). Highest leverage.
- **Counter-argument**: relatedness/keyword indexing is non-trivial (how is "relevant" decided?). *Mitigation*: start with simple keyword + frontmatter-description matching (cheap, portable); defer semantic ranking.

### Decision 3 — Generator replaces hand-porting (do NOT continue hand ports)
**Selected: build the generator before porting the remaining agents.**
- **Rationale**: hand-porting 6 more agents creates 8 drift surfaces (Finding 4) — the accumulate-without-guard pattern. The generator is the guard.
- **Counter-argument**: a generator is upfront effort; a scrappy hand-port would let Peter "live in" the full team sooner. *Mitigation*: the two probe ports (Data, Leonardo) already provide a usable evaluation environment; the generator is for *sustainable* completion, not first taste.

### Decision 4 — Drop 119's hand-curated Documentation Directory in favor of MCP discovery
**Selected: solve cross-domain discovery at the MCP layer (Decision 2), not via a manually-maintained Directory.**
- **Rationale**: Round 4 showed the absence of discovery hurts, but a hand-curated Directory is itself a drift surface; `find_docs` is portable and self-maintaining.
- **Counter-argument**: a curated Directory offers human-authored grouping a generic index lacks. *Mitigation*: `find_docs` can return frontmatter descriptions + owner; revisit curation only if discovery quality proves insufficient. **This is a recommended amendment to Spec 119.**

### Decision 5 — Relationship to Spec 119
121 is **upstream of** 119, not part of it. 119 (steering progressive disclosure) *consumes* 121-A's discovery + delivery fixes and 121-B's generated agents. 119's own leak-fix (its Phase 2) remains independent and immediate.

### Decision 6 — Dual-running, not migration
**Selected: target sustainable Kiro + Claude Code lockstep; do not commit to leaving Kiro.**
- **Rationale**: the generator makes dual-running cheap; portability value accrues without forcing a migration decision Peter isn't ready to make.

---

## Resolved Decisions (2026-06-22, Peter)

1. **Canonical agent format = Markdown body + YAML frontmatter** (one file per agent). Frontmatter holds the agnostic core + per-tool binding hints; markdown body holds the prompt prose. The generator parses both and emits each tool's shape. *Note:* the `.json`+`.md` split is a Kiro convention; MD+frontmatter is the cross-tool norm (Claude Code, Cursor `.mdc`, Skills, Copilot), so the canonical is near-identity for Claude Code and a transform for Kiro. Rejected: pure YAML (hostile to prose body) and JSON (same).
2. **Skills live in a neutral top-level `skills/` root** — sibling to 119's `governance/` (knowledge), kept conceptually distinct (skills = capability playbooks, not governance). Generator copies/repoints into each tool's location (`.kiro/skills/`, `.claude/skills/`).
3. **`find_components` discovery = hybrid, auto-index-first.** Auto-derive the search index from existing metadata (descriptions, concepts, family, contract/prop names); add an optional `aliases:` field only reactively where real query terms diverge. Avoids the hand-curation drift surface (cf. Decision 4).
4. **Targets: Kiro + Claude Code first; pluggable target-adapter** so Cursor and others are added as a new adapter/transform, not a rearchitecture. *Hard design constraint on 121-B:* adding a target = adding an adapter.
5. **Commit generated configs** (not gitignore) — they are this repo's working dev environment (must be present), small, and PR-reviewable — **paired with a CI/pre-commit guard that regenerates-and-diffs** (fails if committed ≠ fresh generate), turning drift into a loud failure. Precondition: **relativize paths** first (the current `.mcp.json` blocker: absolute machine paths → cwd-relative `args`, since Claude Code launches MCP servers with cwd = project root). Trade-off noted: this diverges from the `dist/`-is-gitignored precedent, justified because agent configs are the dev environment, not a bulky build artifact.

## Open Questions (remaining)

- **Skill internal-path strategy** — do skills reference their own files relatively (portable) or must the generator rewrite internal paths per target? (Dry-run repointed manually.)
- **`get_documentation_map` replacement shape** — paginate the existing tool, or supersede it with `find_docs` + a thin index?

---

## Documentation Requirements

Per the project's **documentation-as-requirement** standard (Process-Spec-Planning: any spec introducing/modifying architecture MUST include documentation requirements as testable EARS criteria), 121 includes a documentation workstream. Ownership is largely Thurgood's Civitas "shared-doc" remit; the consumer Integration Guide is highest priority (customer-facing). Acceptance criteria (authored during formalization, EARS form): each doc exists at its expected path, follows steering metadata standards, cross-references resolve, and examples run where applicable.

**New steering docs:**
- `Tool-Portability-Architecture.md` (NEW) — the pillar: canonical agent format, generator, target adapters, tool-agnostic model.
- Skills governance/authoring (NEW or extend) — neutral `skills/` root, multi-tool packaging, path + bundled-script conventions.
- Agent authoring workflow (NEW or update) — edit canonical source + regenerate; never hand-edit generated outputs.

**Updates to existing docs:**
- `DesignerPunk-Integration-Guide.md` — **highest priority (customer-facing):** per-tool setup (Kiro / Claude Code / Cursor), `init`/`sync` multi-tool flow, installed-package paths.
- `MCP-Evolution-Roadmap.md` — reconcile the 5 delivery-layer findings (now actioned) + Option C.
- `MCP-Relationship-Model.md`, `MCP-Integration-Guide.md` — discovery tools (`find_docs`, keyworded `find_components`); additive response-shape contracts (`resolvedValue`/accessor).
- `BUILD-SYSTEM-SETUP.md` — generator build step + regenerate-and-diff guard.
- `DesignerPunk-Systems-Overview.md`, `Civitas-System-Overview.md` — portability/multi-tool model in architecture + governance overviews.
- `Agent-Directory.md` — canonical-source agent model.
- `README.md` — "broader tool support in progress" → multi-tool reality.
- Spec 119 — Documentation-Directory → `find_docs` amendment (Decision 4).

**Spec split note:** doc updates partition naturally — MCP docs (Evolution-Roadmap, Relationship-Model, Integration-Guide MCP sections) belong to 121-A; generator/agent/skills/portability docs and the per-tool Integration-Guide setup belong to 121-B.

## Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|-----------|
| Generated configs drift from canonical if hand-edited | High | Treat as `dist/`: never edit outputs; CI check that generated files match a fresh generate |
| MCP changes (121-A) regress Kiro consumers | Medium | Additive response fields; version/contract tests; both MCPs already covered by tests |
| Discovery indexing quality is poor (false positives) | Medium | Start keyword+description; measure; defer semantic ranking |
| Two-spec coordination overhead | Low | Independent value; A slightly ahead of B |
| Scope creep into full migration / sprawl | Medium | Decision 6 (dual-running); evidence-before-ceremony principle |

---

## Success Criteria

**Hard:**
1. An agent can discover an unnamed-by-it doc/component via MCP in one call (A1/A2).
2. Token consumption requires zero file reads (A3).
3. All targeted agents emitted from canonical source; editing the source updates every tool's output; no hand-maintained duplicates (B).
4. Skills (incl. bundled scripts) generated with correct per-tool paths (B).
5. Kiro environment unaffected; a fresh generate reproduces current Kiro configs byte-for-byte (or with reviewed, intentional diffs).

**Benchmarks:**
6. `find_components` returns results for the dry-run's natural-language queries that previously returned empty.
7. `get_documentation_map` (or its replacement) loads within limits.

---

## Scope Boundaries

**In scope**: the 4 MCP delivery-layer fixes (121-A); the agent generator + canonical schema + transforms + skill handling (121-B); generating the remaining agents from canonical source; recommending the 119 Documentation-Directory amendment.

**Out of scope**: relocating steering docs (Spec 119); committing to leaving Kiro (Decision 6); semantic/embedding-based discovery ranking (start simple); the RTL governance decision (separate task chip); full i18n; new agent *capabilities* (this is config generation + delivery, not behavior change).

---

## Implementation Estimate (rough, for formalization)

| Phase | Workstream | Effort |
|-------|-----------|--------|
| 1. `get_token_details` resolvedValue+accessor (A3) | 121-A | S |
| 2. `get_documentation_map` pagination (A2) | 121-A | S |
| 3. Discovery: `find_docs` + `find_components` keywords (A1) | 121-A | M |
| 4. Section addressing + summary-first (A4) | 121-A | M |
| 5. Canonical agent schema + transform model (B) | 121-B | M–L |
| 6. Generator: emit Kiro + Claude Code (+Cursor?) | 121-B | M |
| 7. Skill lift + path-repoint automation | 121-B | S–M |
| 8. Generate remaining agents; validate vs current Kiro | 121-B | M |

121-A (phases 1–4) is independently shippable and the recommended lead.

---

## Related Work

- `.kiro/specs/119-agent-experience-architecture/` — consumes this spec; Decision 4 is a recommended amendment to it.
- `.kiro/specs/119-agent-experience-architecture/portability-dry-run-findings.md` — the full evidence base (Findings 1–12).
- `.kiro/issues/2026-06-13-module-resolution-strategy.md` — precedent for "dedicated spec, don't bolt on" discipline (Decision 1).
- Task chip (2026-06-22): "Decide RTL parity governance" — out-of-scope finding surfaced during the dry-run.
