/**
 * @category evergreen
 * @purpose Pre-migration snapshot regression test for Spec 094
 *
 * Compares current generated output against pre-migration snapshots.
 * Timestamps are normalized before comparison since they change on every build.
 * This test ensures the theme registry migration produces identical output.
 */

import * as fs from 'fs';
import * as path from 'path';

const FIXTURES_DIR = path.resolve(
  __dirname,
  '../../../../.kiro/specs/094-portable-pipeline-and-theme-registry/fixtures/pre-migration'
);
const DIST_DIR = path.resolve(__dirname, '../../../../dist');

/** Strip generated timestamps so comparison is content-only */
function normalizeTimestamp(content: string): string {
  return content
    .replace(/Generated: \d{4}-\d{2}-\d{2}T[\d:.]+Z/g, 'Generated: NORMALIZED')
    .replace(/"generatedAt":\s*"\d{4}-\d{2}-\d{2}T[\d:.]+Z"/g, '"generatedAt": "NORMALIZED"');
}

const SNAPSHOT_FILES = [
  'DesignTokens.web.css',
  'DesignTokens.ios.swift',
  'DesignTokens.android.kt',
  'DesignTokens.dtcg.json',
  'DesignTokens.figma.json',
  'ComponentTokens.web.css',
  'ComponentTokens.ios.swift',
  'ComponentTokens.android.kt',
];

describe('Pre-migration snapshot regression (Spec 094)', () => {
  for (const file of SNAPSHOT_FILES) {
    test(`${file} matches pre-migration snapshot`, () => {
      const snapshotPath = path.join(FIXTURES_DIR, file);
      const distPath = path.join(DIST_DIR, file);

      expect(fs.existsSync(snapshotPath)).toBe(true);
      expect(fs.existsSync(distPath)).toBe(true);

      const snapshot = normalizeTimestamp(fs.readFileSync(snapshotPath, 'utf-8'));
      const current = normalizeTimestamp(fs.readFileSync(distPath, 'utf-8'));

      expect(current).toBe(snapshot);
    });
  }
});
