#!/usr/bin/env node
/**
 * DesignerPunk CLI — bin entry point
 *
 * Registers tsx for TypeScript imports, then invokes the CLI's __main().
 *
 * Spec 118 Increment 3a — runtime unification (tsx is the SOLE runtime TS mechanism).
 * The interpreter line stays `#!/usr/bin/env node` because `node` is the ONLY interpreter
 * guaranteed on a consumer's PATH (tsx is an npm dependency, not a guaranteed global).
 *
 * THE register() BELOW IS A DOCUMENTED INTERIM — NOT the final coherent end-state.
 * Increment 3a's *committed* scope retired the ts-node/tsx SPLIT (ts-node removed; dev
 * scripts + the CLI's ts-node fallback are gone; tsx pinned) and satisfies R6 (one runtime
 * mechanism). The global `tsx/cjs/api` register() is deliberately LEFT for now, because
 * retiring it is deeper than the design (or issue 2026-06-10) knew:
 *
 *   This global register is load-bearing for MORE than executing the CLI's own `.ts` source.
 *   The CLI also `require()`s the CONSUMER'S raw `.ts` at generate-time — `resolveTokens`
 *   (`<consumer>/src/tokens`) and `loadComponentTokens` (`<consumer>/.../component/*.ts`).
 *   Those resolve ONLY because this register is present. Removing it (e.g. bundling the CLI
 *   per issue 2026-06-10) breaks `npx designerpunk generate` — proven empirically: local-mode
 *   "Token source not found", and a bundled __dirname shift (src/config→dist/cli) that
 *   silently zeroes package-mode component tokens (re-introducing the Spec 117 R4 bug).
 *
 * The TRUE retirement (scope tsx at resolveTokens/loadComponentTokens like Inc-1 did for
 * loadConfig + fix the __dirname package-mode path assumptions, THEN de-register/bundle) is
 * DEFERRED pending the consumer-runtime-TS-resolution audit (see the Increment-3a completion
 * doc + findings). This interim is certified consumer-guard-green; it is a coherent
 * intermediate, not the destination. DO NOT "finish the job" by deleting this line without
 * the audit + the scoped-tsx seams in place.
 *
 * Why __main() instead of relying on module-level execution:
 * Node 22 sets require.main to THIS file (bin/designerpunk.js), not the
 * CLI module. A `require.main === module` guard in designerpunk.ts would
 * prevent execution in consumer context (npx from node_modules).
 * __main() bypasses this — the bin entry explicitly triggers the CLI.
 *
 * @see Spec 118 Task 9.1 (Increment 3a — runtime unification)
 * @see .kiro/issues/2026-06-10-cli-bundle-remove-wildcard-export.md
 */

require('tsx/cjs/api').register();
require('../src/cli/designerpunk.ts').__main();
