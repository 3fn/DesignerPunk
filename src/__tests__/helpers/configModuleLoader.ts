/**
 * Shared test helper: a jest-compatible config-module loader for `loadConfig`.
 *
 * Spec 118 — `loadConfig`'s PRODUCTION loader (Approach A: `tsx/cjs/api` scoped `require`)
 * CANNOT run inside a jest process: tsx appends a `?namespace=` tag to the module id that
 * jest's module resolver rejects (`ENOENT`). In-process tests therefore inject THIS loader,
 * which routes through jest's own module registry via `import()`.
 *
 * Architectural boundary (Lina MF-A): in-process jest cannot exercise the REAL resolver —
 * jest masks it. So in-process tests verify ONLY non-resolution behavior (DEFAULTS,
 * error-wrapping, config shaping). REAL resolution is verified out-of-process by the
 * resolution matrix (`npm run test:resolution-matrix`) and the consumer guard (Task 3).
 *
 * This loader lives entirely in TEST code — the production `ConfigLoader` carries NO
 * test-awareness (no `JEST_WORKER_ID`, no mutable test default, no test-only setter).
 * In-process tests opt in by passing this loader to `loadConfig(cwd, jestConfigModuleLoader)`.
 */
import type { ConfigModuleLoader } from '../../config/ConfigLoader';

export const jestConfigModuleLoader: ConfigModuleLoader = (configPath) => import(configPath);
