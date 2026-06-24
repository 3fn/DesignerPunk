#!/usr/bin/env node
/**
 * Resolution-matrix RUNNER (Spec 118, Task 1).
 *
 * Runs ONE candidate loader against ONE fixture config, inside a FAITHFUL
 * reproduction of `loadConfig`'s load locus, in a REAL `node` process.
 *
 * WHY a real `node` subprocess (THE critical constraint): under ts-jest, jest
 * intercepts `await import()` via its own module registry and never hits Node's
 * strict-ESM resolver — so a jest-hosted matrix goes green against the very bug
 * (proven in-repo by ConfigLoader.test.ts passing today despite the production
 * config-load path being broken). This runner is plain CJS executed by `node`
 * directly (NOT jest, NOT ts-node), so the candidate loader is the ONLY thing
 * that can make a `.ts` config resolve.
 *
 * This file is itself CommonJS (`module.exports` style, `__dirname`/`__filename`
 * present, no `import.meta`) so it reproduces loadConfig's CJS execution context
 * (ConfigLoader.ts:78) — the OQ-1 CJS-host boundary.
 *
 * Contract reproduced from ConfigLoader.ts:57-65 EXACTLY:
 *   - the load locus is a single load call wrapped in try/catch
 *   - unwrap is `loaded.default || loaded`
 *   - failure is RE-WRAPPED and THROWN (fail-loud) — never a partial/empty config
 *
 * Usage:
 *   node runner.js <approach:none|A|B|C> <fixtureDir> <expectedSentinel>
 *
 * Output (always, on stdout): a single JSON line:
 *   { approach, fixtureDir, ok, sentinel, expectedSentinel, residue, error }
 * Exit code 0 if ok && sentinel matches && no residue; non-zero otherwise.
 */
'use strict';

const path = require('path');

const [, , approach, fixtureDirArg, expectedSentinel] = process.argv;

if (!approach || !fixtureDirArg) {
  process.stderr.write('usage: node runner.js <approach> <fixtureDir> <expectedSentinel>\n');
  process.exit(2);
}

const fixtureDir = path.resolve(fixtureDirArg);
const configPath = path.resolve(fixtureDir, 'designerpunk.config.ts');

/**
 * The faithful reproduction of loadConfig's load locus.
 * `doLoad(configPath)` MUST throw on resolution failure (fail-loud) and
 * return the unwrapped userConfig on success.
 */
async function loadWith(approach, configPath) {
  let loaded;

  if (approach === 'none') {
    // BASELINE: the current production locus, verbatim (ConfigLoader.ts:59).
    // No TS-aware loader registered → reproduces the bug.
    loaded = await import(configPath);
  } else if (approach === 'A') {
    // Approach A: tsx/cjs/api register({namespace}) + scoped (synchronous) require.
    // register mutates module._resolveFilename + module._extensions PROCESS-GLOBALLY;
    // the namespace only scopes requests. So A MUST call unregister() after the load
    // to leave no residue (accept-criterion (e)). A's scoped require is SYNCHRONOUS
    // (ScopedRequire) — `await` on it is harmless (Ada SF-2: do not "fix" it).
    const { register } = require('tsx/cjs/api');
    const ns = `dp-matrix-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const unregister = register({ namespace: ns });
    try {
      // The NamespacedUnregister carries a scoped `require(id, fromFile)`.
      loaded = unregister.require(configPath, __filename);
    } finally {
      // Mandatory lifecycle: restore module._resolveFilename (residue criterion).
      unregister.unregister();
    }
  } else if (approach === 'B') {
    // Approach B: tsImport from tsx/esm/api, invoked from THIS CJS host.
    // `__filename` exists in CJS so parentURL is clean. tsImport self-scopes
    // (internal register({namespace: Date.now()}) per call) → no persistent
    // global hook. OQ-1: does dynamic import() inside the ESM-loader hook
    // resolve when the host is CJS, incl. the transitive relative raw-`.ts`?
    const { pathToFileURL } = require('url');
    const { tsImport } = await import('tsx/esm/api');
    loaded = await tsImport(configPath, { parentURL: pathToFileURL(__filename).href });
  } else if (approach === 'C') {
    // Approach C: jiti (NOT installed unless explicitly added). Budgeted dep.
    const { createJiti } = require('jiti');
    const jiti = createJiti(__filename);
    loaded = await jiti.import(configPath, { default: false });
  } else {
    throw new Error(`unknown approach: ${approach}`);
  }

  // Preserved unwrap (ConfigLoader.ts:60).
  return loaded && (loaded.default || loaded);
}

/**
 * Residue probe (accept-criterion (e)): capture module._resolveFilename and the
 * set of registered require extensions BEFORE the load, and confirm they are
 * restored AFTER. A non-restored hook = ambient/global residue.
 */
function snapshotResolver() {
  const Module = require('module');
  return {
    resolveFilename: Module._resolveFilename,
    extensions: Object.keys(Module._extensions).sort().join(','),
  };
}

(async () => {
  const result = {
    approach,
    fixtureDir,
    ok: false,
    sentinel: null,
    expectedSentinel: expectedSentinel || null,
    residue: null,
    error: null,
  };

  const before = snapshotResolver();

  try {
    // Faithful reproduction of ConfigLoader.ts:57-65 (the try/catch + re-wrap).
    let userConfig;
    try {
      const loaded = await loadWith(approach, configPath);
      userConfig = loaded;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      throw new Error(`Failed to load ${configPath}: ${message}`);
    }

    result.sentinel = userConfig ? userConfig.sentinel : undefined;
    result.ok = !!userConfig && result.sentinel === expectedSentinel;
  } catch (err) {
    result.error = err instanceof Error ? err.message : String(err);
    result.ok = false;
  }

  // Residue check after the call (criterion (e)).
  const after = snapshotResolver();
  const residueChanged =
    after.resolveFilename !== before.resolveFilename ||
    after.extensions !== before.extensions;
  result.residue = residueChanged
    ? { changed: true, beforeExtensions: before.extensions, afterExtensions: after.extensions,
        resolveFilenameChanged: after.resolveFilename !== before.resolveFilename }
    : { changed: false };

  process.stdout.write(JSON.stringify(result) + '\n');
  // Exit nonzero on any failure incl. residue (so the orchestrator and CI see it).
  process.exit(result.ok && !result.residue.changed ? 0 : 1);
})();
