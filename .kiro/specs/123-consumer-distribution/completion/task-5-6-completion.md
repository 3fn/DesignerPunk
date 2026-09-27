# Task 5.6 Completion — Repairs (registry pin, tsconfig pin), after the migration fetch

**Spec**: 123 — Consumer Distribution · **Unit**: U1 · **Parent**: Task 5 · **Agent**: Lina (Opus)

## What changed

In `src/cli/sync/Migration.ts` (the repairs are C7 Migration step 6), wired in `index.ts`:

- **Req 5.1 — the registry pin.**
  - `detectRegistryPin` matches exactly the line the pre-2026-09-20 `init` scaffolded (`@3fn:registry=https://npm.pkg.github.com`, whitespace and a trailing slash tolerated).
  - The offer is a **named explanation**, not fine print: `REGISTRY_PIN_MESSAGE` says what the line is, who wrote it, why it hurts (a token needed for every install, versions npm no longer serves), and the command.
  - **`--repair-npmrc` removes ONLY that line.** Auth lines and other settings stay. Nothing from `.npmrc` is ever printed except the mapping line's own text.
- **Req 5.2 — the tsconfig pin.**
  - `detectTsconfigPins` finds `compilerOptions.paths` keys under `@3fn/core` whose targets point into `@3fn/core/src/` (the old template's shape).
  - **`--repair-tsconfig` removes ONLY those entries.** `paths` is removed if it ends up empty. `baseUrl` is **kept**, because it can serve her own non-relative imports. The file is re-serialized with 2 spaces.
  - A tsconfig that isn't plain JSON (JSONC comments) is **reported with manual instructions and never rewritten**.
- **Ordering (C7 step 6, L2-D2)**:
  - `repairOffers` runs in `index.ts` **after** the migration assessment has fetched through her rail. The npmrc repair removes the exact mapping that makes pre-13 versions fetchable.
  - `SyncOutcome.trace` records `fetch:<v>` events, then `repair-offered:<kind>`, then `repair-applied:<kind>`.
  - While pre-123 copies remain on disk, the npmrc offer adds `REGISTRY_PIN_ORDER_CAUTION` ("Do this after 'sync --migrate-components'…").
- **Apply**: each repair applies only with its own explicit flag, after the report. `--apply` alone does NOT repair. Both flags are parsed by `parseSyncArgs`.

## Targeted tests + result

`npx jest src/cli/__tests__/sync.migration.test.ts -t "5.6"` → **4/4** (inside the 35/35 suite):
- **(d) `the registry-pin repair is not offered before the fetch (trace order), with its named explanation`**:
  - every `fetch:*` event precedes `repair-offered:npmrc`;
  - the explanation, the caution, and the tsconfig offer (naming `@3fn/core/blend, @3fn/core/build`) are printed;
  - the fixture's fake auth value is never printed, and `.npmrc` is untouched on a dry run.
- `nothing repairs without its flag — --apply alone leaves .npmrc and tsconfig.test.json`.
- `--repair-npmrc removes ONLY the mapping line; --repair-tsconfig removes ONLY the raw-src re-pins`:
  - `repair-applied:npmrc` comes after the fetch;
  - the auth line and `save-exact` survive;
  - her own `@my/alias` path, `baseUrl` and `strict` survive.
- `no copies left → no ordering caution; a JSONC tsconfig is reported, never rewritten`: the trace is exactly `['repair-offered:npmrc','repair-offered:tsconfig']`.

### Bites recorded red (mutate → run → restore; `cmp` confirmed each restore)

1. **The repairs are offered BEFORE the migration fetch** (the offer computation moved above step 5) → `✕ (d) the registry-pin repair is not offered before the fetch…`. `✕ no copies left…` also went red, because the moved block pushed the trace events twice — **2 failed**.
2. **The npmrc repair drops every GitHub Packages line** (auth included) → `✕ --repair-npmrc removes ONLY the mapping line…` — **1 failed**.

Restored: 35/35.

## Application-time adaptations

1. **Repairs are per-flag (`--repair-npmrc`, `--repair-tsconfig`), not part of the `--apply` batch.** Req 5.1 says "offer repair with a named explanation — never silently". The npmrc repair also forecloses judging pre-13 copies later, so a CI `--apply` should not perform it as a side effect. The flags follow the same per-path pattern as `--restore` and `--overwrite`.
2. **`baseUrl` is kept** in the tsconfig repair (the 2026-09-20 template fix removed both). A repair should change only what re-pins package subpaths.
3. **The help text in `designerpunk.ts` is not updated** for the new flags (`--migrate-components`, `--repair-*`). That file is outside the list and I kept the earlier swap minimal. The flags appear in `sync`'s own report wherever they apply. This is a residual for whoever next touches the CLI help (Task 16 / C27).
4. **Code reading the consumer's own `.npmrc` is the feature under test.** The fixtures carry a fake auth value. No credential file outside this repo was read to build this (the coordinator's rule from 2026-09-26).
