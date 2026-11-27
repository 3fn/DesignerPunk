/**
 * Build provenance — contract tests (application MCP).
 *
 * Contract: .kiro/issues/2026-11-27-mcp-build-provenance-contract.md
 *
 * Falsification case: "a build older than its source reports degraded". At the merge base
 * this suite is red (the module does not exist), and the case that carries the finding is
 * `FALSIFICATION — source edited after the build`: a fixture package is built (record
 * written), its source is edited, and the real server's `get_component_health` must come back
 * `degraded` with one warning beginning `build older than source`. Before this change the same
 * read said `healthy` whatever the build (Civitas health check 2026-11-27, H-1).
 *
 * Fixtures are built in a fresh temp directory per test; nothing is committed.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import {
  BUILD_INFO_FILENAME,
  BUILD_INFO_SCHEMA,
  PACKAGE_NAME,
  STALE_WARNING_PREFIX,
  UNRECORDED_WARNING_PREFIX,
  applyBuildProvenance,
  checkBuildProvenance,
  computeSourceHash,
  listSourceFiles,
  provenanceWarning,
} from '../BuildProvenance';
import { createBuildInfo, readGitFacts, writeBuildInfo } from '../write-build-info';
import { createTestableServer } from '../../index';
import { BuildProvenanceReport, IndexHealth } from '../../models';

const NO_GIT = { sourceCommit: null, sourceDirty: null };
const REPO_ROOT = path.resolve(__dirname, '../../../..');
const PACKAGE_DIR = path.resolve(__dirname, '../../..');
const REAL_COMPONENTS_DIR = path.join(REPO_ROOT, 'src', 'components', 'core');
const REAL_TOKEN_INDEX_DIR = path.join(REPO_ROOT, 'token-index');

let root: string;

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'app-build-provenance-'));
});

afterEach(() => {
  fs.rmSync(root, { recursive: true, force: true });
});

/** A minimal package that looks like this sub-package: manifest, tsconfig, src/, dist/. */
function makePackage(name: string = PACKAGE_NAME): { pkg: string; dist: string } {
  const pkg = path.join(root, 'pkg');
  fs.mkdirSync(path.join(pkg, 'src', 'indexer', '__tests__'), { recursive: true });
  fs.mkdirSync(path.join(pkg, 'dist'), { recursive: true });
  fs.writeFileSync(path.join(pkg, 'package.json'), JSON.stringify({ name }), 'utf-8');
  fs.writeFileSync(path.join(pkg, 'tsconfig.json'), '{"compilerOptions":{}}\n', 'utf-8');
  fs.writeFileSync(path.join(pkg, 'src', 'index.ts'), 'export const a = 1;\n', 'utf-8');
  fs.writeFileSync(path.join(pkg, 'src', 'indexer', 'Indexer.ts'), 'export const b = 2;\n', 'utf-8');
  fs.writeFileSync(path.join(pkg, 'src', 'indexer', 'data.json'), '{"c":3}\n', 'utf-8');
  fs.writeFileSync(path.join(pkg, 'src', 'indexer', 'README.md'), '# not source\n', 'utf-8');
  fs.writeFileSync(path.join(pkg, 'src', 'indexer', 'Indexer.test.ts'), 'test("x", () => {});\n', 'utf-8');
  fs.writeFileSync(path.join(pkg, 'src', 'indexer', '__tests__', 'fixture.ts'), 'export {};\n', 'utf-8');
  return { pkg, dist: path.join(pkg, 'dist') };
}

function baseHealth(status: IndexHealth['status'] = 'healthy'): IndexHealth {
  return {
    status,
    componentsIndexed: 1,
    patternsIndexed: 0,
    guidanceFamiliesIndexed: 0,
    layoutTemplatesIndexed: 0,
    lastIndexTime: new Date(0).toISOString(),
    errors: [],
    warnings: [],
    staleFiles: [],
  };
}

describe('the source set (contract § 2)', () => {
  it('is tsconfig.json plus src .ts/.tsx/.json, without __tests__ or *.test.ts, sorted', () => {
    const { pkg } = makePackage();
    expect(listSourceFiles(pkg)).toEqual([
      'src/index.ts',
      'src/indexer/Indexer.ts',
      'src/indexer/data.json',
      'tsconfig.json',
    ]);
  });

  it('hashes content, so a test-only edit or an mtime touch does not move it, and a source edit does', () => {
    const { pkg } = makePackage();
    const before = computeSourceHash(pkg);
    expect(before.sourceHash).toMatch(/^sha256:[0-9a-f]{64}$/);
    expect(before.sourceFiles).toBe(4);

    fs.writeFileSync(path.join(pkg, 'src', 'indexer', 'Indexer.test.ts'), 'test("y", () => {});\n', 'utf-8');
    const future = new Date(Date.now() + 60_000);
    fs.utimesSync(path.join(pkg, 'src', 'index.ts'), future, future);
    expect(computeSourceHash(pkg)).toEqual(before);

    fs.writeFileSync(path.join(pkg, 'src', 'index.ts'), 'export const a = 2;\n', 'utf-8');
    expect(computeSourceHash(pkg).sourceHash).not.toBe(before.sourceHash);
  });
});

describe('the applicability gate (contract § 3.1)', () => {
  it('a .ts entry (ts-node) is not-applicable', () => {
    const { dist } = makePackage();
    const r = checkBuildProvenance({ distDir: dist, entryFile: path.join(root, 'pkg', 'src', 'index.ts') });
    expect(r.state).toBe('not-applicable');
    expect(r.reason).toMatch(/TypeScript source/);
  });

  it('another package name beside the build is not-applicable', () => {
    const { dist } = makePackage('@designerpunk/mcp-documentation-server');
    expect(checkBuildProvenance({ distDir: dist }).state).toBe('not-applicable');
  });

  it('no src/ beside the build is not-applicable', () => {
    const { pkg, dist } = makePackage();
    fs.rmSync(path.join(pkg, 'src'), { recursive: true, force: true });
    const r = checkBuildProvenance({ distDir: dist });
    expect(r.state).toBe('not-applicable');
    expect(r.reason).toMatch(/no src\//);
  });

  it('OFF-SWITCH GUARD: the real application-mcp-server layout passes the gate; the root dist/mcp bundle dir does not', () => {
    const real = checkBuildProvenance({ distDir: path.join(PACKAGE_DIR, 'dist'), entryFile: path.join(PACKAGE_DIR, 'dist', 'index.js') });
    expect(real.state).not.toBe('not-applicable');
    const bundle = checkBuildProvenance({ distDir: path.join(REPO_ROOT, 'dist', 'mcp'), entryFile: path.join(REPO_ROOT, 'dist', 'mcp', 'application-mcp.js') });
    expect(bundle.state).toBe('not-applicable');
  });
});

describe('the decision (contract § 3.2–3.3)', () => {
  it('no record is unrecorded', () => {
    const { dist } = makePackage();
    const r = checkBuildProvenance({ distDir: dist });
    expect(r.state).toBe('unrecorded');
    expect(r.current?.sourceFiles).toBe(4);
  });

  it.each([
    ['not JSON', '{'],
    ['another schema', JSON.stringify({ schema: 2, server: PACKAGE_NAME, sourceHash: 'sha256:x', builtAt: 'now' })],
    ['another server', JSON.stringify({ schema: 1, server: '@designerpunk/mcp-documentation-server', sourceHash: 'sha256:x', builtAt: 'now' })],
    ['no sha256 hash', JSON.stringify({ schema: 1, server: PACKAGE_NAME, sourceHash: 'md5:x', builtAt: 'now' })],
  ])('a record that is %s is unrecorded', (_label, body) => {
    const { dist } = makePackage();
    fs.writeFileSync(path.join(dist, BUILD_INFO_FILENAME), body, 'utf-8');
    expect(checkBuildProvenance({ distDir: dist }).state).toBe('unrecorded');
  });

  it('a record of the current source is fresh; an edit makes it stale; restoring makes it fresh again', () => {
    const { pkg, dist } = makePackage();
    writeBuildInfo(dist, NO_GIT);
    expect(checkBuildProvenance({ distDir: dist }).state).toBe('fresh');

    const file = path.join(pkg, 'src', 'indexer', 'Indexer.ts');
    fs.writeFileSync(file, 'export const b = 3;\n', 'utf-8');
    const stale = checkBuildProvenance({ distDir: dist });
    expect(stale.state).toBe('stale');
    expect(stale.recorded?.sourceHash).not.toBe(stale.current?.sourceHash);

    fs.writeFileSync(file, 'export const b = 2;\n', 'utf-8');
    expect(checkBuildProvenance({ distDir: dist }).state).toBe('fresh');
  });

  it('a new source file makes the build stale', () => {
    const { pkg, dist } = makePackage();
    writeBuildInfo(dist, NO_GIT);
    fs.writeFileSync(path.join(pkg, 'src', 'added.ts'), 'export {};\n', 'utf-8');
    expect(checkBuildProvenance({ distDir: dist }).state).toBe('stale');
  });
});

describe('the record (contract § 2)', () => {
  it('createBuildInfo carries the schema-1 fields, with this package name', () => {
    const { dist } = makePackage();
    const info = createBuildInfo(dist, { sourceCommit: 'abcdef0123456789', sourceDirty: true }, new Date('2026-11-27T00:00:00Z'));
    expect(info).toEqual({
      schema: BUILD_INFO_SCHEMA,
      server: PACKAGE_NAME,
      sourceHash: computeSourceHash(path.dirname(dist)).sourceHash,
      sourceFiles: 4,
      sourceCommit: 'abcdef0123456789',
      sourceDirty: true,
      builtAt: '2026-11-27T00:00:00.000Z',
    });
    expect(PACKAGE_NAME).toBe(JSON.parse(fs.readFileSync(path.join(PACKAGE_DIR, 'package.json'), 'utf-8')).name);
  });

  it('readGitFacts gives nulls outside a git work tree', () => {
    const { pkg } = makePackage();
    expect(readGitFacts(pkg)).toEqual(NO_GIT);
  });

  it('the build script runs the writer after a clean tsc (contract § 4, § 5)', () => {
    const scripts = JSON.parse(fs.readFileSync(path.join(PACKAGE_DIR, 'package.json'), 'utf-8')).scripts;
    expect(scripts.build).toBe(
      `node -e "require('fs').rmSync('dist',{recursive:true,force:true})" && tsc && node dist/build-provenance/write-build-info.js`,
    );
  });
});

describe('the warning and the status (contract § 4)', () => {
  const report = (state: BuildProvenanceReport['state']): BuildProvenanceReport => ({
    state,
    reason: 'r',
    distDir: path.join(root, 'pkg', 'dist'),
    recorded: { sourceHash: 'sha256:a', sourceFiles: 1, sourceCommit: '0123456789abcdef', sourceDirty: true, builtAt: 'T' },
    current: { sourceHash: 'sha256:b', sourceFiles: 1 },
  });

  it('stale and unrecorded warn with the fixed prefixes; fresh and not-applicable add nothing', () => {
    expect(provenanceWarning(report('stale'))).toBe(
      `${STALE_WARNING_PREFIX}: built T from commit 012345678 with uncommitted source; r — run \`npm run build\` in pkg/, then restart the server`,
    );
    expect(provenanceWarning(report('unrecorded'))).toMatch(new RegExp(`^${UNRECORDED_WARNING_PREFIX}: r — `));
    expect(provenanceWarning(report('fresh'))).toBeNull();
    expect(provenanceWarning(report('not-applicable'))).toBeNull();
  });

  it('healthy moves to degraded; failed stays failed; fresh leaves the health as it was', () => {
    expect(applyBuildProvenance(baseHealth('healthy'), report('stale')).status).toBe('degraded');
    expect(applyBuildProvenance(baseHealth('failed'), report('unrecorded')).status).toBe('failed');
    const fresh = applyBuildProvenance(baseHealth('healthy'), report('fresh'));
    expect(fresh.status).toBe('healthy');
    expect(fresh.warnings).toEqual([]);
    expect(fresh.build?.state).toBe('fresh');
  });
});

describe('the server (get_component_health and rebuild_index)', () => {
  const realPaths = { componentsDir: REAL_COMPONENTS_DIR, tokenIndexDir: REAL_TOKEN_INDEX_DIR };

  it('without a distDir (in-process construction) the health carries no build field', async () => {
    const server = createTestableServer(realPaths);
    await server.initialize();
    const health = (await server.callTool('get_component_health', {})) as IndexHealth;
    expect(health.build).toBeUndefined();
  }, 60_000);

  it('FALSIFICATION — source edited after the build: get_component_health goes healthy → degraded with one stale warning', async () => {
    const { pkg, dist } = makePackage();
    writeBuildInfo(dist, NO_GIT);
    const entryFile = path.join(dist, 'index.js');
    const server = createTestableServer(realPaths, { distDir: dist, entryFile });
    await server.initialize();

    const before = (await server.callTool('get_component_health', {})) as IndexHealth;
    expect(before.build?.state).toBe('fresh');
    expect(before.status).toBe('healthy');
    expect(before.warnings.filter((w) => w.startsWith(STALE_WARNING_PREFIX))).toEqual([]);

    // The source moves on (a `git pull` after the build): the running code is now older.
    fs.writeFileSync(path.join(pkg, 'src', 'index.ts'), 'export const a = 99;\n', 'utf-8');

    const after = (await server.callTool('get_component_health', {})) as IndexHealth;
    expect(after.build?.state).toBe('stale');
    expect(after.status).toBe('degraded');
    expect(after.warnings.filter((w) => w.startsWith(`${STALE_WARNING_PREFIX}: `))).toHaveLength(1);

    // rebuild_index re-reads the data, not the code, so it does not clear stale (contract § 4).
    const rebuilt = (await server.callTool('rebuild_index', {})) as IndexHealth;
    expect(rebuilt.build?.state).toBe('stale');
    expect(rebuilt.status).toBe('degraded');
  }, 60_000);

  it('an unrecorded build degrades get_component_health with the unrecorded prefix', async () => {
    const { dist } = makePackage();
    const server = createTestableServer(realPaths, { distDir: dist, entryFile: path.join(dist, 'index.js') });
    await server.initialize();
    const health = (await server.callTool('get_component_health', {})) as IndexHealth;
    expect(health.build?.state).toBe('unrecorded');
    expect(health.status).toBe('degraded');
    expect(health.warnings.filter((w) => w.startsWith(`${UNRECORDED_WARNING_PREFIX}: `))).toHaveLength(1);
  }, 60_000);
});
