/**
 * @category evergreen
 * @purpose Verify loadComponentTokens() discovery and loading (Spec 104)
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { loadComponentTokens } from '../loadComponentTokens';
import type { ResolvedConfig } from '../../config/ConfigLoader';

describe('loadComponentTokens', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-comp-tokens-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  function makeConfig(overrides: Partial<ResolvedConfig> = {}): ResolvedConfig {
    return {
      name: 'Test',
      abbreviation: 'T',
      themes: [],
      tokenSourceRoot: path.join(tmpDir, 'tokens'),
      tokenSourceMode: 'local',
      componentTokenDirs: [],
      outputDir: path.join(tmpDir, 'dist'),
      configDir: tmpDir,
      ...overrides,
    } as ResolvedConfig;
  }

  test('returns 0 when no component subdirectory exists', () => {
    fs.mkdirSync(path.join(tmpDir, 'tokens'), { recursive: true });
    const config = makeConfig();
    expect(loadComponentTokens(config)).toBe(0);
  });

  test('discovers *.ts files in {tokenSourceRoot}/component/', () => {
    const componentDir = path.join(tmpDir, 'tokens', 'component');
    fs.mkdirSync(componentDir, { recursive: true });
    fs.writeFileSync(path.join(componentDir, 'progress.ts'), 'module.exports = {};');
    fs.writeFileSync(path.join(componentDir, 'another.ts'), 'module.exports = {};');

    const config = makeConfig();
    expect(loadComponentTokens(config)).toBe(2);
  });

  test('excludes .test.ts and .d.ts files from component/', () => {
    const componentDir = path.join(tmpDir, 'tokens', 'component');
    fs.mkdirSync(componentDir, { recursive: true });
    fs.writeFileSync(path.join(componentDir, 'progress.ts'), 'module.exports = {};');
    fs.writeFileSync(path.join(componentDir, 'progress.test.ts'), 'module.exports = {};');
    fs.writeFileSync(path.join(componentDir, 'progress.d.ts'), 'module.exports = {};');

    const config = makeConfig();
    expect(loadComponentTokens(config)).toBe(1);
  });

  test('discovers *.tokens.ts files recursively in componentTokenDirs', () => {
    const compDir = path.join(tmpDir, 'components');
    fs.mkdirSync(path.join(compDir, 'Button-Icon'), { recursive: true });
    fs.mkdirSync(path.join(compDir, 'Avatar-Base'), { recursive: true });
    fs.writeFileSync(path.join(compDir, 'Button-Icon', 'buttonIcon.tokens.ts'), 'module.exports = {};');
    fs.writeFileSync(path.join(compDir, 'Avatar-Base', 'avatar.tokens.ts'), 'module.exports = {};');
    // Non-token file should be ignored
    fs.writeFileSync(path.join(compDir, 'Button-Icon', 'index.ts'), 'module.exports = {};');

    const config = makeConfig({ componentTokenDirs: [compDir] });
    expect(loadComponentTokens(config)).toBe(2);
  });

  test('skips __tests__ directories', () => {
    const compDir = path.join(tmpDir, 'components');
    fs.mkdirSync(path.join(compDir, '__tests__'), { recursive: true });
    fs.writeFileSync(path.join(compDir, '__tests__', 'mock.tokens.ts'), 'module.exports = {};');

    const config = makeConfig({ componentTokenDirs: [compDir] });
    expect(loadComponentTokens(config)).toBe(0);
  });

  test('skips non-existent componentTokenDirs gracefully', () => {
    fs.mkdirSync(path.join(tmpDir, 'tokens'), { recursive: true });
    const config = makeConfig({ componentTokenDirs: ['/nonexistent/path'] });
    expect(loadComponentTokens(config)).toBe(0);
  });

  test('combines both sources', () => {
    // Source 1: component subdir
    const componentDir = path.join(tmpDir, 'tokens', 'component');
    fs.mkdirSync(componentDir, { recursive: true });
    fs.writeFileSync(path.join(componentDir, 'progress.ts'), 'module.exports = {};');

    // Source 2: explicit dir
    const compDir = path.join(tmpDir, 'components');
    fs.mkdirSync(path.join(compDir, 'Button'), { recursive: true });
    fs.writeFileSync(path.join(compDir, 'Button', 'button.tokens.ts'), 'module.exports = {};');

    const config = makeConfig({ componentTokenDirs: [compDir] });
    expect(loadComponentTokens(config)).toBe(2);
  });
});
