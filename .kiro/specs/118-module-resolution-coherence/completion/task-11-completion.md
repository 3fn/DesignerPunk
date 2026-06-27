# Task 11 Completion: Governance — Codify the Module-Resolution Contract in Steering

**Date**: 2026-06-26
**Task**: 11 — codify the module-resolution contract + committed direction + the new practices as steering law via the ballot-measure process (R9)
**Type**: Governance
**Status**: **DONE — applied to steering & docs MCP rebuilt. Spec 118 is COMPLETE.**
**Validation Tier**: Tier 2
**Agent**: Thurgood (draft + apply) ; Ada + Lina (accuracy review) ; Peter (approval) ; main-loop (synthesis, verification, diff review).
**Branch**: `spec-118-module-resolution-coherence`

---

## Process (the ballot-measure model, honored end to end)

Propose → review → approve → apply. No agent edited steering until Peter approved.
1. **Draft (11.1):** Thurgood drafted a 7-item ballot (`findings/task-11-ballot-proposal.md`) + a repo-wide doc-coherence audit (`findings/doc-coherence-audit-2026-06-26.md`, a Peter add-on).
2. **119 reframe (decided with Peter):** Task 11 codifies the contract **content**; **Spec 119 owns consumption** (identity-layer pointer + per-agent routing). The ballot deliberately builds no consumption mechanism; the two hand-offs are registered as input at `119/inbound-from-118.md`. No new agent (119 already rejected a shared coordinating artifact; Thurgood remains Civitas currency steward). Fixed the ballot's inclusion-tier error (RSA is `manual`, not `always`-class) and framed placement for 119's `governance/` relocation.
3. **Accuracy review:** Ada verified items 1/2/6/7 (Rosetta/resolution), Lina verified item 3 (the exemption boundary she authored). Four corrections incorporated (below).
4. **Apply (11.2):** Thurgood applied the corrected text verbatim; main-loop verified every diff; docs MCP rebuilt.

## Accuracy corrections caught by the review (before it became law)
- **Item 2 (ESM):** the "~60–70% structural prep" figure is sourced (`direction-decision.md:60`) but was missing its carve-out — it **excludes the two high-variance drivers** (loader-host re-investigation; jest→ESM across the suite). Named explicitly so "no deferred cost owed by *this spec*" can't be misread as "no future ESM bill."
- **Item 6 (brand):** "the brand is a frozen string" → the brand **key** is a constant namespaced string (`'@3fn/dp:tokenContract'`); the brand *value* is the `RegisteredComponentToken[]` (non-writable). And the guard-method list gained **`registerBatch`** to match the actual `ClassInvariantGuard` regex.
- **Item 3 (exemption):** "The MCP servers'" overstated — only **two of three** (application, docs) carry ts-node dev configs; product-mcp-server has none. Corrected to "Two MCP servers (application, docs)…".
- Lina's "Resolved Decision 2" ordinal flag was verified correct (requirements R12 / design.md:319) — no change.

## What landed in steering (4 docs)
- **`Rosetta-System-Architecture.md`** — new **"Module-Resolution Contract (Spec 118)"** section (Class A/B/C/C′/D table + tsx-sole/return-value/extensionless + single-source-of-truth); **"Committed Direction & the ESM path"** subsection; new **"MCP/Browser Exemption Boundary"** section; **"Cross-Boundary Invariant & the Brand Contract (Spec 124)"** subsection (added *alongside* 124's already-landed self-registration edits at :449/:499 — those untouched); Stage-4/5 orchestrator relabels (pipeline vs platform-generation; the 3rd ValidationCoordinator "(Orchestrator)" deliberately left).
- **`Test-Development-Standards.md`** — **"CI-Enforced Guards (Spec 118)"** subsection + the **Civitas close-state / single-source process guard**.
- **`Technology Stack.md`** — **"Build & Runtime Tooling"**: tsx-is-sole-runtime-TS + the narrow ESLint-exists fact (explicitly NOT repo-wide).
- **`BUILD-SYSTEM-SETUP.md`** — dev line ts-node→tsx + the narrow-ESLint line; corrected the stale `release:analyze` ts-node ref; reframed the moot "Go Full ts-node" future-option to the settled Spec-118 direction.

`Last Reviewed` bumped to 2026-06-26 on all four. **Docs MCP `rebuild_index`: healthy, 89 docs / 2836 sections / 341 cross-refs, zero errors; `validate_metadata` clean on all four.**

## Honest-altitude framing (the Task-11 obligation)
The ballot codifies **settled law** (the contract, the executed CJS direction, the documented exemption, the brand/class-invariant, the two new practices) and **routes the future ESM migration to the roadmap** as a triggered, costed, deliberate decision — never asserted as done. The narrow-ESLint fact leads with "only/NOT repo-wide" so it cannot be read as a general linting practice (repo-wide adoption stays an undecided roadmap item).

## Verification (main-loop)
Every steering diff read and confirmed verbatim against the corrected ballot; 124's :449/:499 lines confirmed untouched; ASCII-box borders confirmed aligned within the doc's existing ±2 tolerance; Last-Reviewed bumps and the MCP rebuild/health confirmed.

## Deliberately NOT done here (handed off / flagged)
- **Consumption wiring** (identity-layer pointer + agent routing rows) → Spec 119 (`119/inbound-from-118.md`); ultimately regenerated by Spec 122 (gated on 118).
- **Directly-editable consumer-doc fixes** (`docs/examples/integrations/*`) — held per Peter; **B1a/B1b need a content decision, not a mechanical fix**: the migration/existing-project guides tell *consumers* to add release scripts pointing at the package's internal `src/` (which they don't have once installed) — broken regardless of ts-node vs tsx. Flagged for Peter. B1c (roadmap draft framing) is a clean fix.

## Cross-references
- `findings/task-11-ballot-proposal.md` (the approved, corrected ballot)
- `findings/doc-coherence-audit-2026-06-26.md` (the doc sweep)
- `119/inbound-from-118.md` (the two consumption hand-offs)
- `findings/mcp-browser-exemption-boundary.md` (Lina's staged exemption finding, item 3's source)
