# Thurgood cutover — classified diff vs the current CC agent (U4 merge-gate artifact)

**Date**: 2026-07-11
**Baseline**: `.claude/agents/thurgood.md` @ `main` (`8e6d6c5b`) — the hand CC port (434 lines)
**Generated**: `.claude/agents/thurgood.md` on `task/122-cutover-thurgood` (generator-emitted)
**Rule of the `channel-move` bucket (binding, Group 2 preamble)**: a line is channel-move
ONLY IF its replacement cue passes C7 resolution; otherwise it is a regression. C7 ran
CLEAN on this branch (exit 0) — every claimed channel-move below cites a C7-verified carrier.

## Classified diff (every baseline-side difference bucketed)

| # | Baseline content | Bucket | Where it went / why |
|---|---|---|---|
| 1 | `tools:` list (20 tools incl. `mcp__designerpunk-application__validate_component`) | **channel-move + improvement** | 19 of 20 carried identically as a structured list from `toolSubset` + the CC core-tools rule. The 20th — `validate_component` — is a REGISTRY GHOST: no such tool exists on the application MCP (C5 introspection; the Lina port note had already flagged it as "not a real tool"). Replaced by the two REAL validation verbs `validate_assembly` + `check_composition` (both registry-verified). A grant pointing at nothing is corrected, not lost. |
| 2 | "⚙️ Claude Code Port Note — READ FIRST" block | **improvement** | Each hand-adaptation is now structurally delivered: namespaced-tool mapping → rendered Routing cues (C7 class (e) verified); no-hotkeys → runtime-neutral canonical body + `routes.agents`; no-skill://-no-/knowledge → Grep/Glob fallback guidance in MCP Practice Notes; the flagged write-scope portability gap → the rendered `## Write scope` note naming the facet-7 enforcement options (the exact "lost guard" the port note said the dry-run existed to surface). The note's own stale line ("Doc paths are still under `.kiro/steering/` — no relocation has happened yet") predates 119-A and was WRONG for the current corpus. |
| 3 | Identity roster + hotkey/`/agent swap` references | **channel-move** | Carried reworded (runtime-neutral); hand-off triggers structured in `routes.agents` — **the first cutover whose agent routes ALL carry `disposition: resolves`** (ada U2, lina U3) — and rendered in `## Routing`. |
| 4 | Operational-mode step 1 blocks (Spec Formalization / Audit / Test Governance) with inline stale `.kiro/steering/` MCP query examples | **channel-move + improvement** | The query examples' doc-section targets → `routes.docs` (8 routes, verbatim headings, sweep-1 live-resolved). Stale paths corrected to live ids. One heading was DEAD in the hand prompt: "Task Type Classification" does not exist in process-task-type-definitions — routed to the live § "Overview" instead. Workflow substance (EARS, INCOSE, tiers, severity ladder) carried verbatim in body. |
| 5 | `## MCP Usage Pattern` "When to Query What" table (13 rows, stale pre-119-A paths) | **channel-move + improvement** | Doc-section rows → `routes.docs` + demotion cues (all C7-verified); tool rows → steward cues (`validate_metadata`, `list_cross_references`, `get_index_health`, `rebuild_index`, application audit verbs). Every stale path corrected to a live id. |
| 6 | Progressive Disclosure Workflow ("Start with get_document_summary… ~200 tokens…") | **channel-move** | The summary-first rule renders in `## Workflow rules` (WORKFLOW_RULES single-source — Req 4; a hand-restatement would now FAIL validation). Volatile token-count estimates dropped (rule-2 hygiene). |
| 7 | `### Write-Side Rebuild Protocol` + `### MCP Fallback` | **channel-move** | Carried as `## MCP Practice Notes` prose + the docs `rebuild_index` cue (C7 live-tool verified). The volatile "30s threshold gate" number dropped (rule-2 hygiene); the exception-handling-only monitoring stance kept. |
| 8 | `## Knowledge Lookups` (3-row KB table: test-infrastructure / mcp-tests / component-tests) | **channel-move + improvement** | The hand KIRO CONFIG defines ZERO knowledgeBase resources — the prompt's KB table described indexes the config never wired (stale-falsehood class, same as Lina's `application-mcp` KB row). Dropped by construction; the real capability (Grep/Glob over `src/__tests__/`, `src/components/*/__tests__/`) carried in MCP Practice Notes § Fallback. |
| 9 | Civitas Steward mode: inline script invocations (`scripts/governance-check.sh --full` etc.) | **channel-move** | The four governance instruments are now first-class `commands:` entries with triggering cues, rendered in `## Commands` — C7 class (d) verifies each script path exists AND is executable at every regeneration (the catalog IS the ground-truth provisioning for this differential-auditor seat; the trigger prose in the body now points at the Commands section). |
| 10 | Test-governance standards references (Test Categories / patterns queries) | **channel-move** | Superseded by the AMBIENT LAW EMBEDS: `test-development-standards` § "Test Categories" + § "Anti-Patterns" now inline in `## Ambient (per-agent)` — the FULL law text the hand port only pointed at. Carrier: `governanceAsLaw` entry, C7 class (a) VERIFIED (both claims' predicates hold live). |
| 11 | Commit/git workflow references (completion flow, commit-message format) | **channel-move + improvement** | Second law embed: `process-development-workflow` § "Task Completion Workflow" inline — **this RESOLVES the 119-A granularity flag by construction**: the assessment kept the doc's git/commit CORE ambient but 119-A could only address doc-grain; the assert mechanism embeds exactly the asserted section, so the core rides ambient while the doc's remaining sections stay on-demand. |
| 12 | `### Test Commands` (5 commands + timing hints) | **channel-move** | `commands:` frontmatter → rendered `## Commands` (4 npm entries + the 4 governance scripts; C7 class (d) verified). Volatile "~1 min" timings dropped; current timings live in the always-loaded start-up-tasks. Jest-not-Vitest kept in body. |
| 13 | — (generated-side additions: `## Ambient (per-agent)` × 2 law embeds, `## Routing`, `## Commands`, `## Workflow rules`, `## Write scope`, `## Pre-flight`; NO `## Ground truth` and NO `## Knowledge fallback`) | **improvement** | Net-new structured delivery: TWO inline law embeds (C11 lane 2); 9 demotion-coverage cues (sweep-8: all 9 removals covered); the OB-5 steering-addressing-conventions cue (Req 14 — new capability the hand port never carried); shared-catalog members. The two ABSENCES are correct by design: `collapses-into-catalog` renders nothing (Req 10 AC2 — ground truth is computed by the script commands, never snapshot), and zero declared knowledgeBases render no fallback section. |

## Regression adjudications

| Diff line | Disposition | Reason / fix ref | Owner |
|---|---|---|---|
| Kiro config: `@figma-console-mcp` grant dropped from `allowedTools` (the three-server `toolSubset` cannot express it) | **accepted-with-reason** | The grant is DEAD: `figma-console-mcp` is not configured in `.mcp.json`, appears in no other agent config, is referenced nowhere in the CC port or the prompt body, and no Figma workflow names Thurgood (Figma work routes via the token/design pipeline). A grant to a server that cannot be reached grants nothing — dropping it loses no capability. If a live figma-console server returns, re-granting is a one-line registry + toolSubset addition. Seat + independent validation both review this adjudication. | thurgood (seat) / thurgood-main-loop (fix) |

**Merge gate: ZERO unexplained regressions — SATISFIED (one accepted-with-reason adjudication above; all other buckets carried by C7-verified channels).**

## Kiro-side note (outside the CC diff gate, recorded for completeness)

The regenerated `.kiro/agents/thurgood.json` differs from the hand config by design AND by
defect-fix: the 18-entry baseline is all doc resources (no knowledgeBase objects); the 18 →
11 (always-set ∪ {test-development-standards, process-development-workflow}; the 9 trims
each carry a sweep-8-verified `replaces:` cue). `allowedTools` changes three ways: GAINS
`@designerpunk-application` (the L1 defect class again — the hand config granted no
application server despite the prompt's audit instructions; fixed by construction), GAINS
`knowledge` (the adapter's uniform Kiro grant set — inert for a seat with no knowledgeBases,
consistent with every generated config), and DROPS `@figma-console-mcp` (adjudicated above).
writeScope/hooks/shortcut/welcomeMessage carried verbatim. The regenerated
`thurgood-prompt.md` mirrors the CC body's structured sections in Kiro-native form.
