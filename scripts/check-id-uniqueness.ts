#!/usr/bin/env tsx
/**
 * check-id-uniqueness.ts — build-time `id` uniqueness guard CLI (Spec 119-A Task 4.2).
 *
 * The CI backstop leg of "one function, two callers" (design B1). Thin `tsx` CLI
 * wrapper over the testable core `mcp-server/src/id-guard/check-id-uniqueness.ts`.
 * The SAME exported `checkIdUniqueness` is also invoked by the Thurgood
 * metadata-validation hook (scripts/validate-steering-metadata.js) — the
 * day-to-day front line. This CLI is the CI backstop.
 *
 *   npm run check:id-uniqueness        # via package.json
 *   npx tsx scripts/check-id-uniqueness.ts
 *
 * Scans BOTH governance/ (future; empty until Task 6) and .kiro/steering/.
 * Exits non-zero on any id collision (explicit OR derived), naming all colliding
 * paths. Exceptions (idSource: 'none') are REPORTED but do not fail the guard —
 * the guard's contract is uniqueness; exceptions are a backfill/adjudication
 * concern surfaced for visibility.
 */

import * as path from 'path';
import {
  checkIdUniqueness,
  STEERING_ROOTS,
} from '../mcp-server/src/id-guard/check-id-uniqueness';

const PROJECT_ROOT = path.resolve(__dirname, '..');

function main(): void {
  const result = checkIdUniqueness([...STEERING_ROOTS], PROJECT_ROOT);

  console.log('=== id Uniqueness Guard (Spec 119-A) ===');
  console.log(`  Roots scanned: ${STEERING_ROOTS.join(', ')} (governance/ may be empty pre-relocation)`);
  console.log(`  Total docs scanned: ${result.totalDocs}`);
  console.log(`  Derived (no on-disk id: — backfill worklist): ${result.derived.length}`);
  if (result.exceptions.length > 0) {
    console.log(`  Exceptions (idSource:'none' — no derivable id, NOT a collision): ${result.exceptions.length}`);
    for (const e of result.exceptions) console.log(`    - ${e}`);
  }

  if (result.ok) {
    console.log('\n  RESULT: PASS — every id is unique across both roots.');
    process.exit(0);
  }

  console.error('\n  RESULT: FAIL — id collision(s) detected (explicit OR derived):');
  for (const [id, paths] of Object.entries(result.collisions)) {
    console.error(`    id "${id}" claimed by ${paths.length} docs:`);
    for (const p of paths) console.error(`      - ${p}`);
  }
  console.error('\n  Resolve by adjusting a colliding doc\'s name:/id: (human adjudication).');
  process.exit(1);
}

main();
