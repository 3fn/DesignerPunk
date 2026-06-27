#!/usr/bin/env node
/**
 * DesignerPunk CLI — bin entry point
 *
 * Invokes the COMPILED CLI's __main(). No process-global tsx register.
 *
 * Spec 118 Increment 3a — runtime unification (tsx is the SOLE runtime TS mechanism).
 * The interpreter line stays `#!/usr/bin/env node` because `node` is the ONLY interpreter
 * guaranteed on a consumer's PATH (tsx is an npm dependency, not a guaranteed global).
 *
 * THE FINAL COHERENT END-STATE (Spec 118 Task 9.5.3 + Spec 124):
 * The global `tsx/cjs/api` register() is RETIRED. The bin invokes the compiled
 * `dist/cli/designerpunk.js` directly under plain node — no process-global runtime-TS
 * register exists. This is the destination the prior interim deliberately stopped short of.
 *
 *   The earlier interim kept a global register because it was load-bearing for MORE than
 *   the CLI's own `.ts` source: the CLI also `require()`s the CONSUMER'S raw `.ts` at
 *   generate-time — `resolveTokens` (`<consumer>/src/tokens`) and `loadComponentTokens`
 *   (`<consumer>/.../component/*.ts`). Retiring the global register safely required the
 *   audit + per-site seams to be in place first. They now are:
 *
 *     - Consumer raw-`.ts` loading is handled by the PER-SITE SCOPED-tsx SEAMS (Task 9.5.1):
 *       `resolveTokens` / `loadComponentTokens` scope tsx at the call site (as Increment 1
 *       did for loadConfig) instead of relying on a process-global register.
 *     - The component-token seam is now a RETURN-VALUE / BRANDED-HARVEST seam (Spec 124):
 *       `defineComponentTokens` brands its return value and no longer self-registers;
 *       `loadComponentTokens` harvests the branded exports and is the sole writer to
 *       `ComponentTokenRegistry`. This removed the dual-instance shared-singleton split
 *       that a registerless bin previously exposed across the scoped-tsx boundary.
 *
 *   With the audit done (9.5 target model, ratified), the scoped-tsx seams in place
 *   (9.5.1/9.5.2), and 124's return-value seam landed, no process-global register is needed.
 *
 * Why __main() instead of relying on module-level execution:
 * Node 22 sets require.main to THIS file (bin/designerpunk.js), not the
 * CLI module. A `require.main === module` guard in designerpunk.ts would
 * prevent execution in consumer context (npx from node_modules).
 * __main() bypasses this — the bin entry explicitly triggers the CLI.
 *
 * @see Spec 118 Task 9.5.3 (final bin-register retirement)
 * @see Spec 124 (Component-Token Return Contract — the return-value seam)
 * @see .kiro/issues/2026-06-10-cli-bundle-remove-wildcard-export.md
 */

require('../dist/cli/designerpunk.js').__main();
