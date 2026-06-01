# Task 1.3 Completion: Rewrite No-Argument Routing Logic

**Date**: 2026-06-01
**Task**: 1.3 Rewrite no-argument routing logic
**Type**: Implementation
**Status**: Complete

---

## Artifacts Modified

- `.kiro/skills/impeccable/SKILL.md` — Rewrote § Routing Rules (all 4 rules)

## Implementation Details

### Approach

Replaced the static "show command table, ask what to do" with context-aware recommendation logic. Adopted the upstream's *reasoning pattern* (gather signals → reason over them → recommend 2-3 commands) but replaced the implementation (upstream uses `context-signals.mjs` script reading PRODUCT.md and probing dev servers) with MCP queries and git status.

### Signal Sources

| Upstream Source | Our Replacement | Rationale |
|----------------|-----------------|-----------|
| `context-signals.mjs` JSON output | MCP queries + git status | We don't have PRODUCT.md or dev server probing |
| `setup.hasDesign` / `setup.hasCode` | `get_product_overview()` | Product MCP knows project state |
| `critique.latest` | `find_screens({ status: "in-progress" })` | Screen status is our equivalent of critique snapshots |
| `git.changedFiles` | `git status` (shell) | Same data source, direct access |
| `devServer.running` | Not replaced | Not applicable to our workflow |
| `scan.targets` + detector | Not replaced (Task 2 will add detector) | Detector adoption is a separate task |

### Rules Expanded

- **Rule 1** (no argument): Full context-aware recommendation with signal gathering and reasoning heuristics
- **Rule 2** (command match): Unchanged in behavior, expanded wording for clarity
- **Rule 3** (intent match): NEW — maps unclear intent to commands (upstream's rule 3 pattern). Reduces friction when user says "fix the spacing" instead of typing `layout`.
- **Rule 4** (no match): General design invocation. Was rule 3, now rule 4.

### Key Design Decisions

**MCP over script**: Per Design Decision 3 in the design doc. The script checks for PRODUCT.md, probes dev server ports, reads .impeccable/ directories — none of which exist in our setup.

**Never auto-execute**: Explicit in the rule. Recommendations are suggestions the user confirms.

**Fallback to full table**: When no clear signal exists, the command table is still shown. The recommendation is the lede, not a replacement.

## Validation (Tier 2: Standard)

- ✅ Requirement 5.1: Recommends 2-3 highest-value commands with rationale
- ✅ Requirement 5.2: Uses MCP queries (product overview, screen status) and git status
- ✅ Requirement 5.3: No dependency on `context-signals.mjs` or file-based context
- ✅ Requirement 5.4: Always asks before running (never auto-execute)
- ✅ Requirement 5.5: Falls back to full command table when no clear signal
- ✅ No dangling references to upstream scripts or files
