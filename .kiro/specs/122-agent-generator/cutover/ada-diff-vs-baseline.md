# Ada cutover — classified diff vs the current CC agent (U2 merge-gate artifact)

**Date**: 2026-07-10
**Baseline**: `.claude/agents/ada.md` @ `main` (`9297488e`) — the hand CC port (235 lines)
**Generated**: `.claude/agents/ada.md` on `task/122-cutover-ada` (442 lines, generator-emitted)
**Rule of the `channel-move` bucket (binding, Group 2 preamble)**: a line is channel-move
ONLY IF its replacement cue passes C7 resolution; otherwise it is a regression. C7 ran
CLEAN on this branch (exit 0, grant-surface leg armed) — every claimed channel-move below
cites a C7-verified carrier.

## Classified diff (every baseline-side difference bucketed)

| # | Baseline content | Bucket | Where it went / why |
|---|---|---|---|
| 1 | `tools:` single-line list (6 core + 14 MCP) | **channel-move** | Identical grant SET, rendered as a structured list from `toolSubset` + the CC core-tools rule. Zero tools added/removed (verified by set comparison). |
| 2 | "⚙️ Claude Code Port Note — READ FIRST" block (7 lines) | **improvement** | The port note existed to document hand-adaptations. Each adaptation is now structurally delivered: namespaced tools → rendered Routing cues; no-skills knowledge fallback → the rendered `## Knowledge fallback` section (from `knowledgeBases` declarations); no-hotkeys → runtime-neutral canonical body; write-scope → the field-driven `## Write scope` note. The note's OWN stale line ("Steering doc paths remain under `.kiro/steering/` — no relocation yet") predates 119-A and was WRONG for the current corpus. |
| 3 | Identity roster "(recommend Peter bring them in — no agent-swap hotkeys here)" | **channel-move** | Carried reworded (runtime-neutral); hand-off TRIGGERS now structured in `routes.agents` (lina, thurgood — `not-yet-ported`, C7 class (b) exempt-by-disposition ✓) and rendered in `## Routing`. **Stacy's validation caught this row's render claim as initially FALSE** (neither adapter rendered `routes.agents` — a dangling body pointer on both targets); fixed-before-merge: `renderAgentRoute` added, both adapters render agent routes in Routing (verified: `.claude/agents/ada.md:382-383`, `.kiro/agents/ada-prompt.md:168-169`). |
| 4 | "Out of Scope — that's Lina's/Thurgood's domain" phrasing | **channel-move** | Same content, tightened phrasing; the routing behavior lives in `routes.agents` (see #3). |
| 5 | "You do NOT have write access to `.kiro/steering/` files (behavioral rule — see Port Note…)" | **channel-move** | Carried as the runtime-neutral ballot-model line + the rendered `## Write scope` note (field-driven from `writeScope`, per-target enforcement semantics — Req 11 AC3). |
| 6 | `## Token Governance Levels` (hand-compressed autonomy levels, 18 lines) | **channel-move** | Superseded by the AMBIENT LAW EMBED: `token-governance` § "Token Usage Governance" + § "Token Creation Governance" now inline in `## Ambient (per-agent)` — the FULL law text, not a compression. Carrier: `governanceAsLaw` entry, C7 class (a) VERIFIED (both claims' predicates hold live). |
| 7 | `## MCP Usage Pattern` "When to Query What" table (14 rows, **stale pre-119-A `.kiro/steering/` paths**) | **channel-move + improvement** | Doc-section rows → `routes.docs` (6 routes with verbatim headings, sweep-1 live-resolved) + `routes.cues` (get_section/find_docs per demoted doc); tool rows (search_tokens, get_token_details, get_token_family, get_token_consumers, get_component_full) → cues, all C7 class (e) declared-verified. The stale paths (which no longer resolve post-relocation) are corrected to live ids — the diff's largest single improvement. |
| 8 | "Use `get_document_summary` first to discover exact section headings…" | **channel-move** | The summary-first rule renders in `## Workflow rules` (WORKFLOW_RULES single-source — Req 4; a hand-restatement would now FAIL validation). |
| 9 | `### Write-Side Rebuild Protocol` table | **channel-move** | Carried as `## MCP Practice Notes` prose + two `rebuild_index` cues (docs + application), both C7 live-tool verified. The volatile "30s gate" number dropped (rule-2 hygiene); behavior text kept. |
| 10 | `### MCP Fallback` | **channel-move** | Carried reworded in `## MCP Practice Notes` § Fallback. |
| 11 | `## Knowledge Lookups` (Kiro-KB-unavailable fallback guidance) | **channel-move** | Rendered `## Knowledge fallback` section, generated from the three `knowledgeBases` declarations (globs D-A3-verified: all three resolve to ≥1 match). Same Grep/Glob + application-MCP guidance. |
| 12 | `### Test Commands` (4 commands + timing hints) | **channel-move** | `commands:` frontmatter → rendered `## Commands` (4 entries with cues; C7 class (d) verified incl. the `npm test` builtin-alias parse). Volatile "~1 min" timings dropped; current timings live in the always-loaded start-up-tasks (union member). Jest-not-Vitest kept in body. |
| 13 | Stale counts ("28 components" in the Kiro source; "(34)" correction in the port note) | **improvement** | Both dropped — counts are exactly the volatile-fact class the pipeline lints; `get_component_health` (granted, cue'd) serves current numbers. |
| 14 | — (generated-side additions: `## Ambient (per-agent)` embeds, `## Routing`, `## Commands`, `## Pre-flight` [agentSpawn transform], `## Workflow rules`) | **improvement** | Net-new structured delivery: inline law (C11 lane 2), 20 demotion-coverage cues (sweep-8: all 20 removals covered), shared-catalog members (complete-task tooling + find_docs discovery + record-first rule) the hand port never carried. |

**Baseline parity additions made during classification (fixed-before-merge, not adjudicated):**
the port's table rows for completion-doc guidance and spec-planning standards initially had
no structured carrier — two `routes.docs` entries were added to canonical source
(`completion-documentation-guide` § "Two-Document Workflow"; `process-spec-planning` §
"Tasks Document Format", both sweep-1 live-resolved) before this artifact was finalized.

## Regression adjudications

| Diff line | Disposition | Reason / fix ref | Owner |
|---|---|---|---|
| Generated cue (line 387): application-MCP `rebuild_index` rendered with the DOCS server name (`mcp__designerpunk-docs__rebuild_index (application MCP)`) — **found by Ada's seat confirmation (DISPUTED)**: would have misrouted her write-side rebuild protocol, leaving the token-index stale after `npx designerpunk generate` | **fixed-before-merge** | CC adapter bug: cue tools were namespaced by subset search order, not the cue's own `mcp` field — any ambiguous tool name misroutes. Fixed in `adapters/cc.ts` (`cueToolRef` + fail-loud grant assertion), regression test added (`cc-adapter.test.ts`), `MCP_TO_SERVER` hoisted to the shared adapters module (one seam), regenerated + re-verified (line 387 now `mcp__designerpunk-application__rebuild_index`). Ada re-confirmation recorded in the cutover report. | ada (found) / thurgood (fix) |
| Completion-doc + spec-planning routing (the port's MCP-table rows initially had no structured carrier) | **fixed-before-merge** | Two `routes.docs` entries added to canonical source (both sweep-1 live-resolved) rather than adjudicating an absence. | ada / thurgood |

**Merge gate: ZERO unexplained regressions — SATISFIED (both found regressions fixed-before-merge; all remaining buckets carried by C7-verified channels).**

> **Meta-note for the cutover pattern**: BOTH regression-class defects at this first cutover
> were caught by the designed gates themselves (the seat's content confirmation; the
> classification pass) and fixed before merge — the U2 debut did exactly what the
> low-blast-radius-first sequencing (C11 L5) was for.

## Kiro-side note (outside the CC diff gate, recorded for completeness)

The regenerated `.kiro/agents/ada.json` differs from the hand config by design: the
30-entry baseline decomposes as 27 doc resources + 3 knowledgeBase resources; the 27 doc
resources → 10 (always-set ∪ token-governance; the 20 trims each carry a sweep-8-verified
`replaces:` cue) while the three rich knowledgeBase objects are preserved byte-faithfully
(Req 15 AC2 — so 30 = 27 + 3, and only the doc side shrinks), with
grants/writeScope/hooks/shortcut/welcomeMessage carried. The regenerated
`ada-prompt.md` mirrors the CC body's structured sections in Kiro-native form.
