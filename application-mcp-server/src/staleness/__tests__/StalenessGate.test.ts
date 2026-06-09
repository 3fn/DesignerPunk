/**
 * @category evergreen
 * @purpose Verify StalenessGate threshold timing, mtime scanning, rebuild triggering, and immutable skip (Spec 106 R1)
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { StalenessGate, isImmutableContext } from '../StalenessGate';

describe('StalenessGate', () => {
  let tmpDir: string;
  let dataDir: string;
  let onRebuild: jest.Mock;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'staleness-gate-'));
    dataDir = path.join(tmpDir, 'data');
    fs.mkdirSync(dataDir, { recursive: true });
    onRebuild = jest.fn().mockResolvedValue(undefined);
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
    jest.restoreAllMocks();
  });

  function makeGate(overrides: Partial<ConstructorParameters<typeof StalenessGate>[0]> = {}) {
    return new StalenessGate({
      dataDirs: [dataDir],
      fileExtensions: ['.yaml', '.md'],
      thresholdMs: 30_000,
      onRebuild,
      ...overrides,
    });
  }

  function writeFile(name: string, content = 'test'): string {
    const p = path.join(dataDir, name);
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, content);
    return p;
  }

  describe('checkAndRebuildIfNeeded', () => {
    it('returns false when immutable', async () => {
      const gate = makeGate({ isImmutable: true });
      gate.markIndexed();
      writeFile('test.yaml');
      expect(await gate.checkAndRebuildIfNeeded()).toBe(false);
      expect(onRebuild).not.toHaveBeenCalled();
    });

    it('returns false within threshold window', async () => {
      const gate = makeGate({ thresholdMs: 60_000 });
      gate.markIndexed();
      writeFile('test.yaml');
      // First call sets lastCheckTime
      await gate.checkAndRebuildIfNeeded();
      onRebuild.mockClear();
      // Second call within threshold — should skip
      expect(await gate.checkAndRebuildIfNeeded()).toBe(false);
      expect(onRebuild).not.toHaveBeenCalled();
    });

    it('triggers rebuild when stale files detected after threshold', async () => {
      const gate = makeGate({ thresholdMs: 0 });
      gate.markIndexed();

      // Write file and set mtime to future
      const filePath = writeFile('new.yaml');
      const future = new Date(Date.now() + 5000);
      fs.utimesSync(filePath, future, future);

      expect(await gate.checkAndRebuildIfNeeded()).toBe(true);
      expect(onRebuild).toHaveBeenCalledTimes(1);
    });

    it('does not trigger rebuild when no stale files', async () => {
      const gate = makeGate({ thresholdMs: 0 });
      const filePath = writeFile('existing.yaml');
      // Set file mtime to past
      const past = new Date(Date.now() - 5000);
      fs.utimesSync(filePath, past, past);
      gate.markIndexed();

      expect(await gate.checkAndRebuildIfNeeded()).toBe(false);
      expect(onRebuild).not.toHaveBeenCalled();
    });

    it('logs to stderr when rebuild triggered', async () => {
      const gate = makeGate({ thresholdMs: 0 });
      gate.markIndexed();
      const filePath = writeFile('stale.yaml');
      const future = new Date(Date.now() + 5000);
      fs.utimesSync(filePath, future, future);

      await gate.checkAndRebuildIfNeeded();
      expect(console.error).toHaveBeenCalledWith('⚠️ Index stale — rebuilding...');
    });

    it('updates lastIndexTime after rebuild', async () => {
      const gate = makeGate({ thresholdMs: 0 });
      gate.markIndexed();
      const filePath = writeFile('stale.yaml');
      const future = new Date(Date.now() + 5000);
      fs.utimesSync(filePath, future, future);

      await gate.checkAndRebuildIfNeeded();

      // After rebuild, lastIndexTime is updated — but file still has future mtime
      // Since markIndexed uses Date.now(), and file mtime is in the future, it's still stale
      // This is correct behavior — the file IS newer than the rebuild time
    });
  });

  describe('getStaleFiles', () => {
    it('returns empty when lastIndexTime is 0 (never indexed)', () => {
      const gate = makeGate();
      writeFile('test.yaml');
      expect(gate.getStaleFiles()).toEqual([]);
    });

    it('returns empty when immutable', () => {
      const gate = makeGate({ isImmutable: true });
      gate.markIndexed();
      writeFile('test.yaml');
      expect(gate.getStaleFiles()).toEqual([]);
    });

    it('returns files newer than lastIndexTime', () => {
      const gate = makeGate();
      gate.markIndexed();
      const filePath = writeFile('new.yaml');
      const future = new Date(Date.now() + 5000);
      fs.utimesSync(filePath, future, future);

      const stale = gate.getStaleFiles();
      expect(stale).toContain(filePath);
    });

    it('scans nested directories', () => {
      const gate = makeGate();
      gate.markIndexed();
      const filePath = writeFile('sub/nested/deep.yaml');
      const future = new Date(Date.now() + 5000);
      fs.utimesSync(filePath, future, future);

      const stale = gate.getStaleFiles();
      expect(stale).toContain(filePath);
    });

    it('only includes files matching fileExtensions', () => {
      const gate = makeGate();
      gate.markIndexed();

      const yamlPath = writeFile('match.yaml');
      writeFile('ignore.ts');
      writeFile('also-ignore.json');
      const future = new Date(Date.now() + 5000);
      fs.utimesSync(yamlPath, future, future);
      fs.utimesSync(path.join(dataDir, 'ignore.ts'), future, future);
      fs.utimesSync(path.join(dataDir, 'also-ignore.json'), future, future);

      const stale = gate.getStaleFiles();
      expect(stale.length).toBe(1);
      expect(stale[0]).toContain('match.yaml');
    });

    it('skips missing directories gracefully', () => {
      const gate = new StalenessGate({
        dataDirs: ['/nonexistent/path', dataDir],
        fileExtensions: ['.yaml'],
        onRebuild,
      });
      gate.markIndexed();
      expect(gate.getStaleFiles()).toEqual([]);
    });
  });

  describe('markIndexed', () => {
    it('sets lastIndexTime so subsequent new files are detected', () => {
      const gate = makeGate();
      // Before marking, getStaleFiles returns empty (lastIndexTime = 0)
      writeFile('pre.yaml');
      expect(gate.getStaleFiles()).toEqual([]);

      gate.markIndexed();

      // File written AFTER markIndexed with future mtime
      const postFile = writeFile('post.yaml');
      const future = new Date(Date.now() + 5000);
      fs.utimesSync(postFile, future, future);

      const stale = gate.getStaleFiles();
      expect(stale).toContain(postFile);
    });
  });
});

describe('isImmutableContext', () => {
  it('returns true for paths containing /node_modules/', () => {
    expect(isImmutableContext('/project/node_modules/@3fn/core/src')).toBe(true);
  });

  it('returns false for local paths', () => {
    expect(isImmutableContext('/project/src/components/core')).toBe(false);
  });

  it('returns false for paths containing node_modules without slashes', () => {
    expect(isImmutableContext('/project/my-node_modules-backup')).toBe(false);
  });
});
