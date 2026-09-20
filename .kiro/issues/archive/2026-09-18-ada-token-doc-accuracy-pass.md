# Ada's token-doc accuracy pass (claims-vs-source + guide reviews) — first repo capture

**Date chartered**: 2026-09-18 (at the 5.6 closeout sitting — Peter's capture-before-work instruction)
**Owner**: Ada
**Priority**: MEDIUM (no live defect inside it — the live items were split out; see Non-scope)
**Trigger**: an Ada session at a Peter burst with token-doc capacity; walked by the monthly health-check charter walk
**Why this charter exists — the capture gap it closes**: five separate records route items "to Ada's queued Token-Family claims-vs-source pass," but that queue existed **nowhere as a repo record** — a phantom destination. Routing to an uncaptured queue is how items evaporate; this file is now the queue.

---

## Workstream 1 — Token-Family claims-vs-source pass

Mechanical reconciliation: do each Token-Family doc's stated values, formulas, token names and worked examples match `src/tokens/**` today? Line items already routed here by prior records (verbatim provenance):

1. **TQR:73/:87** — cite `dist/DesignTokens.web.css` **by line number** as evidence for emitted values: unresolvable by construction in a fresh clone, and generated line numbers shift with every token addition (wave-3 Ada advisory A-1; recorded on the `never-hand-edit-generated-token-outputs` row).
2. **DTCG-Integration-Guide.md:231** — shows `color.feedback.success.text -> {color.green400}`, the pre-#152 stale value; corroborates that the WCAG fix did not propagate to documentation surfaces (wave-3 Ada advisory A-2, same row).
3. **TQR path-staleness (~14 rows)** — the family table's path column points at `.kiro/steering/Token-Family-*.md` for docs that live in `governance/` (wave-4 Ada consult; routing settled HERE rather than left ambiguous between this pass and the health check — it is doc accuracy, so it is this pass's item; the health check merely walks this charter).
4. The general sweep: every Token-Family doc's claims vs. source (the pass's original mandate, queued informally since mid-2026 — this charter is its first repo record).

## Workstream 2 — DTCG / Figma guide reviews

Review `DTCG-Integration-Guide.md` and `Figma-Workflow-Guide.md` end-to-end for currency against the shipped pipeline (post-OKLCH-source, post-#150 export-read fix). Queued informally alongside workstream 1; same capture-gap provenance.

## Cross-references (do not re-litigate)

- `2026-09-17-token-family-opacity-disabled-reconciliation.md` — the Opacity disabled-state REWRITE is its own charter (Ada's election, ratified convention D4); this pass edits Opacity only for value/claims accuracy, disjoint content. If sequencing collides, the reconciliation charter goes first (it is HIGH; this is MEDIUM).
- `2026-08-25-dual-color-source-divergence.md` and `2026-09-13-docs-tokens-css-stale-published.md` — source/pipeline defects with their own arcs; this pass consumes their outcomes, never reopens them.

## Verification obligation (D4 convention — stated at capture time)

No gate owns token-doc accuracy. Verification is the pass's own: each corrected claim carries a source citation (`src/tokens/**` path + value) in the fix PR body; post-merge docs-MCP reindex; a closing re-grep of the specific defect patterns above (dist line-number citations; the green400 literal; `.kiro/steering/Token-Family` paths) returning zero.

---

## CLOSED (2026-09-19) — pass executed, both workstreams discharged

Executed by Ada (Opus-tier subagent) at this Peter burst, one session after capture. 88 ledger corrections across 13 files (+393/−306); all four pre-routed items fixed; all 15 Token-Family docs swept (5 CLEAN, 10 corrected); both guides reviewed. The D4 verification obligation discharged: per-correction source citations in the fix PR body; the three closing re-greps at zero (run by Ada, re-run independently by Thurgood); section-citation guard + metadata validator + full suite green. Findings F1–F8 captured at `2026-09-19-token-source-accuracy-followups.md` (F1–F5 Ada source items, F6/F7 Peter adjudications, F8 Lina) — routed, not fixed, per the charter's boundary. Post-merge reindex owed and tracked in the PR.
