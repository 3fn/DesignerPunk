/**
 * @category evergreen
 * @purpose Integration tests for `npx designerpunk sync` full flow (Spec 111)
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as crypto from 'crypto';
import { runSync } from '../sync';
import type { SyncManifest } from '../sync/Manifest';

// Mock stdin.isTTY for non-TTY test
const originalIsTTY = process.stdin.isTTY;

function createScratch(): string {
  return fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'dp-sync-int-')));
}

function hash(content: string): string {
  return crypto.createHash('sha256').update(Buffer.from(content, 'utf-8')).digest('hex');
}

/**
 * Set up a minimal fake @3fn/core package in the scratch dir's node_modules.
 */
function setupPackage(scratchDir: string, files: Record<string, string>, version = '12.0.0'): string {
  const pkgDir = path.join(scratchDir, 'node_modules', '@3fn', 'core');
  fs.mkdirSync(pkgDir, { recursive: true });
  fs.writeFileSync(
    path.join(pkgDir, 'package.json'),
    JSON.stringify({ name: '@3fn/core', version }),
  );

  for (const [relPath, content] of Object.entries(files)) {
    const abs = path.join(pkgDir, relPath);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, content, 'utf-8');
  }

  return pkgDir;
}

function writeProjectFile(scratchDir: string, relPath: string, content: string): void {
  const abs = path.join(scratchDir, relPath);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content, 'utf-8');
}

function readManifest(scratchDir: string): SyncManifest {
  return JSON.parse(fs.readFileSync(path.join(scratchDir, '.kiro/sync-manifest.json'), 'utf-8'));
}

describe('sync command — integration', () => {
  let scratchDir: string;
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    scratchDir = createScratch();
    logSpy = jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    fs.rmSync(scratchDir, { recursive: true, force: true });
    jest.restoreAllMocks();
    process.stdin.isTTY = originalIsTTY;
  });

  function output(): string {
    return logSpy.mock.calls.map(c => c.join(' ')).join('\n');
  }

  describe('dry-run mode', () => {
    test('reports new files without applying', async () => {
      setupPackage(scratchDir, { '.kiro/steering/New.md': '# New' });

      await runSync({ dryRun: true, force: false, projectRoot: scratchDir });

      expect(output()).toContain('Dry-run mode');
      expect(output()).toContain('New.md');
      // File not copied
      expect(fs.existsSync(path.join(scratchDir, '.kiro/steering/New.md'))).toBe(false);
      // No manifest created
      expect(fs.existsSync(path.join(scratchDir, '.kiro/sync-manifest.json'))).toBe(false);
    });
  });

  describe('force mode', () => {
    test('applies all files without prompting', async () => {
      setupPackage(scratchDir, {
        '.kiro/steering/Doc.md': '# Updated doc',
        'src/tokens/Color.ts': 'export const c = 1;',
      });
      // Pre-existing project file with different content (creates conflict)
      writeProjectFile(scratchDir, 'src/tokens/Color.ts', 'export const c = 0;');

      await runSync({ dryRun: false, force: true, projectRoot: scratchDir });

      // Both files applied
      expect(fs.existsSync(path.join(scratchDir, '.kiro/steering/Doc.md'))).toBe(true);
      expect(fs.readFileSync(path.join(scratchDir, 'src/tokens/Color.ts'), 'utf-8'))
        .toBe('export const c = 1;');
      // Manifest created
      const manifest = readManifest(scratchDir);
      expect(manifest.version).toBe('12.0.0');
      expect(manifest.files['src/tokens/Color.ts']).toBeDefined();
    });

    test('applies transform to source-tier .ts files', async () => {
      setupPackage(scratchDir, {
        'src/tokens/Token.ts': `import { x } from '../../build/tokens';\nexport const y = x;`,
      });

      await runSync({ dryRun: false, force: true, projectRoot: scratchDir });

      const content = fs.readFileSync(path.join(scratchDir, 'src/tokens/Token.ts'), 'utf-8');
      expect(content).toContain(`from '@3fn/core/build'`);
    });

    test('logs warning for overwritten conflicts', async () => {
      setupPackage(scratchDir, { 'src/tokens/X.ts': 'new' });
      writeProjectFile(scratchDir, 'src/tokens/X.ts', 'edited');
      // Create a manifest entry that differs from project (creates real conflict)
      writeProjectFile(scratchDir, '.kiro/sync-manifest.json', JSON.stringify({
        version: '11.0.0',
        syncedAt: '2026-01-01T00:00:00Z',
        files: { 'src/tokens/X.ts': { hash: 'original-hash', managed: false } },
      }));

      await runSync({ dryRun: false, force: true, projectRoot: scratchDir });

      expect(output()).toContain('⚠️ overwritten (was locally modified)');
    });
  });

  describe('non-TTY guard', () => {
    test('auto dry-run when not TTY and not force', async () => {
      process.stdin.isTTY = undefined as any;
      setupPackage(scratchDir, { '.kiro/steering/Doc.md': '# Doc' });

      await runSync({ dryRun: false, force: false, projectRoot: scratchDir });

      expect(output()).toContain('Non-interactive environment detected');
      // File not applied
      expect(fs.existsSync(path.join(scratchDir, '.kiro/steering/Doc.md'))).toBe(false);
    });

    test('force overrides non-TTY guard', async () => {
      process.stdin.isTTY = undefined as any;
      setupPackage(scratchDir, { '.kiro/steering/Doc.md': '# Doc' });

      await runSync({ dryRun: false, force: true, projectRoot: scratchDir });

      expect(fs.existsSync(path.join(scratchDir, '.kiro/steering/Doc.md'))).toBe(true);
    });
  });

  describe('first-time sync (bootstrap)', () => {
    test('bootstraps manifest without treating files as conflicts', async () => {
      setupPackage(scratchDir, { 'src/tokens/Color.ts': 'export const x = 1;' });
      writeProjectFile(scratchDir, 'src/tokens/Color.ts', 'export const x = 1;');

      await runSync({ dryRun: false, force: true, projectRoot: scratchDir });

      expect(output()).toContain('First sync');
      const manifest = readManifest(scratchDir);
      expect(manifest.files['src/tokens/Color.ts']).toBeDefined();
    });
  });

  describe('.designerpunkignore', () => {
    test('ignored files are not reported or applied', async () => {
      setupPackage(scratchDir, {
        '.kiro/steering/Keep.md': '# Keep',
        '.kiro/steering/Ignore.md': '# Ignored',
      });
      writeProjectFile(scratchDir, '.designerpunkignore', '.kiro/steering/Ignore.md');

      await runSync({ dryRun: true, force: false, projectRoot: scratchDir });

      expect(output()).toContain('Keep.md');
      expect(output()).not.toContain('Ignore.md');
    });
  });

  describe('classification accuracy', () => {
    test('unchanged files are not reported as new or updated', async () => {
      const content = '# Same content';
      setupPackage(scratchDir, { '.kiro/steering/Same.md': content });
      writeProjectFile(scratchDir, '.kiro/steering/Same.md', content);

      await runSync({ dryRun: true, force: false, projectRoot: scratchDir });

      expect(output()).toContain('1 file unchanged');
      expect(output()).not.toContain('New files');
    });
  });
});
