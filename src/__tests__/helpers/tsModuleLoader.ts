/**
 * Shared test helper: a jest-compatible runtime-TS loader for `resolveTokens` /
 * `loadComponentTokens` (the `TsModuleLoader` seam, Spec 118 Task 9.5).
 *
 * The PRODUCTION loader ({@link scopedTsRequire}, Approach A: `tsx/cjs/api` scoped
 * `require`) CANNOT run inside a jest process: tsx appends a `?namespace=` tag to the
 * resolved module id that jest's module resolver rejects (`ENOENT`). In-process tests
 * therefore inject THIS loader, a plain synchronous `require` that rides jest's own
 * module registry / ts-jest transform — the exact form these sites used before Task 9.5
 * swapped the bare `require` for the scoped seam.
 *
 * Architectural boundary (mirrors `configModuleLoader.ts`): in-process jest cannot
 * exercise the REAL scoped resolver — jest masks it. So in-process tests verify ONLY
 * non-resolution behavior (barrel-contract errors, discovery walk, allowOverwrite,
 * return shape). REAL scoped resolution of consumer `.ts` in a packed install is verified
 * out-of-process by the consumer guard (`npm run test:consumer`) — the sole arbiter.
 *
 * This loader lives entirely in TEST code — the production `resolveTokens` /
 * `loadComponentTokens` carry NO test-awareness (no `JEST_WORKER_ID`, no test-only
 * branch). In-process tests opt in by passing this loader to the site's loader parameter.
 */
import type { TsModuleLoader } from '../../config/scopedTsRequire';

export const jestTsModuleLoader: TsModuleLoader = (modulePath) => require(modulePath);
