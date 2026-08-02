# Task 7.1 Completion: V6 Re-probe + Invisible-Ref Re-count

**Date**: 2026-08-02 · **Unit**: OB-1 (`task/119-B-ob1-crossref-parser`) · **Type**: Implementation subtask

## V6 re-probe (R11 AC4 — VERIFIED-UNGUARDED re-probed at the consuming task)

CONFIRMED: `extractCrossReferences` (pre-change) extracts only targets containing `.md` (`cross-ref-parser.ts:53`); bare-id link targets are invisible to `list_cross_references`, `getDocumentSummary.crossReferences`, and the index-health `totalCrossReferences` metric — all three re-extracted at query time with the same `.md`-only filter.

## D1 re-count (the unit's before-evidence)

- **Invisible population (bare-id link targets, both roots): 237 across 47 docs** (2026-08-02; grammar `/^[a-z0-9][a-z0-9-]*$/`, no `/.:#`). Of these, 217 live in indexed `governance/` docs; 20 live in `.kiro/steering/DesignerPunk-Systems-Overview.md` (identity root, never indexed — scanner-visible only).
- **Visible `.md`-style refs: 116** — matches the live index-health `totalCrossReferences: 116` exactly (mutual corroboration of probe and metric).
- Prior figure for context: the scope pass's V6 characterization (population "invisible", no exact count committed) — this count is the first D1-dated inventory.
