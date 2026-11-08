# Task 10.3 — Row 22: the exports

**Agent**: Ada (Sonnet) · **Unit branch**: `task/129-10-validators-config-types`

## What changed

- `src/config/index.ts`: `export type { SemanticOverrideMap, SemanticOverride } from '../tokens/themes/types'`. `ThemeOverridePair` (the `{ light, dark }` form) was already exported at U6 (Task 14.2), so Req 13.3's third name needed no change.
- `tests/consumer-integration.test.ts`: a `Consumer Guard` case writes a consumer `.ts` file that imports `SemanticOverrideMap`, `SemanticOverride` and `ThemeOverridePair` from `@3fn/core/config`, and runs the repository's `tsc` over it with `module`/`moduleResolution` `node16` (the exports map is what resolves the subpath), `strict`, `noEmit`.

## Targeted tests and result

**Red once, before the export**: `npm run test:consumer -- -t "Task 10"` → the type-check case failed with `overrides-check.ts(1,15): error TS2305: Module '"@3fn/core/config"' has no exported member 'SemanticOverrideMap'.` and the same for `SemanticOverride`, status 2. **After the export**: both cases of the describe pass (`2 passed`). This also settles the record's UNVERIFIED line: the packed `dist/config/index.d.ts` follows `src/config/index.ts`.

## Application-time adaptations

none. (The consumer case shares a describe with 10.2's warning case, which runs one packed install.)
