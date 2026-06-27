# Task 9.4 Completion: Static-lint polarity (CJS bans extensions) + the class-invariant guard

**Date**: 2026-06-26
**Task**: 9.4 — set the Task-4.2 ESLint scaffold's polarity (CJS: ban explicit extensions, web source only) and add the class-invariant lint flagged by Spec 124 (R10 AC3/AC4; R8 AC3)
**Type**: Guard
**Status**: **DONE & VERIFIED.** Polarity set to CJS; prove-it-bites in place (and it caught a real selector defect); class-invariant guard added as a jest source-scan. Increment 3 (Task 9) is now complete — only Task 11 (governance) remains in Spec 118.
**Validation Tier**: Tier 2
**Agent**: Lina (lint polarity) ; Thurgood (CI wiring) ; main-loop (implementation + verification).
**Branch**: `spec-118-module-resolution-coherence`

---

## Part 1 — Extension-ban polarity (R10 AC3/AC4)

The Task-4.2 scaffold shipped with `no-restricted-syntax` **inert** (zero selectors), its polarity gated on the Task-8 direction decision. Task 8 committed CJS-consistency, and Task 9.3 (3c) converged web source to extensionless — so 9.4 activates the **CJS branch**: ban explicit `.js|.ts|.mjs|.cjs` extensions on relative **static and dynamic** imports, scoped to `src/components/**`.

- Replaced the inert rule body in `eslint.config.js` with the two CJS selectors; updated the file-header and rule comments from "polarity deferred / INERT" to "polarity SET: CJS".
- Asset extensions (`.json`, `.css`, …) are intentionally **not** matched — they are not module-resolution specifiers.
- `npm run lint` is **green on activation** (9.3 already left `src/components/` at zero explicit-extension imports), so the rule guards a future regression rather than fixing an active failure.
- **Scope discipline preserved:** still web-source-only; the config's strong "NOT a repo-wide adoption" ignores are untouched. iOS-Swift/Android-Kotlin are categorically out; `MathematicalConsistencyValidator.ts` build-time dynamic imports are double-excluded (outside `src/components/**`, extensionless anyway). Coverage boundary stated: the lint covers only the `src/components/` slice of the 3c surface; extensionless authoring outside it is guarded by the 3a tsx runtime + the Task-4.1 dynamic-import jest guard.

## Part 2 — Prove-it-bites (Review: the scaffold rule was left inert/unverified)

New `src/components/__tests__/ExtensionLintPolicy.test.ts` runs the **real shipped `eslint.config.js`** (imported via `require`, since it is a CJS module) through the synchronous `Linter` API on positive/negative snippets. (ESLint's async `lintText` loads the flat config via dynamic `import()`, which jest's CJS VM rejects; reusing the real config block's selectors + parser through `Linter.verify` tests the shipped rule without that path.)

Cases: `./y.ts` reds, `../shared/y.js` reds, dynamic `import('./z.ts')` reds; extensionless `./y` and `import('./z')` pass; bare `@3fn/core/build` passes; `./data.json` passes (asset boundary).

**This check earned its keep.** It caught a latent defect in the pre-written scaffold selector: the dynamic-import arm used `CallExpression[callee.type="Import"]`, but `@typescript-eslint/parser` represents `import('./x')` as an **`ImportExpression`** node — so dynamic imports were silently un-linted. Fixed to `ImportExpression > Literal[value=/^\.\.?\//][value=/\.(js|ts|mjs|cjs)$/]`; the bite test now confirms both the static and dynamic arms fire. Exactly the "not a formality" the task called for.

## Part 3 — Class-invariant guard (R8 AC3; Spec 124 handback Impact 2)

The class invariant (Spec 124 isolation audit): **"No mutable-accumulate-then-read-back state crosses the `scopedTsRequire` boundary."** `ComponentTokenRegistry` was the only such singleton; 124 fixed it (return-value harvest, sole writer) and shipped a **specific behavioral guard** (R8 AC2, `loadComponentTokens.test.ts`: defineComponentTokens-in-isolation leaves the registry empty). The handback flagged the **broader lint codification** for 9.4 / Task 11.

**Mechanism decision (reasoned, not defaulted):** this is *not* implemented as an ESLint rule. The invariant's surface is `src/build/tokens/` + `src/registries/`, which the ESLint config **deliberately ignores** (scope discipline: web source only) — a rule there would be either scope-violating or inert. It is also a cross-module dataflow property, awkward for per-file AST selectors. So the right form is a **jest source-scan**, mirroring the spec's existing Task-4.1 preventive-source-scan idiom.

New `src/build/tokens/__tests__/ClassInvariantGuard.test.ts`:
- Scans the **authoring surface** (`src/build/tokens/**/*.ts`, excluding tests) for any `*Registry.{register|registerBatch|add|set|push}(` write — the exact self-registration side-effect shape 124 removed, and the vector by which a future `defineX` would reintroduce the split. Anchored to a `*Registry` receiver to stay high-signal (won't false-positive on `Map.set`/`Set.add` or injected-registry reads like `this.primitiveRegistry.get()`).
- Asserts **zero** violations (the surface is clean post-124) and **self-bites**: the detector fires on a synthetic `ComponentTokenRegistry.register(x)` positive and stays silent on benign reads.
- **Generalizes** 124's specific behavioral guard (catches *any* future authoring-surface module, not just the one known singleton); the sole legitimate registry writer (`loadComponentTokens`, `src/cli/`) is out of scan scope by design. It is a structural **proxy** for the invariant scoped to the reintroduction vector — not a full dataflow proof (precision over recall for a preventive guard). Task 11 codifies the invariant in prose.

## Verification (main-loop)

- `npx tsc --noEmit`: **clean.**
- `npm run lint` (real source): **exit 0** — the CI lane's lint step is green with the activated polarity + the corrected dynamic selector.
- Full `npm test`: **8990/8990** (377 suites) — +11 tests / +2 guard suites over the 8979/375 baseline; no regressions.

**No consumer-guard run for 9.4 (stated, not skipped silently):** 9.4 changes lint policy (a tool config the consumer never runs) and adds two `src/` jest guards. It alters **no module-resolution or packaging behavior**, so the packed-install arbiter — which governs resolution, and which earned its "only arbiter" status on resolution/packaging surprises — has nothing new to certify here. The lane's `npm run lint` step is verified green in-loop. (Belt-and-suspenders consumer-guard run available on request.)

## Files changed
- `eslint.config.js` — polarity set to CJS (two selectors); dynamic-arm selector corrected (`ImportExpression`); header/comments updated.
- `src/components/__tests__/ExtensionLintPolicy.test.ts` (new) — prove-it-bites.
- `src/build/tokens/__tests__/ClassInvariantGuard.test.ts` (new) — class-invariant source-scan.
- `.kiro/.../tasks.md` — 9.4 → done; parent Task 9 (Increment 3) → done.

## Cross-references
- `.kiro/specs/124-component-token-return-contract/findings/isolation-audit.md` (the invariant + the audited singleton set)
- `src/cli/__tests__/loadComponentTokens.test.ts:165` (Spec 124 R8 AC2 — the behavioral guard this generalizes)
- `src/components/__tests__/DynamicImportGuard.test.ts` (the Task-4.1 source-scan precedent)

## What remains in Spec 118
- **Task 11** — governance: codify the brand contract (124) + the class invariant + the CJS/extensionless direction; the pre-existing esbuild `"types"`-condition exports-ordering warning can ride here. This is the last task; Increment 3 (Task 9) is complete.
