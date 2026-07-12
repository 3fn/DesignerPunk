# Stacy (U9) — Classified Diff vs Baseline

**Cutover**: Task 16, Unit U9 — Stacy (product governance & QA) — the FINAL cutover
**Baseline**: `.claude/agents/stacy.md` @ `HEAD` (3e6445a2) — the hand CC port (authored as the transform dry-run, `port-recon-stacy.md`)
**Generated**: `.claude/agents/stacy.md` regenerated from `canonical/agents/stacy.md`
**Gate**: zero unexplained regressions; regressions (if any) adjudicated below.

Stacy WAS CC-ported, so this is a **diff-against-baseline**. She is a differential-auditor with the
`collapses-into-catalog` verdict, so — like Thurgood (U4) — her generated output renders **no `## Ground truth`
section** (the audit commands ARE the provisioning). The generated output adds the always-layer + capability
catalog (inlined law, `## Routing`, `## Commands`, `## Knowledge fallback`, `## Write scope`, `## Pre-flight`),
attributed in the sidecar.

---

## Summary

- **Zero baseline body sections dropped without a channel.** Every baseline `##`/`###` line-item is present,
  channel-moved, or dropped-with-reason (table below).
- **Tool grant IDENTICAL** to the hand port — zero drops, zero adds (verified: baseline `tools:` line == generated).
- **Regression adjudications: none.**
- **Cross-agent change in this PR (documented, not a Stacy regression):** 5 Product-MCP tools were routed to
  **Leonardo** (see § "Leonardo delta").

---

## Baseline-subsection reconciliation table

| Baseline line-item | Classification | Where it lives now / reason |
|---|---|---|
| `> ## ⚙️ Claude Code Port Note — READ FIRST` (+ 5 bullets) | **dropped-with-reason** | Hand-port stopgap meta-note. The generated output IS the port (Req 15 AC1). Its bullets channel-move: MCP-namespacing → rendered tool names; `skill://`-vs-MCP note → the `## Ambient`/`## Routing` split; `/knowledge` note → `## Knowledge fallback`; hotkeys → `## Routing` + keyboardShortcut drop-with-reason; write-scope → `## Write scope`. Nothing lost. |
| `# Stacy …` / `## Identity` | carried | Prose carried; the sibling+system agent roster (Leonardo/Kenya/Data/Sparky/Thurgood/Ada/Lina) condensed into prose — all 7 still named — with the "recommend Peter route / no hotkeys" bit channel-moved to `## Routing`. |
| `## Domain Boundaries` (In Scope / Out of Scope / Audit vs Write) | carried | Verbatim. |
| `## Operational Mode: Process Audit` (Audit Checklist 1–8, Incremental Capture Rule, Audit Output, Audit Is Analysis) | carried | Verbatim — her core value; the "Flag findings for the appropriate agent" list gains a pointer to the Routing section. |
| `## Operational Mode: Parity Review` (Review Process, What Parity Means) | carried | Verbatim. |
| `## Operational Mode: Lessons Synthesis Review` (Your Role, What You Don't Do) | carried | Verbatim; the `get_product_tokens({ promotionCandidate })` shorthand neutralized to prose ("the Product MCP's get_product_tokens with the promotion-candidate filter"), routed via the cue. |
| `## Collaboration Model` (Leonardo / Platform Agents / Thurgood / Peter) | carried | Verbatim; the hand-off targets are also migrated to `routes.agents` (all 5 resolve). |
| `## MCP Usage` (Docs/App/Product MCP tool lists + Progressive Disclosure) | **channel-moved** | → `## Routing` (one triggered cue per audit tool) + `## MCP Practice Notes` (ground-truth-computed, standards-on-demand, Product-MCP maturity caveat, fallback). |
| `## Collaboration Standards` (Counter-Args / Candid / Bias / Ask) | carried | Verbatim; Bias bullets → semicolon prose (all items retained). |
| `## Knowledge Lookups` | **channel-moved** | → `## Knowledge fallback` (rendered from `knowledgeBases`: `.kiro/specs/*/completion/**` + `docs/specs/**` globs). |
| `## Testing Practices` (What You Own / Don't Own) | carried | Verbatim. |

### Generated sections ADDED (the always-layer + catalog)

`## Ambient (per-agent)` (inlines the sole law lock test-development-standards §§ Test Categories / Anti-Patterns),
`## Workflow rules`, `## Routing` (audit cues + 8 demotion cues + 5 resolving agent-routes), `## Commands` (her
6 audit instruments), `## Knowledge fallback`, `## Write scope`, `## Pre-flight`. **No `## Ground truth`** —
`collapses-into-catalog` renders nothing standing (correct, Req 10 AC2). All attributed in the sidecar.

---

## Acceptance signals

- Ambient union **10** on BOTH targets (cc == kiro); sole per-agent lock = **test-development-standards**
  (owner: thurgood); 9 always-set inherited via the union.
- **Baseline 15 → 8 removals** (demotion delta), each `replaces:`-covered (sweep 8 one-for-one): 8 on-demand doc
  demotions, **no artifact trims** (differential-auditor — no dist snapshot).
- Verdict `collapses-into-catalog` → renders nothing standing.
- `agentType: differential-auditor`; **all 5 `routes.agents` resolve** (the full roster is now generator-SSOT) — the
  first cutover whose every agent route resolves.

---

## Leonardo delta (cross-agent change in this PR — the un-routed-tools resolution)

Sweep 6, complete for the first time at the final cutover (all 8 agents SSOT), surfaced **5 Product-MCP tools in no
agent's subset**: `find_principles`, `find_templates`, `get_domain_object`, `get_product_component`,
`list_product_templates`. Per Peter's routing, **Leonardo** (product architect, the Product-MCP consumer) ruled
(2026-07-11): route **all 5 to himself** — each is the product-repo analog of a system-side capability he already
uses; the empty Product-MCP index in this design-system-source repo is index-state, not relevance (Req 7 AC2 — tools
drive per-agent cue generation regardless of index; Product-MCP is populated by the consumer product that installs
DesignerPunk). Applied: 5 tools + 5 `when:` cues added to `canonical/agents/leonardo.md`; his config regenerated in
this PR. Full ruling: `stacy-cutover-report.md` § "Un-routed Product-MCP tools". Leonardo's candid caveat
(`get_domain_object` / `find_templates` overlap existing entries and could be trimmed) is recorded there for Peter.

---

## Regression adjudications

**None.** No baseline content was dropped without a channel; the Stacy tool grant is identical to the hand port.
