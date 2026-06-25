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
| **After 3+ real screen specs in Phase 2** | UI tree convention reassessment (Spec 097) |
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

| Item | Owner | Gate | Status |
|------|-------|------|--------|
| Leo + Ada theme registry API session | Leo, Ada | Before Phase 2 screen specs | ⬜ |
| Leo + Ada token index walkthrough | Leo, Ada | Before Phase 2 screen specs | ⬜ |
| Lina Shadow DOM smoke test under marketing theme | Lina | Before Phase 2 web implementation | ⬜ (needs theme) |
| Sparky build tooling input | Sparky | Before marketing site repo creation | ⬜ |
| Stacy process scaffolding finalization | Stacy | Before Phase 1 specs finalized | ⬜ |
| Full MCP audit | Thurgood | Before Phase 2 | ✅ Complete — `docs/roadmap/phase1-mcp-audit.md` |
| MCP audit fixes (4 stale steering docs) | Thurgood | Before Phase 2 | ⬜ Pending budget |
| Experience pattern moves (4 patterns) | Thurgood + Lina | Before Phase 2 | ⬜ Decision made, execution pending |

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
| `"type": "module"` in package.json | May break existing CJS `require()` calls in tests or build scripts. **Superseded — now owned by Spec 118's R4/R5 module-direction decision** (the `"type":"module"` flip is part of 118's CJS-vs-ESM commitment, made on Increment-2 evidence, not 117's Task 5.3). | **Spec 118 Task 8** direction decision (only if native ESM is committed) |
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

### Spec 097: Product MCP Intelligence Layer

| Item | Rationale | Activation Trigger |
|------|-----------|-------------------|
| UI tree convention reassessment (Phase 2) | Convention-vs-implementation alignment confirmed (Task 3.3). Convention-vs-real-authoring alignment can only be assessed after Leo writes real screen specs. Assess whether convention needs formalization (schema), revision, or promotion to stable. Leo's priority ordering for expected gaps: (1) accessibility annotation placement, (2) conditional rendering, (3) component substitution across platforms, (4) slot composition, (5) token keys vocabulary. | After Leo has authored 3+ real screen specs in Phase 2 |
| Token gap detection | Screen specs can reference nonexistent tokens without warning. Intentionally absent — specs may reference aspirational tokens ahead of creation. Same architecture as component gap detection (read token registry from disk at index time). | When token reference errors become a real problem in product development |
| Scaffold-status detection | Readiness lives in schema YAML, not `component-meta.yaml`. Application MCP already surfaces readiness via `get_component_summary`. | When `not-found` alone proves insufficient for Leo's workflow |

### Integration Guide

| Item | Rationale | Activation Trigger |
|------|-----------|-------------------|
| Storybook integration guidance | Storybook MCP under consideration for component showcase and AI-driven testing. Web Components compatibility needs verification first. | After Storybook adoption decision is finalized and Web Components renderer tested |
| Troubleshooting section | Common issues (auth failures, server startup errors, pipeline errors) not documented. Will surface naturally during marketing site build. | After Phase 2 Block E (foundation) — capture real issues encountered during first product repo setup |

## Spec 118: Module-Resolution Coherence

| Item | Rationale | Activation Trigger |
|------|-----------|-------------------|
| **Repo-wide linting adoption** | Spec 118 introduced ESLint **scoped to only the module-resolution rule on web source**; the repo otherwise has no linting at all (no ESLint/Biome/oxlint config, deps, or scripts — verified 2026-06-24). Whether to adopt repo-wide code-quality linting (and which ruleset/config) is a separate decision 118 deliberately did NOT own — pulling it in would be scope creep. | A future tooling-standards decision / when repo-wide code-quality enforcement becomes a priority. |
| ~~ESM-consolidation execution (Increment 3c, ESM variant)~~ | **SUPERSEDED — escape-hatch not elected.** Spec 118 **Task 8 committed CJS-consistency** (2026-06-25, on the Increment-2 evidence); it executes fully in-spec with no `"type":"module"` flip and no preset migration, so the ESM-escape-hatch trigger never fired. Replaced by the deliberate **Full ESM modernization** item below. | — (closed) |
| **Full ESM modernization (deliberate, future)** | Spec 118 committed CJS-consistency as the lowest-incoherence end-state — NOT a claim ESM is wrong long-term. ESM is the ecosystem's direction of travel; CJS's cost is a *future* one and **the migration path is already mapped** by the Increment-2 inventories. CJS-consistency banks ~60–70% of the structural prep (exports reconciliation, one runtime mechanism, the `scripts/**` typecheck gate, the lint tooling, the preset `.cjs` parking form). ESM-specific marginal cost = a bounded-mechanical bucket (`"type":"module"` flip, `.js`/`.cjs` audit, extension sweep, lint-polarity flip, preset `.cjs` rename) + **two high-variance drivers**: (1) the loader-host problem (Task 1 showed ESM-native `tsImport` fails from the CJS host → `loadConfig` must be re-hosted, unproven), and (2) jest→ESM across **376 suites / 8,989 tests** on ts-jest. **Rough size:** a dedicated follow-on spec, medium → medium-large, front-loaded with a loader-host investigation increment (as Task 1 was for 118). See `.kiro/specs/118-module-resolution-coherence/findings/direction-decision.md` § "The ESM-modernization path". | A hard external forcing function (a critical dep or Node drops CJS; a consumer-distribution requirement mandating an ESM package) **OR** a deliberate strategic decision that ESM-alignment is worth paying for now. |

*Note: the `"type": "module"` deferral above (under Spec 095 / Block B) was subsumed by 118's R4/R5 direction decision — now made: **CJS-consistency** (no `"type":"module"` flip in-spec).*

### Issues surfaced during the 117/118 spec cluster — triage (2026-06-25)

Triaged with Peter at the Task-8 milestone. None couple to the CJS-consistency execution work (all cross-domain — folding any in would be the scope-creep this spec discipline fights).

| # | Issue | Tier | Disposition |
|---|-------|------|-------------|
| 2 | `generate-token-index` stale `modeResolved` API (`.kiro/issues/2026-06-24-generate-token-index-script-stale-modeResolved-api.md`) | **Closed** | ✅ Already RESOLVED on the 118 branch — the divergent standalone script was retired; the build generates the index inline from the shared `modeResolved`. Verified (`scripts/generate-token-index.ts` absent; `git diff token-index/` empty). |
| 3 | Math-relationship parser false-fails ~99 healthy tokens (`.kiro/issues/2026-06-24-mathematical-relationship-parser-validation-gaps.md`) | **Soon** | Highest-priority open: `npx designerpunk validate` exits 1 on healthy tokens (consumer-facing break) AND holds a skipped `validate passes` test in the new consumer-guard lane. Own focused effort / small spec **after 118 closes** (needs per-token-family governance calls + parser work — not a slot-in). Ada-led. |
| 1 | Blend system / OKLCH alignment + platform delivery (`.kiro/issues/2026-06-24-blend-system-architecture-and-oklch-alignment.md`) | **Soon** | Its own Ada-led spec (Lina/Leonardo consulted). Foundational: interaction-state blends compute in RGB/HSL on an OKLCH foundation (`OklchBlendCalculator` orphaned) — undercuts the OKLCH perceptual-uniformity claim. Not a runtime break; important-not-urgent. Absorbs Spec 117 N1's code disposition. |
| 4 | MCP `get_token_details` `resolvedValue` ignores per-mode overrides (`.kiro/issues/2026-06-24-mcp-semantic-resolvedvalue-ignores-mode-overrides.md`) | **Later** | Low severity; the `themeVarying` flag is correct, only the `resolvedValue` readout is incomplete; documented workaround exists. Needs a token-index-format / MCP-resolution design decision. Park. |
| 5 | RSA-doc "orchestrator" terminology overload (`.kiro/issues/2026-06-24-rsa-orchestrator-terminology-overload.md`) | **Later** | Low; doc-clarity polish (disambiguate Stage-4 vs Stage-5 by layer — do NOT unify; they are caller/callee). Cheap; batch with a future steering-touching ballot. |

**Pattern to watch (roadmap-level):** three of these (the retired #2, blend #1, and — in spirit — validator #3) are the **same shape as the 117/118 root cause**: an incomplete migration leaving a *correct path orphaned while a legacy/stale path runs live* (cf. `getOklchMetadata`/rgba-in-index in 117; the config loader in 118; `OklchBlendCalculator` in #1). Worth naming as a recurring failure mode — incomplete migrations accumulate orphaned-correct/live-legacy pairs — and a candidate for a standing audit/guard practice rather than per-incident cleanup.
