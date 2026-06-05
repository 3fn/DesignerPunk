/**
 * @category evergreen
 * @purpose Verify PackageResolver resolves @3fn/core location and version (Spec 111, R1 AC1/AC3)
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { resolvePackage } from '../sync/PackageResolver';

describe('PackageResolver', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'dp-pkg-resolver-')));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test('resolves from standard node_modules layout', () => {
    // Simulate node_modules/@3fn/core/package.json
    const pkgDir = path.join(tmpDir, 'node_modules', '@3fn', 'core');
    fs.mkdirSync(pkgDir, { recursive: true });
    fs.writeFileSync(
      path.join(pkgDir, 'package.json'),
      JSON.stringify({ name: '@3fn/core', version: '11.8.0' }),
    );

    const result = resolvePackage(tmpDir);

    expect(result.root).toBe(pkgDir);
    expect(result.version).toBe('11.8.0');
  });

  test('throws with clear message when package not installed', () => {
    expect(() => resolvePackage(tmpDir)).toThrow(
      '❌ @3fn/core not installed. Run `npm install` first.',
    );
  });

  test('reads version from package.json correctly', () => {
    const pkgDir = path.join(tmpDir, 'node_modules', '@3fn', 'core');
    fs.mkdirSync(pkgDir, { recursive: true });
    fs.writeFileSync(
      path.join(pkgDir, 'package.json'),
      JSON.stringify({ name: '@3fn/core', version: '12.0.0-beta.1' }),
    );

    const result = resolvePackage(tmpDir);
    expect(result.version).toBe('12.0.0-beta.1');
  });

  test('returns absolute path for root', () => {
    const pkgDir = path.join(tmpDir, 'node_modules', '@3fn', 'core');
    fs.mkdirSync(pkgDir, { recursive: true });
    fs.writeFileSync(
      path.join(pkgDir, 'package.json'),
      JSON.stringify({ name: '@3fn/core', version: '1.0.0' }),
    );

    const result = resolvePackage(tmpDir);
    expect(path.isAbsolute(result.root)).toBe(true);
  });
});
