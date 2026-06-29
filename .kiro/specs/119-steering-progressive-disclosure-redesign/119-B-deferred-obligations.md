# 119-B Deferred Obligations (execution-discovered)

**Date started**: 2026-06-29
**Spec**: 119 (Agent Experience Architecture) — ledger of concrete obligations **handed from 119-A to 119-B during execution**
**Owner**: Thurgood / Docs-MCP infra (unless noted)

> **Scope of this ledger.** This is for **specific, trackable obligations that surfaced while *implementing* 119-A** — not the design-phase deferrals, which are already enumerated in `119-A-steering-relocation-serving-contract/requirements.md` § "Deferred to 119-B (explicitly out of scope here)" and the design-outline pillar mapping. Each entry names what, why deferred, the bounded interim cost, and the owner, so nothing relies on memory.

---

## OB-1 — Cross-ref parser `id`-awareness (so `list_cross_references` enumerates bare-`id` cross-refs)

**Status**: OPEN · **Owner**: Thurgood / Docs-MCP infra · **Surfaced**: 119-A Task 8.5 (2026-06-29)

**What.** Teach the Docs-MCP cross-reference parser (`mcp-server/src/indexer/cross-ref-parser.ts`) to recognize **bare-`id`** markdown link targets (e.g. `[Token Governance](token-governance)`) as cross-references, validated against the doc-`id` set (`idIndex`), so `list_cross_references` and the `crossReferences` array in `get_document_summary` again enumerate them.

**Why this exists.** 119-A Task 8.5 migrated **226 intra-doc cross-references across 43 active `governance/` docs** to the bare-`id` form (Req 10 + the Req 2 AC7 addressing grammar). The **resolver handles bare-`id` fine** (they *resolve* via strategy-1), but the cross-ref *parser* only extracts targets ending in `.md`, so those 226 refs are currently **invisible to cross-ref enumeration**. Refs still resolve when fetched — only the "what links to what" map under-counts for those 43 docs.

**Why deferred (not done in 119-A).** Making the parser `id`-aware is **net-new indexer architecture**, not a tweak: without the `.md` suffix the parser must disambiguate doc-`id` targets from anchors / non-doc links by validating against `idIndex`, but cross-ref extraction runs *during* `indexFile` while `idIndex` is still being built — forcing a **two-pass index** or **query-time resolution**, plus false-positive guards, on a load-bearing property-tested parser. That is 119-B-sized work the design sequenced for later; pulling it forward expands 119-A scope right before the exit gate (Peter-confirmed 2026-06-29).

**Bounded interim cost.** `list_cross_references` / `get_document_summary.crossReferences` under-count for the 43 migrated docs until this lands. **Non-breaking**: no build fails, no doc 404s, refs resolve when fetched; only the cross-link *report* is incomplete. Affects governance/health cross-link tooling and graph-browsing, not normal doc fetch, agent work, or the Task 11 relocation-integrity gate (which resolves via the resolver, not enumeration).

**Done when.** `list_cross_references` returns the bare-`id` cross-refs for the migrated docs (validated against `idIndex`), with disambiguation rules that don't mis-extract non-doc links, and tests covering both.

---

## OB-2 — Sweep the 176 governance-corpus MCP-query `path:` snippets to `id`

**Status**: OPEN · **Owner**: Thurgood / Docs-MCP infra · **Surfaced**: 119-A Task 8.5 (2026-06-29)

**What.** Migrate the ~**176 example `path:` snippets inside `governance/` doc bodies** (e.g. `get_section({ path: ".kiro/steering/Token-Governance.md" })` shown as MCP-query examples) from legacy `.kiro/steering/…` strings to the new `id` form.

**Why deferred.** These are **fallback-covered example snippets** in doc prose (they resolve via the Req 2 AC3 legacy-path fallback), the same class as the 8 prompts' legacy refs that 119-B's prompt-sweep already addresses. 119-A Task 8.5 migrated only the **11** such snippets in the always-loaded **identity** docs; the **176 in `governance/`** were left for the 119-B sweep. **Not a relocation-integrity break** either way.

**Done when.** Folded into the 119-B prompt/snippet sweep to logical `id`s (alongside the 8-prompt 60-ref sweep).

---

## OB-3 — Prune redundant family-doc aliases now covered by the title rank tie-breaker

**Status**: OPEN · **Owner**: Thurgood / Ada / Lina (domain alias owners) · **Surfaced**: 119-A Task 8.4 + 10.4 (2026-06-29)

**What.** Task 8.4 seeded a **uniform family-doc alias backstop** (~15 token-/component-family docs got `X token work` / `X family work` aliases) to fix WEAK family-query ranking. Task 10.4 then landed a `find_docs` **title rank tie-breaker** that addresses the *same* failure mode (title-match out-ranks incidental mention). So some of those uniform aliases are now **redundant with the title** and with the tie-breaker.

**Why deferred.** Pruning mid-119-A would risk re-opening the gate it just cleared. 119-B (discovery-quality/measurement) is the place to re-run the dry-run with candidate aliases removed and prune what the tie-breaker alone now covers — measured, not guessed.

**Done when.** Redundant family aliases removed with a dry-run confirming the gate still clears (no WEAK/MISS) on the tie-breaker alone.

---

## OB-4 — Revisit the discovery-gate threshold (rank ≤ 2 vs reachable-at-strong)

**Status**: OPEN · **Owner**: Thurgood · **Surfaced**: 119-A Task 10.4 (2026-06-29)

**What.** Decision 4 set the hard gate at "correct doc rank ≤ 2 at ≥ partial." In 10.4, four concepts were `strong` but stuck at rank 3–4 — **reachable, not top-2** — which forced the title tie-breaker. Decision 4's own rationale emphasizes *reachability* and warns against "an arbitrary rank-quality number blocking a corpus that already resolves everything."

**Why deferred.** The tie-breaker cleared the gate cleanly, so this is not blocking. But 119-B's measurement half should revisit whether the threshold should be reachability-based (strong at any rank) vs strict rank ≤ 2, informed by this experience — so the gate measures the real risk (unreachable) rather than a rank-quality proxy.

**Done when.** 119-B records a deliberate threshold decision (keep rank ≤ 2, or move to reachability-at-strong) with rationale.

---

## OB-5 — Agent-prompt routing to the steering-addressing conventions doc

**Status**: OPEN · **Owner**: Spec 122 (generator) · **Surfaced**: 119-A Task 12 (2026-06-29)

**What.** 119-A creates the standalone `governance/Steering-Addressing-Conventions.md` (the `id`/filename/`aliases`/grammar conventions) — discoverable via `find_docs` aliases, with enforcement already live (uniqueness guard + Thurgood metadata hook). What's missing is **active routing**: a triggered cue in the relevant agent prompts — `WHEN creating/modifying a steering doc THEN consult Steering-Addressing-Conventions` — so authors reach it proactively, not only by searching.

**Why deferred.** Prompt routing / triggered-cue generation is 119-B/122's capability-catalog half by definition; doing it in 119-A would breach the severable seam (cf. OB-1's lesson). The interim gap is bounded: the metadata hook catches `id` violations regardless of author awareness, and the doc is `find_docs`-discoverable.

**Done when.** 122 generates the triggered cue into the steering-doc-authoring agents' prompts from canonical source.

## OB-6 — Regenerate the Claude Code agent-prompt port (`.claude/agents/*.md`) for the relocation

**Status**: OPEN · **Owner**: Spec 122 (generator) · **Surfaced**: 119-A post-Task-11 review (2026-06-29)

**What.** The five `.claude/agents/*.md` files (ada, lina, thurgood, leonardo, data) are the **Claude Code port** of the canonical `.kiro/agents/*-prompt.md` (created in Spec 121; "the Kiro file is the source of truth — reconcile there"). They are **stale post-119-A**: their port-notes still say "no relocation yet" and their MCP-query examples use `.kiro/steering/…` paths for docs now in `governance/` (e.g. `get_section({ path: ".kiro/steering/Token-Governance.md" })`).

**Severity — NOT a functional break (verified 2026-06-29).** Of the 25 distinct `.kiro/steering/*.md` refs across the five files: **22 resolve via the 119-A legacy fallback, 3 are template placeholders, 0 are uncovered.** Every real reference still resolves (the `.claude` refs overlap the `.kiro` prompts' refs, which seeded the manifest). The interim cost is **stale prose/paths**, plus the direct-`Read`-from-`.kiro/steering` fallback (last resort) now misses for relocated docs — the MCP path works.

**Why deferred.** These are ported/generated artifacts whose canonical source is the Kiro prompt; regenerating them with `governance/` paths is 122's agent-generator job — the same sweep that handles the `.kiro/agents/*-prompt.md` deferrable refs (Task 1 Bucket B). Task 1's coupling sweep focused on `.kiro/agents` and under-named this `.claude` port surface; recording it here so 122 sweeps **both**.

**Done when.** 122 regenerates `.claude/agents/*.md` from canonical source with `governance/` paths + accurate post-relocation notes, alongside the `.kiro` prompt sweep.

## OB-7 — Claude Code always-layer delivery (the 9 identity docs) + retire the interim CLAUDE.md stopgap

**Status**: OPEN · **Owner**: Spec 122 (generator) · **Surfaced**: 119-A post-push review (2026-06-29)

**What.** The 9 identity/always docs in `.kiro/steering/` (personal-note, core-goals, ai-collaboration-principles [incl. the 119-A certainty-calibration rule], spec-feedback-protocol, designerpunk-systems-overview, civitas-system-overview, start-up-tasks, task-completion-protocol, agent-directory) are delivered in Kiro by `inclusion: always`. **Claude Code has no equivalent**: verified 2026-06-29 there is no `CLAUDE.md`, the `.claude/agents/*.md` carry no path references to them, and they are deliberately NOT in the MCP index (governance-only) — so they are not `find_docs`-able and `get_document_summary('core-goals')` → FileNotFound. Only each agent's *role* content is inlined in its `.claude/agents/*.md`; the cross-cutting always-layer is not. **Concrete proof:** the 119-A calibration rule is absent from every `.claude/agents/*.md`. So in CC these important docs can be silently ignored.

**Severity.** Real and live in CC. NOT a 119-A regression — it is a CC-portability gap (Spec 121/122 territory); 119-A worked within the Kiro always-load model, and the relocation is a net win for CC on the 80 governance docs (now MCP-reachable). Only the 9 identity docs are the CC blind spot.

**Interim stopgap (added in 119-A wrap-up):** a project `CLAUDE.md` at repo root that `@import`s the 9 identity docs, providing the CC-native always-load. **Verified end-to-end (2026-06-29):** after a fresh session, a probe subagent received the inlined bodies of `personal-note`, `core-goals`, and `AI-Collaboration-Principles` (incl. the certainty-calibration rule) via the `CLAUDE.md` `@import` block — confirming `./CLAUDE.md` loads here, `@import` expands, and it reaches subagents (Explore/Plan excepted). Caveat: `CLAUDE.md` is snapshotted at session start, so edits to it (or its imports' membership) need a session restart to take effect. **This is INTERIM and MUST be retired/superseded by 122** — do not let two always-layer mechanisms (CLAUDE.md + 122-generated per-agent ambient) coexist past 122. Scope note: the stopgap covers in-repo DesignerPunk CC agents; consumer-side CC always-layer delivery is 122/123 territory.

**Why 122 owns the real fix.** 122's agent generator delivers each agent's ambient/always layer **from canonical source**, fed by 119-A Task 9's per-agent five-class ambient design. That unifies the Kiro (`inclusion: always`) and Claude Code (CLAUDE.md / inlined) delivery into one generated source-of-truth.

**Done when.** 122 generates the always-layer into each agent's CC context from canonical source AND removes the interim `CLAUDE.md` stopgap (or folds it into the generated output), so there is exactly one always-layer mechanism per runtime. (Related: OB-6 regenerates the `.claude/agents` role prompts; OB-7 is the always-*layer* that sits alongside them.)

---

## Informational notes for 119-B (NOT obligations — context the deferred work needs)

### IN-1 — `find_docs` ranking improved mid-119-A (baseline for the measurement case study)

119-A's discovery dry-run gate (Task 10.4) surfaced a `find_docs` ranking weakness and landed a **Layer-3 RANK-only title tie-breaker** in `scoreDoc` (`TITLE_RANK_TIEBREAK`): a query token hitting a doc's *title* edges out an equal-coverage *section/description* mention. **Rank-only — `matchConfidence` (Layer-1) is unchanged**, so nothing in 122/123/119-B that consumes the confidence signal is affected. Documented in `121 discovery-confidence-rubric.md` § "Layer 3" (attributed amendment) + pinned by a guard test.

**Why 119-B needs this:** the deferred **before/after measurement case study** (119-B) must account for this change in its discovery baseline — the dry-run progression on the frozen oracle was **floor 54.2% → lift (aliases) → tie-breaker 94%** rank-1-strong. The 94% figure reflects the tie-breaker, not aliases alone. The frozen oracle (`119-A-.../scripts/__fixtures__/discovery-oracle.ts`) is the non-circular "before" anchor (Req 13 AC7); read this note alongside it so the case study doesn't misattribute the lift.

---

*Append execution-discovered 119-A→119-B obligations here as they surface. Design-phase deferrals live in `119-A-.../requirements.md` § "Deferred to 119-B".*
