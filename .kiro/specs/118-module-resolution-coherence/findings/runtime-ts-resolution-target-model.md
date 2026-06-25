# Runtime-TS-Resolution Target Model (Task 9.5) — RATIFIED

**Date**: 2026-06-25
**Spec**: 118 — Module-Resolution Coherence, Task 9.5
**Status**: **RATIFIED by Peter (2026-06-25).** Defines the clean/stable target architecture for how DesignerPunk resolves TypeScript at runtime (package + consumer). Task 9.5's implementation sequences against this. Built on the verified audit (`findings/consumer-runtime-ts-resolution-audit.md`) + main-loop independent fact-verification.
**Standard (Peter):** the goal is a clean, stable architecture; a half-measure is acceptable ONLY as a guard-certified coherent intermediate on a *mapped* path to the ideal (the CJS→ESM model) — never a patch that has to be undone. Define the ideal first; justify every step against it.

---

## The committed frame (not re-litigated)
- **Direction (Task 8):** CJS-consistency now, ESM as a mapped future migration. The runtime TS-config loader is **permanent** (R5 AC3 anchor).
- **Authoring model (verified intended, not incidental):** the consumer authors and the CLI loads raw `.ts` token + component **source** at generate-time (`init` deliberately copies raw `.ts` + writes a config pointing at it; Spec 117 R4 drives component loading off live source presence). What is *incidental/unowned* is the **mechanism** — a bare global `tsx` register in the bin that the consumer loads piggyback on.

---

## The ideal end-state (per class)

**Class A — the package's OWN code (CLI, generators, exports).**
**Ideal: compiled-and-shipped (`dist/`), run as compiled JS — not raw `.ts` via a runtime loader.** It has no irreducible runtime-TS need; compiling removes it from the global-register dependency, gives a typecheck gate (R6 AC3), is the same form 3b moves the raw-`.ts` export trio toward, and is the only ESM-portable form. The bin then `require('../dist/cli/designerpunk.js')`.

**Class B — the CONSUMER's `.ts` (config / tokens / components / overrides).**
**Ideal: a SCOPED runtime TS loader, per-site, modeled on the Inc-1 Approach-A seam** — the irreducible runtime need (consumer `.ts` lives in the consumer's repo; cannot be resolved at our build time — the hard limit on the bundle-and-exempt principle). **Three scoped seams** replace the one global bin register: config (done, Inc-1), `resolveTokens`, `loadComponentTokens`. Each registers tsx scoped, loads, unregisters — no process-global residue.
- *Rejected as the ideal — "precompile consumer `.ts` at `init`":* breaks Spec 117 R4's source-presence contract + the "edit `src/tokens`, re-run generate" model `init` promises. Re-opens only if Spec **123** chooses a compiled-distribution form.

**Class C — the `__dirname` assumptions.**
**Ideal: a single `resolvePackageRoot()` source of truth** (the robust B3 pattern: resolve up, self-check for `package.json`, fall back to cwd). B1 (package-mode token root) and B2 (component-relationship map) rewritten to derive from it instead of bare `__dirname`, so Class-A compilation is safe.

**Class C′ — the catalog reflects the CONSUMER's design system (RATIFIED 2026-06-25, the B2 decision).**
**The generated catalog (token-index + the MCP it feeds) SHALL reflect the consumer's design system, including components they add or edit — not only the package's built-in components.** Verified rationale: this fixes a real *half-awareness incoherence* — the consumer's component **tokens** are already consumer-aware (`loadComponentTokens`), but the component→token **relationship map** (`buildConsumerMap`, `generateTokenIndex.ts:119`) reads the **package's** `.schema.yaml` via `__dirname`, ignoring the 34 schemas `init` copies into the consumer's repo (and any the consumer authors, e.g. `PricingCard.schema.yaml`). So `generate` shall build the relationship map from the **consumer's** component schemas (resolved from the active config/source, not `__dirname`).
- **Bounded** — the schema format exists and is already shipped to consumers; this points the existing scan at the consumer's source.
- **One open convention (settle during the step, with Lina):** *where* `generate` discovers the consumer's component schemas (alongside `componentTokenDirs`? the copied `src/components/core`? a config field?). Component-authoring-model question (Lina), lightly coupled to Spec 123 (what a consumer's design system is). Not from-scratch; decide deliberately, do not assume.

**Class D — the MCP-dev ts-node configs (R12 AC4 exception).**
**Ideal: a PERMANENT documented exception** — the MCP servers ship as esbuild bundles (no runtime TS resolution), their ts-node dev configs never touch `loadConfig` or consumer `.ts`. Unifying them to tsx would be churn with no coherence gain. (Resolves the seed's open question explicitly.)

---

## The mapped path — each step a consumer-guard-certified whole

1. **[CURRENT — certified] Register-keep interim.** Inc-3a unified the runtime mechanism to tsx + retired ts-node, deliberately keeping the bin's global register (retiring it without scoping sites 2/3 re-breaks consumer generate). A **legitimate step, not a dead-end**: guard-green, removed the ts-node split; its only debt is the global register, which steps 2→4 retire. The bin header documents this honestly.
2. **[NEXT] Scope `resolveTokens` + `loadComponentTokens` to per-site tsx** (Approach-A). Consumer loads no longer depend on the global register. **Consumer-guard (packed install) is the arbiter** — not in-repo loads (the task-3 false-green lesson).
3. **[THEN] `__dirname` → single `resolvePackageRoot()`; AND make the consumer-map consumer-aware (Class C′).** Routes B1/B2 through one self-checking resolver (relocation-safe) **and** builds the relationship map from the consumer's component schemas. Settle the schema-discovery convention here (with Lina). Consumer-guard certified.
4. **[THEN] Retire the global register; bin requires compiled `dist/cli`.** Safe now because 2 scoped the consumer loads and 3 made the package root relocation-safe. **Couples to 3b** (same compile-and-ship move) — sequence together. Consumer-guard certified (the arbiter that caught all three prior surprises).
5. **[BOUNDARY — Spec 123] Consumer source distribution form.** Whether tokens/components ship as copied raw `.ts` (today), shipped-package source, or compiled is 123's call. Step 2's scoped seams hold under any 123 outcome that keeps raw-`.ts` authoring; only a 123 decision to compile consumer source revisits the Class-B alternative.
6. **[FUTURE] CJS→ESM migration.** Steps 1–4 bank ~60–70% of the prep; the ESM-specific cost (loader-host re-investigation + jest→ESM) is a deliberately-triggered follow-on.

---

## Where the consumer guard MUST arbitrate (do not assume)
- **Step 2** scoping under packed install (in-repo loads false-green).
- **Step 4** compiled-`dist/cli` running end-to-end through a consumer generate (it builds; not yet run end-to-end).
- **Step 3 / 3b** sequencing (land together; trace 3b's task graph for ordering before executing).
