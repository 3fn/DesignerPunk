/**
 * @category evergreen
 * @purpose Enforce token source portability boundary (Spec 104)
 *
 * Token files in src/tokens/ (excluding component/) are a public authoring surface.
 * They must depend only on ../types/ and intra-token-source imports.
 * Any import from src/constants/, src/build/, src/components/, or other src/ directories
 * breaks portability when loaded via tokenSource in product repos.
 */

import * as fs from 'fs';
import * as path from 'path';

const TOKEN_SOURCE_DIRS = [
  path.resolve(__dirname, '..'),           // src/tokens/*.ts
  path.resolve(__dirname, '../semantic'),   // src/tokens/semantic/*.ts
];

const FORBIDDEN_PATTERNS = [
  /from\s+['"]\.\.\/constants\//,
  /from\s+['"]\.\.\/\.\.\/constants\//,
  /from\s+['"]\.\.\/build\//,
  /from\s+['"]\.\.\/\.\.\/build\//,
  /from\s+['"]\.\.\/components\//,
  /from\s+['"]\.\.\/\.\.\/components\//,
  /require\(\s*['"]\.\.\/constants\//,
  /require\(\s*['"]\.\.\/\.\.\/build\//,
  /require\(\s*['"]\.\.\/\.\.\/components\//,
];

function getTokenFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.ts') && !f.endsWith('.test.ts') && !f.endsWith('.d.ts'))
    .map(f => path.join(dir, f));
}

describe('Token source portability boundary', () => {
  const files: string[] = [];
  for (const dir of TOKEN_SOURCE_DIRS) {
    files.push(...getTokenFiles(dir));
  }

  test('scanned files exist', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  test.each(files)('%s has no forbidden imports', (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    for (const pattern of FORBIDDEN_PATTERNS) {
      expect(content).not.toMatch(pattern);
    }
  });

  test('boundary would catch a forbidden import (negative test)', () => {
    const fakeContent = `import { STRATEGIC_FLEXIBILITY_TOKENS } from '../constants/StrategicFlexibilityTokens';`;
    const caught = FORBIDDEN_PATTERNS.some(p => p.test(fakeContent));
    expect(caught).toBe(true);
  });
});
