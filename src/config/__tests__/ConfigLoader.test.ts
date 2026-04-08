/**
 * @category evergreen
 * @purpose Verify defineConfig and ConfigLoader behavior (Spec 094)
 */

import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';
import { defineConfig } from '../defineConfig';
import { loadConfig } from '../ConfigLoader';

describe('defineConfig', () => {
  test('returns the config object as-is', () => {
    const config = defineConfig({
      name: 'TestProduct',
      abbreviation: 'TP',
      themes: [],
      output: './dist/tokens',
    });

    expect(config.name).toBe('TestProduct');
    expect(config.abbreviation).toBe('TP');
    expect(config.output).toBe('./dist/tokens');
  });

  test('accepts empty config', () => {
    const config = defineConfig({});
    expect(config).toEqual({});
  });
});

describe('ConfigLoader', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-config-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test('returns defaults when no config file exists', async () => {
    const config = await loadConfig(tmpDir);

    expect(config.name).toBe('DesignerPunk');
    expect(config.abbreviation).toBe('DP');
    expect(config.themes).toEqual([]);
    expect(config.componentTokenDirs).toEqual([]);
    expect(config.configDir).toBe(tmpDir);
  });

  test('resolves output directory relative to config dir', async () => {
    const config = await loadConfig(tmpDir);

    expect(config.outputDir).toBe(path.resolve(tmpDir, 'dist'));
  });

  test('resolves token source root to package root via __dirname', async () => {
    const config = await loadConfig(tmpDir);

    // tokenSourceRoot resolves relative to ConfigLoader's __dirname (the package root),
    // not cwd. This works in both repo and product contexts.
    expect(config.tokenSourceRoot).toContain('DesignerPunk');
    expect(require('fs').existsSync(path.join(config.tokenSourceRoot, 'package.json'))).toBe(true);
  });

  test('resolves component token dirs relative to config dir', async () => {
    // Create a JS config (avoids needing ts-node in test)
    const configContent = `module.exports = { componentTokens: ['./src/components', './src/tokens/component'] };`;
    fs.writeFileSync(path.join(tmpDir, 'designerpunk.config.ts'), configContent);

    const config = await loadConfig(tmpDir);

    expect(config.componentTokenDirs).toEqual([
      path.resolve(tmpDir, './src/components'),
      path.resolve(tmpDir, './src/tokens/component'),
    ]);
  });

  test('uses custom name and abbreviation from config', async () => {
    const configContent = `module.exports = { name: 'WrKingClass', abbreviation: 'WKC' };`;
    fs.writeFileSync(path.join(tmpDir, 'designerpunk.config.ts'), configContent);

    const config = await loadConfig(tmpDir);

    expect(config.name).toBe('WrKingClass');
    expect(config.abbreviation).toBe('WKC');
  });

  test('uses custom output directory from config', async () => {
    const configContent = `module.exports = { output: './build/tokens' };`;
    fs.writeFileSync(path.join(tmpDir, 'designerpunk.config.ts'), configContent);

    const config = await loadConfig(tmpDir);

    expect(config.outputDir).toBe(path.resolve(tmpDir, './build/tokens'));
  });

  test('throws on invalid config file', async () => {
    fs.writeFileSync(path.join(tmpDir, 'designerpunk.config.ts'), 'this is not valid javascript{{{');

    await expect(loadConfig(tmpDir)).rejects.toThrow('Failed to load');
  });
});
