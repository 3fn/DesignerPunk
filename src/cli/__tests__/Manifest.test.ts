/**
 * @category evergreen
 * @purpose Verify Manifest load/save/bootstrap and corrupt file recovery (Spec 111, R3)
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { loadManifest, saveManifest, bootstrapManifest, getManifestPath } from '../sync/Manifest';
import type { ScannedFile } from '../sync/FileScanner';

describe('Manifest', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'dp-manifest-')));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  describe('loadManifest', () => {
    test('returns null when manifest does not exist', () => {
      expect(loadManifest(tmpDir)).toBeNull();
    });

    test('loads valid manifest JSON', () => {
      const manifest = {
        version: '11.8.0',
        syncedAt: '2026-06-05T15:00:00.000Z',
        files: { 'src/tokens/Color.ts': { hash: 'abc123', managed: false } },
      };
      const manifestPath = getManifestPath(tmpDir);
      fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
      fs.writeFileSync(manifestPath, JSON.stringify(manifest), 'utf-8');

      const result = loadManifest(tmpDir);
      expect(result).toEqual(manifest);
    });

    test('returns null for corrupt JSON (graceful recovery)', () => {
      const manifestPath = getManifestPath(tmpDir);
      fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
      fs.writeFileSync(manifestPath, '{ broken json !!!', 'utf-8');

      expect(loadManifest(tmpDir)).toBeNull();
    });
  });

  describe('saveManifest', () => {
    test('writes manifest to correct path', () => {
      const manifest = {
        version: '11.8.0',
        syncedAt: '2026-06-05T15:00:00.000Z',
        files: { '.kiro/steering/Goals.md': { hash: 'def456', managed: true } },
      };

      saveManifest(tmpDir, manifest);

      const raw = fs.readFileSync(getManifestPath(tmpDir), 'utf-8');
      expect(JSON.parse(raw)).toEqual(manifest);
    });

    test('creates parent directories if missing', () => {
      const manifest = { version: '1.0.0', syncedAt: '', files: {} };
      saveManifest(tmpDir, manifest);
      expect(fs.existsSync(getManifestPath(tmpDir))).toBe(true);
    });

    test('roundtrip: save then load returns identical data', () => {
      const manifest = {
        version: '12.0.0',
        syncedAt: '2026-06-05T16:00:00.000Z',
        files: {
          'src/tokens/Space.ts': { hash: 'aaa', managed: false },
          '.kiro/steering/Doc.md': { hash: 'bbb', managed: true },
        },
      };

      saveManifest(tmpDir, manifest);
      const loaded = loadManifest(tmpDir);
      expect(loaded).toEqual(manifest);
    });
  });

  describe('bootstrapManifest', () => {
    test('creates manifest from project files with correct tier mapping', () => {
      const projectFiles: ScannedFile[] = [
        { relativePath: '.kiro/steering/Goals.md', absolutePath: '/x', hash: 'h1', tier: 'governance' },
        { relativePath: 'src/tokens/Color.ts', absolutePath: '/y', hash: 'h2', tier: 'source' },
      ];

      const result = bootstrapManifest(projectFiles, '11.8.0');

      expect(result.version).toBe('11.8.0');
      expect(result.syncedAt).toBeTruthy();
      expect(result.files['.kiro/steering/Goals.md']).toEqual({ hash: 'h1', managed: true });
      expect(result.files['src/tokens/Color.ts']).toEqual({ hash: 'h2', managed: false });
    });

    test('returns empty files record for empty project', () => {
      const result = bootstrapManifest([], '1.0.0');
      expect(result.files).toEqual({});
    });
  });
});
