/**
 * @category evergreen
 * @purpose Verify FileScanner hashes files, respects excludeDirs, handles missing dirs (Spec 111, R1 AC2/AC4/AC5)
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as crypto from 'crypto';
import { scanFiles, ManagedDir } from '../sync/FileScanner';

describe('FileScanner', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'dp-scanner-')));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  function writeFile(relativePath: string, content: string): void {
    const abs = path.join(tmpDir, relativePath);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, content, 'utf-8');
  }

  function expectedHash(content: string): string {
    return crypto.createHash('sha256').update(Buffer.from(content, 'utf-8')).digest('hex');
  }

  test('scans files and produces correct SHA-256 hashes', () => {
    writeFile('src/tokens/Color.ts', 'export const color = "red";');
    const dirs: ManagedDir[] = [{ path: 'src/tokens', tier: 'source' }];

    const results = scanFiles(tmpDir, dirs);

    expect(results).toHaveLength(1);
    expect(results[0].relativePath).toBe('src/tokens/Color.ts');
    expect(results[0].hash).toBe(expectedHash('export const color = "red";'));
    expect(results[0].tier).toBe('source');
  });

  test('excludes directories listed in excludeDirs', () => {
    writeFile('src/tokens/Color.ts', 'color');
    writeFile('src/tokens/__tests__/Color.test.ts', 'test');
    writeFile('src/tokens/generated/output.ts', 'gen');
    const dirs: ManagedDir[] = [
      { path: 'src/tokens', tier: 'source', excludeDirs: ['__tests__', 'generated'] },
    ];

    const results = scanFiles(tmpDir, dirs);

    expect(results).toHaveLength(1);
    expect(results[0].relativePath).toBe('src/tokens/Color.ts');
  });

  test('handles missing directories gracefully (returns empty)', () => {
    const dirs: ManagedDir[] = [{ path: 'nonexistent/dir', tier: 'governance' }];

    const results = scanFiles(tmpDir, dirs);

    expect(results).toHaveLength(0);
  });

  test('scans multiple managed directories with correct tier assignment', () => {
    writeFile('.kiro/steering/Goals.md', '# Goals');
    writeFile('src/tokens/Space.ts', 'space');
    const dirs: ManagedDir[] = [
      { path: '.kiro/steering', tier: 'governance' },
      { path: 'src/tokens', tier: 'source' },
    ];

    const results = scanFiles(tmpDir, dirs);

    expect(results).toHaveLength(2);
    const governance = results.find(f => f.relativePath === '.kiro/steering/Goals.md');
    const source = results.find(f => f.relativePath === 'src/tokens/Space.ts');
    expect(governance!.tier).toBe('governance');
    expect(source!.tier).toBe('source');
  });

  test('scans nested subdirectories recursively', () => {
    writeFile('src/tokens/primitives/spacing.ts', 'spacing');
    writeFile('src/tokens/semantic/color.ts', 'color');
    const dirs: ManagedDir[] = [{ path: 'src/tokens', tier: 'source' }];

    const results = scanFiles(tmpDir, dirs);

    expect(results).toHaveLength(2);
    const paths = results.map(r => r.relativePath).sort();
    expect(paths).toEqual([
      'src/tokens/primitives/spacing.ts',
      'src/tokens/semantic/color.ts',
    ]);
  });

  test('returns absolute paths', () => {
    writeFile('.kiro/steering/doc.md', 'content');
    const dirs: ManagedDir[] = [{ path: '.kiro/steering', tier: 'governance' }];

    const results = scanFiles(tmpDir, dirs);

    expect(path.isAbsolute(results[0].absolutePath)).toBe(true);
    expect(results[0].absolutePath).toBe(path.join(tmpDir, '.kiro/steering/doc.md'));
  });
});
