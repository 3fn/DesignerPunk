/**
 * Tests for `pack-assert.ts` section 10, the hermetic publish path
 * (`.kiro/issues/2026-10-01-in-repo-generate-output-contaminates-package-dist.md`, 2026-10-03;
 * ballot 2026-10-03-hermetic-publish-path).
 *
 * Every check is exercised for its BITE, not only its green: a planted leftover `dist/` file, a planted
 * nested-root bundle comment, a wrong steering set, a registered theme, a machine path. The fixtures are
 * synthetic trees in a temp dir, so these tests need no build and run anywhere `test:scripts` runs.
 *
 * The same checks were run against the two real 15.0.0 artifacts on 2026-10-03 (recorded in the issue
 * file): the public-npm tarball (sha1 48dd8cdd…) fails with exactly 62 leftovers and nested roots in
 * docs-mcp.js / application-mcp.js; the GitHub Packages tarball (sha1 65d2ec0b…) passes 94/94.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { execFileSync } from 'child_process';
import {
  bundleModuleRoots,
  extractTarball,
  findLeftovers,
  findMachinePaths,
  machinePathNeedles,
  MIN_MCP_BUNDLES,
  NESTED_ROOTS_HINT,
  parseArgs,
  PRODUCER_OUTPUTS,
  publishPathFindings,
  PUBLISH_PATH_FLOOR,
  PUBLISH_PATH_LABEL,
  ROOT_TOKEN_FILES,
  SELF_CLEANING_DIRS,
  sourceCandidates,
  SHIPPED_CLI_TEMPLATES,
  steeringSetDiff,
  tarballListing,
  templatesSetDiff,
  themesAreEmpty,
  PackListing,
} from '../pack-assert';

const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

const IDENTITY_DOCS = [
  'Agent-Directory',
  'AI-Collaboration-Principles',
  'Civitas-System-Overview',
  'core-goals',
  'DesignerPunk-Systems-Overview',
  'Spec-Feedback-Protocol',
  'start-up-tasks',
  'Task-Completion-Protocol',
].map((n) => `.kiro/steering/${n}.md`);

/** A root-shape esbuild bundle body: module comments under the root node_modules/ only. */
const ROOT_BUNDLE = [
  '"use strict";',
  '// node_modules/zod/v4/core/core.js',
  'var x = 1;',
  '// node_modules/@modelcontextprotocol/sdk/dist/cjs/server/index.js',
  '// mcp-server/src/index.ts',
  'var y = 2;',
].join('\n');

// ─── bundleModuleRoots ───────────────────────────────────────────────────────────────────────────

describe('bundleModuleRoots — the bundle-shape reader', () => {
  it('counts root node_modules/ module comments and finds no nested root in a root-shape bundle', () => {
    expect(bundleModuleRoots(ROOT_BUNDLE)).toEqual({ root: 2, nested: [] });
  });

  it('BITES on a planted nested-root comment (the 15.0.0 public shape: mcp-server/node_modules/)', () => {
    const planted = `${ROOT_BUNDLE}\n// mcp-server/node_modules/zod/v3/types.js\nvar z = 3;`;
    expect(bundleModuleRoots(planted)).toEqual({ root: 2, nested: ['mcp-server/'] });
  });

  it('BITES on a bundle resolved entirely from application-mcp-server/node_modules/', () => {
    const src = '// application-mcp-server/node_modules/ajv/dist/ajv.js\n// application-mcp-server/node_modules/js-yaml/index.js\n';
    expect(bundleModuleRoots(src)).toEqual({ root: 0, nested: ['application-mcp-server/'] });
  });

  it('BITES on a node_modules reached through a path outside the build tree (a symlinked install)', () => {
    expect(bundleModuleRoots('// ../DesignerPunk-v2/node_modules/zod/index.js\n').nested).toEqual(['../DesignerPunk-v2/']);
  });

  it('treats a package nested INSIDE the root tree (node_modules/a/node_modules/b) as root', () => {
    expect(bundleModuleRoots('// node_modules/agents/node_modules/@modelcontextprotocol/sdk/x.js\n')).toEqual({ root: 1, nested: [] });
  });

  it('reads only module comments at line start, never code that mentions a nested path', () => {
    const src = 'const p = "mcp-server/node_modules/zod";\n  // mcp-server/node_modules/indented-is-not-a-module-comment.js\n// node_modules/zod/index.js\n';
    expect(bundleModuleRoots(src)).toEqual({ root: 1, nested: [] });
  });
});

// ─── findLeftovers ───────────────────────────────────────────────────────────────────────────────

describe('findLeftovers — every packed dist/ file has a source or a named producer', () => {
  const sources = new Set(['src/TokenEngine.ts', 'src/components/Button.tsx', 'src/__tests__/fixtures/acknowledged-differences.json', 'src/cli/shared/bornRepo.ts']);
  const exists = (rel: string): boolean => sources.has(rel);

  it('accounts for tsc output (.js / .d.ts from .ts or .tsx) and copied JSON', () => {
    const paths = [
      'dist/TokenEngine.js',
      'dist/TokenEngine.d.ts',
      'dist/components/Button.js',
      'dist/components/Button.d.ts',
      'dist/__tests__/fixtures/acknowledged-differences.json',
      'dist/cli/shared/bornRepo.js',
    ];
    expect(findLeftovers(paths, exists)).toEqual([]);
  });

  it('accounts for every named producer output and anything under a self-cleaning dir', () => {
    const paths = [
      ...ROOT_TOKEN_FILES,
      'dist/name-contract.json',
      'dist/mcp/docs-mcp.js',
      'dist/mcp/application-mcp.js',
      'dist/mcp/product-mcp.js',
      'dist/mcp/tool-manifest.json',
      'dist/generator/consumer-entry.js',
      'dist/browser/designerpunk.esm.js',
      'dist/browser/tokens.css',
      'dist/consumer-canonical/agents/ada.md',
      'dist/consumer-canonical/skills/x/y.yaml',
    ];
    expect(findLeftovers(paths, exists)).toEqual([]);
  });

  it('BITES on a planted leftover whose source no longer exists (the 15.0.0 residue class: dist/tools/release/**)', () => {
    const paths = ['dist/TokenEngine.js', 'dist/tools/release/ReleaseManager.js', 'dist/tools/release/ReleaseManager.d.ts'];
    expect(findLeftovers(paths, exists)).toEqual(['dist/tools/release/ReleaseManager.js', 'dist/tools/release/ReleaseManager.d.ts']);
  });

  it('BITES on a stale file inside a producer-owned directory, even if its name looks like a bundle', () => {
    expect(findLeftovers(['dist/mcp/docs-mcp.js', 'dist/mcp/old-docs-mcp.js'], exists)).toEqual(['dist/mcp/old-docs-mcp.js']);
    expect(findLeftovers(['dist/browser/designerpunk.cjs.js'], exists)).toEqual(['dist/browser/designerpunk.cjs.js']);
  });

  it('BITES on an unnamed root file with no source', () => {
    expect(findLeftovers(['dist/DesignTokens.legacy.css'], exists)).toEqual(['dist/DesignTokens.legacy.css']);
  });

  it('ignores paths outside dist/', () => {
    expect(findLeftovers(['src/tokens/x.ts', 'governance/a.md'], () => false)).toEqual([]);
  });

  it('maps a dist path to its candidate sources', () => {
    expect(sourceCandidates('dist/a/b.d.ts')).toEqual(['src/a/b.ts', 'src/a/b.tsx', 'src/a/b.js']);
    expect(sourceCandidates('dist/a/b.js')).toEqual(['src/a/b.ts', 'src/a/b.tsx', 'src/a/b.js']);
    expect(sourceCandidates('dist/a/b.json')).toEqual(['src/a/b.json']);
  });

  it('the self-cleaning assumption still holds: consumer-entry.ts deletes its output dir before writing it', () => {
    // SELF_CLEANING_DIRS exempts dist/consumer-canonical/ from the leftover check ONLY because its producer
    // wipes it first. If that wipe is ever removed, this test fails and the exemption must go.
    expect(SELF_CLEANING_DIRS).toEqual(['dist/consumer-canonical/']);
    const src = fs.readFileSync(path.join(PROJECT_ROOT, 'tools/agent-generator/consumer-entry.ts'), 'utf8');
    expect(src).toMatch(/fs\.rmSync\(outDir, \{ recursive: true, force: true \}\)/);
  });

  it('the named producers are real: each producer-owned directory is written by a build script in package.json', () => {
    const scripts = JSON.parse(fs.readFileSync(path.join(PROJECT_ROOT, 'package.json'), 'utf8')).scripts as Record<string, string>;
    const all = Object.values(scripts).join('\n');
    expect(all).toMatch(/--outfile=dist\/mcp\/docs-mcp\.js/);
    expect(all).toMatch(/--outfile=dist\/mcp\/application-mcp\.js/);
    expect(all).toMatch(/--outfile=dist\/mcp\/product-mcp\.js/);
    expect(all).toMatch(/--outfile=dist\/generator\/consumer-entry\.js/);
    expect(Object.keys(PRODUCER_OUTPUTS).sort()).toEqual(['dist/', 'dist/browser/', 'dist/generator/', 'dist/mcp/']);
  });
});

// ─── themesAreEmpty ──────────────────────────────────────────────────────────────────────────────

describe('themesAreEmpty — the package ships the base theme only', () => {
  it('passes the real designerpunk.config.ts', () => {
    const r = themesAreEmpty(fs.readFileSync(path.join(PROJECT_ROOT, 'designerpunk.config.ts'), 'utf8'));
    expect(r).toEqual({ ok: true, detail: 'themes: []' });
  });

  it('passes `themes: []` with whitespace and a URL comment elsewhere', () => {
    expect(themesAreEmpty("// see https://example.com/x\nexport default defineConfig({ themes: [ ], output: './dist' });").ok).toBe(true);
  });

  it('BITES on a registered theme (sub-risk (b): a theme in the reference config reaching the ship set)', () => {
    const r = themesAreEmpty("export default defineConfig({ themes: [{ name: 'wcag', mode: 'light', overrides: wcag }] });");
    expect(r.ok).toBe(false);
    expect(r.detail).toMatch(/wcag/);
  });

  it('ignores a commented-out example theme (line and block comments)', () => {
    expect(themesAreEmpty("defineConfig({\n  // themes: [{ name: 'x' }],\n  themes: [],\n});").ok).toBe(true);
    expect(themesAreEmpty("defineConfig({\n  /* themes: [{ name: 'x' }], */\n  themes: [],\n});").ok).toBe(true);
  });

  it('BITES when no themes property exists, or when there are two', () => {
    expect(themesAreEmpty('defineConfig({ output: "./dist" });').ok).toBe(false);
    expect(themesAreEmpty('a({ themes: [] }); b({ themes: [] });').ok).toBe(false);
  });
});

// ─── steeringSetDiff ─────────────────────────────────────────────────────────────────────────────

describe('steeringSetDiff — .kiro/steering/ ships exactly the eight identity docs', () => {
  it('passes the exact eight', () => {
    expect(steeringSetDiff([...IDENTITY_DOCS, 'governance/x.md'])).toEqual({ unexpected: [], missing: [] });
  });

  it("BITES on Peter's personal note", () => {
    expect(steeringSetDiff([...IDENTITY_DOCS, '.kiro/steering/personal-note.md']).unexpected).toEqual(['.kiro/steering/personal-note.md']);
  });

  it('BITES on an MCP-served steering doc that is not an identity doc, and on a missing identity doc', () => {
    const wrong = [...IDENTITY_DOCS.slice(1), '.kiro/steering/Token-Governance.md'];
    expect(steeringSetDiff(wrong)).toEqual({ unexpected: ['.kiro/steering/Token-Governance.md'], missing: ['.kiro/steering/Agent-Directory.md'] });
  });
});

// ─── templatesSetDiff ────────────────────────────────────────────────────────────────────────────

describe('templatesSetDiff — src/cli/templates/ ships exactly the expected list (Task 22.3b)', () => {
  const EXPECTED = [
    'src/cli/templates/mcp-config.json.template',
    'src/cli/templates/personal-note.template.md',
    'src/cli/templates/personal-note.example.md',
    'src/cli/templates/product/overview.yaml',
    'src/cli/templates/product/experience-map/pages/example-home.yaml',
    'src/cli/templates/product/templates/home-layout.yaml',
    'src/cli/templates/starter-specs/ci-needs/needs.md',
    'src/cli/templates/starter-specs/ci-needs/tasks.md',
    'src/cli/templates/starter-specs/regrounding/tasks.md',
  ];

  it('the module list is the nine files above (a row edit, never derived from the tree)', () => {
    expect([...SHIPPED_CLI_TEMPLATES].sort()).toEqual([...EXPECTED].sort());
  });

  it('passes the exact set, ignoring paths outside src/cli/templates/', () => {
    expect(templatesSetDiff([...EXPECTED, 'src/cli/init.ts', 'docs/consumer/INSTALL.md'])).toEqual({ unexpected: [], missing: [] });
  });

  it('BITES on a stray file anywhere under src/cli/templates/ (top level and nested)', () => {
    expect(templatesSetDiff([...EXPECTED, 'src/cli/templates/scratch.md']).unexpected).toEqual(['src/cli/templates/scratch.md']);
    expect(templatesSetDiff([...EXPECTED, 'src/cli/templates/product/notes/draft.yaml']).unexpected).toEqual(['src/cli/templates/product/notes/draft.yaml']);
    expect(templatesSetDiff([...EXPECTED, 'src/cli/templates/starter-specs/ci-needs/needs.md.bak']).unexpected).toEqual(['src/cli/templates/starter-specs/ci-needs/needs.md.bak']);
  });

  it('BITES on a dropped file (a removed starter spec, a removed scaffold file, the removed note example)', () => {
    for (const gone of ['src/cli/templates/starter-specs/regrounding/tasks.md', 'src/cli/templates/product/overview.yaml', 'src/cli/templates/personal-note.example.md']) {
      const without = EXPECTED.filter((p) => p !== gone);
      expect(templatesSetDiff(without)).toEqual({ unexpected: [], missing: [gone] });
    }
  });

  it('BITES on a rename (both halves report), and on an empty directory', () => {
    const renamed = [...EXPECTED.filter((p) => p !== 'src/cli/templates/personal-note.template.md'), 'src/cli/templates/personal-note.tmpl.md'];
    expect(templatesSetDiff(renamed)).toEqual({ unexpected: ['src/cli/templates/personal-note.tmpl.md'], missing: ['src/cli/templates/personal-note.template.md'] });
    expect(templatesSetDiff(['dist/x.js']).missing.length).toBe(EXPECTED.length);
  });
});

// ─── findMachinePaths ────────────────────────────────────────────────────────────────────────────

describe('findMachinePaths — no machine path in any packed text file', () => {
  const files: Record<string, string> = {
    'dist/a.js': 'module.exports = 1;',
    'dist/b.js': 'const root = "/Users/someone/repo/src";',
    'dist/c.js': 'const root = "/opt/build/clone/src";',
    'governance/doc.md': 'see /Users/peter/notes.md',
    'src/assets/fonts/x.woff2': 'wOF2\0\0/Users/ inside binary bytes',
  };
  const read = (p: string): string | undefined => files[p];

  it('BITES on a planted /Users/ path in a dist file AND in a packed non-dist file (row 5: the O-1 class, governance/)', () => {
    expect(findMachinePaths(Object.keys(files), read, ['/Users/'])).toEqual(['dist/b.js', 'governance/doc.md']);
  });

  it('BITES on the build root itself (a fresh clone under the OS temp dir is not under /Users/)', () => {
    expect(findMachinePaths(Object.keys(files), read, ['/opt/build/clone'])).toEqual(['dist/c.js']);
  });

  it('skips binary files (a NUL byte), so a font cannot red or green the scan', () => {
    expect(findMachinePaths(['src/assets/fonts/x.woff2'], read, ['/Users/'])).toEqual([]);
  });

  it.each([
    ['governance/Process-Doc.md', 'see /Users/peter/Documents/x.md'],
    ['.kiro/steering/core-goals.md', 'cd /home/runner/work/DesignerPunk'],
    ['docs/consumer/INSTALL.md', 'at /private/var/folders/xx/T/dp-release-1/clone/src'],
    ['token-index/index.json', '{"source":"/Users/someone/repo/src/tokens/x.ts"}'],
    ['CHANGELOG.md', '- fixed /home/dev/repo/path'],
    ['src/tokens/x.ts', '// built at /Users/ci/tree'],
  ])('BITES on a machine prefix in %s', (p, text) => {
    expect(findMachinePaths([p], () => text, machinePathNeedles('/nonexistent/build-root'))).toEqual([p]);
  });

  it.each([
    ['abc.com/home/x', false],
    ['https://abc.com/home/{pathArg}', false],
    ['a/b/home/x', false],
    ['/home/peter/x', true],
    ['"/home/x"', true],
    ['see /home/x', true],
    ['path:/Users/x', true],
    ['p=/Users/x', true],
    ['file:///Users/x', true],
    ['/Users/x at very start', true],
    ['x/Users/y then /Users/z', true],
  ])('path boundary: %j hits=%s', (text, hit) => {
    expect(findMachinePaths(['f.md'], () => text, ['/Users/', '/home/'])).toEqual(hit ? ['f.md'] : []);
  });

  it('a needle at the very start of a file hits', () => {
    expect(findMachinePaths(['f.md'], () => '/home/x', ['/home/'])).toEqual(['f.md']);
  });

  it('binary (NUL) files are skipped even with a boundary hit', () => {
    expect(findMachinePaths(['f.bin'], () => '\0 /home/x', ['/home/'])).toEqual([]);
  });

  it('machinePathNeedles names /Users/, /home/, /private/var/folders/ and the build root', () => {
    const needles = machinePathNeedles('/nonexistent/build-root');
    for (const n of ['/Users/', '/home/', '/private/var/folders/']) expect(needles).toContain(n);
    expect(needles).toContain(path.resolve('/nonexistent/build-root'));
  });
});

// ─── publishPathFindings over a synthetic tree ───────────────────────────────────────────────────

describe('publishPathFindings — section 10 end to end over a synthetic package', () => {
  let root: string;
  let files: Record<string, string>;

  const listing = (): PackListing => ({ root, paths: Object.keys(files).sort(), read: (p) => files[p] });
  const failed = (l: PackListing): string[] => publishPathFindings(l).filter((f) => !f.ok).map((f) => f.label);

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'pack-assert-test-root-'));
    fs.mkdirSync(path.join(root, 'src'), { recursive: true });
    fs.writeFileSync(path.join(root, 'src', 'TokenEngine.ts'), 'export {};');
    fs.writeFileSync(path.join(root, 'designerpunk.config.ts'), "export default defineConfig({ themes: [], output: './dist' });");
    files = {};
    for (const f of ROOT_TOKEN_FILES) files[f] = '/* tokens */';
    files['dist/TokenEngine.js'] = 'module.exports = {};';
    files['dist/mcp/docs-mcp.js'] = ROOT_BUNDLE;
    files['dist/mcp/application-mcp.js'] = ROOT_BUNDLE;
    files['dist/mcp/product-mcp.js'] = ROOT_BUNDLE;
    for (const d of IDENTITY_DOCS) files[d] = '# doc';
  });

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true });
  });

  it('is green on a clean, root-shape package', () => {
    expect(failed(listing())).toEqual([]);
  });

  it('BITES on a planted leftover dist/ file', () => {
    files['dist/build/platforms/AndroidBuilder.js'] = 'stale';
    expect(failed(listing())).toEqual(['publish path: no leftover dist/ files (every packed dist/ file has a source or a named producer)']);
  });

  it('BITES on a planted nested-root bundle comment', () => {
    files['dist/mcp/docs-mcp.js'] = `${ROOT_BUNDLE}\n// mcp-server/node_modules/zod/v3/types.js`;
    expect(failed(listing())).toEqual(['publish path: dist/mcp/docs-mcp.js resolves every module from the root node_modules/']);
  });

  // Row 2 (ballot residual (ii), row (j)): the nested-roots red names its working-checkout cause.
  it('a nested-root red carries the row-(j) hint; a no-module-comments red and a green bundle do not', () => {
    files['dist/mcp/docs-mcp.js'] = `${ROOT_BUNDLE}\n// mcp-server/node_modules/zod/v3/types.js`;
    files['dist/mcp/product-mcp.js'] = '"use strict";\nvar a = 1;';
    const byLabel = (b: string) => publishPathFindings(listing()).find((x) => x.label === `publish path: ${b} resolves every module from the root node_modules/`);
    expect(byLabel('dist/mcp/docs-mcp.js')?.detail).toBe(`root modules 2; nested roots [mcp-server/] — ${NESTED_ROOTS_HINT}`);
    expect(NESTED_ROOTS_HINT).toMatch(/In a working checkout this red is row \(j\); the script's fresh clone never shows it/);
    expect(byLabel('dist/mcp/product-mcp.js')?.detail).toBe('root modules 0; nested roots []');
    expect(byLabel('dist/mcp/application-mcp.js')?.detail).toBe('root modules 2; nested roots []');
  });

  // Row 1 (ballot residual (i)): release-publish refuses below PUBLISH_PATH_FLOOR. The floor is derived, not a
  // literal; this pins it to what section 10 actually emits, so a new section-10 check reds here until counted.
  it('PUBLISH_PATH_FLOOR equals the findings a green three-bundle package emits, all labelled `publish path:`', () => {
    const all = publishPathFindings(listing());
    expect(Object.keys(files).filter((p) => /^dist\/mcp\/[^/]+\.js$/.test(p))).toHaveLength(MIN_MCP_BUNDLES);
    expect(all.every((x) => x.ok && x.label.startsWith(PUBLISH_PATH_LABEL))).toBe(true);
    expect(all).toHaveLength(PUBLISH_PATH_FLOOR);
    expect(PUBLISH_PATH_FLOOR).toBe(16); // the ballot-time count; CI's lane-timing floor (>= 14) is a separate instrument
  });

  it('BITES on a bundle with no module comments at all (the shape check must not pass vacuously)', () => {
    files['dist/mcp/product-mcp.js'] = '"use strict";\nvar a = 1;';
    expect(failed(listing())).toEqual(['publish path: dist/mcp/product-mcp.js resolves every module from the root node_modules/']);
  });

  it('BITES when fewer than three MCP bundles are packed', () => {
    delete files['dist/mcp/product-mcp.js'];
    expect(failed(listing())).toEqual(['publish path: MCP bundles found to inspect (>= 3)']);
  });

  it('BITES on a missing root token file', () => {
    delete files['dist/DesignTokens.dtcg.json'];
    expect(failed(listing())).toEqual(['publish path: root token file present: dist/DesignTokens.dtcg.json']);
  });

  it('BITES on a registered theme in the build tree config', () => {
    fs.writeFileSync(path.join(root, 'designerpunk.config.ts'), "export default defineConfig({ themes: [{ name: 'dark' }] });");
    expect(failed(listing())).toEqual(['publish path: designerpunk.config.ts registers no theme (themes: [])']);
  });

  it('BITES on a planted machine path, including the build root', () => {
    files['dist/TokenEngine.js'] = `const p = "${root}/src";`;
    expect(failed(listing())[0]).toMatch(/^publish path: no machine path in any packed text file/);
  });

  it('BITES on a /Users/ path in a packed non-dist file (row 5; 10e scanned only dist/ before)', () => {
    files['.kiro/steering/core-goals.md'] = 'See /Users/peter/Documents/notes.md';
    const f = publishPathFindings(listing()).filter((x) => !x.ok);
    expect(f.map((x) => x.label)).toEqual([expect.stringMatching(/^publish path: no machine path in any packed text file/)]);
    expect(f[0].detail).toBe('1: .kiro/steering/core-goals.md');
  });
});

// ─── tarball reading ─────────────────────────────────────────────────────────────────────────────

describe('extractTarball / tarballListing — the listing is read from the tarball, dotfiles included', () => {
  it('lists every packed path under package/, including .kiro/steering/, and reads contents back', () => {
    const work = fs.mkdtempSync(path.join(os.tmpdir(), 'pack-assert-tgz-'));
    try {
      const pkg = path.join(work, 'package');
      fs.mkdirSync(path.join(pkg, '.kiro', 'steering'), { recursive: true });
      fs.mkdirSync(path.join(pkg, 'dist', 'mcp'), { recursive: true });
      fs.writeFileSync(path.join(pkg, 'package.json'), '{"name":"x"}');
      fs.writeFileSync(path.join(pkg, '.kiro', 'steering', 'personal-note.md'), 'never ships');
      fs.writeFileSync(path.join(pkg, 'dist', 'mcp', 'docs-mcp.js'), ROOT_BUNDLE);
      const tgz = path.join(work, 'x.tgz');
      execFileSync('tar', ['-czf', tgz, '-C', work, 'package']);

      const extracted = extractTarball(tgz);
      try {
        const l = tarballListing(extracted, work);
        expect(l.paths).toEqual(['.kiro/steering/personal-note.md', 'dist/mcp/docs-mcp.js', 'package.json']);
        expect(l.read('dist/mcp/docs-mcp.js')).toBe(ROOT_BUNDLE);
        expect(l.read('missing.js')).toBeUndefined();
        // The wrong steering set is visible through the tarball path too.
        expect(steeringSetDiff(l.paths).unexpected).toEqual(['.kiro/steering/personal-note.md']);
      } finally {
        fs.rmSync(path.dirname(extracted), { recursive: true, force: true });
      }
    } finally {
      fs.rmSync(work, { recursive: true, force: true });
    }
  });
});

// ─── parseArgs ───────────────────────────────────────────────────────────────────────────────────

describe('parseArgs', () => {
  it('defaults to the legacy dry-run listing over this repo', () => {
    expect(parseArgs([])).toEqual({ mode: 'legacy', tarball: undefined, root: PROJECT_ROOT });
  });

  it('parses --pack, and --tarball with --root', () => {
    expect(parseArgs(['--pack']).mode).toBe('pack');
    expect(parseArgs(['--tarball', 'a.tgz', '--root', '/tmp/x'])).toEqual({ mode: 'tarball', tarball: 'a.tgz', root: path.resolve('/tmp/x') });
  });

  it('refuses unknown or incomplete arguments', () => {
    expect(() => parseArgs(['--tarball'])).toThrow(/needs a path/);
    expect(() => parseArgs(['--root'])).toThrow(/needs a directory/);
    expect(() => parseArgs(['--ignore-scripts'])).toThrow(/unknown argument/);
  });
});
