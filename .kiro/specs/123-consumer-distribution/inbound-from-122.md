# Inbound from Spec 122 (Agent Generator) — closeout handback to 123

**Date**: 2026-07-11
**From**: Spec 122 Task 18 (U11 closeout)
**To**: Spec 123 — Consumer Distribution
**Status**: Handback note — what 122 delivered that 123 builds on, and where the 122↔123 boundary sits.

---

## What 122 delivered (123's substrate)

122 built the **agent generator**: one canonical source per agent (`canonical/agents/<agent>.md`) → per-tool
artifacts for **both** runtimes (Claude Code + Kiro), regenerated and diff-guarded, never hand-curated. All 8 agents
are now generator-SSOT (U2 Ada → U9 Stacy). Concretely, 123 can rely on:

- **A canonical source + composition pipeline** (`tools/agent-generator/`): validate → resolve-by-`id` → render →
  emit, with two pluggable **target adapters** (`CcAdapter`, `KiroAdapter`) implementing one `TargetAdapter`
  interface. Adding a target = implement the interface + a skills-map column + field-disposition rows — **no pipeline
  change** (Req 24 AC3, proven by the Kiro adapter landing against the same interface).
- **The CC always-layer, both C11 lanes** (OB-7, closed): lane 1 = the shared always-set → generated `CLAUDE.md`
  `@`-imports (drift-free live references, diff-guarded); lane 2 = per-agent five-class members inlined into each
  `.claude/agents/<agent>.md` (CC has no per-agent import channel). The interim hand-maintained `CLAUDE.md` is retired.
- **The guard surface**: a regenerate-and-diff guard + a canonical-vs-truth check + eight sweeps, registered on the
  125-A PR gate — every generated artifact is diff-guarded.

## The 122↔123 boundary (what 123 owns)

- **Consumer-side CC always-layer delivery is 123's, NOT 122's** (Req 16 AC4). 122 delivered the always-layer for the
  **in-repo** DesignerPunk agents only. A product repo that *installs* DesignerPunk needs its own delivery of the
  identity/always-layer + agent configs to its CC/Kiro runtimes — that packaging + distribution is 123.
- **The Product MCP is intentionally "empty" in the design-system-source repo** — it serves the *installing product's*
  content (principles, templates, domain objects, product components, screens, product tokens), not this repo. Per
  Req 7 AC2 the tool *declarations* still appear in the registry and still drive per-agent cue generation regardless of
  index state; at Stacy's cutover (U9) those 5 product-content tools were routed to Leonardo (the product architect).
  123 is where a real product repo populates that index and the routing becomes live.
- **Cursor is the proof-of-additivity target** (Req 24 AC4) — a third adapter against the same interface, deferred out
  of 122's first cut. The `.cursor/rules/designerpunk-core.mdc` surface is a named residual hand-maintained drift
  surface until a Cursor adapter generates it.

## The adapter seam 123 extends

The `TargetAdapter` interface (`tools/agent-generator/adapters/index.ts`) is the extensibility contract: `emitAgent`,
`emitSkills`, `emitAlwaysLayer`, `toolRef`, `skillRef`, `renderWriteScope`, `dispositions`. A consumer-distribution
target (a product repo's runtime, or Cursor) implements this same interface — the canonical source and pipeline are
unchanged. This is the Rosetta extensibility contract (C4): characterize the new delivery model, write its emitter.

---

*Cross-reference this note from 123's decision record. The reciprocal 119-B handback (122's OB-5/6/7/8/9 dispositions)
lives in `.kiro/specs/119-agent-experience-architecture/119-B-deferred-obligations.md`.*
