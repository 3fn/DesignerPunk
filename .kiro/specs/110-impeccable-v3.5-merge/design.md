# Design Document: Impeccable v3.5.0 Merge

**Date**: 2026-06-01
**Spec**: 110 - Impeccable v3.5.0 Merge
**Status**: Design Phase
**Dependencies**: None

---

## Overview

This is a merge operation, not a build. The architecture already exists (our `impeccable-dp` adaptation). The work is: diff upstream changes, selectively adopt improvements, verify no regressions.

---

## Architecture

### Existing Architecture (Preserved)

```
.kiro/skills/impeccable/
├── SKILL.md                    ← DesignerPunk-adapted (MCP context, Design Laws, Conflict Resolution)
├── reference/
│   ├── brand-dp.md             ← DesignerPunk brand register
│   ├── product-dp.md           ← DesignerPunk product register
│   ├── craft.md                ← Command references (to be updated)
│   ├── shape.md
│   ├── audit.md
│   ├── polish.md
│   ├── ... (other commands)
│   └── [domain references]     ← Some removed, some kept
└── scripts/                    ← NEW: detector scripts (upstream-owned subtree)
    └── detector/
```

### Merge Approach

**SKILL.md**: Additive merge into existing sections. New general rules go into "Design guidance" section. New bans go into "Absolute bans" section. New routing logic replaces current no-argument routing rule.

**Reference files**: Individual evaluation. Merge immediately (craft, shape, polish, bolder). Evaluate individually (critique, colorize, typeset, animate). Skip (init, document, extract — replaced by MCP workflow).

**Detector**: Wholesale copy of `scripts/detector/` from upstream. No selective editing. If a rule conflicts, add to exclusion list rather than modifying upstream code.

**brand-dp.md**: Additive merge — add reflex-reject font list and aesthetic lanes with scope note. Don't replace existing DesignerPunk-specific content.

---

## Design Decisions

### Decision 1: Additive Merge over Replace

**Options**: (A) Replace SKILL.md with upstream and re-apply DP adaptations, (B) Additive merge of upstream improvements into existing DP adaptation
**Decision**: B — Additive merge
**Rationale**: Our adaptation restructured the document significantly (MCP context, Design Laws section, Conflict Resolution). Replacing and re-applying risks missing subtle adaptations. Adding new content to existing structure is safer.
**Trade-off**: May miss structural improvements in how upstream organizes content. Acceptable because our structure serves our MCP-first workflow better.

### Decision 2: Detector as Upstream-Owned Subtree

**Options**: (A) Selectively merge detector rules, (B) Wholesale copy and maintain exclusion list
**Decision**: B — Wholesale copy with exclusion list
**Rationale**: The detector is a cohesive engine (rules + cascade resolver + registry). Selective merging would break internal dependencies. An exclusion list is simpler to maintain and update.
**Trade-off**: May include rules we don't need. Acceptable because unused rules have zero runtime cost.

### Decision 3: Routing Logic via MCP (Not Script)

**Options**: (A) Adopt context-signals.mjs, (B) Rewrite routing logic using MCP queries
**Decision**: B — Rewrite using MCP
**Rationale**: The script checks for PRODUCT.md, probes dev server ports, reads .impeccable/ directories — none of which exist in our setup. The *reasoning pattern* is valuable; the implementation is not.
**Trade-off**: Our routing won't have dev-server detection or critique-snapshot awareness until we build equivalents. Acceptable for v1; can enhance later.

---

## Testing Strategy

**Validation approach**: Leonardo executes the merge, then runs `/impeccable critique` and `/impeccable audit` on an existing surface to verify:
1. No errors or broken references
2. Contrast verification fires correctly
3. Anti-slop rules detect known patterns
4. Detector runs without PRODUCT.md dependency
5. Routing recommends context-aware commands

**Regression check**: Verify Conflict Resolution still works by testing a scenario where upstream guidance conflicts with DesignerPunk (e.g., font selection in product register should be blocked).
