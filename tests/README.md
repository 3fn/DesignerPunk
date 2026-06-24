# tests/

This directory holds consumer-facing integration tests that require subprocess execution (pack → install → real CLI) and therefore cannot run inside the jest process. They are too slow for the main `npm test` suite.

## CI home

`.github/workflows/consumer-guard.yml` is the standing CI lane for these guards. **New guards from Spec 118 Tasks 4 and 5 attach to that lane, not a separate workflow.** See that file's header comment for scope discipline and branch-protection instructions.

## consumer-integration.test.ts

Runs via `npm run test:consumer`. Covers:

- **Spec 106 R8** — full consumer experience: pack → install → init → generate → validate → MCP smoke
- **Spec 118 Task 3.1** — faithful-consumer config subprocess guard: ESM-authored and CJS-authored `designerpunk.config.ts` with a transitive raw-`.ts` `./my-overrides` import, positive-asserting the sentinel name+abbreviation appears in `npx designerpunk generate` stdout. Certifies the Increment-1 config-load path (Approach A) and bin-hook coexistence.

The Spec 118 guard is the resolution guard that catches the class of failure `ConfigLoader.test.ts` cannot catch in-process (because jest intercepts `await import()` and never hits Node's strict-ESM resolver). See `.kiro/specs/118-module-resolution-coherence/design.md` § "Consumer-config boot/smoke guard".
