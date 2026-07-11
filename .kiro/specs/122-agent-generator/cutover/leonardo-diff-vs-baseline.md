# Leonardo cutover — classified diff vs the current CC agent (U6 merge-gate artifact)

**Date**: 2026-07-11
**Baseline**: `.claude/agents/leonardo.md` @ `main` (`7988f29a`) — the hand CC port
**Generated**: `.claude/agents/leonardo.md` on `task/122-cutover-leonardo` (generator-emitted)
**Rule of the `channel-move` bucket (binding, Group 2 preamble)**: a line is channel-move
ONLY IF its replacement cue passes C7 resolution; otherwise it is a regression. C7 ran
CLEAN on this branch (exit 0). **This is the spec's HIGHEST-EXPOSURE channel-move surface —
Leonardo's ~60% on-demand trim (12 of 20 baseline members).** Every one of those 12 trimmed
docs carries a `replaces:` cue that C7 resolved; had any not resolved, it would be a
regression here.

## Classified diff (every baseline-side difference bucketed)

| # | Baseline content | Bucket | Where it went / why |
|---|---|---|---|
| 1 | `tools:` list (33 tools) | **improvement** | The generated agent grants a STRICT SUPERSET — 39 tools, **zero dropped**, 6 ADDED: docs `find_docs` / `get_index_health` / `rebuild_index` (the hand port omitted the docs-server read/rebuild verbs), application `rebuild_index`, product `get_screen_state_model` / `rebuild_product_index`. No tool regression; the additions are capabilities the hand port lacked. `Skill` is now in his core tools (first agent to declare a skill). |
| 2 | "⚙️ Claude Code Port Note — READ FIRST" block | **improvement** | Hand-adaptations now structurally delivered (namespaced tools → Routing cues; no-hotkeys → runtime-neutral body; write-scope → the `## Write scope` note); stale `.kiro/steering/` path lines corrected to live ids. |
| 3 | Identity roster with `ctrl+shift+*` hotkeys / `/agent swap` | **channel-move** | Carried runtime-neutral; the hand-off TRIGGERS now structured in `routes.agents` (the LE-D1 live instance) and rendered in `## Routing`. |
| 4 | `## MCP Usage` (Application/Docs tool lists + progressive disclosure + rebuild protocol) | **channel-move** | Tool lists → `routes.cues` (15 capability cues, all C7 class (e) declared-verified); progressive-disclosure + rebuild-protocol prose → `## MCP Practice Notes`. |
| 5 | `## Knowledge Lookups` | **channel-move** | Leonardo declares zero knowledgeBases (his hand config wired none); the section rendered no fallback (correct — no `## Knowledge fallback` for a zero-KB agent). His capability lookups are the Application/Product MCP cues. |
| 6 | Cross-platform decision guidance (referenced in body) | **channel-move + improvement** | Superseded by the AMBIENT LAW EMBED: `cross-platform-vs-platform-specific-decision-framework` § "Decision Framework" now inline in `## Ambient (per-agent)` — his silent-failure law, delivered ambient rather than pointed-at. Carrier: `governanceAsLaw`, C7 class (a) VERIFIED (both predicates hold). |
| 7 | `## Onboarding Awareness` (setup loop, `designerpunk init/validate/generate`, MCP-restart note) | **channel-move** | CARRIED into the canonical body (was CC-port-only, absent from his Kiro prompt) — now delivered to BOTH targets (improvement). The stale `mcp__designerpunk-docs__get_document_full` example → a plain Integration-Guide reference; the CLI verbs → `## Commands` (consumer-repo). |
| 8 | `## Testing Practices` (What You Own / Don't Own) | **channel-move** | CARRIED into the canonical body (was CC-port-only) — now on both targets. |
| 9–20 | **The ~60% on-demand TRIM** (12 ambient docs removed from the hand config's resources) | **channel-move ×12** | Each trimmed doc carries a `replaces:` cue that **C7 RESOLVED** (rule of the bucket satisfied on the highest-exposure surface): `component-quick-reference`, `component-readiness-status`, `contract-system-reference`, `platform-implementation-guidelines`, `process-development-workflow`, `process-file-organization`, `process-spec-planning`, `product-token-governance`, `stemma-system-principles`, `technology-stack`, `test-development-standards`, `token-quick-reference` — all → `get_section` (docs) cues, sweep-8 verifying one-for-one coverage (12 removals == 12 `replaces:` keys). Three of these ALSO carry a high-value section route (decision-criteria, spec-tasks-format, product-token-authoring). |
| 21 | Screen Specification mode's `#### Layout Specification` block + Step 3 "Layout structure (REQUIRED)" entry (in BOTH inputs-of-record — Kiro prompt L97–114 and hand CC port) | **regression → FIXED-BEFORE-MERGE** | **Found by Leonardo's seat confirmation (DISPUTED).** My first-draft canonical body compressed Step 3 and DROPPED the Layout Specification content — the REQUIRED-layout mandate, the 5 layout rules (templates-first, canonical vocabulary, responsive-vs-reactive, the 8→12 pressure point, target-breakpoint), and the only pointer to `layout-specification-vocabulary` (which exists in the corpus but had NO route/cue). Ambient-grade for the hub (layout is the REQUIRED spine of every screen spec, his core job), so a real regression, not a channel-move. **Fixed**: the Layout Specification content restored into the Screen Specification body (both targets), + a `routes.docs` entry `layout-vocabulary → layout-specification-vocabulary § "Section 3: Specification Vocabulary"` (sweep-1 live-resolved, C7 clean) so the vocabulary doc is now reachable. See Regression adjudications. |
| 22 | — (generated-side additions: `## Ambient (per-agent)` law embed, `## Routing` — docs+agents+cues, `## Commands`, `## Workflow rules`, `## Write scope`, `## Pre-flight`; the `skills: [impeccable]` round-trip; NO `## Ground truth`) | **improvement** | Net-new structured delivery: inline law; the handoff routing table as `routes.agents` (sparky+thurgood `resolves`, kenya/data/stacy `not-yet-ported` — the LE-D1 live instance); 15 capability cues + 13 doc routes/demotion cues; the DesignerPunk-CLI consumer-repo commands; the Impeccable skill (first non-empty `skills:` — CC `Skill` tool + emitted `.claude/skills/impeccable/**` + Kiro `skill://` resource, sweep-2 round-trip verified). NO `## Ground truth` — his `empty` verdict renders nothing (consumer owns no source; recorded intentional, Req 10 AC2). |

## Baseline subsection reconciliation (Stacy amendment — U6)

Per Stacy's U6 process recommendation: every baseline `###`/`####` subsection is line-item
reconciled here (present / renamed / channel-moved / carried / dropped-with-reason), so body
compressions surface MECHANICALLY rather than depending on the seat noticing. This is the
disciplined response to two body-compression regressions escaping the sweeps this cutover.

| Baseline subsection | Disposition in generated output |
|---|---|
| In Scope / Out of Scope / Direct vs Delegate | present (Domain Boundaries) |
| Product Configuration Context (Spec 094) | carried, heading de-spec-numbered ("Product Configuration Context") |
| Product Tokens (Specs 108/109) | carried, heading de-spec-numbered ("Product Tokens") |
| Screen Spec Steps 1–5 incl. **Layout Specification** | present; Layout Specification RESTORED (see regression row) |
| Lessons Learned mode (What Qualifies / Capture / Request Format) | present |
| Cross-Platform Review (Checklist / What "Consistent" Means) | present |
| Design Creation: Skill Loading / Gate System / Color Strategy / Conflict Resolution / Anti-Slop | present |
| Design Creation: **Lessons-Learned Capture** | RESTORED (was dropped; carried back) |
| Design Creation: Available Commands | present |
| Collaboration Model (Platform Agents / Scope Adaptation / Stacy / System Agents / Peter) | present |
| Application MCP / Product MCP / Docs MCP (Primary/Reference) | channel-move → `routes.cues` (15 capability cues) |
| Progressive Disclosure | channel-move → `## MCP Practice Notes` |
| Write-Side Rebuild Protocol | channel-move → `## MCP Practice Notes` |
| Onboarding Awareness | carried (was CC-port-only) |
| Testing Practices (Own / Don't Own) | carried (was CC-port-only) |
| **Platform Currency Awareness** | RESTORED (was dropped; carried back — see regression row) |
| **Ask If Unsure** | RESTORED (was dropped; carried back — content also covered by always-loaded AI-Collaboration-Principles) |
| Knowledge Lookups | channel-move (zero-KB → no fallback section; capability = MCP cues) |
| Collaboration Standards (Counter-Args / Candid / Bias / Disagree) | present |

**Result: every baseline subsection is present, renamed, channel-moved (with a C7-resolving
carrier), or carried. Zero unexplained drops after the two rounds of fixes.**

## Regression adjudications

| Diff line | Disposition | Reason / fix ref | Owner |
|---|---|---|---|
| Screen Specification mode's Layout Specification block + Step 3 REQUIRED-layout entry — DROPPED with no replacement cue (row 21) | **fixed-before-merge** | Found by **Leonardo's seat confirmation (DISPUTED)** — a REAL catch on the hub's core operational mode. Layout is the REQUIRED spine of every screen spec; content + its only doc pointer (`layout-specification-vocabulary`) both lost. Fixed: content restored (both targets) + `routes.docs` `layout-vocabulary` route (§ "Section 3: Specification Vocabulary", sweep-1 live-resolved). Leonardo re-confirmed. | leonardo (found) / thurgood-main-loop (fix) |
| `### Platform Currency Awareness` (training-data-cutoff guidance: trust platform agents, verify currency for cross-platform decisions, flag to Peter, don't override on outdated knowledge) — DROPPED with no cue (row 22) | **fixed-before-merge** | Found by **Stacy's independent validation (DISPUTED)** via a full baseline-subsection re-diff — a SECOND body-compression regression that BOTH the seat and the first-draft author missed. Real Leonardo-specific content, existing nowhere else. Fixed: restored verbatim-in-substance as `## Platform Currency Awareness`. | stacy (found) / thurgood-main-loop (fix) |
| `### Ask If Unsure` + Design-Creation `### Lessons-Learned Capture` — DROPPED (row 23) | **fixed-before-merge** | Ask-If-Unsure flagged by Stacy as an undisclosed drop (its substance IS covered by always-loaded AI-Collaboration-Principles — a defensible dedupe — but must not be silent); the Design-Creation lessons-capture line surfaced by the exhaustive reconciliation. Both carried back rather than adjudicated away. | stacy / thurgood-main-loop |

**Merge gate: ZERO unexplained regressions — SATISFIED (after two rounds of fixes).** Two
body-compression regression-class defects were found (Layout by the seat; Platform Currency by
the independent gate) and both FIXED-BEFORE-MERGE; the full baseline-subsection reconciliation
above proves no third drop remains. All 12 ambient-doc demotions are channel-moves whose
replacement cues pass C7 (the rule of the bucket, on the spec's largest channel-move surface);
the tool set is a strict superset (no drops). C7 clean; empty-manifest and skills-round-trip honored.

> **Meta-note (the U6 lesson)**: the ~60% trim — the LOUD, high-attention risk — was clean;
> every one of the 12 flagged demotions had a working cue. BOTH real regressions were QUIET
> body compressions in operational-mode prose that the automated checks structurally cannot
> catch (dropped prose with no cue reference is not a tracked demotion). The seat gate caught
> one, the independent gate caught the other — and the process fix (mechanical per-subsection
> reconciliation, above) makes this class surface systematically going forward. Ada's U2
> DISPUTE caught an adapter bug; Leonardo's U6 DISPUTE caught one authoring omission; Stacy's
> U6 DISPUTE caught a second the seat missed. Every gate in the three-gate design bit.

## Kiro-side note (outside the CC diff gate, recorded for completeness)

The regenerated `.kiro/agents/leonardo.json` differs from the hand config by design AND by
defect-fix: the 20-entry deduped baseline (the hand config double-loaded
`Product-Token-Governance` — the known flag, now **fixed by construction**, sweep-3 green) →
10 ambient members (always-set ∪ his one law lock); the 12 trims each carry a
sweep-8-verified `replaces:` cue. The `impeccable` skill emits as a `skill://` resource;
`allowedTools` carries all three MCP servers; grants/writeScope/hooks/shortcut/welcomeMessage
carried. The regenerated `leonardo-prompt.md` mirrors the CC body's structured sections in
Kiro-native form (no `## Ground truth` — empty verdict).
