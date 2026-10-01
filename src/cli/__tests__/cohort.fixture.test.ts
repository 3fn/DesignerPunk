/**
 * Smoke test for the release-1 cohort fixture (Spec 123 Task 16, criterion C6
 * / Ada D-T-B2 — instrument rows 6.1–6.2).
 *
 * This fixture is a committed snapshot of what release-1 `init` (`src/cli/init.ts`
 * @ `d566b30f`) wrote: a current-format manifest whose `.kiro/agents` /
 * `.kiro/steering` / `governance` entries all carry `origin: 'copy'`. 16.5's
 * cohort case (sync reports them as legacy copies, offers `--migrate-legacy` +
 * `attach`) consumes this fixture. This test does not implement that case —
 * it only guards the fixture against silent drift.
 *
 * @see src/cli/__tests__/fixtures/release-1-cohort/README.md
 */

import * as fs from 'fs';
import * as path from 'path';

const FIXTURE_DIR = path.join(__dirname, 'fixtures', 'release-1-cohort');
const COHORT_ROOTS = ['.kiro/agents', '.kiro/steering', 'governance'];

function loadManifest(): any {
  return JSON.parse(fs.readFileSync(path.join(FIXTURE_DIR, 'manifest.json'), 'utf-8'));
}

function loadFileList(): Record<string, string[]> {
  return JSON.parse(fs.readFileSync(path.join(FIXTURE_DIR, 'file-list.json'), 'utf-8'));
}

/** README's "Counts" table, read as the single source of truth for expected totals. */
function expectedTotalFromReadme(): number {
  const readme = fs.readFileSync(path.join(FIXTURE_DIR, 'README.md'), 'utf-8');
  const match = readme.match(/\|\s*\*\*Total\*\*\s*\|\s*\*\*(\d+)\*\*\s*\|/);
  if (!match) {
    throw new Error('README.md Counts table: could not find the **Total** row — update the regex if the table format changed.');
  }
  return Number(match[1]);
}

function isUnderCohortRoot(manifestKey: string): string | undefined {
  return COHORT_ROOTS.find((root) => manifestKey === root || manifestKey.startsWith(root + '/'));
}

describe('release-1 cohort fixture', () => {
  test('manifest.json and file-list.json both load and parse', () => {
    expect(() => loadManifest()).not.toThrow();
    expect(() => loadFileList()).not.toThrow();
  });

  test('manifest is current-format (version "1") and born', () => {
    const manifest = loadManifest();
    expect(manifest.version).toBe('1');
    expect(manifest.posture).toBe('born');
  });

  test('every manifest entry under the three cohort roots has origin "copy"', () => {
    const manifest = loadManifest();
    const underRoots = Object.entries(manifest.entries).filter(([key]) => isUnderCohortRoot(key));
    expect(underRoots.length).toBeGreaterThan(0);
    for (const [key, entry] of underRoots) {
      expect((entry as any).origin).toBe('copy');
    }
  });

  test('file-list.json has one sorted array per cohort root', () => {
    const fileList = loadFileList();
    for (const root of COHORT_ROOTS) {
      expect(Array.isArray(fileList[root])).toBe(true);
      expect(fileList[root].length).toBeGreaterThan(0);
      const sorted = [...fileList[root]].sort();
      expect(fileList[root]).toEqual(sorted);
    }
  });

  test('the file-list count equals the README\'s documented total, and matches the manifest\'s copy-origin entries under those roots', () => {
    const manifest = loadManifest();
    const fileList = loadFileList();

    const fileListTotal = COHORT_ROOTS.reduce((sum, root) => sum + fileList[root].length, 0);
    const manifestCopyUnderRoots = Object.entries(manifest.entries).filter(
      ([key, entry]) => isUnderCohortRoot(key) && (entry as any).origin === 'copy',
    ).length;

    expect(fileListTotal).toBe(expectedTotalFromReadme());
    expect(manifestCopyUnderRoots).toBe(expectedTotalFromReadme());
    expect(fileListTotal).toBe(manifestCopyUnderRoots);
  });

  test('no copy-origin entries exist OUTSIDE the three cohort roots (the fixture is exactly these three roots)', () => {
    const manifest = loadManifest();
    const copyEntries = Object.entries(manifest.entries).filter(([, entry]) => (entry as any).origin === 'copy');
    for (const [key] of copyEntries) {
      expect(isUnderCohortRoot(key)).toBeDefined();
    }
  });
});
