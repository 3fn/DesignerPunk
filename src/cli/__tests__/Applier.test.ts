/**
 * @category evergreen
 * @purpose Verify Applier copies files, applies transforms, updates manifest (Spec 111, R4/R7)
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { applyFile, applyGovernance, applySource, applyForce } from '../sync/Applier';
import type { ClassifiedFile } from '../sync/Classifier';
import type { SyncManifest } from '../sync/Manifest';

function makeTmpDirs(): { pkgRoot: string; projRoot: string } {
  const base = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'dp-applier-')));
  const pkgRoot = path.join(base, 'pkg');
  const projRoot = path.join(base, 'proj');
  fs.mkdirSync(pkgRoot, { recursive: true });
  fs.mkdirSync(projRoot, { recursive: true });
  return { pkgRoot, projRoot };
}

function makeManifest(): SyncManifest {
  return { version: '1.0.0', syncedAt: '', files: {} };
}

function makeFile(
  relativePath: string,
  tier: 'governance' | 'source' = 'source',
  classification: ClassifiedFile['classification'] = 'new',
): ClassifiedFile {
  return { relativePath, classification, tier, packageHash: 'new-hash' };
}

describe('Applier', () => {
  let pkgRoot: string;
  let projRoot: string;

  beforeEach(() => {
    ({ pkgRoot, projRoot } = makeTmpDirs());
  });

  afterEach(() => {
    // Clean up parent of both
    fs.rmSync(path.dirname(pkgRoot), { recursive: true, force: true });
  });

  describe('applyFile', () => {
    test('copies non-.ts file directly', () => {
      const relPath = '.kiro/steering/Doc.md';
      fs.mkdirSync(path.join(pkgRoot, '.kiro/steering'), { recursive: true });
      fs.writeFileSync(path.join(pkgRoot, relPath), '# Hello', 'utf-8');

      const manifest = makeManifest();
      const file = makeFile(relPath, 'governance');

      const result = applyFile(file, pkgRoot, projRoot, manifest);

      expect(result).toBe(true);
      expect(fs.readFileSync(path.join(projRoot, relPath), 'utf-8')).toBe('# Hello');
      expect(manifest.files[relPath]).toEqual({ hash: 'new-hash', managed: true });
    });

    test('applies rewriteBuildImports transform to source-tier .ts files', () => {
      const relPath = 'src/tokens/Color.ts';
      fs.mkdirSync(path.join(pkgRoot, 'src/tokens'), { recursive: true });
      fs.writeFileSync(
        path.join(pkgRoot, relPath),
        `import { x } from '../../build/tokens';\nexport const y = x;`,
        'utf-8',
      );

      const manifest = makeManifest();
      const file = makeFile(relPath, 'source');

      applyFile(file, pkgRoot, projRoot, manifest);

      const written = fs.readFileSync(path.join(projRoot, relPath), 'utf-8');
      expect(written).toContain(`from '@3fn/core/build'`);
      expect(written).not.toContain('../../build/tokens');
    });

    test('does NOT apply transform to governance .md files', () => {
      const relPath = '.kiro/steering/Doc.md';
      fs.mkdirSync(path.join(pkgRoot, '.kiro/steering'), { recursive: true });
      fs.writeFileSync(path.join(pkgRoot, relPath), '../../build/tokens reference', 'utf-8');

      const manifest = makeManifest();
      const file = makeFile(relPath, 'governance');

      applyFile(file, pkgRoot, projRoot, manifest);

      const written = fs.readFileSync(path.join(projRoot, relPath), 'utf-8');
      expect(written).toBe('../../build/tokens reference');
    });

    test('creates parent directories if needed', () => {
      const relPath = 'src/deep/nested/file.ts';
      fs.mkdirSync(path.join(pkgRoot, 'src/deep/nested'), { recursive: true });
      fs.writeFileSync(path.join(pkgRoot, relPath), 'content', 'utf-8');

      const manifest = makeManifest();
      const file = makeFile(relPath, 'source');

      applyFile(file, pkgRoot, projRoot, manifest);

      expect(fs.existsSync(path.join(projRoot, relPath))).toBe(true);
    });

    test('updates manifest with packageHash and managed flag', () => {
      const relPath = 'src/tokens/T.ts';
      fs.mkdirSync(path.join(pkgRoot, 'src/tokens'), { recursive: true });
      fs.writeFileSync(path.join(pkgRoot, relPath), 'x', 'utf-8');

      const manifest = makeManifest();
      const file = makeFile(relPath, 'source');

      applyFile(file, pkgRoot, projRoot, manifest);

      expect(manifest.files[relPath]).toEqual({ hash: 'new-hash', managed: false });
    });

    test('logs warning for force-overwritten conflicts', () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation();
      const relPath = 'src/tokens/Conflict.ts';
      fs.mkdirSync(path.join(pkgRoot, 'src/tokens'), { recursive: true });
      fs.writeFileSync(path.join(pkgRoot, relPath), 'new', 'utf-8');

      const manifest = makeManifest();
      const file = makeFile(relPath, 'source', 'conflict');

      applyFile(file, pkgRoot, projRoot, manifest, { force: true });

      expect(logSpy).toHaveBeenCalledWith(
        expect.stringContaining('⚠️ overwritten (was locally modified)'),
      );
      logSpy.mockRestore();
    });
  });

  describe('applyGovernance', () => {
    test('applies only governance-tier files', () => {
      fs.mkdirSync(path.join(pkgRoot, '.kiro/steering'), { recursive: true });
      fs.mkdirSync(path.join(pkgRoot, 'src/tokens'), { recursive: true });
      fs.writeFileSync(path.join(pkgRoot, '.kiro/steering/A.md'), 'gov', 'utf-8');
      fs.writeFileSync(path.join(pkgRoot, 'src/tokens/B.ts'), 'src', 'utf-8');

      const files = [
        makeFile('.kiro/steering/A.md', 'governance'),
        makeFile('src/tokens/B.ts', 'source'),
      ];
      const manifest = makeManifest();

      const result = applyGovernance(files, pkgRoot, projRoot, manifest);

      expect(result.applied).toEqual(['.kiro/steering/A.md']);
      expect(fs.existsSync(path.join(projRoot, '.kiro/steering/A.md'))).toBe(true);
      expect(fs.existsSync(path.join(projRoot, 'src/tokens/B.ts'))).toBe(false);
    });
  });

  describe('applySource', () => {
    test('applies only source-tier files', () => {
      fs.mkdirSync(path.join(pkgRoot, '.kiro/steering'), { recursive: true });
      fs.mkdirSync(path.join(pkgRoot, 'src/tokens'), { recursive: true });
      fs.writeFileSync(path.join(pkgRoot, '.kiro/steering/A.md'), 'gov', 'utf-8');
      fs.writeFileSync(path.join(pkgRoot, 'src/tokens/B.ts'), 'src', 'utf-8');

      const files = [
        makeFile('.kiro/steering/A.md', 'governance'),
        makeFile('src/tokens/B.ts', 'source'),
      ];
      const manifest = makeManifest();

      const result = applySource(files, pkgRoot, projRoot, manifest);

      expect(result.applied).toEqual(['src/tokens/B.ts']);
      expect(fs.existsSync(path.join(projRoot, 'src/tokens/B.ts'))).toBe(true);
      expect(fs.existsSync(path.join(projRoot, '.kiro/steering/A.md'))).toBe(false);
    });
  });

  describe('applyForce', () => {
    test('applies all files regardless of tier', () => {
      fs.mkdirSync(path.join(pkgRoot, '.kiro/steering'), { recursive: true });
      fs.mkdirSync(path.join(pkgRoot, 'src/tokens'), { recursive: true });
      fs.writeFileSync(path.join(pkgRoot, '.kiro/steering/A.md'), 'gov', 'utf-8');
      fs.writeFileSync(path.join(pkgRoot, 'src/tokens/B.ts'), 'src', 'utf-8');

      jest.spyOn(console, 'log').mockImplementation();
      const files = [
        makeFile('.kiro/steering/A.md', 'governance'),
        makeFile('src/tokens/B.ts', 'source'),
      ];
      const manifest = makeManifest();

      const result = applyForce(files, pkgRoot, projRoot, manifest);

      expect(result.applied).toHaveLength(2);
      jest.restoreAllMocks();
    });
  });
});
