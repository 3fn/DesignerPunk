# Inbound to Spec 123 from Spec 119-B

**Date**: 2026-08-02
**From**: Spec 119-B — Capability Catalog, Routing & Measurement (COMPLETE at PR #107's merge, 2026-08-02; all 7 declared units landed)
**To**: Spec 123 — Consumer-side CC delivery (sequencing gates now OPEN: the 125-B U1-c verdict is ratified at #105, and 119-B is complete)
**Author**: Thurgood (main-loop session, Peter-directed)
**Reading contract**: point-in-time counts below follow the D1 rule — never load-bearing; the consuming task re-measures at start. VERIFIED-UNGUARDED claims re-probe at the consuming task (R11 AC4 discipline carries forward).

---

## 1. Surface changes 123 directly consumes

1. **The (b)-grade route form is NEW (R6 AC3 amendment, Peter 2026-08-02, ratified at #106).** ~97 routing rows across all 8 generated prompts now render `THEN consult <doc-id> (summary-first)` — no section heading. Generator contract: `DocRoute.section` is OPTIONAL and `DocRoute.replaces` exists (`tools/agent-generator/schema.ts`, doc-commented). Any 123 tooling that reads `canonical/agents/*.md`, consumes the schema, or re-renders/ports prompts for consumer repos MUST handle section-less routes; sweep-1 verifies them at doc grain, sweep-8 accepts route-borne `replaces` markers.
2. **The certainty-calibration pointer cue is live in all 8 prompts** (one shared `governance-rule` member, `canonical/shared/shared-catalog.yaml#certainty-calibration-cue`). Consumer delivery MUST preserve its signal-scoping discipline: the emitting-tools enumeration is ILLUSTRATIVE (signal emission is the operative test) and its canonical home is `governance/classification-map.md § "certainty-calibration"` (the entry's `enumeration_home` field carries the update trigger). 123 cites that entry; it never independently asserts the emitter list. Same rule for the AICP settled reference delivered via CLAUDE.md `@`-import.
3. **Class-fit accepted misfit (audit finding G1 — do not "fix" silently)**: two rule-shaped shared members (record-first ballot-verification; find_docs discovery) plus the calibration cue deliberately render under `## Commands` in every prompt. The correct fix is a renderer-placement change in BOTH adapters (cc.ts/kiro.ts `renderSharedCatalogMember`), recorded as future work in `findings/catalog-routing-audit.md` § G1. If 123's consumer rendering reorganizes sections, coordinate with that fix — the three entries move together, through the generator, never per-output.

## 2. Verified state 123 can rely on (D1: re-measure at consumption)

4. **Discovery baseline**: 83/83 oracle PASS, rank-1-strong 93.98% (2026-08-02, `findings/measurement-case-study.md` — coverage boundary stated there: the oracle exercises ada/lina/thurgood/leonardo-shaped queries; product-agent surfaces largely unexercised). **Backstop aliases are ZERO** (`findings/alias-prune.md`) — discovery rests on the title rank tie-breaker; do NOT reintroduce `<family> work`-style aliases for docs 123 adds. Discovery-gate law: rank ≤ 2 at ≥ partial (OB-4 decision, task-2 completion doc; measurement-confirmed).
5. **Docs-MCP index health reads `degraded` BY DESIGN**: OB-1 (merged #103) made bare-id cross-refs visible (`crossReferences` 116 → 327 — attribution: task-7 completion doc) and surfaces 6 unresolved bare-id link targets as ONE aggregate warning (5 governance-doc links to never-MCP-served identity docs + 1 fence-extracted teaching placeholder — all recorded content defects, `findings/catalog-routing-audit.md`, awaiting owner fixes). A 123 session reading index health MUST NOT treat this degraded status as a blocker or novel discovery. Corollary for consumer-side cross-ref rendering: identity docs never resolve through the MCP; links targeting them are broken-by-construction on that surface (CC delivery of identity content is the generated CLAUDE.md import set — 122's mechanism).
6. **`list_cross_references` addressing contract (D5, documented + tested)**: accepts doc id → indexed relative path → legacy path, same resolver chain as the other document tools; bare-id targets return as doc ids. Consumer tooling may rely on it.

## 3. Coordination and sequencing

7. **The 119 family root is now `.kiro/specs/119-agent-experience-architecture/`** (rename executed, PR #108, 2026-08-02). 123 docs cite the new path only; the scope pass and family records live there. (This doc's own home is the stable pillar dir `119-B-capability-routing-measurement/`.)
8. **125-B U1b runs next, in parallel with 123** (verdict: PROCEED AS DESIGNED; at-scale params P1–P3 ratified at #105: N=10/wave, per-wave W2/W3 + one shared campaign W1, K=3, waves may overlap). Two consequences: (i) 123's ordinary PRs will likely COUNT in U1b observation windows once waves open — a 123 session should check 125-B wave state at start (the dataset/ballot records are the mechanical source); (ii) U1b waves edit canonical agent sources and regenerate — 123 work that touches the same canonical surfaces coordinates through the PR gate as usual, but interleaving is expected, not anomalous.
9. **`search_tokens` partial-match signal gap stays OPEN** (Ada-owned: `.kiro/issues/2026-07-19-application-mcp-search-tokens-partial-match-signal.md`). Consumer-facing calibration teaching stays signal-scoped: teach `matchConfidence` only on emitting surfaces; stay silent (or state degraded behavior) on signal-less ones.
10. **Remaining (c) rows are deliberate**, with recorded rationale (technology-stack on 4 agents — exploratory; cross-platform file paths on 3 — doc-indeterminate): `findings/catalog-routing-audit.md`. A 123-era audit re-flagging them should read the rationale first.

## 4. Pointers (the record, not restatements)

- Findings: `findings/measurement-case-study.md` · `findings/alias-prune.md` · `findings/catalog-routing-audit.md` (incl. § "8.3 Owner-Confirmation Record" + § "Task 9 verification record")
- Closeout + deviations register: `completion/task-10-completion.md`
- The R6 AC3 amendment record: `completion/task-9-2-completion.md` (scope), ratified at #106
- Calibration law: `governance/classification-map.md § "certainty-calibration"` (canonical enumeration home)
