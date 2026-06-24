#!/usr/bin/env node
/**
 * Resolution-matrix ORCHESTRATOR (Spec 118, Task 1).
 *
 * Spawns a REAL `node` subprocess per (approach x row x authoring-direction)
 * cell via runner.js, collects the structured JSON result, and prints a
 * green/red table. NOTHING here runs under jest — each cell is a faithful
 * `loadConfig`-locus reproduction executed by `node` directly, so the candidate
 * loader is the only thing that can resolve a `.ts` config (THE critical
 * constraint: jest's module registry would otherwise mask the bug).
 *
 * Re-run with:  npm run test:resolution-matrix
 *           or: node src/config/__resolution-matrix__/run-matrix.js
 *           or: node src/config/__resolution-matrix__/run-matrix.js A B   (subset)
 *
 * Exit code 0 only if every selected non-baseline approach behaves as the
 * accept-criteria require for at least one fully-passing approach; otherwise 1.
 * (The orchestrator is a reporting harness, not a release gate — the standing
 * CI gate is the Task-3 subprocess consumer guard. This exits nonzero if NO
 * approach passes all rows, so a regression that breaks the selected loader is
 * visible when the harness is re-run.)
 */
'use strict';

const { spawnSync } = require('child_process');
const path = require('path');

const RUNNER = path.resolve(__dirname, 'runner.js');

// row id -> { dir, sentinel, direction }
const ROWS = [
  { id: 'source-directory import', direction: 'ESM', dir: 'fixtures/source-dir-esm', sentinel: 'source-dir-esm:index-resolved' },
  { id: 'source-directory import', direction: 'CJS', dir: 'fixtures/source-dir-cjs', sentinel: 'source-dir-cjs:index-resolved' },
  { id: 'faithful-consumer',       direction: 'ESM', dir: 'fixtures/faithful-esm',   sentinel: 'faithful-esm:my-overrides-resolved' },
  { id: 'faithful-consumer',       direction: 'CJS', dir: 'fixtures/faithful-cjs',   sentinel: 'faithful-cjs:my-overrides-resolved' },
];

// Default approaches: baseline + A + B. C only if explicitly requested AND jiti installed.
const requested = process.argv.slice(2);
const APPROACHES = requested.length ? requested : ['none', 'A', 'B'];

function runCell(approach, row) {
  const res = spawnSync('node', [RUNNER, approach, path.resolve(__dirname, row.dir), row.sentinel], {
    encoding: 'utf-8',
    cwd: __dirname,
  });
  let parsed = null;
  const line = (res.stdout || '').trim().split('\n').filter(Boolean).pop();
  try { parsed = JSON.parse(line); } catch { /* runner crashed before emitting */ }
  if (!parsed) {
    return { ok: false, sentinel: null, residue: { changed: false }, error: (res.stderr || 'no output').trim().split('\n')[0] };
  }
  return parsed;
}

const results = {}; // approach -> row-index -> cell

for (const approach of APPROACHES) {
  results[approach] = ROWS.map((row) => runCell(approach, row));
}

// ---- Print the table ----
function cellGlyph(cell) {
  if (cell.ok && !cell.residue.changed) return 'green';
  if (cell.ok && cell.residue.changed) return 'green*';   // resolved but left residue
  return 'red';
}

const label = (r) => `${r.id} [${r.direction}]`;
const labelW = Math.max(...ROWS.map((r) => label(r).length));

console.log('\n=== Spec 118 Resolution Matrix (real node subprocesses, NOT jest) ===\n');
const header = ['row'.padEnd(labelW), ...APPROACHES.map((a) => a.padEnd(8))].join(' | ');
console.log(header);
console.log('-'.repeat(header.length));
ROWS.forEach((row, i) => {
  const cells = APPROACHES.map((a) => cellGlyph(results[a][i]).padEnd(8));
  console.log([label(row).padEnd(labelW), ...cells].join(' | '));
});

console.log('\nLegend: green = resolved + sentinel matched + no residue;');
console.log('        green* = resolved + sentinel matched BUT left global residue (fails criterion e);');
console.log('        red = resolution failed (fail-loud threw) or sentinel mismatch.\n');

// Per-approach accept-criteria summary.
console.log('=== Accept-criteria summary (per approach) ===\n');
const summary = {};
for (const approach of APPROACHES) {
  if (approach === 'none') continue;
  const cells = results[approach];
  const allResolved = cells.every((c) => c.ok);                // (a)(b)(c) rows green both directions
  const noResidue = cells.every((c) => !c.residue.changed);    // (e)
  summary[approach] = { allResolved, noResidue };
  console.log(`Approach ${approach}:`);
  console.log(`  (a) failing rows green ......... ${cells.filter(c=>c.ok).length}/${cells.length}`);
  console.log(`  (b) both CJS & ESM authored .... ${allResolved ? 'PASS' : 'FAIL'}`);
  console.log(`  (e) no ambient/global residue .. ${noResidue ? 'PASS' : 'FAIL'}`);
  cells.forEach((c, i) => {
    if (!c.ok) console.log(`      red [${label(ROWS[i])}]: ${(c.error||'').split('\n')[0]}`);
    else if (c.residue.changed) console.log(`      residue [${label(ROWS[i])}]: module._resolveFilename not restored`);
  });
  console.log('');
}

// Exit nonzero if no non-baseline approach fully passes (a)(b)(c)+(e).
const anyFullPass = Object.values(summary).some((s) => s.allResolved && s.noResidue);
process.exit(anyFullPass ? 0 : 1);
