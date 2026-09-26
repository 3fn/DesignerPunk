#!/usr/bin/env tsx
/**
 * pack-assert.ts — asserts the packaging floor against a real `npm pack
 * --dry-run --json` listing (Spec 123 Task 3; design.md § "C5"; Req 4.3, 4.4,
 * 4.5, DD14).
 *
 * Reads closure 2 from the REGENERATED `floor-closure.json` (Ada D-T-B1/(a)) —
 * NEVER a copy embedded in this script — so a future drift between the tree
 * and `package.json`'s `files[]` is caught as a red assertion, not silently
 * frozen. Callers run `npx tsx scripts/floor-closure.ts` first if the JSON
 * might be stale (this script does not regenerate it itself, to keep the two
 * steps independently re-runnable and cheap to diff).
 *
 * Assumes `dist/` already reflects the current source (run `npm run build`
 * first). Uses `--ignore-scripts` so this script never triggers an implicit
 * rebuild — a stale `dist/` is the caller's bug to fix, not this script's to
 * paper over.
 *
 * Usage: npx tsx scripts/pack-assert.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { execFileSync } from 'child_process';

const PROJECT_ROOT = path.resolve(__dirname, '..');
const FLOOR_CLOSURE_PATH = path.join(PROJECT_ROOT, 'floor-closure.json');

interface PackEntry {
  path: string;
}
interface PackResult {
  files: PackEntry[];
  entryCount: number;
  size: number;
  unpackedSize: number;
}

interface Finding {
  ok: boolean;
  label: string;
  detail?: string;
}

const findings: Finding[] = [];

function check(ok: boolean, label: string, detail?: string): void {
  findings.push({ ok, label, detail });
}

function runPackDryRun(): PackResult {
  const out = execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], {
    cwd: PROJECT_ROOT,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
  const parsed = JSON.parse(out);
  return parsed[0] as PackResult;
}

function main(): void {
  if (!fs.existsSync(FLOOR_CLOSURE_PATH)) {
    console.error(`FAIL: ${path.relative(PROJECT_ROOT, FLOOR_CLOSURE_PATH)} does not exist. Run: npx tsx scripts/floor-closure.ts`);
    process.exit(1);
  }
  const floorClosure = JSON.parse(fs.readFileSync(FLOOR_CLOSURE_PATH, 'utf8'));
  const closure2Files: string[] = floorClosure.closure2.files;

  const pack = runPackDryRun();
  const packedPaths = new Set(pack.files.map((f) => f.path));

  // --- 1. Every closure-2 ADD path present (read from the REGENERATED JSON) ---
  for (const f of closure2Files) {
    check(packedPaths.has(f), `closure-2 ADD present: ${f}`);
  }

  // --- 2. Other declared-floor ADD paths present (C5; not part of closure 2 itself) ---
  const declaredFloorAdds = [
    'src/cli/templates/mcp-config.json.template',
    'src/styles/responsive-grid.css',
    'src/assets/fonts/rajdhani/rajdhani.css',
  ];
  for (const f of declaredFloorAdds) {
    check(packedPaths.has(f), `declared-floor ADD present: ${f}`);
  }

  // --- 3. Component metadata floor present, with a count ---
  const schemaCount = pack.files.filter((f) => f.path.endsWith('.schema.yaml')).length;
  const contractsCount = pack.files.filter((f) => f.path.endsWith('/contracts.yaml')).length;
  const componentMetaCount = pack.files.filter((f) => f.path.endsWith('/component-meta.yaml')).length;
  check(schemaCount > 0 && schemaCount === contractsCount && contractsCount === componentMetaCount,
    `component metadata floor: schema=${schemaCount} contracts=${contractsCount} component-meta=${componentMetaCount} (expect equal, > 0)`);

  // --- 4. REMOVE paths absent ---
  check(!packedPaths.has('designerpunk.config.ts'), 'REMOVE absent: designerpunk.config.ts');
  const productTemplateFiles = [...packedPaths].filter((p) => p.startsWith('product-template/'));
  check(productTemplateFiles.length === 0, 'REMOVE absent: product-template/**', productTemplateFiles.join(', '));

  // Sentinel proof that wholesale "src/" is gone (a raw component source file
  // that is NOT on the declared floor and NOT a kept platform-native file).
  const wholesaleSentinels = [
    'src/components/core/Avatar-Base/index.ts',
    'src/components/core/Avatar-Base/platforms/web/Avatar.web.ts',
    'src/validators/buildValidation.ts',
    'src/generators/TokenFileGenerator.ts',
    'src/cli/init.ts',
  ];
  for (const f of wholesaleSentinels) {
    check(!packedPaths.has(f), `wholesale-src sentinel absent: ${f}`);
  }

  // --- 5. product-mcp-server/src/ NOT ADDED (DD14) ---
  const productMcpSrc = [...packedPaths].filter((p) => p.startsWith('product-mcp-server/src/'));
  check(productMcpSrc.length === 0, 'NOT ADDED: product-mcp-server/src/**', productMcpSrc.join(', '));

  // --- 6. No __tests__ / examples under src/components/** (Req 3.4's exact
  // scope — application-mcp-server/src/ and mcp-server/src/ are SEPARATE,
  // pre-existing wholesale files[] entries C5 does not touch, per DD14; their
  // own __tests__ dirs ship unchanged and are correctly out of this check) ---
  const componentTestPaths = [...packedPaths].filter((p) => /^src\/components\/.*\/__tests__(\/|$)/.test(p));
  check(componentTestPaths.length === 0, 'no __tests__ paths ship under src/components/**', componentTestPaths.slice(0, 10).join(', '));
  const exampleComponentPaths = [...packedPaths].filter((p) => /^src\/components\/.*\/examples(\/|$)/.test(p));
  check(exampleComponentPaths.length === 0, 'no component examples/ paths ship', exampleComponentPaths.slice(0, 10).join(', '));

  // --- 7. iOS platform-closure rows (Kenya R2, corrected counts) ---
  const iosComponentSwift = [...packedPaths].filter((p) => /^src\/components\/core\/[^/]+\/platforms\/ios\/.*\.swift$/.test(p));
  const iosComponentTests = iosComponentSwift.filter((p) => p.endsWith('Tests.swift'));
  const iosBlend = [...packedPaths].filter((p) => /^src\/blend\/.*\.ios\.swift$/.test(p));
  const iosTokenPlatform = [...packedPaths].filter((p) => p.startsWith('src/tokens/platforms/ios/'));

  check(iosComponentSwift.length - iosComponentTests.length === 39,
    `iOS component .swift PRESENT (excl. *Tests.swift) = 39`, `measured ${iosComponentSwift.length - iosComponentTests.length}`);
  check(iosComponentTests.length === 0, 'iOS *Tests.swift ABSENT = 0', `measured ${iosComponentTests.length}`);
  check(iosBlend.length === 1, 'iOS src/blend/*.ios.swift PRESENT = 1', `measured ${iosBlend.length}`);
  // NOTE: measured directly against this tree (Task 3.4) — 2 files (MotionTokens.swift,
  // MotionTokens.md). Kenya R2 claimed 3 ("...README.md — all three ship"); no
  // README.md exists at this path in git history at any point. Recorded as an
  // apparent measurement slip in her review (see completion doc), not a source
  // change to attribute — the asserted count here is the RE-MEASURED one.
  check(iosTokenPlatform.length === 2, 'iOS src/tokens/platforms/ios/** PRESENT = 2 (re-measured; see completion doc)', `measured ${iosTokenPlatform.length}`);

  // --- 8. Android platform-closure rows (Data R2, corrected counts) ---
  const androidComponentKt = [...packedPaths].filter((p) => /^src\/components\/core\/[^/]+\/platforms\/android\/.*\.kt$/.test(p));
  const androidComponentTest = androidComponentKt.filter((p) => p.endsWith('Test.kt'));
  const androidRes = [...packedPaths].filter((p) => /^src\/components\/core\/[^/]+\/platforms\/android\/res\//.test(p));
  const androidBlend = [...packedPaths].filter((p) => /^src\/blend\/.*\.android\.kt$/.test(p));
  const androidTokenPlatform = [...packedPaths].filter((p) => p.startsWith('src/tokens/platforms/android/'));
  const androidGitkeepSwept = [...packedPaths].filter((p) => /^src\/components\/core\/.*\/platforms\/android\/.*\.gitkeep$/.test(p));

  check(androidComponentKt.length - androidComponentTest.length === 39,
    'Android component .kt PRESENT (incl. *Preview.kt, excl. *Test.kt) = 39', `measured ${androidComponentKt.length - androidComponentTest.length}`);
  check(androidComponentTest.length === 0, 'Android *Test.kt ABSENT = 0', `measured ${androidComponentTest.length}`);
  check(androidRes.length === 51, 'Android res/** PRESENT = 51 (50 drawable XML + README.md)', `measured ${androidRes.length}`);
  check(androidBlend.length === 1, 'Android src/blend/*.android.kt PRESENT = 1', `measured ${androidBlend.length}`);
  check(androidTokenPlatform.length === 2, 'Android src/tokens/platforms/android/** PRESENT = 2', `measured ${androidTokenPlatform.length}`);
  // Data R2 counted 8 .gitkeep files as "swept in by ** (harmless)". This
  // implementation's globs (*.kt, res/**) do NOT sweep the 8 bare
  // `platforms/android/.gitkeep` placeholders in — a deliberate divergence,
  // recorded in the completion doc, not a defect.
  check(androidGitkeepSwept.length === 0, 'Android bare platforms/android/.gitkeep NOT swept in (deliberate; see completion doc)', `measured ${androidGitkeepSwept.length}`);

  // --- Report ---
  const failed = findings.filter((f) => !f.ok);
  for (const f of findings) {
    console.log(`${f.ok ? 'PASS' : 'FAIL'}: ${f.label}${f.detail ? ` — ${f.detail}` : ''}`);
  }
  console.log(`\n${findings.length - failed.length}/${findings.length} assertions passed.`);
  console.log(`Tarball: entryCount=${pack.entryCount} size=${pack.size} unpackedSize=${pack.unpackedSize}`);

  if (failed.length > 0) {
    console.error(`\nFAIL: ${failed.length} assertion(s) failed.`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
