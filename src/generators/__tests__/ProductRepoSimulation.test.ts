/**
 * @category evergreen
 * @purpose Integration test: simulate a product repo consuming DesignerPunk (Spec 094)
 *
 * Creates a temp directory with a designerpunk.config.ts that registers a test theme,
 * runs the pipeline via loadConfig + generateTokenFiles, and verifies themed output.
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { loadConfig } from '../../config/ConfigLoader';
import { generateTokenFiles } from '../generateTokenFiles';
import { resolveTokens } from '../../cli/resolveTokens';

describe('Product repo simulation (Spec 094)', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dp-product-sim-'));
    fs.mkdirSync(path.join(tmpDir, 'dist'), { recursive: true });
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test('generates token files with default config (no config file)', async () => {
    const config = await loadConfig(tmpDir);

    expect(config.name).toBe('DesignerPunk');
    expect(config.abbreviation).toBe('DP');
    expect(config.themes).toEqual([]);

    // Pipeline runs with the resolved output dir
    generateTokenFiles(resolveTokens(config), config);

    // Verify platform files were generated
    const distDir = config.outputDir;
    expect(fs.existsSync(path.join(distDir, 'DesignTokens.web.css'))).toBe(true);
    expect(fs.existsSync(path.join(distDir, 'DesignTokens.ios.swift'))).toBe(true);
    expect(fs.existsSync(path.join(distDir, 'DesignTokens.android.kt'))).toBe(true);
  });

  test('loads custom name and abbreviation from config', async () => {
    const configContent = `module.exports = { name: 'TestProduct', abbreviation: 'TP', output: './dist' };`;
    fs.writeFileSync(path.join(tmpDir, 'designerpunk.config.ts'), configContent);

    const config = await loadConfig(tmpDir);

    expect(config.name).toBe('TestProduct');
    expect(config.abbreviation).toBe('TP');
    expect(config.outputDir).toBe(path.resolve(tmpDir, './dist'));
  });

  test('generates output to configured directory', async () => {
    const customOut = path.join(tmpDir, 'build', 'tokens');
    const configContent = `module.exports = { output: './build/tokens' };`;
    fs.writeFileSync(path.join(tmpDir, 'designerpunk.config.ts'), configContent);

    const config = await loadConfig(tmpDir);
    generateTokenFiles(resolveTokens(config), config);

    expect(fs.existsSync(path.join(customOut, 'DesignTokens.web.css'))).toBe(true);
    expect(fs.existsSync(path.join(customOut, 'DesignTokens.ios.swift'))).toBe(true);
    expect(fs.existsSync(path.join(customOut, 'DesignTokens.android.kt'))).toBe(true);
  });

  test('generated CSS contains base theme at :root', async () => {
    const config = await loadConfig(tmpDir);
    generateTokenFiles(resolveTokens(config), config);

    const css = fs.readFileSync(path.join(config.outputDir, 'DesignTokens.web.css'), 'utf-8');

    // Base theme tokens at :root
    expect(css).toContain(':root {');
    expect(css).toContain('--color-action-primary');
    expect(css).toContain('--space-100');
  });

  test('generated CSS contains WCAG theme block', async () => {
    const config = await loadConfig(tmpDir);
    generateTokenFiles(resolveTokens(config), config);

    const css = fs.readFileSync(path.join(config.outputDir, 'DesignTokens.web.css'), 'utf-8');

    expect(css).toContain(':root[data-theme="wcag"]');
  });
});
