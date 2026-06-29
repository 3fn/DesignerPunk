#!/usr/bin/env tsx
/**
 * generate-legacy-path-manifest.ts — Legacy-Path Forwarding Manifest producer CLI.
 *
 * Spec 119-A, Task 3 (Thurgood / Docs-MCP infra). Thin CLI wrapper over the
 * testable producer core in `mcp-server/src/legacy-path/generate-manifest.ts`.
 *
 * Runs against the CURRENT pre-rename / pre-relocation tree and FREEZES the result
 * to a checked-in JSON. This is a ONE-WAY GATE: after the Task 5 rename + Task 6
 * relocation, the original `.kiro/steering/…` strings no longer exist on disk and
 * cannot be recovered — the frozen JSON is the only record. MUST be run + checked
 * in BEFORE Tasks 5/6.
 *
 *   npx tsx scripts/generate-legacy-path-manifest.ts
 *
 * Writes: mcp-server/src/legacy-path/legacy-path-manifest.json
 */

import * as fs from 'fs';
import * as path from 'path';
import { buildLegacyPathManifest } from '../mcp-server/src/legacy-path/generate-manifest';

const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUT_PATH = path.join(
  PROJECT_ROOT,
  'mcp-server',
  'src',
  'legacy-path',
  'legacy-path-manifest.json',
);

function main(): void {
  const result = buildLegacyPathManifest(PROJECT_ROOT);

  fs.writeFileSync(OUT_PATH, JSON.stringify(result.manifest, null, 2) + '\n', 'utf-8');

  console.log('Legacy-path manifest generated (FROZEN — one-way gate before Tasks 5/6).');
  console.log(`  Output: ${path.relative(PROJECT_ROOT, OUT_PATH)}`);
  console.log(`  Live distinct prompt refs (grep-extracted): ${result.promptRefCount}`);
  console.log('  Per-prompt extracted refs:');
  for (const [file, n] of Object.entries(result.perPrompt)) {
    console.log(`    ${file}: ${n}`);
  }
  console.log(`  Manifest entries (de-duped, real-doc targets only): ${result.manifest.entries.length}`);
  if (result.skipped.length > 0) {
    console.log(`  Skipped (no target doc — NOT emitted): ${result.skipped.length}`);
    for (const s of result.skipped) {
      console.log(`    - ${s.legacyPath}  [${s.reason}]`);
    }
  }
  // The producer core already asserts every legacyPath is `..`-free (throws otherwise).
  console.log('  ..-free assertion: PASSED (producer throws on any `..` key).');
}

main();
