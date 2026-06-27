# Documentation-Coherence Audit — Increment 3 + Spec 124

**Date**: 2026-06-26
**Spec**: 118 — Module-Resolution Coherence (audit add-on requested by Peter)
**Author**: Thurgood
**Scope**: every doc made stale by Spec 118 Increment 3 (tsx-sole / exports→dist / registerless bin / extensionless-CJS / scoped seams) + Spec 124 (return-value/branded-harvest, no self-registration, `allowOverwrite` retired). Covers `.kiro/steering/`, `docs/`, and root docs.

**Classification legend:**
- **STEERING (ballot-gated)** — fold into the Task-11 ballot (Deliverable A); do NOT edit directly.
- **DIRECTLY-EDITABLE** — `docs/`, README, roadmap, integration/migration guides. Propose the edit; consumer-facing flagged as higher priority.
- **HISTORICAL / POINT-IN-TIME — DO NOT EDIT** — dated release notes, past-spec task summaries, completion docs. Listed for completeness; no retro-edits.

---

## A. STEERING (ballot-gated — see Deliverable A)

| # | File · location | Stale claim (located) | Should now say | Ballot item |
|---|------------------|------------------------|----------------|-------------|
| A1 | `Rosetta-System-Architecture.md` :326 (Stage 4) | `Orchestration (generateTokenFiles.ts)` — shares "orchestrator" with Stage 5 | `Pipeline orchestration (generateTokenFiles.ts)` (disambiguate by layer) | Item 7 |
| A2 | `Rosetta-System-Architecture.md` :362 / :393 (Stage 5) | `TokenFileGenerator (Orchestrator)` / `Generation orchestration:` | `TokenFileGenerator (Platform-generation orchestration)` / `Platform-generation orchestration:` | Item 7 |
| A3 | `Rosetta-System-Architecture.md` Component-Token section | Lacks the cross-boundary invariant + brand caveats (124 corrected the *self-registration* claims at :449/:499 — those are DONE; the invariant prose is still missing) | Add the class-invariant + 4 brand caveats (prose) | Item 6 |
| A4 | `BUILD-SYSTEM-SETUP.md` :58 | "Development: Uses `ts-node` and `ts-jest` for direct TypeScript execution" | "Uses **tsx** (sole runtime-TS mechanism) and ts-jest…; ts-node retired (Spec 118 9.1); MCP dev sub-packages keep ts-node by design" | Item 5b |
| A5 | `BUILD-SYSTEM-SETUP.md` :126 | "Using CLI tools that use ts-node (e.g., `npm run release:analyze`)" | tsx, and `release:analyze` is now `npx tsx src/tools/release/cli/release-tool.ts analyze` | Item 5b (same doc) |
| A6 | `BUILD-SYSTEM-SETUP.md` :218-219 | "Option 2: Go Full ts-node … use ts-node everywhere" (Future Improvements) | Stale future-option — ts-node is retired; this option is moot. Reframe or remove (the live direction is compiled-`dist` for Class A, tsx for runtime-TS). | Item 5b (same doc) — flag to Peter |
| A7 | `BUILD-SYSTEM-SETUP.md` (tooling) | No ESLint mention | Add the narrow web-source module-resolution ESLint fact (NOT repo-wide) | Item 5b |
| A8 | `Technology Stack.md` (tooling list) | No ESLint / no tsx-as-sole-mechanism mention | Add ESLint-narrow fact + tsx-sole mechanism | Item 5b |
| A9 | `Test-Development-Standards.md` | No CI-enforced-guards practice; no close-state/single-source guard | Add the CI-enforced-guards subsection + the Civitas close-state process guard | Items 5a + 4 |

**Note on `Test-Failure-Audit-Methodology.md`** (ts-node at :883, :1169): these are **illustrative** — a profiling-snippet comment (`npx ts-node profile-operation.ts`) and a benchmark-table row label (`Isolated (ts-node)`). They assert no contract and are not part of the governed surface. **Low severity.** Recommend a *minor* ballot-adjacent cleanup (swap to `tsx` in the snippet; leave the historical benchmark label or annotate it) — but it does not rise to a contract correction. Listed here so the audit is complete; folding it into the ballot is optional at Peter's discretion.

**Note on `Token-Governance.md` and `DesignerPunk-Systems-Overview.md`:** grep hits were investigated and are **NOT stale**:
- `Token-Governance.md` `register`/`registered` hits (:247, :249, :266, :542) are all **theme** registration (Spec 094 ThemeRegistry) — unrelated to component-token self-registration. `defineComponentTokens` at :570/:573 is an authoring example that does not assert registration behavior. No edit.
- `DesignerPunk-Systems-Overview.md` :103 `defineComponentTokens() per component` is a layer-label in a Mermaid diagram — accurate (the helper is still per-component). No edit.

---

## B. DIRECTLY-EDITABLE

### B1. CONSUMER-FACING (higher priority — these mislead real readers)

| # | File · location | Stale claim | Should now say | Priority |
|---|------------------|-------------|----------------|----------|
| B1a | `docs/examples/integrations/migration-guide.md` :107-108 | Instructs consumers to add `"release:analyze": "ts-node src/release-analysis/cli/AdvancedReleaseCLI.ts"` and `"release:cli": "ts-node src/release/cli/ReleaseCLI.ts"` | **Doubly stale**: ts-node retired AND `src/release-analysis`/`src/release` are **deleted dirs**. Replace with the real scripts: `"release:analyze": "npx tsx src/tools/release/cli/release-tool.ts analyze"`, `"release:notes": "npx tsx src/tools/release/cli/release-tool.ts notes"`, `"release:run": "npx tsx src/tools/release/cli/release-tool.ts release"`. (NB: these are the *package's* internal scripts; verify whether a consumer guide should even prescribe them, or just reference `designerpunk` CLI commands — flag to Peter.) | **HIGH** |
| B1b | `docs/examples/integrations/existing-project.md` :76-77 and :326-327 | Same `ts-node src/release-analysis…` / `src/release…` block (twice) | Same correction as B1a | **HIGH** |
| B1c | `docs/roadmap/integration-guide-draft.md` :17, :21, :118 | Frames `ts-node` as an **open question** ("Should ts-node be a dependency… Ada should address during Spec 094") and "Exact ts-node / TypeScript execution strategy" as unresolved | Settled: **tsx is the sole runtime-TS mechanism** (Spec 118 Task 9.1); the consumer config loader is a permanent scoped-tsx seam. Resolve the open question; point at the Spec-118 contract. (Draft doc — lower stakes than published guides, but it is the integration narrative.) | MEDIUM |

### B2. NON-CONSUMER-FACING editable docs

| # | File · location | Stale claim | Should now say | Priority |
|---|------------------|-------------|----------------|----------|
| B2a | `docs/token-system-overview.md` :575 | "**NEW**: Automatic value extraction from primitive references" (Migration-from-Old section) | Mild: "automatic … extraction" is fine, but the doc's authoritative component-token section (:504) **already** carries the correct Spec-124 branded-return/no-self-registration language. Recommend a one-line tie so the "Migration from Old Approach" bullets don't imply auto-*registration*. **Low** — :504 already does the heavy lifting. | LOW |
| B2b | `docs/migration/validation-refactoring-guide.md` (many `registry.register()`) | grep flagged it for "register" | **NOT stale.** Every hit is `primitiveRegistry.register()` / `semanticRegistry.register()` — the **primitive/semantic** caller-validates-then-registers pattern, which Spec 124 did **not** touch (124 only changed *component-token* self-registration). No edit. | n/a (cleared) |
| B2c | `docs/roadmap/m0a-package-exports.md` :107-108 | `npx ts-node mcp-server/src/index.ts` / `application-mcp-server/src/index.ts` | **NOT stale.** These are the **MCP dev configs** — the R12 AC4 documented exception; they legitimately keep ts-node. No edit. | n/a (cleared) |
| B2d | `docs/roadmap/m0a-deferred-items.md` :75-76, :84, :114-116 | grep flagged ts-node/esm/eslint | **NOT stale — this is the destination.** Lines 114-116 already correctly record CJS-commitment, banked ESM prep, and scoped-lint-NOT-repo-wide. Line 84 (Spec-094-era "Phase 1 CLI uses native import() via existing ts-node") is a **historical planning note inside a deferred-items ledger**; arguably annotate as superseded, but it is a point-in-time ledger entry. No edit needed; **optional** one-line "superseded by Spec 118" annotation on :84. | LOW (optional) |

---

## C. HISTORICAL / POINT-IN-TIME — DO NOT EDIT

Listed for audit completeness. These are dated snapshots of what was true at the time; retro-editing them rewrites history and is out of policy.

| File | Why not touched |
|------|-----------------|
| `docs/releases/RELEASE-NOTES-11.9.0.md`, `RELEASE-NOTES-11.3.0.md` | Dated release notes — point-in-time record. |
| `docs/specs/094-portable-pipeline-and-theme-registry/task-3-summary.md` | Past-spec task summary (ts-node-era). |
| `docs/specs/118-module-resolution-coherence/task-5-summary.md`, `task-7-summary.md`, `task-1-summary.md`, `task-2-summary.md` | Spec-118's own dated in-flight task summaries (ts-node/global-register described as the *then*-current state). |
| `docs/specs/114-generation-pipeline-data-flow/task-2-summary.md` | Past-spec summary (pre-124 self-registration described as-then). |
| `docs/specs/037-component-token-generation-pipeline/task-{2,5,6}-summary.md` | Past-spec summaries (original `defineComponentTokens` self-registration era). |
| `docs/specs/124-component-token-return-contract/task-{3,4,5}-summary.md` | Spec 124's own summaries — already describe the NEW contract correctly; no action. |
| `docs/specs/104-token-source-portability/task-2-summary.md` | Past-spec summary. |
| `docs/specs/117-token-index-generation-integrity/task-4-summary.md` | Past-spec summary. |
| `docs/specs/architecture-separation-of-concerns/task-3-summary.md` | Past-spec summary (register-pattern era). |

**Cross-domain follow-up already logged (not a doc, noted for completeness):** stale regen comments in `Avatar.ios.swift:50` / `Avatar.android.kt:96` (`npx ts-node src/generators/generateTokenFiles.ts` — retired mechanism + wrong entry point). Task 9.1 already handed this to Lina to fix when next touching those platform outputs. Not re-listed as a doc edit here.

---

## Counts by classification

- **STEERING (ballot-gated):** 9 findings (A1–A9) across 5 steering docs (RSA, BUILD-SYSTEM-SETUP, Technology Stack, Test-Development-Standards) — all fold into Deliverable A. + 1 optional low-sev (Test-Failure-Audit-Methodology illustrative ts-node).
- **DIRECTLY-EDITABLE:** 4 real edits (B1a, B1b, B1c, B2a) + 1 optional (B2d). **2 grep-flagged surfaces cleared as NOT stale** (B2b validation-refactoring-guide, B2c m0a-package-exports MCP-dev).
- **HISTORICAL / DO NOT EDIT:** 13 files (release notes + past-spec/in-flight summaries).

## Top priority (consumer-facing / served — fix first)

1. **`docs/examples/integrations/migration-guide.md`** (B1a) — instructs consumers to add ts-node scripts pointing at **deleted** dirs. Actively breaks anyone who follows it.
2. **`docs/examples/integrations/existing-project.md`** (B1b) — same broken block, appears twice.
3. **Steering RSA module-resolution contract + exemption + invariant** (A1–A3, ballot Items 1/3/6) — the *served* law is currently absent/partial; readers have no single served source for the new contract.
4. **`BUILD-SYSTEM-SETUP.md` ts-node→tsx** (A4–A6) — served (manual) build doc asserts the retired mechanism as current.
5. **`docs/roadmap/integration-guide-draft.md`** (B1c) — frames a now-settled question as open; the integration narrative consumers will read.
