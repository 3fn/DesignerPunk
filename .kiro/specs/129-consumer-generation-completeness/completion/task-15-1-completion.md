# Task 15.1 — `init` runs `generate`; the failure path; the closing message

**Spec**: 129-consumer-generation-completeness · **Agent**: Ada (Sonnet) · **Branch**: `task/129-15-init-platforms` · **Traces**: Req 11.1, 11.2, 11.4

## What changed
- `src/cli/init.ts`: after the manifest is written (the birth is finished), `init` runs `generate`. `runGenerate` reports failure by printing to stderr and calling `process.exit(1)`, so `runGenerateInInit` turns that exit into a result and holds its stderr. On failure `init` prints `initGenerateFailedMessage(...)` (the re-run command first, then `generate`'s own message), still prints the next steps, and exits 1. `InitDeps.generate` is the test seam (the production `generate` cannot run in-process under jest).
- `src/cli/designerpunk.ts`: `runGenerate(force, { fromInit })`. When `init` runs it, `generate` stays silent about the personal note, which `init` created in its own Step 12 and names in its next steps. The note stays in the CLI layer; `src/generators/generateTokenFiles.ts` is untouched (Req 11.2).
- `src/cli/shared/errorCatalog.ts`: `initNextStepsMessage` takes `generated` and `outputDir`. After a successful `generate` it prints design § 14's closing words ("Your token output is in `<output>`. Run `npx designerpunk generate` after every token change.") and the list has no `generate` step; after a failed one the list leads with the re-run, as before. New `initGenerateFailedMessage`.
- Tests: `errorCatalog.test.ts` (three new cases, the old ones pinned to `generated: false`), `init.test.ts` (three new cases: generate runs after the birth; a failing generate keeps config, token source, agent layer and manifest, leads with the re-run command and exits 1; a throwing generate), stubbed `generate` at the five other `runInit` call sites, `tests/consumer-integration.test.ts` (`Consumer Guard`: output and `token-index/` exist after `init` alone; a `generate` straight after writes a byte-identical `dist/tokens` and `token-index/`; a failing `generate` inside `init` through the packed bin).

## Targeted tests
- `npm test -- src/cli/__tests__/init src/cli/__tests__/errorCatalog src/cli/__tests__/productScaffold src/cli/__tests__/sync.test src/cli/__tests__/sync.name src/cli/__tests__/generate`: 11 suites, 199 tests, pass.
- `npm run test:consumer -- -t "init produces|generate produces|generate failing"`: 3 pass (the rest skipped by the filter); full file at the parent close.
- `npx tsc --noEmit`: clean.

## Application-time adaptations
- The closing line is printed after "Your product ... is ready." and before "Next steps", in design § 14's words. The static "Run `generate` after changes" bullet under "To customize" is dropped when `generate` ran, so the sentence appears once.
- The output folder is read from the loaded config after a successful `generate` (falls back to `dist/tokens`, `init`'s own default, where the config cannot load, as under jest).
- Files outside the Primary Artifacts: none edited. Existing tests under `src/cli/__tests__/**` (sync, productScaffold, overRewriteArbiter) needed the stub `generate`; they are under `src/cli/**`.
