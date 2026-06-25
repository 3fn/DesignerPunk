/**
 * Unit tests for the parity orchestrator's two-tree compare seam (Task 7.1).
 *
 * `compareTrees` is PURE over two roots (no subprocess), so we materialize tiny
 * fixture trees on disk and assert the per-artifact green/red logic. This proves
 * the seam — read each INVENTORY path from root A and root B, normalize both with
 * the extended rule set, compare — without paying for two full generations (that
 * end-to-end run is the standalone runner's job, exercised separately).
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

import { compareTrees } from '../ParityOrchestrator';
import { ArtifactRef } from '../types';

const CSS: ArtifactRef = { path: 'dist/DesignTokens.web.css', kind: 'css', optional: false };
const DTCG: ArtifactRef = { path: 'dist/DesignTokens.dtcg.json', kind: 'json', optional: false };
const OPTIONAL: ArtifactRef = { path: 'dist/product/ProductTokens.web.css', kind: 'css', optional: true };

function writeTree(files: Record<string, string>): string {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'parity-fixture-'));
  for (const [rel, content] of Object.entries(files)) {
    const abs = path.join(root, rel);
    fs.mkdirSync(path.dirname(abs), { recursive: true });
    fs.writeFileSync(abs, content, 'utf-8');
  }
  return root;
}

describe('ParityOrchestrator.compareTrees — two-fresh-tree seam', () => {
  const roots: string[] = [];
  const make = (files: Record<string, string>) => {
    const r = writeTree(files);
    roots.push(r);
    return r;
  };
  afterAll(() => {
    for (const r of roots) fs.rmSync(r, { recursive: true, force: true });
  });

  it('reports GREEN when the only difference is a volatile timestamp header', () => {
    const a = make({
      'dist/DesignTokens.web.css': ' * Generated: 2026-06-25T12:00:00.000Z\n:root { --space-100: 8px; }\n',
    });
    const b = make({
      'dist/DesignTokens.web.css': ' * Generated: 2026-06-25T23:59:59.000Z\n:root { --space-100: 8px; }\n',
    });
    const report = compareTrees({ rootA: a, rootB: b, inventory: [CSS] });
    expect(report.allGreen).toBe(true);
    expect(report.results[0].semanticParity).toBe('green');
    expect(report.results[0].rawIdentical).toBe(false);
  });

  it('reports GREEN for byte-identical artifacts', () => {
    const content = '{"$extensions":{"designerpunk":{"version":"1.0.0","rosettaVersion":"12.0.5","generatedAt":"2026-06-25T12:00:00.000Z"}},"space":{"a":{"$value":"8px"}}}';
    const a = make({ 'dist/DesignTokens.dtcg.json': content });
    const b = make({ 'dist/DesignTokens.dtcg.json': content });
    const report = compareTrees({ rootA: a, rootB: b, inventory: [DTCG] });
    expect(report.allGreen).toBe(true);
    expect(report.results[0].rawIdentical).toBe(true);
    expect(report.results[0].notes).toContain('byte-identical');
  });

  it('reports RED on a genuine token-value divergence', () => {
    const a = make({ 'dist/DesignTokens.web.css': ':root { --space-100: 8px; }\n' });
    const b = make({ 'dist/DesignTokens.web.css': ':root { --space-100: 9px; }\n' });
    const report = compareTrees({ rootA: a, rootB: b, inventory: [CSS] });
    expect(report.allGreen).toBe(false);
    expect(report.results[0].semanticParity).toBe('red');
    expect(report.results[0].divergences.length).toBeGreaterThan(0);
  });

  it('reports RED when a non-optional artifact is present on only one side', () => {
    const a = make({ 'dist/DesignTokens.web.css': ':root {}\n' });
    const b = make({ 'unrelated.txt': 'x' });
    const report = compareTrees({ rootA: a, rootB: b, inventory: [CSS] });
    expect(report.allGreen).toBe(false);
    expect(report.results[0].notes).toContain('only one side');
  });

  it('treats an OPTIONAL artifact absent on both sides as green (not a divergence)', () => {
    const a = make({ 'dist/DesignTokens.web.css': ':root {}\n' });
    const b = make({ 'dist/DesignTokens.web.css': ':root {}\n' });
    const report = compareTrees({ rootA: a, rootB: b, inventory: [OPTIONAL] });
    expect(report.allGreen).toBe(true);
    expect(report.results[0].semanticParity).toBe('green');
    expect(report.results[0].notes).toContain('optional');
  });

  it('applies the extended rule set: a rosettaVersion-only DTCG difference is GREEN', () => {
    const a = make({
      'dist/DesignTokens.dtcg.json':
        '{"$extensions":{"designerpunk":{"version":"1.0.0","rosettaVersion":"12.0.5"}},"space":{"a":{"$value":"8px"}}}',
    });
    const b = make({
      'dist/DesignTokens.dtcg.json':
        '{"$extensions":{"designerpunk":{"version":"1.0.0","rosettaVersion":"99.9.9"}},"space":{"a":{"$value":"8px"}}}',
    });
    const report = compareTrees({ rootA: a, rootB: b, inventory: [DTCG] });
    expect(report.allGreen).toBe(true);
  });
});
