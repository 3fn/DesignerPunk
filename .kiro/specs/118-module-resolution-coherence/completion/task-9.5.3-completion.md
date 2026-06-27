# Task 9.5.3 Completion: Retire the bin's global register — the registerless re-certification

**Date**: 2026-06-26
**Task**: 9.5.3 — retire `bin/designerpunk.js`'s global `tsx/cjs/api` register(); bin requires the compiled `dist/cli` (couples to 9.2/3b)
**Type**: Implementation
**Status**: **DONE & CERTIFIED.** The global bin register is retired; the registerless consumer guard is green end-to-end (N>0 component tokens via the real two-copy boundary). **Risk #2 (registerless-bin dual-instance recertification) CLOSED.** This was the final step of Increment-3's bin-register retirement and the first end-to-end proof of Spec 124's fix on the registerless path.
**Validation Tier**: Tier 3
**Agent**: Ada (implementation + certification run) ; main-loop (diff verification, recording) ; Thurgood (consumer-guard/CI lane).
**Branch**: `spec-118-module-resolution-coherence`

---

## Context — why this was blocked and is now unblocked

9.5.3 was PAUSED on 2026-06-25: retiring the global register exposed a **dual-instance `ComponentTokenRegistry` split**. Without the global register, the per-call scoped-tsx seam loaded the consumer's component `.tokens.ts` inside tsx's own module registry, which resolved a SECOND copy of `@3fn/core/build` → a second registry → `defineComponentTokens`'s self-registration side effect landed in the duplicate → `loadComponentTokens` read the canonical (empty) one → **0 component tokens** (silent). Component tokens were the ONLY consumer-`.ts` seam relying on a shared-singleton side effect rather than a return value. Full diagnosis: `findings/9.5.3-component-registry-dual-instance-blocker.md`.

The fix was scoped as its own prerequisite — **Spec 124 (Component-Token Return Contract)** — which landed & committed (`cb91e60c`): `defineComponentTokens` now brands its backward-compatible return value with a non-enumerable string key (`'@3fn/dp:tokenContract'`, recoverable via `getTokenContract`) and **no longer self-registers**; `loadComponentTokens` **harvests the branded exports** and is the **sole writer** to `ComponentTokenRegistry`. With no shared-mutable-singleton crossing the tsx boundary, the registerless split cannot occur. Handback: `findings/124-handback-2026-06-26.md`.

## What landed (the two re-applied changes)

**1. `bin/designerpunk.js` — global register retired, bin runs compiled dist.**
```
- require('tsx/cjs/api').register();
- require('../src/cli/designerpunk.ts').__main();
+ require('../dist/cli/designerpunk.js').__main();
```
The header comment was rewritten from the "DOCUMENTED INTERIM — NOT the final end-state" form to the final end-state: the global register is retired because (a) consumer raw-`.ts` loading is handled by the per-site scoped-tsx seams (9.5.1), and (b) the component-token seam is now a return-value/branded-harvest seam (Spec 124). The `__main()` rationale (Node 22 sets `require.main` to the bin) and `#!/usr/bin/env node` are preserved. `@see` updated to 9.5.3 + 124.

**2. `package.json` `files` — curated dist list → build-tracking globs.**
```
+ "dist/**/*.{js,d.ts,json,css,swift,kt}",
+ "!dist/**/__tests__/**",
+ "dist/__tests__/fixtures/acknowledged-differences.json",
```
The curated dist-specific entries (which silently drift and break consumers — the guard has caught this repeatedly) are replaced by the six build-tracking extension globs. Two subtleties:
- **The `!dist/**/__tests__/**` exclusion is load-bearing.** tsconfig `include: ["src/**/*"]` compiles test files into `dist`; tests live in `__tests__/` dirs by convention, so excluding that dir drops all compiled tests (`npm pack --dry-run`: 0 compiled test files).
- **The one re-included fixture** — `dist/__tests__/fixtures/acknowledged-differences.json` — is required at generate-time by `src/generators/TokenFileGenerator.ts` (`require('../__tests__/fixtures/acknowledged-differences.json')`, platform-specific token-count registry). Under the old tsx-run bin the CLI ran from `src/` (the whole `src/` tree ships), so it found the source copy; the compiled bin runs from `dist/`, so the dist copy must ship. It sits under a `__tests__` dir, hence the explicit re-include after the exclusion (npm-packlist applies later patterns last).

## Certification — the consumer guard is the ONLY arbiter (in-repo loads false-green)

This is the **first end-to-end run of the registerless bin through a real packed-consumer `generate`** — the exact path that silently returned 0 before Spec 124. The register-keep interim masked the split with a single `@3fn/core/build` instance; the registerless bin is where the genuine two-copy boundary first runs through a consumer generate, so the green is a true acceptance gate.

- **`npm run build`**: exit 0 (5 pre-existing esbuild exports-condition warnings, unrelated).
- **`npm pack --dry-run`**: 877 dist files (matches the prior verified run), **0 compiled test files**, fixture `dist/__tests__/fixtures/acknowledged-differences.json` present.
- **`npm run test:consumer`** (packed install → init → real-subprocess `npx designerpunk generate`, NOT in-process jest): **`generate produces output files` PASS** — `token-index/components.yaml` non-empty (`trim().length > 0`, not the silent-zero) AND contains `inputradio.box.sm` (the canonical recovered token from Spec 117's 33-token baseline). Prepack generate reported **`Component tokens: 33 (3 platforms)`**. The branded harvest survives the real two-copy `@3fn/core/build` boundary by value.
- **`npm test`** (full suite): **8979/8979** (375/375 suites) — post-124 baseline, no regressions.

### Known noise distinguished from failure
The **pre-existing MCP-orphan teardown leak** ("Jest did not exit one second after the test run has completed") appeared in the consumer-guard run. This is a tracked 118 follow-up (the `dist/mcp/*.js` node process orphans after `child.kill()` SIGTERMs the `npx` wrapper), NOT a test failure — every per-test result is a pass and the exit code is clean. It does not gate 9.5.3.

## Trade-off recorded (Peter-approved)

The `files` broaden trades **curated precision for drift-resistance**. The list now documents *what kind* of artifact ships (the six build-tracking extensions), not *what* ships, and will auto-include any future `dist/**` file matching those extensions. The `!dist/**/__tests__/**` exclusion is the single guardrail holding that line; a future non-test `dist/` artifact that should be *withheld* from the package would need its own explicit negation. Chosen deliberately because the curated list silently drifted and broke consumers repeatedly (the consumer guard caught it each time) — drift-resistance is the higher-value property here.

## Verification discipline held
- The **packed-install consumer guard was the arbiter** — never an in-repo load (the task-3 false-green lesson).
- `npm run build` run before certification (mandatory for loader/module-resolution changes).
- The consumer-lane run was delegated to a subagent (it phantoms in main-loop Bash); the **bin + `package.json` diffs were verified independently in the main loop** against the reported changes.

## Cross-references
- `findings/9.5.3-component-registry-dual-instance-blocker.md` (the diagnosis, now marked re-certified)
- `findings/124-handback-2026-06-26.md` (what 124 proved vs. what 9.5.3 re-certified on the registerless bin)
- `findings/runtime-ts-resolution-target-model.md` (the ratified target model this completes)
- Spec 124: `defineComponentTokens.ts` (brand + `getTokenContract`), `loadComponentTokens.ts` (harvest, sole writer), `ComponentTokenRegistry.ts` (`allowOverwrite` retired)

## What remains in Spec 118 (not part of 9.5.3)
- **9.3 (3c)** finalize CJS + extensionless authoring.
- **9.4** lint polarity + the class-invariant lint (Impact 2: "no mutable-accumulate-read-back state crosses the scoped boundary").
- **Task 11** governance: codify the brand contract + the class invariant + the CJS direction.
- Tracked follow-ups (not blocking): the MCP-orphan teardown leak; the C′ authoring-convention incoherence (Spec 124 seed, Lina/123); component-schema token-name drift; the validator false-fail.
