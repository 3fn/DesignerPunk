# Task 2.4 Completion — Manifest written last, with `origin` per entry, `posture: 'born'`, `installedVersion`

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 2 · **Agent**: Ada (Sonnet)

## What changed

- `src/cli/init.ts`: new `ManifestBuilder` class (exported for direct unit testing) accumulates manifest entries across every step of `runInit`, then `designerpunk.manifest.json` is written LAST, after every other write (design.md C1's manifest row: "so no generated file lacks an entry").
- `ManifestBuilder.recordFile(relPath, absPath, origin)` — records a file-grain entry `{ hash: sha256(content), grain: 'file', origin }`, **except** any path under `src/tokens/` (Req 5.8 — no baseline applies to the consumer's own copied token tier, ever; a hardcoded prefix check, verified by a direct unit test since no current call site exercises it live — see Bites).
- `ManifestBuilder.recordKey(relPath, key, content)` — records a key-grain entry (`<path>#<key>`) with `origin: 'emitted-key'`, used for each MCP server key written into `.kiro/settings/mcp.json` and `.mcp.json`.
- Call sites wired: `recordCopiedTree` (walks a copied directory — agents/steering/governance — recording each file with `origin: 'copy'`); the six single scaffolded files (config, product overview, jest config, tsconfig, ignore file, components README) recorded with `origin: 'generated'`; both MCP scaffolds record each server key with `origin: 'emitted-key'`.
- Manifest shape: `{ version: '1', posture: 'born', installedVersion, contractHash: '', attachedTargets: ['cc', 'kiro'], entries }`. `installedVersion` is read live from the package's own `package.json` (via `resolvePackageRoot`), not hardcoded.

## Targeted tests + result

`npx jest src/cli/__tests__/init.test.ts` → the "manifest, written last" describe block (3 tests, including the new direct unit test):
- `origin` is asserted present on ONE `copy` entry and ONE `emitted-key` entry, plus `posture`/`installedVersion`/`attachedTargets`.
- Zero `src/tokens/**` entries exist, asserted two ways: (a) the full integration test (real `init` run, inspecting the written manifest) and (b) a **direct unit test** against `ManifestBuilder` itself, because the integration test alone would pass VACUOUSLY — no current `init.ts` call site ever attempts to record a `src/tokens/`-prefixed path (only `recordCopiedTree`, over agents/steering/governance, and the six named scaffold files call `recordFile`), so criterion (a) is true by construction, not by an active guard, unless (b) proves the guard itself bites.

### Bites recorded red (reverted, run, confirmed red, then restored — `git diff --stat src/cli/init.ts` unchanged after restore)

1. **Live integration test's "zero entries" check** — first attempted to bite this by disabling the `src/tokens/` exclusion in `recordFile`. Result: the integration test **stayed GREEN** — confirming (before fixing anything) that this criterion, tested only at the integration level, would be vacuous. This is itself a recorded finding, not a false pass I let stand: I added the direct `ManifestBuilder` unit test specifically because of this observation.
2. **Direct `ManifestBuilder` unit test** — same mutation (disabled the `src/tokens/` prefix check). Re-ran `-t "ACTIVELY excludes"` → **RED**: `Object.keys(built.entries)` returned all three recorded paths (including both `src/tokens/*` ones) instead of only `designerpunk.config.ts`. Restored; confirmed clean via `git diff --stat`.

## Application-time adaptations

1. **`contractHash: ''`** — the manifest schema (design.md's `Manifest` interface) declares `contractHash: string`, but the mechanism that computes it (`dist/name-contract.json`'s content hash) is Task 6's build (`build-name-contract.ts`), which does not exist yet in the task sequence. No Task 2 criterion tests this field's value. Left explicitly empty (not a fabricated hash), with a code comment naming Task 6 as the point it gets populated. Flagged here since it's a real gap in an otherwise-complete manifest, not a silent omission.
2. **`.claude/settings.json` is tracked as a single whole-file `generated` entry**, not key-grain per individual `permissions.allow` string. C7's later managed-set design (Task 5, `sync`) may want finer key-grain tracking for this file to detect a consumer's own edited approval list; that mechanism isn't built yet, so a coarser whole-file entry was the defensible choice for U1 rather than inventing a key-grain scheme Task 5 might design differently.
3. **`attachedTargets: ['cc', 'kiro']` is unconditional** — correct for U1 (both targets are always emitted; `--target` selection arrives at Task 16), but this field's SEMANTICS will change once Task 16 makes target selection real (at that point `attachedTargets` should reflect which targets were ACTUALLY chosen, not "both, always"). Flagged as a value Task 16 will need to revisit, not a design decision I'm asserting permanence for.
4. **Manifest `version: '1'`** (a schema-version marker, distinct from `installedVersion`) — not explicitly specified by any Task 2 criterion; chosen as a simple literal since C7's migration logic (Task 5) is what will actually need to reason about manifest format versions across releases.

## Notes for Task 5 (`sync`)

- Every entry `sync` will need to reconcile against disk lives under `entries: Record<string, { hash, grain: 'file' | 'key', origin: 'copy' | 'generated' | 'emitted-key' }>`. `origin` values in this U1 manifest are exactly the three the design names for U1: `copy` (agents/steering/governance), `generated` (the six scaffolded single files + `.claude/settings.json`), `emitted-key` (MCP server keys in both `.kiro/settings/mcp.json` and `.mcp.json`).
- `hash` is `sha256(content)` hex digest — for file-grain entries, the raw file content; for key-grain entries, `JSON.stringify` of the emitted value.
