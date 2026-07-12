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

**Bundled here (health-check N-1, 2026-06-29):** also repoint `scripts/scan-cross-references.sh` to scan `governance/` (it still globs `.kiro/steering/*.md` only — its coverage shrank to 9 docs post-relocation). Deferred to *this* work rather than fixed during the N-1 metadata-validator repoint, because repointing the scanner before the parser is `id`-aware only produces OB-1 under-counts. (The metadata validator + `governance-check.sh` + `detect-affected-steering-docs.sh` WERE repointed to both roots in the N-1 fix; only the cross-ref scanner waits for parser id-awareness.)

**Routing DECIDED (Peter, 2026-07-05, at 122 requirements ratification):** the scanner repoint stays HERE with OB-1 — the 122 ride-along was declined (122 Requirement 25 AC2; Ada's negative-scope lean, ratified). 122 will not touch the scanner; this entry remains the single home for both the parser work and the repoint.

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

**Status**: **CLOSED** — Spec 122 Task 17 (U10). Both C11 lanes emit from the generator (lane 2 per-agent inline,
per-cutover U2–U9; lane 1 the shared `CLAUDE.md` `@`-imports, wired in Task 17.1) and the interim hand-maintained
`CLAUDE.md` is superseded by the generated, diff-guarded output. Retirement record: ballot
`.kiro/docs/ballots/2026-07-11-claude-md-retirement.md` (record-first, Peter-ratified) + the ratified U10 swap PR
(`task/122-ob7-claude-md`); OB-7 closes at that PR's merge. Exactly one always-layer mechanism per runtime.
Consumer-side CC delivery stays out of scope (123 — Req 16 AC4). · **Owner**: Spec 122 (generator) · **Surfaced**:
119-A post-push review (2026-06-29)

**What.** The 9 identity/always docs in `.kiro/steering/` (personal-note, core-goals, ai-collaboration-principles [incl. the 119-A certainty-calibration rule], spec-feedback-protocol, designerpunk-systems-overview, civitas-system-overview, start-up-tasks, task-completion-protocol, agent-directory) are delivered in Kiro by `inclusion: always`. **Claude Code has no equivalent**: verified 2026-06-29 there is no `CLAUDE.md`, the `.claude/agents/*.md` carry no path references to them, and they are deliberately NOT in the MCP index (governance-only) — so they are not `find_docs`-able and `get_document_summary('core-goals')` → FileNotFound. Only each agent's *role* content is inlined in its `.claude/agents/*.md`; the cross-cutting always-layer is not. **Concrete proof:** the 119-A calibration rule is absent from every `.claude/agents/*.md`. So in CC these important docs can be silently ignored.

**Severity.** Real and live in CC. NOT a 119-A regression — it is a CC-portability gap (Spec 121/122 territory); 119-A worked within the Kiro always-load model, and the relocation is a net win for CC on the 80 governance docs (now MCP-reachable). Only the 9 identity docs are the CC blind spot.

**Interim stopgap (added in 119-A wrap-up):** a project `CLAUDE.md` at repo root that `@import`s the 9 identity docs, providing the CC-native always-load. **Verified end-to-end (2026-06-29):** after a fresh session, a probe subagent received the inlined bodies of `personal-note`, `core-goals`, and `AI-Collaboration-Principles` (incl. the certainty-calibration rule) via the `CLAUDE.md` `@import` block — confirming `./CLAUDE.md` loads here, `@import` expands, and it reaches subagents (Explore/Plan excepted). Caveat: `CLAUDE.md` is snapshotted at session start, so edits to it (or its imports' membership) need a session restart to take effect. **This is INTERIM and MUST be retired/superseded by 122** — do not let two always-layer mechanisms (CLAUDE.md + 122-generated per-agent ambient) coexist past 122. Scope note: the stopgap covers in-repo DesignerPunk CC agents; consumer-side CC always-layer delivery is 122/123 territory.

**Why 122 owns the real fix.** 122's agent generator delivers each agent's ambient/always layer **from canonical source**, fed by 119-A Task 9's per-agent five-class ambient design. That unifies the Kiro (`inclusion: always`) and Claude Code (CLAUDE.md / inlined) delivery into one generated source-of-truth.

**Done when.** 122 generates the always-layer into each agent's CC context from canonical source AND removes the interim `CLAUDE.md` stopgap (or folds it into the generated output), so there is exactly one always-layer mechanism per runtime. (Related: OB-6 regenerates the `.claude/agents` role prompts; OB-7 is the always-*layer* that sits alongside them.)

---

## OB-8 — Routing `not-yet-ported` staleness: C7(b) strict-check + one-time backfill

**Status**: OPEN · **Owner**: Spec 122 (closeout, Task 18 / U11) · **Surfaced**: 122 Task 13 (Data cutover, 2026-07-11)

**What.** Inter-agent routes in generated prompts carry a `disposition` — `resolves` (target is a generated CC agent → hand off directly) or `not-yet-ported` (target not generated yet → route via Peter). The disposition is **authored** in each agent's canonical source and rendered verbatim (`renderAgentRoute`); it is NOT derived from the cutover ledger. So once a target IS cut over, every predecessor still authored `not-yet-ported` for it goes **stale** — the prompt tells the agent "seat not generated yet, route via Peter" for an agent that now exists. Live proof: Sparky's route to Leonardo still says `not-yet-ported` post-U6; after U7, Leonardo's route to `data` is stale. C7 class (b) **exempts** `not-yet-ported` unconditionally, so no check catches it. (The Task 12 completion doc's claim that these "flip automatically by regeneration" is inaccurate — they do not.)

**Severity.** Low-but-real: a generated prompt strands an agent on a false "can't reach them in CC" instruction — the stale-address drift class 122 exists to kill, pointed inward. Not dangerous (adds a Peter-hop), but generated prompts are asserting a falsehood.

**Fix (decided — Peter, 2026-07-11, option A).** (1) A one-time **backfill** flipping every stale `not-yet-ported` whose target is now in the ledger → `resolves`. (2) A **C7(b) sharpening**: a `not-yet-ported` disposition whose target IS in the cutover ledger becomes a FAIL (stale), not an exempt pass. Both land at 122 **closeout (U11), NOT earlier** — arming the strict check before the last cutover would force every remaining cutover (Kenya, Stacy) to edit predecessors' files to flip labels, re-introducing the cross-agent churn the self-contained-PR design avoids. After U9 (Stacy, the last roster agent) every in-roster inter-agent route should be `resolves`; the backfill clears the state and the strict check keeps it clean going forward.

**Done when.** 122 U11 lands the backfill (zero stale `not-yet-ported` for in-ledger targets) + the C7(b) strict-check sharpening, with a prove-it-bites (a stale `not-yet-ported` FAILs).

---

## OB-9 — `owner:` value audit across all generated agents (substance-owner correctness)

**Status**: OPEN · **Owner**: Spec 122 (closeout, Task 18 / U11) · **Surfaced**: 122 Task 13 (Data cutover, 2026-07-11)

**What.** Each `governanceAsLaw` lock in canonical agent source carries `owner:` = the doc's **substance domain owner** (`tools/agent-generator/schema.ts:51` — the adjudicator who rules on predicate mismatches). System-agent cutovers (Ada/Lina/Thurgood) were coincidentally correct (they lock their own docs → `owner: self`). But **consumer** agents lock docs owned by others, and the `owner: self` pattern was copied incorrectly. Sparky (the first consumer) set `owner: sparky` for `contract-system-reference` (Lina's), `product-token-governance` (Ada's), and `web-authoring-standards` (Lina's, per her 2026-07-11 ruling) — all three wrong. Ada flagged the class at Data's cutover; Data (U7) authors his owners correctly (`lina`/`ada`). **Sparky's three are corrected in the same PR that records this obligation**; the OPEN part is the **systematic audit of ALL agents' `owner:` values** at closeout to catch any other latent mismatch (Kenya/Stacy will be authored correctly, but verify).

**Severity.** Low: `owner:` only matters WHEN a check flags a mismatch and a human ruling is needed — a wrong value misroutes that ruling to the wrong expert. Nothing breaks until then.

**Fix (decided — Peter, 2026-07-11).** (1) Sparky's three owners corrected now (this PR): `contract-system-reference` → lina, `product-token-governance` → ada, `web-authoring-standards` → lina. (2) At 122 **closeout (U11)**: a systematic audit of every generated agent's `owner:` values against schema.ts:51, correcting any remaining mismatch; consider a lightweight check (owner ∈ known doc→owner map) so the class cannot silently recur.

**Done when.** 122 U11 records the owner-audit result (every `owner:` matches its doc's substance owner, or an adjudicated exception per doc).

---

## Informational notes for 119-B (NOT obligations — context the deferred work needs)

### IN-1 — `find_docs` ranking improved mid-119-A (baseline for the measurement case study)

119-A's discovery dry-run gate (Task 10.4) surfaced a `find_docs` ranking weakness and landed a **Layer-3 RANK-only title tie-breaker** in `scoreDoc` (`TITLE_RANK_TIEBREAK`): a query token hitting a doc's *title* edges out an equal-coverage *section/description* mention. **Rank-only — `matchConfidence` (Layer-1) is unchanged**, so nothing in 122/123/119-B that consumes the confidence signal is affected. Documented in `121 discovery-confidence-rubric.md` § "Layer 3" (attributed amendment) + pinned by a guard test.

**Why 119-B needs this:** the deferred **before/after measurement case study** (119-B) must account for this change in its discovery baseline — the dry-run progression on the frozen oracle was **floor 54.2% → lift (aliases) → tie-breaker 94%** rank-1-strong. The 94% figure reflects the tie-breaker, not aliases alone. The frozen oracle (`119-A-.../scripts/__fixtures__/discovery-oracle.ts`) is the non-circular "before" anchor (Req 13 AC7); read this note alongside it so the case study doesn't misattribute the lift.

---

*Append execution-discovered 119-A→119-B obligations here as they surface. Design-phase deferrals live in `119-A-.../requirements.md` § "Deferred to 119-B".*
