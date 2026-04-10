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
| **Before M0b starts** | Tree-shaking, ThemeAwareBlendUtilities consolidation, full Product MCP features, token namespace collision prevention, native sync CLI (`sync:ios`/`sync:android`), Kotlin package namespace from config, Swift Package generation, dedicated MCP & documentation agent, experience pattern review |
| **End of Phase 2 (after all theming work)** | `mode: 'light'` support, `data-theme` attribute configurability |
| **When second customer appears** | Personal Note template, exclude "A Vision of the Future.md" |

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

| MCP server end-to-end in product context | stdio protocol prevents automated CLI testing; bundle loads without errors but full query validation needs an MCP client | Phase 1→2 transition — Sparky's first `mcp:app` connection from marketing site repo |

## Block B / Block C Deferred Items

### Spec 095: Ecosystem Package Assembly

| Item | Rationale | Activation Trigger |
|------|-----------|-------------------|
| `npx designerpunk sync:ios` | iOS files in npm package need to be synced to Xcode project. Manual copy documented for M0a. | M0b iOS activation |
| `npx designerpunk sync:android` | Android files in npm package need to be synced to Gradle module. Manual copy documented for M0a. | M0b Android activation |
| Kotlin package namespace from config | Generator produces `com.designerpunk.*`. Product-specific namespaces require generator change. | M0b Android activation |
| Swift Package generation for local SPM | SPM could reference a local package — cleaner than file copy for iOS. | M0b iOS activation |
| Tree-shaking / individual component exports | Full ESM bundle for M0a. Side-effect-free individual exports needed for mobile bundle size. | M0b scoping |
| `"type": "module"` in package.json | May break existing CJS `require()` calls in tests or build scripts. Verify during Task 5.3 — only add if ESM resolution requires it. | Task 5.3 validation reveals it's needed |
| Personal Note template | Replace Peter's note with a template for other humans. Only one customer right now. | Second human customer |
| Exclude "A Vision of the Future.md" | Peter's philosophical foundation, not reusable. | Second human customer |

### Decided — Implementation Staged

| Decision | Decided In | Implementation Location |
|----------|-----------|------------------------|
| **`tsx` as TypeScript execution strategy** for `designerpunk.config.ts` loading | Spec 094, Task 3.3 | Block B (WS2 packaging) — bundle `tsx` as dependency, wire CLI `bin` entry point. Phase 1 CLI uses native `import()` via existing `ts-node`. |

*Additional Block B / Block C deferred items to be populated as those specs are written.*

### Spec 081: Product MCP Design

| Item | Rationale | Activation Trigger |
|------|-----------|-------------------|
| Dedicated MCP & Documentation Agent (9th agent) | Cross-cutting view across all three MCPs and documentation layer. Thurgood focuses on system, Stacy on product — MCPs span both. | Ships with the Product MCP |
| Experience pattern review (9 ecosystem patterns) | Need to review each pattern individually to determine if it's an assembly recipe (stays in App MCP) or a screen-type template (moves to Product MCP). | Before Product MCP implementation | **Resolved** — Leo reviewed. 5 stay, 4 move. Execution during Phase 1→2 transition. |
