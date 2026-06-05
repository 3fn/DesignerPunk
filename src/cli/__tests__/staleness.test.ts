/**
 * @category evergreen
 * @purpose Verify product token staleness detection (Spec 114 R4)
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { isProductTokenStale, getProductTokenOutputPaths } from '../staleness';
import type { ResolvedConfig } from '../../config/ConfigLoader';

describe('isProductTokenStale', () => {
  let tmpDir: string;
  let sourceDir: string;
  let outputDir: string;

  function makeConfig(): ResolvedConfig {
    return {
      name: 'Test',
      abbreviation: 'T',
      themes: [],
      tokenSourceRoot: tmpDir,
      tokenSourceMode: 'package',
      componentTokenDirs: [],
      outputDir: tmpDir,
      configDir: tmpDir,
      productTokens: sourceDir,
    } as ResolvedConfig;
  }

  function writeSource(name: string): string {
    const p = path.join(sourceDir, name);
    fs.writeFileSync(p, 'tokens: {}');
    return p;
  }

  function writeOutput(name: string): string {
    const p = path.join(outputDir, name);
    fs.writeFileSync(p, '/* generated */');
    return p;
  }

  function writeAllOutputs(): void {
    fs.mkdirSync(outputDir, { recursive: true });
    writeOutput('ProductTokens.web.css');
    writeOutput('ProductTokens.ios.swift');
    writeOutput('ProductTokens.android.kt');
  }

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'staleness-'));
    sourceDir = path.join(tmpDir, 'product-tokens');
    outputDir = path.join(tmpDir, 'product');
    fs.mkdirSync(sourceDir, { recursive: true });
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  test('returns true when --force is set', () => {
    writeSource('colors.yaml');
    writeAllOutputs();
    expect(isProductTokenStale(makeConfig(), true)).toBe(true);
  });

  test('returns true when output file is missing', () => {
    writeSource('colors.yaml');
    // No output files written
    expect(isProductTokenStale(makeConfig())).toBe(true);
  });

  test('returns true when source YAML is newer than output', () => {
    writeAllOutputs();
    // Set output to past
    const now = Date.now();
    for (const p of getProductTokenOutputPaths(makeConfig())) {
      fs.utimesSync(p, new Date(now - 2000), new Date(now - 2000));
    }
    // Write source (will be newer)
    writeSource('colors.yaml');
    expect(isProductTokenStale(makeConfig())).toBe(true);
  });

  test('returns false when output is newer than all sources', () => {
    writeSource('colors.yaml');
    // Set source to past
    const now = Date.now();
    const sourcePath = path.join(sourceDir, 'colors.yaml');
    fs.utimesSync(sourcePath, new Date(now - 2000), new Date(now - 2000));
    // Write output (will be newer)
    writeAllOutputs();
    expect(isProductTokenStale(makeConfig())).toBe(false);
  });

  test('uses oldest output file for comparison', () => {
    writeSource('colors.yaml');
    const now = Date.now();
    const sourcePath = path.join(sourceDir, 'colors.yaml');
    fs.utimesSync(sourcePath, new Date(now - 1000), new Date(now - 1000));

    writeAllOutputs();
    // Make one output older than source
    const oldOutput = path.join(outputDir, 'ProductTokens.web.css');
    fs.utimesSync(oldOutput, new Date(now - 2000), new Date(now - 2000));

    expect(isProductTokenStale(makeConfig())).toBe(true);
  });

  test('returns true when no source YAML files exist', () => {
    writeAllOutputs();
    // sourceDir exists but is empty
    expect(isProductTokenStale(makeConfig())).toBe(true);
  });

  test('returns true when productTokens path does not exist', () => {
    const config = makeConfig();
    config.productTokens = '/nonexistent/path';
    expect(isProductTokenStale(config)).toBe(true);
  });
});

describe('getProductTokenOutputPaths', () => {
  test('returns paths for all three platform files', () => {
    const config = { outputDir: '/tmp/dist' } as any;
    const paths = getProductTokenOutputPaths(config);
    expect(paths).toHaveLength(3);
    expect(paths[0]).toContain('ProductTokens.web.css');
    expect(paths[1]).toContain('ProductTokens.ios.swift');
    expect(paths[2]).toContain('ProductTokens.android.kt');
  });
});
