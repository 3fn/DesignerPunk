/**
 * @category evergreen
 * @purpose Verify Classifier covers all classification paths (Spec 111, R2 AC1-6)
 */

import { classifyFiles } from '../sync/Classifier';
import type { ScannedFile } from '../sync/FileScanner';
import type { SyncManifest } from '../sync/Manifest';
import type { IgnoreFilter } from '../sync/IgnoreFilter';

function makeFile(relativePath: string, hash: string, tier: 'governance' | 'source' = 'source'): ScannedFile {
  return { relativePath, absolutePath: `/abs/${relativePath}`, hash, tier };
}

const noIgnore: IgnoreFilter = { isIgnored: () => false };

function makeManifest(files: Record<string, { hash: string; managed: boolean }>): SyncManifest {
  return { version: '1.0.0', syncedAt: '2026-01-01T00:00:00Z', files };
}

describe('Classifier', () => {
  test('New: file in package but not in project', () => {
    const pkg = [makeFile('src/tokens/New.ts', 'aaa')];
    const proj: ScannedFile[] = [];
    const manifest = makeManifest({});

    const result = classifyFiles(pkg, proj, manifest, noIgnore);

    expect(result.new).toHaveLength(1);
    expect(result.new[0].relativePath).toBe('src/tokens/New.ts');
    expect(result.new[0].classification).toBe('new');
    expect(result.new[0].tier).toBe('source');
  });

  test('Updated-safe: manifest matches project, package differs', () => {
    const pkg = [makeFile('src/tokens/Color.ts', 'new-hash')];
    const proj = [makeFile('src/tokens/Color.ts', 'old-hash')];
    const manifest = makeManifest({
      'src/tokens/Color.ts': { hash: 'old-hash', managed: false },
    });

    const result = classifyFiles(pkg, proj, manifest, noIgnore);

    expect(result.updatedSafe).toHaveLength(1);
    expect(result.updatedSafe[0].classification).toBe('updated-safe');
    expect(result.updatedSafe[0].reason).toBe('unchanged by you — package updated');
  });

  test('Conflict: manifest differs from project (consumer edited) and package differs', () => {
    const pkg = [makeFile('src/tokens/Color.ts', 'pkg-hash')];
    const proj = [makeFile('src/tokens/Color.ts', 'consumer-hash')];
    const manifest = makeManifest({
      'src/tokens/Color.ts': { hash: 'old-hash', managed: false },
    });

    const result = classifyFiles(pkg, proj, manifest, noIgnore);

    expect(result.conflicts).toHaveLength(1);
    expect(result.conflicts[0].classification).toBe('conflict');
    expect(result.conflicts[0].reason).toBe('locally modified');
  });

  test('Unchanged: package hash equals project hash', () => {
    const pkg = [makeFile('src/tokens/Color.ts', 'same-hash')];
    const proj = [makeFile('src/tokens/Color.ts', 'same-hash')];
    const manifest = makeManifest({
      'src/tokens/Color.ts': { hash: 'same-hash', managed: false },
    });

    const result = classifyFiles(pkg, proj, manifest, noIgnore);

    expect(result.unchanged).toHaveLength(1);
    expect(result.unchanged[0].classification).toBe('unchanged');
  });

  test('First-encounter conflict: no manifest entry, hashes differ', () => {
    const pkg = [makeFile('src/tokens/Color.ts', 'pkg-hash')];
    const proj = [makeFile('src/tokens/Color.ts', 'proj-hash')];
    const manifest = makeManifest({}); // No entry for this file

    const result = classifyFiles(pkg, proj, manifest, noIgnore);

    expect(result.conflicts).toHaveLength(1);
    expect(result.conflicts[0].reason).toBe('no sync history (first encounter)');
  });

  test('Removed from package: in manifest but not in package', () => {
    const pkg: ScannedFile[] = [];
    const proj = [makeFile('.kiro/steering/Old.md', 'h1', 'governance')];
    const manifest = makeManifest({
      '.kiro/steering/Old.md': { hash: 'h1', managed: true },
    });

    const result = classifyFiles(pkg, proj, manifest, noIgnore);

    expect(result.removed).toHaveLength(1);
    expect(result.removed[0].classification).toBe('removed');
    expect(result.removed[0].reason).toBe('removed from package');
    expect(result.removed[0].tier).toBe('governance');
  });

  test('Ignored files are excluded from all classifications', () => {
    const pkg = [
      makeFile('src/tokens/Color.ts', 'aaa'),
      makeFile('src/tokens/Ignored.ts', 'bbb'),
    ];
    const proj: ScannedFile[] = [];
    const manifest = makeManifest({});
    const ignore: IgnoreFilter = {
      isIgnored: (p) => p === 'src/tokens/Ignored.ts',
    };

    const result = classifyFiles(pkg, proj, manifest, ignore);

    expect(result.new).toHaveLength(1);
    expect(result.new[0].relativePath).toBe('src/tokens/Color.ts');
  });

  test('Consumer-created files (in project, not in package) never appear', () => {
    const pkg = [makeFile('src/tokens/Pkg.ts', 'aaa')];
    const proj = [
      makeFile('src/tokens/Pkg.ts', 'aaa'),
      makeFile('src/tokens/Consumer.ts', 'bbb'),
    ];
    const manifest = makeManifest({});

    const result = classifyFiles(pkg, proj, manifest, noIgnore);

    const allPaths = [
      ...result.new,
      ...result.updatedSafe,
      ...result.conflicts,
      ...result.unchanged,
      ...result.removed,
    ].map(f => f.relativePath);

    expect(allPaths).not.toContain('src/tokens/Consumer.ts');
  });

  test('Null manifest (first-time sync) classifies matching files as unchanged', () => {
    const pkg = [makeFile('src/tokens/Color.ts', 'same')];
    const proj = [makeFile('src/tokens/Color.ts', 'same')];

    const result = classifyFiles(pkg, proj, null, noIgnore);

    expect(result.unchanged).toHaveLength(1);
  });

  test('Null manifest with differing hashes classifies as conflict', () => {
    const pkg = [makeFile('src/tokens/Color.ts', 'pkg')];
    const proj = [makeFile('src/tokens/Color.ts', 'proj')];

    const result = classifyFiles(pkg, proj, null, noIgnore);

    expect(result.conflicts).toHaveLength(1);
    expect(result.conflicts[0].reason).toBe('no sync history (first encounter)');
  });

  test('Preserves tier from package file', () => {
    const pkg = [
      makeFile('.kiro/steering/Doc.md', 'aaa', 'governance'),
      makeFile('src/tokens/Token.ts', 'bbb', 'source'),
    ];
    const proj: ScannedFile[] = [];
    const manifest = makeManifest({});

    const result = classifyFiles(pkg, proj, manifest, noIgnore);

    expect(result.new[0].tier).toBe('governance');
    expect(result.new[1].tier).toBe('source');
  });

  test('Ignored files in manifest are excluded from removed detection', () => {
    const pkg: ScannedFile[] = [];
    const proj: ScannedFile[] = [];
    const manifest = makeManifest({
      'src/tokens/Ignored.ts': { hash: 'h1', managed: false },
    });
    const ignore: IgnoreFilter = {
      isIgnored: (p) => p === 'src/tokens/Ignored.ts',
    };

    const result = classifyFiles(pkg, proj, manifest, ignore);

    expect(result.removed).toHaveLength(0);
  });
});
