# Task 8.1 Completion: The minimal-fixture standing pipeline test (C10.3)

**Date**: 2026-07-10
**Task**: 8.1 Build the minimal-fixture standing pipeline test (Implementation, Tier 2)
**Agent (planned)**: Thurgood — **executed by the main loop (Fable 5)** (crux generation-lane wiring; same continuity rationale as Task 7's subtasks)
**Spec**: 122-agent-generator
**Branch**: task/122-substrate

---

## What was built

1. **`canonical/agents/_fixture.md`** — the C10.3 9th pseudo-agent. Every content class +
   transform disposition exercised with REAL, resolving references: one law ref with a
   mustContain predicate (`token-governance` § "Token Usage Governance"); ground-truth
   verdict `none-standing`; one command per run-context + one named `gap:`; one skill row
   (`skills/_fixture-skill/`, new inert skill + skills-map row, owner thurgood); one doc
   route with verbatim heading (`completion-documentation-guide` § "Two-Document Workflow");
   one `not-yet-ported` agent route (lina); one cue per MCP (all registry-declared);
   toolSubset backing every cue; writeScope (toolsSettings transform); `kiro:` fields
   covering carry (keyboardShortcut, welcomeMessage), transform (agentSpawn), and CC-side
   drop-with-reason.
2. **The generation-lane wiring (`generate.ts`)** — the corpus-session pattern every cutover
   reuses: `buildDocIdToPath` (both resolve-by-id roots, lowercase-basename ids, loud on
   collision), `buildEmbeds` (per-law-entry asserted-section markdown via `get_section`,
   loud on any unresolved section), `extractSectionContent` (envelope→markdown),
   `generateFixture` (validate → resolve → emit through BOTH adapters, all paths remapped
   under `canonical/_fixture-output/<target>/`, plus each target's ambient manifest).
   Outputs: CC agent md, Kiro config + prompt, attribution sidecars, 2 manifests — all
   committed, all inside C6's guarded surface (STANDING test, re-run on every PR — Req 21 AC4).
3. **Sweep 6 scope amendment**: the un-routed declarations-diff (leg 2) now runs over the
   CUTOVER-LEDGER population, not canonical-file presence — the fixture (never in the
   ledger) must not ADJUDICATE-storm 40+ tools no runtime agent routes. The phantom-route
   cue leg still walks every canonical doc, fixture included. (+ test.)

## Three real defects found by the fixture's first end-to-end pass (its job)

1. **Raw-envelope embed (S-D6 class)**: the first emission inlined the docs-MCP JSON
   envelope (`{"section":{...}}`) into the agent prompt instead of the section markdown —
   C7's normalized substring predicate had tolerated it silently. Fixed
   (`extractSectionContent`), regenerated clean.
2. **CC adapter shared-catalog grant coupling, proven fail-loud**: emission threw because
   the shared catalog's `find_docs` cue (Req 10 AC6, propagates to ALL agents) requires
   `find_docs` in every agent's docs subset. Recorded as a CUTOVER AUTHORING RULE: every
   canonical agent's `toolSubset["designerpunk-docs"]` must include `find_docs`.
3. **C7 class (d) parser gap**: `npm test` (npm BUILTIN alias — the exact form core-goals
   mandates) was unparseable → false FAIL. Fixed in `parseScriptName` (+ tests) — this
   would have false-failed every real cutover.

## S-D3 fail-leg — COMPLETE (the Task 6 open item)

Live bite, recorded: scratch-edit the embedded source section (governance/Token-Governance.md
§ "Token Usage Governance") → `diff-guard: FAIL (input-closure-changed)` naming
`changed: canonical/_fixture-output/cc/.claude/agents/_fixture.md` (the regenerated inline
embed ≠ committed) → revert → `no-op-green`. An edit to a resolved-and-embedded section now
fails the gate until the same PR regenerates — the C11 "kept fresh by C6" promise, proven.

## Validation (Tier 2)

- `npm run test:agent-generator` — **288/288** (25 suites; +12 over Task 7: fixture-lane
  helpers, sweep-6 scoping, npm-builtin parser). Typecheck clean.
- All TEN check CLIs green against the fixture-bearing substrate (sweep 1 resolves the
  fixture's law + route refs live; sweep 2 passes 6↔6 rows; C7 clean, 0 findings, exit 0).
- Fixture emitted through both adapters; `noop-probe` → `noop=true` after lock refresh.

## Interpretation calls flagged

1. **Fixture skill emits to the REAL skill trees** (`.claude/skills/_fixture-skill` +
   `.kiro/skills/_fixture-skill`): C10.3's "no runtime ever loads it" governs the AGENT
   artifacts (remapped under `_fixture-output`); the skills pipeline is uniformly
   table-driven, and a special-cased fixture row would need special cases in sweep 2 + the
   emitter (worse). The skill is inert with a "do not invoke" activation description —
   live-verified: this session's harness discovered it and did not activate it.
2. **Embed content = the asserted sections** (heading-scoped, not whole-doc): embeds exactly
   what the seat's predicates declare load-bearing, via the same `get_section` surface the
   resolver checks. Whole-doc embedding would need a corpus surface (`get_document_full`)
   the pipeline deliberately doesn't consume.
3. `steeringIdToPath` is supplied as the same map as `docIdToPath` (superset — always-set
   ids resolve through it); the CC CLAUDE.md lane (Task 17) narrows if needed.

## Delegated-tier capture

Planned `Agent: Thurgood`; executed **main loop (Fable 5)** — the generation-lane wiring is
the substrate's crux seam (three cross-module defects surfaced live). Agent-evolution
signal, not model-evolution.
