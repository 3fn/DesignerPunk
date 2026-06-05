/**
 * @category evergreen
 * @purpose Verify Reporter formats grouped output correctly (Spec 111, R9)
 */

import { displayReport } from '../sync/Reporter';
import type { ClassificationResult, ClassifiedFile } from '../sync/Classifier';

function makeClassified(overrides: Partial<ClassificationResult> = {}): ClassificationResult {
  return {
    new: [],
    updatedSafe: [],
    conflicts: [],
    unchanged: [],
    removed: [],
    ...overrides,
  };
}

function makeFile(
  relativePath: string,
  classification: ClassifiedFile['classification'],
  tier: 'governance' | 'source' = 'source',
  reason?: string,
): ClassifiedFile {
  return { relativePath, classification, tier, packageHash: 'h', reason };
}

describe('Reporter', () => {
  let logSpy: jest.SpyInstance;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    logSpy.mockRestore();
  });

  function output(): string {
    return logSpy.mock.calls.map(c => c.join(' ')).join('\n');
  }

  test('displays new files with tier', () => {
    const classified = makeClassified({
      new: [makeFile('src/tokens/New.ts', 'new', 'source')],
    });

    displayReport(classified, { dryRun: false });

    expect(output()).toContain('📥 New files (1)');
    expect(output()).toContain('src/tokens/New.ts [source]');
  });

  test('displays governance updates as auto-applying', () => {
    const classified = makeClassified({
      updatedSafe: [makeFile('.kiro/steering/Doc.md', 'updated-safe', 'governance', 'unchanged by you — package updated')],
    });

    displayReport(classified, { dryRun: false });

    expect(output()).toContain('🔄 Governance updates — auto-applying (1)');
    expect(output()).toContain('.kiro/steering/Doc.md');
  });

  test('displays source updates with confirm required', () => {
    const classified = makeClassified({
      updatedSafe: [makeFile('src/tokens/Color.ts', 'updated-safe', 'source', 'unchanged by you — package updated')],
    });

    displayReport(classified, { dryRun: false });

    expect(output()).toContain('📋 Source updates — confirm required (1)');
    expect(output()).toContain('unchanged by you — package updated');
  });

  test('displays conflicts with reason', () => {
    const classified = makeClassified({
      conflicts: [makeFile('src/tokens/Edited.ts', 'conflict', 'source', 'locally modified')],
    });

    displayReport(classified, { dryRun: false });

    expect(output()).toContain('⚠️  Conflicts (1)');
    expect(output()).toContain('src/tokens/Edited.ts — locally modified');
  });

  test('displays removed files as warning', () => {
    const classified = makeClassified({
      removed: [makeFile('.kiro/steering/Old.md', 'removed', 'governance', 'removed from package')],
    });

    displayReport(classified, { dryRun: false });

    expect(output()).toContain('⚠️  Removed from package');
    expect(output()).toContain('.kiro/steering/Old.md');
  });

  test('displays unchanged count', () => {
    const classified = makeClassified({
      unchanged: [makeFile('a.ts', 'unchanged'), makeFile('b.ts', 'unchanged')],
    });

    displayReport(classified, { dryRun: false });

    expect(output()).toContain('✓ 2 files unchanged');
  });

  test('displays up-to-date message when nothing to sync', () => {
    const classified = makeClassified({
      unchanged: [makeFile('a.ts', 'unchanged')],
    });

    displayReport(classified, { dryRun: false });

    expect(output()).toContain('✅ Everything is up to date.');
  });

  test('displays dry-run header when in dry-run mode', () => {
    const classified = makeClassified({
      new: [makeFile('src/tokens/New.ts', 'new')],
    });

    displayReport(classified, { dryRun: true });

    expect(output()).toContain('🔍 Dry-run mode — no changes will be applied.');
  });
});
