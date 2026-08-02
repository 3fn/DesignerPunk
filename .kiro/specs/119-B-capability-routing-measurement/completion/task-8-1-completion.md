# Task 8.1 Completion: Inventory + Re-measure All 8 Agents' Catalog Surfaces

**Date**: 2026-08-02 · **Unit**: U-final (`task/119-B-ufinal-catalog-regen`, created early from main per the declared mixed-unit mechanics) · **Type**: Implementation subtask

## D1 re-measure (prior 2026-07-16 scope pass § 7.2 → current 2026-08-02, post-#105 main)

| agent | prior | current |
|---|---|---|
| ada | 35 | 35 |
| data | 21 | 21 |
| kenya | 23 | 23 |
| leonardo | 42 | 42 |
| lina | 49 | 49 |
| sparky | 22 | 22 |
| stacy | 29 | 29 |
| thurgood | 27 | 27 |
| **total** | **248** | **248** |

Zero drift in Routing-row counts across the interval — including across #105's thurgood regen (its return-edge item renders outside `## Routing`). Method: `- WHEN …` lines under `## Routing` in `.claude/agents/*.md` (the generated CC tree; both target trees render from one canonical source). Full catalog surfaces (Routing + Commands + Knowledge fallback + Write scope) extracted per agent as the 8.2 working set.

Also measured for the audit's use: 44 precise `consult <id> § "heading"` routes corpus-wide, 18 agent hand-off rows, the remainder tool cues + generic get_section rows (the promotion-candidate class).
