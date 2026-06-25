# Spec 118 — Handoff: Resume at Task 7 (Increment 2)

**Date**: 2026-06-25
**Branch**: `spec-118-module-resolution-coherence` · **HEAD**: `82cff19d` · working tree clean
**Purpose**: Cross-session handoff. Increment 1 + the direction-agnostic guards are complete and committed; the remaining work is direction-dependent and starts at **Task 7**.

## Done & committed
- **Increment 1** (Tasks 1, 2, 3, 6): empirical loader selection (Approach A), the contract-preserving `loadConfig` swap via an injectable seam, the consumer-config subprocess guard + the first CI lane, and the Spec 117 closeout note. Formalization (requirements/design/tasks/feedback) committed.
- **Ambient-loader regression fix** (`c0e33ea5`): Approach A under ts-node broke `npm run build`'s prebuild → fixed by injecting the ambient loader in `generate-platform-tokens.ts`; `prepack: "npm run build"` makes the consumer guard faithful. (Also unified the token-index build path.)
- **Task 4** (`8ca58413`): dynamic-import smoke test + scoped-ESLint tooling (rule inert; polarity set in Group 9).
- **Task 5** (`82cff19d`): MCP + browser boot/smoke guards + the staged exemption-boundary doc.

Verified at HEAD: `npm run build` exit 0 · `npm test` 374 suites / 8972 · `tsc` clean · `git diff token-index/` empty · all guards pass (and bite on broken bundles).

## Next up
- **Task 7 — Increment 2 (evidence; investigation-ONLY, no swaps).** Ada-led, Tier 3.
- **Task 8 — CJS-vs-ESM direction decision** (Peter's call, on Task 7's evidence; unblocks Specs 122/123).
- **Groups 9/10** — 3a/3b/3c + lint polarity + close-state gate (gate-deferred until Task 8).
- **Task 11 — governance ballot.**

## Key context to carry into Task 7 (see design.md + findings/loader-selection.md)
- **Loader is Approach A** (`tsx/cjs/api` scoped `require` + mandatory `unregister`); **B (`tsImport`) failed from the CJS host**. `loadConfig(cwd, loadModule?)` has an injectable seam — ts-node-hosted callers inject `(p) => import(p)`.
- **Parity harness MUST reuse 117's `Normalizer` + `SemanticComparator`** (`src/tools/integrity/`) via a **NEW thin orchestrator** over two fresh roots — NOT `GenerationIntegrityCheckImpl` (hardwired committed-vs-fresh). A second normalization engine is forbidden.
- **Volatile-field set to extend:** `rosettaVersion`, embedded `version`, `extensions.themes` (array → compared positionally). token-index YAML is clean.
- **Four inventories:** entry points; export conditions (incl. the import-only/require-only asymmetry — note `./config` now HAS a `require` condition); ESM-cost incl. the shipped `@3fn/core/jest-preset` blast radius + the `.cjs` parking-form determination (Lina's lean: a coherent parking form exists); the **falsifiable** divergence hypothesis (correlation-not-causation; clean exit if disproven).
- **Direction-decision data point (for Task 8):** Approach A binds the config loader to tsx-at-runtime; the clean ESM-native path (`tsImport`) does NOT work from the CJS host.

## Open items (tracked elsewhere)
- **Validator defect** (Ada): `.kiro/issues/2026-06-24-mathematical-relationship-parser-validation-gaps.md` — the `validate passes` consumer test is `it.skip`'d, pointing there.
- **Branch protection** (Peter): enable `Consumer Guard` as a required check in repo settings (the workflow defines it; branch protection is a repo-settings action).
- **Staged boundary doc** (`findings/mcp-browser-exemption-boundary.md`) rides the Task-11 governance ballot.

## Verification discipline (do NOT skip — this bit us twice)
- For loader / module-resolution / build-path changes, **`npm run build` is mandatory** (not just `tsc` + `npm test` — those don't exercise the build chain or the packed artifact). Verify pack/install guards under **clean `dist/`** (`rm -rf dist`).
- `npm run test:consumer` **phantoms in main-loop Bash** (backgrounds with no output) — delegate consumer-lane runs to a subagent.
- Working-style context persists in memory (`peter-decision-framing`, `verify-full-suite-before-done`, `subagent-model-tiers`).
