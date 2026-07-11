# Lina cutover — classified diff vs the current CC agent (U3 merge-gate artifact)

**Date**: 2026-07-11
**Baseline**: `.claude/agents/lina.md` @ `main` (`c995ffc9`) — the hand CC port (289 lines)
**Generated**: `.claude/agents/lina.md` on `task/122-cutover-lina` (generator-emitted)
**Rule of the `channel-move` bucket (binding, Group 2 preamble)**: a line is channel-move
ONLY IF its replacement cue passes C7 resolution; otherwise it is a regression. C7 ran
CLEAN on this branch (exit 0, grant-surface leg armed) — every claimed channel-move below
cites a C7-verified carrier.

**The gate-pairing note this cutover exists to exercise (L1)**: the hand `lina.json` granted
NO `@designerpunk-application` server despite her law's App-MCP verbs — a defect present in
BOTH current and generated baselines, which this diff is BLIND to by construction. C7's
class-(c) server-grant leg is what catches it; the regenerated config now carries the grant
(fixed by construction, verified in the emitted `.kiro/agents/lina.json` `allowedTools`).
The CC-side tool grants were already correct in the hand port (the port note added the
application MCP by hand); the CC diff therefore shows ZERO tool-set change while the Kiro
config gains a whole server — exactly the diff-blindness the design predicted.

## Classified diff (every baseline-side difference bucketed)

| # | Baseline content | Bucket | Where it went / why |
|---|---|---|---|
| 1 | `tools:` single-line list (6 core + 14 MCP) | **channel-move** | Identical grant SET, rendered as a structured list from `toolSubset` + the CC core-tools rule. Zero tools added/removed (verified by set comparison, both directions). |
| 2 | "⚙️ Claude Code Port Note — READ FIRST" block (8 adaptation lines) | **improvement** | The port note existed to document hand-adaptations; each is now structurally delivered: namespaced-tool mapping → rendered Routing cues (C7 class (e) verified); the hand-added application MCP → canonical `toolSubset` (and the Kiro-side grant fixed by construction, L1); the `validate_component`-isn't-real correction → subset carries only registry-verified tools (C5); stale-counts note ("28 components"→"trust (34)") → both counts dropped, `get_component_health` cue serves current numbers; no-`/knowledge` fallback → rendered `## Knowledge fallback` from the KB declaration; no-hotkeys → runtime-neutral canonical body + `routes.agents`; write-scope → rendered `## Write scope` note (facet-7 enforcement options named). |
| 3 | Identity roster "(recommend Peter bring them in as needed — no agent-swap hotkeys here)" + per-agent bullets | **channel-move** | Carried reworded (runtime-neutral); hand-off triggers structured in `routes.agents` and rendered in `## Routing`. Ada's route carries `disposition: resolves` — the FIRST live `resolves` disposition (she is generator-SSOT since U2); thurgood remains `not-yet-ported` (C7 class (b) exempt-by-disposition). |
| 4 | Scaffolding Step 1/Step 3/Step 6 inline MCP query examples (stale `.kiro/steering/` paths, e.g. `Contract-System-Reference.md` — paths that no longer resolve post-119-A relocation) | **channel-move + improvement** | Steps reworded to point at the routing section's carriers: Concept Catalog route, contracts-yaml-format route, component-meta-authoring-guide cue, data-shapes-trigger route, component-mcp-document-template cue (all sweep-1/C7 live-resolved). The stale paths are corrected to live ids — the diff's largest single improvement. |
| 5 | Contract-authoring naming-convention instruction ("using `{category}_{concept}` naming from the catalog") | **channel-move** | Superseded by the AMBIENT LAW EMBED: `contract-system-reference` § "Naming Convention" + § "Classification Rules" now inline in `## Ambient (per-agent)` — the FULL law text with the no-directional-prefixes rule and purpose-driven classification the hand port never carried. Carrier: `governanceAsLaw` entry, C7 class (a) VERIFIED (both claims' predicates hold live). |
| 6 | `## MCP Usage Pattern` "When to Query What" table (15 rows, stale pre-119-A `.kiro/steering/` paths) | **channel-move + improvement** | Doc-section rows → `routes.docs` (10 routes with verbatim headings, sweep-1 live-resolved: concept-catalog, contracts-yaml-format, schema-structure, data-shapes-trigger, token-usage-law, token-selection-framework, scaffolding-templates, contract-validation-criteria, completion-doc-guidance, spec-tasks-format); tool rows (`get_component_full`, `get_component_catalog`, `get_component_health`, `find_components`, `validate_assembly`, `check_composition`) → cues, all C7 class (e) declared-verified. Every stale path corrected to a live id. |
| 7 | "Use `get_document_summary` first to discover exact section headings…" | **channel-move** | The summary-first rule renders in `## Workflow rules` (WORKFLOW_RULES single-source — Req 4; a hand-restatement in canonical body would now FAIL validation). |
| 8 | `### Application MCP — what it resolves` + schema authoring rule | **channel-move** | Carried near-verbatim in `## MCP Practice Notes` (inheritance/composition/contracts resolution guidance; schemas-list-own-tokens rule). |
| 9 | `### Write-Side Rebuild Protocol` table | **channel-move** | Carried as `## MCP Practice Notes` prose + two `rebuild_index` cues (docs + application, each namespaced by its OWN mcp field — the U2 `cueToolRef` fix riding forward). The volatile "30s gate" number dropped (rule-2 hygiene); behavior text kept. |
| 10 | `### MCP Fallback` | **channel-move** | Carried reworded in `## MCP Practice Notes` § Fallback (schema.yaml/types.ts direct reads + Grep over `src/components/` / `application-mcp-server/`). |
| 11 | `## Knowledge Lookups` (Kiro-KB-unavailable fallback guidance) | **channel-move** | Rendered `## Knowledge fallback` section, generated from the `StemmaComponentSource` declaration (glob D-A3-verified: resolves to matches). The `application-mcp-server/` grep guidance carried in MCP Practice Notes § Fallback. |
| 12 | `### Test Commands` (3 commands + timing hints) | **channel-move** | `commands:` frontmatter → rendered `## Commands` (3 entries with cues; C7 class (d) verified incl. the `npm test -- src/components/` parse). Volatile "~1 min" timings dropped; current timings live in the always-loaded start-up-tasks (union member). Jest-not-Vitest kept in body. |
| 13 | Stale counts ("28 components" in the Kiro source; "(34)" correction in the port note) | **improvement** | Both dropped — counts are exactly the volatile-fact class the pipeline lints; `get_component_health` (granted, cue'd) serves current numbers. |
| 14 | — (generated-side additions: `## Ambient (per-agent)` law embed, `## Ground truth`, `## Routing`, `## Commands`, `## Knowledge fallback`, `## Write scope`, `## Pre-flight`, `## Workflow rules`) | **improvement** | Net-new structured delivery: inline law (C11 lane 2); the FIRST rendered `## Ground truth` section (her `catalog-is-manifest` verdict's assembly-grain faithfulness verbs `get_component_full` + `get_component_health`, both targets, per-target namespacing — the Req 10 AC3 render gap closed at this cutover); 27 demotion-coverage cues (sweep-8: all 27 removals covered); shared-catalog members; the Pre-flight agentSpawn transform. |

**Baseline parity additions made during classification (fixed-before-merge, not adjudicated):**
the port's table rows for the Component Development Guide, Component Templates,
Test-Behavioral-Contract-Validation, and the Component-MCP-Document-Template initially had
no structured carrier — three `routes.docs` entries (token-selection-framework,
scaffolding-templates, contract-validation-criteria; all sweep-1 live-resolved) and one
`get_document_full` cue (component-mcp-document-template) were added to canonical source
before this artifact was finalized. Same class as Ada's U2 parity additions.

## Regression adjudications

| Diff line | Disposition | Reason / fix ref | Owner |
|---|---|---|---|
| _(none as of authoring — populated if the seat confirmation or classification audit surfaces regression-class findings)_ | | | |

**Merge gate: ZERO unexplained regressions — SATISFIED (all buckets carried by C7-verified channels; adjudication table above records any later-found regressions with dispositions).**

## Kiro-side note (outside the CC diff gate, recorded for completeness)

The regenerated `.kiro/agents/lina.json` differs from the hand config by design AND by
defect-fix: the 35-entry baseline decomposes as 34 doc resources + 1 knowledgeBase resource;
the 34 doc resources → 10 (always-set ∪ contract-system-reference; the 27 trims each carry a
sweep-8-verified `replaces:` cue) while the rich `StemmaComponentSource` knowledgeBase object
is preserved field-faithfully — every field and value identical, key order JSON-normalized
(Req 15 AC2; wording per Lina's seat review — so 35 = 34 + 1, and only the doc side shrinks).
`allowedTools` gains `@designerpunk-application` — the L1 defect fixed by construction (the
hand config granted no application server despite the prompt's App-MCP instructions).
grants/writeScope/hooks/shortcut/welcomeMessage carried. The regenerated `lina-prompt.md`
mirrors the CC body's structured sections in Kiro-native form (including `## Ground truth`
with native verb names).
