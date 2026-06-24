# Resolution-Matrix Harness (Spec 118, Task 1)

Empirically determines which TS-aware loader `loadConfig` (`src/config/ConfigLoader.ts`)
should use, by exercising candidate loaders against a faithful reproduction of the
config-load failure — in **real `node` subprocesses, NOT under jest**.

## Re-run

```
npm run test:resolution-matrix
# or:  node src/config/__resolution-matrix__/run-matrix.js
# subset: node src/config/__resolution-matrix__/run-matrix.js A      (only approach A)
#         node src/config/__resolution-matrix__/run-matrix.js none A B
```

A single cell can be run directly:

```
node src/config/__resolution-matrix__/runner.js <none|A|B|C> <fixtureDir> <expectedSentinel>
```

## THE critical constraint — why this is NOT a jest test

Under ts-jest, jest intercepts `await import()` via its own module registry and
**never hits Node's strict-ESM resolver** — so a jest-hosted matrix goes *green
against the very bug*. This is proven in-repo: `src/config/__tests__/ConfigLoader.test.ts`
writes configs as `module.exports` in `.ts` files and passes today even though the
production config-load path is broken. Therefore every cell here runs in a real
`node` process (`runner.js`, plain CommonJS) that faithfully reproduces
`loadConfig`'s load locus (CJS context: `__dirname`/`__filename`, no `import.meta`;
`loaded.default || loaded` unwrap; fail-loud `try/catch`). The candidate loader is
the only thing that can make a `.ts` config resolve.

## The matrix

Rows (each in BOTH ESM-authored and CJS-authored form — R2 AC4 forward-compat):

- **source-directory import** — config imports a directory (`./src/config`) with no
  explicit `/index.ts`. Bare-Node fails `Directory import not supported` (ESM) /
  `Cannot find module` (CJS).
- **faithful-consumer** — config does a compiled import (`./compiled/defineConfig.js`,
  modeling `@3fn/core/config` → dist) PLUS a transitive relative raw-`.ts` override
  `./my-overrides`. Bare-Node fails `Cannot find module ... ./my-overrides`.

Fixtures use **real** authoring (`export default` + ESM imports / real `require()`),
never `module.exports`-in-`.ts` (a jest-transform artifact that is neither faithful
CJS nor ESM). The sentinel asserted is one **only the transitive `./my-overrides`
import produces** (positive sentinel — never "not DEFAULTS").

## Candidate loaders

- **A** — `tsx/cjs/api` `register({namespace})` + scoped synchronous `require`,
  with mandatory `unregister()` after the load (A mutates `module._resolveFilename`
  process-globally; namespace only scopes requests, so `unregister()` is what
  satisfies the no-residue criterion).
- **B** — `tsImport` via `await import('tsx/esm/api')` with `parentURL` from
  `pathToFileURL(__filename)`.
- **C** — `jiti` (NOT installed; only exercised if both A and B fail; would be a
  budgeted dependency add).

## Accept-criteria

(a) failing rows green; (b) both CJS- and ESM-authored configs; (c) operates in
`loadConfig`'s CJS context incl. transitive relative raw-`.ts` (OQ-1); (d) preserves
`loaded.default || loaded` + fail-loud (resolution failure THROWS, never partial);
(e) leaves no ambient/global residue after the call.

## Result (see `findings/loader-selection.md` for the dated record)

A passes all rows in both directions with no residue; B fails all rows (the OQ-1
CJS-host/ESM-loader boundary — `tsImport` does not resolve the transitive raw-`.ts`
from a CJS host, and leaves residue). **Selected: A.** jiti was not needed.

> This harness is the Task-1 selection evidence. The *standing* preventive guard is
> the Task-3 subprocess consumer guard (pack → install → `npx designerpunk generate`);
> this harness is a re-runnable selection/regression tool, not the CI release gate.
