/**
 * Build provenance — contract tests.
 *
 * Contract: .kiro/issues/2026-11-27-mcp-build-provenance-contract.md
 *
 * Falsification case: "a build older than its source reports degraded". At the
 * merge base this suite is red (the module does not exist), and the case that
 * carries the finding is `FALSIFICATION — source edited after the build`: a
 * fixture package is built (record written), its source is edited, and the real
 * DocumentIndexer's health must come back `degraded` with a warning beginning
 * `build older than source`. Before this change, that health was `healthy`.
 *
 * Fixtures are built in a fresh temp directory per test; nothing is committed.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { execFileSync } from 'child_process';
import {
  BUILD_INFO_FILENAME,
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
import { DocumentIndexer } from '../../indexer/DocumentIndexer';
import { MCPDocumentationServer } from '../../index';
import { IndexHealth } from '../../models';

const NO_GIT = { sourceCommit: null, sourceDirty: null };

const VALID_DOC = `# Provenance Fixture Doc

**Date**: 2026-11-27
**Purpose**: Fixture document for the build-provenance tests
**Organization**: test-org
**Scope**: test-scope
**Layer**: 2
**Relevant Tasks**: testing
**Last Reviewed**: 2026-11-27

## Overview

Fixture text.
`;

let root: string;

beforeEach(() => {
  root = fs.mkdtempSync(path.join(os.tmpdir(), 'build-provenance-'));
});

afterEach(() => {
  fs.rmSync(root, { recursive: true, force: true });
});

/** A source-checkout-shaped package: package.json (our name), tsconfig.json, src/, dist/. */
function makePackage(name: string = PACKAGE_NAME): { pkg: string; dist: string } {
  const pkg = path.join(root, 'mcp-server');
  write(path.join(pkg, 'package.json'), JSON.stringify({ name, version: '0.0.0' }));
  write(path.join(pkg, 'tsconfig.json'), '{ "compilerOptions": { "outDir": "./dist" } }');
  write(path.join(pkg, 'src', 'index.ts'), 'export const a = 1;\n');
  write(path.join(pkg, 'src', 'tools', 'tool.ts'), 'export const b = 2;\n');
  write(path.join(pkg, 'src', 'data', 'table.json'), '{"k": 1}\n');
  write(path.join(pkg, 'src', 'tools', '__tests__', 'tool.test.ts'), 'test("x", () => {});\n');
  write(path.join(pkg, 'src', 'tools', 'tool.test.ts'), 'test("y", () => {});\n');
  write(path.join(pkg, 'src', 'README.md'), 'not source\n');
  const dist = path.join(pkg, 'dist');
  fs.mkdirSync(dist, { recursive: true });
  return { pkg, dist };
}

function write(file: string, content: string): void {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function healthyIndexHealth(): IndexHealth {
  return {
    status: 'healthy',
    documentsIndexed: 1,
    lastIndexTime: '2026-11-27T00:00:00.000Z',
    errors: [],
    warnings: [],
    metrics: { totalDocuments: 1, totalSections: 1, totalCrossReferences: 0, indexSizeBytes: 1 },
  };
}

async function indexerHealthFor(distDir: string): Promise<IndexHealth> {
  const docs = path.join(root, 'docs');
  write(path.join(docs, 'doc.md'), VALID_DOC);
  const indexer = new DocumentIndexer(path.join(root, 'logs'));
  await indexer.indexDirectory(docs);
  indexer.setBuildProvenanceProbe(() => checkBuildProvenance({ distDir }));
  return indexer.getIndexHealth();
}

describe('the hashed source set', () => {
  it('is tsconfig.json plus src/ .ts/.tsx/.json files, tests excluded, sorted', () => {
    const { pkg } = makePackage();
    expect(listSourceFiles(pkg)).toEqual([
      'src/data/table.json',
      'src/index.ts',
      'src/tools/tool.ts',
      'tsconfig.json',
    ]);
  });

  it('ignores a test-only change and a non-source file', () => {
    const { pkg } = makePackage();
    const before = computeSourceHash(pkg).sourceHash;
    write(path.join(pkg, 'src', 'tools', '__tests__', 'tool.test.ts'), 'test("changed", () => {});\n');
    write(path.join(pkg, 'src', 'tools', 'tool.test.ts'), 'test("changed", () => {});\n');
    write(path.join(pkg, 'src', '.DS_Store'), 'finder');
    write(path.join(pkg, 'src', 'README.md'), 'changed\n');
    expect(computeSourceHash(pkg).sourceHash).toBe(before);
  });

  it('changes on an edit, an added file, a removed file and a tsconfig change', () => {
    const { pkg } = makePackage();
    const hashes = new Set<string>([computeSourceHash(pkg).sourceHash]);
    write(path.join(pkg, 'src', 'index.ts'), 'export const a = 2;\n');
    hashes.add(computeSourceHash(pkg).sourceHash);
    write(path.join(pkg, 'src', 'new.ts'), 'export {};\n');
    hashes.add(computeSourceHash(pkg).sourceHash);
    fs.rmSync(path.join(pkg, 'src', 'tools', 'tool.ts'));
    hashes.add(computeSourceHash(pkg).sourceHash);
    write(path.join(pkg, 'tsconfig.json'), '{ "compilerOptions": { "outDir": "./out" } }');
    hashes.add(computeSourceHash(pkg).sourceHash);
    expect(hashes.size).toBe(5);
  });

  it('does not depend on mtimes (touching a file without changing it keeps the hash)', () => {
    const { pkg } = makePackage();
    const before = computeSourceHash(pkg).sourceHash;
    const later = new Date(Date.now() + 60_000);
    fs.utimesSync(path.join(pkg, 'src', 'index.ts'), later, later);
    expect(computeSourceHash(pkg).sourceHash).toBe(before);
  });
});

describe('the build record', () => {
  it('writes dist/build-info.json, schema 1, with the source hash', () => {
    const { pkg, dist } = makePackage();
    const { file, info } = writeBuildInfo(dist, NO_GIT);
    expect(file).toBe(path.join(dist, BUILD_INFO_FILENAME));
    const onDisk = JSON.parse(fs.readFileSync(file, 'utf-8'));
    expect(onDisk).toEqual(info);
    expect(info).toMatchObject({
      schema: 1,
      server: PACKAGE_NAME,
      sourceHash: computeSourceHash(pkg).sourceHash,
      sourceFiles: 4,
      sourceCommit: null,
      sourceDirty: null,
    });
    expect(Number.isNaN(Date.parse(info.builtAt))).toBe(false);
  });

  it('reads git facts: commit and dirtiness of the source set; nulls without git', () => {
    const { pkg } = makePackage();
    const prevCeiling = process.env.GIT_CEILING_DIRECTORIES;
    process.env.GIT_CEILING_DIRECTORIES = root;
    try {
      expect(readGitFacts(pkg)).toEqual({ sourceCommit: null, sourceDirty: null });

      const git = (...args: string[]) =>
        execFileSync('git', ['-c', 'user.email=t@example.com', '-c', 'user.name=t', '-c', 'commit.gpgsign=false', ...args], {
          cwd: pkg,
          stdio: ['ignore', 'pipe', 'ignore'],
          encoding: 'utf-8',
        }).trim();
      git('init', '-q');
      git('add', '-A');
      git('commit', '-q', '-m', 'fixture');
      const head = git('rev-parse', 'HEAD');
      expect(readGitFacts(pkg)).toEqual({ sourceCommit: head, sourceDirty: false });

      // A test-only edit is outside the source set: still clean.
      write(path.join(pkg, 'src', 'tools', 'tool.test.ts'), 'test("dirty", () => {});\n');
      expect(readGitFacts(pkg).sourceDirty).toBe(false);

      write(path.join(pkg, 'src', 'index.ts'), 'export const a = 3;\n');
      expect(readGitFacts(pkg)).toEqual({ sourceCommit: head, sourceDirty: true });
    } finally {
      if (prevCeiling === undefined) delete process.env.GIT_CEILING_DIRECTORIES;
      else process.env.GIT_CEILING_DIRECTORIES = prevCeiling;
    }
  });
});

describe('checkBuildProvenance — the four states', () => {
  it('fresh: the record matches the source', () => {
    const { dist } = makePackage();
    writeBuildInfo(dist, NO_GIT);
    const report = checkBuildProvenance({ distDir: dist });
    expect(report.state).toBe('fresh');
    expect(provenanceWarning(report)).toBeNull();
  });

  it('fresh with uncommitted source and no git: the decision reads only the hash', () => {
    const { dist } = makePackage();
    writeBuildInfo(dist, { sourceCommit: 'abc1234567', sourceDirty: true });
    expect(checkBuildProvenance({ distDir: dist }).state).toBe('fresh');
  });

  it('stale: the source changed after the build', () => {
    const { pkg, dist } = makePackage();
    writeBuildInfo(dist, { sourceCommit: '0123456789abcdef', sourceDirty: false });
    write(path.join(pkg, 'src', 'tools', 'tool.ts'), 'export const b = 3;\n');
    const report = checkBuildProvenance({ distDir: dist });
    expect(report.state).toBe('stale');
    expect(report.recorded!.sourceHash).not.toBe(report.current!.sourceHash);
    const warning = provenanceWarning(report)!;
    expect(warning.startsWith(`${STALE_WARNING_PREFIX}: `)).toBe(true);
    expect(warning).toContain('commit 012345678');
    expect(warning).toContain('run `npm run build` in mcp-server/');
  });

  it('stale also when the source is OLDER than the build (any mismatch)', () => {
    const { pkg, dist } = makePackage();
    write(path.join(pkg, 'src', 'index.ts'), 'export const a = 99;\n');
    writeBuildInfo(dist, NO_GIT);
    write(path.join(pkg, 'src', 'index.ts'), 'export const a = 1;\n');
    expect(checkBuildProvenance({ distDir: dist }).state).toBe('stale');
  });

  it.each([
    ['missing', null, 'is missing'],
    ['not JSON', '{oops', 'not valid JSON'],
    ['another schema', JSON.stringify({ schema: 2, server: PACKAGE_NAME, sourceHash: 'sha256:x', builtAt: 'x' }), 'schema 2'],
    ['another server', JSON.stringify({ schema: 1, server: 'other', sourceHash: 'sha256:x', builtAt: 'x' }), 'names server other'],
    ['no hash', JSON.stringify({ schema: 1, server: PACKAGE_NAME, builtAt: 'x' }), 'no sha256 sourceHash'],
  ])('unrecorded: record %s', (_label, content, reasonPart) => {
    const { dist } = makePackage();
    if (content !== null) write(path.join(dist, BUILD_INFO_FILENAME), content);
    const report = checkBuildProvenance({ distDir: dist });
    expect(report.state).toBe('unrecorded');
    expect(report.reason).toContain(reasonPart);
    expect(provenanceWarning(report)!.startsWith(`${UNRECORDED_WARNING_PREFIX}: `)).toBe(true);
  });

  it('not-applicable: the bundle shape (no sub-package package.json beside the build)', () => {
    // Mirrors a consumer's node_modules/@3fn/core/dist/mcp/docs-mcp.js.
    const dist = path.join(root, 'node_modules', '@3fn', 'core', 'dist', 'mcp');
    fs.mkdirSync(dist, { recursive: true });
    write(path.join(root, 'node_modules', '@3fn', 'core', 'package.json'), JSON.stringify({ name: '@3fn/core' }));
    const report = checkBuildProvenance({ distDir: dist });
    expect(report.state).toBe('not-applicable');
    expect(report.reason).toContain('consumer install');
  });

  it('not-applicable: another package name beside the build', () => {
    const { dist } = makePackage('@designerpunk/mcp-application-server');
    expect(checkBuildProvenance({ distDir: dist }).state).toBe('not-applicable');
  });

  it('not-applicable: no src/ tree beside the build', () => {
    const { pkg, dist } = makePackage();
    fs.rmSync(path.join(pkg, 'src'), { recursive: true });
    const report = checkBuildProvenance({ distDir: dist });
    expect(report.state).toBe('not-applicable');
    expect(report.reason).toContain('no src/');
  });

  it('not-applicable: running from TypeScript source (ts-node)', () => {
    const { pkg } = makePackage();
    const report = checkBuildProvenance({ distDir: path.join(pkg, 'src'), entryFile: path.join(pkg, 'src', 'index.ts') });
    expect(report.state).toBe('not-applicable');
    expect(report.reason).toContain('TypeScript source');
  });
});

describe('applyBuildProvenance — what the health report says', () => {
  it('stale and unrecorded degrade a healthy status; fresh and not-applicable leave it', () => {
    const states = { fresh: 'healthy', 'not-applicable': 'healthy', stale: 'degraded', unrecorded: 'degraded' } as const;
    for (const [state, expected] of Object.entries(states)) {
      const health = healthyIndexHealth();
      applyBuildProvenance(health, {
        state: state as keyof typeof states,
        reason: 'r',
        distDir: '/x/mcp-server/dist',
        recorded: { sourceHash: 'sha256:a', sourceFiles: 1, sourceCommit: null, sourceDirty: null, builtAt: 't' },
        current: { sourceHash: 'sha256:b', sourceFiles: 1 },
      });
      expect([state, health.status]).toEqual([state, expected]);
      expect(health.build!.state).toBe(state);
      expect(health.warnings.length).toBe(expected === 'degraded' ? 1 : 0);
    }
  });

  it('a failed status stays failed', () => {
    const health = { ...healthyIndexHealth(), status: 'failed' as const, errors: ['e'] };
    applyBuildProvenance(health, { state: 'stale', reason: 'r', distDir: '/x/dist', recorded: { sourceHash: 'a', sourceFiles: 0, sourceCommit: null, sourceDirty: null, builtAt: 't' } });
    expect(health.status).toBe('failed');
  });
});

describe('FALSIFICATION — source edited after the build', () => {
  it('the real indexer reports healthy when fresh, then degraded with "build older than source"', async () => {
    const { pkg, dist } = makePackage();
    writeBuildInfo(dist, NO_GIT);

    const fresh = await indexerHealthFor(dist);
    expect(fresh.status).toBe('healthy');
    expect(fresh.build!.state).toBe('fresh');

    write(path.join(pkg, 'src', 'index.ts'), 'export const a = "edited after the build";\n');

    const stale = await indexerHealthFor(dist);
    expect(stale.status).toBe('degraded');
    expect(stale.build!.state).toBe('stale');
    expect(stale.warnings.filter((w) => w.startsWith(STALE_WARNING_PREFIX))).toHaveLength(1);
  });

  it('the server, given a distDir, wires the probe into get_index_health', async () => {
    const { pkg, dist } = makePackage();
    writeBuildInfo(dist, NO_GIT);
    write(path.join(pkg, 'src', 'index.ts'), 'export const a = "edited";\n');
    const docs = path.join(root, 'docs');
    write(path.join(docs, 'doc.md'), VALID_DOC);

    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    try {
      const server = new MCPDocumentationServer(docs, { distDir: dist });
      // Internal access is deliberate: the probe's wiring is the unit under test.
      const internals = server as unknown as { indexer: DocumentIndexer };
      await internals.indexer.indexDirectory(docs);
      const health = internals.indexer.getIndexHealth();
      expect(health.status).toBe('degraded');
      expect(health.build!.state).toBe('stale');
      expect(errSpy.mock.calls.some((c) => String(c[0]).startsWith('[MCP Server] Build provenance: stale'))).toBe(true);
    } finally {
      errSpy.mockRestore();
    }
  });

  it('without a distDir (in-process construction) the report carries no build field', async () => {
    const docs = path.join(root, 'docs');
    write(path.join(docs, 'doc.md'), VALID_DOC);
    const indexer = new DocumentIndexer(path.join(root, 'logs'));
    await indexer.indexDirectory(docs);
    const health = indexer.getIndexHealth();
    expect(health.build).toBeUndefined();
    expect(health.status).toBe('healthy');
  });
});

describe('the off-switch guard — the real package layout', () => {
  // The check turns itself off outside a source checkout. These two tests fail if
  // the real layout ever stops looking like one (renamed package, moved src) — the
  // way a self-disabling check would otherwise go quiet in this repository.
  const realPackageDir = path.resolve(__dirname, '..', '..', '..');

  it('the in-repo tsc artifact location (mcp-server/dist) is a source checkout', () => {
    const report = checkBuildProvenance({ distDir: path.join(realPackageDir, 'dist') });
    expect(report.state).not.toBe('not-applicable');
    expect(JSON.parse(fs.readFileSync(path.join(realPackageDir, 'package.json'), 'utf-8')).name).toBe(PACKAGE_NAME);
  });

  it('the root bundle location (dist/mcp, where docs-mcp.js is built) is not', () => {
    const repoRoot = path.dirname(realPackageDir);
    expect(checkBuildProvenance({ distDir: path.join(repoRoot, 'dist', 'mcp') }).state).toBe('not-applicable');
  });

  it('the real source set hashes, excludes tests, and includes the entry point', () => {
    const files = listSourceFiles(realPackageDir);
    expect(files).toContain('src/index.ts');
    expect(files).toContain('src/build-provenance/BuildProvenance.ts');
    expect(files.some((f) => f.includes('__tests__') || f.endsWith('.test.ts'))).toBe(false);
    expect(createBuildInfo(path.join(realPackageDir, 'dist'), NO_GIT).sourceFiles).toBe(files.length);
  });
});
