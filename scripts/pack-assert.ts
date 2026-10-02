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
 * Task 16.3 added section 9: the DEFERRED `files[]` rows (C5; tasks.md Task 16
 * criterion 3, as amended 2026-09-30; Ada's consult, 2026-10-01) — every ADD
 * present, every REMOVE and negated path absent, every `exports` `./dist/*`
 * target present, `governance/` kept. The build must have run first:
 * `dist/consumer-canonical/` and `dist/generator/` are `build:generator`'s
 * outputs, and a stale `dist/` would false-green or false-red section 9.
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
  // CORRECTED at verification (task-3-4-completion.md addendum): the SETTLED
  // tasks.md criterion reads "`.gitkeep` = 8, INCLUDED and counted (swept in
  // by `**`; harmless)" — a ruled INCLUDE, not an open choice. An earlier
  // version of this assertion asserted 0 (excluded); corrected to assert the
  // ruled PRESENT count of 8, backed by an explicit `files[]` entry
  // (`src/components/core/**/platforms/android/.gitkeep`) rather than an
  // incidental sweep.
  check(androidGitkeepSwept.length === 8, 'Android platforms/android/.gitkeep PRESENT = 8 (ruled INCLUDE)', `measured ${androidGitkeepSwept.length}`);

  // --- 9. Task 16.3 — the deferred `files[]` rows (C5, tasks.md Task 16 criterion 3) ---
  assertDeferredRows(packedPaths);

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

/** Every regular file under `dir` (repo-relative, forward slashes), skipping OS junk npm itself never packs. */
function walkFiles(dir: string, rel = ''): string[] {
  const out: string[] = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === '.DS_Store') continue;
    const childRel = rel ? `${rel}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...walkFiles(path.join(dir, entry.name), childRel));
    else if (entry.isFile()) out.push(childRel);
  }
  return out;
}

/** Every string leaf of `package.json` `exports` that targets `./dist/` (nested condition objects included), without the leading `./`. */
function distExportTargets(exportsField: unknown): string[] {
  const out = new Set<string>();
  const visit = (node: unknown): void => {
    if (typeof node === 'string') {
      if (node.startsWith('./dist/')) out.add(node.slice(2));
    } else if (node && typeof node === 'object') {
      for (const v of Object.values(node as Record<string, unknown>)) visit(v);
    }
  };
  visit(exportsField);
  return [...out].sort();
}

/** The eight identity docs that ship by explicit path (C5; Ada's consult). `personal-note.md` is NOT among them: Peter's personal note never ships. */
const SHIPPED_IDENTITY_DOCS = [
  'Agent-Directory',
  'AI-Collaboration-Principles',
  'Civitas-System-Overview',
  'core-goals',
  'DesignerPunk-Systems-Overview',
  'Spec-Feedback-Protocol',
  'start-up-tasks',
  'Task-Completion-Protocol',
].map((n) => `.kiro/steering/${n}.md`);

/** Negated `dist/` subtrees (Ada's split packaging ruling): duplicate platform-token copies the root files already carry. */
const NEGATED_DIST_DIRS = ['dist/ios/', 'dist/android/', 'dist/web/'];

function assertDeferredRows(packedPaths: Set<string>): void {
  const packed = [...packedPaths];
  const pkg = JSON.parse(fs.readFileSync(path.join(PROJECT_ROOT, 'package.json'), 'utf8'));

  // ADD present: the generator bundle and the derived canonical.
  check(packedPaths.has('dist/generator/consumer-entry.js'), 'deferred ADD present: dist/generator/consumer-entry.js');
  const canonical = packed.filter((p) => p.startsWith('dist/consumer-canonical/'));
  for (const ext of ['.md', '.yaml', '.js']) {
    const n = canonical.filter((p) => p.endsWith(ext)).length;
    check(n > 0, `deferred ADD present: dist/consumer-canonical/ holds at least one ${ext} file`, `measured ${n} of ${canonical.length} packed there`);
  }

  // ADD present: the eight identity docs, by explicit path.
  for (const doc of SHIPPED_IDENTITY_DOCS) {
    check(packedPaths.has(doc), `deferred ADD present: ${doc}`);
  }

  // REMOVE absent: the agent copies, and every steering doc beyond the eight (incl. personal-note.md, named).
  const agents = packed.filter((p) => p.startsWith('.kiro/agents/'));
  check(agents.length === 0, 'deferred REMOVE absent: nothing under .kiro/agents/', agents.slice(0, 10).join(', '));
  const steering = packed.filter((p) => p.startsWith('.kiro/steering/')).sort();
  const expectedSteering = [...SHIPPED_IDENTITY_DOCS].sort();
  const unexpected = steering.filter((p) => !expectedSteering.includes(p));
  const missingSteering = expectedSteering.filter((p) => !steering.includes(p));
  check(
    unexpected.length === 0 && missingSteering.length === 0,
    `deferred REMOVE absent: the packed set under .kiro/steering/ equals exactly the ${expectedSteering.length} identity docs`,
    `unexpected: [${unexpected.join(', ')}] missing: [${missingSteering.join(', ')}]`
  );
  // The shipping half of `.kiro/issues/2026-09-27-attribution-sidecars-shipped.md`: the sidecars lived under `.kiro/agents/`.
  const sidecars = packed.filter((p) => p.endsWith('.attribution.json'));
  check(sidecars.length === 0, 'attribution sidecars ABSENT: no packed *.attribution.json', sidecars.slice(0, 10).join(', '));
  check(!packedPaths.has('.kiro/steering/personal-note.md'), "deferred REMOVE absent: .kiro/steering/personal-note.md (Peter's personal note never ships)");

  // Negated paths absent (trailing slash — `dist/web/` never matches `dist/web-something`).
  for (const dir of NEGATED_DIST_DIRS) {
    const hit = packed.filter((p) => p.startsWith(dir));
    const onDisk = walkFiles(path.join(PROJECT_ROOT, dir)).length;
    check(hit.length === 0, `negated absent: no packed path starts with ${dir}`, `${hit.length} packed; the build tree holds ${onDisk} file(s) there`);
  }

  // `governance/` STAYS (C5 never lists it as a removal; C20 reads ambient embeds from packageRoot/governance):
  // the packed count equals the tree's count (derived, not copied), plus a sentinel.
  const governanceInTree = walkFiles(path.join(PROJECT_ROOT, 'governance')).length;
  const governancePacked = packed.filter((p) => p.startsWith('governance/')).length;
  check(governancePacked === governanceInTree && governanceInTree > 0, 'governance/ kept: packed count equals the files under governance/ in the tree', `packed ${governancePacked}, tree ${governanceInTree}`);
  check(packedPaths.has('governance/Token-Governance.md'), 'governance/ kept: sentinel governance/Token-Governance.md present');

  // Every `exports` `./dist/*` target packs.
  const distTargets = distExportTargets(pkg.exports);
  check(distTargets.length > 0, 'exports: at least one ./dist/* target was found to check', `found ${distTargets.length}`);
  for (const target of distTargets) {
    check(packedPaths.has(target), `exports ./dist/* target packs: ${target}`);
  }

  // The `dist/` ROOT files stay KEPT. Enumerated from the built tree (the files the `dist/**/*.{js,d.ts,json,css,swift,kt}` glob
  // selects at the root), never from a copied list: each must still pack after the three negations.
  const rootGlob = /\.(js|d\.ts|json|css|swift|kt)$/;
  const rootFiles = fs
    .readdirSync(path.join(PROJECT_ROOT, 'dist'), { withFileTypes: true })
    .filter((e) => e.isFile() && rootGlob.test(e.name))
    .map((e) => `dist/${e.name}`)
    .sort();
  const rootMissing = rootFiles.filter((f) => !packedPaths.has(f));
  check(rootFiles.length > 0 && rootMissing.length === 0, `dist/ root files KEPT: all ${rootFiles.length} the glob selects still pack`, rootMissing.length ? `missing: ${rootMissing.join(', ')}` : rootFiles.map((f) => f.slice(5)).join(' '));
}

if (require.main === module) {
  main();
}
