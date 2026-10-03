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
 * Section 10 (the hermetic publish path; `.kiro/issues/2026-10-01-in-repo-generate-output-
 * contaminates-package-dist.md`, 2026-10-03; ballot 2026-10-03-hermetic-publish-path) adds the
 * publish-path checks: the eight root token files, `themes: []` in the packed commit's
 * `designerpunk.config.ts`, NO leftover `dist/` files, the MCP bundles' module roots all in the root
 * `node_modules/`, and no machine path in `dist/**`. 15.0.0's public artifact (built in a working
 * checkout) would have failed the leftover and bundle-shape checks.
 *
 * Three ways to get the listing. Every check runs in all three; only where the bytes come from differs:
 *   npx tsx scripts/pack-assert.ts                       listing from `npm pack --dry-run --ignore-scripts`
 *                                                        in this repo; contents read from this tree (legacy;
 *                                                        assumes `npm run build` just ran).
 *   npx tsx scripts/pack-assert.ts --pack                `npm pack` WITH lifecycle scripts (prepack builds)
 *                                                        into a temp dir, then the tarball mode below.
 *                                                        `npm run test:pack-contents` runs this.
 *   npx tsx scripts/pack-assert.ts --tarball <tgz> [--root <dir>]
 *                                                        the listing and contents of a tarball; <dir> is the
 *                                                        tree it was built from (default: this repo).
 *                                                        `scripts/release-publish.ts` runs this on the
 *                                                        tarball it publishes.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { execFileSync, spawnSync } from 'child_process';

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

export interface Finding {
  ok: boolean;
  label: string;
  detail?: string;
}

/**
 * What the checks read: the packed path list, a reader for a packed file's text, and the tree the
 * package was built from (`floor-closure.json`, `package.json`, `designerpunk.config.ts`, the
 * `governance/` count and the sources the leftover check maps `dist/` files back to).
 */
export interface PackListing {
  root: string;
  paths: string[];
  read: (packedPath: string) => string | undefined;
}

let findings: Finding[] = [];

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

/** Runs every section over `listing` and returns the findings (no printing, no exit). */
export function assertPackListing(listing: PackListing): Finding[] {
  findings = [];
  const root = listing.root;
  const floorClosurePath = path.join(root, 'floor-closure.json');
  if (!fs.existsSync(floorClosurePath)) {
    check(false, `floor-closure.json present at ${floorClosurePath}`, 'run: npx tsx scripts/floor-closure.ts');
    return findings;
  }
  const floorClosure = JSON.parse(fs.readFileSync(floorClosurePath, 'utf8'));
  const closure2Files: string[] = floorClosure.closure2.files;

  const allPaths = listing.paths;
  const packedPaths = new Set(allPaths);

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
  const schemaCount = allPaths.filter((p) => p.endsWith('.schema.yaml')).length;
  const contractsCount = allPaths.filter((p) => p.endsWith('/contracts.yaml')).length;
  const componentMetaCount = allPaths.filter((p) => p.endsWith('/component-meta.yaml')).length;
  check(schemaCount > 0 && schemaCount === contractsCount && contractsCount === componentMetaCount,
    `component metadata floor: schema=${schemaCount} contracts=${contractsCount} component-meta=${componentMetaCount} (expect equal, > 0)`);

  // --- 4. REMOVE paths absent ---
  check(!packedPaths.has('designerpunk.config.ts'), 'REMOVE absent: designerpunk.config.ts');
  const productTemplateFiles = allPaths.filter((p) => p.startsWith('product-template/'));
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
  const productMcpSrc = allPaths.filter((p) => p.startsWith('product-mcp-server/src/'));
  check(productMcpSrc.length === 0, 'NOT ADDED: product-mcp-server/src/**', productMcpSrc.join(', '));

  // --- 6. No __tests__ / examples under src/components/** (Req 3.4's exact
  // scope — application-mcp-server/src/ and mcp-server/src/ are SEPARATE,
  // pre-existing wholesale files[] entries C5 does not touch, per DD14; their
  // own __tests__ dirs ship unchanged and are correctly out of this check) ---
  const componentTestPaths = allPaths.filter((p) => /^src\/components\/.*\/__tests__(\/|$)/.test(p));
  check(componentTestPaths.length === 0, 'no __tests__ paths ship under src/components/**', componentTestPaths.slice(0, 10).join(', '));
  const exampleComponentPaths = allPaths.filter((p) => /^src\/components\/.*\/examples(\/|$)/.test(p));
  check(exampleComponentPaths.length === 0, 'no component examples/ paths ship', exampleComponentPaths.slice(0, 10).join(', '));

  // --- 7. iOS platform-closure rows (Kenya R2, corrected counts) ---
  const iosComponentSwift = allPaths.filter((p) => /^src\/components\/core\/[^/]+\/platforms\/ios\/.*\.swift$/.test(p));
  const iosComponentTests = iosComponentSwift.filter((p) => p.endsWith('Tests.swift'));
  const iosBlend = allPaths.filter((p) => /^src\/blend\/.*\.ios\.swift$/.test(p));
  const iosTokenPlatform = allPaths.filter((p) => p.startsWith('src/tokens/platforms/ios/'));

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
  const androidComponentKt = allPaths.filter((p) => /^src\/components\/core\/[^/]+\/platforms\/android\/.*\.kt$/.test(p));
  const androidComponentTest = androidComponentKt.filter((p) => p.endsWith('Test.kt'));
  const androidRes = allPaths.filter((p) => /^src\/components\/core\/[^/]+\/platforms\/android\/res\//.test(p));
  const androidBlend = allPaths.filter((p) => /^src\/blend\/.*\.android\.kt$/.test(p));
  const androidTokenPlatform = allPaths.filter((p) => p.startsWith('src/tokens/platforms/android/'));
  const androidGitkeepSwept = allPaths.filter((p) => /^src\/components\/core\/.*\/platforms\/android\/.*\.gitkeep$/.test(p));

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
  assertDeferredRows(packedPaths, root);

  // --- 10. The hermetic publish path (2026-10-03) ---
  for (const f of publishPathFindings(listing)) findings.push(f);

  return findings;
}

/** Prints every finding and the pass count; returns the number that failed. */
export function reportFindings(all: Finding[], summary?: string): number {
  const failed = all.filter((f) => !f.ok);
  for (const f of all) {
    console.log(`${f.ok ? 'PASS' : 'FAIL'}: ${f.label}${f.detail ? ` — ${f.detail}` : ''}`);
  }
  console.log(`\n${all.length - failed.length}/${all.length} assertions passed.`);
  if (summary) console.log(summary);
  if (failed.length > 0) console.error(`\nFAIL: ${failed.length} assertion(s) failed.`);
  return failed.length;
}

/** Extracts `tgz` into a fresh temp dir; returns the package dir (npm tarballs hold everything under `package/`). */
export function extractTarball(tgz: string): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pack-assert-'));
  execFileSync('tar', ['-xzf', path.resolve(tgz), '-C', dir]);
  const pkgDir = path.join(dir, 'package');
  if (!fs.existsSync(pkgDir)) throw new Error(`${tgz}: no package/ directory inside the tarball`);
  return pkgDir;
}

/** The listing of an extracted tarball: every packed path, read from the extraction. */
export function tarballListing(pkgDir: string, root: string): PackListing {
  return {
    root,
    paths: walkFiles(pkgDir, '', false).sort(),
    read: (p) => {
      const abs = path.join(pkgDir, p);
      return fs.existsSync(abs) ? fs.readFileSync(abs, 'utf8') : undefined;
    },
  };
}

/** Asserts a tarball. The extraction is removed afterwards. */
export function assertTarball(tgz: string, root: string): { findings: Finding[]; fileCount: number } {
  const pkgDir = extractTarball(tgz);
  try {
    const listing = tarballListing(pkgDir, root);
    return { findings: assertPackListing(listing), fileCount: listing.paths.length };
  } finally {
    fs.rmSync(path.dirname(pkgDir), { recursive: true, force: true });
  }
}

/** `npm pack` in `root` WITH lifecycle scripts (prepack builds) into a fresh temp dir; returns the tarball path. */
export function packWithScripts(root: string): string {
  const dest = fs.mkdtempSync(path.join(os.tmpdir(), 'pack-contents-'));
  const r = spawnSync('npm', ['pack', '--pack-destination', dest], { cwd: root, stdio: 'inherit' });
  if (r.status !== 0) throw new Error(`npm pack (scripts on) exited ${r.status}`);
  const tgzs = fs.readdirSync(dest).filter((f) => f.endsWith('.tgz'));
  if (tgzs.length !== 1) throw new Error(`expected exactly one .tgz in ${dest}, found ${tgzs.length}`);
  return path.join(dest, tgzs[0]);
}

export function parseArgs(argv: string[]): { mode: 'legacy' | 'pack' | 'tarball'; tarball?: string; root: string } {
  let mode: 'legacy' | 'pack' | 'tarball' = 'legacy';
  let tarball: string | undefined;
  let root = PROJECT_ROOT;
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--pack') mode = 'pack';
    else if (a === '--tarball') {
      tarball = argv[++i];
      if (!tarball) throw new Error('--tarball needs a path');
      mode = 'tarball';
    } else if (a === '--root') {
      const r = argv[++i];
      if (!r) throw new Error('--root needs a directory');
      root = path.resolve(r);
    } else throw new Error(`unknown argument: ${a}`);
  }
  return { mode, tarball, root };
}

function main(): void {
  const args = parseArgs(process.argv.slice(2));
  let all: Finding[];
  let summary: string;
  if (args.mode === 'legacy') {
    const pack = runPackDryRun();
    const listing: PackListing = {
      root: args.root,
      paths: pack.files.map((f) => f.path),
      read: (p) => {
        const abs = path.join(args.root, p);
        return fs.existsSync(abs) ? fs.readFileSync(abs, 'utf8') : undefined;
      },
    };
    all = assertPackListing(listing);
    summary = `Tarball (dry run, --ignore-scripts): entryCount=${pack.entryCount} size=${pack.size} unpackedSize=${pack.unpackedSize}`;
  } else {
    const tgz = args.mode === 'pack' ? packWithScripts(args.root) : path.resolve(args.tarball as string);
    try {
      const r = assertTarball(tgz, args.root);
      all = r.findings;
      summary = `Tarball: ${tgz} entryCount=${r.fileCount}`;
    } finally {
      // --pack made the tarball in its own temp dir; nothing else uses it. A --tarball input is never removed.
      if (args.mode === 'pack') fs.rmSync(path.dirname(tgz), { recursive: true, force: true });
    }
  }
  if (reportFindings(all, summary) > 0) process.exit(1);
}

/** Every regular file under `dir` (repo-relative, forward slashes), skipping OS junk npm itself never packs. */
function walkFiles(dir: string, rel = '', skipJunk = true): string[] {
  const out: string[] = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skipJunk && entry.name === '.DS_Store') continue;
    const childRel = rel ? `${rel}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...walkFiles(path.join(dir, entry.name), childRel, skipJunk));
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

function assertDeferredRows(packedPaths: Set<string>, root: string): void {
  const packed = [...packedPaths];
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));

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
  const { unexpected, missing: missingSteering } = steeringSetDiff(packed);
  check(
    unexpected.length === 0 && missingSteering.length === 0,
    `deferred REMOVE absent: the packed set under .kiro/steering/ equals exactly the ${SHIPPED_IDENTITY_DOCS.length} identity docs`,
    `unexpected: [${unexpected.join(', ')}] missing: [${missingSteering.join(', ')}]`
  );
  // The shipping half of `.kiro/issues/2026-09-27-attribution-sidecars-shipped.md`: the sidecars lived under `.kiro/agents/`.
  const sidecars = packed.filter((p) => p.endsWith('.attribution.json'));
  check(sidecars.length === 0, 'attribution sidecars ABSENT: no packed *.attribution.json', sidecars.slice(0, 10).join(', '));
  check(!packedPaths.has('.kiro/steering/personal-note.md'), "deferred REMOVE absent: .kiro/steering/personal-note.md (Peter's personal note never ships)");

  // Negated paths absent (trailing slash — `dist/web/` never matches `dist/web-something`).
  for (const dir of NEGATED_DIST_DIRS) {
    const hit = packed.filter((p) => p.startsWith(dir));
    const onDisk = walkFiles(path.join(root, dir)).length;
    check(hit.length === 0, `negated absent: no packed path starts with ${dir}`, `${hit.length} packed; the build tree holds ${onDisk} file(s) there`);
  }

  // `governance/` STAYS (C5 never lists it as a removal; C20 reads ambient embeds from packageRoot/governance):
  // the packed count equals the tree's count (derived, not copied), plus a sentinel.
  const governanceInTree = walkFiles(path.join(root, 'governance')).length;
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
    .readdirSync(path.join(root, 'dist'), { withFileTypes: true })
    .filter((e) => e.isFile() && rootGlob.test(e.name))
    .map((e) => `dist/${e.name}`)
    .sort();
  const rootMissing = rootFiles.filter((f) => !packedPaths.has(f));
  check(rootFiles.length > 0 && rootMissing.length === 0, `dist/ root files KEPT: all ${rootFiles.length} the glob selects still pack`, rootMissing.length ? `missing: ${rootMissing.join(', ')}` : rootFiles.map((f) => f.slice(5)).join(' '));
}

/** The packed `.kiro/steering/` set against the eight identity docs: what is extra, what is missing. */
export function steeringSetDiff(packed: string[]): { unexpected: string[]; missing: string[] } {
  const steering = packed.filter((p) => p.startsWith('.kiro/steering/')).sort();
  const expected = [...SHIPPED_IDENTITY_DOCS].sort();
  return {
    unexpected: steering.filter((p) => !expected.includes(p)),
    missing: expected.filter((p) => !steering.includes(p)),
  };
}

// ─── Section 10: the hermetic publish path ──────────────────────────────────────────────────────

/** The eight root token files every release ships (the 2026-10-02 deferral's guard 2). */
export const ROOT_TOKEN_FILES = [
  'dist/ComponentTokens.android.kt',
  'dist/ComponentTokens.ios.swift',
  'dist/ComponentTokens.web.css',
  'dist/DesignTokens.android.kt',
  'dist/DesignTokens.dtcg.json',
  'dist/DesignTokens.figma.json',
  'dist/DesignTokens.ios.swift',
  'dist/DesignTokens.web.css',
];

/**
 * How a packed `dist/` file is known NOT to be a leftover. A clean build produces exactly:
 *  (a) `tsc` output: `dist/<rel>.js` / `dist/<rel>.d.ts` from `src/<rel>.ts|.tsx|.js`, and imported
 *      JSON copied as `dist/<rel>.json` from `src/<rel>.json` (`resolveJsonModule`);
 *  (b) the non-`tsc` producers named below, by EXACT file name per directory;
 *  (c) `dist/consumer-canonical/**`, whose producer deletes the directory before writing it
 *      (`tools/agent-generator/consumer-entry.ts`, `buildConsumerCanonical`), so nothing stale can survive there.
 * Anything else packed under `dist/` is a leftover. The rule is "a source or a named producer exists
 * in the build tree", read from the tree the tarball was built from; it is NOT a comparison against
 * a second build. A new producer output fails this check until it is named here (a loud red, never a
 * silent pass). Measured 2026-10-03: a clean build packs 977 `dist/` files and all 977 are accounted for.
 */
export const PRODUCER_OUTPUTS: Record<string, string[]> = {
  'dist/': [...ROOT_TOKEN_FILES.map((f) => f.slice('dist/'.length)), 'name-contract.json'],
  'dist/mcp/': ['application-mcp.js', 'docs-mcp.js', 'product-mcp.js', 'tool-manifest.json'],
  'dist/generator/': ['consumer-entry.js'],
  'dist/browser/': [
    'demo-styles.css',
    'designerpunk.esm.js',
    'designerpunk.esm.min.js',
    'designerpunk.umd.js',
    'designerpunk.umd.min.js',
    'tokens.css',
  ],
};
export const SELF_CLEANING_DIRS = ['dist/consumer-canonical/'];

/** Candidate sources (repo-relative) a `tsc`-emitted `dist/` file may come from. */
export function sourceCandidates(distPath: string): string[] {
  const rel = distPath.slice('dist/'.length);
  if (rel.endsWith('.d.ts')) {
    const base = rel.slice(0, -'.d.ts'.length);
    return [`src/${base}.ts`, `src/${base}.tsx`, `src/${base}.js`];
  }
  if (rel.endsWith('.js')) {
    const base = rel.slice(0, -'.js'.length);
    return [`src/${base}.ts`, `src/${base}.tsx`, `src/${base}.js`];
  }
  return [`src/${rel}`];
}

/** Packed `dist/` files that neither a source in `root` nor a named producer accounts for. */
export function findLeftovers(paths: string[], exists: (repoRelative: string) => boolean): string[] {
  const out: string[] = [];
  for (const p of paths) {
    if (!p.startsWith('dist/')) continue;
    if (SELF_CLEANING_DIRS.some((d) => p.startsWith(d))) continue;
    const dir = p.slice(0, p.lastIndexOf('/') + 1);
    const name = p.slice(dir.length);
    if (PRODUCER_OUTPUTS[dir]?.includes(name)) continue;
    // A directory owned by a named producer holds only that producer's files: anything else there is stale.
    if (dir !== 'dist/' && PRODUCER_OUTPUTS[dir]) { out.push(p); continue; }
    if (sourceCandidates(p).some(exists)) continue;
    out.push(p);
  }
  return out;
}

/**
 * The module roots an esbuild bundle embeds, read from its `// <path>` module comments: `root` counts the
 * comments whose path starts at the root `node_modules/`; `nested` lists every other prefix in front of a
 * `node_modules/` segment (e.g. `mcp-server/`, i.e. a gitignored nested install the build happened to find).
 */
export function bundleModuleRoots(source: string): { root: number; nested: string[] } {
  let root = 0;
  const nested = new Set<string>();
  const re = /^\/\/ (\S*?)node_modules\//gm;
  let m: RegExpExecArray | null;
  while ((m = re.exec(source)) !== null) {
    if (m[1] === '') root++;
    else nested.add(m[1]);
  }
  return { root, nested: [...nested].sort() };
}

/**
 * `themes` in `designerpunk.config.ts` is exactly `[]`: the package ships the base theme only (sub-risk (b)
 * in the dist-contamination issue). Comments are stripped first, so a commented-out example cannot satisfy or
 * break it. Exactly one `themes:` property must exist.
 */
export function themesAreEmpty(configSource: string): { ok: boolean; detail: string } {
  const stripped = configSource.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1');
  const matches = [...stripped.matchAll(/\bthemes\s*:\s*\[([\s\S]*?)\]/g)];
  if (matches.length !== 1) return { ok: false, detail: `found ${matches.length} \`themes: [...]\` properties (expect exactly 1)` };
  const inner = matches[0][1].trim();
  return inner === '' ? { ok: true, detail: 'themes: []' } : { ok: false, detail: `themes holds: ${inner.slice(0, 120)}` };
}

/** Packed `dist/` files whose text contains any of `needles` (machine paths). */
export function findMachinePaths(paths: string[], read: (p: string) => string | undefined, needles: string[]): string[] {
  const hits: string[] = [];
  for (const p of paths) {
    if (!p.startsWith('dist/')) continue;
    const text = read(p);
    if (text !== undefined && needles.some((n) => text.includes(n))) hits.push(p);
  }
  return hits;
}

/** The absolute forms of `root` that must never appear in shipped bytes (as given and with symlinks resolved). */
export function machinePathNeedles(root: string): string[] {
  const needles = new Set<string>(['/Users/', path.resolve(root)]);
  try {
    needles.add(fs.realpathSync(root));
  } catch {
    /* root may not exist in a unit test */
  }
  return [...needles];
}

/** Section 10's findings for one listing. Exported for the unit tests. */
export function publishPathFindings(listing: PackListing): Finding[] {
  const out: Finding[] = [];
  const add = (ok: boolean, label: string, detail?: string): void => {
    out.push({ ok, label, detail });
  };
  const paths = listing.paths;
  const packed = new Set(paths);

  // 10a. The eight root token files.
  for (const f of ROOT_TOKEN_FILES) add(packed.has(f), `publish path: root token file present: ${f}`);

  // 10b. `themes: []` in the source config of the packed commit.
  const configPath = path.join(listing.root, 'designerpunk.config.ts');
  if (fs.existsSync(configPath)) {
    const t = themesAreEmpty(fs.readFileSync(configPath, 'utf8'));
    add(t.ok, 'publish path: designerpunk.config.ts registers no theme (themes: [])', t.detail);
  } else {
    add(false, 'publish path: designerpunk.config.ts registers no theme (themes: [])', `${configPath} not found`);
  }

  // 10c. No leftover dist/ files.
  const leftovers = findLeftovers(paths, (rel) => fs.existsSync(path.join(listing.root, rel)));
  const distCount = paths.filter((p) => p.startsWith('dist/')).length;
  add(distCount > 0, 'publish path: dist/ files were packed (the leftover check is not vacuous)', `${distCount} packed`);
  add(leftovers.length === 0, 'publish path: no leftover dist/ files (every packed dist/ file has a source or a named producer)',
    leftovers.length ? `${leftovers.length}: ${leftovers.slice(0, 15).join(', ')}${leftovers.length > 15 ? ', …' : ''}` : `${distCount} accounted for`);

  // 10d. Bundle shape: every node_modules module root in dist/mcp/*.js is the ROOT node_modules/.
  const bundles = paths.filter((p) => /^dist\/mcp\/[^/]+\.js$/.test(p)).sort();
  add(bundles.length >= 3, 'publish path: MCP bundles found to inspect (>= 3)', bundles.join(', '));
  for (const b of bundles) {
    const src = listing.read(b) ?? '';
    const r = bundleModuleRoots(src);
    add(r.root > 0 && r.nested.length === 0,
      `publish path: ${b} resolves every module from the root node_modules/`,
      `root modules ${r.root}; nested roots [${r.nested.join(', ')}]`);
  }

  // 10e. No machine path in dist/**.
  const needles = machinePathNeedles(listing.root);
  const machine = findMachinePaths(paths, listing.read, needles);
  add(machine.length === 0, `publish path: no machine path in dist/** (${needles.join(' | ')})`, machine.slice(0, 10).join(', '));

  return out;
}

if (require.main === module) {
  main();
}
