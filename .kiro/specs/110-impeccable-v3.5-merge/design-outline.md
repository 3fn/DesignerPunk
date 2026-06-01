# Design Outline: Impeccable v3.5.0 Merge

**Spec**: 110 - Impeccable v3.5.0 Merge
**Date**: 2026-06-01
**Status**: Design Outline
**Agent**: Thurgood (governance) + Leonardo (content correctness)

---

## Problem Statement

Impeccable v3.5.0 shipped with significant craft improvements (anti-slop rules, typography defaults, contrast verification, new detector rules, harness-specific compilation). Our `impeccable-dp` adaptation is based on an earlier version and misses these improvements. However, our adaptation made deliberate architectural choices (MCP-based context loading, DesignerPunk-specific design laws, conflict resolution hierarchy) that must be preserved.

We need to merge upstream improvements without regressing our DesignerPunk-specific adaptations.

---

## Context

### Current State

Our `impeccable-dp` skill (v1.0.0) is a customized fork that:
- Replaces file-based context loading (`context.mjs`, `PRODUCT.md`, `DESIGN.md`) with MCP queries
- Replaces `brand.md` / `product.md` with DesignerPunk-specific register references (`brand-dp.md`, `product-dp.md`)
- Adds DesignerPunk Design Laws (8px grid, semantic tokens, Rajdhani/Figtree/Commit Mono, motion rules)
- Adds Conflict Resolution hierarchy (DP tokens > DP rules > DP contracts > Impeccable domain > Impeccable taste)
- Excludes `teach`/`document` commands (replaced by MCP authoring workflow)
- Removes several reference files folded into MCP-based approach

### Upstream Changes (v3.5.0)

Key improvements to evaluate for merge:

**SKILL.md (General Rules):**
- Contrast verification rule (4.5:1 body, 3:1 large text)
- Font count cap (≤3 families)
- Font pairing guidance (contrast axis, not similarity)
- No all-caps body copy rule
- Hero heading ceiling (≤6rem) and letter-spacing floor (≥-0.04em)
- `text-wrap: balance` on h1-h3, `text-wrap: pretty` on prose
- z-index semantic scale guidance
- Dropdown overflow-hidden warning
- Em-dash ban
- Marketing buzzword ban
- Aphoristic-cadence ban
- Updated motion rules (premium motion materials, reveal animation guidance)
- Updated absolute bans (eyebrow ban strengthened, numbered section markers added, text overflow added)
- Cream/beige body background ban (warm-neutral band detection)
- Second-order category-reflex check
- "New projects only" section with color strategy vocabulary

**Reference files:**
- `brand.md` — updated with reflex-reject aesthetic lanes, font selection procedure, second-order slop test
- `product.md` — needs diff against our `product-dp.md`
- `craft.md`, `shape.md`, `audit.md`, `polish.md`, etc. — workflow improvements in each
- `init.md` (new) — replaces `teach`, project setup
- `document.md` (new) — generates DESIGN.md from code
- `extract.md` (new) — replaces our `extract-dp.md`

**Scripts:**
- `context-signals.mjs` (new) — project state analysis for smart command routing
- `palette.mjs` (new) — brand seed color generation
- Detector engine rebuilt (20x faster, 14 new rules, no jsdom)

**Structural:**
- Harness-specific rule compilation (Claude gets Claude-tuned rules)
- "Existing project" behavior (reads tokens/theme/components first)
- Self-update check mechanism
- Pin/Unpin command shortcuts

---

## Merge Strategy

### Preserve (do not change)

- MCP-based context loading (our architectural choice)
- DesignerPunk Design Laws section (our system-specific rules)
- Conflict Resolution hierarchy
- `brand-dp.md` and `product-dp.md` (DesignerPunk-specific register references)
- Exclusion of `init` and `document` commands (replaced by MCP workflow)

### Merge (adopt upstream improvements)

- Updated general rules into our Design Laws (where they don't conflict)
- Updated absolute bans
- Anti-slop improvements (cream ban, second-order reflex check)
- Typography improvements (text-wrap, heading ceiling, letter-spacing floor)
- Copy rules (em-dash ban, buzzword ban, aphoristic-cadence ban)
- Updated command reference files (craft, shape, audit, polish, etc.)
- New detector scripts (if compatible with our setup)

### Evaluate (needs investigation)

- Harness-specific compilation — does this benefit us or conflict with our MCP approach?
- `context-signals.mjs` — could enhance our no-argument routing without replacing MCP
- `palette.mjs` — irrelevant for DesignerPunk (our palette is system-defined) but may be useful for product brand work
- `extract.md` vs our `extract-dp.md` — which is better for our governance-aware extraction?
- Reference files we removed (typography.md, color-and-contrast.md, etc.) — did v3.5.0 improve them enough to reconsider?

### Skip (not applicable)

- `PRODUCT.md` / `DESIGN.md` file-based workflow (we use MCP)
- `init` command (we use MCP authoring)
- `document` command (we use MCP authoring)
- Self-update check (we manage versions manually)
- Pin/Unpin (nice-to-have, not priority)

---

## Risks

1. **Conflict between upstream rules and DesignerPunk Design Laws** — e.g., Impeccable's font selection procedure vs our "fonts are system-defined" rule. Conflict Resolution hierarchy handles this, but we need to verify no upstream rule sneaks past it.

2. **Reference file drift** — If we merge updated reference files, they may contain guidance that conflicts with DesignerPunk's token system or component architecture. Each file needs individual review.

3. **Script compatibility** — New scripts assume file-based context (PRODUCT.md). If we adopt the detector, we need to verify it works without that assumption.

---

## Success Criteria

- Leonardo's design output quality improves (anti-slop, typography, contrast)
- No regression in DesignerPunk-specific behavior (tokens, MCP, design laws)
- Conflict Resolution hierarchy still correctly prioritizes DesignerPunk over Impeccable
- Updated reference files don't introduce guidance that contradicts our system
- Clear documentation of what was merged, what was skipped, and why

---

## Stakeholder Review

- **Leonardo** — primary consumer, should validate that merged content improves his output
- **Thurgood** — governance, ensures merge doesn't break steering doc alignment
- **Peter** — final approval on any design law changes

---

## Open Questions

1. Should we adopt the detector scripts for Leonardo's `audit` command? (Could catch anti-patterns in our own output)
2. Should `context-signals.mjs` enhance our no-argument routing alongside MCP queries?
3. Do we want the reflex-reject font list in our adaptation, given our fonts are system-defined? (It would only apply to brand register work for the portfolio site)
