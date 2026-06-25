#!/usr/bin/env node
/**
 * Parity-harness STANDALONE RUNNER (Spec 118, Increment 2 — Task 7.1).
 *
 * Mirrors the precedent `src/config/__resolution-matrix__/run-matrix.js` +
 * `npm run test:resolution-matrix`: a thin `.js` entry that loads the `.ts`
 * orchestrator logic (via ts-node/register) and drives a real end-to-end run.
 *
 * Why standalone (not jest): it compares FILE OUTPUTS of two full generator runs,
 * not module loading — so jest's module interception is irrelevant. And two full
 * generations are slow; a standalone runner is the right packaging. The
 * orchestrator LOGIC lives in `../ParityOrchestrator.ts`, reused by the unit tests.
 *
 * Re-run with:  npm run test:parity
 *           or: node src/tools/integrity/__parity__/run-parity.js
 *
 * Exit code 0 only if every NON-optional inventory artifact is semantically GREEN
 * after normalization; otherwise 1 — so this can serve as a standing check.
 */
'use strict';

const path = require('path');

// Load TS on demand (this runner is plain .js, like run-matrix.js).
require('ts-node/register/transpile-only');

const repoRoot = path.resolve(__dirname, '../../../..');
const generatorScript = path.resolve(repoRoot, 'scripts/generate-platform-tokens.ts');

const { runParity, renderTable, TS_NODE_MECHANISM, TSX_MECHANISM } = require('../ParityOrchestrator');

console.log('Generating two fresh trees (ts-node, then tsx) to scratch cwds — this runs the full generator twice...');

const report = runParity({
  generatorScript,
  repoRoot,
  mechanismA: TS_NODE_MECHANISM,
  mechanismB: TSX_MECHANISM,
});

console.log(renderTable(report, TS_NODE_MECHANISM.label, TSX_MECHANISM.label));

process.exit(report.allGreen ? 0 : 1);
