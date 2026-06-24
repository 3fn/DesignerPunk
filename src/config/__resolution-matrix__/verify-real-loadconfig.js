#!/usr/bin/env node
/**
 * Spec 118 Task-2 Verification: real loadConfig resolves a faithful consumer config.
 *
 * This script is the key proof for Task 2 — it calls the ACTUAL `loadConfig` from
 * `ConfigLoader.ts` (not the standalone runner) against the faithful-esm fixture
 * (compiled import + transitive relative raw-`.ts` `./my-overrides` with a sentinel).
 *
 * WHY real node (NOT ts-jest): ts-jest intercepts await import() via its own module
 * registry and never reaches Node's strict-ESM resolver — proven in-repo by
 * ConfigLoader.test.ts passing today despite the production path being broken.
 * This script runs via plain `node` using tsx/cjs/api to load ConfigLoader.ts.
 *
 * Run via:
 *   node src/config/__resolution-matrix__/verify-real-loadconfig.js
 */
'use strict';

const path = require('path');

const ROOT = path.resolve(__dirname, '../../..');
const FIXTURE_DIR = path.resolve(__dirname, 'fixtures/faithful-esm');
const EXPECTED_SENTINEL = 'faithful-esm:my-overrides-resolved';
const CONFIG_LOADER_PATH = path.resolve(ROOT, 'src/config/ConfigLoader.ts');

async function main() {
  console.log('=== Task-2 Verification: real loadConfig against faithful-esm fixture ===\n');
  console.log(`ConfigLoader.ts: ${CONFIG_LOADER_PATH}`);
  console.log(`Fixture:         ${FIXTURE_DIR}`);
  console.log(`Expected sentinel: ${EXPECTED_SENTINEL}\n`);

  // Load ConfigLoader.ts itself through tsx/cjs/api (the same mechanism the swap uses).
  // This is the only way to call loadConfig from a real node subprocess without going
  // through the CLI binary or ts-node global hooks.
  const { register } = require('tsx/cjs/api');
  const ns = `dp-verify-${Date.now()}`;
  const unregister = register({ namespace: ns });
  let loadConfig;
  try {
    const mod = unregister.require(CONFIG_LOADER_PATH, __filename);
    loadConfig = mod.loadConfig;
  } finally {
    unregister.unregister();
  }

  if (typeof loadConfig !== 'function') {
    console.error('FAIL: loadConfig is not a function — module load problem');
    process.exit(1);
  }

  // Now call the real loadConfig with the fixture directory as cwd.
  // This exercises the full swap: approach A inside loadConfig, against a
  // faithful consumer config (compiled import + transitive raw-.ts my-overrides).
  let resolved;
  try {
    resolved = await loadConfig(FIXTURE_DIR);
  } catch (err) {
    console.error(`FAIL: loadConfig threw: ${err.message}`);
    process.exit(1);
  }

  console.log('Resolved config:');
  console.log(JSON.stringify(resolved, null, 2));
  console.log('');

  // Verify the sentinel. The sentinel field is not part of ResolvedConfig — it is on
  // the raw userConfig object. Since loadConfig only returns ResolvedConfig fields,
  // we verify via the `name` field (set to 'FaithfulESM' by the fixture) AND by
  // confirming resolution succeeded (no throw). The transitive raw-.ts my-overrides
  // carries the sentinel as `overrideSentinel` which is used as the `sentinel` prop
  // in defineConfig — but defineConfig strips unknown props, so we check `name`.
  //
  // The sentinel we CAN check: `name === 'FaithfulESM'` only resolves if the fixture
  // loaded, and `abbreviation === 'FE'` confirms the config object was returned (not
  // DEFAULTS). For a deeper sentinel we check that the fixture's configDir is correct.

  const sentinelChecks = [
    { label: 'name === FaithfulESM', pass: resolved.name === 'FaithfulESM' },
    { label: 'abbreviation === FE',  pass: resolved.abbreviation === 'FE' },
    { label: 'configDir matches fixture', pass: resolved.configDir === FIXTURE_DIR },
    { label: 'tokenSourceMode === package', pass: resolved.tokenSourceMode === 'package' },
  ];

  let allPass = true;
  for (const check of sentinelChecks) {
    const symbol = check.pass ? 'PASS' : 'FAIL';
    console.log(`  ${symbol}: ${check.label}`);
    if (!check.pass) allPass = false;
  }

  // Additionally confirm the `sentinel` prop was present on userConfig by loading
  // the fixture raw (without the ResolvedConfig shaping) — re-run approach A directly.
  console.log('\n--- Raw userConfig sentinel check (approach A direct, same fixture) ---');
  const unregister2 = register({ namespace: `dp-verify2-${Date.now()}` });
  let rawLoaded;
  try {
    rawLoaded = unregister2.require(path.join(FIXTURE_DIR, 'designerpunk.config.ts'), __filename);
  } finally {
    unregister2.unregister();
  }
  const rawConfig = rawLoaded && (rawLoaded.default || rawLoaded);
  const sentinelVal = rawConfig && rawConfig.sentinel;
  const sentinelOk = sentinelVal === EXPECTED_SENTINEL;
  console.log(`  raw sentinel value:   "${sentinelVal}"`);
  console.log(`  expected:             "${EXPECTED_SENTINEL}"`);
  console.log(`  ${sentinelOk ? 'PASS' : 'FAIL'}: sentinel matches`);
  if (!sentinelOk) allPass = false;

  console.log('');
  if (allPass) {
    console.log('=== RESULT: PASS — real loadConfig resolves faithful consumer config with sentinel ===');
    process.exit(0);
  } else {
    console.log('=== RESULT: FAIL ===');
    process.exit(1);
  }
}

main().catch(err => {
  console.error(`Unhandled error: ${err.message}`);
  process.exit(1);
});
