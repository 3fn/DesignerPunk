# M0a Deferred Items Tracker

**Date**: 2026-04-07
**Purpose**: Central tracker for items explicitly deferred during M0a planning and implementation
**Status**: Living document — updated as specs defer items

---

## How to Use

Each entry records: what was deferred, which spec or planning doc deferred it, why, and when it needs to be done. Review this tracker before starting M0b or any future milestone to assess accumulated debt.

---

## Deadlines

| Deadline | Items |
|----------|-------|
| **Before Phase 2 starts** | Token coverage analysis, `marketing-pages` vocabulary |
| **Before M0b starts** | Tree-shaking, ThemeAwareBlendUtilities consolidation, full Product MCP features, token namespace collision prevention |
| **End of Phase 2 (after all theming work)** | `mode: 'light'` support, `data-theme` attribute configurability |

---

## Spec 094: Portable Pipeline & Theme Registry

| Item | Rationale | Activation Trigger |
|------|-----------|-------------------|
| `mode: 'light'` (light-only theme) | No current use case | A product needs a light-only theme |
| `data-theme` attribute configurability | No collision scenario today; adding prefix later is non-breaking | A product has a competing `data-theme` system |
| ThemeAwareBlendUtilities consolidation (iOS) | Existing `ThemeModeKey` can coexist during migration | Post-R8 cleanup or M0b iOS work |
| Platform token reference build-time validation | Cross-reference `DesignTokens.*` usages in platform files against generated output. Prevents the quality gap found by Data and Kenya (10 Android + 7 iOS components with broken refs). Same pattern as ESM bundle reconciliation test. | After R8 fixes the existing broken refs | **Resolved → Spec 095 scope** |

## North Star / Roadmap Decisions

| Item | Rationale | Activation Trigger |
|------|-----------|-------------------|
| Tree-shaking / individual component exports | Full bundle for M0a; multi-platform packaging changes structure | M0b scoping |
| Token namespace collision prevention | Isolated repos, no collision risk in Phase 1 | Product MCP aggregates across products |
| Full Product MCP features (Leo's wish list) | Foundation only; features grow from real usage | M0b demands screen↔component lookup, state models, gap detection |
| Token coverage analysis against M0a screens | Gaps surface naturally during Phase 2 development | Phase 2 start |
| `marketing-pages` context in controlled vocabulary | Not wrong metadata, just a vocabulary gap | Marketing sites become a recurring pattern |

## Phase 2 Dependencies (Not Deferred — Scheduled)

These aren't deferred items — they're explicitly scheduled for the Phase 1→2 transition. Listed here for completeness.

| Item | Owner | Gate |
|------|-------|------|
| Leo + Ada theme registry API session | Leo, Ada | Before Phase 2 screen specs |
| Leo + Ada token index walkthrough | Leo, Ada | Before Phase 2 screen specs |
| Lina Shadow DOM smoke test under marketing theme | Lina | Before Phase 2 web implementation |
| Sparky build tooling input | Sparky | Before marketing site repo creation |
| Stacy process scaffolding finalization | Stacy | Before Phase 1 specs finalized |

---

## Block B / Block C Deferred Items

### Decided — Implementation Staged

| Decision | Decided In | Implementation Location |
|----------|-----------|------------------------|
| **`tsx` as TypeScript execution strategy** for `designerpunk.config.ts` loading | Spec 094, Task 3.3 | Block B (WS2 packaging) — bundle `tsx` as dependency, wire CLI `bin` entry point. Phase 1 CLI uses native `import()` via existing `ts-node`. |

*Additional Block B / Block C deferred items to be populated as those specs are written.*
